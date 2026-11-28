"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  INCOME_CADENCES,
  calculateCashFlowForecast,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_BALANCE = "1850";
const DEFAULT_PAYCHECK = "1600";
const DEFAULT_CADENCE = "bi-weekly";
const DEFAULT_NEXT_PAY_DAYS = "10";
const DEFAULT_SAFETY_FLOOR = "300";
const DEFAULT_DAILY_BURN = "25";
const DEFAULT_BILLS = [
  { name: "Rent / Mortgage", amount: "1200", dueInDays: "4" },
  { name: "Electricity & Internet", amount: "165", dueInDays: "8" },
  { name: "Auto Insurance", amount: "140", dueInDays: "19" },
];

const faq = [
  {
    question: "Why can a monthly budget balance on paper while still causing a mid-month cash crunch?",
    answer:
      "Timing matters: if rent and utilities are due on Day 4 and Day 8 while your next paycheck arrives on Day 10, your checking balance can dip below your safety buffer even when monthly income exceeds monthly bills.",
  },
  {
    question: "How does this 30-day cash-flow calculator simulate my lowest balance?",
    answer:
      "Starting from today's balance, it steps forward day by day for 30 days, adding paychecks on your chosen cadence and subtracting scheduled bills and estimated daily cash spending on the exact days they occur.",
  },
  {
    question: "Is this forecast connected to my live bank account?",
    answer:
      "No. Everything runs locally in your browser as a planning estimate from the numbers you enter. Keep your bank account and bill statements as the source of truth.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [startingBalance, setStartingBalance] = useState(DEFAULT_BALANCE);
  const [paycheckAmount, setPaycheckAmount] = useState(DEFAULT_PAYCHECK);
  const [incomeCadence, setIncomeCadence] = useState(DEFAULT_CADENCE);
  const [daysUntilPayday, setDaysUntilPayday] = useState(DEFAULT_NEXT_PAY_DAYS);
  const [safetyFloor, setSafetyFloor] = useState(DEFAULT_SAFETY_FLOOR);
  const [dailyExpense, setDailyExpense] = useState(DEFAULT_DAILY_BURN);
  const [bills, setBills] = useState(DEFAULT_BILLS);
  const [copied, setCopied] = useState(false);

  const forecast = useMemo(
    () =>
      calculateCashFlowForecast({
        startingBalanceRaw: startingBalance,
        paycheckAmountRaw: paycheckAmount,
        incomeCadence,
        daysUntilNextPaydayRaw: daysUntilPayday,
        safetyFloorRaw: safetyFloor,
        dailyExpenseRaw: dailyExpense,
        horizonDaysRaw: 30,
        bills,
      }),
    [
      startingBalance,
      paycheckAmount,
      incomeCadence,
      daysUntilPayday,
      safetyFloor,
      dailyExpense,
      bills,
    ]
  );

  const format = (value: number) => formatMoney(value, currency);

  const addBill = () =>
    setBills([...bills, { name: "", amount: "", dueInDays: "15" }]);

  const removeBill = (index: number) =>
    setBills(
      bills.length > 1
        ? bills.filter((_, i) => i !== index)
        : [{ name: "", amount: "", dueInDays: "7" }]
    );

  const reset = () => {
    setStartingBalance(DEFAULT_BALANCE);
    setPaycheckAmount(DEFAULT_PAYCHECK);
    setIncomeCadence(DEFAULT_CADENCE);
    setDaysUntilPayday(DEFAULT_NEXT_PAY_DAYS);
    setSafetyFloor(DEFAULT_SAFETY_FLOOR);
    setDailyExpense(DEFAULT_DAILY_BURN);
    setBills(DEFAULT_BILLS);
    setCopied(false);
  };

  const share = async () => {
    const text = `30-Day Cash-Flow Forecast: Lowest projected balance ${format(forecast.lowestBalance)} (Day ${forecast.lowestBalanceDay}), ending balance ${format(forecast.endingBalance)}, daily Safe-to-Spend ${format(forecast.safeToSpendPerDay)}/day until payday.`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Cash-Flow Calculator",
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools/" },
          { name: "Cash-Flow Calculator" },
        ]}
      />
      <CalculatorJsonLd
        name="30-Day Household Cash-Flow Calculator"
        path="/tools/cash-flow-calculator/"
        description="Free browser-based 30-day cash-flow calculator to simulate upcoming paydays, bill due dates, safety-floor dips, and daily Safe-to-Spend."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>30-Day Household Cash-Flow Calculator</h1>
        <p className="lead">
          Look ahead across the next 30 days by lining up your starting balance, paycheck schedule, upcoming bill due dates and everyday spending — privately in your browser.
        </p>

        <div className="seo-callout">
          <strong>Day-by-day timing simulation</strong>
          <p>
            Unlike a flat monthly budget, this tool steps through Days 1–30 in sequence to find your{" "}
            <strong>lowest projected balance before payday</strong> and alert you if clustered bills dip below your safety cushion.
          </p>
        </div>

        <h2>Enter your 30-day cash-flow inputs</h2>
        <label>
          Display currency
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {SUPPORTED_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>

        <label>
          Current available balance (today)
          <input
            inputMode="decimal"
            placeholder="e.g. 1850"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
          />
        </label>

        <label>
          Expected paycheck amount
          <input
            inputMode="decimal"
            placeholder="e.g. 1600"
            value={paycheckAmount}
            onChange={(e) => setPaycheckAmount(e.target.value)}
          />
        </label>

        <label>
          Paycheck frequency
          <select
            value={incomeCadence}
            onChange={(e) => setIncomeCadence(e.target.value)}
          >
            {INCOME_CADENCES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Days until next payday (1–30)
          <input
            inputMode="numeric"
            placeholder="e.g. 10"
            value={daysUntilPayday}
            onChange={(e) => setDaysUntilPayday(e.target.value)}
          />
        </label>

        <label>
          Minimum safety cushion (floor you want to stay above)
          <input
            inputMode="decimal"
            placeholder="e.g. 300"
            value={safetyFloor}
            onChange={(e) => setSafetyFloor(e.target.value)}
          />
        </label>

        <label>
          Estimated daily everyday spending (groceries, coffee, fuel)
          <input
            inputMode="decimal"
            placeholder="e.g. 25"
            value={dailyExpense}
            onChange={(e) => setDailyExpense(e.target.value)}
          />
        </label>

        <h3>Upcoming bills due in the next 30 days</h3>
        {bills.map((bill, i) => (
          <div className="tool-row-sub" key={i}>
            <input
              aria-label={`Bill ${i + 1} name`}
              placeholder="Bill name (e.g. Rent)"
              value={bill.name}
              onChange={(e) => {
                const next = [...bills];
                next[i] = { ...next[i], name: e.target.value };
                setBills(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Bill ${i + 1} amount`}
              placeholder="Amount"
              value={bill.amount}
              onChange={(e) => {
                const next = [...bills];
                next[i] = { ...next[i], amount: e.target.value };
                setBills(next);
              }}
            />
            <input
              inputMode="numeric"
              aria-label={`Bill ${i + 1} due in days`}
              placeholder="Due in days (0–29)"
              value={bill.dueInDays}
              onChange={(e) => {
                const next = [...bills];
                next[i] = { ...next[i], dueInDays: e.target.value };
                setBills(next);
              }}
            />
            <button
              className="btn-remove"
              type="button"
              aria-label={`Remove bill ${i + 1}`}
              onClick={() => removeBill(i)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={addBill}>
            Add upcoming bill
          </button>
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div
          className="seo-callout"
          role="region"
          aria-live="polite"
          aria-label="Cash-flow forecast result"
        >
          <strong className={forecast.lowestBalance < 0 ? "negative-value" : ""}>
            Lowest 30-day balance: {format(forecast.lowestBalance)} (Day {forecast.lowestBalanceDay})
          </strong>
          <p>
            Day-30 ending balance: <strong>{format(forecast.endingBalance)}</strong> · Safe-to-Spend until payday:{" "}
            <strong>{format(forecast.safeToSpendPerDay)}/day</strong> (above your {format(forecast.safetyFloor)} floor)
          </p>
          <p>
            30-day totals: <strong>+{format(forecast.totalProjectedIncome)}</strong> paychecks ·{" "}
            <strong>−{format(forecast.totalProjectedBills)}</strong> bills ·{" "}
            <strong>−{format(forecast.totalDailyBurn)}</strong> daily spending · Runway without new income:{" "}
            <strong>
              {forecast.runwayDaysWithoutIncome >= 30
                ? "30+ days"
                : `${forecast.runwayDaysWithoutIncome} days`}
            </strong>
          </p>

          {forecast.isOverdraftDetected ? (
            <p className="negative-value">
              Overdraft alert: your projected balance drops below zero (triggered around{" "}
              {forecast.triggerBillTitle || "scheduled outflows"}). Consider moving a bill due date, trimming daily burn, or adding buffer funds before Day {forecast.lowestBalanceDay}.
            </p>
          ) : forecast.isCrunchDetected ? (
            <p className="negative-value">
              Safety-cushion dip: your balance drops {format(forecast.crunchDeficit)} below your{" "}
              {format(forecast.safetyFloor)} safety floor for {forecast.dangerZoneDaysCount}{" "}
              {forecast.dangerZoneDaysCount === 1 ? "day" : "days"} (around{" "}
              {forecast.triggerBillTitle || "upcoming bills"}).
            </p>
          ) : (
            <p>
              Buffer intact: your projected balance stays at or above your {format(forecast.safetyFloor)} safety cushion across all 30 days.
            </p>
          )}

          {forecast.hasNegativeInput && (
            <p className="input-hint">
              Note: negative bill or income inputs were ignored and clamped to zero.
            </p>
          )}

          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Forecast copied" : "Share result"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta
              route="analytics"
              placement="cash-flow-calculator-result-open"
              label="Open Cash-Flow Forecast in App"
            />
            <PlayCta
              placement="cash-flow-calculator-result-play"
              label="Download on Google Play"
              secondary
            />
          </div>
        </div>

        <h2>How to prevent pre-payday cash crunches</h2>
        <ol>
          <li>Check which fixed bills land in the 7–10 days right before your next paycheck.</li>
          <li>Keep a dedicated safety floor so auto-pay timing shifts or weekend bank delays never trigger overdraft fees.</li>
          <li>Record recurring bills and daily cash spending in Smart Bill Manager on Android to see live 30-to-90-day cash-flow trajectories automatically.</li>
        </ol>

        <h2>Cash-flow calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/cash-flow-forecast/">Cash-Flow Forecast</Link> ·{" "}
          <Link href="/safe-to-spend/">Safe-to-Spend</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/blog/household-cash-flow-planning/">Household cash-flow planning guide</Link>
        </p>
      </div>
    </main>
  );
}
