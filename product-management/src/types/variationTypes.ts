/**
 * Global variation type definitions
 * Used across different features for product variations
 */
export interface Variation {
  id: string;
  name: string;         // e.g., "Size", "Color"
  options: string[];    // e.g., ["S", "M", "L"] or ["Red", "Blue"]
}

export interface VariantCombination {
  id: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'disabled';
  combination: {
    [key: string]: string;
  };
}

export interface ProductWithVariants {
  basePrice: number;
  variations: Variation[];
  variants: VariantCombination[];
  hasVariants: boolean;
}

// Started implementing variation types and utilities
