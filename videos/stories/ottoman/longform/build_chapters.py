#!/usr/bin/env python3
"""Landscape chapters for the long-form: copy each episode.json, drop the per-Short call to action
(the 'Next time …' teaser, 'Like the video …', 'tell us in the comments', the end card), rebuild the
audio + timeline into videos/out/ottoman/long/<id>/ and mark it landscape (render with render.mjs)."""
import json, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); EP = os.path.dirname(HERE)
OUT = os.path.expanduser('~/cosmic-run/videos/out/ottoman/long')
S = os.path.expanduser('~/cosmic-run/.claude/skills/story-video/scripts')
PY = os.path.expanduser('~/.cache/kokoro/venv/bin/python')
only = sys.argv[1:]
for c in json.load(open(os.path.join(HERE, 'chapters.json'))):
    if only and c['out'] not in only: continue
    src = os.path.join(EP, c['dir']); e = json.load(open(os.path.join(src, 'episode.json')))
    beats = []
    for b in e['beats']:
        if b.get('type') == 'end': continue
        t = b.get('text', '')
        if re.search(r"tell us in the comments|Which episode was your favourite", t, re.I): continue
        cut = re.split(r"\s*(Next time:|Like the video|That's the story of)", t)[0].strip()
        if cut != t:
            if not cut: continue
            b = dict(b, text=cut); b.pop('say', None)
        beats.append(b)
    e['beats'] = beats; e.pop('watermark', None) if False else None
    # paths in the episode are relative to its folder: write the variant next to it
    var = os.path.join(src, '_longform.json'); json.dump(e, open(var, 'w'), indent=1, ensure_ascii=False)
    dst = os.path.join(OUT, c['out']); os.makedirs(dst, exist_ok=True)
    subprocess.run([PY, os.path.join(S, 'build_audio.py'), var, dst], check=True, stdout=subprocess.DEVNULL)
    tl = json.load(open(os.path.join(dst, 'timeline.json')))
    tl.update(landscape=True, part=None, width=1920, height=1080)
    json.dump(tl, open(os.path.join(dst, 'timeline.json'), 'w'))
    os.remove(var)
    print(c['out'], round(tl.get('duration', 0), 1), 's', len(beats), 'beats', flush=True)
