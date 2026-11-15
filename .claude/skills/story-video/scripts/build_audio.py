#!/usr/bin/env python3
"""Story JSON -> timeline.json + audio.wav

Voices every spoken beat with Kokoro TTS (free, local), lays the beats on a
timeline, synthesises background music + UI sound effects, ducks the music
under the voice and writes the final mix.

usage: build_audio.py STORY.json OUT_DIR
"""
import json, re
import math
import os
import sys

import numpy as np
import soundfile as sf

import align  # caption word timings from the actual voice (pauses + phonemes)

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


PIPER_DIR = os.environ.get("PIPER_DIR", os.path.expanduser("~/.cache/piper"))


# ---------- spoken years ----------
_ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
_TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()


def _two(n):
    if n < 20:
        return _ONES[n]
    return _TENS[n // 10] + ("" if n % 10 == 0 else "-" + _ONES[n % 10])


def year_words(y, plural=False):
    """1988 -> nineteen eighty-eight, 1507 -> fifteen oh-seven, 1300 -> thirteen hundred, 2010 -> twenty ten"""
    hi, lo = divmod(y, 100)
    if 2000 <= y <= 2009:
        w = "two thousand" + ("" if y == 2000 else " and " + _ONES[y - 2000])
    elif lo == 0:
        w = _two(hi) + " hundred"
    elif lo < 10:
        w = _two(hi) + " oh-" + _ONES[lo]
    else:
        w = _two(hi) + " " + _two(lo)
    if plural:   # the 1400s -> fourteen hundreds, the 1980s -> nineteen eighties
        w = w[:-1] + "ies" if w.endswith("y") else w + "s"
    return w


def speak_years(text, lang="en-us"):
    """Spell out 4-digit years (1000-2099) so the TTS reads them like a person; leaves 1,000 / 20,000,000 alone."""
    if not lang.startswith("en"):
        return text
    def rep(m):
        y = int(m.group(1))
        return year_words(y, plural=bool(m.group(2))) if 1000 <= y <= 2099 else m.group(0)
    return re.sub(r"(?<![\d,.])(\d{4})(s)?(?!\d|,\d)", rep, text)


def shape_voice(x, pitch=0.0, rise=0.0, rise_len=0.45):
    """Raise a voice by `pitch` semitones, plus a glide of `rise` semitones over the last `rise_len` s
    (a curious, questioning lift). Resampling: pitch and tempo move together, which reads as livelier."""
    if not pitch and not rise:
        return x
    n = len(x)
    ratio = np.full(n, 2 ** (pitch / 12))
    if rise:
        k = int(rise_len * SR)
        ramp = np.clip((np.arange(n) - (n - k)) / max(1, k), 0, 1) ** 1.5
        ratio *= 2 ** (rise * ramp / 12)
    t_out = np.cumsum(1 / ratio)            # output time of every input sample
    out_n = int(t_out[-1])
    pos = np.interp(np.arange(out_n), t_out, np.arange(n))
    return np.interp(pos, np.arange(n), x).astype(np.float32)


def tts_piper(text, voice, speed):
    """Non-English narration (e.g. Turkish) with a local Piper voice, resampled to SR."""
    import subprocess, tempfile
    model = os.path.join(PIPER_DIR, voice + ".onnx")
    with tempfile.TemporaryDirectory() as d:
        wav = os.path.join(d, "v.wav")
        subprocess.run([os.path.join(PIPER_DIR, "venv/bin/piper"), "-m", model, "-f", wav,
                        "--length-scale", str(round(1 / speed, 3))],
                       input=text.encode(), check=True, capture_output=True)
        x, sr = sf.read(wav, dtype="float32")
    if x.ndim > 1:
        x = x.mean(axis=1)
    if sr != SR:
        x = np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x).astype(np.float32)
    return trim(x)


def tts(text, voice, speed, lang="en-us"):
    global _kokoro
    if lang != "en-us":
        return tts_piper(text, voice, speed)
    if _kokoro is None:
        from kokoro_onnx import Kokoro

        _kokoro = Kokoro(
            os.path.join(MODEL_DIR, "kokoro-v1.0.onnx"),
            os.path.join(MODEL_DIR, "voices-v1.0.bin"),
        )
    samples, sr = _kokoro.create(text, voice=voice, speed=speed, lang="en-gb" if voice[:1] == "b" else "en-us")
    assert sr == SR, sr
    return trim(np.asarray(samples, dtype=np.float32))


def trim(x, thresh=0.01, pad=0.04):
    idx = np.where(np.abs(x) > thresh)[0]
    if len(idx) == 0:
        return x
    p = int(pad * SR)
    return x[max(0, idx[0] - p): min(len(x), idx[-1] + p)]


# ---------------------------------------------------------------------------
# Music
# ---------------------------------------------------------------------------
NOTE = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7,
        "G#": 8, "A": 9, "A#": 10, "B": 11}
CHORDS = {
    "Am": ["A", "C", "E"], "F": ["F", "A", "C"], "C": ["C", "E", "G"],
    "G": ["G", "B", "D"], "Dm": ["D", "F", "A"], "Em": ["E", "G", "B"],
    "E": ["E", "G#", "B"], "Bb": ["A#", "D", "F"], "A": ["A", "C#", "E"], "Fmaj7": ["F", "A", "C", "E"], "Am7": ["A", "C", "E", "G"],
}
PROGRESSIONS = {
    "bittersweet": ["Am", "F", "C", "G"],
    "hopeful": ["C", "G", "Am", "F"],
    "tense": ["Am", "Am", "Dm", "E"],
    "dreamy": ["Fmaj7", "Am7", "Fmaj7", "Em"],
    "epic": ["Dm", "Bb", "F", "C"],
    "somber": ["Dm", "Dm", "Bb", "A"],
}


def freq(name, octave):
    midi = 12 * (octave + 1) + NOTE[name]
    return 440.0 * 2 ** ((midi - 69) / 12)


def timpani(n_samples, f0=72.0):
    t = np.arange(n_samples) / SR
    f = f0 * (1 + 0.25 * np.exp(-t * 18))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)
    rng = np.random.default_rng(7)
    hit = rng.standard_normal(len(t)) * np.exp(-t * 40) * 0.25
    return body + hit


def music(duration, mood="bittersweet", seed=1, bar=4.0, drums=False):
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

    if drums:  # slow cinematic timpani pulse: beats 1 and 3.5 of every bar
        hit = timpani(int(1.5 * SR), freq(prog[0][0], 2))
        for b in range(1, nbars):
            for st, g in ((0.0, 0.16), (2.5, 0.09)):
                p0 = int((b * bar + st) * SR)
                if p0 < n:
                    seg = hit[: n - p0]
                    out[p0: p0 + len(seg)] += g * seg

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


def sfx_buzz():
    """Phone vibrating on a table: three short low pulses."""
    out = np.zeros(int(1.0 * SR))
    rng = np.random.default_rng(3)
    for k in range(3):
        s0 = int(k * 0.3 * SR); d = int(0.18 * SR)
        t = np.arange(d) / SR
        tone = np.sign(np.sin(2 * np.pi * 165 * t)) * 0.5 + 0.3 * rng.standard_normal(d)
        tone = np.convolve(tone, np.ones(8) / 8, mode="same")
        out[s0:s0 + d] += 0.35 * tone * np.sin(np.pi * t / 0.18)
    return out


def sfx_tap():
    t = np.arange(int(0.06 * SR)) / SR
    return 0.4 * np.sin(2 * np.pi * 2200 * t) * np.exp(-t * 90)


def sfx_coins():
    """Purchase confirmation: bright two-note chime."""
    t = np.arange(int(0.9 * SR)) / SR
    a = np.sin(2 * np.pi * 1568 * t) * np.exp(-t * 6)
    b = np.zeros_like(t); o = int(0.09 * SR)
    b[o:] = np.sin(2 * np.pi * 2093 * t[:len(t) - o]) * np.exp(-t[:len(t) - o] * 5)
    return 0.2 * (a + b)


def sfx_pencil(d=1.6):
    """pencil scratching on paper: bursts of high, band-limited noise"""
    rng = np.random.default_rng(3)
    t = np.arange(int(d * SR)) / SR
    noise = rng.standard_normal(len(t))
    hp = noise - np.convolve(noise, np.ones(6) / 6, mode="same")
    strokes = np.clip(np.sin(2 * np.pi * 3.1 * t + 2 * np.sin(2 * np.pi * 0.7 * t)), 0, 1) ** 0.6
    env = strokes * np.minimum(1, t / 0.05) * np.minimum(1, (d - t) / 0.3)
    return 0.07 * hp * env


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
def load_sketches(story, story_path):
    out = {}
    for k, v in story.get("sketches", {}).items():
        v = dict(v)
        if isinstance(v.get("coast"), str):
            v["coast"] = json.load(open(os.path.join(os.path.dirname(story_path), v["coast"])))
        out[k] = v
    return out


def main(story_path, out_dir):
    story = json.load(open(story_path))
    os.makedirs(out_dir, exist_ok=True)
    lang = story.get("lang", "en-us")
    voices = {**DEFAULT_VOICES, **story.get("voices", {})}
    speeds = {**DEFAULT_SPEED, **story.get("speed", {})}

    clips = []   # (start_sec, samples)
    sfx = []     # (start_sec, samples)
    beats = []
    t = LEAD_IN
    scene = "black"
    drawn_sketches = set()

    for i, beat in enumerate(story["beats"]):
        b = dict(beat)
        typ = b["type"]
        if i and b.get("scene") and b["scene"] != scene:
            t += story.get("scene_pad", 0)   # breathing room before a new scene (longer crossfade, maps finish drawing)
        if b.get("scene"):
            scene = b["scene"]
        b["scene"] = scene
        b["start"] = round(t, 3)

        speaker = None
        if typ in ("narration", "title"):
            speaker = b.get("speaker", "narrator")   # dialogue: any key of story["voices"], e.g. "q" / "a"
        elif typ in ("chat", "file", "notify"):
            speaker = "ai" if b.get("from", "ai") == "ai" else "narrator"
            if typ in ("file", "notify"):
                speaker = "ai"
            if not b.get("text"):
                speaker = None
        if b.get("speak") is False:
            speaker = None

        if typ == "chat" and b.get("from", "ai") == "ai" and b.get("text"):
            b["typingStart"] = round(t, 3)
            t += TYPING
        if typ in ("chat", "file"):
            b["appear"] = round(t, 3)
            sfx.append((t, sfx_pop("in" if b.get("from", "ai") == "ai" else "out")))
        if typ == "notify":
            b["appear"] = round(t, 3)
            sfx.append((t, sfx_buzz()))
            t += 0.7
        if typ == "paywall":
            b["appear"] = round(t, 3)
            sfx.append((t, sfx_ding()))
            hold = b.get("hold", 3.2)
            if b.get("tap", True):  # tap "Upgrade" (false = she hesitates, no purchase)
                b["pressAt"] = round(t + hold * 0.62, 3)
                sfx.append((b["pressAt"], sfx_tap()))
                sfx.append((b["pressAt"] + 0.25, sfx_coins()))
            t += hold
        if typ == "system":
            b["appear"] = round(t, 3)
            sfx.append((t, sfx_ding()))
            t += b.get("hold", SYSTEM_HOLD)
        if typ == "pause":
            t += b.get("seconds", 1.0)
        if typ == "end":
            sfx.append((t, sfx_whoosh()))
            t += b.get("hold", END_HOLD)

        if story.get("pencil_sound") and b["scene"] in story.get("sketches", {}) and b["scene"] not in drawn_sketches:
            drawn_sketches.add(b["scene"]); sfx.append((t, sfx_pencil()))
        if speaker:
            say = speak_years(b.get("say", b["text"]), lang)
            sp = (story.get("speakers") or {}).get(speaker, {})
            audio = tts(say, voices[speaker], b.get("speed", speeds.get(speaker, 1.0)), lang)
            q = b["text"].rstrip().endswith("?")
            audio = shape_voice(audio, sp.get("pitch", 0.0), sp.get("rise", 0.0) if q else 0.0)
            dur = len(audio) / SR
            b["voiceStart"] = round(t, 3)
            b["voiceEnd"] = round(t + dur, 3)
            b["words"] = align.word_times(b["text"], say, audio, SR, t, lang)
            b["speaker"] = speaker
            clips.append((t, audio * b.get("gain", 1.0)))
            t += dur + b.get("gap", GAP)
            if b["text"].rstrip().endswith("?"):
                t += sp.get("pause_after_question", 0.0)   # let the question land before the answer
        elif typ == "chat":  # silent message / photo: hold by length
            t += b.get("hold", 1.3 if b.get("photo") else 0.6 + 0.045 * len(b.get("text", "")))
        elif typ == "notify":
            t += b.get("hold", 1.6)

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
        bed = music(total, m.get("mood", "bittersweet"), m.get("seed", 1), m.get("bar", 4.0), m.get("drums", False))
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
        "appName": story.get("app_name"),
        "aiColors": story.get("ai_colors"),
        "highlight": story.get("highlight"),
        "hair": story.get("narrator_hair"),
        "images": {**{k: {**v, "file": os.path.abspath(os.path.join(os.path.dirname(story_path), v["file"]))}
                      for k, v in story.get("images", {}).items()},
                   # channel logo drawn small in a corner for the whole video
                   **({"__watermark": {"file": os.path.abspath(os.path.join(os.path.dirname(story_path), story["watermark"]))}}
                      if story.get("watermark") else {})},
        "lang": lang,
        "overlay": {k: os.path.abspath(os.path.join(os.path.dirname(story_path), v))
                    for k, v in story["overlay"].items()} if story.get("overlay") else None,
        "sketches": load_sketches(story, story_path),
        "clips": {k: os.path.abspath(os.path.join(os.path.dirname(story_path), v))
                  for k, v in story.get("clips", {}).items()},
        "speakers": story.get("speakers"),
        "fade": story.get("fade", 0.7),
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
