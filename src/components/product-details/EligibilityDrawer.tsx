import React, { useState, useEffect } from 'react';
import { Product, EMIPlan } from '../../types/product';
import { formatINR } from '../../utils/currency';
import { PrimaryButton } from '../common/PrimaryButton';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Building,
  Truck,
  Sparkles,
} from 'lucide-react';

interface EligibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedPlan: EMIPlan;
  selectedStorageLabel?: string;
  selectedColorName?: string;
  finalPrice: number;
  onPlanConfirmed?: () => void;
}

export const EligibilityDrawer: React.FC<EligibilityDrawerProps> = ({
  isOpen,
  onClose,
  product,
  selectedPlan,
  selectedStorageLabel,
  selectedColorName,
  finalPrice,
  onPlanConfirmed,
}) => {
  const [step, setStep] = useState<'review' | 'submitting' | 'confirmed'>('review');

  // Escape key listener for keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProceed = () => {
    setStep('submitting');
    setTimeout(() => {
      setStep('confirmed');
      if (onPlanConfirmed) onPlanConfirmed();
    }, 1000);
  };

  const handleReset = () => {
    setStep('review');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all duration-200 my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-heading"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              1Fi
            </div>
            <div>
              <h3 id="drawer-heading" className="font-bold text-slate-900 text-sm">
                {step === 'confirmed' ? 'Plan Confirmed' : 'Mutual Fund EMI Eligibility'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {step === 'confirmed' ? 'Instant approval received' : 'Review details & continue'}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {step === 'confirmed' ? (
            <div className="py-4 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">
                EMI Plan Confirmed!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your monthly plan of{' '}
                <strong className="text-emerald-700 font-bold">
                  {formatINR(selectedPlan.monthlyAmount)}/mo for {selectedPlan.tenureMonths} months
                </strong>{' '}
                has been selected with <strong className="text-slate-800">₹0 Downpayment</strong>.
              </p>

              <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl text-left text-xs space-y-1.5 mt-4">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Your Mutual Funds Continue Growing</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Pledged mutual fund units stay in your account earning market returns. Auto-debit will execute on the 5th of every month.
                </p>
              </div>

              <div className="pt-2">
                <PrimaryButton fullWidth variant="primary" onClick={handleReset}>
                  Back to Marketplace
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <>
              {/* Product & Variant Banner */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-contain bg-white rounded-lg p-1 border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{product.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    {selectedStorageLabel && <span>{selectedStorageLabel}</span>}
                    {selectedStorageLabel && selectedColorName && <span>•</span>}
                    {selectedColorName && <span>{selectedColorName}</span>}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {formatINR(finalPrice)}
                  </div>
                </div>
              </div>

              {/* Selected Plan Highlights */}
              <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Monthly Installment:</span>
                  <span className="text-base font-extrabold text-emerald-800">
                    {formatINR(selectedPlan.monthlyAmount)} / mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Tenure Duration:</span>
                  <span className="font-semibold">{selectedPlan.tenureMonths} Months</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Interest Rate:</span>
                  <span className="font-semibold text-emerald-700">
                    {selectedPlan.isNoCost ? '0% (No-Cost EMI)' : `${selectedPlan.interestRate}% p.a.`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Upfront Downpayment:</span>
                  <span className="font-semibold text-emerald-700">₹0 (Zero Downpayment)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-emerald-200/60">
                  <span>Processing Fee:</span>
                  <span className="font-semibold text-emerald-700">₹0 Free</span>
                </div>
              </div>

              {/* 1Fi Verification Checklist */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  1Fi Instant Pre-approval Checklist
                </span>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Mutual Fund Portfolio Linked</span>
                    <p className="text-[10px] text-slate-500">CAMS & KFintech verified • ₹2,50,000 credit limit active</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white text-xs">
                  <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Zero CIBIL Hard Inquiry</span>
                    <p className="text-[10px] text-slate-500">Collateral-backed loan creates zero negative score impact</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white text-xs">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Free Express Doorstep Delivery</span>
                    <p className="text-[10px] text-slate-500">Dispatched within 24 hours of plan confirmation</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <PrimaryButton
                  fullWidth
                  variant="primary"
                  size="lg"
                  isLoading={step === 'submitting'}
                  onClick={handleProceed}
                  icon={<ShieldCheck className="w-5 h-5" />}
                >
                  Confirm {selectedPlan.tenureMonths}M EMI Plan
                </PrimaryButton>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  By continuing, you agree to 1Fi loan terms. Demo prototype for assignment evaluation.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
