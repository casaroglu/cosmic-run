"""Final mix: out/mix.wav (voice+music+sfx from audio.py) + meme cues + Fu—."""
import json, wave, os, numpy as np
P = os.path.expanduser("~/cizgi/toast-t6"); FPS = 30; SR = 48000
def rd(p):
    with wave.open(p) as w: n, ch, sr, sw = w.getnframes(), w.getnchannels(), w.getframerate(), w.getsampwidth(); raw = w.readframes(n)
    x = (np.frombuffer(raw, np.int16).astype(np.float32) / 32768) if sw == 2 else (np.frombuffer(raw, np.int32).astype(np.float32) / 2**31)
    return x.reshape(-1, ch).mean(1), sr
def rs(x, sr): return np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x).astype(np.float32)
cue = json.load(open(P + "/work/cues.json")); N = int((cue["end"] + 0.05) * SR)
base = rs(*rd(P + "/out/mix_base.wav")); out = np.zeros(N, np.float32); out[: min(N, len(base))] = base[:N]
MEME = os.path.expanduser("~/cizgi/blocky-world/work/meme/")
def add(x, t, g):
    i = int(t * SR); j = min(N, i + len(x))
    if j > i: out[i:j] += x[: j - i] * g
for name, f, g in cue["meme"]:
    x = rs(*rd(P + "/work/cb/fu.wav" if name == "fuuu" else (P + "/sfx_lib/" + name[4:] + ".wav" if name.startswith("lib:") else MEME + name + ".wav"))); x = x / max(1e-6, np.abs(x).max()) * 0.85
    if name == "fuuu": x = x[: int(0.95 * SR)]; x[-720:] *= np.linspace(1, 0, 720)
    if name == "362206": x = x[: int(2.2 * SR)]
    if name == "lib:dino_laugh_squeak": x = x[: int(0.6 * SR)]
    if name == "164572": x = x[: int(1.5 * SR)]
    if name == "704942": x = x[: int(0.9 * SR)]
    add(x, f / FPS, g * 0.55)
pk = np.abs(out).max(); out = out / pk * 0.89 if pk > 0.89 else out
with wave.open(P + "/out/mix.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print("mix ok", round(N / SR, 2), "peak", round(float(pk), 2))
