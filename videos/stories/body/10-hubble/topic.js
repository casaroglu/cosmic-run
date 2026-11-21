// "Hubble is falling. Can anyone save it?" — topic file (engine + common.js cast system + icons2.js)
// Reworked 2026-11-21 in the "interacting icons" style: every phrase gets a picture, and the pictures act on each other.
function hubble(t, x, y, s, o = {}) {   // our own flat Hubble: silver tube, aperture door, two solar wings, a docking ring at the back
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot ?? -0.15) + Math.sin(t * 0.5) * 0.03); ctx.scale(s, s);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(-20, sd * 70); rr2(-6, sd > 0 ? 0 : -60, 12, 60, 4, '#9aa6c4'); ctx.translate(0, sd * 60); rr2(-110, sd > 0 ? 0 : -44, 220, 44, 6, '#2f5fb5'); for (let i = 0; i < 6; i++) rr2(-104 + i * 36, sd > 0 ? 4 : -40, 30, 36, 3, '#3f74d0'); ctx.restore(); }
  rr2(-200, -58, 400, 116, 40, '#d9dde6'); rr2(-200, -58, 400, 40, 30, '#eef1f6'); for (let i = 0; i < 4; i++) rr2(-150 + i * 80, -58, 6, 116, 3, 'rgba(120,130,150,0.35)'); rr2(-260, -48, 70, 96, 20, '#b8bfcc');
  const door = 0.4 + 0.25 * Math.sin(t * 0.8); ctx.save(); ctx.translate(200, -58); ctx.rotate(-door); rr2(0, -6, 110, 14, 7, '#c9ced9'); ctx.restore(); circ(200, 0, 46, '#20232f'); circ(200, 0, 24, '#3a4a6a'); circ(194, -8, 6, 'rgba(255,255,255,0.6)');
  if (o.ring) { const p = 0.6 + 0.4 * Math.sin(t * 4); ctx.save(); ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 20 * p; ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(-262, 0, 14, 52, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  rr2(-150, -50, 120, 12, 6, 'rgba(255,255,255,0.6)'); glint(t, 200, 60, 3); ctx.restore();
}
function earthLimb(t, cy, R, glow = 0) {   // a big curved Earth at the bottom with a thin atmosphere glow
  const g = ctx.createRadialGradient(960, cy, R * 0.9, 960, cy, R + 60 + glow * 50); g.addColorStop(0, 'rgba(120,200,255,0.0)'); g.addColorStop(0.9, `rgba(120,200,255,${0.25 + glow * 0.35})`); g.addColorStop(1, 'rgba(120,200,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(960, cy, R + 60 + glow * 50, 0, 6.283); ctx.fill();
  const e = ctx.createLinearGradient(0, cy - R, 0, cy - R + 300); e.addColorStop(0, '#4f9be0'); e.addColorStop(1, '#1e4f96'); ctx.fillStyle = e; ctx.beginPath(); ctx.arc(960, cy, R, 0, 6.283); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(960, cy, R, 0, 6.283); ctx.clip(); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#5fbf6a'; ctx.beginPath(); ctx.ellipse(((i * 420 + t * 12) % 2600) - 340, cy - R + 60 + (i % 3) * 50, 140, 40, 0, 0, 6.283); ctx.fill(); } for (let i = 0; i < 5; i++) rr2(((i * 530 + t * 20) % 2600) - 300, cy - R + 30 + (i % 2) * 70, 220, 24, 12, 'rgba(255,255,255,0.5)'); ctx.restore();
}
const earthBG = (glow = 0.2, cy = 1900, R = 1100) => t => { earthLimb(t, cy, R, typeof glow === 'function' ? glow(t) : glow); reg('panel', 'earth', 0, cy - R, W, 1080); };
const flameP = (t, x, y, len = 40, w = 16) => { const f = Math.sin(t * 22) * 6; poly([[x - w, y], [x, y + len + f], [x + w, y]], '#ffb35c'); poly([[x - w * 0.5, y], [x, y + len * 0.6 + f / 2], [x + w * 0.5, y]], '#fff1b8'); };
Object.assign(ICONS, {
  hubbleI(t) { hubble(t, 0, 0, 0.32, {}); },
  hubbleT(t, o) {   // Hubble as a cast actor; o.ring shows the docking ring, o.glow a hot re-entry aura
    if (o.glow) { const rg = ctx.createRadialGradient(0, 0, 20, 0, 0, 120); rg.addColorStop(0, 'rgba(255,160,80,0.55)'); rg.addColorStop(1, 'rgba(255,120,60,0)'); ctx.fillStyle = rg; ctx.fillRect(-120, -120, 240, 240); }
    hubble(t, 0, 0, 0.32, o); },
  sunI(t) { ctx.save(); ctx.rotate(t * 0.3); ctx.fillStyle = '#ffd98a'; for (let i = 0; i < 12; i++) { ctx.rotate(6.283 / 12); rr2(-6, -78 - Math.sin(t * 4 + i) * 8, 12, 24, 6, '#ffb35c'); } ctx.restore(); circ(0, 0, 56, '#ffcf5a'); circ(-14, -14, 16, '#fff0b8'); },
  shuttle(t) { ctx.save(); ctx.rotate(-0.2); ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.moveTo(90, 0); ctx.quadraticCurveTo(70, -20, 0, -22); ctx.lineTo(-80, -22); ctx.lineTo(-80, 22); ctx.lineTo(0, 22); ctx.quadraticCurveTo(70, 20, 90, 0); ctx.fill(); ctx.fillStyle = '#d9dde6'; ctx.beginPath(); ctx.moveTo(-20, 22); ctx.lineTo(-80, 60); ctx.lineTo(-80, 22); ctx.fill(); rr2(-90, -40, 20, 80, 6, '#3a3f5a'); rr2(40, -14, 24, 10, 5, '#20232f'); for (let i = 0; i < 3; i++) { const p = (t * 2 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(-100 - p * 60, (i - 1) * 14, 10 + p * 10, '#ffb35c'); ctx.restore(); } ctx.restore(); },
  shuttleB(t, o) {   // shuttle with open cargo bay doors and a robotic arm; o.arm 0..1 raises the arm, o.bay opens the doors
    const bay = o.bay ? 1 : 0.15, arm = o.arm ?? 0.3;
    ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.moveTo(96, 10); ctx.quadraticCurveTo(80, -24, 20, -26); ctx.lineTo(-84, -26); ctx.lineTo(-84, 30); ctx.lineTo(20, 30); ctx.quadraticCurveTo(80, 30, 96, 10); ctx.fill();
    poly([[-30, 30], [-84, 62], [-84, 30]], '#d9dde6'); rr2(-96, -40, 22, 70, 6, '#3a3f5a'); rr2(58, -14, 20, 10, 5, '#20232f'); rr2(-70, -22, 120, 14, 6, '#3a3f5a');
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd < 0 ? -70 : 50, -26); ctx.rotate(sd * -bay * 0.9); rr2(sd < 0 ? 0 : -60, -8, 60, 10, 4, '#e8edf5'); ctx.restore(); }
    ctx.save(); ctx.translate(-50, -24); ctx.rotate(-0.4 - arm * 0.9 + Math.sin(t * 1.6) * 0.06); rr2(-5, -60, 10, 62, 5, '#c9ced9'); ctx.translate(0, -58); ctx.rotate(1.2 - arm * 0.5 + Math.sin(t * 2.1) * 0.08); rr2(-4, -46, 8, 48, 4, '#c9ced9'); circ(0, -48, 8, '#ffd98a'); ctx.restore();
    for (let i = 0; i < 3; i++) { const p = (t * 2 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.8; circ(-106 - p * 40, (i - 1) * 12, 8 + p * 8, '#ffb35c'); ctx.restore(); } },
  glasses(t) { for (const sd of [-1, 1]) { circ(sd * 46, 0, 38, '#3a3f5a'); circ(sd * 46, 0, 30, 'rgba(200,235,255,0.6)'); rr2(sd * 46 - 20, -16, 16, 6, 3, 'rgba(255,255,255,0.8)'); } rr2(-10, -6, 20, 8, 4, '#3a3f5a'); },
  galaxies(t) { for (let i = 0; i < 22; i++) { const r = rng(i * 11 + 3); const x = (r() - 0.5) * 160, y = (r() - 0.5) * 120, s = 4 + r() * 12; ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 3 + t * 0.2); ctx.fillStyle = ['#ffd98a', '#8fd8e6', '#ff8fd8', '#ffffff'][i % 4]; ctx.globalAlpha *= 0.6 + 0.4 * Math.sin(t * 2 + i); ctx.beginPath(); ctx.ellipse(0, 0, s, s * 0.45, 0, 0, 6.283); ctx.fill(); ctx.restore(); } },
  swift(t) { rr2(-60, -40, 120, 80, 14, '#d9dde6'); rr2(-60, -40, 120, 24, 12, '#eef1f6'); circ(66, 0, 22, '#20232f'); for (const sd of [-1, 1]) rr2(-50, sd > 0 ? 44 : -84, 100, 40, 6, '#2f5fb5'); },
  rescuer(t) { rr2(-40, -30, 80, 60, 14, '#c9ced9'); for (const sd of [-1, 1]) rr2(-30, sd > 0 ? 34 : -64, 60, 30, 5, '#d9a066'); ctx.save(); ctx.translate(44, 0); ctx.rotate(Math.sin(t * 2) * 0.3); rr2(0, -5, 50, 10, 5, '#9aa6c4'); circ(52, 0, 9, '#ffd98a'); ctx.restore(); const p = (t * 2) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(-50 - p * 30, 0, 8 + p * 8, '#8fd8e6'); ctx.restore(); },
  bus(t) { const b = Math.abs(Math.sin(t * 5)) * 3; ctx.save(); ctx.translate(0, -b); rr2(-110, -50, 220, 90, 18, '#ffd36b'); for (let i = 0; i < 4; i++) rr2(-96 + i * 50, -38, 40, 30, 6, '#8fd8e6'); rr2(-100, 4, 200, 8, 4, '#e0a92a'); ctx.restore(); for (const wx of [-66, 66]) wheel(t, wx, 44, 18); puff(t, -118, 30, 3, 0, 'rgba(255,255,255,0.45)', 8); },
  calendarH(t, o) { rr2(-50, -48, 100, 100, 14, '#f3f7fb'); rr2(-50, -48, 100, 30, 12, '#e2457a'); font(16, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.head || 'YEAR', 0, -33); font(34, 700); ctx.fillStyle = '#102348'; ctx.fillText(o.text || '2033', 0, 16); },
  ring(t) { const p = 0.6 + 0.4 * Math.sin(t * 4); ctx.save(); ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 20 * p; ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 14; ctx.beginPath(); ctx.ellipse(0, 0, 40, 70, 0, 0, 6.283); ctx.stroke(); ctx.restore(); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * 2.094); circ(0, -70, 8, '#e2457a'); ctx.restore(); } },
  fireball(t) { for (let i = 0; i < 4; i++) { const p = (t * 1.5 + i / 4) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(-p * 60, p * 34, 24 + p * 18, ['#ff6f3c', '#ff9a3c', '#ffd98a', '#ffffff'][i]); ctx.restore(); } circ(10, -6, 26, '#ffffff'); circ(10, -6, 18, '#d9dde6'); },
  skylab(t) { ctx.save(); ctx.rotate(Math.sin(t) * 0.1); rr2(-80, -26, 160, 52, 20, '#d9dde6'); rr2(-20, -80, 40, 54, 6, '#2f5fb5'); rr2(-20, 26, 40, 54, 6, '#2f5fb5'); rr2(-60, -18, 60, 10, 5, 'rgba(255,255,255,0.6)'); ctx.restore(); },
  webb(t) { for (let r = -1; r <= 1; r++) for (let c = -1; c <= 1; c++) { if (Math.abs(r) + Math.abs(c) > 1 && Math.abs(r) === 1 && Math.abs(c) === 1 && (r + c) % 2) continue; const x = c * 34 + (r % 2 ? 17 : 0), y = r * 30; ctx.fillStyle = `rgb(${220 + 20 * Math.sin(t * 2 + r + c) | 0},170,60)`; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + 0.52; ctx.lineTo(x + Math.cos(a) * 18, y + Math.sin(a) * 18); } ctx.fill(); } rr2(-80, 60, 160, 16, 6, '#b48cff'); rr2(-60, 80, 120, 10, 5, '#9f7fe6'); },
  uv(t) { for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * ((t * 2 + i / 4) % 1); ctx.strokeStyle = '#b48cff'; ctx.lineWidth = 8; ctx.beginPath(); for (let x = -70; x <= 70; x += 4) ctx.lineTo(x, Math.sin(x * 0.12 + t * 6) * 14 + (i - 1.5) * 26); ctx.stroke(); ctx.restore(); } },
  irW(t) { for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * ((t * 1.5 + i / 3) % 1); ctx.strokeStyle = ['#ff6f5a', '#ff9a3c', '#e2457a'][i]; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = -70; x <= 70; x += 4) ctx.lineTo(x, Math.sin(x * 0.05 + t * 4) * 18 + (i - 1) * 34); ctx.stroke(); ctx.restore(); } },
  visL(t) { const c = ['#e2457a', '#ff8f4a', '#ffd36b', '#5fd38a', '#5aa9e6', '#7f6ff0']; ctx.save(); ctx.translate(0, 40); ctx.lineCap = 'round'; c.forEach((col, i) => { ctx.strokeStyle = col; ctx.lineWidth = 11; ctx.beginPath(); ctx.arc(0, 0, 84 - i * 12, Math.PI + 0.1, -0.1 - 0.12 * (1 + Math.sin(t * 2 + i)) * 0.5); ctx.stroke(); }); ctx.restore(); },
  planet(t) { circ(0, 0, 50, '#5aa9e6'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 50, 0, 6.283); ctx.clip(); rr2(-60, -10, 120, 14, 7, 'rgba(255,255,255,0.3)'); rr2(-60 + Math.sin(t) * 10, 14, 120, 8, 4, 'rgba(255,255,255,0.18)'); ctx.restore(); ctx.strokeStyle = 'rgba(180,140,255,0.6)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 60 + Math.sin(t * 3) * 3, 0, 6.283); ctx.stroke(); ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 2.4); ctx.strokeStyle = '#5fd38a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 56, -2.4, -0.7); ctx.stroke(); ctx.restore(); },
  gyro(t, o) { circ(0, 0, 50, o.off ? '#3f4760' : '#5b6585'); ctx.save(); ctx.rotate(o.off ? 0.6 : t * 6); rr2(-44, -6, 88, 12, 6, '#c9d6ec'); ctx.restore(); circ(0, 0, 12, o.off ? '#8fd8e6' : '#ffd98a'); if (o.off) { font(22, 700); ctx.fillStyle = '#8fd8e6'; ctx.textAlign = 'center'; ctx.fillText('z', 40 + Math.sin(t * 2) * 3, -44 - (t * 12) % 14); } },
  gasM(t) {   // a few stray gas molecules jiggling
    for (let i = 0; i < 5; i++) { const a = i * 1.26 + t * 0.8, r = 30 + 8 * Math.sin(t * 2 + i), x = Math.cos(a) * r, y = Math.sin(a) * r * 0.8, c = ['#8fd8e6', '#b48cff', '#ffd98a'][i % 3];
      circ(x, y, 15, c); circ(x + Math.cos(a + 1) * 14, y + Math.sin(a + 1) * 14, 10, '#dfefff'); circ(x - 4, y - 5, 4, 'rgba(255,255,255,0.7)'); } },
  speedo(t, o) {   // speed dial; o.v 0..1 sets the needle
    const v = o.v ?? 0.85; circ(0, 8, 62, '#f3f7fb'); circ(0, 8, 52, '#102348');
    for (let i = 0; i <= 8; i++) { ctx.save(); ctx.translate(0, 8); ctx.rotate(-2.3 + i / 8 * 4.6); rr2(-2.5, -46, 5, 10, 2, i > 6 ? '#e2457a' : '#8fd8e6'); ctx.restore(); }
    ctx.save(); ctx.translate(0, 8); ctx.rotate(-2.3 + v * 4.6 + Math.sin(t * 11) * 0.03); rr2(-4, -40, 8, 44, 4, '#ff8f4a'); ctx.restore(); circ(0, 8, 8, '#ffd98a'); font(14, 700); ctx.fillStyle = '#8fd8e6'; ctx.textAlign = 'center'; ctx.fillText('KM/H', 0, 44); },
  issI(t, o) {   // a space station: truss, modules, solar wings; o.fire shows thruster puffs
    rr2(-96, -6, 192, 12, 6, '#c9ced9'); for (const x of [-84, -58, 58, 84]) { rr2(x - 11, -62, 22, 52, 3, '#c9963a'); rr2(x - 11, 10, 22, 52, 3, '#c9963a'); rr2(x - 7, -58, 6, 44, 2, 'rgba(255,240,180,0.35)'); }
    rr2(-36, -20, 72, 40, 16, '#eef1f6'); rr2(-12, -36, 24, 72, 10, '#d9dde6'); rr2(-30, -14, 30, 8, 4, 'rgba(255,255,255,0.8)');
    if (o.fire) for (let i = 0; i < 3; i++) { const p = (t * 3 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(44 + p * 50, 6 + (i - 1) * 6, 7 + p * 9, '#ffb35c'); ctx.restore(); } },
  skyPic(t, o) {   // a photo of deep sky; o.blur 0..1 blurs it, o.reveal 0..1 lets galaxies appear in a dark patch
    rr2(-72, -58, 144, 116, 10, '#f3f7fb'); rr2(-62, -48, 124, 96, 6, '#0a1430');
    ctx.save(); ctx.beginPath(); ctx.rect(-62, -48, 124, 96); ctx.clip(); if (o.blur) ctx.filter = `blur(${(o.blur * 6).toFixed(1)}px)`; ctx.globalAlpha *= o.reveal ?? 1; ctx.scale(0.75, 0.75); ICONS.galaxies(t); ctx.restore(); },
  mirrorH(t, o) {   // Hubble's main mirror: a polished disc with a central hole; o.bad warps the reflection
    circ(0, 0, 62, '#8e9ab8'); circ(0, 0, 54, '#dfe7f2'); circ(-6, -6, 40, '#eef3fb');
    ctx.save(); ctx.strokeStyle = o.bad ? '#e2457a' : 'rgba(143,216,230,0.8)'; ctx.lineWidth = 5; ctx.beginPath(); for (let a = 0; a <= 6.3; a += 0.2) { const r = 30 + (o.bad ? Math.sin(a * 5 + t * 6) * 6 : 0); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.stroke(); ctx.restore();
    circ(0, 0, 13, '#20232f'); rr2(-36, -38, 30, 9, 4, 'rgba(255,255,255,0.8)'); },
  astro(t, o) {   // our own astronaut: white suit, gold visor, backpack
    const b = Math.sin(t * 1.5) * 4; ctx.save(); ctx.translate(0, b); ctx.rotate(Math.sin(t * 0.9) * 0.07);
    rr2(-50, -10, 100, 70, 22, '#b8c2d6'); rr2(-42, -12, 84, 88, 30, '#f3f7fb'); rr2(-58, -4, 22, 60, 11, '#e2e8f2'); ctx.save(); ctx.translate(46, 2); ctx.rotate(-0.5 + Math.sin(t * 2) * 0.25); rr2(-11, -4, 22, 58, 11, '#e2e8f2'); circ(0, 56, 12, '#c9d6ec'); ctx.restore();
    rr2(-34, 66, 28, 30, 12, '#e2e8f2'); rr2(6, 66, 28, 30, 12, '#e2e8f2'); circ(0, -48, 44, '#f3f7fb'); rr2(-32, -70, 64, 44, 20, '#ffb35c'); rr2(-24, -64, 22, 10, 5, 'rgba(255,255,255,0.65)'); rr2(-16, 14, 32, 20, 6, '#8fd8e6'); circ(-6, 24, 4, '#e2457a'); circ(8, 24, 4, '#ffd36b');
    ctx.restore(); },
  wrench(t) { ctx.save(); ctx.rotate(-0.7 + Math.sin(t * 3) * 0.25); rr2(-10, -18, 20, 88, 10, '#c9d6ec'); ctx.strokeStyle = '#c9d6ec'; ctx.lineWidth = 20; ctx.beginPath(); ctx.arc(0, -40, 24, -0.6, 3.74); ctx.stroke(); rr2(-4, 0, 6, 60, 3, 'rgba(255,255,255,0.5)'); ctx.restore(); },
  expandU(t, o) {   // the expanding universe: galaxies streaming outward from a bright centre; o.fast speeds it up
    const sp = o.fast ? 0.7 : 0.3; for (let i = 0; i < 12; i++) { const a = i * 0.524 + 0.3, p = (t * sp + i * 0.37) % 1, r = 12 + (o.fast ? p * p : p) * 62;
      ctx.save(); ctx.globalAlpha *= Math.sin(p * Math.PI); ctx.translate(Math.cos(a) * r, Math.sin(a) * r); ctx.rotate(a + t); ell(0, 0, 9 + p * 6, 4 + p * 3, ['#ffd98a', '#8fd8e6', '#ff8fd8'][i % 3]); ctx.restore(); }
    circ(0, 0, 12 + Math.sin(t * 4) * 2, '#ffffff'); },
  medal(t) { ctx.fillStyle = '#3a6fd6'; ctx.beginPath(); ctx.moveTo(-30, -80); ctx.lineTo(-6, -20); ctx.lineTo(6, -20); ctx.lineTo(30, -80); ctx.lineTo(14, -80); ctx.lineTo(0, -40); ctx.lineTo(-14, -80); ctx.fill(); circ(0, 20, 56, '#e0a92a'); circ(0, 20, 46, '#ffd36b'); circ(0, 20, 18, '#e0a92a'); },
  jupiter(t) { circ(0, 0, 60, '#e8b98a'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 60, 0, 6.283); ctx.clip(); [[-40, '#c98a5a'], [-16, '#f3d6b0'], [6, '#b86f45'], [28, '#f0c89a'], [46, '#c98a5a']].forEach(([y, c], i) => rr2(-70 + Math.sin(t * 0.6 + i) * 6, y - 7, 140, 14, 7, c)); ell(((t * 14) % 160) - 80, 18, 14, 8, '#c8553d'); ctx.restore(); rr2(-38, -44, 24, 9, 4, 'rgba(255,255,255,0.35)'); },
  comet(t) { for (let i = 5; i >= 0; i--) { ctx.save(); ctx.globalAlpha *= 0.25 + 0.12 * (5 - i) + 0.05 * Math.sin(t * 6 + i); ell(-20 - i * 14, -i * 4, 30 - i * 3, 12 - i * 1.4, i % 2 ? '#8fd8e6' : '#dfefff', 0.25); ctx.restore(); } circ(30, 6, 18, '#f3f7fb'); circ(26, 2, 6, '#ffffff'); },
  pillars(t) { rr2(-72, -64, 144, 128, 14, '#1d4a63'); const g = 0.6 + 0.4 * Math.sin(t * 1.5); ctx.save(); ctx.globalAlpha *= 0.3 * g; circ(0, -20, 50, '#8fd8e6'); ctx.restore();
    for (const [x, w, h] of [[-38, 24, 96], [4, 20, 112], [40, 16, 72]]) { rr2(x - w / 2, 58 - h, w, h, w / 2, '#a8643c'); circ(x, 58 - h + w / 2, w * 0.62, '#e0a070'); rr2(x - w / 2 + 3, 62 - h + w, 5, h * 0.6, 3, 'rgba(255,220,170,0.35)'); }
    for (let i = 0; i < 7; i++) { const r = rng(i * 7 + 2); circ((r() - 0.5) * 124, (r() - 0.5) * 110, 2 + 2 * (0.5 + 0.5 * Math.sin(t * 3 + i)), '#ffffff'); } },
  galaxyS(t) { ctx.save(); ctx.rotate(t * 0.5); for (let k = 0; k < 2; k++) for (let i = 0; i < 26; i++) { const a = i * 0.24 + k * Math.PI, r = 8 + i * 2.4; circ(Math.cos(a) * r, Math.sin(a) * r * 0.6, 9 - i * 0.25, i % 3 ? '#b48cff' : '#ffd98a'); } ctx.restore(); circ(0, 0, 16, '#fff3c8'); },
  bhole(t) { ctx.save(); ctx.globalAlpha *= 0.5; ell(0, 0, 74, 28, '#ff8f4a'); ctx.restore(); ell(0, 0, 66, 22, '#ffb35c'); circ(0, 0, 32, '#05060c');
    ctx.fillStyle = '#ffd98a'; ctx.beginPath(); ctx.ellipse(0, 0, 66, 22, 0, 0, Math.PI); ctx.ellipse(0, 0, 36, 10, 0, Math.PI, 0, true); ctx.fill();
    for (let i = 0; i < 4; i++) { const a = t * 2 + i * 1.57; circ(Math.cos(a) * 52, Math.sin(a) * 17, 5, '#ffffff'); } },
  gburst(t) { const p = (t * 0.9) % 1; ctx.save(); ctx.rotate(t * 0.4); for (let i = 0; i < 12; i++) { ctx.rotate(6.283 / 12); ctx.save(); ctx.globalAlpha *= 1 - p * 0.6; rr2(-5, -30 - p * 34, 10, 26 + (i % 2) * 14, 5, i % 2 ? '#ffffff' : '#b48cff'); ctx.restore(); } ctx.restore(); circ(0, 0, 30, 'rgba(180,140,255,0.45)'); circ(0, 0, 18 + Math.sin(t * 9) * 3, '#ffffff'); },
  rocketI(t, o) {   // generic rocket; o.broken: no flame, smoke and a tilt
    ctx.save(); if (o.broken) ctx.rotate(0.35 + Math.sin(t * 9) * 0.06); else flameP(t, 0, 52, 46, 18);
    poly([[-24, 30], [-44, 60], [-24, 54]], '#e2457a'); poly([[24, 30], [44, 60], [24, 54]], '#e2457a'); rr2(-24, -50, 48, 104, 22, '#f3f7fb'); poly([[-24, -36], [0, -90], [24, -36]], '#e2457a'); circ(0, -16, 12, '#8fd8e6'); rr2(-16, -40, 8, 70, 4, 'rgba(255,255,255,0.7)');
    if (o.broken) for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.8; circ(10 + Math.sin(p * 6) * 10, 50 + p * 40, 14 + p * 16, '#7a8296'); ctx.restore(); } ctx.restore(); },
  capsule(t) { poly([[-44, 40], [-28, -40], [28, -40], [44, 40]], '#eef1f6'); poly([[-44, 40], [-28, -40], [-14, -40], [-24, 40]], '#d9dde6'); rr2(-48, 36, 96, 16, 8, '#3a3f5a'); rr2(-26, -52, 52, 14, 7, '#d9dde6'); circ(-12, -4, 8, '#20232f'); circ(12, -4, 8, '#20232f'); circ(-14, -7, 3, 'rgba(255,255,255,0.6)');
    for (const sd of [-1, 1]) { const p = (t * 2.5 + (sd > 0 ? 0.5 : 0)) % 1; ctx.save(); ctx.globalAlpha *= (1 - p) * 0.7; circ(sd * (40 + p * 30), -22, 5 + p * 6, '#dfefff'); ctx.restore(); } },
  ocean(t) { rr2(-84, -20, 168, 76, 30, '#2f6fc0'); rr2(-84, -20, 168, 30, 24, '#3f8ad8'); for (let i = 0; i < 3; i++) { const x = ((t * 30 + i * 60) % 180) - 90; ctx.save(); ctx.beginPath(); ctx.roundRect(-84, -20, 168, 76, 30); ctx.clip(); rr2(x - 20, -14 + i * 22, 40, 8, 4, 'rgba(255,255,255,0.45)'); ctx.restore(); }
    ctx.strokeStyle = '#8fd8e6'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = -80; x <= 80; x += 4) ctx.lineTo(x, -24 + Math.sin(x * 0.08 + t * 3) * 6); ctx.stroke(); },
  pie(t, o) {   // a chance dial: o.v = share highlighted
    const v = o.v ?? 0.1; circ(0, 0, 60, '#3a4a6a'); ctx.save(); ctx.rotate(-1.57 + Math.sin(t * 1.5) * 0.05); ctx.fillStyle = '#ff8fb8'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 60 + Math.sin(t * 4) * 3, 0, v * 6.283); ctx.fill(); ctx.restore(); circ(0, 0, 26, '#102348'); font(22, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.txt || '<10%', 0, 1); },
  bulb(t) { const g = 0.6 + 0.4 * Math.sin(t * 4); ctx.save(); ctx.globalAlpha *= 0.35 * g; circ(0, -14, 62, '#ffd98a'); ctx.restore(); circ(0, -14, 40, '#ffe08a'); rr2(-18, 18, 36, 30, 8, '#9aa6c4'); rr2(-18, 26, 36, 5, 2, '#6f7a96'); rr2(-18, 36, 36, 5, 2, '#6f7a96'); rr2(-22, -36, 12, 22, 6, 'rgba(255,255,255,0.7)'); },
  factory(t) { rr2(-74, -10, 148, 70, 8, '#8fa0c8'); poly([[-74, -10], [-40, -40], [-40, -10], [-6, -40], [-6, -10], [28, -40], [28, -10]], '#6f80a8'); rr2(40, -64, 22, 60, 4, '#5b6585'); for (let i = 0; i < 4; i++) rr2(-60 + i * 32, 14, 20, 20, 4, '#ffd98a'); puff(t, 51, -70, 3, -1, 'rgba(255,255,255,0.55)', 10); },
  truss(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.12); ctx.strokeStyle = '#c9ced9'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-60, -40); ctx.lineTo(60, -40); ctx.lineTo(60, 40); ctx.lineTo(-60, 40); ctx.closePath(); ctx.moveTo(-60, -40); ctx.lineTo(0, 40); ctx.lineTo(60, -40); ctx.stroke(); ctx.restore(); },
  australia(t) { ctx.save(); ctx.rotate(Math.sin(t * 0.8) * 0.04); ctx.fillStyle = '#e0a060'; ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(-60, -50, -20, -40); ctx.quadraticCurveTo(-4, -64, 14, -40); ctx.lineTo(30, -66); ctx.quadraticCurveTo(50, -40, 72, -6); ctx.quadraticCurveTo(80, 30, 46, 52); ctx.quadraticCurveTo(10, 40, -10, 50); ctx.quadraticCurveTo(-60, 46, -70, -10); ctx.fill(); ell(-30, 0, 24, 16, '#c98a4a'); ell(30, 10, 20, 14, '#5fbf6a', 0.3); circ(52, 72, 9, '#e0a060'); ctx.restore(); },
  starB(t) { const g = 0.7 + 0.3 * Math.sin(t * 3); ctx.save(); ctx.globalAlpha *= 0.4 * g; circ(0, 0, 64, '#8fd8e6'); ctx.restore(); ctx.save(); ctx.rotate(t * 0.5); for (let i = 0; i < 8; i++) { ctx.rotate(0.785); rr2(-4, -60, 8, 18 + Math.sin(t * 5 + i) * 6, 4, '#dfefff'); } ctx.restore(); circ(0, 0, 38, '#bfe6ff'); circ(0, 0, 28, '#ffffff'); },
  handGrain(t) {   // an outstretched arm holding a tiny grain of sand between thumb and finger
    ctx.save(); ctx.rotate(-0.25 + Math.sin(t * 1.2) * 0.04); rr2(-90, -16, 120, 32, 16, '#f2b38f'); rr2(-96, -20, 40, 40, 14, '#5b4fd6'); circ(40, -4, 24, '#f2b38f'); rr2(46, -30, 14, 26, 7, '#e9a27f'); rr2(52, 4, 22, 12, 6, '#e9a27f');
    const g = 0.5 + 0.5 * Math.sin(t * 5); ctx.save(); ctx.globalAlpha *= 0.4 * g; circ(66, -14, 14, '#ffd98a'); ctx.restore(); circ(66, -14, 5, '#ffd36b'); ctx.restore(); },
});
Object.assign(IDLE, { hubbleI: {}, hubbleT: {}, sunI: {}, shuttle: {}, shuttleB: {}, glasses: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.06) }, galaxies: {}, swift: { pre: t => ctx.rotate(Math.sin(t * 0.8) * 0.1) }, rescuer: {}, bus: {},
  calendarH: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.05) }, ring: {}, fireball: {}, skylab: {}, webb: { post: t => glint(t, 70, 60) }, uv: {}, irW: {}, visL: {}, planet: {}, gyro: {}, gasM: {}, speedo: {}, issI: { pre: t => ctx.rotate(Math.sin(t * 0.7) * 0.06) },
  skyPic: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.04) }, mirrorH: { pre: t => ctx.rotate(Math.sin(t * 1.1) * 0.08), post: t => glint(t, 56, 56) }, astro: {}, wrench: {}, expandU: {}, medal: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.08), post: t => glint(t, 56, 60) },
  jupiter: { pre: t => ctx.rotate(0.15 + Math.sin(t * 0.8) * 0.04) }, comet: {}, pillars: {}, galaxyS: {}, bhole: { pre: t => ctx.rotate(-0.2 + Math.sin(t * 0.9) * 0.05) }, gburst: {}, rocketI: {}, capsule: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.06) }, ocean: {}, pie: {}, bulb: { pre: t => ctx.rotate(Math.sin(t * 2) * 0.08) }, factory: {}, truss: {}, australia: {}, starB: {}, handGrain: {} });

// actor shorthands (hw/hh = half box in icon units)
const HB = (x, y, s, t0, op = {}) => A('hubbleT', x, y, s, t0, { hw: 92, hh: 62, ...op });
const BOX_ = { swift: { hw: 64, hh: 86 }, rescuer: { hw: 80, hh: 66 }, fireball: { hw: 74, hh: 60 }, shuttle: { hw: 100, hh: 64 }, shuttleB: { hw: 104, hh: 70 }, bus: { hw: 116, hh: 64 }, galaxies: { hw: 84, hh: 64 }, calendarH: { hw: 54, hh: 54 }, issI: { hw: 98, hh: 64 },
  astro: { hw: 60, hh: 96 }, comet: { hw: 84, hh: 40 }, rocketI: { hw: 46, hh: 92 }, capsule: { hw: 48, hh: 56 }, ocean: { hw: 86, hh: 52 }, webb: { hw: 84, hh: 86 }, uv: { hw: 76, hh: 60 }, irW: { hw: 76, hh: 60 }, visL: { hw: 90, hh: 52 }, glasses: { hw: 86, hh: 40 }, handGrain: { hw: 96, hh: 50 }, skylab: { hw: 84, hh: 84 }, australia: { hw: 80, hh: 70 }, pillars: { hw: 74, hh: 66 }, skyPic: { hw: 74, hh: 60 } };
const B = (ic, x, y, s, t0, op = {}) => A(ic, x, y, s, t0, { ...(BOX_[ic] || {}), ...op });
const pinwheel = (cx, cy, r0, k) => { ctx.save(); ctx.strokeStyle = 'rgba(255,217,138,0.6)'; ctx.lineWidth = 5; ctx.setLineDash([16, 12]); ctx.beginPath(); for (let a = 0; a < 6.283 * 2.2 * k; a += 0.05) { const r = r0 - a * 26; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.4); } ctx.stroke(); ctx.setLineDash([]); ctx.restore(); };

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night'); earthBG(0.2)(t);
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [HB(960, 470, 3.0, 'c1:hubble', { mv: [['c1:falling+0.4', 960, 560]], shake: ['c1:falling', 0.8] }), B('gasM', 1560, 360, 1.5, 'c1:space', {})] },
    { at: 'c2', cast: [HB(700, 380, 2.4, 'c2', { mv: [['c2:dragging+1.2', 760, 520]], hit: ['c2:dragging'] }), B('rocketI', 1200, 330, 1.4, 'c2:engine', { morph: ['c2:own', 'cross'], hw: 56, hh: 92 }),
      B('gasM', 1700, 430, 1.5, 'c2:atmosphere', { mv: [['c2:dragging', 1060, 500, 40]] }), B('calendarH', 1350, 640, 1.7, 'c2:2033', { o: { head: 'FALL', text: '2033' } }), B('calendarH', 1650, 640, 1.7, 'c2:2034', { o: { head: 'OR', text: '2034' } })],
      lab: [['LIKELY FALL: 2033–2034', 'c2:2033', 1500, 965, GOLD, 32]] },
    { at: 'c3', cast: [A('calDay', 330, 420, 1.7, 'c3:month', { o: { m: 'NOV', d: '2026' } }), B('swift', 900, 330, 1.8, 'c3:telescope', { mv: [['c3:burned+0.4', 960, 600]], morph: ['c3:burned', 'fireball'] }),
      B('rescuer', 1600, 330, 1.7, 'c3:mission', { mv: [['c3:rescue+0.5', 1300, 400, 40]], grey: 'c3:failed', shake: ['c3:failed', 0.7] })],
      tag: [['ANOTHER NASA TELESCOPE BURNED UP', 'c3:burned', 960, 965, '#e2457a', 34]] },
    QB('c4q', [HB(800, 560, 2.6, 'c4q+0.2'), B('rescuer', 1250, 300, 1.4, 'c4q:save', { mv: [['c4q>', 1150, 400]] })]),
    { at: 'c5', cast: [A('docV', 300, 500, 2.0, 'c5:asking', { o: { title: 'NASA ASKS', ticks: 0 } }), B('swift', 800, 470, 1.7, 'c5:satellites', { mv: [['c5:fall+0.6', 800, 620]] }), B('galaxies', 1250, 480, 2.2, 'c5:given'), HB(1640, 500, 1.7, 'c5:save', { pulse: ['c5:save+0.3'] })] },
  ], 'f1'));
}
// ---------- 1 why orbits decay ----------
function sDecay(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('f1', [HB(760, 500, 2.4, 'f1+0.2', { mv: [['f1>', 760, 580]] })], { bg: earthBG(0.2) }),
    { at: 'f2', bg: earthBG(0.2), cast: [HB(1250, 450, 2.6, 'f2:hubble', { hit: ['f2:crashes+0.6', 'f2:second'] }), B('gasM', 320, 320, 1.5, 'f2:stray', { mv: [['f2:crashes+0.6', 980, 440, 40]], erase: 'f2:trillions' }), B('gasM', 320, 620, 1.5, 'f2:molecules'),
      B('speedo', 1680, 700, 1.6, 'f2:27', { o: { v: 0.92 }, pulse: ['f2:kilometers#1'] })],
      fx: [['stream', 2, 0, 'f2:trillions', 'f2>', { ic: 'gasM', s: 0.3, n: 8, arc: 30 }]], lab: [['HUNDREDS OF KM UP', 'f2:hundreds', 420, 150, WHITE, 30], ['~27,000 KM/H', 'f2:27', 1000, 965, GOLD, 36]] },
    { at: 'f3', bg: earthBG(0.3), under: (tt, P, scr) => pinwheel(960, 470, 560, clamp((tt - T('f3:drop')) / 2.5)),
      cast: [B('speedo', 300, 300, 1.6, 'f3', { o: tt => ({ v: 0.88 - 0.45 * clamp((tt - T('f3:steals')) / 8) }), pulse: ['f3:lose', 'f3:faster'] }), HB(1380, 330, 1.6, 'f3', { mv: [['f3:drop', 1150, 480], ['f3:thicker', 800, 560], ['f3:faster', 620, 600], ['f3:spiral', 960, 680]] }),
        B('gasM', 1650, 600, 1.4, 'f3:air', { mv: [['f3:thicker', 1000, 620, 40]], erase: 'f3:faster' }), B('gasM', 200, 640, 1.4, 'f3:thicker', { mv: [['f3:faster', 480, 620, 40]] })],
      tag: [['A SLOW SPIRAL DOWN', 'f3:spiral', 960, 965, '#5b4fd6', 36]] },
    { at: 'f3b', bg: earthBG(0.3), cast: [HB(480, 280, 1.6, 'f3b'), B('issI', 1250, 620, 2.2, 'f3b:international', { o: tt => ({ fire: tt > T('f3b:fires') && ((tt - T('f3b:fires')) % 2.2) < 1.2 }), mv: [['f3b:problem', 1250, 690], ['f3b:fires+0.6', 1250, 540], ['f3b:stay', 1250, 600]] }),
      B('gasM', 1700, 300, 1.4, 'f3b:same', { mv: [['f3b:problem+0.4', 1500, 560, 40]], push: [['f3b:fires+0.6', 200, -100]] })],
      lab: [['SPACE STATION: EVEN LOWER', 'f3b:lower', 960, 965, WHITE, 30]] },
    QB('f4q', [B('sunI', 700, 500, 2.2, 'f4q+0.2', { hw: 84, hh: 84 }), HB(1150, 520, 1.5, 'f4q:worse', { shake: ['f4q:worse', 0.6] })], { bg: earthBG(0.4) }),
    { at: 'f5', bg: earthBG(tt => 0.2 + 0.8 * clamp((tt - T('f5:puffs')) / 1.5)), cast: [B('sunI', 300, 290, 2.0, 'f5:sun', { hw: 84, hh: 84, pulse: ['f5:active', 'f5:heats', 'f5:peak'] }),
      A('thermoC', 780, 400, 1.6, 'f5:heats', { o: tt => ({ level: 0.3 + 0.6 * clamp((tt - T('f5:heats')) / 1.5), v: [0.3, 0.55, 0.95, 0.75], hi: 2 }), morph: ['f5:peak', 'chart'] }),
      B('gasM', 1100, 660, 1.4, 'f5:puffs', { mv: [['f5:higher', 1240, 460, 30]] }), HB(1520, 300, 1.7, 'f5', { hit: ['f5:drag'], mv: [['f5:sinking', 1520, 440]] })],
      fx: [['stream', 0, [960, 760], 'f5:heats', 'f5:higher', { col: '#ffb35c', n: 10 }]], lab: [['11-YEAR SUN CYCLE · JUST PEAKED', 'f5:11', 780, 965, GOLD, 30]] },
    { at: 'f6', bg: earthBG(0.4), under: (tt, P, scr) => { const k = eoq((tt - T('f6:400')) / 0.8); if (k <= 0) return; const [x0, y] = scr(140, 600), [x1] = scr(1180, 600); ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = '#ff8fb8'; ctx.lineWidth = 6; ctx.setLineDash([18, 14]); ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, k), y); ctx.stroke(); ctx.restore(); },
      cast: [HB(700, 260, 1.8, 'f6', { mv: [['f6:dropped+0.8', 700, 420], ['f6:below+0.8', 700, 650]] }), A('hglass', 1380, 450, 2.0, 'f6:year', { pulse: ['f6:left'] }), A('calDay', 1720, 450, 1.5, 'f6:year+0.3', { o: { m: 'LEFT', d: '~1Y' } })],
      lab: [['DOWN BY TENS OF KM', 'f6:tens', 700, 965, WHITE, 30], ['400 KM', 'f6:400', 250, 540, '#ff9fb4', 30]] },
    { at: 'f6b', bg: earthBG(0.3), cast: [A('globeP', 960, 520, 3.2, 'f6b'), HB(960, 520, 1.3, 'f6b:circles', { orbit: { c: [960, 520], r: 560, w: 2.4, squash: 0.45, ph: 3.4 }, z: 2 }), A('stopwatch', 220, 820, 1.6, 'f6b:95'), B('gasM', 1700, 820, 1.4, 'f6b:thin')],
      num: [['f6b:15', 1700, 170, '15×', 'LAPS A DAY']], lab: [['A LAP EVERY ~95 MINUTES', 'f6b:95', 960, 965, GOLD, 30]] },
  ], 'h1'));
}
// ---------- 2 thirty-six years of Hubble ----------
function sHistory(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('h1', [HB(760, 540, 2.4, 'h1+0.2', { pulse: ['h1:big'] })]),
    { at: 'h2', cast: [B('shuttle', 260, 760, 1.8, 'h2:launched', { mv: [['h2:shuttle+0.5', 420, 330]] }), A('calDay', 1600, 250, 1.5, 'h2:april', { o: { m: 'APR', d: '1990' } }),
      A('mirrorH', 900, 500, 2.2, 'h2:mirror', { o: tt => ({ bad: tt > T('h2:wrong') }), shake: ['h2:disaster', 0.8], hit: ['h2:wrong'] }), B('skyPic', 1450, 600, 2.0, 'h2:pictures', { o: tt => ({ blur: clamp((tt - T('h2:blurry')) / 0.6) }), shake: ['h2:blurry', 0.6] })],
      lab: [['MIRROR OFF BY < 1/50 OF A HAIR', 'h2:50', 900, 965, '#ff9fb4', 30]] },
    { at: 'h3', cast: [HB(1000, 480, 2.6, 'h3', { pulse: ['h3:glasses+0.4', 'h3:repaired', 'h3:upgraded'] }), B('astro', 300, 700, 1.7, 'h3:astronauts', { mv: [['h3:flew+0.6', 620, 430, 60]] }), A('calDay', 300, 260, 1.5, 'h3:1993', { o: tt => ({ m: 'YEAR', d: tt > T('h3:2009') ? '2009' : '1993' }), pulse: ['h3:2009'] }),
      B('glasses', 1560, 260, 2.0, 'h3:optics', { mv: [['h3:glasses+0.4', 1260, 420, 40]], out: 'h3:five' }), A('wrench', 0, 0, 1.3, 'h3:repaired', { follow: { i: 1, dx: 110, dy: -40 } }), B('shuttle', 1640, 740, 1.5, 'h3:shuttle', { pulse: ['h3:2009'] })],
      lab: [['5 SHUTTLE MISSIONS · 1993–2009', 'h3:five', 960, 965, GOLD, 30]] },
    { at: 'h3b', cast: [HB(560, 450, 2.6, 'h3b'), B('bus', 1640, 450, 2.0, 'h3b:bus', { mv: [['h3b:bus+0.8', 1380, 450]] }), A('mirrorH', 560, 450, 1.6, 'h3b:mirror', { mv: [['h3b:mirror+0.7', 1000, 760, 80]] })],
      lab: [['13 M LONG', 'h3b:13', 560, 190, GOLD, 32], ['2.4 M MIRROR', 'h3b:2', 1420, 770, GOLD, 30]] },
    QB('h4q', [B('galaxies', 760, 540, 2.6, 'h4q+0.2'), A('magnifier', 1160, 480, 1.6, 'h4q:found', { mv: [['h4q:found+0.8', 1050, 500]] })]),
    { at: 'h5', cast: [HB(420, 400, 2.0, 'h5'), A('expandU', 1050, 440, 2.4, 'h5:universe', { pulse: ['h5:expanding'], hw: 72, hh: 72 }), A('hglass', 1600, 440, 1.8, 'h5:age')],
      fx: [['stream', 1, 0, 'h5:has', 'h5:helped', { col: '#ffd98a', n: 10 }]], num: [['h5:one', 420, 790, '1.5 M+', 'OBSERVATIONS'], ['h5:13', 1600, 790, '13.8 BN', 'YEARS OLD']] },
    { at: 'h6', cast: [A('expandU', 380, 440, 2.2, 'h6', { o: { fast: 1 }, hw: 72, hh: 72 }), A('medal', 380, 440, 1.8, 'h6:nobel', { mv: [['h6:prize+0.4', 780, 420, 80]] }), HB(1150, 360, 1.8, 'h6:staring'), B('skyPic', 1620, 600, 2.0, 'h6:patch', { o: tt => ({ reveal: clamp((tt - T('h6:revealed')) / 1.2) }), pulse: ['h6:thousands'] })],
      fx: [['stream', 2, 3, 'h6:staring', 'h6:revealed+1', { col: '#ffd98a', n: 7 }]], tag: [['EXPANSION IS SPEEDING UP', 'h6:speeding', 400, 800, '#5b4fd6', 32]], lab: [['NOBEL PRIZE', 'h6:nobel', 800, 640, GOLD, 30], ['THOUSANDS OF UNSEEN GALAXIES', 'h6:thousands', 1400, 965, WHITE, 28]] },
    { at: 'h6b', cast: [B('skyPic', 760, 460, 3.2, 'h6b', { o: { reveal: 1 }, pulse: ['h6b:3'] }), A('calDay', 250, 300, 1.5, 'h6b:1995', { o: { m: 'DEEP FIELD', d: '1995' } }), B('handGrain', 1450, 500, 2.0, 'h6b:grain', { pulse: ['h6b:arm'] })],
      fx: [['stream', 2, 0, 'h6b:smaller', 'h6b>', { col: '#ffd98a', n: 8, arc: 80 }]], num: [['h6b:3', 760, 850, '~3,000', 'GALAXIES IN ONE SPECK']] },
    { at: 'h6d', cast: [A('jupiter', 420, 500, 2.0, 'h6d:comet', { hit: ['h6d:jupiter+0.3'] }), B('comet', 220, 230, 1.4, 'h6d:comet+0.2', { mv: [['h6d:jupiter+0.3', 380, 460]], erase: 'h6d:jupiter+0.4' }),
      B('pillars', 960, 480, 2.2, 'h6d:pillars'), A('galaxyS', 1520, 480, 2.2, 'h6d:galaxy', { morph: ['h6d:black', 'bhole'], pulse: ['h6d:heart'] })],
      lab: [['COMET HITS JUPITER · 1994', 'h6d:1994', 420, 780, GOLD, 26], ['PILLARS OF CREATION · 1995', 'h6d:1995', 960, 965, GOLD, 26], ['BLACK HOLES AT THEIR HEARTS', 'h6d:heart', 1520, 780, WHITE, 26]] },
    { at: 'h6c', cast: [HB(520, 480, 2.4, 'h6c', { shake: ['h6c:aging', 0.8] })].concat([0, 1, 2, 3, 4, 5].map(i => A('gyro', 1150 + (i % 3) * 280, i < 3 ? 330 : 650, 1.4, 'h6c:gyroscopes+' + (0.1 + i * 0.1).toFixed(2), i < 3 ? { grey: 'h6c:failing+' + (0.3 + i * 0.45).toFixed(2), shake: ['h6c:failing+' + (0.3 + i * 0.45).toFixed(2), 0.4] } : i === 3 ? { pulse: ['h6c:just', 'h6c:gyro'], glow: 'rgba(255,217,138,0.4)' } : { o: tt => ({ off: tt > T('h6c:save') }) }))),
      tag: [['SINCE 2024: ONE-GYRO MODE', 'h6c:2024', 960, 965, '#9b3352', 34]] },
  ], 's1'));
}
// ---------- 3 the telescope that fell ----------
function sSwift(t) {
  worldBG(t, 'night'); earthBG(0.2)(t);
  beats(t, chainB([
    QB('s1', [B('swift', 760, 520, 2.2, 's1+0.2', { shake: ['s1:other', 0.6] })]),
    { at: 's2', cast: [B('swift', 560, 450, 2.2, 's2:swift'), A('calDay', 220, 250, 1.4, 's2:20', { o: { m: 'YEARS', d: '20+' } }), A('gburst', 1300, 300, 1.8, 's2:gamma'), A('gburst', 1650, 560, 1.6, 's2:biggest'), B('rocketI', 1100, 650, 1.4, 's2:engine', { morph: ['s2:raise', 'cross'], hw: 56 })],
      fx: [['stream', 2, 0, 's2:gamma', 's2:like', { col: '#b48cff', n: 8 }], ['stream', 3, 0, 's2:biggest', 's2:like', { col: '#dfd6ee', n: 6 }]], lab: [['GAMMA-RAY BURST HUNTER', 's2:gamma', 960, 965, GOLD, 30]] },
    { at: 's3', cast: [B('swift', 1350, 560, 2.0, 's3', { pulse: ['s3:grab+0.6'] }), A('calDay', 960, 200, 1.4, 's3:2026', { o: { m: 'YEAR', d: '2026' } }), B('rocketI', 300, 700, 1.8, 's3:startup', { mv: [['s3:robotic+0.2', 380, 360]], out: 's3:robotic+0.3' }),
      B('rescuer', 380, 330, 1.8, 's3:robotic', { mv: [['s3:grab+0.6', 1080, 520, 60]], push: [['s3:higher', 0, -60]] }), A('stopwatch', 1700, 250, 1.5, 's3:race', { shake: ['s3:time', 0.7] })],
      lab: [['2026 · STARTUP KATALYST', 's3:catalyst', 960, 965, WHITE, 30]] },
    { at: 's4', cast: [B('rocketI', 300, 760, 1.6, 's4:rescue', { mv: [['s4:launched+0.6', 420, 400]], o: tt => ({ broken: tt > T('s4:crippled') }), shake: ['s4:crippled', 1.0], grey: 's4:called' }), A('cross', 700, 250, 1.4, 's4:called'),
      A('calDay', 1650, 260, 1.5, 's4:november', { o: { m: 'NOV', d: '2026' } }), B('swift', 1150, 300, 2.0, 's4:swift', { mv: [['s4:fell+1.0', 1150, 600]], morph: ['s4:burned', 'fireball'] })],
      tag: [['SWIFT BURNED UP', 's4:burned', 960, 965, '#e2457a', 36]] },
    QB('s5q', [B('fireball', 700, 540, 2.0, 's5q+0.2'), HB(1150, 540, 1.6, 's5q:hubble', { shake: ['s5q:hubble', 0.6] })]),
    { at: 's6', cast: [B('swift', 260, 500, 1.4, 's6:bigger'), HB(760, 480, 2.6, 's6:hubble', { pulse: ['s6:bigger'] }), B('bus', 1640, 330, 1.7, 's6:bus', { mv: [['s6:bus+0.8', 1450, 330]] }), B('astro', 1300, 690, 1.4, 's6:astronauts', { pulse: ['s6:visited'] }), B('rescuer', 1680, 700, 1.5, 's6:robots', { morph: ['s6:robots+0.5', 'cross'] })],
      lab: [['~11.5 TONNES ≈ A SCHOOL BUS', 's6:11', 760, 965, GOLD, 30]] },
    QB('s7q', [B('astro', 760, 540, 2.2, 's7q+0.2'), A('wrench', 1100, 480, 1.5, 's7q:fix')]),
    { at: 's8', cast: [B('shuttleB', 560, 520, 2.6, 's8:shuttle', { o: tt => ({ arm: clamp((tt - T('s8:arm')) / 1.0), bay: tt > T('s8:cargo') }), grey: 's8:retired' }), HB(1250, 300, 1.4, 's8:hold', { mv: [['s8:hold+0.9', 640, 420, 40]], grey: 's8:retired' }),
      A('calDay', 1300, 620, 1.5, 's8:2011', { o: { m: 'RETIRED', d: '2011' } }), B('rocketI', 1650, 500, 1.6, 's8:nothing', { morph: ['s8:job', 'cross'], hw: 56 })],
      lab: [['ROBOTIC ARM + CARGO BAY', 's8:arm', 560, 830, WHITE, 28]], tag: [['SHUTTLE RETIRED IN 2011', 's8:retired', 1350, 860, '#e2457a', 30]] },
    { at: 's9', cast: [HB(1050, 420, 2.4, 's9:mission', { shake: ['s9:safely', 0.5] }), A('bulb', 300, 680, 1.6, 's9:invent', { pulse: ['s9:way'] }), B('rescuer', 300, 280, 1.8, 's9:way', { mv: [['s9:grab+0.6', 690, 430, 50]] }), A('mirrorH', 1600, 720, 1.6, 's9:delicate', { pulse: ['s9:mirror'], glow: 'rgba(255,143,184,0.35)' })],
      lab: [['11 TONNES', 's9:11', 1050, 180, GOLD, 32]], tag: [['NEVER TOUCH THE MIRROR', 's9:touching', 960, 965, '#9b3352', 34]] },
  ], 't1'));
}
// ---------- 4 the deadline ----------
function sDeadline(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('t1', [A('hglass', 760, 540, 2.4, 't1+0.2'), HB(1150, 540, 1.5, 't1:hubble')]),
    { at: 't2', cast: [HB(260, 220, 1.3, 't2', { mv: [['t2>', 1100, 250]] }), A('pie', 440, 500, 2.0, 't2:chance', { o: { v: 0.1 }, pulse: ['t2:under'] }), B('calendarH', 900, 500, 2.0, 't2:2030', { o: { head: 'BEFORE', text: '2030' } }), B('calendarH', 1480, 500, 2.4, 't2:2033', { o: { head: 'MOST LIKELY', text: '2033' }, pulse: ['t2:likely', 't2:2033+0.3'] })],
      lab: [['UNDER 10% BEFORE 2030', 't2:under', 670, 800, WHITE, 30], ['MOST LIKELY: ~2033', 't2:likely', 1480, 800, GOLD, 32]] },
    { at: 't3', cast: [A('hglass', 360, 480, 2.2, 't3:wait', { shake: ['t3:last', 0.8] }), B('rocketI', 960, 700, 1.8, 't3:mission', { mv: [['t3:launch+0.5', 960, 420]] }), B('calendarH', 1500, 480, 2.4, 't3:2032', { o: { head: 'LAUNCH BY', text: '2032' }, pulse: ['t3:2032+0.3'] })],
      tag: [['A BOOST MUST LAUNCH BY 2032', 't3:launch', 960, 965, '#e2457a', 34]] },
    { at: 't4', cast: [A('calDay', 300, 280, 1.4, 't4:october', { o: { m: 'OCT', d: '29' } }), A('docV', 300, 660, 1.6, 't4:asked', { o: { title: 'IDEAS?', ticks: 0 } }), A('factory', 900, 480, 2.2, 't4:companies'),
      A('calDay', 1450, 280, 1.4, 't4:november', { o: { m: 'NOV', d: '30' } }), A('adult', 1450, 680, 1.6, 't4:chief', { o: { col: '#2b3a6a' }, pulse: ['t4:important'] }), B('galaxies', 1720, 480, 1.4, 't4:science')],
      fx: [['stream', 1, 2, 't4:companies', 't4:ideas+1', { col: '#8fd8e6', n: 8 }], ['stream', 2, 1, 't4:answers', 't4:30+1', { ic: 'bulb', s: 0.32, n: 6 }]], lab: [['"IMPORTANT SCIENCE AHEAD"', 't4:important', 960, 965, GOLD, 30]] },
    QB('t5q', [B('capsule', 760, 540, 2.2, 't5q+0.2'), HB(1150, 540, 1.5, 't5q:help')]),
    { at: 't6', cast: [A('calDay', 260, 260, 1.4, 't6:2022', { o: tt => ({ m: 'YEAR', d: tt > T('t6:2024') ? '2024' : '2022' }), pulse: ['t6:2024'] }), B('capsule', 480, 620, 2.0, 't6:dragon', { mv: [['t6:boost+0.4', 880, 500, 40]], push: [['t6:not', -380, 80]], morph: ['t6:decided', 'cross'] }),
      HB(1200, 480, 2.2, 't6:boost', { shake: ['t6:damaging', 0.8] }), B('astro', 1680, 320, 1.5, 't6:astronaut', { pulse: ['t6:billionaire'] })],
      lab: [['2022 STUDY: A CAPSULE BOOST', 't6:2022', 560, 965, WHITE, 28], ['BACKED BY JARED ISAACMAN', 't6:backed', 1420, 965, GOLD, 28]], tag: [['2024: NASA SAYS NO', 't6:decided', 1200, 180, '#9b3352', 32]] },
    { at: 't7', cast: [B('astro', 500, 540, 2.0, 't7', { morph: ['t7:runs', 'adult'], o: { col: '#2b3a6a' } }), HB(1150, 320, 1.6, 't7:question', { pulse: ['t7:back'] }), A('question', 1250, 700, 1.6, 't7:back', { mv: [['t7:table', 1300, 680, 60]], pulse: ['t7:table'] })],
      tag: [['NOW ISAACMAN RUNS NASA', 't7:runs', 960, 965, '#9b3352', 34]] },
  ], 'v1q'));
}
// ---------- 5 three ways to go ----------
function sOptions(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('v1q', [HB(760, 540, 2.4, 'v1q+0.2'), B('rescuer', 1180, 320, 1.4, 'v1q:options', { mv: [['v1q>', 1100, 380]] })]),
    { at: 'v2', bg: earthBG(0.2), cast: [HB(960, 640, 2.4, 'v2', { push: [['v2:push', 0, -260]] }), B('rescuer', 300, 680, 1.8, 'v2:spacecraft', { mv: [['v2:latch', 620, 640, 60]], push: [['v2:push', 0, -260]] }), A('hglass', 1600, 450, 2.0, 'v2:buying', { pulse: ['v2:years', 'v2:decades'] })],
      tag: [['OPTION 1 · BOOST IT HIGHER', 'v2', 960, 140, '#5b4fd6', 36]] },
    { at: 'v3', cast: [HB(960, 500, 2.4, 'v3', { pulse: ['v3:repair', 'v3:upgrade'] }), B('astro', 400, 720, 1.7, 'v3:servicing', { mv: [['v3:mission+0.5', 600, 520, 60]] }), A('wrench', 1520, 300, 1.6, 'v3:repair', { mv: [['v3:repair+0.6', 1240, 400]] }), A('gyro', 1560, 720, 1.5, 'v3:upgrade', { mv: [['v3:upgrade+0.6', 1260, 600]] })],
      tag: [['OPTION 2 · SERVICE IT AGAIN', 'v3', 960, 140, '#127b84', 36]] },
    { at: 'v4', under: (tt, P, scr) => { const k = eoq((tt - T('v4:disposal')) / 0.8); if (k <= 0) return; const [cx, cy] = scr(1500, 330); ctx.save(); ctx.globalAlpha = k * 0.7; ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 5; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.ellipse(cx, cy, 260, 90, -0.1, 0, 6.283 * k); ctx.stroke(); ctx.restore(); },
      cast: [HB(800, 320, 1.8, 'v4', { mv: [['v4:steer+0.4', 1150, 600]], erase: 'v4:ocean+0.6' }), B('rescuer', 0, 0, 1.6, 'v4:grab', { follow: { i: 0, dx: -230, dy: 0 }, out: 'v4:ocean+0.6' }), B('ocean', 1350, 760, 2.2, 'v4:remote'),
        HB(560, 300, 1.4, 'v4:move', { mv: [['v4:disposal', 1500, 310]], o: { glow: 0 } })],
      fx: [['burst', 2, 'v4:ocean+0.6', '#8fd8e6']], tag: [['OPTION 3 · STEER IT DOWN', 'v4', 960, 140, '#9b3352', 36]] },
    QB('v5q', [B('rescuer', 700, 540, 2.0, 'v5q+0.2', { mv: [['v5q>', 820, 540]] }), HB(1150, 540, 1.5, 'v5q:telescope')]),
    { at: 'v6', cast: [HB(1100, 480, 2.6, 'v6', { o: tt => ({ ring: tt > T('v6:ring+0.4') }) }), B('astro', 300, 650, 1.7, 'v6:astronauts', { mv: [['v6:bolted', 560, 520, 60]] }), A('calDay', 300, 250, 1.4, 'v6:2009', { o: { m: 'LAST VISIT', d: '2009' } }),
      B('ring', 560, 300, 1.4, 'v6:bolted', { mv: [['v6:ring+0.3', 885, 515]], out: 'v6:ring+0.4', hw: 50, hh: 78 }), B('rescuer', 1680, 250, 1.5, 'v6:future', { mv: [['v6:dock', 1560, 280]] })],
      tag: [['DOCKING RING · 2009', 'v6:ring', 1100, 860, '#5b4fd6', 34]] },
    { at: 'v7', bg: earthBG(0.2), cast: [HB(1050, 620, 2.2, 'v7', { o: { ring: 1 }, push: [['v7:firing', 0, -80], ['v7:over', 0, -80], ['v7:over#1', 0, -80], ['v7:higher', 0, -80]] }), B('rescuer', 300, 620, 1.7, 'v7:docking', { mv: [['v7:ring', 740, 640]], push: [['v7:firing', 0, -80], ['v7:over', 0, -80], ['v7:over#1', 0, -80], ['v7:higher', 0, -80]] }),
      A('hglass', 1650, 250, 1.6, 'v7:time', { pulse: ['v7:buys'] })],
      fx: [['burst', 1, 'v7:firing', '#8fd8e6'], ['burst', 1, 'v7:over', '#8fd8e6'], ['burst', 1, 'v7:over#1', '#8fd8e6']], lab: [['DOCK · FIRE GENTLY · RISE', 'v7:docking', 960, 965, GOLD, 32]] },
  ], 'u1'));
}
// ---------- 6 if Hubble falls ----------
function sFall(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('u1', [HB(760, 480, 2.4, 'u1+0.2', { grey: 'u1:nobody' })]),
    { at: 'u2', bg: earthBG(0.5, 1700, 1000), cast: [HB(400, 250, 1.8, 'u2', { mv: [['u2:down+0.6', 800, 450]], o: tt => ({ glow: tt > T('u2:down') }), morph: ['u2:burn', 'fireball'] }), B('calendarH', 1600, 250, 1.8, 'u2:2030', { o: { head: 'SOMETIME', text: '2030s' } }),
      A('mirrorH', 800, 450, 1.6, 'u2:mirror', { mv: [['u2:survive', 1200, 600, 40]], hit: ['u2:ground'] }), B('truss', 800, 450, 1.6, 'u2:frame', { mv: [['u2:survive+0.3', 1520, 600, 40]], hit: ['u2:ground+0.2'] })],
      lab: [['MOST OF IT BURNS UP', 'u2:burn', 400, 520, WHITE, 30]], tag: [['MIRROR + FRAME COULD SURVIVE', 'u2:mirror', 960, 965, '#9b3352', 32]] },
    { at: 'u3', cast: [A('globeP', 520, 480, 3.0, 'u3:earth', { pulse: ['u3:ocean'] }), A('adult', 1150, 520, 1.8, 'u3:anyone'), A('check', 1150, 250, 1.2, 'u3:small'), HB(1600, 250, 1.4, 'u3:uncontrolled', { mv: [['u3:big', 1650, 640]], shake: ['u3:big', 0.6], o: { glow: 1 } })],
      tag: [['SMALL RISK · MOSTLY OCEAN', 'u3:small', 960, 965, '#5b4fd6', 34]] },
    { at: 'u3b', cast: [HB(800, 300, 2.0, 'u3b', { o: { ring: 1 }, pulse: ['u3b:ring'], mv: [['u3b:steer+0.4', 1180, 560]] }), B('rescuer', 300, 300, 1.6, 'u3b:robotic', { mv: [['u3b:attach', 510, 300], ['u3b:steer+0.4', 890, 560]] }), B('ocean', 1450, 780, 2.2, 'u3b:ocean')],
      fx: [['burst', 2, 'u3b:ocean+0.6', '#8fd8e6']], lab: [['THE RING WAS PART OF THE PLAN', 'u3b:plan', 700, 965, GOLD, 30]] },
    { at: 'u4', bg: earthBG(0.3), cast: [A('calDay', 300, 250, 1.4, 'u4:1979', { o: { m: 'YEAR', d: '1979' } }), B('skylab', 700, 300, 2.0, 'u4:skylab', { mv: [['u4:fell+0.8', 1000, 520]], morph: ['u4:pieces', 'fireball'] }), B('australia', 1420, 620, 2.2, 'u4:western', { hit: ['u4:australia'] }), A('check', 1650, 280, 1.3, 'u4:nobody')],
      fx: [['stream', 1, 2, 'u4:landed', 'u4:australia+1', { col: '#ffb35c', n: 8 }]], lab: [['SKYLAB FELL IN 1979 · NOBODY WAS HURT', 'u4:nobody', 960, 965, '#9be3a5', 28]] },
  ], 'w1'));
}
// ---------- 7 why we still need it ----------
function sWhy(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('w1', [B('webb', 760, 540, 2.2, 'w1+0.2'), HB(1150, 540, 1.4, 'w1:newer')]),
    { at: 'w2', cast: [B('webb', 400, 480, 2.4, 'w2:james', { pulse: ['w2:bigger'] }), HB(1050, 280, 1.3, 'w2:bigger'), B('irW', 1050, 620, 2.0, 'w2:infrared'), A('flame', 1560, 560, 1.7, 'w2:heat')],
      fx: [['stream', 2, 0, 'w2:infrared', 'w2>', { col: '#ff8f6a', n: 8 }]], lab: [['MOSTLY INFRARED', 'w2:infrared', 1050, 965, '#ff9fb4', 30]] },
    { at: 'w2b', cast: [A('calDay', 260, 250, 1.4, 'w2b:launched', { o: { m: 'DEC', d: '2021' } }), A('globeP', 300, 720, 1.6, 'w2b:sits'), B('webb', 600, 480, 2.0, 'w2b', { mv: [['w2b:away+0.5', 1650, 420]] }), A('wrench', 650, 800, 1.4, 'w2b:repair', { morph: ['w2b:crew', 'cross'] })],
      fx: [['stream', 1, 2, 'w2b:one', 'w2b>', { col: '#8fd8e6', n: 10, arc: 40 }]], lab: [['6.5 M MIRROR', 'w2b:six', 600, 180, GOLD, 30]], num: [['w2b:one', 1150, 850, '1.5 M KM', 'FROM EARTH']] },
    { at: 'w3', cast: [HB(400, 480, 2.0, 'w3:hubble', { pulse: ['w3:sees'] }), B('visL', 900, 300, 1.6, 'w3:visible'), B('uv', 900, 640, 1.8, 'w3:ultraviolet'), A('starB', 1350, 260, 1.5, 'w3:hot'), B('comet', 1650, 500, 1.5, 'w3:comets'), A('planet', 1350, 740, 1.5, 'w3:auroras')],
      fx: [['stream', 2, 0, 'w3:ultraviolet', 'w3:no', { col: '#b48cff', n: 8 }]], lab: [['ONLY HUBBLE DOES THIS NOW', 'w3:no', 960, 965, GOLD, 30]] },
    { at: 'w3b', cast: [HB(380, 480, 1.8, 'w3b', { pulse: ['w3b:eyes'] }), A('starB', 1250, 480, 2.6, 'w3b:stars'), A('planet', 950, 480, 1.6, 'w3b:planets', { mv: [['w3b:front+1.2', 1550, 480]], z: 2 })],
      fx: [['stream', 1, 0, 'w3b:air', 'w3b>', { col: '#b48cff', n: 9 }]], lab: [['READING THE AIR OF OTHER WORLDS', 'w3b:study', 960, 965, GOLD, 30]] },
    { at: 'w4', cast: [B('galaxies', 380, 480, 2.0, 'w4:universe'), A('puzzle', 800, 480, 2.4, 'w4', { o: { col: '#5b4fd6' }, hw: 70, hh: 70 }), HB(1150, 480, 1.8, 'w4', { mv: [['w4:gap', 1650, 260, 60]], grey: 'w4:gap' }), A('puzzle', 0, 0, 1.4, 'w4:losing', { o: { col: '#ffd98a' }, follow: { i: 2, dx: 0, dy: 150 }, hw: 70, hh: 70 })],
      tag: [['A GAP IN OUR VIEW', 'w4:gap', 800, 965, '#9b3352', 36]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night'); earthBG(0.2)(t);
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [HB(760, 480, 2.4, 'o1+0.2')]),
    { at: 'o2', cast: [A('piggy', 330, 480, 1.8, 'o2:money'), A('factory', 760, 480, 1.8, 'o2:company'), B('rescuer', 760, 480, 1.4, 'o2:build', { mv: [['o2:time', 1150, 400, 60]] }), A('stopwatch', 1150, 680, 1.4, 'o2:time'), A('docV', 1600, 480, 1.8, 'o2:decides', { o: { title: 'DECISION', ticks: 0 } })],
      fx: [['stream', [960, 160], 4, 'o2:ideas', 'o2>', { ic: 'bulb', s: 0.32, n: 5 }]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [HB(430, 420, 1.9, 'o3', { pulse: ['o3:second', 'o3:life'], o: tt => ({ ring: 1, glow: tt > T('o3:falling') && tt < T('o3:next') }) }), B('rescuer', 300, 760, 1.4, 'o3:second', { mv: [['o3:life+0.5', 150, 470, 40]] })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'HUBBLE IS FALLING', 'CAN ANYONE SAVE IT?', 1300, 58, 72);
}
const CHAPTERS = [['f1', 'Why orbits decay', 'night', 'sunI'], ['h1', 'Thirty-six years of Hubble', 'indigo', 'hubbleI'], ['s1', 'The telescope that fell', 'night', 'swift'], ['t1', 'The deadline', 'grey', 'calendarH'], ['v1q', 'Three ways to go', 'night', 'rescuer'], ['u1', 'If Hubble falls', 'night', 'fireball'], ['w1', 'Why we still need it', 'indigo', 'webb']];
function SECTIONS() { return makeSections(CHAPTERS, { f1: [sDecay, 'f2'], h1: [sHistory, 'h2'], s1: [sSwift, 's2'], t1: [sDeadline, 't2'], v1q: [sOptions, 'v2'], u1: [sFall, 'u2'], w1: [sWhy, 'w2'] }, sOpen, sOutro); }
