// "Why are so many young adults having strokes?" — topic file (shared engine + common.js)
function brainAt(t, x, y, r, o = {}) { drawBrainAt(t, { x, y, r }, { tired: o.tired || 0, glow: o.glow ?? 0.3, dim: o.dim || 0, noWaste: 1, halo: o.halo }); }
function artery(t, x0, y, w, h, o = {}) {   // a horizontal artery with flowing red cells; o.clot (0..1 position) blocks the flow; o.burst makes a bleed
  rr2(x0, y - h / 2, w, h, h / 2, '#c95a7c'); rr2(x0 + 10, y - h / 2 + 10, w - 20, h - 20, (h - 20) / 2, '#7a1f33'); reg('hero', 'artery', x0, y - h / 2, x0 + w, y + h / 2);
  const cx = o.clot != null ? x0 + w * o.clot : 1e9;
  for (let i = 0; i < 14; i++) { const sp = o.clot != null ? 0.15 : 1; let x = x0 + 30 + ((i * 97 + t * 260 * sp) % (w - 60)); if (x > cx - 40) x = Math.min(x, cx - 40 - (i % 4) * 34); rbcDisc(x, y + Math.sin(i * 2 + t) * h * 0.18, h * 0.16, 0.6 + 0.3 * Math.abs(Math.sin(i + t)), i); }
  if (o.clot != null) { ctx.fillStyle = '#5e1a26'; ctx.beginPath(); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283, r = h * 0.42 * (1 + 0.12 * Math.sin(i * 3 + t * 2)); ctx.lineTo(cx + Math.cos(a) * r * 0.8, y + Math.sin(a) * r); } ctx.fill(); for (let i = 0; i < 6; i++) rr2(cx - 40 + i * 14, y - h * 0.35, 3, h * 0.7, 1.5, 'rgba(255,230,200,0.35)'); }
  if (o.burst) { const bx = x0 + w * 0.6, k = o.burst; ctx.fillStyle = 'rgba(200,30,50,0.85)'; ctx.beginPath(); for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283, r = 40 + k * 140 * (0.7 + 0.3 * Math.sin(i * 2.3 + t)); ctx.lineTo(bx + Math.cos(a) * r, y - h / 2 - 20 - k * 60 + Math.sin(a) * r * 0.7); } ctx.fill(); }
}
Object.assign(ICONS, {
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
});
Object.assign(IDLE, { bpcuff: {}, sugarcube: {}, heartE: {}, leaf7: {}, scanner: {}, neck: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.04) }, pfo: {}, aura: {}, catheter: {}, dizzy: {}, rewire: {} });
const LETTERS = [['B', 'BALANCE', 'dizzy'], ['E', 'EYES', 'eye'], ['F', 'FACE', 'person'], ['A', 'ARMS', 'person'], ['S', 'SPEECH', 'bubble'], ['T', 'TIME', 'phone']];

function sOpen(t) {
  worldBG(t, 'night');
  if (t < S('c3') - 0.1) { brainAt(t, 960, 500, 300, { glow: 0.5 }); label('STROKES IN YOUNG ADULTS', 960, 110, t, 0.4, S('c2') + 0.5, GOLD, 40);
    bigNumber(t, 960, 950, W_('c2', 'doubled') - 0.2, S('c3') - 0.3, '×2', 'AGES 20–54 · 1993 → 2020'); label('SEPTEMBER 2026 STUDY', 960, 110, t, W_('c2', 'study'), S('c3') - 0.3, WHITE, 32); return; }
  kidAt(t, 560, 950, 1.6, { look: [1, -0.2] }); brainAt(t, 1320, 480, 260, { glow: 0.3 });
  label('OLDER ADULTS: FEWER STROKES', 1320, 860, t, W_('c3', 'older'), S('s1') - 0.4, '#9be3a5', 30); if (t > S('c3b') - 0.1) label('2,000+ FIRST STROKES STUDIED', 1320, 960, t, W_('c3b', 'two', 0), S('s1') - 0.4, WHITE, 28);
}
function sWhat(t) {
  worldBG(t, 'indigo');
  if (t < S('s3') - 0.1) { brainAt(t, 640, 520, 300, { glow: 0.4 }); bigNumber(t, 1450, 330, W_('s2', 'two'), S('s3') - 0.3, '2%', 'OF YOUR BODY WEIGHT', TEAL); bigNumber(t, 1450, 700, W_('s2', 'fifth'), S('s3') - 0.3, '~20%', 'OF YOUR OXYGEN'); return; }
  if (t < S('s4q') - 0.1) { const burst = t > W_('s3', 'bursts') - 0.2; artery(t, 160, 470, 1600, 180, burst ? { burst: clamp((t - W_('s3', 'bursts') + 0.2) / 1.2) } : { clot: 0.62 });
    tag(burst ? 'HEMORRHAGIC: A BLEED' : 'ISCHEMIC: A CLOT', 960, 780, t, burst ? W_('s3', 'bursts') : W_('s3', 'clot'), S('s4q') - 0.3, burst ? '#e2457a' : '#5b4fd6', 40);
    if (t > S('s3b') - 0.1) { label('~87% ARE CLOTS', 600, 920, t, W_('s3b', 'eighty'), S('s4q') - 0.3, GOLD, 32); label('US: A STROKE EVERY ~40 SECONDS', 1300, 920, t, W_('s3b', 'forty'), S('s4q') - 0.3, WHITE, 30); } return; }
  brainAt(t, 640, 520, 280, { glow: 0.2, tired: clamp((t - S('s5')) / 8) * 0.8, dim: clamp((t - S('s5')) / 8) * 0.5 }); placeIcon('clock3', [[1450, 300]], 1.8, t, S('s4q') + 0.2, S('d1') - 0.3, { hw: 58, hh: 58 });
  bigNumber(t, 1450, 620, W_('s5', ['1', 'one']), S('s5b') - 0.3, '1.9 M', 'NERVE CELLS LOST PER MINUTE', '#ff9fb4');
  if (t > S('s5b') - 0.1) { label('14 BILLION CONNECTIONS / MIN', 1450, 560, t, W_('s5b', 'fourteen'), S('d1') - 0.4, WHITE, 26); label('+3.6 YEARS OF BRAIN AGING / HOUR', 1450, 660, t, W_('s5b', 'ages'), S('d1') - 0.4, GOLD, 26); }
  tag('TIME IS BRAIN', 960, 960, t, W_('s6', 'time'), S('d1') - 0.4, '#e2457a', 48);
}
function sStudy(t) {
  worldBG(t, 'night');
  if (t < S('d3') - 0.1) { placeIcon('doc2', [[560, 470]], 2.6, t, S('d1') + 1.0, S('d3') - 0.2, { hw: 52, hh: 66 }); label('UNIVERSITY OF CINCINNATI', 1300, 300, t, W_('d2', 'cincinnati') - 0.3, S('d3') - 0.3, GOLD, 32); label('5 COUNTIES · OHIO + KENTUCKY', 1300, 400, t, W_('d2', 'five'), S('d3') - 0.3, WHITE, 30); label('SNAPSHOTS 1993 → 2020', 1300, 500, t, W_('d2', 'snapshots'), S('d3') - 0.3, WHITE, 30); return; }
  if (t < S('d5q') - 0.1) { meter(360, 380, 1200, 33.9 / 62.2, t, W_('d3', ['1993', 'nineteen']), S('d5q') - 0.3, '#8fd8e6', '#5aa9e6', '1993: ~34 PER 100,000 YOUNG ADULTS'); meter(360, 600, 1200, 1, t, W_('d3', ['2020', 'twenty', 'sixty']), S('d5q') - 0.3, '#ffd98a', '#e2457a', '2020: ~62 PER 100,000');
    if (t > S('d4') - 0.1) tag('CLOT STROKES: ~24 → ~47', 960, 860, t, W_('d4', 'clots'), S('d5q') - 0.3, '#5b4fd6', 40); return; }
  meter(360, 380, 1200, 1, t, S('d5q') + 0.2, S('r1') - 0.4, '#9aa6c4', '#5b6585', 'OLDER ADULTS 1993: ~619 PER 100,000'); meter(360, 600, 1200, 453 / 619, t, W_('d6', 'four'), S('r1') - 0.4, '#9be3a5', '#3fae6a', 'OLDER ADULTS 2020: ~453');
  if (t > S('d6b') - 0.1) tag('YOUNG DEATHS IN 30 DAYS: ~12% → ~9%', 960, 860, t, W_('d6b', 'died'), S('r1') - 0.4, '#3f8f6a', 36);
}
function sRisk(t) {
  worldBG(t, 'coral');
  if (t < S('r2') - 0.1) { kidAt(t, 960, 900, 1.7, { look: [0, -0.4] }); label('WHAT DO YOUNG PATIENTS SHARE?', 960, 160, t, S('r1') + 1.0, S('r2') - 0.3, GOLD, 38); return; }
  if (t < S('r4') - 0.1) { tile3(t, [['bpcuff', 'BLOOD PRESSURE 47% → 60%', '#9b3352', W_('r2', 'blood')], ['sugarcube', 'DIABETES 19% → 26%', '#5b4fd6', W_('r2', 'diabetes')], ['heartE', 'IRREGULAR BEAT 1% → 6%', '#127b84', W_('r3', 'atrial')]], 520); return; }
  if (t < S('r5q') - 0.1) { placeIcon('clock3', [[560, 470]], 2.4, t, S('r4'), S('r5q') - 0.2, { hw: 58, hh: 58 }); label('"RISK IS BUILDING EARLIER IN LIFE"', 1260, 420, t, W_('r4', 'risk'), S('r5q') - 0.3, GOLD, 32);
    if (t > S('r4b') - 0.1) label('ONLY MEASURED IN STROKE PATIENTS', 1260, 560, t, W_('r4b', 'only'), S('r5q') - 0.3, WHITE, 28); return; }
  artery(t, 160, 420, 1600, 200, {}); const hit = Math.max(0, Math.sin(t * 7)) ** 6; ctx.save(); ctx.translate(960, 420 - 140 - hit * 20); ctx.scale(1.6, 1.6); drawIcon('bpcuff', t); ctx.restore();
  label('EVERY HEARTBEAT HAMMERS THE WALLS', 960, 720, t, W_('r6', 'hammers'), S('m1') - 0.4, WHITE, 32); tag('MANY DON\'T KNOW THEY HAVE IT', 960, 860, t, W_('r6', 'know'), S('m1') - 0.4, '#9b3352', 38);
}
function sCannabis(t) {
  worldBG(t, 'teal');
  if (t < S('m4q') - 0.1) { placeIcon('leaf7', [[560, 470]], 2.6, t, S('m1') + 1.0, S('m4q') - 0.2, { hw: 80, hh: 80 }); meter(980, 380, 760, 0.009 / 0.306, t, W_('m2', ['1993', 'nineteen']), S('m4q') - 0.3, '#9be3a5', '#5aa96a', '1993: <1% USED MARIJUANA'); meter(980, 580, 760, 1, t, W_('m2', ['2020', 'twenty']), S('m4q') - 0.3, '#ffd98a', '#e2457a', '2020: ~31%');
    if (t > S('m3') - 0.1) tag('ANY SUBSTANCE: <5% → ~40%', 1360, 820, t, W_('m3', 'any'), S('m4q') - 0.3, '#0b4f5c', 36); return; }
  if (t < S('m6') - 0.1) { placeIcon('leaf7', [[560, 470]], 2.2, t, S('m4q'), S('m6') - 0.2, { hw: 80, hh: 80 }); label('?', 820, 250, t, S('m4q') + 0.3, S('m6') - 0.3, GOLD, 60, { pill: false }); tag('A LINK, NOT PROOF', 1300, 420, t, W_('m5', 'say'), S('m6') - 0.3, '#0b4f5c', 40); label('NEEDS DEDICATED RESEARCH', 1300, 560, t, W_('m5', 'dedicated'), S('m6') - 0.3, WHITE, 30); return; }
  placeIcon('scanner', [[620, 480]], 2.4, t, S('m6'), S('y1') - 0.3, { hw: 110, hh: 82 }); label('MORE SCANS, BETTER IMAGING', 1320, 420, t, W_('m6', 'scan'), S('y1') - 0.4, GOLD, 32); label('= MORE STROKES FOUND', 1320, 520, t, W_('m6', 'finding'), S('y1') - 0.4, WHITE, 30);
}
function sYoung(t) {
  worldBG(t, 'cream'); label('MORE COMMON IN THE YOUNG', 960, 110, t, S('y1') + 1.0, S('h1') - 0.4, '#5e2618', 34, { color: WHITE });
  tile3(t, [['neck', 'NECK ARTERY TEAR', '#c95a7c', W_('y2', 'tear')], ['pfo', 'HOLE IN THE HEART (PFO)', '#5b4fd6', W_('y3', 'opening')], ['aura', 'MIGRAINE WITH AURA', '#127b84', W_('y4', 'migraine')]], 500);
  if (t > S('y3') - 0.1 && t < S('y4') - 0.1) label('~1 IN 4 PEOPLE HAVE ONE · USUALLY HARMLESS', 960, 930, t, W_('y3', 'one'), S('y4') - 0.3, '#5e2618', 28, { color: WHITE });
  if (t > S('y4') - 0.1) label('~2× THE RISK OF A CLOT STROKE', 960, 930, t, W_('y4', 'twice'), S('h1') - 0.4, '#5e2618', 30, { color: GOLD });
}
function sHospital(t) {
  worldBG(t, 'indigo');
  if (t < S('h3') - 0.1) { placeIcon('scanner', [[620, 480]], 2.4, t, S('h1') + 1.0, S('h3') - 0.2, { hw: 110, hh: 82 }); label('FIRST: A BRAIN SCAN', 1320, 380, t, W_('h2', 'scan'), S('h3') - 0.3, GOLD, 34); label('CLOT OR BLEED?', 1320, 480, t, W_('h2', 'clot'), S('h3') - 0.3, WHITE, 32); return; }
  if (t < S('h5') - 0.1) { artery(t, 160, 380, 1000, 180, { clot: t < S('h4') ? lerp(0.6, 1.4, clamp((t - W_('h3', 'dissolves')) / 3)) : lerp(0.6, 1.4, clamp((t - W_('h4', 'pull')) / 2)) });
    if (t < S('h4') - 0.1) tag('CLOT-DISSOLVING DRUG · ~4.5 H', 960, 760, t, W_('h3', 'drug'), S('h4') - 0.3, '#5b4fd6', 38);
    else { placeIcon('catheter', [[1500, 400]], 2.2, t, S('h4'), S('h5') - 0.2, { hw: 90, hh: 80 }); tag('PULL THE CLOT OUT', 960, 760, t, W_('h4', 'pull'), S('h5') - 0.3, '#5b4fd6', 40); label('SOMETIMES HOURS LATER', 960, 880, t, W_('h4', 'hours'), S('h5') - 0.3, WHITE, 30); } return; }
  if (t < S('l1q') - 0.1) { brainAt(t, 960, 470, 280, { glow: clamp((t - S('h5')) / 2) }); tag('BLOOD FLOWS · BRAIN SAVED', 960, 930, t, W_('h5', 'sooner'), S('l1q') - 0.3, '#3f8f6a', 40); return; }
  placeIcon('rewire', [[620, 480]], 3.0, t, S('l1q'), S('f1') - 0.3, { hw: 76, hh: 64 }); label('THE BRAIN CAN REWIRE', 1320, 380, t, W_('l2', 'rewire'), S('f1') - 0.4, GOLD, 34); label('REHAB HELPS', 1320, 480, t, W_('l2', 'rehab'), S('f1') - 0.4, WHITE, 32);
  if (t > S('l3') - 0.1) label('HIDDEN: TIREDNESS · FOCUS · DEPRESSION', 1260, 640, t, W_('l3', 'hidden'), S('f1') - 0.4, '#ff9fb4', 26);
}
function sFast(t) {
  worldBG(t, 'night');
  if (t < S('f4q') - 0.1) { LETTERS.forEach(([ch, nm, ic], i) => { const t0 = W_(i < 2 ? 'f2' : 'f3', nm.toLowerCase().slice(0, 4)) - 0.3; const k = spring(t - t0, 0.5, 13); if (k <= 0) return; const x = 200 + i * 304, y = 480;
      ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rr2(-130, -230, 260, 460, 30, ['#e2457a', '#5b4fd6', '#127b84', '#c8553d', '#7f5fd6', '#9b3352'][i]); font(120, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ch, 0, -130); ctx.translate(0, 50); ctx.scale(1.2, 1.2); drawIcon(ic, t, {}); ctx.restore(); reg('panel', nm, x - 130, y - 230, x + 130, y + 230);
      if (k > 0.6) riseText(nm, x, y + 180, t0 + 0.15, t, { size: 30, weight: 700, color: WHITE, pill: false }); });
    label('BE FAST', 960, 120, t, S('f2'), S('f4q') - 0.3, GOLD, 44); label('CALL EMERGENCY SERVICES', 960, 1000, t, W_('f3', 'call'), S('f4q') - 0.3, WHITE, 30); return; }
  if (t < S('f6q') - 0.1) { placeIcon('clock3', [[620, 470]], 2.6, t, S('f4q'), S('f6q') - 0.2, { hw: 58, hh: 58 }); tag('NEVER WAIT AND SEE', 1320, 380, t, W_('f5', 'never'), S('f6q') - 0.3, '#e2457a', 42); label('TREATMENT WORKS IN THE FIRST HOURS', 1320, 500, t, W_('f5', 'hours'), S('f6q') - 0.3, WHITE, 28);
    if (t > S('f5b') - 0.1) label('A MINI-STROKE (TIA) IS A WARNING', 1320, 620, t, W_('f5b', 'mini'), S('f6q') - 0.3, GOLD, 30); return; }
  kidAt(t, 600, 940, 1.7, { look: [1, -0.3] }); placeIcon('dizzy', [[600, 260]], 1.6, t, W_('f7', 'dizziness'), S('p1') - 0.3, { hw: 60, hh: 40 });
  label('OFTEN MISSED IN YOUNGER PATIENTS', 1320, 380, t, W_('f7', 'missed'), S('p1') - 0.4, WHITE, 28); tag('SAY "STROKE" · ASK FOR A SCAN', 1320, 540, t, W_('f8', 'stroke'), S('p1') - 0.4, '#e2457a', 36);
}
function sProtect(t) {
  worldBG(t, 'teal');
  if (t < S('p3') - 0.1) { tile3(t, [['bpcuff', 'BLOOD PRESSURE', '#9b3352', W_('p2', 'blood')], ['sugarcube', 'BLOOD SUGAR', '#5b4fd6', W_('p2', 'sugar')], ['doc2', 'CHOLESTEROL', '#127b84', W_('p2', 'cholesterol')]], 500);
    if (t > S('p2b') - 0.1) label('130/80 OR HIGHER = HIGH (US)', 960, 940, t, W_('p2b', 'hundred'), S('p3') - 0.3, GOLD, 32); return; }
  if (t < S('p4') - 0.1) { tile3(t, [['leaf7', 'NO SMOKING', '#9b3352', W_('p3', 'smoke'), { mark: 0 }], ['person', 'MOVE EVERY DAY', '#3f8f6a', W_('p3', 'move'), { col: '#ffd98a' }], ['heartE', 'HEALTHY WEIGHT', '#5b4fd6', W_('p3', 'weight')]], 500); return; }
  placeIcon('aura', [[620, 480]], 3.0, t, S('p4'), S('o1') - 0.3, { hw: 60, hh: 60 }); label('MIGRAINE WITH AURA?', 1320, 380, t, W_('p4', 'migraines'), S('o1') - 0.4, GOLD, 34); label('+ SMOKING OR THE COMBINED PILL', 1320, 480, t, W_('p4', 'smoke'), S('o1') - 0.4, WHITE, 28); tag('TALK TO A DOCTOR', 1320, 620, t, W_('p4', 'doctor'), S('o1') - 0.4, '#0b4f5c', 40);
}
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { brainAt(t, 1300, 480, 280, { glow: 0.6 }); kidAt(t, 480, 950, 1.6, { look: [1, -0.3] }); label('RISK IS BUILDING EARLIER', 1300, 880, t, W_('o2', 'earlier'), S('o3') - 0.3, WHITE, 30); label('MUCH OF IT YOU CAN MEASURE AND CHANGE', 1300, 970, t, W_('o2', 'measure'), S('o3') - 0.3, GOLD, 28); return; }
  brainAt(t, 420, 500, 240, { glow: 0.4 }); outroTitle(t, 'WHY MORE YOUNG ADULTS', 'ARE HAVING STROKES', 1300, 54, 70);
}
const CHAPTERS = [['s1', 'What a stroke is', 'indigo', 'heartE'], ['d1', 'The study', 'night', 'doc2'], ['r1', 'The risk factors', 'coral', 'bpcuff'], ['m1', 'The cannabis question', 'teal', 'leaf7'], ['y1', 'Young strokes are different', 'cream', 'neck'],
  ['h1', 'In the emergency room', 'indigo', 'scanner'], ['f1', 'Spot it fast', 'night', 'clock3'], ['p1', 'Protect your brain', 'teal', 'bpcuff']];
function SECTIONS() { return makeSections(CHAPTERS, { s1: [sWhat, 's2'], d1: [sStudy, 'd2'], r1: [sRisk, 'r2'], m1: [sCannabis, 'm2'], y1: [sYoung, 'y2'], h1: [sHospital, 'h2'], f1: [sFast, 'f2'], p1: [sProtect, 'p2'] }, sOpen, sOutro); }
