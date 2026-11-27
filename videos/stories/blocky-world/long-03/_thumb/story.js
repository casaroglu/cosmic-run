// Thumbnail for "I Queued All Night for a $9,999 Mystery Box" 1280x720 — the loop pose, bright
import * as THREE from "three";
import { makeToast, makeDonutsaurus } from "./blocky/rig.js";
import { block } from "./common/block.js";
import { zubbit, toastExtras, dinoExtras } from "./common/l3.js";
import { loopProps, loopPose } from "./common/loop.js";
import { textO } from "./common/ui.js";
export const meta = { fps: 30, w: 1280, h: 720, captions: false, tail: 0, frames: 1 };
let R = {};
export async function build(E) { R.B = block(E); R.T = makeToast(E); R.TX = toastExtras(E, R.T); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D); R.L = loopProps(E); R.z = zubbit(E, "grey"); R.B.board(0); }
export function frame(f, E) {
  loopPose(E, R, R.L, R.T, R.TX, R.D, R.DX); R.T.pose({ pos: [1.6, 0, 1.8], yaw: -0.35, pitch: -0.75, face: "shock", armL: [-1.6, 0.5], elbowL: 0.2, armR: [-1.6, -0.5], elbowR: 0.2, legL: -0.3, legR: -0.3, head: [0.5, 0, 0], eyePop: 1 });
  loopPose(E, R, R.L, R.T, R.TX, R.D, R.DX); R.T.pose({ pos: [1.6, 0, 1.8], yaw: -0.35, pitch: -0.75, face: "shock", armL: [-1.6, 0.5], elbowL: 0.2, armR: [-1.6, -0.5], elbowR: 0.2, legL: -0.3, legR: -0.3, head: [0.5, 0, 0], eyePop: 1 });
  R.z.position.set(2.9, 1.0, 1.5); R.z.scale.setScalar(1.2); R.z.rotation.set(0, -0.6, 0); R.z.scale.setScalar(1.0);
  const ov = (g, w, h) => { textO("WORLD'S BIGGEST", 600, 140, 108, { col: "#ffffff", rot: -0.05 })(g, w, h); textO("BAG CHARM", 600, 300, 160, { col: "#ffe14a", rot: -0.05 })(g, w, h); textO("← actual size", 1720, 880, 50, { col: "#ffffff" })(g, w, h); };
  return { cam: { pos: [2.6, 1.7, 6.0], look: [0.6, 2.0, 0.8], fov: 46 }, light: ["day", "interior", 0.5], grade: { uSat: 1.25 }, dof: { focus: 6, amount: 0 }, actors: [], fx: [], caption: false, focusPt: [1.6, 1.5, 1], overlay: ov };
}
