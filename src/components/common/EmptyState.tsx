import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No products found',
  description = 'Try adjusting your search query or selecting another category filter to explore 1Fi Marketplace offerings.',
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200/80 max-w-md mx-auto my-8">
      <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
      {onReset && (
        <PrimaryButton
          variant="outline"
          size="sm"
          onClick={onReset}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Reset Filters
        </PrimaryButton>
      )}
    </div>
  );
};
