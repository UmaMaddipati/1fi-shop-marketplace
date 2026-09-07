import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between animate-pulse">
      <div>
        <div className="w-full h-48 bg-slate-100 rounded-xl mb-3.5" />
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
        <div className="h-5 bg-slate-200 rounded w-4/5 mb-3" />
        <div className="h-4 bg-slate-100 rounded w-2/3 mb-4" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-1/2">
          <div className="h-5 bg-slate-200 rounded w-3/4 mb-1" />
          <div className="h-4 bg-slate-100 rounded w-1/2" />
        </div>
        <div className="h-8 w-20 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse max-w-7xl mx-auto w-full">
      <div className="h-9 bg-slate-200 rounded-xl w-44 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 h-96 bg-slate-200/70 rounded-2xl" />
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-24" />
            <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-4 bg-slate-200/60 rounded w-1/2" />
          </div>
          <div className="h-24 bg-slate-200/60 rounded-2xl" />
          <div className="h-28 bg-slate-200/60 rounded-2xl" />
          <div className="h-64 bg-slate-200/60 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};
