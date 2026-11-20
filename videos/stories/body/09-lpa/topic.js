// "The hidden cholesterol 1 in 5 people inherit" — Lp(a) — topic file (shared engine + common.js)
function particle(t, x, y, r, o = {}) {   // an LDL particle (yellow lipid core, blue apoB band); o.tail adds the apo(a) kringle chain
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 0.8 + x) * 0.15);
  if (o.tail) { let px = r * 0.7, py = r * 0.5; for (let i = 0; i < 9; i++) { const a = 0.6 + Math.sin(t * 2 + i * 0.7) * 0.5; px += Math.cos(a) * r * 0.28; py += Math.sin(a) * r * 0.28; ctx.strokeStyle = '#e2457a'; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.arc(px, py, r * 0.12, 0, 6.283); ctx.stroke(); circ(px, py, r * 0.05, '#ff9fb4'); } }
  circ(0, 0, r, '#ffcf5a'); circ(0, 0, r * 0.82, '#ffe08a'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.clip(); ctx.strokeStyle = '#5b8dd6'; ctx.lineWidth = r * 0.16; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.02, r * 0.4, -0.5, 0, 6.283); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 10; i++) { const a = i * 0.63; circ(Math.cos(a) * r * 0.45, Math.sin(a) * r * 0.45, r * 0.08, 'rgba(255,170,60,0.6)'); } rr2(-r * 0.6, -r * 0.7, r * 0.5, r * 0.14, r * 0.07, 'rgba(255,255,255,0.6)'); ctx.restore();
}
function vessel(t, y, h, plaque) {   // a long artery cut open lengthwise, with growing plaque
  rr2(0, y - h / 2, W, h, 0, '#c95a7c'); rr2(0, y - h / 2 + 26, W, h - 52, 0, '#7a1f33'); reg('hero', 'artery', 0, y - h / 2, W, y + h / 2);
  if (plaque > 0) { ctx.fillStyle = '#ffd36b'; ctx.beginPath(); ctx.moveTo(500, y - h / 2 + 26); ctx.quadraticCurveTo(960, y - h / 2 + 26 + plaque * h * 0.55, 1420, y - h / 2 + 26); ctx.fill(); for (let i = 0; i < 8; i++) circ(700 + i * 70, y - h / 2 + 40 + Math.sin(i) * 10 * plaque, 10 * plaque, '#f2a65a'); }
  for (let i = 0; i < 12; i++) { const x = ((i * 173 + t * 220) % (W + 200)) - 100; rbcDisc(x, y + h * 0.12 + Math.sin(i + t) * h * 0.12, h * 0.1, 0.7, i); }
}
Object.assign(ICONS, {
  lpaI(t) { particle(t, -20, -10, 52, { tail: 1 }); },
  ldlI(t) { particle(t, 0, 0, 56); },
  dnaL(t) { ICONS.dna(t); font(18, 700); ctx.fillStyle = GOLD; ctx.textAlign = 'center'; ctx.fillText('LPA', 0, 84); },
  tube(t, o) { rr2(-24, -80, 48, 150, 20, 'rgba(220,240,255,0.5)'); rr2(-20, -10, 40, 76, 16, '#c33244'); rr2(-28, -94, 56, 24, 8, o.cap || '#ffd36b'); rr2(-34, -50, 68, 30, 6, '#f3f7fb'); font(16, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.txt || 'Lp(a)', 0, -34); },
  syringe(t) { ctx.save(); ctx.rotate(-0.6 + Math.sin(t * 1.4) * 0.06); rr2(-80, -16, 120, 32, 10, 'rgba(220,240,255,0.7)'); rr2(-70, -12, 70 + Math.sin(t * 2) * 20, 24, 8, '#8fd8e6'); rr2(-110, -8, 34, 16, 6, '#9aa6c4'); rr2(-118, -24, 10, 48, 5, '#9aa6c4'); rr2(40, -3, 60, 6, 3, '#c9d6ec'); ctx.restore(); },
  pill2(t) { ctx.save(); ctx.rotate(-0.5 + Math.sin(t * 2) * 0.2); rr2(-60, -24, 60, 48, 24, '#5b4fd6'); rr2(0, -24, 60, 48, 24, '#f3f7fb'); rr2(-46, -14, 34, 9, 4, 'rgba(255,255,255,0.45)'); ctx.restore(); },
  filter(t) { rr2(-70, -80, 140, 160, 18, '#e8eef6'); rr2(-50, -60, 100, 60, 10, '#102348'); const p = (t * 0.8) % 1; ctx.strokeStyle = '#7ff3a0'; ctx.lineWidth = 4; ctx.beginPath(); for (let x = -44; x <= 44; x += 4) ctx.lineTo(x, -30 + Math.sin(x * 0.2 + t * 6) * 10); ctx.stroke(); circ(-40, 40, 14, '#c33244'); circ(0, 40, 14, '#ffd36b'); circ(40, 40, 14, '#c33244'); circ(lerp(-40, 40, p), 40, 6, '#fff'); },
  hedgehog(t) { const b = Math.abs(Math.sin(t * 3)) * 3; ctx.save(); ctx.translate(0, -b); ctx.fillStyle = '#7a5a3a'; for (let i = 0; i < 14; i++) { const a = Math.PI + i / 13 * Math.PI; ctx.beginPath(); ctx.moveTo(Math.cos(a - 0.1) * 50, Math.sin(a - 0.1) * 40); ctx.lineTo(Math.cos(a) * 82, Math.sin(a) * 70); ctx.lineTo(Math.cos(a + 0.1) * 50, Math.sin(a + 0.1) * 40); ctx.fill(); }
    ctx.fillStyle = '#9a7a5a'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 46, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e9c7a0'; ctx.beginPath(); ctx.ellipse(56, 14, 34, 24, 0.3, 0, 6.283); ctx.fill(); circ(86, 20, 7, '#20232f'); circ(60, 4, 4.5 * (1 - blinkF(t)) + 0.5, '#20232f'); rr2(-40, 40, 14, 14, 6, '#e9c7a0'); rr2(24, 40, 14, 14, 6, '#e9c7a0'); ctx.restore(); },
  monkey(t) { circ(0, 0, 54, '#7a5a3a'); circ(-50, -4, 18, '#7a5a3a'); circ(50, -4, 18, '#7a5a3a'); ctx.fillStyle = '#e9b7a0'; ctx.beginPath(); ctx.ellipse(0, 12, 36, 32, 0, 0, 6.283); ctx.fill(); circ(-16, -18, 12, '#e9b7a0'); circ(16, -18, 12, '#e9b7a0'); const bl = 1 - blinkF(t + 0.5); circ(-16, -16, 5 * bl + 0.5, '#20232f'); circ(16, -16, 5 * bl + 0.5, '#20232f'); },
  familyT(t) { ctx.scale(0.72, 0.72); [[0, -60, '#ffd98a'], [-70, 20, '#8fd8e6'], [70, 20, '#e2457a'], [-100, 90, '#b48cff'], [-40, 90, '#ffd98a'], [40, 90, '#8fd8e6'], [100, 90, '#e2457a']].forEach(([x, y, c], i) => { if (i) { ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(i < 3 ? 0 : (i < 5 ? -70 : 70), i < 3 ? -60 : 20); ctx.stroke(); } const p = 1 + 0.1 * Math.max(0, Math.sin(t * 3 - i)); circ(x, y, 18 * p, c); }); },
  valve(t) { const o = 0.3 + 0.7 * Math.max(0, Math.sin(t * 3)); circ(0, 0, 70, '#c95a7c'); circ(0, 0, 56, '#7a1f33'); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * 2.094); ctx.fillStyle = '#f2b3c0'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 56 * (1 - o * 0.35), -0.95, 0.95); ctx.fill(); circ(30, 10, 8, '#ffe8a8'); ctx.restore(); } },
  plateG(t) { ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 10, 86, 30, 0, 0, 6.283); ctx.fill(); circ(-24, -2, 18, '#5aa96a'); circ(6, -8, 16, '#8cc764'); circ(30, -2, 14, '#ff6f5a'); circ(14, 8, 12, '#ffd36b'); },
});
Object.assign(IDLE, { lpaI: {}, ldlI: {}, dnaL: {}, tube: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.06), post: t => glint(t, 28, 80) }, syringe: {}, pill2: {}, filter: {}, hedgehog: {}, monkey: {}, familyT: {}, valve: {}, plateG: { pre: t => ctx.rotate(Math.sin(t * 1.3) * 0.05) } });

function sOpen(t) {
  worldBG(t, 'night');
  if (t < S('c3') - 0.1) { particle(t, 960, 480, 200 * spring(t - 0.4, 0.5, 9), { tail: t > W_('c2', 'little') }); reg('hero', 'particle', 700, 240, 1380, 760);
    tag('LIPOPROTEIN(a) · "LP LITTLE A"', 960, 120, t, W_('c2', 'lipoprotein'), S('c3') - 0.3, '#9b3352', 38); bigNumber(t, 1580, 860, W_('c2', 'five'), S('c3') - 0.3, '1 IN 5', 'HAVE HIGH LEVELS');
    if (t > W_('c2', 'slim') - 0.2) kidAt(t, 380, 980, 1.2, { look: [1, -0.2] }); return; }
  if (t < S('c4q') - 0.1) { placeIcon('syringe', [[600, 470]], 2.4, t, S('c3'), S('c4q') - 0.2, { hw: 110, hh: 80 }); label('NOVEMBER 7, 2026', 1300, 300, t, W_('c3', 'november'), S('c4q') - 0.3, GOLD, 34);
    tag('LEVELS CUT BY >3/4', 1300, 440, t, W_('c3', 'cut'), S('c4q') - 0.3, '#3f8f6a', 36); tag('HEART ATTACKS: NO CHANGE', 1300, 580, t, W_('c3', 'just'), S('c4q') - 0.3, '#e2457a', 36); return; }
  particle(t, 960, 480, 200, { tail: 1 }); reg('hero', 'particle', 700, 240, 1380, 760);
  if (t > S('c5b') - 0.1) { label('DISCOVERED IN 1963', 960, 860, t, W_('c5b', ['1963', 'nineteen']), S('b1') - 0.4, GOLD, 32); label('KÅRE BERG · NORWAY', 960, 960, t, W_('c5b', 'norwegian'), S('b1') - 0.4, WHITE, 28); }
}
function sTrucks(t) {
  worldBG(t, 'coral');
  if (t < S('b3') - 0.1) { for (let i = 0; i < 6; i++) particle(t + i, 260 + i * 280, 520 + Math.sin(t + i) * 40, 80); reg('hero', 'particles', 160, 420, 1760, 620);
    label('FAT DOESN\'T MIX WITH BLOOD', 960, 200, t, W_('b2', 'mix'), S('b3') - 0.3, WHITE, 32); tag('LIPOPROTEINS = DELIVERY TRUCKS', 960, 840, t, W_('b2', 'trucks') - 0.4, S('b3') - 0.3, '#9b3352', 38); return; }
  const pl = t < S('b4') ? 0.3 : 0.3 + clamp((t - S('b4')) / 4) * 0.7; vessel(t, 520, 420, pl);
  if (t < S('b4') - 0.1) { tag('LDL: "BAD CHOLESTEROL"', 960, 900, t, W_('b3', 'ldl'), S('b4') - 0.3, '#5b4fd6', 40); return; }
  if (t < S('b4b') - 0.1) { tag('PLAQUE NARROWS THE ARTERY', 960, 900, t, W_('b4', 'narrows'), S('b4b') - 0.3, '#9b3352', 38); label('A CRACK + A CLOT = HEART ATTACK OR STROKE', 960, 1010, t, W_('b4', 'clot'), S('b4b') - 0.3, GOLD, 28); return; }
  label('IMMUNE CELLS SWALLOW IT · LAYER BY LAYER', 960, 900, t, W_('b4b', 'immune'), S('l1') - 0.4, WHITE, 30); label('QUIETLY, OVER DECADES', 960, 1000, t, W_('b4b', 'quietly'), S('l1') - 0.4, GOLD, 30);
}
function sTail(t) {
  worldBG(t, 'indigo');
  if (t < S('l4') - 0.1) { particle(t, 640, 500, 220, { tail: t > W_('l2', 'extra') - 0.3 }); reg('hero', 'lp(a)', 400, 250, 1180, 900); tag('APOLIPOPROTEIN(a)', 1500, 260, t, W_('l2', 'apolipoprotein'), S('l3') - 0.3, '#e2457a', 36); label('A LONG, FLOPPY TAIL', 1500, 380, t, W_('l2', 'tail'), S('l3') - 0.3, WHITE, 30);
    if (t > S('l3') - 0.1) { label('STICKS IN ARTERY WALLS', 1560, 300, t, W_('l3', 'stick'), S('l4') - 0.3, GOLD, 28); label('CARRIES INFLAMMATORY MOLECULES', 1560, 400, t, W_('l3', 'inflammatory'), S('l4') - 0.3, WHITE, 26); label('MAY BLOCK CLOT-DISSOLVING', 1560, 500, t, W_('l3', 'dissolving'), S('l4') - 0.3, WHITE, 26); } return; }
  if (t < S('l4b') - 0.1) { tile3(t, [['heartE2', 'HEART ATTACKS', '#9b3352', W_('l4', 'heart')], ['brainmini', 'STROKES', '#5b4fd6', W_('l4', 'strokes')], ['valve', 'AORTIC STENOSIS', '#127b84', W_('l4', 'aortic')]], 500); label('A CAUSE, NOT JUST A MARKER', 960, 960, t, W_('l4', 'cause'), S('l4b') - 0.3, GOLD, 32); return; }
  if (t < S('m2') - 0.1) { [['person', 'humans'], ['monkey', 'apes'], ['hedgehog', 'hedgehogs'], ['mouse', 'mice']].forEach(([ic, w], i) => placeIcon(ic, [[300 + i * 440, 480]], 1.8, t, W_('l4b', w) - 0.3, S('m2') - 0.2, { hw: 90, hh: 80 })); stamp(0, 1720, 340, t, W_('l4b', 'mice') + 0.2);
    label('ONLY A FEW SPECIES CARRY IT', 960, 800, t, W_('l4b', 'animals'), S('m2') - 0.3, WHITE, 32); return; }
  if (t < S('m3') - 0.1) { placeIcon('dnaL', [[600, 470]], 2.8, t, S('m2'), S('m3') - 0.2, { hw: 44, hh: 80 }); tag('NATURE\'S EXPERIMENT', 1300, 380, t, W_('m2', 'natural'), S('m3') - 0.3, '#5b4fd6', 38); label('HIGH-LEVEL GENES → MORE HEART DISEASE', 1300, 520, t, W_('m2', 'more'), S('m3') - 0.3, WHITE, 26); label('MENDELIAN RANDOMIZATION', 1300, 640, t, W_('m2', 'mendelian'), S('m3') - 0.3, GOLD, 28); return; }
  placeIcon('valve', [[620, 480]], 3.0, t, S('m3'), S('g1') - 0.3, { hw: 72, hh: 72 }); label('THE VALVE STIFFENS WITH CALCIUM', 1300, 400, t, W_('m3', 'calcium'), S('g1') - 0.4, WHITE, 28); label('HIGH LITTLE A SPEEDS IT UP', 1300, 520, t, W_('m3', 'speed'), S('g1') - 0.4, GOLD, 30);
}
ICONS.heartE2 = function (t) { const b = 1 + 0.08 * Math.max(0, Math.sin(t * 7)); ctx.scale(b, b); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(0, 50); ctx.bezierCurveTo(-76, 0, -50, -60, 0, -26); ctx.bezierCurveTo(50, -60, 76, 0, 0, 50); ctx.fill(); rr2(-34, -30, 24, 10, 5, 'rgba(255,255,255,0.4)'); }; IDLE.heartE2 = {};
function sGenes(t) {
  worldBG(t, 'teal');
  if (t < S('g3') - 0.1) { placeIcon('dnaL', [[600, 470]], 2.8, t, S('g1') + 1.0, S('g3') - 0.2, { hw: 44, hh: 80 }); stamp(0, 820, 300, t, W_('g1', 'diet') + 0.3); bigNumber(t, 1320, 480, W_('g2', 'ninety'), S('g3') - 0.3, '~90%', 'OF THE DIFFERENCE IS INHERITED'); return; }
  if (t < S('g4') - 0.1) { tile3(t, [['plateG', 'DIET: BARELY', '#3f8f6a', W_('g3', 'diet'), { mark: 0 }], ['person', 'EXERCISE: BARELY', '#5b4fd6', W_('g3', 'exercise'), { mark: 0, col: '#ffd98a' }], ['pill2', 'STATINS: NO', '#9b3352', W_('g3', 'statins'), { mark: 0 }]], 480);
    label(t > S('g3b') - 0.1 ? 'STATINS STILL MATTER FOR LDL' : 'LEVELS CAN DIFFER 1,000-FOLD', 960, 960, t, t > S('g3b') - 0.1 ? S('g3b') : W_('g3', 'thousand'), S('g4') - 0.3, GOLD, 30); return; }
  if (t < S('g6') - 0.1) { placeIcon('familyT', [[960, 430]], 3.0, t, S('g4'), S('g6') - 0.2, { hw: 90, hh: 72 }); label('HIGHER ON AVERAGE IN AFRICAN ANCESTRY', 960, 860, t, W_('g4', 'african'), S('g6') - 0.3, WHITE, 30); return; }
  placeIcon('tube', [[620, 470]], 2.6, t, S('g6'), S('t1') - 0.3, { hw: 34, hh: 98 }); tag('SET FROM EARLY CHILDHOOD', 1300, 380, t, W_('g6', 'childhood'), S('t1') - 0.4, '#0b4f5c', 38); label('ONE TEST FOR LIFE', 1300, 500, t, W_('g6', 'one'), S('t1') - 0.4, GOLD, 34);
  if (t > S('g6b') - 0.1) label('TEST KIDS IF A PARENT IS HIGH (SOME EXPERTS)', 1300, 620, t, W_('g6b', 'children'), S('t1') - 0.4, WHITE, 24);
}
function sTest(t) {
  worldBG(t, 'night');
  if (t < S('t3') - 0.1) { placeIcon('doc2', [[560, 470]], 2.6, t, S('t1') + 1.0, S('t3') - 0.2, { hw: 52, hh: 66 }); stamp(0, 720, 330, t, W_('t2', 'doesn')); label('NOT ON A STANDARD CHOLESTEROL TEST', 1300, 380, t, W_('t2', 'standard'), S('t3') - 0.3, WHITE, 28); tag('MUST BE ORDERED SEPARATELY', 1300, 520, t, W_('t2', 'separately'), S('t3') - 0.3, '#9b3352', 34);
    if (t > S('t2b') - 0.1) label('YOUR "LDL" NUMBER INCLUDES IT', 1300, 660, t, W_('t2b', 'includes'), S('t3') - 0.3, GOLD, 28); return; }
  if (t < S('t5q') - 0.1) { placeIcon('tube', [[560, 470]], 2.6, t, S('t3'), S('t5q') - 0.2, { hw: 34, hh: 98 });
    if (t < S('t4') - 0.1) { label('EUROPE + CANADA: TEST EVERY ADULT ONCE', 1300, 380, t, W_('t3', 'european'), S('t4') - 0.3, WHITE, 26); label('US NATIONAL LIPID ASSOCIATION · 2024', 1300, 500, t, W_('t3', 'national'), S('t4') - 0.3, GOLD, 26); return; }
    bigNumber(t, 1300, 420, W_('t4', 'fifty'), S('t5q') - 0.3, '≥ 50 mg/dL', '≈ 125 nmol/L · A RED FLAG'); if (t > S('t4b') - 0.1) label('CHECK THE UNIT · NO SIMPLE CONVERSION', 1300, 640, t, W_('t4b', 'units'), S('t5q') - 0.3, '#ff9fb4', 26); return; }
  if (t < S('t6') - 0.1) { placeIcon('tube', [[960, 450]], 2.6, t, S('t5q'), S('t6') - 0.2, { hw: 34, hh: 98, txt: 'HIGH' }); label('WHAT IF MINE IS HIGH?', 960, 820, t, S('t5q') + 0.2, S('t6') - 0.3, GOLD, 38); return; }
  if (t < S('w1q') - 0.1) { tile3(t, [['ldlI', 'LOWER LDL HARDER', '#5b4fd6', W_('t6', 'ldl')], ['bpcuff2', 'BLOOD PRESSURE', '#9b3352', W_('t6', 'blood')], ['familyT', 'TEST THE FAMILY', '#127b84', t > S('t6b') ? W_('t6b', 'families') : 1e9]], 500); return; }
  kidAt(t, 560, 940, 1.6, { look: [1, -0.2] }); label('HEART ATTACK YOUNG, NORMAL CHOLESTEROL', 1300, 340, t, W_('w2', 'heart'), S('h1') - 0.4, WHITE, 26); label('EARLY HEART DISEASE IN THE FAMILY', 1300, 440, t, W_('w2', 'parents'), S('h1') - 0.4, WHITE, 26); label('GETTING WORSE DESPITE TREATMENT', 1300, 540, t, W_('w2', 'worse'), S('h1') - 0.4, WHITE, 26);
  tag('THE MISSING PIECE', 1300, 700, t, W_('w3', 'missing'), S('h1') - 0.4, '#9b3352', 40);
}
ICONS.bpcuff2 = function (t) { rr2(-70, -40, 90, 80, 20, '#5b6585'); const p = 0.6 + 0.4 * Math.sin(t * 3); ctx.save(); ctx.translate(60, 0); circ(0, 0, 44, '#f3f7fb'); circ(0, 0, 36, '#102348'); ctx.save(); ctx.rotate(-1.8 + p * 2.4); rr2(-3, -30, 6, 32, 3, '#ff8f4a'); ctx.restore(); ctx.restore(); circ(-15, 70, 16, '#e2457a'); }; IDLE.bpcuff2 = {};
function sTrial(t) {
  worldBG(t, 'grey');
  if (t < S('h3') - 0.1) { placeIcon('syringe', [[560, 470]], 2.4, t, S('h1') + 1.0, S('h3') - 0.2, { hw: 110, hh: 80 }); tag('Lp(a)HORIZON', 1300, 300, t, W_('h2', 'horizon') - 0.6, S('h3') - 0.3, '#5b4fd6', 40); label('8,350 PATIENTS · 42 COUNTRIES', 1300, 420, t, W_('h2', 'eight'), S('h3') - 0.3, WHITE, 28); label('PELACARSEN VS PLACEBO · ~5 YEARS', 1300, 520, t, W_('h2', 'pelacarsen'), S('h3') - 0.3, GOLD, 26); return; }
  if (t < S('h4') - 0.1) { if (t < S('h3b') - 0.1) { meter(360, 300, 1200, 1, t, W_('h3', 'cut') - 0.3, S('h3b') - 0.3, '#ffd98a', '#e2457a', 'Lp(a) ON PLACEBO'); meter(360, 450, 1200, 0.223, t, W_('h3', 'seventy'), S('h3b') - 0.3, '#9be3a5', '#3fae6a', 'ON THE DRUG: −78%');
      meter(360, 650, 1200, 0.123 / 0.15, t, W_('h3', 'twelve'), S('h3b') - 0.3, '#ff9fb4', '#e2457a', 'HEART EVENTS · DRUG 12.3%'); meter(360, 800, 1200, 0.121 / 0.15, t, W_('h3', 'twelve', 1), S('h3b') - 0.3, '#ff9fb4', '#e2457a', 'PLACEBO 12.1%'); tag('NO BENEFIT', 960, 960, t, W_('h3', 'benefit'), S('h3b') - 0.3, '#e2457a', 40); return; }
    label('FLU-LIKE REACTIONS: ~32% VS 6%', 960, 420, t, W_('h3b', 'flu'), S('h4') - 0.3, WHITE, 32); label('~1 IN 5 STOPPED THE DRUG', 960, 540, t, W_('h3b', 'five'), S('h4') - 0.3, GOLD, 32); return; }
  if (t < S('h5q') - 0.1) { placeIcon('syringe', [[960, 470]], 2.4, t, S('h4'), S('h5q') - 0.2, { hw: 110, hh: 80 }); stamp(0, 1200, 330, t, W_('h4', 'stopped')); label('PROGRAMME STOPPED', 960, 780, t, W_('h4', 'stopped'), S('h5q') - 0.3, WHITE, 34); return; }
  if (t < S('h6') - 0.1) { placeIcon('lpaI', [[960, 450]], 3.0, t, S('h5q'), S('h6') - 0.2, { hw: 76, hh: 70 }); label('SO DOES LITTLE A NOT MATTER?', 960, 820, t, S('h5q') + 0.2, S('h6') - 0.3, GOLD, 36); return; }
  tile3(t, [['heartE2', 'TOO LATE TO REVERSE?', '#9b3352', W_('h6', 'late')], ['ldlI', 'OTHER RISKS ALREADY LOW', '#5b4fd6', W_('h6', 'controlled')], ['clock3', 'TOO SHORT A TRIAL?', '#127b84', W_('h6', 'short')]], 480);
  if (t > S('h6b') - 0.1) label('VERY HIGH LEVELS MIGHT STILL BENEFIT', 960, 960, t, W_('h6b', 'highest'), S('n1') - 0.4, GOLD, 30);
}
function sNext(t) {
  worldBG(t, 'teal');
  if (t < S('n3b') - 0.1) { tile3(t, [['syringe', 'OLPASIRAN', '#5b4fd6', W_('n2', 'olpasiran')], ['syringe', 'LEPODISIRAN', '#9b3352', W_('n2', 'lepodisiran')], ['pill2', 'MUVALAPLIN (PILL)', '#127b84', W_('n3', 'pill')]], 480);
    label('SWITCH OFF THE GENE\'S MESSAGE', 960, 940, t, W_('n2', 'switches'), S('n3') - 0.3, GOLD, 30); label('STOPS THE TAIL FROM ATTACHING', 960, 940, t, W_('n3', 'attaching'), S('n3b') - 0.3, GOLD, 30); return; }
  if (t < S('n4') - 0.1) { if (t < S('n3c') - 0.1) { placeIcon('syringe', [[560, 470]], 2.2, t, S('n3b'), S('n3c') - 0.2, { hw: 110, hh: 80 }); label('PCSK9 DRUGS: ~1/4 LOWER', 1300, 380, t, W_('n3b', 'pcsk9', 0), S('n3c') - 0.3, WHITE, 30); label('NIACIN: LOWER, BUT NO FEWER HEART ATTACKS', 1300, 500, t, W_('n3b', 'niacin'), S('n3c') - 0.3, GOLD, 24); return; }
    placeIcon('filter', [[620, 470]], 2.4, t, S('n3c'), S('n4') - 0.2, { hw: 72, hh: 82 }); tag('APHERESIS', 1300, 380, t, W_('n3c', 'apheresis'), S('n4') - 0.3, '#0b4f5c', 40); label('FILTERS THE BLOOD, EVERY 1–2 WEEKS', 1300, 500, t, W_('n3c', 'week'), S('n4') - 0.3, WHITE, 28); return; }
  placeIcon('clock3', [[620, 470]], 2.6, t, S('n4'), S('o1') - 0.3, { hw: 58, hh: 58 }); tag('OUTCOME TRIALS STILL RUNNING', 1300, 420, t, W_('n4', 'trials'), S('o1') - 0.4, '#5b4fd6', 36); label('DOES LOWERING IT SAVE LIVES?', 1300, 560, t, W_('n4', 'saves'), S('o1') - 0.4, GOLD, 30);
}
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { placeIcon('tube', [[560, 470]], 2.8, t, S('o1') + 0.3, S('o3') - 0.2, { hw: 34, hh: 98 }); label('ONCE IN YOUR LIFE', 1300, 380, t, W_('o2', 'once'), S('o3') - 0.3, GOLD, 36); label('ESPECIALLY WITH A FAMILY HISTORY', 1300, 500, t, W_('o2', 'family'), S('o3') - 0.3, WHITE, 28); label('GUARD EVERYTHING ELSE', 1300, 620, t, W_('o2', 'guard'), S('o3') - 0.3, WHITE, 28); return; }
  particle(t, 420, 520, 190, { tail: 1 }); reg('hero', 'particle', 200, 300, 660, 760); outroTitle(t, 'THE HIDDEN CHOLESTEROL', '1 IN 5 INHERIT', 1300, 54, 80);
}
const CHAPTERS = [['b1', "Cholesterol's delivery trucks", 'coral', 'ldlI'], ['l1', 'The sticky tail', 'indigo', 'lpaI'], ['g1', "It's in your genes", 'teal', 'dnaL'], ['t1', 'The missing test', 'night', 'tube'], ['h1', 'The trial that failed', 'grey', 'syringe'], ['n1', 'What comes next', 'teal', 'pill2']];
function SECTIONS() { return makeSections(CHAPTERS, { b1: [sTrucks, 'b2'], l1: [sTail, 'l2'], g1: [sGenes, 'g2'], t1: [sTest, 't2'], h1: [sTrial, 'h2'], n1: [sNext, 'n2'] }, sOpen, sOutro); }
