// Toast & Pixi · S1 Night Shift #1 "Don't Feed the Mascot" — built from scripts/SHORTS.md (15 shots)
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
export const meta = { fps: 30, tail: 0.03 };
let R = {}, SH = [], L = [];
const INK = "#221a26", FPS = 30;
const card = (E, w, h, draw) => { const { THREE } = E, c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const F = (px, k = 1, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
function donut(E, parent, pos, s = 1, icing = "#ff7fb8", rot = [Math.PI / 2, 0, 0]) {
  const { THREE } = E, g = E.group(parent, pos);
  const d = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.075 * s, 6, 12), E.mat("#e7b06a")); d.rotation.set(...rot); E.add(d, g);
  const i = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.07 * s, 6, 12), E.mat(icing)); i.rotation.set(...rot); i.position.y = 0.025 * s; i.scale.set(1, 1, 0.75); E.add(i, g);
  return g;
}
const DX = -1.6, DZ = 0.8;            // puppy spot (pet bed)
const TPOS = [0.35, 0, 0.55];         // Toast's spot in front of the counter
export async function build(E) {
  const { S, T, THREE } = E;
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); SH = tl.shots; } catch (e) { SH = []; }
  try { L = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) { L = []; }
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E);
  // measure Donutsaurus to place the ceiling: he touches it at scale 2.2
  R.D.pose({ scale: 1 }); R.D.root.updateMatrixWorld(true); const bb = new THREE.Box3().setFromObject(R.D.root); R.DH = bb.max.y; R.CEIL = R.DH * 2.2;
  const H = R.CEIL;
  S.room({ w: 12, d: 10, h: H, wall: T.wallpaper("#ffd1e3", "#ffc2da", "stripe"), floor: T.tiles("#fff6fb", "#ffb3d4", 10), floorRep: 0.3, window: false, door: false, ceiling: true });
  E.box(12, 0.5, 0.1, E.mat("#ff7fb8"), [0, 0, -4.94]);
  // door on the right of the back wall + bell
  E.plane(1.2, 2.5, E.flat("#0c0a18"), [4.2, 1.25, -4.98], { noink: true });
  for (const x of [3.54, 4.86]) E.box(0.14, 2.7, 0.14, E.mat("#ffffff"), [x, 0, -4.92]);
  E.box(1.46, 0.16, 0.14, E.mat("#ffffff"), [4.2, 2.62, -4.92]);
  R.door = E.group(null, [3.65, 0, -4.9]); E.box(1.1, 2.45, 0.08, E.mat("#8fd3ff"), [0.55, 0.05, 0], { parent: R.door }); E.box(0.8, 1.0, 0.09, E.mat("#cdeeff"), [0.55, 1.2, 0], { parent: R.door });
  R.bell = E.group(null, [4.2, 2.95, -4.8]); E.cone(0.14, 0.2, E.mat("#ffd23a"), [0, -0.2, 0], { parent: R.bell }); E.sphere(0.05, E.mat("#ffd23a"), [0, -0.22, 0], { parent: R.bell });
  // neon sign + clock
  const sign = card(E, 1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke(); g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.shadowColor = "#ff7fd0"; g.shadowBlur = 30; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6); g.shadowBlur = 0; g.lineWidth = 16; g.strokeStyle = "#ffe14a"; g.beginPath(); g.arc(120, h / 2, 52, 0, 7); g.stroke(); g.strokeStyle = "#19e0c6"; g.beginPath(); g.ellipse(120, h / 2, 92, 26, -0.3, 0, 7); g.stroke(); });
  E.plane(4.2, 1.05, E.flat("#ffffff", { map: sign, fog: false }), [-2.4, 4.4, -4.93], { noink: true });
  R.clockC = document.createElement("canvas"); R.clockC.width = 512; R.clockC.height = 220; R.clockT = new THREE.CanvasTexture(R.clockC); R.clockT.colorSpace = THREE.SRGBColorSpace;
  R.clockDraw = (txt) => { const g = R.clockC.getContext("2d"); g.fillStyle = "#14101c"; g.fillRect(0, 0, 512, 220); g.lineWidth = 12; g.strokeStyle = "#ffffff"; g.strokeRect(6, 6, 500, 208); g.font = F(150, 1, 800); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#ff3030"; g.shadowColor = "#ff3030"; g.shadowBlur = 26; g.fillText(txt, 220, 116); g.shadowBlur = 0; g.font = F(56); g.fillText("AM", 432, 70); R.clockT.needsUpdate = true; R.clockKey = txt; };
  R.clockDraw("2:59");
  R.clockPos = [-0.3, 3.4, -4.92]; E.plane(1.5, 0.64, E.flat("#ffffff", { map: R.clockT, fog: false }), R.clockPos, { noink: true });
  // rule sign: rule 1 big, rule 2 small print
  const rule = card(E, 1000, 1300, (g, w, h) => { g.fillStyle = "#fffbe6"; g.fillRect(0, 0, w, h); g.lineWidth = 22; g.strokeStyle = INK; g.strokeRect(11, 11, w - 22, h - 22);
    g.fillStyle = "#ff3d3d"; g.fillRect(40, 40, w - 80, 190); g.textAlign = "center"; g.fillStyle = "#fff"; g.font = F(92); g.fillText("NIGHT SHIFT", w / 2, 130); g.font = F(64); g.fillText("RULE #1", w / 2, 205);
    g.fillStyle = INK; g.font = F(98); ["DO NOT", "FEED THE", "MASCOT"].forEach((l, i) => g.fillText(l, w / 2, 390 + i * 120)); g.fillStyle = "#ff3d3d"; g.font = F(104); g.fillText("AFTER 3 AM", w / 2, 790);
    g.strokeStyle = "#d9cfa8"; g.lineWidth = 4; g.beginPath(); g.moveTo(80, 1080); g.lineTo(w - 80, 1080); g.stroke();
    g.fillStyle = INK; g.font = F(30, 1, 800); g.fillText("RULE #2: IF YOU FED HIM —", w / 2, 1150); g.fillStyle = "#ff3d3d"; g.font = F(34, 1, 900); g.fillText("RUN.", w / 2, 1200); });
  R.signPos = [2.2, 3.3, -4.93]; R.signW = 1.6; E.plane(1.6, 2.08, E.mat("#ffffff", { map: rule }), R.signPos, { noShadow: true });
  // counter, tray of 7 donuts, back shelves
  S.counter(0.6, -1.8, { w: 5, col: "#ff7fb8", top: "#fff6fb" });
  E.box(2.3, 0.05, 0.6, E.mat("#cfd6e0"), [0.1, 1.18, -1.75]);
  const ic = ["#ff7fb8", "#7a4a2a", "#ffe14a", "#19e0c6", "#ffffff", "#9b4dff", "#ff8a1f"];
  R.tray = ic.map((c, i) => donut(E, null, [-0.85 + i * 0.32, 1.28, -1.75], 0.95, c, [-Math.PI / 2 + 0.3, 0, 0]));
  for (const y of [1.25, 1.95]) { E.box(5.2, 0.08, 0.5, E.mat("#ffffff"), [0.6, y, -4.7]); for (let i = 0; i < 9; i++) donut(E, null, [-1.6 + i * 0.55, y + 0.08, -4.65], 1, ic[(i + (y > 1.5 ? 2 : 0)) % 7]); }
  // pet bed + bowl
  E.box(1.5, 0.16, 1.2, E.mat("#d8344a"), [DX, 0, DZ]); for (const [x, z, w, d] of [[0, -0.55, 1.5, 0.12], [-0.7, 0, 0.12, 1.2], [0.7, 0, 0.12, 1.2]]) E.box(w, 0.32, d, E.mat("#b8263a"), [DX + x, 0, DZ + z]);
  E.cyl(0.32, 0.26, 0.24, E.mat("#19a0e0"), [DX + 1.25, 0, DZ + 0.35]);
  const bowl = card(E, 512, 96, (g, w, h) => { g.fillStyle = "#19a0e0"; g.fillRect(0, 0, w, h); g.font = F(56); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff"; g.fillText("DONUTSAURUS", w / 2, h / 2 + 4); });
  E.plane(0.62, 0.12, E.flat("#ffffff", { map: bowl }), [DX + 1.25, 0.12, DZ + 0.68], { noink: true });
  // ceiling lamp (swings when hit)
  R.lamp = E.group(null, [DX - 0.2, H, DZ - 0.2]); E.cyl(0.02, 0.02, 1.4, E.mat("#23232e"), [0, -1.4, 0], { parent: R.lamp, seg: 6 }); E.cone(0.45, 0.4, E.mat("#ffe14a"), [0, -1.8, 0], { parent: R.lamp }); E.sphere(0.13, E.flat("#fffbe0"), [0, -1.78, 0], { parent: R.lamp });
  // props in hands
  R.handDonut = donut(E, R.T.elbows[1], [0, -0.5, 0.12], 1.0, "#ff7fb8", [0, 0, 0]);
  R.flyDonut = donut(E, null, [0, -50, 0], 1.1, "#ff7fb8", [0, 0, 0]);
  // hood that blows over Toast's face (shot 10)
  const { HW, HH, HD } = R.T.dims; R.flap = E.group(R.T.head, [0, HH + 0.08, HD / 2 + 0.06]); E.box(HW + 0.18, HH + 0.06, 0.1, E.mat("#ff8a1f"), [0, -(HH + 0.06), 0], { parent: R.flap });
}
// ---------- overlays ----------
const banner = (txt, s, a = 1, col = "#ffe14a", y = 560) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, y * k); g.rotate(-0.07); g.scale(s, s);
  g.fillStyle = "#ff4d1f"; g.strokeStyle = INK; g.lineWidth = 18 * k; g.lineJoin = "round"; g.beginPath(); const n = 22; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 0.8 : 1, an = (i / (n * 2)) * Math.PI * 2, px = Math.cos(an) * 640 * k * r, py = Math.sin(an) * 250 * k * r; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke(); g.fill();
  g.font = F(178, k); g.textAlign = "center"; g.textBaseline = "middle"; g.lineWidth = 34 * k; g.strokeText(txt, 0, 8 * k); g.fillStyle = "#b8320a"; g.fillText(txt, 8 * k, 20 * k); g.fillStyle = col; g.fillText(txt, 0, 8 * k); g.restore(); };
const bubble = (syl, n, x, y, tx, ty, pop, o = {}) => (g, w) => { if (n <= 0) return; const k = w / 1080, size = o.size || 110; g.save(); g.font = F(size, k); const txt = Array(n).fill(syl).join(" "), full = Array(o.max || n).fill(syl).join(" ");
  const tw = g.measureText(full).width + 110 * k, th = size * 1.9 * k; g.translate(x * k, y * k); g.scale(pop, pop); g.rotate(o.rot || -0.05);
  g.fillStyle = "#ffffff"; g.strokeStyle = INK; g.lineWidth = 14 * k; g.lineJoin = "round";
  g.beginPath(); g.moveTo(-60 * k, th / 2 - 10 * k); g.lineTo((tx - x) * k * 0.55, (ty - y) * k * 0.55); g.lineTo(40 * k, th / 2 - 10 * k); g.closePath(); g.stroke(); g.fill();
  g.beginPath(); g.roundRect(-tw / 2, -th / 2, tw, th, th * 0.42); g.stroke(); g.fill();
  g.beginPath(); g.moveTo(-54 * k, th / 2 - 12 * k); g.lineTo((tx - x) * k * 0.5, (ty - y) * k * 0.5); g.lineTo(34 * k, th / 2 - 12 * k); g.closePath(); g.fill();
  g.fillStyle = o.col || "#ff3d7f"; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(txt, -tw / 2 + 55 * k, 6 * k); g.restore(); };
const label = (txt, y, size, a = 1, col = "#ffe14a", s = 1) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, y * k); g.scale(s, s); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(size, k); g.lineWidth = size * 0.2 * k; g.strokeStyle = INK; g.strokeText(txt, 0, 0); g.fillStyle = col; g.fillText(txt, 0, 0); g.restore(); };
const vhs = (f) => (g, w, h) => { const k = w / 1080; g.save(); g.fillStyle = "rgba(255,255,255,0.10)"; for (let y = (f * 37) % 24; y < h; y += 24) g.fillRect(0, y, w, 3); g.fillStyle = "rgba(20,15,32,0.25)"; g.fillRect(0, 0, w, h);
  g.font = F(120, k); g.fillStyle = "#ffffff"; g.textAlign = "left"; g.lineWidth = 16 * k; g.strokeStyle = INK; g.strokeText("◀◀", 70 * k, 330 * k); g.fillText("◀◀", 70 * k, 330 * k); g.restore(); };

export function frame(f0, E) {
  const X = E.X, THREE = E.THREE, OV = [], FXS = [];
  const { T, P, D } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  // fail-screen freeze: 4 frames held on impact (shot 13)
  const IMP = S(13) + 30; const f = f0 > IMP && f0 <= IMP + 4 ? IMP : f0;
  const t = f / FPS, sp = (a, b) => X.span(f, a, b), pop = (a, n = 9) => (f < a ? 0 : X.back(X.span(f, a, a + n)));
  let n = 1; while (n < 15 && f0 >= S(n + 1)) n++;
  const fs = f - S(n);           // frame inside the shot
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const OPEN = { happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", angry: "angry", talk: "talk", sad: "talk" };
  const say = (who, base) => (amp(who) > 0.55 ? OPEN[base] || "talk" : base);
  const walk = (ph, a = 0.75) => { const sw = Math.sin(ph); return { legL: a * sw, legR: -a * sw, kneeL: Math.max(0, -sw) * 0.9, kneeR: Math.max(0, sw) * 0.9, armL: [-0.9 * sw, 0.3], armR: [0.9 * sw, 0.3], elbowL: 0.5, elbowR: 0.5 }; };
  const grow = (a, b, f1, n = 8) => (f < f1 ? a : a + (b - a) * X.back(X.span(f, f1, f1 + n)));
  const mouth = () => { D.root.updateMatrixWorld(true); const v = new THREE.Vector3(); D.jaw.getWorldPosition(v); return v; };
  let cam, flash = 0, shk = null, light = ["interior", "night", 0.3], grade = null, caption = true;
  // reset
  [T, P, D].forEach((q) => q.pose({ visible: false })); P.boardAt([0, -50, 0], 0, 0, 0, false);
  R.handDonut.visible = false; R.flyDonut.visible = false; R.flap.visible = false; R.flap.rotation.x = 0;
  R.tray.forEach((d, i) => { d.visible = true; d.position.set(-0.85 + i * 0.32, 1.28, -1.75); d.scale.setScalar(1); });
  R.door.rotation.y = 0; R.bell.rotation.z = 0; R.lamp.rotation.set(0, 0, 0); D.eyes.forEach((e) => e.scale.setScalar(1));
  T.tail = null;
  const clock = n <= 1 ? "3:01" : n === 2 ? (fs < 10 ? "3:00" : "2:59") : n < 5 ? "2:59" : n === 5 ? (fs < 26 ? "2:59" : "3:00") : n < 8 ? "3:00" : "3:01";
  if (clock !== R.clockKey) R.clockDraw(clock);
  // size counter (top of frame) from shot 3 on
  const EAT0 = S(7) + 34, eaten = (ff) => { let c = 0; for (let i = 0; i < 7; i++) if (ff >= EAT0 + i * 5 + 11) c++; return c; };
  const stepScale = () => { let v = 1; for (let i = 0; i < 7; i++) v += 0.107 * X.back(X.span(f, EAT0 + i * 5 + 11, EAT0 + i * 5 + 16)); return v; };
  const size = n < 6 ? 1 : n === 6 ? (fs < 8 ? 1 : 3) : n === 7 ? 3 + eaten(f) : n === 8 ? (fs < 10 ? 10 : 20) : 20;
  const lastEat = n === 7 && eaten(f) > 0 ? EAT0 + (eaten(f) - 1) * 5 + 11 : -99;
  const sizePop = (n === 6 && fs >= 8) ? pop(S(6) + 8) : (n === 8 && fs >= 10) ? pop(S(8) + 10) : (n === 7 && f - lastEat < 5) ? 0.6 + 0.4 * pop(lastEat, 5) : 1;
  const showCounter = n >= 3 && n !== 11 && n !== 13 && n !== 15 && !(n === 3 && f - S(3) < 45);
  // Donutsaurus scale through the story
  const DS = n <= 5 ? 0.35 : n === 6 ? grow(0.35, 1.0, S(6) + 8) : n === 7 ? stepScale() : n === 8 ? grow(1.75, 2.3, S(8) + 10, 10) : 2.3;
  const giantPos = [-2.4, 0, -0.35];
  const ceilBend = (s) => (s > 2.15 ? { lean: 0.32, head: [0.55, 0, 0] } : {});

  switch (n) {
    case 1: { // LOW flash-forward: giant under the ceiling, tiny Toast screaming
      D.pose({ pos: giantPos, scale: 2.3, yaw: 0.35, jaw: 0.75, ...ceilBend(2.3), tailY: 0.2 * Math.sin(f * 0.3), look: [0.4, -0.6] });
      T.pose({ pos: [0.2, 0, 0.9], yaw: -0.35, armL: [-2.9, 0.4], armR: [-2.9, 0.4], elbowL: 0.2, elbowR: 0.2, legLz: 0.15, legRz: 0.15, face: say("toast", "scared") });
      R.lamp.rotation.z = 0.35 * Math.sin(f * 0.25);
      FXS.push({ kind: "sweat", pos: [-1.0, R.CEIL - 2.0, 0.9], size: 0.7, t: f / 30 });
      cam = { pos: [2.0, 0.5, 9.6], look: [-1.3, 5.2, -0.6], fov: 66 };
      OV.push(label("3:01 AM", 300, 120, 1, "#ff4d4d", 0.9 + 0.1 * pop(2, 8)));
      break; }
    case 2: { // rewind: everything shrinks back fast, then the clock
      const k = X.easeIn(sp(S(2), S(2) + 15));
      if (fs < 15) { D.pose({ pos: [X.lerp(giantPos[0], DX, k), 0, X.lerp(giantPos[2], DZ, k)], scale: X.lerp(2.3, 0.35, k), yaw: 0.35, jaw: 0.4 }); T.pose({ pos: [X.lerp(0.6, TPOS[0], k), 0, X.lerp(1.6, TPOS[2], k)], yaw: -0.3, armL: [-2.6 * (1 - k), 0.4], armR: [-2.6 * (1 - k), 0.4], face: "scared" });
        cam = { pos: [0.6, 2.6, 10.5], look: [-0.6, 2.8, -1], fov: 52 }; OV.push(vhs(f)); }
      else { cam = { pos: [R.clockPos[0], R.clockPos[1], -2.6], look: [R.clockPos[0], R.clockPos[1], -5], fov: 40 }; OV.push(vhs(f)); }
      OV.push(label("1 MINUTE EARLIER", 1220, 86, 1, "#ffffff"));
      caption = false;
      break; }
    case 3: { // MED: Toast reads the sign, donut in hand; puppy below, staring
      R.handDonut.visible = true;
      T.pose({ pos: TPOS, yaw: 0.55, armR: [-0.7, 0.15], elbowR: 1.1, armL: [-0.2, 0.2], elbowL: 0.4, head: [-0.12, 0.35, 0], face: say("toast", "happy") });
      D.pose({ pos: [DX, 0, DZ], scale: 0.35, yaw: 0.9, head: [-0.35, 0, 0.15], look: [0.6, 0.8], tailY: 0.5 * Math.sin(f * 0.6) });
      cam = fs < 45 ? { pos: [R.signPos[0], R.signPos[1] - 0.1, R.signPos[2] + 3.6 - 0.25 * (fs / 45)], look: [R.signPos[0], R.signPos[1] - 0.1, R.signPos[2]], fov: 40 } : { pos: [0.3, 2.35, 8.0], look: [0.35, 1.95, -1.5], fov: 52 };
      if (fs < 45) caption = true;
      break; }
    case 4: { // CU: puppy eyes
      R.handDonut.visible = true;
      D.pose({ pos: [DX, 0, DZ], scale: 0.35, yaw: 0.25, head: [-0.45, 0.1, 0.25 * X.smooth(sp(S(4) + 18, S(4) + 30))], look: [0.3, 0.9], tailY: 0.6 * Math.sin(f * 0.7) });
      D.eyes.forEach((e) => e.scale.setScalar(1.45));
      T.pose({ pos: TPOS, yaw: -0.4, armR: [-0.7, 0.15], elbowR: 1.1, face: "happy" });
      const hp = mouth(); cam = { pos: [hp.x + 0.5, hp.y + 0.45, hp.z + 2.7], look: [hp.x, hp.y + 0.3, hp.z], fov: 42 };
      if (fs > 6) D.eyes.forEach((e, i) => { const v = new THREE.Vector3(); e.getWorldPosition(v); FXS.push({ kind: "sparkle", pos: [v.x + 0.05, v.y + 0.08, v.z + 0.12], size: 0.16, t: fs / 30 + i * 0.3 }); });
      break; }
    case 5: { // MED: the toss; clock flips while the donut is in the air
      const a = S(5) + 6, b = S(5) + 50, k = sp(a, b);
      D.pose({ pos: [DX, 0, DZ], scale: 0.35, yaw: 0.8, head: [-0.5 + 0.4 * k, 0, 0], jaw: k > 0.75 ? 1 : 0.2, look: [0.5, 0.9], tailY: 0.6 * Math.sin(f * 0.7) });
      const lookClock = f >= a + 22 && f < b;
      T.pose({ pos: TPOS, yaw: -0.4, armR: f < a ? [-0.7, 0.15] : [-2.4, 0.2], elbowR: f < a ? 1.1 : 0.2, head: lookClock ? [-0.5, 0.35, 0] : [-0.2, -0.3, 0], face: lookClock ? "shock" : "grin" });
      R.handDonut.visible = f < a;
      if (f >= a && f < b) { T.root.updateMatrixWorld(true); const h0 = new THREE.Vector3(TPOS[0] - 0.35, 1.6, TPOS[2] + 0.2), m = mouth(); const x = X.lerp(h0.x, m.x, k), z = X.lerp(h0.z, m.z, k), y = X.lerp(h0.y, m.y, k) + 1.7 * 4 * k * (1 - k);
        R.flyDonut.visible = true; R.flyDonut.position.set(x, y, z); R.flyDonut.rotation.set(k * 8, k * 3, 0); }
      cam = { pos: [-0.4, 2.4, 7.6], look: [-0.35, 2.55, -2.0], fov: 52 };
      if (f >= b && f < b + 6) FXS.push({ kind: "puff", pos: [DX + 0.2, 0.9, DZ + 0.3], size: 0.5, t: (f - b) / 6 });
      break; }
    case 6: { // MED: grow 0.35 -> 1.0; Toast steps back
      const back = X.smooth(sp(S(6) + 10, S(6) + 24));
      D.pose({ pos: [DX, 0, DZ], scale: DS, yaw: 0.45, head: [-0.1, 0.2, 0], look: [0.5, 0.2], tailY: 0.5 * Math.sin(f * 0.5) });
      T.pose({ pos: [TPOS[0] + 0.6 * back, 0, TPOS[2] + 0.2 * back], yaw: -0.5, armL: [-0.4, 0.4], elbowL: 0.6, armR: [-0.4, 0.4], elbowR: 0.6, face: say("toast", "grin"), sway: 0.04 * Math.sin(f * 0.5) });
      cam = { pos: [-0.2, 2.5, 8.6], look: [-0.5, 2.0, 0], fov: 50 };
      if (fs >= 8 && fs < 20) FXS.push({ kind: "stars", pos: [DX, DS * R.DH * 0.6, DZ + 0.8], size: 0.6, t: fs / 30 });
      break; }
    case 7: { // MED: rumble, looks at tray, the stream of 7 donuts
      const rum = fs < 18 ? Math.sin(fs * 2.2) * 0.06 : 0, eat0 = EAT0;
      D.pose({ pos: [DX + rum, 0, DZ], scale: DS, yaw: 0.65, head: [0, 0.45, 0], jaw: f >= eat0 - 4 && f < eat0 + 44 ? 1 : 0.2, look: [0.8, -0.2], squash: fs < 18 ? 0.04 * Math.sin(fs * 1.5) : 0 });
      T.pose({ pos: [0.15, 0, -0.75], yaw: -1.15, armL: [0, 1.45], armR: [0, 1.45], elbowL: 0.1, elbowR: 0.1, legLz: 0.2, legRz: 0.2, head: [0, 0.2, 0], face: say("toast", "angry") });
      const m = mouth();
      R.tray.forEach((d, i) => { const a = eat0 + i * 5, k = sp(a, a + 11); if (f < a) return; if (k >= 1) { d.visible = false; return; }
        const p0 = new THREE.Vector3(-0.85 + i * 0.32, 1.28, -1.75), c = new THREE.Vector3((p0.x + m.x) / 2 + 0.2, Math.max(p0.y, m.y) + 1.4, (p0.z + m.z) / 2 + 0.6);
        const u = 1 - k; d.position.set(u * u * p0.x + 2 * u * k * c.x + k * k * m.x, u * u * p0.y + 2 * u * k * c.y + k * k * m.y, u * u * p0.z + 2 * u * k * c.z + k * k * m.z); d.rotation.set(k * 10, k * 4, 0); d.scale.setScalar(1 - 0.5 * k); });
      cam = { pos: [0.2, 2.9, 9.0], look: [-0.7, 2.4, -0.6], fov: 52 };
      break; }
    case 8: { // LOW: grow 1.0 -> 2.3, head hits the ceiling, lamp swings
      const k = X.smooth(sp(S(8) + 10, S(8) + 22));
      D.pose({ pos: [X.lerp(DX, giantPos[0], k), 0, X.lerp(DZ, giantPos[2], k)], scale: DS, yaw: 0.35, ...(DS > 2.15 ? ceilBend(DS) : {}), jaw: 0.3, look: [0.4, -0.4] });
      T.pose({ pos: [1.0, 0, 1.2], yaw: -0.4, armL: [-2.6, 0.5], armR: [-2.6, 0.5], elbowL: 0.3, elbowR: 0.3, face: "shock" });
      const hit = S(8) + 20; if (f >= hit) { R.lamp.rotation.z = 0.5 * Math.sin((f - hit) * 0.35) * Math.exp(-(f - hit) / 40); shk = [hit, 0.12, 10]; if (f < hit + 12) FXS.push({ kind: "puff", pos: [-1.6, R.CEIL - 0.3, 0.2], size: 1.3, t: (f - hit) / 12 }, { kind: "puff", pos: [-3.0, R.CEIL - 0.3, 0.0], size: 1.0, t: (f - hit) / 12 + 0.2 }); }
      cam = { pos: [1.4, 0.5, 6.4], look: [-1.2, 4.4, -0.6], fov: 64 };
      break; }
    case 9: { // WIDE: Pixi walks in; Toast "hides" the giant
      const dOpen = X.smooth(sp(S(9) + 2, S(9) + 12)) * (1 - X.smooth(sp(S(9) + 40, S(9) + 52)));
      R.door.rotation.y = -1.6 * dOpen; R.bell.rotation.z = f < S(9) + 22 ? 0.5 * Math.sin((f - S(9)) * 1.2) * (1 - (f - S(9)) / 22) : 0;
      const wk = sp(S(9) + 6, S(9) + 26), px = X.lerp(4.2, 2.2, wk), pz = X.lerp(-4.4, 1.3, wk);
      P.pose({ pos: [px, 0, pz], yaw: wk < 1 ? -0.3 : -0.55, ...(wk < 1 ? walk(f * 0.45, 0.5) : {}), armR: [0, 0.35], elbowR: 0.2, armL: wk < 1 ? [0.3, 0.2] : [-0.3, 0.6], elbowL: wk < 1 ? 0.3 : 1.7, face: say("pixi", "deadpan") });
      P.boardAt([px + 0.5, 0.95, pz], -0.3, Math.PI / 2, 0, true);
      D.pose({ pos: giantPos, scale: 2.3, yaw: 0.3, ...ceilBend(2.3), jaw: 0.2, look: [0.5, -0.5], tailY: 0.2 * Math.sin(f * 0.2) });
      T.pose({ pos: [-0.6, 0, 1.7], yaw: 0.35, armL: [0, 1.5], armR: [0, 1.5], elbowL: 0.05, elbowR: 0.05, legLz: 0.25, legRz: 0.25, face: say("toast", f >= Math.round(L[6].s * 30) - 8 ? "grin" : "shock") });
      cam = { pos: [0.4, 4.3, 15.0], look: [0.1, 4.0, -1], fov: 54 };
      break; }
    case 10: { // MED: the burp wind
      const k = X.back(sp(S(10) + 4, S(10) + 12));
      P.pose({ pos: [2.2, 0, 1.3], yaw: -0.55, armL: [-0.3, 0.6], elbowL: 1.7, armR: [0, 0.35], face: "deadpan", sway: -0.05 * k });
      P.boardAt([2.7, 0.95, 1.3], -0.55, Math.PI / 2, 0, true); if (P.tail) P.tail.rotation.set(0, 1.3 * k + 0.15 * Math.sin(f * 1.7) * k, 0);
      T.pose({ pos: [-0.6, 0, 1.7], yaw: 0.35, armL: [0, 1.3], armR: [0, 1.3], lean: -0.1 * k, face: "shock" });
      R.flap.visible = true; R.flap.rotation.x = X.lerp(-2.6, 0, k);
      D.pose({ pos: giantPos, scale: 2.3, yaw: 0.3, ...ceilBend(2.3), jaw: fs > 2 && fs < 22 ? 0.9 : 0.2 });
      cam = { pos: [0.85, 2.0, 9.4], look: [0.85, 1.6, 1.4], fov: 50 };
      if (fs > 3 && fs < 30) FXS.push({ kind: "puff", pos: [-2.0 + fs * 0.12, 2.2, 1.6], size: 1.2, t: (fs - 3) / 27 });
      break; }
    case 11: { // Pixi points up; push in on the small print
      const k = X.smooth(sp(S(11) + 8, S(11) + 38));
      P.pose({ pos: [2.2, 0, 1.3], yaw: 0.25, armR: [-2.45, 0.45], elbowR: 0.1, armL: [-0.3, 0.6], elbowL: 1.7, head: [-0.3, 0.1, 0], face: say("pixi", "deadpan") });
      P.boardAt([2.75, 0.95, 1.3], 0.25, Math.PI / 2, 0, true);
      T.pose({ pos: [-0.6, 0, 1.7], yaw: 0.6, face: "shock" });
      const sp0 = R.signPos, endY = sp0[1] - 0.82;
      cam = { pos: [X.lerp(3.6, sp0[0], k), X.lerp(2.4, endY, k) + 1.3 * Math.sin(Math.PI * k), X.lerp(8.2, sp0[2] + 3.3, k)], look: [X.lerp(2.3, sp0[0], k), X.lerp(2.6, endY, k), X.lerp(0, sp0[2], k)], fov: X.lerp(52, 40, k) };
      caption = k < 0.5;
      if (k > 0.85) { const q = X.smooth(sp(S(11) + 34, S(11) + 42)); OV.push(label("RULE #2: IF YOU FED HIM —", 1180, 64, q, "#ffffff", 0.9 + 0.1 * q), label("RUN.", 1290, 150, q, "#ff3d3d", 0.8 + 0.2 * pop(S(11) + 40, 8))); }
      break; }
    case 12: { // CRASH on Toast
      const z = X.back(sp(S(12), S(12) + 6)), ep = X.spring(sp(S(12) + 2, S(12) + 14));
      T.pose({ pos: [-0.6, 0, 1.7], yaw: 0, armL: [-0.3, 0.9], armR: [-0.3, 0.9], elbowL: 0.4, elbowR: 0.4, face: "shock", eyePop: ep, headScale: 1 + 0.1 * ep });
      const hy = T.dims.H - T.dims.HH / 2;
      cam = { pos: [-0.6, X.lerp(1.9, hy + 0.05, z), X.lerp(9.0, 6.0, z)], look: [-0.6, X.lerp(1.5, hy, z), 1.7], fov: X.lerp(48, 42, z) };
      shk = [S(12) + 1, 0.05, 6];
      break; }
    case 13: { // WIDE: run, hop, sit — fail screen
      const run = sp(S(13), S(13) + 26), tx = X.lerp(-0.6, 1.9, run);
      const hopA = S(13) + 12, k = sp(hopA, IMP);
      const sat = f >= IMP;
      if (!sat) T.pose({ pos: [tx, 0.06 * Math.abs(Math.sin(f * 0.8)), 1.7], yaw: Math.PI / 2, lean: 0.25, ...walk(f * 0.8, 1.0), armL: [-2.6, 0.5], armR: [-2.4, 0.5], face: "scared" });
      else { T.pose({ pos: [1.9, 0, 1.7], yaw: 0.2, armL: [0, 1.5], armR: [0, 1.5], legLz: 0.6, legRz: 0.6, face: "dizzy" }); T.root.scale.set(1.6, 0.08, 1.6); }
      const dx = X.lerp(giantPos[0], 1.9, k), dz = X.lerp(giantPos[2], 1.2, k), dy = f < hopA ? 0 : 2.6 * 4 * k * (1 - k);
      D.pose({ pos: [dx, dy, dz], scale: 2.3, yaw: 0.3, lean: sat ? 0 : 0.2, squash: sat ? 0.22 * Math.exp(-(f - IMP) / 8) : 0, legL: f >= hopA && !sat ? -0.6 : sat ? -1.3 : 0, legR: f >= hopA && !sat ? -0.6 : sat ? -1.3 : 0, jaw: 0.6, look: [0.3, -0.6] });
      if (sat) { grade = { uSat: 0.35 }; shk = [IMP, 0.22, 10]; flash = f0 <= IMP + 2 ? 0.4 : 0;
        const b0 = IMP + 1, sc = f < b0 + 5 ? X.lerp(3.2, 1, X.easeIn(sp(b0, b0 + 5))) : 1 + 0.06 * Math.sin((f - b0 - 5) * 1.2) * Math.max(0, 1 - (f - b0 - 5) / 10); OV.push(banner("TOASTED!", sc)); }
      cam = { pos: [0.4, 4.2, 16.5], look: [0.6, 3.8, 0], fov: 54 }; caption = !sat;
      break; }
    case 14: { // MED: Donutsaurus laughs; Pixi arms crossed
      const lb = Math.abs(Math.sin(fs * 0.5));
      D.pose({ pos: [1.6, lb * 0.25, 0.6], scale: 2.3, yaw: -0.25, jaw: 0.5 + 0.5 * lb, head: [-0.35 + 0.2 * lb, 0, 0.1 * Math.sin(f * 0.6)], squash: 0.1 * (1 - lb), armUp: 0.8 * lb, tailY: 0.4 * Math.sin(f * 0.6), blink: lb < 0.3 });
      P.pose({ pos: [-0.9, 0, 2.2], yaw: 0.35, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, head: [0, 0.2, 0], face: say("pixi", "smug") });
      P.boardAt([-1.5, 0.0, 2.4], 0.3, 0, 0, true);
      cam = { pos: [0.6, 4.1, 15.6], look: [0.6, 4.1, 0], fov: 54 };
      const nn = Math.min(3, 1 + Math.floor(fs / 12)); OV.push(bubble("HA", nn, 600, 330, 640, 560, 0.85 + 0.15 * X.back((fs % 12) / 12), { max: 3, size: 110 }));
      break; }
    case 15: { // MED: flat Toast peels up
      const k = X.spring(sp(S(15) + 4, S(15) + 18));
      T.pose({ pos: [1.9, 0, 1.7], yaw: 0, armR: f >= Math.round(L[9].s * 30) ? [-1.4, 0.3] : [0, 0.4], elbowR: 0.5, armL: [0, 0.4], head: [0, 0, 0.12 * Math.sin(f * 0.5)], face: say("toast", "sad"), sway: 0.08 * Math.sin(f * 0.7) * (1 - k * 0.5) });
      T.root.scale.set(X.lerp(1.6, 1, k), X.lerp(0.08, 1, k), X.lerp(1.6, 1, k));
      cam = { pos: [1.9, 1.9, 6.4], look: [1.9, 1.3, 1.7], fov: 48 };
      break; }
  }
  if (showCounter && !(n === 13 && f >= IMP)) OV.push(label(`SIZE ×${size}`, 150, 84, 1, "#ffe14a", sizePop));
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, dof: { focus: 6, amount: 0 }, actors: [], fx: FXS, flash, caption, focusPt: cam.look, overlay: (g, w, h, sc) => OV.forEach((o) => o(g, w, h, sc)) };
}
