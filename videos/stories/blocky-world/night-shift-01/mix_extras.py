"""Adds library laughs/burps + a reversed customer mumble on top of out/mix.wav."""
import sys, os, json, wave
import numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B
P = os.path.expanduser("~/cizgi/blocky-world")
def rd(p):
    with wave.open(p) as w: n, ch, sr = w.getnframes(), w.getnchannels(), w.getframerate(); x = np.frombuffer(w.readframes(n), np.int16).astype(np.float32).reshape(-1, ch) / 32768
    return x, sr
mix, SR = rd(P + "/out/mix.wav"); ch = mix.shape[1]
def add(x, sr, t, gain, maxdur):
    if maxdur: x = x[: int(maxdur * sr)]; fade = min(len(x), int(0.25 * sr)); x[-fade:] *= np.linspace(1, 0, fade)
    y = np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x) * gain
    i = int(t * SR); j = min(len(mix), i + len(y)); mix[i:j] += y[: j - i, None]
for k, (t, name, gain, dur) in json.load(open(P + "/work/pilot/extras.json")).items():
    if name: x, sr = rd(f"{P}/sfx_lib/{name}.wav"); add(x[:, 0] / max(1e-6, np.abs(x).max()) * 0.85, sr, t, gain, dur)
    else:
        v = B.trim(B.tts("Yes, one glazed, extra sprinkles, thank you very much.", "bm_george", 1.25)); v = B.shape_voice(v[::-1].copy(), pitch=-3); add(v / np.abs(v).max() * 0.7, B.SR, t, gain, 0.9)
peak = np.abs(mix).max(); mix = mix / peak * 0.89 if peak > 0.89 else mix
with wave.open(P + "/out/mix.wav", "wb") as w: w.setnchannels(ch); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix.reshape(-1) * 32767).astype(np.int16).tobytes())
print("extras mixed, peak", round(float(peak), 2), "sr", SR, "ch", ch)
