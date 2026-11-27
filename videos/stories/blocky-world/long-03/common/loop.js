// Long 3 · LOOP_POSE: the first shot and the last shot of the film (one shared pose object).
// Inside the shop, camera LOW 2.5 m in front of Toast looking up: only ceiling + lamp behind.
import * as THREE from "three";
import { zubbit, carabiner } from "./l3.js";
export const LP = { toast: [1.6, 0, 1.8], dino: [1.6, 0.1, -0.7] };
export const LOOP_CAM = { pos: [3.6, 0.8, 5.0], look: [1.5, 2.4, 0.4], fov: 54 };
export const LOOP_LIGHT = ["interior", "night", 0.12];
export function loopProps(E) {
  const R = {};
  R.lamp = E.group(null, [1.4, 6.2, 0.6]); E.cyl(0.02, 0.02, 1.4, E.mat("#23232e"), [0, -1.4, 0], { parent: R.lamp, seg: 6 }); E.cone(0.55, 0.45, E.mat("#ff7fb8"), [0, -1.85, 0], { parent: R.lamp, seg: 16 }); E.sphere(0.16, E.flat("#fffbe0"), [0, -1.82, 0], { parent: R.lamp });
  R.car = carabiner(E, 0.9); R.gold = zubbit(E, "gold");
  R.stitch = [0, 1, 2].map(() => E.box(0.05, 0.02, 0.02, E.mat("#ffffff"), [0, -50, 0], { center: true, noShadow: true }));
  return R;
}
/** apply LOOP_POSE. k = 0 at the frozen frame; strap = 1 (stretched) */
export function loopPose(E, R, L, T, TX, D, DX) {
  T.pose({ pos: LP.toast, yaw: 0, pitch: -0.7, face: "shock", armL: [-1.45, 0.25], elbowL: 0.2, armR: [-1.45, -0.25], elbowR: 0.2, legL: -0.25, legR: -0.25, head: [0.55, 0, 0], eyePop: 0.9, headScale: 1 });
  TX.goldHands(true); TX.pack.visible = true; TX.straps.forEach((s) => { s.scale.set(0.45, 1.25, 0.6); });
  D.pose({ pos: LP.dino, yaw: 0, pitch: 0.5, jaw: 0.75, look: [0, 0.6], legL: 0.3, legR: -0.2, tailY: 0.3, head: [-0.25, 0, 0], armUp: 0.6 }); DX.hand.visible = true;
  T.root.updateMatrixWorld(true); D.root.updateMatrixWorld(true);
  const a = new THREE.Vector3(); TX.loop.getWorldPosition(a); const b = new THREE.Vector3(); DX.ringPt.getWorldPosition(b);
  const d = b.clone().sub(a), Lh = d.length(); L.car.position.copy(a); L.car.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), d.normalize()); L.car.scale.set(0.8, Lh / 0.9, 0.8); L.car.visible = true;
  L.gold.position.copy(b); L.gold.rotation.set(0, 0, 0); L.gold.scale.setScalar(1.4); L.gold.visible = true;
  return { strapTop: a };
}
