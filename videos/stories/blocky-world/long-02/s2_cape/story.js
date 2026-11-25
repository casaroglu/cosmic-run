// Long 2 · Scene 2 — Cape City (46 shots). Built from scripts/LONG-02_shot-script.md
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { lordMitten, hero, controller, confetti, donut } from "./common/props.js";
import { capeCity } from "./common/worlds.js";
import { textO, subtitle, battery, loading2, comicBox, bossBar, guestTag, bubble, INK, F } from "./common/ui.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, SH = [], SEG = [];
const FPS = 30, X0 = 600, L = [X0, 0, 0.8], PX = X0 + 4.5, MX = X0 + 7;
const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
export async function build(E) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); SH = tl.shots; } catch (e) {}
  try { SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  R.w = capeCity(E, X0, 0);
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E);
  R.M = lordMitten(E); R.B = hero(E, "brunch"); R.G = hero(E, "gran"); R.Z = hero(E, "zip"); R.S = hero(E, "sulk");
  R.ctl = controller(E, null, [0, -50, 0], 0.5);
  // pedestal + velvet box + donut magnet
  E.box(1.2, 1.1, 1.2, E.mat("#6a6478"), [PX, 0, -0.4]); R.box = E.group(null, [PX, 1.1, -0.4]); E.box(0.5, 0.25, 0.4, E.mat("#7a1a3a"), [0, 0, 0], { parent: R.box }); R.lidB = E.group(R.box, [0, 0.25, -0.2]); E.box(0.5, 0.06, 0.4, E.mat("#9a2a4a"), [0, 0, 0.2], { parent: R.lidB });
  R.mag = donut(E, null, [PX, 1.42, -0.4], 1.0, "#ff7fb8", [Math.PI / 2 - 0.4, 0, 0]);
  // scorch decal on Toast's hoodie
  const sc = card(256, 128, (g, w, h) => { g.fillStyle = "rgba(40,20,10,0.85)"; g.beginPath(); g.ellipse(w / 2, h / 2, 120, 56, 0, 0, 7); g.fill(); g.font = "900 40px sans-serif"; g.textAlign = "center"; g.fillStyle = "#ffd27a"; g.fillText("XOXO", w / 2, 58); g.fillText("GRAN", w / 2, 100); });
  R.scorch = E.plane(0.42, 0.21, new THREE.MeshBasicMaterial({ map: sc, transparent: true }), [-0.12, 0.3, 0.236], { parent: R.T.torso, noink: true, noShadow: true }); R.scorch.visible = false;
  // cape that lands on Toast, frying pan, duck
  R.cape = E.group(null, [0, -50, 0]); E.box(1.2, 0.05, 1.4, E.mat("#ffffff"), [0, 0, 0], { parent: R.cape });
  R.pan = E.group(null, [0, -50, 0]); E.cyl(0.32, 0.32, 0.06, E.mat("#3a4250"), [0, 0, 0], { parent: R.pan, seg: 16 }); E.box(0.08, 0.04, 0.5, E.mat("#3a4250"), [0, 0.03, 0.5], { parent: R.pan });
  R.duck = E.group(null, [0, -50, 0]); E.box(0.22, 0.16, 0.3, E.mat("#ffe14a"), [0, 0, 0], { parent: R.duck }); E.box(0.16, 0.16, 0.16, E.mat("#ffe14a"), [0, 0.16, 0.08], { parent: R.duck }); E.box(0.1, 0.04, 0.08, E.mat("#ff8a1f"), [0, 0.2, 0.2], { parent: R.duck });
  // confetti puffs per character + tumbleweed + hood stream
  R.cf = { zip: confetti(E, 50, 1, ["#ffe14a", "#fff27a"]), gran: confetti(E, 50, 2, ["#9b4dff", "#c79bff"]), sulk: confetti(E, 70, 3, ["#8a8f99", "#5a5f6a"]), brunch: confetti(E, 60, 4, ["#2f5fb0", "#ffffff", "#b8262e"]), mitten: confetti(E, 90, 5, ["#d9a826", "#3fb8a8", "#d8344a"]), weed: confetti(E, 40, 6), hood: confetti(E, 30, 7) };
  // halftone burst plane for LOOP_POSE
  const ht = card(1024, 1024, (g, w, h) => { const gr = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); gr.addColorStop(0, "#ffffff"); gr.addColorStop(0.5, "#fff27a"); gr.addColorStop(1, "#ffb84d"); g.fillStyle = gr; g.fillRect(0, 0, w, h); g.fillStyle = "rgba(255,140,40,0.55)"; for (let y = 0; y < h; y += 22) for (let x = 0; x < w; x += 22) { const d = Math.hypot(x - w / 2, y - h / 2) / (w / 2); g.beginPath(); g.arc(x + (y % 44 ? 11 : 0), y, 2 + 8 * d, 0, 7); g.fill(); } });
  R.burst = E.plane(60, 60, new THREE.MeshBasicMaterial({ map: ht, fog: false }), [0, -200, 0], { noink: true, noShadow: true });
}
// ---- 2D helpers ----
const introCard = (title, word, col, a) => (g, w, h) => { const k = h / 1080; g.save(); g.globalAlpha = a; g.fillStyle = col; g.globalAlpha = 0.35 * a; g.fillRect(0, 0, w, h); g.globalAlpha = a; g.fillStyle = "rgba(0,0,0,0.25)"; for (let y = 0; y < h; y += 18) for (let x = 0; x < w; x += 18) { g.beginPath(); g.arc(x, y, 2.5, 0, 7); g.fill(); }
  g.lineWidth = 24 * k; g.strokeStyle = INK; g.strokeRect(12 * k, 12 * k, w - 24 * k, h - 24 * k); g.restore(); comicBox(title, 80, 900, a)(g, w, h); if (word) textO(word, 1500, 260, 140, { col: "#ffffff", rot: -0.15 })(g, w, h); };
const powerCard = (txt, x, y, a, s = 1) => (g, w, h) => { if (a <= 0) return; const k = h / 1080; g.save(); g.globalAlpha = a; g.translate(x * k, y * k); g.scale(s, s); g.font = F(36, k, 900); const tw = g.measureText(txt).width + 40 * k; g.fillStyle = "#fffbe6"; g.strokeStyle = INK; g.lineWidth = 6 * k; g.fillRect(-tw / 2, -32 * k, tw, 64 * k); g.strokeRect(-tw / 2, -32 * k, tw, 64 * k); g.fillStyle = INK; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(txt, 0, 2 * k); g.restore(); };
export function frame(f, E) {
  const X = E.X, t = f / FPS, OV = [], FX = [], { T, P, D, M, B, G, Z } = R, Su = R.S;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const fs = f - S(n), sp = (a, b) => X.span(f, a, b), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const say = (who, base) => (amp(who) > 0.55 ? ({ happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", sad: "talk", angry: "angry" }[base] || "talk") : base);
  const walk = (ph, a = 0.7) => { const s = Math.sin(ph); return { legL: a * s, legR: -a * s, armL: [-0.8 * s, 0.25], armR: [0.8 * s, 0.25] }; };
  // ---- who is gone (confetti) ----
  const goneZip = n > 33 || (n === 33 && fs > 10), goneGran = n > 34 || (n === 34 && fs > 8), goneSulk = n > 35 || (n === 35 && fs > 8), goneBrunch = n > 36 || (n === 36 && f > E.at("here", 0)), goneM = n > 37 || (n === 37 && fs > 40);
  const landed = n >= 2;
  // ---- defaults ----
  let cam, light = ["dramatic", "day", 0.45], shk = null, flash = 0, grade = null, hp = n >= 37 ? Math.max(0, 0.75 * (1 - sp(S(37) + 10, S(37) + 50))) : 0.75, mags = n >= 22 && !(n === 22 && fs < 20) ? 5 : 6;
  let tp = landed ? { pos: [X0 - 0.6, 0, 0.8], yaw: 0, face: say("toast", "happy") } : null, pp = landed ? { pos: [X0 + 0.6, 0, 0.8], yaw: 0.3, face: say("pixi", "deadpan"), head: [0, 0.6, 0] } : null, dpos = landed ? { pos: [X0, 0, 0.4], yaw: 0.2 } : null;
  let bp = goneBrunch ? null : { pos: [X0 - 5, 0, -1.5], yaw: 0.6, armR: [-1.6, 0.2], face: "angry" }, gp = goneGran ? null : { pos: [X0 - 6, 0, -1.2], yaw: 0.6, face: "smug", armL: [-1.2, 0.3], elbowL: 0.8, armR: [-1.2, -0.3], elbowR: 0.8 };
  let sup = goneSulk ? null : { pos: [X0 - 7.5, 0, -1.8], yaw: Math.PI - 0.2, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, face: "angry" };
  let zp = goneZip ? null : { pos: [X0 - 30, 0, -3], yaw: Math.PI / 2 };
  let mp = goneM ? null : { pos: [MX, 0, 0], yaw: -0.9, armR: [-0.3, 0.3], elbowR: 0.6, face: "smug" };
  let mittUp = 0, burst = false, capeOn = n >= 38 && n < 45 ? (n === 38 ? sp(S(38) + 20, S(38) + 80) : 1) : 0, panOn = n >= 36, duckOn = n >= 26;
  R.lidB.rotation.x = n >= 19 ? -1.6 * sp(S(19) + 6, S(19) + 20) : 0; R.mag.visible = n < 22 || (n === 22 && fs < 14);
  // ---- shots ----
  switch (n) {
    case 1: cam = { pos: [X0, 3.4, 15], look: [X0, 2.8, 0], fov: 50 }; tp = pp = dpos = null; bp = { ...bp, armR: [-2.8, 0.2] }; OV.push(comicBox("Meanwhile, at the end of the world…", 60, 120)); break;
    case 2: { const k = X.easeIn(sp(S(2) + 4, S(2) + 18)); const y = 7 * (1 - k); tp = { pos: [X0 - 0.6, Math.max(0, y) * (f < S(2) + 18 ? 1 : 0) + (f >= S(2) + 18 ? 0.2 : 0), 0.8], pitch: f >= S(2) + 18 ? 1.45 : 0, yaw: 0, face: "dizzy" }; dpos = { pos: [X0 - 0.4, Math.max(0, 7 * (1 - X.easeIn(sp(S(2) + 8, S(2) + 22)))) + (f >= S(2) + 22 ? 0.4 : 0), 0.6], yaw: 0.2, squash: f >= S(2) + 22 ? 0.25 : 0 }; pp = { pos: [X0 + 0.6 + 0.3 * sp(S(2) + 20, S(2) + 30), Math.max(0, 7 * (1 - X.easeIn(sp(S(2) + 2, S(2) + 16)))), 0.8], yaw: 0.3, face: "deadpan" };
      cam = { pos: [X0, 3.4, 15], look: [X0, 2.8, 0], fov: 50 }; if (f > S(2) + 18 && f < S(2) + 34) OV.push(textO("PLOP", 960, 400, 130, { col: "#ffffff", s: pop(S(2) + 18, 6) })); break; }
    case 3: cam = { pos: [X0 - 4, 2.2, 5], look: [X0 - 6, 1.8, -1.5], fov: 46 }; bp = { ...bp, yaw: 1.2, armR: [-2.8, 0.2] }; gp = { ...gp, yaw: 1.2 }; break;
    case 4: cam = { pos: [MX - 2.5, 0.8, 3.5], look: [MX, 6.5, 0], fov: 56 }; mp = { ...mp, yaw: -1.4, armR: [-1.0, 0.3], elbowR: 0.6, head: [0.5, -0.3, 0], face: f > S(4) + 20 && f < S(4) + 24 ? "blink" : "deadpan" }; break;
    case 5: { tp = { ...tp, pitch: fs < 14 ? 1.45 : 0, pos: [X0 - 0.6, fs < 14 ? 0.2 : 0, 0.8], face: "dizzy" }; dpos = { pos: [X0 - 0.4 + sp(S(5), S(5) + 14) * 0.4, 0, 0.4], yaw: 0.2 }; cam = { pos: [X0, 2.0, 6.0], look: [X0, 1.5, 0.4], fov: 48 }; break; }
    case 6: tp = { ...tp, pos: [X0 - 0.6, 0.1 * Math.abs(Math.sin(f * 0.4)), 0.8], yaw: f < S(6) + 20 ? 0.8 : f < S(6) + 40 ? -0.8 : 0, armL: [0, 0.6], armR: [0, 0.6], face: say("toast", "grin") }; cam = { pos: [X0, 2.0, 5.6], look: [X0, 1.5, 0.4], fov: 48 }; break;
    case 7: { const k = sp(S(7), S(7) + 70); bp = { pos: [X.lerp(X0 - 5, X0 - 1.8, k), 0, X.lerp(-1.5, 0.6, k)], yaw: Math.PI / 2 - 0.3, ...walk(f * 0.35, k < 1 ? 0.7 : 0), armR: k >= 1 ? [-1.6, 0.2] : [0, 0.2], face: say("brunch", "angry") }; cam = { pos: [X0 - 1, 2.0, 6.4], look: [X0 - 1.2, 1.6, 0], fov: 48 }; const st = [S(7) + 18, S(7) + 40, S(7) + 62].filter((a) => f >= a && f < a + 10); if (st.length) OV.push(textO("STOMP", 700, 760, 70, { col: "#ffffff", s: pop(st[0], 5) })); break; }
    case 8: { const droop = Math.min(1, (f - S(8)) / ((Eo(8) - S(8)) * 0.8)); bp = { pos: [X0 - 1.8, 0, 0.6], yaw: Math.PI / 2 - 0.3, armR: [-1.6 * (1 - droop), 0.2], face: say("brunch", "angry") }; tp = { ...tp, yaw: -0.7, armR: [-2.0, 0.3], elbowR: 0.8, face: say("toast", "happy") }; cam = { pos: [X0 - 1.2, 1.9, 5.0], look: [X0 - 1.2, 1.6, 0.6], fov: 46 }; break; }
    case 9: case 10: case 11: case 12: { tp = pp = dpos = null; const who = n === 9 ? B : n === 10 ? G : n === 11 ? Z : Su; const c = n === 9 ? ["CAPTAIN BRUNCH — hits things with a pan", "POW", "#ffe14a"] : n === 10 ? ["THUNDER GRAN — knits lightning", "ZZT", "#9b4dff"] : n === 11 ? ["ZIP — already left", null, "#ffe14a"] : ["THE SULK — not helping", null, "#8a8f99"];
      const cx = n === 9 ? X0 - 5 : n === 10 ? X0 - 6 : n === 11 ? X0 - 6.8 : X0 - 7.5, cz = n === 12 ? -1.8 : -1.4;
      if (n === 9) bp = { pos: [cx, 0, cz], yaw: 0.3, armL: [-2.8, 0.2], face: "angry" }; if (n === 10) gp = { ...gp, yaw: 0.3, armL: [-2.0, 0.6], elbowL: 0.4, armR: [-2.0, -0.6], elbowR: 0.4 }; if (n === 11) zp = { pos: [X.lerp(cx - 5, cx + 5, (fs % 22) / 22) * 1, 0, cz], yaw: fs < 22 ? Math.PI / 2 : -Math.PI / 2 };
      const hh = n === 12 ? 4.4 : n === 10 ? 1.7 : 2.2; cam = { pos: [cx + 0.6, hh * 0.6, cz + hh * 1.8], look: [cx, hh * 0.55, cz], fov: 46 }; OV.push(introCard(c[0], c[1], c[2], 1)); if (n === 11) { OV.push(textO("Hi— bye.", 960, 540, 1, { a: 0 })); } break; }
    case 13: bp = { pos: [X0 - 1.8, 0, 0.6], yaw: Math.PI / 2 - 0.3, armL: [-0.2, 0.9], elbowL: -1.5, armR: [-0.2, 0.9], elbowR: -1.5, face: say("brunch", "smug") }; tp = { pos: [X0 - 1.1, 0, 0.8], yaw: -0.9, armR: [-1.4, 0.3], elbowR: 0.4, face: say("toast", "happy") }; cam = { pos: [X0 - 1.2, 1.9, 5.0], look: [X0 - 1.3, 1.6, 0.6], fov: 46 }; break;
    case 14: { tp = { pos: [X0 - 1.1, 0, 0.8], yaw: 0, face: f > S(14) + 27 ? "sad" : "happy" }; bp = { pos: [X0 - 2.6, 0, 0.6], yaw: Math.PI / 2 - 0.3, face: "smug", armL: [-0.2, 0.9], elbowL: -1.5 }; cam = { pos: [X0, 2.0, 6.2], look: [X0, 1.5, 0.6], fov: 48 };
      const who = [[X0 - 1.1, 0, "TOAST — POWER: NONE (GUEST)"], [X0 + 0.6, 27, "PIXI — POWER: NONE (GUEST)"], [X0, 54, "DONUTSAURUS — POWER: HUNGRY"]];
      who.forEach(([x, a, txt], i) => { const f0 = S(14) + a; if (f >= f0 && f < f0 + 27) OV.push((g, w, h) => { const v = new THREE.Vector3(x, 2.6 - 2.6 * (f - f0) / 27, 0.8).project(E.camera); const yy = ((1 - v.y) / 2) * h, xx = ((v.x + 1) / 2) * w; g.save(); g.strokeStyle = "#39ff6a"; g.lineWidth = 8; g.beginPath(); g.moveTo(xx - 120, yy); g.lineTo(xx + 120, yy); g.stroke(); g.restore(); }); if (f >= f0 + 27) OV.push(powerCard(txt, [520, 960, 1400][i], [300, 230, 300][i], 1, 0.9 + 0.1 * pop(f0 + 27, 6))); }); break; }
    case 15: { tp = { pos: [X0 - 1.1, 0, 0.8], yaw: 0.2, armR: [-0.8 + 0.5 * Math.sin(f * 0.5), 0.2], elbowR: 0.6, armL: [-0.8 + 0.5 * Math.sin(f * 0.5), -0.2], elbowL: 0.6, face: say("toast", "angry") }; cam = { pos: [X0 - 0.6, 1.9, 5.2], look: [X0 - 0.8, 1.6, 0.6], fov: 46 }; const fl = f > S(15) + 50; OV.push(powerCard(fl ? "TOAST — POWER: MOP (WEAK)" : "TOAST — POWER: NONE (GUEST)", 1200, 300, 1, fl ? 0.9 + 0.1 * pop(S(15) + 50, 6) : 1)); break; }
    case 16: { const k = X.smooth(sp(S(16), Eo(16))); mittUp = sp(S(16) + 10, S(16) + 50); const a = -Math.PI / 2 + k * 1.2; cam = { pos: [MX + Math.cos(a) * 9, 1.0, Math.sin(-a) * 9 + 2], look: [MX, 6, 0], fov: 54 }; mp = { ...mp, yaw: -0.4, face: say("mitten", "smug") }; light = ["dramatic", "night", 0.2]; break; }
    case 17: { mittUp = 1; tp = { pos: [X0 - 4.6, 0, -0.2], yaw: -0.9, armR: [-1.4, 0.3], elbowR: 0.5, face: say("toast", "happy") }; gp = { ...gp, pos: [X0 - 5.6, 0, -0.6], yaw: 0.9 }; pp = { ...pp, pos: [X0 - 2.6, 0, 0.2], yaw: 1.0 }; cam = { pos: [X0 - 4.0, 1.6, 2.6], look: [X0 - 5.0, 1.4, -0.4], fov: 44 }; break; }
    case 18: { tp = { pos: [X0 - 4.6, 0, -0.2], yaw: -0.9, face: fs > 30 && fs < 34 ? "shock" : say("toast", "grin") }; gp = { ...gp, pos: [X0 - 5.6, 0, -0.6], yaw: 0.9, armR: [-1.2, 0.2], elbowR: 0.8, face: say("gran", "smug") }; pp = { ...pp, pos: [X0 - 2.6, 0, 0.2], yaw: 1.0 }; flash = fs > 30 && fs < 34 ? 0.8 : 0; cam = { pos: [X0 - 4.6, 1.6, 2.8], look: [X0 - 5.0, 1.4, -0.4], fov: 44 };
      if (fs > 30 && fs < 50) { OV.push(textO("ZZT", 900, 380, 110, { col: "#c79bff", s: pop(S(18) + 30, 5) })); FX.push({ kind: "puff", pos: [X0 - 4.6, 2.6, 0.2], size: 0.7, t: (fs - 30) / 20 }); } break; }
    case 19: tp = pp = dpos = null; cam = { pos: [PX, 1.9, 1.4], look: [PX, 1.3, -0.4], fov: 40 }; FX.push({ kind: "sparkle", pos: [PX + 0.2, 1.7, -0.2], size: 0.4, t: f / 30 }); break;
    case 20: { const z = X.back(sp(S(20), S(20) + 6)); cam = { pos: [X0, X.lerp(2.0, 2.4, z), X.lerp(6, 3.2, z)], look: [X0, 2.2, 0.4], fov: 46 }; dpos = { pos: [X0, 0, 0.4], yaw: 0.4, jaw: 0.4 }; FX.push({ kind: "hearts", pos: [X0 + 0.1, 3.0, 1.0], size: 0.9, t: f / 30 }, { kind: "sweat", pos: [X0 + 0.3, 2.2, 1.0], size: 0.4, t: f / 30 }); break; }
    case 21: { const k = sp(S(21) + 10, Eo(21) - 20); dpos = { pos: [X.lerp(X0, PX - 1.2, k), 0, X.lerp(0.4, -0.2, k)], yaw: Math.PI / 2 - 0.2, legL: 0.6 * Math.sin(f * 0.8), legR: -0.6 * Math.sin(f * 0.8), tailY: 0.5 * Math.sin(f * 0.9) }; tp = { ...tp, yaw: 0.6, armR: f > Eo(21) - 30 ? [-1.6, 0.3] : [0, 0.2], face: "shock" }; pp = { ...pp, face: say("pixi", "deadpan") };
      bp = { ...bp, yaw: 1.2 + k * 0.5 }; gp = { ...gp, yaw: 1.2 + k * 0.5 }; mp = { ...mp, head: [0.4, -0.4 + k * 0.4, 0] }; cam = { pos: [X0 + 1.5, 3.6, 14], look: [X0 + 1.5, 2.4, -0.5], fov: 50 }; break; }
    case 22: dpos = { pos: [PX - 1.0, 0, -0.2], yaw: Math.PI / 2 - 0.2, jaw: fs < 14 ? 1 : 0.2, head: [fs < 14 ? 0.4 : 0, 0, 0], tailY: 0.5 * Math.sin(f * 0.9) }; tp = pp = null; cam = { pos: [PX - 0.2, 2.4, 2.8], look: [PX - 0.5, 1.5, -0.4], fov: 44 }; break;
    case 23: { dpos = { pos: [PX - 1.0, 0, -0.2], yaw: 0.6, tailY: 0.4 * Math.sin(f * 0.7) }; const look = fs < 36 ? 0 : fs < 72 ? 1 : 2; mp = { ...mp, head: look === 0 ? [0.6, 0.5, 0] : look === 1 ? [0.5, 0.2, 0] : [0.2, 0.9, 0], face: "deadpan" }; const shr = fs > 78 && fs < 100;
      bp = { ...bp, armL: shr ? [0, 1.2] : [0, 0.2], armR: shr ? [0, 1.2] : [-1.6, 0.2] }; gp = { ...gp, armL: shr ? [0, 1.2] : gp.armL }; cam = { pos: [X0 + 1.5, 3.6, 14], look: [X0 + 1.5, 2.4, -0.5], fov: 50 }; break; }
    case 24: { cam = { pos: [MX - 1.6, 7.2, 5.0], look: [MX, 7.0, 0], fov: 38 }; mp = { ...mp, yaw: -0.3, face: say("mitten", "sad") }; tp = pp = dpos = null; FX.push({ kind: "sweat", pos: [MX + 0.3, 7.6, 1.2], size: 0.5, t: f / 30 }); break; }
    case 25: case 26: case 27: { tp = { pos: [PX - 1.8, 0, 0.2], yaw: 0.5, armR: [-2.2, 0.2], elbowR: 0.2, face: say("toast", n === 27 ? "sad" : "grin") }; dpos = { pos: [PX - 1.4, 2.6 + (n === 26 ? 0.3 * Math.sin(f * 1.2) : 0), 0.3], yaw: 0, pitch: Math.PI, scale: 0.8 }; if (n === 25 && fs > 40 && fs < 44) R._pink = 1; else R._pink = 0;
      if (n === 26 && fs > 30) duckOn = true; if (n === 27) { dpos = { pos: [PX - 0.6, 0, 0.2], yaw: 0.4, scale: 1 }; tp = { pos: [PX - 1.8, 0, 0.6], yaw: 0.9, armR: [-1.6, 0.2], elbowR: 0.2, face: say("toast", "sad") }; }
      cam = { pos: [PX - 1.2, 2.2, 5.2], look: [PX - 1.0, 1.7, 0], fov: 46 }; if (n === 26 && fs > 30) OV.push(textO("← NOT A MAGNET", 1250, 760, 54, { col: "#ffffff" })); break; }
    case 28: mittUp = 1; mp = { ...mp, face: say("mitten", "sad") }; cam = { pos: [MX - 4, 0.8, 5], look: [MX, 7, 0], fov: 58 }; tp = pp = dpos = null; break;
    case 29: { const k = sp(S(29), S(29) + 40); bp = { pos: [X.lerp(X0 - 3, X0 + 1, k), 0, 0.6], yaw: Math.PI / 2, ...walk(f * 0.6, k < 1 ? 0.9 : 0), armR: [-1.6, 0.0], lean: 0.2, face: say("brunch", "shock") }; mittUp = 1; cam = { pos: [X0 + 0.5, 2.2, 6.4], look: [X0 + 1.5, 1.8, 0], fov: 50 }; break; }
    case 30: burst = true; break;
    case 31: burst = true; break;
    case 32: flash = Math.max(0, 1 - fs / 8); cam = { pos: [X0, 3.4, 15], look: [X0, 2.8, 0], fov: 50 }; mittUp = 1; break;
    case 33: zp = fs < 10 ? { pos: [X0 - 4 + fs * 0.4, 0, -0.5], yaw: Math.PI / 2 } : null; cam = { pos: [X0 - 3, 2.0, 6], look: [X0 - 3, 1.4, -0.5], fov: 48 }; R.cf.zip.at(fs >= 10 ? (fs - 10) / 30 : -1, [X0 - 0.4, 1.2, -0.5], 0.8); break;
    case 34: cam = { pos: [X0 - 6, 1.8, 3.6], look: [X0 - 6, 1.2, -1.2], fov: 46 }; R.cf.gran.at(fs >= 8 ? (fs - 8) / 30 : -1, [X0 - 6, 1.0, -1.2], 0.6); break;
    case 35: cam = { pos: [X0 - 7.5, 3.0, 6], look: [X0 - 7.5, 2.2, -1.8], fov: 48 }; R.cf.sulk.at(fs >= 8 ? (fs - 8) / 30 : -1, [X0 - 7.5, 2.4, -1.8], 0.5); break;
    case 36: { bp = goneBrunch ? null : { pos: [X0 + 1, 0, 0.6], yaw: 0.3, armR: [-1.6, 0], face: say("brunch", "sad") }; cam = { pos: [X0 + 1.2, 2.0, 5.6], look: [X0 + 1, 1.4, 0.6], fov: 46 }; const a0 = E.at("here", 0); R.cf.brunch.at(f >= a0 ? (f - a0) / 30 : -1, [X0 + 1, 1.0, 0.6], 0.6); panOn = true; R.pan.position.set(X0 + 1.4, 0.05, 1.0); R.pan.rotation.set(0, f * 0.6, 0.3 * Math.max(0, 1 - (f - a0) / 40)); break; }
    case 37: { mittUp = 1; cam = { pos: [MX - 4, 0.8, 5], look: [MX, 6, 0], fov: 58 }; mp = goneM ? null : { ...mp, head: [0.6, 0.6, 0], face: say("mitten", "deadpan") }; R.cf.mitten.at(fs >= 30 ? (fs - 30) / 30 : -1, [MX, 5, 0], 1.6); tp = pp = dpos = null; break; }
    case 38: case 39: case 40: case 41: case 42: { const cz = n === 38 ? { pos: [X0, 3.4, 15], look: [X0, 2.6, 0], fov: 50 } : { pos: [X0, 2.0, 5.6], look: [X0, 1.5, 0.6], fov: 48 }; cam = cz; light = ["dramatic", "day", 0.2]; panOn = true; R.pan.position.set(X0 + 1.4, 0.05, 1.0);
      if (n === 38) { R.cf.weed.at(((fs % 90) / 90) * 2.5, [X0 - 8 + fs * 0.12, 0.4, 2], 0.25); }
      if (n === 39) { capeOn = 1 - sp(S(39), S(39) + 15); tp = { ...tp, armL: [-2.4, 0.5], elbowL: 1.4, armR: [-2.4, -0.5], elbowR: 1.4, face: say("toast", "happy") }; if (fs > 30) OV.push(textO("hello…", 1300 + fs * 4, 300, 60, { col: "#ffffff", a: Math.max(0, 1 - (fs - 30) / 40) }), textO("hello…", 1500 + fs * 6, 220, 44, { col: "#ffffff", a: Math.max(0, 1 - (fs - 50) / 40) })); }
      if (n === 40) { tp = { ...tp, face: say("toast", "sad") }; }
      if (n === 41) { tp = { ...tp, armR: fs > 30 ? [-0.3, 0.2] : [-2.6, 0.2], elbowR: fs > 30 ? 0 : 1.2, face: fs > 30 ? "sad" : "grin" }; pp = { ...pp, armL: fs > 26 && fs < 40 ? [-1.8, 0.8] : [0, 0.2] }; OV.push((g, w, h) => { const k = h / 1080, y = (60 + 120 * pop(S(41), 10)) * k; g.save(); g.fillStyle = "#ffd23a"; g.strokeStyle = INK; g.lineWidth = 8 * k; g.beginPath(); g.roundRect(w / 2 - 520 * k, y, 1040 * k, 110 * k, 30 * k); g.fill(); g.stroke(); g.restore(); textO("🏆 ACHIEVEMENT UNLOCKED: SURVIVED BY ACCIDENT", 960, y / k + 56, 40, { col: INK, stroke: "#ffd23a" })(g, w, h); }); }
      if (n === 42) { tp = { ...tp, face: say("toast", "sad") }; R.cf.hood.at(fs < 30 ? fs / 30 : -1, [X0 - 3.5 + (fs / 30) * 2.9, 2.2, 0.8], 0.15); R._pink = fs > 50 && fs < 54 ? 1 : 0; }
      break; }
    case 43: tp = { ...tp, armR: [-1.4, 0.2], elbowR: 0.4, face: "sad" }; pp = { pos: [X0 - 0.1, 0, 0.9], yaw: -0.9, armL: [-1.4, 0.2], elbowL: 0.6, face: say("pixi", "deadpan") }; cam = { pos: [X0 - 0.2, 1.9, 4.4], look: [X0 - 0.4, 1.4, 0.6], fov: 44 }; break;
    case 44: break;
    case 45: { const k = X.easeIn(sp(S(45) + 18, Eo(45))); tp = { ...tp, pos: [X0 - 0.6, k * 8, 0.8] }; pp = { ...pp, pos: [X0 + 0.6, k * 8, 0.8] }; dpos = { pos: [X0, k * 8, 0.4], yaw: 0.2 }; capeOn = 0; cam = { pos: [X0, 3.4, 15], look: [X0, 2.8, 0], fov: 50 }; R.cape.position.set(X0 - 0.8, 0.03, 1.2); panOn = true; R.pan.position.set(X0 + 1.4, 0.05, 1.0); break; }
  }
  // ---- LOOP_POSE (30, 31) ----
  if (n === 30 || n === 31) { tp = { pos: [MX - 4.2, 0, 1.6], yaw: n === 30 ? -1.2 + 0.9 * X.smooth(sp(S(30) + 10, Eo(30))) : -1.2, head: [-0.3, 0, 0], face: n === 30 ? say("toast", "shock") : "shock" }; pp = dpos = null; bp = gp = sup = zp = null; mittUp = 1;
    M.root.updateMatrixWorld(true); const mv = new THREE.Vector3(); M.mitt.getWorldPosition(mv);
    cam = n === 30 ? { pos: [MX - 5.6, 1.6, 3.0], look: [mv.x, mv.y - 0.6, mv.z], fov: 50 } : { pos: [mv.x - 0.8, mv.y - 0.5, mv.z + 1.6], look: [mv.x, mv.y - 0.9, mv.z], fov: 40 };
    R.burst.position.set(mv.x + 6, mv.y, mv.z - 12); R.burst.lookAt(new THREE.Vector3(...cam.pos)); if (n === 31 && fs > 10 && fs < 20) OV.push(textO("SNAP", 1300, 380, 160, { col: "#ffffff", s: pop(S(31) + 10, 5) })); }
  else R.burst.position.y = -200;
  // ---- poses ----
  const put = (A, p) => (p ? A.pose(p) : A.pose({ visible: false }));
  put(T, tp); put(P, pp); put(B, bp); put(G, gp); put(Su, sup); put(Z, zp);
  if (G.root.visible) G.root.scale.setScalar(0.78); if (Su.root.visible) Su.root.scale.setScalar(2.0);
  if (mp) { M.pose({ ...mp, armR: mittUp > 0 ? [-2.8 * mittUp - (mp.armR ? 0 : 0), 0.3] : mp.armR, elbowR: mittUp > 0 ? 0.2 : mp.elbowR }); M.root.scale.setScalar(3); M.magnets.forEach((pair, i) => pair.forEach((m) => (m.visible = n < 16 || mittUp > 0 ? true : true))); } else M.pose({ visible: false });
  if (dpos) D.pose({ ...dpos, scale: dpos.scale || 1 }); else D.pose({ visible: false });
  P.boardAt(pp ? [pp.pos[0] + 0.5, pp.pos[1], pp.pos[2] + 0.2] : [0, -50, 0], 0.3, 0, 0, !!pp);
  R.scorch.visible = n > 18 || (n === 18 && fs > 32);
  R.cape.position.y = capeOn > 0 && tp ? 0 : R.cape.position.y; if (capeOn > 0 && tp) { R.cape.position.set(tp.pos[0], X.lerp(5, 2.25, Math.min(1, capeOn)), tp.pos[2]); R.cape.rotation.set(0, 0, 0.2 * (1 - capeOn)); } else if (n !== 45) R.cape.position.y = -50;
  if (!panOn) R.pan.position.y = -50; R.duck.position.set(PX - 1.6, duckOn && n >= 26 && n <= 27 ? 0.1 : -50, 0.7);
  if (n < 33) R.cf.zip.at(-1); if (n < 34) R.cf.gran.at(-1); if (n < 35) R.cf.sulk.at(-1); if (n < 36) R.cf.brunch.at(-1); if (n < 37) R.cf.mitten.at(-1); if (n !== 38) R.cf.weed.at(-1); if (n !== 42) R.cf.hood.at(-1);
  if (n > 33 && n < 46) R.cf.zip.at(3, [X0 - 0.4, 1.2, -0.5], 0.8); if (n > 34) R.cf.gran.at(3, [X0 - 6, 1.0, -1.2], 0.6); if (n > 35) R.cf.sulk.at(3, [X0 - 7.5, 2.4, -1.8], 0.5); if (n > 36) R.cf.brunch.at(3, [X0 + 1, 1.0, 0.6], 0.6); if (n > 37) R.cf.mitten.at(3, [MX, 5, 0], 1.6);
  // ---- HUD ----
  const top = n >= 38 && fs > 40 || n > 38 ? "SERVER EMPTY — PLAYERS: 0 (+3 GUESTS)" : "FINAL BATTLE — LORD MITTEN";
  if (![9, 10, 11, 12, 30, 31, 46].includes(n)) { OV.push(bossBar(top, top.startsWith("SERVER") ? 0 : hp)); if (!top.startsWith("SERVER")) OV.push(textO(`MAGNETS ${mags}/6`, 1700, 150, 40, { col: "#ffffff" })); }
  if (n >= 5 && n !== 46 && ![9, 10, 11, 12, 19, 22, 24, 28, 30, 31, 37].includes(n)) OV.push((g, w, h) => { [T.root, P.root, D.root].forEach((r, i) => { if (!r.visible) return; const v = r.position.clone().add(new THREE.Vector3(0, i === 2 ? 3.4 : 2.5, 0)).project(E.camera); if (v.z < 1 && Math.abs(v.x) < 1) guestTag(((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h, 0.9)(g, w, h); }); });
  if (n !== 46) OV.push(battery(n >= 44 && fs > 10 || n > 44 ? 1 : 2));
  if (n === 44) { R.ctl.g.position.set(X0, 1.0, 3.0); R.ctl.g.rotation.set(0.75, 0, 0); R.ctl.set("CHANGE SERVER", fs > 10 ? 1 : 2); cam = { pos: [X0, 1.62, 3.42], look: [X0, 1.0, 3.0], fov: 38 }; T.pose({ visible: false }); P.pose({ visible: false }); D.pose({ visible: false }); } else R.ctl.g.position.y = -50;
  if (n === 46) OV.push(loading2((f - S(46)) / FPS, "Guests are not affected by local disasters.", 1));
  const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); if (cur && n !== 46) OV.push(subtitle(cur.text));
  if (!cam) cam = { pos: [X0, 2.2, 7], look: [X0, 1.4, 0], fov: 48 };
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, flash, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
