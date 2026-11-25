// Blocky World · Night Shift #1 "The Customer With No Shadow" (pilot)
import { blocky, makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
export const meta = { fps: 30, tail: 0.1 };
let R = {}, L = [], SH = [];
const INK = "#221a26", TX = 2.7, FPS = 30;
const card = (E, w, h, draw) => { const { THREE } = E, c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const F = (px, k = 1, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;

function donut(E, parent, pos, s = 1, icing = "#ff7fb8", rot = [Math.PI / 2, 0, 0]) {
  const { THREE } = E, g = E.group(parent, pos);
  const d = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.075 * s, 6, 12), E.mat("#e7b06a")); d.rotation.set(...rot); E.add(d, g);
  const i = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.07 * s, 6, 12, Math.PI * 2), E.mat(icing)); i.rotation.set(...rot); i.position.y = 0.025 * s; i.scale.set(1, 1, 0.75); E.add(i, g);
  return g;
}
function shadowMan(E) {
  const P = blocky(E, { skin: "#000", shirt: "#000", pants: "#000", shoe: "#000", face: { skin: "#000" },
    build: (P, E, M) => { E.box(1.1, 0.1, 1.0, M("#000"), [0, P.dims.HH, 0], { parent: P.head }); E.box(0.7, 0.45, 0.62, M("#000"), [0, P.dims.HH + 0.08, 0], { parent: P.head }); } });
  const dark = E.flat("#140f20");
  P.root.traverse((o) => { if (o.isMesh) { o.material = dark; o.castShadow = false; o.receiveShadow = false; } });
  P.faceMesh.visible = false; P.face = () => {};
  const glow = E.flat("#fff27a", { fog: false });
  P.eyes = [-1, 1].map((s) => E.box(0.2, 0.12, 0.04, glow, [s * 0.2, 0.5, P.dims.HD / 2 + 0.03], { parent: P.head, noShadow: true }));
  return P;
}
export async function build(E) {
  const { S, T, THREE } = E;
  try { L = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) { L = []; }
  // ---------- DONUT PLANET shop ----------
  S.room({ w: 11, d: 9, h: 4.6, wall: T.wallpaper("#ffd1e3", "#ffc2da", "stripe"), floor: T.tiles("#fff6fb", "#ffb3d4", 10), floorRep: 0.3, window: false, door: false });
  E.box(11, 0.5, 0.1, E.mat("#ff7fb8"), [0, 0, -4.44]);
  // door (back wall left) + doorway + bell
  E.plane(1.2, 2.5, E.flat("#0c0a18"), [-3.9, 1.25, -4.48], { noink: true });
  for (const x of [-4.56, -3.24]) E.box(0.14, 2.7, 0.14, E.mat("#ffffff"), [x, 0, -4.42]);
  E.box(1.46, 0.16, 0.14, E.mat("#ffffff"), [-3.9, 2.62, -4.42]);
  R.door = E.group(null, [-4.45, 0, -4.4]); E.box(1.1, 2.45, 0.08, E.mat("#8fd3ff"), [0.55, 0.05, 0], { parent: R.door }); E.box(0.8, 1.0, 0.09, E.mat("#cdeeff"), [0.55, 1.2, 0], { parent: R.door }); E.box(0.08, 0.08, 0.14, E.mat("#ffe14a"), [0.95, 1.1, 0.05], { parent: R.door });
  R.bell = E.group(null, [-3.9, 2.95, -4.3]); E.cone(0.14, 0.2, E.mat("#ffd23a"), [0, -0.2, 0], { parent: R.bell, rot: [0, 0, 0] }); E.sphere(0.05, E.mat("#ffd23a"), [0, -0.22, 0], { parent: R.bell });
  // neon sign
  const sign = card(E, 1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke();
    g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.shadowColor = "#ff7fd0"; g.shadowBlur = 30; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6);
    g.shadowBlur = 0; g.lineWidth = 16; g.strokeStyle = "#ffe14a"; g.beginPath(); g.arc(120, h / 2, 52, 0, 7); g.stroke(); g.strokeStyle = "#19e0c6"; g.beginPath(); g.ellipse(120, h / 2, 92, 26, -0.3, 0, 7); g.stroke(); });
  E.plane(4.2, 1.05, E.flat("#ffffff", { map: sign, fog: false }), [0.6, 3.75, -4.43], { noink: true });
  // digital clock
  R.clockC = document.createElement("canvas"); R.clockC.width = 512; R.clockC.height = 220; R.clockT = new THREE.CanvasTexture(R.clockC); R.clockT.colorSpace = THREE.SRGBColorSpace;
  R.clockDraw = (txt, on) => { const g = R.clockC.getContext("2d"); g.fillStyle = "#14101c"; g.fillRect(0, 0, 512, 220); g.lineWidth = 12; g.strokeStyle = "#ffffff"; g.strokeRect(6, 6, 500, 208);
    g.font = F(150, 1, 800); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = on ? "#ff3030" : "#5a1414"; g.shadowColor = "#ff3030"; g.shadowBlur = on ? 26 : 0; g.fillText(txt, 220, 116); g.shadowBlur = 0; g.font = F(56); g.fillText("AM", 432, 70); R.clockT.needsUpdate = true; };
  R.clockDraw("2:59", true); R.clockKey = "2:59";
  E.plane(1.5, 0.64, E.flat("#ffffff", { map: R.clockT, fog: false }), [-1.7, 3.85, -4.42], { noink: true });
  // rule poster
  const rule = card(E, 600, 820, (g, w, h) => { g.fillStyle = "#fffbe6"; g.fillRect(0, 0, w, h); g.lineWidth = 16; g.strokeStyle = INK; g.strokeRect(8, 8, w - 16, h - 16);
    g.fillStyle = "#ff3d3d"; g.fillRect(30, 30, w - 60, 150); g.font = F(64); g.textAlign = "center"; g.fillStyle = "#fff"; g.fillText("NIGHT SHIFT", w / 2, 100); g.font = F(54); g.fillText("RULES", w / 2, 160);
    g.fillStyle = INK; g.font = F(120); g.fillText("#1", w / 2, 320); g.font = F(54, 1, 800); ["NEVER SERVE", "A CUSTOMER", "WITH", "NO SHADOW"].forEach((l, i) => { g.fillStyle = i === 3 ? "#ff3d3d" : INK; g.fillText(l, w / 2, 420 + i * 72); });
    g.fillStyle = "#14101c"; g.fillRect(250, 700, 100, 80); g.fillStyle = "#fff27a"; g.fillRect(270, 725, 22, 12); g.fillRect(308, 725, 22, 12); });
  R.ruleMesh = E.plane(1.2, 1.64, E.mat("#ffffff", { map: rule }), [2.3, 2.6, -4.43], { noShadow: true });
  // counter + display donuts + back shelves
  S.counter(0.4, -1.8, { w: 5, col: "#ff7fb8", top: "#fff6fb" });
  const ic = ["#ff7fb8", "#7a4a2a", "#ffe14a", "#19e0c6", "#ffffff", "#9b4dff"];
  for (let i = 0; i < 7; i++) donut(E, null, [-1.6 + i * 0.62, 1.2, -1.75], 1.1, ic[i % 6], [-Math.PI / 2 + 0.25, 0, 0]);
  for (const y of [1.25, 1.95]) { E.box(5.2, 0.08, 0.5, E.mat("#ffffff"), [0.6, y, -4.2]); for (let i = 0; i < 9; i++) donut(E, null, [-1.6 + i * 0.55, y + 0.08, -4.15], 1, ic[(i + (y > 1.5 ? 2 : 0)) % 6]); }
  // giant toaster
  const tg = E.group(null, [TX + 1.3, 0, 0.6]);
  E.box(2.6, 2.5, 3.4, E.mat("#d9dee6", { map: T.metal("#d9dee6") }), [0, 0.25, 0], { parent: tg }); E.box(2.8, 0.25, 3.6, E.mat("#3a4250"), [0, 0, 0], { parent: tg });
  for (const x of [-0.55, 0.55]) E.box(0.5, 0.06, 2.6, E.mat("#23232e"), [x, 2.75, 0], { parent: tg });
  E.box(0.12, 0.9, 0.5, E.mat("#ff4d4d"), [-1.36, 1.2, 1.2], { parent: tg }); E.box(0.1, 0.4, 0.4, E.mat("#ffe14a"), [-1.34, 0.7, -1.1], { parent: tg });
  // floor donut (the banana peel)
  R.floorDonut = donut(E, null, [0.65, 0.07, 0.9], 1.4, "#ff7fb8", [-Math.PI / 2, 0, 0]);
  // ---------- security room (x = 40) ----------
  S.room({ x: 40, w: 6, d: 5, h: 3.6, wall: T.wallpaper("#2b3550", "#26304a", "stripe"), floor: T.tiles("#5a6378", "#4a5266", 8), window: false, door: false });
  const feeds = ["CAM 1 · FRONT", "CAM 2 · COUNTER", "CAM 3 · DOOR", "CAM 4 · TOASTER"];
  feeds.forEach((nm, i) => { const tex = card(E, 400, 300, (g, w, h) => { g.fillStyle = "#0d2a3a"; g.fillRect(0, 0, w, h); g.fillStyle = "#1c4a5c"; for (let y = 0; y < h; y += 8) g.fillRect(0, y, w, 3);
      g.fillStyle = "#7fffd4"; g.font = F(30); g.fillText(nm, 16, 40); g.fillStyle = "#ff3d3d"; g.beginPath(); g.arc(w - 40, 30, 10, 0, 7); g.fill(); g.fillText("REC", w - 120, 40);
      g.fillStyle = "#9fe8ff"; if (i === 1) { g.fillRect(170, 150, 60, 90); g.fillRect(175, 240, 50, 40); g.fillStyle = "#ffe14a"; g.fillRect(180, 250, 12, 8); g.fillRect(208, 250, 12, 8); } else if (i === 0) { g.fillRect(150, 120, 40, 70); g.fillRect(150, 190, 40, 60); g.fillRect(230, 130, 50, 120); } else { g.fillRect(160, 120, 80, 130); } });
    const x = 40 - 1.65 + (i % 2) * 1.2 + Math.floor(i / 2) * 2.1, y = 1.9 + (i % 2) * 0.0;
    E.box(1.1, 0.85, 0.3, E.mat("#23232e"), [x, y, -2.32]); E.plane(0.96, 0.72, E.flat("#ffffff", { map: tex, fog: false }), [x, y + 0.425, -2.16], { noink: true }); });
  E.box(5.2, 0.85, 0.3, E.mat("#23232e"), [40, 0.9, -2.3]); E.box(5.2, 0.85, 0.3, E.mat("#23232e"), [40, 2.9, -2.32]);
  S.table(40, -1.4, { w: 3.6, d: 0.9, col: "#3a4250" });
  for (let i = 0; i < 6; i++) E.box(0.12, 0.05, 0.12, E.mat(["#ff3d3d", "#19e0c6", "#ffe14a"][i % 3]), [38.8 + i * 0.45, 0.95, -1.2]);
  // ---------- cast ----------
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E);
  // mop in Toast's right hand
  R.mop = E.group(R.T.elbows[1], [0, -0.41, 0.04]); E.cyl(0.04, 0.04, 1.6, E.mat("#c79a5b"), [0, -0.5, 0], { parent: R.mop, seg: 8 }); E.box(0.5, 0.12, 0.2, E.mat("#19a0e0"), [0, -0.56, 0], { parent: R.mop }); for (let i = 0; i < 6; i++) E.box(0.06, 0.16, 0.06, E.mat("#f4f4f4"), [-0.2 + i * 0.08, -0.66, 0], { parent: R.mop });
  // walkie-talkie in Pixi's left hand
  R.walkie = E.group(R.P.elbows[0], [0, -0.45, 0.12]); E.box(0.16, 0.3, 0.1, E.mat("#ffe14a"), [0, -0.15, 0], { parent: R.walkie }); E.box(0.03, 0.22, 0.03, E.mat("#23232e"), [0.05, 0.12, 0], { parent: R.walkie });
  // the customer (head upside down)
  R.C = blocky(E, { skin: "#cfe3d8", shirt: "#3d4257", sleeve: "#3d4257", pants: "#2c3042", shoe: "#151515", face: { skin: "#cfe3d8", iris: "#111111", brow: "#333333" },
    build: (P, E, M) => { E.box(0.14, 0.5, 0.04, M("#ff3d3d"), [0, 0.18, 0.24], { parent: P.torso }); E.box(1.15, 0.08, 1.05, M("#ff3d3d"), [0, P.dims.HH, 0], { parent: P.head }); E.box(0.7, 0.62, 0.62, M("#ff3d3d"), [0, P.dims.HH + 0.08, 0], { parent: P.head }); E.box(0.72, 0.1, 0.64, M("#23232e"), [0, P.dims.HH + 0.12, 0], { parent: P.head }); } });
  R.C.root.traverse((o) => { if (o.isMesh) o.castShadow = false; });
  R.SM = shadowMan(E); R.smDonut = donut(E, R.SM.elbows[1], [0, -0.48, 0.14], 1.3, "#ff7fb8", [0, 0, 0]);
  SH = [shadowMan(E), shadowMan(E), shadowMan(E)];
  R.logo = null;
}
// ---------- 2D overlays ----------
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
const topText = (big, small, a = 1, y = 250) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.fillStyle = "rgba(20,15,32,0.82)"; g.beginPath(); g.roundRect(120 * k, (y - 85) * k, w - 240 * k, 250 * k, 40 * k); g.fill(); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
  g.font = F(110, k); g.lineWidth = 22 * k; g.strokeStyle = INK; g.strokeText(big, w / 2, y * k); g.fillStyle = "#ffe14a"; g.fillText(big, w / 2, y * k);
  if (small) { g.font = F(58, k, 800); g.lineWidth = 14 * k; g.strokeText(small, w / 2, (y + 105) * k); g.fillStyle = "#ffffff"; g.fillText(small, w / 2, (y + 105) * k); } g.restore(); };

export function frame(f, E) {
  const X = E.X, THREE = E.THREE, t = f / FPS, OV = [], FXS = [];
  const { T, P, D, C, SM } = R;
  const sp = (a, b) => X.span(f, a, b), pop = (f0, n = 9) => (f < f0 ? 0 : X.back(X.span(f, f0, f0 + n)));
  const s = (i) => (L[i] ? L[i].s : 0) * FPS, e = (i) => (L[i] ? L[i].e : 0) * FPS;
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const OPEN = { happy: "grin", deadpan: "talk", smug: "talk", sad: "talk", blink: "laugh", grin: "grin", scared: "scared", shock: "shock", angry: "angry", talk: "talk" };
  const say = (who, base) => (amp(who) > 0.55 ? OPEN[base] || "talk" : base);
  const proj = (x, y, z, w, h) => { const v = new THREE.Vector3(x, y, z).project(E.camera); return [((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h]; };
  const walk = (ph, a = 0.75) => { const sw = Math.sin(ph); return { legL: a * sw, legR: -a * sw, kneeL: Math.max(0, -sw) * 0.9, kneeR: Math.max(0, sw) * 0.9, armL: [-0.9 * sw, 0.3], armR: [0.9 * sw, 0.3], elbowL: 0.5, elbowR: 0.5 }; };
  // shot boundaries (frames)
  const B = { enter: s(1) - 6, pixi1: s(2) - 5, floor: s(3) - 4, pixi2: s(4) - 3, nosh: s(5) - 3, flight: s(6) - 2, dino: s(6) + 103, rule: s(7) - 5, quit: s(8) - 2, end: s(9) - 26 };
  const shot = f < B.enter ? "hook" : f < B.pixi1 ? "enter" : f < B.floor ? "pixi1" : f < B.pixi2 ? "floor" : f < B.nosh ? "pixi2" : f < B.flight ? "nosh" : f < B.dino ? "flight" : f < B.rule ? "dino" : f < B.quit ? "rule" : f < B.end ? "quit" : "end";
  // defaults
  let cam, flash = 0, shk = null, light = ["interior", "night", 0.32];
  const hideAll = () => { [T, P, D, C, SM, ...SH].forEach((q) => q.pose({ visible: false })); P.boardAt([0, -50, 0], 0, 0, 0, false); };
  hideAll(); R.mop.visible = true; R.walkie.visible = false; R.floorDonut.visible = f < B.flight + 14; R.floorDonut.position.set(0.65, 0.07, 0.9); R.floorDonut.rotation.set(0, 0, 0);
  // clock flips at f 8
  const ck = f < 8 ? "2:59" : "3:00"; if (ck !== R.clockKey) { R.clockDraw(ck, true); R.clockKey = ck; }
  // door: opens for the customer, blown off by Donutsaurus
  const dOpen = X.smooth(sp(B.enter + 2, B.enter + 12)) * (1 - X.smooth(sp(B.enter + 70, B.enter + 84)));
  R.door.position.set(-4.45, 0, -4.4); R.door.rotation.set(0, -1.7 * dOpen, 0);
  if (f >= B.dino + 4) { const k = X.easeIn(sp(B.dino + 4, B.dino + 16)); R.door.position.set(-4.45 + 0.3 * k, 0.02 + Math.sin(k * Math.PI) * 0.8, -4.4 + 2.6 * k); R.door.rotation.set(-Math.PI / 2 * k, 0.4 * k, 0); }
  const ring = (f0) => (f >= f0 && f < f0 + 20 ? 0.5 * Math.sin((f - f0) * 1.2) * (1 - (f - f0) / 20) : 0);
  R.bell.rotation.z = ring(B.enter + 2) + ring(B.end);
  // the shadow man behind the counter, eating
  const smOn = f < B.dino + 48; const chew = Math.sin(f * 0.35);
  if (smOn) SM.pose({ pos: [-0.4, -0.15, -2.75], yaw: 0.15, armR: [-1.0 + 0.25 * chew, 0.15], elbowR: 1.6 + 0.2 * chew, armL: [-0.6, 0.2], elbowL: 1.2, head: [0.08 * chew, 0, 0] });
  R.smDonut.scale.setScalar(Math.max(0.25, 1 - Math.max(0, f - B.pixi2) / 220));
  SM.eyes.forEach((m) => (m.scale.y = (f % 97) < 4 ? 0.2 : 1));
  // the customer
  const custPos = (() => { const a = B.enter + 6, b = B.enter + 50, c = B.enter + 64;
    if (f < a) return { p: [-3.9, 0, -4.1], yaw: 0, w: 0 }; if (f < b) return { p: [-3.9, 0, X.lerp(-4.1, 0.6, sp(a, b))], yaw: 0, w: 1 }; if (f < c) return { p: [X.lerp(-3.9, -2.7, sp(b, c)), 0, 0.6], yaw: Math.PI / 2, w: 1 }; return { p: [-2.7, 0, 0.6], yaw: Math.PI / 2 - 0.75, w: 0 }; })();
  const custShow = () => { C.pose({ pos: custPos.p, yaw: custPos.yaw, ...(custPos.w ? walk(f * 0.45, 0.5) : { armL: [0, 0.1], armR: [0, 0.1] }), face: (f >= e(1) + 3 && f < e(1) + 24) ? (f % 6 < 3 ? "talk" : "happy") : "happy" });
    C.head.rotation.set(0, 0, Math.PI); C.head.position.y = 0.72 + 0.92 + 0.72; };
  // Toast base (front area, holding the mop)
  const TP = [-1.2, 0, 0.6];
  const toastMop = (o = {}) => { const m = Math.sin(f * 0.25); T.pose({ pos: TP, yaw: 0, armR: [-0.35 + 0.25 * m, 0.12], elbowR: 0.3, armL: [-0.5 + 0.2 * m, 0.25], elbowL: 0.9, sway: 0.05 * m, ...o }); };

  switch (shot) {
    case "hook": {
      const z = X.back(sp(0, 7)), ep = X.spring(sp(7, 20));
      toastMop({ yaw: 0.1, face: f < 8 ? "shock" : say("toast", "scared"), eyePop: ep, headScale: 1 + 0.1 * ep, armR: [-0.2, 0.9], elbowR: 0.6, armL: [-2.2, 0.6], elbowL: 1.2 });
      custShow(); C.pose({ visible: false });
      cam = { pos: [X.lerp(-0.7, -1.05, z), X.lerp(1.9, 2.05, z), X.lerp(6.0, 3.75, z)], look: [-1.3, X.lerp(1.6, 2.35, z), -4], fov: X.lerp(48, 46, z) };
      if (f >= 8 && f < 40) light = ["interior", "night", (Math.sin(f * 2.1) > 0.2 ? 0.85 : 0.3)];
      shk = [7, 0.05, 8];
      if (f >= 9 && f < 40) FXS.push({ kind: "exclaim", pos: [-0.55, 2.75, 0.7], size: 0.55, t: (f - 9) / 30 });
      break; }
    case "enter": {
      const look = f >= s(1) ? -Math.PI / 2 + 0.25 : 0;
      toastMop({ yaw: look, face: f >= s(1) ? say("toast", "blink") : "happy", armL: f >= s(1) + 25 && f < e(1) ? [-1.4, 0.5] : [-0.5, 0.25], elbowL: f >= s(1) + 25 && f < e(1) ? 0.6 : 0.9 });
      custShow();
      cam = { pos: [-1.95, 2.15, 7.4], look: [-2.05, 1.45, -1.4], fov: 50 };
      if (f >= e(1) + 3 && f < e(1) + 26) FXS.push({ kind: "question", pos: [-1.0, 2.9, 0.7], size: 0.5, t: (f - e(1)) / 30 });
      break; }
    case "pixi1": case "pixi2": {
      const toFloor = shot === "pixi2" && f >= E.at("shadow") - 2;
      if (!toFloor) {
        R.walkie.visible = true; R.mop.visible = false;
        P.pose({ pos: [40, 0, -0.5], yaw: shot === "pixi1" ? 0.15 : -0.1, armL: [-1.25, 0.25], elbowL: 1.75, armR: shot === "pixi2" ? [-0.3, 0.4] : [0, 0.1], elbowR: shot === "pixi2" ? 1.2 : 0.1, head: [0.05, shot === "pixi1" ? -0.15 : 0.1, 0], face: say("pixi", shot === "pixi1" ? "deadpan" : "smug") });
        const k = shot === "pixi2" ? X.smooth(sp(B.pixi2, B.pixi2 + 30)) : 0;
        cam = { pos: [40.35 - 0.1 * k, 2.15, 3.9 - 1.0 * k], look: [40, 1.85, -1.2], fov: 46 };
        if (shot === "pixi1") { P.pose({ pos: [40, 0, -0.5], yaw: 0.15, armL: [-1.25, 0.25], elbowL: 1.75, head: [0.05, -0.15, 0], face: say("pixi", "deadpan") }); }
      } else {
        toastMop({ face: "grin" }); custShow();
        cam = { pos: [-2.35, 1.5, 4.9], look: [-2.45, 0.7, 0.4], fov: 48 };
        const k = pop(E.at("shadow"), 8);
        OV.push((g, w, h) => { const [x, y] = proj(-2.7, 0.03, 0.6, w, h), kk = w / 1080; g.save(); g.translate(x, y); g.scale(k, k); g.setLineDash([26 * kk, 16 * kk]); g.lineWidth = 14 * kk; g.strokeStyle = "#ff2d2d"; g.beginPath(); g.ellipse(0, 0, 230 * kk, 90 * kk, 0, 0, 7); g.stroke(); g.setLineDash([]);
          g.font = F(72, kk); g.textAlign = "center"; g.lineWidth = 16 * kk; g.strokeStyle = INK; g.strokeText("NO SHADOW?!", 0, 190 * kk); g.fillStyle = "#ff2d2d"; g.fillText("NO SHADOW?!", 0, 190 * kk); g.restore(); });
      }
      break; }
    case "floor": {
      toastMop({ face: say("toast", "grin"), armL: [-0.4, 0.7], elbowL: 1.3, head: [0, 0, 0.1] });
      if (f >= e(3) + 2) T.pose({ pos: TP, yaw: 0, armR: [-0.35, 0.12], elbowR: 0.3, armL: [-0.3, 0.9], elbowL: 1.6, lean: -0.15 - 0.05 * Math.sin(f * 1.4), head: [-0.25, 0, 0.1 * Math.sin(f * 1.2)], face: "laugh" });
      custShow();
      cam = { pos: [-1.9, 1.55, 5.6], look: [-2.0, 0.95, 0], fov: 50 };
      if (f >= e(3) + 2) { const n = Math.min(2, 1 + Math.floor((f - e(3) - 2) / 8)); OV.push(bubble("HA", n, 700, 560, 610, 760, 0.85 + 0.15 * X.back(((f - e(3)) % 8) / 8), { max: 2, size: 96 })); }
      break; }
    case "nosh": {
      const turn = f >= E.at("no") - 1;
      if (!turn) {
        toastMop({ yaw: Math.PI - 0.15, face: "shock" }); custShow();
        cam = { pos: [-1.55, 2.25, 2.3], look: [-0.45, 1.75, -2.75], fov: 46 };
        FXS.push({ kind: "question", pos: [-0.3, 2.95, -2.6], size: 0.5, t: (f - B.nosh) / 30 });
      } else {
        const z = X.back(sp(E.at("no") - 1, E.at("no") + 5)), ep = X.spring(sp(E.at("no"), E.at("no") + 12));
        toastMop({ yaw: 0, face: "shock", eyePop: ep, headScale: 1 + 0.12 * ep, armL: [-2.6, 0.7], elbowL: 0.4, armR: [-0.2, 0.9], elbowR: 0.4 });
        cam = { pos: [X.lerp(-1.1, -1.2, z), X.lerp(1.95, 2.05, z), X.lerp(5.6, 3.45, z)], look: [-1.2, X.lerp(1.6, 1.95, z), 0.6], fov: X.lerp(48, 44, z) };
        shk = [E.at("no"), 0.05, 6];
      }
      break; }
    case "flight": {
      const f0 = B.flight, fr = f - f0, slip = 13, land = 44;
      R.mop.visible = fr < slip;
      if (fr < slip) { const x = X.lerp(-1.2, 0.55, fr / slip); T.pose({ pos: [x, 0.08 * Math.abs(Math.cos(fr * 0.8)), 0.75], yaw: Math.PI / 2, lean: 0.25, ...walk(fr * 0.8, 1.0), armL: [-2.6, 0.5], armR: [-2.4, 0.5], elbowL: 0.3, elbowR: 0.3, head: [-0.2, -0.6, 0], face: "scared" }); }
      else if (fr < land) { const k = (fr - slip) / (land - slip), x = X.lerp(0.55, TX - 0.25, k), y = 0.2 + 1.3 * 4 * k * (1 - k) + 0.55 * k, w = fr * 1.5;
        T.pose({ pos: [x, y, X.lerp(0.75, 0.4, k)], yaw: Math.PI / 2, roll: 0, pitch: -Math.PI * 3 * k, stretch: [0.92, 1.1], armL: [2.2 * Math.sin(w), 1.6 + 0.8 * Math.cos(w * 1.3)], armR: [2.2 * Math.cos(w * 1.1), 1.6 + 0.8 * Math.sin(w)], elbowL: 0.8 + 0.7 * Math.sin(w * 1.7), elbowR: 0.8 + 0.7 * Math.cos(w * 1.5), legL: 1.1 * Math.sin(w * 1.2), legR: -1.1 * Math.sin(w * 1.2 + 0.8), kneeL: 0.8 + 0.7 * Math.cos(w), kneeR: 0.8 + 0.7 * Math.sin(w * 1.4), head: [0.2 * Math.sin(w), 0, 0.3 * Math.cos(w)], face: "scared" });
        const dk = sp(f0 + slip, f0 + slip + 16); R.floorDonut.position.set(X.lerp(0.65, -1.4, dk), 0.07 + 1.6 * Math.sin(dk * Math.PI), X.lerp(0.9, 1.6, dk)); R.floorDonut.rotation.set(dk * 9, 0, dk * 6); }
      else if (fr < land + 6) { T.pose({ pos: [TX - 0.2, 0.55 - X.easeIn(sp(f0 + land + 3, f0 + land + 6)) * 0.15, 0.4], yaw: Math.PI / 2, armL: [0, 1.9], armR: [0, 2.1], elbowL: -0.5, elbowR: -0.4, legLz: 0.55, legRz: 0.7, kneeL: 0.3, head: [0, 0, 0.25], face: "dizzy" }); T.root.scale.set(0.3, 1.15, 1.3); flash = Math.max(0, 1 - (fr - land) / 2) * 0.45; shk = [f0 + land, 0.2, 8]; }
      else { T.pose({ pos: [TX - 1.1, 0, 0.5], yaw: 0.5, burst: { f: fr - land - 6, back: 0, dir: [-0.7, 1, 0.45] }, face: "dizzy", armL: [0, 0.3], armR: [0, 0.3] }); shk = [f0 + land + 6, 0.16, 10];
        const b0 = f0 + land + 8; if (f >= b0) { const sc = f < b0 + 5 ? X.lerp(3.2, 1, X.easeIn(sp(b0, b0 + 5))) * 1 : 1 + 0.08 * Math.sin((f - b0 - 5) * 1.2) * Math.max(0, 1 - (f - b0 - 5) / 10) + 0.02 * Math.sin(f * 0.6); OV.push(banner("TOASTED!", sc, f > B.dino - 6 ? 1 - sp(B.dino - 6, B.dino) : 1)); } }
      custShow();
      cam = fr < land ? { pos: [X.lerp(-0.4, 0.9, X.smooth(sp(f0, f0 + land))), 2.4, 9.2], look: [X.lerp(-0.6, 1.0, X.smooth(sp(f0, f0 + land))), 2.0, 0], fov: 48 } : { pos: [1.0, 1.9, 7.6], look: [1.4, 1.3, 0], fov: 44 };
      break; }
    case "dino": {
      const f0 = B.dino, run0 = f0 + 8, arr = f0 + 34, chomp = f0 + 44, gulp = f0 + 52, burp = f0 + 66, laugh = f0 + 74;
      T.pose({ pos: [TX - 1.1, 0, 0.5], yaw: 0.5, burst: { f: f - B.flight - 50, back: 0, dir: [-0.7, 1, 0.45] }, face: "dizzy", armL: [0, 0.3], armR: [0, 0.3] });
      let dp = [-3.9, 0, -5.4], yaw = 0, legs = 0;
      if (f >= run0 && f < arr) { const k = sp(run0, arr); dp = k < 0.45 ? [-3.9, 0, X.lerp(-5.4, -3.25, k / 0.45)] : [X.lerp(-3.9, -1.75, (k - 0.45) / 0.55), 0, -3.25]; yaw = k < 0.45 ? 0 : Math.PI / 2; legs = Math.sin(f * 0.9); }
      else if (f >= arr) { dp = [-1.75, 0, -3.25]; yaw = Math.PI / 2 - 0.35 - 0.75 * X.smooth(sp(gulp, burp)); }
      const lb = f >= laugh ? Math.abs(Math.sin((f - laugh) * 0.55)) : 0;
      const jaw = f >= chomp - 6 && f < gulp ? 1 : f >= burp && f < burp + 8 ? 0.8 : f >= laugh ? 0.5 + 0.5 * lb : 0.15;
      D.pose({ pos: [dp[0], lb * 0.15, dp[2]], yaw, scale: 1.0, legL: 0.6 * legs, legR: -0.6 * legs, jaw, head: f >= laugh ? [-0.4 + 0.2 * lb, 0, 0.1 * Math.sin(f * 0.6)] : [0, 0, 0], squash: f >= laugh ? 0.12 * (1 - lb) : f >= gulp && f < gulp + 6 ? 0.18 : 0, armUp: f >= laugh ? 0.8 * lb : 0, tailY: 0.3 * Math.sin(f * 0.5), look: f < chomp ? [0.6, 0] : [0, 0.5], blink: f >= laugh && lb < 0.3 });
      if (f >= chomp - 4 && f < gulp) { const k = sp(chomp - 4, gulp - 2); SM.pose({ pos: [X.lerp(-0.4, -0.95, k), X.lerp(-0.15, 1.6, k), X.lerp(-2.75, -3.2, k)], yaw: 0.15 + k * 4, scale: Math.max(0.05, 1 - k), armL: [-2.6, 0.8], armR: [-2.6, 0.8], face: "x" }); }
      if (f >= gulp) SM.pose({ visible: false });
      if (f >= burp && f < burp + 14) FXS.push({ kind: "puff", pos: [-0.85, 2.7, -3.0], size: 1.2 + (f - burp) * 0.05, t: (f - burp) / 14 });
      if (f >= run0 && f < run0 + 14) shk = [run0, 0.12, 12];
      if (f >= laugh) { const n = Math.min(3, 1 + Math.floor((f - laugh) / 12)); OV.push(bubble("HA", n, 560, 470, 600, 760, 0.85 + 0.15 * X.back(((f - laugh) % 12) / 12), { max: 3, size: 120 })); }
      cam = { pos: [-1.3, 2.95, 6.2], look: [-1.75, 2.25, -3.0], fov: 50 };
      break; }
    case "rule": {
      const back = X.spring(sp(B.rule, B.rule + 22));
      T.pose({ pos: [TX - 1.1, 0, 0.5], yaw: -0.15, burst: { f: B.rule - B.flight - 50, back, dir: [-0.7, 1, 0.45] }, head: [0, Math.PI, 0], face: "dizzy", armL: [0, 0.3], armR: [0, 0.3] });
      P.pose({ pos: [-0.45, 0, 1.2], yaw: 0.55, armR: [-2.5, -0.35], elbowR: 0.15, armL: [0, 0.5], elbowL: 1.5, head: [0.1, 0.2, 0], face: say("pixi", "deadpan") });
      D.pose({ pos: [-2.6, 0, -3.1], yaw: 0.6, jaw: 0.2, tailY: 0.3 * Math.sin(f * 0.2), look: [0.5, 0] });
      cam = { pos: [0.65, 2.1, 8.2], look: [0.7, 1.9, -1.5], fov: 50 };
      if (f >= B.rule + 18 && f < B.rule + 40) FXS.push({ kind: "sparkle", pos: [1.4, 3.6, -3.9], size: 0.7, t: (f - B.rule) / 30 }, { kind: "sparkle", pos: [3.2, 1.8, -3.9], size: 0.5, t: (f - B.rule) / 30 + 0.4 });
      if (f >= B.rule + 22) FXS.push({ kind: "stars", pos: [TX - 1.1 + 0.7 * Math.cos(f * 0.25), 2.45, 0.5 + 0.5 * Math.sin(f * 0.25)], size: 0.4, t: f / 30 });
      break; }
    case "quit": {
      T.pose({ pos: [TX - 1.1, 0, 0.5], yaw: -0.1, head: [0, Math.PI, 0], face: "sad", armL: [0, 0.2], armR: f >= s(8) && f < s(8) + 30 ? [-1.6, 0.2] : [0, 0.2], elbowR: 0.6, sway: 0.06 * Math.sin(f * 0.3) });
      P.pose({ pos: [-0.3, 0, 1.3], yaw: 0.6, armL: [-0.2, 0.6], elbowL: 2.0, armR: [-0.2, 0.6], elbowR: 2.0, head: [0, 0.2, f >= e(8) + 3 ? -0.15 : 0], face: f >= e(8) + 3 && f < e(8) + 30 ? "laugh" : "smug" });
      cam = { pos: [0.8, 2.0, 5.4], look: [0.9, 1.75, 0.6], fov: 48 };
      if (f >= e(8) + 3) OV.push(bubble("heh.", 1, 250, 760, 180, 960, pop(e(8) + 3), { size: 80, col: "#7a32d8", rot: 0.04 }));
      break; }
    case "end": {
      const f0 = B.end, tA = f0 + 18, spin = f0 + 20;
      SH.forEach((q, i) => { q.pose({ pos: [-4.3 + i * 0.42, 0, -4.15 + (i === 1 ? -0.15 : 0)], yaw: 0, scale: 0.9 + (i === 1 ? 0.1 : 0), armL: [0, 0.1], armR: [0, 0.1], head: [0, 0, 0.1 * Math.sin(f * 0.2 + i)] }); q.eyes.forEach((m) => (m.scale.y = (f + i * 7) % 40 < 3 ? 0.2 : 1)); });
      if (f < tA) { cam = { pos: [-3.2, 1.75, -0.6], look: [-3.95, 1.55, -4.4], fov: 52 }; light = ["interior", "night", Math.sin(f * 1.7) > 0.3 ? 0.8 : 0.45]; }
      else {
        const hk = X.back(sp(spin, spin + 8)), z = X.back(sp(s(9) - 1, s(9) + 5)), ep = X.spring(sp(s(9), s(9) + 12));
        T.pose({ pos: [TX - 1.1, 0, 0.5], yaw: 0, head: [0, Math.PI * (1 - hk), 0], face: f >= s(9) ? say("toast", "scared") : "shock", eyePop: f >= s(9) ? ep : 0, headScale: 1 + 0.1 * ep, armL: [-2.4, 0.6], elbowL: 0.5, armR: [-2.2, 0.6], elbowR: 0.5 });
        cam = { pos: [X.lerp(1.4, 1.6, z), X.lerp(2.0, 2.1, z), X.lerp(6.0, 3.5, z)], look: [1.6, X.lerp(1.6, 1.95, z), 0.5], fov: X.lerp(48, 44, z) };
        shk = [s(9), 0.05, 6];
        OV.push(topText("NIGHT 2 →", "FOLLOW to survive", pop(spin + 4, 10), 250));
      }
      break; }
  }
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof: { focus: 6, amount: 0 }, actors: [], fx: FXS, flash, focusPt: cam.look, overlay: (g, w, h, sc) => OV.forEach((o) => o(g, w, h, sc)) };
}
