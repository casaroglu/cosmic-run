// Long 2 shared 3D props and characters
import * as THREE from "three";
import { blocky } from "../blocky/rig.js";
export const donut = (E, parent, pos, s = 1, icing = "#ff7fb8", rot = [Math.PI / 2, 0, 0]) => { const g = E.group(parent, pos);
  const d = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.075 * s, 6, 12), E.mat("#e7b06a")); d.rotation.set(...rot); E.add(d, g);
  const i = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.07 * s, 6, 12), E.mat(icing)); i.rotation.set(...rot); i.position.y = 0.025 * s; i.scale.set(1, 1, 0.75); E.add(i, g); return g; };
const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
/** the white controller: sticks, START, our own icons, battery screen. returns {g, start, setBattery(n), screen(text)} */
export function controller(E, parent, pos = [0, 0, 0], s = 1) {
  const g = E.group(parent, pos); g.scale.setScalar(s); const M = (c) => E.mat(c);
  E.box(0.9, 0.14, 0.42, M("#f4f4f6"), [0, 0, 0], { parent: g }); for (const x of [-0.42, 0.42]) E.box(0.26, 0.14, 0.5, M("#f4f4f6"), [x, 0, 0.12], { parent: g, rot: [0, x * 0.6, 0] });
  for (const x of [-0.2, 0.2]) { E.cyl(0.06, 0.07, 0.06, M("#3a4250"), [x, 0.14, 0.06], { parent: g, seg: 12 }); }
  const icons = [["#ff7fb8", -0.34, -0.06], ["#e7b06a", -0.42, 0.02], ["#ffe14a", -0.34, 0.1], ["#19e0c6", -0.26, 0.02]];
  icons.forEach(([c, x, z]) => E.box(0.06, 0.04, 0.06, M(c), [-x, 0.14, z], { parent: g }));
  const start = E.cyl(0.07, 0.07, 0.04, E.flat("#ff3d7f"), [0, 0.14, -0.08], { parent: g, seg: 16 });
  const sc = document.createElement("canvas"); sc.width = 256; sc.height = 96; const st = new THREE.CanvasTexture(sc); st.colorSpace = THREE.SRGBColorSpace;
  const screen = E.plane(0.3, 0.11, E.flat("#ffffff", { map: st }), [0, 0.145, 0.1], { parent: g, rot: [-Math.PI / 2, 0, 0], noink: true });
  const draw = (txt, bars) => { const c = sc.getContext("2d"); c.fillStyle = "#0e1a22"; c.fillRect(0, 0, 256, 96); c.fillStyle = "#7fffd4"; c.font = "800 24px sans-serif"; c.fillText(txt, 10, 34); for (let i = 0; i < 3; i++) { c.fillStyle = i < bars ? "#7dff7a" : (bars === 0 ? "#ff3d3d" : "#2c3a40"); c.fillRect(170 + i * 26, 56, 20, 28); } st.needsUpdate = true; };
  let key = ""; const set = (txt, bars) => { const k2 = txt + bars; if (k2 !== key) { draw(txt, bars); key = k2; } };
  set("CHANGE SERVER", 3); return { g, start, set };
}
/** confetti puff: n little boxes; call at(t, origin) each frame (t in s since the puff, -1 hides) */
export function confetti(E, n = 70, seed = 3, colsIn = null) {
  const cols = colsIn || ["#ff7fb8", "#ffe14a", "#19e0c6", "#9b4dff", "#ff4d4d", "#4d9bff", "#ffffff"]; let sd = seed * 9301 + 49297; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const parts = []; for (let i = 0; i < n; i++) { const m = E.box(0.09, 0.09, 0.02, E.flat(cols[i % cols.length]), [0, -60, 0], { noShadow: true, center: true }); parts.push({ m, v: [(r() - 0.5) * 6, 2 + r() * 5, (r() - 0.5) * 6], s: [r() * 9, r() * 9], dy: r() }); }
  return { at(t, o = [0, 1, 0], spread = 1) { parts.forEach((p) => { if (t < 0) { p.m.position.y = -60; return; } const tt = Math.min(t, 3); const y = o[1] + p.v[1] * tt * spread - 2.2 * tt * tt; p.m.position.set(o[0] + p.v[0] * tt * spread * (1 - tt * 0.15), Math.max(0.03 + p.dy * 0.02, y), o[2] + p.v[2] * tt * spread * (1 - tt * 0.15)); p.m.rotation.set(p.s[0] * tt, p.s[1] * tt, 0); }); } };
}
/** tile-flip transition: a ring of floor tiles flipping up around (x,z) -> returns at(k 0..1) */
export function tileFlip(E, cx, cz, col = "#ffffff", R = 3.2) {
  const tiles = []; for (let x = -R; x <= R; x += 0.8) for (let z = -R; z <= R; z += 0.8) { const d = Math.hypot(x, z); if (d > R) continue; const m = E.box(0.76, 0.06, 0.76, E.flat(col), [cx + x, -60, cz + z], { noShadow: true, center: true }); tiles.push({ m, d, x: cx + x, z: cz + z }); }
  return { at(k) { tiles.forEach((t) => { const kk = Math.max(0, Math.min(1, k * 1.6 - t.d / R * 0.6)); if (k <= 0) { t.m.position.y = -60; return; } t.m.position.set(t.x, 0.04 + kk * 2.5, t.z); t.m.rotation.set(kk * Math.PI * 3, 0, kk * Math.PI); t.m.scale.setScalar(1 - kk * 0.6); }); } };
}
/** a white portal square of light */
export function portal(E) { const m = E.plane(3.2, 3.2, E.flat("#ffffff", { transparent: true, opacity: 0.9, fog: false }), [0, -60, 0], { noink: true, noShadow: true }); return m; }
// ---------- Cape City cast ----------
export function lordMitten(E) {
  const P = blocky(E, { skin: "#3fb8a8", shirt: "#d9a826", sleeve: "#d9a826", cuff: "#a87c14", pants: "#a87c14", shoe: "#5a4210", face: { skin: "#3fb8a8", iris: "#2a0a0a", brow: "#1d4a44" },
    build: (P, E, M) => { const { HW, HH, HD } = P.dims; E.box(HW * 0.86, 0.26, 0.34, M("#36a092"), [0, -0.02, HD / 2 + 0.1], { parent: P.head }); // shoebox chin
      E.box(1.0, 0.2, 0.55, M("#d9a826"), [0, P.dims.TH - 0.1, 0], { parent: P.torso }); E.box(1.1, 0.26, 0.58, M("#a87c14"), [0, P.dims.TH - 0.22, 0], { parent: P.torso });
      // the mitt on the right hand
      const mt = E.group(P.elbows[1], [0, -0.46, 0]); P.mitt = mt; E.box(0.62, 0.72, 0.42, M("#d8344a"), [0, -0.3, 0], { parent: mt }); E.box(0.22, 0.34, 0.3, M("#d8344a"), [0.36, -0.12, 0], { parent: mt, rot: [0, 0, -0.5] }); E.box(0.66, 0.12, 0.46, M("#ffffff"), [0, 0.06, 0], { parent: mt });
      for (let i = 0; i < 3; i++) E.box(0.56, 0.025, 0.012, E.flat("#ffffff"), [0, -0.2 - i * 0.18, 0.216], { parent: mt, noShadow: true });
      P.magnets = [["#ffe14a", -0.2, -0.15], ["#ff7fb8", 0.0, -0.15], ["#cfd6ff", 0.2, -0.15], ["#4d9bff", -0.1, -0.42], ["#57c84d", 0.12, -0.42]].map(([c, x, y]) => [0.23, -0.23].map((z) => E.box(0.14, 0.14, 0.06, E.flat(c), [x, y, z], { parent: mt, noShadow: true }))); } });
  P.root.scale.setScalar(3); return P;
}
export function hero(E, kind) {
  const S = { brunch: { skin: "#ffcf9e", shirt: "#2f5fb0", pants: "#2f5fb0", shoe: "#b8262e", cape: "#ffffff" }, gran: { skin: "#f1c7a6", shirt: "#7a3fb0", pants: "#4a2a6a", shoe: "#2a1a2a", cape: "#9b4dff" },
    zip: { skin: "#c98d62", shirt: "#ffe14a", pants: "#ffe14a", shoe: "#ff4d4d" }, sulk: { skin: "#8a8f99", shirt: "#5a5f6a", pants: "#3a3f4a", shoe: "#2a2f3a" } }[kind];
  const P = blocky(E, { ...S, sleeve: S.shirt, face: { skin: S.skin, iris: "#2a2020", brow: kind === "gran" ? "#d8d8d8" : "#4a3020" },
    build: (P, E, M) => { const { HW, HH, HD, TH } = P.dims;
      if (S.cape) { P.cape = E.group(P.torso, [0, TH - 0.05, -0.25]); E.box(0.9, 1.5, 0.05, M(S.cape), [0, -1.5, 0], { parent: P.cape }); }
      if (kind === "brunch") { E.box(0.1, 0.5, 0.5, M("#3a4250"), [-0.2, -0.3, 0.05], { parent: P.elbows[0] }); E.cyl(0.32, 0.32, 0.06, M("#3a4250"), [0, -0.45, 0.2], { parent: P.elbows[0], rot: [Math.PI / 2, 0, 0], seg: 16 }); E.box(0.32, 0.32, 0.04, M("#ffffff"), [0, 0.2, 0.24], { parent: P.torso }); E.box(0.14, 0.14, 0.05, M("#ffd23a"), [0, 0.28, 0.25], { parent: P.torso }); E.box(HW * 0.9, 0.22, 0.2, M(S.skin), [0, 0.02, HD / 2 + 0.05], { parent: P.head }); }
      if (kind === "gran") { E.box(HW + 0.08, 0.26, HD + 0.08, M("#d8d8d8"), [0, HH - 0.12, -0.05], { parent: P.head }); E.box(0.36, 0.36, 0.36, M("#d8d8d8"), [0, HH + 0.05, -0.3], { parent: P.head }); for (const x of [-0.18, 0.18]) E.box(0.24, 0.1, 0.02, M("#333"), [x, HH * 0.53, HD / 2 + 0.03], { parent: P.head, noShadow: true }); for (const e of P.elbows) E.box(0.03, 0.03, 0.7, E.flat("#e8f4ff"), [0, -0.45, 0.25], { parent: e }); P.root.scale.setScalar(0.78); }
      if (kind === "zip") { E.box(HW + 0.06, 0.18, HD + 0.06, M("#ff4d4d"), [0, HH - 0.1, 0], { parent: P.head }); }
      if (kind === "sulk") { P.root.scale.setScalar(2.0); }
    } });
  return P;
}
// ---------- Cubelands ----------
export function fuseBox(E) {
  const g = E.group(null), M = (c) => E.mat(c); E.box(0.9, 0.9, 0.9, M("#7dd64a"), [0, 0.22, 0], { parent: g }); E.box(0.92, 0.92, 0.16, M("#ff7fb8"), [0, 0.21, 0], { parent: g }); E.box(0.16, 0.92, 0.92, M("#ff7fb8"), [0, 0.21, 0], { parent: g });
  for (const x of [-0.18, 0.18]) E.box(0.1, 0.14, 0.02, M("#1a1a1a"), [x, 0.75, 0.46], { parent: g, noShadow: true });
  const feet = [[-0.3, 0.3], [0.3, 0.3], [-0.3, -0.3], [0.3, -0.3]].map(([x, z]) => E.box(0.16, 0.22, 0.2, M("#5aa838"), [x, 0, z], { parent: g }));
  const fuse = E.cyl(0.03, 0.03, 0.35, M("#3a2a1a"), [0, 1.12, 0], { parent: g, seg: 6 }); const spark = E.sphere(0.08, E.flat("#ffe14a"), [0, 1.48, 0], { parent: g });
  const white = E.box(0.96, 0.96, 0.96, E.flat("#ffffff", { transparent: true, opacity: 0 }), [0, 0.19, 0], { parent: g, noShadow: true });
  return { g, feet, fuse, spark, pose({ pos = [0, 0, 0], yaw = 0, walk = 0, fuseK = 0, flash = 0, visible = true, scale = 1 }) { g.visible = visible; g.position.set(...pos); g.rotation.y = yaw; g.scale.setScalar(scale);
    feet.forEach((f, i) => (f.position.y = Math.max(0, Math.sin(walk + i * 1.6)) * 0.1)); fuse.scale.y = Math.max(0.05, 1 - fuseK); fuse.position.y = 1.12 - 0.17 * fuseK; spark.position.y = 1.48 - 0.33 * fuseK; spark.scale.setScalar(0.8 + 0.4 * Math.abs(Math.sin(walk * 3)));
    white.material.opacity = flash; } };
}
export function cubefolk(E, seed = 1) {
  const P = blocky(E, { skin: "#d8a77a", shirt: "#3f7a8a", sleeve: "#3f7a8a", pants: "#2f5a6a", shoe: "#3a2a1a", face: { skin: "#d8a77a", iris: "#2a5a2a", brow: "#3a2a1a" },
    build: (P, E, M) => { E.box(0.16, 0.2, 0.16, M("#c8946a"), [0, 0.22, P.dims.HD / 2 + 0.07], { parent: P.head }); E.box(1.5, 0.06, 1.4, M("#e8c860"), [0, P.dims.HH, 0], { parent: P.head }); E.box(0.8, 0.3, 0.8, M("#e8c860"), [0, P.dims.HH + 0.04, 0], { parent: P.head }); E.box(0.82, 0.08, 0.82, M("#d8344a"), [0, P.dims.HH + 0.08, 0], { parent: P.head }); E.box(0.86, 1.1, 0.5, M("#3f7a8a"), [0, -0.38, 0], { parent: P.torso }); } });
  return P;
}
// ---------- Turbo City ----------
export function car(E, col = "#ff4d4d", seed = 1) {
  const g = E.group(null), M = (c) => E.mat(c); E.box(2.0, 0.55, 4.2, M(col), [0, 0.35, 0], { parent: g }); E.box(1.7, 0.5, 2.0, M(col), [0, 0.9, -0.2], { parent: g }); E.box(1.72, 0.4, 1.9, E.flat("#9fd8ff"), [0, 0.95, -0.2], { parent: g, noShadow: true });
  for (const [x, z] of [[-0.95, 1.35], [0.95, 1.35], [-0.95, -1.35], [0.95, -1.35]]) E.cyl(0.36, 0.36, 0.3, M("#1a1a1a"), [x, 0.36, z], { parent: g, center: true, rot: [0, 0, Math.PI / 2], seg: 12 });
  for (const x of [-0.65, 0.65]) { E.box(0.36, 0.18, 0.05, E.flat("#fffbe0"), [x, 0.5, 2.11], { parent: g, noShadow: true }); E.box(0.36, 0.14, 0.05, E.flat("#ff2a2a"), [x, 0.5, -2.11], { parent: g, noShadow: true }); }
  return g;
}
/** The Admin: a giant blocky hand. returns {g, index, pose({pos, rotY, palmUp, point, tap})} */
export function adminHand(E) {
  const g = E.group(null, [0, -50, 0]), M = (c) => E.mat(c), skin = M("#d8d4e8");
  const wrist = E.group(g, [0, 0, 0]); E.box(1.4, 3.0, 1.2, M("#3a3550"), [0, 1.6, 0], { parent: wrist }); E.box(1.5, 0.3, 1.3, M("#ffffff"), [0, 1.4, 0], { parent: wrist });
  const palm = E.group(wrist, [0, 1.4, 0]); E.box(1.6, 1.4, 0.7, skin, [0, -1.4, 0], { parent: palm });
  const fingers = [-0.6, -0.2, 0.2, 0.6].map((x, i) => { const f = E.group(palm, [x, -1.4, 0]); E.box(0.36, 1.0 - (i === 3 ? 0.2 : 0), 0.5, skin, [0, -1.0 + (i === 3 ? 0.2 : 0), 0], { parent: f }); return f; });
  const thumb = E.group(palm, [0.9, -0.6, 0.1]); E.box(0.4, 0.8, 0.45, skin, [0, -0.8, 0], { parent: thumb }); thumb.rotation.z = 0.6;
  return { g, fingers, palm, pose({ pos = [0, -50, 0], rotY = 0, palmUp = 0, point = 0, tap = 0, visible = true }) {
    g.visible = visible; g.position.set(...pos); g.rotation.set(Math.PI * palmUp, rotY, 0);
    fingers.forEach((f, i) => f.rotation.set(i === 1 ? -0.2 * tap : (point ? 1.8 * point : 0), 0, 0)); } };
}
