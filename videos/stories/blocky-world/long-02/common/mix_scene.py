"""Scene mix: voice + music*gate + sfx (from tools/audio.py) + extras. usage: mix_scene.py <scene_dir>
work/cues.json: {"end": s, "mute": [[a,b],...] (music off, seconds), "extras": [[name, t, gain, maxdur?], ...]}
name: meme id (blocky-world/work/meme/<id>.wav) | lib name (sfx_lib/<name>.wav) | "squeak" | "fu" (work/cb/fu.wav)"""
import json, wave, sys, os, numpy as np
S = sys.argv[1]; SR = 48000
def rd(p):
    with wave.open(p) as w: n, ch, sr, sw = w.getnframes(), w.getnchannels(), w.getframerate(), w.getsampwidth(); raw = w.readframes(n)
    x = (np.frombuffer(raw, np.int16).astype(np.float32) / 32768) if sw == 2 else (np.frombuffer(raw, np.int32).astype(np.float32) / 2**31)
    x = x.reshape(-1, ch).mean(1); return np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x).astype(np.float32)
cue = json.load(open(f"{S}/work/cues.json")); N = int(cue["end"] * SR)
fit = lambda x: np.pad(x[:N], (0, max(0, N - len(x))))
voice, music, sfx = fit(rd(f"{S}/work/voice.wav")), fit(rd(f"{S}/work/music.wav")), fit(rd(f"{S}/work/sfx.wav"))
gate = np.ones(N, np.float32)
for a, b in cue.get("mute", []): gate[int(a * SR): int(b * SR)] = 0
gate = np.convolve(gate, np.ones(2400) / 2400, "same"); out = voice + music * gate + sfx
def add(x, t, g):
    i = int(t * SR); j = min(N, i + len(x))
    if j > i: out[i:j] += x[: j - i] * g
tt = np.arange(int(0.12 * SR)) / SR; ch = np.sin(2 * np.pi * np.cumsum(np.linspace(1700, 2700, len(tt))) / SR) * np.hanning(len(tt)) * 0.45
SYN = {"squeak": np.concatenate([ch, np.zeros(int(0.05 * SR)), ch[::-1]]).astype(np.float32)}
rng = np.random.RandomState(3); _hiss = np.convolve(rng.randn(SR * 12).astype(np.float32), np.ones(3) / 3, "same") * 0.25
_muf = np.convolve(_hiss, np.ones(40) / 40, "same") * 3
SYN["hiss"], SYN["hiss_muffled"] = _hiss, _muf
FS = "/Users/canberkasaroglu/cizgi/blocky-world/work/fs/"; MEME = "/Users/canberkasaroglu/cizgi/blocky-world/work/meme/"; LIB = f"{S}/sfx_lib/"
for e in cue.get("extras", []):
    name, t, g = e[0], e[1], e[2]; md = e[3] if len(e) > 3 else None
    if name in SYN: x = SYN[name]
    else:
        p = f"{S}/work/cb/fu.wav" if name == "fu" else f"{S}/work/cb/isthat.wav" if name == "isthat" else (MEME + name + ".wav" if os.path.exists(MEME + name + ".wav") else (FS + name + ".wav" if os.path.exists(FS + name + ".wav") else LIB + name + ".wav")); x = rd(p)
    x = x / max(1e-6, np.abs(x).max()) * 0.85
    if md: n2 = int(md * SR); x = x[:n2].copy(); f2 = min(len(x), 1200); x[-f2:] *= np.linspace(1, 0, f2)
    add(x, t, g * 0.55)
pk = np.abs(out).max(); out = out / pk * 0.89 if pk > 0.89 else out
with wave.open(f"{S}/out/mix.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print("mix", round(N / SR, 2), "s peak", round(float(pk), 2))
