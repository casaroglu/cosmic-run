#!/usr/bin/env python3
"""Chip Wars 15 "The 81-Billion-Dollar Bet" (the AI labs + the Anthropic IPO): vertical Short on the shared engine.
Neutral by design (Claude, which helped make this video, is made by Anthropic): no investment advice, no share-price talk,
rivals get one plain fact each. No real person is drawn; no logos. The user reviews this episode's wording before upload.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cl, ls, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/15-ai-labs-ipo')
PLACES.update({'newyork': (-73.99, 40.76), 'sf': (-122.40, 37.79), 'london': (-0.126, 51.535), 'hangzhou': (120.16, 30.27), 'paris': (2.33, 48.87),
               'santaclara': (-121.96, 37.37), 'hsinchu': (120.97, 24.80), 'veldhoven': (5.40, 51.42)})
END, NFR = G.END, G.NFR
# lines: 0 hook · 1 Q · 2 betting · 3 Anthropic listed · 4 Q racing · 5 OpenAI + DeepMind · 6 DeepSeek + Mistral · 7 Q need · 8 chips chain · 9 CTA · 10 loop

NY = (-74.5, 40.8, 60)
SFV, LDN, HZV, PAR, CHAIN = (-100.0, 15.0, 11.5), (-20.0, 15.0, 11.5), (100.0, 15.0, 11.5), (10.0, 15.0, 11.5), (60.0, 15.0, 11.5)
MOVES = [(ls(4, -6), 30, SFV), (cl(5, 'google', 1, -10), 26, LDN), (ls(6, -8), 30, HZV), (cl(6, 'mistral', 1, -10), 28, PAR),
         (ls(8, -6), 24, CHAIN), (ls(10, -20), 30, NY)]
LABELS = [
    ('Atlantic Ocean', -71.5, 36.0, 44, True, 40, 999), ('NEW YORK', -75.5, 42.6, 36, False, 40, 999),
    ('Atlantic Ocean', -40.0, 30.0, 44, True, 0, 20), ('Pacific Ocean', -150.0, 25.0, 40, True, 0, 20), ('Indian Ocean', 75.0, -10.0, 40, True, 0, 20),
]
PAINT = {}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('newyork', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='bell', fn=draw_bell, xy=(490, 1130), rot=-2, scale=1.0)
    add('ransom', f0 + 4, f1, text='$81 BN', xy=(490, 215), size=170, seed=2)
    add('tag', f0 + 16, f1, text='ONE STOCK SALE', xy=(490, 390), rot=-1, size=54)
hook_group(0, ls(1, -2))
add('card', ls(1), ls(3, -2), fig='FIG. 01', lines=['The Bet'])
add('note', cl(2, 'betting', 1, -2), ls(3, -2), text='AI reshapes the economy?', size=90, xy=(490, 560), rot=-2)
add('card', ls(3), ls(4, -6), fig='FIG. 02', lines=['The Listing'])
add('tag', cl(3, 'anthropic', 1, -2), ls(4, -6), text='ANTHROPIC (MAKER OF CLAUDE)', xy=(490, 390), rot=-1, size=44)
add('tag', cl(3, 'nasdaq', 1, -2), ls(4, -6), text='NASDAQ · NOV 2026', xy=(490, 480), rot=1, size=50)
add('note', cl(3, 'biggest', 1, -2), ls(4, -6), text='one of the biggest IPOs', size=90, xy=(490, 1440), rot=-2)
LABS = [('sf', 'OPENAI', 'openai', 5, (150, 70), cl(5, 'google', 1, -10)), ('london', 'GOOGLE DEEPMIND', 'google', 5, (80, 100), ls(6, -8)),
        ('hangzhou', 'DEEPSEEK', 'deepseek', 6, (-150, 90), cl(6, 'mistral', 1, -10)), ('paris', 'MISTRAL', 'mistral', 6, (60, 100), ls(8, -6))]
add('dot', ls(4, 30), END, pin=('sf', 0, 0), top=True)
add('tag', ls(4, 30), cl(5, 'google', 1, -10), text='ANTHROPIC', pin=('sf', 150, -70), rot=1.5, size=44)
for p, txt, w, li, (dx, dy), f1 in LABS:
    add('dot', cl(li, w, 1, -2), END, pin=(p, 0, 0), top=True)
    add('tag', cl(li, w, 1, 2), f1, text=txt, pin=(p, dx, dy), rot=-1.5, size=44)
add('card', ls(4, 30), ls(10, -20), fig='FIG. 03', lines=['The Race'])
add('tag', cl(5, 'reportedly', 1, -2), cl(5, 'google', 1, -2), text='OPENAI: ~$1.25 TN (REPORTED)', xy=(490, 1400), rot=1, size=42)
add('tag', cl(5, 'billion', 1, -2), ls(6, -2), text='GEMINI: 1 BN+ MONTHLY USERS', xy=(490, 1400), rot=-1, size=42)
add('tag', cl(6, 'away', 1, -2), cl(6, 'mistral', 1, -2), text='DEEPSEEK: FREE MODELS', xy=(490, 1400), rot=1, size=46)
add('tag', cl(6, 'asml', 1, -2), ls(7, -2), text='MISTRAL: ASML INVESTS', xy=(490, 1400), rot=-1, size=46)
add('note', ls(7, 2), ls(8, -2), text='what do they need?', size=92, xy=(490, 1440), rot=-2)
add('chip', cl(8, 'chips', 1, -2), ls(10, -20), xy=(300, 1150), rot=-5, scale=0.7)
add('dot', cl(8, 'nvidia', 1, -2), ls(10, -20), pin=('santaclara', 0, 0), top=True)
add('dot', cl(8, 'tsmc', 1, -2), ls(10, -20), pin=('hsinchu', 0, 0), top=True)
add('dot', cl(8, 'dutch', 1, -2), ls(10, -20), pin=('veldhoven', 0, 0), top=True)
add('dasharc2', cl(8, 'tsmc', 1, -4), ls(10, -20), a=('santaclara', 0, 0), b=('hsinchu', 0, 0), bend=0.15, dur=12)
add('dasharc2', cl(8, 'dutch', 1, -4), ls(10, -20), a=('hsinchu', 0, 0), b=('veldhoven', 0, 0), bend=-0.15, dur=12)
add('machine', cl(8, 'machine', 1, -4), ls(10, -20), xy=(680, 1200), rot=-2, width=440)
add('tag', cl(8, 'nvidia', 1, 2), ls(10, -20), text='NVIDIA -> TSMC -> ASML', xy=(490, 390), rot=1, size=50)
hook_group(ls(10, 14), END)
add('tag', NFR - 30, END, text='IPO: $81.3 BN AT $83 · 18 NOV 2026', xy=(490, 1400), rot=-1, size=40)          # hidden key text, last second
add('tag', NFR - 30, END, text='MADE WITH CLAUDE, AN ANTHROPIC AI', xy=(490, 1476), rot=1, size=36)               # disclosure (also in DESCRIPTION.md)

G.finish(NY, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
