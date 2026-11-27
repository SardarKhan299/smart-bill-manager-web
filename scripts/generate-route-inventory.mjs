import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const CSV_PATH = path.resolve("docs/SEO_ROUTE_INVENTORY.csv");

function walkHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

function classifyPage(rel) {
  if (rel === "index.html") return "home";
  if (rel.startsWith("blog/") && rel !== "blog/index.html") return "article";
  if (rel === "blog/index.html" || rel === "faq/index.html") return "knowledge-hub";
  if (rel.startsWith("tools/")) return rel === "tools/index.html" ? "tools-hub" : "calculator-tool";
  if (
    [
      "offline-budget-app/index.html",
      "offline-receipt-scanner/index.html",
      "warranty-tracker/index.html",
      "bill-reminder-app/index.html",
      "daily-cash-tracker/index.html",
      "debt-tracker/index.html",
    ].includes(rel)
  ) {
    return "problem-landing";
  }
  if (
    [
      "scan/index.html",
      "bills/index.html",
      "warranties/index.html",
      "cash-log/index.html",
      "analytics/index.html",
      "pro/index.html",
    ].includes(rel)
  ) {
    return "app-link-entry";
  }
  if (rel === "privacy/index.html") return "legal";
  if (rel === "support/index.html") return "support";
  return "product-feature";
}

function csvEscape(val) {
  const str = String(val ?? "").replace(/\r?\n/g, " ").trim();
  if (str.includes(",") || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const files = walkHtml(OUT)
  .filter((f) => {
    const rel = path.relative(OUT, f);
    return (
      rel !== "404.html" &&
      !rel.startsWith("404/") &&
      !rel.endsWith("google7587fd459982fd40.html")
    );
  })
  .sort();

const header = [
  "URL",
  "PageType",
  "ExpectedStatus",
  "Indexability",
  "Title",
  "MetaDescription",
  "Canonical",
  "H1",
  "SchemaTypes",
  "InternalLinkCount",
  "HasAndroidDeepLink",
  "HasPlayStoreLink",
  "Action",
];

const rows = [header.join(",")];

for (const file of files) {
  const rel = path.relative(OUT, file);
  const html = fs.readFileSync(file, "utf8");

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "";
  const canonical =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1] ?? "";
  const h1Raw = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
  const h1 = h1Raw.replace(/<[^>]+>/g, "").trim();

  const ldMatches = [
    ...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  const types = new Set();
  for (const m of ldMatches) {
    for (const tm of m[1].matchAll(/"@type"\s*:\s*"([^"]+)"/g)) {
      types.add(tm[1]);
    }
  }

  const internalLinks = [...html.matchAll(/href=["'](\/[^"'#?]*)/g)].length;
  const hasDeepLink = html.includes("intent://");
  const hasPlay = html.includes("https://play.google.com/store/apps/details?id=com.smartbillmanager");
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

  rows.push(
    [
      canonical,
      classifyPage(rel),
      "200",
      noindex ? "noindex" : "index",
      title,
      description,
      canonical,
      h1,
      [...types].join("|"),
      String(internalLinks),
      hasDeepLink ? "yes" : "no",
      hasPlay ? "yes" : "no",
      "verified-active",
    ]
      .map(csvEscape)
      .join(",")
  );
}

fs.writeFileSync(CSV_PATH, rows.join("\n") + "\n", "utf8");
console.log(`Wrote ${files.length} routes to ${CSV_PATH}`);
