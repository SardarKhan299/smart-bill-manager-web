export const SUPPORTED_CURRENCIES: string[];

export const SUBSCRIPTION_FREQUENCIES: Array<{
  value: string;
  label: string;
  annualMultiplier: number;
}>;

export const EXPENSE_FREQUENCIES: Array<{
  value: string;
  label: string;
  annualMultiplier: number;
}>;

export const INCOME_CADENCES: Array<{
  value: string;
  label: string;
  periodDays: number;
}>;

export function parseAmount(raw: string | number | null | undefined): number;
export function roundCurrency(value: number): number;
export function formatMoney(value: number, currency?: string, locale?: string): string;

export function calculateBillSummary(
  incomeRaw: string | number,
  bills: Array<{ name?: string; amount?: string | number }>
): {
  income: number;
  totalBills: number;
  remaining: number;
  shortfall: number;
  hasNegativeInput: boolean;
};

export function calculateBudgetSummary(
  incomeRaw: string | number,
  items: Array<{ name?: string; amount?: string | number }>
): {
  income: number;
  plannedSpending: number;
  unallocated: number;
  shortfall: number;
  allocationPercent: number;
  hasNegativeInput: boolean;
};

export function calculateSafeToSpend(
  balanceRaw: string | number,
  committedRaw: string | number,
  plannedRaw: string | number
): {
  balance: number;
  committed: number;
  planned: number;
  rawAvailable: number;
  safeToSpend: number;
  shortfall: number;
  hasNegativeInput: boolean;
};

export function calculateSubscriptionCosts(
  amountRaw: string | number,
  frequency?: string
): {
  amount: number;
  annualCost: number;
  monthlyEquivalent: number;
};

export function calculateSubscriptionSummary(
  subscriptions: Array<{ name?: string; amount?: string | number; frequency?: string }>,
  monthlyIncomeRaw?: string | number
): {
  breakdown: Array<{
    name: string;
    frequency: string;
    amount: number;
    annualCost: number;
    monthlyEquivalent: number;
  }>;
  monthlyTotal: number;
  annualTotal: number;
  fiveYearTotal: number;
  monthlyIncome: number | null;
  remainingAfterSubscriptions: number | null;
  incomeSharePercent: number | null;
  hasNegativeInput: boolean;
};

export interface DebtPayoffRowResult {
  name: string;
  balance: number;
  apr: number;
  minimumPayment: number;
  usedEstimatedMinimum: boolean;
  monthsToPayoff: number;
  totalInterestPaid: number;
  remainingUnpaid: number;
}

export function calculateDebtPayoffPlan(
  debts: Array<{
    name?: string;
    balance?: string | number;
    interestRate?: string | number;
    minimumPayment?: string | number;
  }>,
  extraMonthlyPaymentRaw?: string | number,
  strategy?: "snowball" | "avalanche" | string
): {
  strategy: "snowball" | "avalanche";
  totalDebt: number;
  totalMinimumRequired: number;
  extraMonthlyPayment: number;
  monthlyPaymentBudget: number;
  totalMonths: number;
  totalInterestPaid: number;
  firstDebtPaidMonths: number;
  cappedAtMaxMonths: boolean;
  unpayableWarning: boolean;
  hasNegativeInput: boolean;
  usedEstimatedMinimum: boolean;
  orderedDebts: DebtPayoffRowResult[];
  comparison: {
    snowballTotalMonths: number;
    snowballTotalInterest: number;
    snowballFirstDebtMonths: number;
    avalancheTotalMonths: number;
    avalancheTotalInterest: number;
    avalancheFirstDebtMonths: number;
    interestSavedWithAvalanche: number;
    monthsSavedWithAvalanche: number;
    fasterFirstWinMonthsWithSnowball: number;
  };
};

export interface BillSplitResult {
  baseAmount: number;
  tipPercent: number;
  tipAmount: number;
  extraFee: number;
  grandTotal: number;
  peopleCount: number;
  perPersonShare: number;
  roundingDifference: number;
  wasPeopleClamped: boolean;
  hasNegativeInput: boolean;
}

export function calculateBillSplit(
  baseAmountRaw: string | number,
  tipPercentRaw?: string | number,
  extraFeeRaw?: string | number,
  peopleCountRaw?: string | number
): BillSplitResult;

export function formatBillSplitShareSlip(
  title: string,
  splitResult: BillSplitResult,
  currency?: string,
  locale?: string
): string;

export function calculateSavingsGoalPlan(
  targetAmountRaw: string | number,
  savedAmountRaw?: string | number,
  monthlyContributionRaw?: string | number,
  targetMonthsRaw?: string | number
): {
  targetAmount: number;
  savedAmount: number;
  remainingAmount: number;
  progressPercent: number;
  monthlyContribution: number;
  targetMonths: number | null;
  monthsAtCurrentPace: number | null;
  requiredMonthlyContribution: number | null;
  monthlyShortfall: number;
  paceStatus: "completed" | "ahead" | "on-track" | "behind" | "no-deadline";
  nextMilestonePercent: number | null;
  amountToNextMilestone: number;
  hasNegativeInput: boolean;
};

export function calculateCashFlowForecast(params: {
  startingBalanceRaw?: string | number;
  paycheckAmountRaw?: string | number;
  incomeCadence?: string;
  daysUntilNextPaydayRaw?: string | number;
  safetyFloorRaw?: string | number;
  dailyExpenseRaw?: string | number;
  horizonDaysRaw?: string | number;
  bills?: Array<{
    name?: string;
    amount?: string | number;
    dueInDays?: string | number;
  }>;
}): {
  horizonDays: number;
  startingBalance: number;
  endingBalance: number;
  lowestBalance: number;
  lowestBalanceDay: number;
  lowestBeforePayday: number;
  safetyFloor: number;
  isCrunchDetected: boolean;
  isOverdraftDetected: boolean;
  crunchDeficit: number;
  dangerZoneDaysCount: number;
  triggerBillTitle: string | null;
  safeToSpendPerDay: number;
  runwayDaysWithoutIncome: number;
  totalProjectedIncome: number;
  totalProjectedBills: number;
  totalDailyBurn: number;
  hasNegativeInput: boolean;
};

export function calculateMonthlyExpenses(
  items: Array<{
    name?: string;
    amount?: string | number;
    frequency?: string;
  }>,
  monthlyIncomeRaw?: string | number
): {
  breakdown: Array<{
    name: string;
    frequency: string;
    amount: number;
    monthlyEquivalent: number;
    annualTotal: number;
    sharePercent: number;
  }>;
  monthlyTotal: number;
  annualTotal: number;
  dailyAverage: number;
  topCategoryName: string | null;
  monthlyIncome: number | null;
  remainingAfterExpenses: number | null;
  incomeSharePercent: number | null;
  hasNegativeInput: boolean;
};
