// Shared explainer engine (code-drawn, 1920x1080). A topic file defines buildCues(), CHAPTERS, SECTIONS() and scene functions.

// "What if you never slept?" - every frame is a pure function of t: window.seek(t)
const W = 1920, H = 1080, cv = document.getElementById('c'), ctx = cv.getContext('2d');
let WORDS = null, DUR = 58.5;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const eic = k => (k = clamp(k), k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const eoq = k => 1 - Math.pow(1 - clamp(k), 5);           // ease-out-quint
const eoc = k => 1 - Math.pow(1 - clamp(k), 3);
// damped spring 0 -> 1 (damping .45, frequency 14)
const spring = (dt, z = .45, f = 14) => { if (dt <= 0) return 0; const w = f, wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * dt) * (Math.cos(wd * dt) + z * w / wd * Math.sin(wd * dt)); };
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ---------- cue times (filled from words.json: first word match at/after a time) ----------
const CUE = {};
function cue(name, word, after = 0, offset = 0) {
  const w = WORDS.find(x => x.s >= after - 0.05 && x.w.toLowerCase().replace(/[^a-z0-9']/g, '').startsWith(word));
  CUE[name] = (w ? w.s : after) + offset; return CUE[name];
}
function buildCues() {
  cue('slept', 'slept'); cue('sleep', 'sleep', 2); cue('lying', 'lying', 4); cue('delete', 'delete', 6);
  cue('you', 'you', 8); cue('zero', 'zero', 8.5); cue('h17', '17', 10); cue('drinks', 'drinks', 12);
  cue('h24', '24', 14.5); cue('drunk', 'drunk', 16); cue('meanwhile', 'meanwhile', 18); cue('head', 'head', 19);
  cue('trash', 'trash', 19.5); cue('during', 'during', 21); cue('washes', 'washes', 24); cue('alz', 'alzheimer', 26);
  cue('nosleep', 'no', 27.5); cue('wash', 'wash', 28.5); cue('day2', 'day', 29.5); cue('micro', 'micro', 32.5); cue('eyes', 'eyes', 35.5);
  cue('day3', 'day', 37); cue('breathe', 'breathe', 38); cue('record', 'record', 39.8); cue('y1964', '1964', 40.5);
  cue('randy', 'randy', 42.5); cue('eleven', '11', 44); cue('rats', 'rats', 45.8); cue('weeks', 'weeks', 47.8);
  cue('randy2', 'randy', 49.5); cue('hours15', 'hours', 50.9); cue('woke', 'woke', 52.5); cue('fine', 'fine', 53);
  cue('tonight', 'tonight', 54.3); cue('calls', 'calls', 55.3); cue('pick', 'pick', 56);
}

// ---------- static random data ----------
const R = rng(7);
const STARS = [.12, .35, .6].map((depth, li) => Array.from({ length: [260, 160, 90][li] }, () => ({
  x: R() * 4200 - 1100, y: R() * 2600 - 760, r: [0.9, 1.4, 2.1][li] * (0.6 + R() * 0.8), ph: R() * 6.28, sp: 0.6 + R() * 1.8, spark: li === 2 && R() < 0.4, depth })));
const BLOBS = [[24,150,160,.20, 300, 260, 900], [40,95,195,.16, 1400, 180, 1000], [220,95,110,.10, 1500, 900, 800], [60,70,175,.15, 500, 950, 950], [24,150,160,.14, 1000, 560, 700]]
  .map(([r,g,b,a,x,y,s], i) => ({ r, g, b, a, x, y, s, ph: i * 1.7, depth: .08 + i * .03 }));
const GRAN = Array.from({ length: 28 }, () => ({ a: R() * 6.28, d: R() * 0.85, s: 8 + R() * 22, sp: (R() - .5) * 0.06, ph: R() * 6.28 }));
const WASTE = Array.from({ length: 160 }, () => ({ a: R() * 6.28, d: Math.sqrt(R()) * 0.95, t0: R(), s: 3 + R() * 6, ph: R() * 6.28 }));
const STREAK = Array.from({ length: 46 }, () => ({ y: R() * 2 - 1, sp: 0.5 + R(), len: 0.15 + R() * 0.35, ph: R() }));
const SHARDS = Array.from({ length: 40 }, () => ({ x: R(), y: R(), vx: (R() - .5) * 700, vy: -200 - R() * 500, rot: (R() - .5) * 8, s: 6 + R() * 16 }));

// ---------- text: caps pill, every line rises 1.3x its height through a clip (ease-out-quint) ----------
function font(px, w = 600) { ctx.font = `${w} ${px}px Fredoka`; }
function riseText(txt, x, y, t0, t, o = {}) {
  const px = o.size || 40, ls = o.ls ?? 4; if (t < t0) return 0;
  font(px, o.weight || 600); ctx.letterSpacing = ls + 'px';
  const w = ctx.measureText(txt).width, h = px * 1.15;
  const k = eoq((t - t0) / (o.dur || 0.7)), out = o.out != null ? clamp((o.out - t) / 0.35) : 1;
  const ax = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
  if (o.pill !== false) {
    const pw = w + px * 1.1, ph = h + px * 0.55;
    ctx.save(); ctx.globalAlpha = out * eoc((t - t0) / 0.4); ctx.fillStyle = 'rgba(6,20,40,0.62)';
    ctx.beginPath(); ctx.roundRect(ax - px * 0.55, y - ph / 2, pw, ph, ph / 2); ctx.fill(); ctx.restore();
  }
  ctx.save(); ctx.beginPath(); ctx.rect(ax - 20, y - h / 2 - 4, w + 40, h + 8); ctx.clip();
  ctx.globalAlpha = out; ctx.fillStyle = o.color || '#ffffff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillText(txt, ax, y + 2 + (1 - k) * h * 1.3); ctx.restore(); ctx.letterSpacing = '0px';
  return w;
}
const TEAL = '#8fd8e6', GOLD = '#ffd98a', WHITE = '#ffffff';


// ---------- background ----------
function drawBackground(t, cam, warp, dark) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#081d2c'); g.addColorStop(1, '#102348');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const b of BLOBS) {
    const px = W / 2 + (b.x - cam.x) * (b.depth + (1 - b.depth) * 0.15) * cam.z ** 0.3;
    const py = H / 2 + (b.y - cam.y) * (b.depth + 0.1) * cam.z ** 0.3;
    const s = b.s * (1 + 0.05 * Math.sin(t * 0.3 + b.ph) + warp * 0.35 * Math.sin(t * 2.2 + b.ph));
    const hue = warp * 60 * Math.sin(t * 1.3 + b.ph);
    const rg = ctx.createRadialGradient(px, py, 0, px, py, s);
    const c = `rgba(${b.r},${b.g},${b.b},`;
    rg.addColorStop(0, c + b.a + ')'); rg.addColorStop(1, c + '0)');
    ctx.filter = hue ? `hue-rotate(${hue}deg)` : 'none';
    ctx.fillStyle = rg; ctx.fillRect(px - s, py - s, s * 2, s * 2);
  }
  ctx.filter = 'none';
  for (const layer of STARS) for (const s of layer) {
    const px = W / 2 + (s.x - cam.x) * s.depth * cam.z + (warp ? Math.sin(s.y * 0.01 + t * 3) * warp * 18 : 0);
    const py = H / 2 + (s.y - cam.y) * s.depth * cam.z;
    if (px < -10 || px > W + 10 || py < -10 || py > H + 10) continue;
    const tw = 0.55 + 0.45 * Math.sin(t * s.sp + s.ph);
    ctx.globalAlpha = tw * (1 - dark * 0.7);
    ctx.fillStyle = '#e8f3ff';
    if (s.spark) { const r = s.r * 3.2 * tw; ctx.beginPath(); ctx.moveTo(px, py - r); ctx.quadraticCurveTo(px, py, px + r, py); ctx.quadraticCurveTo(px, py, px, py + r); ctx.quadraticCurveTo(px, py, px - r, py); ctx.quadraticCurveTo(px, py, px, py - r); ctx.fill(); }
    else { ctx.beginPath(); ctx.arc(px, py, s.r, 0, 6.283); ctx.fill(); }
  }
  ctx.restore(); ctx.globalAlpha = 1;
}


// ---------- the Moon (the thing that vanishes) ----------
function drawMoon(t, scale, alpha) {
  if (scale <= 0.001 || alpha <= 0) return;
  const r = MOON.r * scale, x = MOON.x, y = MOON.y;
  ctx.save(); ctx.globalAlpha = alpha; ctx.globalCompositeOperation = 'lighter';
  for (const [m, a] of [[1.23, .16], [1.48, .1], [1.76, .06], [2.1, .035]]) {
    const hg = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * m);
    hg.addColorStop(0, `rgba(170,200,255,${a})`); hg.addColorStop(1, 'rgba(170,200,255,0)');
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(x, y, r * m, 0, 6.283); ctx.fill();
  }
  for (let i = 0; i < 18; i++) {   // faint rotating ray wedges
    const a = i / 18 * 6.283 + t * 0.03; ctx.fillStyle = 'rgba(190,215,255,0.025)';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 2.6, a, a + 0.07); ctx.closePath(); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  const mg = ctx.createRadialGradient(x + r * 0.25, y - r * 0.3, r * 0.1, x, y, r);
  mg.addColorStop(0, '#fbfcff'); mg.addColorStop(0.55, '#d6def2'); mg.addColorStop(1, '#93a6d6');
  ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip();
  for (const g of GRAN) {   // drifting soft craters with a faint glow
    const a = g.a + t * g.sp, d = g.d * r, gx = x + Math.cos(a) * d, gy = y + Math.sin(a) * d, s = g.s * scale * (1 + 0.15 * Math.sin(t + g.ph));
    const cg = ctx.createRadialGradient(gx - s * .2, gy - s * .2, 0, gx, gy, s);
    cg.addColorStop(0, 'rgba(120,140,190,0.32)'); cg.addColorStop(0.7, 'rgba(150,170,215,0.18)'); cg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(gx, gy, s, 0, 6.283); ctx.fill();
  }
  ctx.restore(); ctx.restore();
}


// ---------- mascot: a little sleepyhead in pyjamas (rounded rects, no outlines) ----------
function drawKid(t, o) {
  const { x, y } = KID, sc = o.scale || 1;
  const bob = Math.sin(t * 2.4) * 4 * (o.asleep ? 0.3 : 1);
  const sq = o.squash || 0;          // + = squash, - = stretch
  ctx.save(); ctx.translate(x + (o.wobble || 0), y); if (o.lie) { ctx.translate(-150 * o.lie, -98 * o.lie); ctx.rotate(o.lie * Math.PI / 2); } ctx.rotate(o.tilt || 0); ctx.scale(sc * (1 + sq * 0.18), sc * (1 - sq * 0.18));
  ctx.translate(0, bob);
  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(0, 4, 62, 12, 0, 0, 6.283); ctx.fill();
  // legs + slippers
  ctx.fillStyle = '#dfe7f2'; ctx.beginPath(); ctx.roundRect(-36, -52, 28, 48, 12); ctx.roundRect(8, -52, 28, 48, 12); ctx.fill();
  ctx.fillStyle = '#ff8f4a'; ctx.beginPath(); ctx.roundRect(-44, -12, 40, 16, 8); ctx.roundRect(4, -12, 40, 16, 8); ctx.fill();
  // body (pyjamas with soft stripes)
  ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.roundRect(-52, -128, 104, 86, 34); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.roundRect(-52, -128, 104, 86, 34); ctx.clip(); ctx.fillStyle = 'rgba(143,216,230,0.35)';
  for (let i = -50; i < 60; i += 22) ctx.fillRect(i, -130, 8, 90); ctx.restore();
  // arms
  const arm = o.armsUp ? -0.9 : 0.15 + Math.sin(t * 2.4) * 0.05;
  for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * 50, -110); ctx.rotate(s * arm); ctx.fillStyle = '#e8eef6'; ctx.beginPath(); ctx.roundRect(-11, 0, 22, 54, 11); ctx.fill(); ctx.restore(); }
  if (o.head && o.head !== 1) { ctx.save(); ctx.translate(0, -124); ctx.scale(o.head, o.head); ctx.translate(0, 124); }
  // head
  ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.roundRect(-58, -222, 116, 98, 44); ctx.fill();
  // face visor
  const vg = ctx.createLinearGradient(0, -205, 0, -140); vg.addColorStop(0, '#1f5a73'); vg.addColorStop(1, '#0a1c2c');
  ctx.fillStyle = vg; ctx.beginPath(); ctx.roundRect(-44, -206, 88, 66, 26); ctx.fill();
  // glowing eyes that look at whatever matters; eyelids droop with tiredness
  const lx = (o.look ? o.look[0] : 0) * 8, ly = (o.look ? o.look[1] : 0) * 5;
  const lid = clamp(o.lid || 0), blink = o.blink || 0;
  for (const s of [-1, 1]) {
    const ex = s * 18 + lx, ey = -173 + ly;
    ctx.save(); ctx.shadowColor = '#7ff3ff'; ctx.shadowBlur = 16; ctx.fillStyle = '#9ff6ff';
    const eh = 16 * (1 - Math.max(lid, blink)) + 2;
    if (o.mask) { ctx.restore(); continue; }
    ctx.beginPath(); ctx.roundRect(ex - 7, ey - eh / 2, 14, eh, 7); ctx.fill(); ctx.restore();
  }
  if (o.mask) {   // sleep mask
    ctx.fillStyle = '#ff8f4a'; ctx.beginPath(); ctx.roundRect(-50, -190, 100, 34, 17); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.roundRect(-30, -178, 18, 6, 3); ctx.roundRect(12, -178, 18, 6, 3); ctx.fill();
  }
  // nightcap with blinking pompom light
  ctx.fillStyle = '#4b6fd6'; ctx.beginPath(); ctx.moveTo(-54, -206); ctx.quadraticCurveTo(-10, -280, 52, -250); ctx.quadraticCurveTo(30, -228, 46, -208); ctx.closePath(); ctx.fill();
  const on = 0.5 + 0.5 * Math.sin(t * 3.1);
  ctx.save(); ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 18 * on; ctx.fillStyle = `rgba(255,217,138,${0.55 + 0.45 * on})`;
  ctx.beginPath(); ctx.arc(56, -252, 11, 0, 6.283); ctx.fill(); ctx.restore();
  if (o.head && o.head !== 1) ctx.restore();
  ctx.restore();
}
function drawPillow(t, t0, onKid) {   // drops onto the mascot's head, then lies under it
  if (t < t0) return;
  const k = spring(t - t0, 0.42, 13), y0 = KID.y - 520, y1 = KID.y - 92;
  const off = t > CUE.fine ? eoc((t - CUE.fine) / 0.7) : 0; if (off >= 1) return;
  ctx.save(); ctx.globalAlpha = 1 - off; ctx.translate(KID.x + 60 + off * 420, lerp(y0, y1, k) - off * 380); ctx.rotate(0.12 * (1 - k) - 0.08 + off * 2.5);
  ctx.fillStyle = '#f7f1ff'; ctx.beginPath(); ctx.roundRect(-90, -30, 180, 60, 28); ctx.fill();
  ctx.fillStyle = 'rgba(143,216,230,0.45)'; ctx.beginPath(); ctx.roundRect(-70, -6, 140, 10, 5); ctx.fill();
  ctx.restore();
}
function drawZ(t, t0, t1) {
  if (t < t0 || t > t1 + 0.6) return;
  for (let i = 0; i < 5; i++) {
    const p = ((t - t0) * 0.55 + i / 5) % 1, a = Math.sin(p * Math.PI) * clamp((t1 + 0.6 - t) / 0.6);
    ctx.save(); ctx.globalAlpha = a; font(30 + p * 34, 700); ctx.fillStyle = GOLD;
    ctx.fillText('Z', KID.x + 40 + p * 90 + Math.sin(p * 9) * 10, KID.y - 170 - p * 170); ctx.restore();
  }
}


// ---------- YOU pin ----------
function drawPin(t, t0, morph) {
  if (t < t0) return;
  const k = spring(t - t0, 0.45, 14), x = KID.x, y = lerp(KID.y - 700, KID.y - 300, k);
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + (1 - k) * 0.2, 1 - (1 - k) * 0.2);
  ctx.fillStyle = '#ff8f4a'; ctx.beginPath(); ctx.arc(0, -40, 34, Math.PI * 0.85, Math.PI * 2.15); ctx.lineTo(0, 10); ctx.closePath(); ctx.fill();
  ctx.restore();
  riseText('YOU', x, y - 104, t0 + 0.15, t, { size: 30, color: WHITE, ls: 5 });
}


// ---------- brain (WebGL sphere with folds, firing synapses, waste and wash) ----------
const gcv = document.getElementById('gl'), gl = gcv.getContext('webgl', { premultipliedAlpha: true, preserveDrawingBuffer: true, antialias: false });
const VS = 'attribute vec2 p;varying vec2 uv;void main(){uv=p;gl_Position=vec4(p,0.,1.);}';
const FS = `precision highp float;varying vec2 uv;uniform float t,spin,tired,glow,dim;uniform vec3 L;
float h(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float n(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z);}
float folds(vec3 p){float a=0.,w=.55;for(int i=0;i<4;i++){a+=w*(1.-abs(n(p)*2.-1.));p*=2.03;w*=.5;}return a;}
vec4 shade(vec2 c){
 // side view of a brain, front to the left: cerebrum, cerebellum, brainstem
 vec2 e=(c-vec2(0.,.10))/vec2(.98,.70); if(e.y<0.) e.y*=1.32;
 float ang=atan(e.y,e.x); float de=length(e)-(1.+.03*sin(ang*11.)+.018*sin(ang*23.+1.));
 vec2 cb=(c-vec2(.50,-.50))/vec2(.36,.22); float dcb=length(cb)-1.;
 vec2 st=c-vec2(.24,-.68); float dst=max(abs(st.x+st.y*.35)-.075,abs(st.y)-.22);
 vec3 N; vec3 base; float edge;
 if(de<0.){
  float hh=sqrt(max(0.,1.-dot(e,e))); N=normalize(vec3(e*.95,hh+.12)); vec3 P=vec3(e*1.1,hh);
  vec3 w=P*2.2+vec3(n(P*3.1),n(P*3.1+7.),n(P*3.1+13.))*1.1; float v1=n(w*3.6), v2=n(w*7.2+3.);
  float sul=(1.-smoothstep(.015,.07,abs(v1-.5)))*.85+(1.-smoothstep(.01,.05,abs(v2-.5)))*.45;
  float sx=c.x+.62; float sy=-.30+.42*sx-.14*sx*sx; float syl=(sx>0.&&sx<.95)?(1.-smoothstep(.006,.022,abs(c.y-sy+.015*sin(sx*30.))))*smoothstep(0.,.2,sx)*smoothstep(.95,.7,sx):0.;   // lateral fissure
  base=mix(vec3(1.,.72,.78),vec3(.62,.24,.38),clamp(sul+syl*1.2,0.,1.))*(.85+folds(P*4.)*.25);
  edge=smoothstep(0.,.05,-de);
 } else if(dcb<0.){
  float hh=sqrt(max(0.,1.-dot(cb,cb))); N=normalize(vec3(cb*.7,hh+.3));
  float str=1.-smoothstep(.0,.35,abs(sin(cb.y*14.+sin(cb.x*5.)*1.2)));
  base=mix(vec3(.96,.62,.70),vec3(.58,.22,.36),str*.8); edge=smoothstep(0.,.08,-dcb)*.8+.2;
 } else if(dst<0.){
  N=normalize(vec3((st.x+st.y*.35)*6.,0.,1.)); base=vec3(.90,.58,.64); edge=1.;
 } else return vec4(0.);
 float d=dot(N,normalize(L)); float lit=smoothstep(-.12,.24,d);
 vec3 night=vec3(.10,.12,.28);
 vec3 col=mix(night*base*1.6,base*(.35+.75*max(d,0.)),lit);
 col+=vec3(1.,.55,.4)*.22*exp(-pow(d*6.,2.));
 vec3 g=floor(vec3(c,0.)*26.); float hs=h(g); float spark=0.; if(hs>1.-glow*.09){vec2 f2=fract(c*26.)-.5; spark=smoothstep(.13,.0,length(f2))*(.5+.5*sin(t*7.+hs*40.));}
 col+=vec3(1.,.82,.45)*spark*1.4*(de<0.?1.:0.);
 col+=vec3(.45,.9,1.)*pow(1.-N.z,3.)*.5;
 col*=mix(.55,1.,edge);
 col*=1.-dim*.55; col=mix(col,vec3(dot(col,vec3(.33))),tired*.35);
 return vec4(col,1.);}
void main(){vec4 a=vec4(0.);float s=1./700.;
 a+=shade(uv*1.12+vec2(-s,-s));a+=shade(uv*1.12+vec2(s,-s));a+=shade(uv*1.12+vec2(-s,s));a+=shade(uv*1.12+vec2(s,s));
 gl_FragColor=a*.25;}`;
function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s); return s; }
const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog); gl.useProgram(prog);
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
const pl = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(pl); gl.vertexAttribPointer(pl, 2, gl.FLOAT, false, 0, 0);
const U = n => gl.getUniformLocation(prog, n);
function renderBrain(t, tired, glow, dim) {
  gl.viewport(0, 0, gcv.width, gcv.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(U('t'), t); gl.uniform1f(U('spin'), t * 0.55 * Math.PI / 180 * 6); gl.uniform1f(U('tired'), tired); gl.uniform1f(U('glow'), glow); gl.uniform1f(U('dim'), dim);
  const lx = MOON.x - BRAIN.x, ly = -(MOON.y - BRAIN.y); gl.uniform3f(U('L'), lx / 1000, ly / 1000 + 0.25, 0.7);   // light from the Moon, recomputed every frame
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

// ---------- rat ----------
function drawRat(t) {
  const C = CUE; if (t < C.rats - 0.2) return;
  const out = clamp((C.randy2 + 0.3 - t) / 0.5); if (out <= 0) return;
  const k = eoq((t - C.rats + 0.2) / 1.0), x = lerp(1600, 1150, k), y = 800, step = Math.sin(t * 14) * 3 * (1 - k);
  ctx.save(); ctx.globalAlpha = out; ctx.translate(x, y + step);
  ctx.fillStyle = '#9aa6c4'; ctx.beginPath(); ctx.ellipse(0, -28, 58, 30, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-56, -36, 26, 20, -0.3, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#c7cfe4'; ctx.beginPath(); ctx.arc(-50, -58, 11, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#9ff6ff'; ctx.beginPath(); ctx.arc(-68, -40, 4, 0, 6.283); ctx.fill();
  ctx.strokeStyle = '#9aa6c4'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(56, -24); ctx.quadraticCurveTo(110, -10, 120, -50); ctx.stroke();
  ctx.restore();
}


// ---------- HUD counter: HOURS AWAKE ----------
function hoursAt(t) {
  const C = CUE, K = [[C.zero, 0], [C.h17, 17], [C.h24, 24], [C.day2, 24], [C.day2 + 0.6, 48], [C.day3, 48], [C.day3 + 0.6, 72], [C.eleven - 0.2, 72], [C.eleven + 0.5, 264], [C.woke, 264], [C.woke + 0.8, 0]];
  if (t < K[0][0]) return 0;
  for (let i = 0; i < K.length - 1; i++) if (t < K[i + 1][0]) { const k = (t - K[i][0]) / (K[i + 1][0] - K[i][0]); return lerp(K[i][1], K[i + 1][1], i === K.length - 2 ? eic(k) : k); }
  return K[K.length - 1][1];
}
function drawCounter(t) {
  const C = CUE; if (t < C.zero) return;
  const out = clamp((C.tonight + 0.6 - t) / 0.5); if (out <= 0) return;
  const k = spring(t - C.zero, 0.45, 14), s = lerp(1.7, 1, k);
  const v = Math.floor(hoursAt(t) + 1e-6), gold = t > C.eleven - 0.2 && t < C.woke;
  const x = 1600, y = 120;
  ctx.save(); ctx.globalAlpha = out * clamp((t - C.zero) / 0.15); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(6,20,40,0.62)'; ctx.beginPath(); ctx.roundRect(-210, -62, 420, 124, 40); ctx.fill();
  font(26, 600); ctx.letterSpacing = '5px'; ctx.fillStyle = TEAL; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('HOURS AWAKE', 0, -30);
  font(64, 700); ctx.letterSpacing = '3px'; ctx.fillStyle = gold ? GOLD : WHITE; ctx.fillText(String(v), 0, 20);
  ctx.restore(); ctx.letterSpacing = '0px';
}


// ---------- microsleep blinks, hallucination warp, flash, vignette, grain ----------
function blinkAmt(t) { const C = CUE; let b = 0; for (const o of [0, 0.85, 1.6]) { const d = t - C.micro - o; if (d > 0 && d < 0.42) b = Math.max(b, Math.sin(d / 0.42 * Math.PI)); } return b; }
function warpAmt(t) { const C = CUE; return clamp((t - C.breathe + 0.5) / 0.8) * clamp((C.record + 0.3 - t) / 0.8); }
const GRAIN = document.createElement('canvas'); GRAIN.width = 480; GRAIN.height = 270; const gctx = GRAIN.getContext('2d');
function grain(t) {
  const f = Math.floor(t * 24), r = rng(f * 9973 + 11), img = gctx.createImageData(480, 270);
  for (let i = 0; i < img.data.length; i += 4) { const v = r() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
  gctx.putImageData(img, 0, 0);
  ctx.save(); ctx.globalAlpha = 0.06; ctx.globalCompositeOperation = 'overlay'; ctx.imageSmoothingEnabled = false; ctx.drawImage(GRAIN, 0, 0, W, H); ctx.restore();
}



// ---------- word icons (filled shapes, no outlines): pop in on their word with a spring ----------
function popK(t, t0, t1) { if (t < t0 || t > t1 + 0.35) return 0; return spring(t - t0, 0.45, 14) * clamp((t1 + 0.35 - t) / 0.35); }
function rr2(x, y, w, h, r, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); }
const ICONS = {
  bed() { rr2(-70, -48, 18, 82, 8, '#4b6fd6'); rr2(-58, -8, 128, 30, 12, '#f3f7fb'); rr2(-52, -26, 40, 22, 10, '#f7f1ff'); rr2(-8, -16, 78, 30, 12, '#8fd8e6'); rr2(-62, 18, 10, 18, 4, '#4b6fd6'); rr2(56, 18, 10, 18, 4, '#4b6fd6'); },
  wine() { ctx.fillStyle = 'rgba(232,243,255,0.35)'; ctx.beginPath(); ctx.moveTo(-26, -46); ctx.lineTo(26, -46); ctx.quadraticCurveTo(26, 4, 0, 6); ctx.quadraticCurveTo(-26, 4, -26, -46); ctx.fill();
    ctx.fillStyle = '#ff6f7a'; ctx.beginPath(); ctx.moveTo(-23, -24); ctx.lineTo(23, -24); ctx.quadraticCurveTo(22, 2, 0, 3); ctx.quadraticCurveTo(-22, 2, -23, -24); ctx.fill(); rr2(-3, 4, 6, 34, 3, '#dfe7f2'); rr2(-20, 36, 40, 8, 4, '#dfe7f2'); },
  beer() { rr2(-24, -40, 44, 80, 10, '#ffd98a'); rr2(-27, -50, 50, 18, 9, '#ffffff'); rr2(18, -22, 18, 40, 9, 'rgba(255,217,138,0.7)'); rr2(-14, -26, 6, 52, 3, 'rgba(255,255,255,0.4)'); },
  car(t) { ctx.rotate(Math.sin(t * 6) * 0.06); rr2(-70, -20, 140, 40, 16, '#ff8f4a'); rr2(-40, -48, 80, 34, 14, '#ff8f4a'); rr2(-32, -42, 30, 22, 6, '#8fd8e6'); rr2(4, -42, 30, 22, 6, '#8fd8e6');
    for (const wx of [-42, 42]) { ctx.fillStyle = '#16213a'; ctx.beginPath(); ctx.arc(wx, 22, 15, 0, 6.283); ctx.fill(); ctx.fillStyle = '#9aa6c4'; ctx.beginPath(); ctx.arc(wx, 22, 6, 0, 6.283); ctx.fill(); } },
  bin() { rr2(-34, -30, 68, 76, 10, '#8fd8e6'); rr2(-42, -44, 84, 14, 7, '#6fc3d4'); rr2(-10, -54, 20, 10, 5, '#6fc3d4'); for (const x of [-16, 0, 16]) rr2(x - 3, -18, 6, 54, 3, 'rgba(6,20,40,0.25)');
    ctx.fillStyle = '#ffb35c'; for (const [x, y] of [[-12, -52], [8, -60], [20, -50]]) { ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.283); ctx.fill(); } },
  drop() { ctx.fillStyle = '#8fd8e6'; ctx.beginPath(); ctx.moveTo(0, -40); ctx.bezierCurveTo(10, -18, 28, -2, 28, 14); ctx.arc(0, 14, 28, 0, Math.PI); ctx.bezierCurveTo(-28, -2, -10, -18, 0, -40); ctx.fill(); rr2(-14, 2, 8, 18, 4, 'rgba(255,255,255,0.6)'); },
  plaque(t) { ctx.fillStyle = '#ffb35c'; for (let i = 0; i < 9; i++) { const a = i * 2.4, r = 14 + (i % 3) * 8; ctx.beginPath(); ctx.arc(Math.cos(a) * r, Math.sin(a) * r * 0.8, 12 - (i % 3) * 2, 0, 6.283); ctx.fill(); } },
  eye(t, o) { const open = o.open ?? 1;
    ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.ellipse(0, 0, 54, 30 * open + 3, 0, 0, 6.283); ctx.fill();
    if (open > 0.15) { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 54, 30 * open + 3, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = '#3aa7c2'; ctx.beginPath(); ctx.arc(0, 0, 22, 0, 6.283); ctx.fill(); ctx.fillStyle = '#0a1c2c'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 6.283); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(7, -7, 5, 0, 6.283); ctx.fill(); ctx.restore(); }
    else { for (let i = -2; i <= 2; i++) rr2(i * 18 - 3, 4, 6, 16, 3, '#f3f7fb'); } },
  watch(t, o) { ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.arc(0, 6, 44, 0, 6.283); ctx.fill(); rr2(-10, -52, 20, 14, 5, '#f3f7fb'); ctx.fillStyle = '#102348'; ctx.beginPath(); ctx.arc(0, 6, 34, 0, 6.283); ctx.fill();
    ctx.save(); ctx.translate(0, 6); ctx.rotate(t * 4); rr2(-3, -28, 6, 30, 3, '#ff8f4a'); ctx.restore(); font(20, 700); ctx.fillStyle = TEAL; ctx.textAlign = 'center'; ctx.fillText('3 S', 0, 70); },
  ghost(t) { ctx.fillStyle = 'rgba(232,243,255,0.75)'; ctx.beginPath(); ctx.moveTo(-40, 40); ctx.lineTo(-40, -10); ctx.arc(0, -10, 40, Math.PI, 0); ctx.lineTo(40, 40);
    for (let i = 0; i < 4; i++) ctx.quadraticCurveTo(30 - i * 20, 52 + Math.sin(t * 6 + i) * 6, 20 - i * 20, 40); ctx.fill();
    ctx.fillStyle = '#0a1c2c'; ctx.beginPath(); ctx.ellipse(-14, -12, 7, 10, 0, 0, 6.283); ctx.ellipse(14, -12, 7, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 12, 8, 10 + Math.sin(t * 5) * 3, 0, 0, 6.283); ctx.fill(); },
  trophy() { ctx.fillStyle = '#ffd98a'; ctx.beginPath(); ctx.moveTo(-36, -44); ctx.lineTo(36, -44); ctx.quadraticCurveTo(36, 10, 0, 14); ctx.quadraticCurveTo(-36, 10, -36, -44); ctx.fill();
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(s * 40, -24, 14, 0, 6.283); ctx.fill(); ctx.fillStyle = '#102348'; ctx.beginPath(); ctx.arc(s * 40, -24, 7, 0, 6.283); ctx.fill(); ctx.fillStyle = '#ffd98a'; }
    rr2(-6, 12, 12, 18, 3, '#ffd98a'); rr2(-26, 28, 52, 14, 6, '#ffc857'); rr2(-16, -34, 8, 30, 4, 'rgba(255,255,255,0.45)'); },
  calendar(t, o) { rr2(-48, -46, 96, 96, 14, '#f3f7fb'); rr2(-48, -46, 96, 28, 12, '#ff6f7a'); rr2(-26, -56, 10, 20, 5, '#dfe7f2'); rr2(16, -56, 10, 20, 5, '#dfe7f2');
    font(o.small ? 26 : 34, 700); ctx.fillStyle = '#102348'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.text, 0, 16); },
  flask() { ctx.fillStyle = 'rgba(232,243,255,0.35)'; ctx.beginPath(); ctx.moveTo(-12, -44); ctx.lineTo(12, -44); ctx.lineTo(12, -12); ctx.lineTo(40, 40); ctx.quadraticCurveTo(40, 46, 32, 46); ctx.lineTo(-32, 46); ctx.quadraticCurveTo(-40, 46, -40, 40); ctx.lineTo(-12, -12); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#8fd8e6'; ctx.beginPath(); ctx.moveTo(-26, 14); ctx.lineTo(26, 14); ctx.lineTo(38, 40); ctx.quadraticCurveTo(38, 44, 32, 44); ctx.lineTo(-32, 44); ctx.quadraticCurveTo(-38, 44, -38, 40); ctx.closePath(); ctx.fill(); rr2(-16, -50, 32, 10, 5, '#dfe7f2'); },
  pillow(t) { ctx.rotate(Math.sin(t * 30) * 0.05); rr2(-70, -26, 140, 52, 24, '#f7f1ff'); rr2(-50, -4, 100, 8, 4, 'rgba(143,216,230,0.5)');
    ctx.fillStyle = TEAL; for (const s of [-1, 1]) for (let i = 0; i < 2; i++) { const r = 92 + i * 22; ctx.beginPath(); ctx.arc(0, 0, r, s < 0 ? Math.PI - 0.4 : -0.4, s < 0 ? Math.PI + 0.4 : 0.4); ctx.arc(0, 0, r - 6, s < 0 ? Math.PI + 0.4 : 0.4, s < 0 ? Math.PI - 0.4 : -0.4, true); ctx.fill(); } },
};
// ---------- idle animation: every icon moves in a way that shows what it is ----------
const blinkF = t => { const p = (t % 2.7) / 2.7; return p > 0.92 ? Math.sin((p - 0.92) / 0.08 * Math.PI) : 0; };
function puff(t, x, y, n = 3, dir = -1, col = 'rgba(255,255,255,0.55)', size = 12) {   // rising smoke / steam / exhaust puffs
  for (let i = 0; i < n; i++) { const p = ((t * 0.8 + i / n) % 1); ctx.save(); ctx.globalAlpha *= (1 - p) * 0.9; circ(x + Math.sin(p * 6 + i) * 6 + (dir === 0 ? -p * 60 : 0), y + (dir === 0 ? -p * 10 : dir * p * 60), size * (0.6 + p * 1.2), col); ctx.restore(); }
}
function bubbles(t, x, y, w, h, n = 5, col = 'rgba(255,255,255,0.7)') { for (let i = 0; i < n; i++) { const p = (t * 0.7 + i / n) % 1; circ(x + ((i * 37) % w) - w / 2 + Math.sin(t * 3 + i) * 3, y + h / 2 - p * h, 3 + (i % 3), col); } }
function glint(t, w, h, period = 2.4) {   // a diagonal light sweep across shiny things
  const p = (t % period) / period; if (p > 0.35) return; const x = lerp(-w, w, p / 0.35);
  ctx.save(); ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.moveTo(x - 10, -h); ctx.lineTo(x + 14, -h); ctx.lineTo(x - 6, h); ctx.lineTo(x - 30, h); ctx.closePath(); ctx.fill(); ctx.restore();
}
function wheel(t, x, y, r) { circ(x, y, r, '#16213a'); circ(x, y, r * 0.42, '#9aa6c4'); ctx.save(); ctx.translate(x, y); ctx.rotate(t * 8); rr2(-r * 0.12, -r * 0.8, r * 0.24, r * 1.6, r * 0.12, '#5b6585'); ctx.restore(); }
const IDLE = {   // pre: transform before drawing; post: overlay after drawing; opt: tweak options
  eye: { opt: (t, o) => ({ ...o, open: (o.open ?? 1) * (1 - blinkF(t)) }) },
  coffee: {}, nocoffee: {},
  car: { post: t => { wheel(t, -42, 22, 15); wheel(t, 42, 22, 15); puff(t, -84, 18, 3, 0, 'rgba(220,230,255,0.5)', 9); } },
  carz: { post: t => { wheel(t, -42, 22, 15); wheel(t, 42, 22, 15); } },
  bed: { post: t => { ctx.save(); ctx.translate(0, Math.sin(t * 2) * 2); rr2(-8, -16, 78, 12, 6, 'rgba(255,255,255,0.25)'); ctx.restore(); font(22, 700); ctx.fillStyle = GOLD; ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 2.5); ctx.fillText('z', 40, -40 - (t * 12 % 14)); } },
  wine: { pre: t => ctx.rotate(Math.sin(t * 2.4) * 0.06), post: t => bubbles(t, 0, -12, 26, 24, 3) },
  beer: { post: t => bubbles(t, -2, 0, 36, 70, 6, 'rgba(255,255,255,0.8)') },
  bin: { post: t => { const hop = Math.max(0, Math.sin(t * 3.2)) ** 6 * 10; ctx.save(); ctx.translate(0, -hop); rr2(-42, -44, 84, 14, 7, '#6fc3d4'); ctx.restore(); } },
  drop: { pre: t => ctx.scale(1 + Math.sin(t * 5) * 0.04, 1 - Math.sin(t * 5) * 0.04), post: t => glint(t, 30, 45) },
  plaque: { pre: t => ctx.scale(1 + Math.sin(t * 3) * 0.05, 1 + Math.sin(t * 3) * 0.05) },
  trophy: { post: t => glint(t, 50, 50) },
  calendar: { post: t => { const c = (Math.sin(t * 2) + 1) / 2; ctx.fillStyle = 'rgba(200,214,236,0.9)'; ctx.beginPath(); ctx.moveTo(48, 50); ctx.lineTo(48 - 18 * c, 50); ctx.lineTo(48, 50 - 18 * c); ctx.fill(); } },
  flask: { post: t => bubbles(t, 0, 26, 50, 30, 5) },
  clock: { post: t => { ctx.save(); ctx.rotate(t * 1.2); rr2(-1, -38, 2, 40, 1, '#ff8f4a'); ctx.restore(); } },
  moon: { post: t => { ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 3); ICONS_star(40, -40, 7); } },
  brainmini: { pre: t => ctx.scale(1 + Math.sin(t * 2.4) * 0.03, 1 + Math.sin(t * 2.4) * 0.03), post: t => { ctx.globalAlpha *= Math.max(0, Math.sin(t * 4)); circ(-10 + Math.sin(t * 1.3) * 20, -10, 6, '#ffd98a'); } },
  bubble: { pre: t => ctx.translate(0, Math.sin(t * 2.5) * 5) },
  thermo: { opt: (t, o) => ({ ...o, level: (o.level ?? 0.5) + Math.sin(t * 1.5) * 0.04 }) },
  switchoff: { pre: t => ctx.rotate(Math.sin(t * 1.4) * 0.03) },
  doc: { pre: t => ctx.rotate(Math.sin(t * 1.8) * 0.06) },
  photo: { post: t => glint(t, 40, 32) },
  donut: { pre: t => ctx.rotate(Math.sin(t) * 0.12) },
  fries: { post: t => puff(t, 0, -60, 3, -1, 'rgba(255,255,255,0.4)', 7) },
  burger: { pre: t => { const b = Math.abs(Math.sin(t * 3)) * 0.06; ctx.scale(1 + b, 1 - b); } },
  sugar: { post: t => { ctx.globalAlpha *= Math.max(0, Math.sin(t * 3)); ICONS_star(-30, -40, 8); } },
  muscle: { pre: t => { const f = Math.max(0, Math.sin(t * 2.2)) * 0.08; ctx.scale(1 + f, 1 + f); } },
  shield: { post: t => glint(t, 44, 50) },
  scale: { post: t => { ctx.save(); ctx.translate(0, 25); ctx.rotate(Math.sin(t * 3) * 0.4); rr2(-1, -10, 2, 10, 1, '#ff8f4a'); ctx.restore(); } },
  pill: { pre: t => ctx.rotate(Math.sin(t * 2) * 0.3) },
  poster: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.03) },
  book: { post: t => { const c = (Math.sin(t * 2.2) + 1) / 2; rr2(0, -34, 44 * (1 - c), 64, 4, 'rgba(255,255,255,0.85)'); } },
  family: { pre: t => ctx.rotate(Math.sin(t * 2) * 0.04) },
  plane: { post: t => puff(t, -70, 0, 4, 0, 'rgba(255,255,255,0.5)', 8) },
  bottle: { pre: t => ctx.rotate(Math.sin(t * 9) * 0.04 * Math.max(0, Math.sin(t * 1.3))), post: t => bubbles(t, 0, 10, 36, 50, 4) },
  gut: { pre: t => ctx.scale(1 + Math.sin(t * 3) * 0.03, 1 - Math.sin(t * 3) * 0.03) },
  piggy: { post: t => { const p = (t * 0.6) % 1; ctx.save(); ctx.globalAlpha *= p < 0.7 ? 1 : (1 - p) / 0.3; circ(2, -90 + p * 60, 10, '#ffd98a'); ctx.restore(); } },
  bedclock: { post: t => { ctx.save(); ctx.translate(36, -60); ctx.rotate(t * 1.2); rr2(-1, -18, 2, 20, 1, '#ff8f4a'); ctx.restore(); } },
  subscribe: { pre: t => { const b = 1 + Math.max(0, Math.sin(t * 3)) * 0.05; ctx.scale(b, b); } },
  sun: {}, hexmol: {}, heart: {}, dream: {}, virus: {}, alarm: {}, spider: {}, pinball: {}, dna: {}, fly: {}, snow: {}, watch: {}, ghost: {}, pillow: {}, mouse: {},
};
function ICONS_star(x, y, r) { ctx.fillStyle = '#ffd98a'; ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283, rr = i % 2 ? r * 0.35 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.fill(); }
function drawIcon(name, t, o = {}) {   // draw an icon with its idle animation (falls back to a gentle sway + breathing)
  const A = IDLE[name]; ctx.save();
  if (A && A.pre) A.pre(t); else if (!A) { ctx.rotate(Math.sin(t * 1.6) * 0.04); const b = 1 + Math.sin(t * 2.2) * 0.03; ctx.scale(b, b); }
  ICONS[name](t, A && A.opt ? A.opt(t, o) : o);
  if (A && A.post) A.post(t, o); ctx.restore();
}
function icon(name, x, y, s, t, t0, t1, o = {}) {
  const k = popK(t, t0, t1); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y + Math.sin(t * 2.2 + x * 0.01) * 6); ctx.scale(s * k, s * (k + (1 - k) * 0.2)); drawIcon(name, t, o); ctx.restore();
}

// Randy's bed: slides in under the mascot, he lies down, then springs up on "fine"
function bedState(t) { const C = CUE; return { inK: t < C.randy2 ? 0 : eoq((t - C.randy2) / 0.9), outK: t < C.fine + 0.5 ? 0 : eoc((t - C.fine - 0.5) / 0.8),
  lie: t < C.hours15 ? 0 : t < C.fine ? spring(t - C.hours15, 0.5, 9) : 1 - spring(t - C.fine, 0.42, 14) }; }
function drawBed(t) {
  const b = bedState(t); if (b.inK <= 0 || b.outK >= 1) return;
  const x = KID.x + (1 - b.inK) * 700 + b.outK * 800, y = KID.y;
  ctx.save(); ctx.globalAlpha = 1 - b.outK;
  rr2(x + 160, y - 190, 26, 196, 12, '#4b6fd6'); rr2(x - 190, y - 120, 22, 126, 10, '#4b6fd6');
  rr2(x - 180, y - 78, 360, 46, 18, '#f3f7fb'); rr2(x - 176, y - 34, 352, 22, 10, '#c9d6ec');
  rr2(x - 170, y - 12, 14, 18, 4, '#4b6fd6'); rr2(x + 150, y - 12, 14, 18, 4, '#4b6fd6');
  ctx.restore();
}
function drawBlanket(t) {
  const b = bedState(t); if (b.lie <= 0.05 || b.outK > 0) return;
  ctx.save(); ctx.globalAlpha = clamp(b.lie); rr2(KID.x - 180, KID.y - 132, 175, 62, 26, '#8fd8e6'); rr2(KID.x - 165, KID.y - 114, 145, 10, 5, 'rgba(255,255,255,0.35)'); ctx.restore();
}



// =====================================================================
// v3 scene system (EXPLAINER_STYLE_GUIDE): colour worlds, transitions,
// overlap registry (icons never sit on other elements) + overlap audit
// =====================================================================
const MOON = { x: 0, y: 540, r: 300 };
let KID = { x: 960, y: 800 };
let BRAIN = { x: 700, y: 560, r: 300 };
const BAR = { x: 560, y: 230, w: 800, h: 46 };

// ---------- overlap registry ----------
let BOX = [], LABELQ = [];
const AUDIT = { on: false };
function reg(kind, name, x0, y0, x1, y1) { BOX.push({ kind, name, x0, y0, x1, y1 }); }
const hitB = (a, b, m = 4) => a.x0 < b.x1 - m && b.x0 < a.x1 - m && a.y0 < b.y1 - m && b.y0 < a.y1 - m;
let CAM = { x: 960, y: 540, z: 1 };
const toS = (x, y) => [W / 2 + (x - CAM.x) * CAM.z, H / 2 + (y - CAM.y) * CAM.z];
function regKid(kx, ky, s, lie) {   // screen box of the mascot drawn at world (kx, ky) with scale s
  const [x, y] = toS(kx, ky), z = CAM.z * s;
  if (lie > 0.5) reg('hero', 'mascot', x - 190 * z, y - 140 * z, x + 90 * z, y + 10 * z);
  else reg('hero', 'mascot', x - 64 * z, y - 290 * z, x + 64 * z, y + 12 * z);
}

// ---------- labels (registered first, drawn last) ----------
function labelBox(txt, x, y, size, align = 'center') {
  font(size, 600); ctx.letterSpacing = '4px'; const w = ctx.measureText(txt).width; ctx.letterSpacing = '0px';
  const ph = size * 1.15 + size * 0.55, ax = align === 'left' ? x : x - w / 2;
  return { x0: ax - size * 0.55, x1: ax - size * 0.55 + w + size * 1.1, y0: y - ph / 2, y1: y + ph / 2 };
}
function label(txt, x, y, t, t0, t1, color = WHITE, size = 34, o = {}) {
  if (t < t0 || t > t1 + 0.35) return;
  const b = labelBox(txt, x, y, size, o.align); reg('label', txt, b.x0, b.y0, b.x1, b.y1);
  LABELQ.push(() => riseText(txt, x, y, t0, t, { size, color, out: t1, ...o }));
}
// key-term tag: solid accent block with white bold text
function tag(txt, x, y, t, t0, t1, bg = '#e2457a', size = 40) {
  if (t < t0 || t > t1 + 0.35) return;
  font(size, 700); ctx.letterSpacing = '3px'; const w = ctx.measureText(txt).width; ctx.letterSpacing = '0px';
  const bw = w + 48, bh = size * 1.55; reg('label', txt, x - bw / 2, y - bh / 2, x + bw / 2, y + bh / 2);
  LABELQ.push(() => {
    const k = spring(t - t0, 0.5, 14), out = clamp((t1 + 0.35 - t) / 0.35);
    ctx.save(); ctx.globalAlpha = out; ctx.translate(x, y); ctx.scale(lerp(0.6, 1, k), lerp(0.6, 1, k));
    ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 10); ctx.fill(); ctx.restore();
    riseText(txt, x - w / 2, y, t0 + 0.08, t, { size, weight: 700, color: WHITE, ls: 3, pill: false, align: 'left', out: t1 });
  });
}
// meter: rounded track with a gradient fill animating to a value
function meter(x, y, w, frac, t, t0, t1, cA, cB, cap) {
  if (t < t0 || t > t1 + 0.35) return;
  reg('meter', cap, x - 10, y - 66, x + w + 10, y + 30);
  LABELQ.push(() => {
    const out = clamp((t1 + 0.35 - t) / 0.35), k = eoq((t - t0 - 0.2) / 1.0);
    ctx.save(); ctx.globalAlpha = out * eoc((t - t0) / 0.3);
    ctx.fillStyle = 'rgba(6,20,40,0.55)'; ctx.beginPath(); ctx.roundRect(x, y - 14, w, 28, 14); ctx.fill();
    const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, cA); g.addColorStop(1, cB);
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, y - 14, Math.max(28, w * frac * k), 28, 14); ctx.fill(); ctx.restore();
    riseText(cap, x, y - 44, t0, t, { size: 28, color: WHITE, align: 'left', pill: false, out: t1 });
  });
}

// ---------- icons placed in the first free slot ----------
function placeIcon(name, slots, s, t, t0, t1, o = {}) {
  const k = popK(t, t0, t1); if (k <= 0) return;
  const hw = (o.hw || 72) * s, hh = (o.hh || 66) * s;
  let pick = null;
  for (const [x, y] of slots) {
    const b = { x0: x - hw, y0: y - hh, x1: x + hw, y1: y + hh };
    if (b.x0 < 8 || b.x1 > W - 8 || b.y0 < 8 || b.y1 > H - 8) continue;
    if (!BOX.some(o2 => o2.kind !== 'panel' && hitB(b, o2))) { pick = [x, y, b]; break; }
  }
  if (!pick) { const [x, y] = slots[slots.length - 1]; pick = [x, y, { x0: x - hw, y0: y - hh, x1: x + hw, y1: y + hh }]; if (AUDIT.on) AUDIT.log(`${name}: no free slot`, t); }
  reg('icon', name, pick[2].x0, pick[2].y0, pick[2].x1, pick[2].y1);
  icon(name, pick[0], pick[1], s, t, t0, t1, o);
}

// ---------- colour worlds ----------
const WORLDS = {
  night: { a: '#081d2c', b: '#102348', blobs: [[24,150,160,.2],[40,95,195,.16],[220,95,110,.1],[60,70,175,.15]], stars: 1 },
  teal: { a: '#127b84', b: '#0b4f5c', blobs: [[143,230,230,.18],[40,160,170,.2],[255,217,138,.08]], dots: 'rgba(200,255,250,0.10)' },
  coral: { a: '#d4566a', b: '#9b3352', blobs: [[255,160,120,.18],[255,90,110,.16],[255,217,138,.1]], dots: 'rgba(255,220,220,0.10)' },
  cream: { a: '#f8e6d4', b: '#efc7ae', blobs: [[255,150,140,.16],[255,190,150,.2],[230,120,150,.1]], dots: 'rgba(214,110,120,0.10)' },
  indigo: { a: '#2d2b7c', b: '#18164a', blobs: [[120,90,230,.18],[60,140,220,.12],[220,95,170,.1]], stars: 0.5 },
  gold: { a: '#f7c970', b: '#ea9a52', blobs: [[255,240,190,.25],[255,170,90,.18],[230,110,80,.1]], dots: 'rgba(255,250,230,0.14)' },
  grey: { a: '#2b3244', b: '#171c28', blobs: [[90,110,150,.14],[60,70,100,.12]], stars: 0.25 },
};
const BOKEH = Array.from({ length: 40 }, () => ({ x: R(), y: R(), r: 8 + R() * 40, ph: R() * 6.28 }));
function worldBG(t, name, warp = 0, cam = null) {
  const P = WORLDS[name], g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, P.a); g.addColorStop(1, P.b);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalCompositeOperation = name === 'cream' || name === 'gold' ? 'source-over' : 'lighter';
  P.blobs.forEach(([r, gg, b, a], i) => {
    const px = W * (0.2 + 0.3 * i) + Math.sin(t * 0.21 + i) * 60 - (cam ? (cam.x - 960) * 0.1 : 0), py = H * (0.3 + 0.25 * (i % 2)) + Math.cos(t * 0.17 + i) * 40;
    const s = 800 * (1 + 0.06 * Math.sin(t * 0.3 + i) + warp * 0.35 * Math.sin(t * 2.2 + i));
    const rg = ctx.createRadialGradient(px, py, 0, px, py, s); rg.addColorStop(0, `rgba(${r},${gg},${b},${a})`); rg.addColorStop(1, `rgba(${r},${gg},${b},0)`);
    ctx.filter = warp ? `hue-rotate(${warp * 70 * Math.sin(t * 1.3 + i)}deg)` : 'none'; ctx.fillStyle = rg; ctx.fillRect(px - s, py - s, s * 2, s * 2);
  });
  ctx.filter = 'none';
  if (P.dots) for (const d of BOKEH) { ctx.fillStyle = P.dots; ctx.beginPath(); ctx.arc(d.x * W + Math.sin(t * 0.3 + d.ph) * 20, d.y * H + Math.cos(t * 0.25 + d.ph) * 16, d.r, 0, 6.283); ctx.fill(); }
  ctx.restore();
  if (P.stars) {
    ctx.save();
    for (const layer of STARS) for (const s of layer) {
      const px = cam ? W / 2 + (s.x - cam.x) * s.depth * cam.z : (s.x + 1100) / 4200 * W, py = cam ? H / 2 + (s.y - cam.y) * s.depth * cam.z : (s.y + 760) / 2600 * H;
      if (px < -10 || px > W + 10 || py < -10 || py > H + 10) continue;
      const tw = 0.55 + 0.45 * Math.sin(t * s.sp + s.ph); ctx.globalAlpha = tw * P.stars; ctx.fillStyle = '#e8f3ff';
      if (s.spark) { const r = s.r * 3.2 * tw; ctx.beginPath(); ctx.moveTo(px, py - r); ctx.quadraticCurveTo(px, py, px + r, py); ctx.quadraticCurveTo(px, py, px, py + r); ctx.quadraticCurveTo(px, py, px - r, py); ctx.quadraticCurveTo(px, py, px, py - r); ctx.fill(); }
      else { ctx.beginPath(); ctx.arc(px, py, s.r, 0, 6.283); ctx.fill(); }
    }
    ctx.restore();
  }
}
function camAt(keys, t) {
  let a = keys[0], b = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) if (t >= keys[i][0] && t < keys[i + 1][0]) { a = keys[i]; b = keys[i + 1]; break; }
  if (t < keys[0][0]) b = a; if (t >= keys[keys.length - 1][0]) a = b;
  const k = eic((t - a[0]) / Math.max(1e-3, b[0] - a[0]));
  return { x: lerp(a[1], b[1], k) + Math.sin(t * 0.37) * 5, y: lerp(a[2], b[2], k) + Math.cos(t * 0.29) * 4, z: Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), k)) * (1 + Math.sin(t * 0.21) * 0.012) };
}
function beginWorld(cam) { CAM = cam; ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(cam.z, cam.z); ctx.translate(-cam.x, -cam.y); }

// ---------- brain at any place ----------
function drawBrainAt(t, B, st) {
  BRAIN = B; const { x, y, r } = B;
  reg('hero', 'brain', x - r, y - 0.82 * r, x + r, y + 0.92 * r);
  ctx.save(); ctx.translate(x, y - r * 0.1); ctx.scale(1, 0.8); const hg = ctx.createRadialGradient(-r * 0.25, 0, r * 0.8, 0, 0, r * 1.4);
  hg.addColorStop(0, st.halo || 'rgba(255,255,255,0.35)'); hg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(0, 0, r * 1.4, 0, 6.283); ctx.fill(); ctx.restore();
  renderBrain(t, st.tired, st.glow, st.dim);
  const S = r * 2 * 1.12; ctx.drawImage(gcv, x - S / 2, y - S / 2, S, S);
  const C = CUE;
  if (!st.noWaste) for (const p of WASTE) {
    const appear = C.trash + p.t0 * 2.6; if (t < appear) continue;
    let a = eoc((t - appear) / 0.4), px = x + Math.cos(p.a + t * 0.05) * p.d * r * 0.85, py = y - r * 0.12 + Math.sin(p.a + t * 0.05) * p.d * r * 0.48;
    if (t > C.washes && t < C.wash) { const f = clamp((t - C.washes - p.t0 * 1.5) / 1.2); a *= 1 - f; }
    if (t >= C.wash) { const f = eoq((t - C.wash) / 1.2); a = eoc((t - C.wash) / 0.5); const ci = Math.floor(p.ph / 6.283 * 6), cx = x + Math.cos(ci * 1.9 + 0.4) * r * 0.5, cy = y - r * 0.12 + Math.sin(ci * 1.9 + 0.4) * r * 0.3; px = lerp(px, cx + Math.cos(p.a) * 24, f * 0.8); py = lerp(py, cy + Math.sin(p.a) * 20, f * 0.8); }
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#ff9a3c'; ctx.beginPath(); ctx.arc(px, py, p.s * (t >= C.wash ? 1.4 : 1), 0, 6.283); ctx.fill(); ctx.restore();
  }
}
// focus ring: zoomed-in view of brain cells shrinking apart while fluid washes the gaps
const CELLS = Array.from({ length: 9 }, (_, i) => ({ x: [-1, 0, 1][i % 3], y: [-1, 0, 1][Math.floor(i / 3)], ph: R() * 6.28 }));
const RDOTS = Array.from({ length: 24 }, () => ({ x: R() * 2 - 1, y: R() * 2 - 1, ph: R() }));
function focusRing(t, cx, cy, R0) {
  const C = CUE, k = spring(t - C.during + 0.1, 0.5, 12); if (k <= 0) return;
  const rr = R0 * k; reg('hero', 'focus ring', cx - R0, cy - R0, cx + R0, cy + R0);
  ctx.save(); ctx.fillStyle = 'rgba(80,30,70,0.18)'; ctx.beginPath(); ctx.arc(cx + 10, cy + 16, rr * 1.04, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#4a2346'; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.283); ctx.fill(); ctx.clip();
  const sk = t < C.washes ? eoq((t - C.during - 0.4) / 1.2) * 0.45 : t < C.wash ? 0.45 + 0.55 * eoq((t - C.washes) / 0.8) : 1 - 0.7 * eoq((t - C.wash) / 1.0);
  const gap = lerp(8, 46, sk), cs = rr * 0.30 * lerp(1, 0.86, sk);
  const flowOn = clamp((t - C.washes + 0.2) / 0.4) * clamp((C.wash + 0.3 - t) / 0.5);
  // fluid between cells
  ctx.fillStyle = `rgba(143,216,230,${0.15 + 0.35 * flowOn})`; ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
  for (const c of CELLS) {
    const px = cx + c.x * (cs * 2 + gap) * 0.95, py = cy + c.y * (cs * 2 + gap) * 0.95, b = 1 + 0.03 * Math.sin(t * 2 + c.ph);
    ctx.fillStyle = '#f29db0'; ctx.beginPath(); ctx.roundRect(px - cs * b, py - cs * b, cs * 2 * b, cs * 2 * b, cs * 0.8); ctx.fill();
    ctx.fillStyle = '#c95a7c'; ctx.beginPath(); ctx.arc(px + cs * 0.15, py, cs * 0.35, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.roundRect(px - cs * 0.6, py - cs * 0.7, cs * 0.5, cs * 0.18, cs * 0.09); ctx.fill();
  }
  for (const d of RDOTS) {   // waste in the gaps, washed out to the right while the fluid flows
    const run = flowOn > 0 ? ((t - C.washes) * 0.5 + d.ph) % 1 : 0;
    const px = flowOn > 0.05 ? cx - rr + run * rr * 2 : cx + d.x * rr * 0.8, py = cy + Math.round(d.y * 1.5) / 1.5 * (cs + gap / 2);
    ctx.fillStyle = '#ff9a3c'; ctx.beginPath(); ctx.arc(px, py, 6, 0, 6.283); ctx.fill();
  }
  ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath(); ctx.arc(cx, cy, rr + 10, 0, 6.283); ctx.arc(cx, cy, rr, 0, 6.283, true); ctx.fill(); ctx.restore();
}

// ---------- our own teen character (Randy), never a likeness ----------
function drawTeen(t, x, y, s, o = {}) {
  const bob = Math.sin(t * 2.2) * 4, sw = Math.sin(t * 1.6) * 0.04;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(sw);
  ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.beginPath(); ctx.ellipse(0, 4, 70, 12, 0, 0, 6.283); ctx.fill();
  ctx.translate(0, bob);
  rr2(-38, -96, 32, 96, 14, '#3b5aa8'); rr2(6, -96, 32, 96, 14, '#3b5aa8'); rr2(-44, -10, 42, 16, 8, '#f3f7fb'); rr2(2, -10, 42, 16, 8, '#f3f7fb');
  rr2(-56, -210, 112, 124, 34, '#d64550'); rr2(-56, -210, 112, 30, 15, '#e86068');
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 54, -196); ctx.rotate(sd * 0.18); rr2(-14, 0, 28, 92, 14, '#d64550'); rr2(-12, 84, 24, 24, 12, '#f2b38f'); ctx.restore(); }
  rr2(-16, -230, 32, 28, 10, '#e9a27f');
  rr2(-62, -350, 124, 128, 54, '#f2b38f'); rr2(28, -320, 30, 60, 15, '#e9a27f');           // head + shaded side plane
  ctx.fillStyle = '#4a2c22'; ctx.beginPath(); ctx.moveTo(-70, -290); ctx.quadraticCurveTo(-74, -372, 0, -372); ctx.quadraticCurveTo(70, -374, 70, -300); ctx.quadraticCurveTo(30, -334, -20, -318); ctx.quadraticCurveTo(-50, -312, -70, -290); ctx.fill();
  rr2(-30, -360, 40, 10, 5, 'rgba(255,255,255,0.18)');
  const lid = o.lid ?? 0.55;
  for (const sd of [-1, 1]) { ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.ellipse(sd * 24, -286, 13, 11, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.arc(sd * 24 + 2, -284, 6, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#f2b38f'; ctx.fillRect(sd * 24 - 15, -300, 30, 14 * lid + 2); ctx.fillStyle = 'rgba(120,70,110,0.35)'; ctx.beginPath(); ctx.ellipse(sd * 24, -270, 12, 4, 0, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = 'rgba(230,110,110,0.45)'; ctx.beginPath(); ctx.arc(-40, -262, 9, 0, 6.283); ctx.arc(40, -262, 9, 0, 6.283); ctx.fill();
  rr2(-12, -250, 24, 6, 3, '#9b4b4b');
  ctx.restore();
}
// cute lab rat (own design)
function drawRat2(t, x, y, s) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 2) * 3); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(0, 6, 90, 12, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#aeb6cc'; ctx.beginPath(); ctx.ellipse(10, -40, 80, 46, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#c7cee0'; ctx.beginPath(); ctx.ellipse(-62, -58, 40, 34, -0.2, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#e9a7b8'; ctx.beginPath(); ctx.arc(-60, -98, 18, 0, 6.283); ctx.arc(-24, -92, 15, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#20232f'; ctx.beginPath(); ctx.ellipse(-74, -64, 8, 10, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-71, -68, 3, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#e9a7b8'; ctx.beginPath(); ctx.arc(-102, -52, 7, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#9aa3bb'; ctx.beginPath(); ctx.moveTo(88, -34); ctx.quadraticCurveTo(150, -30, 160, -80); ctx.quadraticCurveTo(152, -24, 88, -22); ctx.fill();
  rr2(-40, -8, 18, 12, 6, '#e9a7b8'); rr2(30, -8, 18, 12, 6, '#e9a7b8');
  ctx.restore();
}
// hallucination sprites in fixed lanes away from the mascot and labels
const GLANES = [[330, 380, 0], [1600, 470, 1.7], [960, 150, 3.1], [560, 760, 4.4]];
function hallucinations(t, w) {
  if (w <= 0) return;
  ctx.save(); ctx.globalAlpha = w;
  for (const side of [-1, 1]) {
    const b = 60 + 40 * Math.sin(t * 2.4 + (side > 0 ? 1 : 0)), x0 = side < 0 ? 0 : W;
    ctx.fillStyle = 'rgba(110,100,230,0.55)'; ctx.beginPath(); ctx.moveTo(x0, 0);
    for (let y = 0; y <= H; y += 60) ctx.lineTo(x0 - side * (b + 30 * Math.sin(y * 0.01 + t * 3)), y);
    ctx.lineTo(x0, H); ctx.closePath(); ctx.fill();
  }
  ctx.globalCompositeOperation = 'lighter';
  for (const o of ORBS2) { const x = o.x * W + Math.sin(t * 0.9 + o.ph) * 50, y = o.y * H + Math.cos(t * 0.7 + o.ph) * 30, r = o.r * (1 + 0.3 * Math.sin(t * 3 + o.ph));
    const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${o.hue},0.75)`); g.addColorStop(1, `rgba(${o.hue},0)`); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
  ctx.restore();
  GLANES.forEach(([gx, gy, ph], i) => {
    const k = clamp((t - CUE.breathe + 0.6 - i * 0.2) / 0.6) * w; if (k <= 0) return;
    const x = gx + Math.sin(t * 0.8 + ph) * 26, y = gy + Math.sin(t * 1.3 + ph) * 16, s = 1.5;
    reg('sprite', 'ghost' + i, x - 62 * s, y - 52 * s, x + 62 * s, y + 56 * s);
    ctx.save(); ctx.globalAlpha = k * 0.9; ctx.translate(x, y); ctx.scale(s, s); ICONS.ghost(t); ctx.restore();
  });
}
const ORBS2 = Array.from({ length: 12 }, (_, i) => ({ x: [0.1, 0.9, 0.2, 0.8, 0.35, 0.65][i % 6] + (R() - 0.5) * 0.06, y: [0.15, 0.2, 0.85, 0.8, 0.12, 0.9][i % 6], r: 24 + R() * 30, ph: R() * 6.28, hue: ['255,143,74', '143,216,230', '255,217,138', '200,120,255'][i % 4] }));










let LINES = {}, TAIL = 10;   // TAIL: end-screen seconds after the voice
const LN = id => LINES[id];
function W_(id, word, n = 0) {   // time of the n-th word in a line starting with `word`
  const L = LINES[id]; if (!L) return 0; const ws = WORDS.filter(w => w.s >= L.start - 0.15 && w.s <= L.end + 0.1);
  const opts = [].concat(word).map(x => x.toLowerCase());
  const hits = ws.filter(w => opts.some(o => w.w.toLowerCase().replace(/[^a-z0-9']/g, '').startsWith(o)));
  return hits.length ? hits[Math.min(n, hits.length - 1)].s : L.start;
}

// ---- defaults a topic file may override ----
function buildCues() {}
function drawCounter(t) {}
function hoursAt(t) { return 0; }
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

function chapterCard(t, title, idx, world, iconName, t0) {
  worldBG(t, world);
  reg('label', 'chapter', 360, 340, 1560, 760);
  LABELQ.push(() => {
    riseText(`PART ${idx}`, 960, 420, t0 + 0.05, t, { size: 34, color: TEAL, pill: false, ls: 8 });
    riseText(title.toUpperCase(), 960, 520, t0 + 0.2, t, { size: 84, weight: 700, color: WHITE, pill: false, ls: 5, dur: 0.8 });
    const k = popK(t, t0 + 0.4, 99); if (k > 0) { ctx.save(); ctx.translate(960, 680); ctx.scale(1.6 * k, 1.6 * k); drawIcon(iconName, t, {}); ctx.restore(); }
  });
}
let SECS = null;
// event log for sound design: first appearance of every icon / tag / label, and every section start
const EV = new Map();
{ const _pi = placeIcon, _tag = tag, _lab = label;
  placeIcon = (name, slots, s, t, t0, t1, o) => { EV.set('icon|' + name + '|' + t0.toFixed(2), { kind: 'icon', t: t0 }); return _pi(name, slots, s, t, t0, t1, o); };
  tag = (txt, x, y, t, t0, t1, bg, size) => { EV.set('tag|' + txt, { kind: 'tag', t: t0 }); return _tag(txt, x, y, t, t0, t1, bg, size); };
  label = (txt, x, y, t, t0, t1, color, size, o) => { EV.set('label|' + txt + '|' + t0.toFixed(1), { kind: 'label', t: t0 }); return _lab(txt, x, y, t, t0, t1, color, size, o); }; }
function sfx(name, t) { EV.set('sfx|' + name + '|' + t.toFixed(2), { kind: 'sfx:' + name, t }); }
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
      for (const b of BOX) if (b !== a && b.kind !== 'panel' && !(a.grp && a.grp === b.grp) && hitB(a, b)) AUDIT.log(`${a.name} overlaps ${b.kind} "${b.name}"`, t);
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
