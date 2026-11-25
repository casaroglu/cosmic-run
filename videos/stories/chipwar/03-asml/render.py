#!/usr/bin/env python3
"""Chip Wars 03 "The Machine Only One Company Can Build": vertical Short (1080x1920, 30 fps, on twos).
Same collage-map engine as ep 01 (../01-one-machine/render.py), re-framed for 9:16:
the camera keeps its subject at the centre of the Shorts safe area (x 40-940, y 60-1540).
usage:
  ~/cizgi/.venv/bin/python render.py sheet          -> work/contact_sheet.jpg (12 frames)
  ~/cizgi/.venv/bin/python render.py frame 700      -> work/f0700.png
  ~/cizgi/.venv/bin/python render.py video          -> videos/out/chipwar/03-asml/video.mp4"""
import json, math, os, random, subprocess, sys, wave
from multiprocessing import Pool
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', 'style_test'))
import stills as S
S.W, S.H = 1080, 1920                        # vertical: the map, masks and paper texture all read stills.W/H
from stills import *                         # noqa: F401,F403
HERE = os.path.dirname(os.path.abspath(__file__))

FPS = 30
WORK = os.path.join(HERE, 'work')
OUTDIR = os.path.expanduser('~/cosmic-run/videos/out/chipwar/03-asml')
WORDS = json.load(open(os.path.join(WORK, 'words_tts.json')))
VOICE_END = json.load(open(os.path.join(WORK, 'segments.json')))[-1]['e']
NFR = int(round((VOICE_END + 0.9) * FPS))
FX, FY = 490, 820                            # centre of the Shorts safe area: the camera's focus lands here

def cue(word, occ=1, d=0):
    n = 0
    for w in WORDS:
        if w['w'].lower().strip('.,?!:') == word.lower():
            n += 1
            if n == occ: return int(round(w['s'] * FPS)) + d
    raise KeyError((word, occ))

PLACES.update({'bump': (10.45, 51.25), 'beijing': (116.40, 39.90), 'hsinchu': (120.97, 24.80)})

# ------------------------------------------------------------------ camera (keyframes are FOCUS points: lon, lat, ppd)
NLF, DEF, EUF, MIDF, TWF, CNF, MID2 = (5.6, 52.0, 190), (10.4, 51.0, 85), (6.5, 50.0, 45), (62, 40, 18), (120.0, 24.0, 150), (115.5, 33.0, 42), (60, 46, 16)
MOVES = [  # (start, length, target focus)
    (cue('mirrors', 1, -6), 22, DEF),
    (cue('and', 1, -6), 22, EUF),
    (cue('more', 1, -8), 18, MIDF),
    (cue('more', 1, 10), 22, TWF),
    (cue('and', 2, -6), 22, CNF),
    (cue('all', 1, -14), 14, MID2),
    (cue('all', 1, 0), 20, NLF),
]
def smooth(t): t = min(1, max(0, t)); return t * t * (3 - 2 * t)
def focus_at(f):
    f -= f % 2
    cur = NLF
    for s, n, tgt in MOVES:
        if f <= s: break
        t = smooth((f - s) / n)
        cur = (cur[0] + (tgt[0] - cur[0]) * t, cur[1] + (tgt[1] - cur[1]) * t, math.exp(math.log(cur[2]) + (math.log(tgt[2]) - math.log(cur[2])) * t))
    return cur
def cam_at(f):
    lon, lat, ppd = focus_at(f)
    return Cam(lon - (FX - W / 2) / (ppd * CX), lat - (H / 2 - FY) / ppd, ppd)
def lift_for(ppd): return int(max(4, min(16, ppd * 0.09)))

# ------------------------------------------------------------------ labels by zoom band
LABELS = [  # text, lon, lat, size, italic, ppd_min, ppd_max
    ('NETHERLANDS', 5.8, 52.5, 30, False, 120, 999), ('BELGIUM', 4.3, 50.55, 28, False, 120, 999), ('GERMANY', 8.6, 51.6, 30, False, 120, 999),
    ('North Sea', 3.4, 53.8, 36, True, 120, 999), ('Veldhoven', 5.4, 51.27, 22, False, 120, 999),
    ('TAIWAN', 121.05, 23.3, 34, False, 120, 999), ('Taiwan Strait', 119.3, 23.6, 34, True, 120, 999), ('Hsinchu', 120.97, 24.66, 22, False, 120, 999),
    ('CHINA', 118.3, 26.4, 32, False, 120, 999), ('Philippine Sea', 122.9, 21.6, 32, True, 120, 999),
    ('GERMANY', 12.4, 52.65, 32, False, 70, 120), ('FRANCE', 4.0, 47.6, 30, False, 70, 120), ('POLAND', 18.5, 52.3, 30, False, 70, 120),
    ('North Sea', 4.4, 55.3, 34, True, 70, 120), ('AUSTRIA', 14.5, 47.4, 26, False, 70, 120), ('Oberkochen', 10.1, 48.55, 22, False, 70, 120),
    ('North Sea', 3.0, 56.5, 32, True, 30, 70), ('FRANCE', 2.5, 46.6, 30, False, 30, 70), ('GERMANY', 10.4, 51.0, 28, False, 30, 70),
    ('SPAIN', -3.5, 40.0, 30, False, 30, 70), ('ITALY', 12.8, 43.0, 28, False, 30, 70), ('Atlantic Ocean', -3.5, 45.0, 30, True, 30, 70),
    ('CHINA', 106.0, 37.5, 34, False, 30, 70), ('MONGOLIA', 104.5, 46.5, 30, False, 30, 70), ('Yellow Sea', 123.3, 35.6, 28, True, 30, 70),
    ('South China Sea', 113.5, 17.0, 30, True, 30, 70), ('TAIWAN', 121.0, 22.3, 24, False, 30, 70),
    ('RUSSIA', 85, 61, 34, False, 0, 30), ('CHINA', 100, 34, 34, False, 0, 30), ('INDIA', 78, 21, 32, False, 0, 30), ('EUROPE', 16, 49, 30, False, 0, 30),
    ('Indian Ocean', 75, -2, 36, True, 0, 30), ('ARABIA', 46, 23, 28, False, 0, 30),
]
def labels_for(ppd): return [l[:5] for l in LABELS if l[5] <= ppd < l[6]]

PAINT = {'NLD': (0, 10 ** 6), 'DEU': (cue('germany', 1), cue('and', 1, -6) + 22), 'TWN': (cue('taiwan'), cue('all', 1, -14))}   # (paint on, paint off): the loop's last frame matches the first
SWEEP = 16

# ------------------------------------------------------------------ new collage pieces (drawn in code)
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
TIN_HIT = (150, 385)                     # the flattened drop, in draw_tin() pixels

def draw_flash(r=120):
    """the EUV flash: a yellow paper star with ink outline and rays (flat paper, no halftone)."""
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

def draw_sun(r=92):
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
    d.rectangle((c - 16, c + r - 8, c + 16, c + r + 2), fill=(0, 0, 0, 0))
    return im

def draw_mirror(r=125):
    """an EUV mirror: a polished disc in a ring mount, shaded as a shallow bowl."""
    s = 2 * r + 30; im = Image.new('RGBA', (s, s), (0, 0, 0, 0)); c = s / 2
    yy, xx = np.mgrid[0:s, 0:s].astype(np.float32); rr = np.hypot(xx - c + r * 0.18, yy - c + r * 0.22) / r
    disc = np.hypot(xx - c, yy - c); g = np.clip(245 - rr * 120, 80, 250)
    a = np.where(disc <= r, 255, np.where(disc <= r + 13, 255, 0)).astype(np.uint8)
    g = np.where((disc > r) & (disc <= r + 13), 95, g)
    im = Image.fromarray(np.dstack([g, g, g, a]).astype(np.uint8), 'RGBA'); d = ImageDraw.Draw(im)
    d.ellipse((c - r, c - r, c + r, c + r), outline=(60, 60, 60, 255), width=3)
    d.arc((c - r * 0.7, c - r * 0.7, c + r * 0.4, c + r * 0.4), 200, 260, fill=(255, 255, 255, 255), width=6)
    return im

# ------------------------------------------------------------------ elements
E = []
def add(kind, f0, f1, **kw): E.append(dict(kind=kind, f0=f0, f1=f1, **kw)); return E[-1]
END = NFR + 10
M = {i: s for i, (s, n, t) in enumerate(MOVES)}; MEND = {i: s + n for i, (s, n, t) in enumerate(MOVES)}

# shot A: the cold open on the payoff (Netherlands board), the tin, the flash, the Sun, the circuits
def tin_group(f0, f_laser, f1, big_at=None):
    add('tin', f0, f1, xy=(650, 760))
    add('beam', f_laser, f1, xy=(650 - 150 + TIN_HIT[0] - 215 - 6, 760 - 235 + TIN_HIT[1]))
    add('flash', f_laser + 2, f1, xy=(650 - 150 + TIN_HIT[0], 760 - 235 + TIN_HIT[1]), big_at=big_at)
tin_group(4, cue('laser', 1, -2), cue('who', 1, -2), big_at=cue('flash'))
add('machine', 0, M[0], xy=(490, 1250), rot=-2, width=600)
add('ransom', 8, cue('each', 1, -2), text='50,000', xy=(490, 250), size=124, seed=2)
add('tag', cue('fifty', 1, 0), cue('each', 1, -2), text='LASER SHOTS EVERY SECOND', xy=(490, 380), size=24, rot=-1)
add('note', cue('drop', 1, 0), cue('each', 1, -2), text='a drop of tin', size=54, xy=(250, 1010), rot=-3)
add('arrow', cue('tin', 1, 0), cue('each', 1, -2), a=('xy', 300, 965), b=('xy', 610, 920), bend=-0.25, dur=10)
add('sun', cue('sun', 1, -4), cue('who', 1, -2), xy=(250, 290), rot=-4)
add('tag', cue('hotter', 1, 0), cue('who', 1, -2), text="HOTTER THAN THE SUN'S SURFACE", xy=(560, 450), size=23, rot=1.2)
add('wafer', cue('circuits', 1, -2), cue('who', 1, -2), xy=(260, 1010), rot=8)
add('note', cue('circuits', 1, 4), cue('who', 1, -2), text='circuits, printed with light', size=48, xy=(490, 1495), rot=-1.5)
# shot B: who builds it -> ASML, Veldhoven
add('card', cue('who'), M[0] + 4, fig='FIG. 01', lines=['The Machine', 'Only One', 'Firm Builds'])
add('ransom', cue('one', 1), M[0], text='1', xy=(780, 560), size=150, seed=2)
add('tag', cue('veldhoven'), M[0], text='VELDHOVEN · ASML', xy=(490, 1475), rot=1.5)
add('arrow', cue('in', 1, 0), M[0], a=('xy', 540, 1085), b=('veldhoven', 8, 10), bend=0.3, dur=10)
# shot C: Germany, the mirror
add('card', cue('blown', 1, -4), M[1] + 4, fig='FIG. 02', lines=['A Mirror the', 'Size of Germany'])
add('mirror', cue('mirrors', 1, 6), M[1], xy=(700, 1150), rot=-5)
add('arrow', cue('zeiss', 1, 0), M[1], a=('xy', 610, 1040), b=('oberkochen', 6, 8), bend=-0.3, dur=10)
add('tag', cue('zeiss', 1, 4), M[1], text='MIRRORS · ZEISS, OBERKOCHEN', xy=(490, 1340), rot=-1.2, size=23)
add('tag', cue('size', 1, 0), M[1], text='IF THE MIRROR WERE AS BIG AS GERMANY', xy=(490, 520), rot=1, size=22)
add('dot', cue('bump', 1, -2), M[1], pin=('bump', 0, 0))
add('circle', cue('bump', 1, 0), M[1], pin=('bump', 0, 0), rx=34, ry=30, dur=10)
add('note', cue('bump', 1, 2), M[1], text='the biggest bump', size=50, xy=(300, 640), rot=-2)
add('ransom', cue('tenth', 1, -2), M[1], text='0.1 MM', xy=(490, 405), size=100, seed=6)
# shot D: delivery, Europe
add('card', cue('and', 1, 4), M[2] + 4, fig='FIG. 03', lines=['Delivery Day'])
add('compass', M[1], M[2], ll=(-5.5, 53.0), r=48)
for i, (w, xy, ang) in enumerate([('forty', (310, 1060), -30), ('containers', (640, 1160), 0), ('twenty', (380, 1320), 30)]):
    add('splash', cue(w), M[2], xy=(xy[0], xy[1] + 40), seed=i)
    add('container', cue(w), M[2], xy=xy, ang=ang, width=300, rot=(-3, 2, -1)[i])
add('ransom', cue('forty', 1, -2), cue('newest', 1, -2), text='40', xy=(490, 380), size=160, seed=5)
add('tag', cue('containers', 1, 4), cue('newest', 1, -2), text='FREIGHT CONTAINERS', xy=(490, 530), rot=-1, size=24)
add('tag', cue('twenty', 1, 0), cue('newest', 1, -2), text='+ 20 TRUCKS · 3 CARGO JETS', xy=(490, 590), rot=1.2, size=24)
add('ransom', cue('four', 1, -4), M[2], text='$400 MILLION', xy=(490, 400), size=58, seed=7)
add('tag', cue('newest', 1, 0), M[2], text='ROUGHLY · THE NEWEST VERSION (HIGH-NA)', xy=(490, 530), rot=-1, size=23)
# shot E: the flight to Taiwan, more than half
add('dasharc', M[2], M[4], a=('veldhoven', 0, 0), b=('flyer',), bend=0.08, dur=1)
add('flyer', M[2], M[4], fa=M[2], fb=MEND[3])
add('card', MEND[3] - 6, M[4] + 4, fig='FIG. 04', lines=['One Chipmaker', 'in Taiwan'])
add('ransom', max(cue('half', 1, -2), MEND[3] - 2), M[4], text='56%', xy=(490, 400), size=150, seed=3)
add('tag', max(cue('half', 1, 8), MEND[3] + 8), M[4], text="OF THE WORLD'S EUV MACHINES", xy=(490, 540), rot=-1, size=23)
add('tag', cue('chipmaker', 1, 0), M[4], text='TSMC · HSINCHU', pin=('hsinchu', -260, -60), rot=1.5)
add('engineer', cue('chipmaker', 1, 4), M[4], xy=(820, 1010), rot=4, scale=0.75)
add('circle', cue('taiwan', 1, 4), M[4], xy=(820, 1010), rx=100, ry=145, dur=12)
# shot F: China, never shipped
add('card', cue('china', 1, 0), M[5], fig='FIG. 05', lines=['China,', 'Never Shipped'])
add('compass', M[4], M[5], ll=(126.5, 25.0), r=46)
add('crate', cue('never', 1, -2), M[5], pin=('beijing', 0, -60), rot=-3)
add('inkx', cue('received', 1, 0), M[5], pin=('beijing', 0, -60), r=40)
add('tag', cue('one', 3, 2), M[5], text='BEIJING · NEVER SHIPPED', pin=('beijing', 0, 50), rot=1.5)
add('doc', cue('nineteen', 1, -2), M[5], xy=(300, 1060), rot=-6, scale=0.7)
add('inkx', cue('lapse', 1, 0), M[5], xy=(300, 1060), r=46)
add('tag', cue('lapse', 1, 4), M[5], text='THE HAGUE 2019 · LICENCE LAPSED', xy=(490, 1260), rot=-1.5, size=23)
add('ransom', cue('like', 1, 0), M[5], text='CHOKEPOINT', xy=(490, 820), size=78, seed=8)
add('sheet', cue('like', 1, 6), M[5], xy=(490, 1430), text='China has never received one.')
# shot G: back to the start (the loop)
tin_group(MEND[6] - 4, cue('drop', 2, -2), END)
add('machine', MEND[6] - 6, END, xy=(490, 1250), rot=-2, width=600)
add('ransom', cue('fifty', 2, -2), END, text='50,000', xy=(490, 250), size=124, seed=2)
add('tag', cue('times', 2, 0), NFR - 30, text='LASER SHOTS EVERY SECOND', xy=(490, 380), size=24, rot=-1)
add('tag', NFR - 30, END, text='TSMC RUNS ~56% OF ALL EUV MACHINES (2024)', xy=(490, 380), rot=-1, size=21)   # hidden key text, last second
CARDS = sorted(e['f0'] for e in E if e['kind'] == 'card')
for e in E:
    if e['kind'] == 'card':
        nxt = [c for c in CARDS if c > e['f0']]
        e['f1'] = min(e['f1'], nxt[0]) if nxt else e['f1']

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
    lines = e['lines']; fnt = font(F_CASLON, 64); h = 64 + len(lines) * 76
    im = Image.new('RGBA', (560, h), BEIGE + (255,)); d = ImageDraw.Draw(im)
    n = max(0, f - e['f0'] - 4)
    for i, l in enumerate(lines):
        d.text((34, 40 + i * 76), l[:max(0, n)], font=fnt, fill=INK); n -= len(l)
    return im, h

def logo():
    lg = Image.open(os.path.expanduser('~/cosmic-run/brand/history-sketches/option_c.png')).convert('RGBA').resize((92, 92), Image.LANCZOS)
    m = Image.new('L', (92, 92), 0); ImageDraw.Draw(m).ellipse((0, 0, 91, 91), fill=255)
    out = Image.new('RGBA', (100, 100), (0, 0, 0, 0)); ImageDraw.Draw(out).ellipse((0, 0, 99, 99), fill=INK + (255,)); out.paste(lg, (4, 4), m)
    return out
LOGO_XY = (W - 100 - 40, 170)          # top right, clear of the Shorts buttons (right column, lower half) and the caption block

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
    rise = min(1, max(0, (f - SWEEP) / 8))
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
        elif k == 'circle':
            c = pos(e, cam); fr = min(1, (age + 2) / e['dur']); a = np.linspace(-0.3, -0.3 + (2 * math.pi + 0.65) * fr, max(3, int(90 * fr)))
            marker(ink, ink_jitter([(c[0] + e['rx'] * math.cos(t), c[1] + e['ry'] * math.sin(t)) for t in a], f, sd), 5.5, (f // 8) % 3)
        elif k == 'splash':
            splash(ink, pos(e, cam), e['seed'])
        elif k == 'dot':
            c = pos(e, cam); ImageDraw.Draw(ink).ellipse((c[0] - 4, c[1] - 4, c[0] + 4, c[1] + 4), fill=255)
    img = apply_ink(img, ink)
    for e in live:
        k, age = e['kind'], f - e['f0']; sd = id_of(e)
        if k == 'card':
            im, h = card_img(e, f); bx, by, br = boil(f, sd)
            place(img, im, (340 + bx, 60 + h / 2 + by), -1.2 + br, slap(age))
            place(img, cached(('tag', e['fig'], 22), lambda: tag(e['fig'], 22)), (120 + bx, 62 + by), 2.0 + br, slap(age))
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
            put(img, cached('doc', lambda: cutout(draw_document('LICENCE'), screen=False)), e, f, cam, rot=e['rot'], scale=e['scale'])
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
    ev = []
    for e in E:
        k = e['kind']
        if k in ('machine', 'tag', 'engineer', 'container', 'crate', 'doc', 'sheet', 'card', 'tin', 'flash', 'sun', 'wafer', 'mirror', 'splash'):
            if e['f0'] < NFR - 30 or k != 'tag': ev.append(('slap', e['f0'], 0))
        if k == 'ransom':
            n = sum(1 for c in e['text'] if c != ' '); ev += [('slap', e['f0'] + 3 * i, 0) for i in range(n)]
        if k in ('arrow', 'circle'): ev.append(('scratch', e['f0'], e['dur']))
        if k == 'inkx': ev.append(('scratch', e['f0'], 6))
        if k == 'note': ev.append(('scratch', e['f0'], int(len(e['text']) / 1.3)))
        if k == 'card':
            n = sum(len(l) for l in e['lines']); ev += [('tick', e['f0'] + 4 + i, 0) for i in range(0, n, 2)]
        if k == 'sheet': ev += [('tick', e['f0'] + 4 + i, 0) for i in range(0, len(e['text']), 2)]
    for iso, (f0, f1) in PAINT.items(): ev.append(('scribble', f0, SWEEP))
    ev.sort(key=lambda v: v[1]); out, last = [], {}
    for t, f0, d in ev:
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
        fr = [int(a) for a in sys.argv[2:]] or [30, 130, 300, 440, 560, 650, 780, 880, 960, 1060, 1210, NFR - 14]
        with Pool(8) as pool: ims = pool.map(render, fr)
        tw, th = 360, 640
        sh = Image.new('RGB', (6 * tw, 2 * (th + 30)), BOARD); d = ImageDraw.Draw(sh)
        for i, (f, a) in enumerate(zip(fr, ims)):
            x, y = (i % 6) * tw, (i // 6) * (th + 30)
            t = Image.fromarray(a).resize((tw, th), Image.LANCZOS); dt = ImageDraw.Draw(t)
            dt.rectangle((0, int(1540 * th / H), tw - 1, th - 1), outline=(200, 40, 40), width=1)          # Shorts UI zones
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
