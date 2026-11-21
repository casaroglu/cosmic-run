// "The hidden cholesterol 1 in 5 people inherit" — Lp(a) — topic file (engine + common.js cast system + icons2.js)
// Visual rework 2026-11-21: every phrase gets its own icon; particles, cells, drugs and organs act on each other.
function kringles(t, ax, ay, r, k) {   // the apo(a) tail: a floppy chain of kringle beads (k 0..1 = how much has grown)
  const n = Math.round(9 * clamp(k)); if (!n) return; let px = ax, py = ay; const pts = [[px, py]];
  for (let i = 0; i < n; i++) { const a = 0.55 + Math.sin(t * 2.2 + i * 0.75) * 0.5; px += Math.cos(a) * r * 0.27; py += Math.sin(a) * r * 0.2; pts.push([px, py]); }
  ctx.strokeStyle = '#b8325e'; ctx.lineWidth = r * 0.09; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
  pts.slice(1).forEach(([x, y], i) => { circ(x, y, r * 0.15, '#e2457a'); circ(x, y, r * 0.075, '#ff9fb4'); if (i === n - 1) circ(x - r * 0.04, y - r * 0.05, r * 0.035, '#ffffff'); });
}
function particle(t, x, y, r, o = {}) {   // an LDL particle: yellow lipid core, blue apoB band, little face; o.tail adds the apo(a) chain; o.bad frowns
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 0.8 + x * 0.01) * 0.12);
  if (o.tail) kringles(t, r * 0.6, r * 0.5, r, o.tail);
  circ(0, 0, r, '#f2b544'); circ(0, 0, r * 0.86, '#ffd36b');
  for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * 0.2; circ(Math.cos(a) * r * 0.93, Math.sin(a) * r * 0.93, r * 0.07, '#fff1c8'); }
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * 0.9, 0, 6.283); ctx.clip(); ctx.rotate(-0.55); rr2(-r * 1.1, r * 0.28, r * 2.2, r * 0.24, r * 0.12, '#5b8dd6'); ctx.restore();
  for (let i = 0; i < 5; i++) { const a = i * 1.3 + 0.4; circ(Math.cos(a) * r * 0.42, Math.sin(a) * r * 0.42 - r * 0.05, r * 0.09, 'rgba(255,150,60,0.55)'); }
  const b = 1 - blinkF(t + x * 0.003); ell(-r * 0.22, -r * 0.12, r * 0.08, r * 0.1 * b + 0.6, '#5a3410'); ell(r * 0.22, -r * 0.12, r * 0.08, r * 0.1 * b + 0.6, '#5a3410');
  if (o.bad) { rr2(-r * 0.36, -r * 0.34, r * 0.24, r * 0.07, r * 0.035, '#5a3410'); rr2(r * 0.12, -r * 0.34, r * 0.24, r * 0.07, r * 0.035, '#5a3410'); }
  else { ctx.strokeStyle = '#9b5a1a'; ctx.lineWidth = r * 0.05; ctx.beginPath(); ctx.arc(0, r * 0.04, r * 0.16, 0.3, 2.84); ctx.stroke(); }
  rr2(-r * 0.62, -r * 0.7, r * 0.5, r * 0.14, r * 0.07, 'rgba(255,255,255,0.6)'); ctx.restore();
}
function dropS(t, c1, c2) { const s = 1 + 0.05 * Math.sin(t * 3); ctx.save(); ctx.translate(0, -8); ctx.scale(s, 1 / s);
  ctx.fillStyle = c1; ctx.beginPath(); ctx.moveTo(0, -64); ctx.bezierCurveTo(26, -26, 50, -2, 50, 22); ctx.arc(0, 22, 50, 0, Math.PI); ctx.bezierCurveTo(-50, -2, -26, -26, 0, -64); ctx.fill();
  ell(4, 30, 36, 34, c2); rr2(-30, -4, 12, 30, 6, 'rgba(255,255,255,0.5)'); eyes(t, 2, 22, 14, 5, '#20232f', 0.6); ctx.restore(); }
function flagWave(t, w, h, paint) { const n = 14; for (let i = 0; i < n; i++) { const x = -w / 2 + i * w / n, dy = Math.sin(t * 4 - i * 0.6) * 6; ctx.save(); ctx.beginPath(); ctx.rect(x, -h / 2 + dy - 1, w / n + 1, h + 2); ctx.clip(); ctx.translate(0, dy); paint(); ctx.restore(); } }
Object.assign(ICONS, {
  ldlP(t, o) { particle(t, 0, 0, 56, { bad: o.bad }); },
  lpaP(t, o) { particle(t, -28, -16, 48, { tail: o.tail ?? 1, bad: o.bad }); },
  tailK(t) {   // a free apo(a) chain, wriggling
    ctx.strokeStyle = '#b8325e'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); const P = [];
    for (let i = 0; i < 9; i++) { const x = -76 + i * 19, y = Math.sin(t * 3 + i * 0.8) * 24; P.push([x, y]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    P.forEach(([x, y]) => { circ(x, y, 13, '#e2457a'); circ(x, y, 6, '#ff9fb4'); }); },
  liver(t) {   // the liver: big right lobe, smaller left lobe, gallbladder underneath; it ships tiny particles out
    const b = 1 + 0.02 * Math.sin(t * 1.8); ctx.save(); ctx.scale(b, b);
    ell(-34, 40, 13, 19, '#5aa96a', 0.3);
    ctx.fillStyle = '#9b3a3a'; ctx.beginPath(); ctx.moveTo(-88, -14); ctx.bezierCurveTo(-86, -58, 10, -64, 84, -46); ctx.bezierCurveTo(100, -40, 94, -20, 72, -10); ctx.bezierCurveTo(30, 14, -10, 48, -52, 46); ctx.bezierCurveTo(-82, 42, -92, 16, -88, -14); ctx.fill();
    ctx.fillStyle = '#b8504a'; ctx.beginPath(); ctx.moveTo(-78, -16); ctx.bezierCurveTo(-74, -50, 0, -54, 20, -46); ctx.bezierCurveTo(10, -10, -20, 26, -50, 36); ctx.bezierCurveTo(-74, 32, -82, 10, -78, -16); ctx.fill();
    ctx.fillStyle = '#c96a5e'; ctx.beginPath(); ctx.moveTo(24, -46); ctx.bezierCurveTo(50, -48, 80, -44, 82, -34); ctx.bezierCurveTo(70, -20, 50, -12, 30, -4); ctx.bezierCurveTo(26, -20, 22, -36, 24, -46); ctx.fill();
    rr2(-60, -42, 40, 9, 4.5, 'rgba(255,255,255,0.35)'); ctx.restore();
    for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= Math.sin(p * Math.PI); circ(70 + p * 40, -10 - p * 50, 9, '#ffd36b'); ctx.restore(); } },
  truckP(t) {   // a delivery truck: blue protein wrapper with fat blobs inside, wheels turning, exhaust puffs
    const b = Math.abs(Math.sin(t * 8)) * 2; puff(t, -96, 18, 3, 0, 'rgba(255,255,255,0.5)', 9);
    ctx.save(); ctx.translate(0, -b); rr2(-90, -54, 122, 84, 14, '#3f6fc0'); rr2(-82, -46, 106, 66, 10, '#5b8dd6');
    for (let i = 0; i < 5; i++) circ(-64 + i * 20, -14 + (i % 2) * 14, 10, i % 2 ? '#ffd36b' : '#f2b544');
    rr2(36, -30, 52, 60, 14, '#ff8f4a'); rr2(52, -22, 28, 22, 6, '#bfefff'); rr2(-80, -44, 34, 8, 4, 'rgba(255,255,255,0.45)'); ctx.restore();
    wheel(t, -54, 38, 17); wheel(t, 58, 38, 17); },
  fatDrop(t) { dropS(t, '#f2b544', '#ffd36b'); },
  bloodDrop(t) { dropS(t, '#b02a3d', '#d64550'); },
  foamC(t, o) {   // an immune cell (macrophage) swelling up with swallowed fat
    const f = o.fat ?? 1, R = 1 + 0.22 * f; ctx.save(); ctx.scale(R, R); ctx.fillStyle = '#ff9fb4'; ctx.beginPath();
    for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.283, r = 52 + Math.sin(a * 5 + t * 2) * 7; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.85); } ctx.fill(); circ(0, 0, 38, '#ffb8c8');
    for (let i = 0; i < Math.round(9 * f); i++) { const a = i * 2.1, r = 12 + (i % 3) * 9; circ(Math.cos(a) * r, Math.sin(a) * r * 0.8 + 6, 7 + (i % 2) * 2, '#ffd36b'); }
    eyes(t, 0, -18, 12, 5, '#20232f', 0.2); ctx.restore(); },
  chomper(t) {   // the clot-dissolving protein: a green chomper with kringle beads on its back
    const m = 0.15 + 0.35 * Math.abs(Math.sin(t * 6)); for (let i = 0; i < 4; i++) { circ(-50 + i * 10, -46 + i * 2, 11, '#e2457a'); circ(-50 + i * 10, -46 + i * 2, 5, '#ff9fb4'); }
    ctx.fillStyle = '#3fae6a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 54, m, 6.283 - m); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#5fd38a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 44, m + 0.1, 6.283 - m - 0.1); ctx.closePath(); ctx.fill(); eyes(t, -6, -26, 0.01, 6, '#102348'); rr2(-36, -10, 10, 22, 5, 'rgba(255,255,255,0.4)'); },
  clot(t) {   // a blood clot: red cells caught in fibrin strands, platelets glued in
    const p = 1 + 0.03 * Math.sin(t * 2.4); ctx.save(); ctx.scale(p, p); [[-26, -16], [20, -24], [-6, 18], [32, 16], [-36, 22], [6, -44]].forEach(([x, y], i) => rbcDisc(x, y, 26, 0.75, i + Math.sin(t + i) * 0.1));
    ctx.strokeStyle = 'rgba(255,240,240,0.85)'; ctx.lineWidth = 3.5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-60, -40 + i * 22); ctx.quadraticCurveTo(0, -30 + i * 20 + Math.sin(t * 2 + i) * 8, 60, -46 + i * 24); ctx.stroke(); }
    for (const [x, y] of [[-14, -2], [14, 4], [40, -6]]) circ(x, y, 7, '#ffd98a'); ctx.restore(); },
  valveA(t, o) {   // aortic valve seen from above: three leaflets that open and shut; o.calc stiffens them with calcium
    const c = clamp(o.calc || 0), op = (0.2 + 0.8 * Math.max(0, Math.sin(t * 4))) * (1 - 0.75 * c); circ(0, 0, 66, '#c95a7c'); circ(0, 0, 54, '#7a1f33');
    circ(0, 0, 50 * op, '#d64550'); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * 2.094 - 1.57); ctx.fillStyle = c > 0.5 ? '#e8d8d0' : '#f2b3c0'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 54, -1.0, 1.0); ctx.closePath();
      ctx.save(); ctx.translate(op * 18, 0); ctx.fill(); for (let j = 0; j < Math.round(4 * c); j++) circ(18 + j * 8, -14 + j * 9, 6, '#ffffff'); ctx.restore(); ctx.restore(); }
    rr2(-40, -50, 28, 9, 4.5, 'rgba(255,255,255,0.35)'); },
  calcium(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.6) * 0.1); poly([[-50, 20], [-30, -30], [0, -10], [-10, 40]], '#f3f7fb'); poly([[-30, -30], [0, -10], [-4, -40]], '#dfe7f2');
    poly([[0, 30], [10, -40], [46, -20], [40, 34]], '#e8eef6'); poly([[10, -40], [46, -20], [30, -56]], '#c9d6ec'); poly([[-20, 56], [10, 30], [30, 50]], '#dfe7f2'); ctx.restore(); glint(t, 50, 56); },
  apeG(t) {   // a gorilla face
    circ(0, -6, 58, '#3a3a44'); rr2(-30, -70, 60, 26, 13, '#2a2a32'); circ(-56, -4, 16, '#3a3a44'); ell(0, 14, 40, 34, '#6a5e60'); rr2(-36, -26, 72, 14, 7, '#2a2a32');
    const bl = 1 - blinkF(t + 1.1); circ(-16, -12, 6 * bl + 0.5, '#20232f'); circ(16, -12, 6 * bl + 0.5, '#20232f'); ell(-8, 12, 6, 4, '#2a2a32'); ell(8, 12, 6, 4, '#2a2a32'); rr2(-16, 30, 32, 5, 2.5, '#2a2a32'); circ(56, -4, 16, '#3a3a44'); },
  hedgehog(t) { const b = Math.abs(Math.sin(t * 3)) * 3; ctx.save(); ctx.translate(0, -b); ctx.fillStyle = '#7a5a3a'; for (let i = 0; i < 14; i++) { const a = Math.PI + i / 13 * Math.PI; ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.1) * 50, Math.sin(a - 0.1) * 40); ctx.lineTo(Math.cos(a) * 82, Math.sin(a) * 70); ctx.lineTo(Math.cos(a + 0.1) * 50, Math.sin(a + 0.1) * 40); ctx.fill(); }
    ctx.fillStyle = '#9a7a5a'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 46, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e9c7a0'; ctx.beginPath(); ctx.ellipse(56, 14, 34, 24, 0.3, 0, 6.283); ctx.fill(); circ(86, 20, 7, '#20232f'); circ(60, 4, 4.5 * (1 - blinkF(t)) + 0.5, '#20232f'); rr2(-40, 40, 14, 14, 6, '#e9c7a0'); rr2(24, 40, 14, 14, 6, '#e9c7a0'); ctx.restore(); },
  dice(t) { ctx.save(); ctx.rotate(Math.sin(t * 2.2) * 0.35); rr2(-52, -52, 104, 104, 20, '#dfe7f2'); rr2(-52, -52, 96, 96, 20, '#f3f7fb'); for (const [x, y] of [[-24, -24], [24, -24], [0, 0], [-24, 24], [24, 24]]) circ(x - 4, y - 4, 9, x === 0 ? '#e2457a' : '#102348'); rr2(-40, -44, 30, 8, 4, 'rgba(255,255,255,0.8)'); ctx.restore(); },
  geneBar(t, o) {   // a stretch of DNA seen sideways; o.n = number of repeat blocks (pink rungs)
    const n = o.n ?? 6, st = Math.max(1, Math.round((15 - n) / 2)); for (let i = 0; i < 16; i++) { const x = -92 + i * 12.3, ph = t * 2 + i * 0.55, y = Math.sin(ph) * 34, rep = i >= st && i < st + n, hot = rep && Math.sin(t * 5 - i) > 0.6;
      rr2(x - 3, -Math.abs(y), 6, 2 * Math.abs(y), 3, rep ? (hot ? '#ffb8c8' : '#e2457a') : '#8fd8e6'); circ(x, y, 8, '#3a7bd5'); circ(x, -y, 8, '#9be3a5'); } },
  runner(t, o) { const c = o.col || '#3fae6a', sk = SK[o.skin || 0], ph = t * 9, b = Math.abs(Math.sin(ph)) * 6; ctx.save(); ctx.translate(0, -b);
    for (const s of [1, -1]) { ctx.save(); ctx.translate(0, 26); ctx.rotate(Math.sin(ph) * 0.7 * s); rr2(-9, 0, 18, 46, 9, '#2d2b7c'); ctx.restore(); }
    ctx.save(); ctx.rotate(0.15); rr2(-26, -30, 52, 64, 22, c); ctx.restore(); for (const s of [1, -1]) { ctx.save(); ctx.translate(2, -16); ctx.rotate(-Math.sin(ph) * 0.9 * s); rr2(-7, 0, 14, 40, 7, sk); ctx.restore(); }
    circ(8, -54, 26, sk); ctx.fillStyle = '#4a2c22'; ctx.beginPath(); ctx.arc(8, -60, 27, Math.PI * 1.05, -0.05); ctx.fill(); eyes(t, 14, -54, 9, 4); ctx.restore(); },
  plateG(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.3) * 0.05); ell(0, 14, 86, 32, '#f3f7fb'); ell(0, 12, 66, 22, '#e8eef6'); circ(-26, -2, 20, '#5aa96a'); circ(4, -10, 18, '#8cc764'); circ(30, -2, 16, '#ff6f5a'); circ(12, 8, 13, '#ffd36b'); ctx.restore(); puff(t, 0, -24, 2, -1, 'rgba(255,255,255,0.45)', 8); },
  pill2(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 2) * 0.2); rr2(-62, -26, 62, 52, 26, '#5b4fd6'); rr2(0, -26, 62, 52, 26, '#f3f7fb'); rr2(-48, -16, 34, 10, 5, 'rgba(255,255,255,0.45)'); ctx.restore(); },
  labPanel(t, o) {   // a standard lipid panel: LDL, HDL, triglycerides — and a blank where Lp(a) would be; o.lpa fills it, o.hiLDL bumps LDL up
    ctx.save(); ctx.rotate(Math.sin(t * 1.3) * 0.04); rr2(-62, -78, 124, 156, 10, '#f3f7fb'); rr2(-62, -78, 124, 26, 10, '#3a7bd5'); font(13, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('LIPID PANEL', 0, -64);
    [['LDL', o.hiLDL ? 0.85 : 0.55, o.hiLDL ? '#e2457a' : '#5b8dd6'], ['HDL', 0.5, '#5b8dd6'], ['TG', 0.4, '#5b8dd6']].forEach(([n, v, c], i) => { const y = -36 + i * 28; font(13, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'left'; ctx.fillText(n, -52, y); rr2(-14, y - 6, 62, 12, 6, '#dfe7f2'); rr2(-14, y - 6, 62 * v * (0.96 + 0.04 * Math.sin(t * 3 + i)), 12, 6, c); });
    const y = 50; if (o.lpa) { font(13, 700); ctx.fillStyle = '#9b3352'; ctx.textAlign = 'left'; ctx.fillText('Lp(a)', -52, y); rr2(-14, y - 6, 62, 12, 6, '#dfe7f2'); rr2(-14, y - 6, 58, 12, 6, '#e2457a'); }
    else { const on = Math.sin(t * 5) > 0; rr2(-52, y - 12, 104, 24, 8, on ? '#ffe3ea' : '#eef2f8'); font(18, 700); ctx.fillStyle = '#e2457a'; ctx.textAlign = 'center'; ctx.fillText('?', 0, y + 1); } ctx.restore(); },
  flagR(t) { rr2(-60, -70, 10, 146, 5, '#c9d6ec'); circ(-55, -72, 8, '#ffd98a'); ctx.save(); ctx.translate(4, -34); flagWave(t, 108, 66, () => { rr2(-54, -33, 108, 66, 6, '#e2457a'); rr2(-54, -33, 108, 14, 6, '#ff6f8a'); }); ctx.restore(); },
  flagEU(t) { rr2(-60, -70, 10, 146, 5, '#c9d6ec'); ctx.save(); ctx.translate(6, -30); flagWave(t, 108, 72, () => { rr2(-54, -36, 108, 72, 6, '#2b4fb8'); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; ICONS_star(Math.cos(a) * 24, Math.sin(a) * 24, 5); } }); ctx.restore(); },
  flagCA(t) { rr2(-60, -70, 10, 146, 5, '#c9d6ec'); ctx.save(); ctx.translate(6, -30); flagWave(t, 108, 72, () => { rr2(-54, -36, 108, 72, 6, '#f3f7fb'); rr2(-54, -36, 27, 72, 6, '#d6283a'); rr2(27, -36, 27, 72, 6, '#d6283a');
    poly([[0, -22], [5, -10], [14, -14], [10, 2], [18, 4], [6, 12], [2, 22], [-2, 22], [-6, 12], [-18, 4], [-10, 2], [-14, -14], [-5, -10]], '#d6283a'); }); ctx.restore(); },
  cig(t, o) { ctx.save(); ctx.rotate(-0.25); rr2(-70, -12, 110, 24, 8, '#f3f7fb'); rr2(-70, -12, 34, 24, 8, '#e8a35a'); const g = 0.6 + 0.4 * Math.sin(t * 7); rr2(36, -12, 14, 24, 6, `rgba(255,${90 + 60 * g | 0},60,1)`); ctx.restore(); puff(t, 46, -30, 3, -1, 'rgba(220,225,235,0.6)', 12); },
  glucoM(t) { rr2(-46, -64, 92, 128, 22, '#5b4fd6'); rr2(-34, -50, 68, 46, 10, '#bfefff'); font(26, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(90 + Math.round(10 * Math.sin(t * 1.3))), 0, -27);
    rr2(-10, 64, 20, 20, 4, '#f3f7fb'); circ(0, 20, 12, '#8f86f0'); const p = (t * 0.7) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; ctx.translate(0, 96 - 10 * p); ctx.scale(0.18, 0.18); dropS(t, '#b02a3d', '#d64550'); ctx.restore(); },
  factory(t, o) { const off = o.off ? 1 : 0; rr2(-76, -10, 152, 70, 6, off ? '#6a7080' : '#8a92a8'); poly([[-76, -10], [-76, -40], [-36, -10]], off ? '#5b6070' : '#7a8296'); poly([[-36, -10], [-36, -40], [4, -10]], off ? '#5b6070' : '#7a8296'); rr2(30, -72, 22, 66, 4, off ? '#5b6070' : '#a8566a');
    for (let i = 0; i < 4; i++) rr2(-62 + i * 34, 10, 22, 22, 4, off ? '#3a3f5a' : '#ffd98a'); rr2(-12, 32, 24, 28, 4, '#3a3f5a'); if (!off) puff(t, 41, -80, 3, -1, 'rgba(230,235,245,0.6)', 13); },
  mrna(t) {   // the gene's message (RNA): a wriggling strand of coloured bases
    const C = ['#ffd98a', '#e2457a', '#8fd8e6', '#9be3a5']; for (let i = 0; i < 13; i++) { const x = -84 + i * 14, y = Math.sin(t * 3 + i * 0.6) * 22; rr2(x - 4, y - 30, 8, 26, 4, C[i % 4]); circ(x, y, 9, '#f3f7fb'); } },
  apher(t) { rr2(-70, -80, 140, 160, 18, '#e8eef6'); rr2(-50, -60, 100, 60, 10, '#102348'); ctx.strokeStyle = '#7ff3a0'; ctx.lineWidth = 4; ctx.beginPath(); for (let x = -44; x <= 44; x += 4) ctx.lineTo(x, -30 + Math.sin(x * 0.2 + t * 6) * 10); ctx.stroke();
    const p = (t * 0.8) % 1; circ(-40, 40, 14, '#c33244'); circ(0, 40, 14, '#ffd36b'); circ(40, 40, 14, '#c33244'); circ(lerp(-40, 40, p), 40, 6, '#fff'); rr2(-58, -74, 30, 8, 4, 'rgba(255,255,255,0.7)'); },
  bottleN(t) { ctx.save(); ctx.rotate(Math.sin(t * 9) * 0.05 * Math.max(0, Math.sin(t * 1.4))); rr2(-40, -40, 80, 104, 16, '#ff8f4a'); rr2(-46, -64, 92, 30, 10, '#f3f7fb'); rr2(-30, -8, 60, 46, 8, '#f3f7fb');
    font(26, 700); ctx.fillStyle = '#9b3352'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('B3', 0, 16); rr2(-32, -30, 12, 36, 6, 'rgba(255,255,255,0.35)'); ctx.restore(); },
  familyT(t) { ctx.scale(0.75, 0.75); [[0, -60, '#ffd98a'], [-70, 20, '#8fd8e6'], [70, 20, '#e2457a'], [-100, 90, '#b48cff'], [-40, 90, '#ffd98a'], [40, 90, '#8fd8e6'], [100, 90, '#e2457a']].forEach(([x, y, c], i) => { if (i) { ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(i < 3 ? 0 : (i < 5 ? -70 : 70), i < 3 ? -60 : 20); ctx.stroke(); } });
    [[0, -60, '#ffd98a'], [-70, 20, '#8fd8e6'], [70, 20, '#e2457a'], [-100, 90, '#b48cff'], [-40, 90, '#ffd98a'], [40, 90, '#8fd8e6'], [100, 90, '#e2457a']].forEach(([x, y, c], i) => { const p = 1 + 0.12 * Math.max(0, Math.sin(t * 3 - i)); circ(x, y, 22 * p, c); circ(x - 6, y - 7, 6 * p, 'rgba(255,255,255,0.45)'); }); },
});
Object.assign(IDLE, { ldlP: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.06) }, lpaP: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.05) }, tailK: {}, liver: {}, truckP: {}, fatDrop: {}, bloodDrop: {}, foamC: {}, chomper: {}, clot: {}, valveA: {},
  calcium: {}, apeG: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.05) }, hedgehog: {}, dice: {}, geneBar: {}, runner: {}, plateG: {}, pill2: {}, labPanel: { post: t => glint(t, 62, 78, 3.1) }, flagR: {}, flagEU: {}, flagCA: {}, cig: {}, glucoM: {}, factory: {}, mrna: {}, apher: {}, bottleN: {}, familyT: {} });
const LPA = { o: { txt: 'Lp(a)' } };

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [A('lpaP', 440, 540, 2.3, 'c1:kind', { hw: 80, hh: 70 }), A('crowd', 960, 560, 2.0, 'c1:people'), A('tubeB', 1450, 540, 2.0, 'c1:never', { o: { txt: '?' }, shake: ['c1:tested', 0.8] })] },
    { at: 'c2', cast: [A('lpaP', 700, 500, 3.0, 'c2:lipoprotein', { hw: 80, hh: 70, o: tt => ({ tail: clamp((tt - T('c2:little')) / 1.2) }) }), A('tailK', 1450, 300, 1.8, 'c2:called', { mv: [['c2:little', 900, 500, 60]], out: 'c2:little+0.9' }), A('tubeB', 1480, 560, 2.0, 'c2:written', { o: { txt: 'Lp(a)' }, pulse: ['c2:brackets'] })],
      tag: [['LIPOPROTEIN(a) · "LP LITTLE A"', 'c2:written', 960, 965, '#9b3352', 36]] },
    { at: 'c2:about', cast: [0, 1, 2, 3, 4].map(i => A('adult', 260 + i * 230, 620, 1.6, 'c2:people+' + (i * 0.1).toFixed(2), i === 4 ? { o: { col: '#e2457a' }, hit: ['c2:levels'], pulse: ['c2:it#1'] } : { o: { col: ['#5b4fd6', '#3fae6a', '#ff8f4a', '#127b84'][i] } }))
        .concat([A('lpaP', 1700, 560, 1.6, 'c2:about', { hw: 80, hh: 70, mv: [['c2:levels', 1180, 400]] })]),
      num: [['c2:five', 1530, 230, '1 IN 5', 'HAVE HIGH LEVELS']] },
    { at: 'c2:you', cast: [A('runner', 330, 540, 2.0, 'c2:slim'), A('plateG', 760, 520, 1.8, 'c2:eat'), A('tubeB', 1150, 540, 1.8, 'c2:normal', { o: { txt: 'LDL OK' } }), A('check', 1150, 270, 1.6, 'c2:cholesterol'),
      A('lpaP', 1620, 520, 2.0, 'c2:still', { hw: 80, hh: 70, glow: 'rgba(226,69,122,0.45)', pulse: ['c2:carry'] })],
      lab: [['AND STILL CARRY IT', 'c2:carry', 1620, 800, '#ff9fb4', 30]] },
    { at: 'c3', cast: [A('calDay', 330, 500, 2.0, 'c3:november', { o: { m: 'NOV', d: '7' } }), A('crowd', 780, 520, 2.0, 'c3:biggest'), A('syringeC', 1150, 300, 1.6, 'c3:drug', { mv: [['c3:against', 1300, 420]] }), A('lpaP', 1600, 540, 2.0, 'c3:against', { hw: 80, hh: 70, hit: ['c3:ended'], shake: ['c3:surprise', 0.8] })],
      lab: [['NOVEMBER 7, 2026', 'c3:november', 330, 800, GOLD, 30], ['BIGGEST TRIAL EVER', 'c3:biggest', 780, 800, WHITE, 28]] },
    { at: 'c3:drug#1', cast: [A('syringeC', 260, 300, 1.6, 'c3:drug#1', { mv: [['c3:cut', 470, 420]] }), A('chart', 700, 520, 2.3, 'c3:cut', { o: tt => ({ v: [0.85, 0.85 * (1 - 0.78 * clamp((tt - T('c3:three')) / 1.0))], hi: 1 }) }),
      A('heartR', 1200, 520, 2.0, 'c3:heart', { o: { pain: 1 }, pulse: ['c3:attacks'] }), A('brainS', 1600, 520, 1.9, 'c3:strokes', { o: { hot: 1 } })],
      lab: [['CUT BY MORE THAN 3/4', 'c3:three', 700, 800, '#9be3a5', 30], ['SAME NUMBER OF HEART ATTACKS + STROKES', 'c3:just', 1300, 965, '#ff9fb4', 28]] },
    QB('c4q', [A('lpaP', 760, 540, 2.4, 'c4q+0.2', { hw: 80, hh: 70, shake: ['c4q:stuff', 0.8] }), A('magnifier', 1220, 420, 1.6, 'c4q:what', { mv: [['c4q:stuff', 1020, 470]] })]),
    { at: 'c5', cast: [A('fatDrop', 360, 520, 2.0, 'c5:cholesterol', { mv: [['c5:travels+0.5', 900, 470, 140]], out: 'c5:travels+0.7' }), A('artery', 960, 260, 2.0, 'c5:start'), A('truckP', 1250, 560, 2.0, 'c5:travels', { hw: 90, hh: 56, mv: [['c5>', 1450, 560]] })] },
    { at: 'c5b', cast: [A('calDay', 330, 500, 2.0, 'c5b:discovered', { o: { m: 'YEAR', d: '1963', col: '#5b6585' } }), A('doctor', 760, 560, 2.0, 'c5b:norwegian'), A('magnifier', 1150, 330, 1.6, 'c5b:decades', { mv: [['c5b:curiosity', 1350, 430]] }),
      A('lpaP', 1560, 540, 1.8, 'c5b:curiosity', { hw: 80, hh: 70 })],
      lab: [['DISCOVERED 1963 · KÅRE BERG, NORWAY', 'c5b:1963', 760, 965, GOLD, 30]] },
    { at: 'c5b:only', cast: [A('hospital', 400, 520, 2.0, 'c5b:medicine'), A('lpaP', 960, 520, 2.6, 'c5b:only', { hw: 80, hh: 70, pulse: ['c5b:seriously'] }), A('docV', 1500, 520, 2.0, 'c5b:started', { o: tt => ({ title: 'GUIDELINES', ticks: Math.floor(clamp((tt - T('c5b:started')) / 1.2) * 4) }) })],
      lab: [['NOW TAKEN SERIOUSLY', 'c5b:seriously', 960, 965, WHITE, 30]] },
  ], 'b1'));
}
// ---------- 1 cholesterol's delivery trucks ----------
function sTrucks(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('b1', [A('fatDrop', 650, 540, 2.0, 'b1+0.2', { mv: [['b1>', 950, 500, 80]] }), A('runner', 1180, 560, 1.9, 'b1:body')]),
    { at: 'b2', cast: [A('fatDrop', 480, 500, 2.2, 'b2:fat', { mv: [['b2:mix', 760, 500, 40]], push: [['b2:blood', -320, -40]], hit: ['b2:blood'] }), A('bloodDrop', 1100, 520, 2.4, 'b2:doesn', { shake: ['b2:blood', 0.6] }),
      A('rbcD', 1550, 400, 1.6, 'b2:with'), A('rbcD', 1600, 680, 1.6, 'b2:blood')],
      lab: [['FAT DOESN\'T MIX WITH BLOOD', 'b2:mix', 960, 965, WHITE, 32]] },
    { at: 'b2:so', cast: [A('liver', 400, 540, 2.3, 'b2:liver', { hw: 92, hh: 64, pulse: ['b2:packs'] }), A('ldlP', 520, 480, 1.6, 'b2:particles', { mv: [['b2:particles+0.8', 880, 330, 80]] }),
      A('ldlP', 520, 560, 1.6, 'b2:called', { mv: [['b2:called+0.8', 960, 640, 80], ['b2:protein', 1460, 600]], morph: ['b2:delivery', 'truckP'], hw: 80, hh: 56 })],
      tag: [['LIPOPROTEINS = DELIVERY TRUCKS', 'b2:lipoproteins', 960, 965, '#5b4fd6', 36]] },
    { at: 'b3', cast: [A('ldlP', 560, 520, 2.8, 'b3:ldl', { o: tt => ({ bad: tt > T('b3:bad') }) }), A('ldlP', 1150, 320, 1.6, 'b3:too'), A('ldlP', 1480, 540, 1.6, 'b3:much'), A('ldlP', 1150, 720, 1.6, 'b3:it#1')],
      tag: [['LDL · "BAD CHOLESTEROL"', 'b3:bad', 560, 860, '#5b4fd6', 36]] },
    { at: 'b3:ldl#1', cast: [A('artery', 960, 560, 3.2, 'b3:ldl#1', { hw: 80, hh: 52, o: tt => ({ plaque: clamp((tt - T('b3:build')) / 1.0) }) }), A('ldlP', 330, 300, 1.6, 'b3:ldl#1', { mv: [['b3:slip', 880, 420, 60]], erase: 'b3:fatty' }),
      A('ldlP', 1600, 300, 1.6, 'b3:artery', { mv: [['b3:walls', 1060, 420, 60]], erase: 'b3:plaque' })],
      tag: [['FATTY PLAQUE', 'b3:plaque', 960, 965, '#9b3352', 38]] },
    { at: 'b4', cast: [A('artery', 680, 520, 3.2, 'b4', { hw: 80, hh: 52, o: tt => ({ plaque: 1, squeeze: 0.45 * clamp((tt - T('b4:narrows')) / 1.0), crack: tt > T('b4:cracks'), clot: clamp((tt - T('b4:clot')) / 1.4) }), shake: ['b4:cracks', 0.6] }),
      A('heartR', 1450, 340, 1.7, 'b4:heart', { o: { pain: 1 }, shake: ['b4:attack', 0.6] }), A('brainS', 1450, 700, 1.7, 'b4:stroke', { o: { hot: 1 } })],
      fx: [['zap', 0, 1, 'b4:heart', 0.6, '#ff9fb4'], ['zap', 0, 2, 'b4:stroke', 0.6, '#ff9fb4']], tag: [['PLAQUE CRACKS · A CLOT FORMS', 'b4:cracks', 680, 965, '#9b3352', 34]] },
    { at: 'b4b', cast: [A('artery', 1450, 300, 1.8, 'b4b:artery', { hw: 80, hh: 52, o: { plaque: 0.6 } }), A('ldlP', 1050, 420, 1.6, 'b4b:stuck', { erase: 'b4b:swallow+0.5' }), A('ldlP', 1050, 680, 1.6, 'b4b:particles', { erase: 'b4b:swell' }),
      A('macro', 420, 540, 2.3, 'b4b:immune', { mv: [['b4b:swallow+0.4', 860, 540, 60]], morph: ['b4b:swell', 'foamC'], grey: 'b4b:die' })],
      lab: [['IMMUNE CELLS SWALLOW IT · SWELL · DIE', 'b4b:immune', 760, 965, WHITE, 28]] },
    { at: 'b4b:layer', cast: [A('artery', 760, 520, 3.2, 'b4b:layer', { hw: 80, hh: 52, o: tt => ({ plaque: 0.25 + 0.75 * clamp((tt - T('b4b:layer')) / 2.6) }) }), A('foamC', 260, 330, 1.6, 'b4b:mess', { o: { fat: 1 }, grey: 'b4b:mess', mv: [['b4b:becomes', 640, 430, 60]], erase: 'b4b:plaque' }),
      A('hglass', 1560, 520, 1.9, 'b4b:quietly')],
      lab: [['LAYER BY LAYER', 'b4b:layer', 760, 965, GOLD, 32], ['OVER DECADES', 'b4b:decades', 1560, 800, WHITE, 30]] },
  ], 'l1'));
}
ICONS.vialP = function (t) { const sl = Math.sin(t * 3) * 3; rr2(-28, -40, 56, 96, 12, 'rgba(220,240,255,0.55)'); rr2(-24, -2 + sl * 0.3, 48, 54, 10, '#e8eef6'); rr2(-32, -62, 64, 26, 8, '#9fb0d8'); rr2(-20, -10, 10, 50, 5, 'rgba(255,255,255,0.5)'); bubbles(t, 0, 24, 36, 40, 3); glint(t, 28, 50); }; IDLE.vialP = { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.06) };
ICONS.rbcD = function (t) { rbcDisc(0, 0, 50, 0.8, t * 0.6); }; IDLE.rbcD = { pre: t => ctx.translate(Math.sin(t * 1.7) * 6, 0) };
// ---------- 2 the sticky tail ----------
function sTail(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('l1', [A('ldlP', 650, 540, 2.0, 'l1+0.2'), A('lpaP', 1150, 540, 2.2, 'l1+0.4', { hw: 80, hh: 70, pulse: ['l1:different'] })]),
    { at: 'l2', cast: [A('lpaP', 720, 520, 3.2, 'l2:ldl', { hw: 80, hh: 70, o: tt => ({ tail: 0.45 * clamp((tt - T('l2:attached')) / 0.8) + 0.55 * clamp((tt - T('l2:long')) / 1.0) }) }),
      A('tailK', 1500, 300, 1.9, 'l2:extra', { mv: [['l2:attached', 900, 560, 60]], out: 'l2:attached+0.7' }), A('ldlP', 1580, 640, 1.6, 'l2:particle')],
      tag: [['APOLIPOPROTEIN(a)', 'l2:called', 720, 965, '#e2457a', 36]], lab: [['LONG, FLOPPY TAIL', 'l2:floppy', 1550, 800, GOLD, 30]] },
    { at: 'l3', cast: [A('lpaP', 960, 540, 2.4, 'l3', { hw: 80, hh: 70, glow: 'rgba(226,69,122,0.35)', shake: ['l3:harmful', 0.6] }), A('skullX', 1500, 520, 1.6, 'l3:harmful')] },
    { at: 'l3:helps-0.2', cast: [A('artery', 400, 600, 2.4, 'l3:stick', { hw: 80, hh: 52, o: { plaque: 0.5 } }), A('lpaP', 400, 260, 1.6, 'l3:helps', { hw: 80, hh: 70, mv: [['l3:stick+0.3', 400, 440, 40]], hit: ['l3:stick+0.3'] }),
      A('lpaP', 1250, 520, 2.2, 'l3:carries', { hw: 80, hh: 70 }), A('flame', 0, 0, 1.6, 'l3:inflammatory', { orbit: { i: 2, r: 260, w: 1.3 } }), A('flame', 0, 0, 1.6, 'l3:molecules', { orbit: { i: 2, r: 260, w: 1.3, ph: 3.14 } })],
      lab: [['STICKS IN ARTERY WALLS', 'l3:stick', 400, 800, GOLD, 28], ['CARRIES INFLAMMATORY MOLECULES', 'l3:inflammatory', 1250, 965, WHITE, 28]] },
    { at: 'l3:looks', cast: [A('clot', 1250, 500, 2.3, 'l3:looks+0.3'), A('chomper', 400, 330, 1.8, 'l3:protein', { mv: [['l3:clots', 960, 430, 60]], push: [['l3:way', -40, -250]], hit: ['l3:way'] }),
      A('lpaP', 380, 680, 1.8, 'l3:so', { hw: 80, hh: 70, mv: [['l3:way', 900, 600, 60]] })],
      lab: [['LOOKS LIKE A CLOT-DISSOLVING PROTEIN', 'l3:looks', 800, 965, WHITE, 28]] },
    { at: 'l4', cast: [A('lpaP', 960, 300, 1.8, 'l4', { hw: 80, hh: 70 }), A('heartR', 380, 600, 1.9, 'l4:heart', { o: { pain: 1 } }), A('brainS', 960, 660, 1.8, 'l4:strokes', { o: { hot: 1 } }),
      A('valveA', 1540, 600, 1.9, 'l4:valve', { o: tt => ({ calc: clamp((tt - T('l4:aortic')) / 1.2) }) })],
      fx: [['zap', 0, 1, 'l4:heart', 0.6, '#ff9fb4'], ['zap', 0, 2, 'l4:strokes', 0.6, '#ff9fb4'], ['zap', 0, 3, 'l4:narrowing', 0.6, '#ff9fb4']],
      lab: [['HEART ATTACKS', 'l4:heart', 380, 860, WHITE, 28], ['STROKES', 'l4:strokes', 960, 860, WHITE, 28], ['AORTIC STENOSIS', 'l4:aortic', 1540, 860, GOLD, 28]] },
    { at: 'l4:genetic', cast: [A('dna', 420, 520, 2.4, 'l4:genetic', { hw: 44, hh: 70 }), A('lpaP', 960, 520, 2.0, 'l4:suggest', { hw: 80, hh: 70 }), A('heartR', 1500, 520, 2.1, 'l4:cause', { o: { pain: 1 }, hit: ['l4:cause+0.5'] })],
      fx: [['stream', 0, 1, 'l4:suggest', 'l4>', { col: '#8fd8e6', n: 8 }], ['stream', 1, 2, 'l4:cause', 'l4>', { col: '#ff9fb4', n: 8 }]], lab: [['A CAUSE, NOT JUST A MARKER', 'l4:cause', 960, 965, GOLD, 32]] },
    { at: 'l4b', cast: [A('adult', 260, 620, 1.6, 'l4b:humans', { o: { col: '#3fae6a' } }), A('apeG', 620, 620, 1.6, 'l4b:apes'), A('monkeyF', 980, 620, 1.6, 'l4b:monkeys'), A('hedgehog', 1340, 630, 1.6, 'l4b:hedgehogs'),
      A('mouse', 1690, 640, 1.6, 'l4b:mice', { hit: ['l4b:don'], grey: 'l4b:hard' }),
      A('lpaP', 260, 300, 1.6, 'l4b:strangely', { hw: 80, hh: 70, mv: [['l4b:apes', 620, 300, 90], ['l4b:monkeys', 980, 300, 90], ['l4b:hedgehogs', 1340, 300, 90], ['l4b:mice', 1640, 330, 90], ['l4b:don', 1440, 260, 60]] })],
      lab: [['ALMOST NO ANIMALS HAVE IT · NOT MICE', 'l4b:animals', 960, 965, WHITE, 30]] },
    QB('m1q', [A('lpaP', 600, 540, 2.0, 'm1q+0.2', { hw: 80, hh: 70 }), A('heartR', 1100, 540, 2.0, 'm1q:know', { o: { pain: 1 } })], { fx: [['zap', 1, 2, 'm1q:cause', 0.6, '#ff9fb4']] }),
    { at: 'm2', cast: [A('flask', 400, 520, 2.0, 'm2:natural'), A('dna', 920, 520, 2.4, 'm2:genes', { hw: 44, hh: 70 }), A('baby', 1450, 540, 2.0, 'm2:born')],
      fx: [['stream', 1, 2, 'm2:born', 'm2:people', { col: '#8fd8e6', n: 8 }]], lab: [['A NATURAL EXPERIMENT', 'm2:natural', 400, 800, GOLD, 30]] },
    { at: 'm2:people', cast: [A('dice', 330, 520, 1.7, 'm2:volunteers', { shake: ['m2:randomly', 0.9] }), A('crowd', 820, 330, 1.7, 'm2:people'), A('crowd', 820, 690, 1.7, 'm2:high'),
      A('lpaP', 1250, 690, 1.6, 'm2:little', { hw: 80, hh: 70 }), A('heartR', 1620, 330, 1.6, 'm2:they'), A('heartR', 1620, 690, 1.6, 'm2:more', { o: { pain: 1 }, pulse: ['m2:disease'] })],
      fx: [['stream', 0, 1, 'm2:randomly', 'm2:life', { col: '#ffd98a', n: 6 }], ['stream', 0, 2, 'm2:assigned', 'm2:life', { col: '#ff9fb4', n: 6 }], ['stream', 3, 5, 'm2:disease', 'm2>', { col: '#ff9fb4', n: 6 }]],
      lab: [['MENDELIAN RANDOMIZATION', 'm2:mendelian', 960, 965, GOLD, 32]] },
    { at: 'm3', cast: [A('valveA', 520, 520, 2.8, 'm3:valve', { o: tt => ({ calc: clamp((tt - T('m3:calcium')) / 1.2) }), shake: ['m3:stiffens', 0.6] }), A('calcium', 960, 280, 1.6, 'm3:stiffens', { mv: [['m3:calcium+0.4', 700, 400, 60]], out: 'm3:heart' }),
      A('heartR', 1200, 560, 2.1, 'm3:heart', { o: { rate: 1.9 }, shake: ['m3:strain', 0.8] }), A('lpaP', 1620, 360, 1.6, 'm3:little', { hw: 80, hh: 70 })],
      fx: [['stream', 2, 0, 'm3:push', 'm3:little', { col: '#ff6f7a', n: 8 }], ['zap', 3, 0, 'm3:speed', 0.7, '#ff9fb4']], tag: [['AORTIC STENOSIS', 'm3:aortic', 520, 965, '#9b3352', 36]], lab: [['HIGH Lp(a) SPEEDS IT UP', 'm3:speed', 1450, 860, GOLD, 28]] },
  ], 'g1'));
}
// ---------- 3 it's in your genes ----------
function sGenes(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('g1', [A('plateG', 700, 540, 2.0, 'g1+0.2'), A('lpaP', 1150, 540, 2.0, 'g1+0.4', { hw: 80, hh: 70 })]),
    { at: 'g2', cast: [A('plateG', 300, 520, 1.7, 'g2', { grey: 'g2:no' }), A('dna', 760, 500, 2.6, 'g2:single', { hw: 44, hh: 70, pulse: ['g2:lpa'] }), A('familyT', 1450, 690, 1.8, 'g2:inherited', { hw: 80, hh: 64 })],
      fx: [['stream', 1, 2, 'g2:inherited', 'g2>', { col: '#ffd98a', n: 8 }]], tag: [['LPA GENE', 'g2:lpa', 760, 860, '#0b4f5c', 36]], num: [['g2:90', 1450, 280, '~90%', 'OF THE VARIATION IS INHERITED']] },
    { at: 'g2b', cast: [A('geneBar', 960, 250, 2.3, 'g2b:gene', { hw: 96, hh: 44, o: { n: 6 }, pulse: ['g2b:repeats'] }), A('geneBar', 560, 520, 1.8, 'g2b:few', { hw: 96, hh: 44, o: { n: 3 } }), A('geneBar', 560, 740, 1.8, 'g2b:dozens', { hw: 96, hh: 44, o: { n: 12 } }),
      A('lpaP', 1150, 560, 1.6, 'g2b:shorter', { hw: 80, hh: 70, o: { tail: 0.35 } }), A('tubeB', 1600, 560, 1.7, 'g2b:higher', { o: { txt: 'HIGH' }, pulse: ['g2b:levels'] })],
      fx: [['stream', 1, 3, 'g2b:shorter', 'g2b>', { col: '#ff9fb4', n: 6 }], ['stream', 3, 4, 'g2b:higher', 'g2b>', { col: '#ff9fb4', n: 6 }]],
      lab: [['FEWER REPEATS → SHORTER TAIL → HIGHER LEVELS', 'g2b:fewer', 1100, 965, GOLD, 28]] },
    { at: 'g3', cast: [A('lpaP', 960, 540, 2.4, 'g3', { hw: 80, hh: 70, pulse: ['g3:barely+0.3', 'g3:lower+0.3'] }), A('plateG', 300, 330, 1.7, 'g3:diet', { mv: [['g3:barely', 700, 430, 60]], push: [['g3:barely', -330, -40]] }),
      A('runner', 300, 720, 1.7, 'g3:exercise', { mv: [['g3:touch', 680, 650, 40]], push: [['g3:touch', -330, 20]] }), A('pill2', 1650, 340, 1.7, 'g3:statins', { mv: [['g3:lower', 1230, 450, 60]], push: [['g3:lower', 360, -40]] })],
      lab: [['DIET · EXERCISE · STATINS: BARELY', 'g3:statins', 960, 965, WHITE, 30]] },
    { at: 'g3:two', cast: [A('adult', 360, 560, 2.0, 'g3:two', { o: { col: '#3fae6a' } }), A('adult', 1560, 560, 2.0, 'g3:identical', { o: { col: '#3fae6a' } }),
      A('chart', 960, 520, 2.4, 'g3:levels', { o: tt => ({ v: [0.04, 0.04 + 0.96 * clamp((tt - T('g3:thousand')) / 0.8)], hi: 1 }) })],
      lab: [['SAME LIFESTYLE', 'g3:lifestyles', 360, 800, WHITE, 28], ['UP TO 1,000× APART', 'g3:thousand', 960, 965, GOLD, 32]] },
    { at: 'g3b', cast: [A('pill2', 340, 520, 1.9, 'g3b:statins', { mv: [['g3b:ldl', 680, 520, 60], ['g3b:lower#1', 1180, 520, 80]], push: [['g3b:lower#1', -260, -200]] }), A('ldlP', 860, 520, 1.8, 'g3b:cholesterol', { erase: 'g3b:ldl+0.2' }),
      A('lpaP', 1450, 520, 2.0, 'g3b:little', { hw: 80, hh: 70, hit: ['g3b:lower#1'], pulse: ['g3b:nudge', 'g3b:up'] })],
      lab: [['STILL KEY FOR LDL', 'g3b:important', 760, 800, GOLD, 30], ['MAY NUDGE IT UP', 'g3b:nudge', 1450, 800, '#ff9fb4', 30]] },
    { at: 'g4', cast: [A('globeP', 330, 500, 1.9, 'g4:ancestry'), A('adult', 760, 560, 1.9, 'g4:african', { o: { skin: 2, col: '#e2457a' } }), A('adult', 1180, 560, 1.9, 'g4:european', { o: { skin: 3, col: '#5b4fd6' } }),
      A('adult', 1600, 560, 1.9, 'g4:asian', { o: { skin: 1, col: '#3fae6a', hair: '#20232f' } }), A('lpaP', 760, 260, 1.6, 'g4:higher', { hw: 80, hh: 70, pulse: ['g4:levels'] })],
      lab: [['HIGHER ON AVERAGE IN AFRICAN ANCESTRY', 'g4:higher', 960, 965, GOLD, 30]] },
    QB('g5q', [A('kid', 640, 560, 2.0, 'g5q+0.2'), A('elder', 1100, 560, 2.0, 'g5q:older')], { fx: [['stream', 1, 2, 'g5q:change', 'g5q>', { col: '#ffd98a', n: 6 }]] }),
    { at: 'g6', cast: [A('lockR', 330, 520, 1.8, 'g6:fixed'), A('baby', 760, 540, 1.9, 'g6:childhood'), A('tubeB', 1180, 520, 1.9, 'g6:test', LPA), A('hglass', 1600, 520, 1.9, 'g6:life')],
      fx: [['stream', 1, 2, 'g6:test', 'g6>', { col: '#ff9fb4', n: 6 }], ['stream', 2, 3, 'g6:life', 'g6>', { col: '#ffd98a', n: 6 }]], lab: [['ONE TEST · FOR LIFE', 'g6:one', 1180, 800, GOLD, 32]] },
    { at: 'g6b', cast: [A('doctor', 300, 560, 1.9, 'g6b:experts'), A('adult', 720, 580, 1.8, 'g6b:parent', { o: { col: '#e2457a' } }), A('kid', 1110, 600, 1.8, 'g6b:children', { pulse: ['g6b:levels+0.6'] }),
      A('lpaP', 720, 280, 1.6, 'g6b:high', { hw: 80, hh: 70, mv: [['g6b:levels+0.6', 1110, 280, 90]] }), A('heartR', 1600, 330, 1.6, 'g6b:heart', { o: { pain: 1 } }), A('familyT', 1600, 700, 1.6, 'g6b:family', { hw: 80, hh: 64 })],
      lab: [['TEST CHILDREN TOO?', 'g6b:children', 1100, 900, GOLD, 30]] },
  ], 't1'));
}
// ---------- 4 the missing test ----------
function sTest(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('t1', [A('labPanel', 700, 540, 2.2, 't1+0.2'), A('tubeB', 1150, 540, 1.8, 't1+0.4', { o: { txt: '?' }, shake: ['t1:tested', 0.6] })]),
    { at: 't2', cast: [A('labPanel', 460, 520, 2.6, 't2:standard'), A('magnifier', 820, 330, 1.6, 't2:test', { mv: [['t2:measure', 560, 640]] }), A('lpaP', 1000, 560, 1.8, 't2:doesn', { hw: 80, hh: 70, shake: ['t2:measure', 0.6] }),
      A('doctor', 1550, 560, 2.0, 't2:doctor'), A('tubeB', 1300, 300, 1.6, 't2:order', { o: { txt: 'Lp(a)' }, pulse: ['t2:separately'] })],
      lab: [['MUST BE ORDERED SEPARATELY', 't2:separately', 1300, 965, '#ff9fb4', 30]] },
    { at: 't2b', cast: [A('labPanel', 460, 520, 2.6, 't2b:report', { o: tt => ({ hiLDL: tt > T('t2b:includes') }) }), A('ldlP', 1050, 330, 1.7, 't2b:ldl'), A('lpaP', 1050, 690, 1.7, 't2b:inside', { hw: 80, hh: 70, morph: ['t2b:look', 'ldlP'] }),
      A('adult', 1600, 560, 2.0, 't2b:someone', { o: { mood: 'stress' } })],
      fx: [['stream', 1, 0, 't2b:includes', 't2b:so', { col: '#ffd36b', n: 6 }], ['stream', 2, 0, 't2b:cholesterol', 't2b:so', { col: '#ff9fb4', n: 6 }]],
      lab: [['THE LDL NUMBER INCLUDES Lp(a)', 't2b:includes', 760, 965, GOLD, 30]] },
    { at: 't3', cast: [A('crowd', 420, 520, 2.1, 't3:everyone'), A('tubeB', 960, 520, 2.0, 't3:tested', LPA), A('check', 1450, 520, 1.8, 't3:once')],
      fx: [['stream', 0, 1, 't3:tested', 't3>', { col: '#ff9fb4', n: 8 }]], lab: [['TEST EVERYONE ONCE?', 't3:once', 960, 965, GOLD, 32]] },
    { at: 't3:european', cast: [A('flagEU', 330, 480, 1.8, 't3:european'), A('flagCA', 740, 480, 1.8, 't3:canadian'), A('docV', 1160, 500, 1.9, 't3:guidelines', { o: tt => ({ title: 'ALL ADULTS', ticks: Math.floor(clamp((tt - T('t3:recommend')) / 1.0) * 4) }) }),
      A('calDay', 1600, 480, 1.9, 't3:2024', { o: { m: 'U.S.', d: '2024' }, pulse: ['t3:backed'] })],
      fx: [['stream', 0, 2, 't3:recommend', 't3:2024', { col: '#ffd98a', n: 6 }], ['stream', 1, 2, 't3:recommend', 't3:2024', { col: '#ffd98a', n: 6 }]],
      lab: [['EUROPE · CANADA: TEST ALL ADULTS', 't3:all', 560, 800, WHITE, 28], ['U.S. NATIONAL LIPID ASSOCIATION · 2024', 't3:national', 1200, 965, GOLD, 28]] },
    { at: 't4', cast: [A('tubeB', 360, 540, 2.2, 't4:level', LPA), A('flagR', 1560, 330, 1.7, 't4:red', { shake: ['t4:flag', 0.6] }), A('lpaP', 960, 760, 1.6, 't4:level+0.3', { hw: 80, hh: 70 }), A('heartR', 1560, 740, 1.6, 't4:raises', { o: { pain: 1 } })],
      fx: [['zap', 2, 3, 't4:raises', 0.7, '#ff9fb4']], num: [['t4:50', 960, 400, '≥ 50 mg/dL', '≈ 125 nmol/L · A RED FLAG']] },
    { at: 't4b', cast: [A('flask', 300, 520, 1.9, 't4b:labs'), A('tubeB', 720, 520, 1.9, 't4b:milligrams', { o: { txt: 'mg/dL' } }), A('cross', 1010, 520, 1.6, 't4b:can'), A('tubeB', 1300, 520, 1.9, 't4b:nanomoles', { o: { txt: 'nmol/L' } }),
      A('magnifier', 1700, 330, 1.6, 't4b:check', { mv: [['t4b:unit#1', 1500, 420]] })],
      fx: [['zap', 1, 3, 't4b:convert', 0.6, '#ffd98a']], lab: [['NO SIMPLE CONVERSION', 't4b:convert', 1010, 800, '#ff9fb4', 28], ['ALWAYS CHECK THE UNIT', 't4b:check', 960, 965, GOLD, 32]] },
    QB('t5q', [A('tubeB', 700, 540, 2.0, 't5q+0.2', { o: { txt: 'HIGH' }, shake: ['t5q:high', 0.6] }), A('flagR', 1150, 520, 1.8, 't5q:number')]),
    { at: 't6', cast: [A('doctor', 280, 560, 1.8, 't6:doctors', { pulse: ['t6:push'] }), A('ldlP', 760, 330, 1.6, 't6:ldl', { hit: ['t6:harder'] }), A('bpGauge', 1160, 330, 1.6, 't6:pressure', { o: { v: 0.7 } }),
      A('glucoM', 760, 700, 1.6, 't6:sugar'), A('cig', 1160, 700, 1.6, 't6:smoking'), A('lpaP', 1620, 520, 2.0, 't6:risks', { hw: 80, hh: 70, pulse: ['t6:adds'] })],
      fx: [['stream', 5, 1, 't6:adds', 't6>', { col: '#ff9fb4', n: 5 }], ['stream', 5, 2, 't6:adds', 't6>', { col: '#ff9fb4', n: 5 }], ['stream', 5, 3, 't6:all', 't6>', { col: '#ff9fb4', n: 5 }], ['stream', 5, 4, 't6:all', 't6>', { col: '#ff9fb4', n: 5 }]],
      lab: [['PUSH HARDER ON EVERY OTHER RISK', 't6:push', 960, 965, GOLD, 30]] },
    { at: 't6b', cast: [A('adult', 960, 520, 2.0, 't6b:you', { o: { col: '#e2457a' }, glow: 'rgba(226,69,122,0.35)' }), A('elder', 400, 340, 1.7, 't6b:parents'), A('adult', 1520, 340, 1.7, 't6b:brothers', { o: { col: '#5b4fd6' } }),
      A('adult', 1520, 700, 1.7, 't6b:sisters', { o: { col: '#b48cff', hair: '#7a4a2c' } }), A('kid', 400, 700, 1.7, 't6b:children', { pulse: ['t6b:many'] })],
      fx: [['stream', 0, 1, 't6b:parents', 't6b>', { col: '#ff9fb4', n: 5 }], ['stream', 0, 2, 't6b:brothers', 't6b>', { col: '#ff9fb4', n: 5 }], ['stream', 0, 3, 't6b:sisters', 't6b>', { col: '#ff9fb4', n: 5 }], ['stream', 0, 4, 't6b:children', 't6b>', { col: '#ff9fb4', n: 5 }]],
      lab: [['ONE TEST → MANY MORE', 't6b:one', 960, 965, GOLD, 32]] },
    QB('w1q', [A('heartR', 700, 540, 2.0, 'w1q+0.2', { o: { pain: 1 } }), A('adult', 1150, 560, 2.0, 'w1q:worried', { o: { mood: 'stress' } })]),
    { at: 'w2', cast: [A('adult', 330, 600, 1.7, 'w2:people', { o: { mood: 'sick', col: '#ff8f4a' } }), A('heartR', 330, 280, 1.6, 'w2:heart', { o: { pain: 1 } }), A('familyT', 960, 600, 1.8, 'w2:parents', { hw: 80, hh: 64 }),
      A('heartR', 960, 280, 1.6, 'w2:early', { o: { pain: 1 }, shake: ['w2:early', 0.6] }), A('adult', 1590, 600, 1.7, 'w2:people#2', { o: { mood: 'sick', col: '#127b84' } }),
      A('chart', 1590, 280, 1.6, 'w2:worse', { o: tt => ({ v: [0.3, 0.45, 0.65, 0.3 + 0.65 * clamp((tt - T('w2:worse')) / 1.0)], hi: 3 }) })],
      lab: [['YOUNG · NORMAL LDL', 'w2:normal', 330, 830, WHITE, 26], ['EARLY FAMILY HISTORY', 'w2:siblings', 960, 830, WHITE, 26], ['WORSE DESPITE TREATMENT', 'w2:worse', 1590, 830, WHITE, 26]] },
    { at: 'w3', cast: [A('puzzle', 520, 520, 2.0, 'w3', { o: { col: '#8fd8e6' } }), A('puzzle', 760, 300, 1.7, 'w3:them', { o: { col: '#ffd98a' } }), A('lpaP', 1500, 420, 1.9, 'w3:little', { hw: 80, hh: 70, mv: [['w3:piece', 820, 560, 80]], morph: ['w3:puzzle', 'puzzle'], o: { col: '#e2457a' } })],
      tag: [['THE MISSING PIECE', 'w3:missing', 960, 965, '#9b3352', 38]] },
  ], 'h1'));
}
// ---------- 5 the trial that failed ----------
function sTrial(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('h1', [A('syringeC', 700, 540, 2.0, 'h1+0.2'), A('crowd', 1150, 560, 2.0, 'h1+0.4')]),
    { at: 'h2', cast: [A('crowd', 330, 580, 1.9, 'h2:more'), A('heartR', 330, 280, 1.6, 'h2:heart', { o: { pain: 1 } }), A('calDay', 720, 520, 1.7, 'h2:monthly', { o: { m: 'EVERY', d: 'MO' } }),
      A('syringeC', 1050, 520, 1.7, 'h2:shot', { mv: [['h2:drug', 1050, 480]] }), A('vialP', 1400, 520, 1.7, 'h2:placebo'), A('hglass', 1720, 520, 1.6, 'h2:five')],
      fx: [['stream', 3, 0, 'h2:drug', 'h2:placebo', { col: '#8fd8e6', n: 6 }]], tag: [['Lp(a)HORIZON', 'h2:called', 1100, 200, '#5b4fd6', 40]],
      lab: [['8,350 PATIENTS · 42 COUNTRIES', 'h2:8', 400, 860, WHITE, 26], ['PELACARSEN', 'h2:pella', 1050, 760, GOLD, 28], ['PLACEBO', 'h2:placebo', 1400, 860, WHITE, 28], ['~5 YEARS', 'h2:five', 1720, 760, WHITE, 28]] },
    { at: 'h3', cast: [A('syringeC', 300, 300, 1.6, 'h3:drug', { mv: [['h3:cut', 520, 420]] }), A('chart', 760, 540, 2.3, 'h3:number', { o: tt => ({ v: [0.9, 0.9 * (1 - 0.78 * clamp((tt - T('h3:cut')) / 1.2))], hi: 1 }) }),
      ...[[1250, 330], [1600, 330], [1250, 700], [1600, 700]].map(([x, y], i) => A('lpaP', x, y, 1.6, 'h3:number+' + (i * 0.12).toFixed(2), i < 3 ? { hw: 80, hh: 70, erase: 'h3:78+' + (i * 0.15).toFixed(2) } : { hw: 80, hh: 70 }))],
      lab: [['Lp(a) −78%', 'h3:78', 760, 830, '#9be3a5', 32]] },
    { at: 'h3:but', cast: [A('heartR', 960, 560, 2.2, 'h3:but+0.1', { o: { pain: 1 }, pulse: ['h3:12', 'h3:12#1'] }), A('crowd', 420, 660, 1.8, 'h3:drug#1'), A('crowd', 1500, 660, 1.8, 'h3:placebo')],
      fx: [['stream', 0, 1, 'h3:12', 'h3:no', { col: '#ff9fb4', n: 5 }], ['stream', 0, 2, 'h3:12#1', 'h3:no', { col: '#ff9fb4', n: 5 }]],
      num: [['h3:12', 420, 300, '12.3%', 'DRUG GROUP · HEART EVENTS'], ['h3:12#1', 1500, 300, '12.1%', 'PLACEBO GROUP']], tag: [['NO BENEFIT', 'h3:no', 960, 965, '#e2457a', 40]] },
    { at: 'h3b', cast: [A('syringeC', 300, 300, 1.6, 'h3b:side', { mv: [['h3b:shots', 560, 440]] }), A('adult', 760, 560, 2.0, 'h3b:patients', { o: tt => ({ mood: tt > T('h3b:flu') ? 'sick' : 'happy' }), shake: ['h3b:reactions', 0.6], mv: [['h3b:stopped', 860, 560]] }),
      A('thermoC', 1130, 520, 1.8, 'h3b:flu', { o: tt => ({ level: 0.3 + 0.6 * clamp((tt - T('h3b:flu')) / 1.0) }) })],
      num: [['h3b:third', 1560, 300, '~1/3', 'FLU-LIKE REACTIONS'], ['h3b:five', 1560, 720, '~1 IN 5', 'STOPPED THE DRUG']] },
    { at: 'h4', cast: [A('factory', 560, 520, 2.4, 'h4:company', { hw: 80, hh: 64, o: tt => ({ off: tt > T('h4:stopped') }) }), A('syringeC', 1100, 520, 1.8, 'h4:developing', { morph: ['h4:stopped', 'cross'] }), A('heartR', 1520, 520, 1.9, 'h4:heart')],
      lab: [['PROGRAMME STOPPED', 'h4:stopped', 960, 965, WHITE, 32]] },
    QB('h5q', [A('lpaP', 700, 540, 2.2, 'h5q+0.2', { hw: 80, hh: 70 }), A('heartR', 1150, 540, 1.8, 'h5q:matter')]),
    { at: 'h6', cast: [A('doctor', 560, 560, 2.0, 'h6:experts'), A('question', 1100, 330, 1.6, 'h6:several'), A('question', 1400, 540, 1.6, 'h6:theories'), A('question', 1100, 740, 1.6, 'h6:theories+0.2')],
      lab: [['SEVERAL THEORIES', 'h6:theories', 960, 965, GOLD, 32]] },
    { at: 'h6:patients', cast: [A('artery', 300, 520, 1.8, 'h6:advanced', { hw: 80, hh: 52, o: { plaque: 1, squeeze: 0.5 } }), A('eraser', 300, 270, 1.6, 'h6:reverse', { shake: ['h6:reverse', 0.9] }),
      A('bpGauge', 740, 520, 1.7, 'h6:risks', { o: { v: 0.3 } }), A('check', 740, 280, 1.6, 'h6:controlled'), A('lpaP', 1180, 520, 1.6, 'h6:enough', { hw: 80, hh: 70, pulse: ['h6:left'] }),
      A('hglass', 1620, 520, 1.7, 'h6:five'), A('calDay', 1620, 270, 1.6, 'h6:lifetime', { o: { m: 'LIFETIME', d: '∞' } })],
      lab: [['TOO LATE?', 'h6:late', 300, 800, WHITE, 26], ['RISKS ALREADY LOW', 'h6:controlled', 740, 800, WHITE, 26], ['SOME STILL LEFT', 'h6:left', 1180, 800, WHITE, 26], ['5 YEARS TOO SHORT?', 'h6:short', 1620, 800, WHITE, 26]] },
    { at: 'h6b', cast: [A('doctor', 330, 560, 1.9, 'h6b:cardiologists'), A('chart', 860, 520, 2.2, 'h6b:moderately', { o: tt => ({ v: [0.3, 0.5, 0.7, 1.0], hi: tt > T('h6b:highest') ? 3 : 1 }) }),
      A('lpaP', 1380, 540, 1.9, 'h6b:highest', { hw: 80, hh: 70, hit: ['h6b:drug'] }), A('syringeC', 1700, 300, 1.6, 'h6b:might', { mv: [['h6b:drug', 1560, 420]] })],
      lab: [['TRIAL: ONLY MODERATELY HIGH LEVELS', 'h6b:moderately', 760, 965, WHITE, 28]] },
  ], 'n1'));
}
// ---------- 6 what comes next ----------
function sNext(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('n1', [A('syringeC', 640, 540, 1.8, 'n1+0.2'), A('pillC', 1100, 540, 1.8, 'n1+0.4')]),
    { at: 'n2', cast: [A('syringeC', 300, 330, 1.6, 'n2:olpa', { mv: [['n2:switches', 880, 330, 60]] }), A('syringeC', 300, 700, 1.6, 'n2:lepidus', { mv: [['n2:switches+0.3', 900, 440, 60]] }),
      A('mrna', 1180, 330, 1.8, 'n2:method', { hw: 92, hh: 44, erase: 'n2:message+0.3' }), A('liver', 1180, 650, 2.0, 'n2:liver', { hw: 92, hh: 64 }), A('lpaP', 1660, 500, 1.7, 'n2:lower', { hw: 80, hh: 70, erase: 'n2:more' })],
      lab: [['OLPASIRAN · LEPODISIRAN', 'n2:lepidus', 540, 965, GOLD, 30], ['SWITCH OFF THE GENE\'S MESSAGE', 'n2:switches', 1380, 965, WHITE, 28]] },
    { at: 'n3', cast: [A('pillC', 330, 620, 1.7, 'n3:pill', { mv: [['n3:attaching', 1120, 500, 90]] }), A('tailK', 900, 300, 1.7, 'n3:protein', { hw: 92, hh: 44, mv: [['n3:attaching', 1230, 420, 40]], push: [['n3:attaching', -160, -170]], hit: ['n3:attaching'] }),
      A('ldlP', 1560, 560, 2.0, 'n3:which', { pulse: ['n3:first'] }), A('check', 1560, 250, 1.6, 'n3:first')],
      tag: [['MUVALAPLIN · A PILL', 'n3:muvo', 760, 965, '#5b4fd6', 36]] },
    { at: 'n3b', cast: [A('syringeC', 300, 400, 1.7, 'n3b:injectable', { mv: [['n3b:cut', 700, 460, 60]] }),
      ...[[1000, 330], [1360, 330], [1000, 700], [1360, 700]].map(([x, y], i) => A('lpaP', x, y, 1.6, 'n3b:older+' + (i * 0.12).toFixed(2), i === 0 ? { hw: 80, hh: 70, erase: 'n3b:quarter' } : { hw: 80, hh: 70 }))],
      tag: [['PCSK9 INHIBITORS · ~1/4 LOWER', 'n3b:pcsk9', 760, 965, '#5b4fd6', 34]] },
    { at: 'n3b:vitamin-0.6', cast: [A('bottleN', 380, 520, 2.0, 'n3b:vitamin'), A('lpaP', 880, 520, 1.8, 'n3b:lowers', { hw: 80, hh: 70, pulse: ['n3b:lowers+0.5'] }), A('heartR', 1380, 520, 1.9, 'n3b:trials', { o: { pain: 1 } }), A('cross', 1720, 300, 1.6, 'n3b:prevent')],
      fx: [['stream', 0, 1, 'n3b:lowers', 'n3b:but', { col: '#ff8f4a', n: 6 }]], lab: [['NIACIN: LOWERS IT · NO FEWER HEART ATTACKS', 'n3b:didn', 960, 965, GOLD, 28]] },
    { at: 'n3c', cast: [A('adult', 300, 560, 1.9, 'n3c:people', { o: { mood: 'sick' } }), A('heartR', 300, 260, 1.6, 'n3c:heart', { o: { pain: 1 } }), A('apher', 820, 520, 2.2, 'n3c:clinics', { hw: 72, hh: 82 }),
      A('lpaP', 1150, 400, 1.6, 'n3c:removes', { hw: 80, hh: 70, mv: [['n3c:particles+0.3', 1500, 380, 80]], erase: 'n3c:every' }), A('bin', 1640, 400, 1.9, 'n3c:physically'), A('calDay', 1600, 720, 1.6, 'n3c:week', { o: { m: 'EVERY', d: '1–2W' } })],
      fx: [['stream', 0, 2, 'n3c:blood', 'n3c>', { col: '#c33244', n: 8 }]], tag: [['APHERESIS', 'n3c:fer', 820, 965, '#0b4f5c', 38]] },
    { at: 'n4', cast: [A('docV', 330, 520, 1.9, 'n4:trials', { o: tt => ({ title: 'OUTCOME TRIAL', ticks: Math.floor(clamp((tt - T('n4:running')) / 3) * 3) }) }), A('syringeC', 760, 360, 1.6, 'n4:all'), A('pillC', 760, 690, 1.6, 'n4:them'),
      A('hglass', 1160, 520, 1.8, 'n4:running'), A('heartR', 1600, 560, 2.0, 'n4:saves', { pulse: ['n4:lives'] }), A('question', 1600, 250, 1.6, 'n4:whether')],
      lab: [['DOES LOWERING IT SAVE LIVES?', 'n4:whether', 1100, 965, GOLD, 30]] },
    { at: 'n4b', cast: [A('shieldC', 960, 520, 2.3, 'n4b:defense', { pulse: ['n4b:lowers'] }), A('ldlP', 400, 330, 1.6, 'n4b:ldl', { erase: 'n4b:low' }), A('bpGauge', 400, 700, 1.6, 'n4b:pressure', { o: tt => ({ v: tt > T('n4b:low') ? 0.3 : 0.7 }) }),
      A('glucoM', 1500, 330, 1.6, 'n4b:sugar'), A('cig', 1500, 700, 1.6, 'n4b:smoke', { morph: ['n4b:smoke+0.5', 'cross'] }), A('lpaP', 1700, 520, 1.6, 'n4b:whatever', { hw: 80, hh: 70, mv: [['n4b:little', 1260, 520]], hit: ['n4b:little'], push: [['n4b:little', 330, 0]] })],
      lab: [['LOWER YOUR TOTAL RISK', 'n4b:total', 960, 965, GOLD, 32]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [A('tubeB', 760, 540, 2.2, 'o1+0.2', LPA), A('doctor', 1150, 560, 2.0, 'o1+0.4')]),
    { at: 'o2', cast: [A('tubeB', 330, 520, 1.9, 'o2:yes', LPA), A('hglass', 730, 520, 1.7, 'o2:life'), A('familyT', 1130, 540, 1.8, 'o2:family', { hw: 80, hh: 64 }), A('heartR', 1550, 520, 1.8, 'o2:attack', { o: { pain: 1 } })],
      lab: [['ONCE IN YOUR LIFE', 'o2:once', 530, 800, GOLD, 32], ['FAMILY HISTORY? EARLY HEART ATTACK?', 'o2:family', 1340, 965, WHITE, 28]] },
    { at: 'o2:knowing', cast: [A('tubeB', 330, 520, 1.9, 'o2:number', { o: { txt: 'HIGH' } }), A('dna', 760, 500, 2.2, 'o2:genes', { hw: 44, hh: 70 }), A('lockR', 760, 800, 1.6, 'o2:change'),
      A('shieldC', 1300, 520, 2.2, 'o2:guard', { pulse: ['o2:everything'] }), A('ldlP', 0, 0, 1.6, 'o2:everything', { orbit: { c: [1300, 520], r: 250, w: 1.2 } }), A('bpGauge', 0, 0, 1.6, 'o2:else', { orbit: { c: [1300, 520], r: 250, w: 1.2, ph: 3.14 } })],
      lab: [['GUARD EVERYTHING ELSE', 'o2:guard', 1300, 965, GOLD, 32]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [A('lpaP', 420, 480, 2.4, 'o3', { hw: 80, hh: 70, pulse: ['o3:inherit'] }), A('familyT', 420, 840, 1.6, 'o3:five', { hw: 80, hh: 64 })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'THE HIDDEN CHOLESTEROL', '1 IN 5 INHERIT', 1300, 54, 80);
}
const CHAPTERS = [['b1', "Cholesterol's delivery trucks", 'coral', 'truckP'], ['l1', 'The sticky tail', 'indigo', 'lpaP'], ['g1', "It's in your genes", 'teal', 'dna'], ['t1', 'The missing test', 'night', 'labPanel'], ['h1', 'The trial that failed', 'grey', 'syringeC'], ['n1', 'What comes next', 'teal', 'pillC']];
function SECTIONS() { return makeSections(CHAPTERS, { b1: [sTrucks, 'b2'], l1: [sTail, 'l2'], g1: [sGenes, 'g2'], t1: [sTest, 't2'], h1: [sTrial, 'h2'], n1: [sNext, 'n2'] }, sOpen, sOutro); }
