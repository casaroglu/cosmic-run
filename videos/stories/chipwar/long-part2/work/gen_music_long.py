"""Evolving synthesized music bed for the long Part 2 (build_audio.music, no samples): one mood per chapter,
2.5 s cross-fades at the chapter starts. Run with the Kokoro venv after the voice: python work/gen_music_long.py"""
import sys, os, wave, json, numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
segs = json.load(open(f"{P}/work/segments.json")); ch = json.load(open(f"{P}/work/chapters.json"))
total = segs[-1]["e"] + 2.0
MOODS = {"open": "tense", "06": "somber", "07": "tense", "08": "bittersweet", "09": "epic", "10": "tense", "outro": "epic"}
names = sorted(ch, key=lambda k: ch[k]); starts = [0.0] + [segs[ch[k]]["s"] for k in names[1:]]
ends = starts[1:] + [total]; X = 2.5; SR = B.SR
out = np.zeros(int((total + 3) * SR))
for i, (k, s, e) in enumerate(zip(names, starts, ends)):
    seg = B.music(e - s + X + 2.0, mood=MOODS[k], seed=11 + i, bar=3.0)
    a = int(max(0, s - X / 2) * SR); seg = seg[: len(out) - a]
    out[a:a + len(seg)] += seg
y = out / np.abs(out).max() * 0.9
with wave.open(f"{P}/work/music.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes())
print("music", round(total, 1), [round(s, 1) for s in starts])
