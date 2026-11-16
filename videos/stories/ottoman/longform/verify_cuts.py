#!/usr/bin/env python3
"""Listen to the end of every long-form chapter (video_cut.mp4) and of the original Short around the cut,
and re-cut where the next sentence ('Next time …', 'That's the story …') can be heard.
Cut = the middle of the silence between the last kept word and the teaser, as heard by the recogniser."""
import json, os, re, subprocess, tempfile
import numpy as np, soundfile as sf
from faster_whisper import WhisperModel
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.expanduser('~/cosmic-run/videos/out/ottoman')
m = WhisperModel('base.en', device='cpu', compute_type='int8')
TEASE = re.compile(r"^(next|that's|like)", re.I)
def heard(wav, t0, t1):
    a, sr = sf.read(wav, dtype='float32', always_2d=True); a = a.mean(1)[int(t0 * sr):int(t1 * sr)]
    a = np.interp(np.linspace(0, len(a) - 1, int(len(a) * 16000 / sr)), np.arange(len(a)), a).astype(np.float32)
    segs, _ = m.transcribe(a, language='en', word_timestamps=True, beam_size=1, condition_on_previous_text=False)
    return [(w.word.strip(), t0 + w.start, t0 + w.end) for s in segs for w in s.words]
for c in json.load(open(os.path.join(HERE, 'chapters.json'))):
    o = c['out']; src = os.path.join(ROOT, o, 'audio.wav'); cutv = os.path.join(ROOT, 'long', o, 'video_cut.mp4')
    cur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', cutv]))
    words = heard(src, max(0, cur - 4.0), cur + 3.0)
    tease = next((i for i, w in enumerate(words) if TEASE.match(w[0]) and w[1] > cur - 2.5), None)
    if tease is None:
        print(o, 'ok: no teaser near the cut', round(cur, 2)); continue
    hs = words[tease][1]; pe = words[tease - 1][2] if tease > 0 else hs - 0.4
    new = round(min(cur, (pe + hs) / 2 if hs - pe > 0.12 else hs - 0.06), 3)
    if new >= cur - 0.02 and hs > cur + 0.05:
        print(o, 'ok: teaser starts after the cut', round(hs, 2), '>', round(cur, 2)); continue
    fade = round(min(0.45, max(0.1, new - pe - 0.02)), 3)
    v = os.path.join(ROOT, 'long', o, 'video.mp4'); tmp = cutv + '.tmp.mp4'
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', v, '-i', src, '-t', str(new), '-map', '0:v', '-map', '1:a',
                    '-af', f'afade=t=out:st={new - fade}:d={fade}', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
                    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', tmp], check=True)
    os.replace(tmp, cutv)
    print(o, 'RE-CUT: teaser', words[tease][0], 'heard at', round(hs, 2), '| prev word ends', round(pe, 2), '| cut', round(cur, 2), '->', new)
