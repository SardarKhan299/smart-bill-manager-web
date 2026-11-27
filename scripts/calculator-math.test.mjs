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
