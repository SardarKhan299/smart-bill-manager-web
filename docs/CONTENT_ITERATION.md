# Smart Bill Manager — B12 Continuous Content Iteration

## Objective

Turn the existing SEO/content system into a repeatable improvement loop instead of continuously publishing new pages.

The goal is to improve pages that already have a reason to exist, using observed Search Console data, user intent, product changes and content QA.

## Implemented

- Added scripts/content-iteration-report.mjs.
- Added npm run content:iteration.
- The report inventories app/**/page.tsx content pages.
- It flags missing or multiple H1 elements, very short pages for manual content review, missing conversion CTA signals on pages where a CTA is expected, blog pages without related-link signals, blog pages without article imagery, and potential internal-link orphans.
- It produces a review queue with P0–P3 priority.
- It creates a monthly content-change log template.
- It explicitly avoids treating word count as a Google ranking requirement and does not invent Search Console metrics.

## Continuous iteration loop

### 1. Observe

Use Google Search Console as the source of truth for organic performance.

Review:
- clicks;
- impressions;
- CTR;
- average position;
- queries;
- landing pages;
- countries/languages;
- devices;
- indexing/security/manual-action signals.

Google's current Play Console reporting also provides store-listing intent metrics such as unique user install clicks and CTR, which can be used separately when evaluating the app-store side of the funnel.

### 2. Diagnose

Before editing a page, identify the actual problem:

- Impressions up, CTR weak: inspect search-result wording and intent match.
- Clicks up, conversion weak: inspect the landing page's value proposition, trust context and CTA path.
- Relevant query, wrong page: strengthen internal linking and page intent rather than creating another near-duplicate page.
- Page has little evidence of demand: keep it if it serves users or the product funnel; otherwise consider consolidation only after manual review.
- Locale performs differently: review translation quality, search intent and country relevance before changing the locale.

### 3. Change

Make a small, explicit change:
- title/meta wording;
- H1/value proposition;
- example/use case;
- calculator explanation;
- internal links;
- CTA wording or placement;
- image/alt text;
- FAQ clarity;
- localized wording.

Avoid changing several unrelated variables at once when measurement matters.

### 4. Validate

Run:

    npm run build
    npm run seo:audit
    npm run content:iteration

For CI, the normal build workflow remains the final gate.

### 5. Record

Every material content change should be logged with date, URL, evidence, hypothesis, exact change, follow-up date and result.

## Content quality rules

Google's current guidance emphasizes people-first content, original value, satisfying the reader's goal, clear titles/headings and demonstrated expertise. It also warns against producing lots of content mainly to attract search traffic or using automation without adding value.

For Smart Bill Manager:
- Do not publish articles only because a keyword exists.
- Do not create multiple pages that answer the same question with minor wording changes.
- Prefer a useful calculator, example, workflow or first-hand product explanation when it adds more value than another article.
- Keep financial explanations transparent and avoid presenting planning estimates as financial advice.
- Do not invent product capabilities, integrations, prices, performance claims or user numbers.
- Review machine-translated content before treating it as final localized marketing copy.

## Priority model

- P0: core commercial page or homepage with a concrete quality/conversion issue.
- P1: calculator, blog hub or high-value supporting content with a concrete issue.
- P2: supporting editorial page needing improvement.
- P3: lower-priority informational/product page.

Priority is an editorial workflow label, not a prediction of ranking impact.

## Monthly cadence

### Week 1 — Data review

Run:

    npm run seo:performance

### Week 2 — Content iteration

Select a small number of evidence-backed pages and make targeted edits.

### Week 3 — Conversion/internal-link review

Check CTA paths, calculators, commercial hubs and orphan candidates.

### Week 4 — QA and measurement

Run build/audit, document changes and compare the next period.

## B12 boundary

B12 is deliberately an iteration system, not a content-volume system. The next step after this phase is to use real Search Console and Play Console data to choose specific page experiments. No traffic or ranking outcome should be claimed until that data exists.
