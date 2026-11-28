import { readFile } from "node:fs/promises";

const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";
const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;
const requiredPaths = [
  "/", "/how-it-works/", "/features/", "/pricing/", "/download/", "/privacy/", "/support/",
  "/faq/", "/compare/", "/blog/", "/bill-tracker/", "/subscription-tracker/", "/expense-tracker/",
  "/budget-planner/", "/safe-to-spend/", "/cash-flow-forecast/", "/receipt-manager/",
  "/recurring-expense-tracker/", "/tools/", "/tools/bill-calculator/", "/tools/budget-calculator/",
  "/tools/safe-to-spend-calculator/", "/tools/subscription-cost-calculator/",
  "/tools/debt-payoff-calculator/", "/tools/bill-split-calculator/",
  "/tools/savings-goal-calculator/", "/tools/cash-flow-calculator/", "/tools/monthly-expense-calculator/",
  "/compare/bill-tracker-vs-spreadsheet/", "/compare/budget-app-vs-spreadsheet/",
  "/compare/subscription-tracker-vs-spreadsheet/", "/compare/expense-tracker-vs-spreadsheet/",
  "/blog/import-bank-csv-offline-guide/",
  "/offline-budget-app/", "/offline-receipt-scanner/", "/warranty-tracker/",
  "/bill-reminder-app/", "/daily-cash-tracker/", "/debt-tracker/",
  "/scan/", "/bills/", "/warranties/", "/cash-log/", "/analytics/", "/pro/"
];

const failures = [];
const warnings = [];
const results = [];

function absoluteUrl(value) {
  try { return new URL(value, SITE_URL).toString(); } catch { return null; }
}
function meta(html, attr, value) {
  const a = new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]*content=["']([^"']+)["'][^>]*>`, "i");
  const b = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*${attr}=["']${value}["'][^>]*>`, "i");
  return html.match(a)?.[1] ?? html.match(b)?.[1] ?? null;
}
function linkRel(html, rel) {
  const a = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]*href=["']([^"']+)["'][^>]*>`, "i");
  const b = new RegExp(`<link[^>]+href=["']([^"']+)["'][^>]*rel=["']${rel}["'][^>]*>`, "i");
  return html.match(a)?.[1] ?? html.match(b)?.[1] ?? null;
}
async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "SmartBillManager-ProductionAudit/1.0" }
    });
    return {
      url,
      finalUrl: response.url,
      status: response.status,
      contentType: response.headers.get("content-type") ?? "",
      body: await response.text()
    };
  } finally { clearTimeout(timer); }
}
async function mapConcurrent(items, worker) {
  const output = [];
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index++;
      try { output[current] = await worker(items[current]); }
      catch (error) { output[current] = { url: items[current], finalUrl: items[current], status: 0, contentType: "", body: "", error: String(error) }; }
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, run));
  return output;
}
function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
}

console.log("C1 production audit: " + SITE_URL);

const [robots, sitemap, ads, llms, qrSvg] = await Promise.all([
  fetchText(SITE_URL + "/robots.txt"),
  fetchText(SITE_URL + "/sitemap.xml"),
  fetchText(SITE_URL + "/app-ads.txt"),
  fetchText(SITE_URL + "/llms.txt"),
  fetchText(SITE_URL + "/play-qr.svg")
]);

if (qrSvg.status !== 200 || !qrSvg.body.includes("<svg")) {
  failures.push("play-qr.svg failed check (HTTP " + qrSvg.status + ")");
}

if (llms.status !== 200) failures.push("llms.txt returned HTTP " + llms.status);
else {
  for (const expectedPath of [
    "/tools/subscription-cost-calculator/",
    "/tools/debt-payoff-calculator/",
    "/tools/bill-split-calculator/",
    "/tools/savings-goal-calculator/",
    "/tools/cash-flow-calculator/",
    "/tools/monthly-expense-calculator/",
    "/compare/bill-tracker-vs-spreadsheet/",
    "/blog/import-bank-csv-offline-guide/"
  ]) {
    if (!llms.body.includes(expectedPath)) failures.push("llms.txt missing " + expectedPath);
  }
}

if (robots.status !== 200) failures.push("robots.txt returned HTTP " + robots.status);
if (!robots.body.includes("Sitemap: " + SITE_URL + "/sitemap.xml")) failures.push("robots.txt does not reference the production sitemap");
if (sitemap.status !== 200) failures.push("sitemap.xml returned HTTP " + sitemap.status);
if (!sitemap.body.includes(SITE_URL)) failures.push("sitemap.xml does not contain the production host");
if (sitemap.body.includes("smartbillmanager.com")) failures.push("sitemap.xml contains the retired domain");

const sitemapUrls = sitemap.status === 200 ? parseSitemap(sitemap.body) : [];
const urls = [...new Set([...requiredPaths.map((p) => SITE_URL + p), ...sitemapUrls])];
if (!sitemapUrls.length) failures.push("sitemap.xml contains no URLs");

const pages = await mapConcurrent(urls, fetchText);
for (const page of pages) {
  const path = new URL(page.finalUrl || page.url).pathname;
  if (page.status !== 200) {
    failures.push(path + ": HTTP " + page.status + (page.error ? " (" + page.error + ")" : ""));
    continue;
  }
  if (!page.contentType.toLowerCase().includes("text/html")) {
    failures.push(path + ": expected text/html, got " + page.contentType);
    continue;
  }
  const html = page.body;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() ?? "";
  const description = meta(html, "name", "description");
  const canonical = linkRel(html, "canonical");
  const ogUrl = meta(html, "property", "og:url");
  const ogImage = meta(html, "property", "og:image");
  const twitterImage = meta(html, "name", "twitter:image");
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) failures.push(path + ": missing title");
  if (!description) failures.push(path + ": missing meta description");
  if (!canonical) failures.push(path + ": missing canonical");
  if (canonical && absoluteUrl(canonical) !== page.finalUrl) failures.push(path + ": canonical does not match final URL");
  if (!ogUrl) failures.push(path + ": missing og:url");
  if (ogUrl && absoluteUrl(ogUrl) !== page.finalUrl) failures.push(path + ": og:url does not match final URL");
  if (!ogImage) failures.push(path + ": missing og:image");
  if (!twitterImage) failures.push(path + ": missing twitter:image");
  if (h1Count !== 1) failures.push(path + ": expected exactly one H1, found " + h1Count);
  if (/smartbillmanager\.com/i.test(html)) failures.push(path + ": contains retired smartbillmanager.com domain");
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) failures.push(path + ": contains noindex");
  results.push({ path, status: page.status, title, canonical, ogUrl });
}

if (ads.status !== 200) failures.push("app-ads.txt returned HTTP " + ads.status);
else if (!ads.contentType.toLowerCase().includes("text/plain")) warnings.push("app-ads.txt content-type is " + ads.contentType + "; expected text/plain");
if (!ads.body.includes("google.com,")) warnings.push("app-ads.txt does not contain a google.com authorized seller entry");

console.log("Checked " + pages.length + " production HTML URLs from sitemap + required routes.");
console.log("Passed checks: " + results.length + "; failures: " + failures.length + "; warnings: " + warnings.length);
if (warnings.length) {
  console.warn("Warnings:");
  for (const warning of warnings) console.warn(" - " + warning);
}
if (failures.length) {
  console.error("Production audit failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("Production audit passed.");
