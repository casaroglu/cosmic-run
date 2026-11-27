import sys, glob
from PIL import Image, ImageDraw
src, out = sys.argv[1], sys.argv[2]; cols = int(sys.argv[3]) if len(sys.argv) > 3 else 4
fs = sorted(glob.glob(src + "/*.jpg")); W, H = 640, 360; rows = (len(fs) + cols - 1) // cols
im = Image.new("RGB", (cols * W, rows * H)); d = ImageDraw.Draw(im)
for i, f in enumerate(fs):
    x, y = (i % cols) * W, (i // cols) * H; im.paste(Image.open(f).resize((W, H)), (x, y)); d.rectangle([x, y, x + 64, y + 18], fill="#000"); d.text((x + 3, y + 3), f.split("/")[-1][1:-4].lstrip("0") or "0", fill="#ff0")
im.save(out, quality=85); print(out, len(fs))
