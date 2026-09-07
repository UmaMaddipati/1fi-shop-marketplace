import React from 'react';
import { ShieldCheck, Sparkles, TrendingUp, Info } from 'lucide-react';

interface HeaderProps {
  onOpenInfo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInfo }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-emerald-500/20">
              1Fi
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">1Fi</span>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                  Shop
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Shop with Mutual Fund No-Cost EMI</p>
            </div>
          </div>
        </div>

        {/* 1Fi Credit Limit Pill & Value Prop */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-slate-500">MF Credit Line:</span>
            <span className="font-bold text-slate-900">₹2,50,000</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded-full">Active</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-emerald-50/60 border border-emerald-200/50 px-2.5 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium text-emerald-950 hidden sm:inline">0 Downpayment</span>
            <span className="font-medium text-emerald-950 sm:hidden">0 Down</span>
          </div>

          {onOpenInfo && (
            <button
              onClick={onOpenInfo}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="1Fi Assignment & Product Context"
              aria-label="About this prototype"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
