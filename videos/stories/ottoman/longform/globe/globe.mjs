#!/usr/bin/env node
// Renders the globe clips (intro, 23 chapter interludes, outro) to videos/out/ottoman/long/_globe/*.mp4
// usage: node globe.mjs [--still name:t ...] [--only intro,ch01,...]
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);   // longform/ (globe/ + geo/)
const OUT = path.join(os.homedir(), 'cosmic-run/videos/out/ottoman/long/_globe');
const require = createRequire(path.join(os.homedir(), 'cosmic-run/.claude/skills/story-video/scripts/x.js'));
const { chromium } = require('playwright');
const args = process.argv.slice(2);
const stills = args.includes('--still') ? args.slice(args.indexOf('--still') + 1).filter(a => a.includes(':')) : null;
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;

const chapters = JSON.parse(fs.readFileSync(path.join(ROOT, 'chapters.json'), 'utf8'));
const lf = JSON.parse(fs.readFileSync(path.join(ROOT, 'longform.json'), 'utf8'));
const meta = k => JSON.parse(fs.readFileSync(path.join(OUT, `${k}.json`), 'utf8'));
const WIDE = { '05': 2.7, '06b': 3.0, '07': 2.6, '12': 2.6, '13': 2.0 };
const IBERIA = { lat: 39, lon: 32, dist: 2.4 };   // home view: Anatolia

const clips = [];
const im = meta('intro');
const ow = im.lines.flatMap(l => l.words).find(w => /^Ottoman/.test(w.w));
clips.push({ name: 'intro', kind: 'intro', duration: im.duration, meta: im, title: lf.title, subtitle: lf.subtitle, from: { lat: 12, lon: -50, dist: 4.8 }, to: IBERIA, audio: 'intro.wav' });
let prev = IBERIA;
for (const c of chapters) {
  const to = { lat: c.lat, lon: c.lon, dist: WIDE[c.out] || 1.75 };
  if (c.route) {   // frame the whole route: aim at its midpoint
    const lats = c.route.map(p => p[0]), lons = c.route.map(p => p[1]);
    to.lat = (Math.min(...lats) + Math.max(...lats)) / 2; to.lon = (Math.min(...lons) + Math.max(...lons)) / 2;
  }
  clips.push({ name: `ch${String(c.n).padStart(2, '0')}`, kind: 'chapter', duration: 4.0, n: c.n, title: c.title, years: c.years,
    place: c.place, route: c.route, spain: true, from: prev, to: { ...to, lat: c.route ? to.lat : c.lat, lon: c.route ? to.lon : c.lon },
    markerAt: [c.lat, c.lon], audio: 'interlude.wav' });
  prev = clips[clips.length - 1].to;
}
const om = meta('outro');
clips.push({ name: 'outro', kind: 'outro', duration: om.duration, meta: om, from: { lat: 39.9, lon: 32.9, dist: 1.8 }, to: { lat: 30, lon: 20, dist: 4.4 }, audio: 'outro.wav' });

// static server: globe.html imports ES modules, which file:// would block
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.geojson': 'application/json' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise(r => server.once('listening', r));
const port = server.address().port;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', e => console.error('page error:', e.message));
page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
await page.goto(`http://127.0.0.1:${port}/globe/globe.html`);
await page.waitForFunction(() => window.ready);
const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(os.homedir(), 'cosmic-run/brand/history-sketches/option_c.png')).toString('base64');
const tughra = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'emblem.png')).toString('base64');
await page.evaluate(([l, tg]) => window.init(l, tg), [logo, tughra]);

const fixMarker = c => (c.kind === 'chapter' ? { ...c, to: { ...c.to }, markerAt: c.markerAt } : c);
async function load(c) {
  await page.evaluate(c => {
    setClip(c);
    if (c.markerAt) { window.__m = c.markerAt; }
  }, fixMarker(c));
}

if (stills) {
  for (const s of stills) {
    const [name, t] = s.split(':'); const c = clips.find(x => x.name === name); await load(c);
    const [u] = await page.evaluate(([t]) => frames(t, 1, 30), [Number(t)]);
    const f = path.join(OUT, `still_${name}_${t}.jpg`); fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64')); console.log(f);
  }
} else {
  for (const c of clips) {
    if (only && !only.includes(c.name)) continue;
    await load(c);
    const fps = 30, total = Math.round(c.duration * fps), file = path.join(OUT, `${c.name}.mp4`);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-i', path.join(OUT, c.audio), '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', String(fps),
      '-af', c.kind === 'chapter' ? 'volume=0.9' : 'loudnorm=I=-14:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
      '-t', String(c.duration), '-movflags', '+faststart', file], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = 0; f < total; f += 15) {
      const urls = await page.evaluate(([s, n]) => frames(s, n, 30), [f / fps, Math.min(15, total - f)]);
      for (const u of urls) if (!ff.stdin.write(Buffer.from(u.slice(u.indexOf(',') + 1), 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise((r, j) => ff.on('close', code => (code ? j(new Error(c.name)) : r())));
    console.log('wrote', c.name);
  }
}
await browser.close(); server.close();
