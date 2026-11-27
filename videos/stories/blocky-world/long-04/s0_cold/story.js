// Long 4 · Cold open (7 shots). Frame 0 = LOOP_POSE (same as the film's last frame).
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { controller, adminHand } from "./common/props.js";
import { textO, subtitle, INK, F } from "./common/ui.js";
import { home, drawScreen, spinner } from "./common/l4.js";
import { loopPose, DARK } from "./common/loop.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {}, IMG = {};
// flash frames from other scenes (set after those scenes are rendered)
let FLASH = [["s1_wait", 300], ["s3_floor", 560], ["s4_walls", 1000]];
const tlOf = async (s) => { try { return (await (await fetch(`../${s}_work/timeline.json?v=` + Date.now())).json()).shots; } catch (e) { return null; } };
const load = (src) => new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
export async function build(E) {
  await loadTL(meta, R);
  Object.assign(R, home(E));
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E); R.H = adminHand(E); R.ctl = controller(E, null, [0, -50, 0], 0.5);
  const t1 = await tlOf("s1_wait"), t3 = await tlOf("s3_floor"), t4 = await tlOf("s4_walls"); const fr = (tl, n, q) => (tl ? Math.round((tl[n - 1].s + (tl[n - 1].e - tl[n - 1].s) * q) * 30) : 0);
  FLASH = [["s1_wait", fr(t1, 3, 0.62)], ["s3_floor", fr(t3, 5, 0.45)], ["s4_walls", fr(t4, 11, 0.4)]];
  await Promise.all(FLASH.map(async ([s, i]) => { IMG[s] = await load(`../${s}_frames/f${String(i).padStart(5, "0")}.jpg`); }));
}
const pic = (im) => (g, w, h) => { if (!im) { g.fillStyle = "#333"; g.fillRect(0, 0, w, h); return; } g.drawImage(im, 0, 0, w, h); };
const stampTag = (txt, s) => (g, w, h) => { const k = h / 1080; g.save(); g.translate(1180 * k, 190 * k); g.rotate(-0.12); g.scale(s, s); g.font = F(84, k); const tw = g.measureText(txt).width + 70 * k; g.lineWidth = 12 * k; g.strokeStyle = "#e0262e"; g.fillStyle = "rgba(255,255,255,0.92)"; g.beginPath(); g.roundRect(-tw / 2, -64 * k, tw, 128 * k, 18 * k); g.fill(); g.stroke(); g.fillStyle = "#e0262e"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(txt, 0, 6 * k); g.restore(); };
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop } = C, OV = [];
  let cam = { pos: [0, 2, 5], look: [0, 1, 0], fov: 44 }, light = DARK, dof = { focus: 6, amount: 0 }, grade = null;
  R.shop.clock("11:59", "PM");
  if (n === 1 || n === 3) { const L = loopPose(R, f); cam = L.cam; dof = L.dof;
    if (n === 1 && fs > 30) { R.T.head.rotation.x = 0.12 + 0.12 * X.smooth(sp(S(1) + 30, S(1) + 44)); }
    if (n === 3) { R.T.head.rotation.x = 0.24; grade = { uSat: 0.35 };
      OV.push((g, w, h) => { const k = h / 1080, q = Math.min(1, fs / 12); g.save(); g.strokeStyle = "#ffe14a"; g.lineWidth = 10 * k; g.lineCap = "round"; g.beginPath(); g.moveTo(1500 * k, 260 * k); g.quadraticCurveTo(1300 * k, 200 * k, (1500 - 360 * q) * k, (260 + 110 * q) * k); g.stroke(); if (q >= 1) { g.beginPath(); g.moveTo(1140 * k, 370 * k); g.lineTo(1185 * k, 330 * k); g.moveTo(1140 * k, 370 * k); g.lineTo(1195 * k, 385 * k); g.stroke(); } g.restore(); textO("SINCE 2013", 1560, 200, 90, { col: "#ffe14a", rot: -0.08, s: pop(S(3) + 4, 6) })(g, w, h); });
      const cur = C.seg(); if (cur) OV.push(subtitle(cur.text)); } }
  else if (n === 2) { loopPose(R, f); const st = { s: "down" }; R.scrL.set("down2", (g, w, h) => drawScreen(g, w, h, st)); R.screenLight.intensity = 3; cam = { pos: [R.TVX + 1.25, 1.6, R.TVZ], look: [R.TVX, 1.6, R.TVZ], fov: 40 };
    if (fs >= 26) { const s = fs < 31 ? X.lerp(2.4, 1, (fs - 26) / 5) : 1; OV.push(textO("HE WAITED 13 YEARS", 960 + (fs < 36 ? Math.sin(fs * 3) * 8 : 0), 900, 130, { col: "#ffe14a", s })); } }
  else if (n >= 4 && n <= 6) { loopPose(R, f); const [sc] = FLASH[n - 4]; OV.push(pic(IMG[sc]), stampTag(["2013", "DAY ONE", "ALSO DAY ONE"][n - 4], pop(S(n), 5))); }
  else if (n === 7) { loopPose(R, f); OV.push((g, w, h) => { const k = h / 1080; g.fillStyle = "#ffd1e3"; g.fillRect(0, 0, w, h); const s = 120 * k; for (let y = 0; y < h / s + 1; y++) for (let x = 0; x < w / s + 1; x++) { g.fillStyle = (x + y) % 2 ? "#ffb3d4" : "#fff6fb"; g.fillRect(x * s, y * s, s, s); } g.fillStyle = "rgba(255,255,255,0.35)"; g.fillRect(0, 0, w, h); });
    const words = [["I WAITED", 300, "#ffffff"], ["13 YEARS", 470, "#ff3d7f"], ["FOR THIS GAME", 640, "#ffffff"]]; words.forEach(([wd, y, c], i) => { const a = S(7) + i * 6; if (f >= a) OV.push(textO(wd, 960, y, 160, { col: c, s: pop(a, 6) })); });
    OV.push((g, w, h) => { if (fs < 6) return; spinner(668, 175, 34, f / 30, 1, "#221a26")(g, w, h); });
    if (fs > 34) OV.push(textO("(please wait)", 960, 800, 64, { col: "#ffe14a", s: pop(S(7) + 34, 6) })); }
  return { cam, light, dof, grade, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
