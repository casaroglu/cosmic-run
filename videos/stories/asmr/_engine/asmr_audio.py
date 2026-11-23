# python3 asmr_audio.py <dir> <cycles>: synthesized ASMR foley for the crystal-cube loop, periodic in T (seamless loop)
import sys, os, json, numpy as np, soundfile as sf, subprocess
D = os.path.abspath(sys.argv[1]); NC = int(sys.argv[2]); SR = 48000; T = 6.0; rng = np.random.default_rng(11)
CUTS = [[.6, 1.25, 'x'], [1.4, 2.05, 'z'], [2.2, 2.85, 'y']]; BURST = 2.95; DRIFT = 3.9; ZEND = 5.6
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
ev = []
for c in range(NC + 2):
    o = c * T
    for a, b, ax in CUTS:
        d = b - a; cont = a + .62 * d * (.62 if ax == 'y' else .42); sw = a + .62 * d
        add(whoosh(.35), o + a - .05, .12, -.3); add(scrape(sw - cont + .05), o + cont, .55, .1); add(grains(sw - cont, 900), o + cont, .35, .15)
        add(tink(2100 + rng.random() * 600), o + sw, .22, .2); add(grains(.18, 2500, 5200), o + sw, .4, .2)
    add(thump(), o + BURST, .5); add(grains(.25, 3000, 4500), o + BURST, .45)
    for k in range(14): add(tink(2600 + rng.random() * 3500, .7), o + BURST + .02 + rng.random() * .55, .06 + rng.random() * .06, rng.uniform(-.8, .8))
    add(whoosh(ZEND - DRIFT + .3, True), o + DRIFT - .1, .1, 0)
    add(tink(1700, 1.2), o + ZEND - .15, .12, 0)
room = biquad_bp(rng.standard_normal(N), 400, .5) * .004
L += room; R += room
a, b = int(T * SR), int((NC + 1) * T * SR); mix = np.stack([L[a:b], R[a:b]], 1); mix /= max(1e-6, np.abs(mix).max()) / .8
raw = os.path.join(D, 'audio/mix_raw.wav'); sf.write(raw, mix.astype(np.float32), SR)
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', os.path.join(D, 'audio/mix.wav')])
print('audio', NC * T, 's')
