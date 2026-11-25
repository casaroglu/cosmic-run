#!/usr/bin/env python3
"""Chip Wars 03 "The Machine Only One Company Can Build": vertical Short (v2 pilot, approved) on the shared engine (../_shorts/engine.py).
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, PLACES, TIN_HIT
G.init(HERE, '~/cosmic-run/videos/out/chipwar/03-asml')
PLACES.update({'bump': (10.45, 51.25), 'beijing': (116.40, 39.90), 'hsinchu': (120.97, 24.80)})

# ------------------------------------------------------------------ camera (keyframes are FOCUS points: lon, lat, ppd)
NLF, DEF, MIDF, TWF, CNF, WIDEF = (5.6, 52.0, 190), (10.4, 51.0, 85), (62, 40, 18), (120.0, 24.0, 150), (115.5, 33.0, 42), (57.8, 16, 11)
MOVES = [  # (start, length, target focus)
    (cue('mirrors', 1, -6), 22, DEF),
    (cue('so', 2, -8), 18, MIDF),
    (cue('so', 2, 10), 22, TWF),
    (cue('and', 2, -6), 22, CNF),
    (cue('whole', 1, -8), 22, WIDEF),
    (cue('none', 2, -14), 22, NLF),
]
# ------------------------------------------------------------------ labels by zoom band (big: >= 44 px for the names that matter)
LABELS = [  # text, lon, lat, size, italic, ppd_min, ppd_max
    ('GERMANY', 9.3, 50.4, 44, False, 120, 999), ('North Sea', 3.6, 54.3, 46, True, 120, 999),
    ('TAIWAN', 121.0, 22.9, 44, False, 120, 999), ('CHINA', 118.3, 26.7, 44, False, 120, 999),
    ('GERMANY', 12.6, 52.9, 46, False, 70, 120), ('FRANCE', 3.6, 47.2, 44, False, 70, 120), ('North Sea', 4.3, 55.6, 44, True, 70, 120),
    ('CHINA', 106.0, 37.5, 48, False, 30, 70), ('South China Sea', 113.5, 16.6, 40, True, 30, 70),
    ('RUSSIA', 85, 61, 48, False, 0, 30), ('CHINA', 100, 34, 46, False, 0, 30), ('INDIA', 78, 21, 44, False, 0, 30), ('EUROPE', 18, 48.5, 44, False, 0, 30),
]
PAINT = {'NLD': (0, 10 ** 6), 'DEU': (cue('germany', 1), cue('so', 2, -8) + 18), 'TWN': (cue('taiwan'), cue('none', 2, -14))}   # (on, off): the loop's last frame matches the first

# ------------------------------------------------------------------ elements
END = G.END; NFR = G.NFR
M = {i: s for i, (s, n, t) in enumerate(MOVES)}; MEND = {i: s + n for i, (s, n, t) in enumerate(MOVES)}
MACH = (490, 1262)

def hook_group(f0, f1, text_f1=None):
    """the stakes: a phone and an AI chip, chained to the one machine, under a huge ONE MACHINE."""
    t1 = text_f1 or f1
    add('machine', f0, f1, xy=MACH, rot=-2, width=560)
    add('phone', f0 + 4, f1, xy=(215, 690), rot=-6, scale=0.85)
    add('chip', f0 + 10, f1, xy=(775, 680), rot=5, scale=0.85)
    add('chain', f0 + 14, f1, a=('xy', 255, 985), b=('xy', 400, 1110), dur=10)
    add('chain', f0 + 18, f1, a=('xy', 735, 910), b=('xy', 620, 1110), dur=10)
    add('ransom', f0 + 4, t1, text='ONE', xy=(490, 195), size=170, seed=2)
    add('ransom', f0 + 14, t1, text='MACHINE', xy=(490, 370), size=108, seed=5)
hook_group(0, cue('only', 1, -2), cue('only', 1, -2))
add('tag', cue('chatgpt', 1, 0), cue('one', 2, -2), text='CHATGPT', xy=(775, 870), rot=2, size=46)
add('tag', cue('iphones', 1, 0), cue('one', 2, -2), text='IPHONES', xy=(215, 945), rot=-2, size=46)
add('crack', cue('broke', 1, -2), cue('only', 1, -2), xy=MACH)
add('inkx', cue('chips', 1, -2), cue('only', 1, -2), xy=(775, 680), r=100)
add('inkx', cue('iphones', 2, -2), cue('only', 1, -2), xy=(215, 690), r=100)
# ASML, Veldhoven
add('card', cue('only'), cue('why', 1, -2), fig='FIG. 01', lines=['Only One', 'Builds It'])
add('machine', cue('only', 1, -2), M[0], xy=MACH, rot=-2, width=560)
add('ransom', cue('one', 3, 0), cue('why', 1, -2), text='1', xy=(800, 560), size=220, seed=2)
add('tag', cue('asml', 1, 0), M[0], text='ASML', xy=(490, 1488), rot=1.5, size=52)
add('arrow', cue('called', 1, 0), cue('why', 1, -2), a=('xy', 520, 1020), b=('veldhoven', 8, 10), bend=0.3, dur=10)
add('note', cue('veldhoven', 1, 2), cue('why', 1, -2), text='veldhoven', size=94, xy=(300, 505), rot=-3)
# why nobody else: tin + laser, the Sun, thinner than a hair
add('card', cue('why'), cue('laser', 1, -2), fig='FIG. 02', lines=['Why Nobody', 'Else Can'])
def tin_group(f0, f_laser, f1, big_at=None):
    add('tin', f0, f1, xy=(650, 760))
    add('beam', f_laser, f1, xy=(650 - 150 + TIN_HIT[0] - 221, 760 - 235 + TIN_HIT[1]))
    add('flash', f_laser + 2, f1, xy=(650 - 150 + TIN_HIT[0], 760 - 235 + TIN_HIT[1]), big_at=big_at)
tin_group(cue('because', 1, -2), cue('laser', 1, -2), M[0], big_at=cue('flash'))
add('ransom', cue('fifty', 1, -2), cue('that', 1, -2), text='50,000', xy=(490, 250), size=150, seed=2)
add('tag', cue('times', 1, 0), cue('each', 1, -2), text='SHOTS A SECOND', xy=(490, 400), size=48, rot=-1)
add('sun', cue('sun', 1, -4), M[0], xy=(225, 560), rot=-4)
add('tag', cue('hotter', 1, 0), cue('that', 1, -2), text='HOTTER THAN THE SUN', xy=(490, 400), size=46, rot=1.2)
add('wafer', cue('circuits', 1, -2), M[0], xy=(240, 1000), rot=8)
add('ransom', cue('thinner', 1, -2), M[0], text='THINNER', xy=(490, 250), size=120, seed=9)
add('tag', cue('thousands', 1, 0), M[0], text='THOUSANDS OF TIMES', xy=(490, 400), size=48, rot=-1.2)
add('note', cue('hair', 1, -2), M[0], text='than a hair!', size=96, xy=(490, 1470), rot=-2)
# the mirror, Germany
add('card', cue('mirrors', 1, 8), M[1] + 4, fig='FIG. 03', lines=['The Mirror'])
add('mirror', cue('mirrors', 1, 8), M[1], xy=(675, 1160), rot=-5)
add('arrow', cue('smooth', 1, 0), M[1], a=('xy', 610, 1050), b=('oberkochen', 6, 8), bend=-0.3, dur=10)
add('tag', cue('smooth', 1, 4), M[1], text='ZEISS · GERMANY', xy=(490, 1400), rot=-1.2, size=50)
add('tag', cue('size', 1, 0), M[1], text='GERMANY-SIZED', xy=(490, 545), rot=1, size=48)
add('dot', cue('bump', 1, -2), M[1], pin=('bump', 0, 0))
add('circle', cue('bump', 1, 0), M[1], pin=('bump', 0, 0), rx=40, ry=34, dur=10)
add('note', cue('bump', 1, 2), M[1], text='biggest bump', size=92, xy=(330, 680), rot=-3)
add('ransom', cue('tenth', 1, -2), M[1], text='0.1 MM', xy=(490, 380), size=140, seed=6)
# Taiwan: TSMC, Nvidia's AI chips
add('dasharc', M[1], M[3], a=('veldhoven', 0, 0), b=('flyer',), bend=0.08)
add('flyer', M[1], M[3], fa=M[1], fb=MEND[2])
add('card', MEND[2] - 6, M[3] + 4, fig='FIG. 04', lines=['Taiwan'])
add('ransom', max(cue('half', 1, -2), MEND[2] - 2), M[3], text='56%', xy=(490, 380), size=200, seed=3)
add('tag', max(cue('half', 1, 8), MEND[2] + 8), M[3], text='OF ALL EUV MACHINES', xy=(490, 545), rot=-1, size=46)
add('tag', cue('tsmc', 1, 0), M[3], text='TSMC', pin=('hsinchu', -250, -40), rot=1.5, size=60)
add('chip', cue("nvidia's", 1, -2), M[3], xy=(790, 1080), rot=5, scale=0.8)
add('tag', cue("nvidia's", 1, 2), M[3], text='NVIDIA AI CHIPS', xy=(490, 1400), rot=-1.5, size=48)
# China, never: older machines; the whole race runs through one Dutch town
add('card', cue('china', 1, 0), M[4], fig='FIG. 05', lines=['China'])
add('crate', cue('not', 1, -2), M[4], pin=('beijing', 0, -60), rot=-3)
add('inkx', cue('one', 5, 0), M[4], pin=('beijing', 0, -60), r=44)
add('tag', cue('one', 5, 4), M[4], text='NEVER SHIPPED', pin=('beijing', 0, 56), rot=1.5, size=46)
add('doc', cue('nineteen', 1, -2), M[4], xy=(290, 1040), rot=-6, scale=0.75)
add('inkx', cue('lapse', 1, 0), M[4], xy=(290, 1040), r=50)
add('tag', cue('lapse', 1, 4), M[4], text='2019 · LAPSED', xy=(300, 1250), rot=-1.5, size=48)
add('note', cue('older', 1, -2), M[4], text='older machines', size=92, xy=(490, 1450), rot=-2)
add('dasharc2', MEND[4] - 4, M[5], a=('veldhoven', 0, 0), b=('hsinchu', 0, 0), bend=0.14, dur=14)
add('circle', MEND[4] - 2, M[5], pin=('veldhoven', 0, 0), rx=70, ry=60, dur=12)
add('ransom', cue('one', 6, -2), M[5], text='ONE', xy=(490, 1170), size=170, seed=4)
add('ransom', cue('dutch', 3, -2), M[5], text='DUTCH TOWN', xy=(490, 1350), size=86, seed=8)
# the loop: back to the hook
hook_group(MEND[5] - 8, END)
add('tag', NFR - 30, END, text='TSMC RUNS 56%', xy=(490, 1415), rot=-1, size=46)          # hidden key text, last second
add('tag', NFR - 30, END, text='OF ALL EUV MACHINES', xy=(490, 1488), rot=1, size=40)

G.finish(NLF, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
