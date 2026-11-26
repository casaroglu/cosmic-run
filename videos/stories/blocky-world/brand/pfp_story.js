// ToastBlox profile picture 800x800: Toast seen from the side (3/4 profile), head and shoulders
import * as THREE from "three";
import { makeToast } from "./blocky/rig.js";
import { cubelands } from "./common/worlds.js";
export const meta = { fps: 30, w: 800, h: 800, captions: false, tail: 0, frames: 1 };
let R = {};
export async function build(E) { R.w = cubelands(E, 200, 0); R.w.setDay(0); R.T = makeToast(E); }
export function frame(f, E) {
  R.T.pose({ pos: [200, 0, 2], yaw: 0, face: "happy", head: [0, 0, 0] });
  return { cam: { pos: [200, 1.83, 4.45], look: [200, 1.83, 2], fov: 30 }, light: "day", dof: { focus: 3, amount: 0 }, actors: [], fx: [], caption: false, focusPt: [200, 1.9, 2], overlay: () => {} };
}
