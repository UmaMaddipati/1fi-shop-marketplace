import React, { useState } from 'react';
import { Product } from '../../types/product';
import { formatINR } from '../../utils/currency';
import { getFeaturedEMI } from '../../utils/emiCalculator';
import { Badge } from '../common/Badge';
import { ArrowUpRight, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const featuredEMI = getFeaturedEMI(product, product.basePrice);
  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800';

  return (
    <div
      onClick={() => onSelect(product)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer p-4 relative"
      id={`product-card-${product.id}`}
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {product.brand}
        </span>
        <div className="flex items-center gap-1.5">
          {product.badge && (
            <Badge variant="emerald" size="sm">
              <Zap className="w-2.5 h-2.5 fill-emerald-700" />
              {product.badge}
            </Badge>
          )}
        </div>
      </div>

      {/* Product Image Stage */}
      <div className="relative w-full h-44 sm:h-48 mb-4 bg-slate-50/70 rounded-xl overflow-hidden flex items-center justify-center p-3 group-hover:bg-slate-100/60 transition-colors">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        )}
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600' : primaryImage}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          referrerPolicy="no-referrer"
          className={`max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Title and Tagline */}
      <div className="mb-3">
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
          {product.tagline}
        </p>
      </div>

      {/* Pricing and EMI Strip */}
      <div className="pt-3 border-t border-slate-100/90 flex flex-col gap-2">
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-slate-900">
              {formatINR(product.basePrice)}
            </span>
            {product.mrp > product.basePrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
            0 Downpayment
          </span>
        </div>

        {/* Highlighted Monthly EMI Banner */}
        <div className="flex items-center justify-between bg-slate-50 hover:bg-emerald-50/50 p-2.5 rounded-xl border border-slate-200/70 group-hover:border-emerald-200 transition-colors">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-emerald-700">
                {formatINR(featuredEMI.monthly)}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">/mo</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              for {featuredEMI.tenure} months {featuredEMI.isNoCost ? '(0% interest)' : ''}
            </p>
          </div>

          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-emerald-600 group-hover:border-emerald-300 transition-all shadow-2xs">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
