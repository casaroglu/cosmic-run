// Low-poly props built from primitives, one per lyric noun. Every builder returns
// { obj, update(dt, kick) } where dt = seconds since the word is sung (negative before).
import * as THREE from 'three';

const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05, ...o });
const glow = color => new THREE.MeshBasicMaterial({ color });
function add(g, geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, s) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
  if (s) Array.isArray(s) ? m.scale.set(...s) : m.scale.setScalar(s);
  g.add(m); return m;
}
const S = (r, w = 16, h = 12) => new THREE.SphereGeometry(r, w, h);
const B = (x, y, z) => new THREE.BoxGeometry(x, y, z);
const C = (r1, r2, h, n = 16) => new THREE.CylinderGeometry(r1, r2, h, n);
const SKIN = 0xf2c6a0, BLACK = 0x161616, WHITE = 0xf7f7f7, ORANGE = 0xff8a1f;

export function textTexture(text, color = '#ff3df0', bg = 'rgba(0,0,0,0)', w = 512, h = 160) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, w, h);
  let fs = 120; x.font = `900 ${fs}px Inter, Arial, sans-serif`;
  while (x.measureText(text).width > w - 40 && fs > 30) { fs -= 6; x.font = `900 ${fs}px Inter, Arial, sans-serif`; }
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 24; x.fillStyle = color; x.fillText(text, w / 2, h / 2 + 4);
  x.shadowBlur = 0; x.fillStyle = '#ffffff'; x.globalAlpha = 0.55; x.fillText(text, w / 2, h / 2 + 4);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function eyes(g, x, y, z, r = 0.12, sep = 0.22) {
  for (const s of [-1, 1]) { add(g, S(r, 10, 8), std(WHITE), x + s * sep, y, z); add(g, S(r * 0.55, 8, 6), std(BLACK), x + s * sep, y, z + r * 0.7); }
}
function wheel(g, x, y, z, r = 0.35) { add(g, C(r, r, 0.25, 14), std(BLACK), x, y, z, 0, 0, Math.PI / 2); }

// ---------- city ----------
export function pizza(r = 1) {
  const g = new THREE.Group();
  add(g, C(r, r, r * 0.08, 40), std(0xffc23d, { emissive: 0x553300 }), 0, 0, 0, Math.PI / 2);
  add(g, new THREE.TorusGeometry(r, r * 0.08, 8, 40), std(0xd98a3a, { emissive: 0x331a00 }), 0, 0, 0);
  for (let i = 0; i < 9; i++) {
    const a = i * 2.4, d = r * (0.25 + 0.55 * ((i * 37) % 10) / 10);
    add(g, C(r * 0.13, r * 0.13, r * 0.03, 16), std(0xc7262b, { emissive: 0x330000 }), Math.cos(a) * d, Math.sin(a) * d, r * 0.05, Math.PI / 2);
  }
  for (let i = 0; i < 4; i++) add(g, B(r * 2, r * 0.012, r * 0.02), std(0xb06a20), 0, 0, r * 0.06, 0, 0, i * Math.PI / 4);
  return { obj: g, update(dt) { g.rotation.z = dt * 0.15; } };
}
export function pizzaMoon() { // emissive pizza for the night sky
  const p = pizza(60); p.obj.traverse(o => { if (o.material) o.material = new THREE.MeshBasicMaterial({ color: o.material.color.clone().multiplyScalar(1.15), fog: false }); });
  return { obj: p.obj, update(dt) { p.obj.rotation.z = dt * 0.03; } };
}
export function pigeon(s = 1) {
  const g = new THREE.Group(), grey = std(0x8a8fa0);
  add(g, S(0.35), grey, 0, 0, 0, 0, 0, 0, [1, 0.8, 1.4]);
  add(g, S(0.2), std(0x6d7488), 0, 0.3, 0.38); add(g, new THREE.ConeGeometry(0.06, 0.18, 8), std(ORANGE), 0, 0.28, 0.6, Math.PI / 2);
  eyes(g, 0, 0.38, 0.5, 0.05, 0.1);
  const wl = add(g, B(0.7, 0.04, 0.4), grey, -0.4, 0.1, 0), wr = add(g, B(0.7, 0.04, 0.4), grey, 0.4, 0.1, 0);
  g.scale.setScalar(s);
  return { obj: g, update(dt) { const f = Math.sin(dt * 18) * 0.7; wl.rotation.z = f; wr.rotation.z = -f; } };
}
export function taxi() {
  const g = new THREE.Group(), y = std(0xffcf1f, { metalness: 0.3, roughness: 0.3 });
  add(g, B(2.2, 0.8, 4.4), y, 0, 0.75, 0); add(g, B(1.9, 0.7, 2.3), y, 0, 1.5, -0.2);
  add(g, B(1.92, 0.5, 2.0), std(0x223344, { metalness: 0.6, roughness: 0.1 }), 0, 1.55, -0.2);
  for (const [x, z] of [[-1.05, 1.4], [1.05, 1.4], [-1.05, -1.4], [1.05, -1.4]]) wheel(g, x, 0.38, z, 0.4);
  const sign = add(g, B(0.9, 0.3, 0.3), new THREE.MeshBasicMaterial({ map: textTexture('TAXI', '#222', '#ffe14a', 256, 90) }), 0, 2.0, -0.2);
  const birds = [];
  for (let i = 0; i < 5; i++) { const b = pigeon(0.9); b.obj.position.set(-0.6 + i * 0.3, 2.25 + (i % 2) * 0.1, -1 + (i % 3) * 0.6); g.add(b.obj); birds.push(b); }
  for (const s of [-1, 1]) { const b = pigeon(0.8); b.obj.position.set(s * 1.0, 1.7, 0.3); b.obj.rotation.y = s * 1.3; g.add(b.obj); birds.push(b); }
  return { obj: g, update(dt, kick) { birds.forEach((b, i) => { b.update(dt + i); b.obj.position.y += Math.sin(dt * 9 + i) * 0.004; }); g.position.y = kick * 0.08; sign.scale.y = 1 + kick * 0.2; } };
}
export function grandma() {
  const g = new THREE.Group(), red = std(0xe8312f, { metalness: 0.4, roughness: 0.3 });
  add(g, B(0.6, 0.35, 2.0), red, 0, 0.55, 0); wheel(g, 0, 0.32, 0.8, 0.32); wheel(g, 0, 0.32, -0.8, 0.32);
  add(g, C(0.05, 0.05, 1.3), std(0x999999), 0, 1.2, 0.85, -0.25); add(g, B(0.9, 0.08, 0.08), std(BLACK), 0, 1.85, 1.0);
  add(g, new THREE.ConeGeometry(0.55, 1.4, 14), std(0x8e5bd6), 0, 1.35, -0.1);
  add(g, S(0.33), std(SKIN), 0, 2.25, 0); add(g, S(0.3), std(0xeeeeee), 0, 2.4, -0.15); add(g, S(0.17), std(0xeeeeee), 0, 2.62, -0.3);
  for (const s of [-1, 1]) add(g, new THREE.TorusGeometry(0.1, 0.025, 6, 16), std(BLACK), s * 0.13, 2.3, 0.3);
  const scarf = add(g, B(0.12, 0.08, 1.4), std(0x2fb8ff), 0, 1.95, -0.8);
  add(g, B(0.5, 0.06, 0.06), std(SKIN), 0, 1.8, 0.75);
  return { obj: g, update(dt) { scarf.rotation.x = Math.sin(dt * 14) * 0.25 - 0.2; g.rotation.z = Math.sin(dt * 3) * 0.08; } };
}
export function robot() {
  const g = new THREE.Group(), met = std(0xc9d1dc, { metalness: 0.8, roughness: 0.25 });
  add(g, B(1.2, 1.4, 0.8), met, 0, 1.6, 0); add(g, B(0.9, 0.7, 0.7), met, 0, 2.75, 0);
  const eyeM = glow(0x3df0ff); add(g, B(0.2, 0.12, 0.05), eyeM, -0.2, 2.8, 0.36); add(g, B(0.2, 0.12, 0.05), eyeM, 0.2, 2.8, 0.36);
  add(g, C(0.03, 0.03, 0.5), met, 0, 3.3, 0); const bulb = add(g, S(0.1), glow(0xff3d6b), 0, 3.6, 0);
  const legs = [-0.3, 0.3].map(x => add(g, B(0.3, 0.9, 0.3), met, x, 0.45, 0));
  const arms = [-1, 1].map(s => { const a = new THREE.Group(); a.position.set(s * 0.75, 2.2, 0); add(a, B(0.25, 1.1, 0.25), met, 0, -0.5, 0); g.add(a); return a; });
  return { obj: g, update(dt, kick) { arms[0].rotation.z = -0.4 - Math.max(0, Math.sin(dt * 6.4)) * 1.8; arms[1].rotation.z = 0.4 + Math.max(0, -Math.sin(dt * 6.4)) * 1.8; g.rotation.y = Math.sin(dt * 3.2) * 0.4; bulb.scale.setScalar(1 + kick); legs.forEach((l, i) => { l.position.y = 0.45 + Math.max(0, Math.sin(dt * 6.4 + i * Math.PI)) * 0.15; }); } };
}
export function discoTrain() {
  const g = new THREE.Group(), cols = [0xff3df0, 0x3df0ff, 0xffe14a];
  const lights = [];
  for (let i = 0; i < 3; i++) {
    const z = -i * 4.6;
    add(g, B(2.2, 1.8, 4.2), std(cols[i], { metalness: 0.4, roughness: 0.3 }), 0, 1.3, z);
    for (const x of [-1, 1]) for (const zz of [1.4, -1.4]) wheel(g, x * 1.12, 0.38, z + zz, 0.38);
    const l = add(g, B(2.25, 0.25, 4.25), new THREE.MeshBasicMaterial({ color: cols[(i + 1) % 3] }), 0, 2.0, z); lights.push(l);
  }
  add(g, B(2.2, 1.2, 1.5), std(0x333333), 0, 2.5, 1.2); add(g, C(0.3, 0.4, 1.2), std(0x222222), 0, 3.3, 1.6);
  const ball = add(g, S(0.9, 20, 14), std(0xffffff, { metalness: 1, roughness: 0.1, flatShading: true }), 0, 3.4, -4.6);
  return { obj: g, update(dt, kick) { ball.rotation.y = dt * 2; lights.forEach((l, i) => l.material.color.setHSL((dt * 0.3 + i / 3) % 1, 1, 0.3 + kick * 0.35)); } };
}
export function hotdog() {
  const g = new THREE.Group();
  add(g, new THREE.CapsuleGeometry(0.75, 2.6, 8, 16), std(0xc0472b), 0, 2.4, 0);
  for (const s of [-1, 1]) add(g, new THREE.CapsuleGeometry(0.55, 2.2, 8, 16), std(0xe9b46a), s * 0.75, 2.1, -0.25, 0, 0, 0, [1, 1, 0.7]);
  add(g, B(1.6, 1.1, 0.4), std(0x111111), 0, 1.6, 0.45); add(g, B(0.5, 0.9, 0.05), std(WHITE), 0, 1.75, 0.66);
  const bow = new THREE.Group(); bow.position.set(0, 2.3, 0.72); g.add(bow);
  add(bow, new THREE.ConeGeometry(0.22, 0.35, 4), std(BLACK), -0.17, 0, 0, 0, 0, Math.PI / 2); add(bow, new THREE.ConeGeometry(0.22, 0.35, 4), std(BLACK), 0.17, 0, 0, 0, 0, -Math.PI / 2);
  add(g, C(0.55, 0.55, 0.9), std(BLACK), 0, 4.55, 0); add(g, C(0.85, 0.85, 0.06), std(BLACK), 0, 4.1, 0);
  eyes(g, 0, 3.3, 0.68, 0.14, 0.26);
  add(g, new THREE.TorusGeometry(0.25, 0.05, 6, 16, Math.PI), std(BLACK), 0, 2.95, 0.72, 0, 0, Math.PI);
  const arm = new THREE.Group(); arm.position.set(0.95, 2.6, 0.2); g.add(arm);
  add(arm, C(0.1, 0.1, 1.2), std(BLACK), 0, 0.55, 0); add(arm, S(0.18), std(WHITE), 0, 1.2, 0);
  return { obj: g, update(dt) { arm.rotation.z = -0.4 + Math.sin(dt * 9) * 0.5; g.rotation.z = Math.sin(dt * 3) * 0.05; } };
}
export function noodleTunnel(len = 34) { // yellow noodle rings placed one by one along the track
  const m = std(0xffd75e, { emissive: 0x997700 }), pieces = [];
  for (let i = 0; i < 14; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.4 + (i % 3) * 0.3, 0.28, 8, 40), m);
    ring.scale.set(1, 1.1, 1); pieces.push({ obj: ring, d: i * len / 14 });
  }
  return { pieces, update(dt, kick) { pieces.forEach((p, i) => { p.obj.rotation.z = i * 0.7 + dt * (i % 2 ? 1 : -1); }); m.emissiveIntensity = 0.6 + kick; } };
}

// ---------- snow ----------
function sunglasses(g, y, z, w = 0.25) {
  for (const s of [-1, 1]) add(g, B(w, w * 0.6, 0.05), std(BLACK, { metalness: 0.6, roughness: 0.1 }), s * w * 0.62, y, z);
  add(g, B(w * 2.6, 0.04, 0.04), std(BLACK), 0, y + w * 0.2, z);
}
export function snowman() {
  const g = new THREE.Group(), snow = std(WHITE, { roughness: 0.9 });
  add(g, B(1.8, 0.3, 4.0), std(0x2fb8ff), 0, 0.6, 0); add(g, B(1.8, 0.3, 1.6), std(0x2fb8ff), 0, 1.2, -1.6, -0.9);
  for (const [x, z] of [[-0.8, 1.8], [0.8, 1.8], [-0.8, -1.8], [0.8, -1.8]]) add(g, C(0.06, 0.06, 0.6), std(0xdddddd), x, 0.3, z);
  const body = new THREE.Group(); body.position.set(0, 0.75, -0.3); body.rotation.x = -0.9; g.add(body);
  add(body, S(0.95), snow, 0, 0.7, 0); add(body, S(0.7), snow, 0, 1.85, 0); add(body, S(0.5), snow, 0, 2.8, 0);
  add(body, new THREE.ConeGeometry(0.1, 0.6, 10), std(ORANGE), 0, 2.8, 0.75, Math.PI / 2); sunglasses(body, 2.95, 0.46, 0.2);
  add(g, C(0.9, 0.9, 0.04, 24), std(0xff6fae), 1.8, 2.8, 0.2, 0.3, 0, 0.3); add(g, C(0.04, 0.04, 2.8), std(WHITE), 1.65, 1.4, 0.1, 0.1);
  add(g, C(0.3, 0.3, 0.2), std(0xffd23b), -1.3, 1.0, 0.5);
  return { obj: g, update(dt) { body.rotation.z = Math.sin(dt * 2) * 0.05; } };
}
export function penguin() {
  const g = new THREE.Group();
  add(g, B(0.7, 0.08, 2.0), std(0xff3d6b), 0, 0.3, 0); for (const z of [-0.7, 0.7]) for (const x of [-0.3, 0.3]) wheel(g, x, 0.15, z, 0.12);
  const p = new THREE.Group(); p.position.y = 0.35; g.add(p);
  add(p, S(0.55), std(0x1c1c28), 0, 0.85, 0, 0, 0, 0, [1, 1.5, 1]); add(p, S(0.45), std(WHITE), 0, 0.8, 0.18, 0, 0, 0, [0.9, 1.3, 0.8]);
  add(p, S(0.38), std(0x1c1c28), 0, 1.85, 0); add(p, new THREE.ConeGeometry(0.1, 0.35, 8), std(ORANGE), 0, 1.8, 0.45, Math.PI / 2);
  eyes(p, 0, 1.95, 0.3, 0.09, 0.15);
  for (const s of [-1, 1]) add(p, B(0.25, 0.05, 0.4), std(ORANGE), s * 0.22, 0.02, 0.1);
  const wings = [-1, 1].map(s => add(p, B(0.12, 0.9, 0.4), std(0x1c1c28), s * 0.6, 0.9, 0));
  add(p, C(0.4, 0.4, 0.06, 20), std(0xff3df0), 0, 2.18, 0); add(p, C(0.25, 0.3, 0.3, 20), std(0xff3df0), 0, 2.3, 0);
  return { obj: g, update(dt) { wings[0].rotation.z = 0.5 + Math.sin(dt * 10) * 0.6; wings[1].rotation.z = -0.5 - Math.sin(dt * 10) * 0.6; p.rotation.z = Math.sin(dt * 4) * 0.15; } };
}
export function icicleArch() {
  const g = new THREE.Group(), ice = new THREE.MeshStandardMaterial({ color: 0xbfeaff, emissive: 0x3aa8ff, emissiveIntensity: 0.4, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.9 });
  const arch = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.35, 10, 40, Math.PI), ice); arch.position.y = -0.4; g.add(arch);
  const cones = [];
  for (let i = 0; i < 13; i++) { const a = Math.PI * (i + 0.5) / 13; const c = add(g, new THREE.ConeGeometry(0.18, 1.2 + (i % 3) * 0.5, 8), ice, Math.cos(a) * 3.9, Math.sin(a) * 3.9 - 1.2, 0, Math.PI); cones.push(c); }
  return { obj: g, track: true, update(dt, kick) { ice.emissiveIntensity = 0.3 + kick * 1.6; cones.forEach((c, i) => { c.rotation.z = Math.sin(dt * 20 + i) * 0.08 * kick; }); } };
}
export function yeti() {
  const g = new THREE.Group(), fur = std(0xf4f6ff, { roughness: 1, flatShading: true });
  add(g, new THREE.IcosahedronGeometry(1.3, 1), fur, 0, 1.6, 0, 0, 0, 0, [1, 1.3, 0.9]);
  add(g, new THREE.IcosahedronGeometry(0.75, 1), fur, 0, 3.3, 0);
  add(g, C(1.28, 1.35, 1.8, 20), std(0xff8fc8), 0, 1.4, 0); add(g, new THREE.TorusGeometry(1.3, 0.1, 6, 24), std(0xffffff), 0, 1.4, 0, Math.PI / 2);
  add(g, B(0.9, 0.55, 0.2), std(0xb8c8f0), 0, 3.25, 0.68); eyes(g, 0, 3.4, 0.75, 0.11, 0.2);
  add(g, new THREE.TorusGeometry(0.15, 0.04, 6, 12, Math.PI), std(BLACK), 0, 3.12, 0.8, 0, 0, Math.PI);
  const arm = new THREE.Group(); arm.position.set(0.95, 2.6, 0); g.add(arm);
  add(arm, new THREE.CapsuleGeometry(0.28, 0.9, 6, 10), fur, 0, 0.45, 0); add(arm, B(0.2, 0.45, 0.1), std(0x222222), -0.2, 1.05, 0.25);
  arm.rotation.z = 0.9;
  return { obj: g, update(dt) { g.rotation.y = Math.sin(dt * 1.5) * 0.3; arm.rotation.z = 0.9 + Math.sin(dt * 4) * 0.08; } };
}
export function cocoaRiver(len = 120) {
  const g = new THREE.Group();
  const r = add(g, B(14, 0.2, len), std(0x6b3a1e, { roughness: 0.25, emissive: 0x1a0a00 }), 0, 0.3, -len / 2 + 15);
  const mm = std(WHITE, { roughness: 0.9 }), bits = [];
  for (let i = 0; i < 40; i++) bits.push(add(g, B(0.9, 0.9, 0.9), mm, (Math.sin(i * 12.9) * 6), 0.6, -len / 2 + 15 + (i / 40 - 0.5) * len));
  return { obj: g, ground: true, update(dt) { bits.forEach((b, i) => { b.position.y = 0.6 + Math.sin(dt * 2 + i) * 0.15; b.rotation.y = dt * 0.5 + i; }); } };
}
export function reindeer() {
  const g = new THREE.Group();
  add(g, B(1.4, 0.6, 3.2), std(0x2fd17a, { metalness: 0.3, roughness: 0.3 }), 0, 0.4, 0); add(g, new THREE.ConeGeometry(0.7, 1.2, 4), std(0x2fd17a), 0, 0.4, 2.0, Math.PI / 2, Math.PI / 4);
  add(g, C(0.05, 0.05, 0.9), std(0x888888), 0, 1.1, 1.0, -0.4); add(g, B(1.0, 0.07, 0.07), std(BLACK), 0, 1.5, 1.2);
  const d = new THREE.Group(); d.position.set(0, 0.7, 0); g.add(d);
  const fur = std(0x8a5a35);
  add(d, new THREE.CapsuleGeometry(0.45, 0.9, 6, 12), fur, 0, 0.8, 0, 0.3); add(d, S(0.4), fur, 0, 1.75, 0.35); add(d, S(0.22), fur, 0, 1.65, 0.75);
  add(d, S(0.11), glow(0xff2a2a), 0, 1.7, 0.95); eyes(d, 0, 1.9, 0.6, 0.08, 0.16);
  for (const s of [-1, 1]) { const a = new THREE.Group(); a.position.set(s * 0.25, 2.1, 0.3); d.add(a); add(a, C(0.04, 0.04, 0.8), std(0x5a3a20), 0, 0.4, 0, 0, 0, -s * 0.4); add(a, C(0.03, 0.03, 0.4), std(0x5a3a20), s * 0.25, 0.6, 0, 0, 0, -s * 1.2); }
  sunglasses(d, 1.88, 0.72, 0.13);
  const spray = []; for (let i = 0; i < 10; i++) spray.push(add(g, S(0.18, 6, 4), std(WHITE), 0, 0.3, -1.8));
  return { obj: g, update(dt) { g.rotation.z = Math.sin(dt * 5) * 0.12; g.position.y = Math.abs(Math.sin(dt * 5)) * 0.2; spray.forEach((s, i) => { const k = ((dt * 2 + i / 10) % 1); s.position.set((i % 2 ? 1 : -1) * k * 1.6, 0.3 + k * 1.4 - k * k * 1.6, -1.8 - k * 2.5); s.scale.setScalar(1 - k * 0.7); }); } };
}
export function polarBear() {
  const g = new THREE.Group(), fur = std(0xfafaf2, { roughness: 1 });
  add(g, S(1.4, 18, 14), fur, 0, 1.3, 0, 0, 0, 0, [1, 1.1, 0.9]); add(g, S(0.8), fur, 0, 2.9, 0.2); add(g, S(0.38), fur, 0, 2.75, 0.85, 0, 0, 0, [1, 0.8, 1]);
  add(g, S(0.12), std(BLACK), 0, 2.85, 1.18); for (const s of [-1, 1]) add(g, S(0.25), fur, s * 0.6, 3.6, 0.1);
  eyes(g, 0, 3.15, 0.75, 0.1, 0.26);
  add(g, new THREE.TorusGeometry(0.3, 0.06, 6, 16, Math.PI), std(BLACK), 0, 2.6, 1.05, 0, 0, Math.PI);
  const n1 = add(g, C(0.04, 0.04, 1.4), std(0xd9a441), -0.35, 1.9, 1.1, 0.6, 0, 0.6), n2 = add(g, C(0.04, 0.04, 1.4), std(0xd9a441), 0.35, 1.9, 1.1, 0.6, 0, -0.6);
  const scarf = []; for (let i = 0; i < 12; i++) scarf.push(add(g, B(0.7, 0.18, 0.05), std(i % 2 ? 0xff3d3d : 0xffffff), 0, 1.6 - i * 0.18, 1.2 + i * 0.02));
  add(g, S(0.35), std(0x3d7dff, { roughness: 1 }), 0.9, 0.3, 1.0);
  return { obj: g, update(dt) { n1.rotation.z = 0.6 + Math.sin(dt * 12) * 0.2; n2.rotation.z = -0.6 - Math.sin(dt * 12 + 1) * 0.2; g.rotation.y = Math.sin(dt * 1.2) * 0.2; } };
}
export function bed() {
  const g = new THREE.Group();
  add(g, B(2.6, 0.6, 4.2), std(0x8a5a35), 0, 0.5, 0); add(g, B(2.6, 1.6, 0.25), std(0x8a5a35), 0, 1.1, -2.1);
  add(g, B(2.4, 0.35, 4.0), std(0xffffff), 0, 0.95, 0); add(g, B(2.45, 0.4, 2.6), std(0x6f7dff), 0, 1.05, 0.7);
  add(g, B(1.2, 0.35, 0.7), std(0xffe9f4), 0, 1.25, -1.6);
  const z = add(g, new THREE.PlaneGeometry(2.4, 0.8), new THREE.MeshBasicMaterial({ map: textTexture('Zzz', '#9fd8ff'), transparent: true, side: THREE.DoubleSide }), 0, 3.0, -1.2);
  return { obj: g, update(dt) { z.position.y = 3 + Math.sin(dt * 2) * 0.3; } };
}
export function sign(text, color = '#ff3df0') { // neon word sign, the fallback for any keyword
  const g = new THREE.Group();
  add(g, B(6.2, 2.2, 0.3), std(0x111118), 0, 3.5, -0.2);
  const face = add(g, new THREE.PlaneGeometry(6, 2), new THREE.MeshBasicMaterial({ map: textTexture(text, color, '#111118'), side: THREE.DoubleSide }), 0, 3.5, 0);
  for (const x of [-2.4, 2.4]) add(g, C(0.12, 0.12, 2.6), std(0x444444), x, 1.2, -0.2);
  return { obj: g, update(dt, kick) { face.material.color.setScalar(0.55 + kick * 0.45); } };
}

// ---------- hotel rooms ----------
export function llama() {
  const g = new THREE.Group(), wool = std(0xf3e6cf, { roughness: 1, flatShading: true }), suit = std(0x23263a);
  add(g, B(1.0, 1.3, 0.7), suit, 0, 1.55, 0); add(g, B(0.3, 0.9, 0.05), std(WHITE), 0, 1.7, 0.36);
  add(g, new THREE.ConeGeometry(0.1, 0.5, 4), std(0xd8262f), 0, 1.75, 0.4, Math.PI, 0, 0);
  for (const x of [-0.25, 0.25]) add(g, B(0.3, 0.9, 0.35), suit, x, 0.45, 0);
  add(g, C(0.22, 0.26, 1.1, 10), wool, 0, 2.7, 0.15); const head = new THREE.Group(); head.position.set(0, 3.3, 0.25); g.add(head);
  add(head, B(0.5, 0.45, 0.8), wool, 0, 0, 0.15); eyes(head, 0, 0.1, 0.45, 0.08, 0.16);
  for (const x of [-0.18, 0.18]) add(head, new THREE.ConeGeometry(0.08, 0.35, 6), wool, x, 0.38, -0.05);
  add(head, B(0.2, 0.06, 0.05), std(0x6b4a3a), 0, -0.12, 0.56);
  const arm = new THREE.Group(); arm.position.set(0.6, 2.0, 0); g.add(arm); add(arm, B(0.25, 0.9, 0.25), suit, 0, -0.35, 0);
  add(arm, C(0.25, 0.25, 0.35, 12), std(BLACK), 0, 0.25, 0.1); // a top hat in hand
  return { obj: g, update(dt) { head.rotation.z = Math.sin(dt * 3) * 0.15; arm.rotation.z = 0.4 + Math.max(0, Math.sin(dt * 4)) * 1.4; } };
}
export function catBand(n = 7) {
  const g = new THREE.Group(), cols = [0xff9f43, 0x555555, 0xffffff, 0x222222, 0xc98b5a, 0xffd5a8, 0x9a9a9a], cats = [];
  for (let i = 0; i < n; i++) {
    const c = new THREE.Group(), fur = std(cols[i % cols.length]);
    c.position.set((i - (n - 1) / 2) * 0.62, (i % 2) * 0.35, -(i % 2) * 0.5); g.add(c);
    add(c, S(0.3), fur, 0, 0.35, 0, 0, 0, 0, [1, 1.2, 0.9]); add(c, S(0.24), fur, 0, 0.85, 0.05);
    for (const x of [-0.13, 0.13]) add(c, new THREE.ConeGeometry(0.08, 0.18, 4), fur, x, 1.08, 0.05);
    eyes(c, 0, 0.9, 0.24, 0.06, 0.09);
    add(c, C(0.025, 0.025, 0.6, 8), std(0xd9d9e6, { metalness: 0.8, roughness: 0.2 }), 0.18, 0.75, 0.3, 0, 0, Math.PI / 2 - 0.3);
    add(c, C(0.04, 0.02, 0.5, 6), fur, 0, 0.3, -0.3, 0.9); cats.push(c);
  }
  return { obj: g, update(dt, kick) { cats.forEach((c, i) => { c.rotation.z = Math.sin(dt * 6.5 + i) * 0.12; c.position.y = (i % 2) * 0.35 + kick * 0.06; }); } };
}
export function ghostBaker() {
  const g = new THREE.Group(), ghostM = new THREE.MeshStandardMaterial({ color: 0xf4f8ff, emissive: 0x8899bb, transparent: true, opacity: 0.88 });
  const gh = new THREE.Group(); gh.position.set(-0.5, 0, 0); g.add(gh);
  add(gh, S(0.7, 18, 14), ghostM, 0, 2.1, 0); add(gh, C(0.7, 0.85, 1.3, 18, 1, true), ghostM, 0, 1.4, 0);
  for (const x of [-0.24, 0.24]) add(gh, new THREE.CapsuleGeometry(0.07, 0.15, 4, 8), std(BLACK), x, 2.25, 0.62);
  add(gh, S(0.13), std(BLACK), 0, 1.9, 0.66, 0, 0, 0, [1, 1.4, 0.5]);
  add(gh, C(0.45, 0.5, 0.5, 16), std(WHITE), 0, 2.85, 0); add(gh, S(0.42), std(WHITE), 0, 3.15, 0, 0, 0, 0, [1.2, 0.7, 1.2]);
  add(g, B(1.3, 1.3, 1.1), std(0xb8b8c2, { metalness: 0.5, roughness: 0.4 }), 0.9, 0.65, -0.1);
  const glowM = glow(0xff8a2a); add(g, B(0.9, 0.5, 0.05), glowM, 0.9, 0.7, 0.46);
  const loaf = add(g, new THREE.CapsuleGeometry(0.22, 0.5, 6, 12), std(0xc98b3a), -0.1, 1.55, 0.6, 0, 0, Math.PI / 2);
  return { obj: g, update(dt, kick) { gh.position.y = Math.sin(dt * 2.2) * 0.2; loaf.position.y = 1.55 + Math.sin(dt * 2.2) * 0.2; glowM.color.setHSL(0.07, 1, 0.45 + kick * 0.2); } };
}
export function cactusYoga() {
  const g = bed().obj; g.scale.setScalar(0.8);
  const cm = std(0x3fae49), c = new THREE.Group(); c.position.set(0, 1.1, 0.2); g.add(c);
  add(c, new THREE.CapsuleGeometry(0.35, 1.3, 6, 12), cm, 0, 1.0, 0);
  const armL = new THREE.Group(), armR = new THREE.Group(); armL.position.set(-0.35, 1.2, 0); armR.position.set(0.35, 1.2, 0); c.add(armL, armR);
  add(armL, new THREE.CapsuleGeometry(0.15, 0.6, 4, 8), cm, -0.3, 0, 0, 0, 0, Math.PI / 2); add(armR, new THREE.CapsuleGeometry(0.15, 0.6, 4, 8), cm, 0.3, 0, 0, 0, 0, Math.PI / 2);
  eyes(c, 0, 1.5, 0.32, 0.07, 0.13); add(c, B(0.04, 0.04, 0.04), std(BLACK), 0, 1.25, 0.34);
  add(c, C(0.18, 0.18, 0.1, 10), std(0xff5fa2), 0, 1.95, 0); add(g, B(1.6, 0.04, 2.6), std(0x8a5bd6), 0, 1.18, 0.1);
  return { obj: g, update(dt) { const k = Math.sin(dt * 1.6); armL.rotation.z = 0.9 + k * 0.6; armR.rotation.z = -0.9 - k * 0.6; c.rotation.z = k * 0.2; } };
}
export function grandpaTrampoline() {
  const g = new THREE.Group();
  add(g, new THREE.TorusGeometry(1.2, 0.08, 6, 30), std(0x2f6bff), 0, 0.6, 0, Math.PI / 2); add(g, C(1.2, 1.2, 0.03, 30), std(BLACK), 0, 0.58, 0);
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; add(g, C(0.04, 0.04, 0.6, 6), std(0x888888), Math.cos(a) * 1.15, 0.3, Math.sin(a) * 1.15); }
  const p = new THREE.Group(); g.add(p);
  add(p, B(0.6, 0.8, 0.4), std(0xd9c07a), 0, 1.2, 0); add(p, B(0.6, 0.5, 0.42), std(0x7a5a3a), 0, 0.6, 0);
  add(p, S(0.28), std(SKIN), 0, 1.85, 0); add(p, S(0.3, 12, 8), std(0xeeeeee), 0, 1.92, -0.05, 0, 0, 0, [1, 0.5, 1]);
  add(p, B(0.4, 0.12, 0.1), std(0xffffff), 0, 1.72, 0.25); for (const s of [-1, 1]) add(p, new THREE.TorusGeometry(0.08, 0.02, 6, 12), std(BLACK), s * 0.1, 1.9, 0.27);
  const arms = [-1, 1].map(s => { const a = new THREE.Group(); a.position.set(s * 0.38, 1.5, 0); p.add(a); add(a, B(0.15, 0.6, 0.15), std(0xd9c07a), 0, 0.25, 0); return a; });
  return { obj: g, update(dt) { const b = Math.abs(Math.sin(dt * 4.1)); p.position.y = b * 1.4; arms[0].rotation.z = -2.5 + b; arms[1].rotation.z = 2.5 - b; p.rotation.y = dt * 1.5; } };
}
export function sharkSub() {
  const g = new THREE.Group(), y = std(0xffd23b, { metalness: 0.4, roughness: 0.3 });
  add(g, new THREE.CapsuleGeometry(0.8, 1.8, 8, 16), y, 0, 1.2, 0, 0, 0, Math.PI / 2); add(g, C(0.35, 0.35, 0.6, 12), y, 0, 2.1, 0);
  add(g, C(0.05, 0.05, 0.5), std(0x555555), 0.15, 2.6, 0);
  const win = add(g, C(0.45, 0.45, 0.1, 20), std(0x9fdcff, { transparent: true, opacity: 0.35 }), 0.2, 1.25, 0.75, Math.PI / 2);
  const shark = new THREE.Group(); shark.position.set(0.2, 1.2, 0.45); g.add(shark);
  add(shark, S(0.38), std(0x7d8fa3), 0, 0, 0, 0, 0, 0, [1.2, 1, 0.9]); add(shark, B(0.4, 0.05, 0.05), std(WHITE), 0, -0.15, 0.32);
  eyes(shark, 0, 0.12, 0.3, 0.07, 0.17); add(shark, new THREE.ConeGeometry(0.15, 0.35, 4), std(0x7d8fa3), 0, 0.42, 0);
  const prop = add(g, B(0.08, 0.7, 0.15), std(0x888888), -1.75, 1.2, 0);
  const bubbles = []; for (let i = 0; i < 6; i++) bubbles.push(add(g, S(0.08, 8, 6), std(WHITE, { transparent: true, opacity: 0.6 }), -1.6, 1.4, 0));
  return { obj: g, update(dt) { prop.rotation.x = dt * 12; g.rotation.z = Math.sin(dt * 1.5) * 0.05; shark.rotation.y = Math.sin(dt * 2) * 0.4; bubbles.forEach((b, i) => { const k = (dt * 0.6 + i / 6) % 1; b.position.set(-1.6 - k * 0.3, 1.4 + k * 1.6, Math.sin(i) * 0.2); }); } };
}
export function dinoCake() {
  const g = new THREE.Group(), gm = std(0x56c45a);
  add(g, S(0.8), gm, 0, 1.2, 0, 0, 0, 0, [1, 1.1, 1.2]); add(g, C(0.3, 0.4, 1.0, 12), gm, 0, 2.1, 0.3, 0.4);
  const head = new THREE.Group(); head.position.set(0, 2.65, 0.55); g.add(head);
  add(head, B(0.6, 0.5, 0.8), gm, 0, 0, 0.1); eyes(head, 0, 0.18, 0.35, 0.09, 0.18);
  add(head, new THREE.TorusGeometry(0.18, 0.04, 6, 12, Math.PI), std(BLACK), 0, -0.1, 0.51, 0, 0, Math.PI);
  for (let i = 0; i < 5; i++) add(g, new THREE.ConeGeometry(0.12, 0.3, 4), std(0xff7a3d), 0, 2.0 - i * 0.35, -0.55 - i * 0.12 + 0.3);
  add(g, C(0.15, 0.05, 1.2, 8), gm, 0, 0.8, -1.2, -1.2); for (const x of [-0.45, 0.45]) add(g, C(0.22, 0.25, 0.7, 10), gm, x, 0.35, 0.1);
  const cake = new THREE.Group(); cake.position.set(0.9, 0, 0.9); g.add(cake);
  add(cake, C(0.25, 0.25, 0.8, 8), std(0x8a5a35), 0, 0.4, 0); add(cake, C(0.5, 0.5, 0.35, 20), std(0xff8fc8), 0, 0.95, 0); add(cake, C(0.38, 0.38, 0.3, 20), std(0xffffff), 0, 1.27, 0);
  const flames = []; for (let i = 0; i < 3; i++) { add(cake, C(0.03, 0.03, 0.25, 6), std(0x3dafff), (i - 1) * 0.15, 1.53, 0); flames.push(add(cake, S(0.05, 8, 6), glow(0xffb020), (i - 1) * 0.15, 1.7, 0)); }
  return { obj: g, update(dt, kick) { head.rotation.y = -0.3 + Math.sin(dt * 2) * 0.3; flames.forEach((f, i) => f.scale.setScalar(1 + Math.sin(dt * 20 + i) * 0.3 + kick * 0.5)); } };
}
export function discoRoom() {
  const g = new THREE.Group();
  const ball = add(g, S(0.6, 20, 14), std(0xffffff, { metalness: 1, roughness: 0.05, flatShading: true }), 0, 2.6, 0); add(g, C(0.02, 0.02, 0.6), std(0x888888), 0, 3.2, 0);
  const tiles = [];
  for (let x = -2; x <= 2; x++) for (let z = -2; z <= 1; z++) tiles.push(add(g, B(0.78, 0.05, 0.78), new THREE.MeshBasicMaterial({ color: 0xffffff }), x * 0.8, 0.03, z * 0.8));
  const dancers = [];
  for (let i = 0; i < 3; i++) { const d = new THREE.Group(); d.position.set((i - 1) * 1.1, 0, -0.3); g.add(d); const col = [0xff3df0, 0x3df0ff, 0xffe14a][i];
    add(d, new THREE.ConeGeometry(0.4, 1.3, 10), std(col), 0, 0.75, 0); add(d, S(0.25), std(SKIN), 0, 1.6, 0); add(d, S(0.27, 10, 8), std([0x3a2a1a, 0xffd23b, 0x111111][i]), 0, 1.72, -0.05, 0, 0, 0, [1, 0.8, 1]);
    const a = new THREE.Group(); a.position.set(0.3, 1.25, 0); d.add(a); add(a, B(0.1, 0.6, 0.1), std(SKIN), 0, 0.3, 0); dancers.push({ d, a }); }
  return { obj: g, update(dt, kick) { ball.rotation.y = dt * 1.5; tiles.forEach((t, i) => t.material.color.setHSL(((i * 0.13 + Math.floor(dt * 2.07)) * 0.618) % 1, 1, 0.25 + kick * 0.35));
    dancers.forEach(({ d, a }, i) => { d.position.y = Math.abs(Math.sin(dt * 6.5 + i)) * 0.25; a.rotation.z = Math.sin(dt * 6.5 + i) * 1.2 - 0.6; d.rotation.y = Math.sin(dt * 3.2 + i) * 0.6; }); } };
}

export const BUILDERS = { pizza, pizzaMoon, pigeon, taxi, grandma, robot, discoTrain, hotdog, noodleTunnel, snowman, penguin, icicleArch, yeti, cocoaRiver, reindeer, polarBear, bed, sign, llama, catBand, ghostBaker, cactusYoga, grandpaTrampoline, sharkSub, dinoCake, discoRoom };
