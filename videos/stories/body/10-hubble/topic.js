// "Hubble is falling. Can anyone save it?" — topic file (shared engine + common.js)
function hubble(t, x, y, s, o = {}) {   // our own flat Hubble: silver tube, aperture door, two solar wings, a docking ring at the back
  ctx.save(); ctx.translate(x, y); ctx.rotate((o.rot ?? -0.15) + Math.sin(t * 0.5) * 0.03); ctx.scale(s, s);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(-20, sd * 70); rr2(-6, sd > 0 ? 0 : -60, 12, 60, 4, '#9aa6c4'); ctx.translate(0, sd * 60); rr2(-110, sd > 0 ? 0 : -44, 220, 44, 6, '#2f5fb5'); for (let i = 0; i < 6; i++) rr2(-104 + i * 36, sd > 0 ? 4 : -40, 30, 36, 3, '#3f74d0'); ctx.restore(); }
  rr2(-200, -58, 400, 116, 40, '#d9dde6'); rr2(-200, -58, 400, 40, 30, '#eef1f6'); for (let i = 0; i < 4; i++) rr2(-150 + i * 80, -58, 6, 116, 3, 'rgba(120,130,150,0.35)'); rr2(-260, -48, 70, 96, 20, '#b8bfcc');
  const door = 0.4 + 0.25 * Math.sin(t * 0.8); ctx.save(); ctx.translate(200, -58); ctx.rotate(-door); rr2(0, -6, 110, 14, 7, '#c9ced9'); ctx.restore(); circ(200, 0, 46, '#20232f'); circ(200, 0, 24, '#3a4a6a'); circ(194, -8, 6, 'rgba(255,255,255,0.6)');
  if (o.ring) { const p = 0.6 + 0.4 * Math.sin(t * 4); ctx.save(); ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 20 * p; ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(-262, 0, 14, 52, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  rr2(-150, -50, 120, 12, 6, 'rgba(255,255,255,0.6)'); glint(t, 200, 60, 3); ctx.restore();
}
function earthLimb(t, cy, R, glow = 0) {   // a big curved Earth at the bottom with a thin atmosphere glow
  const g = ctx.createRadialGradient(960, cy, R * 0.9, 960, cy, R + 60 + glow * 50); g.addColorStop(0, 'rgba(120,200,255,0.0)'); g.addColorStop(0.9, `rgba(120,200,255,${0.25 + glow * 0.35})`); g.addColorStop(1, 'rgba(120,200,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(960, cy, R + 60 + glow * 50, 0, 6.283); ctx.fill();
  const e = ctx.createLinearGradient(0, cy - R, 0, cy - R + 300); e.addColorStop(0, '#4f9be0'); e.addColorStop(1, '#1e4f96'); ctx.fillStyle = e; ctx.beginPath(); ctx.arc(960, cy, R, 0, 6.283); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(960, cy, R, 0, 6.283); ctx.clip(); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#5fbf6a'; ctx.beginPath(); ctx.ellipse(((i * 420 + t * 12) % 2600) - 340, cy - R + 60 + (i % 3) * 50, 140, 40, 0, 0, 6.283); ctx.fill(); } for (let i = 0; i < 5; i++) rr2(((i * 530 + t * 20) % 2600) - 300, cy - R + 30 + (i % 2) * 70, 220, 24, 12, 'rgba(255,255,255,0.5)'); ctx.restore();
}
Object.assign(ICONS, {
  hubbleI(t) { hubble(t, 0, 0, 0.32, {}); },
  sunI(t) { ctx.save(); ctx.rotate(t * 0.3); ctx.fillStyle = '#ffd98a'; for (let i = 0; i < 12; i++) { ctx.rotate(6.283 / 12); rr2(-6, -78 - Math.sin(t * 4 + i) * 8, 12, 24, 6, '#ffb35c'); } ctx.restore(); circ(0, 0, 56, '#ffcf5a'); circ(-14, -14, 16, '#fff0b8'); },
  shuttle(t) { ctx.save(); ctx.rotate(-0.2); ctx.fillStyle = '#f3f7fb'; ctx.beginPath(); ctx.moveTo(90, 0); ctx.quadraticCurveTo(70, -20, 0, -22); ctx.lineTo(-80, -22); ctx.lineTo(-80, 22); ctx.lineTo(0, 22); ctx.quadraticCurveTo(70, 20, 90, 0); ctx.fill(); ctx.fillStyle = '#d9dde6'; ctx.beginPath(); ctx.moveTo(-20, 22); ctx.lineTo(-80, 60); ctx.lineTo(-80, 22); ctx.fill(); rr2(-90, -40, 20, 80, 6, '#3a3f5a'); rr2(40, -14, 24, 10, 5, '#20232f'); for (let i = 0; i < 3; i++) { const p = (t * 2 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(-100 - p * 60, (i - 1) * 14, 10 + p * 10, '#ffb35c'); ctx.restore(); } ctx.restore(); },
  glasses(t) { for (const sd of [-1, 1]) { circ(sd * 46, 0, 38, '#3a3f5a'); circ(sd * 46, 0, 30, 'rgba(200,235,255,0.6)'); rr2(sd * 46 - 20, -16, 16, 6, 3, 'rgba(255,255,255,0.8)'); } rr2(-10, -6, 20, 8, 4, '#3a3f5a'); },
  galaxies(t) { for (let i = 0; i < 22; i++) { const r = rng(i * 11 + 3); const x = (r() - 0.5) * 160, y = (r() - 0.5) * 120, s = 4 + r() * 12; ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 3 + t * 0.2); ctx.fillStyle = ['#ffd98a', '#8fd8e6', '#ff8fd8', '#ffffff'][i % 4]; ctx.globalAlpha *= 0.6 + 0.4 * Math.sin(t * 2 + i); ctx.beginPath(); ctx.ellipse(0, 0, s, s * 0.45, 0, 0, 6.283); ctx.fill(); ctx.restore(); } },
  swift(t) { rr2(-60, -40, 120, 80, 14, '#d9dde6'); rr2(-60, -40, 120, 24, 12, '#eef1f6'); circ(66, 0, 22, '#20232f'); for (const sd of [-1, 1]) rr2(-50, sd > 0 ? 44 : -84, 100, 40, 6, '#2f5fb5'); },
  rescuer(t) { rr2(-40, -30, 80, 60, 14, '#c9ced9'); for (const sd of [-1, 1]) rr2(-30, sd > 0 ? 34 : -64, 60, 30, 5, '#d9a066'); ctx.save(); ctx.translate(44, 0); ctx.rotate(Math.sin(t * 2) * 0.3); rr2(0, -5, 50, 10, 5, '#9aa6c4'); circ(52, 0, 9, '#ffd98a'); ctx.restore(); const p = (t * 2) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(-50 - p * 30, 0, 8 + p * 8, '#8fd8e6'); ctx.restore(); },
  bus(t) { rr2(-110, -50, 220, 90, 18, '#ffd36b'); for (let i = 0; i < 4; i++) rr2(-96 + i * 50, -38, 40, 30, 6, '#8fd8e6'); for (const wx of [-66, 66]) { circ(wx, 44, 18, '#16213a'); circ(wx, 44, 7, '#9aa6c4'); } },
  calendarH(t, o) { rr2(-50, -48, 100, 100, 14, '#f3f7fb'); rr2(-50, -48, 100, 30, 12, '#e2457a'); font(16, 700); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.head || 'YEAR', 0, -33); font(34, 700); ctx.fillStyle = '#102348'; ctx.fillText(o.text || '2033', 0, 16); },
  ring(t) { const p = 0.6 + 0.4 * Math.sin(t * 4); ctx.save(); ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = 20 * p; ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 14; ctx.beginPath(); ctx.ellipse(0, 0, 40, 70, 0, 0, 6.283); ctx.stroke(); ctx.restore(); for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * 2.094); circ(0, -70, 8, '#e2457a'); ctx.restore(); } },
  fireball(t) { for (let i = 0; i < 4; i++) { const p = (t * 1.5 + i / 4) % 1; ctx.save(); ctx.globalAlpha *= 1 - p; circ(-p * 60, p * 34, 24 + p * 18, ['#ff6f3c', '#ff9a3c', '#ffd98a', '#ffffff'][i]); ctx.restore(); } circ(10, -6, 26, '#ffffff'); circ(10, -6, 18, '#d9dde6'); },
  skylab(t) { ctx.save(); ctx.rotate(Math.sin(t) * 0.1); rr2(-80, -26, 160, 52, 20, '#d9dde6'); rr2(-20, -80, 40, 54, 6, '#2f5fb5'); rr2(-20, 26, 40, 54, 6, '#2f5fb5'); ctx.restore(); font(16, 700); ctx.fillStyle = GOLD; ctx.textAlign = 'center'; ctx.fillText('1979', 0, 110); },
  webb(t) { for (let r = -1; r <= 1; r++) for (let c = -1; c <= 1; c++) { if (Math.abs(r) + Math.abs(c) > 1 && Math.abs(r) === 1 && Math.abs(c) === 1 && (r + c) % 2) continue; const x = c * 34 + (r % 2 ? 17 : 0), y = r * 30; ctx.fillStyle = `rgb(${220 + 20 * Math.sin(t * 2 + r + c) | 0},170,60)`; ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + 0.52; ctx.lineTo(x + Math.cos(a) * 18, y + Math.sin(a) * 18); } ctx.fill(); } rr2(-80, 60, 160, 16, 6, '#b48cff'); rr2(-60, 80, 120, 10, 5, '#9f7fe6'); },
  uv(t) { for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * ((t * 2 + i / 4) % 1); ctx.strokeStyle = '#b48cff'; ctx.lineWidth = 8; ctx.beginPath(); for (let x = -70; x <= 70; x += 4) ctx.lineTo(x, Math.sin(x * 0.12 + t * 6) * 14 + (i - 1.5) * 26); ctx.stroke(); ctx.restore(); } },
  planet(t) { circ(0, 0, 50, '#5aa9e6'); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 50, 0, 6.283); ctx.clip(); rr2(-60, -10, 120, 14, 7, 'rgba(255,255,255,0.3)'); ctx.restore(); ctx.strokeStyle = 'rgba(180,140,255,0.6)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 60 + Math.sin(t * 3) * 3, 0, 6.283); ctx.stroke(); },
  gyro(t) { circ(0, 0, 50, '#5b6585'); ctx.save(); ctx.rotate(t * 6); rr2(-44, -6, 88, 12, 6, '#c9d6ec'); ctx.restore(); circ(0, 0, 12, '#ffd98a'); },
});
Object.assign(IDLE, { hubbleI: {}, sunI: {}, shuttle: {}, glasses: { pre: t => ctx.rotate(Math.sin(t * 1.5) * 0.06) }, galaxies: {}, swift: { pre: t => ctx.rotate(Math.sin(t * 0.8) * 0.1) }, rescuer: {}, bus: {}, calendarH: { pre: t => ctx.rotate(Math.sin(t * 1.6) * 0.05) }, ring: {}, fireball: {}, skylab: {}, webb: { post: t => glint(t, 70, 60) }, uv: {}, planet: {}, gyro: {} });

function sOpen(t) {
  worldBG(t, 'night'); earthLimb(t, 1900, 1100); reg('panel', 'earth', 0, 800, W, 1080);
  if (t < S('c4q') - 0.1) { const drop = t > W_('c2', 'dragging') ? clamp((t - W_('c2', 'dragging')) / 6) * 80 : 0; hubble(t, 960, 420 + drop, 1.3); reg('hero', 'hubble', 960 - 360, 420 + drop - 230, 960 + 420, 420 + drop + 230);
    tag('NO ENGINE OF ITS OWN', 360, 140, t, W_('c2', 'engine'), S('c3') - 0.3, '#5b4fd6', 34); label('LIKELY FALL: 2033–2034', 1560, 140, t, W_('c2', ['2033', 'twenty']), S('c3') - 0.3, GOLD, 32);
    if (t > S('c3') - 0.1) label('THIS MONTH: ANOTHER NASA TELESCOPE BURNED UP', 960, 760, t, W_('c3', 'month'), S('c4q') - 0.3, '#ff9fb4', 28); return; }
  hubble(t, 960, 420, 1.3); reg('hero', 'hubble', 600, 190, 1380, 650); label('CAN ANYONE SAVE IT?', 960, 120, t, S('c4q') + 0.2, S('f1') - 0.4, GOLD, 40);
}
function sDecay(t) {
  worldBG(t, 'night');
  if (t < S('f4q') - 0.1) { earthLimb(t, 1900, 1100, 0.2); reg('panel', 'earth', 0, 800, W, 1080); hubble(t, 1100, 380, 0.9); reg('hero', 'hubble', 840, 220, 1400, 540);
    for (let i = 0; i < 40; i++) { const r = rng(i * 7 + 1), x = ((r() * W - t * 300 * (0.5 + r())) % W + W) % W, y = 120 + r() * 600; circ(x, y, 3, 'rgba(180,220,255,0.6)'); }
    label('~27,000 KM/H', 400, 200, t, W_('f2', 'kilometres', 1) - 0.4, S('f3') - 0.3, GOLD, 36); label('STRAY GAS MOLECULES', 400, 300, t, W_('f2', 'molecules'), S('f3') - 0.3, WHITE, 30);
    if (t > S('f3') - 0.1) { ctx.strokeStyle = 'rgba(255,217,138,0.7)'; ctx.lineWidth = 5; ctx.setLineDash([16, 12]); ctx.beginPath(); for (let a = 0; a < 6.283 * 2.5; a += 0.05) { const r = 300 - a * 12; ctx.lineTo(400 + Math.cos(a + t * 0.3) * r, 620 + Math.sin(a + t * 0.3) * r * 0.35); } ctx.stroke(); ctx.setLineDash([]); reg('hero', 'spiral', 90, 500, 710, 740); tag('A SLOW SPIRAL DOWN', 400, 820, t, W_('f3', 'spiral'), S('f4q') - 0.3, '#5b4fd6', 36); } return; }
  if (t < S('f6') - 0.1) { earthLimb(t, 1900, 1100, clamp((t - W_('f5', 'puffs')) / 1.5)); reg('panel', 'earth', 0, 800, W, 1080); placeIcon('sunI', [[400, 330]], 2.4, t, S('f4q'), S('f6') - 0.2, { hw: 84, hh: 84 }); hubble(t, 1300, 400, 0.8); reg('hero', 'hubble', 1060, 250, 1560, 560);
    label('THE ATMOSPHERE PUFFS UP', 960, 120, t, W_('f5', 'puffs'), S('f6') - 0.3, GOLD, 32); label('11-YEAR SOLAR CYCLE · JUST PEAKED', 400, 620, t, W_('f5', 'eleven'), S('f6') - 0.3, WHITE, 26); return; }
  earthLimb(t, 1900, 1100, 0.3); reg('panel', 'earth', 0, 800, W, 1080); hubble(t, 960, 380 + clamp((t - S('f6')) / 6) * 120, 0.9); reg('hero', 'hubble', 700, 220, 1260, 660);
  label('DOWN BY TENS OF KILOMETRES', 400, 160, t, W_('f6', 'tens'), S('h1') - 0.4, WHITE, 28); tag('BELOW ~400 KM: ABOUT A YEAR LEFT', 1500, 160, t, W_('f6', 'four'), S('h1') - 0.4, '#e2457a', 30);
  if (t > S('f6b') - 0.1) label('A LAP EVERY ~95 MINUTES · ~15 A DAY', 960, 760, t, W_('f6b', 'ninety'), S('h1') - 0.4, GOLD, 28);
}
function sHistory(t) {
  worldBG(t, 'indigo');
  if (t < S('h3') - 0.1) { placeIcon('shuttle', [[480, 420]], 2.2, t, S('h1') + 1.0, S('h3') - 0.2, { hw: 100, hh: 64 }); label('APRIL 1990', 480, 700, t, W_('h2', 'april'), S('h3') - 0.3, GOLD, 36);
    hubble(t, 1360, 440, 0.8); reg('hero', 'hubble', 1100, 300, 1620, 580); if (t > W_('h2', 'blurry') - 0.3) { ctx.save(); ctx.filter = 'blur(10px)'; placeIcon('galaxies', [[1360, 780]], 1.6, t, W_('h2', 'blurry') - 0.3, S('h3') - 0.2, { hw: 90, hh: 70 }); ctx.restore(); }
    label('MIRROR OFF BY < 1/50 OF A HAIR', 1360, 160, t, W_('h2', 'fiftieth'), S('h3') - 0.3, '#ff9fb4', 28); return; }
  if (t < S('h4q') - 0.1) { placeIcon('glasses', [[560, 460]], 2.6, t, S('h3'), S('h4q') - 0.2, { hw: 90, hh: 40 }); label('1993: GLASSES FOR A TELESCOPE', 560, 680, t, W_('h3', ['1993', 'nineteen']), S('h3b') - 0.3, GOLD, 30); label('5 SHUTTLE SERVICE MISSIONS · LAST IN 2009', 1340, 300, t, W_('h3', 'five'), S('h4q') - 0.3, WHITE, 26);
    if (t > S('h3b') - 0.1) { placeIcon('bus', [[1340, 600]], 1.8, t, W_('h3b', 'bus') - 0.3, S('h4q') - 0.2, { hw: 112, hh: 64 }); label('13 M LONG · 2.4 M MIRROR', 1340, 820, t, W_('h3b', 'thirteen'), S('h4q') - 0.3, GOLD, 28); } return; }
  if (t < S('h6b') - 0.1) { placeIcon('galaxies', [[560, 470]], 3.2, t, S('h4q'), S('h6b') - 0.2, { hw: 90, hh: 70 }); bigNumber(t, 1340, 330, W_('h5', 'million') - 0.4, S('h6') - 0.3, '1.5 M+', 'OBSERVATIONS');
    label('AGE OF THE UNIVERSE: ~13.8 BILLION YEARS', 1340, 560, t, W_('h5', 'thirteen'), S('h6') - 0.3, WHITE, 26); if (t > S('h6') - 0.1) { tag('EXPANSION IS SPEEDING UP', 1340, 380, t, W_('h6', 'speeding'), S('h6b') - 0.3, '#5b4fd6', 36); label('→ A NOBEL PRIZE', 1340, 500, t, W_('h6', 'nobel'), S('h6b') - 0.3, GOLD, 30); } return; }
  if (t < S('h6c') - 0.1) { if (t < S('h6d') - 0.1) { placeIcon('galaxies', [[560, 470]], 3.6, t, S('h6b'), S('h6d') - 0.2, { hw: 90, hh: 70 }); tag('DEEP FIELD · 1995', 1340, 380, t, W_('h6b', 'deep'), S('h6d') - 0.3, '#5b4fd6', 38); label('~3,000 GALAXIES IN A SPECK OF SKY', 1340, 520, t, W_('h6b', 'three'), S('h6d') - 0.3, WHITE, 26); return; }
    tile3(t, [['planet', 'COMET HITS JUPITER · 1994', '#c8553d', W_('h6d', 'comet')], ['galaxies', 'PILLARS OF CREATION · 1995', '#5b4fd6', W_('h6d', 'pillars')], ['ring', 'BLACK HOLES IN GALAXIES', '#20232f', W_('h6d', 'black')]], 520); return; }
  placeIcon('gyro', [[620, 480]], 2.8, t, S('h6c'), S('s1') - 0.3, { hw: 52, hh: 52 }); label('GYROSCOPES FAILING', 1320, 380, t, W_('h6c', 'gyroscopes'), S('s1') - 0.4, WHITE, 32); tag('SINCE 2024: ONE-GYRO MODE', 1320, 520, t, W_('h6c', ['2024', 'twenty']), S('s1') - 0.4, '#9b3352', 36);
}
function sSwift(t) {
  worldBG(t, 'night'); earthLimb(t, 1900, 1100, 0.2); reg('panel', 'earth', 0, 800, W, 1080);
  if (t < S('s5q') - 0.1) { const fall = t > S('s4') ? clamp((t - W_('s4', 'november')) / 3) : 0; placeIcon('swift', [[960, 380 + fall * 300]], 2.2, t, S('s1') + 1.0, S('s5q') - 0.2, { hw: 70, hh: 90 });
    if (fall > 0.6) placeIcon('fireball', [[1400, 640]], 1.6, t, W_('s4', 'burned') - 0.2, S('s5q') - 0.2, { hw: 80, hh: 60 });
    label('SWIFT · GAMMA-RAY BURST HUNTER', 960, 120, t, W_('s2', 'swift'), S('s3') - 0.3, GOLD, 30);
    if (t > S('s3') - 0.1 && t < S('s4') - 0.1) { placeIcon('rescuer', [[480, 420]], 2.0, t, W_('s3', 'robotic') - 0.3, S('s4') - 0.2, { hw: 80, hh: 66 }); label('2026 · STARTUP KATALYST', 960, 120, t, W_('s3', 'katalyst'), S('s4') - 0.3, WHITE, 30); }
    if (t > S('s4') - 0.1) { tag('RESCUE CALLED OFF', 960, 120, t, W_('s4', 'called'), S('s5q') - 0.3, '#e2457a', 40); } return; }
  if (t < S('s7q') - 0.1) { hubble(t, 700, 420, 1.0); reg('hero', 'hubble', 420, 250, 1020, 600); placeIcon('bus', [[1480, 420]], 2.0, t, W_('s6', 'bus') - 0.3, S('s7q') - 0.2, { hw: 112, hh: 64 }); label('~11.5 TONNES ≈ A SCHOOL BUS', 1160, 700, t, W_('s6', 'eleven'), S('s7q') - 0.3, GOLD, 30); return; }
  placeIcon('shuttle', [[560, 420]], 2.2, t, S('s7q'), S('t1') - 0.3, { hw: 100, hh: 64 }); stamp(0, 760, 300, t, W_('s8', 'retired')); label('SHUTTLE RETIRED · 2011', 560, 660, t, W_('s8', 'retired'), S('t1') - 0.4, WHITE, 30);
  if (t > S('s9') - 0.1) label('GRAB 11 TONNES · NEVER TOUCH THE MIRROR', 1340, 420, t, W_('s9', 'grab'), S('t1') - 0.4, GOLD, 26);
}
function sDeadline(t) {
  worldBG(t, 'grey');
  if (t < S('t4') - 0.1) { [['2030', '<10%', 't2', 'under'], ['2032', 'BOOST BY', 't3', '2032'], ['2033', 'MOST LIKELY', 't2', 'likely']].forEach(([yr, hd, id, w], i) => placeIcon('calendarH', [[400 + i * 560, 470]], 2.4, t, W_(id, [w, 'twenty']) - 0.3, S('t4') - 0.2, { head: hd, text: yr, hw: 52, hh: 52 }));
    label('CHANCE OF FALLING BEFORE 2030: UNDER 10%', 960, 820, t, W_('t2', 'under'), S('t3') - 0.3, WHITE, 28); tag('A RESCUE MUST LAUNCH BY 2032', 960, 820, t, W_('t3', 'launch'), S('t4') - 0.3, '#e2457a', 36); return; }
  if (t < S('t5q') - 0.1) { placeIcon('doc2', [[560, 470]], 2.6, t, S('t4'), S('t5q') - 0.2, { hw: 52, hh: 66 }); label('OCT 29: NASA ASKS COMPANIES', 1320, 380, t, W_('t4', 'october'), S('t5q') - 0.3, WHITE, 30); tag('ANSWERS DUE NOV 30', 1320, 500, t, W_('t4', 'november'), S('t5q') - 0.3, '#5b4fd6', 38); label('"IMPORTANT SCIENCE AHEAD OF IT"', 1320, 640, t, W_('t4', 'important'), S('t5q') - 0.3, GOLD, 26); return; }
  placeIcon('rescuer', [[560, 440]], 2.2, t, S('t5q'), S('v1q') - 0.3, { hw: 80, hh: 66 }); label('2022: NASA + SPACEX STUDY', 1320, 340, t, W_('t6', ['2022', 'twenty']), S('v1q') - 0.4, WHITE, 28); label('2024: NASA SAYS NO', 1320, 450, t, W_('t6', 'decided'), S('v1q') - 0.4, '#ff9fb4', 28);
  if (t > S('t7') - 0.1) tag('NOW ISAACMAN RUNS NASA', 1320, 600, t, W_('t7', 'isaacman'), S('v1q') - 0.4, '#9b3352', 36);
}
function sOptions(t) {
  worldBG(t, 'night');
  if (t < S('v5q') - 0.1) { tile3(t, [['rescuer', '1 · BOOST IT HIGHER', '#5b4fd6', W_('v2', 'one')], ['shuttle', '2 · SERVICE IT AGAIN', '#127b84', W_('v3', 'two')], ['fireball', '3 · STEER IT DOWN', '#9b3352', W_('v4', 'three')]], 520); return; }
  hubble(t, 1100, 450, 1.1, { ring: t > W_('v6', 'ring') - 0.3 }); reg('hero', 'hubble', 780, 260, 1560, 640); label('2009: A DOCKING RING', 520, 160, t, W_('v6', 'ring') - 0.2, S('u1') - 0.4, GOLD, 32); label('TARGETS FOR A FUTURE SPACECRAFT', 520, 240, t, W_('v6', 'targets'), S('u1') - 0.4, WHITE, 26);
  if (t > S('v7') - 0.1) { placeIcon('rescuer', [[300, 700]], 1.6, t, S('v7'), S('u1') - 0.3, { hw: 80, hh: 66 }); label('DOCK · FIRE GENTLY · RISE', 960, 900, t, W_('v7', 'docking'), S('u1') - 0.4, GOLD, 32); }
}
function sFall(t) {
  worldBG(t, 'night');
  if (t < S('u4') - 0.1) { earthLimb(t, 1700, 1000, 0.5); reg('panel', 'earth', 0, 700, W, 1080); placeIcon('fireball', [[960, 470]], 2.6, t, S('u1') + 1.0, S('u4') - 0.2, { hw: 80, hh: 60 });
    label('MOST BURNS UP', 960, 140, t, W_('u2', 'burn'), S('u3') - 0.3, WHITE, 32); label('MIRROR + FRAME COULD SURVIVE', 960, 230, t, W_('u2', 'mirror'), S('u3') - 0.3, GOLD, 30); if (t > S('u3') - 0.1) tag('SMALL RISK · MOSTLY OCEAN', 960, 140, t, W_('u3', 'small'), S('u4') - 0.3, '#5b4fd6', 36); return; }
  placeIcon('skylab', [[620, 460]], 2.6, t, S('u4'), S('w1') - 0.3, { hw: 84, hh: 84 }); label('SKYLAB FELL UNCONTROLLED', 1320, 380, t, W_('u4', 'skylab'), S('w1') - 0.4, WHITE, 30); label('PIECES LANDED IN WESTERN AUSTRALIA', 1320, 480, t, W_('u4', 'western'), S('w1') - 0.4, GOLD, 26); label('NOBODY WAS HURT', 1320, 580, t, W_('u4', 'nobody'), S('w1') - 0.4, '#9be3a5', 28);
}
function sWhy(t) {
  worldBG(t, 'indigo');
  if (t < S('w3') - 0.1) { placeIcon('webb', [[560, 450]], 2.6, t, S('w2'), S('w3') - 0.2, { hw: 82, hh: 84 }); label('JAMES WEBB · SEES INFRARED', 1320, 340, t, W_('w2', 'webb'), S('w3') - 0.3, GOLD, 30);
    if (t > S('w2b') - 0.1) { label('LAUNCHED 2021 · 6.5 M MIRROR', 1320, 450, t, W_('w2b', 'launched'), S('w3') - 0.3, WHITE, 28); label('1.5 MILLION KM AWAY · NO REPAIRS', 1320, 560, t, W_('w2b', 'beyond') - 0.6, S('w3') - 0.3, WHITE, 26); } return; }
  hubble(t, 640, 420, 0.9); reg('hero', 'hubble', 380, 260, 940, 580); placeIcon('uv', [[1320, 400]], 2.2, t, W_('w3', 'ultraviolet') - 0.3, S('o1') - 0.3, { hw: 76, hh: 60 }); label('VISIBLE + ULTRAVIOLET', 1320, 600, t, W_('w3', 'visible'), S('o1') - 0.4, GOLD, 30);
  if (t > S('w3b') - 0.1) placeIcon('planet', [[1320, 820]], 1.6, t, W_('w3b', 'planets'), S('o1') - 0.3, { hw: 66, hh: 66 }); if (t > S('w4') - 0.1) tag('A GAP IN OUR VIEW', 640, 760, t, W_('w4', 'gap'), S('o1') - 0.4, '#9b3352', 38);
}
function sOutro(t) {
  worldBG(t, 'night'); earthLimb(t, 1900, 1100, 0.2); reg('panel', 'earth', 0, 800, W, 1080);
  if (t < S('o3') - 0.1) { hubble(t, 960, 400, 1.1); reg('hero', 'hubble', 640, 210, 1300, 600); label('MONEY · A RESCUE CRAFT · NASA\'S CHOICE', 960, 720, t, W_('o2', 'money'), S('o3') - 0.3, WHITE, 28); return; }
  hubble(t, 420, 420, 0.75); reg('hero', 'hubble', 200, 280, 680, 560); outroTitle(t, 'HUBBLE IS FALLING', 'CAN ANYONE SAVE IT?', 1300, 58, 72);
}
const CHAPTERS = [['f1', 'Why orbits decay', 'night', 'sunI'], ['h1', 'Thirty-six years of Hubble', 'indigo', 'hubbleI'], ['s1', 'The telescope that fell', 'night', 'swift'], ['t1', 'The deadline', 'grey', 'calendarH'], ['v1q', 'Three ways to go', 'night', 'rescuer'], ['u1', 'If Hubble falls', 'night', 'fireball'], ['w1', 'Why we still need it', 'indigo', 'webb']];
function SECTIONS() { return makeSections(CHAPTERS, { f1: [sDecay, 'f2'], h1: [sHistory, 'h2'], s1: [sSwift, 's2'], t1: [sDeadline, 't2'], v1q: [sOptions, 'v2'], u1: [sFall, 'u2'], w1: [sWhy, 'w2'] }, sOpen, sOutro); }
