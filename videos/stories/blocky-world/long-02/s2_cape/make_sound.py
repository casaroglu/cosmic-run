import json
T = json.load(open('work/timeline.json')); SH = T['shots']; S = lambda n: SH[n - 1]['s']; E = lambda n: SH[n - 1]['e']; W = json.load(open('work/words.json'))
at = lambda w, k=0: [x for x in W if x['w'].lower().strip('.,!?—').startswith(w)][k]['s']
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
sfx = [fx("thud", S(2) + 0.6, -2), fx("thud", S(2) + 0.75, -2), fx("tick", S(3) + 0.3, -8), fx("tick", S(4) + 0.3, -8), *[fx("pop", S(5) + 0.4 + i * 0.25, -6) for i in range(3)],
       *[fx("thud", S(7) + 0.6 + i * 0.73, -4) for i in range(3)], fx("impact", S(9), -4), fx("impact", S(10), -4), *[fx("tick", S(10) + 0.3 + i * 0.06, -8) for i in range(4)], fx("pop", S(11) + 0.2, -6), fx("pop", S(11) + 0.9, -6), fx("thud", S(12) + 0.3, -8),
       *[fx("tick", S(14) + i * 0.9, -6) for i in range(3)], fx("ding", S(14) + 2.7, -6), fx("tick", S(15) + 1.6, -6), fx("stamp", S(15) + 1.7, -8),
       *[fx("ding", S(16) + 0.6 + i * 0.8, -10 + i) for i in range(5)], fx("impact", S(18) + 1.0, -6), fx("magic", S(19) + 0.2, -6), fx("boing", S(20) + 0.05, -2),
       fx("pop", S(22) + 0.4, -2), fx("tick", S(22) + 0.7, -6), *[fx("tick", S(23) + i * 1.2, -8) for i in range(3)], fx("footsteps", S(25), -6), fx("thud", S(26) + 0.3, -4), fx("thud", S(26) + 0.7, -4),
       fx("footsteps", S(29), -2), fx("sting", S(30), -8), fx("click", S(31) + 0.33, 2), *[fx("pop", S(n) + 0.33, -2) for n in (33, 34, 35)], fx("thud", S(35) + 0.4, -6),
       fx("pop", at("here", 0), -2), fx("ding", at("here", 0) + 0.2, -10), fx("pop", S(37) + 1.0, 0), *[fx("tick", S(37) + 1.3 + i * 0.12, -8) for i in range(5)], fx("tick", S(38) + 1.4, -6),
       fx("pop", S(42) + 1.8, -10), fx("click", S(44) + 0.3, 0), fx("tick", S(44) + 0.4, -6), *[fx("tick", S(45) + i * 0.08, -8) for i in range(8)], fx("pop", S(45) + 0.7, -2), fx("pop", S(45) + 0.9, -2), fx("pop", S(45) + 1.1, -2),
       *[fx("tick", S(46) + 1.2 + i * 0.4, -6) for i in range(4)], fx("ding", S(46) + 2.8, -3)]
json.dump({"voice": "work/voice.wav", "music": {"style": "epic", "bpm": 92, "start": 0, "stop": round(S(30), 2), "level_db": -19}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
ex = [["71853", S(2) + 0.1, 0.9], ["697900", at("costume", 0) - 0.6, 0.6, 0.5], ["497093", S(8) + 3.6, 0.7], ["362206", S(14) + 0.9, 0.7, 1.2], ["438912", S(18) + 1.8, 0.9],
      *[["dino_laugh_squeak", S(21) + 0.6 + i * 0.6, 0.4, 0.12] for i in range(6)], ["506582", S(23) + 2.6, 0.9], ["362206", S(26) + 1.6, 0.7, 1.0], ["dino_burp_short", at("probably", 0) + 0.7, 0.6],
      ["512389", S(32) + 0.05, 1.0], ["dino_laugh_honk", S(33) + 0.4, 0.6, 0.3], ["164572", S(34) + 1.0, 0.9], ["362206", S(37) + 2.0, 0.7, 1.2], ["581334", S(41) + 0.1, 0.5, 1.0]]
mute = [[S(2) + 0.1, S(7)], [S(21), S(28)], [S(30), T['total'] + 1]]
json.dump({"end": T['total'] + 0.05, "mute": mute, "extras": ex}, open('work/cues.json', 'w'), indent=1); print("cues ok")
