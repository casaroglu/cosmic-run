"""Long 3 sound: per scene sound.json (music + sfx from the script's Sound column) + work/cues.json (music mutes, meme cues, laughs/burps).
usage: make_sound.py <scene>   (then tools/audio.py . and common/mix_scene.py .)  No whoosh / swish / zip / riser anywhere."""
import json, os, sys
s = sys.argv[1]; P = os.path.expanduser(f"~/cizgi/toast-long3/scenes/{s}"); os.chdir(P)
T = json.load(open("work/timeline.json")); SH = T["shots"]; G = json.load(open("work/segments.json")); TOT = T["total"]
S = lambda n: SH[n - 1]["s"]; E = lambda n: SH[n - 1]["e"]; F = lambda n, fr: S(n) + fr / 30
seg = lambda sp, k=0: [x for x in G if x["sp"] == sp][k]
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
sfx, ex, mute, mus = [], [], [], None
def X(name, t, g=0.7, md=None): ex.append([name, round(t, 3), g] + ([md] if md else []))
if s == "s0_cold":
    sfx += [fx("tick", F(1, 15 + i * 20), -2) for i in range(3)]
    sfx += [fx("impact", F(2, 8), 0)]; X("512389", F(2, 8), 1.0)
    sfx += [fx("tick", S(3) + 0.1, -4)] + [fx("tick", F(4, i * 27 + 2), -2) for i in range(3)] + [fx("stamp", F(4, i * 27 + 3), -8) for i in range(3)]
    sfx += [fx("pop", F(5, 0), -4), fx("pop", F(5, 9), -4), fx("pop", F(5, 30), -6), fx("pop", F(5, 60), 0)]
    mus = {"style": "mischief", "start": round(S(5), 2), "stop": TOT, "level_db": -16, "sting": False}
    X("toast_laugh_cute", F(5, 70), 0.0)  # placeholder, gain 0 (keeps the list shape)
elif s == "s1_shop":
    for n in (1, 2): sfx += [fx("ding", S(n) + 0.73 * k + 0.7, -12) for k in range(int((E(n) - S(n)) / 0.73))]
    sfx += [fx("footsteps", S(3) + 0.2, -10)] + [fx("tick", F(3, 6 + i * 16 + 35), -5) for i in range(9)] + [fx("tick", F(3, 6 + 9 * 16 + 4 + 25), -3)]
    sfx += [fx("tick", F(4, 8), -3), fx("thud", F(4, 20), -4)]
    sfx += [fx("pop", F(5, 6), -3), fx("thud", F(5, 20), -6), fx("thud", F(5, 34), -6), fx("thud", F(5, 48), -6)]
    sfx += [fx("thud", F(6, 40), 0), fx("ding", F(6, 96), -4), fx("ding", S(7) + 0.2, -6), fx("ding", S(8) + 0.2, -6)]
    sfx += [fx("click", F(9, 30), -4), fx("click", F(9, 60), -4), fx("ding", S(10) + 0.2, -8), fx("ding", S(11) + 0.2, -8)]
    sfx += [fx("boing", F(12, 18), 0), fx("ding", F(12, 22), -4)]
    sfx += [fx("click", F(13, 40), -3), fx("thud", F(13, 54), -6), fx("pop", F(14, 26), -2)]
    sfx += [fx("pop", F(15, 66), -3), fx("click", F(15, 64), -4), fx("pop", F(16, 10), -6), fx("click", F(16, 20), -8)]
    X("dino_laugh_squeak", F(5, 10), 0.6, 0.6); X("497093", seg("toast", 2)["e"] + 0.2, 0.5)  # tail stops: swanee down
    X("438912", F(4, 20), 0.7); X("71853", F(15, 66), 0.6)
    mus = {"style": "mischief", "start": 0, "stop": TOT, "level_db": -21}
    mute += [[S(12) - 0.1, S(12) + 1.2]]
elif s == "s2_line":
    sfx += [fx("footsteps", S(2) + 0.1, -8), fx("click", seg("gran")["s"], -4)]
    sfx += [fx("footsteps", F(3, 6), -6), fx("footsteps", F(3, 50), -6), fx("footsteps", F(3, 90), -6), fx("ding", F(3, 126), -2)]
    sfx += [fx("pop", F(4, 26), -2), fx("pop", S(5) + 0.1, -4)] + [fx("tick", S(7) + 0.1 + i * (E(7) - S(7) - 0.4) / 14, -10) for i in range(14)]
    n9 = 6; sfx += [fx("pop", S(9) + (i + 0.85) * (E(9) - S(9)) / n9, -6) for i in range(n9)] + [fx("pop", F(10, 60), -2)]
    sfx += [fx("click", F(14, 22), -2), fx("thud", F(14, 90), 0), fx("click", F(15, 10), -8)]
    X("dino_burp_short", F(10, 76), 0.8); X("249583", F(14, 95), 0.0)
    X("pixi_laugh_soft", 0, 0.0)
    mus = {"style": "happy", "start": 0, "stop": TOT, "level_db": -24}
    mute += [[S(12) + 0.2, E(13)]]
    X("164572", F(14, 34), 0.5)  # metal pipe: the chain hits the pavement
elif s == "s2b_drop":
    sfx += [fx("bell", S(1) + 0.2, -2), fx("pop", F(2, 60), -2)]
    sfx += [fx("tick", F(3, i * 26), -4) for i in range(8)] + [fx("pop", F(3, i * 26 + 12), -4) for i in range(8)]
    sfx += [fx("tick", F(4, 30), -3), fx("tick", F(4, 60), -3), fx("tick", F(4, 90), -3), fx("click", S(5) + 0.2, -4)]
    sfx += [fx("tick", F(6, 25), 0), fx("tick", F(6, 55), 0), fx("click", F(7, 20), -4), fx("thud", F(7, 34), -4), fx("thud", F(7, 90), -6), fx("thud", F(7, 100), -6)]
    sfx += [fx("tick", S(8) + 0.1, -2), fx("footsteps", S(9) + 0.1, 0), fx("footsteps", S(9) + 0.5, 0), fx("impact", F(9, 34), 0), fx("crash", F(9, 34), -2), fx("stamp", F(9, 36), 0), fx("pop", F(10, 6), -2)]
    X("704942", E(5) - 0.6, 0.8); X("438912", F(9, 34), 0.0)
    mus = {"style": "march", "start": 0, "stop": round(S(9) + 34 / 30, 2), "level_db": -22}
elif s == "s3_alley":
    sfx += [fx("door", F(2, 6), -6), fx("magic", F(2, 18), -6), fx("boing", S(3) + 0.05, 0)]
    sfx += [fx("ding", F(4, 6 + i * 6), -8) for i in range(7)] + [fx("ding", F(5, 25), -4)]
    sfx += [fx("click", F(8, 26), -4), fx("pop", F(8, 70), -4), fx("door", seg("toast", 2)["e"] + 0.2, -6)]
    sfx += [fx("pop", F(10, 62), -2), fx("tick", F(10, 80), -4), fx("pop", seg("toast", 3)["e"] + 0.4, -2)]
    X("362206", F(10, 22), 0.9, 1.4)
    mus = {"style": "tense", "start": 0, "stop": TOT, "level_db": -22}
elif s == "s4_jumbo":
    sfx += [fx("thud", F(2, 24), -8), fx("click", F(3, 30), -2)] + [fx("thud", F(3, 40 + i * 12), -10) for i in range(int((E(3) - S(3) - 1.4) / 0.4))]
    sfx += [fx("boing", F(4, 54), 0), fx("impact", F(5, 46), 0), fx("crash", F(5, 46), -2), fx("stamp", F(5, 48), 0)]
    sfx += [fx("click", F(6, 80), -2), fx("magic", F(8, 14), -4), fx("ding", F(9, 30), -4), fx("ding", F(11, 45), -2)]
    X("403002", F(4, 54), 0.7); X("dino_laugh_squeak", F(10, 150), 0.8)
    mus = {"style": "mischief", "start": 0, "stop": round(S(11), 2), "level_db": -21}
    mute += [[S(5) + 46 / 30, E(5)]]
elif s == "s5_crash":
    sfx += [fx("ding", F(1, 40 + i * 4), -10 - (i % 3)) for i in range(14)] + [fx("ding", seg("pixi")["s"] - 0.4, -2)]
    sfx += [fx("tick", S(3) + 0.3, -4), fx("tick", S(3) + 1.3, -4), fx("click", F(4, 50), -4)]
    sfx += [fx("click", F(6, 36), -2)] + [fx("thud", F(7, 40 + i * 8), -6) for i in range(3)] + [fx("ding", F(7, 52 + i * 3), -10) for i in range(6)]
    sfx += [fx("bell", S(8) + 0.2, 0), fx("ding", F(9, 6), -4), fx("stamp", seg("admin")["e"], 0)]
    sfx += [fx("tick", S(10) + 0.2, -6)] + [fx("tick", F(11, k), -2) for k in (2, 22, 44, 66)] + [fx("pop", F(12, 10 + i * 8), -8) for i in range(int((E(12) - S(12)) * 30 / 8) - 2)]
    sfx += [fx("door", F(13, 90), -6), fx("ding", F(17, 18), -2), fx("ding", F(17, 22), -2), fx("stamp", F(17, 100), 0)] + [fx("tick", F(15, 10 + i * 4), -8) for i in range(12)] + [fx("tick", F(17, 70 + i * 3), -10) for i in range(10)]
    X("497093", F(11, 10), 0.6); X("71853", F(16, 10), 0.6)
    mus = {"style": "mystery", "start": 0, "stop": TOT, "level_db": -23}
    mute += [[S(5), E(5)], [S(8), S(9) + 0.5]]
elif s == "sE_end":
    sfx += [fx("tick", F(2, 60), -4), fx("click", F(3, 120), 0), fx("impact", S(5) + 0.0, 0)]
    X("512389", S(5), 1.0); X("fu", S(5) + 0.15, 1.0, 0.4)
    mus = {"style": "mischief", "start": 0, "stop": round(S(4), 2), "level_db": -20}
ex = [e for e in ex if e[2] > 0]
json.dump({"voice": "work/voice.wav", "music": mus, "sfx": sfx}, open("sound.json", "w"), indent=1)
json.dump({"end": TOT, "mute": mute, "extras": ex}, open("work/cues.json", "w"), indent=1); print(s, "sfx", len(sfx), "extras", len(ex), "total", TOT)
