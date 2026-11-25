#!/usr/bin/env python3
"""Chip Wars 09 "The Magnets That Stopped a Car Factory" (rare earths): vertical Short on the shared engine.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/09-rare-earths')
PLACES.update({'chicago': (-87.56, 41.69), 'mountainpass': (-115.53, 35.48), 'kuantan': (103.38, 3.97), 'bayanobo': (109.97, 41.80)})
END, NFR = G.END, G.NFR

US, CN, MY, MID = (-99.0, 38.0, 18), (108.0, 33.0, 24), (105.0, 12.0, 26), (5.0, 40.0, 12)
def hop(f, tgt): return [(f, 18, MID), (f + 18, 22, tgt)]
MOVES = (hop(cue('china', 1, -14), CN) + hop(cue('within', 1, -14), US) + [(cue('malaysia', 1, -10), 30, MY), (cue('but', 1, -8), 22, CN)]
         + hop(cue("that's", 1, -16), US))
LABELS = [
    ('CANADA', -100.0, 57.0, 44, False, 15, 21), ('MEXICO', -103.0, 23.5, 40, False, 15, 21), ('Pacific Ocean', -134.0, 27.0, 40, True, 15, 21),
    ('CHINA', 101.0, 31.0, 48, False, 21, 25), ('MONGOLIA', 103.5, 46.5, 40, False, 21, 25), ('INDIA', 80.0, 23.0, 40, False, 21, 25),
    ('MALAYSIA', 102.0, 5.5, 40, False, 25, 60), ('THAILAND', 101.0, 16.0, 40, False, 25, 60), ('South China Sea', 112.5, 11.0, 36, True, 25, 60),
]
PAINT = {'CHN': (cue('china', 1, -2), cue("that's", 1, -16))}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('chicago', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='magnets', fn=draw_magnets, xy=(380, 800), rot=-4, scale=1.0)
    add('piece', f0 + 6, f1, key='car', fn=draw_car, xy=(560, 1220), rot=3, scale=0.95)
    add('chain', f0 + 12, f1, a=('xy', 420, 930), b=('xy', 540, 1110), dur=10)
    add('arrow', f0 + 10, f1, a=('xy', 520, 680), b=('chicago', -10, 16), bend=0.2, dur=10)
    add('ransom', f0 + 4, f1, text='MAGNETS', xy=(490, 215), size=140, seed=2)
    add('tag', f0 + 16, f1, text='HALTED A FORD PLANT', xy=(490, 390), rot=-1, size=50)
hook_group(0, cue('how', 1, -2))
add('inkx', cue('halted', 1, 0), cue('how', 1, -2), xy=(560, 1220), r=110)
# what rare-earth magnets are for
add('card', cue('how', 1, 0), cue('china', 1, -14), fig='FIG. 01', lines=['Tiny Magnets'])
add('piece', cue('how', 1, -2), cue('china', 1, -14), key='magnets', fn=draw_magnets, xy=(490, 800), rot=-4, scale=1.0)
for i, (w, txt, xy) in enumerate((('motors', 'ELECTRIC MOTORS', (490, 1080)), ('cars', 'CARS', (250, 1180)), ('drones', 'DRONES', (720, 1180)), ('turbines', 'WIND TURBINES', (490, 1290)))):
    add('tag', cue(w, 1, -2), cue('china', 1, -14), text=txt, xy=xy, rot=(-2, 1.5, -1, 2)[i], size=52)
# China: 94 %
add('ransom', cue('ninety-four', 1, -2), cue('in', 3, -2), text='94%', xy=(490, 400), size=210, seed=3)
add('tag', cue('them', 1, -6), cue('in', 3, -2), text='OF THE MAGNETS: CHINA', xy=(490, 580), rot=1, size=46)
add('dot', cue('ninety-four', 1, 0), cue("that's", 1, -16), pin=('bayanobo', 0, 0), top=True)
# April 2025 licences, May -74 %
add('card', cue('in', 3, 0), cue('within', 1, -14), fig='FIG. 02', lines=['April 2025'])
add('doc', cue('licence', 1, -4), cue('within', 1, -14), xy=(300, 1080), rot=-6, scale=0.8, title='LICENCE')
add('tag', cue('seven', 1, -2), cue('in', 4, -2), text='7 RARE EARTHS', xy=(490, 560), rot=-1, size=52)
add('ransom', cue('seventy-four', 1, -2), cue('within', 1, -14), text='-74%', xy=(490, 400), size=200, seed=4)
add('tag', cue('exports', 1, -2), cue('within', 1, -14), text='MAGNET EXPORTS · MAY', xy=(490, 580), rot=1, size=48)
add('piece', cue('exports', 1, 0), cue('within', 1, -14), key='magnets', fn=draw_magnets, xy=(680, 1150), rot=6, scale=0.7)
add('arrow', cue('month', 1, -6), cue('within', 1, -14), a=('xy', 830, 980), b=('xy', 830, 1300), bend=0.0, dur=8)
# factories stop
add('card', cue('within', 1, 8), cue('can', 1, -2), fig='FIG. 03', lines=['Factories Stop'])
add('piece', cue('ford', 2, -2), cue('can', 1, -2), key='fab', fn=draw_fab, pin=('chicago', -60, -170), rot=-3, scale=0.7)
add('inkx', cue('idled', 1, 0), cue('can', 1, -2), pin=('chicago', -60, -170), r=90)
add('tag', cue('chicago', 2, -2), cue('can', 1, -2), text='FORD · CHICAGO', pin=('chicago', -40, 60), rot=1.5, size=50)
add('tag', cue('european', 1, -2), cue('can', 1, -2), text='EUROPE: LINES SHUT', xy=(490, 1440), rot=-1, size=48)
add('arrow', cue('european', 1, 0), cue('can', 1, -2), a=('chicago', 40, 0), b=('xy', 930, 760), bend=-0.2, dur=10)
# the West tries: a California mine, Lynas in Malaysia
add('card', cue('can', 1, 0), cue('but', 1, -8), fig='FIG. 04', lines=['Plan B'])
add('dot', cue('california', 1, -2), cue('malaysia', 1, -10), pin=('mountainpass', 0, 0), top=True)
add('piece', cue('california', 1, -2), cue('malaysia', 1, -10), key='cart', fn=draw_cart, pin=('mountainpass', 40, -150), rot=-3, scale=0.7)
add('tag', cue('mine', 1, -2), cue('malaysia', 1, -10), text='CALIFORNIA MINE', pin=('mountainpass', 60, 70), rot=1.5, size=48)
add('tag', cue('pentagon', 1, -2), cue('malaysia', 1, -10), text='PENTAGON STAKE', xy=(490, 560), rot=-1, size=50)
add('tag', cue('minimum', 1, -2), cue('malaysia', 1, -10), text='+ MINIMUM PRICE', xy=(490, 640), rot=1, size=48)
add('dot', cue('lynas', 1, -2), cue('but', 1, -8), pin=('kuantan', 0, 0), top=True)
add('piece', cue('lynas', 1, -2), cue('but', 1, -8), key='fab', fn=draw_fab, pin=('kuantan', 0, -170), rot=2, scale=0.65)
add('tag', cue('lynas', 1, 2), cue('but', 1, -8), text='LYNAS · MALAYSIA', pin=('kuantan', 0, 70), rot=-1.5, size=50)
add('ransom', cue('first', 1, -2), cue('but', 1, -8), text='FIRST', xy=(490, 400), size=170, seed=5)
add('tag', cue('heavy', 1, -2), cue('but', 1, -8), text='HEAVY RARE EARTHS', xy=(490, 580), rot=1, size=48)
# but still 94 %
add('ransom', cue('ninety-four', 2, -2), cue("that's", 1, -16), text='94%', xy=(490, 400), size=210, seed=3)
add('tag', cue('magnets', 4, -2), cue("that's", 1, -16), text='STILL FROM CHINA', xy=(490, 580), rot=-1, size=50)
add('note', cue('country', 1, -4), cue("that's", 1, -16), text='one country', size=110, xy=(490, 1440), rot=-3)
# the loop
hook_group(cue("that's", 1, 20), END)
add('inkx', cue("that's", 1, 30), END, xy=(560, 1220), r=110)
add('tag', NFR - 30, END, text='CHINA MAKES 94% OF', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', NFR - 30, END, text='RARE-EARTH MAGNETS (IEA)', xy=(490, 1476), rot=1, size=42)

G.finish(US, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
