import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const D = path.dirname(new URL(import.meta.url).pathname);
const srv = http.createServer((q, r) => { const p = path.join(D, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!fs.existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': p.endsWith('.html') ? 'text/html' : 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1'); await new Promise(r => srv.on('listening', r));
const b = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] }); const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await pg.goto(`http://127.0.0.1:${srv.address().port}/index.html`); const info = await pg.evaluate(() => window.ready);
const ev = await pg.evaluate(() => window.events());
fs.writeFileSync(path.join(D, 'audio/events.json'), JSON.stringify({ DUR: info.DUR, CUE: info.CUE, chapters: info.chapters, events: ev }, null, 1));
console.log('events', ev.length, 'DUR', info.DUR); await b.close(); srv.close();
