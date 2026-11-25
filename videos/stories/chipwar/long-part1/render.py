#!/usr/bin/env python3
"""Chip Wars long-form Part 1 "5 Places Every Chip on Earth Depends On": 1920x1080, 30 fps, on twos.
ONE continuous map and camera (no cuts, no fades): the camera flies Spruce Pine -> Black Sea -> Veldhoven -> Cambridge -> Taiwan -> world.
Built on the shared Shorts engine in landscape mode (../_shorts/engine.py, CW_ORIENT=h) and the Part 1 pieces (../_shorts/pieces.py).
usage: ~/cizgi/.venv/bin/python render.py sheet [frames] | frame N | video | chapters"""
import json, math, os, sys
os.environ['CW_ORIENT'] = 'h'
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, Image, ImageDraw, YEL, INK, BEIGE, PLACES, np, CTRY, FPS
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/long-part1', tail=2.2)
SEG = json.load(open(os.path.join(HERE, 'work', 'segments.json')))
CH = json.load(open(os.path.join(HERE, 'work', 'chapters.json')))

# Natural Earth 1:50m draws Crimea with Russia (de facto); shown here with Ukraine (internationally recognised), as in Short 02.
for r in [r for r in CTRY['RUS'] if 32 < r[:, 0].min() < 33 and 44 < r[:, 1].min() < 45]:
    CTRY['RUS'] = [x for x in CTRY['RUS'] if x is not r]; CTRY['UKR'].append(r)
PLACES.update({'sprucepine': (-82.065, 35.915), 'odesa': (30.73, 46.48), 'mariupol': (37.55, 47.10), 'crimea': (34.2, 45.1),
               'bump': (10.45, 51.25), 'cambridge': (0.12, 52.20), 'hsinchu': (120.97, 24.80), 'pingtan': (119.79, 25.50),
               'twcoast': (120.92, 24.86)})

def L(i, d=0): return int(round(SEG[i]['s'] * FPS)) + d
def LE(i, d=0): return int(round(SEG[i]['e'] * FPS)) + d
def cw(i, word, occ=1, d=0):
    """frame of the occ-th occurrence of `word` inside voice line i"""
    n = 0
    for w in G.WORDS:
        if SEG[i]['s'] - 0.02 <= w['s'] <= SEG[i]['e'] + 0.02 and w['w'].lower().strip('.,?!:;') == word.lower():
            n += 1
            if n == occ: return int(round(w['s'] * FPS)) + d
    raise KeyError((i, word, occ))

# ------------------------------------------------------------------ camera (focus points: lon, lat, ppd); flights with a mid-way pull-out
WORLD = (19.5, 34.0, 11.0)
SP, BS, NL, DE, CAM, TW = (-81.6, 35.9, 110), (33.6, 46.6, 105), (5.6, 51.9, 190), (10.2, 50.9, 95), (0.6, 52.4, 140), (120.6, 24.3, 170)
MID1, MID2, MID3 = (-25.0, 44.0, 17), (19.0, 49.5, 42), (62.0, 40.0, 14)
f_sp = L(5, 10)
f_bs = LE(20, -10)
f_nl = LE(36, -6)
f_de, f_nl2 = L(43, -6), L(45, -6)
f_cam = LE(53, -6)
f_tw = LE(70, -10)
f_out = L(86, -6)
MOVES = [(f_sp, 56, SP),
         (f_bs, 32, MID1), (f_bs + 32, 36, BS),
         (f_nl, 26, MID2), (f_nl + 26, 28, NL),
         (f_de, 22, DE), (f_nl2, 22, NL),
         (f_cam, 32, CAM),
         (f_tw, 36, MID3), (f_tw + 36, 42, TW),
         (f_out, 52, WORLD)]
A_SP, A_BS, A_NL, A_CAM, A_TW, A_OUT = f_sp + 56, f_bs + 68, f_nl + 54, f_cam + 32, f_tw + 78, f_out + 52   # arrivals
LABELS = [
    ('Atlantic Ocean', -40.0, 28.0, 46, True, 0, 30), ('RUSSIA', 92.0, 62.0, 46, False, 0, 30), ('CHINA', 102.0, 33.0, 44, False, 0, 30),
    ('INDIA', 78.0, 21.0, 40, False, 0, 30), ('AFRICA', 18.0, 8.0, 44, False, 0, 30), ('Indian Ocean', 74.0, -6.0, 44, True, 0, 30),
    ('NORTH CAROLINA', -79.6, 34.9, 40, False, 60, 999), ('TENNESSEE', -86.3, 35.4, 40, False, 60, 999), ('VIRGINIA', -78.4, 37.6, 40, False, 60, 999),
    ('Atlantic Ocean', -75.0, 32.6, 44, True, 60, 999),
    ('UKRAINE', 31.2, 49.4, 46, False, 60, 999), ('RUSSIA', 40.6, 50.8, 44, False, 60, 999), ('Black Sea', 33.6, 43.6, 46, True, 60, 999),
    ('Sea of Azov', 36.6, 46.2, 30, True, 60, 999),
    ('North Sea', 3.0, 55.0, 46, True, 60, 999), ('GERMANY', 12.6, 52.8, 40, False, 60, 999), ('BELGIUM', 4.3, 50.5, 30, False, 60, 999),
    ('FRANCE', 2.4, 48.4, 40, False, 60, 999), ('ENGLAND', -1.6, 52.6, 40, False, 60, 999), ('Veldhoven', 5.4, 51.27, 26, False, 60, 999),
    ('Cambridge', 0.12, 52.42, 26, False, 60, 999),
    ('TAIWAN', 121.0, 22.9, 44, False, 60, 999), ('CHINA', 117.8, 26.6, 44, False, 60, 999), ('Taiwan Strait', 119.4, 23.6, 40, True, 60, 999),
    ('Hsinchu', 120.97, 24.62, 28, False, 60, 999), ('Pacific Ocean', 124.2, 22.8, 44, True, 60, 999),
]
PAINT = {'UKR': (cw(25, 'ukraine', 1, -2), 10 ** 6), 'NLD': (cw(37, 'netherlands', 1, -2), 10 ** 6), 'DEU': (cw(43, 'germany', 1, -2), f_nl2 + 22),
         'GBR': (cw(56, 'cambridge', 1, -2), 10 ** 6), 'TWN': (cw(71, 'taiwan', 1, -2), 10 ** 6)}
END = G.END
LEFT, RIGHT = 500, 1480                         # the two text / piece columns either side of the map focus (960, 540)
def ransom(f0, f1, text, y=370, size=160, x=LEFT, seed=3): add('ransom', f0, f1, text=text, xy=(x, y), size=size, seed=seed)
def tag(f0, f1, text, xy, size=46, rot=0.0, pin=None):
    if pin: add('tag', f0, f1, text=text, pin=pin, size=size, rot=rot)
    else: add('tag', f0, f1, text=text, xy=xy, size=size, rot=rot)
def note(f0, f1, text, xy=(960, 950), size=96, rot=-2): add('note', f0, f1, text=text, xy=xy, size=size, rot=rot)
def piece(f0, f1, key, fn, xy, rot=0, scale=1.0, screen=True, **kw):
    if xy is not None: kw['xy'] = xy
    add('piece', f0, f1, key=key, fn=fn, rot=rot, scale=scale, screen=screen, **kw)

# ------------------------------------------------------------------ COLD OPEN: wide world, five pins, chained
PINS = [('sprucepine', 'SPRUCE PINE', (250, 40)), ('mariupol', 'UKRAINE', (170, 70)), ('veldhoven', 'VELDHOVEN', (150, -80)),
        ('cambridge', 'CAMBRIDGE', (-210, 40)), ('hsinchu', 'TAIWAN', (-200, 70))]
WORDS2 = ['town', 'factories', 'machine', 'company', 'island']
add('phone', cw(0, 'phone', 1, -2), L(3), xy=(250, 760), rot=-6, scale=0.7)
add('chip', cw(0, 'ai', 1, -2), L(3), xy=(1680, 760), rot=6, scale=0.7)
ransom(cw(0, 'five', 1, -2), L(4), 'FIVE PLACES', y=930, size=110, x=960, seed=2)
for (p, name, (dx, dy)), w in zip(PINS, WORDS2):
    f = cw(2, w, 1, -2)
    add('dot', f, A_SP, pin=(p, 0, 0), top=True)
    add('circle', f, A_SP, pin=(p, 0, 0), rx=34, ry=30, dur=8, top=True)
    tag(f + 2, f_sp, name, None, size=44, rot=(-2, 1.5, -1, 2, -1.5)[PINS.index((p, name, (dx, dy)))], pin=(p, dx, dy))
for i in range(4):
    add('dasharc2', cw(3, 'break', 1, -2) + 4 * i, f_sp, a=(PINS[i][0], 0, 0), b=(PINS[i + 1][0], 0, 0), bend=0.12, dur=12)
add('inkx', cw(3, 'break', 1, 6), f_sp, pin=('veldhoven', 60, -40), r=26)
note(cw(4, 'follow', 1, 0), f_sp, 'follow the chip', xy=(960, 950))
note(cw(5, 'sand', 1, -2), A_SP, 'very special sand', xy=(960, 950))

# ------------------------------------------------------------------ FIG. 01 THE QUARTZ (Spruce Pine)
E1 = f_bs
add('card', A_SP - 6, E1, fig='FIG. 01', lines=['The Quartz'])
add('dot', cw(10, 'spruce', 1, -2), END, pin=('sprucepine', 0, 0), top=True)
piece(cw(6, 'crystal', 1, -4), L(12), 'ingot', draw_ingot, (RIGHT, 430), rot=0, scale=0.8)
tag(cw(6, 'silicon', 1, 0), L(8), 'SILICON CRYSTAL', (RIGHT + 260, 300), rot=2)
piece(cw(7, 'quartz', 1, -4), L(12), 'crucible', draw_crucible, (RIGHT, 820))
piece(cw(7, 'quartz', 1, -2), L(12), 'melt', draw_melt, (RIGHT, 758), screen=False, quiet=True)
ransom(cw(7, 'fourteen', 1, -2), L(9), '1,400°C', size=120, seed=7)
tag(cw(7, 'bowl', 1, -2), L(12), 'QUARTZ BOWL', (RIGHT, 1010), rot=-1.5)
add('dot', cw(9, 'impurities', 1, -2), L(12), xy=(RIGHT + 70, 770), top=True)
add('circle', cw(9, 'impurities', 1, 0), L(12), xy=(RIGHT + 70, 770), rx=40, ry=34, dur=10, top=True)
add('inkx', cw(9, 'ruined', 1, -2), L(10), xy=(RIGHT, 430), r=110)
note(cw(9, 'ruined', 1, 0), L(10), 'ruined!', xy=(LEFT, 620), size=110)
piece(cw(10, 'pure', 1, -2), L(12), 'quartz', draw_quartz, (LEFT, 720), rot=-3, scale=0.8)
add('circle', cw(10, 'spruce', 1, 0), L(12), pin=('sprucepine', 0, 0), rx=80, ry=60, dur=12, top=True)
tag(cw(10, 'carolina', 1, -2), E1, 'SPRUCE PINE, N.C.', None, rot=1.2, pin=('sprucepine', 0, 90))
ransom(cw(11, 'eighty', 1, -2), L(12), '80%', size=200, seed=3)
tag(cw(11, 'high-purity', 1, 0), L(12), 'OF HIGH-PURITY QUARTZ', (LEFT, 550), rot=-1)
tag(cw(11, 'analysts', 1, 0), L(12), "ANALYSTS' ESTIMATE", (LEFT, 970), rot=1, size=44)
piece(cw(13, 'sibelco', 1, -4), L(19), 'cart', draw_cart, (RIGHT - 160, 760), rot=-3)
tag(cw(13, 'belgium', 1, -2), L(19), 'SIBELCO · BELGIUM', (RIGHT - 160, 930), rot=-1.5)
piece(cw(13, 'quartz', 1, -4), L(19), 'cart', draw_cart, (RIGHT + 130, 600), rot=3)
tag(cw(13, 'corp', 1, 0), L(19), 'THE QUARTZ CORP', (RIGHT + 90, 450), rot=1.5)
ransom(cw(13, 'two', 1, -2), L(15), '2', size=220, seed=4)
tag(cw(13, 'companies', 1, 0), L(15), 'MINERS', (LEFT, 560), rot=1)
piece(cw(15, 'hurricane', 1, -4), L(19), 'storm', draw_storm, (960 + 340, 300), screen=False, spin=True, scale=0.8)
add('arrow', cw(15, 'helene', 1, 0), L(19), a=('xy', 1180, 380), b=('sprucepine', 30, -20), bend=0.3, dur=12)
tag(cw(15, 'september', 1, -2), L(17), 'HELENE · 27 SEPT 2024', (LEFT, 330), rot=-1.2, size=48)
for w, (dx, dy) in (('roads', (-330, 90)), ('railways', (-110, 230)), ('power', (170, 230))):
    add('inkx', cw(15, w, 1, 0), L(17), pin=('sprucepine', dx, dy), r=40)
    tag(cw(15, w, 1, 4), L(17), {'roads': 'ROADS', 'railways': 'RAIL', 'power': 'POWER'}[w], None, rot=-1.5, pin=('sprucepine', dx, dy + 80))
add('inkx', cw(15, 'shut', 1, -2), L(17), xy=(RIGHT - 160, 760), r=80)
add('inkx', cw(15, 'shut', 1, 2), L(17), xy=(RIGHT + 130, 600), r=80)
note(cw(16, 'watching', 1, -2), L(17), 'all eyes on one valley', xy=(960, 960))
ransom(cw(17, 'two', 1, -2), L(18), '2 WEEKS', size=130, seed=6)
tag(cw(17, 'restarted', 1, -2), L(18), 'SIBELCO RESTARTS', (LEFT, 550), rot=1)
tag(cw(17, 'longer', 1, -4), L(18), 'QUARTZ CORP: LONGER', (LEFT, 615), rot=-1, size=44)
piece(cw(19, 'deposits', 1, -2), L(20), 'quartz', draw_quartz, (RIGHT, 520), rot=-3, scale=1.1)
tag(cw(19, 'spruce', 1, -2), L(20), 'SPRUCE PINE', (RIGHT, 720), rot=1)
for i, (w, x) in enumerate((('brazil', RIGHT - 300), ('russia', RIGHT), ('china', RIGHT + 300))):
    piece(cw(19, w, 1, -2), L(20), 'quartz', draw_quartz, (x, 880), rot=(-4, 3, -2)[i], scale=0.38)
    tag(cw(19, w, 1, 2), L(20), w.upper(), (x, 990), rot=(-2, 1.5, -1)[i], size=44)
tag(cw(19, 'synthetically', 1, -2), L(20), '+ SYNTHETIC QUARTZ', (LEFT, 330), rot=1)
note(cw(19, 'nothing', 1, 0), L(20), 'not at scale... yet', xy=(LEFT, 620))
add('wafer', cw(20, 'blank', 1, -2), E1, xy=(LEFT, 640), rot=8)
tag(cw(20, 'blank', 1, 2), E1, 'A BLANK', (LEFT, 860), rot=-1.5)
add('flash', cw(20, 'light', 1, -2), E1, xy=(RIGHT, 600))

# ------------------------------------------------------------------ FIG. 02 THE GAS (Black Sea)
E2 = f_nl
add('card', A_BS - 6, E2, fig='FIG. 02', lines=['The Gas'])
add('machine', cw(22, 'machine', 1, -2), L(27), xy=(RIGHT - 60, 780), rot=-2, width=520)
piece(cw(22, 'stencil', 1, -4), L(25), 'reticle', draw_reticle, (LEFT, 600), rot=-5, screen=False, scale=0.9)
tag(cw(22, 'stencil', 1, 0), L(25), 'STENCIL (PHOTOMASK)', (LEFT, 820), rot=1.5)
note(cw(22, 'photograph', 1, -4), L(23), 'like a photograph', xy=(960, 960))
piece(cw(23, 'lasers', 1, -2), L(27), 'cyl', draw_cylinder, (RIGHT + 310, 640), rot=4)
piece(cw(23, 'lasers', 1, 2), L(27), 'beam', G.draw_beam, (RIGHT + 130, 760), rot=-20, screen=False, quiet=True)
tag(cw(23, 'neon', 1, -2), L(27), 'MOSTLY NEON', (RIGHT + 310, 900), rot=2)
ransom(cw(25, 'half', 1, -2), L(27), 'HALF', size=180, seed=3)
tag(cw(25, 'chip-grade', 1, 0), L(27), 'OF CHIP-GRADE NEON', (LEFT, 550), rot=1)
tag(cw(25, 'ukraine', 1, 0), L(27), 'FROM UKRAINE', (LEFT, 615), rot=-1)
piece(cw(27, 'steel', 1, -2), L(28), 'steelmill', draw_steelmill, (RIGHT, 720), rot=-2)
tag(cw(27, 'air-separation', 1, -2), L(28), 'AIR-SEPARATION PLANT', (RIGHT, 950), rot=1.5)
tag(cw(27, 'soviet', 1, -2), L(28), 'SOVIET STEEL MILLS', (LEFT, 330), rot=-1, size=50)
note(cw(27, 'captured', 1, -2), L(28), 'neon: a by-product', xy=(LEFT, 620))
add('dot', cw(28, 'odesa', 1, -2), END, pin=('odesa', 0, 0), top=True)
add('dot', cw(28, 'mariupol', 1, -2), END, pin=('mariupol', 0, 0), top=True)
piece(cw(28, 'odesa', 1, -2), L(32), 'factory', draw_factory, None, rot=-3, scale=0.75, pin=('odesa', -40, -110))
tag(cw(28, 'odesa', 1, 2), L(32), 'ODESA', None, rot=-1.5, pin=('odesa', -40, 50))
piece(cw(28, 'mariupol', 1, -2), L(32), 'factory', draw_factory, None, rot=3, scale=0.75, pin=('mariupol', -20, -120))
tag(cw(28, 'mariupol', 1, 2), L(32), 'MARIUPOL', None, rot=1.5, pin=('mariupol', -20, 40))
add('circle', cw(29, 'besieged', 1, -2), L(32), pin=('mariupol', -20, -80), rx=170, ry=150, dur=12, top=True)
note(cw(29, 'besieged', 1, 2), L(31), 'under siege', xy=(LEFT, 620))
add('arrow', cw(30, 'russia', 1, -2), L(32), a=('xy', 1840, 300), b=('mariupol', 70, -150), bend=0.2, dur=12)
tag(cw(30, 'february', 1, -2), L(32), 'FEB 2022', (LEFT, 330), rot=1, size=56)
add('inkx', cw(30, 'both', 1, 0), L(32), pin=('odesa', -40, -110), r=70)
add('inkx', cw(30, 'stopped', 1, -2), L(32), pin=('mariupol', -20, -120), r=70)
add('circle', cw(32, 'crimea', 1, -2), L(33), pin=('crimea', 0, -10), rx=190, ry=120, dur=12, top=True)
ransom(cw(32, 'six', 1, -2), L(33), '600%', size=200, seed=4)
tag(cw(32, 'crimea', 1, 2), L(33), 'CRIMEA · 2014', (LEFT, 550), rot=1)
ransom(cw(33, 'third', 1, -4), L(35), 'UNDER 1/3', size=110, seed=5)
tag(cw(33, 'reliance', 1, -2), L(35), 'NEON FROM RUSSIA + UKRAINE', (LEFT, 550), rot=-1, size=44)
for i, (w, x) in enumerate((('china', RIGHT - 160), ("korea's", RIGHT + 200))):
    piece(cw(34, w, 1, -2), L(36), 'cyl', draw_cylinder, (x, 640), rot=(-4, 4)[i], scale=0.65)
    tag(cw(34, w, 1, 2), L(36), ('CHINA', 'KOREA')[i], (x, 820), rot=(-1.5, 1.5)[i], size=48)
add('arrow', cw(34, 'recycle', 1, -2), L(36), a=('xy', RIGHT - 120, 960), b=('xy', RIGHT + 170, 960), bend=0.45, dur=10)
add('arrow', cw(34, 'again', 1, -2), L(36), a=('xy', RIGHT + 170, 975), b=('xy', RIGHT - 120, 975), bend=0.45, dur=10)
tag(cw(34, 'recycle', 1, 2), L(36), 'RECYCLED', (RIGHT + 20, 1035), rot=-1, size=44)
ransom(cw(35, 'five', 1, -2), L(36), '500%', size=190, seed=6)
tag(cw(35, 'supplier', 1, 0), L(36), 'ONE SUPPLIER, 2022', (LEFT, 550), rot=1)
note(cw(35, 'single', 1, -2), L(36), 'no fab stopped', xy=(LEFT, 640))
tag(cw(36, 'smallest', 1, -2), E2, 'THE SMALLEST CIRCUITS', (LEFT, 330), rot=-1, size=48)
add('flash', cw(36, 'light', 1, -2), E2, xy=(LEFT, 600))
add('machine', cw(36, 'machine', 1, -2), E2, xy=(RIGHT, 760), rot=-2, width=520)

# ------------------------------------------------------------------ FIG. 03 THE MACHINE (Veldhoven; Zeiss in Germany)
E3 = f_cam
add('card', A_NL - 6, E3, fig='FIG. 03', lines=['The Machine'])
add('dot', cw(37, 'veldhoven', 1, -2), END, pin=('veldhoven', 0, 0), top=True)
add('machine', A_NL - 6, f_de, xy=(RIGHT, 800), rot=-2, width=600)
tag(cw(37, 'veldhoven', 1, 0), f_de, 'ASML · VELDHOVEN', (RIGHT, 1020), rot=1.5, size=50)
ransom(cw(37, 'no', 1, -2), L(39), 'ONLY ONE', size=110, seed=2)
add('tin', cw(39, 'tin', 1, -4), f_de, xy=(LEFT, 680))
add('beam', cw(39, 'laser', 1, -2), f_de, xy=(LEFT - 221, 680 - 235 + 385))
add('flash', cw(39, 'plasma', 1, -4), f_de, xy=(LEFT, 680 - 235 + 385), big_at=cw(41, 'flash', 1, 0))
tag(cw(39, 'flatten', 1, -2), L(40), 'PULSE 1 · FLATTEN', (800, 560), rot=-1.5, size=44)
tag(cw(39, 'plasma', 1, -2), L(40), 'PULSE 2 · PLASMA', (800, 640), rot=1.5, size=44)
tag(cw(39, 'hair', 1, -2), L(40), 'SMALLER THAN A HAIR', (LEFT, 330), rot=1, size=46)
ransom(cw(40, 'fifty', 1, -2), L(41), '50,000', size=140, seed=2)
tag(cw(40, 'second', 1, -4), L(41), 'SHOTS A SECOND', (LEFT, 535), rot=-1, size=48)
piece(cw(41, 'sun', 1, -4), f_de, 'sun', G.draw_sun, (800, 330), rot=-4, screen=False, scale=0.8)
tag(cw(41, 'hotter', 1, 0), f_de, 'HOTTER THAN THE SUN', (LEFT, 330), rot=1, size=46)
tag(cw(41, 'ultraviolet', 1, -2), f_de, 'EXTREME ULTRAVIOLET', (LEFT, 400), rot=-1, size=44)
add('mirror', cw(43, 'mirrors', 1, 2), f_nl2, xy=(RIGHT, 680), rot=-5)
tag(cw(43, 'zeiss', 1, 0), f_nl2, 'ZEISS · GERMANY', (RIGHT, 900), rot=-1.2, size=50)
add('dot', cw(43, 'bump', 1, -2), f_nl2, pin=('bump', 0, 0), top=True)
add('circle', cw(43, 'bump', 1, 0), f_nl2, pin=('bump', 0, 0), rx=44, ry=36, dur=10, top=True)
note(cw(43, 'bump', 1, 2), L(44), 'biggest bump', xy=(LEFT, 640))
ransom(cw(43, 'tenth', 1, -2), L(44), '0.1 MM', size=150, seed=6)
tag(cw(43, 'size', 1, 0), L(44), 'MIRROR THE SIZE OF GERMANY', (LEFT, 550), rot=1, size=44)
add('wafer', cw(44, 'circuits', 1, -2), f_nl2, xy=(LEFT, 640), rot=8)
ransom(cw(44, 'thinner', 1, -2), f_nl2, 'THINNER', size=120, seed=9)
tag(cw(44, 'thousands', 1, 0), f_nl2, 'THOUSANDS OF TIMES', (LEFT, 550), rot=-1, size=46)
note(cw(44, 'hair', 1, -2), f_nl2, 'than a hair', xy=(960, 960))
for i, (w, xy, ang) in enumerate((('forty', (RIGHT - 200, 650), -30), ('containers', (RIGHT + 160, 700), 0), ('twenty', (RIGHT - 20, 870), 30))):
    add('splash', cw(46, w, 1, 0), L(49), xy=(xy[0], xy[1] + 40), seed=i)
    add('container', cw(46, w, 1, 0), L(49), xy=xy, ang=ang, width=280, rot=(-3, 2, -1)[i])
ransom(cw(46, 'forty', 1, -2), cw(46, 'newest', 1, -2), '40', size=200, seed=5)
tag(cw(46, 'containers', 1, 0), cw(46, 'newest', 1, -2), 'SHIPPING CONTAINERS', (LEFT, 550), rot=-1)
tag(cw(46, 'trucks', 1, -2), cw(46, 'newest', 1, -2), '+ 20 TRUCKS · 3 JETS', (LEFT, 615), rot=1)
ransom(cw(46, 'four', 1, -4), L(47), '$400M', size=150, seed=7)
tag(cw(46, 'newest', 1, 0), L(47), 'NEWEST VERSION, ROUGHLY', (LEFT, 550), rot=-1)
ransom(cw(47, 'forty-eight', 1, -2), L(49), '48', size=210, seed=8)
tag(cw(47, 'shipped', 1, -2), L(49), 'SHIPPED IN 2025', (LEFT, 550), rot=1)
ransom(cw(49, 'half', 1, -2), L(51), 'OVER HALF', size=120, seed=3)
tag(cw(49, 'tsmc', 1, -2), L(51), 'RUN BY TSMC, TAIWAN', (LEFT, 550), rot=-1)
add('dasharc2', cw(49, 'taiwan', 1, -2), L(51), a=('veldhoven', 0, 0), b=('xy', 1880, 760), bend=-0.12, dur=14)
add('chip', cw(49, "nvidia's", 1, -2), L(51), xy=(RIGHT - 300, 720), rot=6, scale=0.75)
tag(cw(49, "nvidia's", 1, 2), L(51), 'NVIDIA AI CHIPS', (RIGHT - 300, 900), rot=-1.5, size=44)
add('phone', cw(49, "apple's", 1, -2), L(51), xy=(RIGHT + 180, 700), rot=6, scale=0.65)
tag(cw(49, 'iphone', 1, 0), L(51), 'IPHONES', (RIGHT + 180, 980), rot=1.5, size=44)
add('crate', cw(51, 'never', 1, -2), L(53), xy=(RIGHT, 640), rot=-3)
add('inkx', cw(51, 'received', 1, 0), L(53), xy=(RIGHT, 640), r=80)
tag(cw(51, 'received', 1, 2), L(53), 'CHINA: NEVER SHIPPED', (RIGHT, 830), rot=1.5)
add('doc', cw(51, 'nineteen', 1, -2), L(53), xy=(LEFT, 640), rot=-6, scale=0.85)
add('inkx', cw(51, 'lapse', 1, -2), L(53), xy=(LEFT, 640), r=90)
tag(cw(51, 'lapse', 1, 2), L(53), '2019 · LICENCE LAPSED', (LEFT, 330), rot=-1.5, size=48)
note(cw(52, 'older', 1, -2), L(53), 'older machines', xy=(960, 960))
tag(cw(52, 'layer', 1, -2), L(53), 'SAME LAYER, MANY TIMES', (LEFT, 400), rot=1, size=44)
piece(cw(53, 'blueprint', 1, -4), E3, 'blueprint', draw_blueprint, (RIGHT, 640), rot=-3, screen=False, scale=0.9)
tag(cw(53, 'somewhere', 1, -2), E3, 'THE BLUEPRINT', (RIGHT, 880), rot=1.5)

# ------------------------------------------------------------------ FIG. 04 THE BLUEPRINT (Cambridge)
E4 = f_tw
add('card', A_CAM - 6, E4, fig='FIG. 04', lines=['The Blueprint'])
add('dot', cw(56, 'cambridge', 1, -2), END, pin=('cambridge', 0, 0), top=True)
add('phone', cw(54, 'phone', 1, -2), L(56), xy=(RIGHT, 640), rot=6, scale=0.9)
note(cw(54, 'never', 1, -2), L(56), 'never made a chip', xy=(960, 960))
piece(cw(56, 'blueprints', 1, -4), L(59), 'blueprint', draw_blueprint, (RIGHT, 620), rot=-3, screen=False)
add('circle', cw(56, 'cambridge', 1, 2), L(57), pin=('cambridge', 0, 0), rx=70, ry=56, dur=10, top=True)
tag(cw(56, 'cambridge', 1, 4), L(59), 'ARM · CAMBRIDGE', None, rot=1.5, pin=('cambridge', 0, -100))
for i, w in enumerate(('apple', 'qualcomm', 'samsung')):
    tag(cw(56, w, 1, -2), L(57), w.upper(), (LEFT - 120 + i * 120, 330 + i * 75), rot=(-2, 1.5, -1)[i], size=50)
for i, x in enumerate((RIGHT - 220, RIGHT, RIGHT + 220)):
    piece(cw(56, 'fee', 1, -2) + 3 * i, L(57), 'coin', draw_coin, (x, 930), screen=False)
tag(cw(56, 'every', 1, -2), L(57), 'A FEE ON EVERY CHIP', (LEFT, 600), rot=1)
ransom(cw(57, 'ninety-nine', 1, -2), cw(57, 'more', 1, -2), '99%', size=210, seed=3)
tag(cw(57, 'smartphones', 1, -4), cw(57, 'more', 1, -2), 'OF SMARTPHONES', (LEFT, 560), rot=1, size=50)
ransom(cw(57, 'three', 1, -2), L(59), '300 BN', size=150, seed=6)
tag(cw(57, 'shipped', 1, -4), L(59), 'ARM-BASED CHIPS SHIPPED', (LEFT, 550), rot=-1, size=44)
ransom(cw(59, 'nineteen', 1, -2), L(61), '1990', size=180, seed=4)
for i, (w, x, y) in enumerate((('acorn', RIGHT - 260, 380), ('apple', RIGHT, 330), ('vlsi', RIGHT + 260, 380))):
    tag(cw(59, w, 1, -2), L(61), w.upper(), (x, y), rot=(-2, 1.5, -1)[i], size=52)
for i in range(3):
    add('chain', cw(59, 'teamed', 1, 0) + 3 * i, L(61), a=('xy', RIGHT - 260 + 260 * i, 420 if i != 1 else 370), b=('xy', RIGHT, 560), dur=8)
for k in range(12):
    x, y = RIGHT - 330 + (k % 6) * 132, 680 + (k // 6) * 190
    add('engineer', cw(59, 'twelve', 1, -2) + k, L(61), xy=(x, y), rot=(-4, 3, -2, 4, -3, 2)[k % 6], scale=0.42)
tag(cw(59, 'engineers', 1, 0), L(61), '12 ENGINEERS', (LEFT, 560), rot=1, size=54)
note(cw(61, 'fought-over', 1, -2), L(62), 'fought over', xy=(960, 960))
piece(cw(62, 'softbank', 1, -4), L(65), 'blueprint', draw_blueprint, (RIGHT, 620), rot=-3, screen=False)
ransom(cw(62, 'twenty-four', 1, -4), L(63), '£24 BN', size=150, seed=4)
tag(cw(62, 'softbank', 1, 0), L(63), 'SOFTBANK · 2016', (LEFT, 550), rot=-1, size=50)
ransom(cw(63, 'forty', 1, -4), L(66), '$40 BN', size=150, seed=5)
tag(cw(63, 'nvidia', 1, 0), L(66), 'NVIDIA OFFERS · 2020', (LEFT, 550), rot=1, size=48)
piece(cw(65, 'regulators', 1, -2), L(66), 'gavel', draw_gavel, (RIGHT + 250, 760), rot=-6, scale=0.8)
for i, w in enumerate(('america', 'britain', 'europe')):
    tag(cw(65, w, 1, -2), L(66), w.upper(), (RIGHT - 300 + i * 40, 840 + i * 70), rot=(-2, 1.5, -1)[i], size=48)
add('doc', cw(65, 'deal', 1, -2), L(67), xy=(RIGHT, 560), rot=-5, scale=0.8, title='OFFER')
add('inkx', cw(65, 'collapsed', 1, -2), L(67), xy=(RIGHT, 560), r=100)
tag(cw(65, 'february', 1, -2), L(66), 'DEAD · FEB 2022', (LEFT, 580), rot=-1, size=50)
ransom(cw(66, 'one-and-a-quarter-billion-dollar', 1, -4), L(67), '$1.25 BN', size=140, seed=6)
tag(cw(66, 'down', 1, -2), L(67), 'DOWN PAYMENT, KEPT', (LEFT, 550), rot=1)
ransom(cw(67, 'fifty-four', 1, -4), L(68), '$54 BN', size=150, seed=7)
tag(cw(67, 'public', 1, -2), L(68), 'NASDAQ IPO · SEPT 2023', (LEFT, 550), rot=-1, size=46)
piece(cw(67, 'public', 1, -2), L(70), 'blueprint', draw_blueprint, (RIGHT, 620), rot=-3, screen=False)
ransom(cw(68, 'three', 1, -4), L(69), 'UP TO 300%', size=110, seed=8)
tag(cw(68, 'raise', 1, -2), L(69), 'PLANNED PRICE RISE', (LEFT, 550), rot=1)
tag(cw(68, 'reports', 1, -2), L(69), 'REUTERS, 2025', (LEFT, 615), rot=-1, size=44)
piece(cw(70, 'keys', 1, -4), E4, 'key', draw_key, (RIGHT, 860), rot=-8)
for i, w in enumerate(('blueprint', 'light', 'machine', 'crystal')):
    tag(cw(70, w, 1, -2), E4, w.upper(), (LEFT, 330 + i * 75), rot=(-2, 1.5, -1, 2)[i], size=50)
note(cw(70, 'island', 1, -4), E4, 'one island', xy=(960, 960))

# ------------------------------------------------------------------ FIG. 05 THE ISLAND (Taiwan)
E5 = f_out
add('card', A_TW - 6, E5, fig='FIG. 05', lines=['The Island'])
add('dot', cw(73, 'hsinchu', 1, -2), END, pin=('hsinchu', 0, 0), top=True)
ransom(cw(71, 'ninety', 1, -2), L(73), '90%', size=210, seed=2)
tag(cw(71, 'advanced', 1, -2), L(73), 'MOST ADVANCED CHIPS', (LEFT, 550), rot=1)
add('chip', cw(71, 'chips', 1, -2), L(73), xy=(RIGHT + 80, 760), rot=6, scale=0.8)
add('circle', cw(73, 'hsinchu', 1, 0), L(75), pin=('hsinchu', 0, 0), rx=60, ry=50, dur=10, top=True)
tag(cw(73, 'tsmc', 1, -2), L(75), 'TSMC · HSINCHU', None, rot=1.5, size=52, pin=('hsinchu', 330, -30))
ransom(cw(75, 'nineteen', 1, -2), L(77), '1987', size=180, seed=4)
tag(cw(75, 'chang', 1, 0), L(77), 'MORRIS CHANG', (LEFT, 550), rot=-1, size=50)
tag(cw(76, 'back', 1, -2), L(77), 'BEFORE: DESIGN + BUILD', (RIGHT, 330), rot=1, size=46)
piece(cw(76, 'design', 1, -2), L(77), 'blueprint', draw_blueprint, (RIGHT - 300, 640), rot=-4, screen=False, scale=0.6)
tag(cw(76, 'design', 1, 2), L(77), 'DESIGNERS', (RIGHT - 300, 820), rot=-1.5, size=46)
piece(cw(76, 'factory', 1, -2), L(77), 'fab', draw_fab, (RIGHT + 140, 640), rot=2, scale=0.6)
tag(cw(76, 'factory', 1, 2), L(77), 'TSMC BUILDS', (RIGHT + 140, 820), rot=1.5, size=46)
add('arrow', cw(76, 'skip', 1, -2), L(77), a=('xy', RIGHT - 170, 640), b=('xy', RIGHT + 10, 640), bend=0.15, dur=8)
note(cw(76, 'idea', 1, 0), L(76, 60), 'a factory for others', xy=(960, 960))
for i, w in enumerate(('apple', 'nvidia', 'amd', 'qualcomm')):
    tag(cw(77, w, 1, -2), L(78), w.upper(), (LEFT - 90 + (i % 2) * 220, 330 + i * 75), rot=(-2, 1.5, -1, 2)[i], size=50)
add('circle', cw(77, 'biggest', 1, -2), L(78), xy=(LEFT + 130, 405), rx=170, ry=46, dur=10, top=True)
tag(cw(77, 'since', 1, -2), L(78), 'NO. 1 SINCE 2025', (LEFT, 680), rot=-1, size=46)
ransom(cw(78, 'seventy', 1, -2), L(80), '~70%', size=190, seed=5)
tag(cw(78, 'money', 1, -2), L(80), 'OF FOUNDRY REVENUE', (LEFT, 550), rot=1)
add('arrow', cw(80, 'strait', 1, -2), L(82), a=('pingtan', 6, 6), b=('twcoast', -6, -2), bend=0.0, dur=10)
add('arrow', cw(80, 'strait', 1, 6), L(82), a=('twcoast', -6, -2), b=('pingtan', 6, 6), bend=0.0, dur=10)
ransom(cw(80, 'thirty', 1, -2), L(81), '130-160 KM', size=96, seed=6)
tag(cw(80, 'less', 1, -2), L(81), 'LESS THAN 100 MILES', (LEFT, 550), rot=-1)
piece(cw(81, 'silicon', 1, -4), L(83), 'shield', draw_shield, (RIGHT + 60, 640), rot=-4, screen=False)
tag(cw(81, 'shield', 1, 0), L(83), 'SILICON SHIELD', (RIGHT + 60, 900), rot=-1, size=54)
ransom(cw(83, 'pledged', 1, -2), L(85), '$165 BN', size=150, seed=5)
tag(cw(83, 'arizona', 1, -2), L(85), 'PLEDGED FOR ARIZONA', (LEFT, 550), rot=1)
piece(cw(83, 'factories', 1, -2), E5, 'fab', draw_fab, (RIGHT, 640), rot=-2)
tag(cw(84, 'four-nanometre', 1, -2), E5, 'ARIZONA: 4 NM · LATE 2024', (RIGHT, 860), rot=-1.5, size=46)
ransom(cw(85, 'two-nanometre', 1, -2), E5, '2 NM', size=200, seed=3)
tag(cw(85, 'taiwan', 1, 0), E5, 'TAIWAN · MASS PRODUCTION', (LEFT, 550), rot=1, size=46)
note(cw(85, 'island', 1, -4), E5, 'still one island', xy=(960, 960))

# ------------------------------------------------------------------ OUTRO: wide world, the five pins chained, 5 WEAK LINKS
OUTW = ['quartz', 'gas', 'machine', 'blueprint', 'island']
for i, ((p, name, (dx, dy)), w) in enumerate(zip(PINS, OUTW)):
    f = max(A_OUT - 10, cw(86, w, 1, -2))
    add('circle', f, END, pin=(p, 0, 0), rx=34, ry=30, dur=8, top=True)
    tag(f + 2, END, name, None, size=44, rot=(-2, 1.5, -1, 2, -1.5)[i], pin=(p, dx, dy))
    if i: add('dasharc2', f, END, a=(PINS[i - 1][0], 0, 0), b=(p, 0, 0), bend=0.12, dur=14)
ransom(cw(87, 'five', 1, -2), END, '5 WEAK LINKS', y=145, size=96, x=960, seed=2)
note(cw(88, 'fighting', 1, -2), L(89), 'the fight is on', xy=(960, 960))
add('sheet', L(89, 4), END, xy=(960, 955), text='Which link breaks first?')

G.finish(WORLD, MOVES, LABELS, PAINT)

def chapters():
    """chapter start times (s) from the real render timeline: cold open at 0, each FIG. at its flight start, outro at its flight start."""
    marks = [('Cold open: five places', 0.0), ('01 The Quartz: Spruce Pine, USA', f_sp / FPS), ('02 The Gas: Ukraine', f_bs / FPS),
             ('03 The Machine: Veldhoven, Netherlands', f_nl / FPS), ('04 The Blueprint: Cambridge, UK', f_cam / FPS),
             ('05 The Island: Taiwan', f_tw / FPS), ('Five weak links', f_out / FPS)]
    return marks

if __name__ == '__main__':
    if sys.argv[1] == 'chapters':
        for n, t in chapters(): print(f'{int(t // 60)}:{int(t % 60):02d} {n}')
        print('total', round(G.NFR / FPS, 1))
    else:
        G.main()
