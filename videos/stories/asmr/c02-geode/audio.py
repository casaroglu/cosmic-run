# python3 c02-geode/audio.py <dir> <cycles>: synthesized foley for the geode loop, periodic in T (seamless loop). Primitives copied from _engine/asmr_audio.py
import sys, os, json, numpy as np, soundfile as sf, subprocess
D = os.path.abspath(sys.argv[1]); NC = int(sys.argv[2]); SR = 48000; T = 6.0; rng = np.random.default_rng(11)
N = int((NC + 2) * T * SR); L = np.zeros(N); R = np.zeros(N)
def add(x, at, gain=1.0, pan=0.0):
    i = int(at * SR); j = min(N, i + len(x)); 
    if i >= N or j <= 0: return
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4); L[i:j] += x[:j - i] * gain * l * 1.41; R[i:j] += x[:j - i] * gain * r * 1.41
def biquad_bp(x, f, q):
    w = 2 * np.pi * f / SR; al = np.sin(w) / (2 * q); b0, b2, a0, a1, a2 = al, -al, 1 + al, -2 * np.cos(w), 1 - al
    y = np.zeros_like(x); x1 = x2 = y1 = y2 = 0.
    for n in range(len(x)): v = (b0 * x[n] + b2 * x2 - a1 * y1 - a2 * y2) / a0; x2, x1, y2, y1 = x1, x[n], y1, v; y[n] = v
    return y
def env(n, a, r): t = np.arange(n) / SR; return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / r)
def tink(f0=2300, dur=.9):
    n = int(dur * SR); t = np.arange(n) / SR; ps = [(1, 1, .5), (2.32, .55, .3), (4.25, .35, .18), (6.63, .2, .1)]
    return sum(np.sin(2 * np.pi * f0 * p * t + rng.random() * 6) * a * np.exp(-t / d) for p, a, d in ps) * np.minimum(1, t / .0015)
def grains(dur, rate, f=3800):   # crunchy crystal fracture: dense tiny clicks
    n = int(dur * SR); x = np.zeros(n); k = rng.poisson(rate * dur)
    for i in rng.integers(0, n, k): c = rng.standard_normal(int(.004 * SR)) * env(int(.004 * SR), .0002, .0008) * (.4 + rng.random()); x[i:i + len(c)] += c[:n - i]
    return biquad_bp(x, f, 1.2) * 3
def scrape(dur):   # steel through crystal: band noise with a slowly rising centre
    n = int(dur * SR); x = rng.standard_normal(n); y = biquad_bp(x, 2600, 2.5) * .8 + biquad_bp(x, 6200, 3) * .4
    return y * np.sin(np.linspace(0, np.pi, n)) ** .7
def whoosh(dur, up=True):
    n = int(dur * SR); x = rng.standard_normal(n); k = np.linspace(.01, .12, n) if up else np.linspace(.12, .01, n); y = np.zeros(n); a = 0.
    for i in range(n): a += k[i] * (x[i] - a); y[i] = a
    return y * np.sin(np.linspace(0, np.pi, n)) ** 2 * 2.5
def thump(): n = int(.35 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * np.cumsum(np.geomspace(110, 55, n)) / SR) * np.exp(-t / .09)
def grind(dur, f=1400, q=1.4):   # stone on stone / wire in stone
    n = int(dur * SR); x = rng.standard_normal(n); return (biquad_bp(x, f, q) + biquad_bp(x, f * 2.7, 2) * .4) * np.sin(np.linspace(0, np.pi, n)) ** .5
def tok(f=190, g=1.0):   # small stone landing on a hard floor
    n = int(.25 * SR); t = np.arange(n) / SR; c = rng.standard_normal(n) * np.exp(-t / .004)
    return (np.sin(2 * np.pi * f * t) * np.exp(-t / .05) + biquad_bp(c, 2400, 1.5) * .8) * g
CUT = (.45, 1.95)
for c in range(NC + 2):
    o = c * T
    d = CUT[1] - CUT[0]; n = int(d * SR); tt = np.arange(n) / SR + CUT[0]
    saw = grind(d, 1700, 1.6) * (.25 + .75 * np.abs(np.sin(tt * 38))) ** 1.5
    add(saw, o + CUT[0], .5, .1); add(grains(d, 500, 3000), o + CUT[0], .25, .15)
    
    add(grains(.12, 2500, 2600), o + 1.95, .45, 0); add(tok(120, .5), o + 1.97, .25, 0)
    add(grind(.45, 600, 1.0), o + 2.05, .35, -.4); add(grind(.45, 650, 1.0), o + 2.05, .35, .4)
    add(tok(200, 1.0), o + 2.397, .55, 0); add(tok(230, .4), o + 2.506, .5, 0); add(tok(250, .15), o + 2.533, .5, 0)
    add(grind(.8, 500, .9), o + 2.4, .18, -.5); add(grind(.8, 520, .9), o + 2.4, .18, .5)
    for k in range(10): add(tink(2400 + rng.random() * 3200, .9), o + 2.55 + rng.random() * .8, .05 + rng.random() * .05, rng.uniform(-.7, .7))
    add(grind(1.9, 450, .8), o + 3.6, .12, -.6); add(grind(1.9, 470, .8), o + 3.6, .12, .6)
    
    add(tink(1500, 1.4), o + 5.7, .1, 0)
room = biquad_bp(rng.standard_normal(N), 400, .5) * .004
L += room; R += room
a, b = int(T * SR), int((NC + 1) * T * SR); mix = np.stack([L[a:b], R[a:b]], 1); mix /= max(1e-6, np.abs(mix).max()) / .8
raw = os.path.join(D, 'audio/mix_raw.wav'); sf.write(raw, mix.astype(np.float32), SR)
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', os.path.join(D, 'audio/mix.wav')])
print('audio', NC * T, 's')
