// Blocky World · original box-rig characters (Toast, Pixi, Donutsaurus). No third-party avatar shapes.
import * as THREE from "three";
const INK = "#221a26";
const tex = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

/** face texture: e = happy | grin | shock | scared | smug | deadpan | sad | angry | dizzy | blink */
export function drawFace(g, W, H, o, e) {
  g.fillStyle = o.skin; g.fillRect(0, 0, W, H);
  const cx = W / 2, ey = H * 0.47, dx = W * 0.2, er = W * 0.115;
  // cheeks
  g.fillStyle = o.cheek || "rgba(255,120,110,0.32)";
  for (const s of [-1, 1]) { rr(g, cx + s * dx * 1.45 - 34, ey + er * 1.15, 68, 34, 12); g.fill(); }
  const eye = (x, open = 1, look = [0, 0], lid = 0) => {
    g.save(); g.translate(x, ey);
    if (open <= 0.05) { g.strokeStyle = INK; g.lineWidth = 13; g.lineCap = "round"; g.beginPath(); g.moveTo(-er * 0.8, 0); g.quadraticCurveTo(0, er * 0.35, er * 0.8, 0); g.stroke(); g.restore(); return; }
    rr(g, -er, -er * open, er * 2, er * 2 * open, er * 0.42); g.fillStyle = "#fff"; g.fill(); g.lineWidth = 11; g.strokeStyle = INK; g.stroke();
    g.save(); g.clip(); const pr = er * (e === "shock" || e === "scared" ? 0.42 : 0.62);
    rr(g, look[0] * er * 0.45 - pr, look[1] * er * 0.45 - pr, pr * 2, pr * 2, pr * 0.4); g.fillStyle = o.iris || "#3a2a22"; g.fill();
    g.fillStyle = "#fff"; g.fillRect(look[0] * er * 0.45 - pr * 0.55, look[1] * er * 0.45 - pr * 0.6, pr * 0.5, pr * 0.5);
    if (lid > 0) { g.fillStyle = o.lid || o.skin; g.fillRect(-er - 6, -er - 6, er * 2 + 12, er * 2 * lid + 6); g.strokeStyle = INK; g.lineWidth = 10; g.beginPath(); g.moveTo(-er, -er + er * 2 * lid); g.lineTo(er, -er + er * 2 * lid); g.stroke(); }
    g.restore(); g.restore();
  };
  const brow = (x, s, tilt, y = -er * 1.55) => { g.save(); g.translate(x, ey + y); g.rotate(tilt * s); rr(g, -er * 0.9, -9, er * 1.8, 20, 8); g.fillStyle = o.brow || "#5a3a22"; g.fill(); g.restore(); };
  const my = H * 0.76; g.lineCap = "round"; g.lineJoin = "round";
  const mouthOpen = (w, h, teeth = true, gap = false, tongue = true) => {
    rr(g, cx - w / 2, my - h * 0.35, w, h, Math.min(w, h) * 0.3); g.fillStyle = "#5a1a24"; g.fill(); g.lineWidth = 11; g.strokeStyle = INK; g.stroke();
    g.save(); g.clip();
    if (tongue) { g.fillStyle = "#f0707a"; rr(g, cx - w * 0.3, my + h * 0.3, w * 0.6, h * 0.5, 16); g.fill(); }
    if (teeth) { g.fillStyle = "#fff"; g.fillRect(cx - w / 2, my - h * 0.35, w, h * 0.3); if (gap) { g.fillStyle = "#5a1a24"; g.fillRect(cx + w * 0.08, my - h * 0.35, w * 0.17, h * 0.32); } }
    g.restore();
  };
  const line = (pts, lw = 13) => { g.strokeStyle = INK; g.lineWidth = lw; g.beginPath(); g.moveTo(cx + pts[0], my + pts[1]); g.quadraticCurveTo(cx + pts[2], my + pts[3], cx + pts[4], my + pts[5]); g.stroke(); };
  switch (e) {
    case "grin": eye(cx - dx); eye(cx + dx); brow(cx - dx, -1, -0.12); brow(cx + dx, 1, -0.12); mouthOpen(W * 0.42, H * 0.2, true, o.gap, true); break;
    case "shock": eye(cx - dx, 1.15); eye(cx + dx, 1.15); brow(cx - dx, -1, -0.3, -er * 1.9); brow(cx + dx, 1, -0.3, -er * 1.9); mouthOpen(W * 0.2, H * 0.22, false, false, false); break;
    case "scared": eye(cx - dx, 1.15, [0.6, 0]); eye(cx + dx, 1.15, [0.6, 0]); brow(cx - dx, -1, -0.5, -er * 1.8); brow(cx + dx, 1, -0.5, -er * 1.8); mouthOpen(W * 0.4, H * 0.17, true, o.gap, false);
      g.fillStyle = "#8fd3ff"; g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(W * 0.86, H * 0.2); g.quadraticCurveTo(W * 0.93, H * 0.33, W * 0.86, H * 0.35); g.quadraticCurveTo(W * 0.79, H * 0.33, W * 0.86, H * 0.2); g.fill(); g.stroke(); break;
    case "smug": eye(cx - dx, 1, [0.7, 0], 0.42); eye(cx + dx, 1, [0.7, 0], 0.42); brow(cx - dx, -1, 0.1); brow(cx + dx, 1, -0.3, -er * 1.8); line([-60, 6, 10, 34, 74, -22]); break;
    case "deadpan": eye(cx - dx, 1, [0, 0], 0.45); eye(cx + dx, 1, [0, 0], 0.45); brow(cx - dx, -1, 0); brow(cx + dx, 1, 0); line([-44, 6, 0, 6, 44, 6]); break;
    case "sad": eye(cx - dx, 1, [0, 0.5]); eye(cx + dx, 1, [0, 0.5]); brow(cx - dx, -1, -0.45); brow(cx + dx, 1, -0.45); line([-52, 22, 0, -22, 52, 22]); break;
    case "angry": eye(cx - dx, 0.8); eye(cx + dx, 0.8); brow(cx - dx, -1, 0.45, -er * 1.1); brow(cx + dx, 1, 0.45, -er * 1.1); mouthOpen(W * 0.34, H * 0.12, true, o.gap, false); break;
    case "dizzy": for (const s of [-1, 1]) { g.strokeStyle = INK; g.lineWidth = 13; g.beginPath(); const x = cx + s * dx; g.moveTo(x - er * 0.7, ey - er * 0.7); g.lineTo(x + er * 0.7, ey + er * 0.7); g.moveTo(x + er * 0.7, ey - er * 0.7); g.lineTo(x - er * 0.7, ey + er * 0.7); g.stroke(); } line([-56, 0, -10, -36, 20, 6]); line([20, 6, 40, 30, 62, 0]); break;
    case "blink": eye(cx - dx, 0); eye(cx + dx, 0); brow(cx - dx, -1, -0.1); brow(cx + dx, 1, -0.1); line([-56, -6, 0, 40, 56, -6]); break;
    default: eye(cx - dx); eye(cx + dx); brow(cx - dx, -1, -0.1); brow(cx + dx, 1, -0.1); line([-62, -8, 0, 46, 62, -8]); if (o.gap) { g.fillStyle = "#fff"; g.strokeStyle = INK; g.lineWidth = 7; rr(g, cx - 34, my + 4, 26, 24, 5); g.fill(); g.stroke(); }
  }
  if (o.extra) o.extra(g, W, H);
}

/** humanoid box rig. spec: skin, shirt, sleeve, pants, shoe, face:{...}, build(parts, E) for accessories */
export function blocky(E, spec) {
  const M = (c) => E.mat(c), root = E.group(null);
  const LH = 0.62, TH = 0.72, HW = 1.0, HH = 0.88, HD = 0.9;
  const P = { root, spec };
  const HL = (LH - 0.12) / 2;
  P.knees = [];
  P.legs = [-1, 1].map((s) => { const g = E.group(root, [s * 0.2, LH, 0]); E.box(0.36, HL + 0.02, 0.38, M(spec.pants), [0, -HL, 0], { parent: g });
    const k = E.group(g, [0, -HL, 0]); P.knees.push(k); E.box(0.35, HL, 0.37, M(spec.pants), [0, -HL, 0], { parent: k }); E.box(0.38, 0.14, 0.5, M(spec.shoe), [0, -HL - 0.12, 0.05], { parent: k }); if (spec.sock) E.box(0.37, 0.2, 0.39, M(spec.sock), [0, -HL, 0], { parent: k }); return g; });
  P.chest = E.group(root, [0, LH, 0]);
  P.torso = E.group(P.chest, [0, 0, 0]);
  E.box(0.8, TH, 0.46, M(spec.shirt), [0, 0, 0], { parent: P.torso });
  P.elbows = [];
  P.arms = [-1, 1].map((s) => { const g = E.group(P.chest, [s * 0.54, TH - 0.06, 0]); E.box(0.27, 0.36, 0.3, M(spec.sleeve || spec.shirt), [0, -0.34, 0], { parent: g });
    const e = E.group(g, [0, -0.34, 0]); P.elbows.push(e); E.box(0.26, 0.24, 0.29, M(spec.sleeve || spec.shirt), [0, -0.24, 0], { parent: e }); E.box(0.29, 0.07, 0.32, M(spec.cuff || spec.sleeve || spec.shirt), [0, -0.25, 0], { parent: e }); E.box(0.25, 0.17, 0.27, M(spec.skin), [0, -0.41, 0], { parent: e }); return g; });
  P.head = E.group(P.chest, [0, TH, 0]);
  E.box(HW, HH, HD, M(spec.skin), [0, 0.02, 0], { parent: P.head });
  P.faces = {}; P.faceMesh = E.plane(HW, HH, M("#ffffff"), [0, 0.02 + HH / 2, HD / 2 + 0.004], { parent: P.head, noShadow: true, noink: true }); P.faceMesh.castShadow = false;
  // 3D pop-out eyes for shock close-ups (hidden unless pose.eyePop > 0)
  P.popEyes = [-1, 1].map((s) => { const g = E.group(P.head, [s * 0.2 * HW, 0.02 + HH * 0.53, HD / 2]); E.box(0.26, 0.26, 0.5, M("#ffffff"), [0, -0.13, 0.25], { parent: g, noShadow: true }); E.box(0.14, 0.14, 0.04, M(spec.face.iris || "#3a2a22"), [0, -0.07, 0.5], { parent: g, noShadow: true }); g.visible = false; return g; });
  P.dims = { LH, TH, HW, HH, HD, H: LH + TH + HH };
  if (spec.build) spec.build(P, E, M);
  P.face = (e = "happy") => { if (!P.faces[e]) P.faces[e] = E.mat("#ffffff", { map: tex(512, 450, (g, w, h) => drawFace(g, w, h, spec.face, e)) }); P.faceMesh.material = P.faces[e]; };
  /** pose: {pos, yaw, roll, pitch, lean, armL:[x,z], armR:[x,z], legL, legR, head:[x,y,z], face, scale, y} (radians) */
  // break-apart sim: each part flies off, bounces on the floor (root-local, ground y = 0)
  const PARTS = [[P.head, [0, LH + TH, 0], 0.0, [0.6, 7.5, 1.6]], [P.torso, [0, LH, 0], 0.0, [-0.4, 4.5, 0.6]], [P.arms[0], [-0.54, LH + TH - 0.06, 0], 0.6, [-3.4, 6.0, 0.9]], [P.arms[1], [0.54, LH + TH - 0.06, 0], 0.6, [3.0, 6.8, 1.4]], [P.legs[0], [-0.2, LH, 0], 0.5, [-2.2, 3.6, 2.0]], [P.legs[1], [0.2, LH, 0], 0.5, [2.4, 4.2, 2.4]]];
  const rest = PARTS.map(([g]) => g.position.clone());
  const sim = (i, n, dir) => { const [, a, floor, v0] = PARTS[i]; let x = 0, y = a[1], z = 0, vx = v0[0] * dir[0], vy = v0[1] * dir[1], vz = v0[2] * dir[2], rx = 0, rz = 0, sx = 7 + i * 1.7, sz = 5 - i * 2.1; const dt = 1 / 30;
    for (let k = 0; k < n; k++) { vy -= 24 * dt; x += vx * dt; y += vy * dt; z += vz * dt; rx += sx * dt; rz += sz * dt; if (y < floor) { y = floor; vy = Math.abs(vy) > 1.2 ? -vy * 0.48 : 0; vx *= 0.72; vz *= 0.72; sx *= 0.55; sz *= 0.55; if (vy === 0) { sx *= 0.5; sz *= 0.5; } } }
    return { off: [x, y - a[1], z], rot: [rx, 0, rz] }; };
  /** pose: {pos, yaw, roll, pitch, lean, armL:[x,z], armR:[x,z], elbowL, elbowR, legL, legR, kneeL, kneeR, head:[x,y,z], face, scale,
   *  stretch:[sx,sy], eyePop 0..1, burst:{f, back 0..1, dir:[x,y,z]}} (radians) */
  P.pose = (p = {}) => {
    root.visible = p.visible !== false; const s = p.scale || 1, st = p.stretch || [1, 1]; root.scale.set(s * st[0], s * st[1], s * st[0]);
    root.position.set(...(p.pos || [0, 0, 0])); root.rotation.set(p.pitch || 0, p.yaw || 0, p.roll || 0, "YXZ");
    P.chest.rotation.set(p.lean || 0, p.twist || 0, p.sway || 0); P.torso.rotation.set(0, 0, 0);
    const aL = p.armL || [0, 0], aR = p.armR || [0, 0];
    P.arms[0].rotation.set(aL[0], 0, -(aL[1] || 0)); P.arms[1].rotation.set(aR[0], 0, aR[1] || 0);
    P.elbows[0].rotation.set(-(p.elbowL || 0), 0, 0); P.elbows[1].rotation.set(-(p.elbowR || 0), 0, 0);
    P.legs[0].rotation.set(p.legL || 0, 0, -(p.legLz || 0)); P.legs[1].rotation.set(p.legR || 0, 0, p.legRz || 0);
    P.knees[0].rotation.set(p.kneeL || 0, 0, 0); P.knees[1].rotation.set(p.kneeR || 0, 0, 0);
    const h = p.head || [0, 0, 0]; P.head.rotation.set(h[0] || 0, h[1] || 0, h[2] || 0); const hs = p.headScale || 1; P.head.scale.setScalar(hs);
    PARTS.forEach(([g], i) => g.position.copy(rest[i]));
    if (p.burst) { const k = 1 - (p.burst.back || 0), dir = p.burst.dir || [1, 1, 1]; PARTS.forEach(([g], i) => { const r = sim(i, Math.max(0, Math.round(p.burst.f)), dir); g.position.set(rest[i].x + r.off[0] * k, rest[i].y + r.off[1] * k, rest[i].z + r.off[2] * k); g.rotation.set(g.rotation.x * (1 - k) + r.rot[0] * k, g.rotation.y * (1 - k), g.rotation.z * (1 - k) + r.rot[2] * k); }); }
    const ep = p.eyePop || 0; P.popEyes.forEach((g) => { g.visible = ep > 0.01; g.scale.set(0.8 + ep * 0.2, 0.8 + ep * 0.2, Math.max(0.01, ep * 0.55)); });
    P.face(p.face || "happy");
  };
  P.pose({}); return P;
}

// ---------------- TOAST: orange hoodie, band-aid, missing tooth ----------------
export function makeToast(E) {
  return blocky(E, {
    skin: "#ffcf9e", shirt: "#ff8a1f", sleeve: "#ff8a1f", cuff: "#e06a10", pants: "#3f6fd8", shoe: "#f4f4f4",
    face: { skin: "#ffcf9e", gap: true, iris: "#4a2c1a", brow: "#7a4a22",
      extra: (g, W, H) => { g.save(); g.translate(W * 0.8, H * 0.13); g.rotate(-0.35); rr(g, -62, -22, 124, 44, 16); g.fillStyle = "#f2c9a0"; g.fill(); g.lineWidth = 7; g.strokeStyle = INK; g.stroke(); rr(g, -22, -16, 44, 32, 6); g.fillStyle = "#e3b184"; g.fill(); g.fillStyle = "#b98a62"; for (const [x, y] of [[-44, -8], [-44, 8], [44, -8], [44, 8]]) { g.beginPath(); g.arc(x, y, 3.5, 0, 7); g.fill(); } g.restore(); } },
    build: (P, E, M) => {
      const { HW, HH, HD, TH } = P.dims, hood = M("#ff8a1f"), dark = M("#e06a10");
      // hood shell (up), face stays open
      E.box(HW + 0.16, 0.14, HD + 0.14, hood, [0, HH - 0.02, -0.03], { parent: P.head });
      E.box(HW + 0.16, HH + 0.06, 0.14, hood, [0, 0, -HD / 2 - 0.03], { parent: P.head });
      for (const s of [-1, 1]) E.box(0.1, HH + 0.04, HD * 0.82, hood, [s * (HW / 2 + 0.03), 0, -0.1], { parent: P.head });
      E.box(0.3, 0.2, 0.3, hood, [0, HH + 0.1, -0.2], { parent: P.head, rot: [0.3, 0, 0] }); // hood tip
      // hair tuft poking out
      E.box(0.5, 0.1, 0.12, M("#8a5226"), [0.1, HH - 0.08, HD / 2 - 0.02], { parent: P.head });
      E.box(0.2, 0.16, 0.12, M("#8a5226"), [-0.22, HH - 0.16, HD / 2 - 0.02], { parent: P.head });
      // pocket + drawstrings + zip of hoodie
      E.box(0.5, 0.24, 0.05, dark, [0, 0.1, 0.24], { parent: P.torso });
      for (const s of [-1, 1]) { E.box(0.05, 0.26, 0.04, M("#ffffff"), [s * 0.14, TH - 0.34, 0.24], { parent: P.torso }); E.box(0.07, 0.07, 0.05, M("#ffe14a"), [s * 0.14, TH - 0.38, 0.245], { parent: P.torso }); }
      E.box(0.84, 0.1, 0.5, dark, [0, 0, 0], { parent: P.torso });
      // shoe stripes
      P.knees.forEach((g) => E.box(0.39, 0.05, 0.3, M("#ff4d4d"), [0, -0.32, 0.1], { parent: g }));
    },
  });
}

// ---------------- PIXI: purple block ponytail, headphones, skateboard ----------------
export function makePixi(E) {
  const P = blocky(E, {
    skin: "#c98d62", shirt: "#23232e", sleeve: "#23232e", cuff: "#19e0c6", pants: "#5a43b8", shoe: "#19e0c6", sock: "#ffffff",
    face: { skin: "#c98d62", iris: "#3b2a6e", brow: "#6a2fb0", lid: "#b77d55", cheek: "rgba(255,110,140,0.3)" },
    build: (P, E, M) => {
      const { HW, HH, HD, TH } = P.dims, hair = M("#9b4dff"), hairD = M("#7a32d8"), teal = M("#19e0c6"), blk = M("#23232e");
      E.box(HW + 0.08, 0.2, HD + 0.08, hair, [0, HH - 0.08, 0], { parent: P.head });           // cap
      E.box(HW + 0.08, HH * 0.8, 0.12, hair, [0, 0.2, -HD / 2 - 0.02], { parent: P.head });      // back
      E.box(0.42, 0.26, 0.1, hair, [-0.3, HH - 0.3, HD / 2 + 0.01], { parent: P.head });         // side fringe
      E.box(0.3, 0.14, 0.1, hairD, [0.25, HH - 0.2, HD / 2 + 0.01], { parent: P.head });
      for (const s of [-1, 1]) E.box(0.1, 0.4, 0.34, hair, [s * (HW / 2 + 0.02), HH - 0.5, 0.2], { parent: P.head });
      // block ponytail (3 shrinking cubes), swings via P.tail
      P.tail = E.group(P.head, [0, HH - 0.02, -HD / 2 - 0.06]);
      E.box(0.2, 0.12, 0.2, teal, [0, -0.02, -0.02], { parent: P.tail });
      const t1 = E.group(P.tail, [0, 0.06, -0.14]); E.box(0.36, 0.36, 0.36, hair, [0, 0, 0], { parent: t1, center: true });
      P.tail2 = E.group(t1, [0, -0.2, -0.22]); E.box(0.3, 0.3, 0.3, hairD, [0, 0, 0], { parent: P.tail2, center: true });
      P.tail3 = E.group(P.tail2, [0, -0.24, -0.1]); E.box(0.22, 0.22, 0.22, hair, [0, 0, 0], { parent: P.tail3, center: true });
      // headphones
      E.box(HW + 0.3, 0.1, 0.16, blk, [0, HH + 0.12, 0.02], { parent: P.head });
      for (const s of [-1, 1]) { E.box(0.1, 0.5, 0.14, blk, [s * (HW / 2 + 0.11), HH - 0.34, 0.02], { parent: P.head }); E.box(0.16, 0.38, 0.38, teal, [s * (HW / 2 + 0.13), 0.2, 0.02], { parent: P.head }); E.box(0.04, 0.2, 0.2, blk, [s * (HW / 2 + 0.215), 0.29, 0.02], { parent: P.head }); }
      // jacket details: teal zip + star block
      E.box(0.07, TH - 0.08, 0.04, teal, [0, 0.04, 0.235], { parent: P.torso });
      E.box(0.16, 0.16, 0.04, M("#ffe14a"), [0.22, TH - 0.3, 0.235], { parent: P.torso, rot: [0, 0, 0.78] });
      E.box(0.84, 0.1, 0.5, teal, [0, 0, 0], { parent: P.torso });
    },
  });
  // skateboard (separate object)
  const b = E.group(null); P.board = b;
  E.box(0.5, 0.06, 1.5, E.mat("#ff4fa3"), [0, 0.17, 0], { parent: b });
  E.box(0.5, 0.062, 0.2, E.mat("#ffe14a"), [0, 0.17, 0], { parent: b });
  for (const z of [-0.5, 0.5]) { E.box(0.4, 0.06, 0.12, E.mat("#9aa3b2"), [0, 0.11, z], { parent: b }); for (const s of [-1, 1]) E.cyl(0.09, 0.09, 0.1, E.mat("#f4f4f4"), [s * 0.24, 0.09, z], { parent: b, center: true, rot: [0, 0, Math.PI / 2], seg: 10 }); }
  P.boardAt = (pos, yaw = 0, roll = 0, pitch = 0, vis = true) => { b.visible = vis; b.position.set(...pos); b.rotation.set(pitch, yaw, roll, "YXZ"); };
  return P;
}

// ---------------- DONUTSAURUS: a walking donut with dino head, tail and legs ----------------
export function makeDonutsaurus(E) {
  const M = (c) => E.mat(c), root = E.group(null), P = { root };
  const R0 = 0.78, r0 = 0.36, CY = 0.55 + R0 + r0 - 0.25;
  P.body = E.group(root, [0, CY, 0]);
  const flatShade = (m) => { m.flatShading = true; return m; };
  const dough = new THREE.Mesh(new THREE.TorusGeometry(R0, r0, 6, 12), flatShade(M("#e7b06a").clone())); E.add(dough, P.body);
  // icing: only the front half of a slightly fatter torus
  const ig = new THREE.TorusGeometry(R0, r0 * 1.08, 6, 12).toNonIndexed(), pos = ig.attributes.position, keep = [];
  for (let i = 0; i < pos.count; i += 6) { let z = 0; for (let k = 0; k < 6; k++) z += pos.getZ(i + k) / 6; if (z > r0 * 0.45) for (let k = 0; k < 6; k++) keep.push(pos.getX(i + k), pos.getY(i + k), pos.getZ(i + k)); }
  const ig2 = new THREE.BufferGeometry(); ig2.setAttribute("position", new THREE.Float32BufferAttribute(keep, 3)); ig2.computeVertexNormals();
  const ice = new THREE.Mesh(ig2, flatShade(M("#ff7fb8").clone())); ice.position.z = 0.03; E.add(ice, P.body);
  // drips + sprinkles (little blocks)
  const cols = ["#ffffff", "#ffe14a", "#19e0c6", "#9b4dff", "#ff4d4d", "#4d9bff"]; let sd = 7; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 26; i++) { const a = rnd() * Math.PI * 2, rad = R0 + (rnd() - 0.5) * r0 * 1.1, off = (rad - R0) / (r0 * 1.08); const z = Math.sqrt(Math.max(0.05, 1 - off * off)) * r0 * 1.08 + 0.04; const m = E.box(0.13, 0.05, 0.05, M(cols[i % cols.length]), [Math.cos(a) * rad, Math.sin(a) * rad, z], { parent: P.body, center: true, rot: [0, 0, rnd() * 3.14], noShadow: true }); m.rotation.x = -off * 0.9 * Math.sin(a); }
  const green = M("#57c84d"), greenD = M("#3da33a"), belly = M("#d8f08a");
  // head on a short neck, top of the donut
  P.neck = E.group(P.body, [0, R0 + r0 * 0.55, 0.05]);
  E.box(0.42, 0.34, 0.4, green, [0, 0, 0], { parent: P.neck });
  P.head = E.group(P.neck, [0, 0.3, 0.05]); P.head.scale.setScalar(1.3);
  E.box(0.74, 0.56, 0.62, green, [0, 0, 0], { parent: P.head });
  E.box(0.6, 0.3, 0.5, green, [0, 0.08, 0.5], { parent: P.head });                 // snout top
  for (const s of [-1, 1]) E.box(0.07, 0.07, 0.06, greenD, [s * 0.16, 0.3, 0.74], { parent: P.head }); // nostrils
  P.jaw = E.group(P.head, [0, 0.08, 0.2]);
  E.box(0.54, 0.12, 0.52, belly, [0, -0.12, 0.02], { parent: P.jaw });
  for (let i = 0; i < 4; i++) { E.box(0.09, 0.1, 0.07, M("#ffffff"), [-0.2 + i * 0.133, 0.0, 0.49], { parent: P.head, noShadow: true }); E.box(0.08, 0.08, 0.06, M("#ffffff"), [-0.2 + i * 0.133, 0, 0.44], { parent: P.jaw, noShadow: true }); }
  E.box(0.34, 0.03, 0.3, M("#f0707a"), [0, 0.0, 0.1], { parent: P.jaw, noShadow: true });
  P.eyes = [-1, 1].map((s) => { const g = E.group(P.head, [s * 0.22, 0.4, 0.31]); E.box(0.24, 0.26, 0.05, M("#ffffff"), [0, 0, 0], { parent: g, noShadow: true }); const p = E.box(0.12, 0.14, 0.03, M("#221a26"), [0, 0.04, 0.03], { parent: g, noShadow: true }); g.userData.pupil = p; E.box(0.3, 0.06, 0.08, greenD, [0, 0.27, 0.01], { parent: g, rot: [0, 0, -s * 0.2] }); return g; });
  for (let i = 0; i < 3; i++) E.box(0.12, 0.16 - i * 0.02, 0.14, M("#ff8a1f"), [0, 0.56, 0.1 - i * 0.22], { parent: P.head }); // head spikes
  // tiny arms
  P.arms = [-1, 1].map((s) => { const g = E.group(P.body, [s * (R0 + r0 * 0.75), 0.12, 0.22]); E.box(0.15, 0.15, 0.38, green, [0, -0.07, 0.02], { parent: g }); for (const k of [-1, 1]) E.box(0.05, 0.05, 0.1, M("#ffffff"), [k * 0.045, -0.05, 0.4], { parent: g, noShadow: true }); return g; });
  // legs
  P.legs = [-1, 1].map((s) => { const g = E.group(root, [s * 0.4, 0.62, 0]); E.box(0.34, 0.5, 0.36, green, [0, -0.52, 0], { parent: g }); E.box(0.42, 0.14, 0.6, greenD, [0, -0.62, 0.1], { parent: g }); for (const k of [-1, 0, 1]) E.box(0.09, 0.08, 0.1, M("#ffffff"), [k * 0.14, -0.62, 0.42], { parent: g, noShadow: true }); return g; });
  // tail (3 tapering blocks with spikes), behind
  P.tail = E.group(P.body, [0, -R0 * 0.55, -r0 * 0.8]); let tg = P.tail; P.tailSeg = [];
  [[0.5, 0.42, 0.6], [0.38, 0.32, 0.55], [0.26, 0.22, 0.5]].forEach(([w, h, d], i) => { const g = E.group(tg, [0, i ? -0.02 : 0, i ? -[0, 0.55, 0.5][i] : 0]); E.box(w, h, d, i === 2 ? greenD : green, [0, -h / 2, -d / 2], { parent: g, center: true }); E.box(0.1, 0.14, 0.14, M("#ff8a1f"), [0, 0, -d / 2], { parent: g }); P.tailSeg.push(g); tg = g; });
  /** pose: {pos, yaw, roll, pitch, scale, jaw 0..1, head:[x,y,z], legL, legR, tail, tailY, armUp, look:[x,y], squash} */
  P.pose = (p = {}) => {
    root.visible = p.visible !== false; root.scale.setScalar(p.scale || 1); root.position.set(...(p.pos || [0, 0, 0])); root.rotation.set(p.pitch || 0, p.yaw || 0, p.roll || 0, "YXZ");
    const sq = p.squash || 0; P.body.scale.set(1 + sq * 0.5, 1 - sq, 1 + sq * 0.5); P.body.position.y = CY - sq * 0.5; P.body.rotation.set(p.lean || 0, 0, p.sway || 0);
    P.jaw.rotation.x = (p.jaw || 0) * 0.75; const h = p.head || [0, 0, 0]; P.head.rotation.set(h[0] || 0, h[1] || 0, h[2] || 0);
    P.legs[0].rotation.x = p.legL || 0; P.legs[1].rotation.x = p.legR || 0;
    P.tailSeg.forEach((g, i) => g.rotation.set((p.tail ?? 0.25) * (i ? 1 : 0.6), (p.tailY || 0), 0));
    P.arms.forEach((g) => (g.rotation.x = -(p.armUp || 0)));
    const lk = p.look || [0, 0]; P.eyes.forEach((g) => { g.userData.pupil.position.x = lk[0] * 0.05; g.userData.pupil.position.y = 0.06 + lk[1] * 0.05; g.scale.y = p.blink ? 0.15 : 1; });
  };
  P.pose({}); return P;
}
