import sys, os, wave, subprocess
import numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B
SR = B.SR; P = os.path.expanduser("~/cizgi/blocky-world"); OUT = P + "/out/voices"; FS = P + "/work/fs"
sil = lambda s: np.zeros(int(s * SR), np.float32)
norm = lambda x: (x / max(1e-6, np.abs(x).max()) * 0.9).astype(np.float32)
def rd(i):
    with wave.open(f"{FS}/{i}.wav") as w: x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    return norm(B.trim(x))
def label(t): return np.concatenate([norm(B.trim(B.tts(t, "af_heart", 1.05))) * 0.55, sil(0.35)])
def save(name, parts):
    y = np.concatenate(parts); p = f"{OUT}/{name}.wav"
    with wave.open(p, "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", p, "-b:a", "128k", p[:-4] + ".mp3"], check=True); os.remove(p); print(name, round(len(y) / SR, 1), "s", flush=True)
t = lambda n: np.arange(int(n * SR)) / SR
def tuba_laugh():  # descending "bwah" notes, like a tuba laughing
    out = []
    for i, m in enumerate([46, 44, 42, 44, 41, 39, 34]):
        d = 0.2 if i < 6 else 0.6; x = t(d); f = 440 * 2 ** ((m - 69) / 12) * (1 + 0.5 * np.exp(-x * 30))
        ph = 2 * np.pi * np.cumsum(f) / SR; y = sum(np.sin(ph * k) / k ** 1.1 for k in range(1, 9)); env = np.minimum(1, x * 60) * np.exp(-x * (5 if i < 6 else 3))
        out += [y * env, sil(0.05)]
    return norm(np.concatenate(out))
def squeak_laugh():  # squeaky dog-toy giggle
    out = []
    for i in range(6):
        d = 0.13; x = t(d); f = np.linspace(900 + 80 * i, 1900 + 150 * (i % 2), len(x)); ph = 2 * np.pi * np.cumsum(f) / SR
        y = np.sin(ph) + 0.4 * np.sin(2 * ph) + 0.15 * np.random.RandomState(i).randn(len(x)); out += [y * np.sin(np.pi * x / d) ** 0.5, sil(0.05)]
    return norm(np.concatenate(out))
def honk_laugh():  # clown-horn "honk honk honk"
    out = []
    for i, f0 in enumerate([330, 330, 392, 330, 262]):
        d = 0.17 if i < 4 else 0.45; x = t(d); f = f0 * (1 - 0.12 * x / d); ph = 2 * np.pi * np.cumsum(np.full(len(x), 1.0) * f) / SR
        y = np.sign(np.sin(ph)) * 0.5 + np.sin(ph * 2) * 0.4 + np.sin(ph * 3) * 0.25; y = np.convolve(y, np.ones(6) / 6, "same"); out += [y * np.minimum(1, x * 80) * np.minimum(1, (d - x) * 40), sil(0.07)]
    return norm(np.concatenate(out))
up = lambda x, st: norm(B.shape_voice(x, pitch=st))
toast = [("one. Goofy laugh", 697900, 3), ("two. Wacky laugh", 731882, 3), ("three. Goofy man", 671083, 4), ("four. Clown laugh", 697530, 3), ("five. Cute cartoon laugh", 513983, 0), ("six. Chipmunk laugh", 463817, 0)]
parts = []
for lab, i, st in toast: parts += [label("Toast laugh " + lab + "."), up(rd(i), st) if st else rd(i), sil(0.7)]
save("toast_laughs_recorded", parts)
dino = [("one. Tuba laugh, made by code", tuba_laugh()), ("two. Squeaky toy laugh, made by code", squeak_laugh()), ("three. Clown horn laugh, made by code", honk_laugh()),
        ("four. Old man laugh, pitched down", up(rd(166150), -5)), ("five. Demonic laugh", rd(522132)), ("six. Alien cackle", rd(447921)), ("seven. Imp laugh, pitched down", up(rd(205751), -4)),
        ("eight. Monster burp", rd(463721)), ("nine. Monster burp two", rd(142932)), ("ten. Loud burp", rd(214451)), ("eleven. Short burp", rd(570266))]
parts = []
for lab, x in dino: parts += [label("Donutsaurus " + lab + "."), x, sil(0.7)]
save("donutsaurus_sounds", parts)
save("pixi_laugh_recorded", [label("Pixi laugh one."), rd(198263), sil(0.5), label("Pixi laugh one, higher."), up(rd(198263), 3), sil(0.5)])
