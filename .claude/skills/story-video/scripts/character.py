#!/usr/bin/env python3
"""Turn a public-domain portrait into a flat line-art character cut-out (transparent PNG).

usage: character.py PORTRAIT.jpg OUT.png [--accent red|green|gold|blue|none] [--tones 3]
Needs the lineart venv (~/.cache/lineart/venv: rembg, controlnet_aux, torch).
Steps: rembg cut-out -> ControlNet lineart (lllyasviel/Annotators) -> flat grey tones from the
portrait's own light/shadow -> keep ONE accent colour (e.g. a red kaftan) as a flat fill ->
ink lines multiplied on top -> thick outline around the silhouette.
"""
import argparse
import numpy as np
from PIL import Image, ImageFilter, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--accent", default="red")
ap.add_argument("--tones", type=int, default=3)
ap.add_argument("--size", type=int, default=1024, help="working height in px")
a = ap.parse_args()

HUES = {"red": [(0, 18), (335, 360)], "green": [(80, 170)], "gold": [(30, 55)], "blue": [(190, 250)]}
FLAT = {"red": (190, 45, 40), "green": (52, 120, 72), "gold": (214, 168, 60), "blue": (40, 80, 150)}

im = Image.open(a.src).convert("RGB")
im = im.resize((round(im.width * a.size / im.height), a.size), Image.LANCZOS)

# 1. cut-out
from rembg import remove
cut = remove(im)                      # RGBA
alpha = np.asarray(cut)[..., 3].astype(np.float32) / 255
alpha = (alpha > 0.5).astype(np.float32)

# 2. line art
from controlnet_aux import LineartDetector
det = LineartDetector.from_pretrained("lllyasviel/Annotators")
lines = det(im, coarse=False, detect_resolution=a.size, image_resolution=a.size)   # white lines on black
lines = np.asarray(lines.convert("L").resize(im.size)).astype(np.float32) / 255
lines = np.clip((lines - 0.18) / 0.5, 0, 1)                 # drop faint texture lines
ink = 1 - lines                                             # 1 = paper, 0 = ink

# 3. flat tones from the portrait's luminance
rgb = np.asarray(im).astype(np.float32) / 255
lum = 0.3 * rgb[..., 0] + 0.59 * rgb[..., 1] + 0.11 * rgb[..., 2]
lum = np.asarray(Image.fromarray((lum * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(9))).astype(np.float32) / 255
lv = np.quantile(lum[alpha > 0], np.linspace(0, 1, a.tones + 1)[1:-1]) if alpha.sum() else [0.5]
greys = np.linspace(0.62, 0.97, a.tones)                    # shadow -> highlight
band = np.digitize(lum, lv)
flat = np.repeat(greys[band][..., None], 3, axis=2)

# 4. one accent colour, kept flat
if a.accent in HUES:
    hsv = np.asarray(im.convert("HSV")).astype(np.float32)
    h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
    m = np.zeros(h.shape, bool)
    for lo, hi in HUES[a.accent]:
        m |= (h >= lo) & (h <= hi)
    m &= (s > 0.35) & (v > 0.18)
    m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(11)).filter(ImageFilter.MaxFilter(3))) > 127
    col = np.array(FLAT[a.accent], np.float32) / 255
    shade = np.where(band[..., None] == 0, 0.78, 1.0)       # darker accent in the shadow band
    flat = np.where(m[..., None], col * shade, flat)

# 5. ink on top, thick outline around the silhouette
out = flat * ink[..., None]
edge = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))).astype(np.float32) / 255
outline = np.clip(edge - alpha, 0, 1)
out = out * (1 - outline[..., None])                        # black rim
a_out = np.maximum(alpha, outline)
rgba = np.dstack([out, a_out])
Image.fromarray((np.clip(rgba, 0, 1) * 255).astype(np.uint8), "RGBA").save(a.out)
print(a.out, im.size)
