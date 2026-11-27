export const SUPPORTED_CURRENCIES = ["USD", "GBP", "EUR", "CAD", "AUD", "CHF", "PKR"];

export const SUBSCRIPTION_FREQUENCIES = [
  { value: "monthly", label: "Monthly (12x/yr)", annualMultiplier: 12 },
  { value: "yearly", label: "Yearly (1x/yr)", annualMultiplier: 1 },
  { value: "quarterly", label: "Quarterly (4x/yr)", annualMultiplier: 4 },
  { value: "weekly", label: "Weekly (52x/yr)", annualMultiplier: 52 },
  { value: "bi-weekly", label: "Bi-weekly (26x/yr)", annualMultiplier: 26 },
];

export function parseAmount(raw) {
  if (raw === null || raw === undefined) return 0;
  const cleaned = String(raw).trim().replace(/,/g, "");
  if (!cleaned) return 0;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function roundCurrency(value) {
  if (!Number.isFinite(value)) return 0;
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return Object.is(rounded, -0) ? 0 : rounded;
}

export function formatMoney(value, currency = "USD", locale = undefined) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundCurrency(value));
}

export function calculateBillSummary(incomeRaw, bills = []) {
  const income = roundCurrency(parseAmount(incomeRaw));
  const rawTotal = bills.reduce((sum, bill) => sum + parseAmount(bill?.amount), 0);
  const totalBills = roundCurrency(rawTotal);
  const remaining = roundCurrency(income - totalBills);
  const shortfall = remaining < 0 ? roundCurrency(Math.abs(remaining)) : 0;
  const hasNegativeInput =
    parseAmount(incomeRaw) < 0 || bills.some((bill) => parseAmount(bill?.amount) < 0);

  return {
    income,
    totalBills,
    remaining,
    shortfall,
    hasNegativeInput,
  };
}

export function calculateBudgetSummary(incomeRaw, items = []) {
  const income = roundCurrency(parseAmount(incomeRaw));
  const rawTotal = items.reduce((sum, item) => sum + parseAmount(item?.amount), 0);
  const plannedSpending = roundCurrency(rawTotal);
  const unallocated = roundCurrency(income - plannedSpending);
  const shortfall = unallocated < 0 ? roundCurrency(Math.abs(unallocated)) : 0;
  const allocationPercent =
    income > 0 ? roundCurrency((plannedSpending / income) * 100) : 0;
  const hasNegativeInput =
    parseAmount(incomeRaw) < 0 || items.some((item) => parseAmount(item?.amount) < 0);

  return {
    income,
    plannedSpending,
    unallocated,
    shortfall,
    allocationPercent,
    hasNegativeInput,
  };
}

export function calculateSafeToSpend(balanceRaw, committedRaw, plannedRaw) {
  const balance = roundCurrency(parseAmount(balanceRaw));
  const committed = roundCurrency(parseAmount(committedRaw));
  const planned = roundCurrency(parseAmount(plannedRaw));
  const rawAvailable = roundCurrency(balance - committed - planned);
  const safeToSpend = rawAvailable > 0 ? rawAvailable : 0;
  const shortfall = rawAvailable < 0 ? roundCurrency(Math.abs(rawAvailable)) : 0;
  const hasNegativeInput = balance < 0 || committed < 0 || planned < 0;

  return {
    balance,
    committed,
    planned,
    rawAvailable,
    safeToSpend,
    shortfall,
    hasNegativeInput,
  };
}

export function calculateSubscriptionCosts(amountRaw, frequency = "monthly") {
  const amount = parseAmount(amountRaw);
  const norm = String(frequency || "monthly").trim().toLowerCase();
  let annual = amount * 12;
  if (norm === "daily") annual = amount * 365;
  else if (norm === "bi-weekly" || norm === "biweekly") annual = amount * 26;
  else if (norm === "weekly") annual = amount * 52;
  else if (norm === "quarterly") annual = amount * 4;
  else if (norm === "yearly" || norm === "annually") annual = amount * 1;

  const annualCost = roundCurrency(annual);
  const monthlyEquivalent = roundCurrency(annual / 12);
  return {
    amount: roundCurrency(amount),
    annualCost,
    monthlyEquivalent,
  };
}

export function calculateSubscriptionSummary(subscriptions = [], monthlyIncomeRaw = "") {
  const breakdown = subscriptions.map((sub) => {
    const { amount, annualCost, monthlyEquivalent } = calculateSubscriptionCosts(
      sub?.amount,
      sub?.frequency
    );
    return {
      name: sub?.name || "",
      frequency: sub?.frequency || "monthly",
      amount,
      annualCost,
      monthlyEquivalent,
    };
  });

  const rawAnnual = breakdown.reduce((sum, item) => sum + item.annualCost, 0);
  const annualTotal = roundCurrency(rawAnnual);
  const monthlyTotal = roundCurrency(rawAnnual / 12);
  const fiveYearTotal = roundCurrency(annualTotal * 5);

  const hasIncome = String(monthlyIncomeRaw ?? "").trim() !== "";
  const monthlyIncome = roundCurrency(parseAmount(monthlyIncomeRaw));
  const remainingAfterSubscriptions = hasIncome
    ? roundCurrency(monthlyIncome - monthlyTotal)
    : null;
  const incomeSharePercent =
    hasIncome && monthlyIncome > 0
      ? roundCurrency((monthlyTotal / monthlyIncome) * 100)
      : null;

  const hasNegativeInput =
    (hasIncome && monthlyIncome < 0) ||
    subscriptions.some((sub) => parseAmount(sub?.amount) < 0);

  return {
    breakdown,
    monthlyTotal,
    annualTotal,
    fiveYearTotal,
    monthlyIncome: hasIncome ? monthlyIncome : null,
    remainingAfterSubscriptions,
    incomeSharePercent,
    hasNegativeInput,
  };
}
