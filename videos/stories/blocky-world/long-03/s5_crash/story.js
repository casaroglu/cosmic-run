// Long 3 · Scene 5 — 2:55 AM: the next person pays (17 shots). Inside the shop.
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { adminHand } from "./common/props.js";
import { block, MACH } from "./common/block.js";
import { zubbit, toastExtras, dinoExtras, makeFlip, person, clipZ, sack, coin, moth, live, F as FF } from "./common/l3.js";
import { load, ctx, hud, subs, textO, stamp, atPt } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {};
const PI = Math.PI, TP = [1.7, 0, 0.7], DP = [3.8, 0, -0.5], FP = [6.3, 0, -0.5], SK = [5.3, 0, -1.4], PIX = [1.0, 1.18, -1.8];
export async function build(E) {
  D = await load(meta);
  R.B = block(E); R.T = solid(makeToast(E)); R.TX = toastExtras(E, R.T); R.P = makePixi(E); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D); R.F = makeFlip(E); R.A = adminHand(E);
  R.gold = zubbit(E, "gold"); R.sack = sack(E);
  R.pile = []; for (let i = 0; i < 70; i++) { const a = i * 2.4, r = 0.08 + Math.sqrt(i) * 0.06; R.pile.push(coin(E, null, [0, -50, 0], 1.0)); R.pile[i].userData.p = [SK[0] - 0.7 + Math.cos(a) * r, 0.02 + Math.max(0, 0.35 - r * 0.6) * (i % 3 === 0 ? 1 : 0.6), SK[2] + 0.2 + Math.sin(a) * r * 0.7]; }
  R.fz = R.F.slots.map((s, i) => { const z = zubbit(E, "fake", { parent: s }); z.position.set(0, 0, 0); z.scale.setScalar(1.15); z.userData.horns[1].visible = false; return z; });
  // faces at the window (outside), each with a phone
  R.ph = live(512, 512); R.ph.set("q", (g, w, h) => { g.fillStyle = "#0e1a2a"; g.fillRect(0, 0, w, h); g.fillStyle = "#3a8fff"; g.beginPath(); g.roundRect(30, 60, 400, 150, 30); g.fill(); g.fillStyle = "#fff"; g.font = FF(56); g.textBaseline = "middle"; g.fillText("IS THE CRAZE", 55, 110); g.fillText("OVER?", 55, 170); g.fillStyle = "#e8e8f0"; g.beginPath(); g.roundRect(170, 280, 310, 150, 30); g.fill(); g.fillStyle = "#0e1a2a"; g.font = FF(110); g.fillText("YES.", 210, 358); });
  R.win = [0.7, 1.5, 2.3, 3.1, 3.9].map((x, i) => { const k = person(E, 120 + i, { kid: i === 2 }); k.z = clipZ(E, k); k.x = x; k.phone = E.group(null, [x + 0.15, 1.62, -5.36]); E.box(0.2, 0.34, 0.03, E.mat("#23232e"), [0, 0, 0], { parent: k.phone, center: true }); k.scr = E.plane(0.17, 0.17, E.flat("#ffffff", { map: R.ph.tex }), [0, 0.03, 0.017], { parent: k.phone }); k.phone.visible = false; return k; });
  R.heap = []; for (let i = 0; i < 48; i++) { const z = zubbit(E, "grey"); const a = i * 2.1, r = Math.sqrt(i) * 0.13; z.userData.hp = [3.4 + Math.cos(a) * r, 0.1 + Math.max(0, 0.6 - r) * 0.8, -6.1 + Math.sin(a) * r * 0.6]; z.userData.hr = [i, i * 1.7, i * 0.3]; z.scale.setScalar(1.3); R.heap.push(z); }
  R.di = person(E, 77, { hood: "#c8a8f0" });
  R.moth = moth(E); R.pcoins = [coin(E, null, [0, -50, 0], 1.3), coin(E, null, [0, -50, 0], 1.3)];
  R.pocket = [-1, 1].map((s) => E.box(0.16, 0.2, 0.05, E.mat("#ffffff"), [s * 0.3, -0.05, 0.25], { parent: R.T.torso, noShadow: true }));
  R.DX.hand.visible = false;
}
export function frame(f0, E) {
  const C = ctx(f0, E, D), { X, n, fs, S, Eo, sp, pop, say, t } = C, f = f0, OV = [], FX = [];
  const { T, P, B, TX, DX, F, A } = R, Dn = R.D;
  let cam, light = ["interior", "night", 0.15], shk = null, hudOn = true;
  TX.goldHands(true); TX.coinEyes(false);
  const clock = ["2:55", "2:56", "2:56", "2:57", "2:57", "2:58", "2:59", "3:00", "3:00", "3:00", "3:01", "3:02", "3:03", "3:05", "3:06", "3:06", "3:07"][n - 1];
  B.clock(n === 3 && fs < 40 ? "2:56" : clock, "AM");
  // ticker falls in shot 11
  const tk = n < 11 ? "$9,999" : n === 11 ? ["$9,999", "$900", "$9", "$2"][Math.min(3, Math.floor(fs / 22))] : "$2"; const up = tk === "$9,999"; B.ticker(tk, up);
  B.board(n < 15 ? 0 : n === 15 ? 1 : n === 16 ? 1 : f < S(17) + 70 ? 1 : 2, n === 15 ? sp(S(15) + 10, S(15) + 60) : n === 17 ? sp(S(17) + 70, S(17) + 100) : 0);
  if (n === 15 && f < S(15) + 10) B.board(0); if (n === 17 && f >= S(17) + 100) B.board(2);
  B.disp("SOLD OUT", "", "#ff7f7f");
  // ---- people at the window ----
  const crazeOver = n > 9 || (n === 9 && fs > 120);
  R.win.forEach((k, i) => { const leave = n >= 12 ? sp(S(12) + 20 + i * 12, S(12) + 60 + i * 12) : 0; const gone = n > 12;
    if (gone || leave >= 1) { k.pose({ visible: false }); return; }
    k.pose({ pos: [k.x - leave * 6, 0, -5.55 - leave * 1.2], yaw: leave > 0 ? -PI / 2 : 0, lean: leave > 0 ? 0 : 0.15, armR: [-0.4, 0.1], elbowR: 0, armL: [-2.4, 0.3], elbowL: 0.6, face: n >= 10 ? "shock" : "happy", legL: leave > 0 ? 0.5 * Math.sin(f * 0.4) : 0, legR: leave > 0 ? -0.5 * Math.sin(f * 0.4) : 0 }); k.root.scale.setScalar(k.base); k.phone.visible = n >= 10 && n <= 11 && leave === 0; k.z.visible = !(n === 12 && f > S(12) + 10 + i * 12); });
  const hc = n < 12 ? 0 : n === 12 ? Math.round(48 * sp(S(12) + 10, Eo(12))) : 48; R.heap.forEach((z, i) => { if (i < hc) { z.position.set(...z.userData.hp); z.rotation.set(...z.userData.hr); } else z.position.y = -50; });
  R.di.pose({ visible: false });
  // ---- defaults ----
  const goldOnRing = !(n === 4 && fs > 70) && n !== 5 && !(n === 6 && fs < 40); const pat = n >= 7 && !(n === 7 && fs < 30);
  DX.hand.visible = pat;
  let fp = { pos: FP, yaw: -PI / 2 + 0.5, face: say("flip", "smug"), open: 0 }, tp = { pos: TP, yaw: 0.5, face: say("toast", "sad") }, pp = { pos: PIX, yaw: 0.3, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [-0.9, 0.2], elbowL: 0.6, armR: [-0.9, -0.2], elbowR: 0.6, face: say("pixi", "deadpan"), head: [0.2, 0.3, 0] };
  let dp = { pos: DP, yaw: -0.9, look: [-0.4, 0], tailY: n >= 7 && !(n === 7 && fs < 40) ? 0.9 * Math.sin(f * 0.6) : 0, tail: n >= 4 && n < 7 ? -0.3 : 0.25 };
  const sackOn = n <= 12 || (n === 13 && fs < 60); R.sack.position.set(SK[0], 0, SK[2]); R.sack.rotation.set(0, 0, n > 7 || (n === 7 && fs > 50) ? 1.4 : 0); if (!sackOn) R.sack.position.y = -50;
  const pileN = n === 1 ? Math.round(70 * sp(S(1) + 40, S(1) + 100)) : n < 13 ? 70 : n === 13 ? Math.round(70 * (1 - sp(S(13) + 10, S(13) + 40))) : 0;
  R.pile.forEach((c, i) => { if (i < pileN) { c.position.set(...c.userData.p); c.rotation.set(i * 0.3, 0, i * 0.5); } else c.position.y = -50; });
  if (n === 1) { const tip = X.smooth(sp(S(1) + 30, S(1) + 45)); R.sack.rotation.set(0, 0, tip * 1.4); fp = { ...fp, armR: [-1.2, -0.3], elbowR: 0.4, lean: 0.2 * tip }; if (fs > 40 && fs < 100) for (let i = 0; i < 4; i++) FX.push({ kind: "money", pos: [SK[0] - 0.5, 0.6, SK[2] + 0.2], size: 0.8, t: (fs - 40) / 60 + i * 0.1 }); }
  A.pose({ visible: false }); R.moth.position.y = -50; R.pcoins.forEach((c) => (c.position.y = -50)); R.pocket.forEach((p) => (p.visible = n >= 16)); R.gold.visible = true;
  const ring = () => { Dn.pose(dp); Dn.root.updateMatrixWorld(true); const v = new THREE.Vector3(); DX.ringPt.getWorldPosition(v); return v; };
  const handsMid = () => { T.pose(tp); T.root.updateMatrixWorld(true); const a = new THREE.Vector3(), b = new THREE.Vector3(); T.elbows[0].getWorldPosition(a); T.elbows[1].getWorldPosition(b); const fw = new THREE.Vector3(0, 0, 0.3).applyQuaternion(T.root.quaternion); return a.add(b).multiplyScalar(0.5).add(fw).add(new THREE.Vector3(0, 0.05, 0)); };
  const WIDE = { pos: [3.0, 2.6, 7.4], look: [3.9, 1.9, -1.0], fov: 54 };
  switch (n) {
    case 1: { cam = { pos: [3.2, 2.4, 5.2], look: [4.6, 1.8, -1.2], fov: 48 }; const fl = C.seg("pixi")[0]; if (f > fl - 20 && f < fl + 10) { const k = sp(fl - 20, fl); FX.push({ kind: "sparkle", pos: [X.lerp(SK[0] - 0.6, PIX[0] + 0.5, k), 0.5 + 1.6 * Math.sin(PI * k), X.lerp(SK[2], PIX[2] + 0.4, k)], size: 0.3, t: k }); } cam = WIDE; break; }
    case 2: hudOn = false; cam = { pos: [B.boardPos[0], 4.35, -2.75], look: [B.boardPos[0], 4.35, -4.93], fov: 42 }; break;
    case 3: { const hy = T.dims.H - T.dims.HH / 2; tp = { ...tp, yaw: 0.2, face: "shock", head: [fs < 40 ? -0.1 : fs < 70 ? -0.5 : 0, fs < 40 ? -0.8 : fs < 70 ? 0.2 : -0.9, 0] }; cam = { pos: [TP[0] - 0.3, hy, TP[2] + 3.0], look: [TP[0], hy - 0.05, TP[2]], fov: 40 }; break; }
    case 4: { const un = X.smooth(sp(S(4) + 20, S(4) + 45)), give = X.smooth(sp(S(4) + 50, S(4) + 75)), sit = X.smooth(sp(S(4) + 90, S(4) + 120));
      dp = { ...dp, head: [0.6 * un * (1 - sit), 0, 0], jaw: un > 0 && sit < 1 ? 0.5 : 0.05, squash: 0.1 * sit, tail: -0.4 };
      tp = { ...tp, yaw: 0.9, armL: [-1.2, 0.1], elbowL: 0.6 * give, armR: [-1.2, -0.1], elbowR: 0.6 * give, face: "sad" };
      const rp = ring(), hm = handsMid(); if (fs < 50) R.gold.position.copy(rp.clone().lerp(rp.clone().add(new THREE.Vector3(0, 0.6, 0.3)), un)); else R.gold.position.copy(rp.clone().add(new THREE.Vector3(0, 0.6, 0.3)).lerp(hm.add(new THREE.Vector3(0, 0.3, 0)), give));
      cam = { pos: [1.4, 2.4, 4.6], look: [3.2, 1.8, -0.4], fov: 46 }; break; }
    case 5: { tp = { ...tp, yaw: 0.9, armL: [-1.2, 0.1], elbowL: 0.6, armR: [-1.2, -0.1], elbowR: 0.6, face: "sad", head: fs < 70 ? [0, 1.6, 0] : [0.45, -0.3, 0] }; dp = { ...dp, squash: 0.1, tail: -0.4, head: [0.2, 0, 0] }; const hm = handsMid(); R.gold.position.copy(hm.add(new THREE.Vector3(0, 0.3, 0)));
      cam = fs < 70 ? { pos: [TP[0] - 1.0, 2.7, TP[2] + 2.6], look: [2.4, 1.9, -5.3], fov: 50 } : { pos: [DP[0] - 1.6, 2.4, DP[2] + 1.6], look: [DP[0], 2.2, DP[2]], fov: 44 }; break; }
    case 6: { const hook = X.smooth(sp(S(6) + 10, S(6) + 40)); tp = { ...tp, yaw: 0.9, armL: [-1.8 * hook - 1.2 * (1 - hook), 0.1], elbowL: 0.6, armR: [-1.8 * hook - 1.2 * (1 - hook), -0.1], elbowR: 0.6, face: say("toast", "deadpan") }; dp = { ...dp, squash: 0.1 * (1 - hook), tail: -0.4 };
      const rp = ring(), hm = handsMid(); if (fs < 40) R.gold.position.copy(hm.add(new THREE.Vector3(0, 0.3, 0)).lerp(rp, hook)); fp = { ...fp, face: say("flip", "smug"), armR: f > C.seg("flip", 1)[0] ? [-1.4, -0.3] : [0, 0.08], elbowR: 0.4 };
      cam = WIDE; break; }
    case 7: { const pt = X.smooth(sp(S(7) + 4, S(7) + 24)) * (1 - X.smooth(sp(S(7) + 34, S(7) + 50))); tp = { ...tp, yaw: 0.9, armR: [-2.6 * pt, -0.2], elbowR: 0.3, face: say("toast", "happy"), pos: [TP[0] + 0.5, 0, TP[2] - 0.2] }; dp = { ...dp, squash: 0.08 * pt };
      cam = { pos: [2.2, 3.2, 3.6], look: [3.6, 2.4, -0.6], fov: 48 }; if (fs > 50 && fs < 60) shk = [S(7) + 50, 0.03, 8]; break; }
    case 8: hudOn = false; cam = { pos: [B.clockPos[0], B.clockPos[1], -3.4], look: [B.clockPos[0], B.clockPos[1], -4.97], fov: 40 }; break;
    case 9: { const tap = Math.max(0, Math.sin(fs * 0.5)) * (fs < 30 ? 1 : 0); A.pose({ pos: [MACH[0] + 0.1, 3.15 + 1.0 + 0.1 * tap, -4.5], tap }); const ins = fs > 20 && fs < 110;
      cam = ins ? { pos: [B.smallPt[0], B.smallPt[1] - 0.01, -4.5], look: [B.smallPt[0], B.smallPt[1], -4.945], fov: 30 } : { pos: [4.4, 3.0, 0.8], look: [MACH[0], 3.4, -4.9], fov: 46 }; hudOn = !ins;
      const ad = C.seg("admin")[1]; if (f > ad) OV.push(stamp("BANNED: THE CRAZE", 0.9 + 0.1 * pop(ad, 6), 1, 960, 480)); if (fs > 112) A.pose({ visible: false }); break; }
    case 10: { cam = fs < 40 ? { pos: [2.3, 2.0, -2.2], look: [2.3, 1.6, -5.6], fov: 52 } : (() => { const k = R.win[2]; k.root.updateMatrixWorld(true); const v = new THREE.Vector3(); k.scr.getWorldPosition(v); return { pos: [v.x, v.y, v.z + 0.42], look: [v.x, v.y, v.z], fov: 30 }; })(); hudOn = fs < 40; break; }
    case 11: hudOn = false; cam = { pos: [B.tickerPos[0], 4.25, -2.5], look: [B.tickerPos[0], 4.25, -4.93], fov: 42 }; break;
    case 12: { const u = sp(S(12) + 30, Eo(12)); R.di.pose({ pos: [X.lerp(-1.0, 5.0, u), 0, -6.6], yaw: PI - 0.2 - PI, armR: [-1.4, -0.1], elbowR: 0.8, face: say("deinf", "happy"), legL: 0.4 * Math.sin(f * 0.4), legR: -0.4 * Math.sin(f * 0.4) }); R.di.root.rotation.y = PI / 2 + 0.6;
      cam = { pos: [2.6, 2.2, -2.7], look: [3.4, 1.3, -6.2], fov: 54 }; break; }
    case 13: { const leave = X.smooth(sp(S(13) + 50, S(13) + 100)); fp = { ...fp, pos: [X.lerp(FP[0], 5.6, leave), 0, X.lerp(FP[2], -5.8, leave)], yaw: X.lerp(-PI / 2 - 0.6, PI, leave), open: 0.25, armR: fs < 50 ? [-0.9, -0.4] : [0, 0.08], elbowR: 0.2, lean: fs < 50 ? 0.4 : 0, face: say("flip", "smug") };
      if (fs < 50) R.sack.position.set(SK[0], 0, SK[2]); else { F.pose(fp); F.root.updateMatrixWorld(true); const v = new THREE.Vector3(); F.elbows[0].getWorldPosition(v); R.sack.position.set(v.x, v.y - 1.2, v.z); R.sack.rotation.set(0, 0, 0); R.sack.scale.setScalar(0.7); }
      if (leave >= 1) fp = { visible: false }; cam = WIDE; break; }
    case 14: { fp = { visible: false }; tp = { ...tp, yaw: 0.3, face: say("toast", "sad"), head: [0.2, 0, 0] }; dp = { ...dp, pos: [DP[0], 0, DP[2]], blink: true, squash: 0.04 * Math.sin(f * 0.1), armUp: 1.2, head: [0.3, 0, 0] }; cam = { pos: [2.6, 2.2, 5.6], look: [2.9, 1.7, -0.6], fov: 44 }; break; }
    case 15: { fp = { visible: false }; tp = { ...tp, yaw: PI - 0.4, head: [-0.5, 0, 0], face: "shock" }; dp = { ...dp, blink: true, armUp: 1.2 }; cam = fs < 70 ? { pos: [B.boardPos[0] - 0.6, 3.6, -1.2], look: [B.boardPos[0], 4.3, -4.93], fov: 46 } : { pos: [2.6, 2.2, 5.6], look: [2.9, 2.2, -1.6], fov: 46 }; hudOn = fs >= 70; break; }
    case 16: { fp = { visible: false }; tp = { ...tp, yaw: 0.2, face: say("toast", fs < 30 ? "shock" : "sad"), armL: [-0.3, 0.5], armR: [-0.3, -0.5] }; dp = { ...dp, blink: true, armUp: 1.2 };
      const mk = sp(S(16) + 14, S(16) + 70); R.moth.position.set(TP[0] + 0.3 + 0.3 * Math.sin(mk * 9), 0.7 + mk * 2.0, TP[2] + 0.3); R.moth.userData.w.forEach((w, j) => (w.rotation.z = (j ? 1 : -1) * 0.8 * Math.sin(f * 1.6))); cam = { pos: [TP[0] + 0.2, 1.9, TP[2] + 3.4], look: [TP[0], 1.4, TP[2]], fov: 44 }; break; }
    case 17: { fp = { visible: false }; dp = { ...dp, blink: true, armUp: 1.2 }; const land = sp(S(17) + 4, S(17) + 20); R.pcoins.forEach((c, j) => { c.position.set(X.lerp(PIX[0] + 0.3, 1.9 + j * 0.2, land), 1.24 + 0.8 * Math.sin(PI * land), X.lerp(PIX[2] + 0.3, -1.4, land)); });
      tp = { ...tp, yaw: f > S(17) + 70 && f < S(17) + 110 ? PI - 0.6 : f >= S(17) + 110 ? -0.9 : 0.0, head: f > S(17) + 70 && f < S(17) + 110 ? [-0.4, 0, 0] : f >= S(17) + 110 ? [-0.1, -0.3, 0] : [0.3, 0, 0], face: say("toast", "shock") }; pp = { ...pp, face: say("pixi", "smug"), head: [0.1, 0.6, 0] };
      cam = f > S(17) + 70 && f < S(17) + 110 ? { pos: [B.boardPos[0] - 0.6, 3.6, -1.2], look: [B.boardPos[0], 4.3, -4.93], fov: 46 } : { pos: [-0.8, 2.3, 3.8], look: [1.3, 1.8, -0.8], fov: 46 };
      if (f >= S(17) + 100) OV.push(stamp("SOLD", 0.9 + 0.1 * pop(S(17) + 100, 6), f < S(17) + 110 ? 1 : 0, 1250, 380)); hudOn = !(f > S(17) + 70 && f < S(17) + 110); break; }
  }
  // gold zubbit on the ring (before 4's lift, after 6's hook)
  if (goldOnRing && !(n === 4)) { const rp = ring(); R.gold.position.copy(rp); }
  R.gold.rotation.set(0, Dn.root.rotation.y, 0); R.gold.scale.setScalar(1.4);
  if (fp.visible === false) F.pose({ visible: false }); else F.pose(fp);
  T.pose(tp); P.pose(pp); P.boardAt([PIX[0] - 0.7, 1.2, PIX[2] - 0.1], 0.3, 0, 0, true); Dn.pose(dp);
  unclip([T], {});
  if (hudOn) OV.push(hud({ label: "NIGHT 9 — BLACK FRIDAY", money: 0, gold: tk, goldUp: up, clock: clock + " AM", moneyPop: n === 16 && fs > 8 && fs < 20 ? 1.3 : 1 }));
  const sb = subs(D.SEG, t); if (sb) OV.push(sb);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
