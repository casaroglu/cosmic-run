# synthesized ambience + event sound effects (no downloads), mixed under the voice, mastered to -14 LUFS / -2.2 dBTP
import json, os, subprocess, numpy as np, soundfile as sf
D = os.path.dirname(os.path.abspath(__file__)); SR = 48000
info = json.load(open(os.path.join(D, 'audio/events.json'))); C = info['CUE']; DUR = info['DUR']; EV = info['events']
rng = np.random.default_rng(3); N = int(DUR * SR) + SR
def env(n, a=0.005, r=0.3):
    t = np.arange(n) / SR; e = np.minimum(1, t / a) * np.exp(-t / r); return e
def place(buf, x, t, db):
    i = int(t * SR); x = x * 10 ** (db / 20); j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i]
def lp(x, k):   # one-pole low-pass
    y = np.empty_like(x); a = 0.0
    for i, v in enumerate(x): a += k * (v - a); y[i] = a
    return y
def noise(sec): return rng.standard_normal(int(sec * SR))
def sweep(f0, f1, sec, shape=np.sin):
    t = np.arange(int(sec * SR)) / SR; f = np.geomspace(f0, f1, len(t)); return shape(2 * np.pi * np.cumsum(f) / SR)
def whoosh(sec, up=True):
    n = noise(sec); e = np.sin(np.linspace(0, np.pi, len(n))) ** 2
    k = np.linspace(0.02, 0.25, len(n)) if up else np.linspace(0.25, 0.02, len(n))
    y = np.empty_like(n); a = 0.
    for i, v in enumerate(n): a += k[i] * (v - a); y[i] = a
    return y * e * 3
def boom(sec=1.2): n=int(sec*SR); return sweep(90, 35, sec)[:n] * env(n, 0.004, 0.35) + lp(noise(sec), 0.05)[:n] * env(n, 0.002, 0.12) * 2
def tick(): return sweep(2400, 1800, 0.03) * env(int(0.03 * SR), 0.001, 0.008)
def pop(f=900): return sweep(f * 1.6, f, 0.09) * env(int(0.09 * SR), 0.002, 0.03)
def chime(fs=(523, 659, 784, 1046), sec=2.4):
    t = np.arange(int(sec * SR)) / SR; return sum(np.sin(2 * np.pi * f * t) * np.exp(-t / (0.6 + i * 0.2)) * (1 if i == 0 else 0.6) for i, f in enumerate(fs)) * np.minimum(1, t / 0.004)
def shatter():
    out = np.zeros(int(0.9 * SR))
    for k in range(14):
        s = sweep(3000 + rng.random() * 3000, 1500, 0.12) * env(int(0.12 * SR), 0.001, 0.03); i = int(rng.random() * 0.5 * SR); out[i:i + len(s)] += s * (0.4 + rng.random() * 0.6)
    return out + lp(noise(0.9), 0.3) * env(int(0.9 * SR), 0.002, 0.15)
def mixn(*xs):
    n=max(len(x) for x in xs); o=np.zeros(n)
    for x in xs: o[:len(x)]+=x
    return o
fx = np.zeros(N)
for e in EV:   # one sound per event kind, quiet under the voice
    t = e['t']
    if e['kind'] == 'icon': place(fx, pop(650 + (int(t * 10) % 5) * 90), t + 0.05, -17)
    elif e['kind'] == 'tag': place(fx, mixn(pop(420), tick()), t + 0.04, -15)
    elif e['kind'] == 'section': place(fx, whoosh(0.7, True), t - 0.25, -17)
    elif e['kind'] == 'card': place(fx, mixn(whoosh(1.0, False), chime((523, 784), 1.2) * 0.5), t - 0.1, -14)
place(fx, sweep(400, 1200, 0.22) * np.linspace(0, 1, int(0.22 * SR)), C['slept'], -14)
place(fx, mixn(boom(1.4), whoosh(0.5, False) * 0.6), C['slept'] + 0.5, -6)
place(fx, shatter(), C['delete'], -12)
place(fx, mixn(boom(0.4) * 0.5, tick()), C['zero'], -12)
for o in (0, 0.85, 1.6): place(fx, boom(0.35) * 0.7, C['micro'] + o + 0.21, -10)
w = sweep(180, 260, 2.6) * (0.5 + 0.5 * np.sin(np.linspace(0, 18, int(2.6 * SR)))) * env(int(2.6 * SR), 0.4, 1.5); place(fx, w, C['breathe'] - 0.3, -16)
place(fx, chime((392, 587, 784), 1.6), C['eleven'], -14)
place(fx, mixn(boom(0.5) * 0.6, pop(260)), C['hours15'] + 0.05, -10)
place(fx, mixn(chime((784, 988, 1175), 1.2) * 0.6, pop(1200)), C['fine'], -12)
place(fx, chime((523, 659, 784, 1046), 3.0), C['calls'] + 0.1, -11)
# ambient bed: slow evolving chords for the whole film, a 5 dB swell under the title, kept under the end screen
t = np.arange(N) / SR; bed = np.zeros(N)
chords = [(220, 277.2, 329.6), (196, 246.9, 293.7), (174.6, 220, 261.6), (196, 246.9, 329.6), (164.8, 207.7, 246.9), (174.6, 220, 293.7)]
for i in range(int(DUR / 6) + 2):
    s0 = i * 6.0; a = int(s0 * SR); b = min(N, int((s0 + 7.5) * SR)); tt = t[a:b] - s0; e = np.sin(np.clip(tt / 7.5, 0, 1) * np.pi) ** 1.5
    for f in chords[i % len(chords)]: bed[a:b] += (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.003 * tt)) * e * 0.2
bed = lp(bed, 0.18)
swell = 1 + (10 ** (5 / 20) - 1) * np.clip((t - C['calls']) / 0.8, 0, 1); fade = np.clip((DUR - t) / 1.5, 0, 1); bed *= swell * fade
v, vsr = sf.read(os.path.join(D, 'audio/voice.wav'))
v = np.interp(np.arange(int(len(v) * SR / vsr)) / SR, np.arange(len(v)) / vsr, v)
def rms(x): return np.sqrt(np.mean(x[np.abs(x) > 1e-4] ** 2))
mix = np.zeros(N); mix[:len(v)] += v[:N]
bed *= rms(v) / rms(bed) * 10 ** (-7 / 20); fx *= rms(v) / max(1e-9, np.max(np.abs(fx))) * 1.6
mix += bed + fx
sf.write(os.path.join(D, 'audio/mix_raw.wav'), mix[:int(DUR * SR)], SR)
print('raw mix written', round(DUR, 2))
