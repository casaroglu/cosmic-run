// Long 3 · Cold open (5 shots). Shot 1 frame 0 == the film's last frame (LOOP_POSE).
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { block } from "./common/block.js";
import { zubbit, toastExtras, dinoExtras } from "./common/l3.js";
import { loopProps, loopPose, LOOP_CAM, LOOP_LIGHT } from "./common/loop.js";
import { load, ctx, subs, textO, arrow, tagStamp, INK, F } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {}, IMG = {};
const im = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; });
const shotMid = async (s, n, k) => { try { const tl = await (await fetch(`../ext/${s}/work/timeline.json?v=` + Date.now())).json(); const sh = tl.shots[n - 1]; return Math.round((sh.s + (sh.e - sh.s) * k) * 30); } catch (e) { return 0; } };
export async function build(E) {
  D = await load(meta);
  R.B = block(E); R.T = makeToast(E); R.TX = toastExtras(E, R.T); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D); R.L = loopProps(E);
  R.tiny = zubbit(E, "grey");
  // flashes: the line round the block (s2 shot 7), the coat opening (s3 shot 2), the ticker (s1 shot 10)
  const src = [["s2", 7, 0.7], ["s3", 2, 0.85], ["s1", 10, 0.5]];
  for (let i = 0; i < 3; i++) { const [s, n, k] = src[i]; const fr = await shotMid(s, n, k); IMG[i] = await im(`../ext/${s}/frames/f${String(fr).padStart(5, "0")}.jpg`); }
}
const zub2d = (x, y, s, rot) => (g, w, h) => { const k = h / 1080; g.save(); g.translate(x * k, y * k); g.rotate(rot); g.scale(s * k, s * k); g.lineJoin = "round";
  g.strokeStyle = "#d8dde6"; g.lineWidth = 9; g.beginPath(); g.arc(0, 18, 16, Math.PI * 1.1, Math.PI * 2.9); g.stroke();
  g.fillStyle = "#9a9aa6"; g.strokeStyle = INK; g.lineWidth = 6; for (const x0 of [-30, -6, 18]) { g.beginPath(); g.rect(x0, 34, 14, 20); g.fill(); g.stroke(); }
  g.beginPath(); g.roundRect(-55, 50, 110, 92, 22); g.fill(); g.stroke(); g.fillStyle = INK; g.fillRect(-36, 80, 16, 16); g.fillRect(20, 80, 16, 16); g.fillRect(-26, 110, 52, 5); g.fillStyle = "#fff"; g.fillRect(-10, 115, 20, 20); g.strokeRect(-10, 115, 20, 20); g.restore(); };
export function frame(f0, E) {
  const C = ctx(f0, E, D), { X, n, fs, S, Eo, sp, pop, say, t } = C, f = f0, OV = [];
  const { T, TX, DX, L } = R, Dn = R.D;
  let cam = { ...LOOP_CAM }, light = LOOP_LIGHT, shk = null, flash = 0;
  R.B.board(2); R.B.ticker("$2", false); R.B.clock("3:15", "AM"); R.B.disp("NOW SERVING", "67", "#7dff7a");
  R.tiny.position.y = -50; L.stitch.forEach((s) => (s.position.y = -50));
  const fallen = () => { L.car.visible = false; TX.pack.visible = true; TX.straps.forEach((s) => s.scale.set(1, 1, 1)); TX.goldHands(true); DX.hand.visible = true;
    T.pose({ pos: [1.6, 0.12, 2.6], pitch: -PI2, yaw: 0, face: "dizzy", armL: [0, 1.4], armR: [0, 1.4], legLz: 0.4, legRz: 0.4, stretch: [1.25, 0.6] }); T.root.scale.set(1.25, 1.0, 0.3);
    Dn.pose({ pos: [1.6, 0, 1.6], yaw: 0.2, squash: 0.08, jaw: 0.6, look: [0, 0.5], tailY: 0.2 }); Dn.root.updateMatrixWorld(true); const v = new THREE.Vector3(); DX.ringPt.getWorldPosition(v); L.gold.position.copy(v); L.gold.scale.setScalar(1.4); L.gold.visible = true;
    R.tiny.position.set(3.0, 0.32, 2.6); R.tiny.rotation.set(0, -0.4, 1.3); R.tiny.scale.setScalar(1.0); };
  switch (n) {
    case 1: { loopPose(E, R, L, T, TX, Dn, DX); const st = new THREE.Vector3(); TX.straps[1].getWorldPosition(st);
      L.stitch.forEach((s, i) => { const a = 15 + i * 20; if (fs >= a) { const k = sp(S(1) + a, S(1) + a + 14); s.position.set(st.x + 0.2 * k + i * 0.05, st.y + 0.25 + 0.6 * k - 1.2 * k * k, st.z + 0.5 * k); s.rotation.set(k * 8, k * 5, 0); } });
      break; }
    case 2: case 3: { fallen(); cam = { pos: [1.9, 7.4, 3.4], look: [1.8, 0, 1.9], fov: 52 };
      if (n === 2) { if (fs < 8) { loopPose(E, R, L, T, TX, Dn, DX); cam = { ...LOOP_CAM }; const k = X.easeIn(fs / 8); Dn.root.position.y -= k * 0.3; } else { shk = [S(2) + 8, 0.25, 12]; if (fs < 11) flash = 0.4; const s = fs < 14 ? X.lerp(2.6, 1, X.easeIn((fs - 8) / 6)) : 1; OV.push(textO("WORLD'S BIGGEST", 960, 400, 150, { col: "#ffffff", s }), textO("BAG CHARM", 960, 580, 190, { col: "#ffe14a", s })); } }
      else { const v = new THREE.Vector3(3.0, 0.35, 2.6).project(E.camera); const px = ((v.x + 1) / 2) * 1920, py = ((1 - v.y) / 2) * 1080;
        OV.push(arrow(px - 420, py - 300, px - 40, py - 40, sp(S(3), S(3) + 8)), textO("IT STARTED WITH THIS", Math.min(1500, px - 300), py - 360, 80, { col: "#ffe14a", s: pop(S(3) + 4, 6) })); light = ["interior", "night", 0.12]; }
      break; }
    case 4: { const i = Math.min(2, Math.floor(fs / 27)); const tags = ["ALL NIGHT", "\"REAL\"", "$9,999"]; OV.push((g, w, h) => { const img = IMG[i]; if (img) g.drawImage(img, 0, 0, w, h); else { g.fillStyle = "#222"; g.fillRect(0, 0, w, h); } });
      OV.push(tagStamp(tags[i], 1420, 860, X.back(sp(S(4) + i * 27 + 2, S(4) + i * 27 + 8)))); break; }
    case 5: { cam = { pos: [0.5, 5.0, 3.0], look: [0.5, 0, 2.99], fov: 50 }; T.pose({ visible: false }); Dn.pose({ visible: false }); L.car.visible = false; L.gold.visible = false;
      OV.push((g, w, h) => { g.save(); g.fillStyle = "rgba(255,214,232,0.35)"; g.fillRect(0, 0, w, h); g.restore(); });
      const words = [["I QUEUED ALL NIGHT", 330, "#ffffff"], ["FOR A MYSTERY BOX", 500, "#ff3d7f"]]; words.forEach(([wd, y, c], i) => { const a = S(5) + i * 9; if (f >= a) OV.push(textO(wd, 960, y, 140, { col: c, s: pop(a, 6) })); });
      if (fs > 30) OV.push(textO("(limit: 1 per person)", 960, 650, 60, { col: "#221a26", stroke: "#ffffff", s: pop(S(5) + 30, 6) }));
      if (fs > 50) { const k = X.easeIn(sp(S(5) + 50, S(5) + 60)), sw = fs > 60 ? 0.35 * Math.sin((fs - 60) * 0.25) * Math.exp(-(fs - 60) / 40) : 0; OV.push(zub2d(1500, X.lerp(-200, 500, k), 1.5, sw)); }
      break; }
  }
  const sb = subs(D.SEG, t); if (sb && n === 3) OV.push(sb);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, flash, dof: { focus: 6, amount: 0 }, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
const PI2 = Math.PI / 2;
