"""S1: generate each line, lay out the shots from the script durations (extended if a line needs it), write voice.wav, words.json, timeline.json"""
import sys, json, os, wave
import numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B, align as A
W = os.path.expanduser("~/cizgi/toast-s1/work"); SR = B.SR
DUR = [1.2, 0.8, 3.9, 2.3, 2.2, 2.0, 3.4, 1.5, 3.3, 1.2, 3.8, 1.4, 2.3, 2.0, 2.0]   # script shot durations
V = {"toast": ("am_liam", 5, 1.08), "pixi": ("af_bella", 0, 0.95)}
lines = json.load(open(f"{W}/lines.json")); clips = []
SPOKEN = {"A.M.": "ay-em."}
spoken = lambda t: " ".join(SPOKEN.get(w, w) for w in t.split())
for sp, text, shot, off in lines:
    voice, st, speed = V[sp]; r = 2 ** (st / 12); x = B.trim(B.tts(spoken(text), voice, speed / r)); x = np.concatenate([x, np.zeros(int(0.12 * SR), np.float32)])
    if st: x = B.shape_voice(x, pitch=st)
    clips.append((x / max(1e-6, np.abs(x).max()) * 0.9).astype(np.float32))
starts, shots, t, li = [None] * len(lines), [], 0.0, 0
for si, d in enumerate(DUR, 1):
    s0, need, prev_end = t, d, None
    for i, (sp, text, shot, off) in enumerate(lines):
        if shot != si: continue
        st = (prev_end + float(off.split("+")[1])) if isinstance(off, str) else s0 + off
        starts[i] = st; prev_end = st + len(clips[i]) / SR
        need = max(need, prev_end - s0 + (0.02 if si == len(DUR) else 0.25))
    shots.append({"n": si, "s": round(s0, 3), "e": round(s0 + need, 3)}); t = s0 + need
total = t; y = np.zeros(int((total + 0.05) * SR), np.float32); words, segs = [], []
for i, (sp, text, shot, off) in enumerate(lines):
    x = clips[i]; a = int(starts[i] * SR); y[a:a + len(x)] += x[: len(y) - a]
    ws = A.word_times(text, spoken(text), x, SR, starts[i])
    try: ws = A.refine(ws, x, SR, starts[i])
    except Exception as e: print("refine skip", e)
    for w in ws: words.append({"w": w["w"], "s": round(w["t0"], 3), "e": round(max(w["t1"], w["t0"] + 0.05), 3), "sp": sp})
    segs.append({"sp": sp, "text": text, "shot": shot, "s": round(starts[i], 3), "e": round(starts[i] + len(x) / SR, 3)})
with wave.open(f"{W}/voice.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
json.dump(words, open(f"{W}/words.json", "w"), indent=0); json.dump(segs, open(f"{W}/segments.json", "w"), indent=1)
json.dump({"total": round(total, 3), "shots": shots}, open(f"{W}/timeline.json", "w"), indent=1)
print("total", round(total, 2)); [print(s) for s in shots]; [print(s["shot"], s["s"], s["e"], s["text"]) for s in segs]
