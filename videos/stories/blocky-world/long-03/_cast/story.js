// Long 3 · cast & sets preview (one still per frame)
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { hero, adminHand } from "./common/props.js";
import { block, lineProps, alley, topBlock, MACH } from "./common/block.js";
import { zubbit, tag, mysteryBox, carabiner, toastExtras, dinoExtras, makeFlip, person, clipZ, chair, knitBag, tent, dog, pigeon, sack, phoneRig, turkeyPlate, turkeyDonut } from "./common/l3.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0, frames: 12 };
let R = {};
export async function build(E) {
  R.B = block(E); R.L = lineProps(E); R.A = alley(E); R.TB = topBlock(E);
  R.T = makeToast(E); R.TX = toastExtras(E, R.T); R.P = makePixi(E); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D); R.F = makeFlip(E); R.G = hero(E, "gran");
  R.ppl = []; for (let i = 0; i < 8; i++) { const k = person(E, i, { kid: i % 3 === 2 }); clipZ(E, k); R.ppl.push(k); }
  R.z = [zubbit(E, "grey"), zubbit(E, "gold"), zubbit(E, "fake")]; tag(E, R.z[2], ["$9,999", "$7"], "ZUBBLT");
  R.box = mysteryBox(E); R.car = carabiner(E, 1.0); R.dog = dog(E); R.pig = pigeon(E); R.sack = sack(E); R.ph = phoneRig(E);
  R.F.slots.forEach((s, i) => { const z = zubbit(E, i === 5 ? "fake" : "grey", { parent: s }); z.position.set(0, 0, 0); z.scale.setScalar(1.2); });
  chair(E, null, [3.6, 0, -6.4], "#3f8ad8"); tent(E, [-4, 0, -7.4], "#57c84d", 0.2); tent(E, [-0.5, 0, -7.6], "#ff8a1f", -0.1);
}
export function frame(f, E) {
  const { T, P, D, F, G } = R; let cam;
  R.ppl.forEach((k, i) => { k.pose({ pos: [3.0 - i * 1.25, 0, -6.6], yaw: Math.PI / 2, face: "happy" }); k.root.scale.setScalar(k.base); });
  G.pose({ pos: [4.0, 0, -6.3], yaw: Math.PI / 2 + 0.6, face: "smug" }); G.root.scale.setScalar(0.78);
  T.pose({ pos: [0.8, 0, 0.6], yaw: 0.2, face: "grin" }); P.pose({ pos: [-1.2, 0, 0.8], yaw: 0.3, face: "deadpan" }); P.boardAt([-1.2, 0, 0.8], 0, 0, 0, false);
  D.pose({ pos: [3.2, 0, 0.4], yaw: -0.4 }); F.pose({ pos: [-3.5, 0, 0.4], yaw: 0.3, open: 0 });
  R.z.forEach((z, i) => { z.position.set(-0.6 + i * 0.6, 1.9, 2.0); z.scale.setScalar(1.8); });
  R.box.position.set(0, 1.3, -1.6); R.car.position.set(2.0, 2.0, 1.6); R.dog.position.set(-6, 0, -7); R.pig.position.set(1.0, 0.95, -5.6);
  TX(f);
  switch (f) {
    case 0: cam = { pos: [0.3, 2.6, 9.0], look: [0.8, 2.6, -3], fov: 55 }; break;
    case 1: cam = { pos: [2.5, 3.2, -16], look: [1.5, 2.6, -5], fov: 55 }; break;
    case 2: cam = { pos: [6.5, 2.2, -12], look: [1.0, 1.6, -6.4], fov: 46 }; break;
    case 3: F.pose({ pos: [-3.5, 0, 0.4], yaw: 0.2, open: 1, heart: 0 }); cam = { pos: [-3.0, 2.4, 4.6], look: [-3.5, 2.0, 0.4], fov: 46 }; break;
    case 4: F.pose({ pos: [-3.5, 0, 0.4], yaw: 0.2, open: 0, heart: 1 }); cam = { pos: [-2.6, 2.6, 5.6], look: [-3.3, 2.2, 0.4], fov: 46 }; break;
    case 5: cam = { pos: [0, 2.0, 3.6], look: [0, 1.9, 2.0], fov: 40 }; break;
    case 6: cam = { pos: [-200, 2.4, 5], look: [-200, 2.4, -6], fov: 52 }; break;
    case 7: cam = { pos: [300.01, 60, 0.01], look: [300, 0, 0], fov: 50 }; break;
    case 8: cam = { pos: [MACH[0] - 2.4, 2.4, 0.4], look: [MACH[0], 2.6, -4.6], fov: 50 }; break;
    case 9: cam = { pos: [2.3, 4.2, 0.5], look: [2.6, 4.2, -5], fov: 44 }; break;
    case 10: R.TX.pack.visible = true; R.DX.hand.visible = true; R.TX.goldHands(true); T.pose({ pos: [0.8, 0, 0.6], yaw: Math.PI + 0.3, face: "grin" }); cam = { pos: [2.6, 3.0, 4.0], look: [1.6, 1.6, 0.4], fov: 50 }; break;
    case 11: cam = { pos: [-3, 1.5, -9], look: [-1.0, 1.4, -5], fov: 55 }; break;
  }
  return { cam, light: f === 6 ? "night" : f === 1 || f === 2 || f === 7 || f === 11 ? "night" : ["interior", "night", 0.12], dof: { focus: 6, amount: 0 }, actors: [], fx: [], caption: false, focusPt: cam.look };
}
const TX = () => {};
