#!/usr/bin/env python3
"""Build land polygons (GeoJSON) from OpenStreetMap coastline ways, for city-scale sketch maps
where Natural Earth is too coarse (e.g. the Golden Horn). Map data © OpenStreetMap contributors (ODbL).

usage: osm_land.py LON_MIN LAT_MIN LON_MAX LAT_MAX OUT.geojson [--fetch CACHE.json]
Fetches natural=coastline ways from the Overpass API (only the box is sent), stitches them into
chains (OSM convention: land on the LEFT of the way), clips them to the box and closes each land
piece by walking the box border counter-clockwise. Then run coast.py on the result:
  coast.py LON_MIN LAT_MIN LON_MAX LAT_MAX sketch/city.json OUT.geojson
"""
import json, math, os, subprocess, sys

x0, y0, x1, y1 = map(float, sys.argv[1:5]); out = sys.argv[5]
cache = sys.argv[sys.argv.index("--fetch") + 1] if "--fetch" in sys.argv else out + ".osm.json"
if not os.path.exists(cache):
    q = f'[out:json][timeout:90];way["natural"="coastline"]({y0 - .02},{x0 - .02},{y1 + .02},{x1 + .02});out geom;'
    subprocess.run(["curl", "-s", "-A", "story-video/1.0", "--data-urlencode", "data=" + q,
                    "https://overpass-api.de/api/interpreter", "-o", cache], check=True)
ways = [[(p["lon"], p["lat"]) for p in e["geometry"]] for e in json.load(open(cache))["elements"]]

# 1. stitch ways that share endpoints into chains
chains = []
by_start = {}
for w in ways:
    by_start.setdefault(w[0], []).append(w)
used = set()
for w in ways:
    if id(w) in used:
        continue
    used.add(id(w)); c = list(w)
    while c[-1] in by_start and c[-1] != c[0]:
        nxt = [v for v in by_start[c[-1]] if id(v) not in used]
        if not nxt:
            break
        used.add(id(nxt[0])); c += nxt[0][1:]
    chains.append(c)
# join chains whose end meets another chain's start (order of discovery)
merged = True
while merged:
    merged = False
    for a in chains:
        for b in chains:
            if a is not b and a[-1] == b[0] and a[0] != a[-1]:
                a += b[1:]; chains.remove(b); merged = True; break
        if merged:
            break

inside = lambda p: x0 <= p[0] <= x1 and y0 <= p[1] <= y1


def cross(a, b):
    """point where segment a->b (a inside, b outside or vice versa) meets the box border"""
    best = None
    for t in [(x0 - a[0]) / (b[0] - a[0]) if b[0] != a[0] else None, (x1 - a[0]) / (b[0] - a[0]) if b[0] != a[0] else None,
              (y0 - a[1]) / (b[1] - a[1]) if b[1] != a[1] else None, (y1 - a[1]) / (b[1] - a[1]) if b[1] != a[1] else None]:
        if t is None or not (0 <= t <= 1):
            continue
        p = (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
        if x0 - 1e-9 <= p[0] <= x1 + 1e-9 and y0 - 1e-9 <= p[1] <= y1 + 1e-9:
            if inside(a):   # leaving: the first border hit after a
                if best is None or t < best[0]: best = (t, p)
            else:           # entering: the last border hit before b
                if best is None or t > best[0]: best = (t, p)
    return best[1]


# 2. clip chains into pieces inside the box
pieces, islands = [], []
for c in chains:
    closed = c[0] == c[-1]
    if closed and all(inside(p) for p in c):
        islands.append(c); continue
    cur = None
    for a, b in zip(c, c[1:]):
        if inside(a) and cur is None:
            cur = [a] if a == c[0] and not closed else None
        if cur is None and inside(b) and not inside(a):
            cur = [cross(a, b)]
        if cur is not None:
            if inside(b):
                cur.append(b)
            else:
                cur.append(cross(a, b)); pieces.append(cur); cur = None
    if cur is not None and len(cur) > 1:
        pieces.append(cur)   # chain ends inside the box (incomplete data): leave it open


def perim(p):   # counter-clockwise position along the box border, 0..4
    x, y = p
    if abs(y - y0) < 1e-7: return (x - x0) / (x1 - x0)
    if abs(x - x1) < 1e-7: return 1 + (y - y0) / (y1 - y0)
    if abs(y - y1) < 1e-7: return 2 + (x1 - x) / (x1 - x0)
    return 3 + (y1 - y) / (y1 - y0)


corners = [(0.999999, (x1, y0)), (1.999999, (x1, y1)), (2.999999, (x0, y1)), (3.999999, (x0, y0))]

# 3. close land pieces by walking the border counter-clockwise (land stays on the left)
on_border = lambda p: abs(p[0] - x0) < 1e-7 or abs(p[0] - x1) < 1e-7 or abs(p[1] - y0) < 1e-7 or abs(p[1] - y1) < 1e-7
open_p = [p for p in pieces if on_border(p[0]) and on_border(p[-1])]
polys, left = [], list(open_p)
while left:
    ring = list(left.pop(0)); start = perim(ring[0])
    for _ in range(50):
        e = perim(ring[-1])
        # next entry point counter-clockwise from e (or our own start)
        cands = [(((perim(p[0]) - e) % 4), i) for i, p in enumerate(left)] + [(((start - e) % 4), -1)]
        d, i = min(cands)
        for c_t, c_p in sorted(corners, key=lambda c: (c[0] - e) % 4):
            if 1e-9 < (c_t - e) % 4 < d:
                ring.append(c_p)
        if i == -1:
            ring.append(ring[0]); break
        ring += left.pop(i)
    polys.append(ring)
polys += islands
if not open_p and not islands:
    sys.exit("no coastline in the box")
feats = [{"type": "Feature", "properties": {}, "geometry": {"type": "Polygon", "coordinates": [[list(p) for p in r]]}} for r in polys]
json.dump({"type": "FeatureCollection", "features": feats}, open(out, "w"))
print(out, len(polys), "land polygons,", len(pieces) - len(open_p), "unclosed pieces dropped")
