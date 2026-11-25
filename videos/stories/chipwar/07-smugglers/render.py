#!/usr/bin/env python3
"""Chip Wars 07 "The Chip Smugglers": vertical Short on the shared engine.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/07-smugglers')
PLACES.update({'kualalumpur': (101.69, 3.14), 'bangkok': (100.50, 13.75), 'singapore': (103.82, 1.35), 'shenzhen': (114.06, 22.54),
               'hongkong': (114.17, 22.32), 'beijing': (116.40, 39.90)})
END, NFR = G.END, G.NFR

SEA = (108.0, 16.0, 26)           # South-East Asia and south China
CNZ = (112.0, 28.0, 30)
MOVES = [(cue('march', 1, -6), 22, CNZ), (cue('and', 5, -14), 22, SEA)]
LABELS = [
    ('CHINA', 104.0, 27.5, 48, False, 20, 60), ('MALAYSIA', 102.2, 4.6, 40, False, 20, 60), ('THAILAND', 101.0, 16.0, 40, False, 20, 60),
    ('VIETNAM', 106.6, 14.5, 34, False, 20, 60), ('South China Sea', 114.0, 13.0, 36, True, 20, 60), ('INDONESIA', 113.0, -1.5, 36, False, 20, 60),
    ('Pacific Ocean', 125.0, 20.0, 36, True, 20, 60),
]
PAINT = {'CHN': (cue('china', 1, -2), cue('and', 5, -14))}

def hook_group(f0, f1):
    add('piece', f0, f1, key='box', fn=draw_box, xy=(490, 830), rot=-4, scale=1.2)
    add('tag', f0 + 4, f1, text='NVIDIA', xy=(450, 845), rot=-4, size=56)
    add('inkx', f0 + 10, f1, xy=(450, 845), r=90)
    add('tag', f0 + 14, f1, text='"SANDKYAN"', xy=(520, 960), rot=3, size=56)
    add('chip', f0 + 6, f1, xy=(760, 1180), rot=8, scale=0.7)
    add('ransom', f0 + 4, f1, text='FAKE BRAND', xy=(490, 220), size=104, seed=2)
    add('tag', f0 + 18, f1, text='AI CHIPS TO CHINA', xy=(490, 390), rot=-1, size=52)
hook_group(0, cue('why', 1, -2))
# why: banned + huge demand
add('card', cue('why', 1, 0), cue('in', 2, -2), fig='FIG. 01', lines=['Why Smuggle?'])
add('chip', cue('why', 1, -2), cue('in', 2, -2), xy=(490, 1150), rot=4, scale=0.9)
add('inkx', cue('banned', 1, -2), cue('in', 2, -2), xy=(490, 1150), r=120)
add('tag', cue('banned', 1, 2), cue('in', 2, -2), text='BANNED IN CHINA', xy=(490, 560), rot=1, size=52)
add('note', cue('demand', 1, -2), cue('in', 2, -2), text='huge demand', size=104, xy=(490, 1440), rot=-2)
# Operation Gatekeeper: $160M+, guilty plea
add('card', cue('in', 2, 0), cue('how', 1, -2), fig='FIG. 02', lines=['$160 Million'])
add('ransom', cue('hundred', 1, -4), cue('how', 1, -2), text='$160M+', xy=(490, 400), size=170, seed=3)
add('piece', cue('worth', 1, -2), cue('how', 1, -2), key='box', fn=draw_box, xy=(330, 1060), rot=-4, scale=0.9)
add('piece', cue('worth', 1, 4), cue('how', 1, -2), key='box', fn=draw_box, xy=(650, 1130), rot=5, scale=0.9)
add('tag', cue('computer', 1, -2), cue('how', 1, -2), text='"COMPUTER PARTS"', xy=(490, 1300), rot=-1.5, size=50)
add('tag', cue('guilty', 1, -2), cue('how', 1, -2), text='GUILTY PLEA · 2025', xy=(490, 580), rot=1, size=50)
# the route through South-East Asia
add('card', cue('how', 1, 0), cue('march', 1, -6), fig='FIG. 03', lines=['The Route'])
add('arrow', cue('through', 2, -2), cue('march', 1, -6), a=('xy', 960, 1450), b=('kualalumpur', 20, 10), bend=0.2, dur=12)
add('dot', cue('south-east', 1, -2), cue('march', 1, -6), pin=('kualalumpur', 0, 0), top=True)
add('dot', cue('south-east', 1, 2), cue('march', 1, -6), pin=('bangkok', 0, 0), top=True)
add('arrow', cue('asia', 1, 0), cue('march', 1, -6), a=('kualalumpur', 0, -20), b=('shenzhen', -10, 20), bend=0.25, dur=12)
add('tag', cue('south-east', 1, 4), cue('march', 1, -6), text='MALAYSIA · THAILAND', xy=(490, 1440), rot=-1, size=48)
add('piece', cue('supercomputers', 1, -2), cue('march', 1, -6), key='server', fn=draw_server, xy=(760, 680), rot=4, scale=0.8)
add('tag', cue('packed', 1, 0), cue('march', 1, -6), text='NVIDIA INSIDE', xy=(760, 900), rot=2, size=48)
add('inkx', cue('caught', 1, 0), cue('march', 1, -6), xy=(760, 680), r=110)
add('tag', cue('caught', 1, 4), cue('march', 1, -6), text='CAUGHT', xy=(300, 560), rot=-2, size=60)
# Supermicro: $2.5 bn alleged, dummy servers; pleas
add('card', cue('march', 1, 0), cue('and', 5, -14), fig='FIG. 04', lines=['$2.5 Billion?'])
add('ransom', cue('two', 1, -4), cue('and', 5, -14), text='$2.5 BN', xy=(490, 400), size=160, seed=4)
add('tag', cue('allege', 1, -2), cue('and', 5, -14), text='ALLEGED', xy=(490, 570), rot=-1.5, size=60)
add('tag', cue('supermicro', 1, -2), cue('and', 5, -14), text='SUPERMICRO CO-FOUNDER', xy=(490, 660), rot=1, size=44)
add('piece', cue('servers', 1, -2), cue('and', 5, -14), key='server', fn=draw_server, xy=(300, 1060), rot=-3, scale=0.75)
add('piece', cue('dummy', 1, -2), cue('and', 5, -14), key='server', fn=draw_server, xy=(680, 1080), rot=4, scale=0.75)
add('note', cue('dummy', 1, 2), cue('and', 5, -14), text='dummy?', size=110, xy=(680, 1300), rot=-3)
add('tag', cue('co-defendant', 1, -2), cue('and', 5, -14), text='1 CO-DEFENDANT: GUILTY', xy=(490, 1400), rot=-1, size=44)
add('tag', cue('not', 1, -2), cue('and', 5, -14), text='CO-FOUNDER: NOT GUILTY', xy=(490, 1480), rot=1, size=44)
# the loop
hook_group(cue('and', 5, 10), END)
add('tag', NFR - 30, END, text='OPERATION GATEKEEPER', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', NFR - 30, END, text='$160M+ · GUILTY PLEA (OCT 2025)', xy=(490, 1476), rot=1, size=38)

G.finish(SEA, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
