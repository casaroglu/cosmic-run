// Long 4 shared kit: patch chip, +1, patch notes, game UI, home extras, bread Toast, game case, workshop bits.
import * as THREE from "three";
import { blocky, drawFace } from "../blocky/rig.js";
import { textO, F, INK } from "./ui.js";
import { donut, adminHand, controller } from "./props.js";
import { donutShop } from "./worlds.js";
export const K = (h) => h / 1080;
export const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
/** live canvas texture: returns {tex, set(key, draw)} — redraws only when key changes */
export const live = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; let key = null; return { tex: t, c, set(k, draw) { if (k === key) return; key = k; const g = c.getContext("2d"); g.clearRect(0, 0, w, h); draw(g, w, h); t.needsUpdate = true; } }; };
/** project a world point (THREE.Vector3 or array) to 1920x1080 overlay units */
export const P2 = (E, v) => { const p = (Array.isArray(v) ? new THREE.Vector3(...v) : v.clone()).project(E.camera); return [((p.x + 1) / 2) * 1920, ((1 - p.y) / 2) * 1080, p.z]; };
export const wpos = (obj, off = [0, 0, 0]) => { obj.updateMatrixWorld(true); return obj.localToWorld(new THREE.Vector3(...off)); };
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

// ---------------- HUD pieces (all (g,w,h) => void, 1920x1080 units) ----------------
export const UNITS = ["13 MINUTES", "13 HOURS", "13 DAYS", "13 YEARS"];
/** patch chip, top-right. unit: string; prev: previous unit (crossed out while jump < 1); jump 0..1; green: patched */
export const chip = (unit, o = {}) => (g, w, h) => { const k = K(h), a = o.a ?? 1; if (a <= 0) return; g.save(); g.globalAlpha = a; const s = o.big || 1;
  const x = (o.x ?? 1380) * k, y = (o.y ?? 26) * k, bw = 510 * k * s, bh = 120 * k * s, green = !!o.green;
  g.fillStyle = "rgba(20,16,34,0.82)"; rr(g, x, y, bw, bh, 22 * k * s); g.fill(); g.lineWidth = 5 * k; g.strokeStyle = green ? "#7dff7a" : "#ffffff"; g.stroke();
  const pct = o.pct ?? 99; g.font = F(34 * s, k); g.textBaseline = "middle"; g.textAlign = "left"; g.fillStyle = green ? "#7dff7a" : "#ffffff"; g.fillText(o.label || `PATCH ${pct}%`, x + 22 * k * s, y + 32 * k * s);
  const bx = x + 250 * k * s, by = y + 20 * k * s, bl = 236 * k * s; g.fillStyle = "#3a3358"; rr(g, bx, by, bl, 24 * k * s, 12 * k * s); g.fill(); g.fillStyle = green ? "#7dff7a" : "#19e0c6"; rr(g, bx, by, bl * pct / 100, 24 * k * s, 12 * k * s); g.fill();
  const j = o.jump ?? 1; g.font = F(36 * s, k); g.fillStyle = green ? "#7dff7a" : "#ffe14a";
  if (o.prev && j < 1) { const tx = "TIME LEFT: " + o.prev; g.fillText(tx, x + 22 * k * s, y + 84 * k * s); const tw = g.measureText(tx).width; g.strokeStyle = "#ff3d3d"; g.lineWidth = 7 * k; g.beginPath(); g.moveTo(x + 20 * k * s, y + 86 * k * s); g.lineTo(x + 20 * k * s + tw * Math.min(1, j * 3), y + 84 * k * s); g.stroke(); }
  else { const sc = o.prev ? 1 + 0.35 * Math.max(0, 1 - (j - 1) * 4) : 1; g.save(); g.translate(x + 22 * k * s, y + 84 * k * s); g.scale(sc, sc); g.fillStyle = o.prev && j < 1.25 ? "#ff5a5a" : g.fillStyle; g.fillText("TIME LEFT: " + unit, 0, 0); g.restore(); }
  g.restore(); };
/** the small +1 (white, half a second) or the big red +1 DAY. age in frames */
export const plusOne = (x, y, age, big = false) => (g, w, h) => { const dur = big ? 40 : 15; if (age < 0 || age > dur) return; const k = K(h), q = age / dur;
  g.save(); g.globalAlpha = big ? Math.min(1, (1 - q) * 3) : 1 - q * q; const sz = big ? 120 : 46; const s = big ? 1 + 0.4 * Math.max(0, 1 - age / 5) : 1;
  g.translate(x * k, (y - (big ? 60 : 70) * q) * k); g.scale(s, s); g.font = F(sz, k); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.lineWidth = sz * 0.2 * k; g.strokeStyle = INK; const t = big ? "+1 DAY" : "+1"; g.strokeText(t, 0, 0); g.fillStyle = big ? "#ff2d2d" : "#ffffff"; g.fillText(t, 0, 0); g.restore(); };
/** grey patch-note card, typed: n = characters shown */
export const patchCard = (title, body, n, a = 1, y = 330) => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; const bw = 1240 * k, bh = 300 * k, x = (w - bw) / 2, yy = y * k - bh / 2;
  g.fillStyle = "#d9d9de"; g.strokeStyle = INK; g.lineWidth = 9 * k; rr(g, x, yy, bw, bh, 24 * k); g.fill(); g.stroke(); g.fillStyle = "#5a5a68"; rr(g, x, yy, bw, 64 * k, 24 * k); g.fill(); g.fillRect(x, yy + 40 * k, bw, 24 * k);
  g.font = F(40, k); g.fillStyle = "#ffffff"; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText("PATCH NOTES", x + 30 * k, yy + 34 * k);
  const full = title + "\n" + body.join("\n"); const shown = full.slice(0, Math.max(0, Math.floor(n))); const L = shown.split("\n");
  L.forEach((l, i) => { g.font = F(i === 0 ? 52 : 50, k, i === 0 ? 900 : 800); const red = l.startsWith("BROKE"); g.fillStyle = i === 0 ? INK : red ? "#d8262e" : "#1f7a2e"; g.fillText(l, x + 40 * k, yy + (110 + i * 66) * k); });
  if (Math.floor(n) < full.length && Math.floor(n / 4) % 2 === 0) { const l = L[L.length - 1]; g.font = F(50, k, 800); const tw = g.measureText(l).width; g.fillStyle = INK; g.fillRect(x + 44 * k + tw, yy + (84 + (L.length - 1) * 66) * k, 22 * k, 50 * k); }
  g.restore(); };
/** yellow review pop-up floating up from a point; age frames */
export const review = (txt, x, y, age, sz = 54) => (g, w, h) => { if (age < 0 || age > 55) return; const q = age / 55, s = age < 6 ? X_back(age / 6) : 1; textO(txt, x, y - 90 * q, sz, { col: "#ffe14a", s, a: q > 0.75 ? (1 - q) * 4 : 1 })(g, w, h); };
const X_back = (t) => { t = Math.max(0, Math.min(1, t)); const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
/** name tag pill over a projected point */
export const tag = (txt, x, y, o = {}) => (g, w, h) => { const a = o.a ?? 1; if (a <= 0) return; const k = K(h), sz = o.size || 34; g.save(); g.globalAlpha = a; g.translate(x * k, y * k); g.scale(o.s || 1, o.s || 1); g.font = F(sz, k, 900); const tw = g.measureText(txt).width + 40 * k;
  g.fillStyle = o.bg || "rgba(25,140,220,0.92)"; rr(g, -tw / 2, -sz * 0.75 * k, tw, sz * 1.5 * k, 16 * k); g.fill(); g.lineWidth = 4 * k; g.strokeStyle = "#ffffff"; g.stroke();
  g.fillStyle = o.col || "#ffffff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(txt, 0, 2 * k); g.beginPath(); g.moveTo(-12 * k, sz * 0.75 * k); g.lineTo(12 * k, sz * 0.75 * k); g.lineTo(0, sz * 0.75 * k + 14 * k); g.fillStyle = o.bg || "rgba(25,140,220,0.92)"; g.fill(); g.restore(); };
/** a drawn donut icon (the controller's donut button) */
export const donutIcon = (g, x, y, r) => { g.save(); g.lineWidth = r * 0.55; g.strokeStyle = "#e7b06a"; g.beginPath(); g.arc(x, y, r * 0.7, 0, 7); g.stroke(); g.lineWidth = r * 0.4; g.strokeStyle = "#ff7fb8"; g.beginPath(); g.arc(x, y, r * 0.7, Math.PI * 1.1, Math.PI * 2.9); g.stroke(); g.restore(); };
export const starIcon = (g, x, y, r, col = "#ffe14a") => { g.save(); g.beginPath(); for (let i = 0; i < 10; i++) { const rad = i % 2 ? r * 0.45 : r, an = -Math.PI / 2 + i * Math.PI / 5; g.lineTo(x + Math.cos(an) * rad, y + Math.sin(an) * rad); } g.closePath(); g.fillStyle = col; g.fill(); g.lineWidth = r * 0.14; g.strokeStyle = INK; g.stroke(); g.restore(); };
export const toastIcon = (g, x, y, r) => { g.save(); g.fillStyle = "#e7b06a"; g.strokeStyle = INK; g.lineWidth = r * 0.14; g.beginPath(); g.moveTo(x - r * 0.8, y + r * 0.8); g.lineTo(x - r * 0.8, y - r * 0.2); g.arc(x - r * 0.35, y - r * 0.3, r * 0.48, Math.PI, 0); g.arc(x + r * 0.35, y - r * 0.3, r * 0.48, Math.PI, 0); g.lineTo(x + r * 0.8, y + r * 0.8); g.closePath(); g.fill(); g.stroke(); g.restore(); };
/** "[donut] ENTER VEHICLE" prompt over a point */
export const prompt = (txt, x, y, a = 1, icon = "donut") => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; g.font = F(40, k); const tw = g.measureText(txt).width + 120 * k; const x0 = x * k - tw / 2, y0 = y * k - 36 * k;
  g.fillStyle = "rgba(15,12,28,0.85)"; rr(g, x0, y0, tw, 72 * k, 36 * k); g.fill(); g.lineWidth = 4 * k; g.strokeStyle = "#ffffff"; g.stroke(); g.fillStyle = "#ffffff"; g.beginPath(); g.arc(x0 + 40 * k, y * k, 26 * k, 0, 7); g.fill();
  if (icon === "donut") donutIcon(g, x0 + 40 * k, y * k, 20 * k); else if (icon === "star") starIcon(g, x0 + 40 * k, y * k, 20 * k); else toastIcon(g, x0 + 40 * k, y * k, 20 * k);
  g.fillStyle = "#ffffff"; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(txt, x0 + 80 * k, y * k + 2 * k); g.restore(); };
/** spinning loading circle */
export const spinner = (x, y, r, t, a = 1, col = "#ffffff") => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; g.translate(x * k, y * k); g.rotate(t * 6); g.lineCap = "round"; for (let i = 0; i < 8; i++) { g.globalAlpha = a * (0.2 + 0.8 * i / 7); g.strokeStyle = col; g.lineWidth = r * 0.22 * k; g.beginPath(); const an = i / 8 * Math.PI * 2; g.moveTo(Math.cos(an) * r * 0.55 * k, Math.sin(an) * r * 0.55 * k); g.lineTo(Math.cos(an) * r * k, Math.sin(an) * r * k); g.stroke(); } g.restore(); };
/** small counter, top-centre */
export const counter = (txt, pop = 1, x = 960, y = 70) => textO(txt, x, y, 64, { col: "#ffe14a", s: pop });
/** system notice box */
export const notice = (txt, x, y, a = 1, s = 1) => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; g.translate(x * k, y * k); g.scale(s, s); g.font = F(46, k); const tw = g.measureText(txt).width + 80 * k;
  g.fillStyle = "#fffbe6"; g.strokeStyle = "#d8262e"; g.lineWidth = 8 * k; rr(g, -tw / 2, -50 * k, tw, 100 * k, 18 * k); g.fill(); g.stroke(); g.fillStyle = "#d8262e"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(txt, 0, 3 * k); g.restore(); };
/** mission card (big, centre) */
export const mission = (l1, l2, a = 1, s = 1, y = 300) => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; g.translate(960 * k, y * k); g.scale(s, s); g.fillStyle = "rgba(10,8,20,0.6)"; g.fillRect(-960 * k, -90 * k, 1920 * k, 180 * k); g.restore();
  textO(l1, 960, y - 30, 70, { col: "#ffe14a", s, a })(g, w, h); if (l2) textO(l2, 960, y + 45, 46, { col: "#ffffff", s, a })(g, w, h); };
/** game HUD (MEGA DONUT HEIST 2): FRAMES top-left, minimap bottom-left, alarm + label + cash under the chip */
export const gameHud = (o = {}) => (g, w, h) => { const k = K(h); g.save();
  g.save(); g.translate(150 * k, h - 150 * k); g.beginPath(); g.arc(0, 0, 112 * k, 0, 7); g.clip(); g.fillStyle = "#2a2f45"; g.fillRect(-120 * k, -120 * k, 240 * k, 240 * k); g.fillStyle = "#ffb3d4"; g.fillRect(-120 * k, 30 * k, 240 * k, 30 * k); g.fillStyle = "#5a6180"; for (let i = -3; i <= 3; i++) { g.fillRect(i * 40 * k - 6 * k, -120 * k, 12 * k, 240 * k); g.fillRect(-120 * k, i * 40 * k - 6 * k, 240 * k, 12 * k); } g.fillStyle = "#ffe14a"; g.beginPath(); g.moveTo(0, -16 * k); g.lineTo(12 * k, 12 * k); g.lineTo(-12 * k, 12 * k); g.fill(); g.restore();
  g.lineWidth = 8 * k; g.strokeStyle = "#fff"; g.beginPath(); g.arc(150 * k, h - 150 * k, 112 * k, 0, 7); g.stroke();
  const fr = o.frames ?? 30; g.font = F(40, k); g.textAlign = "left"; g.textBaseline = "middle"; const ft = `FRAMES: ${fr}`; const fw = g.measureText(ft).width + 40 * k; g.fillStyle = "rgba(15,12,28,0.8)"; rr(g, 30 * k, 30 * k, fw, 70 * k, 14 * k); g.fill(); g.fillStyle = fr >= 30 ? "#7dff7a" : fr >= 10 ? "#ffe14a" : "#ff3d3d"; g.fillText(ft, 50 * k, 67 * k);
  const al = o.alarm || 0; for (let i = 0; i < 5; i++) { const x = 1880 * k - (4 - i) * 62 * k - 10 * k, y = 190 * k; g.lineWidth = 15 * k; g.strokeStyle = i < al ? "#ff7fb8" : "rgba(255,255,255,0.35)"; g.beginPath(); g.arc(x, y, 20 * k, 0, 7); g.stroke(); }
  if (o.label) textO(o.label, 1880, 250, 34, { align: "right", col: "#ff4d4d" })(g, w, h);
  textO("$" + (o.cash ?? 0), 1880, o.label ? 300 : 250, 40, { align: "right", col: "#7dff7a" })(g, w, h); g.restore(); };
/** cutscene bars: k 0..1 slide in; lift 0..1 = the lower bar lifted at x (garage door); box = [x0,y0,x1,y1] shrinks the bars to frame that */
export const bars = (k, o = {}) => (g, w, h) => { if (k <= 0) return; const kk = K(h); g.save(); const bh = 150 * kk * k;
  if (o.box) { const [x0, y0, x1, y1] = o.box.map((v) => v * kk); g.fillStyle = "#000"; g.fillRect(x0, y0, x1 - x0, 26 * kk); g.fillRect(x0, y1 - 26 * kk, x1 - x0, 26 * kk); g.restore(); return; }
  g.fillStyle = "#000"; g.fillRect(0, 0, w, bh);
  const lift = o.lift || 0; if (lift > 0) { const lx = (o.lx || 960) * kk, lw = 340 * kk; g.fillRect(0, h - bh, lx - lw / 2, bh); g.fillRect(lx + lw / 2, h - bh, w - lx - lw / 2, bh); g.fillRect(lx - lw / 2, h - bh - lift * 380 * kk, lw, bh); }
  else g.fillRect(0, h - bh, w, bh);
  if (o.label && k > 0.9) { g.font = F(40, kk, 800); g.fillStyle = "#ffffff"; g.textAlign = "left"; g.textBaseline = "middle"; const y = h - bh / 2; const t1 = "CUTSCENE — HOLD", t2 = "TO SKIP (13:00)"; const w1 = g.measureText(t1).width, w2 = g.measureText(t2).width; const x0 = (w - (w1 + w2 + 100 * kk)) / 2; g.fillText(t1, x0, y); g.fillStyle = "#fff"; g.beginPath(); g.arc(x0 + w1 + 50 * kk, y, 28 * kk, 0, 7); g.fill(); toastIcon(g, x0 + w1 + 50 * kk, y, 20 * kk); g.fillStyle = "#ffffff"; g.fillText(t2, x0 + w1 + 100 * kk, y); }
  g.restore(); };
/** radio chip */
export const radio = (a = 1) => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; g.fillStyle = "rgba(15,12,28,0.85)"; rr(g, 300 * k, h - 120 * k, 300 * k, 80 * k, 40 * k); g.fill(); g.strokeStyle = "#ff7fb8"; g.lineWidth = 5 * k; g.stroke(); donutIcon(g, 345 * k, h - 80 * k, 24 * k); g.font = F(40, k); g.fillStyle = "#ffffff"; g.textBaseline = "middle"; g.textAlign = "left"; g.fillText("DONUT FM", 385 * k, h - 78 * k); g.restore(); };
/** photo look for the year panels: white border, calendar leaf, DAYS WAITED */
export const yearPanel = (year, days, a = 1, o = {}) => (g, w, h) => { if (a <= 0) return; const k = K(h); g.save(); g.globalAlpha = a; g.fillStyle = "rgba(255,236,170,0.10)"; g.fillRect(0, 0, w, h); g.fillStyle = "#fbf7ee"; const b = 34 * k; g.fillRect(0, 0, w, b); g.fillRect(0, h - b, w, b); g.fillRect(0, 0, b, h); g.fillRect(w - b, 0, b, h);
  // calendar leaf top-right
  const cx = 1640 * k, cy = 70 * k, cw = 230 * k, ch = 200 * k; g.save(); g.translate(cx + cw / 2, cy + ch / 2); g.rotate(0.04); g.fillStyle = "#ffffff"; g.strokeStyle = INK; g.lineWidth = 6 * k; rr(g, -cw / 2, -ch / 2, cw, ch, 10 * k); g.fill(); g.stroke(); g.fillStyle = "#e0262e"; g.fillRect(-cw / 2 + 3 * k, -ch / 2 + 3 * k, cw - 6 * k, 50 * k);
  g.font = F(30, k); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(o.month || "NOV", 0, -ch / 2 + 29 * k); g.font = F(92, k); g.fillStyle = INK; g.fillText(year, 0, 30 * k); g.restore();
  if (days != null) textO(`DAYS WAITED: ${days}`, 70, 112, 56, { align: "left", col: "#ffe14a", s: o.pop || 1 })(g, w, h);
  g.restore(); };

// ---------------- 3D: home extras ----------------
/** Donut Planet + Long 4 extras. returns R (shop handles + new ones) */
export function home(E) {
  const R = donutShop(E, 0); R.shop = R; R.rulesMesh.visible = false; R.box.visible = false;
  const M = (c, o) => E.mat(c, o);
  // poster with states (where the rules poster was) + red ask button under it
  R.posterL = live(600, 840); R.poster = E.plane(1.5, 2.1, E.mat("#ffffff", { map: R.posterL.tex }), [3.0, 2.85, -4.92], { noShadow: true });
  R.setPoster = (state) => R.posterL.set(state, (g, w, h) => { g.fillStyle = "#2a1450"; g.fillRect(0, 0, w, h); const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, "#ff8a5a"); grd.addColorStop(0.6, "#ff4fa3"); grd.addColorStop(1, "#3a1a6a"); g.fillStyle = grd; g.fillRect(20, 20, w - 40, h - 40);
    g.fillStyle = "#ffe14a"; g.beginPath(); g.arc(w / 2, h * 0.5, 150, Math.PI, 0); g.fill(); g.lineWidth = 64; g.strokeStyle = "#e7b06a"; g.beginPath(); g.arc(w / 2, h * 0.42, 95, 0, 7); g.stroke(); g.lineWidth = 46; g.strokeStyle = "#ff7fb8"; g.beginPath(); g.arc(w / 2, h * 0.42, 95, Math.PI * 1.05, Math.PI * 1.95); g.stroke(); g.fillStyle = "#111"; g.fillRect(w / 2 - 120, h * 0.37, 100, 34); g.fillRect(w / 2 + 20, h * 0.37, 100, 34); g.fillRect(w / 2 - 20, h * 0.375, 40, 10);
    g.textAlign = "center"; g.textBaseline = "middle"; g.font = F(76); g.lineWidth = 14; g.strokeStyle = INK; g.strokeText("MEGA DONUT", w / 2, 90); g.fillStyle = "#ffffff"; g.fillText("MEGA DONUT", w / 2, 90); g.strokeText("HEIST 2", w / 2, 170); g.fillStyle = "#ffe14a"; g.fillText("HEIST 2", w / 2, 170);
    const col = { "COMING SOON": "#19e0c6", "NOT YET": "#ff3d3d", "TRAILER 2": "#9b4dff", "DELAYED": "#ff3d3d", "OUT NOW": "#7dff7a" }[state] || "#fff";
    g.save(); g.translate(w / 2, h - 130); g.rotate(state === "COMING SOON" || state === "OUT NOW" ? 0 : -0.12); g.fillStyle = col; rr(g, -260, -70, 520, 140, 24); g.fill(); g.lineWidth = 12; g.strokeStyle = "#ffffff"; g.stroke(); g.font = F(state.length > 9 ? 80 : 92); g.fillStyle = state === "OUT NOW" || state === "COMING SOON" ? INK : "#ffffff"; g.fillText(state, 0, 6); g.restore(); });
  R.setPoster("COMING SOON");
  R.btnPlate = E.box(0.9, 0.5, 0.12, M("#ffffff"), [3.0, 1.05, -4.9]); R.btn = E.cyl(0.17, 0.19, 0.16, E.mat("#e0262e"), [3.0, 1.3, -4.76], { rot: [Math.PI / 2, 0, 0], center: true, seg: 20 });
  const bl = card(512, 128, (g, w, h) => { g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h); g.font = F(50); g.textAlign = "center"; g.fillStyle = "#e0262e"; g.fillText("IS IT READY YET?", w / 2, 56); g.font = F(36, 1, 800); g.fillStyle = INK; g.fillText("PRESS TO ASK", w / 2, 106); });
  E.plane(0.86, 0.2, E.mat("#ffffff", { map: bl }), [3.0, 0.96, -4.83], { noShadow: true });
  // price board + window with the street plate
  const pb = card(512, 300, (g, w, h) => { g.fillStyle = "#2a2030"; g.fillRect(0, 0, w, h); g.lineWidth = 14; g.strokeStyle = "#c79a5b"; g.strokeRect(7, 7, w - 14, h - 14); g.font = F(64); g.textAlign = "center"; g.fillStyle = "#ffffff"; g.fillText("MENU", w / 2, 80); g.textAlign = "left"; g.font = F(58, 1, 800); g.fillText("COFFEE", 40, 170); g.fillText("DONUT", 40, 250); g.textAlign = "right"; g.fillStyle = "#ffe14a"; g.fillText("$9", w - 40, 170); g.fillText("$1", w - 40, 250); });
  R.priceBoard = E.plane(1.4, 0.82, E.mat("#ffffff", { map: pb }), [-2.9, 3.25, -4.92], { noShadow: true });
  R.winL = live(1024, 800); R.win = E.plane(2.0, 1.6, E.flat("#ffffff", { map: R.winL.tex, fog: false }), [-6.6, 2.1, -4.95], { noink: true, noShadow: true });
  for (const [w2, h2, x, y] of [[2.2, 0.12, -6.6, 2.94], [2.2, 0.12, -6.6, 1.26], [0.12, 1.8, -7.66, 2.1], [0.12, 1.8, -5.54, 2.1], [0.08, 1.6, -6.6, 2.1]]) E.box(w2, h2, 0.1, M("#ffffff"), [x, y - h2 / 2, -4.9]);
  R.setWin = (lit) => R.winL.set("w" + lit.toFixed(2), (g, w, h) => { g.fillStyle = "#0b0e24"; g.fillRect(0, 0, w, h); g.fillStyle = "#151a3a"; g.fillRect(0, h * 0.78, w, h); for (let b = 0; b < 4; b++) { const bx = b * 260 - 10; g.fillStyle = ["#241f3e", "#2a2446", "#1f1b36", "#29223f"][b]; g.fillRect(bx, 120 + (b % 2) * 60, 240, h); for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) { const on = lit > 0.5; g.fillStyle = on ? "#7ff6ff" : "#141226"; g.fillRect(bx + 24 + c * 72, 170 + (b % 2) * 60 + r * 100, 46, 60); if (on) { g.fillStyle = "rgba(127,246,255,0.25)"; g.fillRect(bx + 16 + c * 72, 162 + (b % 2) * 60 + r * 100, 62, 76); } } }
    g.fillStyle = "#e8e0ff"; g.beginPath(); g.arc(880, 70, 34, 0, 7); g.fill(); });
  R.setWin(0);
  // TV screen on a stack of crates at the left, facing +x; Toast's upturned crate in front of it
  const crate = (x, y, z, rot = 0, parent) => { const g = E.group(parent || null, [x, y, z], rot); E.box(0.9, 0.5, 0.6, M("#ff7fb8", { map: E.T.planks("#ff7fb8", 4) }), [0, 0, 0], { parent: g }); const lab = card(256, 96, (gg, w, h) => { gg.fillStyle = "#ff7fb8"; gg.fillRect(0, 0, w, h); gg.font = F(40); gg.textAlign = "center"; gg.fillStyle = "#ffffff"; gg.fillText("DONUTS", w / 2, 62); }); E.plane(0.7, 0.26, E.mat("#ffffff", { map: lab }), [0, 0.25, 0.305], { parent: g, noShadow: true }); return g; };
  R.TVX = -4.7; R.TVZ = 0.7; crate(R.TVX, 0, R.TVZ, Math.PI / 2); crate(R.TVX, 0.5, R.TVZ, Math.PI / 2);
  R.tv = E.group(null, [R.TVX, 1.0, R.TVZ], Math.PI / 2); E.box(1.5, 0.95, 0.12, M("#1a1a22"), [0, 0.12, 0], { parent: R.tv }); E.box(0.3, 0.12, 0.3, M("#1a1a22"), [0, 0, 0], { parent: R.tv });
  R.scrL = live(1024, 600); R.scr = E.plane(1.36, 0.8, E.flat("#ffffff", { map: R.scrL.tex, fog: false }), [0, 0.6, 0.065], { parent: R.tv, noink: true, noShadow: true });
  R.seat = crate(-3.2, 0, 0.7, Math.PI / 2);
  R.screenLight = new THREE.PointLight("#59e6ff", 0, 9, 1.6); R.screenLight.position.set(R.TVX + 0.6, 1.6, R.TVZ); E.scene.add(R.screenLight);
  // Donutsaurus's bed (open donut box) + router with plug
  R.bed = E.group(null, [5.3, 0, -0.9], -0.4); E.box(2.6, 0.35, 2.0, M("#ff9fca"), [0, 0, 0], { parent: R.bed }); E.box(2.6, 0.06, 2.0, M("#fff6fb"), [0, 0.35, 0], { parent: R.bed }); const lid = E.box(2.6, 1.4, 0.08, M("#ff9fca"), [0, 0.35, -1.0], { parent: R.bed });
  R.router = E.group(null, [6.9, 0, 0.6]); E.box(0.5, 0.12, 0.34, M("#f4f4f6"), [0, 0, 0], { parent: R.router }); for (const x of [-0.18, 0.18]) E.box(0.04, 0.4, 0.04, M("#f4f4f6"), [x, 0.12, -0.12], { parent: R.router }); R.routerLed = E.box(0.06, 0.04, 0.02, E.flat("#39ff6a"), [0.12, 0.06, 0.171], { parent: R.router, noShadow: true });
  R.plug = E.group(null, [7.55, 0.1, 0.6]); E.box(0.14, 0.2, 0.12, M("#f4f4f6"), [0, 0, 0], { parent: R.plug }); R.socket = E.box(0.4, 0.1, 0.24, M("#ffffff"), [5.0, 0, 1.4]);
  R.cable = E.box(0.03, 0.03, 1, M("#e8e8e8"), [0, 0, 0], { noShadow: true, center: true });
  R.setCable = () => { const a = new THREE.Vector3(7.1, 0.06, 0.6), b = R.plug.position.clone(); const m = a.clone().add(b).multiplyScalar(0.5); R.cable.position.copy(m); R.cable.scale.z = a.distanceTo(b); R.cable.lookAt(b); };
  // bottle, cups, parcel, case
  R.bottle = E.group(null, [-1.6, 1.2, -1.6]); E.cyl(0.08, 0.08, 0.34, M("#a8dcff", { transparent: true, opacity: 0.8 }), [0, 0, 0], { parent: R.bottle, seg: 12 }); E.cyl(0.05, 0.05, 0.06, M("#2f6fe0"), [0, 0.34, 0], { parent: R.bottle, seg: 10 }); E.cyl(0.081, 0.081, 0.12, M("#2f6fe0"), [0, 0.1, 0], { parent: R.bottle, seg: 12 });
  R.cups = [0, 1].map(() => cup(E)); R.parcel = E.group(null, [0, -50, 0]); E.box(0.9, 0.6, 0.7, M("#9b4dff"), [0, 0, 0], { parent: R.parcel }); E.box(0.92, 0.62, 0.12, M("#ffe14a"), [0, 0, 0], { parent: R.parcel }); E.box(0.12, 0.62, 0.72, M("#ffe14a"), [0, 0, 0], { parent: R.parcel });
  return R;
}
/** CAFÉ TOAST — $0 paper cup */
export function cup(E) { const g = E.group(null, [0, -50, 0]); E.cyl(0.13, 0.1, 0.32, E.mat("#ffffff"), [0, 0, 0], { parent: g, seg: 16 }); E.cyl(0.14, 0.14, 0.05, E.mat("#7a4a2a"), [0, 0.32, 0], { parent: g, seg: 16 });
  const t = card(512, 160, (gg, w, h) => { gg.fillStyle = "#ffffff"; gg.fillRect(0, 0, w, h); gg.font = F(56); gg.textAlign = "center"; gg.fillStyle = "#ff3d7f"; gg.fillText("CAFÉ TOAST", w / 2, 66); gg.font = F(52); gg.fillStyle = INK; gg.fillText("$0", w / 2, 130); });
  const lab = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.112, 0.16, 16, 1, true, -0.9, 1.8), E.mat("#ffffff", { map: t })); lab.position.y = 0.16; E.add(lab, g); return g; }
/** draw on the home TV / insert screens */
export function drawScreen(g, w, h, st) {
  const S = st.s || "off"; g.fillStyle = "#0a0c18"; g.fillRect(0, 0, w, h); g.textAlign = "center"; g.textBaseline = "middle";
  if (S === "off") return;
  if (S === "down") { g.fillStyle = "#2a0608"; g.fillRect(0, 0, w, h); g.fillStyle = "#9aa0ad"; for (const [x, y, r] of [[w / 2 - 70, 190, 60], [w / 2, 160, 80], [w / 2 + 80, 195, 55]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); } g.fillRect(w / 2 - 130, 190, 260, 60); g.fillStyle = "#2a0608"; g.fillRect(w / 2 - 34, 200, 14, 14); g.fillRect(w / 2 + 20, 200, 14, 14); g.lineWidth = 8; g.strokeStyle = "#2a0608"; g.beginPath(); g.arc(w / 2, 250, 26, Math.PI * 1.15, Math.PI * 1.85); g.stroke();
    g.font = F(70); g.fillStyle = "#ff3d3d"; g.fillText("SERVERS: DOWN", w / 2, 340); g.font = F(36, 1, 800); g.fillStyle = "#ffffff"; g.fillText("TOO MANY PLAYERS.", w / 2, 410); g.fillText("YOUR PLACE IN LINE: 9,999,999", w / 2, 460); return; }
  if (S === "up") { g.font = F(64); g.fillStyle = "#7dff7a"; g.fillText("SERVERS: UP", w / 2, 260); g.font = F(48); g.fillStyle = "#ffe14a"; g.fillText("(MOSTLY)", w / 2, 340); return; }
  if (S === "code") { g.font = F(40, 1, 800); g.fillStyle = "#cfc6ff"; g.fillText("ENTER YOUR CODE", w / 2, 60); g.fillStyle = "#1e1838"; g.fillRect(40, 92, w - 80, 70); g.font = "700 30px monospace"; g.fillStyle = "#ffffff"; g.textAlign = "left"; g.fillText(st.code || "", 56, 128); g.textAlign = "center";
    const keys = "QWERTYUIOP ASDFGHJKL ZXCVBNM"; keys.split(" ").forEach((row, r) => row.split("").forEach((c, i) => { const x = w / 2 + (i - row.length / 2 + 0.5) * 82, y = 230 + r * 88; const on = st.key === c; g.fillStyle = on ? "#ffe14a" : "#2e2850"; rr(g, x - 36, y - 36, 72, 72, 12); g.fill(); g.fillStyle = on ? INK : "#ffffff"; g.font = F(40); g.fillText(c, x, y + 2); }));
    if (st.msg) { g.fillStyle = st.msg === "CODE INVALID" ? "#ff3d3d" : "#7dff7a"; rr(g, w / 2 - 300, 470, 600, 100, 20); g.fill(); g.font = F(64); g.fillStyle = "#ffffff"; g.fillText(st.msg, w / 2, 522); } return; }
  if (S === "patch") { const pct = st.pct ?? 99, green = pct >= 100; g.font = F(52); g.fillStyle = "#ffffff"; g.fillText(st.title || "INSTALLING PATCH…", w / 2, 80); g.fillStyle = "#2e2850"; rr(g, 90, 140, w - 180, 56, 28); g.fill(); g.fillStyle = green ? "#7dff7a" : "#19e0c6"; rr(g, 90, 140, (w - 180) * pct / 100, 56, 28); g.fill(); g.font = F(60); g.fillStyle = green ? "#7dff7a" : "#ffe14a"; g.fillText(pct + "%", w / 2, 250);
    g.font = F(56); g.fillStyle = "#ffffff"; g.fillText("TIME LEFT: " + (st.left || "13 MINUTES"), w / 2, 335);
    if (st.btn !== false) { const by = 470; g.fillStyle = st.press ? "#a01818" : "#e0262e"; rr(g, w / 2 - 290, by - 62, 580, 124, 62); g.fill(); g.lineWidth = 8; g.strokeStyle = "#ffffff"; g.stroke(); starIcon(g, w / 2 - 210, by, 40); g.font = F(54); g.fillStyle = "#ffffff"; g.fillText("IS IT READY YET?", w / 2 + 40, by + 4); } return; }
  if (S === "start") { const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, "#ff8a5a"); grd.addColorStop(1, "#3a1a6a"); g.fillStyle = grd; g.fillRect(0, 0, w, h); g.font = F(84); g.lineWidth = 14; g.strokeStyle = INK; g.strokeText("MEGA DONUT HEIST 2", w / 2, 200); g.fillStyle = "#ffe14a"; g.fillText("MEGA DONUT HEIST 2", w / 2, 200); g.font = F(56); g.fillStyle = "#ffffff"; g.fillText(st.sub || "PRESS START", w / 2, 380); return; }
}

// ---------------- bread Toast (four toasting stages) ----------------
export const BREAD = [["#f8f1de", "#e6cf9a"], ["#f1dfb0", "#d6b06c"], ["#e6b25e", "#b0702a"], ["#b5743a", "#6e4019"]];
export function makeBread(E, stage = 0) {
  const [c, crust] = BREAD[stage];
  const P = blocky(E, { skin: c, shirt: c, sleeve: c, pants: c, shoe: "#f4f4f4", face: { skin: c, gap: true, iris: "#4a2c1a", brow: crust, cheek: "rgba(255,150,120,0.25)" },
    build: (P, E, M) => { const { HW, HH, HD, TH } = P.dims, cr = M(crust);
      // bread-slice head: muffin top (two lobes) + crust rim behind the face
      for (const s of [-1, 1]) E.box(HW * 0.62, 0.34, HD * 0.96, M(c), [s * HW * 0.26, HH - 0.02, 0], { parent: P.head });
      for (const s of [-1, 1]) E.box(HW * 0.66, 0.1, HD * 1.0, cr, [s * HW * 0.26, HH + 0.32, 0], { parent: P.head });
      E.box(HW + 0.08, HH + 0.38, 0.1, cr, [0, -0.02, -HD / 2 - 0.02], { parent: P.head });
      for (const s of [-1, 1]) E.box(0.08, HH + 0.3, HD + 0.02, cr, [s * (HW / 2 + 0.03), 0, 0], { parent: P.head });
      E.box(0.84, 0.08, 0.5, cr, [0, 0, 0], { parent: P.torso }); for (const s of [-1, 1]) E.box(0.06, TH, 0.48, cr, [s * 0.42, 0, 0], { parent: P.torso });
      if (stage === 2) { const hd = M("#ff8a1f"), dk = M("#e06a10"); E.box(1.32, TH + 0.34, 0.74, hd, [0, -0.28, 0], { parent: P.torso }); E.box(0.6, 0.3, 0.06, dk, [0, -0.05, 0.38], { parent: P.torso }); E.box(1.3, 0.7, 0.4, hd, [0, TH - 0.1, -0.5], { parent: P.torso });
        P.elbows.forEach((e) => E.box(0.42, 0.62, 0.44, hd, [0, -0.46, 0], { parent: e })); P.arms.forEach((a) => E.box(0.44, 0.42, 0.46, hd, [0, -0.26, 0], { parent: a })); }
    } });
  return P;
}

// ---------------- game case (cover, sticker, tray, slip) ----------------
export function gameCase(E) {
  const R = { g: E.group(null, [0, -50, 0]) }, M = (c) => E.mat(c);
  const cover = card(512, 680, (g, w, h) => { const grd = g.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, "#ff9a5a"); grd.addColorStop(0.55, "#ff4fa3"); grd.addColorStop(1, "#4a1a7a"); g.fillStyle = grd; g.fillRect(0, 0, w, h);
    g.fillStyle = "#ffe14a"; g.beginPath(); g.arc(w / 2, h * 0.62, 170, Math.PI, 0); g.fill(); g.fillStyle = "rgba(74,26,122,0.6)"; for (let i = 0; i < 5; i++) g.fillRect(0, h * 0.64 + i * 26, w, 10);
    g.lineWidth = 70; g.strokeStyle = "#e7b06a"; g.beginPath(); g.arc(w / 2, h * 0.5, 100, 0, 7); g.stroke(); g.lineWidth = 50; g.strokeStyle = "#ff7fb8"; g.beginPath(); g.arc(w / 2, h * 0.5, 100, Math.PI * 1.05, Math.PI * 1.95); g.stroke(); g.fillStyle = "#111"; g.fillRect(w / 2 - 130, h * 0.43, 110, 40); g.fillRect(w / 2 + 20, h * 0.43, 110, 40); g.fillRect(w / 2 - 22, h * 0.435, 44, 12);
    g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(76); g.lineWidth = 14; g.strokeStyle = INK; g.strokeText("MEGA DONUT", w / 2, 80); g.fillStyle = "#fff"; g.fillText("MEGA DONUT", w / 2, 80); g.strokeText("HEIST 2", w / 2, 160); g.fillStyle = "#ffe14a"; g.fillText("HEIST 2", w / 2, 160);
    g.save(); g.translate(400, 250); g.rotate(0.2); g.fillStyle = "#ff3d3d"; g.beginPath(); for (let i = 0; i < 24; i++) { const r = i % 2 ? 70 : 100, a = i / 24 * Math.PI * 2; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.fill(); g.font = F(34); g.fillStyle = "#fff"; g.fillText("13 YEARS", 0, -14); g.font = F(24, 1, 800); g.fillText("IN THE MAKING", 0, 18); g.restore();
    // yellow sticker
    g.save(); g.translate(150, 610); g.rotate(-0.05); g.fillStyle = "#ffe14a"; rr(g, -130, -55, 260, 110, 12); g.fill(); g.lineWidth = 5; g.strokeStyle = INK; g.stroke(); g.font = F(20, 1, 900); g.fillStyle = INK; g.fillText("DAY-ONE PATCH REQUIRED.", 0, -22); g.fillStyle = "#d8262e"; g.font = F(26, 1, 900); g.fillText("DO NOT PLAY", 0, 8); g.fillStyle = INK; g.font = F(20, 1, 900); g.fillText("BEFORE 100%.", 0, 34); g.restore(); });
  R.coverTex = cover;
  R.base = E.group(R.g, [0, 0, 0]); E.box(0.56, 0.06, 0.74, M("#5a2a9a"), [0, 0, 0], { parent: R.base }); R.tray = E.cyl(0.2, 0.2, 0.012, M("#3a1a6a"), [0, 0.06, 0], { parent: R.base, seg: 24 }); E.cyl(0.04, 0.04, 0.02, M("#2a1050"), [0, 0.065, 0], { parent: R.base, seg: 12 });
  R.lid = E.group(R.g, [-0.28, 0.06, 0]); E.box(0.56, 0.03, 0.74, M("#5a2a9a"), [0.28, 0, 0], { parent: R.lid }); R.coverMesh = E.plane(0.54, 0.72, E.mat("#ffffff", { map: cover }), [0.28, 0.032, 0], { parent: R.lid, rot: [-Math.PI / 2, 0, 0], noShadow: true });
  const slipT = card(512, 256, (g, w, h) => { g.fillStyle = "#fffdf4"; g.fillRect(0, 0, w, h); g.font = F(44); g.textAlign = "center"; g.fillStyle = "#d8262e"; g.fillText("DISC NOT INCLUDED.", w / 2, 64); g.font = "700 21px monospace"; g.fillStyle = INK; g.fillText("CODE: X7Q2-M9DK-4LZP-88RT-WQ0B-", w / 2, 140); g.fillText("H3NV-6YJS-T1EC-5GUA-K0FX", w / 2, 172); });
  R.slip = E.plane(0.4, 0.2, E.mat("#ffffff", { map: slipT, side: THREE.DoubleSide }), [0, -50, 0], { noShadow: true }); R.slipTex = slipT;
  /** open 0..1 (lid angle) */
  R.set = (pos, rot = [0, 0, 0], open = 0, s = 1) => { R.g.position.set(...pos); R.g.rotation.set(...rot); R.g.scale.setScalar(s); R.lid.rotation.z = open * 2.6; };
  return R;
}
/** a little moth: body + flapping wings */
export function moth(E) { const g = E.group(null, [0, -50, 0]); E.box(0.04, 0.04, 0.12, E.mat("#8a7a66"), [0, 0, 0], { parent: g, center: true }); const w = [-1, 1].map((s) => { const p = E.group(g, [0, 0, 0]); E.box(0.14, 0.01, 0.1, E.mat("#c8b89c"), [s * 0.07, 0, 0], { parent: p, center: true, noShadow: true }); return p; });
  return { g, at(pos, f) { g.position.set(...pos); const a = Math.sin(f * 1.7) * 0.9; w[0].rotation.z = a; w[1].rotation.z = -a; } }; }

// ---------------- The Admin's hand helpers ----------------
export { adminHand, controller, donut };
/** limp: palm hanging down, fingers dangling, swing angle */
export function limpHand(H, pos, swing = 0, droop = 1) { H.pose({ pos, rotY: 0, palmUp: 0 }); H.g.rotation.set(0, 0, swing); H.fingers.forEach((f, i) => f.rotation.set(0.5 * droop + 0.1 * i, 0, 0)); H.palm.rotation.set(0.6 * droop, 0, 0); }

/** overlay INSERT: draw (part of) a canvas big on a darkened frame. src = canvas; rect = [sx,sy,sw,sh] in canvas px */
export const insertCanvas = (src, rect, o = {}) => (g, w, h) => { const k = K(h); g.save(); g.fillStyle = `rgba(20,12,24,${o.dim ?? 0.72})`; g.fillRect(0, 0, w, h); const [sx, sy, sw, sh] = rect || [0, 0, src.width, src.height];
  const H = (o.h || 900) * k, W = H * sw / sh; g.translate(w / 2 + (o.dx || 0) * k, h / 2 + (o.dy || 0) * k); g.rotate(o.rot ?? -0.03); g.scale(o.s || 1, o.s || 1); g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(-W / 2 + 18 * k, -H / 2 + 22 * k, W, H); g.drawImage(src, sx, sy, sw, sh, -W / 2, -H / 2, W, H); g.lineWidth = 6 * k; g.strokeStyle = INK; g.strokeRect(-W / 2, -H / 2, W, H); g.restore(); };
