// Long 3 · per-scene helpers: timeline loading, shot index, talking faces, HUD, receipt, subtitles, fail screen.
import { textO, banner, stamp, subtitle, INK, F } from "./ui.js";
export { textO, banner, stamp, subtitle, INK, F };
const K = (h) => h / 1080;
export async function load(meta) {
  const out = { SH: [], SEG: [], total: 10 };
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); out.SH = tl.shots; out.total = tl.total; meta.frames = Math.ceil(tl.total * 30); } catch (e) {}
  try { out.SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  return out;
}
/** frame context: n (shot), fs (frames into shot), S(n)/Eo(n) shot start/end frames, sp, pop, say */
export function ctx(f, E, D) {
  const X = E.X, FPS = 30, SH = D.SH, t = f / FPS;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const OPEN = { happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", angry: "angry", talk: "talk", sad: "talk" };
  return { X, t, n, fs: f - S(n), S, Eo, sp: (a, b) => X.span(f, a, b), pop: (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k))), amp, say: (who, base) => (amp(who) > 0.55 ? OPEN[base] || "talk" : base),
    seg: (who, k = 0) => { const s = D.SEG.filter((x) => x.sp === who)[k]; return s ? [Math.round(s.s * FPS), Math.round(s.e * FPS)] : [-1, -1]; } };
}
/** HUD: top-left label + clock + money; top-right small ticker; receipt line pops under the money */
export const hud = ({ label = "NIGHT 9 — THANKSGIVING", clock = "9:00 PM", money = 8, gold = null, goldUp = true, receipt = null, ra = 0, moneyPop = 1 } = {}) => (g, w, h) => {
  const k = K(h); textO(label, 40, 52, 46, { align: "left", col: "#ffffff" })(g, w, h);
  textO(clock, 40, 108, 40, { align: "left", col: "#cfc6ff" })(g, w, h);
  textO(`TOAST: $${money}`, 40, 166, 54, { align: "left", col: money > 0 ? "#ffe14a" : "#ff5a5a", s: moneyPop })(g, w, h);
  if (receipt && ra > 0) { g.save(); g.globalAlpha = Math.min(1, ra); g.font = F(34, k, 800); const tw = g.measureText(receipt).width + 40 * k; const y = 205 * k; g.fillStyle = "#fffbe6"; g.strokeStyle = INK; g.lineWidth = 5 * k; g.beginPath(); g.roundRect(40 * k, y, tw, 54 * k, 8 * k); g.fill(); g.stroke(); g.setLineDash([8 * k, 6 * k]); g.beginPath(); g.moveTo(40 * k, y + 54 * k); g.lineTo(40 * k + tw, y + 54 * k); g.stroke(); g.setLineDash([]); g.fillStyle = INK; g.textBaseline = "middle"; g.fillText(receipt, 60 * k, y + 28 * k); g.restore(); }
  if (gold) { g.save(); g.font = F(40, k, 900); const txt = `GOLD: ${gold} ${goldUp ? "▲" : "▼"}`; const tw = g.measureText(txt).width + 40 * k; g.fillStyle = "rgba(12,10,16,0.82)"; g.beginPath(); g.roundRect(w - 40 * k - tw, 24 * k, tw, 60 * k, 10 * k); g.fill(); g.fillStyle = goldUp ? "#7dff7a" : "#ff3d3d"; g.textAlign = "right"; g.textBaseline = "middle"; g.fillText(txt, w - 60 * k, 55 * k); g.restore(); }
};
/** subtitles from segments (skip when off) */
export const subs = (SEG, t) => { const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); return cur ? subtitle(cur.text) : null; };
/** label over a projected 3D point (with a dark outline) */
export const atPt = (E, p, txt, size = 56, o = {}) => (g, w, h) => { const v = new E.THREE.Vector3(...p).project(E.camera); if (v.z > 1) return; textO(txt, ((v.x + 1) / 2) * 1920, ((1 - v.y) / 2) * 1080 + (o.dy || 0), size, o)(g, w, h); };
/** hand-drawn arrow from (x0,y0) to (x1,y1) in 1080p coords */
export const arrow = (x0, y0, x1, y1, a = 1, col = "#ffe14a") => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; g.lineCap = "round"; g.lineJoin = "round"; for (const [c, lw] of [[INK, 26], [col, 14]]) { g.strokeStyle = c; g.lineWidth = lw * k; g.beginPath(); g.moveTo(x0 * k, y0 * k); g.quadraticCurveTo(((x0 + x1) / 2 + 60) * k, ((y0 + y1) / 2 - 80) * k, x1 * k, y1 * k); g.stroke(); const an = Math.atan2(y1 - ((y0 + y1) / 2 - 80), x1 - ((x0 + x1) / 2 + 60)); g.beginPath(); g.moveTo((x1 - Math.cos(an - 0.5) * 50) * k, (y1 - Math.sin(an - 0.5) * 50) * k); g.lineTo(x1 * k, y1 * k); g.lineTo((x1 - Math.cos(an + 0.5) * 50) * k, (y1 - Math.sin(an + 0.5) * 50) * k); g.stroke(); } g.restore(); };
/** big slam text with a dark plate behind (cold open) */
export const slam = (txt, y, s, col = "#ffe14a", size = 150) => (g, w, h) => textO(txt, 960, y, size, { col, s })(g, w, h);
/** stamp tag (rotated rectangle) */
export const tagStamp = (txt, x, y, s = 1, col = "#e0262e") => (g, w, h) => { if (s <= 0) return; const k = K(h); g.save(); g.translate(x * k, y * k); g.rotate(-0.12); g.scale(s, s); g.font = F(80, k); const tw = g.measureText(txt).width + 70 * k; g.lineWidth = 12 * k; g.strokeStyle = "#ffffff"; g.fillStyle = col; g.beginPath(); g.roundRect(-tw / 2, -66 * k, tw, 132 * k, 22 * k); g.fill(); g.stroke(); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(txt, 0, 6 * k); g.restore(); };
/** fail screen helper: returns {f (frozen), grade, flash, ov} given impact frame IMP */
export function fail(f0, IMP, X, END = IMP + 46) {
  const f = f0 > IMP && f0 <= IMP + 4 ? IMP : f0; if (f0 < IMP || f0 >= END) return { f, on: false };
  const b0 = IMP + 1, sc = f0 < b0 + 5 ? X.lerp(3.2, 1, X.easeIn(X.span(f0, b0, b0 + 5))) : 1 + 0.06 * Math.sin((f0 - b0 - 5) * 1.2) * Math.max(0, 1 - (f0 - b0 - 5) / 10);
  return { f, on: true, grade: { uSat: 0.35 }, flash: f0 <= IMP + 2 ? 0.4 : 0, ov: banner("TOASTED!", sc), shk: [IMP, 0.22, 10] };
}
