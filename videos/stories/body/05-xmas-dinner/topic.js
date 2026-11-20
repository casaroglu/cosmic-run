// "What Christmas dinner does to your body" — topic file for the shared explainer engine
const L = id => LN(id), S = id => LN(id).start, E = id => LN(id).end;
function buildCues() { const C = CUE; C.title = S('o3') + 0.3; C.end = DUR - TAIL; C.calls = S('o3'); }

// ---------- palette + a festive pine world ----------
const SKIN = '#f2b38f', ORG = '#f08a9c', ORG2 = '#c95a7c', TURKEY = '#c8793a', TURKEY2 = '#9a5524', SPROUT = '#6fae4a', SPROUT2 = '#4d8a32';
WORLDS.pine = { a: '#1f5a46', b: '#123a2e', blobs: [[255, 217, 138, .12], [80, 180, 140, .15], [226, 69, 122, .08]], dots: 'rgba(255,240,200,0.10)' };

// ---------- shared helpers ----------
function kidAt(t, x, y, s, o = {}) { CAM = { x: 960, y: 540, z: 1 }; KID = { x, y }; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); drawKid(t, o); ctx.restore(); reg('hero', 'mascot', x - 70 * s, y - 290 * s, x + 70 * s, y + 12 * s); }
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
function snowfall(t, n = 60) { for (let i = 0; i < n; i++) { const r = rng(i * 31 + 7), x0 = r() * W, sp = 40 + r() * 60, y = ((t * sp + r() * H) % (H + 40)) - 20; circ(x0 + Math.sin(t * 0.8 + i) * 20, y, 2 + r() * 4, 'rgba(255,255,255,0.55)'); } }

// ---------- heroes ----------
function turkeyAt(t, x, y, s) {   // a roast turkey on a platter, steaming, with a travelling sparkle on the glaze
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#e8eef6'; ctx.beginPath(); ctx.ellipse(0, 70, 230, 46, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#c9d6ec'; ctx.beginPath(); ctx.ellipse(0, 76, 200, 32, 0, 0, 6.283); ctx.fill();
  for (const [gx, c] of [[-150, SPROUT], [-120, SPROUT2], [150, '#ffcf6b'], [120, '#ffb35c']]) circ(gx, 60, 22, c);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 120, 10); ctx.rotate(sd * 0.5); ctx.fillStyle = TURKEY2; ctx.beginPath(); ctx.ellipse(0, 0, 58, 38, 0, 0, 6.283); ctx.fill(); rr2(sd > 0 ? 40 : -76, -10, 36, 18, 9, '#f3ead8'); circ(sd > 0 ? 80 : -80, -12, 12, '#f3ead8'); circ(sd > 0 ? 80 : -80, 8, 12, '#f3ead8'); ctx.restore(); }
  ctx.fillStyle = TURKEY; ctx.beginPath(); ctx.ellipse(0, -10, 150, 100, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e09a52'; ctx.beginPath(); ctx.ellipse(-20, -40, 100, 50, -0.15, 0, 6.283); ctx.fill();
  rr2(-90, -70, 70, 16, 8, 'rgba(255,255,255,0.35)'); glint(t, 140, 100);
  for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.7; ctx.translate(-50 + i * 50 + Math.sin(p * 6 + i) * 10, -120 - p * 120); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.moveTo(-8, 30); ctx.quadraticCurveTo(-22, 0, -8, -24); ctx.quadraticCurveTo(8, 0, 8, 30); ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function stomachAt(t, x, y, s, o = {}) {   // a J-shaped stomach with an oesophagus on top; `fill` 0..1 stretches it and flattens the folds
  const f = o.fill ?? 0, sq = o.churn ? Math.sin(t * 3) * 0.04 : 0, b = lerp(0.62, 1.05, f);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr2(-150, -330, 44, 190, 22, '#f3b4c0');   // oesophagus
  if (o.reflux) { const k = o.reflux; ctx.save(); ctx.beginPath(); ctx.roundRect(-150, -330, 44, 190, 22); ctx.clip(); for (let i = 0; i < 6; i++) { const p = (t * 0.8 + i / 6) % 1; if (p > k) continue; circ(-128 + Math.sin(t * 5 + i) * 8, -150 - p * 170, 12, '#ffd36b'); } ctx.restore();
    for (let i = 0; i < 3; i++) { const fx = -128 + (i - 1) * 26, h = 30 + Math.sin(t * 9 + i * 2) * 10; ctx.fillStyle = i % 2 ? '#ff8f4a' : '#ffd98a'; ctx.globalAlpha *= 1; ctx.beginPath(); ctx.moveTo(fx - 10, -260); ctx.quadraticCurveTo(fx - 12, -260 - h * 0.6, fx + Math.sin(t * 7 + i) * 4, -260 - h); ctx.quadraticCurveTo(fx + 12, -260 - h * 0.6, fx + 10, -260); ctx.fill(); } }
  ctx.save(); ctx.scale(b * (1 + sq), b * (1 - sq));
  const SP = new Path2D(); SP.moveTo(-150, -150); SP.bezierCurveTo(-60, -230, 160, -200, 170, -40); SP.bezierCurveTo(180, 120, 60, 210, -60, 180); SP.bezierCurveTo(-140, 160, -150, 110, -120, 90); SP.bezierCurveTo(-60, 120, 40, 80, 20, -10); SP.bezierCurveTo(10, -80, -80, -100, -110, -120); SP.closePath();
  ctx.fillStyle = ORG; ctx.fill(SP); ctx.save(); ctx.clip(SP);
  ctx.fillStyle = '#f7a6b4'; ctx.beginPath(); ctx.ellipse(70, -60, 70, 40, -0.6, 0, 6.283); ctx.fill();
  ctx.save(); ctx.globalAlpha *= 1 - f * 0.85; ctx.strokeStyle = ORG2; ctx.lineWidth = 10; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const u = k / 20; ctx.lineTo(lerp(-40, 130, u) - i * 18, lerp(-120, 120, u) + Math.sin(u * 12 + i) * 14 + i * 10); } ctx.stroke(); } ctx.restore();
  if (o.food) for (let i = 0; i < 12 * f; i++) circ(40 + Math.cos(i * 2.4 + t * 0.5) * (40 + (i * 13) % 60), 20 + Math.sin(i * 2.4 + t * 0.5) * (30 + (i * 7) % 50), 14, ['#ffcf6b', SPROUT, '#e09a52', '#f3ead8'][i % 4]);
  if (o.acid) for (let i = 0; i < 10; i++) { const p = (t * 0.7 + i / 10) % 1; circ(-10 + ((i * 41) % 150), 140 - p * 180, 6 + (i % 3) * 2, `rgba(200,255,120,${0.8 * (1 - p)})`); }
  ctx.restore(); ctx.restore();
  circ(-128, -142, 22, o.ring ? '#c95a7c' : '#e48aa0'); if (o.ring) { ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 4); circ(-128, -142, 30, 'rgba(255,217,138,0.5)'); ctx.restore(); }
  rr2(-60 * b, 150 * b, 50, 24, 12, ORG2);   // exit to the intestine
  ctx.restore();
}
function bodyMap(t, x, y, s, o = {}) {   // x-ray silhouette with the whole digestive tract; o.p = position 0..1 of a food bolus along it
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(16,35,72,0.55)'; circ(0, -330, 70, 'rgba(16,35,72,0.55)'); rr2(-34, -270, 68, 50, 20, 'rgba(16,35,72,0.55)'); rr2(-140, -230, 280, 420, 110, 'rgba(16,35,72,0.55)'); rr2(-120, 160, 100, 220, 50, 'rgba(16,35,72,0.55)'); rr2(20, 160, 100, 220, 50, 'rgba(16,35,72,0.55)');
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 150, -200); ctx.rotate(sd * -0.18); rr2(-30, 0, 60, 300, 30, 'rgba(16,35,72,0.55)'); ctx.restore(); }
  const P = [[0, -300], [0, -250], [0, -140], [-10, -90], [40, -60], [60, -30], [10, 0]];   // mouth → oesophagus → stomach
  const tract = []; P.forEach(p => tract.push(p)); for (let i = 0; i <= 60; i++) { const u = i / 60, a = u * 6.283 * 3.2; tract.push([Math.cos(a) * 60 * (1 - u * 0.3), 40 + u * 110 + Math.sin(a) * 26]); }   // small intestine coils
  [[-80, 160], [-90, 40], [-70, -30], [70, -30], [90, 40], [80, 160], [20, 190]].forEach(p => tract.push(p));   // colon frame
  ctx.strokeStyle = 'rgba(242,157,176,0.9)'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); tract.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.stroke();
  ctx.fillStyle = ORG; ctx.beginPath(); ctx.ellipse(40, -50, 46, 30, -0.5, 0, 6.283); ctx.fill();
  if (o.p != null) { const i = Math.min(tract.length - 2, Math.floor(o.p * (tract.length - 1))), u = o.p * (tract.length - 1) - i, [a, b] = tract[i], [c, d] = tract[i + 1]; ctx.save(); ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 24; circ(lerp(a, c, u), lerp(b, d, u), 20, '#ffd98a'); ctx.restore(); }
  ctx.restore();
}
function graph(t, x, y, w, h, t0, curves) {   // tiny line chart that draws itself
  rr2(x, y, w, h, 18, 'rgba(6,20,40,0.45)'); reg('meter', 'graph', x, y, x + w, y + h); const k = clamp((t - t0) / 2.2);
  curves.forEach(([fn, col]) => { ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60 * k; i++) { const u = i / 60; ctx.lineTo(x + 30 + u * (w - 60), y + h - 30 - fn(u) * (h - 60)); } ctx.stroke(); });
}

// ---------- icons ----------
Object.assign(ICONS, {
  stomachI(t) { ctx.save(); ctx.scale(0.36, 0.36); stomachAt(t, 0, 40, 1, { fill: 0.5 + 0.5 * Math.sin(t * 1.2) }); ctx.restore(); },
  turkeyI(t) { ctx.save(); ctx.scale(0.38, 0.38); turkeyAt(t, 0, 0, 1); ctx.restore(); },
  sprout(t) { const b = 1 + Math.sin(t * 2.4) * 0.04; ctx.scale(b, b); circ(0, 0, 50, SPROUT2); for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(i * 1.26 + 0.3); ctx.fillStyle = i % 2 ? SPROUT : '#8cc764'; ctx.beginPath(); ctx.ellipse(0, -22, 26, 34, 0, 0, 6.283); ctx.fill(); ctx.restore(); } circ(0, 0, 20, '#a8d97a'); rr2(-30, -36, 22, 10, 5, 'rgba(255,255,255,0.35)'); rr2(-6, 44, 12, 18, 6, '#c9e8a0'); },
  raffinose(t) { ctx.save(); ctx.rotate(Math.sin(t) * 0.12); for (const [x, c] of [[-70, '#ffd98a'], [0, '#ffb35c'], [70, '#ff8f4a']]) { ctx.save(); ctx.translate(x, 0); ctx.rotate(t * 0.4 + x); ctx.fillStyle = c; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; ctx.lineTo(Math.cos(a) * 30, Math.sin(a) * 30); } ctx.fill(); circ(0, 0, 10, 'rgba(255,255,255,0.5)'); ctx.restore(); } rr2(-44, -4, 18, 8, 4, '#f3f7fb'); rr2(26, -4, 18, 8, 4, '#f3f7fb'); ctx.restore(); },
  microbe(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.15); for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-50, 0); ctx.rotate(Math.PI + Math.sin(t * 8 + i) * 0.4 + (i - 1) * 0.5); rr2(0, -2, 40, 4, 2, '#5aa96a'); ctx.restore(); }
    rr2(-54, -28, 108, 56, 28, '#7fd36b'); circ(-22, -6, 6, '#3f7f4c'); circ(8, 10, 5, '#3f7f4c'); const m = Math.abs(Math.sin(t * 6)); ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.ellipse(40, 6, 8, 3 + 7 * m, 0, 0, 6.283); ctx.fill(); circ(28, -10, 5, '#20232f'); ctx.restore(); },
  gasb(t, o) { const p = (t * 0.5) % 1; ctx.save(); ctx.translate(0, -p * 30); circ(0, 0, 46, o.col || 'rgba(200,255,200,0.55)'); circ(-16, -16, 10, 'rgba(255,255,255,0.6)'); font(30, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.txt || 'H₂', 0, 4); ctx.restore(); },
  pancreas(t) { const b = 1 + Math.sin(t * 2) * 0.03; ctx.scale(b, b); ctx.fillStyle = '#f2b36b'; ctx.beginPath(); ctx.moveTo(-90, 10); ctx.quadraticCurveTo(-80, -40, -30, -30); ctx.quadraticCurveTo(40, -20, 90, -40); ctx.quadraticCurveTo(110, -20, 90, 0); ctx.quadraticCurveTo(30, 20, -20, 30); ctx.quadraticCurveTo(-70, 50, -90, 10); ctx.fill(); for (let i = 0; i < 9; i++) circ(-70 + i * 18, -6 + Math.sin(i) * 8, 6, '#e09a52'); rr2(-60, -24, 40, 8, 4, 'rgba(255,255,255,0.35)'); },
  liver(t) { const b = 1 + Math.sin(t * 1.6) * 0.03; ctx.scale(b, b); ctx.fillStyle = '#a83a3a'; ctx.beginPath(); ctx.moveTo(-100, -30); ctx.quadraticCurveTo(-60, -70, 40, -60); ctx.quadraticCurveTo(110, -50, 100, -10); ctx.quadraticCurveTo(60, 20, 0, 50); ctx.quadraticCurveTo(-60, 70, -90, 30); ctx.quadraticCurveTo(-110, 0, -100, -30); ctx.fill(); ctx.fillStyle = '#c24a4a'; ctx.beginPath(); ctx.ellipse(-30, -20, 60, 30, -0.2, 0, 6.283); ctx.fill(); rr2(-70, -40, 40, 10, 5, 'rgba(255,255,255,0.3)'); rr2(10, 30, 10, 30, 5, '#5aa96a'); },
  glucose(t) { ctx.save(); ctx.rotate(t * 0.5); ctx.fillStyle = '#ffd98a'; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; ctx.lineTo(Math.cos(a) * 40, Math.sin(a) * 40); } ctx.fill(); circ(0, 0, 14, '#ff8f4a'); ctx.restore(); },
  insulin(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 2) * 0.15); circ(-40, 0, 30, '#8fd8e6'); circ(-40, 0, 12, '#102348'); rr2(-14, -10, 90, 20, 8, '#8fd8e6'); rr2(50, 8, 12, 24, 4, '#8fd8e6'); rr2(66, 8, 12, 18, 4, '#8fd8e6'); ctx.restore(); },
  tank(t, o) { const lv = o.level ?? (0.4 + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.9))); rr2(-46, -70, 92, 140, 18, '#3a3f5a'); ctx.save(); ctx.beginPath(); ctx.roundRect(-38, -62, 76, 124, 12); ctx.clip(); rr2(-40, 62 - 124 * lv + Math.sin(t * 3) * 3, 80, 140, 0, '#ffd98a'); bubbles(t, 0, 30, 60, 60, 4); ctx.restore(); rr2(-20, -82, 40, 14, 6, '#5b6585'); rr2(-34, -50, 10, 70, 5, 'rgba(255,255,255,0.25)'); },
  flame(t) { for (let i = 0; i < 3; i++) { const h = 90 - i * 22 + Math.sin(t * 8 + i) * 10, w = 50 - i * 12; ctx.fillStyle = ['#ff6f3c', '#ff9a3c', '#ffd98a'][i]; ctx.beginPath(); ctx.moveTo(-w, 40); ctx.quadraticCurveTo(-w - 6, 40 - h * 0.5, Math.sin(t * 6 + i) * 8, 40 - h); ctx.quadraticCurveTo(w + 6, 40 - h * 0.5, w, 40); ctx.quadraticCurveTo(0, 56, -w, 40); ctx.fill(); } },
  walker(t) { const g = t * 6; for (const sd of [0, 1]) { ctx.save(); ctx.translate(0, 20); ctx.rotate(Math.sin(g + sd * Math.PI) * 0.45); rr2(-9, 0, 18, 56, 9, sd ? '#2d2b7c' : '#3a3f8a'); ctx.restore(); } rr2(-24, -50, 48, 74, 22, '#e2457a'); circ(0, -74, 24, SKIN); for (const sd of [0, 1]) { ctx.save(); ctx.translate(0, -40); ctx.rotate(-Math.sin(g + sd * Math.PI) * 0.5); rr2(-7, 0, 14, 48, 7, '#c43a6a'); ctx.restore(); } },
  pudding(t) { ctx.fillStyle = '#7a3a22'; ctx.beginPath(); ctx.arc(0, 20, 64, Math.PI, 0); ctx.lineTo(64, 30); ctx.quadraticCurveTo(0, 50, -64, 30); ctx.fill(); for (let i = 0; i < 8; i++) circ(-44 + (i * 29) % 90, 10 - (i * 17) % 40, 5, '#3a1a10'); ctx.fillStyle = '#fff7e8'; ctx.beginPath(); ctx.moveTo(-56, -14); ctx.quadraticCurveTo(-20, -60, 0, -44); ctx.quadraticCurveTo(30, -62, 56, -14); for (let i = 0; i < 5; i++) ctx.quadraticCurveTo(46 - i * 22, 6 + (i % 2) * 10, 34 - i * 22, -10); ctx.fill();
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 10, -50); ctx.rotate(sd * 0.6); ctx.fillStyle = '#3f8f4a'; ctx.beginPath(); ctx.ellipse(sd * 14, 0, 18, 8, 0, 0, 6.283); ctx.fill(); ctx.restore(); } circ(-4, -56, 6, '#e2457a'); circ(6, -58, 6, '#e2457a'); rr2(-40, 34, 80, 12, 6, '#e8eef6'); },
  pie(t) { ctx.fillStyle = '#e8b06a'; ctx.beginPath(); ctx.ellipse(0, 10, 76, 30, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#d2752e'; ctx.beginPath(); ctx.ellipse(0, 4, 64, 22, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#fff7e8'; ctx.beginPath(); ctx.ellipse(0, -6 + Math.sin(t * 3) * 2, 22, 12, 0, 0, 6.283); ctx.fill(); rr2(-76, 10, 152, 22, 11, '#c98a4a'); },
  mouse(t) { const hop = Math.abs(Math.sin(t * 3)) * 4; ctx.save(); ctx.translate(0, -hop); ctx.fillStyle = '#c9cfe0'; ctx.beginPath(); ctx.ellipse(0, 10, 56, 34, 0, 0, 6.283); ctx.fill(); circ(48, -10, 26, '#c9cfe0'); circ(36, -36, 16, '#e9b7c4'); circ(36, -36, 10, '#f7d0da'); circ(60, -12, 4.5 * (1 - blinkF(t)) + 0.5, '#20232f'); circ(74, -4, 5, '#e2457a');
    ctx.strokeStyle = '#c9cfe0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-54, 14); ctx.quadraticCurveTo(-100, 0 + Math.sin(t * 4) * 10, -110, 30); ctx.stroke(); ctx.restore(); },
  fish(t) { const w = Math.sin(t * 5) * 0.2; ctx.fillStyle = '#ff9a7a'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 34, 0, 0, 6.283); ctx.fill(); ctx.save(); ctx.translate(-64, 0); ctx.rotate(w); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, -30); ctx.lineTo(-40, 30); ctx.fill(); ctx.restore(); for (let i = 0; i < 4; i++) rr2(-30 + i * 18, -20, 6, 40, 3, 'rgba(255,255,255,0.35)'); circ(44, -8, 6, '#20232f'); },
  drumstick(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 1.5) * 0.08); ctx.fillStyle = TURKEY; ctx.beginPath(); ctx.ellipse(-16, 0, 56, 40, 0, 0, 6.283); ctx.fill(); rr2(30, -9, 46, 18, 9, '#f3ead8'); circ(78, -11, 11, '#f3ead8'); circ(78, 9, 11, '#f3ead8'); rr2(-50, -24, 40, 10, 5, 'rgba(255,255,255,0.35)'); ctx.restore(); },
  sofa(t) { rr2(-110, -30, 220, 80, 24, '#5b4fd6'); rr2(-120, -60, 50, 110, 24, '#4a3fc0'); rr2(70, -60, 50, 110, 24, '#4a3fc0'); rr2(-70, -76, 140, 56, 20, '#6f63e0'); rr2(-100, 46, 14, 20, 6, '#2d2b7c'); rr2(86, 46, 14, 20, 6, '#2d2b7c'); font(30, 700); ctx.fillStyle = GOLD; ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 2.5); ctx.fillText('z', 40, -90 - (t * 12 % 14)); ctx.fillText('Z', 64, -116 - (t * 12 % 14)); },
  wine(t) { ctx.rotate(Math.sin(t * 2.4) * 0.06); ctx.fillStyle = 'rgba(232,243,255,0.35)'; ctx.beginPath(); ctx.moveTo(-28, -50); ctx.lineTo(28, -50); ctx.quadraticCurveTo(28, 4, 0, 6); ctx.quadraticCurveTo(-28, 4, -28, -50); ctx.fill();
    ctx.fillStyle = '#b0203a'; ctx.beginPath(); ctx.moveTo(-25, -24 + Math.sin(t * 3) * 3); ctx.lineTo(25, -24 - Math.sin(t * 3) * 3); ctx.quadraticCurveTo(24, 2, 0, 3); ctx.quadraticCurveTo(-24, 2, -25, -24); ctx.fill(); rr2(-3, 4, 6, 36, 3, '#dfe7f2'); rr2(-22, 38, 44, 8, 4, '#dfe7f2'); rr2(-18, -44, 8, 30, 4, 'rgba(255,255,255,0.5)'); },
  ecg(t) { rr2(-90, -50, 180, 100, 16, '#102348'); ctx.strokeStyle = '#7ff3a0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = -80; x <= 80; x += 2) { const u = (x + 80) / 160 + t * 0.6, ph = (u * 3) % 1, irr = Math.sin(u * 17) * 0.4; let y = Math.sin(u * 40) * 3; if (ph > 0.45 + irr * 0.2 && ph < 0.52 + irr * 0.2) y = -34 * Math.sin((ph - 0.45 - irr * 0.2) / 0.07 * Math.PI); ctx.lineTo(x, y); } ctx.stroke(); },
  phone(t) { const bz = Math.sin(t * 30) * 2 * (Math.sin(t * 2) > 0.3 ? 1 : 0); ctx.save(); ctx.translate(bz, 0); rr2(-40, -76, 80, 152, 16, '#3a3f5a'); rr2(-32, -62, 64, 116, 8, '#8fd8e6'); font(30, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('911', 0, -4); circ(0, 64, 6, '#9aa6c4'); ctx.restore(); },
  calendar2(t, o) { rr2(-50, -48, 100, 100, 14, '#f3f7fb'); rr2(-50, -48, 100, 30, 12, '#e2457a'); rr2(-28, -58, 10, 20, 5, '#dfe7f2'); rr2(18, -58, 10, 20, 5, '#dfe7f2'); font(16, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.head || 'DEC', 0, -33); font((o.text || '24').length > 3 ? 30 : 46, 700); ctx.fillStyle = '#102348'; ctx.fillText(o.text || '24', 0, 16); },
  fridge(t) { rr2(-56, -90, 112, 180, 16, '#e8eef6'); rr2(-56, -24, 112, 6, 3, '#c9d6ec'); rr2(36, -70, 8, 34, 4, '#9aa6c4'); rr2(36, -6, 8, 40, 4, '#9aa6c4'); for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; ICONS_snow(-80 - p * 20, -60 + i * 40, 8 + p * 4); ctx.restore(); } },
  tray(t) { rr2(-90, 0, 180, 40, 14, '#9aa6c4'); ctx.fillStyle = TURKEY2; ctx.beginPath(); ctx.ellipse(0, 0, 70, 30, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#8a4a20'; ctx.beginPath(); ctx.ellipse(10, 4, 60, 10, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 2; i++) { const p = (t * 0.5 + i / 2) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.6; circ(-20 + i * 40, -40 - p * 50, 10 + p * 8, 'rgba(255,255,255,0.7)'); ctx.restore(); } },
  clock2(t, o) { circ(0, 0, 56, '#f3f7fb'); circ(0, 0, 46, '#102348'); for (let i = 0; i < 12; i++) { ctx.save(); ctx.rotate(i / 12 * 6.283); rr2(-2, -42, 4, 8, 2, '#8fd8e6'); ctx.restore(); } ctx.save(); ctx.rotate(t * 0.6); rr2(-3, -34, 6, 36, 3, '#ff8f4a'); ctx.restore(); ctx.save(); ctx.rotate(t * 0.05 + 1); rr2(-4, -24, 8, 26, 4, '#f3f7fb'); ctx.restore(); circ(0, 0, 6, '#ffd98a'); if (o.text) { font(22, 700); ctx.fillStyle = GOLD; ctx.textAlign = 'center'; ctx.fillText(o.text, 0, 84); } },
  salt(t) { ctx.save(); ctx.rotate(0.5 + Math.sin(t * 6) * 0.15 * Math.max(0, Math.sin(t * 1.5))); rr2(-30, -50, 60, 100, 20, '#f3f7fb'); rr2(-30, -60, 60, 30, 12, '#9aa6c4'); for (let i = 0; i < 3; i++) circ(-12 + i * 12, -62, 3, '#3a3f5a'); ctx.restore(); for (let i = 0; i < 6; i++) { const p = (t * 0.9 + i / 6) % 1; circ(40 + i * 4 + p * 30, -40 + p * 90, 3, 'rgba(255,255,255,0.9)'); } },
  bscale(t, o) { rr2(-80, -20, 160, 50, 18, '#e8eef6'); rr2(-60, -14, 120, 34, 10, '#c9d6ec'); rr2(-44, -10, 88, 26, 6, '#102348'); font(22, 700); ctx.fillStyle = '#7ff3a0'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.text || '+1 LB', 0, 4 + Math.sin(t * 6) * 0.5); },
  villi(t) { rr2(-90, 30, 180, 30, 10, '#c95a7c'); for (let i = 0; i < 7; i++) { const sw = Math.sin(t * 2 + i) * 0.15; ctx.save(); ctx.translate(-78 + i * 26, 34); ctx.rotate(sw); rr2(-10, -80, 20, 84, 10, '#f29db0'); circ(0, -80, 10, '#f7b6c4'); ctx.restore(); } for (let i = 0; i < 5; i++) { const p = (t * 0.6 + i / 5) % 1; circ(-70 + i * 34, -100 + p * 120, 6, '#ffd98a'); } },
  court(t) { rr2(-110, -60, 220, 120, 10, '#3f9a52'); ctx.fillStyle = 'rgba(255,255,255,0.8)'; rr2(-104, -54, 208, 4, 2, 'rgba(255,255,255,0.8)'); rr2(-104, 50, 208, 4, 2, 'rgba(255,255,255,0.8)'); rr2(-2, -60, 4, 120, 2, '#f3f7fb'); rr2(-104, -54, 4, 108, 2, 'rgba(255,255,255,0.8)'); rr2(100, -54, 4, 108, 2, 'rgba(255,255,255,0.8)');
    const p = (t * 0.7) % 1; circ(lerp(-80, 80, p), -40 - Math.sin(p * Math.PI) * 40, 8, '#f3f7fb'); },
  brainI(t) { ctx.fillStyle = '#f29db0'; ctx.beginPath(); ctx.ellipse(0, -6, 74, 52, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = ORG2; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { ctx.beginPath(); for (let k = 0; k <= 16; k++) { const u = k / 16; ctx.lineTo(-60 + u * 120, -40 + i * 16 + Math.sin(u * 14 + i) * 6); } ctx.stroke(); } ctx.fillStyle = '#e98aa0'; ctx.beginPath(); ctx.ellipse(46, 40, 26, 16, 0, 0, 6.283); ctx.fill(); rr2(10, 40, 16, 34, 8, '#e98aa0'); },
  plateI(t) { ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 10, 86, 30, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e6d6c0'; ctx.beginPath(); ctx.ellipse(0, 8, 62, 20, 0, 0, 6.283); ctx.fill(); circ(-24, -4, 16, '#ffcf6b'); circ(4, -10, 16, '#e09a52'); circ(30, -2, 13, SPROUT); circ(18, 8, 11, SPROUT2); for (let i = 0; i < 2; i++) { const p = (t * 0.5 + i / 2) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.6; circ(-10 + i * 30, -30 - p * 50, 9 + p * 6, 'rgba(255,255,255,0.8)'); ctx.restore(); } },
  water3(t) { for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-56 + i * 56, Math.sin(t * 3 + i) * 6); ctx.fillStyle = '#5aa9e6'; ctx.beginPath(); ctx.moveTo(0, -36); ctx.bezierCurveTo(8, -16, 24, -2, 24, 12); ctx.arc(0, 12, 24, 0, Math.PI); ctx.bezierCurveTo(-24, -2, -8, -16, 0, -36); ctx.fill(); rr2(-12, 0, 7, 16, 3.5, 'rgba(255,255,255,0.55)'); ctx.restore(); } },
  person(t) { circ(0, -50, 22, SKIN); rr2(-24, -26, 48, 70, 22, '#5b4fd6'); rr2(-20, 40, 16, 30, 8, '#2d2b7c'); rr2(4, 40, 16, 30, 8, '#2d2b7c'); ctx.save(); ctx.translate(26, -18); ctx.rotate(-1.8 + Math.sin(t * 6) * 0.4); rr2(-6, 0, 12, 40, 6, '#5b4fd6'); ctx.restore(); },
});
function ICONS_snow(x, y, r) { ctx.save(); ctx.translate(x, y); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * Math.PI / 3); rr2(-r, -1.5, r * 2, 3, 1.5, '#c9e8ff'); ctx.restore(); } ctx.restore(); }
Object.assign(IDLE, {
  stomachI: {}, turkeyI: {}, sprout: {}, raffinose: {}, microbe: {}, gasb: {}, pancreas: {}, liver: {}, glucose: {}, insulin: {}, tank: {}, flame: {}, walker: { pre: t => ctx.translate(0, -Math.abs(Math.sin(t * 6)) * 6) },
  pudding: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05), post: t => glint(t, 64, 60) }, pie: { post: t => puff(t, 0, -40, 3, -1, 'rgba(255,255,255,0.4)', 9) }, mouse: {}, fish: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.06) },
  drumstick: { post: t => glint(t, 70, 40) }, sofa: {}, wine: { post: t => bubbles(t, 0, -14, 30, 24, 3) }, ecg: {}, phone: {}, calendar2: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.05) }, fridge: { post: t => glint(t, 56, 90, 3) },
  tray: {}, clock2: {}, salt: {}, bscale: { pre: t => ctx.translate(0, Math.abs(Math.sin(t * 2)) * -3) }, villi: {}, court: {}, brainI: { pre: t => { const b = 1 + Math.sin(t * 2.4) * 0.03; ctx.scale(b, b); } }, plateI: {}, water3: {}, person: {},
});

// ---------- scenes ----------
function sOpen(t) {
  if (t < S('c3') - 0.1) { worldBG(t, 'pine'); snowfall(t); turkeyAt(t, 1240, 640, 1.5); reg('hero', 'turkey', 1240 - 345, 640 - 330, 1240 + 345, 640 + 180); kidAt(t, 420, 960, 1.5, { look: [1, -0.2] });
    if (t > S('c2')) { const it = [['stomachI', 'STOMACH BALLOONS', 'balloons', { hw: 30, hh: 50 }], ['glucose', 'SUGAR + FAT IN YOUR BLOOD', 'sugar', { hw: 44, hh: 44 }], ['microbe', 'GUT BACTERIA PARTY', 'party', { hw: 60, hh: 36 }], ['sofa', 'BRAIN WANTS A NAP', 'nap', { hw: 122, hh: 80 }]], t0s = it.map(x => W_('c2', x[2]) - 0.3);
      it.forEach(([ic, lab, w, o], i) => { const t1 = i < 3 ? t0s[i + 1] - 0.45 : S('c3') - 0.3; label(lab, 1240, 130, t, t0s[i], t1, GOLD, 36); placeIcon(ic, [[740, 300]], ic === 'sofa' ? 1.05 : 1.5, t, t0s[i], t1, o); }); }
    else label('CHRISTMAS DINNER', 1240, 140, t, 0.5, S('c2') - 0.3, GOLD, 44); return; }
  if (t < S('c4q') - 0.1) { worldBG(t, 'cream'); const p = clamp((t - W_('c3', 'first')) / (E('c3') - W_('c3', 'first'))); bodyMap(t, 960, 590, 1.15, { p }); reg('hero', 'body', 960 - 200, 160, 960 + 200, 1030);
    placeIcon('plateI', [[420, 420]], 2.4, t, W_('c3', 'bite') - 0.3, S('c4q') - 0.2, { hw: 88, hh: 50 }); label('~9 METRES OF TUBES', 1500, 460, t, W_('c3', 'nine'), S('c4q') - 0.3, '#5e2618', 36, { color: WHITE }); return; }
  if (t < S('c5') - 0.1) { worldBG(t, 'pine'); snowfall(t, 40);
    placeIcon('turkeyI', [[540, 470]], 2.6, t, S('c4q'), S('c5') - 0.2, { hw: 90, hh: 72 }); tag('HOLIDAY DINNER ≈ 3,000 CAL', 540, 820, t, W_('c4', ['3', 'three']), S('c5') - 0.3, '#9b3352', 36);
    placeIcon('calendar2', [[1380, 470]], 2.6, t, W_('c4', 'britain') - 0.3, S('c5') - 0.2, { text: '25', hw: 56, hh: 60 }); tag('CHRISTMAS DAY ≈ 6,000 CAL', 1380, 820, t, W_('c4', ['6', 'six']), S('c5') - 0.3, '#9b3352', 36); label('ESTIMATES VARY', 960, 140, t, W_('c4', 'vary'), S('c5') - 0.3, WHITE, 32); return; }
  worldBG(t, 'pine'); snowfall(t, 40); meter(380, 420, 1160, 0.5, t, W_('c5', 'need') - 0.2, S('s1') - 0.4, '#8fd8e6', '#5aa96a', 'NORMAL DAY: 1,600–3,000 CAL'); meter(380, 640, 1160, 1, t, W_('c5', 'christmas'), S('s1') - 0.4, '#ffd98a', '#e2457a', 'CHRISTMAS: UP TO 2–3 DAYS OF FOOD');
  placeIcon('plateI', [[960, 880]], 2.0, t, W_('c5', 'days') - 0.2, S('s1') - 0.4, { hw: 88, hh: 50 });
}
function sStomach(t) {
  worldBG(t, 'cream');
  if (t < S('s4q') - 0.1) { const f = t < W_('s3', 'eat') ? 0 : t < W_('s3', 'limit') ? clamp((t - W_('s3', 'eat')) / 2.5) * 0.6 : 0.6 + clamp((t - W_('s3', 'limit')) / 1.5) * 0.4;
    stomachAt(t, 760, 600, 1.35, { fill: f, food: 1, churn: t > S('s3b') }); reg('hero', 'stomach', 760 - 260, 600 - 450, 760 + 260, 600 + 290);
    if (t < S('s3') - 0.1) { label('EMPTY: ~75 ML', 1480, 380, t, W_('s2', ['75', 'seventy']), S('s3') - 0.3, '#5e2618', 36, { color: WHITE }); label('A FEW SIPS', 1480, 470, t, W_('s2', 'few'), S('s3') - 0.3, '#5e2618', 30, { color: GOLD }); label('DEEP FOLDS', 1480, 560, t, W_('s2', 'folds'), S('s3') - 0.3, '#5e2618', 30, { color: WHITE }); return; }
    if (t < S('s3b') - 0.1) { meter(1260, 380, 520, 0.25, t, W_('s3', 'normal'), S('s3b') - 0.3, '#ffd98a', '#ff8f4a', 'AFTER A MEAL: ~1 LITRE'); meter(1260, 580, 520, 1, t, W_('s3', 'limit'), S('s3b') - 0.3, '#ff8f4a', '#e2457a', 'ABSOLUTE LIMIT: ~4 LITRES'); return; }
    label('3 LAYERS OF MUSCLE', 1480, 400, t, W_('s3b', 'three'), S('s4q') - 0.3, '#5e2618', 34, { color: WHITE }); label('TWIST · SQUEEZE · KNEAD', 1480, 500, t, W_('s3b', 'twist'), S('s4q') - 0.3, '#5e2618', 30, { color: GOLD }); return; }
  if (t < S('s6') - 0.1) { placeIcon('stomachI', [[420, 520]], 2.4, t, S('s4q'), S('s6') - 0.2, { hw: 76, hh: 120 });
    if (t > W_('s5', 'vagus') - 0.3) { const k = clamp((t - W_('s5', 'vagus') + 0.3) / 1.2); ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.setLineDash([24, 18]); ctx.lineDashOffset = -t * 120; ctx.beginPath(); ctx.moveTo(620, 470); ctx.lineTo(lerp(620, 1200, k), lerp(470, 380, k)); ctx.stroke(); ctx.setLineDash([]); reg('hero', 'nerve', 600, 360, 1210, 490); }
    if (t > W_('s5', 'brain') - 0.3) drawBrainAt(t, { x: 1420, y: 360, r: 190 * spring(t - W_('s5', 'brain') + 0.3, 0.5, 11) }, { tired: 0, glow: 0.4, dim: 0, noWaste: 1 }); label('VAGUS NERVE', 900, 560, t, W_('s5', 'vagus'), S('s6') - 0.3, '#5e2618', 30, { color: WHITE });
    placeIcon('clock2', [[1640, 760]], 1.8, t, W_('s5', 'twenty') - 0.3, S('s6') - 0.2, { hw: 58, hh: 58 }); tag('~20 MINUTES TO FEEL FULL', 960, 960, t, W_('s5', 'twenty'), S('s6') - 0.3, '#c95a7c', 40); return; }
  for (let i = 0; i < 8; i++) { const t0 = S('s6') + 0.5 + i * 0.25; if (t < t0) continue; const k = spring(t - t0, 0.5, 13); ctx.save(); ctx.translate(380 + (i % 4) * 380, 340 + Math.floor(i / 4) * 300); ctx.scale(1.9 * k, 1.9 * k); ctx.rotate(Math.sin(t * 2 + i) * 0.1);
    rr2(-70, -22, 140, 44, 22, '#c97a4a'); rr2(-50, -26, 100, 52, 18, '#f2d7a8'); rr2(-50, -10, 100, 8, 4, '#e8c48a'); ctx.restore(); } reg('hero', 'pigs in blankets', 230, 270, 1660, 710);
  label('PIGS IN BLANKETS', 960, 940, t, W_('s6', 'pigs'), S('a1') - 0.4, '#5e2618', 40, { color: GOLD });
}
function sAcid(t) {
  worldBG(t, 'coral');
  if (t < S('a3') - 0.1) { stomachAt(t, 760, 620, 1.3, { fill: 0.8, food: 1, acid: 1, churn: 1 }); reg('hero', 'stomach', 760 - 250, 620 - 440, 760 + 250, 620 + 280);
    tag('ACID + ENZYMES', 1460, 300, t, W_('a2', 'acid'), S('a3') - 0.3, '#5aa96a', 40); label('A THICK LAYER OF MUCUS', 1460, 470, t, W_('a2', 'mucus'), S('a3') - 0.3, WHITE, 32); label('LINING RENEWED EVERY FEW DAYS', 1460, 640, t, W_('a2b', 'replaced'), S('a3') - 0.3, GOLD, 28); return; }
  const rf = t > S('a5') ? clamp((t - W_('a5', 'leaks')) / 1.5) : 0; stomachAt(t, 760, 660, 1.25, { fill: 0.9, food: 1, ring: t > W_('a3', 'ring') - 0.2, reflux: rf }); reg('hero', 'stomach', 760 - 250, 660 - 480, 760 + 250, 660 + 270);
  if (t < S('a4q') - 0.1) { label('A RING OF MUSCLE', 1440, 260, t, W_('a3', 'ring'), S('a4q') - 0.3, GOLD, 34);
    [['plateI', 'HUGE MEAL', 'huge'], ['drumstick', 'FATTY FOOD', 'fatty'], ['wine', 'ALCOHOL', 'alcohol']].forEach(([ic, lab, w], i) => { placeIcon(ic, [[1300 + i * 0, 440 + i * 200]], 1.4, t, W_('a3', w) - 0.2, S('a4q') - 0.2, { hw: 88, hh: 56 }); label(lab, 1620, 440 + i * 200, t, W_('a3', w), S('a4q') - 0.3, WHITE, 28); }); return; }
  tag('HEARTBURN', 1440, 300, t, S('a4q') + 0.2, S('w1') - 0.4, '#e2457a', 48); label('ACID LEAKS INTO YOUR FOOD PIPE', 1440, 420, t, W_('a5', 'leaks'), S('w1') - 0.4, WHITE, 28);
  placeIcon('sofa', [[1440, 700]], 2.0, t, W_('a5', 'sofa') - 0.3, S('w1') - 0.3, { hw: 122, hh: 80 }); label('LYING DOWN MAKES IT WORSE', 1440, 920, t, W_('a5', 'flopping'), S('w1') - 0.4, GOLD, 28); label('STAY UPRIGHT 2–3 HOURS', 1440, 1010, t, W_('a5b', 'upright'), S('w1') - 0.4, WHITE, 28);
}
function sSugar(t) {
  worldBG(t, 'coral');
  if (t < S('w3') - 0.1) { reg('hero', 'vessel', 0, 380, W, 700); rr2(-40, 400, W + 80, 280, 140, 'rgba(120,20,40,0.35)'); const n = t > W_('w2', 'pours') ? 24 : 6;
    for (let i = 0; i < n; i++) { const x = ((i * 157 + t * 240) % (W + 300)) - 150, y = 540 + Math.sin(i * 2.3 + t) * 80; ctx.save(); ctx.translate(x, y); ctx.scale(0.8, 0.8); drawIcon('glucose', t + i); ctx.restore(); }
    if (t > W_('w2', 'insulin') - 0.2) for (let i = 0; i < 5; i++) { const x = ((i * 397 + t * 180) % (W + 300)) - 150; ctx.save(); ctx.translate(x, 470 + (i % 2) * 140); ctx.scale(0.8, 0.8); drawIcon('insulin', t + i); ctx.restore(); }
    label('SUGAR POURS INTO YOUR BLOOD', 960, 180, t, W_('w2', 'pours'), S('w3') - 0.3, GOLD, 36); placeIcon('pancreas', [[420, 880]], 1.6, t, W_('w2', 'pancreas') - 0.3, S('w3') - 0.2, { hw: 100, hh: 50 }); tag('INSULIN', 1100, 880, t, W_('w2', 'insulin'), S('w3') - 0.3, '#127b84', 40); return; }
  if (t < S('w3c') - 0.1) { placeIcon('liver', [[400, 430]], 2.2, t, W_('w3', 'liver') - 0.3, S('w3c') - 0.2, { hw: 110, hh: 70 }); placeIcon('muscle', [[400, 820]], 1.9, t, W_('w3', 'muscles') - 0.3, S('w3c') - 0.2, { hw: 76, hh: 60 });
    placeIcon('tank', [[1000, 520]], 2.4, t, W_('w3', 'glycogen') - 0.2, S('w3c') - 0.2, { hw: 50, hh: 86 }); tag('GLYCOGEN = STORED SUGAR', 1000, 860, t, W_('w3', 'glycogen'), S('w3c') - 0.3, '#9b3352', 34);
    label('LIVER ~100 G', 1520, 400, t, W_('w3b', 'liver'), S('w3c') - 0.3, WHITE, 32); label('MUSCLES: SEVERAL HUNDRED G', 1520, 500, t, W_('w3b', 'muscles'), S('w3c') - 0.3, WHITE, 28); label('THE REST → FAT', 1520, 640, t, W_('w3', 'fat'), S('w3c') - 0.3, GOLD, 32); return; }
  if (t < S('w4q') - 0.1) { placeIcon('flame', [[700, 500]], 2.8, t, W_('w3c', 'burned') - 0.4, S('w4q') - 0.2, { hw: 60, hh: 64 }); tag('~10% OF THE CALORIES', 1300, 460, t, W_('w3c', 'tenth'), S('w4q') - 0.3, '#9b3352', 40); label('BURNED JUST DIGESTING', 1300, 580, t, W_('w3c', 'processing'), S('w4q') - 0.3, WHITE, 32); label('YOU FEEL WARM', 1300, 680, t, W_('w3c', 'warm'), S('w4q') - 0.3, GOLD, 32); return; }
  if (t < S('w5') - 0.1) { kidAt(t, 960, 900, 1.6, { look: [0, -0.4] }); label('CAN I FIX THE SPIKE?', 960, 160, t, S('w4q') + 0.2, S('w5') - 0.3, GOLD, 40); return; }
  graph(t, 260, 260, 760, 460, W_('w5', 'walking') - 0.4, [[u => Math.exp(-((u - 0.35) ** 2) / 0.02) * 0.9 + 0.05, '#e2457a'], [u => Math.exp(-((u - 0.4) ** 2) / 0.03) * 0.55 + 0.05, '#7ff3a0']]);
  label('SITTING', 640, 210, t, W_('w5', 'sitting'), S('d1') - 0.4, '#ff9fb4', 28); label('2–5 MIN WALK', 640, 790, t, W_('w5', 'two'), S('d1') - 0.4, '#7ff3a0', 30);
  placeIcon('walker', [[1440, 470]], 2.6, t, W_('w5', 'walking') - 0.3, S('d1') - 0.3, { hw: 40, hh: 100 }); label('2022 REVIEW · 7 STUDIES', 1440, 790, t, W_('w5', ['2022', 'twenty']), S('d1') - 0.4, WHITE, 28); label('STANDING HELPS A LITTLE', 1440, 890, t, W_('w6', 'standing'), S('d1') - 0.4, GOLD, 28);
}
function sDessert(t) {
  worldBG(t, 'indigo');
  if (t < S('d3') - 0.1) { placeIcon('turkeyI', [[420, 470]], 2.4, t, S('d1') + 1.0, S('d3') - 0.2, { hw: 90, hh: 72 }); stamp(0, 600, 300, t, W_('d2', 'enough'));
    placeIcon('pudding', [[1000, 470]], 2.4, t, W_('d2', 'new') - 0.3, S('d3') - 0.2, { hw: 70, hh: 70 }); placeIcon('pie', [[1500, 470]], 2.2, t, W_('d2', 'exciting') - 0.3, S('d3') - 0.2, { hw: 80, hh: 46 });
    label('SAME FLAVOUR = BORING', 420, 780, t, W_('d2', 'enough'), S('d3') - 0.3, WHITE, 28); label('NEW FLAVOUR = EXCITING', 1250, 780, t, W_('d2', 'new'), S('d3') - 0.3, GOLD, 28); tag('SENSORY-SPECIFIC SATIETY', 960, 920, t, W_('d2', 'sensory'), S('d3') - 0.3, '#5b4fd6', 36); return; }
  drawBrainAt(t, { x: 1180, y: 520, r: 300 }, { tired: 0, glow: t > W_('d3', 'opioid') ? 1 : 0.2, dim: 0, noWaste: 1, halo: 'rgba(255,200,230,0.3)' });
  placeIcon('mouse', [[380, 400]], 2.2, t, W_('d3', 'mice') - 0.3, S('d4') + 0.2, { hw: 100, hh: 50 }); placeIcon('pudding', [[380, 760]], 1.8, t, W_('d3', 'sugar') - 0.2, S('z1') - 0.3, { hw: 70, hh: 70 });
  label('2025 · MAX PLANCK, GERMANY', 1180, 110, t, W_('d3', ['2025', 'twenty']), S('z1') - 0.4, WHITE, 28); tag('FULLNESS CELLS → NATURAL OPIOID', 1180, 960, t, W_('d3', 'opioid'), S('d4') - 0.2, '#c95a7c', 34);
  tag('A "DESSERT STOMACH" IN THE BRAIN', 1180, 960, t, W_('d4', 'dessert') - 0.2, S('z1') - 0.4, '#5b4fd6', 34); label('SEEN IN PEOPLE TOO (EARLY DATA)', 380, 980, t, W_('d4', 'people'), S('z1') - 0.4, GOLD, 24);
}
function sComa(t) {
  worldBG(t, 'night');
  if (t < S('z4q') - 0.1) { placeIcon('turkeyI', [[420, 450]], 2.4, t, S('z1') + 1.0, S('z4q') - 0.2, { hw: 90, hh: 72 }); placeIcon('hexmol', [[420, 820]], 1.4, t, W_('z2', 'tryptophan') - 0.2, S('z4q') - 0.2, { hw: 40, hh: 40 }); label('TRYPTOPHAN', 420, 935, t, W_('z2', 'tryptophan'), S('z4q') - 0.3, '#b48cff', 28);
    if (t < S('z3') - 0.1) { tag('MYTH', 420, 160, t, W_('z2', 'myth'), S('z3') - 0.3, '#e2457a', 44); placeIcon('drumstick', [[1180, 450]], 2.0, t, W_('z2', 'meats') - 0.2, S('z3') - 0.2, { hw: 90, hh: 50 }); placeIcon('fish', [[1580, 450]], 2.0, t, W_('z2', 'salmon') - 0.2, S('z3') - 0.2, { hw: 110, hh: 40 }); label('ABOUT AS MUCH', 1380, 680, t, W_('z2', 'much'), S('z3') - 0.3, GOLD, 32); return; }
    drawBrainAt(t, { x: 1450, y: 500, r: 230 }, { tired: 0.2, glow: 0.2, dim: 0, noWaste: 1 });
    for (let i = 0; i < 9; i++) { const p = ((t - S('z3')) * 0.35 + i / 9) % 1, blocked = i % 4 !== 0, x = lerp(760, 1180, blocked ? Math.min(p, 0.82) : p), y = 820 - p * 260 + (i % 3) * 30; ctx.save(); ctx.globalAlpha = blocked && p > 0.82 ? 1 - (p - 0.82) / 0.18 : 1; circ(x, y, 18, i % 4 ? '#8fd8e6' : '#b48cff'); ctx.restore(); }
    reg('hero', 'race', 740, 520, 1200, 900); label('OTHER AMINO ACIDS WIN THE RACE', 1300, 920, t, W_('z3', 'compete'), S('z4q') - 0.3, WHITE, 28); return; }
  if (t < S('z5') - 0.1) { kidAt(t, 960, 920, 1.7, { lid: 0.55, look: [0, 0.2] }); label('SO WHY THE NAP?', 960, 140, t, S('z4q') + 0.2, S('z5') - 0.3, GOLD, 40); return; }
  tile3(t, [['plateI', 'AN ENORMOUS MEAL', '#5b4fd6', W_('z5', 'enormous')], ['wine', 'ALCOHOL', '#9b3352', W_('z5', 'alcohol')], ['clock2', 'AFTERNOON DIP', '#127b84', W_('z6', 'afternoon')]], 520);
  label('REST-AND-DIGEST MODE', 960, 960, t, W_('z5', 'rest'), S('g1') - 0.4, GOLD, 34);
}
function sGas(t) {
  worldBG(t, 'teal');
  if (t < S('g3') - 0.1) { placeIcon('sprout', [[440, 480]], 3.0, t, S('g1') + 1.0, S('g3') - 0.2, { hw: 54, hh: 64 }); placeIcon('raffinose', [[1100, 420]], 2.4, t, W_('g2', 'raffinose') - 0.3, S('g3') - 0.2, { hw: 104, hh: 40 }); tag('RAFFINOSE', 1100, 620, t, W_('g2', 'raffinose'), S('g3') - 0.3, '#0b4f5c', 40);
    label('NO ENZYME TO BREAK IT', 1100, 760, t, W_('g2', 'enzyme'), S('g3') - 0.3, WHITE, 30); label('→ LARGE INTESTINE, UNTOUCHED', 1100, 860, t, W_('g2', 'large'), S('g3') - 0.3, GOLD, 30); return; }
  if (t < S('g4') - 0.1) { placeIcon('microbe', [[400, 400]], 2.2, t, S('g3'), S('g4') - 0.2, { hw: 76, hh: 40 }); placeIcon('microbe', [[400, 720]], 2.0, t, S('g3') + 0.4, S('g4') - 0.2, { hw: 76, hh: 40 });
    if (t < S('g3b') - 0.1) { [['H₂', 'rgba(200,240,255,0.6)', 'hydrogen'], ['CO₂', 'rgba(220,220,220,0.6)', 'carbon'], ['CH₄', 'rgba(200,255,200,0.6)', 'methane']].forEach(([txt, col, w], i) => placeIcon('gasb', [[900 + i * 330, 480]], 2.0, t, W_('g3', w) - 0.2, S('g3b') - 0.2, { txt, col, hw: 50, hh: 66 }));
      label('BACTERIA FEAST → GAS', 1230, 760, t, W_('g3', 'feast'), S('g3b') - 0.3, GOLD, 34); return; }
    tag('~38 TRILLION GUT BACTERIA', 1180, 400, t, W_('g3b', ['38', 'thirty']), S('g4') - 0.3, '#0b4f5c', 40); label('ABOUT AS MANY AS YOUR OWN CELLS', 1180, 540, t, W_('g3b', 'many'), S('g4') - 0.3, WHITE, 30); label('A FEAST FOR THEM TOO', 1180, 660, t, W_('g3b', 'feast'), S('g4') - 0.3, GOLD, 32); return; }
  kidAt(t, 760, 940, 1.6, { look: [0.5, 0], squash: Math.max(0, Math.sin(t * 3)) ** 8 * 0.4 }); for (let i = 0; i < 4; i++) { const p = (t * 0.5 + i / 4) % 1; circ(620 - p * 160, 860 - p * 120, 16 + p * 20, `rgba(200,255,200,${0.5 * (1 - p)})`); }
  tag('12+ TIMES A DAY', 1420, 420, t, W_('g4', 'dozen'), S('k1') - 0.4, '#0b4f5c', 44); label('TODAY: OVERTIME', 1420, 560, t, W_('g4', 'overtime'), S('k1') - 0.4, GOLD, 36);
}
function sScale(t) {
  worldBG(t, 'gold');
  if (t < S('k4q') - 0.1) { placeIcon('bscale', [[560, 560]], 3.0, t, S('k1') + 1.0, S('k4q') - 0.2, { text: '+ ? KG', hw: 84, hh: 30 });
    if (t < S('k3') - 0.1) { placeIcon('salt', [[1200, 360]], 2.0, t, W_('k2', 'salty') - 0.3, S('k3') - 0.2, { hw: 50, hh: 70 }); label('SALT HOLDS WATER', 1200, 560, t, W_('k2', 'salty'), S('k3') - 0.3, '#5e2618', 30, { color: WHITE });
      placeIcon('tank', [[1500, 760]], 1.3, t, W_('k2', 'glycogen') - 0.2, S('k3') - 0.2, { level: 0.9, hw: 50, hh: 86 }); placeIcon('water3', [[1760, 760]], 1.0, t, W_('k2', 'three') - 0.2, S('k3') - 0.2, { hw: 82, hh: 40 }); label('1 G GLYCOGEN + ~3 G WATER', 1440, 960, t, W_('k2', 'three'), S('k3') - 0.3, '#5e2618', 28, { color: GOLD }); tag('MOSTLY WATER', 560, 160, t, W_('k2', 'mostly'), S('k3') - 0.3, '#127b84', 44); return; }
    bodyMap(t, 1400, 560, 0.85, { p: 0.62 }); reg('hero', 'body', 1400 - 150, 230, 1400 + 150, 900); label('STILL INSIDE YOU', 1400, 970, t, W_('k3', 'still'), S('k4q') - 0.3, '#5e2618', 32, { color: GOLD }); return; }
  if (t < S('k6') - 0.1) { placeIcon('bscale', [[560, 560]], 3.0, t, S('k4q'), S('k6') + 2, { text: '+0.37 KG', hw: 84, hh: 30 }); tag('LESS THAN HALF A KILO', 1360, 420, t, W_('k5', 'less'), S('k6') - 0.3, '#9b3352', 40); label('≈ 1 POUND', 1360, 540, t, W_('k5', 'pound'), S('k6') - 0.3, '#5e2618', 36, { color: WHITE }); label('US STUDY · 195 ADULTS', 1360, 660, t, W_('k5', 'study'), S('k6') - 0.3, '#5e2618', 28, { color: GOLD }); return; }
  placeIcon('bscale', [[560, 560]], 3.0, t, S('k4q'), S('h1') - 0.3, { text: '+0.37 KG', hw: 84, hh: 30 }); placeIcon('calendar2', [[1360, 460]], 2.2, t, W_('k6', 'months') - 0.3, S('h1') - 0.3, { head: 'LATER', text: 'MAR', hw: 56, hh: 60 }); tag('MOST OF IT STAYED', 1360, 780, t, W_('k6', 'still'), S('h1') - 0.4, '#9b3352', 40);
}
function sHeart(t) {
  worldBG(t, 'night');
  if (t < S('h4q') - 0.1) { if (t < S('h3') - 0.1) { placeIcon('liver', [[520, 470]], 2.4, t, S('h1') + 1.0, S('h3') - 0.2, { hw: 110, hh: 70 }); placeIcon('wine', [[1100, 470]], 2.4, t, S('h1') + 1.2, S('h3') - 0.2, { hw: 34, hh: 54 }); placeIcon('clock2', [[1560, 470]], 2.0, t, W_('h2', 'hour') - 0.3, S('h3') - 0.2, { hw: 58, hh: 58 });
      tag('~1 STANDARD DRINK PER HOUR', 960, 820, t, W_('h2', 'drink'), S('h2b') - 0.3, '#9b3352', 40); label('FASTER → IT PILES UP', 960, 940, t, W_('h2', 'faster'), S('h2b') - 0.3, GOLD, 30);
      placeIcon('water3', [[960, 820]], 1.6, t, W_('h2b', 'dries') - 0.2, S('h3') - 0.2, { hw: 82, hh: 40 }); label('ALCOHOL DRIES YOU OUT', 960, 960, t, W_('h2b', 'dries'), S('h3') - 0.3, GOLD, 32); return; }
    placeIcon('heart', [[560, 470]], 3.0, t, S('h3'), S('h4q') - 0.2, { hw: 62, hh: 46 }); placeIcon('ecg', [[1300, 470]], 2.4, t, W_('h3', 'rhythm') - 0.3, S('h4q') - 0.2, { hw: 92, hh: 52 });
    tag('HOLIDAY HEART SYNDROME', 960, 800, t, W_('h3', 'holiday', 1) - 0.4, S('h4q') - 0.3, '#e2457a', 44); label('NAMED IN 1978', 960, 920, t, W_('h3', ['1978', 'nineteen']), S('h4q') - 0.3, WHITE, 30); return; }
  if (t < S('h6') - 0.1) { placeIcon('calendar2', [[560, 460]], 2.8, t, S('h4q'), S('h6') - 0.2, { text: '24', hw: 56, hh: 60 }); placeIcon('heart', [[1400, 420]], 2.4, t, W_('h5', 'heart') - 0.3, S('h6') - 0.2, { hw: 62, hh: 46 });
    tag('+37% ON CHRISTMAS EVE', 1400, 680, t, W_('h5', ['37', 'thirty']), S('h6') - 0.3, '#e2457a', 40); label('SWEDEN · 280,000+ HEART ATTACKS', 960, 880, t, W_('h5', 'swedish'), S('h6') - 0.3, WHITE, 30); label('VS. THE WEEKS AROUND IT', 1400, 790, t, W_('h5', 'weeks'), S('h6') - 0.3, GOLD, 26); return; }
  tile3(t, [['flame', 'STRESS', '#5b4fd6', W_('h6', 'stress')], ['plateI', 'HEAVY MEALS', '#9b3352', W_('h6', 'heavy')], ['wine', 'ALCOHOL', '#127b84', W_('h6', 'alcohol')]], 470);
  if (t > W_('h6', 'chest') - 0.3) { placeIcon('phone', [[1780, 900]], 1.0, t, W_('h6', 'chest') - 0.3, S('l1') - 0.3, { hw: 44, hh: 80 }); label('CHEST PAIN? CALL FOR HELP NOW', 960, 900, t, W_('h6', 'chest'), S('l1') - 0.4, GOLD, 34); }
}
function sLeftovers(t) {
  worldBG(t, 'pine');
  if (t < S('l3') - 0.1) { placeIcon('tray', [[620, 520]], 3.0, t, S('l1') + 1.0, S('l3') - 0.2, { hw: 94, hh: 60 }); placeIcon('microbe', [[1340, 440]], 2.4, t, W_('l2', 'bacterium') - 0.3, S('l3') - 0.2, { hw: 76, hh: 40 });
    tag('CLOSTRIDIUM PERFRINGENS', 1340, 660, t, W_('l2', 'clostridium') - 0.1, S('l3') - 0.3, '#9b3352', 34); label('LOVES MEAT + GRAVY AT ROOM TEMP', 960, 900, t, W_('l2', 'loves'), S('l3') - 0.3, WHITE, 30); return; }
  if (t < S('l4') - 0.1) { tag('~1 MILLION CASES A YEAR (US)', 960, 220, t, W_('l3', 'million') - 0.3, S('l4') - 0.3, '#9b3352', 40); placeIcon('calendar2', [[620, 560]], 2.4, t, W_('l3', 'november') - 0.3, S('l4') - 0.2, { head: 'PEAK', text: 'NOV', hw: 56, hh: 60 }); label('PEAK: NOV–DEC', 620, 800, t, W_('l3', 'peak'), S('l4') - 0.3, GOLD, 32);
    placeIcon('turkeyI', [[1300, 560]], 2.2, t, W_('l3', 'turkey') - 0.3, S('l4') - 0.2, { hw: 90, hh: 72 }); label('TURKEY · ROAST BEEF', 1300, 800, t, W_('l3', 'turkey'), S('l4') - 0.3, WHITE, 30); return; }
  tile3(t, [['fridge', 'FRIDGE WITHIN 2 HOURS', '#127b84', W_('l4', 'fridge') - 0.3], ['drumstick', 'CUT BIG PIECES SMALLER', '#5b4fd6', W_('l4', 'cut')], ['tray', 'REHEAT UNTIL STEAMING', '#9b3352', W_('l4', 'reheat')]], 540);
}
function sTransit(t) {
  worldBG(t, 'cream');
  if (t < S('t2b') - 0.1) { const p = t < S('t2') ? 0.02 : clamp((t - S('t2')) / (E('t2') - S('t2'))) * 0.55; bodyMap(t, 760, 590, 1.15, { p }); reg('hero', 'body', 760 - 200, 160, 760 + 200, 1030);
    placeIcon('clock2', [[1440, 440]], 2.2, t, W_('t2', 'six') - 0.3, S('t2b') - 0.2, { hw: 58, hh: 58 }); tag('6–8 HOURS', 1440, 700, t, W_('t2', 'six'), S('t2b') - 0.3, '#c95a7c', 44); label('STOMACH + SMALL INTESTINE', 1440, 820, t, W_('t2', 'small'), S('t2b') - 0.3, '#5e2618', 28, { color: WHITE }); return; }
  if (t < S('t3') - 0.1) { placeIcon('villi', [[600, 520]], 3.0, t, S('t2b'), S('t3') - 0.2, { hw: 92, hh: 100 }); label('FINGER-LIKE FOLDS', 600, 880, t, W_('t2b', 'finger'), S('t3') - 0.3, '#5e2618', 32, { color: WHITE });
    placeIcon('court', [[1400, 500]], 2.4, t, W_('t2b', 'badminton') - 0.4, S('t3') - 0.2, { hw: 112, hh: 64 }); tag('½ A BADMINTON COURT', 1400, 760, t, W_('t2b', 'half'), S('t3') - 0.3, '#3f8f4a', 40); return; }
  const p = 0.55 + clamp((t - S('t3')) / (E('t3') - S('t3'))) * 0.45; bodyMap(t, 760, 590, 1.15, { p }); reg('hero', 'body', 760 - 200, 160, 760 + 200, 1030);
  if (t < S('t4') - 0.1) { tag('COLON: ~1.5 DAYS', 1440, 380, t, W_('t3', 'colon'), S('t4') - 0.3, '#c95a7c', 40); tag('TOTAL: 2–5 DAYS', 1440, 560, t, W_('t3', 'two'), S('t4') - 0.3, '#9b3352', 48); label('MAYO CLINIC', 1440, 680, t, W_('t3', 'mayo'), S('t4') - 0.3, '#5e2618', 28, { color: WHITE }); return; }
  placeIcon('calendar2', [[1300, 500]], 2.2, t, S('t4'), S('o1') - 0.3, { text: '25', hw: 56, hh: 60 }); arrow(1500, 500, t, W_('t4', 'still')); placeIcon('calendar2', [[1700, 500]], 1.8, t, W_('t4', 'few') - 0.2, S('o1') - 0.3, { text: '28', hw: 56, hh: 60 }); label('STILL WITH YOU', 1500, 760, t, W_('t4', 'still'), S('o1') - 0.4, '#5e2618', 34, { color: GOLD });
}
function sOutro(t) {
  const C = CUE; worldBG(t, 'pine'); snowfall(t);
  if (t < S('o3') - 0.1) { turkeyAt(t, 1300, 640, 1.3); reg('hero', 'turkey', 1300 - 300, 640 - 300, 1300 + 300, 640 + 160); kidAt(t, 480, 960, 1.5, { look: [1, -0.2] });
    const items = [['stomachI', 'STRETCHES', 'stretches'], ['glucose', 'FILLS SUGAR TANKS', 'tanks'], ['microbe', 'FEEDS BACTERIA', 'bacteria'], ['walker', 'WALK A LITTLE', 'walk']], t0s = items.map(x => W_('o2', x[2]) - 0.3);
    items.forEach(([ic, lab, w], i) => label(lab, 1300, 130, t, t0s[i], i < 3 ? t0s[i + 1] - 0.45 : S('o3') - 0.3, GOLD, 36));
    label('BUILT FOR FEASTS', 480, 140, t, W_('o2', 'built'), S('o3') - 0.3, WHITE, 34); return; }
  turkeyAt(t, 520, 760, 1.0); reg('hero', 'turkey', 520 - 235, 760 - 240, 520 + 235, 760 + 120);
  if (t > S('o3') + 0.2) { reg('label', 'title', 980, 300, 1880, 640); LABELQ.push(() => { riseText('WHAT CHRISTMAS DINNER', 1430, 400, S('o3') + 0.2, t, { size: 70, weight: 700, color: WHITE, ls: 5, pill: false, dur: 0.8 });
    riseText('DOES TO YOUR BODY', 1430, 530, S('o3') + 0.45, t, { size: 84, weight: 700, color: GOLD, ls: 6, pill: false, dur: 0.8 }); }); sfx('title', S('o3') + 0.2); }
  if (t > S('o4') - 0.2) placeIcon('subscribe', [[1430, 720]], 1.2, t, W_('o4', 'subscribe'), 999, { hw: 124, hh: 38 });
  if (t > C.end) for (const [x, y] of [[1230, 900], [1630, 900]]) { const k = spring(t - C.end - 0.2, 0.5, 12); rr2(x - 170 * k, y - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', x - 170, y - 96, x + 170, y + 96); }
}

const CHAPTERS = [['s1', 'Your stretchy stomach', 'cream', 'stomachI'], ['a1', 'Acid and heartburn', 'coral', 'flame'], ['w1', 'The sugar wave', 'coral', 'glucose'], ['d1', 'Room for dessert', 'indigo', 'pudding'], ['z1', 'The food coma', 'night', 'sofa'],
  ['g1', 'Sprouts and gas', 'teal', 'sprout'], ['k1', 'The scale the next morning', 'gold', 'bscale'], ['h1', 'Wine and your heart', 'night', 'heart'], ['l1', 'The leftovers trap', 'pine', 'fridge'], ['t1', 'The long goodbye', 'cream', 'clock2']];
function SECTIONS() {
  const out = [], add = (t0, draw, tr, at) => out.push({ t0, draw, tr, at });
  add(0, sOpen);
  const ids = Object.keys(LINES), prevEnd = id => LINES[ids[ids.indexOf(id) - 1]].end + 0.15;
  const scene = { s1: [sStomach, 's2'], a1: [sAcid, 'a2'], w1: [sSugar, 'w2'], d1: [sDessert, 'd2'], z1: [sComa, 'z2'], g1: [sGas, 'g2'], k1: [sScale, 'k2'], h1: [sHeart, 'h2'], l1: [sLeftovers, 'l2'], t1: [sTransit, 't2'] };
  CHAPTERS.forEach(([id, title, world, ic], i) => { const t0 = prevEnd(id); add(t0, tt => chapterCard(tt, title, i + 1, world, ic, t0), 'flood', [960, 540]); const [fn, first] = scene[id]; add(Math.min(LINES[id].start + 1.2, LINES[first].start), fn, 'flood', [960, 540]); });
  add(L('o1').start - 0.1, sOutro, 'flood', [960, 540]);
  out.sort((a, b) => a.t0 - b.t0); out.forEach((s, i) => s.t1 = i + 1 < out.length ? out[i + 1].t0 : 1e9); return out;
}
