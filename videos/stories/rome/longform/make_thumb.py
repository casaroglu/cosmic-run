"""16:9 thumbnails for the Rome long-form parts: three clean Gemini cover arts side by side, a big hook,
a red "PART N" tag and the History Sketches logo.
usage: ~/cizgi/.venv/bin/python make_thumb.py  ->  videos/out/rome/long/thumb_part_<N>.jpg"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
C = os.path.expanduser('~/cosmic-run/videos/out/rome/_covers/clean')
OUT = os.path.expanduser('~/cosmic-run/videos/out/rome/long')
IMPACT = '/System/Library/Fonts/Supplemental/Impact.ttf'; BLACK = '/System/Library/Fonts/Supplemental/Arial Black.ttf'
PARTS = {1: (['01', '03', '05'], ['HOW A VILLAGE', '*BECAME* ROME']),
         2: (['06', '07', '10'], ['ROME AT ITS', '*PEAK*']),
         3: (['11', '13', '15'], ['HOW ROME', '*REALLY* ENDED'])}
W, H = 1280, 720
for n, (eps, hook) in PARTS.items():
    im = Image.new('RGB', (W, H)); pw = W // 3
    for i, e in enumerate(eps):
        a = Image.open(f'{C}/{e}.jpg').convert('RGB'); s = max(pw / a.width, H / a.height)
        a = a.resize((round(a.width * s), round(a.height * s)), Image.LANCZOS)
        a = a.crop(((a.width - pw) // 2, int((a.height - H) * 0.55), (a.width - pw) // 2 + pw, int((a.height - H) * 0.55) + H))
        im.paste(a, (i * pw, 0))
    d = ImageDraw.Draw(im)
    for i in (1, 2): d.rectangle((i * pw - 3, 0, i * pw + 3, H), fill='black')
    # dark band behind the hook
    band = Image.new('L', (1, H)); [band.putpixel((0, y), int(200 * max(0, 1 - abs(y - 250) / 260))) for y in range(H)]
    im = Image.composite(Image.new('RGB', (W, H), 'black'), im, band.resize((W, H))); d = ImageDraw.Draw(im)
    f = ImageFont.truetype(IMPACT, 150)
    for k, line in enumerate(hook):
        words = [(w.strip('*'), w.startswith('*')) for w in line.split()]
        tw = d.textlength(' '.join(w for w, _ in words), font=f); x = (W - tw) / 2; y = 70 + k * 158
        for w, yel in words:
            d.text((x, y), w, font=f, fill='#FFD23F' if yel else 'white', stroke_width=10, stroke_fill='black'); x += d.textlength(w + ' ', font=f)
    tf = ImageFont.truetype(BLACK, 44); tag = f'ANCIENT ROME · PART {n}'; tw = d.textlength(tag, font=tf); tx, ty = (W - tw) / 2, 440
    d.rounded_rectangle((tx - 30, ty - 10, tx + tw + 30, ty + 62), 36, fill='#B3261E'); d.text((tx, ty - 2), tag, font=tf, fill='white')
    lg = Image.open(os.path.expanduser('~/cosmic-run/brand/history-sketches/option_c.png')).convert('RGBA').resize((120, 120), Image.LANCZOS)
    m = Image.new('L', (120, 120), 0); ImageDraw.Draw(m).ellipse((0, 0, 119, 119), fill=255)
    ring = Image.new('RGBA', (130, 130), (0, 0, 0, 0)); ImageDraw.Draw(ring).ellipse((0, 0, 129, 129), fill=(20, 20, 20, 255))
    im.paste(ring, (W - 150, 570), ring); im.paste(lg, (W - 145, 575), m)
    os.makedirs(OUT, exist_ok=True); im.save(f'{OUT}/thumb_part_{n}.jpg', quality=92); print('thumb', n)
