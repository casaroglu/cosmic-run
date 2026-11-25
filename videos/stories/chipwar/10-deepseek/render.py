#!/usr/bin/env python3
"""Chip Wars 10 "The App That Wiped 590 Billion" (DeepSeek): vertical Short on the shared engine.
usage: ~/cizgi/.venv/bin/python render.py sheet | frame N | video"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '_shorts'))
import engine as G
from engine import add, cue, PLACES
from pieces import *          # noqa: F401,F403
G.init(HERE, '~/cosmic-run/videos/out/chipwar/10-deepseek')
PLACES.update({'newyork': (-73.99, 40.76), 'hangzhou': (120.16, 30.27)})
END, NFR = G.END, G.NFR

NY, HZ, MID = (-80.0, 39.0, 30), (116.0, 30.5, 30), (20.0, 35.0, 12)
def hop(f, tgt): return [(f, 18, MID), (f + 18, 22, tgt)]
MOVES = hop(cue('in', 2, -14), HZ) + hop(cue("that's", 1, -16), NY)
LABELS = [
    ('Atlantic Ocean', -64.0, 33.0, 40, True, 20, 60), ('UNITED STATES', -86.0, 36.0, 40, False, 20, 60), ('CANADA', -78.0, 50.0, 40, False, 20, 60),
    ('CHINA', 108.0, 33.0, 48, False, 20, 60), ('East China Sea', 125.0, 28.0, 32, True, 20, 60), ('Yellow Sea', 123.0, 35.5, 30, True, 20, 60),
]
PAINT = {'CHN': (cue('hangzhou', 1, -2), cue("that's", 1, -16))}

def hook_group(f0, f1):
    add('dot', f0, f1, pin=('newyork', 0, 0), top=True)
    add('piece', f0 + 2, f1, key='chart', fn=draw_downchart, xy=(490, 860), rot=-3, screen=False, scale=1.1)
    add('phone', f0 + 8, f1, xy=(270, 1250), rot=-8, scale=0.65)
    add('arrow', f0 + 12, f1, a=('xy', 760, 760), b=('xy', 760, 1100), bend=0.0, dur=8)
    add('ransom', f0 + 4, f1, text='-$590 BN', xy=(490, 215), size=130, seed=2)
    add('tag', f0 + 16, f1, text='NVIDIA · ONE DAY', xy=(490, 390), rot=-1, size=54)
    add('tag', f0 + 20, f1, text='A FREE APP', xy=(620, 1300), rot=2, size=50)
hook_group(0, cue('how', 1, -2))
# the bet: AI needs ever more chips
add('card', cue('how', 1, 0), cue('in', 2, -14), fig='FIG. 01', lines=['The Bet'])
for i, xy in enumerate(((300, 900), (490, 960), (680, 900))):
    add('chip', cue('nvidia', 2, -2) + 3 * i, cue('in', 2, -14), xy=xy, rot=(-6, 2, 7)[i], scale=0.6)
add('tag', cue('believed', 1, -2), cue('in', 2, -14), text='MORE AI = MORE CHIPS', xy=(490, 560), rot=1, size=48)
add('inkx', cue('otherwise', 1, -2), cue('in', 2, -14), xy=(490, 930), r=200)
add('note', cue('deepseek', 1, -2), cue('in', 2, -14), text='or not?', size=110, xy=(490, 1300), rot=-3)
# DeepSeek, Hangzhou: a free model
add('card', cue('in', 2, 26), cue('without', 1, -2), fig='FIG. 02', lines=['DeepSeek'])
add('dot', cue('hangzhou', 1, -2), cue("that's", 1, -16), pin=('hangzhou', 0, 0), top=True)
add('tag', cue('hangzhou', 1, 2), cue('without', 1, -2), text='HANGZHOU', pin=('hangzhou', -150, 70), rot=-1.5, size=52)
add('ransom', cue('free', 2, -2), cue('it', 2, -2), text='FREE', xy=(490, 400), size=200, seed=3)
add('tag', cue('rivalled', 1, -2), cue('it', 2, -2), text='"RIVALS THE BEST"', xy=(490, 580), rot=1, size=50)
add('ransom', cue('five', 2, -2), cue('without', 1, -2), text='$5.6M', xy=(490, 400), size=180, seed=4)
add('tag', cue('training', 1, -2), cue('without', 1, -2), text='FINAL TRAINING RUN', xy=(490, 580), rot=-1, size=48)
add('note', cue('higher', 1, -4), cue('without', 1, -2), text='real total: higher', size=92, xy=(490, 1440), rot=-2)
# trained on H800s
add('card', cue('without', 1, 0), cue('so', 1, -2), fig='FIG. 03', lines=['The Chips'])
add('chip', cue('eight', 1, -2), cue('its', 2, -2), xy=(490, 1120), rot=-4, scale=0.95)
add('tag', cue('eight', 1, 2), cue('its', 2, -2), text='H800', xy=(490, 1340), rot=1.5, size=60)
add('tag', cue('slower', 1, -2), cue('its', 2, -2), text='SLOWER, MADE FOR CHINA', xy=(490, 560), rot=-1, size=46)
# No. 1 in America
add('phone', cue('app', 3, -2), cue('so', 1, -2), xy=(680, 1100), rot=6, scale=0.85)
add('ransom', cue('number', 1, -2), cue('so', 1, -2), text='#1', xy=(490, 400), size=210, seed=5)
add('tag', cue('america', 2, -2), cue('so', 1, -2), text='US APP STORE', xy=(490, 580), rot=1, size=50)
add('tag', cue('chatgpt', 1, -2), cue('so', 1, -2), text='AHEAD OF CHATGPT', xy=(330, 1380), rot=-2, size=46)
# the bans leaked, and Huawei chips
add('card', cue('so', 1, 0), cue("that's", 1, -16), fig='FIG. 04', lines=['Bans Leaked'])
add('note', cue('leaked', 1, -2), cue("that's", 1, -16), text='leaked, not failed', size=92, xy=(490, 560), rot=-2)
add('chip', cue('huawei', 1, -4), cue("that's", 1, -16), xy=(490, 1120), rot=5, scale=0.95)
add('tag', cue('huawei', 1, 0), cue("that's", 1, -16), text='HUAWEI CHIPS', xy=(490, 1340), rot=-1.5, size=54)
add('tag', cue('twenty-six', 1, -2), cue("that's", 1, -16), text='NEW MODEL · 2026', xy=(490, 1440), rot=1, size=48)
# the loop
hook_group(cue("that's", 1, 24), END)
add('tag', NFR - 30, END, text='NVIDIA -17% ON 27 JAN 2025', xy=(490, 1400), rot=-1, size=44)          # hidden key text, last second
add('tag', NFR - 30, END, text='BIGGEST 1-DAY LOSS IN US HISTORY', xy=(490, 1476), rot=1, size=34)

G.finish(NY, MOVES, LABELS, PAINT)
if __name__ == '__main__':
    G.main()
