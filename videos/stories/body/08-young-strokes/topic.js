// "Why are so many young adults having strokes?" — topic file (engine + common.js cast system + icons2.js)
// Visual rework 2026-11-21: interacting icons (ep 11+ style). Every line is a small picture-story: clots fly into
// arteries and brains, hammers hit vessel walls, neurons crumble, scanners zap, catheters pull clots out.
function brainAt(t, x, y, r, o = {}) { drawBrainAt(t, { x, y, r }, { tired: o.tired || 0, glow: o.glow ?? 0.3, dim: o.dim || 0, noWaste: 1, halo: o.halo }); }   // shaded hero brain
Object.assign(ICONS, {
  // ---------- kept from the first cut ----------
  bpcuff(t) { rr2(-70, -40, 90, 80, 20, '#5b6585'); rr2(-62, -30, 74, 60, 14, '#3a3f5a'); const p = 0.6 + 0.4 * Math.sin(t * 3); ctx.save(); ctx.translate(60, 0); circ(0, 0, 44, '#f3f7fb'); circ(0, 0, 36, '#102348'); ctx.save(); ctx.rotate(-1.8 + p * 2.4); rr2(-3, -30, 6, 32, 3, '#ff8f4a'); ctx.restore(); circ(0, 0, 6, '#ffd98a'); ctx.restore(); rr2(-20, 36, 10, 40, 5, '#9aa6c4'); circ(-15, 84, 16, '#e2457a'); },
  sugarcube(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.4) * 0.15); rr2(-46, -46, 92, 92, 14, '#f3f7fb'); rr2(-46, -46, 92, 26, 12, '#ffffff'); for (let i = 0; i < 9; i++) circ(-30 + (i % 3) * 30, -24 + Math.floor(i / 3) * 26, 3, '#c9d6ec'); ctx.restore(); },
  heartE(t) { const b = 1 + 0.08 * Math.max(0, Math.sin(t * 9 + Math.sin(t * 3) * 2)); ctx.save(); ctx.scale(b, b); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(0, 50); ctx.bezierCurveTo(-76, 0, -50, -60, 0, -26); ctx.bezierCurveTo(50, -60, 76, 0, 0, 50); ctx.fill(); rr2(-34, -30, 24, 10, 5, 'rgba(255,255,255,0.4)'); ctx.restore();
    ctx.strokeStyle = '#7ff3a0'; ctx.lineWidth = 5; ctx.beginPath(); for (let x = -70; x <= 70; x += 2) { const u = (x + 70) / 140 + t * 0.7, ph = (u * 4) % 1; ctx.lineTo(x, 80 + Math.sin(u * 50) * 4 + (ph > 0.4 && ph < 0.45 ? -26 : 0)); } ctx.stroke(); },
  leaf7(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.5) * 0.08); rr2(-3, 0, 6, 70, 3, '#3f7f4c'); for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.42, len = 80 - Math.abs(i - 3) * 16; ctx.save(); ctx.rotate(a + Math.PI / 2); ctx.fillStyle = i % 2 ? '#5aa96a' : '#6fc07a'; ctx.beginPath(); ctx.ellipse(0, -len / 2, 10, len / 2, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); },
  scanner(t) { circ(0, 0, 80, '#e8eef6'); circ(0, 0, 44, '#3a3f5a'); rr2(-110, 30, 220, 26, 10, '#c9d6ec'); const p = (t * 0.8) % 1; ctx.save(); ctx.globalAlpha = 0.6; ctx.strokeStyle = '#8fd8e6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 60, p * 6.283, p * 6.283 + 1.2); ctx.stroke(); ctx.restore(); },
  neck(t) { circ(0, -70, 40, SKIN); rr2(-28, -40, 56, 110, 20, SKIN); ctx.strokeStyle = '#e2457a'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-8, 60); ctx.quadraticCurveTo(-14, 0, -4, -50); ctx.stroke(); const p = 0.5 + 0.5 * Math.sin(t * 4); circ(-10, 4, 10 + 4 * p, 'rgba(255,217,138,0.9)'); },
  pfo(t) { const b = 1 + 0.05 * Math.max(0, Math.sin(t * 6)); ctx.scale(b, b); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.ellipse(0, 0, 80, 70, 0, 0, 6.283); ctx.fill(); rr2(-4, -70, 8, 140, 4, '#9b3352'); circ(-36, -20, 24, '#b8325a'); circ(36, -20, 24, '#b8325a'); circ(-36, 30, 26, '#c43a6a'); circ(36, 30, 26, '#c43a6a'); rr2(-5, -30, 10, 16, 5, '#ffd98a'); const p = (t * 0.7) % 1; circ(lerp(-30, 30, p), -22, 7, '#5e1a26'); },
  aura(t) { for (let i = 0; i < 5; i++) { const a = t * 2 + i * 1.256; ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 5 + i); ctx.strokeStyle = ['#ffd98a', '#8fd8e6', '#ff8fd8'][i % 3]; ctx.lineWidth = 6; ctx.beginPath(); for (let k = 0; k < 6; k++) ctx.lineTo(Math.cos(a) * 40 + k * 12 - 30, Math.sin(a) * 40 + (k % 2 ? -10 : 10)); ctx.stroke(); ctx.restore(); } circ(0, 0, 14, 'rgba(255,255,255,0.8)'); },
  catheter(t) { ctx.strokeStyle = '#c9d6ec'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-80, 70); ctx.bezierCurveTo(-40, 0, 10, 40, 40, -30); ctx.stroke(); const k = (Math.sin(t * 1.5) + 1) / 2; ctx.fillStyle = '#5e1a26'; ctx.beginPath(); ctx.ellipse(46 + k * 10, -40 - k * 14, 18, 12, -0.6, 0, 6.283); ctx.fill(); rr2(30, -50, 26, 8, 4, '#ffd98a'); },
  dizzy(t) { for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(t * 3 + i * 2.094); ICONS_star(40, 0, 14); ctx.restore(); } circ(0, 0, 22, SKIN); },
  rewire(t) { const P = [[-60, -30], [-20, -50], [30, -40], [60, 0], [20, 40], [-40, 30], [0, 0]]; P.forEach(([x, y], i) => P.forEach(([x2, y2], j) => { if (j <= i || (i + j) % 3) return; const on = (Math.sin(t * 2 + i + j) + 1) / 2; ctx.strokeStyle = `rgba(255,217,138,${0.2 + 0.7 * on})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke(); })); P.forEach(([x, y], i) => circ(x, y, 10, i % 2 ? '#8fd8e6' : '#f29db0')); },
  // ---------- new for the rework ----------
  clotB(t) {   // a blood clot: dark lobed blob, fibrin strands, trapped red cells; jiggles
    ctx.fillStyle = '#7a1f33'; ctx.beginPath(); for (let i = 0; i <= 14; i++) { const a = i / 14 * 6.283, r = 52 * (1 + 0.12 * Math.sin(i * 2.7 + t * 3)); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.85); } ctx.fill();
    ell(-4, -4, 38, 30, '#a3243a'); for (let i = 0; i < 3; i++) rbcDisc(-20 + i * 20, 6 - (i % 2) * 16, 11, 0.7, i + t * 0.3);
    ctx.strokeStyle = 'rgba(255,230,200,0.5)'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-36 + i * 22, -30); ctx.quadraticCurveTo(-28 + i * 22 + Math.sin(t * 2 + i) * 6, 0, -34 + i * 22, 30); ctx.stroke(); }
    rr2(-30, -36, 20, 8, 4, 'rgba(255,255,255,0.35)');
  },
  neuron(t) {   // nerve cell: body with dendrites, a myelinated axon and a travelling signal
    ctx.strokeStyle = '#f2b3c0'; ctx.lineCap = 'round'; ctx.lineWidth = 8;
    for (let i = 0; i < 6; i++) { const a = 1.9 + i * 0.5 + Math.sin(t * 1.5 + i) * 0.05, x1 = -26 + Math.cos(a) * 30, y1 = Math.sin(a) * 30, x2 = -26 + Math.cos(a) * 58, y2 = Math.sin(a) * 50; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(-6, 0); ctx.quadraticCurveTo(24, -8, 56, 2); ctx.stroke(); for (let i = 0; i < 3; i++) rr2(4 + i * 16, -9 + i * 1.5, 12, 14, 6, '#ffd98a');
    for (const [x, y] of [[62, -10], [64, 6], [58, 18]]) circ(x, y, 6, '#f29db0');
    circ(-26, 0, 26, '#f29db0'); circ(-24, 2, 11, '#c95a7c'); rr2(-40, -16, 14, 6, 3, 'rgba(255,255,255,0.45)');
    const p = (t * 1.1) % 1; circ(-6 + p * 62, -4 + Math.sin(p * Math.PI) * -6, 6, '#ffffff');
  },
  cig(t, o) {   // cigarette with a glowing tip and smoke; o.no stamps a red cross on it
    ctx.save(); ctx.rotate(-0.25); rr2(-70, -11, 112, 22, 7, '#f3f7fb'); rr2(-70, -11, 32, 22, 7, '#ff9f4a'); rr2(38, -11, 12, 22, 5, Math.sin(t * 5) > 0 ? '#ff4060' : '#ff8f4a'); ctx.restore();
    puff(t, 50, -30, 3, -1, 'rgba(255,255,255,0.5)', 10);
    if (o.no) { circ(46, 34, 26, '#e2457a'); for (const a of [0.78, -0.78]) { ctx.save(); ctx.translate(46, 34); ctx.rotate(a); rr2(-5, -16, 10, 32, 5, '#fff'); ctx.restore(); } }
  },
  runner(t) {   // a person jogging: legs and arms swing, body bobs
    const p = t * 8, b = Math.abs(Math.sin(p)) * 6; ctx.save(); ctx.translate(0, -b);
    for (const s of [-1, 1]) { ctx.save(); ctx.translate(0, 26); ctx.rotate(Math.sin(p) * 0.7 * s); rr2(-8, 0, 16, 46, 8, '#2d2b7c'); ctx.restore(); }
    ctx.save(); ctx.rotate(0.2); rr2(-22, -36, 44, 70, 20, '#3fae6a'); ctx.restore();
    for (const s of [-1, 1]) { ctx.save(); ctx.translate(4, -20); ctx.rotate(-Math.sin(p) * 0.9 * s + 0.3); rr2(-6, 0, 12, 38, 6, s > 0 ? '#3fae6a' : '#2f8f55'); ctx.restore(); }
    circ(10, -58, 22, SKIN); ctx.fillStyle = '#4a2c22'; ctx.beginPath(); ctx.arc(10, -62, 23, Math.PI * 1.05, -0.05); ctx.fill(); ell(20, -56, 3, 3.5 * (1 - blinkF(t)) + 0.4, '#20232f'); ctx.restore();
  },
  pillPack(t) {   // blister pack of daily pills; one pops out every few seconds
    ctx.save(); ctx.rotate(-0.12 + Math.sin(t * 1.3) * 0.05); rr2(-60, -50, 120, 100, 14, '#b48cff'); rr2(-60, -50, 120, 22, 12, '#c9a8ff');
    const gone = Math.floor(t * 0.7) % 12; for (let i = 0; i < 12; i++) { const x = -42 + (i % 4) * 28, y = -16 + Math.floor(i / 4) * 24; circ(x, y, 10, '#8f6ad6'); if (i !== gone) { circ(x, y, 8, '#f3f7fb'); circ(x - 2, y - 3, 3, '#ffffff'); } }
    ctx.restore(); glint(t, 60, 50);
  },
  pgrid(t, o) {   // 100 little people; the first o.n are lit (shares "of patients")
    rr2(-66, -66, 132, 132, 16, 'rgba(6,20,40,0.45)'); const n = o.n || 0, col = o.col || '#7fd36b';
    for (let i = 0; i < 100; i++) { const x = -54 + (i % 10) * 12, y = -52 + Math.floor(i / 10) * 12.2, on = i < n, pu = on ? 1 + 0.15 * Math.sin(t * 4 + i * 0.7) : 1;
      circ(x, y - 2, 3.4 * pu, on ? col : '#5b6585'); rr2(x - 3.6 * pu, y + 1.4, 7.2 * pu, 4, 2, on ? col : '#4a5370'); }
  },
  pie(t, o) {   // share of strokes: clot slice (purple) vs bleed slice (pink), sweeping in with o.k
    const k = o.k ?? 1, a0 = -Math.PI / 2, a1 = a0 + 6.283 * 0.87 * k, pop = 6 + 4 * Math.sin(t * 3);
    circ(0, 0, 60, 'rgba(6,20,40,0.45)'); ctx.fillStyle = '#7f6ff0'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 58, a0, a1); ctx.closePath(); ctx.fill();
    if (k >= 1) { const am = a1 + 6.283 * 0.065; ctx.save(); ctx.translate(Math.cos(am) * pop, Math.sin(am) * pop); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 58, a1, a0 + 6.283); ctx.closePath(); ctx.fill(); ctx.restore(); }
    rr2(-36, -40, 26, 9, 4.5, 'rgba(255,255,255,0.35)');
  },
  countyMap(t, o) {   // five counties on either side of a winding river; hospitals pulse as they light up (o.k 0..1)
    const k = o.k ?? 1, T5 = [[-44, -38, '#5aa96a'], [0, -42, '#6fc07a'], [44, -36, '#5aa96a'], [-24, 32, '#5b8dd6'], [26, 34, '#6f9cf0']];
    T5.forEach(([x, y, c], i) => { rr2(x - 24, y - 22, 48, 44, 10, i / 5 < k ? c : '#4a5370'); if (i / 5 < k) { const p = 1 + 0.2 * Math.sin(t * 4 + i); circ(x, y - 2, 7 * p, '#ffffff'); rr2(x - 1.6, y - 7, 3.2, 10, 1.5, '#e2457a'); rr2(x - 5, y - 3.6, 10, 3.2, 1.5, '#e2457a'); } });
    ctx.strokeStyle = '#8fd8e6'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = -70; x <= 70; x += 4) ctx.lineTo(x, -2 + Math.sin(x * 0.06 + t * 2) * 5); ctx.stroke();
  },
  hammer(t) { ctx.save(); ctx.translate(0, 40); ctx.rotate(-0.5 + Math.max(0, Math.sin(t * 5)) ** 2 * 0.6); rr2(-8, -70, 16, 100, 8, '#9a7a5a'); rr2(-48, -100, 96, 38, 10, '#9aa6c4'); rr2(-48, -100, 96, 12, 6, '#c9d6ec'); ctx.restore(); },
  ball(t) { ctx.save(); ctx.rotate(t * 2.5); circ(0, 0, 50, '#f3f7fb'); for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; ctx.save(); ctx.translate(Math.cos(a) * 34, Math.sin(a) * 34); ctx.rotate(a); poly([[0, -11], [10, -4], [7, 9], [-7, 9], [-10, -4]], '#3a3f5a'); ctx.restore(); } poly([[0, -13], [12, -4], [8, 11], [-8, 11], [-12, -4]], '#3a3f5a'); ctx.restore(); rr2(-30, -32, 18, 7, 3.5, 'rgba(255,255,255,0.6)'); },
  faceD(t) {   // a face whose right side droops (F for face)
    const d = 0.5 + 0.5 * Math.sin(t * 1.6); circ(0, 0, 56, SKIN); ctx.fillStyle = '#4a2c22'; ctx.beginPath(); ctx.arc(0, -8, 58, Math.PI * 1.08, -0.08); ctx.fill();
    eyes(t, 0, -2, 20, 6); ell(20, -6 + d * 3, 10, 4 + d * 2, SKIN); ctx.strokeStyle = '#9b3352'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 24); ctx.quadraticCurveTo(0, 30, 20, 24 + d * 12); ctx.stroke();
    circ(-24, 12, 7, 'rgba(226,69,122,0.4)');
  },
  armD(t) {   // two arms held out; one drifts down (A for arms)
    const d = 0.5 + 0.5 * Math.sin(t * 1.4); rr2(-30, -10, 60, 76, 24, '#5b4fd6'); circ(0, -36, 24, SKIN); eyes(t, 0, -38, 9, 4);
    ctx.save(); ctx.translate(-22, 4); ctx.rotate(-Math.PI / 2 - 0.1); rr2(-8, 0, 16, 60, 8, '#5b4fd6'); circ(0, 62, 9, SKIN); ctx.restore();
    ctx.save(); ctx.translate(22, 4); ctx.rotate(-Math.PI / 2 + 0.1 + d * 0.8); rr2(-8, -60, 16, 60, 8, '#7f6ff0'); circ(0, -62, 9, SKIN); ctx.restore();
  },
  slur(t) {   // speech bubble with scrambled letters (S for speech)
    circ(0, -6, 52, '#f3f7fb'); circ(-36, 42, 11, '#f3f7fb'); circ(-50, 60, 6, '#f3f7fb'); font(30, 700); ctx.fillStyle = '#7f6ff0'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    'BLAH'.split('').forEach((c, i) => { ctx.save(); ctx.translate(-27 + i * 18, -6 + Math.sin(t * 5 + i * 1.7) * 7); ctx.rotate(Math.sin(t * 3 + i) * 0.4); ctx.fillText(c, 0, 0); ctx.restore(); });
  },
  scaleB(t) {   // bathroom scale with a wobbling needle
    rr2(-64, -14, 128, 76, 22, '#f3f7fb'); rr2(-64, -14, 128, 18, 12, '#ffffff'); ell(-30, 34, 20, 12, '#c9d6ec'); ell(30, 34, 20, 12, '#c9d6ec');
    circ(0, -34, 40, '#e8eef6'); circ(0, -34, 32, '#102348'); for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(0, -34); ctx.rotate(-1.4 + i * 0.47); rr2(-2, -28, 4, 7, 2, i > 4 ? '#ff6f7a' : '#8fd8e6'); ctx.restore(); }
    ctx.save(); ctx.translate(0, -34); ctx.rotate(0.5 + Math.sin(t * 2.6) * 0.35); rr2(-3, -26, 6, 28, 3, '#ff8f4a'); ctx.restore(); circ(0, -34, 5, '#ffd98a');
  },
  ivBag(t) {   // clot-buster drip: bag with sloshing fluid, falling drops
    circ(0, -78, 8, '#9aa6c4'); rr2(-44, -70, 88, 104, 22, 'rgba(220,240,255,0.6)'); const sl = Math.sin(t * 2.4) * 4;
    ctx.save(); ctx.beginPath(); ctx.roundRect(-38, -64, 76, 92, 18); ctx.clip(); ctx.fillStyle = '#8fd8e6'; ctx.beginPath(); ctx.moveTo(-40, -20 + sl); ctx.quadraticCurveTo(0, -28 - sl, 40, -20 - sl); ctx.lineTo(40, 30); ctx.lineTo(-40, 30); ctx.fill(); ctx.restore();
    rr2(-26, -58, 52, 14, 6, '#ffd98a'); rr2(-30, -10, 14, 30, 7, 'rgba(255,255,255,0.4)'); rr2(-8, 34, 16, 14, 4, '#c9d6ec'); rr2(-3, 46, 6, 30, 3, '#c9d6ec');
    for (let i = 0; i < 2; i++) { const p = (t * 1.3 + i * 0.5) % 1; circ(0, 50 + p * 24, 5 * (1 - p * 0.4), '#5aa9e6'); }
  },
  warn(t) {   // flashing warning sign
    const f = 0.5 + 0.5 * Math.sin(t * 6); ctx.save(); ctx.globalAlpha *= 0.4 + 0.5 * f; for (let i = 0; i < 6; i++) { ctx.save(); ctx.rotate(-1.2 + i * 0.48); rr2(-4, -86, 8, 16, 4, '#ffd36b'); ctx.restore(); } ctx.restore();
    ctx.fillStyle = '#ffd36b'; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(8, -62, 12, -54); ctx.lineTo(62, 38); ctx.quadraticCurveTo(64, 50, 52, 50); ctx.lineTo(-52, 50); ctx.quadraticCurveTo(-64, 50, -62, 38); ctx.lineTo(-12, -54); ctx.quadraticCurveTo(-8, -62, 0, -60); ctx.fill();
    rr2(-7, -26, 14, 46, 7, '#20232f'); circ(0, 34, 8, '#20232f'); rr2(-34, 26, 20, 7, 3.5, 'rgba(255,255,255,0.35)');
  },
  brainX(t, o) {   // side-view brain (folds, cerebellum, stem) + o.clot (dark blocked area), o.bleed (red spill), o.wire (new links), o.glow
    if (o.glow) { const rg = ctx.createRadialGradient(0, 0, 20, 0, 0, 120); rg.addColorStop(0, `rgba(155,227,165,${0.45 * o.glow})`); rg.addColorStop(1, 'rgba(155,227,165,0)'); ctx.fillStyle = rg; ctx.fillRect(-120, -120, 240, 240); }
    ICONS.brainS(t, o);
    if (o.clot) { const c = o.clot; ctx.save(); ctx.globalAlpha *= 0.55 * c; ell(14, -16, 34 * c, 24 * c, '#5b6585'); ctx.restore(); circ(14, -16, 9 * c, '#7a1f33'); circ(12, -18, 4 * c, '#a3243a'); }
    if (o.bleed) { const b = o.bleed; ctx.fillStyle = 'rgba(200,30,50,0.9)'; ctx.beginPath(); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283, r = 26 * b * (0.75 + 0.25 * Math.sin(i * 2.3 + t * 2)); ctx.lineTo(-22 + Math.cos(a) * r, -6 + Math.sin(a) * r * 0.8); } ctx.fill(); }
    if (o.wire) { const P = [[-44, -14], [-26, -34], [-40, 12], [40, -6], [34, -30]]; ctx.strokeStyle = '#ffd98a'; ctx.lineCap = 'round'; ctx.lineWidth = 4;
      P.forEach(([x, y], i) => { const k = clamp(o.wire * 1.6 - i * 0.15), on = 0.6 + 0.4 * Math.sin(t * 4 + i); ctx.globalAlpha *= on; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(lerp(x, 14, k), lerp(y, -16, k)); ctx.stroke(); ctx.globalAlpha /= on; circ(x, y, 5, '#ffd98a'); }); }
  },
  arteryX(t, o) {   // artery segment (icons2) + o.burst (blood spilling out of the top wall), o.stiff (pale, cracked wall)
    ICONS.artery(t, o);
    if (o.stiff) { ctx.save(); ctx.globalAlpha *= 0.6 * o.stiff; rr2(-80, -52, 160, 12, 6, '#f3d6de'); rr2(-80, 40, 160, 12, 6, '#f3d6de'); ctx.restore(); for (const x of [-40, 10, 50]) { ctx.save(); ctx.globalAlpha *= o.stiff; poly([[x, -52], [x + 6, -44], [x - 2, -40], [x + 4, -34], [x - 4, -40], [x + 2, -44]], '#7a1f33'); ctx.restore(); } }
    if (o.burst) { const b = o.burst; ctx.fillStyle = 'rgba(200,30,50,0.9)'; ctx.beginPath(); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283, r = (14 + 26 * b) * (0.75 + 0.25 * Math.sin(i * 2.3 + t * 3)); ctx.lineTo(16 + Math.cos(a) * r, -54 - 14 * b + Math.sin(a) * r * 0.7); } ctx.fill();
      for (let i = 0; i < 4; i++) { const p = (t * 0.9 + i / 4) % 1; circ(16 + (i - 1.5) * 22 * p, -60 - 40 * b * p, 6 * (1 - p) + 2, '#e2457a'); } }
  },
});
Object.assign(IDLE, { bpcuff: {}, sugarcube: {}, heartE: {}, leaf7: {}, scanner: {}, neck: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.04) }, pfo: {}, aura: {}, catheter: {}, dizzy: {}, rewire: {},
  clotB: { pre: t => ctx.rotate(Math.sin(t * 1.7) * 0.08) }, neuron: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.05) }, cig: {}, runner: {}, pillPack: {}, pgrid: {}, pie: { pre: t => ctx.rotate(Math.sin(t * 0.8) * 0.05) }, countyMap: {}, hammer: {}, ball: {}, faceD: {}, armD: {}, slur: {}, brainX: {}, arteryX: {}, scaleB: {}, ivBag: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.04) }, warn: { pre: t => { const b = 1 + 0.05 * Math.max(0, Math.sin(t * 6)); ctx.scale(b, b); } } });
// actor helpers with honest boxes
const BR = (x, y, s, t0, op = {}) => A('brainX', x, y, s, t0, { hw: 66, hh: 58, ...op });
const ART = (x, y, s, t0, op = {}) => A('arteryX', x, y, s, t0, { hw: 84, hh: 60, ...op });
const CLOT = (x, y, s, t0, op = {}) => A('clotB', x, y, s, t0, { hw: 56, hh: 48, ...op });
const _A = A; A = (ic, x, y, s, t0, o) => _A(ic, x, y, s * 1.12, t0, o);   // everything a little bigger than the first draft
// beats start on their first picture (no empty gap between a line start and its first icon): the previous beat holds until then
function chainA(list, end) { list.forEach((b, i) => { if (!i || b.q || !b.cast || !b.cast.length) return; const e = Math.min(...b.cast.map(a => T(a.t0))); if (e - 0.05 > T(b.at)) b.at = e - 0.05; }); return chainB(list, end); }
const ramp = (a, d = 1) => tt => clamp((tt - T(a)) / d);

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainA([
    { at: 0, q: 'c1', cast: [A('adult', 600, 580, 2.4, 'c1:young', { o: { col: '#3fae6a' } }), BR(1220, 540, 3.0, 'c1:young+0.2', { o: tt => ({ clot: ramp('c1:strokes+0.3', 0.8)(tt) }), hit: ['c1:strokes+0.3'] }), CLOT(1700, 300, 1.0, 'c1:strokes', { mv: [['c1:strokes+0.3', 1270, 500, 60]], out: 'c1>' })] },
    { at: 'c2', cast: [A('docV', 330, 500, 1.9, 'c2:study', { o: { title: 'STUDY · 2026', ticks: 0 } }), A('calDay', 720, 500, 1.8, 'c2:september', { o: { m: 'SEP', d: '2026' } }), A('globeP', 1160, 500, 2.0, 'c2:american'),
      A('magnifier', 1560, 300, 1.5, 'c2:region', { mv: [['c2:almost', 1250, 430, 40]] }), A('hglass', 1600, 560, 1.6, 'c2:30')],
      lab: [['ONE U.S. REGION · ~30 YEARS', 'c2:30', 960, 830, GOLD, 30]] },
    { at: 'c2:among', cast: [A('crowd', 380, 520, 2.2, 'c2:adults'), A('chart', 860, 500, 2.4, 'c2:aged', { o: tt => ({ v: [0.48, 0.48 + 0.42 * ramp('c2:doubled', 0.9)(tt)], hi: 1 }) }), CLOT(1150, 300, 1.0, 'c2:rate', { mv: [['c2:doubled', 920, 420, 60]], hit: ['c2:doubled'] })],
      num: [['c2:doubled', 1460, 500, '~2×', 'AGES 20–54 · 1993 → 2020']] },
    { at: 'c3', cast: [A('elder', 330, 560, 2.1, 'c3:older'), A('chart', 720, 500, 1.9, 'c3:down', { o: tt => ({ v: [0.9, 0.9 - 0.25 * ramp('c3:down', 0.9)(tt)], hi: -1 }) }), BR(1180, 500, 2.6, 'c3:younger', { pulse: ['c3:happening'] }),
      A('question', 0, 0, 0.8, 'c3:happening', { follow: { i: 2, dx: 0, dy: -230 } }), A('adult', 1620, 560, 2.0, 'c3:you', { o: { col: '#3fae6a' } })],
      lab: [['OLDER ADULTS: FEWER STROKES', 'c3:older', 520, 830, '#9be3a5', 30]] },
    { at: 'c3b', cast: [A('docV', 300, 500, 1.8, 'c3b:study', { o: { title: 'FIRST STROKES', ticks: 0 } }), A('crowd', 700, 520, 1.6, 'c3b:2'), A('crowd', 960, 560, 1.6, 'c3b:young'), BR(1380, 520, 2.4, 'c3b:first', { o: { clot: 0.8 }, hit: ['c3b:first+0.1'] }),
      A('magnifier', 1700, 300, 1.4, 'c3b:longest', { mv: [['c3b:changing', 1500, 420, 40]] })],
      num: [['c3b:2', 830, 250, '2,000+', 'FIRST STROKES IN YOUNG ADULTS']], lab: [['ONE OF THE LONGEST LOOKS', 'c3b:longest', 960, 860, WHITE, 30]] },
  ], 's1'));
}
// ---------- 1 what a stroke is ----------
function sWhat(t) {
  worldBG(t, 'indigo');
  beats(t, chainA([
    QB('s1', [BR(760, 540, 3.0, 's1+0.2'), CLOT(1180, 320, 1.0, 's1:stroke', { mv: [['s1>', 900, 500, 60]], hit: ['s1>'] })]),
    { at: 's2', under: tt => brainAt(tt, 600, 520, 250, { glow: 0.45 }), cx: 600, zoom: 0.5,
      cast: [A('scaleB', 1160, 360, 1.7, 's2:body'), A('lungs', 1160, 720, 1.5, 's2:oxygen')],
      fx: [['zap', [1000, 220], [700, 380], 's2:attack', 0.6, '#ff9fb4'], ['stream', 1, [880, 560], 's2:oxygen', 's2:needs', { col: '#8fd8e6', n: 10 }]],
      num: [['s2:2', 1580, 360, '2%', 'OF BODY WEIGHT', TEAL], ['s2:fifth', 1580, 720, '~20%', 'OF YOUR OXYGEN']] },
    { at: 's2:needs', under: tt => brainAt(tt, 520, 520, 240, { glow: 0.5 }), cx: 520, zoom: 0.5,
      cast: [ART(1000, 520, 1.7, 's2:constant'), A('heartR', 1460, 520, 2.4, 's2:needs', { pulse: ['s2:flow', 's2:blood'] })],
      fx: [['stream', 1, [800, 500], 's2:flow', 's3', { col: '#e2457a', n: 12, r: 10, arc: 30 }]], lab: [['NONSTOP BLOOD FLOW', 's2:flow', 1200, 830, GOLD, 32]] },
    { at: 's3', cast: [ART(760, 470, 3.0, 's3:artery', { o: tt => ({ clot: ramp('s3:blocks', 0.8)(tt) }), hit: ['s3:blocks'] }), CLOT(260, 300, 1.2, 's3:clot', { mv: [['s3:blocks', 700, 450, 80]], out: 's3:blocks+0.3' }),
      BR(1460, 470, 2.6, 's3:brain', { o: tt => ({ clot: ramp('s3:ischemic', 1.0)(tt) }), shake: ['s3:ischemic', 0.6] })],
      tag: [['ISCHEMIC: A CLOT BLOCKS IT', 's3:ischemic', 760, 830, '#5b4fd6', 38]] },
    { at: 's3:others', cast: [ART(760, 480, 3.0, 's3:others', { o: tt => ({ burst: ramp('s3:bursts', 1.0)(tt) }), shake: ['s3:bursts', 0.6], hh: 80 }), BR(1460, 480, 2.6, 's3:bleeds', { o: tt => ({ bleed: ramp('s3:hemorrhagic', 1.0)(tt) }) })],
      fx: [['stream', [840, 300], 1, 's3:bleeds', 's3b', { col: '#e2457a', n: 8, r: 9 }]], tag: [['HEMORRHAGIC: A BLEED', 's3:hemorrhagic', 760, 860, '#e2457a', 38]] },
    { at: 's3b', cast: [A('pie', 430, 470, 2.5, 's3b', { o: tt => ({ k: ramp('s3b:87', 1.0)(tt) }) }), CLOT(430, 470, 0.7, 's3b:strokes', { pulse: ['s3b:kind'] }), A('globeP', 1050, 470, 1.9, 's3b:united'), A('stopwatch', 1500, 470, 2.0, 's3b:40', { pulse: ['s3b:seconds'] })],
      num: [['s3b:87', 430, 830, '87%', 'ARE THE CLOT KIND']], lab: [['U.S.: A STROKE EVERY ~40 SECONDS', 's3b:40', 1270, 830, WHITE, 30]] },
    QB('s4q', [A('stopwatch', 760, 540, 2.3, 's4q+0.2'), A('neuron', 1180, 540, 1.7, 's4q:damage', { grey: 's4q>' })]),
    { at: 's5', cast: [BR(430, 500, 3.2, 's5', { o: tt => ({ clot: 0.4 + 0.6 * ramp('s5:large', 1.0)(tt) }) }), A('neuron', 960, 330, 1.7, 's5:loses', { grey: 's5:million', shake: ['s5:million', 0.5] }), A('neuron', 1270, 330, 1.7, 's5:loses+0.2', { grey: 's5:nerve', shake: ['s5:nerve', 0.5] }), A('neuron', 1580, 330, 1.7, 's5:loses+0.4', { grey: 's5:cells', shake: ['s5:cells', 0.5] }),
      A('stopwatch', 1600, 650, 1.3, 's5:minute', { pulse: ['s5:untreated'] })],
      fx: [['zap', 0, 1, 's5:million', 0.4, '#ff9fb4'], ['zap', 0, 2, 's5:nerve', 0.4, '#ff9fb4'], ['zap', 0, 3, 's5:cells', 0.4, '#ff9fb4']],
      num: [['s5:1', 1170, 700, '1.9 M', 'NERVE CELLS LOST', '#ff9fb4']] },
    { at: 's5b', cast: [A('rewire', 420, 470, 2.6, 's5b:connections', { hw: 72, hh: 62, grey: 's5b:connections+1.2' }), A('neuron', 960, 470, 2.0, 's5b:12', { grey: 's5b:fibers', shake: ['s5b:fibers', 0.6] }), A('tangle', 1480, 470, 1.6, 's5b:fibers', { grey: 's5b:by' })],
      lab: [['14 BILLION CONNECTIONS / MIN', 's5b:14', 420, 830, WHITE, 28], ['12 KM OF NERVE FIBRES / MIN', 's5b:12', 1300, 830, WHITE, 28]] },
    { at: 's5b:by', cast: [A('clock3', 380, 480, 2.2, 's5b:hour', { pulse: ['s5b:ages'] }), BR(900, 480, 2.6, 's5b:treatment', { grey: 's5b:ages' }), A('adult', 1450, 540, 2.2, 's5b:ages', { morph: ['s5b:three', 'elder'] })],
      fx: [['stream', 0, 1, 's5b:hour', 's6', { col: '#ffd98a', n: 6 }]], tag: [['+3.6 YEARS OF BRAIN AGING / HOUR', 's5b:three', 960, 860, '#9b3352', 36]] },
    { at: 's6', cast: [A('doctor', 380, 560, 2.2, 's6:doctors'), A('clock3', 900, 480, 2.0, 's6:time', { mv: [['s6:brain', 1200, 480, 80]], morph: ['s6:brain', 'brainX'], hw: 64 }), A('heartR', 1580, 480, 1.0, 's6:three', { out: 's6:time' })],
      tag: [['TIME IS BRAIN', 's6:time', 960, 860, '#e2457a', 52]] },
  ], 'd1'));
}
// ---------- 2 the study ----------
function sStudy(t) {
  worldBG(t, 'night');
  beats(t, chainA([
    QB('d1', [A('chart', 760, 540, 2.3, 'd1+0.2', { o: tt => ({ v: [0.45, 0.45 + 0.45 * ramp('d1:doubling', 0.8)(tt)], hi: 1 }) }), A('magnifier', 1180, 380, 1.4, 'd1:doubling', { mv: [['d1>', 920, 470]] })]),
    { at: 'd2', cast: [A('school', 330, 500, 1.9, 'd2:university'), A('hospital', 760, 500, 1.8, 'd2:hospitals'), A('countyMap', 1200, 500, 2.3, 'd2:five', { o: tt => ({ k: ramp('d2:five', 2.5)(tt) }) }),
      A('calDay', 1620, 360, 1.2, 'd2:1993', { o: { m: 'FROM', d: '1993' } }), A('calDay', 1620, 680, 1.2, 'd2:2020', { o: { m: 'TO', d: '2020' } })],
      fx: [['stream', 1, 2, 'd2:counted', 'd2:snapshots', { col: '#ff9fb4', n: 8 }]],
      lab: [['UNIVERSITY OF CINCINNATI', 'd2:cincinnati', 430, 830, GOLD, 28], ['5 COUNTIES · OHIO + KENTUCKY', 'd2:five', 1250, 830, WHITE, 28]] },
    { at: 'd3', cast: [A('calDay', 280, 360, 1.2, 'd3', { o: { m: 'YEAR', d: '1993', col: '#5b6585' } }), A('calDay', 280, 700, 1.2, 'd3:2020', { o: { m: 'YEAR', d: '2020' } }), A('crowd', 1700, 540, 1.6, 'd3:young', { pulse: ['d3:62'] }),
      CLOT(1700, 540, 0.6, 'd3:stroke', { mv: [['d3:62', 1450, 640, 60]], hit: ['d3:62'] })],
      under: tt => { meter(480, 400, 1000, 33.9 / 62.2, tt, T('d3:34'), T('d4') - 0.3, '#8fd8e6', '#5aa9e6', '1993: ~34 PER 100,000 YOUNG ADULTS'); meter(480, 740, 1000, 1, tt, T('d3:2020'), T('d4') - 0.3, '#ffd98a', '#e2457a', '2020: ~62 PER 100,000'); } },
    { at: 'd4', cast: [CLOT(330, 480, 1.6, 'd4:clots', { pulse: ['d4:ischemic'] }), CLOT(330, 480, 0.9, 'd4:24', { mv: [['d4:47', 620, 330, 60]] }), CLOT(330, 480, 0.9, 'd4:47', { mv: [['d4:hundred', 640, 640, 60]] }),
      ART(1050, 480, 2.6, 'd4:ischemic#1', { o: tt => ({ clot: 0.3 + 0.7 * ramp('d4:47', 1.0)(tt) }) }), A('chart', 1600, 480, 1.9, 'd4:24', { o: tt => ({ v: [0.42, 0.42 + 0.42 * ramp('d4:47', 0.9)(tt)], hi: 1 }) })],
      tag: [['CLOT STROKES: ~24 → ~47 PER 100,000', 'd4:24', 960, 860, '#5b4fd6', 36]] },
    { at: 'd4b', cast: [ART(420, 480, 2.2, 'd4b:bleeding', { o: { burst: 0.5 }, hh: 76 }), A('chart', 860, 480, 1.8, 'd4b:trend', { o: { v: [0.4, 0.43, 0.39, 0.42] } }), CLOT(1380, 480, 1.7, 'd4b:clots', { pulse: ['d4b:surged'] }),
      CLOT(1380, 480, 0.8, 'd4b:surged', { mv: [['d4b:surged+0.6', 1650, 330, 60]] }), CLOT(1380, 480, 0.8, 'd4b:surged+0.15', { mv: [['d4b:surged+0.75', 1660, 640, 60]] })],
      lab: [['BLEEDS: NO CLEAR TREND', 'd4b:no', 640, 830, WHITE, 30]], tag: [['CLOTS SURGED', 'd4b:surged', 1420, 830, '#5b4fd6', 38]] },
    QB('d5q', [A('elder', 760, 560, 2.3, 'd5q+0.2'), A('chart', 1180, 520, 1.6, 'd5q:other', { o: tt => ({ v: [0.9, 0.9 - 0.3 * ramp('d5q:other', 0.8)(tt)] }) })]),
    { at: 'd6', cast: [A('elder', 330, 560, 2.1, 'd6:older'), A('chart', 820, 500, 2.3, 'd6:fell', { o: tt => ({ v: [0.9, 0.9 - 0.24 * ramp('d6:453', 0.9)(tt)], hi: 1 }) }), A('check', 330, 300, 0.8, 'd6:fell')],
      num: [['d6:619', 1430, 470, '619 → 453', 'PER 100,000 OLDER ADULTS', '#9be3a5']] },
    { at: 'd6:better', cast: [A('bpcuff', 330, 470, 1.6, 'd6:pressure', { hw: 104, hh: 100 }), A('pillC', 720, 330, 1.2, 'd6:treatment', { mv: [['d6:treatment+0.8', 470, 420, 60]] }), A('cig', 1060, 470, 1.8, 'd6:smokers', { o: tt => ({ no: tt > T('d6:fewer') + 0.3 }) }), A('elder', 1520, 560, 2.1, 'd6:helped', { pulse: ['d6:helped'] })],
      lab: [['BETTER BP TREATMENT · FEWER SMOKERS', 'd6:better', 960, 860, GOLD, 30]] },
    { at: 'd6b', cast: [A('adult', 330, 560, 2.1, 'd6b:young', { o: { col: '#3fae6a', mood: 'happy' } }), A('check', 330, 290, 0.8, 'd6b:good'), A('calDay', 800, 480, 1.7, 'd6b:month', { o: { m: 'WITHIN', d: '30d' } }), A('chart', 1300, 480, 2.0, 'd6b:fell', { o: tt => ({ v: [0.72, 0.72 - 0.18 * ramp('d6b:nine', 0.9)(tt)], hi: 1 }) })],
      num: [['d6b:12', 1240, 830, '12% → 9%', 'DIED WITHIN A MONTH', '#9be3a5']] },
  ], 'r1'));
}
// ---------- 3 the risk factors ----------
function sRisk(t) {
  worldBG(t, 'coral');
  beats(t, chainA([
    QB('r1', [A('adult', 760, 560, 2.3, 'r1+0.2', { o: { col: '#3fae6a' } }), A('magnifier', 1220, 380, 1.4, 'r1:different', { mv: [['r1>', 960, 420]] })]),
    { at: 'r2', cast: [A('docV', 330, 500, 1.8, 'r2:study', { o: { title: 'PATIENTS', ticks: 0 } }), A('crowd', 1050, 520, 2.4, 'r2:patients'), A('magnifier', 1600, 330, 1.5, 'r2:looked', { mv: [['r2:common', 1150, 470, 50]] })],
      lab: [['WHAT DID YOUNG PATIENTS SHARE?', 'r2:common', 960, 830, GOLD, 30]] },
    { at: 'r2:high', cast: [A('bpcuff', 330, 440, 1.7, 'r2:blood', { hw: 104, hh: 100 }), A('bpGauge', 760, 440, 1.6, 'r2:60', { o: tt => ({ v: 0.45 + 0.45 * ramp('r2:60', 0.8)(tt) }) }), A('sugarcube', 1200, 300, 1.2, 'r2:diabetes', { mv: [['r2:26', 1450, 400, 60]], hw: 60, hh: 60 }), A('tubeB', 1550, 440, 1.6, 'r2:diabetes+0.3', { hit: ['r2:26'] })],
      num: [['r2:47', 540, 830, '47% → 60%', 'HIGH BLOOD PRESSURE'], ['r2:19', 1400, 830, '19% → 26%', 'DIABETES', TEAL]] },
    { at: 'r3', cast: [A('heartR', 400, 480, 2.6, 'r3:irregular', { o: { rate: 3 }, shake: ['r3:fibrillation', 1.5] }), A('ecgM', 860, 480, 1.7, 'r3:atrial', { o: { fast: 1 } }), CLOT(400, 520, 0.6, 'r3:clots', { mv: [['r3:6', 1300, 470, 120]], out: 'r3:6+0.3' }), BR(1450, 470, 2.4, 'r3:heart#1', { hit: ['r3:6'], o: tt => ({ clot: ramp('r3:6', 0.6)(tt) }) })],
      tag: [['ATRIAL FIBRILLATION', 'r3:atrial', 640, 830, '#5b4fd6', 36]], lab: [['~1% → ~6% OF PATIENTS', 'r3:1', 1450, 830, GOLD, 30]] },
    { at: 'r4', cast: [A('doctor', 330, 560, 2.1, 'r4:cardiologist'), A('heartR', 760, 470, 1.9, 'r4:heart'), ART(1150, 470, 1.8, 'r4:vessel'), A('chart', 1580, 470, 1.8, 'r4:building', { o: tt => ({ v: [0.3, 0.3 + 0.2 * ramp('r4:building', 0.6)(tt), 0.3 + 0.4 * ramp('r4:earlier', 0.6)(tt), 0.3 + 0.6 * ramp('r4:life', 0.6)(tt)], hi: 3 }) })],
      lab: [['"RISK IS BUILDING UP EARLIER IN LIFE"', 'r4:risk', 960, 830, GOLD, 30]] },
    { at: 'r4b', cast: [A('bedH', 380, 500, 1.8, 'r4b:people', { hw: 96, hh: 56 }), A('magnifier', 720, 330, 1.3, 'r4b:only', { mv: [['r4b:strokes', 470, 430, 40]] }), A('crowd', 1250, 500, 2.4, 'r4b:all', { grey: 'r4b:all+0.6' }), A('question', 1650, 320, 1.1, 'r4b:measure')],
      lab: [['ONLY STROKE PATIENTS WERE MEASURED', 'r4b:only', 960, 830, WHITE, 28]] },
    QB('r5q', [A('bpcuff', 700, 540, 1.8, 'r5q+0.2', { hw: 104, hh: 100 }), BR(1180, 520, 1.9, 'r5q:hurt', { hit: ['r5q:brain'] })]),
    { at: 'r6', cast: [A('heartR', 300, 480, 1.8, 'r6:heartbeat', { o: { rate: 1.4 } }), ART(820, 520, 3.0, 'r6:walls', { hit: ['r6:hammers', 'r6:walls+0.3', 'r6:arteries', 'r6:heartbeat'], sparkCol: '#ff9fb4' }), A('hammer', 1300, 300, 1.4, 'r6:hammers', { mv: [['r6:hammers+0.3', 1050, 330, 40]], hw: 56, hh: 70 })],
      fx: [['stream', 0, 1, 'r6:every', 'r6:over', { col: '#e2457a', n: 8, r: 9 }]], lab: [['EVERY HEARTBEAT HAMMERS THE WALLS', 'r6:hammers', 960, 860, WHITE, 30]] },
    { at: 'r6:over', cast: [A('hglass', 280, 480, 1.6, 'r6:years'), ART(760, 480, 2.8, 'r6:stiffen', { o: tt => ({ stiff: ramp('r6:stiffen', 0.8)(tt), clot: 0.7 * ramp('r6:clots', 0.8)(tt) }) }), CLOT(1220, 330, 1.0, 'r6:clots', { mv: [['r6:likely', 1480, 420, 60]] }), A('drop', 1220, 650, 1.1, 'r6:bleeds', { o: {} }),
      BR(1620, 480, 2.2, 'r6:likely', { hit: ['r6:likely+0.1'] })],
      lab: [['STIFF, DAMAGED ARTERIES', 'r6:damaged', 760, 830, '#ff9fb4', 30]] },
    { at: 'r6:many', cast: [0, 1, 2].map(i => A('adult', 360 + i * 330, 580, 1.9, 'r6:young+' + (i * 0.15).toFixed(2), { o: { col: ['#3fae6a', '#5b4fd6', '#ff8f4a'][i] } })).concat([0, 1, 2].map(i => A('question', 0, 0, 0.75, 'r6:know+' + (i * 0.12).toFixed(2), { follow: { i, dx: 0, dy: -210 } })),
      [A('bpGauge', 1520, 500, 2.0, 'r6:high#1', { o: { v: 0.92 }, shake: ['r6:know', 0.8] })]),
      tag: [['MANY DON\'T KNOW THEY HAVE IT', 'r6:know', 960, 880, '#9b3352', 38]] },
    { at: 'r6b', cast: [A('scaleB', 300, 480, 1.7, 'r6b:weight'), A('bed', 650, 480, 1.7, 'r6b:sleep'), A('couch', 1000, 480, 1.6, 'r6b:movement', { hw: 90 }), A('bpGauge', 1480, 480, 2.0, 'r6b:push', { o: tt => ({ v: 0.4 + 0.5 * ramp('r6b:wrong', 1.0)(tt) }), hw: 76 })],
      fx: [['stream', 0, 3, 'r6b:push', 'r6b>', { col: '#ffd98a', n: 6 }], ['stream', 1, 3, 'r6b:push', 'r6b>', { col: '#8fd8e6', n: 6 }], ['stream', 2, 3, 'r6b:push', 'r6b>', { col: '#b48cff', n: 6 }]],
      lab: [['PUSHING THE NUMBERS THE WRONG WAY', 'r6b:wrong', 960, 830, GOLD, 30]] },
  ], 'm1'));
}
// ---------- 4 the cannabis question ----------
function sCannabis(t) {
  worldBG(t, 'teal');
  beats(t, chainA([
    QB('m1', [A('leaf7', 760, 560, 2.3, 'm1+0.2', { hw: 70, hh: 80 }), A('pillC', 1160, 520, 1.4, 'm1:else')]),
    { at: 'm2', cast: [A('leaf7', 300, 480, 2.2, 'm2:jumped', { hw: 70, hh: 80, pulse: ['m2:marijuana'] }), A('pgrid', 820, 480, 2.3, 'm2:1993', { o: { n: 1 } }), A('pgrid', 1400, 480, 2.3, 'm2:2020', { o: tt => ({ n: Math.round(31 * ramp('m2:31', 1.0)(tt)) }) })],
      fx: [['stream', 0, 2, 'm2:2020', 'm3', { ic: 'leaf7', s: 0.3, n: 7 }]], lab: [['1993: UNDER 1%', 'm2:1993', 820, 830, WHITE, 30], ['2020: ~31% USED MARIJUANA', 'm2:31', 1400, 830, GOLD, 30]] },
    { at: 'm3', cast: [A('pillC', 300, 400, 1.5, 'm3:substance'), A('leaf7', 300, 700, 1.3, 'm3:including', { hw: 70, hh: 80 }), A('pgrid', 900, 480, 2.5, 'm3:rose', { o: tt => ({ n: Math.round(5 + 35 * ramp('m3:40', 1.0)(tt)), col: '#ffd98a' }) })],
      fx: [['stream', 0, 2, 'm3:drugs', 'm4q', { col: '#ffd98a', n: 8 }]], num: [['m3:5', 1490, 480, '<5% → ~40%', 'ANY SUBSTANCE USE']] },
    QB('m4q', [A('leaf7', 700, 560, 2.0, 'm4q+0.2', { hw: 70, hh: 80 }), BR(1150, 520, 2.0, 'm4q:cause')]),
    { at: 'm5', cast: [A('docV', 300, 480, 1.8, 'm5:study', { o: { title: 'STUDY', ticks: 0 } }), A('leaf7', 760, 480, 2.0, 'm5:substance', { hw: 70, hh: 80 }), BR(1400, 480, 2.4, 'm5:strokes'), A('question', 1080, 330, 1.1, 'm5:caused', { pulse: ['m5:strokes'] })],
      fx: [['stream', 1, 2, 'm5:caused', 'm5:might', { col: '#9be3a5', n: 7 }]], tag: [['A LINK, NOT PROOF', 'm5:doesn', 960, 830, '#0b4f5c', 40]] },
    { at: 'm5:might', cast: [A('adult', 330, 560, 2.0, 'm5:people', { o: { col: '#3fae6a' } }), A('adult', 680, 560, 2.0, 'm5:differ', { o: { col: '#e2457a', hair: '#7a4a2c' }, shake: ['m5:ways', 0.6] }), A('puzzle', 1100, 480, 1.4, 'm5:other', { o: { col: '#ffd98a' } }),
      A('magnifier', 1300, 300, 1.4, 'm5:dedicated', { mv: [['m5>', 1420, 420, 40]] }), A('doctor', 1560, 600, 1.6, 'm5:scientists')],
      lab: [['NEEDS DEDICATED RESEARCH', 'm5:dedicated', 960, 860, GOLD, 32]] },
    { at: 'm6', cast: [A('scanner', 420, 480, 2.0, 'm6:scan', { hw: 110, hh: 80 }), BR(920, 480, 2.2, 'm6:brains', { o: tt => ({ clot: ramp('m6:finding', 0.6)(tt) }) }), A('magnifier', 1500, 300, 1.4, 'm6:finding', { mv: [['m6:strokes', 1080, 420, 40]] }),
      A('chart', 1560, 600, 1.4, 'm6:more#1', { o: tt => ({ v: [0.3, 0.4, 0.55, 0.3 + 0.6 * ramp('m6:strokes', 0.6)(tt)], hi: 3 }) })],
      fx: [['zap', 0, 1, 'm6:imaging', 0.6, '#8fd8e6'], ['zap', 0, 1, 'm6:finding', 0.6, '#8fd8e6']], lab: [['MORE SCANS → MORE STROKES FOUND', 'm6:finding', 960, 860, GOLD, 32]] },
  ], 'y1'));
}
// ---------- 5 young strokes are different ----------
function sYoung(t) {
  worldBG(t, 'cream');
  beats(t, chainA([
    QB('y1', [A('adult', 760, 560, 2.3, 'y1+0.2', { o: { col: '#3fae6a' } }), BR(1180, 520, 1.9, 'y1:young')]),
    { at: 'y2', cast: [A('neck', 520, 500, 2.5, 'y2:neck', { hw: 50, hh: 110, hit: ['y2:tear'], sparkCol: '#e2457a' }), CLOT(480, 520, 0.6, 'y2:dissection', { mv: [['y2:dissection+1.2', 1280, 460, 120]], out: 'y2:dissection+1.5' }), BR(1400, 460, 2.4, 'y2:artery', { o: tt => ({ clot: ramp('y2:dissection+1.2', 0.6)(tt) }) })],
      tag: [['NECK ARTERY TEAR (DISSECTION)', 'y2:tear', 960, 860, '#c95a7c', 36]] },
    { at: 'y2:follow', cast: [A('neck', 400, 500, 2.3, 'y2:follow', { hw: 50, hh: 110, shake: ['y2:twist', 0.8] }), A('ball', 1000, 330, 1.4, 'y2:sports', { mv: [['y2:injury', 560, 420, 80]], hit: ['y2:injury'] }), A('question', 1450, 480, 1.6, 'y2:nothing')],
      lab: [['A SUDDEN TWIST · A SPORTS INJURY · NOTHING', 'y2:twist', 960, 860, WHITE, 28]] },
    { at: 'y3', cast: [A('pfo', 760, 470, 2.7, 'y3:opening', { hw: 82, hh: 72 }), A('magnifier', 1400, 300, 1.5, 'y3:small', { mv: [['y3:chambers', 920, 380, 50]] }), A('heartR', 1500, 560, 1.4, 'y3:heart')],
      tag: [['A SMALL HOLE IN THE HEART (PFO)', 'y3:patent', 760, 860, '#5b4fd6', 36]] },
    { at: 'y3:about', cast: [0, 1, 2, 3].map(i => A('adult', 330 + i * 360, 540, 2.0, 'y3:one+' + (i * 0.12).toFixed(2), { o: { col: i === 2 ? '#e2457a' : '#5b6585' }, pulse: i === 2 ? ['y3:four', 'y3:have'] : [] })).concat([A('check', 0, 0, 0.7, 'y3:harmless', { follow: { i: 2, dx: 0, dy: -230 } })]),
      lab: [['~1 IN 4 PEOPLE HAVE ONE · USUALLY HARMLESS', 'y3:four', 960, 860, '#5e2618', 30]] },
    { at: 'y3:but', cast: [A('pfo', 420, 480, 2.4, 'y3:but', { hw: 82, hh: 72 }), CLOT(420, 480, 0.6, 'y3:clot', { mv: [['y3:through', 900, 400, 80], ['y3:brain', 1340, 460, 60]], out: 'y3:brain+0.3' }), BR(1460, 480, 2.4, 'y3:slip', { hit: ['y3:brain'], o: tt => ({ clot: ramp('y3:brain', 0.6)(tt) }) })],
      lab: [['RARELY, A CLOT SLIPS THROUGH', 'y3:rare', 960, 860, '#5e2618', 30]] },
    { at: 'y4', cast: [A('adult', 330, 580, 2.1, 'y4:migraine', { o: { mood: 'stress' }, shake: ['y4:headache', 0.8] }), A('aura', 0, 0, 1.3, 'y4:aura', { follow: { i: 0, dx: 0, dy: -250 }, hw: 70, hh: 56 }), A('aura', 800, 460, 2.0, 'y4:flashing', { hw: 70, hh: 56 }),
      BR(1400, 460, 2.4, 'y4:linked', { o: tt => ({ clot: ramp('y4:ischemic', 0.6)(tt) }) })],
      fx: [['zap', 2, 3, 'y4:linked', 0.6, '#ffd98a']], lab: [['MIGRAINE WITH AURA', 'y4:aura', 600, 860, '#5e2618', 30]], num: [['y4:twice', 1400, 830, '~2×', 'RISK OF A CLOT STROKE', '#e2457a']] },
  ], 'h1'));
}
// ---------- 6 in the emergency room ----------
function sHospital(t) {
  worldBG(t, 'indigo');
  beats(t, chainA([
    QB('h1', [A('ambulance', 560, 560, 1.9, 'h1+0.2', { mv: [['h1>', 760, 560]], hw: 84, hh: 56 }), A('hospital', 1180, 520, 1.9, 'h1:hospital')]),
    { at: 'h2', cast: [A('scanner', 380, 480, 2.0, 'h2:scan', { hw: 110, hh: 80 }), BR(900, 480, 2.0, 'h2:clot', { o: { clot: 1 } }), BR(1400, 480, 2.0, 'h2:blade', { o: { bleed: 1 } }), A('question', 1150, 250, 0.9, 'h2:whether')],
      fx: [['zap', 0, 1, 'h2:clot', 0.5, '#8fd8e6'], ['zap', 0, 2, 'h2:blade', 0.5, '#8fd8e6']], lab: [['CLOT OR BLEED?', 'h2:whether', 1150, 830, GOLD, 34], ['TREATMENTS ARE OPPOSITE', 'h2:opposite', 1150, 940, WHITE, 28]] },
    { at: 'h2:you', cast: [A('ivBag', 380, 480, 2.0, 'h2:give', { mv: [['h2:bleeding', 860, 460, 60]] }), BR(1250, 480, 2.6, 'h2:someone', { o: { bleed: 1 } }), A('cross', 1060, 300, 1.0, 'h2:bleeding')],
      tag: [['NO CLOT-BUSTER FOR A BLEED', 'h2:bleeding', 960, 860, '#e2457a', 38]] },
    { at: 'h3', cast: [ART(760, 480, 3.0, 'h3:clot', { o: tt => ({ clot: 1 - ramp('h3:dissolves', 2.0)(tt) }) }), A('ivBag', 280, 320, 1.4, 'h3:drug', { mv: [['h3:dissolves', 470, 360, 40]] }), A('stopwatch', 1460, 480, 2.0, 'h3:four')],
      fx: [['stream', 1, [760, 470], 'h3:dissolves', 'h3:usually', { col: '#8fd8e6', n: 10 }]],
      tag: [['CLOT-DISSOLVING DRUG', 'h3:drug', 640, 830, '#5b4fd6', 36]], lab: [['WITHIN ~4.5 HOURS', 'h3:four', 1460, 830, GOLD, 32]] },
    { at: 'h4', cast: [ART(1150, 480, 3.0, 'h4:artery', { o: { clot: 0 } }), CLOT(1180, 470, 1.2, 'h4:big', { mv: [['h4:pull', 1180, 470], ['h4:out', 520, 470]] }), A('catheter', 300, 520, 2.4, 'h4:tube', { mv: [['h4:brain', 920, 460], ['h4:out', 380, 520]], hw: 80, hh: 70 })],
      lab: [['UP FROM THE GROIN OR WRIST', 'h4:groin', 640, 830, WHITE, 30]], tag: [['PULL THE CLOT OUT', 'h4:pull', 1300, 830, '#5b4fd6', 38]] },
    { at: 'h4:carefully', cast: [A('doctor', 380, 560, 2.1, 'h4:chosen'), A('bedH', 900, 500, 1.8, 'h4:patients', { hw: 96, hh: 56 }), A('clock3', 1450, 480, 2.1, 'h4:hours', { o: {} })],
      lab: [['SELECTED PATIENTS: UP TO 24 HOURS', 'h4:later', 960, 860, GOLD, 30]] },
    { at: 'h5', cast: [A('stopwatch', 330, 480, 2.0, 'h5:clock', { pulse: ['h5:matters'] }), ART(880, 480, 2.4, 'h5:matters'), BR(1460, 480, 2.7, 'h5:matters+0.3', { o: tt => ({ glow: ramp('h5:saved', 0.6)(tt) }), pulse: ['h5:saved'] }), A('check', 0, 0, 0.8, 'h5:saved', { follow: { i: 2, dx: 0, dy: -240 } })],
      fx: [['stream', 1, 2, 'h5:flows', 'l1q', { col: '#e2457a', n: 10, r: 10 }]], tag: [['BLOOD FLOWS · BRAIN SAVED', 'h5:saved', 960, 860, '#3f8f6a', 40]] },
    QB('l1q', [BR(760, 540, 2.6, 'l1q+0.2', { o: { clot: 0.6 } }), A('rewire', 1200, 520, 1.6, 'l1q:recover', { hw: 72, hh: 62 })]),
    { at: 'l2', cast: [BR(560, 480, 3.4, 'l2', { o: tt => ({ clot: 0.9, wire: ramp('l2:rewire', 2.5)(tt) }) }), A('rewire', 1350, 480, 2.4, 'l2:healthy', { hw: 72, hh: 62 })],
      fx: [['stream', 1, 0, 'l2:taking', 'l2:rehab', { col: '#ffd98a', n: 8 }]], lab: [['A YOUNG BRAIN CAN REWIRE', 'l2:rewire', 560, 860, GOLD, 30], ['HEALTHY AREAS TAKE OVER', 'l2:taking', 1350, 860, WHITE, 28]] },
    { at: 'l2:rehab', cast: [A('runner', 330, 500, 2.0, 'l2:rehab', { hh: 80 }), A('muscle', 720, 480, 1.6, 'l2:movement'), A('slur', 1080, 480, 1.4, 'l2:speech', { o: {} }), BR(1520, 480, 2.4, 'l2:helps', { pulse: ['l2:again', 'l2:again#1', 'l2:happen'], o: { wire: 1 } })],
      fx: [['stream', 1, 3, 'l2:again', 'l3', { col: '#ffd98a', n: 6 }], ['stream', 2, 3, 'l2:again', 'l3', { col: '#8fd8e6', n: 6 }]], lab: [['REHAB: AGAIN AND AGAIN', 'l2:again', 960, 860, GOLD, 32]] },
    { at: 'l3', cast: [A('hglass', 280, 480, 1.6, 'l3:months'), A('adult', 680, 560, 2.1, 'l3:survivors', { o: { mood: 'sick' } }), A('battery', 1100, 330, 1.4, 'l3:tiredness', { o: { level: 0.12 } }), A('tangle', 1100, 680, 1.1, 'l3:concentrating'), A('cloudS', 1540, 480, 1.6, 'l3:depression')],
      lab: [['HIDDEN PROBLEMS', 'l3:hidden', 1300, 880, '#ff9fb4', 30]] },
    { at: 'l3:sometimes', cast: [A('adult', 380, 560, 2.0, 'l3:sometimes', { o: { col: '#3fae6a' }, mv: [['l3:work', 640, 560, 60], ['l3:kids', 1150, 560, 60]] }), A('desk', 860, 500, 1.6, 'l3:work', { hw: 90 }), A('kidsGroup', 1500, 520, 2.0, 'l3:kids')],
      lab: [['BACK TO WORK · RAISING KIDS', 'l3:work', 960, 860, WHITE, 30]] },
    { at: 'l3b', cast: [A('adult', 330, 560, 2.0, 'l3b:survivors', { morph: ['l3b:decades', 'elder'] }), A('hglass', 760, 480, 1.6, 'l3b:decades'), A('shieldC', 1200, 480, 1.6, 'l3b:preventing'), BR(1620, 480, 2.2, 'l3b:one', { o: { glow: 1 }, pulse: ['l3b:enormous'] })],
      fx: [['stream', 2, 3, 'l3b:preventing', 'f1', { col: '#9be3a5', n: 6 }]], lab: [['DECADES OF LIFE AHEAD', 'l3b:decades', 540, 830, WHITE, 28]], tag: [['PREVENTION MAKES AN ENORMOUS DIFFERENCE', 'l3b:enormous', 1100, 940, '#3f8f6a', 30]] },
  ], 'f1'));
}
// ---------- 7 spot it fast ----------
const LETTERS = [['B', 'BALANCE', 'dizzy', 'f2:balance'], ['E', 'EYES', 'eye', 'f2:eyes'], ['F', 'FACE', 'faceD', 'f3:face'], ['A', 'ARMS', 'armD', 'f3:arms'], ['S', 'SPEECH', 'slur', 'f3:speech'], ['T', 'TIME', 'phone911', 'f3:time']];
function beFast(t) {   // six letter tiles; each icon acts out its sign; the camera drifts across
  const drift = Math.sin(t * 0.4) * 6;
  LETTERS.forEach(([ch, nm, ic, w], i) => { const t0 = T(w) - 0.3, k = spring(t - t0, 0.5, 13); if (k <= 0) return; const x = 200 + i * 304 + drift, y = 500;
    if (!EV.has('icon|tile' + i)) EV.set('icon|tile' + i, { kind: 'icon', t: t0 });
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rr2(-130, -250, 260, 500, 30, ['#e2457a', '#5b4fd6', '#127b84', '#c8553d', '#7f5fd6', '#9b3352'][i]); font(120, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ch, 0, -150);
    const act = t > t0 + 0.6; ctx.translate(0, 40); ctx.scale(1.6, 1.6); drawIcon(ic, t, ic === 'eye' ? { open: act ? 0.5 + 0.5 * Math.sin(t * 2.2) : 1 } : {}); ctx.restore(); reg('panel', nm, x - 130, y - 250, x + 130, y + 250);
    if (k > 0.6) riseText(nm, x, y + 200, t0 + 0.15, t, { size: 30, weight: 700, color: WHITE, pill: false }); });
}
function sFast(t) {
  worldBG(t, 'night');
  if (t >= T('f2:balance') - 0.4 && t < S('f4q') - 0.1) { beFast(t); label('BE FAST', 960, 110, t, T('f2:balance') - 0.3, S('f4q') - 0.3, GOLD, 44); label('CALL EMERGENCY SERVICES RIGHT AWAY', 960, 1000, t, T('f3:call'), S('f4q') - 0.3, WHITE, 30); return; }
  beats(t, chainA([
    QB('f1', [A('adult', 700, 580, 2.3, 'f1+0.2', { o: { mood: 'stress' } }), BR(1150, 500, 1.9, 'f1:happening', { pulse: ['f1:happening'] })], { end: 'f2:balance-0.3' }),
    { at: 'f2:balance-0.3', end: 'f4q' },
    QB('f4q', [A('hglass', 760, 540, 2.2, 'f4q+0.2'), A('question', 1150, 520, 1.3, 'f4q:wait')]),
    { at: 'f5', cast: [A('cross', 330, 480, 1.3, 'f5:never'), A('adult', 820, 560, 2.2, 'f5:young', { o: { col: '#3fae6a', mood: 'happy' }, shake: ['f5:brush', 0.6] }), A('dizzy', 1100, 380, 1.4, 'f5:symptoms', { push: [['f5:brush', 420, -40]], hw: 56, hh: 56 })],
      tag: [['NEVER WAIT AND SEE', 'f5:never', 960, 860, '#e2457a', 40]] },
    { at: 'f5:but', cast: [A('ivBag', 380, 480, 1.9, 'f5:clot'), A('stopwatch', 880, 480, 2.0, 'f5:hours', { pulse: ['f5:minute', 'f5:counts'] }), BR(1450, 480, 2.4, 'f5:work', { grey: 'f5:counts' })],
      fx: [['stream', 0, 2, 'f5:work', 'f5:first', { col: '#8fd8e6', n: 7 }]], lab: [['CLOT-BUSTERS WORK ONLY IN THE FIRST HOURS', 'f5:first', 960, 860, GOLD, 28]] },
    { at: 'f5b', cast: [A('dizzy', 380, 470, 1.9, 'f5b:symptoms', { grey: 'f5b:fade', hw: 56, hh: 56 }), A('stopwatch', 800, 470, 1.6, 'f5b:minutes'), A('doctor', 1300, 560, 2.1, 'f5b:checked'), A('check', 0, 0, 0.7, 'f5b:checked+0.3', { follow: { i: 2, dx: 0, dy: -240 } })],
      lab: [['SYMPTOMS FADED? STILL GET CHECKED', 'f5b:checked', 960, 860, WHITE, 30]] },
    { at: 'f5b:ministroak', cast: [BR(420, 480, 2.0, 'f5b:ministroak', { o: tt => ({ clot: 0.5 + 0.4 * Math.sin(tt * 3) }) }), A('warn', 920, 470, 1.8, 'f5b:warning'), BR(1450, 480, 2.6, 'f5b:bigger', { o: { clot: 1 }, shake: ['f5b:coming', 0.8] })],
      fx: [['zap', 1, 2, 'f5b:bigger', 0.6, '#ff6f7a']], tag: [['MINI-STROKE (TIA) = A WARNING', 'f5b:transient', 960, 860, '#e2457a', 38]] },
    QB('f6q', [A('doctor', 760, 560, 2.2, 'f6q+0.2'), A('magnifier', 1160, 480, 1.4, 'f6q:miss', { mv: [['f6q>', 980, 470]] })]),
    { at: 'f7', cast: [A('adult', 330, 580, 2.0, 'f7:young', { o: { mood: 'sick' } }), A('dizzy', 0, 0, 1.2, 'f7:dizziness', { follow: { i: 0, dx: 0, dy: -240 }, hw: 56, hh: 56 }), A('aura', 780, 470, 1.6, 'f7:migraine', { hw: 70, hh: 56 }), A('ear', 1160, 470, 1.6, 'f7:inner'), A('beer', 1540, 470, 1.7, 'f7:drink')],
      lab: [['MISTAKEN FOR MIGRAINE · EAR TROUBLE · DRINK', 'f7:told', 1080, 830, WHITE, 28]] },
    { at: 'f7:studies', cast: [A('docV', 380, 480, 1.8, 'f7:studies', { o: { title: 'STUDIES', ticks: 0 } }), BR(900, 480, 2.3, 'f7:strokes', { o: { clot: 1 } }), A('magnifier', 1450, 330, 1.4, 'f7:missed', { mv: [['f7:often', 1100, 420, 40]] }), A('cross', 1500, 620, 1.0, 'f7:younger')],
      lab: [['MISSED MORE OFTEN IN YOUNGER PATIENTS', 'f7:missed', 960, 860, '#ff9fb4', 30]] },
    { at: 'f8', cast: [A('adult', 330, 580, 2.1, 'f8:signs', { o: { mood: 'stress' } }), A('bubble', 720, 380, 1.8, 'f8:say'), A('doctor', 1120, 580, 2.1, 'f8:ask'), A('scanner', 1580, 480, 1.6, 'f8:scan', { hw: 110, hh: 80 })],
      fx: [['zap', 1, 2, 'f8:stroke', 0.5, '#ffd98a']], tag: [['SAY "STROKE" · ASK FOR A BRAIN SCAN', 'f8:stroke', 960, 860, '#e2457a', 36]] },
  ], 'p1'));
}
// ---------- 8 protect your brain ----------
function sProtect(t) {
  worldBG(t, 'teal');
  beats(t, chainA([
    QB('p1', [A('shieldC', 720, 540, 1.8, 'p1+0.2'), BR(1150, 520, 2.0, 'p1:risk')]),
    { at: 'p2', cast: [A('bpcuff', 330, 460, 1.7, 'p2:blood', { hw: 104, hh: 100 }), A('adult', 800, 560, 2.1, 'p2:feel', { o: { mood: 'happy', col: '#3fae6a' } }), A('sugarcube', 1200, 460, 1.4, 'p2:sugar', { hw: 60, hh: 60 }), A('tubeB', 1580, 460, 1.6, 'p2:cholesterol', { o: { cap: '#ffd36b' } })],
      lab: [['CHECK BLOOD PRESSURE · SUGAR · CHOLESTEROL', 'p2:same', 960, 860, GOLD, 30]] },
    { at: 'p2b', cast: [A('globeP', 330, 480, 1.6, 'p2b:us'), A('bpGauge', 800, 480, 2.3, 'p2b:reading', { o: tt => ({ v: 0.35 + 0.45 * ramp('p2b:130', 0.8)(tt) }), hw: 76 })],
      num: [['p2b:130', 1420, 480, '130/80+', 'COUNTS AS HIGH (US)']] },
    { at: 'p2b:plenty', cast: [0, 1, 2, 3, 4].map(i => A('adult', 260 + i * 350, 560, 1.7, 'p2b:people+' + (i * 0.1).toFixed(2), { o: tt => ({ col: ['#3fae6a', '#5b4fd6', '#ff8f4a', '#127b84', '#b48cff'][i], mood: i % 2 && tt > T('p2b:over') ? 'stress' : 'happy' }), pulse: i % 2 ? ['p2b:over'] : [] })),
      under: (tt, P, scr) => { const k = eoq((tt - T('p2b:line')) / 0.6); if (k > 0) { const [x0, y0] = scr(160, 330), [x1] = scr(1760, 330); rr2(x0, y0 - 5, (x1 - x0) * k, 10, 5, 'rgba(255,111,122,0.8)'); } },
      lab: [['MANY IN THEIR 20s AND 30s ARE OVER IT', 'p2b:20s', 960, 860, WHITE, 30]] },
    { at: 'p3', cast: [A('cig', 300, 470, 1.6, 'p3', { o: { no: 1 } }), A('runner', 660, 490, 2.0, 'p3:move', { hh: 80 }), A('scaleB', 1020, 470, 1.6, 'p3:weight'), A('beer', 1360, 470, 1.6, 'p3:alcohol', { o: {} }), A('pillC', 1680, 470, 1.2, 'p3:drugs')],
      lab: [['NO SMOKING · MOVE · HEALTHY WEIGHT · GO EASY', 'p3:move', 960, 830, GOLD, 28]] },
    { at: 'p4', cast: [A('adult', 330, 580, 2.0, 'p4:migraines', { o: { mood: 'stress' } }), A('aura', 0, 0, 1.2, 'p4:aura', { follow: { i: 0, dx: 0, dy: -240 }, hw: 70, hh: 56 }), A('cig', 760, 360, 1.2, 'p4:smoke'), A('pillPack', 760, 650, 1.3, 'p4:pill'),
      BR(1150, 480, 1.8, 'p4:combined', { pulse: ['p4:risk'] }), A('doctor', 1580, 580, 2.0, 'p4:doctor')],
      fx: [['stream', 2, 4, 'p4:smoke', 'o1', { col: '#c9d6ec', n: 5 }], ['stream', 3, 4, 'p4:pill', 'o1', { col: '#b48cff', n: 5 }]], tag: [['TALK TO A DOCTOR', 'p4:doctor', 1150, 880, '#0b4f5c', 40]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainA([
    QB('o1', [A('elder', 760, 560, 2.2, 'o1+0.2', { morph: ['o1:problem', 'adult'] }), BR(1180, 520, 1.9, 'o1:strokes')]),
    { at: 'o2', cast: [A('adult', 330, 560, 2.1, 'o2:young', { o: { col: '#3fae6a' } }), A('chart', 800, 480, 2.0, 'o2:building', { o: tt => ({ v: [0.3, 0.3 + 0.3 * ramp('o2:building', 0.6)(tt), 0.3 + 0.6 * ramp('o2:earlier', 0.6)(tt)], hi: 2 }) }), BR(1350, 480, 2.3, 'o2:price', { o: tt => ({ clot: 1 - ramp('o2:change', 1.0)(tt), glow: ramp('o2:change', 1.0)(tt) }), hit: ['o2:price'] }),
      A('bpcuff', 1640, 330, 1.2, 'o2:measure', { hw: 104, hh: 100 }), A('runner', 1720, 660, 1.4, 'o2:change', { hh: 80 })],
      lab: [['YOU CAN MEASURE IT · AND CHANGE IT', 'o2:measure', 960, 860, GOLD, 32]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [BR(420, 500, 3.0, 'o3', { o: { glow: 0.6 }, pulse: ['o3:strokes'] }), CLOT(420, 860, 0.8, 'o3:young', { erase: 'o3:strokes+0.4' })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'WHY MORE YOUNG ADULTS', 'ARE HAVING STROKES', 1300, 54, 70);
}
const CHAPTERS = [['s1', 'What a stroke is', 'indigo', 'heartE'], ['d1', 'The study', 'night', 'doc2'], ['r1', 'The risk factors', 'coral', 'bpcuff'], ['m1', 'The cannabis question', 'teal', 'leaf7'], ['y1', 'Young strokes are different', 'cream', 'neck'],
  ['h1', 'In the emergency room', 'indigo', 'scanner'], ['f1', 'Spot it fast', 'night', 'clock3'], ['p1', 'Protect your brain', 'teal', 'bpcuff']];
function SECTIONS() { return makeSections(CHAPTERS, { s1: [sWhat, 's2'], d1: [sStudy, 'd2'], r1: [sRisk, 'r2'], m1: [sCannabis, 'm2'], y1: [sYoung, 'y2'], h1: [sHospital, 'h2'], f1: [sFast, 'f2'], p1: [sProtect, 'p2'] }, sOpen, sOutro); }
