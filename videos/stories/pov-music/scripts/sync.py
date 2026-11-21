"""Song -> timeline.json for the coaster renderer.

1. librosa beat tracking (beats + downbeats) on the full mix
2. whisper word timestamps on the song (lyrics passed as prompt), then the known lyric words are
   aligned to whisper's words (difflib) and unmatched words interpolated -> karaoke timings
3. ride keys: the lift crest is pinned to the 3rd verse line, the loop top to the first "loop-de-loop"

usage: python sync.py PROTO_DIR    (needs PROTO_DIR/song.json, song.wav, base_timeline.json)
"""
import difflib
import json
import math
import os
import re
import sys

import librosa
import numpy as np

d = os.path.abspath(sys.argv[1])
spec = json.load(open(os.path.join(d, "song.json")))
wav = os.path.join(d, "song.wav")
DUR = float(spec.get("video_duration", 60))

# ---------- beats ----------
y, sr = librosa.load(wav, sr=22050, mono=True)
tempo, bf = librosa.beat.beat_track(y=y, sr=sr, start_bpm=spec.get("bpm", 124), tightness=200)
beats = librosa.frames_to_time(bf, sr=sr)
onset = librosa.onset.onset_strength(y=y, sr=sr)
bstr = onset[np.clip(bf, 0, len(onset) - 1)]
phase = int(np.argmax([bstr[p::4].mean() for p in range(4)]))
downbeats = beats[phase::4]
print(f"tempo {float(np.atleast_1d(tempo)[0]):.1f} bpm, {len(beats)} beats, downbeat phase {phase}")

# ---------- lyrics ----------
lines = [ln.strip() for ln in spec.get("caption_lyrics", spec["lyrics"]).split("\n") if ln.strip() and not ln.strip().startswith("[")]
words = []  # {w, line}
for li, ln in enumerate(lines):
    ws = ln.split()
    parts = math.ceil(len(ws) / 5)
    size = math.ceil(len(ws) / parts)
    for k, w in enumerate(ws):
        words.append({"w": w.strip(",."), "line": li, "eol": (k + 1) % size == 0 or k == len(ws) - 1})

norm = lambda w: re.sub(r"[^a-z0-9']", "", w.lower())

# ---------- whisper ----------
import whisper  # openai-whisper (MIT)

cache = os.path.join(d, "whisper.json")
if os.path.exists(cache):
    res = json.load(open(cache))
else:
    model = whisper.load_model(spec.get("whisper", "medium.en"))
    voc = os.path.join(d, "vocals.wav")
    src = voc if os.path.exists(voc) else wav
    res = model.transcribe(src, language="en", word_timestamps=True, initial_prompt=" ".join(lines[:4]),
                           condition_on_previous_text=False, temperature=0)
    json.dump({"segments": res["segments"]}, open(cache, "w"))
for seg in res["segments"]:
    print(f"  [{seg['start']:6.2f}-{seg['end']:6.2f}] {seg['text'].strip()}")
hw = [w for seg in res["segments"] for w in seg.get("words", [])]
print("whisper:", " ".join(w["word"].strip() for w in hw))

# hyphenated lyric words ("loop-de-loop") may come back as several whisper words: compare on a flat token list
def toks(w):
    return [t for t in re.split(r"[-\s]+", norm(w)) if t] or [norm(w)]

L_tok, L_own = [], []
for i, w in enumerate(words):
    for t in toks(w["w"]):
        L_tok.append(t); L_own.append(i)
H_tok, H_time = [], []
for w in hw:
    for t in toks(w["word"]):
        H_tok.append(t); H_time.append((w["start"], w["end"]))
sm = difflib.SequenceMatcher(a=L_tok, b=H_tok, autojunk=False)
t0 = [None] * len(words); t1 = [None] * len(words)
matched = 0
for a, b, n in sm.get_matching_blocks():
    for k in range(n):
        i = L_own[a + k]; s, e = H_time[b + k]
        t0[i] = s if t0[i] is None else min(t0[i], s); t1[i] = e if t1[i] is None else max(t1[i], e)
        matched += 1
print(f"aligned {matched}/{len(L_tok)} lyric tokens")
# interpolate gaps by character count
known = [i for i in range(len(words)) if t0[i] is not None]
if not known:
    sys.exit("whisper found none of the lyrics")
for i in range(len(words)):
    if t0[i] is not None:
        continue
    prev = max([k for k in known if k < i], default=None); nxt = min([k for k in known if k > i], default=None)
    if prev is None:
        t0[i] = t0[nxt] - 0.35 * (nxt - i); t1[i] = t0[i] + 0.3
    elif nxt is None:
        t0[i] = t1[prev] + 0.35 * (i - prev); t1[i] = t0[i] + 0.3
    else:
        span = range(prev + 1, nxt); tot = sum(len(words[k]["w"]) + 2 for k in span) or 1
        a, b = t1[prev], t0[nxt]; acc = 0
        for k in span:
            t0[k] = a + (b - a) * acc / tot; acc += len(words[k]["w"]) + 2; t1[k] = a + (b - a) * acc / tot
for i, w in enumerate(words):
    w["t0"], w["t1"] = round(float(t0[i]), 3), round(float(t1[i]), 3)
words = [w for w in words if w["t0"] < DUR - 0.5]

# ---------- ride keys + lyric props ----------
def line_time(prefix, nth=1):
    """start time of the nth lyric line beginning with prefix"""
    k = 0
    for li, ln in enumerate(lines):
        if ln.lower().startswith(prefix.lower()):
            k += 1
            if k == nth:
                return next(w["t0"] for w in words if w["line"] == li)
    raise SystemExit(f"no lyric line starts with {prefix!r} (#{nth})")

def word_time(word, nth=1):
    k = 0
    for w in words:
        if norm(w["w"]) == norm(word):
            k += 1
            if k == nth:
                return w["t0"]
    raise SystemExit(f"word {word!r} (#{nth}) not in lyrics")

keys = []
for rk in spec["ride_keys"] if "ride_keys" in spec else [{"at": "crest", "line": lines[2], "offset": -0.4},
                                                         {"at": "loopTop", "line": "loop", "offset": 0.5}]:
    keys.append({"at": rk["at"], "t": round(line_time(rk["line"], rk.get("nth", 1)) + rk.get("offset", 0), 3)})
props = []
for p in spec.get("props", []):
    q = {k: v for k, v in p.items() if k not in ("word", "line", "nth", "offset")}
    t = word_time(p["word"], p.get("nth", 1)) if "word" in p else line_time(p["line"], p.get("nth", 1))
    q["t"] = round(t + p.get("offset", 0), 3)
    props.append(q)
for k in keys:
    print(f"key {k['at']} at {k['t']:.2f}s")
for p in props:
    print(f"prop {p['type']:<12} at {p['t']:6.2f}s")

tl = json.load(open(os.path.join(d, "base_timeline.json")))
tl.update({
    "duration": DUR, "audio": wav, "words": words,
    "beats": [round(float(b), 3) for b in beats if b < DUR],
    "downbeats": [round(float(b), 3) for b in downbeats if b < DUR],
    "keys": keys, "props": props,
    "liftSpeed": 4.0,
})
for k in ("world", "track", "title", "accent", "seed"):   # per-song overrides
    if k in spec:
        tl[k] = spec[k]
json.dump(tl, open(os.path.join(d, "timeline.json"), "w"), indent=1)
print("wrote", os.path.join(d, "timeline.json"))
