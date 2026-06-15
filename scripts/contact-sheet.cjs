// node scripts/contact-sheet.cjs [inDir] [outFile]
// Assembles screen-NN.png frames from inDir into one labelled contact sheet PNG.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const inDir = process.argv[2] || 'screens-out/desktop-1920';
  const outFile = process.argv[3] || 'screens-out/contact-sheet.png';
  const files = fs
    .readdirSync(inDir)
    .filter((f) => /^screen-\d+\.png$/.test(f))
    .sort();
  if (!files.length) {
    console.error(`No screen-NN.png frames in ${inDir}. Run "npm run shoot" first.`);
    process.exit(1);
  }
  const cells = files
    .map((f) => {
      const n = f.match(/(\d+)/)[1];
      const b64 = fs.readFileSync(path.join(inDir, f)).toString('base64');
      return `<figure><img src="data:image/png;base64,${b64}"/><figcaption>Screen ${n}</figcaption></figure>`;
    })
    .join('');
  const cols = 4;
  const html = `<html><body style="margin:0;background:#111;font-family:-apple-system,sans-serif">
    <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px;padding:24px">
      ${cells}
    </div>
    <style>
      figure{margin:0}
      img{width:100%;display:block;border:1px solid #333;border-radius:6px}
      figcaption{color:#aaa;font-size:13px;padding:6px 2px;font-variant-numeric:tabular-nums}
    </style>
  </body></html>`;
  const b = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1680, height: 1000, deviceScaleFactor: 1 });
  await p.setContent(html, { waitUntil: 'networkidle0' });
  await p.screenshot({ path: outFile, fullPage: true });
  await b.close();
  console.log(`-> ${outFile} (${files.length} frames, ${cols} cols)`);
})();
