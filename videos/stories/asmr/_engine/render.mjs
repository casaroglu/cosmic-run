// node _engine/render.mjs <dir> <seconds> [stillsComma] -> <dir>/render/video_silent.mp4 (60 fps) or stills
import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..'), DIR = path.resolve(process.argv[2]), rel = path.relative(ROOT, DIR), SEC = Number(process.argv[3] || 18), stills = process.argv[4];
fs.copyFileSync(path.join(ROOT, '_engine/page.html'), path.join(DIR, 'index.html'));
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1');
await new Promise(r => srv.on('listening', r));
const b = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] }), p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
p.on('pageerror', e => console.log('pageerror', e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('console', m.text()); });
await p.goto(`http://127.0.0.1:${srv.address().port}/${rel}/index.html`); await p.waitForFunction(() => window.ready); await p.evaluate(() => window.ready);
fs.mkdirSync(path.join(DIR, 'render'), { recursive: true });
if (stills) { for (const s of stills.split(',')) { const d = await p.evaluate(t => window.frame(t), Number(s)); fs.writeFileSync(path.join(DIR, `render/still_${s}.jpg`), Buffer.from(d.split(',')[1], 'base64')); } }
else { const fps = 60, n = Math.round(SEC * fps), out = path.join(DIR, 'render/video_silent.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) { const d = await p.evaluate(t => window.frame(t), i / fps); if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); if (i % 300 === 0) console.log('frame', i, '/', n); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('frames', n); }
await b.close(); srv.close();
