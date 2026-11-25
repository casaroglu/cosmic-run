import json
T = json.load(open('work/timeline.json')); SH = T['shots']; S = lambda n: SH[n - 1]['s']; E = lambda n: SH[n - 1]['e']
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
cars = [fx("impact", S(1) + 1.2 + i * 0.9, -14) for i in range(2)] + [fx("impact", S(2) + 0.5 + i * 0.87, -12) for i in range(5)] + [fx("impact", S(5) + 1.0 + i * 1.1, -16) for i in range(2)]
sfx = cars + [fx("thud", S(1) + 0.6, -4), *[fx("pop", S(1) + 0.9 + i * 0.2, -6) for i in range(3)], *[fx("boing", S(3) + 0.4 + i * 0.9, -6) for i in range(3)], *[fx("thud", S(3) + 0.7 + i * 0.9, -6) for i in range(3)],
       fx("impact", S(4) + 0.8, -2), fx("thud", S(6) + 2.0, -2), *[fx("tick", S(7) + 1.6 + i * 0.3, -6) for i in range(4)], fx("ding", S(7) + 2.9, -6), fx("thud", S(8) + 1.2, -4), fx("bell", S(8) + 1.4, -6),
       fx("tick", S(9) + 0.3, -4), fx("stamp", S(9) + 0.35, -6), *[fx("pop", S(10) + 1.2 + i * 0.2, -6 + i) for i in range(4)], fx("tick", S(10) + 2.4, -6), *[fx("thud", S(11) + 0.67 + i * 0.2, -6) for i in range(11)], fx("tick", S(11) + 3.0, -6),
       *[fx("thud", S(12) + i * 0.125, -16) for i in range(20)], fx("sting", S(12) + 0.3, -6), *[fx("click", S(13) + 0.3 + i * 0.5, 0) for i in range(6)], fx("tick", S(13) + 0.5, -6),
       *[fx("click", S(16) + 0.4 + i * 0.6, -4) for i in range(3)], fx("tick", S(17) + 0.2, -8), fx("tick", S(19) + 0.4, -6), fx("ding", S(19) + 0.6, -6), fx("magic", S(23) + 2.0, -4), fx("ding", S(24) + 0.3, -4), fx("click", S(25) + 0.4, 0),
       *[fx("tick", S(27) + 0.3 + i * 0.2, -8) for i in range(6)], *[fx("tick", S(28) + i * 0.4, -8) for i in range(5)], fx("thud", S(28) + 2.2, -4), fx("click", S(30) + 1.0, -4), fx("boing", S(31) + 0.1, 0), fx("pop", S(32) + 1.6, -4),
       fx("footsteps", S(33), -6), fx("click", S(33) + 1.8, -6), fx("tick", S(33) + 3.4, -6), fx("ding", S(34) + 0.7, -6), fx("click", S(35) + 0.5, -2), *[fx("tick", S(36) + i * 0.08, -8) for i in range(8)], fx("pop", S(36) + 1.3, -2), fx("pop", S(36) + 1.5, -2), fx("pop", S(36) + 1.7, -2),
       *[fx("tick", S(37) + 1.2 + i * 0.4, -6) for i in range(4)], fx("ding", S(37) + 2.8, -3)]
json.dump({"voice": "work/voice.wav", "music": {"style": "tense", "bpm": 120, "start": 0, "stop": round(S(26), 2), "level_db": -20}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
ex = [["403002", S(2) + 3.4, 0.8, 1.5], ["438912", S(6) + 2.6, 0.9], ["164572", S(11) + 3.6, 0.9], ["362206", S(17) + 0.2, 0.7, 1.4], ["dino_burp_short", S(10) + 2.1, 0.6], ["249583", S(21) + 1.6, 0.8],
      ["dino_laugh_squeak", S(23) + 0.6, 0.6, 0.4], ["dino_burp_short", S(23) + 1.6, 0.7], ["71853", S(26) + 0.05, 0.9], ["581334", S(31) + 0.4, 0.5, 1.0], ["497093", S(32) + 1.6, 0.7], ["pixi_laugh_soft", S(32) + 2.6, 0.7, 0.5], ["506582", S(36) + 2.0, 0.9]]
json.dump({"end": T['total'] + 0.05, "mute": [[S(4), S(5)], [S(26), T['total'] + 1]], "extras": ex}, open('work/cues.json', 'w'), indent=1); print("cues ok")
