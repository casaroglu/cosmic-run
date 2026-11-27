// Long 3 · the shop front with the line (used by scenes 2b and 4). Camera on the street (z < -9) looks at the shop (+z).
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "../blocky/rig.js";
import { solid } from "./staging.js";
import { hero, adminHand } from "./props.js";
import { block, lineProps } from "./block.js";
import { zubbit, toastExtras, dinoExtras, person, clipZ, chair, knitBag, tent, mysteryBox, carabiner } from "./l3.js";
export const PI = Math.PI;
export const GR = [4.3, 0, -6.5], TQ = [5.9, 0, -6.9], DQ = [7.5, 0, -6.2], DOORP = [5.6, 0, -5.0];
export const LX = [3.1, 2.2, 1.3, 0.3, -0.7, -1.7, -2.7, -3.7, -4.7, -5.7, -6.7, -7.6];
export const LYAW = PI / 2 + 0.55;
export function street(E, o = {}) {
  const R = {};
  R.B = block(E); R.L = lineProps(E); R.L.disp.visible = false;
  R.T = solid(makeToast(E)); R.TX = toastExtras(E, R.T); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D); R.A = adminHand(E);
  R.G = hero(E, "gran"); R.chair = chair(E, null, [GR[0], 0, GR[2] + 0.2], "#3f8ad8"); R.chair.rotation.y = PI; R.kbag = knitBag(E, null, [GR[0] - 0.6, 0, GR[2] - 0.1]);
  R.line = LX.map((x, i) => { const k = person(E, i + 40, { kid: i % 5 === 2 }); k.z = clipZ(E, k); k.z.visible = i % 2 === 0; k.sit = i % 3 === 1; if (k.sit) { k.ch = chair(E, null, [x, 0, -6.7], ["#57c84d", "#ff8a1f", "#3f8ad8"][i % 3]); k.ch.rotation.y = LYAW; } return k; });
  R.tents = [tent(E, [-0.6, 0, -8.6], "#57c84d", 0.1), tent(E, [-4.6, 0, -8.6], "#ff8a1f", -0.15), tent(E, [-8.2, 0, -8.4], "#4ac8c8", 0.2)];
  R.dtent = tent(E, [10.4, 0, -6.9], "#ff4fa3", PI / 2 + 0.2 + 0, 0.9); R.dtent.rotation.z = 1.3;
  return R;
}
/** default line poses: sitters + standers along the rope, all facing the door, turned a little to camera */
export function poseLine(R, f, o = {}) {
  R.line.forEach((k, i) => { const x = LX[i]; const face = o.face ? o.face(i) : "happy";
    if (k.sit) k.pose({ pos: [x, 0.08, -6.62], yaw: LYAW, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, face, head: [0, Math.sin(f * 0.02 + i) * 0.3, 0] });
    else k.pose({ pos: [x, 0, -6.6], yaw: LYAW - 0.2 + 0.25 * Math.sin(i), face, head: [0, 0.2 * Math.sin(f * 0.03 + i), 0] });
    k.root.scale.setScalar(k.base); if (o.allZ) k.z.visible = true; });
}
export function poseGran(R, f, say, extra = {}) { R.G.pose({ pos: [GR[0], 0.42, GR[2]], yaw: PI - 0.25, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [-1.1, 0.2], elbowL: 0.9 + 0.15 * Math.sin(f * 0.5), armR: [-1.1, -0.2], elbowR: 0.9 - 0.15 * Math.sin(f * 0.5), face: say("gran", "smug"), head: [0.25, 0, 0], ...extra }); R.G.root.scale.setScalar(0.78); }
