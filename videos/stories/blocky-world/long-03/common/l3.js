// Long 3 · shared props and characters (Zubbit craze). All invented; no real brands.
import * as THREE from "three";
import { blocky, drawFace } from "../blocky/rig.js";
export const INK = "#221a26";
export const F = (px, w = 900) => `${w} ${px}px CizgiFont, Nunito, sans-serif`;
export const cv = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
/** a canvas texture you can redraw: set(key, draw) only redraws when key changes */
export const live = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; let k = null; return { tex: t, set(key, draw) { if (key === k) return; k = key; const g = c.getContext("2d"); g.clearRect(0, 0, w, h); draw(g, w, h); t.needsUpdate = true; } }; };
let SD = 5; export const rnd = () => (SD = (SD * 16807) % 2147483647) / 2147483647; export const reseed = (s) => (SD = s);
const fitText = (g, txt, maxW, px, wgt = 900) => { let s = px; g.font = F(s, wgt); while (g.measureText(txt).width > maxW && s > 8) { s -= 2; g.font = F(s, wgt); } return s; };

// ---------------- ZUBBIT (grey / gold / fake ZUBBLT) ----------------
/** kind: grey | gold | fake. Pivot = top of the clip (hang point). returns group with userData {body, horns[], teeth[], tag, paint(k)} */
export function zubbit(E, kind = "grey", o = {}) {
  const g = E.group(o.parent || null, [0, -50, 0]), dark = E.mat(INK);
  const b = E.group(g, [0, -0.25, 0]); g.userData.b = b;
  const bodyM = kind === "gold" ? E.mat("#ffc21a", { emissive: "#5a3a00" }) : kind === "fake" ? E.mat("#d9a521").clone() : E.mat("#9a9aa6");
  E.box(0.26, 0.22, 0.22, bodyM, [0, 0, 0], { parent: b, center: true }); E.box(0.22, 0.24, 0.18, bodyM, [0, 0, 0], { parent: b, center: true });
  const eyeY = kind === "fake" ? [0.055, 0.0] : [0.035, 0.035];
  [-1, 1].forEach((s, i) => E.box(0.05, 0.05, 0.02, dark, [s * 0.085, eyeY[i], 0.112], { parent: b, center: true, noShadow: true }));
  E.box(0.13, 0.012, 0.01, dark, [0, -0.035, 0.112], { parent: b, center: true, noShadow: true });
  const teeth = [];
  if (kind === "gold") { const d = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.013, 6, 12), E.mat("#ff7fb8")); d.position.set(0, -0.07, 0.12); E.add(d, b); const d2 = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.014, 6, 12), E.mat("#e7b06a")); d2.position.set(0, -0.07, 0.115); E.add(d2, b); teeth.push(d); }
  else if (kind === "fake") { for (const x of [-0.035, 0.035]) teeth.push(E.box(0.045, 0.06, 0.02, E.mat("#f4f0d8"), [x, -0.068, 0.115], { parent: b, center: true, noShadow: true })); }
  else teeth.push(E.box(0.055, 0.06, 0.02, E.mat("#ffffff"), [0, -0.068, 0.115], { parent: b, center: true, noShadow: true }));
  const hl = kind === "fake" ? [0.03, 0.09, 0.055] : [0.06, 0.06, 0.06];
  const horns = [-0.07, 0, 0.07].map((x, i) => E.box(0.04, hl[i], 0.04, bodyM, [x, 0.12 + hl[i] / 2, 0], { parent: b, center: true }));
  E.box(0.03, 0.03, 0.08, bodyM, [0, -0.06, -0.15], { parent: b, center: true }); E.box(0.03, 0.05, 0.015, E.mat("#d8d8e0"), [0, -0.08, -0.2], { parent: b, center: true, noShadow: true });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 6, 14, Math.PI * 1.7), E.mat(kind === "gold" ? "#ffe14a" : "#19e0c6")); ring.position.set(0, 0.2, 0); E.add(ring, b);
  g.userData.kind = kind; g.userData.body = bodyM; g.userData.horns = horns; g.userData.teeth = teeth; g.userData.hl = hl;
  g.userData.hornRest = horns.map((h) => h.position.clone()); g.userData.toothRest = teeth.map((t) => t.position.clone());
  g.userData.paint = (k) => { if (kind === "fake") bodyM.color.set("#d9a521").lerp(new THREE.Color("#9a9aa6"), k); };
  return g;
}
/** paper price tag hanging from a zubbit: front text, back text */
export function tag(E, parent, front, back, o = {}) {
  const g = E.group(parent, o.pos || [0.12, -0.2, 0.05]); const s = o.s || 1;
  E.cyl(0.003, 0.003, 0.08, E.mat("#ffffff"), [0, 0, 0], { parent: g, seg: 4 });
  const draw = (txt) => cv(256, 160, (c, w, h) => { c.fillStyle = "#fffbe6"; c.fillRect(0, 0, w, h); c.strokeStyle = INK; c.lineWidth = 8; c.strokeRect(4, 4, w - 8, h - 8); c.fillStyle = "#c8c0a0"; c.beginPath(); c.arc(28, 28, 12, 0, 7); c.fill(); c.textAlign = "center"; c.textBaseline = "middle"; c.fillStyle = INK;
    if (Array.isArray(txt)) { fitText(c, txt[0], w - 40, 58); c.fillText(txt[0], w / 2, 62); c.strokeStyle = "#e0262e"; c.lineWidth = 8; c.beginPath(); c.moveTo(30, 66); c.lineTo(w - 30, 54); c.stroke(); c.fillStyle = "#e0262e"; fitText(c, txt[1], w - 40, 64); c.fillText(txt[1], w / 2, 124); }
    else { fitText(c, txt, w - 30, 74); c.fillText(txt, w / 2, h / 2 + 4); } });
  const card = E.group(g, [0, -0.01, 0]);
  E.plane(0.16 * s, 0.1 * s, E.mat("#ffffff", { map: draw(front) }), [0, -0.05 * s, 0.002], { parent: card, noShadow: true });
  const bk = E.plane(0.16 * s, 0.1 * s, E.mat("#ffffff", { map: draw(back) }), [0, -0.05 * s, -0.002], { parent: card, noShadow: true }); bk.rotation.y = Math.PI;
  g.userData.card = card; return g;
}
export const qTex = () => cv(256, 256, (g, w, h) => { g.fillStyle = "#8a3ad8"; g.fillRect(0, 0, w, h); g.fillStyle = "#ffffff"; g.font = F(200); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("?", w / 2, h / 2 + 10); for (const x of [-50, 0, 50]) g.fillRect(w / 2 + x - 10, 14, 20, 28); });
let QT = null;
export function mysteryBox(E, o = {}) { QT = QT || qTex(); const g = E.group(o.parent || null, [0, -50, 0]), m = E.mat("#8a3ad8"), f = E.mat("#ffffff", { map: QT }); E.box(0.32, 0.3, 0.32, [m, m, m, m, f, m], [0, 0, 0], { parent: g, center: true }); const lid = E.group(g, [0, 0.15, -0.16]); E.box(0.34, 0.04, 0.34, E.mat("#a85af0"), [0, 0.02, 0.16], { parent: lid, center: true }); g.userData.lid = lid; return g; }
/** giant silver carabiner, long axis = local y, from 0 (top) to -L */
export function carabiner(E, L = 0.9, o = {}) {
  const g = E.group(o.parent || null, [0, -50, 0]), m = E.mat("#d8dde6", { emissive: "#2a2e38" }), r = 0.06;
  const w = L * 0.42; const a = new THREE.Mesh(new THREE.TorusGeometry(w / 2, r, 8, 16, Math.PI), m); a.position.set(0, -w / 2, 0); a.rotation.z = 0; E.add(a, g);
  const bt = new THREE.Mesh(new THREE.TorusGeometry(w / 2, r, 8, 16, Math.PI), m); bt.position.set(0, -L + w / 2, 0); bt.rotation.z = Math.PI; E.add(bt, g);
  E.box(r * 2, L - w, r * 2, m, [-w / 2, -L + w / 2, 0], { parent: g }); const gate = E.box(r * 1.6, L - w, r * 1.6, E.mat("#a8b0bc"), [w / 2, -L + w / 2, 0], { parent: g });
  g.userData.gate = gate; return g;
}

// ---------------- Toast / Donutsaurus extras ----------------
/** gold hands, coin pupils, hoodie-string clip spot, red backpack, paper moustache, ticket on forehead */
export function toastExtras(E, T) {
  const X = {}; const gold = E.mat("#ffc21a", { emissive: "#5a3a00" }); const skin = [];
  T.elbows.forEach((e) => e.children.forEach((m) => { if (m.isMesh && m.geometry.parameters && Math.abs(m.geometry.parameters.height - 0.17) < 1e-3) skin.push([m, m.material]); }));
  X.goldHands = (on) => skin.forEach(([m, mat]) => (m.material = on ? gold : mat));
  X.coins = T.popEyes.map((pe) => { const c = E.cyl(0.075, 0.075, 0.03, E.mat("#ffc21a", { emissive: "#6a4a00" }), [0, -0.07, 0.53], { parent: pe, center: true, rot: [Math.PI / 2, 0, 0], seg: 16, noShadow: true }); const s = E.box(0.02, 0.09, 0.01, E.flat("#7a5000"), [0, -0.07, 0.55], { parent: pe, center: true, noShadow: true }); c.visible = s.visible = false; return [c, s]; });
  X.coinEyes = (on) => X.coins.forEach((p) => p.forEach((m) => (m.visible = on)));
  X.string = E.group(T.torso, [0.14, T.dims.TH - 0.5, 0.27]);
  // backpack: body + top loop + strap (strap scaled for the stretch)
  X.pack = E.group(T.torso, [0, 0.1, -0.24]); const red = E.mat("#e0262e");
  E.box(0.62, 0.6, 0.3, red, [0, 0, -0.15], { parent: X.pack }); E.box(0.5, 0.18, 0.06, E.mat("#b81c22"), [0, 0.12, -0.31], { parent: X.pack });
  X.loop = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.025, 6, 12), E.mat("#23232e")); X.loop.position.set(0, 0.66, -0.15); E.add(X.loop, X.pack);
  X.straps = [-1, 1].map((s) => E.box(0.08, 0.62, 0.06, E.mat("#b81c22"), [s * 0.22, 0.05, 0.02], { parent: X.pack }));
  X.pack.visible = false;
  X.stache = E.group(T.head, [0, 0.27, T.dims.HD / 2 + 0.03]); E.box(0.42, 0.08, 0.04, E.mat("#2a1a10"), [0, 0, 0], { parent: X.stache, center: true }); for (const s of [-1, 1]) E.box(0.12, 0.06, 0.04, E.mat("#2a1a10"), [s * 0.25, -0.03, 0], { parent: X.stache, center: true, rot: [0, 0, s * 0.5] }); X.stache.visible = false;
  X.ticket = E.plane(0.36, 0.2, E.mat("#ffffff", { map: ticketTex("67") }), [0.05, 0.68, T.dims.HD / 2 + 0.012], { parent: T.head, noShadow: true }); X.ticket.rotation.z = 0.2; X.ticket.visible = false;
  return X;
}
export const ticketTex = (n) => cv(256, 140, (g, w, h) => { g.fillStyle = "#ff4d4d"; g.fillRect(0, 0, w, h); g.fillStyle = "#fff4f0"; g.fillRect(10, 10, w - 20, h - 20); g.fillStyle = "#ff4d4d"; for (let y = 10; y < h; y += 22) { g.beginPath(); g.arc(0, y, 8, 0, 7); g.arc(w, y, 8, 0, 7); g.fill(); } g.font = F(104); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#c0141c"; g.fillText(n, w / 2, h / 2 + 6); });
/** collar with a ring, gold handprint on the head */
export function dinoExtras(E, D) {
  const X = {}; X.collar = E.group(D.neck, [0, 0.12, 0]); E.box(0.48, 0.12, 0.46, E.mat("#e0262e"), [0, -0.06, 0], { parent: X.collar });
  X.ring = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.032, 6, 14), E.mat("#d8dde6", { emissive: "#2a2e38" })); X.ring.position.set(0, -0.12, 0.27); E.add(X.ring, X.collar);
  X.ringPt = E.group(X.collar, [0, -0.2, 0.28]);
  const hp = cv(256, 256, (g, w, h) => { g.clearRect(0, 0, w, h); g.fillStyle = "#ffc21a"; g.beginPath(); g.ellipse(128, 160, 62, 56, 0, 0, 7); g.fill(); [[-56, -40, -0.5], [-22, -70, -0.15], [14, -74, 0.1], [48, -58, 0.35]].forEach(([x, y, r]) => { g.save(); g.translate(128 + x, 150 + y); g.rotate(r); g.beginPath(); g.roundRect(-14, -40, 28, 70, 14); g.fill(); g.restore(); }); g.beginPath(); g.ellipse(128 + 74, 175, 18, 36, -0.9, 0, 7); g.fill(); });
  X.hand = E.plane(0.5, 0.5, new THREE.MeshToonMaterial({ map: hp, transparent: true, alphaTest: 0.4, color: "#ffffff" }), [0.02, 0.285, 0.05], { parent: D.head, rot: [-Math.PI / 2, 0, 0.3], noShadow: true, noink: true }); X.hand.visible = false;
  return X;
}

// ---------------- Flip, the reseller ----------------
export function makeFlip(E) {
  const M = (c) => E.mat(c), root = E.group(null), P = { root }, must = M("#d9a826"), mustD = M("#b8861a"), skin = "#e9b48c";
  for (const s of [-1, 1]) E.box(0.36, 0.16, 0.56, M("#3a2a1a"), [s * 0.24, 0, 0.08], { parent: root });
  P.body = E.group(root, [0, 0, 0]);
  E.box(1.05, 2.45, 0.5, must, [0, 0.12, -0.02], { parent: P.body });            // coat back (solid)
  E.box(0.98, 2.3, 0.04, M("#5a2a2a"), [0, 0.18, 0.24], { parent: P.body, noShadow: true }); // lining
  for (const s of [-1, 1]) E.box(0.06, 2.45, 0.42, must, [s * 0.5, 0.12, 0.43], { parent: P.body });
  P.slots = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const gp = E.group(P.body, [-0.33 + c * 0.22, 2.05 - r * 0.6, 0.4]); E.box(0.02, 0.05, 0.12, M("#c8c8d0"), [0, 0, -0.1], { parent: gp, noShadow: true }); P.slots.push(gp); }
  P.doors = [-1, 1].map((s) => { const h = E.group(P.body, [s * 0.53, 0.12, 0.66]); E.box(0.53, 2.45, 0.06, must, [-s * 0.265, 0, 0], { parent: h }); E.box(0.08, 2.45, 0.07, mustD, [-s * 0.5, 0, 0.005], { parent: h }); for (const y of [1.6, 1.1, 0.6]) E.box(0.07, 0.07, 0.03, M("#3a2a1a"), [-s * 0.42, y, 0.04], { parent: h, noShadow: true }); E.box(0.36, 0.08, 0.04, mustD, [-s * 0.25, 1.0, 0.04], { parent: h }); return h; });
  E.box(1.2, 0.22, 1.0, mustD, [0, 2.5, 0.16], { parent: P.body });             // shoulders / collar
  for (const s of [-1, 1]) E.box(0.22, 0.4, 0.12, must, [s * 0.32, 2.62, 0.22], { parent: P.body, rot: [0.25, 0, s * 0.2] });
  P.arms = [-1, 1].map((s) => { const g = E.group(P.body, [s * 0.68, 2.6, 0]); E.box(0.3, 0.55, 0.34, must, [0, -0.52, 0], { parent: g }); const e = E.group(g, [0, -0.52, 0]); E.box(0.29, 0.45, 0.33, must, [0, -0.45, 0], { parent: e }); E.box(0.25, 0.2, 0.27, M(skin), [0, -0.62, 0], { parent: e }); g.userData.e = e; return g; });
  P.elbows = P.arms.map((a) => a.userData.e);
  // two fingers (measuring) on the right hand
  P.fingers = E.group(P.elbows[1], [0, -0.7, 0.05]); for (const x of [-0.05, 0.05]) E.box(0.06, 0.2, 0.06, M(skin), [x, -0.15, 0], { parent: P.fingers }); P.fingers.visible = false;
  P.head = E.group(P.body, [0, 2.7, 0]); const HW = 0.78, HH = 0.82, HD = 0.72;
  E.box(HW, HH, HD, M(skin), [0, 0, 0], { parent: P.head });
  const fd = { skin, iris: "#2a1a10", brow: "#3a2410", extra: (g, W, H) => { g.fillStyle = "#3a2410"; g.beginPath(); g.moveTo(W * 0.5, H * 0.66); g.quadraticCurveTo(W * 0.3, H * 0.62, W * 0.24, H * 0.7); g.quadraticCurveTo(W * 0.34, H * 0.66, W * 0.5, H * 0.69); g.quadraticCurveTo(W * 0.66, H * 0.66, W * 0.76, H * 0.7); g.quadraticCurveTo(W * 0.7, H * 0.62, W * 0.5, H * 0.66); g.fill(); } };
  P.faces = {}; P.faceMesh = E.plane(HW, HH, M("#ffffff"), [0, HH / 2, HD / 2 + 0.004], { parent: P.head, noShadow: true, noink: true });
  P.face = (e) => { if (!P.faces[e]) P.faces[e] = E.mat("#ffffff", { map: cv(512, 450, (g, w, h) => drawFace(g, w, h, fd, e)) }); P.faceMesh.material = P.faces[e]; };
  E.box(HW + 0.12, 0.14, HD + 0.1, M("#6a6a72"), [0, HH - 0.02, 0.02], { parent: P.head }); E.box(HW + 0.1, 0.06, 0.34, M("#5a5a62"), [0, HH - 0.02, HD / 2 + 0.18], { parent: P.head }); // flat cap + brim
  for (const s of [-1, 1]) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.016, 6, 16), M("#c8a83a")); r.position.set(s * 0.12, HH + 0.13, HD / 2 - 0.02); r.rotation.x = -0.9; E.add(r, P.head); const gl = E.cyl(0.07, 0.07, 0.01, M("#2a2a36"), [s * 0.12, HH + 0.13, HD / 2 - 0.02], { parent: P.head, center: true, rot: [Math.PI / 2 - 0.9, 0, 0] }); }
  /** pose: pos, yaw, open 0..1 (coat doors), heart 0..1 (right hand on heart, head tilt), armL/armR [x,z], elbowL/R, head [x,y,z], face, lean, measure */
  P.pose = (p = {}) => {
    root.visible = p.visible !== false; root.position.set(...(p.pos || [0, 0, 0])); root.rotation.set(0, p.yaw || 0, 0); root.scale.setScalar(p.scale || 1);
    P.body.rotation.set(p.lean || 0, 0, 0); const o = p.open || 0; P.doors[0].rotation.y = -o * 1.9; P.doors[1].rotation.y = o * 1.9;
    const hr = p.heart || 0, aL = p.armL || [0, 0.08], aR = p.armR || [0, 0.08];
    P.arms[0].rotation.set(aL[0], 0, -(aL[1] || 0)); P.arms[1].rotation.set(X0(aR[0], -1.1, hr), 0, X0(aR[1] || 0, 0.55, hr)); P.elbows[0].rotation.x = -(p.elbowL || 0); P.elbows[1].rotation.x = -X0(p.elbowR || 0, 1.7, hr);
    const h = p.head || [0, 0, 0]; P.head.rotation.set(h[0] || 0, h[1] || 0, (h[2] || 0) + 0.28 * hr); P.fingers.visible = !!p.measure; P.face(p.face || "smug");
  };
  const X0 = (a, b, t) => a + (b - a) * t;
  P.dims = { H: 3.5 }; P.pose({}); return P;
}

// ---------------- crowd people ----------------
const FM = {};
export function person(E, i, o = {}) {
  const hood = o.hood || ["#3f8ad8", "#57c84d", "#ffd23a", "#d84a7a", "#4ac8c8", "#9b4dff", "#ff8a5a", "#6a7ad8"][i % 8], skins = ["#ffcf9e", "#c98d62", "#8a5a3a", "#f1c7a6"], si = o.si ?? (i * 7 + 3) % 4;
  const bagC = ["#ff4d4d", "#23232e", "#ff8a1f", "#19a0e0", "#e8e0c8"][(i * 3) % 5];
  const K = blocky(E, { skin: skins[si], shirt: hood, sleeve: hood, pants: ["#2c3042", "#3f6fd8", "#5a5a66", "#4a3a2a"][i % 4], shoe: "#f4f4f4", face: { skin: skins[si] },
    build: (P, E, M) => { const { HW, HH, HD } = P.dims; E.box(HW + 0.1, 0.16, HD + 0.06, M(hood), [0, HH - 0.06, -0.02], { parent: P.head });
      // shoulder bag on the left hip, clip point on its strap side
      const bs = o.bagSide ?? 1; P.bag = E.group(P.torso, [bs * 0.5, -0.05, 0.05]); E.box(0.16, 0.5, 0.5, M(bagC), [0, -0.2, 0], { parent: P.bag }); E.box(0.04, 0.9, 0.06, M(bagC), [-bs * 0.3, 0.3, 0], { parent: P.bag, rot: [0, 0, bs * 0.5] });
      P.clipPt = E.group(P.bag, [bs * 0.1, 0.3, 0.12]); } });
  const key = (e) => si + e; K.face = (e = "happy") => { const k = key(e); if (!FM[k]) FM[k] = E.mat("#ffffff", { map: cv(512, 450, (g, w, h) => drawFace(g, w, h, { skin: skins[si], iris: "#3a2a22", brow: "#4a3020" }, e)) }); K.faceMesh.material = FM[k]; };
  K.ph = (i * 1.37) % 6.28; K.kid = !!o.kid; if (o.kid) K.root.scale.setScalar(0.55); K.base = o.kid ? 0.55 : 0.92 + ((i * 13) % 7) * 0.02;
  return K;
}
/** attach a grey zubbit to a person's bag clip point (returns it) */
export const clipZ = (E, K, kind = "grey", s = 1.2) => { const z = zubbit(E, kind, { parent: K.clipPt }); z.position.set(0, 0, 0); z.scale.setScalar(s); return z; };

// ---------------- Gran's extras, small props ----------------
export function chair(E, parent, pos, col = "#3f8ad8") { const g = E.group(parent, pos); const m = E.mat(col), st = E.mat("#8a8f99"); for (const x of [-0.28, 0.28]) for (const z of [-0.25, 0.25]) E.cyl(0.025, 0.025, 0.55, st, [x, 0, z], { parent: g, seg: 6 }); E.box(0.66, 0.06, 0.6, m, [0, 0.55, 0], { parent: g }); E.box(0.66, 0.6, 0.05, m, [0, 0.6, -0.3], { parent: g }); return g; }
export function knitBag(E, parent, pos) { const g = E.group(parent, pos); E.box(0.5, 0.42, 0.3, E.mat("#b84a8a"), [0, 0, 0], { parent: g }); E.sphere(0.13, E.mat("#ffe14a"), [0.08, 0.46, 0], { parent: g }); E.sphere(0.11, E.mat("#19e0c6"), [-0.1, 0.44, 0.05], { parent: g }); for (const x of [-0.04, 0.12]) E.cyl(0.012, 0.012, 0.5, E.mat("#e8f4ff"), [x, 0.3, -0.04], { parent: g, seg: 5, rot: [0, 0, x * 3] }); g.userData.clip = E.group(g, [0.25, 0.3, 0.16]); return g; }
export function tent(E, pos, col, rotY = 0, s = 1) { const g = E.group(null, pos, rotY); const sh = new THREE.Shape(); sh.moveTo(-0.9 * s, 0); sh.lineTo(0.9 * s, 0); sh.lineTo(0, 1.25 * s); sh.lineTo(-0.9 * s, 0); const geo = new THREE.ExtrudeGeometry(sh, { depth: 1.8 * s, bevelEnabled: false }); geo.translate(0, 0, -0.9 * s); const m = new THREE.Mesh(geo, E.mat(col)); E.add(m, g); E.plane(0.6 * s, 0.8 * s, E.flat("#2a1a30"), [0, 0.4 * s, 0.905 * s], { parent: g, noink: true, noShadow: true }); g.userData.mesh = m; return g; }
export function donutM(E, parent, pos, s = 1, icing = "#ff7fb8") { const g = E.group(parent, pos); const d = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.075 * s, 6, 12), E.mat("#e7b06a")); d.rotation.x = Math.PI / 2; E.add(d, g); const i = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.07 * s, 6, 12), E.mat(icing)); i.rotation.x = Math.PI / 2; i.position.y = 0.025 * s; i.scale.set(1, 1, 0.75); E.add(i, g); return g; }
/** donut with a paper turkey on a toothpick */
export function turkeyDonut(E, parent, pos) { const g = donutM(E, parent, pos, 1, "#ff9a3a"); E.cyl(0.008, 0.008, 0.3, E.mat("#e8d4a8"), [0, 0, 0], { parent: g, seg: 4 }); const t = cv(256, 256, (c, w, h) => { c.clearRect(0, 0, w, h); ["#e0262e", "#ff8a1f", "#ffe14a", "#57c84d", "#ff8a1f", "#e0262e"].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.ellipse(128 + Math.cos(Math.PI * (0.1 + i * 0.16)) * -70, 130 - Math.sin(Math.PI * (0.1 + i * 0.16)) * 70, 26, 60, Math.PI * (0.5 - (0.1 + i * 0.16)), 0, 7); c.fill(); }); c.fillStyle = "#8a5226"; c.beginPath(); c.ellipse(128, 160, 54, 64, 0, 0, 7); c.fill(); c.beginPath(); c.arc(128, 96, 32, 0, 7); c.fill(); c.fillStyle = "#fff"; c.beginPath(); c.arc(118, 90, 8, 0, 7); c.fill(); c.fillStyle = "#e0262e"; c.fillRect(124, 104, 10, 26); c.fillStyle = "#ffb02a"; c.beginPath(); c.moveTo(132, 96); c.lineTo(156, 102); c.lineTo(132, 108); c.fill(); });
  E.plane(0.26, 0.26, new THREE.MeshToonMaterial({ map: t, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide }), [0, 0.38, 0], { parent: g, noShadow: true }); return g; }
/** turkey-shaped donut on a plate (bite count shrinks it) */
export function turkeyPlate(E) { const g = E.group(null, [0, -50, 0]); E.cyl(0.32, 0.26, 0.04, E.mat("#ffffff"), [0, 0, 0], { parent: g, seg: 20 }); const t = E.group(g, [0, 0.04, 0]); const body = donutM(E, t, [0, 0, 0], 1.3, "#a8642a"); ["#e0262e", "#ff8a1f", "#ffe14a", "#57c84d", "#ff8a1f"].forEach((c, i) => E.box(0.09, 0.3, 0.04, E.mat(c), [-0.24 + i * 0.12, 0.05, -0.2], { parent: t, rot: [0, 0, (i - 2) * -0.35] })); E.box(0.12, 0.14, 0.12, E.mat("#8a5226"), [0, 0.06, 0.22], { parent: t }); g.userData.t = t; return g; }
export function coin(E, parent, pos, s = 1) { return E.cyl(0.06 * s, 0.06 * s, 0.015 * s, E.mat("#ffc21a", { emissive: "#5a3a00" }), pos, { parent, seg: 14, center: true }); }
export function sack(E) { const g = E.group(null, [0, -50, 0]); E.sphere(0.42, E.mat("#c79a5b"), [0, 0.38, 0], { parent: g, scale: [1, 1.05, 0.9] }); E.cyl(0.12, 0.2, 0.2, E.mat("#b8864a"), [0, 0.78, 0], { parent: g, seg: 10 }); E.box(0.3, 0.05, 0.3, E.mat(INK), [0, 0.8, 0], { parent: g }); const t = cv(512, 256, (c, w, h) => { c.clearRect(0, 0, w, h); c.font = F(150); c.textAlign = "center"; c.textBaseline = "middle"; c.fillStyle = INK; c.fillText("$9,999", w / 2, h / 2 + 8); }); E.plane(0.62, 0.31, new THREE.MeshToonMaterial({ map: t, transparent: true, alphaTest: 0.3 }), [0, 0.42, 0.39], { parent: g, noShadow: true, noink: true }); return g; }
export function phoneRig(E) { const g = E.group(null, [0, -50, 0]); for (const a of [0, 2.1, 4.2]) E.cyl(0.015, 0.015, 1.2, E.mat("#23232e"), [Math.cos(a) * 0.2, 0, Math.sin(a) * 0.2], { parent: g, seg: 4, rot: [Math.sin(a) * 0.17, 0, -Math.cos(a) * 0.17] }); E.cyl(0.02, 0.02, 0.5, E.mat("#23232e"), [0, 1.15, 0], { parent: g, seg: 4 }); const r = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 8, 24), E.flat("#fff6e8")); r.position.set(0, 1.7, 0); E.add(r, g); E.box(0.1, 0.19, 0.02, E.mat("#23232e"), [0, 1.6, 0.01], { parent: g }); return g; }
export function moth(E) { const g = E.group(null, [0, -50, 0]); E.box(0.03, 0.03, 0.09, E.mat("#8a7a6a"), [0, 0, 0], { parent: g, center: true }); g.userData.w = [-1, 1].map((s) => { const w = E.group(g, [0, 0, 0]); E.box(0.1, 0.005, 0.08, E.mat("#c8b8a0"), [s * 0.05, 0, 0], { parent: w, center: true }); return w; }); return g; }
/** dog with a grey zubbit on its collar */
export function dog(E) { const g = E.group(null, [0, -50, 0]), c = E.mat("#c9925a"), d = E.mat("#8a5a36"); E.box(0.9, 0.4, 0.4, c, [0, 0.45, 0], { parent: g }); const h = E.group(g, [0.5, 0.75, 0]); E.box(0.36, 0.34, 0.34, c, [0, 0, 0], { parent: h }); E.box(0.2, 0.14, 0.2, d, [0.24, 0.02, 0], { parent: h }); for (const z of [-0.14, 0.14]) { E.box(0.1, 0.2, 0.06, d, [-0.05, 0.3, z], { parent: h }); E.box(0.04, 0.05, 0.02, E.flat(INK), [0.18, 0.2, z * 0.7 + (z > 0 ? 0.04 : -0.04)], { parent: h, noShadow: true, rot: [0, Math.PI / 2, 0] }); } E.box(0.1, 0.06, 0.42, E.mat("#e0262e"), [0.4, 0.68, 0], { parent: g }); g.userData.legs = [[-0.32, -0.14], [-0.32, 0.14], [0.32, -0.14], [0.32, 0.14]].map(([x, z]) => { const l = E.group(g, [x, 0.45, z]); E.box(0.12, 0.45, 0.12, d, [0, -0.45, 0], { parent: l }); return l; }); E.box(0.3, 0.07, 0.07, c, [-0.55, 0.75, 0], { parent: g, rot: [0, 0, 0.7] }); g.userData.z = zubbit(E, "grey", { parent: g }); g.userData.z.position.set(0.48, 0.62, 0.22); g.userData.z.scale.setScalar(0.8); return g; }
export function pigeon(E) { const g = E.group(null, [0, -50, 0]), c = E.mat("#8a8f9e"); E.box(0.22, 0.16, 0.12, c, [0, 0.08, 0], { parent: g }); E.box(0.1, 0.1, 0.1, c, [0.12, 0.22, 0], { parent: g }); E.box(0.06, 0.03, 0.04, E.mat("#ff8a1f"), [0.19, 0.22, 0], { parent: g }); E.box(0.08, 0.04, 0.13, E.mat("#5aa89a"), [0.08, 0.17, 0], { parent: g }); E.box(0.1, 0.04, 0.1, E.mat("#6a6f7e"), [-0.14, 0.1, 0], { parent: g, rot: [0, 0, 0.3] }); g.userData.z = zubbit(E, "grey", { parent: g }); g.userData.z.position.set(0.12, 0.13, 0.07); g.userData.z.scale.setScalar(0.32); return g; }
