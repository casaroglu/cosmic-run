import json
T = json.load(open('work/timeline.json'))['shots']; FPS = 30
S = lambda n: round(T[n - 1]['s'] * FPS); Eo = lambda n: round(T[n - 1]['e'] * FPS)
fx = lambda kind, f, db=0: {"t": round(f / FPS, 3), "kind": kind, "gain_db": db}
W = json.load(open('work/words.json')); SG = json.load(open('work/segments.json'))
def wf(i, word):
    a, b = SG[i]['s'] - 0.05, SG[i]['e']
    for w in W:
        if a <= w['s'] <= b and w['w'].lower().strip('!.?,').startswith(word): return round(w['s'] * FPS)
    return round(SG[i]['s'] * FPS)
K4, K5, K6, GONE, IMP = S(4) + 8, S(5) + 30, S(6) + 30, S(12) + 8, S(9) + 50
sfx = [fx("sting", 2, -2), fx("ding", S(2) + 4, -6), fx("pop", wf(2, "six"), -2), fx("pop", wf(2, "seven"), -2),
       fx("pop", K4, -1), fx("tick", K4, -4), fx("pop", wf(3, "six"), -4),
       *[fx("pop", K5 + i * 4, -3 + i * 0.5) for i in range(5)], fx("tick", K5 + 16, -4),
       fx("pop", wf(5, "six"), -2), fx("boing", wf(5, "six") + 8, -2),
       *[fx("pop", K6 + i * 3, -9 + i * 0.4) for i in range(14)], *[fx("tick", K6 + i * 3, -8) for i in range(14)],
       fx("click", S(7) + 12, -6), fx("boing", S(8) + 6, -1),
       fx("thud", S(9) + 19, -2), fx("thud", S(9) + 34, -2), fx("impact", IMP, 0), fx("crash", IMP, 0), fx("stamp", IMP + 1, 2),
       fx("ding", S(10) + 20, -6), *[fx("thud", S(11) + 18 + k * 24, -1) for k in range(3)],
       *[fx("pop", GONE + i * 3, -4 - i * 0.4) for i in range(15)], fx("tick", GONE + 44, -4),
       fx("pop", wf(11, "six"), -2), fx("impact", S(14), 0)]
json.dump({"voice": "work/voice.wav", "music": {"style": "mischief", "bpm": 120, "start": 0, "stop": round(S(14) / FPS - 0.05, 2), "level_db": -18}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
meme = [["581334", K6 + 2, 0.5], ["704942", wf(6, "twice") + 14, 0.8], ["362206", IMP + 10, 0.7], ["438912", IMP + 1, 0.6],
        ["71853", S(11) + 2, 0.7], ["497093", GONE, 0.6], ["512389", S(14), 1.0], ["fuuu", S(14) + 4, 1.0]]
json.dump({"meme": meme, "end": Eo(14) / FPS}, open('work/cues.json', 'w'), indent=1); print("sound ok", len(sfx))
