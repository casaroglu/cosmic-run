#!/usr/bin/env python3
"""Story JSON -> timeline.json + audio.wav

Voices every spoken beat with Kokoro TTS (free, local), lays the beats on a
timeline, synthesises background music + UI sound effects, ducks the music
under the voice and writes the final mix.

usage: build_audio.py STORY.json OUT_DIR
"""
import json
import math
import os
import re
import sys

import numpy as np
import soundfile as sf

SR = 24000
MODEL_DIR = os.environ.get("KOKORO_DIR", os.path.expanduser("~/.cache/kokoro"))

DEFAULT_VOICES = {"narrator": "am_michael", "ai": "af_heart"}
DEFAULT_SPEED = {"narrator": 1.05, "ai": 1.0}

# --- timing constants (seconds) ---------------------------------------------
GAP = 0.28            # silence after every spoken beat
TYPING = 0.85         # typing indicator before an AI message
SYSTEM_HOLD = 1.7     # system notice on screen
END_HOLD = 2.6        # end card
LEAD_IN = 0.15


# ---------------------------------------------------------------------------
# TTS
# ---------------------------------------------------------------------------
_kokoro = None


def tts(text, voice, speed):
    global _kokoro
    if _kokoro is None:
        from kokoro_onnx import Kokoro

        _kokoro = Kokoro(
            os.path.join(MODEL_DIR, "kokoro-v1.0.onnx"),
            os.path.join(MODEL_DIR, "voices-v1.0.bin"),
        )
    samples, sr = _kokoro.create(text, voice=voice, speed=speed, lang="en-us")
    assert sr == SR, sr
    return trim(np.asarray(samples, dtype=np.float32))


def trim(x, thresh=0.01, pad=0.04):
    idx = np.where(np.abs(x) > thresh)[0]
    if len(idx) == 0:
        return x
    p = int(pad * SR)
    return x[max(0, idx[0] - p): min(len(x), idx[-1] + p)]


def word_times(text, t0, t1):
    """Estimate per-word timings by weighting character count + punctuation."""
    words = text.split()
    weights = []
    for w in words:
        wt = len(re.sub(r"[^\w']", "", w)) + 1.5
        if re.search(r"[,;:—-]$", w):
            wt += 3
        if re.search(r"[.?!…]$", w):
            wt += 5
        weights.append(wt)
    total = sum(weights) or 1
    out, t = [], t0
    for w, wt in zip(words, weights):
        d = (t1 - t0) * wt / total
        out.append({"w": w, "t0": round(t, 3), "t1": round(t + d, 3)})
        t += d
    return out


# ---------------------------------------------------------------------------
# Music
# ---------------------------------------------------------------------------
NOTE = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7,
        "G#": 8, "A": 9, "A#": 10, "B": 11}
CHORDS = {
    "Am": ["A", "C", "E"], "F": ["F", "A", "C"], "C": ["C", "E", "G"],
    "G": ["G", "B", "D"], "Dm": ["D", "F", "A"], "Em": ["E", "G", "B"],
    "E": ["E", "G#", "B"], "Fmaj7": ["F", "A", "C", "E"], "Am7": ["A", "C", "E", "G"],
}
PROGRESSIONS = {
    "bittersweet": ["Am", "F", "C", "G"],
    "hopeful": ["C", "G", "Am", "F"],
    "tense": ["Am", "Am", "Dm", "E"],
    "dreamy": ["Fmaj7", "Am7", "Fmaj7", "Em"],
}


def freq(name, octave):
    midi = 12 * (octave + 1) + NOTE[name]
    return 440.0 * 2 ** ((midi - 69) / 12)


def music(duration, mood="bittersweet", seed=1, bar=4.0):
    rng = np.random.default_rng(seed)
    n = int(duration * SR)
    t = np.arange(n) / SR
    out = np.zeros(n, dtype=np.float64)
    prog = PROGRESSIONS.get(mood, PROGRESSIONS["bittersweet"])

    nbars = int(math.ceil(duration / bar)) + 1
    for b in range(nbars):
        chord = CHORDS[prog[b % len(prog)]]
        s0 = int(b * bar * SR)
        seg = int((bar + 1.5) * SR)  # overlap for smooth crossfade
        if s0 >= n:
            break
        s1 = min(n, s0 + seg)
        tt = np.arange(s1 - s0) / SR
        env = np.minimum(1, tt / 1.2) * np.clip((bar + 1.5 - tt) / 1.5, 0, 1)
        # warm pad: detuned soft-saw (few harmonics) per chord tone
        for i, nm in enumerate(chord):
            f = freq(nm, 3 if i == 0 else 4)
            for det in (-0.12, 0.0, 0.11):
                ff = f * 2 ** (det / 12)
                ph = rng.uniform(0, 2 * np.pi)
                for h, a in ((1, 1.0), (2, 0.35), (3, 0.12)):
                    out[s0:s1] += 0.022 * a * env * np.sin(2 * np.pi * ff * h * tt + ph)
        # sub bass
        out[s0:s1] += 0.06 * env * np.sin(2 * np.pi * freq(chord[0], 2) * tt)
        # sparse piano-ish plucks
        steps = [0, 1.0, 1.5, 2.5, 3.0]
        for k, st in enumerate(steps):
            if rng.random() < 0.25:
                continue
            nm = chord[(k * 2 + b) % len(chord)]
            f = freq(nm, 5 if rng.random() < 0.7 else 4)
            p0 = s0 + int(st * SR)
            pl = int(2.2 * SR)
            if p0 >= n:
                continue
            p1 = min(n, p0 + pl)
            pt = np.arange(p1 - p0) / SR
            penv = np.exp(-pt * 2.4) * np.minimum(1, pt / 0.005)
            tone = np.sin(2 * np.pi * f * pt) + 0.3 * np.sin(4 * np.pi * f * pt) * np.exp(-pt * 4)
            out[p0:p1] += 0.05 * penv * tone

    out = reverb(out, seconds=2.8, mix=0.45, seed=seed)
    # fade in / out
    fi = int(1.5 * SR)
    fo = int(2.0 * SR)
    out[:fi] *= np.linspace(0, 1, fi)
    out[-fo:] *= np.linspace(1, 0, fo)
    return out / (np.max(np.abs(out)) + 1e-9) * 0.5


def reverb(x, seconds=2.5, mix=0.4, seed=0):
    rng = np.random.default_rng(seed + 99)
    ir_n = int(seconds * SR)
    ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / SR * (6.9 / seconds))
    # darken the tail with a crude moving-average low-pass
    k = 12
    ir = np.convolve(ir, np.ones(k) / k, mode="same")
    ir /= np.sqrt(np.sum(ir ** 2))
    L = len(x) + ir_n
    nfft = 1 << (L - 1).bit_length()
    wet = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(ir, nfft), nfft)[: len(x)]
    wet *= np.max(np.abs(x)) / (np.max(np.abs(wet)) + 1e-9)
    return (1 - mix) * x + mix * wet


# ---------------------------------------------------------------------------
# SFX
# ---------------------------------------------------------------------------
def sfx_pop(kind="in"):
    d = 0.12
    t = np.arange(int(d * SR)) / SR
    f0, f1 = (700, 1100) if kind == "in" else (900, 1500)
    f = np.linspace(f0, f1, len(t))
    return 0.25 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 35)


def sfx_ding():
    d = 1.4
    t = np.arange(int(d * SR)) / SR
    a = np.sin(2 * np.pi * 1318.5 * t) * np.exp(-t * 4)
    b = np.zeros_like(t)
    o = int(0.13 * SR)
    b[o:] = np.sin(2 * np.pi * 987.8 * t[: len(t) - o]) * np.exp(-t[: len(t) - o] * 3.5)
    return 0.22 * (a + b)


def sfx_whoosh():
    d = 0.5
    rng = np.random.default_rng(5)
    t = np.arange(int(d * SR)) / SR
    noise = np.convolve(rng.standard_normal(len(t)), np.ones(30) / 30, mode="same")
    env = np.sin(np.pi * t / d) ** 2
    return 0.35 * noise * env


# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------
def main(story_path, out_dir):
    story = json.load(open(story_path))
    os.makedirs(out_dir, exist_ok=True)
    voices = {**DEFAULT_VOICES, **story.get("voices", {})}
    speeds = {**DEFAULT_SPEED, **story.get("speed", {})}

    clips = []   # (start_sec, samples)
    sfx = []     # (start_sec, samples)
    beats = []
    t = LEAD_IN
    scene = "black"

    for i, beat in enumerate(story["beats"]):
        b = dict(beat)
        typ = b["type"]
        if b.get("scene"):
            scene = b["scene"]
        b["scene"] = scene
        b["start"] = round(t, 3)

        speaker = None
        if typ in ("narration", "title"):
            speaker = "narrator"
        elif typ in ("chat", "file"):
            speaker = "ai" if b.get("from", "ai") == "ai" else "narrator"
            if typ == "file":
                speaker = "ai"
        if b.get("speak") is False:
            speaker = None

        if typ == "chat" and b.get("from", "ai") == "ai":
            b["typingStart"] = round(t, 3)
            t += TYPING
        if typ in ("chat", "file"):
            b["appear"] = round(t, 3)
            sfx.append((t, sfx_pop("in" if b.get("from", "ai") == "ai" else "out")))
        if typ == "system":
            b["appear"] = round(t, 3)
            sfx.append((t, sfx_ding()))
            t += b.get("hold", SYSTEM_HOLD)
        if typ == "pause":
            t += b.get("seconds", 1.0)
        if typ == "end":
            sfx.append((t, sfx_whoosh()))
            t += b.get("hold", END_HOLD)

        if speaker:
            say = b.get("say", b["text"])
            audio = tts(say, voices[speaker], b.get("speed", speeds[speaker]))
            dur = len(audio) / SR
            b["voiceStart"] = round(t, 3)
            b["voiceEnd"] = round(t + dur, 3)
            b["words"] = word_times(b["text"], t, t + dur)
            b["speaker"] = speaker
            clips.append((t, audio * b.get("gain", 1.0)))
            t += dur + b.get("gap", GAP)
        elif typ == "chat":  # silent message: hold by length
            t += 0.6 + 0.045 * len(b["text"])

        if b.get("hold_after"):
            t += b["hold_after"]
        b["end"] = round(t, 3)
        b["index"] = i
        beats.append(b)

    total = t + 0.4
    n = int(total * SR)
    voice = np.zeros(n)
    for st, a in clips:
        s = int(st * SR)
        voice[s: s + len(a)] += a[: n - s]
    fx = np.zeros(n)
    for st, a in sfx:
        s = int(st * SR)
        fx[s: s + len(a)] += a[: n - s]

    m = story.get("music", {})
    if m.get("enabled", True):
        bed = music(total, m.get("mood", "bittersweet"), m.get("seed", 1), m.get("bar", 4.0))
        # side-chain duck under the voice
        active = (np.abs(voice) > 0.003).astype(float)
        win = int(0.25 * SR)
        active = np.convolve(active, np.ones(win) / win, mode="same")
        active = np.clip(active * 4, 0, 1)
        k = int(0.3 * SR)
        active = np.convolve(active, np.ones(k) / k, mode="same")
        duck = 1 - 0.55 * active
        level = m.get("level", 0.32)
        bed = bed * duck * level
    else:
        bed = 0

    vpk = np.max(np.abs(voice)) + 1e-9
    mix = voice / vpk * 0.85 + fx + bed
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)  # gentle limiter
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * 0.89
    sf.write(os.path.join(out_dir, "audio.wav"), mix.astype(np.float32), SR)

    timeline = {
        "title": story.get("title", ""),
        "part": story.get("part"),
        "totalParts": story.get("total_parts"),
        "aiName": story.get("ai_name", "Nova"),
        "humanName": story.get("human_name", "Me"),
        "accent": story.get("accent", "#FFD54A"),
        "width": 1080, "height": 1920, "fps": story.get("fps", 30),
        "duration": round(total, 3),
        "beats": beats,
    }
    json.dump(timeline, open(os.path.join(out_dir, "timeline.json"), "w"), indent=1)
    print(f"timeline: {len(beats)} beats, {total:.1f}s -> {out_dir}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
