import sys, os, json, wave, subprocess, numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B
D = os.path.dirname(os.path.abspath(__file__)); SR = 24000
def rd(p):
    with wave.open(p) as w: x = np.frombuffer(w.readframes(w.getnframes()), np.int16 if w.getsampwidth() == 2 else np.int32).astype(np.float32); sr = w.getframerate(); ch = w.getnchannels()
    x = x.reshape(-1, ch).mean(1) / (32768 if w.getsampwidth() == 2 else 2**31); return np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x).astype(np.float32)
def rdf(p):  # torchaudio float wav
    import soundfile as sf; x, sr = sf.read(p, dtype="float32"); x = x if x.ndim == 1 else x.mean(1); return np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x).astype(np.float32)
norm = lambda x: x / max(1e-6, np.abs(x).max()) * 0.85
sil = lambda s: np.zeros(int(s * SR), np.float32)
lab = lambda t: np.concatenate([norm(B.trim(B.tts(t, "af_heart", 1.1))) * 0.5, sil(0.25)])
S1 = "/Users/canberkasaroglu/cizgi/toast-s1/work"; seg = json.load(open(S1 + "/segments.json")); v = rd(S1 + "/voice.wav")
kok = lambda i: v[int(seg[i]["s"] * SR): int(seg[i]["e"] * SR)]
L = json.load(open(D + "/lines.json")); IDX = {"toast": [1, 3, 4, 2], "pixi": [5, 7, 8]}
TAG = {"toast": [("clone_e07", "Chatterbox A"), ("clone_e10", "Chatterbox B, more emotion"), ("default_e08", "Chatterbox C, default voice")], "pixi": [("clone_e035", "Chatterbox A"), ("clone_e06", "Chatterbox B, more emotion")]}
for who in ("toast", "pixi"):
    parts = []
    for i, text in enumerate(L[who]):
        parts += [lab(f"Line {i + 1}. Kokoro, current."), norm(kok(IDX[who][i])), sil(0.5)]
        for tag, name in TAG[who]:
            p = f"{D}/out/cb_{who}_{i}_{tag}.wav"
            if os.path.exists(p): parts += [lab(name + "."), norm(B.trim(rdf(p))), sil(0.5)]
        parts.append(sil(0.4))
    y = np.concatenate(parts); o = f"{D}/{who}_kokoro_vs_chatterbox"
    with wave.open(o + ".wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", o + ".wav", "-b:a", "128k", o + ".mp3"], check=True); os.remove(o + ".wav"); print(who, round(len(y) / SR, 1), "s")
