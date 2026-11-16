#!/usr/bin/env python3
"""Check that on-screen caption words match the voice in the final audio.

usage: check_sync.py OUT_DIR [--limit 0.3]
Reads OUT_DIR/timeline.json (caption word times) and OUT_DIR/audio.wav (the final mix),
listens to every spoken beat with faster-whisper (word timestamps) and compares when each
caption word appears with when it is actually heard. Prints the worst beats and exits 1 when
any word is off by more than --limit seconds. Run with the TTS venv python (has faster_whisper).
"""
import argparse, difflib, json, re, sys
import numpy as np
import soundfile as sf

ap = argparse.ArgumentParser()
ap.add_argument("out"); ap.add_argument("--limit", type=float, default=0.3)
a = ap.parse_args()

tl = json.load(open(f"{a.out}/timeline.json"))
audio, sr = sf.read(f"{a.out}/audio.wav", dtype="float32", always_2d=True)
audio = audio.mean(axis=1)
from faster_whisper import WhisperModel
m = WhisperModel("base.en", device="cpu", compute_type="int8")
norm = lambda w: re.sub(r"[^\w']", "", w.lower())

bad, rows, allerr = 0, [], []
for b in tl["beats"]:
    words = b.get("words")
    if not words:
        continue
    s0 = max(0.0, b["voiceStart"] - 0.15)
    s1 = min(len(audio) / sr, b["voiceEnd"] + 0.15)
    x = audio[int(s0 * sr): int(s1 * sr)]
    if sr != 16000:
        n = int(len(x) * 16000 / sr)
        x = np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x).astype(np.float32)
    segs, _ = m.transcribe(x, language="en", word_timestamps=True, beam_size=1, condition_on_previous_text=False)
    heard = [(w.word.strip(), s0 + w.start) for s in segs for w in (s.words or [])]
    A, B = [norm(w["w"]) for w in words], [norm(h[0]) for h in heard]
    errs = []
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, A, B, autojunk=False).get_opcodes():
        if op == "equal":
            errs += [(words[i1 + k]["w"], words[i1 + k]["t0"] - heard[j1 + k][1]) for k in range(i2 - i1)]
    if not errs:
        rows.append((9.9, b["start"], b["text"][:50], "not recognised"))
        continue
    worst = max(errs, key=lambda e: abs(e[1]))
    allerr += [abs(e[1]) for e in errs]
    if abs(worst[1]) > a.limit:
        bad += 1
    rows.append((abs(worst[1]), b["start"], b["text"][:50], f"'{worst[0]}' {worst[1]:+.2f}s"))

rows.sort(reverse=True)
print(f"sync: {len(rows)} spoken beats, median word offset {np.median(allerr):.2f}s, "
      f"{bad} beat(s) over {a.limit}s")
for r in rows[:6]:
    print(f"  {r[0]:.2f}s  @{r[1]:6.1f}  {r[3]:22s}  {r[2]}")
sys.exit(1 if bad else 0)
