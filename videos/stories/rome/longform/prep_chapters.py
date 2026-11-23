#!/usr/bin/env python3
"""Landscape chapters for the Rome long-form parts, from the finished looping Shorts, without re-voicing.
Each Short's timeline is cut at the start of its first call-to-action beat (`cta: true`), so the
"Like the video and follow…" line, the comments question, the loop line and the key-text flash are all dropped;
the cold open stays as the chapter's hook. Output: videos/out/rome/long/<ep>/ (render with render.mjs).
usage: python3 prep_chapters.py [ep ...]"""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.expanduser('~/cosmic-run/videos/out/rome')
only = sys.argv[1:]
for ch in json.load(open(os.path.join(HERE, 'chapters.json'))):
    if only and ch['out'] not in only: continue
    src, dst = os.path.join(ROOT, ch['out']), os.path.join(ROOT, 'long', ch['out'])
    tl = json.load(open(os.path.join(src, 'timeline.json')))
    beats = tl['beats']
    i = next((k for k, b in enumerate(beats) if b.get('cta') or b['type'] == 'end'), None)
    assert i, f"{ch['out']}: no cta beat"
    cut = round(beats[i]['start'] + 0.4, 3)
    tl['beats'] = beats[:i]; tl['beats'][-1]['end'] = cut
    tl.update(landscape=True, part=None, loop=None, duration=cut, width=1920, height=1080)
    os.makedirs(dst, exist_ok=True)
    json.dump(tl, open(os.path.join(dst, 'timeline.json'), 'w'))
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', os.path.join(src, 'audio.wav'), '-t', str(cut),
                    '-af', f'afade=t=out:st={cut - 0.9}:d=0.9', os.path.join(dst, 'audio.wav')], check=True)
    print(ch['out'], cut, '| last line:', tl['beats'][-1].get('text', '')[-70:])
