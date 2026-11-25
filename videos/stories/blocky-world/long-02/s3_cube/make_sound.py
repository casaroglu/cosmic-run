import json
T = json.load(open('work/timeline.json')); SH = T['shots']; S = lambda n: SH[n - 1]['s']; E = lambda n: SH[n - 1]['e']
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
sfx = [fx("thud", S(1) + 0.6, -4), fx("thud", S(1) + 0.8, -4), fx("thud", S(1) + 0.95, -2), fx("pop", S(1) + 0.4, -6), fx("pop", S(1) + 0.5, -6), fx("pop", S(1) + 0.6, -6),
       fx("footsteps", S(2) + 0.2, -10), fx("thud", S(4) + 0.3, -6), fx("thud", S(4) + 0.6, -6), fx("thud", S(5) + 0.75, -2), fx("ding", S(6) + 0.2, -8),
       *[fx("thud", S(7) + 0.3 + i * 0.47, -3) for i in range(3)], fx("pop", S(7) + 2.0, -4), fx("tick", S(7) + 2.2, -6),
       fx("thud", S(10) + 0.6, -3), fx("pop", S(10) + 0.7, -4), fx("thud", S(10) + 1.6, -3), fx("pop", S(10) + 1.7, -4),
       *[fx("tick", S(11) + 0.5 + i * 0.27, -6) for i in range(3)], fx("ding", S(11) + 1.7, -6), fx("pop", S(11) + 2.3, -4),
       *[fx("tick", S(13) + 0.2 + i * 0.12, -6) for i in range(6)], fx("thud", S(13) + 1.4, -2), fx("pop", S(13) + 1.8, -4),
       fx("footsteps", S(16), -6), fx("tick", S(18) + 0.4, -4), fx("tick", S(18) + 1.67, -4), fx("tick", S(19) + 0.33, -4), fx("pop", S(20) + 0.5, 0),
       fx("tick", S(21) + 0.4, -10), fx("tick", S(21) + 1.4, -10), fx("boing", S(22) + 0.4, -2), fx("tick", S(23) + 0.3, -6), fx("ding", S(23) + 0.6, -6), fx("ding", S(26) + 1.0, -6),
       *[fx("tick", S(28) + i * 0.53, -6) for i in range(5)], fx("footsteps", S(30) + 1.3, -10), fx("thud", S(31) + 0.35, -4), fx("pop", S(31) + 0.6, -4),
       fx("thud", S(32) + 0.6, -6), fx("pop", S(32) + 0.7, -6), fx("tick", S(33) + 0.2, -6), fx("crash", S(35), 0), fx("stamp", S(35) + 0.05, 2), *[fx("pop", S(35) + 0.1 + i * 0.13, -10) for i in range(10)],
       fx("thud", S(36) + 0.5, -4), fx("click", S(38) + 0.3, 0), fx("tick", S(38) + 0.6, -8), fx("tick", S(38) + 0.9, -8), *[fx("tick", S(39) + i * 0.07, -8) for i in range(10)], fx("pop", S(39) + 0.8, -2), fx("pop", S(39) + 1.0, -2), fx("pop", S(39) + 1.2, -2),
       *[fx("tick", S(40) + 1.2 + i * 0.4, -6) for i in range(4)], fx("ding", S(40) + 3.4, -3)]
json.dump({"voice": "work/voice.wav", "music": {"style": "happy", "bpm": 112, "start": 0, "stop": round(S(13) + 1.2, 2), "level_db": -21}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
ex = [["438912", S(5) + 0.9, 0.9], ["403002", S(9) + 0.3, 0.8, 1.5], ["362206", S(12) + 1.6, 0.7, 1.2], ["dino_laugh_squeak", S(16), 0.0, 0.1],
      ["512389", S(22) + 0.2, 0.9], ["dino_burp_short", S(24) + 0.8, 0.35, 0.5], ["dino_burp_monster", S(25) + 0.3, 1.0], ["dino_laugh_oldman", S(27) + 0.3, 0.8, 1.6],
      ["fu", S(34) + 0.1, 1.0, 1.0], ["704942", S(36) + 1.4, 0.9]]
# Fuse Box hiss: steady noise beds (render as many tiny 'hiss' extras is not possible -> use squeak? no: synth in mixer as 'hiss')
ex += [["hiss", S(15), 0.25, E(20) - S(15)], ["hiss_muffled", S(20) + 0.4, 0.25, S(22) + 0.2 - S(20) - 0.4], ["hiss", S(28), 0.3, E(29) - S(28)]]
json.dump({"end": T['total'] + 0.05, "mute": [[S(13) + 1.2, T['total'] + 1]], "extras": ex}, open('work/cues.json', 'w'), indent=1); print("cues ok")
