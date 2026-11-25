#!/usr/bin/env python3
"""Style-test stills for the 'Chip Wars' Vox-style collage map explainer.
Map, collage pieces, ink and paper are drawn fully in code (numpy + Pillow, no OpenCV yet).
Coastlines/borders: Natural Earth 1:50m (public domain), already in the repo.
Fonts are macOS stand-ins: Big Caslon (Libre Caslon), Didot Italic (oceans), American Typewriter
(Special Elite), Impact (Anton), Permanent Marker (OFL copy found on disk).
usage: ~/cizgi/.venv/bin/python stills.py  -> frame_0N.png + contact_sheet.jpg"""
import json, math, os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 1920, 1080
BOARD, INK, YEL, BEIGE = (0xEF, 0xEB, 0xE3), (0x1D, 0x1C, 0x20), (0xED, 0xBD, 0x2E), (0xF1, 0xED, 0xE4)
GEO = os.path.expanduser('~/cosmic-run/videos/stories/headlines/_geo')
SUP = '/System/Library/Fonts/Supplemental/'
F_CASLON, F_ANTON = SUP + 'BigCaslon.ttf', SUP + 'Impact.ttf'
F_MARKER = '/Applications/HP.app/Contents/Frameworks/AiOPrint.framework/Versions/A/Resources/PermanentMarker-Regular.ttf'
def font(path, size, index=0): return ImageFont.truetype(path, size, index=index)
def f_italic(s): return font(SUP + 'Didot.ttc', s, 1)
def f_type(s): return font(SUP + 'AmericanTypewriter.ttc', s, 0)
def f_casbold(s): return font(SUP + 'Didot.ttc', s, 2)

CX = math.cos(math.radians(40))   # equirectangular, longitude scaled by cos(mid-latitude)
PLACES = {'veldhoven': (5.40, 51.42), 'oberkochen': (10.10, 48.78), 'sandiego': (-117.16, 32.72),
          'hsinchu': (120.97, 24.80), 'beijing': (116.40, 39.90), 'thehague': (4.30, 52.08)}

def rings(geom):
    polys = [geom['coordinates']] if geom['type'] == 'Polygon' else geom['coordinates']
    for p in polys:
        for r in p: yield np.array(r, float)
LAND = [r for f in json.load(open(f'{GEO}/ne_50m_land.geojson'))['features'] for r in rings(f['geometry'])]
CTRY = {}
for f in json.load(open(f'{GEO}/ne_50m_admin_0_countries.geojson'))['features']:
    CTRY.setdefault(f['properties']['ADM0_A3'], []).extend(rings(f['geometry']))

class Cam:
    def __init__(s, lon, lat, ppd): s.lon, s.lat, s.ppd = lon, lat, ppd
    def xy(s, lon, lat):
        return (W / 2 + (np.asarray(lon) - s.lon) * s.ppd * CX, H / 2 - (np.asarray(lat) - s.lat) * s.ppd)
    def pt(s, name, dx=0, dy=0):
        x, y = s.xy(*PLACES[name]); return (float(x) + dx, float(y) + dy)
    def ring(s, r):
        x, y = s.xy(r[:, 0], r[:, 1])
        if x.max() < -300 or x.min() > W + 300 or y.max() < -300 or y.min() > H + 300: return None
        x, y = np.clip(x, -220, W + 220), np.clip(y, -220, H + 220)   # off-screen runs collapse onto a frame 220 px outside
        q = np.round(np.stack([x, y], 1) / 2.5)          # drop vertices closer than ~2.5 px (joint='curve' is costly)
        keep = np.ones(len(q), bool); keep[1:] = np.any(q[1:] != q[:-1], axis=1)
        x, y = x[keep], y[keep]
        if len(x) < 3: return None
        return list(zip(x.tolist(), y.tolist()))

def decim(pts, g=2.5):
    p = np.array(pts); q = np.round(p / g); keep = np.ones(len(q), bool); keep[1:] = np.any(q[1:] != q[:-1], axis=1)
    return [tuple(v) for v in p[keep]]

def chaikin(pts, n=3):
    p = np.array(pts)
    for _ in range(n):
        q = np.empty((len(p) * 2, 2)); q[0::2] = 0.75 * p + 0.25 * np.roll(p, -1, 0); q[1::2] = 0.25 * p + 0.75 * np.roll(p, -1, 0); p = q
    return [tuple(v) for v in p]

def mask(): return Image.new('L', (W, H), 0)
def comp(arr, m, col, a=1.0):
    m = (np.asarray(m, np.float32) / 255 * a)[..., None]; return arr * (1 - m) + np.array(col, np.float32) * m
def multiply(arr, m, col, a=0.9):
    m = (np.asarray(m, np.float32) / 255 * a)[..., None]; return arr * (1 - m) + arr * (np.array(col, np.float32) / 255) * m

def spaced(d, xy, text, f, fill, sp, anchor_center=True):
    widths = [d.textlength(c, font=f) + sp for c in text]; x, y = xy
    if anchor_center: x -= (sum(widths) - sp) / 2
    for c, w in zip(text, widths): d.text((x, y), c, font=f, fill=fill, anchor='lm'); x += w

# ---------------------------------------------------------------- map
def render_map(cam, featured=(), labels=(), lift=0, sweep=None):
    sweep = sweep or {}
    top = None
    arr = np.zeros((H, W, 3), np.float32) + BOARD
    land_px = [r for r in (cam.ring(r) for r in LAND) if r and len(r) > 2]
    land_px = [decim(chaikin(r)) for r in land_px]; land_px = [r for r in land_px if len(r) > 2]
    lm = mask(); dl = ImageDraw.Draw(lm)
    for r in land_px: dl.polygon(r, fill=255)
    # sea: 4 coast-parallel lines, then wavy horizontals
    sea = mask(); ds = ImageDraw.Draw(sea); prev = lm
    bufs = {}
    big = [r for r in land_px if max(np.ptp(np.array(r)[:, 0]), np.ptp(np.array(r)[:, 1])) > 70]   # no bullseyes round tiny islands
    for d in (8, 19, 32, 48, 58):
        b = lm.copy(); db = ImageDraw.Draw(b)
        for r in big: db.line(r + [r[0]], fill=255, width=2 * d, joint='curve')
        bufs[d] = b
        if d < 58:
            edge = ImageChops.subtract(b, b.filter(ImageFilter.MinFilter(3)))
            sea = ImageChops.lighter(sea, edge.filter(ImageFilter.MaxFilter(3)))
    ox, oy = cam.xy(0, 0); wav = mask(); dw = ImageDraw.Draw(wav)
    for y0 in np.arange(oy % 22 - 22, H + 22, 22):
        pts = [(x, y0 + 3.2 * math.sin((x - ox) / 37 + y0 * 0.7)) for x in range(-10, W + 12, 8)]
        dw.line(pts, fill=255, width=2)
    sea = ImageChops.lighter(sea, ImageChops.subtract(wav, bufs[58]))
    arr = comp(arr, sea, INK, 0.55)
    # land: diagonal hatch every 22 px, anchored to the map so it moves with the camera
    hm = mask(); dh = ImageDraw.Draw(hm); c0 = (ox - oy) % 22
    for c in np.arange(c0 - H - 22, W + 22, 22): dh.line([(c, 0), (c + H, H)], fill=255, width=2)
    arr = comp(arr, ImageChops.multiply(hm, lm), INK, 0.42)
    # featured region: yellow multiplied at 90%, cross-hatch every 13 px
    fm = mask()
    for iso in featured:   # each region is revealed by a south->north sweep (sweep[iso] = 0..1)
        tm = mask(); dt = ImageDraw.Draw(tm)
        for r in CTRY[iso]:
            p = cam.ring(r)
            if p and len(p) > 2: dt.polygon(p, fill=255)
        pr = sweep.get(iso, 1.0); bb = tm.getbbox()
        if bb and pr < 1:
            ta = np.asarray(tm).copy(); thr = int(bb[3] - pr * (bb[3] - bb[1])); ta[:max(0, thr)] = 0; tm = Image.fromarray(ta)
        fm = ImageChops.lighter(fm, tm)
    if fm.getbbox():
        base = arr.copy()
        arr = multiply(arr, fm, YEL, 0.9)
        xm = mask(); dx = ImageDraw.Draw(xm)
        for c in np.arange((ox + oy) % 13 - H - 13, W + H + 13, 13): dx.line([(c, 0), (c - H, H)], fill=255, width=2)
        for c in np.arange((ox - oy) % 13 - H - 13, W + 13, 13): dx.line([(c, 0), (c + H, H)], fill=255, width=2)
        arr = comp(arr, ImageChops.multiply(xm, fm), INK, 0.35)
        if lift:   # 2.5D: the painted region lifts off the board like a card -> cast shadow, striped side wall, raised top
            f = np.asarray(fm); raised = np.roll(arr, -lift, axis=0); arr = base
            sh = Image.fromarray(np.roll(np.roll(f, lift // 2 + 6, 0), lift // 2 + 4, 1)).filter(ImageFilter.GaussianBlur(4 + lift / 2))
            arr = comp(arr, sh, INK, 0.4)
            side = f.copy()
            for k in range(1, lift + 1): side = np.maximum(side, np.roll(f, -k, 0))
            side = Image.fromarray(side); arr = multiply(arr, side, YEL, 0.9); arr = comp(arr, side, INK, 0.42)
            vs = mask(); dv = ImageDraw.Draw(vs)
            for x in np.arange(ox % 7, W, 7): dv.line([(x, 0), (x, H)], fill=255, width=1)
            arr = comp(arr, ImageChops.multiply(vs, side), INK, 0.35)
            top = Image.fromarray(np.roll(f, -lift, 0)); t = (np.asarray(top, np.float32) / 255)[..., None]
            arr = arr * (1 - t) + raised * t
    # dotted graticule every 10 degrees
    gm = mask(); dg = ImageDraw.Draw(gm)
    for lon in range(-180, 181, 10):
        x, _ = cam.xy(lon, 0)
        if -5 < x < W + 5:
            for y in range(0, H, 14): dg.ellipse((x - 1.6, y - 1.6, x + 1.6, y + 1.6), fill=255)
    for lat in range(-80, 81, 10):
        _, y = cam.xy(0, lat)
        if -5 < y < H + 5:
            for x in range(0, W, 14): dg.ellipse((x - 1.6, y - 1.6, x + 1.6, y + 1.6), fill=255)
    if top is not None: gm = ImageChops.subtract(gm, top)
    arr = comp(arr, gm, INK, 0.5)
    # borders: 4 px dashed 22/18, coastline 6 px on top
    bm = mask(); dbm = ImageDraw.Draw(bm)
    for iso, rs in CTRY.items():
        for r in rs:
            p = cam.ring(r)
            if p and len(p) > 2: dash(dbm, p + [p[0]], 22, 18, 3)
    bm = ImageChops.multiply(bm, lm.filter(ImageFilter.MinFilter(9)))
    if top is not None: bm = ImageChops.subtract(bm, top)
    arr = comp(arr, bm, INK, 0.5)
    cm = mask(); dc = ImageDraw.Draw(cm)
    for r in land_px: dc.line(r + [r[0]], fill=255, width=6, joint='curve')
    if top is not None:
        cm = ImageChops.subtract(cm, top.filter(ImageFilter.MinFilter(7)))
        for iso in featured:
            if sweep.get(iso, 1.0) < 1: continue
            for r in CTRY[iso]:
                p = cam.ring(r)
                if p and len(p) > 2:
                    dc2 = ImageDraw.Draw(cm); dc2.line(p + [p[0]], fill=255, width=3, joint='curve')
                    dc2.line([(x, y - lift) for x, y in p] + [(p[0][0], p[0][1] - lift)], fill=255, width=5, joint='curve')
    arr = comp(arr, cm, INK)
    img = Image.fromarray(arr.clip(0, 255).astype(np.uint8)); d = ImageDraw.Draw(img)
    for text, lon, lat, size, italic in labels:
        x, y = cam.xy(lon, lat)
        if not (-600 < x < W + 600 and -100 < y < H + 100): continue
        f = f_italic(size) if italic else font(F_CASLON, size)
        spaced(d, (float(x), float(y)), text, f, INK, size * 0.32)
    return img, lm

def dash(d, pts, on, off, w):
    acc, draw_on = 0.0, True
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        L = math.hypot(x1 - x0, y1 - y0); t = 0.0
        while t < L:
            step = min((on if draw_on else off) - acc, L - t)
            if draw_on:
                a, b = t / L, (t + step) / L
                d.line([(x0 + (x1 - x0) * a, y0 + (y1 - y0) * a), (x0 + (x1 - x0) * b, y0 + (y1 - y0) * b)], fill=255, width=w)
            t += step; acc += step
            if acc >= (on if draw_on else off) - 1e-6: acc, draw_on = 0.0, not draw_on

def compass(img, cx, cy, r=70):
    d = ImageDraw.Draw(img)
    for k in range(8):
        a = k * math.pi / 4; L = r if k % 2 == 0 else r * 0.55
        tip = (cx + L * math.sin(a), cy - L * math.cos(a))
        l = (cx + 10 * math.sin(a - math.pi / 2), cy - 10 * math.cos(a - math.pi / 2))
        rr = (cx + 10 * math.sin(a + math.pi / 2), cy - 10 * math.cos(a + math.pi / 2))
        d.polygon([tip, l, (cx, cy)], fill=INK); d.polygon([tip, rr, (cx, cy)], fill=BOARD, outline=INK, width=2)
    d.ellipse((cx - r * 0.72, cy - r * 0.72, cx + r * 0.72, cy + r * 0.72), outline=INK, width=2)
    spaced(d, (cx, cy - r - 22), 'N', font(F_CASLON, 30), INK, 0)

# ---------------------------------------------------------------- collage pieces
RNG = np.random.default_rng(7)
def halftone(g):
    """g: float grayscale 0..255 -> 5 px dot screen at 45 deg mixed 34%, contrast 1.25, grain."""
    h, w = g.shape; yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = (xx + yy) / math.sqrt(2), (xx - yy) / math.sqrt(2)
    du, dv = (u % 5) - 2.5, (v % 5) - 2.5; dist = np.sqrt(du * du + dv * dv)
    rad = np.sqrt(np.clip(1 - g / 255, 0, 1)) * 3.4
    dots = np.where(dist < rad, 25.0, 245.0)
    out = g * 0.66 + dots * 0.34
    out = (out - 128) * 1.25 + 128 + RNG.normal(0, 6, g.shape)
    return out.clip(0, 255)

def cutout(rgba, screen=True):
    """grayscale drawing -> halftone, 7 px white scissor edge with wobble, drop shadow (5,7) blur 6 at 32%."""
    pad = 24; src = Image.new('RGBA', (rgba.width + 2 * pad, rgba.height + 2 * pad), (0, 0, 0, 0)); src.paste(rgba, (pad, pad), rgba)
    a = src.split()[3]
    g = np.asarray(src.convert('L'), np.float32)
    g = halftone(g) if screen else g
    edge = a.filter(ImageFilter.MaxFilter(15)).filter(ImageFilter.GaussianBlur(2.2))
    e = np.asarray(edge, np.float32) + RNG.normal(0, 38, g.shape).astype(np.float32)
    e = np.asarray(Image.fromarray(e.clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)), np.float32)
    ea = (e > 110).astype(np.float32) * 255
    an = np.asarray(a, np.float32) / 255
    col = (g * an + 252 * (1 - an))
    out = Image.fromarray(np.dstack([col, col, col, ea]).astype(np.uint8), 'RGBA')
    return out

def place(base, piece, center, rot=0.0, scale=1.0, shadow=True):
    p = piece if scale == 1 else piece.resize((round(piece.width * scale), round(piece.height * scale)), Image.LANCZOS)
    p = p.rotate(rot, resample=Image.BICUBIC, expand=True)
    x, y = round(center[0] - p.width / 2), round(center[1] - p.height / 2)
    if shadow:
        sh = Image.new('RGBA', p.size, (0, 0, 0, 0)); sa = p.split()[3].point(lambda v: int(v * 0.32))
        sh.putalpha(sa.filter(ImageFilter.GaussianBlur(6))); sh = Image.composite(Image.new('RGBA', p.size, INK + (255,)), sh, sh)
        sh.putalpha(sa.filter(ImageFilter.GaussianBlur(6)))
        base.alpha_composite(sh, (x + 5, y + 7))
    base.alpha_composite(p, (x, y))

PROPS = os.path.join(HERE, 'props')
def prop(name, deg, width):
    """a Blender render (blender_props.py), cropped and sized; cutout() then halftones and scissor-cuts it."""
    im = Image.open(f'{PROPS}/{name}_{deg:+04d}.png').convert('RGBA'); im = im.crop(im.getbbox())
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)

def draw_machine():
    """generic lithography machine: a tall cabinet block with panels, a wafer port and a light module."""
    im = Image.new('RGBA', (360, 250), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((10, 60, 250, 240), fill=(205, 205, 205, 255)); d.rectangle((250, 100, 350, 240), fill=(150, 150, 150, 255))
    d.polygon([(10, 60), (60, 20), (300, 20), (250, 60)], fill=(232, 232, 232, 255)); d.polygon([(250, 60), (300, 20), (300, 100), (250, 100)], fill=(120, 120, 120, 255))
    for x in (30, 95, 160): d.rectangle((x, 80, x + 55, 220), outline=(110, 110, 110, 255), width=3)
    d.rectangle((262, 120, 338, 160), fill=(60, 60, 60, 255)); d.ellipse((280, 175, 320, 215), fill=(240, 240, 240, 255), outline=(70, 70, 70, 255), width=3)
    for i in range(6): d.line((40 + i * 35, 26, 70 + i * 35, 26), fill=(150, 150, 150, 255), width=2)
    return im

def draw_engineer(sad=False):
    """generic clean-room engineer in a bunny suit (no real person)."""
    im = Image.new('RGBA', (200, 330), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((40, 110, 160, 320), 40, fill=(222, 222, 222, 255), outline=(90, 90, 90, 255), width=4)
    d.rounded_rectangle((15, 130, 55, 260), 18, fill=(190, 190, 190, 255), outline=(90, 90, 90, 255), width=3); d.rounded_rectangle((145, 130, 185, 260), 18, fill=(190, 190, 190, 255), outline=(90, 90, 90, 255), width=3)
    d.ellipse((50, 20, 150, 130), fill=(232, 232, 232, 255), outline=(90, 90, 90, 255), width=4)
    d.rounded_rectangle((68, 58, 132, 92), 14, fill=(70, 70, 70, 255))
    for ex in (86, 114):
        d.ellipse((ex - 6, 66, ex + 6, 80), fill=(250, 250, 250, 255))
    if sad: d.arc((84, 96, 116, 118), 200, 340, fill=(80, 80, 80, 255), width=4)
    else: d.arc((84, 88, 116, 110), 20, 160, fill=(80, 80, 80, 255), width=4)
    d.line((100, 140, 100, 300), fill=(180, 180, 180, 255), width=3)
    return im

def draw_crate():
    im = Image.new('RGBA', (230, 140), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((5, 25, 200, 135), fill=(160, 160, 160, 255)); d.polygon([(5, 25), (30, 5), (225, 5), (200, 25)], fill=(200, 200, 200, 255))
    d.polygon([(200, 25), (225, 5), (225, 115), (200, 135)], fill=(110, 110, 110, 255))
    for x in range(20, 200, 22): d.line((x, 30, x, 130), fill=(120, 120, 120, 255), width=4)
    return im

def draw_document(title, lines_n=7):
    """engraved line-art licence on cream paper (no halftone)."""
    im = Image.new('RGBA', (260, 330), BEIGE + (255,)); d = ImageDraw.Draw(im)
    d.rectangle((10, 10, 249, 319), outline=INK, width=2); d.rectangle((16, 16, 243, 313), outline=INK, width=1)
    spaced(d, (130, 48), title, font(F_CASLON, 26), INK, 4)
    for i in range(lines_n): d.line((36, 90 + i * 22, 224 - (i % 3) * 22, 90 + i * 22), fill=INK, width=2)
    d.ellipse((150, 250, 215, 305), outline=INK, width=3); d.ellipse((160, 260, 205, 295), outline=INK, width=1)
    return im

def tag(text, size=24):
    f = f_type(size); tw = sum(ImageDraw.Draw(Image.new('L', (1, 1))).textlength(c, font=f) + size * 0.22 for c in text)
    im = Image.new('RGBA', (int(tw + 36), int(size * 1.9)), YEL + (255,)); d = ImageDraw.Draw(im)
    spaced(d, (im.width / 2, im.height / 2 + 1), text, f, INK, size * 0.22)
    return im

def note(text, size=64):
    f = font(F_MARKER, size); d0 = ImageDraw.Draw(Image.new('L', (1, 1)))
    lines = text.split('\n'); w = max(d0.textlength(l, font=f) for l in lines)
    im = Image.new('RGBA', (int(w + 20), int(len(lines) * size * 1.15 + 20)), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for i, l in enumerate(lines): d.text((10, 10 + i * size * 1.15), l, font=f, fill=INK + (255,))
    return im

RANSOM_FONTS = [lambda s: font(F_CASLON, s), lambda s: font(F_ANTON, s), lambda s: f_type(s)]
RANSOM_BG = [(INK, BEIGE), (BEIGE, INK), (YEL, INK)]
def ransom(base, text, center, size=120, seed=3):
    rnd = random.Random(seed); pieces = []
    for i, ch in enumerate(text):
        if ch == ' ': pieces.append(None); continue
        f = font(F_ANTON, size) if ch.isdigit() else RANSOM_FONTS[i % 3](size); bg, fg = RANSOM_BG[(i + seed) % 3]
        d0 = ImageDraw.Draw(Image.new('L', (1, 1))); bb = d0.textbbox((0, 0), ch, font=f)
        w, h = bb[2] - bb[0] + size * 0.32, size * 1.12
        im = Image.new('RGBA', (int(w), int(h)), bg + (255,)); ImageDraw.Draw(im).text((w / 2, h / 2), ch, font=f, fill=fg, anchor='mm')
        pieces.append(im)
    total = sum((p.width if p else size * 0.35) + 6 for p in pieces); x = center[0] - total / 2
    for p in pieces:
        if p is None: x += size * 0.35 + 6; continue
        place(base, p, (x + p.width / 2, center[1] + rnd.uniform(-8, 8)), rnd.uniform(-7, 7)); x += p.width + 6
    return (center[0] - total / 2, center[0] + total / 2)

def title_card(base, fig, lines):
    f = font(F_CASLON, 68); h = 70 + len(lines) * 80
    im = Image.new('RGBA', (560, h), BEIGE + (255,)); d = ImageDraw.Draw(im)
    for i, l in enumerate(lines): d.text((36, 44 + i * 80), l, font=f, fill=INK)
    place(base, im, (60 + 280, 50 + h / 2), -1.2)
    place(base, tag(fig, 22), (120, 52), 2.0)

# ---------------------------------------------------------------- ink (screen space, constant weight)
def marker(m, pts, w=5.5, seed=0, reveal=1.0):
    """felt marker: circles stamped every 1.6 px, +-15% width wobble, tapered ends; dry crayon pass merged with max()."""
    rnd = random.Random(seed); p = np.array(pts, float)
    seg = np.hypot(*np.diff(p, axis=0).T); L = seg.sum()
    if L < 1: return
    t = np.concatenate([[0], np.cumsum(seg)]); s = np.arange(0, L * reveal, 1.6)
    xs, ys = np.interp(s, t, p[:, 0]), np.interp(s, t, p[:, 1])
    main, dry = Image.new('L', m.size, 0), Image.new('L', m.size, 0); dm, dd = ImageDraw.Draw(main), ImageDraw.Draw(dry)
    for i, (x, y) in enumerate(zip(xs, ys)):
        taper = min(1, s[i] / 14, (L - s[i]) / 14 + 0.25)
        r = w / 2 * (1 + 0.15 * math.sin(s[i] / 9 + seed)) * max(0.35, taper)
        dm.ellipse((x - r, y - r, x + r, y + r), fill=230)
        if rnd.random() > 0.35:
            rr = w * 0.32; ox = rnd.uniform(-w * 0.4, w * 0.4)
            dd.ellipse((x + ox - rr, y + ox - rr, x + ox + rr, y + ox + rr), fill=255)
    m.paste(ImageChops.lighter(m, ImageChops.lighter(main, dry)))

def bezier(a, b, bend=0.22, n=80):
    (x0, y0), (x1, y1) = a, b; mx, my = (x0 + x1) / 2, (y0 + y1) / 2; dx, dy = x1 - x0, y1 - y0
    cx, cy = mx + dy * bend, my - dx * bend
    return [((1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1) for t in np.linspace(0, 1, n)]

def dashed_marker(m, pts, on=27, off=19, w=5):
    p = np.array(pts); seg = np.hypot(*np.diff(p, axis=0).T); t = np.concatenate([[0], np.cumsum(seg)])
    for s0 in np.arange(0, t[-1], on + off):
        s = np.linspace(s0, min(s0 + on, t[-1]), 10)
        marker(m, list(zip(np.interp(s, t, p[:, 0]), np.interp(s, t, p[:, 1]))), w, seed=int(s0))

def arrowhead(m, pts, size=26):
    (x0, y0), (x1, y1) = pts[-4], pts[-1]; a = math.atan2(y1 - y0, x1 - x0)
    for s in (0.48, -0.48):
        marker(m, [(x1, y1), (x1 - size * math.cos(a + s), y1 - size * math.sin(a + s))], 5.5, seed=11)

def ink_circle(m, c, rx, ry, seed=1):
    a = np.linspace(-0.3, 2 * math.pi + 0.35, 90)
    marker(m, [(c[0] + rx * (1 + 0.04 * math.sin(3 * t + seed)) * math.cos(t), c[1] + ry * math.sin(t)) for t in a], 5.5, seed)

def ink_x(m, c, r=20):
    marker(m, [(c[0] - r, c[1] - r), (c[0] + r, c[1] + r)], 6, 3); marker(m, [(c[0] + r, c[1] - r), (c[0] - r, c[1] + r)], 6, 4)

def splash(m, c, seed=0):
    rnd = random.Random(seed); d = ImageDraw.Draw(m)
    for _ in range(9):
        a, r = rnd.uniform(0, 6.28), rnd.uniform(28, 60); s = rnd.uniform(2, 6)
        x, y = c[0] + r * math.cos(a), c[1] + r * math.sin(a); d.ellipse((x - s, y - s, x + s, y + s), fill=255)

def apply_ink(img, m): return Image.composite(Image.new('RGBA', img.size, INK + (255,)), img, m)

# ---------------------------------------------------------------- paper finish
def paper(seed=0):
    r = np.random.default_rng(seed); cloud = np.zeros((H, W), np.float32)
    for s, a in ((8, 0.018), (32, 0.014), (128, 0.012)):
        n = r.normal(0, 1, (H // s + 2, W // s + 2)).astype(np.float32)
        cloud += a * np.asarray(Image.fromarray(n).resize((W, H), Image.BICUBIC), np.float32)
    tex = 1.0 + cloud + r.normal(0, 0.012, (H, W)).astype(np.float32)
    fib = Image.new('L', (W, H), 0); d = ImageDraw.Draw(fib)
    for _ in range(900):
        x, y, a = r.uniform(0, W), r.uniform(0, H), r.uniform(0, 6.28); L = r.uniform(6, 22)
        d.line((x, y, x + L * math.cos(a), y + L * math.sin(a)), fill=int(r.uniform(30, 90)), width=1)
    for _ in range(2):
        y0, y1 = r.uniform(0, H), r.uniform(0, H); d.line((0, y0, W, y1), fill=40, width=2)
    tex -= np.asarray(fib, np.float32) / 255 * 0.05
    yy, xx = np.mgrid[0:H, 0:W]; v = ((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2
    tex *= 1 - 0.07 * v
    for _ in range(40):
        x, y = int(r.uniform(0, W)), int(r.uniform(0, H)); tex[max(0, y - 1):y + 2, max(0, x - 1):x + 2] *= 0.6
    return tex.clip(0.6, 1.05)[..., None]

def finish(img, seed=0):
    a = np.asarray(img.convert('RGB'), np.float32) * paper(seed)
    return Image.fromarray(a.clip(0, 255).astype(np.uint8))

# ---------------------------------------------------------------- shots
EU_LABELS = [('NETHERLANDS', 5.6, 52.75, 34, False), ('GERMANY', 10.2, 51.0, 34, False), ('BELGIUM', 4.4, 50.55, 30, False),
             ('FRANCE', 3.0, 48.9, 30, False), ('North Sea', 3.0, 55.5, 40, True), ('Veldhoven', 5.4, 51.18, 24, False)]
WIDE_LABELS = [('Atlantic Ocean', -40, 33, 46, True), ('Pacific Ocean', 150, 15, 46, True), ('Indian Ocean', 75, -2, 46, True),
               ('CHINA', 103, 35, 40, False), ('RUSSIA', 90, 61, 40, False), ('TAIWAN', 128.5, 23.5, 28, False),
               ('EUROPE', 18, 49, 32, False), ('INDIA', 78, 21, 34, False), ('UNITED STATES', -100, 39, 36, False)]

def shot1(angle=15):   # 0 s: the home region paints yellow on its name, a ransom "1" slaps onto it
    cam = Cam(5.9, 52.0, 150)
    img, _ = render_map(cam, ['NLD'], EU_LABELS, lift=16); compass(img, 1700, 220); img = img.convert('RGBA')
    title_card(img, 'FIG. 01', ['The Machine', 'Only One', 'Firm Builds'])
    ransom(img, '1', cam.pt('veldhoven', 150, -130), 170, seed=2)
    place(img, cutout(prop('machine', angle, 400)), cam.pt('veldhoven', 330, 110), -2)
    place(img, tag('VELDHOVEN · ASML'), cam.pt('veldhoven', 330, 255), 1.5)
    m = mask(); marker(m, bezier(cam.pt('veldhoven', 175, 90), cam.pt('veldhoven', 12, 8), 0.25)); arrowhead(m, bezier(cam.pt('veldhoven', 175, 90), cam.pt('veldhoven', 12, 8), 0.25))
    img = apply_ink(img, m)
    place(img, note('only one maker on earth', 58), (1440, 1010), -2, shadow=False)
    return img

def shot2():   # pull out WIDE: dashed arc Veldhoven -> Hsinchu with a distance tag, the far party pinned and circled
    cam = Cam(60, 47, 14.5)
    img, _ = render_map(cam, ['NLD'], WIDE_LABELS, lift=6); compass(img, 1180, 1000, 50); img = img.convert('RGBA')
    title_card(img, 'FIG. 01', ['The Machine', 'Only One', 'Firm Builds'])
    a, b = cam.pt('veldhoven'), cam.pt('hsinchu'); path = bezier(a, b, 0.16)
    m = mask(); dashed_marker(m, path); ink_circle(m, cam.pt('hsinchu', 0, -150), 115, 160, 2); img = apply_ink(img, m)
    mid = path[len(path) // 2]; place(img, tag('9,470 KM', 26), (mid[0], mid[1] - 40), -2)
    place(img, cutout(draw_engineer()), cam.pt('hsinchu', 0, -160), 3, 0.8)
    cp = path[int(len(path) * 0.3)]; place(img, cutout(prop('container', 15, 170)), (cp[0], cp[1] - 45), -3)
    place(img, tag('HSINCHU · TAIWAN'), cam.pt('hsinchu', 0, 40), -1.5)
    place(img, note('its best customer', 58), cam.pt('hsinchu', -150, -420), -2, shadow=False)
    return img

def shot3():   # the causes as arrows, each with a tag; a crate travels along the last arrow
    cam = Cam(-45, 44, 11.5)
    labels = [l for l in WIDE_LABELS if l[0] in ('Atlantic Ocean', 'UNITED STATES', 'EUROPE')] + [('Pacific Ocean', -140, 25, 44, True)]
    img, _ = render_map(cam, ['NLD'], labels, lift=5); compass(img, 1000, 990, 50); img = img.convert('RGBA')
    title_card(img, 'FIG. 02', ['Parts From', 'Far Away'])
    v, sd, ob = cam.pt('veldhoven'), cam.pt('sandiego'), cam.pt('oberkochen')
    m = mask(); p1 = bezier(sd, (v[0] - 10, v[1] + 4), 0.2); marker(m, p1); arrowhead(m, p1)
    p2 = bezier((ob[0] + 60, ob[1] + 232), (ob[0] + 4, ob[1] + 8), -0.3); marker(m, p2); arrowhead(m, p2)
    img = apply_ink(img, m)
    place(img, tag('LIGHT SOURCE · SAN DIEGO'), cam.pt('sandiego', 40, 50), 1.5)
    place(img, tag('MIRRORS · ZEISS, OBERKOCHEN'), (ob[0] + 60, ob[1] + 260), -1.5)
    mid = p1[int(len(p1) * 0.62)]; place(img, cutout(prop('container', 30, 150)), (mid[0], mid[1] - 10), -4)
    place(img, note('built from all over', 60), (870, 850), 2, shadow=False)
    return img

def shot4():   # zoom to the event city: crates drop in with splashes, the big number in ransom letters with a tag
    cam = Cam(121.3, 24.0, 150)
    labels = [('TAIWAN', 121.0, 23.4, 40, False), ('Taiwan Strait', 119.6, 23.0, 38, True), ('Hsinchu', 120.97, 24.6, 24, False)]
    img, _ = render_map(cam, ['TWN'], labels, lift=14); compass(img, 1760, 930, 60); img = img.convert('RGBA')
    title_card(img, 'FIG. 03', ['Hsinchu,', 'Delivery Day'])
    m = mask(); h = cam.pt('hsinchu')
    for i, (dx, dy) in enumerate([(-470, 150), (-300, 225), (-130, 150)]): splash(m, (h[0] + dx, h[1] + dy + 30), i)
    img = apply_ink(img, m)
    for i, (dx, dy) in enumerate([(-470, 150), (-300, 225), (-130, 150)]): place(img, cutout(prop('container', (-30, 0, 30)[i], 200)), (h[0] + dx, h[1] + dy), (-3, 2, -1)[i])
    ransom(img, '40', (1350, 380), 190, seed=5)
    place(img, tag('FREIGHT CONTAINERS FOR ONE MACHINE', 23), (1350, 530), -1)
    place(img, tag('+ 20 TRUCKS · 3 CARGO JETS', 23), (1350, 590), 1.2)
    place(img, cutout(draw_engineer()), (1300, 820), 4, 0.75)
    m = mask(); ink_circle(m, (1300, 820), 105, 150, 4); img = apply_ink(img, m)
    place(img, note('some assembly\nrequired', 62), (1620, 820), -3, shadow=False)
    return img

def shot5():   # final pull-out: payoff word in ransom letters, the never-shipped crate crossed out, beige sheet at the bottom
    cam = Cam(60, 47, 14.5)
    img, _ = render_map(cam, ['NLD'], WIDE_LABELS, lift=6); img = img.convert('RGBA')
    m = mask(); bj = cam.pt('beijing'); th = cam.pt('thehague')
    place(img, cutout(prop('container', -15, 150)), (bj[0], bj[1] - 70), -3)
    ink_x(m, (bj[0], bj[1] - 70), 34); ink_x(m, bj, 14)
    p = bezier(th, (bj[0] - 80, bj[1] - 70), 0.12); dashed_marker(m, p[:62], w=6); img = apply_ink(img, m)
    place(img, tag('BEIJING · NEVER SHIPPED'), (bj[0], bj[1] + 40), 1.5)
    place(img, cutout(draw_document('LICENCE'), screen=False), cam.pt('thehague', -10, -120), -6, 0.5)
    place(img, tag('THE HAGUE 2019 · LAPSED'), cam.pt('thehague', 0, 30), -1.5)
    ransom(img, 'CHOKEPOINT', (900, 170), 92, seed=8)
    sheet = Image.new('RGBA', (980, 250), BEIGE + (255,)); d = ImageDraw.Draw(sheet)
    spaced(d, (490, 70), 'China has never received one.', f_casbold(56), INK, 1)
    place(img, sheet, (960, 925), 0.6)
    hl = Image.new('RGBA', (520, 34), YEL + (210,)); place(img, hl, (960, 1000), -0.8, shadow=False)
    ransom(img, 'NOT ONE', (960, 985), 72, seed=4)
    return img

if __name__ == '__main__':
    outs = []
    for i, fn in enumerate((shot1, shot2, shot3, shot4, shot5), 1):
        im = finish(fn(), i); p = os.path.join(HERE, f'frame_{i:02d}.png'); im.save(p); outs.append(im); print('wrote', p)
    sheet = Image.new('RGB', (1920, 1080 + 540), BOARD)
    for i, im in enumerate(outs):
        t = im.resize((640, 360), Image.LANCZOS); sheet.paste(t, ((i % 3) * 640, (i // 3) * 360))
    sheet.crop((0, 0, 1920, 720)).save(os.path.join(HERE, 'contact_sheet.jpg'), quality=88); print('contact sheet')
    # turn strip: the 3D machine at four steps of its slow turn (on twos in the video)
    cam = Cam(5.9, 52.0, 150); cx, cy = cam.pt('veldhoven', 330, 110); strip = Image.new('RGB', (4 * 600, 440), BOARD)
    for k, a in enumerate((-15, 0, 15, 30)):
        fr = finish(shot1(a), 1); strip.paste(fr.crop((int(cx) - 300, int(cy) - 230, int(cx) + 300, int(cy) + 210)), (k * 600, 0))
    strip.save(os.path.join(HERE, 'turn_strip.jpg'), quality=88); print('turn strip')
