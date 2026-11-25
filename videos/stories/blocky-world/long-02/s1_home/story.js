// Long 2 · Scene 1 — Home: the box (19 shots). Built from scripts/LONG-02_shot-script.md
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { donut, controller } from "./common/props.js";
import { donutShop } from "./common/worlds.js";
import { textO, subtitle, battery, loading2, hudHome, INK, F } from "./common/ui.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, SH = [], SEG = [];
const FPS = 30, M = [-0.8, 0, 1.0];
const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
export async function build(E) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); SH = tl.shots; R.total = tl.total; } catch (e) {}
  try { SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  R.shop = donutShop(E, 0);
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E);
  // worn tile M
  R.tile = E.box(0.98, 0.012, 0.98, E.mat("#ffffff", { emissive: "#ffffff", emissiveIntensity: 0.25 }), [M[0], 0.004, M[2]], { noShadow: true });
  // mop (free object) — stands on its own
  R.mop = E.group(null, [0, 0, 0]); E.cyl(0.04, 0.04, 1.7, E.mat("#c79a5b"), [0, 0.1, 0], { parent: R.mop, seg: 8 }); E.box(0.5, 0.12, 0.22, E.mat("#19a0e0"), [0, 0.04, 0], { parent: R.mop }); for (let i = 0; i < 6; i++) E.box(0.06, 0.12, 0.06, E.mat("#f4f4f4"), [-0.2 + i * 0.08, 0, 0.08], { parent: R.mop });
  R.shop.mop.visible = false;
  // badge on Toast
  const bt = card(512, 128, (g, w, h) => { g.fillStyle = "#ffe14a"; g.fillRect(0, 0, w, h); g.strokeStyle = INK; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8); g.font = F(44); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = INK; g.fillText("NIGHT MANAGER", w / 2, 44); g.font = F(36); g.fillStyle = "#c0262e"; g.fillText("— FOREVER —", w / 2, 92); });
  E.plane(0.36, 0.09, E.mat("#ffffff", { map: bt }), [0.17, 0.52, 0.236], { parent: R.T.torso, noShadow: true });
  // box contents
  R.sock = E.group(null, [0, -50, 0]); E.box(0.12, 0.3, 0.1, E.mat("#ffffff"), [0, 0, 0], { parent: R.sock }); E.box(0.2, 0.1, 0.1, E.mat("#ffffff"), [0.06, 0, 0], { parent: R.sock }); E.box(0.13, 0.05, 0.11, E.mat("#ff4d4d"), [0, 0.28, 0], { parent: R.sock });
  R.tooth = E.box(0.07, 0.1, 0.07, E.mat("#fffbe6"), [0, -50, 0]);
  R.duck = E.group(null, [0, -50, 0]); E.box(0.22, 0.16, 0.3, E.mat("#ffe14a"), [0, 0, 0], { parent: R.duck }); E.box(0.16, 0.16, 0.16, E.mat("#ffe14a"), [0, 0.16, 0.08], { parent: R.duck }); E.box(0.1, 0.04, 0.08, E.mat("#ff8a1f"), [0, 0.2, 0.2], { parent: R.duck }); for (const s of [-1, 1]) E.box(0.03, 0.03, 0.02, E.flat("#111"), [s * 0.05, 0.27, 0.165], { parent: R.duck, noShadow: true });
  R.ctl = controller(E, null, [0, -50, 0], 0.55);
  const nt = card(256, 128, (g, w, h) => { g.fillStyle = "#fffbe6"; g.fillRect(0, 0, w, h); g.font = "800 34px sans-serif"; g.fillStyle = "#d8262e"; g.textAlign = "center"; g.fillText("ADMIN'S.", w / 2, 50); g.fillText("DO NOT TOUCH.", w / 2, 92); g.fillRect(30, 102, w - 60, 4); g.fillRect(30, 110, w - 60, 4); });
  R.note = E.plane(0.26, 0.13, E.mat("#ffffff", { map: nt, side: THREE.DoubleSide }), [0, -50, 0], { noShadow: true });
  // snore bubble on the sleeping mascot
  R.bub = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), new THREE.MeshBasicMaterial({ color: "#cfefff", transparent: true, opacity: 0.5, depthWrite: false })); R.bub.userData.noink = true; R.D.head.add(R.bub); R.bub.position.set(0.16, 0.1, 0.9);
  // tile-flip floor tiles (line from the door at right toward Toast), and the light square
  R.flip = []; for (let i = 0; i < 12; i++) { const m = E.box(0.92, 0.04, 0.92, E.mat("#fff6fb"), [5.2 - i * 0.55, 0.02, -0.6 + i * 0.16], { noShadow: true, center: true }); R.flip.push(m); }
  R.light = E.plane(3.2, 3.2, E.flat("#ffffff", { transparent: true, opacity: 0, fog: false }), [M[0] + 0.6, R.shop.H - 0.02, M[2]], { rot: [Math.PI / 2, 0, 0], noink: true, noShadow: true });
}
export function frame(f, E) {
  const X = E.X, t = f / FPS, OV = [], FX = [], { T, P, D } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const fs = f - S(n), sp = (a, b) => X.span(f, a, b), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const say = (who, base) => (amp(who) > 0.55 ? ({ happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", sad: "talk" }[base] || "talk") : base);
  let cam, light = ["interior", "night", 0.12], shk = null;
  // ---- defaults ----
  R.shop.clock(n >= 18 && fs > 10 ? "3:00" : "2:59");
  const mopStroke = Math.sin(f * 0.21);
  let tp = { pos: [M[0] + 0.35, 0, M[2] - 0.15], yaw: 0.2, armR: [-0.5 + 0.25 * mopStroke, 0.15], elbowR: 0.4, armL: [-0.6 + 0.2 * mopStroke, 0.3], elbowL: 0.9, face: "sad", head: [0.15, 0, 0] };
  let mopPos = [M[0] + 0.2 + 0.25 * mopStroke, 0, M[2] + 0.25], mopRot = [0, 0, 0.25];
  const pp = { pos: [0.8, 1.15, -1.55], yaw: 0.35, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [0, 0.2], armR: [0, 0.2], face: say("pixi", "deadpan"), head: [0, 0.6, 0] };
  let ppose = { ...pp }, pixVis = true, dVis = true, dPos = [2.2, 1.15, -1.8], board = true;
  // things on the counter
  R.sock.position.y = R.tooth.position.y = R.duck.position.y = -50; R.ctl.g.position.y = -50; R.note.position.y = -50; R.ctl.set("CHANGE SERVER", n >= 18 ? 2 : 3);
  const cx = -2.2, cy = 1.2, cz = -1.75;
  const dropIt = (obj, f0, x, rotY = 0, bounce = 0) => { if (f < f0) return; const k = sp(f0, f0 + 8); obj.position.set(cx + x, cy + 0.5 * (1 - k) + (bounce ? Math.abs(Math.sin(sp(f0 + 8, f0 + 20) * Math.PI * 2)) * 0.12 * (1 - sp(f0 + 8, f0 + 20)) : 0), cz + 0.1); obj.rotation.y = rotY; };
  if (n >= 6) { dropIt(R.sock, S(6) + 10, -0.55, 0.4); dropIt(R.tooth, S(6) + 30, -0.3, 0, 1); dropIt(R.duck, S(6) + 50, -0.05, 0.2); }
  const ctlOn = (n === 6 && f >= S(6) + 75) || n === 7;
  if (ctlOn) { const k = sp(S(6) + 75, S(6) + 100); R.ctl.g.position.set(cx - 0.2, cy + 0.2 * (1 - k) + 0.04, cz + 0.15); R.ctl.g.rotation.set(0, 0.3, 0); R.note.position.set(cx - 0.2, cy + 0.06, cz + 0.4); R.note.rotation.set(-Math.PI / 2 + 0.3, 0, 0.2); }
  if (n >= 7 && n <= 16 && R.duck.position.y < 0) dropIt(R.duck, 0, -0.05, 0.2);
  if (n >= 6 && n < 16) { dropIt(R.sock, 0, -0.55, 0.4); dropIt(R.tooth, 0, -0.3, 0); }
  // controller in Toast's hands from shot 8
  const handCtl = n >= 8 && n <= 17;
  // ---- shots ----
  switch (n) {
    case 1: cam = { pos: [0.3, 2.3, 7.2], look: [0, 1.3, -1], fov: 44 }; R.bub.scale.setScalar(0.6 + 0.4 * Math.abs(Math.sin(f * 0.08))); break;
    case 2: tp = { ...tp, face: say("toast", "sad"), head: [0.35, 0, 0.1], armL: [-1.2, 0.2], elbowL: 1.8 }; cam = { pos: [M[0] + 1.2, 1.9, M[2] + 3.2], look: [M[0] + 0.3, 1.55, M[2] - 0.2], fov: 40 }; break;
    case 3: tp = null; mopPos = [M[0] + 0.3 * Math.sin(f * 0.21), 0, M[2] + 0.1]; cam = { pos: [M[0] - 0.15, 1.15, M[2] + 0.3], look: [M[0] - 0.05, 0, M[2]], fov: 46 }; OV.push(textO(`SAME TILE: ${fs < 20 ? "4,112" : "4,113"}`, 960, 420, 70, { s: fs >= 20 ? 0.9 + 0.1 * pop(S(3) + 20, 6) : 1 })); break;
    case 4: { mopPos = [M[0] + 0.15, 0, M[2] + 0.35]; mopRot = [0, 0, 0]; tp = { pos: [M[0] + 0.35, 0, M[2] - 0.15], yaw: 1.0, armL: [-1.0, 0.2], elbowL: 0.8, armR: [-0.9, 0.2], elbowR: 0.8, face: say("toast", "sad"), head: [0, 0.2, 0] };
      ppose = { ...pp, armL: f >= S(4) + 60 ? [-2.6, 0.3] : [0, 0.2], elbowL: f >= S(4) + 60 ? 1.6 : 0 }; cam = { pos: [2.0, 1.9, 3.6], look: [-0.1, 1.5, -0.6], fov: 46 }; break; }
    case 5: { mopPos = [M[0] + 0.15, 0, M[2] + 0.35]; mopRot = [0, 0, 0]; const shrink = f > S(5) + 10 && f < S(5) + 40 ? 0.9 : 1; tp = { pos: [M[0] + 0.35, 0, M[2] - 0.15], yaw: 0.3, scale: shrink, head: f < S(5) + 30 ? [-0.8, 0, 0] : [0.1, -0.6, 0], face: say("toast", "scared") }; cam = { pos: [M[0] + 0.6, 1.8, M[2] + 3.4], look: [M[0] + 0.2, 1.7, M[2] - 0.5], fov: 44 }; if (f > E.at("admin", 0) && f < E.at("admin", 0) + 8) shk = [E.at("admin", 0), 0.04, 6]; break; }
    case 6: case 7: { mopPos = [M[0] + 0.15, 0, M[2] + 0.35]; mopRot = [0, 0, 0]; tp = { pos: [cx + 0.75, 0, -0.75], yaw: Math.PI - 0.5, armL: [-1.3, 0.1], elbowL: 0.6, armR: [-1.3, -0.1], elbowR: 0.6, face: n === 6 && f >= E.at("ooh", 0) - 2 ? "shock" : say("toast", "deadpan"), head: [0.4, 0, 0] };
      cam = n === 6 ? { pos: [cx - 1.5, 2.3, 0.6], look: [cx - 0.1, 1.25, cz], fov: 42 } : { pos: [cx - 0.2, 1.65, cz + 0.75], look: [cx - 0.2, 1.22, cz + 0.4], fov: 34 }; break; }
    case 8: { mopPos = [M[0] + 0.15, 0, M[2] + 0.35]; mopRot = [0, 0, 0]; tp = { pos: [cx + 0.6, 0, -0.6], yaw: 0.5, armR: [-1.4, 0.4], elbowR: 0.2, armL: [0, 0.2], face: say("toast", "smug"), head: [0, 0, 0] }; ppose = { ...pp, head: [0, 1.2, 0] }; cam = { pos: [-0.6, 1.9, 3.6], look: [-0.9, 1.4, -0.9], fov: 44 }; break; }
    case 9: { tp = { pos: [cx + 0.6, 0, -0.6], yaw: 0.2, armR: [-1.4, 0.2], elbowR: 0.5, armL: [-1.4, -0.2], elbowL: 0.5, face: "grin" }; break; }
    case 10: { const k = X.smooth(sp(S(10), S(10) + 50)); tp = { pos: [X.lerp(cx + 0.6, -0.2, k), 0, X.lerp(-0.6, 1.6, k)], yaw: X.lerp(0.4, 0.15, k), armR: [-1.2, 0.2], elbowR: 0.6, armL: [-1.2, -0.2], elbowL: 0.6, face: say("toast", "smug"), legL: k < 1 ? 0.5 * Math.sin(f * 0.5) : 0, legR: k < 1 ? -0.5 * Math.sin(f * 0.5) : 0, head: f > E.at("mop", 0) - 6 && f < E.at("mop", 0) + 20 ? [0, -1.0, 0] : [0, 0, 0] };
      mopPos = [M[0] + 0.15, 0, M[2] + 0.35]; mopRot = [0, 0, f > E.at("mop", 0) ? -0.09 * X.smooth(sp(E.at("mop", 0), E.at("mop", 0) + 10)) : 0]; cam = { pos: [0.6, 1.9, 6.2], look: [-0.5, 1.4, 0.2], fov: 44 }; break; }
    case 11: case 13: break;
    case 12: { tp = { pos: [-0.2, 0, 1.6], yaw: 0.15, armR: [-1.3 + 0.15 * Math.sin(f * 2.3), 0.15], elbowR: 0.6, armL: [-1.3 + 0.15 * Math.cos(f * 2.1), -0.15], elbowL: 0.6, face: "grin", head: [0.2, 0, 0.1 * Math.sin(f)] }; ppose = { ...pp, head: [0, -0.1, 0.15], face: say("pixi", "smug") }; mopPos = [M[0] + 0.15, 0, M[2] + 0.35]; mopRot = [0, 0, -0.09]; cam = { pos: [0.4, 1.9, 5.6], look: [0.2, 1.3, -0.4], fov: 46 }; break; }
    case 14: cam = { pos: [2.2, 6.0, 1.0], look: [2.2, 0, 0.8], fov: 62 }; tp = { pos: [-0.2, 0, 1.6], yaw: 0.15, face: "shock" }; break;
    case 15: case 16: case 17: case 18: { const hop = Math.abs(Math.sin(f * 0.5)); tp = { pos: [-0.2, n === 15 ? 0.15 * hop : 0, 1.6], yaw: 0.15, legL: 0.6 * Math.sin(f * 0.5), legR: -0.6 * Math.sin(f * 0.5), armR: [-1.6, 0.4], elbowR: 0.5, armL: [-0.5, 0.5], face: n === 15 ? say("toast", "grin") : "shock" };
      const grab = n >= 15 && f >= S(15) + 20; if (grab) { ppose = { pos: [0.35, 0, 1.25], yaw: -0.8, armL: [-2.4, 0.3], elbowL: 0.2, armR: [0, 0.35], face: say("pixi", "deadpan") }; }
      else if (n === 15) { const k = sp(S(15), S(15) + 20); ppose = { pos: [X.lerp(0.8, 0.35, k), X.lerp(1.15, 0, Math.min(1, k * 2)), X.lerp(-1.55, 1.25, k)], yaw: -0.6, face: "deadpan", legL: 0.4 * Math.sin(f), legR: -0.4 * Math.sin(f) }; }
      mopPos = [M[0] + 0.15, 0, M[2] + 0.35]; mopRot = [0, 0, -0.09];
      if (n === 15) cam = { pos: [0.4, 1.8, 5.4], look: [0.1, 1.2, 0.8], fov: 46 };
      if (n === 16) { cam = { pos: [3.8, 2.1, 1.4], look: [2.3, 1.6, -1.7], fov: 48 }; const k = sp(S(16) + 6, S(16) + 40); R.duck.position.set(cx - 0.05 + X.lerp(0, 4.3, k), cy + 1.6 * Math.sin(k * Math.PI * 0.8), cz + 0.2 * k); }
      if (n === 17) { const k = X.easeIn(sp(S(17) + 8, S(17) + 40)); const up = k * 7; tp = { ...tp, pos: [-0.2, up, 1.6] }; ppose = { ...ppose, pos: [0.35, up, 1.25] }; dPos = [0.8, up, 1.4]; R.light.material.opacity = Math.min(1, sp(S(17), S(17) + 10)) * (1 - sp(S(17) + 60, Eo(17))) * 0.95; cam = { pos: [0.3, 2.6, 9.5], look: [0, 2.6, 0], fov: 50 }; }
      if (n === 18) { pixVis = false; dVis = false; tp = null; board = false; R.light.material.opacity = 0; cam = { pos: [0.3, 2.6, 9.5], look: [0, 2.6, 0], fov: 50 }; mopRot = [0, 0, -0.09 + 0.06 * Math.sin(sp(S(18), S(18) + 20) * Math.PI * 3) * (1 - sp(S(18), S(18) + 20))]; }
      break; }
  }
  // tile flip (14-15): tiles turn over one by one toward Toast with a %
  R.flip.forEach((m, i) => { const a = S(14) + i * (5 - i * 0.25); const k = n >= 14 && n <= 17 ? X.smooth(sp(a, a + 6)) : 0; m.rotation.set(0, 0, k * Math.PI); m.material.color.set(k > 0.5 ? "#ffffff" : "#fff6fb"); m.visible = n >= 14 && n <= 17; });
  if (n === 14) R.flip.forEach((m, i) => { const a = S(14) + i * (5 - i * 0.25); if (f >= a + 3 && i % 3 === 2) OV.push((g, w, h) => { const v = m.position.clone().project(E.camera); textO(`${Math.min(97, Math.round((i + 1) / 12 * 97))}%`, ((v.x + 1) / 2) * 1920, ((1 - v.y) / 2) * 1080, 56, { col: "#19a0e0", stroke: "#ffffff" })(g, w, h); }); });
  // ---- pose everything ----
  if (tp) { T.pose(tp); if (n === 17) { const k = X.easeIn(sp(S(17) + 8, S(17) + 40)); T.root.scale.set(1 - 0.4 * k, 1 + 1.0 * k, 1 - 0.4 * k); } } else T.pose({ visible: false });
  if (pixVis) P.pose(ppose); else P.pose({ visible: false });
  if (board && pixVis) { if (n >= 15 && f >= S(15) + 20) P.boardAt([ppose.pos[0] + 0.45, ppose.pos[1] + 0.95, ppose.pos[2]], -0.8, Math.PI / 2, 0, true); else P.boardAt([1.4, 1.17, -1.6], 0.2, 0, 0, true); } else P.boardAt([0, -50, 0], 0, 0, 0, false);
  if (dVis) { const asleep = n < 16; D.pose({ pos: dPos, scale: n === 17 ? 0.9 : 1.0, yaw: asleep ? -0.4 : n === 16 ? -1.2 : 0.2, roll: asleep ? 1.3 : 0, squash: asleep ? 0.03 * Math.sin(f * 0.1) : 0, jaw: n === 16 && fs > 18 && fs < 30 ? 1 : 0.1, blink: asleep, legL: asleep ? -0.4 : 0, legR: asleep ? 0.4 : 0 }); if (asleep) { D.root.position.y += 0.75; D.root.position.x += 0.5; } if (n === 16 && fs > 22) { const k = sp(S(16) + 22, S(16) + 32); D.root.position.set(X.lerp(2.2, cx + 3.6, k), 1.15 + 1.4 * Math.sin(k * Math.PI), -1.6); } }
  else D.pose({ visible: false });
  R.bub.visible = n < 16 && dVis; if (R.bub.visible) R.bub.scale.setScalar(0.5 + 0.5 * Math.abs(Math.sin(f * 0.07)));
  R.mop.position.set(...mopPos); R.mop.rotation.set(...mopRot);
  if (handCtl && tp) { T.root.updateMatrixWorld(true); const v = new THREE.Vector3(); T.elbows[1].getWorldPosition(v); const v2 = new THREE.Vector3(); T.elbows[0].getWorldPosition(v2); const mid = v.clone().add(v2).multiplyScalar(0.5);
    const hy = n === 8 ? v : mid; R.ctl.g.position.set(hy.x, hy.y - 0.38 + (n === 17 ? 0 : 0), hy.z + 0.2); R.ctl.g.rotation.set(0.9, tp.yaw || 0, 0); if (n === 8) { R.note.position.set(hy.x, hy.y - 0.6, hy.z + 0.25); R.note.rotation.set(0, tp.yaw, 0.2); } }
  // ---- inserts on the controller (9, 11, 13) ----
  if (n === 9 || n === 11 || n === 13) { R.ctl.g.position.set(0, 1.0, 3.0); R.ctl.g.rotation.set(0.75, 0, 0); T.pose({ visible: false }); cam = { pos: [0, 1.62, 3.42], look: [0, 1.0, 3.0], fov: 38 }; R.ctl.start.material.color.set(n === 13 && fs > 6 ? "#ff7fb8" : "#ffffff");
    if (n === 11) { OV.push(textO("NOPE", 760, 360, 70, { col: "#cccccc", a: f > S(11) + 10 ? 1 : 0 })); if (f > S(11) + 40) OV.push(textO("ALSO NOPE", 1180, 360, 70, { col: "#cccccc" })); }
    if (n === 13) { R.ctl.start.scale.y = fs > 6 ? 0.4 : 1; } else R.ctl.start.scale.y = 1; }
  else R.ctl.start.material.color.set("#ff3d7f");
  if (!cam) cam = { pos: [-0.4, 1.9, 4.6], look: [-1.0, 1.3, -0.8], fov: 44 };
  // ---- HUD + subtitles ----
  if (n !== 19) OV.push(hudHome(n >= 18 && fs > 30 ? "8 (UNATTENDED)" : 8, 1));
  if (n >= 9 && n !== 19) OV.push(battery(n >= 18 && fs > 30 ? 2 : 3));
  if (n === 19) OV.push(loading2((f - S(19)) / FPS, "Do not feed the mascot after 3 AM.", 2));
  const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); if (cur && n !== 19) OV.push(subtitle(cur.text));
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
