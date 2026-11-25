// Long 2 · Scene 3 — Cubelands (40 shots). Built from scripts/LONG-02_shot-script.md
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { fuseBox, cubefolk, controller } from "./common/props.js";
import { cubelands } from "./common/worlds.js";
import { textO, subtitle, battery, loading2, banner, bubble, guestTag, INK, F } from "./common/ui.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, SH = [], SEG = [];
const FPS = 30, X0 = 200, TX = X0 + 3, TZ = -1, HX = X0 - 2, HZ = 0.4;
export async function build(E) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); meta.frames = Math.ceil(tl.total * 30); SH = tl.shots; R.total = tl.total; } catch (e) {}
  try { SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  R.w = cubelands(E, X0, 0); R.w.hero.g.visible = false;
  // our tree: trunk 4 cubes, crown 3x3x2
  const wood = E.mat("#7a5232"), leaf = E.mat("#3f9a3a"); R.trunk = []; R.crown = E.group(null, [TX, 0, TZ]);
  for (let y = 0; y < 4; y++) R.trunk.push(E.box(1, 1, 1, wood, [TX, y, TZ]));
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) for (let dy = 0; dy < 2; dy++) E.box(1, 1, 1, leaf, [dx, 4 + dy, dz], { parent: R.crown });
  // hut far left
  const hut = E.group(null, [X0 - 10, 0, -8]); E.box(3, 2.5, 3, E.mat("#b88a5a"), [0, 0, 0], { parent: hut }); E.box(3.4, 0.6, 3.4, E.mat("#8a5a36"), [0, 2.5, 0], { parent: hut }); E.box(0.8, 1.4, 0.05, E.mat("#3a2a1a"), [0, 0, 1.52], { parent: hut });
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E); R.V = cubefolk(E);
  R.fb = [0, 1, 2, 3, 4, 5].map(() => fuseBox(E));
  R.ctl = controller(E, null, [0, -50, 0], 0.5);
  // hole + lid + shaft
  R.hole = E.box(1, 0.02, 1, E.flat("#050505"), [HX, 0.012, HZ], { noShadow: true, center: true }); R.hole.visible = false;
  R.shaft = []; for (let i = 0; i < 12; i++) for (const [dx, dz, w, d] of [[-0.55, 0, 0.1, 1.2], [0.55, 0, 0.1, 1.2], [0, -0.55, 1.2, 0.1], [0, 0.55, 1.2, 0.1]]) R.shaft.push(E.box(w, 1, d, E.mat(i % 2 ? "#6a4a2a" : "#7a5232"), [HX + dx, -1 - i, HZ + dz], { noShadow: true }));
  R.lid = E.box(1, 1, 1, E.mat("#62c24a"), [HX, -50, HZ], { center: true });
  // cube mop
  R.mop = E.group(null, [0, -50, 0]); E.box(0.12, 1.2, 0.12, E.mat("#7a5232"), [0, 0, 0], { parent: R.mop }); E.box(0.5, 0.25, 0.25, E.mat("#e8e8e8"), [0, -0.1, 0], { parent: R.mop });
  // cube Donutsaurus (12-frame morph)
  R.cubeD = E.group(null, [0, -50, 0]); E.box(2.6, 2.6, 2.6, E.mat("#ff7fb8"), [0, 0, 0], { parent: R.cubeD }); for (const s of [-1, 1]) { E.box(0.4, 0.45, 0.05, E.mat("#ffffff"), [s * 0.5, 1.8, 1.31], { parent: R.cubeD, noShadow: true }); E.box(0.2, 0.25, 0.04, E.mat("#111111"), [s * 0.5, 1.85, 1.34], { parent: R.cubeD, noShadow: true }); } E.box(0.5, 0.5, 0.5, E.mat("#57c84d"), [0, 0.2, -1.5], { parent: R.cubeD });
  // belly glow + square smoke ring
  R.glow = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), new THREE.MeshBasicMaterial({ color: "#ff8a1f", transparent: true, opacity: 0 })); R.glow.userData.noink = true; R.D.body.add(R.glow);
  R.ring = E.group(null, [0, -50, 0]); for (const [x, y, w, h] of [[0, 0.5, 1.1, 0.12], [0, -0.5, 1.1, 0.12], [0.5, 0, 0.12, 1.1], [-0.5, 0, 0.12, 1.1]]) E.box(w, h, 0.12, E.flat("#bdbdbd"), [x, y, 0], { parent: R.ring, center: true, noShadow: true });
  // flip cubes for the exit
  R.flip = []; for (let i = 0; i < 10; i++) R.flip.push(E.box(0.96, 0.96, 0.96, E.mat("#62c24a"), [X0 + 6 - i * 0.7, -0.5, 0.6 + Math.sin(i) * 0.4], { center: true, noShadow: true }));
}
const hotbar2 = (items, hearts, dial, extra) => (g, w, h) => { const k = h / 1080; g.save(); const s = 84 * k, x0 = (w - 9 * s) / 2, y = h * 0.71;
  for (let i = 0; i < 9; i++) { g.fillStyle = "rgba(30,30,30,0.6)"; g.fillRect(x0 + i * s, y, s - 6 * k, s - 6 * k); g.strokeStyle = "#888"; g.lineWidth = 4 * k; g.strokeRect(x0 + i * s, y, s - 6 * k, s - 6 * k); const it = items[i]; if (it) { g.fillStyle = it.col; g.fillRect(x0 + i * s + 16 * k, y + 12 * k, s - 38 * k, s - 38 * k); if (it.glow) { g.strokeStyle = "#ffb84d"; g.lineWidth = 6 * k; g.strokeRect(x0 + i * s + 4 * k, y + 4 * k, s - 14 * k, s - 14 * k); } g.font = F(22, k); g.fillStyle = "#fff"; g.textAlign = "right"; g.fillText(it.n ?? "", x0 + (i + 1) * s - 12 * k, y + s - 14 * k); } }
  for (let i = 0; i < 11; i++) { if (i >= 10 && hearts <= 10) break; const hx = x0 + i * 36 * k, hy = y - 40 * k; g.fillStyle = i < hearts ? "#e0262e" : "#3a2a2a"; g.fillRect(hx, hy, 28 * k, 24 * k); }
  g.translate(w / 2, 70 * k); g.fillStyle = "#2a3550"; g.beginPath(); g.arc(0, 0, 52 * k, 0, 7); g.fill(); g.fillStyle = "#ffe14a"; g.fillRect(Math.cos(dial + Math.PI / 2) * 30 * k - 11 * k, -Math.sin(dial + Math.PI / 2) * 30 * k - 11 * k, 22 * k, 22 * k); g.fillStyle = "#e8e8ff"; g.fillRect(-Math.cos(dial + Math.PI / 2) * 30 * k - 9 * k, Math.sin(dial + Math.PI / 2) * 30 * k - 9 * k, 18 * k, 18 * k); g.lineWidth = 6 * k; g.strokeStyle = "#fff"; g.beginPath(); g.arc(0, 0, 52 * k, 0, 7); g.stroke(); g.restore(); if (extra) extra(g, w, h); };
export function frame(f, E) {
  const X = E.X, t = f / FPS, OV = [], FX = [], { T, P, D, V } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const fs = f - S(n), sp = (a, b) => X.span(f, a, b), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const say = (who, base) => (amp(who) > 0.55 ? ({ happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", sad: "talk", angry: "angry" }[base] || "talk") : base);
  const walk = (ph, a = 0.6) => { const s = Math.sin(ph); return { legL: a * s, legR: -a * s, armL: [-0.7 * s, 0.25], armR: [0.7 * s, 0.25] }; };
  // ---- world state ----
  const night = n < 13 ? 0 : n === 13 ? X.smooth(sp(S(13) + 20, S(13) + 80)) : 1;
  R.w.setDay(night); let light = night > 0.5 ? ["day", "night", 0.55] : "day";
  const punched = n < 7 ? 0 : n < 10 ? (f >= S(7) + 60 ? 1 : 0) : n === 10 ? (f >= S(10) + 20 ? (f >= S(10) + 50 ? 3 : 2) : 1) : 3;
  R.trunk.forEach((b, i) => (b.visible = i >= punched || (n >= 32 && i === 3 && false))); if (n >= 32 && f >= S(32) + 20) R.trunk[3].visible = false;
  // ---- defaults ----
  const L0 = [X0, 0, 0.8]; let cam, shk = null, flash = 0, grade = null;
  let tp = { pos: [X0 - 0.6, 0, 0.8], yaw: 0.2, face: "happy" }, pp = { pos: n >= 6 && n <= 12 ? [X0 - 0.8, 0, 1.4] : [X0 + 0.6, 0, 0.8], yaw: -0.2, face: say("pixi", "deadpan") }, dp = { pos: n <= 12 ? [X0 + 1.6, 0, -1.6] : [X0, 0, -0.2], scale: 1, yaw: -0.3 }, vp = null;
  let mop = null, hearts = 10, items = [], fbs = [], hole = n >= 31 && !(n === 36 && f >= S(36) + 20) && n < 37, lid = n >= 36 && (n !== 37 || f < S(37) + 10), dVis = true, cubeD = false, ring = null, glow = n >= 23 && n <= 39 ? 0.35 + 0.25 * Math.sin(f * 0.6) : 0;
  if (punched) items[0] = { col: "#7a5232", n: punched > 1 && n < 11 ? "×" + punched : "×1" }; if (n >= 11) items[0] = n === 11 && f < S(11) + 60 ? { col: "#7a5232", n: "×3" } : null;
  if (n >= 23) items[1] = { col: "#ff8a1f", n: "×1", glow: true };
  // ---- shots ----
  switch (n) {
    case 1: { const k = sp(S(1), S(1) + 18); const y = Math.max(0, 6 * (1 - k)); tp.pos = [X0 - 0.6, Math.max(0, 6 * (1 - sp(S(1) + 6, S(1) + 24))), 0.8]; if (f > S(1) + 24 && f < S(1) + 50) { tp.pitch = 1.4; tp.pos[1] = 0.2; } pp.pos = [X0 + 0.6, y, 0.8]; dp.pos = [X0, y, -0.2]; cam = { pos: [X0, 3.2, 10], look: [X0, 1.6, 0], fov: 50 }; break; }
    case 2: { tp = { ...tp, armL: [0, 0.7], elbowL: 1.4, armR: [0, 0.7], elbowR: 1.4, lean: -0.15, face: say("toast", "happy") }; const k = sp(S(2), Eo(2)); vp = { pos: [X0 - 4 + 8 * k, 0, -1.5], yaw: Math.PI / 2, ...walk(f * 0.3, 0.4), armL: [-1.5, 0], armR: [-1.5, 0] }; cam = { pos: [X0 - 0.2, 1.9, 5.2], look: [X0 - 0.4, 1.4, 0], fov: 46 }; break; }
    case 3: tp = { ...tp, yaw: -0.4, armL: [-1.5, -0.3], armR: [-1.5, 0.3], face: say("toast", "smug") }; vp = { pos: [X0 + 3.5, 0, -1.5], yaw: Math.PI / 2, armL: [-1.5, 0], armR: [-1.5, 0] }; cam = { pos: [X0 + 0.4, 1.9, 5.4], look: [X0 + 0.6, 1.4, -0.5], fov: 48 }; break;
    case 4: pp = { ...pp, armL: f > S(4) + 30 ? [-1.2, 0.2] : [0, 0.2], elbowL: f > S(4) + 30 ? 1.8 : 0, head: f > S(4) + 45 ? [0.1, 0.7, 0] : [0.3, 0.3, 0] }; tp = { ...tp, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: say("toast", "angry") }; cam = { pos: [X0, 1.9, 5.0], look: [X0, 1.4, 0], fov: 48 }; break;
    case 5: { const sw = X.easeIn(sp(S(5) + 10, S(5) + 22)); vp = { pos: [X0 - 2.0, 0, 0.6], yaw: Math.PI / 2 - sw * 2.2, armL: [-1.5, 0], armR: [-1.5, 0] }; tp = { ...tp, yaw: -1.2 + (f > S(5) + 22 ? X.smooth(sp(S(5) + 22, S(5) + 40)) * Math.PI * 2 : 0), armR: f < S(5) + 22 ? [-2.6, 0.3] : [0, 0.4], face: f > S(5) + 22 ? "dizzy" : "grin" }; cam = { pos: [X0 - 1.1, 1.8, 5.2], look: [X0 - 1.2, 1.4, 0.5], fov: 46 }; if (f > S(5) + 22 && f < S(5) + 34) OV.push(textO("BONK", 760, 360, 120, { col: "#ffffff", s: pop(S(5) + 22, 6) })); break; }
    case 6: { const k = X.smooth(sp(S(6) + 20, Eo(6))); tp = { ...tp, pos: [X.lerp(X0 - 0.6, TX - 1.1, k), 0, X.lerp(0.8, TZ + 0.4, k)], yaw: 1.2, face: "grin", ...walk(f * 0.4, 0.5 * (k < 1 ? 1 : 0)) }; cam = { pos: [X0 + 0.5, 2.0, 5.5], look: [X0 + 1.5, 1.6, -0.5], fov: 48 }; FX.push({ kind: "sparkle", pos: [tp.pos[0] + 0.2, 2.3, tp.pos[2] + 0.5], size: 0.35, t: f / 30 }); break; }
    case 7: { tp = { pos: [TX + 0.8, 0, TZ + 0.95], yaw: -2.5, armR: [-1.5 + 0.6 * Math.max(0, Math.sin(f * 0.7)), 0], elbowR: 0.2, face: "angry" }; cam = { pos: [TX - 1.3, 1.1, TZ + 2.2], look: [TX + 0.1, 0.7, TZ + 0.4], fov: 44 }; const cr = Math.min(3, Math.floor(fs / 14) + 1);
      if (f < S(7) + 60) OV.push((g, w, h) => { const v = new THREE.Vector3(TX, 0.5, TZ + 0.5).project(E.camera); const x = ((v.x + 1) / 2) * w, y = ((1 - v.y) / 2) * h; g.save(); g.strokeStyle = "#1a1a1a"; g.lineWidth = 6; for (let i = 0; i < cr * 3; i++) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(i * 2.1) * (40 + i * 18), y + Math.sin(i * 2.1) * (40 + i * 18)); g.stroke(); } g.restore(); }); break; }
    case 8: tp = { pos: [TX - 1.1, 0, TZ + 0.4], yaw: 0.6, armR: [-0.4, 0.4 + 0.3 * Math.sin(f * 0.8)], face: say("toast", "happy") }; cam = { pos: [TX - 0.4, 1.8, TZ + 4.4], look: [TX - 0.9, 1.4, TZ], fov: 46 }; break;
    case 9: tp = { pos: [TX - 1.1, 0, TZ + 0.4], yaw: 0.9, head: [-0.7, 0, 0], face: say("toast", "shock") }; cam = { pos: [TX - 2.2, 0.6, TZ + 2.6], look: [TX, 4.2, TZ], fov: 56 }; OV.push(textO("?", 1150, 380, 140, { col: "#ffffff", s: pop(S(9) + 10, 8) })); break;
    case 10: tp = { pos: [TX - 1.1, 0, TZ + 0.4], yaw: 1.4, armR: [-1.5 + 0.6 * Math.max(0, Math.sin(f * 0.9)), 0], elbowR: 0.2, face: "angry" }; cam = { pos: [TX - 3.0, 2.2, TZ + 5.4], look: [TX, 2.6, TZ], fov: 50 }; break;
    case 11: tp = { pos: [TX - 1.1, 0, TZ + 0.4], yaw: 0.4, armL: [-1.2, 0.2], armR: [-1.2, -0.2], elbowL: 0.6, elbowR: 0.6, face: "grin" }; cam = { pos: [TX - 0.8, 1.9, TZ + 3.6], look: [TX - 1.0, 1.4, TZ], fov: 46 };
      OV.push((g, w, h) => { const k = h / 1080, s = 80 * k, x0 = w / 2 - 1.5 * s - 140 * k, y0 = 330 * k, q = sp(S(11), S(11) + 10); if (q <= 0) return; g.save(); g.globalAlpha = q; g.fillStyle = "rgba(40,40,48,0.9)"; g.fillRect(x0 - 30 * k, y0 - 70 * k, 3 * s + 360 * k, 3 * s + 100 * k); textO("CRAFT?", (x0 + 1.5 * s) / k, (y0 - 35 * k) / k, 40, { col: "#ffffff" })(g, w, h);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { g.fillStyle = "#8a8a96"; g.fillRect(x0 + c * s, y0 + r * s, s - 6 * k, s - 6 * k); if (c === 1 && f >= S(11) + 15 + r * 8) { g.fillStyle = "#7a5232"; g.fillRect(x0 + c * s + 12 * k, y0 + r * s + 12 * k, s - 30 * k, s - 30 * k); } }
        textO("=", (x0 + 3 * s + 60 * k) / k, (y0 + 1.5 * s) / k, 70, { col: "#ffffff" })(g, w, h); g.fillStyle = "#8a8a96"; g.fillRect(x0 + 3 * s + 120 * k, y0 + s, s, s); if (f >= S(11) + 50) { g.fillStyle = "#7a5232"; g.fillRect(x0 + 3 * s + 160 * k, y0 + s + 10 * k, 10 * k, s - 20 * k); g.fillStyle = "#e8e8e8"; g.fillRect(x0 + 3 * s + 140 * k, y0 + 2 * s - 30 * k, 50 * k, 20 * k); }
        g.restore(); if (f >= S(11) + 50) textO("WOOD + WOOD + WOOD = MOP", 960, 640, 46, { col: "#ffe14a" })(g, w, h); });
      if (f >= S(11) + 70) mop = [TX - 1.1 + 0.2, 0.9, TZ + 0.85]; break;
    case 12: { const thr = f >= S(12) + 40; tp = { pos: [TX - 1.1, 0, TZ + 0.4], yaw: 0.5, armR: thr ? [-2.6, 0.2] : [-1.2, -0.2], elbowR: 0.4, head: f > S(12) + 20 && f < S(12) + 40 ? [-0.7, 0, 0] : [0, 0, 0], face: say("toast", "angry") }; mop = thr ? [TX - 1.1 - 0.6 * sp(S(12) + 40, S(12) + 46), 1.5 + 0.6 * sp(S(12) + 40, S(12) + 46), TZ - 0.1] : [TX - 0.9, 0.9, TZ + 0.85]; cam = { pos: [TX - 0.6, 1.9, TZ + 4.2], look: [TX - 1.1, 1.5, TZ], fov: 46 }; break; }
    case 13: { const k = X.smooth(sp(S(13), S(13) + 30)); cam = { pos: [X0 + 1, X.lerp(5, 3.0, k), X.lerp(3, 12, k)], look: [X0, X.lerp(20, 8, k), -40], fov: 54 }; mop = [TX - 1.7, 2.1, TZ - 0.1]; break; }
    case 14: pp = { ...pp, head: [-0.5, 0, 0], face: say("pixi", "deadpan") }; tp = { ...tp, armL: [0, 1.4], armR: [0, 1.4], face: say("toast", "angry"), head: [-0.3, 0.6, 0] }; mop = [TX - 1.7, 2.1, TZ - 0.1]; cam = { pos: [X0, 1.9, 5.0], look: [X0, 1.5, 0], fov: 48 }; break;
    case 15: cam = { pos: [X0 + 2, 2.0, 6], look: [X0 + 8, 1.2, 0], fov: 46 }; fbs = [{ pos: [X0 + 9.5, 0, 0.6], yaw: -Math.PI / 2, dark: true }]; mop = [TX - 1.7, 2.1, TZ - 0.1]; break;
    case 16: { const k = sp(S(16), Eo(16)); fbs = [{ pos: [X0 + X.lerp(8, 1.5, k), 0, 0.8], yaw: -Math.PI / 2, walk: f * 1.2, fuseK: 0.3 }]; cam = { pos: [X0 + 3.5, 1.0, 4.5], look: [X0 + 4, 0.6, 0.6], fov: 46 }; break; }
    case 17: { const k = sp(S(17), S(17) + 60); tp = { pos: [X0 - 0.6, 0, 0.8], yaw: -0.8, legL: -1.4, kneeL: 1.5, legR: -0.2, armL: [0, 1.4], armR: [0, 1.4], face: say("toast", "happy") }; T.pose(tp); fbs = [{ pos: [X0 + X.lerp(1.5, 0.4, k), 0, 0.8], yaw: -Math.PI / 2, walk: f * 1.2 * (1 - k), fuseK: 0.4 }]; cam = { pos: [X0 - 0.2, 1.4, 4.6], look: [X0 - 0.1, 1.0, 0.6], fov: 46 }; break; }
    case 18: case 19: { tp = { pos: [X0 - 0.6, -0.5, 0.8], yaw: -0.8, legL: -1.4, kneeL: 1.5, armL: [0, 1.4], armR: [0, 1.4], face: n === 18 && fs < 40 ? "happy" : "nervous" in {} ? "shock" : "shock" };
      const fl = n === 18 ? [S(18) + 12, S(18) + 50] : [S(19) + 10]; let fla = 0; for (const a of fl) if (f >= a && f < a + 5) fla = 1; fbs = [{ pos: [X0 + 0.4, 0, 0.8], yaw: -Math.PI / 2, fuseK: n === 18 ? 0.5 : 0.7, flash: fla }];
      if (n === 19) { pp = { ...pp, pos: [X0 + 1.2, 0, 1.2], armL: [-2.4, 0.9], elbowL: 2.2, armR: [-2.4, 0.9], elbowR: 2.2, face: say("pixi", "deadpan") }; }
      cam = { pos: [X0 + 0.2, 1.5, 4.8], look: [X0 + 0.2, 1.0, 0.6], fov: 46 }; break; }
    case 20: { const k = X.easeIn(sp(S(20) + 4, S(20) + 16)); fbs = f < S(20) + 16 ? [{ pos: [X0 + 0.4, 0, 0.8], yaw: -Math.PI / 2, fuseK: 0.8, flash: f > S(20) && f < S(20) + 5 ? 1 : 0 }] : []; dp = { pos: [X0 - 0.4, 0, -0.6], yaw: 0.6, jaw: k < 1 ? 1 : 0.1, head: [0.5 * Math.sin(k * Math.PI), 0, 0], scale: 1 };
      tp = { pos: [X0 - 0.6, -0.5, 0.8], yaw: -0.8, legL: -1.4, kneeL: 1.5, armL: [0, 1.4], armR: [0, 1.4], face: "shock" }; pp = { ...pp, pos: [X0 + 1.2, 0, 1.2], armL: [-2.4, 0.9], elbowL: 2.2, armR: [-2.4, 0.9], elbowR: 2.2 }; cam = { pos: [X0 + 0.2, 1.7, 5.4], look: [X0, 1.1, 0.4], fov: 48 }; break; }
    case 21: { tp = { pos: [X0 - 0.6, -0.5, 0.8], yaw: -0.8, legL: -1.4, kneeL: 1.5, armL: f > S(21) + 50 ? [-2.4, 0.9] : [0, 1.4], elbowL: f > S(21) + 50 ? 2.2 : 0, armR: f > S(21) + 50 ? [-2.4, 0.9] : [0, 1.4], elbowR: f > S(21) + 50 ? 2.2 : 0, head: [0.4, 0.4, 0], face: "shock" }; pp = { ...pp, pos: [X0 + 1.2, 0, 1.2], armL: [-2.4, 0.9], elbowL: 2.2, armR: [-2.4, 0.9], elbowR: 2.2, head: [0.4, -0.4, 0] };
      dp = { pos: [X0 - 0.4, 0, -0.6], yaw: 0.6, scale: 1 }; glow = (fs % 30) < 6 ? 0.9 : 0; cam = { pos: [X0 + 0.2, 1.9, 6.0], look: [X0, 1.3, 0], fov: 48 }; break; }
    case 22: { cubeD = fs < 12; dp = { pos: [X0 - 0.4, 0, -0.6], yaw: 0.6, scale: 1, squash: fs >= 12 && fs < 22 ? 0.2 * Math.sin((fs - 12) * 0.8) : 0 }; tp = { pos: [X0 - 0.6, -0.5, 0.8], yaw: -0.8, legL: -1.4, kneeL: 1.5, armL: [-2.4, 0.9], elbowL: 2.2, armR: [-2.4, 0.9], elbowR: 2.2, face: "shock" }; pp = { ...pp, pos: [X0 + 1.2, 0, 1.2], armL: [-2.4, 0.9], elbowL: 2.2, armR: [-2.4, 0.9], elbowR: 2.2 };
      cam = { pos: [X0 + 0.5, 3, 10], look: [X0, 1.4, 0], fov: 48 }; shk = [S(22), 0.08, 10]; if (fs < 14) OV.push(textO("boom", 960, 420, 70, { col: "#ffffff", s: pop(S(22), 6) })); break; }
    case 23: { dp = { pos: [X0 - 0.4, 0, -0.6], yaw: 0.4, scale: 1, jaw: 0.4 }; tp = { pos: [X0 - 0.6, 0, 0.8], yaw: -0.6, face: "shock" }; cam = { pos: [X0 - 0.2, 2.2, 5.2], look: [X0 - 0.4, 2.0, -0.4], fov: 46 }; for (let i = 0; i < 3; i++) FX.push({ kind: "puff", pos: [X0 - 0.4 + (i - 1) * 0.5, 2.6 + i * 0.2, 0.2], size: 0.6, t: ((fs + i * 7) % 20) / 20 }); break; }
    case 24: { dp = { pos: [X0 - 0.4, 0, -0.6], yaw: 0.2, scale: 1, squash: -0.05 + 0.02 * Math.sin(f * 2.5) }; cam = { pos: [X0 - 0.3, 2.7, 3.4], look: [X0 - 0.4, 2.6, -0.6], fov: 40 }; tp = { pos: [X0 + 0.6, 0, 0.9], yaw: -0.6, armR: [-1.6, 0.1], face: say("toast", "scared") }; break; }
    case 25: { const k = sp(S(25) + 6, Eo(25)); dp = { pos: [X0 - 0.4, 0, -0.6], yaw: 0.3, scale: 1, jaw: 0.9 }; ring = [X0 - 0.3, 2.8 + k * 10, 0.4 + k * -20]; mop = [TX - 1.7 + k, 2.1, TZ - 0.1]; tp = { pos: [X0 - 0.6, 0, 0.8], yaw: -0.4, lean: -0.2, face: "shock" }; pp = { ...pp, face: "deadpan" }; if (P.tail) P.tail.rotation.set(0, 1.4, 0);
      cam = { pos: [X0 + 1.5, 2.6, 9.5], look: [X0, 2.4, -2], fov: 50 }; OV.push(textO(`BURP: ${Math.min(3.5, (fs / 30)).toFixed(1)} s`, 1700, 140, 50, { col: "#ffffff" })); if (fs > 90) OV.push(textO("NEW RECORD", 1700, 200, 46, { col: "#ff4d4d", s: pop(S(25) + 90, 6) })); break; }
    case 26: { ring = [X0 - 0.3 + sp(S(26), S(26) + 30) * 0, 22, -60]; cam = { pos: [X0 + 0.2, 21, -50], look: [X0, 26, -70], fov: 40 }; if (fs > 30) hearts = 11; break; }
    case 27: { const lb = Math.abs(Math.sin(fs * 0.5)); dp = { pos: [X0 - 0.4, lb * 0.15, -0.6], yaw: 0.2, scale: 1, jaw: 0.5 + 0.5 * lb, head: [-0.3 + 0.2 * lb, 0, 0], armUp: 0.6 * lb, blink: lb < 0.3, tailY: 0.4 * Math.sin(f * 0.6) }; tp = { pos: [X0 + 0.5, 0, 0.6], yaw: -0.8, armR: [-2.0, 0.3], face: say("toast", "scared") }; hearts = 11; cam = { pos: [X0 + 0.2, 2.2, 6.2], look: [X0 - 0.1, 1.8, -0.4], fov: 48 }; OV.push(bubble("HA HA HA", 700, 260, 760, 420, pop(S(27) + 6, 8), { size: 80 })); break; }
    case 28: { fbs = [0, 1, 2, 3, 4].map((i) => ({ pos: [X0 + 6 + i * 0 + 0.0 - X.smooth(sp(S(28) + i * 8, Eo(28))) * 2.5, 0, -2 + i * 1.1], yaw: -Math.PI / 2, walk: f * 1.1 + i, fuseK: 0.3 })); hearts = 11; cam = { pos: [X0 + 1, 2.6, 9], look: [X0 + 4, 1, -0.5], fov: 50 }; OV.push(textO(`PRESENTS: ${Math.min(5, 1 + Math.floor(fs / 16))}`, 1700, 140, 50, { col: "#ffe14a" })); break; }
    case 29: { dp = { pos: [X0 - 0.4, 0, -0.6], yaw: 0.6, scale: 1, lean: 0.4, legL: -0.8, legR: -0.8, tailY: 0.5 * Math.sin(f * 1.2), jaw: 0.3 }; tp = { pos: [X0 + 0.5, 0, 0.9], yaw: -1.0, armR: [-2.6, 0.2], face: say("toast", "angry") }; hearts = 11; fbs = [0, 1, 2, 3, 4].map((i) => ({ pos: [X0 + 3.5, 0, -2 + i * 1.1], yaw: -Math.PI / 2, fuseK: 0.4 })); cam = { pos: [X0, 1.9, 5.8], look: [X0, 1.4, 0], fov: 48 }; break; }
    case 30: { const k = sp(S(30) + 40, Eo(30)); vp = { pos: [X0 - 6 + 4 * k, 0, -1.2], yaw: Math.PI / 2, ...walk(f * 0.3, 0.4 * (k < 1 ? 1 : 0)), armL: [-1.5, 0], armR: [-1.5, 0] }; tp = { pos: [X0 + 0.5, 0, 0.9], yaw: -0.4, armR: [-1.4, 0.2], face: say("toast", "shock") }; pp = { ...pp, pos: [X0 + 1.0, 0, 1.0], armL: [-1.2, -0.2], elbowL: 0.6, face: say("pixi", "deadpan") }; hearts = 11; cam = { pos: [X0 + 0.5, 1.9, 6.4], look: [X0 - 0.4, 1.3, 0], fov: 50 }; break; }
    case 31: vp = { pos: [HX - 0.9, 0, HZ - 0.2], yaw: Math.PI / 2, armL: [-1.5 + (fs > 10 && fs < 20 ? 0.4 : 0), 0], armR: [-1.5, 0] }; cam = { pos: [HX - 1.3, 1.3, HZ + 1.9], look: [HX, 0.1, HZ], fov: 46 }; tp = null; hearts = 11; break;
    case 32: { const k = sp(S(32), Eo(32)); tp = { pos: [X.lerp(X0 + 0.5, HX + 0.3, k), 0, X.lerp(0.9, HZ, k)], yaw: 0.8, armR: [-2.6, 0.2], legL: -0.5 * Math.sin(f * 0.4), legR: 0.5 * Math.sin(f * 0.4), head: [-0.5, 0.6, 0], face: say("toast", "smug") }; vp = { pos: [HX - 0.9, 0, HZ - 0.4], yaw: 0.4, armL: [-1.5, 0], armR: [-1.5, 0] }; fbs = [{ pos: [TX - 0.6, Math.max(0, 1.4 * Math.sin(sp(S(32) + 10, S(32) + 30) * Math.PI)), TZ + 0.6], yaw: -Math.PI / 2, fuseK: 0.5 }]; hearts = 11; cam = { pos: [X0 + 0.5, 3, 9.5], look: [X0, 1.6, 0], fov: 50 }; break; }
    case 33: tp = { pos: [HX, f > S(33) + 6 ? -X.easeIn(sp(S(33) + 6, Eo(33))) * 3 : 0, HZ], yaw: 0.2, face: "shock", armL: [0, 0.5], armR: [0, 0.5] }; vp = { pos: [HX - 0.9, 0, HZ - 0.4], yaw: 0.4, armL: [-1.5, 0], armR: [-1.5, 0] }; hearts = 11; cam = { pos: [HX + 0.3, 1.8, HZ + 4.5], look: [HX, 1.0, HZ], fov: 46 }; break;
    case 34: { const k = sp(S(34), Eo(34)); tp = { pos: [HX, -2 - k * 8, HZ], yaw: 0, pitch: 0, armL: [0, 2.8], armR: [0, 2.8], face: "scared", head: [-1.2, 0, 0] }; hearts = 11; cam = { pos: [HX, 3.5, HZ + 0.01], look: [HX, -10, HZ], fov: 50 }; break; }
    case 35: { tp = null; hearts = 11 - Math.min(11, Math.floor(fs / 4)); cam = { pos: [HX + 0.4, 2.2, HZ + 4.4], look: [HX, 0.2, HZ], fov: 48 }; vp = { pos: [HX - 0.9, 0, HZ - 0.4], yaw: 0.4, armL: [-1.5, 0], armR: [-1.5, 0] }; grade = { uSat: 0.35 }; shk = [S(35), 0.2, 10]; const sc = fs < 5 ? X.lerp(3.2, 1, X.easeIn(fs / 5)) : 1; OV.push(banner("TOASTED!", sc)); break; }
    case 36: { tp = null; hearts = 0; const k = sp(S(36), S(36) + 20); vp = { pos: [HX - 0.9, 0, HZ - 0.3], yaw: f > S(36) + 40 ? 0 : 0.5, armL: [-1.5 + 0.5 * Math.sin(k * Math.PI), 0], armR: [-1.5, 0], face: "deadpan" }; R.lid.position.set(HX, X.lerp(1.2, 0.5, k), HZ); cam = { pos: [HX + 0.6, 1.9, HZ + 4.6], look: [HX - 0.3, 1.0, HZ], fov: 46 }; break; }
    case 37: { tp = null; hearts = 0; pp = { pos: [HX + 0.8, -0.4, HZ + 0.4], yaw: -1.2, legL: -1.6, kneeL: 1.8, legR: -1.6, kneeR: 1.8, armL: [-1.4, 0.2], elbowL: 0.3, face: say("pixi", "deadpan"), head: [0.5, 0, 0] }; R.lid.position.set(HX + (f > S(37) + 10 ? 0.9 : 0), f > S(37) + 10 ? 0.5 : 0.5, HZ + (f > S(37) + 10 ? -0.4 : 0)); vp = { pos: [HX - 0.9, 0, HZ - 0.3], yaw: 0.2, armL: [-1.5, 0], armR: [-1.5, 0] }; cam = { pos: [HX - 1.6, 1.5, HZ + 3.6], look: [HX + 0.4, 0.5, HZ], fov: 46 }; break; }
    case 38: break;
    case 39: { const k = X.easeIn(sp(S(39) + 18, S(39) + 40)); tp = { pos: [HX, -3 + 13 * k, HZ], yaw: 0, armL: [0, 2.8], armR: [0, 2.8], face: "shock" }; pp = { ...pp, pos: [HX + 0.8, 10 * X.easeIn(sp(S(39) + 24, S(39) + 50)), HZ + 0.4] }; dp = { pos: [X0, 10 * X.easeIn(sp(S(39) + 26, S(39) + 52)), -0.4], scale: 1, yaw: 0.2 }; vp = { pos: [HX - 1.6, 0, HZ - 0.5], yaw: 0.3, armL: [-1.5, 0], armR: [-3.0 + 0.4 * Math.sin(f * 0.8), 0.4] }; hearts = 0; cam = { pos: [X0 - 0.5, 3, 11], look: [X0 - 0.8, 2.4, 0], fov: 52 }; break; }
  }
  // inserts on the controller
  if (n === 38) { R.ctl.g.position.set(X0, 1.0, 3.0); R.ctl.g.rotation.set(0.75, 0, 0); R.ctl.set("CHANGE SERVER", f > S(38) + 12 ? 0 : 1); cam = { pos: [X0, 1.62, 3.42], look: [X0, 1.0, 3.0], fov: 38 }; tp = null; if (f > S(38) + 12) OV.push(textO("LOW BATTERY", 960, 300, 60, { col: (f % 20) < 10 ? "#ff3d3d" : "#ffffff" })); }
  else R.ctl.g.position.y = -50;
  // ---- pose ----
  if (tp) T.pose(tp); else T.pose({ visible: false });
  if (n === 34 || n === 35 || n === 36 || n === 37 || n === 38) P.pose(n === 37 ? pp : { visible: false }); else P.pose(pp);
  P.boardAt([0, -50, 0], 0, 0, 0, false);
  if (cubeD) { D.pose({ visible: false }); R.cubeD.position.set(dp.pos[0], 1.3, dp.pos[2]); } else { R.cubeD.position.y = -50; if (dVis && ![26, 31, 33, 34, 35, 36, 37, 38].includes(n)) D.pose({ ...dp, look: n === 23 ? [Math.sin(f * 0.9), Math.cos(f * 1.1)] : [0, 0] }); else D.pose({ visible: false }); }
  R.glow.material.opacity = glow;
  if (vp) V.pose({ ...vp, face: vp.face || "deadpan" }); else V.pose({ visible: false });
  R.fb.forEach((b, i) => { const q = fbs[i]; if (!q) { b.pose({ visible: false }); return; } b.pose({ pos: q.pos, yaw: q.yaw, walk: q.walk || 0, fuseK: q.fuseK || 0, flash: q.flash || 0, visible: true }); });
  if (mop) { R.mop.position.set(...mop); R.mop.rotation.set(0.3, 0, 0.4); } else R.mop.position.y = -50;
  R.hole.visible = hole; R.shaft.forEach((b) => (b.visible = n === 34)); if (!(n >= 36 && n <= 37)) R.lid.position.y = -50;
  if (ring) { R.ring.position.set(...ring); R.ring.rotation.set(0, 0, f * 0.02); } else R.ring.position.y = -50;
  R.flip.forEach((b, i) => { const a = S(39) + i * 2; const k = n === 39 ? X.smooth(sp(a, a + 6)) : 0; b.position.y = n === 39 ? -0.5 + 0.02 + k * 0.6 : -50; b.rotation.set(k * Math.PI, 0, 0); });
  // ---- HUD ----
  if (n !== 40 && !(n === 1 && fs < 10) && n !== 26) OV.push(hotbar2(items, hearts, Math.PI * night));
  if (n === 1 && fs < 10) OV.push(textO("FINAL BATTLE — LORD MITTEN", 960, 50, 36, { col: "#ffffff" }));
  if (n !== 40 && tp && ![7, 10, 11, 26, 34, 38].includes(n)) OV.push((g, w, h) => { [T.root, P.root, D.root].forEach((r, i) => { if (!r.visible) return; const v = r.position.clone().add(new THREE.Vector3(0, i === 2 ? 3.3 : 2.5, 0)).project(E.camera); if (v.z < 1) guestTag(((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h, 0.9)(g, w, h); }); });
  if (n !== 40) OV.push(battery(n >= 38 && f > S(38) + 12 ? 0 : 1));
  if (n === 40) OV.push(loading2(Math.min(f - S(40), 120) / FPS * (f - S(40) < 60 ? 1 : 0.8), "Low battery. Please do not travel between universes.", 0));
  const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); if (cur && n !== 40) OV.push(subtitle(cur.text));
  if (!cam) cam = { pos: [X0, 2.2, 7], look: [X0, 1.4, 0], fov: 48 };
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, flash, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
