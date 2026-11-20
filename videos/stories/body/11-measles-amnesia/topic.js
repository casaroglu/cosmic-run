// "Measles erases your immune memory" — topic file (engine + common.js cast system + icons2.js)
// Every line is a small picture-story: icons fly into, hit, erase, push and morph into each other.
Object.assign(ICONS, {
  cheek(t, o) {   // inside of the cheek with Koplik spots appearing (o.k 0..1)
    ell(0, 0, 80, 56, '#d64550'); ell(0, 4, 66, 44, '#ee6a78'); rr2(-70, -60, 140, 18, 9, '#f3f7fb'); rr2(-70, 44, 140, 18, 9, '#f3f7fb');
    const n = Math.round(14 * (o.k ?? 1)); for (let i = 0; i < n; i++) { const x = -44 + (i * 29) % 88, y = -22 + (i * 17) % 44; circ(x, y, 4.5 + Math.sin(t * 3 + i) * 0.8, '#ffffff'); circ(x, y, 9, 'rgba(255,255,255,0.18)'); }
  },
  virscan(t, o) {   // a tray of thousands of virus fragments; spots light up where antibodies grab (o.k 0..1)
    rr2(-84, -60, 168, 120, 14, '#3a3f5a'); for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) { const i = r * 10 + c, on = ((i * 37) % 60) / 60 < (o.k || 0) * 0.85; circ(-70 + c * 15.5, -44 + r * 17.5, 5.5, on ? (i % 3 ? '#ffd98a' : '#ff8f4a') : '#5b6585'); }
  },
  babycell(t) { ctx.save(); ctx.scale(0.8, 0.8); circ(0, 0, 50, '#9fc0f8'); circ(0, 0, 42, '#b8d2ff'); circ(4, 6, 18, '#6f9cf0'); eyes(t, -2, -10, 12, 6, '#102348', 0.4); circ(0, 18, 12, '#ffd36b'); rr2(-16, 14, 32, 8, 4, '#ff8fb8'); ctx.restore(); },
  waves(t, o) { },
});
Object.assign(IDLE, { cheek: {}, virscan: {}, babycell: { pre: t => ctx.rotate(Math.sin(t * 2.5) * 0.08) } });
const bc = (x, y, s, t0, mem, op = {}) => A('bcell', x, y, s, t0, { o: { mem }, ...op });
const MV = { o: {} };

// ---------- opening ----------
function sOpen(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    { at: 0, q: 'c1', cast: [A('album', 1250, 520, 2.6, 'c1:measles', { o: tt => ({ blank: clamp((tt - T('c1:erase')) / 1.4) }) }), A('measlesV', 380, 540, 2.2, 'c1:measles', { mv: [['c1:erase', 820, 470, 90]] }), A('eraser', 1640, 300, 1.7, 'c1:erase', { mv: [['c1:memory', 1330, 430]] })] },
    { at: 'c2', cast: [A('kid', 300, 560, 2.3, 'c2:rash', { o: tt => ({ spots: clamp((tt - T('c2:rash')) / 1.0) }) }), A('thermoC', 560, 540, 1.8, 'c2:fever', { o: tt => ({ level: 0.3 + 0.6 * clamp((tt - T('c2:fever')) / 1.0) }) }),
      bc(1120, 520, 2.3, 'c2:cells', 'fluV', { hit: ['c2:wipes'], grey: 'c2:wipes' }), A('measlesV', 860, 280, 1.6, 'c2:slips', { mv: [['c2:remember', 1080, 450, 60]] }), A('fluV', 1700, 330, 1.7, 'c2:germs', { mv: [['c2:back', 1520, 560, 80]] })] },
    { at: 'c3', cast: [A('calDay', 380, 500, 2.2, 'c3:november', { o: { m: 'NOV', d: '17' } }), A('globeP', 820, 500, 2.2, 'c3:pan'), A('shieldC', 1400, 500, 2.0, 'c3:united', { o: { txt: 'USA' }, morph: ['c3:lost', 'cross'], hit: ['c3:lost'] })],
      tag: [['U.S. LOST MEASLES ELIMINATION STATUS', 'c3:lost', 960, 965, '#e2457a', 36]], lab: [['HELD SINCE 2000', 'c3:held', 1400, 780, GOLD, 30]] },
    { at: 'c4', cast: [A('kid', 260, 640, 1.8, 'c4:chain', { o: { col: '#ff8f4a', sick: 1 } }), A('kid', 600, 640, 1.8, 'c4:measles', { o: tt => ({ col: '#8fd8e6', sick: tt > T('c4:spreading') }) }), A('kid', 940, 640, 1.8, 'c4:spreading', { o: tt => ({ col: '#b48cff', sick: tt > T('c4:full') }) }),
      A('measlesV', 260, 400, 1.2, 'c4:chain', { mv: [['c4:spreading', 600, 400, 120], ['c4:full', 940, 400, 120], ['c4:year', 1150, 300, 80]] }), A('calDay', 1150, 300, 1.4, 'c4:year', { o: { m: 'YEAR', d: '1' } })],
      num: [['c4:cases', 1520, 520, '5,412', 'U.S. CASES IN 2026']], lab: [['STATES REPORTED 10 DEATHS', 'c4:deaths', 1520, 760, '#ff9fb4', 30]] },
    { at: 'c4b', cast: [A('calDay', 380, 480, 2.0, 'c4b:canada', { o: { m: 'NOV', d: '2025' } }), A('globeP', 820, 480, 2.1, 'c4b:north'), A('school', 1420, 500, 2.2, 'c4b:classroom'), A('measlesV', 1000, 260, 1.3, 'c4b:settling', { mv: [['c4b:classroom', 1420, 330, 100]], hit: ['c4b:classroom'] })],
      lab: [['CANADA LOST IT A YEAR EARLIER', 'c4b:canada', 600, 780, WHITE, 30]] },
    QB('c5q', [A('measlesV', 900, 560, 2.6, 'c5q+0.2', { shake: ['c5q:actually', 0.8] }), A('kid', 400, 580, 2.0, 'c5q+0.4', { o: { spots: 1 } })]),
    { at: 'c6', cast: [A('kid', 360, 560, 2.2, 'c6:illness', { o: { spots: 1, sick: 1 } }), A('measlesV', 700, 520, 1.6, 'c6:follow', { mv: [['c6:memory', 1180, 470, 110]] }), A('album', 1450, 520, 2.4, 'c6:memory')],
      lab: [['YOUR IMMUNE SYSTEM\'S MEMORY BANK', 'c6:memory', 1300, 800, GOLD, 30]] },
  ], 'a1'));
}
// ---------- 1 the illness ----------
function sIll(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('a1', [A('kid', 700, 560, 2.6, 'a1+0.2', { o: { sick: 1 } }), A('measlesV', 1150, 420, 1.6, 'a1:catch', { mv: [['a1:measles', 860, 430, 60]], hit: ['a1:measles'] })]),
    { at: 'a2', cast: [A('thermoC', 330, 520, 1.9, 'a2:fever', { o: tt => ({ level: 0.3 + 0.65 * clamp((tt - T('a2:fever')) / 1.2) }) }), A('kid', 760, 560, 2.5, 'a2', { o: { sick: 1 } }), A('droplets', 1150, 420, 1.6, 'a2:cough', { mv: [['a2:runny', 1350, 380]] }), A('drop', 1150, 660, 1.4, 'a2:runny'), A('eye', 1600, 560, 1.7, 'a2:eyes', { o: { red: 1 } })],
      lab: [['LOOKS LIKE A BAD COLD', 'a2:cold', 960, 965, GOLD, 34]] },
    { at: 'a3', cast: [A('hglass', 330, 520, 1.8, 'a3'), A('cheek', 960, 520, 2.6, 'a3:spots', { o: tt => ({ k: clamp((tt - T('a3:spots')) / 1.2) }) }), A('magnifier', 1250, 330, 1.5, 'a3:spots', { mv: [['a3:salt', 1100, 420]] }), A('salt', 1600, 560, 1.7, 'a3:salt')],
      tag: [['KOPLIK SPOTS', 'a3:coplic', 960, 965, '#9b3352', 38]] },
    { at: 'a4', cast: [A('kid', 900, 520, 3.0, 'a4', { o: tt => ({ sick: 1, spots: clamp((tt - T('a4:rash')) / (T('a4:feet') - T('a4:rash') + 0.3)) }) })],
      lab: [['HAIRLINE', 'a4:hairline', 1450, 260, WHITE, 30], ['FACE · NECK', 'a4:face', 1450, 400, WHITE, 30], ['CHEST', 'a4:chest', 1450, 540, WHITE, 30], ['FEET', 'a4:feet', 1450, 680, WHITE, 30]] },
    { at: 'a4b', cast: [0, 1, 2, 3, 4].map(i => A('adult', 260 + i * 230, 560, 1.5, 'a4b+' + (0.1 + i * 0.12).toFixed(2), i === 4 ? { o: { col: '#e2457a', mood: 'sick' }, mv: [['a4b:hospital', 1560, 600, 120]] } : { o: { col: ['#5b4fd6', '#3fae6a', '#ff8f4a', '#127b84'][i] } })).concat([A('hospital', 1560, 330, 1.8, 'a4b:hospital')]),
      lab: [['1 IN 5 UNVACCINATED PATIENTS HOSPITALIZED', 'a4b:five', 960, 965, GOLD, 32]] },
    QB('a5q', [A('kid', 800, 560, 2.4, 'a5q+0.2', { o: { spots: 1 } }), A('shieldC', 1240, 520, 1.6, 'a5q:rash', { o: { crack: 1 } })]),
    { at: 'a6', cast: [A('kidsGroup', 340, 560, 2.0, 'a6:20'), A('lungs', 960, 520, 2.6, 'a6:lungs', { o: tt => ({ fill: 0.75 * clamp((tt - T('a6:fluid')) / 1.5) }) }), A('measlesV', 1500, 320, 1.6, 'a6:pneumonia', { mv: [['a6:lungs', 1150, 420, 60]], hit: ['a6:lungs'] }), A('drop', 1550, 660, 1.4, 'a6:fluid', { mv: [['a6:fluid+0.8', 1130, 640]] })],
      tag: [['PNEUMONIA · UP TO 1 IN 20 CHILDREN', 'a6:pneumonia', 960, 965, '#9b3352', 34]] },
    { at: 'a6b', cast: [A('lungs', 420, 360, 1.5, 'a6b:lung', { grey: 'a6b:die' }), A('brainS', 420, 690, 1.5, 'a6b:brain', { grey: 'a6b:die' })], num: [['a6b:one', 1200, 500, '1–3 IN 1,000', 'CHILDREN WHO CATCH IT DIE']] },
    { at: 'a7', cast: [A('brainS', 760, 520, 2.8, 'a7', { o: tt => ({ hot: clamp((tt - T('a7:inflames')) / 0.8) }) }), A('measlesV', 340, 360, 1.5, 'a7:virus', { mv: [['a7:inflames', 640, 450, 80]], hit: ['a7:inflames'] }), A('ear', 1450, 520, 1.9, 'a7:deaf', { o: tt => ({ deaf: tt > T('a7:deaf') + 0.4 }), morph: ['a7:lasting', 'cross'] })],
      tag: [['ENCEPHALITIS · ~1 IN 1,000', 'a7:encephalitis', 960, 965, '#9b3352', 36]] },
    { at: 'a8', cast: [A('brainS', 760, 520, 2.8, 'a8'), A('measlesV', 700, 500, 0.8, 'a8:hides', { o: { weak: 1 }, pulse: ['a8:wakes'], morph: ['a8:wakes', 'measlesV'] }), A('hglass', 1450, 500, 2.0, 'a8:seven')],
      fx: [['zap', 1, [1150, 300], 'a8:wakes', 0.6, '#ff9fb4']], tag: [['SSPE · ALWAYS FATAL', 'a8:sspe', 760, 965, '#2b3244', 36]], lab: [['7–10 YEARS LATER', 'a8:seven', 1450, 780, GOLD, 30]] },
  ], 'b1'));
}
// ---------- 2 the most contagious virus ----------
function room(t) { rr2(140, 760, 1640, 16, 8, 'rgba(255,255,255,0.12)'); }
function sAir(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('b1', [A('adult', 600, 560, 2.2, 'b1+0.2', { o: { mood: 'sick' } }), A('droplets', 1000, 460, 1.8, 'b1:spread', { mv: [['b1:easily', 1180, 420]] })]),
    { at: 'b2', cast: [A('adult', 360, 560, 2.3, 'b2', { o: { mood: 'sick' }, shake: ['b2:cough', 0.6] }), A('droplets', 560, 440, 1.0, 'b2:cough', { mv: [['b2:air', 1000, 400]], o: {} }), A('measlesV', 1000, 400, 0.9, 'b2:hang', { orbit: { c: [1100, 440], r: 140, w: 0.8 } }), A('measlesV', 1000, 400, 0.9, 'b2:invisible', { orbit: { c: [1100, 440], r: 140, w: 0.8, ph: 3.1 } })],
      fx: [['stream', [470, 470], [1080, 430], 'b2:cough', 'b2:smoke', { col: 'rgba(220,240,255,0.8)', n: 16, r: 7 }]], lab: [['HANGS IN THE AIR LIKE SMOKE', 'b2:smoke', 1100, 800, GOLD, 30]] },
    { at: 'b3', bg: room, cast: [A('adult', 400, 560, 2.0, 'b3', { o: { mood: 'sick' }, out: 'b3:left' }), A('droplets', 900, 420, 2.0, 'b3', {}), A('hglass', 900, 260, 1.4, 'b3:two'), A('adult', 1700, 560, 2.0, 'b3:walk', { o: { col: '#3fae6a' }, mv: [['b3:breathe', 1260, 560]], hit: ['b3:breathe'] })],
      fx: [['stream', [900, 420], [1250, 470], 'b3:breathe', 'b3>', { col: '#c7a8f0', n: 8 }]], lab: [['UP TO 2 HOURS', 'b3:two', 900, 820, GOLD, 32]] },
    { at: 'b3b', cast: [A('calDay', 360, 480, 1.9, 'b3b:four', { o: { m: 'BEFORE', d: '4' } }), A('kid', 960, 520, 2.4, 'b3b', { o: tt => ({ sick: 1, spots: tt > T('b3b:rash') ? 1 : 0 }) }), A('calDay', 1560, 480, 1.9, 'b3b:after', { o: { m: 'AFTER', d: '4' } })],
      fx: [['stream', [1000, 420], [380, 360], 'b3b:spread', 'b3b>', { col: '#c7a8f0', n: 8 }], ['stream', [1000, 420], [1540, 360], 'b3b:after', 'b3b>', { col: '#c7a8f0', n: 8 }]],
      lab: [['CONTAGIOUS 4 DAYS BEFORE THE RASH', 'b3b:four', 960, 965, WHITE, 30]] },
    { at: 'b4', cast: Array.from({ length: 10 }, (_, i) => A('adult', 300 + (i % 5) * 330, i < 5 ? 330 : 680, 1.45, 'b4+' + (0.1 + i * 0.07).toFixed(2), { o: tt => ({ col: ['#5b4fd6', '#3fae6a', '#ff8f4a', '#127b84', '#b48cff'][i % 5], mood: i < 9 && tt > T('b4:nine') + i * 0.08 ? 'sick' : 'happy' }), pulse: i < 9 ? ['b4:nine+' + (i * 0.08).toFixed(2)] : [] })),
      lab: [['UP TO 9 IN 10 CATCH IT', 'b4:nine', 960, 965, GOLD, 34]] },
    QB('b5q', [A('measlesV', 560, 540, 2.2, 'b5q+0.2'), A('fluV', 1100, 540, 2.2, 'b5q:other')]),
    { at: 'b6', cast: [A('measlesV', 330, 540, 2.1, 'b6'), A('crowd', 1000, 340, 1.7, 'b6:many'), A('crowd', 1000, 720, 1.7, 'b6:crowd'), A('crowd', 1560, 720, 1.7, 'b6:immunity')],
      fx: [['stream', 0, 1, 'b6:infects', 'b6>', { col: '#c7a8f0', n: 7 }], ['stream', 0, 2, 'b6:crowd', 'b6>', { col: '#c7a8f0', n: 7 }], ['stream', 0, 3, 'b6:twelve', 'b6>', { col: '#c7a8f0', n: 7 }]],
      num: [['b6:twelve', 1560, 300, '12–18', 'R NAUGHT · MEASLES']] },
    { at: 'b7', cast: [A('fluV', 300, 540, 1.9, 'b7:flu'), A('adult', 680, 560, 1.7, 'b7:quarter', { o: { mood: 'sick' } }), A('shieldC', 1220, 520, 2.0, 'b7:vaccination', { o: tt => ({ crack: tt > T('b7:slip') }), push: [['b7:slip', 60, 0]], hit: ['b7:slip'] }), A('measlesV', 1750, 520, 1.7, 'b7:measles', { mv: [['b7:slip', 1430, 520]] })],
      fx: [['stream', 0, 1, 'b7:only', 'b7:measles', { col: '#ffb08a', n: 4 }]], num: [['b7:quarter', 490, 240, '~1.3', 'FLU']] },
  ], 'd1'));
}
// ---------- 3 hijacking memory cells ----------
function sHijack(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('d1', [A('album', 700, 540, 2.4, 'd1+0.2'), A('measlesV', 1150, 380, 1.5, 'd1:reach', { mv: [['d1:memory', 900, 470, 60]] })]),
    { at: 'd2', cast: [bc(560, 480, 2.3, 'd2:memory', 'fluV'), A('tcell', 1360, 480, 2.3, 'd2:t'), A('poster', 900, 300, 1.2, 'd2:record', { o: { g: 'rhinoV' }, mv: [['d2:met', 680, 330, 40]] }), A('syringeC', 1720, 300, 1.2, 'd2:vaccinated', { mv: [['d2:vaccinated+0.8', 1540, 360]] })],
      lab: [['MEMORY B CELL', 'd2:memory', 560, 780, GOLD, 30], ['MEMORY T CELL', 'd2:t', 1360, 780, GOLD, 30]] },
    { at: 'd3', cast: [A('measlesV', 420, 520, 2.2, 'd3'), A('key', 0, 0, 1.3, 'd3:key', { follow: { i: 0, dx: 190, dy: 10 } }), A('tcell', 1380, 520, 2.3, 'd3:surface'), A('lockR', 0, 0, 1.1, 'd3:lock', { follow: { i: 2, dx: -170, dy: 0 } })],
      tag: [['RECEPTOR: CD150', 'd3:receptor', 1380, 830, '#5b4fd6', 36]], lab: [['MEMORY CELLS CARRY MORE LOCKS', 'd3:more', 900, 965, WHITE, 28]] },
    { at: 'd4', cast: [A('measlesV', 400, 520, 2.0, 'd4', { mv: [['d4:unlocks', 1130, 500, 120]], out: 'd4:copies' }), A('tcell', 1360, 520, 2.4, 'd4', { hit: ['d4:unlocks'], morph: ['d4:copies', 'measlesV'], erase: 'd4:destroyed' }), A('measlesV', 1360, 520, 0.9, 'd4:copies', { mv: [['d4:copies+1.0', 1700, 300, 60]] }), A('measlesV', 1360, 520, 0.9, 'd4:copies+0.3', { mv: [['d4:copies+1.3', 1720, 720, 60]] })],
      lab: [['UNLOCKS · MOVES IN · COPIES ITSELF', 'd4:unlocks', 900, 965, WHITE, 30]] },
    QB('d5q', [bc(800, 540, 2.4, 'd5q+0.2', 'fluV'), A('bcell', 1150, 540, 1.6, 'd5q:replace')]),
    { at: 'd6', cast: [0, 1, 2, 3, 4].map(i => A('bcell', 1800, 300 + (i % 2) * 380, 1.5, 'd6:flood+' + (i * 0.15).toFixed(2), { mv: [['d6:flood+' + (0.9 + i * 0.15).toFixed(2), 360 + i * 260, i % 2 ? 680 : 360, 60]] })).concat([A('chart', 1600, 520, 1.6, 'd6:counts', { o: { v: [0.6, 0.62, 0.6, 0.61] } })]),
      lab: [['NUMBERS COME BACK FAST', 'd6:numbers', 800, 965, GOLD, 32]] },
    { at: 'd7', cast: [bc(380, 360, 1.7, 'd7', 'fluV', { erase: 'd7:gone' }), bc(380, 700, 1.7, 'd7', 'rhinoV', { erase: 'd7:gone+0.2' }), bc(760, 530, 1.7, 'd7:colds', 'noroV', { erase: 'd7:gone+0.4' }),
      bc(1250, 360, 1.7, 'd7:only', 'measlesV'), bc(1560, 530, 1.7, 'd7:only+0.15', 'measlesV'), bc(1250, 700, 1.7, 'd7:only+0.3', 'measlesV')],
      lab: [['OLD MEMORIES', 'd7:remembered', 560, 965, '#ff9fb4', 30], ['MEASLES ONLY', 'd7:only', 1400, 965, GOLD, 30]] },
    { at: 'd8', cast: [A('shelf', 760, 520, 2.6, 'd8:library', { o: tt => ({ burn: clamp((tt - T('d8:fire')) / 1.0) * (tt < T('d8:restocked') ? 1 : 0), same: tt > T('d8:restocked') }), pulse: ['d8:restocked'] }), A('flame', 1300, 400, 1.6, 'd8:fire', { mv: [['d8:fire+0.6', 900, 480, 60]], out: 'd8:restocked' }), A('measlesV', 1450, 620, 1.4, 'd8:copies', { mv: [['d8:one', 1000, 560, 60]] })],
      lab: [['RESTOCKED WITH ONE BOOK', 'd8:restocked', 760, 965, WHITE, 30]] },
  ], 'e1'));
}
// ---------- 4 the 2019 proof ----------
function sProof(t) {
  worldBG(t, 'night');
  beats(t, chainB([
    QB('e1', [A('magnifier', 700, 520, 2.2, 'e1+0.2', { mv: [['e1:erased', 900, 500]] }), A('album', 1150, 560, 2.0, 'e1:memory', { o: { blank: 0.5 } })]),
    { at: 'e2', cast: [A('doctor', 340, 560, 2.1, 'e2:team'), A('kidsGroup', 1420, 540, 2.3, 'e2:children'), A('tubeB', 1420, 540, 1.3, 'e2:blood', { mv: [['e2:before', 780, 520, 120]] }), A('globeP', 900, 300, 1.4, 'e2:netherlands')],
      lab: [['77 UNVACCINATED CHILDREN · 2019', 'e2:77', 960, 965, GOLD, 32]] },
    { at: 'e3', cast: [A('tubeB', 360, 520, 2.0, 'e3'), A('virscan', 1150, 520, 2.6, 'e3:verscan', { o: tt => ({ k: clamp((tt - T('e3:grab')) / 1.0) }) })],
      fx: [['stream', 0, 1, 'e3:dips', 'e3>', { ic: 'antibody', s: 0.32, n: 7 }]], tag: [['VIRSCAN', 'e3:verscan', 1150, 830, '#5b4fd6', 38]] },
    { at: 'e4', cast: [A('album', 700, 520, 2.6, 'e4', { o: tt => ({ blank: 0.73 * clamp((tt - T('e4:lost')) / 1.2) }) }), A('measlesV', 1150, 300, 1.5, 'e4:measles', { mv: [['e4:lost', 860, 450, 60]], hit: ['e4:lost'] })],
      num: [['e4:11', 1460, 520, '11–73%', 'OF ANTIBODIES TO OTHER GERMS LOST']] },
    QB('e5q', [A('album', 800, 540, 2.4, 'e5q+0.2', { o: { blank: 0.75 } }), A('eraser', 1180, 420, 1.4, 'e5q:everything')]),
    { at: 'e6', cast: [A('fluV', 420, 360, 1.7, 'e6:viruses'), A('bact', 420, 700, 1.6, 'e6:bacteria'), A('antibody', 820, 360, 1.5, 'e6:antibodies', { erase: 'e6:vanished' }), A('antibody', 820, 700, 1.5, 'e6:antibodies+0.2', { erase: 'e6:vanished+0.2' }), A('kid', 1450, 530, 2.2, 'e6:already', { o: { spots: 1 } })],
      lab: [['VARIETY, IN THE HARDEST-HIT CHILD', 'e6:variety', 960, 965, WHITE, 28]] },
    { at: 'e6b', cast: [A('kid', 300, 520, 1.9, 'e6b:healthy'), A('album', 660, 520, 1.8, 'e6b:kept'), A('kid', 1240, 520, 1.9, 'e6b:normal', { o: { spots: 1, sick: 1 } }), A('album', 1600, 520, 1.8, 'e6b:normal', { o: { blank: 0.75 } })],
      lab: [['HEALTHY: ~90% KEPT', 'e6b:90', 480, 800, GOLD, 30], ['NOT NORMAL FORGETTING', 'e6b:normal', 1420, 800, '#ff9fb4', 30]] },
    { at: 'e7', cast: [A('thermoC', 300, 520, 1.7, 'e7:severe', { o: { level: 0.95 } }), A('album', 650, 520, 1.7, 'e7:more', { o: { blank: 0.9 } }), A('monkeyF', 1150, 520, 2.0, 'e7:monkeys'), A('album', 1550, 520, 1.7, 'e7:half', { o: { blank: 0.5 } })],
      lab: [['SEVERE CASE → BIGGER LOSS', 'e7:severe', 480, 800, WHITE, 28], ['MONKEYS: ~HALF STILL MISSING AT 5 MONTHS', 'e7:five', 1340, 800, GOLD, 26]] },
  ], 'f1'));
}
// ---------- 5 a baby-like immune system ----------
function sBaby(t) {
  worldBG(t, 'indigo');
  beats(t, chainB([
    QB('f1', [bc(800, 540, 2.4, 'f1+0.2', 'fluV', { shake: ['f1:reset', 0.6] }), A('hglass', 1200, 520, 1.6, 'f1:fully')]),
    { at: 'f2', cast: [A('doctor', 330, 560, 2.0, 'f2:team'), A('dna', 820, 500, 2.4, 'f2:genes'), A('kidsGroup', 1450, 540, 2.2, 'f2:children')],
      fx: [['stream', 2, 1, 'f2:read', 'f2>', { col: '#ffd98a', n: 8 }]], lab: [['26 UNVACCINATED DUTCH CHILDREN', 'f2:26', 960, 965, GOLD, 30]] },
    { at: 'f3', cast: [bc(420, 380, 1.7, 'f3:memory', 'fluV', { erase: 'f3:disappeared' }), bc(420, 690, 1.7, 'f3:memory+0.2', 'rhinoV', { erase: 'f3:disappeared+0.2' }), A('babycell', 1150, 380, 1.9, 'f3:fresh'), A('babycell', 1150, 690, 1.9, 'f3:fresh+0.2'), A('baby', 1600, 530, 1.8, 'f3:newborn')],
      lab: [['IMMATURE, LIKE A NEWBORN\'S', 'f3:immature', 960, 965, WHITE, 30]] },
    { at: 'f4', cast: [A('kid', 560, 520, 2.4, 'f4', { morph: ['f4:baby', 'baby'] }), A('bcell', 1000, 360, 1.4, 'f4:defenses', { morph: ['f4:less', 'babycell'] }), A('bcell', 1000, 690, 1.4, 'f4:defenses+0.2', { morph: ['f4:less+0.2', 'babycell'] }), A('kidsGroup', 1500, 520, 1.8, 'f4:school', { grey: 'f4:school+0.6' })],
      tag: [['A "BABY-LIKE" IMMUNE SYSTEM', 'f4:baby', 960, 965, '#5b4fd6', 36]] },
    { at: 'f4b', cast: [A('kid', 400, 540, 2.2, 'f4b', { o: { sick: 1 } }), A('calDay', 900, 480, 1.9, 'f4b:five', { o: { m: 'UP TO', d: '5Y' } }), A('chart', 1450, 520, 2.0, 'f4b:counts', { o: { v: [0.6, 0.6, 0.61, 0.6] } }), A('check', 1700, 300, 0.9, 'f4b:normal')],
      lab: [['COUNTS LOOK NORMAL · DEFENSES AREN\'T', 'f4b:normal', 960, 965, GOLD, 28]] },
    QB('f5q', [A('kid', 800, 560, 2.3, 'f5q+0.2', { o: { sick: 1 } }), A('fluV', 1200, 420, 1.5, 'f5q:sicker', { mv: [['f5q>', 1000, 470]] })]),
    { at: 'f6', cast: [A('ferret', 900, 560, 2.4, 'f6:ferrets', { o: tt => ({ sick: tt > T('f6:sicker') }), hit: ['f6:vaccinated+0.8', 'f6:caught+0.8', 'f6:hit+0.8'] }), A('syringeC', 300, 330, 1.3, 'f6:vaccinated', { mv: [['f6:vaccinated+0.8', 760, 470]], out: 'f6:caught' }),
      A('measlesV', 1600, 320, 1.4, 'f6:caught', { mv: [['f6:caught+0.8', 1060, 470]], out: 'f6:hit' }), A('antibody', 640, 720, 1.2, 'f6:antibodies', { erase: 'f6:dropped' }), A('fluV', 1600, 720, 1.5, 'f6:flu', { mv: [['f6:hit+0.8', 1060, 600]] })],
      lab: [['FLU ANTIBODIES DROPPED', 'f6:dropped', 960, 965, '#ff9fb4', 30]] },
  ], 'g1'));
}
// ---------- 6 the deadly shadow ----------
function waveChart(t, k1, k2, flat) {   // two waves: measles, then (2–3 years later) other infection deaths
  const x0 = 260, x1 = 1660, y0 = 760; rr2(x0, y0, x1 - x0, 6, 3, 'rgba(255,255,255,0.4)'); reg('hero', 'chart', x0, 380, x1, y0 + 10);
  const curve = (cx, h, col, k) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0, y0); for (let x = x0; x <= lerp(x0, x1, k); x += 8) ctx.lineTo(x, y0 - h * Math.exp(-(((x - cx) / 120) ** 2))); ctx.lineTo(lerp(x0, x1, k), y0); ctx.fill(); };
  curve(620, 340, 'rgba(155,107,214,0.85)', k1); curve(1220, 300 * (1 - flat * 0.8), 'rgba(226,69,122,0.8)', k2);
}
function sShadow(t) {
  worldBG(t, 'grey');
  beats(t, chainB([
    QB('g1', [A('hglass', 800, 540, 2.2, 'g1+0.2'), A('measlesV', 1180, 520, 1.6, 'g1:danger')]),
    { at: 'g2', cast: [A('docV', 380, 520, 1.8, 'g2:records', { o: { title: 'UNITED STATES', ticks: 0 } }), A('docV', 760, 520, 1.8, 'g2:england', { o: { title: 'ENGLAND', ticks: 0 } }), A('docV', 1140, 520, 1.8, 'g2:denmark', { o: { title: 'DENMARK', ticks: 0 } }), A('magnifier', 1600, 520, 1.8, 'g2:lined', { mv: [['g2>', 1500, 480]] })],
      lab: [['DECADES OF DEATH RECORDS · 2015', 'g2:decades', 960, 965, GOLD, 30]] },
    { at: 'g3', under: tt => waveChart(tt, clamp((tt - T('g3:measles')) / 1.5), clamp((tt - T('g3:wave#1')) / 1.5), 0),
      cast: [A('measlesV', 620, 260, 1.1, 'g3:measles'), A('fluV', 1220, 260, 1.1, 'g3:infections'), A('bact', 1420, 260, 1.0, 'g3:open')],
      lab: [['MEASLES WAVE', 'g3:measles', 620, 965, '#c7a8f0', 30], ['2–3 YEARS LATER: OTHER INFECTION DEATHS', 'g3:later', 1220, 965, '#ff9fb4', 28]] },
    { at: 'g4', under: tt => waveChart(tt, 1, 1, clamp((tt - T('g4:dropped')) / 1.2)),
      cast: [A('syringeC', 300, 280, 1.2, 'g4:vaccine', { mv: [['g4:wiped', 560, 280]] }), A('measlesV', 620, 260, 1.1, 'g4', { erase: 'g4:wiped' }), A('fluV', 1220, 260, 1.1, 'g4', { erase: 'g4:dropped+0.4' }),
        A('puzzle', 1520, 250, 0.9, 'g4:puzzle', { mv: [['g4:sense', 1640, 250]], o: { col: '#ffd98a' } }), A('puzzle', 1800, 250, 0.9, 'g4:puzzle', { mv: [['g4:sense', 1700, 250]], o: { col: '#8fd8e6' }, hit: ['g4:sense'] })] },
    { at: 'g4b', cast: [A('kid', 360, 540, 2.0, 'g4b:measles', { o: { spots: 1 } }), A('hglass', 860, 520, 1.6, 'g4b:two'), A('kid', 1360, 540, 2.0, 'g4b:pneumonia', { o: { sick: 1 } }), A('lungs', 1680, 380, 1.1, 'g4b:pneumonia', { o: { fill: 0.6 } })],
      fx: [['zap', 0, 2, 'g4b:linked', 0.7, '#ffd98a']], lab: [['THEY CAN BE LINKED', 'g4b:linked', 960, 965, GOLD, 32]] },
    QB('g5q', [A('crowd', 800, 540, 2.2, 'g5q+0.2'), A('skullX', 1180, 520, 1.3, 'g5q:deaths')]),
    { at: 'g6', cast: [A('measlesV', 380, 520, 2.0, 'g6:measles'), A('kidsGroup', 900, 520, 2.2, 'g6:childhood', { grey: 'g6:half' })],
      num: [['g6:half', 1480, 480, 'UP TO 1/2', 'OF CHILD INFECTION DEATHS (MODEL)']] },
    { at: 'g7', cast: [A('calDay', 380, 500, 2.0, 'g7', { o: { m: 'BEFORE', d: '1963', col: '#5b6585' } }), A('crowd', 860, 520, 2.0, 'g7:cases')],
      num: [['g7:three', 1430, 380, '3–4 MILLION', 'CASES A YEAR'], ['g7:four#1', 1430, 690, '400–500', 'DEATHS A YEAR']] },
  ], 'h1'));
}
// ---------- 7 why the vaccine is different ----------
function sVax(t) {
  worldBG(t, 'teal');
  beats(t, chainB([
    QB('h1', [A('vial', 760, 540, 2.2, 'h1+0.2'), A('album', 1160, 540, 1.8, 'h1:amnesia')]),
    { at: 'h2', cast: [A('syringeC', 300, 340, 1.4, 'h2:mmr', { mv: [['h2:shot+0.4', 620, 430]] }), A('kid', 800, 560, 2.3, 'h2:children', { hit: ['h2:shot+0.4'] }), A('album', 1300, 520, 2.2, 'h2:antibody', { pulse: ['h2:intact'] }), A('check', 1650, 330, 1.0, 'h2:intact')],
      lab: [['ANTIBODY LIBRARY INTACT', 'h2:intact', 960, 965, GOLD, 32]] },
    { at: 'h3', cast: [A('measlesV', 380, 520, 2.0, 'h3', { o: { weak: 1 }, mv: [['h3:trains', 820, 500, 80]] }), bc(1100, 520, 2.3, 'h3:immune', null, { o: tt => ({ mem: tt > T('h3:recognize') ? 'measlesV' : null }), pulse: ['h3:recognize'] }), A('album', 1600, 520, 1.8, 'h3:library')],
      lab: [['WEAKENED VIRUS', 'h3:weakened', 380, 800, WHITE, 30], ['LEARNS MEASLES, KEEPS THE REST', 'h3:recognize', 1250, 800, GOLD, 28]] },
    { at: 'h4', cast: [A('vial', 330, 500, 1.6, 'h4:two'), A('vial', 520, 500, 1.6, 'h4:two+0.15'), A('shieldC', 830, 500, 1.9, 'h4:97', { o: { txt: '97%' } }), A('vial', 1250, 500, 1.6, 'h4:one'), A('shieldC', 1560, 500, 1.9, 'h4:93', { o: { txt: '93%' } })],
      lab: [['2 DOSES', 'h4:two', 580, 800, WHITE, 30], ['1 DOSE', 'h4:one', 1400, 800, WHITE, 30]] },
    { at: 'h4b', cast: [A('baby', 420, 520, 2.0, 'h4b:first'), A('syringeC', 760, 330, 1.1, 'h4b:first', { mv: [['h4b:months', 560, 420]] }), A('kid', 1250, 540, 2.1, 'h4b:second'), A('syringeC', 1620, 330, 1.1, 'h4b:second', { mv: [['h4b:four', 1400, 420]] })],
      lab: [['12–15 MONTHS', 'h4b:12', 420, 800, GOLD, 30], ['4–6 YEARS', 'h4b:four', 1250, 800, GOLD, 30]] },
    QB('h5q', [A('measlesV', 760, 540, 2.0, 'h5q+0.2'), A('chart', 1150, 520, 1.6, 'h5q:rising', { o: { v: [0.2, 0.3, 0.5, 0.9], hi: 3 } })]),
    { at: 'h6', cast: [A('kidsGroup', 380, 540, 2.2, 'h6:kids'), A('chart', 1050, 520, 2.2, 'h6:coverage', { o: tt => ({ v: [0.95, 0.94, 0.93, 0.92].map(v => v * (1 - 0.6 * clamp((tt - T('h6:fell')) / 1.2) * (v < 0.95 ? 1 : 0))), hi: 3 }) })],
      num: [['h6:95', 1560, 380, '95% → 92%', 'KINDERGARTEN MMR']] },
    { at: 'h7', cast: [A('kidsGroup', 380, 540, 2.2, 'h7:kindergartners', { grey: 'h7:unprotected' }), A('shieldC', 1100, 520, 2.2, 'h7:measles', { o: { crack: 1 } }), A('measlesV', 1600, 380, 1.5, 'h7:kept', { mv: [['h7:kept+0.8', 1150, 520, 60]] })],
      num: [['h7:300', 380, 220, '~300,000', 'UNPROTECTED EVERY YEAR']], lab: [['MEASLES NEEDS ~95% TO BE KEPT OUT', 'h7:95', 1100, 965, GOLD, 30]] },
    { at: 'h8', cast: [A('docV', 380, 520, 1.8, 'h8:exemptions', { o: { title: 'EXEMPTION', ticks: 0 } }), A('school', 1000, 560, 2.3, 'h8:school'), A('measlesV', 1000, 330, 1.1, 'h8:outbreaks', { mv: [['h8:outward', 1550, 300, 60]] }), A('measlesV', 1000, 330, 1.1, 'h8:outbreaks+0.2', { mv: [['h8:outward+0.2', 1550, 720, 60]] })],
      lab: [['EXEMPTIONS HIT NEW RECORDS', 'h8:records', 960, 965, WHITE, 30]] },
  ], 'i1'));
}
// ---------- 8 rebuilding the memory ----------
function sRebuild(t) {
  worldBG(t, 'coral');
  beats(t, chainB([
    QB('i1', [A('album', 800, 540, 2.4, 'i1+0.2', { o: { blank: 0.7 } }), A('syringeC', 1180, 420, 1.2, 'i1:memory')]),
    { at: 'i2', cast: [bc(560, 520, 2.3, 'i2:survivor', null, { o: tt => ({ mem: tt > T('i2:relearns') ? 'fluV' : null }), hit: ['i2:meets+0.8'] }), A('fluV', 1100, 340, 1.5, 'i2:germ', { mv: [['i2:meets+0.8', 760, 470, 60]] }), A('hglass', 1450, 540, 2.0, 'i2:months')],
      lab: [['RELEARNED CELL BY CELL', 'i2:relearns', 700, 965, GOLD, 30]] },
    { at: 'i3', cast: [A('kid', 960, 560, 2.4, 'i3', { o: { sick: 1 }, hit: ['i3:flu+0.6', 'i3:ear+0.6', 'i3:chest+0.6'] }), A('fluV', 300, 330, 1.4, 'i3:flu', { mv: [['i3:flu+0.6', 820, 460]] }), A('ear', 1650, 330, 1.4, 'i3:ear', { mv: [['i3:ear+0.6', 1100, 460]] }), A('lungs', 300, 760, 1.2, 'i3:chest', { mv: [['i3:chest+0.6', 800, 640]], o: { fill: 0.5 } })],
      lab: [['OLD ENEMIES STRIKE AGAIN', 'i3:enemies', 960, 965, '#ff9fb4', 30]] },
    { at: 'i4', cast: [A('album', 1100, 520, 2.6, 'i4', { o: tt => ({ blank: 0.75 * (1 - clamp((tt - T('i4:refill')) / 1.4)) }) }), A('syringeC', 300, 330, 1.3, 'i4:booster', { mv: [['i4:refill', 880, 440]] }), A('syringeC', 300, 720, 1.3, 'i4:polio', { mv: [['i4:refill+0.3', 880, 600]] })],
      lab: [['POLIO', 'i4:polio', 300, 560, WHITE, 28], ['HEPATITIS', 'i4:hepatitis', 1650, 300, WHITE, 28], ['BOOSTERS TO REFILL THE SHELVES', 'i4:refill', 1100, 965, GOLD, 30]] },
    QB('i5q', [A('adult', 800, 560, 2.3, 'i5q+0.2'), A('album', 1180, 540, 1.6, 'i5q:memory', { o: { blank: 0.4 } })]),
    { at: 'i6', cast: [A('kidsGroup', 400, 540, 2.2, 'i6:children'), A('adult', 1050, 560, 2.3, 'i6:adults', { pulse: ['i6:20'] }), A('shieldC', 1550, 520, 1.9, 'i6:protection')],
      lab: [['ADULTS: LESS STUDIED', 'i6:less', 1050, 965, WHITE, 30]] },
  ], 'o1'));
}
// ---------- outro ----------
function sOutro(t) {
  worldBG(t, 'night');
  if (t < S('o3') - 0.1) { beats(t, chainB([
    QB('o1', [A('docV', 800, 540, 2.2, 'o1+0.2', { o: { ticks: 1 } })]),
    { at: 'o2', cast: [A('docV', 330, 520, 1.9, 'o2:records', { o: tt => ({ ticks: tt > T('o2:dose') ? 2 : 1 }) }), A('doctor', 760, 560, 2.1, 'o2:doctor'), A('tubeB', 1150, 520, 1.6, 'o2:blood'), A('syringeC', 1560, 400, 1.3, 'o2:extra', { mv: [['o2:dose', 1500, 520]] })],
      lab: [['TWO MMR DOSES?', 'o2:mmr', 330, 800, GOLD, 30], ['CATCH UP AFTER MEASLES', 'o2:catching', 1350, 800, WHITE, 28]] },
  ], 'o3')); return; }
  cast(t, 'o3', 1e9, [A('album', 420, 640, 2.0, 'o3', { o: tt => ({ blank: clamp((tt - T('o3:erases')) / 1.0) }) }), A('measlesV', 420, 330, 1.6, 'o3', { pulse: ['o3:erases'] })], { id: 'outro', zoom: 0 });
  outroTitle(t, 'MEASLES DOESN\'T JUST MAKE YOU SICK', 'IT ERASES IMMUNE MEMORY', 1240, 40, 64);
}
const CHAPTERS = [['a1', 'The illness itself', 'coral', 'measlesV'], ['b1', 'The most contagious virus', 'teal', 'droplets'], ['d1', 'Hijacking memory cells', 'indigo', 'bcell'], ['e1', 'The 2019 proof', 'night', 'virscan'], ['f1', 'A baby-like immune system', 'indigo', 'babycell'], ['g1', 'The deadly shadow', 'grey', 'hglass'], ['h1', 'Why the vaccine is different', 'teal', 'vial'], ['i1', 'Rebuilding the memory', 'coral', 'album']];
function SECTIONS() { return makeSections(CHAPTERS, { a1: [sIll, 'a2'], b1: [sAir, 'b2'], d1: [sHijack, 'd2'], e1: [sProof, 'e2'], f1: [sBaby, 'f2'], g1: [sShadow, 'g2'], h1: [sVax, 'h2'], i1: [sRebuild, 'i2'] }, sOpen, sOutro); }
