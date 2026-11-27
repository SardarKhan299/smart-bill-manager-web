export const SUPPORTED_CURRENCIES: string[];

export const SUBSCRIPTION_FREQUENCIES: Array<{
  value: string;
  label: string;
  annualMultiplier: number;
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
