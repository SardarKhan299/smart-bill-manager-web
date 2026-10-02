import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const appRoot = path.resolve(arg("--app", "app"));
const output = path.resolve(arg("--output", "reports/content-iteration.md"));
const EXCLUDED = new Set(["api"]);
const PRIORITY_PATHS = new Map([
  ["/", "P0"],
  ["/bill-tracker/", "P0"],
  ["/subscription-tracker/", "P0"],
  ["/expense-tracker/", "P0"],
  ["/budget-planner/", "P0"],
  ["/safe-to-spend/", "P0"],
  ["/cash-flow-forecast/", "P0"],
  ["/receipt-manager/", "P1"],
  ["/recurring-expense-tracker/", "P1"],
  ["/tools/", "P1"],
  ["/blog/", "P1"]
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || EXCLUDED.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (entry.isFile() && entry.name === "page.tsx") results.push(full);
  }
  return results;
}

function routeFromPage(file) {
  const relative = path.relative(appRoot, path.dirname(file)).split(path.sep);
  if (!relative.length) return "/";
  return "/" + relative.join("/") + "/";
}

function stripCode(source) {
  return source
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/\/\/.*$/gm, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^{}]*\}/g, " ")
    .replace(/https?:\/\/[^\s"' ]+/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function countWords(source) {
  return stripCode(source).split(/\s+/).filter(Boolean).length;
}

function hasAny(source, patterns) {
  return patterns.some((pattern) => pattern.test(source));
}

function escapeCell(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

const files = walk(appRoot);
const pages = files.map((file) => {
  const source = fs.readFileSync(file, "utf8");
  const route = routeFromPage(file);
  const h1 = [...source.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].length;
  const links = [...source.matchAll(/(?:href|to)=["'](\/[^"'?#]*)/g)].map((m) => m[1]);
  const internalLinks = [...new Set(links)];
  const wordCount = countWords(source);
  const hasCta = hasAny(source, [/data-conversion=/, /Google Play/i, /Get Smart Bill Manager/i, /Download/i]);
  const hasRelated = hasAny(source, [/related/i, /supporting/i, /Related links/i]);
  const hasImage = /<img\b/i.test(source);
  const priority = PRIORITY_PATHS.get(route) ?? (route.startsWith("/blog/") ? "P2" : "P3");
  const issues = [];
  if (h1 !== 1) issues.push(h1 === 0 ? "missing H1" : "multiple H1");
  if (wordCount < (route.startsWith("/tools/") ? 350 : 500)) issues.push("thin-content review");
  if (!hasCta && !["/privacy/", "/support/"].includes(route)) issues.push("missing conversion CTA");
  if (route.startsWith("/blog/") && route !== "/blog/" && !hasRelated) issues.push("review related links");
  if (route.startsWith("/blog/") && route !== "/blog/" && !hasImage) issues.push("review article imagery");
  return { route, file: path.relative(process.cwd(), file), wordCount, h1, internalLinks: internalLinks.length, hasCta, hasRelated, hasImage, priority, issues };
}).sort((a, b) => a.priority.localeCompare(b.priority) || a.route.localeCompare(b.route));

const issuePages = pages.filter((p) => p.issues.length);
const contentPages = pages.filter((p) => !["/privacy/", "/support/"].includes(p.route));
const incoming = new Map(contentPages.map((p) => [p.route, 0]));
for (const page of contentPages) {
  for (const target of page.internalLinks) {
    if (incoming.has(target) && target !== page.route) incoming.set(target, incoming.get(target) + 1);
  }
}
const orphanCandidates = contentPages.filter((p) => p.route !== "/" && (incoming.get(p.route) ?? 0) === 0);

const report = [
  "# Smart Bill Manager — Continuous Content Iteration Report",
  "",
  "Generated: " + new Date().toISOString(),
  "",
  "This report is an engineering/content QA aid. It does not claim Search Console traffic, rankings, search volume, or Google indexing status.",
  "",
  "## Current inventory",
  "",
  "- Content pages scanned: " + pages.length,
  "- Pages with review signals: " + issuePages.length,
  "- Potential internal-link orphans: " + orphanCandidates.length,
  "",
  "## Review queue",
  "",
  "| Priority | Route | Words | H1 | Internal links | Review signals |",
  "|---|---|---:|---:|---:|---|",
  ...issuePages.map((p) => "| " + p.priority + " | " + escapeCell(p.route) + " | " + p.wordCount + " | " + p.h1 + " | " + p.internalLinks + " | " + escapeCell(p.issues.join(", ")) + " |"),
  "",
  "## Potential internal-link orphans",
  "",
  orphanCandidates.length ? orphanCandidates.map((p) => "- " + p.route + " — add a contextual link from the most relevant hub or guide.").join("\n") : "_No potential orphans detected._",
  "",
  "## Iteration rules",
  "",
  "1. Use Search Console data to select what deserves a content change; do not rewrite pages solely because they are old.",
  "2. Diagnose intent before editing: query, landing page, country/language and device should agree with the page purpose.",
  "3. Change one meaningful variable at a time when testing titles, CTAs or page sections.",
  "4. Preserve useful existing content; improve clarity, examples, first-hand product detail and internal navigation rather than adding filler.",
  "5. After a change, record the date, page, hypothesis, exact change and follow-up date.",
  "6. Re-check build, SEO audit, links, structured data and localized generation after content changes.",
  "7. Review pages with persistent low engagement or unclear intent manually before deleting or merging them.",
  "",
  "## Suggested monthly content log",
  "",
  "| Date | Route | Evidence | Hypothesis | Change | Follow-up | Result |",
  "|---|---|---|---|---|---|---|",
  "| YYYY-MM-DD | /example/ | Search Console / user feedback | Example hypothesis | Exact edit | YYYY-MM-DD | Pending |",
  "",
  "## What this report intentionally does not do",
  "",
  "- It does not invent keyword volume or ranking data.",
  "- It does not automatically rewrite or delete content.",
  "- It does not treat word count as a Google ranking requirement.",
  "- It does not claim that a page is indexed merely because a local route exists.",
  "- It does not replace human review of financial-content accuracy or product claims."
].join("\n");

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, report);
console.log("Content iteration report written to " + output);
