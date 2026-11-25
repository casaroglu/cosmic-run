#!/usr/bin/env python3
"""Chip Wars long-form Part 2 "The Chip War: 5 Moves That Shook the World": 1920x1080, 30 fps, on twos.
ONE continuous map and camera (no cuts, no fades), same engine and rules as long-part1.
Flights are never bare: the dashed route draws under the camera and the MOVE number slaps in while it flies.
usage: ~/cizgi/.venv/bin/python render.py sheet [frames] | frame N | video | chapters"""
import json, os, sys
os.environ['CW_ORIENT'] = 'h'
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, Image, ImageDraw, INK, BEIGE, YEL, PLACES, FPS, font, F_CASLON, f_type
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/long-part2', tail=2.2)
SEG = json.load(open(os.path.join(HERE, 'work', 'segments.json')))
PLACES.update({'dc': (-77.04, 38.90), 'santaclara': (-121.96, 37.37), 'kl': (101.69, 3.14), 'bangkok': (100.50, 13.75),
               'beijing': (116.40, 39.90), 'yunnan': (100.09, 23.88), 'bayanobo': (109.97, 41.80), 'chicago': (-87.56, 41.69),
               'mountainpass': (-115.53, 35.48), 'kuantan': (103.38, 3.97), 'hangzhou': (120.16, 30.27), 'newyork': (-73.99, 40.76),
               'busan': (129.08, 35.18)})
END = G.END

def L(i, d=0): return int(round(SEG[i]['s'] * FPS)) + d
def LE(i, d=0): return int(round(SEG[i]['e'] * FPS)) + d
def cw(i, word, occ=1, d=0):
    n = 0
    for w in G.WORDS:
        if SEG[i]['s'] - 0.02 <= w['s'] <= SEG[i]['e'] + 0.02 and w['w'].lower().strip('.,?!:;') == word.lower():
            n += 1
            if n == occ: return int(round(w['s'] * FPS)) + d
    if os.environ.get("CW_CHECK"): print("MISSING", i, word, occ); return int(round(SEG[i]["s"] * FPS))
    raise KeyError((i, word, occ))

# ------------------------------------------------------------------ camera
WORLD, MIDW = (15.0, 32.0, 10.0), (15.0, 40.0, 9.5)
DCZ, USW, SEA, CN = (-79.0, 38.6, 60), (-98.0, 38.0, 18), (104.0, 13.0, 28), (108.0, 32.0, 24)
BAYAN, CHI, HZ, NY = (110.0, 42.0, 60), (-87.6, 41.7, 60), (120.0, 30.5, 60), (-74.5, 40.8, 60)
FLIGHTS = []                      # (start, [(len, focus)...], from_pin, to_pin)
def fly(f, legs, a=None, b=None):
    FLIGHTS.append((f, legs, a, b)); return f + sum(n for n, _ in legs)
f6 = L(5, -12);  A6 = fly(f6, [(40, DCZ)], None, 'dc')
f6b = cw(10, 'what', 1, -4); fly(f6b, [(26, USW)])
f7 = LE(20, -8); A7 = fly(f7, [(30, MIDW), (36, SEA)], 'santaclara', 'kl')
f8 = LE(30, -8); A8 = fly(f8, [(30, CN)], 'kl', 'beijing')
f9 = LE(41, -8); A9 = fly(f9, [(26, BAYAN)], 'beijing', 'bayanobo')
f9b = L(50, -16); fly(f9b, [(28, MIDW), (30, CHI)], 'bayanobo', 'chicago')
f9c = L(51, -16); fly(f9c, [(28, MIDW), (30, CN)], 'chicago', 'beijing')
f9d = L(54, -8); fly(f9d, [(30, (-5.0, 26.0, 8.2))])
f9e = L(55, -8); fly(f9e, [(26, CN)])
f10 = LE(56, -8); A10 = fly(f10, [(26, HZ)], 'bayanobo', 'hangzhou')
f10b = L(65, -16); fly(f10b, [(28, MIDW), (30, NY)], 'hangzhou', 'newyork')
f10c = L(70, -16); fly(f10c, [(28, MIDW), (30, HZ)], 'newyork', 'hangzhou')
fout = L(71, -8); AOUT = fly(fout, [(46, WORLD)])
MOVES = []
for f, legs, _, _ in FLIGHTS:
    for n, tgt in legs: MOVES.append((f, n, tgt)); f += n
LABELS = [
    ('Atlantic Ocean', -40.0, 28.0, 46, True, 0, 14), ('RUSSIA', 92.0, 62.0, 46, False, 0, 14), ('CHINA', 102.0, 33.0, 44, False, 0, 14),
    ('UNITED STATES', -100.0, 39.0, 40, False, 0, 14), ('INDIA', 78.0, 21.0, 40, False, 0, 14), ('Indian Ocean', 74.0, -6.0, 44, True, 0, 14),
    ('CANADA', -100.0, 57.0, 44, False, 15, 21), ('MEXICO', -103.0, 23.5, 40, False, 15, 21), ('Pacific Ocean', -134.0, 27.0, 40, True, 15, 21),
    ('CHINA', 101.0, 31.0, 48, False, 21, 26), ('MONGOLIA', 103.5, 46.5, 40, False, 21, 26), ('South China Sea', 113.5, 14.0, 34, True, 21, 26),
    ('MALAYSIA', 102.2, 5.0, 40, False, 26, 40), ('THAILAND', 101.0, 16.0, 40, False, 26, 40), ('South China Sea', 113.0, 12.0, 36, True, 26, 40),
    ('VIRGINIA', -78.6, 37.4, 40, False, 50, 999), ('Atlantic Ocean', -71.5, 35.5, 44, True, 50, 999), ('LAKE MICHIGAN', -87.0, 43.6, 30, True, 50, 999),
    ('MONGOLIA', 106.0, 44.2, 40, False, 50, 999), ('INNER MONGOLIA', 111.5, 40.6, 34, False, 50, 999), ('East China Sea', 124.0, 29.0, 36, True, 50, 999),
]
PAINT = {'USA': (0, 10 ** 6), 'CHN': (cw(0, 'china', 1, -2), 10 ** 6)}
LEFT, RIGHT = 500, 1480
def ransom(f0, f1, text, y=370, size=160, x=LEFT, seed=3): add('ransom', f0, f1, text=text, xy=(x, y), size=size, seed=seed)
def tag(f0, f1, text, xy=None, size=46, rot=0.0, pin=None):
    if pin: add('tag', f0, f1, text=text, pin=pin, size=size, rot=rot)
    else: add('tag', f0, f1, text=text, xy=xy, size=size, rot=rot)
def note(f0, f1, text, xy=(960, 950), size=96, rot=-2): add('note', f0, f1, text=text, xy=xy, size=size, rot=rot)
def piece(f0, f1, key, fn, xy=None, rot=0, scale=1.0, screen=True, **kw):
    if xy is not None: kw['xy'] = xy
    add('piece', f0, f1, key=key, fn=fn, rot=rot, scale=scale, screen=screen, **kw)

# flights are never bare: the dashed route draws under the camera; a chapter flight also slaps in its MOVE number
for f, legs, a, b in FLIGHTS:
    n = sum(k for k, _ in legs)
    if a and b: add('dasharc2', f, f + n + 50, a=(a, 0, 0), b=(b, 0, 0), bend=0.14, dur=n)
for k, (f, arr) in enumerate(((f6, A6), (f7, A7), (f8, A8), (f9, A9), (f10, A10)), 1):
    ransom(f + 2, arr + 60, f'MOVE {k}', y=960, size=110, x=960, seed=k)

# ------------------------------------------------------------------ COLD OPEN (wide: USA vs China)
add('dasharc2', cw(0, 'bet', 1, -2), f6, a=('dc', 0, 0), b=('beijing', 0, 0), bend=0.18, dur=20)
add('chip', cw(0, 'chips', 1, -2), L(2), xy=(LEFT - 160, 820), rot=-6, scale=0.75)
add('inkx', cw(0, "can't", 1, 0), L(2), xy=(LEFT - 160, 820), r=110)
ransom(cw(0, 'bet', 1, -2), L(2), 'THE BET', y=170, size=120, x=960, seed=2)
piece(cw(2, 'metals', 1, -2), L(4), 'magnets', draw_magnets, (RIGHT + 180, 800), rot=4, scale=0.8)
piece(cw(2, 'labels', 1, -2), L(4), 'box', draw_box, (LEFT - 200, 800), rot=-4, scale=0.8)
piece(cw(2, 'start-up', 1, -2), L(4), 'chart', draw_downchart, (960, 820), rot=-3, screen=False, scale=0.8)
ransom(cw(2, 'six', 1, -2), L(4), '-$590 BN', y=170, size=110, x=960, seed=4)
note(cw(4, 'move', 1, -2), f6, 'move by move', xy=(960, 960))

# ------------------------------------------------------------------ FIG. 06 MOVE 1: THE BAN (Washington -> Santa Clara)
E6 = f7
add('card', A6 - 6, E6, fig='FIG. 06', lines=['The Ban'])
add('dot', A6 - 10, END, pin=('dc', 0, 0), top=True)
tag(cw(5, 'washington', 1, -2), cw(6, "nvidia's", 1, -2), 'WASHINGTON', pin=('dc', 160, -60), rot=1.5, size=52)
ransom(cw(5, 'seventh', 1, -2), L(7), '7 OCT 2022', size=110, seed=3)
add('doc', cw(6, 'rules', 1, -2), L(10), xy=(RIGHT, 640), rot=-6, scale=0.85, title='RULE')
add('chip', cw(6, 'chips', 1, -2), L(7), xy=(RIGHT - 300, 760), rot=5, scale=0.75)
add('inkx', cw(6, 'longer', 1, -2), L(7), xy=(RIGHT - 300, 760), r=110)
tag(cw(6, 'tools', 1, -2), L(7), '+ CHIPMAKING TOOLS', (LEFT, 550), rot=1)
for i in range(4):
    add('chip', cw(8, 'thousands', 1, -2) + 3 * i, L(9), xy=(RIGHT - 270 + i * 180, 760 + (i % 2) * 70), rot=(-6, 3, -2, 6)[i], scale=0.5)
tag(cw(8, 'weeks', 1, -2), L(9), 'THOUSANDS OF CHIPS · WEEKS', (LEFT, 550), rot=-1, size=44)
tag(cw(9, 'security', 1, -2), L(10), 'NATIONAL SECURITY', (LEFT, 550), rot=1, size=52)
tag(cw(9, 'military', 1, -2), L(10), 'MILITARY USES', (LEFT, 625), rot=-1, size=52)
add('dot', cw(10, 'nvidia', 1, -2), END, pin=('santaclara', 0, 0), top=True)
tag(cw(10, 'nvidia', 1, 2), L(14), 'NVIDIA', pin=('santaclara', 150, -60), rot=1.5, size=50)
add('chip', cw(11, 'version', 1, -2), L(13), xy=(RIGHT - 220, 720), rot=-5, scale=0.7)
tag(cw(11, 'eight', 1, -2), L(13), 'A800 · H800', (RIGHT - 220, 900), rot=-1.5, size=50)
tag(cw(11, 'slower', 1, -2), L(12), 'SLOWER LINKS', (LEFT, 550), rot=1)
add('inkx', cw(12, 'banned', 1, -2), L(13), xy=(RIGHT - 220, 720), r=100)
tag(cw(12, 'forty', 1, -2), L(13), '40+ COUNTRIES', (LEFT, 550), rot=-1, size=52)
add('chip', cw(13, 'twenty', 1, -2), L(15), xy=(RIGHT + 150, 720), rot=5, scale=0.7)
tag(cw(13, 'twenty', 1, 2), L(15), 'H20', (RIGHT + 150, 900), rot=1.5, size=56)
ransom(cw(13, 'four-and-a-half-billion-dollar', 1, -4), L(14), '$4.5 BN', size=150, seed=4)
tag(cw(13, 'charge', 1, -2), L(14), 'CHARGE · 2025', (LEFT, 550), rot=1)
ransom(cw(15, 'fifteen', 1, -2), L(16), '15%', size=200, seed=5)
tag(cw(15, 'august', 1, -2), L(16), 'H20 · AUG 2025', (LEFT, 550), rot=-1, size=50)
add('inkx', cw(16, 'buy', 1, -2), L(17), xy=(RIGHT + 150, 720), r=100)
tag(cw(16, 'beijing', 1, -2), L(17), "BEIJING: DON'T BUY", (LEFT, 550), rot=1, size=50)
ransom(cw(16, 'no', 1, -2), L(17), '0 SOLD', size=150, seed=6)
ransom(cw(17, 'twenty-five', 1, -2), L(19), '25%', size=200, seed=7)
tag(cw(17, 'two', 1, -2), L(19), 'H200 · DEC 2025', (LEFT, 550), rot=-1, size=50)
add('chip', cw(17, 'two', 1, -2), L(19), xy=(RIGHT, 740), rot=-4, scale=0.85)
note(cw(18, 'tax', 1, -4), L(19), 'a tax?', xy=(960, 960), size=110)
ransom(cw(19, 'stopped', 1, -2), E6, 'STOPPED', size=140, seed=8)
tag(cw(19, 'november', 1, -2), E6, 'NVIDIA SHIPMENTS · NOV 2026', (LEFT, 550), rot=1, size=44)
note(cw(20, 'black', 1, -2), E6, 'a black market', xy=(960, 960))

# ------------------------------------------------------------------ FIG. 07 MOVE 2: THE SMUGGLERS (South-East Asia)
E7 = f8
add('card', A7 - 6, E7, fig='FIG. 07', lines=['The Smugglers'])
add('dot', cw(25, 'malaysia', 1, -2), END, pin=('kl', 0, 0), top=True)
note(cw(21, 'smuggle', 1, -2), L(22), 'banned = valuable', xy=(960, 960))
ransom(cw(22, 'hundred', 1, -4), L(25), '$160M+', size=170, seed=3)
tag(cw(22, 'gatekeeper', 1, -2), L(25), 'OPERATION GATEKEEPER', (LEFT, 550), rot=1, size=48)
piece(cw(24, 'relabelled', 1, -2), L(25), 'box', draw_box, (RIGHT, 700), rot=-4, scale=1.0)
tag(cw(24, 'fake', 1, -2), L(25), '"SANDKYAN"', (RIGHT + 40, 720), rot=3, size=56)
tag(cw(24, 'computer', 1, -2), L(25), '"COMPUTER PARTS"', (RIGHT, 920), rot=-1.5, size=48)
tag(cw(24, 'guilty', 1, -2), L(25), 'GUILTY PLEA · OCT 2025', (LEFT, 620), rot=-1, size=46)
add('dot', cw(25, 'thailand', 1, -2), END, pin=('bangkok', 0, 0), top=True)
tag(cw(25, 'malaysia', 1, 2), L(27), 'MALAYSIA', pin=('kl', -220, 40), rot=-1.5, size=50)
tag(cw(25, 'thailand', 1, 2), L(27), 'THAILAND', pin=('bangkok', -220, -40), rot=1.5, size=50)
ransom(cw(25, 'four', 1, -2), L(26), '4 CHARGED', size=130, seed=4)
piece(cw(25, 'supercomputers', 1, -2), L(27), 'server', draw_server, (RIGHT + 200, 640), rot=4, scale=0.8)
add('inkx', cw(25, 'intercepted', 1, -2), L(27), xy=(RIGHT + 200, 640), r=110)
ransom(cw(28, 'two', 1, -4), L(29), '$2.5 BN', size=160, seed=5)
tag(cw(27, 'supermicro', 1, -2), L(30), 'SUPERMICRO CO-FOUNDER', (LEFT, 550), rot=1, size=44)
tag(cw(28, 'allege', 1, -2), L(29), 'ALLEGED', (LEFT, 625), rot=-1.5, size=56)
piece(cw(28, 'servers', 1, -2), L(30), 'server', draw_server, (RIGHT - 200, 640), rot=-3, scale=0.75)
piece(cw(28, 'dummy', 1, -2), L(30), 'server', draw_server, (RIGHT + 200, 660), rot=4, scale=0.75)
note(cw(28, 'dummy', 1, 2), L(29), 'dummy?', xy=(RIGHT + 200, 950), size=104)
tag(cw(28, 'five', 1, -2), L(29), '~$500M ON TO CHINA', (LEFT, 700), rot=1, size=44)
tag(cw(29, 'co-defendant', 1, -2), L(30), '1 CO-DEFENDANT: GUILTY', (LEFT, 330), rot=-1, size=44)
tag(cw(29, 'not', 1, -2), L(30), 'CO-FOUNDER: NOT GUILTY', (LEFT, 405), rot=1, size=44)
tag(cw(29, 'trial', 1, -2), L(30), 'TRIAL · 2027', (LEFT, 480), rot=-1, size=48)
note(cw(30, 'hit', 1, -2), E7, 'hitting back', xy=(960, 960))

# ------------------------------------------------------------------ FIG. 08 MOVE 3: THE METALS (Beijing; Yunnan)
E8 = f9
add('card', A8 - 6, E8, fig='FIG. 08', lines=['The Metals'])
add('dot', A8 - 10, END, pin=('beijing', 0, 0), top=True)
ransom(cw(31, 'july', 1, -2), L(33), 'JULY 2023', size=120, seed=3)
tag(cw(32, 'gallium', 1, -2), L(34), 'GALLIUM', (RIGHT - 160, 360), rot=-2, size=56)
tag(cw(32, 'germanium', 1, -2), L(34), 'GERMANIUM', (RIGHT + 140, 440), rot=2, size=56)
add('doc', cw(32, 'licences', 1, -2), L(34), xy=(RIGHT, 740), rot=-5, scale=0.8, title='LICENCE')
ransom(cw(34, 'ninety-nine', 1, -2), L(35), '99%', size=210, seed=4)
tag(cw(34, 'gallium', 1, -2), L(35), "OF THE WORLD'S GALLIUM", (LEFT, 560), rot=1, size=46)
piece(cw(35, 'radar', 1, -2), L(37), 'radar', draw_radar, (RIGHT - 200, 700), rot=-4, scale=0.75)
tag(cw(35, 'air-defence', 1, -2), L(37), 'AIR-DEFENCE RADAR', (RIGHT - 200, 900), rot=-1.5, size=46)
tag(cw(35, 'led', 1, -2), L(36), 'LED LIGHTS', (LEFT, 400), rot=-1, size=50)
tag(cw(35, 'power', 1, -2), L(36), 'POWER CHIPS', (LEFT, 475), rot=1, size=50)
piece(cw(36, 'germanium', 1, -2), L(38), 'fibre', draw_fibre, (RIGHT + 220, 720), rot=3, scale=0.75)
tag(cw(36, 'fibre-optic', 1, -2), L(38), 'FIBRE OPTICS', (RIGHT + 220, 920), rot=1.5, size=46)
tag(cw(36, 'night-vision', 1, -2), L(37), 'NIGHT VISION', (LEFT, 400), rot=-1, size=50)
add('dot', cw(36, 'germanium', 1, 0), END, pin=('yunnan', 0, 0), top=True)
ransom(cw(38, 'banned', 1, -2), L(39), 'BAN', size=200, seed=5)
tag(cw(38, 'december', 1, -2), L(39), 'TO THE US · DEC 2024', (LEFT, 560), rot=1, size=48)
tag(cw(38, 'day', 1, -2), L(39), 'ONE DAY AFTER US CHIP RULES', (LEFT, 630), rot=-1, size=40)
ransom(cw(39, 'doubled', 1, -4), cw(39, 'germanium', 1, -2), 'x2', size=200, seed=6)
tag(cw(39, 'gallium', 1, -2), cw(39, 'germanium', 1, -2), 'GALLIUM · EUROPE', (LEFT, 560), rot=1, size=48)
ransom(cw(39, 'five', 1, -2), L(40), '$5,000/KG', size=110, seed=7)
tag(cw(39, 'times', 1, -2), L(40), 'GERMANIUM · 5x EARLY 2023', (LEFT, 560), rot=-1, size=44)
add('dot', cw(40, 'korea', 1, -2), L(41), pin=('busan', 0, 0), top=True)
tag(cw(40, 'korea', 1, 2), L(41), 'TRUMP-XI · BUSAN', pin=('busan', 0, 70), rot=1.5, size=46)
ransom(cw(40, 'paused', 1, -2), E8, 'PAUSED', size=150, seed=8)
note(cw(40, 'now', 1, -4), L(41), '...for now', xy=(960, 960), size=104)
note(cw(41, 'smaller', 1, -2), E8, 'something smaller', xy=(960, 960))

# ------------------------------------------------------------------ FIG. 09 MOVE 4: THE MAGNETS (Bayan Obo -> Chicago -> China)
E9 = f10
add('card', A9 - 6, E9, fig='FIG. 09', lines=['The Magnets'])
add('dot', A9 - 10, END, pin=('bayanobo', 0, 0), top=True)
piece(cw(42, 'magnets', 1, -2), L(47), 'magnets', draw_magnets, (RIGHT, 720), rot=-4, scale=1.0)
note(cw(43, 'fridge', 1, -2), L(44), 'not fridge magnets', xy=(960, 960))
for i, (w, txt) in enumerate((('motors', 'ELECTRIC MOTORS'), ('cars', 'CARS'), ('drones', 'DRONES'), ('turbines', 'WIND TURBINES'))):
    tag(cw(44, w, 1, -2), L(45), txt, (LEFT, 330 + i * 75), rot=(-2, 1.5, -1, 2)[i], size=50)
for i, (w, txt, y) in enumerate((('sixty', '60% MINED', 330), ('ninety', '~90% REFINED', 410), ('ninety-four', '94% OF MAGNETS', 490))):
    tag(cw(45, w, 1, -2), L(46), txt, (LEFT, y), rot=(-1.5, 1.5, -1)[i], size=58)
ransom(cw(45, 'ninety-four', 1, -2), L(46), '94%', y=760, size=200, x=LEFT, seed=3)
add('circle', cw(46, 'bayan', 1, -2), L(47), pin=('bayanobo', 0, 0), rx=80, ry=64, dur=12, top=True)
tag(cw(46, 'bayan', 1, 2), L(48), 'BAYAN OBO', pin=('bayanobo', 0, 100), rot=1.5, size=54)
tag(cw(46, 'largest', 1, -2), L(47), "WORLD'S LARGEST RARE-EARTH MINE", (LEFT, 560), rot=-1, size=40)
add('doc', cw(47, 'licences', 1, -2), L(49), xy=(RIGHT, 700), rot=-5, scale=0.8, title='LICENCE')
tag(cw(47, 'seven', 1, -2), L(48), '7 RARE EARTHS · APRIL 2025', (LEFT, 560), rot=1, size=44)
ransom(cw(48, 'seventy-four', 1, -2), L(49), '-74%', size=200, seed=4)
tag(cw(48, 'ninety-three', 1, -4), L(49), 'TO THE US: -93%', (LEFT, 560), rot=-1, size=52)
add('dot', A9, END, pin=('chicago', 0, 0), top=True)
piece(cw(50, 'chicago', 1, -4), L(51), 'car', draw_car, (RIGHT, 760), rot=3, scale=0.95)
add('inkx', cw(50, 'halted', 1, 0), L(51), xy=(RIGHT, 760), r=120)
tag(cw(50, 'chicago', 1, 0), L(51), 'FORD · CHICAGO', pin=('chicago', -10, 90), rot=1.5, size=52)
tag(cw(50, 'week', 1, -2), L(51), 'ABOUT A WEEK · 2025', (LEFT, 560), rot=-1, size=48)
tag(cw(50, 'europe', 1, -2), L(51), 'EUROPE: LINES SHUT', (LEFT, 640), rot=1, size=48)
ransom(cw(51, 'five', 1, -2), L(52), '+5', size=200, seed=5)
tag(cw(51, 'foreign', 1, -2), L(53), 'RULE REACHES FOREIGN FACTORIES', (LEFT, 560), rot=1, size=40)
note(cw(52, 'everything', 1, -4), L(53), 'almost everything', xy=(960, 960))
ransom(cw(53, 'truce', 1, -2), L(54), 'TRUCE', size=170, seed=6)
tag(cw(53, 'october', 1, -2), L(54), 'OCT 2025 · RULES PAUSED', (LEFT, 560), rot=-1, size=46)
add('dot', cw(54, 'california', 1, -2), END, pin=('mountainpass', 0, 0), top=True)
tag(cw(54, 'california', 1, 2), L(55), 'CALIFORNIA MINE', pin=('mountainpass', 0, -60), rot=-1.5, size=44)
add('dot', cw(54, 'lynas', 1, -2), END, pin=('kuantan', 0, 0), top=True)
tag(cw(54, 'lynas', 1, 2), L(55), 'LYNAS · MALAYSIA', pin=('kuantan', 0, 70), rot=1.5, size=44)
tag(cw(54, 'pentagon', 1, -2), L(55), 'PENTAGON STAKE + MIN. PRICE', (960, 960), rot=1, size=46)
ransom(cw(55, 'ninety-four', 1, -2), L(56), '94%', size=210, seed=3)
tag(cw(55, 'country', 1, -4), E9, 'STILL FROM CHINA', (LEFT, 560), rot=1, size=52)
note(cw(56, 'app', 1, -4), E9, 'an app store?', xy=(960, 960), size=104)

# ------------------------------------------------------------------ FIG. 10 MOVE 5: THE APP (Hangzhou -> New York -> Hangzhou)
E10 = fout
add('card', A10 - 6, E10, fig='FIG. 10', lines=['The App'])
add('dot', A10 - 10, END, pin=('hangzhou', 0, 0), top=True)
tag(cw(57, 'deepseek', 1, -2), L(59), 'DEEPSEEK · HANGZHOU', pin=('hangzhou', -330, 60), rot=-1.5, size=50)
tag(cw(57, 'hedge', 1, -2), L(59), 'HEDGE-FUND SPIN-OFF', (LEFT, 560), rot=1, size=46)
ransom(cw(58, 'free', 1, -2), L(59), 'FREE', size=200, seed=3)
tag(cw(58, 'r1', 1, -2), L(59), 'R1 · 20 JAN 2025', (LEFT, 560), rot=-1, size=50)
add('chip', cw(60, 'eight', 1, -2), L(61), xy=(RIGHT, 720), rot=-4, scale=0.9)
tag(cw(60, 'eight', 1, 2), L(61), 'H800', (RIGHT, 920), rot=1.5, size=60)
tag(cw(60, 'legal', 1, -2), L(61), 'LEGAL UNTIL LATE 2023', (LEFT, 560), rot=1, size=48)
ransom(cw(61, 'five', 1, -2), L(63), '$5.6M', size=180, seed=4)
tag(cw(61, 'final', 1, -2), L(62), 'FINAL TRAINING RUN', (LEFT, 560), rot=-1, size=48)
note(cw(62, 'higher', 1, -4), L(63), 'real total: higher', xy=(960, 960), size=96)
add('phone', cw(64, 'app', 1, -2), L(65), xy=(RIGHT, 720), rot=6, scale=0.85)
ransom(cw(64, 'number', 1, -2), L(65), '#1', size=210, seed=5)
tag(cw(64, 'chatgpt', 1, -2), L(65), 'AHEAD OF CHATGPT', (LEFT, 560), rot=1, size=48)
add('dot', A10, END, pin=('newyork', 0, 0), top=True)
piece(cw(65, 'panicked', 1, -2), L(67), 'chart', draw_downchart, (RIGHT, 700), rot=-3, screen=False, scale=1.0)
tag(cw(65, 'panicked', 1, 2), L(66), 'WALL STREET · 27 JAN 2025', (LEFT, 560), rot=-1, size=44)
ransom(cw(66, 'seventeen', 1, -2), cw(66, 'five', 1, -2), '-17%', size=200, seed=6)
ransom(cw(66, 'five', 1, -2), L(67), '-$590 BN', size=130, seed=7)
tag(cw(66, 'biggest', 1, -2), L(67), 'BIGGEST 1-DAY LOSS', (LEFT, 560), rot=1, size=50)
note(cw(68, 'leaked', 1, -2), L(69), 'leaked, not failed', xy=(960, 960), size=96)
ransom(cw(69, 'five', 1, -2), L(70), '$5 TRILLION', size=110, seed=8)
tag(cw(69, 'first', 1, -2), L(70), 'NVIDIA · OCT 2025', (LEFT, 560), rot=-1, size=50)
add('chip', cw(70, 'huawei', 1, -4), E10, xy=(RIGHT, 720), rot=5, scale=0.9)
tag(cw(70, 'huawei', 1, 0), E10, 'HUAWEI CHIPS', (RIGHT, 920), rot=-1.5, size=54)
tag(cw(70, 'april', 1, -2), E10, 'DEEPSEEK · APRIL 2026', (LEFT, 560), rot=1, size=46)

# ------------------------------------------------------------------ OUTRO: scoreboard
def draw_scoreboard():
    rows = [('1', 'THE BAN', 'USA'), ('2', 'THE SMUGGLERS', 'NEW ROUTES'), ('3', 'THE METALS', 'CHINA'), ('4', 'THE MAGNETS', 'CHINA'), ('5', 'THE APP', 'DEEPSEEK')]
    im = Image.new('RGBA', (760, 520), BEIGE + (255,)); d = ImageDraw.Draw(im)
    d.rectangle((8, 8, 751, 511), outline=INK + (255,), width=4)
    d.text((380, 58), 'SCOREBOARD', font=font(F_CASLON, 56), fill=INK, anchor='mm'); d.line((60, 100, 700, 100), fill=INK, width=3)
    for k, (n, mv, who) in enumerate(rows):
        y = 150 + k * 72
        d.rounded_rectangle((40, y - 26, 92, y + 26), 8, fill=YEL + (255,)); d.text((66, y), n, font=font(F_CASLON, 40), fill=INK, anchor='mm')
        d.text((116, y), mv, font=f_type(36), fill=INK, anchor='lm'); d.text((720, y), who, font=f_type(32), fill=INK, anchor='rm')
    return im
MARKS = [('dc', 'washington'), ('kl', 'smugglers'), ('beijing', 'metals'), ('bayanobo', 'magnets'), ('hangzhou', 'app')]
for k, (p, w) in enumerate(MARKS, 1):
    f = max(AOUT - 20, cw(71, w, 1, -2) if w != 'washington' else cw(71, 'banned', 1, -2))
    add('circle', f, END, pin=(p, 0, 0), rx=36, ry=32, dur=8, top=True)
    tag(f + 2, END, str(k), pin=(p, 46, -46), size=50, rot=(-2, 2, -1, 1, -2)[k - 1])
piece(cw(71, 'scoreboard', 1, -2), END, 'scoreboard', draw_scoreboard, (960, 820), rot=-0.8, screen=False)
note(cw(72, 'won', 1, -4), END, 'nobody has won yet', xy=(960, 150), size=92)

G.finish(WORLD, MOVES, LABELS, PAINT)

def chapters():
    return [('Cold open: the bet', 0.0), ('Move 1 · The Ban: Washington', f6 / FPS), ('Move 2 · The Smugglers: South-East Asia', f7 / FPS),
            ('Move 3 · The Metals: Beijing', f8 / FPS), ('Move 4 · The Magnets: Inner Mongolia to Chicago', f9 / FPS),
            ('Move 5 · The App: Hangzhou to Wall Street', f10 / FPS), ('The scoreboard', fout / FPS)]

if __name__ == '__main__':
    if sys.argv[1] == 'chapters':
        for n, t in chapters(): print(f'{int(t // 60)}:{int(t % 60):02d} {n}')
        print('total', round(G.NFR / FPS, 1))
    else:
        G.main()
