"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  calculateSavingsGoalPlan,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_NAME = "Emergency Cushion";
const DEFAULT_TARGET = "6000";
const DEFAULT_SAVED = "1500";
const DEFAULT_MONTHLY = "375";
const DEFAULT_DEADLINE_MONTHS = "12";

const faq = [
  {
    question: "How is the required monthly savings contribution calculated?",
    answer:
      "Remaining amount equals your target goal minus current savings. Dividing that remaining balance by your target deadline in months shows the exact monthly deposit needed to finish on time (excluding variable bank interest).",
  },
  {
    question: "What is a sinking fund vs. an emergency fund?",
    answer:
      "An emergency fund covers unexpected household shocks (such as appliance repairs or income gaps), whereas a sinking fund sets aside a small amount every month for predictable annual expenses like car insurance, property tax or holidays.",
  },
  {
    question: "Are my savings targets stored on any server?",
    answer:
      "No. All calculations run locally in your browser. To track multiple savings goals, milestones and deposits offline on your phone, open Smart Bill Manager on Android.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [goalName, setGoalName] = useState(DEFAULT_NAME);
  const [targetAmount, setTargetAmount] = useState(DEFAULT_TARGET);
  const [savedAmount, setSavedAmount] = useState(DEFAULT_SAVED);
  const [monthlyContribution, setMonthlyContribution] = useState(DEFAULT_MONTHLY);
  const [targetMonths, setTargetMonths] = useState(DEFAULT_DEADLINE_MONTHS);
  const [copied, setCopied] = useState(false);

  const plan = useMemo(
    () =>
      calculateSavingsGoalPlan(
        targetAmount,
        savedAmount,
        monthlyContribution,
        targetMonths
      ),
    [targetAmount, savedAmount, monthlyContribution, targetMonths]
  );

  const format = (value: number) => formatMoney(value, currency);

  const reset = () => {
    setGoalName(DEFAULT_NAME);
    setTargetAmount(DEFAULT_TARGET);
    setSavedAmount(DEFAULT_SAVED);
    setMonthlyContribution(DEFAULT_MONTHLY);
    setTargetMonths(DEFAULT_DEADLINE_MONTHS);
    setCopied(false);
  };

  const share = async () => {
    const paceText =
      plan.monthsAtCurrentPace !== null
        ? `${plan.monthsAtCurrentPace} months at ${format(plan.monthlyContribution)}/month`
        : "enter a monthly deposit";
    const text = `Savings Goal (${goalName || "Goal"}): ${format(plan.savedAmount)} of ${format(plan.targetAmount)} saved (${plan.progressPercent}%) — ${paceText}.`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Savings Goal Calculator",
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
          { name: "Savings Goal Calculator" },
        ]}
      />
      <CalculatorJsonLd
        name="Savings Goal Calculator"
        path="/tools/savings-goal-calculator/"
        description="Free browser-based savings goal and sinking fund calculator to estimate monthly deposits, deadline pacing, and 25%/50%/75% milestones."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Savings Goal Calculator</h1>
        <p className="lead">
          Plan an emergency fund, annual bill sinking fund, or major purchase privately in your browser — and check whether your monthly deposit keeps you on pace for your target date.
        </p>

        <div className="seo-callout">
          <strong>Pacing &amp; milestone formula</strong>
          <p>
            <code>Remaining = target − saved</code>,{" "}
            <code>Months at current pace = ⌈remaining ÷ monthly deposit⌉</code>, and{" "}
            <code>Required monthly = remaining ÷ target months</code>. Zero bank login and zero server tracking.
          </p>
        </div>

        <h2>Plan your savings target</h2>
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
          Goal name
          <input
            placeholder="e.g. Emergency Fund, Annual Car Insurance, Holiday"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </label>

        <label>
          Target goal amount
          <input
            inputMode="decimal"
            placeholder="e.g. 6000"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </label>

        <label>
          Amount already saved
          <input
            inputMode="decimal"
            placeholder="e.g. 1500"
            value={savedAmount}
            onChange={(e) => setSavedAmount(e.target.value)}
          />
        </label>

        <label>
          Planned monthly deposit
          <input
            inputMode="decimal"
            placeholder="e.g. 375"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
          />
        </label>

        <label>
          Optional target deadline (in months)
          <input
            inputMode="numeric"
            placeholder="e.g. 12 (leave blank if flexible)"
            value={targetMonths}
            onChange={(e) => setTargetMonths(e.target.value)}
          />
          <span className="input-hint">
            Used to compare your planned monthly deposit against the pace required to finish on schedule.
          </span>
        </label>

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div
          className="seo-callout"
          role="region"
          aria-live="polite"
          aria-label="Savings goal calculation result"
        >
          <strong>
            {plan.targetAmount <= 0
              ? "Enter a positive target amount to calculate your savings timeline."
              : plan.remainingAmount <= 0
              ? `Goal reached! ${format(plan.savedAmount)} saved (${plan.progressPercent}%).`
              : plan.monthsAtCurrentPace !== null
              ? `Goal reached in ${plan.monthsAtCurrentPace} ${plan.monthsAtCurrentPace === 1 ? "month" : "months"} at ${format(plan.monthlyContribution)}/month`
              : `${format(plan.remainingAmount)} remaining (${plan.progressPercent}% saved) — enter a monthly deposit`}
          </strong>

          <p>
            Progress: <strong>{plan.progressPercent}%</strong> ({format(plan.savedAmount)} saved ·{" "}
            <strong>{format(plan.remainingAmount)}</strong> left to reach {format(plan.targetAmount)})
          </p>

          {plan.requiredMonthlyContribution !== null && plan.targetMonths !== null && (
            <p>
              To finish in <strong>{plan.targetMonths} {plan.targetMonths === 1 ? "month" : "months"}</strong>, save{" "}
              <strong>{format(plan.requiredMonthlyContribution)}/month</strong>.
              {plan.paceStatus === "ahead" && " You are ahead of pace!"}
              {plan.paceStatus === "on-track" && " You are right on track."}
              {plan.paceStatus === "behind" && plan.monthlyShortfall > 0 && (
                <span className="negative-value">
                  {" "}You are {format(plan.monthlyShortfall)}/month short of your deadline pace.
                </span>
              )}
            </p>
          )}

          {plan.nextMilestonePercent !== null && (
            <p>
              Next milestone (<strong>{plan.nextMilestonePercent}%</strong>):{" "}
              <strong>{format(plan.amountToNextMilestone)}</strong> away.
            </p>
          )}

          {plan.hasNegativeInput && (
            <p className="input-hint">
              Note: negative values were ignored and clamped to zero.
            </p>
          )}

          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Result copied" : "Share result"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta
              route="savings-goals"
              placement="savings-goal-calculator-result-open"
              label="Track Savings Goals in App"
            />
            <PlayCta
              placement="savings-goal-calculator-result-play"
              label="Download on Google Play"
              secondary
            />
          </div>
        </div>

        <h2>Turn irregular annual bills into calm monthly sinking funds</h2>
        <p>
          Annual car insurance, school fees, property taxes and holiday travel feel like emergencies only when they aren&apos;t broken into monthly deposits. Divide any annual bill by 12 here, then add it alongside your monthly bills and Savings Goals in Smart Bill Manager so it is automatically factored into your Safe-to-Spend cushion.
        </p>

        <h2>Savings goal calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/offline-budget-app/">Offline Budget App</Link> ·{" "}
          <Link href="/debt-tracker/">Savings Goals &amp; Debt Tracker</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/tools/cash-flow-calculator/">Cash-Flow Calculator</Link> ·{" "}
          <Link href="/blog/household-budget-guide/">Household budget guide</Link>
        </p>
      </div>
    </main>
  );
}
