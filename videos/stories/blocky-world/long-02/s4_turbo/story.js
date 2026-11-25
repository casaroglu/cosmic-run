// Long 2 · Scene 4 — Turbo City (37 shots). Built from scripts/LONG-02_shot-script.md
import * as THREE from "three";
import { makeToast, makePixi, makeDonutsaurus, blocky } from "./blocky/rig.js";
import { car, controller } from "./common/props.js";
import { turboCity } from "./common/worlds.js";
import { textO, subtitle, battery, loading2, turboHud, guestTag, pauseMenu, confirmBox, INK, F } from "./common/ui.js";
export const meta = { fps: 30, w: 1920, h: 1080, captions: false, tail: 0 };
let R = {}, SH = [], SEG = [];
const FPS = 30, X0 = 400;
const LANES = [-3.75, -2.25, -0.75, 0.75, 2.25, 3.75];
const card = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
export async function build(E) {
  try { const tl = await (await fetch("../work/timeline.json?v=" + Date.now())).json(); SH = tl.shots; meta.frames = Math.ceil(tl.total * 30); } catch (e) {}
  try { SEG = await (await fetch("../work/segments.json?v=" + Date.now())).json(); } catch (e) {}
  R.w = turboCity(E, X0, 0);
  R.T = makeToast(E); R.P = makePixi(E); R.D = makeDonutsaurus(E);
  const cols = ["#ff4d4d", "#19e0c6", "#ffe14a", "#4d9bff", "#9b4dff", "#ffffff", "#ff8a1f", "#57c84d"];
  R.cars = []; for (let i = 0; i < 12; i++) R.cars.push(car(E, cols[i % 8], i));
  R.taxi = car(E, "#ffd23a", 99); const meter = card(256, 96, (g, w, h) => { g.fillStyle = "#111"; g.fillRect(0, 0, w, h); g.font = "900 60px sans-serif"; g.fillStyle = "#39ff6a"; g.textAlign = "center"; g.fillText("$4.50", w / 2, 70); }); E.box(1.0, 0.35, 0.4, E.mat("#ffe14a"), [0, 1.15, -0.2], { parent: R.taxi }); E.plane(0.9, 0.3, E.flat("#ffffff", { map: meter }), [0, 1.33, 0.01], { parent: R.taxi, noink: true });
  // near pavement props: zebra + sign, hot-dog stand + vendor, 11 bikes, policeman
  for (let i = 0; i < 7; i++) E.box(0.5, 0.012, 3.0, E.flat("#ffffff"), [X0 - 6 + (i - 3) * 0.8, 0.013, 5.2], { noShadow: true, center: true });
  const sign = card(512, 160, (g, w, h) => { g.fillStyle = "#2f5fb0"; g.fillRect(0, 0, w, h); g.font = "900 64px sans-serif"; g.fillStyle = "#fff"; g.textAlign = "center"; g.fillText("CROSS HERE →", w / 2, 100); });
  E.cyl(0.05, 0.05, 2.4, E.mat("#9aa3b2"), [X0 - 7.4, 0.25, 7], { seg: 6 }); E.plane(1.5, 0.47, E.mat("#ffffff", { map: sign }), [X0 - 7.4, 2.5, 7.06], { noShadow: true });
  R.stand = E.group(null, [X0 - 3, 0.25, 7.2]); E.box(1.6, 1.0, 0.8, E.mat("#d8d4cc"), [0, 0, 0], { parent: R.stand }); E.cyl(0.04, 0.04, 1.4, E.mat("#9aa3b2"), [0, 1.0, 0], { parent: R.stand, seg: 6 }); E.cone(1.0, 0.5, E.mat("#ff4d4d"), [0, 2.3, 0], { parent: R.stand }); for (let i = 0; i < 4; i++) E.box(0.4, 0.1, 0.12, E.mat("#c0603a"), [-0.5 + i * 0.33, 1.02, 0], { parent: R.stand }); for (const s of [-1, 1]) E.cyl(0.25, 0.25, 0.1, E.mat("#222"), [s * 0.7, 0, 0.42], { parent: R.stand, rot: [Math.PI / 2, 0, 0], center: true, seg: 10 });
  R.vendor = blocky(E, { skin: "#c98d62", shirt: "#ffffff", pants: "#2c3042", shoe: "#151515", face: { skin: "#c98d62", iris: "#222", brow: "#222" } });
  R.cop = blocky(E, { skin: "#ffcf9e", shirt: "#1e3a8a", pants: "#1e2a5a", shoe: "#111", face: { skin: "#ffcf9e", iris: "#222", brow: "#3a2a1a" }, build: (P, E, M) => { P.hat = E.group(P.head, [0, P.dims.HH, 0]); E.box(1.0, 0.12, 1.0, M("#111"), [0, 0, 0.05], { parent: P.hat }); E.box(0.8, 0.3, 0.8, M("#1e3a8a"), [0, 0.1, 0], { parent: P.hat }); } });
  R.bikes = []; for (let i = 0; i < 11; i++) { const g = E.group(null, [X0 + 1 + i * 0.5, 0.25, 6.4]); E.box(0.18, 0.5, 1.4, E.mat("#1e3a8a"), [0, 0.35, 0], { parent: g }); E.box(0.2, 0.15, 0.4, E.mat("#ffffff"), [0, 0.85, 0.4], { parent: g }); for (const z of [-0.55, 0.55]) E.cyl(0.32, 0.32, 0.12, E.mat("#111"), [0, 0.32, z], { parent: g, rot: [0, 0, Math.PI / 2], center: true, seg: 10 }); R.bikes.push(g); }
  R.pigeon = E.group(null, [X0 - 1.6, 0.25, 6.8]); E.box(0.25, 0.2, 0.35, E.mat("#8a8f99"), [0, 0, 0], { parent: R.pigeon }); E.box(0.15, 0.15, 0.15, E.mat("#6a6f7a"), [0, 0.2, 0.15], { parent: R.pigeon });
  // far corner: convertible + two silhouettes + explosion
  R.corner = E.group(null, [X0 + 14, 0, -9]); const conv = car(E, "#d8344a", 50); R.corner.add(conv); conv.rotation.y = 0.4;
  R.sil = [0, 1].map((i) => { const p = blocky(E, { skin: "#111", shirt: "#111", pants: "#111", shoe: "#111", face: { skin: "#111" } }); p.root.traverse((o) => { if (o.isMesh) o.material = E.flat("#140f1c"); }); p.faceMesh.visible = false; p.face = () => {}; E.box(0.8, 0.12, 0.05, E.flat("#ffd27a"), [0, 0.55, p.dims.HD / 2 + 0.03], { parent: p.head, noShadow: true }); return p; });
  R.boom = E.sphere(1, E.flat("#ffb84d", { transparent: true, opacity: 0, fog: false }), [X0 + 16, 4, -14]); R.boom.userData.noink = true;
  // helicopter + spotlight, tank
  R.heli = E.group(null, [X0, 14, -2]); E.box(2.4, 1.2, 4.0, E.mat("#2a2f45"), [0, 0, 0], { parent: R.heli }); R.blade = E.box(7, 0.05, 0.3, E.mat("#111"), [0, 1.3, 0], { parent: R.heli });
  R.spot = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.02, 32), new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.35 })); R.spot.userData.noink = true; E.scene.add(R.spot); R.spot.visible = false;
  R.tank = E.group(null, [X0 + 18, 0, -5]); E.box(3.2, 1.2, 5, E.mat("#4a5a3a"), [0, 0.3, 0], { parent: R.tank }); E.box(2.0, 0.9, 2.2, E.mat("#5a6a4a"), [0, 1.5, 0], { parent: R.tank }); R.barrel = E.box(0.25, 0.25, 3.2, E.mat("#3a4a2a"), [0, 1.95, 2.6], { parent: R.tank, center: true }); R.ind = E.box(0.3, 0.2, 0.1, E.flat("#ff8a1f"), [1.5, 1.0, 2.52], { parent: R.tank, noShadow: true });
  const flag = card(128, 80, (g, w, h) => { g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.font = "900 54px sans-serif"; g.fillStyle = "#d8262e"; g.textAlign = "center"; g.fillText("HI", w / 2, 60); }); E.plane(0.6, 0.38, E.flat("#ffffff", { map: flag }), [0.35, 2.2, 4.1], { parent: R.tank, noink: true });
  R.ctl = controller(E, null, [0, -50, 0], 0.5);
}
export function frame(f, E) {
  const X = E.X, t = f / FPS, OV = [], FX = [], { T, P, D } = R;
  const S = (n) => Math.round((SH[n - 1] ? SH[n - 1].s : 0) * FPS), Eo = (n) => Math.round((SH[n - 1] ? SH[n - 1].e : 0) * FPS);
  let n = 1; while (n < SH.length && f >= S(n + 1)) n++;
  const fs = f - S(n), sp = (a, b) => X.span(f, a, b), pop = (a, k = 8) => (f < a ? 0 : X.back(X.span(f, a, a + k)));
  const amp = (who) => { for (const w of E.words) if (w.sp === who && t >= w.s && t <= w.e) return 0.35 + 0.65 * Math.abs(Math.sin((t - w.s) * 22)); return 0; };
  const say = (who, base) => (amp(who) > 0.55 ? ({ happy: "grin", deadpan: "talk", smug: "talk", grin: "grin", scared: "scared", shock: "shock", sad: "talk", angry: "angry" }[base] || "talk") : base);
  // ---- freeze: from 26 to the press in 35 everything except our three is held at the freeze frame ----
  const FRZ = S(26), frozen = n >= 26 && n <= 35 || (n === 36 && f < S(36) + 10); const tw = frozen ? FRZ : f;   // world time
  const bigHead = (n === 31) || (n === 32 && fs < 50);
  // ---- traffic ----
  const trafficOn = n <= 25 && n !== 4 || frozen;
  R.cars.forEach((c, i) => { const lane = LANES[i % 6], dir = lane < 0 ? -1 : 1, speed = 22, per = 60, off = (i * 37) % per; let x = X0 + dir * (((tw * speed / FPS + off) % per) - per / 2);
    c.visible = trafficOn; c.position.set(x, 0, lane); c.rotation.set(0, dir > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
    if (i === 2 && Math.abs(x - X0) < 3) c.position.y = Math.max(0, 1.6 * Math.cos((x - X0) / 3 * Math.PI / 2)); });
  if (frozen) { R.cars[2].visible = true; R.cars[2].position.set(X0 + 0.4, 1.6, -0.75); }
  // ---- defaults ----
  let cam, light = ["golden", "day", 0.4], shk = null, grade = null, alarm = 0, label = null, cash = 0, bat = 0;
  alarm = n >= 9 ? 1 : 0; if (n >= 10) alarm = 2; if (n >= 11 && f > S(11) + 80) alarm = 3; if (n >= 12) alarm = 4; if (n >= 13) alarm = 5; if (n >= 36) alarm = 5;
  label = n === 9 ? "JAYWALKING" : n === 10 ? "SNACK THEFT" : n === 11 ? "DOMINOES" : n === 12 ? "BEING NOTICED" : n === 13 ? "STILL HERE" : null; cash = n >= 7 && f > S(7) + 50 ? -4.5 : 0; bat = n >= 24 ? 1 : 0;
  let tp = { pos: [X0 - 0.8, 0, 0], yaw: 0, face: "shock" }, pp = { pos: [X0 + 0.8, 0, 0], yaw: 0, face: say("pixi", "deadpan") }, dp = { pos: [X0, 0, -0.3], yaw: 0.3, tailY: 0 };
  let vendorOn = true, standOn = n < 10 || (n === 10 && fs < 40), copPose = { pos: [X0 + 3.6, 0.25, 8.6], yaw: -0.8 }, heli = n >= 12 && n <= 35, spot = n >= 12 && n <= 35, tankX = n >= 13 ? X0 + 9 - 3 * sp(S(13) + 30, Eo(13)) : X0 + 30, taxiOn = false, menu = null, sel = -1, conf = 0;
  R.bikes.forEach((b, i) => { const a = S(11) + 20 + i * 6; const k = n >= 11 ? X.easeIn(sp(a, a + 6)) * (n > 11 || f >= a ? 1 : 0) : 0; b.rotation.set(0, 0, -1.4 * k); });
  // ---- shots ----
  switch (n) {
    case 1: { const k = X.easeIn(sp(S(1) + 4, S(1) + 18)); const y = 8 * (1 - k); tp.pos[1] = pp.pos[1] = dp.pos[1] = Math.max(0, y); cam = { pos: [X0, 4, 15], look: [X0, 1.6, 0], fov: 52 }; break; }
    case 2: { const spin = Math.floor(fs / 26) * Math.PI; tp = { pos: [X0 - 0.8, 0, 0], yaw: spin, face: say("toast", "shock"), armL: [0, 0.8], armR: [0, 0.8] }; if (P.tail) P.tail.rotation.set(0, 0.6 * Math.sin(f * 0.5), 0); cam = { pos: [X0, 1.9, 5.4], look: [X0, 1.5, 0], fov: 48 }; break; }
    case 3: cam = { pos: [X0, 18, 0.1], look: [X0, 0, 0], fov: 60 }; dp = { pos: [X0, 0, 0.3], yaw: 0, tailY: 0 }; break;
    case 4: { cam = { pos: [X0 + 10, 2.0, -3], look: [X0 + 14, 1.6, -9], fov: 22 }; light = ["golden", "day", 0.1]; R.boom.material.opacity = Math.max(0, 0.9 - fs / 60) * (fs > 20 ? 1 : 0); R.boom.scale.setScalar(1 + fs * 0.08);
      OV.push((g, w, h) => { R.sil.forEach((p) => { const v = p.root.position.clone().add(new THREE.Vector3(0, 3.0, 0)).project(E.camera); textO("▼ MAIN CHARACTER", ((v.x + 1) / 2) * 1920, ((1 - v.y) / 2) * 1080, 36, { col: "#ffe14a" })(g, w, h); }); }); break; }
    case 5: tp = { ...tp, armR: [-2.4, 0.3], elbowR: 1.6, face: say("toast", "happy") }; cam = { pos: [X0, 1.9, 5.4], look: [X0, 1.5, 0], fov: 48 }; break;
    case 6: { const hit = S(6) + 60; tp = f < hit ? { ...tp, armL: [-2.8, 0.5], armR: [-2.8, 0.5], face: say("toast", "grin"), yaw: -0.5 } : { pos: [X0 - 0.8 + (f - hit) * 0.6, 0.6, 0.6], yaw: 1.5, pitch: 0.6, face: "dizzy" }; cam = { pos: [X0, 1.9, 5.4], look: [X0, 1.5, 0], fov: 48 }; if (f >= hit && f < hit + 14) OV.push(textO("DOOR", 1300, 400, 120, { col: "#ffffff", s: pop(hit, 5) })); break; }
    case 7: { const k = sp(S(7) + 10, Eo(7)); tp = { pos: [X0 - 8 + 7 * k, 1.35, 1.5], yaw: Math.PI / 2, legL: -1.5, kneeL: 1.6, legR: -1.5, kneeR: 1.6, armL: [-0.75, 0.7], elbowL: 1.9, armR: [-0.75, 0.7], elbowR: 1.9, face: "smug" }; taxiOn = true; R.taxi.position.set(tp.pos[0], 0, 1.5); R.taxi.rotation.y = Math.PI / 2; pp = { ...pp, head: [0, 0.8 - 1.6 * sp(S(7), S(7) + 40), 0] }; cam = { pos: [X0, 3.0, 11], look: [X0 - 0.5, 1.4, 0], fov: 50 }; break; }
    case 8: { taxiOn = true; R.taxi.position.set(X0 - 3.5, 0, 3.75); R.taxi.rotation.y = Math.PI / 2; const k = sp(S(8) + 20, S(8) + 40); tp = { pos: [X0 - 4, X.lerp(1.35, 0.25, k), X.lerp(3.75, 5.6, k)], yaw: 0.4, face: "smug" }; cam = { pos: [X0 - 3.6, 2.0, 11], look: [X0 - 5, 1.6, 5.6], fov: 46 }; break; }
    case 9: tp = { pos: [X0 - 4, 0.25, 5.6], yaw: 0.4, face: "shock" }; cam = { pos: [X0 - 3.6, 2.0, 11], look: [X0 - 5, 1.6, 5.6], fov: 46 }; break;
    case 10: { const k = sp(S(10), S(10) + 30); pp = { pos: [X0 - 6, 0.25, X.lerp(0, 6.6, k)], yaw: 0, legL: 0.5 * Math.sin(f * 0.5), legR: -0.5 * Math.sin(f * 0.5), face: "deadpan" }; dp = { pos: [X.lerp(X0 - 6.6, X0 - 3.8, sp(S(10) + 10, S(10) + 36)), 0.25, X.lerp(0, 6.2, k)], yaw: 1.2, jaw: f > S(10) + 36 && f < S(10) + 70 ? 1 : 0.2 }; tp = { pos: [X0 - 4, 0.25, 5.6], yaw: 0.4, face: "shock" }; cam = { pos: [X0 - 4.4, 2.2, 12], look: [X0 - 4.4, 1.4, 6], fov: 50 }; break; }
    case 11: { const k = sp(S(11), S(11) + 18); tp = { pos: [X.lerp(X0 - 1.5, X0 + 0.4, k), 0.25, 5.8], yaw: 0.2, armR: f > S(11) + 18 && f < S(11) + 30 ? [-1.2, 0.2] : [0, 0.3], face: say("toast", "happy") }; cam = { pos: [X0 + 1.5, 2.0, 11.5], look: [X0 + 2.8, 1.0, 6.4], fov: 48 }; copPose = { pos: [X0 - 0.6, 0.25, 7.4], yaw: 0.6 }; break; }
    case 12: cam = { pos: [X0 - 2, 0.6, 9], look: [X0, 10, -2], fov: 64 }; tp = { pos: [X0 - 0.6, 0.25, 6.2], yaw: 0, face: "shock" }; pp = { pos: [X0 + 0.6, 0.25, 6.2], yaw: 0, face: "deadpan" }; dp = { pos: [X0, 0.25, 5.4], yaw: 0 }; break;
    case 13: tp = { pos: [X0 - 0.6, 0.25, 6.2], yaw: -0.4, armL: [-2.8, 0.6], armR: [-2.8, 0.6], face: say("toast", "scared") }; pp = { pos: [X0 + 0.6, 0.25, 6.2], yaw: 0, face: "deadpan" }; dp = { pos: [X0, 0.25, 5.4], yaw: 0 }; cam = { pos: [X0 + 2, 3.4, 15], look: [X0 + 4, 1.6, 0], fov: 52 }; break;
    case 14: tp = { pos: [X0 - 0.6, 0.25, 6.2], yaw: 0, face: "scared" }; pp = { pos: [X0 + 0.6, 0.25, 6.2], yaw: 0, face: "deadpan" }; dp = { pos: [X0, 0.25, 5.4], yaw: 0 }; cam = { pos: [X0, 16, 6.3], look: [X0, 0, 6.2], fov: 60 }; tankX = X0 + 5; break;
    case 15: case 16: case 17: case 18: case 19: case 20: case 21: case 22: case 23: case 24: case 25: {
      tp = { pos: [X0 - 0.6, 0.25, 6.2], yaw: 0.3, face: "shock" }; pp = { pos: [X0 + 0.6, 0.25, 6.2], yaw: -0.3, face: say("pixi", "deadpan") }; dp = { pos: [X0 + 0.1, 0.25, 5.2], yaw: 0.3 }; tankX = X0 + 5; cam = { pos: [X0, 1.9, 11.0], look: [X0, 1.5, 6.0], fov: 44 };
      if (n === 15) { cam = { pos: [X0 + 0.9, 1.9, 10.4], look: [X0 + 0.6, 1.6, 5.8], fov: 40 }; }
      if (n === 16) tp = { ...tp, armL: [-2.8, 0.3], armR: [-2.8, -0.3], elbowL: 0.2, elbowR: 0.2, face: "grin", head: fs > 50 ? [0.6, 0, 0] : [0, 0, 0] };
      if (n === 18) tp = { ...tp, armR: [-1.3, -0.2], elbowR: 0.6, face: say("toast", "scared") };
      if (n === 19) { tp = { ...tp, yaw: 1.0, head: [0, 0.6, 0] }; pp = { ...pp, yaw: 0.6 }; FX.push({ kind: "sparkle", pos: [X0 + 0.1, 1.4, 6.0], size: 0.5, t: f / 30 }); }
      if (n === 20) pp = { ...pp, armR: [-1.4, 0.6], elbowR: 0.1, yaw: -0.2 };
      if (n === 21) { tp = { pos: [X0 + 0.2, 0.25, 4.0], yaw: Math.PI * 0.9, armR: [-1.4, 0.2], face: fs > 48 ? "shock" : "grin" }; cam = { pos: [X0 + 2.5, 2.0, 9.5], look: [X0 + 0.2, 1.4, 4.6], fov: 46 }; if (fs > 48 && fs < 70) FX.push({ kind: "puff", pos: [X0 + 0.1, 1.0, 4.2], size: 0.8, t: (fs - 48) / 22 }); }
      if (n === 22) { tp = { pos: [X0 + 0.2, 0.25, 4.0], yaw: Math.PI * 0.9, face: "deadpan" }; R._flap = 1; cam = { pos: [X0 + 0.9, 1.9, 9.4], look: [X0 + 0.5, 1.6, 5.0], fov: 42 }; }
      if (n === 23) { tp = { pos: [X0 + 0.1, 0.25, 6.6], yaw: Math.PI, armR: [-1.6, 0.2], face: "happy" }; cam = { pos: [X0 + 2.6, 2.2, 9.6], look: [X0, 1.6, 5.6], fov: 46 }; if (fs > 40 && fs < 60) FX.push({ kind: "sparkle", pos: [X0 + 0.1, 2.4, 6.0], size: 0.6, t: (fs - 40) / 20 }); }
      break; }
    case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: {
      grade = { uSat: 0.2 }; light = ["golden", "day", 0.4]; tp = { pos: [X0 - 0.6, 0.25, 6.2], yaw: 0.2, face: "shock" }; pp = { pos: [X0 + 0.6, 0.25, 6.2], yaw: -0.2, face: say("pixi", "deadpan") }; dp = { pos: [X0 + 0.1, 0.25, 5.2], yaw: 0.3 }; tankX = X0 + 5;
      cam = { pos: [X0, 2.4, 13.5], look: [X0, 1.6, 4], fov: 50 };
      if (n === 26) { tp = { pos: [X0 + 0.3, 0.25, 1.0], yaw: Math.PI, armR: [-2.0, 0.2], face: "shock" }; cam = { pos: [X0 + 3, 2.6, 8], look: [X0 + 0.4, 1.6, -0.5], fov: 50 }; }
      const items = ["RESUME", "OPTIONS", "CHANGE SERVER", "RETURN TO MY UNIVERSE", "QUIT GAME"];
      if (n === 27) { menu = items; sel = -1; tp = { ...tp, face: say("toast", "shock") }; }
      if (n === 28) { menu = items; sel = Math.min(4, Math.floor(fs / 12)); if (fs > 64) sel = -1; }
      if (n === 29) { menu = items; sel = -1; tp = { ...tp, face: say("toast", "happy") }; }
      if (n === 30) { menu = ["BIG HEAD MODE: " + (fs > 30 ? "ON" : "OFF")]; sel = 0; }
      if (n === 31) { cam = { pos: [X0, 3.6, 15], look: [X0, 1.8, 2], fov: 52 }; }
      if (n === 32) { tp = { ...tp, lean: fs < 50 ? 0.4 : 0, armL: [-2.6, 0.4], armR: [-2.6, -0.4], face: say("toast", "sad") }; pp = { ...pp, face: fs > 78 && fs < 92 ? "laugh" : "deadpan" }; if (fs > 50) menu = ["BIG HEAD MODE: OFF"], sel = 0; }
      if (n === 33) { const k = sp(S(33), Eo(33)); tp = { pos: [X0 - 0.6 + 2 * k, 0.25, 6.2 - 2 * k], yaw: 2.4, legL: 0.5 * Math.sin(f * 0.4), legR: -0.5 * Math.sin(f * 0.4), armR: fs > 50 && fs < 70 ? [-2.4, 0.2] : [0, 0.3], face: "happy" }; cam = { pos: [X0 + 4, 2.4, 10], look: [X0 + 0.8, 1.4, 4], fov: 50 }; }
      if (n === 34) { menu = items; sel = 3; conf = fs > 20 ? 1 : 0; }
      if (n === 35) { conf = 1; tp = { ...tp, armR: [-1.6, 0.1], face: say("toast", "happy") }; }
      break; }
    case 36: { const k = X.easeIn(sp(S(36) + 30, Eo(36))); tp = { pos: [X0 - 0.6, 0.25 + k * 8, 6.2], yaw: 0, face: "grin" }; pp = { pos: [X0 + 0.6, 0.25 + k * 8, 6.2], yaw: 0 }; dp = { pos: [X0 + 0.1, 0.25 + k * 8, 5.2], yaw: 0.3 }; cam = { pos: [X0 + 6, 2.6, 13], look: [X0 + 8, 2, -4], fov: 46 }; tankX = X0 + 5;
      OV.push((g, w, h) => { R.sil.forEach((p) => { const v = p.root.position.clone().add(new THREE.Vector3(0, 3.0, 0)).project(E.camera); textO(f > S(36) + 40 ? "▼ SIDE CHARACTER" : "▼ MAIN CHARACTER", ((v.x + 1) / 2) * 1920, ((1 - v.y) / 2) * 1080, 30, { col: f > S(36) + 40 ? "#bbbbbb" : "#ffe14a" })(g, w, h); }); }); break; }
  }
  // ---- inserts: battery (17, 24), START (25), alarm meter (9) ----
  if (n === 17 || n === 24 || n === 25) { R.ctl.g.position.set(X0, 1.0, 9.0); R.ctl.g.rotation.set(0.75, 0, 0); R.ctl.set(n === 17 ? "0%" : "CHANGE SERVER", n === 17 ? 0 : 1); cam = { pos: [X0, 1.62, 9.42], look: [X0, 1.0, 9.0], fov: 38 }; tp = pp = dp = null; } else R.ctl.g.position.y = -50;
  if (n === 9) OV.push(textO("ALARM ●○○○○ — JAYWALKING", 1500, 260, 56, { col: "#ff7fb8", s: pop(S(9) + 10, 8) }));
  // ---- poses ----
  const put = (A, p) => (p ? A.pose(p) : A.pose({ visible: false })); put(T, tp); put(P, pp); if (dp) D.pose({ ...dp, scale: 0.9, jaw: dp.jaw || 0.1 }); else D.pose({ visible: false });
  P.boardAt(pp ? [pp.pos[0] + 0.5, pp.pos[1], pp.pos[2] + 0.2] : [0, -50, 0], 0.3, 0, 0, !!pp);
  R.vendor.pose({ pos: [X0 - 3, 0.25, 7.9], yaw: Math.PI, armR: n >= 10 && !standOn ? [-1.4, 0.2] : [0, 0.2], face: n >= 10 && !standOn ? "shock" : "happy" }); R.stand.visible = standOn;
  R.cop.pose({ ...copPose, face: "deadpan" }); R.cop.hat.rotation.z = n >= 33 && f > S(33) + 60 || n > 33 ? 0 : 0.25;
  R.pigeon.position.set(X0 - 1.6, 0.25 + (frozen ? 0.6 : 0.6 * Math.abs(Math.sin(tw * 0.2))), 6.8); R.pigeon.rotation.z = n > 33 || (n === 33 && fs > 100) ? 0.17 : 0;
  // corner silhouettes: slow motion walk (always)
  R.sil.forEach((p, i) => { const ph = (frozen ? FRZ : f) * 0.12 + i; p.pose({ pos: [X0 + 13.2 + i * 1.3, 0, -8 + (i ? 0.4 : 0)], yaw: 0.4 + (n === 36 && f > S(36) + 20 ? -1.2 : 0), legL: 0.4 * Math.sin(ph), legR: -0.4 * Math.sin(ph), armL: [-0.4 * Math.sin(ph), 0.2], armR: [0.4 * Math.sin(ph), 0.2] }); });
  R.heli.visible = heli; R.blade.rotation.y = frozen ? 0.4 : f * 0.9; R.spot.visible = spot; R.spot.position.set(X0, 0.27, 6.0);
  R.tank.position.set(tankX, 0, n >= 13 ? -2 + (n >= 14 ? 6.5 : 0) : -5); R.tank.rotation.y = n >= 14 ? -Math.PI / 2 : -Math.PI / 2; R.ind.material.color.set((frozen || Math.floor(f / 15) % 2) ? "#ff8a1f" : "#5a3a1a");
  R.taxi.visible = taxiOn; if (!taxiOn) R.taxi.position.y = -50;
  // Big Head Mode
  const bh = bigHead ? 3 : 1; [T, P, R.vendor, R.cop, ...R.sil].forEach((A) => A.head && A.head.scale.setScalar(A === T || A === P ? bh : bh)); R.pigeon.scale.setScalar(bigHead ? 2 : 1);
  if (D.head) D.head.scale.setScalar(1.3 * (bigHead ? 2 : 1));
  // ---- HUD ----
  if (n !== 37 && ![17, 24, 25].includes(n)) OV.push(turboHud(alarm, label, cash));
  if (n === 19 && fs < 30) OV.push((g, w, h) => { const k = h / 1080; g.save(); g.fillStyle = "rgba(30,30,30,0.7)"; g.fillRect(w / 2 - 380 * k, h * 0.72, 760 * k, 84 * k); g.fillStyle = "#ff8a1f"; g.fillRect(w / 2 - 280 * k, h * 0.72 + 12 * k, 60 * k, 60 * k); g.restore(); textO("EXPLOSION ×1 (stored)", 1080, h * 0.72 / k + 42, 36, { col: "#ffffff" })(g, w, h); });
  if (n !== 37 && ![4, 17, 24, 25].includes(n) && tp) OV.push((g, w, h) => { [T.root, P.root, D.root].forEach((r, i) => { if (!r.visible) return; const v = r.position.clone().add(new THREE.Vector3(0, i === 2 ? 3.2 : 2.5 + (bigHead ? 1.6 : 0), 0)).project(E.camera); if (v.z < 1 && Math.abs(v.x) < 1) guestTag(((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h, 0.9)(g, w, h); }); });
  if (n !== 37) OV.push(battery(bat, n < 24 && (f % 30) < 15 ? 0.4 : 1));
  if (menu) OV.push(pauseMenu(sel, menu, n === 27 ? sp(S(27), S(27) + 20) : 1));
  if (conf) OV.push(confirmBox(1, true));
  if (n === 28 && fs < 70) OV.push((g, w, h) => { const k = h / 1080; const y = (170 + 190 + Math.min(4, fs / 12) * 105) * k; g.save(); g.fillStyle = "#ffcf9e"; g.strokeStyle = INK; g.lineWidth = 6 * k; g.fillRect(w / 2 + 300 * k, y - 20 * k, 60 * k, 140 * k); g.strokeRect(w / 2 + 300 * k, y - 20 * k, 60 * k, 140 * k); g.restore(); });
  if (n === 37) OV.push(loading2((f - S(37)) / FPS, "Next time, read the note.", 1, "RETURNING…"));
  const cur = SEG.find((s) => t >= s.s - 0.05 && t <= s.e + 0.25); if (cur && n !== 37) OV.push(subtitle(cur.text));
  if (!cam) cam = { pos: [X0, 2.2, 9], look: [X0, 1.4, 0], fov: 48 };
  if (shk) { const q = E.shake(f, ...shk); cam.pos = cam.pos.map((v, i) => v + q[i]); }
  return { cam, light, grade, dof: { focus: 6, amount: 0 }, actors: [], fx: FX, caption: false, focusPt: cam.look, overlay: (g, w, h) => OV.forEach((o) => o(g, w, h)) };
}
