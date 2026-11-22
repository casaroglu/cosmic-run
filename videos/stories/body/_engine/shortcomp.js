// Vertical (1080x1920) Shorts/Reels compositor: draws the 16:9 explainer frame at time t into a 9:16 canvas
// with a blurred background, a hook title on top and karaoke captions below.
// Hook/loop rules (2026-11-23): the Short opens on its payoff (cold open), rewinds to the question, plays the segment,
// flashes a hidden key text for ~1 s at the very end and cross-fades into its own first frame, so it loops.
const VC = document.getElementById('v'), vctx = VC.getContext('2d');
const VW = 1080, VH = 1920, VS_ = 1040 / 1920;        // frame scale: the whole 1920 px frame fits (20 px side margins), so no label is cut off
const FW = 1920 * VS_, FH = 1080 * VS_, FX = (VW - FW) / 2, FY = 620;
const TMP = document.createElement('canvas'); TMP.width = VW; TMP.height = VH;
function vfont(px, w = 700) { vctx.font = `${w} ${px}px Fredoka`; }
function wrapLines(txt, maxW, px) { vfont(px); const out = []; let cur = ''; for (const w of txt.split(/\s+/)) { const t = cur ? cur + ' ' + w : w; if (vctx.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; } if (cur) out.push(cur); return out; }
function capGroups(t0, t1) {   // words of the window grouped into caption chunks (<= 4 words, broken on pauses and sentence ends)
  const ws = WORDS.filter(w => w.s >= t0 - 0.05 && w.s < t1); const g = []; let cur = [];
  ws.forEach((w, i) => { const nx = ws[i + 1]; cur.push(w); if (cur.length >= 4 || /[.?!,:;]$/.test(w.w) || (nx && nx.s - w.e > 0.35) || !nx) { g.push(cur); cur = []; } });
  return g;
}
// o: {p: progress over the whole Short, punch: frame zoom, rew: 0..1 rewind look, flash: 0..1 key text, blendT + blend: cross-fade into another time}
window.vframe = (t, spec, o = {}, q = 0.92) => {
  if (o.blend > 0) { vdraw(o.blendT, spec, { p: 0 }); TMP.getContext('2d').drawImage(VC, 0, 0); }
  vdraw(t, spec, o);
  if (o.flash > 0 && spec.key) {   // hidden key text: on screen for about a second at the very end
    vctx.save(); vctx.globalAlpha = o.flash; vctx.fillStyle = 'rgba(6,14,32,0.85)'; vctx.fillRect(0, FY + FH + 60, VW, 320);
    const ls = wrapLines(spec.key, 960, 58); vctx.textAlign = 'center'; vctx.lineJoin = 'round';
    ls.forEach((l, i) => { vfont(58); vctx.lineWidth = 10; vctx.strokeStyle = 'rgba(6,14,32,0.95)'; const y = FY + FH + 240 - (ls.length - 1) * 35 + i * 70; vctx.strokeText(l, VW / 2, y); vctx.fillStyle = GOLD; vctx.fillText(l, VW / 2, y); });
    vctx.restore(); }
  if (o.blend > 0) { vctx.save(); vctx.globalAlpha = o.blend; vctx.drawImage(TMP, 0, 0); vctx.restore(); }
  return VC.toDataURL('image/jpeg', q);
};
function vdraw(t, spec, o) {
  draw(t);   // engine renders the 1920x1080 frame into cv
  const p = o.p != null ? o.p : (t - spec.t0) / (spec.t1 - spec.t0), pz = o.punch || 1;
  // background: blurred, zoomed copy of the frame, darkened
  vctx.save(); vctx.filter = 'blur(28px) brightness(0.55) saturate(1.2)'; const bs = VH / 1080 * 1.05; vctx.drawImage(cv, (VW - 1920 * bs) / 2, (VH - 1080 * bs) / 2, 1920 * bs, 1080 * bs); vctx.restore();
  vctx.fillStyle = 'rgba(6,14,32,0.35)'; vctx.fillRect(0, 0, VW, VH);
  // the frame itself with rounded corners and a soft shadow (punch = cold-open zoom; rew = rewind blur + ◀◀)
  vctx.save(); vctx.shadowColor = 'rgba(0,0,0,0.5)'; vctx.shadowBlur = 40; vctx.beginPath(); vctx.roundRect(FX, FY, FW, FH, 24); vctx.fillStyle = '#000'; vctx.fill(); vctx.restore();
  vctx.save(); vctx.beginPath(); vctx.roundRect(FX, FY, FW, FH, 24); vctx.clip(); if (o.rew) vctx.filter = `blur(${(6 * o.rew).toFixed(1)}px) saturate(${(1 - 0.6 * o.rew).toFixed(2)})`;
  vctx.drawImage(cv, FX - FW * (pz - 1) / 2, FY - FH * (pz - 1) / 2, FW * pz, FH * pz); vctx.filter = 'none';
  if (o.rew) { vctx.globalAlpha = Math.min(1, o.rew * 2); vfont(120); vctx.fillStyle = WHITE; vctx.textAlign = 'center'; vctx.fillText('◀◀', VW / 2, FY + FH / 2 + 40); }
  vctx.restore();
  // hook title (Ava's question) on top, fully on from the first frame
  vctx.save(); vfont(30, 600); vctx.letterSpacing = '6px'; vctx.fillStyle = TEAL; vctx.textAlign = 'center'; vctx.fillText(spec.kicker || 'INSIDE OUT SCIENCE', VW / 2, 190); vctx.letterSpacing = '0px';
  const lines = wrapLines(spec.hook, 940, 76); lines.forEach((l, i) => { vfont(76); vctx.fillStyle = i === lines.length - 1 ? GOLD : WHITE; vctx.fillText(l, VW / 2, 300 + i * 92); });
  vctx.restore();
  // karaoke captions under the frame
  const G = spec.groups || (spec.groups = capGroups(spec.t0, spec.t1));
  const g = G.find(c => t >= c[0].s - 0.05 && t < (c[c.length - 1].e + 0.25)) || null;
  if (g && !o.rew && !(o.flash > 0.3)) {
    vfont(62); const words = g.map(w => w.w.replace(/^[^\w']+|[^\w'%.,?!]+$/g, '')); const sp = 18;
    const widths = words.map(w => vctx.measureText(w.toUpperCase()).width); let rows = [[]], rw = [0];
    words.forEach((w, i) => { const r = rows.length - 1; if (rw[r] + widths[i] > 940 && rows[r].length) { rows.push([]); rw.push(0); } rows[rows.length - 1].push(i); rw[rows.length - 1] += widths[i] + sp; });
    rows.forEach((row, ri) => { let x = VW / 2 - (rw[ri] - sp) / 2; const y = FY + FH + 150 + ri * 84;
      row.forEach(i => { const on = t >= g[i].s - 0.03; vctx.save(); vctx.lineJoin = 'round'; vctx.lineWidth = 12; vctx.strokeStyle = 'rgba(6,14,32,0.9)'; vctx.textAlign = 'left'; vfont(62);
        const pop = on && t - g[i].s < 0.15 ? 1 + 0.12 * (1 - (t - g[i].s) / 0.15) : 1; vctx.translate(x + widths[i] / 2, y); vctx.scale(pop, pop);
        vctx.strokeText(words[i].toUpperCase(), -widths[i] / 2, 0); vctx.fillStyle = on ? GOLD : WHITE; vctx.fillText(words[i].toUpperCase(), -widths[i] / 2, 0); vctx.restore(); x += widths[i] + sp; }); });
  }
  // small full-video pill mid-way (the related-video link carries the rest); no end card, so the end can loop into the start
  if (p > 0.55 && p < 0.85) { const e = Math.min(eoq((p - 0.55) / 0.04), eoq((0.85 - p) / 0.04)); vctx.save(); vctx.globalAlpha = e; vfont(30, 600); const tx = '▶ FULL VIDEO ON OUR CHANNEL', w = vctx.measureText(tx).width + 60;
    vctx.fillStyle = 'rgba(6,14,32,0.75)'; vctx.beginPath(); vctx.roundRect((VW - w) / 2, 1600, w, 56, 28); vctx.fill(); vctx.fillStyle = GOLD; vctx.textAlign = 'center'; vctx.fillText(tx, VW / 2, 1639); vctx.restore(); }
}
