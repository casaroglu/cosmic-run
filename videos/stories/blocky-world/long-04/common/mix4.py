"""Long 4 scene mix: voice + sfx (tools/audio.py, no music) + music segments + extras.
usage: mix4.py <scene_dir>   (reads work/cues.json written by common/sounds.py)
cues.json: {"end": s, "music": [[style, start, stop, level_db, bpm|null], ...], "extras": [[name, t, gain, maxdur?], ...]}
extras name: meme id | sfx_lib name | "fu" | "hum:<dur>" (lamp hum) | "squeak" """
import json, wave, sys, os, numpy as np
S = sys.argv[1]; SR = 48000
sys.path.insert(0, os.path.join(S, "tools")); import audio as AU
def rd(p):
    with wave.open(p) as w: n, ch, sr, sw = w.getnframes(), w.getnchannels(), w.getframerate(), w.getsampwidth(); raw = w.readframes(n)
    x = (np.frombuffer(raw, np.int16).astype(np.float32) / 32768) if sw == 2 else (np.frombuffer(raw, np.int32).astype(np.float32) / 2**31)
    x = x.reshape(-1, ch).mean(1); return np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x).astype(np.float32)
cue = json.load(open(f"{S}/work/cues.json")); N = int(cue["end"] * SR)
fit = lambda x: np.pad(x[:N], (0, max(0, N - len(x))))
voice = fit(rd(f"{S}/work/voice.wav")); sfx = fit(rd(f"{S}/work/sfx.wav")) if os.path.exists(f"{S}/work/sfx.wav") else np.zeros(N, np.float32)
act = voice[np.abs(voice) > 0.01]; vr = float(np.sqrt(np.mean(act ** 2))) if len(act) > 100 else 0.08
out = voice + sfx
for st, a, b, lev, bpm in cue.get("music", []):
    a, b = max(0, a), min(cue["end"], b)
    if b - a < 1: continue
    m = AU.render_music(st, float(bpm or AU.STYLES[st]["bpm"]), b - a).mean(0).astype(np.float32)
    mr = float(np.sqrt(np.mean(m[np.abs(m) > 1e-4] ** 2))) + 1e-9; m = m / mr * vr * 10 ** (lev / 20)
    f = min(len(m), int(0.4 * SR)); m[:f] *= np.linspace(0, 1, f); f2 = min(len(m), int(0.8 * SR)); m[-f2:] *= np.linspace(1, 0, f2)
    i = int(a * SR); j = min(N, i + len(m)); out[i:j] += m[: j - i]
def add(x, t, g):
    i = int(t * SR); j = min(N, i + len(x))
    if j > i and i >= 0: out[i:j] += x[: j - i] * g
tt = np.arange(int(0.12 * SR)) / SR; ch = np.sin(2 * np.pi * np.cumsum(np.linspace(1700, 2700, len(tt))) / SR) * np.hanning(len(tt)) * 0.45
SYN = {"squeak": np.concatenate([ch, np.zeros(int(0.05 * SR)), ch[::-1]]).astype(np.float32)}
MEME = "/Users/canberkasaroglu/cizgi/blocky-world/work/meme/"; LIB = f"{S}/sfx_lib/"
for e in cue.get("extras", []):
    name, t, g = e[0], e[1], e[2]; md = e[3] if len(e) > 3 else None
    if name.startswith("hum:"):
        d = float(name[4:]); n = int(d * SR); tt2 = np.arange(n) / SR; x = (0.6 * np.sin(2 * np.pi * 100 * tt2) + 0.3 * np.sin(2 * np.pi * 200 * tt2) + 0.1 * np.sin(2 * np.pi * 300 * tt2)).astype(np.float32) * (1 + 0.05 * np.sin(2 * np.pi * 0.7 * tt2)); x *= vr * 0.25 / 0.45
        f = min(n, SR // 2); x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f); add(x, t, g); continue
    if name in SYN: x = SYN[name]
    else:
        p = f"{S}/work/fu.wav" if name == "fu" else (MEME + name + ".wav" if os.path.exists(MEME + name + ".wav") else LIB + name + ".wav"); x = rd(p)
    x = x / max(1e-6, np.abs(x).max()) * 0.85
    if md: n2 = int(md * SR); x = x[:n2].copy(); f2 = min(len(x), 600 if name == "fu" else 1200); x[-f2:] *= np.linspace(1, 0, f2)
    add(x, t, g * 0.55)
pk = np.abs(out).max(); out = out / pk * 0.89 if pk > 0.89 else out
with wave.open(f"{S}/out/mix.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print("mix", round(N / SR, 2), "s peak", round(float(pk), 2), "voice rms", round(vr, 3))
