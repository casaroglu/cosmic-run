// frame composer: scenes keyed by the line they start on, karaoke captions, lesson flash + loop cross-fade
let SCENES = [], LESSON = '', ORDER = [], EV = [], TAILX = 0.25;
const S = id => LINES[id].start, E = id => LINES[id].end;
function Wd(id, word, n = 0) { const L = LINES[id], ws = WORDS.filter(w => w.s >= L.start - .15 && w.s <= L.end + .1), hits = ws.filter(w => w.w.toLowerCase().replace(/[^a-z0-9']/g, '').startsWith(word.toLowerCase())); return hits.length ? hits[Math.min(n, hits.length - 1)].s : L.start; }
function alignWords(d) {   // caption words come from the script text; times from whisper (spelling stays as written: "$50 million", "1,600")
  const out = []; for (const L of d.lines) { const ws = d.words.filter(w => w.s >= L.start - .15 && w.s <= L.end + .1), tk = L.text.split(/\s+/).filter(Boolean);
    if (!ws.length) continue; if (ws.length === tk.length) { tk.forEach((w, i) => out.push({ w, s: ws[i].s, e: ws[i].e, line: L.id })); continue; }
    const a = ws[0].s, b = ws[ws.length - 1].e, tot = tk.reduce((x, w) => x + w.length + 1, 0); let acc = 0; tk.forEach(w => { const s = a + (b - a) * acc / tot; acc += w.length + 1; out.push({ w, s, e: a + (b - a) * acc / tot, line: L.id }); }); }
  return out; }
let GROUPS = [];
function makeGroups() { GROUPS = []; let cur = [], line = null; WORDS.forEach(w => { if (cur.length && (w.line !== line || cur.length >= 3)) { GROUPS.push(cur); cur = []; } cur.push(w); line = w.line; if (/[.,?!:;]$/.test(w.w)) { GROUPS.push(cur); cur = []; } }); if (cur.length) GROUPS.push(cur); }
window.ready = Promise.all(['700 74px Futura', '500 30px Futura', '700 80px "Marker Felt"', '700 80px Baskerville'].map(f => document.fonts.load(f))).then(() => fetch('audio/words.json')).then(r => r.json()).then(d => { WORDS = alignWords(d); makeGroups(); d.lines.forEach(l => LINES[l.id] = l); ORDER = d.lines.map(l => l.id); DUR = d.duration + TAILX; if (window.setup) setup(); return { DUR, EV: typeof EV === 'function' ? EV() : EV, scenes: SCENES.map(s => S(s.from)) }; });
function sceneAt(t) { let k = 0; SCENES.forEach((s, i) => { if (t >= S(s.from) - .12) k = i; }); return k; }
function drawScene(k, t) { const s = SCENES[k]; STYLE = s.style || STYLE0; BOIL = Math.floor(t * 6); const t0 = S(s.from) - .12; ctx.save(); (STYLE === 'stick' ? paper : charcoal)(t, s.horizon); s.draw(t - t0, t); ctx.restore(); }
function captions(t) {
  const ws = WORDS.filter(w => w.s <= t + .05 && w.e + .35 > t); if (!ws.length) return; const cur = ws[ws.length - 1];
  const grp = GROUPS.find(g => g.includes(cur)); if (!grp) return;
  const words = grp.map(w => w.w.replace(/^[^\w'$]+|[^\w'%$.,?!]+$/g, '').toUpperCase()); ctx.save(); ctx.font = '700 74px Futura'; let sp = 22;
  let wid = words.map(w => ctx.measureText(w).width), tot = wid.reduce((a, b) => a + b, 0) + sp * (words.length - 1);
  const fs = Math.min(74, Math.floor(74 * 900 / tot)); if (fs < 74) { ctx.font = `700 ${fs}px Futura`; sp = 22 * fs / 74; wid = words.map(w => ctx.measureText(w).width); tot = wid.reduce((a, b) => a + b, 0) + sp * (words.length - 1); }
  const pad = 14; tot += pad * (words.length - 1); let x = W / 2 - tot / 2; const y = 1660;
  if (STYLE !== 'stick') { ctx.save(); ctx.fillStyle = 'rgba(43,46,52,0.88)'; ctx.beginPath(); ctx.roundRect(W / 2 - tot / 2 - 40, y - 82, tot + 80, 116, 24); ctx.fill(); ctx.restore(); }
  words.forEach((w, j) => { const on = t >= grp[j].s - .03, pop = on && t - grp[j].s < .14 ? 1 + .14 * (1 - (t - grp[j].s) / .14) : 1; ctx.save(); ctx.translate(x + wid[j] / 2, y); ctx.scale(pop, pop);
    ctx.lineJoin = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = STYLE === 'stick' ? C.paper : C.char; ctx.strokeText(w, -wid[j] / 2, 0); const xv = (LINES[grp[j].line] || {}).speaker === 'x'; ctx.fillStyle = on && grp[j] === cur ? C.ember : xv ? C.steel : (STYLE === 'stick' ? C.ink : C.paper); ctx.fillText(w, -wid[j] / 2, 0); ctx.restore(); x += wid[j] + sp + pad; });
  ctx.restore();
}
function compose(t) {
  const k = sceneAt(t); drawScene(k, t);
  const tc = S(SCENES[k].from) - .12; if (k > 0 && t - tc < .3) { const a = 1 - (t - tc) / .3; const tmp = TMP.getContext('2d'); tmp.drawImage(cv, 0, 0); drawScene(k - 1, t); ctx.save(); ctx.globalAlpha = 1 - a; ctx.drawImage(TMP, 0, 0); ctx.restore(); }
  if (SCENES[k].rewind && t - tc < .45) { const r = Math.sin(Math.PI * (t - tc) / .45); ctx.save(); ctx.globalAlpha = r * .5; ctx.fillStyle = STYLE === 'stick' ? C.paper : C.char; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = r; txt('◀◀', W / 2, 1000, { size: 220, col: C.ember, font: 'Futura' }); ctx.restore(); }
  captions(t);
  if (window.HANDLE) txt(HANDLE, W / 2, 1860, { size: 30, col: C.steel, font: 'Futura', ls: 4, wt: 500 });
}
const LOOP = .35, FLASH = 1.0;
window.frame = (t, q = .9) => {
  const left = DUR - t;
  if (left < LOOP) { compose(0); TMP.getContext('2d').drawImage(cv, 0, 0); }
  const keep = left < LOOP ? (() => { const c = document.createElement('canvas'); c.width = W; c.height = H; c.getContext('2d').drawImage(TMP, 0, 0); return c; })() : null;
  compose(Math.min(t, DUR - LOOP - .001));
  const fl = left - LOOP; if (fl < FLASH && LESSON) { const a = Math.min(1, (FLASH - fl) / .1, fl > 0 ? fl / .08 : 1); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = STYLE === 'stick' ? C.ink : C.paper; ctx.fillRect(0, 760, W, 400);
    const ls = wrap(LESSON.toUpperCase(), 940, 96, 'Futura'); ls.forEach((l, i) => txt(l, W / 2, 990 - (ls.length - 1) * 55 + i * 110, { size: 96, font: 'Futura', col: C.ember })); ctx.restore(); }
  if (keep) { ctx.save(); ctx.globalAlpha = 1 - left / LOOP; ctx.drawImage(keep, 0, 0); ctx.restore(); }
  return cv.toDataURL('image/jpeg', q);
};
