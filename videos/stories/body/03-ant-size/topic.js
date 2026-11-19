// "What if you were the size of an ant?" — topic file for the shared explainer engine
const L = id => LN(id);
function buildCues() { const C = CUE; C.title = W_('o4', 'subscribe') - 6; C.end = DUR - TAIL; C.calls = L('o3').start; }

// ---------- new drawings (flat, no outlines, each with its own motion) ----------
const BROWN = '#8a3a26', BROWN2 = '#b0533a';
function ant(t, x, y, s, o = {}) {   // side view, tripod gait, antennae wiggle; o.carry draws an item above
  const g = t * (o.speed || 9);
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
  ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.beginPath(); ctx.ellipse(0, 52, 110, 10, 0, 0, 6.283); ctx.fill();
  for (let i = 0; i < 3; i++) for (const side of [0, 1]) {   // legs
    const ph = g + i * 2.1 + side * Math.PI, sw = Math.sin(ph) * 16, lift = Math.max(0, Math.cos(ph)) * 8, hx = -20 + i * 22;
    ctx.fillStyle = side ? '#5e2618' : BROWN; ctx.beginPath(); ctx.moveTo(hx, 6); ctx.lineTo(hx + sw - 30, 22 - lift); ctx.lineTo(hx + sw - 26, 50 - lift); ctx.lineTo(hx + sw - 18, 50 - lift); ctx.lineTo(hx + sw - 22, 24 - lift); ctx.lineTo(hx + 6, 12); ctx.fill();
  }
  ctx.fillStyle = BROWN2; ctx.beginPath(); ctx.ellipse(-84, 0, 52, 38, 0.15, 0, 6.283); ctx.fill();   // gaster
  ctx.fillStyle = BROWN; ctx.beginPath(); ctx.ellipse(0, -6, 40, 20, -0.1, 0, 6.283); ctx.fill();    // thorax
  circ(-38, 2, 9, BROWN);
  ctx.beginPath(); ctx.ellipse(62, -16, 34, 28, 0.2, 0, 6.283); ctx.fill();                           // head
  circ(78, -24, 7, '#20232f'); circ(80, -26, 2.5, '#fff');
  ctx.fillStyle = '#5e2618'; ctx.beginPath(); ctx.moveTo(92, -6); ctx.lineTo(112, 2); ctx.lineTo(96, 4); ctx.fill();
  for (const k of [0, 1]) { const w = Math.sin(t * 5 + k) * 0.25; ctx.save(); ctx.translate(70, -40); ctx.rotate(-0.9 + w + k * 0.25); rr2(-3, -54, 6, 54, 3, '#5e2618'); ctx.translate(0, -54); ctx.rotate(0.9); rr2(-3, -34, 6, 34, 3, '#5e2618'); ctx.restore(); }
  rr2(-110, -24, 40, 10, 5, 'rgba(255,255,255,0.22)');
  if (o.carry) { ctx.save(); ctx.translate(30, -70 + Math.sin(g) * 3); o.carry(t); ctx.restore(); }
  ctx.restore();
}
function kidAt(t, x, y, s, o = {}) { CAM = { x: 960, y: 540, z: 1 }; KID = { x, y }; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); drawKid(t, o); ctx.restore(); const hs = o.head || 1; reg('hero', 'mascot', x - 70 * s * Math.max(1, hs * 0.9), y - (290 + 100 * (hs - 1)) * s, x + 70 * s * Math.max(1, hs * 0.9), y + 12 * s); }
function droplet(t, x, y, r, o = {}) {   // a big wobbly drop of water (surface tension)
  ctx.save(); ctx.translate(x, y); const wob = o.wob ?? 1;
  ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.ellipse(0, r * 0.92, r * 0.95, r * 0.12, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); for (let i = 0; i <= 48; i++) { const a = i / 48 * 6.283, rr = r * (1 + wob * 0.04 * Math.sin(a * 3 + t * 4) + wob * 0.03 * Math.sin(a * 5 - t * 3)); const yy = Math.sin(a) * rr * (Math.sin(a) > 0 ? 0.86 : 1); ctx.lineTo(Math.cos(a) * rr, yy); }
  ctx.closePath(); const g = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r); g.addColorStop(0, 'rgba(210,240,255,0.75)'); g.addColorStop(1, 'rgba(90,169,230,0.55)'); ctx.fillStyle = g; ctx.fill();
  if (o.inside) o.inside(t);
  rr2(-r * 0.55, -r * 0.62, r * 0.32, r * 0.12, r * 0.06, 'rgba(255,255,255,0.75)'); circ(-r * 0.62, -r * 0.35, r * 0.05, 'rgba(255,255,255,0.75)');
  ctx.restore();
}
function skyscraper(t, x, yb, w, h) { rr2(x - w / 2, yb - h, w, h, 10, '#2c3a66'); rr2(x - w / 2, yb - h, w * 0.28, h, 10, '#3a4b80');
  for (let r = 0; r < Math.floor(h / 46); r++) for (let c = 0; c < 4; c++) { const on = (Math.sin(r * 7.1 + c * 3.3 + Math.floor(t * 0.7)) > 0.2); rr2(x - w / 2 + 18 + c * (w - 36) / 4, yb - h + 22 + r * 46, (w - 36) / 4 - 14, 24, 4, on ? '#ffd98a' : '#1d2850'); } }
function cat(t, x, y, s) {   // a big sitting cat (tail swishes, blinks)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const tail = Math.sin(t * 1.6) * 0.35;
  ctx.save(); ctx.translate(70, -20); ctx.rotate(-0.4 + tail); rr2(-12, -140, 24, 150, 12, '#e08a3a'); ctx.restore();
  ctx.fillStyle = '#f0a04b'; ctx.beginPath(); ctx.ellipse(0, -80, 90, 110, 0, 0, 6.283); ctx.fill(); circ(0, -230, 72, '#f0a04b');
  ctx.beginPath(); ctx.moveTo(-60, -270); ctx.lineTo(-40, -330); ctx.lineTo(-14, -290); ctx.fill(); ctx.beginPath(); ctx.moveTo(60, -270); ctx.lineTo(40, -330); ctx.lineTo(14, -290); ctx.fill();
  rr2(-70, -120, 22, 60, 11, '#e08a3a'); rr2(-30, -60, 60, 70, 30, '#ffe0b8');
  const bl = 1 - blinkF(t + 0.7); for (const sd of [-1, 1]) { ctx.fillStyle = '#5aa96a'; ctx.beginPath(); ctx.ellipse(sd * 26, -238, 14, 16 * bl + 1, 0, 0, 6.283); ctx.fill(); rr2(sd * 26 - 3, -250, 6, 24 * bl + 1, 3, '#20232f'); }
  ctx.fillStyle = '#e2457a'; ctx.beginPath(); ctx.moveTo(-8, -214); ctx.lineTo(8, -214); ctx.lineTo(0, -204); ctx.fill(); ctx.restore();
}
function eiffel(x, yb, h) { ctx.fillStyle = 'rgba(16,35,72,0.55)'; ctx.beginPath(); ctx.moveTo(x - h * 0.22, yb); ctx.quadraticCurveTo(x - h * 0.05, yb - h * 0.45, x - h * 0.02, yb - h); ctx.lineTo(x + h * 0.02, yb - h); ctx.quadraticCurveTo(x + h * 0.05, yb - h * 0.45, x + h * 0.22, yb); ctx.lineTo(x + h * 0.12, yb); ctx.quadraticCurveTo(x, yb - h * 0.2, x - h * 0.12, yb); ctx.fill(); rr2(x - h * 0.12, yb - h * 0.38, h * 0.24, h * 0.03, 4, 'rgba(16,35,72,0.55)'); }
function shrew(t, x, y, s) { ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 9)) * -4); ctx.scale(s, s);
  ctx.fillStyle = '#8a7060'; ctx.beginPath(); ctx.ellipse(0, -40, 90, 50, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(-70, -50); ctx.quadraticCurveTo(-150, -46, -170, -26); ctx.quadraticCurveTo(-130, -16, -70, -18); ctx.fill();
  circ(-170, -26, 8, '#e9a7b8'); circ(-100, -54, 7, '#20232f'); circ(-98, -56, 2.5, '#fff'); circ(-70, -82, 16, '#a88a78'); rr2(80, -46, 70, 10, 5, '#8a7060');
  for (const lx of [-50, 40]) rr2(lx, -6, 14, 16, 6, '#e9a7b8'); ctx.restore(); }
function griffinfly(t, x, y, s) { const f = Math.sin(t * 30) * 0.12; ctx.save(); ctx.translate(x, y + Math.sin(t * 1.3) * 8); ctx.scale(s, s);
  for (const [sy, a] of [[-1, 0.12], [1, -0.12]]) for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx, 1); ctx.rotate(a * sy + f * sy); ctx.fillStyle = 'rgba(200,230,255,0.55)'; ctx.beginPath(); ctx.ellipse(120, sy * 18, 120, 26, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  rr2(-14, -40, 28, 300, 14, '#3a7d6a'); circ(0, -48, 26, '#3a7d6a'); circ(-12, -56, 12, '#8fd8e6'); circ(12, -56, 12, '#8fd8e6'); for (let i = 0; i < 8; i++) rr2(-14, 30 + i * 28, 28, 6, 3, '#2b5e50'); ctx.restore(); }
function pitch(t, x, y, w, h) { rr2(x, y, w, h, 18, '#3f9a52'); for (let i = 0; i < 6; i++) rr2(x + i * w / 6, y, w / 12, h, 0, 'rgba(255,255,255,0.06)');
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; rr2(x + w / 2 - 3, y + 10, 6, h - 20, 3, 'rgba(255,255,255,0.7)'); ctx.save(); ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, 70, 0, 6.283); ctx.arc(x + w / 2, y + h / 2, 64, 0, 6.283, true); ctx.fill(); ctx.restore();
  rr2(x + 10, y + h / 2 - 90, 6, 180, 3, 'rgba(255,255,255,0.7)'); rr2(x + w - 16, y + h / 2 - 90, 6, 180, 3, 'rgba(255,255,255,0.7)'); }
function antlionPit(t, x, y, r) { ctx.save(); ctx.translate(x, y); const g = ctx.createRadialGradient(0, 0, 10, 0, 0, r); g.addColorStop(0, '#8a6a3a'); g.addColorStop(1, '#e6c58a'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.42, 0, 0, 6.283); ctx.fill();
  for (let i = 0; i < 26; i++) { const p = (t * 0.25 + i / 26) % 1, a = i * 2.4; circ(Math.cos(a) * r * (1 - p) * 0.95, Math.sin(a) * r * 0.42 * (1 - p) * 0.95, 3 + (i % 3), '#c9a46a'); }
  const jaw = Math.sin(t * 3) * 0.25; ctx.fillStyle = '#5e4a2a'; ctx.beginPath(); ctx.ellipse(0, 6, 26, 14, 0, 0, 6.283); ctx.fill();
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 10, -2); ctx.rotate(sd * (0.6 + jaw)); rr2(-3, -34, 6, 34, 3, '#3a2a1a'); ctx.restore(); } ctx.restore(); }
function coastMap(json, x0, y0, w, h, t, o = {}) {   // a Natural-Earth coast json drawn into a rectangle
  const [bx0, by0, bx1, by1] = json.bbox, sx = w / (bx1 - bx0), sy = h / (by1 - by0), P = ([lon, lat]) => [x0 + (lon - bx0) * sx, y0 + (by1 - lat) * sy];
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip(); rr2(x0, y0, w, h, 0, '#5aa9e6'); ctx.fillStyle = '#f2dcb0';
  for (const ring of json.rings) { ctx.beginPath(); ring.forEach((p, i) => { const [a, b] = P(p); i ? ctx.lineTo(a, b) : ctx.moveTo(a, b); }); ctx.closePath(); ctx.fill(); }
  if (o.route) { const pts = o.route.map(P), k = clamp((t - o.t0) / 3); ctx.fillStyle = '#e2457a'; for (let i = 0; i < pts.length * k - 1; i++) { const [a, b] = pts[i], [c, d] = pts[i + 1]; for (let j = 0; j < 8; j++) circ(lerp(a, c, j / 8), lerp(b, d, j / 8), 6, '#e2457a'); } }
  ctx.restore();
}
let EUROPE = null;
Object.assign(ICONS, {
  rice(t) { ctx.save(); ctx.rotate(-0.3); ctx.fillStyle = '#fbf6ea'; ctx.beginPath(); ctx.ellipse(0, 0, 60, 26, 0, 0, 6.283); ctx.fill(); rr2(-40, -14, 40, 8, 4, 'rgba(255,255,255,0.9)'); ctx.restore(); },
  bathtub(t) { rr2(-80, -20, 160, 70, 30, '#f3f7fb'); rr2(-70, -22, 140, 20, 10, '#8fd8e6'); for (let i = 0; i < 14; i++) circ(-60 + (i * 17) % 120, -14 + Math.sin(t * 3 + i) * 2, 3, ['#ff8f4a', '#e2457a', '#ffd98a', '#5b4fd6'][i % 4]); rr2(-64, 46, 14, 18, 6, '#c9d6ec'); rr2(50, 46, 14, 18, 6, '#c9d6ec'); rr2(56, -60, 10, 44, 5, '#c9d6ec'); },
  city(t) { for (const [x, w, h] of [[-70, 36, 90], [-30, 40, 130], [14, 34, 70], [50, 36, 110]]) { rr2(x, 40 - h, w, h, 6, '#2c3a66'); for (let r = 0; r < h / 22 - 1; r++) for (let c = 0; c < 2; c++) rr2(x + 6 + c * 15, 50 - h + r * 22, 9, 10, 2, Math.sin(r * 5 + c * 3 + x + Math.floor(t)) > 0 ? '#ffd98a' : '#1d2850'); } },
  cube(t) { const a = t * 0.8, c = Math.cos(a), s = Math.sin(a); const P = (x, y, z) => [x * c - z * s, y * 0.9 + (x * s + z * c) * 0.35]; const f = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); pts.forEach((p, i) => { const [u, v] = P(...p); i ? ctx.lineTo(u, v) : ctx.moveTo(u, v); }); ctx.fill(); };
    const k = 40; f([[-k, -k, -k], [k, -k, -k], [k, -k, k], [-k, -k, k]], '#ffd98a'); f([[-k, -k, k], [k, -k, k], [k, k, k], [-k, k, k]], '#ff8f4a'); f([[k, -k, -k], [k, -k, k], [k, k, k], [k, k, -k]], '#c7621f'); },
  dog(t) { ctx.save(); ctx.rotate(Math.sin(t * 4) * 0.03); rr2(-50, -20, 90, 44, 22, '#d9a066'); circ(48, -30, 26, '#d9a066'); rr2(56, -60, 14, 30, 7, '#a8763e'); circ(56, -34, 4, '#20232f'); circ(72, -24, 5, '#20232f');
    for (const lx of [-40, -16, 12, 30]) rr2(lx, 18, 12, 30, 6, '#c08a52'); ctx.save(); ctx.translate(-50, -10); ctx.rotate(-0.8 + Math.sin(t * 9) * 0.4); rr2(-4, -30, 8, 30, 4, '#c08a52'); ctx.restore(); ctx.restore(); },
  horse(t) { rr2(-70, -30, 130, 56, 28, '#7a4a2c'); ctx.save(); ctx.translate(50, -20); ctx.rotate(-0.7); rr2(-14, -70, 30, 80, 14, '#7a4a2c'); ctx.restore(); circ(96, -82, 22, '#7a4a2c'); rr2(70, -110, 40, 14, 7, '#5a3420');
    for (const lx of [-60, -36, 24, 44]) rr2(lx, 20, 12, 56 + Math.sin(t * 6 + lx) * 3, 6, '#6a3e22'); ctx.save(); ctx.translate(-70, -20); ctx.rotate(0.6 + Math.sin(t * 2) * 0.2); rr2(-6, 0, 12, 50, 6, '#3a2414'); ctx.restore(); },
  centrifuge(t) { circ(0, 0, 70, '#3a3f5a'); ctx.save(); ctx.rotate(t * 6); rr2(-62, -6, 124, 12, 6, '#9aa6c4'); circ(-62, 0, 14, '#ff8f4a'); circ(62, 0, 14, '#ff8f4a'); ctx.restore(); circ(0, 0, 12, '#f3f7fb'); },
  leaf(t) { ctx.save(); ctx.rotate(Math.sin(t * 2) * 0.1); ctx.fillStyle = '#5aa96a'; ctx.beginPath(); ctx.moveTo(-60, 10); ctx.quadraticCurveTo(-10, -60, 60, -20); ctx.quadraticCurveTo(20, 40, -60, 10); ctx.fill(); rr2(-50, -6, 100, 4, 2, '#3f7f4c'); ctx.restore(); },
  f1(t) { rr2(-90, -10, 180, 26, 13, '#e2457a'); rr2(-30, -30, 60, 24, 12, '#e2457a'); rr2(-16, -26, 24, 14, 6, '#20232f'); rr2(70, -24, 30, 12, 4, '#20232f'); rr2(-100, -28, 22, 20, 4, '#20232f'); wheel(t * 3, -58, 18, 18); wheel(t * 3, 58, 18, 18);
    for (let i = 0; i < 3; i++) rr2(-150 - i * 30 - (t * 200 % 30), -14 + i * 10, 40, 4, 2, 'rgba(255,255,255,0.5)'); },
  boulder(t) { ctx.fillStyle = '#c9a46a'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283, r = 52 + Math.sin(i * 3.1) * 8; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.8); } ctx.fill(); circ(-14, -14, 10, 'rgba(255,255,255,0.35)'); },
  beachball(t) { ctx.save(); ctx.rotate(t * 0.8); const cols = ['#e2457a', '#ffd98a', '#5aa9e6', '#f3f7fb']; for (let i = 0; i < 4; i++) { ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 54, i * Math.PI / 2, (i + 1) * Math.PI / 2); ctx.fill(); } ctx.restore(); circ(0, 0, 10, '#f3f7fb'); },
  bus(t) { rr2(-110, -50, 220, 90, 18, '#ffd36b'); for (let i = 0; i < 4; i++) rr2(-96 + i * 50, -38, 40, 30, 6, '#8fd8e6'); wheel(t * 2, -66, 44, 18); wheel(t * 2, 66, 44, 18); },
  jumpspider(t) { const hop = Math.max(0, Math.sin(t * 2.2)) ** 4 * 18; ctx.save(); ctx.translate(0, -hop); for (let i = 0; i < 4; i++) for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * (0.5 + i * 0.35)); rr2(0, -4, sd * 56, 8, 4, '#3a2f2f'); ctx.restore(); }
    ctx.fillStyle = '#4a3a3a'; ctx.beginPath(); ctx.ellipse(0, 18, 34, 28, 0, 0, 6.283); ctx.fill(); circ(0, -16, 30, '#5a4646'); const bl = 1 - blinkF(t); circ(-12, -18, 11 * bl + 1, '#20232f'); circ(12, -18, 11 * bl + 1, '#20232f'); circ(-9, -22, 3, '#fff'); circ(15, -22, 3, '#fff'); circ(-26, -26, 4, '#20232f'); circ(26, -26, 4, '#20232f'); ctx.restore(); },
  rope(t) { ctx.save(); ctx.rotate(Math.sin(t * 1.5) * 0.1); for (let i = 0; i < 12; i++) rr2(-70 + i * 12, -8, 14, 16, 7, i % 2 ? '#e8eef6' : '#c9d6ec'); ctx.restore(); },
  cliff(t) { ctx.fillStyle = '#7a6a5a'; ctx.beginPath(); ctx.moveTo(-70, 60); ctx.lineTo(-70, -30); ctx.lineTo(10, -30); ctx.lineTo(30, 60); ctx.fill(); rr2(-70, -36, 84, 10, 5, '#5aa96a'); ctx.save(); ctx.translate(10, -40); ctx.rotate(0.35 + Math.sin(t * 3) * 0.08); rr2(-6, -40, 12, 40, 6, '#f3f7fb'); circ(0, -48, 10, '#f2b38f'); ctx.restore(); },
  mosquito(t) { ICONS.fly(t); ctx.fillStyle = '#3a3f5a'; for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * 0.5); rr2(0, 0, sd * 70, 3, 1.5, '#3a3f5a'); ctx.restore(); } rr2(-2, -40, 4, 26, 2, '#3a3f5a'); },
  strider(t) { const dip = Math.sin(t * 3) * 2; rr2(-80, 30, 160, 4, 2, 'rgba(90,169,230,0.8)'); for (const lx of [-60, -20, 20, 60]) { circ(lx, 32 + dip, 8, 'rgba(90,169,230,0.35)'); rr2(lx - 2, 0, 4, 32, 2, '#3a3f5a'); } rr2(-34, -8, 68, 14, 7, '#3a3f5a'); circ(38, -4, 8, '#3a3f5a'); },
  steam(t) { for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; ctx.translate(-30 + i * 30, -p * 70); ctx.fillStyle = 'rgba(255,170,120,0.8)'; ctx.beginPath(); ctx.moveTo(-6, 30); ctx.quadraticCurveTo(-18, 0, -6, -20); ctx.quadraticCurveTo(6, 0, 6, 30); ctx.fill(); ctx.restore(); } },
  plate(t) { ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 10, 80, 26, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#e6d6c0'; ctx.beginPath(); ctx.ellipse(0, 8, 56, 16, 0, 0, 6.283); ctx.fill(); circ(4, -2 + Math.sin(t * 4) * 1.5, 12, '#c98a4a'); },
  compound(t) { for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++) { if (Math.abs(r) + Math.abs(c) > 3) continue; const x = c * 26 + (r % 2 ? 13 : 0), y = r * 22, on = 0.6 + 0.4 * Math.sin(t * 3 + r + c * 2); ctx.fillStyle = `rgba(143,216,230,${on})`; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + 0.52; ctx.lineTo(x + Math.cos(a) * 12, y + Math.sin(a) * 12); } ctx.fill(); } },
  hand(t) { const k = (Math.sin(t * 0.6) + 1) / 2; ctx.save(); ctx.translate(-40 + k * 80, -20 + k * 30); ctx.rotate(-0.5); rr2(-30, -40, 60, 70, 24, '#f2b38f'); for (let i = 0; i < 4; i++) rr2(-28 + i * 15, -76, 12, 40, 6, '#f2b38f'); rr2(28, -30, 12, 34, 6, '#f2b38f'); ctx.restore(); },
  waves(t, o) { const f = o.freq || 1; for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * (((t * 2 + i / 3) % 1)); ctx.strokeStyle = '#8fd8e6'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = -70; x <= 70; x += 4) ctx.lineTo(x, Math.sin(x * 0.04 * f + t * 6) * (14 - i * 4) + i * 0); ctx.stroke(); ctx.restore(); } },
  bat(t) { const f = Math.sin(t * 8) * 0.3; for (const sd of [-1, 1]) { ctx.save(); ctx.scale(sd, 1); ctx.rotate(f); ctx.fillStyle = '#3a2f4a'; ctx.beginPath(); ctx.moveTo(10, 0); ctx.quadraticCurveTo(50, -40, 90, -10); ctx.quadraticCurveTo(70, 0, 60, 14); ctx.quadraticCurveTo(40, 4, 30, 18); ctx.quadraticCurveTo(20, 6, 10, 14); ctx.fill(); ctx.restore(); }
    circ(0, 2, 18, '#3a2f4a'); ctx.fillStyle = '#3a2f4a'; ctx.beginPath(); ctx.moveTo(-12, -10); ctx.lineTo(-8, -30); ctx.lineTo(-2, -12); ctx.fill(); ctx.beginPath(); ctx.moveTo(12, -10); ctx.lineTo(8, -30); ctx.lineTo(2, -12); ctx.fill(); circ(-6, 0, 3, '#ffd98a'); circ(6, 0, 3, '#ffd98a'); },
  pie(t, o) { const v = o.v || 0.15, k = clamp((t % 6) / 1.2); circ(0, 0, 60, '#3a3f5a'); ctx.fillStyle = o.col || '#ff8f4a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 60, -Math.PI / 2, -Math.PI / 2 + v * 6.283 * eoq(k)); ctx.fill(); },
  tubes(t) { ctx.fillStyle = '#c9e8ff'; rr2(-6, -70, 12, 140, 6, '#c9e8ff'); for (let i = 0; i < 5; i++) for (const sd of [-1, 1]) { ctx.save(); ctx.translate(0, -50 + i * 26); ctx.rotate(sd * 1.0); rr2(-3, 0, 6, 44 - i * 4, 3, '#c9e8ff'); ctx.restore(); }
    for (let i = 0; i < 4; i++) { const p = (t * 0.7 + i / 4) % 1; circ(0, -70 + p * 140, 5, '#5aa9e6'); } },
  o2(t) { circ(-18, 0, 30, '#8fd8e6'); circ(18, 0, 30, '#8fd8e6'); font(30, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('O₂', 0, 2); },
  balance(t, o) { const tip = (o.tip ?? 0.3) * Math.min(1, 0.6 + 0.4 * Math.sin(t * 1.5) ** 2); rr2(-6, -20, 12, 90, 6, '#9aa6c4'); rr2(-40, 66, 80, 14, 7, '#9aa6c4'); ctx.save(); ctx.translate(0, -20); ctx.rotate(-tip); rr2(-110, -6, 220, 12, 6, '#c9d6ec');
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 100, 0); ctx.rotate(tip); rr2(-40, 40, 80, 12, 6, '#c9d6ec'); rr2(-2, 0, 4, 40, 2, '#c9d6ec'); if (sd < 0) for (let i = 0; i < 9; i++) circ(-28 + (i % 3) * 28, 30 - Math.floor(i / 3) * 14, 7, BROWN2); else { circ(-16, 30, 12, '#5aa9e6'); circ(16, 28, 14, '#d9a066'); } ctx.restore(); } ctx.restore(); },
  person(t) { circ(0, -50, 22, '#f2b38f'); rr2(-24, -26, 48, 70, 22, '#5b4fd6'); rr2(-20, 40, 16, 30, 8, '#2d2b7c'); rr2(4, 40, 16, 30, 8, '#2d2b7c'); ctx.save(); ctx.translate(26, -18); ctx.rotate(-1.8 + Math.sin(t * 6) * 0.4); rr2(-6, 0, 12, 40, 6, '#5b4fd6'); ctx.restore(); },
});

// ---------- helpers ----------
const sky = (t, top, bot) => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); };
function tile3(t, items, y = 520) {   // 3 big coloured tiles with animated icons
  items.forEach(([ic, lab, col, t0, o], i) => { const k = spring(t - t0 + 0.1, 0.5, 13); if (k <= 0) return; const x = 380 + i * 580;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); rr2(-250, -280, 500, 560, 36, col); ctx.restore(); reg('panel', lab, x - 250, y - 280, x + 250, y + 280);
    ctx.save(); ctx.translate(x, y - 40); ctx.scale(2.4 * k, 2.4 * k); drawIcon(ic, t, o || {}); ctx.restore(); if (k > 0.6) riseText(lab, x, y + 200, t0 + 0.15, t, { size: 36, weight: 700, color: WHITE, pill: false }); });
}

// ---------- scenes ----------
function sOpen(t) {
  const C2_ = L('c2'), C3 = L('c3'), C3b = L('c3b'), C4 = L('c4');
  if (t < C3.start - 0.1) {   // shrink onto a grain of rice
    worldBG(t, 'night'); const tS = W_('c2', 'two') - 0.2, k = eic((t - tS) / 1.6), s = Math.exp(lerp(Math.log(2.4), Math.log(0.42), clamp(k)));
    if (t > tS - 0.3 && t < tS + 0.2) sfx('rise', tS - 0.3);
    if (k > 0.3) { const rk = spring(t - tS - 0.5, 0.5, 12); ctx.save(); ctx.translate(960, 860); ctx.scale(6 * rk, 6 * rk); drawIcon('rice', t); ctx.restore(); reg('hero', 'rice', 960 - 380, 700, 960 + 380, 1000); }
    kidAt(t, 960, lerp(980, 790, clamp(k)), s, { look: [0, -0.5], squash: t > tS + 1.6 && t < tS + 2.2 ? Math.sin((t - tS - 1.6) * 18) * Math.exp(-(t - tS - 1.6) * 7) : 0 });
    if (t > W_('c2', 'two')) label('2 MM TALL · 1,000× SMALLER', 960, 140, t, W_('c2', 'two'), C3.start - 0.3, GOLD, 40);
    label('A GRAIN OF RICE', 1500, 640, t, W_('c2', 'grain'), C3.start - 0.3, TEAL, 32); return; }
  if (t < C4.start - 0.1 && t < L('c4q').start - 0.1) { worldBG(t, 'teal');
    if (t < C3b.start - 0.1) { placeIcon('bathtub', [[700, 520]], 2.6, t, W_('c3', 'bathtubs') - 0.4, C3b.start - 0.2, { hw: 90, hh: 70 }); placeIcon('bathtub', [[1240, 520]], 2.6, t, W_('c3', 'bathtubs') - 0.2, C3b.start - 0.2, { hw: 90, hh: 70 });
      label('ALL 8 BILLION OF US', 960, 820, t, W_('c3', 'eight'), C3b.start - 0.3, GOLD, 40); label('ROUGH ESTIMATE', 960, 900, t, W_('c3', 'bathtubs'), C3b.start - 0.3, WHITE, 26); }
    else { placeIcon('city', [[960, 480]], 3.4, t, W_('c3b', 'city') - 0.5, L('c4q').start, { hw: 80, hh: 60 }); label('YOUR LIVING ROOM = A CITY', 960, 820, t, W_('c3b', 'living'), L('c4q').start, GOLD, 40); }
    return; }
  worldBG(t, 'night'); kidAt(t, 960, 860, 1.5, { look: [0, -0.3], lid: 0.1 });
  tile3(t, [['cube', 'GRAVITY', '#5b4fd6', W_('c4', 'gravity')], ['drop', 'WATER', '#127b84', W_('c4', 'water')], ['plate', 'HUNGER', '#c8505e', W_('c4', 'hungry')]].map(x => x), 400);
}
function sSquare(t) {
  worldBG(t, 'indigo');
  if (t < L('s5q').start - 0.1) {
    const rows = [['LENGTH', '÷ 1,000', W_('s2', 'length'), 0.66], ['MUSCLE AREA', '÷ 1,000,000', W_('s2', 'area'), 0.4], ['WEIGHT', '÷ 1,000,000,000', W_('s3', 'weight'), 0.14]];
    reg('meter', 'scaling', 260, 200, 1300, 760);
    rows.forEach(([lab, div, t0, v], i) => { const y = 280 + i * 180, k = eoq((t - t0) / 1.0); if (t < t0 - 0.05) return;
      riseText(lab, 280, y - 40, t0, t, { size: 34, color: WHITE, align: 'left', pill: false }); rr2(280, y, 1000, 56, 28, 'rgba(6,20,40,0.5)'); rr2(280, y, 1000 * lerp(1, v, k), 56, 28, ['#8fd8e6', '#ff8f4a', '#e2457a'][i]);
      riseText(div, 1290, y + 28, t0 + 0.4, t, { size: 34, weight: 700, color: GOLD, align: 'right', pill: false }); });
    placeIcon('cube', [[1620, 420]], 3.0, t, L('s2').start, L('s5q').start - 0.2, { hw: 60, hh: 60 });
    tag('1,000× STRONGER FOR YOUR WEIGHT', 960, 880, t, W_('s4', 'thousand'), L('s5q').start - 0.3, '#e2457a', 40);
    label('THE SQUARE-CUBE LAW', 1620, 640, t, W_('s4', 'square'), L('s5q').start - 0.3, GOLD, 30); return; }
  worldBG(t, 'gold');
  label('GALILEO · 1638', 960, 150, t, W_('s5', 'galileo'), L('s6').end, WHITE, 36);
  placeIcon('dog', [[520, 560]], 2.6, t, W_('s5', 'dog'), L('s6').end, { hw: 80, hh: 60 });
  placeIcon('dog', [[520, 300]], 1.8, t, W_('s5', 'two') + 0.2, L('s6').end, { hw: 80, hh: 60 });
  placeIcon('horse', [[1400, 560]], 2.6, t, W_('s5', 'horse'), L('s6').end, { hw: 110, hh: 110 });
  label('✓ CARRIES 2–3 DOGS', 520, 820, t, W_('s5', 'two'), L('s6').end, '#9be3a5', 32); label('✗ CAN\'T CARRY A HORSE', 1400, 900, t, W_('s5', 'couldn'), L('s6').end, '#ff9fb4', 32);
}
function sFall(t) {
  if (t < L('f4').start - 0.1) { sky(t, '#6fb5ff', '#d6ecff');
    skyscraper(t, 1350, 1080, 320, 1000); reg('hero', 'skyscraper', 1190, 80, 1510, 1080);
    const tJ = W_('f2', 'skyscraper'), p = clamp((t - tJ) / 12), y = 140 + p * 760;
    if (t > tJ) { kidAt(t, 820 + Math.sin(t * 1.5) * 30, y, 0.9, { armsUp: 1, look: [0, 1] }); for (let i = 0; i < 6; i++) circ(820 + Math.sin(t + i) * 120, y - 280 - i * 40, 6, 'rgba(255,255,255,0.6)'); }
    label('YOU: FALLING AT WALKING PACE', 560, 980, t, W_('f3', 'walking') - 0.6, L('f4').start - 0.3, WHITE, 30);
    meter(140, 140, 520, 0.03, t, W_('f3', 'drift'), L('f4').start - 0.2, '#5aa96a', '#5aa96a', 'YOUR LANDING SPEED');
    meter(140, 290, 520, 0.95, t, L('f3b').start, L('f4').start - 0.2, '#ffd98a', '#e2457a', 'FULL-SIZE SKYDIVER · ~200 KM/H'); return; }
  if (t < L('f5').start - 0.1) { worldBG(t, 'grey');   // Haldane's mine shaft
    rr2(760, 0, 400, 1080, 0, '#2b2420'); rr2(760, 0, 18, 1080, 0, '#4a3a30'); rr2(1142, 0, 18, 1080, 0, '#4a3a30'); reg('hero', 'shaft', 760, 0, 1160, 1080);
    label('HALDANE · 1926', 440, 120, t, W_('f4', 'haldane'), L('f5').start - 0.3, WHITE, 32);
    placeIcon('mouse', [[440, 520]], 2.4, t, W_('f4', 'mouse'), L('f5').start - 0.2, { hw: 90, hh: 50 }); label('WALKS AWAY', 440, 680, t, W_('f4', 'walks'), L('f5').start - 0.3, '#9be3a5', 34);
    placeIcon('person', [[1500, 500]], 2.2, t, W_('f4', 'man'), L('f5').start - 0.2, { hw: 50, hh: 80 }); label('BROKEN', 1500, 720, t, W_('f4', 'broken'), L('f5').start - 0.3, '#ff9fb4', 34); return; }
  sky(t, '#6fb5ff', '#d6ecff');   // ballooning spider
  const k = clamp((t - L('f5').start) / 8), x = 600 + k * 700, y = 820 - k * 560;
  ctx.save(); ctx.globalAlpha = 0.8; for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.save(); ctx.translate(x, y); ctx.rotate(-1.2 - i * 0.12 + Math.sin(t * 2 + i) * 0.05); rr2(-1, 0, 2, 260, 1, 'rgba(255,255,255,0.9)'); ctx.restore(); } ctx.restore();
  ctx.save(); ctx.translate(x, y); ctx.scale(2.2, 2.2); drawIcon('spider', t); ctx.restore(); reg('hero', 'spider', x - 120, y - 110, x + 120, y + 110);
  for (let i = 0; i < 4; i++) rr2(((t * 160 + i * 400) % 2200) - 200, 200 + i * 180, 160, 10, 5, 'rgba(255,255,255,0.5)');
  label('BALLOONING', 960, 980, t, W_('f5', 'ballooning'), L('f5').end + 0.3, WHITE, 40);
}
function sStrength(t) {
  worldBG(t, 'coral');
  if (t < L('g3').start - 0.1) { ant(t, 760, 640, 2.6, { carry: tt => { ctx.scale(1.6, 1.6); drawIcon('leaf', tt); } }); reg('hero', 'ant', 760 - 330, 380, 760 + 330, 790);
    tag('10–50× ITS WEIGHT', 760, 900, t, W_('g2', 'ten'), L('g3').start - 0.3, '#9b3352', 40);
    placeIcon('centrifuge', [[1560, 420]], 2.4, t, W_('g2', 'centrifuge') - 0.3, L('g3').start - 0.2, { hw: 80, hh: 80 }); label('NECK HOLDS 3,400–5,000×', 1560, 680, t, W_('g2', 'necks'), L('g3').start - 0.3, GOLD, 30); return; }
  if (t < L('g4').start - 0.1) { kidAt(t, 760, 900, 1.6, { armsUp: 1, look: [0, -1] }); const lift = Math.sin(t * 2) * 10; ctx.save(); ctx.translate(760, 330 + lift); ctx.scale(3, 3); drawIcon('boulder', t); ctx.restore(); reg('hero', 'crumb', 600, 200, 920, 460);
    label('A CRUMB HEAVIER THAN YOU', 760, 120, t, W_('g3', 'crumb'), L('g3b').start - 0.3, GOLD, 34);
    if (t > L('g3b').start - 0.1) { ant(t, 1500, 620, 1.4, { carry: tt => { ctx.scale(1.6, 1.6); drawIcon('leaf', tt); } }); reg('hero', 'leafcutter', 1500 - 180, 480, 1500 + 180, 700); label('LEAFCUTTERS FARM FUNGUS', 1500, 820, t, W_('g3b', 'fungus') - 0.3, L('g4').start - 0.3, WHITE, 28); } return; }
  rr2(1100, 0, 820, 1080, 0, '#b84a5e'); reg('panel', 'wall', 1100, 0, 1920, 1080);   // walking up a wall
  ctx.save(); ctx.translate(1100, 0); const wy = 900 - ((t - L('g4').start) * 60) % 700; ctx.translate(0, wy); ctx.rotate(-Math.PI / 2); ctx.translate(-1100, -wy); kidAt(t, 1100, wy, 2.0, { look: [1, 0] }); ctx.restore();
  for (let i = 0; i < 14; i++) circ(400 + (i * 97) % 600, 200 + (i * 61) % 700, 4, 'rgba(255,255,255,0.4)');
  label('STICKY FORCES BEAT GRAVITY', 560, 900, t, W_('g4', 'sticky'), L('g4').end + 0.3, GOLD, 34); label('LIKE DUST ON A WALL', 560, 980, t, W_('g4', 'dust'), L('g4').end + 0.3, WHITE, 28);
}
function sMove(t) {
  worldBG(t, 'teal');
  if (t < L('t2').start - 0.1) { pitch(t, 260, 260, 1400, 560); reg('hero', 'pitch', 260, 260, 1660, 820); const k = clamp((t - L('t1').start) / 6) * 0.06;
    kidAt(t, 300 + k * 1300, 560, 0.35, { look: [1, 0] }); placeIcon('clock', [[960, 160]], 1.5, t, W_('t1', 'football'), L('t2').start - 0.2, { h: (t * 2) % 12, m: (t * 30) % 60, hw: 54, hh: 54 });
    label('~1 DAY TO CROSS', 960, 910, t, W_('t1', 'day') - 0.3, L('t2').start - 0.3, GOLD, 40); return; }
  ant(t, 760, 560, 2.2, { speed: 40 }); reg('hero', 'silver ant', 760 - 280, 340, 760 + 280, 680); for (let i = 0; i < 5; i++) rr2(380 - i * 60 - (t * 600 % 60), 480 + i * 30, 120, 6, 3, 'rgba(255,255,255,0.5)');
  tag('SAHARAN SILVER ANT', 760, 780, t, W_('t2', 'saharan'), L('t3').end + 0.3, '#0b4f5c', 36); label('108 BODY LENGTHS / SECOND', 760, 870, t, W_('t2', 'hundred'), L('t3').end + 0.3, GOLD, 32);
  placeIcon('f1', [[1520, 420]], 2.2, t, W_('t3', 'formula') - 0.3, L('t3').end + 0.3, { hw: 110, hh: 50 }); label('LIKE 700 KM/H FOR YOU', 1520, 560, t, W_('t3', 'seven'), L('t3').end + 0.3, GOLD, 30);
  if (t > W_('t3', 'trails')) { const k = clamp((t - W_('t3', 'trails')) / 2); for (let i = 0; i < 26 * k; i++) circ(1180 + i * 26, 900 + Math.sin(i * 0.6) * 30, 7, '#ffd98a'); reg('hero', 'trail', 1170, 860, 1860, 940); label('CHEMICAL TRAILS', 1520, 990, t, W_('t3', 'trails'), L('t3').end + 0.3, WHITE, 28); }
}
function sGiant(t) {
  worldBG(t, 'gold');
  if (t < L('z3').start - 0.1) {
    if (t < W_('z2', 'cat') - 0.3) { placeIcon('boulder', [[600, 480]], 3.2, t, W_('z2', 'sand'), W_('z2', 'cat') - 0.5, { hw: 60, hh: 50 }); label('SAND = A BOULDER', 600, 720, t, W_('z2', 'sand'), W_('z2', 'cat') - 0.6, WHITE, 32);
      placeIcon('beachball', [[1320, 480]], 3.0, t, W_('z2', 'beach'), W_('z2', 'cat') - 0.5, { hw: 60, hh: 60 }); label('RAINDROP = A BEACH BALL', 1320, 720, t, W_('z2', 'beach'), W_('z2', 'cat') - 0.6, WHITE, 32); return; }
    eiffel(1500, 1060, 900); reg('hero', 'eiffel', 1300, 160, 1700, 1060); cat(t, 780, 1040, 2.4); reg('hero', 'cat', 780 - 230, 1040 - 800, 780 + 260, 1060);
    label('A CAT: ~250 M TALL', 1180, 120, t, W_('z2', 'cat'), L('z3').start - 0.3, WHITE, 36); return; }
  if (t < L('z4').start - 0.1) { placeIcon('jumpspider', [[600, 520]], 3.4, t, L('z3').start, L('z4').start - 0.2, { hw: 70, hh: 70 }); placeIcon('bus', [[1380, 520]], 2.4, t, W_('z3', 'bus'), L('z4').start - 0.2, { hw: 115, hh: 70 });
    label('JUMPING SPIDER = A BUS', 960, 860, t, W_('z3', 'bus'), L('z4').start - 0.3, WHITE, 40); return; }
  placeIcon('rope', [[960, 460]], 4.2, t, L('z4').start, L('z4').end + 0.3, { hw: 80, hh: 20 }); label('ONE STRAND OF SILK', 960, 640, t, W_('z4', 'strand'), L('z4').end + 0.3, WHITE, 40); label('WEIGHT FOR WEIGHT ≈ STEEL', 960, 740, t, W_('z4', 'steel'), L('z4').end + 0.3, WHITE, 32);
}
function sWater(t) {
  if (t < L('w4q').start - 0.1) { worldBG(t, 'teal');
    const stuck = t > W_('w3', 'fall') - 0.2, r = 330;
    droplet(t, 780, 560, r, { wob: stuck ? 1.6 : 1, inside: stuck ? (tt => { ctx.save(); ctx.rotate(Math.sin(tt * 3) * 0.2); ctx.translate(0, 120); ctx.scale(0.9, 0.9); KID = { x: 0, y: 0 }; drawKid(tt, { armsUp: 1, look: [Math.sin(tt * 4), -0.5], wobble: Math.sin(tt * 12) * 4 }); ctx.restore(); }) : null });
    reg('hero', 'droplet', 780 - r, 560 - r, 780 + r, 560 + r * 0.95);
    tag('SURFACE TENSION', 780, 960, t, W_('w2', 'surface'), L('w4q').start - 0.3, '#127b84', 36);
    if (t < L('w3b').start - 0.1) { placeIcon('cliff', [[1560, 460]], 2.6, t, W_('w3', 'cliff') - 0.4, L('w3b').start - 0.2, { hw: 72, hh: 90 }); label('A DRINK = A CLIFF EDGE', 1560, 720, t, W_('w3', 'cliff'), L('w3b').start - 0.3, GOLD, 30); }
    else { placeIcon('strider', [[1560, 460]], 2.6, t, L('w3b').start, L('w4q').start - 0.2, { hw: 82, hh: 40 }); label('WATER STRIDERS', 1560, 640, t, W_('w3b', 'striders'), L('w4q').start - 0.3, GOLD, 32); }
    return; }
  sky(t, '#5a6f94', '#9fb6d8'); for (let i = 0; i < 40; i++) rr2((i * 97 + t * 40) % W, ((i * 53) + t * 700) % H, 4, 30, 2, 'rgba(220,235,255,0.6)');
  const tR = L('w4').start, hit = W_('w5', 'hits') || L('w5').start;
  droplet(t, 760, 360 + clamp((t - tR) / 4) * 160, 200, { wob: 1.2 }); reg('hero', 'raindrop', 560, 140, 960, 720);
  placeIcon('mosquito', [[1460, 480]], 2.6, t, W_('w4', 'mosquitoes') - 0.2, L('w5').end + 0.3, { hw: 80, hh: 80 });
  label('A RAINDROP ≈ 60× YOUR WEIGHT', 760, 860, t, W_('w4', 'sixty'), L('w5').end + 0.3, WHITE, 34); label('MOSQUITOES RIDE IT, THEN SLIP OFF', 960, 970, t, W_('w5', 'rides'), L('w5').end + 0.3, GOLD, 32);
}
function sHungry(t) {
  worldBG(t, 'coral');
  if (t < L('h3').start - 0.1) { kidAt(t, 760, 920, 1.7, { lid: 0.3, look: [0, -0.4], wobble: Math.sin(t * 20) * 3 }); for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(560 + i * 130, 260); ctx.scale(1.6, 1.6); drawIcon('steam', t + i * 0.3); ctx.restore(); } reg('hero', 'heat', 480, 140, 1040, 360);
    tag('1,000× MORE SKIN FOR YOUR SIZE', 1440, 620, t, W_('h2', 'thousand'), L('h3').start - 0.3, '#9b3352', 34); placeIcon('thermo', [[1440, 300]], 2.2, t, W_('h2', 'heat'), L('h3').start - 0.2, { level: 0.2, hw: 36, hh: 90 }); return; }
  if (t < L('h5').start - 0.1) { shrew(t, 700, 760, 2.6); reg('hero', 'shrew', 700 - 450, 760 - 220, 700 + 400, 790);
    tag('ETRUSCAN SHREW', 700, 900, t, W_('h3', 'etruscan'), L('h5').start - 0.3, '#9b3352', 36);
    placeIcon('heart', [[1500, 330]], 2.4, t, W_('h3', 'heart'), L('h5').start - 0.2, { hw: 60, hh: 50 }); label('~1,500 BEATS / MIN', 1500, 480, t, W_('h3', 'fifteen'), L('h5').start - 0.3, GOLD, 32);
    placeIcon('plate', [[1500, 700]], 2.2, t, W_('h3', 'eats'), L('h5').start - 0.2, { hw: 84, hh: 40 }); label('EATS 1.5–2× ITS WEIGHT DAILY', 1500, 820, t, W_('h3', 'eats'), L('h5').start - 0.3, WHITE, 28); return; }
  placeIcon('rice', [[760, 520]], 5.0, t, L('h5').start, L('h5').end + 0.3, { hw: 66, hh: 40 }); kidAt(t, 1300, 900, 1.3, { look: [-1, -0.3], armsUp: 1 });
  label('ONE GRAIN = MONTHS OF FOOD', 760, 800, t, W_('h5', 'grain'), L('h5').end + 0.3, GOLD, 36); label('ROUGH ESTIMATE', 760, 880, t, W_('h5', 'rough'), L('h5').end + 0.3, WHITE, 26);
}
function sSenses(t) {
  worldBG(t, 'indigo');
  if (t < L('v3').start - 0.1) { const bl = clamp((t - W_('v2', 'blurry')) / 0.6) * 10;
    ctx.save(); ctx.filter = `blur(${bl}px)`; cat(t, 640, 1000, 1.5); ctx.filter = 'none'; ctx.restore(); reg('hero', 'blurry cat', 640 - 160, 1000 - 520, 640 + 180, 1010);
    label('PUPIL ≈ A FEW WAVELENGTHS OF LIGHT', 960, 120, t, W_('v2', 'pupils'), L('v3').start - 0.3, GOLD, 32);
    placeIcon('compound', [[1460, 520]], 3.4, t, W_('v2', 'compound') - 0.3, L('v3').start - 0.2, { hw: 72, hh: 60 }); label('COMPOUND EYE', 1460, 760, t, W_('v2', 'compound'), L('v3').start - 0.3, TEAL, 32); return; }
  if (t < L('v4q').start - 0.1) { placeIcon('fly', [[620, 500]], 3.6, t, W_('v3', 'flies') - 0.3, L('v4q').start - 0.2, { hw: 50, hh: 64 }); placeIcon('hand', [[1320, 460]], 2.6, t, W_('v3', 'swatting') - 0.3, L('v4q').start - 0.2, { hw: 80, hh: 80 });
    tag('SLOW MOTION', 960, 820, t, W_('v3', 'slow'), L('v4q').start - 0.3, '#5b4fd6', 44); label('FLIES: >4× FASTER FLICKER VISION', 960, 920, t, W_('v3', 'four'), L('v4q').start - 0.3, GOLD, 30); return; }
  kidAt(t, 560, 920, 1.5, { look: [1, -0.2] }); placeIcon('waves', [[1060, 460]], 2.4, t, W_('v4', 'ultrasound') - 0.3, L('v5').end + 0.3, { freq: 3, hw: 76, hh: 30 });
  placeIcon('bat', [[1560, 420]], 2.6, t, W_('v4', 'bats'), L('v5').end + 0.3, { hw: 100, hh: 50 }); label('YOUR VOICE → ULTRASOUND', 1200, 700, t, W_('v4', 'ultrasound'), L('v5').end + 0.3, GOLD, 32);
  label('NOBODY HEARS YOU', 1200, 790, t, W_('v5', 'nobody'), L('v5').end + 0.3, WHITE, 30);
}
function sBrain(t) {
  worldBG(t, 'cream');
  if (t < L('b3').start - 0.1) { placeIcon('brainmini', [[700, 480]], 3.2, t, W_('b2', 'brain'), L('b3').start - 0.2, { hw: 66, hh: 60 });
    tag('86 BILLION NEURONS', 700, 760, t, W_('b2', 'eighty'), L('b3').start - 0.3, '#c95a7c', 36);
    for (let i = 0; i < 40; i++) { const k = clamp((t - W_('b2', 'shrink')) / 1.5); circ(1400 + Math.cos(i * 2.4) * 160 * (1 - k * 0.7), 480 + Math.sin(i * 2.4) * 160 * (1 - k * 0.7), 10 * (i < 40 * (1 - k * 0.9) ? 1 : 0), '#f29db0'); }
    reg('hero', 'neurons', 1220, 300, 1580, 660); label('ROOM FOR A FEW THOUSAND', 1400, 760, t, W_('b2', 'few'), L('b3').start - 0.3, GOLD, 30); label('ROUGH ESTIMATE', 1400, 830, t, W_('b2', 'rough'), L('b3').start - 0.3, WHITE, 24); return; }
  if (t < L('b4').start - 0.1) { placeIcon('pie', [[620, 460]], 2.8, t, W_('b3', 'ants'), L('b4').start - 0.2, { v: 0.15, col: '#ff8f4a', hw: 62, hh: 62 }); placeIcon('pie', [[1300, 460]], 2.8, t, W_('b3', 'yours'), L('b4').start - 0.2, { v: 0.02, col: '#8fd8e6', hw: 62, hh: 62 });
    label('SMALL ANT: ~15% BRAIN', 620, 720, t, W_('b3', 'fifteen'), L('b4').start - 0.3, GOLD, 32); label('YOU: ~2% BRAIN', 1300, 720, t, W_('b3', 'two'), L('b4').start - 0.3, TEAL, 32); return; }
  if (t < L('b5').start - 0.1) { kidAt(t, 960, 980, 1.0, { head: lerp(1, 2.6, eoq((t - L('b4').start) / 1.4)), look: [0, 0] }); label('TO STAY YOU', 960, 120, t, L('b4').start, L('b5').start - 0.3, GOLD, 36); return; }
  for (let i = 0; i < 60; i++) { const a = i * 2.4 + t * 0.4 * (i % 2 ? 1 : -1), r = 80 + (i % 7) * 40; ctx.save(); ctx.translate(960 + Math.cos(a) * r * 1.6, 520 + Math.sin(a) * r); ctx.rotate(a + Math.PI / 2); ctx.scale(0.18, 0.18); ant(t + i, 0, 0, 1, { speed: 12 }); ctx.restore(); }
  reg('hero', 'colony', 560, 180, 1360, 860); tag('SIMPLE RULES · SMART COLONY', 960, 960, t, W_('b5', 'colony') - 0.4, L('b5').end + 0.3, '#c95a7c', 36);
}
function sInsects(t) {
  worldBG(t, 'teal');
  if (t < L('i3').start - 0.1) { placeIcon('tubes', [[700, 500]], 3.2, t, W_('i2', 'tubes') - 0.4, L('i3').start - 0.2, { hw: 50, hh: 76 }); placeIcon('o2', [[1300, 500]], 2.6, t, W_('i2', 'air') - 0.2, L('i3').start - 0.2, { hw: 52, hh: 34 });
    tag('NO LUNGS · AIR TUBES', 960, 860, t, W_('i2', 'lungs'), L('i3').start - 0.3, '#0b4f5c', 40); return; }
  griffinfly(t, 860, 460, 2.2); reg('hero', 'griffinfly', 860 - 560, 460 - 160, 860 + 560, 460 + 600);
  label('~300 MILLION YEARS AGO', 1560, 140, t, W_('i3', 'three'), L('i3').end + 0.3, WHITE, 30); label('WINGS ~70 CM WIDE', 1560, 220, t, W_('i3', 'seventy'), L('i3').end + 0.3, GOLD, 34);
  label('MORE OXYGEN? STILL DEBATED', 480, 140, t, W_('i3', 'oxygen'), L('i3').end + 0.3, TEAL, 28);
}
function sAntWorld(t) {
  if (t < L('a4').start - 0.1) { worldBG(t, 'coral');
    if (t < L('a3').start - 0.1) { tag('~20 QUADRILLION ANTS', 960, 160, t, W_('a2', 'twenty'), L('a3').start - 0.3, '#9b3352', 48);
      placeIcon('balance', [[960, 560]], 2.8, t, W_('a2', 'outweigh') - 0.4, L('a3').start - 0.2, { tip: 0.3, hw: 120, hh: 90 }); label('ANTS  vs  WILD BIRDS + MAMMALS', 960, 900, t, W_('a2', 'outweigh'), L('a3').start - 0.3, WHITE, 32); return; }
    placeIcon('person', [[520, 520]], 3.0, t, L('a3').start, L('a4').start - 0.2, { hw: 50, hh: 80 });
    for (let i = 0; i < 70; i++) { const a = i * 2.39996, r = 30 + Math.sqrt(i) * 34; ctx.save(); ctx.translate(1300 + Math.cos(a + t * 0.2) * r, 520 + Math.sin(a + t * 0.2) * r * 0.8); ctx.rotate(a); ctx.scale(0.16, 0.16); ant(t + i, 0, 0, 1, { speed: 14 }); ctx.restore(); }
    reg('hero', 'swarm', 940, 200, 1660, 840); tag('2.5 MILLION ANTS PER PERSON', 960, 920, t, W_('a3', 'million') - 0.3, L('a4').start - 0.3, '#9b3352', 40); return; }
  if (t < L('a5').start - 0.1) { worldBG(t, 'night'); if (!EUROPE) return; coastMap(EUROPE, 160, 160, 1600, 680, t, { route: [[12.5, 44.2], [8.9, 44.4], [7.3, 43.7], [5.4, 43.3], [3.2, 42.1], [0.4, 40.5], [-0.4, 39.4], [-0.9, 37.6], [-5.6, 36.0], [-6.3, 36.8], [-8.9, 37.0], [-8.8, 41.1]], t0: W_('a4', 'stretches') - 0.6 });
    reg('hero', 'map', 160, 160, 1760, 840); tag('ONE SUPERCOLONY · 6,000+ KM', 960, 940, t, W_('a4', 'six'), L('a5').start - 0.3, '#e2457a', 40); return; }
  worldBG(t, 'gold'); antlionPit(t, 860, 600, 520); reg('hero', 'pit', 860 - 520, 600 - 230, 860 + 520, 600 + 230);
  const k = clamp((t - W_('a5', 'slides')) / 2.5); ctx.save(); ctx.translate(lerp(1300, 900, k), lerp(420, 590, k)); ctx.rotate(0.4); ctx.scale(0.45, 0.45); ant(t, 0, 0, 1, { speed: 14 }); ctx.restore();
  tag('ANTLION PIT', 860, 960, t, W_('a5', 'antlion'), L('a5').end + 0.3, '#c7621f', 40);
}
function sOutro(t) {
  const C = CUE; worldBG(t, 'night');
  if (t < L('o3').start - 0.1) { kidAt(t, 960, 980, 1.0, { look: [0, -0.3] });
    const items = [['cube', 'FLOAT DOWN', W_('o2', 'float')], ['leaf', 'LIFT 100×', W_('o2', 'lift')], ['fly', 'SLOW MOTION', W_('o2', 'slow')], ['drop', 'FEAR RAINDROPS', W_('o2', 'fear')], ['plate', 'EAT ALL DAY', W_('o2', 'eat')], ['brainmini', 'GIANT HEAD', W_('o2', 'head')]];
    items.forEach(([ic, lab, t0], i) => { const x = 330 + (i % 3) * 630, y = 190 + Math.floor(i / 3) * 280; placeIcon(ic, [[x, y]], 1.8, t, t0, L('o3').start - 0.2, { hw: 66, hh: 60 }); label(lab, x, y + 140, t, t0 + 0.1, L('o3').start - 0.3, i < 3 ? GOLD : TEAL, 26); }); return; }
  drawMoon(t, spring(t - L('o3').start, 0.5, 9), 1); reg('hero', 'moon', 0, 240, 360, 840);
  kidAt(t, 760, 860, 1.0, { look: [-1, -0.5] });
  if (t > L('o3').start + 0.3) { reg('label', 'title', 1010, 330, 1830, 640); LABELQ.push(() => { riseText('WHAT IF YOU WERE', 1420, 420, L('o3').start + 0.3, t, { size: 76, weight: 700, color: WHITE, ls: 5, pill: false, dur: 0.8 });
    riseText('ANT-SIZED?', 1420, 560, L('o3').start + 0.5, t, { size: 120, weight: 700, color: GOLD, ls: 6, pill: false, dur: 0.8 }); }); sfx('title', L('o3').start + 0.3); }
  if (t > L('o4').start - 0.2) placeIcon('subscribe', [[1420, 720]], 1.2, t, W_('o4', 'subscribe'), 999, { hw: 124, hh: 38 });
  if (t > C.end) for (const [x, y] of [[1220, 900], [1620, 900]]) { const k = spring(t - C.end - 0.2, 0.5, 12); rr2(x - 170 * k, y - 96 * k, 340 * k, 192 * k, 18, 'rgba(6,20,40,0.55)'); reg('hero', 'endslot', x - 170, y - 96, x + 170, y + 96); }
}

const CHAPTERS = [['s1', 'The square-cube law', 'indigo', 'cube'], ['f1', 'Falling', 'night', 'drop'], ['g1', 'Super strength', 'coral', 'leaf'], ['t1q', 'Getting around', 'teal', 'f1'], ['z1', 'A giant world', 'gold', 'jumpspider'],
  ['w1', 'Water is a trap', 'teal', 'drop'], ['h1', 'Always hungry', 'coral', 'plate'], ['v1', 'Your senses', 'indigo', 'eye'], ['b1', 'Would you still be you?', 'cream', 'brainmini'], ['i1', 'Why insects stay small', 'teal', 'tubes'], ['a1', 'The ant world', 'coral', 'balance']];
function SECTIONS() {
  const out = [], add = (t0, draw, tr, at) => out.push({ t0, draw, tr, at });
  add(0, sOpen);
  const ids = Object.keys(LINES), prevEnd = id => LINES[ids[ids.indexOf(id) - 1]].end + 0.15;
  const scene = { s1: [sSquare, 's2'], f1: [sFall, 'f2'], g1: [sStrength, 'g2'], t1q: [sMove, 't1'], z1: [sGiant, 'z2'], w1: [sWater, 'w2'], h1: [sHungry, 'h2'], v1: [sSenses, 'v2'], b1: [sBrain, 'b2'], i1: [sInsects, 'i2'], a1: [sAntWorld, 'a2'] };
  CHAPTERS.forEach(([id, title, world, ic], i) => { const t0 = prevEnd(id); add(t0, tt => chapterCard(tt, title, i + 1, world, ic, t0), 'flood', [960, 540]); const [fn, first] = scene[id]; add(Math.min(LINES[id].start + 1.2, LINES[first].start), fn, 'flood', [960, 540]); });
  add(L('o1').start - 0.1, sOutro, 'flood', [960, 540]);
  out.sort((a, b) => a.t0 - b.t0); out.forEach((s, i) => s.t1 = i + 1 < out.length ? out[i + 1].t0 : 1e9); return out;
}
fetch('europe.json').then(r => r.json()).then(j => { EUROPE = j; });
