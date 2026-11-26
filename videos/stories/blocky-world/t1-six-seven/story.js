// Toast & Pixi · T1 "Don't Say 6-7" — built from scripts/SHORTS-2_trending.md (14 shots)
import { makeToast, makePixi, blocky, drawFace } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
export const meta = { fps: 30, tail: 1.55 };
let R = {}, SH = [], L = [];
const INK = "#221a26", FPS = 30;
const card = (E, w, h, draw) => { const { THREE } = E, c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const F = (px, k = 1, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
const H = 4.8, TP = [0.4, 0, 0.7], PP = [-1.45, 0, 1.0];
const SCREEN = [0.3, 3.05, -1.75], SIGN = [0.3, 2.3, -1.73], LAMP = [0.4, H, 0.6];
const KS = 0.5;                                   // kid scale (half Toast's height)
const NK = 67;
// Toast flat in mid-air, face down, limbs out (shot 1 == shot 14)
const FLAT = (y, spread = 1) => ({ pos: [TP[0], y, TP[2] + 1.1], pitch: -Math.PI / 2, armL: [-0.2, 1.3 * spread], armR: [-0.2, 1.3 * spread], legLz: 0.45 * spread, legRz: 0.45 * spread, head: [0.35, 0, 0] });
const LOOP = { cam: { pos: [2.3, 3.0, 5.6], look: [0.4, 1.95, 0.3], fov: 58 }, y: 2.0 };

export async function build(E) {
  const { S, T, THREE } = E;
  try { SH = (await (await fetch("../work/timeline.json?v=" + Date.now())).json()).shots; } catch (e) { SH = []; }
  try { L = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) { L = []; }
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E));
  S.room({ w: 12, d: 10, h: H, wall: T.wallpaper("#ffd1e3", "#ffc2da", "stripe"), floor: T.tiles("#fff6fb", "#ffb3d4", 10), floorRep: 0.3, window: false, door: false, ceiling: true });
  E.box(12, 0.5, 0.1, E.mat("#ff7fb8"), [0, 0, -4.94]);
  // doorway (right of back wall)
  E.plane(1.3, 2.6, E.flat("#1a1630"), [4.3, 1.3, -4.98], { noink: true }); for (const x of [3.6, 5.0]) E.box(0.14, 2.75, 0.14, E.mat("#ffffff"), [x, 0, -4.92]); E.box(1.54, 0.16, 0.14, E.mat("#ffffff"), [4.3, 2.68, -4.92]);
  const sign = card(E, 1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke(); g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.shadowColor = "#ff7fd0"; g.shadowBlur = 30; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6); g.shadowBlur = 0; g.lineWidth = 16; g.strokeStyle = "#ffe14a"; g.beginPath(); g.arc(120, h / 2, 52, 0, 7); g.stroke(); g.strokeStyle = "#19e0c6"; g.beginPath(); g.ellipse(120, h / 2, 92, 26, -0.3, 0, 7); g.stroke(); });
  E.plane(4.2, 1.05, E.flat("#ffffff", { map: sign, fog: false }), [-2.2, 4.05, -4.93], { noink: true });
  const ic = ["#ff7fb8", "#7a4a2a", "#ffe14a", "#19e0c6", "#ffffff", "#9b4dff", "#ff8a1f"];
  const small = (pos, c) => { const g = E.group(null, pos); const d = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.075, 6, 12), E.mat("#e7b06a")); d.rotation.x = -Math.PI / 2 + 0.3; E.add(d, g); const i = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.07, 6, 12), E.mat(c)); i.rotation.x = -Math.PI / 2 + 0.3; i.position.y = 0.025; i.scale.set(1, 1, 0.75); E.add(i, g); };
  R.SHELF = [1.25, 1.95, 2.65];
  for (const y of R.SHELF) { E.box(6.0, 0.08, 0.6, E.mat("#ffffff"), [-1.0, y, -4.65]); for (let i = 0; i < 10; i++) if (i % 3 !== 1) small([-3.7 + i * 0.6, y + 0.08, -4.6], ic[(i + Math.round(y * 3)) % 7]); }
  S.counter(-0.5, -1.8, { w: 5, col: "#ff7fb8", top: "#fff6fb" });
  // order screen above the counter, hanging from the ceiling
  const scr = card(E, 1024, 400, (g, w, h) => { g.fillStyle = "#14101c"; g.fillRect(0, 0, w, h); g.lineWidth = 16; g.strokeStyle = "#ffffff"; g.strokeRect(8, 8, w - 16, h - 16); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#19e0c6"; g.font = F(86); g.fillText("NOW SERVING", w / 2, 110); g.fillStyle = "#ff3030"; g.shadowColor = "#ff3030"; g.shadowBlur = 30; g.font = F(210); g.fillText("67", w / 2, 270); });
  for (const x of [-0.5, 0.5]) E.cyl(0.02, 0.02, H - SCREEN[1] - 0.4, E.mat("#23232e"), [SCREEN[0] + x, SCREEN[1] + 0.4, SCREEN[2]], { seg: 6 });
  E.box(1.72, 0.74, 0.1, E.mat("#23232e"), [SCREEN[0], SCREEN[1] - 0.37, SCREEN[2] - 0.06]); E.plane(1.6, 0.625, E.flat("#ffffff", { map: scr, fog: false }), [SCREEN[0], SCREEN[1], SCREEN[2]], { noink: true });
  // staff rule sign taped under the screen; folded corner flap carries the small print
  const rule = card(E, 1000, 560, (g, w, h) => { g.fillStyle = "#fffbe6"; g.fillRect(0, 0, w, h); g.lineWidth = 18; g.strokeStyle = INK; g.strokeRect(9, 9, w - 18, h - 18); g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = INK; g.font = F(70); g.fillText("STAFF RULE:", w / 2, 95);
    const row = (parts, y, sz) => { g.font = F(sz); let tw = parts.reduce((a, p) => a + g.measureText(p[0]).width, 0), x = w / 2 - tw / 2; g.textAlign = "left"; for (const [s, c] of parts) { g.fillStyle = c; g.fillText(s, x, y); x += g.measureText(s).width; } g.textAlign = "center"; };
    row([["NEVER", "#ff2d2d"], [" CALL", INK]], 215, 104); row([["ORDER ", INK], ["67", "#ff2d2d"]], 335, 104); row([["OUT LOUD", INK]], 455, 104);
    g.fillStyle = "#e9dfb8"; g.beginPath(); g.moveTo(w - 200, h); g.lineTo(w, h - 160); g.lineTo(w, h); g.closePath(); g.fill(); });
  R.sign = E.group(null, SIGN); E.plane(1.0, 0.56, E.mat("#ffffff", { map: rule }), [0, 0, 0], { parent: R.sign, noShadow: true });
  for (const [x, y] of [[-0.45, 0.25], [0.45, 0.25]]) E.box(0.16, 0.05, 0.01, E.flat("#e8e2c8", { transparent: true, opacity: 0.85 }), [x, y, 0.01], { parent: R.sign, center: true, noShadow: true, rot: [0, 0, x > 0 ? -0.6 : 0.6] });
  const flapT = card(E, 1000, 200, (g, w, h) => { g.fillStyle = "#fff3c0"; g.fillRect(0, 0, w, h); g.lineWidth = 10; g.strokeStyle = INK; g.strokeRect(5, 5, w - 10, h - 10); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = INK; g.font = F(58); g.fillText("CURE: A GROWN-UP", w / 2, 68); g.fillStyle = "#ff2d2d"; g.fillText("DOES IT TOO.", w / 2, 140); });
  R.flap = E.group(R.sign, [0, -0.28, 0.005]); R.flapM = E.plane(1.0, 0.2, E.mat("#ffffff", { map: flapT, side: THREE.DoubleSide }), [0, -0.1, 0], { parent: R.flap, noShadow: true });
  const back = E.plane(1.0, 0.2, E.mat("#e9dfb8", { side: THREE.DoubleSide }), [0, -0.1, -0.003], { parent: R.flap, noShadow: true }); back.rotation.y = Math.PI;
  // ceiling lamp over Toast's spot
  R.lamp = E.group(null, LAMP); E.cyl(0.02, 0.02, 1.25, E.mat("#23232e"), [0, -1.25, 0], { parent: R.lamp, seg: 6 }); E.cone(0.45, 0.4, E.mat("#ffe14a"), [0, -1.65, 0], { parent: R.lamp }); E.sphere(0.13, E.flat("#fffbe0"), [0, -1.63, 0], { parent: R.lamp });
  // the 67 bag (in Toast's hand)
  const bagT = card(E, 256, 320, (g, w, h) => { g.fillStyle = "#c9925a"; g.fillRect(0, 0, w, h); g.fillStyle = "#b07a48"; g.fillRect(0, 0, w, 40); g.textAlign = "center"; g.textBaseline = "middle"; g.font = F(150); g.lineWidth = 12; g.strokeStyle = "#ffffff"; g.strokeText("67", w / 2, h / 2 + 20); g.fillStyle = "#ff2d2d"; g.fillText("67", w / 2, h / 2 + 20); });
  R.bag = E.group(R.T.elbows[1], [0, -0.62, 0.12]); E.box(0.36, 0.44, 0.22, [E.mat("#c9925a"), E.mat("#c9925a"), E.mat("#b07a48"), E.mat("#c9925a"), E.mat("#ffffff", { map: bagT }), E.mat("#c9925a")], [0, -0.22, 0], { parent: R.bag, center: true });
  // kids: half-size blocky school kids, six hoodie colours, backpacks, shared face materials
  const hood = ["#3f8ad8", "#57c84d", "#ffd23a", "#d84a7a", "#4ac8c8", "#9b4dff"], skin = ["#ffcf9e", "#c98d62", "#8a5a3a", "#f1c7a6"], packs = ["#ff4d4d", "#23232e", "#ff8a1f", "#19a0e0"];
  const FM = {}; const faceMat = (si, e) => { const k = si + e; if (!FM[k]) { const sk = skin[si]; FM[k] = E.mat("#ffffff", { map: card(E, 512, 450, (g, w, h) => drawFace(g, w, h, { skin: sk, iris: "#3a2a22", brow: "#4a3020" }, e)) }); } return FM[k]; };
  let sd = 11; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  R.kids = [];
  for (let i = 0; i < NK; i++) {
    const hc = hood[i % 6], si = Math.floor(rnd() * 4), pk = packs[Math.floor(rnd() * 4)];
    const K = blocky(E, { skin: skin[si], shirt: hc, sleeve: hc, pants: ["#2c3042", "#3f6fd8", "#5a5a66"][i % 3], shoe: "#f4f4f4", face: { skin: skin[si] },
      build: (P, E, M) => { const { TH, HW, HH, HD } = P.dims; E.box(0.66, 0.62, 0.3, M(pk), [0, 0.06, -0.38], { parent: P.torso }); E.box(0.5, 0.14, 0.06, M("#ffffff"), [0, 0.18, -0.54], { parent: P.torso }); E.box(HW + 0.1, 0.16, HD + 0.06, M(hc), [0, HH - 0.06, -0.02], { parent: P.head }); } });
    K.face = (e = "happy") => { K.faceMesh.material = faceMat(si, e); };
    K.ph = rnd() * 6; K.seed = rnd(); R.kids.push(K);
  }
  // spots: 0 on the counter, 1-5 around Toast, 6.. counter, shelves, doorway, floor
  const sp = [[1.75, 1.18, -1.55]];
  [[1.9, 0, 0.9], [-0.35, 0, 1.9], [1.3, 0, 2.2], [2.6, 0, 1.6], [-0.9, 0, -0.5]].forEach((p) => sp.push(p));
  for (let i = 0; i < 6; i++) sp.push([-2.6 + i * 0.75, 1.18, -1.6 - (i % 2) * 0.25]);
  for (const y of R.SHELF) for (let i = 0; i < 6; i++) sp.push([-3.6 + i * 1.1, y + 0.04, -4.5]);
  for (let i = 0; i < 3; i++) sp.push([4.0 + i * 0.3, 0, -4.4 + i * 0.35]);
  const floor = []; for (let z = -0.6; z <= 4.4; z += 0.78) for (let x = -5.2; x <= 5.2; x += 0.78) { const dT = Math.hypot(x - TP[0], z - TP[2]), dP = Math.hypot(x - PP[0], z - PP[2]); if (dT > 1.0 && dP > 0.95 && !sp.some((q) => q[1] === 0 && Math.hypot(q[0] - x, q[2] - z) < 0.6)) floor.push([x + (rnd() - 0.5) * 0.2, 0, z + (rnd() - 0.5) * 0.2]); }
  floor.sort((a, b) => Math.hypot(a[0] - TP[0], a[2] - TP[2]) - Math.hypot(b[0] - TP[0], b[2] - TP[2]));
  while (sp.length < NK && floor.length) sp.push(floor.shift());
  R.spots = sp.slice(0, NK);
  // the Admin's two hands (palms up), built like Long 2's hand
  const mkHand = (s) => { const g = E.group(null, [0, -50, 0]), skin = E.mat("#d8d4e8"); const w = E.group(g, [0, 0, 0]);
    E.box(1.2, 3.2, 1.0, E.mat("#3a3550"), [0, 0, -2.0], { parent: w, rot: [Math.PI / 2, 0, 0] }); E.box(1.3, 0.3, 1.1, E.mat("#ffffff"), [0, -0.15, -0.35], { parent: w, rot: [Math.PI / 2, 0, 0] });
    E.box(1.5, 0.6, 1.5, skin, [0, -0.3, 0.45], { parent: w }); [-0.54, -0.18, 0.18, 0.54].forEach((x, i) => E.box(0.32, 0.45, 0.95, skin, [x, -0.2, 1.6 - (i === 3 ? 0.15 : 0)], { parent: w })); E.box(0.36, 0.4, 0.7, skin, [s * 0.92, -0.1, 0.5], { parent: w, rot: [0, s * 0.5, 0] });
    return g; };
  R.hands = [mkHand(-1), mkHand(1)];
}

// ---------- overlays ----------
const banner = (txt, s, a = 1, col = "#ffe14a", y = 560) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, y * k); g.rotate(-0.07); g.scale(s, s);
  g.fillStyle = "#ff4d1f"; g.strokeStyle = INK; g.lineWidth = 18 * k; g.lineJoin = "round"; g.beginPath(); const n = 22; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 0.8 : 1, an = (i / (n * 2)) * Math.PI * 2, px = Math.cos(an) * 640 * k * r, py = Math.sin(an) * 250 * k * r; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke(); g.fill();
  g.font = F(178, k); g.textAlign = "center"; g.textBaseline = "middle"; g.lineWidth = 34 * k; g.strokeText(txt, 0, 8 * k); g.fillStyle = "#b8320a"; g.fillText(txt, 8 * k, 20 * k); g.fillStyle = col; g.fillText(txt, 0, 8 * k); g.restore(); };
const label = (txt, y, size, a = 1, col = "#ffe14a", s = 1, x = 540) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(x * k, y * k); g.scale(s, s); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(size, k); g.lineWidth = size * 0.2 * k; g.strokeStyle = INK; g.strokeText(txt, 0, 0); g.fillStyle = col; g.fillText(txt, 0, 0); g.restore(); };
const bubbleEW = (x, y, p) => (g, w) => { const k = w / 1080; g.save(); g.translate(x * k, y * k); g.scale(p, p); g.fillStyle = "#b6f25a"; g.strokeStyle = INK; g.lineWidth = 14 * k; g.beginPath(); g.roundRect(-190 * k, -110 * k, 380 * k, 200 * k, 80 * k); g.moveTo(-40 * k, 88 * k); g.lineTo(-80 * k, 170 * k); g.lineTo(30 * k, 88 * k); g.stroke(); g.fill(); g.font = F(150, k); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#2f6a12"; g.fillText("EW", 0, 0); g.restore(); };

export function frame(f0, E) {
  const X = E.X, THREE = E.THREE, OV = [], FXS = [];
  const { T, P } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  const IMP = S(9) + 50; const f = f0 > IMP && f0 <= IMP + 4 ? IMP : f0;
  const t = f / FPS, sp = (a, b) => X.span(f, a, b), pop = (a, k = 9) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  let n = 1; while (n < 14 && f0 >= S(n + 1)) n++;
  const fs = f - S(n);
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const OPEN = { happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", angry: "angry", talk: "talk", sad: "talk" };
  const say = (who, base) => (amp(who) > 0.55 ? OPEN[base] || "talk" : base);
  const segF = (i) => (L[i] ? Math.round(L[i].s * FPS) : 0), segE = (i) => (L[i] ? Math.round(L[i].e * FPS) : 0);
  const sixAt = (i) => { const s0 = segF(i), s1 = segE(i); for (const w of E.words) { const a = Math.round(w.s * FPS); if (a >= s0 - 1 && a <= s1 && /^six/i.test(w.w)) return a; } return s0; };
  let cam, flash = 0, shk = null, light = ["interior", "night", 0.3], grade = null, caption = true;
  // reset
  [T, P].forEach((q) => q.pose({ visible: false })); P.boardAt([-3.7, 0.0, 0.4], 0.3, 0, 0, true);
  R.bag.visible = false; R.flap.rotation.x = Math.PI * 0.96; R.lamp.rotation.set(0, 0, 0); R.hands.forEach((h) => (h.visible = false));
  // ---- kids: when each one is visible ----
  const K4 = S(4) + 8, K5 = S(5) + 30, K6 = S(6) + 30, GONE = S(12) + 8;
  const appear = (i) => (i === 0 ? K4 : i <= 5 ? K5 + (i - 1) * 4 : K6 + Math.round(((i - 6) / (NK - 7)) * 40));
  const vanish = (i) => GONE + Math.round(((NK - 1 - i) / (NK - 1)) * 44);
  const loopAll = n === 1 || n === 14;
  const beat = (k) => Math.sin(f * (Math.PI * 4 / FPS) + k);         // the hands: two beats per second
  let shown = 0;
  const mouths = [];
  R.kids.forEach((K, i) => {
    const a = appear(i), v = vanish(i), on = loopAll || (n >= 4 && f >= a && !(n >= 12 && f >= v) && n < 13);
    if (!on) { K.pose({ visible: false }); return; } shown++;
    const p = R.spots[i], s = loopAll ? 1 : X.back(sp(a, a + 7)) * (n >= 12 && f >= v - 6 ? 1 - X.easeIn(sp(v - 6, v)) : 1);
    const toward = Math.atan2(TP[0] - p[0], TP[2] + 3 - p[2]);
    let face = "grin", head = [0, 0, 0], hop = 0, b = beat(K.ph);
    let arms = { armL: [-0.55 + 0.35 * b, 0.12], armR: [-0.55 - 0.35 * b, -0.12], elbowL: 1.25, elbowR: 1.25 };
    if (n === 7) hop = Math.max(0, Math.sin(f * 0.5 + K.ph)) * 0.25;
    if (n === 11) { face = "shock"; head = [-0.55, 0, 0]; arms = { armL: [-0.3, 0.1], armR: [-0.3, -0.1], elbowL: 0.4, elbowR: 0.4 }; }
    if (n === 12) { face = "angry"; head = [0.1, 0, 0.1 * Math.sin(K.ph)]; arms = { armL: [0, 0.15], armR: [0, -0.15] }; }
    if ((n === 8 || n === 9) && i >= 1 && i <= 5) arms = { armL: [-2.9 + 0.3 * b, 0.1], armR: [-2.9 - 0.3 * b, -0.1], elbowL: 0.2, elbowR: 0.2 };
    K.pose({ pos: [p[0], p[1] + hop, p[2]], yaw: loopAll || n >= 8 ? toward * 0.6 : toward, scale: KS * Math.max(0.01, s), ...arms, head, face: amp("kids") > 0.55 || (i === 0 && amp("kid") > 0.55) ? "grin" : face });
    if (n >= 4) mouths.push(i);
  });
  const kidsN = loopAll ? NK : shown;
  // ---- the spoken "6 7" objects: [startFrame, world point fn, hold frames] ----
  const headOf = (rig, up = 0) => { rig.root.updateMatrixWorld(true); const v = new THREE.Vector3(); rig.head.getWorldPosition(v); v.y += up; return v; };
  const nums = [];
  const proj = (v, w, h) => { const q = v.clone().project(E.camera); return [((q.x + 1) / 2) * w, ((1 - q.y) / 2) * h, q.z]; };
  const numObj = (pos, k, s = 1) => (g, w, h) => { const [x, y, z] = proj(pos, w, h); if (z > 1) return; const kk = w / 1080, a = k < 0.8 ? 1 : 1 - (k - 0.8) / 0.2; g.save(); g.globalAlpha = Math.max(0, a); g.translate(x, y - 140 * kk * k); g.scale(s * (0.6 + 0.4 * X.back(Math.min(1, k * 4))), s * (0.6 + 0.4 * X.back(Math.min(1, k * 4)))); g.font = F(96, kk); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.lineWidth = 20 * kk; g.strokeStyle = INK; g.strokeText("6 7", 0, 0); g.fillStyle = "#ffe14a"; g.fillText("6 7", 0, 0); g.restore(); };

  switch (n) {
    case 1: case 14: { // flash-forward / loop: 67 kids doing the hands, Toast flat in mid-air
      T.pose({ ...FLAT(LOOP.y), face: n === 1 ? say("toast", "scared") : "shock", eyePop: 0 });
      R.lamp.rotation.z = 0.2 * Math.sin(f * 0.2);
      cam = { ...LOOP.cam };
      if (n === 1) OV.push(label("HE SAID 6-7", 300, 120, pop(2, 8), "#ffe14a", 0.9 + 0.1 * pop(2, 8)));
      else { caption = false; if (fs < 6) shk = [S(14), 0.12, 8]; }
      break; }
    case 2: { // Toast with bag 67, mouth open; Pixi points at the sign. Empty shop.
      R.bag.visible = true;
      T.pose({ pos: TP, yaw: -0.2, armR: [-0.9, 0.1], elbowR: 0.6, armL: [0, 0.15], face: "talk", head: [-0.1, 0, 0] });
      P.pose({ pos: PP, yaw: 0.45, armL: [-2.5, 0.3], elbowL: 0.1, armR: [0, 0.1], head: [-0.25, 0.2, 0], face: say("pixi", "deadpan") });
      if (fs < 36) { cam = { pos: [SIGN[0], SIGN[1] + 0.05, SIGN[2] + 1.9], look: [SIGN[0], SIGN[1] - 0.02, SIGN[2]], fov: 50 }; caption = false; }
      else cam = { pos: [-0.4, 2.1, 6.6], look: [-0.45, 1.7, -0.6], fov: 48 };
      break; }
    case 3: { // CU: shrug, smug, calls it
      R.bag.visible = true;
      const sh = Math.sin(Math.PI * X.smooth(sp(S(3) + 2, S(3) + 16)));
      T.pose({ pos: TP, yaw: -0.1, armR: [-0.9, 0.1 + 0.3 * sh], elbowR: 0.6, armL: [-0.2, 0.5 * sh], elbowL: 0.6, head: [0, 0, 0.12 * sh], face: say("toast", "smug") });
      const hy = T.dims.H - T.dims.HH / 2; cam = { pos: [TP[0] - 0.3, hy - 0.1, TP[2] + 4.8], look: [TP[0] - 0.05, hy - 0.05, TP[2]], fov: 40 };
      const a = sixAt(2); if (f >= a && f < a + 26) nums.push(numObj(headOf(T, 0.1), (f - a) / 26));
      break; }
    case 4: case 5: { // one kid pops up on the counter and shouts it back; (5) the 6 7 bounces, five more kids
      R.bag.visible = n === 4;
      const tk = n === 5 ? Math.sin(f * 0.18) : 0;
      T.pose({ pos: TP, yaw: n === 4 ? -0.9 : 0.7 * tk, armR: n === 4 ? [-0.9, 0.1] : [-0.3, 0.3], elbowR: 0.6, armL: [-0.2, 0.3], head: [0, 0, 0], face: n === 4 ? "shock" : "scared" });
      P.pose({ pos: PP, yaw: 0.45, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      if (n === 4) { const a = sixAt(3); if (f >= a && f < a + 26) nums.push(numObj(headOf(R.kids[0], 0.05), (f - a) / 26)); cam = { pos: [1.0, 2.1, 6.4], look: [1.15, 1.5, -0.8], fov: 50 }; }
      else { // bounce path: kid's mouth -> right wall -> floor -> landing among the new kids
        const k0 = headOf(R.kids[0], 0.1), path = [k0, new THREE.Vector3(4.0, 2.8, -1.2), new THREE.Vector3(2.2, 0.15, 1.3), new THREE.Vector3(1.6, 0.6, 1.4)];
        const kk = sp(S(5) + 2, K5); const seg = Math.min(2, Math.floor(kk * 3)), u = kk * 3 - seg; const pt = path[seg].clone().lerp(path[seg + 1], u); if (kk > 0 && kk < 1) nums.push(numObj(pt, 0.3, 0.9));
        const a = sixAt(4); if (f >= a && f < a + 24) [1, 2, 3, 4, 5].forEach((i) => nums.push(numObj(headOf(R.kids[i], 0.05), (f - a) / 24, 0.7)));
        cam = { pos: [0.7, 2.3, 8.0], look: [0.8, 1.2, 0.2], fov: 52 }; }
      break; }
    case 6: { // WIDE: hands up for silence... says it again; claps a hand over his mouth; kids everywhere
      const a = sixAt(5), cl = X.back(sp(a + 5, a + 10));
      T.pose({ pos: TP, yaw: 0, armL: [-2.6, 0.5], armR: f < a + 5 ? [-2.6, 0.5] : [X.lerp(-2.6, -1.7, cl), X.lerp(0.5, -0.5, cl)], elbowL: 0.2, elbowR: X.lerp(0.2, 1.4, cl), face: f >= a + 8 ? "shock" : say("toast", "talk") });
      P.pose({ pos: PP, yaw: 0.45, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "deadpan" });
      if (f >= a && f < a + 24) nums.push(numObj(headOf(T, 0.1), (f - a) / 24));
      cam = { pos: [0.2, 3.0, 12.8], look: [0.0, 2.1, -1.0], fov: 52 };
      if (f >= K6 && f < K6 + 40) shk = [K6, 0.03, 40];
      break; }
    case 7: { // Pixi, calm in the bouncing crowd, puts on her headphones, two fingers up
      const hp = X.smooth(sp(S(7) + 2, S(7) + 14)), two = X.smooth(sp(S(7) + 30, S(7) + 40));
      P.pose({ pos: PP, yaw: 0.3, armL: [X.lerp(0, -2.8, hp) * (1 - two) + two * -2.6, 0.55], elbowL: 1.2 * hp * (1 - two) + 0.2 * two, armR: [-2.8 * hp, 0.55], elbowR: 1.2 * hp, face: say("pixi", "deadpan") });
      T.pose({ pos: TP, yaw: -0.4, armL: [-0.3, 0.3], armR: [-1.6, -0.4], elbowR: 1.4, face: "scared" });
      cam = { pos: [-1.1, 2.4, 6.4], look: [-1.3, 1.45, 0.9], fov: 46 };
      if (two > 0.5) OV.push(label("✌", 560, 160, two, "#ffffff", 1, 300));
      break; }
    case 8: { // CRASH: the hands slide under Toast and lift him; eyes pop
      const lift = X.smooth(sp(S(8), S(8) + 10)), ep = X.spring(sp(S(8) + 6, S(8) + 18));
      const fl = FLAT(X.lerp(0.4, 1.0, lift), lift);
      T.pose({ ...fl, pitch: X.lerp(-0.2, -Math.PI / 2, lift), face: "shock", eyePop: ep, headScale: 1 + 0.1 * ep });
      const hv = headOf(T); cam = { pos: [hv.x + 0.25, hv.y + 2.6, hv.z + 1.2], look: [hv.x, hv.y, hv.z - 0.1], fov: 46 };
      shk = [S(8) + 1, 0.05, 6];
      break; }
    case 9: { // LOW: tossed up and down in the rhythm; third toss into the lamp; fail screen
      const g0 = S(9) + 4, tt = (f - g0) / 15;                    // one toss per half second
      let y = 1.0; if (f >= g0) { const k = Math.floor(tt), u = tt - k, peak = [0.9, 1.4, 2.4][Math.min(2, k)]; y = k >= 2 ? 1.0 + peak * Math.sin(Math.PI / 2 * Math.min(1, u * 1.5)) : 1.0 + peak * Math.sin(Math.PI * u); }
      const sat = f >= IMP;
      if (sat) y = 2.9;
      T.pose({ ...FLAT(y, 1), face: sat ? "dizzy" : "scared" });
      if (f >= IMP) { R.lamp.rotation.z = 0.45 * Math.sin((f - IMP) * 0.35) * Math.exp(-(f - IMP) / 40); grade = { uSat: 0.35 }; shk = [IMP, 0.22, 10]; flash = f0 <= IMP + 2 ? 0.4 : 0;
        const b0 = IMP + 1, sc = f < b0 + 5 ? X.lerp(3.2, 1, X.easeIn(sp(b0, b0 + 5))) : 1 + 0.06 * Math.sin((f - b0 - 5) * 1.2) * Math.max(0, 1 - (f - b0 - 5) / 10); OV.push(banner("TOASTED!", sc)); caption = false; }
      P.pose({ pos: PP, yaw: 0.45, armL: [-2.8, 0.55], elbowL: 1.2, armR: [-2.8, 0.55], elbowR: 1.2, face: "deadpan" });
      cam = { pos: [3.4, 2.1, 7.4], look: [0.5, 2.1, 0.4], fov: 56 };
      break; }
    case 10: { // INSERT: Pixi unfolds the bottom corner of the sign
      const k = X.smooth(sp(S(10) + 4, S(10) + 18)); R.flap.rotation.x = X.lerp(Math.PI * 0.96, 0, k);
      cam = { pos: [SIGN[0], SIGN[1] - 0.2, SIGN[2] + 1.9], look: [SIGN[0], SIGN[1] - 0.24, SIGN[2]], fov: 40 };
      T.pose({ visible: false });
      const q = X.smooth(sp(S(10) + 18, S(10) + 26)); OV.push(label("CURE: A GROWN-UP", 1160, 80, q, "#ffffff", 0.9 + 0.1 * q), label("DOES IT TOO.", 1270, 110, q, "#ff4d4d", 0.85 + 0.15 * pop(S(10) + 24, 8)));
      caption = q < 0.5;
      break; }
    case 11: { // WIDE: two giant Admin hands, palms up, the gesture slow and stiff; every kid stares up
      R.flap.rotation.x = 0;
      const dn = X.smooth(sp(S(11), S(11) + 18)), st = (f - S(11) - 18) / 24, mv = f < S(11) + 18 ? 0 : (Math.floor(st) % 2 ? 1 : -1) * X.smooth(st - Math.floor(st)) ;
      R.hands.forEach((h, i) => { h.visible = true; const s = i ? 1 : -1, upd = (i ? 1 : -1) * mv * 0.45; h.position.set(TP[0] + s * 1.5, X.lerp(H + 2.5, 3.0, dn) + upd, 0.8); h.rotation.set(1.15, 0, s * 0.15); h.scale.setScalar(0.85); });
      T.pose({ pos: [TP[0] + 0.3, 0, TP[2] + 0.4], yaw: 0, armL: [0, 0.6], armR: [0, 0.6], head: [-0.5, 0, 0], face: "shock" });
      P.pose({ pos: PP, yaw: 0.3, head: [-0.5, 0, 0], face: "deadpan", armL: [-2.6, 0.55], elbowL: 1.2, armR: [-2.6, 0.55], elbowR: 1.2 });
      cam = { pos: [0.3, 2.9, 12.8], look: [0.3, 2.7, -1.0], fov: 56 };
      const a = sixAt(9); if (f >= a && f < a + 26) nums.push(numObj(new THREE.Vector3(TP[0], 4.2, -0.2), (f - a) / 26, 1.3));
      break; }
    case 12: { // MED: disgust; they pop away fast
      T.pose({ pos: [TP[0] + 0.3, 0, TP[2] + 0.4], yaw: -0.2, armL: [0, 0.3], armR: [0, 0.3], face: "shock" });
      P.pose({ pos: PP, yaw: 0.3, face: "smug", armL: [-2.6, 0.55], elbowL: 1.2, armR: [-2.6, 0.55], elbowR: 1.2 });
      cam = { pos: [0.3, 1.7, 7.4], look: [0.3, 1.1, 0.2], fov: 52 };
      const ew = segF(10); if (f >= ew - 2 && f < GONE + 70) OV.push(bubbleEW(560, 520, pop(ew - 2, 7)));
      break; }
    case 13: { // empty shop; Toast dusts off, turns to Pixi; the 6 7 floats out and hangs
      const tn = X.smooth(sp(S(13) + 10, S(13) + 22)), dust = fs < 12 ? Math.sin(fs * 1.4) : 0;
      T.pose({ pos: [TP[0] + 0.3, 0, TP[2] + 0.4], yaw: X.lerp(0, -0.7, tn), armL: [-0.6 + 0.3 * dust, 0.3], elbowL: 1.2, armR: [-0.6 - 0.3 * dust, -0.2], elbowR: 1.2, face: say("toast", "happy") });
      P.pose({ pos: PP, yaw: 0.45, face: "deadpan", armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9 });
      cam = { pos: [-0.2, 1.9, 6.6], look: [-0.2, 1.55, 0.6], fov: 48 };
      const a = sixAt(11); if (f >= a) { const k = Math.min(0.75, (f - a) / 26); nums.push(numObj(headOf(T, 0.15), k, 1.1)); }
      break; }
  }
  unclip([T, P], { gap: 0.2 });
  R.kids.forEach((K) => { if (K.root.visible && Math.hypot(K.root.position.x - cam.pos[0], K.root.position.z - cam.pos[2]) < 2.6 && cam.pos[1] < 3) K.root.visible = false; });
  if (n >= 2 && n <= 13 && n !== 10 && !(n === 9 && f >= IMP) && !(n === 2 && fs < 36)) { OV.push(label(`KIDS: ${kidsN}`, 150, 92, 1, "#ffe14a", 1)); }
  OV.push(...nums);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, dof: { focus: 6, amount: 0 }, actors: [], fx: FXS, flash, caption, focusPt: cam.look, overlay: (g, w, h, sc) => OV.forEach((o) => o(g, w, h, sc)) };
}
