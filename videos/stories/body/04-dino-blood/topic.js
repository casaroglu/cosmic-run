// "Scientists found dinosaur blood. Now what?" — topic file for the shared explainer engine
const L = id => LN(id), S = id => LN(id).start, E = id => LN(id).end;
function buildCues() { const C = CUE; C.title = S('o3') + 0.3; C.end = DUR - TAIL; C.calls = S('o3'); }

// ---------- palette ----------
const RUST = '#c8553d', RUST2 = '#9a3b2a', BELLY = '#f2b37a', FEATH = '#ffd98a', FEATH2 = '#e07b39', BLOOD = '#d63a4c', BLOOD2 = '#b02a3d', BONE = '#f3ead8', STONE = '#9a8a74';

// ---------- shared helpers (same as the ant episode) ----------
function kidAt(t, x, y, s, o = {}) { CAM = { x: 960, y: 540, z: 1 }; KID = { x, y }; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); drawKid(t, o); ctx.restore(); reg('hero', 'mascot', x - 70 * s, y - 290 * s, x + 70 * s, y + 12 * s); }
const sky = (t, top, bot) => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); };
function tile3(t, items, y = 520) {   // 3 big coloured tiles with animated icons
  items.forEach(([ic, lab, col, t0, o], i) => { const k = spring(t - t0 + 0.1, 0.5, 13); if (k <= 0) return; const x = 380 + i * 580;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rr2(-250, -280, 500, 560, 36, col); ctx.restore(); reg('panel', lab, x - 250, y - 280, x + 250, y + 280);
    ctx.save(); ctx.translate(x, y - 40); ctx.scale(2.3 * k, 2.3 * k); drawIcon(ic, t, o || {}); ctx.restore();
    if (o && o.mark != null) stamp(o.mark, x + 170, y - 200, t, t0 + 0.5);
    if (k > 0.6) riseText(lab, x, y + 200, t0 + 0.15, t, { size: 34, weight: 700, color: WHITE, pill: false }); });
}
function stamp(ok, x, y, t, t0) {   // a green tick or a red cross that slams in
  if (t < t0) return; const k = spring(t - t0, 0.45, 14), s = lerp(1.7, 1, k) * clamp((t - t0) / 0.1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, 0, 44, ok ? '#3fae6a' : '#e2457a');
  ctx.fillStyle = '#fff'; if (ok) { ctx.save(); ctx.rotate(0.75); rr2(-6, -24, 12, 40, 6, '#fff'); rr2(-18, 4, 18, 12, 6, '#fff'); ctx.restore(); } else for (const a of [0.78, -0.78]) { ctx.save(); ctx.rotate(a); rr2(-6, -26, 12, 52, 6, '#fff'); ctx.restore(); } ctx.restore();
}
function arrow(x, y, t, t0, w = 90) { if (t < t0) return; const k = eoq((t - t0) / 0.5), p = Math.sin(t * 4) * 6; ctx.save(); ctx.globalAlpha = k; ctx.translate(x + p, y); ctx.fillStyle = 'rgba(255,255,255,0.8)'; rr2(-w / 2, -8, w - 20, 16, 8, 'rgba(255,255,255,0.8)'); ctx.beginPath(); ctx.moveTo(w / 2 - 30, -24); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 2 - 30, 24); ctx.fill(); ctx.restore(); }

// a travelling sparkle instead of the engine's light stripe (the stripe also lit the background around round icons)
function glint(t, w, h, period = 2.4) { const p = (t % period) / period; if (p > 0.45) return; const k = p / 0.45, a = Math.sin(k * Math.PI), x = lerp(-w * 0.55, w * 0.45, k), y = lerp(-h * 0.55, -h * 0.15, k), r = 8 + 10 * a;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); ctx.restore(); }
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
function rbcDisc(x, y, r, tilt = 1, rot = 0) {   // a human red blood cell: soft disc, dented in the middle
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, tilt);
  circ(0, 0, r, BLOOD); circ(0, 0, r * 0.86, '#ee6070'); circ(r * 0.05, r * 0.06, r * 0.5, BLOOD2); circ(r * 0.12, r * 0.14, r * 0.36, '#c33244');
  rr2(-r * 0.62, -r * 0.66, r * 0.52, r * 0.15, r * 0.075, 'rgba(255,255,255,0.45)'); ctx.restore();
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
  lungs(t) { const b = 1 + Math.sin(t * 2) * 0.05; rr2(-8, -78, 16, 56, 8, '#f3c0c8');
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 10, -6); ctx.scale(sd * b, b); ctx.fillStyle = '#f08a9c'; ctx.beginPath(); ctx.moveTo(4, -56); ctx.quadraticCurveTo(64, -66, 64, 10); ctx.quadraticCurveTo(64, 70, 18, 66); ctx.quadraticCurveTo(4, 50, 6, 0); ctx.closePath(); ctx.fill();
      for (let i = 0; i < 16; i++) circ(18 + ((i * 13) % 40), -40 + ((i * 29) % 96), 3.5, 'rgba(180,60,90,0.35)'); ctx.save(); ctx.translate(4, -22); ctx.rotate(0.7); rr2(-4, 0, 8, 40, 4, '#f3c0c8'); ctx.restore(); ctx.restore(); } },
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
  magnifier(t) { ctx.save(); ctx.translate(Math.sin(t * 1.2) * 14, Math.cos(t * 1.5) * 8); ctx.save(); ctx.translate(30, 30); ctx.rotate(-0.8); rr2(-11, 0, 22, 74, 11, '#7a4a2c'); ctx.restore(); circ(0, 0, 50, '#9aa6c4'); circ(0, 0, 40, 'rgba(200,235,255,0.55)'); rr2(-26, -28, 24, 9, 4.5, 'rgba(255,255,255,0.75)'); ctx.restore(); },
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
  person(t) { circ(0, -50, 22, '#f2b38f'); rr2(-24, -26, 48, 70, 22, '#5b4fd6'); rr2(-20, 40, 16, 30, 8, '#2d2b7c'); rr2(4, 40, 16, 30, 8, '#2d2b7c'); ctx.save(); ctx.translate(26, -18); ctx.rotate(-1.8 + Math.sin(t * 6) * 0.4); rr2(-6, 0, 12, 40, 6, '#5b4fd6'); ctx.restore(); },
  o2(t) { circ(-18, 0, 30, '#8fd8e6'); circ(18, 0, 30, '#8fd8e6'); font(30, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('O₂', 0, 2); },
  dinoI(t) { dino(t, 30, 60, 0.26, { speed: 6 }); },
  rdrop(t) { ctx.fillStyle = BLOOD; ctx.beginPath(); ctx.moveTo(0, -40); ctx.bezierCurveTo(10, -18, 28, -2, 28, 14); ctx.arc(0, 14, 28, 0, Math.PI); ctx.bezierCurveTo(-28, -2, -10, -18, 0, -40); ctx.fill(); rr2(-14, 2, 8, 18, 4, 'rgba(255,255,255,0.55)'); },
  snowtooth(t) { ICONS.tooth(t); for (let i = 0; i < 8; i++) { const p = (t * 0.3 + i / 8) % 1; circ(-80 + ((i * 47) % 160), -90 + p * 180, 4, 'rgba(255,255,255,0.8)'); } },
});
Object.assign(IDLE, {
  dbone: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.08) }, stonebone: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) }, legbone: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.05), post: t => glint(t, 60, 100) },
  rbc: {}, fcells: { pre: t => { const b = 1 + Math.sin(t * 2.2) * 0.04; ctx.scale(b, b); } }, heme: {}, hemo: { pre: t => ctx.rotate(Math.sin(t * 0.9) * 0.2) }, lungs: {}, octo: { pre: t => ctx.translate(0, Math.sin(t * 1.6) * 6) },
  microbe: {}, museum: { post: t => puff(t, 20, -100, 3, -1, 'rgba(90,90,100,0.45)', 14) }, mine: {}, scope: { post: t => glint(t, 50, 70, 3) }, pyrite: { post: t => glint(t, 60, 60) },
  elem: { post: t => glint(t, 58, 58, 3.1) }, laser: {}, leaf: {}, coffin: {}, magnifier: {}, quote: { pre: t => { const b = 1 + Math.max(0, Math.sin(t * 2.4)) * 0.04; ctx.scale(b, b); } },
  femur: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.05) }, vessels: {}, scales: {}, mosquito: { pre: t => ctx.translate(0, Math.sin(t * 3) * 5) }, shale: { post: t => glint(t, 100, 74, 3.2) }, bee: {},
  copal: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.06), post: t => glint(t, 74, 64) }, nodna: {}, ovalcell: {}, chicken: {}, ostrich: {}, moa: {}, scrapbook: {}, tooth: { post: t => glint(t, 58, 76) }, drawers: {}, ftree: {},
  egg: { pre: t => ctx.rotate(Math.sin(t * 1.7) * 0.05) }, blueprint: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.04) }, person: {}, rdrop: { pre: t => ctx.scale(1 + Math.sin(t * 5) * 0.04, 1 - Math.sin(t * 5) * 0.04), post: t => glint(t, 30, 45) }, o2: { pre: t => ctx.translate(0, Math.sin(t * 2.5) * 5) }, dinoI: {}, snowtooth: { post: t => glint(t, 58, 76) },
});

// ---------- scenes ----------
function sOpen(t) {
  if (t < S('c2') - 0.1) { worldBG(t, 'night'); kidAt(t, 420, 940, 1.4, { look: [1, -0.3] });
    const r = 230 * spring(t - 0.3, 0.5, 9); if (r > 1) { ctx.save(); ctx.translate(1180, 520); const w = 1 + Math.sin(t * 3) * 0.03; ctx.scale(w, 2 - w); ctx.fillStyle = BLOOD; ctx.beginPath(); ctx.moveTo(0, -r * 1.35); ctx.bezierCurveTo(r * 0.4, -r * 0.7, r, -r * 0.1, r, r * 0.3); ctx.arc(0, r * 0.3, r, 0, Math.PI); ctx.bezierCurveTo(-r, -r * 0.1, -r * 0.4, -r * 0.7, 0, -r * 1.35); ctx.fill(); rr2(-r * 0.6, -r * 0.1, r * 0.16, r * 0.5, r * 0.08, 'rgba(255,255,255,0.45)'); ctx.restore(); }
    reg('hero', 'blood drop', 1180 - 240, 520 - 320, 1180 + 240, 520 + 310); label('DINOSAUR BLOOD?', 1180, 960, t, 0.6, S('c2') - 0.3, GOLD, 44); return; }
  if (t < S('c3') - 0.1) { worldBG(t, 'night');
    placeIcon('dbone', [[420, 470]], 3.0, t, W_('c2', 'bone') - 0.2, S('c3') - 0.2, { hw: 90, hh: 66 }); label('A BONE FROM BRAZIL', 420, 760, t, W_('c2', 'brazil'), S('c3') - 0.3, WHITE, 32);
    arrow(735, 470, t, W_('c2', 'tiny') - 0.3); placeIcon('fcells', [[1010, 470]], 3.0, t, W_('c2', 'tiny'), S('c3') - 0.2, { hw: 68, hh: 66 }); label('TINY OVAL CELLS', 1010, 760, t, W_('c2', 'oval'), S('c3') - 0.3, WHITE, 32);
    arrow(1290, 470, t, W_('c2', 'heme') - 0.3); placeIcon('heme', [[1570, 470]], 2.6, t, W_('c2', 'heme'), S('c3') - 0.2, { hw: 72, hh: 72 }); tag('HEME', 1570, 760, t, W_('c2', 'heme'), S('c3') - 0.3, '#5b4fd6', 40);
    label('NOVEMBER 2026 · PNAS', 960, 130, t, W_('c2', 'november'), S('c3') - 0.3, TEAL, 30); return; }
  if (t < S('c4q') - 0.1) { worldBG(t, 'teal'); dino(t, 820, 990, 1.15); reg('hero', 'dino', 820 - 500, 990 - 500, 820 + 380, 1000);
    tag('115 MILLION YEARS OLD', 960, 150, t, W_('c3', ['115', 'hundred']), S('c4q') - 0.3, '#e2457a', 48); label('THE TEAM: OLDEST BLOOD EVER FOUND', 1420, 330, t, W_('c3', 'oldest'), S('c4q') - 0.3, GOLD, 32); label('FIRST PROVEN WITH CHEMISTRY', 1420, 430, t, W_('c3', 'chemistry') - 0.3, S('c4q') - 0.3, WHITE, 32); return; }
  if (t < S('c4') - 0.1) { worldBG(t, 'night'); kidAt(t, 760, 940, 1.6, { look: [1, -0.6], armsUp: 1 }); placeIcon('dna', [[1300, 470]], 3.2, t, W_('c4q', 'clone') - 0.3, S('c4') - 0.2, { hw: 44, hh: 66 }); label('CLONE ONE?', 1300, 760, t, W_('c4q', 'clone'), S('c4') - 0.3, GOLD, 40); return; }
  if (t < S('c5') - 0.1) { worldBG(t, 'night'); tile3(t, [['drop', 'BLOOD', '#c8505e', W_('c4', 'blood')], ['dbone', 'STONE', '#9b6a44', W_('c4', 'stone')], ['dna', 'TIME', '#5b4fd6', W_('c4', 'long')]], 560); label('THE JURASSIC PARK QUESTION', 960, 120, t, W_('c4', 'jurassic') - 0.2, S('c5') - 0.3, GOLD, 34); return; }
  worldBG(t, 'night'); label('THE MOVIE PLAN', 960, 130, t, S('c5'), S('b1') - 0.4, GOLD, 40);
  placeIcon('copal', [[340, 500]], 2.6, t, W_('c5', 'mosquito') - 0.2, S('b1') - 0.3, { hw: 80, hh: 70, inside: 'mosquito' }); label('MOSQUITO IN AMBER', 340, 760, t, W_('c5', 'amber'), S('b1') - 0.4, WHITE, 28);
  arrow(640, 500, t, W_('c5', 'dna')); placeIcon('dna', [[900, 500]], 2.8, t, W_('c5', 'dna'), S('b1') - 0.3, { hw: 44, hh: 66 }); label('DINOSAUR DNA', 900, 760, t, W_('c5', 'dna') + 0.2, S('b1') - 0.4, WHITE, 28);
  arrow(1170, 500, t, W_('c5', 'bit')); if (t > W_('c5', 'bit')) { dino(t, 1530, 720, 0.62 * spring(t - W_('c5', 'bit'), 0.5, 12)); reg('hero', 'dino', 1530 - 270, 720 - 280, 1530 + 210, 730); }
  label('HOW MUCH HOLDS UP?', 960, 930, t, W_('c5', 'holds') - 0.4, S('b1') - 0.4, GOLD, 36);
}
function sBlood(t) {
  worldBG(t, 'coral');
  if (t < S('b3') - 0.1) { reg('hero', 'vessel', 0, 380, W, 700); rr2(-40, 400, W + 80, 280, 140, 'rgba(120,20,40,0.35)');
    for (let i = 0; i < 26; i++) { const x = ((i * 157 + t * 260) % (W + 300)) - 150, y = 540 + Math.sin(i * 2.3 + t) * 80; rbcDisc(x, y, 50, 0.5 + 0.45 * Math.abs(Math.sin(i + t * 0.8)), Math.sin(i + t) * 0.6); }
    tag('~25 TRILLION RED BLOOD CELLS', 960, 200, t, W_('b2', ['25', 'twenty', 'trillion']), S('b3') - 0.3, '#9b3352', 46); label('MORE THAN 8 IN 10 OF YOUR CELLS', 960, 880, t, W_('b2', ['eight', '8']), S('b3') - 0.3, GOLD, 34); return; }
  if (t < S('b3b') - 0.1) { const k = spring(t - S('b3'), 0.5, 10); rbcDisc(470, 560, 230 * k, 0.92, Math.sin(t * 0.6) * 0.15); reg('hero', 'red cell', 230, 330, 710, 790);
    placeIcon('hemo', [[1080, 420]], 2.3, t, W_('b3', 'hemoglobin'), S('b3b') - 0.2, { hw: 62, hh: 60 }); label('×270 MILLION IN EACH CELL', 1080, 650, t, W_('b3', ['270', 'two']), S('b3b') - 0.3, GOLD, 28);
    placeIcon('heme', [[1600, 420]], 2.3, t, W_('b3', 'heme') - 0.1, S('b3b') - 0.2, { hw: 70, hh: 70 }); label('4 HEME RINGS · IRON IN THE MIDDLE', 1440, 780, t, W_('b3', 'iron'), S('b3b') - 0.3, WHITE, 28); return; }
  if (t < S('b4q') - 0.1) { const tl = 0.35 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.9)); rbcDisc(620, 520, 260, tl, 0.2); reg('hero', 'red cell', 350, 240, 890, 800);
    placeIcon('donut', [[1450, 480]], 3.0, t, W_('b3b', ['doughnut', 'donut']) - 0.3, S('b4q') - 0.2, { hw: 50, hh: 50 }); label('SOFT RED DISCS', 620, 900, t, W_('b3b', 'soft'), S('b4q') - 0.3, WHITE, 34); label('DENTED, NO HOLE', 1450, 720, t, W_('b3b', 'dented'), S('b4q') - 0.3, GOLD, 32); return; }
  if (t < S('b5') - 0.1) { placeIcon('heme', [[960, 470]], 3.0, t, S('b4q'), S('b5') - 0.2, { hw: 70, hh: 70 }); label('IS THE IRON WHY IT\'S RED?', 960, 800, t, S('b4q') + 0.2, S('b5') - 0.3, GOLD, 36); return; }
  if (t < S('b6') - 0.1) { placeIcon('lungs', [[360, 470]], 2.6, t, W_('b5', 'lungs') - 0.3, S('b6') - 0.2, { hw: 70, hh: 80 }); placeIcon('muscle', [[1560, 470]], 2.6, t, W_('b5', 'muscles') - 0.3, S('b6') - 0.2, { hw: 76, hh: 60 });
    if (t > W_('b5', 'grabs') - 0.3) { for (let i = 0; i < 4; i++) { const p = ((t - W_('b5', 'grabs')) * 0.35 + i / 4) % 1; const x = lerp(620, 1300, p), y = 470 + Math.sin(p * 6.283) * 40; rbcDisc(x, y, 44, 0.8, p * 3); if (p < 0.85) { circ(x - 12, y - 52, 13, '#8fd8e6'); circ(x + 12, y - 52, 13, '#8fd8e6'); } } reg('hero', 'cells', 560, 380, 1360, 580); }
    placeIcon('heme', [[960, 820]], 1.9, t, W_('b5', 'heme'), S('b6') - 0.2, { hw: 70, hh: 72, o2: 1 }); label('IRON GRABS OXYGEN', 960, 150, t, W_('b5', 'grabs'), S('b6') - 0.3, GOLD, 36); label('IRON CHEMISTRY = RED', 1560, 820, t, W_('b5', 'red', 1), S('b6') - 0.3, WHITE, 28); return; }
  if (t < S('b7q') - 0.1) { placeIcon('calendar', [[420, 450]], 2.6, t, W_('b6', 'four') - 0.3, S('b7q') - 0.2, { text: '4 MO', hw: 54, hh: 60 }); label('LIVES ~4 MONTHS', 420, 700, t, W_('b6', 'months'), S('b7q') - 0.3, WHITE, 30);
    ctx.save(); ctx.translate(1240, 480); ctx.scale(2.2, 2.2); drawIcon('femur', t); ctx.restore(); reg('hero', 'bone marrow', 1040, 150, 1440, 800);
    if (t > W_('b6', 'marrow')) for (let i = 0; i < 10; i++) { const p = ((t - W_('b6', 'marrow')) * 0.6 + i / 10) % 1; rbcDisc(1240 + Math.cos(i * 2.4) * (60 + p * 330), 480 + Math.sin(i * 2.4) * (40 + p * 260), 26 * (0.4 + p), 0.8, i); }
    tag('~2 MILLION NEW ONES EVERY SECOND', 960, 940, t, W_('b6', ['two', '2', 'million']), S('b7q') - 0.3, '#9b3352', 40); return; }
  if (t < S('b8') - 0.1) { placeIcon('rdrop', [[700, 470]], 3.0, t, S('b7q'), S('b8') - 0.2, { hw: 34, hh: 50 }); placeIcon('drop', [[1220, 470]], 3.0, t, S('b7q') + 0.3, S('b8') - 0.2, { hw: 34, hh: 50 }); label('IS ALL BLOOD RED?', 960, 820, t, S('b7q') + 0.2, S('b8') - 0.3, GOLD, 40); return; }
  placeIcon('octo', [[480, 470]], 2.8, t, W_('b8', 'octopuses') - 0.3, S('f1') - 0.3, { hw: 66, hh: 90 }); label('COPPER → BLUE BLOOD', 480, 800, t, W_('b8', 'copper'), S('f1') - 0.4, '#9fd3ff', 32);
  if (t > W_('b8', 'dinosaurs') - 0.2) { dino(t, 1520, 720, 0.62 * spring(t - W_('b8', 'dinosaurs') + 0.2, 0.5, 12)); reg('hero', 'dino', 1520 - 270, 720 - 280, 1520 + 210, 730); }
  label('IRON → RED BLOOD', 1440, 820, t, W_('b8', 'red'), S('f1') - 0.4, '#ffb0bc', 32); label('JUST LIKE YOURS', 1440, 900, t, W_('b8', 'yours'), S('f1') - 0.4, WHITE, 28);
}
function sFossil(t) {
  if (t < S('f3') - 0.1) { sky(t, '#f7c970', '#ea9a52'); rr2(0, 780, W, 300, 0, '#a8754a'); rr2(0, 780, W, 24, 0, '#c18a58');
    const k = clamp((t - W_('f2', 'bacteria')) / 4.5); ctx.save(); ctx.globalAlpha = clamp(k * 1.5); skeleton(t, 900, 790, 1.4, 0); ctx.restore(); if (k < 1) dino(t, 1000, 792 + k * 60, 1.1, { walk: 0, dead: t > W_('f2', 'dies') - 0.1 ? 1 : 0, alpha: 1 - k }); reg('hero', 'carcass', 400, 300, 1380, 880);
    placeIcon('microbe', [[1640, 360], [300, 360]], 2.0, t, W_('f2', 'bacteria') - 0.2, S('f3') - 0.2, { hw: 76, hh: 40 }); placeIcon('microbe', [[300, 360], [1640, 600]], 1.8, t, W_('f2', 'bacteria') + 0.4, S('f3') - 0.2, { hw: 76, hh: 40 });
    label('SOFT PARTS GONE IN WEEKS', 960, 130, t, W_('f2', 'weeks'), S('f3') - 0.3, '#5e2618', 36, { color: WHITE }); return; }
  if (t < S('f4q') - 0.1) { const k = clamp((t - S('f3')) / 6), st = clamp((t - W_('f3', 'millions')) / 2.5);
    sky(t, '#f7c970', '#ea9a52'); const top = lerp(780, 300, k);
    for (let i = 0; i < 6; i++) { const y = lerp(780, 300, clamp(k * 6 - i)); rr2(0, y, W, 1080 - y, 0, ['#a8754a', '#b98a5a', '#9a6a42', '#c49a68', '#8f6040', '#b07a50'][i]); }
    skeleton(t, 900, 900, 1.4, st); reg('hero', 'skeleton', 440, 780, 1380, 960);
    if (t > W_('f3', 'water')) for (let i = 0; i < 14; i++) { const p = ((t - W_('f3', 'water')) * 0.4 + i / 14) % 1; circ(300 + (i * 113) % 1320, lerp(top, 760, p), 8, 'rgba(143,216,230,0.85)'); }
    if (t > W_('f3', 'minerals')) for (let i = 0; i < 30; i++) { const a = 0.5 + 0.5 * Math.sin(t * 5 + i); ctx.save(); ctx.globalAlpha = a; ICONS_star(470 + (i * 37) % 860, 820 + (i * 23) % 120, 7); ctx.restore(); }
    label('BURIED FAST', 480, 140, t, W_('f3', 'buried'), S('f4q') - 0.3, WHITE, 34); label('MINERALS FILL EVERY PORE', 1340, 140, t, W_('f3', 'minerals'), S('f4q') - 0.3, GOLD, 34); label('MILLIONS OF YEARS → BONE BECOMES ROCK', 960, 230, t, W_('f3', 'millions'), S('f4q') - 0.3, WHITE, 30); return; }
  worldBG(t, 'gold');
  if (t < S('f5') - 0.1) { placeIcon('rdrop', [[960, 450]], 3.4, t, S('f4q'), S('f5') - 0.2, { hw: 34, hh: 50, }); ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3); ICONS_star(1120, 300, 18); ctx.restore(); label('LONG GONE?', 960, 800, t, S('f4q') + 0.2, S('f5') - 0.3, WHITE, 44); return; }
  if (t < S('f6') - 0.1) { tile3(t, [['microbe', 'SOFT TISSUE ROTS', '#c8505e', W_('f5', 'soft'), { mark: 0 }], ['nodna', 'BIG MOLECULES BREAK', '#5b4fd6', W_('f5', 'molecules'), { mark: 0 }], ['dbone', 'HARD PARTS STAY', '#3f8f6a', W_('f5', 'hard'), { mark: 1 }]], 560); label('WHAT SCIENTISTS ASSUMED', 960, 140, t, W_('f5', 'assumed') - 0.3, S('f6') - 0.3, WHITE, 34); return; }
  placeIcon('dbone', [[560, 500]], 3.2, t, S('f6'), S('d1') - 0.3, { hw: 90, hh: 66 }); arrow(960, 500, t, S('f6') + 0.4, 110); placeIcon('stonebone', [[1360, 500]], 3.2, t, W_('f6', 'copy'), S('d1') - 0.3, { hw: 90, hh: 66 });
  label('THE SHAPE SURVIVES', 960, 820, t, W_('f6', 'shape'), S('d1') - 0.4, GOLD, 36); label("THE MOLECULES DON'T", 960, 910, t, W_('f6', 'original'), S('d1') - 0.4, WHITE, 32); label('A COPY IN STONE', 1360, 200, t, W_('f6', 'copy'), S('d1') - 0.4, WHITE, 32);
}
function sDino(t) {
  if (t < S('d3') - 0.1) { worldBG(t, 'teal'); dino(t, 820, 920, 1.18); reg('hero', 'aratasaurus', 820 - 500, 920 - 520, 820 + 380, 940);
    tag('ARATASAURUS', 760, 150, t, W_('d2', ['aratasaurus', 'arat', 'aru', 'ara']), S('d3') - 0.3, '#0b4f5c', 48);
    placeIcon('person', [[1580, 620]], 3.0, t, W_('d2', 'three') - 0.3, S('d3') - 0.2, { hw: 40, hh: 80 }); label('~3 M LONG', 1580, 900, t, W_('d2', 'three'), S('d3') - 0.3, GOLD, 34);
    label('FEATHERED MEAT-EATER', 1580, 210, t, W_('d2', 'feathered'), S('d3') - 0.3, WHITE, 28); label('115 MILLION YEARS AGO', 820, 1020, t, W_('d2', 'hundred') - 0.2, S('d3') - 0.3, WHITE, 28); return; }
  if (t < S('d3b') - 0.1) { worldBG(t, 'teal'); placeIcon('legbone', [[470, 480]], 2.6, t, W_('d3', 'leg') - 0.3, S('d3b') - 0.2, { hw: 64, hh: 140 }); label('PART OF ONE LEG', 470, 900, t, W_('d3', 'part'), S('d3b') - 0.3, WHITE, 32);
    placeIcon('museum', [[1340, 470]], 2.6, t, W_('d3', 'museum') - 0.3, S('d3b') - 0.2, { hw: 104, hh: 104 }); label('NATIONAL MUSEUM FIRE · 2018', 1340, 790, t, W_('d3', 'burned'), S('d3b') - 0.3, GOLD, 30);
    tag('THE FOSSIL SURVIVED', 1340, 900, t, W_('d3', 'survived'), S('d3b') - 0.3, '#3f8f6a', 40); label('ITS NAME: "BORN FROM THE FIRE"', 960, 120, t, W_('d3', 'name'), S('d3b') - 0.3, WHITE, 28); return; }
  if (t < S('d4q') - 0.1) { worldBG(t, 'teal'); samerica(t, 520, 520, 1.15, W_('d3b', 'gypsum') - 0.3); reg('hero', 'map', 200, 140, 840, 1000);
    placeIcon('mine', [[1380, 400]], 2.4, t, W_('d3b', 'gypsum') - 0.2, S('d4q') - 0.2, { hw: 96, hh: 90 }); label('2008 · SANTANA DO CARIRI', 1380, 650, t, W_('d3b', 'town') - 0.3, S('d4q') - 0.3, WHITE, 30);
    tag('ONLY ~4 YEARS OLD', 1380, 800, t, W_('d3b', 'four'), S('d4q') - 0.3, '#e2457a', 42); return; }
  if (t < S('d6') - 0.1) { worldBG(t, 'indigo'); const z = 1 + clamp((t - W_('d5', 'canals')) / 3) * 0.25; ctx.save(); ctx.translate(720, 540); ctx.scale(z, z);
    circ(0, 0, 330, '#e6d6b6'); circ(0, 0, 300, '#d9c7a0'); for (let i = 0; i < 14; i++) { const a = i * 2.4, r = 80 + (i * 53) % 200; ctx.save(); ctx.translate(Math.cos(a) * r, Math.sin(a) * r); circ(0, 0, 34, '#c9b48a'); circ(0, 0, 22, '#b39a6a'); const on = t > W_('d5', 'canals') && i % 3 === 0; circ(0, 0, 11, on ? '#c33244' : '#5e4a2a'); ctx.restore(); } ctx.restore();
    reg('hero', 'bone slice', 720 - 340 * z, 540 - 340 * z, 720 + 340 * z, 540 + 340 * z); placeIcon('scope', [[1580, 460]], 2.4, t, W_('d5', 'electron') - 0.3, S('d6') - 0.2, { hw: 66, hh: 80 });
    label('BLOOD-VESSEL CANALS', 1580, 120, t, W_('d5', 'canals'), S('d6') - 0.3, GOLD, 30); label('THIN SLICES', 1580, 760, t, W_('d5', 'thin'), S('d6') - 0.3, WHITE, 30); label('ELECTRON MICROSCOPE', 1580, 850, t, W_('d5', 'electron'), S('d6') - 0.3, TEAL, 30); return; }
  worldBG(t, 'indigo'); const k = spring(t - S('d6'), 0.5, 10); circ(620, 520, 320 * k, '#5e4a2a'); circ(620, 520, 290 * k, '#3a2a1a'); reg('hero', 'canal', 300, 200, 940, 840);
  ctx.save(); ctx.translate(620, 520); ctx.scale(3.4 * k, 3.4 * k); drawIcon('fcells', t); ctx.restore();
  if (t > W_('d6', 'thinner') - 0.3) { const h = clamp((t - W_('d6', 'thinner') + 0.3) / 0.6); rr2(1150, 160, 220, 560 * h, 40, '#3a2a1a'); rr2(1170, 180, 30, 520 * h, 15, 'rgba(255,255,255,0.15)'); reg('hero', 'hair', 1140, 150, 1380, 730); label('A HUMAN HAIR', 1260, 800, t, W_('d6', 'hair'), S('p1') - 0.4, WHITE, 26); }
  if (t > W_('d6', ['20', 'twenty']) - 0.2) { ctx.save(); ctx.translate(1580, 330); ctx.fillStyle = '#a8452f'; ctx.beginPath(); ctx.ellipse(0, 0, 56, 38, 0.3, 0, 6.283); ctx.fill(); ctx.restore(); reg('hero', 'fossil cell', 1510, 280, 1650, 380); label('FOSSIL CELL ~20 µm', 1600, 450, t, W_('d6', ['20', 'twenty']), S('p1') - 0.4, GOLD, 26); }
  if (t > W_('d6', 'twice') - 0.2) { rbcDisc(1580, 610, 21, 0.9); reg('hero', 'your cell', 1550, 580, 1610, 640); label('YOURS ~8 µm', 1600, 700, t, W_('d6', 'twice'), S('p1') - 0.4, '#ffb0bc', 26); }
  label('CLUSTERS OF OVAL BODIES', 620, 950, t, W_('d6', 'clusters'), S('p1') - 0.4, WHITE, 32);
}
function sProof(t) {
  worldBG(t, 'indigo');
  if (t < S('p3') - 0.1) { circ(560, 520, 240, '#6b5a4a'); for (let i = 0; i < 12; i++) circ(560 + Math.cos(i * 2.4) * (40 + (i * 37) % 150), 520 + Math.sin(i * 2.4) * (40 + (i * 37) % 150), 16, '#c9a24a'); reg('hero', 'specks', 310, 270, 810, 770);
    label('1997', 560, 140, t, W_('p2', ['1997', 'nineteen']), S('p3') - 0.3, WHITE, 40); label('ROUND SPECKS', 560, 860, t, W_('p2', 'round'), S('p3') - 0.3, WHITE, 32);
    placeIcon('pyrite', [[1380, 470]], 2.8, t, W_('p2', 'pyrite') - 0.2, S('p3') - 0.2, { hw: 68, hh: 70 }); tag("PYRITE · FOOL'S GOLD", 1380, 800, t, W_('p2', 'pyrite'), S('p3') - 0.3, '#a8862a', 40); return; }
  if (t < S('p4') - 0.1) { [['Fe', 'IRON', '#c8553d', 'iron'], ['C', 'CARBON', '#3a3f5a', 'carbon'], ['N', 'NITROGEN', '#127b84', 'nitrogen']].forEach(([sym, nm, col, w], i) => placeIcon('elem', [[560 + i * 400, 300]], 1.75, t, W_(`p3`, w) - 0.1, S('p4') - 0.2, { sym, name: nm, col, hw: 60, hh: 60 }));
    placeIcon('laser', [[520, 740]], 2.2, t, W_('p3', 'laser') - 0.2, S('p4') - 0.2, { hw: 96, hh: 34 }); label('LASER: PORPHYRIN RINGS', 520, 940, t, W_('p3', 'porphyrins'), S('p4') - 0.3, GOLD, 28);
    placeIcon('heme', [[1400, 740]], 2.0, t, W_('p3', 'heme', 1) - 0.2, S('p4') - 0.2, { hw: 70, hh: 70 }); label('LAB TEST: HEME', 1400, 960, t, W_('p3', 'heme', 1), S('p4') - 0.3, WHITE, 28); return; }
  if (t < S('p5q') - 0.1) { placeIcon('leaf', [[620, 480]], 3.0, t, W_('p4', 'chlorophyll') - 0.3, S('p5q') - 0.2, { hw: 70, hh: 50 }); stamp(0, 820, 340, t, W_('p4', 'ruled')); label('NOT CHLOROPHYLL', 620, 760, t, W_('p4', 'ruled'), S('p5q') - 0.3, GOLD, 34);
    placeIcon('heme', [[1340, 480]], 2.6, t, W_('p4', 'similar') - 0.3, S('p5q') - 0.2, { hw: 70, hh: 70 }); label('A VERY SIMILAR RING', 1340, 760, t, W_('p4', 'similar'), S('p5q') - 0.3, WHITE, 32); return; }
  if (t < S('p6') - 0.1) { const f = clamp((t - S('p5q')) / 2.5); hourglass(t, 960, 470, 1.15, f); reg('hero', 'hourglass', 820, 240, 1100, 700); label('100 MILLION YEARS?', 960, 860, t, S('p5q') + 0.2, S('p6') - 0.3, GOLD, 40); return; }
  rr2(0, 700, W, 380, 0, '#4a3a2e'); rr2(0, 700, W, 20, 0, '#5e4a3a'); reg('panel', 'mud', 0, 700, W, 1080);
  placeIcon('o2', [[420, 400]], 2.4, t, W_('p6', 'oxygen') - 0.3, S('k1') - 0.3, { hw: 50, hh: 32 }); stamp(0, 560, 310, t, W_('p6', 'little')); label('MUD · LITTLE OXYGEN', 420, 560, t, W_('p6', 'mud'), S('k1') - 0.4, WHITE, 30);
  placeIcon('coffin', [[1300, 470]], 2.6, t, W_('p6', 'hausmannite', 0) - 0.3, S('k1') - 0.3, { hw: 94, hh: 76 }); tag('HAUSMANNITE', 1300, 120, t, W_('p6', ['hausmannite', 'horse', 'house', 'haus']), S('k1') - 0.4, '#6b5a4a', 44);
  label('A MANGANESE MINERAL', 1300, 230, t, W_('p6', 'manganese'), S('k1') - 0.4, GOLD, 30); label('SEALED LIKE A TINY STONE COFFIN', 960, 880, t, W_('p6', 'sealed'), S('k1') - 0.4, WHITE, 34);
}
function sSkeptic(t) {
  worldBG(t, 'grey');
  if (t < S('k3') - 0.1) { const glow = clamp((t - W_('k2', 'whole')) / 0.8); ctx.save(); ctx.translate(560, 480); ctx.scale(3.0, 3.0); if (glow > 0) { ctx.shadowColor = '#b48cff'; ctx.shadowBlur = 40 * glow; } drawIcon('dbone', t); ctx.restore(); reg('hero', 'whole bone', 300, 290, 820, 670);
    placeIcon('magnifier', [[560, 170], [1000, 200]], 1.5, t, W_('k2', 'signal') - 0.3, S('k3') - 0.2, { hw: 66, hh: 66 }); label('HEME SIGNAL: THE WHOLE BONE', 560, 820, t, W_('k2', 'whole'), S('k3') - 0.3, GOLD, 30);
    placeIcon('fcells', [[1260, 470]], 2.0, t, W_('k2', 'cells', 1) - 0.3, S('k3') - 0.2, { hw: 66, hh: 66 }); placeIcon('ovalcell', [[1640, 470]], 1.7, t, W_('k2', 'birds') - 0.3, S('k3') - 0.2, { hw: 76, hh: 50 });
    label('≠', 1450, 470, t, W_('k2', 'match'), S('k3') - 0.3, '#ff9fb4', 54, { pill: false }); label('SIZE & SHAPE DON\'T MATCH', 1450, 700, t, W_('k2', 'match'), S('k3') - 0.3, WHITE, 28); label('BIRD / REPTILE CELL', 1640, 600, t, W_('k2', 'reptiles'), S('k3') - 0.3, TEAL, 22); return; }
  if (t < S('k4q') - 0.1) { placeIcon('quote', [[960, 420]], 3.0, t, S('k3'), S('k4q') - 0.2, { hw: 100, hh: 90 }); label('"I AM NOT CONVINCED"', 960, 760, t, W_('k3', 'not'), S('k4q') - 0.3, GOLD, 44); label('MARY SCHWEITZER · NC STATE', 960, 860, t, S('k3') + 0.2, S('k4q') - 0.3, WHITE, 28); return; }
  if (t < S('k6') - 0.1) { placeIcon('femur', [[480, 520]], 2.4, t, S('k4q') + 0.2, S('k6') - 0.2, { hw: 60, hh: 140 }); label('T. REX · 68 MILLION YEARS', 480, 120, t, W_('k5', ['68', 'sixty']), S('k6') - 0.3, WHITE, 30);
    placeIcon('flask', [[960, 520]], 2.4, t, W_('k5', 'dissolved') - 0.2, S('k6') - 0.2, { hw: 44, hh: 52 }); label('2005', 960, 800, t, W_('k5', ['2005', 'two']), S('k6') - 0.3, GOLD, 40);
    placeIcon('vessels', [[1480, 500]], 2.4, t, W_('k5', 'stretchy') - 0.3, S('k6') - 0.2, { hw: 100, hh: 50 }); tag('SOFT, STRETCHY VESSELS', 1480, 760, t, W_('k5', 'soft'), S('k6') - 0.3, '#e2457a', 36); label('ARGUED ABOUT FOR YEARS', 1480, 880, t, W_('k5', 'argued'), S('k6') - 0.3, WHITE, 28); return; }
  placeIcon('scales', [[960, 470]], 2.6, t, W_('k6', 'bold') - 0.4, S('m1') - 0.3, { hw: 108, hh: 90 }); label('PROF. KLITI GRICE · LEAD AUTHOR', 960, 120, t, W_('k6', 'lead'), S('m1') - 0.4, WHITE, 30);
  label('NOBODY KNOWS WHAT A DINO BLOOD CELL LOOKED LIKE', 960, 760, t, W_('k6', 'nobody'), S('m1') - 0.4, GOLD, 28); tag('BOLD CLAIM → YEARS OF TESTING', 960, 880, t, W_('k6', 'bold'), S('m1') - 0.4, '#5b4fd6', 38);
}
function sMosq(t) {
  worldBG(t, 'gold');
  if (t < S('m3') - 0.1) { placeIcon('shale', [[700, 500]], 3.2, t, S('m1') + 1.0, S('m3') - 0.2, { hw: 108, hh: 78 }); label('46 MILLION YEARS · MONTANA', 700, 870, t, W_('m2', 'montana') - 0.4, S('m3') - 0.3, WHITE, 32);
    label('IN STONE, NOT AMBER', 1520, 300, t, W_('m2', 'stone'), S('m3') - 0.3, WHITE, 30); tag('BELLY FULL OF BLOOD', 1520, 470, t, W_('m2', 'belly'), S('m3') - 0.3, '#c33244', 34); tag('HEME FOUND', 1520, 640, t, W_('m2', 'heme'), S('m3') - 0.3, '#5b4fd6', 40); return; }
  if (t < S('m3b') - 0.1) { tile3(t, [['nodna', 'DNA', '#5b4fd6', W_('m3', 'dna') - 0.2, { mark: 0 }], ['heme', 'IRON-BOUND HEME', '#c8505e', W_('m3', 'tough'), { mark: 1 }]].map(x => x), 560); label("FRAGILE MOLECULES DON'T SURVIVE", 1540, 300, t, W_('m3', 'fragile'), S('m3b') - 0.3, WHITE, 26); label('TOUGH ONES CAN', 1540, 400, t, W_('m3', 'tough'), S('m3b') - 0.3, GOLD, 30); return; }
  if (t < S('m4') - 0.1) { placeIcon('copal', [[620, 480]], 3.4, t, W_('m3b', 'copal') - 0.4, S('m4') - 0.2, { hw: 82, hh: 72 }); label('COPAL = YOUNG AMBER', 620, 830, t, W_('m3b', 'young'), S('m4') - 0.3, WHITE, 32);
    label('~10,000 YEARS OLD', 1420, 300, t, W_('m3b', ['10', 'ten']), S('m4') - 0.3, WHITE, 30); label('LESS THAN 60 YEARS OLD', 1420, 400, t, W_('m3b', 'less'), S('m4') - 0.3, WHITE, 30); tag('NO CONVINCING DNA', 1420, 560, t, W_('m3b', 'neither'), S('m4') - 0.3, '#e2457a', 42); label('MANCHESTER · 2013', 1420, 680, t, W_('m3b', 'manchester'), S('m4') - 0.3, GOLD, 26); return; }
  timeline(t, S('m4'), 600, [[66, 'LAST GIANT DINOSAURS · 66 MYA', WHITE, S('m4') + 0.3, true], [46, 'MOSQUITO · 46 MYA', '#e2457a', W_('m4', 'mosquito'), false]], S('x1') - 0.4);
  placeIcon('dinoI', [[425, 260]], 2.0, t, S('m4') + 0.3, S('x1') - 0.3, { hw: 110, hh: 60 }); placeIcon('mosquito', [[940, 860]], 1.8, t, W_('m4', 'mosquito'), S('x1') - 0.3, { hw: 70, hh: 50 });
  tag('20 MILLION YEARS TOO LATE', 1420, 860, t, W_('m4', ['20', 'twenty']), S('x1') - 0.4, '#9b3352', 36);
}
function sNucleus(t) {
  worldBG(t, 'coral');
  if (t < S('x3') - 0.1) { rbcDisc(620, 520, 230, 0.9, 0.1); reg('hero', 'your red cell', 380, 280, 860, 760);
    const tn = W_('x2', 'nucleus'), k = clamp((t - tn) / 1.4); if (t > tn - 1.5) { ctx.save(); ctx.globalAlpha = 1 - clamp((t - tn - 1.6) / 0.6); ctx.fillStyle = '#7f5fd6'; ctx.beginPath(); ctx.ellipse(lerp(620, 1060, eic(k)), lerp(520, 420, eic(k)), 56, 40, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    label('MAMMALS: NUCLEUS THROWN OUT', 1360, 760, t, W_('x2', 'throw'), S('x3') - 0.3, WHITE, 30); label('MORE ROOM FOR HEMOGLOBIN', 1360, 860, t, W_('x2', 'room'), S('x3') - 0.3, GOLD, 30); return; }
  if (t < S('x4q') - 0.1) { placeIcon('ovalcell', [[560, 460]], 3.0, t, S('x3'), S('x4q') - 0.2, { hw: 76, hh: 50 }); label('BIRDS & REPTILES KEEP IT', 560, 700, t, W_('x3', 'keep'), S('x4q') - 0.3, WHITE, 30); label('OVAL CELLS', 560, 790, t, W_('x3', 'oval'), S('x4q') - 0.3, GOLD, 30);
    placeIcon('chicken', [[1230, 400]], 2.0, t, W_('x3', 'birds', 1) - 0.3, S('x4q') - 0.2, { hw: 90, hh: 80 }); placeIcon('dinoI', [[1665, 420]], 1.7, t, W_('x3', 'dinosaurs') - 0.2, S('x4q') - 0.2, { hw: 110, hh: 60 });
    tag('DINO CELLS: PROBABLY DNA INSIDE', 1420, 700, t, W_('x3', 'probably'), S('x4q') - 0.3, '#7f5fd6', 32); return; }
  if (t < S('x5') - 0.1) { placeIcon('ovalcell', [[960, 460]], 3.2, t, S('x4q'), S('x5') - 0.2, { hw: 76, hh: 50 }); label('DINOSAUR DNA IN THERE?', 960, 760, t, S('x4q') + 0.2, S('x5') - 0.3, GOLD, 40); return; }
  if (t < S('x6') - 0.1) { placeIcon('moa', [[720, 560]], 3.0, t, W_('x5', 'moa') - 0.4, S('x6') - 0.2, { hw: 70, hh: 140 }); tag('MOA', 1380, 170, t, W_('x5', 'moa'), S('x6') - 0.3, '#9b3352', 44);
    label('GIANT EXTINCT BIRDS · NEW ZEALAND', 1380, 300, t, W_('x5', 'giant'), S('x6') - 0.3, WHITE, 26); for (let i = 0; i < 12; i++) { const t0 = W_('x5', ['158', 'hundred']) + i * 0.06; if (t > t0) { ctx.save(); ctx.translate(1180 + (i % 4) * 110, 470 + Math.floor(i / 4) * 90); ctx.scale(0.7 * spring(t - t0, 0.5, 13), 0.7 * spring(t - t0, 0.5, 13)); drawIcon('dbone', t + i); ctx.restore(); } }
    reg('hero', 'bones', 1100, 410, 1580, 720); label('158 DATED BONES · 2012', 1380, 820, t, W_('x5', ['158', 'hundred']), S('x6') - 0.3, GOLD, 30); return; }
  const tt = S('x6'), hl = 1.6;   // a long DNA ladder whose rungs snap: half of what is left every "half-life"
  for (let i = 0; i < 40; i++) { const x = 160 + i * 41, ph = t * 2 + i * 0.5, y1 = 420 + Math.sin(ph) * 50, y2 = 420 - Math.sin(ph) * 50; const r = rng(i * 7 + 1)(), broken = r > Math.pow(0.5, Math.max(0, (t - W_('x6', 'half') + 0.2) / hl));
    if (!broken) rr2(x - 2, Math.min(y1, y2), 4, Math.abs(y1 - y2) + 1, 2, 'rgba(255,255,255,0.7)'); circ(x, y1 + (broken ? 20 : 0), 11, '#ff8f4a'); circ(x, y2 - (broken ? 20 : 0), 11, '#8fd8e6'); }
  reg('hero', 'dna strand', 130, 330, 1790, 510); tag('HALF-LIFE ≈ 521 YEARS', 960, 690, t, W_('x6', 'half'), S('n1') - 0.4, '#9b3352', 48); label('EVERY ~5 CENTURIES, HALF THE BONDS BREAK', 960, 830, t, W_('x6', 'every'), S('n1') - 0.4, WHITE, 30);
}
function sClock(t) {
  worldBG(t, 'night');
  if (t < S('n2') - 0.1) { hourglass(t, 960, 470, 1.15, clamp((t - S('n1')) / 3)); reg('hero', 'hourglass', 820, 240, 1100, 700); label('HOW LONG DOES DNA LAST?', 960, 860, t, S('n1') + 0.8, S('n2') - 0.3, GOLD, 40); return; }
  if (t < S('n2b') - 0.1) { placeIcon('snow', [[300, 300]], 2.0, t, W_('n2', 'frozen') - 0.3, S('n2b') - 0.2, { hw: 60, hh: 60 }); label('EVEN FROZEN', 300, 500, t, W_('n2', 'frozen'), S('n2b') - 0.3, TEAL, 28);
    meter(620, 380, 1100, 1.5 / 6.8, t, W_('n2', 'unreadable') - 0.2, S('n2b') - 0.3, '#ffd98a', '#ff8f4a', 'UNREADABLE AFTER ~1.5 MILLION YEARS'); meter(620, 640, 1100, 1, t, W_('n2', 'every'), S('n2b') - 0.3, '#ff8f4a', '#e2457a', 'EVERY BOND GONE BY 6.8 MILLION'); return; }
  if (t < S('n3') - 0.1) { placeIcon('scrapbook', [[960, 470]], 3.4, t, S('n2b'), S('n3') - 0.2, { hw: 130, hh: 80 }); label('STITCHES SNAP → PAGES SPLIT', 960, 850, t, W_('n2b', 'stitches'), S('n3') - 0.3, WHITE, 34); label('TOO TINY TO READ', 960, 950, t, W_('n2b', 'tiny'), S('n3') - 0.3, GOLD, 32); return; }
  if (t < S('n4') - 0.1) { timeline(t, S('n3'), 560, [[2, 'OLDEST DNA · 2 MYA · GREENLAND', '#8fd8e6', W_('n3', 'oldest'), false], [66, 'LAST GIANT DINOSAURS · 66 MYA', WHITE, W_('n3', 'giant'), true]], S('n4') - 0.3);
    tag('MORE THAN 30× FURTHER BACK', 960, 920, t, W_('n3', 'thirty'), S('n4') - 0.3, '#e2457a', 44); placeIcon('snow', [[1580, 220]], 1.5, t, W_('n3', 'frozen'), S('n4') - 0.2, { hw: 60, hh: 60 }); return; }
  tile3(t, [['dbone', 'NOT IN BONES', '#3a3f8a', W_('n4', 'bones'), { mark: 0 }], ['mosquito', 'NOT IN MOSQUITOES', '#5b4fd6', W_('n4', 'mosquitoes'), { mark: 0 }], ['nodna', 'NO DNA TO CLONE', '#9b3352', W_('n4', 'clone') - 0.3, { mark: 0 }]], 560);
}
function sTell(t) {
  worldBG(t, 'teal');
  if (t < S('r2') - 0.1) { placeIcon('fcells', [[960, 460]], 3.2, t, S('r1') + 0.9, S('r2') - 0.2, { hw: 68, hh: 66 }); label('WHY DOES IT MATTER?', 960, 780, t, S('r1') + 1.0, S('r2') - 0.3, GOLD, 40); return; }
  if (t < S('r3') - 0.1) { placeIcon('snowtooth', [[620, 470]], 3.2, t, W_('r2', 'rhino') - 0.4, S('r3') - 0.2, { hw: 84, hh: 92 }); label('RHINO TOOTH · CANADIAN ARCTIC', 620, 860, t, W_('r2', 'arctic') - 0.3, S('r3') - 0.3, WHITE, 30);
    tag('PROTEINS · 20+ MILLION YEARS', 1400, 330, t, W_('r2', 'proteins'), S('r3') - 0.3, '#0b4f5c', 38); label('2025', 1400, 200, t, W_('r2', ['2025', 'twenty']), S('r3') - 0.3, GOLD, 40);
    placeIcon('shield', [[1400, 620]], 2.2, t, W_('r2b', 'armoured') - 0.4, S('r3') - 0.2, { hw: 50, hh: 54 }); label('ENAMEL = AN ARMOURED BOX', 1400, 860, t, W_('r2b', 'enamel'), S('r3') - 0.3, GOLD, 30); return; }
  if (t < S('r3b') - 0.1) { tile3(t, [['o2', 'OXYGEN', '#127b84', W_('r3', 'oxygen')], ['dinoI', 'HOW ACTIVE', '#c8553d', W_('r3', 'active')], ['ftree', 'RELATIVES', '#5b4fd6', W_('r3', 'relatives')]], 560); return; }
  if (t < S('r4') - 0.1) { dino(t, 760, 940, 1.0, { speed: 9 }); reg('hero', 'dino', 760 - 430, 940 - 440, 760 + 330, 950); placeIcon('thermo', [[1480, 420]], 2.6, t, W_('r3b', 'warm') - 0.4, S('r4') - 0.2, { level: 0.75, hw: 36, hh: 92 });
    label('WARM-BLOODED?', 1480, 720, t, W_('r3b', 'warm'), S('r4') - 0.3, GOLD, 38); label('HOW ACTIVE?', 1480, 820, t, W_('r3b', 'active'), S('r4') - 0.3, WHITE, 34); return; }
  placeIcon('drawers', [[700, 500]], 2.6, t, W_('r4', 'drawers') - 0.6, S('y1') - 0.3, { hw: 106, hh: 90 }); label('MAYBE NOT SO RARE', 1400, 380, t, W_('r4', 'rare'), S('y1') - 0.4, GOLD, 36); label('OLD FOSSILS MAY HIDE MORE', 1400, 480, t, W_('r4', 'hiding'), S('y1') - 0.4, WHITE, 30);
}
function sKitchen(t) {
  worldBG(t, 'cream');
  if (t < S('y2') - 0.1) { dino(t, 900, 960, 1.1); reg('hero', 'dino', 900 - 480, 960 - 480, 900 + 360, 970); label('A LIVING DINOSAUR?', 960, 140, t, S('y1') + 1.0, S('y2') - 0.3, '#5e2618', 40, { color: WHITE }); return; }
  if (t < S('y2b') - 0.1) { placeIcon('chicken', [[540, 520]], 3.2, t, S('y2'), S('y2b') - 0.2, { hw: 92, hh: 80 }); if (t > W_('y2', 'descend') - 0.3) { dino(t, 1380, 900, 0.95, { alpha: clamp((t - W_('y2', 'descend') + 0.3) / 0.6) }); reg('hero', 'dino', 1380 - 410, 900 - 420, 1380 + 310, 910); }
    tag('BIRDS ARE LIVING DINOSAURS', 960, 130, t, W_('y2', 'birds'), S('y2b') - 0.3, '#c95a7c', 44); label('COUSINS OF ARATASAURUS', 1380, 990, t, W_('y2', 'cousins'), S('y2b') - 0.3, '#5e2618', 28, { color: WHITE }); return; }
  if (t < S('y3') - 0.1) { placeIcon('femur', [[380, 500]], 2.2, t, W_('y2b', 'rex') - 0.4, S('y3') - 0.2, { hw: 60, hh: 140 }); label('T. REX COLLAGEN · 2008', 380, 900, t, W_('y2b', 'collagen'), S('y3') - 0.3, '#5e2618', 26, { color: WHITE });
    arrow(760, 500, t, W_('y2b', 'dozens')); placeIcon('chicken', [[1100, 470]], 2.2, t, W_('y2b', 'chickens') - 0.2, S('y3') - 0.2, { hw: 92, hh: 80 }); placeIcon('ostrich', [[1560, 450]], 2.0, t, W_('y2b', 'ostriches') - 0.3, S('y3') - 0.2, { hw: 66, hh: 112 });
    tag('CLOSEST MATCHES', 1330, 840, t, W_('y2b', 'closest'), S('y3') - 0.3, '#c95a7c', 40); return; }
  if (t < S('y4') - 0.1) { const m = clamp((t - W_('y3', 'snout') + 0.4) / 1.2); placeIcon('egg', [[760, 500]], 3.6, t, S('y3'), S('y4') - 0.2, { snout: m > 0 ? 1 - m : 1, hw: 64, hh: 80 });
    label('2015 · CHICKEN EMBRYOS', 1440, 260, t, W_('y3', 'chicken'), S('y4') - 0.3, '#5e2618', 30, { color: WHITE }); label('TWO GROWTH SIGNALS BLOCKED', 1440, 360, t, W_('y3', 'blocked'), S('y4') - 0.3, '#5e2618', 26, { color: WHITE });
    tag('BEAK → DINOSAUR-LIKE SNOUT', 1440, 560, t, W_('y3', 'snout'), S('y4') - 0.3, '#c95a7c', 34); label('NONE WERE HATCHED', 1440, 700, t, W_('y3', 'none'), S('y4') - 0.3, '#5e2618', 26, { color: WHITE }); return; }
  placeIcon('blueprint', [[760, 500]], 3.6, t, S('y4'), S('o1') - 0.3, { hw: 66, hh: 82 }); label('THE OLD BLUEPRINT', 1430, 440, t, W_('y4', 'blueprint'), S('o1') - 0.4, '#5e2618', 38, { color: WHITE }); label('STILL INSIDE EVERY EGG', 1430, 540, t, W_('y4', 'egg') - 0.4, S('o1') - 0.4, '#5e2618', 30, { color: GOLD });
}
function sOutro(t) {
  const C = CUE; worldBG(t, 'night');
  if (t < S('o3') - 0.1) { ctx.save(); ctx.translate(1300, 520); rr2(-300, -220, 600, 440, 40, '#5e5446'); for (let i = 0; i < 6; i++) rr2(-300, -190 + i * 76, 600, 4, 2, 'rgba(30,24,20,0.4)'); ctx.restore(); reg('hero', 'stone', 1000, 300, 1600, 740);
    if (t > W_('o2', 'molecule') - 0.3) { ctx.save(); ctx.translate(1300, 520); ctx.scale(2.6, 2.6); drawIcon('heme', t); ctx.restore(); } else { ctx.save(); ctx.translate(1300, 520); ctx.scale(2.4, 2.4); drawIcon('fcells', t); ctx.restore(); }
    dino(t, 520, 900, 0.8, { alpha: clamp((t - S('o1')) / 0.6) * (1 - clamp((t - W_('o2', 'stranger')) / 0.6) * 0.6) }); reg('hero', 'dino', 520 - 350, 900 - 350, 520 + 270, 910);
    label('NOT A LIVING DINOSAUR', 520, 140, t, W_('o2', 'living'), S('o3') - 0.3, WHITE, 34); label('A MOLECULE · 115 MILLION YEARS IN STONE', 1300, 860, t, W_('o2', 'molecule'), S('o3') - 0.3, GOLD, 28); return; }
  dino(t, 560, 940, 0.9); reg('hero', 'dino', 560 - 380, 940 - 390, 560 + 290, 950);
  if (t > S('o3') + 0.3) { reg('label', 'title', 1000, 300, 1880, 640); LABELQ.push(() => { riseText('SCIENTISTS FOUND', 1440, 400, S('o3') + 0.3, t, { size: 76, weight: 700, color: WHITE, ls: 5, pill: false, dur: 0.8 });
    riseText('DINOSAUR BLOOD', 1440, 540, S('o3') + 0.5, t, { size: 104, weight: 700, color: GOLD, ls: 6, pill: false, dur: 0.8 }); }); sfx('title', S('o3') + 0.3); }
  if (t > S('o4') - 0.2) placeIcon('subscribe', [[1440, 720]], 1.2, t, W_('o4', 'subscribe'), 999, { hw: 124, hh: 38 });
  if (t > C.end) for (const [x, y] of [[1240, 900], [1640, 900]]) { const k = spring(t - C.end - 0.2, 0.5, 12); rr2(x - 170 * k, y - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', x - 170, y - 96, x + 170, y + 96); }
}

const CHAPTERS = [['b1', 'What blood is made of', 'coral', 'rbc'], ['f1', 'How a bone turns to stone', 'gold', 'dbone'], ['d1', 'A dinosaur from Brazil', 'teal', 'dinoI'], ['p1', "Proving it's blood", 'indigo', 'heme'], ['k1', 'The skeptics', 'grey', 'magnifier'],
  ['m1', 'The Jurassic Park mosquito', 'gold', 'mosquito'], ['x1', "Where's the DNA?", 'coral', 'dna'], ['n1', 'The DNA clock', 'night', 'scrapbook'], ['r1', 'What blood can still tell us', 'teal', 'tooth'], ['y1', 'The dinosaur in your kitchen', 'cream', 'chicken']];
function SECTIONS() {
  const out = [], add = (t0, draw, tr, at) => out.push({ t0, draw, tr, at });
  add(0, sOpen);
  const ids = Object.keys(LINES), prevEnd = id => LINES[ids[ids.indexOf(id) - 1]].end + 0.15;
  const scene = { b1: [sBlood, 'b2'], f1: [sFossil, 'f2'], d1: [sDino, 'd2'], p1: [sProof, 'p2'], k1: [sSkeptic, 'k2'], m1: [sMosq, 'm2'], x1: [sNucleus, 'x2'], n1: [sClock, 'n2'], r1: [sTell, 'r2'], y1: [sKitchen, 'y2'] };
  CHAPTERS.forEach(([id, title, world, ic], i) => { const t0 = prevEnd(id); add(t0, tt => chapterCard(tt, title, i + 1, world, ic, t0), 'flood', [960, 540]); const [fn, first] = scene[id]; add(Math.min(LINES[id].start + 1.2, LINES[first].start), fn, 'flood', [960, 540]); });
  add(L('o1').start - 0.1, sOutro, 'flood', [960, 540]);
  out.sort((a, b) => a.t0 - b.t0); out.forEach((s, i) => s.t1 = i + 1 < out.length ? out[i + 1].t0 : 1e9); return out;
}
