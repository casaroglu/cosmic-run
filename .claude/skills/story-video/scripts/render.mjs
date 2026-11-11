#!/usr/bin/env node
// timeline.json + audio.wav  ->  video.mp4 (1080x1920, H.264/AAC)
// usage: node render.mjs OUT_DIR [--preview SECONDS...]   (preview writes PNG stills instead)
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(process.cwd(), 'node_modules', 'playwright'))); }

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(process.argv[2] || '.');
const previewIdx = process.argv.indexOf('--preview');
const previews = previewIdx > 0 ? process.argv.slice(previewIdx + 1).map(Number) : null;
const tl = JSON.parse(fs.readFileSync(path.join(outDir, 'timeline.json'), 'utf8'));
for (const v of Object.values(tl.images || {})) {   // file:// images would taint the canvas -> inline them
  const ext = path.extname(v.file).slice(1).toLowerCase().replace('jpg', 'jpeg');
  v.src = `data:image/${ext};base64,` + fs.readFileSync(v.file).toString('base64');
}

const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('pageerror', e => console.error('page error:', e.message));
await page.goto(pathToFileURL(path.join(here, 'renderer.html')).href);
await page.evaluate(t => window.setup(t), tl);

if (previews) {
  for (const s of previews) {
    const [url] = await page.evaluate(([t]) => window.frames(t, 1, 30, 0.92), [s]);
    const file = path.join(outDir, `preview_${s}.jpg`);
    fs.writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
    console.log(file);
  }
  await browser.close();
  process.exit(0);
}

const fps = tl.fps || 30;
const total = Math.ceil(tl.duration * fps);
const out = path.join(outDir, 'video.mp4');
const ff = spawn('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
  '-i', path.join(outDir, 'audio.wav'),
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', String(fps),
  '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
  '-shortest', '-movflags', '+faststart', out,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const BATCH = 15;
const t0 = Date.now();
for (let f = 0; f < total; f += BATCH) {
  const n = Math.min(BATCH, total - f);
  const urls = await page.evaluate(([s, n, fps]) => window.frames(s, n, fps, 0.9), [f / fps, n, fps]);
  for (const u of urls) {
    const ok = ff.stdin.write(Buffer.from(u.slice(u.indexOf(',') + 1), 'base64'));
    if (!ok) await new Promise(r => ff.stdin.once('drain', r));
  }
  if ((f / BATCH) % 20 === 0) process.stdout.write(`\rframe ${f}/${total}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
ff.stdin.end();
await new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))));
await browser.close();
console.log(`\nwrote ${out}`);
