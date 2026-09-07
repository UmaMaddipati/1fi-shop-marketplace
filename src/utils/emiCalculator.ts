import { Product, EMIPlan } from '../types/product';

/**
 * Standard Equated Monthly Installment (EMI) calculation formula
 * @param principal Loan amount (Product cost after variant adjustment)
 * @param annualRatePct Annual interest rate in percent (e.g. 14 for 14%)
 * @param tenureMonths Loan tenure in months
 */
export function calculateMonthlyEMI(
  principal: number,
  annualRatePct: number,
  tenureMonths: number
): number {
  if (tenureMonths <= 0) return principal;
  
  if (annualRatePct <= 0) {
    return Math.round(principal / tenureMonths);
  }

  const monthlyRate = (annualRatePct / 12) / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

/**
 * Generates an array of structured EMI plans for a product at a given purchase price
 */
export function generateEMIPlans(product: Product, principal: number): EMIPlan[] {
  return product.availableTenures.map((tenure) => {
    const isNoCost = product.noCostTenures.includes(tenure);
    const rate = isNoCost ? 0 : product.annualInterestRate;
    const monthlyAmount = calculateMonthlyEMI(principal, rate, tenure);
    const totalAmount = monthlyAmount * tenure;
    const totalInterest = Math.max(0, totalAmount - principal);

    let mutualFundNote = '';
    if (isNoCost) {
      mutualFundNote = `0% Interest: Zero interest charged while your Mutual Funds stay invested.`;
    } else {
      mutualFundNote = `Extended tenure flexibility: Avoid liquidating funds and preserve market compounding.`;
    }

    return {
      tenureMonths: tenure,
      monthlyAmount,
      isNoCost,
      interestRate: rate,
      totalInterest,
      totalAmount,
      processingFee: product.processingFee,
      downpayment: 0, // 1Fi Zero Downpayment
      cashbackBonus: product.cashback && isNoCost ? Math.round(product.cashback / (tenure > 6 ? 2 : 1)) : undefined,
      mutualFundAdvantageNote: mutualFundNote,
    };
  });
}

/**
 * Computes the highlight EMI figure to display on cards (prefers longest No-Cost EMI or longest tenure)
 */
export function getFeaturedEMI(product: Product, principal: number): {
  monthly: number;
  tenure: number;
  isNoCost: boolean;
} {
  // Try to pick the best no-cost tenure first (usually 6 or 12 months)
  const noCostTenures = product.noCostTenures.filter(t => product.availableTenures.includes(t));
  if (noCostTenures.length > 0) {
    const maxNoCost = Math.max(...noCostTenures);
    return {
      monthly: Math.round(principal / maxNoCost),
      tenure: maxNoCost,
      isNoCost: true,
    };
  }

  // Fallback to highest available tenure
  const maxTenure = Math.max(...product.availableTenures);
  const rate = product.annualInterestRate;
  return {
    monthly: calculateMonthlyEMI(principal, rate, maxTenure),
    tenure: maxTenure,
    isNoCost: false,
  };
}
