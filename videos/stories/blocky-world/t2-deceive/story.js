// Toast & Pixi · T2 "Why Would I Deceive You?" — built from scripts/SHORTS-2_trending.md (13 shots)
import { makeToast, makePixi } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
export const meta = { fps: 30, tail: 1.45 };
let R = {}, SH = [], L = [];
const INK = "#221a26", FPS = 30;
const card = (E, w, h, draw) => { const { THREE } = E, c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const F = (px, k = 1, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
// layout
const H = 4.8;                         // ceiling
const TP = [0.5, 0, 0.3];              // Toast in front of the counter
const PP = [-1.35, 0, 0.75];           // Pixi
const DOME = [-1.6, 1.18, -1.75];      // dome base centre on the counter top
const SIGN = [-1.6, 1.52, -1.2];       // sign card in front of the dome
const WINX = 5.96;                     // right wall (shop window)
const BASE = 0.24;                     // outer diameter of the donut at scale 1 is 2*BASE
const SZ = { small: 1, peek: 1.9, ball: 3.2, door: 5.4, giant: 9.8 };
// shared loop composition: shot 1 == last frame of shot 13
const PIN = { pos: [5.6, 1.37, 0.98], yaw: -Math.PI / 2 + 0.62 };
const LOOP = { cam: { pos: [1.4, 2.7, 8.4], look: [4.45, 2.35, 0.5], fov: 50 }, donut: { pos: [3.2, 9.8 * BASE, 0.3], s: 9.8, roll: Math.PI / 2 } };

function makeDonut(E, parent) {
  const { THREE } = E, g = E.group(parent, [0, -50, 0]), R0 = 0.16, r0 = 0.08;
  const dough = new THREE.Mesh(new THREE.TorusGeometry(R0, r0, 10, 24), E.mat("#f0b468")); E.add(dough, g);
  const ice = new THREE.Mesh(new THREE.TorusGeometry(R0, r0 * 0.98, 10, 24), E.mat("#ff6fb0")); ice.scale.set(1, 1, 0.62); ice.position.z = r0 * 0.4; E.add(ice, g);
  // white sprinkles on the icing
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2 + 0.2, rr = R0 + (i % 3 - 1) * r0 * 0.45; E.box(0.034, 0.012, 0.012, E.mat("#ffffff"), [Math.cos(a) * rr, Math.sin(a) * rr, r0 * 0.93], { parent: g, center: true, noShadow: true, rot: [0, 0, a * 2.7] }); }
  // the one gold sprinkle
  E.box(0.05, 0.018, 0.018, E.mat("#ffc21a", { emissive: "#8a5a00" }), [0.05, R0 + 0.02, r0 * 0.95], { parent: g, center: true, noShadow: true, rot: [0, 0, 0.5] });
  return g;
}

export async function build(E) {
  const { S, T, THREE } = E;
  try { SH = (await (await fetch("../work/timeline.json?v=" + Date.now())).json()).shots; } catch (e) { SH = []; }
  try { L = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) { L = []; }
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E));
  S.room({ w: 12, d: 10, h: H, wall: T.wallpaper("#ffd1e3", "#ffc2da", "stripe"), floor: T.tiles("#fff6fb", "#ffb3d4", 10), floorRep: 0.3, window: false, door: false, ceiling: true });
  E.box(12, 0.5, 0.1, E.mat("#ff7fb8"), [0, 0, -4.94]);
  // neon sign (as in S1)
  const sign = card(E, 1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke(); g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.shadowColor = "#ff7fd0"; g.shadowBlur = 30; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6); g.shadowBlur = 0; g.lineWidth = 16; g.strokeStyle = "#ffe14a"; g.beginPath(); g.arc(120, h / 2, 52, 0, 7); g.stroke(); g.strokeStyle = "#19e0c6"; g.beginPath(); g.ellipse(120, h / 2, 92, 26, -0.3, 0, 7); g.stroke(); });
  E.plane(4.2, 1.05, E.flat("#ffffff", { map: sign, fog: false }), [-1.2, 3.9, -4.93], { noink: true });
  // back shelves with donuts
  const ic = ["#ff7fb8", "#7a4a2a", "#ffe14a", "#19e0c6", "#ffffff", "#9b4dff", "#ff8a1f"];
  const small = (pos, c) => { const g = E.group(null, pos); const d = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.075, 6, 12), E.mat("#e7b06a")); d.rotation.x = -Math.PI / 2 + 0.3; E.add(d, g); const i = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.07, 6, 12), E.mat(c)); i.rotation.x = -Math.PI / 2 + 0.3; i.position.y = 0.025; i.scale.set(1, 1, 0.75); E.add(i, g); };
  for (const y of [1.25, 1.95, 2.65]) { E.box(6.0, 0.08, 0.5, E.mat("#ffffff"), [-0.6, y, -4.7]); for (let i = 0; i < 10; i++) small([-3.3 + i * 0.6, y + 0.08, -4.65], ic[(i + Math.round(y * 3)) % 7]); }
  // counter
  S.counter(-0.5, -1.8, { w: 5, col: "#ff7fb8", top: "#fff6fb" });
  // the dome: base, stand, glass (glass lifts in shot 12)
  E.cyl(0.4, 0.42, 0.1, E.mat("#d9d2e6"), [DOME[0], DOME[1], DOME[2]]);
  E.cyl(0.05, 0.08, 0.16, E.mat("#ffd23a"), [DOME[0], DOME[1] + 0.1, DOME[2]]);
  E.cyl(0.14, 0.14, 0.03, E.mat("#ffd23a"), [DOME[0], DOME[1] + 0.26, DOME[2]]);
  R.glass = E.group(null, [DOME[0], DOME[1] + 0.1, DOME[2]]);
  const gl = new THREE.Mesh(new THREE.SphereGeometry(0.38, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: "#dff4ff", transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0, side: THREE.DoubleSide, depthWrite: false }));
  gl.scale.set(1, 1.55, 1); gl.userData.noink = true; R.glass.add(gl);
  E.sphere(0.04, E.mat("#ffd23a"), [0, 0.6, 0], { parent: R.glass });
  R.STAND = [DOME[0], DOME[1] + 0.29 + BASE, DOME[2]];
  // the sign card: rule big, small print tiny
  const rule = card(E, 1000, 700, (g, w, h) => { g.fillStyle = "#fffbe6"; g.fillRect(0, 0, w, h); g.lineWidth = 20; g.strokeStyle = INK; g.strokeRect(10, 10, w - 20, h - 20);
    g.fillStyle = "#ff4fa3"; g.fillRect(34, 34, w - 68, 150); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff"; g.font = F(96); g.fillText("THE TRUTH DONUT", w / 2, 112);
    g.fillStyle = INK; g.font = F(58, 1, 800); g.fillText("DISPLAY ONLY.", w / 2, 250);
    g.font = F(80); const parts = [["LIE", "#ff2d2d"], [" NEAR IT", INK]]; let tw = parts.reduce((a, p) => a + g.measureText(p[0]).width, 0), x = w / 2 - tw / 2; g.textAlign = "left"; for (const [s, c] of parts) { g.fillStyle = c; g.fillText(s, x, 360); x += g.measureText(s).width; }
    const p2 = [["AND IT ", INK], ["GROWS.", "#ff2d2d"]]; tw = p2.reduce((a, p) => a + g.measureText(p[0]).width, 0); x = w / 2 - tw / 2; for (const [s, c] of p2) { g.fillStyle = c; g.fillText(s, x, 460); x += g.measureText(s).width; }
    g.textAlign = "center"; g.strokeStyle = "#d9cfa8"; g.lineWidth = 4; g.beginPath(); g.moveTo(90, 560); g.lineTo(w - 90, 560); g.stroke();
    g.fillStyle = INK; g.font = F(26, 1, 800); g.fillText("TELL THE TRUTH: IT SHRINKS.", w / 2, 610); });
  R.sign = E.group(null, SIGN); R.sign.rotation.x = -0.18; E.plane(0.8, 0.56, E.mat("#ffffff", { map: rule }), [0, 0, 0], { parent: R.sign, noShadow: true });
  E.box(0.06, 0.4, 0.04, E.mat("#b8b0c8"), [0, -0.6, -0.08], { parent: R.sign });
  // shop window on the right wall: night street plate + frame + glass
  const street = card(E, 1024, 1024, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#151a3a"); gr.addColorStop(0.7, "#2a2350"); gr.addColorStop(1, "#3a2a44"); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = "#fff"; for (let i = 0; i < 40; i++) g.fillRect((i * 977) % w, (i * 331) % 300, 3, 3);
    [[40, 380, 260, 640], [330, 300, 300, 720], [680, 420, 300, 600]].forEach(([x, y, bw, bh], j) => { g.fillStyle = ["#2c2e5a", "#33295a", "#262a50"][j]; g.fillRect(x, y, bw, bh); for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) { g.fillStyle = (r * 7 + c * 3 + j) % 5 ? "#ffd86a" : "#3a3c6a"; g.fillRect(x + 25 + c * (bw - 50) / 4, y + 30 + r * 70, 34, 40); } });
    g.fillStyle = "#3a3a46"; g.fillRect(0, 900, w, 124); g.fillStyle = "#ffe9a0"; g.fillRect(860, 520, 14, 400); g.beginPath(); g.arc(867, 515, 40, 0, 7); g.fill(); });
  R.win = E.group(null, [WINX, 0, 0.0]); R.win.rotation.y = -Math.PI / 2;
  E.plane(5.0, 3.8, E.flat("#ffffff", { map: street, fog: false }), [0, 2.4, -0.02], { parent: R.win, noink: true });
  for (const x of [-2.55, 0, 2.55]) E.box(0.14, 3.95, 0.14, E.mat("#ffffff"), [x, 0.45, 0.04], { parent: R.win });
  for (const y of [0.4, 4.32]) E.box(5.25, 0.14, 0.16, E.mat("#ffffff"), [0, y, 0.04], { parent: R.win });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 3.8), new THREE.MeshPhysicalMaterial({ color: "#cfefff", transparent: true, opacity: 0.12, roughness: 0.05, depthWrite: false })); glass.position.set(0, 2.4, 0.06); glass.userData.noink = true; R.win.add(glass);
  // glass streaks (catch the light)
  for (const [x, y, r] of [[-1.6, 3.4, 0.6], [1.2, 1.4, 0.6]]) E.box(0.06, 0.9, 0.01, E.flat("#ffffff", { transparent: true, opacity: 0.35 }), [x, y, 0.08], { parent: R.win, center: true, noShadow: true, rot: [0, 0, r] });
  // the Truth Donut + the gold sprinkle on Toast's cheek + a fake hand for the INSERT
  R.D = makeDonut(E, null);
  const { HW, HH, HD } = R.T.dims;
  R.cheek = E.box(0.12, 0.045, 0.03, E.mat("#ffc21a", { emissive: "#8a5a00" }), [0.3, 0.32, HD / 2 + 0.02], { parent: R.T.head, center: true, noShadow: true, rot: [0, 0, 0.5] });
  R.hand = E.group(null, [0, -50, 0]); E.box(0.16, 0.5, 0.17, E.mat("#23232e"), [0, 0.12, 0], { parent: R.hand, center: true }); E.box(0.17, 0.05, 0.18, E.mat("#19e0c6"), [0, -0.14, 0], { parent: R.hand, center: true }); E.box(0.15, 0.13, 0.16, E.mat("#c98d62"), [0, -0.23, 0], { parent: R.hand, center: true }); E.box(0.045, 0.15, 0.05, E.mat("#c98d62"), [0.0, -0.36, 0.04], { parent: R.hand, center: true });
}

// ---------- overlays ----------
const banner = (txt, s, a = 1, col = "#ffe14a", y = 560) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, y * k); g.rotate(-0.07); g.scale(s, s);
  g.fillStyle = "#ff4d1f"; g.strokeStyle = INK; g.lineWidth = 18 * k; g.lineJoin = "round"; g.beginPath(); const n = 22; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 0.8 : 1, an = (i / (n * 2)) * Math.PI * 2, px = Math.cos(an) * 640 * k * r, py = Math.sin(an) * 250 * k * r; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke(); g.fill();
  g.font = F(178, k); g.textAlign = "center"; g.textBaseline = "middle"; g.lineWidth = 34 * k; g.strokeText(txt, 0, 8 * k); g.fillStyle = "#b8320a"; g.fillText(txt, 8 * k, 20 * k); g.fillStyle = col; g.fillText(txt, 0, 8 * k); g.restore(); };
const label = (txt, y, size, a = 1, col = "#ffe14a", s = 1) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, y * k); g.scale(s, s); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(size, k); g.lineWidth = size * 0.2 * k; g.strokeStyle = INK; g.strokeText(txt, 0, 0); g.fillStyle = col; g.fillText(txt, 0, 0); g.restore(); };

export function frame(f0, E) {
  const X = E.X, THREE = E.THREE, OV = [], FXS = [];
  const { T, P, D } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  const IMP = S(9) + 40; const f = f0 > IMP && f0 <= IMP + 4 ? IMP : f0;      // fail-screen freeze
  const t = f / FPS, sp = (a, b) => X.span(f, a, b), pop = (a, k = 9) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  let n = 1; while (n < 13 && f0 >= S(n + 1)) n++;
  const fs = f - S(n);
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const OPEN = { happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", angry: "angry", talk: "talk", sad: "talk" };
  const say = (who, base) => (amp(who) > 0.55 ? OPEN[base] || "talk" : base);
  const segF = (i) => (L[i] ? Math.round(L[i].s * FPS) : 0), segE = (i) => (L[i] ? Math.round(L[i].e * FPS) : 0);
  // Toast's tell: right hand on heart + head tilt (k 0..1)
  const tell = (k = 1) => ({ armR: [-0.55 * k, -0.95 * k], elbowR: 1.9 * k, head: [0.05 * k, 0.12 * k, 0.26 * k] });
  const behind = { armL: [0.55, 0.12], armR: [0.55, 0.12], elbowL: 0.9, elbowR: 0.9 };
  const grow = (a, b, f1, k = 8) => (f < f1 ? a : a + (b - a) * X.back(X.span(f, f1, f1 + k)));
  const setD = (pos, s, roll = 0, yaw = 0) => { D.visible = true; D.position.set(...pos); D.scale.setScalar(s); D.rotation.set(0, yaw, roll, "YXZ"); };
  const backOf = (pos, yaw, s) => [pos[0] - Math.sin(yaw) * (0.28 + 0.07 * s), 1.05 + Math.max(0, s * BASE - 1.05) * 0.0, pos[2] - Math.cos(yaw) * (0.28 + 0.07 * s)];
  let cam, flash = 0, shk = null, light = ["interior", "night", 0.3], grade = null, caption = true;
  // reset
  [T, P].forEach((q) => q.pose({ visible: false })); P.boardAt([-3.6, 0.0, -1.0], 0.3, 0, 0, true);
  D.visible = false; R.cheek.visible = false; R.hand.position.set(0, -50, 0); R.glass.position.set(DOME[0], DOME[1] + 0.1, DOME[2]);
  // LIES counter
  const lies = n <= 3 ? 0 : n === 4 ? (fs < 10 ? 0 : 1) : n === 5 ? 1 : n === 6 ? (fs < 8 ? 1 : 2) : n === 7 ? 2 : n === 8 ? (fs < 8 ? 2 : 3) : n <= 10 ? 3 : n === 11 ? Math.max(0, 3 - [10, 24, 38].filter((a) => fs >= a).length) : 0;
  const lastStep = n === 4 ? S(4) + 10 : n === 6 ? S(6) + 8 : n === 8 ? S(8) + 8 : n === 11 ? S(11) + [10, 24, 38].filter((a) => fs >= a).pop() : -99;
  const showCounter = n >= 2 && n <= 12 && !(n === 9 && f >= IMP) && n !== 10 && !(n === 2 && fs < 36);
  const pinPose = (faceBase, k = 1) => T.pose({ pos: PIN.pos, yaw: PIN.yaw, ...tell(k), armL: [0.2, 0.25], elbowL: 0.3, legL: 0.1, legR: -0.08, kneeL: 0.2, kneeR: 0.1, lean: -0.08, stretch: [0.9, 1.0], face: faceBase });

  switch (n) {
    case 1: case 13: { // flash-forward / loop: giant donut pins Toast to the window, hand on heart
      setD(LOOP.donut.pos, LOOP.donut.s, LOOP.donut.roll);
      const fu = n === 13;
      pinPose(n === 1 ? say("toast", "smug") : (fs > 3 && f0 < Eo(13) - 4 ? "shock" : "smug"));
      cam = { ...LOOP.cam };
      if (n === 1) { OV.push(label("HE LIED AGAIN", 300, 118, pop(2, 8), "#ff4d4d", 0.9 + 0.1 * pop(2, 8))); }
      else { caption = false; if (fs < 6) shk = [S(13), 0.12, 8]; }
      break; }
    case 2: { // the empty dome; Pixi points at the sign; Toast straight, donut edges peeking
      setD(backOf(TP, -0.15, SZ.peek), SZ.peek, 0, -0.15);
      T.pose({ pos: TP, yaw: -0.15, ...behind, face: "smug" });
      P.pose({ pos: PP, yaw: 0.35, armL: [-1.25, 0.55], elbowL: 0.15, armR: [0, 0.1], head: [0.05, -0.35, 0], face: say("pixi", "deadpan") });
      if (fs < 36) { cam = { pos: [SIGN[0] + 0.05, SIGN[1] + 0.06, SIGN[2] + 1.05 - 0.1 * (fs / 36)], look: [SIGN[0], SIGN[1] + 0.0, SIGN[2]], fov: 50 }; caption = false; }
      else cam = { pos: [-0.35, 1.9, 6.4], look: [-0.45, 1.45, -0.6], fov: 46 };
      break; }
    case 3: { // CU: hand on heart, head tilted, gold sprinkle on his cheek
      setD(backOf(TP, -0.15, SZ.peek), SZ.peek, 0, -0.15);
      const k = X.smooth(sp(S(3) + 2, S(3) + 12));
      T.pose({ pos: TP, yaw: -0.15, ...tell(k), armL: [0.55, 0.12], elbowL: 0.9, face: say("toast", "smug") });
      R.cheek.visible = true;
      const hy = T.dims.H - T.dims.HH / 2; cam = { pos: [TP[0] - 0.35, hy - 0.1, TP[2] + 4.8], look: [TP[0] - 0.05, hy - 0.08, TP[2]], fov: 40 };
      break; }
    case 4: { // behind his back the donut grows to beach-ball size, arms forced wide
      const s = grow(SZ.peek, SZ.ball, S(4) + 10, 9), k = X.back(sp(S(4) + 10, S(4) + 19));
      setD(backOf(TP, -0.15, s), s, 0, -0.15);
      T.pose({ pos: TP, yaw: -0.15, armL: [X.lerp(0.55, 0.2, k), X.lerp(0.12, 1.0, k)], armR: [X.lerp(0.55, 0.2, k), X.lerp(0.12, 1.0, k)], elbowL: X.lerp(0.9, 0.2, k), elbowR: X.lerp(0.9, 0.2, k), face: fs > 10 ? "scared" : "smug", head: [0, 0, 0] });
      R.cheek.visible = true;
      cam = { pos: [TP[0] + 0.2, 1.75, 5.9], look: [TP[0], 1.25, 0], fov: 46 };
      if (fs >= 10 && fs < 22) FXS.push({ kind: "stars", pos: [TP[0], 1.6, TP[2] - 0.2], size: 0.7, t: (fs - 10) / 30 });
      break; }
    case 5: { // Pixi leans to look behind him; he turns to keep his front to her; hand on heart again
      const lk = X.smooth(sp(S(5) + 4, S(5) + 22)), yaw = X.lerp(-0.15, -0.95, lk);
      setD(backOf(TP, yaw, SZ.ball), SZ.ball, 0, yaw);
      const tk = X.smooth(sp(segF(4) - 4, segF(4) + 8));
      T.pose({ pos: TP, yaw, armL: [0.2, 1.0], elbowL: 0.2, ...(tk > 0 ? tell(tk) : { armR: [0.2, 1.0], elbowR: 0.2 }), face: say("toast", "smug") });
      P.pose({ pos: [PP[0] + 0.25 * lk, 0, PP[2] - 0.1 * lk], yaw: 0.6, sway: 0.28 * lk, lean: 0.12 * lk, armL: [-0.2, 0.3], armR: [-0.2, 0.3], head: [0, 0.3 * lk, 0.2 * lk], face: say("pixi", "deadpan") });
      cam = { pos: [-0.35, 1.9, 6.3], look: [-0.35, 1.4, -0.2], fov: 46 };
      break; }
    case 6: { // WIDE: grows to door size, lifts Toast, he ends up sitting on top
      const g0 = S(6) + 8, s = grow(SZ.ball, SZ.door, g0, 12), k = X.smooth(sp(g0, g0 + 16));
      const top = 2 * SZ.door * BASE;
      const dpos = [X.lerp(backOf(TP, -0.95, SZ.ball)[0], TP[0], k), Math.max(1.05, s * BASE), X.lerp(backOf(TP, -0.95, SZ.ball)[2], TP[2] - 0.1, k)];
      setD(dpos, s, 0, X.lerp(-0.95, -0.2, k));
      const ty = X.lerp(0, top - 0.82, k) + 0.25 * Math.sin(Math.PI * k);
      T.pose({ pos: [TP[0], ty, TP[2] + 0.1 * k], yaw: X.lerp(-0.95, -0.25, k), legL: -1.45 * k, legR: -1.45 * k, kneeL: 1.45 * k, kneeR: 1.45 * k, armL: [-0.4, 1.1 * (1 - k) + 0.6], armR: [-0.4, 1.1 * (1 - k) + 0.6], face: k > 0.1 && k < 0.9 ? "shock" : k >= 0.9 ? "smug" : "scared" });
      P.pose({ pos: PP, yaw: 0.45, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, head: [-0.35 * k, 0.2, 0], face: "deadpan" });
      cam = { pos: [-0.2, 2.5, 10.6], look: [-0.2, 2.15, 0], fov: 50 };
      if (fs >= 8 && fs < 22) FXS.push({ kind: "puff", pos: [TP[0], 0.3, TP[2] + 0.6], size: 1.0, t: (fs - 8) / 14 });
      break; }
    case 7: case 8: { // Pixi looks up, arms crossed; Toast on top, hand on heart; (8) the creak and the CRASH
      const top = 2 * SZ.door * BASE;
      const creak = n === 8 ? Math.sin(fs * 1.6) * 0.04 * Math.exp(-fs / 14) : 0;
      setD([TP[0], SZ.door * BASE, TP[2] - 0.1], SZ.door * (1 + creak), 0, -0.2);
      const tk = n === 7 ? X.smooth(sp(segF(6) + 6, segF(6) + 16)) : 0;
      const sit = { pos: [TP[0], top - 0.82 - (n === 8 ? creak * 3 : 0), TP[2]], yaw: -0.25, legL: -1.45, legR: -1.45, kneeL: 1.45, kneeR: 1.45 };
      if (n === 7) { T.pose({ ...sit, ...tell(tk), armL: [-0.4, 0.6], face: say("toast", "smug") });
        P.pose({ pos: PP, yaw: 0.45, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, head: [-0.42, 0.2, 0], face: say("pixi", "deadpan") });
        cam = { pos: [-0.3, 2.35, 10.2], look: [-0.25, 2.1, 0], fov: 50 }; }
      else { const z = X.back(sp(S(8), S(8) + 6)), ep = X.spring(sp(S(8) + 6, S(8) + 18));
        T.pose({ ...sit, armL: [-0.4, 0.8], armR: [-0.4, 0.8], head: [0.5 * X.smooth(sp(S(8), S(8) + 6)), 0, 0], face: "shock", eyePop: ep, headScale: 1 + 0.1 * ep });
        P.pose({ pos: PP, yaw: 0.45, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, head: [-0.42, 0.2, 0], face: "deadpan" });
        const hy = sit.pos[1] + T.dims.H - T.dims.HH / 2; cam = { pos: [TP[0] - 0.2, X.lerp(2.4, hy + 0.15, z), X.lerp(10.2, TP[2] + 5.6, z)], look: [TP[0], X.lerp(2.1, hy + 0.05, z), TP[2]], fov: X.lerp(50, 40, z) };
        shk = [S(8) + 1, 0.05, 6]; }
      break; }
    case 9: { // WIDE: swells to fill the shop, rolls a quarter turn, pins Toast to the window — fail screen
      const g0 = S(9) + 4, k = X.smooth(sp(g0, g0 + 16)), r = X.easeIn(sp(g0 + 14, IMP)), sat = f >= IMP;
      const s = X.lerp(SZ.door, SZ.giant, k), cx = X.lerp(TP[0], LOOP.donut.pos[0], r);
      setD([cx, s * BASE, X.lerp(TP[2] - 0.1, LOOP.donut.pos[2], r)], s, LOOP.donut.roll * r, -0.2 * (1 - r));
      const top = 2 * s * BASE;
      if (!sat) { const fly = r; T.pose({ pos: [X.lerp(TP[0], PIN.pos[0], fly), X.lerp(top - 0.82, PIN.pos[1], fly) + 0.8 * Math.sin(Math.PI * fly), X.lerp(TP[2], PIN.pos[2], fly)], yaw: X.lerp(-0.25, PIN.yaw, fly), legL: -1.45 * (1 - fly), legR: -1.45 * (1 - fly), kneeL: 1.45 * (1 - fly), kneeR: 1.45 * (1 - fly), armL: [-2.6, 0.5], armR: [-2.6, 0.5], face: "scared" }); }
      else { pinPose("dizzy", 0); T.root.scale.set(0.6, 1.0, 1.0); }
      P.pose({ pos: [-2.6, 0, 1.4], yaw: 0.5, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      if (sat) { grade = { uSat: 0.35 }; shk = [IMP, 0.22, 10]; flash = f0 <= IMP + 2 ? 0.4 : 0;
        const b0 = IMP + 1, sc = f < b0 + 5 ? X.lerp(3.2, 1, X.easeIn(sp(b0, b0 + 5))) : 1 + 0.06 * Math.sin((f - b0 - 5) * 1.2) * Math.max(0, 1 - (f - b0 - 5) / 10); OV.push(banner("TOASTED!", sc)); caption = false; }
      cam = { pos: [0.9, 2.6, 13.6], look: [1.6, 2.35, 0], fov: 50 };
      break; }
    case 10: { // INSERT: Pixi's finger under the small print
      setD(LOOP.donut.pos, SZ.giant, LOOP.donut.roll); pinPose("sad", 0);
      const k = X.smooth(sp(S(10) + 4, S(10) + 18));
      const sx = SIGN[0] - 0.02, sy = SIGN[1] - 0.25, sz = SIGN[2] + 0.06; R.hand.scale.setScalar(0.45);
      R.hand.position.set(X.lerp(sx + 0.3, sx + 0.06, k), X.lerp(0.8, 1.04, k) + 0.006 * Math.sin(f * 0.3), sz + 0.1); R.hand.rotation.set(-0.2, 0, Math.PI - 0.35);
      cam = { pos: [sx + 0.02, sy - 0.05, SIGN[2] + 1.05], look: [sx + 0.02, sy - 0.06, SIGN[2]], fov: 40 };
      const q = X.smooth(sp(S(10) + 18, S(10) + 26)); OV.push(label("TELL THE TRUTH:", 1150, 84, q, "#ffffff", 0.9 + 0.1 * q), label("IT SHRINKS.", 1270, 120, q, "#19e0c6", 0.85 + 0.15 * pop(S(10) + 24, 8)));
      caption = q < 0.5;
      break; }
    case 11: { // Toast gives up: three shrink steps, then the donut drops back onto its stand
      const steps = [10, 24, 38].map((a) => S(11) + a), lv = [SZ.giant, 6.2, 3.4, SZ.small];
      let s = lv[0]; steps.forEach((a, i) => { if (f >= a) s = X.lerp(lv[i], lv[i + 1], X.back(sp(a, a + 7))); });
      const hop = X.smooth(sp(S(11) + 48, S(11) + 72));
      const base = [LOOP.donut.pos[0] + (SZ.giant - s) * BASE * 0.0, s * BASE, LOOP.donut.pos[2]];
      const pos = hop > 0 ? [X.lerp(base[0], R.STAND[0], hop), X.lerp(base[1], R.STAND[1], hop) + 1.4 * Math.sin(Math.PI * hop), X.lerp(base[2], R.STAND[2], hop)] : base;
      setD(pos, s, LOOP.donut.roll * (1 - hop) + hop * 0.0 + (hop > 0 ? hop * Math.PI * 2 : 0));
      const drop = X.smooth(sp(steps[0], steps[0] + 14));
      const ty = X.lerp(PIN.pos[1], 0, drop);
      T.pose({ pos: [X.lerp(PIN.pos[0], 5.2, drop), ty, PIN.pos[2]], yaw: PIN.yaw, armL: [0, 0.25], armR: [0, 0.25], stretch: [X.lerp(0.9, 1, drop), 1], face: say("toast", "sad") });
      P.pose({ pos: [-2.6, 0, 1.4], yaw: 0.5, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      const w = X.smooth(sp(S(11) + 44, S(11) + 72));
      cam = { pos: [X.lerp(2.6, 1.2, w), X.lerp(2.2, 2.4, w), X.lerp(7.6, 10.8, w)], look: [X.lerp(4.7, 1.6, w), X.lerp(1.7, 1.7, w), X.lerp(0.3, -0.5, w)], fov: X.lerp(48, 52, w) };
      if (f >= steps[0] && f < steps[0] + 12) FXS.push({ kind: "puff", pos: [3.4, 2.0, 1.0], size: 1.4, t: (f - steps[0]) / 12 });
      break; }
    case 12: { // Pixi lowers the dome; Toast nods... then hand on heart, head tilt
      setD(R.STAND, SZ.small, 0, 0);
      const lo = X.smooth(sp(S(12), S(12) + 22)); R.glass.position.y = DOME[1] + 0.1 + 0.75 * (1 - lo);
      P.pose({ pos: [-2.55, 0, -0.85], yaw: 1.0, armL: [X.lerp(-2.0, -1.2, lo), 0.25], armR: [X.lerp(-2.0, -1.2, lo), -0.05], elbowL: 0.3, elbowR: 0.3, head: [0.1, 0.2, 0], face: say("pixi", "deadpan") });
      const nod = segF(10) > 0 && f >= segF(10) && f < segF(10) + 12 ? 0.25 * Math.sin((f - segF(10)) / 12 * Math.PI) : 0;
      const tk = X.smooth(sp(segF(10) + 10, segF(10) + 20));
      T.pose({ pos: [-0.35, 0, 0.7], yaw: -0.45, ...tell(tk), armL: [0, 0.2], head: [nod + 0.05 * tk, 0.12 * tk, 0.26 * tk], face: say("toast", tk > 0.5 ? "smug" : "happy") });
      cam = { pos: [-1.4, 1.95, 6.3], look: [-1.45, 1.45, -0.8], fov: 50 };
      if (fs > 22 && fs < 26) FXS.push({ kind: "sparkle", pos: [DOME[0], DOME[1] + 0.7, DOME[2] + 0.3], size: 0.3, t: (fs - 22) / 30 });
      break; }
  }
  unclip([T, P], { gap: 0.2 });
  if (showCounter) { const sc = f - lastStep < 6 && lastStep > 0 ? 0.6 + 0.4 * pop(lastStep, 5) : 1; OV.push(label(`LIES: ${lies}`, 150, 92, 1, "#ffe14a", sc)); }
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, dof: { focus: 6, amount: 0 }, actors: [], fx: FXS, flash, caption, focusPt: cam.look, overlay: (g, w, h, sc) => OV.forEach((o) => o(g, w, h, sc)) };
}
