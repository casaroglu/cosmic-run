import json, wave, numpy as np, sys, os
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
T = json.load(open('work/timeline.json'))['shots']; FPS = 30
S = lambda n: round(T[n - 1]['s'] * FPS); Eo = lambda n: round(T[n - 1]['e'] * FPS)
SN = [[S(2) + 20, 70], [S(3) + 2, 64], [S(5) + 14, 30], [S(7) + 4, 26], [S(7) + 36, 18], [S(7) + 60, 10], [S(13), 22]]
fx = lambda kind, f, db=0: {"t": round(f / FPS, 3), "kind": kind, "gain_db": db}
sfx = [fx("sting", 2, -2), fx("ding", S(2) + 8, -6)]
for a, d in SN: sfx += [fx("pop", a + d, -3)]
sfx += [fx("footsteps", S(3) + 4, -10), fx("footsteps", S(5) + 16, -12), fx("thud", S(5) + 46, -8),
        fx("impact", S(6) + 12, -2), *[fx("pop", S(6) + 22 + i * 3, -6 + i) for i in range(5)],
        fx("click", S(8) + 40, -6), fx("sting", S(11) + 4, -6), fx("thud", S(11) + 6, -4), fx("thud", S(13) + 20, -8),
        fx("boing", S(14), -1), fx("ding", S(15) + 30, -6), *[fx("thud", S(16) + 10 + i * 13, -2) for i in range(4)], *[fx("pop", S(16) + 20 + i * 4, -8) for i in range(8)],
        fx("impact", S(17) + 20, 0), fx("crash", S(17) + 20, 0), fx("stamp", S(17) + 21, 2), *[fx("pop", S(18) + 30 + i * 3, -6) for i in range(6)], fx("sting", Eo(19) - 8, -3)]
end = json.load(open('work/words.json'))[-1]['e']
json.dump({"voice": "work/voice.wav", "music": {"style": "mystery", "bpm": 90, "start": 0, "stop": round(end, 2), "level_db": -17}, "sfx": sfx}, open('sound.json', 'w'), indent=1)
# extra cues: snores, squeaks, laugh, yawn (rendered by mix_itw.py)
ex = {"snore": [[a / FPS, d / FPS] for a, d in SN], "squeak": [S(10) + 6, S(12) + 30, round(json.load(open("work/words.json"))[-1]["e"] * FPS) - 10], "laugh": S(16) + 14, "yawn": S(18) + 2,
      "silence": [[a + d, b] for (a, d), (b, _) in zip(SN, SN[1:] + [[S(16), 0]])], "end": end}
json.dump(ex, open('work/cues.json', 'w'), indent=1); print("sound ok", len(sfx))
