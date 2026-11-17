#!/usr/bin/env python3
"""Join intro + (globe interlude, landscape chapter) x 23 + outro into
videos/out/ottoman/long/history_of_the_ottomans.mp4, and write YOUTUBE_LONG.md (chapters + credits)."""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
LONG = os.path.expanduser('~/cosmic-run/videos/out/ottoman/long')
G = os.path.join(LONG, '_globe')
chapters = json.load(open(os.path.join(HERE, 'chapters.json')))
lf = json.load(open(os.path.join(HERE, 'longform.json')))

def dur(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))

parts = [(os.path.join(G, 'intro.mp4'), None)]
for c in chapters:
    parts.append((os.path.join(G, f"ch{c['n']:02d}.mp4"), c))
    v = os.path.join(LONG, c['out'], 'video_cut.mp4')
    parts.append((v if os.path.exists(v) else os.path.join(LONG, c['out'], 'video.mp4'), 'chapter'))
parts.append((os.path.join(G, 'outro.mp4'), None))

# re-encode through the concat filter: inputs differ slightly (mono/stereo, loudness), output is uniform
inputs, filt, t, marks = [], [], 0.0, []
for i, (f, c) in enumerate(parts):
    inputs += ['-i', f]
    d = dur(f)
    # soft joins: chapters fade in/out from dark, globe clips fade in; short audio fades at every joint
    vf = f'fade=t=in:st=0:d=0.35,fade=t=out:st={d - 0.45:.3f}:d=0.45' if c == 'chapter' else 'fade=t=in:st=0:d=0.25'
    af = f'afade=t=in:st=0:d=0.15,afade=t=out:st={d - 0.12:.3f}:d=0.12'
    filt.append(f'[{i}:v]fps=30,format=yuv420p,setsar=1,{vf}[v{i}];[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,{af}[a{i}];')
    if c and c != 'chapter': marks.append((t, c))
    t += d
filt.append(''.join(f'[v{i}][a{i}]' for i in range(len(parts))) + f'concat=n={len(parts)}:v=1:a=1[v][ac];[ac]loudnorm=I=-14:TP=-1.5:LRA=11[a]')
out = os.path.join(LONG, 'history_of_the_ottomans.mp4')
if '--desc-only' not in sys.argv:  # --desc-only: rewrite YOUTUBE_LONG.md without re-encoding
  subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inputs, '-filter_complex', ''.join(filt), '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-c:a', 'aac', '-b:a', '192k',
                '-movflags', '+faststart', out], check=True)
print('wrote', out, round(dur(out) / 60, 1), 'min')

# ---- description ----
ts = lambda s: f'{int(s // 3600)}:{int(s % 3600 // 60):02d}:{int(s % 60):02d}' if s >= 3600 else f'{int(s // 60)}:{int(s % 60):02d}'
per_ch = []   # image credits grouped by chapter, for the pinned comment
for c in chapters:
    tl = json.load(open(os.path.join(LONG, c['out'], 'timeline.json')))
    cr = []
    for v in tl.get('images', {}).values():
        if v.get('credit') and v['credit'] not in cr: cr.append(v['credit'])
    per_ch.append(f"{c['n']:02d} {c['title']}: " + '; '.join(cr))
lines = [f"# {lf['title']}", '', '## Title', f"{lf['title']} | 623 Years in {round(dur(out) / 60)} Minutes", '', '## Description',
         'From a frontier on the edge of Byzantium to the Republic of Turkey: the whole story of the Ottoman Empire in 16 chapters, '
         'told as a conversation, with hand-drawn maps of its borders, public-domain paintings and an animated globe.', '', '0:00 Intro']
lines += [f"{ts(t)} {c['n']:02d}. {c['title']} ({c['years']})" for t, c in marks]
lines += ['', 'Every date is checked against two sources (Britannica, Wikipedia, World History Encyclopedia, Australian War Memorial and others). Borders are approximate.',
          'Narration: synthetic voices. Music: generated for this channel. Map data: Natural Earth (public domain) and © OpenStreetMap contributors. The 3D Taksim scene is a stylised illustration.', '',
          'Images: public-domain paintings, engravings and photographs, plus CC0 photographs. Full credits in the pinned comment.']
lines += ['', '#history #ottomanempire #documentary']
desc_len = len('\n'.join(lines[lines.index('## Description') + 1:]))
assert desc_len < 4900, desc_len
comment = 'Image credits, chapter by chapter (public domain / CC0):\n\nIntro: Coat of arms of the Ottoman Empire (1882 design; drawing by Juris Tiltins, public domain, Wikimedia Commons)\n' + '\n'.join(per_ch)
assert len(comment) < 9800, len(comment)
lines += ['', '## Pinned comment', f'({len(comment)} of 10000 characters)', '', comment]
md = os.path.join(os.path.dirname(HERE), 'YOUTUBE_LONG.md')
open(md, 'w').write('\n'.join(lines) + '\n')
print('wrote', md)
