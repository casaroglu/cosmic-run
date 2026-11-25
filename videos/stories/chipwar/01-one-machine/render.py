#!/usr/bin/env python3
"""Chip Wars 01 "One Machine": Vox-style collage map explainer, 1920x1080, 30 fps, everything on twos.
Drawing code (map, cut-outs, ink, paper) comes from ../style_test/stills.py; 3D props from ../style_test/props (Blender).
usage:
  ~/cizgi/.venv/bin/python render.py sheet          -> work/contact_sheet.jpg (12 frames)
  ~/cizgi/.venv/bin/python render.py frame 700      -> work/f0700.png
  ~/cizgi/.venv/bin/python render.py video          -> videos/out/chipwar/01-one-machine/video.mp4"""
import json, math, os, random, subprocess, sys, wave
from multiprocessing import Pool
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', 'style_test'))
from stills import *                         # noqa: F401,F403  (Cam, render_map, cutout, marker, ...)
import stills as S
HERE = os.path.dirname(os.path.abspath(__file__))   # the star import above brought stills' own HERE

FPS = 30
WORK = os.path.join(HERE, 'work')
OUTDIR = os.path.expanduser('~/cosmic-run/videos/out/chipwar/01-one-machine')
WORDS = json.load(open(os.path.join(WORK, 'words_tts.json')))
VOICE_END = json.load(open(os.path.join(WORK, 'segments.json')))[-1]['e']
NFR = int(round((VOICE_END + 1.3) * FPS))

def cue(word, occ=1, d=0):
    """frame of the occ-th word that starts with `word` (case-insensitive), plus d frames"""
    n = 0
    for w in WORDS:
        if w['w'].lower().strip('.,?!') == word.lower():
            n += 1
            if n == occ: return int(round(w['s'] * FPS)) + d
    raise KeyError(word)

PLACES.update({'washington': (-77.04, 38.90)})

# ------------------------------------------------------------------ camera
NL, WIDE, ATL, TW, DC, DCW = (5.9, 52.0, 150), (60, 47, 14.5), (-45, 44, 11.5), (121.3, 24.0, 150), (-77.04, 39.4, 110), (-36, 47, 13)
MOVES = [  # (start, length, target)
    (cue('who', 1, -6), 24, WIDE),
    (cue('is', 1, -6), 24, ATL),
    (cue('how', 1, -6), 26, TW),
    (cue('in', 3, -6), 24, DC),        # "In twenty nineteen"
    (cue('the', 3, -6), 22, DCW),       # "...the Dutch let..."
    (cue('so', 1, -6), 24, WIDE),
]
def smooth(t): t = min(1, max(0, t)); return t * t * (3 - 2 * t)
def cam_at(f):
    f -= f % 2
    cur = NL
    for s, n, tgt in MOVES:
        if f <= s: break
        t = smooth((f - s) / n)
        cur = (cur[0] + (tgt[0] - cur[0]) * t, cur[1] + (tgt[1] - cur[1]) * t, math.exp(math.log(cur[2]) + (math.log(tgt[2]) - math.log(cur[2])) * t))
    return Cam(*cur)
def lift_for(ppd): return int(max(4, min(16, ppd * 0.1)))

# ------------------------------------------------------------------ labels (shown by zoom band)
LABELS = [  # text, lon, lat, size, italic, ppd_min, ppd_max
    ('NETHERLANDS', 5.4, 53.12, 34, False, 60, 999), ('GERMANY', 10.2, 51.0, 34, False, 60, 999), ('BELGIUM', 4.4, 50.55, 30, False, 60, 999),
    ('FRANCE', 3.0, 48.9, 30, False, 60, 999), ('North Sea', 3.0, 55.5, 40, True, 60, 999), ('Veldhoven', 5.4, 51.18, 24, False, 60, 999),
    ('Atlantic Ocean', -40, 33, 46, True, 0, 40), ('Pacific Ocean', 150, 15, 46, True, 0, 40), ('Indian Ocean', 75, -2, 46, True, 0, 40),
    ('CHINA', 103, 35, 40, False, 0, 40), ('RUSSIA', 90, 61, 40, False, 0, 40), ('EUROPE', 18, 49, 32, False, 0, 40),
    ('INDIA', 78, 21, 34, False, 0, 40), ('UNITED STATES', -100, 39, 36, False, 0, 40), ('CANADA', -100, 58, 34, False, 0, 40),
    ('TAIWAN', 121.0, 23.4, 40, False, 60, 999), ('Taiwan Strait', 119.6, 23.0, 38, True, 60, 999), ('Hsinchu', 120.97, 24.6, 24, False, 60, 999),
    ('Atlantic Ocean', -72.5, 36.6, 42, True, 60, 999), ('UNITED STATES', -80.5, 41.2, 34, False, 60, 999),
]
def labels_for(ppd): return [l[:5] for l in LABELS if l[5] <= ppd < l[6]]

# ------------------------------------------------------------------ painted regions
PAINT = {'NLD': cue('only', 1, -6), 'TWN': cue('taiwan')}
SWEEP = 16

# ------------------------------------------------------------------ elements
E = []   # each: dict(kind, f0, f1, ...)
def add(kind, f0, f1, **kw): E.append(dict(kind=kind, f0=f0, f1=f1, **kw)); return E[-1]

END = NFR + 10
# shot 1: Netherlands (cold open on the payoff)
s1_end = MOVES[0][0]
add('compass', 0, s1_end, ll=(12.3, 54.1))
add('card', 2, MOVES[2][0] - 6 + 12, fig='FIG. 01', lines=['The Machine', 'Only One', 'Firm Builds'])
add('ransom', cue('one'), s1_end, text='1', pin=('veldhoven', 150, -130), size=170, seed=2)
add('machine', cue('machine', 1, -2), s1_end, pin=('veldhoven', 330, 110), rot=-2)
add('tag', cue('a', 1), s1_end, text='VELDHOVEN · ASML', pin=('veldhoven', 330, 255), rot=1.5)
add('note', cue('which'), s1_end, text='only one maker on earth', size=58, xy=(1440, 1010), rot=-2)
add('arrow', cue('veldhoven'), s1_end, a=('veldhoven', 175, 90), b=('veldhoven', 12, 8), bend=0.25, dur=12)
# shot 2: wide, the customer in Taiwan
s2_end = MOVES[1][0]
add('compass', MOVES[0][0], s2_end, ll=(65, -5), r=50)
add('engineer', cue('chipmaker'), s2_end, pin=('hsinchu', 0, -160), rot=3, scale=0.8)
add('tag', cue('taiwan', 1, 4), s2_end, text='TSMC · HSINCHU, TAIWAN', pin=('hsinchu', -30, 40), rot=-1.5)
add('dasharc', cue('nine'), s2_end, a=('veldhoven', 0, 0), b=('hsinchu', 0, 0), bend=0.16, dur=15)
add('tag', cue('kilometres'), s2_end, text='9,470 KM', arcmid=('veldhoven', 'hsinchu', 0.16), dy=-40, rot=-2, size=26)
add('note', cue('more'), s2_end, text='more than half of them', size=58, pin=('hsinchu', -230, -420), rot=-2)
add('circle', cue('half'), s2_end, pin=('hsinchu', 0, -150), rx=115, ry=160, dur=12)
# shot 3: Atlantic, the parts
s3_end = MOVES[2][0]
add('card', MOVES[1][0] + 6, MOVES[4][0] + 60, fig='FIG. 02', lines=['Parts From', 'Far Away'], only_until=MOVES[2][0] + 12)
add('compass', MOVES[1][0], s3_end, ll=(-38, 22), r=50)
add('note', cue('no'), s3_end, text='built from all over', size=60, xy=(1330, 985), rot=2)
add('arrow', cue('germany'), s3_end, a=('oberkochen', 60, 232), b=('oberkochen', 4, 8), bend=-0.3, dur=10)
add('tag', cue('germany', 1, 4), s3_end, text='MIRRORS · ZEISS, OBERKOCHEN', pin=('oberkochen', 60, 260), rot=-1.5)
add('arrow', cue('san'), s3_end, a=('sandiego', 0, 0), b=('veldhoven', -10, 4), bend=0.2, dur=15)
add('tag', cue('san', 1, 4), s3_end, text='LIGHT SOURCE · SAN DIEGO', pin=('sandiego', 40, 50), rot=1.5)
add('mover', cue('diego', 1, 14), s3_end, a=('sandiego', 0, 0), b=('veldhoven', -10, 4), bend=0.2, dur=26, prop=('container', 30, 140))
# shot 4: Taiwan, delivery
s4_end = MOVES[3][0]
add('card', MOVES[2][0] + 8, s4_end + 6, fig='FIG. 03', lines=['Hsinchu,', 'Delivery Day'])
add('compass', MOVES[2][0], s4_end, ll=(124.6, 21.4), r=60)
for i, (w, dx, dy, ang) in enumerate([('forty', -470, 150, -30), ('freight', -300, 225, 0), ('containers', -130, 150, 30)]):
    add('splash', cue(w), s4_end, pin=('hsinchu', dx, dy + 30), seed=i)
    add('container', cue(w), s4_end, pin=('hsinchu', dx, dy), ang=ang, width=200, rot=(-3, 2, -1)[i])
add('ransom', cue('forty', 1, -4), s4_end, text='40', xy=(1350, 380), size=190, seed=5)
add('tag', cue('containers', 1, 6), s4_end, text='FREIGHT CONTAINERS FOR ONE MACHINE', xy=(1350, 530), rot=-1, size=23)
add('tag', cue('twenty'), s4_end, text='+ 20 TRUCKS · 3 CARGO JETS', xy=(1350, 590), rot=1.2, size=23)
add('engineer', cue('cargo'), s4_end, xy=(1300, 820), rot=4, scale=0.75)
add('circle', cue('cargo', 1, 6), s4_end, xy=(1300, 820), rx=105, ry=150, dur=12)
add('note', cue('jets', 1, 2), s4_end, text='some assembly\nrequired', size=62, xy=(1630, 820), rot=-3)
# shot 5: Washington 2019 -> The Hague
s5_end = MOVES[5][0]
add('card', MOVES[3][0] + 8, s5_end, fig='FIG. 04', lines=['Washington,', '2019'])
add('compass', MOVES[3][0], MOVES[4][0], ll=(-73.0, 37.6), r=55)
add('compass', MOVES[4][0], s5_end, ll=(-42, 30), r=50)
add('tag', cue('nineteen'), MOVES[4][0], text='WASHINGTON 2019', pin=('washington', 0, 70), rot=-1.2)
add('doc', cue('pressure'), MOVES[4][0] + 16, pin=('washington', 220, -40), rot=-6, scale=0.62)
add('dasharc', MOVES[4][0] + 16, s5_end, a=('washington', 0, 0), b=('thehague', 0, 0), bend=0.18, dur=18)
add('docmover', MOVES[4][0] + 16, s5_end, a=('washington', 0, 0), b=('thehague', 0, 0), bend=0.18, dur=26, scale=0.42)
add('inkx', cue('lapse'), s5_end, pin=('thehague', 0, 0), r=20)
add('tag', cue('lapse', 1, 4), s5_end, text='THE HAGUE 2019 · LICENCE LAPSED', pin=('thehague', 0, 46), rot=-1.5)
# shot 6: payoff
add('crate', cue('china', 1), END, pin=('beijing', 0, -70), rot=-3)
add('dasharc', cue('china', 1), END, a=('thehague', 0, 0), b=('beijing', -80, -70), bend=0.12, dur=15, frac=0.86)
add('inkx', cue('none'), END, pin=('beijing', 0, -70), r=34)
add('tag', cue('none', 1, 6), END, text='BEIJING · NEVER SHIPPED', pin=('beijing', 0, 40), rot=1.5)
add('doc', cue('none', 1, 2), END, pin=('thehague', -10, -120), rot=-6, scale=0.5)
add('tag', cue('none', 1, 8), END, text='THE HAGUE 2019 · LAPSED', pin=('thehague', 0, 30), rot=-1.5)
add('sheet', cue('not', 1, -6), END, xy=(960, 925), text='China has never received one.')
add('ransom', cue('not', 1), END, text='NOT ONE', xy=(960, 985), size=72, seed=4, highlight=True)
add('ransom', cue('one', 4, 18), END, text='CHOKEPOINT', xy=(900, 170), size=92, seed=8)
add('tag', NFR - 30, NFR - 2, text='TSMC RUNS 56% OF ALL EUV MACHINES (2023)', xy=(960, 770), rot=-1, size=24)   # hidden key text
CARD_ENDS = sorted(e['f0'] for e in E if e['kind'] == 'card')
for e in E:   # a card ends when the next one slaps in
    if e['kind'] == 'card':
        nxt = [c for c in CARD_ENDS if c > e['f0']]
        e['f1'] = min(e['f1'], nxt[0]) if nxt else e['f1']

# ------------------------------------------------------------------ helpers
_cache = {}
def cached(key, fn):
    if key not in _cache: _cache[key] = fn()
    return _cache[key]
def slap(age): return 1.1 if age < 2 else (0.98 if age < 4 else 1.0)
def boil(f, seed):
    r = random.Random(seed * 97 + (f // 8) % 3); return r.uniform(-1.5, 1.5), r.uniform(-1.5, 1.5), r.uniform(-0.4, 0.4)
def pos(e, cam):
    if 'xy' in e: return e['xy']
    name, dx, dy = e['pin']; return cam.pt(name, dx, dy)
def put(img, piece, e, f, cam, xy=None, rot=0.0, scale=1.0, shadow=True, i=0):
    x, y = xy if xy else pos(e, cam); bx, by, br = boil(f, id_of(e) + i)
    place(img, piece, (x + bx, y + by), rot + br, scale * slap(f - e['f0'] - i * 0), shadow)
def id_of(e): return E.index(e)
def pt(cam, p): return cam.pt(*p)
def ink_jitter(pts, f, seed):
    r = random.Random(seed * 31 + (f // 8) % 3); return [(x + r.uniform(-1, 1), y + r.uniform(-1, 1)) for x, y in pts]
def prefix(path, frac):
    n = max(2, int(len(path) * frac)); return path[:n]

def ransom_letters(base, text, center, size, seed, n, f0, f):
    rnd = random.Random(seed); pieces = []
    for i, ch in enumerate(text):
        if ch == ' ': pieces.append(None); continue
        fnt = font(F_ANTON, size) if ch.isdigit() else RANSOM_FONTS[i % 3](size); bg, fg = RANSOM_BG[(i + seed) % 3]
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
    lines = e['lines']; fnt = font(F_CASLON, 68); h = 70 + len(lines) * 80
    im = Image.new('RGBA', (560, h), BEIGE + (255,)); d = ImageDraw.Draw(im)
    n = max(0, f - e['f0'] - 4)          # one letter per frame after the slap
    for i, l in enumerate(lines):
        d.text((36, 44 + i * 80), l[:max(0, n)], font=fnt, fill=INK); n -= len(l)
    return im, h

LOGO = None
def logo():
    lg = Image.open(os.path.expanduser('~/cosmic-run/brand/history-sketches/option_c.png')).convert('RGBA').resize((96, 96), Image.LANCZOS)
    m = Image.new('L', (96, 96), 0); ImageDraw.Draw(m).ellipse((0, 0, 95, 95), fill=255)
    out = Image.new('RGBA', (104, 104), (0, 0, 0, 0)); ImageDraw.Draw(out).ellipse((0, 0, 103, 103), fill=INK + (255,)); out.paste(lg, (4, 4), m)
    return out

# ------------------------------------------------------------------ one frame
def render(f):
    f -= f % 2                                # on twos
    cam = cam_at(f)
    feat, sweep = [], {}
    for iso, f0 in PAINT.items():
        if f >= f0: feat.append(iso); sweep[iso] = min(1.0, (f - f0) / SWEEP)
    rise = min(1, max(0, (f - PAINT['NLD'] - SWEEP) / 8))   # the region lifts off the board once it is painted
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
            p = bezier(pt(cam, e['a']), pt(cam, e['b']), e['bend']); fr = min(1, (age + 2) / e['dur'])
            marker(ink, ink_jitter(prefix(p, fr), f, sd), seed=(f // 8) % 3)
            if fr >= 1: arrowhead(ink, ink_jitter(p, f, sd))
        elif k == 'dasharc':
            p = bezier(pt(cam, e['a']), pt(cam, e['b']), e['bend']); p = prefix(p, e.get('frac', 1.0))
            dashed_marker(ink, ink_jitter(prefix(p, min(1, (age + 2) / e['dur'])), f, sd), w=6)
        elif k == 'circle':
            c = pos(e, cam); fr = min(1, (age + 2) / e['dur']); a = np.linspace(-0.3, -0.3 + (2 * math.pi + 0.65) * fr, max(3, int(90 * fr)))
            marker(ink, ink_jitter([(c[0] + e['rx'] * math.cos(t), c[1] + e['ry'] * math.sin(t)) for t in a], f, sd), 5.5, (f // 8) % 3)
        elif k == 'splash':
            splash(ink, pos(e, cam), e['seed'])
    img = apply_ink(img, ink)
    for e in live:
        k, age = e['kind'], f - e['f0']; sd = id_of(e)
        if k == 'card':
            im, h = card_img(e, f); bx, by, br = boil(f, sd)
            place(img, im, (340 + bx, 50 + h / 2 + by), -1.2 + br, slap(age))
            place(img, cached(('tag', e['fig'], 22), lambda: tag(e['fig'], 22)), (120 + bx, 52 + by), 2.0 + br, slap(age))
        elif k == 'ransom':
            xy = e['xy'] if 'xy' in e else cam.pt(*e['pin'])
            if e.get('highlight') and age > 3 * len(e['text']) + 4:
                w = min(520, (age - 3 * len(e['text']) - 4) * 60)
                hl = Image.new('RGBA', (w, 34), YEL + (210,)); place(img, hl, (xy[0] - 260 + w / 2, xy[1] + 15), -0.8, shadow=False)
            ransom_letters(img, e['text'], xy, e['size'], e['seed'], age // 3 + 1, e['f0'], f)
        elif k == 'tag':
            im = cached(('tag', e['text'], e.get('size', 24)), lambda: tag(e['text'], e.get('size', 24)))
            if 'arcmid' in e:
                a, b, bend = e['arcmid']; p = bezier(cam.pt(a), cam.pt(b), bend); m = p[len(p) // 2]; xy = (m[0], m[1] + e['dy'])
            else: xy = None
            put(img, im, e, f, cam, xy, e.get('rot', 0))
        elif k == 'note':
            n = int((age + 1) * 1.3); txt = e['text'][:n]
            if txt.strip():
                im = note(txt, e['size']); full = cached(('note', e['text']), lambda: note(e['text'], e['size']))
                x, y = pos(e, cam); x -= (full.width - im.width) / 2; y -= (full.height - im.height) / 2
                bx, by, br = boil(f, sd); place(img, im, (x + bx, y + by), e['rot'] + br, 1.0, shadow=False)
        elif k == 'machine':
            seq = [-15, 0, 15, 30, 15, 0]; ang = seq[(age // 6) % len(seq)]
            put(img, cached(('machine', ang), lambda: cutout(prop('machine', ang, 400))), e, f, cam, rot=e['rot'])
        elif k == 'container':
            put(img, cached(('container', e['ang'], e['width']), lambda: cutout(prop('container', e['ang'], e['width']))), e, f, cam, rot=e['rot'])
        elif k == 'engineer':
            put(img, cached('engineer', lambda: cutout(draw_engineer())), e, f, cam, rot=e['rot'], scale=e['scale'])
        elif k == 'crate':
            put(img, cached(('container', -15, 150), lambda: cutout(prop('container', -15, 150))), e, f, cam, rot=e['rot'])
        elif k == 'doc':
            put(img, cached('doc', lambda: cutout(draw_document('LICENCE'), screen=False)), e, f, cam, rot=e['rot'], scale=e['scale'])
        elif k in ('mover', 'docmover'):
            p = bezier(pt(cam, e['a']), pt(cam, e['b']), e['bend']); t = smooth(age / e['dur']); i = min(len(p) - 1, int(t * (len(p) - 1)))
            wob = 4 * math.sin(age * 0.6)
            if k == 'mover':
                nm, ang, w = e['prop']; im = cached(('container', ang, w), lambda: cutout(prop(nm, ang, w)))
                place(img, im, (p[i][0], p[i][1] - 18), wob, 1.0)
            else:
                im = cached('doc', lambda: cutout(draw_document('LICENCE'), screen=False)); place(img, im, (p[i][0], p[i][1] - 40), -6 + wob, e['scale'])
        elif k == 'sheet':
            sh = Image.new('RGBA', (980, 250), BEIGE + (255,)); d = ImageDraw.Draw(sh)
            n = max(0, age - 4); txt = e['text'][:n]
            full_w = d.textlength(e['text'], font=f_casbold(56)); d.text((490 - full_w / 2, 70), txt, font=f_casbold(56), fill=INK, anchor='lm')
            bx, by, br = boil(f, sd); place(img, sh, (e['xy'][0] + bx, e['xy'][1] + by), 0.6 + br, slap(age))
    ink2 = mask()
    for e in live:   # ink X marks go on top of the pieces
        if e['kind'] == 'inkx':
            age = f - e['f0']; c = pos(e, cam); r = e['r']; fr = min(1, (age + 2) / 6)
            a1 = [(c[0] - r, c[1] - r), (c[0] - r + 2 * r * min(1, fr * 2), c[1] - r + 2 * r * min(1, fr * 2))]
            marker(ink2, a1, 6, 3)
            if fr > 0.5:
                g = (fr - 0.5) * 2; marker(ink2, [(c[0] + r, c[1] - r), (c[0] + r - 2 * r * g, c[1] - r + 2 * r * g)], 6, 4)
    img = apply_ink(img, ink2)
    img.alpha_composite(cached('logo', logo), (W - 104 - 28, H - 104 - 24))
    return finish_cached(img, (f // 8) % 3)

def finish_cached(img, k):
    tex = cached(('tex', k), lambda: paper(k))
    a = np.asarray(img.convert('RGB'), np.float32) * tex
    return a.clip(0, 255).astype(np.uint8)

def work(f): return render(f).tobytes()

# ------------------------------------------------------------------ sound
SR = 48000
def bandnoise(n, lo, hi, rng):
    x = rng.normal(0, 1, n); X = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR); X[(fr < lo) | (fr > hi)] = 0
    y = np.fft.irfft(X, n); return y / (np.abs(y).max() + 1e-9)
def sfx_events():
    ev = []
    for e in E:
        k = e['kind']
        if k in ('machine', 'tag', 'engineer', 'container', 'crate', 'doc', 'sheet', 'card'): ev.append(('slap', e['f0'], 0))
        if k == 'ransom':
            n = sum(1 for c in e['text'] if c != ' '); ev += [('slap', e['f0'] + 3 * i, 0) for i in range(n)]
        if k in ('arrow', 'dasharc', 'circle'): ev.append(('scratch', e['f0'], e['dur']))
        if k == 'inkx': ev.append(('scratch', e['f0'], 6))
        if k == 'note': ev.append(('scratch', e['f0'], int(len(e['text']) / 1.3)))
        if k == 'card':
            n = sum(len(l) for l in e['lines']); ev += [('tick', e['f0'] + 4 + i, 0) for i in range(0, n, 2)]
        if k == 'sheet': ev += [('tick', e['f0'] + 4 + i, 0) for i in range(0, len(e['text']), 2)]
        if k == 'splash': ev.append(('slap', e['f0'], 0))
    for iso, f0 in PAINT.items(): ev.append(('scribble', f0, SWEEP))
    ev.sort(key=lambda v: v[1]); out, last = [], {}
    for t, f0, d in ev:            # merge same-type hits within 3 frames
        if t in last and f0 - last[t] < 3 and t != 'tick': continue
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
        else:   # scribble for the yellow paint sweep
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
    sfx = build_sfx(n); sfx = sfx / (np.abs(sfx).max() + 1e-9) * 0.32 * np.abs(voice).max()
    mix = voice + sfx; mix = mix / np.abs(mix).max() * 10 ** (-0.3 / 20)
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())

# ------------------------------------------------------------------ main
if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'frame':
        f = int(sys.argv[2]); Image.fromarray(render(f)).save(os.path.join(WORK, f'f{f:04d}.png')); print('ok')
    elif mode == 'sheet':
        fr = [int(a) for a in sys.argv[2:]] or [20, 90, 230, 330, 440, 560, 630, 700, 790, 880, 960, NFR - 20]
        with Pool(8) as pool: ims = pool.map(render, fr)
        sh = Image.new('RGB', (4 * 640, 3 * 360 + 3 * 30), BOARD); d = ImageDraw.Draw(sh)
        for i, (f, a) in enumerate(zip(fr, ims)):
            x, y = (i % 4) * 640, (i // 4) * 390; sh.paste(Image.fromarray(a).resize((640, 360), Image.LANCZOS), (x, y + 30)); d.text((x + 8, y + 6), f'f{f}  {f / FPS:.2f}s', fill=INK, font=f_type(20))
        sh.save(os.path.join(WORK, 'contact_sheet.jpg'), quality=88); print('sheet', fr)
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
