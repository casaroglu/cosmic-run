// Long 4 · Scene 6 — Under the map (19 shots). The workshop: one desk, one lamp, one finger.
import * as THREE from "three";
import { makeToast } from "./blocky/rig.js";
import { adminHand } from "./common/props.js";
import { textO, subtitle, banner, stamp, loading, INK, F } from "./common/ui.js";
import { chip, plusOne, P2, wpos, tag, card, yearPanel } from "./common/l4.js";
import { TPOSE } from "./common/game.js";
import { LIGHTS } from "./engine/engine.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {}, IMG = {}, W0 = -300;
const WORK = { ...LIGHTS.interior, sun: "#ffd9a0", sunI: 0.25, sky: "#4a3a30", ground: "#1a1210", hemiI: 0.35, amb: 0.08, top: "#120d0a", bot: "#2a1d16", fog: "#120d0a", fogNear: 20, fogFar: 60, sat: 1.0, warm: 0.05, con: 1.1, vig: 0.55 };
const load = (src) => new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
const tlOf = async (s) => { try { return (await (await fetch(`../${s}_work/timeline.json?v=` + Date.now())).json()).shots; } catch (e) { return null; } };
export async function build(E) {
  await loadTL(meta, R);
  const M = (c, o) => E.mat(c, o), x0 = W0;
  // room
  E.plane(10, 8, M("#3a2e26"), [x0, 0, 0], { rot: [-Math.PI / 2, 0, 0] }); E.plane(10, 4.6, M("#4a3c32", { map: E.T.planks("#4a3c32", 8) }), [x0, 2.3, -4]); E.plane(8, 4.6, M("#43362d"), [x0 - 5, 2.3, 0], { rot: [0, Math.PI / 2, 0] }); E.plane(8, 4.6, M("#43362d"), [x0 + 5, 2.3, 0], { rot: [0, -Math.PI / 2, 0] });
  E.plane(10, 8, M("#2a211b"), [x0, 4.6, 0], { rot: [Math.PI / 2, 0, 0] }); R.hatch = E.plane(1.8, 1.8, E.flat("#e8ecff"), [x0 + 3, 4.59, 0.5], { rot: [Math.PI / 2, 0, 0], noink: true });
  // desk, lamp, beige monitor, keyboard, red button
  E.box(3.2, 0.12, 1.4, M("#6a4a32", { map: E.T.planks("#6a4a32", 4) }), [x0 - 1, 1.0, -2.6]); for (const [dx, dz] of [[-1.5, -0.6], [1.5, -0.6], [-1.5, 0.6], [1.5, 0.6]]) E.box(0.12, 1.0, 0.12, M("#4a3222"), [x0 - 1 + dx, 0, -2.6 + dz]);
  R.mon = E.group(null, [x0 - 1.3, 1.12, -2.9]); E.box(1.1, 0.9, 0.9, M("#d8cfb0"), [0, 0.1, 0], { parent: R.mon }); E.box(0.4, 0.1, 0.4, M("#d8cfb0"), [0, 0, 0], { parent: R.mon });
  R.monT = card(512, 400, (g, w, h) => { g.fillStyle = "#0e1a10"; g.fillRect(0, 0, w, h); g.font = "700 26px monospace"; g.fillStyle = "#7dff7a"; ["MEGA DONUT HEIST 2", "build 4751", "", "> fix floor", "> fix walls", "> answer: NOT YET", "> answer: NOT YET", "> answer: NOT YET", "> _"].forEach((l, i) => g.fillText(l, 24, 44 + i * 40)); });
  E.plane(0.86, 0.66, E.flat("#ffffff", { map: R.monT }), [0, 0.6, 0.455], { parent: R.mon, noink: true, noShadow: true });
  R.kb = E.box(1.0, 0.06, 0.34, M("#d8cfb0"), [x0 - 1.3, 1.12, -2.2]); R.lampL = new THREE.PointLight("#ffcf8a", 6, 9, 1.4); R.lampL.position.set(x0 + 0.2, 2.3, -2.3); E.scene.add(R.lampL);
  const lamp = E.group(null, [x0 + 0.3, 1.06, -2.8]); E.cyl(0.2, 0.25, 0.08, M("#2a2a2a"), [0, 0, 0], { parent: lamp, seg: 12 }); E.box(0.06, 1.0, 0.06, M("#2a2a2a"), [0, 0.08, 0], { parent: lamp, rot: [0, 0, -0.3] }); E.cone(0.3, 0.35, M("#2f6f4a"), [-0.25, 1.0, 0.1], { parent: lamp, rot: [0, 0, Math.PI - 0.5] });
  R.btnBase = E.box(0.5, 0.12, 0.5, M("#3a3550"), [x0 + 0.1, 1.06, -2.15]); R.btn = E.cyl(0.18, 0.2, 0.14, E.mat("#e0262e"), [x0 + 0.1, 1.18, -2.15], { seg: 20 }); R.dent = E.cyl(0.07, 0.07, 0.02, E.mat("#9a1418"), [x0 + 0.1, 1.315, -2.15], { seg: 12 }); R.dent.scale.set(1, 1, 1.5);
  // stamp in the drawer
  R.stampG = E.group(null, [0, -50, 0]); E.box(0.16, 0.5, 0.16, M("#6a4a32"), [0, 0.2, 0], { parent: R.stampG }); E.box(0.5, 0.2, 0.36, M("#d8262e"), [0, 0, 0], { parent: R.stampG });
  // shelves + labelled crates
  const lab = (txt, col = "#c79a5b") => card(512, 160, (g, w, h) => { g.fillStyle = col; g.fillRect(0, 0, w, h); g.lineWidth = 8; g.strokeStyle = INK; g.strokeRect(6, 6, w - 12, h - 12); g.font = F(txt.length > 12 ? 56 : 70); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = INK; g.fillText(txt, w / 2, h / 2 + 4); });
  for (const y of [1.3, 2.6]) E.box(4.2, 0.1, 1.0, M("#5a4030"), [x0 + 2.6, y, -3.4]);
  R.crates = []; [["THE DISC", 1.4, 1.4], ["FRAMES 31–60", 2.9, 1.4], ["THE FLOOR (FINAL)", 4.2, 1.4], ["MISSION 2", 1.6, 2.7], ["THE ENDING", 3.4, 2.7]].forEach(([t, dx, y], i) => { const g = E.group(null, [x0 + dx, y, -3.3]); E.box(1.1, 0.8, 0.8, M("#c79a5b", { map: E.T.planks("#c79a5b", 4) }), [0, 0, 0], { parent: g, }); E.plane(1.0, 0.31, E.mat("#ffffff", { map: lab(t) }), [0, 0.6, 0.41], { parent: g, noShadow: true }); R.crates.push(g); });
  // the disc (gold, cobwebs) and the jar of frames
  R.disc = E.cyl(0.3, 0.3, 0.03, E.mat("#ffd23a", { emissive: "#7a5a10", emissiveIntensity: 0.5 }), [0.0, 0.84, 0.1], { parent: R.crates[0], rot: [0.25, 0, 0], center: true, seg: 28 });
  R.jar = E.group(R.crates[1], [0, 0.8, 0.05]); E.cyl(0.25, 0.25, 0.6, E.mat("#bfe8ff", { transparent: true, opacity: 0.35 }), [0, 0, 0], { parent: R.jar, seg: 16 }); E.cyl(0.27, 0.27, 0.08, M("#c0c0c8"), [0, 0.6, 0], { parent: R.jar, seg: 16 }); for (let i = 0; i < 7; i++) E.box(0.16, 0.12, 0.01, E.flat(["#ffe14a", "#7fffd4", "#ff7fb8"][i % 3]), [-0.12 + (i % 3) * 0.12, 0.08 + Math.floor(i / 3) * 0.16, 0.04 * (i % 2)], { parent: R.jar, noShadow: true, rot: [0, i, 0.3] });
  // heap of cardboard crates under the hatch
  for (let i = 0; i < 7; i++) E.box(0.9, 0.6, 0.7, M(i % 2 ? "#b88a50" : "#c79a5b"), [x0 + 3 + ((i * 37) % 5 - 2) * 0.35, (i > 3 ? 0.6 : 0), 0.5 + ((i * 23) % 5 - 2) * 0.3], { rot: [0, i, 0] });
  // wall: mechanical counter, brass plaque, framed yellow page
  R.ctr = card(1024, 420, (g, w, h) => { g.fillStyle = "#2a2a30"; g.fillRect(0, 0, w, h); g.font = F(50); g.textAlign = "center"; g.fillStyle = "#e8e0c8"; g.fillText('TIMES TOAST ASKED "IS IT READY YET?"', w / 2, 70); "4751".split("").forEach((d, i) => { const x = 222 + i * 150; g.fillStyle = "#f4f0e4"; g.fillRect(x, 120, 130, 220); g.fillStyle = "#111"; g.font = "800 180px monospace"; g.fillText(d, x + 65, 296); g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(x, 226, 130, 6); }); g.fillStyle = "#e8e0c8"; g.font = F(90); g.fillText(",", 365, 330); });
  R.ctrM = E.plane(2.4, 0.98, E.flat("#ffffff", { map: R.ctr }), [x0 - 2.6, 3.3, -3.98], { noShadow: true });
  const pl = card(1024, 300, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#e6c35a"); gr.addColorStop(1, "#a87c24"); g.fillStyle = gr; g.fillRect(0, 0, w, h); g.lineWidth = 14; g.strokeStyle = "#7a5a14"; g.strokeRect(10, 10, w - 20, h - 20); g.font = F(54); g.textAlign = "center"; g.fillStyle = "#3a2a08"; g.fillText("EVERY TIME SOMEBODY ASKS,", w / 2, 110); g.fillText("I STOP AND ANSWER.", w / 2, 180); g.fillStyle = "#8a1a10"; g.font = F(64); g.fillText("+1 DAY.", w / 2, 258); });
  E.plane(1.9, 0.56, E.mat("#ffffff", { map: pl }), [x0 - 2.6, 2.3, -3.98], { noShadow: true });
  const pg = card(600, 800, (g, w, h) => { g.fillStyle = "#3a2a1a"; g.fillRect(0, 0, w, h); g.fillStyle = "#f3e2a0"; g.fillRect(40, 40, w - 80, h - 80); g.fillStyle = "rgba(160,120,40,0.25)"; for (let i = 0; i < 9; i++) g.fillRect(60, 300 + i * 46, w - 120, 6); g.font = F(48); g.textAlign = "center"; g.fillStyle = INK; g.fillText("MEGA DONUT HEIST 2", w / 2, 130); g.font = F(46); g.fillText("RELEASE DATE:", w / 2, 220); g.fillStyle = "#c0262e"; g.font = F(52); g.fillText("20 NOVEMBER 2013", w / 2, 290); });
  E.plane(0.9, 1.2, E.mat("#ffffff", { map: pg }), [x0 - 0.3, 3.0, -3.98], { noShadow: true });
  R.T = makeToast(E); R.H = adminHand(E); R.H2 = adminHand(E); R.H.g.scale.setScalar(0.42); R.H2.g.scale.setScalar(0.42);
  // memory images: scene 1's presses + tonight's three
  const want = [];
  const t1 = await tlOf("s1_wait"), t2 = await tlOf("s2_launch"), t3 = await tlOf("s3_floor"), t4 = await tlOf("s4_walls");
  const at = (tl, n, off) => (tl ? Math.round(tl[n - 1].s * 30) + off : 0);
  R.MEM = [["s1_wait", at(t1, 3, 51)], ["s1_wait", at(t1, 4, 93)], ["s1_wait", at(t1, 5, 31)], ["s1_wait", at(t1, 6, 30)], ["s1_wait", at(t1, 7, 26)], ["s2_launch", at(t2, 13, 41)], ["s3_floor", at(t3, 10, 35)], ["s4_walls", at(t4, 15, 31)]];
  await Promise.all(R.MEM.map(async ([s, i]) => { IMG[s + i] = await load(`../${s}_frames/f${String(i).padStart(5, "0")}.jpg`); }));
}
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop, say } = C, OV = [], { T, H, H2 } = R, x0 = W0;
  let cam, light = WORK, dof = { focus: 6, amount: 0 }, grade = null, shk = null;
  let tp = { pos: [x0 + 2.2, 0, -0.2], yaw: -0.6, face: say("toast", "shock") }, tpose = n <= 7, flat = false, handTyping = true, typeK = Math.abs(Math.sin(f * 0.25)), hand2 = null, tagTxt = "PLAYER 1", tagOn = n >= 8 && n !== 14 && n < 17;
  R.stampG.position.y = -50;
  const wide = { pos: [x0 + 1.0, 2.6, 4.4], look: [x0 - 0.2, 1.7, -2.6], fov: 54 };
  const crateCam = (i) => { const g = R.crates[i]; g.updateMatrixWorld(true); const p = wpos(g, [0, 0.45, 0.4]); return { pos: [p.x + 0.05, p.y + 0.55, p.z + 2.3], look: [p.x, p.y + 0.0, p.z], fov: 40 }; };
  switch (n) {
    case 1: { const k = X.easeIn(sp(S(1) + 10, S(1) + 30)); tp = { pos: [x0 + 3, 1.2 + 6 * (1 - k), 0.5], yaw: 0.3, ...TPOSE, face: f > S(1) + 30 ? "dizzy" : "shock" }; cam = { pos: [x0 + 0.6, 1.4, 4.6], look: [x0 + 2.8, 2.6, 0.2], fov: 56 }; if (f > S(1) + 30 && f < S(1) + 38) shk = [S(1) + 30, 0.06, 8]; break; }
    case 2: tp = { pos: [x0 + 3, 1.2, 0.5], yaw: -0.3, ...TPOSE, face: "shock" }; cam = wide; break;
    case 3: case 4: case 5: case 6: case 7: tp = { pos: [x0 + 3, 1.2, 0.5], yaw: -0.3, ...TPOSE, face: "shock" }; cam = crateCam(n - 3); if (n === 3) OV.push((g, w, h) => { const k = h / 1080; g.save(); g.strokeStyle = "rgba(255,255,255,0.55)"; g.lineWidth = 2 * k; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(960 * k, 520 * k); g.lineTo((960 + Math.cos(i * 0.8) * 420) * k, (520 + Math.sin(i * 0.8) * 300) * k); g.stroke(); } for (let r = 1; r < 4; r++) { g.beginPath(); for (let i = 0; i <= 8; i++) { const a = i * 0.8; g.lineTo((960 + Math.cos(a) * r * 110) * k, (520 + Math.sin(a) * r * 80) * k); } g.stroke(); } g.restore(); }); break;
    case 8: { const k = X.smooth(sp(S(8), S(8) + 10)); tp = { pos: [x0 + 2.6, 0, 0.9], yaw: -0.5, armL: [-2.4 * (1 - k) + (k >= 1 ? -1.8 * Math.abs(Math.sin(f * 0.3)) : 0), 1.57 * (1 - k)], armR: [-2.4 * 0, 1.57 * (1 - k)], face: say("toast", "grin") }; tagTxt = k < 1 ? "PROP (UNUSED)" : "PLAYER 1"; cam = { pos: [x0 + 1.4, 2.0, 4.6], look: [x0 + 2.0, 1.6, -0.6], fov: 46 }; break; }
    case 9: { tp = { pos: [x0 + 1.6, 0, -0.6], yaw: -0.9, face: say("toast", "angry"), armL: C.amp("toast") > 0.5 ? [-1.6, 0.4] : [0, 0.2] }; cam = { pos: [x0 + 1.4, 2.0, 2.6], look: [x0 - 0.6, 1.5, -2.2], fov: 48 }; break; }
    case 10: { handTyping = false; R.point = true; tp = { pos: [x0 + 1.6, 0, -0.6], yaw: -1.6, face: "shock", head: [-0.2, 0, 0] }; cam = { pos: [x0 + 1.4, 2.0, 2.6], look: [x0 - 1.4, 2.4, -3.0], fov: 52 }; break; }
    case 11: cam = { pos: [x0 - 2.6, 3.3, -1.9], look: [x0 - 2.6, 3.3, -3.98], fov: 34 }; handTyping = true; break;
    case 12: cam = { pos: [x0 - 2.6, 2.3, -2.6], look: [x0 - 2.6, 2.3, -3.98], fov: 34 }; break;
    case 13: cam = { pos: [x0 - 0.3, 3.0, -2.0], look: [x0 - 0.3, 3.0, -3.98], fov: 40 }; break;
    case 14: { // memory: 2013 panel 1.5 s with the big +1 DAY, then every press, faster
      cam = wide; const tl = [0, 45, 60, 73, 84, 94, 103, 111], i = Math.max(0, tl.filter((v) => fs >= v).length - 1); const [sc, fr] = R.MEM[Math.min(i, R.MEM.length - 1)]; const im = IMG[sc + fr];
      OV.push((g, w, h) => { if (im) g.drawImage(im, 0, 0, w, h); else { g.fillStyle = "#333"; g.fillRect(0, 0, w, h); } if (sc !== "s1_wait") { g.fillStyle = "rgba(255,230,160,0.12)"; g.fillRect(0, 0, w, h); } });
      const a = S(14) + tl[Math.min(i, 7)]; OV.push(plusOne(960, 470, f - a, true)); if (i >= 5) OV.push(textO("TONIGHT", 960, 140, 80, { col: "#ffffff" })); grade = null; break; }
    case 15: { const crash = S(15) + 4; tp = { pos: [x0 + 1.6, 0, -0.6], yaw: -0.4, face: f > C.L(5) ? say("toast", "shock") : "shock", eyePop: X.spring(sp(crash, crash + 10)), headScale: 1.1 }; cam = fs < 6 ? { pos: [x0 + 1.9, 1.9, 2.6], look: [x0 + 1.4, 1.9, -0.6], fov: 46 } : { pos: [x0 + 1.85, 1.95, 2.0], look: [x0 + 1.5, 1.95, -0.6], fov: 46 }; break; }
    case 16: { // the worn button: his hand floats toward it, the other hand catches the wrist, he sits on it
      const sit = S(16) + 110; tp = f < sit ? { pos: [x0 + 1.0, 0, -1.4], yaw: Math.PI + 0.6, armR: [-1.3 * X.smooth(sp(S(16) + 10, S(16) + 60)), -0.2], elbowR: 0.1, armL: f > S(16) + 50 ? [-1.2, 0.6] : [0, 0.2], elbowL: 0.6, face: "scared", head: [0.3, 0.3, 0] }
        : { pos: [x0 + 1.0, 0.03, -1.0], yaw: Math.PI + 0.6, legL: -1.45, kneeL: 1.45, legR: -1.45, kneeR: 1.45, armL: [0.35, 0.05], armR: [0.35, -0.05], face: "angry", lean: 0.1 }; if (f >= sit) R.seat = true;
      cam = { pos: [x0 - 1.7, 2.1, -0.6], look: [x0 + 0.5, 1.35, -1.8], fov: 54 }; break; }
    case 17: { const down = S(17) + 30; tp = { pos: [x0 + 1.0, 0.03, -1.0], yaw: -0.4, legL: -1.45, kneeL: 1.45, legR: -1.45, kneeR: 1.45, armL: [0.35, 0.05], armR: [0.35, -0.05], face: "shock" }; handTyping = false; R.stampAt = [x0 + 1.0, X.lerp(5.0, 2.7, X.easeIn(sp(S(17) + 6, down))), -1.0];
      if (f >= down) { flat = true; grade = { uSat: 0.35 }; OV.push(stamp("DELAYED BY: TOAST", X.lerp(1.6, 1, X.easeOut(sp(down, down + 6))), 1, 960, 300), banner("TOASTED!", X.lerp(1.6, 1, X.easeOut(sp(down + 10, down + 16))), f >= down + 10 ? 1 : 0, "#ffe14a", 640)); shk = [down, 0.06, 8]; }
      cam = { pos: [x0 + 2.6, 2.4, 3.2], look: [x0 + 0.8, 1.2, -1.0], fov: 50 }; break; }
    case 18: { flat = true; const flick = S(18) + 16; const k = X.easeIn(sp(flick, flick + 20)); tp = { pos: [X.lerp(x0 + 1.0, x0 + 3, k), 0.03 + 5 * k, X.lerp(-1.0, 0.5, k)], yaw: -0.4, face: "dizzy", roll: k * 6 }; handTyping = false; R.flick = f < flick + 4 ? sp(S(18), flick) : 1; cam = { pos: [x0 + 1.4, 2.0, 4.8], look: [x0 + 2.0, 2.4, -0.6], fov: 54 }; break; }
    case 19: cam = wide; break;
  }
  // ---- pose ----
  if (tpose && tp) tp = { ...tp, ...TPOSE };
  if (n === 11 || n === 12 || n === 13 || n === 14 || n === 19) T.pose({ visible: false }); else T.pose(tp);
  if (flat) T.root.scale.set(1.15, 0.08, 1.15);
  // Admin's hand at the keyboard: one finger typing (scaled down to desk size)
  const hx = x0 - 1.3, hz = -2.2;
  if (handTyping) { H.pose({ pos: [hx, 2.35, hz], tap: typeK }); H.fingers.forEach((fg, i) => fg.rotation.set(i === 1 ? -0.5 * typeK : 1.6, 0, 0)); H.g.scale.setScalar(0.42); }
  else if (R.point) { H.pose({ pos: [hx, 2.5, hz] }); H.g.rotation.set(-0.9, 0.7, 0); H.fingers.forEach((fg, i) => fg.rotation.set(i === 1 ? 0 : 1.6, 0, 0)); H.g.scale.setScalar(0.42); }
  else if (R.stampAt) { H.pose({ pos: [R.stampAt[0], R.stampAt[1] + 1.1, R.stampAt[2]] }); H.g.scale.setScalar(0.42); R.stampG.position.set(R.stampAt[0], R.stampAt[1] - 0.05, R.stampAt[2]); }
  else if (R.flick != null) { H.pose({ pos: [x0 + 1.5, 1.4, -1.0] }); H.g.rotation.set(0, 0, 1.2 - 1.4 * R.flick); H.g.scale.setScalar(0.42); H.fingers.forEach((fg, i) => fg.rotation.set(i === 1 ? -0.6 * R.flick : 1.6, 0, 0)); }
  else H.pose({ visible: false });
  R.point = false; R.stampAt = null; R.flick = null; R.seat = false;
  H2.pose({ visible: false });
  // ---- overlays ----
  if (tagOn && tp && n !== 15) OV.push((g, w, h) => { const v = P2(E, wpos(T.head, [0, 1.3, 0])); if (v[2] < 1) tag(tagTxt, v[0], v[1], { bg: tagTxt === "PLAYER 1" ? undefined : "rgba(110,110,120,0.92)" })(g, w, h); });
  if (n !== 19 && n !== 14) OV.push(chip("13 YEARS"));
  if (n === 19) OV.push(loading((f - S(19)) / FPS, "Do not ask.", "RETURNING…"), chip("13 YEARS"));
  const cur = C.seg(); if (cur && n !== 19) OV.push(subtitle(cur.sp === "pixi" && n === 14 ? "(memory) " + cur.text : cur.text));
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof, grade, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
