"""Final mix: voice + music (muted while everyone is frozen) + sfx + snores/squeaks/laugh/yawn."""
import json, wave, numpy as np
P = "/Users/canberkasaroglu/cizgi/itw-01"; FPS = 30
def rd(p):
    with wave.open(p) as w: n, ch, sr = w.getnframes(), w.getnchannels(), w.getframerate(); x = np.frombuffer(w.readframes(n), np.int16).astype(np.float32).reshape(-1, ch) / 32768
    return x.mean(1), sr
def rs(x, sr, SR): return np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x).astype(np.float32)
SR = 48000; cue = json.load(open(P + "/work/cues.json")); N = int((cue["end"] + 0.3) * SR)
def fit(x): y = np.zeros(N, np.float32); y[: min(N, len(x))] = x[:N]; return y
voice = fit(rs(*rd(P + "/work/voice.wav"), SR)); music = fit(rs(*rd(P + "/work/music.wav"), SR)); sfx = fit(rs(*rd(P + "/work/sfx.wav"), SR))
gate = np.ones(N, np.float32)
for a, b in cue["silence"]:
    i, j = int(a / FPS * SR), int(b / FPS * SR); gate[i:j] = 0
gate = np.convolve(gate, np.ones(2400) / 2400, "same")
out = voice + music * gate + sfx
def add(x, t, g=1.0):
    i = int(t * SR); j = min(N, i + len(x))
    if j > i: out[i:j] += x[: j - i] * g
# snore: one real snore, pitched down ~7 st (slower), trimmed to each bubble
sn, sr = rd("/Users/canberkasaroglu/cizgi/blocky-world/work/fs/760034.wav"); sn = sn[int(0.3 * sr): int(2.1 * sr)]; sn = rs(sn, sr, int(SR / 1.5)); sn = rs(sn, SR / 1.5, SR) if False else np.interp(np.arange(int(len(sn) * 1.5)) / 1.5, np.arange(len(sn)), sn).astype(np.float32)
sn = sn / np.abs(sn).max() * 0.8
for t, d in cue["snore"]:
    x = sn[: int(d * SR)].copy(); fade = min(len(x), int(0.08 * SR)); x[-fade:] *= np.linspace(1, 0, fade); add(x, t, 0.7)
# squeak: two short rising chirps
tt = np.arange(int(0.12 * SR)) / SR
ch = np.sin(2 * np.pi * np.cumsum(np.linspace(1700, 2700, len(tt))) / SR) * np.hanning(len(tt)) * 0.45
sq = np.concatenate([ch, np.zeros(int(0.05 * SR)), ch[::-1]]).astype(np.float32)
for f in cue["squeak"]: add(sq, f / FPS, 0.9)
la, sr = rd(P + "/sfx_lib/dino_laugh_oldman.wav"); la = rs(la, sr, SR)[: int(1.8 * SR)]; la[-4800:] *= np.linspace(1, 0, 4800); add(la / np.abs(la).max() * 0.8, cue["laugh"] / FPS, 0.8)
yw, sr = rd(P + "/sfx_lib/dino_burp_monster.wav"); yw = rs(yw, sr, SR); yw = np.interp(np.arange(int(len(yw) * 1.4)) / 1.4, np.arange(len(yw)), yw).astype(np.float32); add(yw / np.abs(yw).max() * 0.7, cue["yawn"] / FPS, 0.6)
pk = np.abs(out).max(); out = out / pk * 0.89 if pk > 0.89 else out
with wave.open(P + "/out/mix.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print("mix ok", round(N / SR, 2), "s, peak", round(float(pk), 2))
