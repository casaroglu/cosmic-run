// "Christmas is the riskiest day for your heart" — topic file (engine + common.js cast system + icons2.js)
function calPair(t) { }
// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [A('xtree', 640, 540, 2.4, 'c1:christmas'), A('heartR', 1150, 540, 2.3, 'c1:heart', { o: { rate: 1.6 }, shake: ['c1:bad', 0.8] })] },
    { at: 'c2', cast: [A('globeP', 330, 500, 1.7, 'c2:sweden'), A('heartR', 720, 520, 1.8, 'c2:heart', { o: { pain: 1 } }), A('stopwatch', 1080, 520, 1.6, 'c2:minute'), A('snowpile', 1440, 360, 1.3, 'c2:blizzard', { grey: 'c2:monday' }), A('calDay', 1440, 700, 1.4, 'c2:monday', { o: { m: 'MON', d: '8AM', col: '#5b6585' }, grey: 'c2:christmas' }), A('xtree', 1720, 520, 1.6, 'c2:christmas', { pulse: ['c2:10pm'] })],
      num: [['c2:283', 720, 220, '283,000', 'HEART ATTACKS, TIMED']], tag: [['CHRISTMAS EVE · ~10 P.M.', 'c2:christmas', 1250, 965, '#e2457a', 38]] },
    { at: 'c3', cast: [A('calDay', 360, 500, 1.9, 'c3:christmas', { o: { d: '24' } }), A('heartR', 780, 520, 2.0, 'c3:jumped', { o: { pain: 1, rate: 1.8 }, pulse: ['c3:37'] }), A('calDay', 1250, 500, 1.5, 'c3:ordinary', { o: { m: 'DEC', d: '10', col: '#5b6585' } }), A('calDay', 1620, 400, 1.2, 'c3:day', { o: { d: '25' } }), A('calDay', 1620, 680, 1.2, 'c3:after', { o: { d: '26' } })],
      num: [['c3:37', 780, 220, '+37%', 'HEART ATTACKS ON CHRISTMAS EVE']] },
    QB('c4q', [A('globeP', 760, 540, 2.2, 'c4q+0.2'), A('heartR', 1180, 540, 1.6, 'c4q:swedish')]),
    { at: 'c5', cast: [A('globeP', 330, 500, 1.6, 'c5:america'), A('heartR', 760, 520, 1.8, 'c5:heart', { o: { pain: 1 } }), A('hospital', 1200, 520, 1.8, 'c5:hospital'), A('calDay', 1620, 500, 1.7, 'c5:deadliest', { o: { d: '25' }, pulse: ['c5:deadliest'] })],
      lab: [['BEFORE REACHING A HOSPITAL BED', 'c5:before', 980, 800, WHITE, 28]], tag: [['CHRISTMAS DAY: THE DEADLIEST', 'c5:deadliest', 1100, 965, '#e2457a', 36]] },
    { at: 'c6', cast: [A('wind', 230, 360, 1.2, 'c6:cold'), A('shovel', 460, 680, 1.2, 'c6:shovel'), A('ham', 700, 360, 1.2, 'c6:feast'), A('wineG', 920, 690, 1.3, 'c6:wine'), A('adren', 1160, 360, 1.2, 'c6:stress'), A('fluV', 1400, 690, 1.2, 'c6:flu'), A('heartR', 1650, 480, 1.8, 'c6:decision', { o: { pain: 1 }, shake: ['c6:fatal', 0.8] })],
      fx: [['stream', 0, 6, 'c6:trail', 'c6>', { col: '#ff9fb4', n: 10 }]] },
  ], 'a1'));
}
// ---------- 1 Christmas Eve, 10 p.m. ----------
function sEve(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('a1', [A('clock', 760, 540, 2.2, 'a1+0.2', { o: { h: 10, m: 0 } }), A('xtree', 1180, 540, 1.7, 'a1:10pm')]),
    { at: 'a2', cast: [A('globeP', 330, 500, 1.6, 'a2:sweden'), A('docV', 720, 500, 1.8, 'a2:registry', { o: { title: 'SWEDEHEART', ticks: 0 } }), A('hospital', 1120, 520, 1.7, 'a2:coronary'), A('stopwatch', 1540, 500, 1.6, 'a2:minute'), A('heartR', 1540, 260, 0.8, 'a2:chest', { o: { pain: 1 } })],
      lab: [['1998–2013 · EVERY CASE', 'a2:1998', 720, 800, GOLD, 28]] },
    { at: 'a3', cast: [A('stopwatch', 330, 500, 1.4, 'a3:minutes', { mv: [['a3:calendar', 660, 480, 80]] }), A('calDay', 820, 500, 1.9, 'a3:calendar', { o: { d: '24' } }), A('calDay', 1300, 500, 1.6, 'a3:earlier', { o: { m: 'DEC', d: '10', col: '#5b6585' } }), A('snow', 1620, 400, 1.2, 'a3:weather'), A('snow', 1620, 680, 1.2, 'a3:same')],
      lab: [['SAME SEASON, TWO WEEKS EARLIER', 'a3:earlier', 1300, 800, WHITE, 28]] },
    { at: 'a4', cast: [A('chart', 960, 520, 2.6, 'a4', { o: tt => ({ v: [0.37, 0.29, 0.21, 0.20].map((v, i) => v * 2.2 * clamp((tt - T(['a4:37', 'a4:29', 'a4:21', 'a4:20'][i])) / 0.6)), hi: 0 }) })],
      lab: [['DEC 24 · +37%', 'a4:37', 380, 360, '#ff9fb4', 30], ['DEC 25 · +29%', 'a4:29', 380, 520, WHITE, 28], ['DEC 26 · +21%', 'a4:21', 1540, 360, WHITE, 28], ['JAN 1 · +20%', 'a4:20', 1540, 520, WHITE, 28]] },
    { at: 'a5', cast: [A('clock', 420, 500, 1.9, 'a5:normally', { o: { h: 8, m: 0 } }), A('sun', 420, 230, 0.9, 'a5:morning'), A('clock', 1050, 500, 2.2, 'a5:christmas', { o: { h: 10, m: 0 }, pulse: ['a5:10'] }), A('moon2', 1050, 230, 0.9, 'a5:night'), A('ham', 1550, 380, 1.2, 'a5:dinner'), A('gift', 1550, 690, 1.3, 'a5:gifts')],
      lab: [['USUAL PEAK: 8 A.M.', 'a5:8', 420, 800, WHITE, 28], ['CHRISTMAS EVE: 10 P.M.', 'a5:10', 1050, 800, GOLD, 30]] },
    QB('a6q', [A('heartR', 760, 540, 2.1, 'a6q+0.2', { o: { pain: 1 } })]),
    { at: 'a7', cast: [A('elder', 330, 560, 1.9, 'a7:75'), A('drop', 700, 500, 1.4, 'a7:diabetes', { o: {} }), A('heartR', 1060, 520, 1.8, 'a7:heart', { o: { pain: 1 } }), A('heartR', 1480, 520, 2.0, 'a7:fragile', { push: [['a7:pushed', 120, 0]], shake: ['a7:pushed', 0.8] })],
      lab: [['OVER 75 · DIABETES · HEART DISEASE', 'a7:75', 700, 800, WHITE, 28], ['PUSHED OVER THE EDGE', 'a7:pushed', 1480, 965, '#ff9fb4', 30]] },
    { at: 'a8', cast: [A('globeP', 330, 500, 1.5, 'a8:world'), A('check', 330, 760, 0.9, 'a8:didn'), A('gift', 760, 500, 1.4, 'a8:easter', { o: { col: '#b48cff' } }), A('check', 760, 760, 0.9, 'a8:easter+0.5'), A('sun', 1250, 480, 1.6, 'a8:summer'), A('heartR', 1620, 480, 1.4, 'a8:12', { pulse: ['a8:12'] })],
      lab: [['SPORTS · EASTER: NO RISE', 'a8:neither', 560, 965, WHITE, 28], ['MIDSUMMER: +12%', 'a8:12', 1430, 965, GOLD, 30]] },
    { at: 'a9', cast: [A('alarmC', 330, 500, 1.8, 'a9:alarm'), A('carS', 780, 520, 1.6, 'a9:commute'), A('desk', 1220, 540, 1.7, 'a9:work'), A('heartR', 1620, 500, 1.6, 'a9:heart', { o: { rate: 1.6 }, pulse: ['a9:rise'] })],
      tag: [['MONDAY MORNINGS', 'a9:monday', 960, 965, '#5b4fd6', 36]] },
  ], 'b1'));
}
// ---------- 2 America's deadliest days ----------
function sUS(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('b1', [A('globeP', 760, 540, 2.2, 'b1+0.2'), A('docV', 1180, 540, 1.6, 'b1:data', { o: { title: 'DEATHS', ticks: 0 } })]),
    { at: 'b2', cast: [A('adult', 330, 560, 1.9, 'b2:sociologist'), A('docV', 760, 500, 1.6, 'b2:certificates', { o: { title: 'CERTIFICATE', ticks: 0 } }), A('docV', 900, 520, 1.6, 'b2:certificates+0.15', { o: { title: 'CERTIFICATE', ticks: 0 } }), A('docV', 1040, 540, 1.6, 'b2:certificates+0.3', { o: { title: 'CERTIFICATE', ticks: 0 } }), A('magnifier', 1500, 500, 1.6, 'b2:combed', { mv: [['b2:american', 1250, 480]] })],
      num: [['b2:53', 1520, 760, '53 MILLION', 'U.S. DEATH CERTIFICATES · 1973–2001']] },
    { at: 'b3', cast: [A('house', 330, 520, 1.8, 'b3:home'), A('ambulance', 760, 540, 1.8, 'b3:way', { mv: [['b3:hospital', 900, 540]] }), A('hospital', 1250, 520, 1.8, 'b3:emergency')],
      fx: [['stream', 0, 2, 'b3:way', 'b3:emergency', { col: '#ff9fb4', n: 6 }]], lab: [['DEC 25 > DEC 26 > JAN 1', 'b3:december', 960, 965, GOLD, 34]] },
    { at: 'b4', cast: [A('xtree', 420, 520, 1.9, 'b4:christmas'), A('calDay', 800, 500, 1.6, 'b4:new', { o: { m: 'JAN', d: '1' } }), A('chart', 1350, 520, 2.2, 'b4:bump', { o: tt => ({ v: [0.3, 0.45, 0.6, 0.8].map(v => v * clamp((tt - T('b4:grew')) / 1.2) + 0.2), hi: 3 }) })],
      lab: [['THE HOLIDAY BUMP GREW OVER THE DECADES', 'b4:grew', 960, 965, WHITE, 28]] },
    { at: 'b4b', cast: [A('house', 420, 520, 2.0, 'b4b:nursing', { o: { warm: 1 } }), A('elder', 820, 560, 1.8, 'b4b:homes'), A('plate', 1240, 520, 1.5, 'b4b:meals', { o: {} }), A('cross', 1620, 520, 1.2, 'b4b:alone')],
      lab: [['EVEN IN NURSING HOMES', 'b4b:nursing', 620, 800, GOLD, 30], ['FOOD AND COLD ALONE CAN\'T EXPLAIN IT', 'b4b:alone', 1100, 965, WHITE, 28]] },
    QB('b5q', [A('snow', 760, 540, 2.0, 'b5q+0.2'), A('heartR', 1180, 540, 1.6, 'b5q:winter')]),
    { at: 'b6', cast: [A('doctor', 330, 560, 1.9, 'b6:cardiologist'), A('palm', 760, 520, 1.9, 'b6:los'), A('sun', 1100, 330, 1.2, 'b6:sunny'), A('chart', 1450, 560, 2.0, 'b6:december', { o: { v: [0.85, 0.8, 0.6, 0.62], hi: 0 } })],
      num: [['b6:third', 1100, 760, '+1/3', 'DEC–JAN VS SUMMER · LOS ANGELES']] },
    { at: 'b7', cast: [A('palm', 400, 520, 1.9, 'b7:la'), A('shovel', 820, 520, 1.6, 'b7:shovels', { morph: ['b7:yet', 'cross'] }), A('heartR', 1250, 520, 2.0, 'b7:winter', { pulse: ['b7:bump'] }), A('question', 1640, 500, 1.3, 'b7:season')],
      lab: [['COLD MATTERS — BUT IT\'S NOT THE WHOLE STORY', 'b7:cold', 960, 965, GOLD, 28]] },
  ], 'k1'));
}
// ---------- 3 cold squeezes the pipes ----------
function sCold(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('k1', [A('wind', 700, 540, 2.0, 'k1+0.2'), A('artery', 1180, 540, 2.0, 'k1:arteries', { o: tt => ({ squeeze: clamp((tt - T('k1:cold')) / 1.0) }) })]),
    { at: 'k2', cast: [A('wind', 300, 400, 1.6, 'k2:air', { mv: [['k2:skin', 520, 420]] }), A('artery', 860, 500, 2.4, 'k2:vessels', { o: tt => ({ squeeze: clamp((tt - T('k2:clamp')) / 1.0) }) }), A('heartR', 1340, 500, 2.0, 'k2:heart', { o: tt => ({ rate: tt > T('k2:push') ? 1.8 : 1 }) }), A('bpGauge', 1690, 500, 1.4, 'k2:pressure', { o: tt => ({ v: 0.4 + 0.5 * clamp((tt - T('k2:climbs')) / 1.0) }) })],
      fx: [['stream', 0, 1, 'k2:skin', 'k2:clamp', { col: '#dfefff', n: 6 }]], lab: [['NARROWER PIPES', 'k2:narrower', 860, 800, GOLD, 30]] },
    { at: 'k3', cast: [A('heartR', 380, 500, 2.0, 'k3:arteries'), A('artery', 380, 800, 1.2, 'k3:tighten', { o: { squeeze: 0.7 } }), A('drop', 900, 500, 1.6, 'k3:thicker', { pulse: ['k3:stickier'] }), A('artery', 1450, 500, 2.4, 'k3:platelets', { o: tt => ({ clot: 0.7 * clamp((tt - T('k3:clump')) / 1.2) }) })],
      lab: [['THICKER, STICKIER BLOOD', 'k3:thicker', 900, 800, WHITE, 28], ['PLATELETS CLUMP INTO CLOTS', 'k3:clump', 1450, 965, '#ff9fb4', 28]] },
    { at: 'k4', cast: [A('artery', 760, 500, 3.0, 'k4', { o: tt => ({ plaque: 1, crack: tt > T('k4:crack'), clot: clamp((tt - T('k4:clot')) / 1.4) }) }), A('bpGauge', 300, 360, 1.3, 'k4:spike', { o: { v: 0.95 }, mv: [['k4:crack', 520, 420]] }), A('heartR', 1500, 500, 2.0, 'k4:heart', { o: tt => ({ pain: tt > T('k4:cut') }), shake: ['k4:cut', 1.0] })],
      tag: [['PLAQUE CRACKS · A CLOT GROWS', 'k4:crack', 760, 965, '#9b3352', 34]] },
    QB('k5q', [A('shovel', 760, 540, 2.0, 'k5q+0.2'), A('snowpile', 1180, 560, 1.6, 'k5q:snow')]),
    { at: 'k6', cast: [A('adult', 330, 560, 1.9, 'k6:men', { o: { mood: 'stress' } }), A('shovel', 620, 520, 1.6, 'k6:shoveling'), A('heartR', 900, 500, 1.7, 'k6:170', { o: { rate: 2.2 } }), A('snowblower', 1350, 540, 1.8, 'k6:snow'), A('heartR', 1700, 500, 1.4, 'k6:120', { o: { rate: 1.3 } })],
      lab: [['~170 BEATS/MIN', 'k6:170', 760, 800, '#ff9fb4', 30], ['~120 WITH A SNOWBLOWER', 'k6:120', 1520, 800, GOLD, 28]] },
    { at: 'k7', cast: [A('muscle', 380, 500, 2.0, 'k7:armwork'), A('heartR', 820, 500, 2.0, 'k7:strains', { o: { rate: 2 }, hit: ['k7:strains'] }), A('adult', 1260, 560, 1.9, 'k7:breath', { o: { mood: 'stress' }, shake: ['k7:heave', 0.8] }), A('bpGauge', 1640, 500, 1.4, 'k7:soaring', { o: tt => ({ v: 0.4 + 0.55 * clamp((tt - T('k7:soaring')) / 0.8) }) })],
      lab: [['HOLDING YOUR BREATH', 'k7:breath', 1260, 965, WHITE, 28]] },
    { at: 'k8', cast: [A('globeP', 330, 500, 1.5, 'k8:quebec'), A('docV', 720, 500, 1.6, 'k8:records', { o: { title: '30+ YEARS', ticks: 0 } }), A('snowpile', 1120, 520, 1.7, 'k8:snowfall'), A('adult', 1500, 560, 1.7, 'k8:men', { o: { mood: 'sick' }, mv: [['k8:hospital', 1600, 580]] }), A('hospital', 1760, 360, 1.0, 'k8:hospital')],
      lab: [['AFTER BIG SNOWFALLS, MORE HEART ATTACKS IN MEN', 'k8:after', 960, 965, GOLD, 28]] },
    { at: 'k9', cast: [A('calDay', 380, 500, 1.6, 'k9:day', { o: { m: 'DAY', d: '+1' } }), A('snowpile', 800, 500, 1.6, 'k9:storms'), A('adult', 1250, 560, 1.8, 'k9:men', { o: { col: '#2b3a6a' } }), A('adult', 1620, 560, 1.8, 'k9:women', { o: { col: '#e2457a', hair: '#7a4a2c' } })],
      lab: [['STRONGEST THE DAY AFTER', 'k9:day', 600, 800, GOLD, 28], ['WOMEN: WEAK OR NO LINK', 'k9:women', 1440, 800, WHITE, 28]] },
  ], 'f1'));
}
// ---------- 4 the holiday feast ----------
function sFeast(t) {
  worldBG(t, 'gold');
  beats(t, chainB([
    QB('f1', [A('ham', 760, 540, 2.0, 'f1+0.2'), A('heartR', 1180, 540, 1.6, 'f1:heart')]),
    { at: 'f2', cast: [A('doctor', 330, 560, 1.8, 'f2:presented'), A('ham', 760, 520, 1.8, 'f2:heavy'), A('clock3', 1150, 500, 1.4, 'f2:two'), A('heartR', 1550, 520, 1.9, 'f2:risk', { o: { pain: 1 }, pulse: ['f2:four'] })],
      num: [['f2:four', 1150, 230, '~4×', 'RISK IN THE 2 HOURS AFTER (ONE STUDY)']] },
    { at: 'f3', cast: [A('plate', 300, 520, 1.6, 'f3:fatty'), A('drop', 650, 380, 1.2, 'f3:fat', { o: {} }), A('artery', 1150, 520, 2.4, 'f3:bloodstream', { o: tt => ({ squeeze: 0.5 * clamp((tt - T('f3:relaxing')) / 1.0) }) })],
      fx: [['stream', 0, 2, 'f3:floods', 'f3>', { col: '#ffd36b', n: 10 }]], lab: [['INSULIN SURGES · FAT FLOODS IN', 'f3:insulin', 960, 965, WHITE, 28]] },
    { at: 'f4', cast: [A('salt', 330, 500, 1.7, 'f4:salt', { mv: [['f4:pulls', 600, 470]] }), A('ham', 330, 800, 1.1, 'f4:ham'), A('drop', 850, 500, 1.6, 'f4:water'), A('artery', 1300, 500, 2.2, 'f4:artery', { o: { squeeze: 0.2 } }), A('bpGauge', 1700, 500, 1.4, 'f4:rises', { o: tt => ({ v: 0.4 + 0.5 * clamp((tt - T('f4:rises')) / 0.8) }) })],
      fx: [['stream', 2, 3, 'f4:water', 'f4>', { col: '#5aa9e6', n: 8 }]], lab: [['MORE FLUID PRESSES ON THE WALLS', 'f4:fluid', 1100, 965, GOLD, 28]] },
    QB('f5q', [A('eggnog', 760, 540, 1.9, 'f5q+0.2'), A('wineG', 1150, 540, 1.9, 'f5q:wine')]),
    { at: 'f6', cast: [A('doctor', 330, 560, 1.8, 'f6:1978'), A('wineG', 760, 520, 1.6, 'f6:drinkers', { mv: [['f6:thrown', 1000, 500]] }), A('ecgM', 1300, 520, 1.9, 'f6:heartbeat', { o: tt => ({ fast: tt > T('f6:thrown') }) }), A('calDay', 1680, 500, 1.3, 'f6:weekend', { o: { m: 'WEEKEND', d: 'SAT' } })],
      tag: [['HOLIDAY HEART SYNDROME', 'f6:holiday', 960, 965, '#9b3352', 38]] },
    { at: 'f7', cast: [A('heartR', 520, 520, 2.6, 'f7:atrial', { o: { rate: 3.2 }, shake: ['f7:quiver', 2.0] }), A('drop', 960, 400, 1.2, 'f7:pool', { o: {} }), A('artery', 960, 700, 1.4, 'f7:clots', { o: { clot: 0.8 } }), A('brainS', 1500, 520, 2.0, 'f7:brain', { hit: ['f7:brain+0.6'] })],
      fx: [['stream', 2, 3, 'f7:travel', 'f7>', { col: '#a3243a', n: 5, r: 12 }]], tag: [['ATRIAL FIBRILLATION', 'f7:atrial', 520, 965, '#5b4fd6', 36]] },
    { at: 'f8', cast: [A('adult', 400, 560, 1.9, 'f8:people'), A('wineG', 760, 520, 1.5, 'f8:single'), A('heartR', 1150, 520, 1.9, 'f8:fluttering', { o: { rate: 2.6 } }), A('doctor', 1570, 560, 1.9, 'f8:doctor')],
      lab: [['A RACING, FLUTTERING HEART → SEE A DOCTOR', 'f8:doctor', 960, 965, GOLD, 28]] },
  ], 's1'));
}
// ---------- 5 stress and waiting ----------
function sStress(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('s1', [A('table', 760, 560, 2.2, 's1+0.2', { o: { tense: 1 } }), A('heartR', 1180, 520, 1.5, 's1:heart')]),
    { at: 's2', cast: [A('cloudS', 330, 360, 1.3, 's2:anger'), A('cloudS', 330, 700, 1.3, 's2:grief', { o: { col: '#4a5370' } }), A('adren', 760, 520, 1.8, 's2:adrenaline'), A('heartR', 1200, 520, 2.0, 's2:speed', { o: tt => ({ rate: tt > T('s2:speed') ? 2.2 : 1 }), hit: ['s2:speed'] }), A('artery', 1620, 520, 1.6, 's2:squeeze', { o: tt => ({ squeeze: clamp((tt - T('s2:squeeze')) / 0.8) }) })],
      fx: [['stream', 2, 3, 's2:release', 's2>', { col: '#ffd36b', n: 8 }]], tag: [['STRESS HORMONES', 's2:hormones', 760, 965, '#9b3352', 36]] },
    { at: 's3', cast: [A('adult', 400, 560, 2.0, 's3:angry', { o: { mood: 'stress' }, shake: ['s3:outburst', 1.0] }), A('clock3', 820, 500, 1.4, 's3:two'), A('heartR', 1200, 500, 1.8, 's3:heart', { o: { pain: 1 } }), A('table', 1600, 560, 1.6, 's3:tense', { o: { tense: 1 } })],
      num: [['s3:five', 820, 230, '~5×', '2 HOURS AFTER AN ANGRY OUTBURST']], lab: [['SMALL RISK FOR MOST PEOPLE', 's3:small', 1100, 965, WHITE, 28]] },
    { at: 's4', cast: [A('plane', 300, 500, 1.4, 's4:travel'), A('moon2', 640, 500, 1.4, 's4:late'), A('ham', 980, 500, 1.4, 's4:cooking'), A('bed', 1300, 520, 1.4, 's4:sleep', { grey: 's4:sleep+0.4' }), A('heartR', 1650, 500, 1.6, 's4:swedish', { o: { rate: 1.8 } })],
      fx: [['stream', 0, 4, 's4:mix', 's4>', { col: '#ff9fb4', n: 8 }]], lab: [['EMOTION + EXCESS', 's4:emotion', 960, 965, GOLD, 32]] },
    QB('s5q', [A('house', 760, 540, 2.0, 's5q+0.2'), A('heartR', 1180, 540, 1.5, 's5q:die')]),
    { at: 's6', cast: [A('table', 420, 560, 2.0, 's6:dinner'), A('heartR', 820, 360, 1.2, 's6:pressure', { o: { pain: 1 } }), A('xtree', 1200, 520, 1.8, 's6:ruining'), A('calDay', 1600, 500, 1.6, 's6:after', { o: { m: 'AFTER', d: 'JAN' } })],
      tag: [['"I\'LL SEE A DOCTOR AFTER THE HOLIDAYS"', 's6:doctor', 960, 965, '#5b4fd6', 32]] },
    { at: 's7', cast: [A('carS', 400, 520, 1.8, 's7:travel'), A('house', 820, 500, 1.6, 's7:home'), A('heartR', 1250, 500, 2.0, 's7:heart', { o: tt => ({ pain: 1, rate: tt > T('s7:minute') ? 2.2 : 1.2 }), grey: 's7:kills' }), A('stopwatch', 1650, 500, 1.6, 's7:minute')],
      lab: [['EVERY MINUTE KILLS MORE HEART MUSCLE', 's7:kills', 1100, 965, '#ff9fb4', 28]] },
    { at: 's8', cast: [A('question', 380, 500, 1.6, 's8:reasons'), A('hospital', 780, 500, 1.6, 's8:delayed'), A('doctor', 1180, 560, 1.7, 's8:staffing', { o: {} }), A('heartR', 1580, 500, 1.8, 's8:triggers', { pulse: ['s8:stack'] })],
      fx: [['stream', 0, 3, 's8:several', 's8>', { col: '#ffd98a', n: 6 }], ['stream', 1, 3, 's8:several', 's8>', { col: '#ffd98a', n: 6 }], ['stream', 2, 3, 's8:several', 's8>', { col: '#ffd98a', n: 6 }]], lab: [['SEVERAL TRIGGERS STACK UP', 's8:stack', 960, 965, GOLD, 30]] },
  ], 'v1'));
}
// ---------- 6 the flu connection ----------
function sFlu(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('v1', [A('fluV', 760, 540, 2.0, 'v1+0.2'), A('heartR', 1180, 540, 1.6, 'v1:heart')]),
    { at: 'v2', cast: [A('globeP', 330, 500, 1.5, 'v2:ontario'), A('tubeB', 680, 500, 1.4, 'v2:lab', { o: { txt: 'FLU +' } }), A('fluV', 1000, 360, 1.3, 'v2:flu', { mv: [['v2:first', 1300, 450, 60]] }), A('heartR', 1400, 540, 2.0, 'v2:heart', { o: { pain: 1 }, hit: ['v2:first'] }), A('calDay', 1720, 360, 1.1, 'v2:week', { o: { m: 'WEEK', d: '1' } })],
      num: [['v2:six', 1000, 760, '~6×', 'HEART ATTACK RISK · FIRST WEEK']] },
    { at: 'v2b', cast: [A('crowd', 400, 520, 2.0, 'v2b:20'), A('calDay', 860, 500, 1.6, 'v2b:2009', { o: { m: '2009–', d: '14' } }), A('adult', 1300, 560, 1.8, 'v2b:person'), A('calDay', 1650, 500, 1.4, 'v2b:ordinary', { o: { m: 'NORMAL', d: 'WK', col: '#5b6585' } })],
      lab: [['~20,000 FLU CASES', 'v2b:20', 400, 800, GOLD, 28], ['EACH PERSON VS THEIR OWN NORMAL WEEKS', 'v2b:compared', 1300, 965, WHITE, 26]] },
    { at: 'v3', cast: [A('chart', 760, 520, 2.4, 'v3', { o: { v: [0.9, 0.2, 0.2, 0.2], hi: 0 } }), A('stopwatch', 1450, 520, 1.8, 'v3:window')],
      lab: [['SHORT BUT SHARP', 'v3:sharp', 1450, 800, GOLD, 32]] },
    { at: 'v4', cast: [A('fluV', 300, 500, 1.6, 'v4:virus', { mv: [['v4:inflammation', 520, 480]] }), A('flame', 700, 500, 1.4, 'v4:inflammation'), A('artery', 1120, 500, 2.2, 'v4:plaques', { o: tt => ({ plaque: 1, crack: tt > T('v4:fragile'), clot: 0.5 * clamp((tt - T('v4:clotting')) / 1.0) }) }), A('thermoC', 1500, 500, 1.4, 'v4:fever', { o: { level: 0.9 } }), A('heartR', 1720, 500, 1.2, 'v4:harder', { o: { rate: 2 } })],
      lab: [['INFLAMMATION · FRAGILE PLAQUE · CLOTTING', 'v4:fragile', 960, 965, WHITE, 26]] },
    { at: 'v5', cast: [A('calDay', 360, 500, 1.6, 'v5:fall', { o: { m: 'STARTS', d: 'FALL' } }), A('chart', 800, 520, 2.0, 'v5:peaks', { o: { v: [0.2, 0.5, 0.9, 0.7], hi: 2 } }), A('house', 1260, 520, 1.8, 'v5:indoors'), A('table', 1640, 540, 1.5, 'v5:families')],
      lab: [['PEAKS DECEMBER–FEBRUARY', 'v5:december', 800, 800, GOLD, 30]] },
    QB('v6q', [A('syringeC', 760, 540, 1.8, 'v6q+0.2'), A('heartR', 1180, 540, 1.6, 'v6q:heart')]),
    { at: 'v7', cast: [A('syringeC', 330, 400, 1.5, 'v7:vaccination', { mv: [['v7:vaccination+0.8', 600, 460]] }), A('shieldC', 800, 520, 2.0, 'v7:fewer', { o: { txt: '−1/3' } }), A('heartR', 1200, 520, 2.0, 'v7:heart'), A('doctor', 1620, 560, 1.8, 'v7:cdc')],
      lab: [['~1/3 FEWER MAJOR HEART EVENTS', 'v7:third', 960, 800, GOLD, 30], ['CDC: A YEARLY FLU SHOT', 'v7:yearly', 960, 965, WHITE, 28]] },
  ], 'w1'));
}
// ---------- 7 know the warning signs ----------
function sSigns(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('w1', [A('adult', 760, 560, 2.2, 'w1+0.2', { o: { mood: 'sick' } }), A('heartR', 1180, 480, 1.4, 'w1:heart', { o: { pain: 1 } })]),
    { at: 'w2', cast: [A('adult', 600, 560, 2.8, 'w2', { o: { mood: 'sick' } }), A('heartR', 600, 520, 0.7, 'w2:pressure', { o: { pain: 1 }, pulse: ['w2:squeezing', 'w2:fullness', 'w2:pain'] }), A('stopwatch', 1300, 460, 1.6, 'w2:minutes'), A('cross', 1600, 700, 0.8, 'w2:away'), A('check', 1300, 760, 0.8, 'w2:comes')],
      lab: [['CENTER OF THE CHEST', 'w2:centre', 600, 920, GOLD, 30], ['> A FEW MINUTES, OR COMES BACK', 'w2:minutes', 1350, 270, WHITE, 26]] },
    { at: 'w3', cast: [A('adult', 600, 560, 2.8, 'w3', { o: { mood: 'sick' } }), A('heartR', 600, 520, 0.7, 'w3', { o: { pain: 1 } }), A('lungs', 1250, 380, 1.2, 'w3:shortness'), A('drop', 1600, 380, 1.1, 'w3:sweat'), A('gut', 1250, 720, 1.1, 'w3:nausea'), A('brainS', 1600, 720, 1.0, 'w3:lightedness')],
      fx: [['stream', 1, [380, 420], 'w3:arms', 'w3>', { col: '#ff6f7a', n: 6, arc: 20 }], ['stream', 1, [600, 300], 'w3:jaw', 'w3>', { col: '#ff6f7a', n: 6, arc: 10 }]],
      lab: [['ARMS · BACK · NECK · JAW · STOMACH', 'w3:spread', 600, 965, WHITE, 26]] },
    { at: 'w4', cast: [A('adult', 400, 560, 2.2, 'w4:women', { o: { col: '#e2457a', hair: '#7a4a2c', mood: 'sick' } }), A('lungs', 820, 360, 1.1, 'w4:breathlessness'), A('gut', 820, 700, 1.1, 'w4:nausea'), A('ham', 1300, 520, 1.6, 'w4:dinner'), A('question', 1650, 520, 1.2, 'w4:blame')],
      lab: [['QUIETER SIGNS IN WOMEN', 'w4:quieter', 600, 965, GOLD, 30], ['EASY TO BLAME ON THE FOOD', 'w4:blame', 1450, 800, WHITE, 26]] },
    QB('w5q', [A('phone911', 800, 540, 2.2, 'w5q+0.2')]),
    { at: 'w6', cast: [A('phone911', 380, 520, 2.2, 'w6:call', { shake: ['w6:call', 1.0] }), A('carS', 860, 520, 1.6, 'w6:drive', { morph: ['w6:anyone', 'cross'] }), A('ambulance', 1450, 520, 2.0, 'w6:paramedics', { mv: [['w6:way', 1350, 540]] })],
      tag: [['CALL 911 RIGHT AWAY', 'w6:call', 380, 965, '#e2457a', 36]], lab: [['TREATMENT STARTS ON THE WAY', 'w6:way', 1350, 800, GOLD, 28]] },
    { at: 'w7', cast: [A('gift', 520, 560, 2.0, 'w7:presence'), A('xtree', 900, 520, 2.0, 'w7:tree'), A('heartR', 1450, 520, 2.4, 'w7:heart', { o: { rate: 1.4 }, pulse: ['w7:can'] })],
      lab: [['THE PRESENTS CAN WAIT', 'w7:presence', 700, 965, GOLD, 32], ['YOUR HEART CAN\'T', 'w7:can', 1450, 965, '#ff9fb4', 32]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [A('heartR', 760, 540, 2.0, 'o1+0.2'), A('xtree', 1180, 540, 1.6, 'o1:christmas')]),
    { at: 'o2', cast: [A('syringeC', 260, 420, 1.2, 'o2:flu'), A('ham', 560, 520, 1.3, 'o2:feast'), A('salt', 820, 520, 1.2, 'o2:salt'), A('shovel', 1080, 520, 1.2, 'o2:shoveling', { morph: ['o2:shoveling+0.8', 'cross'] }), A('pillC', 1340, 520, 1.2, 'o2:medicines'), A('phone911', 1640, 520, 1.6, 'o2:911', { shake: ['o2:911', 0.8] })],
      lab: [['FLU SHOT · GO EASY · SKIP HEAVY SHOVELING · KEEP YOUR MEDS', 'o2:flu', 960, 800, WHITE, 24], ['CALL 911 TONIGHT, NOT IN JANUARY', 'o2:tonight', 960, 965, GOLD, 30]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [A('heartR', 420, 600, 2.0, 'o3', { o: { rate: 1.3 } }), A('xtree', 420, 300, 1.2, 'o3')], { id: 'outro', zoom: 0 });
  outroTitle(t, 'CHRISTMAS IS THE RISKIEST DAY', 'FOR YOUR HEART', 1240, 46, 76);
}
const CHAPTERS = [['a1', 'Christmas Eve, 10 p.m.', 'indigo', 'clock3'], ['b1', "America's deadliest days", 'night', 'calDay'], ['k1', 'Cold squeezes the pipes', 'teal', 'artery'], ['f1', 'The holiday feast', 'gold', 'ham'], ['s1', 'Stress and waiting', 'coral', 'adren'], ['v1', 'The flu connection', 'indigo', 'fluV'], ['w1', 'Know the warning signs', 'night', 'phone911']];
function SECTIONS() { return makeSections(CHAPTERS, { a1: [sEve, 'a2'], b1: [sUS, 'b2'], k1: [sCold, 'k2'], f1: [sFeast, 'f2'], s1: [sStress, 's2'], v1: [sFlu, 'v2'], w1: [sSigns, 'w2'] }, sOpen, sOutro); }
