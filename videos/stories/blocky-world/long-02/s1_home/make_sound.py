import json
T = json.load(open('work/timeline.json')); SH = T['shots']; S = lambda n: SH[n - 1]['s']; E = lambda n: SH[n - 1]['e']; W = json.load(open('work/words.json'))
at = lambda w, k=0: [x for x in W if x['w'].lower().strip('.,!?').startswith(w)][k]['s']
fx = lambda kind, t, db=0: {"t": round(t, 3), "kind": kind, "gain_db": db}
sfx = [fx("thud", at("admin", 1), -6), fx("thud", S(6) + 0.33, -8), fx("tick", S(6) + 1.0, -6), fx("tick", S(6) + 1.3, -8), fx("ding", S(6) + 2.6, -6), fx("ding", S(7) + 0.1, -6), fx("magic", S(9) + 0.1, -8),
       fx("click", S(11) + 0.3, -4), fx("click", S(11) + 1.3, -4), *[fx("click", S(12) + 0.1 + i * 0.18, -8) for i in range(8)], fx("click", S(13) + 0.2, 0),
       *[fx("tick", S(14) + i * (5 - i * 0.25) / 30 + 0.1, -6) for i in range(12)], *[fx("tick", S(15) + i * 0.35, -9) for i in range(9)],
       fx("pop", S(16) + 1.0, -2), fx("pop", S(17) + 0.9, -2), fx("pop", S(17) + 1.1, -2), fx("pop", S(17) + 1.3, -2), fx("magic", S(17) + 0.3, -6), fx("tick", S(18) + 0.35, -4),
       *[fx("tick", S(19) + 1.2 + i * 0.4, -6) for i in range(4)], fx("ding", S(19) + 2.8, -3)]
json.dump({"voice": "work/voice.wav", "music": {"style": "mischief", "bpm": 100, "start": 0, "stop": round(S(13) + 0.25, 2), "level_db": -20}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
ex = [["squeak", S(1) + 0.4, 0.6], ["squeak", S(1) + 1.4, 0.6], ["squeak", S(1) + 2.4, 0.6], ["dino_laugh_squeak", S(6) + 1.75, 0.7, 0.2],
      ["362206", S(11) + 1.2, 0.7, 1.2], ["497092", S(16) + 0.2, 0.7], ["704942", S(18) + 1.2, 0.9]]
json.dump({"end": T['total'] + 0.05, "mute": [[S(13) + 0.25, T['total'] + 1]], "extras": ex}, open('work/cues.json', 'w'), indent=1); print("cues ok")
