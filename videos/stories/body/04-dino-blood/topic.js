// "Scientists found dinosaur blood. Now what?" — topic file (engine + common.js cast system + icons2.js)
// Visual rework 2026-11-21: every line is a small picture-story; icons fly into, hit, push, erase and morph into each other.
// ---------- palette ----------
const RUST = '#c8553d', RUST2 = '#9a3b2a', BELLY = '#f2b37a', FEATH = '#ffd98a', FEATH2 = '#e07b39', BLOOD = '#d63a4c', BLOOD2 = '#b02a3d', BONE = '#f3ead8', STONE = '#9a8a74';
const sky = (t, top, bot) => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); };

// ---------- heroes ----------
function dino(t, x, y, s, o = {}) {   // a small feathered theropod (our own design), side view facing right: walks, blinks, tail sways, feathers ruffle
  const g = t * (o.speed ?? 5), wk = o.walk ?? 1, bob = Math.abs(Math.sin(g)) * 8 * wk;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  if (!o.dead) { ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.beginPath(); ctx.ellipse(-20, 0, 250, 16, 0, 0, 6.283); ctx.fill(); }
  const leg = (ph, c, c2) => { const sw = Math.sin(ph) * 0.42 * wk, lift = Math.max(0, Math.cos(ph)) * wk;
    ctx.save(); ctx.translate(10, -176 - bob); ctx.rotate(sw); rr2(-30, -24, 60, 104, 30, c);
    ctx.translate(0, 72); ctx.rotate(0.45 - sw * 0.5 + lift * 0.5); rr2(-12, -4, 24, 76, 12, c2);
    ctx.translate(0, 68); ctx.rotate(-0.75 - lift * 0.35); rr2(-10, -4, 20, 44, 10, c2);
    ctx.translate(0, 38); ctx.rotate(0.3 - sw * 0.6); rr2(-8, -8, 54, 14, 7, '#5e2618'); rr2(-8, -8, 14, 14, 7, '#5e2618'); ctx.restore(); };
  leg(g + Math.PI, RUST2, '#7d2f22');
  ctx.save(); ctx.translate(0, -bob);
  ctx.save(); ctx.translate(-70, -205); ctx.rotate(Math.sin(t * 1.8) * 0.06 + Math.sin(g) * 0.03 * wk);   // tail with feather tufts
  ctx.fillStyle = RUST; ctx.beginPath(); ctx.moveTo(14, -48); ctx.quadraticCurveTo(-160, -62, -330, -22); ctx.quadraticCurveTo(-170, 8, 14, 48); ctx.fill();
  for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(-40 - i * 42, -44 + i * 3.5); ctx.rotate(-0.55 + Math.sin(t * 3 + i) * 0.12); rr2(-8, -30, 16, 34, 8, i % 2 ? FEATH : FEATH2); ctx.restore(); }
  ctx.restore();
  ctx.fillStyle = RUST; ctx.beginPath(); ctx.ellipse(10, -205, 124, 76, -0.12, 0, 6.283); ctx.fill();   // body
  ctx.fillStyle = BELLY; ctx.beginPath(); ctx.ellipse(34, -172, 88, 38, -0.12, 0, Math.PI); ctx.fill();
  for (let i = 0; i < 8; i++) { ctx.save(); ctx.translate(-92 + i * 28, -270 + Math.abs(i - 4) * 4); ctx.rotate(-0.6 + Math.sin(t * 2.5 + i) * 0.12); rr2(-7, -30, 14, 34, 7, i % 2 ? FEATH : FEATH2); ctx.restore(); }
  rr2(-70, -250, 90, 14, 7, 'rgba(255,255,255,0.18)');
  ctx.save(); ctx.translate(96, -240); ctx.rotate(Math.sin(g * 2) * 0.05 * wk + Math.sin(t * 1.1) * 0.04 - 0.08 + (o.look || 0));   // neck + head
  ctx.fillStyle = RUST; ctx.beginPath(); ctx.moveTo(-50, 40); ctx.quadraticCurveTo(0, -40, 34, -112); ctx.lineTo(92, -96); ctx.quadraticCurveTo(50, -30, 40, 46); ctx.fill();
  ctx.save(); ctx.translate(66, -122);
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-34 + i * 14, -24); ctx.rotate(-1.0 + i * 0.22 + Math.sin(t * 4 + i) * 0.12); rr2(-6, -32, 12, 34, 6, i % 2 ? FEATH2 : FEATH); ctx.restore(); }
  ctx.fillStyle = RUST; ctx.beginPath(); ctx.ellipse(8, 0, 52, 36, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(26, -24); ctx.quadraticCurveTo(110, -16, 120, 6); ctx.lineTo(36, 22); ctx.fill();
  const jaw = (o.roar ? Math.max(0, Math.sin(t * 3)) * 0.35 : 0) + Math.max(0, Math.sin(t * 1.7)) ** 10 * 0.2;
  ctx.save(); ctx.translate(30, 16); ctx.rotate(jaw); ctx.fillStyle = RUST2; ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(86, -2); ctx.quadraticCurveTo(70, 16, 0, 16); ctx.fill();
  ctx.fillStyle = '#fff8e0'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(14 + i * 14, -3); ctx.lineTo(22 + i * 14, -3); ctx.lineTo(18 + i * 14, -12); ctx.fill(); } ctx.restore();
  const bl = o.dead ? 0 : 1 - blinkF(t + (o.ph || 0)); circ(22, -12, 12, '#fff8e0'); ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.ellipse(26, -12, 6.5, 7.5 * bl + 0.5, 0, 0, 6.283); ctx.fill(); circ(28, -15, 2.4, '#fff');
  rr2(-22, -30, 44, 9, 4.5, 'rgba(255,255,255,0.22)'); ctx.restore(); ctx.restore();
  ctx.save(); ctx.translate(92, -194); ctx.rotate(0.55 + Math.sin(g) * 0.12 * wk + Math.sin(t * 2) * 0.05); rr2(-11, 0, 22, 64, 11, RUST2);   // feathered arm
  for (let i = 0; i < 3; i++) rr2(-26 + i * 3, 10 + i * 16, 20, 30, 10, i % 2 ? FEATH : FEATH2); ctx.restore();
  ctx.restore();
  leg(g, RUST, RUST2);
  ctx.restore();
}
function skeleton(t, x, y, s, stone = 0) {   // a lying dinosaur skeleton (bones turn into stone with `stone` 0..1)
  const c = stone > 0 ? `rgb(${lerp(243, 154, stone) | 0},${lerp(234, 138, stone) | 0},${lerp(216, 116, stone) | 0})` : BONE;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 12; i++) { const px = -300 + i * 30, py = -40 + Math.sin(i * 0.35) * 18; rr2(px - 10, py - 12, 22, 24, 9, c); }   // tail + spine vertebrae
  for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(20 + i * 22, -40); ctx.rotate(0.15); rr2(-5, 0, 10, 70 - Math.abs(i - 3) * 8, 5, c); ctx.restore(); }   // ribs
  rr2(170, -64, 130, 46, 22, c); circ(194, -46, 10, 'rgba(60,40,30,0.5)'); for (let i = 0; i < 5; i++) rr2(212 + i * 16, -24, 6, 12, 3, c);   // skull + teeth
  rr2(-40, 0, 140, 22, 11, c); rr2(80, 10, 100, 18, 9, c); rr2(160, 20, 50, 12, 6, c);   // leg bones
  ctx.restore();
}
function samerica(t, x, y, s, t0) {   // stylised South America with a pin on north-east Brazil
  const P = [[-77, 8], [-72, 12], [-63, 11], [-60, 8], [-52, 5], [-50, 0], [-44, -2], [-35, -5], [-35, -9], [-39, -15], [-40, -22], [-48, -26], [-53, -34], [-58, -38], [-63, -41], [-65, -45], [-68, -50], [-69, -55], [-74, -52], [-73, -45], [-73, -37], [-71, -30], [-70, -18], [-76, -14], [-81, -6], [-80, -2], [-78, 2]];
  const pt = ([lo, la]) => [x + (lo + 58) * 9 * s, y - (la + 22) * 9 * s];
  ctx.fillStyle = '#7fc98a'; ctx.beginPath(); P.forEach((p, i) => { const [a, b] = pt(p); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.beginPath(); P.slice(0, 9).forEach((p, i) => { const [a, b] = pt(p); i ? ctx.lineTo(a, b - 6) : ctx.moveTo(a, b - 6); }); ctx.lineTo(...pt([-50, -6])); ctx.fill();
  if (t < t0) return; const [px, py] = pt([-39.7, -7.2]), k = spring(t - t0, 0.45, 12), hop = Math.abs(Math.sin(t * 3)) * 8;
  ctx.save(); ctx.translate(px, py - hop); ctx.scale(k, k); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.arc(0, -46, 26, Math.PI * 0.85, Math.PI * 2.15); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); circ(0, -48, 10, '#fff'); ctx.restore();
}
function timeline(t, t0, y, marks, t1) {   // linear axis: left = 70 million years ago, right = today
  const x0 = 180, x1 = 1740, X = ma => lerp(x1, x0, ma / 70), k = eoq((t - t0) / 1.2); if (t < t0) return;
  reg('hero', 'timeline', x0 - 30, y - 34, x1 + 30, y + 34);
  rr2(x1 - (x1 - x0) * k, y - 12, (x1 - x0) * k, 24, 12, 'rgba(255,255,255,0.28)');
  for (let m = 0; m <= 70; m += 10) rr2(X(m) - 2, y - 22, 4, 44, 2, 'rgba(255,255,255,0.35)');
  label('TODAY', x1 - 20, y - 76, t, t0 + 0.3, t1, WHITE, 26);
  marks.forEach(([ma, txt, col, tm, up]) => { if (t < tm) return; const sp = spring(t - tm, 0.5, 13), x = X(ma); circ(x, y, 24 * sp, col); circ(x, y, 10 * sp, '#fff');
    const b = labelBox(txt, x, 0, 28), hw = (b.x1 - b.x0) / 2; label(txt, clamp(x, hw + 24, W - hw - 24), y + (up ? -84 : 84), t, tm, t1, col === WHITE ? WHITE : GOLD, 28); });
}

// ---------- icons (flat, no outlines, each with its own idle motion) ----------
Object.assign(ICONS, {
  dbone(t) { ctx.save(); ctx.rotate(-0.5); rr2(-62, -15, 124, 30, 15, BONE); for (const sx of [-1, 1]) for (const sy of [-1, 1]) circ(sx * 64, sy * 15, 21, BONE); rr2(-44, -9, 64, 7, 3.5, 'rgba(255,255,255,0.7)'); ctx.restore(); },
  stonebone(t) { ctx.save(); ctx.rotate(-0.5); rr2(-62, -15, 124, 30, 15, STONE); for (const sx of [-1, 1]) for (const sy of [-1, 1]) circ(sx * 64, sy * 15, 21, STONE); for (let i = 0; i < 8; i++) circ(-50 + i * 14, (i % 3 - 1) * 8, 3, 'rgba(60,50,40,0.4)'); ctx.restore(); },
  legbone(t) { ctx.save(); ctx.rotate(0.2); rr2(-20, -100, 40, 120, 20, '#e6d6b6'); circ(-4, -104, 30, '#e6d6b6'); circ(0, 22, 26, '#e6d6b6'); ctx.save(); ctx.translate(0, 30); ctx.rotate(-0.5); rr2(-12, 0, 24, 80, 12, '#d9c7a0'); ctx.translate(0, 80); ctx.rotate(1.0); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate((i - 1) * 0.35); rr2(-5, 0, 10, 40, 5, '#d9c7a0'); ctx.restore(); } ctx.restore(); rr2(-10, -80, 8, 80, 4, 'rgba(255,255,255,0.5)'); ctx.restore(); },
  rbc(t) { rbcDisc(0, 0, 58, 0.86 + 0.1 * Math.sin(t * 2), Math.sin(t) * 0.25); },
  fcells(t) { [[-34, -22], [10, -36], [46, -8], [-8, 6], [30, 32], [-42, 28], [2, 48]].forEach(([x, y], i) => { ctx.save(); ctx.translate(x + Math.sin(t * 1.5 + i) * 2, y + Math.cos(t * 1.3 + i) * 2); ctx.rotate(i * 0.7); ctx.fillStyle = i % 2 ? '#8a3a2a' : '#a8452f'; ctx.beginPath(); ctx.ellipse(0, 0, 21, 14, 0, 0, 6.283); ctx.fill(); circ(-6, -4, 4, 'rgba(255,220,180,0.4)'); ctx.restore(); }); },
  heme(t, o) { ctx.save(); ctx.rotate(Math.sin(t * 0.8) * 0.15);
    ctx.fillStyle = '#b48cff'; ctx.beginPath(); ctx.roundRect(-46, -46, 92, 92, 30); ctx.roundRect(-32, -32, 64, 64, 20); ctx.fill('evenodd');
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); ctx.translate(0, -50); ctx.fillStyle = '#8f6be0'; ctx.beginPath(); for (let k = 0; k < 5; k++) { const a = k / 5 * 6.283 - Math.PI / 2; ctx.lineTo(Math.cos(a) * 19, Math.sin(a) * 19); } ctx.fill(); circ(0, 5, 5, '#8fd8e6'); ctx.restore(); }
    const p = 0.6 + 0.4 * Math.sin(t * 4); ctx.save(); ctx.shadowColor = '#ff8f4a'; ctx.shadowBlur = 26 * p; circ(0, 0, 21, '#ff8f4a'); ctx.restore(); font(19, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Fe', 0, 1); ctx.restore();
    if (o.o2) { const k = eic((Math.sin(t * 1.6) + 1) / 2); ctx.save(); ctx.translate(0, -lerp(120, 34, k)); circ(-13, 0, 14, '#8fd8e6'); circ(13, 0, 14, '#8fd8e6'); ctx.restore(); } },
  hemo(t) { [[-25, -21, '#e2457a'], [25, -21, '#c43a6a'], [-25, 23, '#c43a6a'], [25, 23, '#e2457a']].forEach(([x, y, c], i) => { circ(x, y, 33, c); circ(x - 9, y - 11, 8, 'rgba(255,255,255,0.25)'); const p = 0.5 + 0.5 * Math.sin(t * 3 + i * 1.6); ctx.save(); ctx.shadowColor = '#ffb35c'; ctx.shadowBlur = 14 * p; circ(x + 7, y + 7, 9, '#ffb35c'); ctx.restore(); }); },
  octo(t) { for (let i = 0; i < 8; i++) { let x = -42 + i * 12, y = 6; for (let k = 0; k < 10; k++) { const a = Math.sin(t * 2.5 + i + k * 0.5) * 0.5 + (i - 3.5) * 0.13; x += Math.sin(a) * 9; y += Math.cos(a) * 9; circ(x, y, 10 - k * 0.8, i % 2 ? '#4a78c4' : '#5b8dd6'); } }
    ctx.fillStyle = '#5b8dd6'; ctx.beginPath(); ctx.ellipse(0, -34, 48, 54, 0, 0, 6.283); ctx.fill(); rr2(-32, -72, 18, 32, 9, 'rgba(255,255,255,0.3)');
    const bl = 1 - blinkF(t + 1.3); for (const sd of [-1, 1]) { circ(sd * 19, -14, 11, '#fff'); ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.ellipse(sd * 19, -14, 5.5, 6.5 * bl + 0.5, 0, 0, 6.283); ctx.fill(); } },
  microbe(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.15); for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-50, 0); ctx.rotate(Math.PI + Math.sin(t * 8 + i) * 0.4 + (i - 1) * 0.5); rr2(0, -2, 40, 4, 2, '#5aa96a'); ctx.restore(); }
    rr2(-54, -28, 108, 56, 28, '#7fd36b'); circ(-22, -6, 6, '#3f7f4c'); circ(8, 10, 5, '#3f7f4c'); const m = Math.abs(Math.sin(t * 6)); ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.ellipse(40, 6, 8, 3 + 7 * m, 0, 0, 6.283); ctx.fill(); circ(28, -10, 5, '#20232f'); ctx.restore(); },
  museum(t, o) { rr2(-96, 40, 192, 18, 6, '#e8dcc4'); ctx.fillStyle = '#e8dcc4'; ctx.beginPath(); ctx.moveTo(-100, -36); ctx.lineTo(0, -80); ctx.lineTo(100, -36); ctx.fill(); rr2(-94, -38, 188, 14, 5, '#d8c8a8'); for (let i = 0; i < 5; i++) rr2(-80 + i * 37, -22, 16, 62, 6, '#f3ead8');
    if (o.fire !== false) for (let i = 0; i < 5; i++) { const fx = -70 + i * 35, h = 40 + Math.sin(t * 9 + i * 2) * 12; ctx.fillStyle = i % 2 ? '#ff8f4a' : '#ffd98a'; ctx.beginPath(); ctx.moveTo(fx - 15, -52); ctx.quadraticCurveTo(fx - 17, -52 - h * 0.6, fx + Math.sin(t * 7 + i) * 6, -52 - h); ctx.quadraticCurveTo(fx + 17, -52 - h * 0.6, fx + 15, -52); ctx.fill(); } },
  mine(t) { ctx.fillStyle = '#d9cfb8'; ctx.beginPath(); ctx.moveTo(-96, 60); ctx.lineTo(-56, -14); ctx.lineTo(-16, 16); ctx.lineTo(26, -36); ctx.lineTo(96, 60); ctx.fill(); for (let i = 0; i < 5; i++) circ(-60 + i * 30, 40 - (i % 2) * 14, 6, 'rgba(255,255,255,0.5)');
    ctx.save(); ctx.translate(40, -30); ctx.rotate(-0.5 + Math.max(0, Math.sin(t * 3)) ** 3 * 0.8); rr2(-5, -76, 10, 84, 5, '#9b6a44'); ctx.fillStyle = '#9aa6c4'; ctx.beginPath(); ctx.moveTo(-44, -64); ctx.quadraticCurveTo(0, -94, 44, -64); ctx.lineTo(0, -76); ctx.fill(); ctx.restore(); },
  scope(t) { rr2(-62, 52, 124, 16, 8, '#3a3f5a'); rr2(18, -40, 22, 98, 11, '#5b6585'); ctx.save(); ctx.translate(-4, -34); ctx.rotate(-0.35); rr2(-17, -62, 34, 92, 12, '#9aa6c4'); rr2(-21, -74, 42, 18, 8, '#3a3f5a'); rr2(-10, -54, 8, 60, 4, 'rgba(255,255,255,0.4)'); ctx.restore();
    rr2(-50, 14, 84, 10, 5, '#3a3f5a'); const p = 0.5 + 0.5 * Math.sin(t * 5); ctx.save(); ctx.shadowColor = '#8fd8e6'; ctx.shadowBlur = 22 * p; circ(-12, 28, 9, '#8fd8e6'); ctx.restore(); },
  pyrite(t) { const a = 0.6 + Math.sin(t * 0.9) * 0.35, c = Math.cos(a), s = Math.sin(a); const P = (x, y, z) => [x * c - z * s, y * 0.9 + (x * s + z * c) * 0.35];
    const f = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); pts.forEach((p, i) => { const [u, v] = P(...p); i ? ctx.lineTo(u, v) : ctx.moveTo(u, v); }); ctx.fill(); };
    const k = 46; f([[-k, -k, -k], [k, -k, -k], [k, -k, k], [-k, -k, k]], '#ffe58a'); f([[-k, -k, k], [k, -k, k], [k, k, k], [-k, k, k]], '#d9b23a'); f([[k, -k, -k], [k, -k, k], [k, k, k], [k, k, -k]], '#a8862a'); },
  elem(t, o) { rr2(-58, -58, 116, 116, 18, o.col || '#5b4fd6'); rr2(-58, -58, 116, 28, 14, 'rgba(255,255,255,0.18)'); font(58, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.sym, 0, 4); font(15, 600); ctx.letterSpacing = '2px'; ctx.fillText(o.name, 0, 42); ctx.letterSpacing = '0px'; },
  laser(t) { rr2(-90, -24, 86, 48, 12, '#5b6585'); rr2(-80, -14, 30, 8, 4, 'rgba(255,255,255,0.35)'); const p = (t * 1.8) % 1; ctx.save(); ctx.globalAlpha *= 0.65 + 0.35 * Math.sin(t * 20); rr2(-4, -4, 82, 8, 4, '#ff5d73'); ctx.restore(); circ(84, 0, 10 + 18 * p, `rgba(255,93,115,${0.7 * (1 - p)})`); circ(84, 0, 9, '#ffd98a'); },
  leaf(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.1); ctx.fillStyle = '#5aa96a'; ctx.beginPath(); ctx.moveTo(-64, 12); ctx.quadraticCurveTo(-10, -66, 64, -22); ctx.quadraticCurveTo(20, 44, -64, 12); ctx.fill(); rr2(-54, -6, 108, 4, 2, '#3f7f4c'); for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(-30 + i * 22, -4); ctx.rotate(-0.7); rr2(0, -1, 22, 3, 1.5, '#3f7f4c'); ctx.restore(); } ctx.restore(); },
  coffin(t) { rr2(-84, -26, 168, 84, 14, '#6b5a4a'); rr2(-70, -14, 140, 58, 10, '#3a2e26'); ctx.fillStyle = '#c33244'; ctx.beginPath(); ctx.ellipse(-22, 14, 28, 17, 0.2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(26, 18, 26, 16, -0.3, 0, 6.283); ctx.fill();
    const k = eic((Math.sin(t * 1.2) + 1) / 2); ctx.save(); ctx.translate(0, -36 - (1 - k) * 24); ctx.rotate((1 - k) * -0.08); rr2(-92, -12, 184, 22, 11, '#8a7560'); rr2(-70, -8, 60, 6, 3, 'rgba(255,255,255,0.25)'); ctx.restore(); },
  quote(t) { rr2(-96, -62, 192, 112, 32, '#f3f7fb'); ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.moveTo(-44, 46); ctx.lineTo(-62, 84); ctx.lineTo(-12, 46); ctx.fill(); for (const sx of [-24, 24]) { circ(sx - 6, -4, 16, '#5b6585'); ctx.fillStyle = '#5b6585'; ctx.beginPath(); ctx.moveTo(sx - 20, 0); ctx.quadraticCurveTo(sx - 18, 30, sx + 4, 34); ctx.quadraticCurveTo(sx - 4, 20, sx + 8, -2); ctx.fill(); } },
  femur(t) { ctx.save(); ctx.rotate(-0.25); rr2(-24, -96, 48, 192, 24, '#d9c7a0'); circ(-8, -98, 38, '#d9c7a0'); circ(24, -88, 24, '#d9c7a0'); circ(-18, 98, 32, '#d9c7a0'); circ(20, 100, 30, '#d9c7a0'); rr2(-13, -64, 10, 120, 5, 'rgba(255,255,255,0.35)'); ctx.restore(); },
  vessels(t) { const st = 1 + Math.max(0, Math.sin(t * 1.6)) * 0.35; ctx.save(); ctx.scale(st, 1 / Math.sqrt(st)); ctx.lineCap = 'round'; for (let j = 0; j < 3; j++) { ctx.strokeStyle = ['#e2457a', '#c33244', '#ff8f9c'][j]; ctx.lineWidth = 14 - j * 2; ctx.beginPath(); for (let x = -70; x <= 70; x += 5) ctx.lineTo(x, -26 + j * 26 + Math.sin(x * 0.06 + j) * 11); ctx.stroke(); } ctx.restore(); },
  scales(t, o) { const tip = Math.sin(t * 1.2) * 0.14 + (o.tip || 0); rr2(-7, -44, 14, 104, 7, '#9aa6c4'); rr2(-46, 56, 92, 14, 7, '#9aa6c4'); ctx.save(); ctx.translate(0, -44); ctx.rotate(tip); rr2(-104, -6, 208, 12, 6, '#c9d6ec');
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 92, 0); ctx.rotate(-tip); rr2(-2, 0, 4, 40, 2, '#c9d6ec'); rr2(-42, 40, 84, 12, 6, '#c9d6ec'); circ(0, 30, sd < 0 ? 12 : 16, sd < 0 ? '#ffd98a' : '#8fd8e6'); ctx.restore(); } ctx.restore(); },
  mosquito(t) { ICONS.fly(t); for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * 0.5); rr2(0, 0, sd * 70, 3, 1.5, '#3a3f5a'); ctx.restore(); } rr2(-2, -40, 4, 26, 2, '#3a3f5a'); },
  shale(t) { rr2(-104, -74, 208, 148, 16, '#7d7f8c'); for (let i = 0; i < 5; i++) rr2(-104, -60 + i * 28, 208, 3, 1.5, 'rgba(40,44,60,0.35)');
    ctx.save(); ctx.rotate(-0.3); ctx.fillStyle = 'rgba(220,230,245,0.35)'; ctx.beginPath(); ctx.ellipse(-26, -30, 14, 38, -0.6, 0, 6.283); ctx.ellipse(26, -30, 14, 38, 0.6, 0, 6.283); ctx.fill(); for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(0, -8); ctx.rotate(sd * (0.5 + i * 0.4)); rr2(0, -1.5, sd * 64, 3, 1.5, '#3a3f5a'); ctx.restore(); }
    rr2(-3, -60, 6, 34, 3, '#3a3f5a'); circ(0, -24, 11, '#3a3f5a'); const p = 0.5 + 0.5 * Math.sin(t * 3); ctx.save(); ctx.shadowColor = '#ff5d73'; ctx.shadowBlur = 18 * p; ctx.fillStyle = '#c33244'; ctx.beginPath(); ctx.ellipse(0, 18, 17, 32, 0, 0, 6.283); ctx.fill(); ctx.restore(); rr2(-8, 0, 6, 22, 3, 'rgba(255,255,255,0.4)'); ctx.restore(); },
  bee(t) { const f = Math.sin(t * 40) * 0.4; ctx.fillStyle = 'rgba(220,240,255,0.75)'; ctx.save(); ctx.rotate(-0.3 + f); ctx.beginPath(); ctx.ellipse(-6, -28, 12, 24, -0.3, 0, 6.283); ctx.fill(); ctx.restore(); ctx.save(); ctx.rotate(0.3 - f); ctx.beginPath(); ctx.ellipse(6, -28, 12, 24, 0.3, 0, 6.283); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#ffc93c'; ctx.beginPath(); ctx.ellipse(0, 8, 22, 30, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 3; i++) rr2(-21, -4 + i * 14, 42, 6, 3, '#20232f'); circ(0, -24, 13, '#20232f'); },
  copal(t, o) { const g = ctx.createRadialGradient(-24, -24, 10, 0, 0, 84); g.addColorStop(0, '#ffd27a'); g.addColorStop(1, '#d9852a'); ctx.fillStyle = g; ctx.beginPath(); for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283, r = 74 + Math.sin(i * 2.7) * 8; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.86); } ctx.closePath(); ctx.fill();
    ctx.save(); ctx.globalAlpha *= 0.8; ctx.scale(0.75, 0.75); ICONS[o.inside || 'bee'](0.0); ctx.restore(); rr2(-50, -48, 34, 12, 6, 'rgba(255,255,255,0.6)'); },
  nodna(t) { ICONS.dna(t); ctx.save(); ctx.rotate(-0.7); rr2(-78, -7, 156, 14, 7, '#e2457a'); ctx.restore(); },
  ovalcell(t) { ctx.save(); ctx.rotate(Math.sin(t) * 0.15); ctx.fillStyle = BLOOD; ctx.beginPath(); ctx.ellipse(0, 0, 72, 46, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#ee6070'; ctx.beginPath(); ctx.ellipse(0, 0, 62, 38, 0, 0, 6.283); ctx.fill();
    const p = 1 + Math.sin(t * 3) * 0.07; ctx.fillStyle = '#7f5fd6'; ctx.beginPath(); ctx.ellipse(0, 0, 25 * p, 17 * p, 0, 0, 6.283); ctx.fill(); circ(-6, -5, 5, 'rgba(255,255,255,0.35)'); rr2(-44, -32, 30, 8, 4, 'rgba(255,255,255,0.4)'); ctx.restore(); },
  chicken(t) { const peck = Math.max(0, Math.sin(t * 2.2)) ** 6; rr2(-16, 30, 9, 42, 4.5, '#ff9a3c'); rr2(10, 30, 9, 42, 4.5, '#ff9a3c'); rr2(-26, 68, 24, 8, 4, '#ff9a3c'); rr2(4, 68, 24, 8, 4, '#ff9a3c');
    ctx.fillStyle = '#f7f1e3'; ctx.beginPath(); ctx.moveTo(-58, -6); ctx.lineTo(-88, -54); ctx.lineTo(-44, -34); ctx.fill(); ctx.beginPath(); ctx.ellipse(-6, 4, 60, 46, 0, 0, 6.283); ctx.fill(); ctx.save(); ctx.translate(-10, 6); ctx.rotate(Math.sin(t * 3) * 0.06); rr2(-30, -14, 54, 32, 16, '#e6dccb'); ctx.restore();
    ctx.save(); ctx.translate(34, -30); ctx.rotate(peck * 0.9); circ(0, -16, 27, '#f7f1e3'); for (let i = 0; i < 3; i++) circ(-11 + i * 11, -44, 8.5, '#e2457a'); ctx.fillStyle = '#ffb35c'; ctx.beginPath(); ctx.moveTo(22, -22); ctx.lineTo(44, -13); ctx.lineTo(22, -6); ctx.fill(); circ(20, 3, 7, '#e2457a');
    const bl = 1 - blinkF(t + 0.4); ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.ellipse(8, -21, 4, 5 * bl + 0.5, 0, 0, 6.283); ctx.fill(); ctx.restore(); },
  ostrich(t) { rr2(-14, 12, 9, 70, 4.5, '#d9a066'); rr2(8, 12, 9, 70, 4.5, '#d9a066'); ctx.fillStyle = '#3a2f2f'; ctx.beginPath(); ctx.ellipse(-4, 0, 56, 36, 0, 0, 6.283); ctx.fill(); rr2(-64, -22, 32, 26, 13, '#f3f7fb');
    ctx.save(); ctx.translate(38, -10); ctx.rotate(-0.15 + Math.sin(t * 1.6) * 0.12); rr2(-6, -92, 12, 92, 6, '#e9b7a0'); circ(4, -96, 15, '#e9b7a0'); ctx.fillStyle = '#ffb35c'; ctx.beginPath(); ctx.moveTo(14, -100); ctx.lineTo(34, -94); ctx.lineTo(14, -89); ctx.fill(); circ(7, -100, 3.2 * (1 - blinkF(t + 1)) + 0.4, '#20232f'); ctx.restore(); },
  moa(t) { const bob = Math.sin(t * 1.4) * 5; rr2(-22, 20, 17, 84, 8, '#8a6a4a'); rr2(10, 20, 17, 84, 8, '#8a6a4a'); rr2(-34, 98, 34, 10, 5, '#8a6a4a'); rr2(2, 98, 34, 10, 5, '#8a6a4a');
    ctx.fillStyle = '#7a5a3a'; ctx.beginPath(); ctx.ellipse(0, 0, 64, 50, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 7; i++) rr2(-54 + i * 15, -6 + (i % 2) * 8, 12, 44, 6, '#6a4a2e');
    ctx.save(); ctx.translate(40, -24 + bob); ctx.rotate(-0.08 + Math.sin(t * 1.4) * 0.05); rr2(-9, -112, 18, 116, 9, '#7a5a3a'); circ(4, -118, 17, '#7a5a3a'); ctx.fillStyle = '#d9c7a0'; ctx.beginPath(); ctx.moveTo(16, -124); ctx.lineTo(38, -116); ctx.lineTo(16, -108); ctx.fill(); circ(8, -122, 3.2 * (1 - blinkF(t + 2)) + 0.4, '#20232f'); ctx.restore(); },
  scrapbook(t) { rr2(-74, -58, 148, 116, 10, '#5b4fd6'); rr2(-66, -52, 132, 104, 8, '#f3f7fb'); for (let i = 0; i < 5; i++) { rr2(-56, -38 + i * 17, 46 - (i % 2) * 12, 6, 3, '#c9d6ec'); rr2(10, -38 + i * 17, 46 - ((i + 1) % 2) * 12, 6, 3, '#c9d6ec'); } rr2(-4, -58, 8, 116, 4, '#3a3f8a');
    for (let i = 0; i < 5; i++) { const sn = ((t * 0.7 + i * 0.37) % 1) > 0.5; rr2(-10, -46 + i * 21, 20, 6, 3, sn ? 'rgba(226,69,122,0.25)' : '#e2457a'); }
    for (let i = 0; i < 4; i++) { const p = (t * 0.5 + i / 4) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; ctx.translate(50 + p * 70, -20 + i * 16 - p * 50); ctx.rotate(p * 3 + i); rr2(-11 + p * 4, -8 + p * 3, 22 - p * 8, 16 - p * 6, 3, '#f3f7fb'); ctx.restore(); } },
  tooth(t) { ctx.fillStyle = '#f3efe2'; ctx.beginPath(); ctx.moveTo(-58, -20); ctx.quadraticCurveTo(-62, -68, -34, -62); ctx.quadraticCurveTo(-18, -76, 0, -60); ctx.quadraticCurveTo(18, -76, 34, -62); ctx.quadraticCurveTo(62, -68, 58, -20); ctx.quadraticCurveTo(52, 10, 42, 14);
    ctx.lineTo(36, 72); ctx.quadraticCurveTo(26, 84, 14, 66); ctx.lineTo(5, 26); ctx.lineTo(-5, 26); ctx.lineTo(-14, 66); ctx.quadraticCurveTo(-26, 84, -36, 72); ctx.lineTo(-42, 14); ctx.quadraticCurveTo(-52, 10, -58, -20); ctx.fill();
    ctx.fillStyle = '#d9cdb0'; ctx.beginPath(); ctx.moveTo(-42, 14); ctx.quadraticCurveTo(0, 22, 42, 14); ctx.lineTo(36, 72); ctx.quadraticCurveTo(26, 84, 14, 66); ctx.lineTo(5, 26); ctx.lineTo(-5, 26); ctx.lineTo(-14, 66); ctx.quadraticCurveTo(-26, 84, -36, 72); ctx.fill(); rr2(-42, -52, 18, 44, 9, 'rgba(255,255,255,0.85)'); },
  drawers(t) { rr2(-86, -86, 172, 172, 14, '#7a4a2c'); for (let i = 0; i < 3; i++) { const op = i === 1 ? eic((Math.sin(t * 1.1) + 1) / 2) * 46 : 0; if (op > 3) { rr2(-74 + op, -76 + i * 54, 148, 46, 6, '#3a2414'); const g = 0.5 + 0.5 * Math.sin(t * 4); ctx.save(); ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 20 * g; rr2(-30 + op, -60 + i * 54, 60, 12, 6, '#ffd98a'); ctx.restore(); }
    rr2(-74 + op * 1.25, -76 + i * 54, 148, 46, 6, '#9b6a44'); rr2(-16 + op * 1.25, -58 + i * 54, 32, 9, 4.5, '#ffd98a'); } },
  ftree(t) { rr2(-4, -6, 8, 66, 4, '#9aa6c4'); rr2(-66, -10, 132, 8, 4, '#9aa6c4'); rr2(-70, -10, 8, 34, 4, '#9aa6c4'); rr2(62, -10, 8, 34, 4, '#9aa6c4'); rr2(-4, -50, 8, 44, 4, '#9aa6c4');
    [[0, 62, '#ffd98a'], [-66, 30, '#8fd8e6'], [66, 30, '#e2457a'], [0, -56, '#b48cff']].forEach(([x, y, c], i) => { const p = 1 + 0.1 * Math.max(0, Math.sin(t * 3 - i)); circ(x, y, 18 * p, c); }); },
  egg(t, o) { ctx.fillStyle = '#f7ead2'; ctx.beginPath(); ctx.ellipse(0, 0, 60, 76, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#ffe2a8'; ctx.beginPath(); ctx.ellipse(0, 8, 44, 50, 0, 0, 6.283); ctx.fill();
    ctx.save(); ctx.translate(0, Math.sin(t * 2) * 1.5); ctx.fillStyle = '#f29db0'; ctx.beginPath(); ctx.ellipse(-2, 20, 25, 27, 0, 0, 6.283); ctx.fill(); circ(8, -12, 17, '#f29db0');
    const m = o.snout ?? eic((Math.sin(t * 1.2) + 1) / 2); ctx.fillStyle = '#e9a27f'; ctx.beginPath(); ctx.moveTo(20, -20); ctx.quadraticCurveTo(lerp(48, 40, m), lerp(-16, -20, m), lerp(50, 38, m), lerp(-6, 0, m)); ctx.quadraticCurveTo(lerp(32, 34, m), lerp(-2, 6, m), 20, -4); ctx.fill();
    const bl = 1 - blinkF(t + 0.8); circ(10, -16, 4 * bl + 0.5, '#20232f'); ctx.restore(); rr2(-38, -54, 18, 34, 9, 'rgba(255,255,255,0.6)'); },
  blueprint(t) { ctx.fillStyle = '#2f6fb5'; ctx.beginPath(); ctx.ellipse(0, 0, 62, 78, 0, 0, 6.283); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 62, 78, 0, 0, 6.283); ctx.clip(); for (let i = -4; i <= 4; i++) { rr2(i * 16 - 1, -80, 2, 160, 1, 'rgba(255,255,255,0.18)'); rr2(-70, i * 18 - 1, 140, 2, 1, 'rgba(255,255,255,0.18)'); }
    ctx.globalAlpha *= 0.55 + 0.45 * Math.sin(t * 2.5); dino(t, 8, 46, 0.16, { walk: 0.6 }); ctx.restore(); },
  o2(t) { circ(-18, 0, 30, '#8fd8e6'); circ(18, 0, 30, '#8fd8e6'); font(30, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('O₂', 0, 2); },
  dinoI(t) { dino(t, 30, 60, 0.26, { speed: 6 }); },
  rdrop(t) { ctx.fillStyle = BLOOD; ctx.beginPath(); ctx.moveTo(0, -40); ctx.bezierCurveTo(10, -18, 28, -2, 28, 14); ctx.arc(0, 14, 28, 0, Math.PI); ctx.bezierCurveTo(-28, -2, -10, -18, 0, -40); ctx.fill(); rr2(-14, 2, 8, 18, 4, 'rgba(255,255,255,0.55)'); },
  snowtooth(t) { ICONS.tooth(t); for (let i = 0; i < 8; i++) { const p = (t * 0.3 + i / 8) % 1; circ(-80 + ((i * 47) % 160), -90 + p * 180, 4, 'rgba(255,255,255,0.8)'); } },
});
Object.assign(IDLE, {
  dbone: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.08) }, stonebone: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) }, legbone: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.05), post: t => glint(t, 60, 100) },
  rbc: {}, fcells: { pre: t => { const b = 1 + Math.sin(t * 2.2) * 0.04; ctx.scale(b, b); } }, heme: {}, hemo: { pre: t => ctx.rotate(Math.sin(t * 0.9) * 0.2) }, octo: { pre: t => ctx.translate(0, Math.sin(t * 1.6) * 6) },
  microbe: {}, museum: { post: t => puff(t, 20, -100, 3, -1, 'rgba(90,90,100,0.45)', 14) }, mine: {}, scope: { post: t => glint(t, 50, 70, 3) }, pyrite: { post: t => glint(t, 60, 60) },
  elem: { post: t => glint(t, 58, 58, 3.1) }, laser: {}, leaf: {}, coffin: {}, quote: { pre: t => { const b = 1 + Math.max(0, Math.sin(t * 2.4)) * 0.04; ctx.scale(b, b); } },
  femur: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.05) }, vessels: {}, scales: {}, mosquito: { pre: t => ctx.translate(0, Math.sin(t * 3) * 5) }, shale: { post: t => glint(t, 100, 74, 3.2) }, bee: {},
  copal: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.06), post: t => glint(t, 74, 64) }, nodna: {}, ovalcell: {}, chicken: {}, ostrich: {}, moa: {}, scrapbook: {}, tooth: { post: t => glint(t, 58, 76) }, drawers: {}, ftree: {},
  egg: { pre: t => ctx.rotate(Math.sin(t * 1.7) * 0.05) }, blueprint: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.04) }, rdrop: { pre: t => ctx.scale(1 + Math.sin(t * 5) * 0.04, 1 - Math.sin(t * 5) * 0.04), post: t => glint(t, 30, 45) }, o2: { pre: t => ctx.translate(0, Math.sin(t * 2.5) * 5) }, dinoI: {}, snowtooth: { post: t => glint(t, 58, 76) },
});

// ---------- extra icons for the interacting-icon rework ----------
const _ovalI = ICONS.ovalcell;
const SA_PTS = [[-77, 8], [-72, 12], [-63, 11], [-60, 8], [-52, 5], [-50, 0], [-44, -2], [-35, -5], [-35, -9], [-39, -15], [-40, -22], [-48, -26], [-53, -34], [-58, -38], [-63, -41], [-65, -45], [-68, -50], [-69, -55], [-74, -52], [-73, -45], [-73, -37], [-71, -30], [-70, -18], [-76, -14], [-81, -6], [-80, -2], [-78, 2]];
Object.assign(ICONS, {
  dinoA(t, o) { dino(t, 14, 52, 0.24, o); },   // the feathered theropod as a cast actor (box hw 86 hh 58)
  mapSA(t, o) {   // South America with a hopping pin on north-east Brazil
    const k = 0.21, pt = ([lo, la]) => [(lo + 58) * 9 * k, -(la + 22) * 9 * k];
    circ(0, 0, 70, 'rgba(143,216,230,0.14)');
    ctx.fillStyle = '#7fc98a'; ctx.beginPath(); SA_PTS.forEach((p, i) => { const [a, b] = pt(p); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); SA_PTS.slice(0, 9).forEach((p, i) => { const [a, b] = pt(p); i ? ctx.lineTo(a, b - 2) : ctx.moveTo(a, b - 2); }); ctx.lineTo(...pt([-50, -6])); ctx.fill();
    const [px, py] = pt([-39.7, -7.2]), hop = Math.abs(Math.sin(t * 3)) * 5; ctx.save(); ctx.translate(px, py - hop); ctx.scale(0.55, 0.55);
    ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.arc(0, -46, 26, Math.PI * 0.85, Math.PI * 2.15); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); circ(0, -48, 10, '#fff'); ctx.restore(); },
  skel(t, o) { skeleton(t, 0, 6, 0.34, o.stone || 0); },
  slice(t, o) {   // a thin slice of bone with its blood-vessel canals; o.on lights the canals red
    circ(0, 0, 64, '#e6d6b6'); circ(0, 0, 58, '#d9c7a0');
    for (let i = 0; i < 14; i++) { const a = i * 2.4, r = (80 + (i * 53) % 200) * 0.19, x = Math.cos(a) * r, y = Math.sin(a) * r, on = o.on && i % 3 === 0;
      circ(x, y, 6.5, '#c9b48a'); circ(x, y, 4.2, '#b39a6a'); circ(x, y, on ? 2.6 + 0.8 * Math.sin(t * 4 + i) : 2.1, on ? '#e2457a' : '#5e4a2a'); }
    rr2(-40, -50, 34, 8, 4, 'rgba(255,255,255,0.35)'); },
  hairS(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.3) * 0.05); rr2(-34, -66, 68, 132, 30, '#5e3a24'); rr2(-26, -60, 14, 120, 7, 'rgba(255,255,255,0.18)'); for (let i = 0; i < 6; i++) rr2(-34, -54 + i * 22, 68, 5, 2.5, 'rgba(30,18,10,0.35)'); ctx.restore(); },
  fcell(t) { const b = 1 + Math.sin(t * 2.2) * 0.04; ctx.save(); ctx.scale(b, b); ctx.rotate(0.3); ell(0, 0, 30, 20, '#a8452f'); ell(-2, -2, 24, 15, '#c0603e'); circ(-9, -6, 5, 'rgba(255,220,180,0.45)'); ctx.restore(); },
  cells10(t) {   // 10 body cells: 8 red blood cells + 2 others
    for (let i = 0; i < 10; i++) { const x = -88 + (i % 5) * 44, y = -22 + Math.floor(i / 5) * 46, b = Math.sin(t * 3 + i) * 2;
      if (i < 8) rbcDisc(x, y + b, 19, 0.85, i); else { circ(x, y + b, 18, i === 8 ? '#9fc0f8' : '#ffd36b'); circ(x + 2, y + b + 2, 8, i === 8 ? '#6f9cf0' : '#e0a92a'); } } },
  lizard(t) { const w = Math.sin(t * 2.4);
    ctx.save(); ctx.translate(-50, 6); ctx.rotate(w * 0.15); ctx.fillStyle = '#4f9a5a'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.quadraticCurveTo(-40, -4 + w * 8, -58, 16 + w * 10); ctx.quadraticCurveTo(-30, 6, 0, 10); ctx.fill(); ctx.restore();
    for (const [lx, ph] of [[-30, 0], [26, 1.6]]) { ctx.save(); ctx.translate(lx, 14); ctx.rotate(Math.sin(t * 5 + ph) * 0.3); rr2(-5, 0, 10, 26, 5, '#3f7f4c'); ctx.restore(); }
    ell(-6, 4, 52, 20, '#5fae6a'); ell(-6, 12, 40, 9, '#9ad08a'); circ(48, -2, 20, '#5fae6a'); ell(64, 2, 16, 11, '#5fae6a'); circ(52, -8, 5 * (1 - blinkF(t + 0.6)) + 0.6, '#20232f');
    const tg = Math.max(0, Math.sin(t * 3)) ** 8; if (tg > 0.05) rr2(76, 2, 22 * tg, 4, 2, '#e2457a'); for (let i = 0; i < 4; i++) circ(-36 + i * 18, -8, 4, '#3f7f4c'); },
  crystal(t) {   // a dark manganese-mineral cluster (hausmannite)
    const prism = (x, h, w, a, c1, c2) => { ctx.save(); ctx.translate(x, 50); ctx.rotate(a); poly([[-w, 0], [-w, -h], [0, -h - w * 1.2], [0, 0]], c1); poly([[0, 0], [0, -h - w * 1.2], [w, -h], [w, 0]], c2); ctx.restore(); };
    ell(0, 52, 56, 10, 'rgba(0,0,0,0.18)'); prism(-30, 60, 18, -0.35, '#4a3a3a', '#6b5555'); prism(30, 54, 16, 0.4, '#4a3a3a', '#6b5555'); prism(0, 90, 22, 0, '#5a4646', '#7d6565'); },
  protein(t) {   // a folded chain of amino-acid beads that wriggles
    const P = []; for (let i = 0; i < 9; i++) { const a = i * 0.9 + Math.sin(t * 1.5 + i * 0.6) * 0.25; P.push([Math.cos(a) * (20 + i * 4.5), Math.sin(a) * (16 + i * 4)]); }
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    P.forEach(([x, y], i) => { circ(x, y, 13, ['#ffd98a', '#ff8f4a', '#8fd8e6', '#b48cff'][i % 4]); circ(x - 4, y - 4, 4, 'rgba(255,255,255,0.5)'); }); },
  bonepile(t) { [[-40, 24, 0.3], [36, 28, -0.4], [0, 4, 0.1], [-24, -20, -0.6], [28, -26, 0.5]].forEach(([x, y, a], i) => { ctx.save(); ctx.translate(x, y + Math.sin(t * 2 + i) * 2); ctx.rotate(a); ctx.scale(0.5, 0.5); ICONS.dbone(t); ctx.restore(); }); },
  rbcN(t, o) { rbcDisc(0, 0, 58, 0.92, Math.sin(t) * 0.15); if (o.n) { ell(0, 0, 22, 16, '#7f5fd6'); circ(-6, -5, 5, 'rgba(255,255,255,0.35)'); } },
  nucleusI(t) { const p = 1 + Math.sin(t * 3) * 0.06; ell(0, 0, 34 * p, 26 * p, '#7f5fd6'); ell(4, 4, 24, 17, '#6a4cc4'); ctx.strokeStyle = '#c9b8ff'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = -18; x <= 18; x += 3) ctx.lineTo(x, Math.sin(x * 0.4 + t * 4) * 6); ctx.stroke(); circ(-12, -10, 6, 'rgba(255,255,255,0.35)'); },
  clap(t) {   // a movie clapperboard that snaps shut
    const op = Math.max(0, Math.sin(t * 2.5)) ** 4 * 0.5; rr2(-66, -20, 132, 80, 8, '#3a3f5a'); for (let i = 0; i < 4; i++) rr2(-50 + i * 30, 0, 18, 8, 3, 'rgba(255,255,255,0.35)');
    ctx.save(); ctx.translate(-66, -22); ctx.rotate(-op); rr2(0, -22, 132, 22, 5, '#f3f7fb'); for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(10 + i * 26, -22); ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(12, 0); ctx.lineTo(24, 22); ctx.lineTo(12, 22); ctx.fill(); ctx.restore(); } ctx.restore();
    font(17, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('THE MOVIE', 0, 36); },
  chloro(t) {   // chlorophyll: the same kind of ring as heme, with magnesium in the middle and a long tail
    ctx.save(); ctx.rotate(Math.sin(t * 0.8) * 0.15); ctx.fillStyle = '#5fae6a'; ctx.beginPath(); ctx.roundRect(-46, -46, 92, 92, 30); ctx.roundRect(-32, -32, 64, 64, 20); ctx.fill('evenodd');
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); ctx.translate(0, -50); ctx.fillStyle = '#3f7f4c'; ctx.beginPath(); for (let k = 0; k < 5; k++) { const a = k / 5 * 6.283 - Math.PI / 2; ctx.lineTo(Math.cos(a) * 19, Math.sin(a) * 19); } ctx.fill(); ctx.restore(); }
    ctx.save(); ctx.translate(34, 34); ctx.rotate(0.6 + Math.sin(t * 2) * 0.1); rr2(0, -6, 40, 12, 6, '#9ad08a'); ctx.restore();
    circ(0, 0, 21, '#9ad08a'); font(17, 700); ctx.fillStyle = '#1f5a3a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Mg', 0, 1); ctx.restore(); },
  ovalcell(t, o) { const q = o.sq || 0; ctx.save(); ctx.scale(1 + 0.25 * q, 1 - 0.45 * q); _ovalI(t, o); ctx.restore(); },
});
Object.assign(IDLE, { dinoA: {}, mapSA: { pre: t => ctx.rotate(Math.sin(t * 1.1) * 0.04) }, skel: {}, slice: { pre: t => ctx.rotate(t * 0.15) }, hairS: {}, fcell: {}, cells10: { pre: t => { const b = 1 + Math.sin(t * 2) * 0.03; ctx.scale(b, b); } },
  lizard: { pre: t => ctx.translate(Math.sin(t * 1.2) * 4, 0) }, crystal: { post: t => glint(t, 56, 64, 2.8) }, protein: { pre: t => ctx.rotate(Math.sin(t * 0.7) * 0.2) }, bonepile: {}, rbcN: {}, nucleusI: {}, clap: {}, chloro: {} });
// half box sizes (icon units) for the overlap audit
const HB = { dinoA: [86, 58], rbc: [60, 56], rbcN: [60, 56], rdrop: [30, 44], heme: [66, 66], chloro: [70, 70], hemo: [60, 58], fcells: [64, 64], fcell: [34, 26], dbone: [80, 60], stonebone: [80, 60], legbone: [50, 135], femur: [52, 130],
  octo: [66, 90], microbe: [80, 40], museum: [104, 104], mine: [96, 90], scope: [66, 80], pyrite: [64, 64], elem: [60, 60], laser: [96, 34], leaf: [66, 50], coffin: [94, 72], quote: [100, 88], vessels: [100, 50],
  scales: [108, 90], mosquito: [70, 50], shale: [106, 76], bee: [30, 52], copal: [80, 68], dna: [44, 66], nodna: [60, 66], ovalcell: [74, 48], chicken: [90, 80], ostrich: [66, 110], moa: [70, 140], scrapbook: [110, 62],
  tooth: [60, 80], snowtooth: [82, 92], drawers: [90, 88], ftree: [72, 80], egg: [62, 80], blueprint: [64, 80], o2: [50, 32], mapSA: [50, 68], skel: [104, 26], slice: [66, 66], hairS: [38, 66], cells10: [110, 48],
  lizard: [104, 40], crystal: [56, 64], protein: [70, 64], bonepile: [84, 60], nucleusI: [36, 28], clap: [70, 62], flask: [44, 50], muscle: [76, 60], drop: [30, 44], donut: [50, 50], snow: [60, 60], trophy: [56, 46], thermo: [36, 92] };
function I(ic, x, y, s, t0, o = {}) { const h = HB[ic]; return A(ic, x, y, s, t0, h ? { hw: h[0], hh: h[1], ...o } : o); }
const DN = (x, y, s, t0, o = {}) => I('dinoA', x, y, s, t0, o);
const EL = (sym, name, col, x, y, s, t0, o = {}) => I('elem', x, y, s, t0, { o: { sym, name, col }, ...o });
const CAL = (m, d, x, y, s, t0, o = {}) => A('calDay', x, y, s, t0, { o: { m, d }, ...o });
function CB(list, end) {   // the earliest actor of every story beat is already there when the line starts, so no line opens on an empty screen
  list.forEach(b => { if (b.q || !b.cast || !b.cast.length) return; const b0 = T(b.at); let first = null;
    b.cast.forEach(a => { if (a.follow || a.orbit) return; if (!first || T(a.t0) < T(first.t0)) first = a; });
    if (first && T(first.t0) > b0 + 0.3) first.t0 = b0 + 0.15; });
  return chainB(list, end);
}


// ---------- scenes (beats: icons pop in on their words and act on each other) ----------
function ground(t) { rr2(0, 800, W, 280, 0, '#a8754a'); rr2(0, 800, W, 22, 0, '#c18a58'); for (let i = 0; i < 9; i++) circ((i * 263 + 80) % W, 880 + (i * 47) % 150, 10 + (i % 3) * 6, 'rgba(90,50,30,0.25)'); }
function mud(t) { rr2(0, 780, W, 300, 0, '#4a3a2e'); rr2(0, 780, W, 20, 0, '#5e4a3a'); for (let i = 0; i < 7; i++) { const p = (t * 0.3 + i / 7) % 1; circ(150 + i * 260, 860 - p * 60, 6 + 4 * Math.sin(p * Math.PI), `rgba(120,100,80,${0.5 * Math.sin(p * Math.PI)})`); } }
function strata(t) {   // layers of sediment pile up over the buried skeleton
  const k = clamp((t - S('f3')) / 6);
  for (let i = 0; i < 5; i++) { const y = lerp(1080, 560 + i * 52, clamp(k * 5 - i)); rr2(0, y, W, 1080 - y, 0, ['#b98a5a', '#9a6a42', '#c49a68', '#8f6040', '#b07a50'][i]); }
}
function ladder(t) {   // a long DNA ladder whose rungs snap: half of what is left every "half-life"
  const hl = 1.6, y0 = 360;
  for (let i = 0; i < 40; i++) { const x = 160 + i * 41, ph = t * 2 + i * 0.5, y1 = y0 + Math.sin(ph) * 50, y2 = y0 - Math.sin(ph) * 50; const r = rng(i * 7 + 1)(), broken = r > Math.pow(0.5, Math.max(0, (t - T('x6:half') + 0.2) / hl));
    if (!broken) rr2(x - 2, Math.min(y1, y2), 4, Math.abs(y1 - y2) + 1, 2, 'rgba(255,255,255,0.7)'); circ(x, y1 + (broken ? 20 : 0), 11, '#ff8f4a'); circ(x, y2 - (broken ? 20 : 0), 11, '#8fd8e6'); }
  reg('hero', 'dna strand', 130, y0 - 90, 1790, y0 + 90);
}

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, t > S('c3') - 0.1 && t < S('c4q') - 0.1 ? 'teal' : 'night');
  beats(t, CB([
    { at: 0, q: 'c1', cast: [DN(520, 580, 3.0, 'c1:scientists'), I('rdrop', 1250, 560, 3.6, 'c1:dinosaur', { hit: ['c1:blood'] }), A('magnifier', 1700, 300, 1.7, 'c1:find', { mv: [['c1:blood', 1390, 430, 60]] })] },
    { at: 'c2', cast: [CAL('NOV', '2026', 330, 500, 1.9, 'c2:november'), A('docV', 760, 500, 2.0, 'c2:published', { o: { title: 'PNAS STUDY', ticks: 0 }, pulse: ['c2:study'] }), I('mapSA', 1270, 540, 2.6, 'c2:brazil'),
      I('dbone', 1680, 300, 1.5, 'c2:bone', { mv: [['c2:brazil+0.3', 1340, 430, 90]], hit: ['c2:brazil+0.3'] })],
      lab: [['NOVEMBER 2026 · A DINOSAUR BONE FROM BRAZIL', 'c2:brazil', 960, 965, WHITE, 32]] },
    { at: 'c2:inside', cast: [I('stonebone', 380, 520, 2.4, 'c2:inside', { shake: ['c2:found', 0.6] }), I('fcells', 380, 520, 2.3, 'c2:tiny', { mv: [['c2:oval', 900, 500, 120]] }),
      I('rdrop', 1450, 500, 3.0, 'c2:heart', { morph: ['c2:heme', 'heme'] })],
      fx: [['stream', 1, 2, 'c2:chemical', 'c2>', { col: '#ff8f9c', n: 8 }]], lab: [['TINY OVAL CELLS', 'c2:oval', 900, 800, WHITE, 32]], tag: [['HEME', 'c2:heme', 1450, 830, '#5b4fd6', 40]] },
    { at: 'c3', cast: [DN(450, 640, 3.0, 'c3', { o: { speed: 5 } }), A('hglass', 1080, 450, 1.7, 'c3:115'), A('trophy', 1150, 750, 1.8, 'c3:oldest', { hw: 56, hh: 46, pulse: ['c3:found'] }), A('flask', 1600, 720, 2.0, 'c3:chemistry', { hw: 44, hh: 52, hit: ['c3:chemistry+0.1'] })],
      fx: [['stream', 0, 2, 'c3:oldest', 'c3>', { col: '#ffd98a', n: 7 }]], num: [['c3:115', 1520, 400, '115 MILLION', 'YEARS OLD']], lab: [['OLDEST BLOOD EVER · FIRST PROVEN WITH CHEMISTRY', 'c3:first', 1000, 965, GOLD, 30]] },
    QB('c4q', [DN(620, 600, 2.6, 'c4q+0.2'), A('dna', 1100, 520, 2.0, 'c4q:clone', { hw: 44, hh: 66 }), DN(1100, 520, 1.2, 'c4q:dinosaur', { mv: [['c4q:dinosaur+0.8', 1300, 760, 60]] })]),
    { at: 'c4', cast: [I('clap', 960, 260, 1.6, 'c4:jurassic', { out: 'c4:what' }), I('rdrop', 420, 540, 2.4, 'c4:blood'), I('dbone', 960, 540, 2.2, 'c4:bone', { morph: ['c4:stone', 'stonebone'] }), A('dna', 1400, 540, 2.0, 'c4:molecules', { hw: 44, hh: 66 }), A('hglass', 1660, 540, 1.6, 'c4:long', { pulse: ['c4:last'] })],
      lab: [['BLOOD', 'c4:blood', 420, 820, WHITE, 34], ['STONE', 'c4:stone', 960, 820, WHITE, 34], ['TIME', 'c4:last', 1530, 820, WHITE, 34], ['THE JURASSIC PARK QUESTION', 'c4:jurassic', 960, 965, GOLD, 32]] },
    { at: 'c5', cast: [I('clap', 300, 250, 1.4, 'c5:movie'), DN(500, 620, 2.6, 'c5:dinosaur#1', { hit: ['c5:bit+0.3'] }), A('dna', 1600, 500, 2.0, 'c5:dna', { hw: 44, hh: 66, pulse: ['c5:amber+0.6'] }),
      I('mosquito', 1250, 260, 1.6, 'c5:mosquito', { mv: [['c5:bit+0.3', 660, 470, 60], ['c5:stuck', 1050, 560, 90]], out: 'c5:amber+0.2' }), I('copal', 1050, 560, 2.3, 'c5:amber', { o: { inside: 'mosquito' } }), A('magnifier', 1500, 860, 1.4, 'c5:see', { mv: [['c5:holds', 1180, 760, 60]] })],
      fx: [['stream', 4, 2, 'c5:amber+0.4', 'c5>', { col: '#ffd98a', n: 8 }]], lab: [['THE MOVIE PLAN', 'c5:movie', 960, 110, GOLD, 36]] },
  ], 'b1'));
}
// ---------- 1 what blood is made of ----------
function sBlood(t) {
  worldBG(t, 'coral');
  beats(t, CB([
    QB('b1', [I('rdrop', 720, 560, 3.0, 'b1+0.2'), A('magnifier', 1150, 360, 1.5, 'b1:made', { mv: [['b1>', 900, 440]] })]),
    { at: 'b2', cast: [I('rbc', 330, 540, 2.8, 'b2:red', { pulse: ['b2:25'] }), I('cells10', 960, 560, 2.2, 'b2:eight', { pulse: ['b2:ten'] }), A('adult', 1600, 560, 2.3, 'b2:you', { o: { col: '#5b4fd6' } })],
      fx: [['stream', 0, 2, 'b2:have', 'b2>', { ic: 'rbc', s: 0.3, n: 9, arc: 140 }]], num: [['b2:25', 960, 220, '~25 TRILLION', 'RED BLOOD CELLS']], lab: [['MORE THAN 8 IN 10 OF YOUR CELLS', 'b2:eight', 960, 965, GOLD, 32]] },
    { at: 'b3', cast: [I('rbc', 380, 560, 2.9, 'b3', { pulse: ['b3:hemoglobin', 'b3:hemoglobin+0.5'] }), I('hemo', 1000, 640, 2.1, 'b3:every'), I('heme', 1000, 640, 2.1, 'b3:rings', { mv: [['b3:heme', 1520, 620, 100]], pulse: ['b3:iron'], glow: 'rgba(255,143,74,0.35)' })],
      fx: [['stream', [1300, 560], 0, 'b3:stuffed', 'b3:hemoglobin+0.6', { ic: 'hemo', s: 0.45, n: 8 }]], num: [['b3:270', 1060, 250, '~270 MILLION', 'HEMOGLOBIN IN EACH CELL']], lab: [['4 HEME RINGS · IRON IN THE MIDDLE', 'b3:iron', 1000, 965, WHITE, 30]] },
    { at: 'b3b', cast: [I('rdrop', 300, 500, 2.2, 'b3b:drop', { mv: [['b3b:microscope+0.4', 620, 420, 80]], out: 'b3b:see' }), I('scope', 720, 520, 2.4, 'b3b:microscope'), I('rbc', 1230, 520, 2.6, 'b3b:soft', { pulse: ['b3b:dented'] }), I('donut', 1640, 520, 2.0, 'b3b:donut', { morph: ['b3b:hole', 'rbc'], hit: ['b3b:hole'] })],
      fx: [['stream', 1, 2, 'b3b:see', 'b3b:soft+0.6', { ic: 'rbc', s: 0.28, n: 6 }]], lab: [['SOFT RED DISCS · DENTED IN THE MIDDLE', 'b3b:soft', 960, 965, WHITE, 32]] },
    QB('b4q', [I('heme', 760, 560, 2.6, 'b4q+0.2', { pulse: ['b4q:iron'] }), I('rdrop', 1150, 560, 2.0, 'b4q:red', { hit: ['b4q:red+0.1'] })]),
    { at: 'b5', cast: [A('lungs', 300, 520, 2.4, 'b5:lungs'), I('heme', 470, 540, 1.6, 'b5:heme', { mv: [['b5:lets', 1380, 540, 140]] }),
      I('o2', 300, 280, 1.6, 'b5:oxygen', { mv: [['b5:lungs', 470, 380, 50], ['b5:lets', 1380, 380, 140], ['b5:muscles', 1600, 300, 40]] }), I('muscle', 1620, 560, 2.4, 'b5:muscles', { pulse: ['b5:muscles+0.4'] }), I('rdrop', 960, 290, 1.7, 'b5:chemistry', { hit: ['b5:red'] })],
      lab: [['IRON GRABS OXYGEN · IRON CHEMISTRY = RED', 'b5:grabs', 960, 965, GOLD, 30]] },
    { at: 'b6', cast: [I('rbc', 330, 520, 2.3, 'b6:red', { grey: 'b6:months', erase: 'b6:so' }), CAL('LIVES', '4 MO', 330, 520, 1.6, 'b6:four', { out: 'b6:so' }), I('femur', 900, 520, 2.3, 'b6:marrow', { pulse: ['b6:makes'] }), A('stopwatch', 1600, 500, 2.0, 'b6:second')],
      fx: [['stream', 2, [1600, 280], 'b6:makes', 'b6>', { ic: 'rbc', s: 0.4, n: 12, sp: 1.2, arc: 80 }], ['stream', 2, [1250, 760], 'b6:two', 'b6>', { ic: 'rbc', s: 0.4, n: 10, sp: 1.1, arc: -60 }]],
      tag: [['~2 MILLION NEW ONES EVERY SECOND', 'b6:two', 960, 965, '#9b3352', 36]] },
    QB('b7q', [I('rdrop', 760, 560, 2.6, 'b7q+0.2'), I('drop', 1150, 560, 2.2, 'b7q:red', { pulse: ['b7q:red+0.2'] })]),
    { at: 'b8', cast: [I('octo', 420, 520, 2.6, 'b8:octopuses'), EL('Cu', 'COPPER', '#c8753d', 960, 400, 1.6, 'b8:copper', { hit: ['b8:iron+0.3'] }), EL('Fe', 'IRON', '#5b6585', 1400, 400, 1.6, 'b8:iron', { push: [['b8:iron+0.3', 260, -40]], grey: 'b8:iron+0.5' }),
      I('drop', 960, 690, 2.0, 'b8:blue', { pulse: ['b8:blue+0.3'] })],
      fx: [['stream', 1, 0, 'b8:carry', 'b8>', { col: '#5b8dd6', n: 8 }]], lab: [['COPPER → BLUE BLOOD', 'b8:blue', 960, 965, '#9fd3ff', 32]] },
    { at: 'b8:but', cast: [DN(480, 600, 2.7, 'b8:dinosaurs'), I('chicken', 1060, 380, 1.5, 'b8:birds'), I('lizard', 1060, 700, 1.6, 'b8:reptiles'), I('rdrop', 1500, 540, 2.6, 'b8:red', { hit: ['b8:heme'] }), I('heme', 1500, 560, 1.0, 'b8:heme', { mv: [['b8:heme+0.6', 1760, 380, 60]] })],
      fx: [['stream', 0, 3, 'b8:ran', 'b8>', { col: '#ff6f7a', n: 8 }]], lab: [['RED, WITH HEME · JUST LIKE YOURS', 'b8:yours', 960, 965, '#ffd0d6', 32]] },
  ], 'f1'));
}
// ---------- 2 how a bone turns to stone ----------
function sFossil(t) {
  worldBG(t, 'gold');
  beats(t, CB([
    QB('f1', [I('dbone', 760, 560, 2.6, 'f1+0.2', { morph: ['f1:fossil', 'stonebone'] }), A('magnifier', 1160, 380, 1.4, 'f1:become', { mv: [['f1>', 940, 470]] })]),
    { at: 'f2', bg: ground, cast: [DN(960, 700, 3.2, 'f2', { o: tt => ({ walk: tt < T('f2:dies') ? 1 : 0, dead: tt > T('f2:dies') }), morph: ['f2:weeks', 'skel'], hh: 46 }),
      I('microbe', 1650, 300, 1.7, 'f2:bacteria', { mv: [['f2:eat', 1180, 560, 60]], pulse: ['f2:skin', 'f2:muscle', 'f2:blood'] }), I('microbe', 280, 300, 1.7, 'f2:bacteria+0.3', { flip: 1, mv: [['f2:eat+0.3', 740, 560, 60]], pulse: ['f2:skin+0.1', 'f2:muscle+0.1', 'f2:blood+0.1'] }),
      I('muscle', 960, 300, 1.4, 'f2:muscle', { mv: [['f2:muscle+0.7', 1240, 520]], erase: 'f2:blood' }), I('rdrop', 960, 300, 1.4, 'f2:blood', { mv: [['f2:blood+0.6', 700, 520]], erase: 'f2:blood+0.8' })],
      lab: [['SOFT PARTS GONE IN WEEKS', 'f2:weeks', 960, 130, WHITE, 36]] },
    { at: 'f3', bg: strata, cast: [I('skel', 960, 880, 3.2, 'f3', { o: tt => ({ stone: clamp((tt - T('f3:millions')) / 2.5) }), pulse: ['f3:rock'] }),
      I('drop', 420, 260, 1.5, 'f3:water', { mv: [['f3:seeps', 620, 470, 40], ['f3:leaves', 760, 520]], out: 'f3:minerals+0.4' }), I('drop', 1500, 260, 1.5, 'f3:water+0.2', { mv: [['f3:seeps+0.2', 1300, 470, 40], ['f3:leaves', 1160, 520]], out: 'f3:minerals+0.4' }),
      I('crystal', 1680, 300, 1.7, 'f3:minerals', { mv: [['f3:pore', 1200, 470, 60]], out: 'f3:over' }), A('hglass', 400, 330, 1.8, 'f3:millions', { pulse: ['f3:becomes'] })],
      fx: [['stream', 4, [960, 860], 'f3:minerals', 'f3:over', { col: '#ffffff', n: 10 }]], lab: [['BURIED FAST · MINERALS FILL EVERY PORE', 'f3:buried', 960, 120, WHITE, 32]], tag: [['BONE BECOMES ROCK', 'f3:rock', 1350, 300, '#9b6a44', 40]] },
    QB('f4q', [I('rdrop', 760, 560, 2.6, 'f4q+0.2', { erase: 'f4q:gone' }), A('hglass', 1150, 540, 1.8, 'f4q:long')]),
    { at: 'f5', cast: [A('doctor', 300, 560, 2.2, 'f5:scientists'), I('muscle', 760, 480, 1.9, 'f5:soft', { grey: 'f5:rots', erase: 'f5:rots+0.4' }), I('microbe', 760, 740, 1.4, 'f5:rots', { mv: [['f5:rots+0.4', 760, 560, 40]] }),
      A('dna', 1180, 500, 2.2, 'f5:molecules', { hw: 44, hh: 66, shake: ['f5:fall', 0.6], erase: 'f5:apart' }), I('dbone', 1600, 500, 2.2, 'f5:hard', { pulse: ['f5:stay'] }), A('check', 1600, 760, 1.2, 'f5:stay')],
      lab: [['WHAT SCIENTISTS ASSUMED FOR 100+ YEARS', 'f5:assumed', 960, 120, WHITE, 32]] },
    { at: 'f6', cast: [I('dbone', 520, 500, 2.7, 'f6', { erase: 'f6:don' }), I('stonebone', 520, 500, 2.7, 'f6:copy', { mv: [['f6:stone', 1380, 500, 120]], pulse: ['f6:survives'] }), A('dna', 520, 500, 1.5, 'f6:molecules', { hw: 44, hh: 66, erase: 'f6:don+0.2' })],
      tag: [['A COPY IN STONE', 'f6:copy', 1380, 800, '#9b6a44', 40]], lab: [['THE SHAPE SURVIVES · THE MOLECULES DON\'T', 'f6:shape', 960, 965, WHITE, 32]] },
  ], 'd1'));
}
// ---------- 3 a dinosaur from Brazil ----------
function sDino(t) {
  worldBG(t, 'teal');
  beats(t, CB([
    QB('d1', [DN(760, 600, 2.6, 'd1+0.2'), A('magnifier', 1180, 380, 1.4, 'd1:dinosaur', { mv: [['d1>', 960, 440]] })]),
    { at: 'd2', cast: [DN(600, 640, 3.2, 'd2:arato', { o: tt => ({ roar: tt > T('d2:eater') && tt < T('d2:eater+1.2') }) }), A('ham', 1250, 300, 1.5, 'd2:meat', { mv: [['d2:eater+0.3', 860, 420, 60]], out: 'd2:about' }),
      A('adult', 1500, 600, 2.4, 'd2:three', { o: { col: '#3fae6a' } })],
      tag: [['ARATASAURUS', 'd2:arato', 600, 160, '#0b4f5c', 48]], lab: [['SMALL · FEATHERED · MEAT-EATER · ~3 M LONG', 'd2:feathered', 960, 965, WHITE, 30]] },
    { at: 'd2:ran', cast: [DN(380, 620, 2.6, 'd2:ran', { o: { speed: 9 }, mv: [['d2:brazil', 560, 600]] }), I('mapSA', 1100, 520, 2.6, 'd2:brazil', { pulse: ['d2:brazil+0.3'] }), A('hglass', 1640, 520, 1.8, 'd2:hundred')],
      lab: [['NE BRAZIL · 115 MILLION YEARS AGO', 'd2:hundred', 960, 965, GOLD, 32]] },
    { at: 'd3', cast: [DN(400, 620, 2.6, 'd3', { morph: ['d3:leg', 'legbone'], hw: 68, hh: 52, shake: ['d3:fire', 0.7], pulse: ['d3:survived'] }), I('museum', 1100, 520, 2.4, 'd3:museum', { o: tt => ({ fire: tt > T('d3:burned') }) }),
      CAL('FIRE', '2018', 1640, 500, 1.6, 'd3:2018')],
      fx: [['stream', 1, 0, 'd3:fossil', 'd3>', { col: '#ffd98a', n: 6 }]], lab: [['NAMED FOR BRAZIL\'S NATIONAL MUSEUM', 'd3:name', 1100, 830, WHITE, 28]], tag: [['THE FOSSIL SURVIVED THE FIRE', 'd3:survived', 960, 965, '#3f8f6a', 36]] },
    { at: 'd3b', cast: [A('shovel', 300, 500, 2.0, 'd3b:dug', { shake: ['d3b:dug+0.2', 0.8], mv: [['d3b:mine', 560, 470, 60]] }), I('mine', 760, 540, 2.3, 'd3b:gypsum'), I('mapSA', 1250, 540, 2.2, 'd3b:town'),
      DN(1640, 560, 1.6, 'd3b:four', { pulse: ['d3b:old'] })],
      lab: [['2008 · GYPSUM MINE · SANTANA DO CARIRI', 'd3b:2008', 900, 965, WHITE, 30], ['~4 YEARS OLD', 'd3b:four', 1640, 770, GOLD, 32]] },
    QB('d4q', [I('legbone', 760, 560, 1.9, 'd4q+0.2'), I('rdrop', 1150, 360, 1.6, 'd4q:blood', { mv: [['d4q:inside', 820, 540, 60]] })]),
    { at: 'd5', cast: [I('slice', 520, 520, 3.4, 'd5', { o: tt => ({ on: tt > T('d5:vessels') }) }), I('vessels', 1250, 300, 1.4, 'd5:vessels', { mv: [['d5:ran', 640, 480, 80]], out: 'd5:team' }),
      I('slice', 520, 520, 1.3, 'd5:slices', { mv: [['d5:slices+0.7', 1000, 560, 80]] }), I('slice', 520, 520, 1.3, 'd5:slices+0.2', { mv: [['d5:slices+0.9', 1060, 760, 80]] }), I('scope', 1500, 540, 2.5, 'd5:electron')],
      fx: [['stream', 2, 4, 'd5:scanned', 'd5>', { col: '#8fd8e6', n: 7 }]], lab: [['BLOOD-VESSEL CANALS INSIDE THE BONE', 'd5:canals', 960, 110, GOLD, 32], ['THIN SLICES · ELECTRON MICROSCOPE', 'd5:electron', 960, 965, WHITE, 30]] },
    { at: 'd6', cast: [I('fcells', 400, 500, 2.8, 'd6:clusters', { pulse: ['d6:oval'] }), I('hairS', 900, 520, 2.6, 'd6:hair'), I('fcell', 400, 500, 1.6, 'd6:each', { mv: [['d6:20', 1340, 520, 80]] }), I('rbc', 1700, 520, 0.42, 'd6:twice', { pulse: ['d6:red'] })],
      lab: [['HUMAN HAIR', 'd6:hair', 900, 800, WHITE, 28], ['FOSSIL CELL ~20 µm', 'd6:20', 1340, 680, GOLD, 28], ['YOURS ~8 µm', 'd6:twice', 1700, 800, '#ffb0bc', 28], ['CLUSTERS OF OVAL BODIES', 'd6:clusters', 400, 800, WHITE, 28]] },
  ], 'p1'));
}
// ---------- 4 proving it's blood ----------
function sProof(t) {
  worldBG(t, 'indigo');
  beats(t, CB([
    QB('p1', [I('stonebone', 760, 560, 2.4, 'p1+0.2'), A('magnifier', 1170, 360, 1.4, 'p1:speck', { mv: [['p1:blood', 900, 470]] })]),
    { at: 'p2', cast: [CAL('YEAR', '1997', 330, 500, 1.9, 'p2:1997'), I('rbc', 820, 520, 2.4, 'p2:round', { morph: ['p2:pyrite', 'pyrite'], hit: ['p2:pyrite'] }), A('magnifier', 1300, 300, 1.5, 'p2:turned', { mv: [['p2:pyrite', 960, 420, 60]] }),
      I('pyrite', 1500, 560, 1.7, 'p2:grew', { pulse: ['p2:death'] })],
      fx: [['burst', 1, 'p2:gold', '#ffd98a']], lab: [['ROUND SPECKS THAT LOOKED LIKE BLOOD CELLS', 'p2:round', 960, 110, WHITE, 30]], tag: [['PYRITE · FOOL\'S GOLD', 'p2:pyrite', 960, 965, '#a8862a', 38]] },
    { at: 'p3', cast: [A('doctor', 300, 560, 2.2, 'p3:team'), EL('Fe', 'IRON', '#c8553d', 760, 330, 1.5, 'p3:iron', { mv: [['p3:blocks', 1060, 640, 60]], out: 'p3:heme' }), EL('C', 'CARBON', '#3a3f5a', 1150, 330, 1.5, 'p3:carbon', { mv: [['p3:blocks+0.1', 1150, 600, 40]], out: 'p3:heme' }),
      EL('N', 'NITROGEN', '#127b84', 1540, 330, 1.5, 'p3:nitrogen', { mv: [['p3:blocks+0.2', 1240, 640, 60]], out: 'p3:heme' }), I('heme', 1150, 640, 2.0, 'p3:heme', { pulse: ['p3:heme+0.3'] })],
      lab: [['THE BUILDING BLOCKS OF HEME', 'p3:building', 960, 965, GOLD, 32]] },
    { at: 'p3:laser', cast: [I('laser', 360, 520, 2.0, 'p3:laser'), I('heme', 960, 520, 2.4, 'p3:ring', { hit: ['p3:ring+0.2'], pulse: ['p3:heme#1'] }), A('flask', 1540, 520, 2.2, 'p3:lab', { hw: 44, hh: 52 }), A('check', 1540, 260, 1.1, 'p3:heme#1')],
      fx: [['zap', 0, 1, 'p3:ring', 0.6, '#ff5d73'], ['stream', 2, 1, 'p3:pointed', 'p3>', { col: '#ffd98a', n: 7 }]], tag: [['PORPHYRINS', 'p3:porphyrins', 960, 820, '#5b4fd6', 38]], lab: [['LASER TESTS · LAB ANALYSIS → HEME', 'p3:lab', 960, 965, WHITE, 30]] },
    { at: 'p4', cast: [I('leaf', 380, 520, 2.4, 'p4:chlorophyll'), I('chloro', 380, 520, 2.0, 'p4:pigment', { mv: [['p4:plants', 860, 520, 90]] }), A('cross', 860, 520, 1.1, 'p4:ring'), I('heme', 1450, 520, 2.2, 'p4:similar', { pulse: ['p4:ring'] })],
      lab: [['CHLOROPHYLL RULED OUT · A VERY SIMILAR RING', 'p4:green', 960, 965, WHITE, 30]] },
    QB('p5q', [A('hglass', 760, 560, 2.2, 'p5q+0.2'), I('heme', 1150, 560, 1.8, 'p5q:hundred')]),
    { at: 'p6', bg: mud, cast: [DN(620, 520, 2.6, 'p6:dinosaur', { mv: [['p6:buried+0.4', 620, 740, 30]], o: { walk: 0 } }), I('o2', 1300, 420, 2.0, 'p6:oxygen', { grey: 'p6:little', shake: ['p6:little', 0.6] }), A('cross', 1300, 640, 1.0, 'p6:little')],
      lab: [['BURIED FAST · MUD WITH LITTLE OXYGEN', 'p6:mud', 960, 120, WHITE, 32]] },
    { at: 'p6:then', cast: [I('fcells', 600, 520, 2.6, 'p6:then', { morph: ['p6:coffin', 'coffin'], pulse: ['p6:sealed'] }), EL('Mn', 'MANGANESE', '#8a6ad6', 1500, 300, 1.5, 'p6:manganese'), I('crystal', 1500, 600, 1.8, 'p6:horse', { mv: [['p6:coated', 800, 560, 80]], out: 'p6:sealed' })],
      fx: [['stream', 2, 0, 'p6:horse+0.3', 'p6:sealed', { col: '#6b5555', n: 10, r: 10 }]], tag: [['HAUSMANNITE', 'p6:horse', 1500, 820, '#6b5a4a', 38]], lab: [['SEALED LIKE A TINY STONE COFFIN', 'p6:sealed', 960, 965, WHITE, 32]] },
  ], 'k1'));
}
// ---------- 5 the skeptics ----------
function sSkeptic(t) {
  worldBG(t, 'grey');
  beats(t, CB([
    QB('k1', [I('scales', 760, 560, 2.2, 'k1+0.2'), A('question', 1150, 400, 1.2, 'k1:convinced')]),
    { at: 'k2', cast: [A('doctor', 330, 560, 2.3, 'k2:paleontologist'), I('dbone', 1000, 520, 2.6, 'k2:heme', { glow: 'rgba(180,140,255,0.55)', pulse: ['k2:whole'] }), A('magnifier', 1480, 280, 1.5, 'k2:signal', { mv: [['k2:whole', 1130, 420, 60]] }),
      I('fcells', 1550, 620, 1.7, 'k2:round', { grey: 'k2:cells+0.2' })],
      tag: [['MARY SCHWEITZER', 'k2:mary', 330, 830, '#5b4fd6', 34]], lab: [['HEME SIGNAL FROM THE WHOLE BONE', 'k2:whole', 1050, 965, GOLD, 30]] },
    { at: 'k2:and', cast: [I('fcells', 380, 520, 2.5, 'k2:and', { pulse: ['k2:size', 'k2:shape'] }), A('cross', 780, 520, 1.1, 'k2:match'), I('ovalcell', 1180, 520, 2.2, 'k2:blood#1'), I('chicken', 1640, 330, 1.5, 'k2:birds'), I('lizard', 1640, 700, 1.5, 'k2:reptiles')],
      fx: [['stream', 3, 2, 'k2:birds', 'k2>', { col: '#ff8f9c', n: 6 }], ['stream', 4, 2, 'k2:reptiles', 'k2>', { col: '#ff8f9c', n: 6 }]], lab: [['SIZE & SHAPE DON\'T MATCH LIVING BIRDS OR REPTILES', 'k2:match', 960, 965, WHITE, 28]] },
    { at: 'k3', cast: [A('doctor', 520, 560, 2.5, 'k3', { shake: ['k3:not', 0.7] }), I('quote', 700, 400, 1.2, 'k3:words', { mv: [['k3:words+0.6', 1120, 420, 80]] }), A('cross', 1520, 420, 1.3, 'k3:convinced', { hit: ['k3:convinced+0.1'] })],
      lab: [['"I AM NOT CONVINCED"', 'k3:am', 1100, 800, GOLD, 44]] },
    QB('k4q', [I('femur', 760, 540, 1.9, 'k4q+0.2'), A('magnifier', 1150, 380, 1.4, 'k4q:found', { mv: [['k4q:before', 880, 460]] })]),
    { at: 'k5', cast: [A('doctor', 300, 560, 2.2, 'k5'), CAL('YEAR', '2005', 720, 480, 1.7, 'k5:2005'), A('flask', 1620, 540, 2.2, 'k5:dissolved', { hw: 44, hh: 52, hit: ['k5:bone+0.5'] }), I('femur', 1150, 520, 2.0, 'k5:68', { mv: [['k5:bone', 1500, 480, 60]], out: 'k5:bone+0.6' })],
      lab: [['T. REX LEG BONE · 68 MILLION YEARS', 'k5:68', 960, 965, WHITE, 30]] },
    { at: 'k5:found', cast: [A('flask', 380, 540, 2.2, 'k5:found', { hw: 44, hh: 52 }), I('vessels', 380, 540, 2.4, 'k5:soft', { mv: [['k5:stretchy', 900, 520, 100]] }), A('adult', 1400, 560, 1.9, 'k5:argued', { o: { mood: 'stress', col: '#5b4fd6' }, shake: ['k5:years', 0.6] }),
      A('adult', 1720, 560, 1.9, 'k5:argued+0.15', { flip: 1, o: { mood: 'stress', col: '#ff8f4a' }, shake: ['k5:years+0.2', 0.6] })],
      fx: [['zap', 2, 3, 'k5:argued+0.3', 0.5, '#ffd98a'], ['zap', 3, 2, 'k5:years', 0.5, '#ffd98a']], tag: [['SOFT, STRETCHY BLOOD VESSELS', 'k5:soft', 900, 830, '#e2457a', 36]], lab: [['ARGUED ABOUT FOR YEARS', 'k5:argued', 1550, 965, WHITE, 30]] },
    { at: 'k6', cast: [A('doctor', 300, 560, 2.2, 'k6:lead'), A('question', 720, 300, 1.4, 'k6:nobody'), I('ovalcell', 1000, 580, 2.4, 'k6:blood', { o: tt => ({ sq: clamp((tt - T('k6:squash')) / 0.5) }), hit: ['k6:squash'] }),
      A('hglass', 1550, 500, 1.8, 'k6:hundred', { mv: [['k6:squash', 1060, 330, 60]] })],
      tag: [['PROF. KLITI GRICE · LEAD AUTHOR', 'k6:lead', 520, 965, '#5b4fd6', 32]], lab: [['NOBODY KNOWS WHAT IT LOOKED LIKE', 'k6:nobody', 1350, 830, WHITE, 28]] },
    { at: 'k6:bold', cast: [A('docV', 380, 520, 2.0, 'k6:claim', { o: { title: 'BOLD CLAIM', ticks: 0 } }), I('scales', 960, 520, 2.4, 'k6:bold', { o: tt => ({ tip: Math.sin(tt * 2) * 0.2 }) }), A('flask', 1540, 540, 2.2, 'k6:testing', { hw: 44, hh: 52 }), A('check', 960, 230, 1.0, 'k6:works')],
      fx: [['stream', 0, 2, 'k6:years', 'k6>', { col: '#8fd8e6', n: 8 }]], lab: [['A BOLD CLAIM, THEN YEARS OF TESTING', 'k6:bold', 960, 965, GOLD, 32]] },
  ], 'm1'));
}
// ---------- 6 the Jurassic Park mosquito ----------
function sMosq(t) {
  worldBG(t, 'gold');
  beats(t, CB([
    QB('m1', [I('mosquito', 760, 560, 2.4, 'm1+0.2', { mv: [['m1:amber', 1000, 540, 40]] }), I('copal', 1150, 540, 1.9, 'm1:amber')]),
    { at: 'm2', cast: [CAL('YEAR', '2013', 330, 500, 1.9, 'm2:2013'), I('mosquito', 900, 500, 2.4, 'm2:strange', { mv: [['m2:stone', 1480, 520, 100]], pulse: ['m2:mosquito'] }), A('magnifier', 900, 250, 1.4, 'm2:studied', { mv: [['m2:mosquito', 1000, 380, 40]], out: 'm2:not' }), I('copal', 1480, 520, 2.0, 'm2:not', { out: 'm2:stone' }), A('cross', 1660, 320, 1.0, 'm2:amber', { out: 'm2:stone' }),
      I('shale', 1480, 520, 2.4, 'm2:stone')],
      lab: [['46 MILLION YEARS OLD · MONTANA', 'm2:46', 900, 965, WHITE, 32]] },
    { at: 'm2:its', cast: [I('shale', 560, 520, 2.8, 'm2:its', { pulse: ['m2:swollen'] }), I('rdrop', 1050, 330, 1.6, 'm2:blood', { mv: [['m2:found', 600, 520, 60]], out: 'm2:heme+0.3' }), I('heme', 1450, 520, 2.4, 'm2:heme', { pulse: ['m2:too'] })],
      fx: [['stream', 0, 2, 'm2:heme', 'm2>', { col: '#ff8f4a', n: 7 }]], tag: [['BELLY FULL OF BLOOD · HEME FOUND', 'm2:belly', 960, 965, '#c33244', 34]] },
    { at: 'm3', cast: [A('dna', 440, 520, 2.4, 'm3', { hw: 44, hh: 66, morph: ['m3:dna', 'nodna'], shake: ['m3:fragile', 0.6], erase: 'm3:survive' }), A('docV', 900, 300, 1.4, 'm3:researchers', { o: { title: 'PNAS 2013', ticks: 0 } }),
      I('heme', 1250, 520, 2.4, 'm3:tough', { pulse: ['m3:can'] }), A('shieldC', 1650, 520, 1.6, 'm3:iron', { mv: [['m3:can', 1400, 520, 40]] })],
      lab: [['FRAGILE: DNA', 'm3:fragile', 440, 820, '#ff9fb4', 30], ['TOUGH: IRON-BOUND HEME', 'm3:tough', 1350, 820, GOLD, 30], ['NO DNA', 'm3:no', 960, 965, WHITE, 34]] },
    { at: 'm3b', cast: [I('copal', 420, 520, 2.5, 'm3b:amber', { o: { inside: 'bee' } }), CAL('YEAR', '2013', 960, 470, 1.7, 'm3b:2013'), I('bee', 1500, 380, 1.8, 'm3b:bees', { mv: [['m3b:trapped', 520, 500, 120]], out: 'm3b:cople' }), A('flask', 1500, 640, 1.8, 'm3b:tested', { hw: 44, hh: 52 })],
      lab: [['MANCHESTER · BEES IN COPAL, A YOUNG AMBER', 'm3b:manchester', 960, 965, WHITE, 30]] },
    { at: 'm3b:one', cast: [I('copal', 380, 500, 2.2, 'm3b:one', { o: { inside: 'bee' } }), I('copal', 940, 500, 2.2, 'm3b:other', { o: { inside: 'bee' } }), I('nodna', 1520, 500, 2.2, 'm3b:neither', { shake: ['m3b:convincing', 0.6] }), A('cross', 1720, 300, 0.9, 'm3b:dna')],
      fx: [['stream', 0, 2, 'm3b:neither', 'm3b>', { col: '#ffd27a', n: 5 }], ['stream', 1, 2, 'm3b:neither', 'm3b>', { col: '#ffd27a', n: 5 }]],
      lab: [['~10,000 YEARS', 'm3b:10', 380, 790, WHITE, 30], ['< 60 YEARS', 'm3b:less', 940, 790, WHITE, 30]], tag: [['NO CONVINCING DNA', 'm3b:neither', 1400, 965, '#e2457a', 36]] },
    { at: 'm4', bg: tt => timeline(tt, S('m4'), 700, [[66, 'LAST GIANT DINOSAURS · 66 MYA', WHITE, S('m4') + 0.3, true], [46, 'MOSQUITO · 46 MYA', '#e2457a', T('m4:mosquito'), false]], S('x1') - 0.4),
      cast: [DN(420, 330, 2.0, 'm4', { grey: 'm4:died' }), I('mosquito', 420, 300, 1.5, 'm4:mosquito', { mv: [['m4:lived', 760, 340, 90]] }), A('hglass', 1150, 340, 1.8, 'm4:20', { pulse: ['m4:after'] })],
      tag: [['20 MILLION YEARS TOO LATE', 'm4:20', 1360, 930, '#9b3352', 36]] },
  ], 'x1'));
}
// ---------- 7 where's the DNA? ----------
function sNucleus(t) {
  worldBG(t, 'coral');
  beats(t, CB([
    QB('x1', [I('rbc', 760, 560, 2.6, 'x1+0.2'), A('dna', 1150, 520, 1.8, 'x1:dna', { hw: 44, hh: 66, mv: [['x1>', 900, 540]] })]),
    { at: 'x2', cast: [A('adult', 330, 560, 2.2, 'x2:yours', { o: { col: '#5b4fd6' } }), I('rbcN', 960, 520, 2.8, 'x2:mammal', { o: tt => ({ n: tt < T('x2:throw') }), pulse: ['x2:throw'] }),
      I('nucleusI', 960, 520, 1.7, 'x2:throw', { mv: [['x2:nucleus+0.4', 1550, 300, 90]], erase: 'x2:room' }), I('hemo', 1600, 720, 1.5, 'x2:hemoglobin', { mv: [['x2:hemoglobin+0.6', 1000, 540, 80]] })],
      lab: [['MAMMALS THROW OUT THE NUCLEUS', 'x2:throw', 960, 965, WHITE, 32]] },
    { at: 'x3', cast: [I('chicken', 330, 360, 1.6, 'x3:birds'), I('lizard', 330, 720, 1.6, 'x3:reptiles'), I('ovalcell', 900, 520, 2.6, 'x3:oval', { pulse: ['x3:keep'] }), DN(1520, 400, 1.9, 'x3:dinosaurs'), A('dna', 1520, 720, 1.6, 'x3:dna', { hw: 44, hh: 66, mv: [['x3:too', 940, 540, 80]] })],
      fx: [['stream', 0, 2, 'x3:keep', 'x3:oval+0.6', { col: '#c9b8ff', n: 6 }], ['stream', 1, 2, 'x3:keep', 'x3:oval+0.6', { col: '#c9b8ff', n: 6 }], ['zap', 3, 0, 'x3:relatives', 0.6, '#ffd98a']],
      tag: [['DINOSAUR BLOOD CELLS: PROBABLY DNA INSIDE', 'x3:probably', 960, 965, '#7f5fd6', 32]] },
    QB('x4q', [I('ovalcell', 760, 560, 2.4, 'x4q+0.2'), A('dna', 1150, 520, 1.8, 'x4q:dna', { hw: 44, hh: 66 })]),
    { at: 'x5', cast: [A('dna', 420, 520, 2.4, 'x5', { hw: 44, hh: 66, shake: ['x5:falls', 0.6], erase: 'x5:apart+0.2' }), A('stopwatch', 980, 520, 2.0, 'x5:schedule'), CAL('YEAR', '2012', 1520, 500, 1.9, 'x5:2012')] },
    { at: 'x5:scientists', cast: [A('dna', 400, 300, 1.6, 'x5:dna', { hw: 44, hh: 66, mv: [['x5:158', 1000, 440, 60]], out: 'x5:moa' }), I('bonepile', 1000, 560, 2.2, 'x5:158'), I('moa', 400, 560, 2.2, 'x5:moa'), A('globeP', 1580, 520, 1.9, 'x5:new')],
      lab: [['158 MOA BONES', 'x5:158', 1000, 820, GOLD, 32]], tag: [['MOA · GIANT EXTINCT BIRDS · NEW ZEALAND', 'x5:giant', 960, 965, '#9b3352', 32]] },
    { at: 'x6', bg: ladder, cast: [A('hglass', 400, 720, 1.8, 'x6:half', { pulse: ['x6:every'] }), A('alarmC', 1520, 720, 1.6, 'x6:five')],
      fx: [['zap', [300, 360], [1620, 360], 'x6:break', 0.6, '#ffd98a']], num: [['x6:521', 960, 700, '~521 YEARS', 'DNA BOND HALF-LIFE']], lab: [['EVERY ~5 CENTURIES, HALF THE BONDS BREAK', 'x6:every', 960, 965, WHITE, 30]] },
  ], 'n1'));
}
// ---------- 8 the DNA clock ----------
function sClock(t) {
  worldBG(t, 'night');
  beats(t, CB([
    QB('n1', [A('hglass', 760, 560, 2.2, 'n1+0.2'), A('dna', 1150, 540, 1.8, 'n1:nothing', { hw: 44, hh: 66, grey: 'n1:left' })]),
    { at: 'n2', under: (tt) => { meter(680, 380, 820, 1.5 / 6.8, tt, T('n2:unreadable') - 0.2, E('n2') - 0.2, '#ffd98a', '#ff8f4a', 'UNREADABLE AFTER ~1.5 MILLION YEARS'); meter(680, 660, 820, 1, tt, T('n2:every'), E('n2') - 0.2, '#ff8f4a', '#e2457a', 'EVERY BOND GONE BY 6.8 MILLION'); },
      cast: [I('snow', 330, 330, 1.7, 'n2:frozen'), I('dbone', 330, 680, 1.8, 'n2:bone', { o: {} }), A('dna', 1720, 380, 1.6, 'n2:dna', { hw: 44, hh: 66, grey: 'n2:unreadable' }), A('dna', 1720, 680, 1.6, 'n2:every', { hw: 44, hh: 66, erase: 'n2:gone' })],
      fx: [['stream', 0, 1, 'n2:frozen', 'n2>', { col: '#e8f3ff', n: 8, arc: 20 }]] },
    { at: 'n2b', cast: [I('scrapbook', 520, 520, 2.8, 'n2b:book', { shake: ['n2b:snap', 0.6] }), CAL('EVERY', '500 Y', 1000, 280, 1.4, 'n2b:centuries'), A('doc2', 560, 520, 1.1, 'n2b:split', { mv: [['n2b:split+0.8', 1050, 600, 90]] }),
      A('doc2', 560, 520, 0.75, 'n2b:smaller', { mv: [['n2b:smaller#1', 1250, 760, 90]] }), A('magnifier', 1600, 520, 1.8, 'n2b:after', { mv: [['n2b:tiny', 1330, 640, 60]] })],
      lab: [['STITCHES SNAP · PAGES SPLIT', 'n2b:stitches', 960, 110, WHITE, 32], ['TOO TINY TO READ', 'n2b:tiny', 960, 965, GOLD, 34]] },
    { at: 'n3', bg: tt => timeline(tt, S('n3'), 600, [[2, 'OLDEST DNA · 2 MYA · GREENLAND', '#8fd8e6', T('n3:oldest'), false], [66, 'LAST GIANT DINOSAURS · 66 MYA', WHITE, T('n3:giant'), true]], E('n3')),
      cast: [A('globeP', 1450, 300, 1.6, 'n3:greenland'), I('snow', 1700, 300, 1.3, 'n3:frozen'), A('dna', 1200, 300, 1.6, 'n3:oldest', { hw: 44, hh: 66, mv: [['n3:30', 700, 300, 60]], erase: 'n3:back' }), DN(350, 330, 1.9, 'n3:dinosaurs', { grey: 'n3:died' })],
      tag: [['MORE THAN 30× FURTHER BACK', 'n3:30', 960, 900, '#e2457a', 40]] },
    { at: 'n4', cast: [DN(420, 560, 2.6, 'n4:dinosaur'), I('nodna', 960, 540, 2.2, 'n4:dna', { shake: ['n4:clone', 0.6] }), I('dbone', 1500, 360, 1.6, 'n4:bones'), A('cross', 1720, 260, 0.8, 'n4:bones+0.3'),
      I('mosquito', 1500, 700, 1.6, 'n4:mosquitoes'), A('cross', 1720, 620, 0.8, 'n4:mosquitoes+0.3')],
      lab: [['NO DINOSAUR DNA LEFT TO CLONE', 'n4:clone', 960, 965, GOLD, 34]] },
  ], 'r1'));
}
// ---------- 9 what blood can still tell us ----------
function sTell(t) {
  worldBG(t, 'teal');
  beats(t, CB([
    QB('r1', [I('fcells', 760, 560, 2.4, 'r1+0.2'), I('rdrop', 1150, 540, 1.8, 'r1:blood', { pulse: ['r1:matter'] })]),
    { at: 'r2', cast: [I('protein', 420, 520, 2.4, 'r2:molecules'), A('dna', 960, 520, 2.2, 'r2:dna', { hw: 44, hh: 66, erase: 'r2:lot' }), CAL('YEAR', '2025', 1500, 500, 1.9, 'r2:2025')],
      lab: [['SOME MOLECULES OUTLAST DNA', 'r2:outlast', 960, 965, GOLD, 32]] },
    { at: 'r2:scientists', cast: [I('snowtooth', 560, 520, 2.4, 'r2:rhino', { pulse: ['r2:arctic'] }), I('protein', 1400, 500, 2.2, 'r2:pieces', { pulse: ['r2:20'] })],
      fx: [['stream', 0, 1, 'r2:tooth', 'r2>', { ic: 'protein', s: 0.3, n: 7 }]], lab: [['RHINO TOOTH · CANADIAN ARCTIC', 'r2:canadian', 560, 820, WHITE, 30]], tag: [['PROTEINS · 20+ MILLION YEARS OLD', 'r2:20', 960, 965, '#0b4f5c', 36]] },
    { at: 'r2b', cast: [I('tooth', 620, 520, 2.8, 'r2b', { pulse: ['r2b:hardest'] }), I('protein', 1500, 330, 1.5, 'r2b:proteins', { mv: [['r2b:proteins+0.7', 660, 500, 90]] }), A('shieldC', 1450, 620, 1.9, 'r2b:armoured', { mv: [['r2b:box+0.2', 900, 520, 60]] })],
      lab: [['ENAMEL: THE HARDEST MATERIAL AN ANIMAL MAKES', 'r2b:hardest', 960, 965, WHITE, 30]] },
    { at: 'r3', cast: [I('heme', 300, 340, 1.6, 'r3'), I('protein', 300, 700, 1.5, 'r3:proteins'), I('o2', 840, 520, 1.9, 'r3:oxygen'), DN(1240, 540, 1.8, 'r3:active', { o: { speed: 10 } }), I('ftree', 1680, 520, 1.6, 'r3:relatives')],
      fx: [['stream', 0, 2, 'r3:oxygen', 'r3>', { col: '#8fd8e6', n: 6 }], ['stream', 1, 3, 'r3:active', 'r3>', { col: '#ffd98a', n: 6 }], ['stream', 1, 4, 'r3:relatives', 'r3>', { col: '#b48cff', n: 6 }]],
      lab: [['OXYGEN · ACTIVITY · RELATIVES', 'r3:hint', 960, 965, WHITE, 32]] },
    { at: 'r3b', cast: [A('doctor', 300, 560, 2.2, 'r3b'), A('question', 760, 330, 1.4, 'r3b:question'), DN(1080, 620, 2.4, 'r3b:just', { o: { speed: 10 } }), A('thermoC', 1640, 520, 2.0, 'r3b:warm', { o: tt => ({ level: 0.4 + 0.5 * clamp((tt - T('r3b:warm')) / 1.0) }) })],
      fx: [['stream', 3, 2, 'r3b:warm', 'r3b>', { col: '#ff8f4a', n: 7 }]], lab: [['HOW WARM-BLOODED? HOW ACTIVE?', 'r3b:warm', 960, 965, GOLD, 34]] },
    { at: 'r4', cast: [I('coffin', 380, 520, 2.0, 'r4:preservation'), I('museum', 960, 500, 2.2, 'r4:fossils', { o: { fire: false } }), I('drawers', 1520, 520, 2.2, 'r4:drawers', { pulse: ['r4:hiding'] })],
      fx: [['stream', 2, [1400, 200], 'r4:hiding', 'r4>', { ic: 'fcells', s: 0.35, n: 6 }]], lab: [['MAYBE NOT SO RARE', 'r4:rare', 380, 820, GOLD, 30], ['OLD FOSSILS MAY HIDE MORE', 'r4:hiding', 960, 965, WHITE, 32]] },
  ], 'y1'));
}
// ---------- 10 the dinosaur in your kitchen ----------
function sKitchen(t) {
  worldBG(t, 'cream');
  beats(t, CB([
    QB('y1', [DN(760, 600, 2.6, 'y1+0.2'), I('egg', 1150, 540, 1.6, 'y1:living')]),
    { at: 'y2', cast: [I('chicken', 420, 540, 2.5, 'y2:birds', { pulse: ['y2:dinosaurs'] }), I('ftree', 930, 380, 1.5, 'y2:descend'), DN(1420, 600, 2.6, 'y2:small')],
      fx: [['stream', 2, 0, 'y2:descend', 'y2>', { col: '#c95a7c', n: 7 }]], tag: [['BIRDS ARE LIVING DINOSAURS', 'y2:birds', 960, 130, '#c95a7c', 44]], lab: [['COUSINS OF ARATASAURUS', 'y2:cousins', 1420, 965, WHITE, 30]] },
    { at: 'y2b', cast: [CAL('YEAR', '2008', 300, 330, 1.5, 'y2b:2008'), A('doctor', 300, 680, 1.8, 'y2b:scientists'), I('protein', 760, 300, 1.4, 'y2b:collagen'), I('femur', 760, 600, 1.7, 'y2b:rex'), I('chicken', 1250, 520, 1.8, 'y2b:chickens'), I('ostrich', 1660, 480, 1.8, 'y2b:ostriches')],
      fx: [['stream', 2, 4, 'y2b:closest', 'y2b>', { col: '#c95a7c', n: 6 }], ['stream', 2, 5, 'y2b:ostriches', 'y2b>', { col: '#c95a7c', n: 6 }]],
      lab: [['T. REX COLLAGEN VS DOZENS OF ANIMALS', 'y2b:dozens', 700, 965, WHITE, 28]], tag: [['CLOSEST MATCHES', 'y2b:closest', 1460, 965, '#c95a7c', 36]] },
    { at: 'y3', cast: [CAL('YEAR', '2015', 1600, 280, 1.4, 'y3:2015'), A('lockR', 300, 360, 1.4, 'y3:blocked'), A('lockR', 300, 700, 1.4, 'y3:two'),
      I('egg', 900, 520, 3.0, 'y3:chicken', { o: tt => ({ snout: 1 - clamp((tt - T('y3:snout') + 0.4) / 1.2) }), hit: ['y3:snout'] }), DN(1560, 660, 1.6, 'y3:dinosaur'), A('cross', 1180, 280, 1.0, 'y3:none')],
      fx: [['zap', 1, 3, 'y3:beak', 0.5, '#c95a7c'], ['zap', 2, 3, 'y3:beak+0.3', 0.5, '#c95a7c']], tag: [['BEAK → DINOSAUR-LIKE SNOUT', 'y3:snout', 960, 965, '#c95a7c', 36]] },
    { at: 'y4', cast: [DN(400, 580, 2.4, 'y4:dinosaur'), I('blueprint', 940, 520, 2.4, 'y4:blueprint', { mv: [['y4:egg', 1440, 520, 90]], out: 'y4:egg+0.5' }), I('egg', 1500, 520, 2.6, 'y4:chicken', { pulse: ['y4:egg+0.5'] })],
      fx: [['stream', 0, 1, 'y4:blueprint', 'y4>', { col: '#5b8dd6', n: 6 }]], lab: [['THE OLD BLUEPRINT · IN EVERY CHICKEN EGG', 'y4:hiding', 960, 965, WHITE, 32]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  const C = CUE; worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, CB([
    QB('o1', [A('magnifier', 760, 520, 1.8, 'o1+0.2', { mv: [['o1>', 960, 500]] }), I('fcells', 1150, 540, 2.0, 'o1:find')]),
    { at: 'o2', cast: [DN(420, 600, 2.6, 'o2:living', { grey: 'o2:stranger' }), A('cross', 640, 330, 1.0, 'o2:dinosaur'), I('heme', 960, 520, 2.4, 'o2:molecule', { o: tt => ({ o2: tt > T('o2:oxygen') }), mv: [['o2:body', 560, 460, 90], ['o2:sealed', 1420, 520, 120]] }),
      I('shale', 1500, 560, 2.2, 'o2:sealed', { pulse: ['o2:stone'] })],
      lab: [['NOT A LIVING DINOSAUR · A MOLECULE', 'o2:molecule', 960, 965, WHITE, 32], ['115 MILLION YEARS IN STONE', 'o2:hundred', 1300, 130, GOLD, 30]] },
  ], 'o3')); return; }
  dino(t, 560, 940, 0.9); reg('hero', 'dino', 560 - 380, 940 - 390, 560 + 290, 950);
  if (t > S('o3') + 0.3) { reg('label', 'title', 1000, 300, 1880, 640); LABELQ.push(() => { riseText('SCIENTISTS FOUND', 1440, 400, S('o3') + 0.3, t, { size: 76, weight: 700, color: WHITE, ls: 5, pill: false, dur: 0.8 });
    riseText('DINOSAUR BLOOD', 1440, 540, S('o3') + 0.5, t, { size: 104, weight: 700, color: GOLD, ls: 6, pill: false, dur: 0.8 }); }); sfx('title', S('o3') + 0.3); }
  if (t > S('o4') - 0.2) placeIcon('subscribe', [[1440, 720]], 1.2, t, W_('o4', 'subscribe'), 999, { hw: 124, hh: 38 });
  if (t > C.end) for (const [x, y] of [[1240, 900], [1640, 900]]) { const k = spring(t - C.end - 0.2, 0.5, 12); rr2(x - 170 * k, y - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', x - 170, y - 96, x + 170, y + 96); }
}

const CHAPTERS = [['b1', 'What blood is made of', 'coral', 'rbc'], ['f1', 'How a bone turns to stone', 'gold', 'dbone'], ['d1', 'A dinosaur from Brazil', 'teal', 'dinoI'], ['p1', "Proving it's blood", 'indigo', 'heme'], ['k1', 'The skeptics', 'grey', 'magnifier'],
  ['m1', 'The Jurassic Park mosquito', 'gold', 'mosquito'], ['x1', "Where's the DNA?", 'coral', 'dna'], ['n1', 'The DNA clock', 'night', 'scrapbook'], ['r1', 'What blood can still tell us', 'teal', 'tooth'], ['y1', 'The dinosaur in your kitchen', 'cream', 'chicken']];
function SECTIONS() { return makeSections(CHAPTERS, { b1: [sBlood, 'b2'], f1: [sFossil, 'f2'], d1: [sDino, 'd2'], p1: [sProof, 'p2'], k1: [sSkeptic, 'k2'], m1: [sMosq, 'm2'], x1: [sNucleus, 'x2'], n1: [sClock, 'n2'], r1: [sTell, 'r2'], y1: [sKitchen, 'y2'] }, sOpen, sOutro); }
