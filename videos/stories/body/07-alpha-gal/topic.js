// "A tick bite can make you allergic to meat" (alpha-gal syndrome) — topic file for the shared explainer engine
const L = id => LN(id), S = id => LN(id).start, E = id => LN(id).end;
function buildCues() { const C = CUE; C.title = S('o3') + 0.3; C.end = DUR - TAIL; C.calls = S('o3'); }
const TICK = '#8a3a26', TICK2 = '#6a2a1a', SKIN = '#f2b38f', TURKEY = '#c8793a', TURKEY2 = '#9a5524', SPROUT = '#6fae4a', SPROUT2 = '#4d8a32', AGAL = '#ffd98a';

// ---------- shared helpers ----------
function kidAt(t, x, y, s, o = {}) { CAM = { x: 960, y: 540, z: 1 }; KID = { x, y }; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); drawKid(t, o); ctx.restore();
  if (o.hives) { const r = rng(4); for (let i = 0; i < 16; i++) { const a = 0.5 + 0.5 * Math.sin(t * 3 + i); circ(x + (r() - 0.5) * 110 * s, y - (40 + r() * 200) * s, (6 + r() * 6) * s * a, 'rgba(226,69,122,0.85)'); } }
  reg('hero', 'mascot', x - 70 * s, y - 290 * s, x + 70 * s, y + 12 * s); }
function tile3(t, items, y = 520) {
  items.forEach(([ic, lab, col, t0, o], i) => { const k = spring(t - t0 + 0.1, 0.5, 13); if (k <= 0) return; const x = 380 + i * 580;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rr2(-250, -280, 500, 560, 36, col); ctx.restore(); reg('panel', lab, x - 250, y - 280, x + 250, y + 280);
    ctx.save(); ctx.translate(x, y - 40); ctx.scale(2.3 * k, 2.3 * k); drawIcon(ic, t, o || {}); ctx.restore();
    if (o && o.mark != null) stamp(o.mark, x + 170, y - 200, t, t0 + 0.5);
    if (k > 0.6) riseText(lab, x, y + 200, t0 + 0.15, t, { size: 34, weight: 700, color: WHITE, pill: false }); });
}
function stamp(ok, x, y, t, t0) { if (t < t0) return; const k = spring(t - t0, 0.45, 14), s = lerp(1.7, 1, k) * clamp((t - t0) / 0.1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, 0, 44, ok ? '#3fae6a' : '#e2457a');
  if (ok) { ctx.save(); ctx.rotate(0.75); rr2(-6, -24, 12, 40, 6, '#fff'); rr2(-18, 4, 18, 12, 6, '#fff'); ctx.restore(); } else for (const a of [0.78, -0.78]) { ctx.save(); ctx.rotate(a); rr2(-6, -26, 12, 52, 6, '#fff'); ctx.restore(); } ctx.restore(); }
function arrow(x, y, t, t0, w = 90) { if (t < t0) return; const k = eoq((t - t0) / 0.5), p = Math.sin(t * 4) * 6; ctx.save(); ctx.globalAlpha = k; ctx.translate(x + p, y); rr2(-w / 2, -8, w - 20, 16, 8, 'rgba(255,255,255,0.8)'); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.moveTo(w / 2 - 30, -24); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 2 - 30, 24); ctx.fill(); ctx.restore(); }
function glint(t, w, h, period = 2.4) { const p = (t % period) / period; if (p > 0.45) return; const k = p / 0.45, a = Math.sin(k * Math.PI), x = lerp(-w * 0.55, w * 0.45, k), y = lerp(-h * 0.55, -h * 0.15, k), r = 8 + 10 * a;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); ctx.restore(); }
function hexTag(x, y, r, c = AGAL) { ctx.fillStyle = c; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.fill(); }

// ---------- heroes ----------
function tickAt(t, x, y, s, o = {}) {   // a lone star tick seen from above: 8 walking legs, mouthparts, the white spot
  const g = t * (o.speed ?? 6), fed = o.fed || 0;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  for (let i = 0; i < 4; i++) for (const sd of [-1, 1]) { const ph = g + i * 1.3 + (sd > 0 ? Math.PI : 0), sw = Math.sin(ph) * 0.25; ctx.save(); ctx.translate(sd * 46, -40 + i * 26); ctx.rotate(sd * (0.4 + i * 0.32 - 0.5) + sw); rr2(0, -7, sd * 70, 14, 7, TICK2); ctx.translate(sd * 66, 0); ctx.rotate(sd * 0.7); rr2(0, -5, sd * 50, 10, 5, TICK2); ctx.restore(); }
  ctx.fillStyle = TICK2; ctx.beginPath(); ctx.moveTo(-18, -96); ctx.lineTo(18, -96); ctx.lineTo(10, -126); ctx.lineTo(-10, -126); ctx.fill(); for (const sd of [-1, 1]) rr2(sd * 14 - 4, -140, 8, 30, 4, TICK2);   // mouthparts
  const b = 1 + fed * 0.5; ctx.fillStyle = TICK; ctx.beginPath(); ctx.ellipse(0, 0, 70 * b, 96 * (1 + fed * 0.3), 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#a8452f'; ctx.beginPath(); ctx.ellipse(0, -40, 52, 50, 0, 0, 6.283); ctx.fill();   // scutum
  const p = 0.85 + 0.15 * Math.sin(t * 3); circ(0, -12, 15 * p, '#fff8e8'); circ(0, -12, 7, '#ffffff');   // the "lone star"
  for (let i = 0; i < 6; i++) rr2(-50 + i * 20, 40, 6, 30, 3, 'rgba(0,0,0,0.15)'); rr2(-40, -70, 26, 10, 5, 'rgba(255,255,255,0.3)');
  ctx.restore();
}
function cellAt(t, x, y, r, tags, col = '#f29db0') {   // a cell with (or without) alpha-gal sugar tags on its surface
  const b = 1 + Math.sin(t * 2) * 0.03; ctx.save(); ctx.translate(x, y); ctx.scale(b, b); circ(0, 0, r, col); circ(0, 0, r * 0.82, 'rgba(255,255,255,0.18)'); circ(r * 0.15, r * 0.1, r * 0.3, 'rgba(120,60,160,0.5)');
  if (tags) for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283 + t * 0.1; ctx.save(); ctx.translate(Math.cos(a) * r, Math.sin(a) * r); ctx.rotate(a + Math.PI / 2); rr2(-2, -18, 4, 18, 2, '#e8dcc4'); hexTag(0, -26, 11 + Math.sin(t * 3 + i) * 1.5); ctx.restore(); }
  ctx.restore(); }
function usMap(t, x0, y0, w, h, spread, t0) {   // stylised contiguous US; the tick range grows from the south-east by `spread` 0..1
  const P = [[-124.7, 48.4], [-123, 46], [-124.2, 42], [-120.5, 34.5], [-117.1, 32.5], [-114.7, 32.7], [-111, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-103.3, 29], [-101.4, 29.8], [-99.5, 27.5], [-97.2, 25.9], [-97.4, 27.8], [-94.7, 29.4], [-90.2, 29.1], [-89.4, 30.2], [-85, 29.6], [-83, 29], [-82.7, 27.6], [-81.1, 25.1], [-80.1, 26.5], [-80.6, 28.4], [-81.4, 30.7], [-79.2, 33.2], [-76.5, 34.7], [-75.5, 35.6], [-76.3, 37], [-75, 38.4], [-74, 40.5], [-71.9, 41.3], [-70, 41.7], [-70.6, 42.7], [-70.2, 43.7], [-67, 44.8], [-67.8, 47.1], [-69.2, 47.4], [-71.5, 45], [-74.9, 45], [-76.8, 43.6], [-79.2, 43.4], [-79.1, 42.9], [-82.7, 41.7], [-83.5, 42.3], [-82.5, 45.3], [-84.6, 46.5], [-88.4, 48.3], [-89.6, 48], [-95.2, 49], [-123.3, 49]];
  const X = lo => x0 + (lo + 125) / 59 * w, Y = la => y0 + (49.5 - la) / 25 * h, path = new Path2D(); P.forEach(([a, b], i) => i ? path.lineTo(X(a), Y(b)) : path.moveTo(X(a), Y(b))); path.closePath();
  ctx.fillStyle = '#f2dcb0'; ctx.fill(path); ctx.save(); ctx.clip(path); const cx = X(-86), cy = Y(32), R = lerp(0.35, 0.75, spread) * w;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, 'rgba(200,85,61,0.85)'); g.addColorStop(0.75, 'rgba(200,85,61,0.55)'); g.addColorStop(1, 'rgba(200,85,61,0)'); ctx.fillStyle = g; ctx.fillRect(x0, y0, w, h); ctx.restore();
  reg('hero', 'us map', x0, y0, x0 + w, y0 + h); return { X, Y };
}
function turkeyAt(t, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#e8eef6'; ctx.beginPath(); ctx.ellipse(0, 70, 230, 46, 0, 0, 6.283); ctx.fill(); for (const [gx, c] of [[-150, SPROUT], [-120, SPROUT2], [150, '#ffcf6b'], [120, '#ffb35c']]) circ(gx, 60, 22, c);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 120, 10); ctx.rotate(sd * 0.5); ctx.fillStyle = TURKEY2; ctx.beginPath(); ctx.ellipse(0, 0, 58, 38, 0, 0, 6.283); ctx.fill(); rr2(sd > 0 ? 40 : -76, -10, 36, 18, 9, '#f3ead8'); ctx.restore(); }
  ctx.fillStyle = TURKEY; ctx.beginPath(); ctx.ellipse(0, -10, 150, 100, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e09a52'; ctx.beginPath(); ctx.ellipse(-20, -40, 100, 50, -0.15, 0, 6.283); ctx.fill(); rr2(-90, -70, 70, 16, 8, 'rgba(255,255,255,0.35)'); glint(t, 140, 100);
  for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.7; circ(-50 + i * 50 + Math.sin(p * 6 + i) * 10, -130 - p * 110, 14 + p * 10, 'rgba(255,255,255,0.8)'); ctx.restore(); } ctx.restore();
}

// ---------- icons ----------
Object.assign(ICONS, {
  tickI(t) { ctx.save(); ctx.scale(0.5, 0.5); tickAt(t, 0, 10, 1); ctx.restore(); },
  steak(t) { ctx.fillStyle = '#b8323a'; ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(-60, -50, 0, -46); ctx.quadraticCurveTo(70, -44, 72, 0); ctx.quadraticCurveTo(70, 40, 10, 44); ctx.quadraticCurveTo(-60, 46, -70, -10); ctx.fill(); ctx.strokeStyle = '#f3e3d0'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-58, -8); ctx.quadraticCurveTo(-50, -40, 0, -38); ctx.stroke(); circ(20, 4, 14, '#f3e3d0'); for (let i = 0; i < 3; i++) rr2(-40 + i * 30, -20, 6, 50, 3, 'rgba(60,20,20,0.35)'); },
  burger2(t) { const b = Math.abs(Math.sin(t * 3)) * 0.05; ctx.scale(1 + b, 1 - b); rr2(-60, -44, 120, 38, 19, '#f2a65a'); rr2(-64, -10, 128, 12, 6, '#5aa96a'); rr2(-62, 2, 124, 20, 10, '#7a4a2c'); rr2(-64, 22, 128, 8, 4, '#ffd36b'); rr2(-60, 30, 120, 22, 11, '#f2a65a'); for (const [x, y] of [[-20, -32], [10, -36], [32, -28]]) circ(x, y, 3, '#fff7e0'); },
  milk(t) { rr2(-36, -50, 72, 110, 8, '#f3f7fb'); ctx.fillStyle = '#c9d6ec'; ctx.beginPath(); ctx.moveTo(-36, -50); ctx.lineTo(0, -80); ctx.lineTo(36, -50); ctx.fill(); rr2(-36, -10, 72, 30, 4, '#5aa9e6'); font(18, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('MILK', 0, 6); },
  cheese(t) { ctx.fillStyle = '#ffcf4a'; ctx.beginPath(); ctx.moveTo(-70, 30); ctx.lineTo(70, 30); ctx.lineTo(70, -10); ctx.lineTo(-70, -40); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffe58a'; ctx.beginPath(); ctx.moveTo(-70, -40); ctx.lineTo(70, -10); ctx.lineTo(50, -24); ctx.lineTo(-60, -50); ctx.fill(); for (const [x, y, r] of [[-30, 6, 10], [20, 12, 8], [44, -2, 6]]) circ(x, y, r, '#e0a92a'); },
  gummy(t) { const sq = Math.sin(t * 4) * 0.08; ctx.scale(1 + sq, 1 - sq); ctx.fillStyle = '#ff7a9a'; ctx.beginPath(); ctx.ellipse(0, 10, 40, 46, 0, 0, 6.283); ctx.fill(); circ(-26, -34, 16, '#ff7a9a'); circ(26, -34, 16, '#ff7a9a'); circ(-14, -4, 5, '#20232f'); circ(14, -4, 5, '#20232f'); rr2(-26, 10, 14, 30, 7, 'rgba(255,255,255,0.35)'); },
  capsule(t) { ctx.save(); ctx.rotate(-0.6 + Math.sin(t * 2) * 0.15); rr2(-70, -26, 70, 52, 26, '#e2457a'); rr2(0, -26, 70, 52, 26, '#f3f7fb'); rr2(-56, -16, 40, 10, 5, 'rgba(255,255,255,0.45)'); ctx.restore(); },
  grill(t) { ctx.fillStyle = '#3a3f5a'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, Math.PI); ctx.fill(); rr2(-80, -8, 160, 12, 6, '#5b6585'); rr2(-6, 60, 12, 40, 6, '#3a3f5a'); for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 30, 64); ctx.rotate(sd * 0.4); rr2(-5, 0, 10, 40, 5, '#3a3f5a'); ctx.restore(); }
    ctx.save(); ctx.translate(0, -18); ctx.scale(0.6, 0.6); ICONS.burger2(t); ctx.restore(); for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.7; circ(-30 + i * 30 + Math.sin(p * 6) * 10, -60 - p * 90, 14 + p * 14, 'rgba(220,220,230,0.8)'); ctx.restore(); } },
  cow(t) { rr2(-70, -30, 130, 64, 30, '#f3f7fb'); circ(-30, -10, 16, '#20232f'); circ(20, 6, 12, '#20232f'); for (const lx of [-56, -30, 24, 44]) rr2(lx, 26, 14, 36 + Math.sin(t * 6 + lx) * 2, 7, '#d9e0ec'); ctx.save(); ctx.translate(64, -30); ctx.rotate(Math.sin(t * 1.5) * 0.08); rr2(-10, -26, 44, 50, 18, '#f3f7fb'); rr2(10, 6, 30, 22, 11, '#f7b6c4'); circ(4, -10, 4, '#20232f'); rr2(-14, -38, 10, 16, 5, '#d9c7a0'); rr2(20, -38, 10, 16, 5, '#d9c7a0'); ctx.restore(); },
  pig(t) { ctx.fillStyle = '#ff9fb8'; ctx.beginPath(); ctx.ellipse(-6, 0, 66, 44, 0, 0, 6.283); ctx.fill(); circ(56, -8, 30, '#ff9fb8'); rr2(74, -16, 18, 22, 9, '#ff7a9a'); circ(80, -8, 3, '#c95a7c'); circ(86, -8, 3, '#c95a7c'); circ(56, -20, 4, '#20232f'); ctx.fillStyle = '#ff7a9a'; ctx.beginPath(); ctx.moveTo(40, -34); ctx.lineTo(52, -54); ctx.lineTo(60, -34); ctx.fill(); for (const lx of [-50, -26, 18, 38]) rr2(lx, 30, 14, 26, 7, '#ff8fa8');
    ctx.strokeStyle = '#ff7a9a'; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i < 12; i++) { const a = i * 0.6 + t * 4; ctx.lineTo(-74 - i * 1.5 + Math.cos(a) * 6, -10 + Math.sin(a) * 6); } ctx.stroke(); },
  deer(t) { rr2(-60, -24, 110, 50, 25, '#b0753a'); for (const lx of [-50, -28, 20, 38]) rr2(lx, 20, 10, 50, 5, '#9a6530'); ctx.save(); ctx.translate(44, -20); ctx.rotate(-0.4 + Math.sin(t * 1.2) * 0.08); rr2(-10, -60, 22, 66, 11, '#b0753a'); circ(4, -66, 20, '#b0753a'); circ(14, -70, 3.5 * (1 - blinkF(t)) + 0.5, '#20232f'); ctx.strokeStyle = '#d9c7a0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 6, -82); ctx.lineTo(sd * 18, -116); ctx.moveTo(sd * 12, -100); ctx.lineTo(sd * 30, -108); ctx.stroke(); } ctx.restore(); },
  monkey(t) { circ(0, 0, 54, '#7a5a3a'); circ(-50, -4, 18, '#7a5a3a'); circ(50, -4, 18, '#7a5a3a'); circ(-50, -4, 10, '#e9b7a0'); circ(50, -4, 10, '#e9b7a0'); ctx.fillStyle = '#e9b7a0'; ctx.beginPath(); ctx.ellipse(0, 12, 36, 32, 0, 0, 6.283); ctx.fill(); circ(-16, -18, 12, '#e9b7a0'); circ(16, -18, 12, '#e9b7a0'); const bl = 1 - blinkF(t + 0.5); circ(-16, -16, 5 * bl + 0.5, '#20232f'); circ(16, -16, 5 * bl + 0.5, '#20232f'); rr2(-10, 22, 20, 5, 2.5, '#9a6a5a'); },
  person(t) { circ(0, -50, 22, SKIN); rr2(-24, -26, 48, 70, 22, '#5b4fd6'); rr2(-20, 40, 16, 30, 8, '#2d2b7c'); rr2(4, 40, 16, 30, 8, '#2d2b7c'); ctx.save(); ctx.translate(26, -18); ctx.rotate(-1.8 + Math.sin(t * 6) * 0.4); rr2(-6, 0, 12, 40, 6, '#5b4fd6'); ctx.restore(); },
  antibody(t, o) { ctx.save(); ctx.rotate(Math.sin(t * 1.5) * 0.15); const c = o.col || '#8fd8e6'; rr2(-8, -4, 16, 70, 8, c); for (const sd of [-1, 1]) { ctx.save(); ctx.translate(0, 0); ctx.rotate(sd * 0.7); rr2(-8, -64, 16, 64, 8, c); circ(0, -66, 12, '#ffffff'); ctx.restore(); } ctx.restore(); },
  mast(t) { const pop = Math.max(0, Math.sin(t * 1.4)); circ(0, 0, 60, '#b48cff'); circ(10, 6, 20, '#7f5fd6'); for (let i = 0; i < 12; i++) { const a = i * 0.52 + 0.3, d = 34 + pop * 70 * (i % 2); circ(Math.cos(a) * d, Math.sin(a) * d * 0.9, 7, '#ff8f4a'); } },
  fatball(t) { for (let i = 0; i < 5; i++) { const a = i * 1.26 + t * 0.6; circ(Math.cos(a) * 34, Math.sin(a) * 34, 26, '#ffd36b'); circ(Math.cos(a) * 34 - 8, Math.sin(a) * 34 - 8, 6, 'rgba(255,255,255,0.6)'); hexTag(Math.cos(a) * 34 + 14, Math.sin(a) * 34 - 16, 7, '#c95a7c'); } },
  clock3(t, o) { circ(0, 0, 56, '#f3f7fb'); circ(0, 0, 46, '#102348'); for (let i = 0; i < 12; i++) { ctx.save(); ctx.rotate(i / 12 * 6.283); rr2(-2, -42, 4, 8, 2, '#8fd8e6'); ctx.restore(); } ctx.save(); ctx.rotate(t * 2); rr2(-3, -34, 6, 36, 3, '#ff8f4a'); ctx.restore(); ctx.save(); ctx.rotate(t * 0.2 + 1); rr2(-4, -24, 8, 26, 4, '#f3f7fb'); ctx.restore(); circ(0, 0, 6, '#ffd98a'); },
  drip(t) { rr2(-40, -90, 80, 100, 18, 'rgba(200,230,255,0.7)'); rr2(-34, -60, 68, 64, 12, 'rgba(255,217,138,0.7)'); rr2(-4, 10, 8, 40, 4, '#c9d6ec'); const p = (t * 1.2) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(0, 50 + p * 40, 6, '#ffd98a'); ctx.restore(); rr2(-20, -100, 40, 12, 6, '#9aa6c4'); },
  mouse(t) { const hop = Math.abs(Math.sin(t * 3)) * 4; ctx.save(); ctx.translate(0, -hop); ctx.fillStyle = '#c9cfe0'; ctx.beginPath(); ctx.ellipse(0, 10, 56, 34, 0, 0, 6.283); ctx.fill(); circ(48, -10, 26, '#c9cfe0'); circ(36, -36, 16, '#e9b7c4'); circ(60, -12, 4.5 * (1 - blinkF(t)) + 0.5, '#20232f'); circ(74, -4, 5, '#e2457a'); ctx.restore(); },
  drumstick(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 1.5) * 0.08); ctx.fillStyle = TURKEY; ctx.beginPath(); ctx.ellipse(-16, 0, 56, 40, 0, 0, 6.283); ctx.fill(); rr2(30, -9, 46, 18, 9, '#f3ead8'); circ(78, -11, 11, '#f3ead8'); circ(78, 9, 11, '#f3ead8'); ctx.restore(); },
  fish(t) { const w = Math.sin(t * 5) * 0.2; ctx.fillStyle = '#5aa9e6'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 34, 0, 0, 6.283); ctx.fill(); ctx.save(); ctx.translate(-64, 0); ctx.rotate(w); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, -30); ctx.lineTo(-40, 30); ctx.fill(); ctx.restore(); circ(44, -8, 6, '#20232f'); },
  gravy(t) { ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 20, 70, 30, 0, 0, Math.PI); ctx.lineTo(-70, 0); ctx.quadraticCurveTo(0, -10, 70, 0); ctx.fill(); ctx.fillStyle = '#8a4a20'; ctx.beginPath(); ctx.ellipse(0, 4, 60, 12, 0, 0, 6.283); ctx.fill(); rr2(64, -6, 40, 12, 6, '#f3f7fb'); for (let i = 0; i < 2; i++) { const p = (t * 0.5 + i / 2) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.6; circ(-20 + i * 40, -20 - p * 50, 10 + p * 6, 'rgba(255,255,255,0.8)'); ctx.restore(); } },
  vial(t, o) { rr2(-20, -70, 40, 130, 18, 'rgba(220,240,255,0.5)'); rr2(-16, -20, 32, 76, 14, '#c33244'); rr2(-24, -84, 48, 22, 8, o.cap || '#5b4fd6'); rr2(-12, -60, 8, 90, 4, 'rgba(255,255,255,0.5)'); },
  ankle(t) { rr2(-30, -90, 60, 130, 26, SKIN); rr2(-30, 20, 110, 44, 22, SKIN); for (let i = 0; i < 12; i++) { const r = rng(i * 3 + 1); const p = 0.6 + 0.4 * Math.sin(t * 3 + i); circ(-20 + r() * 60, -60 + r() * 100, 5 * p, '#e2457a'); } },
  epipen(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 1.5) * 0.08); rr2(-90, -18, 180, 36, 18, '#ffd36b'); rr2(-90, -18, 50, 36, 18, '#5b4fd6'); rr2(70, -14, 30, 28, 10, '#ff8f4a'); rr2(-20, -10, 60, 6, 3, 'rgba(255,255,255,0.5)'); ctx.restore(); },
  diary(t) { rr2(-60, -76, 120, 152, 10, '#127b84'); rr2(-50, -66, 100, 132, 6, '#f3f7fb'); for (let i = 0; i < 6; i++) rr2(-40, -50 + i * 20, 80 - (i % 2) * 24, 6, 3, '#9fb0d8'); const p = (t * 0.6) % 1; ctx.save(); ctx.translate(-30 + p * 60, 70 - 120 * ((t * 0.3) % 1)); ctx.rotate(0.6); rr2(-4, -40, 8, 44, 3, '#ff8f4a'); ctx.restore(); },
  heartP(t) { const b = 1 + 0.07 * Math.max(0, Math.sin(t * 6)); ctx.scale(b, b); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(0, 50); ctx.bezierCurveTo(-76, 0, -50, -60, 0, -26); ctx.bezierCurveTo(50, -60, 76, 0, 0, 50); ctx.fill(); ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-30, -30); ctx.quadraticCurveTo(-10, 0, -24, 30); ctx.stroke(); circ(-18, -4, 9, '#ffd36b'); },
  spray(t) { rr2(-28, -40, 56, 110, 16, '#5aa96a'); rr2(-18, -64, 36, 26, 8, '#f3f7fb'); rr2(14, -58, 30, 10, 5, '#f3f7fb'); for (let i = 0; i < 6; i++) { const p = ((t * 1.2) + i / 6) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(46 + p * 70, -54 + (i - 2.5) * p * 14, 4 + p * 3, 'rgba(200,255,220,0.8)'); ctx.restore(); } font(14, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('0.5%', 0, 20); },
  tweezers(t) { const k = (Math.sin(t * 1.6) + 1) / 2; ctx.save(); ctx.translate(0, -k * 30); for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * 0.08); rr2(sd > 0 ? 0 : -10, -100, 10, 110, 5, '#c9d6ec'); ctx.restore(); } ctx.restore(); ctx.save(); ctx.translate(0, 30 - k * 30); ctx.scale(0.22, 0.22); tickAt(t, 0, 0, 1, { rot: Math.PI }); ctx.restore(); rr2(-60, 46, 120, 20, 10, SKIN); },
  trail(t) { ctx.fillStyle = '#5aa96a'; ctx.beginPath(); ctx.moveTo(-100, 70); ctx.lineTo(-30, -70); ctx.lineTo(30, -70); ctx.lineTo(100, 70); ctx.fill(); ctx.fillStyle = '#d9c7a0'; ctx.beginPath(); ctx.moveTo(-40, 70); ctx.lineTo(-10, -70); ctx.lineTo(10, -70); ctx.lineTo(40, 70); ctx.fill(); for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(sd * (60 + i * 6), 50 - i * 34); ctx.rotate(Math.sin(t * 2 + i) * 0.15); rr2(-3, -26, 6, 26, 3, '#3f7f4c'); ctx.restore(); } },
  autopsy(t) { rr2(-50, -64, 100, 128, 8, '#f3f7fb'); for (let i = 0; i < 5; i++) rr2(-36, -44 + i * 18, 72 - (i % 2) * 20, 6, 3, '#9fb0d8'); font(40, 700); ctx.fillStyle = '#e2457a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 26, 40 + Math.sin(t * 3) * 3); },
});
Object.assign(IDLE, { tickI: {}, steak: { post: t => puff(t, 0, -50, 3, -1, 'rgba(255,255,255,0.4)', 9) }, burger2: {}, milk: { pre: t => ctx.rotate(Math.sin(t * 2) * 0.06) }, cheese: { post: t => glint(t, 70, 40) }, gummy: {}, capsule: {}, grill: {}, cow: {}, pig: {}, deer: {}, monkey: {}, person: {}, antibody: {}, mast: {}, fatball: {}, clock3: {}, drip: {}, mouse: {}, drumstick: {}, fish: {}, gravy: {}, vial: { post: t => glint(t, 24, 70) }, ankle: {}, epipen: { post: t => glint(t, 90, 30) }, diary: {}, heartP: {}, spray: {}, tweezers: {}, trail: {}, autopsy: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) } });

// ---------- scenes ----------
function sOpen(t) {
  if (t < S('c3') - 0.1) { worldBG(t, 'night'); const night = t > W_('c2', 'waking') - 0.3;
    if (!night) { placeIcon('burger2', [[1300, 470]], 3.0, t, W_('c2', 'burger') - 0.3, W_('c2', 'waking') - 0.4, { hw: 66, hh: 54 }); kidAt(t, 600, 940, 1.7, { look: [1, -0.2] }); label('FEELING FINE', 1300, 760, t, W_('c2', 'fine'), W_('c2', 'waking') - 0.5, WHITE, 32); return; }
    drawMoon(t, 0.5, 1); reg('hero', 'moon', 0, 380, 330, 700); kidAt(t, 960, 960, 1.9, { hives: 1, lid: 0.2, look: [0, -0.3], wobble: Math.sin(t * 20) * 3 }); placeIcon('clock3', [[1500, 360]], 1.8, t, W_('c2', 'middle') - 0.2, S('c3') - 0.2, { hw: 58, hh: 58 });
    label('HOURS AFTER THE MEAL', 1500, 620, t, W_('c2', 'hours'), S('c3') - 0.3, GOLD, 32); label('HIVES · SWELLING', 1500, 720, t, W_('c2', 'hives'), S('c3') - 0.3, '#ff9fb4', 30); return; }
  if (t < S('c4q') - 0.1) { worldBG(t, 'coral'); tag('ALPHA-GAL SYNDROME', 960, 180, t, W_('c3', 'alpha') - 0.1, S('c4q') - 0.3, '#9b3352', 52);
    const n = clamp((t - W_('c3', ['450', 'four'])) / 2.5) * 90; for (let i = 0; i < n; i++) { const x = 280 + (i % 18) * 76, y = 400 + Math.floor(i / 18) * 90; ctx.save(); ctx.translate(x, y); ctx.scale(0.5, 0.5); ICONS.person(t + i); ctx.restore(); } reg('hero', 'people', 230, 340, 1690, 830);
    label('UP TO 450,000 AMERICANS SINCE 2010 (CDC)', 960, 920, t, W_('c3', ['450', 'four']), S('c4q') - 0.3, WHITE, 32); label("AND IT'S SPREADING", 960, 1010, t, W_('c3', 'spreading'), S('c4q') - 0.3, GOLD, 30); return; }
  worldBG(t, 'teal'); tickAt(t, 960, 560, 1.9 * spring(t - S('c4q') - 0.2, 0.5, 11)); reg('hero', 'tick', 960 - 300, 560 - 290, 960 + 300, 560 + 230);
  tag('THE LONE STAR TICK', 960, 940, t, W_('c5', 'lone'), S('a1') - 0.4, '#0b4f5c', 44); label('ONE TICK, ONE BITE?', 960, 120, t, S('c4q') + 0.2, W_('c5', 'lone') - 0.3, GOLD, 36);
}
function sSugar(t) {
  worldBG(t, 'cream');
  if (t < S('a3') - 0.1) { cellAt(t, 560, 520, 190, t > W_('a2', 'tag') - 0.3); reg('hero', 'cell', 330, 290, 790, 750); tag('ALPHA-GAL: A SUGAR TAG', 560, 880, t, W_('a2', 'tag'), S('a3') - 0.3, '#c95a7c', 36);
    [['cow', 'cows'], ['pig', 'pigs'], ['deer', 'deer']].forEach(([ic, w], i) => placeIcon(ic, [[1400, 250 + i * 270]], 1.6, t, W_('a2', w) - 0.2, S('a3') - 0.2, { hw: 96, hh: 70 })); label('ALMOST ALL MAMMALS', 1400, 1010, t, W_('a2', 'almost'), S('a3') - 0.3, '#5e2618', 30, { color: WHITE }); return; }
  if (t < S('a4q') - 0.1) { cellAt(t, 560, 520, 190, false, '#f2b38f'); reg('hero', 'cell', 330, 290, 790, 750); stamp(0, 720, 330, t, W_('a3', 'you'));
    placeIcon('person', [[1200, 470]], 2.4, t, W_('a3', 'humans') - 0.2, S('a4q') - 0.2, { hw: 40, hh: 80 }); placeIcon('monkey', [[1580, 470]], 2.2, t, W_('a3', 'apes') - 0.2, S('a4q') - 0.2, { hw: 70, hh: 60 });
    label('HUMANS, APES, OLD WORLD MONKEYS', 1390, 780, t, W_('a3', 'humans'), S('a4q') - 0.3, '#5e2618', 28, { color: WHITE }); tag('GENE SWITCHED OFF', 1390, 900, t, W_('a3', 'gene'), S('a4q') - 0.3, '#c95a7c', 36); return; }
  if (t < S('a6') - 0.1) { cellAt(t, 520, 520, 150, true, '#7fd36b'); reg('hero', 'microbe', 330, 330, 710, 710); for (let i = 0; i < 4; i++) { const a = t * 0.8 + i * 1.57, x = 520 + Math.cos(a) * 270, y = 520 + Math.sin(a) * 230; ctx.save(); ctx.translate(x, y); ctx.rotate(a + Math.PI * 1.5); ctx.scale(0.9, 0.9); ICONS.antibody(t, { col: '#8fd8e6' }); ctx.restore(); }
    label('ONE IDEA: TO FIGHT GERMS', 1360, 380, t, W_('a5', 'idea'), S('a6') - 0.3, '#5e2618', 32, { color: WHITE }); label('MANY MICROBES CARRY THE TAG', 1360, 480, t, W_('a5', 'microbes'), S('a6') - 0.3, '#5e2618', 28, { color: GOLD }); tag('WE ALL MAKE ANTIBODIES TO IT', 1360, 640, t, W_('a5', 'antibodies'), S('a6') - 0.3, '#127b84', 32); return; }
  placeIcon('antibody', [[620, 480]], 2.6, t, S('a6'), S('t1') - 0.3, { col: '#8fd8e6', hw: 50, hh: 70 }); label('NORMAL: HARMLESS', 620, 760, t, W_('a6', 'harmless'), S('t1') - 0.4, '#5e2618', 30, { color: WHITE });
  placeIcon('antibody', [[1300, 480]], 2.6, t, W_('a6', 'allergic') - 0.3, S('t1') - 0.3, { col: '#e2457a', hw: 50, hh: 70 }); label('THE ALLERGIC KIND', 1300, 760, t, W_('a6', 'allergic'), S('t1') - 0.4, '#5e2618', 30, { color: GOLD });
}
function sTick(t) {
  worldBG(t, 'teal');
  if (t < S('t3') - 0.1) { tickAt(t, 640, 560, 2.2, { speed: 5 }); reg('hero', 'tick', 640 - 330, 560 - 330, 640 + 330, 560 + 260);
    label('ONE WHITE SPOT = "LONE STAR"', 1380, 260, t, W_('t2', 'white'), S('t3') - 0.3, GOLD, 30); label('SOUTH + EAST USA', 1380, 360, t, W_('t2', 'common'), S('t3') - 0.3, WHITE, 30); label('HUNTS PEOPLE AND PETS', 1380, 460, t, W_('t2', 'hunts'), S('t3') - 0.3, WHITE, 30);
    if (t > S('t2b') - 0.1) { tag('NOT LYME DISEASE', 1380, 640, t, W_('t2b', 'lyme'), S('t3') - 0.3, '#0b4f5c', 36); label('BUT OTHER INFECTIONS', 1380, 760, t, W_('t2b', 'other'), S('t3') - 0.3, GOLD, 28); } return; }
  if (t < S('t5q') - 0.1) { rr2(0, 640, W, 440, 0, SKIN); rr2(0, 640, W, 30, 0, '#e9a27f'); reg('panel', 'skin', 0, 640, W, 1080); tickAt(t, 760, 470, 1.4, { rot: Math.PI, speed: 0, fed: clamp((t - S('t3')) / 6) * 0.6 }); reg('hero', 'tick', 760 - 240, 200, 760 + 240, 680);
    if (t > W_('t3', 'saliva') - 0.2) for (let i = 0; i < 10; i++) { const p = ((t - W_('t3', 'saliva')) * 0.5 + i / 10) % 1; hexTag(760 + Math.sin(i * 2.1) * 30 * p * 4, 700 + p * 260, 9 * (1 - p * 0.5)); }
    if (t > S('t4') - 0.1) placeIcon('antibody', [[1640, 860]], 1.5, t, W_('t4', 'ige') - 0.2, S('t5q') - 0.2, { col: '#e2457a', hw: 50, hh: 70 });
    label('SALIVA CARRIES ALPHA-GAL?', 1420, 300, t, W_('t3', 'saliva'), S('t5q') - 0.3, GOLD, 30); label('IMMUNE SYSTEM ON HIGH ALERT', 1420, 400, t, W_('t3', 'alert'), S('t5q') - 0.3, WHITE, 28); tag('IgE: THE ALLERGY ANTIBODY', 1100, 960, t, W_('t4', 'ige'), S('t5q') - 0.3, '#9b3352', 34); return; }
  if (t < S('t6') - 0.1) { placeIcon('tickI', [[960, 470]], 3.2, t, S('t5q'), S('t6') - 0.2, { hw: 50, hh: 66 }); label('EVERY BITE?', 960, 800, t, S('t5q') + 0.2, S('t6') - 0.3, GOLD, 40); return; }
  tile3(t, [['tickI', 'MOST BITES: NOTHING', '#127b84', S('t6'), { mark: 1 }], ['dice', 'WHO GETS IT? UNKNOWN', '#5b4fd6', W_('t6', 'know')], ['tickI', 'OTHER TICKS TOO', '#9b3352', W_('t6', 'other')]], 540);
}
ICONS.dice = function (t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.3); rr2(-50, -50, 100, 100, 20, '#f3f7fb'); for (const [x, y] of [[-24, -24], [24, -24], [0, 0], [-24, 24], [24, 24]]) circ(x, y, 9, '#e2457a'); ctx.restore(); }; IDLE.dice = {};
function sDelay(t) {
  worldBG(t, 'indigo');
  if (t < S('r3') - 0.1) { placeIcon('burger2', [[360, 470]], 2.4, t, S('r1') + 1.0, S('r3') - 0.2, { hw: 66, hh: 54 }); placeIcon('clock3', [[960, 470]], 2.4, t, W_('r2', 'two') - 0.3, S('r3') - 0.2, { hw: 58, hh: 58 }); arrow(650, 470, t, W_('r2', 'minutes'));
    if (t > W_('r2', 'six')) { kidAt(t, 1540, 760, 1.2, { hives: 1, lid: 0.3 }); } label('MOST FOOD ALLERGIES: MINUTES', 960, 140, t, W_('r2', 'minutes'), S('r3') - 0.3, WHITE, 30); tag('ALPHA-GAL: 2–6 HOURS', 960, 860, t, W_('r2', 'two'), S('r3') - 0.3, '#5b4fd6', 40);
    if (t > S('r2b') - 0.1) label('SAUSAGE TEST: NONE BEFORE 2.5 H · AVERAGE ~4 H', 960, 970, t, W_('r2b', 'not'), S('r3') - 0.3, GOLD, 26); return; }
  if (t < S('r5') - 0.1) { placeIcon('steak', [[360, 450]], 2.4, t, S('r3'), S('r5') - 0.2, { hw: 74, hh: 50 }); placeIcon('fatball', [[960, 450]], 2.4, t, W_('r3', 'fat') - 0.3, S('r5') - 0.2, { hw: 64, hh: 64 }); arrow(660, 450, t, W_('r3', 'fat'));
    if (t > W_('r3', 'blood') - 0.3) { reg('hero', 'vessel', 1260, 300, 1760, 600); rr2(1260, 380, 500, 140, 70, 'rgba(120,20,40,0.6)'); for (let i = 0; i < 6; i++) { const p = ((t * 0.4) + i / 6) % 1; circ(1280 + p * 460, 450 + Math.sin(p * 9 + i) * 30, 16, '#ffd36b'); } }
    label('ATTACHED TO FAT', 960, 700, t, W_('r3', 'attached'), S('r5') - 0.3, GOLD, 32); label('REACHES THE BLOOD HOURS LATER', 1500, 700, t, W_('r3', 'hours'), S('r5') - 0.3, WHITE, 26);
    if (t > S('r4') - 0.1) { drawMoon(t, 0.32, 1); reg('hero', 'moon', 0, 440, 120, 640); label('THE MIDDLE OF THE NIGHT', 960, 900, t, W_('r4', 'middle'), S('r5') - 0.3, '#9fd3ff', 32); } return; }
  placeIcon('mast', [[520, 480]], 2.4, t, S('r5'), S('k1') - 0.3, { hw: 70, hh: 70 }); kidAt(t, 1000, 940, 1.6, { hives: 1, lid: 0.4, wobble: Math.sin(t * 18) * 3 });
  label('HIVES · ITCHING · STOMACH PAIN', 1480, 360, t, W_('r5', 'hives'), S('k1') - 0.4, WHITE, 28); label('VOMITING · SWELLING', 1480, 460, t, W_('r5', 'vomiting'), S('k1') - 0.4, WHITE, 28); tag('ANAPHYLAXIS CAN KILL', 1480, 640, t, W_('r5', 'anaphylaxis'), S('k1') - 0.4, '#e2457a', 38);
}
function sDrug(t) {
  worldBG(t, 'grey');
  if (t < S('k4q') - 0.1) { placeIcon('drip', [[480, 470]], 2.6, t, S('k1') + 1.0, S('k4q') - 0.2, { hw: 44, hh: 100 }); tag('CETUXIMAB', 480, 820, t, W_('k2', 'cetuximab') - 0.1, S('k4q') - 0.3, '#5b4fd6', 40); label('A CANCER DRUG · MID-2000s', 480, 920, t, W_('k2', 'cancer'), S('k4q') - 0.3, WHITE, 26);
    if (t < S('k3') - 0.1) { const m = usMap(t, 900, 300, 900, 420, 0.1, 0); const [x, y] = [m.X(-79), m.Y(35.5)], k = spring(t - W_('k2', 'north'), 0.45, 12); if (k > 0) { ctx.save(); ctx.translate(x, y - Math.abs(Math.sin(t * 3)) * 8); ctx.scale(k, k); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.arc(0, -40, 22, Math.PI * 0.85, Math.PI * 2.15); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); ctx.restore(); }
      label('SEVERE REACTIONS: FAR MORE COMMON HERE', 1350, 820, t, W_('k2', 'severe'), S('k3') - 0.3, GOLD, 26); return; }
    placeIcon('mouse', [[1150, 380]], 2.0, t, W_('k3', 'mouse') - 0.3, S('k4q') - 0.2, { hw: 110, hh: 50 }); label('2008 · MADE PARTLY IN MOUSE CELLS', 1350, 560, t, W_('k3', 'mouse'), S('k4q') - 0.3, WHITE, 26); placeIcon('antibody', [[1560, 380]], 1.8, t, W_('k3', 'antibodies') - 0.3, S('k4q') - 0.2, { col: '#e2457a', hw: 50, hh: 70 }); tag('ANTIBODIES BEFORE THE FIRST DOSE', 1350, 700, t, W_('k3', 'before'), S('k4q') - 0.3, '#9b3352', 32); return; }
  if (t < S('k6') - 0.1) { usMap(t, 160, 260, 1000, 470, 0.3); label('WHERE DID THEY COME FROM?', 960, 120, t, S('k4q') + 0.2, S('k5') + 0.5, GOLD, 34); placeIcon('steak', [[1500, 360]], 1.8, t, W_('k5', 'meat') - 0.3, S('k6') - 0.2, { hw: 74, hh: 50 }); label('DELAYED RED-MEAT REACTIONS', 1500, 520, t, W_('k5', 'delayed'), S('k6') - 0.3, WHITE, 26);
    label('THOMAS PLATTS-MILLS · UVA', 1500, 620, t, W_('k5', 'thomas'), S('k6') - 0.3, GOLD, 26); placeIcon('tickI', [[1500, 820]], 1.6, t, W_('k5', 'tick') - 0.3, S('k6') - 0.2, { hw: 50, hh: 66 }); label('CASES CLUSTER WHERE THE TICK LIVES', 660, 840, t, W_('k5', 'clustered'), S('k6') - 0.3, WHITE, 26); return; }
  tickAt(t, 960, 520, 1.6); reg('hero', 'tick', 960 - 260, 520 - 260, 960 + 260, 520 + 200); tag('2011 · TICK BITES → ALPHA-GAL ANTIBODIES', 960, 860, t, W_('k6', ['2011', 'twenty']), S('n1') - 0.4, '#9b3352', 34); label('AN ALLERGY THAT STARTS WITH A BITE', 960, 970, t, W_('k6', 'starts'), S('n1') - 0.4, GOLD, 28);
}
function sFoods(t) {
  worldBG(t, 'gold');
  if (t < S('n3') - 0.1) { [['steak', 'beef'], ['pig', 'pork'], ['deer', 'venison']].forEach(([ic, w], i) => { placeIcon(ic, [[320 + i * 330, 380]], 1.6, t, W_('n2', w) - 0.2, S('n3') - 0.2, { hw: 96, hh: 70 }); }); [0, 1, 2].forEach(i => stamp(0, 420 + i * 330, 260, t, W_('n2', ['beef', 'pork', 'venison'][i]) + 0.3));
    [['drumstick', 'chicken'], ['fish', 'fish']].forEach(([ic, w], i) => placeIcon(ic, [[1360 + i * 330, 380]], 1.6, t, W_('n2', w) - 0.2, S('n3') - 0.2, { hw: 90, hh: 50 })); [0, 1].forEach(i => stamp(1, 1450 + i * 330, 260, t, W_('n2', ['chicken', 'fish'][i]) + 0.3));
    label('MAMMAL MEAT', 650, 640, t, W_('n2', 'red'), S('n3') - 0.3, '#5e2618', 36, { color: WHITE }); label('BIRDS + FISH: FINE', 1520, 640, t, W_('n2', 'fine'), S('n3') - 0.3, '#5e2618', 36, { color: GOLD }); return; }
  if (t < S('n5q') - 0.1) { tile3(t, [['milk', 'MILK + CHEESE', '#127b84', W_('n3', 'milk')], ['gummy', 'GELATIN SWEETS', '#c95a7c', W_('n3', 'gelatin')], ['capsule', 'SOME CAPSULES', '#5b4fd6', W_('n3', 'capsules') - 0.4]], 480);
    if (t > S('n4') - 0.1) { placeIcon('grill', [[1700, 920]], 1.1, t, W_('n4', 'fumes') - 0.3, S('n5q') - 0.2, { hw: 80, hh: 100 }); label('EVEN BARBECUE FUMES (RARE)', 960, 960, t, W_('n4', 'fumes'), S('n5q') - 0.3, '#5e2618', 30, { color: WHITE }); } return; }
  turkeyAt(t, 760, 600, 1.4); reg('hero', 'turkey', 760 - 320, 600 - 310, 760 + 320, 600 + 170); label('TURKEY AT CHRISTMAS?', 760, 140, t, S('n5q') + 0.2, S('s1') - 0.4, '#5e2618', 36, { color: WHITE }); stamp(1, 1060, 360, t, W_('n6', 'yes'));
  placeIcon('gravy', [[1500, 420]], 1.9, t, W_('n6', 'gravy') - 0.3, S('s1') - 0.3, { hw: 104, hh: 50 }); label('CHECK: BEEF-STOCK GRAVY', 1500, 600, t, W_('n6', 'beef'), S('s1') - 0.4, '#5e2618', 26, { color: GOLD }); placeIcon('gummy', [[1500, 800]], 1.4, t, W_('n6', 'gelatin') - 0.3, S('s1') - 0.3, { hw: 44, hh: 56 });
}
function sSpread(t) {
  worldBG(t, 'night');
  if (t < S('s4') - 0.1) { const sp = clamp((t - S('s2')) / 5); usMap(t, 260, 220, 1400, 650, sp); label('THE LONE STAR TICK IS ON THE MOVE', 960, 120, t, W_('s2', 'move'), S('s3') - 0.3, GOLD, 32); label('MIDWEST · NORTHEAST · UP TO MAINE', 960, 960, t, W_('s2', 'midwest'), S('s3') - 0.3, WHITE, 30);
    if (t > S('s3') - 0.1) { tag('MILDER WINTERS · MORE DEER · SUBURBS', 960, 120, t, S('s3'), S('s4') - 0.3, '#2d8a9a', 32); placeIcon('deer', [[1730, 990]], 0.9, t, W_('s3', 'deer') - 0.3, S('s4') - 0.2, { hw: 96, hh: 70 }); } return; }
  if (t < S('s5') - 0.1) { meter(460, 420, 1000, 0.47, t, W_('s4', 'doubled') - 0.6, S('s5') - 0.3, '#8fd8e6', '#5aa9e6', 'JAN–JUN 2025: 1,331 SUSPECTED CASES'); meter(460, 640, 1000, 1, t, W_('s4', 'doubled'), S('s5') - 0.3, '#ffd98a', '#e2457a', 'JAN–JUN 2026: 2,833');
    tag('ARKANSAS', 960, 200, t, W_('s4', 'arkansas'), S('s5') - 0.3, '#9b3352', 44); label('FIRST STATE TO REQUIRE LAB REPORTS', 960, 860, t, W_('s4', 'first'), S('s5') - 0.3, WHITE, 28); return; }
  placeIcon('pie2', [[620, 480]], 2.6, t, S('s5'), S('f1') - 0.3, { v: 0.42, hw: 62, hh: 62 }); tag('42% HAD NEVER HEARD OF IT', 1300, 420, t, W_('s5', 'forty'), S('f1') - 0.4, '#e2457a', 38); label('2022 CDC SURVEY · 1,500 PROVIDERS', 1300, 560, t, W_('s5', ['2022', 'twenty']), S('f1') - 0.4, WHITE, 28);
}
ICONS.pie2 = function (t, o) { const v = o.v || 0.4, k = clamp((t % 6) / 1.2); circ(0, 0, 62, '#2d2b7c'); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 62, -Math.PI / 2, -Math.PI / 2 + v * 6.283 * eoq(k)); ctx.fill(); }; IDLE.pie2 = {};
function sDeath(t) {
  worldBG(t, 'grey');
  if (t < S('f3') - 0.1) { placeIcon('grill', [[520, 470]], 2.6, t, S('f1') + 1.0, S('f3') - 0.2, { hw: 80, hh: 100 }); placeIcon('clock3', [[1180, 400]], 2.0, t, W_('f2', 'four') - 0.3, S('f3') - 0.2, { hw: 58, hh: 58 });
    label('2024 · NEW JERSEY · AGE 47', 960, 120, t, W_('f2', ['2024', 'twenty']), S('f3') - 0.3, WHITE, 30); label('~4 HOURS LATER', 1180, 600, t, W_('f2', 'four'), S('f3') - 0.3, GOLD, 30);
    if (t > S('f2b') - 0.1) { placeIcon('steak', [[1580, 400]], 1.5, t, S('f2b'), S('f3') - 0.2, { hw: 74, hh: 50 }); label('2 WEEKS EARLIER: A WARNING', 1500, 720, t, W_('f2b', 'weeks'), S('f3') - 0.3, '#ff9fb4', 28); } return; }
  if (t < S('f4') - 0.1) { placeIcon('autopsy', [[440, 470]], 2.4, t, S('f3'), S('f4') - 0.2, { hw: 52, hh: 66 }); label('AUTOPSY: NO CLEAR CAUSE', 440, 760, t, W_('f3', 'autopsy'), S('f4') - 0.3, WHITE, 28); placeIcon('vial', [[960, 470]], 2.2, t, W_('f3', 'blood') - 0.3, S('f4') - 0.2, { hw: 26, hh: 86 });
    meter(1200, 380, 560, 90 / 2000, t, W_('f3', 'marker') - 0.3, S('f4') - 0.3, '#8fd8e6', '#8fd8e6', 'HIGHEST THEY HAD SEEN BEFORE'); meter(1200, 560, 560, 1, t, W_('f3', 'higher'), S('f4') - 0.3, '#ffd98a', '#e2457a', 'HIS REACTION MARKER');
    tag('FIRST KNOWN DEATH · REPORTED 2025', 960, 900, t, W_('f3', 'first'), S('f4') - 0.3, '#9b3352', 36); return; }
  placeIcon('ankle', [[700, 520]], 2.6, t, S('f4'), S('h1') - 0.3, { hw: 60, hh: 96 }); label('A DOZEN TINY BITES', 1360, 400, t, W_('f4', 'dozen'), S('h1') - 0.4, WHITE, 32); tag('LONE STAR TICK LARVAE?', 1360, 540, t, W_('f4', 'larvae'), S('h1') - 0.4, '#9b3352', 36); label('OFTEN MISTAKEN FOR CHIGGERS', 1360, 680, t, W_('f4', 'chiggers'), S('h1') - 0.4, GOLD, 28);
}
function sLiving(t) {
  worldBG(t, 'teal');
  if (t < S('h3') - 0.1) { tag('NO CURE YET', 960, 160, t, W_('h2', 'not') - 0.2, S('h3') - 0.3, '#0b4f5c', 48); placeIcon('steak', [[560, 520]], 2.4, t, W_('h2', 'avoiding') - 0.3, S('h3') - 0.2, { hw: 74, hh: 50 }); stamp(0, 720, 400, t, W_('h2', 'avoiding') + 0.3);
    placeIcon('epipen', [[1340, 520]], 2.0, t, W_('h2', 'emergency') - 0.3, S('h3') - 0.2, { hw: 100, hh: 60 }); label('AVOID ALPHA-GAL', 560, 800, t, W_('h2', 'avoiding'), S('h3') - 0.3, WHITE, 30); label('EMERGENCY MEDICINE', 1340, 800, t, W_('h2', 'emergency'), S('h3') - 0.3, GOLD, 30);
    if (t > S('h2b') - 0.1) { placeIcon('capsule', [[960, 470]], 1.6, t, W_('h2b', 'medicines') - 0.3, S('h3') - 0.2, { hw: 74, hh: 50 }); label('CHECK MEDICINES TOO (2022 REVIEW)', 960, 940, t, W_('h2b', 'review'), S('h3') - 0.3, '#0b4f5c', 28, { color: WHITE }); } return; }
  if (t < S('h4q') - 0.1) { if (t < S('h3b') - 0.1) { placeIcon('calendar', [[560, 470]], 2.6, t, S('h3'), S('h3b') - 0.2, { text: 'YRS', hw: 54, hh: 60 }); label('CAN FADE OVER MONTHS OR YEARS', 1300, 380, t, W_('h3', 'fades'), S('h3b') - 0.3, GOLD, 30); placeIcon('tickI', [[1300, 640]], 1.6, t, W_('h3', 'new') - 0.3, S('h3b') - 0.2, { hw: 50, hh: 66 }); label('A NEW BITE BRINGS IT BACK', 1300, 860, t, W_('h3', 'new'), S('h3b') - 0.3, '#ff9fb4', 28); return; }
    placeIcon('diary', [[620, 500]], 2.4, t, S('h3b'), S('h4q') - 0.2, { hw: 60, hh: 78 }); label('A FOOD DIARY', 1300, 420, t, W_('h3b', 'diary'), S('h4q') - 0.3, GOLD, 36); label('MEALS + SYMPTOM TIMES', 1300, 520, t, W_('h3b', 'meal'), S('h4q') - 0.3, WHITE, 30); return; }
  placeIcon('heartP', [[620, 480]], 2.8, t, S('h4q') + 0.2, S('p1') - 0.3, { hw: 62, hh: 52 }); label('2018 · UVA: MORE ARTERY PLAQUE', 1320, 360, t, W_('h5', ['2018', 'twenty']), S('p1') - 0.4, WHITE, 28); label('2022: A LARGER STUDY AGREES', 1320, 460, t, W_('h5', 'larger'), S('p1') - 0.4, WHITE, 28);
  tag('A LINK, NOT PROOF', 1320, 620, t, W_('h5', 'prove'), S('p1') - 0.4, '#0b4f5c', 40); label('STILL BEING STUDIED', 620, 760, t, W_('h5', 'studied'), S('p1') - 0.4, GOLD, 30);
}
function sPrevent(t) {
  worldBG(t, 'pine' in WORLDS ? 'pine' : 'teal');
  if (t < S('p3') - 0.1) { tile3(t, [['trail', 'MIDDLE OF THE TRAIL', '#3f8f4a', W_('p2', 'middle')], ['person', 'COVER YOUR SKIN', '#c95a7c', W_('p2', 'cover')], ['spray', 'PERMETHRIN ON CLOTHES', '#127b84', W_('p2', 'permethrin') - 0.4]], 540);
    if (t > S('p2b') - 0.1) label('SKIN: A REGISTERED REPELLENT (DEET, PICARIDIN)', 960, 960, t, W_('p2b', 'skin'), S('p3') - 0.3, GOLD, 28); return; }
  if (t < S('p4') - 0.1) { placeIcon('tweezers', [[560, 470]], 2.6, t, S('p3'), S('p4') - 0.2, { hw: 64, hh: 100 }); label('CHECK: YOU · KIDS · PETS', 560, 820, t, W_('p3', 'check'), S('p3b') - 0.3, WHITE, 30); label('FINE TWEEZERS · CLOSE TO THE SKIN', 1320, 420, t, W_('p3', 'tweezers'), S('p4') - 0.3, GOLD, 28);
    if (t > S('p3b') - 0.1) { tag('NO FIRE · NO NAIL POLISH · NO JELLY', 1320, 600, t, W_('p3b', 'burn') - 0.3, S('p4') - 0.3, '#9b3352', 30); label('PULL IT OUT, CLEAN THE BITE', 1320, 740, t, W_('p3b', 'pull'), S('p4') - 0.3, WHITE, 28); } return; }
  kidAt(t, 560, 940, 1.6, { hives: 1, lid: 0.2 }); placeIcon('vial', [[1300, 470]], 2.2, t, W_('p4', 'blood') - 0.3, S('o1') - 0.3, { hw: 26, hh: 86 }); label('HIVES HOURS AFTER STEAK?', 1300, 160, t, W_('p4', 'hives'), S('o1') - 0.4, GOLD, 32); tag('TELL YOUR DOCTOR ABOUT TICK BITES', 1300, 800, t, W_('p4', 'tell'), S('o1') - 0.4, '#0b4f5c', 30); label('A SIMPLE BLOOD TEST', 1300, 920, t, W_('p4', 'simple'), S('o1') - 0.4, WHITE, 28);
}
function sOutro(t) {
  const C = CUE; worldBG(t, 'night');
  if (t < S('o3') - 0.1) { tickAt(t, 560, 560, 1.5); reg('hero', 'tick', 560 - 250, 560 - 250, 560 + 250, 560 + 200);
    const it = [['A SUGAR YOU NEVER MADE', 'sugar'], ['A TICK THAT SLIPS IT IN', 'tick'], ['AN IMMUNE SYSTEM THAT REMEMBERS', 'immune']], t0s = it.map(x => W_('o2', x[1]) - 0.3);
    it.forEach(([lab], i) => label(lab, 1340, 320 + i * 120, t, t0s[i], S('o3') - 0.3, i === 2 ? GOLD : WHITE, 30)); return; }
  tickAt(t, 480, 560, 1.3); reg('hero', 'tick', 480 - 220, 560 - 220, 480 + 220, 560 + 170); placeIcon('burger2', [[480, 920]], 1.3, t, S('o3'), 999, { hw: 66, hh: 54 });
  if (t > S('o3') + 0.2) { reg('label', 'title', 820, 340, 1840, 580); LABELQ.push(() => { riseText('A TICK BITE CAN MAKE YOU', 1330, 400, S('o3') + 0.2, t, { size: 52, weight: 700, color: WHITE, ls: 4, pill: false, dur: 0.8 });
    riseText('ALLERGIC TO MEAT', 1330, 520, S('o3') + 0.45, t, { size: 84, weight: 700, color: GOLD, ls: 6, pill: false, dur: 0.8 }); }); sfx('title', S('o3') + 0.2); }
  if (t > S('o4') - 0.2) placeIcon('subscribe', [[1330, 700]], 1.2, t, W_('o4', 'subscribe'), 999, { hw: 124, hh: 38 });
  if (t > C.end) for (const [x, y] of [[1230, 900], [1630, 900]]) { const k = spring(t - C.end - 0.2, 0.5, 12); rr2(x - 170 * k, y - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', x - 170, y - 96, x + 170, y + 96); }
}
WORLDS.pine = { a: '#1f5a46', b: '#123a2e', blobs: [[255, 217, 138, .12], [80, 180, 140, .15], [226, 69, 122, .08]], dots: 'rgba(255,240,200,0.10)' };

const CHAPTERS = [['a1', 'A sugar called alpha-gal', 'cream', 'cow'], ['t1', 'The lone star tick', 'teal', 'tickI'], ['r1', 'Why it strikes hours later', 'indigo', 'clock3'], ['k1', 'A cancer drug cracked the case', 'grey', 'drip'], ['n1', 'Not just steak', 'gold', 'steak'],
  ['s1', 'Spreading north', 'night', 'deer'], ['f1', 'The first known death', 'grey', 'autopsy'], ['h1', 'Living with it', 'teal', 'epipen'], ['p1', 'How to dodge the bite', 'pine', 'tweezers']];
function SECTIONS() {
  const out = [], add = (t0, draw, tr, at) => out.push({ t0, draw, tr, at });
  add(0, sOpen);
  const ids = Object.keys(LINES), prevEnd = id => LINES[ids[ids.indexOf(id) - 1]].end + 0.15;
  const scene = { a1: [sSugar, 'a2'], t1: [sTick, 't2'], r1: [sDelay, 'r2'], k1: [sDrug, 'k2'], n1: [sFoods, 'n2'], s1: [sSpread, 's2'], f1: [sDeath, 'f2'], h1: [sLiving, 'h2'], p1: [sPrevent, 'p2'] };
  CHAPTERS.forEach(([id, title, world, ic], i) => { const t0 = prevEnd(id); add(t0, tt => chapterCard(tt, title, i + 1, world, ic, t0), 'flood', [960, 540]); const [fn, first] = scene[id]; add(Math.min(LINES[id].start + 1.2, LINES[first].start), fn, 'flood', [960, 540]); });
  add(L('o1').start - 0.1, sOutro, 'flood', [960, 540]);
  out.sort((a, b) => a.t0 - b.t0); out.forEach((s, i) => s.t1 = i + 1 < out.length ? out[i + 1].t0 : 1e9); return out;
}
