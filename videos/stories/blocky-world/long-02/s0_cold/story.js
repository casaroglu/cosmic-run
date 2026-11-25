// Long 2 · Scene 0 — Cold open (9 shots), composited from frames of the other scenes
import { textO, subtitle, INK, F } from "./common/ui.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let SH = [], SEG = [], IMG = {};
const FPS = 30;
const load = (src) => new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
const fr = (s, i) => `../${s}_frames/f${String(i).padStart(5, "0")}.jpg`;
export async function build(E) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); SH = tl.shots; meta.frames = Math.ceil(tl.total * 30); } catch (e) {}
  try { SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  const want = []; for (let i = 2899; i < 2988; i++) want.push(["s2_cape", i]); want.push(["s2_cape", 3460], ["s3_cube", 1660], ["s4_turbo", 1290], ["s4_turbo", 2680], ["s1_home", 1400]); for (let i = 0; i <= 90; i += 3) want.push(["s1_home", i]);
  await Promise.all(want.map(async ([s, i]) => { IMG[s + i] = await load(fr(s, i)); }));
}
const pic = (key, a = 1) => (g, w, h) => { const im = IMG[key]; if (!im) { g.fillStyle = "#222"; g.fillRect(0, 0, w, h); return; } g.save(); g.globalAlpha = a; g.drawImage(im, 0, 0, w, h); g.restore(); };
const tag = (txt, x, y, s = 1) => textO(txt, x, y, 90, { col: "#ffe14a", rot: -0.12, s });
export function frame(f, E) {
  const X = E.X, t = f / FPS, OV = [];
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const fs = f - S(n), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  switch (n) {
    case 1: OV.push(pic("s2_cape" + Math.min(2957, 2899 + fs))); break;
    case 2: OV.push(pic("s2_cape" + Math.min(2987, 2958 + fs))); break;
    case 3: OV.push((g, w, h) => { const k = h / 1080, a = Math.min(1, fs / 8); g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h); g.globalAlpha = a; g.fillStyle = "#ffd23a"; g.fillRect(0, 0, w, h); g.fillStyle = "rgba(255,140,40,0.5)"; for (let y = 0; y < h; y += 24) for (let x = 0; x < w; x += 24) { g.beginPath(); g.arc(x, y, 4 + 6 * Math.hypot(x - w / 2, y - h / 2) / w, 0, 7); g.fill(); } g.globalAlpha = 1; });
      if (fs >= 8) { const s = fs < 12 ? X.lerp(2.5, 1, (fs - 8) / 4) : 1; OV.push(textO("WRONG SERVER", 960 + (fs < 16 ? Math.sin(fs * 3) * 8 : 0), 540, 230, { col: "#ffffff", s })); } break;
    case 4: OV.push(pic("s2_cape3460")); [["US", 860, 560, 0], ["US", 1060, 560, 12], ["ALSO US", 960, 420, 24]].forEach(([tx, x, y, d]) => { if (fs >= 10 + d) OV.push((g, w, h) => { const k = h / 1080; g.save(); g.strokeStyle = "#ffe14a"; g.lineWidth = 8 * k; g.beginPath(); g.moveTo(x * k, (y - 140) * k); g.lineTo(x * k, (y + 10) * k); g.stroke(); g.restore(); textO(tx, x, y - 170, 60, { col: "#ffe14a", s: pop(S(4) + 10 + d, 6) })(g, w, h); }); }); break;
    case 5: OV.push(pic("s3_cube1660"), tag("ALSO US", 1500, 220, pop(S(5), 5))); break;
    case 6: OV.push(pic("s4_turbo1290"), tag("ALSO US", 1500, 220, pop(S(6), 5))); break;
    case 7: OV.push(pic("s4_turbo2680"), tag("…ALSO US", 1500, 220, pop(S(7), 5))); break;
    case 8: { OV.push(pic("s1_home1400"), (g, w, h) => { g.fillStyle = "rgba(255,214,232,0.55)"; g.fillRect(0, 0, w, h); }); const words = [["WE JOINED THE", 380, "#ffffff"], ["WRONG SERVERS", 560, "#ff4d4d"]]; words.forEach(([wd, y, c], i) => { const a = S(8) + i * 10; if (f >= a) OV.push(textO(wd, 960, y, 150, { col: c, s: pop(a, 6) })); });
      if (fs > 48) OV.push(textO("(all of them)", 960, 700, 70, { col: "#ffe14a", s: pop(S(8) + 48, 6) })); break; }
    case 9: { const k = Math.min(1, fs / 18); const idx = Math.max(0, Math.round((90 - 90 * k) / 3) * 3); OV.push(pic("s1_home" + idx)); if (k < 1) OV.push((g, w, h) => { g.save(); g.fillStyle = "rgba(255,255,255,0.12)"; for (let y = (f * 37) % 24; y < h; y += 24) g.fillRect(0, y, w, 3); g.restore(); textO("◀◀", 160, 140, 110, { col: "#ffffff" })(g, w, h); }); OV.push(textO("ONE BUTTON EARLIER", 960, 900, 80, { col: "#ffffff" })); break; }
  }
  const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); if (cur && n === 4) OV.push(subtitle(cur.text));
  return { cam: { pos: [0, 2, 5], look: [0, 1, 0], fov: 50 }, light: "day", dof: { focus: 6, amount: 0 }, actors: [], fx: [], caption: false, focusPt: [0, 0, 0], overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
