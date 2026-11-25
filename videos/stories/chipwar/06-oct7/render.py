#!/usr/bin/env python3
"""Chip Wars 06 "The Day Washington Pulled the Plug" (7 Oct 2022 export controls): vertical Short on the shared engine.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/06-oct7')
PLACES.update({'washington': (-77.04, 38.90), 'santaclara': (-121.96, 37.37), 'beijing': (116.40, 39.90)})
END, NFR = G.END, G.NFR

US, CN = (-99.0, 38.5, 18), (112.0, 35.0, 30)
MID = (10.0, 40.0, 13)
MOVES = [(cue('china', 4, -10), 22, MID), (cue('china', 4, 12), 22, CN), (cue('all', 1, -16), 22, MID), (cue('all', 1, 6), 22, US)]
LABELS = [
    ('CANADA', -100.0, 57.0, 44, False, 15, 25), ('MEXICO', -103.0, 23.5, 40, False, 15, 25), ('Pacific Ocean', -134.0, 27.0, 40, True, 15, 25),
    ('Atlantic Ocean', -58.0, 31.0, 40, True, 15, 25),
    ('CHINA', 103.0, 34.0, 48, False, 25, 60), ('MONGOLIA', 104.0, 46.5, 36, False, 25, 60), ('Yellow Sea', 123.5, 35.4, 30, True, 25, 60),
]
PAINT = {'USA': (0, 10 ** 6), 'CHN': (cue('china', 4, 12), cue('all', 1, -16))}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('washington', 0, 0), top=True)
    add('chip', f0 + 2, f1, xy=(490, 780), rot=4, scale=1.1)
    add('doc', f0 + 6, f1, xy=(760, 1190), rot=-6, scale=0.8, title='RULE')
    add('arrow', f0 + 10, f1, a=('washington', -10, 20), b=('xy', 760, 1060), bend=0.25, dur=10)
    add('inkx', f0 + 12, f1, xy=(490, 780), r=150)
    add('ransom', f0 + 4, f1, text='NO CHIPS', xy=(490, 215), size=130, seed=2)
    add('tag', f0 + 16, f1, text='FOR CHINA', xy=(490, 380), rot=-1, size=56)
hook_group(0, cue('why', 1, -2))
# why chips matter
add('card', cue('why', 1, 0), cue('so', 1, -2), fig='FIG. 01', lines=['Why Chips?'])
add('chip', cue('why', 1, -2), cue('so', 1, -2), xy=(490, 780), rot=4, scale=1.1)
add('tag', cue('train', 1, -2), cue('so', 1, -2), text='BEST CHIPS, BEST AI', xy=(490, 560), rot=1, size=50)
add('tag', cue('business', 1, -2), cue('so', 1, -2), text='BUSINESS', xy=(290, 1180), rot=-2, size=56)
add('tag', cue('military', 1, -2), cue('so', 1, -2), text='MILITARY', xy=(690, 1260), rot=2, size=56)
# 7 October 2022
add('card', cue('so', 1, 0), cue('what', 1, -2), fig='FIG. 02', lines=['7 Oct 2022'])
add('ransom', cue('seventh', 1, -2), cue('what', 1, -2), text='7 OCT 2022', xy=(490, 390), size=100, seed=3)
add('doc', cue('washington', 1, -2), cue('what', 1, -2), xy=(300, 1080), rot=-6, scale=0.8, title='RULE')
add('tag', cue('washington', 1, 2), cue('what', 1, -2), text='US EXPORT RULE', xy=(300, 1300), rot=-1.5, size=46)
add('chip', cue("nvidia's", 1, -2), cue('what', 1, -2), xy=(700, 1050), rot=5, scale=0.85)
add('inkx', cue('blocked', 1, 0), cue('what', 1, -2), xy=(700, 1050), r=120)
add('tag', cue('top', 1, 0), cue('what', 1, -2), text='A100 · H100', xy=(700, 1270), rot=1.5, size=50)
add('tag', cue('tools', 1, -2), cue('what', 1, -2), text='+ CHIPMAKING TOOLS', xy=(490, 1440), rot=-1, size=46)
# Nvidia's China chips, rule after rule
add('card', cue('what', 1, 0), cue('and', 3, -2), fig='FIG. 03', lines=['Plan B, Plan C'])
add('dot', cue('nvidia', 1, -2), cue('and', 3, -2), pin=('santaclara', 0, 0), top=True)
add('tag', cue('nvidia', 1, 2), cue('and', 3, -2), text='NVIDIA', pin=('santaclara', 160, -70), rot=1.5, size=50)
add('chip', cue('slower', 1, -2), cue('and', 3, -2), xy=(260, 940), rot=-5, scale=0.75)
add('tag', cue('slower', 1, 2), cue('and', 3, -2), text='A800 · H800', xy=(260, 1140), rot=-1.5, size=48)
add('inkx', cue('tightened', 1, -2), cue('and', 3, -2), xy=(260, 940), r=100)
add('chip', cue('another', 1, -2), cue('and', 3, -2), xy=(720, 940), rot=5, scale=0.75)
add('tag', cue('another', 1, 2), cue('and', 3, -2), text='H20', xy=(720, 1140), rot=1.5, size=54)
add('inkx', cue('licence', 1, -2), cue('and', 3, -2), xy=(720, 940), r=100)
add('ransom', cue('four', 1, -2), cue('and', 3, -2), text='$4.5 BN', xy=(490, 400), size=150, seed=4)
add('tag', cue('wrote', 1, 0), cue('and', 3, -2), text='WRITTEN OFF · 2025', xy=(490, 560), rot=1, size=48)
# a 25 % cut on H200 sales
add('card', cue('and', 3, 0), cue('all', 1, -16), fig='FIG. 04', lines=['A 25% Cut'])
add('ransom', cue('twenty-five', 2, -2), cue('china', 4, -10), text='25%', xy=(490, 400), size=210, seed=5)
add('tag', cue('december', 1, 0), cue('china', 4, -10), text='H200 · DEC 2025', xy=(490, 580), rot=-1, size=50)
add('chip', cue('and', 3, 4), cue('china', 4, -10), xy=(490, 1060), rot=-4, scale=0.9)
add('note', cue('and', 3, 6), cue('december', 1, -2), text='and now?', size=110, xy=(490, 560), rot=-3)
add('dasharc2', cue('allowed', 1, 2), cue('china', 4, -10), a=('washington', 0, 0), b=('xy', 960, 640), bend=-0.15, dur=14)
add('note', cue('tax', 1, -4), cue('china', 4, -10), text='a tax?', size=110, xy=(490, 1440), rot=-3)
# China: barely let them in; shipments stopped
add('crate', cue('barely', 1, -2), cue('all', 1, -16), pin=('beijing', 0, -60), rot=-3)
add('tag', cue('barely', 1, 4), cue('all', 1, -16), text='BARELY LET IN', pin=('beijing', 0, 60), rot=1.5, size=48)
add('inkx', cue('stopped', 1, -2), cue('all', 1, -16), pin=('beijing', 0, -60), r=60)
add('ransom', cue('stopped', 1, -2), cue('all', 1, -16), text='STOPPED', xy=(490, 380), size=130, seed=6)
add('tag', cue('november', 1, 0), cue('all', 1, -16), text='NVIDIA · NOV 2026', xy=(490, 1440), rot=-1, size=50)
# the loop
hook_group(cue('all', 1, 22), END)
add('tag', NFR - 30, END, text='US TAKES 25% OF H200', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', NFR - 30, END, text='SALES TO CHINA (DEC 2025)', xy=(490, 1476), rot=1, size=40)

G.finish(US, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
