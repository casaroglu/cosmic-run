// Long 4 · Scene 1 — 2013 to 2026: the wait (11 shots)
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { controller, adminHand } from "./common/props.js";
import { textO, subtitle, INK, F } from "./common/ui.js";
import { home, makeBread, chip, plusOne, P2, wpos, yearPanel, insertCanvas, card } from "./common/l4.js";
import { HOMELIGHT, LOOP } from "./common/loop.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {};
export async function build(E) {
  await loadTL(meta, R);
  Object.assign(R, home(E));
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.H = adminHand(E);
  R.B = [0, 1, 2, 3].map((i) => solid(makeBread(E, i)));
  R.coin = E.cyl(0.12, 0.12, 0.03, E.mat("#ffd23a"), [0, -50, 0], { seg: 16 });
  R.book = E.group(null, [0, -50, 0]); E.box(0.36, 0.48, 0.08, E.mat("#2f6fe0"), [0, 0, 0], { parent: R.book }); E.box(0.33, 0.45, 0.085, E.mat("#ffffff"), [0.02, 0.015, 0], { parent: R.book });
  R.receipt = card(400, 520, (g, w, h) => { g.fillStyle = "#fffdf4"; g.fillRect(0, 0, w, h); g.fillStyle = INK; g.textAlign = "center"; g.font = F(40); g.fillText("DONUT PLANET", w / 2, 60); g.font = "700 26px monospace"; g.fillText("19 NOV 2013", w / 2, 110); g.fillText("- - - - - - - - - - -", w / 2, 150);
    g.font = F(46); g.fillStyle = "#d8262e"; g.fillText("PRE-ORDER", w / 2, 230); g.font = F(86); g.fillText("No. 1", w / 2, 330); g.font = "700 26px monospace"; g.fillStyle = INK; g.fillText("MEGA DONUT HEIST 2", w / 2, 410); g.fillText("PAID: 1 COIN", w / 2, 450); g.fillText("COMING SOON", w / 2, 490); });
}
const YEARS = { 1: ["2013", 0, 0, 0.35, "#ffffff"], 2: ["2013", 0, 0, 0.35, "#ffffff"], 3: ["2013", 1, 0, 0.35, "#ffffff"], 4: ["2016", 1096, 2, 0.5, "#ff7fb8"], 5: ["2020", 2557, 2, 0.62, "#19e0c6"], 6: ["2023", 3653, 3, 0.75, "#ffe14a"], 7: ["2025", 4383, 3, 0.88, "#9b4dff"] };
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop, say } = C, OV = [], { T, P, D, H } = R;
  let cam, light = ["interior", "day", 0.5], dof = { focus: 6, amount: 0 }, grade = null;
  const Y = YEARS[n]; const old = !!Y; R.shop.clock(old ? "4:12" : "11:30", "PM");
  // ---- defaults ----
  let bread = old ? Y[2] : -1, bp = null, tp = null, handP = null, poster = old ? (n <= 2 ? "COMING SOON" : "NOT YET") : "OUT NOW";
  let pp = { ...LOOP.pixi, face: say("pixi", "deadpan") }, cupCol = old ? Y[4] : "#ffffff";
  let dScale = old ? Y[3] : 1.0; const dp = { pos: [5.0, 0.95 - (1 - dScale) * 0.55, -0.7], yaw: -0.5, pitch: -1.25, scale: dScale, blink: true, squash: 0.03 * Math.sin(f * 0.1) };
  R.coin.position.y = -50; R.book.position.y = -50; R.parcel.position.y = -50; R.bottle.position.set(-1.6, 1.2, -1.6); R.bottle.rotation.set(0, 0, 0); let bottleOn = n >= 4;
  const presses = []; // frames where the button is pressed (+1 floats up from it)
  const AT = [2.2, 0, -3.75], yawB = Math.PI / 2 + 0.5; // where he stands to press
  const pressPose = (who, pressing) => ({ pos: AT, yaw: yawB, armR: pressing ? [-0.95, 0.95] : [-0.3, 0.1], elbowR: 0.1, face: "happy" });
  switch (n) {
    case 1: { bp = { pos: [0.6, 0, 0.6], yaw: 0.15, face: say("bread", "grin"), armL: [-0.4, 0.3], armR: [-0.4, -0.3] }; const k = X.smooth(sp(S(1), S(1) + 40));
      handP = { pos: [3.1, 5.2 + 1.2 * (1 - k) + (fs > 60 ? (fs - 60) * 0.06 : 0), -4.0], tap: k > 0.9 && fs < 60 ? 1 : 0 }; poster = "COMING SOON"; cam = { pos: [1.4, 2.6, 8.4], look: [1.6, 2.0, -1.5], fov: 50 };
      OV.push((g, w, h) => { const p = P2(E, wpos(R.B[0].head, [0, 1.1, 0])); const k2 = h / 1080; g.save(); g.strokeStyle = "#ffe14a"; g.lineWidth = 9 * k2; g.lineCap = "round"; g.beginPath(); g.moveTo((p[0] - 230) * k2, (p[1] - 120) * k2); g.quadraticCurveTo((p[0] - 120) * k2, (p[1] - 140) * k2, (p[0] - 30) * k2, (p[1] - 20) * k2); g.stroke(); g.beginPath(); g.moveTo((p[0] - 30) * k2, (p[1] - 20) * k2); g.lineTo((p[0] - 70) * k2, (p[1] - 40) * k2); g.moveTo((p[0] - 30) * k2, (p[1] - 20) * k2); g.lineTo((p[0] - 40) * k2, (p[1] - 62) * k2); g.stroke(); g.restore(); textO("TOAST (BREAD)", p[0] - 300, p[1] - 150, 56, { col: "#ffe14a", rot: -0.08, s: pop(S(1) + 20, 6) })(g, w, h); }); break; }
    case 2: { // the coin, the receipt
      bp = { pos: [0.6, 0, -0.75], yaw: Math.PI - 0.2, armR: [-1.4, 0], elbowR: 0.2, face: "grin" }; const k = X.smooth(sp(S(2) + 10, S(2) + 35)); R.coin.position.set(X.lerp(0.4, 1.6, k), 1.19, -1.6);
      handP = { pos: [2.1, 1.62, -1.85], rot: [-Math.PI / 2, -0.4, 0], tap: 0 }; cam = { pos: [3.4, 2.1, 1.0], look: [0.9, 1.45, -1.2], fov: 46 };
      if (fs > 45) OV.push(insertCanvas(R.receipt.image, null, { h: 560 + 40 * X.smooth(sp(S(2) + 45, S(2) + 70)), dim: 0.55, rot: 0.04 })); break; }
    case 3: { const back = S(3) + 34, pr = S(3) + 50; let pos = AT; if (fs < 20) pos = [AT[0] - 0.9 * X.smooth(fs / 20), 0, AT[1] + 0.6 * X.smooth(fs / 20)]; else if (f < back) pos = [AT[0] - 0.9 * (1 - X.smooth((f - S(3) - 20) / 14)), 0, AT[2] + 0.6 * (1 - X.smooth((f - S(3) - 20) / 14))];
      bp = { ...pressPose(0, f >= pr && f < pr + 10), pos: [pos[0], 0, pos.length === 3 ? pos[2] : AT[2]], face: say("bread", "smug") }; presses.push(pr); poster = f >= pr + 12 ? "NOT YET" : "COMING SOON"; cam = { pos: [5.6, 2.0, -1.6], look: [1.6, 1.55, -3.9], fov: 48 }; break; }
    case 4: { // 2016: bottle flip, celebrate, press
      const land = S(4) + 30, pr = S(4) + 92; const k = sp(S(4) + 6, land); bottleOn = true;
      if (f < land) { R.bottle.position.set(X.lerp(3.8, 1.2, k), 1.2 + 2.2 * Math.sin(k * Math.PI), X.lerp(0.4, -1.6, k)); R.bottle.rotation.set(0, 0, k * Math.PI * 4); } else R.bottle.position.set(1.2, 1.2, -1.6);
      const cel = f > land && f < pr - 20; bp = f < pr - 20 ? { pos: [2.6, 0, -1.0], yaw: 2.5, armL: cel ? [-2.8, 0.5] : [-0.5, 0.2], armR: cel ? [-2.8, -0.5] : [-0.5, -0.2], face: cel ? "grin" : "happy", pos: [2.4, cel ? 0.2 * Math.abs(Math.sin(f * 0.5)) : 0, -1.2] } : pressPose(2, f >= pr && f < pr + 10);
      presses.push(pr); poster = "NOT YET"; cam = { pos: [5.2, 2.6, 3.4], look: [2.2, 1.6, -2.4], fov: 50 }; break; }
    case 5: { const pr = S(5) + 30; bp = { pos: [2.6, 0, -4.0], yaw: Math.PI / 2 + 0.3, armL: [-1.4, 0.1], elbowL: 1.2, armR: [0, 0.6], elbowR: 1.8, face: "deadpan", head: [0.4, 0, 0], lean: f >= pr && f < pr + 10 ? 0.15 : 0 }; R.bookOn = true; presses.push(pr);
      cam = { pos: [5.6, 2.0, -1.6], look: [1.6, 1.55, -3.9], fov: 48 }; break; }
    case 6: { poster = "TRAILER 2"; for (let i = 0; i < 10; i++) presses.push(S(6) + 8 + i * 7); const on = presses.some((p) => f >= p && f < p + 4); bp = { ...pressPose(3, on), face: "angry" }; cam = { pos: [5.6, 2.0, -1.6], look: [1.6, 1.55, -3.9], fov: 48 }; break; }
    case 7: { poster = "DELAYED"; const pr = S(7) + 24; bp = { pos: [2.6, 0, -3.95], yaw: Math.PI, lean: f >= pr - 6 ? 0.95 : 0.1, face: "sad", armL: [0, 0.2], armR: [0, -0.2] }; presses.push(pr); cam = { pos: [5.6, 2.0, -1.6], look: [1.6, 1.55, -3.9], fov: 48 }; break; }
    case 8: { const snap = S(8) + 52; poster = f >= snap ? "OUT NOW" : "DELAYED"; bread = f < snap ? 3 : -1; if (f < snap) bp = { pos: [2.6, 0, -3.95], yaw: Math.PI, lean: 0.95, face: "sad" }; else tp = { pos: [2.5, 0, -2.9], yaw: 0.4, face: "shock", armL: [-0.4, 0.3], armR: [-0.4, -0.3] };
      dScale = f < snap ? 0.88 : 1.0; dp.scale = dScale; cam = { pos: [5.6, 2.0, -1.6], look: [1.6, 1.55, -3.9], fov: 48 }; R.snap = snap; break; }
    case 9: { const fl = S(9) + 30, land = fl + 22; tp = { pos: [0.9, 0, 0.4], yaw: -0.2, armR: f < fl ? [-0.8 + 0.6 * Math.sin(fs * 0.4), 0.1] : [-2.2, 0.1], elbowR: f < fl ? 1.2 : 0.1, face: f > land ? say("toast", "grin") : "smug" }; const k = sp(fl, land);
      if (f < fl) { T.pose(tp); const a = wpos(T.elbows[1], [0, -0.45, 0.1]); R.bottle.position.set(a.x, a.y - 0.2, a.z); } else if (f < land) R.bottle.position.set(X.lerp(1.2, -0.4, k), X.lerp(1.6, 1.2, k) + 1.2 * Math.sin(k * Math.PI), X.lerp(0.5, -1.6, k)), R.bottle.rotation.set(k * Math.PI * 4, 0, 0); else R.bottle.position.set(-0.4, 1.2, -1.6);
      cam = { pos: [0.8, 2.1, 5.4], look: [0.0, 1.6, -0.8], fov: 44 }; if (f > land) OV.push(textO("2026", 1500, 300, 84, { col: "#ffe14a", s: pop(land, 6) }), textO("=", 1500, 390, 70, { col: "#ffffff", s: pop(land + 4, 6) }), textO("2016", 1500, 470, 84, { col: "#ffe14a", s: pop(land + 8, 6) })); break; }
    case 10: { tp = { pos: [0.9, 0, 0.6], yaw: -0.4, face: say("toast", "smug"), armL: [-0.3, 0.2], armR: [-0.3, -0.2] }; R.bottle.position.set(-0.4, 1.2, -1.6); pp = { ...pp, head: [0, -0.2, 0] }; cam = { pos: [0.6, 2.1, 5.0], look: [0.0, 1.8, -0.6], fov: 44 }; break; }
    case 11: { tp = { pos: [0.9, 0, 0.6], yaw: -0.1, face: "shock", armL: [-0.3, 0.3], armR: [-0.3, -0.3], head: [-0.25, 0, 0] }; R.bottle.position.set(-0.4, 1.2, -1.6); const k = X.smooth(sp(S(11), S(11) + 40));
      R.parcel.position.set(1.8, 1.5 + 3 * (1 - k), -1.75); handP = { pos: [1.8, 5.7 + 3 * (1 - k), -1.75], tap: 0 }; R.screenLight.color.set("#ffd27a"); R.screenLight.position.set(1.4, 2.2, 1.6); R.screenLight.intensity = 4 * k;
      cam = { pos: [0.8, 2.2, 6.2], look: [0.4, 2.0, -1.0], fov: 46 }; if (k > 0.9) OV.push(textO("✦", 1180, 420 + 10 * Math.sin(f * 0.3), 60, { col: "#ffe14a" }), textO("✦", 760, 480 + 10 * Math.cos(f * 0.3), 46, { col: "#ffe14a" })); break; }
  }
  if (n !== 11) R.screenLight.intensity = 0;
  // ---- pose ----
  R.B.forEach((B, i) => { if (i === bread && bp) B.pose(bp); else B.pose({ visible: false }); });
  if (tp) T.pose(tp); else T.pose({ visible: false });
  P.pose(pp); P.boardAt([0.1, 1.2, -1.8], 0.4, 0, 0, true); D.pose(dp); D.eyes.forEach((e) => (e.scale.y = 0.15));
  R.cups[0].position.set(-0.55, 1.2, -1.45); R.cups[0].children[0].material = E.mat(cupCol);
  if (!bottleOn) R.bottle.position.y = -50;
  if (R.bookOn && bread >= 0) { const B = R.B[bread]; const a = wpos(B.elbows[0], [0, -0.5, 0.15]); R.book.position.copy(a); R.book.rotation.set(-0.4, B.root.rotation.y, 0); } R.bookOn = false;
  if (handP) { H.pose({ pos: handP.pos, tap: handP.tap }); if (handP.rot) H.g.rotation.set(...handP.rot); } else H.pose({ visible: false });
  R.setPoster(poster);
  // button: pressed in, +1 floats up
  const down = presses.some((p) => f >= p && f < p + 5); R.btn.position.z = down ? -4.82 : -4.76;
  presses.forEach((p) => { if (f >= p && f < p + 16) OV.push((g, w, h) => { const q = P2(E, [3.0, 1.55, -4.7]); plusOne(q[0], q[1], f - p)(g, w, h); }); });
  // year panel look
  if (old || (n === 8 && f < R.snap)) { grade = { uSat: 0.72, uWarm: 0.09 }; OV.unshift(yearPanel(n === 8 ? "2025" : Y[0], n === 8 ? Math.round(4383 + (4748 - 4383) * X.smooth(sp(S(8), R.snap - 6))) : Y[1], 1, { pop: 1 })); }
  if (n === 8 && f >= R.snap) OV.push(textO("19 NOVEMBER 2026", 960, 150, 90, { col: "#ffffff", s: pop(R.snap, 6) }), textO("DAYS WAITED: 4,748", 960, 250, 64, { col: "#ffe14a" }));
  if (n === 8 && f < R.snap) OV.push(textO("DAYS WAITED: " + Math.round(4383 + (4748 - 4383) * X.smooth(sp(S(8), R.snap - 6))).toLocaleString("en-US"), 960, 540, 110, { col: "#ffe14a" }));
  if (n >= 9) OV.push(textO("NIGHT 10", 40, 60, 58, { align: "left", col: "#ffffff" }));
  const cur = C.seg(); if (cur) OV.push(subtitle(cur.text));
  unclip([T, P, ...R.B], { gap: 0.2 });
  return { cam, light: n >= 9 || (n === 8 && f >= R.snap) ? HOMELIGHT : light, dof, grade, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
