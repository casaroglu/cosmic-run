import { createRequire } from 'node:module'; import path from 'node:path';
const require = createRequire(path.join(process.env.HOME, 'cosmic-run/.claude/skills/story-video/scripts/x.js'));
const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 800, height: 2400 } });
await p.goto('file://' + path.resolve('logos.html')); await p.waitForTimeout(1500); await p.evaluate(() => document.fonts.ready);
for (const id of ['a', 'b', 'c']) await (await p.$('#' + id)).screenshot({ path: `option_${id}.png` });
await b.close();
