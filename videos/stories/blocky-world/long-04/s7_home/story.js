// Long 4 · Scene 7 — Home: thirteen minutes (10 shots). Last frame = LOOP_POSE.
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { controller, adminHand } from "./common/props.js";
import { textO, subtitle, INK, F } from "./common/ui.js";
import { home, drawScreen, chip, P2, wpos, starIcon } from "./common/l4.js";
import { loopPose, DARK, HOMELIGHT, LOOP } from "./common/loop.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {};
export async function build(E) {
  await loadTL(meta, R);
  Object.assign(R, home(E));
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.H = adminHand(E);
  R.ctl = controller(E, null, [0, -50, 0], 0.5); R.star = E.box(0.07, 0.05, 0.07, E.flat("#fff27a"), [0, -50, 0], { noShadow: true });
  R.finger = E.box(0.09, 0.09, 0.26, E.mat("#ffcf9e"), [0, -50, 0], { center: true });
  R.light = E.plane(3.2, 3.2, E.flat("#ffffff", { transparent: true, opacity: 0, fog: false }), [-2.6, 6.18, 0.8], { rot: [Math.PI / 2, 0, 0], noink: true, noShadow: true });
}
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, "0")}`;
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop, say } = C, OV = [], { T, P, D, H } = R;
  let cam, light = HOMELIGHT, dof = { focus: 6, amount: 0 };
  R.shop.clock(n < 5 ? "12:01" : "12:13", "AM");
  // ---- clock of the patch ----
  const sec = { 1: 780 - fs / 30, 2: 720 - fs / 30, 3: 540 - fs / 30, 4: 300 - fs / 30, 5: 120 - fs / 30, 6: fs < 50 ? 20 - fs / 30 : fs < 80 ? 3 : fs < 105 ? 2 : 1 }[n] ?? 0;
  const done = n >= 7; const left = done ? "0:00" : mmss(sec);
  // ---- defaults ----
  const onHands = { pos: [-3.2, 0.03, 0.75], yaw: -Math.PI / 2 + 0.25, legL: -1.45, kneeL: 1.45, legR: -1.45, kneeR: 1.45, armL: [0.35, 0.05], elbowL: 0, armR: [0.35, -0.05], elbowR: 0, face: "deadpan" };
  let tp = { ...onHands }, pp = { ...LOOP.pixi, face: say("pixi", "deadpan") }, dp = { ...LOOP.dino, blink: true }, ctlAt = "counter", cup1 = null, sweat = 0, loop = false;
  R.bottle.position.set(-2.3, 1.2, -1.55); R.bottle.rotation.set(0, 0, 0); R.finger.position.y = -50; R.cups[1].position.y = -50;
  const scrCam = { pos: [R.TVX + 1.3, 1.6, R.TVZ], look: [R.TVX, 1.6, R.TVZ], fov: 40 };
  const medCam = { pos: [-4.7, 1.8, 3.2], look: [-2.7, 1.35, 0.2], fov: 46 };
  switch (n) {
    case 1: { const k = X.easeIn(sp(S(1), S(1) + 14)); tp = { ...onHands, pos: [-3.2, 0.03 + 6 * (1 - k), 0.75], face: fs > 40 ? say("toast", "deadpan") : "shock" }; dp = { pos: [0.2, 6 * (1 - X.easeIn(sp(S(1) + 6, S(1) + 20))), 2.2], yaw: -1.2, jaw: 0.3 };
      R.light.material.opacity = Math.max(0, 0.95 - fs / 20); cam = { pos: [-1.4, 2.6, 7.6], look: [-2.2, 1.6, 0], fov: 50 }; break; }
    case 2: { sweat = 1; tp = { ...onHands, face: "scared", head: [0, 0.15 * Math.sin(f * 0.3), 0] }; cam = medCam; dp = { pos: [0.6, 0, -0.2], yaw: -1.2 }; break; }
    case 3: { const tw = S(3) + 70; tp = { ...onHands, face: "blink", kneeR: f > tw && f < tw + 6 ? 1.0 : 1.45, legR: f > tw && f < tw + 6 ? -1.7 : -1.45 }; const k = X.smooth(sp(S(3), S(3) + 40));
      dp = { pos: [X.lerp(-0.4, -2.0, k), 0, X.lerp(2.6, 1.5, k)], yaw: -2.0, jaw: 0.5, legL: k < 1 ? Math.sin(f * 0.6) * 0.5 : 0, legR: k < 1 ? -Math.sin(f * 0.6) * 0.5 : 0, head: [0.3, 0, 0] }; ctlAt = "mouth";
      if (f > tw) { const kk = X.easeIn(sp(tw + 2, tw + 12)); R.bottle.rotation.set(0, 0, kk * Math.PI / 2); R.bottle.position.set(-2.3 + kk * 0.15, 1.2, -1.55); }
      cam = { pos: [-4.2, 2.0, 4.4], look: [-2.4, 1.3, 0.2], fov: 46 }; break; }
    case 4: { const bite = S(4) + 70; tp = { ...onHands, face: f > bite ? "angry" : "shock", lean: f > bite - 10 ? 0.9 : 0.1, head: f > bite - 10 ? [0.5, 0, 0] : [0.4, 0, 0] }; ctlAt = "floor"; dp = { pos: [-1.2, 0, 2.2], yaw: -2.2, head: [0.3, 0, 0] };
      const k = sp(S(4) + 10, bite); R.finger.position.set(X.lerp(-3.0, -3.9, k), 0.05 + 0.04 * Math.abs(Math.sin(f * 0.8)), X.lerp(1.2, 1.6, k)); R.finger.rotation.set(0, 0.6, 0.2 * Math.sin(f * 0.8));
      if (f > bite) R.finger.position.set(-3.7, 1.25, 1.0); cam = { pos: [-4.4, 1.3, 3.9], look: [-3.5, 0.7, 1.2], fov: 50 }; break; }
    case 5: { pp = { ...pp, yaw: 0.15, head: [0, -0.1, 0], face: say("pixi", "deadpan") }; cam = { pos: [-1.7, 2.6, 2.6], look: [-0.25, 2.3, -1.6], fov: 44 };
      OV.push((g, w, h) => { const k = h / 1080; g.save(); [[1080, 200], [1080, 580]].forEach(([x, y], i) => { const a = Math.min(1, (fs - 20 - i * 10) / 12); if (a <= 0) return; g.globalAlpha = a; g.fillStyle = "rgba(20,16,34,0.85)"; g.strokeStyle = "#ffffff"; g.lineWidth = 6 * k; g.beginPath(); g.roundRect(x * k, y * k, 760 * k, 330 * k, 26 * k); g.fill(); g.stroke(); }); g.restore(); }); break; }
    case 6: { const give = S(6) + 30; pp = { pos: [-2.5, 0, 2.0], yaw: -2.2, armL: f < give + 20 ? [-1.3, 0.1] : [0, 0.2], elbowL: 0.4, armR: f < give + 20 ? [-1.3, -0.1] : [0, 0.2], elbowR: 0.4, face: "deadpan" }; tp = { ...onHands, armL: f > give ? [-1.0, 0.25] : onHands.armL, elbowL: f > give ? 1.0 : 0, armR: f > give ? [-1.0, -0.25] : onHands.armR, elbowR: f > give ? 1.0 : 0, face: "scared" }; cup1 = f > give ? "toast" : "pixi"; ctlAt = "floor"; dp = { pos: [-1.0, 0, 2.6], yaw: -2.2 };
      cam = { pos: [-5.6, 2.1, 4.8], look: [-3.0, 1.4, 1.0], fov: 46 }; if (fs > 50) OV.push(textO(left, 960, 420, 220, { col: "#ff3d3d", s: pop(S(6) + (fs < 80 ? 50 : fs < 105 ? 80 : 105), 6) })); break; }
    case 7: { tp = { ...onHands, armL: [-1.0, 0.25], elbowL: 1.0, armR: [-1.0, -0.25], elbowR: 1.0, face: C.amp("toast") > 0.55 ? "talk" : "sad", head: [-0.1, 0, 0] }; cup1 = "toast"; ctlAt = "floor"; dp = { pos: [-1.0, 0, 2.6], yaw: -2.2 }; pp = { ...pp, face: say("pixi", "smug") };
      cam = medCam; OV.push(textO("DAYS WAITED: 4,748 + 13 MINUTES", 960, 900, 60, { col: "#7dff7a", s: pop(S(7) + 4, 8) }));
      OV.push((g, w, h) => { const p = P2(E, wpos(T.head, [0.38, 0.45, 0.46])); g.save(); g.fillStyle = "#8fd3ff"; g.globalAlpha = 0.9; const k = h / 1080; const yy = (fs * 3) % 90; g.beginPath(); g.ellipse(p[0] * k, (p[1] + yy) * k, 9 * k, 14 * k, 0, 0, 7); g.fill(); g.restore(); }); break; }
    case 8: { cam = { pos: [-6.6, 2.1, -2.4], look: [-6.6, 2.1, -4.95], fov: 44 }; const lit = S(8) + 40; R.setWin(f >= lit ? 1 : 0); if (f >= lit && f < lit + 6) OV.push((g, w, h) => { g.fillStyle = "rgba(127,246,255,0.25)"; g.fillRect(0, 0, w, h); }); break; }
    case 9: { const k = X.smooth(sp(S(9), S(9) + 26)); tp = { ...onHands, armL: [-1.05, 0.12], elbowL: 0.75, armR: [-1.15, -0.12], elbowR: 0.85, face: "happy", lean: 0.2 }; ctlAt = k > 0.5 ? "hands" : "floor"; cup1 = k < 0.5 ? "toast" : "crate"; cam = medCam; break; }
    case 10: { loop = fs >= 6; if (!loop) { tp = { ...LOOP.toast, face: "happy" }; ctlAt = "hands"; cam = medCam; } break; }
  }
  if (n !== 1) R.light.material.opacity = 0;
  // ---- pose ----
  let L = null;
  if (loop) { L = loopPose(R, f); cam = L.cam; light = L.light; dof = L.dof; R.cups[1].position.y = -50; R.star.position.y = -50; }
  else {
    T.pose(tp); P.pose(pp); if (pp.pos[1] > 0.5) P.boardAt([0.1, 1.2, -1.8], 0.4, 0, 0, true); else P.boardAt([-1.6, 0, 2.8], 0.4, 0, 0, true);
    D.pose(dp); D.eyes.forEach((e) => (e.scale.y = dp.blink ? 0.15 : 1));
    R.cups[0].position.set(-0.55, 1.2, -1.45); if (n === 6 && cup1 === "pixi") { P.root.updateMatrixWorld(true); const c = wpos(P.elbows[0], [0, -0.45, 0.1]); R.cups[1].position.set(c.x, c.y - 0.12, c.z); }
    const hm = () => { T.root.updateMatrixWorld(true); const a = wpos(T.elbows[0], [0, -0.42, 0]), b = wpos(T.elbows[1], [0, -0.42, 0]); return a.add(b).multiplyScalar(0.5); };
    if (cup1 === "toast") { const m = hm(); R.cups[1].position.set(m.x, m.y - 0.15, m.z); } else if (cup1 === "crate") R.cups[1].position.set(R.TVX, 1.02, R.TVZ + 0.55);
    if (ctlAt === "counter") { R.ctl.g.position.set(-2.3, 1.22, -1.75); R.ctl.g.rotation.set(0, 0.3, 0); }
    else if (ctlAt === "mouth") { D.root.updateMatrixWorld(true); const m = wpos(D.jaw, [0, 0.05, 0.55]); R.ctl.g.position.copy(m); R.ctl.g.rotation.set(0, D.root.rotation.y, 0); }
    else if (ctlAt === "floor") { R.ctl.g.position.set(-3.9, 0.06, 1.55); R.ctl.g.rotation.set(0, -1.2, 0); }
    else if (ctlAt === "hands") { const m = hm(); R.ctl.g.position.set(m.x, m.y - 0.02, m.z); R.ctl.g.rotation.set(0.5, tp.yaw, 0); }
    R.ctl.g.updateMatrixWorld(true); const sp3 = wpos(R.ctl.g, [0.17, 0.09, 0.05]); R.star.position.copy(sp3); R.star.scale.setScalar(1 + 0.4 * Math.abs(Math.sin(f * 0.15)));
    H.pose({ visible: false });
    R.screenLight.color.set(done ? "#7dff7a" : "#59e6ff"); R.screenLight.intensity = 1.6;
  }
  // screen + chip
  if (!loop) { const st = { s: "patch", title: "PATCH 1.03", pct: done ? 100 : 99, left, btn: false }; R.scrL.set(JSON.stringify(st), (g, w, h) => drawScreen(g, w, h, st)); }
  if (!loop) { OV.push(chip(left, { pct: done ? 100 : 99, green: done, label: done ? "PATCH 100%" : "1.03 · 99%" }));
    if (n !== 8) OV.push(textO("NIGHT 10", 40, 60, 58, { align: "left", col: "#ffffff" }));
    if (n <= 6 && n !== 5) OV.push(textO(left, 960, 120, 96, { col: n >= 6 ? "#ff3d3d" : "#ffffff" })); }
  if (sweat) OV.push((g, w, h) => { const p = P2(E, wpos(T.head, [-0.4, 0.8, 0.4])); for (let i = 0; i < 3; i++) { const yy = ((fs * 2 + i * 30) % 80); g.save(); g.fillStyle = "#8fd3ff"; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.ellipse((p[0] + i * 40) * h / 1080, (p[1] + yy) * h / 1080, 10 * h / 1080, 16 * h / 1080, 0, 0, 7); g.fill(); g.stroke(); g.restore(); } });
  const cur = C.seg(); if (cur && !loop) OV.push(subtitle(cur.text));
  if (!loop) unclip([T, P], { gap: 0.2 });
  return { cam, light, dof, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
