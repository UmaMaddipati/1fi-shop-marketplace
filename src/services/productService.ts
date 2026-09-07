import { MOCK_PRODUCTS } from '../data/products';
import { Product, ProductCategory, FilterState } from '../types/product';
import { generateEMIPlans } from '../utils/emiCalculator';

// Service configuration to allow testing loading & error states
let simulateError = false;

export const productService = {
  /**
   * Set flag to simulate network errors for testing error handling UI
   */
  setSimulateError(shouldError: boolean) {
    simulateError = shouldError;
  },

  isSimulatingError(): boolean {
    return simulateError;
  },

  /**
   * Fetches all products matching optional filter criteria with simulated async network latency
   */
  async getProducts(filters?: Partial<FilterState>): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (simulateError) {
      throw new Error('Failed to load marketplace products. Please check your connection and try again.');
    }

    let results = [...MOCK_PRODUCTS];

    // Filter by Category
    if (filters?.selectedCategory && filters.selectedCategory !== 'all') {
      results = results.filter((p) => p.category === filters.selectedCategory);
    }

    // Filter by Search Query
    if (filters?.searchQuery && filters.searchQuery.trim().length > 0) {
      const query = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query)
      );
    }

    // Sort
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          results.sort((a, b) => a.basePrice - b.basePrice);
          break;
        case 'price-desc':
          results.sort((a, b) => b.basePrice - a.basePrice);
          break;
        case 'emi-asc':
          // Sort by actual lowest applicable monthly EMI across plans
          results.sort((a, b) => {
            const plansA = generateEMIPlans(a, a.basePrice);
            const plansB = generateEMIPlans(b, b.basePrice);
            const minEmiA = Math.min(...plansA.map((p) => p.monthlyAmount));
            const minEmiB = Math.min(...plansB.map((p) => p.monthlyAmount));
            return minEmiA - minEmiB;
          });
          break;
        case 'popular':
        default:
          results.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
          break;
      }
    }

    return results;
  },

  /**
   * Fetches a single product by its unique ID
   */
  async getProductById(id: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (simulateError) {
      throw new Error('Failed to retrieve product details. Please try again.');
    }

    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    return product ? { ...product } : null;
  },

  /**
   * Returns list of categories with active count of products
   */
  async getCategories(): Promise<{ id: ProductCategory; label: string; count: number }[]> {
    const categories: { id: ProductCategory; label: string }[] = [
      { id: 'all', label: 'All Items' },
      { id: 'smartphones', label: 'Smartphones' },
      { id: 'laptops', label: 'Laptops' },
      { id: 'tablets', label: 'Tablets' },
      { id: 'audio', label: 'Audio & ANC' },
    ];

    return categories.map((cat) => ({
      ...cat,
      count:
        cat.id === 'all'
          ? MOCK_PRODUCTS.length
          : MOCK_PRODUCTS.filter((p) => p.category === cat.id).length,
    }));
  },
};
