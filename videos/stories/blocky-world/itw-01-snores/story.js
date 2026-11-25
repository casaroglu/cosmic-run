// "In This World" #1 — We Only Walk When It Snores. Built from scripts/ITW-01.md (19 shots).
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
export const meta = { fps: 30, tail: 1.0 };
let R = {}, SH = [], L = [];
const INK = "#221a26", FPS = 30;
const F = (px, k = 1, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
let sd = 5; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
const COLS = 20, ROWS = 15, GAP = 1.2;
const DZ = -58, DSCALE = 11;                       // sleeping giant
const TOASTX = -0.6, PIXIX = 0.6;
// shared loop composition (shot 1 == last frame of shot 19)
const LOOP = { cam: { pos: [1.2, 0.6, -0.8], look: [-0.6, 10, -45], fov: 60 }, toast: { pos: [-0.5, 0.17, -6.5], yaw: -0.35, armL: [0, 1.3], armR: [0, 1.3], legL: -0.2, legR: 0.25, face: "shock" }, eye: 1 };

async function tex(url) { try { const t = await new THREE.TextureLoader().loadAsync(url); t.colorSpace = THREE.SRGBColorSpace; return t; } catch (e) { return null; } }
export async function build(E) {
  const { T } = E;
  try { SH = (await (await fetch("../work/timeline.json?v=" + Date.now())).json()).shots; } catch (e) {}
  try { L = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  // ground: salt flat
  const salt = (await tex("../refs/bd3_salt.jpg")) || card(512, 512, (g, w, h) => { g.fillStyle = "#ece8df"; g.fillRect(0, 0, w, h); g.strokeStyle = "#cfc8b8"; g.lineWidth = 3; for (let i = 0; i < 60; i++) { g.beginPath(); let x = rnd() * w, y = rnd() * h; g.moveTo(x, y); for (let k = 0; k < 4; k++) { x += (rnd() - 0.5) * 120; y += (rnd() - 0.5) * 120; g.lineTo(x, y); } g.stroke(); } });
  salt.wrapS = salt.wrapT = THREE.RepeatWrapping; salt.repeat.set(30, 30);
  const fl = E.plane(400, 400, E.mat("#ffffff", { map: salt }), [0, 0, -100], { rot: [-Math.PI / 2, 0, 0] }); fl.castShadow = false;
  // backdrops (photo plates) — dawn and noon share framing
  R.bd1 = await tex("../refs/bd1_valley_dawn.jpg"); R.bd4 = await tex("../refs/bd4_valley_noon.jpg"); R.bd2 = await tex("../refs/bd2_sky_up.jpg");
  R.plateMat = new THREE.MeshBasicMaterial({ map: R.bd1, fog: false, transparent: true, opacity: R.bd1 ? 1 : 0 });
  R.plate = E.plane(560, 995, R.plateMat, [0, 330, -330], { noink: true, noShadow: true }); R.plate.visible = !!R.bd1;
  R.plate2 = E.plane(560, 995, new THREE.MeshBasicMaterial({ map: R.bd4 || R.bd1, fog: false, transparent: true, opacity: 0 }), [0, 330, -329.5], { noink: true, noShadow: true }); R.plate2.visible = !!R.bd1;
  // basalt cliffs either side (3D, so they work without plates too)
  const basalt = E.mat("#2f2a33"), basalt2 = E.mat("#3a343e");
  for (const s of [-1, 1]) for (let i = 0; i < 26; i++) { const z = 20 - i * 12, h = 30 + rnd() * 50; E.box(18 + rnd() * 10, h, 12, rnd() > 0.5 ? basalt : basalt2, [s * (38 + rnd() * 10), 0, z], { rot: [0, (rnd() - 0.5) * 0.4, 0] }); }
  // stone sign with moss
  R.sign = E.group(null, [-15, 0, 3]); R.sign.rotation.y = 0.35;
  const st = card(600, 1050, (g, w, h) => { g.fillStyle = "#8c8a86"; g.fillRect(0, 0, w, h); g.fillStyle = "#7c7a76"; for (let i = 0; i < 40; i++) g.fillRect(rnd() * w, rnd() * h, 30, 8); g.textAlign = "center"; g.font = F(96); [["WE ONLY", "#ffffff"], ["WALK", "#ff3d3d"], ["WHEN IT", "#ffffff"], ["SNORES", "#ff3d3d"]].forEach(([t, c], i) => { g.fillStyle = "#4a4844"; g.fillText(t, w / 2 + 4, 200 + i * 150 + 4); g.fillStyle = c; g.fillText(t, w / 2, 200 + i * 150); });
    g.font = F(30, 1, 800); g.fillStyle = "#ffffff"; g.fillText("IF HE WAKES UP, HE WANTS TO PLAY.", w / 2, 900); g.fillText("WITH EVERYONE.", w / 2, 945); });
  E.box(4.2, 7.4, 0.8, E.mat("#8c8a86"), [0, 0, 0], { parent: R.sign }); E.plane(4.0, 7.0, E.mat("#ffffff", { map: st }), [0, 3.7, 0.41], { parent: R.sign, noShadow: true });
  R.signFace = [0, 3.7, 0.41]; R.moss = []; for (let i = 0; i < 9; i++) R.moss.push(E.box(0.6 + rnd() * 0.4, 0.9 + rnd() * 0.5, 0.25, E.mat(rnd() > 0.5 ? "#4f8a3a" : "#3f7a2e"), [-1.7 + i * 0.42, 0.4, 0.45], { parent: R.sign }));
  // exit arch, far behind him
  const arch = E.group(null, [0, 0, DZ - 70]); for (const x of [-5, 5]) E.box(2.5, 14, 2.5, E.mat("#d8d4cc"), [x, 0, 0], { parent: arch }); E.box(12.5, 2.5, 2.5, E.mat("#d8d4cc"), [0, 14, 0], { parent: arch }); E.plane(7.5, 14, E.flat("#fffbe0", { transparent: true, opacity: 0.8, fog: false }), [0, 7, 0], { parent: arch, noink: true });
  R.tail = E.group(null, [-34, 0, 14]); for (let i = 0; i < 8; i++) E.box(5 - i * 0.45, 3.2 - i * 0.3, 5 - i * 0.45, E.mat(i % 2 ? "#3da33a" : "#57c84d"), [6 + i * 4.6, 0, 0], { parent: R.tail }); for (let i = 0; i < 8; i++) E.box(1.2, 1.4, 1.2, E.mat("#ff8a1f"), [6 + i * 4.6, 3.2 - i * 0.3, 0], { parent: R.tail }); R.tail.visible = false;
  // cast
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E);
  // snore bubble on the nostril (child of the head, so it follows him)
  R.bub = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), new THREE.MeshBasicMaterial({ color: "#cfefff", transparent: true, opacity: 0.45, depthWrite: false, fog: false }));
  R.bubHi = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.85, fog: false }));
  R.bubG = new THREE.Group(); R.bubG.add(R.bub, R.bubHi); R.bubHi.position.set(-0.35, 0.4, 0.75); R.bub.userData.noink = true; R.bubHi.userData.noink = true; R.D.head.add(R.bubG); R.bubG.position.set(0.16, 0.1, 0.95);
  R.drops = []; for (let i = 0; i < 12; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: "#cfefff", transparent: true, opacity: 0.8, fog: false })); m.userData.noink = true; R.D.head.add(m); m.visible = false; R.drops.push(m); }
  // eye light cone
  R.cone = new THREE.Mesh(new THREE.ConeGeometry(6, 60, 24, 1, true), new THREE.MeshBasicMaterial({ color: "#fff27a", transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide, fog: false })); R.cone.userData.noink = true; E.scene.add(R.cone); R.cone.visible = false;
  // crowd (light rig: legs, torso, head, arms)
  const shirts = ["#3f8ad8", "#57c84d", "#e0d23a", "#d84a7a", "#4ac8c8", "#9a9aa6"], skin = ["#ffcf9e", "#c98d62", "#8a5a3a", "#f1c7a6"];
  R.crowd = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const x = (c - (COLS - 1) / 2) * GAP, z = r * GAP + 0.6; if (r === 0 && (Math.abs(x - TOASTX) < 0.1 || Math.abs(x - PIXIX) < 0.1)) continue;
    const g = E.group(null, [x, 0, z]); const sh = (r === 14 && c === 6) ? "#e0262e" : shirts[Math.floor(rnd() * 6)], sk = skin[Math.floor(rnd() * 4)];
    const legL = E.group(g, [-0.2, 0.62, 0]), legR = E.group(g, [0.2, 0.62, 0]); E.box(0.34, 0.6, 0.36, E.mat("#2c3042"), [0, -0.6, 0], { parent: legL }); E.box(0.34, 0.6, 0.36, E.mat("#2c3042"), [0, -0.6, 0], { parent: legR });
    E.box(0.8, 0.72, 0.46, E.mat(sh), [0, 0.62, 0], { parent: g }); E.box(0.9, 0.84, 0.86, E.mat(sk), [0, 1.36, 0], { parent: g });
    const armL = E.group(g, [-0.53, 1.28, 0]), armR = E.group(g, [0.53, 1.28, 0]); E.box(0.26, 0.66, 0.28, E.mat(sh), [0, -0.66, 0], { parent: armL }); E.box(0.26, 0.66, 0.28, E.mat(sh), [0, -0.66, 0], { parent: armR });
    E.box(0.12, 0.12, 0.02, E.flat("#1a1a1a"), [-0.18, 1.82, 0.44], { parent: g, noShadow: true }); E.box(0.12, 0.12, 0.02, E.flat("#1a1a1a"), [0.18, 1.82, 0.44], { parent: g, noShadow: true });
    R.crowd.push({ g, legL, legR, armL, armR, r, c, x, z, ph: r * 2, seed: rnd(), out: null, red: r === 14 && c === 6 });
  }
  // burst cubes for knock-outs
  R.cubes = []; const cc = ["#ff7fb8", "#ffe14a", "#19e0c6", "#9b4dff", "#ffffff"]; for (let i = 0; i < 160; i++) { const m = E.box(0.25, 0.25, 0.25, E.flat(cc[i % 5]), [0, -50, 0], { noShadow: true, center: true }); R.cubes.push({ m, v: [(rnd() - 0.5) * 8, 3 + rnd() * 6, (rnd() - 0.5) * 8] }); }
}

// ---------- overlays ----------
const label = (txt, x, y, size, o = {}) => (g, w) => { const k = w / 1080, a = o.a ?? 1; if (a <= 0) return; g.save(); g.globalAlpha = a; g.translate(x * k, y * k); g.scale(o.s || 1, o.s || 1); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(size, k); g.lineWidth = size * 0.2 * k; g.strokeStyle = INK; g.strokeText(txt, 0, 0); g.fillStyle = o.col || "#ffe14a"; g.fillText(txt, 0, 0); g.restore(); };
const banner = (txt, s, a = 1) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, 560 * k); g.rotate(-0.07); g.scale(s, s); g.fillStyle = "#ff4d1f"; g.strokeStyle = INK; g.lineWidth = 18 * k; g.lineJoin = "round"; g.beginPath(); const n = 22; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 0.8 : 1, an = (i / (n * 2)) * Math.PI * 2, px = Math.cos(an) * 640 * k * r, py = Math.sin(an) * 250 * k * r; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke(); g.fill(); g.font = F(178, k); g.textAlign = "center"; g.textBaseline = "middle"; g.lineWidth = 34 * k; g.strokeText(txt, 0, 8 * k); g.fillStyle = "#b8320a"; g.fillText(txt, 8 * k, 20 * k); g.fillStyle = "#ffe14a"; g.fillText(txt, 0, 8 * k); g.restore(); };
const hahaB = (n, x, y, p) => (g, w) => { const k = w / 1080, size = 100; g.save(); g.font = F(size, k); const full = "HA HA HA", txt = Array(n).fill("HA").join(" "); const tw = g.measureText(full).width + 110 * k, th = size * 1.9 * k; g.translate(x * k, y * k); g.scale(p, p); g.fillStyle = "#fff"; g.strokeStyle = INK; g.lineWidth = 14 * k; g.beginPath(); g.roundRect(-tw / 2, -th / 2, tw, th, th * 0.42); g.stroke(); g.fill(); g.fillStyle = "#ff3d7f"; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(txt, -tw / 2 + 55 * k, 6 * k); g.restore(); };

export function frame(f, E) {
  const X = E.X, OV = [], FXS = [], { T, P, D } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < 19 && f >= S(n + 1)) n++;
  const END19 = Math.round(E.words[E.words.length - 1].e * FPS) - 1;
  const fs = f - S(n), t = f / FPS, sp = (a, b) => X.span(f, a, b), pop = (a, k = 9) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const proj = (v, w, h) => { const p = new THREE.Vector3(...v).project(E.camera); return [((p.x + 1) / 2) * w, ((1 - p.y) / 2) * h]; };
  let cam, light = ["day", "golden", 0.35], shk = null, grade = null, flash = 0, caption = true, count = 300;
  // ---- snore schedule: list of [startFrame, durFrames]; bubble up = walking ----
  const SN = [[S(2) + 20, 70], [S(3) + 2, 64], [S(5) + 14, 30], [S(7) + 4, 26], [S(7) + 36, 18], [S(7) + 60, 10], [S(13), 40]];
  let bub = 0, bubLeft = 0, popAt = -1;
  for (const [a, d] of SN) { if (f >= a && f < a + d) { bub = Math.min(1, (f - a) / Math.min(14, d * 0.6)) * (0.85 + 0.15 * Math.sin((f - a) * 0.4)); bubLeft = Math.ceil((a + d - f) / FPS); } if (f >= a + d && f < a + d + 8) popAt = a + d; }
  if (n === 13 && f >= S(13) + 22) { bub = 0; popAt = S(13) + 22; }
  const walking = bub > 0 && n < 16;
  // ---- crowd progress: metres walked so far (sum of snore time) ----
  let walked = 0; for (const [a, d] of SN.slice(0, 6)) walked += Math.max(0, Math.min(f, a + d) - a) / FPS * 0.9;
  if (n >= 18) walked = 0;
  // ---- knock-outs ----
  const KO = [[S(6) + 10, (c) => c.r >= 12], [S(16) + 18, (c) => c.r >= 5 && c.r < 12 || (c.r < 5 && c.seed < 0.35)], [S(16) + 50, (c) => c.r < 5 && c.seed < 0.95], [S(17) + 20, () => true]];
  const reset = n >= 18 && f >= S(18) + 30;
  count = 300; let kos = 0;
  R.crowd.forEach((c) => { let outAt = null; for (const [a, fn] of KO) if (outAt === null && f >= a && fn(c) && !(reset)) outAt = a; c.outAt = outAt; if (outAt !== null) kos++; });
  count = reset ? 300 : n >= 17 && f >= S(17) + 20 ? 1 : 300 - kos;
  // ---- Donutsaurus ----
  const stand = n === 16 ? X.smooth(sp(S(16), S(16) + 26)) : n === 17 ? 1 : n === 18 ? 1 - X.smooth(sp(S(18), S(18) + 30)) : 0;
  let eye = 0; if (n === 1) eye = 1; if (n === 11) eye = X.smooth(sp(S(11) + 4, S(11) + 18)) * 0.5; if (n === 12) eye = 0.5 * (1 - X.smooth(sp(S(12) + 30, Eo(12)))); if (n >= 14 && n <= 17) eye = 1; if (n === 18) eye = 1 - X.smooth(sp(S(18) + 10, S(18) + 30)); if (n === 19) eye = X.back(sp(END19 - 8, END19 - 2));
  const breathe = 0.04 * Math.sin(f * 0.08), wag = n === 16 ? Math.sin(f * 0.5) : 0;
  const LIE = 1 - stand; let dpitch = 0, dx = -1.45 * DSCALE * LIE, dy = 1.15 * DSCALE * LIE, dz = DZ;
  if (n === 17) { const k = X.easeIn(sp(S(17) + 4, S(17) + 20)); dx = X.lerp(0, TOASTX, k); dz = X.lerp(DZ, -2, k); dpitch = 1.0 * k; }
  D.pose({ pos: [dx, dy, dz], scale: DSCALE, roll: -Math.PI / 2 * LIE, pitch: dpitch, squash: breathe * 0.5, legL: -0.4 * LIE, legR: 0.4 * LIE, head: [0, 0, 0.25 * LIE + (n === 16 ? 0.1 * wag : 0)], jaw: n === 16 ? 0.6 : n === 18 && f < S(18) + 24 ? 0.9 : 0, tail: 0.15, tailY: n === 16 ? 0.9 * wag : 0.05 * Math.sin(f * 0.05), look: [0, -0.3], armUp: n === 16 ? 0.6 * Math.abs(wag) : 0 });
  if (LIE > 0.01 && n !== 17) { D.root.updateMatrixWorld(true); const hv = new THREE.Vector3(); D.head.getWorldPosition(hv); D.root.position.x += (2.5 - hv.x) * LIE; }
  D.root.updateMatrixWorld(true); const HEAD = new THREE.Vector3(); D.head.getWorldPosition(HEAD);
  D.eyes.forEach((e) => (e.scale.y = 0.1 + 0.9 * eye));
  R.bubG.visible = bub > 0.01; R.bubG.scale.setScalar(0.02 + bub * 0.26);
  R.drops.forEach((m, i) => { const k = popAt >= 0 ? (f - popAt) / 8 : -1; m.visible = k >= 0 && k < 1; if (m.visible) { const a = i / 12 * Math.PI * 2; m.position.set(0.16 + Math.cos(a) * (0.1 + k * 0.5), 0.1 + Math.sin(a) * (0.1 + k * 0.5), 0.95 + k * 0.2); } });
  R.tail.visible = n === 6; if (n === 6) { const k = X.smooth(sp(S(6) + 2, S(6) + 26)); R.tail.position.z = 14 + 0.6 * 12 - walked; R.tail.rotation.y = X.lerp(0.9, -0.5, k); }
  // ---- crowd pose ----
  const hop = n === 16 ? Math.max(0, Math.sin(f * 0.5)) * 1.6 : 0;
  R.crowd.forEach((c) => { const g = c.g; g.visible = true; let z = c.z - walked, y = 0, rot = 0;
    const ph = walking ? (f - c.ph) * 0.45 : c.ph * 0.37 + (c.seed * 6); const sw = walking ? Math.sin(ph) : Math.sin(ph) * 0.6;
    c.legL.rotation.x = 0.6 * sw; c.legR.rotation.x = -0.6 * sw; c.armL.rotation.x = -0.6 * sw; c.armR.rotation.x = 0.6 * sw;
    if (n === 5 && c.red && f >= S(5) + 44 && f < S(5) + 56) z -= 0.6 * X.smooth(sp(S(5) + 44, S(5) + 52));
    if (c.outAt !== null) { const k = (f - c.outAt) / FPS; if (k > 0.9) { g.visible = false; return; } y = 9 * k - 9.8 * k * k + 1; z += 6 * k * (c.seed - 0.3); rot = k * 8; }
    y += hop * (0.5 + 0.5 * c.seed);
    g.position.set(c.x, y, z); g.rotation.set(rot, Math.PI, rot * 0.5);
    if ((n === 1 || n === 19) && Math.abs(c.x - LOOP.cam.pos[0]) < 3 && c.z < 4) g.visible = false; });
  // knock-out burst cubes
  R.cubes.forEach((q, i) => { const a = KO.find(([a]) => f >= a && f < a + 40); if (!a || reset) { q.m.position.y = -50; return; } const k = (f - a[0]) / FPS - 0.8; if (k < 0) { q.m.position.y = -50; return; } const cx = ((i % 20) - 10) * 1.1, cz = 10 - walked + (i % 7); q.m.position.set(cx + q.v[0] * k, 3 + q.v[1] * k - 9.8 * k * k, cz + q.v[2] * k); q.m.rotation.set(k * 9, k * 7, 0); });
  // ---- Toast and Pixi in the front row ----
  const fz = 0.6 - walked, tw = walking ? Math.sin((f) * 0.45) : 0;
  let board = false, toastPose = { pos: [TOASTX, 0, fz], yaw: Math.PI + 0.35, legL: 0.9 * tw, legR: -0.9 * tw, armL: [-1.1 * tw, 0.4], armR: [1.1 * tw, 0.4], face: "grin" };
  if (!walking && n >= 4 && n < 9) toastPose = { ...toastPose, legL: -0.5, kneeL: 0.6, armL: [-0.3, 0.9 + 0.15 * Math.sin(f * 0.9)], armR: [0.2, 1.0 + 0.15 * Math.cos(f * 0.8)], sway: n === 4 && fs < 30 ? 0.08 * Math.sin(f * 1.1) : 0.02 * Math.sin(f * 0.7), face: "nervous" in {} ? "shock" : "shock" };
  if (n === 8) toastPose = { ...toastPose, armR: [-0.6, 0.3], elbowR: 0.8, head: [0, -0.4, 0], face: amp("toast") > 0.55 ? "talk" : "smug" };
  const pixW = walking ? Math.sin((f) * 0.45 + 1) : 0;
  let pixPose = { pos: [PIXIX, 0, fz], yaw: Math.PI - 0.35, legL: walking ? 0.7 * pixW : -0.55, kneeL: walking ? 0 : 0.7, legR: walking ? -0.7 * pixW : 0, armL: [-0.2, 0.3], elbowL: 1.5, armR: [0.6 * pixW, 0.25], head: [-0.25, 0, 0], face: amp("pixi") > 0.55 ? "talk" : "deadpan" };
  let pixBoard = n < 8 || (n === 8 && fs < 40);
  // board rolling (shots 9-13)
  let roll = 0; if (n === 9) roll = X.smooth(sp(S(9) + 20, Eo(9))) * 6; if (n >= 10 && n <= 12) roll = 6 + (f - S(10)) / FPS * 2.2; if (n === 13 || n === 14) roll = 6 + (S(13) - S(10)) / FPS * 2.2;
  if (n >= 9 && n <= 14) { board = true; toastPose = { pos: [TOASTX + roll * 0.05, 0.17, fz - roll], yaw: n === 14 ? 0 : Math.PI + 0.5, armL: n >= 12 ? [0, 1.3] : [-0.4, 0.6], elbowL: n >= 12 ? 0 : 1.6, armR: n >= 12 ? [-1.3, 0.2] : [-0.4, 0.6], elbowR: n >= 12 ? 0.1 : 1.6, face: n >= 12 ? "shock" : amp("toast") > 0.55 ? "grin" : "smug", legL: -0.2, legR: 0.2 }; if (n === 14) toastPose = { ...toastPose, eyePop: X.spring(sp(S(14), S(14) + 12)), headScale: 1.1 }; }
  if (n === 17) { const k = X.smooth(sp(S(17) + 20, S(17) + 24)); toastPose = { pos: [TOASTX, 0, 18], yaw: 0, face: "dizzy", armL: [0, 1.4], armR: [0, 1.4] }; }
  if (n >= 18) { const k = X.spring(sp(S(18) + 30, S(18) + 44)); toastPose = { pos: [TOASTX, n === 19 ? 0.17 : 0, 0.4], yaw: Math.PI + 0.3, face: "sad", armL: [0, 0.3], armR: [0, 0.3] }; board = n === 19 || f > S(18) + 50; pixPose = { pos: [PIXIX + 0.6, 0, 0.4], yaw: Math.PI - 0.5, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: amp("pixi") > 0.55 ? "talk" : "smug" }; pixBoard = false; }
  if (n === 19 || n === 1) { const lp = LOOP.toast; toastPose = { ...lp, face: n === 19 && f < END19 - 8 ? (amp("toast") > 0.55 ? "talk" : "happy") : lp.face, eyePop: n === 1 ? 0 : 0 }; board = true; pixPose = { ...pixPose, pos: [PIXIX + 0.8, 0, 1.6] }; pixBoard = false; }
  if (n === 19 && f < END19 - 8) { const k = X.smooth(sp(S(19) + 6, END19 - 8)); toastPose = { ...toastPose, pos: [-0.5, 0.17, X.lerp(0.4, -6.5, k)] }; }
  T.pose(toastPose); P.pose(pixPose);
  if (n === 17 && f >= S(17) + 20) { T.root.scale.set(1.6, 0.08, 1.6); }
  if (n === 18) { const k = X.spring(sp(S(18) + 30, S(18) + 44)); T.root.scale.set(X.lerp(1.6, 1, k), X.lerp(0.08, 1, k), X.lerp(1.6, 1, k)); }
  // boards
  if (board) P.boardAt([toastPose.pos[0], 0, toastPose.pos[2]], Math.PI / 2, 0, 0, true);
  else if (pixBoard) P.boardAt([PIXIX + 0.45, 0.95, fz], Math.PI / 2 - 0.1, Math.PI / 2, 0, true);
  else P.boardAt([0, -50, 0], 0, 0, 0, false);
  // eye light cone (11-12)
  R.cone.visible = n === 11 || n === 12; if (R.cone.visible) { const sw2 = n === 11 ? X.smooth(sp(S(11) + 10, Eo(11))) : 1; R.cone.position.set(X.lerp(-14, toastPose.pos[0], sw2), 30, X.lerp(-10, toastPose.pos[2], sw2) - 8); R.cone.rotation.set(0.35, 0, 0); R.cone.material.opacity = 0.16 * (n === 12 ? 1 - X.smooth(sp(S(12) + 40, Eo(12))) : X.smooth(sp(S(11) + 6, S(11) + 16))); }
  // moss scraped (15)
  R.moss.forEach((m, i) => { m.visible = !(n >= 15 && f >= S(15) + 10 + i * 2) || n >= 18; });
  // plates: noon cross-fade for 16-17, back to dawn in 18
  const noon = n === 16 ? X.smooth(sp(S(16), S(16) + 20)) : n === 17 ? 1 : n === 18 ? 1 - X.smooth(sp(S(18) + 20, S(18) + 50)) : 0;
  R.plate2.material.opacity = R.bd1 ? noon : 0; light = noon > 0.5 ? "day" : ["day", "golden", 0.35];
  // ---- cameras ----
  const dHead = () => { D.root.updateMatrixWorld(true); const v = new THREE.Vector3(); D.head.getWorldPosition(v); return v; };
  switch (n) {
    case 1: cam = { ...LOOP.cam, look: [HEAD.x * 0.6, HEAD.y * 0.75, HEAD.z] }; OV.push(label("IT WOKE UP", 540, 380, 120, { col: "#ff4d4d", s: 0.9 + 0.1 * pop(1, 8) })); break;
    case 2: cam = { pos: [-4, 9, 26], look: [-2, 6, -30], fov: 52 }; break;
    case 3: case 4: cam = { pos: [1.4, 2.0, fz - 6.2], look: [0, 1.6, fz + 1.5], fov: 48 }; break;
    case 5: cam = { pos: [0, 46, 9 - walked], look: [0, 0, 8.9 - walked], fov: 50 }; break;
    case 6: cam = { pos: [24, 15, fz + 10], look: [-2, 1, fz + 9], fov: 52 }; shk = [S(6) + 10, 0.2, 10]; break;
    case 7: case 8: cam = { pos: [-2.2, 2.0, fz - 5.6], look: [0.1, 1.6, fz + 1.5], fov: 48 }; break;
    case 9: cam = { pos: [3.0, 2.2, toastPose.pos[2] - 6.5], look: [-0.2, 1.4, toastPose.pos[2] + 1], fov: 48 }; OV.push(label("NO BUBBLE", 540, 300, 80, { col: "#ffffff" })); break;
    case 10: cam = { pos: [toastPose.pos[0] + 1.3, 0.28, toastPose.pos[2] + 1.1], look: [toastPose.pos[0] + 0.5, 0.1, toastPose.pos[2] + 0.24], fov: 38 }; OV.push(label("SQUEAK", 540, 760, 130, { col: "#ffffff", s: 0.8 + 0.2 * pop(S(10) + 6, 6) })); caption = false; break;
    case 11: cam = { pos: [toastPose.pos[0] + 1.5, 0.6, toastPose.pos[2] + 3], look: [HEAD.x * 0.7, HEAD.y * 0.8, HEAD.z], fov: 60 }; break;
    case 12: cam = { pos: [-9, 6, toastPose.pos[2] + 14], look: [toastPose.pos[0], 1.4, toastPose.pos[2] - 4], fov: 50 }; break;
    case 13: cam = { pos: [toastPose.pos[0] + 4, 3.5, toastPose.pos[2] + 7], look: [(toastPose.pos[0] + HEAD.x) / 2, HEAD.y * 0.55, (toastPose.pos[2] + HEAD.z) / 2], fov: 56 }; break;
    case 14: { const z = X.back(sp(S(14), S(14) + 6)), hy = 1.9; cam = { pos: [toastPose.pos[0], X.lerp(2.0, hy, z), toastPose.pos[2] + X.lerp(7, 3.9, z)], look: [toastPose.pos[0] + 1.2, X.lerp(1.8, hy + 1.6, z), toastPose.pos[2] - 6], fov: X.lerp(48, 56, z) }; shk = [S(14), 0.05, 6]; break; }
    case 15: { pixPose.pos = [-13.4, 0, 4.6]; P.pose({ ...pixPose, yaw: -0.3, armR: [-1.4, -0.3], elbowR: 0.1, legL: f >= S(15) + 8 && f < S(15) + 26 ? -0.5 + 0.3 * Math.sin(f * 0.9) : 0 }); P.boardAt([0, -50, 0], 0, 0, 0, false);
      const k = X.smooth(sp(S(15) + 18, S(15) + 46)); R.sign.updateMatrixWorld(true); const v = new THREE.Vector3(0, 1.04, 0.41).applyMatrix4(R.sign.matrixWorld), n3 = new THREE.Vector3(Math.sin(0.35), 0, Math.cos(0.35));
      cam = { pos: [v.x + n3.x * X.lerp(9, 4.6, k), X.lerp(3, v.y + 0.2, k), v.z + n3.z * X.lerp(9, 4.6, k)], look: [v.x, X.lerp(2.5, v.y, k), v.z], fov: 46 };
      if (k > 0.85) { const q = X.smooth(sp(S(15) + 44, S(15) + 52)); OV.push(label("IF HE WAKES UP,", 540, 1150, 70, { col: "#ffffff", a: q }), label("HE WANTS TO PLAY.", 540, 1240, 70, { col: "#ffffff", a: q }), label("WITH EVERYONE.", 540, 1350, 100, { col: "#ff3d3d", a: q, s: 0.8 + 0.2 * pop(S(15) + 50, 8) })); }
      caption = k < 0.5; break; }
    case 16: cam = { pos: [3, 1.0, 22], look: [0, 30, DZ], fov: 62 }; { const lb = Math.min(3, 1 + Math.floor(fs / 14)); OV.push(hahaB(lb, 540, 330, 0.85 + 0.15 * X.back((fs % 14) / 14))); } break;
    case 17: { cam = { pos: [10, 16, 44], look: [0, 6, 10], fov: 54 }; const imp = S(17) + 20; if (f >= imp) { grade = { uSat: 0.35 }; shk = [imp, 0.25, 10]; const b0 = imp + 1, sc = f < b0 + 5 ? X.lerp(3.2, 1, X.easeIn(sp(b0, b0 + 5))) : 1 + 0.06 * Math.sin((f - b0 - 5) * 1.2) * Math.max(0, 1 - (f - b0 - 5) / 10); OV.push(banner("TOASTED!", sc)); caption = false; } break; }
    case 18: cam = { pos: [1.8, 2.1, -5.6], look: [0.3, 1.5, 1.4], fov: 48 }; break;
    case 19: cam = { ...LOOP.cam, look: [HEAD.x * 0.6, HEAD.y * 0.75, HEAD.z] }; break;
  }
  // bubble seconds label
  if (bub > 0.3 && [2, 3, 7].includes(n)) OV.push(label(`SNORE: ${Math.max(1, bubLeft)}`, 540, 250, 70, { col: "#cfefff" }));
  // red ring around the late player (5)
  if (n === 5 && f >= S(5) + 44) { const c = R.crowd.find((q) => q.red); OV.push((g, w, h) => { const [x, y] = proj([c.g.position.x, 0.2, c.g.position.z], w, h); g.save(); g.lineWidth = 12 * w / 1080; g.strokeStyle = "#ff2d2d"; g.beginPath(); g.arc(x, y, 60 * w / 1080 * pop(S(5) + 44, 6), 0, 7); g.stroke(); g.restore(); }); }
  // counter
  if (n !== 10 && n !== 15 && !(n === 17 && f >= S(17) + 20)) OV.push(label(`STILL IN: ${count}`, 540, 150, 76, { col: "#ffe14a" }));
  if (n === 19 && f > END19) shk = [END19 + 2, 0.06, 26];
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, flash, dof: { focus: 8, amount: 0 }, actors: [], fx: FXS, caption, focusPt: [0, 2, 0], overlay: (g, w, h, sc) => OV.forEach((o) => o(g, w, h, sc)) };
}
