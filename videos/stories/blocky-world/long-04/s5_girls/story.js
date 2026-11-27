// Long 4 · Scene 5 — "What's the girls' version?" (11 shots). Same avenue; Pixi does it in one run.
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { textO, subtitle, INK, F } from "./common/ui.js";
import { chip, P2, wpos, review, tag, gameHud, mission, notice, card } from "./common/l4.js";
import { game, traffic, silPose, X0, TPOSE, questionKid, bicepHeart } from "./common/game.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {};
export async function build(E) {
  await loadTL(meta, R);
  Object.assign(R, game(E)); R.setPatched(true);
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.K = solid(questionKid(E));
  R.portal = E.plane(3.2, 3.2, E.flat("#ffffff", { transparent: true, opacity: 0, fog: false }), [0, -50, 0], { noink: true, noShadow: true });
  const ck = card(64, 64, (g) => { for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) { g.fillStyle = (x + y) % 2 ? "#ff2fc8" : "#111"; g.fillRect(x * 32, y * 32, 32, 32); } }); ck.magFilter = THREE.NearestFilter; ck.wrapS = ck.wrapT = THREE.RepeatWrapping; ck.repeat.set(3, 3);
  R.tile = E.plane(1.6, 1.6, E.flat("#ffffff", { map: ck }), [0, -50, 0], { rot: [-Math.PI / 2, 0, 0], noink: true, noShadow: true });
  R.hole = E.plane(1.6, 1.6, E.flat("#05040a"), [0, -50, 0], { rot: [-Math.PI / 2, 0, 0], noink: true, noShadow: true });
  R.coin = E.cyl(0.1, 0.1, 0.03, E.mat("#ffd23a"), [0, -50, 0], { seg: 14 });
}
const MC = [[486, 0, -2.6], [488, 0, 2.6]];
// Pixi's run: keyframes [frame fraction, x, z]
const RUN = [[0, 397.5, -6.2], [0.12, 393.4, -8.6], [0.25, 408, -5.0], [0.4, 418, -1.5], [0.55, 430, -4.6], [0.7, 443, -7.0], [0.82, 447, -9.6], [1, 452, -6.4]];
const runAt = (k) => { let i = 0; while (i < RUN.length - 2 && k > RUN[i + 1][0]) i++; const a = RUN[i], b = RUN[i + 1]; const q = Math.max(0, Math.min(1, (k - a[0]) / (b[0] - a[0]))); const s = q * q * (3 - 2 * q); return [a[1] + (b[1] - a[1]) * s, a[2] + (b[2] - a[2]) * s, Math.atan2(b[1] - a[1], b[2] - a[2])]; };
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop, say } = C, OV = [], { T, P, D, K } = R;
  let cam, light = "golden", dof = { focus: 6, amount: 0 }, shk = null;
  traffic(R, f, true, X0, [1.2, 3.5, 6.0, 1.2, 3.5, 6.0]); R.bikes.forEach((b, i) => { b.position.set(X0 + 42 + i * 0.7, 0, -7.4); b.rotation.set(0, 0, -1.4); });
  R.heli.position.set(X0 + 70, 18, -30); R.tank.position.set(446, 0, -3.0); R.tank.rotation.y = -Math.PI / 2; R.spot.visible = R.beam.visible = false;
  R.holes.forEach((h) => (h.g.visible = true)); R.vaultDonuts.visible = false;
  let turn = 0, heart = 0;
  // ---- defaults ----
  const PEND = [452, 0.23, -6.4];
  let pp = { pos: PEND, yaw: -0.4, face: say("pixi", "deadpan") }, board = true, pTag = "PLAYER 2", arrowY = null, tp = null, kp = { pos: [449.6, 0, -4.2], yaw: -2.2, face: say("kid", "happy") }, kOn = n >= 2, mark = n >= 9 ? "!" : "?";
  let dp = { pos: [455, 0, -9.2], yaw: -1.6 }, dTag = n >= 10 ? "VEHICLE" : null, standDonut = n < 4, coin = n >= 4, reviews = [], missions = 0, toastTag = "PROP (UNUSED)";
  const TPOS = [449.2, 0, -5.2];
  switch (n) {
    case 1: { const k = X.easeIn(sp(S(1) + 6, S(1) + 20)); pp = { pos: [397.5, 0.23 + 7 * (1 - k), -6.2], yaw: 0.3, face: say("pixi", "deadpan"), armL: [0, 0.4], armR: [0, -0.4] }; R.portal.position.set(397.5, 7.5, -6.2); R.portal.rotation.set(0, 0.3, 0); R.portal.material.opacity = Math.max(0, 0.95 - fs / 30);
      cam = { pos: [400.4, 2.2, -0.8], look: [397.5, 1.9, -6.2], fov: 48 }; kOn = false; dp.pos = [470, 0, -9.2]; break; }
    case 2: { const k = X.smooth(sp(S(2), S(2) + 30)); pp = { pos: [397.5, 0.23, -6.2], yaw: 0.6, face: "deadpan" }; kp = { pos: [X.lerp(404, 399.2, k), 0, X.lerp(-3, -5.0, k)], yaw: -1.9, face: say("kid", "happy") }; cam = { pos: [400.4, 2.0, -0.4], look: [398.3, 1.5, -5.8], fov: 46 }; dp.pos = [470, 0, -9.2]; break; }
    case 3: { const look = fs < 30 ? 1.2 : 0; pp = { pos: [397.5, 0.23, -6.2], yaw: 0.6, head: [0, look, 0], face: say("pixi", "deadpan") }; kp = { pos: [399.2, 0, -5.0], yaw: -1.9, face: say("kid", "happy") }; cam = { pos: [400.4, 2.0, -0.4], look: [398.3, 1.5, -5.8], fov: 46 }; dp.pos = [470, 0, -9.2];
      if (fs > 0 && C.amp("pixi") > 0 && f > C.at("watch", 0, 1e9)) pp.face = "smug"; break; }
    case 4: { const k = sp(S(4), Eo(4)); const [x, z, yaw] = runAt(k); const ollie = x > 441 && x < 449.5 ? Math.sin((x - 441) / 8.5 * Math.PI) * 1.3 : 0; pp = { pos: [x, 0.23 + ollie, z], yaw, face: "deadpan", legL: -0.2, legR: 0.3, armL: [0, 0.6], armR: [0, -0.6], kneeL: 0.3, kneeR: 0.3 };
      R.boardPitch = ollie > 0 ? -0.3 * Math.cos((x - 441) / 8.5 * Math.PI) : 0; kOn = false; dp.pos = [470, 0, -9.2]; standDonut = k < 0.12; coin = k >= 0.12;
      cam = { pos: [x - 4.5, 2.6, z + 6.5], look: [x + 2, 1.4, z - 0.5], fov: 50 }; missions = k > 0.86 ? 3 : k > 0.55 ? 2 : k > 0.2 ? 1 : 0;
      [0.15, 0.3, 0.45, 0.6, 0.75, 0.9].forEach((q, i) => reviews.push(["10/10", [x + 1 + i % 3, 3 + (i % 2), z - 2], S(4) + Math.round(q * (Eo(4) - S(4)))]));
      if (missions) { const a = S(4) + Math.round([0, 0.2, 0.55, 0.86][missions] * (Eo(4) - S(4))); if (f - a < 40) OV.push(mission(`MISSION ${missions} PASSED`, null, Math.min(1, (40 - (f - a)) / 8), pop(a, 6), 300)); } break; }
    case 5: { const k = X.smooth(sp(S(5), S(5) + 50)); arrowY = 7 - 3.6 * k; cam = { pos: [455.5, 2.2, -1.2], look: [452, 2.4, -6.4], fov: 48 }; kp.pos = [449.6, 0, -3.6]; break; }
    case 6: { const split = S(6) + Math.round((Eo(6) - S(6)) * 0.6); arrowY = 3.4; if (f < split) { turn = X.smooth(sp(S(6), S(6) + 20)); heart = X.smooth(sp(S(6) + 24, S(6) + 40)); cam = { pos: [456, 2.4, -0.2], look: [487, 2.2, 0], fov: 11 }; }
      else { turn = 1; heart = 1; R.pixiHeart = f < split + 30 ? X.smooth(sp(split, split + 6)) : 0; cam = { pos: [455.5, 2.2, -1.2], look: [452, 2.4, -6.4], fov: 46 }; } break; }
    case 7: { const k = X.smooth(sp(S(7), S(7) + 26)); arrowY = 3.4; tp = { pos: [X.lerp(444, TPOS[0], k), 0, TPOS[2]], yaw: 0.2, ...TPOSE, face: say("toast", "angry") }; cam = { pos: [450.6, 2.4, 2.6], look: [450.4, 1.9, -5.4], fov: 48 }; break; }
    case 8: { arrowY = 3.4; const force = sp(S(8) + 12, S(8) + 30); tp = { pos: TPOS, yaw: 0.2, ...TPOSE, face: force > 0.95 ? "shock" : "angry", eyePop: force > 0.95 ? X.spring(sp(S(8) + 30, S(8) + 42)) : 0, headScale: force > 0.95 ? 1.1 : 1 }; R.forceK = force;
      const crash = S(8) + 30; cam = f < crash ? { pos: [450.6, 2.4, 2.6], look: [450.4, 1.9, -5.4], fov: 48 } : { pos: [449.6, 2.3, -1.6], look: [449.25, 2.1, -5.2], fov: 44 }; if (f >= crash && f < crash + 6) { const q = (f - crash) / 6; cam = { pos: [X.lerp(450.6, 449.6, q), X.lerp(2.4, 2.3, q), X.lerp(2.6, -1.6, q)], look: [449.25, 2.0, -5.2], fov: 46 }; } break; }
    case 9: { arrowY = 3.4; tp = { pos: TPOS, yaw: 0.2, ...TPOSE, face: "sad" }; kp = { pos: [449.6, 0, -3.6], yaw: -0.4, face: say("kid", "grin") }; pp = { ...pp, yaw: 0.1, face: say("pixi", "deadpan") }; cam = { pos: [450.2, 2.0, 3.4], look: [450.6, 1.4, -5.0], fov: 46 }; break; }
    case 10: { arrowY = 3.4; const drop = S(10) + 50, k = X.easeIn(sp(drop, drop + 18)); tp = { pos: [TPOS[0], -7 * k, TPOS[2]], yaw: 0.2, ...TPOSE, face: f > drop ? "shock" : "sad" }; R.tileK = f < drop ? ((fs >> 2) % 2) : 2; R.pigeonAir = true;
      cam = { pos: [451.6, 3.0, 1.4], look: [449.4, 1.2, -5.2], fov: 48 }; OV.push(notice("UNUSED PROP FOUND. REMOVING.", 960, 200, Math.min(1, fs / 6), pop(S(10), 6))); break; }
    case 11: { arrowY = 3.4; R.tileK = 2; dp = { pos: [449.2, 0, -6.9], yaw: 0.1, head: [0.7, 0, 0], pitch: 0.25 }; R.pigeonAir = true; cam = { pos: [451.4, 3.0, 0.6], look: [450, 1.0, -5.6], fov: 48 }; break; }
  }
  if (n !== 1) R.portal.material.opacity = 0;
  // ---- pose ----
  silPose(R, f, { pos: MC, turn, heart });
  if (tp) T.pose(tp); else T.pose({ visible: false });
  if (n === 8 && R.forceK) { // forearm forced into the bicep: it goes in one side of his head and out of the other
    const k = R.forceK; T.arms[1].rotation.set(0, 0, 1.57 - 0.2 * k); T.elbows[1].rotation.set(0, 0, 2.2 * k); }
  P.pose(pp); if (R.pixiHeart) bicepHeart(P, R.pixiHeart); R.pixiHeart = 0;
  if (board) { const p = P.root.position; P.boardAt([p.x, p.y - 0.23 + 0.0, p.z], pp.yaw, 0, R.boardPitch || 0, true); } R.boardPitch = 0;
  if (kOn) { K.pose({ ...kp, scale: 0.5 }); } else K.pose({ visible: false });
  D.pose(dp);
  R.standDonut.visible = standDonut; R.coin.position.set(X0 - 7.8, coin ? 1.27 : -50, -9.3); R.coin.rotation.set(Math.PI / 2 * (coin ? Math.abs(Math.cos(f * 0.3)) : 0), 0, 0);
  R.tile.position.set(TPOS[0], R.tileK === 2 ? -50 : 0.03, TPOS[2]); R.tile.visible = R.tileK === 1; R.hole.position.set(TPOS[0], R.tileK === 2 ? 0.03 : -50, TPOS[2]); R.tileK = 0;
  if (R.pigeonAir) R.pigeon.position.set(TPOS[0] + 1.3, 1.85, TPOS[2]); else R.pigeon.position.set(-50, -50, 0); R.pigeonAir = false;
  unclip([P, K], { gap: 0.25 });
  // ---- overlays ----
  OV.push(gameHud({ frames: 30, alarm: 0, cash: n >= 4 ? 30 : 0 }));
  OV.push(chip("13 YEARS"));
  OV.push((g, w, h) => { const v = P2(E, wpos(P.head, [0, 1.35, 0])); if (v[2] < 1) { tag(pTag, v[0], v[1], { bg: "rgba(155,77,255,0.92)" })(g, w, h); if (n <= 3) tag("PATCH 100%", v[0], v[1] - 56, { bg: "rgba(40,170,70,0.92)", size: 26 })(g, w, h); } });
  if (arrowY != null) OV.push((g, w, h) => { const v = P2(E, wpos(P.root, [0, arrowY, 0])); textO("▼ MAIN CHARACTER", v[0], v[1], 46, { col: "#ffe14a", s: 1 + 0.04 * Math.sin(f * 0.2) })(g, w, h); });
  if (n === 6 && turn > 0) OV.push((g, w, h) => { R.sil.forEach((p, i) => { const v = P2(E, wpos(p.root, [0, 3.0, 0])); if (v[2] < 1 && cam.fov < 30) { textO("▼ MAIN CHARACTER", v[0], v[1], 34, { col: "#ffe14a" })(g, w, h); if (heart > 0.9) textO("♥", v[0], v[1] + 120, 60, { col: "#ff7fb8", s: pop(S(6) + 40 + i * 4, 6) })(g, w, h); } }); });
  if (kOn) OV.push((g, w, h) => { const v = P2(E, wpos(K.head, [0, 1.4, 0])); if (v[2] < 1) textO(mark, v[0], v[1], 110, { col: "#ffe14a", s: mark === "!" ? pop(S(9), 6) : 1 + 0.05 * Math.sin(f * 0.2) })(g, w, h); });
  if (tp && n !== 8) OV.push((g, w, h) => { const v = P2(E, wpos(T.head, [0, 1.3, 0])); if (v[2] < 1 && T.root.position.y > -1) tag(toastTag, v[0], v[1], { bg: "rgba(110,110,120,0.92)" })(g, w, h); });
  if (dTag) OV.push((g, w, h) => { const v = P2(E, wpos(D.root, [0, 3.4, 0])); if (v[2] < 1) tag(dTag, v[0], v[1], { bg: "rgba(255,127,184,0.92)" })(g, w, h); });
  reviews.forEach(([txt, p, a]) => OV.push((g, w, h) => { const v = P2(E, p); review(txt, v[0], v[1], f - a)(g, w, h); }));
  if (n === 4 || n === 5) OV.push(textO(`MISSIONS: ${missions === 0 && n === 5 ? 3 : missions}/3`, 960, 70, 56, { col: "#7dff7a" }));
  const cur = C.seg(); if (cur) OV.push(subtitle(cur.text));
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
