#!/usr/bin/env python3
"""Cut Natural Earth coastlines to a lon/lat box for a sketch map scene.

usage: coast.py LON_MIN LAT_MIN LON_MAX LAT_MAX OUT.json [GEOJSON ...]
Rings are clipped (Sutherland-Hodgman) to the box plus a margin and lightly simplified.
Each point is [lon, lat, edge] where edge=1 marks a point on the clip border: the renderer fills through it
but never strokes it, so the frame edge never gets a pencil line.
Default GEOJSON: videos/stories/headlines/_geo/ne_10m_land.geojson + ne_10m_minor_islands.geojson
"""
import json, math, os, sys

x0, y0, x1, y1 = map(float, sys.argv[1:5])
out = sys.argv[5]
srcs = sys.argv[6:] or [os.path.expanduser(f'~/cosmic-run/videos/stories/headlines/_geo/{f}.geojson')
                        for f in ('ne_10m_land', 'ne_10m_minor_islands')]
m = max(x1 - x0, y1 - y0) * 0.08
bx0, by0, bx1, by1 = x0 - m, y0 - m, x1 + m, y1 + m
tol = max(x1 - x0, y1 - y0) / 900   # simplification tolerance in degrees


def dp(pts, eps):
    """Douglas-Peucker on [lon, lat, edge] points; keeps edge points."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts); keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay, _ = pts[a]; bx, by, _ = pts[b]
        dx, dy = bx - ax, by - ay; L = math.hypot(dx, dy) or 1e-12
        best, bi = -1, -1
        for i in range(a + 1, b):
            px, py, e = pts[i]
            d = 1e9 if e else abs(dy * px - dx * py + bx * ay - by * ax) / L
            if d > best: best, bi = d, i
        if best > eps:
            keep[bi] = True; stack += [(a, bi), (bi, b)]
    return [p for p, k in zip(pts, keep) if k]


def clip(ring):
    """Sutherland-Hodgman against the margin box: keeps land on the right side of the frame edge
    (clamping points instead can wrap a continent the wrong way round and paint the sea as land)."""
    def cut(pts, inside, inter):
        out = []
        for i in range(len(pts)):
            a, b = pts[i - 1], pts[i]
            if inside(b):
                if not inside(a): out.append(inter(a, b))
                out.append(b)
            elif inside(a):
                out.append(inter(a, b))
        return out
    def ix(x):
        return lambda a, b: [x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0])]
    def iy(y):
        return lambda a, b: [a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y]
    pts = [list(p[:2]) for p in ring]
    for inside, inter in ((lambda p: p[0] >= bx0, ix(bx0)), (lambda p: p[0] <= bx1, ix(bx1)),
                          (lambda p: p[1] >= by0, iy(by0)), (lambda p: p[1] <= by1, iy(by1))):
        pts = cut(pts, inside, inter)
        if not pts: break
    return pts


rings = []
for src in srcs:
    for f in json.load(open(src))['features']:
        g = f['geometry']
        polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
        for poly in polys:
            ring = poly[0]
            if not any(bx0 <= p[0] <= bx1 and by0 <= p[1] <= by1 for p in ring):
                continue
            pts = []
            for lon, lat in clip(ring):
                e = int(abs(lon - bx0) < 1e-9 or abs(lon - bx1) < 1e-9 or abs(lat - by0) < 1e-9 or abs(lat - by1) < 1e-9)
                if pts and pts[-1][:2] == [lon, lat]: continue
                pts.append([lon, lat, e])
            h = len(pts) // 2   # closed ring: simplify the two halves (dp needs distinct endpoints)
            pts = dp(pts[:h + 1], tol) + dp(pts[h:], tol)[1:]
            if len(pts) >= 3:
                rings.append([[round(a, 4), round(b, 4), e] for a, b, e in pts])
rings.sort(key=len, reverse=True)
json.dump({'bbox': [x0, y0, x1, y1], 'rings': rings}, open(out, 'w'), separators=(',', ':'))
print(out, len(rings), 'rings', sum(map(len, rings)), 'points')
