import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  SCORE_WEIGHTS,
  scoreOpportunity,
  validateRecord,
  groupRecordsByTopic,
  parseSearchConsoleCsv,
  renderDashboardMarkdown,
} from "./problem-intelligence.mjs";

test("SCORE_WEIGHTS sum to exactly 100 across the 8 Phase 7 dimensions", () => {
  const sum = Object.values(SCORE_WEIGHTS).reduce((acc, w) => acc + w, 0);
  assert.equal(sum, 100);
});

test("scoreOpportunity clamps out-of-range dimensions and handles missing/negative scores", () => {
  const maxAttempt = scoreOpportunity({
    painSeverity: 999,
    frequencyEvidence: 999,
    searchDemand: 999,
    productRelevance: 999,
    competitiveGap: 999,
    feasibility: 999,
    conversionPotential: 999,
    evidenceConfidence: 999,
  });
  assert.equal(maxAttempt.total, 100);

  const negativeAttempt = scoreOpportunity({
    painSeverity: -10,
    frequencyEvidence: "invalid",
  });
  assert.equal(negativeAttempt.total, 0);
});

test("validateRecord blocks PII usernames/emails and prohibits auto-publish statuses", () => {
  const piiRecord = {
    id: "bad-1",
    question: "Asked by u/johndoe123 on Reddit",
    topic: "budgeting",
    confidence: "low",
    reviewStatus: "needs-human-review",
    evidenceNote: "Single thread",
  };
  const piiRes = validateRecord(piiRecord);
  assert.equal(piiRes.valid, false);
  assert.ok(piiRes.errors.some((e) => e.includes("PII")));

  const autoPublishRecord = {
    id: "bad-2",
    question: "How to track bills?",
    topic: "household-bills",
    confidence: "high",
    reviewStatus: "auto-published",
    evidenceNote: "Observed",
  };
  const autoRes = validateRecord(autoPublishRecord);
  assert.equal(autoRes.valid, false);
});

test("parseSearchConsoleCsv converts GSC query rows into needs-human-review records", () => {
  const csv = [
    "Top queries,Clicks,Impressions,CTR,Position",
    "\"offline subscription tracker android\",12,240,5%,6.2",
    "\"receipt warranty vault\",4,45,8.8%,9.1",
  ].join("\n");

  const parsed = parseSearchConsoleCsv(csv, "2026-11-27");
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].topic, "subscription-management");
  assert.equal(parsed[0].reviewStatus, "needs-human-review");
  assert.equal(parsed[0].confidence, "high");
  assert.equal(parsed[1].topic, "receipt-tracking");
  assert.equal(parsed[1].confidence, "medium");
});

test("seed problem-intelligence-records.json validates cleanly and renders dashboard sections", () => {
  const records = JSON.parse(
    fs.readFileSync(path.resolve("docs/problem-intelligence-records.json"), "utf8")
  );
  assert.ok(records.length >= 8);
  const grouped = groupRecordsByTopic(records);
  assert.ok(grouped["subscription-management"].length >= 1);

  const md = renderDashboardMarkdown(records);
  assert.ok(md.includes("## 1. Ranked Opportunity Matrix"));
  assert.ok(md.includes("## 2. Editorial Review Queue"));
  assert.ok(md.includes("## 3. Published Acquisition Assets"));
  assert.ok(md.includes("/tools/subscription-cost-calculator/"));
});
