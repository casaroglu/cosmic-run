// Thumbnail for "We Joined the WRONG Servers" 1280x720
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { lordMitten } from "./common/props.js";
import { solid, unclip } from "./common/staging.js";
import { capeCity } from "./common/worlds.js";
import { textO } from "./common/ui.js";
export const meta = { fps: 30, w: 1280, h: 720, captions: false, tail: 0, frames: 1 };
let R = {};
export async function build(E) { R.w = capeCity(E, 600, 0); R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = solid(makeDonutsaurus(E)); R.M = solid(lordMitten(E)); }
export function frame(f, E) {
  const { T, P, D, M } = R;
  T.pose({ pos: [601.0, 0, 2.2], yaw: -0.25, face: "shock", eyePop: 1, armL: [-2.6, 0.5], armR: [-2.6, -0.5], elbowL: 0.9, elbowR: 0.9 });
  P.pose({ pos: [602.7, 0.17, 2.0], yaw: -0.5, face: "scared", armR: [-1.4, 0.2], elbowR: 0.6, head: [0, 0.2, 0] });
  P.boardAt([602.7, 0, 2.0], Math.PI / 2 - 0.5, 0, 0, true);
  D.pose({ pos: [597.4, 0, 0.6], yaw: 0.5, jaw: 0.9, armUp: 1.4, look: [0.5, 0.2] });
  M.pose({ pos: [600.6, 0, -3.2], yaw: 0.1, face: "angry", lean: 0.35, armR: [-2.8, 0.3], armL: [-2.2, -0.4], elbowL: 0.5 }); M.root.scale.setScalar(3);
  unclip([T, P, D]);
  const ov = (g, w, h) => {
    textO("WRONG", 400, 170, 170, { col: "#ff4d4d", rot: -0.06 })(g, w, h);
    textO("SERVERS!", 450, 330, 140, { col: "#ffe14a", rot: -0.06 })(g, w, h);
  };
  return { cam: { pos: [600.2, 2.0, 8.8], look: [600.6, 2.6, 0], fov: 50 }, light: ["dramatic", "night", 0.25], dof: { focus: 7, amount: 0 }, actors: [], fx: [], caption: false, focusPt: [601, 1.5, 2], overlay: ov };
}
