// Shared helpers for explainer topics (loaded after engine.js, before topic.js)
const L = id => LN(id), S = id => LN(id).start, E = id => LN(id).end;
function buildCues() { const C = CUE; C.title = S('o3') + 0.3; C.end = DUR - TAIL; C.calls = S('o3'); }
const SKIN = '#f2b38f';
WORLDS.pine = { a: '#1f5a46', b: '#123a2e', blobs: [[255, 217, 138, .12], [80, 180, 140, .15], [226, 69, 122, .08]], dots: 'rgba(255,240,200,0.10)' };
function kidAt(t, x, y, s, o = {}) { CAM = { x: 960, y: 540, z: 1 }; KID = { x, y }; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); drawKid(t, o); ctx.restore(); reg('hero', 'mascot', x - 70 * s, y - 290 * s, x + 70 * s, y + 12 * s); }
function tile3(t, items, y = 520) {
  items.forEach(([ic, lab, col, t0, o], i) => { const k = spring(t - t0 + 0.1, 0.5, 13); if (k <= 0) return; const x = 380 + i * 580;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rr2(-250, -280, 500, 560, 36, col); ctx.restore(); reg('panel', lab, x - 250, y - 280, x + 250, y + 280);
    ctx.save(); ctx.translate(x, y - 40); ctx.scale(2.3 * k, 2.3 * k); drawIcon(ic, t, o || {}); ctx.restore();
    if (o && o.mark != null) stamp(o.mark, x + 170, y - 200, t, t0 + 0.5);
    if (k > 0.6) riseText(lab, x, y + 200, t0 + 0.15, t, { size: 32, weight: 700, color: WHITE, pill: false }); });
}
function stamp(ok, x, y, t, t0) { if (t < t0) return; const k = spring(t - t0, 0.45, 14), s = lerp(1.7, 1, k) * clamp((t - t0) / 0.1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, 0, 44, ok ? '#3fae6a' : '#e2457a');
  if (ok) { ctx.save(); ctx.rotate(0.75); rr2(-6, -24, 12, 40, 6, '#fff'); rr2(-18, 4, 18, 12, 6, '#fff'); ctx.restore(); } else for (const a of [0.78, -0.78]) { ctx.save(); ctx.rotate(a); rr2(-6, -26, 12, 52, 6, '#fff'); ctx.restore(); } ctx.restore(); }
function arrow(x, y, t, t0, w = 90) { if (t < t0) return; const k = eoq((t - t0) / 0.5), p = Math.sin(t * 4) * 6; ctx.save(); ctx.globalAlpha = k; ctx.translate(x + p, y); rr2(-w / 2, -8, w - 20, 16, 8, 'rgba(255,255,255,0.8)'); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.moveTo(w / 2 - 30, -24); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 2 - 30, 24); ctx.fill(); ctx.restore(); }
function glint(t, w, h, period = 2.4) { const p = (t % period) / period; if (p > 0.45) return; const k = p / 0.45, a = Math.sin(k * Math.PI), x = lerp(-w * 0.55, w * 0.45, k), y = lerp(-h * 0.55, -h * 0.15, k), r = 8 + 10 * a;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); ctx.restore(); }
function rbcDisc(x, y, r, tilt = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, tilt); circ(0, 0, r, '#d63a4c'); circ(0, 0, r * 0.86, '#ee6070'); circ(r * 0.05, r * 0.06, r * 0.5, '#b02a3d'); rr2(-r * 0.62, -r * 0.66, r * 0.52, r * 0.15, r * 0.075, 'rgba(255,255,255,0.45)'); ctx.restore(); }
function bigNumber(t, x, y, t0, t1, txt, cap, col = GOLD) {   // a big slamming number with a small caption
  if (t < t0 || t > t1 + 0.35) return; const k = spring(t - t0, 0.45, 14), s = lerp(1.7, 1, k), out = clamp((t1 + 0.35 - t) / 0.35);
  font(110, 700); const w = ctx.measureText(txt).width; reg('label', cap, x - w / 2 - 30, y - 90, x + w / 2 + 30, y + 90);
  LABELQ.push(() => { ctx.save(); ctx.globalAlpha = out * clamp((t - t0) / 0.15); ctx.translate(x, y); ctx.scale(s, s); font(110, 700); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, -10); font(28, 600); ctx.letterSpacing = '5px'; ctx.fillStyle = WHITE; ctx.fillText(cap, 0, 64); ctx.letterSpacing = '0px'; ctx.restore(); });
}
function outroTitle(t, a, b, x = 1330, sa = 54, sb = 80) {
  if (t > S('o3') + 0.2) { reg('label', 'title', x - 520, 340, x + 520, 580); LABELQ.push(() => { riseText(a, x, 400, S('o3') + 0.2, t, { size: sa, weight: 700, color: WHITE, ls: 4, pill: false, dur: 0.8 });
    riseText(b, x, 520, S('o3') + 0.45, t, { size: sb, weight: 700, color: GOLD, ls: 5, pill: false, dur: 0.8 }); }); sfx('title', S('o3') + 0.2); }
  if (t > S('o4') - 0.2) placeIcon('subscribe', [[x, 700]], 1.2, t, W_('o4', 'subscribe'), 999, { hw: 124, hh: 38 });
  if (t > CUE.end) for (const [ex, ey] of [[x - 200, 900], [x + 200, 900]]) { const k = spring(t - CUE.end - 0.2, 0.5, 12); rr2(ex - 170 * k, ey - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', ex - 170, ey - 96, ex + 170, ey + 96); }
}
function makeSections(CHAPTERS, scene, sOpen, sOutro) {
  const out = [], add = (t0, draw, tr, at) => out.push({ t0, draw, tr, at });
  add(0, sOpen);
  const ids = Object.keys(LINES), prevEnd = id => LINES[ids[ids.indexOf(id) - 1]].end + 0.15;
  CHAPTERS.forEach(([id, title, world, ic], i) => { const t0 = prevEnd(id); add(t0, tt => chapterCard(tt, title, i + 1, world, ic, t0), 'flood', [960, 540]); const [fn, first] = scene[id]; add(Math.min(LINES[id].start + 1.2, LINES[first].start), fn, 'flood', [960, 540]); });
  add(L('o1').start - 0.1, sOutro, 'flood', [960, 540]);
  out.sort((a, b) => a.t0 - b.t0); out.forEach((s, i) => s.t1 = i + 1 < out.length ? out[i + 1].t0 : 1e9); return out;
}
Object.assign(ICONS, {
  person(t, o) { const c = o.col || '#5b4fd6'; circ(0, -50, 22, SKIN); rr2(-24, -26, 48, 70, 22, c); rr2(-20, 40, 16, 30, 8, '#2d2b7c'); rr2(4, 40, 16, 30, 8, '#2d2b7c'); ctx.save(); ctx.translate(26, -18); ctx.rotate(-1.8 + Math.sin(t * 6) * 0.4); rr2(-6, 0, 12, 40, 6, c); ctx.restore(); },
  clock3(t) { circ(0, 0, 56, '#f3f7fb'); circ(0, 0, 46, '#102348'); for (let i = 0; i < 12; i++) { ctx.save(); ctx.rotate(i / 12 * 6.283); rr2(-2, -42, 4, 8, 2, '#8fd8e6'); ctx.restore(); } ctx.save(); ctx.rotate(t * 2); rr2(-3, -34, 6, 36, 3, '#ff8f4a'); ctx.restore(); ctx.save(); ctx.rotate(t * 0.2 + 1); rr2(-4, -24, 8, 26, 4, '#f3f7fb'); ctx.restore(); circ(0, 0, 6, '#ffd98a'); },
  medal(t) { ctx.fillStyle = '#3a6fd6'; ctx.beginPath(); ctx.moveTo(-30, -80); ctx.lineTo(-6, -20); ctx.lineTo(6, -20); ctx.lineTo(30, -80); ctx.lineTo(14, -80); ctx.lineTo(0, -40); ctx.lineTo(-14, -80); ctx.fill(); circ(0, 20, 56, '#e0a92a'); circ(0, 20, 46, '#ffd36b'); circ(0, 20, 18, '#e0a92a'); },
  phone(t) { const bz = Math.sin(t * 30) * 2 * (Math.sin(t * 2) > 0.3 ? 1 : 0); ctx.save(); ctx.translate(bz, 0); rr2(-40, -76, 80, 152, 16, '#3a3f5a'); rr2(-32, -62, 64, 116, 8, '#8fd8e6'); font(30, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('911', 0, -4); ctx.restore(); },
  doc2(t) { rr2(-50, -64, 100, 128, 8, '#f3f7fb'); for (let i = 0; i < 5; i++) rr2(-36, -44 + i * 18, 72 - (i % 2) * 20, 6, 3, '#9fb0d8'); },
  mouse(t) { const hop = Math.abs(Math.sin(t * 3)) * 4; ctx.save(); ctx.translate(0, -hop); ctx.fillStyle = '#c9cfe0'; ctx.beginPath(); ctx.ellipse(0, 10, 56, 34, 0, 0, 6.283); ctx.fill(); circ(48, -10, 26, '#c9cfe0'); circ(36, -36, 16, '#e9b7c4'); circ(60, -12, 4.5 * (1 - blinkF(t)) + 0.5, '#20232f'); circ(74, -4, 5, '#e2457a'); ctx.restore(); },
});
Object.assign(IDLE, { person: {}, clock3: {}, medal: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.08), post: t => glint(t, 56, 60) }, phone: {}, doc2: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.05) }, mouse: {} });

// =====================================================================
// CAST: icons that act on each other (episodes 11+)
// A beat is one picture-story inside a time window: actors pop in on their words,
// fly along paths, hit / push / chase / orbit / morph into / erase each other.
// Actors of one beat share a group id, so the overlap audit lets them touch;
// they must still stay clear of labels, heroes of other groups and the frame edge.
// Times may be numbers or strings: 'b2' = line start, 'b2>' = line end, 'b2:word' = that word, 'b2:word#1' = 2nd match, '+0.4' offsets: 'b2:word+0.4'.
// =====================================================================
function T(x) {
  if (typeof x === 'number') return x; if (x == null) return 1e9;
  let off = 0; const m = x.match(/^(.*?)([+-]\d*\.?\d+)$/); if (m && !/^[+-]/.test(x)) { x = m[1]; off = parseFloat(m[2]); }
  if (x.endsWith('>')) return E(x.slice(0, -1)) + off;
  const i = x.indexOf(':'); if (i < 0) return S(x) + off;
  const id = x.slice(0, i); let w = x.slice(i + 1), n = 0; const h = w.indexOf('#'); if (h >= 0) { n = +w.slice(h + 1); w = w.slice(0, h); }
  const L = LINES[id]; if (!L) { if (AUDIT.on) AUDIT.log('unknown line ' + id, 0); return 1e9; }
  const opts = w.toLowerCase().split('|'), ws = WORDS.filter(q => q.s >= L.start - 0.15 && q.s <= L.end + 0.1 && opts.some(o => q.w.toLowerCase().replace(/[^a-z0-9']/g, '').startsWith(o)));
  if (!ws.length) { if (AUDIT.on) AUDIT.log(`word "${w}" not found in ${id}`, L.start); return L.start + off; }
  return ws[Math.min(n, ws.length - 1)].s + off;
}
const ease2 = (a, b, k) => a + (b - a) * eic(k);
function keyPos(keys, t) {   // keys: [[time, x, y, hop?], ...] → {x, y, k (0..1 of current segment), seg}
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2], moving: 0 };
  for (let i = 1; i < keys.length; i++) {
    const [ta, xa, ya] = keys[i - 1], [tb, xb, yb, hop = 0] = keys[i];
    if (t < tb) { const k = clamp((t - ta) / Math.max(0.01, tb - ta)), e = eic(k); return { x: lerp(xa, xb, e), y: lerp(ya, yb, e) - Math.sin(k * Math.PI) * hop, moving: Math.sin(k * Math.PI), dir: Math.sign(xb - xa) }; }
  }
  const L = keys[keys.length - 1]; return { x: L[1], y: L[2], moving: 0 };
}
function sparkleBurst(x, y, t, t0, col = '#ffd98a', R0 = 90) {   // star-shaped sparks flying out from an impact
  const d = t - t0; if (d < 0 || d > 0.6) return; const k = d / 0.6;
  ctx.save(); ctx.globalAlpha = (1 - k) ** 1.5;
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283 + 0.3, r = R0 * (0.4 + eoc(k) * 0.9), s = 14 * (1 - k) + 3, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
    ctx.fillStyle = i % 2 ? '#ffffff' : col; ctx.beginPath(); ctx.moveTo(px, py - s); ctx.quadraticCurveTo(px, py, px + s, py); ctx.quadraticCurveTo(px, py, px, py + s); ctx.quadraticCurveTo(px, py, px - s, py); ctx.quadraticCurveTo(px, py, px, py - s); ctx.fill(); }
  ctx.strokeStyle = col; ctx.lineWidth = 6 * (1 - k); ctx.beginPath(); ctx.arc(x, y, R0 * eoc(k) * 1.2, 0, 6.283); ctx.stroke(); ctx.restore();
}
function crumble(x, y, t, t0, s, col) {   // erased actors break into drifting flakes
  const d = t - t0; if (d < 0 || d > 1.2) return; const k = d / 1.2;
  ctx.save(); ctx.globalAlpha = (1 - k);
  for (let i = 0; i < 18; i++) { const a = i * 2.4, r = (20 + (i * 13) % 50) * s * (0.3 + k), px = x + Math.cos(a) * r, py = y + Math.sin(a) * r * 0.7 + k * k * 120;
    ctx.fillStyle = i % 3 ? col : '#ffffff'; ctx.save(); ctx.translate(px, py); ctx.rotate(a + k * 4); ctx.fillRect(-5 * s, -5 * s, 10 * s, 10 * s); ctx.restore(); }
  ctx.restore();
}
function zapFx(x0, y0, x1, y1, t, t0, dur = 0.5, col = '#ffd98a') {   // jagged energy bolt between two points
  const d = t - t0; if (d < 0 || d > dur) return; const k = d / dur;
  ctx.save(); ctx.globalAlpha = Math.sin(k * Math.PI); ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0);
  for (let i = 1; i < 8; i++) { const f = i / 8; ctx.lineTo(lerp(x0, x1, f) + Math.sin(i * 7.3 + t * 40) * 18, lerp(y0, y1, f) + Math.cos(i * 5.1 + t * 37) * 18); } ctx.lineTo(x1, y1); ctx.stroke();
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
}
function streamFx(x0, y0, x1, y1, t, t0, t1, o = {}) {   // a flow of small dots (or mini icons) travelling from A to B, with a gentle arc
  if (t < t0 || t > t1 + 0.8) return; const n = o.n || 10, sp = o.sp || 0.8, arc = o.arc ?? 60;
  ctx.save();
  for (let i = 0; i < n; i++) { const born = t0 + i / n / sp * 0.9; let p = (t - born) * sp; if (p < 0) continue; p = p % 1; if (t > t1 && (t - t1) * sp > 1 - p) continue;
    const x = lerp(x0, x1, p) + Math.sin(i * 2.1 + t * 3) * 10, y = lerp(y0, y1, p) - Math.sin(p * Math.PI) * arc + Math.cos(i * 1.7 + t * 2.5) * 10;
    ctx.globalAlpha = Math.sin(p * Math.PI) ** 0.5;
    if (o.ic) { ctx.save(); ctx.translate(x, y); ctx.scale(o.s || 0.35, o.s || 0.35); drawIcon(o.ic, t + i, o.o || {}); ctx.restore(); }
    else circ(x, y, (o.r || 9) * (0.8 + 0.2 * Math.sin(i + t * 5)), o.col || '#8fd8e6'); }
  ctx.restore();
}
let GRP = 0;
// actor spec: A(icon, x, y, scale, t0, opts)
// opts: mv [[time,x,y,hop]...] · hit [times] (squash + sparks) · push [[time, dx, dy]] (shoved along) · morph [time, icon2] · erase time · grey time
//       out time (early exit) · flip · pulse [times] · shake [time, dur] · follow {i, dx, dy, lag} · orbit {i | c:[x,y], r, w, ph}
//       hw/hh (half box in icon units, default 64) · o (icon options or t=>options) · glow col · col (crumble colour) · z (draw order)
function A(ic, x, y, s, t0, opts = {}) { return { ic, x, y, s, t0, ...opts }; }
function castPos(a, t, P) {
  if (a.follow) { const b = P[a.follow.i] || { x: 0, y: 0 }; return { x: b.x + (a.follow.dx || 0), y: b.y + (a.follow.dy || 0), moving: b.moving }; }
  if (a.orbit) { const c = a.orbit.c ? { x: a.orbit.c[0], y: a.orbit.c[1] } : P[a.orbit.i]; const ang = (a.orbit.ph || 0) + t * (a.orbit.w || 1.2); return { x: c.x + Math.cos(ang) * a.orbit.r, y: c.y + Math.sin(ang) * a.orbit.r * (a.orbit.squash || 0.55), moving: 0.5 }; }
  let p = a.mv ? keyPos([[T(a.t0), a.x, a.y], ...a.mv.map(([tt, x, y, h]) => [T(tt), x, y, h])], t) : { x: a.x, y: a.y, moving: 0 };
  if (a.push) for (const [tt, dx, dy] of a.push) { const k = eoq((t - T(tt)) / 0.7); if (k > 0) { p = { ...p, x: p.x + dx * k, y: p.y + (dy || 0) * k }; } }
  return p;
}
function cast(t, t0, t1, actors, o = {}) {   // draws one beat; returns screen positions of the actors
  const B0 = T(t0), B1 = T(t1); if (t < B0 - 0.05 || t > B1 + 0.35) return [];
  const g = 'g' + (o.id || (B0.toFixed(2) + ':' + actors.length));
  // slow push-in on every beat (camera never holds still), applied to positions so audit boxes stay exact
  const cx = o.cx ?? 960, cy = o.cy ?? 540, zk = 1 + 0.035 * eic((t - B0) / Math.max(1, B1 - B0)) * (o.zoom ?? 1), dx = Math.sin(t * 0.37) * 5, dy = Math.cos(t * 0.29) * 4;
  const scr = (x, y) => [cx + (x - cx) * zk + dx, cy + (y - cy) * zk + dy];
  const P = [], RAW = [];
  actors.forEach((a, i) => { const p = castPos(a, t, RAW); RAW[i] = p; const [sx, sy] = scr(p.x, p.y); P[i] = { x: sx, y: sy, moving: p.moving, dir: p.dir }; });
  if (o.under) o.under(t, P, scr, zk);
  const order = actors.map((a, i) => i).sort((i, j) => (actors[i].z || 0) - (actors[j].z || 0));
  for (const i of order) {
    const a = actors[i], ta = T(a.t0), tout = Math.min(B1, a.out != null ? T(a.out) : 1e9), te = a.erase != null ? T(a.erase) : 1e9;
    let k = popK(t, ta, tout); if (k <= 0 || t > te + 0.9) { P[i].gone = 1; continue; }
    if (!EV.has('icon|' + a.ic + '|' + ta.toFixed(2))) EV.set('icon|' + a.ic + '|' + ta.toFixed(2), { kind: 'icon', t: ta });
    const p = P[i]; let sx = 1, sy = 1, rot = 0, alpha = 1, s = a.s * zk;
    if (a.hit) for (const h of a.hit) { const d = t - T(h); if (d >= 0 && d < 0.6) { const q = Math.exp(-d * 7) * Math.cos(d * 26); sx *= 1 + 0.22 * q; sy *= 1 - 0.18 * q; } if (d >= 0) sfx('pop', T(h)); }
    if (a.pulse) for (const h of a.pulse) { const d = t - T(h); if (d >= 0 && d < 0.5) { const q = Math.sin(d / 0.5 * Math.PI); sx *= 1 + 0.15 * q; sy *= 1 + 0.15 * q; } }
    if (a.shake) { const [st, sd] = a.shake, d = t - T(st); if (d >= 0 && d < sd) rot += Math.sin(d * 40) * 0.12 * (1 - d / sd); }
    if (p.moving) { rot += (p.dir || 1) * 0.12 * p.moving; sx *= 1 + 0.08 * p.moving; sy *= 1 - 0.06 * p.moving; }
    if (t > te) { alpha = clamp(1 - (t - te) / 0.5); s *= 1 + (t - te) * 0.3; }
    const hw = (a.hw || 64) * s, hh = (a.hh || 64) * s;
    if (t <= te + 0.3) BOX.push({ kind: 'icon', name: a.ic, x0: p.x - hw, y0: p.y - hh, x1: p.x + hw, y1: p.y + hh, grp: g });
    let ic = a.ic, mk = 0;
    if (a.morph) { const tm = T(a.morph[0]); if (t > tm) { mk = clamp((t - tm) / 0.35); ic = a.morph[1]; const q = Math.sin(mk * Math.PI); sx *= 1 + 0.25 * q; sy *= 1 - 0.2 * q; if (t - tm < 0.3) sfx('sparkle', tm); } }
    const opt = typeof a.o === 'function' ? a.o(t) : (a.o || {});
    ctx.save(); ctx.translate(p.x, p.y + Math.sin(t * 2.2 + i) * 4); ctx.rotate(rot); ctx.scale(s * k * sx * (a.flip ? -1 : 1), s * (k + (1 - k) * 0.2) * sy); ctx.globalAlpha *= alpha;
    if (a.glow) { const rg = ctx.createRadialGradient(0, 0, 10, 0, 0, 110); rg.addColorStop(0, a.glow); rg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = rg; ctx.fillRect(-110, -110, 220, 220); }
    if (a.grey != null && t > T(a.grey)) ctx.filter = `grayscale(${clamp((t - T(a.grey)) / 0.6)}) brightness(${1 - 0.35 * clamp((t - T(a.grey)) / 0.6)})`;
    if (a.morph && mk < 1 && t > T(a.morph[0])) { ctx.save(); ctx.globalAlpha *= 1 - mk; drawIcon(a.ic, t, opt); ctx.restore(); ctx.globalAlpha *= mk; }
    drawIcon(ic, t, opt); ctx.restore();
    if (a.hit) for (const h of a.hit) sparkleBurst(p.x, p.y - 20 * s, t, T(h), a.sparkCol || '#ffd98a', 70 * s);
    if (t > te) { crumble(p.x, p.y, t, te, s, a.col || '#c9d6ec'); sfx('whoosh', te); }
  }
  if (o.fx) o.fx.forEach(f => {   // ['stream', i|[x,y], j|[x,y], t0, t1, opts] · ['zap', i, j, t0, dur, col] · ['burst', i, t0, col]
    const pt = v => Array.isArray(v) ? scr(v[0], v[1]) : [P[v].x, P[v].y];
    if (f[0] === 'stream') { const [a0, b0] = [pt(f[1]), pt(f[2])]; streamFx(a0[0], a0[1], b0[0], b0[1], t, T(f[3]), T(f[4]), f[5] || {}); }
    else if (f[0] === 'zap') { const [a0, b0] = [pt(f[1]), pt(f[2])]; zapFx(a0[0], a0[1], b0[0], b0[1], t, T(f[3]), f[4] || 0.5, f[5]); if (t >= T(f[3])) sfx('buzz', T(f[3])); }
    else if (f[0] === 'burst') { const a0 = pt(f[1]); sparkleBurst(a0[0], a0[1], t, T(f[2]), f[3] || '#ffd98a', 110); }
  });
  if (o.over) o.over(t, P, scr, zk);
  return P;
}
// beats: [{ at, end, cast:[A(...)], fx, lab:[[text, t0, x, y, color, size]], tag:[[text, t0, x, y, bg, size]], num:[[t0, x, y, big, cap, col]], under, over, zoom }]
// a scene = a list of beats; each beat runs from `at` (default: previous beat's end) to `end`
function beats(t, list) {
  for (let i = 0; i < list.length; i++) {
    const b = list[i], b0 = T(b.at), b1 = T(b.end) - 0.1; if (t < b0 - 0.1 || t >= b1) continue;
    if (b.bg) b.bg(t);
    cast(t, b.at, b1, b.cast || [], { fx: b.fx, under: b.under, over: b.over, zoom: b.zoom, id: i + ':' + b.at, cx: b.cx, cy: b.cy });
    if (b.q) label(LINES[b.q].text.toUpperCase(), 960, 110, t, S(b.q) + 0.1, b1 - 0.2, GOLD, 40);
    (b.lab || []).forEach(([txt, t0, x, y, col, size]) => label(txt, x, y, t, T(t0), b1 - 0.2, col || WHITE, size || 32));
    (b.tag || []).forEach(([txt, t0, x, y, bg, size]) => tag(txt, x, y, t, T(t0), b1 - 0.2, bg || '#e2457a', size || 38));
    (b.num || []).forEach(([t0, x, y, big, cap, col]) => bigNumber(t, x, y, T(t0), b1 - 0.2, big, cap, col));
    return b;
  }
}
// beat-list helpers: fill each beat's end from the next beat's start; a question beat shows Ava's question on top
function chainB(list, end) { list.forEach((b, i) => { if (b.end == null) b.end = i + 1 < list.length ? list[i + 1].at : end; }); return list; }
function QB(id, cast = [], extra = {}) { return { at: id, q: id, cast: [A('question', 1640, 600, 1.7, id + '+0.15', { pulse: [id + '+0.8'] }), ...cast], ...extra }; }
