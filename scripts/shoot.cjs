// node scripts/shoot.cjs [baseURL] [outdir] [csvIndices] [w] [h]
// Screenshots specific screen indices of the running microsite.
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const base = process.argv[2] || 'http://localhost:5191/';
  const outdir = process.argv[3] || 'screens-out';
  const indices = (process.argv[4] || '0,1,2,7,8').split(',').map((s) => parseInt(s, 10));
  const W = parseInt(process.argv[5] || '1440', 10);
  const H = parseInt(process.argv[6] || '900', 10);
  fs.mkdirSync(outdir, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: W, height: H, deviceScaleFactor: 1.5 });
  await p.goto(base, { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts && document.fonts.ready);
  // disable smooth scrolling for deterministic capture
  await p.addStyleTag({ content: '.deck{scroll-behavior:auto !important;}' });
  for (const i of indices) {
    await p.evaluate((idx) => {
      const deck = document.querySelector('.deck');
      const el = document.querySelector(`[data-screen-index="${idx}"]`);
      if (deck && el) deck.scrollTop = el.offsetTop;
    }, i);
    await new Promise((r) => setTimeout(r, 1200));
    const num = String(i).padStart(2, '0');
    await p.screenshot({ path: path.join(outdir, `screen-${num}.png`) });
    process.stdout.write(`shot ${i} `);
  }
  await b.close();
  console.log(`\n-> ${outdir} @ ${W}x${H}`);
})();
