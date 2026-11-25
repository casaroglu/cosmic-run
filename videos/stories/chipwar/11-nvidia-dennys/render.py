#!/usr/bin/env python3
"""Chip Wars 11 "Born in a Denny's" (Nvidia's origin): vertical Short on the shared engine. No real person is drawn.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cl, ls, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/11-nvidia-dennys')
PLACES.update({'dennys': (-121.86, 37.38), 'toronto': (-79.40, 43.66)})
END, NFR = G.END, G.NFR
# lines: 0 hook · 1 Q why · 2 because · 3 1993 · 4 2006 CUDA · 5 Q games->AI · 6 AlexNet · 7 rushed · 8 trillions · 9 CTA · 10 plaque (loop)

SJ, NA = (-121.4, 37.6, 120), (-100.0, 35.0, 20)
MOVES = [(ls(6, -10), 30, NA), (ls(10, -16), 30, SJ)]
LABELS = [
    ('San Francisco Bay', -122.25, 37.85, 32, True, 80, 999), ('San Jose', -121.89, 37.25, 36, False, 80, 999), ('Pacific Ocean', -123.2, 36.9, 40, True, 80, 999),
    ('CANADA', -100.0, 57.0, 44, False, 12, 30), ('UNITED STATES', -100.0, 39.0, 40, False, 12, 30), ('Toronto', -79.4, 44.4, 34, False, 12, 30),
    ('Pacific Ocean', -134.0, 27.0, 40, True, 12, 30), ('Atlantic Ocean', -45.0, 30.0, 40, True, 0, 12),
]
PAINT = {}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('dennys', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='booth', fn=draw_booth, xy=(490, 1150), rot=-2, scale=1.1)
    add('chip', f0 + 8, f1, xy=(720, 760), rot=6, scale=0.8)
    add('arrow', f0 + 12, f1, a=('xy', 620, 1000), b=('xy', 700, 880), bend=0.3, dur=8)
    add('ransom', f0 + 4, f1, text="DENNY'S", xy=(490, 210), size=150, seed=2)
    add('tag', f0 + 16, f1, text='WHERE NVIDIA WAS DREAMED UP', xy=(490, 380), rot=-1, size=44)
hook_group(0, ls(1, -2))
add('card', ls(1), ls(3, -2), fig='FIG. 01', lines=['From Games'])
add('piece', cl(2, 'video-game', 1, -4), ls(3, -2), key='gpu', fn=draw_gpu, xy=(490, 1150), rot=-3)
add('tag', cl(2, 'graphics', 1, -2), ls(3, -2), text='VIDEO-GAME GRAPHICS', xy=(490, 1340), rot=1, size=48)
add('tag', cl(2, 'ai', 1, -2), ls(3, -2), text="RUNS MOST OF TODAY'S AI", xy=(490, 560), rot=-1, size=46)
add('card', ls(3), ls(5, -2), fig='FIG. 02', lines=['1993'])
add('ransom', cl(3, 'nineteen', 1, -2), ls(4, -2), text='1993', xy=(490, 380), size=200, seed=3)
add('piece', cl(3, 'three', 1, -2), ls(4, -2), key='booth', fn=draw_booth, xy=(490, 1160), rot=-2)
add('tag', cl(3, 'engineers', 1, -2), ls(4, -2), text='3 ENGINEERS', xy=(490, 560), rot=1, size=56)
add('tag', cl(3, '3d', 1, -2), ls(4, -2), text='A 3D GRAPHICS CHIP', xy=(490, 1400), rot=-1, size=48)
add('ransom', cl(4, 'two', 1, -2), ls(5, -2), text='2006', xy=(490, 380), size=200, seed=4)
add('tag', cl(4, 'cuda', 1, -2), ls(5, -2), text='CUDA', xy=(490, 560), rot=-1, size=70)
add('piece', cl(4, 'cuda', 1, 0), ls(5, -2), key='gpu', fn=draw_gpu, xy=(490, 1150), rot=3)
add('note', cl(4, 'maths', 1, -4), ls(5, -2), text='any maths', size=110, xy=(490, 1440), rot=-3)
add('card', ls(5), ls(8, -10), fig='FIG. 03', lines=['AlexNet, 2012'])
add('note', ls(5, 2), ls(6, -2), text='games -> AI?', size=104, xy=(490, 560), rot=-3)
add('dot', cl(6, 'toronto', 1, -2), END, pin=('toronto', 0, 0), top=True)
add('tag', cl(6, 'toronto', 1, 2), ls(8, -10), text='TORONTO', pin=('toronto', 0, 70), rot=1.5, size=50)
add('ransom', cl(6, 'two', 1, -2), ls(8, -10), text='2 GAMING CARDS', xy=(490, 380), size=96, seed=5)
add('piece', cl(6, 'two', 1, -2), ls(8, -10), key='gpu', fn=draw_gpu, xy=(330, 1150), rot=-4, scale=0.75)
add('piece', cl(6, 'gaming', 1, -2), ls(8, -10), key='gpu', fn=draw_gpu, xy=(650, 1240), rot=4, scale=0.75)
add('note', cl(6, 'crushed', 1, -2), ls(7, -2), text='crushed it', size=110, xy=(490, 1450), rot=-3)
add('arrow', cl(7, 'rushed', 1, -2), ls(8, -10), a=('toronto', -30, -10), b=('dennys', 40, -20), bend=-0.25, dur=12)
add('tag', cl(7, 'researchers', 1, -2), ls(8, -10), text='AI RESEARCHERS', xy=(490, 1440), rot=-1, size=50)
add('card', ls(8), ls(10, -16), fig='FIG. 04', lines=['Trillions'])
add('ransom', cl(8, 'one', 1, -2), cl(8, 'five', 1, -2), text='$1 TRILLION', xy=(490, 380), size=110, seed=6)
add('tag', cl(8, 'twenty-three', 1, -2), cl(8, 'five', 1, -2), text='2023', xy=(490, 540), rot=1, size=60)
add('ransom', cl(8, 'five', 1, -2), ls(10, -16), text='$5 TRILLION', xy=(490, 380), size=110, seed=7)
add('tag', cl(8, 'five', 1, -2), ls(10, -16), text='FIRST EVER · OCT 2025', xy=(490, 540), rot=-1, size=50)
for i, xy in enumerate(((300, 1150), (490, 1210), (680, 1150))):
    add('chip', cl(8, 'five', 1, 2) + 3 * i, ls(10, -16), xy=xy, rot=(-6, 2, 7)[i], scale=0.6)
hook_group(ls(10, -6), END)
add('tag', cl(10, 'plaque', 1, -2), NFR - 32, text='PLAQUE · 2023', xy=(490, 1400), rot=1, size=50)
add('tag', NFR - 30, END, text='NVIDIA: FIRST $5 TRILLION', xy=(490, 1400), rot=-1, size=46)          # hidden key text, last second
add('tag', NFR - 30, END, text='COMPANY (29 OCT 2025)', xy=(490, 1476), rot=1, size=42)

G.finish(SJ, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
