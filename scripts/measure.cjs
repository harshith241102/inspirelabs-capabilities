// node scripts/measure.cjs [baseURL]  — reports rendered size of brand logos
const puppeteer = require('puppeteer');
(async () => {
  const base = process.argv[2] || 'http://localhost:5191/';
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await p.goto(base, { waitUntil: 'networkidle0' });
  await p.evaluate(() => (document.fonts ? document.fonts.ready : null));

  const measure = (sel) =>
    p.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), natW: el.naturalWidth, natH: el.naturalHeight };
    }, sel);

  const cover = await measure('.cover__lockup');
  console.log('COVER  .cover__lockup =', JSON.stringify(cover));

  // jump to contact screen (37) and measure its lockup
  await p.evaluate(() => {
    const deck = document.querySelector('.deck');
    const el = document.querySelector('[data-screen-index="37"]');
    if (deck && el) deck.scrollTop = el.offsetTop;
  });
  await new Promise((r) => setTimeout(r, 900));
  const contact = await measure('#contact img');
  console.log('CONTACT #contact img =', JSON.stringify(contact));

  // gridmark on a content screen
  await p.evaluate(() => {
    const deck = document.querySelector('.deck');
    const el = document.querySelector('[data-screen-index="8"]');
    if (deck && el) deck.scrollTop = el.offsetTop;
  });
  await new Promise((r) => setTimeout(r, 700));
  const grid = await measure('#grabon-flagship .gridmark');
  console.log('GRIDMARK (s8) =', JSON.stringify(grid));

  await b.close();
})();
