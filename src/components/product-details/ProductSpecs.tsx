import React from 'react';
import { Product } from '../../types/product';
import { CheckCircle2, Shield, Zap, Lock } from 'lucide-react';

interface ProductSpecsProps {
  product: Product;
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
  return (
    <div className="space-y-6 pt-6 border-t border-slate-200">
      {/* 1Fi Trust / Fintech Promises */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Funds Remain Invested</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Units remain in your demat account earning compounding returns.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">No CIBIL Impact</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Backed by your mutual funds, no traditional credit score inquiry needed.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">100% Genuine</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
              Brand new with original manufacturer warranty & doorstep delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      {product.highlights && product.highlights.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Product Highlights
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {product.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technical Specifications */}
      {product.specs && product.specs.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Technical Specifications
          </h3>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden text-xs">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="flex py-2.5 px-3.5 gap-2">
                <span className="w-1/3 text-slate-500 font-medium shrink-0">{spec.label}</span>
                <span className="w-2/3 text-slate-800 font-semibold break-words min-w-0">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
