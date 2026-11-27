// Long 3 · Scene 4 — 2 AM: the jumbo (11 shots). Shop front, the line gone.
import * as THREE from "three";
import { unclip } from "./common/staging.js";
import { street, PI, LX } from "./common/street.js";
import { MACH } from "./common/block.js";
import { zubbit, tag, mysteryBox, carabiner, makeFlip, person, clipZ } from "./common/l3.js";
import { load, ctx, hud, subs, textO, fail, atPt } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {};
const KB = [5.6, 0, -9.7], SIT = { legL: -1.5, kneeL: 1.4, legR: -1.5, kneeR: 1.4 }, LAND = [3.4, 0, -7.4];
const V = (a) => new THREE.Vector3(...a);
function hang(car, a, b) { const d = b.clone().sub(a), L = Math.max(0.3, d.length()); car.position.copy(a); car.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), d.normalize()); car.scale.set(0.7, L / 0.9, 0.7); }
export async function build(E) {
  D = await load(meta);
  R = street(E); R.F = makeFlip(E);
  R.car = carabiner(E, 0.9); R.box = mysteryBox(E); R.gold = zubbit(E, "gold"); R.gtag = tag(E, R.gold, "$9,999", "ZUBBIT", { pos: [0.2, -0.1, 0.19], s: 1.2 });
  R.phones = R.line.slice(0, 6).map((k) => E.box(0.1, 0.18, 0.03, E.mat("#23232e"), [0, -0.5, 0.18], { parent: k.elbows[1], center: true }));
  R.chain = R.L.chain; R.L.posts.forEach((p) => (p.visible = false)); R.chain.flat().forEach((m) => (m.visible = false)); R.kbag.visible = false; R.chair.visible = false; R.G.root.visible = false;
}
export function frame(f0, E) {
  const C0 = ctx(f0, E, D), IMP = C0.S(5) + 46, FL = fail(f0, IMP, E.X), f = FL.f, C = ctx(f, E, D);
  const { X, n, fs, S, Eo, sp, pop, say, t } = C, OV = [], FX = [];
  const { T, P, B, TX, DX, F } = R, Dn = R.D;
  let cam, light = ["night", "interior", 0.3], shk = null, hudOn = true, grade = null, flash = 0;
  B.led("SOLD OUT"); B.ticker("$9,999"); B.disp("SOLD OUT", "", "#ff7f7f"); TX.goldHands(true); TX.ticket.visible = false; B.door.rotation.y = -1.3;
  // a few people still about (re-use the line rigs), phones out from shot 6
  const film = n >= 6 && n <= 11;
  R.line.forEach((k, i) => { if (i > 5) { k.pose({ visible: false }); if (k.ch) k.ch.visible = false; return; } if (k.ch) k.ch.visible = false; const FP6 = [[0.3, -6.3], [0.6, -7.4], [1.0, -8.5], [6.4, -6.0], [6.9, -7.1], [7.4, -8.2]][i]; const pos = film ? [FP6[0], 0, FP6[1]] : [-2 - i * 2.2, 0, -8.6 - (i % 2) * 0.6];
    k.pose({ pos, yaw: film ? Math.atan2(LAND[0] - (i < 3 ? 0.6 : 6.9), LAND[2] + 0.5 - (-7.3)) : (i % 2 ? PI / 2 : -PI / 2), armR: film ? [-1.5, -0.1] : [0, 0], elbowR: film ? 0.6 : 0, face: n === 10 && fs > 20 && fs < 60 ? "scared" : n === 11 ? "shock" : "happy", lean: n === 10 && fs > 20 && fs < 60 ? -0.25 : 0, legL: film ? 0 : 0.4 * Math.sin(f * 0.4 + i), legR: film ? 0 : -0.4 * Math.sin(f * 0.4 + i) }); k.root.scale.setScalar(k.base); k.z.visible = true; });
  R.tents.forEach((tt) => (tt.visible = false)); R.dtent.visible = false;
  R.phones.forEach((p) => (p.visible = film));
  F.pose({ visible: false }); R.gold.position.y = -50; R.car.visible = false;
  let tp = { pos: [KB[0], -0.5, KB[2]], yaw: PI, ...SIT, face: "sad", armL: [-2.6, 0.5], elbowL: 1.9, armR: [-2.6, -0.5], elbowR: 1.9, head: [0.35, 0, 0] };
  let pp = { pos: [KB[0] - 2.0, 0.17, KB[2] + 0.6], yaw: PI + 0.5, face: say("pixi", "deadpan") }, dp = { pos: [KB[0] + 1.6, 0, KB[2] + 0.8], yaw: PI - 0.6, tailY: 0.3 * Math.sin(f * 0.15), jaw: 0.25 };
  let boxAt = "mouth", carA = null, carB = null; if (n >= 6) pp = { pos: [6.3, 0.17, -8.3], yaw: PI + 0.6, face: say("pixi", "deadpan") };
  switch (n) {
    case 1: cam = { pos: [4.4, 2.8, -17.5], look: [5.4, 1.6, -7.6], fov: 50 }; break;
    case 2: { const put = X.smooth(sp(S(2) + 4, S(2) + 24)), push = sp(S(2) + 30, S(2) + 40), roll = X.smooth(sp(C.seg("toast")[1] + 4, C.seg("toast")[1] + 34));
      dp = { ...dp, pos: [KB[0] + 1.1, 0, KB[2] + 0.4], yaw: PI - 1.1, head: [0.5 * put + 0.2 * Math.sin(PI * push), 0, 0], jaw: put < 1 ? 0.25 : 0.05 };
      boxAt = roll > 0 ? "roll" : put >= 1 ? "knee" : "mouth"; if (roll > 0) R.box.position.set(X.lerp(KB[0] + 0.2, KB[0] + 2.6, roll), 0.16, X.lerp(KB[2] - 0.2, KB[2] + 1.8, roll)), R.box.rotation.set(0, 0, -roll * 6);
      if (boxAt === "knee") { R.box.position.set(KB[0] + 0.1 - 0.15 * push, 0.38, KB[2] - 0.35); R.box.rotation.set(0, 0.3, 0); }
      tp = { ...tp, armL: fs > 40 ? [-0.9, 0.5] : tp.armL, elbowL: fs > 40 ? 0.4 : 1.9, face: say("toast", "sad") };
      cam = { pos: [5.2, 1.6, -13.6], look: [6.0, 0.9, -9.6], fov: 42 }; break; }
    case 3: { // clips himself to Toast's hood, walks off proud: Toast towed backwards
      const go = sp(S(3) + 40, Eo(3)); const dx = -go * 9.0;
      dp = { pos: [KB[0] - 1.6 + dx, 0, KB[2] + 1.5], yaw: -PI / 2, head: [-0.3, 0, 0], tailY: 0.6 * Math.sin(f * 0.4), legL: go > 0 ? 0.5 * Math.sin(f * 0.5) : 0, legR: go > 0 ? -0.5 * Math.sin(f * 0.5) : 0, jaw: 0.1, look: [0, 0.3] };
      tp = { ...tp, pos: [KB[0] + dx, -0.5 + 0.03 * Math.abs(Math.sin(f * 0.7)) * (go > 0 ? 1 : 0), KB[2] + 0.4], yaw: PI / 2 + (go > 0 ? 0 : -PI / 2), armL: go > 0 ? [-2.2, 0.8] : [-2.6, 0.5], armR: go > 0 ? [-2.2, -0.8] : [-2.6, -0.5], elbowL: go > 0 ? 0.3 : 1.9, elbowR: go > 0 ? 0.3 : 1.9, face: go > 0 ? say("toast", "shock") : "sad", head: go > 0 ? [-0.2, 0.4, 0] : [0.35, 0, 0] };
      carA = "ring"; carB = "hood"; boxAt = "left"; cam = { pos: [KB[0] - 1.0 + dx * 0.9, 2.2, -16.0], look: [KB[0] - 1.2 + dx * 0.9, 1.0, KB[2] + 0.6], fov: 40 }; break; }
    case 4: { // up the shop's two steps, steps off: see-saw
      const climb = X.smooth(sp(S(4), S(4) + 40)), off = X.easeIn(sp(S(4) + 44, S(4) + 56));
      dp = { pos: [X.lerp(KB[0] - 3, 5.6, climb), X.lerp(0, 0.4, climb) - off * 0.4, X.lerp(KB[2] + 1.5, -5.6, climb) - off * 1.2], yaw: PI - 0.2, tailY: 0.5 * Math.sin(f * 0.4), legL: 0.4 * Math.sin(f * 0.5), legR: -0.4 * Math.sin(f * 0.5) };
      const up = X.easeOut(sp(S(4) + 52, S(4) + 70)); tp = { ...tp, pos: [X.lerp(KB[0] - 4.5, 5.0, climb * 0.6), -0.5 + up * 3.0, X.lerp(KB[2] + 0.4, -8.0, climb * 0.6)], yaw: PI, pitch: -up * 1.2, face: up > 0 ? "scared" : "shock", armL: [-2.6, 1.0], armR: [-2.6, -1.0] };
      carA = "ring"; carB = "hood"; boxAt = "left"; cam = { pos: [2.0, 2.6, -14.4], look: [4.8, 1.8, -6.6], fov: 50 }; break; }
    case 5: { // ragdoll arc over the sign, through the door into the SOLD OUT machine. Fail screen
      const k = sp(S(5), IMP); const p0 = V([5.0, 2.5, -8.0]), p1 = V([5.6, 1.4, -4.4]); const x = X.lerp(p0.x, p1.x, k), y = X.lerp(p0.y, p1.y, k) + 5.2 * Math.sin(PI * k), z = X.lerp(p0.z, p1.z, k);
      if (f < IMP) tp = { pos: [x, y, z], yaw: PI + k * 6, roll: k * 9, pitch: k * 4, face: "scared", armL: [-2.6 + Math.sin(f) * 0.8, 1.2], armR: [-2.6 - Math.sin(f) * 0.8, -1.2], legL: Math.sin(f * 0.9), legR: -Math.sin(f * 0.9) };
      else tp = { pos: [6.2, 0, -3.6], yaw: 0.6, roll: 1.3, face: "dizzy", burst: { f: f0 - IMP, back: 0 } };
      dp = { pos: LAND, yaw: PI - 0.5, tailY: 0.2 }; boxAt = "under"; cam = { pos: [3.2, 3.4, -16.5], look: [5.0, 3.8, -5.0], fov: 52 }; break; }
    case 6: { dp = { pos: LAND, yaw: PI - 0.4, tailY: 0.3 * Math.sin(f * 0.2), jaw: 0.4, look: [0.3, 0] }; tp = { visible: false }; boxAt = "under"; carA = "ring"; carB = "dangle";
      const pk = X.smooth(sp(S(6) + 50, S(6) + 70)); F.pose({ pos: [8.3 - 0.0, 0, -7.0], yaw: -PI / 2 - 0.4, face: "smug", lean: 0, armR: [-1.4, -0.3], elbowR: 0.3 }); F.root.position.x = X.lerp(9.6, 8.6, pk);
      if (f > S(6) + 80 && f < S(6) + 84) flash = 0.5;
      cam = { pos: [3.4, 2.4, -14.2], look: [4.6, 1.8, -7.2], fov: 50 }; break; }
    case 7: { const w = X.smooth(sp(S(7), S(7) + 40)); tp = { pos: [X.lerp(5.6, 4.6, w), w < 0.4 ? 0.4 : 0, X.lerp(-5.0, -7.0, w)], yaw: PI + 0.4, face: say("toast", "angry"), legL: 0.4 * Math.sin(f * 0.3), legR: -0.2 * Math.sin(f * 0.3), lean: 0.15, armR: [-1.4, -0.4], elbowR: 0.4 };
      dp = { pos: LAND, yaw: PI - 0.4 }; boxAt = "under"; carA = "ring"; carB = "dangle"; cam = { pos: [3.6, 2.0, -12.4], look: [4.2, 1.6, -6.8], fov: 46 }; break; }
    case 8: { const st = X.back(sp(S(8) + 6, S(8) + 26)); dp = { pos: [LAND[0], 0, LAND[2] + 0.9 * st], yaw: PI - 0.4, head: [0.5 * st, 0, 0], look: [0, -0.8], jaw: 0.3 }; boxAt = "open";
      tp = { pos: [4.6, 0, -7.0 - 0.6], yaw: PI + 0.9, face: "shock" }; carA = "ring"; carB = "dangle"; cam = { pos: [2.4, 1.6, -11.6], look: [3.4, 0.6, -8.0], fov: 44 }; break; }
    case 9: { hudOn = false; boxAt = "open"; dp = { pos: [LAND[0], 0, LAND[2] + 0.9], yaw: PI - 0.4 }; tp = { visible: false }; const gp = [LAND[0] - 0.1, 0.95, LAND[2] - 1.0];
      R.gold.position.set(...gp); R.gold.rotation.set(0, PI - 0.1, 0); R.gold.scale.setScalar(1.6); R.gtag.userData.card.rotation.y = PI * X.smooth(sp(S(9) + 30, S(9) + 46));
      FX.push({ kind: "sparkle", pos: [gp[0], gp[1] - 0.2, gp[2] - 0.2], size: 0.5, t: fs / 30 }); cam = { pos: [gp[0] + 0.05, gp[1] - 0.32, gp[2] - 0.95], look: [gp[0], gp[1] - 0.38, gp[2]], fov: 40 }; break; }
    case 10: { boxAt = "open"; const sniff = sp(S(10), S(10) + 30), lick = sp(S(10) + 60, S(10) + 75), hug = X.smooth(sp(S(10) + 100, S(10) + 130)), hook = X.smooth(sp(S(10) + 150, S(10) + 180));
      dp = { pos: [LAND[0], 0, LAND[2] + 0.9], yaw: PI - 0.4, head: [0.5 * (1 - hug), 0, 0], jaw: lick > 0 && lick < 1 ? 0.6 : 0.1, armUp: hug * 1.2, tailY: hook >= 1 ? 0.9 * Math.sin(f * 0.6) : 0, look: [0, -0.5] };
      tp = { pos: [4.6, 0, -7.6], yaw: PI + 0.9, face: fs > 20 && fs < 60 ? "scared" : "shock", lean: fs > 20 && fs < 60 ? -0.3 : 0 }; pp = { pos: [6.3, 0.17, -8.3], yaw: PI + 0.6, face: fs > 20 && fs < 60 ? "shock" : "deadpan", lean: fs > 20 && fs < 60 ? -0.3 : 0 };
      Dn.pose(dp); Dn.root.updateMatrixWorld(true); const rp = new THREE.Vector3(); DX.ringPt.getWorldPosition(rp); const g0 = V([LAND[0] - 0.1, 0.95, LAND[2] - 0.1]);
      const gp = hook > 0 ? rp.clone().add(V([0, 0.02, 0])) : hug > 0 ? g0.clone().lerp(rp.clone().add(V([0, -0.2, -0.3])), hug) : g0; R.gold.position.copy(gp); R.gold.rotation.set(0, PI - 0.4, 0); R.gold.scale.setScalar(hook > 0 ? 1.4 : 1.6);
      if (lick > 0 && lick < 1) FX.push({ kind: "hearts", pos: [g0.x, 2.2, g0.z - 0.5], size: 0.6, t: lick });
      carA = "ring"; carB = "dangle"; cam = { pos: [2.0, 2.4, -12.4], look: [3.2, 1.8, -7.0], fov: 46 }; break; }
    case 11: { boxAt = "open"; dp = { pos: [LAND[0], 0, LAND[2] + 0.9], yaw: PI - 0.4, armUp: 1.2, tailY: 0 }; Dn.pose(dp); Dn.root.updateMatrixWorld(true); const rp = new THREE.Vector3(); DX.ringPt.getWorldPosition(rp); R.gold.position.copy(rp); R.gold.rotation.set(0, PI - 0.4, 0); R.gold.scale.setScalar(1.4);
      tp = { pos: [4.6, 0, -7.6], yaw: PI + 0.6, face: "shock" }; pp = { pos: [6.3, 0.17, -8.3], yaw: PI + 0.6, face: "shock" }; carA = "ring"; carB = "dangle";
      const cu = fs > 60; cam = cu ? { pos: [4.6 - 0.3, 2.0, -9.4], look: [4.6, 1.9, -7.6], fov: 40 } : { pos: [3.0, 3.4, -16.8], look: [4.4, 2.2, -6.0], fov: 54 };
      if (cu) { const eyes = []; T.pose(tp); T.root.updateMatrixWorld(true); for (const s of [-1, 1]) { const v = new THREE.Vector3(s * 0.2, 0.02 + 0.88 * 0.47, 0.46); T.head.localToWorld(v); OV.push(atPt(E, [v.x, v.y, v.z], "$9,999▲", 34, { col: "#7dff7a", stroke: "#0a1a0a" })); } }
      break; }
  }
  if (FL.on) { grade = FL.grade; flash = FL.flash; shk = FL.shk; OV.push(FL.ov); hudOn = false; }
  // ---- pose ----
  if (tp.visible === false) T.pose({ visible: false }); else T.pose(tp);
  if (pp.visible === false) P.pose({ visible: false }); else { P.pose(pp); } P.boardAt(pp.visible === false ? [0, -50, 0] : [pp.pos[0], 0, pp.pos[2]], pp.yaw || 0, 0, 0, pp.visible !== false);
  Dn.pose(dp); Dn.root.updateMatrixWorld(true); T.root.updateMatrixWorld(true);
  const jaw = new THREE.Vector3(); Dn.jaw.getWorldPosition(jaw); const fw = new THREE.Vector3(0, 0, 0.4).applyQuaternion(Dn.root.quaternion);
  if (boxAt === "mouth") { R.box.position.set(jaw.x + fw.x, jaw.y + 0.05, jaw.z + fw.z); R.box.rotation.set(0, Dn.root.rotation.y, 0); R.box.scale.set(1, 1, 1); R.box.userData.lid.rotation.x = 0; }
  if (boxAt === "left") { R.box.position.set(KB[0] + 2.6, 0.16, KB[2] + 1.8); R.box.scale.set(1, 1, 1); }
  if (boxAt === "under") { R.box.position.set(LAND[0], 0.05, LAND[2]); R.box.scale.set(1.2, 0.3, 1.2); R.box.rotation.set(0, 0.4, 0); R.box.userData.lid.rotation.x = 0; }
  if (boxAt === "open") { R.box.position.set(LAND[0] - 0.1, 0.05, LAND[2] - 0.1); R.box.scale.set(1.3, 0.35, 1.3); R.box.rotation.set(0, 0.4, 0); R.box.userData.lid.rotation.x = -2.4; if (n === 8 && fs > 14) { FX.push({ kind: "sparkle", pos: [LAND[0], 0.8, LAND[2] - 0.6], size: 0.9, t: fs / 30 }); R.gold.position.set(LAND[0] - 0.1, 0.4 + 0.15 * X.back(sp(S(8) + 14, S(8) + 30)), LAND[2] - 0.1); R.gold.scale.setScalar(1.6); R.gold.rotation.set(0, PI - 0.4, 0); } }
  if (carA) { R.car.visible = true; const a = new THREE.Vector3(); DX.ringPt.getWorldPosition(a); let b;
    if (carB === "hood") { b = new THREE.Vector3(0, T.dims.HH + 0.05, -0.45); T.head.localToWorld(b); } else b = a.clone().add(V([0.1, -0.7, -0.2]));
    if (n === 3 && f < S(3) + 30) { const k = sp(S(3), S(3) + 30); b = a.clone().add(V([0.2, -0.7, -0.2])).lerp(b, k); }
    hang(R.car, a, b); }
  unclip([T, P], { skip: n >= 3 && n <= 5 ? [T] : [] });
  if (hudOn) OV.push(hud({ label: "NIGHT 9 — BLACK FRIDAY", money: 0, gold: "$9,999", clock: ["2:00", "2:02", "2:04", "2:05", "2:05", "2:07", "2:08", "2:09", "2:09", "2:10", "2:12"][n - 1] + " AM" }));
  const sb = subs(D.SEG, t); if (sb && !FL.on) OV.push(sb);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, flash, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
