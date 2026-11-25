import sys, json, os, wave
import numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B, align as A
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
lines = json.load(open(f"{P}/work/lines.json"))
V = {"q": ("af_heart", 1.0), "a": ("bm_fable", 1.05)}
SR = B.SR
out, t, words, segs = [], 0.25, [], []
out.append(np.zeros(int(0.25 * SR), np.float32))
for i, (sp, text) in enumerate(lines):
    voice, speed = V[sp]
    x = B.tts(text, voice, speed)
    if sp == "q":
        x = B.shape_voice(x, pitch=1.0, rise=2.5)
    ws = A.word_times(text, text, x, SR, t)
    try: ws = A.refine(ws, x, SR, t)
    except Exception as e: print("refine skip", e)
    for w in ws: words.append({"w": w["w"], "s": w["t0"], "e": max(w["t1"], w["t0"] + 0.05), "sp": sp})
    segs.append({"sp": sp, "text": text, "s": round(t, 3), "e": round(t + len(x) / SR, 3)})
    out.append(x); t += len(x) / SR
    gap = 0.45 if sp == "q" else (0.6 if i == len(lines) - 2 else 0.3)
    out.append(np.zeros(int(gap * SR), np.float32)); t += gap
y = np.concatenate(out); y = y / max(1e-6, np.abs(y).max()) * 0.9
with wave.open(f"{P}/work/voice.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes())
json.dump(words, open(f"{P}/work/words_tts.json", "w"), indent=0)
json.dump(segs, open(f"{P}/work/segments.json", "w"), indent=1)
open(f"{P}/script.txt", "w").write(" ".join(l[1] for l in lines))
print("dur", round(t, 2), "words", len(words))
for s in segs: print(s["sp"], s["s"], s["e"], s["text"][:50])
