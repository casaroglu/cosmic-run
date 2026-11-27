// Long 4: MEGA DONUT HEIST 2 — Glaze City corner + Turbo City avenue (Long 2), see-through row, props, cast.
import * as THREE from "three";
import { blocky, drawFace } from "../blocky/rig.js";
import { turboCity } from "./worlds.js";
import { car, donut } from "./props.js";
import { card } from "./l4.js";
import { F, INK } from "./ui.js";
export const X0 = 400;
const checkerTex = (rep = [4, 4]) => { const t = card(128, 128, (g) => { for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x + y) % 2 ? "#ff2fc8" : "#111111"; g.fillRect(x * 32, y * 32, 32, 32); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); t.magFilter = THREE.NearestFilter; return t; };
export function game(E) {
  const R = { w: turboCity(E, X0, 0) }, M = (c, o) => E.mat(c, o);
  // ---------- Glaze City corner (far pavement, x 368..392) ----------
  R.CX = 380; // corner centre x
  // missing-texture pavement section (before PATCH 1.01) and its finished paving
  R.checker = E.plane(24, 5, E.mat("#ffffff", { map: checkerTex([24, 5]) }), [R.CX, 0.262, -10.5], { rot: [-Math.PI / 2, 0, 0], noShadow: true });
  const pav = card(256, 256, (g) => { g.fillStyle = "#c9c3d6"; g.fillRect(0, 0, 256, 256); g.strokeStyle = "#a9a3b8"; g.lineWidth = 6; for (let i = 0; i <= 256; i += 64) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 256); g.moveTo(0, i); g.lineTo(256, i); g.stroke(); } }); pav.wrapS = pav.wrapT = THREE.RepeatWrapping; pav.repeat.set(12, 2.5);
  R.paving = E.plane(24, 5, E.mat("#ffffff", { map: pav }), [R.CX, 0.263, -10.5], { rot: [-Math.PI / 2, 0, 0], noShadow: true }); R.paving.visible = false;
  R.setPatched = (on) => { R.paving.visible = on; R.checker.visible = !on; };
  // grass strip, one palm, a bench, a puddle on the road
  R.grass = E.box(6, 0.3, 3.6, M("#62c24a"), [R.CX + 7, 0, -10.6]);
  R.palm = E.S.tree(R.CX - 6, -11.6, { type: "palm", s: 1.0, col: "#3f9a3a" });
  R.bench = E.group(null, [R.CX + 1, 0.26, -12.2]); E.box(2.0, 0.12, 0.6, M("#a8743f"), [0, 0.5, 0], { parent: R.bench }); E.box(2.0, 0.5, 0.1, M("#a8743f"), [0, 0.62, -0.28], { parent: R.bench }); for (const x of [-0.85, 0.85]) E.box(0.1, 0.5, 0.5, M("#3a3550"), [x, 0, 0], { parent: R.bench });
  R.puddle = E.plane(2.4, 1.4, E.mat("#9fd8ff", { transparent: true, opacity: 0.55 }), [R.CX - 3, 0.02, -4.8], { rot: [-Math.PI / 2, 0, 0], noShadow: true }); R.puddle.userData.noink = true;
  // game billboard on the corner
  const bb = card(1024, 420, (g, w, h) => { const grd = g.createLinearGradient(0, 0, w, 0); grd.addColorStop(0, "#ff9a5a"); grd.addColorStop(1, "#ff4fa3"); g.fillStyle = grd; g.fillRect(0, 0, w, h); g.font = F(120); g.textAlign = "center"; g.lineWidth = 18; g.strokeStyle = INK; g.strokeText("MEGA DONUT HEIST 2", w / 2, 170); g.fillStyle = "#ffe14a"; g.fillText("MEGA DONUT HEIST 2", w / 2, 170); g.font = F(64); g.fillStyle = "#fff"; g.fillText("13 YEARS IN THE MAKING", w / 2, 300); });
  R.board = E.group(null, [R.CX - 14, 0.25, -13]); for (const x of [-2.5, 2.5]) E.box(0.3, 5, 0.3, M("#5a5f6a"), [x, 0, 0], { parent: R.board }); E.plane(8, 3.3, E.mat("#ffffff", { map: bb }), [0, 6.4, 0.2], { parent: R.board, noShadow: true }); E.box(8.3, 3.5, 0.2, M("#3a3550"), [0, 4.65, 0], { parent: R.board });
  // pigeon + butterfly
  R.pigeon = E.group(null, [R.CX + 4, 0.25, -9.0]); E.box(0.25, 0.2, 0.35, M("#8a8f99"), [0, 0, 0], { parent: R.pigeon }); E.box(0.15, 0.15, 0.15, M("#6a6f7a"), [0, 0.2, 0.15], { parent: R.pigeon }); E.box(0.05, 0.04, 0.08, M("#ff8a1f"), [0, 0.25, 0.26], { parent: R.pigeon });
  R.fly = E.group(null, [0, -50, 0]); R.flyW = [-1, 1].map((s) => { const p = E.group(R.fly, [0, 0, 0]); E.box(0.16, 0.01, 0.13, E.flat("#ffb84d"), [s * 0.08, 0, 0], { parent: p, center: true, noShadow: true }); return p; });
  R.butterfly = (pos, f) => { R.fly.position.set(...pos); const a = Math.sin(f * 1.3) * 0.9; R.flyW[0].rotation.z = a; R.flyW[1].rotation.z = -a; };
  // ---------- underside (seen from below): paper sheets ----------
  const paper = M("#e8e4ef", { side: THREE.BackSide }); R.under = E.group(null, [0, 0, 0]);
  E.plane(200, 16, paper, [X0, -0.01, 0], { parent: R.under, rot: [-Math.PI / 2, 0, 0], noShadow: true }); E.plane(200, 5, paper, [X0, -0.01, -10.5], { parent: R.under, rot: [-Math.PI / 2, 0, 0], noShadow: true }); E.plane(200, 5, paper, [X0, -0.01, 10.5], { parent: R.under, rot: [-Math.PI / 2, 0, 0], noShadow: true });
  // ---------- traffic, police bikes, helicopter, tank ----------
  const cols = ["#ff4d4d", "#19e0c6", "#ffe14a", "#4d9bff", "#9b4dff", "#ffffff", "#ff8a1f", "#57c84d"];
  R.cars = []; for (let i = 0; i < 10; i++) R.cars.push(car(E, cols[i % 8], i));
  R.bikes = []; for (let i = 0; i < 9; i++) { const g = E.group(null, [X0 + 18 + i * 0.6, 0, -6.4]); E.box(0.18, 0.5, 1.4, M("#1e3a8a"), [0, 0.35, 0], { parent: g }); E.box(0.2, 0.15, 0.4, M("#ffffff"), [0, 0.85, 0.4], { parent: g }); for (const z of [-0.55, 0.55]) E.cyl(0.32, 0.32, 0.12, M("#111"), [0, 0.32, z], { parent: g, rot: [0, 0, Math.PI / 2], center: true, seg: 10 }); E.box(0.12, 0.12, 0.12, E.flat("#4d9bff"), [0, 1.0, 0.5], { parent: g, noShadow: true }); R.bikes.push(g); }
  R.heli = E.group(null, [X0 + 20, 14, -3]); E.box(2.4, 1.2, 4.0, M("#2a2f45"), [0, 0, 0], { parent: R.heli }); R.blade = E.box(7, 0.05, 0.3, M("#111"), [0, 1.3, 0], { parent: R.heli }); E.box(0.4, 0.4, 3, M("#2a2f45"), [0, 0.4, -3.2], { parent: R.heli });
  R.spot = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.02, 32), new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.4 })); R.spot.userData.noink = true; E.scene.add(R.spot); R.spot.visible = false;
  R.beam = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 2.2, 14, 24, 1, true), new THREE.MeshBasicMaterial({ color: "#fffbe0", transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide })); R.beam.userData.noink = true; E.scene.add(R.beam); R.beam.visible = false;
  R.tank = E.group(null, [X0 + 60, 0, -4]); E.box(3.2, 1.2, 5, M("#4a5a3a"), [0, 0.3, 0], { parent: R.tank }); E.box(2.0, 0.9, 2.2, M("#5a6a4a"), [0, 1.5, 0], { parent: R.tank }); E.box(0.25, 0.25, 3.2, M("#3a4a2a"), [0, 1.95, 2.6], { parent: R.tank, center: true }); R.ind = E.box(0.3, 0.2, 0.1, E.flat("#ff8a1f"), [1.5, 1.0, 2.52], { parent: R.tank, noShadow: true });
  // ---------- the two Main Characters (far, silhouettes, sunglasses) ----------
  R.sil = [0, 1].map((i) => { const p = blocky(E, { skin: "#111", shirt: "#111", pants: "#111", shoe: "#111", face: { skin: "#111" } }); p.root.traverse((o) => { if (o.isMesh) o.material = E.flat("#140f1c"); }); p.faceMesh.visible = false; p.face = () => {}; p.glasses = E.box(0.8, 0.12, 0.05, E.flat("#ffd27a"), [0, 0.55, p.dims.HD / 2 + 0.03], { parent: p.head, noShadow: true }); return p; });
  R.silPos = [[X0 + 86, 0, -2.6], [X0 + 88, 0, 2.6]];
  // ---------- see-through row: salon, bathroom, vault (+ billboard with a head hole) ----------
  R.row = []; const RX = [414, 422, 430], RW = 6, RD = 4.4, RH = 4.2, RZ = -11.0;
  const sign = (txt, col) => card(512, 128, (g, w, h) => { g.fillStyle = col; g.fillRect(0, 0, w, h); g.font = F(70); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff"; g.lineWidth = 10; g.strokeStyle = INK; g.strokeText(txt, w / 2, h / 2 + 4); g.fillText(txt, w / 2, h / 2 + 4); });
  [["HAIR SALON", "#ff7fb8", "#ffe1ee"], ["BATHROOMS", "#4d9bff", "#e1f0ff"], ["DONUT VAULT", "#c79a2b", "#f6ecd0"], ["PARKING", "#7a8296", "#d8dce6"]].forEach(([nm, col, inside], i) => {
    const x = i < 3 ? RX[i] : 404, g = E.group(null, [x, 0.25, RZ]); const wall = M(col), inn = M(inside, { side: THREE.DoubleSide });
    const front = E.box(RW, RH, 0.2, wall, [0, 0, RD / 2], { parent: g }); const back = E.box(RW, RH, 0.2, wall, [0, 0, -RD / 2], { parent: g });
    const left = E.box(0.2, RH, RD, wall, [-RW / 2, 0, 0], { parent: g }); const right = E.box(0.2, RH, RD, wall, [RW / 2, 0, 0], { parent: g }); E.box(RW + 0.4, 0.3, RD + 0.4, M("#3a3550"), [0, RH, 0], { parent: g });
    E.plane(RW - 0.4, RD - 0.4, M(inside), [0, 0.01, 0], { parent: g, rot: [-Math.PI / 2, 0, 0], noShadow: true }); E.plane(RW - 0.4, RH, inn, [0, RH / 2, -RD / 2 + 0.11], { parent: g, noShadow: true });
    E.plane(3.2, 0.8, E.mat("#ffffff", { map: sign(nm, col) }), [0, RH - 0.7, RD / 2 + 0.11], { parent: g, noShadow: true });
    for (const s of [-1.8, 1.8]) E.box(1.2, 1.2, 0.05, E.flat("#2a3050"), [s, 1.6, RD / 2 + 0.11], { parent: g, noShadow: true });
    R.row.push({ g, front, back, left, right, x });
  });
  // salon: customer under a dryer hood
  const sal = R.row[0].g; R.cust = blocky(E, { skin: "#f1c7a6", shirt: "#7a3fb0", pants: "#4a2a6a", shoe: "#2a1a2a", face: { skin: "#f1c7a6", iris: "#2a2020", brow: "#4a3020" } }); sal.add(R.cust.root); R.cust.pose({ pos: [1.2, 0.05, -1.0], legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, face: "deadpan" });
  E.box(1.0, 0.55, 0.8, M("#ff7fb8"), [1.2, 0, -1.2], { parent: sal }); R.hoodFix = E.group(sal, [1.2, 2.55, -1.0]); E.cyl(0.62, 0.7, 0.7, M("#e8e8f0"), [0, 0, 0], { parent: R.hoodFix, seg: 16 }); E.cyl(0.05, 0.05, 1.8, M("#9aa3b2"), [0, -1.8, -0.5], { parent: R.hoodFix, seg: 6 });
  const dryer = () => { const g = E.group(null, [0, -50, 0]); E.cyl(0.62, 0.7, 0.7, M("#e8e8f0"), [0, 0, 0], { parent: g, seg: 16 }); return g; };
  R.wearHood = dryer();
  // bathroom: toilet + lamp
  const bath = R.row[1].g; E.box(0.6, 0.5, 0.8, M("#ffffff"), [-1.2, 0, -1.4], { parent: bath }); E.box(0.7, 0.9, 0.2, M("#ffffff"), [-1.2, 0, -1.9], { parent: bath }); E.box(0.1, 1.6, 0.1, M("#c0c0c8"), [1.6, 0, -1.6], { parent: bath }); E.cone(0.4, 0.5, M("#ffe14a"), [1.6, 1.6, -1.6], { parent: bath });
  R.wearSeat = E.group(null, [0, -50, 0]); const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.08, 6, 16), M("#ffffff")); ring.rotation.x = Math.PI / 2; E.add(ring, R.wearSeat);
  R.wearLamp = E.group(null, [0, -50, 0]); E.box(0.08, 0.9, 0.08, M("#c0c0c8"), [0, 0, 0], { parent: R.wearLamp }); E.cone(0.32, 0.4, M("#ffe14a"), [0, 0.9, 0], { parent: R.wearLamp });
  // vault: donuts stacked to the ceiling (instanced) + emptied state
  const vault = R.row[2].g; const ic = ["#ff7fb8", "#7a4a2a", "#ffe14a", "#19e0c6", "#ffffff", "#9b4dff"]; R.vaultDonuts = E.group(vault, [0, 0, 0]);
  const tg = new THREE.TorusGeometry(0.22, 0.11, 6, 10); for (let c = 0; c < ic.length; c++) { const im = new THREE.InstancedMesh(tg, M(ic[c]), 60); let k = 0; const m4 = new THREE.Matrix4(), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
    for (let y = 0; y < 12; y++) for (let x = 0; x < 10; x++) for (let z = 0; z < 3; z++) { if (((y * 30 + x * 3 + z) % ic.length) !== c) continue; if (k >= 60) continue; m4.compose(new THREE.Vector3(-2.4 + x * 0.53, 0.12 + y * 0.33, -1.6 + z * 0.75 + (y % 2) * 0.2), q, new THREE.Vector3(1, 1, 1)); im.setMatrixAt(k++, m4); } im.count = k; im.castShadow = true; vault.add(im); R.vaultDonuts.add(im); }
  vault.remove(R.vaultDonuts); vault.add(R.vaultDonuts);
  // billboard with a head-sized hole (a model's face missing)
  const bbm = card(800, 600, (g, w, h) => { g.fillStyle = "#19e0c6"; g.fillRect(0, 0, w, h); g.fillStyle = "#ffcf9e"; g.fillRect(300, 140, 200, 30); g.fillStyle = "#2f5fb0"; g.fillRect(250, 320, 300, 280); g.fillStyle = "#111"; g.fillRect(300, 150, 200, 170); g.font = F(80); g.textAlign = "center"; g.fillStyle = "#fff"; g.lineWidth = 12; g.strokeStyle = INK; g.strokeText("BE YOU.", w / 2, 90); g.fillText("BE YOU.", w / 2, 90); g.font = F(46); g.fillText("GLAZE CITY JEANS", w / 2, 560); });
  R.billboard = E.group(null, [438.5, 0.25, -10.4]); E.plane(4.6, 3.45, E.mat("#ffffff", { map: bbm }), [0, 1.6, 0.12], { parent: R.billboard, noShadow: true }); E.box(4.8, 1.55, 0.2, M("#3a3550"), [0, -0.1, 0], { parent: R.billboard }); E.box(4.8, 1.3, 0.2, M("#3a3550"), [0, 2.08, 0], { parent: R.billboard }); for (const x of [-1.65, 1.65]) E.box(1.5, 0.6, 0.2, M("#3a3550"), [x, 1.45, 0], { parent: R.billboard });
  // Donutsaurus-shaped holes (dark discs on the walls, shown once he has gone through)
  R.holes = []; RX.forEach((x) => { for (const s of [-1, 1]) { const h = E.group(null, [x + s * (RW / 2 + 0.12), 0.25, RZ], s > 0 ? Math.PI / 2 : -Math.PI / 2); E.cyl(1.1, 1.1, 0.02, E.flat("#0e0a16"), [0, 1.6, 0], { parent: h, rot: [Math.PI / 2, 0, 0], center: true, seg: 14 }); E.box(0.3, 0.7, 0.02, E.flat("#0e0a16"), [0, 2.9, 0.4], { parent: h }); h.visible = false; R.holes.push({ g: h, x: x + s * (RW / 2) }); } });
  // mission ring at the far end of the row
  R.ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.12, 8, 32), E.flat("#ffe14a", { transparent: true, opacity: 0.9 })); R.ring.rotation.x = Math.PI / 2; R.ring.position.set(447, 0.4, -11); R.ring.userData.noink = true; E.scene.add(R.ring);
  R.ringCol = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 3, 32, 1, true), new THREE.MeshBasicMaterial({ color: "#ffe14a", transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide })); R.ringCol.position.set(447, 1.75, -11); R.ringCol.userData.noink = true; E.scene.add(R.ringCol);
  // donut stand (scene 5)
  R.stand = E.group(null, [X0 - 8, 0.25, -9.4]); E.box(1.6, 1.0, 0.8, M("#ffd1e3"), [0, 0, 0], { parent: R.stand }); E.cone(1.0, 0.5, M("#ff7fb8"), [0, 2.3, 0], { parent: R.stand }); E.cyl(0.04, 0.04, 1.4, M("#9aa3b2"), [0, 1.0, 0], { parent: R.stand, seg: 6 }); R.standDonut = donut(E, R.stand, [0.2, 1.08, 0.1], 1.2);
  return R;
}
/** traffic: cars run in lanes along x; tw = world frame */
export function traffic(R, tw, on = true, xc = X0, lanes) { const LANES = lanes || [-6.0, -3.5, -1.2, 1.2, 3.5, 6.0]; R.cars.forEach((c, i) => { const lane = LANES[i % 6], dir = lane < 0 ? -1 : 1, per = 90, off = (i * 41) % per; const x = xc + dir * (((tw * 0.55 + off) % per) - per / 2); c.visible = on; c.position.set(x, 0, lane); c.rotation.set(0, dir > 0 ? Math.PI / 2 : -Math.PI / 2, 0); }); }
/** slow-motion idle of the two silhouettes; heart 0..1 = bicep heart, turn 0..1 = heads toward camera-ish target */
export function silPose(R, f, o = {}) { R.sil.forEach((p, i) => { const pos = (o.pos || R.silPos)[i]; const sway = 0.08 * Math.sin(f * 0.03 + i); p.pose({ pos, yaw: -Math.PI / 2 + (i ? -0.25 : 0.25) + (o.yaw || 0), head: [0, (1 - (o.turn || 0)) * (i ? -1.0 : 1.0), 0], armL: [sway, 0.15], armR: [-sway, 0.15], legL: 0.1 * Math.sin(f * 0.03), legR: -0.1 * Math.sin(f * 0.03), scale: 1.05 });
  if (o.heart) bicepHeart(p, o.heart);
  p.glasses.visible = !(o.glassesOff && o.glassesOff > 0.5); if (o.glassesOff) p.glasses.position.y = 0.55 + o.glassesOff * 0.5; else p.glasses.position.y = 0.55; }); }
/** the bicep heart on any rig (k 0..1) — call after pose() */
export function bicepHeart(P, k) { P.arms[1].rotation.set(0, 0, 1.55 * k); P.elbows[1].rotation.set(0, 0, 1.9 * k); P.arms[0].rotation.set(-1.1 * k, 0, 1.0 * k); P.elbows[0].rotation.set(-0.9 * k, 0, 0); }
/** T-pose: arms straight out */
export const TPOSE = { armL: [0, 1.57], armR: [0, 1.57], elbowL: 0, elbowR: 0, legL: 0, legR: 0 };
/** the Question Kid: half-size crowd kid, green hoodie */
export function questionKid(E) { const K = blocky(E, { skin: "#c98d62", shirt: "#57c84d", sleeve: "#57c84d", pants: "#2c3042", shoe: "#f4f4f4", face: { skin: "#c98d62", iris: "#3a2a22", brow: "#4a3020" },
  build: (P, E, M) => { const { HW, HH, HD } = P.dims; E.box(0.66, 0.62, 0.3, M("#ff4d4d"), [0, 0.06, -0.38], { parent: P.torso }); E.box(HW + 0.1, 0.16, HD + 0.06, M("#57c84d"), [0, HH - 0.06, -0.02], { parent: P.head }); } }); return K; }
