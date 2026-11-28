export const SUPPORTED_CURRENCIES = ["USD", "GBP", "EUR", "CAD", "AUD", "CHF", "PKR"];

export const SUBSCRIPTION_FREQUENCIES = [
  { value: "monthly", label: "Monthly (12x/yr)", annualMultiplier: 12 },
  { value: "yearly", label: "Yearly (1x/yr)", annualMultiplier: 1 },
  { value: "quarterly", label: "Quarterly (4x/yr)", annualMultiplier: 4 },
  { value: "weekly", label: "Weekly (52x/yr)", annualMultiplier: 52 },
  { value: "bi-weekly", label: "Bi-weekly (26x/yr)", annualMultiplier: 26 },
];

export const EXPENSE_FREQUENCIES = [
  { value: "daily", label: "Daily (365x/yr)", annualMultiplier: 365 },
  { value: "weekly", label: "Weekly (52x/yr)", annualMultiplier: 52 },
  { value: "bi-weekly", label: "Bi-weekly (26x/yr)", annualMultiplier: 26 },
  { value: "monthly", label: "Monthly (12x/yr)", annualMultiplier: 12 },
  { value: "yearly", label: "Yearly (1x/yr)", annualMultiplier: 1 },
];

export const INCOME_CADENCES = [
  { value: "bi-weekly", label: "Bi-weekly (every 14 days)", periodDays: 14 },
  { value: "monthly", label: "Monthly (every 30 days)", periodDays: 30 },
  { value: "semi-monthly", label: "Semi-monthly (every 15 days)", periodDays: 15 },
  { value: "weekly", label: "Weekly (every 7 days)", periodDays: 7 },
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

const MAX_DEBT_SIMULATION_MONTHS = 600;

function simulateDebtStrategy(normalizedDebts, extraMonthlyPayment, strategy) {
  if (normalizedDebts.length === 0) {
    return {
      strategy,
      totalDebt: 0,
      totalMinimumRequired: 0,
      monthlyPaymentBudget: extraMonthlyPayment,
      totalMonths: 0,
      totalInterestPaid: 0,
      firstDebtPaidMonths: 0,
      cappedAtMaxMonths: false,
      unpayableWarning: false,
      orderedDebts: [],
    };
  }

  const ordered = [...normalizedDebts].sort((a, b) => {
    if (strategy === "avalanche") {
      if (b.apr !== a.apr) return b.apr - a.apr;
      if (a.balance !== b.balance) return a.balance - b.balance;
      return a.id - b.id;
    }
    if (a.balance !== b.balance) return a.balance - b.balance;
    if (b.apr !== a.apr) return b.apr - a.apr;
    return a.id - b.id;
  });

  const totalDebt = roundCurrency(ordered.reduce((sum, d) => sum + d.balance, 0));
  const totalMinimumRequired = roundCurrency(
    ordered.reduce((sum, d) => sum + d.effectiveMin, 0)
  );
  const monthlyPaymentBudget = roundCurrency(totalMinimumRequired + extraMonthlyPayment);

  const firstMonthInterest = ordered.reduce(
    (sum, d) => sum + d.balance * (d.apr / 100 / 12),
    0
  );

  const balances = ordered.map((d) => d.balance);
  const interestPaid = ordered.map(() => 0);
  const paidOffMonth = ordered.map(() => 0);

  let monthsElapsed = 0;

  if (monthlyPaymentBudget > 0) {
    for (let month = 1; month <= MAX_DEBT_SIMULATION_MONTHS; month++) {
      if (balances.every((b) => b <= 0.005)) break;

      let available = monthlyPaymentBudget;

      for (let i = 0; i < ordered.length; i++) {
        if (balances[i] > 0.005 && ordered[i].apr > 0) {
          const monthlyRate = ordered[i].apr / 100 / 12;
          const interest = balances[i] * monthlyRate;
          balances[i] += interest;
          interestPaid[i] += interest;
        }
      }

      for (let i = 0; i < ordered.length; i++) {
        if (balances[i] > 0.005 && available > 0.005) {
          const minDue = Math.min(ordered[i].effectiveMin, balances[i]);
          const payment = Math.min(minDue, available);
          balances[i] -= payment;
          available -= payment;
          if (balances[i] <= 0.005) {
            balances[i] = 0;
            if (paidOffMonth[i] === 0) paidOffMonth[i] = month;
          }
        }
      }

      for (let i = 0; i < ordered.length; i++) {
        if (balances[i] > 0.005 && available > 0.005) {
          const extra = Math.min(balances[i], available);
          balances[i] -= extra;
          available -= extra;
          if (balances[i] <= 0.005) {
            balances[i] = 0;
            if (paidOffMonth[i] === 0) paidOffMonth[i] = month;
          }
        }
      }

      monthsElapsed = month;
    }
  }

  const cappedAtMaxMonths = balances.some((b) => b > 0.005);
  const unpayableWarning =
    monthlyPaymentBudget <= 0 ||
    monthlyPaymentBudget <= firstMonthInterest ||
    cappedAtMaxMonths;

  const totalInterestPaid = roundCurrency(
    interestPaid.reduce((sum, val) => sum + val, 0)
  );
  const completedMonths = paidOffMonth.filter((m) => m > 0);
  const firstDebtPaidMonths =
    completedMonths.length > 0 ? Math.min(...completedMonths) : monthsElapsed;

  const orderedDebts = ordered.map((d, i) => ({
    name: d.name,
    balance: d.balance,
    apr: roundCurrency(d.apr),
    minimumPayment: roundCurrency(d.effectiveMin),
    usedEstimatedMinimum: d.usedEstimatedMinimum,
    monthsToPayoff: paidOffMonth[i] || monthsElapsed,
    totalInterestPaid: roundCurrency(interestPaid[i]),
    remainingUnpaid: roundCurrency(balances[i]),
  }));

  return {
    strategy,
    totalDebt,
    totalMinimumRequired,
    monthlyPaymentBudget,
    totalMonths: monthsElapsed,
    totalInterestPaid,
    firstDebtPaidMonths,
    cappedAtMaxMonths,
    unpayableWarning,
    orderedDebts,
  };
}

export function calculateDebtPayoffPlan(
  debts = [],
  extraMonthlyPaymentRaw = "0",
  strategy = "snowball"
) {
  const normStrategy =
    String(strategy || "snowball").trim().toLowerCase() === "avalanche"
      ? "avalanche"
      : "snowball";

  const rawExtra = parseAmount(extraMonthlyPaymentRaw);
  const extraMonthlyPayment = roundCurrency(Math.max(0, rawExtra));

  const hasNegativeInput =
    rawExtra < 0 ||
    debts.some(
      (d) =>
        parseAmount(d?.balance) < 0 ||
        parseAmount(d?.interestRate) < 0 ||
        parseAmount(d?.minimumPayment) < 0
    );

  const normalizedDebts = debts
    .map((d, index) => {
      const rawBal = parseAmount(d?.balance);
      const balance = rawBal > 0.001 ? roundCurrency(rawBal) : 0;
      const apr = Math.max(0, parseAmount(d?.interestRate));
      const userMin = Math.max(0, parseAmount(d?.minimumPayment));
      let effectiveMin = 0;
      let usedEstimatedMinimum = false;
      if (balance > 0) {
        if (userMin > 0) {
          effectiveMin = Math.min(userMin, balance);
        } else if (apr > 0) {
          effectiveMin = Math.min(Math.max(25, balance * 0.02), balance);
          usedEstimatedMinimum = true;
        }
      }
      return {
        id: index,
        name: String(d?.name || "").trim() || `Debt ${index + 1}`,
        balance,
        apr,
        effectiveMin: roundCurrency(effectiveMin),
        usedEstimatedMinimum,
      };
    })
    .filter((d) => d.balance > 0.001);

  const snowball = simulateDebtStrategy(normalizedDebts, extraMonthlyPayment, "snowball");
  const avalanche = simulateDebtStrategy(normalizedDebts, extraMonthlyPayment, "avalanche");
  const active = normStrategy === "avalanche" ? avalanche : snowball;

  return {
    ...active,
    extraMonthlyPayment,
    hasNegativeInput,
    usedEstimatedMinimum: normalizedDebts.some((d) => d.usedEstimatedMinimum),
    comparison: {
      snowballTotalMonths: snowball.totalMonths,
      snowballTotalInterest: snowball.totalInterestPaid,
      snowballFirstDebtMonths: snowball.firstDebtPaidMonths,
      avalancheTotalMonths: avalanche.totalMonths,
      avalancheTotalInterest: avalanche.totalInterestPaid,
      avalancheFirstDebtMonths: avalanche.firstDebtPaidMonths,
      interestSavedWithAvalanche: roundCurrency(
        Math.max(0, snowball.totalInterestPaid - avalanche.totalInterestPaid)
      ),
      monthsSavedWithAvalanche: Math.max(
        0,
        snowball.totalMonths - avalanche.totalMonths
      ),
      fasterFirstWinMonthsWithSnowball: Math.max(
        0,
        avalanche.firstDebtPaidMonths - snowball.firstDebtPaidMonths
      ),
    },
  };
}

export function calculateBillSplit(
  baseAmountRaw,
  tipPercentRaw = "0",
  extraFeeRaw = "0",
  peopleCountRaw = "2"
) {
  const rawBase = parseAmount(baseAmountRaw);
  const rawTip = parseAmount(tipPercentRaw);
  const rawExtra = parseAmount(extraFeeRaw);
  const rawPeople = parseAmount(peopleCountRaw);

  const hasNegativeInput =
    rawBase < 0 || rawTip < 0 || rawExtra < 0 || rawPeople < 0;

  const baseAmount = roundCurrency(Math.max(0, rawBase));
  const tipPercent = roundCurrency(Math.max(0, rawTip));
  const extraFee = roundCurrency(Math.max(0, rawExtra));

  const parsedPeopleInt = Math.floor(rawPeople);
  const peopleBlank = String(peopleCountRaw ?? "").trim() === "";
  const peopleCount = peopleBlank
    ? 1
    : Math.min(100, Math.max(1, Number.isFinite(parsedPeopleInt) ? parsedPeopleInt : 1));
  const wasPeopleClamped =
    !peopleBlank && (rawPeople < 1 || rawPeople > 100 || !Number.isInteger(rawPeople));

  const tipAmount = roundCurrency(baseAmount * (tipPercent / 100));
  const grandTotal = roundCurrency(baseAmount + tipAmount + extraFee);
  const perPersonShare = roundCurrency(grandTotal / peopleCount);
  const roundingDifference = roundCurrency(perPersonShare * peopleCount - grandTotal);

  return {
    baseAmount,
    tipPercent,
    tipAmount,
    extraFee,
    grandTotal,
    peopleCount,
    perPersonShare,
    roundingDifference,
    wasPeopleClamped,
    hasNegativeInput,
  };
}

export function formatBillSplitShareSlip(
  title,
  splitResult,
  currency = "USD",
  locale = undefined
) {
  const cleanTitle = String(title || "").trim() || "Shared Bill";
  const fmt = (val) => formatMoney(val, currency, locale);
  const lines = [
    `Bill Split: ${cleanTitle}`,
    `Base Amount: ${fmt(splitResult.baseAmount)}`,
  ];
  if (splitResult.tipAmount > 0) {
    lines.push(`Tip (${splitResult.tipPercent}%): ${fmt(splitResult.tipAmount)}`);
  }
  if (splitResult.extraFee > 0) {
    lines.push(`Extra Fee / Tax: ${fmt(splitResult.extraFee)}`);
  }
  lines.push(`Grand Total: ${fmt(splitResult.grandTotal)}`);
  lines.push(
    `Split Between: ${splitResult.peopleCount} ${
      splitResult.peopleCount === 1 ? "person" : "people"
    }`
  );
  lines.push(`Each Person Pays: ${fmt(splitResult.perPersonShare)}`);
  return lines.join("\n");
}

export function calculateSavingsGoalPlan(
  targetAmountRaw,
  savedAmountRaw = "0",
  monthlyContributionRaw = "0",
  targetMonthsRaw = ""
) {
  const rawTarget = parseAmount(targetAmountRaw);
  const rawSaved = parseAmount(savedAmountRaw);
  const rawMonthly = parseAmount(monthlyContributionRaw);
  const rawMonths = parseAmount(targetMonthsRaw);

  const hasNegativeInput =
    rawTarget < 0 || rawSaved < 0 || rawMonthly < 0 || rawMonths < 0;

  const targetAmount = roundCurrency(Math.max(0, rawTarget));
  const savedAmount = roundCurrency(Math.max(0, rawSaved));
  const monthlyContribution = roundCurrency(Math.max(0, rawMonthly));
  const hasDeadline = String(targetMonthsRaw ?? "").trim() !== "" && rawMonths > 0;
  const targetMonths = hasDeadline ? Math.max(1, Math.round(rawMonths)) : null;

  const remainingAmount = roundCurrency(Math.max(0, targetAmount - savedAmount));
  const progressPercent =
    targetAmount > 0
      ? roundCurrency(Math.min(100, (savedAmount / targetAmount) * 100))
      : 0;

  const monthsAtCurrentPace =
    remainingAmount <= 0
      ? 0
      : monthlyContribution > 0
      ? Math.ceil(remainingAmount / monthlyContribution)
      : null;

  let requiredMonthlyContribution = null;
  let monthlyShortfall = 0;
  let paceStatus = remainingAmount <= 0 && targetAmount > 0 ? "completed" : "no-deadline";

  if (targetMonths !== null) {
    requiredMonthlyContribution =
      remainingAmount <= 0 ? 0 : roundCurrency(remainingAmount / targetMonths);
    monthlyShortfall = roundCurrency(
      Math.max(0, requiredMonthlyContribution - monthlyContribution)
    );
    if (remainingAmount <= 0 && targetAmount > 0) {
      paceStatus = "completed";
    } else if (monthlyContribution <= 0) {
      paceStatus = "behind";
    } else if (monthlyContribution >= requiredMonthlyContribution * 1.1) {
      paceStatus = "ahead";
    } else if (monthlyContribution >= requiredMonthlyContribution * 0.9) {
      paceStatus = "on-track";
    } else {
      paceStatus = "behind";
    }
  }

  let nextMilestonePercent = null;
  if (targetAmount > 0 && progressPercent < 100) {
    if (progressPercent < 25) nextMilestonePercent = 25;
    else if (progressPercent < 50) nextMilestonePercent = 50;
    else if (progressPercent < 75) nextMilestonePercent = 75;
    else nextMilestonePercent = 100;
  }

  const amountToNextMilestone =
    nextMilestonePercent !== null
      ? roundCurrency(
          Math.max(0, (targetAmount * nextMilestonePercent) / 100 - savedAmount)
        )
      : 0;

  return {
    targetAmount,
    savedAmount,
    remainingAmount,
    progressPercent,
    monthlyContribution,
    targetMonths,
    monthsAtCurrentPace,
    requiredMonthlyContribution,
    monthlyShortfall,
    paceStatus,
    nextMilestonePercent,
    amountToNextMilestone,
    hasNegativeInput,
  };
}

export function calculateCashFlowForecast({
  startingBalanceRaw = "0",
  paycheckAmountRaw = "0",
  incomeCadence = "bi-weekly",
  daysUntilNextPaydayRaw = "10",
  safetyFloorRaw = "200",
  dailyExpenseRaw = "0",
  horizonDaysRaw = "30",
  bills = [],
} = {}) {
  const rawStart = parseAmount(startingBalanceRaw);
  const rawPaycheck = parseAmount(paycheckAmountRaw);
  const rawNextPay = parseAmount(daysUntilNextPaydayRaw);
  const rawFloor = parseAmount(safetyFloorRaw);
  const rawDaily = parseAmount(dailyExpenseRaw);
  const rawHorizon = parseAmount(horizonDaysRaw);

  const hasNegativeInput =
    rawStart < 0 ||
    rawPaycheck < 0 ||
    rawNextPay < 0 ||
    rawFloor < 0 ||
    rawDaily < 0 ||
    bills.some(
      (b) => parseAmount(b?.amount) < 0 || parseAmount(b?.dueInDays) < 0
    );

  const startingBalance = roundCurrency(rawStart);
  const paycheckAmount = roundCurrency(Math.max(0, rawPaycheck));
  const safetyFloor = roundCurrency(Math.max(0, rawFloor));
  const dailyExpense = roundCurrency(Math.max(0, rawDaily));
  const horizonDays = Math.min(
    90,
    Math.max(7, Math.floor(rawHorizon > 0 ? rawHorizon : 30))
  );
  const daysUntilNextPayday = Math.min(
    horizonDays,
    Math.max(1, Math.floor(rawNextPay > 0 ? rawNextPay : 14))
  );

  const cadenceEntry =
    INCOME_CADENCES.find((c) => c.value === incomeCadence) || INCOME_CADENCES[0];
  const periodDays = cadenceEntry.periodDays;

  const incomeByDay = new Array(horizonDays).fill(0);
  if (paycheckAmount > 0) {
    for (let d = daysUntilNextPayday; d < horizonDays; d += periodDays) {
      if (d >= 1) incomeByDay[d] += paycheckAmount;
    }
  }

  const billsByDay = Array.from({ length: horizonDays }, () => []);
  let totalProjectedBills = 0;
  for (const bill of bills) {
    const amt = roundCurrency(Math.max(0, parseAmount(bill?.amount)));
    if (amt <= 0) continue;
    const rawDue = Math.floor(Math.max(0, parseAmount(bill?.dueInDays)));
    if (rawDue >= horizonDays) continue;
    billsByDay[rawDue].push({
      name: String(bill?.name || "").trim() || "Bill",
      amount: amt,
    });
    totalProjectedBills += amt;
  }
  totalProjectedBills = roundCurrency(totalProjectedBills);

  let running = startingBalance;
  let lowestBalance = startingBalance;
  let lowestBalanceDay = 1;
  let lowestBeforePayday = startingBalance;
  let isCrunchDetected = false;
  let isOverdraftDetected = false;
  let maxDeficit = 0;
  let dangerZoneDaysCount = 0;
  let triggerBillTitle = null;

  for (let day = 0; day < horizonDays; day++) {
    const dayBills = billsByDay[day].reduce((s, b) => s + b.amount, 0);
    running = roundCurrency(running + incomeByDay[day] - dayBills - dailyExpense);

    if (running < lowestBalance) {
      lowestBalance = running;
      lowestBalanceDay = day + 1;
    }
    if (day < daysUntilNextPayday && running < lowestBeforePayday) {
      lowestBeforePayday = running;
    }
    if (running < 0) isOverdraftDetected = true;
    if (running < safetyFloor) {
      isCrunchDetected = true;
      dangerZoneDaysCount += 1;
      const deficit = roundCurrency(safetyFloor - running);
      if (deficit > maxDeficit) maxDeficit = deficit;
      if (!triggerBillTitle) {
        triggerBillTitle =
          billsByDay[day][0]?.name ||
          (dailyExpense > 0 ? "Daily Expenses" : "Safety Floor");
      }
    }
  }

  let runwayBalance = startingBalance;
  let runwayDaysWithoutIncome = startingBalance <= 0 ? 0 : horizonDays;
  if (startingBalance > 0) {
    for (let day = 0; day < horizonDays; day++) {
      const dayOutflow =
        billsByDay[day].reduce((s, b) => s + b.amount, 0) + dailyExpense;
      runwayBalance = roundCurrency(runwayBalance - dayOutflow);
      if (runwayBalance <= 0) {
        runwayDaysWithoutIncome = day + 1;
        break;
      }
    }
  }

  const totalProjectedIncome = roundCurrency(
    incomeByDay.reduce((s, v) => s + v, 0)
  );
  const totalDailyBurn = roundCurrency(dailyExpense * horizonDays);
  const discretionaryBuffer = Math.max(0, lowestBeforePayday - safetyFloor);
  const safeToSpendPerDay = roundCurrency(
    discretionaryBuffer / Math.max(1, daysUntilNextPayday)
  );

  return {
    horizonDays,
    startingBalance,
    endingBalance: running,
    lowestBalance,
    lowestBalanceDay,
    lowestBeforePayday,
    safetyFloor,
    isCrunchDetected,
    isOverdraftDetected,
    crunchDeficit: maxDeficit,
    dangerZoneDaysCount,
    triggerBillTitle,
    safeToSpendPerDay,
    runwayDaysWithoutIncome,
    totalProjectedIncome,
    totalProjectedBills,
    totalDailyBurn,
    hasNegativeInput,
  };
}

export function calculateMonthlyExpenses(items = [], monthlyIncomeRaw = "") {
  const rawBreakdown = items.map((item, idx) => {
    const rawAmt = parseAmount(item?.amount);
    const amount = roundCurrency(Math.max(0, rawAmt));
    const freq = String(item?.frequency || "monthly").trim().toLowerCase();
    let annual = amount * 12;
    if (freq === "daily") annual = amount * 365;
    else if (freq === "weekly") annual = amount * 52;
    else if (freq === "bi-weekly" || freq === "biweekly") annual = amount * 26;
    else if (freq === "quarterly") annual = amount * 4;
    else if (freq === "yearly" || freq === "annually") annual = amount * 1;

    const annualTotal = roundCurrency(annual);
    const monthlyEquivalent = roundCurrency(annual / 12);
    return {
      name: String(item?.name || "").trim() || `Category ${idx + 1}`,
      frequency: freq,
      amount,
      monthlyEquivalent,
      annualTotal,
    };
  });

  const annualSum = rawBreakdown.reduce((s, x) => s + x.annualTotal, 0);
  const annualTotal = roundCurrency(annualSum);
  const monthlyTotal = roundCurrency(annualSum / 12);
  const dailyAverage = roundCurrency(annualSum / 365);

  const breakdown = rawBreakdown.map((x) => ({
    ...x,
    sharePercent:
      monthlyTotal > 0 ? roundCurrency((x.monthlyEquivalent / monthlyTotal) * 100) : 0,
  }));

  const topItem = [...breakdown]
    .filter((x) => x.monthlyEquivalent > 0)
    .sort((a, b) => b.monthlyEquivalent - a.monthlyEquivalent)[0];

  const hasIncome = String(monthlyIncomeRaw ?? "").trim() !== "";
  const monthlyIncome = roundCurrency(parseAmount(monthlyIncomeRaw));
  const remainingAfterExpenses = hasIncome
    ? roundCurrency(monthlyIncome - monthlyTotal)
    : null;
  const incomeSharePercent =
    hasIncome && monthlyIncome > 0
      ? roundCurrency((monthlyTotal / monthlyIncome) * 100)
      : null;

  const hasNegativeInput =
    (hasIncome && monthlyIncome < 0) ||
    items.some((item) => parseAmount(item?.amount) < 0);

  return {
    breakdown,
    monthlyTotal,
    annualTotal,
    dailyAverage,
    topCategoryName: topItem ? topItem.name : null,
    monthlyIncome: hasIncome ? monthlyIncome : null,
    remainingAfterExpenses,
    incomeSharePercent,
    hasNegativeInput,
  };
}
