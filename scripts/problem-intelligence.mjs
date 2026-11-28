import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ALLOWED_TOPICS = [
  "household-bills",
  "budgeting",
  "expense-tracking",
  "subscription-management",
  "receipt-tracking",
  "cash-flow",
  "financial-privacy",
  "offline-finance-tools",
];

export const ALLOWED_CONFIDENCE = ["high", "medium", "low"];

export const ALLOWED_REVIEW_STATUS = [
  "published",
  "approved",
  "needs-human-review",
  "backlog",
];

export const SCORE_WEIGHTS = {
  painSeverity: 20,
  frequencyEvidence: 15,
  searchDemand: 15,
  productRelevance: 15,
  competitiveGap: 10,
  feasibility: 10,
  conversionPotential: 10,
  evidenceConfidence: 5,
};

const PII_PATTERNS = [
  /\bu\/[a-z0-9_-]{3,}/i,
  /@[a-z0-9_]{3,}\b/i,
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
];

export function clampDimension(value, maxWeight) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.min(Math.round(num * 100) / 100, maxWeight);
}

export function scoreOpportunity(scores = {}) {
  const breakdown = {};
  let total = 0;
  for (const [key, maxWeight] of Object.entries(SCORE_WEIGHTS)) {
    const clamped = clampDimension(scores[key], maxWeight);
    breakdown[key] = clamped;
    total += clamped;
  }
  return {
    total: Math.round(total * 100) / 100,
    maxPossible: 100,
    breakdown,
  };
}

export function validateRecord(record) {
  const errors = [];
  if (!record || typeof record !== "object") {
    return { valid: false, errors: ["Record must be an object"] };
  }
  if (!record.id || typeof record.id !== "string") errors.push("Missing string id");
  if (!record.question || typeof record.question !== "string") errors.push("Missing question");
  if (!ALLOWED_TOPICS.includes(record.topic)) {
    errors.push(`Invalid topic "${record.topic}". Allowed: ${ALLOWED_TOPICS.join(", ")}`);
  }
  if (!ALLOWED_CONFIDENCE.includes(record.confidence)) {
    errors.push(`Invalid confidence "${record.confidence}"`);
  }
  if (!ALLOWED_REVIEW_STATUS.includes(record.reviewStatus)) {
    errors.push(`Invalid reviewStatus "${record.reviewStatus}" (auto-publishing is prohibited)`);
  }
  if (!record.evidenceNote || typeof record.evidenceNote !== "string") {
    errors.push("Missing evidenceNote");
  }

  const textFields = [record.question, record.normalizedProblem, record.evidenceNote]
    .filter(Boolean)
    .join(" ");
  for (const pattern of PII_PATTERNS) {
    if (pattern.test(textFields)) {
      errors.push(`Record ${record.id} contains potential username/email PII matching ${pattern}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function groupRecordsByTopic(records) {
  const grouped = Object.fromEntries(ALLOWED_TOPICS.map((t) => [t, []]));
  for (const rec of records) {
    const scored = { ...rec, opportunityScore: scoreOpportunity(rec.scores) };
    if (!grouped[rec.topic]) grouped[rec.topic] = [];
    grouped[rec.topic].push(scored);
  }
  for (const list of Object.values(grouped)) {
    list.sort((a, b) => b.opportunityScore.total - a.opportunityScore.total);
  }
  return grouped;
}

export function parseSearchConsoleCsv(csvText, dateObserved = "2026-11-27") {
  const lines = String(csvText || "")
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);
  if (lines.length < 2) return [];

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    const [query, clicksRaw, impressionsRaw] = cols;
    if (!query) continue;
    const clicks = Number(clicksRaw) || 0;
    const impressions = Number(impressionsRaw) || 0;
    const demandScore = impressions >= 500 ? 14 : impressions >= 100 ? 10 : impressions >= 20 ? 6 : 3;

    rows.push({
      id: `gsc-${i}`,
      question: query,
      sourceType: "google-search-console",
      sourceUrl: "https://search.google.com/search-console",
      dateObserved,
      country: "Global",
      language: "en",
      topic: inferTopic(query),
      normalizedProblem: `Search Console query observed: "${query}"`,
      desiredOutcome: "Find an accurate, helpful answer or tool matching the search query.",
      currentWorkaround: "Unknown until human editorial review",
      evidenceNote: `GSC export: ${clicks} clicks, ${impressions} impressions.`,
      competitorAlternatives: "Pending SERP review",
      productRelevanceNote: "Pending editorial validation against PRODUCT_KNOWLEDGE.md",
      confidence: impressions >= 100 ? "high" : "medium",
      scores: {
        painSeverity: 12,
        frequencyEvidence: impressions >= 100 ? 11 : 6,
        searchDemand: demandScore,
        productRelevance: 10,
        competitiveGap: 6,
        feasibility: 8,
        conversionPotential: 7,
        evidenceConfidence: 5,
      },
      suggestedAction: {
        type: "guide",
        targetRoute: "/blog/",
        deepLinkRoute: "bills",
        summary: "Review SERP intent and existing routes before creating or updating content.",
      },
      reviewStatus: "needs-human-review",
    });
  }
  return rows;
}

export function inferTopic(text) {
  const lower = String(text || "").toLowerCase();
  if (lower.includes("subscription") || lower.includes("renewal")) return "subscription-management";
  if (lower.includes("receipt") || lower.includes("warranty") || lower.includes("ocr")) return "receipt-tracking";
  if (lower.includes("safe to spend") || lower.includes("payday") || lower.includes("cash flow")) return "cash-flow";
  if (lower.includes("privacy") || lower.includes("no bank")) return "financial-privacy";
  if (lower.includes("offline") || lower.includes("csv")) return "offline-finance-tools";
  if (lower.includes("bill") || lower.includes("due date")) return "household-bills";
  if (lower.includes("expense") || lower.includes("cash")) return "expense-tracking";
  return "budgeting";
}

export function renderDashboardMarkdown(records) {
  const enriched = records
    .map((rec) => {
      const check = validateRecord(rec);
      if (!check.valid) {
        throw new Error(`Invalid record ${rec.id}: ${check.errors.join("; ")}`);
      }
      return { ...rec, opportunityScore: scoreOpportunity(rec.scores) };
    })
    .sort((a, b) => b.opportunityScore.total - a.opportunityScore.total);

  const reviewQueue = enriched.filter(
    (r) => r.reviewStatus === "needs-human-review" || r.reviewStatus === "backlog"
  );
  const published = enriched.filter((r) => r.reviewStatus === "published");
  const grouped = groupRecordsByTopic(records);

  const lines = [
    "# User Problem Intelligence Dashboard",
    "",
    "> **Governance & Methodology (Phase 7):**",
    "> - Opportunity scores (0–100) are transparent prioritization aids, **not** proof of search volume.",
    "> - Evidence confidence (`high` / `medium` / `low`) is reported separately from opportunity score.",
    "> - **Human editorial review is mandatory:** candidate topics in the review queue are never auto-published.",
    "> - Zero usernames, personal data, or fabricated search volumes are stored.",
    "",
    "## 1. Ranked Opportunity Matrix (All Tracked Problems)",
    "",
    "| ID | Score (/100) | Confidence | Status | Topic | Normalized User Problem | Target Route |",
    "|---|---:|---|---|---|---|---|",
    ...enriched.map(
      (r) =>
        `| \`${r.id}\` | **${r.opportunityScore.total}** | \`${r.confidence}\` | \`${r.reviewStatus}\` | \`${r.topic}\` | ${r.normalizedProblem} | \`${r.suggestedAction.targetRoute}\` |`
    ),
    "",
    "## 2. Editorial Review Queue (Next Candidates to Validate)",
    "",
    "| ID | Score | Confidence | Format | Proposed Route | Action Summary & Evidence |",
    "|---|---:|---|---|---|---|",
    ...(reviewQueue.length
      ? reviewQueue.map(
          (r) =>
            `| \`${r.id}\` | **${r.opportunityScore.total}** | \`${r.confidence}\` | \`${r.suggestedAction.type}\` | \`${r.suggestedAction.targetRoute}\` | ${r.suggestedAction.summary} *(${r.evidenceNote})* |`
        )
      : [
          "| — | — | — | — | — | All current queue items have been reviewed and published. Import new Search Console queries via `--gsc-csv` to queue next candidates. |",
        ]),
    "",
    "## 3. Published Acquisition Assets & Deep-Link Mapping",
    "",
    "| ID | Score | Asset Type | Live Canonical Route | Android Deep Link |",
    "|---|---:|---|---|---|",
    ...published.map(
      (r) =>
        `| \`${r.id}\` | **${r.opportunityScore.total}** | \`${r.suggestedAction.type}\` | \`${r.suggestedAction.targetRoute}\` | \`intent://${r.suggestedAction.deepLinkRoute || "bills"}\` |`
    ),
    "",
    "## 4. Topic Clusters",
    "",
  ];

  for (const [topic, items] of Object.entries(grouped)) {
    if (!items.length) continue;
    lines.push(`### \`${topic}\` (${items.length})`);
    for (const item of items) {
      lines.push(
        `- **${item.question}** — Score: \`${item.opportunityScore.total}/100\`, Confidence: \`${item.confidence}\`, Status: \`${item.reviewStatus}\``
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

function runCli() {
  const args = process.argv.slice(2);
  const recordsPath = path.resolve("docs/problem-intelligence-records.json");
  const outPath = path.resolve("docs/PROBLEM_INTELLIGENCE_DASHBOARD.md");
  const records = JSON.parse(fs.readFileSync(recordsPath, "utf8"));

  const gscIndex = args.indexOf("--gsc-csv");
  if (gscIndex !== -1 && args[gscIndex + 1]) {
    const csvContent = fs.readFileSync(path.resolve(args[gscIndex + 1]), "utf8");
    records.push(...parseSearchConsoleCsv(csvContent));
  }

  const markdown = renderDashboardMarkdown(records);
  fs.writeFileSync(outPath, markdown, "utf8");
  console.log(`Problem Intelligence Dashboard written to ${outPath} (${records.length} records).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli();
}
