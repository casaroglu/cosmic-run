"""Fill title/description/cover in youtube_shorts_queue.json from each episode.json (skips episodes not written yet). Safe to re-run."""
import json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
q = json.load(open('youtube_shorts_queue.json'))
heads = sorted(d for d in os.listdir('headlines') if d[:2].isdigit())
def credits(e): return '\n'.join('• ' + v['credit'] for v in e.get('images', {}).values() if v.get('credit') and not v['file'].startswith('sketch/'))
for x in q:
    s = x['series']
    if s == 'ottoman':
        o = x['file'].split('/')[3]; x['cover'] = f'videos/out/ottoman/_ig/ottoman_{o}_cover.jpg'; continue
    if x['status'] not in ('todo',): continue
    p = f"{'headlines' if s == 'chokepoints' else 'spain'}/{x['id']}/episode.json"
    if not os.path.exists(p): continue
    e = json.load(open(p)); cap = e.get('post', {}).get('caption', ''); tags = ' '.join('#' + t for t in e.get('post', {}).get('hashtags', []))
    x['title'] = e['title']
    if s == 'chokepoints':
        o = x['id'].split('-')[0]; n = heads.index(x['id']) + 1
        x['cover'] = f'videos/out/headlines/{o}/cover.jpg'
        x['description'] = f"{cap}\n\nThe World's Chokepoints, part {n} of 10.\n\nImage credits:\n{credits(e)}\n• NASA Blue Marble (GIBS), satellite map layer\n\nNarration: synthetic voices (Kokoro TTS). Dates checked against at least two sources.\n\n{tags}"
    else:
        ep = x['id'].split('-')[0]
        x['cover'] = f'videos/out/spain/_covers/{ep}.jpg'; x['file'] = f'videos/out/spain/{ep}/video.mp4'
        x['description'] = f"{cap}\n\nImage credits:\n{credits(e)}\n\nNarration: synthetic voices (Kokoro TTS). Dates checked against at least two sources.\n\n{tags}"
json.dump(q, open('youtube_shorts_queue.json', 'w'), ensure_ascii=False, indent=1)
R = os.path.expanduser('~/cosmic-run/')
for x in q: print(x['id'], '|', (x.get('title') or '-')[:55], '| cover', os.path.exists(R + x.get('cover', '-')), '| video', os.path.exists(R + x['file']))
