"""Taksim maksemi: low-poly 3D cutaway diorama (Blender, Eevee).

usage: blender -b --python scene.py -- TIMELINE.json OUT_DIR [--still SECONDS ...]
Builds the scene in code, keys the camera to the narration beats (each beat's
"shot"), renders JPEG frames to OUT_DIR/frames and writes OUT_DIR/anchors.json
(per-frame screen positions of labelled points, for the caption overlay).
"""
import bpy, bmesh, json, math, os, random, sys
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

argv = sys.argv[sys.argv.index("--") + 1:]
TL = json.load(open(argv[0]))
OUT = os.path.abspath(argv[1])
STILLS = [float(x) for x in argv[argv.index("--still") + 1:]] if "--still" in argv else None
FPS = TL.get("fps", 30)
W, H = 1080, 1920
random.seed(4)

# ---------------------------------------------------------------- reset
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
col = sc.collection


def link(o):
    col.objects.link(o)
    return o


def mat(name, color, rough=0.8, emit=None, strength=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Roughness"].default_value = rough
    if emit:
        p.inputs["Emission Color"].default_value = (*emit, 1)
        p.inputs["Emission Strength"].default_value = strength
    return m


def hexc(h):
    h = h.lstrip("#")
    return tuple((int(h[i:i + 2], 16) / 255) ** 2.2 for i in (0, 2, 4))


# ---------------------------------------------------------------- terrain
X0, X1, Y0, Y1, ZB = -12.0, 12.0, 0.0, 16.0, -4.0


def height(x, y):
    hill = 3.2 * math.exp(-((x - 3) ** 2 / 18 + (y - 3) ** 2 / 30))
    ripple = 0.12 * math.sin(x * 0.9 + y * 0.4) + 0.08 * math.cos(y * 1.3 - x * 0.5)
    return 0.4 + hill + ripple


def terrain():
    nx, ny = 96, 64
    bm = bmesh.new()
    top = [[bm.verts.new((X0 + (X1 - X0) * i / nx, Y0 + (Y1 - Y0) * j / ny,
                          height(X0 + (X1 - X0) * i / nx, Y0 + (Y1 - Y0) * j / ny)))
            for j in range(ny + 1)] for i in range(nx + 1)]
    for i in range(nx):
        for j in range(ny):
            bm.faces.new((top[i][j], top[i + 1][j], top[i + 1][j + 1], top[i][j + 1]))
    ring = ([top[i][0] for i in range(nx + 1)] + [top[nx][j] for j in range(1, ny + 1)] +
            [top[i][ny] for i in range(nx - 1, -1, -1)] + [top[0][j] for j in range(ny - 1, 0, -1)])
    low = [bm.verts.new((v.co.x, v.co.y, ZB)) for v in ring]
    n = len(ring)
    for k in range(n):
        bm.faces.new((ring[(k + 1) % n], ring[k], low[k], low[(k + 1) % n]))
    bm.faces.new(list(reversed(low)))
    bm.normal_update()
    me = bpy.data.meshes.new("terrain")
    bm.to_mesh(me)
    o = link(bpy.data.objects.new("terrain", me))
    o.data.materials.append(mat("grass", hexc("6f9a4a"), 0.95))
    # earth strata by height for side faces
    e = bpy.data.materials.new("earth"); e.use_nodes = True
    nt = e.node_tree; p = nt.nodes["Principled BSDF"]; p.inputs["Roughness"].default_value = 1
    tc = nt.nodes.new("ShaderNodeTexCoord"); sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    noise = nt.nodes.new("ShaderNodeTexNoise"); noise.inputs["Scale"].default_value = 2.5
    add = nt.nodes.new("ShaderNodeMath"); add.operation = "ADD"
    mul = nt.nodes.new("ShaderNodeMath"); mul.operation = "MULTIPLY"; mul.inputs[1].default_value = 0.35
    ramp = nt.nodes.new("ShaderNodeValToRGB"); ramp.color_ramp.interpolation = "CONSTANT"
    stops = [(0.0, "4a3426"), (0.25, "5c4130"), (0.45, "6e5038"), (0.62, "8a6a48"), (0.8, "7a5a3c"), (0.92, "5b8a3c")]
    cr = ramp.color_ramp
    cr.elements[0].position, cr.elements[0].color = stops[0][0], (*hexc(stops[0][1]), 1)
    cr.elements[1].position, cr.elements[1].color = stops[1][0], (*hexc(stops[1][1]), 1)
    for pos, c in stops[2:]:
        el = cr.elements.new(pos); el.color = (*hexc(c), 1)
    mr = nt.nodes.new("ShaderNodeMapRange")
    mr.inputs["From Min"].default_value = ZB; mr.inputs["From Max"].default_value = 3.8
    nt.links.new(tc.outputs["Object"], sep.inputs[0])
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    nt.links.new(sep.outputs["Z"], mr.inputs["Value"])
    nt.links.new(noise.outputs["Fac"], mul.inputs[0])
    nt.links.new(mr.outputs["Result"], add.inputs[0])
    nt.links.new(mul.outputs[0], add.inputs[1])
    sub = nt.nodes.new("ShaderNodeMath"); sub.operation = "SUBTRACT"; sub.inputs[1].default_value = 0.17
    nt.links.new(add.outputs[0], sub.inputs[0])
    nt.links.new(sub.outputs[0], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], p.inputs["Base Color"])
    o.data.materials.append(e)
    for f in o.data.polygons:
        f.material_index = 0 if f.normal.z > 0.3 else 1
        f.use_smooth = False
    return o


terrain()

# ---------------------------------------------------------------- helpers
CUT_Y = -0.02
cutter = link(bpy.data.objects.new("cutter", bpy.data.meshes.new("cutter")))
bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1); bm.to_mesh(cutter.data)
cutter.scale = (60, 20, 60); cutter.location = (0, CUT_Y - 10, 0)
cutter.hide_render = True; cutter.display_type = "WIRE"; cutter.hide_viewport = True
cutter2 = link(bpy.data.objects.new("cutter2", cutter.data.copy()))
cutter2.scale = (60, 20, 60); cutter2.location = (0, -0.04 - 10, 0)
cutter2.hide_render = True; cutter2.hide_viewport = True


def boolean(o, other, op="DIFFERENCE"):
    m = o.modifiers.new("b_" + other.name, "BOOLEAN")
    m.operation = op; m.object = other; m.solver = "EXACT"


def tube(name, pts, radius, material, sides=16):
    cu = bpy.data.curves.new(name, "CURVE"); cu.dimensions = "3D"
    sp = cu.splines.new("POLY"); sp.points.add(len(pts) - 1)
    for p, c in zip(sp.points, pts):
        p.co = (*c, 1)
    cu.bevel_depth = radius; cu.bevel_resolution = sides // 4; cu.use_fill_caps = True
    o = link(bpy.data.objects.new(name, cu))
    bpy.context.view_layer.objects.active = o
    for x in bpy.context.view_layer.objects:
        x.select_set(False)
    o.select_set(True)
    bpy.ops.object.convert(target="MESH")
    o = bpy.context.view_layer.objects.active
    o.data.materials.clear(); o.data.materials.append(material)
    return o


def water_mat(name, scale=3.0, speed=0.06, axis="X"):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; p = nt.nodes["Principled BSDF"]
    p.inputs["Roughness"].default_value = 0.15
    tc = nt.nodes.new("ShaderNodeTexCoord"); mp = nt.nodes.new("ShaderNodeMapping")
    wv = nt.nodes.new("ShaderNodeTexWave"); wv.bands_direction = axis
    wv.inputs["Scale"].default_value = scale; wv.inputs["Distortion"].default_value = 7; wv.inputs["Detail"].default_value = 1
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (*hexc("2a7fd8"), 1)
    ramp.color_ramp.elements[1].color = (*hexc("7fd3f7"), 1)
    nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])
    nt.links.new(mp.outputs["Vector"], wv.inputs["Vector"])
    nt.links.new(wv.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], p.inputs["Base Color"])
    nt.links.new(ramp.outputs["Color"], p.inputs["Emission Color"])
    p.inputs["Emission Strength"].default_value = 0.9
    d = mp.inputs["Location"].driver_add("default_value", 0 if axis == "X" else 1).driver
    d.expression = f"-frame*{speed}"
    return m


M_CLAY = mat("clay", hexc("b5653a"), 0.7)
M_STONE = mat("stone", hexc("e2d6bb"), 0.85)
M_ROOF = mat("lead", hexc("6d757c"), 0.45)
M_WATER = water_mat("water", 0.9, 0.05, "X")

# ---------------------------------------------------------------- the pipe along the section face
MX = 3.0
base = height(MX, 0) - 0.25
pipe_pts = []
for k in range(0, 61):
    x = X0 + 0.2 + (MX - 0.3 - X0) * k / 60
    z = height(x, 0) - 0.95
    if x > MX - 3.0:
        z = min(z, base - 0.6 + (x - (MX - 3.0)) * 0.0)
    pipe_pts.append((x, 0.0, z))
pipe_pts.append((MX - 0.2, 0.0, base + 0.35))
clay = tube("pipe", pipe_pts, 0.34, M_CLAY)
water = tube("pipe_water", pipe_pts, 0.22, M_WATER)
boolean(clay, cutter); boolean(water, cutter2)   # water face sits just in front of the clay ring

# ---------------------------------------------------------------- the maksem (octagonal, pyramid roof)
R, HT = 1.6, 2.6


def prism(name, r, z0, z1, material, rot=math.pi / 8):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=8, radius1=r, radius2=r, depth=z1 - z0)
    me = bpy.data.meshes.new(name); bm.to_mesh(me)
    o = link(bpy.data.objects.new(name, me))
    o.location = (MX, 0, (z0 + z1) / 2); o.rotation_euler.z = rot
    o.data.materials.append(material)
    return o


body = prism("maksem", R, base - 1.2, base + HT, M_STONE)
inner = prism("maksem_in", R - 0.3, base + 0.25, base + HT - 0.25, M_STONE)
inner.hide_render = True; inner.hide_viewport = True
boolean(body, inner); boolean(body, cutter)
bm = bmesh.new()
bmesh.ops.create_cone(bm, cap_ends=True, segments=8, radius1=R + 0.25, radius2=0.05, depth=1.5)
me = bpy.data.meshes.new("roof"); bm.to_mesh(me)
roof = link(bpy.data.objects.new("roof", me))
roof.location = (MX, 0, base + HT + 0.75); roof.rotation_euler.z = math.pi / 8
roof.data.materials.append(M_ROOF); boolean(roof, cutter)
# cornice band
band = prism("band", R + 0.12, base + HT - 0.15, base + HT + 0.02, M_STONE); boolean(band, cutter)
band2 = prism("band2", R - 0.29, base + HT - 0.15, base + HT + 0.05, M_STONE); boolean(band, band2)
band2.hide_render = True; band2.hide_viewport = True
basin_water = prism("basin_water", R - 0.31, base + 0.25, base + 0.85, water_mat("basin", 1.5, 0.03, "Y"))
boolean(basin_water, cutter)

# ---------------------------------------------------------------- three branches to the back
ENDS = {"galata": (-6.5, 14.5), "tophane": (3.5, 15.3), "kasimpasa": (10.5, 13.5)}
M_BRANCH = water_mat("branch", 0.8, 0.06, "Y")
for name, (ex, ey) in ENDS.items():
    pts = []
    for k in range(41):
        u = k / 40
        x = MX + (ex - MX) * (u ** 1.3); y = 1.3 + (ey - 1.3) * u
        pts.append((x, y, height(x, y) + 0.02))
    tube("br_" + name, pts, 0.17, M_BRANCH, 8)

# ---------------------------------------------------------------- town blocks, forest
M_WALL = mat("wall", hexc("efe6d6"), 0.9)
M_TILE = mat("tile", hexc("b5482f"), 0.8)
M_LEAF = mat("leaf", hexc("2f6b34"), 0.9)
M_LEAF2 = mat("leaf2", hexc("3f7f3a"), 0.9)
M_TRUNK = mat("trunk", hexc("5a3d28"), 0.9)


def house(x, y, s):
    z = height(x, y)
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1)
    me = bpy.data.meshes.new("h"); bm.to_mesh(me)
    o = link(bpy.data.objects.new("house", me))
    o.scale = (s, s * 0.8, s * 0.7); o.location = (x, y, z + s * 0.3); o.rotation_euler.z = random.uniform(-0.3, 0.3)
    o.data.materials.append(M_WALL)
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=4, radius1=s * 0.78, radius2=0.01, depth=s * 0.5)
    me = bpy.data.meshes.new("r"); bm.to_mesh(me)
    r = link(bpy.data.objects.new("hroof", me))
    r.location = (x, y, z + s * 0.65 + s * 0.25); r.rotation_euler.z = o.rotation_euler.z + math.pi / 4
    r.scale = (1, 0.8, 1); r.data.materials.append(M_TILE)


for name, (ex, ey) in ENDS.items():
    for _ in range(9):
        house(ex + random.uniform(-2.2, 2.2), min(15.4, ey + random.uniform(-2.2, 0.6)), random.uniform(0.6, 1.0))


def tree(x, y, s):
    z = height(x, y)
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=6, radius1=s * 0.12, radius2=s * 0.1, depth=s * 0.6)
    me = bpy.data.meshes.new("t"); bm.to_mesh(me)
    t = link(bpy.data.objects.new("trunk", me)); t.location = (x, y, z + s * 0.3); t.data.materials.append(M_TRUNK)
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=7, radius1=s * 0.55, radius2=0.0, depth=s * 1.6)
    me = bpy.data.meshes.new("c"); bm.to_mesh(me)
    c = link(bpy.data.objects.new("crown", me)); c.location = (x, y, z + s * 1.3)
    c.data.materials.append(random.choice([M_LEAF, M_LEAF2]))


for _ in range(95):
    tree(random.uniform(-11.6, -5.5), random.uniform(0.6, 15.6), random.uniform(0.8, 1.4))
for _ in range(14):
    x, y = random.uniform(-4, 11.5), random.uniform(3, 11)
    if abs(x - MX) > 2: tree(x, y, random.uniform(0.6, 0.9))

# ---------------------------------------------------------------- light, world
sun = bpy.data.lights.new("sun", "SUN"); sun.energy = 3.6; sun.color = (1, 0.95, 0.86); sun.angle = 0.08
so = link(bpy.data.objects.new("sun", sun)); so.rotation_euler = (math.radians(50), math.radians(8), math.radians(-35))
w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True
nt = w.node_tree; bg = nt.nodes["Background"]
tc = nt.nodes.new("ShaderNodeTexCoord"); sep = nt.nodes.new("ShaderNodeSeparateXYZ"); ramp = nt.nodes.new("ShaderNodeValToRGB")
ramp.color_ramp.elements[0].position = 0.45; ramp.color_ramp.elements[0].color = (*hexc("bfe0f7"), 1)
ramp.color_ramp.elements[1].position = 0.62; ramp.color_ramp.elements[1].color = (*hexc("2f6fc4"), 1)
nt.links.new(tc.outputs["Generated"], sep.inputs[0]); nt.links.new(sep.outputs["Z"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], bg.inputs["Color"]); bg.inputs["Strength"].default_value = 1.0

# ---------------------------------------------------------------- anchors
ANCH = {
    "forest": (-8.5, 7.0, 3.6),
    "maksem_top": (MX, 0.0, base + HT + 2.0),
    "basin": (MX, 0.4, base + 0.85),
    **{k: (x, y, height(x, y) + 2.6) for k, (x, y) in ENDS.items()},
}

# ---------------------------------------------------------------- camera shots
cam = bpy.data.cameras.new("cam"); cam.lens = 26; cam.clip_end = 300
co = link(bpy.data.objects.new("cam", cam)); sc.camera = co
look = link(bpy.data.objects.new("look", None))
tr = co.constraints.new("TRACK_TO"); tr.target = look; tr.track_axis = "TRACK_NEGATIVE_Z"; tr.up_axis = "UP_Y"

SHOTS = {  # name: (cam from, look from, cam to, look to)
    "aerial":   ((12, -18, 13), (1, 5, 1), (8.5, -14.5, 9.5), (2, 4, 1.5)),
    "pipe":     ((-15, -8.5, 3.2), (-9, 0, 0.2), (-1, -8, 4.2), (2.5, 0, 1.6)),
    "maksem":   ((7.2, -6.6, 5.8), (MX, 0.3, base + 1.4), (-0.6, -6.9, 5.2), (MX, 0.3, base + 1.3)),
    "branches": ((3, -11, 21), (3, 6.5, 0.5), (3, -7, 25), (3, 7.5, 0.5)),
    "split":    ((MX + 0.5, -3.6, base + 4.6), (MX, 0.7, base + 0.7), (MX - 0.3, -2.7, base + 3.6), (MX, 0.7, base + 0.6)),
    "rise":     ((-6, -14, 8), (2, 4, 1.5), (-11, -17, 14), (1, 5, 1)),
}
beats = TL["beats"]
DUR = TL["duration"]
NF = int(math.ceil(DUR * FPS))
# merge consecutive beats with the same shot into one span
spans = []
for b in beats:
    s = b.get("shot") or (spans[-1]["shot"] if spans else "aerial")
    if spans and spans[-1]["shot"] == s:
        spans[-1]["end"] = b["end"]
    else:
        spans.append({"shot": s, "start": b["start"], "end": b["end"]})
spans[0]["start"] = 0; spans[-1]["end"] = DUR


def key(obj, frame, loc, interp):
    obj.location = loc; obj.keyframe_insert("location", frame=frame)
    for fc in (obj.animation_data.action.fcurves if hasattr(obj.animation_data.action, "fcurves") else []):
        for kp in fc.keyframe_points:
            if kp.co.x == frame: kp.interpolation = interp


for sp in spans:
    cf, lf, ct, lt = SHOTS[sp["shot"]]
    f0 = int(round(sp["start"] * FPS)) + 1; f1 = max(f0 + 1, int(round(sp["end"] * FPS)))
    key(co, f0, cf, "SINE"); key(look, f0, lf, "SINE")
    key(co, f1, ct, "CONSTANT"); key(look, f1, lt, "CONSTANT")

# ---------------------------------------------------------------- render settings
eng = [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items]
sc.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in eng else "BLENDER_EEVEE"
try:
    sc.eevee.taa_render_samples = 24
except Exception:
    pass
for attr in ("use_shadows", "use_raytracing"):
    if hasattr(sc.eevee, attr): setattr(sc.eevee, attr, True)
sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = W, H, 100
sc.render.fps = FPS
sc.frame_start, sc.frame_end = 1, NF
sc.view_settings.view_transform = "AgX" if "AgX" in [i.identifier for i in sc.view_settings.bl_rna.properties["view_transform"].enum_items] else "Filmic"
sc.view_settings.look = "None"
sc.render.image_settings.file_format = "JPEG"; sc.render.image_settings.quality = 92
os.makedirs(os.path.join(OUT, "frames"), exist_ok=True)

# anchors per frame
dg = bpy.context.evaluated_depsgraph_get()
frames = {k: [] for k in ANCH}
for f in range(1, NF + 1):
    sc.frame_set(f)
    for k, p in ANCH.items():
        v = world_to_camera_view(sc, co, Vector(p))
        frames[k].append([round(v.x * W, 1), round((1 - v.y) * H, 1), 1 if v.z > 0 else 0])
json.dump({"fps": FPS, "frames": frames}, open(os.path.join(OUT, "anchors.json"), "w"))

if STILLS:
    for s in STILLS:
        sc.frame_set(int(round(s * FPS)) + 1)
        sc.render.filepath = os.path.join(OUT, f"still_{s:05.2f}.jpg")
        bpy.ops.render.render(write_still=True)
else:
    sc.render.filepath = os.path.join(OUT, "frames", "f_")
    bpy.ops.render.render(animation=True)
print("DONE", NF, "frames")
