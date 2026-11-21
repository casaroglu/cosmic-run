import { createRequire } from 'node:module'; import path from 'node:path';
const require = createRequire(path.join(process.env.HOME, 'cosmic-run/.claude/skills/story-video/scripts/x.js'));
const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2560, height: 1440 } });
await p.goto('file://' + path.resolve('banner.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
await (await p.$('#banner')).screenshot({ path: 'banner_2560.png' });
await b.close();
