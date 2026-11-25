#!/usr/bin/env python3
"""Chip Wars 14 "One Anchor, a Quarter of the Internet" (undersea cables): vertical Short on the shared engine. No logos.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cl, ls, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/14-undersea-cables')
PLACES.update({'rubymar': (42.8, 13.6), 'jeddah': (39.1, 21.5), 'gof': (25.0, 59.9), 'newyork': (-73.99, 40.76), 'cornwall': (-5.5, 50.1),
               'marseille': (5.37, 43.30), 'mumbai': (72.88, 19.08), 'singapore': (103.82, 1.35), 'lisbon': (-9.14, 38.72), 'recife': (-34.9, -8.05),
               'capetown': (18.42, -33.92), 'suez': (32.55, 29.97), 'djibouti': (43.15, 11.59)})
END, NFR = G.END, G.NFR
# lines: 0 hook · 1 Q · 2 cables vs satellites · 3 600 cables · 4 Q Red Sea · 5 2024 anchor · 6 Jeddah + Baltic · 7 Q owners · 8 Big Tech · 9 CTA · 10 loop

RS, WORLD, BAL = (40.5, 18.0, 45), (35.0, 5.0, 11.5), (22.0, 58.0, 55)
MOVES = [(ls(2, -6), 26, WORLD), (ls(4, -6), 26, RS), (cl(6, 'baltic', 1, -16), 28, BAL), (ls(7, -6), 26, WORLD), (ls(10, -20), 26, RS)]
LABELS = [
    ('Red Sea', 38.6, 20.0, 40, True, 30, 999), ('SAUDI ARABIA', 45.0, 24.5, 40, False, 30, 999), ('EGYPT', 30.5, 26.5, 40, False, 30, 999),
    ('SUDAN', 31.5, 16.0, 36, False, 30, 999), ('YEMEN', 46.5, 15.8, 36, False, 30, 999), ('ERITREA', 38.5, 15.6, 30, False, 30, 999),
    ('Baltic Sea', 19.0, 57.0, 40, True, 30, 999), ('FINLAND', 26.0, 63.0, 40, False, 30, 999), ('ESTONIA', 25.5, 58.7, 32, False, 30, 999),
    ('Atlantic Ocean', -35.0, 25.0, 44, True, 0, 30), ('Indian Ocean', 75.0, -10.0, 44, True, 0, 30), ('AFRICA', 20.0, 5.0, 44, False, 0, 30),
]
PAINT = {}
CABLES = [('lisbon', 'recife'), ('marseille', 'suez'), ('djibouti', 'mumbai'), ('mumbai', 'singapore'), ('capetown', 'lisbon')]

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('rubymar', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='ship', fn=draw_ship, xy=(490, 1090), rot=-6, scale=1.0)
    add('piece', f0 + 8, f1, key='cable', fn=draw_cable, xy=(720, 1380), rot=0, scale=0.5)
    add('inkx', f0 + 12, f1, xy=(720, 1380), r=70)
    add('ransom', f0 + 4, f1, text='ONE ANCHOR', xy=(490, 215), size=110, seed=2)
    add('tag', f0 + 16, f1, text='~1/4 OF RED SEA TRAFFIC', xy=(490, 390), rot=-1, size=48)
hook_group(0, ls(1, -2))
add('card', ls(1), ls(4, -6), fig='FIG. 01', lines=['Under the Sea'])
for i, (a, b) in enumerate(CABLES):
    add('dasharc2', ls(2, 10) + 6 * i, ls(4, -6), a=(a, 0, 0), b=(b, 0, 0), bend=0.12, dur=16)
add('piece', cl(2, 'cables', 1, -2), ls(4, -6), key='cable', fn=draw_cable, xy=(490, 1230), rot=0, scale=0.7)
add('tag', cl(2, 'satellites', 1, -2), ls(3, -2), text='SATELLITES: UNDER 1%', xy=(490, 560), rot=1, size=50)
add('ransom', cl(3, 'six', 1, -2), ls(4, -6), text='~600', xy=(490, 390), size=190, seed=3)
add('tag', cl(3, 'ninety-nine', 1, -2), ls(4, -6), text='CABLES · 99%+ OF THE DATA', xy=(490, 570), rot=-1, size=46)
add('card', ls(4, 20), ls(7, -6), fig='FIG. 02', lines=['The Red Sea'])
add('piece', cl(5, 'cargo', 1, -2), cl(6, 'baltic', 1, -16), key='ship', fn=draw_ship, pin=('rubymar', 0, -150), rot=-6, scale=0.8)
add('tag', cl(5, 'missile', 1, -2), cl(6, 'baltic', 1, -16), text='HIT BY A MISSILE · 2024', xy=(490, 560), rot=1, size=46)
add('dasharc2', cl(5, 'dragging', 1, -2), cl(6, 'baltic', 1, -16), a=('rubymar', 0, 0), b=('djibouti', 30, -40), bend=0.3, dur=14)
add('ransom', cl(5, 'three', 1, -2), cl(6, 'twenty-five', 1, -2), text='3 CABLES CUT', xy=(490, 390), size=110, seed=4)
add('dot', cl(6, 'jeddah', 1, -2), cl(6, 'baltic', 1, -16), pin=('jeddah', 0, 0), top=True)
add('inkx', cl(6, 'jeddah', 1, 0), cl(6, 'baltic', 1, -16), pin=('jeddah', 30, -20), r=40)
add('tag', cl(6, 'jeddah', 1, 2), cl(6, 'baltic', 1, -16), text='JEDDAH · 2025', pin=('jeddah', -80, 70), rot=-1.5, size=48)
add('dot', cl(6, 'baltic', 1, 10), ls(7, -6), pin=('gof', 0, 0), top=True)
for i, (dx, dy) in enumerate(((-120, 60), (40, -30), (-260, 160))):
    add('inkx', cl(6, 'damaged', 1, -2) + 3 * i, ls(7, -6), pin=('gof', dx, dy), r=30)
add('tag', cl(6, 'damaged', 1, 2), ls(7, -6), text='BALTIC · SINCE 2023', xy=(490, 1440), rot=1, size=48)
add('card', ls(7, 20), ls(10, -20), fig='FIG. 03', lines=['Who Owns Them?'])
for i, (a, b) in enumerate(CABLES):
    add('dasharc2', ls(7, 26), ls(10, -20), a=(a, 0, 0), b=(b, 0, 0), bend=0.12, dur=10)
for i, txt in enumerate(('GOOGLE', 'META', 'MICROSOFT', 'AMAZON')):
    add('tag', cl(8, txt.lower(), 1, -2), ls(10, -20), text=txt, xy=(290 + (i % 2) * 400, 1150 + (i // 2) * 110), rot=(-2, 1.5, -1, 2)[i], size=54)
add('ransom', cl(8, 'three', 1, -2), ls(10, -20), text='3/4', xy=(490, 390), size=200, seed=5)
add('tag', cl(8, 'bandwidth', 1, -2), ls(10, -20), text='OF INTERNATIONAL BANDWIDTH', xy=(490, 570), rot=1, size=44)
hook_group(ls(10, 8), END)
add('tag', NFR - 30, END, text='99%+ OF INTERCONTINENTAL DATA', xy=(490, 1400), rot=-1, size=42)          # hidden key text, last second
add('tag', NFR - 30, END, text='GOES BY CABLE (TELEGEOGRAPHY)', xy=(490, 1476), rot=1, size=40)

G.finish(RS, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
