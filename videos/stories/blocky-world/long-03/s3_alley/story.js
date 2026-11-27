// Long 3 · Scene 3 — 1 AM: friend price (11 shots). The alley set lives at x0 = -200.
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { alley } from "./common/block.js";
import { zubbit, tag, mysteryBox, toastExtras, dinoExtras, makeFlip, coin } from "./common/l3.js";
import { load, ctx, hud, subs, textO, atPt } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {};
const PI = Math.PI, x0 = -200, FP = [x0 + 0.4, 0, -4.6], TP = [x0 + 0.1, 0, -1.7], PP0 = [x0 - 1.5, 0.17, -1.0], PP1 = [x0 - 0.9, 0.17, -3.0], DP = [x0 + 2.1, 0, -0.9];
export async function build(E) {
  D = await load(meta);
  R.AL = alley(E, x0);
  R.T = solid(makeToast(E)); R.TX = toastExtras(E, R.T); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D); R.F = makeFlip(E);
  R.slotZ = R.F.slots.map((s, i) => { const z = zubbit(E, i === 5 ? "fake" : "grey", { parent: s }); z.position.set(0, 0, 0); z.scale.setScalar(1.15); if (i !== 5) tag(E, z, "$" + [60, 85, 99, 45, 70, 0, 120, 55, 80, 65, 95, 75][i], "ZUBBLT", { pos: [0.18, -0.1, 0.17] }); z.userData.hornOff = i % 2 === 0; return z; });
  R.fake = R.slotZ[5]; R.ftag = tag(E, R.fake, ["$9,999", "$7"], "ZUBBLT", { pos: [0.2, -0.1, 0.19], s: 1.3 });
  R.hz = zubbit(E, "grey", { parent: R.TX.string }); R.hz.position.set(0, 0, 0); R.hz.scale.setScalar(0.9);
  R.flipGrey = zubbit(E, "grey", { parent: R.F.slots[11] }); R.flipGrey.position.set(0, 0, 0); R.flipGrey.scale.setScalar(1.15); R.flipGrey.visible = false; tag(E, R.flipGrey, "$40", "ZUBBIT", { pos: [0.18, -0.1, 0.17] });
  R.slotZ[11].visible = false;
  R.box = mysteryBox(E);
  R.coins = []; for (let i = 0; i < 7; i++) R.coins.push(coin(E, null, [0, -50, 0], 1.0));
}
export function frame(f0, E) {
  const C = ctx(f0, E, D), { X, n, fs, S, Eo, sp, pop, say, t } = C, f = f0, OV = [], FX = [];
  const { T, P, F, TX, DX, AL } = R, Dn = R.D;
  let cam, light = ["night", "dramatic", 0.4], shk = null, hudOn = true;
  const fake = R.fake.userData;
  // ---- state over time ----
  const paid = n > 8 || (n === 8 && fs > 30), swapped = n > 8 || (n === 8 && fs > 75);
  const held = n >= 8 && fs > 30 || n > 8; // fake in Toast's hands
  R.hz.visible = !swapped && !(n === 8 && fs > 50); R.flipGrey.visible = swapped;
  const sq = n === 10 ? sp(S(10) + 20, S(10) + 50) : n > 10 ? 1 : 0; fake.paint(sq); TX.goldHands(sq > 0.4);
  const hornK = n === 10 ? X.easeIn(sp(S(10) + 60, S(10) + 75)) : n > 10 ? 1 : 0, toothK = n === 10 ? X.smooth(sp(S(10) + 80, S(10) + 100)) : n > 10 ? 1 : 0, tooth2 = n === 11 ? X.easeIn(sp(C.seg("toast", 3)[1] + 4, C.seg("toast", 3)[1] + 16)) : 0;
  fake.horns.forEach((h, i) => { h.position.copy(fake.hornRest[i]); h.rotation.set(0, 0, 0); }); fake.teeth.forEach((h, i) => { h.position.copy(fake.toothRest[i]); h.rotation.set(0, 0, 0); });
  fake.horns[1].position.y -= 0.9 * hornK * hornK; fake.horns[1].position.x += 0.2 * hornK; fake.horns[1].rotation.z = 3 * hornK; if (hornK >= 1) fake.horns[1].visible = false; else fake.horns[1].visible = true;
  fake.teeth[1].position.y -= 0.06 * toothK; fake.teeth[0].position.y -= 0.8 * tooth2; fake.teeth[0].visible = tooth2 < 1;
  R.ftag.userData.card.rotation.y = n === 5 ? PI * X.smooth(sp(S(5) + 15, S(5) + 35)) : n === 6 ? PI : 0;
  R.slotZ.forEach((z, i) => { if (i !== 5) z.rotation.z = 0.06 * Math.sin(f * 0.1 + i); });
  // fake leaves the coat when Toast pays
  if (held) { if (R.fake.parent !== E.scene) { E.scene.add(R.fake); } } else if (R.fake.parent !== F.slots[5]) { F.slots[5].add(R.fake); R.fake.position.set(0, 0, 0); R.fake.rotation.set(0, 0, 0); R.fake.scale.setScalar(1.15); }
  R.coins.forEach((c) => (c.position.y = -50)); R.box.position.y = -50;
  // ---- default poses ----
  let open = n >= 2 && !(n === 9 && fs > C.seg("toast", 2)[1] - C.S(9) + 6) && n < 10 ? 1 : 0; if (n === 2) open = X.back(sp(S(2) + 6, S(2) + 22));
  let fp = { pos: FP, yaw: 0.1, open, face: say("flip", "smug"), head: [0.1, 0, 0] };
  let tp = { pos: TP, yaw: PI - 0.1, face: say("toast", "happy") }, pp = { pos: n >= 5 ? PP1 : PP0, yaw: PI + 0.5, face: say("pixi", "deadpan") }, dp = { pos: DP, yaw: PI - 0.4, look: [0.3, 0.3], tailY: 0.3 * Math.sin(f * 0.15), jaw: 0.25 };
  switch (n) {
    case 1: cam = { pos: [x0 - 0.2, 2.6, 6.4], look: [x0 + 0.2, 2.1, -4.0], fov: 50 }; tp.face = "happy"; break;
    case 2: cam = { pos: [x0 + 1.4, 2.4, -0.6], look: [x0 + 0.3, 2.3, -4.6], fov: 46 }; if (fs > 18 && fs < 40) FX.push({ kind: "sparkle", pos: [FP[0] + 0.3, 2.3, FP[2] + 0.9], size: 0.6, t: (fs - 18) / 22 }); break;
    case 3: { const cr = X.back(sp(S(3), S(3) + 6)), ep = X.spring(sp(S(3), S(3) + 14)); const hy = T.dims.H - T.dims.HH / 2 + 0.02; tp = { ...tp, face: "grin", eyePop: 0.6 + 0.5 * ep, headScale: 1.1 }; TX.coinEyes(true);
      cam = { pos: [X.lerp(TP[0] + 2.8, TP[0] + 1.7, cr), X.lerp(2.0, hy, cr), X.lerp(TP[2] - 2.8, TP[2] - 1.9, cr)], look: [TP[0], X.lerp(1.8, hy, cr), TP[2]], fov: 44 }; tp.yaw = PI - 0.6; shk = [S(3), 0.05, 8]; break; }
    case 4: { const nc = Math.min(7, Math.max(0, Math.floor((fs - 6) / 6) + 1)); tp = { ...tp, yaw: PI - 0.3, armR: [-1.2, -0.2], elbowR: 0.9, head: [0.45, 0, 0], face: say("toast", fs < 50 ? "happy" : "grin") };
      T.pose(tp); T.root.updateMatrixWorld(true); const v = new THREE.Vector3(); T.elbows[1].getWorldPosition(v); for (let i = 0; i < nc; i++) { R.coins[i].position.set(v.x - 0.1 + (i % 4) * 0.06, v.y - 0.42 + Math.floor(i / 4) * 0.03 + i * 0.012, v.z - 0.15); }
      if (fs >= 6 && fs < 50) OV.push(textO(String(nc), 1160, 520, 120, { col: "#ffe14a", s: pop(S(4) + 6 + (nc - 1) * 6, 4) }));
      cam = { pos: [x0 + 0.9, 2.2, -4.2], look: [x0 + 0.1, 1.7, -1.7], fov: 44 }; break; }
    case 5: { R.fake.updateMatrixWorld(true); const v = new THREE.Vector3(); R.ftag.userData.card.getWorldPosition(v); cam = { pos: [v.x + 0.02, v.y - 0.06, v.z + 0.55], look: [v.x - 0.04, v.y - 0.07, v.z], fov: 34 }; hudOn = false;
      if (fs > 40) OV.push(textO("ZUBBLT?", 960, 900, 90, { col: "#ff5a5a", s: pop(S(5) + 40, 6) })); break; }
    case 6: cam = { pos: [x0 + 3.4, 2.3, -1.4], look: [x0 - 0.2, 2.0, -3.6], fov: 46 }; pp = { ...pp, yaw: PI / 2 + 0.6 + PI, head: [0.2, 0, 0] }; pp.yaw = -0.7 + PI; fp = { ...fp, yaw: -0.5, head: [0.25, 0, 0] }; break;
    case 7: { const ht = X.smooth(sp(S(7) + 4, S(7) + 14)) * (1 - X.smooth(sp(C.seg("flip", 4)[1] + 8, C.seg("flip", 4)[1] + 20))); fp = { ...fp, heart: ht, yaw: 0.15 };
      const turn = f > C.seg("toast", 1)[0] - 6; tp = { ...tp, yaw: turn ? -0.9 : PI - 0.1, face: say("toast", turn ? "smug" : "happy") }; if (turn) pp = { ...pp, yaw: 0.9 };
      cam = f < C.seg("toast", 1)[0] - 6 ? { pos: [x0 + 0.8, 2.6, -0.4], look: [x0 + 0.4, 2.9, -4.6], fov: 44 } : { pos: [x0 - 2.6, 2.3, 2.2], look: [x0 - 0.1, 2.0, -2.8], fov: 46 }; break; }
    case 8: { const giveK = X.smooth(sp(S(8) + 6, S(8) + 26)); tp = { ...tp, yaw: PI - 0.15, armR: [-1.4, -0.1], elbowR: 0.3, face: say("toast", "grin") }; fp = { ...fp, armL: [-1.0 - 0.5 * giveK, 0.1], elbowL: 0.4, armR: f > S(8) + 40 && f < S(8) + 80 ? [-1.3, -0.2] : [0, 0.08], elbowR: 0.3, face: say("flip", "smug") };
      if (fs < 30) { T.pose(tp); T.root.updateMatrixWorld(true); const v = new THREE.Vector3(); T.elbows[1].getWorldPosition(v); for (let i = 0; i < 7; i++) R.coins[i].position.set(X.lerp(v.x - 0.1 + (i % 4) * 0.06, FP[0] - 0.4, giveK), X.lerp(v.y - 0.42, 1.6, giveK) + i * 0.012, X.lerp(v.z - 0.15, FP[2] + 0.8, giveK)); }
      cam = { pos: [x0 - 2.6, 2.3, 2.2], look: [x0 - 0.1, 2.0, -2.8], fov: 46 }; pp = { ...pp, yaw: 0.6 }; break; }
    case 9: { const meas = f > S(9) + 6 && f < C.seg("toast", 2)[0]; fp = { ...fp, yaw: 0.7, lean: 0.15, head: [0.45, 0.3, 0], armR: meas ? [-1.5, -0.2] : [0, 0.08], elbowR: 0.2, measure: meas, face: say("flip", "smug") };
      const leave = C.seg("toast", 2)[1] + 8; if (f > leave) { const k = X.smooth(sp(leave, leave + 30)); fp = { ...fp, open: 0, pos: [FP[0], 0, X.lerp(FP[2], -8.6, k)], yaw: 0.1 + k * 0.3, measure: false, armR: [0, 0.08] }; if (k >= 1) fp.visible = false; }
      dp = { ...dp, head: [-0.5, -0.3, 0], look: [0, 0.8] }; tp = { ...tp, yaw: PI - 0.4, face: say("toast", f > C.seg("toast", 2)[0] ? "deadpan" : "shock") };
      AL.lamp.rotation.z = f > leave ? 0.18 * Math.sin((f - leave) * 0.15) * Math.exp(-(f - leave) / 60) : 0;
      light = f > leave + 20 ? ["night", "dramatic", 0.7] : light;
      cam = { pos: [x0 + 3.6, 3.0, -6.8], look: [x0 + 0.7, 2.1, -2.6], fov: 60 }; break; }
    case 10: { tp = { ...tp, yaw: -0.1, face: sq < 0.3 ? "grin" : hornK > 0 ? "shock" : "scared", armL: [-1.5, 0.1], elbowL: 1.1, armR: [-1.5, -0.1], elbowR: 1.1, head: [0.4, 0, 0] };
      fp = { visible: false }; cam = { pos: [TP[0] + 0.2, 1.75, TP[2] + 2.5], look: [TP[0], 1.6, TP[2]], fov: 44 }; break; }
    case 11: { tp = { ...tp, yaw: -0.4, face: say("toast", "smug"), armL: [-1.2, 0.1], elbowL: 0.6, armR: [-1.2, -0.1], elbowR: 0.6 }; pp = { pos: [TP[0] + 1.3, 0.17, TP[2] + 0.4], yaw: -0.6, face: say("pixi", "deadpan") }; fp = { visible: false };
      cam = { pos: [TP[0] + 0.7, 2.1, TP[2] + 4.6], look: [TP[0] + 0.6, 1.6, TP[2]], fov: 44 }; break; }
  }
  if (n !== 3) TX.coinEyes(false);
  // ---- pose ----
  if (fp.visible === false) F.pose({ visible: false }); else F.pose(fp);
  T.pose(tp); P.pose(pp); P.boardAt([pp.pos[0], 0, pp.pos[2]], (pp.yaw || 0), 0, 0, true);
  Dn.pose(dp); // the unopened present in his mouth
  Dn.root.updateMatrixWorld(true); { const v = new THREE.Vector3(); Dn.jaw.getWorldPosition(v); const fw = new THREE.Vector3(0, 0, 0.4).applyQuaternion(Dn.root.quaternion); R.box.position.set(v.x + fw.x, v.y + 0.05, v.z + fw.z); R.box.rotation.y = Dn.root.rotation.y; }
  if (held) { T.root.updateMatrixWorld(true); const a = new THREE.Vector3(), b = new THREE.Vector3(); T.elbows[0].getWorldPosition(a); T.elbows[1].getWorldPosition(b); const m = n >= 10 ? a.add(b).multiplyScalar(0.5) : b; const fw = new THREE.Vector3(0, 0, 0.32).applyQuaternion(T.root.quaternion);
    const sqz = n === 10 && fs > 20 && fs < 50 ? 0.15 * Math.abs(Math.sin((fs - 20) * 0.4)) : 0; R.fake.position.set(m.x + fw.x, m.y + 0.2, m.z + fw.z); R.fake.rotation.set(0, T.root.rotation.y, 0); R.fake.scale.set(1.8 * (1 + sqz), 1.8 * (1 - sqz), 1.8); }
  unclip([T, P], { skip: [] });
  // ---- HUD ----
  const money = paid ? 0 : 7; const rcT = n === 8 ? sp(S(8) + 30, S(8) + 36) * (1 - sp(S(8) + 110, S(8) + 120)) : n === 10 ? sp(S(10) + 70, S(10) + 76) * (1 - sp(Eo(10) - 8, Eo(10))) : 0;
  if (hudOn) OV.push(hud({ label: "NIGHT 9 — BLACK FRIDAY", money, gold: "$9,999", clock: ["1:00", "1:01", "1:01", "1:02", "1:03", "1:03", "1:04", "1:05", "1:06", "1:08", "1:09"][n - 1] + " AM", receipt: n === 10 ? "PAID $7 + 1 ZUBBIT · WORTH $0" : "PAID $7 + 1 ZUBBIT · WORTH ?", ra: rcT, moneyPop: n === 8 && fs > 26 && fs < 36 ? 1.2 : 1 }));
  const sb = subs(D.SEG, t); if (sb) OV.push(sb);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
