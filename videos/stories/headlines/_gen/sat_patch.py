"""After add_sat: brighten routes on satellite scenes, drop borders on world maps, patch the out timeline (audio unchanged)."""
import json, os, sys
d, out = sys.argv[1], sys.argv[2]
p = os.path.join(d, 'episode.json'); e = json.load(open(p))
for sc, spec in e['sketches'].items():
    its = spec['items']; si = next((i for i, it in enumerate(its) if it['kind'] == 'satellite'), None)
    if si is None: continue
    bb = json.load(open(os.path.join(d, spec['coast'])))['bbox']
    if bb[2] - bb[0] > 60: its[si]['borders'] = []
    for it in its[si + 1:]:
        if it['kind'] in ('route', 'arrow', 'ships'):
            c = it.get('color', '#1f4e8c')
            if c.lower() in ('#1f4e8c', '#2b2b2b', '#222', '#333333'): it['color'] = '#ffd23f'
            elif c.lower() == '#b3261e': it['color'] = '#ff5a4e'
json.dump(e, open(p, 'w'), ensure_ascii=False, indent=1)
tl = os.path.join(out, 'timeline.json')
if not os.path.exists(tl): sys.exit(0)
t = json.load(open(tl)); sk = {}
for k, v in e['sketches'].items():
    v = dict(v)
    if isinstance(v.get('coast'), str): v['coast'] = json.load(open(os.path.join(d, v['coast'])))
    sk[k] = v
t['sketches'] = sk
for k, v in e['images'].items():
    t['images'][k] = dict(v, file=os.path.abspath(os.path.join(d, v['file'])))
json.dump(t, open(tl, 'w'))
ends = {}; cur = None
for b in t['beats']:
    cur = b.get('scene') or cur; ends[cur] = b['end']
print(' '.join(f"{round(ends[s]-0.1,1):g}" for s, spec in e['sketches'].items() if any(i['kind']=='satellite' for i in spec['items']) and s in ends))
