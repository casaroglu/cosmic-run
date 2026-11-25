#!/usr/bin/env python3
"""Chip Wars vertical Shorts engine (1080x1920, 30 fps, on twos), extracted from 03-asml/render.py (v2 pilot, approved).
An episode's render.py calls init(), defines MOVES / LABELS / PAINT and its elements with add(), calls finish(), then main().
Rules baked in: big text, text appears silently, soft object slaps at 0.2 x voice peak, low music bed (-24 dB), no whoosh,
camera focus at the centre of the Shorts safe area (x 40-940, y 60-1540), logo top right."""
import json, math, os, random, subprocess, sys, wave
from multiprocessing import Pool
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'style_test'))
import stills as S
LANDSCAPE = os.environ.get('CW_ORIENT', 'v') == 'h'   # 'h': 1920x1080 long-form; default: 1080x1920 Shorts
S.W, S.H = (1920, 1080) if LANDSCAPE else (1080, 1920)
from stills import *                         # noqa: F401,F403
FPS = 30
FX, FY = (960, 540) if LANDSCAPE else (490, 820)
SWEEP = 16
E, MOVES, LABELS, PAINT = [], [], [], {}
WORK = OUTDIR = None; WORDS = []; NFR = 0; END = 0; START = None

def init(here, outdir, tail=0.9):
    """read the episode's voice timing; NFR = voice end + tail."""
    global WORK, OUTDIR, WORDS, NFR, END
    WORK = os.path.join(here, 'work'); OUTDIR = os.path.expanduser(outdir)
    WORDS = json.load(open(os.path.join(WORK, 'words_tts.json')))
    NFR = int(round((json.load(open(os.path.join(WORK, 'segments.json')))[-1]['e'] + tail) * FPS)); END = NFR + 10

def cue(word, occ=1, d=0):
    n = 0
    for w in WORDS:
        if w['w'].lower().strip('.,?!:;') == word.lower():
            n += 1
            if n == occ: return int(round(w['s'] * FPS)) + d
    raise KeyError((word, occ))

def add(kind, f0, f1, **kw): E.append(dict(kind=kind, f0=f0, f1=f1, **kw)); return E[-1]

def finish(start, moves, labels, paint):
    """set the camera start focus, the moves (start, length, focus), labels by zoom band and painted regions {iso: (on, off)}."""
    global START
    START = start; MOVES[:] = moves; LABELS[:] = labels; PAINT.clear(); PAINT.update(paint)
    cards = sorted(e['f0'] for e in E if e['kind'] == 'card')
    for e in E:
        if e['kind'] == 'card':
            nxt = [c for c in cards if c > e['f0']]
            e['f1'] = min(e['f1'], nxt[0]) if nxt else e['f1']

def smooth(t): t = min(1, max(0, t)); return t * t * (3 - 2 * t)
def focus_at(f):
    f -= f % 2
    cur = START
    for s, n, tgt in MOVES:
        if f <= s: break
        t = smooth((f - s) / n)
        cur = (cur[0] + (tgt[0] - cur[0]) * t, cur[1] + (tgt[1] - cur[1]) * t, math.exp(math.log(cur[2]) + (math.log(tgt[2]) - math.log(cur[2])) * t))
    return cur
def cam_at(f):
    lon, lat, ppd = focus_at(f)
    return Cam(lon - (FX - W / 2) / (ppd * CX), lat - (H / 2 - FY) / ppd, ppd)
def lift_for(ppd): return int(max(4, min(16, ppd * 0.09)))
def labels_for(ppd): return [l[:5] for l in LABELS if l[5] <= ppd < l[6]]

# ------------------------------------------------------------------ collage pieces drawn in code (generic, no logos)
def draw_tin():
    """droplet generator nozzle and a falling stream of tin drops; the last one is flattened by the pre-pulse."""
    im = Image.new('RGBA', (300, 470), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((100, 0, 200, 70), fill=(110, 110, 110, 255)); d.polygon([(118, 70), (182, 70), (150, 104)], fill=(70, 70, 70, 255))
    d.rectangle((92, 0, 208, 14), fill=(60, 60, 60, 255))
    for i, y in enumerate((150, 225, 300)):
        d.ellipse((150 - 17, y - 17, 150 + 17, y + 17), fill=(150, 150, 150, 255), outline=(60, 60, 60, 255), width=3)
        d.ellipse((150 - 9, y - 11, 150 - 1, y - 3), fill=(245, 245, 245, 255))
    d.ellipse((150 - 40, 385 - 11, 150 + 40, 385 + 11), fill=(140, 140, 140, 255), outline=(60, 60, 60, 255), width=3)
    return im
TIN_HIT = (150, 385)

def draw_flash(r=120):
    s = int(r * 2.6); im = Image.new('RGBA', (s, s), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = s / 2
    pts = [(c + (r if k % 2 == 0 else r * 0.48) * math.cos(k * math.pi / 8), c + (r if k % 2 == 0 else r * 0.48) * math.sin(k * math.pi / 8)) for k in range(16)]
    d.polygon(pts, fill=YEL + (255,), outline=INK + (255,), width=5)
    for k in range(8):
        a = k * math.pi / 4 + math.pi / 8
        d.line((c + r * 1.05 * math.cos(a), c + r * 1.05 * math.sin(a), c + r * 1.28 * math.cos(a), c + r * 1.28 * math.sin(a)), fill=INK + (255,), width=6)
    d.ellipse((c - r * 0.22, c - r * 0.22, c + r * 0.22, c + r * 0.22), fill=BEIGE + (255,), outline=INK + (255,), width=4)
    return im

def draw_beam(L=430):
    im = Image.new('RGBA', (L, 34), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.polygon([(0, 4), (L - 6, 12), (L - 6, 22), (0, 30)], fill=YEL + (255,), outline=INK + (255,), width=4)
    for x in range(30, L - 30, 46): d.line((x, 17, x + 22, 17), fill=INK + (255,), width=3)
    return im

def draw_sun(r=100):
    s = int(r * 2.7); im = Image.new('RGBA', (s, s), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = s / 2
    for k in range(12):
        a = k * math.pi / 6
        d.polygon([(c + r * 1.08 * math.cos(a - 0.13), c + r * 1.08 * math.sin(a - 0.13)), (c + r * 1.32 * math.cos(a), c + r * 1.32 * math.sin(a)),
                   (c + r * 1.08 * math.cos(a + 0.13), c + r * 1.08 * math.sin(a + 0.13))], fill=INK + (255,))
    d.ellipse((c - r, c - r, c + r, c + r), fill=YEL + (255,), outline=INK + (255,), width=5)
    return im

def draw_wafer(r=140):
    s = 2 * r + 8; im = Image.new('RGBA', (s, s), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = s / 2
    d.ellipse((c - r, c - r, c + r, c + r), fill=(185, 185, 185, 255), outline=(70, 70, 70, 255), width=4)
    m = Image.new('L', (s, s), 0); ImageDraw.Draw(m).ellipse((c - r + 10, c - r + 10, c + r - 10, c + r - 10), fill=255)
    g = Image.new('RGBA', (s, s), (0, 0, 0, 0)); dg = ImageDraw.Draw(g)
    for x in range(int(c - r), int(c + r), 26): dg.line((x, 0, x, s), fill=(95, 95, 95, 255), width=2)
    for y in range(int(c - r), int(c + r), 26): dg.line((0, y, s, y), fill=(95, 95, 95, 255), width=2)
    im.paste(g, (0, 0), ImageChops.multiply(m, g.split()[3]))
    d.ellipse((c - r * 0.55, c - r * 0.75, c - r * 0.05, c - r * 0.35), fill=(235, 235, 235, 255))
    return im

def draw_mirror(r=125):
    s = 2 * r + 30; c = s / 2
    yy, xx = np.mgrid[0:s, 0:s].astype(np.float32); rr = np.hypot(xx - c + r * 0.18, yy - c + r * 0.22) / r
    disc = np.hypot(xx - c, yy - c); g = np.clip(245 - rr * 120, 80, 250)
    a = np.where(disc <= r + 13, 255, 0).astype(np.uint8); g = np.where((disc > r) & (disc <= r + 13), 95, g)
    im = Image.fromarray(np.dstack([g, g, g, a]).astype(np.uint8), 'RGBA'); d = ImageDraw.Draw(im)
    d.ellipse((c - r, c - r, c + r, c + r), outline=(60, 60, 60, 255), width=3)
    d.arc((c - r * 0.7, c - r * 0.7, c + r * 0.4, c + r * 0.4), 200, 260, fill=(255, 255, 255, 255), width=6)
    return im

def draw_phone():
    """a generic smartphone: dark body, light screen with a plain icon grid, no brand."""
    im = Image.new('RGBA', (230, 440), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, 229, 439), 38, fill=(55, 55, 55, 255))
    d.rounded_rectangle((12, 14, 217, 425), 30, fill=(215, 215, 215, 255))
    d.rounded_rectangle((85, 24, 145, 40), 8, fill=(40, 40, 40, 255))
    for r in range(4):
        for c in range(4):
            x, y = 32 + c * 44, 80 + r * 56; d.rounded_rectangle((x, y, x + 32, y + 32), 8, fill=(150 - (r + c) % 3 * 25,) * 3 + (255,))
    d.rounded_rectangle((32, 330, 198, 360), 10, fill=(170, 170, 170, 255))
    d.rounded_rectangle((80, 402, 150, 408), 3, fill=(90, 90, 90, 255))
    return im

def draw_chip():
    """a generic AI accelerator package: substrate, a big die in the middle, four memory stacks, solder balls round the edge."""
    im = Image.new('RGBA', (300, 300), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((10, 10, 289, 289), 14, fill=(120, 120, 120, 255), outline=(50, 50, 50, 255), width=4)
    for k in range(13):
        for x, y in ((24 + k * 21, 22), (24 + k * 21, 278), (22, 24 + k * 21), (278, 24 + k * 21)):
            d.ellipse((x - 4, y - 4, x + 4, y + 4), fill=(200, 200, 200, 255))
    d.rectangle((82, 70, 218, 230), fill=(45, 45, 45, 255), outline=(20, 20, 20, 255), width=3)
    d.polygon([(90, 78), (150, 78), (98, 140)], fill=(95, 95, 95, 255))
    for x, y in ((40, 74), (40, 160), (228, 74), (228, 160)):
        d.rectangle((x, y, x + 32, y + 66), fill=(170, 170, 170, 255), outline=(60, 60, 60, 255), width=3)
        for k in range(1, 4): d.line((x + 3, y + k * 16, x + 29, y + k * 16), fill=(90, 90, 90, 255), width=2)
    return im


# ------------------------------------------------------------------ helpers (as in ep 01)
_cache = {}
def cached(key, fn):
    if key not in _cache: _cache[key] = fn()
    return _cache[key]
def slap(age): return 1.1 if age < 2 else (0.98 if age < 4 else 1.0)
def boil(f, seed):
    r = random.Random(seed * 97 + (f // 8) % 3); return r.uniform(-1.5, 1.5), r.uniform(-1.5, 1.5), r.uniform(-0.4, 0.4)
def id_of(e): return E.index(e)
def flyer_xy(f): return (FX + 4 * math.sin(f * 0.3), FY - 20)
def resolve(p, cam, f):
    if p[0] == 'xy': return (p[1], p[2])
    if p[0] == 'flyer': return flyer_xy(f)
    return cam.pt(*p)
def pos(e, cam):
    if 'xy' in e: return e['xy']
    name, dx, dy = e['pin']; return cam.pt(name, dx, dy)
def put(img, piece, e, f, cam, xy=None, rot=0.0, scale=1.0, shadow=True):
    x, y = xy if xy else pos(e, cam); bx, by, br = boil(f, id_of(e))
    place(img, piece, (x + bx, y + by), rot + br, scale * slap(f - e['f0']), shadow)
def ink_jitter(pts, f, seed):
    r = random.Random(seed * 31 + (f // 8) % 3); return [(x + r.uniform(-1, 1), y + r.uniform(-1, 1)) for x, y in pts]
def prefix(path, frac):
    n = max(2, int(len(path) * frac)); return path[:n]

def ransom_letters(base, text, center, size, seed, n, f0, f):
    rnd = random.Random(seed); pieces = []
    for i, ch in enumerate(text):
        if ch == ' ': pieces.append(None); continue
        fnt = font(F_ANTON, size) if (ch.isdigit() or ch in '$~%,.') else RANSOM_FONTS[i % 3](size); bg, fg = RANSOM_BG[(i + seed) % 3]
        d0 = ImageDraw.Draw(Image.new('L', (1, 1))); bb = d0.textbbox((0, 0), ch, font=fnt)
        w, h = bb[2] - bb[0] + size * 0.32, size * 1.12
        im = Image.new('RGBA', (int(w), int(h)), bg + (255,)); ImageDraw.Draw(im).text((w / 2, h / 2), ch, font=fnt, fill=fg, anchor='mm')
        pieces.append(im)
    total = sum((p.width if p else size * 0.35) + 6 for p in pieces); x = center[0] - total / 2; k = 0
    for i, p in enumerate(pieces):
        jy, jr = rnd.uniform(-8, 8), rnd.uniform(-7, 7)
        if p is None: x += size * 0.35 + 6; continue
        if k < n:
            age = f - (f0 + k * 3); bx, by, br = boil(f, seed * 13 + i)
            place(base, p, (x + p.width / 2 + bx, center[1] + jy + by), jr + br, slap(age))
        x += p.width + 6; k += 1
    return center[0] - total / 2, center[0] + total / 2

def card_img(e, f):
    lines = e['lines']; fnt = font(F_CASLON, 84); h = 70 + len(lines) * 96
    d0 = ImageDraw.Draw(Image.new('L', (1, 1))); cw = int(min(860, max(d0.textlength(l, font=fnt) for l in lines) + 80))
    im = Image.new('RGBA', (cw, h), BEIGE + (255,)); d = ImageDraw.Draw(im)
    n = max(0, f - e['f0'] - 4)
    for i, l in enumerate(lines):
        d.text((40, 42 + i * 96), l[:max(0, n)], font=fnt, fill=INK); n -= len(l)
    return im, h

def logo():
    lg = Image.open(os.path.expanduser('~/cosmic-run/brand/history-sketches/option_c.png')).convert('RGBA').resize((92, 92), Image.LANCZOS)
    m = Image.new('L', (92, 92), 0); ImageDraw.Draw(m).ellipse((0, 0, 91, 91), fill=255)
    out = Image.new('RGBA', (100, 100), (0, 0, 0, 0)); ImageDraw.Draw(out).ellipse((0, 0, 99, 99), fill=INK + (255,)); out.paste(lg, (4, 4), m)
    return out
LOGO_XY = (W - 100 - 36, 34) if LANDSCAPE else (W - 100 - 40, 170)          # top right, clear of the Shorts buttons (right column, lower half) and the caption block

def sheet_img(text, age):
    sh = Image.new('RGBA', (880, 190), BEIGE + (255,)); d = ImageDraw.Draw(sh); fnt = f_casbold(50)
    full_w = d.textlength(text, font=fnt); d.text((440 - full_w / 2, 95), text[:max(0, age - 4)], font=fnt, fill=INK, anchor='lm')
    return sh

# ------------------------------------------------------------------ one frame
def render(f):
    f -= f % 2
    cam = cam_at(f)
    feat, sweep = [], {}
    for iso, (f0, f1) in PAINT.items():
        if f0 <= f < f1: feat.append(iso); sweep[iso] = min(1.0, (f - f0) / SWEEP)
    rise = max([min(1, max(0, (f - PAINT[i][0] - SWEEP) / 8)) for i in feat] or [0])
    lift = int(lift_for(cam.ppd) * rise)
    key = (round(cam.lon, 4), round(cam.lat, 4), round(cam.ppd, 4), tuple(sorted(sweep.items())), lift)
    base = cached(('map',) + key, lambda: render_map(cam, feat, labels_for(cam.ppd), lift=lift, sweep=sweep)[0])
    img = base.copy()
    live = [e for e in E if e['f0'] <= f < e['f1']]
    for e in live:
        if e['kind'] == 'compass': compass(img, *[float(v) for v in cam.xy(*e['ll'])], e.get('r', 70))
    img = img.convert('RGBA')
    ink = mask()
    for e in live:   # ink below the paper pieces
        k, age = e['kind'], f - e['f0']; sd = id_of(e)
        if k == 'arrow':
            p = bezier(resolve(e['a'], cam, f), resolve(e['b'], cam, f), e['bend']); fr = min(1, (age + 2) / e['dur'])
            marker(ink, ink_jitter(prefix(p, fr), f, sd), seed=(f // 8) % 3)
            if fr >= 1: arrowhead(ink, ink_jitter(p, f, sd))
        elif k == 'dasharc':
            a = resolve(e['a'], cam, f); b = resolve(e['b'], cam, f)
            if math.hypot(b[0] - a[0], b[1] - a[1]) > 30:
                dashed_marker(ink, ink_jitter(bezier(a, b, e['bend']), f, sd), w=6)
        elif k == 'circle' and not e.get('top'):
            c = pos(e, cam); fr = min(1, (age + 2) / e['dur']); a = np.linspace(-0.3, -0.3 + (2 * math.pi + 0.65) * fr, max(3, int(90 * fr)))
            marker(ink, ink_jitter([(c[0] + e['rx'] * math.cos(t), c[1] + e['ry'] * math.sin(t)) for t in a], f, sd), 5.5, (f // 8) % 3)
        elif k == 'splash':
            splash(ink, pos(e, cam), e['seed'])
        elif k == 'dasharc2':
            p = bezier(resolve(e['a'], cam, f), resolve(e['b'], cam, f), e['bend'])
            dashed_marker(ink, ink_jitter(prefix(p, min(1, (age + 2) / e['dur'])), f, sd), w=6)
        elif k == 'chain':
            a = resolve(e['a'], cam, f); b = resolve(e['b'], cam, f); fr = min(1, (age + 2) / e['dur'])
            L = math.hypot(b[0] - a[0], b[1] - a[1]); ang = math.atan2(b[1] - a[1], b[0] - a[0]); n = int(L / 24)
            for i in range(int(n * fr) + 1):
                cx, cy = a[0] + (b[0] - a[0]) * i / max(1, n), a[1] + (b[1] - a[1]) * i / max(1, n)
                rx, ry = (15, 8) if i % 2 == 0 else (15, 2.5)
                pts = [(cx + rx * math.cos(t) * math.cos(ang) - ry * math.sin(t) * math.sin(ang), cy + rx * math.cos(t) * math.sin(ang) + ry * math.sin(t) * math.cos(ang)) for t in np.linspace(0, 2 * math.pi, 18)]
                marker(ink, ink_jitter(pts, f, sd + i), 4.5, (f // 8) % 3)
        elif k == 'dot' and not e.get('top'):
            c = pos(e, cam); ImageDraw.Draw(ink).ellipse((c[0] - 4, c[1] - 4, c[0] + 4, c[1] + 4), fill=255)
    img = apply_ink(img, ink)
    for e in live:
        k, age = e['kind'], f - e['f0']; sd = id_of(e)
        if k == 'card':
            im, h = card_img(e, f); bx, by, br = boil(f, sd)
            place(img, im, (60 + im.width / 2 + bx, 70 + h / 2 + by), -1.2 + br, slap(age))
            place(img, cached(('tag', e['fig'], 30), lambda: tag(e['fig'], 30)), (130 + bx, 66 + by), 2.0 + br, slap(age))
        elif k == 'ransom':
            ransom_letters(img, e['text'], pos(e, cam), e['size'], e['seed'], age // 3 + 1, e['f0'], f)
        elif k == 'tag':
            put(img, cached(('tag', e['text'], e.get('size', 24)), lambda: tag(e['text'], e.get('size', 24))), e, f, cam, None, e.get('rot', 0))
        elif k == 'note':
            n = int((age + 1) * 1.3); txt = e['text'][:n]
            if txt.strip():
                im = note(txt, e['size']); full = cached(('note', e['text']), lambda: note(e['text'], e['size']))
                x, y = pos(e, cam); x -= (full.width - im.width) / 2; y -= (full.height - im.height) / 2
                bx, by, br = boil(f, sd); place(img, im, (x + bx, y + by), e['rot'] + br, 1.0, shadow=False)
        elif k == 'machine':
            seq = [-15, 0, 15, 30, 15, 0]; ang = seq[(age // 6) % len(seq)]
            put(img, cached(('machine', ang, e['width']), lambda: cutout(prop('machine', ang, e['width']))), e, f, cam, rot=e['rot'])
        elif k == 'container':
            put(img, cached(('container', e['ang'], e['width']), lambda: cutout(prop('container', e['ang'], e['width']))), e, f, cam, rot=e['rot'])
        elif k == 'engineer':
            put(img, cached('engineer', lambda: cutout(draw_engineer())), e, f, cam, rot=e['rot'], scale=e['scale'])
        elif k == 'crate':
            put(img, cached(('container', -15, 200), lambda: cutout(prop('container', -15, 200))), e, f, cam, rot=e['rot'])
        elif k == 'doc':
            put(img, cached(('doc', e.get('title', 'LICENCE')), lambda: cutout(draw_document(e.get('title', 'LICENCE')), screen=False)), e, f, cam, rot=e['rot'], scale=e['scale'])
        elif k == 'piece':      # any code-drawn piece: fn() -> RGBA; screen=True halftones + scissor-cuts it
            put(img, cached(('piece', e['key']), (lambda: cutout(e['fn']())) if e.get('screen', True) else e['fn']), e, f, cam,
                rot=e.get('rot', 0) + ((age // 2) * 9 % 360 if e.get('spin') else 0), scale=e.get('scale', 1.0))
        elif k == 'phone':
            put(img, cached('phone', lambda: cutout(draw_phone())), e, f, cam, rot=e['rot'], scale=e.get('scale', 1.0))
        elif k == 'chip':
            put(img, cached('chip', lambda: cutout(draw_chip())), e, f, cam, rot=e['rot'], scale=e.get('scale', 1.0))
        elif k == 'tin':
            put(img, cached('tin', lambda: cutout(draw_tin())), e, f, cam)
        elif k == 'beam':
            put(img, cached('beam', draw_beam), e, f, cam, rot=1.0, shadow=True)
        elif k == 'flash':
            pulse = (1.0, 0.82, 1.08, 0.9)[(age // 2) % 4]
            if e.get('big_at') and 0 <= f - e['big_at'] < 40: pulse *= 1.45
            x, y = e['xy']; bx, by, _ = boil(f, sd)
            place(img, cached('flash', draw_flash), (x + bx, y + by), (age // 2) * 7 % 45, pulse * slap(age))
        elif k == 'sun':
            put(img, cached('sun', draw_sun), e, f, cam, rot=e['rot'])
        elif k == 'wafer':
            put(img, cached('wafer', lambda: cutout(draw_wafer())), e, f, cam, rot=e['rot'])
        elif k == 'mirror':
            put(img, cached('mirror', lambda: cutout(draw_mirror())), e, f, cam, rot=e['rot'])
        elif k == 'flyer':
            t = (f - e['fa']) / max(1, e['fb'] - e['fa'])
            im = cached(('container', 15, 200), lambda: cutout(prop('container', 15, 200)))
            wob = 4 * math.sin(age * 0.6) if t < 1 else 0
            place(img, im, flyer_xy(f) if t < 1 else (FX, FY - 20), -3 + wob, 1.0 if t < 1 else slap(f - e['fb']))
        elif k == 'sheet':
            bx, by, br = boil(f, sd); place(img, sheet_img(e['text'], age), (e['xy'][0] + bx, e['xy'][1] + by), 0.6 + br, slap(age))
    ink2 = mask()
    for e in live:   # ink X marks on top of the pieces
        if e['kind'] == 'inkx':
            age = f - e['f0']; c = pos(e, cam); r = e['r']; fr = min(1, (age + 2) / 6)
            marker(ink2, [(c[0] - r, c[1] - r), (c[0] - r + 2 * r * min(1, fr * 2), c[1] - r + 2 * r * min(1, fr * 2))], 6, 3)
            if fr > 0.5:
                g = (fr - 0.5) * 2; marker(ink2, [(c[0] + r, c[1] - r), (c[0] + r - 2 * r * g, c[1] - r + 2 * r * g)], 6, 4)
    for e in live:   # marks that must sit on top of the paper pieces (top=True)
        if e.get('top') and e['kind'] == 'circle':
            age = f - e['f0']; c = pos(e, cam); fr = min(1, (age + 2) / e['dur']); a = np.linspace(-0.3, -0.3 + (2 * math.pi + 0.65) * fr, max(3, int(90 * fr)))
            marker(ink2, ink_jitter([(c[0] + e['rx'] * math.cos(t), c[1] + e['ry'] * math.sin(t)) for t in a], f, id_of(e)), 5.5, (f // 8) % 3)
        if e.get('top') and e['kind'] == 'dot':
            c = pos(e, cam); ImageDraw.Draw(ink2).ellipse((c[0] - 7, c[1] - 7, c[0] + 7, c[1] + 7), fill=255)
    for e in live:
        if e['kind'] == 'crack':
            age = f - e['f0']; x, y = e['xy']; fr = min(1, (age + 2) / 8)
            pts = [(x - 200, y - 120), (x - 120, y - 60), (x - 140, y - 10), (x - 40, y + 30), (x - 70, y + 80), (x + 30, y + 120)]
            marker(ink2, ink_jitter(prefix(pts, fr), f, 77), 7, 5)
    img = apply_ink(img, ink2)
    img.alpha_composite(cached('logo', logo), LOGO_XY)
    tex = cached(('tex', (f // 8) % 3), lambda: paper((f // 8) % 3))
    return (np.asarray(img.convert('RGB'), np.float32) * tex).clip(0, 255).astype(np.uint8)

def work(f): return render(f).tobytes()

# ------------------------------------------------------------------ sound (synthesized; no whoosh/riser)
SR = 48000
def bandnoise(n, lo, hi, rng):
    x = rng.normal(0, 1, n); X = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR); X[(fr < lo) | (fr > hi)] = 0
    y = np.fft.irfft(X, n); return y / (np.abs(y).max() + 1e-9)
def sfx_events():
    """text appearing is silent (no ticks, no slaps for tags, ransom letters, cards or notes):
    only soft paper slaps for the big objects, marker scratches for ink, and the paint scribble."""
    ev = []
    for e in E:
        k = e['kind']
        if k in ('machine', 'container', 'crate', 'doc', 'phone', 'chip', 'tin', 'flash', 'sun', 'wafer', 'mirror', 'piece') and e['f0'] > 0 and not e.get('quiet'):
            ev.append(('slap', e['f0'], 0))
        if k in ('arrow', 'circle', 'chain', 'dasharc2'): ev.append(('scratch', e['f0'], e.get('dur', 10)))
        if k in ('inkx', 'crack'): ev.append(('scratch', e['f0'], 7))
        if k == 'note': ev.append(('scratch', e['f0'], int(len(e['text']) / 1.3)))
    for iso, (f0, f1) in PAINT.items(): ev.append(('scribble', max(f0, 2), SWEEP))
    ev.sort(key=lambda v: v[1]); out, last = [], {}
    for t, f0, d in ev:
        if t in last and f0 - last[t] < 3: continue
        last[t] = f0; out.append((t, f0, d))
    return out
def build_sfx(n):
    rng = np.random.default_rng(3); y = np.zeros(n)
    for t, f0, d in sfx_events():
        s = int(f0 / FPS * SR)
        if s >= n: continue
        if t == 'slap':
            L = int(0.09 * SR); env = np.exp(-np.arange(L) / (0.018 * SR))
            x = bandnoise(L, 300, 3500, rng) * env + 0.6 * np.sin(2 * np.pi * 110 * np.arange(L) / SR) * np.exp(-np.arange(L) / (0.02 * SR)); g = 1.0
        elif t == 'scratch':
            L = int(max(6, d) / FPS * SR); am = 0.55 + 0.45 * np.abs(np.sin(2 * np.pi * 9 * np.arange(L) / SR + rng.uniform(0, 6)))
            env = np.minimum(1, np.minimum(np.arange(L), L - np.arange(L)) / (0.02 * SR)); x = bandnoise(L, 1800, 6500, rng) * am * env; g = 0.35
        elif t == 'tick':
            L = int(0.02 * SR); x = bandnoise(L, 2000, 9000, rng) * np.exp(-np.arange(L) / (0.003 * SR)); g = 0.4
        else:
            L = int(d / FPS * SR); am = 0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 13 * np.arange(L) / SR))
            env = np.minimum(1, np.minimum(np.arange(L), L - np.arange(L)) / (0.03 * SR)); x = bandnoise(L, 900, 4000, rng) * am * env; g = 0.5
        e = min(n, s + len(x)); y[s:e] += g * x[:e - s]
    return y
def read_wav(p):
    with wave.open(p) as w: sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float64) / 32768
    return a, sr
def build_audio(path):
    v, sr = read_wav(os.path.join(WORK, 'voice.wav'))
    if sr != SR: v = np.interp(np.arange(int(len(v) * SR / sr)) * sr / SR, np.arange(len(v)), v)
    n = int(NFR / FPS * SR); voice = np.zeros(n); voice[:min(n, len(v))] = v[:n]
    sfx = build_sfx(n); sfx = sfx / (np.abs(sfx).max() + 1e-9) * 0.2 * np.abs(voice).max()
    m, msr = read_wav(os.path.join(WORK, 'music.wav'))
    m = np.interp(np.arange(int(len(m) * SR / msr)) * msr / SR, np.arange(len(m)), m); mus = np.zeros(n); mus[:min(n, len(m))] = m[:n]
    vr = np.sqrt(np.mean(voice[np.abs(voice) > 0.02] ** 2)); mus = mus / (np.sqrt(np.mean(mus ** 2)) + 1e-9) * vr * 10 ** (-24 / 20)
    mix = voice + sfx + mus; mix = mix / np.abs(mix).max() * 10 ** (-0.3 / 20)
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())

# ------------------------------------------------------------------ main
def main():
    mode = sys.argv[1]
    if mode == 'frame':
        f = int(sys.argv[2]); Image.fromarray(render(f)).save(os.path.join(WORK, f'f{f:04d}.png')); print('ok')
    elif mode == 'sheet':
        fr = [int(a) for a in sys.argv[2:]] or [30] + [int(NFR * k / 11) for k in range(1, 11)] + [NFR - 14]
        with Pool(8) as pool: ims = pool.map(render, fr)
        tw, th = (480, 270) if LANDSCAPE else (360, 640); per = 4 if LANDSCAPE else 6; rows = (len(fr) + per - 1) // per
        sh = Image.new('RGB', (per * tw, rows * (th + 30)), BOARD); d = ImageDraw.Draw(sh)
        for i, (f, a) in enumerate(zip(fr, ims)):
            x, y = (i % per) * tw, (i // per) * (th + 30)
            t = Image.fromarray(a).resize((tw, th), Image.LANCZOS); dt = ImageDraw.Draw(t)
            if not LANDSCAPE:          # Shorts UI zones
                dt.rectangle((0, int(1540 * th / H), tw - 1, th - 1), outline=(200, 40, 40), width=1)
                dt.rectangle((int(940 * tw / W), int(800 * th / H), tw - 1, th - 1), outline=(200, 40, 40), width=1)
            sh.paste(t, (x, y + 30)); d.text((x + 8, y + 6), f'f{f}  {f / FPS:.2f}s', fill=INK, font=f_type(20))
        sh.save(os.path.join(WORK, 'contact_sheet.jpg'), quality=88); print('sheet', fr, 'NFR', NFR)
    elif mode == 'video':
        os.makedirs(OUTDIR, exist_ok=True); silent = os.path.join(WORK, 'silent.mp4'); aud = os.path.join(WORK, 'mix.wav')
        build_audio(aud)
        ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                               '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', silent], stdin=subprocess.PIPE)
        evens = list(range(0, NFR, 2))
        with Pool(8) as pool:
            for i, b in enumerate(pool.imap(work, evens, chunksize=3)):
                ff.stdin.write(b)
                if evens[i] + 1 < NFR: ff.stdin.write(b)
                if i % 50 == 0: print('frame', evens[i], '/', NFR, flush=True)
        ff.stdin.close(); ff.wait()
        out = os.path.join(OUTDIR, 'video.mp4')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', silent, '-i', aud, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], check=True)
        print('wrote', out, NFR / FPS)
