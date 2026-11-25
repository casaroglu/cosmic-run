import json
T = json.load(open('work/timeline.json')); SH = T['shots']; S = lambda n: SH[n - 1]['s']; E = lambda n: SH[n - 1]['e']
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
sfx = [fx("thud", S(1) + 0.6, -2), fx("thud", S(1) + 0.75, -2), fx("thud", S(1) + 0.9, -2), fx("pop", S(2) + 0.3, -4), fx("tick", S(3) + 0.66, -4),
       *[fx("thud", S(4) + 0.3 + i * 1.0, -6) for i in range(3)], fx("pop", S(5) + 1.8, -8), fx("pop", S(5) + 2.2, -8), fx("pop", S(6) + 1.0, -6), fx("thud", S(6) + 1.8, -6),
       *[fx("tick", S(7) + i * 1.0, -6) for i in range(4)], fx("tick", S(8) + 0.7, -6), fx("tick", S(8) + 2.4, -6), fx("tick", S(10) + 0.7, -8), fx("tick", S(10) + 1.7, -8),
       *[fx("tick", S(11) + 0.3 + i * 0.12, -10) for i in range(14)], fx("pop", S(12) + 0.2, -6), fx("pop", S(12) + 0.8, -6), fx("pop", S(12) + 1.3, -2), *[fx("tick", S(12) + 1.5 + i * 0.3, -8) for i in range(3)], fx("magic", S(12) + 2.4, -6),
       *[fx("pop", S(13) + 0.4 + i * 0.73, -6 + i) for i in range(4)], fx("thud", S(13) + 3.9, -2), *[fx("pop", S(15) + i * 0.13, -6) for i in range(5)], fx("door", S(16) + 0.3, -10), fx("ding", S(17) + 0.4, -6), fx("boing", S(18), -2),
       fx("pop", S(20) + 0.7, -2), *[fx("tick", S(21) + 0.4 + i * 0.35, -8) for i in range(6)], fx("ding", S(21) + 2.6, -6), fx("stamp", S(22) + 0.67, 2), fx("crash", S(23) + 0.5, 0), fx("stamp", S(23) + 0.55, 2),
       fx("bell", S(24) + 0.2, -4), *[fx("pop", S(26) + 0.4 + i * 0.03, -4) for i in range(6)], *[fx("tick", S(26) + 1.0 + i * 0.1, -8) for i in range(7)], fx("bell", S(27) + 1.6, -6)]
json.dump({"voice": "work/voice.wav", "music": {"style": "mischief", "bpm": 96, "start": 0, "stop": round(T['total'], 2), "level_db": -20}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
ex = [["704942", S(9) + 3.8, 0.9], ["512389", S(13) + 3.8, 0.9], ["497093", S(14) + 2.4, 0.7], ["362206", S(20) + 0.8, 0.7, 1.2], ["fu", S(23) + 0.1, 1.0, 0.45]]
json.dump({"end": T['total'] + 0.05, "mute": [[S(3) + 0.6, S(24)]], "extras": ex}, open('work/cues.json', 'w'), indent=1); print("cues ok")
