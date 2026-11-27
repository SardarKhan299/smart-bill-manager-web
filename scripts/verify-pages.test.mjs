import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.smartbillmanager";
const SITE_HOST = "https://smart-bill-manager-web.sardar-khan299.workers.dev";

const PAIN_POINT_PAGES = [
  { slug: "offline-budget-app", route: "bills", keyword: "offline budget app" },
  { slug: "warranty-tracker", route: "warranties", keyword: "warranty tracker app" },
  { slug: "offline-receipt-scanner", route: "scan", keyword: "offline receipt scanner" },
  { slug: "bill-reminder-app", route: "add-bill", keyword: "bill reminder app" },
  { slug: "daily-cash-tracker", route: "cash-log", keyword: "daily cash expense tracker" },
  { slug: "debt-tracker", route: "bills", keyword: "personal debt tracker app" },
];

const DEEP_LINK_PAGES = [
  { slug: "scan", route: "scan" },
  { slug: "bills", route: "bills" },
  { slug: "warranties", route: "warranties" },
  { slug: "cash-log", route: "cash-log" },
  { slug: "analytics", route: "analytics" },
  { slug: "pro", route: "pro" },
];

const EXPECTED_FINGERPRINTS = [
  "6B:66:6D:35:BF:F8:80:3D:8B:82:CF:1E:7D:85:7F:6F:AC:B0:22:B5:41:5C:5B:5E:43:DE:B0:13:88:A8:4F:7C",
  "C4:9F:30:8B:71:C2:FF:16:27:21:FE:CA:E5:1A:3A:EE:B4:CE:6A:7B:2B:59:DD:16:6B:1E:5D:4E:0E:F9:04:E8",
  "76:56:C8:9E:65:42:11:5E:8D:AD:E0:24:D1:8A:0D:EE:E1:2D:75:24:89:74:71:A7:08:A5:C8:AE:76:0E:B4:80",
  "83:F7:37:3E:CD:22:90:ED:30:1F:AD:A8:2D:CB:3D:0F:E4:CC:B1:14:DF:EF:90:65:E0:71:5C:94:43:8E:D9:F3",
];

function walkHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

test("every exported HTML page includes a Google Play download link and core SEO tags", () => {
  assert.ok(fs.existsSync(OUT), "out/ directory must exist (run npm run build:site first)");
  const htmlFiles = walkHtml(OUT).filter(
    (f) => !f.endsWith("404.html") && !f.endsWith("google7587fd459982fd40.html") && !path.relative(OUT, f).startsWith("404/")
  );
  assert.ok(htmlFiles.length >= 48, `Expected at least 48 HTML pages, found ${htmlFiles.length}`);

  for (const file of htmlFiles) {
    const rel = path.relative(OUT, file);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(html.includes(PLAY_URL), `${rel} is missing Google Play download link`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${rel} is missing <title>`);
    assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i, `${rel} is missing meta description`);
    assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/smart-bill-manager-web\.sardar-khan299\.workers\.dev\//i, `${rel} is missing canonical`);
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    assert.equal(h1Count, 1, `${rel} must have exactly 1 <h1>, found ${h1Count}`);
  }
});

test("all 6 pain-point SEO landing pages have keywords, FAQ JSON-LD, consistent .actions UI, and deep links", () => {
  for (const page of PAIN_POINT_PAGES) {
    const file = path.join(OUT, page.slug, "index.html");
    assert.ok(fs.existsSync(file), `Missing out/${page.slug}/index.html`);
    const html = fs.readFileSync(file, "utf8");

    assert.ok(html.includes(`name="keywords"`), `${page.slug} missing keywords meta tag`);
    assert.ok(html.toLowerCase().includes(page.keyword), `${page.slug} missing target keyword "${page.keyword}"`);
    assert.ok(html.includes(`"@type":"FAQPage"`), `${page.slug} missing FAQPage JSON-LD`);
    assert.ok(html.includes(`"@type":"BreadcrumbList"`), `${page.slug} missing BreadcrumbList JSON-LD`);
    assert.ok(html.includes(`class="actions"`), `${page.slug} should use standard .actions CTA layout class`);
    assert.ok(
      html.includes(`intent://${page.route}#Intent;scheme=smartbillmanager;package=com.smartbillmanager;S.browser_fallback_url=`),
      `${page.slug} missing Android intent:// deep link for route "${page.route}"`
    );
    assert.ok(html.includes(PLAY_URL), `${page.slug} missing direct Google Play fallback link`);
  }
});

test("all 6 verified App Link fallback pages exist with intent:// deep links and Play CTAs", () => {
  for (const page of DEEP_LINK_PAGES) {
    const file = path.join(OUT, page.slug, "index.html");
    assert.ok(fs.existsSync(file), `Missing out/${page.slug}/index.html`);
    const html = fs.readFileSync(file, "utf8");

    assert.ok(html.includes(`class="actions"`), `${page.slug} should use standard .actions CTA layout class`);
    assert.ok(
      html.includes(`intent://${page.route}#Intent;scheme=smartbillmanager;package=com.smartbillmanager;S.browser_fallback_url=`),
      `${page.slug} missing Android intent:// deep link`
    );
    assert.ok(html.includes(PLAY_URL), `${page.slug} missing Google Play download link`);
  }
});

test("Digital Asset Links JSON and Cloudflare _headers are valid for Play Console verification", () => {
  const assetLinksPath = path.join(OUT, ".well-known", "assetlinks.json");
  assert.ok(fs.existsSync(assetLinksPath), "Missing out/.well-known/assetlinks.json");
  const parsed = JSON.parse(fs.readFileSync(assetLinksPath, "utf8"));
  assert.ok(Array.isArray(parsed) && parsed.length > 0, "assetlinks.json must be a non-empty JSON array");
  const entry = parsed[0];
  assert.deepEqual(entry.relation, ["delegate_permission/common.handle_all_urls"]);
  assert.equal(entry.target.namespace, "android_app");
  assert.equal(entry.target.package_name, "com.smartbillmanager");
  for (const fp of EXPECTED_FINGERPRINTS) {
    assert.ok(entry.target.sha256_cert_fingerprints.includes(fp), `Missing SHA-256 fingerprint ${fp}`);
  }

  const headersPath = path.join(OUT, "_headers");
  assert.ok(fs.existsSync(headersPath), "Missing out/_headers");
  const headers = fs.readFileSync(headersPath, "utf8");
  assert.ok(headers.includes("/.well-known/assetlinks.json"), "_headers missing assetlinks.json rule");
  assert.ok(headers.includes("Content-Type: application/json"), "_headers missing application/json Content-Type");
});

test("sitemap.xml includes all 6 pain-point SEO pages and all 6 deep-link fallback pages", () => {
  const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  for (const page of [...PAIN_POINT_PAGES, ...DEEP_LINK_PAGES]) {
    assert.ok(sitemap.includes(`<loc>${SITE_HOST}/${page.slug}/</loc>`), `sitemap.xml missing /${page.slug}/`);
  }
});

test("FAQ and Blog hub pages link to all 6 pain-point pages and include Android deep links + Play CTAs", () => {
  for (const hub of ["faq", "blog"]) {
    const file = path.join(OUT, hub, "index.html");
    assert.ok(fs.existsSync(file), `Missing out/${hub}/index.html`);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(html.includes(`name="keywords"`), `${hub} missing keywords meta tag`);
    assert.ok(html.includes(`class="actions"`), `${hub} missing standard .actions CTA layout class`);
    assert.ok(html.includes("intent://"), `${hub} missing Android intent:// deep link`);
    assert.ok(html.includes(PLAY_URL), `${hub} missing Google Play download link`);
    for (const page of PAIN_POINT_PAGES) {
      assert.ok(html.includes(`/${page.slug}/`), `${hub} missing link to /${page.slug}/`);
    }
  }
  const faqHtml = fs.readFileSync(path.join(OUT, "faq", "index.html"), "utf8");
  assert.ok(faqHtml.includes(`"@type":"FAQPage"`), "faq missing FAQPage JSON-LD");
});
