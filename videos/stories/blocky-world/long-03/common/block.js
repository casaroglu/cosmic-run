// Long 3 · sets: Donut Planet (inside) + its shop front and street (outside, z < -5), the alley, the TOP-shot block.
// Interior: x -8..8, z -5..5, floor y 0. The back wall (z = -5) IS the shop front: window x 0.2..4.2, door x 4.9..6.3.
// Outside: pavement z -5.3..-10, road z -10..-17, buildings across at z -19. Alley gap at x 8.2..10.6.
import * as THREE from "three";
import { cv, live, F, INK, zubbit, mysteryBox, tent, chair } from "./l3.js";
export const WIN = [0.2, 4.2, 0.9, 3.2], DOOR = [4.9, 6.3], H = 6.2, MACH = [7.05, 0, -4.35];
const fit = (g, txt, maxW, px, wgt = 900) => { let s = px; g.font = F(s, wgt); while (g.measureText(txt).width > maxW && s > 8) { s -= 2; g.font = F(s, wgt); } return s; };

export function block(E, o = {}) {
  const { T } = E, R = {}, M = (c, x) => E.mat(c, x);
  // ---------- interior ----------
  const wp = T.wallpaper("#ffd1e3", "#ffc2da", "stripe"), fl = T.tiles("#fff6fb", "#ffb3d4", 10).clone(); fl.needsUpdate = true; fl.repeat.set(16 * 0.3, 10 * 0.3);
  const fm = E.plane(16, 10, M("#ffffff", { map: fl }), [0, 0, 0], { rot: [-Math.PI / 2, 0, 0] }); fm.castShadow = false;
  for (const s of [-1, 1]) { const t = wp.clone(); t.needsUpdate = true; t.repeat.set(10 / 4, 1); E.plane(10, H, M("#ffffff", { map: t }), [s * 8, H / 2, 0], { rot: [0, -s * Math.PI / 2, 0] }); }
  E.plane(16, 10, M("#f4ecdc"), [0, H, 0], { rot: [Math.PI / 2, 0, 0] });
  // front wall (z -5): boxes around the window and the door. +z face wallpaper, -z face painted brick
  const brick = T.brick("#7a3a5a"), wIn = (w, h) => { const t = wp.clone(); t.needsUpdate = true; t.repeat.set(w / 4, h / H); return M("#ffffff", { map: t }); }, wOut = (w, h) => { const t = brick.clone(); t.needsUpdate = true; t.repeat.set(w / 2.5, h / 2.5); return M("#ffffff", { map: t }); }, edge = M("#5a2a44");
  const wall = (x0, x1, y0, y1) => { const w = x1 - x0, h = y1 - y0; E.box(w, h, 0.3, [edge, edge, edge, edge, wIn(w, h), wOut(w, h)], [(x0 + x1) / 2, y0, -5.15]); };
  wall(-8, WIN[0], 0, H); wall(WIN[0], WIN[1], 0, WIN[2]); wall(WIN[0], WIN[1], WIN[3], H); wall(WIN[1], DOOR[0], 0, H); wall(DOOR[0], DOOR[1], 2.6, H); wall(DOOR[1], 8, 0, H);
  E.box(16, 0.5, 0.06, M("#ff7fb8"), [0, 0, -4.98]);
  // window frame + glass
  const fr = M("#ffffff"); E.box(WIN[1] - WIN[0] + 0.2, 0.14, 0.4, fr, [(WIN[0] + WIN[1]) / 2, WIN[2] - 0.07, -5.15]); E.box(WIN[1] - WIN[0] + 0.2, 0.14, 0.36, fr, [(WIN[0] + WIN[1]) / 2, WIN[3] - 0.07, -5.15]); for (const x of WIN.slice(0, 2)) E.box(0.14, WIN[3] - WIN[2], 0.36, fr, [x, WIN[2], -5.15]);
  R.glass = E.plane(WIN[1] - WIN[0], WIN[3] - WIN[2], new THREE.MeshBasicMaterial({ color: "#bfe4ff", transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide }), [(WIN[0] + WIN[1]) / 2, (WIN[2] + WIN[3]) / 2, -5.12], { noink: true, noShadow: true });
  const ws = cv(1024, 320, (g, w, h) => { g.clearRect(0, 0, w, h); g.fillStyle = "#fffbe6"; g.beginPath(); g.roundRect(10, 10, w - 20, h - 20, 30); g.fill(); g.lineWidth = 10; g.strokeStyle = "#ff7fb8"; g.stroke(); g.textAlign = "center"; g.textBaseline = "middle"; g.font = F(130, 800); g.fillStyle = "#e0262e"; g.save(); g.translate(w / 2, 112); g.rotate(-0.04); g.fillText("OPEN", 0, 0); g.restore(); g.font = F(96, 800); g.fillStyle = "#ff8a1f"; g.fillText("THANKSGIVING", w / 2, 236); });
  R.winSign = E.plane(1.3, 0.4, new THREE.MeshBasicMaterial({ map: ws, transparent: true, side: THREE.DoubleSide }), [WIN[0] + 0.8, WIN[3] - 0.38, -5.1], { noShadow: true }); R.winSign.userData.noink = true;
  // door (opens inward around its hinge at DOOR[1])
  for (const x of DOOR) E.box(0.14, 2.7, 0.4, fr, [x, 0, -5.15]); E.box(DOOR[1] - DOOR[0] + 0.14, 0.16, 0.4, fr, [(DOOR[0] + DOOR[1]) / 2, 2.6, -5.15]);
  R.door = E.group(null, [DOOR[1] - 0.05, 0, -5.05]); E.box(1.3, 2.5, 0.08, M("#8fd3ff"), [-0.65, 0.05, 0], { parent: R.door }); E.box(0.08, 0.3, 0.12, M("#ffffff"), [-1.15, 1.1, 0], { parent: R.door });
  // DONUT PLANET sign (inside) + shelves + clock
  const sign = cv(1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke(); g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6); g.lineWidth = 16; g.strokeStyle = "#ffe14a"; g.beginPath(); g.arc(120, h / 2, 52, 0, 7); g.stroke(); });
  E.plane(4.2, 1.05, E.flat("#ffffff", { map: sign, fog: false }), [-4.4, 4.5, -4.98], { noink: true });
  const ic = ["#ff7fb8", "#7a4a2a", "#ffe14a", "#19e0c6", "#ffffff", "#9b4dff", "#ff8a1f"];
  for (const y of [1.25, 1.95]) { E.box(5.6, 0.08, 0.5, M("#ffffff"), [-4.1, y, -4.75]); for (let i = 0; i < 10; i++) { const d = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.075, 6, 12), M("#e7b06a")); d.rotation.x = Math.PI / 2; d.position.set(-6.6 + i * 0.55, y + 0.12, -4.7); E.add(d); const ii = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.07, 6, 12), M(ic[(i + (y > 1.5 ? 2 : 0)) % 7])); ii.rotation.x = Math.PI / 2; ii.position.set(-6.6 + i * 0.55, y + 0.15, -4.7); ii.scale.set(1, 1, 0.75); E.add(ii); } }
  R.clockL = live(512, 220); R.clock = (txt, ampm = "PM") => R.clockL.set(txt + ampm, (g) => { g.fillStyle = "#14101c"; g.fillRect(0, 0, 512, 220); g.font = F(150, 800); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#ff3030"; g.fillText(txt, 220, 116); g.font = F(56); g.fillText(ampm, 432, 70); });
  R.clock("9:00"); R.clockPos = [-1.3, 3.3, -4.97]; E.plane(1.3, 0.56, E.flat("#ffffff", { map: R.clockL.tex, fog: false }), R.clockPos, { noink: true });
  S_counter(E, R);
  // lost & found
  R.lf = E.group(null, [-1.9, 1.18, -1.75]); E.box(0.9, 0.5, 0.6, M("#c79a5b", { map: T.planks("#c79a5b", 4) }), [0, 0, 0], { parent: R.lf }); E.plane(0.86, 0.22, M("#ffffff", { map: cv(512, 128, (g, w, h) => { g.fillStyle = "#c79a5b"; g.fillRect(0, 0, w, h); g.font = F(54); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = INK; g.fillText("LOST & FOUND", w / 2, h / 2); }) }), [0, 0.26, 0.31], { parent: R.lf, noShadow: true });
  // ---------- ticker + price board (over the counter, above the window) ----------
  R.tickL = live(1600, 420); R.tickerPos = [1.25, 4.25, -4.93];
  R.ticker = (price, up = true, dim = 0) => R.tickL.set(price + up + dim, (g, w, h) => { g.fillStyle = "#0c0a10"; g.fillRect(0, 0, w, h); g.strokeStyle = "#3a3a48"; g.lineWidth = 16; g.strokeRect(8, 8, w - 16, h - 16);
    g.fillStyle = "rgba(255,255,255,0.04)"; for (let x = 20; x < w; x += 14) for (let y = 20; y < h; y += 14) g.fillRect(x, y, 6, 6);
    g.textBaseline = "middle"; g.textAlign = "left"; g.shadowBlur = 24; const c = up ? "#7dff7a" : "#ff3d3d"; g.shadowColor = c;
    g.font = F(88, 800); g.fillStyle = "#ffb02a"; g.fillText("GOLD ZUBBIT — RESALE", 60, 120); const tw = g.measureText("GOLD ZUBBIT — RESALE ").width; g.fillStyle = c; g.font = F(104); g.fillText(price + (up ? " ▲" : " ▼"), 60 + tw, 120);
    g.shadowColor = "#ffb02a"; g.fillStyle = "#ffe14a"; fit(g, "WORTH = WHAT THE NEXT PERSON PAYS", w - 120, 92, 800); g.textAlign = "center"; g.fillText("WORTH = WHAT THE NEXT PERSON PAYS", w / 2, 290); g.shadowBlur = 0; });
  R.ticker("$9,999"); R.tickG = E.group(null, [0, 0, 0]); R.tickerM = E.plane(3.2, 0.84, E.flat("#ffffff", { map: R.tickL.tex, fog: false }), R.tickerPos, { noink: true, parent: R.tickG }); E.box(3.34, 0.98, 0.06, M("#23232e"), [R.tickerPos[0], R.tickerPos[1] - 0.49, -4.99], { parent: R.tickG });
  R.boardL = live(1200, 640); R.boardPos = [4.35, 4.35, -4.93];
  /** price board: state 0 = $9,999, 1 = $2 — BLACK FRIDAY, 2 = SOLD. OWNER: PIXI; k = tiles flipped toward the next state (0..1) */
  const BL = [["DONUT", "$1"], ["COFFEE", "$9"], ["TOAST'S WEEKENDS", "$9,999"]];
  R.board = (state = 0, k = 0) => { const q = Math.round(k * 12); R.boardL.set(state + "/" + q, (g, w, h) => { g.fillStyle = "#1a1626"; g.fillRect(0, 0, w, h); g.strokeStyle = "#ffe14a"; g.lineWidth = 14; g.strokeRect(7, 7, w - 14, h - 14);
    g.textBaseline = "middle"; g.font = F(60); g.textAlign = "center"; g.fillStyle = "#ffe14a"; g.fillText("PRICES", w / 2, 62);
    const rows = [BL[0], BL[1], state === 0 ? BL[2] : state === 1 ? ["TOAST'S WEEKENDS", "$2"] : ["TOAST'S WEEKENDS", "SOLD"]];
    rows.forEach(([a, b], i) => { const y = 170 + i * 120; g.fillStyle = "#2c2640"; g.fillRect(40, y - 48, w - 80, 96); g.textAlign = "left"; g.fillStyle = "#ffffff"; fit(g, a, 620, 64); g.fillText(a, 64, y + 2); g.textAlign = "right"; g.fillStyle = i === 2 ? "#ff7fb8" : "#7dff7a"; g.font = F(74); g.fillText(b, w - 64, y + 2); });
    const sub = state === 1 ? "— BLACK FRIDAY —" : state === 2 ? "OWNER: PIXI" : ""; if (sub) { g.textAlign = "center"; g.fillStyle = state === 2 ? "#19e0c6" : "#ff3d3d"; g.font = F(66); g.fillText(sub, w / 2, 560); }
    if (q > 0 && q < 12) { const n = 12; for (let i = 0; i < n; i++) if (i >= q) { g.fillStyle = "#0e0b16"; g.fillRect(40 + i * (w - 80) / n, 362, (w - 80) / n - 4, 96); g.fillStyle = "#3a3450"; g.fillRect(40 + i * (w - 80) / n, 408, (w - 80) / n - 4, 4); } } }); };
  R.board(0); R.boardG = E.group(null, [0, 0, 0]); R.boardM = E.plane(2.4, 1.28, E.flat("#ffffff", { map: R.boardL.tex, fog: false }), R.boardPos, { noink: true, parent: R.boardG }); E.box(2.54, 1.42, 0.06, M("#ffe14a"), [R.boardPos[0], R.boardPos[1] - 0.71, -4.99], { parent: R.boardG });
  // ---------- machine + poster ----------
  R.mach = E.group(null, [MACH[0], 0, MACH[2]]); const col = "#6a2ab8";
  E.box(1.5, 2.6, 1.0, M(col), [0, 0, 0], { parent: R.mach });
  const face = cv(600, 1040, (g, w, h) => { g.fillStyle = col; g.fillRect(0, 0, w, h); g.fillStyle = "#ffffff"; g.font = F(76); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("ZUBBIT", w / 2, 70); g.font = F(46); g.fillText("MYSTERY BOX · $1", w / 2, 136);
    g.fillStyle = "#1a1030"; g.fillRect(50, 190, 500, 330); for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { g.fillStyle = "#a85af0"; g.fillRect(80 + c * 118, 220 + r * 140, 90, 90); g.fillStyle = "#fff"; g.font = F(70); g.fillText("?", 125 + c * 118, 272 + r * 140); }
    g.fillStyle = "#0a0812"; g.fillRect(50, 540, 500, 200); g.fillStyle = "#1a1030"; g.fillRect(170, 760, 260, 0);
    g.fillStyle = "#fffbe6"; g.fillRect(40, 780, 520, 230); g.lineWidth = 10; g.strokeStyle = INK; g.strokeRect(40, 780, 520, 230); g.fillStyle = INK; g.font = F(56); g.fillText("LIMIT:", w / 2, 830); g.font = F(66); const parts = [["1 BOX", "#ff2d2d"], [" PER", INK]]; let tw = parts.reduce((a, p) => a + g.measureText(p[0]).width, 0), x = w / 2 - tw / 2; g.textAlign = "left"; for (const [s, c] of parts) { g.fillStyle = c; g.fillText(s, x, 900); x += g.measureText(s).width; } g.textAlign = "center"; g.fillStyle = INK; g.fillText("PERSON", w / 2, 965); });
  E.plane(1.42, 2.46, M("#ffffff", { map: face }), [0, 1.3, 0.505], { parent: R.mach, noShadow: true });
  R.dispL = live(800, 320); R.disp = (l1, l2 = "", c = "#7fffd4") => R.dispL.set(l1 + l2 + c, (g, w, h) => { g.fillStyle = "#06120e"; g.fillRect(0, 0, w, h); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = c; g.shadowColor = c; g.shadowBlur = 20; fit(g, l1, w - 50, 120); g.fillText(l1, w / 2, l2 ? 105 : h / 2); if (l2) { fit(g, l2, w - 50, 100); g.fillText(l2, w / 2, 230); } });
  R.disp("$1", "1 PER PERSON"); E.plane(1.18, 0.47, E.flat("#ffffff", { map: R.dispL.tex, fog: false }), [0, 1.62, 0.51], { parent: R.mach, noink: true });
  R.machSlot = E.group(R.mach, [0, 0.85, 0.6]); E.box(0.7, 0.36, 0.1, M("#1a1030"), [0, 0, -0.05], { parent: R.machSlot });
  const post = cv(1600, 1200, (g, w, h) => { g.fillStyle = "#2a1650"; g.fillRect(0, 0, w, h); g.lineWidth = 30; g.strokeStyle = "#ffc21a"; g.strokeRect(15, 15, w - 30, h - 30);
    g.fillStyle = "#ffc21a"; g.shadowColor = "#ffe27a"; g.shadowBlur = 50; g.beginPath(); g.roundRect(w / 2 - 260, 220, 520, 420, 80); g.fill(); for (const x of [-160, 0, 160]) g.fillRect(w / 2 + x - 44, 120, 88, 120); g.shadowBlur = 0;
    g.fillStyle = "#2a1650"; g.beginPath(); g.arc(w / 2 - 120, 400, 32, 0, 7); g.arc(w / 2 + 120, 400, 32, 0, 7); g.fill(); g.fillStyle = "#ff7fb8"; g.beginPath(); g.arc(w / 2, 560, 36, 0, 7); g.fill(); g.fillStyle = "#e7b06a"; g.beginPath(); g.arc(w / 2, 560, 14, 0, 7); g.fill();
    g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#ffffff"; g.font = F(170); g.fillText("GOLD ZUBBIT", w / 2, 800); g.fillStyle = "#ffc21a"; g.font = F(150); g.fillText("1 IN 144", w / 2, 980);
  });
  R.posterPos = [MACH[0], 3.75, -4.95]; R.posterG = E.group(null, [0, 0, 0]); R.poster = E.plane(1.6, 1.2, E.flat("#ffffff", { map: post, fog: false }), R.posterPos, { noink: true, parent: R.posterG });
  const smp = cv(1024, 64, (g, w, h) => { g.fillStyle = "#2a1650"; g.fillRect(0, 0, w, h); g.fillStyle = "#cfc6ff"; g.font = F(50, 800); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("CRAZE ENDS FRIDAY 3:00 AM.", w / 2, h / 2 + 2); });
  R.smallPt = [MACH[0], 3.75 - 0.53, -4.945]; E.plane(0.44, 0.0275, E.flat("#ffffff", { map: smp, fog: false }), R.smallPt, { noink: true, parent: R.posterG });
  // ---------- outside ----------
  if (o.outside !== false) outside(E, R);
  R.H = H; return R;
}
function S_counter(E, R) { E.S.counter(0.2, -1.8, { w: 6, col: "#ff7fb8", top: "#fff6fb" }); R.counterTop = 1.18; }

function outside(E, R) {
  const { T } = E, M = (c, x) => E.mat(c, x);
  const pv = T.stone("#9a96a8").clone(); pv.needsUpdate = true; pv.repeat.set(60 / 2, 5 / 2); E.box(60, 0.02, 5, M("#ffffff", { map: pv }), [0, -0.02, -7.6]);
  E.box(60, 0.18, 0.3, M("#c8c4d0"), [0, -0.1, -10.1]);
  const as = T.stone("#2f3140").clone(); as.needsUpdate = true; as.repeat.set(20, 3); E.box(60, 0.02, 7, M("#ffffff", { map: as }), [0, -0.2, -13.6]);
  for (let x = -28; x < 30; x += 4) { const m = E.box(2, 0.01, 0.16, E.flat("#e8e8e8"), [x, -0.17, -13.6], { noShadow: true }); m.userData.noink = true; }
  E.box(60, 0.02, 4, M("#ffffff", { map: pv }), [0, -0.02, -19]);
  // shop upper storey + parapet; neighbours left/right; alley gap at x 8.2..10.6 (back wall at z 2)
  const up = T.brick("#7a3a5a").clone(); up.needsUpdate = true; up.repeat.set(16 / 2.5, 4 / 2.5); E.box(16, 4, 0.3, M("#ffffff", { map: up }), [0, H, -5.15]); E.box(16.4, 0.3, 0.5, M("#5a2a44"), [0, H + 4, -5.15]);
  for (let i = 0; i < 4; i++) E.box(1.4, 1.6, 0.05, E.flat(i % 2 ? "#ffd27a" : "#2a2238"), [-5.5 + i * 3.6, H + 1.2, -5.32], { noShadow: true });
  const nb = (x0, x1, col, h) => { const t = T.brick(col).clone(); t.needsUpdate = true; t.repeat.set((x1 - x0) / 2.5, h / 2.5); E.box(x1 - x0, h, 8, M("#ffffff", { map: t }), [(x0 + x1) / 2, 0, -1.3]); for (let y = 1; y < h - 1; y += 2.6) for (let x = x0 + 1; x < x1 - 1; x += 2.4) E.box(1.2, 1.4, 0.05, E.flat((x * 7 + y * 3) % 5 > 2 ? "#ffd27a" : "#2a2238"), [x + 0.6, y, -5.33], { noShadow: true }); };
  nb(-30, -8.3, "#4a5a8a", 12); nb(10.6, 30, "#5a6a5a", 11);
  E.box(2.4, 12, 0.3, M("#3a2a3a", { map: T.brick("#3a2a3a") }), [9.4, 0, 2.5]); E.box(0.3, 12, 7.5, M("#3a2a3a"), [8.3, 0, -1.4]);
  // across the street (facing the shop)
  E.S.row(-30, 30, -24, { d: 8, seed: 21 });
  // shop front dressing: exterior sign, door LED strip, small ticker over the door, steps, bulbs
  const sg = cv(1024, 256, (g, w, h) => { g.fillStyle = "#3a1240"; g.beginPath(); g.roundRect(8, 8, w - 16, h - 16, 60); g.fill(); g.lineWidth = 14; g.strokeStyle = "#ff4fa3"; g.stroke(); g.font = F(118); g.textAlign = "center"; g.textBaseline = "middle"; g.shadowColor = "#ff7fd0"; g.shadowBlur = 30; g.fillStyle = "#fff0fa"; g.fillText("DONUT PLANET", w / 2 + 50, h / 2 + 6); g.shadowBlur = 0; g.lineWidth = 16; g.strokeStyle = "#ffe14a"; g.beginPath(); g.arc(120, h / 2, 52, 0, 7); g.stroke(); });
  R.extSignPos = [1.5, 4.6, -5.34]; const es = E.plane(5.2, 1.3, E.flat("#ffffff", { map: sg, fog: false }), R.extSignPos, { noink: true }); es.rotation.y = Math.PI;
  R.ledL = live(1400, 200); R.led = (txt, col = "#ff3030") => R.ledL.set(txt + col, (g, w, h) => { g.fillStyle = "#0a0608"; g.fillRect(0, 0, w, h); g.fillStyle = "rgba(255,255,255,0.05)"; for (let x = 8; x < w; x += 12) for (let y = 8; y < h; y += 12) g.fillRect(x, y, 5, 5); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 18; fit(g, txt, w - 40, 120, 800); g.fillText(txt, w / 2, h / 2 + 4); });
  R.led("DROP AT MIDNIGHT"); R.ledPos = [5.6, 3.05, -5.37]; const lm = E.plane(2.6, 0.37, E.flat("#ffffff", { map: R.ledL.tex, fog: false }), R.ledPos, { noink: true }); lm.rotation.y = Math.PI; E.box(2.7, 0.47, 0.1, M("#23232e"), [5.6, 2.81, -5.3]);
  R.xtickPos = [5.6, 3.75, -5.37]; const xt = E.plane(2.6, 0.68, E.flat("#ffffff", { map: R.tickL.tex, fog: false }), R.xtickPos, { noink: true }); xt.rotation.y = Math.PI; E.box(2.72, 0.8, 0.1, M("#23232e"), [5.6, 3.35, -5.3]);
  E.box(1.8, 0.2, 0.5, M("#b8b4c4"), [5.6, 0, -5.55]); E.box(1.8, 0.4, 0.3, M("#c8c4d0"), [5.6, 0, -5.42]); R.stepTop = 0.4;
  R.bulbs = []; for (let i = 0; i < 30; i++) { const x = -7.8 + i * 0.53, y = 3.35 - 0.25 * Math.sin((i % 6) / 6 * Math.PI); R.bulbs.push(E.sphere(0.07, E.flat(i % 3 ? "#ffd27a" : "#ffb04a"), [x, y, -5.45])); }
  // street lamps
  for (const x of [-10, 13]) { E.cyl(0.08, 0.1, 5, M("#2a2a36"), [x, 0, -9.6], { seg: 8 }); E.box(0.8, 0.12, 0.3, M("#2a2a36"), [x, 5, -9.4]); E.box(0.6, 0.08, 0.26, E.flat("#fff0c0"), [x, 4.94, -9.4]); }
  // doormat
  E.box(1.2, 0.03, 0.8, M("#5a3a2a"), [5.6, 0.0, -4.4]);
}

/** the line outside: rope posts with a chain, ticket dispenser, home café, tents (returns handles) */
export function lineProps(E) {
  const R = {}, M = (c) => E.mat(c), sil = E.mat("#d8dde6", { emissive: "#2a2e38" });
  R.postsX = [4.0, 2.2, 0.4, -1.4, -3.2, -5.0, -6.8]; R.posts = R.postsX.map((x) => { const g = E.group(null, [x, 0, -6.0]); E.cyl(0.16, 0.2, 0.06, sil, [0, 0, 0], { parent: g, seg: 12 }); E.cyl(0.04, 0.04, 1.0, sil, [0, 0, 0], { parent: g, seg: 8 }); E.sphere(0.07, sil, [0, 1.03, 0], { parent: g, seg: 10 }); return g; });
  R.chain = []; for (let i = 0; i < R.postsX.length - 1; i++) { const a = R.postsX[i], b = R.postsX[i + 1], n = 9; const seg = []; for (let k = 0; k < n; k++) { const t = (k + 0.5) / n, x = a + (b - a) * t, y = 0.95 - 0.28 * Math.sin(Math.PI * t); seg.push(E.box(0.2, 0.04, 0.04, E.mat("#b8bcc6"), [x, y, -6.0], { center: true, noShadow: true })); } R.chain.push(seg); }
  // dispenser on the first post
  R.disp = E.group(R.posts[0], [0, 1.1, 0]); E.box(0.3, 0.36, 0.22, E.mat("#e0262e"), [0, 0, 0], { parent: R.disp }); E.box(0.18, 0.04, 0.03, E.mat("#ffffff"), [0, 0.12, -0.12], { parent: R.disp });
  // home café
  R.cafe = E.group(null, [-2.3, 0, -7.7]); E.box(0.6, 0.6, 0.5, M("#3a3a48"), [0, 0, 0], { parent: R.cafe }); E.cyl(0.12, 0.12, 0.08, M("#555a66"), [0, 0.6, 0], { parent: R.cafe, seg: 10 }); E.cyl(0.03, 0.04, 0.35, M("#d8dde6"), [0.2, 0.6, 0.05], { parent: R.cafe, seg: 6 }); E.cyl(0.07, 0.06, 0.14, M("#ffffff"), [-0.15, 0.6, 0.08], { parent: R.cafe, seg: 10 });
  const cs = cv(700, 360, (g, w, h) => { g.fillStyle = "#c9925a"; g.fillRect(0, 0, w, h); g.strokeStyle = "#8a5a36"; g.lineWidth = 10; g.strokeRect(5, 5, w - 10, h - 10); g.fillStyle = INK; g.textAlign = "center"; g.textBaseline = "middle"; g.font = F(110, 800); g.fillText("HOME CAFÉ", w / 2, 120); g.font = F(64, 800); g.fillText("(INSIDE IT'S $9)", w / 2, 250); });
  const sg = E.group(R.cafe, [0, 0.62, -0.25]); E.plane(0.9, 0.46, E.mat("#ffffff", { map: cs, side: THREE.DoubleSide }), [0, 0.3, 0], { parent: sg, rot: [0, Math.PI, 0], noShadow: true });
  return R;
}

/** the alley (own location at x0): brick walls, one hanging lamp, a dumpster */
export function alley(E, x0 = -200) {
  const { T } = E, R = {}, M = (c, x) => E.mat(c, x);
  const gr = T.stone("#3a3848").clone(); gr.needsUpdate = true; gr.repeat.set(6, 8); const g0 = E.plane(14, 18, M("#ffffff", { map: gr }), [x0, 0, -3], { rot: [-Math.PI / 2, 0, 0] }); g0.castShadow = false;
  const br = (w, h) => { const t = T.brick("#7a4a3a").clone(); t.needsUpdate = true; t.repeat.set(w / 2.5, h / 2.5); return M("#ffffff", { map: t }); };
  E.box(10, 9, 0.4, br(10, 9), [x0, 0, -9]); E.box(0.4, 9, 16, br(16, 9), [x0 - 4.2, 0, -3]); E.box(0.4, 9, 16, br(16, 9), [x0 + 4.2, 0, -3]);
  R.lampPt = [x0 + 0.4, 5.2, -4.5]; R.lamp = E.group(null, R.lampPt); E.cyl(0.015, 0.015, 1.4, M("#2b2f3a"), [0, -1.4, 0], { parent: R.lamp, seg: 6 }); E.cone(0.5, 0.4, M("#3a4a3a"), [0, -1.8, 0], { parent: R.lamp, seg: 16 }); E.sphere(0.14, E.flat("#fff3c4"), [0, -1.78, 0], { parent: R.lamp });
  R.pl = new THREE.PointLight(0xffd8a0, 30, 12, 1.6); R.pl.position.set(0, -2.0, 0); R.lamp.add(R.pl);
  R.pool = E.plane(4.5, 4.5, new THREE.MeshBasicMaterial({ map: cv(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 10, 128, 128, 126); r.addColorStop(0, "rgba(255,220,150,0.55)"); r.addColorStop(1, "rgba(255,220,150,0)"); g.fillStyle = r; g.fillRect(0, 0, 256, 256); }), transparent: true, depthWrite: false }), [x0 + 0.4, 0.02, -4.5], { rot: [-Math.PI / 2, 0, 0], noink: true, noShadow: true });
  E.box(2.4, 1.4, 1.2, M("#2f6a3a"), [x0 - 2.6, 0, -7.4]); E.box(2.5, 0.12, 1.3, M("#24502c"), [x0 - 2.6, 1.4, -7.4], { rot: [0.15, 0, 0] });
  for (const z of [-2, -5]) E.box(0.06, 9, 0.06, M("#5a5a66"), [x0 + 3.95, 0, z]);
  R.x0 = x0; return R;
}

/** TOP-shot diorama of the square block at (x0, 0, 0): buildings in the middle, the pavement ring, the line as small figures.
 * path(u) gives a point on the pavement ring, u 0..1 starting at the shop door and going round. */
export function topBlock(E, x0 = 300, n = 120) {
  const R = {}, M = (c) => E.mat(c), S = 14;          // ring half-size
  E.box(80, 0.02, 80, E.flat("#23252f"), [x0, -0.02, 0]);
  E.box(2 * S + 3, 0.1, 2 * S + 3, M("#9a96a8"), [x0, 0, 0]);
  const cols = ["#7a3a5a", "#4a5a8a", "#5a6a5a", "#8a6a4a", "#6a4a7a"]; let k = 0;
  for (const x of [-7, 0, 7]) for (const z of [-7, 0, 7]) { if (x === 7 && z === 7) continue; E.box(6, 3 + ((k * 7) % 4), 6, M(cols[k++ % 5]), [x0 + x, 0.1, z]); }
  E.box(6, 3.6, 6, M("#ff7fb8"), [x0 + 7, 0.1, 7]); E.box(6, 0.2, 1.0, M("#3a1240"), [x0 + 7, 3.7, 10.2]);
  // path: door at (x0+9, S+0.4) going -x along the front, up the left side, along the back, down the right, ending at (x0+10.4, S+0.4)
  const P = [[6, S + 0.6], [-S - 0.6, S + 0.6], [-S - 0.6, -S - 0.6], [S + 0.6, -S - 0.6], [S + 0.6, S + 0.6], [7.6, S + 0.6]];
  const L = []; let tot = 0; for (let i = 0; i < P.length - 1; i++) { const d = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); L.push(d); tot += d; }
  R.path = (u) => { let d = Math.max(0, Math.min(1, u)) * tot; for (let i = 0; i < L.length; i++) { if (d <= L[i] || i === L.length - 1) { const t = Math.min(1, d / L[i]); return [x0 + P[i][0] + (P[i + 1][0] - P[i][0]) * t, P[i][1] + (P[i + 1][1] - P[i][1]) * t]; } d -= L[i]; } };
  const hc = ["#3f8ad8", "#57c84d", "#ffd23a", "#d84a7a", "#4ac8c8", "#9b4dff", "#ff8a5a", "#6a7ad8"];
  R.fig = []; for (let i = 0; i < n; i++) { const g = E.group(null, [0, 0, 0]); g.scale.setScalar(1.5); E.box(0.5, 0.9, 0.4, M(hc[(i * 5) % 8]), [0, 0.1, 0], { parent: g }); E.box(0.42, 0.42, 0.42, M(["#ffcf9e", "#c98d62", "#8a5a3a", "#f1c7a6"][i % 4]), [0, 1.0, 0], { parent: g }); const arms = [-1, 1].map((s) => { const a = E.group(g, [s * 0.32, 0.85, 0]); E.box(0.14, 0.5, 0.14, M(hc[(i * 5) % 8]), [0, -0.5, 0], { parent: a }); return a; }); const [x, z] = R.path(0.012 + (i / (n - 1)) * 0.975); g.position.set(x, 0.1, z); g.userData.arms = arms; g.userData.u = i / (n - 1); R.fig.push(g); }
  R.toast = E.group(null, [0, 0.1, 0]); E.box(0.6, 1.0, 0.5, M("#ff8a1f"), [0, 0, 0], { parent: R.toast }); E.box(0.5, 0.5, 0.5, M("#ffcf9e"), [0, 1.0, 0], { parent: R.toast });
  R.gran = E.group(null, [x0 + 9, 0.1, S + 0.6]); E.box(0.55, 0.9, 0.45, M("#7a3fb0"), [0, 0, 0], { parent: R.gran }); E.box(0.48, 0.48, 0.48, M("#d8d8d8"), [0, 0.9, 0], { parent: R.gran });
  R.x0 = x0; R.S = S; return R;
}
