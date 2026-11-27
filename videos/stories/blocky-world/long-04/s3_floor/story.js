// Long 4 · Scene 3 — Day one: the floor (12 shots). Glaze City corner at the edge of Turbo City.
import * as THREE from "three";
import { makeToast, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { controller } from "./common/props.js";
import { textO, subtitle, INK, F } from "./common/ui.js";
import { chip, plusOne, P2, wpos, review, tag, prompt, patchCard, gameHud, counter } from "./common/l4.js";
import { game, traffic, silPose, X0 } from "./common/game.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {};
export async function build(E) {
  await loadTL(meta, R);
  Object.assign(R, game(E));
  R.T = solid(makeToast(E)); R.D = makeDonutsaurus(E); R.ctl = controller(E, null, [0, -50, 0], 0.5);
}
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop, say } = C, OV = [], { T, D } = R, CX = R.CX;
  let cam, light = "golden", dof = { focus: 6, amount: 0 }, shk = null;
  traffic(R, f, false); R.cars[0].visible = true; R.cars[0].position.set(R.CX + 11, 0, -6.6); R.cars[0].rotation.set(0, Math.PI / 2, 0); silPose(R, f); R.setPatched(n === 12 && fs > 20); R.under.visible = n === 5; R.spot.visible = R.beam.visible = false;
  R.heli.position.set(X0 + 30, 16, -30); R.tank.position.set(X0 + 70, 0, -30);
  let tp = { pos: [CX - 2, 0, -5.5], yaw: 0.1, face: "happy" }, dp = { pos: [CX - 4.2, 0, -4.6], yaw: 0.5, tail: 0.25 }, fly = null, tagOn = n >= 2, falls = n >= 9 ? 3 : n === 8 ? (fs > 40 ? 3 : 2) : n === 7 ? (fs > 30 ? 2 : 1) : n === 6 ? 1 : 0, ctlOn = false;
  let unit = n >= 10 ? "13 HOURS" : "13 HOURS", prev = null, jump = 1; const PR = S(10) + 34; if (n === 10 && f >= PR) { prev = "13 HOURS"; unit = "13 DAYS"; jump = (f - PR) / 18; } if (n > 10) unit = "13 DAYS";
  const reviews = [];
  const wide = { pos: [CX - 0.5, 2.3, 1.8], look: [CX - 1.5, 1.6, -8], fov: 52 };
  switch (n) {
    case 1: { const k = X.easeIn(sp(S(1), S(1) + 16)); tp = { pos: [CX - 2, 7 * (1 - k), -5.5], yaw: 0.1, face: k < 1 ? "shock" : say("toast", "grin"), armL: k < 1 ? [-2.6, 0.5] : [-0.6, 0.6], armR: k < 1 ? [-2.6, -0.5] : [-0.6, -0.6] }; dp = { ...dp, pos: [CX - 4.2, 7 * (1 - X.easeIn(sp(S(1) + 6, S(1) + 22))), -4.6] };
      const land = S(1) + 70; fly = f < land ? [CX - 6 + (f - S(1)) * 0.05, 3 + Math.sin(f * 0.2) * 0.4, -9 + (f - S(1)) * 0.05] : "nose"; cam = wide;
      reviews.push(["10/10", [CX - 6, 5.2, -11.6], S(1) + 24], ["10/10", [CX - 3, 0.3, -4.8], S(1) + 40], ["10/10", [CX + 4, 0.9, -9], S(1) + 56], ["BEST GAME EVER", "fly", land + 4]); break; }
    case 2: { const k = pop(S(2) + 8, 8); tp = { pos: [CX - 2, 0, -5.5], yaw: -0.5, face: say("toast", "grin"), armL: fs > 14 && fs < 60 ? [-2.9, 0.2] : fs >= 100 ? [-2.8, -0.2] : [0, 0.2], armR: fs > 14 && fs < 60 ? [-2.9, -0.2] : [0, -0.2], elbowL: fs >= 100 ? 0.4 * Math.sin(f * 0.6) : 0 };
      cam = { pos: [CX - 7.5, 2.0, -3.2], look: [CX + 12, 2.2, -4.6], fov: 46 }; R.tagS = k; dp = { ...dp, pos: [CX + 1.2, 0, -7.2] };
      OV.push((g, w, h) => { R.sil.forEach((p) => { const v = P2(E, wpos(p.root, [0, 3.2, 0])); if (v[2] < 1) textO("▼ MAIN CHARACTER", v[0], v[1], 40, { col: "#ffe14a" })(g, w, h); }); }); break; }
    case 3: { const k = X.smooth(sp(S(3) + 4, S(3) + 16)); tp = { pos: [CX + 0.5, X.lerp(0, -0.25, k), X.lerp(-7.4, -8.7, k)], yaw: 0.9, head: [0, 0.2, 0], legL: -0.3 * (1 - k), face: fs > 30 ? say("toast", "deadpan") : "shock" }; cam = { pos: [CX + 3.6, 1.8, -4.2], look: [CX + 0.5, 0.9, -8.6], fov: 44 };
      reviews.push(["10/10", [CX + 0.5, 0.4, -8.4], S(3) + 22]); break; }
    case 4: { const k = X.easeIn(sp(S(4) + 6, S(4) + 18)); tp = { pos: [CX + 0.5, -0.25 - 2.6 * k, -8.9], yaw: 0.9, head: [0, 0.2, 0], face: "shock", armL: [-2.8 * k, 0.3], armR: [-2.8 * k, -0.3] }; cam = { pos: [CX + 3.6, 1.8, -4.2], look: [CX + 0.5, 0.9, -8.6], fov: 44 }; break; }
    case 5: { const k = sp(S(5), Eo(5)); light = "golden"; tp = { pos: [CX + 0.5, -0.5 - 16 * k * k, -9], yaw: 0.3, pitch: -0.4, face: "shock", armL: [-2.6, 0.9], armR: [-2.6, -0.9], legL: 0.4 * Math.sin(f * 0.5), legR: -0.4 * Math.sin(f * 0.5) }; cam = { pos: [CX + 2, -9, 6], look: [CX, 0, -8], fov: 60 }; break; }
    case 6: { const k = X.easeIn(sp(S(6), S(6) + 12)); tp = { pos: [CX - 2, 9 * (1 - k), -5.5], yaw: 0.2, face: k < 1 ? "shock" : "dizzy", armL: [-2.6, 0.5], armR: [-2.6, -0.5], stretch: k > 0.99 && fs < 18 ? [1.2, 0.8] : [1, 1] }; cam = wide; if (fs > 10 && fs < 16) shk = [S(6) + 11, 0.08, 6]; break; }
    case 7: { const st = S(7) + 10, gone = S(7) + 26, back = S(7) + 46; if (f < gone) tp = { pos: [X.lerp(CX + 3, CX + 6, sp(S(7), st)), 0.3 - 2.2 * X.easeIn(sp(st, gone)), -10.6], yaw: 1.2, face: "happy", legL: 0.4 * Math.sin(f * 0.5), legR: -0.4 * Math.sin(f * 0.5) };
      else { const k = X.easeIn(sp(back, back + 10)); tp = { pos: [CX - 1, 11 * (1 - k), -5.5], yaw: 0.2, face: f > back + 10 ? "dizzy" : "shock", armL: [-2.6, 0.5], armR: [-2.6, -0.5] }; if (f < back) tp.pos[1] = 40; } cam = { ...wide, pos: [CX + 2, 2.4, 2.2], look: [CX + 2, 1.6, -8] }; break; }
    case 8: { const sit = S(8) + 16, gone = S(8) + 30, back = S(8) + 50; if (f < gone) tp = { pos: [CX + 1, 0.26 + 0.5 - 2.4 * X.easeIn(sp(sit, gone)), -12.0], yaw: 0.15, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, face: f > sit ? "shock" : "smug" };
      else { const k = X.easeIn(sp(back, back + 10)); tp = { pos: [CX - 1, 14 * (1 - k), -5.5], yaw: 0.2, face: f > back + 10 ? say("toast", "angry") : "shock", armL: f > back + 10 ? [-0.6, 0.6] : [-2.6, 0.5], armR: f > back + 10 ? [-0.6, -0.6] : [-2.6, -0.5] }; if (f < back) tp.pos[1] = 40; } cam = { pos: [CX + 0.8, 2.4, 2.2], look: [CX + 0.3, 1.6, -8], fov: 52 }; break; }
    case 9: { const k = sp(S(9), Eo(9)); dp = { pos: [X.lerp(CX - 2, CX + 9, k), 0.25 + (k > 0.55 && k < 0.8 ? 0.05 : 0), X.lerp(-9.2, -11.4, k)], yaw: Math.PI / 2, legL: Math.sin(f * 0.4) * 0.5, legR: -Math.sin(f * 0.4) * 0.5, tailY: 0.3 * Math.sin(f * 0.2) }; tp = { pos: [CX - 2, 0, -5.5], yaw: 0.9, face: "shock" };
      cam = { pos: [CX + 3.5, 2.4, -2.0], look: [CX + 3.5, 1.2, -10.5], fov: 52 }; if ((fs >> 3) % 3 !== 2) OV.push((g, w, h) => { const v = P2(E, wpos(D.root, [0, 3.2, 0])); prompt("ENTER VEHICLE", v[0], v[1])(g, w, h); }); break; }
    case 10: { tp = { pos: [CX - 1, 0, 0], yaw: 0.2, face: f >= PR ? say("toast", "smug") : say("toast", "deadpan"), armL: [-1.4, 0.2], elbowL: 0.6, armR: [-1.4, -0.2], elbowR: 0.6 }; ctlOn = true; dp = { pos: [CX + 9, 0.25, -11.4], yaw: -0.5 }; cam = { pos: [CX - 0.2, 2.0, 5.2], look: [CX - 1, 1.6, -0.2], fov: 44 };
      if (f >= PR) OV.push((g, w, h) => { const p = P2(E, R.ctl.g.position.clone().add(new THREE.Vector3(0, 0.25, 0))); plusOne(p[0], p[1] - 30, f - PR)(g, w, h); }); break; }
    case 11: { tp = { pos: [CX - 1, 0, 0], yaw: 0.2, face: "happy", armL: [-1.4, 0.2], elbowL: 0.6, armR: [-1.4, -0.2], elbowR: 0.6 }; ctlOn = true; dp = { pos: [CX + 9, 0.25, -11.4], yaw: -0.5 }; cam = { pos: [CX - 0.2, 2.0, 5.2], look: [CX - 1, 1.6, -0.2], fov: 44 };
      OV.push(patchCard("PATCH 1.01", ["FIXED: THE FLOOR.", "BROKE: THE WALLS."], (fs - 6) / 1.7, Math.min(1, fs / 6))); break; }
    case 12: { const j1 = S(12) + 26, j2 = S(12) + 44; const hop = (a) => (f > a && f < a + 14 ? Math.sin((f - a) / 14 * Math.PI) * 0.6 : 0); tp = { pos: [CX + 0.5, 0.25 + hop(j1) + hop(j2), -9.4], yaw: 0.25, face: say("toast", "grin"), armL: [-0.4, 0.6], armR: [-0.4, -0.6], kneeL: hop(j1) + hop(j2) > 0 ? 0.6 : 0, kneeR: hop(j1) + hop(j2) > 0 ? 0.6 : 0 }; dp = { pos: [CX + 4, 0.25, -10.6], yaw: -0.6 };
      cam = { pos: [CX + 1.5, 2.0, -3.4], look: [CX + 0.8, 1.2, -10], fov: 48 }; break; }
  }
  // ---- pose ----
  T.pose(tp); D.pose(dp); R.T.root.updateMatrixWorld(true);
  if (fly === "nose") R.butterfly(wpos(T.head, [0, 0.42, 0.62]).toArray(), f); else if (fly) R.butterfly(fly, f); else R.butterfly([0, -50, 0], f);
  if (ctlOn) { const a = wpos(T.elbows[0], [0, -0.42, 0]), b = wpos(T.elbows[1], [0, -0.42, 0]); const m = a.add(b).multiplyScalar(0.5); R.ctl.g.position.set(m.x, m.y + 0.02, m.z + 0.1); R.ctl.g.rotation.set(0.9, tp.yaw, 0); } else R.ctl.g.position.y = -50;
  // ---- overlays ----
  reviews.forEach(([txt, p, a]) => OV.push((g, w, h) => { const v = P2(E, p === "fly" ? R.fly.position : p); review(txt, v[0], v[1] - 40, f - a, txt.length > 6 ? 46 : 56)(g, w, h); }));
  if (tagOn && n !== 5 && n !== 11) OV.push((g, w, h) => { const v = P2(E, wpos(T.head, [0, 1.35, 0])); if (v[2] < 1 && T.root.position.y > -1) tag("PLAYER 1", v[0], v[1], { s: n === 2 ? R.tagS : 1 })(g, w, h); });
  OV.push(gameHud({ frames: 30, alarm: 0, cash: 0 }), chip(unit, { prev, jump }));
  if (falls) OV.push(counter(`FALLS: ${falls}`, n === 6 && fs < 20 ? pop(S(6) + 12, 6) : 1));
  const cur = C.seg(); if (cur) OV.push(subtitle(cur.text));
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
