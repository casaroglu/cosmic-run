// "Are naps good or bad for you?" — topic file (engine + common.js cast system + icons2.js)
const napO = (col) => ({ col });
function pool(t, k) {   // a swimming pool cross-section: light sleep near the surface, deep sleep at the bottom
  rr2(300, 300, 1320, 520, 30, 'rgba(90,169,230,0.35)'); rr2(300, 300, 1320, 170, 30, 'rgba(143,216,230,0.35)'); reg('panel', 'pool', 300, 300, 1620, 820);
  for (let i = 0; i < 6; i++) rr2(340 + i * 220 + Math.sin(t * 2 + i) * 20, 312, 120, 6, 3, 'rgba(255,255,255,0.4)');
}
// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [A('napper', 760, 540, 2.4, 'c1:naps'), A('check', 1200, 400, 1.2, 'c1:good'), A('cross', 1200, 700, 1.2, 'c1:bad')] },
    { at: 'c2', cast: [A('napper', 380, 540, 2.1, 'c2:short'), A('battery', 820, 520, 1.9, 'c2:recharge', { o: tt => ({ level: 0.2 + 0.8 * clamp((tt - T('c2:recharge')) / 1.2), charge: 1 }) }), A('calDay', 1250, 500, 1.7, 'c2:tracked', { o: { m: 'YEARS', d: '19' } }), A('hglass', 1620, 520, 1.8, 'c2:earlier', { o: { fill: 0.9 } })],
      lab: [['LONG, FREQUENT NAPS ↔ EARLIER DEATH', 'c2:long', 1420, 965, '#ff9fb4', 30]] },
    { at: 'c3', cast: [A('docV', 380, 520, 1.9, 'c3:published', { o: { title: 'JAMA NETW OPEN', ticks: 0 } }), A('clock3', 820, 520, 2.0, 'c3:hour'), A('sun', 1250, 520, 1.6, 'c3:morning'), A('napper', 1600, 560, 1.6, 'c3:morning', { pulse: ['c3:worst'] })],
      num: [['c3:13', 820, 220, '+13%', 'RISK PER EXTRA HOUR']], lab: [['MORNING NAPS LOOKED WORST', 'c3:worst', 1420, 965, GOLD, 30]] },
    QB('c4q', [A('napper', 760, 560, 2.3, 'c4q+0.2'), A('cross', 1200, 420, 1.1, 'c4q:stop')]),
    { at: 'c5', cast: [A('hglass', 360, 520, 1.9, 'c5:long'), A('clock3', 820, 520, 2.0, 'c5:when'), A('adult', 1300, 560, 2.2, 'c5:body', { o: { mood: 'sick' } }), A('question', 1650, 360, 1.1, 'c5:why')] },
    { at: 'c6', cast: [A('napper', 520, 540, 2.0, 'c6:long'), A('skullX', 1000, 520, 1.6, 'c6:early'), A('cross', 1450, 520, 1.6, 'c6:prove')],
      fx: [['zap', 0, 1, 'c6:together', 0.7, '#ffd98a']], tag: [['CORRELATION ≠ CAUSATION', 'c6:prove', 960, 965, '#5b4fd6', 38]] },
  ], 's1'));
}
// ---------- 1 the 19-year study ----------
function sStudy(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('s1', [A('magnifier', 760, 540, 2.2, 's1+0.2', { mv: [['s1:study', 900, 520]] }), A('crowd', 1150, 540, 1.8, 's1:actually')]),
    { at: 's2', cast: [A('elder', 330, 560, 2.1, 's2:older', { o: { col: '#b48cff' } }), A('elder', 650, 560, 2.1, 's2:older+0.15', { o: { col: '#ff8f4a' } }), A('elder', 970, 560, 2.1, 's2:older+0.3', { o: { col: '#127b84' } }), A('globeP', 1500, 500, 1.8, 's2:illinois')],
      num: [['s2:1', 650, 220, '1,338', 'OLDER ADULTS · CHICAGO']], lab: [['AVERAGE AGE 81 · 3 IN 4 WOMEN', 's2:average', 960, 965, GOLD, 30]] },
    { at: 's3', cast: [A('doc2', 330, 500, 1.8, 's3:asking', { erase: 's3:researchers' }), A('sensorW', 760, 520, 2.0, 's3:sensor', { mv: [['s3:wrist', 1050, 560, 60]] }), A('napper', 1300, 560, 2.0, 's3:still'), A('clock3', 1680, 360, 1.3, 's3:9')],
      lab: [['STILL 9 A.M.–7 P.M. = A NAP', 's3:logged', 1100, 965, GOLD, 30]] },
    { at: 's4', cast: [A('hglass', 380, 520, 1.9, 's4:waited'), A('sensorW', 900, 400, 1.4, 's4:matched'), A('chart', 900, 690, 1.5, 's4:matched', { o: { v: [0.3, 0.5, 0.7, 0.9] } }), A('elder', 1400, 560, 2.0, 's4:died', { grey: 's4:died+0.3' })],
      fx: [['stream', 1, 3, 's4:matched', 's4>', { col: '#7ff3a0', n: 6 }]], num: [['s4:926', 1650, 280, '926', 'DIED DURING FOLLOW-UP']] },
    QB('s5q', [A('napper', 800, 560, 2.2, 's5q+0.2'), A('alarmC', 1200, 420, 1.2, 's5q:riskiest')]),
    { at: 's6', cast: [A('clock3', 380, 500, 1.9, 's6:hour'), A('napper', 760, 560, 1.7, 's6:nap'), A('napper', 1180, 560, 1.7, 's6:extra#1', { pulse: ['s6:7'] })],
      num: [['s6:13', 380, 230, '+13%', 'PER EXTRA HOUR'], ['s6:7', 1550, 480, '+7%', 'PER EXTRA NAP A DAY']] },
    { at: 's7', cast: [A('sun', 380, 460, 1.6, 's7:morning'), A('napper', 760, 560, 1.8, 's7:morning'), A('sunC', 1180, 380, 1.2, 's7:afternoon'), A('napper', 1500, 560, 1.8, 's7:afternoon')],
      lab: [['MORNING: +30%', 's7:30', 570, 840, '#ff9fb4', 32], ['EARLY AFTERNOON', 's7:early', 1340, 840, GOLD, 32]] },
    { at: 's8', cast: [A('calDay', 360, 500, 1.6, 's8:long', { o: { m: 'MON', d: '2H' } }), A('calDay', 700, 500, 1.6, 's8:short', { o: { m: 'TUE', d: '10M' } }), A('check', 1000, 480, 1.1, 's8:not'), A('moon2', 1400, 480, 1.7, 's8:night'), A('bed', 1700, 560, 1.6, 's8:slept')],
      lab: [['IRREGULAR NAPPING: NO EXTRA RISK', 's8:irregular', 680, 800, GOLD, 28], ['NIGHT SLEEP COUNTED', 's8:night', 1550, 800, WHITE, 28]] },
    { at: 's8b', cast: [A('napper', 400, 560, 1.6, 's8b:naps'), A('napper', 800, 560, 1.9, 's8b:longer'), A('napper', 1220, 560, 2.2, 's8b:often'), A('sun', 1640, 380, 1.3, 's8b:morning', { mv: [['s8b:older', 1600, 300]] })],
      lab: [['LONGER · MORE OFTEN · EARLIER', 's8b:longer', 960, 965, GOLD, 32]] },
    QB('s9q', [A('napper', 760, 560, 2.2, 's9q+0.2'), A('hglass', 1180, 520, 1.6, 's9q:shorten')]),
    { at: 's10', cast: [A('docV', 300, 500, 1.5, 's10:lead', { o: { title: 'CORRELATION', ticks: 0 } }), A('smokeAlarm', 760, 330, 1.6, 's10:smoke', { shake: ['s10:smoke', 1.2] }), A('flame', 760, 700, 1.5, 's10:fire'), A('heartR', 1200, 520, 1.6, 's10:hidden'), A('moon2', 1500, 520, 1.4, 's10:broken'), A('clock3', 1750, 520, 1.2, 's10:clock')],
      fx: [['zap', 2, 1, 's10:fire', 0.6, '#ff8f4a']], tag: [['THE SMOKE ALARM, NOT THE FIRE', 's10:smoke', 960, 965, '#9b3352', 34]] },
  ], 'd1'));
}
// ---------- 2 the afternoon crash ----------
function sCrash(t) {
  worldBG(t, 'gold');
  beats(t, chainB([
    QB('d1', [A('desk', 760, 560, 2.2, 'd1+0.2', { o: { nod: 1 } }), A('plate', 1200, 500, 1.6, 'd1:lunch')]),
    { at: 'd2', cast: [A('plate', 330, 520, 1.6, 'd2:lunch', { grey: 'd2:lunch+0.6' }), A('clock3', 760, 500, 2.2, 'd2:clock'), A('sunC', 1150, 360, 1.3, 'd2:afternoon'), A('battery', 1150, 690, 1.5, 'd2:signal', { o: tt => ({ level: 0.9 - 0.6 * clamp((tt - T('d2:sags')) / 1.0) }) }), A('desk', 1600, 560, 1.8, 'd2:slump', { o: { nod: 1 } })],
      lab: [['24-HOUR BODY CLOCK', 'd2:clock', 760, 800, GOLD, 30]] },
    { at: 'd3', cast: [A('plate', 420, 520, 2.2, 'd3:meal', { pulse: ['d3:carbs'] }), A('battery', 960, 520, 1.8, 'd3:deepen', { o: tt => ({ level: 0.4 - 0.25 * clamp((tt - T('d3:deepen')) / 1.0) }) }), A('clock3', 1450, 520, 2.0, 'd3:clock')],
      lab: [['THE CLOCK SETS THE STAGE', 'd3:stage', 1450, 800, GOLD, 30]] },
    { at: 'd4', cast: [A('hexmol', 360, 380, 1.4, 'd4:adenosine', { mv: [['d4:piles', 820, 420, 80]], out: 'd4:sand' }), A('hexmol', 360, 700, 1.4, 'd4:piles', { mv: [['d4:brain', 820, 600, 80]], out: 'd4:sand' }), A('brainS', 960, 520, 2.4, 'd4:brain'), A('hglass', 1560, 520, 2.2, 'd4:hourglass', { o: tt => ({ fill: 0.2 + 0.7 * clamp((tt - T('d4:sand')) / 2.0) }) })],
      tag: [['ADENOSINE', 'd4:adenosine', 600, 965, '#9b3352', 38]], lab: [['HEAVIER EYELIDS', 'd4:heavier', 1560, 965, WHITE, 30]] },
    { at: 'd5', cast: [A('napper', 520, 560, 2.2, 'd5:sleep'), A('hglass', 1100, 520, 2.2, 'd5:empties', { o: tt => ({ fill: 0.9 - 0.6 * clamp((tt - T('d5:empties')) / 2.0) }) }), A('battery', 1560, 520, 1.6, 'd5:lighter', { o: { level: 0.9 } })],
      fx: [['stream', 1, 0, 'd5:pours', 'd5>', { col: '#ffd98a', n: 10, r: 6 }]] },
  ], 'p1'));
}
// ---------- 3 the perfect nap length ----------
function sLength(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('p1', [A('alarmC', 760, 540, 2.2, 'p1+0.2'), A('napper', 1180, 560, 1.6, 'p1:nap')]),
    { at: 'p2', cast: [A('globeP', 330, 500, 1.7, 'p2:australian'), A('bed', 760, 540, 1.8, 'p2:five'), A('napper', 1180, 560, 1.7, 'p2:naps'), A('chart', 1600, 520, 1.6, 'p2:tests', { o: { v: [0.4, 0.5, 0.6, 0.7] } })],
      lab: [['ONLY ~5 HOURS OF NIGHT SLEEP', 'p2:five', 760, 800, WHITE, 28]] },
    { at: 'p3', cast: [A('clock3', 380, 380, 1.4, 'p3:10'), A('battery', 380, 690, 1.4, 'p3:sharpened', { o: { level: 0.95, charge: 1 } }), A('check', 760, 520, 1.3, 'p3:one'), A('clock3', 1250, 380, 1.4, 'p3:30'), A('cloudS', 1250, 690, 1.5, 'p3:groggy', { o: { col: '#7a84a0' } }), A('battery', 1640, 520, 1.4, 'p3:helped', { o: tt => ({ level: tt < T('p3:dip') + 1 ? 0.3 : 0.8 }) })],
      lab: [['10 MIN', 'p3:10', 380, 210, GOLD, 32], ['30 MIN', 'p3:30', 1250, 210, GOLD, 32]] },
    { at: 'p3b', under: pool, cast: [A('diver', 900, 380, 1.4, 'p3b:lightest', { mv: [['p3b:surface', 900, 330]] }), A('adult', 1440, 260, 1.2, 'p3b:stepping')],
      lab: [['LIGHT SLEEP', 'p3b:lightest', 520, 400, GOLD, 30]] },
    { at: 'p4', under: pool, cast: [A('diver', 900, 380, 1.4, 'p4', { mv: [['p4:sinks', 900, 700]], o: { deep: 1 } }), A('cloudS', 1400, 620, 1.3, 'p4:fog', { o: { col: '#7a84a0' } })],
      tag: [['SLEEP INERTIA', 'p4:inertia', 960, 965, '#5b4fd6', 38]], lab: [['DEEP SLOW-WAVE SLEEP', 'p4:deep', 520, 760, WHITE, 28]] },
    QB('p5q', [A('plane', 760, 520, 2.2, 'p5q+0.2'), A('pilot', 1180, 560, 1.7, 'p5q:pilots')]),
    { at: 'p6', cast: [A('plane', 360, 460, 1.8, 'p6:airline'), A('pilot', 820, 560, 2.0, 'p6:pilots', { o: {} }), A('pilot', 1200, 560, 2.0, 'p6:colleague'), A('clock3', 1620, 420, 1.4, 'p6:40')],
      lab: [['40-MIN REST CHANCE', 'p6:40', 1620, 640, GOLD, 28], ['ASLEEP ~6 MIN · SLEPT ~26', 'p6:six', 960, 965, WHITE, 30]] },
    { at: 'p7', cast: [A('pilot', 380, 560, 2.0, 'p7:nappers'), A('plane', 900, 500, 1.6, 'p7:landing', { mv: [['p7:landing+1.2', 1100, 640]] }), A('battery', 1480, 380, 1.4, 'p7:alertness', { o: { level: 0.95 } }), A('chart', 1480, 690, 1.4, 'p7:performance', { o: { v: [0.4, 0.95], hi: 1 } })],
      num: [['p7:54', 960, 230, '+54%', 'ALERTNESS (UP TO)']], lab: [['+34% PERFORMANCE', 'p7:34', 1480, 880, GOLD, 28]] },
    { at: 'p8', cast: [A('clock3', 420, 500, 2.0, 'p8:20'), A('sunC', 960, 400, 1.4, 'p8:early'), A('napper', 960, 690, 1.5, 'p8:early'), A('moon2', 1500, 520, 1.8, 'p8:night', { pulse: ['p8:steal'] })],
      tag: [['~20 MINUTES · EARLY AFTERNOON', 'p8:20', 960, 965, '#127b84', 34]] },
  ], 'k1'));
}
// ---------- 4 the coffee nap ----------
function sCoffee(t) {
  worldBG(t, 'cream');
  beats(t, chainB([
    QB('k1', [A('coffee', 760, 540, 2.2, 'k1+0.2'), A('napper', 1180, 560, 1.6, 'k1:nap')]),
    { at: 'k2', cast: [A('receptor', 700, 560, 2.4, 'k2:receptors', { o: tt => ({ cap: tt > T('k2:caps') + 0.6 }) }), A('coffee', 300, 330, 1.4, 'k2:caffeine', { mv: [['k2:caps+0.6', 700, 420, 60]], out: 'k2:caps+0.6' }), A('hexmol', 1450, 360, 1.5, 'k2:sleepy', { mv: [['k2:in', 860, 420]], hit: ['k2:in'], push: [['k2:in', 200, -40]] })],
      tag: [['CAFFEINE BLOCKS ADENOSINE', 'k2:plugging', 960, 965, '#7a4a2c', 34]] },
    { at: 'k3', cast: [A('coffee', 330, 520, 1.8, 'k3:coffee'), A('napper', 800, 560, 2.0, 'k3:nap'), A('hglass', 1250, 520, 1.8, 'k3:drains', { o: tt => ({ fill: 0.9 - 0.7 * clamp((tt - T('k3:drains')) / 1.5) }) }), A('clock3', 1650, 400, 1.3, 'k3:20'), A('battery', 1650, 700, 1.3, 'k3:arrives', { o: { level: 0.95, charge: 1 } })],
      lab: [['~20 MIN TO KICK IN', 'k3:20', 1250, 840, GOLD, 30]] },
    { at: 'k4', cast: [A('globeP', 330, 500, 1.5, 'k4:british'), A('carS', 820, 520, 2.0, 'k4:drivers', { o: tt => ({ drift: tt < T('k4:coffee') }) }), A('coffee', 1250, 400, 1.3, 'k4:coffee'), A('napper', 1250, 690, 1.3, 'k4:nap'), A('check', 1620, 520, 1.3, 'k4:better')],
      num: [['k4:tenth', 820, 230, '~1/10', 'DANGEROUS DRIFTS VS PLACEBO']], lab: [['SMALL STUDY · 1997', 'k4:small', 960, 965, WHITE, 28]] },
    { at: 'k5', cast: [A('coffee', 420, 520, 2.0, 'k5:caffeine'), A('moon2', 900, 520, 1.8, 'k5:night'), A('bed', 1360, 560, 2.0, 'k5:wreck', { shake: ['k5:wreck', 1.0] }), A('cross', 1700, 380, 1.0, 'k5:late')] },
  ], 'h1'));
}
// ---------- 5 long naps and your heart ----------
function jCurve(t, k) {   // nap length vs heart risk: dips a little to ~30 min, then climbs (a J)
  const x0 = 360, x1 = 1560, y0 = 760; rr2(x0, y0, x1 - x0, 6, 3, 'rgba(255,255,255,0.5)'); reg('hero', 'j-curve', x0, 300, x1, y0 + 10);
  ctx.strokeStyle = '#ff6f7a'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i <= 60 * k; i++) { const f = i / 60, x = lerp(x0, x1, f), y = y0 - 200 + (f < 0.3 ? 40 * Math.sin(f / 0.3 * Math.PI) : -300 * (((f - 0.3) / 0.7) ** 2)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  font(26, 600); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('0', x0, y0 + 40); ctx.fillText('30 MIN', lerp(x0, x1, 0.3), y0 + 40); ctx.fillText('1 H+', x1, y0 + 40);
}
function sHeart(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('h1', [A('heartR', 760, 540, 2.3, 'h1+0.2'), A('napper', 1180, 560, 1.6, 'h1:naps')]),
    { at: 'h2', cast: [A('docV', 330, 500, 1.7, 'h2:analysis', { o: { title: 'SLEEP · 2015', ticks: 0 } }), A('globeP', 760, 500, 1.7, 'h2:world'), A('clock3', 1180, 500, 1.6, 'h2:hour'), A('heartR', 1580, 520, 2.0, 'h2:heart', { o: { pain: 1 }, pulse: ['h2:82'] })],
      fx: [['zap', 2, 3, 'h2:heart', 0.6, '#ff6f7a']], num: [['h2:82', 1180, 230, '+82%', 'HEART DISEASE · NAPS ≥ 1 HOUR']] },
    { at: 'h3', under: tt => jCurve(tt, clamp((tt - T('h3:curve')) / 2.0)), cast: [A('napper', 1680, 260, 1.0, 'h3:long')],
      lab: [['+27% RISK OF DYING · NAPS ≥ 1 HOUR', 'h3:27', 960, 965, '#ff9fb4', 30], ['A "J" SHAPE', 'h3:letter', 960, 160, GOLD, 34]] },
    { at: 'h4', cast: [A('globeP', 400, 500, 1.8, 'h4:european'), A('crowd', 860, 520, 2.0, 'h4:300'), A('clock3', 1300, 500, 1.6, 'h4:over'), A('skullX', 1640, 500, 1.3, 'h4:death')],
      num: [['h4:30', 1300, 230, '+30%', 'RISK OF DEATH · NAPS > 1 HOUR']], lab: [['300,000+ PEOPLE · 2020', 'h4:300', 860, 800, WHITE, 28]] },
    { at: 'h4b', cast: [A('napper', 520, 560, 2.0, 'h4b:extra'), A('moon2', 1000, 500, 1.7, 'h4b:night'), A('bed', 1450, 560, 2.0, 'h4b:six')],
      lab: [['…AND >6 HOURS AT NIGHT', 'h4b:six', 1200, 965, GOLD, 30]] },
    QB('h5q', [A('bpGauge', 760, 540, 2.0, 'h5q+0.2', { o: { v: 0.8 } })]),
    { at: 'h6', cast: [A('crowd', 330, 520, 1.8, 'h6:followed'), A('napper', 760, 560, 1.7, 'h6:napped'), A('bpGauge', 1180, 500, 1.8, 'h6:blood', { o: tt => ({ v: 0.4 + 0.45 * clamp((tt - T('h6:12')) / 1.0) }) }), A('brainS', 1600, 500, 1.6, 'h6:stroke', { o: { hot: 1 }, hit: ['h6:stroke'] })],
      lab: [['+12% HIGH BLOOD PRESSURE', 'h6:12', 1180, 800, GOLD, 28], ['+24% STROKE', 'h6:24', 1600, 800, '#ff9fb4', 28], ['UK BIOBANK · ~360,000', 'h6:360', 400, 800, WHITE, 26]] },
    { at: 'h7', cast: [A('moon2', 330, 380, 1.4, 'h7:nights'), A('airway', 330, 700, 1.2, 'h7:snoring', { o: { block: 1 } }), A('cloudS', 760, 520, 1.6, 'h7:stress'), A('drop', 1100, 520, 1.5, 'h7:bladder'), A('napper', 1550, 560, 2.0, 'h7:nap', { hit: ['h7:footprint'] })],
      lab: [['A FOOTPRINT OF BAD NIGHT SLEEP', 'h7:footprint', 1200, 965, GOLD, 30]] },
  ], 'r1'));
}
// ---------- 6 cause or clue? ----------
function sCause(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('r1', [A('puzzle', 760, 540, 1.8, 'r1+0.2'), A('napper', 1180, 560, 1.6, 'r1:cause')]),
    { at: 'r2', cast: [A('bedH', 380, 520, 1.6, 'r2:hospital'), A('bedH', 800, 520, 1.6, 'r2:ward', { o: { col: '#ff9fb4', skin: 1 } }), A('bedH', 1220, 520, 1.6, 'r2:full', { o: { col: '#b48cff', skin: 2 } }), A('cross', 1620, 520, 1.1, 'r2:don')],
      lab: [['BEDS DON\'T MAKE PEOPLE SICK', 'r2:don', 960, 965, GOLD, 30]] },
    { at: 'r3', cast: [A('heartR', 330, 380, 1.4, 'r3:heart', { o: { pain: 1 } }), A('brainS', 330, 700, 1.4, 'r3:dementia', { o: { hot: 0.6 } }), A('battery', 800, 520, 1.8, 'r3:drain', { o: tt => ({ level: 0.9 - 0.75 * clamp((tt - T('r3:drain')) / 1.4) }) }), A('napper', 1300, 560, 2.2, 'r3:naps')],
      fx: [['stream', 0, 2, 'r3:hidden', 'r3>', { col: '#ff6f7a', n: 6 }], ['stream', 2, 3, 'r3:tiredness', 'r3>', { col: '#ffd98a', n: 6 }]], tag: [['REVERSE CAUSATION', 'r3:reverse', 960, 965, '#5b4fd6', 38]] },
    { at: 'r4', cast: [A('docV', 500, 520, 2.0, 'r4:adjust', { o: { title: 'KNOWN ILLNESS', ticks: 3 } }), A('question', 1300, 520, 2.0, 'r4:nobody', { shake: ['r4:found', 0.8] })],
      lab: [['ADJUSTED FOR', 'r4:adjust', 500, 800, WHITE, 28], ['NOT YET FOUND', 'r4:found', 1300, 800, '#ff9fb4', 28]] },
    QB('r5q', [A('dna', 800, 540, 2.2, 'r5q+0.2')]),
    { at: 'r6', cast: [A('dna', 380, 520, 2.2, 'r6:genes'), A('cards', 820, 520, 2.0, 'r6:cards', { shake: ['r6:shuffled', 0.8] }), A('baby', 1250, 520, 1.8, 'r6:conception'), A('elder', 1650, 560, 1.8, 'r6:later')],
      fx: [['stream', 1, 2, 'r6:dealt', 'r6>', { ic: 'cards', s: 0.3, n: 4 }]], lab: [['GENES ARE DEALT BEFORE ILLNESS', 'r6:dealt', 1000, 965, GOLD, 30]] },
    { at: 'r7', cast: [A('dna', 330, 520, 1.8, 'r7:variants'), A('crowd', 760, 520, 1.8, 'r7:people'), A('brainS', 1220, 520, 2.0, 'r7:bigger', { pulse: ['r7:bigger', 'r7:15'] }), A('drop', 1620, 520, 1.2, 'r7:tablespoon')],
      lab: [['92 VARIANTS · ~379,000 PEOPLE · 2023', 'r7:92', 760, 800, WHITE, 26], ['+15 CM³ ≈ A TABLESPOON', 'r7:tablespoon', 1400, 800, GOLD, 28]] },
    { at: 'r8', cast: [A('brainS', 420, 520, 2.1, 'r8:brain'), A('hglass', 860, 520, 1.6, 'r8:three'), A('clock3', 1300, 400, 1.3, 'r8:reaction'), A('cross', 1300, 690, 1.0, 'r8:didn'), A('question', 1650, 520, 1.3, 'r8:hint')],
      lab: [['≈ 3–6 YEARS LESS BRAIN AGING (TEAM\'S ESTIMATE)', 'r8:three', 760, 965, GOLD, 26]] },
    QB('r9q', [A('hammock', 800, 540, 2.0, 'r9q+0.2')]),
    { at: 'r10', cast: [A('globeP', 330, 500, 1.6, 'r10:greek'), A('crowd', 760, 520, 1.8, 'r10:adults'), A('hammock', 1200, 520, 1.9, 'r10:ciesta'), A('heartR', 1640, 520, 1.6, 'r10:heart', { pulse: ['r10:lower'] })],
      num: [['r10:37', 1200, 230, '−37%', 'HEART DEATHS']], lab: [['≥30 MIN, 3× A WEEK · ~24,000 GREEKS', 'r10:three', 960, 965, WHITE, 28]] },
    { at: 'r11', cast: [A('adult', 400, 560, 2.0, 'r11:working', { o: { mood: 'stress', col: '#2b3a6a' } }), A('cloudS', 820, 380, 1.4, 'r11:stress', { mv: [['r11:valve', 1250, 330]], erase: 'r11:valve+0.6' }), A('hammock', 1250, 600, 1.8, 'r11:ciesta')],
      lab: [['A DAILY PRESSURE VALVE?', 'r11:valve', 1100, 965, GOLD, 30]] },
  ], 'w1'));
}
// ---------- 7 when naps are a warning ----------
function sWarn(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('w1', [A('smokeAlarm', 760, 540, 2.0, 'w1+0.2'), A('napper', 1180, 560, 1.6, 'w1:nap')]),
    { at: 'w2', cast: [A('bed', 330, 520, 1.7, 'w2:full'), A('desk', 760, 540, 2.0, 'w2:desk', { o: { nod: 1 } }), A('traffic', 1200, 520, 1.6, 'w2:red'), A('carS', 1600, 560, 1.6, 'w2:red', { o: { drift: 1 } })],
      tag: [['EXCESSIVE DAYTIME SLEEPINESS', 'w2:excessive', 960, 965, '#9b3352', 34]] },
    { at: 'w3', cast: [A('airway', 520, 520, 2.4, 'w3:throat', { o: tt => ({ block: tt > T('w3:collapses') }) }), A('brainS', 1100, 520, 2.0, 'w3:brain', { shake: ['w3:jolts', 1.2], pulse: ['w3:jolts'] }), A('alarmC', 1580, 520, 1.6, 'w3:awake')],
      fx: [['zap', 0, 1, 'w3:jolts', 0.6, '#ffd98a']], tag: [['SLEEP APNEA', 'w3:up', 520, 965, '#5b4fd6', 38]], lab: [['DOZENS–HUNDREDS OF TIMES A NIGHT', 'w3:dozens', 1350, 965, WHITE, 26]] },
    { at: 'w4', cast: [A('cloudS', 400, 500, 1.8, 'w4'), A('napper', 860, 560, 1.8, 'w4:daytime'), A('pillC', 1300, 400, 1.3, 'w4:allergy'), A('pillC', 1300, 690, 1.3, 'w4:semantic'), A('pillC', 1650, 540, 1.3, 'w4:painkillers')],
      lab: [['COMMON MEDICINES', 'w4:medicines', 1450, 965, GOLD, 30]] },
    QB('w5q', [A('brainS', 760, 540, 2.1, 'w5q+0.2', { o: { hot: 0.4 } }), A('napper', 1180, 560, 1.6, 'w5q:naps')]),
    { at: 'w6', cast: [A('elder', 400, 560, 2.0, 'w6:older'), A('elder', 760, 560, 2.0, 'w6:older+0.2', { o: { col: '#b48cff' } }), A('sensorW', 1200, 520, 1.8, 'w6:risk'), A('calDay', 1620, 500, 1.6, 'w6:14', { o: { m: 'UP TO', d: '14Y' } })],
      lab: [['1,400+ OLDER ADULTS · 2022', 'w6:1', 580, 820, WHITE, 28]] },
    { at: 'w7', cast: [A('brainS', 380, 380, 1.4, 'w7:sharp'), A('napper', 760, 380, 1.2, 'w7:daily'), A('brainS', 380, 700, 1.4, 'w7:diagnosis', { o: { hot: 0.6 } }), A('napper', 760, 700, 1.7, 'w7:diagnosis')],
      lab: [['+11 MIN A YEAR', 'w7:11', 1300, 380, GOLD, 34], ['+68 MIN A YEAR AFTER DIAGNOSIS', 'w7:68', 1300, 700, '#ff9fb4', 32]] },
    { at: 'w8', cast: [A('elder', 360, 560, 2.0, 'w8:older'), A('clock3', 760, 400, 1.3, 'w8:hour'), A('brainS', 1220, 520, 2.4, 'w8:wake', { o: tt => ({ hot: clamp((tt - T('w8:destroy')) / 1.0) }) }), A('tangle', 1220, 520, 1.0, 'w8:tangles', { erase: 'w8:destroy+1.4' })],
      num: [['w8:40', 760, 760, '+40%', 'ALZHEIMER\'S · > 1 HOUR A DAY']], lab: [['ONE THEORY: WAKE CELLS LOST', 'w8:theory', 1300, 965, WHITE, 28]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [A('napper', 760, 560, 2.2, 'o1+0.2'), A('alarmC', 1180, 420, 1.2, 'o1:smart')]),
    { at: 'o2', cast: [A('clock3', 330, 500, 1.6, 'o2:10'), A('sunC', 700, 500, 1.4, 'o2:early'), A('alarmC', 1050, 500, 1.6, 'o2:alarm'), A('sun', 1400, 380, 1.2, 'o2:morning'), A('doctor', 1650, 560, 1.8, 'o2:doctor')],
      lab: [['10–20 MIN · EARLY AFTERNOON · ALARM', 'o2:10', 700, 800, GOLD, 28], ['SUDDENLY NAPPING MORE? SEE A DOCTOR', 'o2:suddenly', 1200, 965, WHITE, 28]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [A('napper', 420, 560, 2.0, 'o3'), A('battery', 420, 300, 1.3, 'o3', { o: { level: 0.9, charge: 1 } })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'ARE NAPS GOOD', 'OR BAD FOR YOU?', 1240, 54, 80);
}
const CHAPTERS = [['s1', 'The 19-year study', 'indigo', 'sensorW'], ['d1', 'The afternoon crash', 'gold', 'desk'], ['p1', 'The perfect nap length', 'teal', 'alarmC'], ['k1', 'The coffee nap', 'cream', 'coffee'], ['h1', 'Long naps and your heart', 'coral', 'heartR'], ['r1', 'Cause or clue?', 'grey', 'puzzle'], ['w1', 'When naps are a warning', 'night', 'smokeAlarm']];
function SECTIONS() { return makeSections(CHAPTERS, { s1: [sStudy, 's2'], d1: [sCrash, 'd2'], p1: [sLength, 'p2'], k1: [sCoffee, 'k2'], h1: [sHeart, 'h2'], r1: [sCause, 'r2'], w1: [sWarn, 'w2'] }, sOpen, sOutro); }
