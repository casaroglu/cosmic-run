// ToastBlox channel banner 2560x1440 (safe strip ~1546x423 in the middle)
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { adminHand } from "./common/props.js";
import { solid, unclip } from "./common/staging.js";
import { cubelands } from "./common/worlds.js";
import { textO } from "./common/ui.js";
export const meta = { fps: 30, w: 2560, h: 1440, captions: false, tail: 0, frames: 1 };
let R = {};
const SAFE = false;
export async function build(E) {
  R.w = cubelands(E, 200, 0); R.w.setDay(0);
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = solid(makeDonutsaurus(E)); R.A = adminHand(E);
}
export function frame(f, E) {
  const { T, P, D, A } = R;
  P.pose({ pos: [201.0, 0.17, 2.3], yaw: 0.25, face: "smug", armL: [-0.3, 0.5], armR: [-2.7, 0.3], elbowR: 0.4 });
  P.boardAt([201.0, 0, 2.3], Math.PI / 2 + 0.25, 0, 0, true);
  T.pose({ pos: [202.6, 0, 2.6], yaw: -0.15, face: "happy", armR: [-2.9, -0.2], elbowR: 0.3, armL: [-0.4, 0.3], head: [0, -0.1, 0.08] });
  D.pose({ pos: [204.6, 0, 1.6], yaw: -0.45, jaw: 0.7, armUp: 1.2, tail: 0.6, look: [-0.4, 0.2] });
  unclip([T, P, D], { gap: 0.25 });
  A.pose({ pos: [205.6, 7.4, 0.6], palmUp: 0 });
  const ov = (g, w, h) => {
    textO("TOAST", 640, 478, 135, { col: "#ffe14a" })(g, w, h);
    textO("BLOX", 640, 605, 135, { col: "#ff5a4d" })(g, w, h);
    if (SAFE) { const k = h / 1080; g.strokeStyle = "#ff00ff"; g.lineWidth = 4; g.strokeRect((w - 1546) / 2, (h - 423) / 2, 1546, 423); }
  };
  return { cam: { pos: [200.2, 2.2, 14.5], look: [200.2, 1.65, 2], fov: 56 }, light: "day", dof: { focus: 12, amount: 0 }, actors: [], fx: [], caption: false, focusPt: [202, 1.2, 2], overlay: ov };
}
