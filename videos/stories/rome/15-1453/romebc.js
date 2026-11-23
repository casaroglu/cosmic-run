// History Sketches · Ancient Rome in style B+C (shared by the Rome episodes made in this kit).
// B: cartoon presenters (Ava asks, Theo answers) and representative characters act in front of real PD/CC0 images.
// C: pinned photo / dossier / map cards with the real images and key facts (2D overlays).
// One shot per voice line (work/segments.json); EP config in story.js describes each shot.

export const R = { img: {}, maps: {}, seg: [], SH: [], EP: null };
const INK = "#2b2026", RED = "#b8262e", GOLD = "#ffcf4a";
export const F = (px, k, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const sm = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
const back = (t) => { t = clamp(t); const c = 1.7; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

// ---------- images (with blur + flower covers for revealing spots: [u, v, r] as fractions of the source) ----------
async function loadImg(src, cover) {
  const im = new Image(); im.src = src; await im.decode();
  const c = document.createElement("canvas"); c.width = im.naturalWidth; c.height = im.naturalHeight; const g = c.getContext("2d"); g.drawImage(im, 0, 0);
  for (const [u, v, r] of cover || []) {
    const x = u * c.width, y = v * c.height, rr = r * c.width;
    g.save(); g.beginPath(); g.arc(x, y, rr, 0, 7); g.clip(); g.filter = `blur(${Math.max(14, rr / 5)}px)`; g.drawImage(c, 0, 0); g.restore();
    g.save(); g.font = `${rr * 2.1}px "Apple Color Emoji","Noto Color Emoji",sans-serif`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(["🌸", "🌹", "🌺", "🌷"][Math.round(u * 10) % 4], x, y + rr * 0.08); g.restore();
  }
  return c;
}

// ---------- sketch maps drawn on parchment (coastline from Natural Earth, territories hatched) ----------
function drawMap(spec, coast, terr) {
  const W = 1000, H = 720, c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d");
  const [x0, y0, x1, y1] = spec.view || coast.bbox, k = Math.cos(((y0 + y1) / 2) * Math.PI / 180);
  const s = Math.min((W - 40) / ((x1 - x0) * k), (H - 40) / (y1 - y0)), ox = (W - (x1 - x0) * k * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const P = ([lon, lat]) => [ox + (lon - x0) * k * s, oy + (y1 - lat) * s];
  const layer = () => { const l = document.createElement("canvas"); l.width = W; l.height = H; return l; };
  // base: sea + land
  const base = layer(), b = base.getContext("2d");
  b.fillStyle = "#cfdde0"; b.fillRect(0, 0, W, H);
  const landPath = (q) => { q.beginPath(); for (const r of coast.rings) { r.forEach((p, i) => { const [x, y] = P(p); i ? q.lineTo(x, y) : q.moveTo(x, y); }); q.closePath(); } };
  b.fillStyle = "#efe2c2"; landPath(b); b.fill(); b.strokeStyle = "#6a5a40"; b.lineWidth = 1.6; b.stroke();
  // territories
  const layers = (spec.terr || []).map((t) => {
    const l = layer(), q = l.getContext("2d"); q.save(); landPath(q); q.clip();
    const pc = document.createElement("canvas"); pc.width = pc.height = 16; const x = pc.getContext("2d");
    x.fillStyle = t.color; x.globalAlpha = t.faint ? 0.10 : 0.28; x.fillRect(0, 0, 16, 16); x.globalAlpha = t.faint ? 0.3 : 0.6; x.strokeStyle = t.color; x.lineWidth = 2;
    for (const o of [-16, 0, 16]) { x.beginPath(); x.moveTo(o, 16); x.lineTo(o + 16, 0); x.stroke(); }
    const rings = (k) => { const r = terr[k]; return typeof r[0][0] === "number" ? [r] : r; };
    const path = (k) => { q.beginPath(); for (const r of rings(k)) { r.forEach((p, i) => { const [a, bb] = P(p); i ? q.lineTo(a, bb) : q.moveTo(a, bb); }); q.closePath(); } };
    if (t.clip) { path(t.clip); q.clip(); }
    q.fillStyle = q.createPattern(pc, "repeat"); path(t.key); q.fill();
    q.strokeStyle = t.color; q.lineWidth = t.faint ? 2.5 : 5; q.setLineDash(t.faint ? [10, 8] : []); q.stroke();
    if (t.clip) { q.save(); path(t.key); q.clip(); path(t.clip); q.stroke(); q.restore(); }
    q.restore();
    if (t.label) { const [lx, ly] = P(t.labelPos); txt(q, t.label, lx, ly, t.lsize || 34, t.color); }
    return l;
  });
  const marks = (spec.marks || []).map((m) => { const l = layer(), q = l.getContext("2d"); const [x, y] = P(m.pos);
    if (!m.nodot) { q.fillStyle = m.color || RED; q.strokeStyle = "#fff"; q.lineWidth = 3; q.beginPath(); q.arc(x, y, 9, 0, 7); q.fill(); q.stroke(); }
    txt(q, m.label, x + (m.dx ?? 14), y + (m.dy ?? -18), m.size || 30, m.color || INK, m.align || "left"); return l; });
  return { base, layers, marks, P, spec };
}
function txt(q, s, x, y, size, col, align = "center") { q.save(); q.font = `900 ${size}px CizgiFont, Nunito, sans-serif`; q.textAlign = align; q.textBaseline = "middle"; q.lineJoin = "round"; q.lineWidth = 7; q.strokeStyle = "rgba(250,244,228,.95)"; q.strokeText(s, x, y); q.fillStyle = col; q.fillText(s, x, y); q.restore(); }

// ---------- build ----------
export async function buildRome(E, EP) {
  const { S, T, THREE } = E; R.EP = EP;
  R.logo = new Image(); R.logo.src = "../logo.png";
  for (const [k, v] of Object.entries(EP.images)) R.img[k] = await loadImg("../refs/" + v.file, v.cover);
  R.seg = await (await fetch("../work/segments.json?v=" + Date.now())).json();
  // maps
  const terr = await (await fetch("../refs/terr.json")).json(); const coasts = {};
  for (const [k, m] of Object.entries(EP.maps || {})) { coasts[m.coast] = coasts[m.coast] || await (await fetch("../refs/" + m.coast)).json(); R.maps[k] = drawMap(m, coasts[m.coast], terr); }
  // shot table: one shot per line, starting a few frames before the line
  const n = R.seg.length; R.lastWordF = Math.round(E.words[E.words.length - 1].e * 30); R.lastF = Math.ceil((E.words[E.words.length - 1].e + (EP.tail || 1.2)) * 30) - 1;
  R.SH = EP.shots.map((s, i) => ({ ...s, line: i, sp: R.seg[i].sp, f0: i === 0 ? 0 : Math.round(R.seg[i].s * 30) - 5, fs: Math.round(R.seg[i].s * 30), fe: Math.round(R.seg[i].e * 30) }));
  R.SH.push({ ...EP.shots[0], ...(EP.loopTail || {}), line: n, sp: "a", tail: true, f0: R.lastWordF + 4, fs: R.lastWordF + 4, fe: 1e9 });
  R.ctaF = R.SH.find((s) => s.cta).f0; R.loopF = R.SH[n - 1].f0;
  console.log("SHOTS", JSON.stringify(R.SH.map((s) => [s.f0, s.bg || s.room])), "cta", R.ctaF);
  // backdrops: each real image on its own x lane
  R.bg = {}; let lane = 0;
  for (const k of new Set(R.SH.filter((s) => s.bg).map((s) => s.bg))) {
    const im = R.img[k], asp = im.width / im.height, Hp = Math.max(11.6, 6.9 / asp), Wp = Hp * asp, X = 200 + lane * 60; lane++;
    const tex = new THREE.CanvasTexture(im); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const m = E.plane(Wp, Hp, new THREE.MeshBasicMaterial({ map: tex, fog: false }), [X, Hp / 2 - 3.8, -7.2], { noink: true, noShadow: true });
    R.bg[k] = { m, X, Wp, Hp };
  }
  // rooms: study (map room), throne room, stage for the CTA
  R.ROOM = { study: -200, throne: -260, stage: -320 };
  S.room({ x: R.ROOM.study, w: 8, d: 7, h: 4.2, wall: T.wallpaper("#5a4a36", "#4f4130", "stripe"), floor: T.planks("#7a5534"), floorRep: 0.3, window: false, door: false });
  S.shelf(R.ROOM.study - 2.6, -2.9, {}); S.shelf(R.ROOM.study + 2.6, -2.9, {}); S.hangLamp(R.ROOM.study, 4.2, -1.4, { col: "#c9a24a", i: 9 }); S.rug(R.ROOM.study, -1.4, 4, 3, "#6a2a2a");
  S.room({ x: R.ROOM.throne, w: 8, d: 7, h: 4.6, wall: T.wallpaper("#5a2a5a", "#4c234c", "stripe"), floor: T.marble ? T.marble() : T.tiles("#e8dcc4", "#9a8a7a", 8), floorRep: 0.25, window: false, door: false });
  const gold = E.mat("#d8b04a", { emissive: "#4a3810", glow: 0.25 }), stone = E.mat("#e9e1cf");
  for (const x of [-2.8, 2.8]) E.cyl(0.32, 0.36, 4.6, stone, [R.ROOM.throne + x, 0, -2.6]);
  E.box(2.6, 0.35, 1.6, stone, [R.ROOM.throne, 0, -2.4]); E.box(2.0, 0.3, 1.2, stone, [R.ROOM.throne, 0.35, -2.5]);
  E.box(1.3, 0.55, 0.8, gold, [R.ROOM.throne, 0.65, -2.55]); E.box(1.3, 1.6, 0.18, gold, [R.ROOM.throne, 0.65, -2.95]);
  E.box(0.18, 0.9, 0.8, gold, [R.ROOM.throne - 0.65, 0.65, -2.55]); E.box(0.18, 0.9, 0.8, gold, [R.ROOM.throne + 0.65, 0.65, -2.55]);
  S.rug(R.ROOM.throne, -0.6, 2.2, 4.5, "#8a1f2a"); S.hangLamp(R.ROOM.throne, 4.6, -1.2, { col: "#c9a24a", i: 10 });
  S.room({ x: R.ROOM.stage, w: 8, d: 7, h: 4.2, wall: T.wallpaper("#2a3550", "#243049", "dots"), floor: T.planks("#8a5a36"), floorRep: 0.3, window: false, door: false });
  S.hangLamp(R.ROOM.stage, 4.2, -1.2, { col: "#c9a24a", i: 10 });
  // cast
  E.actor("ava", { skin: "#f3d2b4", dress: "#3f6fb5", hair: "long", hairCol: "#7a4a2a", seed: 5 });
  E.actor("theo", { skin: "#e9c3a0", shirt: "#f4efe4", jacket: "#6a4a2a", pants: "#3a3040", tie: "#8a1f2a", hair: "short", hairCol: "#3a2a20", beard: "#3a2a20", glasses: true, seed: 9 });
  for (const [id, spec] of Object.entries(EP.cast)) E.actor(id, spec);
}

// ---------- overlays ----------
const logoO = (tag) => (g, w) => { const k = w / 1080; if (R.logo && R.logo.complete && R.logo.naturalWidth) { g.save(); g.globalAlpha = 0.92; g.drawImage(R.logo, 36 * k, 36 * k, 130 * k, 130 * k); g.restore(); }
  g.save(); g.font = F(30, k, 800); g.textBaseline = "middle"; const tw = g.measureText(tag).width; g.fillStyle = "rgba(20,14,24,.78)"; g.beginPath(); g.roundRect(182 * k, 80 * k, tw + 36 * k, 46 * k, 23 * k); g.fill(); g.fillStyle = GOLD; g.fillText(tag, 200 * k, 104 * k); g.restore(); };
const topText = (big, small, a = 1, size = 76, y0 = 300) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = Math.min(1, a); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
  let s = size; g.font = F(s, k); while (g.measureText(big).width > 980 * k && s > 40) { s -= 4; g.font = F(s, k); }
  g.lineWidth = 14 * k; g.strokeStyle = "#1a1418"; g.strokeText(big, w / 2, y0 * k); g.fillStyle = GOLD; g.fillText(big, w / 2, y0 * k);
  if (small) { g.font = F(40, k, 800); g.lineWidth = 10 * k; g.strokeText(small, w / 2, (y0 + 74) * k); g.fillStyle = "#fff"; g.fillText(small, w / 2, (y0 + 74) * k); } g.restore(); };
const nameCard = (title, sub, a) => (g, w) => { if (a <= 0) return; const k = w / 1080, x = 70 * k, y = 1420 * k; g.save(); g.globalAlpha = a; g.font = F(46, k); const pw = Math.max(g.measureText(title).width + 80 * k, 560 * k);
  g.fillStyle = "rgba(20,14,24,.88)"; g.beginPath(); g.roundRect(x, y, pw, 112 * k, 22 * k); g.fill(); g.fillStyle = GOLD; g.fillRect(x, y, 10 * k, 112 * k);
  g.fillStyle = "#fff"; g.textBaseline = "middle"; g.fillText(title, x + 34 * k, y + 40 * k); g.font = F(30, k, 700); g.fillStyle = GOLD; g.fillText(sub, x + 34 * k, y + 82 * k); g.restore(); };
const creditO = (lines) => (g, w) => { const k = w / 1080; g.save(); g.font = F(24, k, 700); g.textAlign = "right"; g.textBaseline = "middle";
  lines.forEach((t, i) => { const tw = g.measureText(t).width, y = (1852 - (lines.length - 1 - i) * 50) * k; g.fillStyle = "rgba(20,14,24,.72)"; g.beginPath(); g.roundRect(w - 40 * k - tw - 28 * k, y - 22 * k, tw + 28 * k, 44 * k, 12 * k); g.fill(); g.fillStyle = "#e8e0d0"; g.fillText(t, w - 54 * k, y); });
  g.restore(); };
// pinned photo (C): slides in from a side
const pinO = (o, a) => (g, w) => { if (a <= 0) return; const k = w / 1080, im = R.img[o.img]; if (!im) return;
  const ww = (o.w || 300) * k, hh = o.coin ? ww : ww * im.height / im.width, x = (o.x ?? 800) * k + (1 - a) * (o.x > 540 ? 600 : -600) * k, y = (o.y ?? 560) * k;
  g.save(); g.translate(x, y); g.rotate(o.rot ?? (o.x > 540 ? 0.05 : -0.05)); g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 26 * k; g.shadowOffsetY = 10 * k;
  if (o.coin) { g.fillStyle = "#c99a3c"; g.beginPath(); g.arc(0, 0, ww / 2 + 12 * k, 0, 7); g.fill(); g.shadowColor = "transparent"; g.save(); g.beginPath(); g.arc(0, 0, ww / 2, 0, 7); g.clip(); const s = Math.max(ww / im.width, ww / im.height) * (o.zoom || 1); g.drawImage(im, -im.width * s / 2, -im.height * s / 2, im.width * s, im.height * s); g.restore(); g.strokeStyle = "#7a5a20"; g.lineWidth = 4 * k; g.beginPath(); g.arc(0, 0, ww / 2 + 12 * k, 0, 7); g.stroke(); }
  else { g.fillStyle = "#fbf6ea"; g.fillRect(-ww / 2 - 14 * k, -hh / 2 - 14 * k, ww + 28 * k, hh + 28 * k); g.shadowColor = "transparent"; g.drawImage(im, -ww / 2, -hh / 2, ww, hh); g.fillStyle = "rgba(230,215,170,.9)"; g.save(); g.rotate(0.08); g.fillRect(-55 * k, -hh / 2 - 32 * k, 110 * k, 36 * k); g.restore(); }
  if (o.caption) { const cy = (o.coin ? ww / 2 + 12 * k : hh / 2 + 14 * k) + 44 * k; g.font = F(38, k); g.textAlign = "center"; g.textBaseline = "middle"; const tw = g.measureText(o.caption).width; g.fillStyle = "rgba(251,246,234,.95)"; g.beginPath(); g.roundRect(-tw / 2 - 18 * k, cy - 28 * k, tw + 36 * k, 56 * k, 10 * k); g.fill(); g.fillStyle = INK; g.fillText(o.caption, 0, cy + 2 * k); }
  g.restore(); };
// dossier (C): real portrait + facts + stamp
const dossierO = (o, a, sa) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = Math.min(1, a * 1.5); g.translate(540 * k, (o.y || 600) * k + (1 - a) * -120 * k); g.rotate(o.rot ?? -0.04);
  g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 30 * k; g.shadowOffsetY = 12 * k;
  g.fillStyle = "#d9c08a"; g.beginPath(); g.roundRect(-440 * k, -300 * k, 880 * k, 560 * k, 14 * k); g.fill(); g.shadowColor = "transparent";
  g.fillStyle = "#c8ac72"; g.beginPath(); g.roundRect(-440 * k, -340 * k, 330 * k, 60 * k, 12 * k); g.fill();
  g.fillStyle = "#3a2a1a"; g.font = F(28, k, 800); g.textBaseline = "middle"; g.fillText(o.tab || "IMPERIAL FILE", -420 * k, -310 * k);
  const im = R.img[o.img]; if (im) { const bw = 330 * k, bh = 420 * k; const s = Math.min(bw / im.width, bh / im.height), dw = im.width * s, dh = im.height * s;
    g.save(); g.translate(-400 * k, -260 * k); g.rotate(0.03); g.fillStyle = "#f4efe4"; g.fillRect(-12 * k, -12 * k, bw + 24 * k, bh + 24 * k); g.fillStyle = "#2a2420"; g.fillRect(0, 0, bw, bh);
    g.drawImage(im, (bw - dw) / 2, (bh - dh) / 2, dw, dh); g.fillStyle = RED; g.beginPath(); g.arc(bw / 2, -4 * k, 12 * k, 0, 7); g.fill(); g.restore(); }
  (o.rows || []).forEach(([l, v], i) => { g.font = F(22, k, 800); g.fillStyle = "#7a5a32"; g.fillText(l, -30 * k, (-238 + i * 84) * k); g.font = F(v.length > 18 ? 28 : 33, k, 900); g.fillStyle = "#2b2026"; g.fillText(v, -30 * k, (-205 + i * 84) * k); });
  if (o.stamp && sa > 0) { g.save(); g.globalAlpha = Math.min(1, sa); g.translate(190 * k, 200 * k); g.rotate(-0.14); g.scale(1 + 0.8 * (1 - sa), 1 + 0.8 * (1 - sa)); g.strokeStyle = RED; g.lineWidth = 9 * k; g.font = F(o.stamp.length > 11 ? 50 : 62, k, 900); g.textAlign = "center";
    const sw = g.measureText(o.stamp).width + 50 * k; g.strokeRect(-sw / 2, -46 * k, sw, 92 * k); g.fillStyle = RED; g.fillText(o.stamp, 0, 4 * k); g.restore(); }
  g.restore(); };
// map card (C): pinned parchment map; territories fade in one by one
const mapO = (key, a, lt) => (g, w) => { if (a <= 0) return; const M = R.maps[key]; if (!M) return; const k = w / 1080, mw = 1000 * k * 0.9, mh = 720 * k * 0.9, y = (M.spec.y || 190) * k;
  g.save(); g.globalAlpha = Math.min(1, a * 1.4); g.translate(w / 2, y + mh / 2 + (1 - a) * -80 * k); g.rotate(-0.012);
  g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 28 * k; g.shadowOffsetY = 10 * k; g.fillStyle = "#f6efdc"; g.fillRect(-mw / 2 - 16 * k, -mh / 2 - 16 * k, mw + 32 * k, mh + 32 * k); g.shadowColor = "transparent";
  g.drawImage(M.base, -mw / 2, -mh / 2, mw, mh);
  M.spec.terr.forEach((t, i) => { const ta = clamp((lt - (t.at ?? 0.4 + i)) / 0.8); if (ta > 0) { g.globalAlpha = ta; g.drawImage(M.layers[i], -mw / 2, -mh / 2, mw, mh); } });
  (M.spec.marks || []).forEach((m, i) => { const ta = clamp((lt - (m.at ?? 1.5 + i * 0.5)) / 0.4); if (ta > 0) { g.globalAlpha = ta; g.drawImage(M.marks[i], -mw / 2, -mh / 2, mw, mh); } });
  g.globalAlpha = 1;
  if (M.spec.arrow && lt > M.spec.arrow.at) { const q = sm((lt - M.spec.arrow.at) / 1.2), [ax, ay] = M.P(M.spec.arrow.from), [bx, by] = M.P(M.spec.arrow.to), sx = mw / 1000, sy = mh / 720;
    const X0 = -mw / 2 + ax * sx, Y0 = -mh / 2 + ay * sy, X1 = -mw / 2 + bx * sx, Y1 = -mh / 2 + by * sy, cx = (X0 + X1) / 2, cy = Math.min(Y0, Y1) - 110 * k;
    g.strokeStyle = RED; g.lineWidth = 9 * k; g.lineCap = "round"; g.beginPath(); g.moveTo(X0, Y0); const N = 30; let px = X0, py = Y0;
    for (let i = 1; i <= N * q; i++) { const t = i / N; px = (1 - t) * (1 - t) * X0 + 2 * t * (1 - t) * cx + t * t * X1; py = (1 - t) * (1 - t) * Y0 + 2 * t * (1 - t) * cy + t * t * Y1; g.lineTo(px, py); } g.stroke();
    if (q > 0.95) { g.fillStyle = RED; g.beginPath(); g.arc(X1, Y1, 16 * k, 0, 7); g.fill(); } }
  if (M.spec.title) { g.font = F(40, k); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "rgba(20,14,24,.85)"; const tw = g.measureText(M.spec.title).width; g.beginPath(); g.roundRect(-tw / 2 - 24 * k, mh / 2 - 6 * k, tw + 48 * k, 62 * k, 14 * k); g.fill(); g.fillStyle = GOLD; g.fillText(M.spec.title, 0, mh / 2 + 25 * k); }
  g.restore(); };
// counter card (ep 12): emperors counted up with the years
const counterO = (o, lt) => (g, w) => { const k = w / 1080, q = clamp((lt - (o.at || 0.4)) / (o.dur || 4)), n = Math.round(q * o.to), yr = Math.round(o.y0 + q * (o.y1 - o.y0));
  g.save(); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(56, k); g.lineWidth = 12 * k; g.strokeStyle = "#1a1418"; g.strokeText("AD " + yr, w / 2, 250 * k); g.fillStyle = "#fff"; g.fillText("AD " + yr, w / 2, 250 * k);
  g.font = F(170, k); g.lineWidth = 18 * k; g.strokeText(String(n), w / 2, 380 * k); g.fillStyle = GOLD; g.fillText(String(n), w / 2, 380 * k);
  g.font = F(52, k); g.lineWidth = 12 * k; g.strokeText("emperors", w / 2, 490 * k); g.fillStyle = "#fff"; g.fillText("emperors", w / 2, 490 * k);
  for (let i = 0; i < 26; i++) { if (i >= n) break; const cx = (150 + (i % 13) * 60) * k, cy = (570 + Math.floor(i / 13) * 64) * k; g.strokeStyle = "#e8c45a"; g.lineWidth = 7 * k; g.beginPath(); g.arc(cx, cy, 22 * k, Math.PI * 0.15, Math.PI * 0.85, true); g.stroke(); }
  const sa = clamp((lt - (o.stampAt || 6)) / 0.25); if (sa > 0) { g.save(); g.translate(w / 2, 760 * k); g.rotate(-0.08); g.scale(1 + 0.8 * (1 - sa), 1 + 0.8 * (1 - sa)); g.globalAlpha = sa; g.font = F(70, k); const sw = g.measureText(o.stamp).width + 50 * k; g.fillStyle = "rgba(250,244,228,.9)"; g.fillRect(-sw / 2, -50 * k, sw, 100 * k); g.strokeStyle = RED; g.lineWidth = 9 * k; g.strokeRect(-sw / 2, -50 * k, sw, 100 * k); g.fillStyle = RED; g.fillText(o.stamp, 0, 4 * k); g.restore(); }
  g.restore(); };
// name chain card (ep 13): Byzantium -> New Rome -> Constantinople -> Istanbul
const chainO = (o, lt) => (g, w) => { const k = w / 1080; g.save(); g.translate(w / 2, 0); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round";
  g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 26 * k; g.fillStyle = "#f3e7c9"; g.beginPath(); g.roundRect(-430 * k, 190 * k, 860 * k, 700 * k, 18 * k); g.fill(); g.shadowColor = "transparent";
  o.items.forEach(([name, sub, t], i) => { const a = clamp((lt - t) / 0.4); if (a <= 0) return; const y = (270 + i * 172) * k; g.globalAlpha = a;
    if (i) { g.fillStyle = RED; g.font = F(40, k); g.fillText("↓", 0, y - 66 * k); }
    g.font = `900 ${(i === o.items.length - 1 ? 84 : 64) * k}px "Helvetica Neue", Arial, sans-serif`; g.fillStyle = i === o.items.length - 1 ? "#1f4e8c" : INK; g.fillText(name, 0, y);
    const nt = o.items[i + 1]; if (nt && lt > nt[2] - 0.2) { const sw = g.measureText(name).width * clamp((lt - nt[2] + 0.2) / 0.4); g.fillStyle = RED; g.fillRect(-g.measureText(name).width / 2, y - 4 * k, sw, 9 * k); }
    g.font = F(36, k, 800); g.fillStyle = "#5a4a36"; g.fillText(sub, 0, y + 52 * k); });
  g.restore(); };
const keyO = (text, a) => (g, w) => { if (a <= 0) return; const k = w / 1080; g.save(); g.globalAlpha = a; g.translate(w / 2, 1580 * k); g.rotate(-0.03); g.font = F(46, k);
  const tw = g.measureText(text).width; g.fillStyle = "rgba(250,246,236,.96)"; g.strokeStyle = "#1a1418"; g.lineWidth = 6 * k; g.beginPath(); g.roundRect(-tw / 2 - 40 * k, -60 * k, tw + 80 * k, 120 * k, 14 * k); g.fill(); g.stroke();
  g.fillStyle = "#a8262e"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, 0, 2 * k); g.restore(); };

// ---------- frame ----------
export function frameRome(f, E) {
  const EP = R.EP, X = E.X; let i = 0; while (i < R.SH.length - 1 && f >= R.SH[i + 1].f0) i++;
  const sh = R.SH[i], t = f - sh.f0, lt = t / 30, dur = Math.max(1, ((R.SH[i + 1] || { f0: sh.f0 + 90 }).f0 - sh.f0)), p = clamp(t / dur);
  const A = [], FXS = [], OV = [logoO(EP.tag)], credits = [];
  const st = (seed, o = {}) => ({ blink: E.blink(f, seed), ...E.idle(f, seed), ...o });
  const talkOf = (sp) => (sh.sp === sp ? E.talk(f, sh.fs - 2, sh.fe + 2) : 0);
  let cam, light = sh.light || "day", dof = { focus: 4, amount: 0 }, flash = 0, focusPt = null, caption = !sh.tail;
  for (const b of Object.values(R.bg)) b.m.visible = false;
  const pres = (where, X0, z = -1.4) => { // Ava and Theo on the left/right of the frame
    if (where === "none") return; const both = where === "both", show = both ? ["ava", "theo"] : [where];
    if (show.includes("ava")) A.push({ id: "ava", pos: [X0 + (both ? -0.78 : -0.55), 0, z], st: st(5, { face: sh.sp === "q" ? "think" : (sh.avaFace || "wow"), arms: sh.sp === "q" ? "chin" : "hang", talk: talkOf("q"), look: 0.5 }) });
    if (show.includes("theo")) A.push({ id: "theo", pos: [X0 + (both ? 0.78 : 0.55), 0, z - 0.1], st: st(9, { face: sh.sp === "a" ? (sh.theoFace || "talk") : "smug", arms: sh.sp === "a" ? (sh.theoArms || "present") : "hip", talk: talkOf("a"), look: -0.5 }) });
  };
  const castAt = (X0) => (sh.cast || []).forEach((c) => { const ap = c.at ? clamp((lt - c.at) / 0.3) : 1; if (ap <= 0 || (c.until && lt > c.until)) return;
    A.push({ id: c.id, pos: [X0 + c.x, c.y || 0, c.z ?? -1.6], scale: c.scale, flip: c.flip, st: st(c.seed || 3, { face: c.face || "neutral", arms: c.arms || "hang", legs: c.legs, phase: c.walk ? f / 16 : undefined, prop: c.prop, look: c.look ?? 0 }) });
    if (c.fx) FXS.push({ kind: c.fx, pos: [X0 + c.x + 0.3, 2.6, (c.z ?? -1.6)], size: 0.6, t: clamp((lt - (c.fxAt || 0.5)) / 0.8) }); });
  if (sh.bg) { // ---- B: real image backdrop ----
    const b = R.bg[sh.bg], X0 = b.X, mv = sh.move || {}, u = (mv.u0 ?? 0.5) + ((mv.u1 ?? mv.u0 ?? 0.5) - (mv.u0 ?? 0.5)) * sm(p), v = (mv.v0 ?? 0.4) + ((mv.v1 ?? mv.v0 ?? 0.4) - (mv.v0 ?? 0.4)) * sm(p);
    const z0 = mv.z0 ?? 1, z1 = mv.z1 ?? z0, zz = sh.punch ? z1 + (z0 - z1) * (1 - X.easeOut(clamp(t / 24))) : z0 + (z1 - z0) * sm(p), Wp = b.Wp * zz, Hp = b.Hp * zz;
    let cx = X0 + (0.5 - u) * Wp, cy = 3.0 + (v - 0.5) * Hp;
    cx = Math.max(X0 - (Wp / 2 - 3.15), Math.min(X0 + (Wp / 2 - 3.15), cx)); cy = Math.max(7.2 - Hp / 2, Math.min(Hp / 2 - 3.8, cy));
    b.m.visible = true; b.m.scale.setScalar(zz); b.m.position.set(cx, cy, -7.2);
    pres(sh.pres ?? (sh.sp === "q" ? "ava" : "theo"), X0); castAt(X0);
    cam = { pos: [X0, 1.4, 4.4 - 0.35 * sm(p)], look: [X0, 1.6, -3], fov: 50, roll: 0 };
    credits.push(EP.images[sh.bg].credit); light = sh.light || "day"; focusPt = [X0, 0, -1.4];
  } else { // ---- drawn rooms ----
    const X0 = R.ROOM[sh.room || "study"];
    pres(sh.pres ?? "both", X0, sh.room === "throne" ? 0.2 : -1.2); castAt(X0);
    if (sh.throneSwap) { const ids = ["e1", "e2", "e3", "e4"], n = Math.floor(t / 7), sw = t % 7;
      A.push({ id: ids[n % 4], pos: [X0, 0.65, -2.1], st: st(n, { face: ["smug", "happy", "nervous", "grin"][n % 4], arms: ["present", "cheer", "hang", "hip"][n % 4] }) });
      if (n > 0) FXS.push({ kind: "puff", pos: [X0, 1.6, -1.9], size: 1.1, t: clamp(sw / 7) }); }
    const far = sh.room === "throne" ? 5.4 : 4.6, ly = sh.room === "study" ? 1.85 : 1.25;
    cam = E.camAt(f, [{ f: sh.f0, pos: [X0, 1.5, far], look: [X0, ly, -2], fov: 50 }, { f: sh.f0 + dur, pos: [X0, 1.45, far - 0.4], look: [X0, ly, -2], fov: 50 }]);
    light = sh.light || "interior"; focusPt = [X0, 0, -1.2];
  }
  if (sh.dof) dof = sh.dof;
  // overlays of this shot
  for (const o of sh.ov || []) {
    const a = clamp((lt - (o.at || 0)) / 0.35) * (o.until ? 1 - clamp((lt - o.until) / 0.3) : 1); if (a <= 0 && o.kind !== "counter" && o.kind !== "chain") continue;
    if (o.kind === "top") OV.push(topText(o.big, o.small, a, o.size || 76, o.y || 300));
    else if (o.kind === "name") OV.push(nameCard(o.title, o.sub, a));
    else if (o.kind === "pin") { OV.push(pinO(o, back(a))); if (EP.images[o.img]) credits.push(EP.images[o.img].credit); }
    else if (o.kind === "dossier") { OV.push(dossierO(o, a, clamp((lt - (o.stampAt || 99)) / 0.25))); credits.push(EP.images[o.img].credit); }
    else if (o.kind === "map") OV.push(mapO(o.map, a, lt - (o.at || 0)));
    else if (o.kind === "counter") OV.push(counterO(o, lt));
    else if (o.kind === "chain") OV.push(chainO(o, lt));
    if (o.sfxFx && lt > o.at) FXS.push({ kind: o.sfxFx, pos: [cam.look[0] + 0.6, 2.7, -1.4], size: 0.6, t: clamp((lt - o.at) / 0.8) });
  }
  if (sh.cta) OV.push(topText("FOLLOW HISTORY SKETCHES", EP.ctaSmall, clamp((lt - 0.1) / 0.3), 72, 300));
  if (sh.tail) { const lastF = R.lastF; OV.push(keyO(EP.key, clamp((f - (lastF - 30)) / 3) * (1 - clamp((f - lastF + 2) / 2)))); }
  if (sh.hookText && !sh.tail) OV.push(topText(sh.hookText[0], sh.hookText[1], i === 0 ? 1 : clamp(lt / 0.3), 80, 300));
  if (sh.tail && sh.hookText) OV.push(topText(sh.hookText[0], sh.hookText[1], clamp((f - (R.lastF - 12)) / 6), 80, 300));
  if (credits.length) OV.push(creditO([...new Set(credits)].slice(0, 2)));
  if (sh.flash && t < 6) flash = (1 - t / 6) * 0.5;
  return { cam, light, dof, actors: A, fx: FXS, flash, focusPt, caption, overlay: (g, w, h, s) => OV.forEach((o) => o(g, w, h, s)) };
}
