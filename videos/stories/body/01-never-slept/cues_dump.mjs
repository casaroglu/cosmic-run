import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const D = path.dirname(new URL(import.meta.url).pathname);
const srv = http.createServer((q, r) => { const p = path.join(D, decodeURIComponent(new URL(q.url, 'http://x').pathname)); if (!fs.existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200); fs.createReadStream(p).pipe(r); }).listen(0, '127.0.0.1'); await new Promise(r => srv.on('listening', r));
const b = await chromium.launch({ channel: 'chrome' }); const pg = await b.newPage(); await pg.goto(`http://127.0.0.1:${srv.address().port}/index.html`);
const info = await pg.evaluate(() => window.ready); fs.writeFileSync(path.join(D, 'audio/cues.json'), JSON.stringify(info, null, 1)); await b.close(); srv.close(); console.log('cues', Object.keys(info.CUE).length);
