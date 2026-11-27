// Thumbnail for "I Waited 13 Years for This Game" 1280x720
import * as THREE from "three";
import { makeToast } from "./blocky/rig.js";
import { textO } from "./common/ui.js";
import { home, makeBread, gameCase, moth } from "./common/l4.js";
export const meta = { fps: 30, w: 1280, h: 720, captions: false, tail: 0, frames: 1 };
const R = {};
export async function build(E) { Object.assign(R, home(E)); R.T = makeToast(E); R.B = makeBread(E, 0); R.case = gameCase(E); R.m = moth(E); R.setPoster("OUT NOW"); }
export function frame(f, E) {
  const { T, B } = R;
  T.pose({ pos: [1.5, 0, 1.6], yaw: -0.25, face: "shock", eyePop: 1, armL: [-1.5, 0.3], elbowL: 0.4, armR: [-1.5, -0.3], elbowR: 0.4, head: [-0.1, 0, 0] }); R.shop.clock(" ", "");
  B.pose({ pos: [-1.2, 0, -0.2], yaw: 0.3, face: "happy", armL: [-0.3, 0.3], armR: [-2.4, -0.3] });
  T.root.updateMatrixWorld(true); const a = new THREE.Vector3(), b = new THREE.Vector3(); T.elbows[0].localToWorld(a.set(0, -0.45, 0)); T.elbows[1].localToWorld(b.set(0, -0.45, 0)); const m = a.add(b).multiplyScalar(0.5);
  R.case.set([m.x - 0.55, m.y + 0.0, m.z + 0.4], [Math.PI / 2 + 0.55, -0.35, 0], 0.9, 1.15); R.m.at([m.x - 0.7, m.y + 0.9, m.z + 0.9], 3); R.m.g.scale.setScalar(4); R.m.g.rotation.set(Math.PI / 2 - 0.3, 0.3, 0.4);
  R.screenLight.color.set("#fff2d8"); R.screenLight.position.set(0.4, 2.6, 4.0); R.screenLight.distance = 14; R.screenLight.intensity = 9;
  const ov = (g, w, h) => {
    textO("13 YEARS.", 560, 190, 200, { col: "#ffe14a", rot: -0.05 })(g, w, h);
    textO("NO DISC.", 600, 420, 200, { col: "#ff4d4d", rot: -0.05 })(g, w, h);
    const k = h / 1080; g.save(); g.translate(640 * k, 600 * k); g.rotate(-0.08); g.fillStyle = "#ffffff"; g.strokeStyle = "#221a26"; g.lineWidth = 8 * k; g.beginPath(); g.roundRect(-110 * k, -50 * k, 220 * k, 100 * k, 16 * k); g.fill(); g.stroke(); g.restore(); textO("2013", 640, 602, 74, { col: "#221a26", stroke: "#ffffff", rot: -0.08 })(g, w, h);
  };
  return { cam: { pos: [0.4, 2.1, 7.4], look: [-0.2, 2.0, 0], fov: 44 }, light: "interior", dof: { focus: [1.1, 1.8, 1.2], amount: 0.6 }, grade: { uSat: 1.25, uCon: 1.08 }, actors: [], fx: [], caption: false, focusPt: [0.5, 1.6, 0.5], overlay: ov };
}
