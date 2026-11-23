// "Why you learn to love coffee" (gut-to-brain dopamine, Nature, 4 Nov 2026) — topic file (engine + common.js cast system + icons2.js)
Object.assign(ICONS, {
  face(t, o) {   // a big round face; o.m: 'yuck' (bitter grimace) | 'love' (heart eyes) | 'meh'
    const b = Math.sin(t * 2) * 2, m = o.m || 'meh', sk = SK[o.skin || 0]; ctx.save(); ctx.translate(0, b);
    circ(0, 0, 62, sk); ctx.fillStyle = 'rgba(120,60,40,0.10)'; ctx.beginPath(); ctx.arc(0, 0, 62, -1.2, 1.2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = o.hair || '#2c1c16'; ctx.beginPath(); ctx.arc(0, -8, 64, Math.PI * 1.08, -0.08); ctx.fill(); rr2(-30, -60, 26, 8, 4, 'rgba(255,255,255,0.18)');
    ctx.strokeStyle = '#20232f'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (m === 'yuck') {
      for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * 32, -8); ctx.lineTo(s * 16, 0); ctx.lineTo(s * 32, 8); ctx.stroke(); }
      ctx.beginPath(); for (let i = 0; i <= 8; i++) ctx.lineTo(-24 + i * 6, 30 + (i % 2 ? -5 : 5) + Math.sin(t * 9) * 1.5); ctx.stroke(); ell(10, 42, 10, 8, '#e86a8a');
      for (let i = 0; i < 3; i++) { const p = (t * 0.7 + i / 3) % 1; rr2(70 + Math.sin(p * 9 + i) * 6, 30 - p * 90, 9, 18, 4.5, `rgba(140,200,90,${(1 - p) * 0.9})`); }
    } else if (m === 'love') {
      for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * 22, -4); const k = 0.3 * (1 + 0.12 * Math.max(0, Math.sin(t * 7))); ctx.scale(k, k); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(0, 40); ctx.bezierCurveTo(-60, 0, -40, -46, 0, -20); ctx.bezierCurveTo(40, -46, 60, 0, 0, 40); ctx.fill(); ctx.restore(); }
      ctx.beginPath(); ctx.arc(0, 20, 20, 0.2, Math.PI - 0.2); ctx.stroke(); circ(-38, 18, 9, 'rgba(226,69,122,0.4)'); circ(38, 18, 9, 'rgba(226,69,122,0.4)');
    } else { eyes(t, 0, -4, 22, 6); ctx.beginPath(); ctx.moveTo(-14, 28); ctx.lineTo(14, 28); ctx.stroke(); }
    ctx.restore();
  },
  tongue(t, o) {   // a tongue with taste buds; o.bitter turns the back bumps green
    ctx.save(); ctx.rotate(Math.sin(t * 2.4) * 0.06 + (o.bitter ? Math.sin(t * 20) * 0.02 : 0));
    ctx.fillStyle = '#e86a8a'; ctx.beginPath(); ctx.moveTo(-52, -62); ctx.lineTo(52, -62); ctx.lineTo(52, 8); ctx.quadraticCurveTo(52, 70, 0, 70); ctx.quadraticCurveTo(-52, 70, -52, 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#f08aa4'; ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(-10, -50); ctx.lineTo(-10, 50); ctx.quadraticCurveTo(-40, 46, -40, 8); ctx.fill();
    rr2(-4, -54, 8, 84, 4, '#c94f70');
    for (let i = 0; i < 14; i++) { const x = -38 + (i % 4) * 25 + (i % 2) * 4, y = -48 + Math.floor(i / 4) * 26; const back = y < -20; circ(x, y, back ? 7 : 4.5, back && o.bitter ? `rgba(120,200,80,${0.75 + 0.25 * Math.sin(t * 6 + i)})` : '#f7b0c2'); }
    ctx.restore();
  },
  milkshake(t) {
    ctx.save(); ctx.translate(8, -40); ctx.rotate(0.25); rr2(-6, -64, 12, 72, 6, '#f3f7fb'); for (let i = 0; i < 4; i++) rr2(-6, -58 + i * 16, 12, 7, 0, '#e2457a'); ctx.restore();
    poly([[-44, -46], [44, -46], [32, 70], [-32, 70]], 'rgba(220,240,255,0.55)'); poly([[-39, -32], [39, -32], [29, 64], [-29, 64]], '#ff9fb4'); poly([[-39, -32], [-14, -32], [-14, 64], [-29, 64]], '#ffb5c6');
    for (let k = 0; k < 5; k++) circ(-30 + k * 15, -44 + Math.sin(k * 2) * 3, 15, '#fff4ec');
    const b = Math.sin(t * 3) * 3; circ(10, -66 + b, 10, '#e2457a'); circ(7, -69 + b, 3, 'rgba(255,255,255,0.7)');
    for (let i = 0; i < 3; i++) { const p = (t * 0.5 + i / 3) % 1; circ(-16 + i * 14, 56 - p * 80, 4 * (1 - p) + 1, 'rgba(255,255,255,0.6)'); }
  },
  sugar(t) {   // a sugar cube
    poly([[-42, -22], [0, -44], [42, -22], [0, 0]], '#ffffff'); poly([[-42, -22], [0, 0], [0, 50], [-42, 28]], '#e8eef6'); poly([[0, 0], [42, -22], [42, 28], [0, 50]], '#c9d6ec');
    for (let i = 0; i < 7; i++) circ(-30 + (i * 13) % 60, -18 + (i * 17) % 60, 3, 'rgba(160,180,210,0.6)');
  },
  fatDrop(t) { const w = 1 + 0.05 * Math.sin(t * 4); ctx.save(); ctx.scale(w, 2 - w); ctx.fillStyle = '#ffd36b'; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(48, 4, 40, 26); ctx.quadraticCurveTo(28, 60, 0, 60); ctx.quadraticCurveTo(-28, 60, -40, 26); ctx.quadraticCurveTo(-48, 4, 0, -60); ctx.fill(); ell(-14, 14, 10, 18, 'rgba(255,255,255,0.45)', 0.3); ctx.restore(); },
  stomach(t) { const b = 1 + 0.04 * Math.sin(t * 2.4); ctx.save(); ctx.scale(b, b); ctx.fillStyle = '#f29db0'; ctx.beginPath(); ctx.moveTo(-20, -70); ctx.quadraticCurveTo(-20, -30, -46, 0); ctx.quadraticCurveTo(-60, 60, 10, 54); ctx.quadraticCurveTo(70, 46, 50, -10); ctx.quadraticCurveTo(30, -36, 4, -40); ctx.lineTo(4, -70); ctx.fill();
    ctx.strokeStyle = '#d6577a'; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(4, 10, 20 + i * 12, 0.5, 2.6); ctx.stroke(); } ctx.restore(); },
  villi(t, o) {   // gut lining: finger-like villi with blinking nutrient sensors
    rr2(-84, 30, 168, 34, 16, '#c95a7c');
    for (let i = 0; i < 5; i++) { const x = -64 + i * 32; ctx.save(); ctx.translate(x, 36); ctx.rotate(Math.sin(t * 2 + i) * 0.12); rr2(-12, -88, 24, 92, 12, '#f29db0'); rr2(-8, -80, 6, 60, 3, 'rgba(255,255,255,0.3)');
      const on = o.on ? 0.5 + 0.5 * Math.sin(t * 5 + i * 1.3) : 0.15; const rg = ctx.createRadialGradient(0, -62, 2, 0, -62, 20); rg.addColorStop(0, `rgba(255,217,138,${on})`); rg.addColorStop(1, 'rgba(255,217,138,0)'); ctx.fillStyle = rg; ctx.fillRect(-20, -82, 40, 40); circ(0, -62, 6, o.on ? '#ffd98a' : '#c95a7c'); ctx.restore(); }
  },
  dopa(t) {   // a dopamine molecule: a glowing gold ring with two arms
    const rg = ctx.createRadialGradient(0, 0, 8, 0, 0, 80); rg.addColorStop(0, 'rgba(255,217,138,0.55)'); rg.addColorStop(1, 'rgba(255,217,138,0)'); ctx.fillStyle = rg; ctx.fillRect(-80, -80, 160, 160);
    ctx.save(); ctx.rotate(Math.sin(t * 1.2) * 0.3); ctx.fillStyle = '#ffc857'; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; ctx.lineTo(Math.cos(a) * 34, Math.sin(a) * 34); } ctx.closePath(); ctx.fill(); circ(0, 0, 15, '#ea9a52');
    rr2(30, -6, 26, 12, 6, '#ffc857'); circ(60, 0, 11, '#ff8f4a'); rr2(-52, -26, 22, 10, 5, '#ffc857'); circ(-54, -24, 10, '#f3f7fb'); rr2(-52, 16, 22, 10, 5, '#ffc857'); circ(-54, 24, 10, '#f3f7fb'); ctx.restore();
    glint(t, 60, 60, 1.8);
  },
  brainA(t, o) {   // side-view brain with the amygdala spot; o.glow 0..1 lights it gold
    ICONS.brainS(t, {}); const g = o.glow || 0;
    if (g > 0) { const rg = ctx.createRadialGradient(-4, 16, 3, -4, 16, 50); rg.addColorStop(0, `rgba(255,217,138,${g * (0.75 + 0.25 * Math.sin(t * 5))})`); rg.addColorStop(1, 'rgba(255,217,138,0)'); ctx.fillStyle = rg; ctx.fillRect(-56, -36, 104, 104); }
    ell(-4, 16, 13, 8, g > 0 ? '#ffd98a' : '#c9708a', 0.4); ell(-8, 14, 4, 2, 'rgba(255,255,255,0.5)', 0.4);
  },
  brainTop(t, o) {   // brain seen from above (front at the top); o.l / o.r 0..1 glow on each hemisphere
    const p = 1 + 0.015 * Math.sin(t * 2); ctx.save(); ctx.scale(p, p);
    for (const s of [-1, 1]) { const g = (s < 0 ? o.l : o.r) || 0; ell(s * 32, 0, 31, 60, '#f2b3c0');
      ctx.strokeStyle = '#d98aa0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; [[-40, -10], [-20, 6], [0, -6], [20, 8], [40, -6]].forEach(([y, d], i) => { ctx.beginPath(); ctx.moveTo(s * 10, y + 4); ctx.quadraticCurveTo(s * (30 + d), y - 10, s * 52, y + 6); ctx.stroke(); });
      if (g > 0) { const rg = ctx.createRadialGradient(s * 32, 10, 4, s * 32, 10, 60); rg.addColorStop(0, `rgba(255,217,138,${g * (0.8 + 0.2 * Math.sin(t * 5))})`); rg.addColorStop(1, 'rgba(255,217,138,0)'); ctx.fillStyle = rg; ctx.fillRect(s * 32 - 60, -50, 120, 120); }
      font(20, 700); ctx.fillStyle = g > 0.5 ? '#ffd98a' : '#c9d6ec'; ctx.textAlign = 'center'; ctx.fillText(s < 0 ? 'L' : 'R', s * 32, 84); }
    rr2(-2, -58, 4, 116, 2, '#b06a84'); ctx.restore();
  },
  bottleF(t, o) {   // a flavoured drink bottle; o.col liquid colour
    const c = o.col || '#b48cff', sl = Math.sin(t * 3) * 4; rr2(-32, -40, 64, 110, 18, 'rgba(220,240,255,0.55)'); rr2(-14, -72, 28, 36, 8, 'rgba(220,240,255,0.55)'); rr2(-17, -86, 34, 16, 6, c);
    ctx.save(); ctx.beginPath(); ctx.roundRect(-28, -36, 56, 102, 14); ctx.clip(); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-30, -8 + sl); ctx.quadraticCurveTo(0, -8 - sl, 30, -8 + sl); ctx.lineTo(30, 70); ctx.lineTo(-30, 70); ctx.fill(); ctx.restore();
    rr2(-32, 12, 64, 26, 4, '#f3f7fb'); circ(0, 25, 8, c); rr2(-24, -32, 8, 60, 4, 'rgba(255,255,255,0.35)');
  },
  switchT(t, o) {   // a wall switch; o.on flips it and makes it spark
    rr2(-48, -70, 96, 140, 18, '#f3f7fb'); rr2(-40, -62, 80, 124, 14, '#e8eef6'); rr2(-16, -42, 32, 84, 14, '#9fb0d8');
    if (o.on) { const rg = ctx.createRadialGradient(0, -22, 4, 0, -22, 60); rg.addColorStop(0, 'rgba(255,217,138,0.7)'); rg.addColorStop(1, 'rgba(255,217,138,0)'); ctx.fillStyle = rg; ctx.fillRect(-60, -82, 120, 120); rr2(-18, -46, 36, 40, 12, '#3fae6a');
      for (let i = 0; i < 3; i++) { const a = i * 2.1 + t * 3, f = (Math.sin(t * 17 + i * 3) + 1) / 2; ctx.save(); ctx.globalAlpha *= f; ctx.translate(Math.cos(a) * 44, -22 + Math.sin(a) * 44); ctx.rotate(a); poly([[0, -12], [6, -2], [-2, 0], [4, 12], [-6, 0], [2, -2]], '#ffd98a'); ctx.restore(); } }
    else rr2(-18, 6, 36, 40, 12, '#5b6585');
  },
  mri(t) {   // a brain scanner: ring + bed, a light sweeps round the ring
    circ(0, -14, 72, '#f3f7fb'); circ(0, -14, 42, '#20232f'); circ(0, -14, 58, 'rgba(143,216,230,0.25)');
    for (let i = 0; i < 10; i++) { const a = t * 1.8 + i / 10 * 6.283; circ(Math.cos(a) * 57, -14 + Math.sin(a) * 57, i === 0 ? 7 : 4, i === 0 ? '#8fd8e6' : 'rgba(143,216,230,0.35)'); }
    rr2(-104, 22, 208, 16, 8, '#9fb0d8'); rr2(-84, 38, 12, 30, 5, '#5b6585'); rr2(72, 38, 12, 30, 5, '#5b6585'); circ(-60, 14, 14, SK[0]);
  },
});
Object.assign(IDLE, { face: {}, tongue: {}, milkshake: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.04) }, sugar: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.08), post: t => glint(t, 44, 44) }, fatDrop: {}, stomach: {}, villi: {}, dopa: { pre: t => ctx.translate(0, Math.sin(t * 3) * 4) }, brainA: {}, brainTop: {}, bottleF: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.05) }, switchT: {}, mri: {} });
const yuckLove = sw => tt => ({ m: tt < T(sw) ? 'yuck' : 'love' });
// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [A('coffee', 560, 560, 3.0, 'c1:coffee', { hw: 54, hh: 66 }), A('face', 1000, 560, 2.4, 'c1:awful', { o: yuckLove('c1:amazing') }), A('heart', 1420, 540, 2.2, 'c1:amazing', { hw: 58, hh: 50 })] },
    { at: 'c2', cast: [A('stomach', 300, 620, 2.0, 'c2:gut'), A('brainA', 700, 380, 2.2, 'c2:brain', { o: { glow: 0.6 } }), A('tongue', 1180, 520, 2.0, 'c2:bitter', { o: { bitter: 1 }, hh: 70 }), A('skullX', 1600, 520, 1.8, 'c2:poison', { shake: ['c2:poison', 0.8] })],
      fx: [['stream', 0, 1, 'c2:teaching', 'c2:bitter', { col: '#ffd98a', n: 10, arc: 40 }]], lab: [['BITTER = A WARNING TASTE', 'c2:warning', 1390, 965, '#b6f08a', 30]] },
    { at: 'c3', cast: [A('docV', 260, 520, 1.7, 'c3:nature', { o: { title: 'NATURE', ticks: 0 } }), A('calDay', 590, 520, 1.6, 'c3:november', { o: { m: 'NOV', d: '4' } }), A('stomach', 930, 640, 1.6, 'c3:stomach'), A('brainA', 1260, 400, 2.0, 'c3:starts', { o: tt => ({ glow: clamp((tt - T('c3:brain')) / 1) }) }), A('face', 1650, 560, 2.0, 'c3:flavo', { o: yuckLove('c3:crave') })],
      fx: [['stream', 2, 3, 'c3:starts', 'c3>', { col: '#ffd98a', n: 10, arc: 30 }]], lab: [['A SLOW SIGNAL FROM GUT TO BRAIN', 'c3:slow', 760, 965, GOLD, 30]] },
  ], 'g1'));
}
// ---------- 1 the slow dopamine ----------
function sGut(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('g1', [A('dopa', 760, 540, 2.2, 'g1:dopamine'), A('stopwatch', 1180, 540, 1.8, 'g1:instant')]),
    { at: 'g2', cast: [A('dopa', 330, 520, 1.8, 'g2:dopamine', { pulse: ['g2:fires', 'g2:spot'] }), A('stopwatch', 720, 520, 1.8, 'g2:seconds'), A('eye', 1130, 520, 1.8, 'g2:spot'), A('donut', 1560, 520, 2.0, 'g2:snack')],
      fx: [['zap', 3, 2, 'g2:snack', 0.6], ['zap', 2, 0, 'g2:shelf', 0.6]], lab: [['THE FAST KIND: SECONDS', 'g2:seconds', 720, 965, WHITE, 30]] },
    { at: 'g3', cast: [A('hglass', 260, 520, 1.8, 'g3:slow'), A('doctor', 600, 560, 2.0, 'g3:researchers'), A('sugar', 980, 330, 1.3, 'g3:sugar', { mv: [['g3:straight', 1330, 520, 60]], out: 'g3:mice+0.6' }), A('milkshake', 980, 700, 1.3, 'g3:milkshake', { mv: [['g3:stomachs', 1330, 600, 60]], out: 'g3:mice+0.9', hh: 90 }), A('mouse', 1420, 560, 2.4, 'g3:straight', { hit: ['g3:mice+0.5'] }), A('cross', 1720, 330, 1.0, 'g3:never')],
      lab: [['STRAIGHT INTO THE STOMACH', 'g3:straight', 960, 965, GOLD, 30]] },
    { at: 'g4', cast: [A('villi', 330, 640, 2.0, 'g4:sensors', { o: tt => ({ on: tt > T('g4:detect') }), hw: 84, hh: 88 }), A('sugar', 250, 290, 1.0, 'g4:sugar'), A('fatDrop', 430, 290, 0.9, 'g4:fat'), A('brainA', 1050, 500, 2.8, 'g4:brain', { o: tt => ({ glow: clamp((tt - T('g4:rising')) / 1.2) }) }), A('dopa', 1560, 330, 1.3, 'g4:dopamine'), A('hglass', 1560, 720, 1.5, 'g4:minutes')],
      fx: [['stream', 0, 3, 'g4:sent', 'g4>', { col: '#ffd98a', n: 12, arc: 80 }]], tag: [['AMYGDALA', 'g4:amygdala|emigdala|amig', 1050, 965, '#9b3352', 38]] },
    QB('g5q', [A('stomach', 760, 540, 2.2, 'g5q:gut'), A('check', 1180, 540, 1.6, 'g5q:grades')]),
    { at: 'g6', cast: [A('bottleF', 260, 520, 1.8, 'g6:flavo', { o: { col: '#b48cff' } }), A('mouse', 620, 600, 2.0, 'g6:mice'), A('sugar', 620, 300, 0.9, 'g6:calories', { mv: [['g6:stomachs', 620, 470, 30]], out: 'g6:prefer' }), A('heart', 960, 420, 1.5, 'g6:prefer'),
      A('dopa', 1300, 480, 1.6, 'g6:blocked', { grey: 'g6:blocked+0.3' }), A('cross', 1300, 760, 1.0, 'g6:blocked+0.3'), A('mouse', 1660, 600, 1.8, 'g6:normally'), A('question', 1660, 310, 1.1, 'g6:never')],
      lab: [['NO DOPAMINE, NO LEARNING', 'g6:blocked', 1300, 965, GOLD, 30]] },
    { at: 'g7', cast: [A('switchT', 330, 520, 1.8, 'g7:switched', { o: tt => ({ on: tt > T('g7:on') }) }), A('bottleF', 800, 560, 1.8, 'g7:flavo', { o: { col: '#8fd8e6' } }), A('mouse', 1220, 600, 2.0, 'g7:mice'), A('heart', 1620, 520, 1.8, 'g7:prefer', { pulse: ['g7:anyway'] })],
      fx: [['zap', 0, 2, 'g7:on', 0.7], ['stream', 1, 2, 'g7:flavo', 'g7:prefer', { col: '#8fd8e6', n: 8, arc: 50 }]], num: [['g7:zero', 800, 220, '0', 'CALORIES']] },
  ], 'l1'));
}
// ---------- 2 the left-side surprise ----------
function sLeft(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('l1', [A('adult', 760, 560, 2.2, 'l1:humans'), A('mouse', 1180, 580, 1.8, 'l1+0.2')]),
    { at: 'l2', cast: [A('mri', 330, 560, 1.9, 'l2:scans', { hw: 104, hh: 86 }), A('milkshake', 720, 560, 1.6, 'l2:milkshake', { hh: 90 }), A('adult', 1060, 580, 1.7, 'l2:adults'), A('sugar', 1340, 560, 1.3, 'l2:sugar'), A('brainA', 1680, 560, 2.0, 'l2:same', { o: tt => ({ glow: clamp((tt - T('l2:lit')) / 0.8) }) })],
      num: [['l2:13', 560, 215, '13', 'MEN · MILKSHAKE'], ['l2:38', 1200, 215, '38', 'ADULTS · SUGAR WATER']] },
    { at: 'l3', cast: [A('brainTop', 640, 500, 3.0, 'l3:twist', { o: tt => ({ l: tt > T('l3:left') ? 1 : 0.35, r: 0.35 }), hw: 64, hh: 86 }), A('mouse', 1180, 360, 1.4, 'l3:mice'), A('adult', 1180, 720, 1.4, 'l3:people'), A('question', 1620, 520, 1.7, 'l3:expected', { pulse: ['l3:why'] })],
      tag: [['LEFT SIDE ≫ RIGHT SIDE', 'l3:left', 640, 965, '#5b4fd6', 36]] },
  ], 'k1'));
}
// ---------- 3 back to your coffee ----------
function sCoffee(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('k1', [A('coffee', 760, 560, 2.6, 'k1:coffee', { hw: 54, hh: 66 }), A('face', 1180, 560, 1.8, 'k1:mean')]),
    { at: 'k2', cast: [A('coffee', 260, 540, 2.2, 'k2+0.05', { hw: 54, hh: 66 }), A('doctor', 600, 560, 1.8, 'k2:scientist'), A('tongue', 950, 540, 1.7, 'k2:bitter', { o: tt => ({ bitter: tt < T('k2:better') }), hh: 70 }), A('battery', 1300, 540, 1.6, 'k2:caffeine', { o: tt => ({ level: 0.2 + 0.8 * clamp((tt - T('k2:lift')) / 2) }), hw: 78, hh: 40 }), A('face', 1660, 540, 1.9, 'k2:cup', { o: yuckLove('k2:better') })],
      fx: [['stream', 2, 3, 'k2:links', 'k2:cup', { col: '#ffd98a', n: 8, arc: 40 }]], lab: [['COFFEE ITSELF WASN\'T TESTED', 'k2:tested', 560, 965, WHITE, 28], ['CUP BY CUP', 'k2:cup', 1540, 965, GOLD, 30]] },
    { at: 'k3', cast: [A('syringeC', 380, 520, 1.7, 'k3:drugs', { hw: 90, hh: 50 }), A('dopa', 840, 520, 1.8, 'k3:signal', { grey: 'k3:dampen' }), A('plate', 1280, 540, 2.0, 'k3:food', { grey: 'k3:rewarding', hw: 84, hh: 40 }), A('question', 1680, 520, 1.6, 'k3:tested')],
      fx: [['zap', 0, 1, 'k3:dampen', 0.6, '#8fd8e6']], lab: [['GLP-1 DRUGS: AN OPEN QUESTION', 'k3:wonders', 960, 965, GOLD, 30]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [A('coffee', 760, 560, 2.6, 'o1:coffee', { hw: 54, hh: 66 }), A('face', 1180, 560, 1.8, 'o1:love', { o: { m: 'love' } })]),
    { at: 'o2', cast: [A('tongue', 300, 540, 1.8, 'o2:tongue', { o: { bitter: 1 }, hh: 70 }), A('stomach', 720, 600, 1.9, 'o2:gut'), A('brainA', 1150, 460, 2.4, 'o2:good', { o: { glow: 1 } }), A('heart', 1620, 540, 1.8, 'o2:listened')],
      fx: [['stream', 1, 2, 'o2:good', 'o2>', { col: '#ffd98a', n: 10, arc: 50 }]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [A('coffee', 420, 640, 2.4, 'o3', { hw: 54, hh: 66 }), A('brainA', 420, 290, 1.5, 'o3', { o: { glow: 1 } })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'YOUR GUT TAUGHT YOUR BRAIN', 'WHY YOU LEARN TO LOVE COFFEE', 1240, 50, 62);
}
const CHAPTERS = [['g1', 'The slow dopamine', 'coral', 'dopa'], ['l1', 'The left-side surprise', 'indigo', 'brainTop'], ['k1', 'Back to your coffee', 'teal', 'coffee']];
function SECTIONS() { return makeSections(CHAPTERS, { g1: [sGut, 'g2'], l1: [sLeft, 'l2'], k1: [sCoffee, 'k2'] }, sOpen, sOutro); }
