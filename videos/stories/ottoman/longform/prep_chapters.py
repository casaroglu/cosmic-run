#!/usr/bin/env python3
"""Landscape chapters from the finished Shorts, without re-voicing: cut each Short's timeline and audio
at the start of its call to action (the word 'Next' of 'Next time: …', or 'That's the story', or the
first 'tell us in the comments' line), drop the end card, mark it landscape. Output: videos/out/ottoman/long/<id>/."""
import json, os, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.expanduser('~/cosmic-run/videos/out/ottoman')
for c in json.load(open(os.path.join(HERE, 'chapters.json'))):
    src, dst = os.path.join(ROOT, c['out']), os.path.join(ROOT, 'long', c['out'])
    os.makedirs(dst, exist_ok=True)
    tl = json.load(open(os.path.join(src, 'timeline.json')))
    beats, cut = [], None
    for b in tl['beats']:
        t = b.get('text', '')
        if b['type'] == 'end' or re.search(r"tell us in the comments|Which episode was your favourite", t, re.I):
            cut = cut or b['start']; break
        m = re.search(r"(Next time:|That's the story of|Like the video)", t)
        if m and b.get('words'):
            k = len(t[:m.start()].split())          # words before the call to action
            if k == 0:
                cut = b['start']; break
            w = b['words'][:k]
            b = dict(b, text=' '.join(x['w'] for x in w), words=w, voiceEnd=w[-1]['t1'])
            cut = w[-1]['t1'] + 0.5; b['end'] = cut; beats.append(b); break
        beats.append(b)
    cut = round(cut + 0.6 if beats and beats[-1]['end'] < (cut or 0) else (cut or beats[-1]['end']), 3)
    beats[-1]['end'] = cut
    tl['beats'] = beats
    tl.update(landscape=True, part=None, duration=cut, width=1920, height=1080)
    json.dump(tl, open(os.path.join(dst, 'timeline.json'), 'w'))
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', os.path.join(src, 'audio.wav'), '-t', str(cut),
                    '-af', f'afade=t=out:st={cut - 0.9}:d=0.9', os.path.join(dst, 'audio.wav')], check=True)
    print(c['out'], cut, '| last line:', beats[-1].get('text', '')[-60:])
