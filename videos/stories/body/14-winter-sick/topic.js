// "Why we really get sick in winter" — topic file (engine + common.js cast system + icons2.js)
Object.assign(ICONS, {
  guineaPig(t, o) { const b = Math.abs(Math.sin(t * 3)) * 3; ctx.save(); ctx.translate(0, -b); ell(0, 10, 66, 40, o.col || '#c98a52'); ell(-20, 0, 30, 24, '#f3f7fb'); ell(46, 0, 30, 28, o.col || '#c98a52'); circ(34, -26, 10, '#e9a882'); circ(60, -4, 4.5 * (1 - blinkF(t)) + 0.5, '#20232f'); circ(74, 6, 5, '#e2457a'); rr2(-40, 40, 14, 12, 6, '#e9a882'); rr2(24, 40, 14, 12, 6, '#e9a882');
    if (o.sick) { circ(56, 18, 4, 'rgba(160,220,255,0.9)'); puff(t, 80, 0, 2, -1, 'rgba(190,240,170,0.6)', 7); } ctx.restore(); },
  cage(t) { rr2(-80, -60, 160, 120, 10, 'rgba(255,255,255,0.08)'); ctx.strokeStyle = '#c9d6ec'; ctx.lineWidth = 4; for (let i = 0; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(-80 + i * 20, -60); ctx.lineTo(-80 + i * 20, 60); ctx.stroke(); } rr2(-86, 56, 172, 10, 5, '#9fb0d8'); rr2(-86, -66, 172, 10, 5, '#9fb0d8'); },
  fish(t) { const w = Math.sin(t * 6) * 0.25; ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.08); ell(0, 0, 56, 30, '#ff8f4a'); ctx.save(); ctx.translate(-50, 0); ctx.rotate(w); poly([[0, 0], [-34, -26], [-34, 26]], '#ff6f3a'); ctx.restore(); ell(10, -8, 22, 10, 'rgba(255,255,255,0.3)'); circ(32, -6, 7, '#fff'); circ(34, -6, 3.5, '#20232f'); poly([[0, -28], [20, -44], [24, -26]], '#ff6f3a'); ctx.restore(); },
  lure(t) { ctx.save(); ctx.rotate(Math.sin(t * 3) * 0.2); ctx.strokeStyle = '#dfe7f2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -80); ctx.lineTo(0, -20); ctx.stroke(); ICONS.vesicle(t); ctx.strokeStyle = '#c9d6ec'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 40, 14, 0, Math.PI); ctx.stroke(); ctx.restore(); },
  purifier(t) { rr2(-46, -70, 92, 140, 18, '#f3f7fb'); for (let i = 0; i < 6; i++) rr2(-32, -54 + i * 14, 64, 6, 3, '#c9d6ec'); circ(0, 40, 16, '#8fd8e6'); ctx.save(); ctx.translate(0, 40); ctx.rotate(t * 8); for (let i = 0; i < 3; i++) { ctx.rotate(2.094); ell(0, -8, 4, 9, '#5aa9e6'); } ctx.restore(); for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; ctx.strokeStyle = `rgba(255,255,255,${0.7 * (1 - p)})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -70, 20 + p * 40, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke(); } },
  doorknob(t) { rr2(-60, -80, 120, 160, 6, '#9a5a3a'); rr2(-50, -70, 100, 60, 4, '#a8684a'); rr2(-50, 10, 100, 60, 4, '#a8684a'); circ(36, 0, 14, '#ffd36b'); circ(32, -4, 5, 'rgba(255,255,255,0.6)'); },
  bleach(t) { rr2(-36, -40, 72, 100, 16, '#f3f7fb'); rr2(-14, -66, 28, 30, 6, '#5aa9e6'); rr2(-26, -10, 52, 40, 6, '#8fd8e6'); font(14, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.fillText('BLEACH', 0, 14); for (let i = 0; i < 4; i++) { const p = (t * 1.2 + i / 4) % 1; circ(30 + p * 40, -60 - p * 20, 5 * (1 - p), 'rgba(200,240,255,0.8)'); } },
  feetBowl(t, o) { ell(0, 30, 80, 30, o.cold ? '#8fd8e6' : '#c9d6ec'); ell(0, 22, 70, 20, o.cold ? '#5aa9e6' : '#e8eef6'); for (const s of [-1, 1]) { rr2(s * 26 - 14, -70, 28, 90, 12, SK[0]); ell(s * 26 + 6, 20, 22, 10, SK[0]); }
    if (o.cold) for (let i = 0; i < 4; i++) { const p = (t * 0.6 + i / 4) % 1; ctx.save(); ctx.translate(-60 + i * 40, -10 - p * 40); ctx.scale(0.18, 0.18); ctx.globalAlpha *= 1 - p; ICONS.snow(t); ctx.restore(); } },
  cactus(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.2) * 0.03); rr2(-16, -70, 32, 130, 16, '#3fae6a'); rr2(-50, -30, 20, 50, 10, '#3fae6a'); rr2(-50, 4, 40, 16, 8, '#3fae6a'); rr2(30, -50, 20, 50, 10, '#3fae6a'); rr2(14, -16, 36, 16, 8, '#3fae6a'); ctx.restore(); ell(0, 62, 70, 10, '#e8b46a'); },
  bus(t) { rr2(-90, -40, 180, 76, 14, '#ffc857'); for (let i = 0; i < 5; i++) rr2(-78 + i * 32, -30, 24, 24, 4, '#8fd8e6'); for (let i = 0; i < 4; i++) circ(-66 + i * 32, -18, 6, SK[i % 4]); wheel(t, -54, 38, 16); wheel(t, 54, 38, 16); },
  rna(t) { ctx.strokeStyle = '#ff8fb8'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const x = -70 + i * 4.7; ctx.lineTo(x, Math.sin(i * 0.6 + t * 3) * 16); } ctx.stroke(); for (let i = 0; i < 10; i++) { const x = -66 + i * 14; rr2(x, Math.sin(i * 1.3 + t * 3) * 16 - 2, 5, 18, 2, ['#ffd98a', '#8fd8e6', '#5fd38a', '#b48cff'][i % 4]); } },
  stomach(t) { const b = 1 + 0.04 * Math.sin(t * 2.4); ctx.save(); ctx.scale(b, b); ctx.fillStyle = '#f29db0'; ctx.beginPath(); ctx.moveTo(-20, -70); ctx.quadraticCurveTo(-20, -30, -46, 0); ctx.quadraticCurveTo(-60, 60, 10, 54); ctx.quadraticCurveTo(70, 46, 50, -10); ctx.quadraticCurveTo(30, -36, 4, -40); ctx.lineTo(4, -70); ctx.fill();
    ctx.strokeStyle = '#d6577a'; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(4, 10, 20 + i * 12, 0.5, 2.6); ctx.stroke(); } ctx.restore(); },
});
Object.assign(IDLE, { guineaPig: {}, cage: {}, fish: {}, lure: {}, purifier: {}, doorknob: { pre: t => ctx.rotate(Math.sin(t * 1.2) * 0.03) }, bleach: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.05) }, feetBowl: {}, cactus: {}, bus: { pre: t => ctx.translate(Math.sin(t * 3) * 3, 0) }, rna: {}, stomach: {} });
// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [A('snow', 600, 520, 2.2, 'c1:cold'), A('adult', 1000, 560, 2.2, 'c1:give', { o: { mood: 'sick' } }), A('thermoC', 1350, 520, 1.6, 'c1:cold#1', { o: { cold: 1, level: 0.2 } })] },
    { at: 'c2', cast: [A('rhinoV', 330, 400, 1.5, 'c2:virus'), A('fluV', 330, 700, 1.5, 'c2:flu'), A('wind', 760, 520, 1.7, 'c2:air'), A('cross', 760, 760, 0.9, 'c2:nothing'), A('nose', 1350, 520, 2.6, 'c2:nose', { o: tt => ({ cold: tt > T('c2:sneaky') }) })],
      lab: [['EVERY COLD STARTS WITH A VIRUS', 'c2:starts', 600, 965, GOLD, 30]] },
    { at: 'c3', cast: [A('globeP', 300, 500, 1.4, 'c3:boston'), A('wind', 640, 480, 1.5, 'c3:chills', { mv: [['c3:lining', 860, 480]] }), A('nose', 1100, 520, 2.6, 'c3:nose', { o: { cold: 1 } }), A('vesicle', 1500, 400, 1.2, 'c3:decoys', { erase: 'c3:fewer+1.0' }), A('vesicle', 1620, 600, 1.2, 'c3:bubbles'), A('rhinoV', 1700, 330, 1.0, 'c3:viruses', { mv: [['c3:trap', 1560, 420]] })],
      num: [['c3:42', 1100, 210, '−42%', 'DECOYS FROM A CHILLED NOSE']] },
    QB('c4q', [A('nose', 760, 540, 2.4, 'c4q+0.2', { o: { cold: 1 } }), A('shieldC', 1180, 520, 1.5, 'c4q:disarms', { o: { crack: 1 } })]),
    { at: 'c5', cast: [A('nose', 260, 420, 1.1, 'c5:nose', { o: { cold: 1 } }), A('rhinoV', 520, 690, 1.2, 'c5:viruses'), A('drop', 800, 420, 1.1, 'c5:dry', { grey: 'c5:dry+0.3' }), A('cilia', 1060, 690, 1.2, 'c5:mucus', { o: { dry: 1 } }), A('crowd', 1340, 420, 1.3, 'c5:crowded'), A('sunC', 1640, 690, 1.2, 'c5:sunshine', { grey: 'c5:sunshine+0.5' })],
      num: [['c5:six', 960, 200, '6', 'THINGS STACK UP AT ONCE']] },
  ], 'd1'));
}
// ---------- 1 the decoy swarm ----------
function sDecoy(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('d1', [A('nose', 760, 540, 2.4, 'd1+0.2'), A('vesicle', 1180, 480, 1.4, 'd1:decoys')]),
    { at: 'd2', cast: [A('rhinoV', 380, 300, 1.3, 'd2:virus', { mv: [['d2:lining', 700, 470, 60]] }), A('cilia', 760, 620, 2.4, 'd2:lining', { pulse: ['d2:notice'] }), A('vesicle', 760, 560, 0.9, 'd2:release', { mv: [['d2:pour', 1250, 360, 120]] }), A('vesicle', 760, 560, 0.9, 'd2:swarm', { mv: [['d2:pour+0.3', 1400, 520, 100]] }), A('vesicle', 760, 560, 0.9, 'd2:microscopic', { mv: [['d2:mucus', 1300, 680, 80]] })],
      fx: [['stream', 1, [1500, 450], 'd2:swarm', 'd2>', { ic: 'vesicle', s: 0.4, n: 12, arc: 80 }]], tag: [['EXTRACELLULAR VESICLES', 'd2:extracellular', 960, 965, '#9b3352', 34]] },
    { at: 'd3', cast: [A('vesicle', 760, 520, 2.4, 'd3:bubble'), A('rhinoV', 1450, 400, 1.6, 'd3:virus', { mv: [['d3:latches', 960, 470, 60]], hit: ['d3:latches'] }), A('fish', 1500, 760, 1.4, 'd3:fish', { mv: [['d3:lure', 1250, 760]] }), A('lure', 1050, 760, 1.0, 'd3:fake'), A('cilia', 330, 520, 1.6, 'd3:cells')],
      lab: [['SAME DOCKING HOOKS AS YOUR CELLS', 'd3:docking', 760, 120, GOLD, 30], ['A FAKE LURE', 'd3:lure', 1300, 965, WHITE, 30]] },
    { at: 'd3b', cast: [A('vesicle', 520, 520, 2.4, 'd3b:bubbles'), A('rna', 960, 520, 1.6, 'd3b:micro', { mv: [['d3b:block', 1240, 520]] }), A('rhinoV', 1500, 520, 2.0, 'd3b:virus', { hit: ['d3b:block'], morph: ['d3b:copying', 'cross'] })],
      tag: [['MICRO-RNA', 'd3b:micro', 960, 965, '#5b4fd6', 36]] },
    QB('d4q', [A('wind', 760, 540, 2.0, 'd4q+0.2'), A('vesicle', 1180, 520, 1.6, 'd4q:cold', { shake: ['d4q:breaks', 0.6] })]),
    { at: 'd5', cast: [A('house', 330, 520, 1.8, 'd5:warm'), A('adult', 760, 560, 2.0, 'd5:volunteers', { mv: [['d5:air', 1050, 560]] }), A('thermoC', 1400, 400, 1.3, 'd5:40', { o: { cold: 1, level: 0.25 } }), A('nose', 1650, 600, 1.6, 'd5:noses', { o: tt => ({ cold: tt > T('d5:dropped') }) })],
      num: [['d5:nine', 1100, 220, '−9°F', '(−5°C) INSIDE THE NOSE']], lab: [['40°F FOR 15 MINUTES', 'd5:minutes', 1400, 800, WHITE, 28]] },
    { at: 'd6', cast: [A('cilia', 400, 520, 2.2, 'd6:cells', { o: { dry: 0 } }), A('snow', 400, 260, 1.0, 'd6:chilled'), A('vesicle', 900, 380, 1.2, 'd6:bubbles', { erase: 'd6:fewer' }), A('vesicle', 1050, 600, 1.2, 'd6:released'), A('rhinoV', 1600, 520, 1.6, 'd6:viruses', { mv: [['d6:grabbed', 1250, 600]] })],
      num: [['d6:42', 1450, 230, '−42%', 'BUBBLES RELEASED']], lab: [['…AND THEY GRAB VIRUSES LESS WELL', 'd6:grabbed', 1100, 965, WHITE, 28]] },
    { at: 'd7', cast: [A('rhinoV', 330, 420, 1.4, 'd7:cold'), A('rhinoV', 560, 690, 1.4, 'd7:viruses', { o: {} }), A('fluV', 800, 420, 1.4, 'd7:coronavirus'), A('cilia', 1200, 520, 1.8, 'd7:tissue'), A('elder', 1620, 560, 1.8, 'd7:grandmothers', { o: { col: '#b48cff' } })],
      lab: [['LAB TISSUE, NOT PEOPLE', 'd7:lab', 1200, 800, GOLD, 30]] },
  ], 'r1'));
}
// ---------- 2 a virus that likes it cool ----------
function sCool(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('r1', [A('rhinoV', 760, 540, 2.2, 'r1+0.2'), A('snow', 1180, 520, 1.6, 'r1:cold')]),
    { at: 'r2', cast: [A('rhinoV', 330, 520, 2.0, 'r2:rhinavirus'), A('nose', 760, 520, 2.0, 'r2:nose'), A('thermoC', 1150, 500, 1.6, 'r2:91', { o: { level: 0.45, cold: 1 } }), A('adult', 1520, 560, 2.0, 'r2:body'), A('thermoC', 1760, 400, 1.0, 'r2:98', { o: { level: 0.7 } })],
      lab: [['"NOSE VIRUS"', 'r2:nose', 330, 800, GOLD, 30], ['NOSE ~91°F · BODY 98.6°F', 'r2:91', 1300, 965, WHITE, 30]] },
    { at: 'r3', cast: [A('cilia', 420, 520, 2.0, 'r3:airway'), A('thermoC', 820, 500, 1.4, 'r3:body', { o: { level: 0.7 } }), A('alarmC', 1200, 500, 1.8, 'r3:alarm', { shake: ['r3:loud', 1.2] }), A('rhinoV', 1600, 520, 1.6, 'r3:virus', { push: [['r3:held', 120, 0]] })],
      tag: [['INTERFERON', 'r3:interferon', 1200, 965, '#127b84', 36]] },
    { at: 'r4', cast: [A('thermoC', 330, 500, 1.4, 'r4:nose', { o: { level: 0.4, cold: 1 } }), A('alarmC', 720, 500, 1.4, 'r4:quieter', { grey: 'r4:quieter' }), A('rhinoV', 1150, 520, 1.6, 'r4:copied'), A('rhinoV', 1150, 520, 1.1, 'r4:more', { mv: [['r4:more+0.8', 1450, 360, 60]] }), A('rhinoV', 1150, 520, 1.1, 'r4:more+0.3', { mv: [['r4:more+1.1', 1500, 700, 60]] }), A('wind', 1700, 520, 1.2, 'r4:winter')],
      lab: [['A COOLER NOSE TILTS THE FIGHT', 'r4:tilt', 960, 965, GOLD, 30]] },
    QB('r5q', [A('cilia', 760, 540, 2.0, 'r5q+0.2'), A('adult', 1180, 560, 1.6, 'r5q:human')]),
    { at: 'r6', cast: [A('mouse', 420, 560, 2.4, 'r6:mouse'), A('question', 860, 500, 1.2, 'r6:clue'), A('rhinoV', 1250, 400, 1.3, 'r6:strains'), A('nose', 1250, 690, 1.3, 'r6:nose'), A('lungs', 1620, 520, 1.6, 'r6:lung', { grey: 'r6:lung+0.5' })],
      lab: [['MOUSE CELLS: A CLUE, NOT PROOF', 'r6:clue', 640, 965, GOLD, 30]] },
  ], 'h1'));
}
// ---------- 3 cold, dry air ----------
function sDry(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('h1', [A('fluV', 760, 540, 2.2, 'h1+0.2', { pulse: ['h1:explode'] }), A('snow', 1180, 520, 1.6, 'h1:winter')]),
    { at: 'h2', cast: [A('calDay', 330, 500, 1.6, 'h2:october', { o: { m: 'STARTS', d: 'OCT' } }), A('chart', 900, 520, 2.4, 'h2:peaks', { o: tt => ({ v: [0.2, 0.4, 0.7, 0.85, 0.95, 0.6].map(v => v * clamp((tt - T('h2:climbing')) / 2)), hi: 4 }) }), A('calDay', 1550, 500, 1.6, 'h2:february', { o: { m: 'PEAK', d: 'FEB' }, pulse: ['h2:february#1'] })],
      lab: [['PEAKS DECEMBER–FEBRUARY', 'h2:december', 900, 965, GOLD, 30]] },
    { at: 'h3', cast: [A('guineaPig', 420, 560, 2.0, 'h3:guinea'), A('calDay', 860, 500, 1.6, 'h3:1918', { o: { m: 'FLU', d: '1918', col: '#5b6585' } }), A('globeP', 1250, 500, 1.6, 'h3:new'), A('fluV', 1600, 500, 1.4, 'h3:infecting', { mv: [['h3:purpose', 1500, 560]] })],
      lab: [['NEW YORK · 2007', 'h3:2007', 1250, 800, WHITE, 28]] },
    { at: 'h4', cast: [A('cage', 520, 520, 2.0, 'h4:cages'), A('guineaPig', 520, 540, 1.35, 'h4:sick', { o: { sick: 1 } }), A('cage', 1350, 520, 2.0, 'h4:healthy'), A('guineaPig', 1350, 540, 1.35, 'h4:healthy', { o: tt => ({ sick: tt > T('h4:jumped') + 0.8 && tt < T('h4:80') }), pulse: ['h4:jumped+0.8'] }), A('drop', 930, 330, 1.0, 'h4:humidity', { o: {} })],
      fx: [['stream', 1, 3, 'h4:jumped', 'h4:80', { col: '#ff8f4a', n: 8 }]], lab: [['20–35% HUMIDITY: FLU JUMPS', 'h4:20', 700, 965, GOLD, 28], ['80%: NO SPREAD', 'h4:80', 1450, 965, '#8fd8e6', 28]] },
    { at: 'h5', cast: [A('thermoC', 330, 500, 1.6, 'h5:41', { o: { level: 0.2, cold: 1 } }), A('guineaPig', 760, 560, 1.6, 'h5:cold', { o: { sick: 1 } }), A('hglass', 1150, 500, 1.6, 'h5:40'), A('thermoC', 1520, 500, 1.6, 'h5:86', { o: { level: 0.85 } }), A('cross', 1750, 360, 0.8, 'h5:no')],
      lab: [['41°F: MORE SPREAD · ~40 H LONGER SHEDDING', 'h5:41', 760, 965, GOLD, 26], ['86°F: NONE', 'h5:86', 1520, 800, WHITE, 28]] },
    QB('h6q', [A('drop', 760, 540, 2.0, 'h6q+0.2', { grey: 'h6q:dry' }), A('fluV', 1180, 520, 1.6, 'h6q:help')]),
    { at: 'h7', cast: [A('adult', 330, 560, 2.0, 'h7:cough', { o: { mood: 'sick' }, shake: ['h7:cough', 0.6] }), A('droplets', 760, 400, 1.5, 'h7:humid', { mv: [['h7:floor', 760, 720]] }), A('droplets', 1250, 400, 1.0, 'h7:dry', { mv: [['h7:float', 1550, 330, 60]] }), A('fluV', 1250, 400, 0.8, 'h7:survives', { follow: { i: 2, dx: 60, dy: 30 } })],
      lab: [['HUMID: DROPS FALL', 'h7:humid', 760, 965, '#8fd8e6', 28], ['DRY: SPECKS FLOAT', 'h7:dry', 1400, 965, GOLD, 28]] },
    { at: 'h8', cast: [A('doctor', 330, 560, 1.8, 'h8:scientists'), A('drop', 760, 500, 1.6, 'h8:absolute'), A('chart', 1250, 520, 2.0, 'h8:explained', { o: { v: [0.9, 0.1], hi: 0 } })],
      tag: [['ABSOLUTE HUMIDITY', 'h8:absolute', 760, 965, '#5b4fd6', 36]], num: [['h8:90', 1600, 280, '~90%', 'OF FLU SURVIVAL EXPLAINED']] },
    { at: 'h9', cast: [A('snow', 330, 500, 1.6, 'h9:winter'), A('house', 760, 520, 1.8, 'h9:heat'), A('drop', 1150, 500, 1.3, 'h9:drier', { erase: 'h9:30' }), A('cactus', 1550, 520, 1.9, 'h9:deserts')],
      num: [['h9:30', 1150, 240, '< 30%', 'INDOOR HUMIDITY IN WINTER']], lab: [['DRIER THAN MANY DESERTS', 'h9:deserts', 1400, 965, GOLD, 30]] },
  ], 'm1'));
}
// ---------- 4 the mucus conveyor belt ----------
function sMucus(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('m1', [A('drop', 760, 540, 1.8, 'm1+0.2', { grey: 'm1:dry' }), A('lungs', 1180, 540, 1.8, 'm1:body')]),
    { at: 'm2', cast: [A('cilia', 760, 560, 3.0, 'm2:lined'), A('rhinoV', 400, 300, 1.1, 'm2:germs', { mv: [['m2:push', 700, 420]] }), A('rhinoV', 760, 420, 0.9, 'm2:push', { mv: [['m2:out', 1450, 300, 80]] })],
      tag: [['CILIA', 'm2:cilia', 760, 965, '#9b3352', 38]], lab: [['BEAT LIKE OARS', 'm2:oars', 1400, 700, GOLD, 30]] },
    { at: 'm3', cast: [A('cilia', 400, 560, 1.8, 'm3'), A('rhinoV', 400, 360, 0.9, 'm3:swallow', { mv: [['m3:acid', 1200, 480, 120]], erase: 'm3:destroys' }), A('stomach', 1250, 540, 2.4, 'm3:stomach', { hit: ['m3:destroys'] })],
      lab: [['A CONVEYOR BELT THAT RUNS ALL DAY', 'm3:conveyor', 960, 965, GOLD, 30]] },
    QB('m4q', [A('cilia', 760, 540, 2.2, 'm4q+0.2', { o: { dry: 1 } }), A('drop', 1180, 520, 1.4, 'm4q:dry', { grey: 'm4q:dry' })]),
    { at: 'm5', cast: [A('mouse', 380, 560, 2.0, 'm5:mice'), A('drop', 760, 500, 1.4, 'm5:dry', { grey: 'm5:dry' }), A('mouse', 1150, 560, 2.0, 'm5:others'), A('drop', 1500, 500, 1.4, 'm5:50'), A('fluV', 960, 260, 1.1, 'm5:flu')],
      lab: [['10–20% HUMIDITY', 'm5:10', 570, 800, '#ff9fb4', 28], ['50%', 'm5:50', 1320, 800, '#8fd8e6', 30]] },
    { at: 'm6', cast: [A('cilia', 480, 520, 2.4, 'm6:cilia', { o: { dry: 1 } }), A('alarmC', 1000, 500, 1.4, 'm6:alarm', { grey: 'm6:weaker' }), A('mouse', 1450, 560, 2.0, 'm6:sicker', { shake: ['m6:sicker', 1.0] })],
      lab: [['SLOWER SWEEP · POOR REPAIR · WEAKER ALARM', 'm6:slowly', 960, 965, WHITE, 26]] },
    { at: 'm7', cast: [A('mouse', 330, 560, 1.6, 'm7:mice'), A('cross', 330, 300, 0.8, 'm7:aren'), A('fluV', 860, 400, 1.4, 'm7:floats', { mv: [['m7:floats+1', 960, 300]] }), A('cilia', 1350, 600, 1.8, 'm7:defenses', { o: { dry: 1 } }), A('drop', 860, 700, 1.2, 'm7:dry', { grey: 'm7:dry' })],
      lab: [['DRY AIR WORKS AGAINST US TWICE', 'm7:twice', 960, 965, GOLD, 30]] },
  ], 'i1'));
}
// ---------- 5 locked inside together ----------
function sInside(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('i1', [A('house', 760, 540, 2.2, 'i1+0.2'), A('crowd', 1180, 540, 1.6, 'i1:indoors')]),
    { at: 'i2', cast: [A('house', 400, 520, 2.0, 'i2:indoors'), A('windowW', 820, 500, 1.6, 'i2:windows'), A('doorknob', 1150, 500, 1.4, 'i2:doors'), A('crowd', 1550, 520, 1.8, 'i2:everyone')],
      num: [['i2:90', 400, 230, '~90%', 'OF AMERICANS\' TIME INDOORS']] },
    { at: 'i3', cast: [A('windowW', 300, 500, 1.6, 'i3:sealed'), A('adult', 760, 560, 2.0, 'i3:person', { o: { mood: 'sick' } }), A('desk', 1350, 560, 1.8, 'i3:office'), A('droplets', 1050, 400, 1.0, 'i3:specs', { mv: [['i3:build', 1250, 330]] }), A('droplets', 1050, 400, 1.0, 'i3:build', { mv: [['i3:smoke', 1550, 360]] })],
      fx: [['stream', 1, [1500, 380], 'i3:breathes', 'i3>', { col: '#ffb08a', n: 12 }]], lab: [['BUILDS UP LIKE SMOKE', 'i3:smoke', 1100, 965, '#ff9fb4', 30]] },
    { at: 'i4', cast: [A('windowW', 360, 500, 1.8, 'i4:window', { o: { open: 1 } }), A('droplets', 960, 420, 1.4, 'i4:dilutes', { mv: [['i4:pushes', 1500, 330]], erase: 'i4:fewer' }), A('adult', 1300, 600, 1.8, 'i4:breath')],
      fx: [['stream', 0, [1600, 400], 'i4:fresh', 'i4>', { col: 'rgba(255,255,255,0.8)', n: 10 }]], lab: [['FRESH AIR DILUTES THE SPECKS', 'i4:dilutes', 960, 965, GOLD, 30]] },
    { at: 'i4b', cast: [A('purifier', 600, 520, 2.2, 'i4b:purifier'), A('droplets', 1300, 420, 1.2, 'i4b:specs', { mv: [['i4b:catches', 700, 380]], erase: 'i4b:catches+0.3' })],
      fx: [['stream', [1500, 520], 0, 'i4b:pulls', 'i4b>', { col: 'rgba(255,255,255,0.7)', n: 10 }]], tag: [['HEPA FILTER', 'i4b:hepa', 600, 965, '#127b84', 36]] },
    { at: 'i5', cast: [A('school', 330, 520, 1.6, 'i5:classrooms'), A('bus', 760, 520, 1.6, 'i5:buses'), A('table', 1180, 540, 1.6, 'i5:gatherings'), A('house', 1600, 520, 1.6, 'i5:house'), A('rhinoV', 330, 300, 0.8, 'i5:carry', { mv: [['i5:house', 1600, 330, 80]] })],
      lab: [['CROWDING POURS FUEL ON IT', 'i5:fuel', 960, 965, GOLD, 30]] },
  ], 'v1'));
}
// ---------- 6 the missing sunshine ----------
function sSun(t) {
  worldBG(t, 'gold');
  beats(t, chainB([
    QB('v1', [A('sunC', 760, 540, 2.0, 'v1+0.2', { grey: 'v1:less' })]),
    { at: 'v2', cast: [A('sunC', 330, 360, 1.6, 'v2:sun'), A('adult', 760, 560, 2.0, 'v2:skin', { hit: ['v2:hit'] }), A('pillC', 1150, 500, 1.4, 'v2:vitamin'), A('macro', 1550, 520, 1.8, 'v2:immune'), A('antibody', 1550, 300, 0.9, 'v2:antibiotics')],
      fx: [['stream', 0, 1, 'v2:ultraviolet', 'v2>', { col: '#ffd98a', n: 8, arc: 10 }]], tag: [['VITAMIN D', 'v2:vitamin', 1150, 965, '#ea9a52', 36]] },
    { at: 'v3', cast: [A('sunC', 360, 640, 1.4, 'v3:sun', { grey: 'v3:filtered' }), A('globeP', 860, 500, 1.6, 'v3:boston'), A('calDay', 1300, 500, 1.6, 'v3:november', { o: { m: 'NOV–', d: 'FEB' } }), A('cross', 1620, 500, 1.1, 'v3:almost')],
      lab: [['ALMOST NO VITAMIN D FROM WINTER SUN', 'v3:almost', 960, 965, WHITE, 28]] },
    QB('v4q', [A('pillC', 760, 540, 2.0, 'v4q+0.2'), A('crowd', 1180, 540, 1.6, 'v4q:everyone')]),
    { at: 'v5', cast: [A('docV', 360, 500, 1.6, 'v5:analysis', { o: { title: '25 TRIALS', ticks: 0 } }), A('crowd', 760, 520, 1.6, 'v5:11'), A('pillC', 1150, 500, 1.4, 'v5:pills'), A('chart', 1550, 520, 1.8, 'v5:slightly', { o: { v: [0.6, 0.55], hi: 1 } })],
      lab: [['~11,000 PEOPLE · 2017', 'v5:11', 760, 800, WHITE, 28], ['ONLY A SLIGHT DROP OVERALL', 'v5:slightly', 1300, 965, GOLD, 28]] },
    { at: 'v6', cast: [A('adult', 330, 560, 1.8, 'v6:people', { o: { mood: 'sick' } }), A('pillC', 700, 500, 1.1, 'v6:daily'), A('check', 960, 500, 1.0, 'v6:benefit'), A('pillC', 1250, 500, 2.0, 'v6:giant', { morph: ['v6:didn', 'cross'] }), A('doctor', 1640, 560, 1.8, 'v6:doctor')],
      lab: [['VERY LOW + SMALL DAILY/WEEKLY DOSES', 'v6:clearest', 700, 800, GOLD, 26], ['TALK TO YOUR DOCTOR', 'v6:doctor', 1640, 965, WHITE, 28]] },
  ], 'n1'));
}
// ---------- 7 the winter stomach bug ----------
function sNoro(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('n1', [A('noroV', 760, 540, 2.2, 'n1+0.2'), A('stomach', 1180, 540, 1.6, 'n1:stomach')]),
    { at: 'n2', cast: [A('noroV', 330, 500, 2.0, 'n2:noravirus'), A('stomach', 760, 520, 2.0, 'n2:vomiting', { shake: ['n2:sudden', 1.0], hit: ['n2:vomiting'] }), A('crowd', 1200, 520, 1.6, 'n2:illnesses'), A('calDay', 1600, 500, 1.5, 'n2:november', { o: { m: 'NOV–', d: 'APR' } })],
      num: [['n2:19', 1200, 220, '19–21 MILLION', 'U.S. ILLNESSES A YEAR']] },
    { at: 'n3', cast: [A('noroV', 330, 360, 1.0, 'n3:few'), A('noroV', 430, 520, 1.0, 'n3:dozen'), A('adult', 760, 560, 1.9, 'n3:sick', { o: { mood: 'sick' } }), A('doorknob', 1200, 520, 1.7, 'n3:doorknob', { hit: ['n3:unwashed'] }), A('family', 1600, 540, 1.9, 'n3:family', { pulse: ['n3:whole'] })],
      fx: [['stream', 2, 3, 'n3:sheds', 'n3:doorknob', { col: '#38c2b8', n: 10 }], ['stream', 3, 4, 'n3:whole', 'n3>', { col: '#38c2b8', n: 8 }]], lab: [['A FEW DOZEN PARTICLES CAN BE ENOUGH', 'n3:dozen', 760, 965, GOLD, 28]] },
    QB('n4q', [A('sanitizer', 760, 540, 2.0, 'n4q+0.2'), A('noroV', 1180, 520, 1.6, 'n4q:kill')]),
    { at: 'n5', cast: [A('fluV', 330, 400, 1.6, 'n5:fatty', { erase: 'n5:rips' }), A('sanitizer', 760, 520, 2.0, 'n5:alcohol'), A('noroV', 1250, 520, 2.0, 'n5:noravirus', { hit: ['n5:standing'], shake: ['n5:standing', 0.6] }), A('shieldC', 1600, 520, 1.3, 'n5:shell')],
      fx: [['stream', 1, 0, 'n5:alcohol', 'n5:rips', { col: 'rgba(160,220,255,0.9)', n: 6 }], ['stream', 1, 2, 'n5:gel', 'n5>', { col: 'rgba(160,220,255,0.9)', n: 6 }]], lab: [['NO FATTY COAT · A TOUGH PROTEIN SHELL', 'n5:shell', 1250, 965, WHITE, 26]] },
    { at: 'n6', cast: [A('soap', 330, 520, 1.8, 'n6:soap'), A('hands', 760, 520, 2.2, 'n6:scrubbing'), A('noroV', 760, 360, 0.9, 'n6:lift', { mv: [['n6:drain', 1200, 760, 40]], erase: 'n6:drain+0.4' }), A('adult', 1550, 560, 1.8, 'n6:colds')],
      num: [['n6:16', 1550, 250, '−16–21%', 'COLDS & RESPIRATORY ILLNESS']], lab: [['SOAP + WATER LIFT IT OFF', 'n6:lift', 760, 965, GOLD, 30]] },
    { at: 'n7', cast: [A('doorknob', 330, 520, 1.7, 'n7:handles'), A('noroV', 330, 300, 0.9, 'n7:survive', { erase: 'n7:kill+0.6' }), A('calDay', 760, 500, 1.4, 'n7:days', { o: { m: 'FOR', d: 'DAYS' } }), A('bleach', 1200, 520, 2.0, 'n7:bleach', { mv: [['n7:kill', 600, 420]] })],
      lab: [['BLEACH-BASED CLEANER', 'n7:bleach', 1200, 965, GOLD, 30]] },
  ], 'w1'));
}
// ---------- 8 wet hair and cold feet ----------
function sWet(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('w1', [A('adult', 760, 560, 2.2, 'w1+0.2', { o: { hair: '#3a6aa0' } }), A('drop', 1150, 360, 1.0, 'w1:wet'), A('snow', 1180, 640, 1.2, 'w1:out')]),
    { at: 'w2', cast: [A('adult', 420, 560, 2.2, 'w2:hair', { o: { hair: '#3a6aa0' } }), A('drop', 420, 260, 0.8, 'w2:wet'), A('rhinoV', 960, 500, 1.6, 'w2:virus', { morph: ['w2:create', 'cross'] }), A('check', 1450, 520, 1.6, 'w2:won')],
      lab: [['NO VIRUS, NO COLD', 'w2:no', 1100, 965, GOLD, 32]] },
    { at: 'w3', cast: [A('globeP', 300, 500, 1.4, 'w3:wales'), A('feetBowl', 760, 520, 2.0, 'w3:feet', { o: { cold: 1 } }), A('clock3', 1150, 360, 1.1, 'w3:20'), A('feetBowl', 1500, 520, 2.0, 'w3:empty', { o: { cold: 0 } })],
      lab: [['90 IN COLD WATER', 'w3:90', 760, 800, '#8fd8e6', 30], ['90 IN EMPTY BOWLS', 'w3:another', 1500, 800, WHITE, 30]] },
    { at: 'w4', cast: [A('feetBowl', 330, 520, 1.6, 'w4:chilled', { o: { cold: 1 } }), A('nose', 760, 520, 1.8, 'w4:nose', { o: tt => ({ cold: tt > T('w4:squeezes') }) }), A('rhinoV', 1100, 400, 1.2, 'w4:virus', { mv: [['w4:hold', 860, 470]], hit: ['w4:hold'] }), A('chart', 1560, 520, 1.8, 'w4:13', { o: { v: [13 / 15, 5 / 15], hi: 0 } })],
      lab: [['13 VS 5 REPORTED A COLD', 'w4:13', 1560, 800, GOLD, 28]] },
    { at: 'w5', cast: [A('chart', 400, 520, 1.6, 'w5:numbers', { o: { v: [0.3, 0.2] } }), A('docV', 800, 500, 1.6, 'w5:self', { o: { title: 'SELF-REPORT', ticks: 0 } }), A('tubeB', 1200, 500, 1.4, 'w5:tested', { o: { txt: 'NO TEST' }, morph: ['w5:tested+0.5', 'cross'] }), A('question', 1600, 500, 1.4, 'w5:hint')],
      lab: [['AN INTERESTING HINT, NOT A RULE', 'w5:hint', 960, 965, GOLD, 30]] },
    QB('w6q', [A('shieldC', 760, 540, 2.0, 'w6q+0.2', { o: { crack: 1 } })]),
    { at: 'w7', cast: [A('moon2', 300, 360, 1.2, 'w7:sleep'), A('bed', 300, 690, 1.4, 'w7:sleep+0.3'), A('rhinoV', 760, 330, 1.2, 'w7:cold', { mv: [['w7:noses', 900, 470]] }), A('adult', 980, 560, 1.8, 'w7:six', { o: { mood: 'sick' }, hit: ['w7:noses'] }), A('adult', 1500, 560, 1.8, 'w7:seven')],
      num: [['w7:four', 980, 200, '~4×', 'MORE COLDS · < 6 HOURS']], lab: [['164 ADULTS · 2015', 'w7:164', 480, 965, WHITE, 28], ['> 7 HOURS', 'w7:seven', 1500, 820, '#8fd8e6', 30]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [A('shieldC', 760, 540, 2.0, 'o1+0.2'), A('snow', 1180, 520, 1.4, 'o1:healthy')]),
    { at: 'o2', cast: [A('soap', 240, 520, 1.3, 'o2:wash'), A('windowW', 520, 520, 1.2, 'o2:fresh', { o: { open: 1 } }), A('humidifier', 820, 520, 1.3, 'o2:humidity'), A('syringeC', 1120, 520, 1.1, 'o2:flu'), A('vial', 1380, 520, 1.2, 'o2:vaccines'), A('bed', 1660, 520, 1.3, 'o2:sleep')],
      lab: [['SOAP · FRESH AIR · 40–60% HUMIDITY · VACCINES · SLEEP', 'o2:wash', 960, 800, GOLD, 26]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [A('nose', 420, 600, 2.0, 'o3', { o: { cold: 1 } }), A('snow', 420, 300, 1.1, 'o3')], { id: 'outro', zoom: 0 });
  outroTitle(t, 'IT\'S NOT THE COLD ITSELF', 'WHY WE GET SICK IN WINTER', 1240, 50, 66);
}
const CHAPTERS = [['d1', 'The decoy swarm', 'coral', 'vesicle'], ['r1', 'A virus that likes it cool', 'teal', 'rhinoV'], ['h1', 'Cold, dry air', 'indigo', 'fluV'], ['m1', 'The mucus conveyor belt', 'coral', 'cilia'], ['i1', 'Locked inside together', 'night', 'house'], ['v1', 'The missing sunshine', 'gold', 'sunC'], ['n1', 'The winter stomach bug', 'teal', 'noroV'], ['w1', 'Wet hair and cold feet', 'indigo', 'feetBowl']];
function SECTIONS() { return makeSections(CHAPTERS, { d1: [sDecoy, 'd2'], r1: [sCool, 'r2'], h1: [sDry, 'h2'], m1: [sMucus, 'm2'], i1: [sInside, 'i2'], v1: [sSun, 'v2'], n1: [sNoro, 'n2'], w1: [sWet, 'w2'] }, sOpen, sOutro); }
