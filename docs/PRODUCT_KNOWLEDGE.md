# Smart Bill Manager — Verified Product Knowledge Source

- **Last Verified:** 2026-11-28
- **Product Name:** Smart Bill Manager
- **One-Sentence Description:** An offline-first Android app for tracking recurring household bills, scanning receipts with on-device AI OCR, logging daily cash expenses, managing subscriptions, tracking personal debts, and storing product warranties without requiring a bank login or cloud account.
- **Official Website:** https://smart-bill-manager-web.sardar-khan299.workers.dev/
- **Google Play Store URL:** https://play.google.com/store/apps/details?id=com.smartbillmanager
- **Supported Platform:** Android (distributed via Google Play)
- **Developer & Support Contact:** Sardar Khan (`sardarkhan.dev@gmail.com`)

## Verified Core Capabilities
1. **Offline Bill Reminders & Home-Screen Widget:** Recurring/one-time bills, local due-date notifications, Android calendar sync, and a Material You Upcoming Bills widget with 1-tap Mark Paid.
2. **Safe-to-Spend Planning:** Subtracts upcoming committed bills from available funds to estimate discretionary spending (planning aid, not a bank-authorised balance).
3. **On-Device AI Receipt Scanner (OCR):** Extracts merchant name, total and date locally on the device without uploading receipt images to cloud servers.
4. **Warranty Vault:** Stores purchase details, receipt photos and warranty expiry alerts locally.
5. **Daily Cash Log & No-Spend Streaks:** Fast everyday cash entry, Quick Cash home-screen widget, and Day-3 no-spend streak reward (+1 free OCR scan).
6. **Subscription Tracker, Debt Tracker, Bill Splitter & Savings Goals:** Tracks recurring subscriptions (with annualized cost), personal IOUs/repayments, split bills, and savings goals.
7. **Analytics & Statement Export:** Category breakdowns, cash flow forecast, and local PDF/CSV statement export plus CSV import.
8. **Privacy & Security:** Local Room/SQLite storage, no account or bank login required, optional biometric/PIN app lock, and encrypted local backup export.
9. **Free Browser-Only Web Calculators:** 9 interactive client-side calculators under `/tools/` — Bill Calculator, Budget Calculator, Safe-to-Spend Calculator, Subscription Cost Calculator, Debt Payoff Calculator (Snowball vs. Avalanche), Bill Split Calculator, Savings Goal Calculator, 30-Day Cash-Flow Calculator, and Monthly Expense Calculator — running 100% locally in the browser with zero financial inputs sent to servers.

## Verified Third-Party SDKs & Boundaries
- **Google Play Billing & RevenueCat:** Handles optional Pro subscriptions (`monthly` `$1.49/mo` US + 7-day free trial, `yearly-annual` `$12.99/yr` US + 7-day free trial, and `lifetime` one-time unlock).
- **Google AdMob:** Serves free-tier ads (interstitial, app open, voluntary rewarded video); Pro users have an ad-free experience.
- **Firebase Analytics & Crashlytics:** Anonymous usage telemetry and crash diagnostics (financial record contents and receipt data are not sent).

## Known Limitations
- Android only (no iOS or web sync app).
- Does not connect to bank accounts or auto-import live bank transactions.
- Safe-to-Spend is a user-maintained planning estimate, not a live bank balance.
