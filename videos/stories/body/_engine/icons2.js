// Shared icon set for episodes 11+ (loaded after common.js). Icon units: about ±64, drawn at scale ≥ 1.8 → ≥ 230 px.
// Every icon has its own idle motion (blink, beat, puff, sway, spin…). Flat fills, no outlines.
function ell(x, y, rx, ry, c, rot = 0) { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, 6.283); ctx.fill(); }
function poly(pts, c) { ctx.fillStyle = c; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); }
function eyes(t, x, y, gap, r = 5, col = '#20232f', ph = 0) { const b = 1 - blinkF(t + ph); ell(x - gap, y, r, r * b + 0.6, col); ell(x + gap, y, r, r * b + 0.6, col); }
function spikes(t, n, r0, r1, w, col, tip, rotSp = 0.5) { ctx.save(); ctx.rotate(t * rotSp); for (let i = 0; i < n; i++) { ctx.rotate(6.283 / n); rr2(-w / 2, -r1, w, r1 - r0 + 4, w / 2, col); if (tip) circ(0, -r1, w * 0.9, tip); } ctx.restore(); }
const SK = ['#f2b38f', '#c98a62', '#8a5a3c', '#f7d0b0'];
Object.assign(ICONS, {
  // ---------- people ----------
  kid(t, o) {   // a child in a sweater; o.sick adds flushed cheeks + droopy eyes, o.col sweater colour
    const c = o.col || '#ff8f4a', sk = SK[o.skin || 0], b = Math.sin(t * 2.4) * 2;
    rr2(-30, -6 + b, 60, 62, 24, c); rr2(-24, 50, 18, 14, 7, '#2d2b7c'); rr2(6, 50, 18, 14, 7, '#2d2b7c'); circ(-34, 26 + b, 11, sk); circ(34, 26 + b, 11, sk);
    circ(0, -34 + b, 30, sk); ctx.fillStyle = o.hair || '#4a2c22'; ctx.beginPath(); ctx.arc(0, -40 + b, 31, Math.PI * 1.05, -0.05); ctx.fill();
    if (o.sick) { circ(-15, -26 + b, 7, 'rgba(226,69,122,0.55)'); circ(15, -26 + b, 7, 'rgba(226,69,122,0.55)'); rr2(-16, -38 + b, 10, 3, 1.5, '#20232f'); rr2(6, -38 + b, 10, 3, 1.5, '#20232f'); }
    else { eyes(t, 0, -36 + b, 11, 4.5); ctx.strokeStyle = '#9b3352'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -26 + b, 7, 0.3, 2.8); ctx.stroke(); }
    if (o.spots) { const n = Math.round(26 * (o.spots === true ? 1 : o.spots)); for (let i = 0; i < n; i++) { const y = -58 + i * 4.6, x = Math.sin(i * 2.7) * (y < -4 ? 22 : 24); circ(x, y + b, 3.6, '#d64550'); } }
  },
  adult(t, o) {   // a grown-up; o.col shirt, o.mood: 'sick' | 'stress' | 'happy'
    const c = o.col || '#5b4fd6', sk = SK[o.skin || 0], b = Math.sin(t * 2) * 2;
    rr2(-34, -14 + b, 68, 80, 26, c); rr2(-28, 60, 22, 16, 8, '#20232f'); rr2(6, 60, 22, 16, 8, '#20232f'); circ(-38, 24 + b, 12, sk); circ(38, 24 + b, 12, sk);
    circ(0, -46 + b, 30, sk); ctx.fillStyle = o.hair || '#2c1c16'; ctx.beginPath(); ctx.arc(0, -52 + b, 31, Math.PI * 1.1, -0.1); ctx.fill();
    if (o.mood === 'sick') { rr2(-16, -50 + b, 10, 3, 1.5, '#20232f'); rr2(6, -50 + b, 10, 3, 1.5, '#20232f'); circ(-16, -38 + b, 6, 'rgba(226,69,122,0.5)'); circ(16, -38 + b, 6, 'rgba(226,69,122,0.5)'); }
    else if (o.mood === 'stress') { eyes(t, 0, -48 + b, 11, 5); rr2(-20, -62 + b, 14, 4, 2, '#20232f'); rr2(6, -62 + b, 14, 4, 2, '#20232f'); ctx.save(); ctx.translate(30, -76); ctx.rotate(Math.sin(t * 6) * 0.2); ell(0, 0, 5, 8, '#8fd8e6'); ctx.restore(); }
    else { eyes(t, 0, -48 + b, 11, 5); ctx.strokeStyle = '#9b3352'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -40 + b, 8, 0.3, 2.8); ctx.stroke(); }
  },
  elder(t, o) { ICONS.adult(t, { ...o, hair: '#dfe7f2', col: o.col || '#7a5a3a' }); ctx.save(); ctx.translate(46, 10); ctx.rotate(0.05 + Math.sin(t * 1.5) * 0.04); rr2(-4, -20, 8, 90, 4, '#9a7a5a'); ctx.restore(); },
  doctor(t, o) { ICONS.adult(t, { ...o, col: '#f3f7fb' }); rr2(-4, -10, 8, 50, 4, '#8fd8e6'); ctx.strokeStyle = '#5b6585'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -8, 20, 0.2, Math.PI - 0.2); ctx.stroke(); circ(14, 18, 7, '#5b6585'); },
  // ---------- body ----------
  nose(t, o) {   // side view of a nose with a nostril that breathes; o.cold tints it blue
    const br = 1 + 0.04 * Math.sin(t * 2.2); ctx.save(); ctx.scale(br, br); const sk = o.cold ? '#c9b8d8' : SK[0];
    ctx.fillStyle = sk; ctx.beginPath(); ctx.moveTo(-30, -70); ctx.quadraticCurveTo(-10, -60, 20, 10); ctx.quadraticCurveTo(44, 40, 20, 50); ctx.quadraticCurveTo(-10, 56, -40, 44); ctx.lineTo(-40, -70); ctx.fill();
    ell(4, 40, 13, 7, '#9b5a4c'); ell(-20, 30, 9, 12, 'rgba(226,69,122,0.25)'); rr2(-26, -56, 10, 40, 5, 'rgba(255,255,255,0.35)'); ctx.restore();
  },
  lungs(t, o) { const b = 1 + 0.05 * Math.sin(t * 2); ctx.save(); ctx.scale(b, b); rr2(-6, -64, 12, 40, 6, '#c9d6ec'); for (const s of [-1, 1]) { ctx.fillStyle = '#f29db0'; ctx.beginPath(); ctx.moveTo(s * 8, -30); ctx.quadraticCurveTo(s * 70, -50, s * 64, 30); ctx.quadraticCurveTo(s * 40, 64, s * 10, 40); ctx.closePath(); ctx.fill();
    if (o.fill) { ctx.save(); ctx.clip(); const h = 90 * o.fill; ctx.fillStyle = 'rgba(90,169,230,0.75)'; ctx.fillRect(-80, 50 - h + Math.sin(t * 3) * 3, 160, h + 20); ctx.restore(); }
    for (let i = 0; i < 7; i++) circ(s * (24 + (i * 11) % 30), -18 + (i * 13) % 48, 4, '#e2457a'); } ctx.restore(); },
  brainS(t, o) {   // small side-view brain with folds, cerebellum and stem
    const p = 1 + 0.02 * Math.sin(t * 2); ctx.save(); ctx.scale(p, p); if (o && o.hot) { const rg = ctx.createRadialGradient(0, 0, 10, 0, 0, 110); rg.addColorStop(0, `rgba(255,80,80,${0.5 * o.hot * (0.7 + 0.3 * Math.sin(t * 6))})`); rg.addColorStop(1, 'rgba(255,80,80,0)'); ctx.fillStyle = rg; ctx.fillRect(-110, -110, 220, 220); } rr2(6, 20, 14, 36, 7, '#d98aa0'); ell(26, 22, 24, 16, '#e79ab0');
    ctx.fillStyle = '#f2b3c0'; ctx.beginPath(); ctx.ellipse(-4, -6, 62, 44, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#d98aa0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; [[-40, -20, -20, -34], [-14, -40, 6, -22], [14, -36, 34, -16], [-50, 4, -26, 10], [-10, 2, 22, 14], [30, -4, 50, 6]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.quadraticCurveTo((a + c) / 2, b - 10, c, d); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(-30, 12); ctx.quadraticCurveTo(0, 2, 30, 24); ctx.stroke(); ctx.restore();
  },
  heartR(t, o) {   // anatomical-ish heart: aorta arch, vessels, beating; o.rate speeds it up, o.pain flashes red
    const r = o.rate || 1, b = 1 + 0.07 * Math.max(0, Math.sin(t * 6 * r)) ** 3; ctx.save(); ctx.scale(b, b);
    rr2(-6, -78, 22, 40, 10, '#e2457a'); ctx.strokeStyle = '#e2457a'; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(20, -56, 20, Math.PI, 0); ctx.stroke(); rr2(-34, -70, 16, 34, 8, '#5b8dd6'); rr2(30, -50, 16, 26, 8, '#5b8dd6');
    ctx.fillStyle = o.pain && Math.sin(t * 12) > 0 ? '#ff4060' : '#d64550'; ctx.beginPath(); ctx.moveTo(-10, -44); ctx.bezierCurveTo(-74, -50, -70, 30, 4, 62); ctx.bezierCurveTo(60, 30, 66, -40, 18, -44); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#9b3352'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(6, -36); ctx.quadraticCurveTo(-4, 10, 4, 54); ctx.stroke(); ctx.strokeStyle = '#ffb35c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, -18); ctx.quadraticCurveTo(-30, 10, -14, 30); ctx.stroke();
    rr2(-48, -30, 22, 10, 5, 'rgba(255,255,255,0.4)'); ctx.restore();
  },
  artery(t, o) {   // a short artery segment with blood cells flowing; o.squeeze 0..1 narrows it
    const q = o.squeeze || 0, h = 40 * (1 - q * 0.55); rr2(-80, -h - 12, 160, 2 * h + 24, h + 12, '#c95a7c'); rr2(-80, -h, 160, 2 * h, h, '#7a1f33');
    ctx.save(); ctx.beginPath(); ctx.roundRect(-80, -h, 160, 2 * h, h); ctx.clip(); const blocked = o.clot ? 1 - o.clot * 0.9 : 1; for (let i = 0; i < 5; i++) { const x = ((i * 47 + t * (90 - q * 50) * blocked) % 200) - 100; rbcDisc(x, Math.sin(i + t) * h * 0.3, h * 0.42, 0.7, i); }
    if (o.plaque) { ctx.fillStyle = '#ffd36b'; ctx.beginPath(); ctx.ellipse(0, -h, 40, h * 0.8 * o.plaque, 0, 0, Math.PI); ctx.fill(); if (o.crack) { ctx.strokeStyle = '#9b3352'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-10, -h); ctx.lineTo(0, -h + h * 0.5 * o.plaque); ctx.lineTo(8, -h + 4); ctx.stroke(); } }
    if (o.clot) { ell(0, -h * 0.2, 30 * o.clot, h * 0.75 * o.clot, '#7a1f33'); ell(0, -h * 0.2, 22 * o.clot, h * 0.55 * o.clot, '#a3243a'); } ctx.restore();
  },
  thermoC(t, o) {   // thermometer; o.level 0..1 (animated wobble), o.cold makes it blue
    const lv = clamp((o.level ?? 0.5) + Math.sin(t * 2) * 0.03), c = o.cold ? '#5aa9e6' : '#e2457a';
    rr2(-16, -70, 32, 110, 16, '#f3f7fb'); circ(0, 46, 26, '#f3f7fb'); circ(0, 46, 18, c); rr2(-7, -60 + 92 * (1 - lv), 14, 92 * lv + 20, 7, c); for (let i = 0; i < 5; i++) rr2(10, -52 + i * 18, 10, 3, 1.5, '#9fb0d8');
  },
  // ---------- germs and defenders ----------
  measlesV(t, o) { if (o.weak) { ctx.globalAlpha *= 0.85; spikes(t, 10, 30, 42, 7, '#b8a8d0', '#dfd6ee', 0.15); circ(0, 0, 34, '#a898c8'); circ(0, 0, 27, '#c4b6e0'); rr2(-16, 2, 10, 3, 1.5, '#20232f'); rr2(6, 2, 10, 3, 1.5, '#20232f'); font(20, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('z', 30, -40 - (t * 10) % 8); return; }
    spikes(t, 14, 30, 50, 8, '#9b6bd6', '#ffd98a', 0.4); circ(0, 0, 36, '#7f4fc8'); circ(0, 0, 28, '#9b6bd6'); circ(-10, -10, 7, '#c7a8f0'); circ(10, 8, 5, '#c7a8f0'); eyes(t, 0, 4, 10, 5, '#20232f', 0.7); },
  fluV(t) { spikes(t, 16, 30, 50, 7, '#ff8f4a', '#ffd36b', 0.3); circ(0, 0, 36, '#e2457a'); circ(0, 0, 28, '#ff6f7a'); eyes(t, 0, 0, 10, 5, '#20232f', 1.3); rr2(-8, 10, 16, 4, 2, '#20232f'); },
  rhinoV(t) {   // small faceted (icosahedral) cold virus
    ctx.save(); ctx.rotate(Math.sin(t * 0.8) * 0.3); const pts = Array.from({ length: 6 }, (_, i) => [Math.cos(i / 6 * 6.283) * 48, Math.sin(i / 6 * 6.283) * 48]);
    poly(pts, '#3fae6a'); for (let i = 0; i < 6; i++) poly([[0, 0], pts[i], pts[(i + 1) % 6]], i % 2 ? '#5fd38a' : '#3fae6a'); poly([[0, -18], [16, 9], [-16, 9]], '#9be3a5'); ctx.restore(); eyes(t, 0, -2, 10, 5, '#20232f', 2.1);
  },
  noroV(t) {   // norovirus: faceted blue-green with cup-shaped knobs
    ctx.save(); ctx.rotate(t * 0.25); for (let i = 0; i < 10; i++) { ctx.rotate(6.283 / 10); circ(0, -44, 12, '#2aa3a3'); circ(0, -46, 6, '#127b84'); } ctx.restore(); circ(0, 0, 38, '#38c2b8'); circ(-12, -12, 8, 'rgba(255,255,255,0.4)'); eyes(t, 0, 2, 11, 5, '#20232f', 0.4); rr2(-9, 14, 18, 4, 2, '#20232f');
  },
  bcell(t, o) {   // memory B cell: blue blob with a nucleus and Y antibodies on its surface; o.mem shows a small "wanted poster" of a germ
    const br = 1 + 0.03 * Math.sin(t * 2.4); ctx.save(); ctx.scale(br, br); for (let i = 0; i < 8; i++) { ctx.save(); ctx.rotate(i / 8 * 6.283 + t * 0.2); ctx.translate(0, -52); antiY('#ffd98a'); ctx.restore(); }
    circ(0, 0, 50, '#4f7fd6'); circ(0, 0, 42, '#6f9cf0'); circ(6, 6, 22, '#2d4fa0'); circ(-16, -18, 8, 'rgba(255,255,255,0.4)'); eyes(t, -2, -8, 12, 5, '#102348', 0.9);
    if (o.mem) { ctx.save(); ctx.translate(30, 26); ctx.scale(0.42, 0.42); rr2(-44, -44, 88, 88, 10, '#f3f7fb'); ctx.scale(0.8, 0.8); ICONS[o.mem](t, {}); ctx.restore(); } ctx.restore();
  },
  tcell(t) { const br = 1 + 0.03 * Math.sin(t * 2.8); ctx.save(); ctx.scale(br, br); spikes(t, 12, 36, 52, 9, '#3fae6a', '#9be3a5', 0.3); circ(0, 0, 44, '#3fae6a'); circ(0, 0, 36, '#5fd38a'); circ(4, 6, 16, '#2a7a4a'); eyes(t, 0, -10, 12, 5, '#102348', 1.7); ctx.restore(); },
  antibody(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.2); ctx.scale(2.6, 2.6); antiY('#ffd98a'); ctx.restore(); },
  macro(t) {   // macrophage: big wobbly blob with arms
    ctx.fillStyle = '#ff9fb4'; ctx.beginPath(); for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.283, r = 56 + Math.sin(a * 5 + t * 2) * 8; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.85); } ctx.fill(); circ(0, 0, 40, '#ffb8c8'); circ(-8, 6, 18, '#d6577a'); eyes(t, 4, -14, 12, 5, '#20232f', 0.2);
  },
  vesicle(t) { const p = 1 + 0.06 * Math.sin(t * 5); ctx.save(); ctx.scale(p, p); spikes(t, 8, 22, 34, 6, '#8fd8e6', null, 0.8); circ(0, 0, 26, '#bfefff'); circ(-8, -8, 7, '#ffffff'); ctx.restore(); },
  cilia(t, o) {   // a strip of nose lining: cells with beating hairs and a mucus blob riding on top; o.dry slows the beat and shrinks the mucus
    const sp = o.dry ? 1.2 : 6, dry = o.dry ? 1 : 0; for (let i = 0; i < 4; i++) rr2(-80 + i * 40, 10, 38, 50, 12, i % 2 ? '#f29db0' : '#f7b3c4');
    ctx.strokeStyle = '#ffd0dc'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 14; i++) { const x = -74 + i * 11, a = Math.sin(t * sp + i * 0.6) * 0.5; ctx.beginPath(); ctx.moveTo(x, 10); ctx.lineTo(x + Math.sin(a) * 22, 10 - Math.cos(a) * 22); ctx.stroke(); }
    ell(((t * (dry ? 4 : 30)) % 120) - 40, -22, 34 * (1 - dry * 0.5), 12 * (1 - dry * 0.4), 'rgba(190,240,170,0.85)');
  },
  droplets(t) {   // a sneeze cloud of droplets
    for (let i = 0; i < 16; i++) { const a = i * 2.4, r = 14 + ((i * 17) % 44) + Math.sin(t * 3 + i) * 4; circ(Math.cos(a) * r, Math.sin(a) * r * 0.7, 5 + (i % 4) * 2, i % 3 ? 'rgba(191,239,255,0.85)' : 'rgba(255,255,255,0.9)'); }
  },
  // ---------- protection ----------
  vial(t) { rr2(-26, -40, 52, 92, 12, 'rgba(220,240,255,0.55)'); rr2(-22, 0, 44, 48, 10, '#8fd8e6'); rr2(-30, -60, 60, 26, 8, '#e2457a'); rr2(-18, -10, 36, 30, 4, '#f3f7fb'); font(16, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('MMR', 0, 6); glint(t, 26, 46); },
  syringeC(t) { ctx.save(); ctx.rotate(-0.6 + Math.sin(t * 1.4) * 0.06); rr2(-80, -16, 120, 32, 10, 'rgba(220,240,255,0.7)'); rr2(-70, -12, 70 + Math.sin(t * 2) * 20, 24, 8, '#8fd8e6'); rr2(-110, -8, 34, 16, 6, '#9aa6c4'); rr2(-118, -24, 10, 48, 5, '#9aa6c4'); rr2(40, -3, 60, 6, 3, '#c9d6ec'); ctx.restore(); },
  soap(t) { rr2(-36, -20, 72, 80, 18, '#b48cff'); rr2(-10, -50, 20, 32, 6, '#f3f7fb'); rr2(-10, -54, 44, 12, 6, '#f3f7fb'); rr2(-24, 0, 16, 40, 8, 'rgba(255,255,255,0.3)'); bubbles(t, 40, -40, 40, 70, 5, 'rgba(255,255,255,0.8)'); },
  hands(t) {   // two hands rubbing under a soap lather
    const r = Math.sin(t * 7) * 8; for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 22 + (sd < 0 ? r : -r) * 0.4, sd * 4); ctx.rotate(sd * 0.35); rr2(-24, -30, 48, 76, 22, sd < 0 ? SK[0] : '#e9a882'); for (let f = 0; f < 4; f++) rr2(-22 + f * 12, -62 + Math.abs(f - 1.5) * 6, 10, 40, 5, sd < 0 ? SK[0] : '#e9a882'); rr2(sd < 0 ? 18 : -34, -6, 18, 34, 9, sd < 0 ? SK[0] : '#e9a882'); ctx.restore(); }
    for (let i = 0; i < 9; i++) circ(Math.sin(i * 2.3) * 40, -30 + (i * 17) % 60, 9 + (i % 3) * 3 + Math.sin(t * 4 + i) * 2, 'rgba(255,255,255,0.85)'); for (let i = 0; i < 4; i++) { const p = (t * 0.7 + i / 4) % 1; circ(-30 + i * 22, -60 - p * 50, 6 + i % 2 * 3, `rgba(255,255,255,${0.8 * (1 - p)})`); }
  },
  handsOld(t) { const r = Math.sin(t * 6) * 10; for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * (18 + r * s * 0.3), 0); ctx.rotate(s * 0.25); rr2(-26, -50, 52, 90, 24, SK[0]); rr2(-30 * s - (s > 0 ? 12 : 0), -16, 20, 40, 10, SK[0]); ctx.restore(); } for (let i = 0; i < 6; i++) circ(Math.sin(t * 2 + i * 2) * 50, -50 + ((t * 40 + i * 20) % 100), 6 + i % 3, 'rgba(255,255,255,0.8)'); },
  sanitizer(t) { rr2(-28, -30, 56, 90, 14, 'rgba(160,220,255,0.6)'); rr2(-22, 0, 44, 54, 10, 'rgba(120,200,255,0.7)'); rr2(-8, -56, 16, 28, 6, '#f3f7fb'); rr2(-8, -60, 36, 10, 5, '#f3f7fb'); glint(t, 28, 50); },
  mask(t) { const b = Math.sin(t * 2.2) * 3; rr2(-60, -30 + b * 0.3, 120, 64, 26, '#8fd8e6'); for (let i = 0; i < 3; i++) rr2(-46, -16 + i * 14 + b * 0.3, 92, 4, 2, '#5aa9e6'); ctx.strokeStyle = '#dfe7f2'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-60, 0, 20, 1.6, 4.7); ctx.stroke(); ctx.beginPath(); ctx.arc(60, 0, 20, -1.6, 1.6); ctx.stroke(); },
  // ---------- home and weather ----------
  house(t, o) { const warm = o.warm ?? 1; rr2(-60, -20, 120, 80, 8, '#e8d6c0'); poly([[-74, -16], [0, -76], [74, -16]], '#c95a5a'); rr2(30, -70, 18, 40, 4, '#9a5a4a'); puff(t, 39, -76, 3, -1, 'rgba(255,255,255,0.6)', 10);
    rr2(-44, 0, 34, 30, 4, warm ? '#ffd98a' : '#5b6585'); rr2(10, 10, 30, 50, 4, '#7a4a2c'); },
  windowW(t, o) {   // a window; o.open swings it open with a breeze
    rr2(-58, -70, 116, 140, 10, '#f3f7fb'); rr2(-50, -62, 100, 124, 6, '#8fd8e6'); const op = o.open ? 0.55 + Math.sin(t * 2) * 0.08 : 0;
    ctx.save(); ctx.translate(-50, 0); ctx.scale(1 - op, 1); rr2(0, -62, 50, 124, 4, 'rgba(255,255,255,0.35)'); ctx.restore(); rr2(-3, -62, 6, 124, 3, '#f3f7fb');
    if (o.open) for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${0.7 * Math.sin(p * Math.PI)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-90 + p * 120, -30 + i * 30); ctx.quadraticCurveTo(-60 + p * 120, -40 + i * 30, -30 + p * 120, -30 + i * 30); ctx.stroke(); }
  },
  humidifier(t) { rr2(-40, -10, 80, 70, 20, '#f3f7fb'); rr2(-30, 0, 60, 24, 10, '#8fd8e6'); rr2(-10, -26, 20, 20, 6, '#dfe7f2'); for (let i = 0; i < 6; i++) { const p = (t * 0.6 + i / 6) % 1; circ(Math.sin(i * 2 + t) * 12 * p, -30 - p * 60, 8 + p * 12, `rgba(230,245,255,${0.6 * (1 - p)})`); } },
  drop(t) { const s = 1 + 0.05 * Math.sin(t * 3); ctx.save(); ctx.scale(s, s); ctx.fillStyle = '#5aa9e6'; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(46, 0, 40, 22); ctx.arc(0, 22, 40, 0, Math.PI); ctx.quadraticCurveTo(-46, 0, 0, -60); ctx.fill(); ell(-14, 14, 8, 14, 'rgba(255,255,255,0.5)', 0.3); ctx.restore(); },
  wind(t) { ctx.strokeStyle = '#dfefff'; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const o = Math.sin(t * 3 + i) * 10; ctx.beginPath(); ctx.moveTo(-70 + o, -30 + i * 30); ctx.lineTo(30 + o, -30 + i * 30); ctx.arc(30 + o, -42 + i * 30, 12, Math.PI / 2, -Math.PI * 0.9, true); ctx.stroke(); } },
  cloudS(t, o) {   // storm cloud (stress); flashes a bolt every ~2 s
    const b = Math.sin(t * 1.5) * 3; ell(-30, b, 36, 28, o.col || '#5b6585'); ell(10, -14 + b, 40, 34, o.col || '#5b6585'); ell(40, 4 + b, 30, 24, o.col || '#5b6585'); rr2(-60, 0 + b, 120, 30, 15, o.col || '#5b6585');
    if ((t % 2) < 0.25) poly([[0, 30], [-14, 60], [0, 58], [-8, 86], [16, 50], [2, 52], [10, 30]], '#ffd98a');
  },
  sunC(t) { ICONS.sun(t); },
  moon2(t) { ctx.save(); ctx.rotate(-0.3 + Math.sin(t * 0.8) * 0.1); ctx.fillStyle = '#ffe8a8'; ctx.beginPath(); ctx.arc(0, 0, 54, 0.9, 5.4); ctx.arc(26, -6, 44, 4.6, 1.5, true); ctx.closePath(); ctx.fill(); circ(-26, 10, 7, '#f2d488'); circ(-20, -22, 5, '#f2d488'); ctx.restore(); },
  // ---------- time and life ----------
  hglass(t, o) { ctx.save(); ctx.scale(0.42, 0.42); ctx.translate(0, -40); hourglass(t, 0, 0, 1, o.fill ?? ((t * 0.1) % 1)); ctx.restore(); },
  alarmC(t) { ICONS.alarm(t); },
  couch(t) { rr2(-80, -10, 160, 50, 18, '#7f6ff0'); rr2(-80, -40, 160, 40, 18, '#9b8cff'); rr2(-90, -20, 26, 60, 12, '#6a5ad6'); rr2(64, -20, 26, 60, 12, '#6a5ad6'); rr2(-70, 40, 12, 14, 4, '#3a3f5a'); rr2(58, 40, 12, 14, 4, '#3a3f5a'); },
  napper(t, o) {   // a person lying on a couch, breathing, with floating Zs
    ICONS.couch(t); const br = Math.sin(t * 1.6) * 3; rr2(-60, -36 - br, 100, 30, 15, o.col || '#ff8f4a'); circ(54, -34, 22, SK[o.skin || 0]); ctx.fillStyle = '#2c1c16'; ctx.beginPath(); ctx.arc(56, -38, 23, Math.PI * 1.2, 0.2); ctx.fill(); rr2(44, -32, 12, 3, 1.5, '#20232f');
    font(26, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; for (let i = 0; i < 3; i++) { const p = (t * 0.5 + i / 3) % 1; ctx.globalAlpha = Math.sin(p * Math.PI); ctx.fillText('z', 70 + p * 40, -70 - p * 60); } ctx.globalAlpha = 1;
  },
  plate(t) { ell(0, 14, 84, 30, '#f3f7fb'); ell(0, 12, 64, 22, '#e8eef6'); circ(-24, 0, 20, '#c98a52'); circ(10, -4, 18, '#5aa96a'); circ(34, 4, 14, '#ffd36b'); puff(t, -10, -20, 3, -1, 'rgba(255,255,255,0.5)', 9); },
  salt(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.25 + 0.4); rr2(-26, -40, 52, 86, 16, '#f3f7fb'); rr2(-26, -56, 52, 22, 10, '#c9d6ec'); for (let i = 0; i < 5; i++) circ(-12 + i * 6, -50, 2.5, '#5b6585'); ctx.restore(); for (let i = 0; i < 6; i++) { const p = (t * 1.2 + i / 6) % 1; rr2(40 + i * 3, -40 + p * 80, 4, 4, 1, `rgba(255,255,255,${1 - p})`); } },
  xtree(t) {   // Christmas tree with twinkling lights and a star
    rr2(-10, 50, 20, 22, 4, '#7a4a2c'); [[60, 52], [48, 14], [36, -22]].forEach(([w, y]) => poly([[-w, y], [0, y - 56], [w, y]], '#2f8f5a'));
    [[-30, 40, '#ffd98a'], [20, 30, '#ff6f7a'], [-14, 6, '#8fd8e6'], [16, -10, '#ffd98a'], [-6, -30, '#ff6f7a'], [36, 46, '#8fd8e6']].forEach(([x, y, c], i) => circ(x, y, 6 + 2 * Math.sin(t * 4 + i * 1.7), c));
    ctx.save(); ctx.translate(0, -80); ctx.rotate(Math.sin(t * 2) * 0.15); ICONS_star(0, 0, 16); ctx.restore();
  },
  gift(t, o) { const j = Math.max(0, Math.sin(t * 3)) * 8; rr2(-48, -20, 96, 76, 8, o.col || '#e2457a'); rr2(-8, -20, 16, 76, 2, '#ffd98a'); ctx.save(); ctx.translate(0, -j); rr2(-54, -40, 108, 24, 6, o.col2 || '#ff6f7a'); rr2(-8, -40, 16, 24, 2, '#ffd98a'); ell(-14, -50, 14, 9, '#ffd98a', 0.4); ell(14, -50, 14, 9, '#ffd98a', -0.4); ctx.restore(); },
  shovel(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 2.5) * 0.15); rr2(-5, -80, 10, 110, 5, '#9a7a5a'); rr2(-20, -86, 40, 12, 6, '#5b6585'); poly([[-34, 30], [34, 30], [28, 80], [-28, 80]], '#5b8dd6'); ell(0, 32, 30, 12, '#f3f7fb'); ctx.restore(); },
  ambulance(t) { rr2(-80, -40, 160, 70, 12, '#f3f7fb'); rr2(30, -30, 40, 30, 6, '#8fd8e6'); rr2(-50, -20, 40, 12, 3, '#e2457a'); rr2(-36, -34, 12, 40, 3, '#e2457a'); rr2(-80, 10, 160, 8, 2, '#e2457a');
    rr2(-10, -54, 26, 14, 5, Math.sin(t * 10) > 0 ? '#ff4060' : '#5b8dd6'); wheel(t, -46, 34, 16); wheel(t, 46, 34, 16); },
  hospital(t) { rr2(-70, -60, 140, 120, 8, '#e8eef6'); rr2(-16, -46, 32, 32, 4, '#e2457a'); rr2(-5, -56, 10, 52, 2, '#f3f7fb'); rr2(-26, -35, 52, 10, 2, '#f3f7fb'); for (let i = 0; i < 3; i++) rr2(-54 + i * 40, 4, 28, 22, 3, (Math.sin(t * 2 + i) > 0.6) ? '#ffd98a' : '#8fd8e6'); rr2(-14, 30, 28, 30, 3, '#5b6585'); },
  ecgM(t, o) {   // heart monitor; o.flat 0..1 flattens, o.fast speeds it up
    rr2(-76, -50, 152, 100, 14, '#3a3f5a'); rr2(-66, -40, 132, 70, 8, '#102348'); const f = o.fast ? 2 : 1; ctx.strokeStyle = '#7ff3a0'; ctx.lineWidth = 4; ctx.beginPath();
    for (let x = -62; x <= 62; x += 2) { const ph = ((x + 62) / 124 + t * 0.6 * f) % 1, sp = Math.abs(ph - 0.5) < 0.03 ? -24 * (1 - (o.flat || 0)) : Math.abs(ph - 0.47) < 0.02 ? 8 : 0; ctx.lineTo(x, -4 + sp); } ctx.stroke(); circ(56, 40, 5, Math.sin(t * 6) > 0 ? '#ff6f7a' : '#5b6585');
  },
  wineG(t) { ICONS.wine(t); },
  calDay(t, o) {   // calendar page with a big date: o.d (text), o.m (month)
    rr2(-56, -56, 112, 116, 14, '#f3f7fb'); rr2(-56, -56, 112, 34, 12, o.col || '#e2457a'); rr2(-30, -66, 12, 22, 6, '#dfe7f2'); rr2(18, -66, 12, 22, 6, '#dfe7f2');
    font(18, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.m || 'DEC', 0, -39); font(48, 700); ctx.fillStyle = '#102348'; ctx.fillText(o.d || '24', 0, 16);
  },
  chart(t, o) {   // bar chart; o.v = array of 0..1 values, o.hi index highlighted
    const v = o.v || [0.3, 0.5, 0.4, 0.9], n = v.length, w = 120 / n; rr2(-70, -60, 140, 124, 12, 'rgba(6,20,40,0.45)'); rr2(-62, 50, 124, 4, 2, '#dfe7f2');
    v.forEach((h, i) => { const g = 0.92 + 0.08 * Math.sin(t * 3 + i); rr2(-60 + i * w + 4, 50 - 96 * h * g, w - 8, 96 * h * g, 4, i === o.hi ? '#e2457a' : '#8fd8e6'); });
  },
  globeP(t) { circ(0, 0, 56, '#3a7bd5'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 56, 0, 6.283); ctx.clip(); const o = (t * 10) % 120; for (const [x, y, rx, ry] of [[-20, -16, 26, 16], [24, 10, 20, 24], [-34, 24, 14, 10]]) for (const k of [-120, 0, 120]) ell(x + o + k, y, rx, ry, '#5fd38a'); ctx.restore();
    const b = Math.abs(Math.sin(t * 3)) * 6; ctx.save(); ctx.translate(-16, -40 - b); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.arc(0, -10, 14, Math.PI, 0); ctx.lineTo(0, 16); ctx.closePath(); ctx.fill(); circ(0, -10, 5, '#fff'); ctx.restore(); },
  eraser(t) { ctx.save(); ctx.rotate(-0.3 + Math.sin(t * 8) * 0.12); rr2(-56, -24, 112, 48, 10, '#ff9fb4'); rr2(-56, -24, 40, 48, 10, '#5b8dd6'); rr2(-40, -16, 16, 8, 4, 'rgba(255,255,255,0.45)'); ctx.restore(); for (let i = 0; i < 4; i++) { const p = (t * 1.5 + i / 4) % 1; rr2(30 + p * 30, 30 + p * 20, 6, 4, 2, `rgba(255,190,200,${1 - p})`); } },
  poster(t, o) {   // a "wanted" poster of a germ (immune memory); o.g = germ icon, o.fade 0..1 blanks it
    ctx.save(); ctx.rotate(Math.sin(t * 1.3) * 0.05); rr2(-50, -62, 100, 124, 8, '#f7e8c8'); font(15, 700); ctx.fillStyle = '#7a4a2c'; ctx.textAlign = 'center'; ctx.fillText('WANTED', 0, -44);
    ctx.save(); ctx.translate(0, 4); ctx.scale(0.62, 0.62); ctx.globalAlpha *= 1 - (o.fade || 0); ICONS[o.g || 'fluV'](t, {}); ctx.restore(); circ(0, -56, 5, '#e2457a'); ctx.restore();
  },
  album(t, o) {   // memory album: a book of germ posters; o.blank erases pages
    rr2(-70, -50, 140, 100, 10, '#7a4a2c'); rr2(-64, -44, 62, 88, 6, '#f7e8c8'); rr2(2, -44, 62, 88, 6, '#f7e8c8'); const g = ['fluV', 'rhinoV', 'noroV', 'measlesV'];
    for (let i = 0; i < 4; i++) { const x = i % 2 ? 34 : -34, y = i < 2 ? -20 : 18, bl = (o.blank || 0) * 4 > i; ctx.save(); ctx.translate(x - (i % 2 ? 1 : 0) * 0, y); ctx.scale(0.3, 0.3); if (!bl) ICONS[g[i]](t + i, {}); else rr2(-40, -40, 80, 80, 10, 'rgba(122,74,44,0.15)'); ctx.restore(); }
    const fl = (t * 0.4) % 1; if (fl < 0.3) { ctx.save(); ctx.translate(0, 0); ctx.scale(Math.cos(fl / 0.3 * Math.PI), 1); rr2(0, -44, 62, 88, 6, '#efdcb8'); ctx.restore(); }
  },
  kidsGroup(t) { [[-46, '#ff8f4a', 0], [0, '#8fd8e6', 1], [46, '#b48cff', 2]].forEach(([x, c, sk], i) => { ctx.save(); ctx.translate(x, 8 + Math.sin(t * 3 + i) * 3); ctx.scale(0.62, 0.62); ICONS.kid(t + i, { col: c, skin: sk }); ctx.restore(); }); },
  crowd(t) { for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const x = -60 + i * 40 + r * 20, y = -10 + r * 40; circ(x, y - 20 + Math.sin(t * 2 + i + r) * 2, 14, SK[(i + r) % 4]); rr2(x - 16, y - 6, 32, 36, 14, ['#5b4fd6', '#e2457a', '#3fae6a', '#ff8f4a'][(i + r) % 4]); } },
  pillC(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 2) * 0.2); rr2(-56, -22, 56, 44, 22, '#ffd36b'); rr2(0, -22, 56, 44, 22, '#ff8f4a'); rr2(-44, -14, 30, 8, 4, 'rgba(255,255,255,0.45)'); ctx.restore(); },
  skullX(t) { const b = Math.sin(t * 2) * 2; circ(0, -10 + b, 46, '#e8eef6'); rr2(-26, 20 + b, 52, 30, 10, '#e8eef6'); ell(-17, -12 + b, 12, 14, '#3a3f5a'); ell(17, -12 + b, 12, 14, '#3a3f5a'); poly([[0, 4 + b], [-7, 16 + b], [7, 16 + b]], '#3a3f5a'); for (let i = 0; i < 4; i++) rr2(-17 + i * 10, 30 + b, 4, 14, 2, '#3a3f5a'); },
  check(t) { circ(0, 0, 56, '#3fae6a'); ctx.save(); ctx.rotate(0.75); rr2(-8, -34, 16, 56, 8, '#fff'); rr2(-26, 6, 26, 16, 8, '#fff'); ctx.restore(); glint(t, 56, 56); },
  cross(t) { circ(0, 0, 56, '#e2457a'); for (const a of [0.78, -0.78]) { ctx.save(); ctx.rotate(a); rr2(-8, -36, 16, 72, 8, '#fff'); ctx.restore(); } },
  question(t) { const b = Math.sin(t * 3) * 4; circ(0, b, 56, '#5b4fd6'); font(80, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 0, 6 + b); },
});
function antiY(col) { rr2(-3, -2, 6, 16, 3, col); ctx.save(); ctx.rotate(-0.6); rr2(-3, -16, 6, 16, 3, col); ctx.restore(); ctx.save(); ctx.rotate(0.6); rr2(-3, -16, 6, 16, 3, col); ctx.restore(); }
Object.assign(IDLE, {   // explicit idle entries (icons above already animate internally)
  kid: {}, adult: {}, elder: {}, doctor: {}, nose: {}, lungs: {}, brainS: { post: t => glint(t, 60, 44) }, heartR: {}, artery: {}, thermoC: {}, measlesV: {}, fluV: {}, rhinoV: {}, noroV: {}, bcell: {}, tcell: {}, antibody: {}, macro: {},
  vesicle: {}, cilia: {}, droplets: {}, vial: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.06) }, syringeC: {}, soap: {}, hands: {}, sanitizer: {}, mask: {}, house: {}, windowW: {}, humidifier: {}, drop: {}, wind: {}, cloudS: {}, sunC: {}, moon2: {},
  hglass: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.05) }, alarmC: {}, couch: {}, napper: {}, plate: {}, salt: {}, xtree: {}, gift: {}, shovel: {}, ambulance: { pre: t => ctx.translate(Math.sin(t * 9) * 1.5, 0) }, hospital: {}, ecgM: {}, wineG: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.07) },
  calDay: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) }, chart: {}, globeP: {}, eraser: {}, poster: {}, album: {}, kidsGroup: {}, crowd: {}, pillC: {}, skullX: {}, check: {}, cross: {}, question: {},
});
Object.assign(ICONS, {
  magnifier(t) { ctx.save(); ctx.rotate(-0.6 + Math.sin(t * 1.5) * 0.08); rr2(-8, 34, 16, 56, 8, '#7a4a2c'); circ(0, 0, 44, '#dfe7f2'); circ(0, 0, 34, 'rgba(143,216,230,0.55)'); rr2(-22, -20, 18, 8, 4, 'rgba(255,255,255,0.7)'); ctx.restore(); },
  ear(t, o) { const w = Math.sin(t * 2) * 0.05; ctx.save(); ctx.rotate(w); ctx.fillStyle = SK[0]; ctx.beginPath(); ctx.moveTo(-10, 60); ctx.bezierCurveTo(-60, 40, -50, -70, 10, -60); ctx.bezierCurveTo(60, -50, 50, 10, 20, 20); ctx.quadraticCurveTo(0, 30, 10, 60); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#c98a62'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(4, -14, 26, 3.6, 0.9); ctx.stroke(); ctx.restore();
    if (!o.deaf) for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${0.8 * (1 - p)})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-40, 0, 30 + p * 50, -0.7 + Math.PI, 0.7 + Math.PI); ctx.stroke(); } },
  key(t) { ctx.save(); ctx.rotate(-0.4 + Math.sin(t * 2) * 0.1); circ(-36, 0, 26, '#ffd36b'); circ(-36, 0, 11, 'rgba(0,0,0,0.25)'); rr2(-14, -9, 84, 18, 6, '#ffd36b'); rr2(46, 6, 10, 20, 3, '#ffd36b'); rr2(62, 6, 10, 26, 3, '#ffd36b'); rr2(-28, -18, 20, 6, 3, 'rgba(255,255,255,0.5)'); ctx.restore(); glint(t, 60, 26); },
  lockR(t, o) { const open = o.open ? 1 : 0; ctx.strokeStyle = '#c9d6ec'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(0, -22 - open * 20, 28, Math.PI, 0); ctx.stroke(); rr2(-44, -20, 88, 72, 14, '#3fae6a'); circ(0, 8, 11, '#1f5a3a'); rr2(-4, 10, 8, 22, 4, '#1f5a3a'); },
  shelf(t, o) {   // bookshelf; o.burn 0..1 chars it, o.same fills it with copies of one book
    rr2(-80, -76, 160, 152, 8, '#7a4a2c'); for (let r = 0; r < 3; r++) { rr2(-72, -66 + r * 48, 144, 42, 3, '#4a2c1a'); for (let b = 0; b < 8; b++) { const c = o.same ? '#9b6bd6' : ['#e2457a', '#8fd8e6', '#ffd98a', '#3fae6a', '#b48cff', '#ff8f4a'][(b + r * 3) % 6]; rr2(-68 + b * 17, -62 + r * 48 + (b % 3) * 3, 14, 38 - (b % 3) * 3, 2, c); } }
    if (o.burn) { ctx.save(); ctx.globalAlpha = clamp(o.burn); rr2(-80, -76, 160, 152, 8, 'rgba(30,20,20,0.75)'); ctx.restore(); }
  },
  flame(t) { const f = Math.sin(t * 13) * 4, g = Math.sin(t * 9 + 1) * 3; ctx.fillStyle = '#ff6f3a'; ctx.beginPath(); ctx.moveTo(0, -70 + f); ctx.quadraticCurveTo(52, -8, 34, 34); ctx.quadraticCurveTo(0, 60, -34, 34); ctx.quadraticCurveTo(-52, -8, 0, -70 + f); ctx.fill();
    ctx.fillStyle = '#ffc857'; ctx.beginPath(); ctx.moveTo(0, -30 + g); ctx.quadraticCurveTo(30, 6, 18, 30); ctx.quadraticCurveTo(0, 44, -18, 30); ctx.quadraticCurveTo(-30, 6, 0, -30 + g); ctx.fill(); },
  tubeB(t, o) { ctx.save(); ctx.rotate(Math.sin(t * 1.5) * 0.06); rr2(-22, -70, 44, 136, 18, 'rgba(220,240,255,0.5)'); rr2(-18, -6, 36, 66, 14, '#c33244'); rr2(-26, -84, 52, 22, 8, o.cap || '#5b8dd6'); rr2(-30, -44, 60, 26, 5, '#f3f7fb'); font(14, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.txt || 'BLOOD', 0, -30); ctx.restore(); glint(t, 22, 66); },
  bact(t) { ctx.save(); ctx.rotate(0.4 + Math.sin(t * 1.4) * 0.1); rr2(-64, -26, 128, 52, 26, '#5fd38a'); rr2(-56, -18, 112, 36, 18, '#8fe3a8'); for (let i = 0; i < 6; i++) { const a = Math.sin(t * 8 + i) * 8; ctx.strokeStyle = '#5fd38a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-60 + i * 24, 24); ctx.quadraticCurveTo(-56 + i * 24 + a, 44, -60 + i * 24, 60); ctx.stroke(); } ctx.restore(); eyes(t, 0, -4, 12, 5, '#20232f', 0.6); },
  baby(t) { const b = Math.sin(t * 2.6) * 3; ell(0, 30 + b, 40, 34, '#f7f1ff'); circ(0, -26 + b, 34, SK[0]); circ(0, -60 + b, 6, '#4a2c22'); eyes(t, 0, -30 + b, 12, 4.5); circ(0, -14 + b, 9, '#8fd8e6'); rr2(-14, -16 + b, 28, 6, 3, '#5b8dd6'); circ(-38, 24 + b, 11, SK[0]); circ(38, 24 + b, 11, SK[0]); },
  puzzle(t, o) { const c = o.col || '#ffd98a'; rr2(-50, -50, 100, 100, 12, c); circ(50, 0, 18, c); circ(0, -50, 18, c); ctx.save(); ctx.globalCompositeOperation = 'source-atop'; ctx.restore(); rr2(-34, -34, 30, 10, 5, 'rgba(255,255,255,0.45)'); },
  ferret(t, o) { const b = Math.sin(t * 3) * 3; ctx.save(); ctx.translate(0, b); ell(-6, 10, 66, 26, o.sick ? '#b8a890' : '#e8d6b0'); ell(-60, 22, 26, 10, '#7a5a3a', 0.4); circ(52, -8, 28, '#e8d6b0'); ell(62, -12, 16, 12, '#3a2c22'); circ(70, -6, 5, '#20232f'); circ(40, -30, 9, '#c9b090');
    const bl = 1 - blinkF(t + 0.3); ell(60, -16, 4, 4 * bl + 0.5, o.sick ? '#20232f' : '#ffffff'); rr2(-40, 30, 12, 18, 6, '#7a5a3a'); rr2(20, 30, 12, 18, 6, '#7a5a3a'); ctx.restore(); if (o.sick) puff(t, 40, -50, 2, -1, 'rgba(160,220,140,0.6)', 8); },
  monkeyF(t) { circ(0, 0, 54, '#7a5a3a'); circ(-50, -4, 18, '#7a5a3a'); circ(50, -4, 18, '#7a5a3a'); ell(0, 12, 36, 32, '#e9b7a0'); circ(-16, -18, 12, '#e9b7a0'); circ(16, -18, 12, '#e9b7a0'); const bl = 1 - blinkF(t + 0.5); circ(-16, -16, 5 * bl + 0.5, '#20232f'); circ(16, -16, 5 * bl + 0.5, '#20232f'); rr2(-10, 22, 20, 4, 2, '#7a4a2c'); },
  school(t) { rr2(-74, -30, 148, 90, 8, '#e8b46a'); poly([[-84, -26], [0, -76], [84, -26]], '#c95a5a'); rr2(-6, -100, 4, 34, 2, '#dfe7f2'); poly([[-2, -100], [26, -92 + Math.sin(t * 4) * 3], [-2, -84]], '#e2457a'); for (let i = 0; i < 4; i++) rr2(-62 + i * 34 + (i > 1 ? 12 : 0), -12, 22, 20, 3, '#8fd8e6'); rr2(-12, 20, 24, 40, 3, '#7a4a2c'); },
  docV(t, o) { ctx.save(); ctx.rotate(Math.sin(t * 1.4) * 0.05); rr2(-50, -64, 100, 128, 8, '#f3f7fb'); rr2(-50, -64, 100, 24, 8, '#3a7bd5'); font(13, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(o.title || 'VACCINE RECORD', 0, -48);
    for (let i = 0; i < 4; i++) { rr2(-38, -28 + i * 22, 50, 6, 3, '#9fb0d8'); if (i < (o.ticks ?? 2)) { ctx.strokeStyle = '#3fae6a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(22, -26 + i * 22); ctx.lineTo(28, -20 + i * 22); ctx.lineTo(40, -32 + i * 22); ctx.stroke(); } } ctx.restore(); },
  shieldC(t, o) { ctx.save(); ctx.scale(1.3, 1.3); ICONS.shield(t, o); if (o.crack) { ctx.strokeStyle = '#102348'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(-8, -20); ctx.lineTo(8, 0); ctx.lineTo(-4, 30); ctx.stroke(); } ctx.restore(); if (o.txt) { font(26, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.txt, 0, -2); } },
});
Object.assign(IDLE, { magnifier: {}, ear: {}, key: {}, lockR: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.05) }, shelf: {}, flame: {}, tubeB: {}, bact: {}, baby: {}, puzzle: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.08) }, ferret: {}, monkeyF: { pre: t => ctx.rotate(Math.sin(t * 2) * 0.06) }, school: {}, docV: {}, shieldC: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.05), post: t => glint(t, 56, 66) } });
Object.assign(ICONS, {
  battery(t, o) { const lv = o.level ?? ((t * 0.25) % 1); rr2(-70, -36, 132, 72, 14, '#f3f7fb'); rr2(62, -14, 14, 28, 5, '#f3f7fb'); rr2(-62, -28, 116, 56, 8, '#102348'); rr2(-58, -24, 108 * clamp(lv), 48, 6, lv < 0.25 ? '#e2457a' : lv < 0.6 ? '#ffd36b' : '#5fd38a');
    if (o.charge) poly([[4, -30], [-14, 4], [0, 4], [-6, 32], [16, -6], [2, -6]], '#ffd98a'); },
  smokeAlarm(t) { const on = Math.sin(t * 8) > 0.2; ell(0, 0, 66, 26, '#f3f7fb'); ell(0, -6, 60, 18, '#dfe7f2'); circ(30, -6, 7, on ? '#ff4060' : '#7a1f33'); for (let i = 0; i < 5; i++) rr2(-40 + i * 12, -10, 6, 10, 3, '#9fb0d8');
    if (on) for (let i = 0; i < 2; i++) { ctx.strokeStyle = `rgba(255,96,128,${0.7 - i * 0.3})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 80 + i * 18, 0.3, Math.PI - 0.3); ctx.stroke(); } },
  traffic(t) { rr2(-28, -76, 56, 150, 16, '#2b3244'); const ph = Math.floor(t / 1.5) % 3; ['#ff4060', '#ffd36b', '#5fd38a'].forEach((c, i) => circ(0, -46 + i * 46, 17, ph === i ? c : 'rgba(255,255,255,0.12)')); rr2(-6, 74, 12, 30, 4, '#5b6585'); },
  cards(t) { [[-26, -0.3, '#f3f7fb', '#e2457a'], [0, 0, '#f3f7fb', '#20232f'], [26, 0.3, '#f3f7fb', '#e2457a']].forEach(([x, r, c, s], i) => { ctx.save(); ctx.translate(x, 10); ctx.rotate(r + Math.sin(t * 2 + i) * 0.05); rr2(-34, -50, 68, 96, 8, c); ICONS_star(0, 0, 14); circ(-20, -36, 5, s); ctx.restore(); }); },
  bpGauge(t, o) { const v = o.v ?? 0.5; rr2(-74, -20, 70, 64, 18, '#5b6585'); circ(34, -6, 48, '#f3f7fb'); circ(34, -6, 40, '#102348'); for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(34, -6); ctx.rotate(-2.4 + i * 0.8); rr2(-2, -36, 4, 7, 2, i > 4 ? '#ff6f7a' : '#8fd8e6'); ctx.restore(); }
    ctx.save(); ctx.translate(34, -6); ctx.rotate(-2.4 + (v + Math.sin(t * 3) * 0.03) * 4.8); rr2(-3, -32, 6, 34, 3, '#ff8f4a'); ctx.restore(); circ(-40, 56, 16, '#e2457a'); },
  desk(t, o) { rr2(-90, 10, 180, 16, 6, '#9a7a5a'); rr2(-80, 26, 12, 44, 4, '#7a5a3a'); rr2(68, 26, 12, 44, 4, '#7a5a3a'); rr2(20, -40, 60, 44, 6, '#3a3f5a'); rr2(26, -34, 48, 32, 4, '#8fd8e6');
    const nod = o.nod ? Math.max(0, Math.sin(t * 1.4)) : 0; ctx.save(); ctx.translate(-40, -10); rr2(-22, -10, 44, 30, 14, o.col || '#5b4fd6'); ctx.rotate(nod * 0.9); circ(0, -34, 20, SK[0]); ctx.fillStyle = '#2c1c16'; ctx.beginPath(); ctx.arc(0, -38, 21, Math.PI * 1.1, -0.1); ctx.fill(); rr2(-10, -36, 8, 3, 1.5, '#20232f'); rr2(4, -36, 8, 3, 1.5, '#20232f'); ctx.restore();
    if (o.nod) { font(22, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.fillText('z', -10 + (t * 20) % 20, -70 - (t * 20) % 20); } },
  hammock(t) { ctx.strokeStyle = '#9a7a5a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-90, -60); ctx.lineTo(-90, 60); ctx.moveTo(90, -60); ctx.lineTo(90, 60); ctx.stroke(); const sw = Math.sin(t * 1.4) * 6;
    ctx.fillStyle = '#ff8f4a'; ctx.beginPath(); ctx.moveTo(-90, -40); ctx.quadraticCurveTo(sw, 50, 90, -40); ctx.quadraticCurveTo(sw, 20, -90, -40); ctx.fill(); circ(-50 + sw, -6, 16, SK[1]); rr2(-40 + sw, -6, 70, 18, 9, '#3fae6a'); puff(t, -50 + sw, -30, 2, -1, 'rgba(255,217,138,0.8)', 6); },
  diver(t, o) { const d = o.deep ? 1 : 0; ctx.save(); ctx.rotate(Math.sin(t * 1.2) * 0.12); rr2(-20, -10, 40, 70, 18, '#3a3f5a'); circ(0, -30, 24, '#ffd36b'); circ(0, -30, 16, '#8fd8e6'); rr2(-34, 0, 14, 36, 7, '#ff8f4a'); rr2(-16, 60, 14, 22, 6, '#3a3f5a'); rr2(4, 60, 14, 22, 6, '#3a3f5a'); ctx.restore();
    for (let i = 0; i < 4; i++) { const p = (t * 0.7 + i / 4) % 1; circ(14 + Math.sin(i * 3 + t * 2) * 6, -50 - p * 70, 4 + i % 3 * 2, `rgba(220,245,255,${0.8 * (1 - p)})`); } },
  pilot(t) { ICONS.adult(t, { col: '#2b3a6a' }); rr2(-30, -82, 60, 16, 6, '#2b3a6a'); rr2(-34, -70, 68, 6, 3, '#1a2440'); rr2(-6, -80, 12, 8, 3, '#ffd98a'); },
  carS(t, o) { ctx.save(); ctx.rotate(o.drift ? Math.sin(t * 3) * 0.12 : 0); ICONS.car(t); ctx.restore(); rr2(-90, 44, 180, 6, 3, 'rgba(255,255,255,0.5)'); for (let i = 0; i < 3; i++) rr2(-80 + i * 60 - ((t * 120) % 60), 52, 30, 5, 2, '#ffd98a'); },
  bedH(t, o) { rr2(-90, -10, 180, 40, 10, '#f3f7fb'); rr2(-96, -50, 14, 100, 6, '#9fb0d8'); rr2(82, -30, 14, 80, 6, '#9fb0d8'); rr2(-80, -26, 44, 20, 10, '#dfe7f2'); rr2(-36, -18, 116, 26, 12, o.col || '#8fd8e6'); circ(-60, -28, 18, SK[o.skin || 0]); wheel(t * 0, -70, 56, 10); wheel(t * 0, 70, 56, 10); },
  airway(t, o) {   // throat airway seen from the side: collapses when o.block, air streaks flow when open
    const k = o.block ? 0.5 + 0.5 * Math.sin(t * 2) : 0; rr2(-40, -76, 80, 152, 30, '#f29db0'); rr2(-22 + 14 * k, -70, 44 - 28 * k, 140, 16, '#7a1f33');
    if (k < 0.5) for (let i = 0; i < 4; i++) { const p = (t * 1.2 + i / 4) % 1; rr2(-4, -70 + p * 140, 8, 18, 4, `rgba(220,245,255,${0.8 * Math.sin(p * Math.PI)})`); } else rr2(-30, -6, 60, 12, 6, '#e2457a'); },
  tangle(t) { ctx.strokeStyle = '#ff8f4a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const a = i * 0.6 + k * 2 + t * 0.6, r = 18 + i * 1.6; ctx.lineTo(Math.cos(a) * r * 0.9, Math.sin(a * 1.3) * r * 0.6); } ctx.stroke(); } },
  receptor(t, o) {   // a keyhole receptor on a brain-cell surface; o.cap shows a caffeine cap plugged in, o.ado shows adenosine docked
    rr2(-80, 10, 160, 50, 20, '#f2b3c0'); rr2(-26, -20, 52, 40, 10, '#d98aa0'); circ(0, -6, 12, '#7a1f33'); rr2(-5, -6, 10, 22, 4, '#7a1f33');
    if (o.cap) { const b = Math.sin(t * 4) * 2; rr2(-22, -46 + b, 44, 30, 8, '#7a4a2c'); rr2(-14, -40 + b, 28, 8, 4, '#b07a4a'); }
    if (o.ado) { ctx.save(); ctx.translate(0, -34); ctx.scale(0.5, 0.5); ICONS.hexmol(t); ctx.restore(); } },
  sensorW(t) { ell(0, 0, 70, 30, SK[0]); rr2(-40, -26, 26, 52, 8, '#3a3f5a'); rr2(14, -26, 26, 52, 8, '#3a3f5a'); rr2(-22, -34, 44, 68, 12, '#20232f'); rr2(-16, -28, 32, 56, 8, '#102348'); circ(0, 0, 6 + 2 * Math.sin(t * 6), '#7ff3a0'); },
});
Object.assign(IDLE, { battery: {}, smokeAlarm: {}, traffic: {}, cards: {}, bpGauge: {}, desk: {}, hammock: {}, diver: {}, pilot: {}, carS: {}, bedH: {}, airway: {}, tangle: { pre: t => ctx.rotate(t * 0.2) }, receptor: {}, sensorW: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.06) } });
Object.assign(ICONS, {
  palm(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.2) * 0.04); rr2(-8, -20, 16, 100, 8, '#9a7a5a'); for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(0, -24); ctx.rotate(-2.4 + i * 0.6 + Math.sin(t * 2 + i) * 0.06); ell(36, 0, 40, 11, '#3fae6a'); ctx.restore(); } circ(-8, -16, 7, '#7a4a2c'); circ(8, -14, 7, '#7a4a2c'); ctx.restore(); },
  table(t, o) {   // a holiday dinner table with a family; o.tense makes faces stressed
    rr2(-100, 14, 200, 18, 8, '#9a5a3a'); rr2(-90, 32, 12, 40, 4, '#7a4a2c'); rr2(78, 32, 12, 40, 4, '#7a4a2c'); ell(0, 6, 34, 12, '#f3f7fb'); circ(-6, -2, 14, '#c98a52'); puff(t, 0, -12, 2, -1, 'rgba(255,255,255,0.5)', 7);
    [[-70, '#e2457a', 0], [-30, '#3fae6a', 1], [70, '#5b4fd6', 2]].forEach(([x, c, sk], i) => { const b = Math.sin(t * 2 + i) * 2; rr2(x - 16, -20 + b, 32, 36, 14, c); circ(x, -36 + b, 15, SK[sk]); if (o.tense) { rr2(x - 9, -42 + b, 7, 3, 1.5, '#20232f'); rr2(x + 2, -42 + b, 7, 3, 1.5, '#20232f'); rr2(x - 6, -30 + b, 12, 3, 1.5, '#9b3352'); } else eyes(t + i, x, -38 + b, 6, 3); });
    if (o.tense) for (let i = 0; i < 3; i++) { const p = (t * 1.5 + i / 3) % 1; ctx.strokeStyle = `rgba(255,96,96,${1 - p})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40 + i * 40, -64 - p * 20); ctx.lineTo(-30 + i * 40, -74 - p * 20); ctx.lineTo(-20 + i * 40, -64 - p * 20); ctx.stroke(); } },
  ham(t) { ell(0, 20, 80, 26, '#f3f7fb'); ell(0, 6, 56, 40, '#d6705a'); ell(-6, 0, 44, 30, '#e8907a'); for (let i = 0; i < 4; i++) rr2(-30 + i * 16, -24, 4, 40, 2, 'rgba(160,60,40,0.5)'); rr2(46, -18, 26, 12, 6, '#f3f7fb'); puff(t, -10, -40, 3, -1, 'rgba(255,255,255,0.5)', 8); },
  eggnog(t) { const sl = Math.sin(t * 3) * 3; rr2(-30, -40, 60, 90, 12, 'rgba(232,243,255,0.4)'); rr2(-26, -20 + sl * 0.3, 52, 66, 10, '#fff1c8'); ell(0, -22 + sl * 0.3, 26, 8, '#ffffff'); circ(-8, -26, 3, '#b07a4a'); circ(8, -24, 3, '#b07a4a'); rr2(20, -60, 6, 50, 3, '#e2457a'); },
  adren(t) {   // stress hormone bottle with a bolt (adrenaline)
    rr2(-30, -40, 60, 96, 14, '#ffd36b'); rr2(-18, -60, 36, 24, 6, '#f3f7fb'); poly([[6, -26], [-14, 10], [0, 10], [-8, 44], [16, 2], [2, 2]], '#e2457a'); for (let i = 0; i < 3; i++) { const p = (t * 1.6 + i / 3) % 1; circ(-40 - p * 30, -20 + i * 20, 5 * (1 - p), '#ffd36b'); } },
  snowpile(t) { ell(0, 30, 90, 40, '#f3f7fb'); ell(-30, 6, 50, 30, '#f3f7fb'); ell(30, 0, 44, 32, '#e8f2ff'); for (let i = 0; i < 6; i++) { const p = (t * 0.4 + i / 6) % 1; circ(-80 + i * 32 + Math.sin(t + i) * 8, -80 + p * 120, 4, `rgba(255,255,255,${1 - p})`); } },
  snowblower(t) { rr2(-60, -10, 100, 50, 12, '#e2457a'); rr2(30, -50, 8, 50, 4, '#5b6585'); rr2(30, -56, 40, 10, 5, '#5b6585'); wheel(t, -36, 46, 14); wheel(t, 24, 46, 14); rr2(-80, 10, 30, 30, 6, '#5b6585'); for (let i = 0; i < 5; i++) { const p = (t * 1.4 + i / 5) % 1; circ(-70 - p * 60, -10 - p * 60, 5 + p * 4, `rgba(255,255,255,${1 - p})`); } },
  car2(t) { ICONS.car(t); },
  phone911(t) { ICONS.phone(t); },
  stopwatch(t) { circ(0, 8, 54, '#f3f7fb'); circ(0, 8, 44, '#102348'); rr2(-10, -60, 20, 14, 5, '#f3f7fb'); ctx.save(); ctx.translate(0, 8); ctx.rotate(t * 3); rr2(-3, -38, 6, 40, 3, '#e2457a'); ctx.restore(); circ(0, 8, 6, '#ffd98a'); },
});
Object.assign(IDLE, { palm: {}, table: {}, ham: {}, eggnog: {}, adren: { pre: t => ctx.rotate(Math.sin(t * 6) * 0.06) }, snowpile: {}, snowblower: {}, car2: {}, phone911: {}, stopwatch: {} });
