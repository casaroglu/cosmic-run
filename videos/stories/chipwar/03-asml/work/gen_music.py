"""Very low synthesized music bed for Chip Wars 03 (build_audio.music, no samples). run with the Kokoro venv."""
import sys, os, wave, json, numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B
P = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dur = json.load(open(f"{P}/work/segments.json"))[-1]["e"] + 1.2
y = B.music(dur, mood=sys.argv[1] if len(sys.argv) > 1 else "tense", seed=3, bar=3.0)
y = y / np.abs(y).max() * 0.9
with wave.open(f"{P}/work/music.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(B.SR); w.writeframes((y * 32767).astype(np.int16).tobytes())
print("music", round(dur, 2))
