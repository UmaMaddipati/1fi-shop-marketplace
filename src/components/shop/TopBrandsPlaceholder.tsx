import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../common/PrimaryButton';

interface PlaceholderProps {
  onGoToMarketplace: () => void;
}

export const TopBrandsPlaceholder: React.FC<PlaceholderProps> = ({ onGoToMarketplace }) => {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="w-16 h-16 bg-slate-100 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Award className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Top Brands Direct</h2>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Direct brand partner storefronts are currently in development. Explore the full curated electronics catalogue in the 1Fi Marketplace.
      </p>
      <PrimaryButton
        variant="primary"
        size="md"
        onClick={onGoToMarketplace}
        icon={<ArrowRight className="w-4 h-4" />}
      >
        Explore 1Fi Marketplace
      </PrimaryButton>
    </div>
  );
};
