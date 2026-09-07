import React, { useState, useEffect } from 'react';
import { ShopTab, Product } from '../types/product';
import { Header } from '../components/layout/Header';
import { ShopNavTabs } from '../components/shop/ShopNavTabs';
import { TopBrandsPlaceholder } from '../components/shop/TopBrandsPlaceholder';
import { NearbyStoresPlaceholder } from '../components/shop/NearbyStoresPlaceholder';
import { MarketplaceScreen } from './MarketplaceScreen';
import { ProductDetailsScreen } from './ProductDetailsScreen';
import { X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { PrimaryButton } from '../components/common/PrimaryButton';

export const ShopScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShopTab>('marketplace');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Synchronize browser back/forward buttons with product view
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#product-')) {
        const id = hash.replace('#product-', '');
        setSelectedProductId(id);
      } else {
        setSelectedProductId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check if opened directly with a hash
    const initialHash = window.location.hash;
    if (initialHash && initialHash.startsWith('#product-')) {
      setSelectedProductId(initialHash.replace('#product-', ''));
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Escape key dismissal for Info modal
  useEffect(() => {
    if (!isInfoModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsInfoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInfoModalOpen]);

  // When a tab is selected, clear any active product view
  const handleSelectTab = (tab: ShopTab) => {
    setActiveTab(tab);
    setSelectedProductId(null);
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductId(product.id);
    window.location.hash = `product-${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMarketplace = () => {
    setSelectedProductId(null);
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1Fi Top Navigation Header */}
      <Header onOpenInfo={() => setIsInfoModalOpen(true)} />

      {/* Shop Three-Option Navigation Bar */}
      <ShopNavTabs
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {selectedProductId ? (
          // Product Details Screen (Fetched via ID with loading skeleton)
          <ProductDetailsScreen
            productId={selectedProductId}
            onBack={handleBackToMarketplace}
          />
        ) : (
          // Tab Content
          <>
            {activeTab === 'top-brands' && (
              <TopBrandsPlaceholder
                onGoToMarketplace={() => setActiveTab('marketplace')}
              />
            )}

            {activeTab === 'nearby-stores' && (
              <NearbyStoresPlaceholder
                onGoToMarketplace={() => setActiveTab('marketplace')}
              />
            )}

            {activeTab === 'marketplace' && (
              <MarketplaceScreen onSelectProduct={handleSelectProduct} />
            )}
          </>
        )}
      </main>

      {/* Footer / Fintech Disclaimer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-4 text-center mt-auto">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>1Fi Shop & Marketplace • SDE Intern Frontend Implementation</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl mx-auto">
            1Fi empowers consumers to purchase flagship electronics using mutual fund collateral without liquidating investments. All values, products, and calculations represent an independent prototype implementation conforming to the assignment brief.
          </p>
        </div>
      </footer>

      {/* Project & Assignment Info Modal */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-modal-title"
          >
            <button
              onClick={() => setIsInfoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100"
              aria-label="Close information modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                1Fi
              </div>
              <h3 id="info-modal-title" className="text-lg font-bold text-slate-900">
                1Fi Marketplace Assignment Overview
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                This application is an independent frontend implementation designed for the <strong>1Fi SDE Intern Assignment</strong>.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800">Shop Navigation Requirements:</div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1. Top Brands (Placeholder state as specified)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. Nearby Stores (Placeholder state as specified)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3. 1Fi Marketplace (Fully designed & interactive)</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-1.5">
                <div className="font-bold text-emerald-950">Engineering Highlights:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Decoupled data & service layer with simulated async latency</li>
                  <li>Pure functional EMI calculator utility (No-Cost & standard tenures)</li>
                  <li>Dynamic variants (storage & colors) with reactive pricing</li>
                  <li>Loading skeletons, empty states, and interactive error test toggle</li>
                  <li>Complete user flow: Shop → Marketplace → Details → Select Plan → Confirmation</li>
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <PrimaryButton
                fullWidth
                variant="primary"
                onClick={() => setIsInfoModalOpen(false)}
              >
                Continue Exploring
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
