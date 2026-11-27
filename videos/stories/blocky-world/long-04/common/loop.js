// LOOP_POSE: one shared pose (cold open frame 0, launch night START press, last frame of the film).
import * as THREE from "three";
import { LIGHTS } from "../engine/engine.js";
export const DARK = { ...LIGHTS.night, sun: "#ff6a6a", sunI: 0.06, sky: "#3a1a2a", ground: "#0a0608", hemiI: 0.16, amb: 0.04, top: "#05040a", bot: "#120a12", fog: "#0a0608", fogNear: 30, fogFar: 140, sat: 1.05, warm: 0.02, con: 1.12, vig: 0.62 };
export const HOMELIGHT = ["interior", "night", 0.12];
export const LOOP = {
  toast: { pos: [-3.2, 0.03, 0.75], yaw: -Math.PI / 2 + 0.25, lean: 0.25, legL: -1.45, kneeL: 1.45, legR: -1.45, kneeR: 1.45, armL: [-1.05, 0.12], elbowL: 0.75, armR: [-1.15, -0.12], elbowR: 0.85, head: [0.12, 0, 0], face: "shock" },
  pixi: { pos: [-0.9, 0.74, -1.62], yaw: 0.55, legL: -1.5, kneeL: 1.5, legR: -1.5, kneeR: 1.5, armL: [-0.9, 0.2], elbowL: 1.4, armR: [0, 0.2], face: "deadpan", head: [0, -0.35, 0] },
  dino: { pos: [5.0, 0.95, -0.7], yaw: -0.5, pitch: -1.25, squash: 0, jaw: 0.1, legL: -0.4, legR: 0.4 },
  cam: { pos: [-4.6, 1.95, 5.6], look: [-2.1, 1.45, -0.3], fov: 36 },
};
/** pose everyone into LOOP_POSE. R = home(); returns the frame settings to merge */
export function loopPose(R, f) {
  R.T.pose(LOOP.toast); R.P.pose(LOOP.pixi); R.P.boardAt([0.1, 1.2, -1.8], 0.4, 0, 0, true);
  R.D.pose(LOOP.dino); R.D.eyes[0].scale.y = 0.15; R.D.eyes[1].scale.y = 1;
  R.bottle.position.y = -50; R.H.pose({ visible: false }); R.shop.clock(" ", ""); R.setWin(1); if (R.cups[1]) R.cups[1].position.y = -50; if (R.moth) R.moth.at([0, -50, 0], 0); if (R.case) R.case.set([0, -50, 0]); if (R.parcel) R.parcel.position.y = -50;
  // controller in the left hand, right index on START
  R.T.root.updateMatrixWorld(true); const v = new THREE.Vector3(); R.T.elbows[0].getWorldPosition(v); const v2 = new THREE.Vector3(); R.T.elbows[1].getWorldPosition(v2);
  const mid = v.clone().add(v2).multiplyScalar(0.5); R.ctl.g.position.set(mid.x - 0.22, mid.y - 0.36, mid.z); R.ctl.g.rotation.set(0.5, -Math.PI / 2 + 0.25, 0); R.ctl.start.scale.y = 0.5;
  // cup in Pixi's hand
  R.P.root.updateMatrixWorld(true); const c = new THREE.Vector3(); R.P.elbows[0].getWorldPosition(c); R.cups[0].position.set(c.x + 0.1, c.y - 0.45, c.z + 0.2); R.cups[0].rotation.set(0, 0, 0);
  R.screenLight.color.set("#ff2a2a"); R.screenLight.intensity = 5.5; R.scrL.set("down", (g, w, h) => { g.fillStyle = "#2a0608"; g.fillRect(0, 0, w, h); });
  return { cam: { ...LOOP.cam }, light: DARK, dof: { focus: [-3.0, 1.4, 0.7], amount: 1.1 } };
}
