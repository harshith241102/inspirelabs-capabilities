// node scripts/shoot.cjs [baseURL] [outdir] [csvIndices|all] [w] [h]
// Captures deck screens as exact WxH frames in export mode (no nav chrome,
// no animation). Defaults: 1920x1080, deviceScaleFactor 1, all 38 screens.
//
//   node scripts/shoot.cjs http://localhost:5191/ screens-out/desktop-1920 all
//
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const TOTAL = 39;

(async () => {
  const rawBase = process.argv[2] || 'http://localhost:5191/';
  const outdir = process.argv[3] || 'screens-out/desktop-1920';
  const idxArg = process.argv[4] || 'all';
  const W = parseInt(process.argv[5] || '1920', 10);
  const H = parseInt(process.argv[6] || '1080', 10);

  // Force export mode on the URL.
  const url = new URL(rawBase);
  url.searchParams.set('export', '1');
  const base = url.toString();

  // Resolve + validate indices. Reject NaN / out-of-range — never write screen-NaN.png.
  let indices;
  if (idxArg === 'all') {
    indices = Array.from({ length: TOTAL }, (_, i) => i);
  } else {
    indices = idxArg.split(',').map((s) => parseInt(s, 10));
  }
  const bad = indices.filter((i) => !Number.isInteger(i) || i < 0 || i >= TOTAL);
  if (bad.length) {
    console.error(`Invalid screen indices: ${JSON.stringify(bad)} (valid 0..${TOTAL - 1})`);
    process.exit(1);
  }

  fs.mkdirSync(outdir, { recursive: true });

  const launchArgs = [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    `--window-size=${W},${H}`,
  ];

  async function fresh() {
    // 'shell' = chrome-headless-shell: pure software rendering, does not touch
    // the display/GPU compositor (the 'new' headless screenshot path can wedge
    // on macOS). This is the reliable capture renderer.
    const b = await puppeteer.launch({ headless: 'shell', args: launchArgs, protocolTimeout: 180000 });
    const p = await b.newPage();
    p.setDefaultTimeout(60000);
    p.setDefaultNavigationTimeout(60000);
    await p.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await p.goto(base, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts && document.fonts.ready);
    await new Promise((r) => setTimeout(r, 600));
    await p.addStyleTag({ content: '.deck{scroll-behavior:auto !important;}' });
    return { b, p };
  }

  let { b, p } = await fresh();
  const results = [];
  let sinceRelaunch = 0;

  for (const i of indices) {
    const num = String(i).padStart(2, '0');
    const file = path.join(outdir, `screen-${num}.png`);
    let done = false;
    for (let attempt = 0; attempt < 2 && !done; attempt++) {
      try {
        // Relaunch the browser every 6 screens to keep renderer memory low.
        if (sinceRelaunch >= 6) {
          await b.close().catch(() => {});
          ({ b, p } = await fresh());
          sinceRelaunch = 0;
        }
        const ok = await p.evaluate((idx) => {
          const deck = document.querySelector('.deck');
          const el = document.querySelector(`[data-screen-index="${idx}"]`);
          if (!deck || !el) return false;
          deck.scrollLeft = el.offsetLeft;
          return true;
        }, i);
        if (!ok) {
          console.error(`Missing screen selector for index ${i}`);
          await b.close().catch(() => {});
          process.exit(2);
        }
        await new Promise((r) => setTimeout(r, 700));
        await p.screenshot({ path: file });
        results.push(file);
        sinceRelaunch++;
        done = true;
        process.stdout.write(`${i} `);
      } catch (err) {
        process.stdout.write(`(retry ${i}) `);
        await b.close().catch(() => {});
        ({ b, p } = await fresh());
        sinceRelaunch = 0;
        if (attempt === 1) console.error(`\nFailed index ${i}: ${err.message}`);
      }
    }
  }
  await b.close().catch(() => {});
  console.log(`\n-> ${results.length} frames in ${outdir} @ ${W}x${H} (export mode)`);
})();
