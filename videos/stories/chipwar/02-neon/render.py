#!/usr/bin/env python3
"""Chip Wars 02 "The War That Almost Switched Off Chips" (Ukraine's neon): vertical Short on the shared engine (../_shorts/engine.py).
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, Image, ImageDraw, YEL, INK, BEIGE, PLACES, np, draw_beam
G.init(HERE, '~/cosmic-run/videos/out/chipwar/02-neon')
# Natural Earth 1:50m draws Crimea with Russia (de facto). This video shows the internationally recognised border: Crimea with Ukraine.
from engine import CTRY
_crimea = [r for r in CTRY['RUS'] if 32 < r[:, 0].min() < 33 and 44 < r[:, 1].min() < 45]
for r in _crimea:
    CTRY['RUS'] = [x for x in CTRY['RUS'] if x is not r]; CTRY['UKR'].append(r)
PLACES.update({'odesa': (30.73, 46.48), 'mariupol': (37.55, 47.10), 'crimea': (34.2, 45.1), 'chinapin': (113.0, 36.0), 'korea': (127.6, 36.4)})

# ------------------------------------------------------------------ pieces (code-drawn, generic)
def draw_cylinder():
    """a tall industrial gas cylinder with a valve and a blank paper label band."""
    im = Image.new('RGBA', (150, 420), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((58, 0, 92, 40), fill=(70, 70, 70, 255)); d.rectangle((40, 14, 110, 30), fill=(90, 90, 90, 255))
    d.ellipse((15, 40, 135, 120), fill=(185, 185, 185, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((15, 80, 135, 400), fill=(185, 185, 185, 255)); d.line((15, 80, 15, 400), fill=(70, 70, 70, 255), width=4); d.line((135, 80, 135, 400), fill=(70, 70, 70, 255), width=4)
    d.ellipse((15, 380, 135, 420), fill=(150, 150, 150, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((30, 90, 52, 390), fill=(232, 232, 232, 255))
    d.rectangle((15, 220, 135, 280), fill=(110, 110, 110, 255))
    return im

def draw_factory():
    """a generic industrial gas plant: a hall, two chimneys, a column and round tanks."""
    im = Image.new('RGBA', (300, 230), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((20, 110, 200, 220), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=3)
    d.polygon([(20, 110), (65, 80), (110, 110), (155, 80), (200, 110)], fill=(130, 130, 130, 255), outline=(70, 70, 70, 255))
    for x in (50, 90): d.rectangle((x, 20, x + 18, 90), fill=(100, 100, 100, 255))
    d.rectangle((215, 30, 245, 220), fill=(140, 140, 140, 255), outline=(70, 70, 70, 255), width=3)
    for cx in (270,): d.ellipse((cx - 26, 150, cx + 26, 202), fill=(200, 200, 200, 255), outline=(70, 70, 70, 255), width=3)
    for x in range(40, 190, 34): d.rectangle((x, 150, x + 18, 175), fill=(90, 90, 90, 255))
    return im

# ------------------------------------------------------------------ camera
UA, CR, EA = (33.0, 47.0, 70), (34.3, 45.4, 120), (116.0, 37.0, 32)
MOVES = [(cue('so', 1, -6), 22, CR), (cue('chipmakers', 1, -6), 24, EA), (cue('far', 1, -14), 24, UA)]
LABELS = [
    ('UKRAINE', 31.2, 49.4, 48, False, 60, 100), ('RUSSIA', 38.6, 51.2, 44, False, 60, 100), ('Black Sea', 33.6, 43.5, 48, True, 60, 100),
    ('Odesa', 30.73, 46.25, 34, False, 60, 100), ('Mariupol', 37.55, 46.85, 34, False, 60, 100),
    ('Black Sea', 33.0, 44.0, 48, True, 100, 999), ('Crimea', 34.2, 45.55, 44, False, 100, 999), ('Sea of Azov', 36.4, 46.3, 36, True, 100, 999),
    ('CHINA', 105.5, 34.5, 48, False, 20, 60), ('KOREA', 128.0, 37.6, 40, False, 20, 60), ('Yellow Sea', 123.3, 35.0, 36, True, 20, 60),
]
PAINT = {'UKR': (cue('ukraine', 1, -2), cue('far', 1, -14))}

# ------------------------------------------------------------------ elements
MAIN = (490, 1262)
def hook_group(f0, f1):
    add('machine', f0, f1, xy=MAIN, rot=-2, width=560)
    add('phone', f0 + 4, f1, xy=(200, 720), rot=-6, scale=0.8)
    add('piece', f0 + 8, f1, key='cyl', fn=draw_cylinder, xy=(800, 740), rot=4)
    add('flash', f0 + 12, f1, xy=(800, 560))
    add('chain', f0 + 14, f1, a=('xy', 240, 940), b=('xy', 370, 1110), dur=10)
    add('chain', f0 + 17, f1, a=('xy', 770, 960), b=('xy', 630, 1110), dur=10)
    add('ransom', f0 + 4, f1, text='WAR', xy=(490, 205), size=200, seed=2)
    add('ransom', f0 + 14, f1, text='VS CHIPS', xy=(490, 395), size=104, seed=5)
hook_group(0, cue('how', 1, -2))
# neon gas: the lasers, half from Ukraine
add('card', cue('how', 1, 0), cue('from', 2, -2), fig='FIG. 01', lines=['Neon Gas'])
add('machine', cue('how', 1, -2), cue('from', 2, -2), xy=MAIN, rot=-2, width=560)
add('piece', cue('how', 1, 2), cue('from', 2, -2), key='cyl', fn=draw_cylinder, xy=(800, 1020), rot=4)
add('piece', cue('lasers', 1, -2), cue('from', 2, -2), key='beam', fn=draw_beam, screen=False, xy=(660, 1110), rot=28, quiet=True)
add('tag', cue('lasers', 1, 2), cue('from', 2, -2), text='CHIPMAKING LASERS', xy=(490, 1490), rot=-1, size=46)
add('tag', cue('neon', 1, 0), cue('from', 2, -2), text='NEON', xy=(800, 1260), rot=2, size=50)
add('ransom', cue('half', 1, -2), cue('from', 2, -2), text='HALF', xy=(490, 345), size=170, seed=3)
add('tag', cue('chip-grade', 1, 0), cue('from', 2, -2), text='OF CHIP-GRADE NEON', xy=(490, 515), rot=1, size=46)
add('tag', cue('ukraine', 1, 0), cue('from', 2, -2), text='FROM UKRAINE', xy=(490, 600), rot=-1, size=46)
# the two plants, the siege, the invasion
add('card', cue('from', 2, 0), cue('so', 1, -6), fig='FIG. 02', lines=['Two Plants'])
add('piece', cue('odesa', 1, -2), cue('so', 1, -6), key='factory', fn=draw_factory, pin=('odesa', -20, -130), rot=-3, scale=0.8)
add('tag', cue('odesa', 1, 2), cue('so', 1, -6), text='ODESA', pin=('odesa', -20, 60), rot=-1.5, size=48)
add('piece', cue('mariupol', 1, -2), cue('so', 1, -6), key='factory', fn=draw_factory, pin=('mariupol', -30, -150), rot=3, scale=0.8)
add('tag', cue('mariupol', 1, 2), cue('so', 1, -6), text='MARIUPOL', pin=('mariupol', -30, 50), rot=1.5, size=48)
add('circle', cue('siege', 1, -2), cue('so', 1, -6), pin=('mariupol', -30, -80), rx=170, ry=170, dur=12, top=True)
add('note', cue('siege', 1, 2), cue('so', 1, -6), text='under siege', size=96, xy=(490, 1180), rot=-3)
add('arrow', cue('invaded', 1, -2), cue('so', 1, -6), a=('xy', 1010, 480), b=('mariupol', 60, -170), bend=0.2, dur=10)
add('inkx', cue('both', 1, 0), cue('so', 1, -6), pin=('odesa', -20, -130), r=80)
add('inkx', cue('stopped', 1, -2), cue('so', 1, -6), pin=('mariupol', -30, -150), r=80)
add('tag', cue('stopped', 1, 2), cue('so', 1, -6), text='BOTH PLANTS STOPPED', xy=(490, 1450), rot=-1, size=46)
# Crimea 2014: the earlier war
add('card', cue('so', 1, 0), cue('chipmakers', 1, -6), fig='FIG. 03', lines=['Crimea, 2014'])
add('note', cue('earlier', 1, -2), cue('chipmakers', 1, -6), text='an earlier war', size=96, xy=(490, 1460), rot=-2)
add('circle', cue('crimea', 1, -2), cue('chipmakers', 1, -6), pin=('crimea', 0, -10), rx=230, ry=150, dur=12, top=True)
add('ransom', cue('six', 1, -2), cue('chipmakers', 1, -6), text='600%', xy=(490, 470), size=210, seed=4)
add('tag', cue('prices', 1, 0), cue('chipmakers', 1, -6), text='NEON PRICES, 2014', xy=(490, 650), rot=1, size=46)
# Plan B: China, Korea, recycling
add('card', cue('chipmakers', 1, 8), cue('in', 5, -2), fig='FIG. 04', lines=['Plan B'])
add('note', cue('learned', 1, -2), cue('in', 5, -2), text='lesson learned', size=96, xy=(490, 470), rot=-3)
add('piece', cue('china', 1, -2), cue('far', 1, -14), key='cyl', fn=draw_cylinder, pin=('chinapin', 0, -160), rot=-4, scale=0.7)
add('tag', cue('china', 1, 2), cue('far', 1, -14), text='CHINA', pin=('chinapin', 0, 30), rot=-1.5, size=48)
add('piece', cue('korea', 1, -2), cue('far', 1, -14), key='cyl', fn=draw_cylinder, pin=('korea', 0, -160), rot=4, scale=0.7)
add('tag', cue('korea', 1, 2), cue('far', 1, -14), text='KOREA', pin=('korea', 0, 30), rot=1.5, size=48)
add('piece', cue('recycling', 1, -2), cue('far', 1, -14), key='cyl', fn=draw_cylinder, xy=(490, 1230), rot=0, scale=0.6)
add('arrow', cue('recycling', 1, 0), cue('far', 1, -14), a=('xy', 330, 1230), b=('xy', 650, 1230), bend=0.55, dur=10)
add('arrow', cue('recycling', 1, 6), cue('far', 1, -14), a=('xy', 650, 1250), b=('xy', 330, 1250), bend=0.55, dur=10)
add('tag', cue('neon', 4, 0), cue('far', 1, -14), text='RECYCLED', xy=(490, 1470), rot=-1, size=48)
# 2022: up to 500 %, but no fab stopped
add('ransom', cue('five', 1, -2), cue('far', 1, -14), text='500%', xy=(490, 330), size=190, seed=6)
add('tag', cue('supplier', 1, 0), cue('far', 1, -14), text='ONE SUPPLIER, 2022', xy=(490, 505), rot=1, size=46)
add('note', cue('no', 1, 0), cue('far', 1, -14), text='no fab stopped', size=92, xy=(490, 1010), rot=-2)
# the loop
hook_group(cue('far', 1, -8), G.END)
add('tag', G.NFR - 30, G.END, text='UKRAINE ≈ 45-54%', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', G.NFR - 30, G.END, text='OF CHIP-GRADE NEON (PRE-2022)', xy=(490, 1476), rot=1, size=36)

G.finish(UA, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
