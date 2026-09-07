import React from 'react';
import { ProductCategory } from '../../types/product';

interface CategoryChipProps {
  id: ProductCategory;
  label: string;
  count?: number;
  isSelected: boolean;
  onSelect: (id: ProductCategory) => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  id,
  label,
  count,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
        isSelected
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            isSelected ? 'bg-emerald-700/50 text-emerald-100' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
