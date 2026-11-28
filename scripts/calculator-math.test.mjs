import test from "node:test";
import assert from "node:assert/strict";
import {
  SUPPORTED_CURRENCIES,
  parseAmount,
  roundCurrency,
  formatMoney,
  calculateBillSummary,
  calculateBudgetSummary,
  calculateSafeToSpend,
  calculateSubscriptionCosts,
  calculateSubscriptionSummary,
  calculateDebtPayoffPlan,
  calculateBillSplit,
  formatBillSplitShareSlip,
  calculateSavingsGoalPlan,
  calculateCashFlowForecast,
  calculateMonthlyExpenses,
} from "../app/tools/calculator-math.mjs";

test("parseAmount handles zero, empty, missing, malformed, comma-separated, negative, decimal, and large values", () => {
  assert.equal(parseAmount("0"), 0);
  assert.equal(parseAmount(0), 0);
  assert.equal(parseAmount(""), 0);
  assert.equal(parseAmount("   "), 0);
  assert.equal(parseAmount(null), 0);
  assert.equal(parseAmount(undefined), 0);
  assert.equal(parseAmount("not-a-number"), 0);
  assert.equal(parseAmount("1,000,000.50"), 1000000.5);
  assert.equal(parseAmount("-125.75"), -125.75);
  assert.equal(parseAmount("99999999.99"), 99999999.99);
});

test("roundCurrency avoids IEEE-754 float drift and negative zero", () => {
  assert.equal(roundCurrency(0.1 + 0.2), 0.3);
  assert.equal(roundCurrency(19.995), 20);
  assert.equal(roundCurrency(-0.0001), 0);
  assert.ok(!Object.is(roundCurrency(-0), -0));
});

test("Bill Calculator handles zero, decimals, large numbers, missing rows, negative inputs, shortfall, and reset", () => {
  const zero = calculateBillSummary("0", [{ name: "Rent", amount: "0" }]);
  assert.equal(zero.totalBills, 0);
  assert.equal(zero.remaining, 0);
  assert.equal(zero.shortfall, 0);
  assert.equal(zero.hasNegativeInput, false);

  const decimals = calculateBillSummary("3500.50", [
    { name: "Rent", amount: "1200.10" },
    { name: "Power", amount: "89.20" },
    { name: "Empty row", amount: "" },
  ]);
  assert.equal(decimals.totalBills, 1289.3);
  assert.equal(decimals.remaining, 2211.2);
  assert.equal(decimals.shortfall, 0);

  const shortfall = calculateBillSummary("1000", [{ name: "Housing", amount: "1450.75" }]);
  assert.equal(shortfall.remaining, -450.75);
  assert.equal(shortfall.shortfall, 450.75);

  const negative = calculateBillSummary("4000", [
    { name: "Rent", amount: "1500" },
    { name: "Credit", amount: "-100" },
  ]);
  assert.equal(negative.totalBills, 1400);
  assert.equal(negative.remaining, 2600);
  assert.equal(negative.hasNegativeInput, true);

  const large = calculateBillSummary("1,000,000", [{ name: "Mortgage", amount: "250,000" }]);
  assert.equal(large.remaining, 750000);

  const defaults = [
    { name: "Housing", amount: "1500" },
    { name: "Utilities", amount: "250" },
    { name: "Insurance", amount: "150" },
  ];
  const initial = calculateBillSummary("4000", defaults);
  const edited = calculateBillSummary("5000", [...defaults, { name: "Extra", amount: "999" }]);
  assert.notEqual(initial.remaining, edited.remaining);
  const afterReset = calculateBillSummary("4000", defaults);
  assert.deepEqual(initial, afterReset);
});

test("Budget Calculator computes planned spending, allocation percentage, unallocated amount, and shortfall", () => {
  const res = calculateBudgetSummary("4000", [
    { name: "Housing", amount: "1500" },
    { name: "Food", amount: "500" },
    { name: "Blank", amount: "" },
  ]);
  assert.equal(res.plannedSpending, 2000);
  assert.equal(res.unallocated, 2000);
  assert.equal(res.allocationPercent, 50);
  assert.equal(res.shortfall, 0);

  const overBudget = calculateBudgetSummary("2000", [{ name: "All", amount: "2500.25" }]);
  assert.equal(overBudget.unallocated, -500.25);
  assert.equal(overBudget.shortfall, 500.25);

  const zeroIncome = calculateBudgetSummary("0", [{ name: "Food", amount: "100" }]);
  assert.equal(zeroIncome.allocationPercent, 0);
  assert.equal(zeroIncome.shortfall, 100);
});

test("Safe-to-Spend Calculator clamps negative discretionary amounts to zero while exposing shortfall", () => {
  const positive = calculateSafeToSpend("4000", "1800", "500");
  assert.equal(positive.safeToSpend, 1700);
  assert.equal(positive.shortfall, 0);

  const overCommitted = calculateSafeToSpend("1500", "1800", "250.50");
  assert.equal(overCommitted.rawAvailable, -550.5);
  assert.equal(overCommitted.safeToSpend, 0);
  assert.equal(overCommitted.shortfall, 550.5);

  const missingInputs = calculateSafeToSpend("", "", "");
  assert.equal(missingInputs.safeToSpend, 0);
  assert.equal(missingInputs.shortfall, 0);

  const negCheck = calculateSafeToSpend("1000", "-50", "100");
  assert.equal(negCheck.hasNegativeInput, true);
});

test("Subscription Cost Calculator converts weekly, bi-weekly, monthly, quarterly, and yearly frequencies accurately", () => {
  assert.deepEqual(calculateSubscriptionCosts("10", "weekly"), {
    amount: 10,
    annualCost: 520,
    monthlyEquivalent: 43.33,
  });
  assert.deepEqual(calculateSubscriptionCosts("20", "bi-weekly"), {
    amount: 20,
    annualCost: 520,
    monthlyEquivalent: 43.33,
  });
  assert.deepEqual(calculateSubscriptionCosts("15.99", "monthly"), {
    amount: 15.99,
    annualCost: 191.88,
    monthlyEquivalent: 15.99,
  });
  assert.deepEqual(calculateSubscriptionCosts("30", "quarterly"), {
    amount: 30,
    annualCost: 120,
    monthlyEquivalent: 10,
  });
  assert.deepEqual(calculateSubscriptionCosts("120", "yearly"), {
    amount: 120,
    annualCost: 120,
    monthlyEquivalent: 10,
  });

  const summary = calculateSubscriptionSummary(
    [
      { name: "Streaming", amount: "15.99", frequency: "monthly" },
      { name: "Music", amount: "11.99", frequency: "monthly" },
      { name: "Annual Membership", amount: "120", frequency: "yearly" },
    ],
    "4000"
  );
  assert.equal(summary.annualTotal, 455.76);
  assert.equal(summary.monthlyTotal, 37.98);
  assert.equal(summary.fiveYearTotal, 2278.8);
  assert.equal(summary.incomeSharePercent, 0.95);
  assert.equal(summary.remainingAfterSubscriptions, 3962.02);

  const noIncome = calculateSubscriptionSummary(
    [{ name: "Cloud", amount: "9.99", frequency: "monthly" }],
    ""
  );
  assert.equal(noIncome.monthlyIncome, null);
  assert.equal(noIncome.incomeSharePercent, null);
  assert.equal(noIncome.remainingAfterSubscriptions, null);
});

test("formatMoney formats all supported currencies cleanly with 2 decimals", () => {
  for (const code of SUPPORTED_CURRENCIES) {
    const formatted = formatMoney(1234.5, code, "en-US");
    assert.ok(formatted.includes("1,234.50"), `Expected 1,234.50 in ${code} output: ${formatted}`);
  }
});

test("Debt Payoff Calculator compares Snowball vs. Avalanche rollover amortization, min-payment fallback, and edge cases", () => {
  const debts = [
    { name: "Small Low-APR Loan", balance: "600", interestRate: "4", minimumPayment: "30" },
    { name: "High-APR Card", balance: "4500", interestRate: "26.99", minimumPayment: "120" },
  ];

  const snowball = calculateDebtPayoffPlan(debts, "200", "snowball");
  const avalanche = calculateDebtPayoffPlan(debts, "200", "avalanche");

  assert.equal(snowball.totalDebt, 5100);
  assert.equal(snowball.totalMinimumRequired, 150);
  assert.equal(snowball.monthlyPaymentBudget, 350);
  assert.equal(snowball.orderedDebts[0].name, "Small Low-APR Loan");
  assert.equal(avalanche.orderedDebts[0].name, "High-APR Card");

  assert.ok(
    avalanche.totalInterestPaid < snowball.totalInterestPaid,
    `Expected Avalanche interest (${avalanche.totalInterestPaid}) < Snowball interest (${snowball.totalInterestPaid})`
  );
  assert.ok(snowball.comparison.interestSavedWithAvalanche > 0);
  assert.ok(
    snowball.firstDebtPaidMonths < avalanche.firstDebtPaidMonths,
    `Expected Snowball first win (${snowball.firstDebtPaidMonths}) < Avalanche first win (${avalanche.firstDebtPaidMonths})`
  );

  const zeroApr = calculateDebtPayoffPlan(
    [{ name: "Family IOU", balance: "500", interestRate: "0", minimumPayment: "100" }],
    "0",
    "snowball"
  );
  assert.equal(zeroApr.totalMonths, 5);
  assert.equal(zeroApr.totalInterestPaid, 0);
  assert.equal(zeroApr.unpayableWarning, false);

  const fallbackMin = calculateDebtPayoffPlan(
    [{ name: "Card", balance: "2000", interestRate: "18", minimumPayment: "" }],
    "50",
    "avalanche"
  );
  assert.equal(fallbackMin.usedEstimatedMinimum, true);
  assert.equal(fallbackMin.totalMinimumRequired, 40);

  const empty = calculateDebtPayoffPlan([{ name: "", balance: "0", interestRate: "0", minimumPayment: "0" }], "100");
  assert.equal(empty.totalDebt, 0);
  assert.equal(empty.totalMonths, 0);
  assert.equal(empty.unpayableWarning, false);

  const unpayable = calculateDebtPayoffPlan(
    [{ name: "Zero Payment IOU", balance: "1000", interestRate: "0", minimumPayment: "0" }],
    "0"
  );
  assert.equal(unpayable.unpayableWarning, true);

  const neg = calculateDebtPayoffPlan(
    [{ name: "Card", balance: "500", interestRate: "-5", minimumPayment: "50" }],
    "-20"
  );
  assert.equal(neg.hasNegativeInput, true);
});

test("Bill Split Calculator handles tip, extra fees, rounding remainders, people clamping, and share slip text", () => {
  const even = calculateBillSplit("120", "15", "6", "4");
  assert.equal(even.tipAmount, 18);
  assert.equal(even.grandTotal, 144);
  assert.equal(even.perPersonShare, 36);
  assert.equal(even.roundingDifference, 0);
  assert.equal(even.wasPeopleClamped, false);

  const slip = formatBillSplitShareSlip("Group Dinner", even, "USD", "en-US");
  assert.ok(slip.includes("Bill Split: Group Dinner"));
  assert.ok(slip.includes("Tip (15%): $18.00"));
  assert.ok(slip.includes("Extra Fee / Tax: $6.00"));
  assert.ok(slip.includes("Grand Total: $144.00"));
  assert.ok(slip.includes("Split Between: 4 people"));
  assert.ok(slip.includes("Each Person Pays: $36.00"));

  const oddThirds = calculateBillSplit("100", "0", "0", "3");
  assert.equal(oddThirds.perPersonShare, 33.33);
  assert.equal(oddThirds.roundingDifference, -0.01);

  const clampedLow = calculateBillSplit("50", "0", "0", "0");
  assert.equal(clampedLow.peopleCount, 1);
  assert.equal(clampedLow.wasPeopleClamped, true);
  assert.equal(clampedLow.perPersonShare, 50);

  const clampedHigh = calculateBillSplit("1000", "0", "0", "250");
  assert.equal(clampedHigh.peopleCount, 100);
  assert.equal(clampedHigh.wasPeopleClamped, true);
  assert.equal(clampedHigh.perPersonShare, 10);

  const negative = calculateBillSplit("-50", "-10", "-5", "-2");
  assert.equal(negative.grandTotal, 0);
  assert.equal(negative.hasNegativeInput, true);
});

test("Savings Goal Calculator computes deadline pacing, required monthly deposits, and 25%/50%/75%/100% milestones", () => {
  const onTrack = calculateSavingsGoalPlan("6000", "1500", "375", "12");
  assert.equal(onTrack.remainingAmount, 4500);
  assert.equal(onTrack.progressPercent, 25);
  assert.equal(onTrack.monthsAtCurrentPace, 12);
  assert.equal(onTrack.requiredMonthlyContribution, 375);
  assert.equal(onTrack.paceStatus, "on-track");
  assert.equal(onTrack.nextMilestonePercent, 50);
  assert.equal(onTrack.amountToNextMilestone, 1500);

  const behind = calculateSavingsGoalPlan("5000", "500", "200", "10");
  assert.equal(behind.requiredMonthlyContribution, 450);
  assert.equal(behind.monthlyShortfall, 250);
  assert.equal(behind.paceStatus, "behind");
  assert.equal(behind.nextMilestonePercent, 25);
  assert.equal(behind.amountToNextMilestone, 750);

  const completed = calculateSavingsGoalPlan("1000", "1200", "100", "6");
  assert.equal(completed.remainingAmount, 0);
  assert.equal(completed.progressPercent, 100);
  assert.equal(completed.paceStatus, "completed");
  assert.equal(completed.nextMilestonePercent, null);

  const flexible = calculateSavingsGoalPlan("3000", "0", "300", "");
  assert.equal(flexible.paceStatus, "no-deadline");
  assert.equal(flexible.monthsAtCurrentPace, 10);
});

test("30-Day Cash-Flow Calculator detects pre-payday safety floor dips, overdrafts, runway, and daily Safe-to-Spend", () => {
  const crunch = calculateCashFlowForecast({
    startingBalanceRaw: "1200",
    paycheckAmountRaw: "1600",
    incomeCadence: "bi-weekly",
    daysUntilNextPaydayRaw: "10",
    safetyFloorRaw: "300",
    dailyExpenseRaw: "20",
    horizonDaysRaw: "30",
    bills: [{ name: "Rent", amount: "1000", dueInDays: "3" }],
  });
  // Before Day 10 payday: 1200 - 1000 rent - (10 * 20 = 200 daily burn) = 0 on Day 10 (day index 9)
  assert.equal(crunch.lowestBalance, 0);
  assert.equal(crunch.isCrunchDetected, true);
  assert.equal(crunch.isOverdraftDetected, false);
  assert.equal(crunch.crunchDeficit, 300);
  assert.equal(crunch.safeToSpendPerDay, 0);

  const healthy = calculateCashFlowForecast({
    startingBalanceRaw: "3000",
    paycheckAmountRaw: "2000",
    incomeCadence: "monthly",
    daysUntilNextPaydayRaw: "15",
    safetyFloorRaw: "500",
    dailyExpenseRaw: "10",
    horizonDaysRaw: "30",
    bills: [{ name: "Internet", amount: "80", dueInDays: "5" }],
  });
  assert.equal(healthy.isCrunchDetected, false);
  assert.equal(healthy.isOverdraftDetected, false);
  assert.ok(healthy.safeToSpendPerDay > 100);
  assert.equal(healthy.runwayDaysWithoutIncome, 30);
});

test("Monthly Expense Calculator rolls up daily, weekly, bi-weekly, monthly, and yearly categories accurately", () => {
  const res = calculateMonthlyExpenses(
    [
      { name: "Coffee", amount: "5", frequency: "daily" },
      { name: "Groceries", amount: "120", frequency: "weekly" },
      { name: "Gym", amount: "40", frequency: "monthly" },
    ],
    "4000"
  );
  // Annual: (5*365 = 1825) + (120*52 = 6240) + (40*12 = 480) = 8545
  assert.equal(res.annualTotal, 8545);
  assert.equal(res.monthlyTotal, 712.08);
  assert.equal(res.dailyAverage, 23.41);
  assert.equal(res.topCategoryName, "Groceries");
  assert.equal(res.remainingAfterExpenses, 3287.92);
});
