import json
T = json.load(open('work/timeline.json')); SH = T['shots']; S = lambda n: SH[n - 1]['s']
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
sfx = [fx("tick", S(2) + 2.0, -6), fx("tick", S(2) + 4.0, -6), *[fx("ding", S(3) + 1.0 + i * 0.4, -10 + i) for i in range(5)], fx("sting", S(5), -8)]
json.dump({"voice": "work/voice.wav", "music": {"style": "mischief", "bpm": 100, "start": 0, "stop": round(S(4), 2), "level_db": -18}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
json.dump({"end": T['total'] + 0.05, "mute": [[S(4), T['total'] + 1]], "extras": [["isthat", S(5) + 0.15, 1.0, 0.55]]}, open('work/cues.json', 'w'), indent=1); print("cues ok")
