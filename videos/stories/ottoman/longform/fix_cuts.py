#!/usr/bin/env python3
"""Clean chapter endings for the long-form: cut each landscape chapter just before the next voice
(the 'Next time' teaser) instead of after it starts, fade the audio out after the last kept word,
and trim the already-rendered chapter video to match. Writes long/<id>/video_cut.mp4."""
import json, os, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.expanduser('~/cosmic-run/videos/out/ottoman')
for c in json.load(open(os.path.join(HERE, 'chapters.json'))):
    o = c['out']; src = json.load(open(os.path.join(ROOT, o, 'timeline.json')))
    lt = json.load(open(os.path.join(ROOT, 'long', o, 'timeline.json')))
    last = lt['beats'][-1]; last_t1 = last['words'][-1]['t1'] if last.get('words') else last.get('voiceEnd', last['end'])
    # where the next voice starts in the original Short
    nxt = None
    for b in src['beats']:
        if b['start'] < last['start'] or not b.get('words'):
            continue
        if b['start'] == last['start']:
            k = len(last['words'])
            if k < len(b['words']): nxt = b['words'][k]['t0']; break
        else:
            nxt = b.get('voiceStart', b['start']); break
    old = lt['duration']
    cut = min(old, last_t1 + 0.9, (nxt - 0.08) if nxt else old)
    cut = round(max(cut, last_t1 + 0.15), 3)
    fade = round(min(0.6, max(0.12, cut - last_t1 - 0.03)), 3)
    a = os.path.join(ROOT, o, 'audio.wav'); v = os.path.join(ROOT, 'long', o, 'video.mp4'); out = os.path.join(ROOT, 'long', o, 'video_cut.mp4')
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', v, '-i', a, '-t', str(cut), '-map', '0:v', '-map', '1:a',
                    '-af', f'afade=t=out:st={cut - fade}:d={fade}', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
                    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', out], check=True)
    print(o, 'last word', last_t1, 'next voice', nxt, 'cut', old, '->', cut, 'fade', fade, flush=True)
