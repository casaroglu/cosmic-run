// Long 2 world sets. Each builder returns handles used by the scene's frame().
import * as THREE from "three";
import { donut } from "./props.js";
const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const F = (px, w = 900) => `${w} ${px}px CizgiFont, Nunito, sans-serif`;
const INK = "#221a26";
let sd = 11; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;

/** Donut Planet (home), centred at (x0, 0, 0). Landscape-friendly: wide room. */
export function donutShop(E, x0 = 0) {
  const { S, T } = E, H = 6.2, R = {};
  S.room({ x: x0, w: 16, d: 10, h: H, wall: T.wallpaper("#ffd1e3", "#ffc2da", "stripe"), floor: T.tiles("#fff6fb", "#ffb3d4", 10), floorRep: 0.3, window: false, door: false, ceiling: true });
  E.box(16, 0.5, 0.1, E.mat("#ff7fb8"), [x0, 0, -4.94]);
  E.plane(1.2, 2.5, E.flat("#0c0a18"), [x0 + 5.6, 1.25, -4.98], { noink: true }); for (const x of [4.94, 6.26]) E.box(0.14, 2.7, 0.14, E.mat("#ffffff"), [x0 + x, 0, -4.92]); E.box(1.46, 0.16, 0.14, E.mat("#ffffff"), [x0 + 5.6, 2.62, -4.92]);
  R.door = E.group(null, [x0 + 5.05, 0, -4.9]); E.box(1.1, 2.45, 0.08, E.mat("#8fd3ff"), [0.55, 0.05, 0], { parent: R.door });
  const sign = card(1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke(); g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6); g.lineWidth = 16; g.strokeStyle = "#ffe14a"; g.beginPath(); g.arc(120, h / 2, 52, 0, 7); g.stroke(); });
  E.plane(4.2, 1.05, E.flat("#ffffff", { map: sign, fog: false }), [x0 - 2.6, 4.4, -4.93], { noink: true });
  R.clockC = document.createElement("canvas"); R.clockC.width = 512; R.clockC.height = 220; R.clockT = new THREE.CanvasTexture(R.clockC); R.clockT.colorSpace = THREE.SRGBColorSpace;
  R.clock = (txt, suf = "AM") => { if (R.clockKey === txt + suf) return; const g = R.clockC.getContext("2d"); g.fillStyle = "#14101c"; g.fillRect(0, 0, 512, 220); g.font = F(150, 800); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#ff3030"; g.fillText(txt, 220, 116); g.font = F(56); g.fillText(suf, 432, 70); R.clockT.needsUpdate = true; R.clockKey = txt + suf; };
  R.clock("2:59"); E.plane(1.5, 0.64, E.flat("#ffffff", { map: R.clockT, fog: false }), [x0 + 0.2, 3.6, -4.92], { noink: true });
  R.rulesC = document.createElement("canvas"); R.rulesC.width = 900; R.rulesC.height = 1200; R.rulesT = new THREE.CanvasTexture(R.rulesC); R.rulesT.colorSpace = THREE.SRGBColorSpace;
  R.rules = (n8) => { const k = n8 ? 8 : 7; if (R.rulesKey === k) return; const g = R.rulesC.getContext("2d"); g.fillStyle = "#fffbe6"; g.fillRect(0, 0, 900, 1200); g.lineWidth = 20; g.strokeStyle = INK; g.strokeRect(10, 10, 880, 1180); g.fillStyle = "#ff3d3d"; g.fillRect(36, 36, 828, 120); g.font = F(80); g.textAlign = "center"; g.fillStyle = "#fff"; g.fillText("NIGHT SHIFT RULES", 450, 122);
    const L = ["1. DON'T FEED THE MASCOT AFTER 3 AM", "2. DON'T ANSWER THE PHONE", "3. KEEP THE LIGHTS ON", "4. DON'T SAY HIS NAME 3 TIMES", "5. NO SHADOW, NO DONUT", "6. DON'T OPEN THE FREEZER", "7. DO NOT HIRE TOAST."]; if (n8) L.push("8. NO SUPERHEROES AFTER 3 AM");
    g.textAlign = "left"; L.forEach((l, i) => { g.fillStyle = i === 7 ? "#ff3d3d" : INK; g.font = F(i === 7 ? 46 : 40, 800); g.fillText(l, 60, 250 + i * 118); }); R.rulesT.needsUpdate = true; R.rulesKey = k; };
  R.rules(false); R.rulesPos = [x0 + 3.0, 2.9, -4.93]; R.rulesMesh = E.plane(1.8, 2.4, E.mat("#ffffff", { map: R.rulesT }), R.rulesPos, { noShadow: true });
  S.counter(x0 + 0.2, -1.8, { w: 6, col: "#ff7fb8", top: "#fff6fb" });
  const ic = ["#ff7fb8", "#7a4a2a", "#ffe14a", "#19e0c6", "#ffffff", "#9b4dff", "#ff8a1f"];
  for (const y of [1.25, 1.95]) { E.box(6.4, 0.08, 0.5, E.mat("#ffffff"), [x0 - 0.2, y, -4.7]); for (let i = 0; i < 11; i++) donut(E, null, [x0 - 3.0 + i * 0.55, y + 0.08, -4.65], 1, ic[(i + (y > 1.5 ? 2 : 0)) % 7]); }
  // lost-and-found box on the counter
  R.box = E.group(null, [x0 - 1.2, 1.2, -1.75]); E.box(0.9, 0.5, 0.6, E.mat("#c79a5b", { map: T.planks("#c79a5b", 4) }), [0, 0, 0], { parent: R.box });
  const lf = card(512, 128, (g, w, h) => { g.fillStyle = "#c79a5b"; g.fillRect(0, 0, w, h); g.font = F(54); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = INK; g.fillText("LOST & FOUND", w / 2, h / 2); });
  E.plane(0.86, 0.22, E.mat("#ffffff", { map: lf }), [0, 0.26, 0.31], { parent: R.box, noShadow: true });
  // mop standing on its own
  R.mop = E.group(null, [x0 - 3.4, 0, 1.0]); R.mop.visible = false; E.cyl(0.04, 0.04, 1.6, E.mat("#c79a5b"), [0, 0.1, 0], { parent: R.mop, seg: 8 }); E.box(0.5, 0.12, 0.2, E.mat("#19a0e0"), [0, 0.04, 0], { parent: R.mop });
  R.H = H; return R;
}

/** Cubelands, centred at (x0, 0, z0): flat cube ground, cube trees, square sun/moon, square clouds */
export function cubelands(E, x0 = 200, z0 = 0) {
  const R = {}, grass = E.mat("#62c24a"), dirt = E.mat("#8a5a36"), wood = E.mat("#7a5232"), leaf = E.mat("#3f9a3a");
  const gt = card(64, 64, (g) => { g.fillStyle = "#62c24a"; g.fillRect(0, 0, 64, 64); g.fillStyle = "#58b542"; for (let i = 0; i < 18; i++) g.fillRect((i * 37) % 60, (i * 23) % 60, 6, 6); g.strokeStyle = "rgba(0,0,0,0.12)"; g.lineWidth = 2; g.strokeRect(1, 1, 62, 62); });
  gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.magFilter = THREE.NearestFilter; gt.repeat.set(80, 80);
  const fl = E.plane(80, 80, E.mat("#ffffff", { map: gt }), [x0, 0, z0], { rot: [-Math.PI / 2, 0, 0] }); fl.castShadow = false;
  // a few raised cube steps and hills
  for (let i = 0; i < 26; i++) { const x = x0 + (rnd() - 0.5) * 50, z = z0 - 6 - rnd() * 24, h = 1 + Math.floor(rnd() * 3); for (let y = 0; y < h; y++) E.box(1, 1, 1, y === h - 1 ? grass : dirt, [Math.round(x), y, Math.round(z)]); }
  R.trees = []; const tree = (x, z, hgt = 4) => { const g = E.group(null, [x, 0, z]); const blocks = []; for (let y = 0; y < hgt; y++) blocks.push(E.box(1, 1, 1, wood, [0, y, 0], { parent: g })); for (let dx = -2; dx <= 2; dx++) for (let dz = -1; dz <= 1; dz++) for (let dy = 0; dy < 2; dy++) if (Math.abs(dx) + Math.abs(dz) + dy < 4) blocks.push(E.box(1, 1, 1, leaf, [dx, hgt + dy, dz], { parent: g })); R.trees.push({ g, blocks }); return { g, blocks }; };
  R.hero = tree(x0 + 2.5, z0 - 1.5, 4); for (const [x, z] of [[-7, -6], [-12, -10], [8, -9], [13, -14], [-4, -16], [18, -6], [-18, -5]]) tree(x0 + x, z0 + z, 3 + Math.floor(rnd() * 3));
  R.sun = E.box(3, 3, 0.2, E.flat("#fff27a", { fog: false }), [x0, 30, z0 - 70], { noShadow: true, center: true }); R.sun.userData.noink = true;
  R.moon = E.box(2.6, 2.6, 0.2, E.flat("#e8eaff", { fog: false }), [x0, -40, z0 - 70], { noShadow: true, center: true }); R.moon.userData.noink = true;
  R.clouds = []; for (let i = 0; i < 8; i++) { const c = E.box(4 + rnd() * 4, 0.8, 2 + rnd() * 2, E.flat("#ffffff", { fog: false }), [x0 + (rnd() - 0.5) * 70, 16 + rnd() * 6, z0 - 30 - rnd() * 30], { noShadow: true, center: true }); c.userData.noink = true; R.clouds.push(c); }
  R.hole = E.box(1, 0.02, 1, E.flat("#0a0a0a"), [x0 - 1.5, 0.012, z0 + 2], { noShadow: true, center: true }); R.hole.visible = false;
  /** day 0 = noon, 1 = night */
  R.setDay = (d) => { R.sun.position.y = 30 - d * 70; R.moon.position.y = -40 + d * 64; };
  return R;
}

/** Turbo City avenue along x, centred at (x0, 0, z0). Lanes at z0 + [-7.5..7.5], white centre line at z0 */
export function turboCity(E, x0 = 400, z0 = 0) {
  const R = {}, M = (c) => E.mat(c);
  const asphalt = card(256, 256, (g) => { g.fillStyle = "#2f3140"; g.fillRect(0, 0, 256, 256); g.fillStyle = "#363849"; for (let i = 0; i < 60; i++) g.fillRect((i * 53) % 250, (i * 97) % 250, 4, 4); });
  asphalt.wrapS = asphalt.wrapT = THREE.RepeatWrapping; asphalt.repeat.set(40, 6);
  const road = E.plane(200, 16, E.mat("#ffffff", { map: asphalt }), [x0, 0.005, z0], { rot: [-Math.PI / 2, 0, 0] }); road.castShadow = false;
  for (let x = -100; x < 100; x += 4) for (const dz of [-2.67, 2.67, -5.33, 5.33]) { const m = E.box(2, 0.01, 0.14, E.flat("#e8e8e8"), [x0 + x, 0.012, z0 + dz], { noShadow: true, center: true }); m.userData.noink = true; }
  const cl = E.box(200, 0.012, 0.22, E.flat("#ffffff"), [x0, 0.014, z0], { noShadow: true, center: true }); cl.userData.noink = true;
  for (const s of [-1, 1]) { E.box(200, 0.25, 5, M("#9a96a8"), [x0, 0, z0 + s * 10.5]); for (let x = -90; x < 90; x += 9) { if (s > 0) continue; const g = E.group(null, [x0 + x, 0.25, z0 + s * 10.2]); E.cyl(0.18, 0.24, 6, M("#8a6a46"), [0, 0, 0], { parent: g, seg: 6 }); for (let i = 0; i < 6; i++) E.box(2.6, 0.12, 0.6, M("#3f9a3a"), [Math.cos(i) * 1.1, 6, Math.sin(i) * 1.1], { parent: g, rot: [0, i, -0.35] }); } }
  const cols = ["#ff4fa3", "#19e0c6", "#9b4dff", "#ffb84d", "#4d9bff"];
  for (let x = -100; x < 100; x += 11) { const h = 10 + rnd() * 28, c = cols[Math.floor(rnd() * 5)]; E.box(10, h, 8, M("#2a2440"), [x0 + x, 0, z0 - 19]); for (let y = 2; y < h - 1; y += 2.2) E.box(8.6, 0.25, 0.05, E.flat(c), [x0 + x, y, z0 - 14.97], { noShadow: true }); }
  R.cars = []; return R;
}

/** Cape City: dusk street with rubble and a skyline, centred at (x0, 0, z0) */
export function capeCity(E, x0 = 600, z0 = 0) {
  const R = {}, M = (c) => E.mat(c);
  const fl = E.plane(120, 120, M("#5a5470"), [x0, 0, z0], { rot: [-Math.PI / 2, 0, 0] }); fl.castShadow = false;
  for (let i = 0; i < 40; i++) { const s = 0.3 + rnd() * 1.2; E.box(s, s * 0.6, s, M(rnd() > 0.5 ? "#7a7488" : "#4a4458"), [x0 + (rnd() - 0.5) * 30, 0, z0 - 2 - rnd() * 14], { rot: [rnd(), rnd() * 3, rnd()] }); }
  for (let i = 0; i < 16; i++) { const h = 14 + rnd() * 30, x = x0 - 60 + i * 8; const b = E.box(6, h, 6, M("#3a3050"), [x, 0, z0 - 30 - rnd() * 10]); for (let y = 2; y < h - 2; y += 3) if (rnd() > 0.3) E.box(1.2, 1.2, 0.05, E.flat(rnd() > 0.5 ? "#ffd27a" : "#2a2238"), [x - 1.5 + Math.floor(rnd() * 3) * 1.5, y, z0 - 26.9 - (0)], { noShadow: true }); }
  R.cape = E.box(0.9, 1.4, 0.05, M("#ffffff"), [x0, -60, z0], { noShadow: true, center: true });
  return R;
}
