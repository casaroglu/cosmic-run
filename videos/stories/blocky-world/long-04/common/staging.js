// Staging guard: keeps characters from walking into each other.
// solid(rig) right after creating a rig measures its rest footprint (scale 1, yaw 0).
// unclip(rigs) after all pose() calls in a frame pushes overlapping, visible, grounded
// rigs apart on the floor (x/z) so no two centres are closer than rA + rB + gap.
import * as THREE from "three";

const box = new THREE.Box3(), v = new THREE.Vector3();

export function solid(rig, radius) {
  if (radius == null) {
    const r = rig.root, p = r.position.clone(), q = r.rotation.clone(), s = r.scale.clone(), vis = r.visible;
    r.position.set(0, 0, 0); r.rotation.set(0, 0, 0); r.scale.set(1, 1, 1); r.visible = true; r.updateMatrixWorld(true);
    box.setFromObject(r); box.getSize(v);
    radius = Math.max(v.x, v.z) / 2 * 0.9;
    r.position.copy(p); r.rotation.copy(q); r.scale.copy(s); r.visible = vis; r.updateMatrixWorld(true);
  }
  rig.solidR = radius; return rig;
}

// move a rig and anything riding with it (Pixi's board when it sits under her)
function shift(r, x, z) {
  const p = r.root.position, b = r.board;
  if (b && b.visible && Math.hypot(b.position.x - p.x, b.position.z - p.z) < 0.6) { b.position.x += x; b.position.z += z; }
  p.x += x; p.z += z;
}

/** opts: {gap = 0.15, pinned: [rigs that must not move], skip: [rigs to ignore this frame], iters = 4} */
export function unclip(rigs, opts = {}) {
  const gap = opts.gap ?? 0.15, pinned = new Set(opts.pinned || []), skip = new Set(opts.skip || []);
  const live = rigs.filter((r) => r && r.solidR && r.root.visible && !skip.has(r) && r.root.position.y < 0.8);
  for (let it = 0; it < (opts.iters || 4); it++) {
    let moved = false;
    for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
      const a = live[i], b = live[j], pa = a.root.position, pb = b.root.position;
      const need = a.solidR * a.root.scale.x + b.solidR * b.root.scale.x + gap;
      let dx = pb.x - pa.x, dz = pb.z - pa.z, d = Math.hypot(dx, dz);
      if (d >= need) continue;
      if (d < 1e-4) { dx = 1; dz = 0; d = 1e-4; } else { dx /= d; dz /= d; }
      const over = need - d, pA = pinned.has(a), pB = pinned.has(b);
      if (pA && pB) continue;
      const ka = pA ? 0 : pB ? 1 : 0.5, kb = 1 - ka;
      shift(a, -dx * over * ka, -dz * over * ka); shift(b, dx * over * kb, dz * over * kb); moved = true;
    }
    if (!moved) break;
  }
}
