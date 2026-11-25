"""Chip Wars Shorts cover: clean Gemini art (no text) + hook + History Sketches logo + episode tag.
usage: ~/cizgi/.venv/bin/python make_cover.py <clean.jpg> <out.jpg> "<HOOK, *word* in yellow>" <ep number>
The hook goes in big white Impact with a black outline across the top; words wrapped in *stars* are yellow.
The logo sits top-right, and a small "CHIP WARS #N" tag sits under the hook. The bottom quarter stays clear."""
import sys, re
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src, out, hook, ep = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
shift = int(sys.argv[5]) if len(sys.argv) > 5 else 0   # push the art down (px) when the hook would cover a face
W, H = 1080, 1920
im = Image.open(src).convert('RGB')
s = max(W / im.width, H / im.height); im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
im = im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))
if shift:
    top = im.crop((0, 0, W, 300)).resize((W, shift + 300)).filter(ImageFilter.GaussianBlur(28))
    new = Image.new('RGB', (W, H)); new.paste(top, (0, 0)); body = im.crop((0, 0, W, H - shift))
    m = Image.linear_gradient('L').resize((W, 140)).transpose(Image.FLIP_TOP_BOTTOM)
    seam = Image.composite(top.crop((0, shift, W, shift + 140)), body.crop((0, 0, W, 140)), m)
    new.paste(body, (0, shift)); new.paste(seam, (0, shift)); im = new
# darken the top so the hook reads on any art
grad = Image.new('L', (1, H)); [grad.putpixel((0, y), int(170 * max(0, 1 - y / 760) ** 1.4)) for y in range(H)]
im = Image.composite(Image.new('RGB', (W, H), (0, 0, 0)), im, grad.resize((W, H)))
d = ImageDraw.Draw(im)
IMPACT = '/System/Library/Fonts/Supplemental/Impact.ttf'
words = [(w.strip('*'), w.startswith('*')) for w in hook.upper().split()]
def lines_for(size):
    f = ImageFont.truetype(IMPACT, size); out, cur = [], []
    for w in words:
        test = cur + [w]
        if d.textlength(' '.join(x[0] for x in test), font=f) > 960 and cur: out.append(cur); cur = [w]
        else: cur = test
    return f, out + [cur]
size = 190
while True:
    f, ls = lines_for(size)
    if len(ls) <= 3 and all(d.textlength(' '.join(x[0] for x in l), font=f) <= 960 for l in ls): break
    size -= 6
y = 205; lh = int(size * 1.02)
for l in ls:
    tw = d.textlength(' '.join(x[0] for x in l), font=f); x = (W - tw) / 2
    for i, (w, yel) in enumerate(l):
        t = w + (' ' if i < len(l) - 1 else '')
        d.text((x, y), w, font=f, fill='#FFD23F' if yel else 'white', stroke_width=max(8, size // 16), stroke_fill='black')
        x += d.textlength(t, font=f)
    y += lh
# episode tag
tf = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Black.ttf', 40); tag = f'CHIP WARS #{ep}'
tw = d.textlength(tag, font=tf); tx, ty = (W - tw) / 2, y + 18
d.rounded_rectangle((tx - 28, ty - 10, tx + tw + 28, ty + 58), 34, fill='#B3261E'); d.text((tx, ty - 2), tag, font=tf, fill='white')
# logo, top-right, round with a dark ring (as on the other History Sketches covers)
lg = Image.open('/Users/canberkasaroglu/cosmic-run/brand/history-sketches/option_c.png').convert('RGBA').resize((150, 150), Image.LANCZOS)
m = Image.new('L', (150, 150), 0); ImageDraw.Draw(m).ellipse((0, 0, 149, 149), fill=255)
ring = Image.new('RGBA', (162, 162), (0, 0, 0, 0)); ImageDraw.Draw(ring).ellipse((0, 0, 161, 161), fill=(20, 20, 20, 255))
im.paste(ring, (W - 162 - 24, 24), ring); im.paste(lg, (W - 150 - 30, 30), m)
im.save(out, quality=92)
print(out, size, len(ls), 'lines')
