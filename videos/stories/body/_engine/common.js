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
