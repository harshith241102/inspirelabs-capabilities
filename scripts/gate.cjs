// node scripts/gate.cjs [baseURL] [screenshotDir]
// Two gates:
//  1) Live DOM canvas gate: every .screen__stage is exactly 1920x1080 and its
//     content does not overflow the canvas (scrollWidth/Height <= client + slack).
//  2) Screenshot dimension gate: every screen-NN.png in screenshotDir is 1920x1080
//     and there is no screen-NaN.png.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const TOTAL = 38;
const SLACK = 2; // px tolerance for sub-pixel rounding

function pngSize(file) {
  const buf = fs.readFileSync(file);
  if (buf.length < 24 || buf.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

(async () => {
  const rawBase = process.argv[2] || 'http://localhost:5191/';
  const shotDir = process.argv[3] || 'screens-out/desktop-1920';
  const url = new URL(rawBase);
  url.searchParams.set('export', '1');

  const b = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await p.goto(url.toString(), { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts && document.fonts.ready);

  const domFails = [];
  const warns = [];
  for (let i = 0; i < TOTAL; i++) {
    const m = await p.evaluate((idx) => {
      const deck = document.querySelector('.deck');
      const el = document.querySelector(`[data-screen-index="${idx}"]`);
      if (!deck || !el) return null;
      deck.scrollTop = el.offsetTop;
      const stage = el.querySelector('.screen__stage');
      if (!stage) return { missing: true };
      const base = {
        ow: stage.offsetWidth,
        oh: stage.offsetHeight,
        sw: stage.scrollWidth,
        sh: stage.scrollHeight,
        cw: stage.clientWidth,
        ch: stage.clientHeight,
      };
      // Natural-height probe: the stage clips with overflow:hidden, so a screen
      // whose content is taller than 1080 reports no scroll overflow but visibly
      // clips/overlaps. Measure the unconstrained content height.
      const prevH = stage.style.height, prevO = stage.style.overflow;
      stage.style.height = 'auto';
      stage.style.overflow = 'visible';
      const natural = Math.round(stage.scrollHeight);
      // Also probe horizontal natural width of the inner content.
      let naturalW = 0;
      stage.querySelectorAll(':scope > *').forEach((c) => {
        naturalW = Math.max(naturalW, Math.round(c.scrollWidth));
      });
      stage.style.height = prevH;
      stage.style.overflow = prevO;
      base.natural = natural;
      base.naturalW = naturalW;
      return base;
    }, i);
    if (!m) { domFails.push(`s${i}: screen/stage not found`); continue; }
    if (m.missing) { domFails.push(`s${i}: no .screen__stage`); continue; }
    if (m.ow !== 1920 || m.oh !== 1080) domFails.push(`s${i}: stage ${m.ow}x${m.oh} (expected 1920x1080)`);
    if (m.sw > m.cw + SLACK) domFails.push(`s${i}: horizontal overflow ${m.sw} > ${m.cw}`);
    if (m.sh > m.ch + SLACK) domFails.push(`s${i}: vertical overflow ${m.sh} > ${m.ch}`);
    // Natural-height probe is a heuristic WARNING (it over-reports for screens
    // whose dominant visual is a flex:1 fill-and-crop image). Severe values are
    // the ones to inspect; visual QA is the ground truth.
    if (m.natural > 1180) warns.push(`s${i}: tall content, natural ${m.natural}px (inspect)`);
  }
  await b.close();

  // Screenshot dimension gate
  const shotFails = [];
  let shotCount = 0;
  if (fs.existsSync(shotDir)) {
    const files = fs.readdirSync(shotDir).filter((f) => f.endsWith('.png'));
    if (files.some((f) => /NaN/i.test(f))) shotFails.push('found screen-NaN.png');
    for (const f of files.filter((f) => /^screen-\d+\.png$/.test(f))) {
      shotCount++;
      const s = pngSize(path.join(shotDir, f));
      if (!s) shotFails.push(`${f}: unreadable`);
      else if (s.w !== 1920 || s.h !== 1080) shotFails.push(`${f}: ${s.w}x${s.h}`);
    }
  } else {
    shotFails.push(`dir not found: ${shotDir} (run shoot.cjs first)`);
  }

  console.log('=== DOM CANVAS GATE ===');
  console.log(domFails.length ? domFails.join('\n') : `OK: all ${TOTAL} stages 1920x1080, no overflow`);
  if (warns.length) {
    console.log('\n--- WARNINGS (heuristic, inspect visually) ---');
    console.log(warns.join('\n'));
  }
  console.log('\n=== SCREENSHOT DIMENSION GATE ===');
  console.log(shotFails.length ? shotFails.join('\n') : `OK: ${shotCount} frames all 1920x1080, no screen-NaN.png`);

  const failed = domFails.length + shotFails.length;
  console.log(`\n${failed ? 'FAIL (' + failed + ' issues)' : 'PASS'}`);
  process.exit(failed ? 1 : 0);
})();
