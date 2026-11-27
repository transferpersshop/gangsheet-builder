// Smoke-test: builder laden → logo plaatsen → PDF exporteren.
//
// De test draait volledig lokaal:
// - CDN-bibliotheken (fabric, jsPDF, pdf-lib, ...) worden uit node_modules geserveerd,
//   in exact de versie die index.html laadt. Wijkt een versie af, dan faalt de test.
// - Supabase wordt nagebootst: er is een nep-sessie en een nep-profiel, er gaat
//   niets naar de echte database.
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');

const ROOT = path.resolve(__dirname, '..');
const INDEX_HTML = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const SUPABASE_REF = 'nzkwkydafrnvmmqiuabt';

// cdnjs-paden → npm-pakket + bestand
const CDNJS = {
  'fabric.js': { pkg: 'fabric', file: { 'fabric.min.js': 'dist/fabric.min.js' } },
  'jspdf': { pkg: 'jspdf', file: { 'jspdf.umd.min.js': 'dist/jspdf.umd.min.js' } },
  'pdf.js': { pkg: 'pdfjs-dist', file: { 'pdf.min.js': 'build/pdf.min.js', 'pdf.worker.min.js': 'build/pdf.worker.min.js' } },
};

function installedVersion(pkg) {
  return require(path.join(ROOT, 'node_modules', pkg, 'package.json')).version;
}

// Geeft { pkg, version, file } terug voor een CDN-URL, of null.
function resolveCdn(url) {
  const u = new URL(url);
  if (u.hostname === 'cdnjs.cloudflare.com') {
    const m = u.pathname.match(/^\/ajax\/libs\/([^/]+)\/([^/]+)\/(.+)$/);
    const entry = m && CDNJS[m[1]];
    if (entry && entry.file[m[3]]) return { pkg: entry.pkg, version: m[2], file: entry.file[m[3]] };
  }
  if (u.hostname === 'cdn.jsdelivr.net' || u.hostname === 'unpkg.com') {
    const m = u.pathname.match(/^(?:\/npm)?\/((?:@[^/]+\/)?[^/@]+)@([^/]+)\/(.+)$/);
    if (m) return { pkg: m[1], version: m[2], file: m[3] };
  }
  return null;
}

function fakeJwt(payload) {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  return `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64(payload)}.c21va2U`;
}

const USER = { id: '00000000-0000-4000-8000-000000000001', email: 'smoke@example.test', aud: 'authenticated', role: 'authenticated' };
const PROFILE = { id: USER.id, display_name: 'Smoke Test', role: 'customer', approved: true, blocked: false };

test('alle CDN-scripts in index.html hebben een exact versienummer en een integrity-hash', () => {
  const tags = [...INDEX_HTML.matchAll(/<script\s[^>]*src="https:\/\/[^"]+"[^>]*>/g)].map((m) => m[0]);
  expect(tags.length).toBeGreaterThan(0);
  for (const tag of tags) expect(tag, `geen integrity-hash: ${tag}`).toMatch(/integrity="sha(256|384|512)-/);

  const srcs = [...INDEX_HTML.matchAll(/https:\/\/(?:cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com)\/[^"'\s]+\.js/g)].map((m) => m[0]);
  expect(srcs.length).toBeGreaterThan(0);
  for (const src of srcs) {
    const hit = resolveCdn(src);
    expect(hit, `onbekende CDN-URL: ${src}`).not.toBeNull();
    expect(hit.version, `geen exacte versie in ${src}`).toMatch(/^\d+\.\d+\.\d+$/);
  }
});

// Laadt de builder met lokale CDN-bibliotheken en nep-Supabase. Geeft de lijst
// met problemen (JS-fouten, ontbrekende bibliotheken) terug.
async function openBuilder(page, context) {
  const problems = [];
  page.on('pageerror', (err) => problems.push(`JS-fout: ${err.message}`));

  // 1) CDN-bibliotheken uit node_modules, met versiecontrole
  await context.route(/^https:\/\/(cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com)\//, async (route) => {
    const hit = resolveCdn(route.request().url());
    if (!hit) return route.abort();
    const file = path.join(ROOT, 'node_modules', hit.pkg, hit.file);
    if (!fs.existsSync(file)) {
      problems.push(`niet lokaal beschikbaar: ${route.request().url()} (voeg ${hit.pkg}@${hit.version} toe aan devDependencies)`);
      return route.abort();
    }
    const have = installedVersion(hit.pkg);
    if (have !== hit.version) problems.push(`index.html laadt ${hit.pkg}@${hit.version}, package.json heeft ${have}`);
    return route.fulfill({ path: file, contentType: 'text/javascript' });
  });

  // 2) Lettertypes zijn niet nodig voor de test
  await context.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());

  // 3) Supabase nabootsen
  await context.route(new RegExp(`^https://${SUPABASE_REF}\\.supabase\\.co/`), (route) => {
    const { pathname } = new URL(route.request().url());
    const json = (body) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
    if (pathname.startsWith('/auth/v1/user')) return json(USER);
    if (pathname.startsWith('/rest/v1/profiles')) return json(PROFILE);
    if (pathname.startsWith('/rest/v1/')) return route.fulfill({ status: 201, contentType: 'application/json', body: '[]' });
    return json({});
  });
  const now = Math.floor(Date.now() / 1000);
  const session = {
    access_token: fakeJwt({ sub: USER.id, email: USER.email, role: 'authenticated', aud: 'authenticated', exp: now + 3600 }),
    refresh_token: 'smoke-refresh',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: now + 3600,
    user: USER,
  };
  await context.addInitScript(([key, value]) => {
    window.localStorage.setItem(key, value);
  }, [`sb-${SUPABASE_REF}-auth-token`, JSON.stringify(session)]);

  // Builder laden
  await page.goto('/index.html');
  await expect(page.locator('#appContainer')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('#loginScreen')).toBeHidden();
  return problems;
}

test('builder laden, logo plaatsen en PDF exporteren', async ({ page, context }) => {
  const problems = await openBuilder(page, context);

  // Logo plaatsen
  await page.locator('#fileInput').setInputFiles(path.join(__dirname, 'fixtures', 'logo.svg'));
  await expect
    .poll(() => page.evaluate(() => canvas.getObjects().filter((o) => o._mmW != null).length), { timeout: 20_000 })
    .toBe(1);

  // PDF exporteren
  const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
  await page.locator('#exportBtn').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.pdf$/);

  const bytes = fs.readFileSync(await download.path());
  expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
  const pdf = await PDFDocument.load(bytes);
  expect(pdf.getPageCount()).toBe(1);
  const { width, height } = pdf.getPage(0).getSize();
  expect(width).toBeGreaterThan(0);
  expect(height).toBeGreaterThan(0);

  expect(problems, problems.join('\n')).toEqual([]);
});

// Afspraak: een upload komt altijd 1-op-1 op het vel. Een A3-PDF op een A3-vel
// moet 297 × 420 mm blijven (tot v2.66.4 werd hij verkleind naar 90% van de
// velbreedte). Met GSB_A3_PDF=<pad> test je een echt klantbestand in plaats
// van het gegenereerde vel.
test('A3-PDF op A3-vel blijft 1-op-1', async ({ page, context }) => {
  const problems = await openBuilder(page, context);

  let file = process.env.GSB_A3_PDF;
  if (!file) {
    const mm = 72 / 25.4;
    const doc = await PDFDocument.create();
    const pg = doc.addPage([297 * mm, 420 * mm]);
    // Vlak tot op de rand, zodat bijsnijden niets weghaalt
    pg.drawRectangle({ x: 0, y: 0, width: 297 * mm, height: 420 * mm, color: rgb(0.1, 0.3, 0.8) });
    file = test.info().outputPath('a3-vol.pdf');
    fs.writeFileSync(file, await doc.save());
  }

  await page.evaluate(() => switchSheetFormat('a3'));
  await expect.poll(() => page.evaluate(() => [state.sheet.w, state.sheet.h])).toEqual([297, 420]);

  await page.locator('#fileInput').setInputFiles(file);
  await expect
    .poll(() => page.evaluate(() => canvas.getObjects().filter((o) => o._mmW != null).length), { timeout: 60_000 })
    .toBe(1);
  const size = await page.evaluate(() => {
    const o = canvas.getObjects().find((x) => x._mmW != null);
    return { w: o._mmW, h: o._mmH };
  });
  console.log(`A3-test: geplaatst op ${size.w.toFixed(2)} × ${size.h.toFixed(2)} mm`);
  if (!process.env.GSB_A3_PDF) {
    expect(size.w).toBeCloseTo(297, 0);
    expect(size.h).toBeCloseTo(420, 0);
  }
  expect(problems, problems.join('\n')).toEqual([]);
});
