import json
T = json.load(open('work/timeline.json'))['shots']; FPS = 30
S = lambda n: round(T[n - 1]['s'] * FPS); Eo = lambda n: round(T[n - 1]['e'] * FPS)
fx = lambda kind, f, db=0: {"t": round(f / FPS, 3), "kind": kind, "gain_db": db}
IMP = S(9) + 40
W = json.load(open('work/words.json')); END = round(W[-1]['e'] * FPS)
sfx = [fx("sting", 2, -2), fx("ding", S(2) + 4, -6),
       fx("boing", S(4) + 10, -1), fx("tick", S(4) + 10, -4),
       fx("boing", S(6) + 8, -1), fx("tick", S(6) + 8, -4),
       fx("door", S(8), -2), fx("boing", S(8) + 6, -1), fx("tick", S(8) + 8, -4),
       fx("boing", S(9) + 4, -2), fx("impact", IMP, 0), fx("crash", IMP, 0), fx("stamp", IMP + 1, 2),
       fx("ding", S(10) + 22, -6),
       *[fx("pop", S(11) + a, -3 - i) for i, a in enumerate([10, 24, 38])], fx("ding", S(11) + 72, -6),
       fx("click", S(12) + 22, -6), fx("impact", S(13), 0)]
json.dump({"voice": "work/voice.wav", "music": {"style": "mischief", "bpm": 118, "start": 0, "stop": round(S(13) / FPS - 0.05, 2), "level_db": -18}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
meme = [["497092", S(4) + 10, 0.7], ["704942", round(T[4]['e'] * FPS) - 14, 0.8], ["497092", S(6) + 8, 0.7],
        ["362206", IMP + 10, 0.7], ["497093", S(11) + 10, 0.6], ["438912", S(11) + 2, 0.6],
        ["512389", S(13), 1.0], ["fuuu", S(13) + 4, 1.0]]
json.dump({"meme": meme, "end": Eo(13) / FPS}, open('work/cues.json', 'w'), indent=1); print("sound ok", len(sfx))
