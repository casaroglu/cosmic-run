// node _engine/render.mjs <videoDir> [stillsComma]  -> <videoDir>/render/video.mp4 (or stills)
import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn, execFileSync } from 'node:child_process';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..'), DIR = path.resolve(process.argv[2]), rel = path.relative(ROOT, DIR), stills = process.argv[3];
fs.copyFileSync(path.join(ROOT, '_engine/page.html'), path.join(DIR, 'index.html'));
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1');
await new Promise(r => srv.on('listening', r));
const b = await chromium.launch({ channel: 'chrome' }), p = await b.newPage({ viewport: { width: 1080, height: 1920 } }); p.on('pageerror', e => console.log('pageerror', e.message)); p.on('console', m => console.log('console', m.text()));
await p.goto(`http://127.0.0.1:${srv.address().port}/${rel}/index.html`); const info = await p.evaluate(() => window.ready);
fs.mkdirSync(path.join(DIR, 'render'), { recursive: true }); fs.writeFileSync(path.join(DIR, 'audio/events.json'), JSON.stringify(info));
if (stills) { for (const s of stills.split(',')) { const t = s === 'end' ? info.DUR - .2 : Number(s); const d = await p.evaluate(t => window.frame(t), t); fs.writeFileSync(path.join(DIR, `render/still_${s}.jpg`), Buffer.from(d.split(',')[1], 'base64')); } }
else { const fps = 30, n = Math.ceil(info.DUR * fps), out = path.join(DIR, 'render/video_silent.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-i', '-', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) { const d = await p.evaluate(t => window.frame(t), i / fps); if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64'))) await new Promise(r => ff.stdin.once('drain', r)); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('frames', n, 'dur', info.DUR.toFixed(2)); }
await b.close(); srv.close();
