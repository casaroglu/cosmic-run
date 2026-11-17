"""Add a NASA Blue Marble satellite card to sketch scenes of an episode.json.
usage: python3 add_sat.py EPISODE_DIR scene[,scene...]  (names come from SAT_NAMES below)"""
import json, math, os, sys, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
GIBS = ('https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0'
        '&LAYERS=BlueMarble_ShadedRelief_Bathymetry&STYLES=&CRS=EPSG:4326&FORMAT=image/jpeg')
GEO = json.load(open(os.path.join(HERE, '..', '_geo', 'ne_50m_admin_0_countries.geojson')))
SAT_NAMES = json.load(open(os.path.join(HERE, 'sat_names.json')))

def rings_in(bb):
    out = []
    for f in GEO['features']:
        g = f['geometry']; polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
        for p in polys:
            r = p[0]; xs = [q[0] for q in r]; ys = [q[1] for q in r]
            if max(xs) < bb[0] or min(xs) > bb[2] or max(ys) < bb[1] or min(ys) > bb[3]: continue
            if len(r) < 8: continue
            step = max(1, len(r) // 400)
            out.append([[round(x, 3), round(y, 3)] for x, y in r[::step]])
    return out

def main(d, scenes):
    p = os.path.join(d, 'episode.json'); e = json.load(open(p))
    for sc in scenes:
        spec = e['sketches'][sc]; bb = spec.get('view') or json.load(open(os.path.join(d, spec['coast'])))['bbox']
        key = f'sat_{sc}'; f = f'sketch/{key}.jpg'
        if not os.path.exists(os.path.join(d, f)):
            c = math.cos(math.radians((bb[1] + bb[3]) / 2)); w = 1600
            h = int(min(2400, max(600, w * (bb[3] - bb[1]) / ((bb[2] - bb[0]) * c))))
            urllib.request.urlretrieve(f'{GIBS}&BBOX={bb[1]},{bb[0]},{bb[3]},{bb[2]}&WIDTH={w}&HEIGHT={h}', os.path.join(d, f))
        e['images'][key] = {'file': f, 'credit': 'NASA Blue Marble shaded relief and bathymetry (GIBS)', 'where': 'NASA (public domain)'}
        items = [i for i in spec['items'] if i['kind'] != 'satellite']
        ci = next(i for i, it in enumerate(items) if it['kind'] == 'coast')
        cd = items[ci].get('dur', 1.5)
        names = SAT_NAMES.get(os.path.basename(d.rstrip('/')), {}).get(sc, [])
        sat = {'kind': 'satellite', 'key': key, 'at': round(cd * 0.6, 2), 'dur': 1.0, 'borders': rings_in(bb), 'names': names}
        items.insert(ci + 1, sat); spec['items'] = items
        print(sc, bb, len(sat['borders']), 'border rings', len(names), 'names')
    json.dump(e, open(p, 'w'), ensure_ascii=False, indent=1)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2].split(','))
