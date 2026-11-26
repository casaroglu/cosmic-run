// Long 2 · Scene E — End card and loop (5 shots)
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { lordMitten, hero, controller, adminHand } from "./common/props.js";
import { donutShop } from "./common/worlds.js";
import { textO, subtitle, hudHome, INK, F } from "./common/ui.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, SH = [], SEG = [], IMG = {};
const FPS = 30, M0 = [-0.8, 0, 1.0];
const load = (src) => new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
export async function build(E) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); SH = tl.shots; meta.frames = Math.ceil(tl.total * 30); } catch (e) {}
  try { SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  for (let i = 2899; i < 2935; i++) IMG[i] = await load(`../s2_cape_frames/f${String(i).padStart(5, "0")}.jpg`);
  R.shop = donutShop(E, 0); R.shop.mop.visible = false; R.shop.rules(true); R.shop.clock("6:00");
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.M = lordMitten(E); R.G = solid(hero(E, "gran")); R.B = solid(hero(E, "brunch")); R.S = solid(hero(E, "sulk"));
  R.A = adminHand(E); R.ctl = controller(E, null, [0, -50, 0], 0.9);
  R.mop = E.group(null, [0, 0, 0]); E.cyl(0.04, 0.04, 1.7, E.mat("#c79a5b"), [0, 0.1, 0], { parent: R.mop, seg: 8 }); E.box(0.5, 0.12, 0.22, E.mat("#19a0e0"), [0, 0.04, 0], { parent: R.mop });
  E.box(0.7, 0.6, 0.04, E.mat("#ffffff"), [0, 0.05, 0.25], { parent: R.T.torso });
}
export function frame(f, E) {
  const X = E.X, t = f / FPS, OV = [], { T, P, D, M, G, B, A } = R, Su = R.S;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const fs = f - S(n), sp = (a, b) => X.span(f, a, b), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const say = (who, base) => (amp(who) > 0.55 ? "talk" : base);
  let cam, light = ["interior", "night", 0.1];
  const shuffle = n >= 2 ? Math.min(1, sp(S(2) + 60, S(2) + 120)) : 0;
  // queue: Gran, Brunch, Sulk, Mitten (Mitten moves to the counter from E-2)
  G.pose({ pos: [0.6 - 3 * shuffle, 0, -0.8], yaw: Math.PI, face: "smug" }); G.root.scale.setScalar(0.78);
  B.pose({ pos: [0.6 + 3 * shuffle, 0, 0.2 - 1.0 * shuffle], yaw: Math.PI, face: "smug" }); Su.pose({ pos: [0.6 + 3.6 * shuffle, 0, 1.4], yaw: 0, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "angry" }); Su.root.scale.setScalar(2);
  const mitt = n === 3 ? sp(S(3) + 30, S(3) + 70) : n > 3 ? 1 : 0;
  M.pose({ pos: [0.6, 0, X.lerp(3.2, -0.6, shuffle)], yaw: Math.PI + (n === 3 ? 0.4 * Math.sin(fs * 0.08) : 0), lean: 0.6, head: [0.5, 0, 0], armR: [-2.6 * mitt, 0.6 * mitt], elbowR: 1.2 * mitt, face: say("mitten", "deadpan") }); M.root.scale.setScalar(2.0);
  const mopStroke = Math.sin(f * 0.21);
  T.pose({ pos: n >= 2 ? [M0[0] - 1.6, 0, M0[2] + 0.4] : [0.6, 0, -2.6], yaw: n >= 2 ? 0.3 : 0, armR: [-0.5 + 0.25 * mopStroke, 0.15], elbowR: 0.4, armL: [-0.6 + 0.2 * mopStroke, 0.3], elbowL: 0.9, face: "sad" });
  R.mop.position.set(n >= 2 ? M0[0] - 1.4 + 0.25 * mopStroke : 0, n >= 2 ? 0 : -50, M0[2] + 0.7);
  D.pose({ pos: [2.6, 0, 0.6], yaw: -0.5, scale: 1 });
  const pp = n === 1 ? { pos: [X.lerp(-4.5, -2.5, sp(S(1), S(1) + 30)), 0.17, 3.0], yaw: 0.2, face: say("pixi", "deadpan") } : { pos: [-2.5, 0.17, 2.6], yaw: n === 4 ? 0.9 : 0.4, face: say("pixi", "deadpan"), head: n === 4 ? [-0.3, 0.6, 0] : [0, 0, 0] };
  P.pose(pp); P.boardAt([pp.pos[0], 0, pp.pos[2]], Math.PI / 2, 0, 0, true);
  // Admin's hand with the controller, high in the background (E-1)
  if (n === 1) { A.pose({ pos: [1.8, 4.4, -2.6], palmUp: 0 }); R.ctl.g.position.set(1.8, 2.5, -2.2); R.ctl.g.rotation.set(1.2, 0, 0); R.ctl.set("NEXT ▸ DROP ISLAND", 1); } else { A.pose({ visible: false }); R.ctl.g.position.y = -50; }
  switch (n) {
    case 1: cam = { pos: [-1.6, 2.0, 7.0], look: [-1.2, 1.9, -1], fov: 46 }; OV.push((g, w, h) => { const k = h / 1080; g.save(); g.fillStyle = "#e0262e"; g.beginPath(); g.roundRect(w - 420 * k, h - 230 * k, 340 * k, 90 * k, 20 * k); g.fill(); g.restore(); textO("SUBSCRIBE", 1670, 895, 52, { col: "#ffffff", stroke: "#e0262e", s: 0.95 + 0.05 * Math.sin(f * 0.2) })(g, w, h); }); break;
    case 2: cam = { pos: [-0.8, 2.6, 8.0], look: [-0.6, 1.6, -0.6], fov: 50 }; OV.push((g, w, h) => { const k = h / 1080; g.save(); g.fillStyle = "rgba(20,15,32,0.88)"; for (const y of [160, 600]) { g.beginPath(); g.roundRect(w * 0.6, y * k, w * 0.36, 360 * k, 24 * k); g.fill(); g.strokeStyle = "#ffffff"; g.lineWidth = 6 * k; g.stroke(); } g.restore(); textO("TOAST & PIXI", 300, 110, 90, { col: "#ffe14a" })(g, w, h); textO(`SAME TILE: ${fs < 60 ? "4,114" : "4,115"}`, 380, 900, 60, { col: "#ffe14a" })(g, w, h); }); break;
    case 3: cam = { pos: [-6.6, 5.8, 3.0], look: [0.4, 3.0, -0.8], fov: 42 }; break;
    case 4: cam = { pos: [-0.4, 1.9, 6.6], look: [-2.5, 1.5, 2.6], fov: 44 }; break;
    case 5: OV.push((g, w, h) => { const im = IMG[2899 + Math.min(fs, 29)]; if (im) g.drawImage(im, 0, 0, w, h); }); break;
  }
  if (n <= 2) OV.push(hudHome("8 — CUSTOMERS: 5", 8));
  const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); if (cur && n !== 5) OV.push(subtitle(cur.text));
  unclip([R.T, R.P, R.G, R.B, R.S], { gap: 0.2 });
  return { cam: cam || { pos: [0, 2, 6], look: [0, 1.4, 0], fov: 46 }, light, dof: { focus: 6, amount: 0 }, actors: [], fx: [], caption: false, focusPt: [0, 1, 0], overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
