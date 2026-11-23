// Business-channel vertical engine (1080x1920). Two styles share one palette:
// 'stick' = ink stick figures on paper, 'charcoal' = paper/ink silhouettes on charcoal with hatching.
// Hook/loop rule: beat 0 is the cold open (the result), a rewind follows, the last 1 s flashes the lesson, and the
// last 0.35 s cross-fades into frame 0 so the Short loops.
const W = 1080, H = 1920, C = { ink: '#1C1C1E', paper: '#F6F1E7', char: '#2B2E34', ember: '#E8742A', steel: '#8A94A0' };
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const TMP = document.createElement('canvas'); TMP.width = W; TMP.height = H;
let WORDS = [], LINES = {}, DUR = 30, STYLE = 'stick';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), eo = x => 1 - Math.pow(1 - clamp(x), 3), eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = x => { x = clamp(x); const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
function rnd(i) { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
let BOIL = 0;   // hand-drawn "boil": jitter seed changes 6 times a second
const INK = () => STYLE === 'stick' ? C.ink : C.paper, BG = () => STYLE === 'stick' ? C.paper : C.char;
// ---------- rough strokes ----------
function rline(pts, o = {}) {   // pts: [[x,y],...]; o.p = 0..1 drawn fraction; o.w width; o.col
  const p = o.p == null ? 1 : clamp(o.p); if (p <= 0) return;
  const seg = []; let L = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let left = L * p; ctx.save(); ctx.strokeStyle = o.col || INK(); ctx.lineWidth = o.w || 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  const j = o.j == null ? 2.2 : o.j, k = (pts[0][0] * 7 + pts[0][1] * 13) % 97;
  const J = (x, y, n) => [x + (rnd(k + n + BOIL * 31) - .5) * j * 2, y + (rnd(k + n * 3 + BOIL * 17) - .5) * j * 2];
  ctx.moveTo(...J(pts[0][0], pts[0][1], 0));
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]); left -= seg[i - 1];
    const x = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, y = pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f;
    const mx = (pts[i - 1][0] + x) / 2, my = (pts[i - 1][1] + y) / 2; ctx.quadraticCurveTo(...J(mx, my, i * 5 + 1), ...J(x, y, i * 5 + 2)); }
  ctx.stroke(); ctx.restore();
}
function rcirc(x, y, r, o = {}) { const n = 26, pts = []; for (let i = 0; i <= n; i++) { const a = -Math.PI / 2 + i / n * Math.PI * 2.05; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } rline(pts, o); if (o.fill) { ctx.save(); ctx.fillStyle = o.fill; ctx.beginPath(); ctx.arc(x, y, r - 1, 0, 7); ctx.fill(); ctx.restore(); rline(pts, o); } }
function rrect(x, y, w, h, o = {}) { if (o.fill) { ctx.save(); ctx.fillStyle = o.fill; ctx.fillRect(x, y, w, h); ctx.restore(); } rline([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], o); }
function shape(pts, fill) { ctx.save(); ctx.fillStyle = fill; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); ctx.restore(); }
// ---------- stick figure ----------
// pose: angles in degrees for upper/lower arm and leg (0 = straight down, + = toward the figure's front/right)
const POSES = {
  stand: { la: [-12, -6], ra: [12, 6], ll: [-8, 0], rl: [8, 0] },
  walk: t => { const s = Math.sin(t * 7) * 26; return { la: [-s, -s - 10], ra: [s, s - 10], ll: [s, s > 0 ? 0 : -20], rl: [-s, -s > 0 ? 0 : -20] }; },
  point: { la: [-12, -6], ra: [100, 95], ll: [-8, 0], rl: [8, 0] },
  armsup: t => ({ la: [-150 + Math.sin(t * 6) * 8, -165], ra: [150 - Math.sin(t * 6) * 8, 165], ll: [-12, 0], rl: [12, 0] }),
  think: { la: [-12, -6], ra: [40, 160], ll: [-8, 0], rl: [8, 0] },
  slump: { la: [-4, 0], ra: [4, 0], ll: [-6, 0], rl: [6, 0], bow: 18 },
  carry: { la: [-60, -120], ra: [60, 120], ll: [-8, 0], rl: [8, 0] },
  sit: { la: [-20, 40], ra: [20, 60], ll: [80, 0], rl: [90, 0] },
  type: t => ({ la: [50, 95 + Math.sin(t * 20) * 8], ra: [60, 100 + Math.cos(t * 22) * 8], ll: [80, 0], rl: [90, 0] }),
  shrug: { la: [-60, 40], ra: [60, -40], ll: [-8, 0], rl: [8, 0] },
};
function fig(x, y, s, pose, t, o = {}) {   // x,y = feet; s = scale (1 = 380 px tall)
  let P = typeof POSES[pose] === 'function' ? POSES[pose](t) : POSES[pose]; const bob = Math.sin(t * 2.2 + x) * 3 * s, w = (o.w || (o.sil ? 24 : 10)) * Math.max(.6, s), col = o.col || INK(), pp = o.p == null ? 1 : o.p;
  const R = 44 * s, leg = 150 * s, body = 150 * s, arm = 78 * s, hip = [x, y - leg + bob * .3], bow = (P.bow || 0) * Math.PI / 180;
  const neck = [hip[0] + Math.sin(bow) * body, hip[1] - Math.cos(bow) * body + bob], head = [neck[0] + Math.sin(bow) * R * 1.1, neck[1] - Math.cos(bow) * R * 1.1];
  const limb = (o0, a1, a2, len) => { const d = o.flip ? -1 : 1, r1 = a1 * d * Math.PI / 180, r2 = a2 * d * Math.PI / 180; const m = [o0[0] + Math.sin(r1) * len, o0[1] + Math.cos(r1) * len]; return [o0, m, [m[0] + Math.sin(r2) * len, m[1] + Math.cos(r2) * len]]; };
  const sh = [neck[0] + (hip[0] - neck[0]) * .12, neck[1] + (hip[1] - neck[1]) * .12];
  const parts = [[hip, neck], limb(hip, P.ll[0], P.ll[0] + P.ll[1], leg / 2), limb(hip, P.rl[0], P.rl[0] + P.rl[1], leg / 2), limb(sh, P.la[0], P.la[0] + P.la[1], arm), limb(sh, P.ra[0], P.ra[0] + P.ra[1], arm)];
  if (o.sil && pp > .3) { const cw = R * .95; shape([[neck[0] - cw * .8, neck[1] + R * .2], [neck[0] + cw * .8, neck[1] + R * .2], [hip[0] + cw, hip[1] + R * .3], [hip[0] - cw, hip[1] + R * .3]], col); }   // coat
  parts.forEach((pts, i) => rline(pts, { w, col, p: clamp(pp * 6 - i - .5) }));
  if (o.sil) { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(head[0], head[1], R, 0, 7); ctx.fill(); ctx.restore(); }
  else rcirc(head[0], head[1], R, { w, col, p: clamp(pp * 6), fill: o.fill || BG() });
  if (o.face && !o.sil && pp > .9) face(head[0], head[1], R, o.face, col, t);
  return { head, hand: parts[4][2], lhand: parts[3][2], neck, hip };
}
function face(x, y, R, f, col, t) { const blink = (t % 3.3) < .12; ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = Math.max(4, R * .12); ctx.lineCap = 'round';
  const e = R * .32; if (blink) { ctx.beginPath(); ctx.moveTo(x - e - 6, y - R * .12); ctx.lineTo(x - e + 6, y - R * .12); ctx.moveTo(x + e - 6, y - R * .12); ctx.lineTo(x + e + 6, y - R * .12); ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(x - e, y - R * .12, R * .08, 0, 7); ctx.arc(x + e, y - R * .12, R * .08, 0, 7); ctx.fill(); }
  ctx.beginPath(); if (f === 'happy') ctx.arc(x, y + R * .12, R * .35, .15 * Math.PI, .85 * Math.PI); else if (f === 'sad') ctx.arc(x, y + R * .55, R * .3, 1.2 * Math.PI, 1.8 * Math.PI); else if (f === 'shock') ctx.arc(x, y + R * .35, R * .14, 0, 7); else { ctx.moveTo(x - R * .25, y + R * .35); ctx.lineTo(x + R * .25, y + R * .35); } ctx.stroke(); ctx.restore(); }
// ---------- text ----------
function txt(s, x, y, o = {}) { ctx.save(); ctx.font = `${o.wt || 700} ${o.size || 80}px ${o.font || (STYLE === 'stick' ? 'Marker Felt' : 'Baskerville')}`; ctx.textAlign = o.al || 'center'; ctx.textBaseline = 'alphabetic';
  if (o.ls) ctx.letterSpacing = o.ls + 'px'; ctx.globalAlpha = o.a == null ? 1 : o.a; if (o.stroke) { ctx.lineWidth = o.stroke; ctx.strokeStyle = o.sc || BG(); ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
  ctx.fillStyle = o.col || INK(); ctx.fillText(s, x, y); ctx.restore(); }
function wrap(s, max, size, font) { ctx.save(); ctx.font = `700 ${size}px ${font}`; const out = []; let cur = ''; for (const w of s.split(/\s+/)) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > max && cur) { out.push(cur); cur = w; } else cur = t; } if (cur) out.push(cur); ctx.restore(); return out; }
function slam(s, x, y, t0, t, o = {}) {   // a number/word that slams in with overshoot
  if (t < t0) return; const k = back((t - t0) / .45), sc = 1 + (1 - clamp((t - t0) / .25)) * .6; ctx.save(); ctx.translate(x, y); ctx.scale(sc * k || .001, sc * k || .001); txt(s, 0, 0, { size: o.size || 150, col: o.col || C.ember, stroke: o.stroke || 0, font: o.font, a: clamp((t - t0) / .12) }); ctx.restore(); }
// ---------- backgrounds / textures ----------
function paper(t) { ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.strokeStyle = '#E4DFD3'; ctx.lineWidth = 2; for (let y = 120; y < H; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore(); }
function charcoal(t, horizon = 1250) { ctx.fillStyle = C.char; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.lineWidth = 2; for (let x = -1200; x < W + 200; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + horizon * .45, horizon); ctx.stroke(); } ctx.restore(); }
function ground(y, t, col = C.paper) { const pts = [[0, y]]; for (let x = 0; x <= W; x += 60) pts.push([x, y - 18 + rnd(x) * 36]); pts.push([W, H], [0, H]); shape(pts, col); }
function snow(t, n = 140, col = C.paper) { ctx.save(); ctx.fillStyle = col; for (let i = 0; i < n; i++) { const x = (rnd(i) * W + Math.sin(t + i) * 20) % W, y = (rnd(i + 99) * H + t * (40 + rnd(i + 7) * 60)) % H; ctx.globalAlpha = .35 + rnd(i + 3) * .5; ctx.beginPath(); ctx.arc(x, y, 2 + rnd(i + 5) * 3, 0, 7); ctx.fill(); } ctx.restore(); }
function dust(t, n = 60) { ctx.save(); ctx.fillStyle = C.steel; for (let i = 0; i < n; i++) { const x = (rnd(i) * W + t * 12 * (rnd(i + 2) - .5)) % W, y = (rnd(i + 50) * H - t * 15 * rnd(i + 9) + H) % H; ctx.globalAlpha = .15 + rnd(i + 3) * .25; ctx.fillRect(x, y, 3, 3); } ctx.restore(); }
// ---------- props (all rough-stroked) ----------
const PROPS = {
  coin: (x, y, s, o) => { rcirc(x, y, 40 * s, { ...o, fill: C.ember, col: INK() }); txt('$', x, y + 18 * s, { size: 54 * s, col: INK(), font: 'Futura' }); },
  bill: (x, y, s, o) => { rrect(x - 70 * s, y - 36 * s, 140 * s, 72 * s, { ...o, fill: BG() }); txt('$', x, y + 18 * s, { size: 50 * s, col: C.ember, font: 'Futura' }); },
  box: (x, y, s, o) => { rrect(x - 60 * s, y - 60 * s, 120 * s, 120 * s, { ...o, fill: BG() }); rline([[x - 60 * s, y - 20 * s], [x + 60 * s, y - 20 * s]], { ...o, w: 6 }); },
  desk: (x, y, s, o) => { rline([[x - 160 * s, y], [x + 160 * s, y]], o); rline([[x - 140 * s, y], [x - 140 * s, y + 120 * s]], o); rline([[x + 140 * s, y], [x + 140 * s, y + 120 * s]], o); },
  laptop: (x, y, s, o) => { rline([[x - 60 * s, y], [x + 60 * s, y], [x + 46 * s, y - 80 * s], [x - 46 * s, y - 80 * s], [x - 60 * s, y]], o); },
  clock: (x, y, s, o, t) => { rcirc(x, y, 60 * s, { ...o, fill: BG() }); const a = t * 3; rline([[x, y], [x + Math.sin(a) * 42 * s, y - Math.cos(a) * 42 * s]], { ...o, w: 7, col: C.ember }); rline([[x, y], [x + 26 * s, y]], { ...o, w: 7 }); },
  building: (x, y, s, o) => { rrect(x - 90 * s, y - 380 * s, 180 * s, 380 * s, { ...o, fill: BG() }); for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) rrect(x - 60 * s + c * 70 * s, y - 340 * s + r * 66 * s, 44 * s, 40 * s, { ...o, w: 5 }); },
  arrowUp: (x, y, s, o) => { rline([[x - 140 * s, y + 60 * s], [x - 40 * s, y - 10 * s], [x + 20 * s, y + 20 * s], [x + 140 * s, y - 90 * s]], { ...o, col: C.ember, w: 12 }); rline([[x + 90 * s, y - 92 * s], [x + 140 * s, y - 90 * s], [x + 136 * s, y - 40 * s]], { ...o, col: C.ember, w: 12 }); },
  arrowDown: (x, y, s, o) => { rline([[x - 140 * s, y - 90 * s], [x - 40 * s, y - 10 * s], [x + 20 * s, y - 40 * s], [x + 140 * s, y + 60 * s]], { ...o, col: C.ember, w: 12 }); rline([[x + 96 * s, y + 64 * s], [x + 140 * s, y + 60 * s], [x + 132 * s, y + 14 * s]], { ...o, col: C.ember, w: 12 }); },
  calendar: (x, y, s, o, t, lab) => { rrect(x - 70 * s, y - 70 * s, 140 * s, 140 * s, { ...o, fill: BG() }); ctx.save(); ctx.fillStyle = C.ember; ctx.fillRect(x - 70 * s, y - 70 * s, 140 * s, 36 * s); ctx.restore(); txt(lab || '1', x, y + 46 * s, { size: (String(lab || '1').length > 2 ? 46 : 70) * s, font: 'Futura' }); },
  check: (x, y, s, o) => rline([[x - 40 * s, y], [x - 10 * s, y + 30 * s], [x + 50 * s, y - 40 * s]], { ...o, col: C.ember, w: 14 }),
  cross: (x, y, s, o) => { rline([[x - 40 * s, y - 40 * s], [x + 40 * s, y + 40 * s]], { ...o, col: C.ember, w: 14 }); rline([[x + 40 * s, y - 40 * s], [x - 40 * s, y + 40 * s]], { ...o, col: C.ember, w: 14 }); },
  bulb: (x, y, s, o, t) => { rcirc(x, y, 55 * s, { ...o, fill: C.ember }); rrect(x - 24 * s, y + 52 * s, 48 * s, 30 * s, o); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + t; rline([[x + Math.cos(a) * 80 * s, y + Math.sin(a) * 80 * s], [x + Math.cos(a) * 105 * s, y + Math.sin(a) * 105 * s]], { ...o, w: 6, col: C.ember }); } },
};
function prop(name, x, y, s, t, t0, o = {}) { if (t < t0) return; const k = eo((t - t0) / .5); ctx.save(); ctx.translate(x, y); const sc = o.pop === false ? 1 : .6 + .4 * back((t - t0) / .45); ctx.scale(sc, sc); ctx.translate(-x, -y); PROPS[name](x, y, s, { p: k, ...o }, t, o.label); ctx.restore(); }
// ---------- shared extras ----------
POSES.shovel = t => { const s = (Math.sin(t * 3.2) + 1) / 2; return { la: [40 + s * 70, 30], ra: [60 + s * 70, 20], ll: [-14, 0], rl: [14, 0], bow: 10 + s * 12 }; };
POSES.fold = { la: [30, 110], ra: [-30, -110], ll: [-8, 0], rl: [8, 0] };
function bubble(s, x, y, sc, t, t0, o = {}) { if (t < t0) return; const k = back((t - t0) / .4); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = `700 ${o.size || 64}px ${o.font || (STYLE === 'stick' ? 'Marker Felt' : 'Baskerville')}`; const w = ctx.measureText(s).width + 70, h = (o.size || 64) * 1.6;
  ctx.restore(); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rrect(-w / 2, -h / 2, w, h, { fill: BG(), w: 7 }); rline([[-w / 4, h / 2], [-w / 3, h / 2 + 50], [-w / 8, h / 2]], { w: 7 }); txt(s, 0, (o.size || 64) * .35, { size: o.size || 64, col: o.col || C.ember }); ctx.restore(); }
function coinFly(x0, y0, x1, y1, t, period = 1.1, off = 0) { const p = ((t + off) % period) / period; const x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p - Math.sin(p * Math.PI) * 160; ctx.save(); ctx.globalAlpha = Math.min(1, p * 6, (1 - p) * 6); PROPS.coin(x, y, .6, {}); ctx.restore(); }
function fire(x, y, s, t, k = 1) {   // flickering bonfire (ember outer, paper core) + sparks
  for (let layer = 0; layer < 2; layer++) { const col = layer ? C.paper : C.ember, sc = (layer ? .55 : 1) * s * k; const pts = [[x - 150 * sc, y]];
    for (let i = 0; i <= 8; i++) { const fx = x - 150 * sc + i * 300 * sc / 8, hh = (i % 2 ? 120 : 330) * sc * (0.8 + 0.25 * Math.sin(t * 9 + i * 1.7 + layer)); pts.push([fx + Math.sin(t * 7 + i) * 14 * sc, y - hh]); }
    pts.push([x + 150 * sc, y]); shape(pts, col); }
  ctx.save(); ctx.fillStyle = C.ember; for (let i = 0; i < 18; i++) { const p = ((t * .7 + rnd(i)) % 1); ctx.globalAlpha = 1 - p; ctx.fillRect(x + (rnd(i + 4) - .5) * 260 * s + Math.sin(t * 3 + i) * 20, y - 200 * s - p * 520 * s, 6, 6); } ctx.restore(); }
function pearl(x, y, r, o = {}) { ctx.save(); if (o.glow) { ctx.globalAlpha = .25 + .1 * Math.sin(o.t * 3 || 0); ctx.fillStyle = C.ember; ctx.beginPath(); ctx.arc(x, y, r * 1.9, 0, 7); ctx.fill(); ctx.globalAlpha = 1; }
  ctx.fillStyle = o.col || C.paper; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.beginPath(); ctx.arc(x - r * .35, y - r * .35, r * .22, 0, 7); ctx.fill(); ctx.restore(); }
function label(s, x, y, t, t0, o = {}) { if (t < t0) return; txt(s, x, y, { size: o.size || 56, col: o.col || C.steel, font: 'Futura', ls: 6, a: eo((t - t0) / .4), wt: 700 }); }

function rain(t, n = 160) { ctx.save(); ctx.strokeStyle = C.steel; ctx.lineWidth = 3; for (let i = 0; i < n; i++) { const x = (rnd(i) * (W + 300) - t * 120) % (W + 300), y = (rnd(i + 40) * H + t * 1400 * (0.8 + rnd(i + 2) * .4)) % H; ctx.globalAlpha = .25 + rnd(i + 9) * .4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 14, y + 46); ctx.stroke(); } ctx.restore(); }
function excuse(x, y, s, t, o = {}) {   // the excuse voice: a small grey cloud with sleepy eyes that floats by the head
  const b = Math.sin(t * 2.4) * 8, k = o.k == null ? 1 : o.k; if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; ctx.translate(x, y + b); ctx.scale(s * k, s * k);
  ctx.fillStyle = C.steel; [[-50, 10, 45], [0, -15, 58], [52, 8, 44], [0, 28, 50]].forEach(([cx, cy, r]) => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill(); });
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-12, 4); ctx.moveTo(12, 4); ctx.lineTo(34, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 34, 12, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); ctx.restore(); }
function door(x, y, s, open = 0) { rrect(x - 90 * s, y - 330 * s, 180 * s, 330 * s, { fill: BG(), w: 9 }); if (open > 0) shape([[x - 90 * s, y - 330 * s], [x - 90 * s + 180 * s * (1 - open * .7), y - 300 * s], [x - 90 * s + 180 * s * (1 - open * .7), y - 20 * s], [x - 90 * s, y]], STYLE === 'stick' ? C.ink : C.paper); else rcirc(x + 55 * s, y - 160 * s, 10 * s, { w: 6 }); }
