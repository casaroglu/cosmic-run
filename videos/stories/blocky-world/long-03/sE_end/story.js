// Long 3 · End card and loop (5 shots). Last frame == first frame of the film (LOOP_POSE).
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { block, MACH } from "./common/block.js";
import { zubbit, toastExtras, dinoExtras, carabiner, cv, F as FF, INK } from "./common/l3.js";
import { loopProps, loopPose, LOOP_CAM, LOOP_LIGHT } from "./common/loop.js";
import { load, ctx, hud, subs, textO } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {};
const PI = Math.PI, LF = [4.3, 0, -3.4];
export async function build(E) {
  D = await load(meta);
  R.B = block(E); R.T = solid(makeToast(E)); R.TX = toastExtras(E, R.T); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D); R.L = loopProps(E);
  R.mc = carabiner(E, 0.9);
  R.heap = []; for (let i = 0; i < 40; i++) { const z = zubbit(E, "grey"); const a = i * 2.1, r = Math.sqrt(i) * 0.12; z.userData.hp = [3.2 + Math.cos(a) * r, 0.1 + Math.max(0, 0.5 - r) * 0.7, -2.2 + Math.sin(a) * r * 0.6]; z.userData.hr = [i, i * 1.7, i * 0.3]; z.scale.setScalar(1.3); R.heap.push(z); }
  R.broom = E.group(null, [0, -50, 0]); E.cyl(0.035, 0.035, 1.7, E.mat("#c79a5b"), [0, 0, 0], { parent: R.broom, seg: 8 }); E.box(0.6, 0.16, 0.18, E.mat("#e0262e"), [0, -0.05, 0], { parent: R.broom });
  R.lfb = E.group(null, LF); E.box(0.9, 0.6, 0.6, E.mat("#c79a5b", { map: E.T.planks("#c79a5b", 4) }), [0, 0, 0], { parent: R.lfb }); E.plane(0.86, 0.22, E.mat("#ffffff", { map: cv(512, 128, (g, w, h) => { g.fillStyle = "#c79a5b"; g.fillRect(0, 0, w, h); g.font = FF(54); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = INK; g.fillText("LOST & FOUND", w / 2, h / 2); }) }), [0, 0.32, 0.31], { parent: R.lfb, noShadow: true });
  R.redPack = E.group(null, [0, -50, 0]); E.box(0.62, 0.6, 0.3, E.mat("#e0262e"), [0, 0, 0], { parent: R.redPack });
}
export function frame(f0, E) {
  const C = ctx(f0, E, D), { X, n, fs, S, Eo, sp, pop, say, t } = C, f = f0, OV = [], FX = [];
  const { T, P, B, TX, DX, L } = R, Dn = R.D;
  let cam, light = ["interior", "night", 0.15];
  B.board(2); B.ticker("$2", false); B.clock("3:15", "AM"); B.disp(n >= 2 && fs > 60 || n > 2 ? "NOW SERVING" : "SOLD OUT", n >= 2 && fs > 60 || n > 2 ? "67" : "", n >= 2 && fs > 60 || n > 2 ? "#7dff7a" : "#ff7f7f");
  TX.goldHands(true); DX.hand.visible = true; TX.pack.visible = false; TX.straps.forEach((s) => s.scale.set(1, 1, 1)); L.car.visible = false; R.mc.visible = false; L.gold.visible = true; R.redPack.position.y = -50; R.broom.position.y = -50;
  const swept = n === 2 ? sp(S(2), Eo(2)) : n > 2 ? 1 : 0;
  R.heap.forEach((z, i) => { const out = i < swept * 40; const p = z.userData.hp; z.position.set(out ? 5.6 + (i % 5) * 0.1 : p[0], out ? -50 : p[1], out ? -5.6 : p[2]); z.rotation.set(...z.userData.hr); });
  let tp = { visible: false }, pp = { pos: [2.6, 0.17, -0.4], yaw: 0.25, face: say("pixi", "smug") }, dp = { pos: [6.2, 0, -1.0], yaw: -0.8, tailY: 0.6 * Math.sin(f * 0.4) };
  const ringGold = () => { Dn.pose(dp); Dn.root.updateMatrixWorld(true); const v = new THREE.Vector3(); DX.ringPt.getWorldPosition(v); L.gold.position.copy(v); L.gold.scale.setScalar(1.4); L.gold.rotation.set(0, Dn.root.rotation.y, 0); };
  const mouthCar = () => { Dn.pose(dp); Dn.root.updateMatrixWorld(true); const v = new THREE.Vector3(); Dn.jaw.getWorldPosition(v); const fw = new THREE.Vector3(0, 0, 0.45).applyQuaternion(Dn.root.quaternion); R.mc.visible = true; R.mc.position.set(v.x + fw.x, v.y + 0.2, v.z + fw.z); R.mc.rotation.set(0, Dn.root.rotation.y, 1.4); R.mc.scale.setScalar(0.55); };
  let loop = false;
  switch (n) {
    case 1: { cam = { pos: [3.0, 2.0, 3.6], look: [3.4, 2.6, -2.0], fov: 50 }; pp = { pos: [2.9, 0.17, -0.2], yaw: 0.1, face: say("pixi", "smug"), armR: fs > 60 && fs < 120 ? [-2.4, -0.4] : [0, 0], elbowR: 0.3 }; dp = { visible: false }; break; }
    case 2: case 3: { const sw = Math.sin(f * 0.35); const k = n === 2 ? sp(S(2), Eo(2)) : 1;
      tp = n === 2 ? { pos: [X.lerp(2.4, 4.6, k), 0, X.lerp(-1.6, -4.0, k)], yaw: PI - 0.5, armL: [-1.0 + 0.4 * sw, 0.2], elbowL: 0.6, armR: [-1.0 + 0.4 * sw, -0.2], elbowR: 0.6, face: "sad", legL: 0.3 * sw, legR: -0.3 * sw } : null;
      if (n === 2) { T.pose(tp); T.root.updateMatrixWorld(true); const v = new THREE.Vector3(); T.elbows[0].getWorldPosition(v); R.broom.position.set(v.x, 0.12, v.z - 0.5); R.broom.rotation.set(0.5, 0, 0.3 * sw); }
      if (n === 3) { const take = X.smooth(sp(S(3) + 10, S(3) + 40)), knee = X.smooth(sp(S(3) + 60, S(3) + 90));
        tp = { pos: [4.6, 0, -2.8], yaw: knee > 0 ? PI - 0.3 + 0 : 0.6, face: fs < 40 ? "sad" : say("toast", "deadpan"), armR: [-1.2 * (1 - knee), -0.2], elbowR: 0.4, legL: -1.3 * knee, kneeL: 1.6 * knee, legR: 0, kneeR: 1.4 * knee, pos2: 0 }; tp.pos = [4.6, -0.35 * knee, -2.8];
        if (take < 1) { R.redPack.position.set(X.lerp(LF[0], 5.0, take), X.lerp(0.4, 1.4, take), X.lerp(LF[2], -2.6, take)); } else TX.pack.visible = true; }
      dp = { pos: n === 2 ? [X.lerp(1.6, 3.4, k), 0, X.lerp(0.2, -1.8, k)] : [4.4, 0, -0.8], yaw: n === 2 ? PI - 0.6 : PI - 0.1, tailY: 0.8 * Math.sin(f * 0.5), legL: n === 2 ? 0.4 * Math.sin(f * 0.5) : 0, legR: n === 2 ? -0.4 * Math.sin(f * 0.5) : 0 }; mouthCar();
      cam = n === 2 ? { pos: [6.6, 2.4, 4.6], look: [5.6, 1.4, -2.6], fov: 52 } : { pos: [3.4, 2.0, -4.6], look: [4.5, 1.2, -2.0], fov: 52 };
      if (n === 3 && fs > 120) { R.mc.visible = false; }
      break; }
    case 4: cam = { pos: [2.8, 2.0, 2.6], look: [2.9, 1.6, -0.4], fov: 42 }; pp = { pos: [2.9, 0.17, -0.2], yaw: 0.1, face: say("pixi", "deadpan"), head: [0.45, 0, 0] }; dp = { visible: false }; break;
    case 5: loop = true; break;
  }
  if (loop) { P.pose({ visible: false }); P.boardAt([0, -50, 0], 0, 0, 0, false); loopPose(E, R, L, T, TX, Dn, DX); cam = { ...LOOP_CAM }; light = LOOP_LIGHT; R.heap.forEach((z) => (z.position.y = -50)); R.lfb.visible = false; } else R.lfb.visible = true;
  if (!loop) {
    if (tp && tp.visible !== false) T.pose(tp); else T.pose({ visible: false });
    if (pp.visible === false) { P.pose({ visible: false }); P.boardAt([0, -50, 0], 0, 0, 0, false); } else { P.pose(pp); P.boardAt([pp.pos[0], 0, pp.pos[2]], pp.yaw, 0, 0, true); }
    if (dp.visible === false) { Dn.pose({ visible: false }); L.gold.visible = false; } else ringGold();
    unclip([T, P], {});
  }
  if (n === 2) OV.push((g, w, h) => { const k = h / 1080; g.save(); g.fillStyle = "rgba(20,15,32,0.88)"; for (const y of [140, 580]) { g.beginPath(); g.roundRect(w * 0.6, y * k, w * 0.36, 360 * k, 24 * k); g.fill(); g.strokeStyle = "#ffffff"; g.lineWidth = 6 * k; g.stroke(); } g.restore(); textO("TOAST & PIXI", 300, 90, 84, { col: "#ffe14a" })(g, w, h); });
  if (n === 1) OV.push((g, w, h) => { const k = h / 1080; g.save(); g.fillStyle = "#e0262e"; g.beginPath(); g.roundRect(w - 420 * k, h - 260 * k, 340 * k, 90 * k, 20 * k); g.fill(); g.restore(); textO("SUBSCRIBE", 1670, 865, 52, { col: "#ffffff", stroke: "#e0262e", s: 0.95 + 0.05 * Math.sin(f * 0.2) })(g, w, h); });
  if (n <= 4 && n !== 2) OV.push(hud({ label: "NIGHT 9 — BLACK FRIDAY", money: 0, gold: "$2", goldUp: false, clock: "3:15 AM" }));
  const sb = subs(D.SEG, t); if (sb && !loop) OV.push(sb);
  return { cam, light, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
