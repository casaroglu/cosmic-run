// Long 3 · Scene 2 — 10 PM: the line (15 shots). Outside: camera on the street side (z < -9) looking at the shop (+z); faces need yaw ~ PI.
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { hero } from "./common/props.js";
import { block, lineProps, topBlock } from "./common/block.js";
import { zubbit, carabiner, toastExtras, dinoExtras, person, clipZ, chair, knitBag, tent, turkeyPlate, phoneRig, ticketTex } from "./common/l3.js";
import { load, ctx, hud, subs, textO, atPt } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {};
const PI = Math.PI;
export const GR = [4.3, 0, -6.5], TQ = [5.9, 0, -6.9], DQ = [7.5, 0, -6.2], DI = [9.7, 0, -6.9], K66 = [8.7, 0, -7.0], K68 = [5.0, 0, -7.4], POST2 = [8.2, 0, -7.9], POST3 = [10.3, 0, -8.2], DSP = [5.15, 0, -6.05];
export const LX = [3.1, 2.2, 1.3, 0.3, -0.7, -1.7, -2.7, -3.7, -4.7, -5.7, -6.7, -7.6];
const LYAW = PI / 2 + 0.55;
export async function build(E) {
  D = await load(meta);
  R.B = block(E); R.L = lineProps(E); R.TB = topBlock(E); R.L.disp.visible = false;
  R.T = solid(makeToast(E)); R.TX = toastExtras(E, R.T); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D);
  R.G = hero(E, "gran"); R.chair = chair(E, null, [GR[0], 0, GR[2] + 0.2], "#3f8ad8"); R.chair.rotation.y = PI; R.kbag = knitBag(E, null, [GR[0] - 0.6, 0, GR[2] - 0.1]);
  R.line = LX.map((x, i) => { const k = person(E, i + 40, { kid: i % 5 === 2 }); if (i % 2 === 0) k.z = clipZ(E, k); k.sit = i % 3 === 1; if (k.sit) { k.ch = chair(E, null, [x, 0, -6.7], ["#57c84d", "#ff8a1f", "#3f8ad8"][i % 3]); k.ch.rotation.y = LYAW; } return k; });
  R.tents = [tent(E, [-0.6, 0, -8.6], "#57c84d", 0.1), tent(E, [-4.6, 0, -8.6], "#ff8a1f", -0.15), tent(E, [-8.2, 0, -8.4], "#4ac8c8", 0.2)];
  R.dtent = tent(E, [11.0, 0, -7.6], "#ff4fa3", PI / 2 + 0.2, 0.9);
  const tk = (k, n) => { const p = E.plane(0.3, 0.17, E.mat("#ffffff", { map: ticketTex(n), side: THREE.DoubleSide }), [0, -0.5, 0.18], { parent: k.elbows[1], noShadow: true }); p.rotation.x = -0.4; return p; };
  R.k66 = person(E, 66, { kid: true, hood: "#57c84d" }); tk(R.k66, "66"); R.k68 = person(E, 68, { kid: true, hood: "#ffd23a" }); tk(R.k68, "68");
  R.di = person(E, 77, { hood: "#c8a8f0" }); R.diZ = [0, 1, 2, 3, 4, 5, 6].map((i) => { const z = zubbit(E, "grey", { parent: R.di.bag }); z.position.set(0.1, 0.25 - (i % 4) * 0.13, 0.25 - Math.floor(i / 4) * 0.3 - (i % 2) * 0.12); z.rotation.y = PI / 2; z.scale.setScalar(0.85); return z; });
  E.plane(0.3, 0.17, E.mat("#ffffff", { map: ticketTex("12") }), [0.22, 0.5, 0.245], { parent: R.di.torso, noShadow: true });
  R.ring = phoneRig(E);
  const sil = E.mat("#d8dde6", { emissive: "#2a2e38" }); const post = (p) => { const g = E.group(null, p); E.cyl(0.16, 0.2, 0.06, sil, [0, 0, 0], { parent: g, seg: 12 }); E.cyl(0.04, 0.04, 1.0, sil, [0, 0, 0], { parent: g, seg: 8 }); E.sphere(0.07, sil, [0, 1.03, 0], { parent: g, seg: 10 }); return g; };
  post(POST2); post(POST3); R.dsp = post(DSP); const d = E.group(R.dsp, [0, 1.1, 0]); E.box(0.3, 0.36, 0.22, E.mat("#e0262e"), [0, 0, 0], { parent: d }); E.box(0.18, 0.04, 0.03, E.mat("#ffffff"), [0, 0.12, -0.12], { parent: d });
  R.chain2 = []; for (let k = 0; k < 9; k++) R.chain2.push(E.box(0.24, 0.04, 0.04, E.mat("#b8bcc6"), [0, -50, 0], { center: true, noShadow: true }));
  R.car = carabiner(E, 0.9); R.plate = turkeyPlate(E);
  R.tick = E.plane(1.2, 0.68, E.mat("#ffffff", { map: ticketTex("67") }), [0, -50, 0], {});
}
const hands = (f, ph, up = 1) => { const a = 0.32 * Math.sin(f * 0.42 + ph); return { armL: [-1.25 + a * up, 0.25], elbowL: 1.3, armR: [-1.25 - a * up, -0.25], elbowR: 1.3 }; };
export function frame(f0, E) {
  const C = ctx(f0, E, D), { X, n, fs, S, Eo, sp, pop, say, t } = C, f = f0, OV = [], FX = [];
  const { T, P, B, G, TX, DX, TB } = R, Dn = R.D;
  let cam, light = ["night", "interior", 0.3], shk = null, top = false, hudOn = true;
  B.ticker("$9,999"); B.led("DROP AT MIDNIGHT");
  const clock = ["10:00", "10:03", "10:05", "10:20", "10:20", "10:21", "10:22", "10:30", "10:40", "10:42", "10:50", "11:05", "11:05", "11:06", "11:07"][n - 1] || "11:10";
  R.line.forEach((k, i) => { const x = LX[i]; if (k.sit) k.pose({ pos: [x, 0.08, -6.62], yaw: LYAW, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, face: "happy", head: [0, Math.sin(f * 0.02 + i) * 0.3, 0] }); else k.pose({ pos: [x, 0, -6.6], yaw: LYAW - 0.2 + 0.25 * Math.sin(i), face: "happy", head: [0, 0.2 * Math.sin(f * 0.03 + i), 0] }); k.root.scale.setScalar(k.base); });
  G.pose({ pos: [GR[0], 0.42, GR[2]], yaw: PI - 0.25, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [-1.1, 0.2], elbowL: 0.9 + 0.15 * Math.sin(f * 0.5), armR: [-1.1, -0.2], elbowR: 0.9 - 0.15 * Math.sin(f * 0.5), face: say("gran", "smug"), head: [0.25, 0, 0] }); G.root.scale.setScalar(0.78);
  let tp = { pos: TQ, yaw: PI - 0.3, face: say("toast", "happy") }, pp = { visible: false }, dp = { pos: DQ, yaw: PI + 0.3, look: [-0.4, 0], tailY: 0.3 * Math.sin(f * 0.15) }, bp = null;
  const kp = (k, pos, yaw, h = false, ph = 0) => { k.pose({ pos, yaw, face: h ? "grin" : "happy", ...(h ? hands(f, ph) : {}) }); k.root.scale.setScalar(k.base); };
  kp(R.k66, K66, PI + 0.3); kp(R.k68, K68, PI - 0.3);
  R.di.pose({ pos: DI, yaw: PI - 0.35, armR: [-1.3, -0.1], elbowR: 0.8, face: say("deinf", "happy") }); R.ring.position.set(DI[0] - 0.5, 0, DI[2] - 1.3); R.ring.rotation.y = -0.35;
  R.dtent.rotation.set(0, PI / 2 + 0.2, 0); R.dtent.position.set(11.0, 0, -7.6);
  const drop = n === 14 ? X.easeIn(sp(S(14) + 26, S(14) + 38)) : n > 14 ? 1 : 0;
  R.chain2.forEach((m, k) => { const u = (k + 0.5) / 9, x = X.lerp(POST2[0], POST3[0], u), z = X.lerp(POST2[2], POST3[2], u), y0 = 0.95 - 0.26 * Math.sin(PI * u); m.position.set(x, X.lerp(y0, 0.03, drop * (1 - u * 0.7)), z); m.rotation.set(0, -Math.atan2(z - POST2[2], x - POST2[0]) * 0, drop * (1 - u) * 0.5); });
  R.car.position.set(POST2[0] + 0.06, 1.02, POST2[2]); R.car.rotation.set(0, 0, 0.15); R.car.scale.setScalar(0.55);
  R.plate.position.y = -50; R.tick.position.y = -50; TB.toast.visible = false;
  TB.fig.forEach((g) => g.userData.arms.forEach((a) => (a.rotation.x = 0)));
  switch (n) {
    case 1: tp = { visible: false }; dp = { visible: false }; cam = { pos: [0.5, 2.9, -17.5], look: [1.0, 2.0, -5.5], fov: 52 }; break;
    case 2: { const w = X.smooth(sp(S(2), S(2) + 40)); const p0 = [5.6, 0, -4.6], p1 = [5.3, 0, -7.2];
      tp = { pos: [X.lerp(p0[0], p1[0], w), w < 0.35 ? X.lerp(0, 0.4, w / 0.35) : X.lerp(0.4, 0, Math.min(1, (w - 0.35) / 0.3)), X.lerp(p0[2], p1[2], w)], yaw: PI + 0.6, face: say("toast", "smug"), legL: w < 1 ? 0.5 * Math.sin(f * 0.5) : 0, legR: w < 1 ? -0.5 * Math.sin(f * 0.5) : 0, armR: f > C.seg("toast")[0] ? [-0.6, 0.6] : [0, 0], elbowR: 1.2 };
      B.door.rotation.y = fs < 30 ? -1.2 * Math.sin(PI * Math.min(1, fs / 30)) : 0; dp = { visible: false };
      const sp1 = C.seg("gran")[0]; if (f > sp1 && f < sp1 + 10) FX.push({ kind: "sparkle", pos: [GR[0], 1.6, GR[2] - 0.4], size: 0.7, t: (f - sp1) / 10 });
      cam = { pos: [3.6, 2.0, -12.0], look: [4.8, 1.5, -6.6], fov: 40 }; break; }
    case 3: { const k = sp(S(3) + 6, S(3) + 6 + 120); if (fs < 132) { top = true; TB.toast.visible = true; const [x, z] = TB.path(0.004 + k * 0.996); TB.toast.position.set(x, 0.1, z + 1.3); TB.toast.scale.setScalar(1.6); OV.push(atPt(E, [x, 3.0, z + 1.3], "TOAST", 42, { col: "#ff8a1f" })); cam = { pos: [TB.x0, 52, 0.6], look: [TB.x0, 0, 0], fov: 33 }; }
      else { G.pose({ pos: [GR[0], 0.42, GR[2]], yaw: PI - 0.5, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armR: [-2.6 + 0.4 * Math.sin(f * 0.6), -0.3], elbowR: 0.3, face: "happy" }); G.root.scale.setScalar(0.78); cam = { pos: [5.2, 2.0, -11.6], look: [5.4, 1.5, -6.6], fov: 40 }; }
      tp = { pos: TQ, yaw: PI - 0.2, face: say("toast", "sad"), armL: [-0.3, 0.3] }; break; }
    case 4: { const pull = X.smooth(sp(S(4) + 18, S(4) + 32)); tp = { pos: TQ, yaw: PI + 0.9, face: "happy", armR: [-1.6 + 0.4 * pull, 0.2], elbowR: 0.3 }; cam = { pos: [4.6, 1.9, -10.2], look: [5.5, 1.4, -6.4], fov: 38 }; break; }
    case 5: { hudOn = false; tp = { visible: false }; const v = [3.0, 1.6, -14.6]; R.tick.position.set(...v); R.tick.rotation.set(0, PI, 0.06 * Math.sin(f * 0.1)); cam = { pos: [3.0, 1.6, -15.85], look: v, fov: 36 }; break; }
    case 6: { const h = f > S(6) + 10; kp(R.k66, K66, PI + 0.3, h, 0); kp(R.k68, K68, PI - 0.3, h, 1.5); tp = { pos: TQ, yaw: f > C.seg("toast", 2)[0] ? PI : PI - 0.7, face: say("toast", "shock"), head: [0, Math.sin(f * 0.2) * 0.4, 0] }; cam = { pos: [6.6, 1.7, -12.4], look: [6.8, 1.2, -6.8], fov: 44 }; break; }
    case 7: { top = true; cam = { pos: [TB.x0, 52, 0.6], look: [TB.x0, 0, 0], fov: 33 }; const w = sp(S(7), Eo(7) - 10); TB.fig.forEach((g) => { const on = g.userData.u < w * 1.05; g.userData.arms.forEach((a, j) => (a.rotation.x = on ? -2.6 + 0.4 * Math.sin(f * 0.4 + j * PI) : 0)); g.position.y = on ? 0.1 + 0.15 * Math.abs(Math.sin(f * 0.4)) : 0.1; }); tp = { visible: false }; break; }
    case 8: { const u = sp(S(8), Eo(8)); const px = X.lerp(9.0, 2.0, u); pp = { pos: [px, 0.17, -8.3], yaw: -PI / 2 - 0.55, face: say("pixi", "deadpan"), armL: [0, 0.2], armR: [0, 0.2] }; bp = [[px, 0, -8.3], PI / 2];
      kp(R.k66, K66, PI + 0.3, true, 0); kp(R.k68, K68, PI - 0.3, true, 1.5); R.line.slice(0, 4).forEach((k, i) => { if (!k.sit) { k.pose({ pos: [LX[i], 0, -6.6], yaw: PI - 0.3, ...hands(f, i), face: "grin" }); k.root.scale.setScalar(k.base); } });
      tp = { pos: TQ, yaw: PI - 0.6, face: "sad" }; cam = { pos: [px - 0.6, 2.0, -12.6], look: [px - 0.2, 1.4, -7.6], fov: 44 }; break; }
    case 9: case 10: {
      const u = n === 9 ? sp(S(9), Eo(9)) : 1; const xs = [-3.7, -1.7, 0.3, 2.2, 3.1, GR[0], TQ[0]]; const seg = Math.min(xs.length - 2, Math.floor(u * (xs.length - 1))), lu = u * (xs.length - 1) - seg;
      const px = X.lerp(xs[seg], xs[seg + 1], X.smooth(Math.min(1, lu * 1.6)));
      R.plate.position.set(px, 1.3 + 0.12 * Math.sin(lu * PI), -7.0); const bites = seg + (lu > 0.7 ? 1 : 0); R.plate.userData.t.scale.setScalar(Math.max(0.04, 1 - bites * 0.15));
      if (n === 10) { const give = X.smooth(sp(S(10) + 40, S(10) + 60)), eat = f > S(10) + 72; tp = { pos: TQ, yaw: PI + 0.5, face: fs < 40 ? "sad" : "deadpan", armR: [-1.2, -0.2], elbowR: 0.5, head: [0.3, 0, 0] }; R.plate.position.set(X.lerp(TQ[0] + 0.2, DQ[0] - 0.2, give), X.lerp(1.3, 2.2, give), X.lerp(-7.3, DQ[2] - 1.0, give)); R.plate.userData.t.scale.setScalar(0.04);
        if (eat) R.plate.position.y = -50; dp = { pos: DQ, yaw: PI + 0.5, jaw: f > S(10) + 60 && f < S(10) + 74 ? 1 : 0.1, look: [-0.4, -0.2], tailY: 0.5 * Math.sin(f * 0.4) }; cam = { pos: [5.4, 2.0, -12.0], look: [6.6, 1.6, -6.9], fov: 44 }; }
      else { R.line.forEach((k, i) => { const x = LX[i]; if (Math.abs(x - px) < 0.7) { k.pose({ pos: k.sit ? [x, 0.08, -6.62] : [x, 0, -6.6], yaw: PI - 0.2, armR: [-1.4, -0.1], elbowR: 0.6, face: "grin", ...(k.sit ? { legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5 } : {}) }); k.root.scale.setScalar(k.base); } }); if (Math.abs(GR[0] - px) < 0.7) G.pose({ pos: [GR[0], 0.42, GR[2]], yaw: PI - 0.25, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armR: [-1.4, -0.1], elbowR: 0.6, face: "grin" }); cam = { pos: [6.8, 2.4, -11.4], look: [0.8, 1.3, -6.6], fov: 46 }; }
      break; }
    case 11: { tp = { pos: TQ, yaw: PI / 2 + 0.7, face: say("toast", "smug") }; R.di.pose({ pos: DI, yaw: PI - 0.35, armR: [-1.3, -0.1], elbowR: 0.8, face: say("deinf", "happy"), head: [0, 0, 0] }); cam = { pos: [7.4, 2.0, -12.2], look: [8.1, 1.6, -6.9], fov: 42 }; break; }
    case 12: { cam = { pos: [5.0, 1.05, -8.4], look: [-3.0, 1.0, -6.6], fov: 48 }; R.line.forEach((k) => { if (k.z) k.z.rotation.z = 0.35 * Math.sin(f * 0.25 + k.ph); }); tp = { visible: false }; dp = { visible: false }; break; }
    case 13: { dp = { pos: DQ, yaw: PI + 0.3, head: [-0.15, 0, 0], look: [0, -1], tailY: 0 }; cam = { pos: [DQ[0] - 0.6, 1.95, DQ[2] - 2.3], look: [DQ[0] - 0.15, 2.4, DQ[2] - 0.3], fov: 30 }; break; }
    case 14: { const go = X.smooth(sp(S(14), S(14) + 24)), back = X.smooth(sp(S(14) + 40, S(14) + 80)); const tgt = [POST2[0] - 0.1, 0, POST2[2] + 1.3];
      dp = { pos: [X.lerp(DQ[0], tgt[0], go * (1 - back)), 0, X.lerp(DQ[2], tgt[2], go * (1 - back))], yaw: PI + 0.3 - 0.4 * go * (1 - back), head: [go * (1 - back) * 0.7, 0, 0], jaw: f > S(14) + 18 && f < S(14) + 26 ? 0.8 : 0.1, legL: 0.4 * Math.sin(f * 0.5), legR: -0.4 * Math.sin(f * 0.5) };
      const fold = X.smooth(sp(S(14) + 38, S(14) + 100)); R.dtent.rotation.set(0, PI / 2 + 0.2, fold * 1.3); R.dtent.position.set(11.0 - fold * 0.5, 0, -7.6);
      R.di.pose({ pos: DI, yaw: PI - 0.35, armR: [-1.3, -0.1], elbowR: 0.8, face: fold > 0.6 ? "shock" : "happy", head: [0, 0, 0] });
      cam = { pos: [7.0, 2.3, -13.6], look: [8.8, 1.3, -7.2], fov: 48 }; break; }
    case 15: { dp = { pos: [TQ[0] + 1.4, 0, TQ[2] + 0.4], yaw: PI - 0.9, head: [-0.45, 0, 0], jaw: 0.25, look: [-0.5, 0.2], tailY: 0.8 * Math.sin(f * 0.5) }; tp = { pos: TQ, yaw: PI + 0.25, face: say("toast", "deadpan"), armR: [-0.8, -0.4], elbowR: 0.4 }; cam = { pos: [5.6, 2.0, -12.2], look: [6.6, 1.8, -6.7], fov: 42 }; break; }
  }
  if (dp.visible !== false) Dn.pose(dp); else Dn.pose({ visible: false });
  if ((n === 14 && f > S(14) + 22) || n === 15) { Dn.root.updateMatrixWorld(true); const v = new THREE.Vector3(); Dn.jaw.getWorldPosition(v); const fw = new THREE.Vector3(0, 0, 0.45).applyQuaternion(Dn.root.quaternion); R.car.position.set(v.x + fw.x, v.y + 0.2, v.z + fw.z); R.car.rotation.set(0, Dn.root.rotation.y, 1.4); R.car.scale.setScalar(0.55); }
  T.pose(tp); if (pp.visible === false) P.pose({ visible: false }); else P.pose(pp); if (bp) P.boardAt(bp[0], bp[1], 0, 0, true); else P.boardAt([0, -50, 0], 0, 0, 0, false);
  unclip([T, P, R.k66, R.k68], {});
  if (hudOn) OV.push(hud({ money: 7, gold: "$9,999", clock: clock + " PM" }));
  const sb = subs(D.SEG, t); if (sb) OV.push(sb);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light: top ? { ...E.X.LIGHTS.night, fogNear: 400, fogFar: 900, hemiI: 1.1, amb: 0.45, sunI: 0.9 } : light, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
