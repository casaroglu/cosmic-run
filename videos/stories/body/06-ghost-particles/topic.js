// "100 trillion ghost particles just passed through you" — topic file for the shared explainer engine
const L = id => LN(id), S = id => LN(id).start, E = id => LN(id).end;
function buildCues() { const C = CUE; C.title = S('o3') + 0.3; C.end = DUR - TAIL; C.calls = S('o3'); }
const NU = '#7ff3ff', NU2 = '#ff8fd8', SUNC = '#ffcf5a';

// ---------- shared helpers ----------
function kidAt(t, x, y, s, o = {}) { CAM = { x: 960, y: 540, z: 1 }; KID = { x, y }; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); drawKid(t, o); ctx.restore(); reg('hero', 'mascot', x - 70 * s, y - 290 * s, x + 70 * s, y + 12 * s); }
function tile3(t, items, y = 520) {
  items.forEach(([ic, lab, col, t0, o], i) => { const k = spring(t - t0 + 0.1, 0.5, 13); if (k <= 0) return; const x = 380 + i * 580;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rr2(-250, -280, 500, 560, 36, col); ctx.restore(); reg('panel', lab, x - 250, y - 280, x + 250, y + 280);
    ctx.save(); ctx.translate(x, y - 40); ctx.scale(2.3 * k, 2.3 * k); drawIcon(ic, t, o || {}); ctx.restore();
    if (k > 0.6) riseText(lab, x, y + 200, t0 + 0.15, t, { size: 34, weight: 700, color: WHITE, pill: false }); });
}
function arrow(x, y, t, t0, w = 90) { if (t < t0) return; const k = eoq((t - t0) / 0.5), p = Math.sin(t * 4) * 6; ctx.save(); ctx.globalAlpha = k; ctx.translate(x + p, y); rr2(-w / 2, -8, w - 20, 16, 8, 'rgba(255,255,255,0.8)'); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.moveTo(w / 2 - 30, -24); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 2 - 30, 24); ctx.fill(); ctx.restore(); }
function glint(t, w, h, period = 2.4) { const p = (t % period) / period; if (p > 0.45) return; const k = p / 0.45, a = Math.sin(k * Math.PI), x = lerp(-w * 0.55, w * 0.45, k), y = lerp(-h * 0.55, -h * 0.15, k), r = 8 + 10 * a;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); ctx.restore(); }
function nuStreaks(t, n, ang = 0.25, sp = 900, col = NU, area = [0, 0, W, H], seed = 3) {   // neutrinos: bright dots with long fading tails, all flying the same way
  const [x0, y0, w, h] = area, ca = Math.cos(ang), sa = Math.sin(ang);
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const r = rng(i * 13 + seed), off = r(), lane = r(), len = 60 + r() * 120, d = ((t * sp * (0.7 + r() * 0.6) / (w + 400) + off) % 1) * (w + 400) - 200;
    const px = x0 + d * ca - (lane - 0.5) * h * sa + w * 0.5 * (1 - ca), py = y0 + h * lane + d * sa - w * 0.5 * sa * 0;
    const g = ctx.createLinearGradient(px - len * ca, py - len * sa, px, py); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, col);
    ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - len * ca, py - len * sa); ctx.lineTo(px, py); ctx.stroke(); circ(px, py, 4, '#ffffff'); }
  ctx.restore();
}
function sunAt(t, x, y, r, o = {}) {   // our Sun: layered glow, drifting granules, optional cut-away core
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const [m, a] of [[1.25, .18], [1.6, .1], [2.1, .05]]) { const g = ctx.createRadialGradient(x, y, r * 0.9, x, y, r * m); g.addColorStop(0, `rgba(255,190,80,${a})`); g.addColorStop(1, 'rgba(255,190,80,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * m, 0, 6.283); ctx.fill(); } ctx.restore();
  const g = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.1, x, y, r); g.addColorStop(0, '#fff3c0'); g.addColorStop(0.6, '#ffc44a'); g.addColorStop(1, '#ff8f3a'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); for (let i = 0; i < 26; i++) { const a = i * 2.4 + t * 0.05, d = (i * 37 % 100) / 100 * r * 0.9; circ(x + Math.cos(a) * d, y + Math.sin(a) * d, r * 0.06 * (1 + 0.2 * Math.sin(t * 2 + i)), 'rgba(255,240,180,0.3)'); }
  if (o.cut) { ctx.fillStyle = '#ff7a2a'; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, -0.6, 0.6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ff5a1a'; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.6, -0.6, 0.6); ctx.closePath(); ctx.fill(); const p = 0.6 + 0.4 * Math.sin(t * 5); ctx.save(); ctx.shadowColor = '#fff'; ctx.shadowBlur = 40 * p; circ(x, y, r * 0.22, '#fff6d0'); ctx.restore(); }
  ctx.restore();
}
function earthAt(t, x, y, r) { const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, '#6fc0ff'); g.addColorStop(1, '#2a6fc0'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); for (const [a, b, s] of [[-0.3, -0.2, 0.35], [0.35, 0.1, 0.28], [-0.1, 0.45, 0.22], [0.5, -0.45, 0.18]]) { ctx.fillStyle = '#5fbf6a'; ctx.beginPath(); ctx.ellipse(x + (a + Math.sin(t * 0.05) * 0.1) * r, y + b * r, s * r, s * r * 0.6, a, 0, 6.283); ctx.fill(); } ctx.restore();
  ctx.fillStyle = 'rgba(0,0,30,0.35)'; ctx.beginPath(); ctx.arc(x, y, r, Math.PI * 0.5, Math.PI * 1.5); ctx.fill(); }
function cherenkov(t, x, y, r, t0) { if (t < t0) return; const k = clamp((t - t0) / 1.2), a = 1 - clamp((t - t0 - 1.2) / 0.8); if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#6fd0ff'; ctx.lineWidth = 16; ctx.shadowColor = '#6fd0ff'; ctx.shadowBlur = 30; ctx.beginPath(); ctx.ellipse(x, y, r * k, r * k * 0.5, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }

// ---------- icons ----------
Object.assign(ICONS, {
  atom(t) { circ(0, 0, 18, '#ff8f4a'); circ(-6, -6, 6, '#ffd98a'); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * 1.05); ctx.strokeStyle = 'rgba(143,216,230,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 70, 24, 0, 0, 6.283); ctx.stroke(); const a = t * 3 + i * 2; circ(Math.cos(a) * 70, Math.sin(a) * 24, 9, NU); ctx.restore(); } },
  letter(t) { rr2(-60, -44, 120, 88, 8, '#f3ead8'); ctx.fillStyle = '#d9c7a0'; ctx.beginPath(); ctx.moveTo(-60, -44); ctx.lineTo(0, 6); ctx.lineTo(60, -44); ctx.fill(); for (let i = 0; i < 3; i++) rr2(-40, 14 + i * 9, 80 - i * 20, 4, 2, '#9b8a6a'); font(18, 700); ctx.fillStyle = '#9b3352'; ctx.textAlign = 'center'; ctx.fillText('1930', 30, 34); },
  reactor(t) { ctx.fillStyle = '#c9d6ec'; ctx.beginPath(); ctx.moveTo(-60, 60); ctx.quadraticCurveTo(-36, 0, -48, -60); ctx.lineTo(48, -60); ctx.quadraticCurveTo(36, 0, 60, 60); ctx.fill(); rr2(-60, 40, 120, 20, 6, '#9aa6c4'); for (let i = 0; i < 4; i++) { const p = (t * 0.4 + i / 4) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.8; circ(-20 + i * 14 + Math.sin(p * 5) * 10, -70 - p * 90, 20 + p * 24, 'rgba(255,255,255,0.8)'); ctx.restore(); } },
  telegram(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.6) * 0.06); rr2(-70, -46, 140, 92, 6, '#ffe9a8'); rr2(-70, -46, 140, 20, 6, '#c8553d'); font(14, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('TELEGRAM', 0, -31); for (let i = 0; i < 4; i++) rr2(-54, -12 + i * 14, 108 - (i % 2) * 30, 6, 3, '#9b8a6a'); ctx.restore(); },
  medal(t) { ctx.fillStyle = '#3a6fd6'; ctx.beginPath(); ctx.moveTo(-30, -80); ctx.lineTo(-6, -20); ctx.lineTo(6, -20); ctx.lineTo(30, -80); ctx.lineTo(14, -80); ctx.lineTo(0, -40); ctx.lineTo(-14, -80); ctx.fill(); circ(0, 20, 56, '#e0a92a'); circ(0, 20, 46, '#ffd36b'); for (let i = 0; i < 10; i++) { ctx.save(); ctx.translate(0, 20); ctx.rotate(-1.3 + i * 0.29); rr2(-4, -40, 8, 14, 4, '#e0a92a'); ctx.restore(); } circ(0, 20, 18, '#e0a92a'); },
  banana(t) { ctx.save(); ctx.rotate(-0.4 + Math.sin(t * 1.5) * 0.08); ctx.fillStyle = '#ffd94a'; ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(0, 60, 70, -20); ctx.quadraticCurveTo(10, 30, -70, -10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(0, 40, 70, -20); ctx.quadraticCurveTo(0, 70, -64, 0); ctx.fill(); rr2(-80, -18, 14, 12, 4, '#7a5a2a'); rr2(66, -26, 12, 10, 4, '#3a2a1a'); ctx.restore(); },
  elemK(t) { rr2(-58, -58, 116, 116, 18, '#9b3352'); rr2(-58, -58, 116, 28, 14, 'rgba(255,255,255,0.18)'); font(62, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('K', 0, 4); font(15, 600); ctx.fillText('POTASSIUM-40', 0, 44); font(16, 700); ctx.fillText('19', -38, -40); },
  pie(t, o) { const v = o.v || 0.25, k = clamp((t % 6) / 1.2); circ(0, 0, 62, '#2d2b7c'); ctx.fillStyle = o.col || NU; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 62, -Math.PI / 2, -Math.PI / 2 + v * 6.283 * eoq(k)); ctx.fill(); },
  dice(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.3); rr2(-50, -50, 100, 100, 20, '#f3f7fb'); for (const [x, y] of [[-24, -24], [24, -24], [0, 0], [-24, 24], [24, 24]]) circ(x, y, 9, '#e2457a'); ctx.restore(); },
  flavors(t) { ['#ff8fd8', '#7ff3ff', '#ffd98a'].forEach((c, i) => { const a = t * 1.5 + i * 2.094; circ(Math.cos(a) * 46, Math.sin(a) * 30, 26, c); }); const k = (t * 0.5) % 3 | 0; circ(0, 0, 14, ['#ff8fd8', '#7ff3ff', '#ffd98a'][k]); },
  tankI(t) { rr2(-70, -60, 140, 120, 30, '#5b6585'); rr2(-60, -50, 120, 100, 24, '#3a3f5a'); const lv = 0.85; rr2(-60, -50 + 100 * (1 - lv), 120, 100 * lv, 20, 'rgba(143,216,230,0.6)'); bubbles(t, 0, 10, 100, 70, 4); },
  globe(t) { circ(0, 0, 62, '#2a6fc0'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 62, 0, 6.283); ctx.clip(); for (const [a, b, s] of [[-20 + t * 6 % 140, -10, 26], [30 + t * 6 % 140, 20, 20], [-60 + t * 6 % 140, 30, 16]]) { ctx.fillStyle = '#5fbf6a'; ctx.beginPath(); ctx.ellipse(((a + 70) % 140) - 70, b, s, s * 0.7, 0, 0, 6.283); ctx.fill(); } ctx.restore();
    const P = [[-30, -30], [36, -20], [10, 34], [-40, 26]]; ctx.strokeStyle = 'rgba(255,217,138,0.8)'; ctx.lineWidth = 4; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke(); P.forEach(([x, y], i) => circ(x, y, 7 + 3 * Math.max(0, Math.sin(t * 4 - i)), '#ffd98a')); },
  scopeI(t) { rr2(-14, 10, 28, 60, 8, '#5b6585'); ctx.save(); ctx.rotate(-0.6 + Math.sin(t * 0.8) * 0.15); rr2(-20, -70, 40, 90, 14, '#9aa6c4'); rr2(-24, -80, 48, 18, 8, '#3a3f5a'); ctx.restore(); rr2(-40, 66, 80, 12, 6, '#3a3f5a'); },
  bed(t) { rr2(-90, -20, 180, 40, 14, '#f3f7fb'); rr2(-90, -48, 24, 90, 10, '#4b6fd6'); rr2(-62, -34, 50, 24, 10, '#f7f1ff'); rr2(-10, -24, 98, 30, 12, '#8fd8e6'); rr2(-84, 20, 12, 24, 4, '#4b6fd6'); rr2(72, 20, 12, 24, 4, '#4b6fd6'); },
});
Object.assign(IDLE, { atom: {}, letter: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) }, reactor: {}, telegram: {}, medal: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.08), post: t => glint(t, 56, 60) }, banana: {}, elemK: { post: t => glint(t, 58, 58, 3.1) }, pie: {}, dice: {}, flavors: {}, tankI: {}, globe: {}, scopeI: {}, bed: { post: t => { font(22, 700); ctx.fillStyle = GOLD; ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 2.5); ctx.fillText('z', 60, -50 - (t * 12 % 14)); } } });

// ---------- scenes ----------
function sOpen(t) {
  worldBG(t, 'night');
  if (t < S('c4q') - 0.1) { kidAt(t, 960, 940, 1.9, { look: [-0.6, -0.2] }); const on = clamp((t - W_('c2', 'trillions') + 0.3) / 0.5); if (on > 0) { ctx.save(); ctx.globalAlpha = on; nuStreaks(t, 46, 0.18, 900, NU); ctx.restore(); }
    if (t > W_('c2', 'sun') - 0.4) sunAt(t, 120, 160, 110 * spring(t - W_('c2', 'sun') + 0.4, 0.5, 10)); reg('hero', 'sun', 0, 40, 260, 290);
    label('TRILLIONS PER SECOND', 1450, 300, t, W_('c2', 'trillions'), S('c3') - 0.3, GOLD, 36); label('YOU FEEL NOTHING', 1450, 400, t, W_('c2', 'feel'), S('c3') - 0.3, WHITE, 30);
    tag('NEUTRINOS', 1450, 300, t, W_('c3', 'neutrinos') - 0.1, S('c4q') - 0.3, '#2d8a9a', 48); label('"GHOST PARTICLES"', 1450, 420, t, W_('c3', 'ghost'), S('c4q') - 0.3, WHITE, 34); if (t > W_('c3', 'nobel') - 0.3) placeIcon('medal', [[1450, 640]], 1.8, t, W_('c3', 'nobel') - 0.3, S('c4q') - 0.2, { hw: 60, hh: 90 }); return; }
  if (t < S('c5') - 0.1) { kidAt(t, 960, 940, 1.9, { look: [0, -0.6], armsUp: 1 }); nuStreaks(t, 46, 0.18, 900, NU); label('HOW MANY?', 960, 140, t, S('c4q') + 0.2, S('c5') - 0.3, GOLD, 44); return; }
  rr2(560, 260, 520, 520, 40, 'rgba(242,179,143,0.9)'); reg('hero', 'skin', 560, 260, 1080, 780); ctx.save(); ctx.globalAlpha = 0.9; nuStreaks(t, 70, 0.0, 1300, NU, [560, 260, 520, 520], 9); ctx.restore();
  label('1 CM² · A FINGERNAIL', 820, 860, t, W_('c5', 'square'), S('g1') - 0.4, WHITE, 32); tag('~65 BILLION / SECOND', 1500, 400, t, W_('c5', 'sixty'), S('g1') - 0.4, '#2d8a9a', 40); tag('WHOLE BODY: ~100 TRILLION', 1500, 600, t, W_('c5', 'hundred'), S('g1') - 0.4, '#9b3352', 36);
  sunAt(t, 1700, 900, 70); reg('hero', 'sun', 1600, 800, 1800, 1000);
}
function sGhost(t) {
  worldBG(t, 'indigo');
  if (t < S('g3') - 0.1) { nuStreaks(t, 30, 0.2, 700, NU, [0, 0, W, H], 5); if (t < S('g2b') - 0.1) { placeIcon('atom', [[560, 470]], 2.6, t, S('g1') + 1.0, S('g2b') - 0.2, { hw: 76, hh: 76 });
      tag('NO ELECTRIC CHARGE', 1380, 360, t, W_('g2', 'charge') - 0.2, S('g2b') - 0.3, '#2d8a9a', 40); label('>1,000,000× LIGHTER THAN AN ELECTRON', 1300, 520, t, W_('g2', 'million'), S('g2b') - 0.3, GOLD, 30); return; }
    rr2(760, 360, 360, 360, 30, 'rgba(255,255,255,0.12)'); reg('hero', 'cube', 760, 360, 1120, 720); for (let i = 0; i < 40; i++) { const r = rng(i * 5 + 1); circ(780 + r() * 320 + Math.sin(t + i) * 6, 380 + r() * 320 + Math.cos(t * 1.3 + i) * 6, 6, i % 3 ? NU : NU2); }
    label('BIG BANG LEFTOVERS', 940, 200, t, W_('g2b', 'big'), S('g3') - 0.3, GOLD, 34); tag('~336 IN A SUGAR-CUBE OF SPACE', 940, 860, t, W_('g2b', 'sugar'), S('g3') - 0.3, '#2d8a9a', 36); label('ONLY LIGHT IS MORE COMMON', 940, 970, t, W_('g2b', 'light'), S('g3') - 0.3, WHITE, 28); return; }
  if (t < S('g5') - 0.1) { const z = 1 + clamp((t - S('g3')) / 4) * 0.12; ctx.save(); ctx.translate(760, 520); ctx.scale(z, z); for (let r = -2; r <= 2; r++) for (let c = -3; c <= 3; c++) { ctx.save(); ctx.translate(c * 120, r * 120); ctx.scale(0.55, 0.55); drawIcon('atom', t + r + c); ctx.restore(); } ctx.restore(); reg('hero', 'atoms', 760 - 420 * z, 520 - 290 * z, 760 + 420 * z, 520 + 290 * z);
    nuStreaks(t, 12, 0.05, 600, NU2, [360, 160, 880, 720], 2); label('ONLY THE WEAK FORCE', 1580, 380, t, W_('g3', 'weak'), S('g5') - 0.3, GOLD, 32); label('SLIPS BETWEEN ATOMS', 1580, 480, t, W_('g3', 'slips'), S('g5') - 0.3, WHITE, 30); return; }
  if (t < S('g6') - 0.1) { rr2(160, 380, 1600, 260, 30, '#6b7085'); for (let i = 0; i < 16; i++) rr2(160 + i * 100, 380, 4, 260, 2, 'rgba(255,255,255,0.12)'); reg('hero', 'lead', 160, 380, 1760, 640); nuStreaks(t, 6, 0, 1100, NU, [0, 440, W, 140], 4);
    tag('A WALL OF LEAD 1 LIGHT-YEAR THICK', 960, 240, t, W_('g5', 'lead') - 0.2, S('g6') - 0.3, '#5b4fd6', 38); label('A GOOD CHANCE TO GET THROUGH', 960, 780, t, W_('g5', 'chance'), S('g6') - 0.3, GOLD, 32); return; }
  if (t < S('g6b') - 0.1) { earthAt(t, 960, 540, 330); reg('hero', 'earth', 630, 210, 1290, 870); sunAt(t, 1780, 540, 90); reg('hero', 'sun', 1660, 420, 1900, 660); nuStreaks(t, 26, Math.PI, 900, NU, [0, 300, 1700, 480], 6);
    placeIcon('bed', [[300, 300]], 1.8, t, W_('g6', 'mattress') - 0.3, S('g6b') - 0.2, { hw: 92, hh: 50 }); label('AT NIGHT: UP THROUGH THE PLANET', 960, 960, t, W_('g6', 'night'), S('g6b') - 0.3, GOLD, 32); return; }
  rr2(0, 640, W, 440, 0, '#3a3f5a'); for (let i = 0; i < 5; i++) rr2(0, 680 + i * 80, W, 4, 2, 'rgba(255,255,255,0.08)'); reg('panel', 'rock', 0, 640, W, 1080);
  sunAt(t, 960, 380, 220); reg('hero', 'sun', 700, 120, 1220, 640); label('THE SUN, SEEN IN NEUTRINOS', 960, 760, t, W_('g6b', 'picture'), S('h1') - 0.4, GOLD, 34); label('THROUGH SOLID ROCK', 960, 860, t, W_('g6b', 'rock'), S('h1') - 0.4, WHITE, 30);
}
function sHistory(t) {
  worldBG(t, 'grey');
  if (t < S('h4q') - 0.1) { placeIcon('letter', [[520, 470]], 2.8, t, S('h1') + 1.0, S('h4q') - 0.2, { hw: 64, hh: 50 }); label('1930 · WOLFGANG PAULI', 520, 720, t, W_('h2', ['1930', 'nineteen']), S('h4q') - 0.3, WHITE, 30);
    if (t > W_('h2', 'vanish') - 0.3) { const k = clamp((t - W_('h2', 'vanish') + 0.3) / 1.5); circ(1250, 400, 80, '#ff8f4a'); circ(1225, 375, 22, 'rgba(255,255,255,0.4)'); arrow(1420, 400, t, W_('h2', 'vanish'), 110); ctx.save(); ctx.globalAlpha = 1 - k * 0.8; circ(1600, 400, 56, '#ffd98a'); ctx.restore(); reg('hero', 'decay', 1160, 310, 1670, 490); }
    label('ENERGY GOES MISSING?', 1430, 560, t, W_('h2', 'vanish'), S('h3') - 0.3, GOLD, 30); tag('"A DESPERATE REMEDY"', 1430, 700, t, W_('h3', 'desperate'), S('h4q') - 0.3, '#5b4fd6', 38); label('"IT CAN NEVER BE DETECTED"', 1430, 820, t, W_('h3', 'detected') - 0.3, S('h4q') - 0.3, WHITE, 28); return; }
  if (t < S('h6') - 0.1) { placeIcon('reactor', [[520, 520]], 2.6, t, S('h4q') + 0.2, S('h6') - 0.2, { hw: 64, hh: 110 }); placeIcon('tankI', [[1100, 560]], 2.0, t, W_('h5', 'tanks') - 0.3, S('h6') - 0.2, { hw: 72, hh: 62 }); nuStreaks(t, 10, 0, 800, NU, [640, 480, 600, 140], 8);
    label('1956 · SOUTH CAROLINA', 960, 140, t, W_('h5', ['1956', 'nineteen']), S('h6') - 0.3, WHITE, 32); label('COWAN & REINES', 960, 230, t, W_('h5', 'clyde'), S('h6') - 0.3, GOLD, 30); tag('A FEW WERE CAUGHT', 1560, 560, t, W_('h5', 'few', 1), S('h6') - 0.3, '#2d8a9a', 36); return; }
  placeIcon('telegram', [[620, 480]], 2.8, t, S('h6'), S('s1') - 0.3, { hw: 72, hh: 50 }); label('"EVERYTHING COMES TO HIM', 1340, 420, t, W_('h6', 'everything'), S('s1') - 0.4, GOLD, 32); label('WHO KNOWS HOW TO WAIT"', 1340, 510, t, W_('h6', 'wait'), S('s1') - 0.4, GOLD, 32);
  placeIcon('medal', [[1340, 760]], 1.4, t, W_('h6', 'nobel') - 0.3, S('s1') - 0.3, { hw: 60, hh: 90 }); label('NOBEL · 1995', 1560, 760, t, W_('h6', ['1995', 'nineteen']), S('s1') - 0.4, WHITE, 28, { align: 'left' });
}
function sSun(t) {
  worldBG(t, 'night');
  if (t < S('s3') - 0.1) { sunAt(t, 760, 540, 330, { cut: 1 }); reg('hero', 'sun', 430, 210, 1090, 870); if (t > W_('s2', 'neutrinos')) nuStreaks(t, 20, 0, 900, NU, [760, 440, 1160, 200], 3);
    label('A GIANT FUSION REACTOR', 1480, 280, t, W_('s2', 'fusion'), S('s3') - 0.3, GOLD, 32); label('HYDROGEN → HELIUM', 1480, 380, t, W_('s2', 'hydrogen'), S('s3') - 0.3, WHITE, 30);
    tag('4 MILLION TONNES OF MASS → ENERGY, EVERY SECOND', 960, 980, t, W_('s2b', 'four'), S('s3') - 0.3, '#9b3352', 30); return; }
  sunAt(t, 760, 540, 330, { cut: 1 }); reg('hero', 'sun', 430, 210, 1090, 870);
  if (t < S('s5q') - 0.1) { const tz = W_('s3', 'bumps') - 0.2; if (t > tz) { const r = rng(5); let x = 760, y = 540; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); const n = Math.min(120, (t - tz) * 30) | 0; for (let i = 0; i < n; i++) { x += (r() - 0.5) * 70; y += (r() - 0.5) * 70; const dx = x - 760, dy = y - 540, d = Math.hypot(dx, dy); if (d > 290) { x = 760 + dx / d * 290; y = 540 + dy / d * 290; } ctx.lineTo(x, y); } ctx.stroke(); }
    label('LIGHT: THOUSANDS TO 100,000s OF YEARS TO ESCAPE', 960, 120, t, W_('s3', 'thousands'), S('s4') - 0.3, WHITE, 28);
    if (t > S('s4') - 0.1) { nuStreaks(t, 16, 0, 1200, NU, [760, 470, 1160, 140], 4); tag('NEUTRINOS: ~2 SECONDS OUT', 1480, 380, t, W_('s4', 'two'), S('s5q') - 0.3, '#2d8a9a', 36); label('+ 8 MINUTES TO YOU', 1480, 500, t, W_('s4', 'eight'), S('s5q') - 0.3, GOLD, 32); } return; }
  nuStreaks(t, 16, 0, 1200, NU, [760, 470, 1160, 140], 4); kidAt(t, 1580, 960, 1.3, { look: [-1, -0.3] }); label('NEWS FROM THE CORE', 1480, 160, t, S('s5q') + 0.2, S('m1') - 0.4, GOLD, 34);
  label('FUSION CONFIRMED', 1400, 260, t, W_('s6', 'fusion'), S('m1') - 0.4, WHITE, 30);
}
function sMissing(t) {
  worldBG(t, 'grey');
  if (t < S('m4q') - 0.1) { rr2(560, 0, 260, 1080, 0, '#2b2420'); rr2(560, 0, 14, 1080, 0, '#4a3a30'); rr2(806, 0, 14, 1080, 0, '#4a3a30'); ctx.save(); ctx.translate(690, 760); ctx.scale(1.6, 1.6); drawIcon('tankI', t); ctx.restore(); reg('hero', 'mine', 560, 0, 820, 1080);
    label('1960s · RAY DAVIS', 1340, 180, t, W_('m2', ['1960', 'nineteen']), S('m4q') - 0.3, WHITE, 32); label('~100,000 GALLONS OF DRY-CLEANING FLUID', 1340, 280, t, W_('m2', 'gallons'), S('m4q') - 0.3, GOLD, 26); label('A GOLD MINE IN SOUTH DAKOTA', 1340, 370, t, W_('m2', 'mine'), S('m4q') - 0.3, WHITE, 26);
    if (t > S('m3')) { placeIcon('pie', [[1340, 640]], 1.8, t, W_('m3', 'third') - 0.4, S('m4q') - 0.2, { v: 0.333, col: NU, hw: 62, hh: 62 }); tag('ONLY ~1/3 OF THE PREDICTION', 1340, 860, t, W_('m3', 'third'), S('m4q') - 0.3, '#9b3352', 36); label('COUNTED ATOM BY ATOM', 1340, 985, t, W_('m3', 'counted'), S('m4q') - 0.3, WHITE, 26); } return; }
  placeIcon('flavors', [[620, 480]], 2.8, t, S('m4q') + 0.2, S('b1') - 0.3, { hw: 76, hh: 60 }); tag('3 TYPES · THEY SHAPE-SHIFT', 1340, 380, t, W_('m5', 'three'), S('b1') - 0.4, '#2d8a9a', 38);
  label('JAPAN + CANADA PROVED IT', 1340, 520, t, W_('m5', 'japan'), S('b1') - 0.4, WHITE, 30); placeIcon('medal', [[1340, 760]], 1.4, t, W_('m5', 'nobel') - 0.3, S('b1') - 0.3, { hw: 60, hh: 90 }); label('NOBEL · 2015', 1560, 760, t, W_('m5', ['2015', 'twenty']), S('b1') - 0.4, GOLD, 28, { align: 'left' });
}
function sBody(t) {
  worldBG(t, 'coral');
  if (t < S('b4q') - 0.1) { placeIcon('banana', [[1500, 360]], 2.2, t, W_('b2', 'bananas') - 0.3, S('b4q') - 0.2, { hw: 80, hh: 50 }); placeIcon('elemK', [[1500, 720]], 1.8, t, W_('b2', 'potassium') - 0.3, S('b4q') - 0.2, { hw: 60, hh: 60 });
    kidAt(t, 680, 940, 1.9, { look: [0.4, -0.2] }); if (t > W_('b3', 'decay') - 0.2) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 18; i++) { const a = i * 0.35 + 3.4, p = ((t * 0.9 + i * 0.37) % 1); const x = 680 + Math.cos(a) * (60 + p * 380), y = 680 + Math.sin(a) * (60 + p * 380); circ(x, y, 6 * (1 - p) + 2, NU2); } ctx.restore(); }
    label('A FEW THOUSAND DECAYS / SECOND', 680, 120, t, W_('b3', 'thousand'), S('b4q') - 0.3, WHITE, 30); tag('~300+ MILLION NEUTRINOS A DAY', 680, 210, t, W_('b3', 'hundred'), S('b4q') - 0.3, '#9b3352', 36); label('ROUGH ESTIMATE', 1100, 300, t, W_('b3', 'rough'), S('b4q') - 0.3, WHITE, 24); return; }
  kidAt(t, 960, 940, 1.9, { look: [0, -0.3] }); placeIcon('shield', [[1500, 470]], 2.4, t, W_('b5', 'natural') - 0.3, S('x1') - 0.3, { hw: 50, hh: 54 }); label('NATURAL · ALWAYS THERE', 1500, 760, t, W_('b5', 'natural'), S('x1') - 0.4, WHITE, 30); tag('HARMLESS', 960, 140, t, S('b5'), S('x1') - 0.4, '#3f8f6a', 44);
}
function sHit(t) {
  worldBG(t, 'indigo');
  if (t < S('x4q') - 0.1) { kidAt(t, 560, 950, 1.8, { look: [1, -0.2] }); nuStreaks(t, 40, 0.15, 1000, NU, [0, 0, W, H], 11);
    placeIcon('pie', [[1340, 360]], 2.2, t, W_('x2', 'one', 1) - 0.4, S('x3') - 0.2, { v: 0.25, col: NU2, hw: 62, hh: 62 }); tag('ONE HIT IN A LIFETIME: ~1 IN 10 TO 1 IN 4', 1260, 620, t, W_('x2', 'between'), S('x3') - 0.5, '#5b4fd6', 30);
    if (t > S('x3') - 0.1) { tag('TRILLIONS / SECOND × 80 YEARS', 1260, 780, t, S('x3') + 0.3, S('x4q') - 0.3, '#2d8a9a', 34); label('→ MAYBE ONE COLLISION', 1260, 900, t, W_('x3', 'maybe'), S('x4q') - 0.3, GOLD, 34); } return; }
  placeIcon('atom', [[960, 470]], 3.0, t, S('x4q') + 0.2, S('d1') - 0.3, { hw: 76, hh: 76 }); label('ONE ATOM NUDGED', 960, 780, t, W_('x5', 'nudge'), S('d1') - 0.4, GOLD, 36); label('YOU WOULDN\'T NOTICE', 960, 880, t, W_('x5', 'nothing'), S('d1') - 0.4, WHITE, 30);
}
function sCatch(t) {
  worldBG(t, 'night');
  if (t < S('d3') - 0.1) { tile3(t, [['tankI', 'HUGE TARGET', '#2d8a9a', S('d1') + 1.0], ['scopeI', 'WATCH CAREFULLY', '#5b4fd6', W_('d2', 'watch')], ['atom', 'WAIT FOR ONE HIT', '#9b3352', W_('d2', 'almost')]], 540); return; }
  if (t < S('d5q') - 0.1) { ctx.fillStyle = '#3a3f5a'; ctx.beginPath(); ctx.moveTo(0, 260); ctx.lineTo(500, 60); ctx.lineTo(960, 200); ctx.lineTo(1400, 40); ctx.lineTo(W, 220); ctx.lineTo(W, 300); ctx.lineTo(0, 300); ctx.fill(); rr2(0, 290, W, 790, 0, '#2b2f40'); reg('panel', 'mountain', 0, 0, W, 1080);
    rr2(660, 380, 600, 600, 60, '#1a2a44'); for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) circ(720 + c * 60, 440 + r * 60, 14, '#c9a24a'); reg('hero', 'super-kamiokande', 660, 380, 1260, 980);
    cherenkov(t, 960, 680, 230, W_('d4', 'ring') - 0.6); if (t > W_('d4', 'hits') - 0.2 && t < W_('d4', 'ring')) nuStreaks(t, 3, 1.1, 900, NU, [700, 300, 520, 400], 1);
    label('SUPER-KAMIOKANDE · JAPAN', 360, 400, t, W_('d3', 'super'), S('d5q') - 0.3, GOLD, 26); label('1 KM UNDERGROUND', 360, 490, t, W_('d3', 'kilometre'), S('d5q') - 0.3, WHITE, 26); label('50,000 TONNES OF WATER', 1560, 400, t, W_('d3', 'fifty'), S('d5q') - 0.3, WHITE, 26); label('~11,000 LIGHT SENSORS', 1560, 490, t, W_('d3', 'eleven'), S('d5q') - 0.3, GOLD, 26);
    label('A FAINT RING OF BLUE LIGHT', 1560, 760, t, W_('d4', 'ring'), S('d4b') - 0.3, '#9fd3ff', 26);
    if (t > S('d4b') - 0.1) { placeIcon('medal', [[360, 760]], 1.4, t, W_('d4b', 'nobel') - 0.3, S('d5q') - 0.2, { hw: 60, hh: 90 }); label('TAKAAKI KAJITA · NOBEL 2015', 1560, 870, t, W_('d4b', ['takaki', 'takaaki', 'kajita']), S('d5q') - 0.3, GOLD, 26); } return; }
  const cx = 960, cy = 2300, R = 1700; ctx.fillStyle = '#5a4a3a'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fill(); ctx.fillStyle = '#5fbf6a'; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 1.2, Math.PI * 1.8); ctx.arc(cx, cy, R - 24, Math.PI * 1.8, Math.PI * 1.2, true); ctx.fill(); reg('hero', 'earth crust', 600, 600, 1320, 1080); reg('hero', 'earth crust ', 0, 730, W, 1080);
  const A = [cx + Math.cos(Math.PI * 1.38) * R, cy + Math.sin(Math.PI * 1.38) * R], B = [cx + Math.cos(Math.PI * 1.62) * R, cy + Math.sin(Math.PI * 1.62) * R];
  for (const [x, y, nm] of [[...A, 'NEAR CHICAGO'], [...B, 'SOUTH DAKOTA']]) { circ(x, y, 16, '#ffd98a'); label(nm, x, y - 70, t, W_('d6', nm === 'NEAR CHICAGO' ? 'chicago' : 'dakota') - 0.2, S('o1'), WHITE, 26); }
  if (t > W_('d6', 'beam') - 0.2) { const k = clamp((t - W_('d6', 'beam') + 0.2) / 1.5); ctx.save(); ctx.strokeStyle = NU; ctx.lineWidth = 8; ctx.shadowColor = NU; ctx.shadowBlur = 20; ctx.setLineDash([30, 20]); ctx.lineDashOffset = -t * 200; ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(lerp(A[0], B[0], k), lerp(A[1], B[1], k)); ctx.stroke(); ctx.restore(); }
  tag('DUNE · ~1,300 KM', 960, 200, t, W_('d6', 'dune'), S('e1') - 0.4, '#2d8a9a', 44); label('NO TUNNEL: STRAIGHT THROUGH THE EARTH', 960, 320, t, W_('d6', 'tunnel'), S('e1') - 0.4, GOLD, 30); label('THE SAME MINE AS RAY DAVIS', 960, 420, t, W_('d7', 'same'), S('e1') - 0.4, WHITE, 30);
}
function sIce(t) {
  if (t < S('i3') - 0.1) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#9fd3ff'); g.addColorStop(0.28, '#dff1ff'); g.addColorStop(0.3, '#cfe8f8'); g.addColorStop(1, '#3a7fb8'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    rr2(860, 220, 200, 90, 10, '#3a3f5a'); rr2(880, 200, 60, 30, 6, '#5b6585'); reg('hero', 'icecube lab', 850, 190, 1070, 320); label('ICECUBE · SOUTH POLE', 960, 90, t, W_('i2', 'icecube'), S('i3') - 0.3, '#102348', 34, { color: WHITE });
    const k = clamp((t - W_('i2', 'drilled') + 0.3) / 2.5); for (let s = 0; s < 9; s++) { const x = 360 + s * 150; rr2(x - 2, 330, 4, 650 * k, 2, 'rgba(20,40,80,0.4)'); for (let i = 0; i < 12 * k; i++) circ(x, 380 + i * 50, 9, i % 2 ? '#ffd98a' : '#ffcf5a'); } reg('hero', 'sensors', 340, 330, 1580, 990);
    if (t > W_('i2', 'cubic')) { ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 4; ctx.strokeRect(330, 340, 1260, 650); ctx.restore(); }
    label('HOLES UP TO 2.5 KM DEEP', 1500, 140, t, W_('i2', 'deep'), S('i3') - 0.3, '#102348', 28, { color: WHITE }); label('5,000+ SENSORS', 420, 140, t, W_('i2', 'five'), S('i3') - 0.3, '#102348', 28, { color: GOLD }); label('1 CUBIC KM OF ICE', 960, 1030, t, W_('i2', 'cubic'), S('i3') - 0.3, '#102348', 30, { color: WHITE });
    if (t > S('i2b') - 0.1) cherenkov(t, 960, 700, 160, W_('i2b', 'flash') - 0.5); return; }
  worldBG(t, 'night');
  if (t < S('i4q') - 0.1) { placeIcon('medal', [[560, 500]], 3.0, t, S('i3'), S('i4q') - 0.2, { hw: 60, hh: 90 }); tag('NOBEL PRIZE IN PHYSICS 2026', 1340, 320, t, W_('i3', 'nobel'), S('i4q') - 0.3, '#c8553d', 38);
    label('FRANCIS HALZEN', 1340, 450, t, W_('i3', 'francis') - 0.1, S('i4q') - 0.3, GOLD, 40); label('HIGH-ENERGY NEUTRINOS FROM DEEP SPACE', 1340, 560, t, W_('i3', 'discovering'), S('i4q') - 0.3, WHITE, 26); label('STOCKHOLM · DECEMBER 10', 1340, 680, t, W_('i3', 'stockholm'), S('i4q') - 0.3, '#9fd3ff', 30); return; }
  if (t < S('i5') + 0.1 || t < W_('i5', 'twenty', 1) - 0.4) { const bx = 600, by = 520; ctx.save(); ctx.translate(bx, by); ctx.rotate(-0.4); for (let i = 0; i < 3; i++) { ctx.fillStyle = ['rgba(255,143,74,0.6)', 'rgba(255,217,138,0.7)', 'rgba(255,255,255,0.8)'][i]; ctx.beginPath(); ctx.ellipse(0, 0, 220 - i * 50, 50 - i * 12, 0, 0, 6.283); ctx.fill(); } circ(0, 0, 40, '#05060c');
      for (const sd of [-1, 1]) { const g = ctx.createLinearGradient(0, 0, 0, sd * -420); g.addColorStop(0, 'rgba(180,140,255,0.9)'); g.addColorStop(1, 'rgba(180,140,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(16, 0); ctx.lineTo(40, sd * -420); ctx.lineTo(-40, sd * -420); ctx.fill(); } ctx.restore(); reg('hero', 'blazar', 320, 120, 880, 920);
    if (t > W_('i5', 'traced') - 0.2) nuStreaks(t, 6, 0.15, 900, NU, [700, 380, 1220, 300], 13); kidAt(t, 1700, 960, 1.1, { look: [-1, -0.3] });
    label('2017 · A BLAZAR', 1300, 160, t, W_('i5', 'blazar'), W_('i5', 'twenty', 1) - 0.5, GOLD, 36); label('~4 BILLION LIGHT-YEARS AWAY', 1300, 260, t, W_('i5', 'four'), W_('i5', 'twenty', 1) - 0.5, WHITE, 28); return; }
  for (let i = 0; i < 260; i++) { const r = rng(i * 3 + 2), x = r() * W, y = 540 + (r() - 0.5) * 220 * Math.exp(-(((x - 960) / 700) ** 2)) + Math.sin(x * 0.004) * 30; circ(x, y, 2 + r() * 5, `rgba(127,243,255,${0.3 + 0.5 * r() * (0.6 + 0.4 * Math.sin(t * 2 + i))})`); } reg('hero', 'milky way', 0, 380, W, 700);
  tag('2023 · OUR GALAXY IN NEUTRINOS', 960, 200, t, W_('i5', 'twenty', 1) - 0.3, S('e1') - 0.4, '#2d8a9a', 40);
}
function sSupernova(t) {
  worldBG(t, 'night');
  if (t < S('e3') - 0.1) { const tb = W_('e2', 'explodes') - 0.2, k = clamp((t - tb) / 1.2); const r = lerp(140, 60, k); circ(620, 520, r, '#ff9a5a'); if (t > tb) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(255,200,120,${0.5 * (1 - ((t - tb) * 0.5 + i / 3) % 1)})`; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(620, 520, 80 + (((t - tb) * 0.5 + i / 3) % 1) * 320, 0, 6.283); ctx.stroke(); } ctx.restore(); } reg('hero', 'supernova', 220, 120, 1020, 920);
    if (t > W_('e2', 'neutrinos') - 0.2) nuStreaks(t, 30, 0, 1300, NU, [620, 320, 1300, 400], 17); label('A GIANT STAR COLLAPSES', 1500, 260, t, W_('e2', 'collapses'), S('e3') - 0.3, WHITE, 30); tag('ENERGY POURS OUT AS NEUTRINOS', 1470, 820, t, W_('e2', 'pours'), S('e3') - 0.3, '#2d8a9a', 30); label('THEY ESCAPE BEFORE THE LIGHT', 1470, 940, t, W_('e2', 'escape'), S('e3') - 0.3, GOLD, 28); return; }
  if (t < S('e4') - 0.1) { tile3(t, [['tankI', 'KAMIOKANDE-II', '#2d8a9a', W_('e3', 'three')], ['tankI', 'IMB · USA', '#5b4fd6', W_('e3', 'three') + 0.3], ['tankI', 'BAKSAN · USSR', '#9b3352', W_('e3', 'three') + 0.6]], 520);
    label('1987 · 25 NEUTRINOS IN ~13 SECONDS', 960, 120, t, W_('e3', ['twenty', '25']), S('e4') - 0.3, GOLD, 34); tag('HOURS BEFORE THE LIGHT', 960, 960, t, W_('e3', 'hours'), S('e4') - 0.3, '#9b3352', 40); return; }
  if (t < S('e5q') - 0.1) { placeIcon('globe', [[620, 500]], 3.0, t, S('e4'), S('e5q') - 0.2, { hw: 66, hh: 66 }); placeIcon('scopeI', [[1380, 500]], 2.6, t, W_('e4', 'telescopes') - 0.4, S('e5q') - 0.2, { hw: 50, hh: 84 });
    tag('SUPERNOVA EARLY WARNING', 960, 140, t, W_('e4', 'alert') - 0.2, S('e5q') - 0.3, '#2d8a9a', 40); label('DETECTORS LINKED WORLDWIDE', 620, 820, t, W_('e4', 'linked'), S('e5q') - 0.3, WHITE, 28); label('"POINT YOUR TELESCOPES HERE"', 1380, 820, t, W_('e4', 'point'), S('e4b') - 0.3, GOLD, 28);
    if (t > S('e4b') - 0.1) { tag('1–2 PER CENTURY IN OUR GALAXY', 960, 920, t, W_('e4b', 'once'), S('e5q') - 0.3, '#9b3352', 34); label('LAST ONE SEEN: 1604', 1380, 820, t, W_('e4b', 'last'), S('e5q') - 0.3, WHITE, 28); } return; }
  rr2(0, 300, W, 780, 0, '#0b3a5c'); for (let i = 0; i < 8; i++) { const x = 300 + i * 190; rr2(x - 2, 420, 4, 560, 2, 'rgba(255,255,255,0.25)'); for (let j = 0; j < 8; j++) circ(x, 460 + j * 66, 8, '#ffd98a'); } reg('hero', 'sea detector', 280, 400, 1650, 975);
  if (t > W_('e6', 'caught') - 0.2) nuStreaks(t, 4, 0.5, 1400, '#ffffff', [0, 200, W, 700], 19);
  tag('2025 · RECORD NEUTRINO', 960, 120, t, W_('e6', ['2025', 'twenty']), S('o1') - 0.4, '#c8553d', 40); label('DEEP IN THE MEDITERRANEAN', 960, 220, t, W_('e6', 'mediterranean'), S('o1') - 0.4, WHITE, 30);
  meter(560, 320, 800, 1, t, W_('e6', 'carried'), S('o1') - 0.4, '#7ff3ff', '#ff8fd8', '~220 PETA-ELECTRONVOLTS'); label('ORIGIN: A MYSTERY', 960, 1032, t, W_('e6', 'mystery'), S('o1') - 0.4, GOLD, 28);
}
function sOutro(t) {
  const C = CUE; worldBG(t, 'night');
  if (t < S('o3') - 0.1) { kidAt(t, 760, 950, 1.8, { look: [-0.5, -0.3] }); nuStreaks(t, 40, 0.15, 900, NU, [0, 0, W, H], 23); sunAt(t, 160, 160, 90); reg('hero', 'sun', 40, 40, 280, 280);
    const it = [['NEWS FROM THE SUN', 'sun'], ['YOUR OWN POTASSIUM', 'potassium'], ['A MESSENGER FROM A BLACK HOLE', 'messenger']], t0s = it.map(x => W_('o2', x[1]) - 0.3);
    it.forEach(([lab], i) => label(lab, 1380, 300 + i * 110, t, t0s[i], S('o3') - 0.3, i === 2 ? GOLD : WHITE, 30)); return; }
  kidAt(t, 520, 950, 1.6, { look: [1, -0.3] }); nuStreaks(t, 40, 0.15, 900, NU, [0, 0, W, H], 23);
  if (t > S('o3') + 0.2) { reg('label', 'title', 860, 340, 1850, 570); LABELQ.push(() => { riseText('100 TRILLION GHOST PARTICLES', 1340, 400, S('o3') + 0.2, t, { size: 48, weight: 700, color: WHITE, ls: 3, pill: false, dur: 0.8 });
    riseText('JUST PASSED THROUGH YOU', 1340, 510, S('o3') + 0.45, t, { size: 58, weight: 700, color: GOLD, ls: 4, pill: false, dur: 0.8 }); }); sfx('title', S('o3') + 0.2); }
  if (t > S('o4') - 0.2) placeIcon('subscribe', [[1340, 690]], 1.2, t, W_('o4', 'subscribe'), 999, { hw: 124, hh: 38 });
  if (t > C.end) for (const [x, y] of [[1230, 900], [1630, 900]]) { const k = spring(t - C.end - 0.2, 0.5, 12); rr2(x - 170 * k, y - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', x - 170, y - 96, x + 170, y + 96); }
}

const CHAPTERS = [['g1', 'What is a ghost particle?', 'indigo', 'atom'], ['h1', 'A particle nobody could catch', 'grey', 'letter'], ['s1', 'Messages from the Sun', 'night', 'medal'], ['m1', 'The case of the missing neutrinos', 'grey', 'flavors'], ['b1', 'Your body makes them too', 'coral', 'banana'],
  ['x1', 'Will one ever hit me?', 'indigo', 'dice'], ['d1', 'How to catch a ghost', 'night', 'tankI'], ['i1', 'A telescope made of ice', 'night', 'snow'], ['e1', 'Early warning from dying stars', 'night', 'globe']];
function SECTIONS() {
  const out = [], add = (t0, draw, tr, at) => out.push({ t0, draw, tr, at });
  add(0, sOpen);
  const ids = Object.keys(LINES), prevEnd = id => LINES[ids[ids.indexOf(id) - 1]].end + 0.15;
  const scene = { g1: [sGhost, 'g2'], h1: [sHistory, 'h2'], s1: [sSun, 's2'], m1: [sMissing, 'm2'], b1: [sBody, 'b2'], x1: [sHit, 'x2'], d1: [sCatch, 'd2'], i1: [sIce, 'i2'], e1: [sSupernova, 'e2'] };
  CHAPTERS.forEach(([id, title, world, ic], i) => { const t0 = prevEnd(id); add(t0, tt => chapterCard(tt, title, i + 1, world, ic, t0), 'flood', [960, 540]); const [fn, first] = scene[id]; add(Math.min(LINES[id].start + 1.2, LINES[first].start), fn, 'flood', [960, 540]); });
  add(L('o1').start - 0.1, sOutro, 'flood', [960, 540]);
  out.sort((a, b) => a.t0 - b.t0); out.forEach((s, i) => s.t1 = i + 1 < out.length ? out[i + 1].t0 : 1e9); return out;
}
