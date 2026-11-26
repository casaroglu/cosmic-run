// Toast & Pixi · T6 "One Box Per Person" — built from scripts/SHORTS-2_trending.md (15 shots)
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
export const meta = { fps: 30, tail: 2.45 };
let R = {}, SH = [], L = [];
const INK = "#221a26", FPS = 30;
const card = (E, w, h, draw) => { const { THREE } = E, c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const F = (px, k = 1, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
const H = 4.8, MACH = [2.7, 0, -3.2], TP = [1.6, 0, -1.7], PP = [0.0, 0, -1.2], DP = [4.2, 0, -1.9];
const NZ = 110, NB = 36;
// Toast-ball composition (shot 1 == shot 15)
const BALLP = [1.5, 1.15, -1.0];
const LOOP = { cam: { pos: [1.9, 1.85, 4.6], look: [1.5, 1.4, -1.0], fov: 46 } };

function zubbit(E, gold) {
  const { THREE } = E, g = E.group(null, [0, -50, 0]), body = gold ? E.mat("#ffc21a", { emissive: "#6a4a00" }) : E.mat("#9a9aa6"), dark = E.mat("#221a26");
  E.box(0.26, 0.22, 0.22, body, [0, 0, 0], { parent: g, center: true });
  E.box(0.22, 0.24, 0.18, body, [0, 0, 0], { parent: g, center: true });
  for (const s of [-1, 1]) E.box(0.05, 0.05, 0.02, dark, [s * 0.085, 0.035, 0.112], { parent: g, center: true, noShadow: true });
  E.box(0.13, 0.012, 0.01, dark, [0, -0.035, 0.112], { parent: g, center: true, noShadow: true });
  if (gold) { const d = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.013, 6, 12), E.mat("#ff7fb8")); d.position.set(0, -0.07, 0.12); E.add(d, g); }
  else E.box(0.055, 0.06, 0.02, E.mat("#ffffff"), [0, -0.068, 0.115], { parent: g, center: true, noShadow: true });
  for (const x of [-0.07, 0, 0.07]) E.box(0.04, 0.06, 0.04, body, [x, 0.14, 0], { parent: g, center: true });
  E.box(0.03, 0.03, 0.08, body, [0, -0.06, -0.15], { parent: g, center: true }); E.box(0.03, 0.05, 0.015, E.mat("#d8d8e0"), [0, -0.08, -0.2], { parent: g, center: true, noShadow: true });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 6, 14, Math.PI * 1.7), E.mat("#19e0c6")); ring.position.set(0, 0.2, 0); E.add(ring, g);
  return g;
}
function mysteryBox(E, qT) { const g = E.group(null, [0, -50, 0]), m = E.mat("#8a3ad8"), f = E.mat("#ffffff", { map: qT }); E.box(0.32, 0.3, 0.32, [m, m, m, m, f, m], [0, 0, 0], { parent: g, center: true }); const lid = E.group(g, [0, 0.15, -0.16]); E.box(0.34, 0.04, 0.34, E.mat("#a85af0"), [0, 0.02, 0.16], { parent: lid, center: true }); g.userData.lid = lid; return g; }

export async function build(E) {
  const { S, T, THREE } = E;
  try { SH = (await (await fetch("../work/timeline.json?v=" + Date.now())).json()).shots; } catch (e) { SH = []; }
  try { L = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) { L = []; }
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = solid(makeDonutsaurus(E));
  S.room({ w: 12, d: 10, h: H, wall: T.wallpaper("#ffd1e3", "#ffc2da", "stripe"), floor: T.tiles("#fff6fb", "#ffb3d4", 10), floorRep: 0.3, window: false, door: false, ceiling: true });
  E.box(12, 0.5, 0.1, E.mat("#ff7fb8"), [0, 0, -4.94]);
  E.plane(1.3, 2.6, E.flat("#1a1630"), [4.6, 1.3, -4.98], { noink: true }); for (const x of [3.9, 5.3]) E.box(0.14, 2.75, 0.14, E.mat("#ffffff"), [x, 0, -4.92]); E.box(1.54, 0.16, 0.14, E.mat("#ffffff"), [4.6, 2.68, -4.92]);
  const sign = card(E, 1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke(); g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.shadowColor = "#ff7fd0"; g.shadowBlur = 30; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6); g.shadowBlur = 0; });
  E.plane(4.2, 1.05, E.flat("#ffffff", { map: sign, fog: false }), [-2.2, 4.0, -4.93], { noink: true });
  S.counter(-2.6, -1.8, { w: 3.6, col: "#ff7fb8", top: "#fff6fb" });
  // poster above the machine
  const post = card(E, 800, 600, (g, w, h) => { g.fillStyle = "#2a1650"; g.fillRect(0, 0, w, h); g.lineWidth = 16; g.strokeStyle = "#ffc21a"; g.strokeRect(8, 8, w - 16, h - 16);
    g.fillStyle = "#ffc21a"; g.shadowColor = "#ffe27a"; g.shadowBlur = 30; g.beginPath(); g.roundRect(w / 2 - 130, 120, 260, 220, 40); g.fill(); for (const x of [-80, 0, 80]) g.fillRect(w / 2 + x - 22, 70, 44, 60); g.shadowBlur = 0;
    g.fillStyle = "#2a1650"; g.beginPath(); g.arc(w / 2 - 60, 210, 16, 0, 7); g.arc(w / 2 + 60, 210, 16, 0, 7); g.fill(); g.fillStyle = "#ff7fb8"; g.beginPath(); g.arc(w / 2, 290, 18, 0, 7); g.fill();
    g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#ffffff"; g.font = F(84); g.fillText("GOLD ZUBBIT", w / 2, 430); g.fillStyle = "#ffc21a"; g.font = F(76); g.fillText("1 IN 144", w / 2, 520); });
  E.plane(1.4, 1.05, E.flat("#ffffff", { map: post, fog: false }), [MACH[0], 3.55, -4.92], { noink: true });
  // the vending machine: pivot at its front-bottom edge so it can fall forward, face up
  const qT = card(E, 256, 256, (g, w, h) => { g.fillStyle = "#8a3ad8"; g.fillRect(0, 0, w, h); g.fillStyle = "#ffffff"; g.font = F(200); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("?", w / 2, h / 2 + 10); for (const x of [-50, 0, 50]) g.fillRect(w / 2 + x - 10, 14, 20, 28); });
  R.qT = qT;
  const mkMachine = (col, title, series) => { const pv = E.group(null, [MACH[0] - 0.75, 0, MACH[2]]), body = E.group(pv, [0.75, 0, -0.5]);
    E.box(1.5, 2.6, 1.0, E.mat(col), [0, 0, 0], { parent: body });
    const face = card(E, 600, 1040, (g, w, h) => { g.fillStyle = col; g.fillRect(0, 0, w, h); g.fillStyle = "#ffffff"; g.font = F(76); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("ZUBBIT", w / 2, 80); g.font = F(46); g.fillText(series || "MYSTERY BOX", w / 2, 150);
      g.fillStyle = "#1a1030"; g.fillRect(50, 200, 500, 420); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { g.fillStyle = "#a85af0"; g.fillRect(80 + c * 118, 230 + r * 130, 90, 90); g.fillStyle = "#fff"; g.font = F(70); g.fillText("?", 125 + c * 118, 282 + r * 130); }
      g.fillStyle = "#1a1030"; g.fillRect(150, 650, 300, 90);
      if (!series) { g.fillStyle = "#fffbe6"; g.fillRect(40, 780, 520, 230); g.lineWidth = 10; g.strokeStyle = INK; g.strokeRect(40, 780, 520, 230); g.fillStyle = INK; g.font = F(56); g.fillText("LIMIT:", w / 2, 830); g.font = F(62); const parts = [["1 BOX", "#ff2d2d"], [" PER", INK]]; let tw = parts.reduce((a, p) => a + g.measureText(p[0]).width, 0), x = w / 2 - tw / 2; g.textAlign = "left"; for (const [s, c] of parts) { g.fillStyle = c; g.fillText(s, x, 900); x += g.measureText(s).width; } g.textAlign = "center"; g.fillStyle = INK; g.fillText("PERSON", w / 2, 960); g.font = F(19, 1, 800); g.fillText("SAME PERSON = SAME ZUBBIT.", w / 2, 998); }
      else { g.fillStyle = "#ffe14a"; g.font = F(96); g.fillText("SERIES 2", w / 2, 880); } });
    E.plane(1.42, 2.46, E.mat("#ffffff", { map: face }), [0, 1.3, 0.505], { parent: body, noShadow: true });
    pv.userData.mark = E.group(body, [0, 0.29, 0.52]);
    return pv; };
  R.mach = mkMachine("#6a2ab8", null); R.mach2 = mkMachine("#ff8a1f", null, "SERIES 2");
  // boxes: flying boxes and opened empties on the floor
  R.fly = []; for (let i = 0; i < 10; i++) R.fly.push(mysteryBox(E, qT));
  let sd = 9; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  R.empties = []; for (let i = 0; i < NB; i++) { const b = mysteryBox(E, qT); b.userData.lid.rotation.x = -2.2; const a = rnd() * Math.PI * 2, r = 0.8 + rnd() * 2.4; b.userData.p = [TP[0] + Math.cos(a) * r, 0.15, TP[2] + 0.4 + Math.sin(a) * r * 0.7]; b.userData.r = rnd() * 3; R.empties.push(b); }
  // Zubbits clipped to Toast: 0-39 on the body, 40.. on a shell (the Toast-ball)
  const T0 = R.T, { TH, HH, HD } = T0.dims; R.clip = [];
  const zt = zubbit(E, false);
  for (let i = 0; i < NZ; i++) { const z = zt.clone(); let par, pos, rot;
    if (i < 40) { const k = i % 4; if (k === 0 || k === 1) { par = T0.torso; pos = [(rnd() - 0.5) * 0.7, 0.05 + rnd() * 0.62, (k ? -1 : 1) * 0.3]; rot = [0, k ? Math.PI : 0, (rnd() - 0.5) * 0.6]; } else { par = T0.arms[k - 2]; pos = [(k === 2 ? -1 : 1) * 0.17, -0.1 - rnd() * 0.5, 0.05 + (rnd() - 0.5) * 0.2]; rot = [0, (k === 2 ? -1 : 1) * Math.PI / 2, rnd()]; } }
    else { const u = (i - 40) / (NZ - 40), th = Math.acos(1 - 2 * ((u * 0.97 + 0.015) % 1)), ph = (i - 40) * 2.39996; const rr = 0.95; pos = [Math.sin(th) * Math.cos(ph) * rr, 0.55 + Math.cos(th) * rr * 1.05, Math.sin(th) * Math.sin(ph) * rr]; par = T0.chest; rot = [0, Math.atan2(pos[0], pos[2]), 0]; }
    par.add(z); z.position.set(...pos); z.rotation.set(...rot); z.scale.setScalar(i < 40 ? 1.0 : 1.5); z.visible = false; z.userData.hole = i >= 40 && ((pos[2] > 0.2 && pos[1] > 0.72) || (Math.abs(pos[0]) > 0.6 && Math.abs(pos[1] - 0.55) < 0.38 && pos[2] > -0.3)); R.clip.push(z); }
  zt.visible = false;
  R.pixiZ = zt.clone(); R.P.elbows[0].add(R.pixiZ); R.pixiZ.position.set(0, -0.62, 0.05); R.pixiZ.scale.setScalar(1.3);
  R.gold = zubbit(E, true); R.goldBox = mysteryBox(E, qT); R.handBox = mysteryBox(E, qT); R.T.elbows[1].add(R.handBox);
  // disguises on Toast's head
  const hd = T0.head, fz = HD / 2 + 0.03; R.dis = {};
  R.dis.stache = E.group(hd, [0, 0.27, fz]); E.box(0.42, 0.08, 0.04, E.mat("#2a1a10"), [0, 0, 0], { parent: R.dis.stache, center: true }); for (const s of [-1, 1]) E.box(0.12, 0.06, 0.04, E.mat("#2a1a10"), [s * 0.25, -0.03, 0], { parent: R.dis.stache, center: true, rot: [0, 0, s * 0.5] });
  R.dis.hat = E.group(hd, [0, HH + 0.02, 0]); E.box(0.9, 0.36, 0.7, E.mat("#ff7fb8"), [0, 0, 0], { parent: R.dis.hat }); E.box(0.92, 0.06, 0.72, E.mat("#ffffff"), [0, 0.18, 0], { parent: R.dis.hat });
  R.dis.glasses = E.group(hd, [0, 0.47, fz + 0.01]); for (const s of [-1, 1]) E.box(0.3, 0.24, 0.03, E.mat("#14101c"), [s * 0.2, 0, 0], { parent: R.dis.glasses, center: true }); E.box(0.2, 0.04, 0.03, E.mat("#14101c"), [0, 0.06, 0], { parent: R.dis.glasses, center: true });
  R.dis.wig = E.group(hd, [0, HH - 0.05, 0]); E.box(1.2, 0.34, 1.05, E.mat("#ffe14a"), [0, 0, 0], { parent: R.dis.wig }); for (const s of [-1, 1]) E.box(0.18, 0.6, 0.9, E.mat("#ffe14a"), [s * 0.58, -0.45, 0], { parent: R.dis.wig });
  R.dis.phones = E.group(hd, [0, 0, 0]); E.box(1.26, 0.1, 0.16, E.mat("#23232e"), [0, HH + 0.1, 0], { parent: R.dis.phones }); for (const s of [-1, 1]) E.box(0.16, 0.38, 0.38, E.mat("#19e0c6"), [s * 0.6, 0.25, 0], { parent: R.dis.phones });
  R.dis.cone = E.group(hd, [0, HH, 0]); E.cone(0.38, 0.9, E.mat("#ff6a1f"), [0, 0, 0], { parent: R.dis.cone }); E.cyl(0.3, 0.32, 0.12, E.mat("#ffffff"), [0, 0.3, 0], { parent: R.dis.cone });
  // fake hand for the INSERT
  R.hand = E.group(null, [0, -50, 0]); E.box(0.16, 0.5, 0.17, E.mat("#23232e"), [0, 0.12, 0], { parent: R.hand, center: true }); E.box(0.17, 0.05, 0.18, E.mat("#19e0c6"), [0, -0.14, 0], { parent: R.hand, center: true }); E.box(0.15, 0.13, 0.16, E.mat("#c98d62"), [0, -0.23, 0], { parent: R.hand, center: true }); E.box(0.045, 0.15, 0.05, E.mat("#c98d62"), [0.0, -0.36, 0.04], { parent: R.hand, center: true });
}

// ---------- overlays ----------
const banner = (txt, s, a = 1, col = "#ffe14a", y = 560) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, y * k); g.rotate(-0.07); g.scale(s, s);
  g.fillStyle = "#ff4d1f"; g.strokeStyle = INK; g.lineWidth = 18 * k; g.lineJoin = "round"; g.beginPath(); const n = 22; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 0.8 : 1, an = (i / (n * 2)) * Math.PI * 2, px = Math.cos(an) * 640 * k * r, py = Math.sin(an) * 250 * k * r; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke(); g.fill();
  g.font = F(178, k); g.textAlign = "center"; g.textBaseline = "middle"; g.lineWidth = 34 * k; g.strokeText(txt, 0, 8 * k); g.fillStyle = "#b8320a"; g.fillText(txt, 8 * k, 20 * k); g.fillStyle = col; g.fillText(txt, 0, 8 * k); g.restore(); };
const label = (txt, y, size, a = 1, col = "#ffe14a", s = 1, x = 540) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(x * k, y * k); g.scale(s, s); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(size, k); g.lineWidth = size * 0.2 * k; g.strokeStyle = INK; g.strokeText(txt, 0, 0); g.fillStyle = col; g.fillText(txt, 0, 0); g.restore(); };

export function frame(f0, E) {
  const X = E.X, THREE = E.THREE, OV = [], FXS = [];
  const { T, P, D } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  const IMP = S(9) + 44; const f = f0 > IMP && f0 <= IMP + 4 ? IMP : f0;
  const t = f / FPS, sp = (a, b) => X.span(f, a, b), pop = (a, k = 9) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  let n = 1; while (n < 15 && f0 >= S(n + 1)) n++;
  const fs = f - S(n);
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const OPEN = { happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", angry: "angry", talk: "talk", sad: "talk" };
  const say = (who, base) => (amp(who) > 0.55 ? OPEN[base] || "talk" : base);
  let cam, flash = 0, shk = null, light = ["interior", "night", 0.3], grade = null, caption = true;
  // ---- box count over time ----
  const B1 = S(2) + 18, B2 = S(4) + 14, B3 = S(4) + 44, B5a = S(5) + 6, B5b = Eo(5) - 4, B6a = S(6) + 12, B6b = S(6) + 62;
  let boxes = 0; if (f >= B1) boxes = 1; if (f >= B2) boxes = 2; if (f >= B3) boxes = 3;
  if (f >= B5a) boxes = Math.max(boxes, Math.round(X.lerp(4, 40, sp(B5a, B5b)))); if (f >= B6a) boxes = Math.round(X.lerp(40, 144, X.smooth(sp(B6a, B6b))));
  const loopEnd = n === 1 || n === 15;
  if (loopEnd || n >= 7) boxes = 144;
  const gold = n === 11 ? (fs > 30 ? 1 : 0) : n === 12 ? (f < S(12) + 40 ? 1 : 0) : 0;
  const ball = boxes >= 100;
  // ---- reset ----
  [T, P, D].forEach((q) => q.pose({ visible: false })); P.boardAt([-0.9, 0.0, -2.4], 0.3, 0, 0, true);
  R.fly.forEach((b) => b.position.set(0, -50, 0)); R.gold.position.set(0, -50, 0); R.goldBox.position.set(0, -50, 0); R.handBox.visible = false; R.hand.position.set(0, -50, 0); R.pixiZ.visible = false;
  Object.values(R.dis).forEach((d) => (d.visible = false));
  R.mach.rotation.set(0, 0, 0); R.mach.position.set(MACH[0] - 0.75, 0, MACH[2]); R.mach2.position.set(MACH[0], -50, MACH[2]); R.mach2.rotation.set(0, 0, 0);
  // clipped plush
  R.clip.forEach((z, i) => { z.visible = i < 40 ? i < Math.min(40, boxes) && !(n === 7 && i === 0 && f >= S(7) + 8) : boxes >= 40 + (i - 40) * 1.48 + 2 && !z.userData.hole; });
  // empties on the floor (from shot 5 on)
  const nEmpty = f < B5a ? 0 : Math.round(NB * Math.min(1, boxes / 144));
  R.empties.forEach((b, i) => { if (i >= nEmpty) { b.position.set(0, -50, 0); return; } b.position.set(...b.userData.p); b.rotation.set(0, b.userData.r, 0); });
  // machine state: falls in shot 9, stays down; Series 2 sits on it from shot 14 (and in the loop frames)
  const fallK = n === 9 ? X.easeIn(sp(S(9) + 28, IMP)) : (n >= 10 || loopEnd) ? 1 : 0;
  R.mach.rotation.z = 0.95 * fallK;
  const s2 = n === 14 ? X.easeIn(sp(S(14), S(14) + 8)) : loopEnd ? 1 : 0;
  if (s2 > 0) { R.mach2.position.set(MACH[0] - 0.75, X.lerp(7, 0, s2), MACH[2]); R.mach2.rotation.set(0, 0, 0); }
  // Toast-ball pose: centre point c, roll angle (body hidden under the shell)
  const ballPose = (c, roll = 0, o = {}) => { const ch = 0.62 + 0.55; const root = [c[0] + Math.sin(roll) * ch, c[1] - Math.cos(roll) * ch, c[2]]; T.pose({ pos: root, roll, yaw: o.yaw ?? 0, armL: [-0.2, 1.35], armR: [-0.2, 1.35], elbowL: o.reach ? 0 : 0.3, elbowR: o.reach ? 0 : 0.3, legL: 0, legR: 0, face: o.face || "shock", eyePop: o.eyePop ?? 1, headScale: 1 }); };
  const disguise = (name) => { if (R.dis[name]) R.dis[name].visible = true; };

  switch (n) {
    case 1: case 15: { // the Toast-ball, popped eyes, two hands
      ballPose(BALLP, 0, { face: n === 1 ? say("toast", "scared") : "shock" });
      D.pose({ pos: DP, scale: 1, yaw: -0.7, look: [-0.5, 0], tailY: 0.3 * Math.sin(f * 0.2) });
      cam = { ...LOOP.cam };
      if (n === 1) { OV.push(label("144 BOXES.", 290, 118, pop(2, 8), "#ffffff", 0.9 + 0.1 * pop(2, 8)), label("ZERO GOLD.", 420, 118, pop(6, 8), "#ffc21a", 0.9 + 0.1 * pop(6, 8))); }
      else { caption = false; OV.push(label("BOXES: 0", 120, 80, 1, "#ffe14a", 0.7 + 0.3 * pop(S(15) + 4, 6))); }
      break; }
    case 2: { // first box: grey. Face drops. Clips it on. Pixi points at the sign
      const opened = f >= B1; R.handBox.visible = f < B1 + 6; R.handBox.position.set(0, -0.62, 0.15); R.handBox.userData.lid.rotation.x = opened ? -2.2 : 0;
      T.pose({ pos: TP, yaw: -0.35, armR: [-1.1, 0.1], elbowR: 0.7, armL: [-0.2, 0.2], face: f < B1 ? "grin" : f < B1 + 14 ? "shock" : "sad" });
      P.pose({ pos: PP, yaw: 0.6, armR: [-1.4, -0.5], elbowR: 0.1, armL: [0, 0.1], face: say("pixi", "deadpan") });
      D.pose({ pos: DP, scale: 1, yaw: -0.8, look: [-0.6, 0], tailY: 0.3 * Math.sin(f * 0.2) });
      if (f >= B1 && f < B1 + 8) FXS.push({ kind: "puff", pos: [TP[0] - 0.4, 1.4, TP[2] + 0.5], size: 0.5, t: (f - B1) / 8 });
      cam = fs < 34 ? { pos: [MACH[0], 0.75, MACH[2] + 1.5], look: [MACH[0], 0.5, MACH[2]], fov: 50 } : { pos: [1.3, 2.0, 4.6], look: [1.7, 1.45, -2.4], fov: 50 };
      if (fs < 34) caption = false;
      break; }
    case 3: { // CU: paper moustache, serious
      disguise("stache");
      T.pose({ pos: TP, yaw: -0.45, armR: [-0.3, 0.1], armL: [-0.2, 0.2], face: say("toast", "deadpan") });
      const hy = T.dims.H - T.dims.HH / 2; cam = { pos: [TP[0] - 0.6, hy - 0.1, TP[2] + 4.6], look: [TP[0] - 0.1, hy - 0.05, TP[2]], fov: 40 };
      const q = pop(S(3) + 12, 8); OV.push(label("DIFFERENT PERSON", 330, 80, q, "#ffffff", 0.9 + 0.1 * q), label("↓", 430, 110, q, "#ffe14a"));
      break; }
    case 4: { // two more boxes, grey, grey; moustache -> donut-box hat
      disguise(f < S(4) + 30 ? "stache" : "hat");
      const near = (f >= B2 - 8 && f < B2 + 6) || (f >= B3 - 8 && f < B3 + 6); R.handBox.visible = near; R.handBox.position.set(0, -0.62, 0.15); R.handBox.userData.lid.rotation.x = (f >= B2 && f < B2 + 6) || f >= B3 ? -2.2 : 0;
      T.pose({ pos: TP, yaw: -0.3, armR: [-1.1, 0.1], elbowR: 0.7, armL: [-0.2, 0.2], face: say("toast", "smug") });
      P.pose({ pos: PP, yaw: 0.6, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      D.pose({ pos: DP, scale: 1, yaw: -0.8, look: [-0.6, 0] });
      for (const b of [B2, B3]) if (f >= b && f < b + 8) FXS.push({ kind: "puff", pos: [TP[0] - 0.4, 1.4, TP[2] + 0.5], size: 0.5, t: (f - b) / 8 });
      cam = { pos: [1.3, 2.0, 4.6], look: [1.7, 1.45, -2.4], fov: 50 };
      break; }
    case 5: { // a new disguise every half second; boxes fly open, every one grey
      const dz = ["glasses", "wig", "phones", "cone"], di = Math.min(3, Math.floor(fs / 15) % 4); disguise(dz[di]);
      T.pose({ pos: TP, yaw: -0.2, armR: [-1.3, 0.3 * Math.sin(f * 0.6)], elbowR: 0.4, armL: [-1.3, 0.3 * Math.cos(f * 0.6)], elbowL: 0.4, face: say("toast", "grin") });
      P.pose({ pos: PP, yaw: 0.6, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      D.pose({ pos: DP, scale: 1, yaw: -0.8, look: [-0.6, 0], head: [0, 0, 0.15 * Math.sin(f * 0.3)] });
      R.fly.forEach((b, i) => { const a = S(5) + i * 8, k = sp(a, a + 14); if (k <= 0 || k >= 1) return; const p0 = [MACH[0] - 0.3, 0.9, MACH[2] + 0.1], p1 = [TP[0], 1.5, TP[2] + 0.4]; b.position.set(X.lerp(p0[0], p1[0], k), X.lerp(p0[1], p1[1], k) + 1.2 * Math.sin(Math.PI * k), X.lerp(p0[2], p1[2], k)); b.rotation.set(k * 6, k * 4, 0); b.userData.lid.rotation.x = k > 0.8 ? -2.2 : 0; });
      cam = { pos: [0.9, 2.5, 6.4], look: [1.8, 1.4, -2.0], fov: 52 };
      break; }
    case 6: { // hugs the machine and shakes it; boxes pour out; he becomes a ball
      const k = X.smooth(sp(S(6), S(6) + 10)), bk = X.smooth(sp(S(6) + 40, S(6) + 70));
      R.mach.rotation.z = 0.06 * Math.sin(f * 1.3) * (f > S(6) + 8 && f < S(6) + 60 ? 1 : 0);
      if (!ball) T.pose({ pos: [X.lerp(TP[0], MACH[0] - 0.2, k), 0, X.lerp(TP[2], MACH[2] + 0.55, k)], yaw: Math.PI * 0.95, armL: [-1.4, 0.2], armR: [-1.4, 0.2], elbowL: 0.6, elbowR: 0.6, face: "grin" });
      else ballPose([X.lerp(MACH[0] - 0.2, BALLP[0], bk), BALLP[1], X.lerp(MACH[2] + 1.2, BALLP[2], bk)], 0, { face: "shock" });
      R.fly.forEach((b, i) => { const a = S(6) + 10 + i * 5, kk = sp(a, a + 12); if (kk <= 0 || kk >= 1) return; const ang = i * 2.1; b.position.set(MACH[0] + Math.cos(ang) * kk * 1.4, 0.9 + 1.0 * Math.sin(Math.PI * kk) - 0.75 * kk, MACH[2] + 0.6 + Math.abs(Math.sin(ang)) * kk * 1.5); b.rotation.set(kk * 6, kk * 3, 0); b.userData.lid.rotation.x = kk > 0.7 ? -2.2 : 0; });
      P.pose({ pos: PP, yaw: 0.6, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      D.pose({ pos: DP, scale: 1, yaw: -0.9, look: [-0.6, 0] });
      cam = { pos: [1.0, 2.6, 7.2], look: [1.9, 1.4, -2.0], fov: 52 };
      if (f > S(6) + 8 && f < S(6) + 60) shk = [S(6) + 8, 0.03, 52];
      break; }
    case 7: { // Pixi lifts one grey Zubbit off him by its clip and looks at it
      ballPose(BALLP, 0, { face: "sad", eyePop: 1 });
      const lift = X.smooth(sp(S(7) + 4, S(7) + 16)); R.pixiZ.visible = f >= S(7) + 8;
      P.pose({ pos: [0.2, 0, -0.6], yaw: 0.5, armL: [X.lerp(-1.4, -1.9, lift), 0.1], elbowL: X.lerp(0.2, 1.0, lift), armR: [-0.75, 0.7], elbowR: 1.9, head: [0.15, 0.25, 0], face: say("pixi", "deadpan") });
      D.pose({ pos: DP, scale: 1, yaw: -0.9 });
      cam = { pos: [0.4, 2.0, 4.6], look: [0.8, 1.55, -0.8], fov: 50 };
      break; }
    case 8: { // CRASH: the Toast-ball, eyes pop
      const z = X.back(sp(S(8), S(8) + 6)), ep = X.spring(sp(S(8) + 2, S(8) + 14));
      ballPose(BALLP, 0, { face: "shock", eyePop: 0.6 + 0.6 * ep });
      const hy = BALLP[1] + 0.62; cam = { pos: [BALLP[0], X.lerp(1.6, hy, z), X.lerp(BALLP[2] + 5, BALLP[2] + 3.0, z)], look: [BALLP[0], X.lerp(1.3, hy - 0.05, z), BALLP[2]], fov: 46 };
      shk = [S(8) + 1, 0.05, 6];
      break; }
    case 9: { // tries to walk, tips over, rolls into the machine; it falls on him. Fail screen
      const tip = X.easeIn(sp(S(9) + 4, S(9) + 16)), roll = X.smooth(sp(S(9) + 14, S(9) + 34));
      const c = [X.lerp(BALLP[0], MACH[0] - 2.1, roll), BALLP[1], X.lerp(BALLP[2], MACH[2] + 0.1, roll)];
      ballPose(c, 0.5 * tip + roll * 4.5, { face: f >= IMP ? "dizzy" : "scared" });
      D.pose({ pos: DP, scale: 1, yaw: -0.9 }); P.pose({ pos: PP, yaw: 0.6, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      if (f >= IMP) { grade = { uSat: 0.35 }; shk = [IMP, 0.22, 10]; flash = f0 <= IMP + 2 ? 0.4 : 0;
        const b0 = IMP + 1, sc = f < b0 + 5 ? X.lerp(3.2, 1, X.easeIn(sp(b0, b0 + 5))) : 1 + 0.06 * Math.sin((f - b0 - 5) * 1.2) * Math.max(0, 1 - (f - b0 - 5) / 10); OV.push(banner("TOASTED!", sc)); caption = false; }
      cam = { pos: [0.6, 2.7, 6.8], look: [1.6, 1.3, -2.2], fov: 56 };
      break; }
    case 10: { // INSERT: the fallen machine's sign, face up; Pixi's finger on the bottom edge
      R.empties.forEach((b) => b.position.set(0, -50, 0)); T.pose({ visible: false }); R.mach.updateMatrixWorld(true); const m = new THREE.Vector3(); R.mach.userData.mark.getWorldPosition(m);
      const k = X.smooth(sp(S(10) + 4, S(10) + 16));
      R.hand.position.set(m.x + X.lerp(0.45, 0.12, k), m.y - 0.12, m.z + 0.1); R.hand.rotation.set(0, 0, 2.2); R.hand.scale.setScalar(0.5);
      cam = { pos: [m.x - 0.1, m.y - 0.02, m.z + 1.5], look: [m.x - 0.1, m.y - 0.05, m.z], fov: 42 };
      const q = X.smooth(sp(S(10) + 14, S(10) + 22)); OV.push(label("SAME PERSON =", 1180, 86, q, "#ffffff", 0.9 + 0.1 * q), label("SAME ZUBBIT.", 1290, 112, q, "#9a9aa6", 0.85 + 0.15 * pop(S(10) + 20, 8)));
      caption = q < 0.5;
      break; }
    case 11: { // one last box rolled to Donutsaurus; he noses it open: GOLD
      const bp = [DP[0] - 0.5, 0.15, DP[2] + 0.9], nose = X.smooth(sp(S(11) + 6, S(11) + 22)), open = f >= S(11) + 26, rise = X.back(sp(S(11) + 26, S(11) + 40));
      R.goldBox.position.set(...bp); R.goldBox.rotation.set(0, 0.4, 0); R.goldBox.userData.lid.rotation.x = open ? -2.2 : 0;
      if (open) { R.gold.position.set(bp[0], bp[1] + 0.25 + 0.35 * rise, bp[2]); R.gold.rotation.set(0, f * 0.05, 0); R.gold.scale.setScalar(1.5); FXS.push({ kind: "sparkle", pos: [bp[0], bp[1] + 0.7, bp[2] + 0.2], size: 0.5, t: (f - S(11)) / 30 }); }
      D.pose({ pos: DP, scale: 1, yaw: -0.5, head: [0.45 * nose, 0, 0], jaw: 0.2, look: [-0.3, -0.8], tailY: open ? 0.9 * Math.sin(f * 0.6) : 0.1 });
      ballPose([MACH[0] - 2.1, BALLP[1], MACH[2] + 0.1], 4.5 + 0.5, { face: "dizzy" });
      cam = { pos: [4.9, 1.6, 1.8], look: [DP[0] - 0.4, 0.75, DP[2] + 0.6], fov: 48 };
      if (open) OV.push(label("GOLD!", 760, 110, pop(S(11) + 26, 8), "#ffc21a"));
      break; }
    case 12: { // the ball reaches out with both hands; Donutsaurus eats the Gold Zubbit
      const bp = [DP[0] - 0.5, 0.15, DP[2] + 0.9], eat = sp(S(12) + 30, S(12) + 40);
      R.goldBox.position.set(...bp); R.goldBox.userData.lid.rotation.x = -2.2;
      D.root.updateMatrixWorld(true); const mo = new THREE.Vector3(); D.jaw.getWorldPosition(mo);
      if (eat < 1) { const p0 = new THREE.Vector3(bp[0], bp[1] + 0.6, bp[2]); R.gold.position.copy(p0.lerp(mo, eat)); R.gold.scale.setScalar(1.5 * (1 - 0.6 * eat)); }
      D.pose({ pos: DP, scale: 1, yaw: -0.7, head: [f < S(12) + 20 ? -0.2 : 0.2, f < S(12) + 14 ? 0.5 : 0, 0], jaw: f >= S(12) + 26 && f < S(12) + 42 ? 1 : 0.1, look: f < S(12) + 14 ? [-0.9, 0] : [0, -0.6] });
      ballPose([BALLP[0] + 0.6, BALLP[1], BALLP[2] + 0.2], 0, { face: say("toast", "sad"), reach: true, yaw: 0.5 });
      cam = { pos: [2.6, 1.9, 4.4], look: [3.1, 1.1, -1.2], fov: 50 };
      if (f >= S(12) + 40 && f < S(12) + 48) FXS.push({ kind: "puff", pos: [mo.x, mo.y + 0.2, mo.z + 0.2], size: 0.4, t: (f - S(12) - 40) / 8 });
      break; }
    case 13: { // Pixi pats the Toast-ball once on the head
      const pat = Math.max(0, Math.sin(Math.PI * sp(S(13) + 12, S(13) + 24)));
      ballPose([BALLP[0] + 0.6, BALLP[1] - 0.05 * pat, BALLP[2] + 0.2], 0, { face: "sad", yaw: 0.2 });
      P.pose({ pos: [BALLP[0] - 0.75, 0, BALLP[2] + 0.5], yaw: 0.9, armR: [-2.0 + 0.3 * pat, -0.2], elbowR: 0.4, armL: [0, 0.1], face: say("pixi", "smug") });
      D.pose({ pos: DP, scale: 1, yaw: -0.7, squash: 0.06 });
      cam = { pos: [1.3, 2.0, 4.6], look: [1.5, 1.35, -0.9], fov: 48 };
      break; }
    case 14: { // INSERT: Series 2 lands on the old machine. Boom.
      ballPose([BALLP[0] + 0.6, BALLP[1], BALLP[2] + 0.2], 0, { face: "shock" });
      cam = { pos: [-0.2, 3.1, 1.6], look: [MACH[0] + 0.2, 1.4, MACH[2] - 0.2], fov: 52 };
      if (s2 >= 1) { shk = [S(14) + 8, 0.2, 10]; OV.push(label("ZUBBIT — SERIES 2", 1500, 92, pop(S(14) + 8, 6), "#ff8a1f")); }
      caption = false;
      break; }
  }
  unclip([P, D], { gap: 0.2 });
  if (n >= 2 && n <= 13 && n !== 3 && n !== 10 && !(n === 9 && f >= IMP) && !(n === 2 && fs < 34)) {
    const last = [B1, B2, B3].filter((b) => f >= b && f - b < 6).pop();
    OV.push(label(`BOXES: ${boxes}`, 120, 80, 1, "#ffe14a", last ? 0.7 + 0.3 * pop(last, 5) : 1), label(`GOLD: ${gold}`, 215, 80, 1, gold ? "#ffc21a" : "#ffffff"));
  }
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, dof: { focus: 6, amount: 0 }, actors: [], fx: FXS, flash, caption, focusPt: cam.look, overlay: (g, w, h, sc) => OV.forEach((o) => o(g, w, h, sc)) };
}
