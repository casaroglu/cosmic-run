// Long 4 · Scene 2 — Launch night: no disc (19 shots)
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { controller, adminHand } from "./common/props.js";
import { textO, subtitle, loading, INK, F } from "./common/ui.js";
import { home, gameCase, moth, drawScreen, chip, plusOne, spinner, P2, wpos, starIcon, live, insertCanvas } from "./common/l4.js";
import { loopPose, DARK, HOMELIGHT, LOOP } from "./common/loop.js";
import { loadTL, ctx, FPS } from "./common/kit.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
const R = {};
export async function build(E) {
  await loadTL(meta, R);
  Object.assign(R, home(E));
  R.T = solid(makeToast(E)); R.P = solid(makePixi(E)); R.D = makeDonutsaurus(E); R.H = adminHand(E);
  R.ctl = controller(E, null, [0, -50, 0], 0.5); R.case = gameCase(E); R.moth = moth(E);
  // tile-flip line toward Toast + the white square in the ceiling
  R.flip = []; for (let i = 0; i < 12; i++) R.flip.push(E.box(0.92, 0.04, 0.92, E.mat("#fff6fb"), [4.6 - i * 0.62, 0.02, 1.8 - i * 0.1], { noShadow: true, center: true }));
  R.light = E.plane(3.2, 3.2, E.flat("#ffffff", { transparent: true, opacity: 0, fog: false }), [-2.6, R.H0 = 6.18, 0.8], { rot: [Math.PI / 2, 0, 0], noink: true, noShadow: true });
}
const CODE = "X7Q2M9DK4LZP88RTWQ0BH3NV6YJST1EC5GUAK0FX";
export function frame(f, E) {
  const C = ctx(f, E, R), { X, n, fs, S, Eo, sp, pop, say } = C, OV = [], { T, P, D, H } = R;
  let cam, light = HOMELIGHT, dof = { focus: 6, amount: 0 }, shk = null, grade = null;
  R.shop.clock(n < 8 ? "11:38" : n === 8 ? `11:${String(38 + Math.min(20, Math.floor(fs / 6))).padStart(2, "0")}` : "11:59", "PM");
  // ---- defaults ----
  let tp = { pos: [-1.6, 0, 0.4], yaw: 0.3, face: "happy" };
  let pp = { pos: [-0.9, 0.74, -1.62], yaw: 0.55, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [0, 0.2], armR: [0, 0.2], face: say("pixi", "deadpan") }, board = [0.1, 1.2, -1.8, 0.4];
  let dp = { pos: [5.0, 0.95, -0.7], yaw: -0.5, pitch: -1.25, squash: 0.03 * Math.sin(f * 0.1), jaw: 0.1, legL: -0.4, legR: 0.4, blink: true }, dVis = true;
  let caseOn = false, casePos = null, caseRot = [0, 0, 0], caseOpen = 0, ctlAt = null, ctlRot = [0, 0, 0], handOn = false, hpose = null, cupOn = false, mothAt = null;
  let chipOn = n >= 10 && n !== 14 && !(n === 10 && fs < 40), unit = "13 MINUTES", prev = null, jump = 1, scr = { s: "off" }, scrLight = 0, scrCol = "#59e6ff";
  R.bottle.position.set(-1.6, 1.2, -1.6); R.bottle.rotation.set(0, 0, 0); R.ctl.start.scale.y = 1; R.ctl.set("MEGA DONUT HEIST 2", 3);
  R.cups.forEach((c) => (c.position.y = -50)); R.slipOn = false; R.case.slip.position.y = -50;
  const PRESS = S(13) + 40; if (n === 13 && f >= PRESS) { prev = "13 MINUTES"; unit = "13 HOURS"; jump = (f - PRESS) / 18; } if (n > 13) unit = "13 HOURS";
  // Toast in his hands-holding pose
  const hold = { armL: [-1.3, 0.25], elbowL: 0.9, armR: [-1.3, -0.25], elbowR: 0.9 };
  const handsMid = () => { T.root.updateMatrixWorld(true); const a = wpos(T.elbows[0], [0, -0.42, 0]), b = wpos(T.elbows[1], [0, -0.42, 0]); return a.add(b).multiplyScalar(0.5); };
  const seated = { pos: [-3.2, 0.03, 0.75], yaw: -Math.PI / 2 + 0.25, legL: -1.45, kneeL: 1.45, legR: -1.45, kneeR: 1.45, armL: [-1.05, 0.12], elbowL: 0.75, armR: [-1.15, -0.12], elbowR: 0.85 };
  const TP = [1.4, 0, 0.7];
  switch (n) {
    case 1: { const k = X.smooth(sp(S(1), S(1) + 30)); tp = { pos: TP, yaw: 0.15, ...hold, armL: [-1.1 - 0.5 * k, 0.25], armR: [-1.1 - 0.5 * k, -0.25], head: [0.25, 0, 0.08 * Math.sin(f * 0.2)], face: "grin" }; caseOn = true; caseRot = [1.1, 0.15, 0.1 * Math.sin(f * 0.2)]; R.caseDrop = 0.25;
      cam = { pos: [2.0, 2.0, 5.6], look: [1.0, 1.55, 0.3], fov: 42 }; if (fs > 20) OV.push(textO("♥", 1000 + 40 * Math.sin(f * 0.1), 330 - fs * 1.2, 70, { col: "#ff7fb8", a: Math.max(0, 1 - (fs - 20) / 50) })); break; }
    case 2: { tp = { pos: TP, yaw: 0.15, ...hold, face: "grin" }; caseOn = true; caseRot = [1.1, 0.15, 0]; cam = { pos: [2.0, 2.0, 5.6], look: [1.0, 1.55, 0.3], fov: 42 }; OV.push(insertCanvas(R.case.coverTex.image, null, { h: 960, s: 0.9 + 0.1 * X.smooth(sp(S(2), Eo(2))) })); break; }
    case 3: { tp = { pos: TP, yaw: 0.15, ...hold, face: "grin" }; caseOn = true; caseRot = [1.1, 0.15, 0]; cam = { pos: [2.0, 2.0, 5.6], look: [1.0, 1.55, 0.3], fov: 42 }; OV.push(insertCanvas(R.case.coverTex.image, [4, 538, 300, 142], { h: 440, rot: -0.05 }));
      if (fs > 34) OV.push((g, w, h) => { const k = h / 1080; g.save(); g.strokeStyle = "#ff3d3d"; g.lineWidth = 12 * k; g.beginPath(); g.ellipse(960 * k, 540 * k, 330 * k, 80 * k, -0.05, 0, Math.PI * 2 * Math.min(1, (fs - 34) / 14)); g.stroke(); g.restore(); }); break; }
    case 4: { tp = { pos: TP, yaw: 0.15, ...hold, face: fs > 30 ? "shock" : "grin", head: [0.35, 0, 0] }; caseOn = true; caseRot = [0.35, 0.15, 0]; caseOpen = X.smooth(sp(S(4) + 6, S(4) + 24)); R._mk = sp(S(4) + 24, S(4) + 80);
      cam = { pos: [2.3, 2.2, 4.8], look: [1.3, 1.7, 0.6], fov: 42 }; if (fs > 24) mothAt = 1; break; }
    case 5: { const shake = Math.sin(f * 1.4) * (fs > 10 && fs < 50 ? 0.25 : 0); tp = { pos: TP, yaw: 0.15, ...hold, armL: [-1.0 + shake, 0.25], armR: [-1.0 + shake, -0.25], face: say("toast", "shock"), head: [-0.1, 0, 0] }; caseOn = true; caseRot = [Math.PI - 0.3, 0.15, 0]; caseOpen = 0.6;
      R.slipOn = fs > 34; cam = { pos: [2.0, 2.0, 5.6], look: [1.0, 1.55, 0.3], fov: 42 }; break; }
    case 6: { tp = null; R.case.slip.position.set(0, 1.0, 3.0); R.case.slip.rotation.set(-Math.PI / 2, 0, 0.04); cam = { pos: [0, 1.45, 3.04], look: [0, 1.0, 3.0], fov: 34 }; break; }
    case 7: { tp = { pos: TP, yaw: 0.35, face: say("toast", "shock"), armR: [-0.4, 0.2] }; caseOn = true; casePos = [0.2, 1.21, -1.45]; caseRot = [0, 0.3, 0]; caseOpen = 1; handOn = true;
      hpose = { pos: [2.6, 1.62, -1.75], rot: [-Math.PI / 2, -0.25, 0], tap: Math.abs(Math.sin(f * 0.22)) }; cam = { pos: [1.2, 2.5, 6.4], look: [1.4, 1.5, -0.8], fov: 46 }; break; }
    case 8: { // INSERT screen: one finger, twenty minutes, CODE INVALID
      tp = null; const nch = Math.min(40, Math.floor(fs / 2.6)); const invalid = fs > Eo(8) - S(8) - 34; scr = { s: "code", code: CODE.slice(0, invalid ? 40 : nch), key: invalid ? null : CODE[nch % 40], msg: invalid ? "CODE INVALID" : null };
      cam = { pos: [R.TVX + 1.25, 1.6, R.TVZ], look: [R.TVX, 1.6, R.TVZ], fov: 40 }; R.fingerAt = [R.TVX + 0.3, 1.42 + 0.05 * Math.abs(Math.sin(f * 0.4)), R.TVZ - 0.1 + 0.25 * Math.sin(fs * 0.05)];
      OV.push((g, w, h) => { const k = h / 1080; g.save(); g.fillStyle = "#14101c"; g.fillRect(60 * k, 110 * k, 300 * k, 120 * k); g.font = F(80, k); g.fillStyle = "#ff3030"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(`11:${String(38 + Math.min(20, Math.floor(fs / 6))).padStart(2, "0")}`, 210 * k, 172 * k); g.restore(); }); break; }
    case 9: { tp = { ...seated, face: fs < 40 ? "sad" : "shock" }; const give = fs > 26 && fs < 86; pp = { pos: [-2.5, 0, 2.2], yaw: -2.3, armL: give ? [-1.2, 0.1] : [0, 0.2], elbowL: 0.6, armR: give ? [-1.2, -0.1] : [0, 0.2], elbowR: 0.6, face: "deadpan", head: [0.3, 0, 0] }; board = [-1.8, 0, 2.8, 0.4];
      if (give) { P.pose(pp); P.root.updateMatrixWorld(true); const a = wpos(P.elbows[0], [0, -0.42, 0]); ctlAt = [a.x - 0.25, a.y - 0.05, a.z]; ctlRot = [0.7, -2.3, 0]; } else ctlAt = "hands";
      scr = { s: "code", code: fs > 60 ? CODE : CODE.slice(0, 6), msg: fs > 60 ? "CODE ACCEPTED" : null }; scrLight = 1; cam = { pos: [-5.4, 2.2, 6.4], look: [-2.8, 1.3, 1.0], fov: 42 }; break; }
    case 10: { tp = null; scr = { s: "patch", pct: 99, left: "13 MINUTES" }; cam = { pos: [R.TVX + 1.3, 1.6, R.TVZ], look: [R.TVX, 1.6, R.TVZ], fov: 40 }; break; }
    case 11: { tp = { ...seated, face: "happy" }; ctlAt = "hands"; pp = { ...pp, lean: -0.25, armL: [-1.4, 0.3], elbowL: 1.6, head: [-0.2, 0.3, 0], face: "smug" }; cupOn = true;
      cam = { pos: [0.6, 2.1, 3.4], look: [-1.5, 2.1, -1.8], fov: 46 }; break; }
    case 12: { const fid = fs < 60 ? Math.sin(f * 0.9) * 0.15 : 0; tp = { ...seated, face: say("toast", fs < 60 ? "smug" : "angry"), legL: -1.45 + fid, legR: -1.45 - fid, head: [0, 0.4 * Math.sin(f * 0.15), 0] }; ctlAt = "hands"; scrLight = 1;
      cam = { pos: [-4.7, 1.75, 3.0], look: [-2.8, 1.35, 0.3], fov: 46 }; if (fs < 120) OV.push(textO(`${Math.min(4, 1 + Math.floor(fs / 30))}…`, 1500, 300, 90, { col: "#ffffff", s: pop(S(12) + Math.floor(fs / 30) * 30, 6) })); break; }
    case 13: { tp = { ...seated, face: f >= PRESS ? say("toast", "smug") : "angry", armR: f >= PRESS - 6 && f < PRESS + 4 ? [-1.25, -0.12] : seated.armR }; ctlAt = "hands"; scrLight = 1; scr = { s: "patch", pct: 99, left: f >= PRESS ? "13 HOURS" : "13 MINUTES", press: f >= PRESS && f < PRESS + 6 };
      cam = { pos: [-4.7, 1.75, 3.0], look: [-2.8, 1.35, 0.3], fov: 46 }; pp = { ...pp, head: [0, 0.5, 0] };
      if (f >= PRESS) OV.push((g, w, h) => { const p = P2(E, R.ctl.g.position.clone().add(new THREE.Vector3(0, 0.25, 0))); plusOne(p[0], p[1] - 30, f - PRESS)(g, w, h); }); break; }
    case 14: { // START anyway -> LOOP_POSE -> INSERT SERVERS: DOWN
      if (fs < 40) { const Lp = loopPose(R, f); cam = Lp.cam; light = fs < 8 ? HOMELIGHT : DARK; dof = Lp.dof; tp = "loop"; if (fs < 8) { R.screenLight.color.set("#59e6ff"); R.screenLight.intensity = 3; } }
      else { tp = null; scr = { s: "down" }; scrLight = 2; scrCol = "#ff2a2a"; light = DARK; cam = { pos: [R.TVX + 1.25, 1.6, R.TVZ], look: [R.TVX, 1.6, R.TVZ], fov: 40 }; } break; }
    case 15: { light = [HOMELIGHT[0], DARK, 0.55]; scrLight = 1.5; scrCol = "#ff2a2a"; scr = { s: "down" }; const poke = S(15) + 40; tp = { pos: [0.4, 0, 0.9], yaw: 0.5, armR: f > poke - 10 && f < poke + 12 ? [-2.4, 0.1] : [0, 0.2], elbowR: 0.1, face: "deadpan", head: [-0.4, 0, 0] };
      handOn = true; R.limp = { pos: [1.4, 4.1, -0.2], swing: f > poke ? 0.25 * Math.sin((f - poke) * 0.25) * Math.exp(-(f - poke) / 40) : 0 }; cam = { pos: [0.0, 2.3, 7.4], look: [0.8, 2.6, -0.4], fov: 50 };
      OV.push((g, w, h) => { const p = P2(E, [1.4, 4.0, 0.3]); spinner(p[0], p[1], 46, f / 30)(g, w, h); }); break; }
    case 16: { light = [HOMELIGHT[0], DARK, f > Eo(16) - 40 ? 0 : 0.55]; const pull = S(16) + 20, back = S(16) + 95; const out = f > pull && f < back; R.plug.position.set(out ? 7.3 : 7.55, out ? 0.35 : 0.1, 0.6);
      tp = { pos: [7.0, 0, 1.6], yaw: 0.1, lean: 0.2, armR: out ? [-0.5, -0.3] : [-0.9, 0.1], elbowR: 0.3, armL: f > pull + 20 && f < back - 10 ? [-2.6, 0.2] : [0, 0.2], elbowL: 0.4, face: say("toast", "smug"), head: [0, 0, 0.1] };
      R.routerLed.material.color.set(out ? "#331111" : "#39ff6a"); handOn = true; const awake = f > back + 20;
      if (awake) hpose = { pos: [4.6, 4.4 + 0.15 * Math.sin((f - back) * 0.6) * Math.exp(-(f - back - 20) / 20), -0.6], rot: [0, 0, 0], tap: 0 }; else R.limp = { pos: [4.6, 4.4, -0.6], swing: 0 };
      dp = { ...dp, blink: false, head: [0, 0, 0.3] }; cam = { pos: [5.0, 2.2, 7.8], look: [5.9, 2.1, 0.4], fov: 50 };
      if (f > back + 20) OV.push(textO("SERVERS: UP", 960, 160, 80, { col: "#7dff7a", s: pop(back + 20, 6) }), textO("(MOSTLY)", 960, 240, 54, { col: "#ffe14a", s: pop(back + 30, 6) })); scrLight = awake ? 1 : 0;
      if (f > pull + 20 && f < back - 10) OV.push((g, w, h) => { const p = P2(E, wpos(T.elbows[0], [0, -0.5, 0])); textO(String(1 + Math.floor((f - pull - 20) / 22)), p[0], p[1] - 60, 64, { col: "#ffffff" })(g, w, h); }); break; }
    case 17: { tp = null; ctlAt = [0, 1.0, 3.0]; ctlRot = [0.75, 0, 0]; R.ctl.set("JOIN ANYWAY >", 3); cam = { pos: [0, 1.62, 3.42], look: [0, 1.0, 3.0], fov: 38 };
      OV.push(textO("JOIN ANYWAY ▸", 960, 180, 96, { col: "#ffffff" }), textO("NOT RECOMMENDED", 960, 290, 60, { col: "#ff3d3d", s: pop(S(17) + 12, 6) })); break; }
    case 18: { // tiles flip toward him; moth up into the light; Donutsaurus jumps after it; Toast too; Pixi stays and sips
      const up = S(18) + 40, k = X.easeIn(sp(up, up + 34)); tp = { ...seated, pos: [-3.2, 0.03 + k * 7, 0.75], face: "shock", armL: [-3.0, 0.4], armR: [-3.0, -0.4] }; ctlAt = "hands";
      mothAt = [-2.8 + 0.2 * Math.sin(f * 0.3), 1.6 + sp(S(18), up + 20) * 5, 0.6]; const dk = X.easeIn(sp(up - 10, up + 26)); dp = { pos: [X.lerp(4.8, -2.2, Math.min(1, sp(S(18) + 10, up - 8))), dk * 7 + (dk ? 0 : Math.abs(Math.sin(fs * 0.3)) * 0.3), X.lerp(-1.1, 1.4, sp(S(18) + 10, up - 8))], yaw: -1.6, jaw: 1, legL: Math.sin(f) * 0.6, legR: -Math.sin(f) * 0.6 };
      pp = { ...pp, armL: [-1.4, 0.3], elbowL: 1.6, head: [-0.3, 0.2, 0], face: "deadpan" }; cupOn = true; R.light.material.opacity = Math.min(1, sp(S(18), S(18) + 10)) * 0.95; cam = { pos: [0.2, 2.6, 8.4], look: [-1.0, 2.6, 0], fov: 52 }; break; }
    case 19: tp = null; cam = { pos: [0, 2, 5], look: [0, 1.5, 0], fov: 44 }; break;
  }
  if (n !== 18) R.light.material.opacity = 0;
  // flip tiles (18)
  R.flip.forEach((m, i) => { const a = S(18) + i * 3; const k = n === 18 ? X.smooth(sp(a, a + 6)) : 0; m.rotation.set(0, 0, k * Math.PI); m.material.color.set(k > 0.5 ? "#ffffff" : "#fff6fb"); m.visible = n === 18; });
  // ---- pose ----
  if (tp === "loop") { /* posed by loopPose */ }
  else { if (tp) T.pose(tp); else T.pose({ visible: false }); P.pose(pp); P.boardAt([board[0], board[1], board[2]], board[3], 0, 0, true); if (dVis) D.pose(dp); else D.pose({ visible: false }); if (dp.blink === undefined || !dp.blink) { D.eyes.forEach((e) => (e.scale.y = 1)); } }
  if (tp !== "loop") { R.screenLight.color.set(scrCol); R.screenLight.intensity = scrLight * 1.6; }
  // case
  if (caseOn && tp !== "loop") { let pos = casePos; if (!pos) { const m = handsMid(); pos = [m.x, m.y - 0.05 - (R.caseDrop || 0), m.z + 0.1]; } R.caseDrop = 0; R.case.set(pos, caseRot, caseOpen); } else if (tp !== "loop") R.case.set([0, -50, 0]);
  if (R.slipOn) { const m = handsMid(); const k = sp(S(5) + 34, S(5) + 54); R.case.slip.position.set(m.x + 0.1, m.y - 0.3 - k * 0.9, m.z + 0.3); R.case.slip.rotation.set(-1.2 + k, f * 0.2, 0.3); }
  if (mothAt && tp !== "loop") { if (mothAt === 1) { const m = handsMid(), k = R._mk; R.moth.at([m.x + 0.4 * k + 0.1 * Math.sin(f * 0.5), m.y + 0.1 + k * 1.2, m.z + 0.2 * Math.cos(f * 0.4)], f); } else R.moth.at(mothAt, f); } else if (tp !== "loop") R.moth.at([0, -50, 0], f);
  // controller
  if (tp !== "loop") { if (ctlAt === "hands" && tp) { const m = handsMid(); R.ctl.g.position.set(m.x, m.y - 0.02, m.z); R.ctl.g.rotation.set(0.5, (tp.yaw || 0), 0); } else if (ctlAt && ctlAt !== "hands") { R.ctl.g.position.set(...ctlAt); R.ctl.g.rotation.set(...ctlRot); } else R.ctl.g.position.y = -50; }
  // cup in Pixi's raised hand
  if (cupOn) { P.root.updateMatrixWorld(true); const c = wpos(P.elbows[0], [0, -0.45, 0.1]); R.cups[0].position.set(c.x, c.y - 0.12, c.z); }
  // Admin hand
  if (tp !== "loop") { if (handOn && hpose) { H.pose({ pos: hpose.pos, tap: hpose.tap }); H.g.rotation.set(...hpose.rot); } else if (handOn && R.limp) { R.limp.pos && (H.pose({ pos: R.limp.pos }), H.g.rotation.set(0, 0, R.limp.swing), H.palm.rotation.set(0.5, 0, 0), H.fingers.forEach((fg, i) => fg.rotation.set(0.6 + 0.1 * i, 0, 0))); } else H.pose({ visible: false }); }
  R.limp = null;
  // one finger at the screen (8)
  if (n === 8) { if (!R.finger) { R.finger = E.box(0.09, 0.09, 0.4, E.mat("#ffcf9e"), [0, -50, 0], { center: true }); } R.finger.position.set(...R.fingerAt); R.finger.rotation.set(0, Math.PI / 2, 0); } else if (R.finger) R.finger.position.y = -50;
  // screen
  R.scrL.set(JSON.stringify(scr), (g, w, h) => drawScreen(g, w, h, scr));
  // ---- HUD ----
  if (n !== 19 && n !== 14 && n !== 6 && n !== 8 && n !== 10 && n !== 17) OV.push(textO("NIGHT 10", 40, 60, 58, { align: "left", col: "#ffffff" }));
  if (chipOn && !(n === 14 && fs < 40)) OV.push(chip(unit, { prev, jump }));
  if (n === 10) OV.push((g, w, h) => { if (fs < 40) chip("13 MINUTES", { a: Math.min(1, fs / 6), big: 1 + 0.6 * (1 - X.smooth(sp(S(10) + 10, S(10) + 40))) })(g, w, h); });
  if (n === 19) OV.push(loading((f - S(19)) / FPS, "Wait for the patch."), chip(unit));
  const cur = C.seg(); if (cur && n !== 19) OV.push(subtitle(cur.text));
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  if (tp !== "loop") unclip([T, P], { gap: 0.2 });
  return { cam, light, dof, grade, actors: [], fx: [], caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
