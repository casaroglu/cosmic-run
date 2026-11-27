// Long 4 · Scene 4 — Day one: the walls (17 shots). Turbo City avenue + the see-through row.
import * as THREE from "three";
import { makeToast, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { controller } from "./common/props.js";
import { textO, subtitle, banner, INK, F } from "./common/ui.js";
import { chip, plusOne, P2, wpos, review, tag, prompt, patchCard, gameHud, counter, bars, radio, mission } from "./common/l4.js";
import { game, traffic, silPose, X0, TPOSE } from "./common/game.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {};
export async function build(E) {
  await loadTL(meta, R);
  Object.assign(R, game(E)); R.setPatched(true);
  R.T = solid(makeToast(E)); R.D = makeDonutsaurus(E); R.ctl = controller(E, null, [0, -50, 0], 0.5);
  R.legs = makeToast(E); R.legs.chest.visible = false; // the leg half when he is stuck through a building
}
const Z = -11.0, PZ = 0.25; // row z, pavement height
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop, say } = C, OV = [], { T, D } = R;
  let cam, light = "golden", dof = { focus: 6, amount: 0 }, shk = null, grade = null;
  let tw = f; // world time (frozen in the slideshow)
  // ---- state ----
  let tp = { pos: [404, 0, -6.5], yaw: Math.PI / 2, face: "happy" }, dp = { pos: [402, 0, -5.5], yaw: Math.PI / 2 }, round = n >= 12 && !(n === 12 && fs < 60) ? 1 : 0;
  let tagTxt = "PLAYER 1", tagOn = true, walls = n >= 8 ? 3 : n >= 7 ? 2 : n >= 6 ? 1 : 0, alarm = n >= 12 ? 3 : n >= 8 ? 1 : 0, alabel = n >= 12 ? "VAULT EATEN" : n >= 8 ? "TRESPASSING (HALF)" : null, frames = 30;
  let wear = { hood: n >= 6, seat: n >= 7, lamp: n >= 7 }, legsOn = false, ctlOn = false, driving = false, radioOn = n >= 10 && n <= 12, sticker = false, onlyHead = false, cut = 0, barsK = 0, barsO = {};
  let unit = "13 DAYS", prev = null, jump = 1; const PR = S(15) + 30; if (n === 15 && f >= PR) { prev = "13 DAYS"; unit = "13 YEARS"; jump = (f - PR) / 18; } if (n > 15) unit = "13 YEARS";
  const holes = new Set(); if (n >= 11) R.holes.forEach((h, i) => { const hx = h.x; const dx = n === 11 ? X.lerp(402, 424, sp(S(11), Eo(11))) : n === 12 ? X.lerp(424, 436, sp(S(12), S(12) + 70)) : 999; if (dx > hx + 0.6) holes.add(i); });
  R.holes.forEach((h, i) => (h.g.visible = holes.has(i)));
  R.vaultDonuts.visible = !(n > 12 || (n === 12 && fs > 40)); R.wearHood.position.y = R.wearSeat.position.y = R.wearLamp.position.y = -50;
  const walk = (a) => ({ legL: 0.5 * Math.sin(a), legR: -0.5 * Math.sin(a), armL: [-0.4 * Math.sin(a), 0.1], armR: [0.4 * Math.sin(a), -0.1] });
  const silOpt = { glassesOff: n >= 2 ? Math.min(1, sp(S(2), S(2) + 900)) : 0 };
  switch (n) {
    case 1: { const k = sp(S(1), Eo(1)); tp = { pos: [X.lerp(403, 407, k), 0, -6.5], yaw: Math.PI / 2 - 0.3, face: "happy", ...walk(f * 0.4) }; dp = { pos: [X.lerp(401, 405, k), 0, -5.2], yaw: Math.PI / 2, legL: Math.sin(f * 0.4) * 0.5, legR: -Math.sin(f * 0.4) * 0.5 };
      cam = { pos: [399, 2.8, 2.5], look: [415, 1.6, -8], fov: 52 }; OV.push((g, w, h) => { const v = P2(E, [447, 4.2, -11]); textO("MISSION 1: BUY A DONUT", v[0], v[1], 38, { col: "#ffe14a" })(g, w, h); }); break; }
    case 2: { barsK = X.smooth(sp(S(2), S(2) + 12)); barsO = { label: true }; tp = { pos: [407, 0, -6.5], yaw: 0.6, face: "angry", armL: [0, 0.4], armR: [0, -0.4] }; dp = { pos: [410.5, 0, -8.4], yaw: -0.8 };
      cam = { pos: [403.0, 2.2, -1.2], look: [430, 2.4, -6.0], fov: 46 }; break; }
    case 3: { const lift = X.smooth(sp(S(3) + 10, S(3) + 30)), out = sp(S(3) + 30, S(3) + 60), shrink = X.smooth(sp(S(3) + 60, S(3) + 80)); barsK = 1; barsO = { label: shrink < 0.1, lift: lift * (1 - shrink), lx: 760 };
      tp = { pos: [407 + 0.8 * out, 0, -6.5 + 1.0 * out], yaw: 0.3, face: say("toast", "smug"), armL: lift > 0 && out < 1 ? [-3.0, 0.2] : [0, 0.3], armR: lift > 0 && out < 1 ? [-3.0, -0.2] : [0, -0.3], lean: out > 0 && out < 1 ? 0.5 : 0 }; dp = { pos: [410.5, 0, -8.4], yaw: -0.8 };
      cam = { pos: [407.3, 2.0, -0.6], look: [407.5, 1.7, -6.5], fov: 50 }; if (shrink > 0) barsO = { box: [1200, 300, 1880, 640] }; break; }
    case 4: { const k = sp(S(4), S(4) + 40); tp = { pos: [410.0 + 0.6 * k, PZ, -10.4], yaw: Math.PI / 2, face: "smug", armR: [-0.5, -1.2], lean: 0.1 }; dp = { pos: [408, PZ, -8.6], yaw: 1.2 }; cam = { pos: [409, 1.9, -5.2], look: [411, 1.5, -10.6], fov: 46 }; break; }
    case 5: { const k = sp(S(5), Eo(5)); R.row[0].front.visible = false; tp = { pos: [X.lerp(410.6, 412.4, k), PZ, -10.4], yaw: Math.PI / 2, face: "happy", ...walk(f * 0.3) }; R.cust.pose({ pos: [1.2, 0.05, -1.0], legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, face: "deadpan", head: [0, -0.6 * sp(S(5) + 20, S(5) + 30), 0] });
      cam = { pos: [413, 2.2, -4.2], look: [413, 1.6, -11], fov: 50 }; break; }
    case 6: { const k = sp(S(6), S(6) + 40); tp = { pos: [X.lerp(416.2, 418.4, k), PZ, -10.4], yaw: Math.PI / 2 - 1.2 * sp(S(6) + 30, S(6) + 44), face: say("toast", "smug"), ...(k < 1 ? walk(f * 0.3) : {}) }; cam = { pos: [419.5, 2.0, -5.4], look: [418, 1.8, -10.6], fov: 46 }; break; }
    case 7: { const k = sp(S(7), Eo(7)); tp = { pos: [X.lerp(424.6, 426.2, k), PZ, -10.4], yaw: Math.PI / 2 - 1.0, face: "happy", armL: [-1.4, 0.4] }; cam = { pos: [427.5, 2.0, -5.6], look: [426, 1.8, -10.6], fov: 46 }; break; }
    case 8: { onlyHead = true; tp = { pos: [438.5, PZ + 0.17, -10.05], yaw: 0, face: "grin" }; cam = { pos: [438.5, 2.2, -4.6], look: [438.5, 1.9, -10.4], fov: 46 }; break; }
    case 9: { // stuck through PARKING (x 403..409): head out of the right wall, legs out of the left; Donutsaurus pulls the legs
      tp = { pos: [406.1, PZ + 1.0, -9.3], yaw: Math.PI / 2, pitch: Math.PI / 2, face: say("toast", "scared") }; legsOn = true; const tug = 0.15 * Math.abs(Math.sin(f * 0.35)); R.legsPose = { pos: [400.1 - tug, PZ + 1.0, -9.3], yaw: Math.PI / 2, pitch: Math.PI / 2, legL: 0.3 * Math.sin(f * 0.7), legR: -0.3 * Math.sin(f * 0.7) };
      dp = { pos: [398.0 - tug, PZ, -8.6], yaw: Math.PI / 2 - 0.5, jaw: 1, head: [0.4, 0, 0] }; cam = { pos: [403.2, 2.3, -1.6], look: [403.2, 1.4, -10], fov: 60 };
      if (fs > 40) OV.push((g, w, h) => { const v = P2(E, wpos(D.root, [0, 3.4, 0])); prompt("ENTER VEHICLE", v[0], v[1])(g, w, h); }); break; }
    case 10: { driving = true; dp = { pos: [399.5, PZ, Z], yaw: Math.PI / 2, jaw: 0.6, head: [-0.2, 0, 0], tailY: 0.4 * Math.sin(f * 0.3) }; ctlOn = fs < 30; cam = { pos: [403.4, 3.4, -4.0], look: [399.5, 2.9, -11], fov: 50 };
      if (fs < 8) OV.push((g, w, h) => { g.fillStyle = "rgba(255,255,255,0.4)"; g.fillRect(0, 0, w, h); }); break; }
    case 11: { driving = true; const x = X.lerp(402, 424, sp(S(11), Eo(11))); dp = { pos: [x, PZ, Z], yaw: Math.PI / 2, legL: Math.sin(f * 0.8) * 0.6, legR: -Math.sin(f * 0.8) * 0.6, jaw: 0.4 }; cam = { pos: [x - 2, 4.2, -1.5], look: [x + 3, 1.6, -11], fov: 54 }; R.row.forEach((r) => (r.front.visible = false)); break; }
    case 12: { driving = true; const x = X.lerp(424, 436, sp(S(12), S(12) + 70)); dp = { pos: [x, PZ, Z], yaw: Math.PI / 2, legL: Math.sin(f * 0.8) * 0.6, legR: -Math.sin(f * 0.8) * 0.6, jaw: fs > 20 && fs < 60 ? Math.abs(Math.sin(f * 0.9)) : 0.2 }; cam = { pos: [431, 4.4, -2.0], look: [431, 1.8, -11], fov: 54 }; R.row[2].front.visible = false;
      if (fs > 66) OV.push(mission("MISSION 9: THE BIG HEIST — PASSED", "(BY ACCIDENT)", 1, pop(S(12) + 66, 8), 330)); break; }
    case 13: { // slideshow: one held still per word
      const ws = ["did", "somebody", "sit", "on", "the", "frames"].map((w, i) => C.at(w, 0, S(13) + 18 + i * 30)); let i = 0; while (i < 5 && f >= ws[i + 1]) i++; cut = i;
      frames = i < 1 ? 12 : 3; tw = S(13); driving = true; R.radioStop = true;
      const still = [ // [Donutsaurus x, camera, bikes fallen 0..1, heli spot on]
        [438, { pos: [434, 2.4, -1.0], look: [440, 1.6, -9], fov: 56 }, 0.2, false], [439, { pos: [436, 2.0, -2.0], look: [445, 1.0, -7], fov: 56 }, 0.6, false], [440, { pos: [441, 1.2, 2.0], look: [440, 6, -8], fov: 62 }, 1, true],
        [441, { pos: [445, 9, 3], look: [441, 0, -9], fov: 56 }, 1, true], [442, { pos: [444, 2.0, -1.5], look: [452, 1.5, -6], fov: 52 }, 1, true], [442.5, { pos: [443.6, 2.6, -6.8], look: [442.5, 2.4, -11], fov: 46 }, 1, true]][i];
      dp = { pos: [still[0], PZ, Z], yaw: Math.PI / 2, legL: i % 2 ? 0.6 : -0.6, legR: i % 2 ? -0.6 : 0.6, jaw: 0.2 }; cam = still[1]; R.bikeK = still[2]; R.spotOn = still[3]; R.tankX = i >= 4 ? 450 : 470; R.tankRot = -Math.PI / 2;
      if (i === 5) R.faceCam = true; break; }
    case 14: { // FRAMES: 1 — three stills, then the fail screen as the fourth
      const per = 30, i = Math.min(3, Math.floor(fs / per)); frames = 1; tw = S(13); R.bikeK = 1; R.spotOn = true; R.tankX = 446; R.tankRot = -Math.PI / 2; cut = i;
      if (i === 0) { driving = true; dp = { pos: [445.5, PZ + 3.2, Z + 3.5], yaw: Math.PI / 2, legL: -1, legR: 1, pitch: -0.3 }; cam = { pos: [444, 2.0, 4.0], look: [446, 3.0, -4], fov: 56 }; R.tankZ = Z + 3.5; }
      else if (i === 1) { dp = { pos: [449.4, PZ, Z], yaw: Math.PI / 2 }; R.wallAt = 450; tp = { pos: [447.8, 2.6, Z], yaw: Math.PI / 2, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [-1.2, 0.2], armR: [-1.2, -0.2], face: "shock" }; cam = { pos: [446, 2.8, -4.5], look: [449, 2.4, -11], fov: 50 }; }
      else { sticker = true; R.wallAt = 450; dp = { pos: [449.4, PZ, Z], yaw: Math.PI / 2 }; tp = { pos: [449.75, PZ + 0.6, Z + 2.6], yaw: -Math.PI / 2, armL: [0, 1.4], armR: [0, 1.4], legL: 0, legR: 0, legLz: 0.3, legRz: 0.3, face: "dizzy" }; cam = { pos: [446.0, 2.0, Z + 2.6], look: [449.8, 1.7, Z + 2.6], fov: 50 };
        if (i === 3) { grade = { uSat: 0.35 }; const a = S(14) + 3 * per; OV.push(banner("TOASTED!", X.lerp(1.6, 1, X.easeOut(sp(a, a + 6))), 1)); shk = [a, 0.05, 8]; } }
      break; }
    case 15: { sticker = true; R.wallAt = 450; dp = { pos: [449.4, PZ, Z], yaw: Math.PI / 2 }; tp = { pos: [449.75, PZ + 0.6, Z + 2.6], yaw: -Math.PI / 2, armL: [0, 1.4], armR: [0, 1.4], legLz: 0.3, legRz: 0.3, face: f >= PR ? say("toast", "deadpan") : "dizzy", head: f > PR - 8 && f < PR + 4 ? [0.3, 0, 0] : [0, 0, 0] }; ctlOn = "wall";
      cam = { pos: [446.2, 2.0, Z + 2.6], look: [449.8, 1.7, Z + 2.6], fov: 50 }; if (f >= PR) OV.push((g, w, h) => { const p = P2(E, R.ctl.g.position.clone().add(new THREE.Vector3(0, 0.3, 0))); plusOne(p[0], p[1] - 30, f - PR)(g, w, h); }); break; }
    case 16: { sticker = true; R.wallAt = 450; dp = { pos: [449.4, PZ, Z], yaw: Math.PI / 2 }; tp = { pos: [449.75, PZ + 0.6, Z + 2.6], yaw: -Math.PI / 2, armL: [0, 1.4], armR: [0, 1.4], legLz: 0.3, legRz: 0.3, face: "deadpan" }; cam = { pos: [446.2, 2.0, Z + 2.6], look: [449.8, 1.7, Z + 2.6], fov: 50 };
      OV.push(patchCard("PATCH 1.02", ["FIXED: THE WALLS.", "BROKE: PLAYER 1."], (fs - 6) / 1.7, Math.min(1, fs / 6))); break; }
    case 17: { const peel = sp(S(17), S(17) + 14), slide = sp(S(17) + 30, Eo(17)); R.wallAt = 450; dp = { pos: [449.4, PZ, Z], yaw: Math.PI / 2 }; sticker = peel < 1;
      tp = { pos: [449.75 - 1.2 * peel - 1.5 * slide, PZ, Z + 2.6], yaw: -Math.PI / 2 + 1.2 * peel, ...TPOSE, face: say("toast", "sad") }; tagTxt = fs < 40 ? "PLAYER 1" : fs < 70 ? "NPC" : "PROP (UNUSED)";
      cam = { pos: [445.0, 2.2, Z + 6.6], look: [448.4, 1.8, Z + 2.0], fov: 46 }; R.pigeonOn = fs > 60 ? Math.min(1, (fs - 60) / 20) : 0; break; }
  }
  // ---- world ----
  traffic(R, tw, n !== 13 && n !== 14 ? true : true); silPose(R, tw, silOpt);
  R.bikes.forEach((b, i) => { const k = R.bikeK != null ? Math.max(0, Math.min(1, R.bikeK * 9 - i)) : 0; b.position.set(X0 + 42 + i * 0.7, 0, -7.4); b.rotation.set(0, 0, -1.4 * k); });
  R.spot.visible = R.beam.visible = !!R.spotOn; if (R.spotOn) { const dx = dp.pos[0]; R.heli.position.set(dx + 2, 13, -6); R.spot.position.set(dx, PZ + 0.02, Z); R.beam.position.set(dx + 1, 6.6, (Z - 6) / 2 + 0.5); R.beam.rotation.set(0.35, 0, -0.14); } else R.heli.position.set(X0 + 60, 18, -30);
  R.tank.position.set(R.tankX || 480, 0, R.tankZ || -4); R.tank.rotation.y = R.tankRot || 0; R.ind.visible = (Math.floor(tw / 8) % 2 === 0) || n === 13;
  R.bikeK = null; R.spotOn = false; R.tankX = null; R.tankZ = null;
  if (!(n === 5 || n === 11 || n === 12)) R.row.forEach((r) => (r.front.visible = true));
  if (n === 13 || n === 14 || n >= 15) { if (!R.wall) { R.wall = E.box(0.3, 4.5, 8, E.mat("#7a8296"), [0, -50, 0]); } R.wall.position.set(R.wallAt ? R.wallAt : 900, R.wallAt ? 0 : -50, Z + 1.5); } R.wallAt = null;
  // ---- pose ----
  if (driving) { D.pose(dp); D.root.updateMatrixWorld(true); const seat = wpos(D.body, [0, 0.95, -0.15]); tp = { pos: [seat.x, seat.y - 0.35, seat.z], yaw: dp.yaw, legL: -1.4, kneeL: 1.2, legR: -1.4, kneeR: 1.2, armL: [-1.3, 0.25], elbowL: 0.4, armR: [-1.3, -0.25], elbowR: 0.4 + 0.2 * Math.sin(f * 0.4), face: n === 10 ? say("toast", "grin") : R.faceCam ? say("toast", "shock") : "grin", head: R.faceCam ? [0, -1.2, 0] : [0, 0, 0] }; }
  R.faceCam = false;
  T.pose(tp); if (!driving) D.pose(dp);
  if (round) D.body.scale.set(1.35, 1.15, 1.7);
  if (onlyHead) { T.torso.visible = false; T.arms.forEach((a) => (a.visible = false)); T.legs.forEach((l) => (l.visible = false)); } else { T.torso.visible = true; T.arms.forEach((a) => (a.visible = true)); T.legs.forEach((l) => (l.visible = true)); }
  if (legsOn) { T.legs.forEach((l) => (l.visible = false)); R.legs.pose(R.legsPose); } else R.legs.pose({ visible: false });
  if (sticker) { T.root.scale.set(1, 1, 0.08); T.root.position.x = 449.83; }
  T.root.updateMatrixWorld(true);
  if (wear.hood && !onlyHead) { R.wearHood.position.copy(wpos(T.head, [0, 0.75, 0])); R.wearHood.rotation.copy(T.root.rotation); } else if (wear.hood && onlyHead) { R.wearHood.position.copy(wpos(T.head, [0, 0.75, 0])); }
  if (wear.seat) { R.wearSeat.position.copy(wpos(T.chest, [0, 0.72, 0])); R.wearSeat.rotation.set(0, T.root.rotation.y, 0); }
  if (wear.lamp) { R.wearLamp.position.copy(wpos(T.elbows[0], [0, -0.1, 0.1])); }
  if (sticker) { R.wearHood.position.y = R.wearSeat.position.y = R.wearLamp.position.y = -50; }
  if (ctlOn === "wall") { R.ctl.g.position.set(449.4, PZ + 1.5, Z + 2.6); R.ctl.g.rotation.set(0, 0, Math.PI / 2); } else if (ctlOn) { const a = wpos(T.elbows[0], [0, -0.42, 0]), b = wpos(T.elbows[1], [0, -0.42, 0]); const m = a.add(b).multiplyScalar(0.5); R.ctl.g.position.set(m.x, m.y, m.z); R.ctl.g.rotation.set(0.6, T.root.rotation.y, 0); } else R.ctl.g.position.y = -50;
  R.pigeon.position.set(-50, -50, 0); if (R.pigeonOn) { const a = wpos(T.elbows[1], [0, -0.3, 0]); const k = R.pigeonOn; R.pigeon.position.set(a.x, a.y + 0.2 + 2 * (1 - k), a.z); } R.pigeonOn = 0;
  // ---- overlays ----
  if (barsK) OV.push(bars(barsK, barsO));
  if (tagOn && !onlyHead && n !== 14) OV.push((g, w, h) => { const v = P2(E, wpos(T.head, [0, 1.3, 0])); if (v[2] < 1) tag(tagTxt, v[0], v[1], { bg: tagTxt === "PLAYER 1" ? undefined : "rgba(110,110,120,0.92)", s: n === 17 && (fs === 40 || fs === 70) ? 1.3 : 1 })(g, w, h); });
  if (n >= 2 && n <= 3) OV.push((g, w, h) => { R.sil.forEach((p) => { const v = P2(E, wpos(p.root, [0, 3.2, 0])); if (v[2] < 1) textO("▼ MAIN CHARACTER", v[0], v[1], 30, { col: "#ffe14a" })(g, w, h); }); });
  if (n === 12) { frames = fs > 60 ? 12 : 30; } if (n > 14) frames = 30;
  OV.push(gameHud({ frames, alarm, label: alabel, cash: n >= 12 ? 9999 : 0 }), chip(unit, { prev, jump }));
  if (walls && n <= 9) OV.push(counter(`WALLS: ${walls}`, 1));
  if (radioOn) OV.push(radio(1));
  if (n === 13) { const ww = ["Did.", "Somebody.", "Sit.", "On.", "The.", "Frames?"][cut]; OV.push(textO(ww, 960, 880, 110, { col: "#ffffff" })); }
  const cur = C.seg(); if (cur && n !== 13) OV.push(subtitle(cur.text));
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof, grade, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
