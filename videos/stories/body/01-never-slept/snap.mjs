import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const D = path.dirname(new URL(import.meta.url).pathname); const ts = process.argv.slice(2).map(Number);
const srv = http.createServer((q, r) => { const p = path.join(D, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!fs.existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': p.endsWith('.html') ? 'text/html' : 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1'); await new Promise(r => srv.on('listening', r));
const b = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] }); const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on('pageerror', e => console.log('pageerror:', e.message)); pg.on('console', m => { if (m.type() === 'error' && !m.text().includes('404')) console.log('console:', m.text()); });
await pg.goto(`http://127.0.0.1:${srv.address().port}/index.html`); await pg.evaluate(() => window.ready);
for (const t of ts) { const d = await pg.evaluate(([t]) => window.frame(t, 0.9), [t]); fs.writeFileSync(`/tmp/claude-501/snap_${t}.jpg`, Buffer.from(d.split(',')[1], 'base64')); }
await b.close(); srv.close();
