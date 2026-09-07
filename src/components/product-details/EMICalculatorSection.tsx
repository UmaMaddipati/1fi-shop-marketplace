import React from 'react';
import { EMIPlan } from '../../types/product';
import { EMIPlanCard } from './EMIPlanCard';
import { formatINR } from '../../utils/currency';
import { ShieldCheck, TrendingUp, HelpCircle } from 'lucide-react';

interface EMICalculatorSectionProps {
  plans: EMIPlan[];
  selectedPlan: EMIPlan;
  onSelectPlan: (plan: EMIPlan) => void;
  principalAmount: number;
}

export const EMICalculatorSection: React.FC<EMICalculatorSectionProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  principalAmount,
}) => {
  return (
    <div className="space-y-4 pt-4 border-t border-slate-200">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Select 1Fi EMI Plan
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Borrow against mutual funds with zero liquidation
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero Downpayment</span>
        </div>
      </div>

      {/* Grid of EMI Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {plans.map((plan) => (
          <EMIPlanCard
            key={plan.tenureMonths}
            plan={plan}
            isSelected={selectedPlan.tenureMonths === plan.tenureMonths}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      {/* Selected Plan In-depth Financial Breakdown */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2.5 text-xs">
        <div className="flex items-center justify-between font-bold text-slate-800 pb-1.5 border-b border-slate-200/60">
          <span>Plan Breakdown ({selectedPlan.tenureMonths} Months)</span>
          <span className="text-emerald-700 font-extrabold">
            {formatINR(selectedPlan.monthlyAmount)} / month
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Device Cost</span>
            <span className="font-semibold text-slate-800">{formatINR(principalAmount)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Interest Rate</span>
            <span className="font-semibold text-slate-800">
              {selectedPlan.isNoCost ? '0% (No-Cost EMI)' : `${selectedPlan.interestRate}% p.a.`}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Processing Fee</span>
            <span className="font-semibold text-emerald-700">₹0 (Zero fee)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Total Repayment</span>
            <span className="font-semibold text-slate-800">
              {formatINR(selectedPlan.totalAmount)}
            </span>
          </div>
        </div>

        {/* 1Fi Compounding Value Prop */}
        <div className="bg-white p-2.5 rounded-lg border border-emerald-200/70 flex items-start gap-2 text-[11px] text-slate-700">
          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-slate-900">Why 1Fi? </strong>
            Rather than paying {formatINR(principalAmount)} upfront, keep your funds invested in mutual funds yielding ~12-14% p.a. while you pay in easy monthly installments.
          </p>
        </div>
      </div>
    </div>
  );
};
