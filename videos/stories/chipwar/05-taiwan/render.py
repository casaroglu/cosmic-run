#!/usr/bin/env python3
"""Chip Wars 05 "The Island the World Can't Lose" (Taiwan / TSMC): vertical Short on the shared engine (../_shorts/engine.py).
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, Image, ImageDraw, YEL, INK, BEIGE, PLACES, np
G.init(HERE, '~/cosmic-run/videos/out/chipwar/05-taiwan')
PLACES.update({'hsinchu': (120.97, 24.80), 'pingtan': (119.79, 25.50), 'twcoast': (120.92, 24.86), 'taiwanc': (120.95, 23.75)})

# ------------------------------------------------------------------ pieces (code-drawn, generic)
def draw_blueprint():
    """a chip design drawing on cream paper (engraved line art, no text)."""
    im = Image.new('RGBA', (360, 280), BEIGE + (255,)); d = ImageDraw.Draw(im)
    d.rectangle((8, 8, 351, 271), outline=INK + (255,), width=3); d.rectangle((50, 40, 310, 240), outline=INK + (255,), width=4)
    for i in range(3):
        x = 70 + i * 80; d.rectangle((x, 58, x + 60, 128), outline=INK + (255,), width=3)
    d.rectangle((70, 145, 290, 195), outline=INK + (255,), width=3)
    for x in range(80, 285, 12): d.line((x, 150, x, 190), fill=INK + (255,), width=1)
    for x in (70, 170): d.rectangle((x, 205, x + 80, 228), outline=INK + (255,), width=2)
    return im

def draw_fab():
    """a generic chip factory: long low cleanroom hall, a support block, tanks and vents."""
    im = Image.new('RGBA', (460, 250), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((20, 100, 380, 230), fill=(205, 205, 205, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((20, 80, 380, 104), fill=(150, 150, 150, 255))
    for x in range(40, 370, 46): d.rectangle((x, 130, x + 28, 150), fill=(110, 110, 110, 255))
    d.rectangle((300, 30, 360, 82), fill=(130, 130, 130, 255)); d.rectangle((60, 50, 130, 82), fill=(130, 130, 130, 255))
    for cx in (410, 440): d.ellipse((cx - 22, 150, cx + 22, 230), fill=(175, 175, 175, 255), outline=(70, 70, 70, 255), width=3)
    d.rectangle((0, 228, 460, 240), fill=(90, 90, 90, 255))
    return im

def draw_shield():
    """a yellow paper shield with an ink outline and a chip drawn on it."""
    im = Image.new('RGBA', (300, 340), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    pts = [(20, 30), (150, 4), (280, 30), (276, 170)] + [(150 + 126 * math.cos(t), 170 + 160 * math.sin(t)) for t in np.linspace(0, math.pi, 20)] + [(24, 170)]
    d.polygon(pts, fill=YEL + (255,), outline=INK + (255,), width=6)
    d.rectangle((100, 110, 200, 210), outline=INK + (255,), width=6)
    for k in range(4):
        for x0, y0, x1, y1 in ((108 + k * 25, 98, 108 + k * 25, 110), (108 + k * 25, 210, 108 + k * 25, 222), (88, 118 + k * 25, 100, 118 + k * 25), (200, 118 + k * 25, 212, 118 + k * 25)):
            d.line((x0, y0, x1, y1), fill=INK + (255,), width=5)
    return im

# ------------------------------------------------------------------ camera
TW, TS = (120.0, 24.0, 150), (120.3, 25.0, 160)
MOVES = [(cue('how', 1, -6), 22, TS), (cue('so', 1, -6), 22, TW)]
LABELS = [
    ('TAIWAN', 121.0, 22.9, 44, False, 130, 155), ('CHINA', 118.3, 26.7, 44, False, 130, 155), ('Taiwan Strait', 119.3, 23.6, 40, True, 130, 155),
    ('Hsinchu', 120.97, 24.62, 30, False, 130, 155),
    ('CHINA', 118.9, 26.4, 46, False, 155, 999), ('TAIWAN', 121.1, 23.9, 44, False, 155, 999), ('Taiwan Strait', 119.6, 24.2, 40, True, 155, 999),
    ('Pingtan', 119.79, 25.68, 30, False, 155, 999),
]
PAINT = {'TWN': (cue('taiwan', 1, -2), cue('not', 2, -6))}

# ------------------------------------------------------------------ elements
def hook_group(f0, f1):
    add('phone', f0 + 2, f1, xy=(200, 720), rot=-7, scale=0.8)
    add('chip', f0 + 6, f1, xy=(830, 700), rot=6, scale=0.75)
    add('wafer', f0 + 10, f1, xy=(330, 1290), rot=8)
    add('chain', f0 + 12, f1, a=('xy', 260, 930), b=('xy', 520, 840), dur=10)
    add('chain', f0 + 15, f1, a=('xy', 790, 860), b=('xy', 650, 860), dur=10)
    add('chain', f0 + 18, f1, a=('xy', 420, 1170), b=('xy', 560, 1070), dur=10)
    add('ransom', f0 + 4, f1, text='90%', xy=(490, 215), size=210, seed=2)
    add('tag', f0 + 16, f1, text='MOST ADVANCED CHIPS', xy=(490, 395), rot=-1, size=50)
    add('note', f0 + 20, f1, text='one island', size=96, xy=(700, 1470), rot=-3)
hook_group(0, cue('which', 1, -2))
# Taiwan, TSMC
add('card', cue('which', 1, 0), cue('why', 1, -2), fig='FIG. 01', lines=['Taiwan'])
add('dot', cue('one', 2, 0), cue('how', 1, -6), pin=('hsinchu', 0, 0), top=True)
add('circle', cue('one', 2, 2), cue('why', 1, -2), pin=('hsinchu', 0, 0), rx=70, ry=55, dur=10, top=True)
add('tag', cue('tsmc', 1, -2), cue('why', 1, -2), text='TSMC', pin=('hsinchu', -250, -40), rot=1.5, size=64)
add('chip', cue('makes', 1, -2), cue('why', 1, -2), xy=(780, 1180), rot=6, scale=0.8)
# almost forty years; 1987; only for others
add('card', cue('why', 1, 0), cue('today', 1, -2), fig='FIG. 02', lines=['Why Here?'])
add('ransom', cue('forty', 1, -2), cue('today', 1, -2), text='40', xy=(490, 375), size=200, seed=3)
add('tag', cue('years', 1, 0), cue('today', 1, -2), text='YEARS IN THE MAKING', xy=(490, 560), rot=1, size=48)
add('tag', cue('chang', 1, 0), cue('today', 1, -2), text='MORRIS CHANG, 1987', xy=(490, 1250), rot=-1.5, size=48)
add('note', cue('only', 1, -2), cue('today', 1, -2), text='only for others', size=96, xy=(490, 1440), rot=-2)
# Apple and Nvidia design, TSMC builds; Nvidia biggest customer
add('card', cue('today', 1, 0), cue('how', 1, -6), fig='FIG. 03', lines=['Design / Build'])
add('piece', cue('apple', 1, -2), cue('how', 1, -6), key='bp', fn=draw_blueprint, screen=False, xy=(240, 560), rot=-5, scale=0.8)
add('tag', cue('apple', 1, 2), cue('how', 1, -6), text='APPLE', xy=(240, 720), rot=-2, size=50)
add('piece', cue('nvidia', 1, -2), cue('how', 1, -6), key='bp', fn=draw_blueprint, screen=False, xy=(760, 560), rot=5, scale=0.8)
add('tag', cue('nvidia', 1, 2), cue('how', 1, -6), text='NVIDIA', xy=(760, 720), rot=2, size=50)
add('arrow', cue('builds', 1, -6), cue('how', 1, -6), a=('xy', 300, 780), b=('hsinchu', -20, -30), bend=-0.25, dur=10)
add('arrow', cue('builds', 1, -2), cue('how', 1, -6), a=('xy', 720, 780), b=('hsinchu', 20, -30), bend=0.25, dur=10)
add('chip', cue('builds', 1, 2), cue('how', 1, -6), xy=(780, 1180), rot=6, scale=0.8)
add('tag', cue('biggest', 1, -2), cue('how', 1, -6), text='NVIDIA: NO. 1 CUSTOMER', xy=(490, 1440), rot=1, size=46)
add('tag', cue('since', 1, 0), cue('how', 1, -6), text='SINCE 2025', xy=(490, 1360), rot=-1, size=46)
# the strait: 130-160 km, under 100 miles
add('card', cue('how', 1, 0), cue('many', 1, -2), fig='FIG. 04', lines=['The Strait'])
add('arrow', cue('about', 1, -2), cue('america', 1, -4), a=('pingtan', 6, 6), b=('twcoast', -6, -2), bend=0.0, dur=10)
add('arrow', cue('about', 1, 6), cue('america', 1, -4), a=('twcoast', -6, -2), b=('pingtan', 6, 6), bend=0.0, dur=10)
add('tag', cue('thirty', 1, -2), cue('many', 1, -2), text='130-160 KM', xy=(490, 1240), rot=-2, size=60)
add('tag', cue('less', 1, -2), cue('many', 1, -2), text='LESS THAN', xy=(490, 330), rot=1, size=50)
add('ransom', cue('hundred', 3, -2), cue('many', 1, -2), text='100 MILES', xy=(490, 470), size=100, seed=4)
# the silicon shield
add('card', cue('many', 1, 0), cue('america', 1, -4), fig='FIG. 05', lines=['Silicon Shield'])
add('piece', cue('silicon', 1, -4), cue('america', 1, -4), key='shield', fn=draw_shield, screen=False, xy=(700, 1180), rot=-4)
add('tag', cue('shield', 1, 0), cue('america', 1, -4), text='SILICON SHIELD', xy=(490, 1450), rot=-1, size=54)
# America: $165 bn for Arizona
add('card', cue('america', 1, -3), cue('not', 2, -6), fig='FIG. 06', lines=['Arizona'])
add('ransom', cue('pledge', 1, -2), cue('not', 2, -6), text='$165 BN', xy=(490, 360), size=150, seed=5)
add('tag', cue('america', 1, 0), cue('not', 2, -6), text='PLEDGED FOR ARIZONA', xy=(490, 530), rot=1, size=48)
add('piece', cue('factories', 1, -4), cue('not', 2, -6), key='fab', fn=draw_fab, xy=(490, 1180), rot=-2)
add('tag', cue('arizona', 1, 0), cue('not', 2, -6), text='ARIZONA', xy=(490, 1350), rot=-1.5, size=54)
add('note', cue('best', 1, -2), cue('not', 2, -6), text='best chips yet?', size=96, xy=(490, 1470), rot=-2)
# the loop
hook_group(cue('not', 2, -6), G.END)
add('tag', G.NFR - 30, G.END, text='TSMC ≈ 72.5% OF ALL', xy=(490, 1230), rot=-1, size=46)          # hidden key text, last second
add('tag', G.NFR - 30, G.END, text='FOUNDRY REVENUE (Q2 2026)', xy=(490, 1300), rot=1, size=40)

G.finish(TW, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
