"""contact sheet of a frames dir: fsheet.py <scene> [step=30] [out]"""
import sys, glob
from PIL import Image, ImageDraw
s = sys.argv[1]; st = int(sys.argv[2]) if len(sys.argv) > 2 else 30
fs = sorted(glob.glob(f"/Users/canberkasaroglu/cizgi/toast-long4/scenes/{s}/frames/*.jpg"))[::st]
c = 6; W, H = 320, 180; r = (len(fs) + c - 1) // c; im = Image.new("RGB", (c * W, r * H)); d = ImageDraw.Draw(im)
for i, f in enumerate(fs): x, y = (i % c) * W, (i // c) * H; im.paste(Image.open(f).resize((W, H)), (x, y)); d.text((x + 3, y + 3), f[-9:-4], fill="#ff0")
im.save(sys.argv[3] if len(sys.argv) > 3 else "/tmp/fs.jpg", quality=80); print(len(fs))
