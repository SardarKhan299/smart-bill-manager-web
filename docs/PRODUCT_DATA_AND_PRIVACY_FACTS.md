# Smart Bill Manager — Verified Product Data & Privacy Facts

- **Last Verified Against Codebase:** 2026-11-27
- **Developer:** Sardar Khan
- **Verified Contact Email:** `sardarkhan.dev@gmail.com`
- **Android Package Name:** `com.smartbillmanager`
- **Website Origin:** `https://smart-bill-manager-web.sardar-khan299.workers.dev`

## 1. Android Application Data Handling (Verified)

| Capability / Domain | Verified Implementation Behavior | Cloud Upload? |
|---|---|---|
| **Core Financial Database** | Stored locally on the user's Android device using Room / SQLite (`BillDao`, `DailyExpenseDao`, `SubscriptionDao`, `DebtDao`, `SavingsGoalDao`, `CategoryBudgetDao`, `WarrantyDao`). | **No** — no Smart Bill Manager cloud database or user account exists. |
| **Bank Account Linking** | Not implemented by design. Users enter bills/expenses manually, scan receipts locally, or import bank CSV files locally (`CsvTransactionParser`). | **No** — zero Open Banking / Plaid credentials requested. |
| **Receipt OCR Scanning** | Performed on-device via Google ML Kit Text Recognition (`intent://scan`). Extracted merchant, date, and amount stay on-device; receipt images are stored in local app storage. | **No** — receipt images are not uploaded to remote servers. |
| **App Security & Backups** | Optional Android biometric/device-credential lock (`BiometricPrompt`) and encrypted local backup file export/import for user-controlled phone transfers. | **User-controlled only** (only if the user chooses to save/share their encrypted backup file). |
| **Subscriptions & Billing** | Handled via Google Play Billing and RevenueCat (`monthly`, `yearly-annual` with 7-day free trial where eligible, and `lifetime` one-time unlock). | **Yes (Billing metadata only)** — purchase tokens/entitlements processed by Google Play & RevenueCat. |
| **Advertising (Free Tier)** | Free tier displays Google AdMob ads (interstitial, app-open, voluntary rewarded video). Pro subscribers receive an ad-free experience. | **Yes (Ad SDK signals)** — governed by Google AdMob & Android Advertising ID settings. |
| **Analytics & Crash Reporting** | Firebase Analytics & Firebase Crashlytics collect anonymous screen/event telemetry and crash stack traces (`CrashlyticsHelper`). | **Yes (Diagnostics only)** — bill titles, amounts, and receipt contents are not sent. |

## 2. Website Data Handling (Verified)

| Surface | Verified Implementation Behavior |
|---|---|
| **Hosting & Delivery** | Static HTML/CSS/JS exported by Next.js (`output: "export"`) and served via Cloudflare Workers (`wrangler.jsonc`). Standard edge request metadata is processed by Cloudflare for delivery and security. |
| **Free Web Calculators (`/tools/*`)** | 100% browser-only (`"use client"` React state + `app/tools/calculator-math.mjs`). Entered income, bills, balances, and subscription amounts are **never** transmitted to servers, URLs, or analytics. |
| **Outbound Conversion Attribution** | `PlayCta` and `OpenInAppCta` append standard Google Play Install Referrer parameters (`utm_source=website&utm_medium=seo&utm_campaign=<placement>`) so Google Play Console attributes installs by page/tool without website cookies or third-party tracking scripts. |
| **Support Contact** | Direct `mailto:sardarkhan.dev@gmail.com` link on `/support/` — no server-side form database storing personal tickets on the website. |

## 3. Claims Qualification Rules (Editorial Guardrails)

1. **Say "local-first" or "core features work offline without an account"** rather than claiming zero network traffic across the entire APK (since Google Play Billing, RevenueCat, AdMob, and Firebase SDKs use network access when online).
2. **Never describe Safe-to-Spend or Cash-Flow Forecast as a verified bank balance** — always state it is a planning estimate based on user-entered records.
3. **Never fabricate `aggregateRating`, `review`, user counts, or legal certifications** in copy or JSON-LD.

## 4. Owner Decisions / Periodic Maintenance Checklist

- [x] Verified support & privacy email (`sardarkhan.dev@gmail.com`).
- [x] Digital Asset Links SHA-256 fingerprints deployed at `/.well-known/assetlinks.json`.
- [ ] Re-submit `sitemap.xml` in Google Search Console whenever new landing pages or tools are added.
- [ ] Export Search Console query CSV monthly and run `npm run seo:intelligence -- --gsc-csv <path>` to review real search demand before publishing new guides/tools.
