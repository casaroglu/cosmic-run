// Blocky World · character sheet: 3 poses x 3 characters + 1 group shot (frames 0..9)
import { makeToast, makePixi, makeDonutsaurus } from "./blocky/rig.js";
export const meta = { fps: 30, frames: 10, captions: false };
let R = {};
export function build(E) {
  const { THREE } = E;
  // studio: checker floor + soft backdrop wall
  const c = document.createElement("canvas"); c.width = c.height = 256; const g = c.getContext("2d");
  g.fillStyle = "#7fd4a0"; g.fillRect(0, 0, 256, 256); g.fillStyle = "#72c994"; g.fillRect(0, 0, 128, 128); g.fillRect(128, 128, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(40, 40);
  const fl = E.plane(160, 160, E.mat("#ffffff", { map: t }), [0, 0, 0], { rot: [-Math.PI / 2, 0, 0] }); fl.castShadow = false;
  R.toast = makeToast(E); R.pixi = makePixi(E); R.dino = makeDonutsaurus(E);
}
const F = (px, k, w = 900) => `${w} ${px * k}px CizgiFont, Nunito, sans-serif`;
const title = (name, sub, col) => (g, w) => { const k = w / 1080; g.save(); g.textAlign = "center"; g.textBaseline = "middle"; g.lineJoin = "round"; g.font = F(120, k); g.lineWidth = 22 * k; g.strokeStyle = "#221a26"; g.strokeText(name, w / 2, 190 * k); g.fillStyle = col; g.fillText(name, w / 2, 190 * k); g.font = F(46, k, 800); g.lineWidth = 12 * k; g.strokeText(sub, w / 2, 290 * k); g.fillStyle = "#ffffff"; g.fillText(sub, w / 2, 290 * k); g.restore(); };
export function frame(f, E) {
  const { toast: T, pixi: Px, dino: D } = R, OV = [];
  const off = [0, -100, 0];
  T.pose({ visible: false }); Px.pose({ visible: false }); Px.boardAt([0, -100, 0], 0, 0, 0, false); D.pose({ visible: false });
  let cam = { pos: [1.6, 1.7, 6.4], look: [0, 1.25, 0], fov: 36 };
  const who = Math.floor(f / 3), k = f % 3;
  if (f < 3) {
    OV.push(title("TOAST", ["the noob · pose 1: hello", "pose 2: run!", "pose 3: ragdoll"][k], "#ff8a1f"));
    if (k === 0) T.pose({ yaw: 0.25, armR: [0, 2.6], armL: [0.1, 0.15], head: [0, 0, -0.08], face: "grin" });
    if (k === 1) T.pose({ pos: [0, 0.12, 0], yaw: -0.6, lean: 0.25, armL: [-0.3, 2.7], armR: [-0.3, 2.6], legL: 0.9, legR: -0.8, head: [-0.25, 0.5, 0], face: "scared" });
    if (k === 2) T.pose({ pos: [0.75, 2.25, 0], yaw: 0.3, roll: 2.5, pitch: 0.1, armL: [1.2, 1.4], armR: [-2.2, 0.9], legL: -0.9, legR: 0.7, legRz: 0.5, head: [0.2, -0.3, 0.3], face: "dizzy" });
  } else if (f < 6) {
    OV.push(title("PIXI", ["the pro · pose 1: unimpressed", "pose 2: skate", "pose 3: told you"][k], "#b77dff"));
    if (k === 0) { Px.pose({ yaw: -0.3, armL: [0, 0.5], armR: [0.05, 0.12], legLz: 0.1, sway: -0.05, head: [0.05, 0.2, 0.1], face: "deadpan" }); Px.boardAt([1.0, 0.72, 0.1], 0.2, Math.PI / 2 - 0.25, 0, true); }
    if (k === 1) { Px.pose({ pos: [0, 0.2, 0], yaw: -1.0, lean: 0.12, armL: [-0.4, 1.2], armR: [0.3, 1.3], legL: 0.35, legR: -0.35, head: [0, 0.75, 0], face: "smug" }); Px.boardAt([0, 0, 0], -1.0 + Math.PI / 2 * 0 , 0, 0, true); Px.board.rotation.y = Math.PI / 2 - 1.0 + Math.PI / 2; }
    if (k === 2) { Px.pose({ yaw: 0.35, armR: [-1.5, 0.2], armL: [0, 0.45], head: [0, -0.1, -0.12], sway: 0.04, face: "smug" }); Px.boardAt([-1.0, 0.03, -0.3], 0.9, 0, 0, true); }
  } else if (f < 9) {
    OV.push(title("DONUTSAURUS", ["the mascot · pose 1: good boy", "pose 2: ROAR", "pose 3: full"][k], "#ff7fb8"));
    cam = { pos: [2.2, 2.1, 9.4], look: [0, 1.95, 0], fov: 36 };
    if (k === 0) D.pose({ yaw: 0.35, tailY: 0.3, head: [0, 0, 0.12], look: [0.3, 0] });
    if (k === 1) D.pose({ yaw: -0.45, lean: -0.12, jaw: 1, head: [-0.5, 0, 0], armUp: 0.9, legL: 0.5, legR: -0.3, tail: -0.1, look: [0, 0.6] });
    if (k === 2) D.pose({ pos: [0, -0.3, 0], yaw: 0.3, squash: 0.18, legL: -1.3, legR: -1.3, head: [0.25, 0, -0.15], jaw: 0.25, blink: true, tail: 0.05 });
  } else {
    OV.push(title("BLOCKY WORLD", "Toast · Pixi · Donutsaurus", "#ffe14a"));
    cam = { pos: [0.4, 2.3, 13.5], look: [0, 2.1, 0], fov: 38 };
    T.pose({ pos: [-1.35, 0, 2.2], yaw: 0.3, armR: [0, 2.6], face: "grin", scale: 1 });
    Px.pose({ pos: [1.35, 0.2, 2.2], yaw: -0.5, armL: [0, 0.5], head: [0, 0.3, 0], face: "smug" }); Px.boardAt([1.35, 0, 2.2], -0.5, 0, 0, true); Px.board.rotation.y = -0.5 + 0.9;
    D.pose({ pos: [0, 0, -1.6], scale: 1.3, yaw: 0.1, jaw: 0.5, head: [-0.15, 0, 0.08], tailY: 0.3 });
  }
  return { cam, light: "day", dof: { focus: 6, amount: 0 }, actors: [], fx: [], overlay: (g, w, h, s) => OV.forEach((o) => o(g, w, h, s)), caption: false };
}
