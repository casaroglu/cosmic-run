import sys, os, wave, subprocess
import numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B
SR = B.SR; OUT = os.path.expanduser("~/cizgi/blocky-world/out/voices")
sil = lambda s: np.zeros(int(s * SR), np.float32)
norm = lambda x: x / max(1e-6, np.abs(x).max()) * 0.9
def say(text, voice, st=0.0, speed=1.0):
    r = 2 ** (st / 12); x = B.trim(B.tts(text, voice, max(0.6, min(1.6, speed / r))))
    return norm(B.shape_voice(x, pitch=st) if st else x)
def label(t): return np.concatenate([say(t, "af_heart", 0, 1.05) * 0.6, sil(0.35)])
def save(name, parts):
    y = np.concatenate(parts); p = f"{OUT}/{name}.wav"
    with wave.open(p, "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", p, "-b:a", "128k", p[:-4] + ".mp3"], check=True); os.remove(p); print(name, round(len(y) / SR, 1), "s", flush=True)
def cands(name, lines, opts):
    parts = []
    for i, (voice, st, sp) in enumerate(opts):
        parts.append(label(f"{name}, option {'ABC'[i]}."))
        for l in lines: parts += [say(l, voice, st, sp), sil(0.3)]
        parts.append(sil(0.6))
    save(name.lower().replace(" ", "_"), parts)
def laugh(voice, st0, steps, syl="Ha!", gap=0.02):
    out = []
    for s in steps:
        x = say(syl, voice, st0 + s, 1.25); out += [x[: int(0.24 * SR)] * np.linspace(1, 0.2, min(len(x), int(0.24 * SR))) ** 0.5, sil(gap)]
    return np.concatenate(out)
which = sys.argv[1:] or ["toast", "pixi", "admin", "dino", "laughs"]
if "toast" in which: cands("Toast", ["It's three A M at the donut shop. What could possibly go wrong?", "Want sprinkles on that, sir?", "Pixi! He has no shadow! Aaaah!"], [("am_puck", 4, 1.08), ("am_liam", 5, 1.08), ("af_river", 2, 1.1)])
if "pixi" in which: cands("Pixi", ["Toast. That customer has no shadow.", "Don't touch it. Toast. I said don't touch it.", "Told you."], [("af_bella", 0, 0.95), ("af_kore", 0, 0.95), ("bf_emma", 1, 0.98)])
if "admin" in which:
    parts = []
    for i, (v, st) in enumerate([("bm_george", -4), ("am_onyx", -3)]):
        parts.append(label(f"The Admin, option {'AB'[i]}."))
        x = np.concatenate([say("Player Toast.", v, st, 0.9), sil(0.35), say("You are... toasted.", v, st, 0.85), sil(0.5)])
        parts += [norm(B.reverb(x, seconds=1.8, mix=0.35)), sil(0.6)]
    save("the_admin", parts)
if "dino" in which:
    parts = [label("Donutsaurus, tiny squeak.")]
    for v, st in [("af_sky", 9), ("af_nova", 11)]: parts += [say("Meep! Meep meep!", v, st, 1.2), sil(0.5)]
    parts.append(label("Donutsaurus, big laugh, option A."))
    parts += [norm(B.reverb(laugh("am_santa", -6, [0, -2, -4, -1, -3, -6], "Ho!", 0.1), seconds=1.2, mix=0.3)), sil(0.6)]
    parts.append(label("Option B."))
    parts += [norm(B.reverb(laugh("bm_george", -8, [0, -2, -4, 1, -1, -3, -7], "Ho!", 0.06), seconds=1.2, mix=0.3)), sil(0.6)]
    save("donutsaurus", parts)
if "laughs" in which:
    parts = [label("Toast, big laugh.")] + [laugh("am_puck", 5, [0, 3, 5, 2, 4, 7, 3, 5, 9, 4, 1, -2], "Ha!"), sil(0.6)]
    parts += [label("Pixi, small laugh.")] + [laugh("af_bella", 1, [2, 0, -1], "Heh.", 0.08), sil(0.5)]
    save("laughs", parts)

if "export" in which:
    def wsave(name, y):
        with wave.open(f"{OUT}/{name}.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    wsave("_dino_ho", norm(B.reverb(laugh("am_santa", -6, [0, -2, -4, -1, -3], "Ho!", 0.06), seconds=1.2, mix=0.3)))
    wsave("_pixi_heh", say("Heh.", "af_bella", 1, 1.0))
    wsave("_toast_scream", say("Aaaaaah!", "am_puck", 5, 0.8))
    wsave("_toast_uhoh", say("Uh oh.", "am_puck", 4, 1.0))
