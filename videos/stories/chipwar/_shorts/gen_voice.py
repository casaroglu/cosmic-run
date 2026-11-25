"""Chip Wars Shorts voice: Kokoro Q&A, the Chip Wars cast (q = af_sky, a = bm_fable), fast and lively.
run: ~/.cache/kokoro/venv/bin/python ../_shorts/gen_voice.py <episode dir>"""
import sys, json, os, wave
import numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B, align as A
P = os.path.abspath(sys.argv[1])
lines = json.load(open(f"{P}/work/lines.json"))
V = {"q": ("af_sky", 1.15, 0.5, 3.5), "a": ("bm_fable", 1.18, 0.8, 0.0)}
GAP = {"q": 0.16, "a": 0.12}
SR = B.SR
out, t, words, segs = [], 0.15, [], []
out.append(np.zeros(int(0.15 * SR), np.float32))
for i, (sp, text) in enumerate(lines):
    voice, speed, pitch, rise = V[sp]
    x = B.shape_voice(B.tts(text, voice, speed), pitch=pitch, rise=rise)
    ws = A.word_times(text, text, x, SR, t)
    try: ws = A.refine(ws, x, SR, t)
    except Exception as e: print("refine skip", e)
    for w in ws: words.append({"w": w["w"], "s": w["t0"], "e": max(w["t1"], w["t0"] + 0.05), "sp": sp})
    segs.append({"sp": sp, "text": text, "s": round(t, 3), "e": round(t + len(x) / SR, 3)})
    out.append(x); t += len(x) / SR
    gap = GAP[sp] if i < len(lines) - 1 else 0.0
    if i + 1 < len(lines) and lines[i + 1][0] != sp: gap += 0.08     # tiny breath when the speaker changes
    out.append(np.zeros(int(gap * SR), np.float32)); t += gap
y = np.concatenate(out); y = y / max(1e-6, np.abs(y).max()) * 0.9
with wave.open(f"{P}/work/voice.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes())
json.dump(words, open(f"{P}/work/words_tts.json", "w"), indent=0)
json.dump(segs, open(f"{P}/work/segments.json", "w"), indent=1)
open(f"{P}/script.txt", "w").write("\n".join(f"{l[0].upper()}: {l[1]}" for l in lines) + "\n")
print("dur", round(t, 2), "words", len(words))
for s in segs: print(s["sp"], s["s"], s["e"], s["text"][:60])
