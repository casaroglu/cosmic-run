#!/usr/bin/env node
// Render a silent globe clip (Three.js + GSAP) for use as a story "clips" scene.
// usage: node globe_clip.mjs SPEC.json OUT.mp4 [--still SECONDS]
// SPEC: {w, h, duration, from:{lat,lon,dist}, to:{...}, hop?, fly?, highlight:[ISO3], markers:[{lat,lon,label,at}],
//        routes:[{pts:[[lat,lon],...], at, dur}], title?, subtitle?}
// Map data: $GEO_DIR (default ~/cosmic-run/videos/stories/headlines/_geo) with ne_50m_land / ne_50m_admin_0_countries.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GEO = process.env.GEO_DIR || path.join(os.homedir(), 'cosmic-run/videos/stories/headlines/_geo');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const [specFile, out] = process.argv.slice(2);
const stillAt = process.argv.includes('--still') ? Number(process.argv[process.argv.indexOf('--still') + 1]) : null;
const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
const w = spec.w || 1080, h = spec.h || 1920, fps = 30;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.geojson': 'application/json' };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const p = u.startsWith('/geo/') ? path.join(GEO, u.slice(5)) : path.join(HERE, u);
  if (!(p.startsWith(HERE) || p.startsWith(GEO)) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise(r => server.once('listening', r));

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: w, height: h } });
page.on('pageerror', e => console.error('page error:', e.message));
await page.goto(`http://127.0.0.1:${server.address().port}/globe.html?w=${w}&h=${h}`);
await page.waitForFunction(() => window.ready);
await page.evaluate(() => window.init());
await page.evaluate(s => window.setClip(s), spec);

if (stillAt != null) {
  const [u] = await page.evaluate(t => frames(t, 1, 30), stillAt);
  fs.writeFileSync(out, Buffer.from(u.split(',')[1], 'base64')); console.log(out);
} else {
  const total = Math.round(spec.duration * fps);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < total; f += 15) {
    const urls = await page.evaluate(([s, n]) => frames(s, n, 30), [f / fps, Math.min(15, total - f)]);
    for (const u of urls) if (!ff.stdin.write(Buffer.from(u.slice(u.indexOf(',') + 1), 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise((r, j) => ff.on('close', c => (c ? j(new Error('ffmpeg ' + c)) : r())));
  console.log('wrote', out);
}
await browser.close(); server.close();
