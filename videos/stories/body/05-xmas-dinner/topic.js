// "What Christmas dinner does to your body" — topic file (engine + common.js cast system + icons2.js)
// Visual rework 2026-11-21: every phrase gets its own picture, and the pictures act on each other
// (food flies into the stomach, acid hits the mucus shield, sugar pours into the blood, bacteria eat raffinose…).
const ORG = '#f08a9c', ORG2 = '#c95a7c', TURKEY = '#c8793a', TURKEY2 = '#9a5524', SPROUT = '#6fae4a', SPROUT2 = '#4d8a32';
WORLDS.plum = { a: '#5a2350', b: '#2e1030', blobs: [[226, 69, 122, .16], [255, 143, 74, .08], [143, 216, 230, .06]], dots: 'rgba(255,200,220,0.07)' };
const RP = (w, d = 1) => tt => clamp((tt - T(w)) / d);   // 0→1 ramp starting on a word
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
  const ex = -128 * b, ey = -132 * b, tube = u => [lerp(-128, ex, u) + Math.sin(u * Math.PI) * 14 * (1.05 - b), lerp(-330, ey, u)];   // oesophagus, always joined to the stomach
  ctx.strokeStyle = '#f3b4c0'; ctx.lineWidth = 44; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const [a, c] = tube(i / 12); i ? ctx.lineTo(a, c) : ctx.moveTo(a, c); } ctx.stroke(); rr2(-142, -318, 10, 96, 5, 'rgba(255,255,255,0.35)');
  if (o.reflux) { const k = o.reflux; for (let i = 0; i < 6; i++) { const p = (t * 0.8 + i / 6) % 1; if (p > k) continue; const [a, c] = tube(1 - p * 0.85); circ(a + Math.sin(t * 5 + i) * 6, c, 12, '#ffd36b'); }
    for (let i = 0; i < 3; i++) { const fx = -128 + (i - 1) * 26, h = 30 + Math.sin(t * 9 + i * 2) * 10; ctx.fillStyle = i % 2 ? '#ff8f4a' : '#ffd98a'; ctx.globalAlpha *= 1; ctx.beginPath(); ctx.moveTo(fx - 10, -260); ctx.quadraticCurveTo(fx - 12, -260 - h * 0.6, fx + Math.sin(t * 7 + i) * 4, -260 - h); ctx.quadraticCurveTo(fx + 12, -260 - h * 0.6, fx + 10, -260); ctx.fill(); } }
  ctx.save(); ctx.scale(b * (1 + sq), b * (1 - sq));
  const SP = new Path2D(); SP.moveTo(-150, -150); SP.bezierCurveTo(-60, -230, 160, -200, 170, -40); SP.bezierCurveTo(180, 120, 60, 210, -60, 180); SP.bezierCurveTo(-140, 160, -150, 110, -120, 90); SP.bezierCurveTo(-60, 120, 40, 80, 20, -10); SP.bezierCurveTo(10, -80, -80, -100, -110, -120); SP.closePath();
  ctx.fillStyle = ORG; ctx.fill(SP); ctx.save(); ctx.clip(SP);
  ctx.fillStyle = '#f7a6b4'; ctx.beginPath(); ctx.ellipse(70, -60, 70, 40, -0.6, 0, 6.283); ctx.fill();
  ctx.save(); ctx.globalAlpha *= 1 - f * 0.85; ctx.strokeStyle = ORG2; ctx.lineWidth = 10; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const u = k / 20; ctx.lineTo(lerp(-40, 130, u) - i * 18, lerp(-120, 120, u) + Math.sin(u * 12 + i) * 14 + i * 10); } ctx.stroke(); } ctx.restore();
  if (o.food) for (let i = 0; i < 12 * f; i++) circ(40 + Math.cos(i * 2.4 + t * 0.5) * (40 + (i * 13) % 60), 20 + Math.sin(i * 2.4 + t * 0.5) * (30 + (i * 7) % 50), 14, ['#ffcf6b', SPROUT, '#e09a52', '#f3ead8'][i % 4]);
  if (o.acid) for (let i = 0; i < 10; i++) { const p = (t * 0.7 + i / 10) % 1; circ(-10 + ((i * 41) % 150), 140 - p * 180, 6 + (i % 3) * 2, `rgba(200,255,120,${0.8 * (1 - p)})`); }
  ctx.restore(); ctx.restore();
  circ(ex, ey, 22, o.ring ? '#c95a7c' : '#e48aa0'); if (o.ring) { ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 4); circ(ex, ey, 30, 'rgba(255,217,138,0.5)'); ctx.restore(); }
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
  calendar2(t, o) { rr2(-50, -48, 100, 100, 14, '#f3f7fb'); rr2(-50, -48, 100, 30, 12, '#e2457a'); rr2(-28, -58, 10, 20, 5, '#dfe7f2'); rr2(18, -58, 10, 20, 5, '#dfe7f2'); font(16, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.head || 'DEC', 0, -33); font((o.text || '24').length > 3 ? 30 : 46, 700); ctx.fillStyle = '#102348'; ctx.fillText(o.text || '24', 0, 16); },
  fridge(t) { rr2(-56, -90, 112, 180, 16, '#e8eef6'); rr2(-56, -24, 112, 6, 3, '#c9d6ec'); rr2(36, -70, 8, 34, 4, '#9aa6c4'); rr2(36, -6, 8, 40, 4, '#9aa6c4'); for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; ICONS_snow(-80 - p * 20, -60 + i * 40, 8 + p * 4); ctx.restore(); } },
  tray(t) { rr2(-90, 0, 180, 40, 14, '#9aa6c4'); ctx.fillStyle = TURKEY2; ctx.beginPath(); ctx.ellipse(0, 0, 70, 30, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#8a4a20'; ctx.beginPath(); ctx.ellipse(10, 4, 60, 10, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 2; i++) { const p = (t * 0.5 + i / 2) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.6; circ(-20 + i * 40, -40 - p * 50, 10 + p * 8, 'rgba(255,255,255,0.7)'); ctx.restore(); } },
  clock2(t, o) { circ(0, 0, 56, '#f3f7fb'); circ(0, 0, 46, '#102348'); for (let i = 0; i < 12; i++) { ctx.save(); ctx.rotate(i / 12 * 6.283); rr2(-2, -42, 4, 8, 2, '#8fd8e6'); ctx.restore(); } ctx.save(); ctx.rotate(t * 0.6); rr2(-3, -34, 6, 36, 3, '#ff8f4a'); ctx.restore(); ctx.save(); ctx.rotate(t * 0.05 + 1); rr2(-4, -24, 8, 26, 4, '#f3f7fb'); ctx.restore(); circ(0, 0, 6, '#ffd98a'); if (o.text) { font(22, 700); ctx.fillStyle = GOLD; ctx.textAlign = 'center'; ctx.fillText(o.text, 0, 84); } },
  salt(t) { ctx.save(); ctx.rotate(0.5 + Math.sin(t * 6) * 0.15 * Math.max(0, Math.sin(t * 1.5))); rr2(-30, -50, 60, 100, 20, '#f3f7fb'); rr2(-30, -60, 60, 30, 12, '#9aa6c4'); for (let i = 0; i < 3; i++) circ(-12 + i * 12, -62, 3, '#3a3f5a'); ctx.restore(); for (let i = 0; i < 6; i++) { const p = (t * 0.9 + i / 6) % 1; circ(40 + i * 4 + p * 30, -40 + p * 90, 3, 'rgba(255,255,255,0.9)'); } },
  bscale(t, o) { rr2(-80, -20, 160, 50, 18, '#e8eef6'); rr2(-60, -14, 120, 34, 10, '#c9d6ec'); rr2(-44, -10, 88, 26, 6, '#102348'); font(22, 700); ctx.fillStyle = '#7ff3a0'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.text || '+1 LB', 0, 4 + Math.sin(t * 6) * 0.5); },
  villi(t) { rr2(-90, 30, 180, 30, 10, '#c95a7c'); for (let i = 0; i < 7; i++) { const sw = Math.sin(t * 2 + i) * 0.15; ctx.save(); ctx.translate(-78 + i * 26, 34); ctx.rotate(sw); rr2(-10, -80, 20, 84, 10, '#f29db0'); circ(0, -80, 10, '#f7b6c4'); ctx.restore(); } for (let i = 0; i < 5; i++) { const p = (t * 0.6 + i / 5) % 1; circ(-70 + i * 34, -100 + p * 120, 6, '#ffd98a'); } },
  court(t) { rr2(-110, -60, 220, 120, 10, '#3f9a52'); ctx.fillStyle = 'rgba(255,255,255,0.8)'; rr2(-104, -54, 208, 4, 2, 'rgba(255,255,255,0.8)'); rr2(-104, 50, 208, 4, 2, 'rgba(255,255,255,0.8)'); rr2(-2, -60, 4, 120, 2, '#f3f7fb'); rr2(-104, -54, 4, 108, 2, 'rgba(255,255,255,0.8)'); rr2(100, -54, 4, 108, 2, 'rgba(255,255,255,0.8)');
    const p = (t * 0.7) % 1; circ(lerp(-80, 80, p), -40 - Math.sin(p * Math.PI) * 40, 8, '#f3f7fb'); },
  plateI(t) { ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 10, 86, 30, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e6d6c0'; ctx.beginPath(); ctx.ellipse(0, 8, 62, 20, 0, 0, 6.283); ctx.fill(); circ(-24, -4, 16, '#ffcf6b'); circ(4, -10, 16, '#e09a52'); circ(30, -2, 13, SPROUT); circ(18, 8, 11, SPROUT2); for (let i = 0; i < 2; i++) { const p = (t * 0.5 + i / 2) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.6; circ(-10 + i * 30, -30 - p * 50, 9 + p * 6, 'rgba(255,255,255,0.8)'); ctx.restore(); } },
  water3(t) { for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-56 + i * 56, Math.sin(t * 3 + i) * 6); ctx.fillStyle = '#5aa9e6'; ctx.beginPath(); ctx.moveTo(0, -36); ctx.bezierCurveTo(8, -16, 24, -2, 24, 12); ctx.arc(0, 12, 24, 0, Math.PI); ctx.bezierCurveTo(-24, -2, -8, -16, 0, -36); ctx.fill(); rr2(-12, 0, 7, 16, 3.5, 'rgba(255,255,255,0.55)'); ctx.restore(); } },
});
function ICONS_snow(x, y, r) { ctx.save(); ctx.translate(x, y); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * Math.PI / 3); rr2(-r, -1.5, r * 2, 3, 1.5, '#c9e8ff'); ctx.restore(); } ctx.restore(); }
Object.assign(IDLE, {
  stomachI: {}, turkeyI: {}, sprout: {}, raffinose: {}, microbe: {}, gasb: {}, pancreas: {}, liver: {}, glucose: {}, insulin: {}, tank: {}, flame: {}, walker: { pre: t => ctx.translate(0, -Math.abs(Math.sin(t * 6)) * 6) },
  pudding: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05), post: t => glint(t, 64, 60) }, pie: { post: t => puff(t, 0, -40, 3, -1, 'rgba(255,255,255,0.4)', 9) }, mouse: {}, fish: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.06) },
  drumstick: { post: t => glint(t, 70, 40) }, sofa: {}, wine: { post: t => bubbles(t, 0, -14, 30, 24, 3) }, ecg: {}, calendar2: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.05) }, fridge: { post: t => glint(t, 56, 90, 3) },
  tray: {}, clock2: {}, salt: {}, bscale: { pre: t => ctx.translate(0, Math.abs(Math.sin(t * 2)) * -3) }, villi: {}, court: {}, plateI: {}, water3: {},
});

// ---------- new icons for the interacting-icons rework ----------
Object.assign(ICONS, {
  stomachI(t, o) { ctx.save(); ctx.scale(0.36, 0.36); stomachAt(t, 0, 40, 1, { fill: o.fill ?? (0.5 + 0.5 * Math.sin(t * 1.2)), food: o.food ?? 1, acid: o.acid, churn: o.churn ?? 1, ring: o.ring, reflux: o.reflux }); ctx.restore(); },
  bodyI(t, o) { ctx.save(); ctx.scale(0.3, 0.3); bodyMap(t, 0, 20, 1, { p: o.p }); ctx.restore(); },
  gutI(t, o) {   // small-intestine coils framed by the large intestine (colon), with a slow peristaltic wave
    const P = [[-36, 62], [-56, 46], [-58, -40], [-46, -58], [46, -58], [58, -40], [58, 40], [30, 60], [6, 66]];
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#c95a7c'; ctx.lineWidth = 32; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    ctx.strokeStyle = '#e07a92'; ctx.lineWidth = 24; ctx.stroke();
    for (let i = 0; i < 16; i++) { const u = i / 15, seg = Math.min(P.length - 2, Math.floor(u * (P.length - 1))), f = u * (P.length - 1) - seg, x = lerp(P[seg][0], P[seg + 1][0], f), y = lerp(P[seg][1], P[seg + 1][1], f), w = 1 + 0.25 * Math.max(0, Math.sin(u * 9 - t * 3)); circ(x, y, 9 * w, '#f29db0'); }
    ctx.strokeStyle = '#f4a7b8'; ctx.lineWidth = 11; ctx.beginPath(); for (let i = 0; i <= 90; i++) { const u = i / 90, a = u * 6.283 * 3.2 + Math.sin(t * 1.5) * 0.15; ctx.lineTo(Math.cos(a) * 30 * (1 - u * 0.35), -22 + u * 50 + Math.sin(a) * 12); } ctx.stroke();
    rr2(-46, -64, 40, 8, 4, 'rgba(255,255,255,0.45)');
  },
  potato(t) { ell(0, 8, 60, 44, '#c98a2c', 0.15); ell(-6, 0, 52, 38, '#f2c45a', 0.15); ell(20, -16, 18, 10, '#ffe08a', 0.3); for (const [x, y] of [[-24, 10], [6, 18], [30, 4]]) circ(x, y, 4, '#c7892c'); rr2(-38, -26, 30, 9, 4.5, 'rgba(255,255,255,0.45)'); },
  bread(t) { rr2(-68, -14, 136, 60, 26, '#b8763a'); ell(0, -14, 64, 38, '#e0a862'); for (const x of [-32, 0, 32]) { ctx.save(); ctx.translate(x, -22); ctx.rotate(0.5); rr2(-5, -16, 10, 32, 5, '#f6d8a0'); ctx.restore(); } rr2(-46, -40, 40, 9, 4.5, 'rgba(255,255,255,0.4)'); },
  stuffing(t) { for (let i = 0; i < 10; i++) circ(-44 + (i * 23) % 90, -16 - ((i * 17) % 32) + Math.sin(t * 2 + i) * 2, 14, ['#b8763a', '#d29350', '#9a5a2a'][i % 3]); circ(-12, -34, 6, SPROUT); circ(22, -28, 6, SPROUT2);
    ctx.fillStyle = '#e8eef6'; ctx.beginPath(); ctx.moveTo(-72, -8); ctx.lineTo(72, -8); ctx.quadraticCurveTo(64, 52, 0, 54); ctx.quadraticCurveTo(-64, 52, -72, -8); ctx.fill(); rr2(-64, -8, 128, 10, 5, '#c9d6ec'); rr2(-52, 8, 30, 8, 4, 'rgba(255,255,255,0.7)'); },
  pigB(t) { ctx.save(); ctx.rotate(-0.15); rr2(-74, -22, 148, 44, 22, '#c97a4a'); rr2(-46, -30, 92, 60, 22, '#f2d7a8'); rr2(-46, -6, 92, 8, 4, '#e8c48a'); rr2(-32, -24, 40, 8, 4, 'rgba(255,255,255,0.5)'); ctx.restore(); },
  jug(t, o) {   // measuring jug; o.level 0..1, o.txt on a pill
    const lv = clamp(o.level ?? 0.5), body = () => { ctx.beginPath(); ctx.moveTo(-50, -70); ctx.lineTo(50, -70); ctx.lineTo(42, 64); ctx.quadraticCurveTo(0, 72, -42, 64); ctx.closePath(); };
    ctx.strokeStyle = 'rgba(220,240,255,0.45)'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(52, -6, 30, -1.3, 1.3); ctx.stroke();
    ctx.fillStyle = 'rgba(220,240,255,0.35)'; body(); ctx.fill(); ctx.save(); body(); ctx.clip(); const y = 64 - 132 * lv; ctx.fillStyle = '#5aa9e6'; ctx.beginPath(); ctx.moveTo(-60, y + Math.sin(t * 3) * 3); ctx.quadraticCurveTo(0, y - Math.sin(t * 3) * 6, 60, y + Math.sin(t * 3 + 1) * 3); ctx.lineTo(60, 80); ctx.lineTo(-60, 80); ctx.fill(); ctx.restore();
    for (let i = 0; i < 4; i++) rr2(-44, -44 + i * 26, 16, 4, 2, '#f3f7fb'); rr2(-36, -62, 9, 96, 4.5, 'rgba(255,255,255,0.35)');
    if (o.txt) { font(24, 700); const w = ctx.measureText(o.txt).width; rr2(-w / 2 - 12, -10, w + 24, 36, 18, '#102348'); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.txt, 0, 9); }
  },
  glassW(t, o) { const lv = o.level ?? 0.6, sh = () => { ctx.beginPath(); ctx.moveTo(-40, -60); ctx.lineTo(40, -60); ctx.lineTo(32, 60); ctx.lineTo(-32, 60); ctx.closePath(); };
    ctx.fillStyle = 'rgba(220,240,255,0.35)'; sh(); ctx.fill(); ctx.save(); sh(); ctx.clip(); const y = 60 - 120 * lv; ctx.fillStyle = '#5aa9e6'; ctx.fillRect(-50, y + Math.sin(t * 3) * 3, 100, 140); ctx.restore(); rr2(-30, -50, 8, 92, 4, 'rgba(255,255,255,0.45)'); },
  dough(t) {   // a ball of dough kneaded by two mitten hands (the stomach kneading dinner)
    const q = Math.sin(t * 4); ctx.save(); ctx.translate(0, 26); ctx.scale(1 + 0.14 * q, 1 - 0.12 * q); ell(0, 0, 66, 36, '#ecd09a'); ell(-10, -8, 48, 22, '#fbe9c6'); rr2(-38, -24, 26, 8, 4, 'rgba(255,255,255,0.6)'); ctx.restore();
    for (const s of [-1, 1]) { const p = Math.max(0, s * q); ctx.save(); ctx.translate(s * 30, -4 + 10 * p); ctx.rotate(s * 0.55); rr2(-16, -78, 32, 56, 14, '#5b4fd6'); rr2(-16, -34, 32, 10, 5, '#4a3fc0'); ell(0, -10, 24, 26, SKIN); ell(s * -18, -14, 9, 12, SKIN, 0.4); ell(-6, -18, 8, 6, 'rgba(255,255,255,0.35)'); ctx.restore(); }
  },
  acidD(t) {   // a cheeky drop of stomach acid
    ctx.fillStyle = '#7fcf3f'; ctx.beginPath(); ctx.moveTo(0, -62); ctx.quadraticCurveTo(50, -2, 44, 22); ctx.arc(0, 22, 44, 0, Math.PI); ctx.quadraticCurveTo(-50, -2, 0, -62); ctx.fill();
    ell(4, 24, 32, 26, '#a6e86a'); eyes(t, 2, 14, 13, 5.5); ctx.save(); ctx.fillStyle = '#20232f'; ctx.translate(-13, 2); ctx.rotate(0.35); ctx.fillRect(-9, -2, 18, 4); ctx.restore(); ctx.save(); ctx.fillStyle = '#20232f'; ctx.translate(15, 2); ctx.rotate(-0.35); ctx.fillRect(-9, -2, 18, 4); ctx.restore();
    rr2(-6, 32, 16, 6, 3, '#3f7f2c'); ell(-18, -12, 6, 12, 'rgba(255,255,255,0.55)', 0.4); bubbles(t, 0, -30, 40, 50, 3, 'rgba(230,255,200,0.8)');
  },
  enzyme(t) { const m = 0.12 + 0.4 * Math.abs(Math.sin(t * 5)); ctx.fillStyle = '#9b6bd6'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 56, m, 6.283 - m); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#b48cff'; ctx.beginPath(); ctx.arc(-10, -12, 30, 0, 6.283); ctx.fill(); ctx.fillStyle = '#ffffff'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(40, s * 40 * Math.sin(m)); ctx.lineTo(26, s * 30 * Math.sin(m)); ctx.lineTo(34, s * 50 * Math.sin(m) * 0.6); ctx.fill(); }
    circ(6, -30, 7, '#20232f'); circ(8, -32, 2.5, '#fff'); rr2(-36, -40, 22, 8, 4, 'rgba(255,255,255,0.45)'); },
  valve(t, o) {   // a ring of muscle (sphincter) seen from above; o.open 0..1
    const op = clamp(o.open ?? 0), r0 = 8 + 30 * op + Math.sin(t * 3) * 2 * (1 - op); circ(0, 0, 62, '#b84a66'); circ(0, 0, 55, '#e07a92');
    for (let i = 0; i < 18; i++) { ctx.save(); ctx.rotate(i / 18 * 6.283 + t * 0.2); rr2(-3, r0 + 4, 6, 50 - r0, 3, '#c95a7c'); ctx.restore(); }
    circ(0, 0, r0, '#4a1222'); if (o.acid) circ(0, 0, r0 * 0.75 * (0.8 + 0.2 * Math.sin(t * 5)), 'rgba(155,225,93,0.85)'); rr2(-42, -46, 30, 9, 4.5, 'rgba(255,255,255,0.4)'); },
  fatcell(t, o) { const k = o.k ?? 1; ctx.save(); ctx.scale(k, k); circ(0, 0, 58, '#e8b23e'); circ(0, 0, 50, '#ffd36b'); circ(-6, -4, 34, '#fff0b8'); circ(30, 26, 10, '#e0a92a'); rr2(-30, -38, 26, 9, 4.5, 'rgba(255,255,255,0.7)'); ctx.restore(); },
  neuron(t, o) { const g = o.glow || 0;
    if (g) { const rg = ctx.createRadialGradient(0, 0, 10, 0, 0, 90); rg.addColorStop(0, `rgba(255,143,184,${0.6 * g})`); rg.addColorStop(1, 'rgba(255,143,184,0)'); ctx.fillStyle = rg; ctx.fillRect(-90, -90, 180, 180); }
    ctx.strokeStyle = '#f29db0'; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + 0.3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(Math.cos(a) * 34 + Math.sin(t * 2 + i) * 5, Math.sin(a) * 34, Math.cos(a + 0.3) * 60, Math.sin(a + 0.3) * 54); ctx.stroke(); }
    circ(0, 0, 28, '#f29db0'); circ(0, 0, 20, '#f7c0cc'); circ(4, 2, 9, '#c95a7c');
    if (g) for (let i = 0; i < 6; i++) { const p = (t * 0.8 + i / 6) % 1, a = i * 1.1; circ(Math.cos(a) * (24 + p * 50), Math.sin(a) * (24 + p * 46), 6 * (1 - p) + 2, `rgba(255,111,160,${g * (1 - p)})`); } },
  kidney(t) { ctx.fillStyle = '#a8343e'; ctx.beginPath(); ctx.moveTo(8, -60); ctx.bezierCurveTo(-64, -72, -68, 62, 4, 60); ctx.bezierCurveTo(38, 58, 42, 26, 22, 12); ctx.bezierCurveTo(12, 4, 12, -6, 22, -14); ctx.bezierCurveTo(42, -30, 42, -56, 8, -60); ctx.fill();
    ell(-18, -4, 22, 36, '#c8505a', 0.08); rr2(-38, -42, 14, 30, 7, 'rgba(255,255,255,0.35)'); ell(22, 0, 10, 14, '#f2c0a0'); rr2(22, 6, 10, 56, 5, '#f2c0a0'); },
  hormoneB(t, o) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.15); rr2(-58, -30, 116, 60, 30, o.col || '#8fd8e6'); rr2(-48, -22, 40, 10, 5, 'rgba(255,255,255,0.5)'); font(30, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.txt ?? 'ADH', 0, 3); ctx.restore(); },
  knife(t) { ctx.save(); ctx.rotate(-0.6); rr2(-14, 10, 28, 58, 10, '#5b3a2a'); circ(0, 26, 4, '#c9d6ec'); circ(0, 50, 4, '#c9d6ec'); ctx.fillStyle = '#dfe7f2'; ctx.beginPath(); ctx.moveTo(-14, 12); ctx.lineTo(-14, -84); ctx.quadraticCurveTo(12, -72, 16, -40); ctx.lineTo(14, 12); ctx.fill(); rr2(-9, -72, 6, 76, 3, '#ffffff'); ctx.restore(); },
  cellH(t) { circ(0, 0, 58, '#e98aa0'); circ(0, 0, 50, '#f7bccb'); circ(8, 6, 20, '#c95a7c'); circ(4, 2, 8, '#e07a92'); for (let i = 0; i < 5; i++) { const a = i * 1.3 + t * 0.3; circ(Math.cos(a) * 34, Math.sin(a) * 30, 5, '#e98aa0'); } rr2(-34, -42, 24, 8, 4, 'rgba(255,255,255,0.55)'); },
  balanceS(t, o) { const a = Math.sin(t * 1.3) * 0.07; rr2(-8, -40, 16, 100, 8, '#9aa6c4'); rr2(-44, 56, 88, 14, 7, '#5b6585'); ctx.save(); ctx.translate(0, -40); ctx.rotate(a); rr2(-92, -6, 184, 12, 6, '#c9d6ec');
    for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * 82, 0); ctx.rotate(-a); rr2(-2, 0, 4, 34, 2, '#9aa6c4'); ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 36, 36, 10, 0, 0, Math.PI); ctx.fill(); const ic = s < 0 ? o.l : o.r; if (ic) { ctx.save(); ctx.translate(0, 18); ctx.scale(0.36, 0.36); drawIcon(ic, t, {}); ctx.restore(); } ctx.restore(); }
    ctx.restore(); circ(0, -40, 10, '#ffd98a'); },
  aaB(t, o) { ctx.save(); ctx.rotate(t * 0.5); ctx.fillStyle = o.col || '#8fd8e6'; ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; ctx.lineTo(Math.cos(a) * 36, Math.sin(a) * 36); } ctx.closePath(); ctx.fill(); circ(0, 0, 12, 'rgba(255,255,255,0.55)'); ctx.restore(); },
  muscleL(t) {   // three layers of stomach muscle, fibres running three ways
    const cols = [['#d65a6e', '#f08a9c'], ['#c94a62', '#e57a90'], ['#b83c56', '#d86a82']];
    for (let L = 0; L < 3; L++) { const y = -42 + L * 42, sq = 1 + 0.07 * Math.sin(t * 3 + L * 1.6); ctx.save(); ctx.translate(0, y); ctx.scale(sq, 1); ctx.beginPath(); ctx.roundRect(-64, -17, 128, 34, 14); ctx.fillStyle = cols[L][0]; ctx.fill(); ctx.clip();
      ctx.strokeStyle = cols[L][1]; ctx.lineWidth = 5; const ang = [0, Math.PI / 2, 0.75][L]; ctx.rotate(ang); for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(-100, i * 11); ctx.lineTo(100, i * 11); ctx.stroke(); } ctx.restore(); }
    rr2(-50, -56, 30, 7, 3.5, 'rgba(255,255,255,0.45)'); },
  accordion(t) { const e = 0.5 + 0.5 * Math.sin(t * 1.8), w = 26 + 34 * e; for (let i = 0; i < 8; i++) { const x0 = -w + i * (2 * w / 8); rr2(x0, -40, 2 * w / 8 + 1, 80, 2, i % 2 ? '#f3f7fb' : '#c9d6ec'); }
    rr2(-w - 32, -54, 32, 108, 10, '#e2457a'); rr2(w, -54, 32, 108, 10, '#e2457a'); for (let i = 0; i < 4; i++) { circ(-w - 16, -32 + i * 22, 5, '#ffd98a'); circ(w + 16, -32 + i * 22, 5, '#ffd98a'); } },
  dipC(t) {   // alertness through the day: a curve with a dip after lunch, a dot riding along it
    rr2(-96, -66, 192, 132, 20, 'rgba(6,20,40,0.55)'); const f = u => -18 - 26 * Math.sin(u * Math.PI) + 40 * Math.exp(-((u - 0.55) ** 2) / 0.012);
    ctx.strokeStyle = '#8fd8e6'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; ctx.lineTo(-80 + u * 160, f(u)); } ctx.stroke();
    const u = (t * 0.25) % 1; circ(-80 + u * 160, f(u), 10, '#ffd98a'); circ(-80 + 0.55 * 160, 46, 6, '#ff8f4a'); rr2(-80, 50, 160, 4, 2, 'rgba(255,255,255,0.3)'); },
  liningW(t, o) {   // stomach lining: a row of surface cells under a mucus coat; o.worn 0..1 removes cells
    const w = clamp(o.worn || 0); rr2(-84, 34, 168, 28, 12, '#c95a7c'); ell(0, -48, 86, 16, 'rgba(200,255,210,0.55)');
    for (let i = 0; i < 6; i++) { const gone = ((i * 7 + 3) % 6) / 6 < w - 0.01, x = -70 + i * 28; if (gone) { circ(x, 20, 6, '#9b3352'); continue; } rr2(x - 13, -34, 26, 70, 11, i % 2 ? '#f29db0' : '#f7b6c4'); circ(x, 14, 6, '#c95a7c'); }
    rr2(-70, -30, 18, 8, 4, 'rgba(255,255,255,0.5)'); },
});
Object.assign(IDLE, {
  stomachI: {}, bodyI: {}, gutI: { pre: t => { const b = 1 + Math.sin(t * 2) * 0.025; ctx.scale(b, b); } },
  potato: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.06), post: t => puff(t, 0, -46, 2, -1, 'rgba(255,255,255,0.5)', 9) },
  bread: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05), post: t => glint(t, 66, 40) },
  stuffing: { post: t => puff(t, 0, -56, 2, -1, 'rgba(255,255,255,0.45)', 9) },
  pigB: { pre: t => ctx.rotate(Math.sin(t * 2.2) * 0.08), post: t => puff(t, 0, -40, 2, -1, 'rgba(255,255,255,0.45)', 8) },
  jug: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.04) }, glassW: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.05), post: t => bubbles(t, 0, 20, 40, 40, 3) },
  dough: {}, acidD: { pre: t => { ctx.translate(0, -Math.abs(Math.sin(t * 3)) * 6); } }, enzyme: { pre: t => ctx.rotate(Math.sin(t * 2) * 0.1) },
  valve: {}, fatcell: { pre: t => { const b = 1 + Math.sin(t * 2.2) * 0.03; ctx.scale(b, b); } }, neuron: { pre: t => ctx.rotate(Math.sin(t * 0.8) * 0.06) },
  kidney: { pre: t => { const b = 1 + Math.sin(t * 2) * 0.03; ctx.scale(b, b); } }, hormoneB: {}, knife: { pre: t => ctx.translate(0, -Math.abs(Math.sin(t * 4)) * 10), post: t => glint(t, 30, 80) },
  cellH: { pre: t => { const b = 1 + Math.sin(t * 2.2) * 0.03; ctx.scale(b, b); } }, balanceS: {}, aaB: {}, dipC: {}, muscleL: {}, accordion: {}, liningW: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.03) },
});

// ---------- cast helpers ----------
// half boxes (icon units) for this episode's own icons, so the overlap audit knows their real size
const HB = { turkeyI: [90, 72], sofa: [122, 80], pudding: [70, 70], pie: [80, 46], mouse: [100, 50], fish: [110, 40], drumstick: [90, 50], wine: [34, 54], ecg: [92, 52], calendar2: [56, 60], fridge: [104, 92], tray: [94, 70],
  clock2: [58, 58], bscale: [84, 30], villi: [92, 100], court: [112, 64], plateI: [88, 56], water3: [82, 40], liver: [110, 70], pancreas: [100, 50], glucose: [44, 44], insulin: [80, 34], tank: [50, 86], flame: [60, 64], walker: [40, 100],
  raffinose: [104, 40], microbe: [76, 40], gasb: [50, 76], sprout: [54, 64], pigB: [76, 34], jug: [76, 80], glassW: [42, 62], dough: [70, 70], acidD: [50, 64], enzyme: [58, 58], fatcell: [60, 60], neuron: [66, 62], kidney: [50, 66],
  hormoneB: [60, 32], knife: [60, 80], cellH: [60, 60], balanceS: [100, 76], aaB: [38, 38], muscleL: [66, 62], accordion: [92, 56], liningW: [86, 64], stomachI: [64, 100], bodyI: [56, 120], gutI: [76, 80], potato: [62, 48], bread: [70, 50],
  stuffing: [74, 56], salt: [50, 70], artery: [82, 56], napper: [90, 60], dipC: [96, 66], hexmol: [40, 40], couch: [92, 56] };
function B(ic, x, y, s, t0, o = {}) { const h = HB[ic]; return A(ic, x, y, s, t0, h ? { hw: h[0], hh: h[1], ...o } : o); }
function gasPuffs(t, x, y) { for (let i = 0; i < 4; i++) { const p = (t * 0.5 + i / 4) % 1; circ(x - p * 160, y - p * 120, 16 + p * 20, `rgba(200,255,200,${0.5 * (1 - p)})`); } }

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'pine'); snowfall(t, 40);
  beats(t, chainB([
    { at: 0, q: 'c1', under: tt => kidAt(tt, 300, 960, 1.4, { look: [1, -0.2] }),
      cast: [B('turkeyI', 1320, 600, 3.0, 'c1+0.2', { hit: ['c1:dinner+0.5'] }), B('stomachI', 760, 560, 2.2, 'c1:inside', { o: tt => ({ fill: 0.15 + 0.7 * RP('c1:dinner', 1.0)(tt) }), hit: ['c1:dinner+0.5'] }),
        B('drumstick', 1250, 380, 1.1, 'c1:after', { mv: [['c1:dinner', 1250, 380], ['c1:dinner+0.5', 800, 470, 90]], out: 'c1:dinner+0.5' })] },
    { at: 'c2', cast: [B('stomachI', 300, 560, 2.2, 'c2:stomach', { o: tt => ({ fill: 0.1 + 0.9 * RP('c2:balloons', 1.0)(tt) }), pulse: ['c2:balloons+0.6'] }),
        B('artery', 760, 620, 2.0, 'c2:blood'), B('fatcell', 880, 300, 0.8, 'c2:fat', { mv: [['c2:fat+0.8', 800, 600, 50]], out: 'c2:bacteria' }),
        B('gutI', 1200, 580, 2.0, 'c2:gut', { pulse: ['c2:party'] }), B('microbe', 1200, 580, 0.9, 'c2:bacteria', { orbit: { c: [1200, 560], r: 200, w: 2.2 } }), B('microbe', 1200, 580, 0.9, 'c2:throw', { orbit: { c: [1200, 560], r: 200, w: 2.2, ph: 3.1 } }),
        A('brainS', 1650, 470, 2.0, 'c2:brain', { shake: ['c2:begging', 1.0] }), B('sofa', 1650, 800, 1.1, 'c2:nap')],
      fx: [['stream', [700, 300], [740, 600], 'c2:sugar', 'c2>', { ic: 'glucose', s: 0.3, n: 6 }]] },
    { at: 'c3', cast: [B('bodyI', 960, 560, 2.7, 'c3', { o: tt => ({ p: RP('c3:first', E('c3') - T('c3:first'))(tt) }) }), B('plateI', 420, 540, 2.0, 'c3:meal'),
        B('drumstick', 420, 440, 1.0, 'c3:bite', { mv: [['c3:bite+0.8', 940, 290, 80]], out: 'c3:moment' }), A('hglass', 1500, 470, 1.8, 'c3:journey', { pulse: ['c3:longer'] })],
      lab: [['~9 METRES OF TUBES', 'c3:nine', 1500, 780, GOLD, 34]] },
    QB('c4q', [B('plateI', 760, 560, 2.4, 'c4q+0.2', { pulse: ['c4q:eat'] }), B('turkeyI', 1200, 540, 1.6, 'c4q:much')]),
    { at: 'c4', cast: [A('docV', 520, 470, 1.6, 'c4:group', { o: { title: 'U.S. INDUSTRY' }, mv: [['c4:survey', 520, 470], ['c4:survey+0.6', 300, 470, 40]] }),
        B('turkeyI', 1100, 500, 2.6, 'c4:dinner', { hit: ['c4:3'], mv: [['c4:survey', 1100, 500], ['c4:survey+0.6', 700, 500, 60]], o: { s: 1 } }),
        B('plateI', 1560, 300, 1.2, 'c4:holiday', { mv: [['c4:reach', 1560, 300], ['c4:3', 1150, 480, 60]], out: 'c4:3' }), B('pudding', 1600, 700, 1.1, 'c4:big', { mv: [['c4:reach', 1600, 700], ['c4:3+0.2', 1150, 540, 60]], out: 'c4:3+0.2' }),
        A('docV', 1240, 470, 1.5, 'c4:survey', { o: { title: 'UK SURVEY' } }), B('calendar2', 1620, 500, 2.3, 'c4:christmas', { o: { head: 'DEC', text: '25' }, hit: ['c4:6'] })],
      fx: [['stream', [1400, 140], [1600, 420], 'c4:whole', 'c4>', { ic: 'pudding', s: 0.35, n: 5 }]],
      lab: [['ESTIMATES VARY', 'c4:vary', 960, 120, WHITE, 32]], tag: [['≈ 3,000 CAL · ONE DINNER', 'c4:3', 760, 830, '#9b3352', 34], ['≈ 6,000 CAL · CHRISTMAS DAY', 'c4:6', 1430, 830, '#9b3352', 34]] },
    { at: 'c5', cast: [A('adult', 360, 560, 2.2, 'c5:adults'), B('plateI', 720, 560, 1.5, 'c5:day'),
        A('xtree', 1460, 230, 1.2, 'c5:christmas'), B('calendar2', 1180, 470, 1.5, 'c5:need', { o: { head: 'DAY', text: '1' }, mv: [['c5:one', 1180, 470], ['c5:one+0.4', 1460, 470, 60]], out: 'c5:one+0.4' }),
        B('calendar2', 1460, 470, 1.5, 'c5:three', { o: { head: 'DAY', text: '2' }, out: 'c5:one+0.4' }),
        B('calendar2', 1740, 470, 1.5, 'c5:days', { o: { head: 'DAY', text: '3' }, mv: [['c5:one', 1740, 470], ['c5:one+0.4', 1460, 470, 60]], out: 'c5:one+0.4' }),
        B('calendar2', 1460, 470, 2.3, 'c5:one+0.4', { o: { head: 'DEC', text: '25' }, hit: ['c5:one+0.6'] })],
      lab: [['1,600–3,000 CAL A DAY', 'c5:1', 540, 850, GOLD, 30]], tag: [['2–3 DAYS OF FOOD IN ONE', 'c5:days', 1460, 830, '#9b3352', 36]] },
  ], 's1'));
}
// ---------- 1 your stretchy stomach ----------
function sStomach(t) {
  worldBG(t, 'cream');
  beats(t, chainB([
    QB('s1', [B('stomachI', 760, 540, 2.8, 's1+0.2', { o: { fill: 0.1 } }), B('drumstick', 1180, 330, 1.3, 's1:food', { mv: [['s1:first', 860, 430, 60]], out: 's1:first+0.6' })]),
    { at: 's2', cast: [B('stomachI', 620, 560, 3.2, 's2:stomach', { o: { fill: 0 }, shake: ['s2:scrunched', 0.8], hit: ['s2:stomach+0.6'] }), B('potato', 640, 120, 1.1, 's2', { mv: [['s2:stomach+0.6', 600, 400]], out: 's2:stomach+0.7' }),
        B('jug', 1280, 520, 2.0, 's2:75', { o: { level: 0.07, txt: '75 ML' } }), B('glassW', 1660, 520, 1.6, 's2:sips', { o: { level: 0.7 } })],
      fx: [['stream', 3, [1300, 470], 's2:sips', 's2:folds', { col: '#5aa9e6', n: 6, arc: 80 }]],
      lab: [['EMPTY: ~75 ML', 's2:75', 1280, 800, WHITE, 32], ['DEEP FOLDS', 's2:folds', 620, 965, WHITE, 30]] },
    { at: 's3', cast: [B('stomachI', 620, 560, 3.2, 's3', { o: tt => ({ fill: tt < T('s3:limit') ? 0.6 * RP('s3:eat', 2.5)(tt) : 0.6 + 0.4 * RP('s3:limit', 1.5)(tt) }), pulse: ['s3:four'] }),
        B('accordion', 1300, 290, 1.6, 's3:flatten'), B('jug', 1300, 650, 2.0, 's3:normal', { o: tt => ({ level: tt < T('s3:limit') ? 0.25 : 0.25 + 0.75 * RP('s3:limit', 1.5)(tt), txt: tt < T('s3:four') ? '~1 L' : '~4 L' }), pulse: ['s3:liter', 's3:four'] }),
        B('plateI', 1690, 300, 1.4, 's3:eat')],
      fx: [['stream', 3, 0, 's3:eat', 's3>', { ic: 'potato', s: 0.35, n: 6, arc: 120 }]], lab: [['FOLDS FLATTEN OUT', 's3:flatten', 620, 965, WHITE, 30]] },
    { at: 's3b', cast: [B('stomachI', 560, 560, 3.2, 's3b', { o: { fill: 0.8 }, pulse: ['s3b:twist', 's3b:squeeze'] }), B('muscleL', 1200, 330, 1.9, 's3b:three'), B('dough', 1560, 650, 2.0, 's3b:hands')],
      fx: [['stream', 1, 0, 's3b:running', 's3b>', { col: '#f08a9c', n: 6 }]], tag: [['3 LAYERS OF MUSCLE', 's3b:three', 1150, 560, '#c95a7c', 34]], lab: [['LIKE HANDS KNEADING DOUGH', 's3b:hands', 1500, 880, WHITE, 26]] },
    QB('s4q', [B('stomachI', 700, 560, 2.6, 's4q+0.2', { o: { fill: 0.9 } }), A('brainS', 1150, 330, 1.4, 's4q:full', { shake: ['s4q:sooner', 0.6] })]),
    { at: 's5', cast: [B('stomachI', 380, 620, 2.6, 's5', { o: { fill: 0.9 }, pulse: ['s5:stretch', 's5:report'] }), A('brainS', 1480, 360, 2.3, 's5:brain'),
        B('hormoneB', 560, 820, 0.9, 's5:hormones', { o: { txt: '', col: '#ffb35c' }, mv: [['s5:join', 1340, 450, 120]], out: 's5:take' }), B('hormoneB', 520, 900, 0.9, 's5:gut', { o: { txt: '', col: '#8fd8e6' }, mv: [['s5:in#1', 1380, 500, 140]], out: 's5:take' }),
        B('clock2', 980, 760, 1.7, 's5:20', { pulse: ['s5:register'] })],
      fx: [['stream', 0, 1, 's5:vagus', 's5>', { col: '#ffd98a', n: 12, arc: 80 }]], lab: [['VAGUS NERVE', 's5:vagus', 930, 290, WHITE, 30]], tag: [['~20 MINUTES TO FEEL FULL', 's5:20', 980, 965, '#c95a7c', 38]] },
    { at: 's6', cast: [B('stomachI', 1360, 560, 3.0, 's6', { o: tt => ({ fill: 0.5 + 0.5 * RP('s6:pigs', 2.0)(tt) }), hit: ['s6:blankets'] }), B('clock2', 330, 300, 1.5, 's6+0.1'),
        ...[0, 1, 2, 3, 4, 5].map(i => B('pigB', 380 + (i % 3) * 230, 560 + Math.floor(i / 3) * 220, 1.3, 's6:pigs+' + (i * 0.12).toFixed(2), { mv: [['s6:blankets+' + (i * 0.15).toFixed(2), 380 + (i % 3) * 230, 560 + Math.floor(i / 3) * 220], ['s6:blankets+' + (0.5 + i * 0.15).toFixed(2), 1320, 520, 80]], out: 's6:blankets+' + (0.5 + i * 0.15).toFixed(2) }))],
      lab: [['PIGS IN BLANKETS', 's6:pigs', 960, 965, WHITE, 34]] },
  ], 'a1'));
}
// ---------- 2 acid and heartburn ----------
function sAcid(t) {
  worldBG(t, 'plum');
  beats(t, chainB([
    QB('a1', [B('stomachI', 760, 560, 2.6, 'a1+0.2', { o: { fill: 0.8, acid: 1 } }), B('potato', 1180, 300, 1.3, 'a1:food', { mv: [['a1:there', 840, 460, 60]], out: 'a1:there+0.5' })]),
    { at: 'a2', cast: [B('stomachI', 600, 560, 3.2, 'a2', { o: { fill: 0.75, acid: 1 }, pulse: ['a2:squeezes', 'a2:churns'] }), B('acidD', 1220, 330, 1.5, 'a2:acid', { mv: [['a2:mucus', 1220, 330], ['a2:mucus+0.4', 1470, 470, 80]] }),
        B('enzyme', 1220, 740, 1.4, 'a2:enzymes'), B('potato', 1460, 780, 1.0, 'a2:enzymes+0.3', { mv: [['a2:strong', 1300, 750]], erase: 'a2:strong+0.2' }),
        A('shieldC', 1640, 500, 1.8, 'a2:protect', { o: { txt: 'MUCUS' }, hit: ['a2:mucus+0.4'] })],
      tag: [['ACID + ENZYMES', 'a2:enzymes', 600, 965, '#3f7f2c', 36]], lab: [['A THICK LAYER OF MUCUS', 'a2:mucus', 1560, 810, WHITE, 28]] },
    { at: 'a2b', cast: [B('liningW', 760, 520, 2.8, 'a2b', { o: tt => ({ worn: tt < T('a2b:rebuilding') ? 0.7 * RP('a2b:wears', 1.2)(tt) : 0.7 * (1 - RP('a2b:rebuilding', 1.4)(tt)) }), shake: ['a2b:wears', 0.8], pulse: ['a2b:replaced'] }),
        B('acidD', 300, 330, 1.3, 'a2b:acid', { mv: [['a2b:wears+0.3', 610, 420, 60]], hit: ['a2b:wears+0.3'], out: 'a2b:rebuilding' }), B('acidD', 300, 720, 1.3, 'a2b:down', { mv: [['a2b:lining+0.3', 640, 600, 60]], out: 'a2b:rebuilding' }),
        B('cellH', 1280, 300, 1.1, 'a2b:rebuilding', { mv: [['a2b:surface', 880, 450, 80]], out: 'a2b:cells' }), B('cellH', 1280, 760, 1.1, 'a2b:surface', { mv: [['a2b:replaced', 860, 560, 80]], out: 'a2b:every' }),
        A('hglass', 1560, 520, 1.9, 'a2b:replaced')],
      lab: [['RENEWED EVERY FEW DAYS', 'a2b:replaced', 1200, 965, GOLD, 30]] },
    { at: 'a3', cast: [B('stomachI', 520, 620, 3.0, 'a3', { o: tt => ({ fill: 0.85, acid: 1, ring: tt > T('a3:ring') }) }), A('valve', 1300, 390, 1.9, 'a3:ring', { o: tt => ({ open: 0.85 * RP('a3:relax', 0.8)(tt), acid: 1 }), pulse: ['a3:keeps'], shake: ['a3:relax', 0.6] }),
        B('plateI', 1050, 790, 1.3, 'a3:huge'), B('drumstick', 1350, 790, 1.3, 'a3:fatty'), B('wine', 1660, 790, 1.6, 'a3:alcohol')],
      fx: [['zap', 2, 1, 'a3:meal', 0.5, '#ffd98a'], ['zap', 3, 1, 'a3:food', 0.5, '#ffd98a'], ['zap', 4, 1, 'a3:can', 0.5, '#ffd98a']], lab: [['A RING OF MUSCLE', 'a3:ring', 1300, 190, WHITE, 30]] },
    QB('a4q', [B('stomachI', 760, 600, 2.6, 'a4q+0.2', { o: { fill: 0.85, reflux: 0.7 } }), B('flame', 1150, 330, 1.3, 'a4q:heartburn')]),
    { at: 'a5', cast: [B('stomachI', 520, 620, 3.0, 'a5', { o: tt => ({ fill: 0.9, reflux: RP('a5:leaks', 1.5)(tt) }) }), B('flame', 0, 0, 1.1, 'a5:burns', { follow: { i: 0, dx: -138, dy: -340 } }),
        B('sofa', 1400, 730, 1.6, 'a5:flopping'), A('adult', 1400, 320, 1.7, 'a5:flopping', { mv: [['a5:sofa', 1400, 610, 30]] })],
      fx: [['stream', [520, 560], [390, 330], 'a5:flow', 'a5>', { col: '#9be15d', n: 6, arc: 20 }]],
      tag: [['HEARTBURN', 'a5:burns', 900, 200, '#e2457a', 44]], lab: [['LYING DOWN MAKES IT WORSE', 'a5:easier', 1400, 965, GOLD, 30]] },
    { at: 'a5b', cast: [A('adult', 420, 560, 2.3, 'a5b:upright'), A('check', 420, 250, 0.9, 'a5b:upright+0.3'), A('hglass', 960, 520, 2.0, 'a5b:two'),
        A('xtree', 1500, 540, 1.6, 'a5b:christmas', { morph: ['a5b:lie', 'sofa'], hw: 122, hh: 80 }), A('cross', 1500, 250, 0.9, 'a5b:down')],
      lab: [['2–3 HOURS', 'a5b:two', 960, 800, GOLD, 34], ['STAY UPRIGHT', 'a5b:upright', 420, 870, WHITE, 30]] },
  ], 'w1'));
}
// ---------- 3 the sugar wave ----------
function sSugar(t) {
  worldBG(t, 'plum');
  beats(t, chainB([
    QB('w1', [B('artery', 760, 560, 2.6, 'w1+0.2'), B('glucose', 1180, 330, 1.3, 'w1:blood', { mv: [['w1>', 860, 540, 60]] })]),
    { at: 'w2', cast: [B('artery', 960, 700, 3.0, 'w2:sugar'),
        ...[['potato', 330, 'w2:potatoes'], ['stuffing', 650, 'w2:stuffing'], ['bread', 970, 'w2:bread'], ['pudding', 1290, 'w2:dessert']].map(([ic, x, w], i) => B(ic, x, 280, 1.5, w,
          { morph: ['w2:broken+' + (i * 0.12).toFixed(2), 'glucose'], mv: [['w2:pours+' + (i * 0.15).toFixed(2), x, 280], ['w2:pours+' + (0.7 + i * 0.15).toFixed(2), 820 + i * 90, 680, 60]], out: 'w2:pancreas' })),
        B('pancreas', 1620, 760, 1.5, 'w2:pancreas'), B('insulin', 1620, 760, 1.0, 'w2:insulin', { mv: [['w2:insulin+0.8', 1180, 640, 60]] }), B('insulin', 1620, 760, 1.0, 'w2:insulin+0.3', { mv: [['w2:insulin+1.1', 1080, 770, 60]] }),
        B('cellH', 330, 720, 1.6, 'w2:cells')],
      fx: [['stream', 0, 8, 'w2:soak', 'w2>', { ic: 'glucose', s: 0.3, n: 5 }]], tag: [['INSULIN', 'w2:insulin', 1620, 965, '#127b84', 38]] },
    { at: 'w3', cast: [B('liver', 380, 340, 1.8, 'w3:liver'), A('muscle', 380, 700, 1.8, 'w3:muscles'),
        B('tank', 820, 340, 1.4, 'w3:glycogen', { o: tt => ({ level: 0.2 + 0.7 * RP('w3:glycogen', 1.5)(tt) }) }), B('tank', 820, 720, 1.4, 'w3:glycogen+0.2', { o: tt => ({ level: 0.2 + 0.7 * RP('w3:glycogen', 1.5)(tt) }) }),
        B('glucose', 1280, 520, 1.6, 'w3', { pulse: ['w3:extra'] }), B('fatcell', 1650, 520, 1.8, 'w3:fit', { o: tt => ({ k: 0.6 + 0.4 * RP('w3:fat', 1.0)(tt) }) })],
      fx: [['stream', 4, 2, 'w3:pack', 'w3:stored', { ic: 'glucose', s: 0.3, n: 5 }], ['stream', 4, 3, 'w3:pack', 'w3:stored', { ic: 'glucose', s: 0.3, n: 5 }], ['stream', 4, 5, 'w3:fit', 'w3>', { ic: 'glucose', s: 0.3, n: 5 }]],
      tag: [['GLYCOGEN = STORED SUGAR', 'w3:glycogen', 820, 965, '#9b3352', 34]], lab: [['THE REST → FAT', 'w3:fat', 1650, 790, GOLD, 30]] },
    { at: 'w3b', cast: [B('liver', 380, 330, 1.8, 'w3b:liver'), B('tank', 800, 330, 1.3, 'w3b:store', { o: tt => ({ level: 0.4 + 0.55 * RP('w3b:topped', 1.0)(tt) }) }),
        A('muscle', 380, 740, 1.8, 'w3b:muscles'), B('tank', 800, 720, 1.8, 'w3b:several', { o: tt => ({ level: 0.4 + 0.55 * RP('w3b:topped', 1.0)(tt) }) }), B('turkeyI', 1620, 520, 1.8, 'w3b:feast')],
      fx: [['stream', 4, 1, 'w3b:feast', 'w3b>', { ic: 'glucose', s: 0.28, n: 5 }], ['stream', 4, 3, 'w3b:feast', 'w3b>', { ic: 'glucose', s: 0.28, n: 5 }]],
      lab: [['~100 G', 'w3b:100', 1060, 330, GOLD, 34], ['SEVERAL HUNDRED G', 'w3b:several', 1150, 720, GOLD, 32]] },
    { at: 'w3c', cast: [B('gutI', 420, 560, 2.4, 'w3c', { shake: ['w3c:work', 0.8] }), B('plateI', 760, 250, 1.2, 'w3c:digesting', { mv: [['w3c:work', 760, 250], ['w3c:work+0.6', 450, 520, 60]], out: 'w3c:work+0.6' }),
        B('flame', 900, 560, 1.9, 'w3c:burned'), A('thermoC', 1650, 620, 1.7, 'w3c:warm', { o: tt => ({ level: 0.3 + 0.6 * RP('w3c:warm', 1)(tt) }) })],
      fx: [['stream', 0, 2, 'w3c:burned', 'w3c>', { col: '#ff9a3c', n: 8 }]], num: [['w3c:tenth', 1350, 360, '~10%', 'OF THE CALORIES']], lab: [['BURNED JUST DIGESTING', 'w3c:processing', 1250, 800, WHITE, 30]] },
    QB('w4q', [A('chart', 760, 560, 2.2, 'w4q+0.2', { o: { v: [0.2, 0.5, 0.95, 0.4], hi: 2 } }), B('glucose', 1150, 400, 1.2, 'w4q:spike', { pulse: ['w4q:spike+0.3'] })]),
    { at: 'w5', under: tt => graph(tt, 260, 260, 760, 460, T('w5:walking') - 0.4, [[u => Math.exp(-((u - 0.35) ** 2) / 0.02) * 0.9 + 0.05, '#e2457a'], [u => Math.exp(-((u - 0.4) ** 2) / 0.03) * 0.55 + 0.05, '#7ff3a0']]),
      cast: [A('docV', 1250, 330, 1.4, 'w5:review', { o: { title: '2022 REVIEW' } }), B('walker', 1600, 560, 2.2, 'w5:walking', { mv: [['w5:meal', 1700, 560], ['w5:sugar', 1500, 560], ['w5>', 1650, 560]] }), B('couch', 1250, 790, 1.5, 'w5:sitting')],
      lab: [['SITTING', 'w5:sitting', 640, 210, '#ff9fb4', 28], ['2–5 MIN WALK', 'w5:two', 640, 790, '#7ff3a0', 30]] },
    { at: 'w6', cast: [B('couch', 330, 600, 1.6, 'w6'), A('adult', 760, 560, 2.1, 'w6:standing'), B('walker', 1200, 560, 2.2, 'w6:walking', { mv: [['w6:more', 1300, 560]] }),
        A('chart', 1650, 540, 1.8, 'w6:helped', { o: tt => ({ v: [0.9, 0.9 - 0.25 * RP('w6:little', 0.8)(tt), 0.9 - 0.5 * RP('w6:more', 0.8)(tt)], hi: 2 }) })],
      lab: [['HELPS A LITTLE', 'w6:little', 760, 830, WHITE, 28], ['HELPS MORE', 'w6:more', 1250, 830, GOLD, 30]] },
  ], 'd1'));
}
// ---------- 4 room for dessert ----------
function sDessert(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('d1', [B('pudding', 760, 560, 2.4, 'd1+0.2'), B('stomachI', 1150, 560, 1.6, 'd1:room', { o: { fill: 1 } })]),
    { at: 'd2', cast: [B('turkeyI', 380, 480, 2.2, 'd2:enough', { grey: 'd2:stops' }), A('cross', 380, 800, 1.0, 'd2:good'), A('adult', 960, 560, 2.2, 'd2:variety'),
        B('pudding', 1450, 420, 2.0, 'd2:new', { glow: 'rgba(255,217,138,0.5)', pulse: ['d2:exciting'] }), B('pie', 1650, 760, 1.6, 'd2:looks')],
      fx: [['stream', 2, 3, 'd2:new', 'd2:exciting', { col: '#ffd98a', n: 5 }]], tag: [['SENSORY-SPECIFIC SATIETY', 'd2:sensory', 960, 965, '#5b4fd6', 36]] },
    { at: 'd3', cast: [A('docV', 300, 330, 1.4, 'd3:2025', { o: { title: '2025 · GERMANY' } }), B('mouse', 380, 740, 1.8, 'd3:mice', { mv: [['d3:craving', 380, 740], ['d3:sweets', 1150, 760, 60]] }),
        B('neuron', 960, 430, 2.4, 'd3:cells', { o: tt => ({ glow: RP('d3:release', 0.8)(tt) }) }), B('pudding', 1600, 480, 2.0, 'd3:sugar', { pulse: ['d3:sweets'] })],
      fx: [['stream', 2, 1, 'd3:opioid', 'd3>', { col: '#ff6fa0', n: 8 }], ['zap', 3, 2, 'd3:shows', 0.6, '#ffd98a']], tag: [['A NATURAL OPIOID', 'd3:opioid', 960, 965, '#c95a7c', 36]] },
    { at: 'd4', cast: [A('brainS', 760, 520, 2.8, 'd4:brain', { hit: ['d4:dessert+0.1'], pulse: ['d4:brain#1'] }), A('magnifier', 300, 330, 1.5, 'd4:scans', { mv: [['d4:region', 600, 420, 60]] }),
        B('pudding', 1350, 260, 1.4, 'd4:sugar', { mv: [['d4:dessert', 840, 470, 80]], out: 'd4:stomach' }), B('stomachI', 1650, 560, 1.4, 'd4:stomach', { o: { fill: 0.7 }, mv: [['d4:built+0.3', 800, 520, 60]], out: 'd4:brain#1' }),
        A('adult', 1250, 640, 1.7, 'd4:people')],
      tag: [['A "DESSERT STOMACH" IN THE BRAIN', 'd4:dessert', 960, 965, '#5b4fd6', 34]], lab: [['HINTS IN PEOPLE TOO', 'd4:people', 1250, 860, GOLD, 28]] },
  ], 'z1'));
}
// ---------- 5 the food coma ----------
function sComa(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('z1', [B('turkeyI', 760, 560, 2.4, 'z1+0.2'), B('napper', 1180, 560, 1.6, 'z1:sleepy')]),
    { at: 'z2', cast: [B('turkeyI', 380, 520, 2.2, 'z2:turkey', { shake: ['z2:myth', 0.6] }), B('hexmol', 380, 520, 1.1, 'z2:tryptophan', { mv: [['z2:brain', 380, 520], ['z2:uses', 840, 420, 80]], out: 'z2:but' }),
        A('brainS', 960, 380, 1.8, 'z2:brain', { out: 'z2:but', pulse: ['z2:sleep'] }), A('moon2', 960, 720, 1.3, 'z2:sleep', { out: 'z2:but' }),
        A('ham', 1250, 440, 1.7, 'z2:meats'), B('hexmol', 0, 0, 0.8, 'z2:contain#1', { follow: { i: 4, dx: 130, dy: -110 } }),
        B('fish', 1520, 720, 1.6, 'z2:salmon', { shake: ['z2:blames', 0.8] }), B('hexmol', 0, 0, 0.8, 'z2:does#1', { follow: { i: 6, dx: -150, dy: -110 } })],
      tag: [['MYTH', 'z2:myth', 380, 200, '#e2457a', 44]], lab: [['ABOUT AS MUCH', 'z2:much', 1400, 965, GOLD, 30]] },
    { at: 'z3', cast: [A('brainS', 1550, 420, 2.4, 'z3'), B('plateI', 330, 300, 1.5, 'z3:meal'),
        B('hexmol', 330, 720, 1.3, 'z3:tryptophan', { mv: [['z3:compete', 330, 720], ['z3:acids', 900, 620, 40], ['z3:never', 560, 720, 40]], shake: ['z3:never', 0.8] }),
        ...['#8fd8e6', '#ffb35c', '#7ff3a0', '#ff8fb8'].map((col, i) => B('aaB', 600 + (i % 2) * 220, 780 - Math.floor(i / 2) * 180, 1.2, 'z3:other+' + (i * 0.12).toFixed(2), { o: { col }, mv: [['z3:get+' + (i * 0.15).toFixed(2), 600 + (i % 2) * 220, 780 - Math.floor(i / 2) * 180], ['z3:brain+' + (i * 0.15).toFixed(2), 1450 + (i % 2) * 60, 400 + i * 20, 60]] }))],
      fx: [['burst', 2, 'z3:never', '#b48cff']], tag: [['MOST TRYPTOPHAN NEVER GETS THERE', 'z3:never', 960, 965, '#5b4fd6', 34]], lab: [['OTHER AMINO ACIDS GET IN FIRST', 'z3:other', 1100, 150, WHITE, 28]] },
    QB('z4q', [B('turkeyI', 1200, 520, 1.6, 'z4q:nap')], { under: tt => kidAt(tt, 760, 960, 1.7, { lid: 0.55, look: [0, 0.2] }) }),
    { at: 'z5', cast: [B('stomachI', 360, 560, 2.6, 'z5:meal', { o: tt => ({ fill: 0.6 + 0.4 * RP('z5:enormous', 0.8)(tt) }), pulse: ['z5:enormous'] }), B('napper', 960, 600, 2.0, 'z5:rest'),
        A('battery', 960, 300, 1.2, 'z5:switches', { o: tt => ({ level: 0.9 - 0.6 * RP('z5:digest', 1.5)(tt) }) }), A('wineG', 1550, 420, 1.6, 'z5:alcohol'), A('moon2', 1550, 760, 1.2, 'z5:drowsiness')],
      fx: [['zap', 3, 1, 'z5:adds', 0.6, '#b48cff'], ['stream', 0, 1, 'z5:rest', 'z5:mode+0.8', { col: '#8fd8e6', n: 6 }]], tag: [['REST-AND-DIGEST MODE', 'z5:rest', 960, 965, '#5b4fd6', 36]] },
    { at: 'z6', cast: [A('family', 380, 560, 2.2, 'z6:families'), B('turkeyI', 380, 860, 1.2, 'z6:eat'), A('clock', 900, 480, 2.0, 'z6:afternoon', { o: { h: 3, m: 0 } }), B('dipC', 1450, 480, 2.4, 'z6:clock', { pulse: ['z6:dips'] })],
      fx: [['stream', 2, 3, 'z6:body', 'z6>', { col: '#ffd98a', n: 6 }]], lab: [['AFTERNOON DIP', 'z6:dips', 1450, 780, GOLD, 32]] },
  ], 'g1'));
}
// ---------- 6 sprouts and gas ----------
function sGas(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('g1', [B('sprout', 760, 560, 2.6, 'g1+0.2'), B('gasb', 1150, 420, 1.4, 'g1:gassy', { o: { txt: 'H₂' } })]),
    { at: 'g2', cast: [B('sprout', 330, 520, 2.4, 'g2:brussels', { pulse: ['g2:raffinose'] }), B('raffinose', 330, 520, 1.6, 'g2:raffinose', { mv: [['g2:raffinose+0.6', 800, 360, 60], ['g2:travels', 800, 360], ['g2:intestine', 1460, 540, 80]], pulse: ['g2:untouched'] }),
        B('enzyme', 800, 720, 1.4, 'g2:enzyme', { grey: 'g2:break' }), A('cross', 920, 620, 0.8, 'g2:break'), B('gutI', 1500, 560, 2.4, 'g2:large')],
      tag: [['RAFFINOSE', 'g2:raffinose', 800, 180, '#0b4f5c', 40]], lab: [['UNTOUCHED', 'g2:untouched', 1500, 870, GOLD, 30]] },
    { at: 'g3', cast: [B('gutI', 480, 560, 2.8, 'g3', { pulse: ['g3:feast'] }), B('raffinose', 480, 560, 1.0, 'g3', { erase: 'g3:feast+0.6' }),
        ...[0, 1, 2].map(i => B('microbe', 480, 560, 1.0, 'g3:trillions+' + (i * 0.15).toFixed(2), { orbit: { c: [480, 560], r: 260, w: 1.4, ph: i * 2.1 } })),
        ...[['H₂', 'rgba(200,240,255,0.6)', 'g3:hydrogen'], ['CO₂', 'rgba(220,220,220,0.6)', 'g3:carbon'], ['CH₄', 'rgba(200,255,200,0.6)', 'g3:methane']].map(([txt, col, w], i) => B('gasb', 700, 520, 1.7, w, { o: { txt, col }, mv: [[w + '+0.8', 1050 + i * 330, 460, 60]] }))],
      lab: [['THEIR WASTE IS GAS', 'g3:waste', 1380, 800, GOLD, 32]] },
    { at: 'g3b', cast: [B('microbe', 400, 560, 2.0, 'g3b:gut', { mv: [['g3b:feast', 400, 560], ['g3b:feast+0.5', 1330, 560, 80]] }), B('balanceS', 960, 620, 2.4, 'g3b:many', { o: { l: 'microbe', r: 'cellH' } }),
        B('cellH', 1520, 560, 1.8, 'g3b:cells', { out: 'g3b:christmas' }), B('turkeyI', 1540, 560, 1.8, 'g3b:christmas', { hit: ['g3b:feast+0.5'] })],
      num: [['g3b:38', 960, 200, '~38 TRILLION', 'GUT BACTERIA ≈ YOUR OWN CELLS']] },
    { at: 'g4', under: tt => { kidAt(tt, 600, 960, 1.6, { look: [0.5, 0], squash: Math.max(0, Math.sin(tt * 3)) ** 8 * 0.4 }); gasPuffs(tt, 460, 880); },
      cast: [B('calendar2', 1150, 420, 1.8, 'g4:dozen', { o: { head: 'A DAY', text: '12+' } }), B('gutI', 1600, 560, 2.0, 'g4:gut', { shake: ['g4:works', 1.2] }), B('turkeyI', 1150, 760, 1.4, 'g4:christmas')],
      fx: [['stream', 1, [1600, 180], 'g4:gut', 'g4>', { col: 'rgba(200,255,200,0.6)', n: 6, r: 14, arc: 20 }]], lab: [['OVERTIME', 'g4:over', 1600, 860, GOLD, 32]] },
  ], 'k1'));
}
// ---------- 7 the scale the next morning ----------
function sScale(t) {
  worldBG(t, 'gold');
  beats(t, chainB([
    QB('k1', [B('bscale', 760, 620, 2.6, 'k1+0.2', { o: { text: '+ ? KG' } }), A('sunC', 1150, 330, 1.3, 'k1:morning')]),
    { at: 'k2', cast: [B('bscale', 360, 760, 2.0, 'k2', { o: { text: '+ ? KG' } }), B('water3', 360, 420, 1.6, 'k2:water'), B('salt', 820, 330, 1.6, 'k2:salty'), A('drop', 820, 680, 1.5, 'k2:hold', { pulse: ['k2:extra'] }),
        B('tank', 1300, 540, 1.7, 'k2:glycogen', { o: { level: 0.9 } }),
        ...[0, 1, 2].map(i => A('drop', 1720, 330 + i * 210, 0.9, 'k2:three+' + (i * 0.15).toFixed(2), { mv: [['k2:water#2+' + (i * 0.1).toFixed(2), 1450, 420 + i * 120, 40]] }))],
      fx: [['stream', 2, 3, 'k2:salty', 'k2:extra+0.5', { col: '#ffffff', n: 8, r: 5, arc: 10 }]],
      tag: [['MOSTLY WATER', 'k2:mostly', 360, 200, '#127b84', 40]], lab: [['1 G GLYCOGEN + ~3 G WATER', 'k2:three', 1300, 965, WHITE, 28]] },
    { at: 'k3', cast: [B('bodyI', 960, 560, 2.6, 'k3', { o: { p: 0.62 } }), B('turkeyI', 420, 350, 1.4, 'k3:meal', { mv: [['k3:inside', 930, 560, 80]], out: 'k3:you' }), B('bscale', 420, 760, 1.8, 'k3:part', { o: { text: '+ ? KG' } }),
        A('magnifier', 1400, 330, 1.6, 'k3:literally', { mv: [['k3:still', 1100, 600, 60]] })],
      lab: [['STILL INSIDE YOU', 'k3:still', 960, 965, WHITE, 32]] },
    QB('k4q', [B('bscale', 760, 620, 2.4, 'k4q+0.2', { o: { text: '+ ? KG' } }), B('fatcell', 1150, 380, 1.4, 'k4q:fat')]),
    { at: 'k5', cast: [A('docV', 300, 420, 1.4, 'k5:study', { o: { title: 'U.S. STUDY' } }), A('adult', 680, 500, 1.9, 'k5:adults'), B('bscale', 680, 820, 1.8, 'k5:weighed', { o: tt => ({ text: tt < T('k5:gained') ? '…' : '+0.37 KG' }), pulse: ['k5:gained'] }),
        A('xtree', 1100, 440, 1.3, 'k5:holidays')],
      tag: [['< 0.5 KG ≈ 1 POUND', 'k5:half', 1500, 450, '#9b3352', 44]], lab: [['AVERAGE GAIN', 'k5:average', 1500, 560, WHITE, 30]] },
    { at: 'k6', cast: [A('adult', 420, 400, 1.9, 'k6:weighed'), B('bscale', 420, 690, 2.4, 'k6', { o: { text: '+0.37 KG' } }), B('calendar2', 960, 460, 1.9, 'k6:months', { o: { head: 'MONTHS', text: 'LATER' } }),
        B('fatcell', 1500, 520, 1.9, 'k6:pound', { pulse: ['k6:still'] })],
      tag: [['MOST OF IT STAYED', 'k6:still', 960, 965, '#9b3352', 40]] },
  ], 'h1'));
}
// ---------- 8 wine and your heart ----------
function sHeart(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('h1', [A('wineG', 760, 560, 2.2, 'h1+0.2'), B('liver', 1170, 560, 1.4, 'h1:wine')]),
    { at: 'h2', cast: [B('liver', 420, 520, 2.2, 'h2:liver', { pulse: ['h2:hour'] }), B('clock2', 960, 300, 1.6, 'h2:hour'), A('wineG', 960, 700, 1.4, 'h2:drink', { mv: [['h2:hour', 640, 560, 60]], out: 'h2:hour+0.4' }),
        ...[0, 1, 2].map(i => A('wineG', 1150 + i * 230, 320, 1.1, 'h2:faster+' + (i * 0.12).toFixed(2), { mv: [['h2:piles+' + (i * 0.2).toFixed(2), 1150 + i * 230, 320], ['h2:up+' + (i * 0.2).toFixed(2), 1500, 600, 40]], out: 'h2:up+' + (i * 0.2).toFixed(2) })),
        B('artery', 1500, 620, 2.2, 'h2:alcohol')],
      fx: [['stream', [1500, 330], [1500, 600], 'h2:piles', 'h2>', { col: '#b0203a', n: 8 }]],
      tag: [['~1 STANDARD DRINK PER HOUR', 'h2:drink', 600, 965, '#9b3352', 34]], lab: [['IT PILES UP IN YOUR BLOOD', 'h2:piles', 1500, 880, GOLD, 28]] },
    { at: 'h2b', cast: [A('wineG', 300, 500, 1.7, 'h2b:alcohol'), B('hormoneB', 760, 360, 1.5, 'h2b:switches', { o: { txt: 'ADH' }, grey: 'h2b:hormone+0.3', shake: ['h2b:hormone+0.3', 0.6] }),
        B('kidney', 1150, 520, 2.2, 'h2b:kidneys'), A('adult', 1620, 560, 2.0, 'h2b:wake', { o: { mood: 'sick' } })],
      fx: [['zap', 0, 1, 'h2b:off', 0.6, '#ff9fb4'], ['stream', 2, [1150, 880], 'h2b:water', 'h2b>', { col: '#5aa9e6', n: 7, arc: -30 }]],
      tag: [['ALCOHOL DRIES YOU OUT', 'h2b:dries', 960, 965, '#9b3352', 36]], lab: [['HOLD-WATER HORMONE', 'h2b:hormone', 760, 200, WHITE, 26]] },
    { at: 'h3', cast: [A('heartR', 420, 520, 2.5, 'h3:heart', { o: tt => ({ rate: tt > T('h3:rhythm') ? 2.6 : 1.2, pain: tt > T('h3:rhythm') }), shake: ['h3:rhythm', 1.2], hit: ['h3:throw+0.6'] }),
        A('wineG', 900, 260, 1.3, 'h3:heavy', { mv: [['h3:throw+0.6', 560, 420, 60]], out: 'h3:rhythm+0.5' }), B('ecg', 900, 680, 1.8, 'h3:rhythm'),
        A('doctor', 1350, 540, 1.9, 'h3:doctors'), B('calendar2', 1700, 360, 1.3, 'h3:weekends', { o: { head: 'WEEKEND', text: 'SAT' } }), A('xtree', 1700, 720, 1.3, 'h3:holidays')],
      tag: [['HOLIDAY HEART SYNDROME · 1978', 'h3:1978', 960, 965, '#e2457a', 36]] },
    QB('h4q', [A('heartR', 760, 560, 2.2, 'h4q+0.2'), A('xtree', 1180, 560, 1.6, 'h4q:christmas')]),
    { at: 'h5', cast: [A('globeP', 320, 400, 1.5, 'h5:swedish'), A('docV', 760, 400, 1.5, 'h5:study', { o: { title: 'SWEDEN' } }),
        B('calendar2', 1250, 420, 1.9, 'h5:christmas', { o: { text: '24' }, pulse: ['h5:37'] }), A('heartR', 1650, 420, 1.8, 'h5:risk', { o: { pain: 1 }, pulse: ['h5:37'] })],
      fx: [['stream', 0, 1, 'h5:280', 'h5:found', { ic: 'heartR', s: 0.25, n: 6 }], ['zap', 2, 3, 'h5:37', 0.6, '#ff9fb4']],
      num: [['h5:280', 540, 780, '280,000+', 'HEART ATTACKS STUDIED'], ['h5:37', 1450, 780, '+37%', 'CHRISTMAS EVE VS THE WEEKS AROUND']] },
    { at: 'h6', cast: [A('question', 960, 200, 1.0, 'h6:nobody', { out: 'h6:so' }), A('heartR', 960, 520, 2.2, 'h6:knows', { o: tt => ({ pain: tt > T('h6:chest') }), pulse: ['h6:part'] }),
        A('adren', 420, 330, 1.4, 'h6:stress', { out: 'h6:so' }), A('ham', 420, 720, 1.4, 'h6:heavy', { out: 'h6:so' }), A('wineG', 1500, 330, 1.4, 'h6:alcohol', { out: 'h6:so' }), A('snow', 1500, 720, 1.4, 'h6:cold', { out: 'h6:so' }),
        A('adult', 520, 580, 2.2, 'h6:someone', { o: { mood: 'sick' } }), A('phone911', 1400, 540, 1.8, 'h6:call', { shake: ['h6:call', 1.0] })],
      fx: [['zap', 2, 1, 'h6:stress+0.3', 0.5], ['zap', 3, 1, 'h6:meals+0.3', 0.5], ['zap', 4, 1, 'h6:alcohol+0.3', 0.5], ['zap', 5, 1, 'h6:weather+0.3', 0.5]],
      tag: [['CHEST PAIN? CALL FOR HELP RIGHT AWAY', 'h6:chest', 960, 965, '#e2457a', 34]] },
  ], 'l1'));
}
// ---------- 9 the leftovers trap ----------
function sLeftovers(t) {
  worldBG(t, 'pine');
  beats(t, chainB([
    QB('l1', [B('tray', 760, 560, 2.4, 'l1+0.2'), B('fridge', 1150, 540, 1.4, 'l1:safe')]),
    { at: 'l2', cast: [A('stopwatch', 300, 330, 1.4, 'l2:quick'), B('tray', 820, 640, 2.6, 'l2:trays'), A('bact', 1300, 300, 1.6, 'l2:bacterium', { mv: [['l2:trays', 1300, 300], ['l2:meat', 880, 560, 60]] }),
        A('bact', 700, 560, 0.9, 'l2:temperature'), A('bact', 960, 610, 0.9, 'l2:temperature+0.2'), A('thermoC', 1560, 620, 1.7, 'l2:room', { o: { level: 0.5 } })],
      tag: [['CLOSTRIDIUM PERFRINGENS', 'l2:clostridium', 960, 965, '#9b3352', 36]], lab: [['ROOM TEMPERATURE', 'l2:room', 1560, 850, WHITE, 28]] },
    { at: 'l3', cast: [A('crowd', 520, 740, 1.8, 'l3:cases'), B('calendar2', 1060, 400, 1.5, 'l3:november', { o: { head: 'PEAK', text: 'NOV' } }), B('calendar2', 1360, 400, 1.5, 'l3:december', { o: { head: 'PEAK', text: 'DEC' } }),
        B('turkeyI', 1100, 760, 1.7, 'l3:turkey'), A('ham', 1500, 760, 1.6, 'l3:beef'), A('bact', 0, 0, 0.7, 'l3:usual', { follow: { i: 3, dx: 150, dy: -110 } }), A('bact', 0, 0, 0.7, 'l3:suspects', { follow: { i: 4, dx: 120, dy: -100 } })],
      num: [['l3:million', 520, 330, '~1 MILLION', 'U.S. CASES A YEAR']] },
    { at: 'l4', cast: [B('fridge', 360, 520, 2.2, 'l4:fridge'), B('tray', 760, 760, 1.3, 'l4:leftovers', { mv: [['l4:fridge+0.4', 420, 560, 60]], out: 'l4:two' }),
        B('turkeyI', 960, 560, 1.9, 'l4:cut', { morph: ['l4:smaller', 'drumstick'] }), B('knife', 960, 260, 1.3, 'l4:cut', { mv: [['l4:pieces', 960, 400]] }),
        B('drumstick', 860, 780, 0.9, 'l4:smaller+0.2'), B('drumstick', 1070, 790, 0.9, 'l4:smaller+0.35'),
        B('tray', 1560, 500, 1.7, 'l4:reheat'), B('flame', 1560, 750, 1.3, 'l4:reheat+0.2')],
      lab: [['FRIDGE WITHIN 2 HOURS', 'l4:two', 380, 965, GOLD, 26], ['CUT BIG PIECES SMALLER', 'l4:cut', 960, 965, WHITE, 26], ['REHEAT UNTIL STEAMING', 'l4:steaming', 1560, 965, GOLD, 26]] },
  ], 't1'));
}
// ---------- 10 the long goodbye ----------
function sTransit(t) {
  worldBG(t, 'cream');
  beats(t, chainB([
    QB('t1', [B('bodyI', 760, 560, 2.4, 't1+0.2', { o: { p: 0.3 } }), B('clock2', 1150, 400, 1.4, 't1:gone')]),
    { at: 't2', cast: [B('bodyI', 560, 560, 2.6, 't2', { o: tt => ({ p: 0.55 * RP('t2:food', E('t2') - T('t2:food'))(tt) }) }), B('clock2', 1150, 380, 1.7, 't2:six'),
        B('stomachI', 1150, 760, 1.3, 't2:stomach', { o: { fill: 0.6 } }), B('gutI', 1550, 720, 1.6, 't2:small')],
      fx: [['stream', 2, 3, 't2:small', 't2>', { col: '#ffd98a', n: 6 }]], tag: [['6–8 HOURS', 't2:six', 1550, 380, '#c95a7c', 44]] },
    { at: 't2b', cast: [B('gutI', 420, 560, 2.4, 't2b', { morph: ['t2b:lining', 'villi'], hw: 92, hh: 100 }), B('court', 1380, 520, 2.4, 't2b:badminton')],
      fx: [['stream', [900, 250], [420, 460], 't2b:soak', 't2b:spread', { ic: 'glucose', s: 0.3, n: 6 }], ['stream', 0, 1, 't2b:spread', 't2b>', { col: '#f29db0', n: 8 }]],
      tag: [['≈ ½ A BADMINTON COURT', 't2b:half', 1380, 820, '#3f8f4a', 40]], lab: [['FINGER-LIKE FOLDS', 't2b:finger', 420, 920, WHITE, 30]] },
    { at: 't3', cast: [B('bodyI', 560, 560, 2.6, 't3', { o: tt => ({ p: 0.55 + 0.45 * RP('t3', E('t3') - S('t3'))(tt) }) }), A('hglass', 1150, 400, 1.6, 't3:another'), A('doctor', 1650, 420, 1.6, 't3:mayo')],
      tag: [['~1.5 DAYS IN THE COLON', 't3:half', 1350, 700, '#c95a7c', 36], ['TOTAL: 2–5 DAYS', 't3:two', 1350, 830, '#9b3352', 44]] },
    { at: 't4', cast: [B('calendar2', 420, 480, 2.0, 't4:25', { o: { text: '25' } }), B('calendar2', 780, 480, 1.4, 't4:still', { o: { text: '26' } }), B('calendar2', 1120, 480, 1.4, 't4:still+0.4', { o: { text: '27' } }),
        B('calendar2', 1500, 480, 2.0, 't4:few', { o: { text: '28' }, pulse: ['t4:later'] }), B('drumstick', 520, 780, 1.3, 't4:eat', { mv: [['t4:still', 520, 780], ['t4:days', 1380, 780, 80]] })],
      lab: [['STILL WITH YOU', 't4:still', 960, 965, WHITE, 34]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'pine'); snowfall(t);
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [B('turkeyI', 760, 560, 2.4, 'o1+0.2'), B('stomachI', 1180, 560, 1.6, 'o1:dinner')]),
    { at: 'o2', cast: [B('stomachI', 300, 540, 2.2, 'o2:stomach', { o: tt => ({ fill: 0.2 + 0.8 * RP('o2:stretches', 0.8)(tt) }) }),
        B('acidD', 700, 330, 1.3, 'o2:acid', { mv: [['o2:kills', 700, 560, 40]] }), A('bact', 700, 700, 1.3, 'o2:acid', { erase: 'o2:germs' }),
        B('liver', 1120, 380, 1.4, 'o2:liver'), B('tank', 1120, 720, 1.3, 'o2:sugar', { o: tt => ({ level: 0.3 + 0.6 * RP('o2:tanks', 1)(tt) }) }),
        B('sprout', 1600, 360, 1.4, 'o2:trillions', { mv: [['o2:fed', 1600, 560]], erase: 'o2:fed+0.3' }), B('microbe', 1600, 700, 1.5, 'o2:bacteria', { pulse: ['o2:fed+0.3'] })],
      fx: [['stream', 3, 4, 'o2:fill', 'o2:then', { ic: 'glucose', s: 0.28, n: 5 }]], lab: [['BUILT FOR FEASTS', 'o2:built', 960, 120, GOLD, 34]] },
    { at: 'o2:then', cast: [A('check', 960, 300, 1.4, 'o2:recovers'), B('clock2', 420, 620, 1.6, 'o2:slower'), B('walker', 960, 640, 2.0, 'o2:walk', { mv: [['o2:afterwards', 1060, 640]] }), A('wineG', 1500, 620, 1.5, 'o2:easy', { shake: ['o2:wine', 0.6] })],
      lab: [['EAT A LITTLE SLOWER', 'o2:slower', 420, 900, WHITE, 28], ['TAKE A SHORT WALK', 'o2:walk', 1000, 930, GOLD, 28], ['GO EASY ON THE WINE', 'o2:easy', 1520, 860, WHITE, 28]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [B('turkeyI', 480, 720, 2.4, 'o3'), B('stomachI', 480, 330, 1.4, 'o3', { pulse: ['o3:body'] })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'WHAT CHRISTMAS DINNER', 'DOES TO YOUR BODY', 1380, 62, 80);
}

const CHAPTERS = [['s1', 'Your stretchy stomach', 'cream', 'stomachI'], ['a1', 'Acid and heartburn', 'plum', 'flame'], ['w1', 'The sugar wave', 'plum', 'glucose'], ['d1', 'Room for dessert', 'indigo', 'pudding'], ['z1', 'The food coma', 'night', 'sofa'],
  ['g1', 'Sprouts and gas', 'teal', 'sprout'], ['k1', 'The scale the next morning', 'gold', 'bscale'], ['h1', 'Wine and your heart', 'night', 'heart'], ['l1', 'The leftovers trap', 'pine', 'fridge'], ['t1', 'The long goodbye', 'cream', 'clock2']];
function SECTIONS() { return makeSections(CHAPTERS, { s1: [sStomach, 's2'], a1: [sAcid, 'a2'], w1: [sSugar, 'w2'], d1: [sDessert, 'd2'], z1: [sComa, 'z2'], g1: [sGas, 'g2'], k1: [sScale, 'k2'], h1: [sHeart, 'h2'], l1: [sLeftovers, 'l2'], t1: [sTransit, 't2'] }, sOpen, sOutro); }
