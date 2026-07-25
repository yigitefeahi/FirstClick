import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
const page = await context.newPage();

async function shot(name, url, opts = {}) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  if (opts.dark) {
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.evaluate(() => document.documentElement.classList.add('dark'));
  }
  if (opts.wait) await page.waitForTimeout(opts.wait);
  if (opts.scroll) {
    await page.evaluate((y) => {
      const el = document.querySelector('.landing-snap') || window;
      if (el === window) window.scrollTo(0, y);
      else el.scrollTo(0, y);
    }, opts.scroll);
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: path.join(dir, name), fullPage: opts.fullPage ?? false });
  console.log('ok', name);
}

await shot('01-landing-light.png', 'http://localhost:3000');
await shot('02-landing-slide2.png', 'http://localhost:3000', { scroll: 900 });
await shot('03-analyze-light.png', 'http://localhost:3000/analyze');
await shot('04-demo-results.png', 'http://localhost:3000/demo', { wait: 1500, fullPage: false });
await shot('05-demo-results-full.png', 'http://localhost:3000/demo', { wait: 1500, fullPage: true });
await shot('06-talk-demo.png', 'http://localhost:3000/results/demo-public/talk', { wait: 2000 });

// dark
const dark = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
const dp = await dark.newPage();
await dp.addInitScript(() => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.classList.add('dark');
});
await dp.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await dp.evaluate(() => document.documentElement.classList.add('dark'));
await dp.screenshot({ path: path.join(dir, '07-landing-dark.png') });
await dp.goto('http://localhost:3000/demo', { waitUntil: 'networkidle' });
await dp.evaluate(() => document.documentElement.classList.add('dark'));
await dp.waitForTimeout(1500);
await dp.screenshot({ path: path.join(dir, '08-demo-dark.png') });
await dp.goto('http://localhost:3000/analyze', { waitUntil: 'networkidle' });
await dp.evaluate(() => document.documentElement.classList.add('dark'));
await dp.screenshot({ path: path.join(dir, '09-analyze-dark.png') });
await dp.goto('http://localhost:3000/results/demo-public/talk', { waitUntil: 'networkidle' });
await dp.evaluate(() => document.documentElement.classList.add('dark'));
await dp.waitForTimeout(1500);
await dp.screenshot({ path: path.join(dir, '10-talk-dark.png') });

console.log('done');
await browser.close();
