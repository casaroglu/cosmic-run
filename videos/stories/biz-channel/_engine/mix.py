# python3 _engine/mix.py <videoDir>: voice + generated music bed (per style) + whooshes at scene cuts + scene events
# -> audio/mix.wav (-14 LUFS) and render/video.mp4 (mux with render/video_silent.mp4)
import json, os, sys, subprocess, numpy as np, soundfile as sf
D = os.path.abspath(sys.argv[1]); SR = 48000; rng = np.random.default_rng(7)
info = json.load(open(os.path.join(D, 'audio/events.json'))); DUR = info['DUR']; N = int(DUR * SR) + SR
v = subprocess.check_output(['ffmpeg', '-loglevel', 'error', '-i', os.path.join(D, 'audio/voice.wav'), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']); voice = np.frombuffer(v, np.float32)
style = json.load(open(os.path.join(D, 'narration.json'))).get('style', 'stick')
t = np.arange(N) / SR; bed = np.zeros(N)
def env(n, a, r): x = np.arange(n) / SR; return np.minimum(1, x / a) * np.exp(-x / r)
def place(buf, x, at, db): i = int(at * SR); j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i] * 10 ** (db / 20)
def lp(x, k):
    y = np.empty_like(x); a = 0.
    for i, s in enumerate(x): a += k * (s - a); y[i] = a
    return y
if style == 'stick':   # light plucked pattern, 96 bpm, I-V-vi-IV in C
    beat = 60 / 96; prog = [[261.6, 329.6, 392.0], [196.0, 246.9, 293.7], [220.0, 261.6, 329.6], [174.6, 220.0, 261.6]]
    k = 0; at = 0.0
    while at < DUR:
        ch = prog[(k // 8) % 4]; f = ch[[0, 1, 2, 1][k % 4]] * (2 if k % 8 >= 4 else 1); n = int(.5 * SR)
        x = np.sin(2 * np.pi * f * np.arange(n) / SR) * env(n, .004, .18) + .3 * np.sin(4 * np.pi * f * np.arange(n) / SR) * env(n, .002, .08)
        place(bed, x, at, -24)
        if k % 4 == 0: place(bed, np.sin(2 * np.pi * ch[0] / 2 * np.arange(int(beat * 4 * SR)) / SR) * env(int(beat * 4 * SR), .05, 1.2), at, -26)
        k += 1; at += beat / 2
else:   # dark drone: low fifths + filtered wind
    for f, db in [(55, -20), (82.4, -25), (110, -28)]: bed += np.sin(2 * np.pi * f * t + np.sin(t * .3) * 2) * 10 ** (db / 20) * (0.7 + 0.3 * np.sin(t * .21 + f))
    bed += lp(rng.standard_normal(N), .015) * (0.9 + 0.5 * np.sin(t * .4)) * 10 ** (-17 / 20)
fx = np.zeros(N)
def whoosh(sec=.45):
    n = int(sec * SR); x = rng.standard_normal(n); k = np.linspace(.03, .3, n); y = np.empty(n); a = 0.
    for i in range(n): a += k[i] * (x[i] - a); y[i] = a
    return y * np.sin(np.linspace(0, np.pi, n)) ** 2 * 3
def pop(f=700): n = int(.1 * SR); return np.sin(2 * np.pi * np.cumsum(np.geomspace(f * 1.7, f, n)) / SR) * env(n, .002, .035)
def boom(): n = int(1.3 * SR); return np.sin(2 * np.pi * np.cumsum(np.geomspace(90, 36, n)) / SR) * env(n, .004, .4) + lp(rng.standard_normal(n), .05) * env(n, .002, .12) * 2
def tick(): n = int(.03 * SR); return np.sin(2 * np.pi * np.cumsum(np.geomspace(2600, 1800, n)) / SR) * env(n, .001, .008)
# no whoosh/swish/riser sounds (user rule 2026-11-23): scene cuts are silent
for at, kind in info.get('EV', []): place(fx, {'pop': pop, 'boom': boom, 'tick': tick, 'whoosh': whoosh}[kind](), at, {'pop': -12, 'boom': -10, 'tick': -16, 'whoosh': -18}[kind])
vo = np.zeros(N); vo[:min(N, len(voice))] = voice[:N]
duck = np.convolve((np.abs(vo) > .02).astype(float), np.ones(int(.25 * SR)) / int(.25 * SR), 'same'); bed *= 1 - .45 * np.clip(duck * 3, 0, 1)
mix = vo + bed + fx; mix[-int(.12 * SR):] *= np.linspace(1, 0, int(.12 * SR)); mix = mix[:int(DUR * SR)]
raw = os.path.join(D, 'audio/mix_raw.wav'); sf.write(raw, np.stack([mix, mix], 1).astype(np.float32), SR)
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', os.path.join(D, 'audio/mix.wav')])
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', os.path.join(D, 'render/video_silent.mp4'), '-i', os.path.join(D, 'audio/mix.wav'), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', os.path.join(D, 'render/video.mp4')])
print('mixed', round(DUR, 2), 's')
