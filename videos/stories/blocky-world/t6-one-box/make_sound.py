import json
T = json.load(open('work/timeline.json'))['shots']; FPS = 30
S = lambda n: round(T[n - 1]['s'] * FPS); Eo = lambda n: round(T[n - 1]['e'] * FPS)
fx = lambda kind, f, db=0: {"t": round(f / FPS, 3), "kind": kind, "gain_db": db}
SG = json.load(open('work/segments.json'))
B1, B2, B3, B5a, B5b, B6a, IMP = S(2) + 18, S(4) + 14, S(4) + 44, S(5) + 6, Eo(5) - 4, S(6) + 12, S(9) + 44
n5 = (B5b - B5a) // 3
sfx = [fx("sting", 2, -2), fx("ding", S(2) + 4, -6), fx("pop", B1, -1), fx("pop", S(3) + 12, -4), fx("pop", B2, -1), fx("click", S(4) + 30, -6), fx("pop", B3, -1),
       *[fx("tick", B5a + i * 3, -9) for i in range(n5)], *[fx("pop", S(5) + i * 8 + 12, -6 + i * 0.3) for i in range(10)],
       *[fx("thud", S(6) + 10 + i * 9, -4) for i in range(6)], *[fx("pop", B6a + i * 3, -8 + i * 0.3) for i in range(16)], fx("boing", S(6) + 62, -2),
       fx("boing", S(8) + 4, -1), fx("boing", S(9) + 6, -2), fx("impact", IMP, 0), fx("crash", IMP, 0), fx("stamp", IMP + 1, 2),
       fx("ding", S(10) + 16, -6), fx("magic", S(11) + 26, -2), fx("pop", S(12) + 40, -1), fx("impact", S(14) + 8, 0), fx("tick", S(15) + 4, -3)]
json.dump({"voice": "work/voice.wav", "music": {"style": "mischief", "bpm": 120, "start": 0, "stop": round(S(14) / FPS), "level_db": -18}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
meme = [["497092", S(6) + 36, 0.7], ["704942", round(SG[5]['e'] * FPS) + 4, 0.8], ["164572", IMP, 0.7], ["362206", IMP + 12, 0.7],
        ["581334", S(11) + 28, 0.45], ["lib:dino_laugh_squeak", S(11) + 40, 0.7], ["lib:dino_burp_short", S(12) + 46, 0.8],
        ["512389", S(14) + 8, 1.0], ["fuuu", S(15) + 3, 1.0]]
json.dump({"meme": meme, "end": Eo(15) / FPS}, open('work/cues.json', 'w'), indent=1); print("sound ok", len(sfx))
