// Long 4 scene kit: timeline loading + per-frame shot context
import * as THREE from "three";
export const FPS = 30;
export async function loadTL(meta, R) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); meta.frames = Math.ceil(tl.total * FPS); R.SH = tl.shots; R.total = tl.total; } catch (e) { R.SH = []; }
  try { R.SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) { R.SEG = []; }
}
export function ctx(f, E, R) {
  const X = E.X, SH = R.SH, t = f / FPS;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const sp = (a, b) => X.span(f, a, b), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const say = (who, base) => (amp(who) > 0.55 ? ({ happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", sad: "talk", angry: "angry" }[base] || "talk") : base);
  const seg = () => R.SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25);
  /** first frame of the k-th occurrence of a word (falls back to shot start) */
  const at = (w, k = 0, fb = 0) => { const v = E.at(w, k); return v < 0 ? fb : v; };
  /** start frame of line i */
  const L = (i) => Math.round((R.SEG[i] ? R.SEG[i].s : 0) * FPS), Le = (i) => Math.round((R.SEG[i] ? R.SEG[i].e : 0) * FPS);
  return { X, t, n, fs: f - S(n), S, Eo, sp, pop, amp, say, seg, at, L, Le };
}
export const v3 = (a) => new THREE.Vector3(...a);
export const wp = (obj, off = [0, 0, 0]) => { obj.updateMatrixWorld(true); return obj.localToWorld(new THREE.Vector3(...off)); };
