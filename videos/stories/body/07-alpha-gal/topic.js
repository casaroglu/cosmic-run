// "A tick bite can make you allergic to meat" (alpha-gal syndrome) — topic file (engine + common.js cast system + icons2.js)
// Visual rework 2026-11-21 in the "interacting icons" style (ep 11+): every phrase gets a picture, and the pictures act on each other.
const TICK = '#8a3a26', TICK2 = '#6a2a1a', TURKEY = '#c8793a', TURKEY2 = '#9a5524', SPROUT = '#6fae4a', SPROUT2 = '#4d8a32', AGAL = '#ffd98a';
const RED = '#e2457a';
function hexTag(x, y, r, c = AGAL) { ctx.fillStyle = c; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.fill(); }

// ---------- heroes drawn as icons ----------
function tickAt(t, x, y, s, o = {}) {   // a lone star tick seen from above: 8 walking legs, mouthparts, the white spot
  const g = t * (o.speed ?? 6), fed = o.fed || 0, C1 = o.col || TICK, C2 = o.col2 || TICK2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  for (let i = 0; i < 4; i++) for (const sd of [-1, 1]) { const ph = g + i * 1.3 + (sd > 0 ? Math.PI : 0), sw = Math.sin(ph) * 0.25; ctx.save(); ctx.translate(sd * 46, -40 + i * 26); ctx.rotate(sd * (0.4 + i * 0.32 - 0.5) + sw); rr2(0, -7, sd * 70, 14, 7, C2); ctx.translate(sd * 66, 0); ctx.rotate(sd * 0.7); rr2(0, -5, sd * 50, 10, 5, C2); ctx.restore(); }
  ctx.fillStyle = C2; ctx.beginPath(); ctx.moveTo(-18, -96); ctx.lineTo(18, -96); ctx.lineTo(10, -126); ctx.lineTo(-10, -126); ctx.fill(); for (const sd of [-1, 1]) rr2(sd * 14 - 4, -140, 8, 30, 4, C2);   // mouthparts
  const b = 1 + fed * 0.5; ctx.fillStyle = C1; ctx.beginPath(); ctx.ellipse(0, 0, 70 * b, 96 * (1 + fed * 0.3), 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = o.scut || '#a8452f'; ctx.beginPath(); ctx.ellipse(0, -40, 52, 50, 0, 0, 6.283); ctx.fill();   // scutum
  if (!o.nostar) { const p = 0.85 + 0.15 * Math.sin(t * 3); circ(0, -12, 15 * p, '#fff8e8'); circ(0, -12, 7, '#ffffff'); }   // the "lone star"
  for (let i = 0; i < 6; i++) rr2(-50 + i * 20, 40, 6, 30, 3, 'rgba(0,0,0,0.15)'); rr2(-40, -70, 26, 10, 5, 'rgba(255,255,255,0.3)');
  ctx.restore();
}
function cellBody(t, r, tags, col, face) {   // a cell; `tags` 0..1 = how many alpha-gal sugar tags sit on its surface
  const b = 1 + Math.sin(t * 2) * 0.03; ctx.save(); ctx.scale(b, b); circ(0, 0, r, col); circ(0, 0, r * 0.82, 'rgba(255,255,255,0.18)'); circ(r * 0.15, r * 0.1, r * 0.3, 'rgba(120,60,160,0.45)');
  const n = Math.round(12 * clamp(tags)); for (let i = 0; i < n; i++) { const a = i / 12 * 6.283 + t * 0.15; ctx.save(); ctx.translate(Math.cos(a) * r, Math.sin(a) * r); ctx.rotate(a + Math.PI / 2); rr2(-2, -12, 4, 12, 2, '#e8dcc4'); hexTag(0, -18, 8 + Math.sin(t * 3 + i) * 1.2); ctx.restore(); }
  if (face) eyes(t, -4, -6, 12, 5, '#20232f', 0.7);
  ctx.restore();
}
function usMap(t, x0, y0, w, h, spread) {   // stylised contiguous US; the tick range grows from the south-east by `spread` 0..1 (a backdrop panel)
  const P = [[-124.7, 48.4], [-123, 46], [-124.2, 42], [-120.5, 34.5], [-117.1, 32.5], [-114.7, 32.7], [-111, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-103.3, 29], [-101.4, 29.8], [-99.5, 27.5], [-97.2, 25.9], [-97.4, 27.8], [-94.7, 29.4], [-90.2, 29.1], [-89.4, 30.2], [-85, 29.6], [-83, 29], [-82.7, 27.6], [-81.1, 25.1], [-80.1, 26.5], [-80.6, 28.4], [-81.4, 30.7], [-79.2, 33.2], [-76.5, 34.7], [-75.5, 35.6], [-76.3, 37], [-75, 38.4], [-74, 40.5], [-71.9, 41.3], [-70, 41.7], [-70.6, 42.7], [-70.2, 43.7], [-67, 44.8], [-67.8, 47.1], [-69.2, 47.4], [-71.5, 45], [-74.9, 45], [-76.8, 43.6], [-79.2, 43.4], [-79.1, 42.9], [-82.7, 41.7], [-83.5, 42.3], [-82.5, 45.3], [-84.6, 46.5], [-88.4, 48.3], [-89.6, 48], [-95.2, 49], [-123.3, 49]];
  const X = lo => x0 + (lo + 125) / 59 * w, Y = la => y0 + (49.5 - la) / 25 * h, path = new Path2D(); P.forEach(([a, b], i) => i ? path.lineTo(X(a), Y(b)) : path.moveTo(X(a), Y(b))); path.closePath();
  ctx.fillStyle = '#f2dcb0'; ctx.fill(path); ctx.save(); ctx.clip(path); const cx = X(-86), cy = Y(32), R = lerp(0.3, 0.78, spread) * w * (1 + 0.02 * Math.sin(t * 2));
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, 'rgba(200,85,61,0.85)'); g.addColorStop(0.75, 'rgba(200,85,61,0.55)'); g.addColorStop(1, 'rgba(200,85,61,0)'); ctx.fillStyle = g; ctx.fillRect(x0, y0, w, h); ctx.restore();
}
const mapG = (x0, y0, w, h) => ({ x0, y0, w, h, X: lo => x0 + (lo + 125) / 59 * w, Y: la => y0 + (49.5 - la) / 25 * h });
function underMap(m, spread) {   // draws the map inside a beat, following the beat's slow push-in; registered as a panel (icons may sit on it)
  return (t, P, scr, zk) => { const [ox, oy] = scr(0, 0), sp = typeof spread === 'function' ? spread(t) : spread; ctx.save(); ctx.translate(ox, oy); ctx.scale(zk, zk); usMap(t, m.x0, m.y0, m.w, m.h, sp); ctx.restore();
    const [a, b] = scr(m.x0, m.y0), [c, d] = scr(m.x0 + m.w, m.y0 + m.h); reg('panel', 'us map', a, b, c, d); };
}
function skinBand(y) { return (t, P, scr, zk) => { const [, yy] = scr(0, y); rr2(0, yy, W, H - yy + 20, 0, SKIN); rr2(0, yy, W, 26, 0, '#e9a27f'); for (let i = 0; i < 14; i++) circ((i * 151 + 40) % W, yy + 80 + (i * 67) % 180, 6, 'rgba(200,120,90,0.35)'); reg('panel', 'skin', 0, yy, W, H); }; }

// ---------- icons (±64 units; drawn at scale ≥ 1.6 → ≥ 200 px) ----------
Object.assign(ICONS, {
  tickI(t, o) { ctx.save(); ctx.scale(0.5, 0.5); tickAt(t, 0, 10, 1, o); ctx.restore(); },
  larvae(t) { for (let i = 0; i < 6; i++) { const a = i * 1.05 + 0.4, r = 34 + (i % 2) * 16, x = Math.cos(a) * r + Math.sin(t * 2 + i) * 4, y = Math.sin(a) * r * 0.8; ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.sin(t * 3 + i) * 0.3); ctx.scale(0.16, 0.16); tickAt(t + i, 0, 0, 1, { nostar: 1, col: '#b0603a', scut: '#c8704a', speed: 10 }); ctx.restore(); } },
  mite(t) { const g = t * 9; ctx.save(); for (let i = 0; i < 4; i++) for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 26, -24 + i * 16); ctx.rotate(sd * (i * 0.35 - 0.4) + Math.sin(g + i + sd) * 0.2); rr2(0, -4, sd * 44, 8, 4, '#b8202a'); ctx.restore(); }
    ell(0, 4, 40, 46, '#e2322e'); ell(0, -34, 20, 16, '#c8242a'); ell(-12, -8, 12, 18, 'rgba(255,255,255,0.3)'); for (let i = 0; i < 8; i++) circ(-24 + (i % 4) * 16, 4 + Math.floor(i / 4) * 22, 3, 'rgba(255,220,200,0.7)'); ctx.restore(); },
  agal(t, o) {   // alpha-gal: a little chain of two sugar rings (gold hexagons) on a stalk; o.bad turns it into an angry red "enemy"
    const p = 1 + 0.06 * Math.sin(t * 3), bad = o.bad, c1 = bad ? '#e2457a' : AGAL, c2 = bad ? '#b02a4a' : '#e0a92a'; ctx.save(); ctx.scale(p, p);
    rr2(-5, 20, 10, 44, 5, '#e8dcc4'); hexTag(-22, -12, 36, c2); hexTag(-22, -12, 26, c1); hexTag(30, 22, 26, c2); hexTag(30, 22, 18, c1); rr2(-4, -2, 26, 12, 6, c2);
    circ(-22, -12, 9, bad ? '#7a1f33' : '#fff3c8'); circ(30, 22, 6, bad ? '#7a1f33' : '#fff3c8');
    if (bad) { rr2(-44, -40, 18, 6, 3, '#20232f'); rr2(-16, -40, 18, 6, 3, '#20232f'); } ctx.restore(); if (!bad) glint(t, 40, 40); },
  cellG(t, o) { cellBody(t, 52, o.tags ?? 1, o.col || '#f29db0', o.face); },
  germG(t, o) { ctx.save(); ctx.rotate(Math.sin(t * 1.3) * 0.15); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + t * 0.5; ctx.strokeStyle = '#5fd38a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 40, Math.sin(a) * 40); ctx.quadraticCurveTo(Math.cos(a + 0.3) * 56, Math.sin(a + 0.3) * 56, Math.cos(a) * 64, Math.sin(a) * 64); ctx.stroke(); }
    ctx.restore(); cellBody(t, 44, o.tags ?? 1, '#7fd36b', 1); },
  ab(t, o) {   // a Y-shaped antibody; o.col (blue = everyday anti-Gal, red = allergic IgE), o.fade 0..1 fades it out
    ctx.save(); ctx.rotate(Math.sin(t * 1.5) * 0.15); ctx.globalAlpha *= 1 - 0.7 * (o.fade || 0); const c = o.col || '#8fd8e6'; rr2(-9, -4, 18, 72, 9, c); for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * 0.7); rr2(-9, -66, 18, 66, 9, c); circ(0, -68, 13, '#ffffff'); ctx.restore(); } rr2(-4, 10, 6, 40, 3, 'rgba(255,255,255,0.35)'); ctx.restore(); },
  mast(t, o) { const pop = o.burst ? 1 : Math.max(0, Math.sin(t * 1.4)); circ(0, 0, 60, '#b48cff'); circ(0, 0, 50, '#c4a2ff'); circ(10, 6, 20, '#7f5fd6'); for (let i = 0; i < 14; i++) { const a = i * 0.45 + 0.3 + t * 0.2, d = 30 + pop * 50 * (i % 2) + (o.burst ? (t * 60) % 30 : 0); circ(Math.cos(a) * d, Math.sin(a) * d * 0.9, 7, '#ff8f4a'); } eyes(t, -6, -18, 12, 5, '#20232f', 0.3); },
  steak(t) { ctx.save(); ctx.scale(1.15, 1.15); ctx.fillStyle = '#b8323a'; ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(-60, -50, 0, -46); ctx.quadraticCurveTo(70, -44, 72, 0); ctx.quadraticCurveTo(70, 40, 10, 44); ctx.quadraticCurveTo(-60, 46, -70, -10); ctx.fill(); ctx.strokeStyle = '#f3e3d0'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-58, -8); ctx.quadraticCurveTo(-50, -40, 0, -38); ctx.stroke(); circ(20, 4, 14, '#f3e3d0'); for (let i = 0; i < 3; i++) rr2(-40 + i * 30, -20, 6, 50, 3, 'rgba(60,20,20,0.35)'); ctx.restore(); puff(t, 0, -56, 3, -1, 'rgba(255,255,255,0.4)', 9); },
  burger2(t) { const b = Math.abs(Math.sin(t * 3)) * 0.05; ctx.save(); ctx.scale(1.1 + b, 1.1 - b); rr2(-60, -44, 120, 38, 19, '#f2a65a'); rr2(-64, -10, 128, 12, 6, '#5aa96a'); rr2(-62, 2, 124, 20, 10, '#7a4a2c'); rr2(-64, 22, 128, 8, 4, '#ffd36b'); rr2(-60, 30, 120, 22, 11, '#f2a65a'); for (const [x, y] of [[-20, -32], [10, -36], [32, -28]]) circ(x, y, 3, '#fff7e0'); ctx.restore(); },
  sausage(t) { ctx.save(); ctx.rotate(-0.3 + Math.sin(t * 1.6) * 0.08); rr2(-74, -24, 148, 48, 24, '#b0503a'); rr2(-66, -18, 132, 18, 9, '#c8684a'); for (let i = 0; i < 4; i++) rr2(-44 + i * 26, -22, 8, 14, 4, '#7a2a1a'); circ(-78, 0, 8, '#d9c7a0'); circ(78, 0, 8, '#d9c7a0'); ctx.restore(); puff(t, 0, -40, 3, -1, 'rgba(255,255,255,0.4)', 8); },
  peanut(t) { ctx.save(); ctx.rotate(0.5 + Math.sin(t * 2) * 0.1); ell(0, -28, 32, 36, '#d9a35a'); ell(0, 30, 34, 38, '#d9a35a'); ell(0, 2, 24, 18, '#d9a35a'); for (let i = 0; i < 6; i++) circ(-14 + (i % 3) * 14, -36 + Math.floor(i / 3) * 60, 3, '#b07a3a'); rr2(-20, -50, 10, 30, 5, 'rgba(255,255,255,0.3)'); ctx.restore(); },
  milk(t) { ctx.save(); ctx.scale(1.15, 1.15); rr2(-36, -50, 72, 110, 8, '#f3f7fb'); ctx.fillStyle = '#c9d6ec'; ctx.beginPath(); ctx.moveTo(-36, -50); ctx.lineTo(0, -80); ctx.lineTo(36, -50); ctx.fill(); rr2(-36, -10, 72, 30, 4, '#5aa9e6'); font(18, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('MILK', 0, 6); ctx.restore(); },
  cheese(t) { ctx.save(); ctx.scale(1.2, 1.2); ctx.fillStyle = '#ffcf4a'; ctx.beginPath(); ctx.moveTo(-70, 30); ctx.lineTo(70, 30); ctx.lineTo(70, -10); ctx.lineTo(-70, -40); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffe58a'; ctx.beginPath(); ctx.moveTo(-70, -40); ctx.lineTo(70, -10); ctx.lineTo(50, -24); ctx.lineTo(-60, -50); ctx.fill(); for (const [x, y, r] of [[-30, 6, 10], [20, 12, 8], [44, -2, 6]]) circ(x, y, r, '#e0a92a'); ctx.restore(); },
  gummy(t) { const sq = Math.sin(t * 4) * 0.08; ctx.save(); ctx.scale(1.2 + sq, 1.2 - sq); ctx.fillStyle = '#ff7a9a'; ctx.beginPath(); ctx.ellipse(0, 10, 40, 46, 0, 0, 6.283); ctx.fill(); circ(-26, -34, 16, '#ff7a9a'); circ(26, -34, 16, '#ff7a9a'); circ(-14, -4, 5, '#20232f'); circ(14, -4, 5, '#20232f'); rr2(-26, 10, 14, 30, 7, 'rgba(255,255,255,0.35)'); ctx.restore(); },
  marsh(t) { const j = Math.abs(Math.sin(t * 3)) * 6; for (const [x, y, k] of [[-30, 26, 0], [30, 26, 1], [0, -26, 2]]) { const jj = k === 2 ? j : 0; ctx.save(); ctx.translate(x, y - jj); rr2(-30, -30, 60, 58, 22, '#fdf3f6'); rr2(-30, -30, 60, 20, 18, '#ffffff'); rr2(-20, -10, 10, 24, 5, 'rgba(255,190,210,0.6)'); ctx.restore(); } },
  capsule(t) { ctx.save(); ctx.scale(1.2, 1.2); ctx.rotate(-0.6 + Math.sin(t * 2) * 0.15); rr2(-70, -26, 70, 52, 26, '#e2457a'); rr2(0, -26, 70, 52, 26, '#f3f7fb'); rr2(-56, -16, 40, 10, 5, 'rgba(255,255,255,0.45)'); ctx.restore(); },
  jelly(t) { const w = Math.sin(t * 5) * 0.06; ell(0, 50, 70, 16, '#f3f7fb'); ctx.save(); ctx.translate(0, 44); ctx.transform(1, 0, w, 1, 0, 0); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(-56, 0); ctx.lineTo(-44, -84); ctx.quadraticCurveTo(0, -100, 44, -84); ctx.lineTo(56, 0); ctx.closePath(); ctx.fill(); rr2(-50, -40, 100, 10, 5, '#ff6f8f'); rr2(-36, -76, 12, 60, 6, 'rgba(255,255,255,0.4)'); circ(0, -96, 12, '#c8202a'); ctx.restore(); },
  grill(t) { ctx.save(); ctx.scale(1.1, 1.1); ctx.fillStyle = '#3a3f5a'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, Math.PI); ctx.fill(); rr2(-80, -8, 160, 12, 6, '#5b6585'); rr2(-6, 60, 12, 40, 6, '#3a3f5a'); for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 30, 64); ctx.rotate(sd * 0.4); rr2(-5, 0, 10, 40, 5, '#3a3f5a'); ctx.restore(); }
    ctx.save(); ctx.translate(0, -18); ctx.scale(0.55, 0.55); ICONS.burger2(t); ctx.restore(); for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.7; circ(-30 + i * 30 + Math.sin(p * 6) * 10, -50 - p * 60, 14 + p * 14, 'rgba(220,220,230,0.8)'); ctx.restore(); } ctx.restore(); },
  cow(t) { rr2(-70, -30, 130, 64, 30, '#f3f7fb'); circ(-30, -10, 16, '#20232f'); circ(20, 6, 12, '#20232f'); for (const lx of [-56, -30, 24, 44]) rr2(lx, 26, 14, 36 + Math.sin(t * 6 + lx) * 2, 7, '#d9e0ec'); ctx.save(); ctx.translate(64, -30); ctx.rotate(Math.sin(t * 1.5) * 0.08); rr2(-10, -26, 44, 50, 18, '#f3f7fb'); rr2(10, 6, 30, 22, 11, '#f7b6c4'); circ(4, -10, 4 * (1 - blinkF(t)) + 0.5, '#20232f'); rr2(-14, -38, 10, 16, 5, '#d9c7a0'); rr2(20, -38, 10, 16, 5, '#d9c7a0'); ctx.restore(); },
  pig(t) { ctx.save(); ctx.translate(0, Math.abs(Math.sin(t * 3)) * -3); ctx.fillStyle = '#ff9fb8'; ctx.beginPath(); ctx.ellipse(-6, 0, 66, 44, 0, 0, 6.283); ctx.fill(); circ(56, -8, 30, '#ff9fb8'); rr2(74, -16, 18, 22, 9, '#ff7a9a'); circ(80, -8, 3, '#c95a7c'); circ(86, -8, 3, '#c95a7c'); circ(56, -20, 4 * (1 - blinkF(t + 1)) + 0.5, '#20232f'); ctx.fillStyle = '#ff7a9a'; ctx.beginPath(); ctx.moveTo(40, -34); ctx.lineTo(52, -54); ctx.lineTo(60, -34); ctx.fill(); for (const lx of [-50, -26, 18, 38]) rr2(lx, 30, 14, 26, 7, '#ff8fa8');
    ctx.strokeStyle = '#ff7a9a'; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i < 12; i++) { const a = i * 0.6 + t * 4; ctx.lineTo(-74 - i * 1.5 + Math.cos(a) * 6, -10 + Math.sin(a) * 6); } ctx.stroke(); ctx.restore(); },
  deer(t) { rr2(-60, -24, 110, 50, 25, '#b0753a'); for (const lx of [-50, -28, 20, 38]) rr2(lx, 20, 10, 50, 5, '#9a6530'); circ(-40, -14, 5, '#f3e3d0'); circ(-20, -6, 5, '#f3e3d0'); ctx.save(); ctx.translate(44, -20); ctx.rotate(-0.4 + Math.sin(t * 1.2) * 0.08); rr2(-10, -60, 22, 66, 11, '#b0753a'); circ(4, -66, 20, '#b0753a'); circ(14, -70, 3.5 * (1 - blinkF(t)) + 0.5, '#20232f'); ctx.strokeStyle = '#d9c7a0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 6, -82); ctx.lineTo(sd * 18, -116); ctx.moveTo(sd * 12, -100); ctx.lineTo(sd * 30, -108); ctx.stroke(); } ctx.restore(); },
  sheep(t) { const b = Math.sin(t * 2.5) * 2; for (let i = 0; i < 9; i++) circ(-50 + (i % 5) * 24, -18 + Math.floor(i / 5) * 28 + b, 22, '#f3f7fb'); for (const lx of [-44, -20, 18, 40]) rr2(lx, 24, 10, 34, 5, '#3a3f5a'); ctx.save(); ctx.translate(66, -16 + b); ctx.rotate(Math.sin(t * 1.4) * 0.1); ell(0, 0, 22, 28, '#3a3f5a'); ell(-18, -14, 14, 7, '#3a3f5a', -0.4); circ(6, -6, 4 * (1 - blinkF(t + 2)) + 0.5, '#f3f7fb'); ctx.restore(); },
  cat(t) { const tw = Math.sin(t * 3) * 0.3; ctx.strokeStyle = '#ff9f4a'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-44, 30); ctx.quadraticCurveTo(-80, 10 + tw * 30, -70, -40 + tw * 20); ctx.stroke(); ell(-6, 24, 46, 38, '#ff9f4a'); circ(14, -32, 34, '#ff9f4a');
    poly([[-14, -54], [-6, -84], [10, -60]], '#ff9f4a'); poly([[22, -60], [38, -84], [44, -50]], '#ff9f4a'); eyes(t, 14, -36, 12, 5, '#20232f', 0.4); circ(14, -24, 4, '#e2457a'); for (let i = 0; i < 3; i++) rr2(-30 + i * 14, 0, 6, 20, 3, '#e8803a'); },
  dog(t) { const w = Math.sin(t * 12) * 0.5; ctx.save(); ctx.translate(-56, -10); ctx.rotate(-0.6 + w); rr2(-5, -36, 10, 38, 5, '#c98a52'); ctx.restore(); rr2(-60, -24, 110, 50, 24, '#c98a52'); for (const lx of [-50, -26, 18, 38]) rr2(lx, 18, 12, 40, 6, '#a86a3a'); ctx.save(); ctx.translate(52, -30); circ(0, 0, 30, '#c98a52'); ell(24, 10, 18, 13, '#e8c09a'); circ(36, 4, 6, '#20232f'); ell(-16, 6, 11, 24, '#7a4a2c', 0.25 + Math.sin(t * 3) * 0.1); circ(8, -8, 4.5 * (1 - blinkF(t + 1.3)) + 0.5, '#20232f'); ctx.restore(); },
  rabbit(t) { const h = Math.abs(Math.sin(t * 3)) * 8; ctx.save(); ctx.translate(0, -h); ell(-10, 20, 48, 38, '#d9c7b0'); circ(-56, 20, 14, '#ffffff'); circ(30, -16, 28, '#d9c7b0'); ell(22, -64, 9, 30, '#d9c7b0', -0.15); ell(40, -62, 9, 30, '#d9c7b0', 0.2); ell(22, -64, 4, 20, '#f7b6c4', -0.15); circ(42, -20, 4 * (1 - blinkF(t + 0.7)) + 0.5, '#20232f'); circ(56, -10, 4, '#e2457a'); ctx.restore(); },
  ape(t) { const b = Math.sin(t * 2) * 2; ell(0, 30 + b, 58, 40, '#3a3a44'); circ(0, -18 + b, 46, '#3a3a44'); ell(0, -6 + b, 32, 26, '#6a6a78'); ell(0, -34 + b, 34, 12, '#2a2a32'); eyes(t, 0, -28 + b, 13, 5, '#f3f7fb', 1.1); circ(-8, -2 + b, 4, '#2a2a32'); circ(8, -2 + b, 4, '#2a2a32'); circ(-60, 26 + b, 16, '#3a3a44'); circ(60, 26 + b, 16, '#3a3a44'); },
  person(t) { circ(0, -50, 22, SKIN); rr2(-24, -26, 48, 70, 22, '#5b4fd6'); rr2(-20, 40, 16, 30, 8, '#2d2b7c'); rr2(4, 40, 16, 30, 8, '#2d2b7c'); ctx.save(); ctx.translate(26, -18); ctx.rotate(-1.8 + Math.sin(t * 6) * 0.4); rr2(-6, 0, 12, 40, 6, '#5b4fd6'); ctx.restore(); },
  patient(t, o) {   // a grown-up who may break out in hives (o.hives 0..1); o.mood as icons2 adult
    ICONS.adult(t, o); const n = Math.round(14 * clamp(o.hives || 0)); for (let i = 0; i < n; i++) { const x = Math.sin(i * 2.3) * 24, y = -60 + (i * 9.3) % 120, p = 0.7 + 0.3 * Math.sin(t * 4 + i); ell(x, y + Math.sin(t * 2) * 2, 7 * p, 5 * p, 'rgba(226,69,122,0.85)'); } },
  hivesI(t) {   // a forearm with raised, pulsing hives and a scratching hand
    ctx.save(); ctx.rotate(-0.35); rr2(-76, -26, 152, 52, 26, SKIN); rr2(-70, -20, 140, 12, 6, 'rgba(255,255,255,0.25)'); for (let i = 0; i < 7; i++) { const x = -54 + i * 18, y = Math.sin(i * 2.1) * 10, p = 0.8 + 0.25 * Math.sin(t * 5 + i); ell(x, y, 11 * p, 8 * p, '#ff8fa0'); ell(x, y, 6 * p, 4 * p, '#ffc2cc'); } ctx.restore();
    const sc = Math.sin(t * 14) * 10; ctx.save(); ctx.translate(30 + sc, -46); rr2(-20, -18, 40, 34, 16, '#e9a27f'); for (let i = 0; i < 3; i++) rr2(-16 + i * 12, 10, 9, 14, 4, '#e9a27f'); ctx.restore(); },
  stomach(t, o) {   // a real-looking stomach: oesophagus in at the top, J-shaped body, duodenum out at the right; churns
    const ch = Math.sin(t * (o.upset ? 9 : 3)) * (o.upset ? 0.06 : 0.03); ctx.save(); ctx.scale(1 + ch, 1 - ch); rr2(-2, -84, 22, 42, 11, '#d9707e');
    ctx.fillStyle = '#e8858f'; ctx.beginPath(); ctx.moveTo(0, -50); ctx.bezierCurveTo(-64, -74, -76, 12, -34, 46); ctx.bezierCurveTo(-4, 70, 48, 60, 58, 30); ctx.lineTo(66, 14); ctx.lineTo(46, 8); ctx.bezierCurveTo(30, 28, 2, 26, -6, 8); ctx.bezierCurveTo(-14, -14, 2, -30, 20, -48); ctx.closePath(); ctx.fill();
    rr2(56, 4, 30, 18, 9, '#d9707e'); ctx.strokeStyle = 'rgba(255,200,205,0.7)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-44 + i * 10, -20 + i * 18); ctx.quadraticCurveTo(-26 + i * 14, -6 + i * 18 + Math.sin(t * 3 + i) * 3, -8 + i * 18, 4 + i * 20); ctx.stroke(); }
    ell(-36, -30, 10, 18, 'rgba(255,255,255,0.3)', 0.4); ctx.restore(); },
  fatD(t) {   // a fat droplet carrying alpha-gal tags
    const w = 1 + 0.05 * Math.sin(t * 3); ctx.save(); ctx.scale(w, 2 - w); ctx.fillStyle = '#ffd36b'; ctx.beginPath(); ctx.moveTo(0, -62); ctx.quadraticCurveTo(54, 0, 46, 22); ctx.arc(0, 22, 46, 0, Math.PI); ctx.quadraticCurveTo(-54, 0, 0, -62); ctx.fill(); ell(-16, 10, 10, 18, 'rgba(255,255,255,0.5)', 0.3); ctx.restore();
    for (let i = 0; i < 4; i++) { const a = -0.6 + i * 0.9 + Math.sin(t * 2 + i) * 0.05; hexTag(Math.cos(a) * 50, 18 + Math.sin(a) * 48, 9, '#c95a7c'); } },
  fatball(t) { for (let i = 0; i < 5; i++) { const a = i * 1.26 + t * 0.6; circ(Math.cos(a) * 34, Math.sin(a) * 34, 26, '#ffd36b'); circ(Math.cos(a) * 34 - 8, Math.sin(a) * 34 - 8, 6, 'rgba(255,255,255,0.6)'); hexTag(Math.cos(a) * 34 + 14, Math.sin(a) * 34 - 16, 7, '#c95a7c'); } },
  drip(t) { rr2(-40, -90, 80, 100, 18, 'rgba(200,230,255,0.7)'); rr2(-34, -60, 68, 64, 12, 'rgba(255,217,138,0.7)'); rr2(-4, 10, 8, 40, 4, '#c9d6ec'); const p = (t * 1.2) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(0, 50 + p * 30, 6, '#ffd98a'); ctx.restore(); rr2(-20, -100, 40, 12, 6, '#9aa6c4'); rr2(-30, -50, 10, 50, 5, 'rgba(255,255,255,0.4)'); },
  drumstick(t) { ctx.save(); ctx.scale(1.2, 1.2); ctx.rotate(-0.5 + Math.sin(t * 1.5) * 0.08); ctx.fillStyle = TURKEY; ctx.beginPath(); ctx.ellipse(-16, 0, 56, 40, 0, 0, 6.283); ctx.fill(); rr2(30, -9, 46, 18, 9, '#f3ead8'); circ(78, -11, 11, '#f3ead8'); circ(78, 9, 11, '#f3ead8'); rr2(-50, -20, 40, 10, 5, 'rgba(255,255,255,0.3)'); ctx.restore(); },
  fish(t) { const w = Math.sin(t * 5) * 0.2; ctx.save(); ctx.scale(1.1, 1.1); ctx.fillStyle = '#5aa9e6'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 34, 0, 0, 6.283); ctx.fill(); ctx.save(); ctx.translate(-64, 0); ctx.rotate(w); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, -30); ctx.lineTo(-40, 30); ctx.fill(); ctx.restore(); ell(10, 6, 40, 12, '#8fc8f0'); circ(44, -8, 6, '#20232f'); ctx.restore(); },
  turkeyR(t) {   // a roast turkey on a platter, steaming
    ctx.save(); ctx.scale(0.42, 0.42); ctx.fillStyle = '#e8eef6'; ctx.beginPath(); ctx.ellipse(0, 70, 230, 46, 0, 0, 6.283); ctx.fill(); for (const [gx, c] of [[-150, SPROUT], [-120, SPROUT2], [150, '#ffcf6b'], [120, '#ffb35c']]) circ(gx, 60, 22, c);
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 120, 10); ctx.rotate(sd * 0.5); ctx.fillStyle = TURKEY2; ctx.beginPath(); ctx.ellipse(0, 0, 58, 38, 0, 0, 6.283); ctx.fill(); rr2(sd > 0 ? 40 : -76, -10, 36, 18, 9, '#f3ead8'); ctx.restore(); }
    ctx.fillStyle = TURKEY; ctx.beginPath(); ctx.ellipse(0, -10, 150, 100, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e09a52'; ctx.beginPath(); ctx.ellipse(-20, -40, 100, 50, -0.15, 0, 6.283); ctx.fill(); rr2(-90, -70, 70, 16, 8, 'rgba(255,255,255,0.35)'); glint(t, 140, 100);
    for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.7; circ(-50 + i * 50 + Math.sin(p * 6 + i) * 10, -120 - p * 40, 14 + p * 10, 'rgba(255,255,255,0.8)'); ctx.restore(); } ctx.restore(); },
  turkeyB(t) {   // a live wild turkey with a fanned tail
    const f = Math.sin(t * 2) * 0.06; for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(-20, 10); ctx.rotate(-1.4 + i * 0.32 + f); rr2(-9, -70, 18, 66, 9, i % 2 ? '#7a4a2c' : '#9a6530'); circ(0, -66, 9, '#f3e3d0'); ctx.restore(); }
    ell(0, 14, 40, 34, '#5a3a24'); rr2(-16, 44, 6, 22, 3, '#d9a35a'); rr2(8, 44, 6, 22, 3, '#d9a35a'); ctx.save(); ctx.translate(30, -14 + Math.sin(t * 4) * 3); rr2(-6, -30, 14, 36, 7, '#8fb0d8'); circ(4, -34, 13, '#8fb0d8'); poly([[14, -36], [28, -32], [14, -28]], '#ffd36b'); ell(10, -18, 5, 12, '#e2322e'); circ(6, -38, 3, '#20232f'); ctx.restore(); },
  treeP(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.2) * 0.04); rr2(-9, 40, 18, 30, 6, '#7a4a2c'); poly([[0, -80], [44, -16], [-44, -16]], '#2f7a4a'); poly([[0, -50], [56, 16], [-56, 16]], '#3f8f5a'); poly([[0, -18], [64, 48], [-64, 48]], '#4fa86a'); ctx.restore(); },
  tent(t) { const fl = Math.sin(t * 5) * 4; poly([[-80, 50], [0, -60], [80, 50]], '#ff8f4a'); poly([[-20, 50], [0, -6], [20, 50]], '#7a3a1a'); poly([[0, -60], [80, 50], [50, 50]], '#e2703a'); rr2(-2, -76, 4, 20, 2, '#5b6585'); poly([[2, -76], [26, -70 + fl], [2, -64]], '#ffd36b'); rr2(-90, 48, 180, 8, 4, '#3f8f4a'); },
  shirt(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.6) * 0.06); poly([[-30, -56], [30, -56], [70, -30], [54, 0], [36, -12], [36, 60], [-36, 60], [-36, -12], [-54, 0], [-70, -30]], '#5b8dd6'); poly([[-14, -56], [0, -40], [14, -56]], '#3a6fd6'); rr2(-28, -40, 10, 80, 5, 'rgba(255,255,255,0.25)'); ctx.restore(); for (let i = 0; i < 4; i++) { const p = (t * 0.8 + i / 4) % 1; circ(-40 + i * 26, 70 - p * 120, 4, `rgba(190,255,220,${0.8 * Math.sin(p * Math.PI)})`); } },
  pack(t) { const b = Math.sin(t * 2) * 2; rr2(-44, -46 + b, 88, 110, 26, '#3f8f4a'); rr2(-34, 6 + b, 68, 40, 12, '#2f6f3a'); rr2(-20, -70 + b, 40, 30, 14, '#2f6f3a'); rr2(-10, 18 + b, 20, 8, 4, '#ffd36b'); rr2(-32, -38 + b, 12, 40, 6, 'rgba(255,255,255,0.25)'); },
  spray(t) { ctx.save(); ctx.scale(1.2, 1.2); rr2(-28, -40, 56, 110, 16, '#5aa96a'); rr2(-18, -64, 36, 26, 8, '#f3f7fb'); rr2(14, -58, 30, 10, 5, '#f3f7fb'); for (let i = 0; i < 6; i++) { const p = ((t * 1.2) + i / 6) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(46 + p * 40, -54 + (i - 2.5) * p * 14, 4 + p * 3, 'rgba(200,255,220,0.8)'); ctx.restore(); } rr2(-20, -10, 40, 34, 6, '#f3f7fb'); font(13, 700); ctx.fillStyle = '#2f6f3a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('0.5%', 0, 8); ctx.restore(); },
  repel(t) { const sh = Math.sin(t * 2) * 0.06; ctx.save(); ctx.rotate(sh); rr2(-30, -40, 60, 106, 18, '#ff8f4a'); rr2(-16, -66, 32, 30, 8, '#f3f7fb'); rr2(-24, -10, 48, 40, 6, '#f3f7fb'); font(15, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('DEET', 0, 10); rr2(-24, -32, 10, 60, 5, 'rgba(255,255,255,0.3)'); ctx.restore();
    for (let i = 0; i < 5; i++) { const p = (t * 1.1 + i / 5) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(10 + p * 50, -80 - p * 30 + (i - 2) * p * 10, 4 + p * 4, 'rgba(255,230,200,0.8)'); ctx.restore(); } },
  skinA(t) { ctx.save(); ctx.rotate(-0.2); rr2(-80, -30, 160, 60, 30, SKIN); rr2(-70, -22, 140, 12, 6, 'rgba(255,255,255,0.25)'); for (let i = 0; i < 5; i++) circ(-50 + i * 26, 10 + Math.sin(i) * 6, 3, 'rgba(160,90,60,0.4)'); ctx.restore(); const p = (t * 0.5) % 1; ctx.save(); ctx.globalAlpha *= Math.sin(p * Math.PI) * 0.6; ell(-60 + p * 120, -10, 12, 4, '#ffffff'); ctx.restore(); },
  skinP(t) { rr2(-90, -26, 180, 60, 18, SKIN); rr2(-90, -26, 180, 12, 6, '#e9a27f'); for (let i = 0; i < 7; i++) circ(-70 + i * 24, 14 + Math.sin(i * 3) * 6, 3, 'rgba(160,90,60,0.4)'); const p = 0.5 + 0.5 * Math.sin(t * 3); ell(0, -24, 20 * p + 6, 6, 'rgba(226,69,122,0.35)'); },
  tweez(t) { const k = (Math.sin(t * 3) + 1) / 2; for (const sd of [-1, 1]) { ctx.save(); ctx.translate(0, -70); ctx.rotate(sd * (0.06 + 0.06 * k)); rr2(sd > 0 ? 0 : -10, 0, 10, 130, 5, '#c9d6ec'); rr2(sd > 0 ? 0 : -10, 0, 10, 40, 5, '#9aa6c4'); ctx.restore(); } circ(0, -70, 9, '#9aa6c4'); glint(t, 20, 60); },
  flame2(t) { ICONS.flame(t); rr2(-4, 40, 8, 26, 4, '#f3e3d0'); },
  polish(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.8) * 0.08); rr2(-34, -10, 68, 74, 18, '#e2457a'); rr2(-28, -4, 56, 20, 10, '#ff7a9a'); rr2(-12, -70, 24, 62, 8, '#20232f'); rr2(-26, 0, 10, 50, 5, 'rgba(255,255,255,0.35)'); ctx.restore(); glint(t, 34, 60); },
  jar(t) { rr2(-46, -30, 92, 90, 20, 'rgba(230,240,255,0.65)'); rr2(-40, -6, 80, 62, 16, '#f7e7b0'); rr2(-50, -54, 100, 28, 10, '#5b8dd6'); ell(0, -4, 36, 8, '#fff6d0'); rr2(-34, -20, 10, 60, 5, 'rgba(255,255,255,0.45)'); const w = Math.sin(t * 2) * 3; ell(0, 20 + w, 18, 6, 'rgba(255,255,255,0.35)'); },
  pin(t, o) { const b = Math.abs(Math.sin(t * 3)) * 6; ell(0, 50, 18, 6, 'rgba(0,0,0,0.25)'); ctx.save(); ctx.translate(0, -b); ctx.fillStyle = o.col || RED; ctx.beginPath(); ctx.arc(0, -16, 34, Math.PI * 0.82, Math.PI * 2.18); ctx.lineTo(0, 46); ctx.closePath(); ctx.fill(); circ(0, -16, 14, '#ffffff'); ctx.restore(); },
  ankle(t) { rr2(-30, -90, 60, 130, 26, SKIN); rr2(-30, 20, 110, 44, 22, SKIN); rr2(-22, -80, 12, 90, 6, 'rgba(255,255,255,0.2)'); for (let i = 0; i < 12; i++) { const r = rng(i * 3 + 1); const p = 0.6 + 0.4 * Math.sin(t * 3 + i); circ(-20 + r() * 60, -60 + r() * 100, 5 * p, '#e2457a'); } },
  epipen(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 1.5) * 0.08); rr2(-90, -18, 180, 36, 18, '#ffd36b'); rr2(-90, -18, 50, 36, 18, '#5b4fd6'); rr2(70, -14, 30, 28, 10, '#ff8f4a'); rr2(-20, -10, 60, 6, 3, 'rgba(255,255,255,0.5)'); ctx.restore(); glint(t, 90, 30); },
  diary(t) { rr2(-60, -76, 120, 152, 10, '#127b84'); rr2(-50, -66, 100, 132, 6, '#f3f7fb'); for (let i = 0; i < 6; i++) rr2(-40, -50 + i * 20, 80 - (i % 2) * 24, 6, 3, '#9fb0d8'); const p = (t * 0.6) % 1; ctx.save(); ctx.translate(-30 + p * 60, 70 - 120 * ((t * 0.3) % 1)); ctx.rotate(0.6); rr2(-4, -40, 8, 44, 3, '#ff8f4a'); ctx.restore(); },
  autopsy(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.4) * 0.05); rr2(-50, -64, 100, 128, 8, '#f3f7fb'); for (let i = 0; i < 5; i++) rr2(-36, -44 + i * 18, 72 - (i % 2) * 20, 6, 3, '#9fb0d8'); font(44, 700); ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 26, 40 + Math.sin(t * 3) * 3); ctx.restore(); },
  dice(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.3); rr2(-50, -50, 100, 100, 20, '#f3f7fb'); for (const [x, y] of [[-24, -24], [24, -24], [0, 0], [-24, 24], [24, 24]]) circ(x, y, 9, RED); ctx.restore(); },
  gravy(t) { ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 20, 70, 30, 0, 0, Math.PI); ctx.lineTo(-70, 0); ctx.quadraticCurveTo(0, -10, 70, 0); ctx.fill(); ctx.fillStyle = '#8a4a20'; ctx.beginPath(); ctx.ellipse(0, 4, 60, 12, 0, 0, 6.283); ctx.fill(); rr2(64, -6, 40, 12, 6, '#f3f7fb'); for (let i = 0; i < 2; i++) { const p = (t * 0.5 + i / 2) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.6; circ(-20 + i * 40, -20 - p * 50, 10 + p * 6, 'rgba(255,255,255,0.8)'); ctx.restore(); } },
  trail(t) { ctx.fillStyle = '#5aa96a'; ctx.beginPath(); ctx.moveTo(-100, 70); ctx.lineTo(-30, -70); ctx.lineTo(30, -70); ctx.lineTo(100, 70); ctx.fill(); ctx.fillStyle = '#d9c7a0'; ctx.beginPath(); ctx.moveTo(-40, 70); ctx.lineTo(-10, -70); ctx.lineTo(10, -70); ctx.lineTo(40, 70); ctx.fill(); for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(sd * (60 + i * 6), 50 - i * 34); ctx.rotate(Math.sin(t * 2 + i) * 0.15); rr2(-3, -26, 6, 26, 3, '#3f7f4c'); ctx.restore(); } },
  pie2(t, o) { const v = o.v || 0.4, k = o.k ?? 1; circ(0, 0, 62, '#2d2b7c'); ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 62 + 3 * Math.sin(t * 3), -Math.PI / 2, -Math.PI / 2 + v * 6.283 * eoq(k)); ctx.fill(); circ(0, 0, 22, '#2d2b7c'); },
});
Object.assign(IDLE, { tickI: {}, larvae: {}, mite: {}, agal: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.1) }, cellG: {}, germG: {}, ab: {}, mast: {}, steak: {}, burger2: {}, sausage: {}, peanut: {}, milk: { pre: t => ctx.rotate(Math.sin(t * 2) * 0.06) }, cheese: { post: t => glint(t, 70, 40) }, gummy: {}, marsh: {}, capsule: {}, jelly: {}, grill: {},
  cow: {}, pig: {}, deer: {}, sheep: {}, cat: {}, dog: {}, rabbit: {}, ape: {}, person: {}, patient: {}, hivesI: {}, stomach: {}, fatD: {}, fatball: {}, drip: {}, drumstick: {}, fish: {}, turkeyR: {}, turkeyB: {}, treeP: {}, tent: {}, shirt: {}, pack: {}, spray: {}, repel: {}, skinA: {}, skinP: {}, tweez: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.06) },
  flame2: {}, polish: {}, jar: {}, pin: {}, ankle: {}, epipen: {}, diary: {}, autopsy: {}, dice: {}, pie2: {}, gravy: {}, trail: {} });

// ---------- actor shortcuts ----------
const ag = (x, y, s, t0, op = {}) => A('agal', x, y, s, t0, { hw: 66, hh: 66, ...op });
const abB = (x, y, s, t0, op = {}) => A('ab', x, y, s, t0, { o: { col: '#8fd8e6' }, hw: 52, hh: 72, ...op });
const abR = (x, y, s, t0, op = {}) => A('ab', x, y, s, t0, { o: { col: RED }, hw: 52, hh: 72, ...op });
const tk = (x, y, s, t0, op = {}) => A('tickI', x, y, s, t0, { hw: 72, hh: 70, ...op });
const X_ = (x, y, t0, i, dx = 110, dy = -110) => A('cross', x, y, 0.75, t0, { follow: { i, dx, dy } });   // a "no" badge that sticks to actor i
const OK_ = (x, y, t0, i, dx = 110, dy = -110) => A('check', x, y, 0.75, t0, { follow: { i, dx, dy } });
const AN = { hw: 92, hh: 66 };   // box for the wide animal icons
const lerpCol = (a, b, k) => { const p = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A0 = p(a), B0 = p(b); return '#' + A0.map((v, i) => Math.round(lerp(v, B0[i], clamp(k))).toString(16).padStart(2, '0')).join(''); };

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [tk(560, 560, 2.4, 'c1:tick', { mv: [['c1:meat', 760, 560, 40]] }), A('steak', 1250, 560, 1.9, 'c1:meat', { hw: 84, hh: 60, shake: ['c1:meat+0.2', 1.0] }), X_(1250, 560, 'c1:meat+0.4', 1, 140, -110)] },
    { at: 'c2', cast: [A('burger2', 330, 420, 1.8, 'c2:burger', { hw: 72, hh: 58, mv: [['c2:dinner+0.5', 600, 600, 90]], erase: 'c2:fine', z: 1 }),
      A('patient', 680, 560, 2.3, 'c2:eating', { o: tt => ({ mood: tt > T('c2:waking') ? 'sick' : 'happy', hives: clamp((tt - T('c2:hives')) / 1.0) }), hit: ['c2:dinner+0.5'], shake: ['c2:waking', 0.8] }),
      A('check', 680, 560, 0.75, 'c2:fine', { follow: { i: 1, dx: 130, dy: -170 }, out: 'c2:waking' }), A('plate', 1250, 520, 1.9, 'c2:dinner', { hw: 86, hh: 50, out: 'c2:waking' }), A('moon2', 1080, 300, 1.6, 'c2:waking'), A('clock3', 1080, 720, 1.7, 'c2:middle', { pulse: ['c2:hours', 'c2:meal'] }), A('airway', 1520, 520, 2.1, 'c2:throat', { hw: 44, hh: 80, o: tt => ({ block: tt > T('c2:swelling') }), shake: ['c2:swelling', 1.0] })],
      lab: [['HOURS AFTER THE MEAL', 'c2:hours', 1250, 965, GOLD, 32]] },
    { at: 'c3', cast: [ag(360, 470, 2.2, 'c3:alpha', { glow: 'rgba(255,217,138,0.5)' }), A('crowd', 860, 470, 1.7, 'c3:450', { pulse: ['c3:spreading'] }), A('crowd', 1220, 470, 1.7, 'c3:450+0.15'), A('crowd', 1040, 720, 1.7, 'c3:americans'),
      A('crowd', 1600, 400, 1.5, 'c3:spreading+0.3'), A('crowd', 1600, 720, 1.5, 'c3:spreading+0.5')],
      fx: [['stream', 2, 4, 'c3:spreading', 'c3>', { col: '#ff9fb4', n: 6 }], ['stream', 3, 5, 'c3:spreading+0.2', 'c3>', { col: '#ff9fb4', n: 6 }]],
      tag: [['ALPHA-GAL SYNDROME', 'c3:alpha', 360, 760, '#9b3352', 34]], num: [['c3:450', 1040, 200, 'UP TO 450,000', 'AMERICANS AFFECTED SINCE 2010 (CDC)']] },
    QB('c4q', [tk(760, 560, 2.6, 'c4q+0.2', { shake: ['c4q:tick', 0.8] }), A('steak', 1200, 560, 1.7, 'c4q+0.5', { hw: 84, hh: 60 })]),
    { at: 'c5', cast: [A('globeP', 330, 480, 1.8, 'c5:united'), tk(820, 500, 2.6, 'c5:tick', { pulse: ['c5:lone', 'c5:star'], mv: [['c5:bite+0.5', 1180, 470, 90]] }), A('patient', 1380, 560, 2.1, 'c5:bite', { hit: ['c5:bite+0.5'] }),
      A('shieldC', 1700, 470, 1.6, 'c5:rewire', { shake: ['c5:immune', 0.9] })],
      fx: [['zap', 2, 3, 'c5:immune', 0.8, '#ffd98a']], tag: [['THE LONE STAR TICK', 'c5:lone', 820, 870, '#0b4f5c', 40]] },
  ], 'a1'));
}
// ---------- 1 a sugar called alpha-gal ----------
function sSugar(t) {
  worldBG(t, 'cream');
  beats(t, chainB([
    QB('a1', [ag(760, 560, 2.4, 'a1+0.2'), A('cellG', 1180, 560, 1.7, 'a1+0.5', { hw: 78, hh: 78 })]),
    { at: 'a2', cast: [ag(330, 400, 2.0, 'a2:sugar'), A('gummy', 330, 760, 1.5, 'a2:sweets', { morph: ['a2:tiny', 'cross'] }), A('cellG', 1150, 520, 2.6, 'a2:tiny', { hw: 78, hh: 78, o: tt => ({ tags: clamp((tt - T('a2:stuck')) / 1.6) }), pulse: ['a2:cells'] })],
      fx: [['stream', 0, 2, 'a2:tag', 'a2:cows', { ic: 'agal', s: 0.42, n: 8 }]], tag: [['ALPHA-GAL: A SUGAR TAG ON CELLS', 'a2:tag', 1150, 900, '#c95a7c', 34]], lab: [['NOT THE SUGAR IN SWEETS', 'a2:sweets', 640, 965, WHITE, 28]] },
    { at: 'a2:cows', cast: [A('cow', 330, 360, 1.5, 'a2:cows', AN), A('pig', 720, 360, 1.5, 'a2:pigs', AN), A('sheep', 1110, 360, 1.5, 'a2:sheep', AN), A('deer', 330, 720, 1.5, 'a2:deer', AN), A('cat', 720, 720, 1.5, 'a2:cats'), A('dog', 1110, 720, 1.5, 'a2:dogs', AN),
      ag(1620, 540, 2.2, 'a2:almost', { glow: 'rgba(255,217,138,0.5)', pulse: ['a2:mammals'] })],
      fx: [0, 1, 2, 3, 4, 5].map(i => ['stream', 6, i, 'a2:mammals+' + (i * 0.08).toFixed(2), 'a3', { ic: 'agal', s: 0.3, n: 3, sp: 1.1 }]), lab: [['ALMOST ALL MAMMALS HAVE IT', 'a2:almost', 960, 965, WHITE, 30]] },
    { at: 'a3', cast: [A('adult', 300, 560, 2.2, 'a3:you'), X_(300, 560, 'a3:you+0.4', 0, 120, -150), A('ape', 700, 540, 2.0, 'a3:apes'), A('monkeyF', 1060, 540, 1.9, 'a3:monkeys'),
      A('dna', 1430, 500, 2.0, 'a3:lost', { shake: ['a3:gene', 0.7] }), X_(1430, 500, 'a3:gene+0.2', 4, 110, -120), ag(1720, 360, 1.5, 'a3:make', { erase: 'a3:millions' }), A('hglass', 1720, 700, 1.6, 'a3:millions')],
      lab: [['HUMANS · APES · OLD WORLD MONKEYS', 'a3:humans', 700, 820, WHITE, 28], ['GENE SWITCHED OFF', 'a3:gene', 1430, 965, '#ffd98a', 30]] },
    QB('a4q', [A('dna', 760, 560, 2.2, 'a4q+0.2', { shake: ['a4q:lose', 0.7] }), ag(1180, 560, 1.7, 'a4q+0.4')]),
    { at: 'a5', cast: [A('question', 330, 520, 1.8, 'a5', { pulse: ['a5:sure'] }), A('ape', 760, 540, 2.1, 'a5:ancestors'), A('shieldC', 1170, 500, 1.7, 'a5:helped', { hit: ['a5:germs+0.7'] }), A('germG', 1700, 420, 1.7, 'a5:germs', { hw: 70, hh: 70, mv: [['a5:germs+0.7', 1340, 470, 50]], push: [['a5:germs+0.8', 220, -60]] })],
      lab: [['ONE IDEA: IT HELPED US FIGHT GERMS', 'a5:idea', 960, 965, WHITE, 30]] },
    { at: 'a5:many', cast: [A('germG', 360, 380, 1.7, 'a5:microbes', { hw: 70, hh: 70, hit: ['a5:attack+0.6'], erase: 'a5:does' }), A('germG', 360, 720, 1.7, 'a5:microbes+0.25', { hw: 70, hh: 70, hit: ['a5:attack+0.9'], erase: 'a5:does+0.25' }),
      A('cellG', 900, 540, 2.2, 'a5:own', { hw: 60, hh: 60, o: { tags: 0, col: '#f2b38f', face: 1 } }), abB(1450, 380, 1.8, 'a5:immune', { mv: [['a5:attack+0.6', 560, 400, 120]] }), abB(1450, 720, 1.8, 'a5:immune+0.2', { mv: [['a5:attack+0.9', 560, 700, 120]] })],
      lab: [['MICROBES CARRY THE TAG · OUR CELLS DON\'T', 'a5:own', 960, 965, '#ffd98a', 28]] },
    { at: 'a5:fact', cast: [A('crowd', 400, 540, 2.2, 'a5:all'), abB(820, 330, 1.5, 'a5:antibodies', { mv: [['a5:against+0.3', 1260, 400, 60]] }), abB(820, 760, 1.5, 'a5:antibodies+0.15', { mv: [['a5:against+0.45', 1260, 680, 60]] }), abB(900, 540, 1.5, 'a5:antibodies+0.3', { mv: [['a5:against+0.6', 1230, 540, 40]] }),
      ag(1600, 540, 2.3, 'a5:against', { pulse: ['a5:against+0.6'] })],
      lab: [['WE ALL CARRY ANTIBODIES TO IT', 'a5:carry', 960, 965, WHITE, 30]] },
    { at: 'a6', cast: [abB(330, 500, 2.0, 'a6'), OK_(330, 500, 'a6:harmless+0.2', 0, 120, -150), ag(700, 500, 1.6, 'a6:harmless', { mv: [['a6:harmless+0.8', 560, 470, 30]] }), A('shieldC', 1100, 500, 1.8, 'a6:immune', { shake: ['a6:makes', 0.6] }),
      abR(1580, 500, 2.1, 'a6:allergic', { glow: 'rgba(226,69,122,0.45)', shake: ['a6:kind', 0.6] })],
      fx: [['stream', 3, 4, 'a6:makes', 'a6>', { col: '#ff6f8f', n: 7 }]], lab: [['NORMALLY HARMLESS', 'a6:harmless', 450, 800, WHITE, 30]], tag: [['THE ALLERGIC KIND', 'a6:allergic', 1450, 965, '#9b3352', 36]] },
  ], 't1'));
}
// ---------- 2 the lone star tick ----------
const MT = mapG(160, 300, 900, 420);
function sTick(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('t1', [tk(760, 560, 2.6, 't1+0.2'), A('adult', 1180, 560, 1.8, 't1:tick')]),
    { at: 't2', cast: [tk(620, 540, 3.6, 't2:meet', { pulse: ['t2:white', 't2:spot'] }), A('magnifier', 1100, 360, 1.7, 't2:white', { mv: [['t2:spot', 760, 450, 60]] }), A('star', 1380, 360, 1.7, 't2:name', { hw: 60, hh: 60 })],
      fx: [['zap', 0, 2, 't2:name', 0.7, '#fff8e8']], tag: [['THE LONE STAR TICK', 't2:lone', 620, 900, '#0b4f5c', 40]], lab: [['ONE WHITE SPOT ON HER BACK', 't2:single', 1400, 620, WHITE, 30]] },
    { at: 't2:common', under: underMap(MT, 0.25), cast: [tk(MT.X(-86), MT.Y(33), 1.4, 't2:common', { mv: [['t2:hunts', MT.X(-80), MT.Y(37), 30], ['t2:people+0.3', 1250, 520, 120]] }), A('patient', 1420, 560, 2.0, 't2:people', { hit: ['t2:people+0.3'] }), A('dog', 1740, 620, 1.5, 't2:pets', AN)],
      lab: [['SOUTH + EAST U.S.', 't2:southern', 610, 800, WHITE, 30], ['HUNTS PEOPLE AND PETS', 't2:hunts', 1500, 965, GOLD, 30]] },
    { at: 't2b', cast: [tk(330, 520, 2.4, 't2b'), A('bact', 800, 360, 1.7, 't2b:lyme'), X_(800, 360, 't2b:disease', 1, 120, -90), A('virus', 800, 720, 1.8, 't2b:infections'), ag(1450, 520, 2.3, 't2b:stranger', { glow: 'rgba(255,217,138,0.5)', pulse: ['t2b:behind'] })],
      fx: [['stream', 0, 4, 't2b:leave', 't2b>', { col: '#ffd98a', n: 6 }]], tag: [['NOT LYME DISEASE', 't2b:lyme', 800, 965, '#0b4f5c', 32]], lab: [['SOMETHING STRANGER', 't2b:stranger', 1450, 800, GOLD, 30]] },
    { at: 't3', under: skinBand(760), cast: [tk(520, 560, 2.2, 't3', { o: tt => ({ rot: Math.PI, fed: 0.5 * clamp((tt - T('t3:pumps')) / 5) }), shake: ['t3:bites', 0.5] }), ag(900, 880, 1.4, 't3:alpha', { mv: [['t3:alpha+0.6', 980, 880]] }),
      A('shieldC', 1250, 440, 1.7, 't3:immune', { shake: ['t3:alert', 1.0] }), A('alarmC', 1650, 440, 1.7, 't3:alert', { shake: ['t3:alert', 1.2] })],
      fx: [['stream', [520, 720], [560, 960], 't3:pumps', 't3>', { col: 'rgba(220,240,255,0.9)', n: 10, arc: 10 }], ['zap', 1, 2, 't3:chemicals', 0.8, '#ffd98a']],
      lab: [['SALIVA INTO THE SKIN', 't3:saliva', 520, 160, WHITE, 30], ['ALPHA-GAL, OR SOMETHING LIKE IT', 't3:carries', 1250, 160, GOLD, 28]] },
    { at: 't4', cast: [A('adult', 300, 560, 2.1, 't4'), A('shieldC', 680, 500, 1.7, 't4:immune', { pulse: ['t4:responds'] }), abR(1040, 360, 1.6, 't4:ige', { mv: [['t4:enemy+0.2', 1360, 400, 60]] }), abR(1040, 720, 1.6, 't4:ige+0.2', { mv: [['t4:enemy+0.35', 1360, 660, 60]] }),
      ag(1640, 540, 2.3, 't4:alpha', { morph: ['t4:enemy', 'agal'], o: tt => ({ bad: tt > T('t4:enemy') }), shake: ['t4:enemy+0.4', 0.8] })],
      fx: [['stream', 1, 2, 't4:making', 't4:allergies', { col: '#ff6f8f', n: 5 }], ['stream', 1, 3, 't4:making+0.2', 't4:allergies', { col: '#ff6f8f', n: 5 }]], tag: [['IgE: THE ALLERGY ANTIBODY', 't4:ige', 960, 965, '#9b3352', 34]] },
    QB('t5q', [tk(760, 560, 2.4, 't5q+0.2', { shake: ['t5q:bite', 0.6] }), A('adult', 1180, 560, 1.8, 't5q:every')]),
    { at: 't6', cast: [0, 1, 2, 3].map(i => A('adult', 260 + i * 260, 560, 1.6, 't6:most+' + (i * 0.12).toFixed(2), { o: tt => ({ col: ['#5b4fd6', '#3fae6a', '#e2457a', '#127b84'][i], mood: i === 2 && tt > T('t6:develop') ? 'sick' : 'happy' }), pulse: i === 2 ? ['t6:develop'] : [], glow: i === 2 ? null : null }))
      .concat([A('magnifier', 1500, 360, 1.7, 't6:scientists', { mv: [['t6:know', 1450, 400]] }), A('question', 1500, 720, 1.6, 't6:why', { pulse: ['t6:others'] })]),
      lab: [['MOST BITES: NOTHING', 't6:most', 650, 820, WHITE, 30], ['WHY SOME PEOPLE? UNKNOWN', 't6:why', 960, 965, GOLD, 30]] },
    { at: 't6:other', cast: [tk(480, 520, 2.2, 't6:other'), tk(960, 520, 2.2, 't6:ticks', { o: { col: '#3a2a22', scut: '#5a3a2a', nostar: 1 } }), tk(1440, 520, 2.2, 't6:linked', { o: { col: '#7a4a2a', scut: '#c98a52', nostar: 1 } })],
      fx: [['zap', 0, 1, 't6:linked', 0.5, '#ffd98a'], ['zap', 1, 2, 't6:linked+0.3', 0.5, '#ffd98a']], lab: [['OTHER TICKS LINKED TOO', 't6:other', 960, 965, WHITE, 30]] },
  ], 'r1'));
}
// ---------- 3 why it strikes hours later ----------
function sDelay(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('r1', [A('clock3', 760, 560, 2.2, 'r1+0.2'), A('burger2', 1180, 560, 1.7, 'r1:reaction', { hw: 72, hh: 58 })]),
    { at: 'r2', cast: [A('peanut', 300, 380, 1.6, 'r2:food', { hit: ['r2:hit'] }), A('stopwatch', 300, 740, 1.6, 'r2:minutes', { pulse: ['r2:minutes'] }), A('steak', 780, 520, 1.6, 'r2:alpha', { hw: 84, hh: 60 }),
      A('clock3', 1220, 520, 2.1, 'r2:start'), A('patient', 1650, 560, 2.0, 'r2:after', { o: { mood: 'sick', hives: 1 }, hit: ['r2:eating'] })],
      fx: [['zap', 0, 1, 'r2:hit', 0.5, '#ffd98a'], ['stream', 2, 3, 'r2:reactions', 'r2>', { col: '#ffd98a', n: 6, sp: 0.4 }]], lab: [['MOST FOOD ALLERGIES: MINUTES', 'r2:minutes', 420, 965, WHITE, 28]], tag: [['ALPHA-GAL: 2–6 HOURS', 'r2:two', 1300, 965, '#5b4fd6', 36]] },
    { at: 'r2b', cast: [A('patient', 1000, 560, 2.1, 'r2b:patients', { o: tt => ({ mood: tt > T('r2b:came') ? 'sick' : 'happy', hives: clamp((tt - T('r2b:came')) / 0.8) }), hit: ['r2b:watch'] }),
      A('sausage', 560, 380, 1.6, 'r2b:sausage', { hw: 80, hh: 40, mv: [['r2b:watch', 860, 470, 60]], out: 'r2b:not' }), A('doctor', 330, 560, 2.0, 'r2b:doctor'),
      A('clock', 1550, 520, 2.2, 'r2b:not', { o: tt => { const h = 4 * clamp((tt - T('r2b:not')) / (T('r2b:four') - T('r2b:not'))); return { h: Math.floor(h), m: (h % 1) * 60 }; }, pulse: ['r2b:four'] })],
      lab: [['NO REACTION FOR 2½ HOURS', 'r2b:first', 1550, 800, WHITE, 28], ['AVERAGE: ABOUT 4 HOURS', 'r2b:average', 960, 965, GOLD, 32]] },
    { at: 'r3', cast: [A('steak', 260, 500, 1.7, 'r3:meat', { hw: 84, hh: 60 }), A('fatD', 600, 500, 1.6, 'r3:attached', { mv: [['r3:digested+0.3', 880, 500, 60]], out: 'r3:slowly' }), A('stomach', 960, 520, 2.0, 'r3:digested', { hw: 70, hh: 80, hit: ['r3:digested+0.3'] }),
      A('fatball', 1320, 520, 1.6, 'r3:particles'), A('artery', 1660, 520, 1.6, 'r3:blood', { hw: 84, hh: 56 })],
      fx: [['stream', 0, 1, 'r3:alpha', 'r3:attached', { ic: 'agal', s: 0.3, n: 4 }], ['stream', 2, 3, 'r3:packed', 'r3>', { col: '#ffd36b', n: 7 }], ['stream', 3, 4, 'r3:reaches', 'r3>', { col: '#ffd36b', n: 7, sp: 0.5 }]],
      tag: [['ATTACHED TO FAT', 'r3:attached', 430, 800, '#5b4fd6', 32]], lab: [['IN THE BLOOD HOURS LATER', 'r3:hours', 1450, 800, GOLD, 28]] },
    { at: 'r4', cast: [A('moon2', 300, 300, 1.6, 'r4:night'), A('bedH', 560, 640, 2.0, 'r4', { hw: 96, hh: 60, shake: ['r4:strikes', 0.9] }), A('clock3', 960, 320, 1.6, 'r4:middle'),
      A('burger2', 1300, 540, 2.0, 'r4:dinner', { hw: 72, hh: 58, grey: 'r4:never' }), X_(1300, 540, 'r4:connect', 3, 150, -110), A('puzzle', 1660, 540, 1.6, 'r4:connect', { o: { col: '#8fd8e6' }, shake: ['r4:burger', 0.6] })],
      fx: [['zap', 1, 3, 'r4:connect', 0.6, '#ff9fb4']], lab: [['THE MIDDLE OF THE NIGHT', 'r4:middle', 560, 870, '#9fd3ff', 30], ['NEVER LINKED TO THE BURGER', 'r4:burger', 1300, 965, WHITE, 30]] },
    { at: 'r5', cast: [A('hivesI', 300, 380, 1.7, 'r5:hives', { hw: 76, hh: 56 }), A('stomach', 680, 380, 1.7, 'r5:stomach', { hw: 70, hh: 80, o: { upset: 1 } }), A('airway', 1020, 380, 1.7, 'r5:swelling', { hw: 44, hh: 80, o: { block: 1 } }),
      A('patient', 680, 760, 1.7, 'r5:whole', { o: { mood: 'sick', hives: 1 }, shake: ['r5:whole', 1.0] }), A('mast', 1480, 500, 2.4, 'r5:worst', { o: tt => ({ burst: tt > T('r5:anaphylaxis') }), shake: ['r5:anaphylaxis', 0.8] }), A('ambulance', 1060, 760, 1.6, 'r5:deadly', { hw: 84, hh: 52 })],
      fx: [['burst', 4, 'r5:anaphylaxis', '#ff8f4a'], ['stream', 4, 0, 'r5:anaphylaxis', 'r5>', { col: '#ff8f4a', n: 5 }], ['stream', 4, 1, 'r5:anaphylaxis+0.1', 'r5>', { col: '#ff8f4a', n: 5 }], ['stream', 4, 2, 'r5:anaphylaxis+0.2', 'r5>', { col: '#ff8f4a', n: 5 }]],
      lab: [['HIVES · STOMACH PAIN · SWELLING', 'r5:hives', 680, 965, WHITE, 28]], tag: [['ANAPHYLAXIS', 'r5:anaphylaxis', 1480, 830, '#e2457a', 38]] },
  ], 'k1'));
}
// ---------- 4 a cancer drug cracked the case ----------
const MK = mapG(1060, 330, 800, 372), MB = mapG(260, 200, 1400, 650);
function sDrug(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('k1', [A('magnifier', 760, 560, 2.2, 'k1+0.2', { mv: [['k1:out', 820, 520]] }), A('docV', 1180, 560, 1.7, 'k1:figure', { o: { title: 'CASE FILE', ticks: 0 } })]),
    { at: 'k2', under: underMap(MK, 0.15), cast: [A('question', 300, 520, 1.8, 'k2:mystery', { pulse: ['k2:clinics'] }), A('hospital', 640, 520, 1.8, 'k2:cancer'), A('doctor', 920, 560, 1.9, 'k2:doctors'),
      A('pin', MK.X(-79), MK.Y(35.5) - 70, 1.6, 'k2:north', { hw: 40, hh: 56 })],
      lab: [['CANCER CLINICS · MID-2000s', 'k2:mid', 640, 800, WHITE, 28], ['NORTH CAROLINA', 'k2:carolina', 1460, 800, GOLD, 30]] },
    { at: 'k2:drug', cast: [A('drip', 380, 500, 2.2, 'k2:drug', { hw: 48, hh: 100 }), A('patient', 860, 560, 2.1, 'k2:called', { o: tt => ({ mood: 'sick', hives: clamp((tt - T('k2:severe')) / 0.8) }), shake: ['k2:severe', 0.8] }),
      A('chart', 1450, 520, 2.3, 'k2:often', { o: tt => ({ v: [0.9 * clamp((tt - T('k2:often')) / 0.8) + 0.05, 0.2, 0.25, 0.18], hi: 0 }) })],
      fx: [['stream', 0, 1, 'k2:causing', 'k2>', { col: '#ffd98a', n: 6 }]], tag: [['CETUXIMAB', 'k2:called+0.3', 380, 830, '#5b4fd6', 38]], lab: [['FAR MORE OFTEN THERE', 'k2:far', 1450, 800, GOLD, 28]] },
    { at: 'k3', cast: [A('calDay', 300, 500, 1.8, 'k3:2008', { o: { m: 'YEAR', d: '2008' } }), A('mouse', 700, 520, 1.9, 'k3:mouse', { hw: 84, hh: 50 }), A('drip', 1130, 500, 2.0, 'k3:drug', { hw: 48, hh: 100, pulse: ['k3:carried'] }), ag(1560, 500, 2.1, 'k3:carried', { glow: 'rgba(255,217,138,0.45)' })],
      fx: [['stream', 1, 2, 'k3:cells', 'k3:patients', { ic: 'agal', s: 0.35, n: 6 }], ['zap', 2, 3, 'k3:carried', 0.6, '#ffd98a']], lab: [['MADE PARTLY IN MOUSE CELLS', 'k3:mouse', 900, 965, WHITE, 30]] },
    { at: 'k3:patients', cast: [A('patient', 420, 560, 2.2, 'k3:patients', { o: { mood: 'happy' } }), abR(700, 360, 1.5, 'k3:allergic'), abR(700, 740, 1.5, 'k3:antibodies'), A('drip', 1450, 500, 2.0, 'k3:first', { hw: 48, hh: 100 }),
      A('calDay', 1100, 500, 1.6, 'k3:dose', { o: { m: 'DOSE', d: '1' } })],
      tag: [['ANTIBODIES BEFORE THE FIRST DOSE', 'k3:before', 960, 965, '#9b3352', 34]] },
    QB('k4q', [abR(760, 560, 2.0, 'k4q+0.2', { shake: ['k4q:come', 0.6] }), A('globeP', 1180, 560, 1.7, 'k4q:where')]),
    { at: 'k5', cast: [A('puzzle', 300, 420, 1.6, 'k5:puzzle', { o: { col: '#ffd98a' }, mv: [['k5:cases', 360, 520]] }), A('puzzle', 300, 700, 1.6, 'k5:puzzle+0.2', { o: { col: '#8fd8e6' } }), A('doctor', 700, 560, 2.0, 'k5:allergists'),
      abR(1080, 520, 1.7, 'k5:antibodies', { pulse: ['k5:same'] }), A('patient', 1420, 560, 1.9, 'k5:people', { o: { mood: 'sick', hives: 1 } }), A('steak', 1730, 520, 1.6, 'k5:meat', { hw: 84, hh: 60 })],
      fx: [['zap', 3, 4, 'k5:delayed', 0.6, '#ff9fb4']], lab: [['THOMAS PLATTS-MILLS · UNIVERSITY OF VIRGINIA', 'k5:thomas', 700, 840, GOLD, 26], ['DELAYED RED-MEAT REACTIONS', 'k5:delayed', 1420, 965, WHITE, 28]] },
    { at: 'k5:cases', under: underMap(MB, 0.35), cast: [tk(MB.X(-88), MB.Y(33), 1.4, 'k5:cases', { mv: [['k5:lives', MB.X(-84), MB.Y(35)]] })].concat([[-82, 36.5], [-78.5, 37.5], [-86.5, 36], [-80.5, 34.5], [-90, 35.8]].map(([lo, la], i) =>
      A('pin', MB.X(lo), MB.Y(la) - 60, 1.4, 'k5:clustered+' + (i * 0.15).toFixed(2), { hw: 40, hh: 56 }))),
      lab: [['CASES CLUSTER WHERE THE TICK LIVES', 'k5:clustered', 960, 965, WHITE, 30]] },
    { at: 'k6', cast: [A('calDay', 300, 500, 1.8, 'k6:2011', { o: { m: 'YEAR', d: '2011' } }), abR(700, 520, 1.8, 'k6:antibodies'), tk(1130, 520, 2.3, 'k6:tick', { pulse: ['k6:starts'] }), A('hglass', 1580, 500, 1.9, 'k6:hides', { pulse: ['k6:hours'] })],
      fx: [['zap', 1, 2, 'k6:bites', 0.8, '#ffd98a'], ['burst', 2, 'k6:nobody', '#ffd98a']], tag: [['2011: TICK BITES LINKED TO THE ALLERGY', 'k6:2011', 960, 965, '#9b3352', 32]] },
  ], 'n1'));
}
// ---------- 5 not just steak ----------
function sFoods(t) {
  worldBG(t, 'gold');
  beats(t, chainB([
    QB('n1', [A('steak', 760, 560, 2.2, 'n1+0.2', { hw: 84, hh: 60 }), A('cow', 1180, 560, 1.6, 'n1:red', AN)]),
    { at: 'n2', cast: [A('cow', 260, 360, 1.4, 'n2:beef', { ...AN, glow: 'rgba(226,69,122,0.4)' }), A('pig', 600, 360, 1.4, 'n2:pork', { ...AN, glow: 'rgba(226,69,122,0.4)' }), A('sheep', 940, 360, 1.4, 'n2:lamb', { ...AN, glow: 'rgba(226,69,122,0.4)' }),
      A('deer', 1280, 360, 1.4, 'n2:venison', { ...AN, glow: 'rgba(226,69,122,0.4)' }), A('rabbit', 1620, 360, 1.5, 'n2:rabbit', { glow: 'rgba(226,69,122,0.4)' }),
      A('drumstick', 500, 730, 1.4, 'n2:chicken', { hw: 90, hh: 60 }), A('turkeyR', 900, 730, 1.5, 'n2:turkey', { hw: 100, hh: 60 }), A('fish', 1300, 730, 1.4, 'n2:fish', { hw: 92, hh: 46 }), ag(1660, 730, 1.5, 'n2:alpha', { morph: ['n2:alpha+0.6', 'cross'] })],
      lab: [['RED MEAT: THE MAIN PROBLEM', 'n2:red', 960, 120, '#ff9fb4', 32], ['BIRDS AND FISH: FINE', 'n2:fine', 960, 965, WHITE, 32]] },
    { at: 'n3', cast: [A('milk', 280, 380, 1.5, 'n3:milk'), A('cheese', 280, 740, 1.3, 'n3:cheese', { hw: 84, hh: 50 }), A('jelly', 720, 560, 1.9, 'n3:gelatin', { pulse: ['n3:gelatin#1'] }), A('cow', 1100, 330, 1.3, 'n3:animal', AN),
      A('gummy', 1120, 760, 1.4, 'n3:sweets'), A('marsh', 1440, 500, 1.6, 'n3:marshmallows'), A('capsule', 1720, 760, 1.3, 'n3:capsules', { hw: 84, hh: 60 })],
      fx: [['stream', 3, 2, 'n3:collagen', 'n3:gelatin#1', { col: '#f3e3d0', n: 6 }], ['stream', 2, 4, 'n3:hides', 'n3>', { col: '#ff7a9a', n: 4 }], ['stream', 2, 5, 'n3:marshmallows', 'n3>', { col: '#ff7a9a', n: 4 }], ['stream', 2, 6, 'n3:capsules', 'n3>', { col: '#ff7a9a', n: 4 }]],
      lab: [['GELATIN = ANIMAL COLLAGEN', 'n3:collagen', 720, 965, WHITE, 30]] },
    { at: 'n4', cast: [A('patient', 360, 560, 2.1, 'n4:sensitive', { o: tt => ({ mood: tt > T('n4:barbecue') ? 'sick' : 'happy' }), mv: [['n4:walking', 420, 560], ['n4:barbecue', 820, 560]] }), A('grill', 1350, 540, 2.2, 'n4:cooking', { hw: 84, hh: 96 })],
      fx: [['stream', 1, 0, 'n4:fumes', 'n4>', { col: 'rgba(220,220,235,0.8)', n: 12, r: 14, sp: 0.6 }]], lab: [['RARE: EVEN BARBECUE FUMES', 'n4:fumes', 960, 965, WHITE, 30]] },
    QB('n5q', [A('turkeyR', 760, 560, 2.3, 'n5q+0.2', { hw: 100, hh: 60 }), A('xtree', 1200, 540, 1.7, 'n5q:christmas')]),
    { at: 'n6', cast: [A('turkeyR', 400, 520, 2.4, 'n6:turkey', { hw: 100, hh: 60 }), OK_(400, 520, 'n6:yes', 0, 180, -140), A('gravy', 960, 540, 1.9, 'n6:gravy', { hw: 100, hh: 50 }), A('magnifier', 1250, 330, 1.5, 'n6:check', { mv: [['n6:gravy+0.2', 1060, 420]] }),
      A('cow', 960, 800, 1.2, 'n6:beef', AN), A('jelly', 1560, 560, 1.8, 'n6:gelatin')],
      fx: [['stream', 4, 2, 'n6:stock', 'n6>', { col: '#c98a52', n: 5 }]], lab: [['CHECK: BEEF-STOCK GRAVY · GELATIN DESSERTS', 'n6:check', 1200, 965, WHITE, 26]] },
  ], 's1'));
}
// ---------- 6 spreading north ----------
const MS = mapG(260, 220, 1400, 650);
function sSpread(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('s1', [A('globeP', 760, 560, 2.2, 's1+0.2'), tk(1180, 560, 1.8, 's1:hearing')]),
    { at: 's2', under: underMap(MS, tt => 0.25 + 0.55 * clamp((tt - T('s2:once')) / (T('s2:maine') - T('s2:once') + 0.5))),
      cast: [tk(MS.X(-86), MS.Y(33), 1.4, 's2:tick', { mv: [['s2:midwest', MS.X(-90), MS.Y(40.5), 40], ['s2:new', MS.X(-75.5), MS.Y(42.8), 40], ['s2:maine', MS.X(-69.5), MS.Y(45.2), 30]] }),
        A('pin', MS.X(-90), MS.Y(40.5) - 60, 1.3, 's2:midwest+0.5', { hw: 40, hh: 56, o: { col: '#ff8f4a' } }), A('pin', MS.X(-75.5), MS.Y(42.8) - 60, 1.3, 's2:new+0.5', { hw: 40, hh: 56, o: { col: '#ff8f4a' } })],
      lab: [['ON THE MOVE: MIDWEST, NORTHEAST, UP TO MAINE', 's2:move', 960, 965, GOLD, 30]] },
    { at: 's3', cast: [A('snow', 300, 400, 1.6, 's3:milder', { morph: ['s3:winters+0.2', 'sun'] }), A('thermoC', 300, 760, 1.3, 's3:winters', { o: tt => ({ level: 0.3 + 0.4 * clamp((tt - T('s3:winters')) / 1.0) }) }),
      A('deer', 720, 520, 1.6, 's3:deer', AN), A('turkeyB', 1080, 520, 1.6, 's3:turkeys', { hw: 80, hh: 80 }), tk(720, 340, 0.9, 's3:feed', { follow: { i: 2, dx: -30, dy: -110 } }), tk(1080, 340, 0.9, 's3:feed+0.2', { follow: { i: 3, dx: 10, dy: -130 } }),
      A('house', 1440, 600, 1.6, 's3:suburbs', { push: [['s3:spreading', 70, 0]] }), A('treeP', 1720, 520, 1.8, 's3:woodland', { shake: ['s3:woodland', 0.5] })],
      lab: [['MILDER WINTERS · MORE HOSTS · SUBURBS', 's3:scientists', 960, 965, WHITE, 30]] },
    { at: 's4', cast: [A('pin', 300, 460, 1.8, 's4:arkansas', { hw: 40, hh: 56 }), A('docV', 680, 500, 1.8, 's4:labs', { o: { title: 'LAB REPORT', ticks: 0 } }),
      A('chart', 1250, 500, 2.4, 's4:number', { o: tt => ({ v: [0.45, 0.45 + 0.51 * clamp((tt - T('s4:doubled')) / 1.0)], hi: 1 }) }), A('calDay', 1680, 500, 1.6, 's4:2026', { o: { m: 'JAN–JUN', d: '2026' } })],
      tag: [['ARKANSAS', 's4:arkansas', 300, 720, '#9b3352', 36]], lab: [['JAN–JUN 2025: 1,331 SUSPECTED CASES', 's4:number', 1250, 760, WHITE, 26], ['JAN–JUN 2026: 2,833', 's4:doubled', 1250, 850, GOLD, 30], ['FIRST STATE TO REQUIRE LAB REPORTS', 's4:first', 760, 965, WHITE, 26]] },
    { at: 's5', cast: [A('doctor', 300, 560, 2.1, 's5:doctors'), ag(560, 300, 1.4, 's5:miss', { mv: [['s5:miss+0.9', 560, 300], ['s5:survey', 120, 300]], out: 's5:survey' }), A('docV', 760, 500, 1.8, 's5:survey', { o: { title: 'CDC SURVEY', ticks: 0 } }),
      A('pie2', 1160, 520, 2.4, 's5:42', { hw: 64, hh: 64, o: tt => ({ v: 0.42, k: clamp((tt - T('s5:42')) / 1.2) }) })],
      num: [['s5:42', 1590, 520, '42%', 'NEVER HEARD OF IT']], lab: [['2022 · 1,500 U.S. HEALTH CARE PROVIDERS', 's5:2022', 760, 965, WHITE, 28]] },
  ], 'f1'));
}
// ---------- 7 the first known death (kept short and dim) ----------
function sDeath(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('f1', [A('ecgM', 760, 560, 2.0, 'f1+0.2', { hw: 80, hh: 54 }), A('hospital', 1180, 560, 1.6, 'f1:kill')]),
    { at: 'f2', cast: [A('calDay', 280, 500, 1.7, 'f2:2024', { o: { m: 'YEAR', d: '2024' } }), A('patient', 660, 560, 2.1, 'f2:healthy', { o: tt => ({ col: '#127b84', mood: tt > T('f2:ill') ? 'sick' : 'happy' }), hit: ['f2:barbecue+0.5'], grey: 'f2:died' }),
      A('burger2', 1060, 330, 1.6, 'f2:hamburger', { hw: 72, hh: 58, mv: [['f2:barbecue+0.5', 760, 470, 80]], out: 'f2:about' }), A('grill', 1060, 640, 1.7, 'f2:barbecue', { hw: 84, hh: 96 }), A('clock3', 1520, 500, 1.9, 'f2:four', { pulse: ['f2:later'] })],
      lab: [['AGE 47 · NEW JERSEY', 'f2:47', 660, 840, WHITE, 28], ['~4 HOURS LATER', 'f2:hours', 1520, 800, GOLD, 30]] },
    { at: 'f2b', cast: [A('tent', 330, 520, 1.9, 'f2b:camping', { hw: 90, hh: 76 }), A('steak', 720, 500, 1.6, 'f2b:steak', { hw: 84, hh: 60 }), A('patient', 1100, 560, 2.0, 'f2b:frightening', { o: { col: '#127b84', mood: 'sick', hives: 1 }, shake: ['f2b:reaction', 0.8] }),
      A('puzzle', 1480, 420, 1.5, 'f2b:nobody', { o: { col: '#ffd98a' }, shake: ['f2b:linked', 0.6] }), A('puzzle', 1700, 660, 1.5, 'f2b:linked', { o: { col: '#8fd8e6' }, shake: ['f2b:meat', 0.6] })],
      fx: [['stream', 1, 2, 'f2b:hours', 'f2b:nobody', { col: '#ff9fb4', n: 5 }]], lab: [['TWO WEEKS EARLIER: A WARNING', 'f2b:weeks', 720, 965, '#ff9fb4', 30]] },
    { at: 'f3', cast: [A('autopsy', 300, 520, 2.0, 'f3:autopsy', { hw: 56, hh: 70 }), A('tubeB', 700, 520, 1.8, 'f3:blood', { hw: 40, hh: 80 }), abR(1060, 360, 1.5, 'f3:antibodies'),
      A('chart', 1450, 520, 2.3, 'f3:marker', { o: tt => ({ v: [0.18, 0.18 + 0.77 * clamp((tt - T('f3:higher')) / 1.0)], hi: 1 }) })],
      fx: [['stream', 1, 2, 'f3:found', 'f3:marker', { col: '#ff6f8f', n: 5 }], ['stream', 1, 3, 'f3:marker', 'f3:2025', { col: '#ffd98a', n: 5 }]],
      lab: [['NO CLEAR CAUSE', 'f3:clear', 300, 800, WHITE, 28], ['REACTION MARKER: FAR HIGHER THAN EVER SEEN', 'f3:higher', 1150, 965, GOLD, 28]] },
    { at: 'f3:2025', cast: [A('docV', 620, 520, 1.9, 'f3:2025', { o: { title: 'REPORT 2025', ticks: 0 } }), ag(1100, 520, 1.9, 'f3:alpha#1', { o: { bad: 1 } }), A('candle', 1500, 540, 1.8, 'f3:death', { hw: 40, hh: 80 })],
      tag: [['FIRST KNOWN DEATH FROM ALPHA-GAL SYNDROME', 'f3:first', 960, 900, '#2b3244', 32]] },
    { at: 'f4', cast: [A('adult', 300, 560, 2.0, 'f4:wife', { o: { col: '#b48cff', hair: '#7a4a2c' } }), A('ankle', 720, 520, 1.9, 'f4:dozen', { hw: 56, hh: 80 }), A('sun', 720, 200, 0.9, 'f4:summer'),
      A('larvae', 1140, 520, 2.0, 'f4:larvae', { hw: 70, hh: 64, mv: [['f4:mistake', 1180, 520]] }), A('mite', 1580, 520, 1.8, 'f4:chiggers', { hw: 70, hh: 64 })],
      fx: [['stream', 3, 1, 'f4:bites#1', 'f4:larvae', { col: '#c8704a', n: 6 }], ['zap', 3, 4, 'f4:chiggers', 0.6, '#ffd98a']],
      tag: [['LONE STAR TICK LARVAE?', 'f4:larvae', 1140, 800, '#9b3352', 32]], lab: [['OFTEN MISTAKEN FOR CHIGGERS', 'f4:mistake', 1300, 965, WHITE, 28]] },
  ], 'h1'));
}
// ---------- 8 living with it ----------
function sLiving(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('h1', [A('pillC', 760, 560, 2.0, 'h1+0.1'), A('epipen', 1180, 560, 1.5, 'h1+0.3', { hw: 100, hh: 60 })]),
    { at: 'h2', cast: [A('steak', 280, 400, 1.6, 'h2:mammal', { hw: 84, hh: 60 }), X_(280, 400, 'h2:meat+0.2', 0, 120, -90), A('milk', 640, 400, 1.4, 'h2:products'), X_(640, 400, 'h2:products+0.3', 2, 90, -110),
      A('gummy', 960, 400, 1.3, 'h2:products+0.3'), X_(960, 400, 'h2:products+0.6', 4, 90, -100), A('epipen', 640, 780, 1.5, 'h2:emergency', { hw: 100, hh: 60, pulse: ['h2:prescribes'] }), A('doctor', 1480, 560, 2.1, 'h2:doctor')],
      fx: [['stream', 7, 6, 'h2:prescribes', 'h2>', { col: '#ffd98a', n: 6 }]], tag: [['NO CURE YET · AVOID ALPHA-GAL', 'h2', 1480, 880, '#0b4f5c', 32]] },
    { at: 'h2b', cast: [A('pillC', 280, 520, 1.8, 'h2b'), A('magnifier', 520, 300, 1.4, 'h2b:checking', { mv: [['h2b:checking+0.6', 360, 420]] }), A('docV', 720, 520, 1.8, 'h2b:review', { o: { title: 'REVIEW 2022', ticks: 0 } }),
      A('capsule', 1080, 520, 1.5, 'h2b:drugs', { hw: 84, hh: 60 }), A('pig', 1420, 330, 1.3, 'h2b:animal', AN), ag(1420, 720, 1.4, 'h2b:alpha'), A('pillC', 1730, 520, 1.6, 'h2b:alternatives'), OK_(1730, 520, 'h2b:available', 6, 90, -100)],
      fx: [['stream', 4, 3, 'h2b:ingredients', 'h2b:alternatives', { col: '#ff9fb8', n: 5 }], ['stream', 5, 3, 'h2b:alpha+0.2', 'h2b:alternatives', { ic: 'agal', s: 0.3, n: 4 }]], lab: [['MEDICINES NEED CHECKING TOO', 'h2b:checking', 960, 965, WHITE, 30]] },
    { at: 'h3', cast: [A('ab', 420, 500, 2.3, 'h3:allergy', { hw: 52, hh: 72, o: tt => ({ col: RED, fade: tt < T('h3:back') ? clamp((tt - T('h3:fades')) / 1.5) : 1 - clamp((tt - T('h3:back')) / 0.4) }), hit: ['h3:back'] }), A('calDay', 820, 500, 1.6, 'h3:months', { o: tt => ({ m: tt > T('h3:years') ? 'YEARS' : 'MONTHS', d: '' + (1 + Math.floor(clamp((tt - T('h3:months')) / 2.5) * 11)) }) }),
      tk(1260, 360, 1.5, 'h3:bitten'), X_(1260, 360, 'h3:again', 2, 100, -100), tk(1640, 620, 1.9, 'h3:new', { mv: [['h3:back', 560, 520, 120]] })],
      lab: [['CAN FADE OVER MONTHS OR YEARS', 'h3:fades', 620, 800, GOLD, 28], ['A NEW BITE BRINGS IT BACK', 'h3:new', 1300, 965, '#ff9fb4', 30]] },
    { at: 'h3b', cast: [A('diary', 960, 520, 2.2, 'h3b+0.2', { hw: 64, hh: 80, pulse: ['h3b:pattern'] }), A('burger2', 360, 340, 1.7, 'h3b:food', { hw: 72, hh: 58, mv: [['h3b:meal+0.8', 760, 430, 60]], out: 'h3b:time' }),
      A('clock3', 360, 720, 1.7, 'h3b:late', { mv: [['h3b:time+0.8', 760, 620, 60]], out: 'h3b:symptoms+0.4' }), A('hivesI', 1560, 360, 1.5, 'h3b:symptoms', { hw: 76, hh: 56, mv: [['h3b:appear+0.4', 1160, 430, 60]] }), A('magnifier', 1560, 720, 1.6, 'h3b:spot', { mv: [['h3b:pattern', 1120, 600]] })],
      fx: [['burst', 0, 'h3b:pattern', '#ffd98a']], lab: [['A FOOD AND SYMPTOM DIARY', 'h3b:diary', 960, 965, WHITE, 30]] },
    QB('h4q', [A('heartR', 760, 560, 2.2, 'h4q+0.2', { o: { rate: 1.3 } }), abR(1180, 560, 1.6, 'h4q:linked')]),
    { at: 'h5', cast: [A('calDay', 300, 500, 1.7, 'h5:2018', { o: tt => ({ m: 'STUDY', d: tt > T('h5:2022') ? '2022' : '2018' }), pulse: ['h5:2022'] }), abR(680, 500, 1.7, 'h5:antibodies'),
      A('artery', 1120, 500, 2.2, 'h5:arteries', { hw: 84, hh: 56, o: tt => ({ plaque: clamp((tt - T('h5:plaque')) / 1.2) }) }), A('heartR', 1580, 500, 2.0, 'h5:heart', { pulse: ['h5:same'] })],
      fx: [['zap', 1, 2, 'h5:plaque', 0.7, '#ffd36b']], lab: [['UVA: MORE FATTY PLAQUE', 'h5:fatty', 1120, 800, GOLD, 28], ['A LARGER STUDY POINTED THE SAME WAY', 'h5:larger', 960, 965, WHITE, 28]] },
    { at: 'h5:doesn', cast: [abR(480, 520, 2.1, 'h5:doesn'), A('question', 960, 520, 1.7, 'h5:prove', { pulse: ['h5:cause'] }), A('heartR', 1440, 520, 2.2, 'h5:heart#1')],
      fx: [['zap', 0, 2, 'h5:cause', 0.5, '#8fd8e6']], tag: [['A LINK, NOT PROOF', 'h5:prove', 960, 860, '#0b4f5c', 40]] },
  ], 'p1'));
}
// ---------- 9 how to dodge the bite ----------
function sPrevent(t) {
  worldBG(t, 'pine');
  beats(t, chainB([
    QB('p1', [tk(760, 560, 2.4, 'p1+0.2'), A('trail', 1180, 560, 1.6, 'p1:avoid', { hw: 100, hh: 70 })]),
    { at: 'p2', cast: [tk(560, 300, 1.5, 'p2:bite', { erase: 'p2:walk+0.3' }), A('trail', 300, 600, 2.1, 'p2:trails', { hw: 100, hh: 70 }), A('shirt', 760, 560, 1.9, 'p2:cover', { hw: 70, hh: 64 }), A('spray', 1200, 520, 1.6, 'p2:treat'),
      A('pack', 1620, 560, 1.7, 'p2:gear', { hw: 48, hh: 70 })],
      fx: [['stream', 3, 2, 'p2:clothes', 'p2>', { col: 'rgba(200,255,220,0.9)', n: 7 }], ['stream', 3, 4, 'p2:gear', 'p2>', { col: 'rgba(200,255,220,0.9)', n: 7 }]], lab: [['MIDDLE OF THE TRAIL', 'p2:middle', 300, 860, WHITE, 28]], tag: [['PERMETHRIN', 'p2:permethrin', 1200, 860, '#127b84', 34]] },
    { at: 'p2b', cast: [A('spray', 300, 500, 1.7, 'p2b'), A('shirt', 700, 500, 1.8, 'p2b:fabric', { hw: 70, hh: 64 }), OK_(700, 500, 'p2b:fabric+0.3', 1, 120, -110),
      A('skinA', 1120, 520, 1.7, 'p2b:skin', { hw: 84, hh: 50 }), A('cross', 1120, 520, 0.75, 'p2b:skin+0.3', { follow: { i: 3, dx: 120, dy: -100 }, morph: ['p2b:repellent', 'check'] }), A('repel', 1580, 500, 1.8, 'p2b:repellent', { hw: 50, hh: 74 })],
      fx: [['stream', 0, 1, 'p2b:goes', 'p2b:skin', { col: 'rgba(200,255,220,0.9)', n: 6 }], ['stream', 5, 3, 'p2b:deet', 'p2b>', { col: 'rgba(255,230,200,0.9)', n: 7 }]],
      lab: [['FABRIC, NOT SKIN', 'p2b:fabric', 500, 800, WHITE, 30], ['SKIN: DEET OR PICARIDIN', 'p2b:deet', 1350, 965, GOLD, 30]] },
    { at: 'p3', cast: [A('treeP', 260, 540, 1.8, 'p3:outdoors'), A('adult', 640, 560, 1.9, 'p3:yourself'), A('kid', 1020, 580, 1.9, 'p3:kids'), A('dog', 1420, 600, 1.6, 'p3:pets', AN),
      A('magnifier', 640, 280, 1.4, 'p3:check', { mv: [['p3:kids', 1020, 300, 40], ['p3:pets', 1420, 360, 40]] })],
      lab: [['CHECK EVERYONE AFTER BEING OUTDOORS', 'p3:check', 960, 965, WHITE, 28]] },
    { at: 'p3:if', cast: [A('skinP', 600, 740, 2.6, 'p3:find', { hw: 90, hh: 40 }), tk(600, 580, 1.6, 'p3:tick', { o: { rot: Math.PI }, mv: [['p3:pull', 600, 580], ['p3:straight+0.4', 600, 330]] }),
      A('tweez', 1000, 330, 1.8, 'p3:tweezers', { hw: 30, hh: 72, mv: [['p3:pull', 630, 470], ['p3:straight+0.4', 630, 210]] })],
      lab: [['GRAB IT CLOSE TO THE SKIN', 'p3:close', 1420, 520, GOLD, 30], ['FINE-TIPPED TWEEZERS', 'p3:tweezers', 1420, 640, WHITE, 28], ['PULL STRAIGHT OUT', 'p3:straight', 1420, 760, WHITE, 30]] },
    { at: 'p3b', cast: [A('flame2', 300, 400, 1.6, 'p3b:burn', { hw: 56, hh: 74 }), X_(300, 400, 'p3b:burn+0.3', 0, 90, -100), A('polish', 680, 400, 1.6, 'p3b:polish', { hw: 50, hh: 70 }), X_(680, 400, 'p3b:polish+0.3', 2, 90, -100),
      A('jar', 1060, 400, 1.6, 'p3b:jelly', { hw: 56, hh: 64 }), X_(1060, 400, 'p3b:jelly+0.3', 4, 90, -100), A('tweez', 1430, 460, 1.7, 'p3b:pull', { hw: 30, hh: 72 }), A('soap', 1720, 500, 1.7, 'p3b:clean')],
      tag: [['SKIP THE OLD TRICKS', 'p3b:skip', 680, 760, '#9b3352', 36]], lab: [['JUST PULL IT OUT AND CLEAN THE BITE', 'p3b:just', 1300, 965, WHITE, 28]] },
    { at: 'p4', cast: [A('patient', 330, 560, 2.1, 'p4:wake', { o: tt => ({ mood: 'sick', hives: clamp((tt - T('p4:hives')) / 0.8) }) }), A('steak', 720, 340, 1.5, 'p4:steak', { hw: 84, hh: 60 }), tk(720, 720, 1.4, 'p4:tick', { mv: [['p4:bites', 900, 640, 60]] }),
      A('doctor', 1080, 560, 2.1, 'p4:doctor'), A('tubeB', 1450, 520, 1.8, 'p4:blood', { hw: 40, hh: 80 }), abR(1720, 520, 1.6, 'p4:antibodies')],
      fx: [['stream', 0, 3, 'p4:tell', 'p4:simple', { col: '#ffd98a', n: 6 }], ['zap', 4, 5, 'p4:antibodies', 0.6, '#ffd98a']], lab: [['A SIMPLE BLOOD TEST', 'p4:simple', 1500, 800, GOLD, 30], ['TELL YOUR DOCTOR ABOUT TICK BITES', 'p4:tell', 700, 965, WHITE, 28]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [tk(760, 560, 2.2, 'o1+0.2'), A('steak', 1180, 560, 1.7, 'o1:eat', { hw: 84, hh: 60, shake: ['o1:eat+0.3', 0.6] })]),
    { at: 'o2', cast: [ag(330, 500, 2.0, 'o2:sugar', { mv: [['o2:slips', 700, 470, 80]], out: 'o2:under' }), tk(800, 500, 2.3, 'o2:tick', { pulse: ['o2:slips+0.1'] }), A('shieldC', 1260, 500, 1.9, 'o2:immune', { pulse: ['o2:forgets'] }),
      abR(1640, 360, 1.4, 'o2:forgets'), abR(1640, 660, 1.4, 'o2:forgets+0.2')],
      fx: [['stream', 1, 2, 'o2:skin', 'o2:forgets', { col: '#ffd98a', n: 6 }], ['burst', 2, 'o2:strangest', '#ffd98a']], lab: [['ONE OF THE STRANGEST ALLERGIES EVER FOUND', 'o2:strangest', 960, 965, GOLD, 30]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [tk(480, 420, 2.0, 'o3'), A('burger2', 480, 760, 1.6, 'o3', { hw: 72, hh: 58, shake: ['o3:meat', 0.6] })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'A TICK BITE CAN MAKE YOU', 'ALLERGIC TO MEAT', 1330, 52, 84);
}
Object.assign(ICONS, { candle(t) { rr2(-20, -10, 40, 90, 10, '#f3ead8'); rr2(-14, -4, 8, 70, 4, 'rgba(255,255,255,0.4)'); rr2(-2, -24, 4, 16, 2, '#3a3f5a'); const f = Math.sin(t * 11) * 3; ctx.fillStyle = '#ffd36b'; ctx.beginPath(); ctx.moveTo(0, -70 + f); ctx.quadraticCurveTo(18, -40, 0, -26); ctx.quadraticCurveTo(-18, -40, 0, -70 + f); ctx.fill(); ell(0, -38, 5, 9, '#fff3c8'); },
  star(t) { const p = 1 + 0.08 * Math.sin(t * 4); ctx.save(); ctx.rotate(t * 0.4); ctx.scale(p, p); ctx.fillStyle = '#fff8e8'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283 - Math.PI / 2, r = i % 2 ? 24 : 58; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); circ(0, 0, 14, '#ffd98a'); ctx.restore(); } });
Object.assign(IDLE, { candle: {}, star: {} });

const CHAPTERS = [['a1', 'A sugar called alpha-gal', 'cream', 'cow'], ['t1', 'The lone star tick', 'teal', 'tickI'], ['r1', 'Why it strikes hours later', 'indigo', 'clock3'], ['k1', 'A cancer drug cracked the case', 'grey', 'drip'], ['n1', 'Not just steak', 'gold', 'steak'],
  ['s1', 'Spreading north', 'night', 'deer'], ['f1', 'The first known death', 'grey', 'autopsy'], ['h1', 'Living with it', 'teal', 'epipen'], ['p1', 'How to dodge the bite', 'pine', 'tweezers']];
Object.assign(ICONS, { tweezers(t) { ICONS.tweez(t); ctx.save(); ctx.translate(0, 60); ctx.scale(0.2, 0.2); tickAt(t, 0, 0, 1, { rot: Math.PI }); ctx.restore(); } }); IDLE.tweezers = {};
function SECTIONS() { return makeSections(CHAPTERS, { a1: [sSugar, 'a2'], t1: [sTick, 't2'], r1: [sDelay, 'r2'], k1: [sDrug, 'k2'], n1: [sFoods, 'n2'], s1: [sSpread, 's2'], f1: [sDeath, 'f2'], h1: [sLiving, 'h2'], p1: [sPrevent, 'p2'] }, sOpen, sOutro); }
