// ToastBlox profile picture 800x800: Toast seen from the side (3/4 profile), head and shoulders
import * as THREE from "three";
import { makeToast } from "./blocky/rig.js";
import { cubelands } from "./common/worlds.js";
export const meta = { fps: 30, w: 800, h: 800, captions: false, tail: 0, frames: 1 };
let R = {};
export async function build(E) { R.w = cubelands(E, 200, 0); R.w.setDay(0); R.T = makeToast(E); }
export function frame(f, E) {
  R.T.pose({ pos: [200, 0, 2], yaw: 0.02, face: "happy", head: [0.06, 0.05, 0.05], armR: [-0.3, 0.1], armL: [-0.2, 0.1] });
  return { cam: { pos: [202.6, 2.15, 4.2], look: [200.1, 1.9, 2.1], fov: 38 }, light: "day", dof: { focus: 3, amount: 0 }, actors: [], fx: [], caption: false, focusPt: [200, 1.9, 2], overlay: () => {} };
}
