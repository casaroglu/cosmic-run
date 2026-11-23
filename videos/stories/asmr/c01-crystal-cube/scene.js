// Crystal cube -> 8 cubes, infinite loop. One cycle = T s: three knife cuts, the pieces burst apart, the camera dives
// 2x onto the bottom-front-right cube, which ends exactly where (and as) the whole cube started: frame(T) == frame(0).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const W = 1080, H = 1920, T = 6.0;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1); document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene(); scene.background = new THREE.Color('#0b0a10');
const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.55;
const rim = new THREE.DirectionalLight('#a27dff', 3.2); rim.position.set(-2.5, 2.5, -4); scene.add(rim);
const rim2 = new THREE.DirectionalLight('#7fe3ff', 1.4); rim2.position.set(4, 1.5, -2); scene.add(rim2);
const cam = new THREE.PerspectiveCamera(32, W / H, 0.01, 100);
const sun = new THREE.DirectionalLight('#fff4e6', 2.2); sun.position.set(3, 6, 2.5); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2, near: .1, far: 20 }); sun.shadow.radius = 6; scene.add(sun);
scene.add(new THREE.HemisphereLight('#b9a7ff', '#0a0810', 0.12));
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: '#0e0c13', roughness: .85, metalness: 0, envMapIntensity: .06 }));
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
const crystal = new THREE.MeshPhysicalMaterial({ color: '#d7c2ff', roughness: .015, metalness: 0, transmission: 1, thickness: .7, envMapIntensity: 2.4, emissive: '#1d0742', ior: 2.4, dispersion: 4,
  iridescence: .55, iridescenceIOR: 1.6, clearcoat: 1, clearcoatRoughness: .02, attenuationColor: '#9a5bff', attenuationDistance: .9, specularIntensity: 1 });
const steel = new THREE.MeshPhysicalMaterial({ color: '#e8eaee', metalness: 1, roughness: .12, clearcoat: .6 });
// ---- pieces per stage (a stage = after n cuts). Sizes/centers in cube units, cube = [-.5,.5]x[0,1]x[-.5,.5]
const G = .012;   // gap a cut opens
function boxes(stage) {
  const xs = stage >= 1 ? [-1, 1] : [0], zs = stage >= 2 ? [-1, 1] : [0], ys = stage >= 3 ? [-1, 1] : [0], out = [];
  for (const sx of xs) for (const sz of zs) for (const sy of ys) out.push({ sx, sy, sz, size: [sx ? .5 : 1, sy ? .5 : 1, sz ? .5 : 1] });
  return out;
}
const STAGES = [0, 1, 2, 3].map(st => boxes(st).map(b => { const m = new THREE.Mesh(new RoundedBoxGeometry(b.size[0] - .004 * Math.min(...b.size), b.size[1] - .004 * Math.min(...b.size), b.size[2] - .004 * Math.min(...b.size), 4, .035 * Math.min(...b.size)), crystal); m.castShadow = true; scene.add(m); m.userData = b; return m; }));
const knife = new THREE.Group(); const blade = new THREE.Mesh(new RoundedBoxGeometry(.018, .75, 1.7, 2, .006), steel); blade.castShadow = true; knife.add(blade);
const handle = new THREE.Mesh(new RoundedBoxGeometry(.07, .16, .55, 3, .03), new THREE.MeshPhysicalMaterial({ color: '#1c1a20', roughness: .5 })); handle.position.set(0, .3, 1.1); knife.add(handle); scene.add(knife);
const ease = x => x < 0 ? 0 : x > 1 ? 1 : x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const outQ = x => 1 - Math.pow(1 - clamp(x), 3);
const CUTS = [[.6, 1.25, 'x'], [1.4, 2.05, 'z'], [2.2, 2.85, 'y']], BURST = [2.95, 3.4], DRIFT = 3.9, ZOOM = [3.7, 5.6];
const HERO = { sx: 1, sy: -1, sz: 1 };   // bottom-front-right piece (front = toward the camera)
window.T = T;
function state(t) {   // t in [0, T)
  const st = CUTS.filter(c => t >= c[0] + (c[1] - c[0]) * .62).length;
  STAGES.forEach((ms, i) => ms.forEach(m => m.visible = i === st));
  const gap = n => Math.min(st, n) > 0 ? G * outQ((t - (CUTS[n - 1][0] + (CUTS[n - 1][1] - CUTS[n - 1][0]) * .62)) / .35) : 0;
  const bu = outQ((t - BURST[0]) / (BURST[1] - BURST[0])), dr = ease((t - DRIFT) / (ZOOM[1] - DRIFT)), hk = ease((t - DRIFT + .25) / (ZOOM[1] - DRIFT));
  for (const m of STAGES[st]) { const b = m.userData; let x = b.sx * (.25 + gap(1)), z = b.sz * (.25 + gap(2)), y = b.size[1] / 2 + (b.sy > 0 ? .5 + gap(3) : 0);
    if (!b.sx) x = 0; if (!b.sz) z = 0; if (!b.sy) y = .5;
    m.rotation.set(0, 0, 0);
    if (st === 3) { const hero = b.sx === HERO.sx && b.sy === HERO.sy && b.sz === HERO.sz;
      if (hero) { x = (x + b.sx * .09 * bu) * (1 - hk); z = (z + b.sz * .09 * bu) * (1 - hk); }
      else { const pop = .09 * bu, dir = new THREE.Vector3(b.sx * 1.2, b.sy > 0 ? .5 : .1, b.sz > 0 ? -.2 : -1).normalize(), d = dr * 3.4;
        x += b.sx * pop + dir.x * d; z += b.sz * pop + dir.z * d; y += (b.sy > 0 ? pop * 1.4 : 0) + Math.sin(Math.PI * clamp(bu)) * .06 + dir.y * d * .6; const sp = bu * .08 + dr * 1.2;
        m.rotation.set(sp * b.sz, sp * b.sx * .7, sp * b.sx * .9); } }
    m.position.set(x, y, z); }
  // knife: comes in, slices, leaves
  knife.visible = false;
  for (const [a, b, ax] of CUTS) { if (t < a - .25 || t > b + .3) continue; knife.visible = true; const p = (t - a) / (b - a), dn = ease(clamp(p / .62)), out = ease(clamp((p - .7) / .45));
    if (ax === 'x') { knife.rotation.set(0, 0, 0); knife.position.set(0, 1.45 - dn * 1.43 + out * 1.6, -.05); }
    if (ax === 'z') { knife.rotation.set(0, Math.PI / 2, 0); knife.position.set(.05, 1.45 - dn * 1.43 + out * 1.6, 0); }
    if (ax === 'y') { knife.rotation.set(0, Math.PI / 2, Math.PI / 2); knife.position.set(1.6 - dn * 1.6 - out * 2.2, .5 + gap(2) * 0, 0); }
    const fade = clamp((t - a + .25) / .2) * (1 - clamp((t - b - .1) / .2)); blade.material.opacity = 1; knife.scale.setScalar(.3 + .7 * fade); }
  // camera: same pose scaled by s, s goes 1 -> .5 (the hero is half the size), so frame(T) == frame(0)
  const s = Math.pow(.5, ease((t - ZOOM[0]) / (ZOOM[1] - ZOOM[0]))), sway = Math.sin(t / T * Math.PI * 2) * .06;
  cam.position.set((2.6 + sway) * s, 2.35 * s, 4.4 * s); cam.lookAt(0, .78 * s, 0);
  sun.shadow.camera.left = -2 * s; sun.shadow.camera.right = 2 * s; sun.shadow.camera.top = 2 * s; sun.shadow.camera.bottom = -2 * s; sun.position.set(3 * s, 6 * s, 2.5 * s); sun.shadow.camera.updateProjectionMatrix();
}
const C2 = document.createElement('canvas'); C2.width = W; C2.height = H; const c2 = C2.getContext('2d');
const VIG = c2.createRadialGradient(W / 2, H * .52, H * .12, W / 2, H * .52, H * .72); VIG.addColorStop(0, 'rgba(0,0,0,0)'); VIG.addColorStop(1, 'rgba(0,0,0,0.78)');
window.frame = (t, q = .93) => { state(((t % T) + T) % T); renderer.render(scene, cam); c2.drawImage(renderer.domElement, 0, 0); c2.fillStyle = VIG; c2.fillRect(0, 0, W, H); return C2.toDataURL('image/jpeg', q); };
window.ready = Promise.resolve({ T });
