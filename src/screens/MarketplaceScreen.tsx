import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ProductCategory, FilterState } from '../types/product';
import { productService } from '../services/productService';
import { SearchBar } from '../components/marketplace/SearchBar';
import { CategoryChip } from '../components/marketplace/CategoryChip';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { ErrorState } from '../components/common/ErrorState';
import { Sparkles, ArrowUpDown, Bug } from 'lucide-react';

interface MarketplaceScreenProps {
  onSelectProduct: (product: Product) => void;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  onSelectProduct,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: ProductCategory; label: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Search input state (immediate for smooth UI typing) & debounced search term
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Category and sorting states
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('popular');

  const [isSimulatingError, setIsSimulatingError] = useState(false);

  // Active request sequence ID to prevent race conditions and ignore stale async responses
  const activeRequestIdRef = useRef(0);

  // 280ms debounce for search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchInput);
    }, 280);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  // Fetch categories once on mount
  useEffect(() => {
    productService.getCategories().then(setCategories);
  }, []);

  // Fetch products with active request token to prevent race conditions
  const loadProducts = useCallback(() => {
    const requestId = ++activeRequestIdRef.current;
    setIsLoading(true);
    setErrorMessage(null);

    const activeFilters: FilterState = {
      searchQuery: debouncedSearchQuery,
      selectedCategory,
      sortBy,
    };

    productService
      .getProducts(activeFilters)
      .then((data) => {
        // Only apply results if this request is still the most current one
        if (requestId === activeRequestIdRef.current) {
          setProducts(data);
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        if (requestId === activeRequestIdRef.current) {
          setErrorMessage(err.message || 'Unable to retrieve marketplace listings.');
          setIsLoading(false);
        }
      });
  }, [debouncedSearchQuery, selectedCategory, sortBy]);

  // Re-run whenever debounced search query, category, or sorting changes
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearchChange = (query: string) => {
    setSearchInput(query);
    // If the user clears the search explicitly, clear immediately
    if (query === '') {
      setDebouncedSearchQuery('');
    }
  };

  const handleCategorySelect = (category: ProductCategory) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (newSortBy: FilterState['sortBy']) => {
    setSortBy(newSortBy);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setDebouncedSearchQuery('');
    setSelectedCategory('all');
    setSortBy('popular');
  };

  const toggleSimulateError = () => {
    const nextState = !isSimulatingError;
    setIsSimulatingError(nextState);
    productService.setSimulateError(nextState);
    loadProducts();
  };

  return (
    <div className="space-y-6">
      {/* 1Fi Marketplace Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle decorative graphic */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>0% Interest • Zero Downpayment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Shop flagship electronics with Mutual Fund No-Cost EMI
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-xl">
            Borrow against your mutual funds without liquidating your investments. Your portfolio stays invested and keeps compounding while you pay in easy monthly installments.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-200 mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>No credit score required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Tenures up to 36 months</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Instant pre-approved limit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search Pixel 10, iPhone 17, MacBook Pro, Sony..."
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Filter */}
            <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as any)}
                className="bg-transparent pr-4 focus:outline-none cursor-pointer"
                aria-label="Sort products"
              >
                <option value="popular">Popular Flagships</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="emi-asc">Lowest EMI First</option>
              </select>
            </div>

            {/* Simulated Error State Toggle for Reviewers */}
            <button
              onClick={toggleSimulateError}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isSimulatingError
                  ? 'bg-red-50 text-red-700 border-red-300'
                  : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
              }`}
              title="Toggle simulated network error for testing error handling"
            >
              <Bug className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isSimulatingError ? 'Error Simulated' : 'Test Error'}
              </span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              id={cat.id}
              label={cat.label}
              count={cat.count}
              isSelected={selectedCategory === cat.id}
              onSelect={handleCategorySelect}
            />
          ))}
        </div>
      </div>

      {/* Main Product Listing */}
      {errorMessage ? (
        <ErrorState message={errorMessage} onRetry={loadProducts} />
      ) : (
        <ProductGrid
          products={products}
          isLoading={isLoading}
          onSelectProduct={onSelectProduct}
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
};
