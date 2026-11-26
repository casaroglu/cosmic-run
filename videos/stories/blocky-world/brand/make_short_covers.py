"""Shorts covers 1080x1920: a frame from the Short, brightened, with a 4-5 word hook in the channel's outlined Nunito type."""
import subprocess, sys, os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
HERE = os.path.dirname(os.path.abspath(__file__)); BW = os.path.dirname(HERE)
FONT = os.path.expanduser("~/cizgi/toast-long2/fonts/Nunito.ttf")
INK = (34, 26, 38)
COVERS = [  # (video, second, [(line, colour)], text centre y, out name)
  ("s1-dont-feed-the-mascot/S1_Dont_Feed_the_Mascot_small.mp4", 16.5, [("DON'T FEED HIM", (255, 255, 255)), ("AFTER 3 AM", (255, 77, 77))], 1560, "s1_dont_feed_the_mascot"),
  ("itw-01-snores/ITW01_small.mp4", 33.3, [("DON'T WAKE", (255, 255, 255)), ("THE GIANT", (255, 225, 74))], 300, "itw01_dont_wake_the_giant"),
  ("night-shift-01/Night_Shift_01_small.mp4", 13.85, [("HE HAS", (255, 255, 255)), ("NO SHADOW", (255, 77, 77))], 1560, "night_shift_01_no_shadow"),
  ("/Users/canberkasaroglu/cizgi/toast-t2/out/T2_Why_Would_I_Deceive_You.mp4", 38.0, [("HE LIED.", (255, 255, 255)), ("IT GREW.", (255, 111, 176))], 1600, "t2_he_lied_it_grew"),
]
def font(sz):
    f = ImageFont.truetype(FONT, sz)
    try: f.set_variation_by_axes([900])
    except Exception: pass
    return f
for vid, t, lines, cy, name in COVERS:
    tmp = os.path.join(HERE, "shorts_covers", f"_{name}_raw.png")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", os.path.join(BW, vid), "-frames:v", "1", tmp], check=True)
    im = Image.open(tmp).convert("RGB"); os.remove(tmp)
    im = ImageEnhance.Brightness(im).enhance(1.18); im = ImageEnhance.Color(im).enhance(1.15)
    d = ImageDraw.Draw(im); W = im.width
    sizes = []
    for txt, _ in lines:
        sz = 190
        while d.textlength(txt, font=font(sz)) > W * 0.9 and sz > 80: sz -= 4
        sizes.append(sz)
    sz = min(sizes); f = font(sz); lh = int(sz * 1.08); y0 = cy - lh * len(lines) // 2
    for i, (txt, col) in enumerate(lines):
        w = d.textlength(txt, font=f); x = (W - w) / 2; y = y0 + i * lh
        d.text((x, y), txt, font=f, fill=col, stroke_width=max(10, sz // 9), stroke_fill=INK)
    out = os.path.join(HERE, "shorts_covers", name + ".jpg"); im.save(out, quality=92); print(out)
