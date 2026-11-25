#!/usr/bin/env python3
"""Chip Wars 13 "AI Is Eating the Power Grid": vertical Short on the shared engine. No real person is drawn; no logos.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cl, ls, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/13-power-grid')
PLACES.update({'dublin': (-6.26, 53.35), 'tmi': (-76.725, 40.153), 'abilene': (-99.78, 32.50), 'memphis': (-90.15, 35.06)})
END, NFR = G.END, G.NFR
# lines: 0 hook · 1 Q · 2 AI runs on power · 3 23% vs homes 28% · 4 double by 2030 · 5 Q · 6 TMI · 7 Meta + Texas · 8 Q · 9 xAI Memphis · 10 CTA · 11 loop

IE, US, MID = (-7.8, 53.2, 150), (-88.0, 37.0, 22), (-45.0, 45.0, 22)
MOVES = [(ls(4, -6), 26, (-20.0, 5.0, 11.5)), (ls(6, -14), 30, US), (ls(11, -22), 24, MID), (ls(11, 2), 24, IE)]
LABELS = [
    ('IRELAND', -8.0, 53.0, 44, False, 100, 999), ('Irish Sea', -5.0, 53.8, 36, True, 100, 999), ('Atlantic Ocean', -10.8, 51.8, 40, True, 100, 999),
    ('Dublin', -6.26, 53.55, 32, False, 100, 999),
    ('UNITED STATES', -97.0, 41.0, 40, False, 15, 60), ('Gulf of Mexico', -90.0, 26.0, 36, True, 15, 60), ('Atlantic Ocean', -68.0, 33.0, 40, True, 15, 60),
    ('Atlantic Ocean', -40.0, 35.0, 44, True, 0, 15),
]
PAINT = {'IRL': (0, 10 ** 6)}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('dublin', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='server', fn=draw_server, xy=(330, 1150), rot=-3, scale=0.85)
    add('piece', f0 + 6, f1, key='pylon', fn=draw_pylon, xy=(700, 1150), rot=3, scale=0.9)
    add('chain', f0 + 12, f1, a=('xy', 420, 1100), b=('xy', 620, 1080), dur=10)
    add('ransom', f0 + 4, f1, text='~1/4', xy=(490, 215), size=180, seed=2)
    add('tag', f0 + 16, f1, text="OF IRELAND'S POWER", xy=(490, 390), rot=-1, size=52)
hook_group(0, ls(1, -2))
add('card', ls(1), ls(3, -2), fig='FIG. 01', lines=['AI Runs on Power'])
add('piece', cl(2, 'power', 1, -2), ls(4, -6), key='pylon', fn=draw_pylon, xy=(700, 1150), rot=3, scale=0.9)
add('note', cl(2, 'grids', 1, -2), ls(3, -2), text="grids can't keep up", size=92, xy=(490, 560), rot=-2)
add('card', ls(3), ls(4, -6), fig='FIG. 02', lines=['Ireland'])
add('ransom', cl(3, 'twenty-three', 1, -2), ls(4, -6), text='23%', xy=(490, 390), size=200, seed=3)
add('tag', cl(3, 'electricity', 1, -2), ls(4, -6), text='DATA CENTRES · 2025', xy=(490, 570), rot=1, size=50)
add('tag', cl(3, 'homes', 1, -2), ls(4, -6), text='ALL HOMES: 28%', xy=(490, 1440), rot=-1, size=54)
add('piece', cl(3, 'twenty-three', 1, 0), ls(4, -6), key='server', fn=draw_server, xy=(330, 1150), rot=-3, scale=0.85)
add('ransom', cl(4, 'double', 1, -2), ls(6, 16), text='x2', xy=(490, 400), size=210, seed=4)
add('tag', cl(4, 'worldwide', 1, -2), ls(6, 16), text='WORLDWIDE BY 2030 (IEA)', xy=(490, 580), rot=1, size=46)
add('note', ls(5, 2), ls(6, 16), text='where from?', size=110, xy=(490, 1440), rot=-3)
add('card', ls(6, 18), ls(8, -2), fig='FIG. 03', lines=['Nuclear Deals'])
add('dot', cl(6, 'three', 1, -2), END, pin=('tmi', 0, 0), top=True)
add('piece', cl(6, 'reactor', 1, -2), ls(7, -2), key='tower', fn=draw_tower, pin=('tmi', -40, -200), rot=-2, scale=0.75)
add('tag', cl(6, 'three', 1, 2), ls(7, -2), text='THREE MILE ISLAND', pin=('tmi', -60, 70), rot=1.5, size=46)
add('tag', cl(6, 'microsoft', 1, -2), ls(7, -2), text='MICROSOFT · 20 YEARS', xy=(490, 560), rot=-1, size=50)
add('ransom', cl(7, 'six', 1, -2), cl(7, 'texas', 1, -2), text='6.6 GW', xy=(490, 400), size=170, seed=5)
add('tag', cl(7, 'meta', 1, -2), cl(7, 'texas', 1, -2), text='META · NUCLEAR DEALS', xy=(490, 570), rot=1, size=48)
add('dot', cl(7, 'texas', 1, -2), END, pin=('abilene', 0, 0), top=True)
add('tag', cl(7, 'texas', 1, 2), ls(8, -2), text='TEXAS AI CAMPUS: 1 GW+', pin=('abilene', 0, 80), rot=-1.5, size=44)
add('card', ls(8), ls(11, -22), fig='FIG. 04', lines=['Not Enough?'])
add('dot', cl(9, 'memphis', 1, -2), END, pin=('memphis', 0, 0), top=True)
add('tag', cl(9, 'memphis', 1, 2), ls(11, -22), text='MEMPHIS · xAI', pin=('memphis', 0, 70), rot=1.5, size=48)
for i, xy in enumerate(((300, 1120), (560, 1220))):
    add('piece', cl(9, 'turbines', 1, -2) + 4 * i, ls(11, -22), key='turbine', fn=draw_turbine, xy=xy, rot=(-3, 3)[i], scale=0.75)
add('tag', cl(9, 'dozens', 1, -2), ls(11, -22), text='DOZENS OF GAS TURBINES', xy=(490, 560), rot=-1, size=46)
add('note', cl(9, 'sued', 1, -2), ls(11, -22), text='sued', size=120, xy=(490, 1440), rot=-3)
hook_group(ls(11, 26), END)
add('tag', NFR - 30, END, text='IRELAND DATA CENTRES: 23% OF', xy=(490, 1400), rot=-1, size=42)          # hidden key text, last second
add('tag', NFR - 30, END, text='METERED ELECTRICITY (CSO 2025)', xy=(490, 1476), rot=1, size=40)

G.finish(IE, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
