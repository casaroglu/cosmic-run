// Sketch scenes: hand-drawn maps, charts and notes that draw themselves on paper.
// A story's "sketches": { name: spec } turns `name` into a scene. Item times ("at", "dur") are seconds
// from the moment the scene first appears. Loaded by renderer.html (uses its ctx, W, H, CUR_T, SPANS, TL).
'use strict';
const HAND = "'Bradley Hand', 'Chalkboard SE', 'Comic Sans MS', cursive";
const INK = '#2a2119', RED = '#b3261e', BLUE = '#1f4e8c';
const SK = { cache: {}, paper: null };

function skRng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function skK(lt, it, def = 1) { return clamp((lt - (it.at || 0)) / (it.dur || def)); }

// ---------- paper ----------
function skPaper() {
  if (SK.paper && SK.paper.width === W) return SK.paper;
  const c = Object.assign(document.createElement('canvas'), { width: W, height: H }), x = c.getContext('2d');
  x.fillStyle = '#efe4c9'; x.fillRect(0, 0, W, H);
  const r = skRng(9);
  for (let i = 0; i < 1600; i++) { x.fillStyle = `rgba(120,90,50,${r() * .05})`; x.beginPath(); x.arc(r() * W, r() * H, 3 + r() * 40, 0, 6.283); x.fill(); }
  x.strokeStyle = 'rgba(90,70,40,0.06)'; x.lineWidth = 1;
  for (let i = 0; i < 900; i++) { const a = r() * W, b = r() * H; x.beginPath(); x.moveTo(a, b); x.lineTo(a + (r() - .5) * 30, b + (r() - .5) * 8); x.stroke(); }
  const v = x.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .35, W / 2, H / 2, Math.max(W, H) * .75);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(70,45,15,0.45)');
  x.fillStyle = v; x.fillRect(0, 0, W, H);
  SK.paper = c; return c;
}
function skHatch() {
  if (SK.hatch) return SK.hatch;
  const c = Object.assign(document.createElement('canvas'), { width: 24, height: 24 }), x = c.getContext('2d');
  x.fillStyle = 'rgba(176,140,80,0.32)'; x.fillRect(0, 0, 24, 24);
  x.strokeStyle = 'rgba(60,40,20,0.30)'; x.lineWidth = 1.6;
  for (const o of [-24, 0, 24]) { x.beginPath(); x.moveTo(o, 24); x.lineTo(o + 24, 0); x.stroke(); }
  SK.hatch = ctx.createPattern(c, 'repeat'); return SK.hatch;
}

// ---------- geometry ----------
function skProj(spec) {   // lon/lat -> frame pixels for this sketch's map view
  const [x0, y0, x1, y1] = spec.view || (spec.coast && spec.coast.bbox) || [0, 0, 1, 1];
  const [rx, ry, rw, rh] = LAND() ? (spec.lrect || [300, 60, W - 600, H - 330]) : (spec.rect || [20, 170, W - 40, 1180]);   // landscape: above the captions
  const k = Math.cos(((y0 + y1) / 2) * Math.PI / 180);
  const sx = rw / ((x1 - x0) * k), sy = rh / (y1 - y0), s = Math.min(sx, sy);
  const ox = rx + (rw - (x1 - x0) * k * s) / 2, oy = ry + (rh - (y1 - y0) * s) / 2;
  return ([lon, lat]) => [ox + (lon - x0) * k * s, oy + (y1 - lat) * s];
}
function skPt(spec, p) {   // item position: [lon, lat] on a map; [x, y] with both in 0-1 = fraction of the frame
  if (p == null) return [W / 2, H / 2];
  if ((spec.coast || spec.view) && !(Math.abs(p[0]) <= 1 && Math.abs(p[1]) <= 1)) return skProj(spec)(p);
  return [p[0] * W, p[1] * H];
}
function skLen(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function skAlong(pts, k) {   // point + angle at fraction k of a polyline
  const L = skLen(pts) * clamp(k); let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc + d >= L) { const f = d ? (L - acc) / d : 0; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f, Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; }
    acc += d;
  }
  const n = pts.length - 1; return [pts[n][0], pts[n][1], Math.atan2(pts[n][1] - pts[n - 1][1], pts[n][0] - pts[n - 1][0])];
}
function skCurve(a, b, bend = 0.18, n = 40) {   // gentle arc from a to b
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
  const cx = mx - dy * bend, cy = my + dx * bend, out = [];
  for (let i = 0; i <= n; i++) { const t = i / n; out.push([(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * cx + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * cy + t * t * b[1]]); }
  return out;
}

// ---------- pencil primitives ----------
function skStroke(pts, k, o = {}) {
  // draws the first k (0-1) of a polyline twice with a little wobble, like a pencil going over a line
  if (k <= 0 || pts.length < 2) return null;
  const L = skLen(pts) * clamp(k), r = skRng(o.seed || 7);
  let tip = null;
  for (let pass = 0; pass < (o.passes || 2); pass++) {
    ctx.beginPath(); let acc = 0;
    const j = pass ? (o.wobble ?? 1.6) : 0;
    ctx.moveTo(pts[0][0] + (r() - .5) * j, pts[0][1] + (r() - .5) * j);
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (acc + d > L) { const f = (L - acc) / d; tip = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]; ctx.lineTo(tip[0], tip[1]); break; }
      ctx.lineTo(pts[i][0] + (r() - .5) * j, pts[i][1] + (r() - .5) * j); acc += d; tip = pts[i];
    }
    ctx.strokeStyle = o.color || INK; ctx.globalAlpha = (o.alpha ?? 1) * (pass ? 0.45 : 0.9);
    ctx.lineWidth = (o.width || 4) * (pass ? 0.6 : 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (o.dash) ctx.setLineDash(o.dash);
    ctx.stroke(); ctx.setLineDash([]);
  }
  ctx.globalAlpha = 1;
  return k < 1 ? tip : null;
}
function skPencil(tip, t) {   // a pencil whose point follows the line being drawn
  if (!tip) return;
  ctx.save(); ctx.translate(tip[0], tip[1]); ctx.rotate(-0.75 + Math.sin(t * 20) * 0.03);
  ctx.fillStyle = '#e8b44a'; ctx.strokeStyle = '#3a2a14'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(26, -10); ctx.lineTo(170, -10); ctx.lineTo(170, 10); ctx.lineTo(26, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#f1d9b0'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(26, -10); ctx.lineTo(26, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#2a2119'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(9, -3.5); ctx.lineTo(9, 3.5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#d9a0a0'; ctx.fillRect(170, -10, 22, 20); ctx.strokeRect(170, -10, 22, 20);
  ctx.restore();
}
function skWrite(text, x, y, k, o = {}) {   // handwriting: letters appear one by one
  const n = Math.floor(text.length * clamp(k)); if (n <= 0) return;
  ctx.save(); ctx.font = `${o.weight || 700} ${o.size || 54}px ${o.font === 'sans' ? FONT : HAND}`;
  ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.color || INK;
  if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot); x = 0; y = 0; }
  const lines = o.maxW ? wrap(text, o.maxW).map(l => l.join(' ')) : [text];
  let left = n; const sz = o.size || 54;
  // paper-coloured halo: hand lettering stays readable over coastlines, hatching and coloured territory
  ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(6, sz * 0.22); ctx.strokeStyle = o.haloColor || 'rgba(246,238,220,0.92)';
  lines.forEach((l, i) => { if (left <= 0) return; const s = l.slice(0, left); left -= l.length + 1;
    if (o.halo !== false) ctx.strokeText(s, x, y + i * sz * 1.2); ctx.fillText(s, x, y + i * sz * 1.2); });
  if (SK.audit) {   // text audit: record the full text box in frame pixels
    const tf = ctx.getTransform(), wmax = Math.max(...lines.map(l => ctx.measureText(l).width));
    const ax = o.align === 'left' ? 0 : o.align === 'right' ? -wmax : -wmax / 2;
    const pts = [[ax, -sz * 0.6], [ax + wmax, -sz * 0.6], [ax, sz * (0.6 + 1.2 * (lines.length - 1))], [ax + wmax, sz * (0.6 + 1.2 * (lines.length - 1))]]
      .map(([px, py]) => { const X = (o.rot ? 0 : x) + px, Y = (o.rot ? 0 : y) + py; return [tf.a * X + tf.c * Y + tf.e, tf.b * X + tf.d * Y + tf.f]; });
    SK.audit.push({ text, x0: Math.min(...pts.map(p => p[0])), x1: Math.max(...pts.map(p => p[0])), y0: Math.min(...pts.map(p => p[1])), y1: Math.max(...pts.map(p => p[1])) });
  }
  ctx.restore();
}
function skArrowHead(x, y, ang, s = 26, color = INK) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-s, -s * .55); ctx.lineTo(0, 0); ctx.lineTo(-s, s * .55); ctx.stroke(); ctx.restore();
}
function skShip(x, y, ang, s, kind, color) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s / 60, s / 60);
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.fillStyle = color || '#fff8ea';
  if (kind === 'carrack' || kind === 'galleon') {
    ctx.beginPath(); ctx.moveTo(-34, -6); ctx.lineTo(30, -6); ctx.lineTo(22, 10); ctx.lineTo(-28, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4, -6); ctx.lineTo(-4, -46); ctx.stroke();
    ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.moveTo(-4, -44); ctx.quadraticCurveTo(20, -30, -4, -12); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (kind === 'galleon') { ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(-4, -46); ctx.lineTo(10, -50); ctx.lineTo(-4, -54); ctx.fill(); }
  } else {   // tanker, seen from above
    ctx.beginPath(); ctx.moveTo(-40, -10); ctx.lineTo(30, -10); ctx.quadraticCurveTo(44, 0, 30, 10); ctx.lineTo(-40, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = INK; ctx.fillRect(-36, -7, 10, 14);
    ctx.lineWidth = 2; for (let i = -18; i < 26; i += 10) { ctx.beginPath(); ctx.moveTo(i, -6); ctx.lineTo(i, 6); ctx.stroke(); }
  }
  ctx.restore();
}

// ---------- coast ----------
function skCoast(name, spec) {
  if (SK.cache[name]) return SK.cache[name];
  const P = skProj(spec), strokes = [], fills = [];
  for (const ring of spec.coast.rings) {
    const pr = ring.map(p => [...P(p), p[2]]);
    fills.push(pr);
    let cur = [];
    for (const p of pr) { if (p[2]) { if (cur.length > 1) strokes.push(cur); cur = []; } else cur.push([p[0], p[1]]); }
    if (cur.length > 1) strokes.push(cur);
  }
  const lens = strokes.map(skLen), total = lens.reduce((a, b) => a + b, 0);
  return (SK.cache[name] = { strokes, fills, lens, total });
}
function skDrawCoast(name, spec, it, lt) {
  const C = skCoast(name, spec), k = skK(lt, it, 2.5);
  const fk = clamp((lt - (it.at || 0) - (it.dur || 2.5) * 0.6) / 0.8);
  if (fk > 0) {
    ctx.save(); ctx.globalAlpha = fk; ctx.fillStyle = skHatch(); ctx.beginPath();
    for (const r of C.fills) { r.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); }
    ctx.fill('evenodd'); ctx.restore();
  }
  let budget = C.total * ease(k), tip = null;
  for (let i = 0; i < C.strokes.length && budget > 0; i++) {
    const f = Math.min(1, budget / (C.lens[i] || 1)); budget -= C.lens[i];
    const tp = skStroke(C.strokes[i], f, { width: it.width || 3.2, seed: i + 3, wobble: 1.2 });
    if (tp) tip = tp;
  }
  return k < 1 ? tip : null;
}

// ---------- items ----------
const SK_ITEMS = {
  coast(name, spec, it, lt) { return skDrawCoast(name, spec, it, lt); },
  label(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos); const k = (lt - (it.at || 0)) * (it.cps || 16) / it.text.length;
    skWrite(it.text, x, y, k, { size: it.size || 52, color: it.color, rot: it.rot, font: it.font, weight: it.weight, align: it.align, maxW: it.maxW });
  },
  text(name, spec, it, lt) { return SK_ITEMS.label(name, spec, { ...it, pos: it.pos || [0.5, 0.2] }, lt); },
  route(name, spec, it, lt) {
    const pts = it.pts.map(p => skPt(spec, p)), path = it.bend != null ? skCurve(pts[0], pts[pts.length - 1], it.bend) : pts;
    const k = ease(skK(lt, it, 1.5));
    const tip = skStroke(path, k, { color: it.color || RED, width: it.width || 7, dash: it.dash, seed: 11 });
    if (k >= 1 && it.arrow !== false) { const n = path.length - 1; skArrowHead(path[n][0], path[n][1], Math.atan2(path[n][1] - path[n - 1][1], path[n][0] - path[n - 1][0]), 30, it.color || RED); }
    return tip;
  },
  arrow(name, spec, it, lt) { return SK_ITEMS.route(name, spec, { bend: 0.2, ...it, pts: [it.from, it.to] }, lt); },
  measure(name, spec, it, lt) {
    const a = skPt(spec, it.a), b = skPt(spec, it.b), k = ease(skK(lt, it, 0.8));
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), nx = Math.cos(ang + Math.PI / 2) * 22, ny = Math.sin(ang + Math.PI / 2) * 22;
    const tip = skStroke([a, b], k, { color: it.color || RED, width: 5 });
    if (k > 0) skStroke([[a[0] - nx, a[1] - ny], [a[0] + nx, a[1] + ny]], 1, { color: it.color || RED, width: 5 });
    if (k >= 1) skStroke([[b[0] - nx, b[1] - ny], [b[0] + nx, b[1] + ny]], 1, { color: it.color || RED, width: 5 });
    const off = it.offset || [60, 0];
    if (it.text) skWrite(it.text, (a[0] + b[0]) / 2 + off[0], (a[1] + b[1]) / 2 + off[1], (lt - (it.at || 0) - (it.dur || .8)) * 14 / it.text.length, { size: it.size || 58, color: it.color || RED, align: 'left' });
    return tip;
  },
  ships(name, spec, it, lt) {
    const pts = it.pts.map(p => skPt(spec, p)); if (lt < (it.at || 0)) return;
    const n = it.n || 3, period = it.period || 8;
    for (let i = 0; i < n; i++) {
      let k = ((lt - (it.at || 0)) / period + i / n) % 1;
      if (it.once) { k = clamp((lt - (it.at || 0) - i * (it.gap || 0.6)) / (it.dur || 3)); if (k <= 0) continue; }
      const [x, y, a] = skAlong(pts, k);
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 8, (1 - k) * 8, clamp((lt - (it.at || 0)) / 0.4)) * (it.once ? 1 : 1);
      if (it.once) ctx.globalAlpha = Math.min(1, k * 8);
      skShip(x, y, it.icon === 'tanker' || !it.icon ? a : (Math.cos(a) < 0 ? Math.PI : 0) * 0, it.size || 52, it.icon || 'tanker', it.color);
      ctx.restore();
    }
  },
  marker(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos), k = skK(lt, it, 0.4), s = it.size || 18;
    skStroke([[x - s, y - s], [x + s, y + s]], k * 2, { color: it.color || RED, width: 6 });
    skStroke([[x + s, y - s], [x - s, y + s]], k * 2 - 1, { color: it.color || RED, width: 6 });
    if (it.label) skWrite(it.label, x + (it.lx ?? 30), y + (it.ly ?? -40), (lt - (it.at || 0) - 0.3) * 16 / it.label.length, { size: it.lsize || 46, color: it.color || RED, align: it.lalign || 'left' });
  },
  circle(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos), r = it.r || 70, ry = it.ry || r * 0.8, pts = [];
    for (let i = 0; i <= 60; i++) { const a = -1.9 + i / 60 * 6.283 * 1.12; pts.push([x + Math.cos(a) * r * (1 + i * .002), y + Math.sin(a) * ry * (1 + i * .002)]); }
    return skStroke(pts, ease(skK(lt, it, 0.7)), { color: it.color || RED, width: it.width || 6 });
  },
  photo(name, spec, it, lt) {
    const im = IMGS[it.key]; if (!im) return; const k = backOut(skK(lt, it, 0.45)); if (k <= 0) return;
    const [x, y] = skPt(spec, it.pos || [0.5, 0.35]), w = it.w || 520, h = w * im.height / im.width;
    ctx.save(); ctx.translate(x, y);
    if (it.cutout) {   // transparent character drawing: no paper, no tape, soft shadow only
      ctx.scale(k, k); ctx.shadowColor = 'rgba(40,25,10,0.35)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10;
      ctx.drawImage(im, -w / 2, -h / 2, w, h); ctx.restore(); return;
    }
    ctx.rotate(it.rot ?? -0.04); ctx.scale(k, k);
    ctx.shadowColor = 'rgba(40,25,10,0.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12;
    ctx.fillStyle = '#fbf6ea'; ctx.fillRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32 + (it.caption ? 70 : 0));
    ctx.shadowColor = 'transparent'; ctx.drawImage(im, -w / 2, -h / 2, w, h);
    ctx.fillStyle = 'rgba(230,215,170,0.85)'; ctx.save(); ctx.rotate(0.06); ctx.fillRect(-70, -h / 2 - 36, 140, 40); ctx.restore();
    if (it.caption) { ctx.font = `700 40px ${HAND}`; ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(it.caption, 0, h / 2 + 40); }
    ctx.restore();
  },
  satellite(name, spec, it, lt) {
    // realistic layer: a public-domain satellite image of exactly this map's bbox (equirectangular, e.g. NASA GIBS
    // Blue Marble) fades in over the hand-drawn map; it.borders = today's borders [[[lon, lat], ...], ...] in white;
    // it.names = [{text, pos, size, italic}] written in white once the image is in. Items listed after it stay on top.
    const im = IMGS[it.key]; if (!im) return; const k = ease(skK(lt, it, 1.2)); if (k <= 0) return;
    const [x0, y0, x1, y1] = spec.view || spec.coast.bbox, P = skProj(spec), a = P([x0, y1]), b = P([x1, y0]);
    const w = b[0] - a[0], h = b[1] - a[1], r = 26;
    ctx.save(); ctx.globalAlpha = k;
    ctx.shadowColor = 'rgba(40,25,10,0.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
    ctx.beginPath(); ctx.roundRect(a[0], a[1], w, h, r); ctx.fillStyle = '#0b2545'; ctx.fill(); ctx.shadowColor = 'transparent';
    ctx.clip(); ctx.drawImage(im, a[0], a[1], w, h);
    if (it.borders) {
      ctx.lineJoin = 'round'; ctx.setLineDash([10, 6]);
      for (const [lw, col] of [[6, 'rgba(0,0,0,0.35)'], [2.6, 'rgba(255,255,255,0.9)']]) {
        ctx.lineWidth = lw; ctx.strokeStyle = col; ctx.beginPath();
        for (const ring of it.borders) ring.map(P).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    ctx.restore();
    const kn = (lt - (it.at || 0) - (it.dur || 1.2)) * 18;
    for (const n of it.names || []) {
      const [x, y] = skPt(spec, n.pos);
      skWrite(n.text, x, y, kn / n.text.length, { size: n.size || 40, color: '#ffffff', haloColor: 'rgba(5,20,40,0.75)', font: 'sans', weight: n.italic ? 'italic 600' : 700 });
    }
  },
  barrels(name, spec, it, lt) {
    const [x0, y0] = skPt(spec, it.pos || [0.5, 0.4]), n = it.n || 5, s = it.size || 120, gap = s * 0.35;
    const total = n * s + (n - 1) * gap;
    for (let i = 0; i < n; i++) {
      const k = skK(lt, { at: (it.at || 0) + i * 0.25, dur: 0.5 }); if (k <= 0) continue;
      const x = x0 - total / 2 + i * (s + gap), y = y0 - s * .65, w = s, h = s * 1.3;
      const hi = i < (it.hi ?? 1) && lt > (it.at || 0) + n * 0.25 + 0.4;
      if (hi) { ctx.fillStyle = it.color || '#e8b44a'; ctx.fillRect(x + 3, y + 3, w - 6, h - 6); }
      skStroke([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], k, { width: 5, seed: i + 20 });
      if (k >= 1) for (const f of [0.3, 0.7]) skStroke([[x, y + h * f], [x + w, y + h * f]], 1, { width: 3, seed: i + 30 });
    }
    if (it.caption) skWrite(it.caption, x0, y0 + s * 1.1, (lt - (it.at || 0) - n * 0.25 - 0.5) * 16 / it.caption.length, { size: it.csize || 60, color: it.ccolor || RED });
  },
  bars(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos || [0.12, 0.62]), w = it.w || 800, h = it.h || 600, d = it.data, max = it.max || Math.max(...d.map(v => v.value));
    skStroke([[x, y - h], [x, y], [x + w, y]], skK(lt, { at: it.at, dur: 0.7 }), { width: 5 });
    const bw = w / d.length * 0.55;
    d.forEach((v, i) => {
      const k = easeOut(skK(lt, { at: (it.at || 0) + 0.7 + i * 0.5, dur: it.dur || 1.4 })); if (k <= 0) return;
      const bx = x + (i + 0.5) * w / d.length - bw / 2, bh = h * 0.9 * v.value / max * k;
      ctx.fillStyle = v.color || RED; ctx.globalAlpha = 0.85; ctx.fillRect(bx, y - bh, bw, bh); ctx.globalAlpha = 1;
      skStroke([[bx, y], [bx, y - bh], [bx + bw, y - bh], [bx + bw, y]], 1, { width: 4, seed: i + 40 });
      skWrite(String(Math.round(v.value * k)), bx + bw / 2, y - bh - 48, 1, { size: it.vsize || 72, color: INK });
      skWrite(v.label, bx + bw / 2, y + 60, (lt - (it.at || 0) - 0.7 - i * 0.5) * 16 / v.label.length, { size: it.lsize || 54 });
    });
    if (it.title) skWrite(it.title, x + w / 2, y - h - 60, (lt - (it.at || 0)) * 16 / it.title.length, { size: it.tsize || 60, color: RED });
  },
  timeline(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos || [0.08, 0.5]), w = it.w || W * 0.84, k = ease(skK(lt, it, 1.2));
    skStroke([[x, y], [x + w, y]], k, { width: 6 });
    const X = v => x + (v - it.from) / (it.to - it.from) * w;
    (it.ticks || []).forEach((tk, i) => {
      const tk0 = (it.at || 0) + (it.dur || 1.2) * (X(tk.v) - x) / w; const kk = skK(lt, { at: tk0, dur: 0.3 }); if (kk <= 0) return;
      const up = i % 2 ? 1 : -1;
      skStroke([[X(tk.v), y - 18], [X(tk.v), y + 18]], kk, { width: 5, color: tk.color });
      skWrite(String(tk.year ?? tk.v), X(tk.v), y + up * 60, (lt - tk0) * 16 / 4, { size: 48, color: tk.color || RED });
      if (tk.label) skWrite(tk.label, X(tk.v), y + up * 120, (lt - tk0 - 0.2) * 16 / tk.label.length, { size: 40, maxW: 300 });
    });
  },
  counter(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos), k = easeOut(skK(lt, it, 1.5)); if (lt < (it.at || 0)) return;
    const v = Math.round((it.from || 0) + ((it.to || 0) - (it.from || 0)) * k);
    skWrite(`${it.prefix || ''}${it.plain ? v : v.toLocaleString('en-US')}${it.suffix || ''}`, x, y, 1, { size: it.size || 96, color: it.color || RED, align: it.align });
  },
  ringgem(name, spec, it, lt) {   // a gold ring with a jewel on top
    const [x, y] = skPt(spec, it.pos || [0.5, 0.55]), r = it.r || 170, k = skK(lt, it, 1.2), pts = [];
    for (let i = 0; i <= 80; i++) { const a = Math.PI * 1.5 + 0.35 + i / 80 * (6.283 - 0.7); pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r * 0.9]); }
    ctx.save(); ctx.globalAlpha = clamp(k * 2 - 1); ctx.strokeStyle = '#e8b44a'; ctx.lineWidth = 26; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
    const tip = skStroke(pts, k, { width: 6 });
    const gk = backOut(skK(lt, { at: (it.at || 0) + 1.1, dur: 0.5 }));
    if (gk > 0) {
      const gy = y - r * 0.9, s = 64 * gk;
      ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(x - s, gy - s * .3); ctx.lineTo(x - s * .5, gy - s); ctx.lineTo(x + s * .5, gy - s); ctx.lineTo(x + s, gy - s * .3); ctx.lineTo(x, gy + s * .9); ctx.closePath(); ctx.fill();
      skStroke([[x - s, gy - s * .3], [x - s * .5, gy - s], [x + s * .5, gy - s], [x + s, gy - s * .3], [x, gy + s * .9], [x - s, gy - s * .3], [x + s, gy - s * .3]], 1, { width: 5 });
      if (it.label) skWrite(it.label, x, gy - s - 60, (lt - (it.at || 0) - 1.4) * 14 / it.label.length, { size: it.lsize || 64, color: RED });
    }
    return tip;
  },
  flag(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos), k = skK(lt, it, 0.6), h = it.h || 120;
    skStroke([[x, y], [x, y - h]], k * 1.6, { width: 5 });
    const fk = clamp(k * 1.6 - 0.6); if (fk <= 0) return;
    const wv = Math.sin(lt * 4) * 6, cols = it.colors || ['#ffffff', BLUE];
    ctx.save(); ctx.globalAlpha = fk;
    ctx.fillStyle = cols[0]; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.quadraticCurveTo(x + 45, y - h - 10 + wv, x + 90, y - h + wv); ctx.lineTo(x + 90, y - h + 60 + wv); ctx.quadraticCurveTo(x + 45, y - h + 50 + wv, x, y - h + 60); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke();
    if (cols[1]) { ctx.fillStyle = cols[1]; ctx.fillRect(x + 32, y - h + 14 + wv / 2, 24, 30); }
    ctx.restore();
    if (it.label) skWrite(it.label, x + 110, y - h + 30, (lt - (it.at || 0) - 0.6) * 16 / it.label.length, { size: it.lsize || 46, align: 'left', color: it.lcolor || INK });
  },
  fort(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos), s = it.size || 60, pts = [];
    for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i / 10 * 6.283, rr = i % 2 ? s * .62 : s; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    return skStroke(pts, ease(skK(lt, it, 0.8)), { width: 6 });
  },
  cannon(name, spec, it, lt) {   // shots flying from ships to a target, with flashes
    if (lt < (it.at || 0)) return; const to = skPt(spec, it.to);
    (it.from || []).forEach((f, i) => {
      const a = skPt(spec, f), ph = ((lt - (it.at || 0)) * (it.rate || 1.2) + i * 0.37) % 1;
      const path = skCurve(a, to, 0.15, 20), [px, py] = skAlong(path, ph);
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(px, py, 7, 0, 6.283); ctx.fill();
      if (ph < 0.15) { glow(a[0], a[1], 60, 'rgba(255,170,60,0.9)', 1 - ph / 0.15); }
      if (ph > 0.9) { glow(to[0] + (i * 13 % 40) - 20, to[1] + (i * 7 % 30) - 15, 70, 'rgba(255,120,40,0.85)', (ph - 0.9) * 10); }
    });
  },
  tree(name, spec, it, lt) {   // a tree growing branch by branch (for legends, family trees)
    const [x, y] = skPt(spec, it.pos || [0.5, 0.75]), k = ease(skK(lt, it, 3)), depth = it.depth || 7, segs = [];
    const grow = (x0, y0, ang, len, d) => {
      const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len; segs.push([[x0, y0], [x1, y1], d]);
      if (d < depth) { const r = skRng(Math.floor(x1 * 7 + y1 * 13)); grow(x1, y1, ang - 0.32 - r() * 0.25, len * 0.74, d + 1); grow(x1, y1, ang + 0.32 + r() * 0.25, len * 0.74, d + 1); }
    };
    grow(x, y, -Math.PI / 2, it.size || 230, 1);
    let tip = null;
    for (const [a, b, d] of segs) {
      const kk = clamp(k * depth - (d - 1)); if (kk <= 0) continue;
      const tp = skStroke([a, b], kk, { width: Math.max(2, 14 - d * 1.8), color: it.color || INK, seed: d }); if (tp) tip = tp;
      if (d === depth && kk >= 1) { ctx.fillStyle = it.leaf || 'rgba(46,125,50,0.55)'; ctx.beginPath(); ctx.arc(b[0], b[1], 9, 0, 6.283); ctx.fill(); }
    }
    return tip;
  },
  stamp(name, spec, it, lt) {   // a tilted rubber stamp ("LEGEND", "FACT")
    const k = backOut(skK(lt, it, 0.35)); if (k <= 0) return;
    const [x, y] = skPt(spec, it.pos || [0.75, 0.2]);
    ctx.save(); ctx.translate(x, y); ctx.rotate(it.rot ?? -0.18); ctx.scale(2 - k, 2 - k); ctx.globalAlpha = Math.min(1, k) * 0.85;
    ctx.font = `900 ${it.size || 72}px ${FONT}`; const w = ctx.measureText(it.text).width + 50, h = (it.size || 72) * 1.35;
    ctx.strokeStyle = it.color || RED; ctx.lineWidth = 8; ctx.strokeRect(-w / 2, -h / 2, w, h);
    ctx.fillStyle = it.color || RED; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(it.text, 0, 4);
    ctx.restore();
  },
  territory(name, spec, it, lt) {
    // a state's lands: hatched fill + pencil border, clipped to the coastline so borders follow the shore.
    // it.polys: [[[lon, lat], ...], ...]; it.color; it.label/labelPos; it.style "faint" for an earlier extent
    const P = skProj(spec), polys = (it.polys || [it.poly]).map(pl => pl.map(P));
    const fk = clamp((lt - (it.at || 0) - 0.3) / 0.8), k = ease(skK(lt, it, 1.6)), col = it.color || RED;
    ctx.save();
    if (spec.coast) {
      const C = skCoast(name, spec); ctx.beginPath();
      for (const r of C.fills) { r.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); }
      ctx.clip();
    }
    if (fk > 0) {
      const pc = Object.assign(document.createElement('canvas'), { width: 18, height: 18 }), x = pc.getContext('2d');
      x.fillStyle = col; x.globalAlpha = it.style === 'faint' ? 0.10 : 0.26; x.fillRect(0, 0, 18, 18);
      x.globalAlpha = it.style === 'faint' ? 0.25 : 0.55; x.strokeStyle = col; x.lineWidth = 2;
      for (const o of [-18, 0, 18]) { x.beginPath(); x.moveTo(o, 18); x.lineTo(o + 18, 0); x.stroke(); }
      ctx.globalAlpha = fk; ctx.fillStyle = ctx.createPattern(pc, 'repeat'); ctx.beginPath();
      for (const pl of polys) { pl.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); }
      ctx.fill(); ctx.globalAlpha = 1;
    }
    let tip = null;
    polys.forEach((pl, i) => { const tp = skStroke([...pl, pl[0]], k, { color: col, width: it.style === 'faint' ? 3 : 6, dash: it.style === 'faint' ? [12, 10] : null, seed: 60 + i }); if (tp) tip = tp; });
    ctx.restore();
    if (it.label) { const [lx, ly] = skPt(spec, it.labelPos || pl0(it)); skWrite(it.label, lx, ly, (lt - (it.at || 0) - 1.0) * 16 / it.label.length, { size: it.lsize || 50, color: col }); }
    return tip;
    function pl0(t) { const pl = (t.polys || [t.poly])[0]; return [pl.reduce((a, p) => a + p[0], 0) / pl.length, pl.reduce((a, p) => a + p[1], 0) / pl.length]; }
  },
  derrick(name, spec, it, lt) {
    const [x, y] = skPt(spec, it.pos || [0.5, 0.62]), h = it.h || 520, w = h * 0.42, k = ease(skK(lt, it, 2));
    const top = [x, y - h], L = [x - w / 2, y], R = [x + w / 2, y], segs = [[L, top], [R, top]];
    for (let i = 1; i <= 5; i++) {
      const f = i / 6, yl = y - h * f, hw = w / 2 * (1 - f);
      segs.push([[x - hw, yl], [x + hw, yl]]);
      if (i < 6) { const f2 = (i - 1) / 6, y2 = y - h * f2, hw2 = w / 2 * (1 - f2); segs.push([[x - hw2, y2], [x + hw, yl]], [[x + hw2, y2], [x - hw, yl]]); }
    }
    let tip = null;
    segs.forEach((s, i) => { const kk = clamp(k * segs.length - i); const tp = skStroke(s, kk, { width: 5, seed: i + 50 }); if (tp) tip = tp; });
    if (it.gush && k >= 1) {   // oil gushing from the top
      const g = clamp((lt - (it.at || 0) - (it.dur || 2)) / 0.6);
      ctx.fillStyle = '#1b140e';
      for (let i = 0; i < 26; i++) { const r = skRng(i + 3), a = -Math.PI / 2 + (r() - .5) * 1.3, d = g * (80 + r() * 260); ctx.beginPath(); ctx.arc(top[0] + Math.cos(a) * d, top[1] - 20 + Math.sin(a) * d * (g < 1 ? 1 : 1) + d * d / 900, 8 + r() * 10, 0, 6.283); ctx.fill(); }
    }
    return tip;
  },
};

function drawSketch(name, t) {
  const spec = TL.sketches[name];
  const span = SPANS.find(s => s.scene === name && CUR_T >= s.start - 1 && CUR_T <= s.end + 1);
  const lt = CUR_T - (span ? span.start : 0) - 0.15;   // scene-local time
  ctx.drawImage(skPaper(), 0, 0);
  ctx.save();
  const mv = span && span.move;   // camera: from/to [x, y, zoom] in frame fractions
  if (mv) {
    const p = ease(clamp((CUR_T - span.start) / Math.max(0.1, span.end - span.start)));
    const a = mv.from || [0.5, 0.5, 1], b = mv.to || a;
    const cx = lerp(a[0], b[0], p) * W, cy = lerp(a[1], b[1], p) * H, z = lerp(a[2] || 1, b[2] || 1, p);
    ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-cx, -cy);
  }
  let tip = null;
  for (const it of spec.items || []) {
    if (lt < (it.at || 0) || (it.until != null && lt > it.until)) continue;
    const fn = SK_ITEMS[it.kind]; if (!fn) continue;
    ctx.save();
    if (it.until != null) ctx.globalAlpha = clamp((it.until - lt) / 0.4);
    const tp = fn(name, spec, it, lt); if (tp && it.pencil !== false) tip = tp;
    ctx.restore();
  }
  skPencil(tip, lt);
  ctx.restore();
}

// ---------- text audit (run once before rendering) ----------
// Draws every sketch scene in its final state offscreen and reports hand-written text that
// overlaps other text, the caption band, the date tag or the logo.
window.textAudit = function () {
  if (!TL.sketches) return [];
  const zones = LAND() ? [{ text: '[captions]', x0: 0, x1: W, y0: H - 200, y1: H - 90 }, { text: '[date tag]', x0: 60, x1: 520, y0: 55, y1: 140 }] : [
    { text: '[captions]', x0: 0, x1: W, y0: 1290, y1: 1500 },
    { text: '[date tag]', x0: 60, x1: 520, y0: 245, y1: 330 },
    { text: '[logo]', x0: W - 150, x1: W, y0: 150, y1: 300 }];
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const prev = ctx, prevT = CUR_T, out = []; let n = 0;
  ctx = c.getContext('2d');
  const hit = (a, b) => a.x0 < b.x1 - 4 && b.x0 < a.x1 - 4 && a.y0 < b.y1 - 4 && b.y0 < a.y1 - 4;
  for (const name of Object.keys(TL.sketches)) {
    const span = SPANS.find(s => s.scene === name); if (!span) continue;
    CUR_T = span.end - 0.05; SK.audit = [];
    try { drawSketch(name); } catch (e) { out.push(`${name}: draw error ${e.message}`); }
    const boxes = SK.audit; SK.audit = null; n += boxes.length;
    const zs = zones.concat(typeof activeCameos === 'function' ? activeCameos(CUR_T).map(({ c }) => ({ text: `[cameo ${c.key}]`, ...cameoBox(c) })) : []);
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) if (hit(boxes[i], boxes[j])) out.push(`${name}: "${boxes[i].text}" overlaps "${boxes[j].text}"`);
      for (const z of zs) if (hit(boxes[i], z)) out.push(`${name}: "${boxes[i].text}" overlaps ${z.text}`);
      if (boxes[i].x0 < 10 || boxes[i].x1 > W - 10) out.push(`${name}: "${boxes[i].text}" runs off the frame`);
    }
  }
  if (typeof cameoBox === 'function' && !LAND()) for (const b of TL.beats) for (const c of (b.cameo ? [].concat(b.cameo) : [])) {
    if (!IMGS[c.key]) { out.push(`cameo ${c.key}: image missing`); continue; }
    const bx = cameoBox(c); n++;
    if (bx.y1 > 1290 && bx.y0 < 1500) out.push(`cameo ${c.key} @${b.start.toFixed(1)}s overlaps [captions]`);
    if (bx.y0 < 300 && bx.right && bx.x1 > W - 150) out.push(`cameo ${c.key} @${b.start.toFixed(1)}s overlaps [logo]`);
  }
  ctx = prev; CUR_T = prevT;
  window.TEXT_AUDIT_N = n;
  return out;
};

// ---------- landscape: draw the portrait sketch as a panel ----------
// Sketch layouts are designed (and text-audited) for 1080x1920. In a landscape timeline the scene is
// drawn on its own portrait canvas and placed, as a panel, in the middle of the landscape frame.
function drawSketchLand(name) {
  const LW = W, LH = H, prev = ctx, landPaper = SK.paper;
  ctx.drawImage(skPaper(), 0, 0); const landP = SK.paper;
  ctx.fillStyle = 'rgba(239,228,201,0.55)'; ctx.fillRect(0, 0, W, H);   // lighter sides
  if (!SK.pc) { SK.pc = document.createElement('canvas'); SK.pc.width = 1080; SK.pc.height = 1920; }
  W = 1080; H = 1920; SK.paper = SK.portraitPaper || null;
  ctx = SK.pc.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
  try { drawSketch(name); } finally {
    SK.portraitPaper = SK.paper; SK.paper = landP; W = LW; H = LH; ctx = prev;
  }
  const sy = 140, sh = 1220, dh = H - 270, s = dh / sh, dw = 1080 * s;   // portrait content band, above its caption area
  ctx.save(); ctx.shadowColor = 'rgba(40,25,10,0.35)'; ctx.shadowBlur = 30;
  ctx.drawImage(SK.pc, 0, sy, 1080, sh, (W - dw) / 2, 45, dw, dh); ctx.restore();
}
(function () {   // audit the portrait layout even when the timeline is landscape
  const audit = window.textAudit;
  window.textAudit = function () {
    if (!LAND()) return audit();
    const LW = W, LH = H, p = SK.paper; W = 1080; H = 1920; SK.paper = null;
    try { return audit(); } finally { W = LW; H = LH; SK.paper = p; }
  };
})();
