#!/usr/bin/env python3
"""Chip Wars 08 "The Metal China Controls" (gallium & germanium): vertical Short on the shared engine.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/08-gallium')
PLACES.update({'beijing': (116.40, 39.90)})
END, NFR = G.END, G.NFR

CN = (106.0, 33.0, 24)
MOVES = []
LABELS = [
    ('MONGOLIA', 103.5, 46.5, 40, False, 15, 60), ('INDIA', 80.0, 23.0, 40, False, 15, 60), ('RUSSIA', 110.0, 55.0, 40, False, 15, 60),
    ('Pacific Ocean', 130.0, 22.0, 36, True, 15, 60), ('South China Sea', 113.5, 14.0, 34, True, 15, 60), ('CHINA', 101.0, 31.0, 48, False, 15, 60),
]
PAINT = {'CHN': (cue('china', 1, -2), cue("that's", 1, -6))}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('beijing', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='radar', fn=draw_radar, xy=(290, 820), rot=-4, scale=0.85)
    add('piece', f0 + 6, f1, key='fibre', fn=draw_fibre, xy=(650, 1200), rot=3, scale=0.9)
    add('chain', f0 + 12, f1, a=('xy', 390, 760), b=('beijing', -20, 10), dur=10)
    add('chain', f0 + 15, f1, a=('xy', 640, 1060), b=('beijing', 0, 20), dur=10)
    add('ransom', f0 + 4, f1, text='ONE COUNTRY', xy=(490, 215), size=96, seed=2)
    add('tag', f0 + 16, f1, text='CONTROLS THE METALS', xy=(490, 380), rot=-1, size=52)
hook_group(0, cue('which', 1, -2))
# 99 % of gallium
add('card', cue('which', 1, 0), cue('why', 1, -2), fig='FIG. 01', lines=['One Country'])
add('ransom', cue('ninety-nine', 1, -2), cue('why', 1, -2), text='99%', xy=(490, 400), size=210, seed=3)
add('tag', cue('gallium', 1, -2), cue('why', 1, -2), text="OF THE WORLD'S GALLIUM", xy=(490, 580), rot=1, size=46)
# uses
add('card', cue('why', 1, 0), cue('in', 2, -2), fig='FIG. 02', lines=['What For?'])
add('chip', cue('power', 1, -2), cue('in', 2, -2), xy=(250, 640), rot=-5, scale=0.55)
add('tag', cue('power', 1, 2), cue('in', 2, -2), text='POWER CHIPS', xy=(250, 820), rot=-2, size=50)
add('tag', cue('led', 1, -2), cue('in', 2, -2), text='LED LIGHTS', xy=(700, 600), rot=2, size=50)
add('piece', cue('radars', 1, -4), cue('in', 2, -2), key='radar', fn=draw_radar, xy=(700, 820), rot=4, scale=0.7)
add('tag', cue('radars', 1, 2), cue('in', 2, -2), text='AIR-DEFENCE RADAR', xy=(640, 1000), rot=-1, size=46)
add('piece', cue('germanium', 1, -2), cue('in', 2, -2), key='fibre', fn=draw_fibre, xy=(490, 1230), rot=3, scale=0.8)
add('tag', cue('fibre-optic', 1, -2), cue('in', 2, -2), text='GERMANIUM: FIBRE OPTICS', xy=(490, 1440), rot=1, size=44)
# licences, then a ban on the US
add('card', cue('in', 2, 0), cue('what', 1, -2), fig='FIG. 03', lines=['Licence, Then Ban'])
add('tag', cue('licence', 1, -2), cue('what', 1, -2), text='2023 · LICENCES', xy=(490, 560), rot=-1, size=50)
add('doc', cue('licence', 1, -2), cue('what', 1, -2), xy=(300, 1060), rot=-6, scale=0.8, title='LICENCE')
add('ransom', cue('banned', 1, -2), cue('what', 1, -2), text='BAN', xy=(490, 390), size=200, seed=4)
add('crate', cue('america', 1, -2), cue('what', 1, -2), xy=(680, 1150), rot=4)
add('inkx', cue('outright', 1, -2), cue('what', 1, -2), xy=(680, 1150), r=90)
add('tag', cue('december', 1, 0), cue('what', 1, -2), text='TO THE US · DEC 2024', xy=(490, 1360), rot=1, size=48)
# prices
add('card', cue('what', 1, 0), cue('after', 1, -2), fig='FIG. 04', lines=['Prices'])
add('arrow', cue('europe', 1, -6), cue('after', 1, -2), a=('beijing', -60, 40), b=('xy', 60, 760), bend=0.25, dur=12)
add('tag', cue('europe', 1, -2), cue('after', 1, -2), text='EUROPE', xy=(220, 700), rot=-2, size=50)
add('ransom', cue('doubled', 1, -4), cue('five', 1, -2), text='x2', xy=(490, 390), size=210, seed=5)
add('tag', cue('gallium', 3, -2), cue('five', 1, -2), text='GALLIUM PRICE', xy=(490, 570), rot=1, size=50)
add('ransom', cue('five', 1, -2), cue('after', 1, -2), text='$5,000/KG', xy=(490, 390), size=110, seed=6)
add('tag', cue('germanium', 2, 0), cue('after', 1, -2), text='GERMANIUM · 5x 2023', xy=(490, 560), rot=-1, size=48)
# the truce: paused, for now
add('card', cue('after', 1, 0), cue("that's", 1, -6), fig='FIG. 05', lines=['Paused'])
add('ransom', cue('paused', 1, -2), cue("that's", 1, -6), text='PAUSED', xy=(490, 390), size=150, seed=7)
add('tag', cue('truce', 1, -2), cue("that's", 1, -6), text='BAN ON THE US', xy=(490, 560), rot=1, size=52)
add('note', cue('now', 1, -4), cue("that's", 1, -6), text='...for now', size=110, xy=(490, 1440), rot=-3)
# the loop
hook_group(cue("that's", 1, -4), END)
add('tag', NFR - 30, END, text='CHINA = 99% OF PRIMARY', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', NFR - 30, END, text='GALLIUM (USGS 2026)', xy=(490, 1476), rot=1, size=42)

G.finish(CN, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
