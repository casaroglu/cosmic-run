"""Shared helpers for Chokepoints episode generators."""
import json, math, os
ROOT = os.path.expanduser('~/cosmic-run/videos/stories/headlines')
SUEZ = json.load(open(f'{ROOT}/02a-suez/episode.json'))
BASE = {k: SUEZ[k] for k in ('series', 'voices', 'speakers', 'accent', 'watermark', 'scene_pad', 'fade')}
BLUE, RED = '#1f4e8c', '#b3261e'
_C = None


def country(name, minlen=0.0):
    """Outer rings of a Natural Earth 50m country, rounded to 3 decimals."""
    global _C
    _C = _C or json.load(open(f'{ROOT}/_geo/ne_50m_admin_0_countries.geojson'))
    for f in _C['features']:
        p = f['properties']
        if name in (p.get('NAME'), p.get('ADMIN'), p.get('NAME_LONG')):
            g = f['geometry']
            polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
            out = []
            for poly in polys:
                ring = poly[0]
                xs = [a for a, _ in ring]; ys = [b for _, b in ring]
                if max(max(xs) - min(xs), max(ys) - min(ys)) >= minlen:
                    out.append([[round(a, 3), round(b, 3)] for a, b in ring])
            return out
    raise KeyError(name)


def buffer_line(pts, half_deg):
    """Polygon around a polyline, half_deg wide on each side (simple offset)."""
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        a = pts[max(i - 1, 0)]; b = pts[min(i + 1, len(pts) - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]; n = math.hypot(dx, dy) or 1
        nx, ny = -dy / n * half_deg, dx / n * half_deg
        left.append([round(x + nx, 3), round(y + ny, 3)]); right.append([round(x - nx, 3), round(y - ny, 3)])
    return [left + right[::-1] + [left[0]]]


def q(text, **kw): return dict(type='narration', speaker='q', text=text, **kw)
def a(text, **kw): return dict(type='narration', speaker='a', text=text, **kw)
def mv(fx=0.5, fy=0.5, tx=0.55, ty=0.5, z=1.25): return {'from': [fx, fy, 1.0], 'to': [tx, ty, z]}


def write(folder, ep):
    d = f'{ROOT}/{folder}'
    json.dump(ep, open(f'{d}/episode.json', 'w'), indent=1, ensure_ascii=False)
    print('wrote', d, len(ep['beats']), 'beats')
