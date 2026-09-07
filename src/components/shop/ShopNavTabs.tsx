import React from 'react';
import { ShopTab } from '../../types/product';
import { Award, MapPin, ShoppingBag, Sparkles } from 'lucide-react';

interface ShopNavTabsProps {
  activeTab: ShopTab;
  onSelectTab: (tab: ShopTab) => void;
}

export const ShopNavTabs: React.FC<ShopNavTabsProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs: { id: ShopTab; label: string; icon: React.ReactNode; isFeatured?: boolean }[] = [
    {
      id: 'top-brands',
      label: 'Top Brands',
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 'nearby-stores',
      label: 'Nearby Stores',
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: 'marketplace',
      label: '1Fi Marketplace',
      icon: <ShoppingBag className="w-4 h-4" />,
      isFeatured: true,
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          role="tablist"
          aria-label="Shop options"
          className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                role="tab"
                aria-selected={isActive}
                id={`shop-tab-${tab.id}`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {tab.isFeatured && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
