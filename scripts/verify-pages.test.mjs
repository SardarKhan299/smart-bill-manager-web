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
  { slug: "debt-tracker", route: "debt-tracker", keyword: "personal debt tracker app" },
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

test("zero draft or placeholder text exists in production HTML, and /privacy/, /support/, /llms.txt are valid", () => {
  const forbidden = ["this is a website draft", "replace this placeholder", "lorem ipsum", "todo:"];
  const htmlFiles = walkHtml(OUT).filter((f) => !f.endsWith("google7587fd459982fd40.html"));
  for (const file of htmlFiles) {
    const rel = path.relative(OUT, file);
    const lower = fs.readFileSync(file, "utf8").toLowerCase();
    for (const phrase of forbidden) {
      assert.ok(!lower.includes(phrase), `${rel} contains forbidden placeholder phrase "${phrase}"`);
    }
  }

  const privacyHtml = fs.readFileSync(path.join(OUT, "privacy", "index.html"), "utf8");
  assert.ok(privacyHtml.includes("sardarkhan.dev@gmail.com"), "privacy page missing verified contact email");
  assert.ok(privacyHtml.includes("RevenueCat"), "privacy page missing RevenueCat disclosure");

  const supportHtml = fs.readFileSync(path.join(OUT, "support", "index.html"), "utf8");
  assert.ok(supportHtml.includes("mailto:sardarkhan.dev@gmail.com"), "support page missing working mailto link");
  assert.ok(supportHtml.includes("intent://bills"), "support page missing Android deep link");

  const llmsPath = path.join(OUT, "llms.txt");
  assert.ok(fs.existsSync(llmsPath), "Missing out/llms.txt");
  const llms = fs.readFileSync(llmsPath, "utf8");
  assert.ok(llms.includes(PLAY_URL), "llms.txt missing Google Play URL");
  assert.ok(llms.includes(`${SITE_HOST}/offline-budget-app/`), "llms.txt missing pain-point URLs");
  assert.ok(
    llms.includes(`${SITE_HOST}/tools/subscription-cost-calculator/`),
    "llms.txt missing subscription-cost-calculator URL"
  );
  assert.ok(
    llms.includes(`${SITE_HOST}/tools/debt-payoff-calculator/`),
    "llms.txt missing debt-payoff-calculator URL"
  );
  assert.ok(
    llms.includes(`${SITE_HOST}/tools/bill-split-calculator/`),
    "llms.txt missing bill-split-calculator URL"
  );
  assert.ok(
    llms.includes(`${SITE_HOST}/blog/import-bank-csv-offline-guide/`),
    "llms.txt missing import-bank-csv-offline-guide URL"
  );
});

test("all 9 free calculators have WebApplication free Offer JSON-LD, OG/Twitter tags, decimal inputs, aria-live, reset, and deep-link CTAs", () => {
  const calculators = [
    { slug: "bill-calculator", route: "bills" },
    { slug: "budget-calculator", route: "analytics" },
    { slug: "safe-to-spend-calculator", route: "bills" },
    { slug: "subscription-cost-calculator", route: "subscriptions" },
    { slug: "debt-payoff-calculator", route: "debt-tracker" },
    { slug: "bill-split-calculator", route: "bill-splitter" },
    { slug: "savings-goal-calculator", route: "savings-goals" },
    { slug: "cash-flow-calculator", route: "cash-flow" },
    { slug: "monthly-expense-calculator", route: "cash-log" },
  ];

  const toolsHubHtml = fs.readFileSync(path.join(OUT, "tools", "index.html"), "utf8");
  const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");

  for (const calc of calculators) {
    const file = path.join(OUT, "tools", calc.slug, "index.html");
    assert.ok(fs.existsSync(file), `Missing out/tools/${calc.slug}/index.html`);
    const html = fs.readFileSync(file, "utf8");

    assert.ok(html.includes(`name="keywords"`), `${calc.slug} missing keywords meta tag`);
    assert.ok(html.includes(`property="og:title"`), `${calc.slug} missing og:title`);
    assert.ok(html.includes(`name="twitter:title"`), `${calc.slug} missing twitter:title`);
    assert.ok(html.includes(`"@type":"WebApplication"`), `${calc.slug} missing WebApplication JSON-LD`);
    assert.ok(html.includes(`"price":"0"`), `${calc.slug} missing free Offer price:0 in JSON-LD`);
    assert.ok(html.includes(`"priceCurrency":"USD"`), `${calc.slug} missing priceCurrency:USD in JSON-LD`);
    assert.ok(html.includes(`"@type":"FAQPage"`), `${calc.slug} missing FAQPage JSON-LD`);
    assert.ok(html.includes(`"@type":"BreadcrumbList"`), `${calc.slug} missing BreadcrumbList JSON-LD`);
    assert.ok(html.includes(`inputMode="decimal"`) || html.includes(`inputmode="decimal"`), `${calc.slug} missing decimal inputMode`);
    assert.ok(html.includes(`aria-live="polite"`), `${calc.slug} missing aria-live polite region`);
    assert.ok(html.includes(`Reset example`), `${calc.slug} missing Reset example button`);
    assert.ok(html.includes(`class="actions"`), `${calc.slug} missing .actions CTA container`);
    assert.ok(
      html.includes(`intent://${calc.route}#Intent;scheme=smartbillmanager;package=com.smartbillmanager;S.browser_fallback_url=`),
      `${calc.slug} missing Android intent:// deep link for route "${calc.route}"`
    );
    assert.ok(
      html.includes(`deep_link_route%253D${calc.route}`),
      `${calc.slug} missing deferred deep_link_route=${calc.route} in Play fallback URL`
    );
    assert.ok(html.includes(PLAY_URL), `${calc.slug} missing Google Play download link`);
    assert.ok(toolsHubHtml.includes(`/tools/${calc.slug}/`), `/tools/ hub missing link to ${calc.slug}`);
    assert.ok(
      sitemap.includes(`<loc>${SITE_HOST}/tools/${calc.slug}/</loc>`),
      `sitemap.xml missing /tools/${calc.slug}/`
    );
  }
});

test("all 15 blog articles and legacy feature pages include Android deep links, Play Install Referrer UTM attribution, skip-link, and SEO audit docs", () => {
  const blogDir = path.join(OUT, "blog");
  const blogSlugs = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  assert.equal(blogSlugs.length, 15, `Expected 15 blog articles, found ${blogSlugs.length}`);
  assert.ok(blogSlugs.includes("import-bank-csv-offline-guide"), "Missing import-bank-csv-offline-guide blog directory");
  const blogHubHtml = fs.readFileSync(path.join(OUT, "blog", "index.html"), "utf8");
  assert.ok(blogHubHtml.includes("/blog/import-bank-csv-offline-guide/"), "/blog/ hub missing link to import-bank-csv-offline-guide");

  for (const slug of blogSlugs) {
    const html = fs.readFileSync(path.join(blogDir, slug, "index.html"), "utf8");
    assert.ok(html.includes(`name="keywords"`), `blog/${slug} missing keywords meta`);
    assert.ok(html.includes(`class="actions"`), `blog/${slug} missing .actions CTA block`);
    assert.ok(html.includes("intent://"), `blog/${slug} missing Android intent:// deep link`);
    assert.ok(
      html.includes("utm_source%3Dwebsite"),
      `blog/${slug} missing Google Play Install Referrer UTM attribution`
    );
    assert.ok(html.includes(`"dateModified":"2026-11-27"`), `blog/${slug} missing BlogPosting dateModified`);
    assert.ok(html.includes(`class="skip-link"`), `blog/${slug} missing accessibility skip-link`);
  }

  const featureSlugs = [
    "features",
    "how-it-works",
    "pricing",
    "compare",
    "download",
    "bill-tracker",
    "subscription-tracker",
    "budget-planner",
    "cash-flow-forecast",
    "expense-tracker",
    "receipt-manager",
    "recurring-expense-tracker",
    "safe-to-spend",
  ];
  for (const slug of featureSlugs) {
    const html = fs.readFileSync(path.join(OUT, slug, "index.html"), "utf8");
    assert.ok(html.includes(`property="og:title"`), `${slug} missing og:title`);
    assert.ok(html.includes(`name="twitter:title"`), `${slug} missing twitter:title`);
    assert.ok(html.includes("intent://"), `${slug} missing Android intent:// deep link`);
    assert.ok(html.includes("utm_source%3Dwebsite"), `${slug} missing Play Install Referrer UTM`);
  }

  const requiredDocs = [
    "docs/SEO_BASELINE.md",
    "docs/SEO_ROUTE_INVENTORY.csv",
    "docs/SEO_ISSUES.md",
    "docs/PRODUCT_DATA_AND_PRIVACY_FACTS.md",
    "docs/PRODUCT_KNOWLEDGE.md",
    "docs/AI_SEARCH_TEST_QUERIES.md",
    "docs/PROBLEM_INTELLIGENCE_DASHBOARD.md",
  ];
  for (const doc of requiredDocs) {
    assert.ok(fs.existsSync(path.resolve(doc)), `Missing required deliverable ${doc}`);
  }
});

test("all 4 App vs. Spreadsheet comparison pages and desktop Play QR SVG bridge are valid and linked", () => {
  const comparisons = [
    { slug: "bill-tracker-vs-spreadsheet", route: "bills" },
    { slug: "budget-app-vs-spreadsheet", route: "analytics" },
    { slug: "subscription-tracker-vs-spreadsheet", route: "subscriptions" },
    { slug: "expense-tracker-vs-spreadsheet", route: "cash-log" },
  ];

  const compareHubHtml = fs.readFileSync(path.join(OUT, "compare", "index.html"), "utf8");
  const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  const llms = fs.readFileSync(path.join(OUT, "llms.txt"), "utf8");

  for (const cmp of comparisons) {
    const file = path.join(OUT, "compare", cmp.slug, "index.html");
    assert.ok(fs.existsSync(file), `Missing out/compare/${cmp.slug}/index.html`);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(html.includes(`name="keywords"`), `${cmp.slug} missing keywords meta`);
    assert.ok(html.includes(`"@type":"FAQPage"`), `${cmp.slug} missing FAQPage JSON-LD`);
    assert.ok(html.includes(`"@type":"BreadcrumbList"`), `${cmp.slug} missing BreadcrumbList JSON-LD`);
    assert.ok(html.includes(`class="actions"`), `${cmp.slug} missing .actions CTA block`);
    assert.ok(html.includes(`intent://${cmp.route}#Intent;`), `${cmp.slug} missing intent://${cmp.route}`);
    assert.ok(compareHubHtml.includes(`/compare/${cmp.slug}/`), `/compare/ hub missing link to ${cmp.slug}`);
    assert.ok(sitemap.includes(`<loc>${SITE_HOST}/compare/${cmp.slug}/</loc>`), `sitemap missing /compare/${cmp.slug}/`);
    assert.ok(llms.includes(`${SITE_HOST}/compare/${cmp.slug}/`), `llms.txt missing /compare/${cmp.slug}/`);
  }

  const qrSvgPath = path.join(OUT, "play-qr.svg");
  assert.ok(fs.existsSync(qrSvgPath), "Missing out/play-qr.svg");
  const qrSvg = fs.readFileSync(qrSvgPath, "utf8");
  assert.ok(qrSvg.includes("<svg") && qrSvg.includes("<path"), "play-qr.svg must be a vector SVG path QR code");

  for (const pageWithQr of [
    path.join(OUT, "index.html"),
    path.join(OUT, "download", "index.html"),
    path.join(OUT, "tools", "index.html"),
  ]) {
    const html = fs.readFileSync(pageWithQr, "utf8");
    assert.ok(html.includes(`src="/play-qr.svg"`), `${path.relative(OUT, pageWithQr)} missing desktop QR bridge`);
  }
});
