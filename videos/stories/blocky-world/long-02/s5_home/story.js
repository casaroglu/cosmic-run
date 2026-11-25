// Long 2 · Scene 5 — Home (27 shots). Built from scripts/LONG-02_shot-script.md
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { lordMitten, hero, controller, confetti, donut, adminHand } from "./common/props.js";
import { donutShop } from "./common/worlds.js";
import { textO, subtitle, battery, hudHome, guestTag, stamp, banner, INK, F } from "./common/ui.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, SH = [], SEG = [];
const FPS = 30, M0 = [-0.8, 0, 1.0], C = [1.0, 0, 1.5];
const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
export async function build(E) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); SH = tl.shots; meta.frames = Math.ceil(tl.total * 30); } catch (e) {}
  try { SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  R.shop = donutShop(E, 0); R.shop.mop.visible = false;
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E); R.M = lordMitten(E); R.B = hero(E, "brunch"); R.G = hero(E, "gran"); R.Z = hero(E, "zip"); R.S = hero(E, "sulk");
  R.A = adminHand(E); R.ctl = controller(E, null, [0, -50, 0], 0.55);
  R.mop = E.group(null, [M0[0] + 0.15, 0, M0[2] + 0.35]); E.cyl(0.04, 0.04, 1.7, E.mat("#c79a5b"), [0, 0.1, 0], { parent: R.mop, seg: 8 }); E.box(0.5, 0.12, 0.22, E.mat("#19a0e0"), [0, 0.04, 0], { parent: R.mop });
  R.icing = E.box(0.75, 0.05, 0.3, E.mat("#ff7fb8"), [0, 0.12, 0], { parent: R.ctl.g }); R.bun = E.box(0.4, 0.14, 0.18, E.mat("#e7b06a"), [0.1, 0.2, 0.05], { parent: R.ctl.g });
  R.tray = []; for (let i = 0; i < 6; i++) R.tray.push(donut(E, null, [1.0 + i * 0.25, 1.28, -1.75], 0.9, "#fff3d0", [-Math.PI / 2 + 0.3, 0, 0]));
  R.coins = []; for (let i = 0; i < 7; i++) R.coins.push(E.cyl(0.08, 0.08, 0.02, E.mat("#ffd23a"), [1.1 + i * 0.2, 1.21, -1.6], { seg: 12 }));
  R.mag = donut(E, null, [0, -50, 0], 1.0, "#ff7fb8", [0, 0, 0]);
  const sc = card(256, 128, (g, w, h) => { g.fillStyle = "rgba(40,20,10,0.85)"; g.beginPath(); g.ellipse(w / 2, h / 2, 120, 56, 0, 0, 7); g.fill(); g.font = "900 40px sans-serif"; g.textAlign = "center"; g.fillStyle = "#ffd27a"; g.fillText("XOXO", w / 2, 58); g.fillText("GRAN", w / 2, 100); });
  E.plane(0.42, 0.21, new THREE.MeshBasicMaterial({ map: sc, transparent: true }), [-0.12, 0.3, 0.236], { parent: R.T.torso, noink: true, noShadow: true });
  R.apron = E.box(0.7, 0.6, 0.04, E.mat("#ffffff"), [0, 0.05, 0.25], { parent: R.T.torso }); R.apron.visible = false;
  R.pile = E.group(null, [C[0], 0, C[2]]); const cc = ["#ff7fb8", "#ffe14a", "#19e0c6", "#9b4dff", "#ff4d4d", "#4d9bff"]; for (let i = 0; i < 140; i++) { const a = i * 2.4, r = Math.sqrt(i / 140) * 0.7; E.box(0.09, 0.09, 0.02, E.flat(cc[i % 6]), [Math.cos(a) * r, (1 - r / 0.7) * 0.5 * ((i * 7) % 10) / 10, Math.sin(a) * r], { parent: R.pile, noShadow: true, center: true, rot: [i, i * 2, 0] }); } R.pile.visible = false;
  R.pour = confetti(E, 40, 9); R.re = { zip: confetti(E, 30, 1, ["#ffe14a"]), gran: confetti(E, 30, 2, ["#9b4dff"]), brunch: confetti(E, 30, 4, ["#2f5fb0", "#ffffff"]), sulk: confetti(E, 30, 3, ["#8a8f99"]), mitten: confetti(E, 50, 5, ["#d9a826", "#3fb8a8"]) };
  R.shop.rules(false);
}
export function frame(f, E) {
  const X = E.X, t = f / FPS, OV = [], FX = [], { T, P, D, M, B, G, Z, A } = R, Su = R.S;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const fs = f - S(n), sp = (a, b) => X.span(f, a, b), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const say = (who, base) => (amp(who) > 0.55 ? ({ happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", sad: "talk", angry: "angry" }[base] || "talk") : base);
  R.shop.clock(n < 3 || (n === 3 && fs < 20) ? "5:59" : "6:00"); R.shop.rules(n > 21 || (n === 21 && fs > 70));
  let cam, light = ["interior", "night", 0.1], shk = null, grade = null, coins = n > 26 || (n === 26 && fs > 30) ? 8 : 1, bat = 1, hudN = n === 1 && fs < 40 ? "8 (UNATTENDED)" : n >= 15 ? "8 — CUSTOMERS: 5" : 8;
  // heroes appear from 13
  const re = (i) => n > 13 || (n === 13 && fs > 12 + i * 22);
  let tp = { pos: [0, 0, 1.0], yaw: 0, face: "happy", scale: 1 }, pp = { pos: [1.2, 0, 1.2], yaw: -0.3, face: say("pixi", "deadpan") }, dp = { pos: n >= 4 && n <= 11 ? [-2.8, 0, 1.6] : [-1.3, 0, 0.8], yaw: 0.4 };
  let hand = null, ctlAt = null, mopLean = 0, pileOn = n >= 11 && n <= 13 || (n > 13 && n <= 20), magAt = null;
  const heroes = { zp: re(0) ? { pos: [-0.5, 0, -0.3], yaw: 0, armL: [0, 0.2], armR: [0, 0.2], face: "grin" } : null, gp: re(1) ? { pos: [0.4, 0, -0.4], yaw: 0.1, face: "smug" } : null, bp: re(2) ? { pos: [1.4, 0, -0.4], yaw: -0.1, armR: [-1.6, 0.2], face: "angry" } : null, sp2: re(3) ? { pos: [2.6, 0, -0.6], yaw: Math.PI, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "angry" } : null, mp: re(4) ? { pos: [4.0, 0, -0.8], yaw: -0.5, lean: 0.5, head: [0.6, 0, 0], face: "deadpan" } : null };
  switch (n) {
    case 1: { const k = X.easeIn(sp(S(1) + 4, S(1) + 20)); const y = 5 * (1 - k); tp = { pos: [0, Math.max(0, y) + (k >= 1 ? 0.15 : 0), 1.0], pitch: k >= 1 ? 1.45 : 0, face: "dizzy" }; pp.pos = [1.2, Math.max(0, y), 1.2]; dp.pos = [-1.3, Math.max(0, y), 0.8]; cam = { pos: [0.3, 2.4, 8.4], look: [0, 1.4, -0.5], fov: 46 }; break; }
    case 2: { tp = { pos: [M0[0] + 0.5, 0, M0[2] + 0.2], yaw: -0.6, legL: -1.4, kneeL: 1.5, legR: -1.4, kneeR: 1.5, armL: [-1.2, 0.6], elbowL: 1.4, armR: [-1.2, -0.6], elbowR: 1.4, face: say("toast", "happy"), pos2: 0 }; tp.pos[1] = -0.5; mopLean = -0.15; cam = { pos: [M0[0] + 1.4, 1.5, M0[2] + 3.0], look: [M0[0] + 0.2, 1.0, M0[2]], fov: 44 }; break; }
    case 3: cam = { pos: [0.2, 3.6, -2.6], look: [0.2, 3.6, -5], fov: 40 }; tp = null; break;
    case 4: hand = { pos: [-1, 2.6, -1.6], tap: Math.abs(Math.sin(f * 0.15)) }; cam = { pos: [0.4, 2.6, 7.4], look: [-0.6, 2.4, -1], fov: 46 }; tp = { pos: [0, 0, 1.0], yaw: -0.4, face: "shock" }; break;
    case 5: { hand = { pos: [-1, 2.6, -1.6] }; const k = X.smooth(sp(S(5) + 30, S(5) + 50)); tp = { pos: [-0.6, 0, 0.6], yaw: Math.PI * k * 0 + 0, armL: [0.9, 0.2], armR: [0.9, -0.2], elbowL: 0.8, elbowR: 0.8, face: say("toast", "happy") }; ctlAt = [-0.6, 1.0, 0.25]; dp = { pos: [-0.6, 0, -0.3], yaw: 0, jaw: 0.6 };
      cam = { pos: [0.8, 1.9, 4.8], look: [-0.7, 1.4, 0], fov: 46 }; if (k > 0.5) { tp.armL = [-1.0, 0.2]; tp.armR = [-1.0, -0.2]; ctlAt = [-0.6, 1.05, 1.1]; dp = { pos: [-1.3, 0, 1.6], yaw: -0.6, jaw: 0.6 * Math.abs(Math.sin(f * 0.6)) }; } break; }
    case 6: { const k = sp(S(6) + 6, S(6) + 26); hand = { pos: [-0.6, 2.2, -0.2], palmUp: 1 }; tp = { pos: [-0.2, 0, 1.2], yaw: -2.3, armR: [-1.8, 0.1], face: "sad" }; ctlAt = f > S(6) + 50 ? [-0.6, 2.25, -0.2] : [-0.4, 1.4, 0.4]; cam = { pos: [0.6, 2.4, 4.0], look: [-0.6, 2.0, -0.2], fov: 44 }; break; }
    case 7: { ctlAt = [0, 1.0, 3.0]; tp = null; cam = { pos: [0, 1.62, 3.42], look: [0, 1.0, 3.0], fov: 38 }; const L = ["PLAY HISTORY", "SERVERS VISITED: 3", "EMPTIED: 1", "EXPLOSIONS (INTERNAL): 1"]; L.forEach((l, i) => { if (fs > i * 30) OV.push(textO(l, 960, 220 + i * 90, i ? 54 : 70, { col: i ? "#7fffd4" : "#ffe14a" })); }); break; }
    case 8: { const step = Math.min(2, Math.floor(fs / 50)); hand = { pos: [-1, 2.8, -0.6], palmUp: 1 }; ctlAt = [-1, 2.85, -0.6]; tp = { pos: [0, 0, 1.0], yaw: -0.3, face: "sad", scale: 0.9 - step * 0.05 }; pp = { ...pp, pos: [1.2 + step * 0.5, 0, 1.2] }; dp = { ...dp, head: [-0.2, 0, 0], jaw: 0.4 }; cam = { pos: [0.3, 2.2, 6.6], look: [0, 1.6, 0], fov: 46 };
      ["ALARM: ●●●●●", "BIG HEAD MODE: USED"].forEach((l, i) => { if (fs > 20 + i * 50) OV.push(textO(l, 1500, 200 + i * 80, 50, { col: "#7fffd4" })); }); break; }
    case 9: hand = { pos: [0, 3.1, 1.0], point: 1 }; tp = { pos: [0, 0, 1.0], yaw: 0, scale: 0.8, armR: [-2.8, 0.2], face: say("toast", "sad") }; cam = { pos: [0.2, 2.0, 5.2], look: [0, 1.7, 0.8], fov: 46 }; break;
    case 10: case 11: { hand = n === 10 ? { pos: [0, 3.1, 1.0], point: 1 } : null; tp = { pos: [0.3, 0, 1.0], yaw: 0.3, scale: 0.85, armR: [-2.6, 0.3], elbowR: 1.2, face: say("toast", "sad"), head: n === 11 ? [0.5, 0, 0] : [0, 0, 0] };
      if (n === 10) { for (let i = 0; i < 2; i++) if (fs > 20 + i * 30 && fs < 50 + i * 30) FX.push({ kind: "sparkle", pos: [0.3, 1.6 - (fs - 20 - i * 30) * 0.03, 1.2], size: 0.3, t: fs / 20 }); }
      if (n === 11) { R.pour.at(fs < 60 ? fs / 30 : 2, [0.5, 1.8, 1.3], 0.2); pp = { ...pp, face: say("pixi", "deadpan"), head: [0, -0.6, 0] }; }
      cam = { pos: [0.6, 1.9, 5.4], look: [0.5, 1.3, 1.0], fov: 46 }; break; }
    case 12: { dp = { pos: [0.0, 0, 0.6], yaw: 0.6, squash: (fs % 20) < 4 ? 0.1 : 0 }; const k = sp(S(12) + 40, Eo(12)); magAt = f > S(12) + 40 ? [X.lerp(0.4, C[0], k), 0.1, X.lerp(1.0, C[2], k) + 0.3 * Math.sin(k * 3)] : null; cam = { pos: [0.8, 1.6, 5.0], look: [0.6, 0.9, 1.0], fov: 46 }; break; }
    case 13: { cam = { pos: [1.6, 3.0, 9.6], look: [1.6, 2.2, -0.4], fov: 50 }; tp = { pos: [-1.4, 0, 1.6], yaw: 0.6, face: "shock" }; pp = { ...pp, pos: [-0.4, 0, 2.2], yaw: 0.3 }; dp = { pos: [-2.6, 0, 1.4], yaw: 0.5 };
      ["zip", "gran", "brunch", "sulk", "mitten"].forEach((k2, i) => { const a = S(13) + 12 + i * 22; R.re[k2].at(f < a ? 1.2 - (f - (a - 36)) / 30 : -1, [[-0.5, 0.4, 1.4, 2.6, 4.0][i], 1, -0.4], 0.5); }); if (re(4)) shk = [S(13) + 12 + 88 + 6, 0.1, 10]; break; }
    case 14: heroes.bp = { pos: [1.4, 0, -0.4], yaw: -0.3, armR: [-1.6 + Math.min(1, fs / 90) * 1.4, 0.2], face: say("brunch", "angry") }; cam = { pos: [1.6, 2.0, 5.2], look: [1.4, 1.6, -0.6], fov: 44 }; tp = { pos: [-1.4, 0, 1.6], yaw: 0.6, face: "shock" }; break;
    case 15: cam = { pos: [1.6, 3.0, 9.6], look: [1.6, 2.2, -0.4], fov: 50 }; tp = { pos: [-1.4, 0, 1.6], yaw: 0.6, face: "shock" }; pp = { ...pp, pos: [-0.4, 0, 2.2], yaw: 0.3 }; dp = { pos: [-2.6, 0, 1.4], yaw: 0.5 }; break;
    case 16: heroes.mp = { ...heroes.mp, face: say("mitten", "deadpan") }; pp = { pos: [3.2, 0, 0.4], yaw: -0.2, face: say("pixi", "deadpan") }; cam = { pos: [3.0, 2.8, 6.0], look: [3.6, 3.6, -0.6], fov: 52 }; tp = null; break;
    case 17: heroes.mp = { pos: [-2.4, 0, -0.6], yaw: -1.4, lean: 0.6, head: [0.6, -0.6, 0], armL: [-1.3, 0.2], face: say("mitten", "deadpan") }; cam = { pos: [1.2, 3.0, 4.2], look: [2.4, 3.0, -3.8], fov: 50 }; tp = null; break;
    case 18: { const z = X.back(sp(S(18), S(18) + 6)); dp = { pos: [-1.6, 0, 0.6], yaw: 0.2, jaw: 0.4 }; cam = { pos: [-1.6, X.lerp(2.2, 2.6, z), X.lerp(6.0, 3.6, z)], look: [-1.6, 2.4, 0.6], fov: 46 }; FX.push({ kind: "hearts", pos: [-1.5, 3.2, 1.4], size: 0.8, t: f / 30 }); tp = null; break; }
    case 19: heroes.mp = { pos: [-2.4, 0, -0.6], yaw: -0.2, lean: 0.5, head: [0.6, 0, 0], armR: [0.6, 0.1], face: say("mitten", "sad") }; dp = { pos: [-1.6, 0, 0.6], yaw: 0.2 }; cam = { pos: [-1.0, 2.6, 7.4], look: [-2.0, 3.2, -0.6], fov: 52 }; tp = null; break;
    case 20: dp = { pos: [0.6, 0, 1.2], yaw: 0.8, head: [0.6, 0, 0], jaw: fs > 20 && fs < 30 ? 1 : 0.2 }; magAt = fs < 26 ? [C[0], 0.1, C[2]] : null; cam = { pos: [1.4, 1.5, 4.2], look: [0.9, 0.6, 1.4], fov: 44 }; tp = null; if (fs < 30) OV.push(textO("MAGNETS 5/6", 1600, 150, 46, { col: "#ffffff" })); break;
    case 21: { const rp = R.shop.rulesPos; hand = { pos: [rp[0] + 1.4, rp[1] - 1.0, rp[2] + 1.5], point: 1, rotY: -0.5 }; cam = { pos: [rp[0], rp[1] - 0.2, rp[2] + 3.2], look: [rp[0], rp[1] - 0.2, rp[2]], fov: 44 }; tp = null; break; }
    case 22: hand = { pos: [-1.2, 2.4, 0.2], point: 1, rotY: 0.6 }; tp = { pos: [0, 0, 1.0], yaw: -0.4, face: "shock" }; cam = { pos: [0.6, 2.0, 5.2], look: [0, 1.6, 0.6], fov: 46 }; if (fs > 20) OV.push(stamp("BANNED: TOAST'S WEEKENDS", fs < 26 ? X.lerp(2.5, 1, (fs - 20) / 6) : 1)); break;
    case 23: { tp = { pos: [0, 0, 1.0], yaw: 0, face: "scared" }; cam = { pos: [0, 1.95, 3.2], look: [0, 1.8, 1.0], fov: 44 }; if (fs > 15) { grade = { uSat: 0.35 }; shk = [S(23) + 15, 0.2, 10]; const s2 = fs < 20 ? X.lerp(3.2, 1, (fs - 15) / 5) : 1; OV.push(banner("TOASTED!", s2)); } break; }
    case 24: case 25: case 26: case 27: {
      tp = { pos: [0.6, 0, -2.6], yaw: 0, face: n === 27 ? "sad" : "happy" }; R.apron.visible = true;
      heroes.gp = { pos: [0.6, 0, -0.8], yaw: Math.PI, face: say("gran", "smug") }; heroes.bp = { pos: [0.6, 0, 0.2], yaw: Math.PI, face: "smug" }; heroes.sp2 = { pos: [0.6, 0, 1.4], yaw: 0, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "angry" }; heroes.mp = { pos: [0.6, 0, 3.2], yaw: Math.PI, lean: 0.7, head: [0.5, 0, 0], face: "deadpan" }; heroes.zp = n === 26 && fs > 10 && fs < 30 ? { pos: [-1 + (fs - 10) * 0.2, 0, -1.6], yaw: Math.PI / 2 } : null;
      pp = { pos: [2.6, 0, 0.8], yaw: -0.6, face: "deadpan" }; dp = { pos: [3.4, 0, 0.2], yaw: -0.6 };
      cam = n === 24 ? { pos: [4.6, 3.0, 7.8], look: [0.6, 1.6, -0.4], fov: 50 } : { pos: [-2.4, 2.1, 1.0], look: [0.6, 1.5, -1.8], fov: 46 };
      if (n === 25) { heroes.gp = { ...heroes.gp, face: say("gran", "smug"), head: [0, 0.6, 0] }; dp = { pos: [3.0, 0, 1.2], yaw: -0.4, squash: 0.1 }; }
      if (n === 27) { heroes.gp = { ...heroes.gp, face: say("gran", "smug") }; tp = { ...tp, armR: [-1.0, 0.3], yaw: -0.6 }; }
      break; }
  }
  // tray, coins
  const trayGone = n > 26 || (n === 26 && fs > 20); R.tray.forEach((d) => (d.visible = !trayGone)); R.coins.forEach((c, i) => { c.visible = trayGone; c.rotation.set(0, f * 0.4 + i, trayGone && n === 26 ? Math.sin(f * 0.6 + i) * 0.6 : 0); });
  // ---- pose ----
  const put = (Ac, p) => (p ? Ac.pose(p) : Ac.pose({ visible: false }));
  put(T, tp); put(P, pp); if (dp) D.pose({ ...dp, scale: 1 }); else D.pose({ visible: false });
  put(Z, heroes.zp); put(G, heroes.gp); put(B, heroes.bp); put(Su, heroes.sp2); if (G.root.visible) G.root.scale.setScalar(0.78); if (Su.root.visible) Su.root.scale.setScalar(2.0);
  if (heroes.mp) { M.pose(heroes.mp); M.root.scale.setScalar(R.shop.H / 2.7 / 1.15); } else M.pose({ visible: false });
  P.boardAt(pp ? [pp.pos[0] + 0.5, 0, pp.pos[2] + 0.2] : [0, -50, 0], 0.3, 0, 0, !!pp);
  if (hand) A.pose({ visible: true, ...hand }); else A.pose({ visible: false });
  if (ctlAt) { R.ctl.g.position.set(...ctlAt); R.ctl.g.rotation.set(0.75, 0, 0); R.ctl.set(n === 7 ? "PLAY HISTORY" : "CHANGE SERVER", 1); } else R.ctl.g.position.y = -50;
  R.mop.rotation.set(0, 0, mopLean); R.pile.visible = pileOn && (n !== 11 || fs > 40); R.pile.scale.setScalar(n === 11 ? sp(S(11) + 40, Eo(11)) : 1);
  if (magAt) R.mag.position.set(...magAt); else R.mag.position.y = -50;
  if (n !== 11) R.pour.at(-1); if (n !== 13) Object.values(R.re).forEach((c) => c.at(-1));
  // ---- HUD ----
  OV.push(hudHome(hudN, coins)); OV.push(battery(bat));
  if (n === 15) OV.push((g, w, h) => { [Z, G, B, Su, M].forEach((Ac, i) => { if (!Ac.root.visible) return; const v = Ac.root.position.clone().add(new THREE.Vector3(0, [2.4, 2.0, 2.5, 4.6, 7.4][i], 0)).project(E.camera); if (v.z < 1) guestTag(((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h, pop(S(15) + i * 4, 6))(g, w, h); }); });
  const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); if (cur) OV.push(subtitle(cur.text));
  if (!cam) cam = { pos: [0.3, 2.3, 7.4], look: [0, 1.4, -0.6], fov: 46 };
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
