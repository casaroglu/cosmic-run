"""Code-drawn collage pieces shared by the Chip Wars Part 1 Shorts and the long-form (generic, no logos, no real people).
Collected from the Short episodes; import after engine."""
import math
from engine import Image, ImageDraw, YEL, INK, BEIGE, np

def draw_quartz():
    """a cluster of clear quartz crystals (hexagonal prisms with pointed tips), grey shading for the halftone."""
    im = Image.new('RGBA', (360, 330), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for cx, h, w, tilt, g in ((110, 230, 70, -0.35, 215), (250, 210, 64, 0.3, 200), (180, 290, 84, 0.0, 235), (300, 150, 48, 0.55, 190), (60, 160, 50, -0.6, 205)):
        base = (cx, 320); dx, dy = math.sin(tilt), -math.cos(tilt)
        top = (base[0] + dx * h, base[1] + dy * h); px, py = -dy, dx
        body = [(base[0] - px * w / 2, base[1] - py * w / 2), (top[0] - px * w / 2, top[1] - py * w / 2), (top[0] + dx * w * 0.6, top[1] + dy * w * 0.6),
                (top[0] + px * w / 2, top[1] + py * w / 2), (base[0] + px * w / 2, base[1] + py * w / 2)]
        d.polygon(body, fill=(g, g, g, 255), outline=(80, 80, 80, 255), width=3)
        d.line([(base[0], base[1]), (top[0] + dx * w * 0.6, top[1] + dy * w * 0.6)], fill=(150, 150, 150, 255), width=3)
        d.line([(top[0] - px * w / 2, top[1] - py * w / 2), (top[0] + px * w / 2, top[1] + py * w / 2)], fill=(120, 120, 120, 255), width=2)
    d.ellipse((20, 300, 340, 330), fill=(120, 120, 120, 255))
    return im

def draw_crucible():
    """a fused-quartz crucible (bowl) on a heater; the melt is drawn separately in yellow."""
    im = Image.new('RGBA', (420, 300), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((30, 150, 390, 290), fill=(90, 90, 90, 255))
    for x in range(50, 380, 40): d.line((x, 170, x, 280), fill=(60, 60, 60, 255), width=6)
    d.pieslice((40, -60, 380, 250), 0, 180, fill=(225, 225, 225, 255), outline=(70, 70, 70, 255), width=5)
    d.ellipse((40, 40, 380, 110), fill=(200, 200, 200, 255), outline=(70, 70, 70, 255), width=5)
    d.ellipse((60, 52, 360, 98), fill=(30, 30, 30, 255))
    return im

def draw_melt():
    im = Image.new('RGBA', (310, 60), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.ellipse((5, 5, 305, 55), fill=YEL + (255,), outline=INK + (255,), width=4)
    for x in (60, 120, 190, 250): d.arc((x - 18, 18, x + 18, 42), 200, 340, fill=INK + (255,), width=3)
    return im

def draw_ingot():
    """a single-crystal silicon ingot: a long cylinder with a cone at the top and a thin seed rod."""
    im = Image.new('RGBA', (170, 520), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((80, 0, 90, 70), fill=(80, 80, 80, 255))
    d.polygon([(85, 60), (20, 150), (150, 150)], fill=(150, 150, 150, 255), outline=(70, 70, 70, 255))
    d.rectangle((20, 150, 150, 480), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=3)
    d.rectangle((36, 160, 62, 470), fill=(230, 230, 230, 255))
    d.ellipse((20, 462, 150, 500), fill=(120, 120, 120, 255), outline=(70, 70, 70, 255), width=3)
    return im

def draw_cart():
    """a generic mine cart full of white quartz."""
    im = Image.new('RGBA', (300, 230), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for x, y in ((40, 60), (90, 30), (150, 45), (210, 25), (250, 60), (120, 70), (190, 70)): d.ellipse((x - 38, y - 30, x + 38, y + 30), fill=(235, 235, 235, 255), outline=(110, 110, 110, 255), width=3)
    d.polygon([(10, 80), (290, 80), (260, 190), (40, 190)], fill=(100, 100, 100, 255), outline=(50, 50, 50, 255))
    for x in (70, 150, 230): d.line((x, 90, x - 5, 180), fill=(70, 70, 70, 255), width=4)
    for cx in (85, 215): d.ellipse((cx - 30, 170, cx + 30, 230), fill=(60, 60, 60, 255)); d.ellipse((cx - 10, 190, cx + 10, 210), fill=(160, 160, 160, 255))
    return im

def draw_storm():
    """a hurricane symbol on paper: yellow disc with ink spiral arms."""
    s = 300; im = Image.new('RGBA', (s, s), (0, 0, 0, 0)); d = ImageDraw.Draw(im); c = s / 2
    for arm in (0, math.pi):
        pts = [(c + (12 + t * 26) * math.cos(arm + t), c + (12 + t * 26) * math.sin(arm + t)) for t in np.linspace(0, 4.6, 60)]
        d.line(pts, fill=INK + (255,), width=16, joint='curve')
    d.ellipse((c - 44, c - 44, c + 44, c + 44), fill=YEL + (255,), outline=INK + (255,), width=6)
    d.ellipse((c - 14, c - 14, c + 14, c + 14), fill=BEIGE + (255,), outline=INK + (255,), width=4)
    return im

def draw_laptop():
    im = Image.new('RGBA', (300, 230), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((40, 0, 260, 150), 10, fill=(60, 60, 60, 255)); d.rectangle((52, 12, 248, 138), fill=(210, 210, 210, 255))
    for r in range(3):
        d.rectangle((70, 30 + r * 34, 230 - r * 30, 46 + r * 34), fill=(150, 150, 150, 255))
    d.polygon([(10, 200), (290, 200), (262, 150), (38, 150)], fill=(120, 120, 120, 255), outline=(60, 60, 60, 255))
    d.rectangle((10, 200, 290, 214), fill=(90, 90, 90, 255))
    return im

def draw_cylinder():
    """a tall industrial gas cylinder with a valve and a blank paper label band."""
    im = Image.new('RGBA', (150, 420), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((58, 0, 92, 40), fill=(70, 70, 70, 255)); d.rectangle((40, 14, 110, 30), fill=(90, 90, 90, 255))
    d.ellipse((15, 40, 135, 120), fill=(185, 185, 185, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((15, 80, 135, 400), fill=(185, 185, 185, 255)); d.line((15, 80, 15, 400), fill=(70, 70, 70, 255), width=4); d.line((135, 80, 135, 400), fill=(70, 70, 70, 255), width=4)
    d.ellipse((15, 380, 135, 420), fill=(150, 150, 150, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((30, 90, 52, 390), fill=(232, 232, 232, 255))
    d.rectangle((15, 220, 135, 280), fill=(110, 110, 110, 255))
    return im

def draw_factory():
    """a generic industrial gas plant: a hall, two chimneys, a column and round tanks."""
    im = Image.new('RGBA', (300, 230), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((20, 110, 200, 220), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=3)
    d.polygon([(20, 110), (65, 80), (110, 110), (155, 80), (200, 110)], fill=(130, 130, 130, 255), outline=(70, 70, 70, 255))
    for x in (50, 90): d.rectangle((x, 20, x + 18, 90), fill=(100, 100, 100, 255))
    d.rectangle((215, 30, 245, 220), fill=(140, 140, 140, 255), outline=(70, 70, 70, 255), width=3)
    for cx in (270,): d.ellipse((cx - 26, 150, cx + 26, 202), fill=(200, 200, 200, 255), outline=(70, 70, 70, 255), width=3)
    for x in range(40, 190, 34): d.rectangle((x, 150, x + 18, 175), fill=(90, 90, 90, 255))
    return im

def draw_blueprint():
    """a chip design drawing on cream paper: engraved line art of a floorplan (cores, cache, I/O), no text, no halftone."""
    im = Image.new('RGBA', (440, 340), BEIGE + (255,)); d = ImageDraw.Draw(im)
    d.rectangle((10, 10, 429, 329), outline=INK + (255,), width=3); d.rectangle((18, 18, 421, 321), outline=INK + (255,), width=1)
    d.rectangle((60, 50, 380, 290), outline=INK + (255,), width=4)
    for i in range(4):
        x = 80 + i * 72; d.rectangle((x, 70, x + 56, 150), outline=INK + (255,), width=3)
        for k in range(3): d.line((x + 8, 86 + k * 20, x + 48, 86 + k * 20), fill=INK + (255,), width=1)
    d.rectangle((80, 170, 360, 230), outline=INK + (255,), width=3)
    for x in range(92, 352, 14): d.line((x, 176, x, 224), fill=INK + (255,), width=1)
    for x in (80, 180, 280): d.rectangle((x, 244, x + 80, 274), outline=INK + (255,), width=2)
    for k in range(9):
        d.line((60 + k * 40, 290, 60 + k * 40, 310), fill=INK + (255,), width=3); d.line((60 + k * 40, 30, 60 + k * 40, 50), fill=INK + (255,), width=3)
    return im

def draw_key():
    im = Image.new('RGBA', (420, 200), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.ellipse((10, 30, 150, 170), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=5); d.ellipse((50, 70, 110, 130), fill=(0, 0, 0, 0), outline=(70, 70, 70, 255), width=5)
    d.ellipse((52, 72, 108, 128), fill=(0, 0, 0, 0))
    d.rectangle((140, 84, 400, 116), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=4)
    for x, h in ((300, 50), (345, 34), (380, 56)): d.rectangle((x, 116, x + 26, 116 + h), fill=(170, 170, 170, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((150, 90, 390, 98), fill=(230, 230, 230, 255))
    return im

def draw_gavel():
    im = Image.new('RGBA', (380, 300), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.polygon([(150, 120), (170, 100), (360, 270), (340, 290)], fill=(120, 120, 120, 255), outline=(60, 60, 60, 255))
    d.polygon([(60, 70), (170, -10), (240, 80), (130, 160)], fill=(160, 160, 160, 255), outline=(60, 60, 60, 255))
    d.polygon([(40, 90), (70, 66), (140, 160), (110, 184)], fill=(110, 110, 110, 255), outline=(60, 60, 60, 255))
    d.polygon([(230, 70), (260, 46), (330, 140), (300, 164)], fill=(110, 110, 110, 255), outline=(60, 60, 60, 255))
    d.rounded_rectangle((20, 250, 260, 292), 12, fill=(90, 90, 90, 255))
    return im

def draw_coin():
    im = Image.new('RGBA', (110, 110), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.ellipse((4, 4, 106, 106), fill=YEL + (255,), outline=INK + (255,), width=5); d.ellipse((22, 22, 88, 88), outline=INK + (255,), width=3)
    return im

def draw_fab():
    """a generic chip factory: long low cleanroom hall, a support block, tanks and vents."""
    im = Image.new('RGBA', (460, 250), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((20, 100, 380, 230), fill=(205, 205, 205, 255), outline=(70, 70, 70, 255), width=4)
    d.rectangle((20, 80, 380, 104), fill=(150, 150, 150, 255))
    for x in range(40, 370, 46): d.rectangle((x, 130, x + 28, 150), fill=(110, 110, 110, 255))
    d.rectangle((300, 30, 360, 82), fill=(130, 130, 130, 255)); d.rectangle((60, 50, 130, 82), fill=(130, 130, 130, 255))
    for cx in (410, 440): d.ellipse((cx - 22, 150, cx + 22, 230), fill=(175, 175, 175, 255), outline=(70, 70, 70, 255), width=3)
    d.rectangle((0, 228, 460, 240), fill=(90, 90, 90, 255))
    return im

def draw_shield():
    """a yellow paper shield with an ink outline and a chip drawn on it."""
    im = Image.new('RGBA', (300, 340), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    pts = [(20, 30), (150, 4), (280, 30), (276, 170)] + [(150 + 126 * math.cos(t), 170 + 160 * math.sin(t)) for t in np.linspace(0, math.pi, 20)] + [(24, 170)]
    d.polygon(pts, fill=YEL + (255,), outline=INK + (255,), width=6)
    d.rectangle((100, 110, 200, 210), outline=INK + (255,), width=6)
    for k in range(4):
        for x0, y0, x1, y1 in ((108 + k * 25, 98, 108 + k * 25, 110), (108 + k * 25, 210, 108 + k * 25, 222), (88, 118 + k * 25, 100, 118 + k * 25), (200, 118 + k * 25, 212, 118 + k * 25)):
            d.line((x0, y0, x1, y1), fill=INK + (255,), width=5)
    return im
def draw_steelmill():
    """a generic Soviet-era steel works: a blast furnace, a chimney and a tall air-separation column."""
    im = Image.new('RGBA', (420, 330), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.polygon([(60, 320), (90, 120), (150, 120), (180, 320)], fill=(120, 120, 120, 255), outline=(60, 60, 60, 255))
    d.rectangle((95, 70, 145, 122), fill=(150, 150, 150, 255), outline=(60, 60, 60, 255), width=3)
    d.line((120, 70, 200, 20), fill=(80, 80, 80, 255), width=10); d.rectangle((190, 10, 230, 320), fill=(100, 100, 100, 255))
    d.rectangle((280, 40, 330, 320), fill=(200, 200, 200, 255), outline=(60, 60, 60, 255), width=4)
    for y in range(70, 310, 40): d.line((280, y, 330, y), fill=(120, 120, 120, 255), width=3)
    d.ellipse((345, 230, 405, 320), fill=(175, 175, 175, 255), outline=(60, 60, 60, 255), width=3)
    d.rectangle((10, 300, 415, 326), fill=(80, 80, 80, 255))
    return im

def draw_reticle():
    """a photomask (the 'stencil'): a square glass plate with a circuit pattern, line art on cream paper."""
    im = Image.new('RGBA', (300, 300), BEIGE + (255,)); d = ImageDraw.Draw(im)
    d.rectangle((6, 6, 293, 293), outline=INK + (255,), width=4); d.rectangle((40, 40, 260, 260), outline=INK + (255,), width=3)
    for y in range(60, 250, 24): d.line((55, y, 245 - (y % 48), y), fill=INK + (255,), width=3)
    for x in (90, 150, 210): d.line((x, 55, x, 245), fill=INK + (255,), width=2)
    return im
