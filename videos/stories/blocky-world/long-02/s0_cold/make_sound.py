import json
T = json.load(open('work/timeline.json')); SH = T['shots']; S = lambda n: SH[n - 1]['s']
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
sfx = [fx("sting", 0.0, -8), fx("click", S(2) + 0.33, 2), *[fx("tick", S(4) + 0.33 + i * 0.4, -6) for i in range(3)], fx("tick", S(5), -4), fx("tick", S(6), -4), fx("click", S(6) + 0.3, -6), fx("tick", S(7), -4),
       fx("pop", S(8) + 2.4, -4), *[fx("tick", S(9) + i * 0.2, -4) for i in range(3)]]
json.dump({"voice": "work/voice.wav", "music": {"style": "mischief", "bpm": 110, "start": round(S(8), 2), "stop": round(S(9), 2), "level_db": -16}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
json.dump({"end": T['total'] + 0.05, "mute": [], "extras": [["512389", S(3), 1.0], ["581334", S(8) + 0.1, 0.6, 1.0]]}, open('work/cues.json', 'w'), indent=1); print("cues ok")
