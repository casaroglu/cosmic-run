"""Generic 3D props for the collage map, rendered grey on transparent so stills.py can halftone + scissor-cut them.
No real product is copied: the 'machine' is a generic lithography-tool silhouette (long cabinet, light-source tower, pipes).
usage: blender -b -P blender_props.py -- <outdir>   -> machine_<deg>.png, container_<deg>.png"""
import bpy, math, sys, os
from mathutils import Vector

OUT = sys.argv[sys.argv.index('--') + 1]
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene

def mat(name, v, rough=0.6):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = (v, v, v, 1); b.inputs['Roughness'].default_value = rough
    return m
LIGHT, MID, DARK, BLACK = mat('light', 0.78), mat('mid', 0.45), mat('dark', 0.16), mat('black', 0.03, 0.4)

def box(name, loc, size, m, parent, bevel=0.03):
    bpy.ops.mesh.primitive_cube_add(location=loc); o = bpy.context.object; o.name = name
    o.scale = (size[0] / 2, size[1] / 2, size[2] / 2); bpy.ops.object.transform_apply(scale=True)
    if bevel:
        bv = o.modifiers.new('bv', 'BEVEL'); bv.width = bevel; bv.segments = 3
    o.data.materials.append(m); o.parent = parent; return o

def cyl(name, loc, r, depth, m, parent, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, location=loc, rotation=rot, vertices=48); o = bpy.context.object
    o.data.materials.append(m); o.parent = parent; bpy.ops.object.shade_smooth(); return o

def empty(name):
    bpy.ops.object.empty_add(location=(0, 0, 0)); e = bpy.context.object; e.name = name; return e

# ---- the machine (about 6 x 2.4 x 2.2 units) ----
M = empty('machine')
box('body', (0, 0, 1.0), (4.2, 2.2, 2.0), LIGHT, M, 0.06)
box('roof', (0, 0, 2.05), (4.0, 2.0, 0.12), MID, M, 0.03)
for i, x in enumerate((-1.45, -0.5, 0.45, 1.4)):          # door panels with seams and vents
    box(f'panel{i}', (x, -1.11, 1.0), (0.86, 0.04, 1.7), LIGHT, M, 0.015)
    for k in range(5): box(f'vent{i}{k}', (x, -1.14, 1.55 - k * 0.08), (0.5, 0.02, 0.03), DARK, M, 0)
box('screen', (1.4, -1.15, 0.95), (0.5, 0.03, 0.32), BLACK, M, 0.01)
box('source', (-2.9, 0.2, 1.35), (1.4, 1.8, 2.7), MID, M, 0.06)     # light-source tower
box('sourcecap', (-2.9, 0.2, 2.75), (1.2, 1.6, 0.14), DARK, M, 0.03)
for k in range(3): box(f'band{k}', (-2.9, -0.71, 0.6 + k * 0.7), (1.42, 0.02, 0.06), DARK, M, 0)
for j, z in enumerate((1.6, 1.9)):                               # pipes from tower to body
    cyl(f'pipe{j}', (-2.1, 0.75, z), 0.09, 0.9, DARK, M, (0, math.pi / 2, 0))
box('handler', (2.75, -0.2, 0.6), (1.2, 1.4, 1.2), MID, M, 0.05)   # wafer handler
cyl('port', (2.75, -0.92, 0.72), 0.32, 0.06, LIGHT, M, (math.pi / 2, 0, 0))
cyl('portin', (2.75, -0.95, 0.72), 0.2, 0.04, DARK, M, (math.pi / 2, 0, 0))
box('base', (0, 0, 0.05), (6.6, 2.5, 0.1), DARK, M, 0.02)

# ---- a shipping container (6 x 2.4 x 2.6) ----
C = empty('container')
box('cbody', (0, 0, 1.3), (6.0, 2.4, 2.6), MID, C, 0.04)
for i in range(22):
    x = -2.75 + i * 0.262
    box(f'rib{i}', (x, -1.22, 1.3), (0.1, 0.06, 2.4), LIGHT, C, 0.01)
    box(f'ribb{i}', (x, 1.22, 1.3), (0.1, 0.06, 2.4), LIGHT, C, 0.01)
box('cframe', (0, 0, 2.6), (6.1, 2.5, 0.12), DARK, C, 0.02); box('cframeb', (0, 0, 0.06), (6.1, 2.5, 0.12), DARK, C, 0.02)
for k in range(4): box(f'bar{k}', (3.02, -0.9 + k * 0.6, 1.3), (0.04, 0.06, 2.3), DARK, C, 0)

# ---- light, camera, render ----
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(50), math.radians(-25), math.radians(-35))); bpy.context.object.data.energy = 4.0
bpy.ops.object.light_add(type='AREA', location=(4, -6, 5)); f = bpy.context.object; f.data.energy = 600; f.data.size = 6
f.rotation_euler = (Vector((0, 0, 1)) - f.location).to_track_quat('-Z', 'Y').to_euler()
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.35
bpy.ops.object.camera_add(location=(8.5, -12, 7.5)); cam = bpy.context.object; sc.camera = cam
cam.data.type = 'ORTHO'
cam.rotation_euler = (Vector((0, 0, 1.0)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
sc.render.engine = 'CYCLES'; sc.cycles.samples = 48; sc.cycles.use_denoising = True
try:
    bpy.context.preferences.addons['cycles'].preferences.compute_device_type = 'METAL'; sc.cycles.device = 'GPU'
except Exception: pass
sc.render.film_transparent = True; sc.render.resolution_x, sc.render.resolution_y = 800, 560
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
sc.view_settings.view_transform = 'Standard'

for obj, other, scale in ((M, C, 8.6), (C, M, 8.2)):
    other.location.z = -100; obj.location.z = 0; cam.data.ortho_scale = scale
    for deg in range(-60, 61, 15):
        obj.rotation_euler = (0, 0, math.radians(deg))
        sc.render.filepath = os.path.join(OUT, f'{obj.name}_{deg:+04d}.png'); bpy.ops.render.render(write_still=True)
    obj.location.z = -100
print('done')
