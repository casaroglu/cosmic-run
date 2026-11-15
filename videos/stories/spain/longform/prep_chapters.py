#!/usr/bin/env python3
"""Copy each Short's timeline + audio into videos/out/spain/long/<id>/ as a landscape chapter:
drop the Part pill and the 'Next / Follow' end card, trim the audio to match with a short fade."""
import json, os, subprocess, sys
ROOT = os.path.expanduser('~/cosmic-run/videos/out/spain')
ORDER = json.load(open(os.path.join(os.path.dirname(__file__), 'chapters.json')))
for ch in ORDER:
    src, dst = os.path.join(ROOT, ch['out']), os.path.join(ROOT, 'long', ch['out'])
    os.makedirs(dst, exist_ok=True)
    tl = json.load(open(os.path.join(src, 'timeline.json')))
    end = next(b for b in tl['beats'] if b['type'] == 'end')
    cut = round(end['start'] + 0.6, 3)
    tl['beats'] = [b for b in tl['beats'] if b['type'] != 'end']
    tl['beats'][-1]['end'] = cut
    tl.update(landscape=True, part=None, duration=cut, width=1920, height=1080)
    json.dump(tl, open(os.path.join(dst, 'timeline.json'), 'w'))
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', os.path.join(src, 'audio.wav'), '-t', str(cut),
                    '-af', f'afade=t=out:st={cut - 0.9}:d=0.9', os.path.join(dst, 'audio.wav')], check=True)
    print(ch['out'], cut)
