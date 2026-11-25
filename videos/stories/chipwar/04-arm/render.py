#!/usr/bin/env python3
"""Chip Wars 04 "The Company That Never Made a Chip" (Arm, Cambridge): vertical Short on the shared engine (../_shorts/engine.py).
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, Image, ImageDraw, YEL, INK, BEIGE, PLACES, np, draw_document
G.init(HERE, '~/cosmic-run/videos/out/chipwar/04-arm')
PLACES.update({'cambridge': (0.12, 52.20)})

# ------------------------------------------------------------------ pieces (code-drawn, generic)
def draw_blueprint():
    """a chip design drawing on cream paper: engraved line art of a floorplan (cores, cache, I/O), no text, no halftone."""
    im = Image.new('RGBA', (440, 340), BEIGE + (255,)); d = ImageDraw.Draw(im)
    d.rectangle((10, 10, 429, 329), outline=INK + (255,), width=3); d.rectangle((18, 18, 421, 321), outline=INK + (255,), width=1)
    d.rectangle((60, 50, 380, 290), outline=INK + (255,), width=4)
    for i in range(4):
        x = 80 + i * 72; d.rectangle((x, 70, x + 56, 150), outline=INK + (255,), width=3)
        for k in range(3): d.line((x + 8, 86 + k * 20, x + 48, 86 + k * 20), fill=INK + (255,), width=1)
    d.rectangle((80, 170, 360, 230), outline=INK + (255,), width=3)
    for x in range(92, 352, 14): d.line((x, 176, x, 224), fill=INK + (255,), width=1)
    for x in (80, 180, 280): d.rectangle((x, 244, x + 80, 274), outline=INK + (255,), width=2)
    for k in range(9):
        d.line((60 + k * 40, 290, 60 + k * 40, 310), fill=INK + (255,), width=3); d.line((60 + k * 40, 30, 60 + k * 40, 50), fill=INK + (255,), width=3)
    return im

def draw_key():
    im = Image.new('RGBA', (420, 200), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.ellipse((10, 30, 150, 170), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=5); d.ellipse((50, 70, 110, 130), fill=(0, 0, 0, 0), outline=(70, 70, 70, 255), width=5)
    d.ellipse((52, 72, 108, 128), fill=(0, 0, 0, 0))
    d.rectangle((140, 84, 400, 116), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=4)
    for x, h in ((300, 50), (345, 34), (380, 56)): d.rectangle((x, 116, x + 26, 116 + h), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((150, 90, 390, 98), fill=(230, 230, 230, 255))
    return im

def draw_gavel():
    im = Image.new('RGBA', (380, 300), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.polygon([(150, 120), (170, 100), (360, 270), (340, 290)], fill=(120, 120, 120, 255), outline=(60, 60, 60, 255))
    d.polygon([(60, 70), (170, -10), (240, 80), (130, 160)], fill=(160, 160, 160, 255), outline=(60, 60, 60, 255))
    d.polygon([(40, 90), (70, 66), (140, 160), (110, 184)], fill=(110, 110, 110, 255), outline=(60, 60, 60, 255))
    d.polygon([(230, 70), (260, 46), (330, 140), (300, 164)], fill=(110, 110, 110, 255), outline=(60, 60, 60, 255))
    d.rounded_rectangle((20, 250, 260, 292), 12, fill=(90, 90, 90, 255))
    return im

def draw_coin():
    im = Image.new('RGBA', (110, 110), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.ellipse((4, 4, 106, 106), fill=YEL + (255,), outline=INK + (255,), width=5); d.ellipse((22, 22, 88, 88), outline=INK + (255,), width=3)
    return im

# ------------------------------------------------------------------ camera
GB, GBZ = (-1.0, 53.0, 80), (0.12, 52.2, 150)
MOVES = [(cue('cambridge', 1, -10), 20, GBZ), (cue('why', 1, -6), 22, GB)]
LABELS = [
    ('BRITAIN', -2.4, 54.6, 46, False, 50, 120), ('IRELAND', -8.0, 53.2, 40, False, 50, 120), ('North Sea', 3.4, 56.0, 46, True, 50, 120),
    ('FRANCE', 2.4, 47.6, 44, False, 50, 120), ('Cambridge', 0.12, 52.45, 34, False, 50, 999),
    ('ENGLAND', -1.4, 51.5, 44, False, 120, 999), ('North Sea', 2.6, 53.5, 44, True, 120, 999),
]
PAINT = {'GBR': (cue('british', 1, -2), cue('not', 1, -14))}

# ------------------------------------------------------------------ elements
MAIN = (490, 1230)
def hook_group(f0, f1):
    add('piece', f0, f1, key='blueprint', fn=draw_blueprint, screen=False, xy=MAIN, rot=-2)
    add('phone', f0 + 4, f1, xy=(190, 690), rot=-8, scale=0.75)
    add('phone', f0 + 7, f1, xy=(490, 650), rot=0, scale=0.75)
    add('phone', f0 + 10, f1, xy=(790, 690), rot=8, scale=0.75)
    for i, (a, b) in enumerate((((220, 900), (330, 1080)), ((490, 860), (490, 1060)), ((760, 900), (650, 1080)))):
        add('chain', f0 + 12 + 3 * i, f1, a=('xy',) + a, b=('xy',) + b, dur=10)
    add('ransom', f0 + 4, f1, text='99%', xy=(490, 215), size=200, seed=2)
    add('tag', f0 + 16, f1, text='OF SMARTPHONES', xy=(490, 390), rot=-1, size=50)
hook_group(0, cue('then', 1, -2))
add('note', cue('never', 1, 0), cue('then', 1, -2), text='no chips made!', size=96, xy=(490, 1470), rot=-2)
# blueprints and fees
add('card', cue('then', 1, 0), cue('why', 1, -2), fig='FIG. 01', lines=['Blueprints'])
add('piece', cue('then', 1, -2), cue('why', 1, -2), key='blueprint', fn=draw_blueprint, screen=False, xy=MAIN, rot=-2)
add('circle', cue('cambridge', 1, 8), cue('why', 1, -2), pin=('cambridge', 0, 0), rx=80, ry=60, dur=10, top=True)
add('tag', cue('cambridge', 1, 10), cue('why', 1, -2), text='ARM · CAMBRIDGE', pin=('cambridge', 0, -110), rot=1.5, size=50)
add('note', cue('blueprints', 1, 0), cue('apple', 1, -2), text='sells designs', size=96, xy=(490, 1490), rot=-2)
for i, (w, y) in enumerate((('apple', 330), ('samsung', 430), ('qualcomm', 530))):
    add('tag', cue(w, 1, -2), cue('why', 1, -2), text=w.upper(), xy=(330 + i * 150, y), rot=(-2, 1.5, -1)[i], size=50)
for i, xy in enumerate(((250, 1470), (490, 1500), (730, 1470))):
    add('piece', cue('fee', 1, -2) + 3 * i, cue('why', 1, -2), key='coin', fn=draw_coin, screen=False, xy=xy, rot=0)
add('tag', cue('every', 2, 0), cue('why', 1, -2), text='A FEE ON EVERY CHIP', xy=(490, 1350), rot=1, size=46)
# the keys to 99 %; 300 billion chips
add('card', cue('why', 1, 0), cue('who', 1, -2), fig='FIG. 02', lines=['The Keys'])
add('piece', cue('keys', 1, -4), cue('three', 1, -2), key='key', fn=draw_key, xy=(490, 1150), rot=-8)
add('ransom', cue('ninety-nine', 1, -2), cue('three', 1, -2), text='99%', xy=(490, 360), size=200, seed=3)
add('tag', cue('smartphones', 1, -4), cue('three', 1, -2), text='OF SMARTPHONES', xy=(490, 540), rot=1, size=50)
add('ransom', cue('three', 1, -2), cue('who', 1, -2), text='300', xy=(490, 330), size=200, seed=6)
add('ransom', cue('billion', 1, -2), cue('who', 1, -2), text='BILLION', xy=(490, 520), size=110, seed=7)
add('tag', cue('arm-based', 1, 0), cue('who', 1, -2), text='ARM-BASED CHIPS SHIPPED', xy=(490, 660), rot=-1, size=44)
add('chip', cue('arm-based', 1, 2), cue('who', 1, -2), xy=(490, 1150), rot=6, scale=0.9)
# owners: SoftBank 2016, Nvidia's offer 2020, regulators
add('card', cue('who', 1, 0), cue('why', 2, -2), fig='FIG. 03', lines=['Who Owns It?'])
add('ransom', cue('twenty-four', 1, -4), cue('in', 2, -2), text='£24 BN', xy=(490, 380), size=150, seed=4)
add('tag', cue('softbank', 1, 0), cue('in', 2, -2), text='SOFTBANK · 2016', xy=(490, 545), rot=-1, size=50)
add('piece', cue('bought', 1, -2), cue('why', 2, -2), key='blueprint', fn=draw_blueprint, screen=False, xy=MAIN, rot=-2)
add('ransom', cue('forty', 1, -4), cue('why', 2, -2), text='$40 BN', xy=(490, 380), size=150, seed=5)
add('tag', cue('nvidia', 1, 0), cue('why', 2, -2), text='NVIDIA OFFERS · 2020', xy=(490, 545), rot=1, size=48)
add('piece', cue('regulators', 1, -2), cue('why', 2, -2), key='gavel', fn=draw_gavel, xy=(760, 900), rot=-6, scale=0.8)
for i, (w, y) in enumerate((('america', 760), ('britain', 860), ('europe', 960))):
    add('tag', cue(w, 1, -2), cue('why', 2, -2), text=w.upper(), xy=(300, y), rot=(-2, 1.5, -1)[i], size=48)
# why: the blueprints rivals need; the deal died
add('card', cue('why', 2, 0), cue('not', 1, -14), fig='FIG. 04', lines=['Deal Off'])
add('piece', cue('why', 2, -2), cue('not', 1, -14), key='blueprint', fn=draw_blueprint, screen=False, xy=MAIN, rot=-2)
add('note', cue('rivals', 1, -2), cue('not', 1, -14), text='rivals need it', size=96, xy=(490, 1490), rot=-2)
add('doc', cue('deal', 1, -2), cue('not', 1, -14), xy=(490, 760), rot=-5, scale=0.9, title='OFFER')
add('inkx', cue('died', 1, 0), cue('not', 1, -14), xy=(490, 760), r=120)
add('tag', cue('died', 1, 4), cue('not', 1, -14), text='DEAD · FEB 2022', xy=(490, 470), rot=1, size=56)
# the loop
hook_group(cue('not', 1, -8), G.END)
add('tag', G.NFR - 30, G.END, text='ARM CPUs IN 99%+', xy=(490, 1450), rot=-1, size=46)          # hidden key text, last second
add('tag', G.NFR - 30, G.END, text='OF SMARTPHONES (ARM)', xy=(490, 1520), rot=1, size=40)

G.finish(GB, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
