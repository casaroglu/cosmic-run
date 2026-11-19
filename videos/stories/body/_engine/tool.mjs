// node _engine/tool.mjs <videoDir> snap t1 t2 ... | audit [step from to] | events | video OUT [f0 f1]
import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [dirArg, cmd, ...args] = process.argv.slice(2); const DIR = path.resolve(dirArg), rel = path.relative(ROOT, DIR);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png' };
const srv = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1');
await new Promise(r => srv.on('listening', r));
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', e => console.log('pageerror:', e.message)); page.on('console', m => { if (m.type() === 'error' && !m.text().includes('404')) console.log('console:', m.text()); });
await page.goto(`http://127.0.0.1:${srv.address().port}/${rel}/index.html`);
const info = await page.evaluate(() => window.ready);
const shot = async (t, q = 0.93) => Buffer.from((await page.evaluate(([t, q]) => window.frame(t, q), [t, q])).split(',')[1], 'base64');
if (cmd === 'snap') { for (const a of args) fs.writeFileSync(`/tmp/claude-501/snap_${a}.jpg`, await shot(Number(a))); console.log('snaps', args.length); }
else if (cmd === 'audit') { const [st, fr, to] = [Number(args[0] || 0.1), Number(args[1] || 0), Number(args[2] || 1e9)]; const res = await page.evaluate(([a, b, c]) => window.overlapAudit(a, b, c), [st, fr, to]); console.log(res.length ? `overlap audit: ${res.length} issue(s)\n  ` + res.join('\n  ') : 'overlap audit: ok'); }
else if (cmd === 'events') { const ev = await page.evaluate(() => window.events()); fs.writeFileSync(path.join(DIR, 'audio/events.json'), JSON.stringify({ DUR: info.DUR, CUE: info.CUE, chapters: info.chapters, events: ev }, null, 1)); console.log('events', ev.length, 'DUR', info.DUR.toFixed(2)); }
else if (cmd === 'info') console.log(JSON.stringify(info.chapters), info.DUR);
else if (cmd === 'video') {
  const out = args[0], fps = 30, shutter = 0.6, f0 = Number(args[1] || 0), n = args[2] ? Number(args[2]) : Math.ceil(info.DUR * fps);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps * 2), '-i', '-', '-vf', 'tmix=frames=2:weights=1 1,select=not(mod(n\\,2)),setpts=N/30/TB', '-r', '30', '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = f0; i < n; i++) { const t = i / fps; for (const s of [0, shutter / fps / 2]) { const b = await shot(t + s); if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r)); } if (i % 900 === 0) console.log('frame', i, '/', n); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('wrote', out);
}
await browser.close(); srv.close();
