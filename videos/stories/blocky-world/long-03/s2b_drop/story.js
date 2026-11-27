// Long 3 · Scene 2b — Midnight: the drop (10 shots)
import * as THREE from "three";
import { unclip } from "./common/staging.js";
import { street, poseLine, poseGran, PI, GR, TQ, DQ, LX } from "./common/street.js";
import { MACH } from "./common/block.js";
import { zubbit, mysteryBox, person, clipZ, coin } from "./common/l3.js";
import { load, ctx, hud, subs, textO, fail, atPt } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {};
export async function build(E) {
  D = await load(meta);
  R = street(E);
  R.out = []; for (let i = 0; i < 9; i++) { const k = person(E, 90 + i, { kid: i % 4 === 1 }); k.z = clipZ(E, k); R.out.push(k); }
  R.box = mysteryBox(E); R.zg = zubbit(E, "grey"); R.gz = zubbit(E, "grey", { parent: R.kbag.userData.clip }); R.gz.position.set(0, 0, 0); R.gz.visible = false;
  R.dbox = mysteryBox(E); R.coin = coin(E, null, [0, -50, 0], 1.3);
  R.TX.ticket.visible = false;
}
export function frame(f0, E) {
  const C0 = ctx(f0, E, D), IMP = C0.S(9) + 34, FL = fail(f0, IMP, E.X), f = FL.f, C = ctx(f, E, D);
  const { X, n, fs, S, Eo, sp, pop, say, t } = C, OV = [], FX = [];
  const { T, P, B, G, TX, DX, A } = R, Dn = R.D;
  let cam, light = ["night", "interior", 0.3], shk = null, hudOn = true, grade = null, flash = 0;
  // LED + machine counters
  const serving = n <= 2 ? 1 : n === 3 ? [2, 3, 12, 30, 51, 64, 65, 66][Math.min(7, Math.floor(fs / 26))] : n === 4 ? (fs < 30 ? 66 : fs < 60 ? 68 : fs < 90 ? 69 : 70) : n === 5 ? 70 : 71;
  const sold = n >= 8; B.led(sold ? "SOLD OUT" : `DROP IS LIVE · NOW SERVING ${serving}`, sold ? "#ff3030" : "#7dff7a"); B.ticker("$9,999");
  const boxes = n < 6 ? 144 : n === 6 ? (fs < 25 ? 144 : fs < 55 ? 40 : 3) : n === 7 ? 1 : 0; B.disp(boxes ? `BOXES: ${boxes}` : "SOLD OUT", boxes ? "" : "", boxes ? "#7fffd4" : "#ff7f7f");
  poseLine(R, f, { allZ: n >= 3 }); poseGran(R, f, say); R.kbag.visible = true; R.gz.visible = n >= 2 && !(n === 2 && fs < 100);
  R.out.forEach((k) => k.pose({ visible: false })); R.box.position.y = -50; R.zg.position.y = -50; R.dbox.position.y = -50; R.coin.position.y = -50; A.pose({ visible: false });
  let tp = { pos: TQ, yaw: PI - 0.2, face: say("toast", "happy"), armR: [-2.6, -0.1], elbowR: 0.2 }, pp = { visible: false }, bp = null;
  let dp = { pos: DQ, yaw: PI + 0.3, look: [-0.4, 0], tailY: 0.3 * Math.sin(f * 0.15) };
  TX.ticket.visible = false; TX.hzb = TX.hzb;
  const opener = (k, pos, t0, yaw = PI) => { const o = f >= t0; k.pose({ pos, yaw, armL: [-1.2, 0.1], elbowL: 0.6, armR: [-1.2, -0.1], elbowR: 0.6, face: o ? "shock" : "happy" }); k.root.scale.setScalar(k.base); k.root.updateMatrixWorld(true); const a = new THREE.Vector3(), b = new THREE.Vector3(); k.elbows[0].getWorldPosition(a); k.elbows[1].getWorldPosition(b); const m = a.add(b).multiplyScalar(0.5); R.box.position.set(m.x, m.y - 0.45, m.z - 0.25); R.box.rotation.set(0, 0, 0); R.box.userData.lid.rotation.x = o ? -2.2 : 0; if (o) { R.zg.position.set(m.x, m.y - 0.1 + 0.3 * X.back(sp(t0, t0 + 10)), m.z - 0.25); R.zg.rotation.set(0, PI, 0); R.zg.scale.setScalar(1.3); } };
  const oohFace = (i) => "shock";
  switch (n) {
    case 1: cam = { pos: [5.6, 3.1, -7.9], look: [5.6, 3.05, -5.37], fov: 40 }; break;
    case 2: { // Gran at the door opens hers: grey. Ooooh. Clips it to her knitting bag
      const o = S(2) + 60; G.pose({ pos: [5.4, 0.4, -5.9], yaw: PI, armL: [-1.2, 0.1], elbowL: 0.6, armR: [-1.2, -0.1], elbowR: 0.6, face: f >= o ? "grin" : "smug" }); G.root.scale.setScalar(0.78);
      if (fs < 100) { G.root.updateMatrixWorld(true); const a = new THREE.Vector3(); G.elbows[0].getWorldPosition(a); R.box.position.set(a.x + 0.3, a.y - 0.4, a.z - 0.3); R.box.userData.lid.rotation.x = f >= o ? -2.2 : 0; if (f >= o) { R.zg.position.set(a.x + 0.3, a.y + 0.05 + 0.2 * X.back(sp(o, o + 10)), a.z - 0.3); R.zg.rotation.set(0, PI, 0); R.zg.scale.setScalar(1.3); } }
      poseLine(R, f, { face: f > C.seg("line")[0] - 4 ? oohFace : null }); cam = { pos: [3.4, 2.1, -11.4], look: [4.6, 1.5, -6.2], fov: 44 }; break; }
    case 3: { const i = Math.min(7, Math.floor(fs / 26)), k = R.out[i % R.out.length]; opener(k, [5.6, 0.4, -5.9], S(3) + i * 26 + 12);
      poseLine(R, f, { allZ: true, face: (j) => (fs % 52 > 14 && fs % 52 < 40 ? "shock" : "happy") }); cam = { pos: [3.0, 2.2, -11.6], look: [4.4, 1.5, -6.2], fov: 46 }; break; }
    case 4: { const k = R.out[3]; const u = sp(S(4) + 30, S(4) + 70); k.pose({ pos: [X.lerp(5.0, 6.0, u), u > 0 && u < 1 ? 0.2 : u >= 1 ? 0.4 : 0, -7.4 + 1.0 * Math.sin(PI * u) + (u >= 1 ? 1.5 : 0)], yaw: PI / 2, face: "smug", legL: 0.5 * Math.sin(f * 0.5), legR: -0.5 * Math.sin(f * 0.5) }); k.root.scale.setScalar(0.55);
      tp = { pos: [5.6, 0, -6.6], yaw: PI, face: fs < 30 ? "grin" : "shock", armR: [-2.9, -0.1], elbowR: 0.1, head: fs > 30 ? [0, 0.5, 0] : [0, 0, 0] }; TX.ticket.visible = false; cam = { pos: [5.4, 2.0, -11.0], look: [5.6, 1.9, -5.6], fov: 44 }; break; }
    case 5: { A.pose({ pos: [5.6, 3.6, -5.7], rotY: PI, palmUp: 0 }); pp = { pos: [7.0, 0.17, -7.7], yaw: PI - 0.5, face: say("pixi", "deadpan") }; bp = [[7.0, 0, -7.7], -0.5]; tp = { pos: [5.6, 0, -6.7], yaw: PI - 0.1, face: say("toast", "angry"), armR: [-2.9 + 0.3 * Math.sin(f * 0.6), -0.1], elbowR: 0.1, head: [-0.3, 0, 0] };
      cam = { pos: [4.0, 1.6, -11.2], look: [5.4, 2.1, -5.8], fov: 46 }; break; }
    case 6: hudOn = false; cam = { pos: [MACH[0], 1.62, -2.75], look: [MACH[0], 1.62, -3.84], fov: 44 }; light = ["interior", "night", 0.15]; break;
    case 7: { const cut = S(7) + 80; if (f < cut) { // inside: Gran pays for him; a box drops; he takes it in his mouth
        G.pose({ pos: [MACH[0] - 0.9, 0, MACH[2] + 1.0], yaw: PI - 0.7, armR: [-1.4, -0.4], elbowR: 0.2, face: say("gran", "smug") }); G.root.scale.setScalar(0.78);
        const dropF = S(7) + 34; R.dbox.position.set(MACH[0], f < dropF ? -50 : 0.95, MACH[2] + 0.66);
        dp = { pos: [5.3, 0, -3.6], yaw: 0.9, head: [0.35, 0, 0], jaw: f > S(7) + 50 && f < S(7) + 60 ? 0.8 : 0.2, tailY: 0.8 * Math.sin(f * 0.5) }; if (f > S(7) + 56) { Dn.pose(dp); Dn.root.updateMatrixWorld(true); const v = new THREE.Vector3(); Dn.jaw.getWorldPosition(v); R.dbox.position.set(v.x + 0.3, v.y + 0.05, v.z + 0.25); }
        tp = { visible: false }; pp = { visible: false }; cam = { pos: [3.0, 2.3, 0.8], look: [6.4, 1.6, -3.8], fov: 46 }; light = ["interior", "night", 0.15]; }
      else { const w = X.smooth(sp(cut, cut + 30)); dp = { pos: [X.lerp(5.6, TQ[0] + 1.2, w), 0, X.lerp(-4.8, TQ[2] - 0.3, w)], yaw: PI - 0.9, head: [0.2, 0, 0], jaw: 0.3, tailY: 0.9 * Math.sin(f * 0.6), legL: w < 1 ? 0.4 * Math.sin(f * 0.6) : 0, legR: w < 1 ? -0.4 * Math.sin(f * 0.6) : 0 };
        Dn.pose(dp); Dn.root.updateMatrixWorld(true); const v = new THREE.Vector3(); Dn.jaw.getWorldPosition(v); const fw = new THREE.Vector3(0, 0, 0.35).applyQuaternion(Dn.root.quaternion); R.dbox.position.set(v.x + fw.x, v.y + 0.05, v.z + fw.z);
        const push = f > C.seg("toast", 1)[0]; tp = { pos: TQ, yaw: PI - 0.3, face: say("toast", "deadpan"), head: [-0.2, -0.3, 0], armL: push ? [-1.3, -0.6] : [0, 0], elbowL: 0.2 };
        cam = { pos: [5.2, 2.0, -12.0], look: [6.4, 1.6, -6.6], fov: 44 }; }
      break; }
    case 8: { tp = { pos: [5.6, 0.4, -5.6], yaw: PI, face: "shock", armR: [0, 0], head: [0, 0, 0] }; cam = { pos: [5.2, 2.2, -11.0], look: [5.6, 2.0, -5.4], fov: 42 }; break; }
    case 9: { // everybody served goes home through the door at once
      R.out.forEach((k, i) => { const t0 = S(9) + 4 + (i % 5) * 4, u = sp(t0, t0 + 40); if (u <= 0) return; k.pose({ pos: [5.6 + ((i % 3) - 1) * 0.45, u < 0.35 ? 0.4 : 0, X.lerp(-4.4, -11, u)], yaw: PI, legL: 0.7 * Math.sin(f * 0.7 + i), legR: -0.7 * Math.sin(f * 0.7 + i), armL: [0.6 * Math.sin(f * 0.7), 0.1], armR: [-0.6 * Math.sin(f * 0.7), 0.1], face: "happy" }); k.root.scale.setScalar(k.base); });
      const flat = f >= IMP; tp = { pos: [5.6, flat ? 0.4 : 0.4, -5.6], yaw: PI, face: flat ? "dizzy" : "scared", stretch: flat ? [1.5, 0.08] : [1, 1], armL: flat ? [0, 1.4] : [0, 0], armR: flat ? [0, 1.4] : [0, 0] };
      cam = { pos: [4.8, 2.4, -10.8], look: [5.6, 1.4, -5.6], fov: 46 }; break; }
    case 10: { const peel = X.back(sp(S(10) + 4, S(10) + 30)); TX.ticket.visible = true;
      tp = { pos: [5.6, 0.4, -5.7], yaw: PI - 0.2, face: say("toast", fs < 30 ? "dizzy" : "smug"), stretch: [X.lerp(1.5, 1, peel), X.lerp(0.08, 1, peel)], head: [0, 0, 0.1 * Math.sin(f * 0.3) * (1 - sp(S(10) + 30, S(10) + 60))] };
      pp = { pos: [7.2, 0.17, -7.2], yaw: PI - 0.5, face: say("pixi", "deadpan") }; bp = [[7.2, 0, -7.2], -0.5];
      R.out.forEach((k, i) => { k.pose({ pos: [1.5 - i * 1.6, 0, -9.6 - (i % 2)], yaw: -PI / 2 + 0.6, face: "happy", legL: 0.4 * Math.sin(f * 0.4 + i), legR: -0.4 * Math.sin(f * 0.4 + i) }); k.root.scale.setScalar(k.base); });
      cam = { pos: [4.4, 2.6, -11.2], look: [5.4, 2.6, -5.6], fov: 46 };
      const ps = C.seg("flip")[0]; if (f > ps - 10) { A.pose({ visible: false }); OV.push(atPt(E, [8.5, 2.7, -5.8], "PSST…", 64, { col: "#d9a826", s: pop(ps, 6) })); }
      break; }
  }
  if (FL.on) { grade = FL.grade; flash = FL.flash; shk = FL.shk; OV.push(FL.ov); hudOn = false; }
  T.pose(tp); if (pp.visible === false) P.pose({ visible: false }); else P.pose(pp); if (pp.visible !== false && bp) P.boardAt(bp[0], bp[1], 0, 0, true); else P.boardAt([0, -50, 0], 0, 0, 0, false);
  if (dp.visible === false) Dn.pose({ visible: false }); else Dn.pose(dp);
  unclip([T, P], {});
  if (hudOn) OV.push(hud({ label: "NIGHT 9 — BLACK FRIDAY", money: 7, gold: "$9,999", clock: ["12:00", "12:01", "12:20", "12:40", "12:41", "12:50", "12:52", "12:55", "12:55", "12:58"][n - 1] + " AM" }));
  if (n === 1) OV.push(textO("BLACK FRIDAY", 960, 480, 130, { col: "#ff3d3d", s: pop(S(1) + 10, 8), a: fs > 10 ? 1 - sp(S(1) + 70, S(1) + 85) : 0 }));
  const sb = subs(D.SEG, t); if (sb && !FL.on) OV.push(sb);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, flash, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
