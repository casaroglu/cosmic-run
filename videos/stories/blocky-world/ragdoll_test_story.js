// Blocky World · ragdoll + gag test (7 s): skateboard slip -> crash zoom -> flight -> toaster -> break apart -> TOASTED -> HO HO HO -> reassemble
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
export const meta = { fps: 30, frames: 216, captions: false };
let R = {};
const TX = 3.0; // toaster left face
export function build(E) {
  const { THREE } = E;
  const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d");
  g.fillStyle = "#7fd4a0"; g.fillRect(0, 0, 256, 256); g.fillStyle = "#72c994"; g.fillRect(0, 0, 128, 128); g.fillRect(128, 128, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(40, 40);
  const fl = E.plane(160, 160, E.mat("#ffffff", { map: t }), [0, 0, 0], { rot: [-Math.PI / 2, 0, 0] }); fl.castShadow = false;
  // giant block toaster
  const tg = E.group(null, [TX + 1.3, 0, 0]); R.toaster = tg;
  E.box(2.6, 2.5, 3.4, E.mat("#d9dee6"), [0, 0.25, 0], { parent: tg });
  E.box(2.8, 0.25, 3.6, E.mat("#3a4250"), [0, 0, 0], { parent: tg });
  for (const x of [-0.55, 0.55]) E.box(0.5, 0.06, 2.6, E.mat("#23232e"), [x, 2.75, 0], { parent: tg });
  E.box(0.12, 0.9, 0.5, E.mat("#ff4d4d"), [-1.36, 1.2, 1.2], { parent: tg });
  E.box(0.1, 0.4, 0.4, E.mat("#ffe14a"), [-1.34, 0.7, -1.1], { parent: tg });
  R.toast = makeToast(E); R.pixi = makePixi(E); R.dino = makeDonutsaurus(E);
}
const F = (px, k, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
const INK = "#221a26";
/** huge slam banner across the screen */
const banner = (txt, s, a = 1, col = "#ffe14a", y = 620) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, y * k); g.rotate(-0.07); g.scale(s, s);
  g.fillStyle = "#ff4d1f"; g.strokeStyle = INK; g.lineWidth = 18 * k; g.lineJoin = "round"; g.beginPath(); const n = 22; for (let i = 0; i < n * 2; i++) { const r = (i % 2 ? 0.8 : 1) * 1; const an = (i / (n * 2)) * Math.PI * 2; const px = Math.cos(an) * 640 * k * r, py = Math.sin(an) * 250 * k * r; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke(); g.fill();
  g.font = F(178, k); g.textAlign = "center"; g.textBaseline = "middle"; g.lineWidth = 34 * k; g.strokeText(txt, 0, 8 * k); g.fillStyle = "#b8320a"; g.fillText(txt, 8 * k, 20 * k); g.fillStyle = col; g.fillText(txt, 0, 8 * k); g.restore(); };
/** speech bubble with n syllables shown; tail points to (tx,ty) in 1080-space */
const bubble = (syl, n, x, y, tx, ty, pop, o = {}) => (g, w) => { if (n <= 0) return; const k = w / 1080, size = o.size || 120; g.save(); g.font = F(size, k); const txt = Array(n).fill(syl).join(" "); const full = Array(o.max || n).fill(syl).join(" ");
  const tw = g.measureText(full).width + 110 * k, th = size * 1.9 * k; g.translate(x * k, y * k); g.scale(pop, pop); g.rotate(o.rot || -0.05);
  g.fillStyle = "#ffffff"; g.strokeStyle = INK; g.lineWidth = 14 * k; g.lineJoin = "round";
  g.beginPath(); g.moveTo(-60 * k, th / 2 - 10 * k); g.lineTo((tx - x) * k * 0.55, (ty - y) * k * 0.55); g.lineTo(40 * k, th / 2 - 10 * k); g.closePath(); g.stroke(); g.fill();
  g.beginPath(); g.roundRect(-tw / 2, -th / 2, tw, th, th * 0.42); g.stroke(); g.fill();
  g.beginPath(); g.moveTo(-54 * k, th / 2 - 12 * k); g.lineTo((tx - x) * k * 0.5, (ty - y) * k * 0.5); g.lineTo(34 * k, th / 2 - 12 * k); g.closePath(); g.fill();
  g.fillStyle = o.col || "#ff3d7f"; g.textAlign = "left"; g.textBaseline = "middle"; g.lineWidth = 6 * k; g.fillText(txt, -tw / 2 + 55 * k, 6 * k); g.restore(); };
export function frame(f, E) {
  const X = E.X, { toast: T, pixi: Px, dino: D } = R, OV = [], FXS = [];
  const sp = (a, b) => X.span(f, a, b), pop = (f0, n = 9) => (f < f0 ? 0 : X.back(X.span(f, f0, f0 + n)));
  let cam, flash = 0, shakeAt = null;
  const WX0 = -3.6, BX = -1.25; // walk start, board position
  // ---------- Pixi + Donutsaurus (always present) ----------
  const laughing = f >= 126 && f < 176, ho = laughing ? Math.floor((f - 128) / 9) : -1, hoT = laughing ? ((f - 128) % 9) / 9 : 0;
  const hoB = laughing && f >= 128 ? Math.sin(hoT * Math.PI) : 0;
  D.pose({ pos: [0.3, hoB * 0.18, -2.4], scale: 1.15, yaw: f < 82 ? -0.35 : 0.55, jaw: laughing ? 0.55 + 0.45 * hoB : f >= 82 && f < 126 ? 0.5 : 0, head: laughing ? [-0.45 + 0.2 * hoB, 0, 0.1 * Math.sin(f * 0.7)] : [0, 0, 0.05 * Math.sin(f * 0.1)], squash: laughing ? 0.14 * (1 - hoB) : 0.02 * Math.sin(f * 0.15), armUp: laughing ? 0.8 * hoB : 0, tailY: 0.3 * Math.sin(f * (laughing ? 0.7 : 0.12)), look: f < 52 ? [-0.6, 0] : f < 82 ? [0.5, 0.5] : [0.6, -0.2], blink: laughing && hoB < 0.3 });
  const heh = f >= 150 && f < 176;
  Px.pose({ pos: [-1.9, 0, -1.7], yaw: f < 82 ? 0.5 : 0.95, armL: [0, 0.45], elbowL: 1.5, armR: heh ? [-1.3, 0.25] : [0.05, 0.1], elbowR: heh ? 0.4 : 0.1, head: f < 52 ? [0.05, 0.2, 0] : [0, 0.1, heh ? -0.1 : 0], sway: 0.02 * Math.sin(f * 0.1), face: f < 40 ? "deadpan" : f < 82 ? "deadpan" : "smug" });
  // ---------- Toast ----------
  let bx = BX, bRoll = 0, bY = 0;
  if (f < 34) { // strut in
    const t = sp(0, 34), x = X.lerp(WX0, BX - 0.1, t), ph = f * 0.52, sw = Math.sin(ph);
    T.pose({ pos: [x, 0.07 * Math.abs(Math.cos(ph)), 0.9], yaw: 1.05, lean: -0.08, legL: 0.75 * sw, legR: -0.75 * sw, kneeL: Math.max(0, -sw) * 0.9, kneeR: Math.max(0, sw) * 0.9, armL: [-0.9 * sw, 0.35], armR: [0.9 * sw, 0.35], elbowL: 0.5, elbowR: 0.5, head: [-0.1, -0.25, 0.06 * sw], face: "grin" });
    cam = { pos: [x + 3.2, 1.7, 7.4], look: [x + 0.4, 1.25, 0.4], fov: 40 };
  } else if (f < 54) { // foot on the board -> crash zoom on the face
    const t = sp(34, 40), wob = Math.sin((f - 34) * 1.4) * (1 - sp(34, 54) * 0.4), ep = X.spring(sp(36, 50));
    bx = BX + 0.5 * sp(34, 54);
    T.pose({ pos: [bx - 0.1, 0.24, 0.9], yaw: 1.05, lean: -0.35 * t + 0.1 * wob, sway: 0.15 * wob, legL: -0.5, legR: 1.0 * t, kneeR: 0.3, armL: [-1.0 - wob * 0.6, 1.6], armR: [0.6 + wob * 0.6, 1.9], elbowL: 0.4, elbowR: 0.4, head: [0.1, -0.5, 0.1 * wob], face: "shock", eyePop: ep, headScale: 1 + 0.12 * ep });
    const z = X.back(sp(35, 42)); // crash zoom
    cam = { pos: [X.lerp(bx + 3.2, bx + 2.55, z), X.lerp(1.7, 2.08, z), X.lerp(7.4, 2.45, z)], look: [X.lerp(bx + 0.4, bx - 0.08, z), X.lerp(1.25, 2.0, z), 0.9], fov: X.lerp(40, 34, z) };
    if (f >= 36 && f < 52) FXS.push({ kind: "exclaim", pos: [bx + 0.9, 2.75, 0.9], size: 0.7, t: (f - 36) / 30 });
    shakeAt = [35, 0.05, 6];
  } else if (f < 80) { // launch: ballistic arc, two full spins, limbs flailing
    const t = (f - 54) / 26, x = X.lerp(BX + 0.4, TX - 0.55, t), y = 0.2 + 4 * 3.0 * t * (1 - t) * (1 - 0.0), w = f * 1.5;
    T.pose({ pos: [x, y, X.lerp(0.9, 0.2, t)], yaw: 1.05, roll: -Math.PI * 4 * t, stretch: [0.9, 1.12], armL: [2.2 * Math.sin(w), 1.6 + 0.8 * Math.cos(w * 1.3)], armR: [2.2 * Math.cos(w * 1.1), 1.6 + 0.8 * Math.sin(w)], elbowL: 0.8 + 0.7 * Math.sin(w * 1.7), elbowR: 0.8 + 0.7 * Math.cos(w * 1.5), legL: 1.1 * Math.sin(w * 1.2), legR: -1.1 * Math.sin(w * 1.2 + 0.8), kneeL: 0.8 + 0.7 * Math.cos(w), kneeR: 0.8 + 0.7 * Math.sin(w * 1.4), head: [0.2 * Math.sin(w), -0.3, 0.3 * Math.cos(w)], face: "scared" });
    bx = BX + 0.5 - (f - 54) * 0.22; bRoll = (f - 54) * 0.5; bY = Math.max(0, 0.9 * Math.sin(Math.min(1, (f - 54) / 18) * Math.PI));
    cam = { pos: [0.95, 2.3, 9.8], look: [0.85, 2.0, 0], fov: 40 };
  } else if (f < 84) { // impact frame: flattened on the toaster, freeze
    const sl = X.easeIn(sp(81, 84)) * 0.15;
    T.pose({ pos: [TX - 0.2, 0.55 - sl, 0.2], yaw: 1.57, armL: [0, 1.9], armR: [0, 2.1], elbowL: -0.5, elbowR: -0.4, legLz: 0.55, legRz: 0.7, kneeL: 0.3, head: [0, 0, 0.25], face: "dizzy" });
    T.root.scale.set(1.3, 1.15, 0.3);
    cam = { pos: [TX - 6.2, 1.9, 0.5], look: [TX, 1.75, 0.2], fov: 40 }; flash = Math.max(0, 1 - (f - 80) / 2) * 0.45; shakeAt = [80, 0.2, 8];
    
  } else { // break apart, later reassemble
    const back = f < 178 ? 0 : X.spring(sp(178, 200)), done = f >= 196;
    T.pose({ pos: [TX - 1.1, done ? 0.05 * Math.abs(Math.sin(f * 0.3)) : 0, 0.5], yaw: 0.5, burst: { f: f - 84, back, dir: [-0.7, 1, 0.45] }, face: "dizzy", sway: done ? 0.12 * Math.sin(f * 0.35) : 0, armL: [0, 0.3], armR: [0, 0.3], head: done ? [0, 0, 0.2 * Math.sin(f * 0.35)] : [0, 0, 0] });
    cam = { pos: [1.0, 1.8, 7.4], look: [1.5, 1.15, 0], fov: 40 }; shakeAt = [88, 0.16, 10];
    if (f >= 126 && f < 178) cam = { pos: [-0.5, 2.2, 7.0], look: [-0.3, 2.6, -2.4], fov: 42 };
    if (done) for (let i = 0; i < 3; i++) FXS.push({ kind: "stars", pos: [TX - 1.1 + 0.75 * Math.cos(f * 0.25 + i * 2.1), 2.45, 0.5 + 0.5 * Math.sin(f * 0.25 + i * 2.1)], size: 0.42, t: f / 30 });
    if (f >= 88 && f < 126) { const s = f < 96 ? X.lerp(3.2, 1, X.easeIn(sp(88, 93))) * (1 + 0.08 * Math.sin((f - 93) * 1.2) * Math.max(0, 1 - (f - 93) / 10)) : 1 + 0.02 * Math.sin(f * 0.6); OV.push(banner("TOASTED!", s, f > 120 ? 1 - sp(120, 126) : 1)); }
    if (laughing && ho >= 0) OV.push(bubble("HO", Math.min(4, ho + 1), 540, 400, 690, 700, 0.86 + 0.14 * X.back(hoT * 2.2) + 0.05 * Math.min(4, ho), { max: 4, col: "#ff3d7f", size: 100 }));
    if (heh) OV.push(bubble("heh.", 1, 240, 990, 130, 1150, pop(150), { size: 70, col: "#7a32d8", rot: 0.04 }));
  }
  if (f >= 80) bx = -40;
  Px.boardAt([bx, bY, 0.9], Math.PI / 2 - 0.1, 0, bRoll, true);
  if (shakeAt) { const s = E.shake(f, ...shakeAt); cam.pos = cam.pos.map((v, i) => v + s[i]); }
  return { cam, light: "day", dof: { focus: 6, amount: 0 }, actors: [], fx: FXS, flash, overlay: (g, w, h, s) => OV.forEach((o) => o(g, w, h, s)), caption: false };
}
