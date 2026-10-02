import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const inputRoot = path.resolve(arg("--input", "reports/search-console"));
const output = path.resolve(arg("--output", "reports/search-performance.md"));

if (!fs.existsSync(inputRoot)) {
  console.error("Search performance input directory does not exist: " + inputRoot);
  console.error("Expected current/ and previous/ CSV exports. See docs/SEARCH_PERFORMANCE_MONITORING.md.");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quoted) {
      if (ch === '"' && input[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).filter(r => r.some(v => v.trim() !== "")).map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = (r[i] ?? "").trim());
    return obj;
  });
}

function normalizeHeader(value) {
  return value.toLowerCase().replace(/[\u00a0_]/g, " ").replace(/\s+/g, " ").trim();
}

function num(value) {
  if (value == null || value === "" || value === "-" || value === "~") return 0;
  const n = Number(String(value).replace(/%/g, "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}

function findMetric(row, names) {
  for (const name of names) if (Object.prototype.hasOwnProperty.call(row, name)) return num(row[name]);
  return 0;
}

function readDir(dir) {
  if (!fs.existsSync(dir)) return {};
  const result = {};
  for (const file of fs.readdirSync(dir)) {
    if (!file.toLowerCase().endsWith(".csv")) continue;
    result[path.basename(file, ".csv").toLowerCase()] = parseCsv(fs.readFileSync(path.join(dir, file), "utf8"));
  }
  return result;
}

function allRows(files) {
  return Object.values(files).flat();
}

function summarize(rows) {
  const clicks = rows.reduce((s, r) => s + findMetric(r, ["clicks"]), 0);
  const impressions = rows.reduce((s, r) => s + findMetric(r, ["impressions"]), 0);
  const ctr = impressions ? clicks / impressions : 0;
  const weightedPosition = rows.reduce((s, r) => {
    const p = findMetric(r, ["position", "average position"]);
    const i = findMetric(r, ["impressions"]);
    return s + p * i;
  }, 0);
  const position = impressions ? weightedPosition / impressions : null;
  return { clicks, impressions, ctr, position };
}

function pct(value) { return (value * 100).toFixed(2) + "%"; }
function integer(value) { return Math.round(value).toLocaleString("en-US"); }
function position(value) { return value == null ? "—" : value.toFixed(2); }
function delta(current, previous) {
  if (!previous) return "—";
  const d = ((current - previous) / Math.abs(previous)) * 100;
  return (d >= 0 ? "+" : "") + d.toFixed(1) + "%";
}

function topRows(rows, labelNames, limit = 10) {
  return [...rows].sort((a, b) => findMetric(b, ["clicks"]) - findMetric(a, ["clicks"])).slice(0, limit).map(r => ({
    label: labelNames.map(n => r[n]).find(Boolean) || "—",
    clicks: findMetric(r, ["clicks"]),
    impressions: findMetric(r, ["impressions"]),
    ctr: findMetric(r, ["impressions"]) ? findMetric(r, ["clicks"]) / findMetric(r, ["impressions"]) : 0,
    position: findMetric(r, ["position", "average position"])
  }));
}

function opportunityRows(rows, labelNames, limit = 10) {
  return [...rows]
    .filter(r => findMetric(r, ["impressions"]) >= 20)
    .sort((a, b) => {
      const bi = findMetric(b, ["impressions"]);
      const ai = findMetric(a, ["impressions"]);
      const bc = bi ? findMetric(b, ["clicks"]) / bi : 0;
      const ac = ai ? findMetric(a, ["clicks"]) / ai : 0;
      return ac - bc || bi - ai;
    })
    .slice(0, limit)
    .map(r => ({
      label: labelNames.map(n => r[n]).find(Boolean) || "—",
      clicks: findMetric(r, ["clicks"]),
      impressions: findMetric(r, ["impressions"]),
      ctr: findMetric(r, ["impressions"]) ? findMetric(r, ["clicks"]) / findMetric(r, ["impressions"]) : 0,
      position: findMetric(r, ["position", "average position"])
    }));
}

function renderTable(rows) {
  if (!rows.length) return "_No rows available._";
  const lines = [
    "| Item | Clicks | Impressions | CTR | Position |",
    "|---|---:|---:|---:|---:|"
  ];
  for (const r of rows) {
    lines.push("| " + r.label.replace(/\|/g, "\\|") + " | " + integer(r.clicks) + " | " + integer(r.impressions) + " | " + pct(r.ctr) + " | " + position(r.position) + " |");
  }
  return lines.join("\n");
}

const currentFiles = readDir(path.join(inputRoot, "current"));
const previousFiles = readDir(path.join(inputRoot, "previous"));
const currentRows = allRows(currentFiles);
const previousRows = allRows(previousFiles);

const currentSummaryRows = currentFiles.performance?.length ? currentFiles.performance : currentRows;
const previousSummaryRows = previousFiles.performance?.length ? previousFiles.performance : previousRows;
const current = summarize(currentSummaryRows);
const previous = summarize(previousSummaryRows);

const queryRows = currentFiles.queries ?? currentRows.filter(r => r.query);
const pageRows = currentFiles.pages ?? currentRows.filter(r => r.page || r.url);
const countryRows = currentFiles.countries ?? currentRows.filter(r => r.country);
const deviceRows = currentFiles.devices ?? currentRows.filter(r => r.device);

const report = [
  "# Search Performance Report",
  "",
  "Generated: " + new Date().toISOString(),
  "",
  "Property: https://smart-bill-manager-web.sardar-khan299.workers.dev/",
  "",
  "## Executive summary",
  "",
  "| Metric | Current period | Previous period | Change |",
  "|---|---:|---:|---:|",
  "| Clicks | " + integer(current.clicks) + " | " + integer(previous.clicks) + " | " + delta(current.clicks, previous.clicks) + " |",
  "| Impressions | " + integer(current.impressions) + " | " + integer(previous.impressions) + " | " + delta(current.impressions, previous.impressions) + " |",
  "| CTR | " + pct(current.ctr) + " | " + pct(previous.ctr) + " | " + delta(current.ctr, previous.ctr) + " |",
  "| Average position | " + position(current.position) + " | " + position(previous.position) + " | " + (previous.position == null || current.position == null ? "—" : (current.position - previous.position).toFixed(2)) + " |",
  "",
  "> Search Console is the source of truth. Exported table data can be truncated, while report totals can include data not present in the table. Do not treat row sums as authoritative property totals unless the input is a chart/performance export intended for that purpose.",
  "",
  "## Top queries",
  "",
  renderTable(topRows(queryRows, ["query"])),
  "",
  "## Top landing pages",
  "",
  renderTable(topRows(pageRows, ["page", "url"])),
  "",
  "## Top countries",
  "",
  renderTable(topRows(countryRows, ["country"])),
  "",
  "## Devices",
  "",
  renderTable(topRows(deviceRows, ["device"])),
  "",
  "## High-impression / low-CTR opportunities",
  "",
  "These are candidates for review, not automatic rewrite targets. Check search intent, the actual result page, title/description alignment, and page quality before changing metadata.",
  "",
  "### Queries",
  "",
  renderTable(opportunityRows(queryRows, ["query"])),
  "",
  "### Pages",
  "",
  renderTable(opportunityRows(pageRows, ["page", "url"])),
  "",
  "## Monitoring checklist",
  "",
  "- Compare the current period with the immediately preceding comparable period.",
  "- Review clicks and impressions before relying on average position alone.",
  "- Separate branded and non-branded demand where Search Console supports the filter.",
  "- Review pages, queries, countries and devices.",
  "- Investigate sudden clicks/impressions drops against indexing, deployment and Search Console data freshness.",
  "- Record important SEO changes beside the reporting period.",
  "- Review newly published pages separately so pre-publication periods are not treated as a fair baseline.",
  "- Treat anonymized queries and exported row limits as known data limitations.",
  "- Review Search Console Overview for manual actions, security issues and major indexing changes.",
  "",
  "## Suggested monthly decision log",
  "",
  "| Date | Change made | Page/cluster | Search signal | Follow-up date |",
  "|---|---|---|---|---|",
  "| YYYY-MM-DD | Example: title experiment | /bill-tracker/ | — | YYYY-MM-DD |",
  ""
].join("\n");

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, report);
console.log("Search performance report written to " + output);
