#!/usr/bin/env python3
"""Audio for the long-form extras: narrated intro/outro (Kokoro + generated music) and the
4-second globe interludes (whoosh + timpani landing). Writes WAVs and word timings to OUT."""
import json, os, sys, wave
import numpy as np
sys.path.insert(0, os.path.expanduser('~/cosmic-run/.claude/skills/story-video/scripts'))
import build_audio as B, align as A
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.expanduser('~/cosmic-run/videos/out/rome/long/_globe')
SR = B.SR
S = json.load(open(os.path.join(HERE, 'longform.json')))

def write(name, x):
    x = np.clip(x, -1, 1); w = wave.open(os.path.join(OUT, name), 'wb')
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()

def narrated(key, lines, lead, tail, mood, seed):
    meta = {'lines': []}; voice = []; t = lead
    for line in lines:
        a = B.tts(line, 'bm_fable', 1.0)
        meta['lines'].append({'text': line, 'start': t, 'end': t + len(a) / SR,
                              'words': A.word_times(line, line, a, SR, t)})
        voice.append((t, a)); t += len(a) / SR + 0.45
    total = t + tail; n = int(total * SR)
    bed = B.music(total, mood, seed, 4.0, True) * 0.32
    fade = np.minimum(1, np.minimum(np.arange(n) / (SR * 1.0), (n - np.arange(n)) / (SR * 2.0)))
    mix = bed[:n] * fade
    for st, a in voice: i = int(st * SR); mix[i:i + len(a)] += a * 0.9
    write(f'{key}.wav', mix); meta['duration'] = total
    json.dump(meta, open(os.path.join(OUT, f'{key}.json'), 'w'), indent=1)
    print(key, round(total, 1))

def interlude(d=4.0):
    n = int(d * SR); x = np.zeros(n)
    w = B.sfx_whoosh(); w = np.interp(np.linspace(0, len(w), int(len(w) * 2.4)), np.arange(len(w)), w)  # slower, deeper whoosh
    # no whoosh/swish/riser sounds (user rule 2026-11-23): interlude keeps only the timpani
    h = B.timpani(int(2.2 * SR)) * 0.5; i = int(1.75 * SR); x[i:i + len(h)] += h[:n - i]
    x = B.reverb(x, 2.0, 0.35)
    write('interlude.wav', x * np.minimum(1, (n - np.arange(n)) / (SR * 0.4)))

os.makedirs(OUT, exist_ok=True)
for p, P in S['parts'].items():   # Rome: one intro + outro per part
    narrated(f'intro_p{p}', P['intro'], 1.2, 4.6, 'epic', 7 + int(p))
    narrated(f'outro_p{p}', P['outro'], 1.0, 3.5, 'hopeful', 11 + int(p))
interlude()
