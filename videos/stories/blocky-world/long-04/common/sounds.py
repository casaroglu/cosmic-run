"""Long 4 per-scene sound design -> sound.json (sfx only, for tools/audio.py) + work/cues.json (music segments + extras, for mix4.py).
usage: sounds.py <scene_dir>"""
import json, sys, os
D = sys.argv[1]; scene = os.path.basename(os.path.abspath(D))
T = json.load(open(f"{D}/work/timeline.json")); SH = T["shots"]; TOT = T["total"]
W = json.load(open(f"{D}/work/words.json")); SEG = json.load(open(f"{D}/work/segments.json"))
S = lambda n: SH[n - 1]["s"]; E = lambda n: SH[n - 1]["e"]; F = lambda n, fr: SH[n - 1]["s"] + fr / 30
def at(w, k=0, fb=None):
    m = [x for x in W if x["w"].lower().strip(".,!?'\"—").startswith(w)]
    return m[k]["s"] if len(m) > k else fb
L = lambda i: SEG[i]["s"]; Le = lambda i: SEG[i]["e"]
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
def ticks(a, b, step=0.4, db=-21):
    out, t = [], a
    while t < b: out.append(fx("tick", t, db)); t += step
    return out
sfx, music, ex = [], [], []
if scene == "s0_cold":
    sfx += [fx("sting", 0.05, -2), fx("tick", S(3) + 0.05, -4), fx("tick", S(4), -2), fx("tick", S(5), -2), fx("tick", S(6), -2), fx("pop", S(7) + 0.05, -6), fx("pop", S(7) + 0.25, -6), fx("pop", S(7) + 0.45, -6)]
    ex += [["512389", F(2, 26) - 0.02, 1.0]]; music += [["mischief", S(7) + 0.1, TOT, -14, None]]
elif scene == "s1_wait":
    pr = [F(3, 50), F(4, 92), F(5, 30)] + [F(6, 8 + i * 7) for i in range(10)] + [F(7, 24)]
    for p in pr: sfx += [fx("click", p, -4), fx("pop", p + 0.03, -12)]
    sfx += [fx("ding", S(1) + 0.3, -6), fx("click", F(2, 12), -6), fx("coin", F(2, 35), -6), fx("paper", F(2, 45), -6), fx("ding", F(3, 62), -10), fx("thud", F(4, 30), -4), fx("ding", F(4, 104), -10)]
    sfx += [fx("tick", F(8, i * 4), -8) for i in range(12)] + [fx("ding", F(8, 52), -2), fx("thud", F(9, 52), -4), fx("magic", S(11) + 0.2, -4)]
    music += [["mischief", 0, S(8) + 1.7, -20, 88], ["mischief", S(8) + 1.8, TOT, -21, 112]]
    ex += [["497092", F(4, 31), 0.6, 1.2], ["squeak", S(1) + 2.0, 0.5], ["squeak", S(4) + 1.0, 0.5], ["704942", F(9, 58) + 1.6, 0.0]]
elif scene == "s2_launch":
    PR = F(13, 40)
    sfx += [fx("ding", S(1) + 0.4, -6), fx("ding", S(3) + 0.3, -6), fx("click", F(4, 8), -4), fx("pop", F(4, 26), -8), fx("click", F(5, 10), -6), fx("pop", F(5, 36), -6), fx("paper", F(5, 40), -8)]
    sfx += [fx("tick", F(8, 8 + i * 13), -6) for i in range(8)] + [fx("click", E(8) - 1.1, 0)] + [fx("tick", F(9, 6 + i * 3), -8) for i in range(16)] + [fx("ding", F(9, 60), -4)]
    sfx += [fx("ding", S(10) + 0.1, -6)] + ticks(S(10), S(14)) + [fx("click", PR, -2), fx("pop", PR + 0.03, -12), fx("click", S(14) + 0.02, 0)]
    sfx += [fx("click", F(15, 40), -6), fx("click", F(16, 20), -2), fx("click", F(16, 95), -2), fx("ding", F(16, 115), -2)] + ticks(S(15), S(19))
    sfx += [fx("tick", F(18, i * 3), -8) for i in range(12)] + [fx("pop", F(18, 30), -4), fx("pop", F(18, 40), -4), fx("pop", F(18, 50), -4)] + ticks(S(19), TOT)
    music += [["mischief", 0, S(8), -21, 100], ["mischief", S(9), S(14), -22, 100], ["mischief", S(17), TOT, -22, 112]]
    b = at("box", 1, S(7) + 4); ex += [["704942", (Le(4) if len(SEG) > 4 else E(7) - 1) + 0.25, 0.8], ["71853", S(14) + 0.05, 0.7, 0.9], ["squeak", F(18, 40), 0.6]]
elif scene == "s3_floor":
    sfx += [fx("thud", F(1, 16), -2), fx("ding", F(1, 24), -8), fx("ding", F(1, 40), -8), fx("ding", F(1, 56), -8), fx("ding", F(1, 74), -6), fx("pop", F(2, 8), -6), fx("pop", F(3, 10), -6), fx("ding", F(3, 22), -8)]
    sfx += [fx("pop", F(4, 8), -4), fx("thud", F(6, 11), -2), fx("pop", F(7, 18), -4), fx("thud", F(7, 56), 0), fx("pop", F(8, 22), -4), fx("thud", F(8, 60), 2), fx("tick", S(9) + 0.3, -8), fx("tick", S(9) + 1.6, -8)]
    sfx += [fx("click", F(10, 34), -2), fx("pop", F(10, 34) + 0.03, -12)] + [fx("tick", F(11, 6 + i * 1.7), -14) for i in range(0, 46, 2)] + [fx("thud", F(12, 34), -2), fx("thud", F(12, 52), -2)] + ticks(0, TOT)
    music += [["happy", 0, S(4) + 0.2, -19, None], ["happy", S(6), TOT, -21, None]]
    ex += [["403002", F(5, 0), 0.5, 1.4], ["438912", F(8, 62), 0.7], ["581334", F(12, 36), 0.35, 0.8]]
elif scene == "s4_walls":
    sfx += [fx("click", S(2) + 0.05, -6), fx("click", F(3, 12), -4), fx("pop", F(5, 6), -4), fx("pop", F(6, 4), -4), fx("pop", F(7, 4), -4), fx("pop", F(7, 30), -4), fx("pop", F(8, 4), -4), fx("bell", F(8, 10), -6)]
    sfx += [fx("boing", F(9, 20), -4), fx("pop", F(9, 50), -6), fx("click", S(10) + 0.05, -2)] + [fx("pop", S(11) + 0.6 + i * 0.95, -4) for i in range(4)] + [fx("bell", F(12, 66), -4), fx("bell", F(12, 76), -4)]
    ws = [at(w, 0, S(13) + 0.6 + i) for i, w in enumerate(["did", "somebody", "sit", "on", "the", "frames"])]
    sfx += [fx("tick", t, -2) for t in ws] + [fx("tick", F(14, i * 30), -2) for i in range(3)] + [fx("crash", F(14, 90), 0), fx("stamp", F(14, 92), 0)]
    sfx += [fx("click", F(15, 30), -2), fx("pop", F(15, 30) + 0.03, -12)] + [fx("tick", F(16, 6 + i * 1.7), -14) for i in range(0, 46, 2)] + [fx("click", F(17, 14), -4), fx("pop", F(17, 40), -6), fx("pop", F(17, 70), -6)]
    sfx += ticks(0, S(13)) + ticks(S(15), TOT)
    music += [["tense", 0, S(10), -22, None], ["happy", S(10) + 0.1, S(13), -17, 132]]
    ex += [["dino_burp_monster", F(12, 50), 0.8], ["164572", F(14, 60), 0.6], ["362206", F(17, 40), 0.55, 1.4]]
elif scene == "s5_girls":
    sfx += [fx("pop", F(1, 20), -4), fx("ding", F(1, 26), -6), fx("click", S(2) + 0.3, -8)]
    sfx += [fx("tick", S(4) + i * 0.32, -10) for i in range(int((E(4) - S(4)) / 0.32))] + [fx("ding", S(4) + (E(4) - S(4)) * q, -4) for q in (0.2, 0.55, 0.86)]
    sfx += [fx("magic", S(5) + 0.1, -4), fx("ding", F(6, 40), -8), fx("ding", F(6, 44), -8), fx("boing", F(8, 30), 0), fx("ding", S(9) + 0.05, -6), fx("tick", F(10, 8), -4), fx("tick", F(10, 16), -4), fx("pop", F(10, 50), -2)]
    sfx += ticks(0, TOT)
    music += [["happy", 0, TOT, -19, None]]
    ex += [["pixi_laugh_soft", F(6, 70), 0.0], ["581334", F(5, 50), 0.35, 0.7], ["403002", F(10, 50), 0.5, 1.5]]
elif scene == "s6_under":
    sfx += [fx("thud", F(1, 30), 2)] + [fx("tick", S(2) + i * 0.55, -10) for i in range(int((S(3) - S(2)) / 0.55))] + [fx("ding", S(n) + 0.15, -6) for n in range(3, 8)]
    sfx += [fx("tick", S(9) + i * 0.6, -12) for i in range(int((E(9) - S(9)) / 0.6))] + [fx("ding", S(11) + 0.15, -4), fx("ding", S(12) + 0.15, -4), fx("ding", S(13) + 0.15, -4)]
    tl = [0, 45, 60, 73, 84, 94, 103, 111]; sfx += [x for q in tl for x in (fx("click", F(14, q), -2), fx("pop", F(14, q) + 0.03, -6))]
    sfx += [fx("boing", F(15, 4), 0)] + [fx("tick", S(16) + i, -6) for i in range(int(E(16) - S(16)))] + [fx("stamp", F(17, 30), 2), fx("crash", F(17, 40), 0), fx("pop", F(18, 16), -2)] + ticks(S(19), TOT)
    ex += [["hum:" + str(round(S(19) - S(2), 2)), S(2), 1.0], ["438912", F(17, 32) + 0.6, 0.5]]
elif scene == "s7_home":
    sfx += [fx("thud", F(1, 14), 0), fx("thud", F(1, 20), -2)] + [fx("tick", t, -12) for t in [x * 1.0 for x in range(int(S(7)))]] + [fx("thud", F(3, 74), -2), fx("click", F(4, 70), -6)]
    sfx += [fx("tick", F(6, q), -2) for q in (50, 80, 105)] + [fx("ding", S(7) + 0.05, 0), fx("click", F(9, 14), -4)]
    sfx += [fx("click", F(8, 40) + 0.004 * i, -6) for i in range(6)] + [fx("impact", F(10, 6), 0), fx("sting", TOT - 0.5, -6)]
    music += [["mischief", S(5) - 0.2, E(5), -22, None]]
    ex += [["512389", F(10, 6), 1.0], ["fu", TOT - 0.95, 1.0, 0.95], ["dino_laugh_squeak", F(3, 30), 0.0], ["squeak", S(3) + 0.6, 0.5]]
json.dump({"voice": "work/voice.wav", "duration": round(TOT + 0.02, 3), "sfx": sfx}, open(f"{D}/sound.json", "w"), indent=0)
json.dump({"end": round(TOT + 0.02, 3), "music": music, "extras": [e for e in ex if e[2] > 0]}, open(f"{D}/work/cues.json", "w"), indent=1)
print(scene, "sfx", len(sfx), "music", len(music), "extras", len(ex))
