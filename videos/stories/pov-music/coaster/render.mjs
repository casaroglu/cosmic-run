#!/usr/bin/env node
// timeline.json (+ song.wav) -> video.mp4 1080x1920 30fps.  usage: node render.mjs OUT_DIR [--preview t1 t2 ...] [--noaudio]
// Serves the repo over a local HTTP server so coaster.html can import three.js as a module.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../../..');
const require = createRequire(path.join(repo, '.claude/skills/story-video/scripts/package.json'));
const { chromium } = require('playwright');

const outDir = path.resolve(process.argv[2] || '.');
const pi = process.argv.indexOf('--preview');
const previews = pi > 0 ? process.argv.slice(pi + 1).filter(a => !a.startsWith('--')).map(Number) : null;
const tl = JSON.parse(fs.readFileSync(path.join(outDir, 'timeline.json'), 'utf8'));

const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript' };
const server = http.createServer((req, res) => {
  const f = path.join(repo, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(repo) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise(r => server.once('listening', r));
const port = server.address().port;

const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('pageerror', e => console.error('page error:', e.message));
page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
await page.goto(`http://127.0.0.1:${port}/videos/stories/pov-music/coaster/coaster.html`);
await page.waitForFunction(() => window.ready === true);
const info = await page.evaluate(t => window.setup(t), tl);
console.log('track', JSON.stringify(info));

const fps = tl.fps || 30;
if (previews) {
  for (const s of previews) {
    const [u] = await page.evaluate(([t]) => window.frames(t, 1, 30, 0.9), [s]);
    const f = path.join(outDir, `preview_${s}.jpg`);
    fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64')); console.log(f);
  }
  await browser.close(); server.close(); process.exit(0);
}

const total = Math.ceil(tl.duration * fps);
const out = path.join(outDir, tl.out || 'video.mp4');
const noaudio = process.argv.includes('--noaudio') || !tl.audio;
const ff = spawn('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  ...(noaudio ? [] : ['-i', tl.audio]),
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', String(fps),
  ...(noaudio ? [] : ['-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest']),
  '-movflags', '+faststart', out,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const BATCH = 10, t0 = Date.now();
for (let f = 0; f < total; f += BATCH) {
  const n = Math.min(BATCH, total - f);
  const urls = await page.evaluate(([s, n, fps]) => window.frames(s, n, fps, 0.9), [f / fps, n, fps]);
  for (const u of urls) {
    if (!ff.stdin.write(Buffer.from(u.slice(u.indexOf(',') + 1), 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
  }
  if ((f / BATCH) % 15 === 0) process.stdout.write(`\rframe ${f}/${total} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
ff.stdin.end();
await new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))));
await browser.close(); server.close();
console.log(`\nwrote ${out}`);
