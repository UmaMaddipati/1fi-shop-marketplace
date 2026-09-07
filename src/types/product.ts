export type ProductCategory = 'all' | 'smartphones' | 'laptops' | 'tablets' | 'audio';

export interface ProductVariantOption {
  id: string;
  label: string;
  priceDelta: number;
}

export interface ProductColorOption {
  id: string;
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductVariants {
  storage?: ProductVariantOption[];
  colors?: ProductColorOption[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  basePrice: number;
  mrp: number;
  badge?: string;
  cashback?: number;
  images: string[];
  variants: ProductVariants;
  availableTenures: number[]; // e.g. [3, 6, 9, 12, 18, 24, 36]
  noCostTenures: number[];    // e.g. [3, 6, 9, 12]
  annualInterestRate: number; // e.g. 14.5% for non-no-cost tenures
  processingFee: number;      // 0 for 1Fi zero-fee promise
  highlights: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface EMIPlan {
  tenureMonths: number;
  monthlyAmount: number;
  isNoCost: boolean;
  interestRate: number;
  totalInterest: number;
  totalAmount: number;
  processingFee: number;
  downpayment: number;
  cashbackBonus?: number;
  mutualFundAdvantageNote: string;
}

export interface SelectedConfiguration {
  selectedStorageId?: string;
  selectedColorId?: string;
  selectedTenure: number;
  finalPrice: number;
}

export type ShopTab = 'top-brands' | 'nearby-stores' | 'marketplace';

export interface FilterState {
  searchQuery: string;
  selectedCategory: ProductCategory;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'emi-asc';
}
