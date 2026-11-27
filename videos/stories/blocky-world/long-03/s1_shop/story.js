// Long 3 · Scene 1 — Thanksgiving, 9 PM: everyone has one (17 shots)
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
import { solid, unclip } from "./common/staging.js";
import { adminHand } from "./common/props.js";
import { block, MACH } from "./common/block.js";
import { zubbit, mysteryBox, toastExtras, dinoExtras, person, clipZ, chair, knitBag, dog, pigeon, turkeyDonut, coin } from "./common/l3.js";
import { load, ctx, hud, subs, textO } from "./common/kit.js";
import { hero } from "./common/props.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, D = {};
const TP = [1.0, 0, -2.95], PIX = [2.6, 1.18, -1.8], WINZ = -5.0;
export async function build(E) {
  D = await load(meta);
  R.B = block(E); R.B.mach.visible = false; R.B.posterG.visible = false;
  R.T = solid(makeToast(E)); R.TX = toastExtras(E, R.T); R.P = makePixi(E); R.D = makeDonutsaurus(E); R.DX = dinoExtras(E, R.D);
  R.A = adminHand(E); R.G = hero(E, "gran"); R.chair = chair(E, null, [0, -50, 0], "#3f8ad8"); R.kbag = knitBag(E, null, [0, -50, 0]);
  R.dinner = turkeyDonut(E, null, [0.9, 1.2, -2.0]);
  R.walk = []; for (let i = 0; i < 9; i++) { const k = person(E, i + 3, { kid: i % 4 === 3, bagSide: -1 }); k.z = clipZ(E, k); R.walk.push(k); }
  R.dog = dog(E); R.pig = pigeon(E);
  R.q = [person(E, 20), person(E, 21, { kid: true })];
  R.coins = [coin(E, null, [0, -50, 0], 1.2), coin(E, null, [0, -50, 0], 1.2)];
  R.box = mysteryBox(E); R.zg = zubbit(E, "grey"); R.hzb = zubbit(E, "grey", { parent: R.TX.string }); R.hzb.position.set(0, 0, 0); R.hzb.visible = false;
}
export function frame(f0, E) {
  const C = ctx(f0, E, D), { X, n, fs, S, Eo, sp, pop, say, t } = C, f = f0, OV = [], FX = [];
  const { T, P, B, A, G, TX, DX } = R, Dn = R.D;
  let cam, light = ["interior", "night", 0.15], shk = null;
  // ---------------- defaults ----------------
  const clocks = ["9:00", "9:02", "9:04", "9:05", "9:06", "9:08", "9:08", "9:08", "9:10", "9:10", "9:10", "9:11", "9:12", "9:13", "9:15", "9:20", "9:24"];
  B.clock(clocks[n - 1] || "9:30", "PM");
  const machOn = n > 6 || (n === 6 && fs > 20), posterOn = n > 6 || (n === 6 && fs > 95), boardsOn = n > 9 || (n === 9 && fs > 10);
  B.mach.visible = machOn; B.posterG.visible = posterOn; B.tickG.visible = B.boardG.visible = n >= 9;
  B.mach.position.set(MACH[0], 0, MACH[2]); B.tickG.position.y = 0; B.boardG.position.y = 0; B.door.rotation.y = 0;
  B.disp(n >= 15 && fs > 70 || n > 15 ? "SAMPLE SOLD." : "$1", n >= 15 && fs > 70 || n > 15 ? "DROP AT MIDNIGHT." : "1 PER PERSON", n >= 15 && fs > 70 || n > 15 ? "#ff7f7f" : "#7fffd4");
  A.pose({ visible: false }); G.pose({ visible: false }); R.chair.position.y = -50; R.kbag.position.y = -50; R.q.forEach((k) => k.pose({ visible: false }));
  R.walk.forEach((k) => k.pose({ visible: false })); R.dog.position.y = -50; R.pig.position.y = -50; R.coins.forEach((c) => (c.position.y = -50)); R.box.position.y = -50; R.zg.position.y = -50;
  TX.stache.visible = false; TX.coinEyes(false); R.hzb.visible = n >= 15 || (n === 14 && fs > 60);
  let tp = { pos: TP, yaw: 0.1, face: say("toast", "happy"), armR: [-0.7, 0.1], elbowR: 0.9 };
  let pp = { pos: PIX, yaw: 0.2, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [-0.9, 0.2], elbowL: 0.6, armR: [-0.9, -0.2], elbowR: 0.6, face: say("pixi", "deadpan"), head: [0.4, 0, 0] };
  let dp = { visible: false };
  // Pixi's two coins: flip from her hands, catch (also used for the ding timing in make_sound)
  const coinsOn = n <= 2 || n === 13 || n === 16; const flipT = (k) => { const ph = ((f + k * 22) % 44) / 44; return ph; };
  if (coinsOn) R.coins.forEach((c, k) => { const ph = flipT(k); c.position.set(PIX[0] + (k ? 0.18 : -0.18), PIX[1] + 1.1 + 0.9 * Math.sin(Math.PI * ph), PIX[2] + 0.45); c.rotation.set(ph * 12, 0, 0); });
  // walkers outside: 9 people L->R, then the dog
  const walkOut = (k, i, t0, dur = 70) => { const u = sp(t0, t0 + dur); if (u <= 0 || u >= 1) { k.pose({ visible: false }); return null; } const x = X.lerp(-1.6, 6.2, u), sw = Math.sin(f * 0.45 + i); k.pose({ pos: [x, 0, -7.0 + (i % 2) * 0.5], yaw: Math.PI / 2, legL: 0.5 * sw, legR: -0.5 * sw, armL: [-0.4 * sw, 0.1], armR: [0.4 * sw, 0.1], face: "happy", head: [0, -0.5, 0] }); k.root.scale.setScalar(k.base); return x; };
  let zcount = 0;
  if (n === 3) { R.walk.forEach((k, i) => { const t0 = S(3) + 6 + i * 16; walkOut(k, i, t0); if (f >= t0 + 35) zcount = i + 1; }); }
  if (n === 3 || n === 4) { const t0 = S(3) + 6 + 9 * 16 + 4, u = sp(t0, t0 + 50); if (u > 0 && u < 1) { R.dog.position.set(X.lerp(-1.4, 6, u), 0, -6.8); R.dog.rotation.y = 0; R.dog.userData.legs.forEach((l, j) => (l.rotation.z = 0.5 * Math.sin(f * 0.8 + j * 1.6))); } if (f >= t0 + 25) zcount = 10; }
  if (n === 4 && fs >= 8) zcount = 11;
  // ---------------- shots ----------------
  switch (n) {
    case 1: cam = { pos: [0.6, 2.7, 8.0], look: [1.4, 1.9, -2.5], fov: 50 }; tp.face = "happy"; break;
    case 2: cam = { pos: [0.3, 2.1, 1.7], look: [1.3, 1.85, -2.6], fov: 42 }; tp = { ...tp, yaw: 0.2, armR: [-1.3, 0.2], elbowR: 0.9, head: [0.1, 0, 0.08] }; break;
    case 3: { tp = { pos: [2.2, 0, -4.2], yaw: Math.PI, face: "happy", head: [0, -0.35 + 0.7 * ((fs % 16) / 16), 0] }; cam = { pos: [1.1, 2.3, -1.9], look: [2.5, 1.6, -6.5], fov: 50 }; dp = { visible: false }; break; }
    case 4: { // outside: pigeon lands on the sill, Toast's face slams flat on the glass
      const k = pop(S(4) + 2, 6); R.pig.position.set(1.4, WIN_SILL(), -5.42 - 0 * k); R.pig.position.y = X.lerp(2.2, 0.95, Math.min(1, sp(S(4), S(4) + 8))); R.pig.rotation.y = Math.PI / 2 + 0.6; R.pig.position.x = 1.75; R.pig.scale.setScalar(1.6);
      const slam = X.easeIn(sp(S(4) + 14, S(4) + 20)); tp = { pos: [2.4, 0, X.lerp(-4.0, -4.62, slam)], yaw: Math.PI, face: say("toast", "sad"), lean: 0.1, armL: [-2.6, 0.3], elbowL: 0.4, armR: [-2.6, -0.3], elbowR: 0.4 };
      cam = { pos: [2.3, 1.85, -8.2], look: [2.3, 1.95, -5.0], fov: 38 }; light = ["interior", "night", 0.45]; break; }
    case 5: { const up = X.spring(sp(S(5) + 4, S(5) + 22)), stopT = C.seg("toast", 2)[0] + 30; const wag = f < stopT ? Math.sin(f * 0.9) : 0;
      tp = { pos: [1.6, 0, -4.0], yaw: 0.5, face: say("toast", f > C.seg("toast", 2)[0] ? "deadpan" : "sad"), armL: [-0.3, 0.1] };
      dp = { pos: [4.0, X.lerp(-2.6, 0, up), -3.2], yaw: -0.6, jaw: 0.5, look: [-0.6, 0.1], tailY: 0.9 * wag, head: [0, 0.3, 0] };
      pp = { ...pp, head: [0.1, -0.3, 0], face: say("pixi", "deadpan") };
      cam = { pos: [0.6, 2.4, 4.4], look: [2.4, 1.7, -3.0], fov: 46 }; break; }
    case 6: { // the Admin's hand sets the machine by the door, then hangs the poster
      const dn = X.smooth(sp(S(6), S(6) + 40)), up2 = X.smooth(sp(S(6) + 46, S(6) + 70)), post = X.smooth(sp(S(6) + 72, S(6) + 96)), up3 = X.smooth(sp(S(6) + 100, S(6) + 125));
      const my = X.lerp(6.5, 0, dn); B.mach.visible = true; B.mach.position.y = my;
      if (f < S(6) + 72) A.pose({ pos: [MACH[0], my + 2.6 + 0.95 + up2 * 4, MACH[2]], palmUp: 0 });
      else { A.pose({ pos: [MACH[0], X.lerp(8, 4.9, post) + up3 * 4, -4.2], palmUp: 0 }); B.posterG.visible = true; B.posterG.position.y = X.lerp(3.0, 0, post); }
      if (f >= S(6) + 40 && f < S(6) + 48) shk = [S(6) + 40, 0.05, 8];
      tp = { ...tp, pos: [2.0, 0, -3.4], yaw: 0.9, face: "shock", head: [-0.4, 0.4, 0] };
      cam = { pos: [1.6, 2.6, 4.2], look: [5.0, 2.6, -3.6], fov: 54 }; break; }
    case 7: cam = { pos: [MACH[0], 0.48, -2.85], look: [MACH[0], 0.44, -3.86], fov: 40 }; break;
    case 8: cam = { pos: [MACH[0], 3.75, -3.35], look: [MACH[0], 3.75, -4.95], fov: 48 }; break;
    case 9: { const k = X.smooth(sp(S(9), S(9) + 30)), k2 = X.smooth(sp(S(9) + 30, S(9) + 60)); B.tickG.position.y = X.lerp(3, 0, k); B.boardG.position.y = X.lerp(3, 0, k2);
      A.pose({ pos: [k2 > 0 ? R.B.boardPos[0] : R.B.tickerPos[0], 5.7 + (k2 > 0 ? B.boardG.position.y : B.tickG.position.y) + (k2 >= 1 ? sp(S(9) + 60, S(9) + 80) * 4 : 0), -4.6] });
      tp = { ...tp, pos: [1.6, 0, -3.0], yaw: 0.1, face: "shock", head: [-0.55, 0, 0] };
      cam = { pos: [2.6, 2.4, 4.0], look: [2.8, 3.4, -4.8], fov: 52 }; break; }
    case 10: cam = { pos: [B.tickerPos[0], 4.25, -2.5], look: [B.tickerPos[0], 4.25, -4.93], fov: 42 }; break;
    case 11: cam = { pos: [B.boardPos[0], 4.35, -2.75], look: [B.boardPos[0], 4.35, -4.93], fov: 42 }; break;
    case 12: { // eyes go from one 9,999 to the other; CRASH; coins in the pupils
      const cr = X.back(sp(S(12) + 18, S(12) + 24)), ep = X.spring(sp(S(12) + 18, S(12) + 32)); const hy = T.dims.H - T.dims.HH / 2;
      tp = { ...tp, pos: [1.6, 0, -3.0], yaw: 0.1, head: [-0.3, fs < 18 ? 0.35 * Math.sin(fs * 0.35) : 0, 0], face: fs < 18 ? "shock" : say("toast", "grin"), eyePop: fs >= 18 ? 0.6 + 0.5 * ep : 0, headScale: fs >= 18 ? 1.1 : 1 };
      if (fs >= 18) TX.coinEyes(true);
      cam = { pos: [1.65, X.lerp(2.1, hy + 0.05, cr), X.lerp(1.6, -0.2, cr)], look: [1.6, X.lerp(1.8, hy, cr), -3.0], fov: 44 }; if (fs >= 18 && fs < 26) shk = [S(12) + 18, 0.05, 8]; break; }
    case 13: case 14: case 15: { // at the machine
      let stache = false;
      tp = { pos: [6.0, 0, -3.3], yaw: 0.35, face: say("toast", "smug"), armR: [-1.2, 0.7], elbowR: 0.3 };
      if (n === 13) { const ins = S(13) + 40, drop = ins + 14; if (f < ins) tp.armR = [-1.3, 0.8]; R.box.position.set(MACH[0], f < drop ? -50 : 0.95, MACH[2] + 0.66); if (f >= drop + 14) { tp = { ...tp, yaw: 0.35, armL: [-2.4, 0.5], elbowL: 1.7, head: [0, 0, 0.35], face: say("toast", "grin") }; R.box.position.set(-50, -50, 0); } }
      if (n === 14) { const op = S(14) + 26; tp = { ...tp, yaw: 0.35, armR: [-1.2, 0.1], elbowR: 0.6, armL: [-1.2, -0.1], elbowL: 0.6, face: fs < 30 ? "grin" : fs < 50 ? "shock" : say("toast", "deadpan") }; if (fs > 60) tp.armL = [-0.6, 0.2]; }
      if (n === 15) { stache = fs < 70; tp = { ...tp, yaw: 0.35, face: say("toast", "smug"), armR: [-0.3, 0.1], elbowR: 0.2 };
        const fl = X.smooth(sp(S(15) + 40, S(15) + 60)), up = X.smooth(sp(S(15) + 75, S(15) + 100)); T.root.updateMatrixWorld(true); const hp = new THREE.Vector3(); T.head.getWorldPosition(hp);
        A.pose({ pos: [hp.x + 0.6 * (1 - fl) - 0.2, hp.y + 1.3 + 3 * (1 - fl) + up * 4, hp.z + 0.5], rotY: 0.4 });
        if (f >= S(15) + 66 && f < S(15) + 84) { const k = sp(S(15) + 66, S(15) + 84); TX.stache.visible = true; TX.stache.position.set(-0.8 * k, 0.27 + 0.6 * Math.sin(Math.PI * k), T.dims.HD / 2 + 0.03 + 0.5 * k); TX.stache.rotation.z = k * 6; } else TX.stache.position.set(0, 0.27, T.dims.HD / 2 + 0.03); }
      TX.stache.visible = TX.stache.visible || stache;
      cam = n === 13 ? { pos: [4.0, 2.1, 1.4], look: [6.3, 1.5, -3.4], fov: 46 } : { pos: [4.6, 2.05, 0.4], look: [6.2, 1.7, -3.3], fov: 42 };
      if (n === 13) pp = { ...pp, head: [0.5, 0, 0] };
      break; }
    case 16: { const k = X.smooth(sp(S(16), S(16) + 50));
      G.pose({ pos: [4.1, 0, -6.1], yaw: -0.4, face: "smug", armL: [-1.0, 0.2], armR: [-1.0, -0.2] }); G.root.scale.setScalar(0.78); R.chair.position.set(4.2, 0, -6.4); R.chair.rotation.y = -0.4; R.chair.scale.set(1, k, 1); R.kbag.position.set(4.7, 0, -6.2);
      R.q.forEach((q, i) => { const u = sp(S(16) + 30 + i * 18, S(16) + 70 + i * 18); q.pose({ pos: [X.lerp(-1.5, 3.0 - i * 1.1, u), 0, -6.4], yaw: u < 1 ? Math.PI / 2 : Math.PI * 0.6, face: "happy", legL: u < 1 ? 0.5 * Math.sin(f * 0.45) : 0, legR: u < 1 ? -0.5 * Math.sin(f * 0.45) : 0 }); q.root.scale.setScalar(q.base); });
      tp = { ...tp, pos: [1.2, 0, -2.95], yaw: 0.5, face: say("toast", "smug") }; pp = { ...pp, face: say("pixi", "deadpan"), head: [0.35, -0.3, 0] };
      cam = { pos: [0.2, 2.1, 3.6], look: [2.2, 1.6, -4.0], fov: 46 }; break; }
    case 17: { G.pose({ pos: [4.1, 0.0, -6.1], yaw: 0, face: "smug", armL: [-1.0, 0.2], elbowL: 1.0, armR: [-1.0, -0.2], elbowR: 1.0 }); G.root.scale.setScalar(0.78); G.root.position.y = 0.4; R.chair.position.set(4.2, 0, -6.4); R.chair.rotation.y = Math.PI; R.chair.scale.set(1, 1, 1); R.kbag.position.set(4.7, 0, -6.2);
      R.q.forEach((q, i) => { q.pose({ pos: [3.0 - i * 1.1, 0, -6.4], yaw: Math.PI / 2, face: "happy" }); q.root.scale.setScalar(q.base); });
      tp = { pos: [2.0, 0, -4.55], yaw: Math.PI, face: say("toast", "grin"), armL: [-2.0, 0.4], elbowL: 0.8, armR: [-2.0, -0.4], elbowR: 0.8 };
      cam = { pos: [-0.6, 1.9, -11.0], look: [2.6, 1.7, -5.2], fov: 42 }; light = ["interior", "night", 0.45]; break; }
  }
  // Donutsaurus sleeps behind the counter end after shot 5 (visible in wides)
  if (n >= 6 && ![7, 8, 10, 11, 13, 14, 15].includes(n)) dp = { pos: [4.2, 0, -3.0], yaw: -0.5, look: [-0.5, 0.2], tailY: 0.2 * Math.sin(f * 0.1), head: [0.2, 0, 0] };
  // ---------------- pose ----------------
  T.pose(tp); P.pose(pp); P.boardAt([PIX[0] - 0.7, 1.2, PIX[2] - 0.1], 0.3, 0, 0, true);
  if (dp.visible === false) Dn.pose({ visible: false }); else Dn.pose(dp);
  // box held up to his ear (13) / opened (14)
  if (n === 13 && f >= S(13) + 68) { T.root.updateMatrixWorld(true); const v = new THREE.Vector3(); T.elbows[0].getWorldPosition(v); R.box.position.set(v.x, v.y - 0.4, v.z); R.box.rotation.set(0, 0.5, 0); R.box.userData.lid.rotation.x = 0; }
  if (n === 14) { T.root.updateMatrixWorld(true); const a = new THREE.Vector3(), b = new THREE.Vector3(); T.elbows[0].getWorldPosition(a); T.elbows[1].getWorldPosition(b); const m = a.add(b).multiplyScalar(0.5); const op = fs >= 26;
    if (fs < 60) { R.box.position.set(m.x, m.y - 0.45, m.z + 0.25); R.box.rotation.set(0, 0.5, 0); R.box.userData.lid.rotation.x = op ? -2.2 : 0; if (op) { R.zg.position.set(m.x, m.y - 0.1 + 0.25 * X.back(sp(S(14) + 26, S(14) + 36)), m.z + 0.25); R.zg.rotation.set(0, 0.5, 0); R.zg.scale.setScalar(1.2); } } }
  unclip([T], {});
  // ---------------- HUD ----------------
  const money = n > 13 || (n === 13 && fs > 42) ? 7 : 8, gold = n >= 10 ? "$9,999" : null;
  const showHud = ![7, 8, 10, 11].includes(n);
  const rc = n === 14 ? sp(S(14) + 56, S(14) + 62) * (1 - sp(Eo(14) - 6, Eo(14))) : 0;
  if (showHud) OV.push(hud({ money, gold, clock: clocks[n - 1] + " PM", receipt: "PAID $1 · WORTH $1", ra: rc, moneyPop: n === 13 && fs > 42 && fs < 52 ? 1 + 0.2 * Math.sin((fs - 42) * 0.6) : 1 }));
  if (n === 3 || n === 4) { const last = zcount; OV.push(textO(`ZUBBITS: ${zcount}`, 960, 70, 70, { col: "#ffe14a" })); }
  const sb = subs(D.SEG, t); if (sb) OV.push(sb);
  if (shk) { const q = E.shake(f0, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
const WIN_SILL = () => 0.95;
