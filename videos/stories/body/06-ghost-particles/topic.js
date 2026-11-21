// "100 trillion ghost particles just passed through you" — topic file (engine + common.js cast system + icons2.js)
// Visual rework 2026-11-21: every phrase gets its own picture; neutrinos (little glowing ghosts) fly through,
// hit, morph and stream between the icons. Script, voice and word timing are unchanged.
const NU = '#7ff3ff', NU2 = '#ff8fd8', NU3 = '#ffd98a';
const ga = (a, f) => { ctx.save(); ctx.globalAlpha *= a; f(); ctx.restore(); };

// ---------- ambient helpers ----------
function nuStreaks(t, n, ang = 0.25, sp = 900, col = NU, area = [0, 0, W, H], seed = 3, alpha = 1) {   // neutrinos: bright dots with fading tails, all flying the same way
  const [x0, y0, w, h] = area, ca = Math.cos(ang), sa = Math.sin(ang);
  ctx.save(); ctx.globalAlpha *= alpha; ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const r = rng(i * 13 + seed), off = r(), lane = r(), len = 60 + r() * 120, d = ((t * sp * (0.7 + r() * 0.6) / (w + 400) + off) % 1) * (w + 400) - 200;
    const px = x0 + d * ca - (lane - 0.5) * h * sa + w * 0.5 * (1 - ca), py = y0 + h * lane + d * sa;
    const g = ctx.createLinearGradient(px - len * ca, py - len * sa, px, py); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, col);
    ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - len * ca, py - len * sa); ctx.lineTo(px, py); ctx.stroke(); circ(px, py, 4, '#ffffff'); }
  ctx.restore();
}
const streaksOn = (t, t0, n = 26, ang = 0.18, a = 0.55) => { const k = clamp((t - T(t0)) / 0.6); if (k > 0) nuStreaks(t, n, ang, 900, NU, [0, 0, W, H], 5, k * a); };
function elemTile(sym, name, num, col) { rr2(-58, -58, 116, 116, 18, col); rr2(-58, -58, 116, 28, 14, 'rgba(255,255,255,0.18)'); font(62, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(sym, 0, 4); font(name.length > 9 ? 14 : 16, 600); ctx.fillText(name, 0, 44); font(16, 700); ctx.fillText(num, -38, -40); }
function iceBG(t, k = 1, cube = 0) {   // IceCube: sky, ice sheet, strings of sensors lowered to depth k
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#8fc8f4'); g.addColorStop(0.27, '#d8eeff'); g.addColorStop(0.3, '#c4e2f6'); g.addColorStop(1, '#2f6fa8'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 7; i++) ell(200 + i * 260 + Math.sin(t * 0.2 + i) * 20, 318, 140, 14, 'rgba(255,255,255,0.35)');
  for (let s = 0; s < 9; s++) { const x = 360 + s * 150; rr2(x - 2, 330, 4, 640 * k, 2, 'rgba(20,40,80,0.35)'); for (let i = 0; i < 12 * k; i++) circ(x, 380 + i * 50, 9, (Math.sin(t * 2 + s + i) > 0.85) ? '#fff3c0' : '#e0b04a'); }
  if (cube > 0) ga(cube * (0.4 + 0.25 * Math.sin(t * 3)), () => { ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(330, 340, 1260, 650); });
}
function crustBG(t) {   // DUNE: a slice of the curved Earth, Chicago on the left, South Dakota on the right
  const cx = 960, cy = 2300, R = 1700; circ(cx, cy, R, '#5a4a3a'); circ(cx, cy, R - 60, '#4a3c30'); circ(cx, cy, R - 260, '#3a2e26');
  ctx.fillStyle = '#5fbf6a'; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 1.15, Math.PI * 1.85); ctx.arc(cx, cy, R - 22, Math.PI * 1.85, Math.PI * 1.15, true); ctx.fill();
}
function rockBG(t) { ctx.fillStyle = '#3a3f5a'; ctx.beginPath(); ctx.moveTo(0, 230); ctx.lineTo(420, 90); ctx.lineTo(760, 200); ctx.lineTo(1200, 60); ctx.lineTo(W, 210); ctx.lineTo(W, 290); ctx.lineTo(0, 290); ctx.fill(); rr2(0, 280, W, 800, 0, '#262a3c'); for (let i = 0; i < 6; i++) ell(200 + i * 320, 380 + (i % 2) * 520, 120, 40, 'rgba(255,255,255,0.04)'); }

// ---------- icons ----------
Object.assign(ICONS, {
  nu(t, o) {   // a neutrino: a small glowing ghost with a speed trail (o.col, o.cyc = cycles through the three flavours, o.faint)
    const cols = [NU, NU2, NU3]; let c = o.col || NU; if (o.cyc) c = cols[Math.floor(t * 1.2) % 3];
    ctx.save(); if (o.faint) ctx.globalAlpha *= 0.4 + 0.15 * Math.sin(t * 4);
    ga(0.16, () => circ(0, 0, 62, c)); ga(0.28, () => circ(0, 0, 44, c));
    for (let i = 0; i < 3; i++) { const w = 40 + (i % 2) * 22 + Math.sin(t * 9 + i) * 8; ga(0.55, () => rr2(-34 - w, -16 + i * 14, w, 7, 3.5, c)); }
    ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-30, 28); ctx.lineTo(-30, -4); ctx.arc(0, -4, 30, Math.PI, 0); ctx.lineTo(30, 28);
    for (let i = 0; i < 3; i++) ctx.quadraticCurveTo(20 - i * 20, 40 + Math.sin(t * 8 + i) * 6, 10 - i * 20, 28); ctx.fill();
    rr2(-20, -24, 9, 16, 4.5, 'rgba(255,255,255,0.7)'); eyes(t, 2, -4, 10, 4.5, '#102348'); ctx.restore();
  },
  sunN(t, o) {   // our Sun: layered glow, drifting granules; o.cut opens a wedge to the glowing core
    for (const [r, a] of [[98, 0.08], [82, 0.14], [68, 0.24]]) ga(a * (1 + 0.2 * Math.sin(t * 2 + r)), () => circ(0, 0, r, '#ffb347'));
    circ(0, 0, 58, '#ff9a3a'); circ(0, 0, 53, '#ffc44a'); circ(-6, -6, 40, '#ffd770');
    for (let i = 0; i < 10; i++) { const a = i * 2.4 + t * 0.3, d = (i * 13) % 42; circ(Math.cos(a) * d, Math.sin(a) * d, 6 + 2 * Math.sin(t * 3 + i), 'rgba(255,245,200,0.45)'); }
    rr2(-36, -40, 22, 10, 5, 'rgba(255,255,255,0.5)');
    if (o.cut) { ctx.fillStyle = '#ff6a2a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 58, -0.55, 0.55); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ff4a1a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 36, -0.55, 0.55); ctx.closePath(); ctx.fill();
      ga(0.6 + 0.4 * Math.sin(t * 6), () => circ(0, 0, 15, '#fff6d0')); circ(0, 0, 8, '#ffffff'); }
  },
  electron(t) { ga(0.25, () => circ(0, 0, 54, '#5b9bf0')); circ(0, 0, 40, '#3a7bd5'); circ(0, 0, 32, '#5b9bf0'); rr2(-16, -4, 32, 8, 4, '#fff'); rr2(-22, -26, 14, 8, 4, 'rgba(255,255,255,0.55)'); },
  balanceN(t, o) {   // a balance: a heavy electron on the left, a near-weightless neutrino on the right (o.k 0..1 = tilt)
    const k = o.k ?? 1, a = -0.32 * k + Math.sin(t * 2) * 0.02; rr2(-40, 58, 80, 12, 6, '#5b6585'); rr2(-6, -10, 12, 70, 6, '#9aa6c4');
    ctx.save(); ctx.translate(0, -10); ctx.rotate(a); rr2(-82, -5, 164, 10, 5, '#c9d6ec'); ctx.restore(); circ(0, -10, 9, '#ffd98a');
    for (const s of [-1, 1]) { const ex = s * 76 * Math.cos(a), ey = -10 + s * 76 * Math.sin(a); rr2(ex - 2, ey, 4, 30, 2, '#9aa6c4'); ell(ex, ey + 32, 28, 8, '#c9d6ec');
      if (s < 0) { circ(ex, ey + 10, 20, '#3a7bd5'); rr2(ex - 9, ey + 8, 18, 5, 2.5, '#fff'); } else { ga(0.4, () => circ(ex, ey + 24, 10, NU)); circ(ex, ey + 24, 4, '#fff'); } }
  },
  magnet(t) { ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.arc(0, 0, 52, 0, Math.PI); ctx.arc(0, 0, 24, Math.PI, 0, true); ctx.fill(); rr2(-52, -50, 28, 52, 4, '#e2457a'); rr2(24, -50, 28, 52, 4, '#e2457a'); rr2(-52, -66, 28, 18, 4, '#dfe7f2'); rr2(24, -66, 28, 18, 4, '#dfe7f2'); rr2(-44, 8, 10, 26, 5, 'rgba(255,255,255,0.35)');
    for (let i = 0; i < 3; i++) { const p = (t * 0.9 + i / 3) % 1; ga(1 - p, () => { circ(-38, -76 - p * 30, 5, '#ffd98a'); circ(38, -76 - p * 30, 5, '#8fd8e6'); }); } },
  bolt(t, o) { ctx.save(); ctx.globalAlpha *= 1 - (o.fade || 0); const f = 0.85 + 0.15 * Math.abs(Math.sin(t * 9)); ga(0.25 * f, () => circ(0, 0, 62, '#ffd98a'));
    poly([[14, -70], [-34, 8], [-4, 8], [-16, 70], [36, -14], [6, -14], [24, -70]], '#ffd36b'); poly([[14, -70], [-6, -24], [4, -24], [24, -70]], '#fff3c0'); ctx.restore(); },
  bigbang(t) { const p = (t * 0.8) % 1; ga(1 - p, () => { ctx.fillStyle = 'rgba(255,217,138,0.5)'; ctx.beginPath(); ctx.arc(0, 0, 30 + p * 36, 0, 6.283); ctx.arc(0, 0, 22 + p * 36, 0, 6.283); ctx.fill('evenodd'); });
    ctx.save(); ctx.rotate(t * 0.5); const a1 = []; for (let i = 0; i < 24; i++) { const r = i % 2 ? 26 : 56 + (i % 4 ? 0 : 8), a = i / 24 * 6.283; a1.push([Math.cos(a) * r, Math.sin(a) * r]); } poly(a1, '#ff8f4a'); ctx.restore();
    ctx.save(); ctx.rotate(-t * 0.7); const a2 = []; for (let i = 0; i < 16; i++) { const r = i % 2 ? 16 : 38, a = i / 16 * 6.283; a2.push([Math.cos(a) * r, Math.sin(a) * r]); } poly(a2, '#ffd98a'); ctx.restore(); circ(0, 0, 14, '#fff'); },
  cube(t, o) {   // a sugar cube of space with neutrinos drifting inside (o.n)
    const s = 50; poly([[0, -s], [s * 0.95, -s * 0.45], [0, 0.1 * s], [-s * 0.95, -s * 0.45]], '#ffffff'); poly([[-s * 0.95, -s * 0.45], [0, 0.1 * s], [0, s * 1.1], [-s * 0.95, s * 0.55]], '#dfe7f2'); poly([[s * 0.95, -s * 0.45], [0, 0.1 * s], [0, s * 1.1], [s * 0.95, s * 0.55]], '#b8c6dc');
    for (let i = 0; i < 12; i++) circ(((i * 37) % 80) - 40, ((i * 23) % 80) - 30, 2.5, 'rgba(160,176,210,0.6)');
    const n = Math.round(o.n ?? 14); for (let i = 0; i < n; i++) { const x = Math.sin(i * 2.3 + t * 0.8) * 34, y = Math.cos(i * 1.7 + t * 0.6) * 34 + 6, c = i % 3 ? NU : NU2; ga(0.35, () => circ(x, y, 9, c)); circ(x, y, 4, c); }
  },
  photon(t) { ga(0.25, () => circ(30, 0, 40, '#ffd98a')); for (let i = 0; i < 22; i++) { const x = -62 + i * 5.5, y = Math.sin(i * 0.6 - t * 10) * 18 * Math.sin(i / 22 * Math.PI); circ(x, y, 5, '#ffd36b'); } circ(56, 0, 14, '#fff3c0'); circ(56, 0, 7, '#fff'); },
  leadwall(t) { rr2(-52, -90, 104, 180, 10, '#6b7085'); rr2(-52, -90, 20, 180, 8, '#5a5f73'); for (let r = 0; r < 6; r++) rr2(-52, -90 + r * 30, 104, 3, 1, 'rgba(255,255,255,0.10)'); for (let r = 0; r < 6; r++) rr2(-14 + (r % 2) * 30, -88 + r * 30, 3, 27, 1, 'rgba(0,0,0,0.14)');
    font(38, 700); ctx.fillStyle = '#c9d6ec'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Pb', 10, 0); },
  detectorJ(t, o) {   // Super-Kamiokande: a tank of water lined with gold light sensors; o.k = sensors lit, o.ring = blue ring (0..1.6)
    const k = o.k ?? 1; rr2(-72, -76, 144, 160, 18, '#1a2a44'); rr2(-64, -62, 128, 136, 10, '#163a66'); ell(0, -62, 64, 13, '#2d5a8a'); ell(0, 74, 64, 11, '#123058');
    for (let r = 0; r < 7; r++) for (let c = 0; c < 8; c++) { const i = r * 8 + c, on = ((i * 37) % 56) / 56 < k; circ(-52 + c * 15, -40 + r * 18, 5, on ? `rgba(255,200,110,${0.7 + 0.3 * Math.sin(t * 3 + i)})` : '#2a4060'); }
    ga(0.3 + 0.1 * Math.sin(t * 2), () => rr2(-58, -56, 116, 7, 3.5, '#8fd8e6'));
    const rg = o.ring || 0; if (rg > 0 && rg < 1.6) { const rk = eoc(clamp(rg)), a = 1 - clamp((rg - 1) / 0.6); ga(a, () => { ctx.fillStyle = '#6fd0ff'; ctx.beginPath(); ctx.ellipse(0, 14, 52 * rk + 1, 24 * rk + 1, 0, 0, 6.283); ctx.ellipse(0, 14, Math.max(0.5, 52 * rk - 9), Math.max(0.5, 24 * rk - 6), 0, 0, 6.283); ctx.fill('evenodd'); }); }
  },
  mineH(t) { rr2(-82, 40, 164, 14, 6, '#7a5a3a'); rr2(-12, 54, 24, 26, 4, '#20232f'); poly([[-50, 40], [-36, 40], [-8, -50], [-18, -50]], '#c95a3a'); poly([[50, 40], [36, 40], [8, -50], [18, -50]], '#c95a3a'); rr2(-40, -6, 80, 8, 4, '#a84a2c');
    rr2(-1, -56, 2, 112, 1, 'rgba(220,230,255,0.6)'); ctx.save(); ctx.translate(0, -56); ctx.rotate(t * 2); circ(0, 0, 24, '#5b6585'); circ(0, 0, 17, '#1a2a44'); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 4); rr2(-2, -18, 4, 36, 2, '#9aa6c4'); } ctx.restore(); circ(0, -56, 5, '#ffd98a');
    rr2(-76, 10, 30, 30, 4, '#e8d6c0'); poly([[-80, 10], [-61, -8], [-42, 10]], '#c95a5a'); circ(62, 30, 9, '#ffd36b'); circ(59, 27, 3, '#fff'); },
  elemK(t) { elemTile('K', 'POTASSIUM-40', '19', '#9b3352'); },
  elemCl(t) { elemTile('Cl', 'CHLORINE', '17', '#2f8f5a'); },
  elemAr(t) { elemTile('Ar', 'ARGON', '18', '#5b4fd6'); },
  proton(t) { ga(0.25, () => circ(0, 0, 52, '#ff6f8f')); circ(0, 0, 40, '#e2457a'); circ(0, 0, 33, '#ff6f8f'); rr2(-14, -4, 28, 8, 4, '#fff'); rr2(-4, -14, 8, 28, 4, '#fff'); rr2(-24, -26, 14, 8, 4, 'rgba(255,255,255,0.55)'); },
  helium(t) { ga(0.22, () => circ(0, 0, 66, '#ffd98a')); for (const [x, y, c] of [[-20, -18, '#e2457a'], [20, 18, '#e2457a'], [20, -18, '#9aa6c4'], [-20, 18, '#9aa6c4']]) { circ(x, y, 28, c); circ(x - 7, y - 8, 8, 'rgba(255,255,255,0.45)'); } font(20, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('He', 0, 2); },
  city(t) { [[-64, 60, '#3a4a7a'], [-30, 100, '#4b5f9a'], [6, 76, '#3a4a7a'], [40, 120, '#5b6fa8']].forEach(([x, h, c], i) => { rr2(x, 60 - h, 30, h, 4, c); for (let r = 0; r < h / 18 - 1; r++) for (let q = 0; q < 2; q++) rr2(x + 5 + q * 12, 66 - h + r * 18, 7, 8, 2, Math.sin(t * 1.3 + i * 3 + r + q * 2) > 0.3 ? '#ffd98a' : '#26305a'); }); rr2(-76, 60, 156, 8, 4, '#20232f'); },
  iceLab(t) { ell(0, 50, 84, 14, '#f3faff'); rr2(-60, 10, 8, 40, 3, '#5b6585'); rr2(52, 10, 8, 40, 3, '#5b6585'); rr2(-72, -34, 144, 48, 8, '#3a4a6a'); rr2(-72, -34, 144, 10, 6, '#5b6f9a');
    for (let i = 0; i < 5; i++) rr2(-60 + i * 26, -16, 16, 14, 3, (Math.sin(t * 2 + i) > 0.5) ? '#ffd98a' : '#8fd8e6'); rr2(22, -58, 24, 24, 4, '#5b6585'); circ(34, -64, 12, '#c9d6ec');
    for (let i = 0; i < 6; i++) { const p = (t * 0.3 + i / 6) % 1; circ(-70 + i * 28 + Math.sin(t + i) * 6, -70 + p * 116, 3, 'rgba(255,255,255,0.85)'); } },
  dom(t, o) {   // IceCube light sensor: a glass sphere with a gold photo-tube, blinking
    rr2(-2, -84, 4, 34, 2, '#9aa6c4'); circ(0, 0, 52, 'rgba(200,230,255,0.4)'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 47, 0, 6.283); ctx.clip(); rr2(-50, 4, 100, 50, 0, '#20232f'); circ(0, 30, 26, '#c9a24a'); ctx.restore();
    rr2(-54, -4, 108, 10, 5, '#9aa6c4'); rr2(-30, -36, 22, 10, 5, 'rgba(255,255,255,0.6)'); const f = Math.max(0, Math.sin(t * 3)) ** 8; ga(f, () => { circ(0, 30, 34, 'rgba(127,243,255,0.5)'); circ(0, 30, 12, '#fff'); }); },
  drill(t) { rr2(-62, -10, 124, 50, 10, '#e2457a'); rr2(-62, -10, 124, 12, 8, '#ff6f8f'); wheel(t, -36, 44, 14); wheel(t, 36, 44, 14); ctx.save(); ctx.translate(-10, -34); ctx.rotate(t * 3); circ(0, 0, 30, '#5b6585'); circ(0, 0, 20, '#3a3f5a'); rr2(-3, -28, 6, 56, 3, '#9aa6c4'); ctx.restore(); circ(-10, -34, 6, '#ffd98a'); puff(t, 44, -18, 3, -1, 'rgba(255,255,255,0.7)', 10); },
  bhJet(t) {   // a blazar: black hole, glowing disc, twin jets
    for (const sd of [-1, 1]) { const L = 72 + 8 * Math.sin(t * 5 + sd); ctx.fillStyle = 'rgba(180,140,255,0.55)'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(6, 0); ctx.lineTo(16, sd * -L); ctx.lineTo(-16, sd * -L); ctx.fill(); ctx.fillStyle = 'rgba(235,220,255,0.85)'; ctx.beginPath(); ctx.moveTo(-2, 0); ctx.lineTo(2, 0); ctx.lineTo(6, sd * -L * 0.9); ctx.lineTo(-6, sd * -L * 0.9); ctx.fill(); }
    ctx.save(); ctx.rotate(-0.3); ell(0, 0, 64, 17, '#ff8f4a'); ell(0, 0, 50, 13, '#ffd98a'); ell(0, 0, 36, 9, '#fff3c0'); ctx.restore(); circ(0, 0, 21, '#05060c');
    ctx.save(); ctx.rotate(-0.3); ctx.fillStyle = '#ff8f4a'; ctx.beginPath(); ctx.ellipse(0, 0, 64, 17, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#ffd98a'; ctx.beginPath(); ctx.ellipse(0, 0, 50, 13, 0, 0, Math.PI); ctx.fill(); const a = t * 2.5; circ(Math.cos(a) * 56, Math.sin(a) * 15, 4, '#fff'); ctx.restore(); },
  galaxyI(t, o) { ga(0.35, () => circ(0, 0, 30, o.nu ? NU : '#ffe9b0')); circ(0, 0, 12, '#fff3c0'); ctx.save(); ctx.rotate(t * 0.25);
    for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 26; i++) { const a = arm * Math.PI + i * 0.24, r = 10 + i * 2.3; circ(Math.cos(a) * r, Math.sin(a) * r * 0.62, 5.5 - i * 0.13, o.nu ? (i % 3 ? NU : '#ffffff') : (i % 3 ? '#b8a8ff' : '#ffd9f0')); } ctx.restore();
    if (o.sn) { const p = (t * 0.7) % 1; ga(1 - p, () => circ(34, -14, 6 + p * 16, '#fff3c0')); circ(34, -14, 5, '#fff'); } },
  starBig(t, o) {   // a giant star; o.b: 0..1 collapse, 1..2 supernova shells
    const b = o.b || 0;
    if (b < 1) { const r = lerp(52, 22, eic(b)), hot = b > 0.5; ga(0.2, () => circ(0, 0, r * 1.5, '#ff8f4a')); circ(0, 0, r, hot ? '#ffd98a' : '#ff7a4a'); circ(-r * 0.25, -r * 0.25, r * 0.6, hot ? '#fff3c0' : '#ff9a5a'); for (let i = 0; i < 6; i++) { const a = i * 1.1 + t * 0.4; circ(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, r * 0.12, 'rgba(255,220,160,0.4)'); } }
    else { const k = b - 1; for (let i = 0; i < 3; i++) { const q = (k * 0.8 + i / 3) % 1, rr = 20 + q * 50; ga((1 - q) * 0.85, () => { ctx.fillStyle = ['#ff8f4a', '#ffd98a', '#ff8fd8'][i]; ctx.beginPath(); ctx.arc(0, 0, rr, 0, 6.283); ctx.arc(0, 0, Math.max(0, rr - 10), 0, 6.283); ctx.fill('evenodd'); }); }
      const fl = Math.max(0, 1 - k * 1.5); ga(0.6 + 0.4 * fl, () => circ(0, 0, 16 + fl * 30, '#fff')); }
  },
  seaDet(t) { rr2(-82, -62, 164, 132, 14, '#0b3a5c'); ctx.fillStyle = '#2a7fb8'; ctx.beginPath(); ctx.moveTo(-82, -48); for (let x = -82; x <= 82; x += 8) ctx.lineTo(x, -62 + Math.sin(x * 0.08 + t * 3) * 5); ctx.lineTo(82, -46); ctx.closePath(); ctx.fill();
    for (let s = 0; s < 5; s++) { const x = -56 + s * 28; rr2(x - 1, -32, 2, 92, 1, 'rgba(255,255,255,0.25)'); for (let j = 0; j < 5; j++) circ(x + Math.sin(t * 0.8 + s) * 2, -24 + j * 19, 5, (Math.sin(t * 2 + s + j) > 0.7) ? '#fff3c0' : '#e0b04a'); }
    rr2(-82, 60, 164, 10, 5, '#3a3f5a'); bubbles(t, 0, 0, 120, 100, 5, 'rgba(200,240,255,0.5)'); },
  collider(t) { rr2(-34, 30, 68, 26, 6, '#3a3f5a'); ctx.fillStyle = '#5b6585'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 42, 0, 0, 6.283); ctx.ellipse(0, 0, 52, 29, 0, 0, 6.283); ctx.fill('evenodd');
    const a = t * 2.4; circ(Math.cos(a) * 61, Math.sin(a) * 35, 7, '#8fd8e6'); circ(Math.cos(Math.PI - a) * 61, Math.sin(Math.PI - a) * 35, 7, '#ff8fd8'); const f = Math.max(0, Math.cos(2 * a - Math.PI)) ** 14; ga(f, () => circ(0, Math.sin(a) * 35, 18, '#fff')); },
  netN(t) { ctx.save(); ctx.rotate(-0.35 + Math.sin(t * 1.8) * 0.12); rr2(36, -36, 64, 10, 5, '#9a7a5a'); ctx.fillStyle = 'rgba(220,240,255,0.4)'; ctx.beginPath(); ctx.moveTo(-40, -30); ctx.quadraticCurveTo(-6, 56 + Math.sin(t * 3) * 6, 40, -30); ctx.fill();
    for (let i = 0; i < 9; i++) circ(-28 + (i % 3) * 24 + (i / 3 | 0) * 4, -16 + (i / 3 | 0) * 16, 2.5, 'rgba(255,255,255,0.7)'); ctx.fillStyle = '#dfe7f2'; ctx.beginPath(); ctx.ellipse(0, -30, 42, 12, 0, 0, 6.283); ctx.ellipse(0, -30, 35, 7, 0, 0, 6.283); ctx.fill('evenodd'); ctx.restore(); },
  bone(t) { ctx.save(); ctx.rotate(-0.6); rr2(-50, -12, 100, 24, 12, '#f3ead8'); for (const [x, y] of [[-54, -14], [-54, 14], [54, -14], [54, 14]]) circ(x, y, 18, '#f3ead8'); rr2(-36, -8, 60, 6, 3, 'rgba(255,255,255,0.7)'); ctx.restore(); },
  bulb(t) { const p = 0.7 + 0.3 * Math.sin(t * 4); ga(0.3 * p, () => circ(0, -14, 64, '#ffd98a')); circ(0, -14, 44, '#ffe9a8'); rr2(-20, 22, 40, 14, 5, '#9aa6c4'); rr2(-18, 36, 36, 10, 5, '#5b6585'); rr2(-14, 46, 28, 8, 4, '#9aa6c4'); rr2(-6, -24, 12, 30, 6, '#ff8f4a'); rr2(-24, -40, 12, 18, 6, 'rgba(255,255,255,0.7)'); },
  radio(t) { ctx.save(); ctx.rotate(t * 0.4); circ(0, 0, 58, '#ffd36b'); ctx.fillStyle = '#20232f'; for (let i = 0; i < 3; i++) { const a = i * 2.094 - Math.PI / 2; ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.52) * 14, Math.sin(a - 0.52) * 14); ctx.arc(0, 0, 50, a - 0.52, a + 0.52); ctx.arc(0, 0, 14, a + 0.52, a - 0.52, true); ctx.fill(); } circ(0, 0, 9, '#20232f'); ctx.restore(); },
  weightT(t) { poly([[-44, -30], [44, -30], [60, 50], [-60, 50]], '#3a3f5a'); poly([[-44, -30], [-30, -30], [-40, 50], [-60, 50]], '#2b2f40'); ctx.fillStyle = '#3a3f5a'; ctx.beginPath(); ctx.arc(0, -30, 26, Math.PI, 0); ctx.arc(0, -30, 14, 0, Math.PI, true); ctx.fill(); font(30, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('4M t', 0, 14); },
  news(t) { ctx.save(); ctx.rotate(-0.08 + Math.sin(t * 1.5) * 0.05); rr2(-62, -54, 124, 108, 8, '#f3f7fb'); rr2(-52, -44, 104, 16, 4, '#20232f'); circ(-26, 6, 20, '#ffc44a'); circ(-26, 6, 10, '#ff6a2a'); for (let i = 0; i < 4; i++) rr2(4, -16 + i * 14, 46, 6, 3, '#9fb0d8'); rr2(-52, 36, 104, 6, 3, '#9fb0d8'); ctx.restore(); },
  fingerN(t) { ctx.save(); ctx.rotate(0.15); rr2(-32, -74, 64, 156, 32, SKIN); rr2(-32, -60, 16, 140, 10, '#e09a76'); rr2(-22, -66, 44, 50, 20, '#ffd0d8'); rr2(-15, -60, 12, 22, 6, 'rgba(255,255,255,0.6)'); rr2(-26, 12, 52, 4, 2, 'rgba(160,90,70,0.4)'); rr2(-26, 32, 52, 4, 2, 'rgba(160,90,70,0.4)');
    ga(0.6 + 0.4 * Math.sin(t * 3), () => { ctx.fillStyle = 'rgba(127,243,255,0.35)'; ctx.fillRect(-18, -62, 36, 36); }); ctx.restore(); },
  feather(t) { ctx.save(); ctx.rotate(0.6 + Math.sin(t * 1.5) * 0.2); ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.moveTo(0, -72); ctx.quadraticCurveTo(38, -20, 8, 60); ctx.lineTo(-8, 60); ctx.quadraticCurveTo(-38, -20, 0, -72); ctx.fill(); ctx.fillStyle = '#c9d6ec'; ctx.beginPath(); ctx.moveTo(0, -72); ctx.quadraticCurveTo(38, -20, 8, 60); ctx.lineTo(0, 60); ctx.fill(); rr2(-2, -60, 4, 136, 2, '#9aa6c4'); ctx.restore(); },
  atom(t) { circ(0, 0, 20, '#ff8f4a'); circ(-6, -6, 7, '#ffd98a'); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * 1.05); ctx.strokeStyle = 'rgba(143,216,230,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 70, 24, 0, 0, 6.283); ctx.stroke(); const a = t * 3 + i * 2; circ(Math.cos(a) * 70, Math.sin(a) * 24, 9, '#8fd8e6'); ctx.restore(); } },
  letter(t) { rr2(-62, -46, 124, 92, 8, '#f3ead8'); ctx.fillStyle = '#d9c7a0'; ctx.beginPath(); ctx.moveTo(-62, -46); ctx.lineTo(0, 6); ctx.lineTo(62, -46); ctx.fill(); for (let i = 0; i < 3; i++) rr2(-42, 14 + i * 9, 80 - i * 20, 4, 2, '#9b8a6a'); font(18, 700); ctx.fillStyle = '#9b3352'; ctx.textAlign = 'center'; ctx.fillText('1930', 32, 36); },
  reactor(t) { ctx.fillStyle = '#c9d6ec'; ctx.beginPath(); ctx.moveTo(-60, 60); ctx.quadraticCurveTo(-36, 0, -48, -60); ctx.lineTo(48, -60); ctx.quadraticCurveTo(36, 0, 60, 60); ctx.fill(); ctx.fillStyle = '#aab6d0'; ctx.beginPath(); ctx.moveTo(-60, 60); ctx.quadraticCurveTo(-36, 0, -48, -60); ctx.lineTo(-30, -60); ctx.quadraticCurveTo(-18, 0, -36, 60); ctx.fill(); rr2(-60, 40, 120, 20, 6, '#9aa6c4');
    for (let i = 0; i < 4; i++) { const p = (t * 0.4 + i / 4) % 1; ga((1 - p) * 0.8, () => circ(-20 + i * 14 + Math.sin(p * 5) * 10, -70 - p * 70, 18 + p * 20, 'rgba(255,255,255,0.8)')); } },
  telegram(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.6) * 0.06); rr2(-70, -46, 140, 92, 6, '#ffe9a8'); rr2(-70, -46, 140, 20, 6, '#c8553d'); font(14, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('TELEGRAM', 0, -31); for (let i = 0; i < 4; i++) rr2(-54, -12 + i * 14, 108 - (i % 2) * 30, 6, 3, '#9b8a6a'); ctx.restore(); },
  medal(t) { ctx.fillStyle = '#3a6fd6'; ctx.beginPath(); ctx.moveTo(-30, -80); ctx.lineTo(-6, -20); ctx.lineTo(6, -20); ctx.lineTo(30, -80); ctx.lineTo(14, -80); ctx.lineTo(0, -40); ctx.lineTo(-14, -80); ctx.fill(); circ(0, 20, 56, '#e0a92a'); circ(0, 20, 46, '#ffd36b'); for (let i = 0; i < 10; i++) { ctx.save(); ctx.translate(0, 20); ctx.rotate(-1.3 + i * 0.29); rr2(-4, -40, 8, 14, 4, '#e0a92a'); ctx.restore(); } circ(0, 20, 18, '#e0a92a'); },
  banana(t) { ctx.save(); ctx.rotate(-0.4 + Math.sin(t * 1.5) * 0.08); ctx.fillStyle = '#ffd94a'; ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(0, 60, 70, -20); ctx.quadraticCurveTo(10, 30, -70, -10); ctx.fill(); ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(0, 40, 70, -20); ctx.quadraticCurveTo(0, 70, -64, 0); ctx.fill(); rr2(-80, -18, 14, 12, 4, '#7a5a2a'); rr2(66, -26, 12, 10, 4, '#3a2a1a'); ctx.restore(); },
  pie(t, o) { const v = o.v || 0.25, k = clamp((t % 6) / 1.2); circ(0, 0, 62, '#2d2b7c'); ctx.fillStyle = o.col || NU; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 62, -Math.PI / 2, -Math.PI / 2 + v * 6.283 * eoq(k)); ctx.fill(); },
  dice(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.3); rr2(-50, -50, 100, 100, 20, '#f3f7fb'); for (const [x, y] of [[-24, -24], [24, -24], [0, 0], [-24, 24], [24, 24]]) circ(x, y, 9, '#e2457a'); ctx.restore(); },
  flavors(t) { [NU2, NU, NU3].forEach((c, i) => { const a = t * 1.5 + i * 2.094; circ(Math.cos(a) * 46, Math.sin(a) * 30, 26, c); }); circ(0, 0, 14, [NU2, NU, NU3][Math.floor(t * 0.5) % 3]); },
  tankI(t, o) { const lv = o.lv ?? 0.85; rr2(-70, -60, 140, 120, 30, '#5b6585'); rr2(-60, -50, 120, 100, 24, '#3a3f5a'); rr2(-60, -50 + 100 * (1 - lv), 120, 100 * lv, 20, 'rgba(143,216,230,0.6)'); bubbles(t, 0, 10, 100, 70, 4); },
  globe(t) { circ(0, 0, 62, '#2a6fc0'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 62, 0, 6.283); ctx.clip(); for (const [a, b, s] of [[-20 + t * 6 % 140, -10, 26], [30 + t * 6 % 140, 20, 20], [-60 + t * 6 % 140, 30, 16]]) { ctx.fillStyle = '#5fbf6a'; ctx.beginPath(); ctx.ellipse(((a + 70) % 140) - 70, b, s, s * 0.7, 0, 0, 6.283); ctx.fill(); } ctx.restore();
    const P = [[-30, -30], [36, -20], [10, 34], [-40, 26]]; ctx.strokeStyle = 'rgba(255,217,138,0.8)'; ctx.lineWidth = 4; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke(); P.forEach(([x, y], i) => circ(x, y, 7 + 3 * Math.max(0, Math.sin(t * 4 - i)), '#ffd98a')); },
  scopeI(t) { rr2(-14, 10, 28, 60, 8, '#5b6585'); ctx.save(); ctx.rotate(-0.6 + Math.sin(t * 0.8) * 0.15); rr2(-20, -70, 40, 90, 14, '#9aa6c4'); rr2(-24, -80, 48, 18, 8, '#3a3f5a'); ctx.restore(); rr2(-40, 66, 80, 12, 6, '#3a3f5a'); },
  bedN(t) { rr2(-90, -20, 180, 40, 14, '#f3f7fb'); rr2(-90, -48, 24, 90, 10, '#4b6fd6'); rr2(-62, -34, 50, 24, 10, '#f7f1ff'); rr2(-10, -24, 98, 30, 12, '#8fd8e6'); rr2(-84, 20, 12, 24, 4, '#4b6fd6'); rr2(72, 20, 12, 24, 4, '#4b6fd6'); },
});
Object.assign(IDLE, {
  nu: { pre: t => { ctx.translate(Math.sin(t * 3.1) * 3, Math.cos(t * 2.3) * 4); ctx.rotate(Math.sin(t * 2) * 0.06); } },
  sunN: { pre: t => { const b = 1 + Math.sin(t * 1.7) * 0.025; ctx.scale(b, b); } },
  electron: { pre: t => ctx.translate(0, Math.sin(t * 3) * 4) }, balanceN: {}, magnet: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.06) }, bolt: { pre: t => ctx.rotate(Math.sin(t * 7) * 0.03) },
  bigbang: {}, cube: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.05) }, photon: { pre: t => ctx.translate(Math.sin(t * 4) * 5, 0) }, leadwall: { post: t => glint(t, 52, 90, 3) },
  detectorJ: {}, mineH: {}, elemK: { post: t => glint(t, 58, 58, 3.1) }, elemCl: { post: t => glint(t, 58, 58, 2.9) }, elemAr: { post: t => glint(t, 58, 58, 2.7) },
  proton: { pre: t => { const b = 1 + Math.sin(t * 5) * 0.04; ctx.scale(b, 1 / b); } }, helium: { pre: t => ctx.rotate(Math.sin(t * 3) * 0.12) }, city: {}, iceLab: {}, dom: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) }, drill: {},
  bhJet: { pre: t => ctx.rotate(Math.sin(t * 0.8) * 0.05) }, galaxyI: {}, starBig: { pre: t => { const b = 1 + Math.sin(t * 2.6) * 0.03; ctx.scale(b, b); } }, seaDet: {}, collider: {}, netN: {},
  bone: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.08) }, bulb: {}, radio: {}, weightT: { pre: t => ctx.translate(0, Math.abs(Math.sin(t * 2.5)) * -6) }, news: {}, fingerN: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.05) }, feather: {},
  atom: {}, letter: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) }, reactor: {}, telegram: {}, medal: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.08), post: t => glint(t, 56, 60) },
  banana: {}, pie: {}, dice: {}, flavors: {}, tankI: {}, globe: {}, scopeI: {},
  bedN: { post: t => { font(22, 700); ctx.fillStyle = GOLD; ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 2.5); ctx.fillText('z', 60, -50 - (t * 12 % 14)); } },
});
const nu = (x, y, s, t0, op = {}) => A('nu', x, y, s, t0, { hw: 56, hh: 50, ...op });
const sunA = (x, y, s, t0, op = {}) => A('sunN', x, y, s, t0, { hw: 66, hh: 66, ...op });
const NUS = { ic: 'nu', s: 0.3, n: 10 };   // a stream of tiny neutrino ghosts

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  if (t > T('c2:trillions') - 0.3 && t < S('c4q')) streaksOn(t, 'c2:trillions', 30, 0.18, 0.45);
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [A('kid', 900, 600, 2.7, 'c1:something', { pulse: ['c1:body'] }), nu(300, 380, 1.7, 'c1:passing', { mv: [['c1:body', 900, 420, 40], ['c1:now', 1450, 380, 40]] })] },
    { at: 'c2', cast: [sunA(260, 300, 2.2, 'c2:sun'), A('kid', 900, 600, 2.7, 'c2', { pulse: ['c2:skin', 'c2:feel'] }), nu(560, 330, 1.6, 'c2:fly', { mv: [['c2:skin', 900, 430, 40], ['c2:bones', 1250, 330, 40], ['c2:brain', 1300, 700, 60], ['c2:side', 1700, 560, 40]] }),
      A('bone', 1450, 300, 1.7, 'c2:bones', { pulse: ['c2:bones+0.2'] }), A('brainS', 1450, 760, 1.6, 'c2:brain', { pulse: ['c2:brain+0.2'] })],
      fx: [['stream', 0, [1850, 620], 'c2:sun+0.3', 'c2>', { ...NUS, n: 9 }]], lab: [['TRILLIONS EVERY SECOND', 'c2:trillions', 640, 965, GOLD, 34], ['YOU FEEL NOTHING', 'c2:feel', 1450, 965, WHITE, 30]] },
    { at: 'c3', cast: [nu(560, 470, 3.2, 'c3:neutrinos'), A('ghost', 1060, 330, 1.8, 'c3:ghost'), A('netN', 1150, 720, 2.0, 'c3:catching', { hw: 80, mv: [['c3:won', 800, 560, 60]] }), A('medal', 1560, 520, 2.1, 'c3:nobel', { hw: 60, hh: 90, pulse: ['c3:physics'] })],
      tag: [['NEUTRINOS', 'c3:neutrinos', 560, 820, '#2d8a9a', 44]], lab: [['"GHOST PARTICLES"', 'c3:ghost', 1060, 135, WHITE, 32], ['NOBEL PRIZE IN PHYSICS', 'c3:nobel', 1300, 965, GOLD, 30]] },
    QB('c4q', [A('kid', 560, 580, 2.3, 'c4q+0.2', { shake: ['c4q:many', 0.6] }), nu(1060, 430, 1.6, 'c4q:many', { orbit: { c: [560, 520], r: 380, w: 1.6 } })]),
    { at: 'c5', cast: [A('fingerN', 520, 520, 2.6, 'c5:square', { hw: 44, hh: 80, pulse: ['c5:fingernail'] }), sunA(1500, 300, 2.2, 'c5:crossed'), A('stopwatch', 1500, 690, 1.8, 'c5:second')],
      fx: [['stream', 1, 0, 'c5:sixty|65', 'c5:over', { ...NUS, n: 12, arc: 30 }]], num: [['c5:sixty|65', 960, 870, '~65 BILLION', 'THROUGH 1 CM² OF YOU · EVERY SECOND']] },
    { at: 'c5:over', cast: [A('kid', 640, 590, 2.9, 'c5:over', { pulse: ['c5:hundred|100'] }), sunA(200, 260, 1.7, 'c5:over+0.2')],
      fx: [['stream', 1, [1100, 640], 'c5:over+0.3', 'c5>', { ...NUS, n: 14, arc: 20 }]], num: [['c5:hundred|100', 1400, 520, '~100 TRILLION', 'THROUGH YOUR WHOLE BODY · EVERY SECOND']] },
  ], 'g1'));
}
// ---------- 1 what is a ghost particle? ----------
function sGhost(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('g1', [nu(760, 540, 2.6, 'g1+0.2'), A('magnifier', 1160, 380, 1.7, 'g1:exactly', { mv: [['g1:neutrino', 1040, 470]] })]),
    { at: 'g2', cast: [A('galaxyI', 330, 470, 2.4, 'g2:universe', { hw: 72, hh: 50 }), nu(800, 520, 2.1, 'g2:common'), A('bolt', 800, 250, 1.6, 'g2:electric', { morph: ['g2:charge+0.2', 'cross'] }), A('balanceN', 1420, 520, 2.4, 'g2:light', { hw: 86, hh: 72, o: tt => ({ k: clamp((tt - T('g2:million')) / 1.0) }) }), A('electron', 1720, 250, 1.6, 'g2:electron')],
      lab: [['NO ELECTRIC CHARGE', 'g2:charge', 800, 780, WHITE, 30]], tag: [['>1,000,000× LIGHTER THAN AN ELECTRON', 'g2:million', 1150, 965, '#2d8a9a', 34]] },
    { at: 'g2b', cast: [A('bigbang', 330, 480, 2.4, 'g2b:big'), A('cube', 960, 500, 2.8, 'g2b:sugar', { hw: 52, hh: 58, o: tt => ({ n: 4 + 14 * clamp((tt - T('g2b:holds')) / 1.2) }), pulse: ['g2b:330|three'] }), A('photon', 1560, 420, 2.0, 'g2b:light', { pulse: ['g2b:common'] }), A('medal', 1560, 760, 1.6, 'g2b:more', { hw: 60, hh: 90 })],
      fx: [['stream', 0, 1, 'g2b:leftovers', 'g2b:holds', { ...NUS, n: 8 }]], lab: [['BIG BANG LEFTOVERS', 'g2b:big', 330, 780, GOLD, 30]], tag: [['~336 IN EVERY SUGAR CUBE OF SPACE', 'g2b:330|three', 960, 965, '#2d8a9a', 34]] },
    { at: 'g3', cast: [A('bolt', 300, 330, 1.7, 'g3:electricity', { grey: 'g3:touch' }), A('magnet', 300, 740, 1.7, 'g3:magnetism', { grey: 'g3:touch' }), nu(920, 520, 2.4, 'g3:because', { shake: ['g3:touch', 0.5] }), A('feather', 1520, 500, 2.0, 'g3:weak', { pulse: ['g3:never'] })],
      fx: [['zap', 0, 2, 'g3:electricity', 0.5, '#ffd98a'], ['zap', 1, 2, 'g3:magnetism', 0.5, '#ff8fb8'], ['burst', 2, 'g3:touch', '#8fd8e6']], lab: [['THEY CAN\'T TOUCH IT', 'g3:touch', 600, 965, WHITE, 30], ['WEAK FORCE · ALMOST NEVER ACTS', 'g3:weak', 1450, 820, GOLD, 30]] },
    { at: 'g3:slips', cast: [...[0, 1, 2, 3, 4, 5].map(i => A('atom', 420 + (i % 3) * 540, i < 3 ? 300 : 770, 1.6, 'g3:slips+' + (i * 0.08).toFixed(2), { hw: 76, hh: 76 })), nu(160, 535, 1.7, 'g3:slips', { mv: [['g3:there', 1760, 535]] })], zoom: 2 },
    QB('g4q', [A('leadwall', 640, 540, 2.2, 'g4q+0.2', { hw: 52, hh: 90 }), nu(1060, 520, 1.7, 'g4q:slip', { mv: [['g4q>', 940, 520]] })]),
    { at: 'g5', cast: [A('doctor', 260, 580, 2.1, 'g5:physicists'), A('leadwall', 960, 520, 3.0, 'g5:wall', { hw: 52, hh: 90 }), nu(520, 380, 1.8, 'g5:neutrino', { z: 2, mv: [['g5:cross', 760, 470], ['g5:still', 1180, 500, 30], ['g5:side', 1520, 400, 60]] }), A('check', 1680, 760, 1.6, 'g5:chance')],
      tag: [['A WALL OF LEAD 1 LIGHT-YEAR THICK', 'g5:light', 960, 965, '#5b4fd6', 34]] },
    { at: 'g6', cast: [sunA(220, 560, 1.9, 'g6:sun'), A('globeP', 720, 560, 3.0, 'g6:earth'), A('moon2', 720, 170, 1.6, 'g6:night'), A('bedN', 1230, 560, 1.9, 'g6:mattress', { hw: 92, hh: 50 }), A('kid', 1650, 590, 2.3, 'g6:you', { pulse: ['g6:you+0.3'] }),
      nu(220, 560, 1.6, 'g6:neutrinos', { z: 2, mv: [['g6:planet', 720, 540, 20], ['g6:mattress', 1230, 520, 30], ['g6:you', 1650, 500, 30], ['g6>', 1760, 260, 30]] })],
      fx: [['stream', 0, 4, 'g6:up', 'g6>', { ...NUS, n: 10, arc: 10 }]], lab: [['AT NIGHT: UP THROUGH THE PLANET', 'g6:night', 960, 965, GOLD, 30]] },
    { at: 'g6b', bg: rockBG, cast: [A('detectorJ', 430, 640, 2.4, 'g6b:detector', { hw: 72, hh: 80 }), A('news', 1080, 620, 2.2, 'g6b:picture', { hw: 62, hh: 54, pulse: ['g6b:sun'] }), sunA(1640, 160, 1.4, 'g6b:day', { hw: 70, hh: 70 }), A('moon2', 1640, 720, 1.6, 'g6b:night')],
      fx: [['stream', 2, 0, 'g6b:day', 'g6b>', { ...NUS, n: 8 }], ['stream', [1640, 1000], 0, 'g6b:night', 'g6b>', { ...NUS, n: 8 }]],
      tag: [['SUPER-KAMIOKANDE · JAPAN', 'g6b:japan', 430, 965, '#2d8a9a', 32]], lab: [['THE SUN, SEEN IN NEUTRINOS', 'g6b:picture', 1080, 840, GOLD, 28], ['THROUGH SOLID ROCK', 'g6b:rock', 1200, 965, WHITE, 28]] },
  ], 'h1'));
}
// ---------- 2 a particle nobody could catch ----------
function sHistory(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('h1', [A('magnifier', 700, 540, 2.2, 'h1+0.2', { mv: [['h1:something', 900, 500]] }), nu(1180, 500, 1.8, 'h1:something', { o: { faint: 1 } })]),
    { at: 'h2', cast: [A('doctor', 280, 580, 2.3, 'h2:someone'), A('bulb', 300, 230, 1.6, 'h2:imagine'), A('calDay', 680, 560, 1.8, 'h2:1930|nineteen', { o: { m: 'YEAR', d: '1930' } }), A('radio', 1080, 560, 2.2, 'h2:radioactive', { shake: ['h2:decay', 0.8] }),
      A('bolt', 1400, 300, 1.6, 'h2:energy', { o: tt => ({ fade: tt > T('h2:vanish') && tt < T('h2:carried') ? 0.75 : 0 }), mv: [['h2:carried+0.6', 1700, 470, 40]] }), nu(1400, 720, 1.8, 'h2:invisible', { o: { faint: 1 }, mv: [['h2:carried+0.6', 1640, 640, 40]] })],
      lab: [['WOLFGANG PAULI', 'h2:wolfgang', 480, 850, GOLD, 30], ['ENERGY GOES MISSING?', 'h2:vanish', 1240, 965, WHITE, 30]] },
    { at: 'h3', cast: [A('letter', 460, 520, 2.6, 'h3:called', { hw: 64, hh: 48 }), A('pillC', 900, 300, 1.6, 'h3:remedy'), nu(1260, 540, 2.2, 'h3:something', { o: { faint: 1 } }), A('magnifier', 1650, 380, 1.7, 'h3:detected', { mv: [['h3>', 1500, 440]] }), A('cross', 1660, 720, 1.6, 'h3:never')],
      tag: [['"A DESPERATE REMEDY"', 'h3:desperate', 620, 965, '#5b4fd6', 36]], lab: [['"IT CAN NEVER BE DETECTED"', 'h3:never', 1300, 965, WHITE, 28]] },
    QB('h4q', [A('letter', 700, 540, 2.2, 'h4q+0.2', { hw: 64, hh: 48 }), A('magnifier', 1140, 520, 1.7, 'h4q:right')]),
    { at: 'h5', cast: [A('calDay', 380, 520, 2.0, 'h5:1956|nineteen', { o: { m: 'YEAR', d: '1956' } }), A('doctor', 900, 580, 2.1, 'h5:clyde'), A('doctor', 1400, 580, 2.1, 'h5:frederick|rains', { o: { hair: '#7a5a3a' } })],
      lab: [['CLYDE COWAN', 'h5:clyde', 900, 870, GOLD, 28], ['FREDERICK REINES', 'h5:frederick|rains', 1400, 870, GOLD, 28]] },
    { at: 'h5:put', cast: [A('reactor', 400, 560, 2.4, 'h5:put+0.1', { hh: 110, pulse: ['h5:reactor'] }), A('tankI', 1700, 600, 2.2, 'h5:tanks', { hw: 72, hh: 62, mv: [['h5:next', 1250, 600, 40]], hit: ['h5:caught'] }), nu(1250, 330, 1.6, 'h5:few', { mv: [['h5:caught', 1250, 520, 40]], out: 'h5:caught+0.3' }), A('check', 1680, 300, 1.6, 'h5:caught')],
      fx: [['stream', 0, 1, 'h5:pours', 'h5>', { ...NUS, n: 14, arc: 50 }], ['burst', 1, 'h5:caught', '#8fd8e6']], lab: [['SOUTH CAROLINA', 'h5:south', 400, 965, WHITE, 28], ['A FEW WERE CAUGHT', 'h5:few', 1250, 965, GOLD, 30]] },
    { at: 'h6', cast: [A('tankI', 260, 600, 1.7, 'h6', { hw: 72, hh: 62 }), A('telegram', 300, 330, 1.9, 'h6:telegram', { hw: 72, hh: 50, mv: [['h6:reply', 1150, 330, 90]] }), A('doctor', 1500, 580, 2.3, 'h6:pauli', { hit: ['h6:reply'] }), A('hglass', 780, 640, 1.9, 'h6:everything', { pulse: ['h6:wait'] })],
      lab: [['"EVERYTHING COMES TO HIM WHO KNOWS HOW TO WAIT"', 'h6:everything', 960, 965, GOLD, 28]] },
    { at: 'h6:rains|reines', cast: [A('doctor', 480, 580, 2.3, 'h6:rains|reines'), A('medal', 960, 520, 2.6, 'h6:nobel', { hw: 60, hh: 90, hit: ['h6:prize'] }), A('calDay', 1440, 540, 2.0, 'h6:1995|nineteen', { o: { m: 'NOBEL', d: '1995' } })],
      lab: [['REINES · NOBEL PRIZE 1995', 'h6:nobel', 960, 965, GOLD, 30]] },
  ], 's1'));
}
// ---------- 3 messages from the Sun ----------
function walkFx(t, x, y, R, t0) {   // light bouncing from atom to atom inside the Sun
  if (t < t0) return; const r = rng(5); let px = x, py = y; ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, py);
  const n = Math.min(140, (t - t0) * 26) | 0; for (let i = 0; i < n; i++) { px += (r() - 0.5) * R * 0.32; py += (r() - 0.5) * R * 0.32; const dx = px - x, dy = py - y, d = Math.hypot(dx, dy); if (d > R * 0.88) { px = x + dx / d * R * 0.88; py = y + dy / d * R * 0.88; } ctx.lineTo(px, py); }
  ctx.stroke(); ctx.restore(); ctx.save(); ctx.translate(px, py); ctx.scale(0.8, 0.8); drawIcon('photon', t); ctx.restore();
}
function sSun(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('s1', [sunA(760, 540, 2.6, 's1+0.2'), nu(1180, 380, 1.6, 's1:many', { mv: [['s1>', 1300, 330]] })]),
    { at: 's2', cast: [sunA(440, 540, 3.4, 's2', { o: tt => ({ cut: tt > T('s2:core') }) }), A('proton', 960, 280, 1.6, 's2:hydrogen', { hw: 52, hh: 52, mv: [['s2:fuse', 1190, 470]], out: 's2:helium' }), A('proton', 960, 780, 1.6, 's2:nuclei', { hw: 52, hh: 52, mv: [['s2:fuse', 1210, 570]], out: 's2:helium' }),
      A('helium', 1200, 520, 1.7, 's2:helium', { hw: 66, hh: 66, hit: ['s2:helium'] }), nu(1200, 520, 1.6, 's2:spits', { mv: [['s2:neutrinos', 1680, 380, 50]] })],
      fx: [['stream', [500, 540], [1700, 700], 's2:neutrinos', 's2>', { ...NUS, n: 8, arc: 10 }]], lab: [['A GIANT FUSION REACTOR', 's2:fusion', 440, 965, GOLD, 30], ['HYDROGEN → HELIUM', 's2:hydrogen', 1300, 965, WHITE, 30]] },
    { at: 's2b', cast: [A('stopwatch', 260, 300, 1.7, 's2b:second'), A('weightT', 280, 720, 1.8, 's2b:4|million', { hw: 62, hh: 56, z: 3, mv: [['s2b:mass', 640, 560, 80]], erase: 's2b:energy' }), sunA(820, 520, 3.0, 's2b:sun'), A('bolt', 1260, 300, 1.6, 's2b:energy'), A('kid', 1620, 600, 2.3, 's2b:warm', { pulse: ['s2b:floods'] })],
      fx: [['stream', 2, 4, 's2b:floods', 's2b>', { ...NUS, n: 12, arc: 30 }]], tag: [['4 MILLION TONNES OF MASS → ENERGY, EVERY SECOND', 's2b:4|million', 960, 965, '#9b3352', 30]] },
    { at: 's3', cast: [sunA(600, 520, 3.7, 's3', { o: { cut: 1 } }), A('hglass', 1420, 330, 1.9, 's3:thousands'), A('calDay', 1420, 720, 1.8, 's3:hundreds', { o: { m: 'YEARS', d: '100K' }, pulse: ['s3:surface'] })],
      over: (tt, P, scr, zk) => { if (P[0] && !P[0].gone) walkFx(tt, P[0].x, P[0].y, 58 * 3.7 * zk, T('s3:bumps') - 0.3); },
      lab: [['LIGHT BUMPS FROM ATOM TO ATOM', 's3:bumps', 600, 965, WHITE, 28], ['1,000s–100,000s OF YEARS', 's3:thousands', 1420, 965, GOLD, 28]] },
    { at: 's4', cast: [sunA(380, 540, 3.0, 's4', { o: { cut: 1 } }), nu(380, 540, 1.8, 's4:just', { z: 2, mv: [['s4:out', 760, 520, 20], ['s4:two|2', 960, 520], ['s4:reach', 1500, 560, 40]] }), A('stopwatch', 960, 270, 1.6, 's4:two|2'), A('clock3', 1320, 270, 1.7, 's4:eight|8'), A('kid', 1680, 600, 2.3, 's4:you', { pulse: ['s4:reach+0.3'] })],
      lab: [['~2 SECONDS OUT OF THE CORE', 's4:two|2', 860, 965, NU, 30], ['+8 MINUTES TO YOU', 's4:eight|8', 1500, 965, GOLD, 30]] },
    QB('s5q', [sunA(700, 540, 2.4, 's5q+0.2', { o: { cut: 1 } }), A('news', 1150, 520, 1.8, 's5q:news', { hw: 62, hh: 54 })]),
    { at: 's6', cast: [A('kid', 380, 590, 2.6, 's6:face'), A('photon', 800, 300, 1.8, 's6:sunlight', { grey: 's6:ancient' }), nu(800, 720, 1.8, 's6:neutrinos', { mv: [['s6:through', 420, 560, 50], ['s6:tell', 1060, 740, 60]] }), sunA(1420, 520, 2.6, 's6:core', { o: { cut: 1 }, pulse: ['s6:core'] }), A('check', 1760, 250, 1.6, 's6:fusion')],
      lab: [['SUNLIGHT: ANCIENT', 's6:ancient', 800, 140, WHITE, 28], ['THE CORE, 8 MINUTES AGO', 's6:eight|8', 1420, 870, GOLD, 30], ['IT RUNS ON FUSION', 's6:fusion', 960, 990, WHITE, 28]] },
  ], 'm1'));
}
// ---------- 4 the case of the missing neutrinos ----------
function sMissing(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('m1', [sunA(700, 540, 2.2, 'm1+0.2'), A('chart', 1150, 540, 1.8, 'm1:theory', { o: { v: [0.9, 0.3], hi: 1 } })]),
    { at: 'm2', cast: [A('calDay', 260, 300, 1.7, 'm2:1960s|nineteen', { o: { m: 'DECADE', d: '1960s' } }), A('doctor', 260, 720, 2.0, 'm2:chemist'), A('tankI', 820, 520, 2.4, 'm2:tank', { hw: 72, hh: 62, o: tt => ({ lv: 0.1 + 0.8 * clamp((tt - T('m2:gallons')) / 1.8) }), mv: [['m2:underground', 1460, 720, 30]] }),
      A('drop', 820, 220, 1.8, 'm2:fluid|dry', { mv: [['m2:fluid+0.6', 820, 430]], out: 'm2:almost' }), A('mineH', 1460, 290, 2.1, 'm2:gold', { hw: 82, hh: 70 })],
      lab: [['RAY DAVIS', 'm2:ray', 560, 870, GOLD, 28]], tag: [['~100,000 GALLONS · NEARLY 1.5 MILES DOWN', 'm2:underground', 900, 980, '#5b4fd6', 30]] },
    { at: 'm3', cast: [nu(280, 520, 1.8, 'm3:solar', { mv: [['m3:chlorine', 620, 520, 60]], out: 'm3:argon+0.3' }), A('elemCl', 800, 520, 2.3, 'm3:chlorine', { hw: 58, hh: 58, hit: ['m3:argon'], morph: ['m3:argon', 'elemAr'] }),
      A('magnifier', 1220, 320, 1.7, 'm3:counted', { mv: [['m3:atom#1', 960, 400]] }), A('pie', 1500, 620, 2.2, 'm3:third', { hw: 62, hh: 62, o: { v: 0.333, col: NU } }), A('tankI', 300, 660, 1.8, 'm3:davis', { hw: 72, hh: 62 })],
      fx: [['stream', 4, 1, 'm3:flushed', 'm3:but', { col: '#c7b8ff', n: 8 }]],
      lab: [['CHLORINE → ARGON', 'm3:argon', 800, 830, WHITE, 28]], tag: [['ONLY ~1/3 OF WHAT THEORY PREDICTED', 'm3:third', 1100, 965, '#9b3352', 32]] },
    QB('m4q', [A('pie', 760, 540, 2.2, 'm4q+0.2', { hw: 62, hh: 62, o: { v: 0.333, col: NU } })]),
    { at: 'm5', cast: [nu(260, 290, 1.6, 'm5:three', { o: { col: NU } }), nu(260, 540, 1.6, 'm5:three+0.15', { o: { col: NU2 } }), nu(260, 790, 1.6, 'm5:types', { o: { col: NU3 } }), nu(760, 540, 2.6, 'm5:shape', { o: { cyc: 1 }, mv: [['m5:travel', 1000, 520, 40]] }),
      A('tankI', 1500, 600, 2.2, 'm5:detector', { hw: 72, hh: 62 }), A('eye', 1500, 280, 1.8, 'm5:see', { hw: 56, hh: 34 })],
      lab: [['3 TYPES · THEY SHAPE-SHIFT', 'm5:shape', 760, 965, NU, 30], ['SEES ONLY ONE TYPE', 'm5:one', 1500, 860, GOLD, 28]] },
    { at: 'm5:experiments', cast: [A('globeP', 400, 520, 2.4, 'm5:japan'), A('detectorJ', 880, 540, 2.2, 'm5:canada', { hw: 72, hh: 80 }), nu(880, 270, 1.4, 'm5:proved', { o: { cyc: 1 }, mv: [['m5:shape#1', 880, 400]], hw: 58 }), A('medal', 1450, 500, 2.4, 'm5:nobel', { hw: 60, hh: 90, hit: ['m5:2015'] })],
      lab: [['JAPAN + CANADA PROVED IT', 'm5:japan', 640, 965, WHITE, 30], ['NOBEL PRIZE 2015', 'm5:nobel', 1450, 870, GOLD, 30]] },
  ], 'b1'));
}
// ---------- 5 your body makes them too ----------
function sBody(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('b1', [A('galaxyI', 700, 540, 2.6, 'b1+0.2', { hw: 72, hh: 50 }), nu(1150, 520, 1.7, 'b1:space', { mv: [['b1>', 1050, 560]] })]),
    { at: 'b2', cast: [A('kid', 420, 590, 2.8, 'b2:you', { pulse: ['b2:make'] }), nu(420, 520, 1.5, 'b2:make', { mv: [['b2:too+0.3', 760, 280, 40]], hw: 56 }), A('elemK', 1000, 520, 2.2, 'b2:potassium', { hw: 58, hh: 58 }), A('banana', 1560, 520, 2.3, 'b2:bananas', { hw: 80, hh: 50, pulse: ['b2:same'] })],
      fx: [['zap', 2, 3, 'b2:same', 0.6, '#ffd98a']], lab: [['RADIOACTIVE POTASSIUM', 'b2:radioactive', 1000, 830, WHITE, 28], ['ALSO IN BANANAS', 'b2:bananas', 1560, 830, GOLD, 28]] },
    { at: 'b3', cast: [A('adult', 380, 590, 2.7, 'b3:adult', { pulse: ['b3:fire'] }), A('elemK', 820, 330, 1.8, 'b3:thousand', { hw: 58, hh: 58, shake: ['b3:decay', 1.0] }), nu(820, 330, 1.6, 'b3:ghost', { mv: [['b3:ghost+0.9', 1000, 700, 60]] }), A('calDay', 1500, 680, 1.8, 'b3:day', { o: { m: 'EVERY', d: 'DAY' } })],
      fx: [['stream', 0, [1850, 260], 'b3:fire', 'b3>', { ...NUS, n: 12 }]], lab: [['A FEW THOUSAND DECAYS EVERY SECOND', 'b3:thousand', 620, 965, WHITE, 28], ['ROUGH ESTIMATE', 'b3:rough', 1450, 400, WHITE, 26]], tag: [['A FEW HUNDRED MILLION A DAY', 'b3:hundred', 1450, 270, '#9b3352', 32]] },
    QB('b4q', [A('kid', 640, 580, 2.4, 'b4q+0.2', { shake: ['b4q:worried', 0.6] }), A('radio', 1100, 480, 1.7, 'b4q:worried')]),
    { at: 'b5', cast: [A('check', 300, 520, 2.0, 'b5:not'), A('banana', 720, 520, 2.1, 'b5:natural', { hw: 80, hh: 50 }), A('hglass', 1100, 520, 1.9, 'b5:always'), A('kid', 1500, 600, 2.4, 'b5:neutrinos'), nu(1500, 520, 1.5, 'b5:fly', { mv: [['b5:space', 1760, 200, 40]], hw: 56 })],
      tag: [['HARMLESS · NATURAL · ALWAYS THERE', 'b5:natural', 900, 965, '#3f8f6a', 34]] },
  ], 'x1'));
}
// ---------- 6 will one ever hit me? ----------
function sHit(t) {
  worldBG(t, 'indigo');
  streaksOn(t, 'x1', 24, 0.15, 0.35);
  beats(t, chainB([
    QB('x1', [A('kid', 640, 580, 2.4, 'x1+0.2'), nu(1180, 330, 1.6, 'x1:one', { mv: [['x1:hit', 840, 440, 40]] })]),
    { at: 'x2', cast: [A('dice', 300, 520, 2.0, 'x2:maybe'), A('doctor', 300, 220, 1.3, 'x2:physicists', { out: 'x2:single' }), A('atom', 1000, 520, 2.0, 'x2:single', { hw: 76, hh: 76, hit: ['x2:atom'] }), nu(620, 300, 1.7, 'x2:neutrino', { mv: [['x2:atom', 880, 470, 40]] }), A('kid', 1560, 590, 2.6, 'x2:body')],
      lab: [['ONE HIT IN A WHOLE LIFETIME?', 'x2:whole', 960, 965, GOLD, 30]] },
    { at: 'x2:somewhere', cast: [A('pie', 420, 480, 2.3, 'x2:ten', { hw: 62, hh: 62, o: { v: 0.1, col: NU } }), A('kid', 960, 590, 2.6, 'x2:somewhere'), A('pie', 1500, 480, 2.3, 'x2:four', { hw: 62, hh: 62, o: { v: 0.25, col: NU2 } })],
      lab: [['1 IN 10', 'x2:ten', 420, 760, NU, 34], ['1 IN 4', 'x2:four', 1500, 760, NU2, 34]] },
    { at: 'x3', cast: [A('stopwatch', 300, 520, 1.8, 'x3:second'), A('calDay', 720, 520, 1.9, 'x3:80|eighty', { o: { m: 'YEARS', d: '80' } }), A('atom', 1180, 520, 2.0, 'x3:maybe', { hw: 76, hh: 76, hit: ['x3:collision'] }), nu(1180, 230, 1.5, 'x3:one', { mv: [['x3:collision', 1180, 420]] }), A('ghost', 1620, 520, 2.0, 'x3:ghostly')],
      fx: [['stream', [120, 820], [1800, 820], 'x3:trillions', 'x3>', { ...NUS, n: 16, arc: 0 }]] },
    QB('x4q', [A('atom', 760, 540, 2.3, 'x4q+0.2', { hw: 76, hh: 76, hit: ['x4q:hit'] }), nu(1150, 330, 1.6, 'x4q:one', { mv: [['x4q:hit', 900, 460]] })]),
    { at: 'x5', cast: [A('kid', 380, 590, 2.6, 'x5:nothing'), A('check', 380, 210, 1.5, 'x5:notice'), nu(620, 300, 1.5, 'x5:nudge', { mv: [['x5:single', 860, 450, 40]] }), A('atom', 1000, 520, 2.0, 'x5:nudge', { hw: 76, hh: 76, hit: ['x5:single'], push: [['x5:single', 60, 0]] })],
      under: (tt, P, scr) => { const k = clamp((tt - T('x5:billions')) / 1.0); if (k <= 0) return; for (let i = 0; i < 80 * k; i++) { const r = rng(i * 7 + 3), x = 1300 + r() * 520, y = 200 + r() * 620; circ(x + Math.sin(tt + i) * 4, y + Math.cos(tt * 1.2 + i) * 4, 7 + r() * 5, i % 4 ? 'rgba(255,143,74,0.75)' : 'rgba(143,216,230,0.8)'); } },
      lab: [['ONE ATOM NUDGED', 'x5:nudge', 1000, 780, GOLD, 30], ['AMONG BILLIONS OF BILLIONS', 'x5:billions', 1300, 965, WHITE, 28]] },
  ], 'd1'));
}
// ---------- 7 how to catch a ghost ----------
function sCatch(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('d1', [A('netN', 700, 540, 2.4, 'd1+0.2', { hw: 80 }), nu(1150, 470, 1.7, 'd1:catch', { mv: [['d1>', 1250, 380]] })]),
    { at: 'd2', cast: [A('netN', 380, 520, 2.3, 'd2:trap', { hw: 80, pulse: ['d2:enormous'] }), A('atom', 1450, 300, 1.6, 'd2:never', { hw: 76, hh: 76 }), nu(760, 260, 1.6, 'd2:neutrino', { mv: [['d2:anything', 1720, 420, 120]] }), A('tankI', 960, 620, 2.6, 'd2:huge', { hw: 72, hh: 62 }), A('eye', 1560, 560, 2.2, 'd2:watch', { hw: 56, hh: 34 })],
      lab: [['A HUGE TARGET', 'd2:huge', 960, 965, GOLD, 30], ['WATCH CAREFULLY', 'd2:watch', 1560, 760, WHITE, 28]] },
    { at: 'd3', bg: rockBG, cast: [A('detectorJ', 720, 610, 3.2, 'd3:super', { hw: 72, hh: 80, o: tt => ({ k: 0.15 + 0.85 * clamp((tt - T('d3:11|eleven')) / 1.2) }) }), A('drop', 1460, 360, 1.9, 'd3:water'), A('dom', 1460, 720, 1.6, 'd3:sensors', { hw: 54, hh: 60 })],
      tag: [['SUPER-KAMIOKANDE · JAPAN', 'd3:super', 720, 120, '#2d8a9a', 34]], lab: [['1 KM UNDERGROUND', 'd3:kilometer|kilometre', 720, 1000, WHITE, 28], ['50,000 TONNES OF PURE WATER', 'd3:50|fifty', 1460, 540, WHITE, 26], ['~11,000 LIGHT SENSORS', 'd3:11|eleven', 1460, 880, GOLD, 26]] },
    { at: 'd4', cast: [A('detectorJ', 900, 560, 3.4, 'd4', { hw: 72, hh: 80, o: tt => ({ ring: tt > T('d4:ring') - 0.6 ? (tt - T('d4:ring') + 0.6) / 2.2 : 0 }), pulse: ['d4:flash'] }),
      nu(260, 220, 1.7, 'd4:neutrino', { mv: [['d4:hits', 820, 520, 40]], out: 'd4:knocks' }), A('electron', 860, 560, 1.4, 'd4:knocks', { hw: 54, hh: 54, mv: [['d4:races', 1040, 640]] }), A('photon', 1560, 300, 1.7, 'd4:light', { pulse: ['d4:faster'] })],
      fx: [['burst', 0, 'd4:hits', '#8fd8e6'], ['burst', 0, 'd4:flash', '#6fd0ff']], lab: [['FASTER THAN LIGHT MOVES IN WATER', 'd4:faster', 1500, 470, WHITE, 26]], tag: [['A FAINT RING OF BLUE LIGHT', 'd4:ring', 900, 965, '#2d6fb0', 34]] },
    { at: 'd4b', cast: [A('detectorJ', 380, 560, 2.4, 'd4b', { hw: 72, hh: 80 }), nu(840, 520, 2.2, 'd4b:shape', { o: { cyc: 1 } }), A('doctor', 1260, 580, 2.2, 'd4b:leader'), A('medal', 1640, 520, 2.2, 'd4b:nobel|2015', { hw: 60, hh: 90 })],
      lab: [['CAUGHT SHAPE-SHIFTING', 'd4b:shape', 840, 800, NU, 28], ['TAKAAKI KAJITA · NOBEL 2015', 'd4b:takaki|kajita', 1420, 965, GOLD, 30]] },
    QB('d5q', [A('collider', 700, 540, 2.3, 'd5q+0.2', { hw: 70, hh: 46 }), nu(1150, 520, 1.6, 'd5q:neutrinos')]),
    { at: 'd6', bg: crustBG, cast: [A('city', 334, 560, 2.0, 'd6:chicago', { hw: 78, hh: 62 }), A('mineH', 1586, 560, 2.0, 'd6:dakota', { hw: 82, hh: 62 }), nu(334, 800, 1.6, 'd6:beam', { mv: [['d6:dakota+0.6', 1586, 800]] }), A('shovel', 960, 380, 1.8, 'd6:tunnel', { morph: ['d6:needed', 'cross'] })],
      fx: [['stream', [334, 800], [1586, 800], 'd6:straight', 'd6>', { ...NUS, n: 10, arc: 0 }]], tag: [['DUNE · ~1,300 KM', 'd6:called|dune|june', 960, 140, '#2d8a9a', 40]], lab: [['STRAIGHT THROUGH THE EARTH', 'd6:straight', 960, 965, GOLD, 30]] },
    { at: 'd7', cast: [A('mineH', 400, 320, 2.1, 'd7:deep', { hw: 82, hh: 70, pulse: ['d7:mine'] }), A('tankI', 400, 760, 2.0, 'd7:detectors', { hw: 72, hh: 62, hit: ['d7:sit'] }), nu(1000, 300, 1.6, 'd7:waiting', { mv: [['d7:sit', 560, 700, 60]], out: 'd7:sit+0.3' }), A('doctor', 1060, 580, 2.2, 'd7:ray'), A('elemAr', 1560, 520, 2.1, 'd7:argon', { hw: 58, hh: 58, pulse: ['d7:atoms'] })],
      lab: [['THE SAME MINE AS RAY DAVIS', 'd7:same', 1060, 965, GOLD, 30]] },
  ], 'i1'));
}
// ---------- 8 a telescope made of ice ----------
function sIce(t) {
  if (t < S('i3') - 0.1) iceBG(t, t < S('i2b') - 0.2 ? clamp((t - T('i2:drilled')) / 2.5) : 1, clamp((t - T('i2:cubic')) / 0.6) * (t < S('i2b') - 0.2 ? 1 : 0));
  else worldBG(t, 'night');
  beats(t, chainB([
    QB('i1', [A('medal', 700, 540, 2.4, 'i1+0.2', { hw: 60, hh: 90 }), A('snow', 1150, 520, 1.8, 'i1:year')]),
    { at: 'i2', cast: [A('drill', 300, 225, 1.6, 'i2:drilled', { hw: 66, hh: 60 }), A('iceLab', 960, 225, 1.6, 'i2:ice', { hw: 80, hh: 66 }), A('dom', 1740, 420, 1.6, 'i2:lowered', { hw: 54, hh: 60, mv: [['i2:sensors', 1740, 760]] })],
      tag: [['ICECUBE · SOUTH POLE', 'i2:ice', 960, 60, '#2d6fb0', 32]], lab: [['HOLES UP TO 2.5 KM DEEP', 'i2:deep', 1500, 200, '#102348', 26], ['5,000+ SENSORS IN 1 KM³ OF ICE', 'i2:5|five', 960, 1030, WHITE, 28]] },
    { at: 'i2b', cast: [nu(1700, 120, 1.6, 'i2b:neutrino', { mv: [['i2b:smashes', 960, 620, 30]], out: 'i2b:smashes+0.3' }), A('dom', 1740, 640, 1.6, 'i2b:sensors', { hw: 54, hh: 60, pulse: ['i2b:flash'] }), A('magnifier', 260, 200, 1.6, 'i2b:direction')],
      under: (tt) => { const t0 = T('i2b:smashes'); if (tt < t0) return; const k = clamp((tt - t0) / 1.4), a = 1 - clamp((tt - t0 - 2.8) / 1.0); ga(a, () => { ctx.fillStyle = 'rgba(111,208,255,0.6)'; ctx.beginPath(); ctx.ellipse(960, 640, 300 * k + 1, 130 * k + 1, 0, 0, 6.283); ctx.ellipse(960, 640, Math.max(1, 300 * k - 22), Math.max(1, 130 * k - 14), 0, 0, 6.283); ctx.fill('evenodd'); }); },
      over: (tt) => { const t0 = T('i2b:direction'); if (tt < t0) return; const k = eoc((tt - t0) / 0.8); ctx.save(); ctx.strokeStyle = 'rgba(255,217,138,0.9)'; ctx.lineWidth = 6; ctx.setLineDash([22, 16]); ctx.lineDashOffset = -tt * 60; ctx.beginPath(); ctx.moveTo(960, 620); ctx.lineTo(lerp(960, 1640, k), lerp(620, 120, k)); ctx.stroke(); ctx.restore(); },
      lab: [['THE SAME FAINT BLUE FLASH', 'i2b:flash', 960, 1030, WHITE, 28], ['WHICH WAY IT CAME FROM', 'i2b:direction', 640, 200, '#102348', 26]] },
    { at: 'i3', cast: [A('medal', 380, 520, 2.6, 'i3:nobel', { hw: 60, hh: 90, hit: ['i3:physics'] }), A('doctor', 860, 580, 2.3, 'i3:francis'), A('iceLab', 1340, 330, 1.7, 'i3:led', { hw: 80, hh: 66 }), A('calDay', 1560, 690, 1.8, 'i3:december', { o: { m: 'DEC', d: '10' } })],
      fx: [['stream', [1840, 80], 2, 'i3:neutrinos', 'i3:receives', { ...NUS, n: 8 }]], tag: [['NOBEL PRIZE IN PHYSICS 2026', 'i3:2026|nobel', 700, 110, '#c8553d', 36]], lab: [['FRANCIS HALZEN', 'i3:francis', 860, 860, GOLD, 34], ['STOCKHOLM', 'i3:stockholm', 1560, 880, WHITE, 28]] },
    QB('i4q', [A('iceLab', 700, 540, 2.2, 'i4q+0.2', { hw: 80, hh: 66 }), A('magnifier', 1150, 500, 1.7, 'i4q:find')]),
    { at: 'i5', cast: [A('calDay', 260, 290, 1.6, 'i5:2017|twenty', { o: { m: 'YEAR', d: '2017' } }), A('bhJet', 640, 560, 3.0, 'i5:blazar|blazer', { hw: 70, hh: 80 }), nu(1500, 420, 1.7, 'i5:neutrino', { mv: [['i5:traced', 1100, 500, 40]] }), A('globeP', 1620, 640, 1.9, 'i5:us', { pulse: ['i5:us'] })],
      fx: [['stream', 1, 3, 'i5:jet', 'i5:2023|and', { ...NUS, n: 9, arc: 30 }]], tag: [['BLAZAR · A BLACK HOLE\'S JET', 'i5:blazar|blazer', 640, 965, '#5b4fd6', 32]], lab: [['~4 BILLION LIGHT-YEARS', 'i5:4|four', 1400, 965, GOLD, 30]] },
    { at: 'i5:and', cast: [A('galaxyI', 760, 520, 3.4, 'i5:2023', { hw: 72, hh: 50, o: { nu: 1 }, zoom: 1 }), A('calDay', 1500, 300, 1.7, 'i5:2023', { o: { m: 'YEAR', d: '2023' } }), A('iceLab', 1500, 700, 1.8, 'i5:ice|made', { hw: 80, hh: 66 })], zoom: 3,
      tag: [['FIRST PICTURE OF OUR GALAXY IN NEUTRINOS', 'i5:picture', 960, 965, '#2d8a9a', 32]] },
  ], 'e1'));
}
// ---------- 9 early warning from dying stars ----------
function sSupernova(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('e1', [A('starBig', 700, 540, 2.6, 'e1+0.2'), A('alarmC', 1150, 500, 1.8, 'e1:warn', { shake: ['e1:warn', 1.0] })]),
    { at: 'e2', cast: [A('starBig', 520, 540, 3.2, 'e2:star', { o: tt => ({ b: tt < T('e2:collapses') ? 0 : tt < T('e2:explodes') ? clamp((tt - T('e2:collapses')) / (T('e2:explodes') - T('e2:collapses'))) : 1 + (tt - T('e2:explodes')) * 0.5 }) }),
      nu(820, 330, 1.7, 'e2:energy', { mv: [['e2:escape', 820, 330], ['e2:light', 1500, 330, 30]] }), A('photon', 820, 760, 1.7, 'e2:explodes+0.3', { mv: [['e2:light', 820, 760], ['e2>', 1050, 760]] })],
      fx: [['stream', 0, [1850, 520], 'e2:pours', 'e2>', { ...NUS, n: 14, arc: 10 }], ['burst', 0, 'e2:explodes', '#ffd98a']], tag: [['SUPERNOVA', 'e2:supernova', 520, 140, '#9b3352', 40]], lab: [['NEUTRINOS ESCAPE BEFORE THE LIGHT', 'e2:escape', 1100, 965, GOLD, 30]] },
    { at: 'e3', cast: [A('calDay', 260, 300, 1.6, 'e3:1987|nineteen', { o: { m: 'YEAR', d: '1987' } }), A('galaxyI', 260, 700, 2.0, 'e3:galaxy', { hw: 72, hh: 50, o: { sn: 1 } }),
      ...[0, 1, 2].map(i => A('tankI', 820 + i * 400, 560, 1.7, 'e3:three+' + (i * 0.15).toFixed(2), { hw: 72, hh: 62, hit: ['e3:caught+' + (i * 0.2).toFixed(2)] }))],
      fx: [['stream', 1, 2, 'e3:caught', 'e3:hours', { ...NUS, n: 7 }], ['stream', 1, 3, 'e3:caught+0.2', 'e3:hours', { ...NUS, n: 7 }], ['stream', 1, 4, 'e3:caught+0.4', 'e3:hours', { ...NUS, n: 7 }]],
      lab: [['KAMIOKANDE-II · IMB · BAKSAN', 'e3:detectors', 1220, 330, WHITE, 26], ['25 NEUTRINOS IN ~13 SECONDS', 'e3:25|twenty', 1220, 800, GOLD, 30]], tag: [['HOURS BEFORE THE FLASH OF LIGHT', 'e3:hours', 1100, 965, '#9b3352', 32]] },
    { at: 'e4', cast: [A('globe', 380, 520, 2.4, 'e4:linked', { hw: 66, hh: 66 }), A('alarmC', 820, 290, 1.7, 'e4:alert', { shake: ['e4:alert', 1.0] }), A('starBig', 900, 720, 1.8, 'e4:star', { o: tt => ({ b: tt < T('e4:explodes') ? 0 : 1 + (tt - T('e4:explodes')) * 0.5 }) }), A('scopeI', 1520, 520, 2.4, 'e4:telescopes', { hw: 50, hh: 84 })],
      fx: [['stream', 2, 0, 'e4:neutrinos', 'e4>', { ...NUS, n: 8 }], ['zap', 0, 3, 'e4:point', 0.7, '#ffd98a']], tag: [['SUPERNOVA EARLY WARNING', 'e4:alert', 960, 110, '#2d8a9a', 36]], lab: [['"POINT YOUR TELESCOPES HERE"', 'e4:point', 1300, 965, GOLD, 28]] },
    { at: 'e4b', cast: [A('hglass', 300, 520, 2.0, 'e4b:wait'), A('galaxyI', 760, 520, 2.6, 'e4b:galaxy', { hw: 72, hh: 50, o: { sn: 1 } }), A('calDay', 1230, 520, 1.9, 'e4b:once', { o: { m: 'PER CENTURY', d: '1–2' } }), A('calDay', 1640, 520, 1.9, 'e4b:last', { o: { m: 'LAST SEEN', d: '1604' } })],
      lab: [['1–2 PER CENTURY IN OUR GALAXY', 'e4b:once', 1000, 830, WHITE, 28], ['MORE THAN 400 YEARS AGO', 'e4b:400|four', 1500, 965, GOLD, 28]] },
    QB('e5q', [nu(720, 540, 2.6, 'e5q+0.2', { glow: 'rgba(255,217,138,0.5)' }), A('bolt', 1150, 500, 1.7, 'e5q:powerful')]),
    { at: 'e6', cast: [A('calDay', 260, 300, 1.6, 'e6:2025|twenty', { o: { m: 'YEAR', d: '2025' } }), A('seaDet', 900, 560, 3.0, 'e6:detector', { hw: 82, hh: 70 }), nu(1200, 150, 1.6, 'e6:neutrino', { mv: [['e6:caught', 960, 560, 30]], out: 'e6:caught+0.4' }), A('doctor', 1560, 640, 2.1, 'e6:scientists'), A('news', 1560, 290, 1.7, 'e6:announced', { hw: 62, hh: 54 })],
      fx: [['burst', 1, 'e6:caught', '#ffd98a']], lab: [['DEEP IN THE MEDITERRANEAN SEA', 'e6:mediterranean', 900, 965, WHITE, 30]] },
    { at: 'e6:carried', cast: [nu(460, 460, 3.0, 'e6:carried', { glow: 'rgba(255,217,138,0.6)' }), A('collider', 1360, 480, 2.4, 'e6:collisions', { hw: 70, hh: 46 }), A('bolt', 900, 300, 1.6, 'e6:thousands', { mv: [['e6:biggest', 1150, 380]] })],
      num: [['e6:220|two', 460, 820, '~220 PeV', 'PETA-ELECTRONVOLTS']], lab: [['THOUSANDS OF TIMES THE BIGGEST COLLIDER', 'e6:thousands', 1300, 800, GOLD, 26]] },
    { at: 'e6:where', cast: [A('magnifier', 600, 520, 2.0, 'e6:where', { mv: [['e6:mystery', 760, 500]] }), nu(960, 520, 2.2, 'e6:came', { o: { cyc: 1 } }), A('question', 1360, 500, 2.0, 'e6:mystery', { pulse: ['e6:mystery+0.3'] })],
      lab: [['ORIGIN: STILL A MYSTERY', 'e6:mystery', 960, 965, GOLD, 32]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  streaksOn(t, 'o1', 34, 0.15, 0.45);
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [A('kid', 700, 580, 2.6, 'o1+0.2'), nu(1150, 360, 1.6, 'o1:passing', { mv: [['o1:me', 760, 480, 40], ['o1>', 300, 380, 40]] })]),
    { at: 'o2', cast: [sunA(300, 300, 1.9, 'o2:sun|core'), A('elemK', 300, 760, 1.8, 'o2:potassium', { hw: 58, hh: 58 }), A('kid', 960, 600, 2.8, 'o2', { pulse: ['o2:all'] }), A('bhJet', 1600, 330, 2.0, 'o2:black', { hw: 70, hh: 80 }), A('galaxyI', 1600, 760, 1.8, 'o2:billions', { hw: 72, hh: 50 })],
      fx: [['stream', 0, 2, 'o2:core', 'o2>', { ...NUS, n: 8 }], ['stream', 1, 2, 'o2:potassium', 'o2>', { ...NUS, n: 6, o: { col: NU2 } }], ['stream', 3, 2, 'o2:messenger', 'o2>', { ...NUS, n: 6 }]],
      lab: [['ALL OF IT, STRAIGHT THROUGH YOU', 'o2:all', 960, 140, GOLD, 30]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [A('kid', 460, 640, 2.8, 'o3'), nu(260, 330, 1.6, 'o3', { mv: [['o3:passed', 700, 360, 40], ['o3:keep', 260, 330, 40], ['o3:rest', 700, 360, 40]] })], { id: 'outro', zoom: 0 });
  outroTitle(t, '100 TRILLION GHOST PARTICLES', 'JUST PASSED THROUGH YOU', 1330, 48, 60);
}
const CHAPTERS = [['g1', 'What is a ghost particle?', 'indigo', 'nu'], ['h1', 'A particle nobody could catch', 'grey', 'letter'], ['s1', 'Messages from the Sun', 'night', 'sunN'], ['m1', 'The case of the missing neutrinos', 'grey', 'flavors'], ['b1', 'Your body makes them too', 'coral', 'banana'],
  ['x1', 'Will one ever hit me?', 'indigo', 'dice'], ['d1', 'How to catch a ghost', 'night', 'detectorJ'], ['i1', 'A telescope made of ice', 'night', 'dom'], ['e1', 'Early warning from dying stars', 'night', 'starBig']];
function SECTIONS() { return makeSections(CHAPTERS, { g1: [sGhost, 'g2'], h1: [sHistory, 'h2'], s1: [sSun, 's2'], m1: [sMissing, 'm2'], b1: [sBody, 'b2'], x1: [sHit, 'x2'], d1: [sCatch, 'd2'], i1: [sIce, 'i2'], e1: [sSupernova, 'e2'] }, sOpen, sOutro); }
