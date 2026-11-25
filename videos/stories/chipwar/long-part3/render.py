#!/usr/bin/env python3
"""Chip Wars long-form Part 3 "The AI Gold Rush": 1920x1080, 30 fps, on twos. ONE continuous map and camera (no cuts),
same engine and rules as long-part2: dashed routes and RUSH 1-5 ransoms during every chapter flight, pins persist,
outro = five numbered pins, then Veldhoven and Taiwan. No real person drawn; no logos; no price talk.
usage: ~/cizgi/.venv/bin/python render.py sheet [frames] | frame N | video | chapters"""
import json, os, sys
os.environ['CW_ORIENT'] = 'h'
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, PLACES, FPS
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/long-part3', tail=2.2)
SEG = json.load(open(os.path.join(HERE, 'work', 'segments.json')))
PLACES.update({'dennys': (-121.86, 37.38), 'toronto': (-79.40, 43.66), 'santaclara': (-121.96, 37.37), 'zhunan': (120.88, 24.68),
               'dublin': (-6.26, 53.35), 'tmi': (-76.725, 40.153), 'abilene': (-99.78, 32.50), 'memphis': (-90.15, 35.06),
               'rubymar': (42.8, 13.6), 'jeddah': (39.1, 21.5), 'gof': (25.0, 59.9), 'sf': (-122.40, 37.79), 'london': (-0.126, 51.535),
               'hangzhou': (120.16, 30.27), 'paris': (2.33, 48.87), 'newyork': (-73.99, 40.76), 'veldhoven': (5.40, 51.42), 'hsinchu': (120.97, 24.80)})
END = G.END

def L(i, d=0): return int(round(SEG[i]['s'] * FPS)) + d
def LE(i, d=0): return int(round(SEG[i]['e'] * FPS)) + d
cw = G.cl

# ------------------------------------------------------------------ camera
WORLD, MIDW = (0.0, 25.0, 9.0), (0.0, 30.0, 9.5)
SJ, NA, USW, TW = (-121.6, 37.5, 110), (-100.0, 40.0, 22), (-112.0, 39.0, 30), (120.6, 24.4, 150)
IE, US, RS, BAL = (-7.8, 53.2, 140), (-88.0, 37.0, 22), (40.5, 18.0, 45), (22.0, 58.0, 55)
SF, LDN, HZ, PAR, NY = (-122.3, 37.8, 110), (-1.0, 51.5, 110), (120.0, 30.5, 90), (2.3, 48.9, 110), (-74.0, 40.8, 70)
FLIGHTS = []
def fly(f, legs, a=None, b=None):
    FLIGHTS.append((f, legs, a, b)); return f + sum(n for n, _ in legs)
f11 = L(5, -12); A11 = fly(f11, [(40, SJ)], None, 'dennys')
fly(cw(9, 'toronto', 1, -14), [(28, NA)], 'dennys', 'toronto')
fly(L(12, -10), [(26, SJ)], 'toronto', 'dennys')
f12 = LE(13, -8); A12 = fly(f12, [(26, USW)])
fly(L(20, -10), [(28, MIDW), (32, TW)], 'santaclara', 'zhunan')
f13 = LE(21, -8); A13 = fly(f13, [(28, MIDW), (34, IE)], 'zhunan', 'dublin')
fly(L(25, -12), [(30, US)], 'dublin', 'tmi')
f14 = LE(30, -8); A14 = fly(f14, [(28, MIDW), (32, RS)], 'memphis', 'rubymar')
fly(cw(35, 'baltic', 1, -14), [(28, BAL)], 'jeddah', 'gof')
f15 = LE(37, -8); A15 = fly(f15, [(28, MIDW), (34, SF)], 'gof', 'sf')
fly(L(40, -12), [(26, MIDW), (28, LDN)], 'sf', 'london')
fly(L(42, -12), [(26, MIDW), (28, HZ)], 'london', 'hangzhou')
fly(L(43, -12), [(26, MIDW), (28, PAR)], 'hangzhou', 'paris')
fly(L(44, -8), [(30, NY)], 'paris', 'newyork')
fout = L(46, -8); AOUT = fly(fout, [(46, (-2.0, 28.0, 7.4))])
MOVES = []
for f, legs, _, _ in FLIGHTS:
    for n, tgt in legs: MOVES.append((f, n, tgt)); f += n
LABELS = [
    ('Atlantic Ocean', -40.0, 25.0, 46, True, 0, 14), ('Pacific Ocean', -135.0, 15.0, 44, True, 0, 14), ('Indian Ocean', 75.0, -10.0, 44, True, 0, 14),
    ('AFRICA', 20.0, 5.0, 44, False, 0, 14), ('RUSSIA', 95.0, 62.0, 44, False, 0, 14), ('CHINA', 102.0, 34.0, 42, False, 0, 14),
    ('UNITED STATES', -100.0, 39.0, 40, False, 0, 14),
    ('CANADA', -100.0, 57.0, 44, False, 15, 35), ('UNITED STATES', -100.0, 37.0, 40, False, 15, 35), ('Gulf of Mexico', -90.0, 25.5, 36, True, 15, 35),
    ('Pacific Ocean', -128.0, 30.0, 40, True, 15, 35), ('Atlantic Ocean', -66.0, 32.0, 40, True, 15, 35),
    ('Red Sea', 38.6, 20.0, 40, True, 40, 60), ('SAUDI ARABIA', 45.0, 24.5, 40, False, 40, 60), ('EGYPT', 30.5, 26.5, 40, False, 40, 60),
    ('SUDAN', 31.5, 16.0, 36, False, 40, 60), ('YEMEN', 46.5, 15.8, 36, False, 40, 60), ('Baltic Sea', 19.0, 57.0, 40, True, 40, 60),
    ('FINLAND', 26.0, 63.0, 40, False, 40, 60), ('ESTONIA', 25.5, 58.7, 32, False, 40, 60),
    ('San Francisco Bay', -122.25, 37.95, 32, True, 85, 999), ('Pacific Ocean', -123.6, 36.9, 40, True, 85, 999), ('San Jose', -121.89, 37.22, 30, False, 85, 999),
    ('TAIWAN', 121.0, 22.9, 44, False, 120, 999), ('CHINA', 118.3, 26.7, 44, False, 120, 999), ('Taiwan Strait', 119.3, 23.6, 40, True, 120, 999),
    ('IRELAND', -8.0, 53.0, 44, False, 120, 999), ('Irish Sea', -5.0, 53.8, 36, True, 120, 999),
    ('ENGLAND', -1.8, 52.6, 40, False, 85, 999), ('North Sea', 3.0, 54.6, 40, True, 85, 999), ('FRANCE', 2.6, 47.4, 40, False, 85, 999),
    ('CHINA', 117.5, 32.5, 44, False, 85, 999), ('East China Sea', 124.0, 29.0, 36, True, 85, 999),
    ('NEW YORK', -75.5, 42.6, 36, False, 60, 85), ('Atlantic Ocean', -70.0, 37.5, 40, True, 60, 85),
]
PAINT = {'TWN': (A12 + 60, 10 ** 6), 'IRL': (A13 - 10, 10 ** 6)}
LEFT, RIGHT = 500, 1480
def ransom(f0, f1, text, y=370, size=160, x=LEFT, seed=3): add('ransom', f0, f1, text=text, xy=(x, y), size=size, seed=seed)
def tag(f0, f1, text, xy=None, size=46, rot=0.0, pin=None):
    if pin: add('tag', f0, f1, text=text, pin=pin, size=size, rot=rot)
    else: add('tag', f0, f1, text=text, xy=xy, size=size, rot=rot)
def note(f0, f1, text, xy=(960, 950), size=96, rot=-2): add('note', f0, f1, text=text, xy=xy, size=size, rot=rot)
def piece(f0, f1, key, fn, xy=None, rot=0, scale=1.0, screen=True, **kw):
    if xy is not None: kw['xy'] = xy
    add('piece', f0, f1, key=key, fn=fn, rot=rot, scale=scale, screen=screen, **kw)

for f, legs, a, b in FLIGHTS:          # flights are never bare: the dashed route draws under the camera
    n = sum(k for k, _ in legs)
    if a and b: add('dasharc2', f, f + n + 50, a=(a, 0, 0), b=(b, 0, 0), bend=0.14, dur=n)
for k, (f, arr) in enumerate(((f11, A11), (f12, A12), (f13, A13), (f14, A14), (f15, A15)), 1):
    ransom(f + 2, arr + 60, f'RUSH {k}', y=960, size=110, x=960, seed=k)

# ------------------------------------------------------------------ COLD OPEN
ransom(cw(0, 'gold', 1, -2), L(2), 'GOLD RUSH', y=170, size=120, x=960, seed=2)
note(cw(0, 'shovels', 1, -4), L(2), 'sell the shovels', xy=(960, 950))
add('chip', cw(2, 'chip', 1, -2), f11, xy=(330, 760), rot=-6, scale=0.7)
piece(cw(2, 'power', 1, -2), f11, 'pylon', draw_pylon, (720, 760), rot=3, scale=0.7)
piece(cw(2, 'cables', 1, -2), f11, 'cable', draw_cable, (1160, 780), scale=0.55)
piece(cw(2, 'labs', 1, -2), f11, 'bell', draw_bell, (1590, 760), rot=-2, scale=0.75)
note(cw(4, 'diner', 1, -2), f11, 'a diner?', xy=(960, 300), size=104)

# ------------------------------------------------------------------ FIG. 11 THE SHOVEL MAKER (San Jose -> Toronto -> San Jose)
E11 = f12
add('card', A11 - 6, E11, fig='FIG. 11', lines=['The Shovel Maker'])
add('dot', A11 - 10, END, pin=('dennys', 0, 0), top=True)
ransom(cw(5, 'nineteen', 1, -2), L(7), '1993', size=180, seed=3)
piece(cw(5, 'denny\'s', 1, -2), L(7), 'booth', draw_booth, (RIGHT, 700), rot=-2)
tag(cw(5, 'engineers', 1, -2), L(6), '3 ENGINEERS', (LEFT, 560), rot=1, size=54)
tag(cw(5, 'nvidia', 1, -2), L(7), "NVIDIA · DENNY'S, SAN JOSE", (RIGHT, 920), rot=-1.5, size=44)
piece(cw(6, 'graphics', 1, -2), L(9), 'gpu', draw_gpu, (RIGHT, 700), rot=3)
tag(cw(6, 'gamers', 1, -2), L(7), 'GAMERS', (LEFT, 560), rot=-1, size=56)
ransom(cw(7, 'two', 1, -2), L(8), '2006', size=180, seed=4)
tag(cw(7, 'cuda', 1, -2), L(9), 'CUDA · ANY MATHS', (LEFT, 560), rot=1, size=52)
note(L(8, 2), L(9), 'enter AI', xy=(960, 960))
add('dot', cw(9, 'toronto', 1, -2), END, pin=('toronto', 0, 0), top=True)
tag(cw(9, 'toronto', 1, 2), L(11), 'TORONTO', pin=('toronto', 0, 80), rot=1.5, size=50)
ransom(cw(9, 'twenty', 1, -2), L(10), 'ALEXNET 2012', size=110, seed=5)
piece(cw(9, 'two', 1, -2), L(11), 'gpu', draw_gpu, (RIGHT - 120, 640), rot=-4, scale=0.75)
piece(cw(9, 'gaming', 1, -2), L(11), 'gpu', draw_gpu, (RIGHT + 120, 820), rot=4, scale=0.75)
tag(cw(9, 'week', 1, -2), L(10), 'ABOUT A WEEK', (LEFT, 560), rot=1, size=52)
note(cw(9, 'crushed', 1, -2), L(10), 'crushed it', xy=(960, 960))
add('arrow', cw(10, 'rushed', 1, -2), L(11), a=('toronto', -30, -10), b=('dennys', 40, -20), bend=-0.25, dur=12)
ransom(cw(11, 'one', 1, -2), cw(11, 'four', 1, -2), '$1 TN · 2023', size=110, seed=6)
ransom(cw(11, 'four', 1, -2), cw(11, 'five', 1, -2), '$4 TN · JULY 2025', size=96, seed=7)
ransom(cw(11, 'five', 1, -2), L(12), '$5 TN · OCT 2025', size=96, seed=8)
tag(cw(11, 'first', 1, -2), L(12), 'THE FIRST EVER', (LEFT, 520), rot=1, size=50)
for i, xy in enumerate(((RIGHT - 200, 700), (RIGHT, 760), (RIGHT + 200, 700))):
    add('chip', cw(11, 'five', 1, 2) + 3 * i, L(12), xy=xy, rot=(-6, 2, 7)[i], scale=0.6)
piece(cw(12, 'plaque', 1, -4), E11, 'booth', draw_booth, (RIGHT, 700), rot=-2)
tag(cw(12, 'plaque', 1, 0), E11, 'PLAQUE · 2023', (RIGHT, 920), rot=1.5, size=50)
note(cw(13, 'moat', 1, -4), E11, 'a moat', xy=(960, 960), size=110)

# ------------------------------------------------------------------ FIG. 12 THE MOAT (Santa Clara -> Taiwan)
E12 = f13
add('card', A12 - 6, E12, fig='FIG. 12', lines=['The Moat'])
add('dot', A12 - 10, END, pin=('santaclara', 0, 0), top=True)
ransom(cw(14, 'hundred', 1, -4), L(15), '$107 BN', size=170, seed=3)
tag(cw(14, 'months', 1, -2), L(15), 'DATA CENTRES · 3 MONTHS', (LEFT, 550), rot=-1, size=46)
tag(cw(14, 'nine', 1, -2), L(15), '9 IN EVERY 10 DOLLARS', (LEFT, 625), rot=1, size=46)
piece(cw(14, 'data', 1, -2), L(16), 'server', draw_server, (RIGHT - 140, 700), rot=-3, scale=0.8)
piece(cw(14, 'data', 1, 4), L(16), 'server', draw_server, (RIGHT + 140, 720), rot=4, scale=0.8)
ransom(cw(16, 'eight', 1, -2), cw(16, 'cuda', 1, -2), '8 IN 10', size=160, seed=4)
tag(cw(16, 'analysts', 1, -2), cw(16, 'cuda', 1, -2), "AI CHIPS (ANALYSTS' EST.)", (LEFT, 550), rot=1, size=44)
tag(cw(16, 'cuda', 1, -2), L(17), 'CUDA', (LEFT, 330), rot=-1, size=80)
ransom(cw(16, 'eleven', 1, -2), L(17), '11M', y=520, size=150, seed=5)
tag(cw(16, 'developers', 1, -2), L(17), 'DEVELOPERS (NVIDIA SAYS)', (LEFT, 650), rot=1, size=44)
for i, xy in enumerate(((RIGHT - 200, 700), (RIGHT, 760), (RIGHT + 200, 700))):
    add('chip', cw(16, 'eight', 1, 2) + 3 * i, L(17), xy=xy, rot=(-6, 2, 7)[i], scale=0.55)
tag(cw(17, 'google', 1, -2), L(19), 'GOOGLE CHIPS', (RIGHT - 160, 620), rot=-2, size=52)
tag(cw(17, 'amazon', 1, -2), L(19), 'AMAZON CHIPS', (RIGHT + 160, 700), rot=2, size=52)
ransom(cw(17, 'twenty-five', 1, -2), L(18), '$25 BN+ A YEAR', size=96, seed=6)
tag(cw(17, 'chip', 1, -2), L(18), "AMAZON'S CHIP BUSINESS", (LEFT, 520), rot=1, size=46)
ransom(cw(18, 'six', 1, -2), L(19), '6 GW', size=180, seed=7)
tag(cw(18, 'amd', 1, -2), L(19), 'AMD -> OPENAI', (LEFT, 550), rot=-1, size=54)
note(L(19, 2), L(20), 'could Nvidia lose?', xy=(960, 960), size=96)
add('dot', cw(20, 'tsmc', 1, -2), END, pin=('zhunan', 0, 0), top=True)
tag(cw(20, 'tsmc', 1, 2), E12, 'TSMC PACKAGING', pin=('zhunan', -330, -20), rot=-1.5, size=48)
for i, txt in enumerate(('NVIDIA', 'GOOGLE', 'AMAZON', 'AMD')):
    tag(cw(20, 'queue', 1, -2) + 4 * i, E12, txt, (RIGHT + (i % 2) * 40, 330 + i * 80), rot=(-2, 1.5, -1, 2)[i], size=50)
ransom(cw(20, 'half', 1, -2), E12, '+50%', size=180, seed=8)
tag(cw(20, 'year', 1, -2), E12, 'PACKAGING CAPACITY · 1 YEAR', (LEFT, 550), rot=1, size=44)
piece(cw(21, 'electricity', 1, -4), E12, 'pylon', draw_pylon, (RIGHT, 760), rot=3, scale=0.7)

# ------------------------------------------------------------------ FIG. 13 THE POWER (Ireland -> USA)
E13 = f14
add('card', A13 - 6, E13, fig='FIG. 13', lines=['The Power'])
add('dot', A13 - 10, END, pin=('dublin', 0, 0), top=True)
ransom(cw(22, 'twenty-three', 1, -2), L(23), '23%', size=200, seed=3)
tag(cw(22, 'electricity', 1, -2), L(23), 'IRISH DATA CENTRES · 2025', (LEFT, 550), rot=1, size=46)
tag(cw(22, 'five', 1, -2), L(23), '2015: 5%', (LEFT, 630), rot=-1, size=58)
piece(cw(22, 'data', 1, -2), L(24), 'server', draw_server, (RIGHT + 140, 720), rot=4, scale=0.8)
ransom(cw(23, 'double', 1, -2), L(25), 'x2', size=200, seed=4)
tag(cw(23, 'thirty', 1, -2), L(25), 'WORLDWIDE BY 2030 (IEA)', (LEFT, 550), rot=1, size=46)
note(L(24, 2), L(25, 20), 'where from?', xy=(960, 960), size=104)
add('dot', cw(25, 'three', 1, -2), END, pin=('tmi', 0, 0), top=True)
piece(cw(25, 'reactor', 1, 10), L(27), 'tower', draw_tower, (RIGHT, 700), rot=-2, scale=0.85)
tag(cw(25, 'three', 1, 2), L(27), 'THREE MILE ISLAND', pin=('tmi', 0, 80), rot=1.5, size=44)
tag(cw(25, 'melted', 1, -2), L(26), 'NOT THE 1979 REACTOR', (LEFT, 550), rot=-1, size=46)
tag(cw(25, 'twenty', 1, -2), L(26), 'MICROSOFT · 20 YEARS', (LEFT, 625), rot=1, size=46)
ransom(cw(26, 'six', 1, -2), L(27), '6.6 GW', size=160, seed=5)
tag(cw(26, 'meta', 1, -2), cw(26, 'google', 1, -2), 'META · NUCLEAR', (LEFT, 550), rot=1, size=50)
tag(cw(26, 'google', 1, -2), L(27), 'GOOGLE · SMALL REACTORS', (LEFT, 550), rot=-1, size=46)
add('dot', cw(27, 'texas', 1, -2), END, pin=('abilene', 0, 0), top=True)
tag(cw(27, 'texas', 1, 2), L(28), 'TEXAS AI CAMPUS: 1 GW+', pin=('abilene', 0, 80), rot=-1.5, size=44)
note(L(28, 2), L(29), 'not enough?', xy=(960, 960), size=104)
add('dot', cw(29, 'memphis', 1, -2), END, pin=('memphis', 0, 0), top=True)
tag(cw(29, 'memphis', 1, 2), E13, 'MEMPHIS · xAI', pin=('memphis', 0, 80), rot=1.5, size=48)
piece(cw(29, 'turbines', 1, -2), E13, 'turbine', draw_turbine, (RIGHT - 120, 680), rot=-3, scale=0.7)
piece(cw(29, 'turbines', 1, 4), E13, 'turbine', draw_turbine, (RIGHT + 140, 820), rot=3, scale=0.7)
tag(cw(29, 'dozens', 1, -2), L(30), 'DOZENS OF GAS TURBINES', (LEFT, 550), rot=-1, size=46)
note(cw(29, 'sued', 1, -2), L(30), 'sued', xy=(LEFT, 680), size=120)
note(cw(30, 'sea', 1, -4), E13, 'under the sea', xy=(960, 960))

# ------------------------------------------------------------------ FIG. 14 THE CABLES (Red Sea -> Baltic)
E14 = f15
add('card', A14 - 6, E14, fig='FIG. 14', lines=['The Cables'])
add('dot', A14 - 10, END, pin=('rubymar', 0, 0), top=True)
ransom(cw(31, 'ninety-nine', 1, -2), L(32), '99%+', size=190, seed=3)
tag(cw(31, 'six', 1, -2), L(32), '~600 CABLES', (LEFT, 550), rot=1, size=56)
tag(cw(31, 'satellites', 1, -2), L(32), 'SATELLITES: UNDER 1%', (LEFT, 625), rot=-1, size=46)
piece(cw(31, 'cables', 1, -2), L(33), 'cable', draw_cable, (RIGHT, 700), scale=0.75)
piece(cw(32, 'cargo', 1, -2), L(34), 'ship', draw_ship, pin=('rubymar', 300, -40), rot=-6, scale=0.8)
tag(cw(32, 'missile', 1, -2), L(33), 'HIT BY A MISSILE · 2024', (LEFT, 550), rot=1, size=46)
ransom(cw(32, 'three', 1, -2), L(33), '3 CABLES CUT', size=110, seed=4)
tag(cw(32, 'quarter', 1, -2), L(33), '~1/4 OF RED SEA TRAFFIC (EST.)', (LEFT, 650), rot=-1, size=42)
add('dot', cw(33, 'jeddah', 1, -2), END, pin=('jeddah', 0, 0), top=True)
add('inkx', cw(33, 'jeddah', 1, 0), L(35), pin=('jeddah', 30, -20), r=40)
tag(cw(33, 'jeddah', 1, 2), L(35), 'JEDDAH · 2025', pin=('jeddah', -200, 40), rot=-1.5, size=48)
tag(cw(33, 'microsoft', 1, -2), L(35), 'CLOUD TRAFFIC SLOWED', (LEFT, 550), rot=1, size=48)
note(L(34, 2), L(35), 'an accident?', xy=(960, 960), size=104)
add('dot', cw(35, 'baltic', 1, 14), END, pin=('gof', 0, 0), top=True)
for i, (dx, dy) in enumerate(((-120, 60), (40, -30), (-260, 160))):
    add('inkx', cw(35, 'damaged', 1, -2) + 3 * i, E14, pin=('gof', dx, dy), r=30)
tag(cw(35, 'christmas', 1, -2), L(36), 'GULF OF FINLAND · 25 DEC 2024', (LEFT, 550), rot=1, size=42)
tag(cw(35, 'four', 1, -2), L(36), '1 POWER + 4 DATA CABLES', (LEFT, 625), rot=-1, size=46)
for i, txt in enumerate(('GOOGLE', 'META', 'MICROSOFT', 'AMAZON')):
    tag(cw(36, txt.lower(), 1, -2), E14, txt, (RIGHT + (i % 2) * 60, 330 + i * 80), rot=(-2, 1.5, -1, 2)[i], size=50)
ransom(cw(36, 'three', 1, -2), L(37), '3/4', size=180, seed=5)
tag(cw(36, 'bandwidth', 1, -2), L(37), 'OF INTERNATIONAL BANDWIDTH', (LEFT, 550), rot=1, size=44)
note(cw(37, 'racing', 1, -2), E14, 'the race', xy=(960, 960), size=110)

# ------------------------------------------------------------------ FIG. 15 THE RACE (San Francisco -> London -> Hangzhou -> Paris -> New York)
E15 = fout
add('card', A15 - 6, E15, fig='FIG. 15', lines=['The Race'])
add('dot', A15 - 10, END, pin=('sf', 0, 0), top=True)
tag(cw(38, 'openai', 1, -2), L(39), 'OPENAI', pin=('sf', 260, -60), rot=-1.5, size=52)
ransom(cw(38, 'nine', 1, -2), cw(38, 'reportedly', 1, -2), '900M WEEKLY', size=96, seed=3)
tag(cw(38, 'reportedly', 1, -2), L(39), '~$1.25 TN (REPORTED)', (LEFT, 550), rot=1, size=50)
tag(cw(39, 'anthropic', 1, -2), L(40), 'ANTHROPIC (MAKER OF CLAUDE)', pin=('sf', 300, 70), rot=1.5, size=44)
ransom(cw(39, 'eighty-one', 1, -2), L(40), '$81 BN IPO', size=110, seed=4)
tag(cw(39, 'nasdaq', 1, -2), L(40), 'NASDAQ · NOV 2026', (LEFT, 550), rot=-1, size=50)
piece(cw(39, 'nasdaq', 1, 0), L(40), 'bell', draw_bell, (RIGHT, 720), rot=-2, scale=0.8)
add('dot', cw(40, 'london', 1, -2), END, pin=('london', 0, 0), top=True)
tag(cw(40, 'deepmind', 1, -2), L(42), 'GOOGLE DEEPMIND', pin=('london', 0, 90), rot=-1.5, size=50)
tag(cw(40, 'billion', 1, -2), L(41), 'GEMINI: 1 BN+ MONTHLY USERS', (LEFT, 550), rot=1, size=44)
tag(cw(41, 'meta', 1, -2), L(42), 'META: NOW A CLOSED MODEL', (LEFT, 330), rot=-1, size=46)
tag(cw(41, 'xai', 1, -2), L(42), 'xAI: MERGED INTO SPACEX', (LEFT, 410), rot=1, size=46)
add('dot', cw(42, 'hangzhou', 1, -2), END, pin=('hangzhou', 0, 0), top=True)
tag(cw(42, 'deepseek', 1, -2), L(43), 'DEEPSEEK', pin=('hangzhou', -280, 40), rot=-1.5, size=52)
tag(cw(42, 'huawei', 1, -2), L(43), 'FREE MODELS · HUAWEI CHIPS', (LEFT, 550), rot=1, size=44)
add('dot', cw(43, 'paris', 1, -2), END, pin=('paris', 0, 0), top=True)
tag(cw(43, 'mistral', 1, -2), L(44), 'MISTRAL', pin=('paris', 0, 90), rot=1.5, size=52)
ransom(cw(43, 'three', 1, -2), L(44), '€3 BN', size=170, seed=5)
tag(cw(43, 'asml', 1, -2), L(44), 'ASML: A TOP INVESTOR', (LEFT, 550), rot=-1, size=48)
note(L(44, 2), E15, 'who wins?', xy=(960, 300), size=110)
add('dot', A15, END, pin=('newyork', 0, 0), top=True)
for i, xy in enumerate(((RIGHT - 200, 700), (RIGHT, 780), (RIGHT + 200, 700))):
    piece(cw(45, 'shovels', 1, -6) + 3 * i, E15, 'gpu', draw_gpu, xy, rot=(-6, 2, 7)[i], scale=0.55)
note(cw(45, 'shovels', 1, -2), E15, 'same shovels', xy=(LEFT, 700), size=104)

# ------------------------------------------------------------------ OUTRO: five numbered pins, then one Dutch machine and one island
MARKS = [('dennys', 'diner', (-50, -46)), ('zhunan', 'moat', (-64, -40)), ('dublin', 'power', (-80, 0)), ('rubymar', 'cables', (56, 40)), ('newyork', 'labs', (56, -46))]
for k, (p, w, (dx, dy)) in enumerate(MARKS, 1):
    f = max(AOUT - 20, cw(46, w, 1, -2))
    add('circle', f, END, pin=(p, 0, 0), rx=32, ry=28, dur=8, top=True)
    tag(f + 2, END, str(k), pin=(p, dx, dy), size=48, rot=(-2, 2, -1, 1, -2)[k - 1])
add('circle', cw(48, 'dutch', 1, -2), END, pin=('veldhoven', 0, 0), rx=30, ry=26, dur=10, top=True)
tag(cw(48, 'machine', 1, -2), END, 'ONE DUTCH MACHINE', pin=('veldhoven', 230, 50), rot=1.5, size=42)
tag(cw(48, 'island', 1, 2), END, 'ONE ISLAND', pin=('hsinchu', 40, 80), rot=-1.5, size=46)
ransom(cw(47, 'underneath', 1, -2), END, 'UNDERNEATH IT ALL', y=120, size=80, x=960, seed=2)
add('sheet', L(49, 4), END, xy=(960, 960), text='Who wins the AI gold rush?')

G.finish(WORLD, MOVES, LABELS, PAINT)

def chapters():
    return [('Cold open: the shovel sellers', 0.0), ('Rush 1 · The Shovel Maker: Nvidia', f11 / FPS), ('Rush 2 · The Moat: CUDA and the TSMC queue', f12 / FPS),
            ('Rush 3 · The Power: Ireland to Memphis', f13 / FPS), ('Rush 4 · The Cables: Red Sea and Baltic', f14 / FPS),
            ('Rush 5 · The Race: the AI labs', f15 / FPS), ('Underneath it all', fout / FPS)]

if __name__ == '__main__':
    if sys.argv[1] == 'chapters':
        for n, t in chapters(): print(f'{int(t // 60)}:{int(t % 60):02d} {n}')
        print('total', round(G.NFR / FPS, 1))
    else:
        G.main()
