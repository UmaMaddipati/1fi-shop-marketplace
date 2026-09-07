import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import { generateEMIPlans } from '../utils/emiCalculator';
import { formatINR, calculateDiscountPercentage } from '../utils/currency';
import { ProductGallery } from '../components/product-details/ProductGallery';
import { VariantSelector } from '../components/product-details/VariantSelector';
import { EMICalculatorSection } from '../components/product-details/EMICalculatorSection';
import { ProductSpecs } from '../components/product-details/ProductSpecs';
import { EligibilityDrawer } from '../components/product-details/EligibilityDrawer';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { Badge } from '../components/common/Badge';
import { ProductDetailsSkeleton } from '../components/common/SkeletonLoader';
import { ErrorState } from '../components/common/ErrorState';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ProductDetailsScreenProps {
  productId?: string;
  product?: Product;
  onBack: () => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  productId,
  product: initialProduct,
  onBack,
}) => {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialProduct && !!productId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronize / load product details asynchronously
  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setIsLoading(false);
      return;
    }

    if (!productId) return;

    let isMounted = true;
    setIsLoading(true);
    setErrorMessage(null);

    productService
      .getProductById(productId)
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setProduct(data);
        } else {
          setErrorMessage('Product not found in 1Fi catalogue.');
        }
      })
      .catch((err: any) => {
        if (!isMounted) return;
        setErrorMessage(err.message || 'Unable to retrieve product details.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId, initialProduct]);

  // Variant states
  const [selectedStorageId, setSelectedStorageId] = useState<string | undefined>(undefined);
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(undefined);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | undefined>(undefined);

  // Initialize variant defaults when product is loaded
  useEffect(() => {
    if (product) {
      const defaultStorage = product.variants.storage?.[0]?.id;
      const defaultColorOption = product.variants.colors?.[0];
      setSelectedStorageId(defaultStorage);
      setSelectedColorId(defaultColorOption?.id);
      setActiveGalleryIndex(
        typeof defaultColorOption?.imageIndex === 'number' ? defaultColorOption.imageIndex : 0
      );
    }
  }, [product]);

  // Handle color variant selection and automatically synchronize with product gallery
  const handleColorSelect = (colorId: string) => {
    setSelectedColorId(colorId);
    if (product?.variants.colors) {
      const colorOption = product.variants.colors.find((c) => c.id === colorId);
      if (
        colorOption &&
        typeof colorOption.imageIndex === 'number' &&
        colorOption.imageIndex >= 0 &&
        colorOption.imageIndex < product.images.length
      ) {
        setActiveGalleryIndex(colorOption.imageIndex);
      }
    }
  };

  // Calculate dynamic price based on selected storage variant
  const finalPrice = useMemo(() => {
    if (!product) return 0;
    let price = product.basePrice;
    if (selectedStorageId && product.variants.storage) {
      const selectedStorage = product.variants.storage.find(
        (s) => s.id === selectedStorageId
      );
      if (selectedStorage) {
        price += selectedStorage.priceDelta;
      }
    }
    return price;
  }, [product, selectedStorageId]);

  // Generate dynamic EMI plans based on current calculated price
  const emiPlans = useMemo(() => {
    if (!product) return [];
    return generateEMIPlans(product, finalPrice);
  }, [product, finalPrice]);

  // Selected EMI tenure state (default to longest 0% No-cost EMI, or 12 months)
  const defaultPlan = useMemo(() => {
    if (emiPlans.length === 0) return null;
    const noCostPlans = emiPlans.filter((p) => p.isNoCost);
    return noCostPlans.length > 0
      ? noCostPlans[noCostPlans.length - 1]
      : emiPlans[0];
  }, [emiPlans]);

  const [selectedPlanTenure, setSelectedPlanTenure] = useState<number | null>(null);

  // Synchronize plan tenure when default plan is calculated
  useEffect(() => {
    if (defaultPlan && selectedPlanTenure === null) {
      setSelectedPlanTenure(defaultPlan.tenureMonths);
    }
  }, [defaultPlan, selectedPlanTenure]);

  // Active selected plan
  const currentSelectedPlan = useMemo(() => {
    if (!emiPlans.length) return null;
    return (
      emiPlans.find((p) => p.tenureMonths === selectedPlanTenure) || defaultPlan || emiPlans[0]
    );
  }, [emiPlans, selectedPlanTenure, defaultPlan]);

  // Eligibility / Confirmation modal state
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  // If loading product asynchronously, render ProductDetailsSkeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
        <ProductDetailsSkeleton />
      </div>
    );
  }

  // If product not found or error occurred
  if (errorMessage || !product || !currentSelectedPlan) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
        <ErrorState
          message={errorMessage || 'Product details could not be loaded.'}
          onRetry={() => {
            if (productId) {
              setIsLoading(true);
              setErrorMessage(null);
              productService
                .getProductById(productId)
                .then(setProduct)
                .catch((e: any) => setErrorMessage(e.message))
                .finally(() => setIsLoading(false));
            }
          }}
        />
      </div>
    );
  }

  // Labels for drawer
  const selectedStorageObj = product.variants.storage?.find(
    (s) => s.id === selectedStorageId
  );
  const selectedColorObj = product.variants.colors?.find(
    (c) => c.id === selectedColorId
  );

  const discountPercent = calculateDiscountPercentage(product.mrp, finalPrice);
  const effectivePriceWithCashback = product.cashback
    ? finalPrice - product.cashback
    : null;

  return (
    <div className="space-y-6 pb-36 sm:pb-12">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            1Fi Certified Merchant
          </Badge>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Imagery Gallery (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <ProductGallery
            images={product.images}
            productName={product.name}
            badge={product.badge}
            externalImageIndex={activeGalleryIndex}
          />
        </div>

        {/* Right Column: Title, Pricing, Variants, EMI Plans (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Title Section */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {product.brand}
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-amber-900/60">({product.reviewCount})</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{product.tagline}</p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {formatINR(finalPrice)}
              </span>
              {product.mrp > finalPrice && (
                <span className="text-base text-slate-400 line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Price after cashback if available */}
            {effectivePriceWithCashback && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/80">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Net Effective Price after ₹{product.cashback} cashback:{' '}
                  <strong className="font-bold">{formatINR(effectivePriceWithCashback)}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Variant Selector */}
          <VariantSelector
            variants={product.variants}
            selectedStorageId={selectedStorageId}
            selectedColorId={selectedColorId}
            onSelectStorage={setSelectedStorageId}
            onSelectColor={handleColorSelect}
          />

          {/* EMI Plans Section */}
          <EMICalculatorSection
            plans={emiPlans}
            selectedPlan={currentSelectedPlan}
            onSelectPlan={(plan) => setSelectedPlanTenure(plan.tenureMonths)}
            principalAmount={finalPrice}
          />

          {/* Primary Action Button (Desktop View) */}
          <div className="hidden sm:block pt-4">
            <PrimaryButton
              fullWidth
              variant="primary"
              size="lg"
              onClick={() => setIsEligibilityOpen(true)}
              icon={<ShieldCheck className="w-5 h-5" />}
            >
              Proceed with {currentSelectedPlan.tenureMonths}M EMI ({formatINR(currentSelectedPlan.monthlyAmount)}/mo)
            </PrimaryButton>
            <p className="text-xs text-slate-500 text-center mt-2 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero downpayment • Instant digital pre-approval with mutual fund pledge</span>
            </p>
          </div>

          {/* Specifications & Trust markers */}
          <ProductSpecs product={product} />
        </div>
      </div>

      {/* Floating Sticky Bottom Bar for Mobile Ergonomics */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] shadow-lg flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-500 font-medium">
            {currentSelectedPlan.tenureMonths}M {currentSelectedPlan.isNoCost ? '0% EMI' : 'Plan'}
          </div>
          <div className="text-lg font-extrabold text-emerald-800 leading-none">
            {formatINR(currentSelectedPlan.monthlyAmount)}
            <span className="text-xs text-slate-500 font-normal">/mo</span>
          </div>
        </div>

        <PrimaryButton
          variant="primary"
          size="md"
          className="flex-1"
          onClick={() => setIsEligibilityOpen(true)}
        >
          Select Plan & Proceed
        </PrimaryButton>
      </div>

      {/* Eligibility & Confirmation Drawer */}
      <EligibilityDrawer
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        product={product}
        selectedPlan={currentSelectedPlan}
        selectedStorageLabel={selectedStorageObj?.label}
        selectedColorName={selectedColorObj?.name}
        finalPrice={finalPrice}
      />
    </div>
  );
};
