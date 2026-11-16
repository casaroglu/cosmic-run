// copies thumb.html + its images into videos/out/ottoman/long/_thumb and renders thumbnail.jpg
import { createRequire } from 'node:module'; import os from 'node:os'; import path from 'node:path'; import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const H = os.homedir(), T = path.join(H, 'cosmic-run/videos/out/ottoman/long/_thumb');
const S = path.join(H, 'cosmic-run/videos/stories/ottoman'); fs.mkdirSync(T, { recursive: true });
for (const [src, dst] of [['04a-walls/img/mehmed.jpg', 'p1.jpg'], ['06a-suleiman/img/lorck.jpg', 'p2.jpg'], ['05-selim/img/selim1524.jpg', 'p3.jpg'], ['longform/thumb.html', 'thumb.html']])
  fs.copyFileSync(path.join(S, src), path.join(T, dst));
// background: first frame of the chapter-1 globe flight (Spain highlighted, no text yet)
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', '0.45', '-i', path.join(H, 'cosmic-run/videos/out/ottoman/long/_globe/ch01.mp4'), '-frames:v', '1', path.join(T, 'bg.jpg')]);
const require = createRequire(path.join(H, 'cosmic-run/.claude/skills/story-video/scripts/x.js'));
const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto('file://' + path.join(T, 'thumb.html')); await p.waitForTimeout(800);
await p.screenshot({ path: path.join(H, 'cosmic-run/videos/out/ottoman/long/thumbnail.jpg'), type: 'jpeg', quality: 92 }); await b.close();
