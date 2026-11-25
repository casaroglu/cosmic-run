#!/usr/bin/env python3
"""Chip Wars 01 "The Town Behind Every Chip" (Spruce Pine): vertical Short on the shared engine (../_shorts/engine.py).
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, Image, ImageDraw, YEL, INK, BEIGE, PLACES, np
G.init(HERE, '~/cosmic-run/videos/out/chipwar/01-spruce-pine')
PLACES.update({'sprucepine': (-82.065, 35.915)})

# ------------------------------------------------------------------ pieces (code-drawn, generic)
def draw_quartz():
    """a cluster of clear quartz crystals (hexagonal prisms with pointed tips), grey shading for the halftone."""
    im = Image.new('RGBA', (360, 330), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for cx, h, w, tilt, g in ((110, 230, 70, -0.35, 215), (250, 210, 64, 0.3, 200), (180, 290, 84, 0.0, 235), (300, 150, 48, 0.55, 190), (60, 160, 50, -0.6, 205)):
        base = (cx, 320); dx, dy = math.sin(tilt), -math.cos(tilt)
        top = (base[0] + dx * h, base[1] + dy * h); px, py = -dy, dx
        body = [(base[0] - px * w / 2, base[1] - py * w / 2), (top[0] - px * w / 2, top[1] - py * w / 2), (top[0] + dx * w * 0.6, top[1] + dy * w * 0.6),
                (top[0] + px * w / 2, top[1] + py * w / 2), (base[0] + px * w / 2, base[1] + py * w / 2)]
        d.polygon(body, fill=(g, g, g, 255), outline=(80, 80, 80, 255), width=3)
        d.line([(base[0], base[1]), (top[0] + dx * w * 0.6, top[1] + dy * w * 0.6)], fill=(150, 150, 150, 255), width=3)
        d.line([(top[0] - px * w / 2, top[1] - py * w / 2), (top[0] + px * w / 2, top[1] + py * w / 2)], fill=(120, 120, 120, 255), width=2)
    d.ellipse((20, 300, 340, 330), fill=(120, 120, 120, 255))
    return im

def draw_crucible():
    """a fused-quartz crucible (bowl) on a heater; the melt is drawn separately in yellow."""
    im = Image.new('RGBA', (420, 300), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((30, 150, 390, 290), fill=(90, 90, 90, 255))
    for x in range(50, 380, 40): d.line((x, 170, x, 280), fill=(60, 60, 60, 255), width=6)
    d.pieslice((40, -60, 380, 250), 0, 180, fill=(225, 225, 225, 255), outline=(70, 70, 70, 255), width=5)
    d.ellipse((40, 40, 380, 110), fill=(200, 200, 200, 255), outline=(70, 70, 70, 255), width=5)
    d.ellipse((60, 52, 360, 98), fill=(30, 30, 30, 255))
    return im

def draw_melt():
    im = Image.new('RGBA', (310, 60), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.ellipse((5, 5, 305, 55), fill=YEL + (255,), outline=INK + (255,), width=4)
    for x in (60, 120, 190, 250): d.arc((x - 18, 18, x + 18, 42), 200, 340, fill=INK + (255,), width=3)
    return im

def draw_ingot():
    """a single-crystal silicon ingot: a long cylinder with a cone at the top and a thin seed rod."""
    im = Image.new('RGBA', (170, 520), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((80, 0, 90, 70), fill=(80, 80, 80, 255))
    d.polygon([(85, 60), (20, 150), (150, 150)], fill=(150, 150, 150, 255), outline=(70, 70, 70, 255))
    d.rectangle((20, 150, 150, 480), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=3)
    d.rectangle((36, 160, 62, 470), fill=(230, 230, 230, 255))
    d.ellipse((20, 462, 150, 500), fill=(120, 120, 120, 255), outline=(70, 70, 70, 255), width=3)
    return im

def draw_cart():
    """a generic mine cart full of white quartz."""
    im = Image.new('RGBA', (300, 230), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for x, y in ((40, 60), (90, 30), (150, 45), (210, 25), (250, 60), (120, 70), (190, 70)): d.ellipse((x - 38, y - 30, x + 38, y + 30), fill=(235, 235, 235, 255), outline=(110, 110, 110, 255), width=3)
    d.polygon([(10, 80), (290, 80), (260, 190), (40, 190)], fill=(100, 100, 100, 255), outline=(50, 50, 50, 255))
    for x in (70, 150, 230): d.line((x, 90, x - 5, 180), fill=(70, 70, 70, 255), width=4)
    for cx in (85, 215): d.ellipse((cx - 30, 170, cx + 30, 230), fill=(60, 60, 60, 255)); d.ellipse((cx - 10, 190, cx + 10, 210), fill=(160, 160, 160, 255))
    return im

def draw_storm():
    """a hurricane symbol on paper: yellow disc with ink spiral arms."""
    s = 300; im = Image.new('RGBA', (s, s), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = s / 2
    for arm in (0, math.pi):
        pts = [(c + (12 + t * 26) * math.cos(arm + t), c + (12 + t * 26) * math.sin(arm + t)) for t in np.linspace(0, 4.6, 60)]
        d.line(pts, fill=INK + (255,), width=16, joint='curve')
    d.ellipse((c - 44, c - 44, c + 44, c + 44), fill=YEL + (255,), outline=INK + (255,), width=6)
    d.ellipse((c - 14, c - 14, c + 14, c + 14), fill=BEIGE + (255,), outline=INK + (255,), width=4)
    return im

def draw_laptop():
    im = Image.new('RGBA', (300, 230), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((40, 0, 260, 150), 10, fill=(60, 60, 60, 255)); d.rectangle((52, 12, 248, 138), fill=(210, 210, 210, 255))
    for r in range(3):
        d.rectangle((70, 30 + r * 34, 230 - r * 30, 46 + r * 34), fill=(150, 150, 150, 255))
    d.polygon([(10, 200), (290, 200), (262, 150), (38, 150)], fill=(120, 120, 120, 255), outline=(60, 60, 60, 255))
    d.rectangle((10, 200, 290, 214), fill=(90, 90, 90, 255))
    return im

# ------------------------------------------------------------------ camera (focus points: lon, lat, ppd)
SPW, SPZ, SPS = (-82.07, 35.92, 30), (-82.07, 35.92, 120), (-82.07, 35.92, 60)
MOVES = [
    (cue('one', 2, -6), 22, SPZ),          # "One town?" -> zoom on the town
    (cue('chips', 2, -6), 20, SPS),         # "Chips are cut from..." -> pull back a little for the crucible
    (cue('so', 2, -14), 20, SPW),           # the loop: back to the hook framing
]
LABELS = [
    ('Atlantic Ocean', -71.0, 33.0, 46, True, 0, 45), ('UNITED STATES', -88.5, 39.2, 44, False, 0, 45), ('Gulf of Mexico', -89.5, 26.5, 40, True, 0, 45),
    ('NORTH CAROLINA', -80.8, 34.9, 40, False, 100, 999), ('TENNESSEE', -85.0, 35.3, 40, False, 100, 999), ('VIRGINIA', -79.8, 37.6, 40, False, 100, 999),
    ('Spruce Pine', -82.07, 36.18, 44, False, 45, 999), ('Atlantic Ocean', -73.0, 32.6, 44, True, 45, 100),
]
PAINT = {}

# ------------------------------------------------------------------ elements
MAIN = (490, 1262)
def hook_group(f0, f1):
    add('piece', f0, f1, key='crucible', fn=draw_crucible, xy=MAIN, rot=-1)
    add('piece', f0 + 2, f1, key='melt', fn=draw_melt, screen=False, xy=(MAIN[0], MAIN[1] - 62), rot=-1, quiet=True)
    add('phone', f0 + 4, f1, xy=(200, 700), rot=-6, scale=0.8)
    add('piece', f0 + 8, f1, key='laptop', fn=draw_laptop, xy=(500, 640), rot=2, scale=0.9)
    add('chip', f0 + 12, f1, xy=(805, 700), rot=5, scale=0.75)
    for i, (a, b) in enumerate([((230, 900), (360, 1120)), ((500, 760), (490, 1110)), ((780, 860), (630, 1120))]):
        add('chain', f0 + 14 + 3 * i, f1, a=('xy',) + a, b=('xy',) + b, dur=10)
    add('ransom', f0 + 4, f1, text='ONE', xy=(490, 200), size=170, seed=2)
    add('ransom', f0 + 14, f1, text='TOWN', xy=(490, 380), size=120, seed=5)
add('dot', 0, cue('one', 2, -6), pin=('sprucepine', 0, 0))
hook_group(0, cue('one', 2, -6))
add('tag', cue('quartz', 1, 0), cue('one', 2, -6), text='QUARTZ BOWL', xy=(490, 1490), rot=1.2, size=50)
# the town, the storm
add('card', cue('did', 1, 0), cue('why', 1, -2), fig='FIG. 01', lines=['Spruce Pine,', 'North Carolina'])
add('dot', cue('one', 2, 14), cue('so', 2, -14), pin=('sprucepine', 0, 0))
add('circle', cue('spruce', 1, 0), cue('why', 1, -2), pin=('sprucepine', 0, 0), rx=90, ry=70, dur=12)
add('piece', cue('hurricane', 1, -4), cue('why', 1, -2), key='storm', fn=draw_storm, screen=False, xy=(700, 1180), rot=0, spin=True)
add('arrow', cue('helene', 1, 0), cue('why', 1, -2), a=('xy', 640, 1060), b=('sprucepine', 30, 30), bend=0.3, dur=12)
add('tag', cue('helene', 1, 4), cue('why', 1, -2), text='HELENE · SEPT 2024', xy=(490, 1420), rot=-1.2, size=48)
add('note', cue('breath', 1, -4), cue('why', 1, -2), text='chips on hold?', size=92, xy=(470, 560), rot=-3)
# the purest quartz, 80 %
add('card', cue('why', 1, 0), cue('chips', 2, -6), fig='FIG. 02', lines=['The Purest', 'Quartz'])
add('piece', cue('quartz', 3, -2), cue('chips', 2, -6), key='quartz', fn=draw_quartz, xy=(490, 1150), rot=-3)
add('ransom', cue('eighty', 1, -2), cue('chips', 2, -6), text='80%', xy=(490, 480), size=210, seed=3)
add('tag', cue('high-purity', 1, 0), cue('chips', 2, -6), text='OF HIGH-PURITY QUARTZ', xy=(490, 650), rot=-1, size=46)
add('tag', cue('analysts', 1, 0), cue('chips', 2, -6), text='ANALYSTS’ ESTIMATE', xy=(490, 1420), rot=1, size=44)
# crucible and crystal
add('card', cue('chips', 2, 8), cue('who', 1, -2), fig='FIG. 03', lines=['Grown in', 'a Quartz Bowl'])
add('piece', cue('quartz', 5, -2), cue('who', 1, -2), key='crucible', fn=draw_crucible, xy=MAIN, rot=-1)
add('piece', cue('quartz', 5, 0), cue('who', 1, -2), key='melt', fn=draw_melt, screen=False, xy=(MAIN[0], MAIN[1] - 62), rot=-1, quiet=True)
add('piece', cue('crystals', 1, -2), cue('who', 1, -2), key='ingot', fn=draw_ingot, xy=(490, 760), rot=0)
add('ransom', cue('fourteen', 1, -2), cue('any', 1, -2), text='1,400°C', xy=(490, 380), size=110, seed=7)
add('tag', cue('silicon', 1, 0), cue('who', 1, -2), text='SILICON CRYSTAL', xy=(760, 520), rot=2, size=44)
add('dot', cue('impurity', 1, 0), cue('who', 1, -2), xy=(560, 1205), top=True)
add('circle', cue('impurity', 1, 2), cue('who', 1, -2), xy=(560, 1205), rx=40, ry=34, dur=10, top=True)
add('inkx', cue('ruined', 1, -2), cue('who', 1, -2), xy=(490, 760), r=120)
add('note', cue('ruined', 1, 2), cue('who', 1, -2), text='ruined!', size=110, xy=(490, 380), rot=-3)
# the two miners
add('card', cue('who', 1, 0), cue('after', 1, -2), fig='FIG. 04', lines=['Two Miners'])
add('piece', cue('sibelco', 1, -4), cue('after', 1, -2), key='cart', fn=draw_cart, xy=(270, 1080), rot=-3)
add('tag', cue('sibelco', 1, 0), cue('after', 1, -2), text='SIBELCO', xy=(270, 1260), rot=-1.5, size=50)
add('piece', cue('quartz', 6, -4), cue('after', 1, -2), key='cart', fn=draw_cart, xy=(720, 1080), rot=3)
add('tag', cue('corp', 1, 0), cue('after', 1, -2), text='THE QUARTZ CORP', xy=(670, 1340), rot=1.5, size=46)
add('ransom', cue('two', 1, -2), cue('after', 1, -2), text='2', xy=(490, 470), size=220, seed=4)
# after the storm: roads, rail, power cut; restart
add('card', cue('after', 1, -2), cue('others', 1, -2), fig='FIG. 05', lines=['After', 'the Storm'])
add('piece', cue('storm', 1, -4), cue('others', 1, -2), key='storm', fn=draw_storm, screen=False, xy=(760, 560), rot=0, spin=True, scale=0.7)
add('inkx', cue('roads', 1, 0), cue('others', 1, -2), pin=('sprucepine', -180, 40), r=46)
add('tag', cue('roads', 1, 4), cue('others', 1, -2), text='ROADS', pin=('sprucepine', -180, 130), rot=-2, size=46)
add('inkx', cue('rail', 1, 0), cue('others', 1, -2), pin=('sprucepine', 30, 190), r=46)
add('tag', cue('rail', 1, 4), cue('others', 1, -2), text='RAIL', pin=('sprucepine', 30, 280), rot=2, size=46)
add('inkx', cue('power', 1, 0), cue('others', 1, -2), pin=('sprucepine', 230, 40), r=46)
add('tag', cue('power', 1, 4), cue('others', 1, -2), text='POWER', pin=('sprucepine', 230, 130), rot=-1, size=46)
add('ransom', cue('two', 2, -2), cue('others', 1, -2), text='2 WEEKS', xy=(490, 1240), size=110, seed=6)
add('tag', cue('restarted', 1, 0), cue('others', 1, -2), text='SIBELCO RESTARTS', xy=(490, 1420), rot=-1, size=46)
# nothing matches it at scale
add('card', cue('others', 1, 0), cue('so', 2, -14), fig='FIG. 06', lines=['At Scale?'])
add('piece', cue('others', 1, 0), cue('so', 2, -14), key='quartz', fn=draw_quartz, xy=(490, 650), rot=-3, scale=1.25)
add('tag', cue('others', 1, 6), cue('so', 2, -14), text='SPRUCE PINE', xy=(490, 900), rot=1, size=50)
for i, (w, x) in enumerate((('brazil', 200), ('russia', 490), ('china', 780))):
    add('piece', cue(w, 1, -2), cue('so', 2, -14), key='quartz', fn=draw_quartz, xy=(x, 1180), rot=(-4, 3, -2)[i], scale=0.42)
    add('tag', cue(w, 1, 2), cue('so', 2, -14), text=w.upper(), xy=(x, 1300), rot=(-2, 1.5, -1)[i], size=44)
add('note', cue('nothing', 1, 0), cue('so', 2, -14), text='not at scale', size=96, xy=(490, 1470), rot=-2)
# the loop
hook_group(cue('so', 2, -8), G.END)
add('dot', cue('so', 2, 6), G.END, pin=('sprucepine', 0, 0))
add('tag', G.NFR - 30, G.END, text='SPRUCE PINE ≈ 80%', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', G.NFR - 30, G.END, text='OF HIGH-PURITY QUARTZ', xy=(490, 1476), rot=1, size=40)

G.finish(SPW, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
