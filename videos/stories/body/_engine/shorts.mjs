// node _engine/shorts.mjs <episodeDir> <outDir> [speed=1.2] [only=chapterIndex]
// Cuts one vertical Short per chapter (plus the intro) from an explainer: re-renders frames into 1080x1920
// (shortcomp.js), speeds video+audio up, adds the chapter question as hook, karaoke captions and an end card.
import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn, execFileSync } from 'node:child_process';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [dirArg, outArg, spArg, onlyArg] = process.argv.slice(2); const DIR = path.resolve(dirArg), OUT = path.resolve(outArg), SPEED = Number(spArg || 1.2), rel = path.relative(ROOT, DIR);
fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png' };
const srv = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1');
await new Promise(r => srv.on('listening', r));
// a vertical page = the episode's index.html + a 1080x1920 canvas + the compositor
const idx = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8').replace('</body>', '<canvas id="v" width="1080" height="1920"></canvas><script src="../_engine/shortcomp.js"></script></body>').replace('canvas{display:block}', 'canvas{display:block}#c{position:absolute;left:-99999px}');
fs.writeFileSync(path.join(DIR, 'short.html'), idx);
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('pageerror', e => console.log('pageerror:', e.message));
await page.goto(`http://127.0.0.1:${srv.address().port}/${rel}/short.html`);
await page.evaluate(() => window.ready);
// segments: intro (0 → first card) and each chapter (its card → next card / outro)
const segs = await page.evaluate(() => { const ids = Object.keys(LINES), prevEnd = id => LINES[ids[ids.indexOf(id) - 1]].end + 0.15;
  const starts = CHAPTERS.map(c => [c[0], c[1], prevEnd(c[0])]); const out = [{ name: 'intro', hook: LINES[ids[0]].text, t0: 0.2, t1: starts[0][2] }];
  starts.forEach(([id, title, s], i) => out.push({ name: String(i + 1).padStart(2, '0') + '-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), hook: LINES[id].text, kicker: 'PART ' + (i + 1) + ' · ' + title.toUpperCase(), t0: s, t1: i + 1 < starts.length ? starts[i + 1][2] : LINES['o1'].start - 0.1 }));
  return out; });
const title = (fs.readFileSync(path.join(DIR, 'README.md'), 'utf8').match(/\*\*Title:\*\*\s*(.*)/) || [, ''])[1].trim(), full = title.replace(/\. Explained in \d+ Minutes/, '');
// Hook/loop rules (user, 2026-11-23): open on the payoff in the first 1.5 s, rewind to the question, flash the key text
// for ~1 s at the very end and cross-fade into the first frame, so the Short loops.
const NUM = /\d|\b(half|twice|double|triple|times|million|billion|thousand|hundred|percent|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty)\b/i;
await page.evaluate(() => { window.__lines = Object.entries(LINES).map(([id, l]) => ({ id, ...l })); });
const ALL = await page.evaluate(() => window.__lines), WD = await page.evaluate(() => WORDS);
function payoff(s) {   // the segment's strongest answer line: one with a number, the later the better; fallback: the last answer
  const ans = ALL.filter(l => l.speaker !== 'q' && l.start >= s.t0 - 0.05 && l.end <= s.t1 + 0.2 && !/q$/.test(l.id));
  if (!ans.length) return null;
  const sc = ans.map((l, i) => ({ l, v: (NUM.test(l.text) ? 10 : 0) + i })); sc.sort((a, b) => b.v - a.v); return sc[0].l;
}
function keyText(line) {   // the clause that carries the number, at most 9 words
  const cl = line.text.split(/(?<=[.;:!?])\s+|,\s+(?=[a-z])|\s+—\s+/).map(x => x.trim()).filter(Boolean);
  const sent = line.text.split(/(?<=[.!?])\s+/).map(x => x.trim()).filter(Boolean);   // whole sentence when the number clause is too thin ("In 2017")
  let k = cl.find(c => NUM.test(c) && c.split(/\s+/).length >= 4) || sent.find(c => NUM.test(c)) || cl.find(c => c.split(/\s+/).length >= 4) || sent[0]; const w = k.split(/\s+/); if (w.length > 12) k = w.slice(0, 12).join(' ') + '…';
  return k.replace(/[.,;:]$/, '').toUpperCase();
}
const COLD = 1.5, REW = 0.35, FLASH = 1.0, BLEND = 0.35, fps = 30, list = onlyArg != null ? [segs[Number(onlyArg)]] : segs;
const ease = x => x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3);
for (const s of list) {
  const L = payoff(s); const nw = L ? WD.find(w => w.s >= L.start - 0.05 && w.s <= L.end && NUM.test(w.w)) : null;
  let cs = L ? Math.max(L.start, Math.min(L.end + 0.15, s.t1) - COLD * SPEED) : s.t1 - COLD * SPEED;   // the payoff's final, fullest moment cs = Math.min(cs, s.t1 - COLD * SPEED); if (cs < s.t0) cs = s.t0;
  const spec = { ...s, full: '"' + full + '"', key: L ? keyText(L) : s.hook.toUpperCase() };
  const main = (s.t1 - s.t0) / SPEED, dur = COLD + REW + main, n = Math.ceil(dur * fps), base = path.join(OUT, s.name);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p', base + '_v.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    const u = i / fps; let t, o;
    if (u < COLD) { t = cs + u * SPEED; o = { p: 0, punch: 1 + 0.12 * (1 - ease(u / 0.45)) }; }                       // cold open on the payoff
    else if (u < COLD + REW) { const r = (u - COLD) / REW; t = cs + COLD * SPEED - (cs + COLD * SPEED - s.t0) * ease(r); o = { p: 0, rew: Math.sin(Math.PI * r) }; }   // quick rewind to the question
    else { const m = u - COLD - REW; t = s.t0 + m * SPEED; o = { p: m / main };
      const left = main - m, fl = left - BLEND; if (fl < FLASH && fl > 0) o.flash = Math.min(1, (FLASH - fl) / 0.1, fl / 0.08);   // hidden key text, last second
      if (left < BLEND) { o.blend = 1 - left / BLEND; o.blendT = cs; } }                                         // cross-fade into the first frame
    const b = Buffer.from((await page.evaluate(([t, sp, o]) => window.vframe(t, sp, o), [t, spec, o])).split(',')[1], 'base64'); if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  const F = 'aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo';
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', base + '_v.mp4', '-i', path.join(DIR, 'audio/mix.wav'), '-f', 'lavfi', '-t', String(REW), '-i', 'anoisesrc=color=pink:sample_rate=48000:amplitude=0.5',
    '-filter_complex',
    `[1:a]atrim=${cs.toFixed(3)}:${(cs + COLD * SPEED).toFixed(3)},asetpts=PTS-STARTPTS,atempo=${SPEED},${F},afade=t=out:st=${(COLD - 0.1).toFixed(2)}:d=0.1[c];` +
    `[2:a]highpass=f=600,lowpass=f=6000,afade=t=in:d=${(REW * 0.6).toFixed(2)},afade=t=out:st=${(REW * 0.6).toFixed(2)}:d=${(REW * 0.4).toFixed(2)},volume=0.35,${F}[w];` +
    `[1:a]atrim=${s.t0.toFixed(3)}:${s.t1.toFixed(3)},asetpts=PTS-STARTPTS,atempo=${SPEED},${F},afade=t=in:d=0.03,afade=t=out:st=${(main - 0.12).toFixed(2)}:d=0.12[m];` +
    `[c][w][m]concat=n=3:v=0:a=1,loudnorm=I=-14:TP=-1.5:LRA=11[a]`,
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', '-movflags', '+faststart', base + '.mp4']);
  fs.unlinkSync(base + '_v.mp4'); fs.writeFileSync(base + '.txt', s.hook + '\n' + 'key: ' + spec.key + '\n');
  console.log('short', s.name, dur.toFixed(1) + 's', '| cold open at', cs.toFixed(1), '|', spec.key);
}
await browser.close(); srv.close(); fs.unlinkSync(path.join(DIR, 'short.html'));
