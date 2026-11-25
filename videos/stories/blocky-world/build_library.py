"""Blocky World sound library: approved laughs/burps -> sfx_lib/*.wav + library.json; plus Pixi laugh candidates."""
import sys, os, json, wave
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import laugh_samples as L
P = L.P; LIB = P + "/sfx_lib"; os.makedirs(LIB, exist_ok=True); SR = L.SR
def w(name, x):
    with wave.open(f"{LIB}/{name}.wav", "wb") as f: f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR); f.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
    return round(len(x) / SR, 2)
items = [  # name, who, kind, rank, source, audio
 ("toast_laugh_goofy", "toast", "laugh", 1, "freesound 697900 (+3 st)", L.up(L.rd(697900), 3)),
 ("toast_laugh_wacky", "toast", "laugh", 1, "freesound 731882 (+3 st)", L.up(L.rd(731882), 3)),
 ("toast_laugh_clown", "toast", "laugh", 1, "freesound 697530 (+3 st)", L.up(L.rd(697530), 3)),
 ("toast_laugh_cute", "toast", "laugh", 1, "freesound 513983", L.rd(513983)),
 ("toast_laugh_chipmunk", "toast", "laugh", 1, "freesound 463817", L.rd(463817)),
 ("dino_laugh_oldman", "donutsaurus", "laugh", 1, "freesound 166150 (-5 st)", L.up(L.rd(166150), -5)),
 ("dino_laugh_demonic", "donutsaurus", "laugh", 2, "freesound 522132", L.rd(522132)),
 ("dino_laugh_tuba", "donutsaurus", "laugh", 3, "synth (laugh_samples.tuba_laugh)", L.tuba_laugh()),
 ("dino_laugh_squeak", "donutsaurus", "laugh", 4, "synth (laugh_samples.squeak_laugh)", L.squeak_laugh()),
 ("dino_laugh_honk", "donutsaurus", "laugh", 5, "synth (laugh_samples.honk_laugh)", L.honk_laugh()),
 ("dino_burp_loud", "donutsaurus", "burp", 1, "freesound 214451", L.rd(214451)),
 ("dino_burp_short", "donutsaurus", "burp", 1, "freesound 570266", L.rd(570266)),
 ("dino_burp_monster", "donutsaurus", "burp", 2, "freesound 463721", L.rd(463721)),
 ("dino_burp_monster2", "donutsaurus", "burp", 2, "freesound 142932", L.rd(142932)),
]
lib = [{"file": n + ".wav", "who": who, "kind": kind, "rank": r, "source": src, "dur": w(n, x)} for n, who, kind, r, src, x in items]
json.dump({"note": "rank 1 = user's favourite; all recordings CC0 (see SOUND_CREDITS.md). Rejected: toast 671083, dino 447921 + 205751, synth HO HO HO, stepped TTS laughs.", "sounds": lib}, open(LIB + "/library.json", "w"), indent=1)
print(len(lib), "sounds ->", LIB)
pix = [("one. Soft laugh", 344001), ("two. Female laugh", 151223), ("three. Giggle", 611781), ("four. Short chuckle", 397673), ("five. Lady laugh", 391547), ("six. Woman laugh", 468514), ("seven. Female laugh, longer", 93775), ("eight. Cute giggle", 611780)]
parts = []
for lab, i in pix: parts += [L.label("Pixi laugh " + lab + "."), L.rd(i), L.sil(0.7)]
L.save("pixi_laughs_recorded", parts)
