// Geode -> smaller geode, infinite loop. One cycle = T s: a diamond wire saws the stone in two, the halves slide apart
// (the small geode hidden inside drops to the floor), turn their amethyst faces to the camera and glide away while the
// camera dives K x onto the small geode, which ends exactly where (and as) the big one started: frame(T) == frame(0).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const W = 1080, H = 1920, T = 6.0, K = 0.4;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1); document.body.appendChild(renderer.domElement); renderer.localClippingEnabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1; renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene(); scene.background = new THREE.Color('#0b0a10');
const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.5;
const rim = new THREE.DirectionalLight('#a27dff', 2.2); rim.position.set(-2.5, 2.5, -4); scene.add(rim);
const rim2 = new THREE.DirectionalLight('#ffcf8a', 1.2); rim2.position.set(4, 1.5, -2); scene.add(rim2);
const cam = new THREE.PerspectiveCamera(32, W / H, 0.01, 100);
const sun = new THREE.DirectionalLight('#fff4e6', 2.4); sun.position.set(3, 6, 2.5); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2, near: .1, far: 20 }); sun.shadow.radius = 6; sun.shadow.bias = -0.0004; scene.add(sun);
scene.add(new THREE.HemisphereLight('#b9a7ff', '#0a0810', 0.08));
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: '#060509', roughness: .9, envMapIntensity: .03 }));
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
// ---- deterministic helpers
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const WAVES = Array.from({ length: 14 }, (_, i) => { const v = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize(); return { v, f: 1.6 + i * .55, p: rnd() * 6.28, a: 1 / (1 + i * .45) }; });
const noise = d => WAVES.reduce((s, w) => s + w.a * Math.sin(d.dot(w.v) * w.f * 2.2 + w.p), 0) / 4.2;
const R0 = .5, RAD = d => R0 * (1 + .07 * noise(d) + .018 * Math.sin(d.x * 23 + d.y * 17) * Math.sin(d.z * 19) + .008 * Math.sin(d.x * 61 + d.z * 47) * Math.sin(d.y * 53));
const C0 = .5;   // sphere centre height
const ease = x => x < 0 ? 0 : x > 1 ? 1 : x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
// split plane normal = camera's right vector, so the halves part left/right on screen; H_ = horizontal view direction
// split plane turned 35 deg from the view so the beaded wire reads diagonally on screen
const A0 = .534 - .61, N_ = new THREE.Vector3(Math.cos(A0), 0, -Math.sin(A0)), H_ = new THREE.Vector3(.509, 0, .861).normalize(), RIGHT = new THREE.Vector3(.861, 0, -.509), UP = new THREE.Vector3(0, 1, 0);
const QBASE = new THREE.Quaternion().setFromAxisAngle(UP, A0);   // local x -> N_
const ang = v => Math.atan2(-v.z, v.x), wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
// ---- materials
const stone = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .93, metalness: 0, envMapIntensity: .7 });
const agate = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: .18, clearcoat: 1, clearcoatRoughness: .05, side: THREE.DoubleSide, envMapIntensity: 1.2 });
const amethyst = new THREE.MeshPhysicalMaterial({ color: '#a466ff', roughness: .06, metalness: 0, transmission: .55, thickness: .05, ior: 1.55, emissive: '#3c0f78', emissiveIntensity: .8,
  clearcoat: 1, clearcoatRoughness: .03, iridescence: .35, envMapIntensity: 2.2, specularIntensity: 1 });
const bowlMat = new THREE.MeshStandardMaterial({ color: '#2a0f4a', roughness: .5, emissive: '#1a0636', side: THREE.BackSide });
// ---- one half: local frame, split plane x = 0, dome toward +x*side, sphere centre at the origin
function half(side, withInside) {
  const g = new THREE.Group();
  const sg = new THREE.SphereGeometry(1, 128, 96, side > 0 ? Math.PI / 2 : -Math.PI / 2, Math.PI), pos = sg.attributes.position, col = [];
  const v = new THREE.Vector3(), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i).normalize(); const r = RAD(v); pos.setXYZ(i, v.x * r, v.y * r, v.z * r);
    const k = .5 + .5 * noise(v.clone().multiplyScalar(3.1)); c.setRGB(.1 + .06 * k, .085 + .045 * k, .07 + .035 * k); if (Math.sin(v.x * 40 + v.y * 31) * Math.sin(v.z * 37) > .82) c.multiplyScalar(.7); col.push(c.r, c.g, c.b); }
  sg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); sg.computeVertexNormals();
  const shell = new THREE.Mesh(sg, stone); shell.castShadow = true; shell.receiveShadow = true; g.add(shell);
  if (withInside) {
    // cut face: banded agate ring from the cavity rim to the rind
    const NA = 256, FR = [0, .05, .12, .22, .34, .46, .58, .7, .8, .9, .965, 1], BAND = ['#f3eefc', '#cbb8f0', '#efe9f7', '#8d97b8', '#e9e6f0', '#6d78a3', '#d8d2e6', '#4b4e6b', '#c9c0d8', '#7c6c62', '#5a4c42', '#5a4c42'];
    const vp = [], vc = [], idx = [];
    for (let a = 0; a <= NA; a++) { const th = a / NA * Math.PI * 2, d = new THREE.Vector3(0, Math.cos(th), Math.sin(th)), ro = RAD(d), rc = ro * (.66 + .04 * noise(d.clone().multiplyScalar(4)));
      FR.forEach((f, j) => { const r = rc + (ro - rc) * f * (1 + (j && j < FR.length - 1 ? .03 * Math.sin(th * 9 + j) : 0)); vp.push(0, d.y * r, d.z * r); c.set(BAND[j]); vc.push(c.r, c.g, c.b); }); }
    const nf = FR.length;
    for (let a = 0; a < NA; a++) for (let j = 0; j < nf - 1; j++) { const p = a * nf + j, q = (a + 1) * nf + j; idx.push(p, q, p + 1, p + 1, q, q + 1); }
    const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.Float32BufferAttribute(vp, 3)); fg.setAttribute('color', new THREE.Float32BufferAttribute(vc, 3)); fg.setIndex(idx); fg.computeVertexNormals();
    const face = new THREE.Mesh(fg, agate); face.position.x = -side * .0005; g.add(face);
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(.31, 64, 48, side > 0 ? Math.PI / 2 : -Math.PI / 2, Math.PI), bowlMat); g.add(bowl);
    // amethyst points lining the cavity, pointing to the centre
    const NC = 240, cone = new THREE.ConeGeometry(1, 1, 6); cone.translate(0, .5, 0);
    const im = new THREE.InstancedMesh(cone, amethyst, NC), m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3();
    for (let i = 0; i < NC; i++) { let d; do { d = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1); } while (d.lengthSq() > 1 || d.lengthSq() < .05); d.normalize(); d.x = Math.abs(d.x) * side; d.normalize();
      const rr = .3 + rnd() * .03; p.copy(d).multiplyScalar(rr); const tip = d.clone().negate().add(new THREE.Vector3(rnd() - .5, rnd() - .5, rnd() - .5).multiplyScalar(.5)).normalize();
      if (p.x * side < .015) p.x = side * .015; q.setFromUnitVectors(UP, tip); const w = .028 + rnd() * .03; sc.set(w, .08 + rnd() * .1, w); m.compose(p, q, sc); im.setMatrixAt(i, m); }
    g.add(im);
  }
  return g;
}
function geode(withInside) { const g = new THREE.Group(), a = half(1, withInside), b = half(-1, withInside); g.add(a, b); return { g, a, b }; }
// outer geode (opens) and inner geode (always closed): both centred at C0 * scale above the floor
const OUT = geode(true); scene.add(OUT.g);
const INN = geode(false); INN.g.scale.setScalar(K); INN.a.position.y = INN.b.position.y = C0; scene.add(INN.g);
// kerf (dark seam with a violet glow) revealed above the wire while sawing
const seamPts = []; for (let a = 0; a < 200; a++) { const th = a / 200 * Math.PI * 2, d = new THREE.Vector3(0, Math.cos(th), Math.sin(th)), r = RAD(d) * 1.004; seamPts.push(new THREE.Vector3(0, d.y * r, d.z * r)); }
const wireClip = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const kerfMat = new THREE.MeshStandardMaterial({ color: '#0a0612', emissive: '#7a3cff', emissiveIntensity: .6, roughness: .6, clippingPlanes: [wireClip] });
const kerf = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(seamPts, true), 300, .006, 6, true), kerfMat); scene.add(kerf);
// diamond wire with beads (beads make the back-and-forth sawing visible)
const steel = new THREE.MeshPhysicalMaterial({ color: '#e9ebf0', metalness: 1, roughness: .15, clearcoat: .5 });
const wire = new THREE.Group(); const wcyl = new THREE.Mesh(new THREE.CylinderGeometry(.0035, .0035, 3.2, 8), steel); wcyl.rotation.x = Math.PI / 2; wire.add(wcyl);
const beadG = new THREE.SphereGeometry(.009, 10, 8); for (let i = -26; i <= 26; i++) { const b = new THREE.Mesh(beadG, steel); b.position.z = i * .06; wire.add(b); } scene.add(wire);
// stone dust / sparks thrown from the two contact points
const NP = 700, pg = new THREE.BufferGeometry(), pp = new Float32Array(NP * 3); pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
const dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: '#e6dcff', size: .012, transparent: true, opacity: .9, depthWrite: false, blending: THREE.AdditiveBlending })); dust.frustumCulled = false; scene.add(dust);
const PD = Array.from({ length: NP }, () => ({ b: rnd(), s: rnd() < .5 ? -1 : 1, vx: (rnd() - .5) * .5, vy: rnd() * .7 + .2, vz: rnd() * .9 + .2, life: .35 + rnd() * .45 }));
const glow = new THREE.PointLight('#a25bff', 0, 3, 1.6); scene.add(glow);
// ---- timeline
const CUT = [.45, 1.95], SEP = [2.05, 2.5], TURN = [2.4, 3.25], ZOOM = [3.75, 5.75], AWAY = [3.6, 5.5];
const SEP_D = .72, AWAY_D = 2.9, BACK = .3;
window.T = T;
const tmpQ = new THREE.Quaternion();
function placeHalf(h, side, t, s) {   // side +1 = right half
  const sep = SEP_D * ease((t - SEP[0]) / (SEP[1] - SEP[0])), aw = AWAY_D * ease((t - AWAY[0]) / (AWAY[1] - AWAY[0])), tu = ease((t - TURN[0]) / (TURN[1] - TURN[0]));
  const p = new THREE.Vector3(0, C0, 0).addScaledVector(N_, side * sep).addScaledVector(H_, -BACK * tu).addScaledVector(RIGHT, side * aw);
  const th = wrap(ang(H_) - ang(N_.clone().multiplyScalar(-side))) * .93;   // turn the cut face toward the camera
  h.position.copy(p); tmpQ.setFromAxisAngle(UP, th * tu); h.quaternion.copy(tmpQ).multiply(QBASE);
}
function state(t) {
  // outer halves: each half's group is re-parented in world space (positions above are world positions)
  placeHalf(OUT.a, 1, t); placeHalf(OUT.b, -1, t);
  // inner geode: rests in the cavity (centre at C0), drops when the halves part, tiny bounce
  const td = SEP[0] + .1, g = 9.8, h0 = C0 - K * C0; let y = h0, ft = t - td;
  if (ft > 0) { const tf = Math.sqrt(2 * h0 / g); if (ft < tf) y = h0 - .5 * g * ft * ft; else { const v = g * tf * .22, tb = 2 * v / g, u = ft - tf; y = u < tb ? v * u - .5 * g * u * u : 0;
    const u2 = u - tb, v2 = v * .25, tb2 = 2 * v2 / g; if (u2 > 0) y = u2 < tb2 ? v2 * u2 - .5 * g * u2 * u2 : 0; } }
  INN.g.position.set(0, y, 0); INN.g.quaternion.copy(QBASE);
  // wire saw: from above the stone down to the floor, sawing back and forth along its length
  const cp = clamp((t - CUT[0]) / (CUT[1] - CUT[0])), wy = 1.12 - cp * 1.14 + (t < CUT[0] ? (CUT[0] - t) * 2.5 : 0) + (t > CUT[1] ? (t - CUT[1]) * 0 : 0);
  wire.visible = t > CUT[0] - .3 && t < CUT[1] + .05; wire.quaternion.copy(QBASE); wire.position.set(0, wy, 0); wire.translateZ(Math.sin(t * 38) * .03);
  wireClip.constant = -wy; kerf.visible = t > CUT[0] && t < SEP[0] + .02; kerf.quaternion.copy(QBASE); kerf.position.set(0, C0, 0); kerfMat.emissiveIntensity = .4 + .5 * clamp((t - CUT[0]) / 1.2);
  // dust
  let k = 0; for (const d of PD) { const bt = CUT[0] + d.b * (CUT[1] - CUT[0]), a = t - bt; let x = 0, yy = -10, z = 0;
    if (a > 0 && a < d.life) { const wyb = 1.12 - d.b * 1.14, dy = wyb - C0, zc = Math.sqrt(Math.max(0, R0 * R0 - dy * dy)) * d.s;
      if (Math.abs(dy) < R0) { const loc = new THREE.Vector3(d.vx * a, wyb + d.vy * a - 2.2 * a * a, zc + d.s * d.vz * a).applyQuaternion(QBASE); x = loc.x; yy = Math.max(.003, loc.y); z = loc.z; } }
    pp[k++] = x; pp[k++] = yy; pp[k++] = z; }
  pg.attributes.position.needsUpdate = true;
  // amethyst glow while the cavity is open
  const gl = clamp((t - SEP[0]) / .6) * (1 - clamp((t - 4.4) / 1.0)); glow.intensity = 2.2 * gl; glow.position.set(0, C0 + .15, 0).addScaledVector(H_, .5);
  // camera: same pose scaled by s, s goes 1 -> K, so frame(T) == frame(0)
  const s = Math.pow(K, ease((t - ZOOM[0]) / (ZOOM[1] - ZOOM[0]))), sway = Math.sin(t / T * Math.PI * 2) * .07;
  cam.position.set((2.6 + sway) * s * 1.18, 2.2 * s * 1.18, 4.4 * s * 1.18); cam.lookAt(0, .62 * s, 0);
  sun.shadow.camera.left = -2 * s; sun.shadow.camera.right = 2 * s; sun.shadow.camera.top = 2 * s; sun.shadow.camera.bottom = -2 * s; sun.position.set(3 * s, 6 * s, 2.5 * s); sun.shadow.camera.updateProjectionMatrix();
}
const C2 = document.createElement('canvas'); C2.width = W; C2.height = H; const c2 = C2.getContext('2d');
const VIG = c2.createRadialGradient(W / 2, H * .52, H * .12, W / 2, H * .52, H * .72); VIG.addColorStop(0, 'rgba(0,0,0,0)'); VIG.addColorStop(1, 'rgba(0,0,0,0.78)');
window.frame = (t, q = .93) => { state(((t % T) + T) % T); renderer.render(scene, cam); c2.drawImage(renderer.domElement, 0, 0); c2.fillStyle = VIG; c2.fillRect(0, 0, W, H); return C2.toDataURL('image/jpeg', q); };
window.ready = Promise.resolve({ T });
