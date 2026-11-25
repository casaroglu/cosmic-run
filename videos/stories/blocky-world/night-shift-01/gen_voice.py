import sys, json, os, wave
import numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B, align as A
P = os.path.expanduser("~/cizgi/blocky-world"); W = P + "/work"
lines = json.load(open(f"{W}/pilot/lines.json"))
V = {"toast": ("am_liam", 5, 1.08), "pixi": ("af_bella", 0, 0.95)}
SR = B.SR; out, t, words, segs = [np.zeros(int(0.15 * SR), np.float32)], 0.15, [], []
for i, (sp, text, gap) in enumerate(lines):
    voice, st, speed = V[sp]
    r = 2 ** (st / 12); x = B.trim(B.tts(text, voice, speed / r))
    if st: x = B.shape_voice(x, pitch=st)
    x = (x / max(1e-6, np.abs(x).max()) * 0.9).astype(np.float32)
    ws = A.word_times(text, text, x, SR, t)
    try: ws = A.refine(ws, x, SR, t)
    except Exception as e: print("refine skip", e)
    for w in ws: words.append({"w": w["w"], "s": round(w["t0"], 3), "e": round(max(w["t1"], w["t0"] + 0.05), 3), "sp": sp})
    segs.append({"sp": sp, "text": text, "s": round(t, 3), "e": round(t + len(x) / SR, 3)})
    out.append(x); t += len(x) / SR; out.append(np.zeros(int(gap * SR), np.float32)); t += gap
y = np.concatenate(out)
with wave.open(f"{W}/voice.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes())
json.dump(words, open(f"{W}/words.json", "w"), indent=0)
json.dump(segs, open(f"{W}/segments.json", "w"), indent=1)
print("dur", round(t, 2), "words", len(words))
for s in segs: print(s["sp"], s["s"], s["e"], s["text"])
