// Vertical (1080x1920) Shorts/Reels compositor: draws the 16:9 explainer frame at time t into a 9:16 canvas
// with a blurred background, a hook title on top, karaoke captions below and a "full video" end card.
const VC = document.getElementById('v'), vctx = VC.getContext('2d');
const VW = 1080, VH = 1920, VS_ = 0.68;               // frame scale: shows the middle 1588 px of the 1920 px frame
const FW = 1920 * VS_, FH = 1080 * VS_, FX = (VW - FW) / 2, FY = 600;
function vfont(px, w = 700) { vctx.font = `${w} ${px}px Fredoka`; }
function wrapLines(txt, maxW, px) { vfont(px); const out = []; let cur = ''; for (const w of txt.split(/\s+/)) { const t = cur ? cur + ' ' + w : w; if (vctx.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; } if (cur) out.push(cur); return out; }
function capGroups(t0, t1) {   // words of the window grouped into caption chunks (<= 4 words, broken on pauses and sentence ends)
  const ws = WORDS.filter(w => w.s >= t0 - 0.05 && w.s < t1); const g = []; let cur = [];
  ws.forEach((w, i) => { const nx = ws[i + 1]; cur.push(w); if (cur.length >= 4 || /[.?!,:;]$/.test(w.w) || (nx && nx.s - w.e > 0.35) || !nx) { g.push(cur); cur = []; } });
  return g;
}
window.vframe = (t, spec, q = 0.92) => {
  draw(t);   // engine renders the 1920x1080 frame into cv
  const p = (t - spec.t0) / (spec.t1 - spec.t0);
  // background: blurred, zoomed copy of the frame, darkened
  vctx.save(); vctx.filter = 'blur(28px) brightness(0.55) saturate(1.2)'; const bs = VH / 1080 * 1.05; vctx.drawImage(cv, (VW - 1920 * bs) / 2, (VH - 1080 * bs) / 2, 1920 * bs, 1080 * bs); vctx.restore();
  vctx.fillStyle = 'rgba(6,14,32,0.35)'; vctx.fillRect(0, 0, VW, VH);
  // the frame itself with rounded corners and a soft shadow
  vctx.save(); vctx.shadowColor = 'rgba(0,0,0,0.5)'; vctx.shadowBlur = 40; vctx.beginPath(); vctx.roundRect(FX + 20, FY, FW - 40, FH, 28); vctx.fillStyle = '#000'; vctx.fill(); vctx.restore();
  vctx.save(); vctx.beginPath(); vctx.roundRect(FX + 20, FY, FW - 40, FH, 28); vctx.clip(); vctx.drawImage(cv, FX, FY, FW, FH); vctx.restore();
  // hook title (Ava's question) on top
  const k = eoq((t - spec.t0) / 0.6); vctx.save(); vctx.globalAlpha = k;
  vfont(30, 600); vctx.letterSpacing = '6px'; vctx.fillStyle = TEAL; vctx.textAlign = 'center'; vctx.fillText(spec.kicker || 'INSIDE OUT SCIENCE', VW / 2, 190); vctx.letterSpacing = '0px';
  const lines = wrapLines(spec.hook, 940, 76); lines.forEach((l, i) => { vfont(76); vctx.fillStyle = i === lines.length - 1 ? GOLD : WHITE; vctx.fillText(l, VW / 2, 300 + i * 92 + (1 - k) * 30); });
  vctx.restore();
  // karaoke captions under the frame
  const G = spec.groups || (spec.groups = capGroups(spec.t0, spec.t1));
  const g = G.find(c => t >= c[0].s - 0.05 && t < (c[c.length - 1].e + 0.25)) || null;
  if (g && p < 0.895) {
    vfont(62); const words = g.map(w => w.w.replace(/^[^\w']+|[^\w'%.,?!]+$/g, '')); const sp = 18;
    const widths = words.map(w => vctx.measureText(w.toUpperCase()).width); let rows = [[]], rw = [0];
    words.forEach((w, i) => { const r = rows.length - 1; if (rw[r] + widths[i] > 940 && rows[r].length) { rows.push([]); rw.push(0); } rows[rows.length - 1].push(i); rw[rows.length - 1] += widths[i] + sp; });
    rows.forEach((row, ri) => { let x = VW / 2 - (rw[ri] - sp) / 2; const y = FY + FH + 150 + ri * 84;
      row.forEach(i => { const on = t >= g[i].s - 0.03; vctx.save(); vctx.lineJoin = 'round'; vctx.lineWidth = 12; vctx.strokeStyle = 'rgba(6,14,32,0.9)'; vctx.textAlign = 'left'; vfont(62);
        const pop = on && t - g[i].s < 0.15 ? 1 + 0.12 * (1 - (t - g[i].s) / 0.15) : 1; vctx.translate(x + widths[i] / 2, y); vctx.scale(pop, pop);
        vctx.strokeText(words[i].toUpperCase(), -widths[i] / 2, 0); vctx.fillStyle = on ? GOLD : WHITE; vctx.fillText(words[i].toUpperCase(), -widths[i] / 2, 0); vctx.restore(); x += widths[i] + sp; }); });
  }
  // end card: full video pointer
  if (p > 0.9) { const e = eoq((p - 0.9) / 0.06); vctx.save(); vctx.globalAlpha = e; vctx.fillStyle = 'rgba(6,14,32,0.75)'; vctx.beginPath(); vctx.roundRect(140, FY + FH + 90, 800, 170, 40); vctx.fill();
    vfont(54); vctx.fillStyle = GOLD; vctx.textAlign = 'center'; vctx.fillText('FULL VIDEO ON OUR CHANNEL', VW / 2, FY + FH + 165); vfont(34, 600); vctx.fillStyle = WHITE; vctx.fillText(spec.full || '', VW / 2, FY + FH + 220); vctx.restore(); }
  return VC.toDataURL('image/jpeg', q);
};
