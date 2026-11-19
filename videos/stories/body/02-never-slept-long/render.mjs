// node render.mjs contact OUT.jpg | node render.mjs video OUT.mp4   (Chrome with GPU, 30fps, 2 subframes, shutter 0.6)
import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/');
const { chromium } = require('playwright');
const D = path.dirname(new URL(import.meta.url).pathname), [mode, out] = process.argv.slice(2);
const MIME = { '.html': 'text/html', '.json': 'application/json', '.js': 'text/javascript' };
const srv = http.createServer((q, r) => { const p = path.join(D, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!p.startsWith(D) || !fs.existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1');
await new Promise(r => srv.on('listening', r));
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('console', m => { if (m.type() === 'error') console.log('page:', m.text()); }); page.on('pageerror', e => console.log('pageerror:', e.message));
await page.goto(`http://127.0.0.1:${srv.address().port}/index.html`);
const info = await page.evaluate(() => window.ready);
const shot = async t => Buffer.from((await page.evaluate(([t]) => window.frame(t, 0.93), [t])).split(',')[1], 'base64');
if (mode === 'contact') {
  const C = info.CUE, ts = [0.3, C.slept + 0.2, C.slept + 0.62, C.slept + 2.3, C.lying, C.delete + 0.3, C.you + 0.5, C.zero + 0.4, C.drinks + 0.5, C.drunk + 0.5, C.head + 0.6, C.trash + 1.5, C.washes + 0.6, C.wash + 0.8, C.day2 + 1.5, C.micro + 0.2, C.breathe + 0.5, C.eleven + 0.8, C.rats + 1.0, C.hours15 + 0.7, C.fine + 0.4, C.calls + 1.2];
  fs.mkdirSync(path.join(D, 'render/contact'), { recursive: true });
  for (const [i, t] of ts.entries()) fs.writeFileSync(path.join(D, `render/contact/${String(i).padStart(2, '0')}_${t.toFixed(2)}.jpg`), await shot(t));
  console.log('contact frames', ts.length, JSON.stringify(C));
} else {
  const fps = 30, shutter = 0.6, f0 = Number(process.argv[4] || 0), n = process.argv[5] ? Number(process.argv[5]) : Math.ceil(info.DUR * fps);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps * 2), '-i', '-', '-vf', 'tmix=frames=2:weights=1 1,select=not(mod(n\\,2)),setpts=N/30/TB', '-r', '30', '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = f0; i < n; i++) {
    const t = i / fps;
    for (const s of [0, shutter / fps / 2]) { const b = await shot(t + s); if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r)); }
    if (i % 150 === 0) console.log('frame', i, '/', n);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('wrote', out);
}
await browser.close(); srv.close();
