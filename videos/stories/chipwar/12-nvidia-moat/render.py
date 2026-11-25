#!/usr/bin/env python3
"""Chip Wars 12 "Why Nobody Can Catch Nvidia": vertical Short on the shared engine. No real person is drawn; no logos.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cl, ls, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/12-nvidia-moat')
PLACES.update({'santaclara': (-121.96, 37.37), 'mountainview': (-122.08, 37.42), 'seattle': (-122.33, 47.61), 'zhunan': (120.88, 24.68)})
END, NFR = G.END, G.NFR
# lines: 0 hook $100bn+ · 1 Q · 2 eight in ten · 3 Q rivals · 4 CUDA · 5 Google/Amazon · 6 Q lose · 7 queue at TSMC · 8 biggest place · 9 CTA · 10 loop

USW, TW, MID = (-112.0, 40.0, 30), (120.6, 24.4, 150), (0.0, 5.0, 11.5)
MOVES = [(ls(7, -18), 24, MID), (ls(7, 6), 26, TW), (ls(10, -20), 22, MID), (ls(10, 2), 24, USW)]
LABELS = [
    ('Pacific Ocean', -130.0, 33.0, 40, True, 20, 60), ('UNITED STATES', -106.0, 39.0, 40, False, 20, 60), ('CANADA', -112.0, 52.5, 40, False, 20, 60),
    ('MEXICO', -104.0, 27.0, 36, False, 20, 60),
    ('TAIWAN', 121.0, 22.9, 44, False, 120, 999), ('CHINA', 118.3, 26.7, 44, False, 120, 999), ('Taiwan Strait', 119.3, 23.6, 40, True, 120, 999),
]
PAINT = {'TWN': (ls(7, 6), ls(10, -20))}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('santaclara', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='server', fn=draw_server, xy=(330, 1120), rot=-3, scale=0.9)
    add('piece', f0 + 6, f1, key='server', fn=draw_server, xy=(650, 1150), rot=4, scale=0.9)
    add('chip', f0 + 10, f1, xy=(490, 800), rot=5, scale=0.85)
    add('ransom', f0 + 4, f1, text='$100 BN+', xy=(490, 215), size=150, seed=2)
    add('tag', f0 + 16, f1, text='DATA CENTRES · 3 MONTHS', xy=(490, 390), rot=-1, size=48)
hook_group(0, ls(1, -2))
add('card', ls(1), ls(3, -2), fig='FIG. 01', lines=['One Supplier'])
add('ransom', cl(2, 'eight', 1, -2), ls(3, -2), text='8 IN 10', xy=(490, 390), size=170, seed=3)
add('tag', cl(2, 'chips', 1, -2), ls(3, -2), text="AI CHIPS ARE NVIDIA'S", xy=(490, 570), rot=1, size=48)
add('tag', cl(2, 'analysts', 1, -2), ls(3, -2), text="ANALYSTS' ESTIMATE", xy=(490, 650), rot=-1, size=44)
for i, xy in enumerate(((250, 1100), (420, 1180), (590, 1100), (760, 1180))):
    add('chip', cl(2, 'eight', 1, 2) + 3 * i, ls(3, -2), xy=xy, rot=(-6, 3, -2, 6)[i], scale=0.5)
add('card', ls(3), ls(5, -2), fig='FIG. 02', lines=['The Moat'])
add('tag', cl(4, 'cuda', 1, -2), ls(5, -2), text='CUDA', xy=(490, 380), rot=-1, size=80)
add('tag', cl(4, 'twenty', 1, -2), ls(5, -2), text='20 YEARS OLD', xy=(490, 500), rot=1, size=52)
add('ransom', cl(4, 'eleven', 1, -2), ls(5, -2), text='11M', xy=(490, 1060), size=200, seed=4)
add('tag', cl(4, 'developers', 1, -2), ls(5, -2), text='DEVELOPERS (NVIDIA SAYS)', xy=(490, 1230), rot=-1, size=46)
add('note', cl(4, 'rewriting', 1, -2), ls(5, -2), text='rewrite everything?', size=92, xy=(490, 1440), rot=-2)
add('card', ls(5), ls(7, -18), fig='FIG. 03', lines=['The Rivals'])
add('dot', cl(5, 'google', 1, -2), END, pin=('mountainview', 0, 0), top=True)
add('tag', cl(5, 'google', 1, 2), ls(7, -18), text='GOOGLE CHIPS', pin=('mountainview', -40, 110), rot=-1.5, size=48)
add('dot', cl(5, 'amazon', 1, -2), END, pin=('seattle', 0, 0), top=True)
add('tag', cl(5, 'amazon', 1, 2), ls(7, -18), text='AMAZON CHIPS', pin=('seattle', 120, -60), rot=1.5, size=48)
add('ransom', cl(5, 'hundreds', 1, -2), ls(7, -18), text='100,000S', xy=(490, 390), size=140, seed=5)
add('tag', cl(5, 'rent', 1, -2), ls(7, -18), text='RENTED BY AI LABS', xy=(490, 560), rot=1, size=50)
add('note', ls(6, 2), ls(7, -18), text='could Nvidia lose?', size=92, xy=(490, 1440), rot=-2)
add('card', ls(7, 30), ls(10, -20), fig='FIG. 04', lines=['One Queue'])
add('dot', ls(7, 30), END, pin=('zhunan', 0, 0), top=True)
add('tag', cl(7, "tsmc's", 1, 0), ls(10, -20), text='TSMC PACKAGING', pin=('zhunan', -300, 0), rot=-1.5, size=48)
for i, (txt, y) in enumerate((('NVIDIA', 1060), ('GOOGLE', 1150), ('AMAZON', 1240), ('AMD', 1330))):
    add('tag', cl(7, 'queue', 1, -2) + 4 * i, ls(10, -20), text=txt, xy=(300 + i * 40, y), rot=(-2, 1.5, -1, 2)[i], size=50)
add('arrow', cl(7, 'queue', 1, 14), ls(10, -20), a=('xy', 560, 1100), b=('zhunan', -10, 10), bend=-0.3, dur=10)
add('circle', cl(8, 'biggest', 1, -2), ls(10, -20), xy=(300, 1060), rx=150, ry=50, dur=10, top=True)
add('tag', cl(8, 'analysts', 1, -2), ls(10, -20), text='BIGGEST PLACE (ANALYSTS)', xy=(490, 560), rot=1, size=44)
hook_group(ls(10, 22), END)
add('tag', NFR - 30, END, text='Q3 FY2027: $107.6 BN', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', NFR - 30, END, text='DATA CENTRE REVENUE (NVIDIA)', xy=(490, 1476), rot=1, size=40)

G.finish(USW, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
