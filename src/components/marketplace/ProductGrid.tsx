import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '../common/SkeletonLoader';
import { EmptyState } from '../common/EmptyState';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onSelectProduct: (product: Product) => void;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  onSelectProduct,
  onResetFilters,
}) => {
  if (isLoading) {
    return <ProductGridSkeleton count={6} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No devices match your search"
        description="Try searching for another device name, brand (Apple, Samsung, Google), or clear the selected category."
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
};
