"""Chip Wars long-video thumbnail (16:9, 1280x720): clean Gemini art (no text) + hook + History Sketches logo + part tag.
usage: ~/cizgi/.venv/bin/python make_thumb.py <clean.jpg> <out.jpg> "<HOOK, *word* in yellow>" <part number>
"|" forces a line break. Hook in big white Impact with a black outline, top-left; *starred* words yellow; logo top-right; small "CHIP WARS · PART N" tag under the hook."""
import sys
from PIL import Image, ImageDraw, ImageFont
src, out, hook, part = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
W, H = 1280, 720
im = Image.open(src).convert('RGB')
s = max(W / im.width, H / im.height); im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
im = im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))
# darken top-left so the hook reads on any art
grad = Image.new('L', (W, H))
gp = grad.load()
for y in range(0, H, 2):
    for x in range(0, W, 2):
        v = int(175 * max(0, 1 - (x / 1000) ** 2 * 0.6 - (y / 520) ** 1.6))
        for dy in (0, 1):
            for dx in (0, 1):
                if x + dx < W and y + dy < H: gp[x + dx, y + dy] = max(0, v)
im = Image.composite(Image.new('RGB', (W, H), (0, 0, 0)), im, grad)
d = ImageDraw.Draw(im)
IMPACT = '/System/Library/Fonts/Supplemental/Impact.ttf'
MAXW = 820
FORCED = '|' in hook   # "|" forces a line break: "BREAK ONE,|AI STOPS"
words = [(w.strip('*'), w.startswith('*')) for w in hook.upper().replace('|', ' ').split()]
def lines_for(size):
    f = ImageFont.truetype(IMPACT, size)
    if FORCED: return f, [[(w.strip('*'), w.startswith('*')) for w in part.split()] for part in hook.upper().split('|')]
    res, cur = [], []
    for w in words:
        test = cur + [w]
        if d.textlength(' '.join(x[0] for x in test), font=f) > MAXW and cur: res.append(cur); cur = [w]
        else: cur = test
    return f, res + [cur]
size = 170
while True:
    f, ls = lines_for(size)
    if len(ls) <= 3 and all(d.textlength(' '.join(x[0] for x in l), font=f) <= MAXW for l in ls): break
    size -= 4
y = 34; lh = int(size * 1.02)
for l in ls:
    x = 44
    for i, (w, yel) in enumerate(l):
        d.text((x, y), w, font=f, fill='#FFD23F' if yel else 'white', stroke_width=max(6, size // 16), stroke_fill='black')
        x += d.textlength(w + ' ', font=f)
    y += lh
tf = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Black.ttf', 30); tag = f'CHIP WARS · PART {part}'
tw = d.textlength(tag, font=tf); tx, ty = 64, y + 16
d.rounded_rectangle((tx - 22, ty - 8, tx + tw + 22, ty + 46), 27, fill='#B3261E'); d.text((tx, ty - 2), tag, font=tf, fill='white')
lg = Image.open('/Users/canberkasaroglu/cosmic-run/brand/history-sketches/option_c.png').convert('RGBA').resize((120, 120), Image.LANCZOS)
m = Image.new('L', (120, 120), 0); ImageDraw.Draw(m).ellipse((0, 0, 119, 119), fill=255)
ring = Image.new('RGBA', (130, 130), (0, 0, 0, 0)); ImageDraw.Draw(ring).ellipse((0, 0, 129, 129), fill=(20, 20, 20, 255))
im.paste(ring, (W - 130 - 20, 20), ring); im.paste(lg, (W - 120 - 25, 25), m)
im.save(out, quality=90)
print(out, size, len(ls), 'lines')
