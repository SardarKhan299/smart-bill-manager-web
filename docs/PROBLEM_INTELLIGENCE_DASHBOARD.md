# User Problem Intelligence Dashboard

> **Governance & Methodology (Phase 7):**
> - Opportunity scores (0–100) are transparent prioritization aids, **not** proof of search volume.
> - Evidence confidence (`high` / `medium` / `low`) is reported separately from opportunity score.
> - **Human editorial review is mandatory:** candidate topics in the review queue are never auto-published.
> - Zero usernames, personal data, or fabricated search volumes are stored.

## 1. Ranked Opportunity Matrix (All Tracked Problems)

| ID | Score (/100) | Confidence | Status | Topic | Normalized User Problem | Target Route |
|---|---:|---|---|---|---|---|
| `prob-001` | **92** | `high` | `published` | `financial-privacy` | Users want household budgeting and bill tracking without sharing bank login credentials or syncing transactions to third-party cloud servers. | `/offline-budget-app/` |
| `prob-004` | **90** | `high` | `published` | `cash-flow` | Raw bank balances include money already committed to upcoming rent, utilities, and annual renewals due before payday. | `/tools/safe-to-spend-calculator/` |
| `prob-002` | **89** | `high` | `published` | `receipt-tracking` | Paper thermal receipts fade quickly, and privacy-conscious users avoid cloud OCR scanners that upload itemized purchase photos. | `/offline-receipt-scanner/` |
| `prob-003` | **89** | `high` | `published` | `subscription-management` | Mixed billing cycles (weekly, monthly, quarterly, annual) hide the true annualized household drain of recurring subscriptions. | `/tools/subscription-cost-calculator/` |
| `prob-005` | **86** | `high` | `published` | `receipt-tracking` | When electronics or appliances fail, users cannot find the original receipt or miss the warranty claim deadline. | `/warranty-tracker/` |
| `prob-006` | **85** | `high` | `published` | `budgeting` | Households carrying multiple balances want to compare fastest first-win payoff (Snowball) vs lowest total interest (Avalanche) privately. | `/tools/debt-payoff-calculator/` |
| `prob-008` | **81** | `high` | `published` | `household-bills` | Roommates and couples splitting electricity, internet, or grocery checks hate apps that require every participant to register or hit paywalls. | `/tools/bill-split-calculator/` |
| `prob-007` | **79** | `high` | `published` | `offline-finance-tools` | Users who reject Open Banking/Plaid logins still want a way to batch-import monthly bank statement CSV files locally. | `/blog/import-bank-csv-offline-guide/` |

## 2. Editorial Review Queue (Next Candidates to Validate)

| ID | Score | Confidence | Format | Proposed Route | Action Summary & Evidence |
|---|---:|---|---|---|---|
| — | — | — | — | — | All current queue items have been reviewed and published. Import new Search Console queries via `--gsc-csv` to queue next candidates. |

## 3. Published Acquisition Assets & Deep-Link Mapping

| ID | Score | Asset Type | Live Canonical Route | Android Deep Link |
|---|---:|---|---|---|
| `prob-001` | **92** | `landing-page` | `/offline-budget-app/` | `intent://bills` |
| `prob-004` | **90** | `calculator` | `/tools/safe-to-spend-calculator/` | `intent://bills` |
| `prob-002` | **89** | `landing-page` | `/offline-receipt-scanner/` | `intent://scan` |
| `prob-003` | **89** | `calculator` | `/tools/subscription-cost-calculator/` | `intent://bills` |
| `prob-005` | **86** | `landing-page` | `/warranty-tracker/` | `intent://warranties` |
| `prob-006` | **85** | `calculator` | `/tools/debt-payoff-calculator/` | `intent://bills` |
| `prob-008` | **81** | `calculator` | `/tools/bill-split-calculator/` | `intent://bills` |
| `prob-007` | **79** | `guide` | `/blog/import-bank-csv-offline-guide/` | `intent://cash-log` |

## 4. Topic Clusters

### `household-bills` (1)
- **How do I split shared utility bills and rent fairly with roommates or family without forcing everyone onto an account?** — Score: `81/100`, Confidence: `high`, Status: `published`

### `budgeting` (1)
- **Should I pay off personal debts using Debt Snowball or Debt Avalanche, and how much interest do I save?** — Score: `85/100`, Confidence: `high`, Status: `published`

### `subscription-management` (1)
- **How much are my weekly, monthly, and yearly subscriptions actually costing me per year?** — Score: `89/100`, Confidence: `high`, Status: `published`

### `receipt-tracking` (2)
- **Is there an Android receipt scanner that extracts totals offline without uploading receipts to the cloud?** — Score: `89/100`, Confidence: `high`, Status: `published`
- **Where can I store appliance warranty expiry dates and proof-of-purchase photos privately?** — Score: `86/100`, Confidence: `high`, Status: `published`

### `cash-flow` (1)
- **How do I know how much of my checking balance is actually safe to spend before my next payday?** — Score: `90/100`, Confidence: `high`, Status: `published`

### `financial-privacy` (1)
- **How can I budget and track bills on Android without linking my bank account?** — Score: `92/100`, Confidence: `high`, Status: `published`

### `offline-finance-tools` (1)
- **How can I import a bank CSV export into an offline expense tracker without giving live bank credentials?** — Score: `79/100`, Confidence: `high`, Status: `published`
