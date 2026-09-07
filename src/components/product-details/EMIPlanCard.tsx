import React from 'react';
import { EMIPlan } from '../../types/product';
import { formatINR } from '../../utils/currency';
import { Check, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (plan: EMIPlan) => void;
}

export const EMIPlanCard: React.FC<EMIPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(plan)}
      tabIndex={0}
      role="radio"
      aria-checked={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(plan);
        }
      }}
      className={`relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        isSelected
          ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-xs'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
      }`}
    >
      {/* Selection pill */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-800">
            {plan.tenureMonths} Months
          </span>
          {plan.isNoCost ? (
            <Badge variant="emerald" size="sm">
              <Sparkles className="w-2.5 h-2.5" />
              0% EMI
            </Badge>
          ) : (
            <Badge variant="neutral" size="sm">
              {plan.interestRate}% p.a.
            </Badge>
          )}
        </div>

        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isSelected
              ? 'bg-emerald-600 text-white'
              : 'border border-slate-300 bg-white'
          }`}
        >
          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>

      {/* Monthly EMI Amount */}
      <div className="my-1">
        <div className="flex items-baseline gap-1">
          <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {formatINR(plan.monthlyAmount)}
          </span>
          <span className="text-xs text-slate-500 font-medium">/mo</span>
        </div>
      </div>

      {/* Financial breakdown */}
      <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          {plan.isNoCost ? (
            <span className="text-emerald-700 font-semibold">Total Interest: ₹0</span>
          ) : (
            <span>Total: {formatINR(plan.totalAmount)}</span>
          )}
        </span>
        <span className="text-slate-400">₹0 Down</span>
      </div>
    </div>
  );
};
