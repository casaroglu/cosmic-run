#!/usr/bin/env python3
"""Join one Rome long-form part: intro_pN + (globe interlude, landscape chapter) x 5 + outro_pN
-> videos/out/rome/long/ancient_rome_part_N.mp4, and write ../YOUTUBE_LONG_PART_N.md (chapters + credits).
usage: python3 assemble.py <part> [--desc-only]"""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
LONG = os.path.expanduser('~/cosmic-run/videos/out/rome/long')
G = os.path.join(LONG, '_globe')
PART = sys.argv[1]
chapters = [c for c in json.load(open(os.path.join(HERE, 'chapters.json'))) if str(c['part']) == PART]
LP = json.load(open(os.path.join(HERE, 'longform.json')))['parts'][PART]

def dur(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))

def cold_open_end(c):
    """Where the chapter really starts: just before the title question, so the Short's cold open (its teaser hook) is cut.
    The CTA, loop line and key flash at the end are already gone (prep_chapters.py / the cizgi chapter.mp4)."""
    if c.get('chapter_mp4'):   # B+C: the cizgi project's voice segments (0 = cold open, 1 = title question)
        seg = json.load(open(os.path.expanduser(f"~/cizgi/rome-{c['out']}/work/segments.json")))
        return round(seg[1]['s'] - 0.12, 3)
    b = json.load(open(os.path.join(LONG, c['out'], 'timeline.json')))['beats']
    return round(b[1]['start'] - 0.2, 3)

parts = [(os.path.join(G, f'intro_p{PART}.mp4'), None, 0)]
for c in chapters:
    parts.append((os.path.join(G, f"ch{c['n']:02d}.mp4"), c, 0))
    # B+C episodes (08-15) are vertical cizgi renders: their `chapter_mp4` (cut before the CTA) is pillarboxed below
    parts.append((os.path.expanduser(c['chapter_mp4']) if c.get('chapter_mp4') else os.path.join(LONG, c['out'], 'video.mp4'), 'chapter', cold_open_end(c)))
parts.append((os.path.join(G, f'outro_p{PART}.mp4'), None, 0))

inputs, filt, t, marks = [], [], 0.0, []
for i, (f, c, ss) in enumerate(parts):
    inputs += ['-ss', str(ss), '-i', f] if ss else ['-i', f]; d = dur(f) - ss
    vf = f'fade=t=in:st=0:d=0.35,fade=t=out:st={d - 0.45:.3f}:d=0.45' if c == 'chapter' else 'fade=t=in:st=0:d=0.25'
    af = f'afade=t=in:st=0:d=0.15,afade=t=out:st={d - 0.12:.3f}:d=0.12'
    vin = f'[{i}:v]'
    if c == 'chapter' and f.endswith('chapter.mp4'):   # vertical: hide the "ANCIENT ROME #N" Short tag, then blurred fill + centred frame
        filt.append(f'[{i}:v]delogo=x=176:y=74:w=380:h=58,split[b{i}][f{i}];[b{i}]scale=1920:-2,crop=1920:1080,boxblur=30:3,eq=brightness=-0.12[bb{i}];[f{i}]scale=-2:1080[ff{i}];[bb{i}][ff{i}]overlay=(W-w)/2:0[p{i}];')
        vin = f'[p{i}]'
    filt.append(f'{vin}fps=30,scale=1920:1080,format=yuv420p,setsar=1,{vf}[v{i}];[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,{af}[a{i}];')
    if c and c != 'chapter': marks.append((t, c))
    t += d
filt.append(''.join(f'[v{i}][a{i}]' for i in range(len(parts))) + f'concat=n={len(parts)}:v=1:a=1[v][ac];[ac]loudnorm=I=-14:TP=-1.5:LRA=11[a]')
out = os.path.join(LONG, f'ancient_rome_part_{PART}.mp4')
if '--desc-only' not in sys.argv:
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inputs, '-filter_complex', ''.join(filt), '-map', '[v]', '-map', '[a]',
                    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
total = dur(out); print('wrote', out, round(total / 60, 2), 'min')

ts = lambda s: f'{int(s // 60)}:{int(s % 60):02d}'
per_ch = []
for c in chapters:
    tlp = os.path.join(LONG, c['out'], 'timeline.json')
    ep = os.path.expanduser(f"~/cosmic-run/videos/stories/rome/{c['out']}/episode.json")
    tl = json.load(open(tlp if os.path.exists(tlp) else ep)); cr = []
    for v in tl.get('images', {}).values():
        if v.get('credit') and v['credit'] not in cr and not v.get('file', '').endswith('option_c.png'): cr.append(v['credit'])
    per_ch.append(f"{c['n']:02d} {c['title']}: " + '; '.join(cr))
lines = [f"# {LP['title']}", '', '## Title', LP['yt_title'][:100], '', '## Description',
         f"{LP['subtitle']}: five chapters of the story of Ancient Rome, told as a conversation, with hand-drawn maps, "
         'public-domain paintings and an animated globe.', '', '0:00 Intro']
lines += [f"{ts(t)} {c['n']:02d}. {c['title']} ({c['years']})" for t, c in marks]
lines += ['', 'Every date is checked against at least two sources (Britannica, World History Encyclopedia, Livy, Polybius, Suetonius and others). Borders are approximate.',
          'Narration: synthetic voices. Music: generated for this channel. Map data: Natural Earth (public domain).', '',
          'Images: public-domain paintings, engravings and photographs, CC0 museum photographs, and AI illustrations (marked). Full credits in the pinned comment.',
          '', '#history #ancientrome #rome #documentary']
comment = 'Image credits, chapter by chapter:\n\n' + '\n'.join(per_ch)
assert len(comment) < 9800, len(comment)
lines += ['', '## Pinned comment', f'({len(comment)} of 10000 characters)', '', comment]
md = os.path.join(os.path.dirname(HERE), f'YOUTUBE_LONG_PART_{PART}.md')
open(md, 'w').write('\n'.join(lines) + '\n'); print('wrote', md)
