
// =====================================================================
// Human Body 02: "What if you never slept?" long version (~8 min)
// Scenes keyed to narration lines (audio/words.json "lines") and words.
// Built on the v3 engine (worlds, placeIcon, overlap registry + audit).
// =====================================================================
let LINES = {}, TAIL = 10;   // TAIL: end-screen seconds after the voice
const LN = id => LINES[id];
function W_(id, word, n = 0) {   // time of the n-th word in a line starting with `word`
  const L = LINES[id]; if (!L) return 0; const ws = WORDS.filter(w => w.s >= L.start - 0.15 && w.s <= L.end + 0.1);
  const opts = [].concat(word).map(x => x.toLowerCase());
  const hits = ws.filter(w => opts.some(o => w.w.toLowerCase().replace(/[^a-z0-9']/g, '').startsWith(o)));
  return hits.length ? hits[Math.min(n, hits.length - 1)].s : L.start;
}
function buildCues() {
  const C = CUE;
  C.slept = W_('c1', 'slept'); C.sleep = W_('c2', 'sleep'); C.lying = W_('c2', 'lying'); C.delete = W_('c3', 'delete'); C.you = W_('c3', 'you'); C.zero = W_('c3', 'zero');
  C.h16 = W_('d1', ['16', 'sixteen']); C.h17 = W_('d2', ['17', 'seventeen']); C.drinks = W_('d2', 'drinks'); C.h24 = W_('d4', ['24', 'twenty']); C.drunk = W_('d4', 'drunk');
  C.trash = LN('b5').start; C.during = W_('b5', 'during'); C.washes = W_('b5', 'washes'); C.alz = W_('b5', 'alzheimer'); C.nosleep = W_('b6', 'no'); C.wash = W_('b6', 'wash');
  C.day2 = LN('m1').start; C.micro = W_('m1', 'micro'); C.eyes = W_('m1', 'eyes'); C.day3 = LN('m3').start; C.breathe = W_('m3', 'breathe'); C.record = LN('r1').start;
  C.eleven = W_('r1', ['11', 'eleven']); C.randy2 = LN('v1').start; C.hours15 = W_('v1b', 'hours'); C.woke = W_('v2', 'woke'); C.fine = W_('v2', 'fine'); C.tonight = W_('o2', 'tonight'); C.calls = W_('o2', 'calls');
  C.end = DUR - TAIL;
}
// ---------- story clock: hours awake (only shown in the narrative chapters) ----------
function hoursAt(t) {
  const C = CUE, K = [[C.zero, 0], [LN('c4').end, 2], [C.h16 - 0.6, 15], [C.h16, 16], [C.h17, 17], [LN('d3').start, 18], [LN('d3').end, 21], [C.h24, 24],
    [C.day2, 24], [C.day2 + 0.6, 48], [C.day3, 48], [C.day3 + 0.6, 72], [C.eleven - 0.2, 72], [C.eleven + 0.5, 264], [C.woke, 264], [C.woke + 0.8, 0]];
  if (t < K[0][0]) return 0;
  for (let i = 0; i < K.length - 1; i++) if (t < K[i + 1][0]) { const k = clamp((t - K[i][0]) / Math.max(1e-3, K[i + 1][0] - K[i][0])); return lerp(K[i][1], K[i + 1][1], k); }
  return K[K.length - 1][1];
}
function counterOn(t) { const C = CUE; const spans = [[C.zero, LN('c4').end + 0.3], [LN('d1').start, LN('d4').end + 0.3], [LN('m1').start, LN('m3').end + 0.3], [LN('r1').start, LN('r4').end], [LN('v1b').start, LN('v2').end + 0.6]]; return spans.some(([a, b]) => t >= a && t < b); }
function drawCounter(t) {
  if (!counterOn(t)) return; const C = CUE;
  const v = Math.floor(hoursAt(t) + 1e-6), gold = t > C.eleven - 0.2 && t < C.woke, x = 1600, y = 120;
  reg('hud', 'counter', 1390, 58, 1810, 182);
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = 'rgba(6,20,40,0.62)'; ctx.beginPath(); ctx.roundRect(-210, -62, 420, 124, 40); ctx.fill();
  font(26, 600); ctx.letterSpacing = '5px'; ctx.fillStyle = TEAL; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('HOURS AWAKE', 0, -30);
  font(64, 700); ctx.letterSpacing = '3px'; ctx.fillStyle = gold ? GOLD : WHITE; ctx.fillText(String(v), 0, 20); ctx.restore(); ctx.letterSpacing = '0px';
}

// ---------- extra icons (flat, no outlines) ----------
const C2 = { teal: '#8fd8e6', gold: '#ffd98a', coral: '#ff8f4a', pink: '#f29db0', red: '#e2457a', navy: '#102348', white: '#f3f7fb', ink: '#20232f' };
function circ(x, y, r, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
Object.assign(ICONS, {
  brainmini() { ctx.fillStyle = '#f29db0'; ctx.beginPath(); for (const [x, y, r] of [[-26, -8, 26], [0, -18, 28], [26, -8, 26], [-14, 12, 24], [16, 12, 24]]) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 6.283); } ctx.fill();
    rr2(-4, -40, 8, 70, 4, '#c95a7c'); rr2(18, 30, 22, 16, 8, '#e98aa0'); rr2(-30, -14, 22, 6, 3, 'rgba(255,255,255,0.4)'); },
  heart(t) { const b = 1 + 0.08 * Math.max(0, Math.sin(t * 7)); ctx.scale(b, b); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(0, 40); ctx.bezierCurveTo(-60, 0, -40, -46, 0, -20); ctx.bezierCurveTo(40, -46, 60, 0, 0, 40); ctx.fill(); rr2(-28, -22, 18, 8, 4, 'rgba(255,255,255,0.45)'); },
  bubble(t) { circ(0, -6, 44, '#f3f7fb'); circ(-34, 40, 10, '#f3f7fb'); circ(-48, 58, 6, '#f3f7fb'); ctx.fillStyle = '#7f6ff0'; font(40, 700); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?!', 0, -4); },
  clock(t, o) { circ(0, 0, 50, '#f3f7fb'); circ(0, 0, 42, '#102348'); const hh = (o.h ?? 0) % 12, mm = o.m ?? 0;
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; circ(Math.sin(a) * 34, -Math.cos(a) * 34, 2.5, '#8fd8e6'); }
    ctx.save(); ctx.rotate((hh + mm / 60) / 12 * 6.283); rr2(-3, -24, 6, 26, 3, '#ffd98a'); ctx.restore(); ctx.save(); ctx.rotate(mm / 60 * 6.283); rr2(-2, -34, 4, 36, 2, '#f3f7fb'); ctx.restore(); circ(0, 0, 5, '#ff8f4a'); },
  sun(t) { ctx.save(); ctx.rotate(t * 0.4); ctx.fillStyle = '#ffd98a'; for (let i = 0; i < 10; i++) { ctx.rotate(6.283 / 10); ctx.beginPath(); ctx.roundRect(-6, -62, 12, 20, 6); ctx.fill(); } ctx.restore(); circ(0, 0, 38, '#ffc857'); circ(-10, -10, 10, 'rgba(255,255,255,0.5)'); },
  moon() { circ(0, 0, 42, '#e8eefc'); circ(18, -12, 38, 'rgba(16,35,72,1)'); circ(-14, 10, 6, 'rgba(150,170,215,0.5)'); },
  hexmol(t) { ctx.save(); ctx.rotate(t * 0.3); ctx.fillStyle = '#b48cff'; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; ctx.lineTo(Math.cos(a) * 34, Math.sin(a) * 34); } ctx.closePath(); ctx.fill(); circ(0, 0, 14, '#2d2b7c');
    for (const [a, r] of [[0, 54], [2.1, 50], [4.2, 52]]) circ(Math.cos(a) * r, Math.sin(a) * r, 10, '#8fd8e6'); ctx.restore(); },
  coffee(t) { rr2(-36, -26, 64, 64, 14, '#f3f7fb'); rr2(-30, -20, 52, 14, 7, '#7a4a2c'); ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.arc(34, 6, 16, -1.4, 1.4); ctx.arc(34, 6, 7, 1.4, -1.4, true); ctx.fill();
    for (let i = 0; i < 3; i++) { const y = -40 - ((t * 30 + i * 14) % 30); ctx.globalAlpha *= 0.7; rr2(-18 + i * 14, y, 6, 14, 3, 'rgba(255,255,255,0.6)'); ctx.globalAlpha /= 0.7; } },
  nocoffee(t) { ICONS.coffee(t); ctx.fillStyle = '#e2457a'; ctx.save(); ctx.rotate(-0.7); ctx.beginPath(); ctx.roundRect(-62, -6, 124, 12, 6); ctx.fill(); ctx.restore(); },
  thermo(t, o) { rr2(-12, -60, 24, 90, 12, '#f3f7fb'); circ(0, 40, 22, '#f3f7fb'); circ(0, 40, 15, '#5aa9e6'); rr2(-5, -50 + 70 * (1 - (o.level ?? 0.5)), 10, 70 * (o.level ?? 0.5) + 10, 5, '#5aa9e6'); },
  carz(t) { ICONS.car(t); font(30, 700); ctx.fillStyle = '#ffd98a'; ctx.fillText('z', 50, -64 - (t * 20 % 10)); ctx.fillText('Z', 70, -88 - (t * 20 % 10)); },
  dream(t) { circ(0, 0, 46, '#7f6ff0'); circ(30, -20, 26, '#7f6ff0'); circ(-30, -18, 24, '#7f6ff0'); circ(-40, 52, 9, '#7f6ff0'); circ(-54, 70, 5, '#7f6ff0');
    ctx.fillStyle = '#ffd98a'; ctx.save(); ctx.translate(4, -4); ctx.rotate(t * 0.8); ctx.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 9 : 22, a = i / 10 * 6.283; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.fill(); ctx.restore(); },
  switchoff() { rr2(-50, -26, 100, 52, 26, '#3a3f5a'); circ(-24, 0, 20, '#f3f7fb'); font(20, 700); ctx.fillStyle = '#ff8f4a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('OFF', 18, 1); },
  doc(t, o) { rr2(-30, -40, 60, 80, 8, '#f3f7fb'); for (let i = 0; i < 4; i++) rr2(-20, -24 + i * 16, 40 - (i % 2) * 12, 6, 3, '#9fb0d8'); if (o.bad) { ctx.globalAlpha *= 0.9; rr2(-36, -4, 72, 10, 5, '#e2457a'); } },
  photo() { rr2(-40, -32, 80, 64, 8, '#f3f7fb'); rr2(-32, -24, 64, 40, 4, '#8fd8e6'); ctx.fillStyle = '#5aa96a'; ctx.beginPath(); ctx.moveTo(-32, 16); ctx.lineTo(-8, -6); ctx.lineTo(8, 8); ctx.lineTo(20, -2); ctx.lineTo(32, 16); ctx.fill(); circ(18, -12, 6, '#ffd98a'); },
  donut(t) { circ(0, 0, 44, '#f2b36b'); circ(0, -4, 40, '#ff8fb8'); circ(0, 0, 14, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalCompositeOperation = 'destination-out'; circ(0, 0, 14, '#000'); ctx.restore();
    for (const [x, y, c] of [[-20, -18, '#8fd8e6'], [16, -24, '#ffd98a'], [26, 6, '#f3f7fb'], [-24, 14, '#b48cff']]) rr2(x - 5, y - 2, 10, 4, 2, c); },
  fries() { for (let i = 0; i < 6; i++) rr2(-26 + i * 10, -50 + (i % 3) * 8, 9, 50, 4, '#ffd36b'); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(-36, -8); ctx.lineTo(36, -8); ctx.lineTo(28, 44); ctx.lineTo(-28, 44); ctx.closePath(); ctx.fill(); circ(0, 14, 10, '#ffd98a'); },
  burger() { rr2(-48, -36, 96, 30, 15, '#f2a65a'); rr2(-52, -8, 104, 10, 5, '#5aa96a'); rr2(-50, 2, 100, 16, 8, '#7a4a2c'); rr2(-52, 18, 104, 6, 3, '#ffd36b'); rr2(-48, 24, 96, 18, 9, '#f2a65a'); circ(-14, -26, 2.5, '#fff7e0'); circ(10, -30, 2.5, '#fff7e0'); },
  sugar() { ctx.save(); ctx.rotate(-0.2); rr2(-32, -32, 64, 64, 10, '#f3f7fb'); rr2(-32, -32, 64, 18, 8, '#ffffff'); ctx.restore(); circ(40, 30, 16, '#e2457a'); ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(40, 6); ctx.lineTo(28, 26); ctx.lineTo(52, 26); ctx.fill(); },
  muscle(t) {   // flexed arm: upper arm, forearm up, fist, bicep bump
    rr2(-70, 6, 96, 40, 20, '#f2b38f'); ctx.save(); ctx.translate(14, 26); ctx.rotate(-1.25); rr2(-6, -20, 88, 40, 20, '#f2b38f'); ctx.restore();
    circ(38, -60, 24, '#e9a27f'); ctx.fillStyle = '#e9a27f'; ctx.beginPath(); ctx.ellipse(-22, 0, 36, 26, -0.15, Math.PI, 0); ctx.fill();
    rr2(-40, -16, 30, 9, 4, 'rgba(255,255,255,0.45)'); rr2(-74, 10, 18, 32, 9, '#8fd8e6'); },
  virus(t) { ctx.save(); ctx.rotate(t * 0.6); ctx.fillStyle = '#7fd36b'; for (let i = 0; i < 10; i++) { ctx.rotate(6.283 / 10); rr2(-4, -48, 8, 16, 4, '#5aa96a'); circ(0, -50, 7, '#ff8f4a'); } ctx.restore(); circ(0, 0, 34, '#7fd36b'); circ(-10, -8, 8, '#5aa96a'); circ(12, 10, 6, '#5aa96a'); },
  shield(t, o) { ctx.fillStyle = '#8fd8e6'; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(42, -34); ctx.quadraticCurveTo(42, 22, 0, 50); ctx.quadraticCurveTo(-42, 22, -42, -34); ctx.closePath(); ctx.fill();
    if (o.crack) { ctx.fillStyle = '#102348'; ctx.beginPath(); ctx.moveTo(-4, -50); ctx.lineTo(8, -14); ctx.lineTo(-6, 4); ctx.lineTo(6, 46); ctx.lineTo(-2, 46); ctx.lineTo(-12, 4); ctx.lineTo(2, -14); ctx.closePath(); ctx.fill(); } },
  scale() { rr2(-50, 10, 100, 34, 12, '#f3f7fb'); rr2(-26, 16, 52, 16, 6, '#102348'); font(16, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('+ KG', 0, 25); },
  alarm(t) { const w = Math.sin(t * 30) * 0.12; ctx.rotate(w); circ(0, 4, 40, '#e2457a'); circ(0, 4, 30, '#f3f7fb'); circ(-30, -32, 13, '#e2457a'); circ(30, -32, 13, '#e2457a'); rr2(-2, -16, 4, 22, 2, '#20232f'); rr2(-2, 2, 16, 4, 2, '#20232f'); },
  spider(t) { ctx.fillStyle = '#20232f'; for (let i = 0; i < 4; i++) for (const s of [-1, 1]) { ctx.save(); ctx.rotate(s * (0.5 + i * 0.35) + Math.sin(t * 9 + i) * 0.08); rr2(0, -3, s * 46, 6, 3, '#20232f'); ctx.restore(); }
    circ(0, 0, 20, '#20232f'); circ(0, -22, 12, '#20232f'); circ(-5, -24, 3, '#e2457a'); circ(5, -24, 3, '#e2457a'); },
  pill() { ctx.save(); ctx.rotate(-0.5); rr2(-40, -16, 80, 32, 16, '#f3f7fb'); rr2(0, -16, 40, 32, 16, '#ff8f4a'); rr2(-30, -10, 22, 6, 3, 'rgba(255,255,255,0.7)'); ctx.restore(); },
  poster() { rr2(-56, -44, 112, 80, 8, '#f3f7fb'); rr2(-48, -36, 46, 30, 4, '#8fd8e6'); rr2(6, -36, 42, 8, 4, '#ff8f4a'); rr2(6, -22, 34, 6, 3, '#9fb0d8'); rr2(-48, 2, 96, 6, 3, '#9fb0d8'); rr2(-48, 14, 70, 6, 3, '#9fb0d8'); rr2(-6, 36, 12, 30, 4, '#7a4a2c'); },
  pinball(t) { ctx.save(); ctx.rotate(-0.15); rr2(-40, -60, 80, 120, 16, '#7f6ff0'); rr2(-32, -52, 64, 80, 10, '#2d2b7c'); circ(-12, -30, 8, '#ffd98a'); circ(14, -10, 8, '#ff8f4a'); circ(-6, 8, 7, '#8fd8e6');
    circ(Math.sin(t * 3) * 20, 18 - Math.abs(Math.cos(t * 3)) * 50, 6, '#f3f7fb'); rr2(-26, 36, 22, 8, 4, '#f3f7fb'); rr2(4, 36, 22, 8, 4, '#f3f7fb'); ctx.restore(); },
  book() { rr2(-50, -40, 100, 76, 10, '#e2457a'); rr2(-44, -34, 88, 64, 6, '#f3f7fb'); rr2(-2, -34, 4, 64, 2, '#c9d6ec'); for (let i = 0; i < 4; i++) { rr2(-36, -24 + i * 14, 28, 5, 2, '#9fb0d8'); rr2(8, -24 + i * 14, 28, 5, 2, '#9fb0d8'); } },
  dna(t) { for (let i = 0; i < 9; i++) { const y = -56 + i * 14, ph = t * 2 + i * 0.7, x1 = Math.sin(ph) * 30, x2 = -x1; rr2(Math.min(x1, x2), y - 2, Math.abs(x1 - x2) + 1, 4, 2, 'rgba(159,176,216,0.8)'); circ(x1, y, 7, '#ff8f4a'); circ(x2, y, 7, '#8fd8e6'); } },
  family(t) { for (const [x, s, c] of [[-26, 1, '#d64550'], [26, 0.75, '#5b4fd6']]) { ctx.save(); ctx.translate(x, 46); ctx.scale(s, s); rr2(-22, -70, 44, 70, 20, c); circ(0, -92, 24, '#f2b38f'); ctx.fillStyle = '#4a2c22'; ctx.beginPath(); ctx.arc(0, -98, 25, Math.PI, 0); ctx.fill(); ctx.restore(); } },
  plane(t) { ctx.rotate(-0.15); rr2(-64, -12, 128, 24, 12, '#f3f7fb'); ctx.fillStyle = '#8fd8e6'; ctx.beginPath(); ctx.moveTo(-10, -8); ctx.lineTo(20, -8); ctx.lineTo(-20, -52); ctx.lineTo(-34, -52); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10, 8); ctx.lineTo(20, 8); ctx.lineTo(-20, 52); ctx.lineTo(-34, 52); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-50, -8); ctx.lineTo(-64, -34); ctx.lineTo(-56, -34); ctx.lineTo(-40, -8); ctx.fill(); for (let i = 0; i < 4; i++) circ(30 - i * 14, -2, 3, '#5aa9e6'); },
  bottle() { rr2(-24, -30, 48, 70, 12, '#8fd8e6'); rr2(-12, -46, 24, 18, 4, '#f3f7fb'); rr2(-18, -54, 36, 10, 5, '#ff8f4a'); rr2(-16, -6, 32, 26, 6, '#f3f7fb'); font(14, 700); ctx.fillStyle = '#5b4fd6'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('AO', 0, 7); },
  fly(t) { const f = Math.sin(t * 40) * 0.4; ctx.save(); ctx.rotate(-0.4 + f); ctx.fillStyle = 'rgba(200,230,255,0.7)'; ctx.beginPath(); ctx.ellipse(-8, -22, 12, 26, -0.4, 0, 6.283); ctx.fill(); ctx.restore(); ctx.save(); ctx.rotate(0.4 - f); ctx.fillStyle = 'rgba(200,230,255,0.7)'; ctx.beginPath(); ctx.ellipse(8, -22, 12, 26, 0.4, 0, 6.283); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#3a3f5a'; ctx.beginPath(); ctx.ellipse(0, 10, 14, 26, 0, 0, 6.283); ctx.fill(); circ(0, -16, 12, '#3a3f5a'); circ(-6, -18, 5, '#e2457a'); circ(6, -18, 5, '#e2457a'); },
  mouse(t) { ctx.save(); ctx.scale(0.5, 0.5); drawRat2(t, 0, 60, 1); ctx.restore(); },
  gut(t, o) { ctx.fillStyle = '#f29db0'; ctx.beginPath(); ctx.roundRect(-60, -50, 120, 100, 40); ctx.fill(); ctx.fillStyle = '#c95a7c'; for (let i = 0; i < 3; i++) rr2(-44, -30 + i * 26, 88, 8, 4, '#c95a7c');
    const n = Math.floor((o.ros ?? 0) * 16); for (let i = 0; i < n; i++) circ(-44 + (i * 37) % 90, -36 + (i * 23) % 74, 6, '#e2457a'); },
  piggy(t, o) { ctx.fillStyle = '#ff8fb8'; ctx.beginPath(); ctx.ellipse(0, 0, 54, 40, 0, 0, 6.283); ctx.fill(); circ(46, -6, 16, '#ffb0cc'); circ(52, -8, 3, '#c95a7c'); circ(44, -2, 3, '#c95a7c'); rr2(-34, 30, 14, 18, 6, '#ff8fb8'); rr2(18, 30, 14, 18, 6, '#ff8fb8'); rr2(-10, -42, 26, 6, 3, '#20232f'); circ(20, -16, 4, '#20232f');
    if (o.crack) { ctx.fillStyle = '#102348'; ctx.beginPath(); ctx.moveTo(-6, -40); ctx.lineTo(4, -12); ctx.lineTo(-8, 4); ctx.lineTo(2, 38); ctx.lineTo(-4, 38); ctx.lineTo(-14, 4); ctx.lineTo(-2, -12); ctx.closePath(); ctx.fill(); } },
  snow(t) { ctx.save(); ctx.rotate(t * 0.3); for (let i = 0; i < 6; i++) { ctx.rotate(6.283 / 6); rr2(-4, -50, 8, 50, 4, '#c9e8ff'); rr2(-14, -38, 28, 6, 3, '#c9e8ff'); } ctx.restore(); circ(0, 0, 8, '#c9e8ff'); },
  bedclock(t) { ICONS.bed(t); ctx.save(); ctx.translate(36, -60); ctx.scale(0.5, 0.5); ICONS.clock(t, { h: 10, m: 30 }); ctx.restore(); },
  subscribe(t) { rr2(-120, -34, 240, 68, 34, '#e2457a'); font(30, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '3px'; ctx.fillText('SUBSCRIBE', 0, 2); ctx.letterSpacing = '0px'; },
});

// ---------- heroes ----------
function hourglass(t, x, y, s, fill, flip = 0) {   // fill 0..1 = sand in the bottom
  ctx.save(); ctx.translate(x, y); ctx.rotate(flip * Math.PI); ctx.scale(s, s);
  rr2(-120, -190, 240, 26, 13, '#7a4a2c'); rr2(-120, 164, 240, 26, 13, '#7a4a2c'); rr2(-112, -170, 14, 340, 7, '#9b6a44'); rr2(98, -170, 14, 340, 7, '#9b6a44');
  const glass = 'rgba(220,240,255,0.22)'; ctx.fillStyle = glass; ctx.beginPath(); ctx.moveTo(-90, -164); ctx.lineTo(90, -164); ctx.quadraticCurveTo(90, -40, 10, 0); ctx.quadraticCurveTo(90, 40, 90, 164); ctx.lineTo(-90, 164); ctx.quadraticCurveTo(-90, 40, -10, 0); ctx.quadraticCurveTo(-90, -40, -90, -164); ctx.fill();
  const top = 1 - fill;
  ctx.save(); ctx.beginPath(); ctx.moveTo(-90, -164); ctx.lineTo(90, -164); ctx.quadraticCurveTo(90, -40, 10, 0); ctx.lineTo(-10, 0); ctx.quadraticCurveTo(-90, -40, -90, -164); ctx.clip();
  ctx.fillStyle = '#ffb35c'; ctx.fillRect(-100, -10 - 150 * top, 200, 160 * top); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.moveTo(-10, 0); ctx.quadraticCurveTo(-90, 40, -90, 164); ctx.lineTo(90, 164); ctx.quadraticCurveTo(90, 40, 10, 0); ctx.closePath(); ctx.clip();
  ctx.fillStyle = '#ff9a3c'; ctx.beginPath(); ctx.moveTo(-100, 170); ctx.lineTo(-100, 164 - 150 * fill * 0.7); ctx.quadraticCurveTo(0, 164 - 150 * fill - 20, 100, 164 - 150 * fill * 0.7); ctx.lineTo(100, 170); ctx.fill(); ctx.restore();
  if (fill > 0 && fill < 0.999) { ctx.fillStyle = '#ffb35c'; ctx.fillRect(-3, 0, 6, 164 - 150 * fill); }
  rr2(-70, -150, 18, 110, 9, 'rgba(255,255,255,0.18)'); ctx.restore();
}
function dolphin(t, x, y, s) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.8) * 10); ctx.rotate(Math.sin(t * 1.8) * 0.06); ctx.scale(s, s);
  ctx.fillStyle = '#5a8fd6'; ctx.beginPath(); ctx.moveTo(-150, 10); ctx.quadraticCurveTo(-60, -70, 70, -40); ctx.quadraticCurveTo(140, -24, 170, 0); ctx.quadraticCurveTo(120, 30, 40, 36); ctx.quadraticCurveTo(-60, 46, -150, 10); ctx.fill();
  ctx.fillStyle = '#c9e2ff'; ctx.beginPath(); ctx.moveTo(-110, 20); ctx.quadraticCurveTo(0, 40, 140, 8); ctx.quadraticCurveTo(60, 34, -110, 24); ctx.fill();
  ctx.fillStyle = '#4a7fc6'; ctx.beginPath(); ctx.moveTo(-10, -50); ctx.lineTo(10, -100); ctx.lineTo(40, -46); ctx.fill(); ctx.beginPath(); ctx.moveTo(-140, 8); ctx.lineTo(-190, -30); ctx.lineTo(-175, 10); ctx.lineTo(-195, 44); ctx.fill();
  circ(110, -16, 7, '#102348'); circ(112, -18, 2.5, '#fff'); ctx.restore();
}
function frigatebird(t, x, y, s) {
  const f = Math.sin(t * 2.2) * 0.18; ctx.save(); ctx.translate(x, y + Math.sin(t * 1.2) * 12); ctx.scale(s, s);
  ctx.fillStyle = '#2b2f45'; for (const sd of [-1, 1]) { ctx.save(); ctx.scale(sd, 1); ctx.rotate(f); ctx.beginPath(); ctx.moveTo(10, -6); ctx.quadraticCurveTo(80, -40, 190, -10); ctx.quadraticCurveTo(110, -8, 20, 14); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 4, 40, 18, 0, 0, 6.283); ctx.fill(); circ(-38, -6, 14, '#2b2f45'); circ(-28, 14, 13, '#e2457a');
  ctx.fillStyle = '#9aa6c4'; ctx.beginPath(); ctx.moveTo(-50, -6); ctx.lineTo(-84, 0); ctx.lineTo(-50, 2); ctx.fill(); ctx.fillStyle = '#2b2f45'; ctx.beginPath(); ctx.moveTo(36, 4); ctx.lineTo(80, -10); ctx.lineTo(64, 6); ctx.lineTo(82, 22); ctx.fill();
  circ(-42, -9, 3, '#fff'); ctx.restore();
}
function jellyfish(t, x, y, s) {   // upside-down jellyfish, resting on the sea floor
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const p = 1 + 0.06 * Math.sin(t * 1.5);
  ctx.fillStyle = 'rgba(255,170,220,0.55)'; ctx.beginPath(); ctx.ellipse(0, 20, 90 * p, 26, 0, 0, 6.283); ctx.fill();
  for (let i = 0; i < 8; i++) { const a = -Math.PI + i / 7 * Math.PI; ctx.save(); ctx.translate(Math.cos(a) * 50, 10); ctx.rotate(Math.sin(t * 1.3 + i) * 0.2); rr2(-9, -70, 18, 70, 9, 'rgba(255,190,230,0.75)'); circ(0, -70, 12, 'rgba(255,215,240,0.85)'); ctx.restore(); }
  ctx.restore();
}
function hypnogram(t, x, y, w, h, t0) {   // ~5 cycles: wake -> light -> deep -> REM, drawn progressively
  const lv = [0, 1, 2, 1, 3, 0.4, 1, 2, 1, 3, 0.4, 1, 2, 1, 3, 0.4, 1, 1.5, 1, 3, 0.4, 1, 1, 3, 0];   // 0 = awake/REM top, 3 = deep
  const pts = lv.map((v, i) => [x + i / (lv.length - 1) * w, y + v / 3 * h]);
  const k = eoq((t - t0) / 3.2), n = Math.max(1, Math.floor(k * (pts.length - 1)));
  reg('hero', 'hypnogram', x - 20, y - 80, x + w + 20, y + h + 70);
  ctx.save(); ctx.fillStyle = 'rgba(6,20,40,0.45)'; ctx.beginPath(); ctx.roundRect(x - 30, y - 40, w + 60, h + 80, 26); ctx.fill();
  for (let i = 0; i < n; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1]; const rem = lv[i] === 0.4 || lv[i + 1] === 0.4;
    ctx.fillStyle = rem ? '#ff8f4a' : '#8fd8e6'; ctx.beginPath(); ctx.roundRect(Math.min(ax, bx) - 5, Math.min(ay, by) - 5, Math.abs(bx - ax) + 10, Math.abs(by - ay) + 10, 5); ctx.fill(); }
  for (const [txt, v] of [['LIGHT', 1], ['DEEP', 3], ['REM', 0.4]]) riseText(txt, x - 40, y + v / 3 * h, t0 + 0.4, t, { size: 22, color: txt === 'REM' ? '#ff8f4a' : TEAL, align: 'right', pill: false });
  for (let c = 0; c < 5; c++) riseText(`${(c + 1) * 90 / 60 | 0}:${String((c + 1) * 90 % 60).padStart(2, '0')}`, x + (c + 1) / 5 * w, y + h + 40, t0 + 0.6 + c * 0.3, t, { size: 20, color: WHITE, pill: false });
  ctx.restore();
}
function brainOverlay(B, part, t, a = 1) {   // glowing x-ray highlight of a deep structure on the brain
  const { x, y, r } = B, pulse = 0.75 + 0.25 * Math.sin(t * 5);
  const P = { scn: [-0.22, 0.32, 0.06, 0.05, '#8fd8e6'], hippo: [0.08, 0.26, 0.2, 0.06, '#ffd98a'], amyg: [-0.12, 0.34, 0.08, 0.06, '#e2457a'], thal: [0.02, 0.06, 0.16, 0.11, '#ff8f4a'] }[part];
  const [px, py, rx, ry, c] = P;
  ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'source-over';
  const g = ctx.createRadialGradient(x + px * r, y + py * r, 0, x + px * r, y + py * r, Math.max(rx, ry) * r * 2.6);
  g.addColorStop(0, c + 'cc'); g.addColorStop(1, c + '00'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + px * r, y + py * r, Math.max(rx, ry) * r * 2.6, 0, 6.283); ctx.fill();
  ctx.fillStyle = c; ctx.globalAlpha = a * pulse; ctx.beginPath(); ctx.ellipse(x + px * r, y + py * r, rx * r, ry * r, part === 'hippo' ? -0.3 : 0, 0, 6.283); ctx.fill();
  ctx.restore();
}
function maze(t, x, y, s, t0, replay) {   // a rat runs a path; place cells light in order; in sleep the same order replays fast
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr2(-160, -110, 320, 220, 24, 'rgba(6,20,40,0.5)');
  const path = [[-120, 70], [-120, -60], [0, -60], [0, 60], [120, 60], [120, -70]];
  for (let i = 0; i < path.length - 1; i++) { const [ax, ay] = path[i], [bx, by] = path[i + 1]; rr2(Math.min(ax, bx) - 16, Math.min(ay, by) - 16, Math.abs(bx - ax) + 32, Math.abs(by - ay) + 32, 16, 'rgba(143,216,230,0.25)'); }
  const k = clamp((t - t0) / 3.0), seg = k * (path.length - 1), i = Math.min(path.length - 2, Math.floor(seg)), f = seg - i;
  const rx = lerp(path[i][0], path[i + 1][0], f), ry = lerp(path[i][1], path[i + 1][1], f);
  path.forEach(([px, py], j) => { const lit = replay != null ? clamp(1 - Math.abs(((t - replay) * 4) % 7 - j) * 0.9) : (j <= seg ? 1 : 0); circ(px, py, 16, `rgba(255,217,138,${0.25 + 0.75 * lit})`); });
  if (replay == null) { ctx.save(); ctx.translate(rx, ry); ctx.scale(0.35, 0.35); drawRat2(t, 0, 40, 1); ctx.restore(); }
  ctx.restore();
}
function booth(t, x, y, s) {   // our own DJ in a glass booth (no likeness)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr2(-170, -330, 340, 330, 20, 'rgba(200,230,255,0.18)'); rr2(-170, -330, 340, 14, 7, 'rgba(255,255,255,0.35)'); rr2(-150, -300, 30, 260, 15, 'rgba(255,255,255,0.12)');
  rr2(-120, -120, 240, 24, 10, '#3a3f5a'); rr2(-40, -150, 80, 30, 10, '#20232f'); circ(-60, -132, 10, '#e2457a');
  ctx.save(); ctx.translate(20, -110); ctx.scale(0.62, 0.62); drawTeen(t, 0, 0, 1, { lid: 0.75 }); ctx.restore();
  rr2(-14, -330 + 120, 70, 14, 7, '#20232f'); circ(-10, -205, 16, '#20232f'); circ(52, -205, 16, '#20232f');
  font(26, 700); ctx.fillStyle = '#ffd98a'; ctx.textAlign = 'center'; ctx.fillText('ON AIR', 0, -350);
  ctx.restore();
}
function hormoneBars(t, x, y, t0) {
  const C = [['LEPTIN · "I\'M FULL"', -0.18, '#8fd8e6'], ['GHRELIN · "I\'M HUNGRY"', 0.28, '#ff8f4a']];
  reg('meter', 'hormones', x - 20, y - 70, x + 760, y + 230);
  C.forEach(([lab, d, c], i) => {
    const yy = y + i * 150, k = eoq((t - t0 - 0.6 - i * 2.2) / 1.0), base = 380, w = base * (1 + d * clamp(k));
    riseText(lab, x, yy - 34, t0 + i * 2.2, t, { size: 28, color: WHITE, align: 'left', pill: false });
    rr2(x, yy, 720, 40, 20, 'rgba(6,20,40,0.5)'); rr2(x, yy, w, 40, 20, c);
    if (k > 0.05) riseText((d > 0 ? '+' : '−') + Math.abs(d * 100) + '%', x + w + 70, yy + 20, t0 + 0.8 + i * 2.2, t, { size: 34, weight: 700, color: c, pill: false });
  });
}
function equalBars(t, x, y, t0) {   // six-hour sleepers vs all-nighters: same performance, very different feeling
  reg('meter', 'compare', x - 20, y - 70, x + 820, y + 330);
  const rows = [['6 H A NIGHT × 14 NIGHTS', 0.62, '#ff8f4a'], ['1–2 NIGHTS WITH NO SLEEP', 0.64, '#e2457a']];
  rows.forEach(([lab, v, c], i) => { const yy = y + i * 130, k = eoq((t - t0 - i * 0.6) / 1.0);
    riseText(lab, x, yy - 32, t0 + i * 0.6, t, { size: 26, color: WHITE, align: 'left', pill: false }); rr2(x, yy, 760, 38, 19, 'rgba(6,20,40,0.5)'); rr2(x, yy, 760 * v * k, 38, 19, c); });
  riseText('LOST PERFORMANCE', x + 380, y + 255, t0 + 1.4, t, { size: 26, color: GOLD, pill: false });
}

// ---------- sections ----------
function chapterCard(t, title, idx, world, iconName, t0) {
  worldBG(t, world);
  reg('label', 'chapter', 360, 340, 1560, 760);
  LABELQ.push(() => {
    riseText(`PART ${idx}`, 960, 420, t0 + 0.05, t, { size: 34, color: TEAL, pill: false, ls: 8 });
    riseText(title.toUpperCase(), 960, 520, t0 + 0.2, t, { size: 84, weight: 700, color: WHITE, pill: false, ls: 5, dur: 0.8 });
    const k = popK(t, t0 + 0.4, 99); if (k > 0) { ctx.save(); ctx.translate(960, 680); ctx.scale(1.3 * k, 1.3 * k); ICONS[iconName](t, {}); ctx.restore(); }
  });
}
const CHAPTERS = [['w1', 'Why you get sleepy', 'indigo', 'hexmol'], ['a1', "Even animals can't skip it", 'teal', 'moon'], ['d1q', 'The first night', 'night', 'clock'], ['b1q', 'The night shift in your head', 'indigo', 'brainmini'],
  ['y1q', 'Your body', 'coral', 'heart'], ['m1q', 'Day two and three', 'indigo', 'eye'], ['r1q', 'The record', 'gold', 'trophy'], ['s1', 'Can you need less?', 'teal', 'dna'], ['k1q', 'Can it kill you?', 'grey', 'alarm'], ['v1', 'Getting it back', 'night', 'bed']];

function sOpen(t) {   // cold open: moon collapse, life meter, delete, YOU, then brain/body/mind tiles
  const C = CUE;
  if (t < LN('c4').start - 0.2) {
    const cam = camAt([[0, 300, 540, 2.25], [C.slept + 0.75, 300, 540, 2.25], [C.slept + 2.1, 960, 540, 1.0], [C.delete - 0.3, 960, 540, 1.04], [C.you - 0.2, 960, 620, 2.0], [LN('c4').start, 960, 620, 2.1]], t);
    worldBG(t, 'night', 0, cam); beginWorld(cam);
    let ms = 1; const d0 = t - C.slept;
    if (d0 > 0) ms = d0 < 0.22 ? 1 + 0.06 * Math.sin(d0 / 0.22 * Math.PI / 2) : Math.max(0, 1.06 * (1 - eic((d0 - 0.22) / 0.33)));
    drawMoon(t, ms, 1);
    if (d0 > 0.55 && d0 < 1.6) { const k = (d0 - 0.55) / 1.05, rr = 60 + k * 1500; const rg = ctx.createRadialGradient(0, 540, rr * 0.9, 0, 540, rr); rg.addColorStop(0, 'rgba(200,225,255,0)'); rg.addColorStop(0.8, `rgba(200,225,255,${0.35 * (1 - k)})`); rg.addColorStop(1, 'rgba(200,225,255,0)'); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(0, 540, rr, 0, 6.283); ctx.fill(); }
    const lt0 = C.sleep - 0.1;
    if (t > lt0 && t < C.delete + 1.6) {
      const out = clamp((C.delete + 1.6 - t) / 0.4), k = eoq((t - lt0) / 0.9), { x, y, w, h } = BAR, sw = w * 26 / 79, sx = x + w - sw;
      const [bx0, by0] = toS(x, y - 60), [bx1, by1] = toS(x + w, y + h + 90); reg('meter', 'life', bx0, by0, bx1, by1);
      ctx.save(); ctx.globalAlpha = out; ctx.fillStyle = 'rgba(6,20,40,0.62)'; ctx.beginPath(); ctx.roundRect(x, y, w * k, h, h / 2); ctx.fill();
      if (t < C.delete) { ctx.fillStyle = TEAL; ctx.beginPath(); ctx.roundRect(sx, y, sw * clamp(eoq((t - C.lying + 1.2) / 0.8)), h, h / 2); ctx.fill(); }
      else for (const s of SHARDS) { const dt = t - C.delete, px = sx + s.x * sw + s.vx * dt, py = y + s.y * h + s.vy * dt + 900 * dt * dt; ctx.save(); ctx.globalAlpha = out * clamp(1 - dt / 1.4); ctx.translate(px, py); ctx.rotate(s.rot * dt); ctx.fillStyle = TEAL; ctx.beginPath(); ctx.roundRect(-s.s / 2, -s.s / 2, s.s, s.s, 3); ctx.fill(); ctx.restore(); }
      ctx.restore();
      riseText('A LIFETIME · 79 YEARS', x, y - 40, lt0 + 0.2, t, { size: 26, color: WHITE, align: 'left', pill: false, out: C.delete + 1.6 });
      riseText(t < C.delete ? '26 YEARS ASLEEP' : 'DELETED', sx + sw / 2, y + h + 46, t < C.delete ? C.lying - 1.0 : C.delete + 0.1, t, { size: 30, color: t < C.delete ? TEAL : GOLD, out: C.delete + 1.6 });
    }
    KID = { x: 960, y: 800 }; regKid(960, 800, 1, 0);
    let sq = 0; const dd = t - C.you; if (dd > 0 && dd < 0.6) sq = Math.sin(dd * 18) * Math.exp(-dd * 7) * 0.9;
    drawKid(t, { squash: sq, look: t < C.slept + 3 ? [-1, -0.4] : t < C.delete + 0.5 ? [0.2, -1] : [0, 0] });
    if (t > C.you) { const [px, py] = toS(960, 500), z = CAM.z; reg('icon', 'YOU pin', px - 50 * z, py - 128 * z, px + 50 * z, py + 8 * z); drawPin(t, C.you, 0); }
    ctx.restore();
    const [bx, by] = toS(BAR.x + BAR.w + 150, BAR.y + 23);
    placeIcon('bed', [[bx, by], [bx, by + 200 * CAM.z]], 1.3 * CAM.z, t, C.sleep + 0.2, C.delete - 0.1);
    label('8 EXTRA HOURS A DAY', 960, 975, t, W_('c3', 'eight'), C.you - 0.4, GOLD, 34);
  } else {   // three coloured tiles: brain / body / mind
    worldBG(t, 'night');
    const tiles = [['brainmini', 'YOUR BRAIN', '#5b4fd6', W_('c4', 'brain')], ['heart', 'YOUR BODY', '#c8505e', W_('c4', 'body')], ['bubble', 'YOUR MIND', '#127b84', W_('c4', 'mind')]];
    tiles.forEach(([ic, lab, col, t0], i) => {
      const k = spring(t - t0 + 0.1, 0.5, 13); if (k <= 0) return; const x = 330 + i * 630, y = 500, w = 520, h = 560;
      const wob = t > W_('c4', 'strange') ? Math.sin(t * 6 + i) * 0.03 : 0;
      ctx.save(); ctx.translate(x, y); ctx.rotate(wob); ctx.scale(k, k); rr2(-w / 2, -h / 2, w, h, 36, col); ctx.restore();
      reg('panel', lab, x - w / 2, y - h / 2, x + w / 2, y + h / 2);
      ctx.save(); ctx.translate(x, y - 60); ctx.scale(2.0 * k, 2.0 * k); ICONS[ic](t, {}); ctx.restore();
      if (k > 0.6) riseText(lab, x, y + 170, t0 + 0.15, t, { size: 40, weight: 700, color: WHITE, pill: false });
    });
  }
}
function sClock(t) {   // w2-w3: the inner clock (SCN) and melatonin
  worldBG(t, 'indigo'); const B = { x: 860, y: 560, r: 270 };
  drawBrainAt(t, B, { tired: 0, glow: 1, dim: 0, halo: 'rgba(143,216,230,0.25)' });
  const tS = W_('w2', 'cluster'); if (t > tS) brainOverlay(B, 'scn', t, eoc((t - tS) / 0.5));
  const tL = W_('w2', 'light');
  if (t > tL) { const k = eoq((t - tL) / 0.6); ctx.save(); ctx.globalAlpha = 0.8; const g = ctx.createLinearGradient(360, 430, 800, 650); g.addColorStop(0, 'rgba(255,217,138,0.9)'); g.addColorStop(1, 'rgba(255,217,138,0.1)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(380, 420); ctx.lineTo(380 + (B.x - 0.22 * B.r - 380) * k, 420 + (B.y + 0.32 * B.r - 420) * k); ctx.lineTo(380, 444); ctx.fill(); ctx.restore(); }
  placeIcon('eye', [[300, 430]], 1.3, t, tL - 0.3, LN('w3').start, { open: 1, hw: 62, hh: 40 });
  placeIcon('clock', [[1460, 360]], 1.4, t, W_('w2', 'clock'), W_('w3', 'dark') - 0.45, { h: (t * 0.6) % 12, m: (t * 7) % 60, hw: 54, hh: 54 });
  label('~20,000 CELLS KEEP TIME', 860, 950, t, tS, LN('w3').start, TEAL, 32);
  const tM = W_('w3', 'melatonin');
  placeIcon('moon', [[1460, 360]], 1.4, t, W_('w3', 'dark'), LN('w3').end + 0.2, { hw: 50, hh: 50 });
  placeIcon('hexmol', [[1460, 620]], 1.5, t, tM, LN('w3').end + 0.2, { hw: 70, hh: 70 });
  tag('MELATONIN', 1460, 790, t, tM + 0.1, LN('w3').end + 0.2, '#7f6ff0', 34);
}
function sHourglass(t) {   // w4-w7: adenosine hourglass, caffeine blocking, half-life
  const C = CUE; worldBG(t, 'teal');
  const t0 = LN('w4').start, tE = W_('w5', 'empties'), tC = LN('w6').start;
  let fill = clamp((t - t0) / (tE - t0)) * 0.9, flip = 0;
  if (t > tE && t < tC) { const k = eic((t - tE) / 1.2); flip = k; fill = 0.9 * (1 - k); }
  if (t >= tC) fill = clamp(0.1 + (t - tC) / 10, 0, 0.95);
  const hx = t < tC ? 760 : 520; hourglass(t, hx, 540, 1.25, fill, flip < 1 ? flip : 0); reg('hero', 'hourglass', hx - 160, 280, hx + 160, 800);
  tag('ADENOSINE', hx, 870, t, W_('w4', 'adenosine'), tC - 0.3, '#c7621f', 36);
  label('SLEEP PRESSURE', hx, 950, t, W_('w4', 'pressure'), tE - 0.5, GOLD, 30);
  label('SLEEP EMPTIES IT', hx, 950, t, tE - 0.1, tC - 0.4, TEAL, 30);
  if (t >= tC - 0.2) {   // receptor docks: caffeine sits in the docks, adenosine can't land
    const cx = 1340, cy = 470, R0 = 250, k = spring(t - tC + 0.2, 0.5, 12); reg('hero', 'receptors', cx - R0, cy - R0, cx + R0, cy + R0);
    ctx.save(); circ(cx, cy, R0 * k, '#0b4f5c'); ctx.beginPath(); ctx.arc(cx, cy, R0 * k, 0, 6.283); ctx.clip();
    for (let i = 0; i < 4; i++) { const dx = cx - 180 + i * 120, dy = cy + 120; rr2(dx - 40, dy - 10, 80, 60, 20, '#f29db0'); rr2(dx - 22, dy - 26, 44, 30, 15, '#0b4f5c');
      const blk = t > W_('w6', 'caffeine') + i * 0.2; if (blk) rr2(dx - 20, dy - 30, 40, 26, 13, '#7a4a2c'); }
    for (let i = 0; i < 9; i++) { const ph = (t * 0.6 + i * 0.37) % 1, bx = cx - 200 + (i * 53) % 400, by = cy - 180 + ph * 230; circ(bx, by, 14, '#ff9a3c'); }
    ctx.restore(); ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.arc(cx, cy, R0 * k + 10, 0, 6.283); ctx.arc(cx, cy, R0 * k, 0, 6.283, true); ctx.fill(); ctx.restore();
    label('CAFFEINE BLOCKS THE DOCKS', cx, 790, t, W_('w6', 'caffeine'), W_('w6', 'pile') - 0.6, GOLD, 30);
    label('THE SAND STILL PILES UP', cx, 790, t, W_('w6', 'pile') - 0.2, LN('w7').start - 0.3, TEAL, 30);
    placeIcon('coffee', [[1760, 230], [1760, 760]], 1.2, t, tC, LN('w7').end, { hw: 58, hh: 62 });
    meter(1130, 880, 420, 0.5, t, W_('w7', 'half'), LN('w7').end, '#ffd98a', '#ff8f4a', 'HALF STILL THERE AFTER 5–6 H');
    placeIcon('clock', [[1700, 880]], 0.9, t, W_('w7', 'five'), LN('w7').end, { h: 21, m: 0, hw: 54, hh: 54 });
  }
}
function sAnimals(t) {   // a1-a4: three panels slide in: dolphin, frigatebird, jellyfish
  worldBG(t, 'teal'); const P = [[W_('a2', 'dolphins'), '#1a5f9e', 'dolphin'], [W_('a3', 'frigate'), '#5aa9e6', 'bird'], [W_('a3b', 'upside'), '#2d2b7c', 'jelly']];
  P.forEach(([t0, col, kind], i) => {
    const k = eoq((t - t0 + 0.15) / 0.6); if (k <= 0) return; const x0 = i * 640, off = (1 - k) * (i % 2 ? -1 : 1) * 1080;
    ctx.save(); ctx.translate(0, off); rr2(x0 + 8, 8, 624, 1064, 30, col); reg('panel', kind, x0, 0, x0 + 640, 1080);
    if (kind === 'dolphin') { dolphin(t, x0 + 320, 520, 1.1); reg('hero', 'dolphin', x0 + 100, 380, x0 + 540, 640);
      const half = 0.5 + 0.5 * Math.sin(t * 0.8); ctx.save(); ctx.translate(x0 + 320, 230); circ(-34, 0, 40, `rgba(255,217,138,${0.3 + 0.7 * half})`); circ(34, 0, 40, `rgba(255,217,138,${1 - 0.7 * half})`); ctx.restore(); reg('hero', 'hemispheres', x0 + 240, 180, x0 + 400, 280); }
    if (kind === 'bird') { frigatebird(t, x0 + 320, 420, 1.2); reg('hero', 'bird', x0 + 80, 340, x0 + 560, 500); for (let j = 0; j < 4; j++) rr2(x0 + 60 + j * 140, 880, 100, 16, 8, 'rgba(255,255,255,0.35)'); }
    if (kind === 'jelly') { jellyfish(t, x0 + 320, 640, 1.3); reg('hero', 'jelly', x0 + 190, 520, x0 + 450, 700); rr2(x0 + 8, 740, 624, 330, 30, '#24236a'); }
    ctx.restore();
  });
  label('HALF A BRAIN AT A TIME', 320, 950, t, W_('a2', 'half'), LN('a4').end, WHITE, 28);
  label('~40 MIN A DAY IN FLIGHT', 960, 950, t, W_('a3', 'forty'), LN('a4').end, WHITE, 28);
  label('NO BRAIN, STILL SLEEPS', 1600, 950, t, W_('a3b', 'brain'), LN('a4').end, WHITE, 28);
  placeIcon('moon', [[320, 760]], 1.0, t, W_('a2', 'eye'), LN('a4').end, { hw: 48, hh: 48 });
  placeIcon('sun', [[960, 680]], 0.9, t, W_('a3', 'land'), LN('a4').end, { hw: 64, hh: 64 });
  if (t > LN('a4').start) tag('NO ANIMAL SKIPS IT', 960, 120, t, W_('a4', 'never'), LN('a4').end, '#e2457a', 40);
}
function sNightKid(t, opt = {}) {   // the mascot at night (first night chapter)
  worldBG(t, opt.world || 'night'); CAM = { x: 960, y: 540, z: 1 }; KID = { x: opt.x || 960, y: 880 };
  ctx.save(); ctx.translate(KID.x, 880); ctx.scale(1.3, 1.3); ctx.translate(-KID.x, -880);
  drawKid(t, { lid: opt.lid ?? 0.4, look: opt.look || [0, 0], wobble: opt.wob || 0, blink: blinkAmt(t) }); ctx.restore();
  reg('hero', 'mascot', KID.x - 85, 880 - 380, KID.x + 85, 896);
}
function sFirstNight(t) {
  const L1 = LN('d1'), L2 = LN('d2'), L3 = LN('d3'), L3b = LN('d3b'), L4 = LN('d4'), C = CUE;
  if (t < L2.start - 0.1) { sNightKid(t, { lid: 0.35, look: [1, -0.5] });
    placeIcon('clock', [[1300, 460], [560, 460]], 1.8, t, W_('d1', 'midnight') - 0.3, L2.start, { h: 0, m: 0, hw: 54, hh: 54 }); label('MIDNIGHT', 1300, 640, t, W_('d1', 'midnight'), L2.start - 0.3, GOLD, 34); return; }
  if (t < L3.start - 0.1) {   // hour 17: teal panel, drinks
    worldBG(t, 'teal'); KID = { x: 420, y: 900 }; ctx.save(); ctx.translate(420, 900); ctx.scale(1.25, 1.25); ctx.translate(-420, -900); drawKid(t, { lid: 0.45, look: [1, 0] }); ctx.restore(); reg('hero', 'mascot', 340, 540, 500, 915);
    tag('17 HOURS AWAKE', 960, 300, t, C.h17 - 0.1, L3.start - 0.4, '#0b4f5c', 40); meter(730, 410, 460, 0.05 / 0.12, t, C.drinks - 0.2, L3.start - 0.4, '#ffd98a', '#ff8f4a', 'LIKE 0.05% BLOOD ALCOHOL');
    placeIcon('wine', [[1100, 680]], 1.4, t, C.drinks - 0.05, L3.start - 0.3); placeIcon('beer', [[1340, 690]], 1.4, t, C.drinks + 0.12, L3.start - 0.3); return; }
  if (t < L3b.start - 0.1) {   // 4 AM low point
    sNightKid(t, { world: 'indigo', lid: 0.65, x: 700, look: [1, 0] });
    placeIcon('clock', [[1180, 360]], 1.5, t, W_('d3', 'four') - 0.2, L3b.start - 0.3, { h: 4, m: 0, hw: 54, hh: 54 }); label('4 AM', 1180, 500, t, W_('d3', 'four'), L3b.start - 0.4, GOLD, 34);
    placeIcon('thermo', [[1480, 380]], 1.4, t, W_('d3', 'temperature'), L3b.start - 0.3, { level: 0.25, hw: 36, hh: 90 });
    placeIcon('carz', [[1330, 760]], 1.6, t, W_('d3', 'drowsy'), L3b.start - 0.3, { hw: 80, hh: 76 });
    label('~90,000 POLICE-REPORTED CRASHES A YEAR (US)', 960, 975, t, W_('d3', 'ninety'), L3b.start - 0.4, WHITE, 28); return; }
  if (t < L4.start - 0.1) {   // dawn: second wind, but the hourglass keeps filling
    const k = eoq((t - L3b.start) / 1.5); worldBG(t, 'gold'); ctx.save(); ctx.globalAlpha = 1 - k; worldBG(t, 'indigo'); ctx.restore();
    CAM = { x: 960, y: 540, z: 1 }; KID = { x: 620, y: 880 }; ctx.save(); ctx.translate(620, 880); ctx.scale(1.3, 1.3); ctx.translate(-620, -880); drawKid(t, { lid: 0.2, look: [1, -0.6], armsUp: t > W_('d3b', 'wind') }); ctx.restore(); reg('hero', 'mascot', 535, 500, 705, 896);
    placeIcon('sun', [[1100, 300]], 1.6, t, W_('d3b', 'sun'), L4.start - 0.2, { hw: 64, hh: 64 });
    hourglass(t, 1450, 560, 0.75, clamp(0.55 + (t - L3b.start) * 0.04), 0); reg('hero', 'hourglass', 1450 - 100, 400, 1450 + 100, 720);
    label('SECOND WIND', 620, 975, t, W_('d3b', 'wind'), L4.start - 0.3, GOLD, 34); label('STILL FILLING', 1450, 790, t, W_('d3b', 'sand'), L4.start - 0.3, TEAL, 28); return; }
  // hour 24: split panels
  const k = eoq((t - L4.start) / 0.6), mid = W / 2;
  worldBG(t, 'teal'); ctx.save(); ctx.beginPath(); ctx.rect(lerp(W, mid, k), 0, W, H); ctx.clip(); worldBG(t, 'coral'); ctx.restore();
  KID = { x: 300, y: 900 }; ctx.save(); ctx.translate(300, 900); ctx.scale(1.25, 1.25); ctx.translate(-300, -900); drawKid(t, { lid: 0.6, look: [1, 0], wobble: t > C.drunk ? Math.sin(t * 5) * 8 : 0 }); ctx.restore(); reg('hero', 'mascot', 220, 540, 380, 915);
  tag('17 HOURS AWAKE', 480, 300, t, L4.start, L4.end + 0.2, '#0b4f5c', 36); meter(250, 410, 460, 0.05 / 0.12, t, L4.start, L4.end + 0.2, '#ffd98a', '#ff8f4a', 'LIKE 0.05%');
  placeIcon('wine', [[560, 680]], 1.3, t, L4.start, L4.end + 0.2); placeIcon('beer', [[760, 690]], 1.3, t, L4.start, L4.end + 0.2);
  tag('24 HOURS AWAKE', 1440, 300, t, C.h24 - 0.1, L4.end + 0.2, '#9b3352', 36); meter(1210, 410, 460, 0.10 / 0.12, t, C.h24 + 0.1, L4.end + 0.2, '#ffd98a', '#e2457a', 'LIKE 0.10% · OVER THE LIMIT');
  placeIcon('car', [[1440, 700]], 2.2, t, C.drunk - 0.6, L4.end + 0.2, { hw: 78, hh: 60 });
}
function sNightShift(t) {   // b1-b4b
  const L = id => LN(id);
  if (t < L('b2').start - 0.1) { worldBG(t, 'cream'); const B = { x: 860, y: 560, r: 300 }; drawBrainAt(t, B, { tired: 0, glow: 1, dim: 0 });
    tag('NIGHT SHIFT', 860, 920, t, W_('b1', 'job') - 0.3, L('b2').start - 0.3, '#5b4fd6', 40);
    placeIcon('switchoff', [[1450, 360]], 1.4, t, W_('b1', 'off'), W_('b1', 'different') - 0.2, { hw: 54, hh: 30 });
    placeIcon('moon', [[1450, 600]], 1.3, t, W_('b1', 'different'), L('b2').start - 0.2, { hw: 50, hh: 50 }); return; }
  if (t < L('b3').start - 0.1) {   // hypnogram + REM
    worldBG(t, 'indigo'); hypnogram(t, 260, 230, 1200, 330, L('b2').start + 0.2);
    label('5 CYCLES · ~90 MIN EACH', 860, 900, t, W_('b2', 'ninety'), L('b2b').start - 0.2, TEAL, 32);
    placeIcon('dream', [[1700, 380]], 1.3, t, W_('b2b', 'dreams'), L('b3').start - 0.2, { hw: 72, hh: 80 });
    placeIcon('switchoff', [[1700, 640]], 1.3, t, W_('b2b', 'muscles'), L('b3').start - 0.2, { hw: 54, hh: 30 });
    label('MUSCLES OFF', 1700, 730, t, W_('b2b', 'muscles') + 0.1, L('b3').start - 0.3, GOLD, 26);
    label('1.5–2 H OF REM A NIGHT', 860, 900, t, W_('b2b', 'hour'), L('b3').start - 0.3, GOLD, 32); return; }
  if (t < L('b4b').start - 0.1) {   // hippocampus replay + saving
    worldBG(t, 'cream'); const B = { x: 620, y: 560, r: 280 }; drawBrainAt(t, B, { tired: 0, glow: 1, dim: 0 }); brainOverlay(B, 'hippo', t, eoc((t - W_('b3', 'hippocampus')) / 0.5));
    tag('HIPPOCAMPUS', 620, 900, t, W_('b3', 'hippocampus'), L('b4').start - 0.3, '#c7621f', 34);
    maze(t, 1400, 420, 1.1, W_('b3', 'rats'), t > W_('b3', 'rehearsing') - 0.6 ? W_('b3', 'rehearsing') - 0.6 : null); reg('hero', 'maze', 1220, 290, 1580, 550);
    label(t > W_('b3', 'rehearsing') - 0.6 ? 'REPLAYED IN SLEEP' : 'AWAKE IN THE MAZE', 1400, 640, t, W_('b3', 'rats'), L('b4').start - 0.3, TEAL, 28);
    if (t > L('b4').start - 0.2) {   // files fly hippocampus -> cortex
      for (let i = 0; i < 4; i++) { const k = clamp((t - W_('b4', 'copied') - i * 0.5) / 0.9); if (k <= 0) continue; const x = lerp(B.x + B.r + 60, 1670 - i * 150, eoq(k)), y = lerp(B.y - 20, 800, eoq(k)) - Math.sin(k * Math.PI) * 120;
        reg('icon', 'doc' + i, x - 34, y - 46, x + 34, y + 46); ctx.save(); ctx.translate(x, y); ICONS.doc(t, { bad: t > W_('b4', 'skip') && i > 1 }); ctx.restore(); }
      label(t > W_('b4', 'skip') ? 'NOT SAVED' : 'SAVED TO LONG-TERM', 1430, 920, t, W_('b4', 'copied'), L('b4b').start - 0.3, t > W_('b4', 'skip') ? '#e2457a' : GOLD, 30);
    } return; }
  worldBG(t, 'indigo'); placeIcon('photo', [[620, 430], [860, 430], [1100, 430]].map(p => p), 1.6, t, L('b4b').start, L('b5').start - 0.1, { hw: 66, hh: 54 });
  placeIcon('photo', [[900, 430]], 1.6, t, L('b4b').start + 0.2, L('b5').start - 0.1, { hw: 66, hh: 54 });
  placeIcon('photo', [[1180, 430]], 1.6, t, L('b4b').start + 0.4, L('b5').start - 0.1, { hw: 66, hh: 54 });
  meter(660, 690, 600, 0.81, t, W_('b4b', 'remembered'), L('b5').start - 0.1, '#ff8f4a', '#e2457a', 'REMEMBERED AFTER A SLEEPLESS NIGHT');
  label('−19%', 960, 850, t, W_('b4b', 'nineteen'), L('b5').start - 0.1, GOLD, 48);
}
function sCleaning(t) {   // b5-b6: reuse the brain + glymphatic focus ring
  const C = CUE; worldBG(t, 'cream');
  const washDim = t > C.wash ? eoc((t - C.wash) / 0.8) : 0;
  drawBrainAt(t, { x: 700, y: 560, r: 300 }, { tired: 0.2, glow: 1 - washDim * 0.7, dim: washDim * 0.8, halo: 'rgba(255,255,255,0.55)' });
  focusRing(t, 1480, 470, 250);
  tag('CLEANING CREW', 700, 905, t, LN('b5').start, C.during, '#c95a7c', 36);
  tag('GLYMPHATIC FLUSH', 1480, 790, t, C.washes, C.nosleep, '#2a8fa3', 34);
  label('WASTE PILING UP', 700, 990, t, C.trash + 0.4, C.nosleep, GOLD, 30);
  label('CELLS SHRINK APART', 1480, 790, t, C.during + 0.3, C.washes - 0.45, TEAL, 30);
  label('+60% SPACE · MOUSE STUDY 2013', 1480, 862, t, W_('b6', 'sixty'), C.nosleep, WHITE, 26);
  label('NO SLEEP · NO WASH', 1480, 790, t, C.wash, LN('b6').end + 0.6, GOLD, 34);
  placeIcon('bin', [[1400, 520], [1180, 700]], 1.3, t, C.trash, C.during - 0.5);
  for (let i = 0; i < 3; i++) placeIcon('drop', [[1115, 300 + i * 130]], 0.9, t, C.washes + i * 0.12, C.nosleep, { hw: 34, hh: 46 });
  placeIcon('plaque', [[1840, 560], [1840, 920]], 1.2, t, C.alz, C.nosleep, { hw: 48, hh: 44 });
}
function sBody(t) {   // y1-y4b
  const L = id => LN(id);
  if (t < L('y2').start - 0.1) { worldBG(t, 'coral'); hormoneBars(t, 260, 360, L('y1').start + 0.6);
    KID = { x: 1600, y: 900 }; CAM = { x: 960, y: 540, z: 1 }; ctx.save(); ctx.translate(1600, 900); ctx.scale(1.1, 1.1); ctx.translate(-1600, -900); drawKid(t, { lid: 0.4, look: [-1, -0.2], wobble: Math.sin(t * 9) * 3 }); ctx.restore(); reg('hero', 'mascot', 1530, 570, 1670, 915);
    label('AFTER 2 SHORT NIGHTS', 640, 860, t, W_('y1', 'two'), L('y2').start - 0.3, WHITE, 30); return; }
  if (t < L('y3').start - 0.1) { worldBG(t, 'coral'); const ts = [W_('y2', 'crave'), W_('y2', 'sugar'), W_('y2', 'fat')];
    ['donut', 'fries', 'burger'].forEach((ic, i) => { const k = spring(t - ts[i] + 0.1, 0.5, 13); if (k <= 0) return; const x = 380 + i * 580, cols = ['#9b3352', '#b84a5e', '#d4566a'];
      ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); rr2(-240, -260, 480, 520, 36, cols[i]); ctx.restore(); reg('panel', ic, x - 240, 260, x + 240, 780); ctx.save(); ctx.translate(x, 500); ctx.scale(2.2 * k, 2.2 * k); ICONS[ic](t, {}); ctx.restore(); });
    label('TIRED BRAINS CRAVE SUGAR AND FAT', 960, 900, t, W_('y2', 'crave'), L('y3').start - 0.3, WHITE, 32); return; }
  if (t < L('y4').start - 0.1) { worldBG(t, 'cream');
    if (t < L('y3b').start - 0.1) { placeIcon('sugar', [[620, 460]], 2.2, t, L('y3').start, L('y3b').start - 0.2, { hw: 64, hh: 56 });
      tag('6 NIGHTS × 4 HOURS', 620, 760, t, W_('y3', 'six'), L('y3b').start - 0.3, '#c95a7c', 36);
      meter(1080, 470, 620, 0.78, t, W_('y3', 'handled') - 0.3, L('y3b').start - 0.2, '#ffd98a', '#e2457a', 'BLOOD SUGAR CONTROL LOST');
      label('LIKE PEOPLE ON THE WAY TO DIABETES', 1390, 620, t, W_('y3', 'diabetes'), L('y3b').start - 0.3, GOLD, 26); }
    else { placeIcon('moon', [[560, 360]], 1.6, t, L('y3b').start, L('y4').start - 0.2, { hw: 50, hh: 50 }); placeIcon('muscle', [[960, 520]], 2.2, t, W_('y3b', 'growth'), L('y4').start - 0.2, { hw: 80, hh: 60 });
      tag('GROWTH HORMONE', 960, 780, t, W_('y3b', 'growth') + 0.1, L('y4').start - 0.3, '#c95a7c', 36); label('RELEASED IN DEEP SLEEP', 960, 880, t, W_('y3b', 'deep'), L('y4').start - 0.3, TEAL, 30); }
    return; }
  if (t < L('y4b').start - 0.1) { worldBG(t, 'grey'); CAM = { x: 960, y: 540, z: 1 }; KID = { x: 960, y: 880 }; ctx.save(); ctx.translate(960, 880); ctx.scale(1.3, 1.3); ctx.translate(-960, -880); drawKid(t, { lid: 0.5, look: [0.5, -0.3] }); ctx.restore(); reg('hero', 'mascot', 875, 500, 1045, 896);
    placeIcon('shield', [[1240, 640]], 1.5, t, W_('y4', 'defences'), L('y4b').start - 0.2, { crack: t > W_('y4', 'weaken'), hw: 66, hh: 76 });
    [[420, 300], [600, 520], [380, 700], [1500, 300], [1600, 560]].forEach(([x, y], i) => placeIcon('virus', [[x, y]], 1.0, t, W_('y4', 'virus') - 1.2 + i * 0.15, L('y4b').start - 0.2, { hw: 58, hh: 58 }));
    tag('≈4× MORE COLDS', 960, 300, t, W_('y4', 'four'), L('y4b').start - 0.3, '#5aa96a', 40); label('SLEEP ≤ 6 HOURS', 960, 975, t, W_('y4', 'six'), L('y4b').start - 0.3, WHITE, 30); return; }
  worldBG(t, 'coral'); const ts = [W_('y4b', 'heart'), W_('y4b', 'obesity'), W_('y4b', 'diabetes')];
  placeIcon('calendar', [[960, 470]], 2.0, t, LN('y4b').start, ts[0] - 0.45, { text: 'YEARS', small: true, hw: 56, hh: 62 });
  [['heart', 'HEART DISEASE'], ['scale', 'OBESITY'], ['sugar', 'DIABETES']].forEach(([ic, lab], i) => { const k = spring(t - ts[i] + 0.1, 0.5, 13); if (k <= 0) return; const x = 380 + i * 580, cols = ['#9b3352', '#b84a5e', '#d4566a'];
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); rr2(-240, -260, 480, 520, 36, cols[i]); ctx.restore(); reg('panel', lab, x - 240, 260, x + 240, 780); ctx.save(); ctx.translate(x, 480); ctx.scale(2.0 * k, 2.0 * k); ICONS[ic](t, {}); ctx.restore();
    if (k > 0.6) riseText(lab, x, 680, ts[i] + 0.15, t, { size: 34, weight: 700, color: WHITE, pill: false }); });
  label('YEARS OF UNDER 6 HOURS', 960, 900, t, W_('y4b', 'years'), LN('y4b').end + 0.3, GOLD, 30);
}
function sMicro2(t) {
  const C = CUE;
  if (t < LN('m2').start - 0.1) { sNightKid(t, { world: 'indigo', lid: 0.6, look: [0, 0.3] }); tag('DAY 2', 960, 300, t, C.day2, LN('m2').start - 0.3, '#5b4fd6', 44);
    label('MICROSLEEPS', 960, 975, t, C.micro, LN('m2').start - 0.3, TEAL, 36);
    placeIcon('eye', [[520, 470]], 1.7, t, C.micro, LN('m2').start - 0.2, { open: t < C.eyes ? 0 : eoq((t - C.eyes) / 0.4), hw: 62, hh: 40 });
    placeIcon('watch', [[1400, 470]], 1.3, t, C.micro + 0.4, LN('m2').start - 0.2, { hw: 50, hh: 70 }); return; }
  if (t < LN('m3').start - 0.1) { worldBG(t, 'indigo'); const B = { x: 760, y: 560, r: 290 }; drawBrainAt(t, B, { tired: 0.5, glow: 1, dim: 0, noWaste: 1 });
    brainOverlay(B, 'amyg', t, eoc((t - W_('m2', 'amygdala')) / 0.5));
    tag('AMYGDALA', 760, 900, t, W_('m2', 'amygdala'), LN('m3').start - 0.3, '#e2457a', 36);
    placeIcon('alarm', [[1420, 380]], 1.6, t, W_('m2', 'alarm'), LN('m3').start - 0.2, { hw: 62, hh: 62 }); label('+60% REACTION', 1420, 560, t, W_('m2', 'sixty'), LN('m3').start - 0.3, GOLD, 32);
    if (t > W_('m2', 'front')) { ctx.save(); ctx.globalAlpha = 0.5 * eoc((t - W_('m2', 'front')) / 0.6); circ(B.x - 0.7 * B.r, B.y - 0.15 * B.r, 0.28 * B.r, '#18164a'); ctx.restore(); label('CALM FRONT LOSES GRIP', 1420, 700, t, W_('m2', 'front'), LN('m3').start - 0.3, TEAL, 26); }
    return; }
  if (t < LN('m4').start - 0.1) { const w = warpAmt(t); worldBG(t, 'indigo', w); CAM = { x: 960, y: 540, z: 1 }; KID = { x: 960, y: 880 };
    ctx.save(); ctx.translate(960, 880); ctx.scale(1.3, 1.3); ctx.translate(-960, -880); drawKid(t, { lid: 0.75, look: [Math.sin(t * 1.5), -0.4] }); ctx.restore(); reg('hero', 'mascot', 875, 500, 1045, 896);
    tag('DAY 3', 960, 300, t, C.day3, LN('m4').start - 0.3, '#5b4fd6', 44); label('HALLUCINATIONS', 960, 975, t, W_('m3', 'hallucinations') - 0.3, LN('m4').start - 0.3, GOLD, 40); hallucinations(t, w); return; }
  worldBG(t, 'night');   // Peter Tripp: our own DJ in a glass booth
  booth(t, 660, 900, 1.25); reg('hero', 'booth', 660 - 215, 900 - 470, 660 + 215, 905);
  tag('NEW YORK · 1959', 1360, 260, t, W_('m4', 'york') - 0.3, LN('m5').end + 0.3, '#5b4fd6', 36);
  label('201 HOURS AWAKE', 1360, 360, t, W_('m4', 'two'), LN('m5').end + 0.3, GOLD, 40);
  label('FOR CHARITY, FROM A GLASS BOOTH', 1360, 440, t, W_('m4', 'glass') - 0.4, LN('m5').end + 0.3, WHITE, 26);
  placeIcon('spider', [[1240, 640]], 1.3, t, W_('m5', 'spiders'), LN('m5').end + 0.3, { hw: 60, hh: 50 });
  placeIcon('mouse', [[1480, 660]], 1.4, t, W_('m5', 'mice'), LN('m5').end + 0.3, { hw: 70, hh: 40 });
  placeIcon('pill', [[1720, 640]], 1.2, t, W_('m5', 'stimulants'), LN('m5').end + 0.3, { hw: 52, hh: 44 });
  label('STIMULANTS MAY HAVE MADE IT WORSE', 1480, 820, t, W_('m5', 'stimulants') + 0.2, LN('m5').end + 0.3, TEAL, 24);
}
function sRecord2(t) {
  const C = CUE; worldBG(t, 'gold');
  drawTeen(t, 520, 900, 1.45, { lid: lerp(0.4, 0.8, clamp((t - LN('r1').start) / 20)) }); reg('hero', 'teen', 520 - 110, 900 - 545, 520 + 110, 915);
  label('RANDY GARDNER · AGE 17', 520, 985, t, W_('r1', 'randy'), LN('r4').end, WHITE, 30);
  if (t < LN('r2').start - 0.1) {
    placeIcon('trophy', [[1100, 400]], 1.5, t, LN('r1').start + 0.3, LN('r2').start - 0.2, { hw: 66, hh: 60 });
    placeIcon('calendar', [[1360, 400]], 1.4, t, W_('r1', '1964') - 0.3, LN('r2').start - 0.2, { text: t < C.eleven - 1.1 ? '1964' : 'DAY ' + Math.min(11, Math.max(1, Math.ceil((t - C.eleven + 1.1) / 1.1 * 11))), small: t >= C.eleven - 1.1, hw: 56, hh: 62 });
    placeIcon('poster', [[1620, 400]], 1.3, t, W_('r1', 'science'), LN('r2').start - 0.2, { hw: 74, hh: 60 });
    label('264 HOURS · 11 DAYS', 1360, 620, t, C.eleven, LN('r2').start - 0.3, GOLD, 40); return; }
  if (t < LN('r3').start - 0.1) { const seq = [100, 93, 86, 79, 72, 65], t0 = W_('r2', 'count'), n = clamp(Math.floor((t - t0) / 0.55) + 1, 0, 6);
    for (let i = 0; i < n; i++) riseText(String(seq[i]) + (i === 5 ? '…?' : ''), 1000 + i * 140, 470, t0 + i * 0.55, t, { size: 56, weight: 700, color: i === 5 ? '#e2457a' : WHITE, pill: false });
    reg('label', 'countdown', 940, 420, 1830, 520);
    label('MOODY · PARANOID', 1360, 640, t, W_('r2', 'moody'), LN('r3').start - 0.3, TEAL, 32); return; }
  if (t < LN('r4').start - 0.1) { placeIcon('pinball', [[1360, 460]], 2.0, t, W_('r3', 'pinball') - 0.4, LN('r4').start - 0.2, { hw: 52, hh: 72 });
    label('DAY 10: BEAT A SLEEP SCIENTIST', 1360, 700, t, W_('r3', 'ten'), LN('r4').start - 0.3, GOLD, 30); return; }
  placeIcon('book', [[1360, 420]], 2.0, t, LN('r4').start, LN('r4').end + 0.3, { hw: 62, hh: 52 });
  tag('NO LONGER ACCEPTED', 1360, 620, t, W_('r4', 'accepts'), LN('r4').end + 0.3, '#e2457a', 40); label('TOO DANGEROUS', 1360, 720, t, W_('r4', 'dangerous'), LN('r4').end + 0.3, WHITE, 30);
}
function sShort(t) {
  const L = id => LN(id);
  if (t < L('s3').start - 0.1) { worldBG(t, 'teal'); sNightKidLite(t, 400);
    placeIcon('dna', [[1000, 430]], 1.6, t, W_('s2', 'mutation') - 0.3, L('s3').start - 0.2, { hw: 50, hh: 96 });
    placeIcon('family', [[1380, 470]], 1.8, t, W_('s2', 'mother'), L('s3').start - 0.2, { hw: 64, hh: 90 });
    tag('DEC2 · 2009', 1000, 700, t, W_('s2', 'gene'), L('s3').start - 0.3, '#0b4f5c', 36); label('~6 H, FULLY RESTED', 1380, 700, t, W_('s2', 'six'), L('s3').start - 0.3, GOLD, 30);
    label('SOME PEOPLE?', 400, 975, t, L('s1').start + 0.3, L('s2').start, WHITE, 30); return; }
  if (t < L('s4').start - 0.1) { worldBG(t, 'teal'); placeIcon('family', [[560, 440]], 1.4, t, L('s3').start, W_('s3', 'everyone') - 0.2, { hw: 64, hh: 90 }); label('A HANDFUL OF FAMILIES', 560, 640, t, W_('s3', 'handful'), W_('s3', 'everyone') - 0.3, WHITE, 28);
    placeIcon('bedclock', [[1300, 450]], 2.0, t, W_('s3', 'everyone'), L('s4').start - 0.2, { hw: 76, hh: 96 }); tag('ADULTS: 7+ HOURS', 1300, 700, t, W_('s3', 'seven'), L('s4').start - 0.3, '#e2457a', 40); return; }
  if (t < L('s5').start - 0.1) { worldBG(t, 'indigo'); equalBars(t, 320, 330, W_('s4', 'six'));
    meter(320, 820, 760, 0.25, t, W_('s4', 'felt'), L('s5').start - 0.2, '#8fd8e6', '#5aa9e6', 'HOW SLEEPY THEY FELT');
    tag("YOU DON'T NOTICE", 1500, 860, t, W_('s4', 'notice') - 0.4, L('s5').start - 0.3, '#e2457a', 32); return; }
  worldBG(t, 'teal'); placeIcon('plane', [[620, 420]], 2.0, t, W_('s5', 'nasa') - 0.3, L('s5').end + 0.4, { hw: 80, hh: 66 });
  placeIcon('pillow', [[1300, 420]], 1.0, t, W_('s5', 'napped'), L('s5').end + 0.4, { hw: 130, hh: 70 });
  tag('~26-MIN NAP', 1300, 600, t, W_('s5', 'twenty'), L('s5').end + 0.4, '#0b4f5c', 36); label('UP TO +54% ALERTNESS', 960, 800, t, W_('s5', 'fifty'), L('s5').end + 0.4, GOLD, 40);
}
function sNightKidLite(t, x) { CAM = { x: 960, y: 540, z: 1 }; KID = { x, y: 880 }; ctx.save(); ctx.translate(x, 880); ctx.scale(1.3, 1.3); ctx.translate(-x, -880); drawKid(t, { lid: 0.3, look: [1, -0.4] }); ctx.restore(); reg('hero', 'mascot', x - 85, 500, x + 85, 896); }
function sKill(t) {
  const L = id => LN(id);
  if (t < L('k2').start - 0.1) { worldBG(t, 'grey'); const k = eoq((t - L('k1').start) / 1.0); drawRat2(t, lerp(1200, 900, k), 700, 2.0); reg('hero', 'rat', lerp(1200, 900, k) - 220, 460, lerp(1200, 900, k) + 330, 720);
    label('LAB RATS · 11–32 DAYS', 960, 900, t, W_('k1', 'rats'), L('k2').start - 0.3, TEAL, 36); placeIcon('flask', [[1520, 470], [400, 470]], 1.5, t, W_('k1', 'lab'), L('k2').start - 0.2, { hw: 62, hh: 72 }); return; }
  if (t < L('k4').start - 0.1) { worldBG(t, 'cream');
    placeIcon('fly', [[360, 380]], 1.8, t, W_('k2', 'flies'), L('k4').start - 0.2, { hw: 50, hh: 64 }); placeIcon('mouse', [[360, 680]], 1.6, t, W_('k2', 'mice'), L('k4').start - 0.2, { hw: 80, hh: 46 });
    placeIcon('brainmini', [[880, 420]], 1.5, t, W_('k2', 'brain') - 0.2, L('k3').start - 0.2, { hw: 66, hh: 60 }); label('NOT HERE', 880, 560, t, W_('k2', 'brain'), L('k3').start - 0.3, TEAL, 26);
    placeIcon('gut', [[1360, 460]], 2.0, t, W_('k2', 'gut') - 0.2, L('k4').start - 0.2, { ros: clamp((t - W_('k2', 'gut')) / 1.5) * (t > W_('k3', 'antioxidants') ? clamp(1 - (t - W_('k3', 'antioxidants')) / 1.2) : 1), hw: 80, hh: 66 });
    tag('TOXIC MOLECULES IN THE GUT', 1360, 680, t, W_('k2', 'gut'), L('k3').start - 0.3, '#e2457a', 30);
    placeIcon('bottle', [[880, 420]], 1.6, t, W_('k3', 'antioxidants') - 0.2, L('k4').start - 0.2, { hw: 50, hh: 76 });
    label('NORMAL LIFESPAN · HARDLY ANY SLEEP', 1100, 880, t, W_('k3', 'normal'), L('k4').start - 0.3, GOLD, 30);
    label('HARVARD · 2020 · FLIES AND MICE', 960, 990, t, W_('k2', 'harvard'), L('k4').start - 0.3, WHITE, 24); return; }
  worldBG(t, 'grey'); const B = { x: 700, y: 560, r: 290 }; drawBrainAt(t, B, { tired: 0.6, glow: 0.4, dim: 0.2, halo: 'rgba(143,216,230,0.15)', noWaste: 1 });
  brainOverlay(B, 'thal', t, eoc((t - W_('k4', 'thalamus')) / 0.5));
  tag('THALAMUS', 700, 900, t, W_('k4', 'thalamus'), L('k5').end + 0.3, '#c7621f', 34);
  placeIcon('dna', [[1300, 320]], 1.3, t, W_('k4', 'genetic'), L('k5').end + 0.3, { hw: 50, hh: 96 });
  label('FATAL FAMILIAL INSOMNIA', 1420, 520, t, W_('k4', 'fatal'), L('k5').end + 0.3, GOLD, 30); label('FIRST DESCRIBED · ITALY · 1986', 1420, 590, t, W_('k4', 'italian'), L('k5').end + 0.3, WHITE, 24);
  label('~70 FAMILIES WORLDWIDE', 1420, 690, t, W_('k5', 'seventy'), L('k5').end + 0.3, TEAL, 30); label('NO CURE · ~18 MONTHS', 1420, 770, t, W_('k5', 'cure'), L('k5').end + 0.3, '#e2457a', 30);
}
function sRecover(t) {
  const C = CUE, L = id => LN(id);
  if (t < L('v3').start - 0.1) {   // bed scene
    const cam = camAt([[C.randy2, 900, 640, 1.55], [C.fine + 0.6, 900, 630, 1.65]], t); worldBG(t, 'night', 0, cam); beginWorld(cam);
    KID = { x: 900, y: 800 }; const b = bedState(t); drawBed(t); drawPillow(t, C.hours15 - 0.1, true);
    let sq = 0; const dd = t - C.fine; if (dd > 0 && dd < 0.6) sq = Math.sin(dd * 18) * Math.exp(-dd * 7) * 0.9; const asleep = t > C.hours15 + 0.25 && t < C.fine;
    drawKid(t, { lie: b.lie, squash: sq, lid: asleep ? 1 : 0.7 * (1 - clamp((t - C.fine) * 3)), mask: asleep, armsUp: t > C.fine, look: [0.3, 0] }); drawBlanket(t); drawZ(t, C.hours15 + 0.3, C.fine - 0.2); ctx.restore();
    const [bx0, by0] = toS(700, 500), [bx1, by1] = toS(1100, 815); reg('hero', 'bed', bx0, by0, bx1, by1);
    label('SLEPT 14 H 46 MIN', 960, 975, t, C.hours15, C.fine - 0.45, TEAL, 36); label('WOKE UP FINE', 960, 975, t, C.fine, L('v3').start - 0.3, GOLD, 40); return; }
  if (t < L('v4').start - 0.1) { worldBG(t, 'night'); hypnogramDeep(t, L('v3').start);
    placeIcon('piggy', [[1500, 760]], 1.8, t, W_('v3', 'bank') - 0.3, L('v4').start - 0.2, { crack: t > W_('v3', 'weekend'), hw: 74, hh: 60 });
    tag('NOT A BANK ACCOUNT', 1500, 940, t, W_('v3', 'bank'), L('v4').start - 0.3, '#e2457a', 32); return; }
  if (t < L('o1').start - 0.1) { worldBG(t, 'night'); const items = [['bedclock', 'REGULAR BEDTIME', W_('v4', 'regular')], ['snow', 'COOL, DARK ROOM', W_('v4', 'cool')], ['sun', 'MORNING DAYLIGHT', W_('v4', 'daylight')], ['nocoffee', 'NO AFTERNOON COFFEE', W_('v4', 'coffee')]];
    items.forEach(([ic, lab, t0], i) => { const k = spring(t - t0 + 0.12, 0.5, 13); if (k <= 0) return; const x = 270 + i * 460, cols = ['#5b4fd6', '#127b84', '#c98a2e', '#9b3352'];
      ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); rr2(-200, -240, 400, 480, 32, cols[i]); ctx.restore(); reg('panel', lab, x - 200, 280, x + 200, 760); ctx.save(); ctx.translate(x, 480); ctx.scale(1.8 * k, 1.8 * k); ICONS[ic](t, {}); ctx.restore();
      if (k > 0.6) riseText(lab, x, 680, t0 + 0.15, t, { size: 26, weight: 700, color: WHITE, pill: false }); }); return; }
  sOutro2(t);
}
function hypnogramDeep(t, t0) {   // recovery night: deep sleep first and longer
  const x = 220, y = 250, w = 1000, h = 300; reg('hero', 'recovery chart', x - 30, y - 40, x + w + 30, y + h + 80);
  rr2(x - 30, y - 40, w + 60, h + 80, 26, 'rgba(6,20,40,0.45)');
  const lv = [0, 3, 3, 3, 2, 3, 3, 1, 0.4, 2, 3, 1, 0.4, 1, 2, 1, 0.4, 0], k = eoq((t - t0) / 3), n = Math.max(1, Math.floor(k * (lv.length - 1)));
  for (let i = 0; i < n; i++) { const ax = x + i / (lv.length - 1) * w, bx = x + (i + 1) / (lv.length - 1) * w, ay = y + lv[i] / 3 * h, by = y + lv[i + 1] / 3 * h; rr2(Math.min(ax, bx) - 5, Math.min(ay, by) - 5, Math.abs(bx - ax) + 10, Math.abs(by - ay) + 10, 5, lv[i] >= 2.5 ? '#8fd8e6' : '#5b6fb0'); }
  riseText('DEEP SLEEP FIRST', x + w / 2, y + h + 50, t0 + 0.5, t, { size: 28, color: TEAL, pill: false });
}
function sOutro2(t) {
  const C = CUE, L = id => LN(id);
  const cam = camAt([[L('o1').start, 880, 540, 1.0], [99, 860, 540, 0.97]], t); worldBG(t, 'night', 0, cam); beginWorld(cam);
  drawMoon(t, spring(t - C.tonight - 0.1, 0.5, 9), 1);
  KID = { x: 740, y: 800 }; drawKid(t, { look: [-1, -0.5], lid: t > C.end ? 0.9 : 0.2 }); regKid(740, 800, 1, 0); ctx.restore();
  if (t < C.tonight) { const B = { x: 1380, y: 520, r: 230 }; drawBrainAt(t, B, { tired: 0, glow: 1, dim: 0, noWaste: 1 });
    label('FILES THE DAY · CLEANS · REBUILDS', 1380, 860, t, W_('o1', 'files'), C.tonight - 0.3, GOLD, 26); }
  const [px, py] = toS(520, 330);
  placeIcon('pillow', [[px, py], [px, py + 160]], 1.1, t, C.calls - 0.05, 99, { hw: 130, hh: 70 });
  if (t > C.calls) { reg('label', 'title', 1010, 370, 1760, 640);
    LABELQ.push(() => { riseText('WHAT IF YOU', 1385, 440, C.calls + 0.1, t, { size: 92, weight: 700, color: WHITE, ls: 6, pill: false, dur: 0.8 });
      riseText('NEVER SLEPT', 1385, 570, C.calls + 0.3, t, { size: 120, weight: 700, color: GOLD, ls: 6, pill: false, dur: 0.8 }); }); }
  if (t > LN('o3').start - 0.2) { placeIcon('subscribe', [[1385, 690]], 1.2, t, W_('o3', 'subscribe'), 999, { hw: 124, hh: 38 }); }
  if (t > C.end) {   // end screen: two video slots for YouTube end-screen elements
    for (const [x, y] of [[1190, 870], [1580, 870]]) { const k = spring(t - C.end - 0.2, 0.5, 12); rr2(x - 170 * k, y - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', x - 170, y - 96, x + 170, y + 96); }
  }
}

function SECTIONS() {
  const L = id => LN(id), out = [];
  const add = (t0, draw, tr, at) => out.push({ t0, draw, tr, at });
  add(0, sOpen);
  const chapterAt = {}; CHAPTERS.forEach(([id, title, world, icon], i) => { chapterAt[id] = { title, world, icon, i: i + 1 }; });
  const prevEnd = id => { const ids = Object.keys(LINES), j = ids.indexOf(id); return LINES[ids[j - 1]].end + 0.15; };
  const card = (id) => { const c = chapterAt[id], t0 = prevEnd(id); add(t0, tt => chapterCard(tt, c.title, c.i, c.world, c.icon, t0), 'flood', [960, 540]); return L(id).start + 1.2; };
  let s;
  s = card('w1'); add(Math.min(s, L('w2').start), sClock, 'flood', [860, 560]); add(L('w4').start - 0.1, sHourglass, 'flood', [760, 540]);
  s = card('a1'); add(Math.min(s, L('a1b').start + 0.2), sAnimals, 'slide');
  s = card('d1q'); add(Math.min(s, L('d1').start + 0.4), sFirstNight, 'flood', [960, 600]);
  s = card('b1q'); add(Math.min(s, L('b1').start + 0.3), sNightShift, 'flood', [860, 560]); add(L('b5').start - 0.1, sCleaning, 'flood', [700, 560]);
  s = card('y1q'); add(Math.min(s, L('y1').start + 0.3), sBody, 'flood', [960, 540]);
  s = card('m1q'); add(Math.min(s, L('m1').start + 0.2), sMicro2, 'flood', [960, 420]);
  s = card('r1q'); add(Math.min(s, L('r1').start + 0.2), sRecord2, 'flood', [520, 600]);
  s = card('s1'); add(Math.min(s, L('s2').start), sShort, 'flood', [960, 540]);
  s = card('k1q'); add(Math.min(s, L('k1').start + 0.2), sKill, 'flood', [960, 640]);
  s = card('v1'); add(Math.min(s, L('v1b').start), sRecover, 'flood', [960, 540]);
  out.sort((a, b) => a.t0 - b.t0); out.forEach((s2, i) => s2.t1 = i + 1 < out.length ? out[i + 1].t0 : 1e9);
  return out;
}
let SECS = null;
// event log for sound design: first appearance of every icon / tag / label, and every section start
const EV = new Map();
{ const _pi = placeIcon, _tag = tag, _lab = label;
  placeIcon = (name, slots, s, t, t0, t1, o) => { EV.set('icon|' + name + '|' + t0.toFixed(2), { kind: 'icon', t: t0 }); return _pi(name, slots, s, t, t0, t1, o); };
  tag = (txt, x, y, t, t0, t1, bg, size) => { EV.set('tag|' + txt, { kind: 'tag', t: t0 }); return _tag(txt, x, y, t, t0, t1, bg, size); };
  label = (txt, x, y, t, t0, t1, color, size, o) => { EV.set('label|' + txt + '|' + t0.toFixed(1), { kind: 'label', t: t0 }); return _lab(txt, x, y, t, t0, t1, color, size, o); }; }
window.events = () => { for (let t = 0; t < DUR; t += 0.25) draw(t); const ev = [...EV.values()];
  SECS.forEach((s, i) => { if (i) ev.push({ kind: s.draw.name ? 'section' : 'card', t: s.t0 }); }); return ev.sort((a, b) => a.t - b.t); };
function drawSection(sec, t) { ctx.save(); sec.draw(t); ctx.restore(); }
function draw(t) {
  const C = CUE; BOX = []; LABELQ = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.letterSpacing = '0px';
  const i = SECS.findIndex(s => t >= s.t0 && t < s.t1), sec = SECS[Math.max(0, i)], prev = SECS[i - 1];
  const lt = t - sec.t0, TD = 0.55;
  if (prev && sec.tr && sec.tr !== 'cut' && lt < TD) {
    drawSection(prev, t); for (const f of LABELQ) f(); const keepB = BOX; BOX = []; LABELQ = [];
    const k = eic(lt / TD); ctx.save(); ctx.beginPath();
    if (sec.tr === 'flood') { const [fx, fy] = sec.at; ctx.arc(fx, fy, k * 2300, 0, 6.283); } else ctx.rect(0, 0, W * k, H);
    ctx.clip(); drawSection(sec, t); for (const f of LABELQ) f(); ctx.restore();
    if (k < 0.5) BOX = keepB;
  } else { drawSection(sec, t); for (const f of LABELQ) f(); }
  drawCounter(t);
  const fl = t - C.slept - 0.55; if (fl > 0 && fl < 0.6) { ctx.fillStyle = `rgba(255,255,255,${0.85 * (1 - fl / 0.6) ** 2})`; ctx.fillRect(0, 0, W, H); }
  const bl = blinkAmt(t); if (bl > 0) { ctx.fillStyle = '#02040a'; ctx.fillRect(0, 0, W, H / 2 * bl); ctx.fillRect(0, H - H / 2 * bl, W, H / 2 * bl); }
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.95); vg.addColorStop(0, 'rgba(4,4,20,0)'); vg.addColorStop(1, 'rgba(4,4,20,0.4)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  grain(t);
  const fo = Math.min(clamp(t / 0.3), clamp((DUR - t) / 0.8)); if (fo < 1) { ctx.fillStyle = `rgba(0,0,0,${1 - fo})`; ctx.fillRect(0, 0, W, H); }
}
window.overlapAudit = (step = 0.1, from = 0, to = 1e9) => {
  const out = new Map(); AUDIT.on = true; AUDIT.log = (m, t) => { if (!out.has(m)) out.set(m, t); };
  for (let t = from; t < Math.min(DUR, to); t += step) {
    draw(t);
    for (const a of BOX) if (a.kind === 'icon' || a.kind === 'sprite') {
      if (a.x0 < 4 || a.x1 > W - 4 || a.y0 < 4 || a.y1 > H - 4) AUDIT.log(`${a.name} runs off the frame`, t);
      for (const b of BOX) if (b !== a && b.kind !== 'panel' && hitB(a, b)) AUDIT.log(`${a.name} overlaps ${b.kind} "${b.name}"`, t);
    }
    for (const a of BOX) if (a.kind === 'label') for (const b of BOX) if (b !== a && ['hero', 'hud', 'meter', 'label'].includes(b.kind) && hitB(a, b) && !(b.kind === 'label' && b.name === a.name)) AUDIT.log(`label "${a.name}" overlaps ${b.kind} "${b.name}"`, t);
  }
  AUDIT.on = false; return [...out].map(([m, t]) => `${t.toFixed(1)}s ${m}`);
};
window.ready = (async () => {
  const d = await (await fetch('audio/words.json')).json(); WORDS = d.words; DUR = d.duration + TAIL;
  for (const l of d.lines) LINES[l.id] = l;
  buildCues(); SECS = SECTIONS(); await document.fonts.load('700 40px Fredoka'); await document.fonts.load('600 40px Fredoka');
  return { DUR, CUE, chapters: CHAPTERS.map(([id, title]) => [title, LINES[id].start]) };
})();
window.seek = t => draw(t);
window.frame = (t, q = 0.95) => { draw(t); return cv.toDataURL('image/jpeg', q); };
