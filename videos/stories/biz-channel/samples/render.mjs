import { createRequire } from 'node:module'; const require = createRequire('/Users/canberkasaroglu/cosmic-run/.claude/skills/story-video/scripts/'); const { chromium } = require('playwright');
const fs = require('fs'); const b = await chromium.launch({ channel: 'chrome' }); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const f of fs.readdirSync('.').filter(f => f.endsWith('.svg'))) { await p.setContent(`<body style="margin:0">${fs.readFileSync(f, 'utf8')}</body>`); await p.waitForTimeout(300); await p.screenshot({ path: f.replace('.svg', '.png') }); }
await b.close();
