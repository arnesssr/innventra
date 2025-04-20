import { useState, useEffect } from 'react'
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import { Plus, Trash2 } from "lucide-react"
import type { Variation, VariantCombination } from '../../../types/variationTypes'

interface Props {
  variations: Variation[];
  variants: VariantCombination[];
  baseProduct: string;
  category: string;
  basePrice: number;
  onUpdate: (variations: Variation[], variants: VariantCombination[]) => void;
}

/**
 * Interface for combination generation
 */
interface Combination {
  [key: string]: string;
}

/**
 * VariantManager Component
 * Handles creation and management of product variants
 * 
 * Features:
 * - Add/remove variation types (e.g., Size, Color)
 * - Manage options for each variation type
 * - Auto-generate all possible combinations
 * - Set specific prices and stock levels for variants
 * - Generate SKUs for variants
 */
export function VariantManager({ basePrice, onUpdate, variations, variants, baseProduct, category }: Props) {
  const [localVariations, setLocalVariations] = useState<Variation[]>(variations);
  const [localVariants, setLocalVariants] = useState<VariantCombination[]>(variants);

  /**
   * Generates all possible combinations of options
   * Updates the variants state with new combinations
   */
  const generateSKU = (combination: Record<string, string>): string => {
    const prefix = category.substring(0, 3).toUpperCase();
    const productCode = baseProduct.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
    const variantCode = Object.values(combination)
      .map(value => value.substring(0, 2).toUpperCase())
      .join('');
    const timestamp = Date.now().toString().slice(-4);
    
    return `${prefix}-${productCode}-${variantCode}-${timestamp}`;
  };

  useEffect(() => {
    if (localVariations.length === 0) {
      setLocalVariants([]);
      onUpdate([], []);
      return;
    }

    /**
     * Generates combinations of variation options
     * @param current - Current combination being built
     * @param variationIndex - Current variation index being processed
     * @returns Array of VariantCombination
     */
    const generateCombinations = (current: Combination, variationIndex: number): VariantCombination[] => {
      if (variationIndex === localVariations.length) {
        // Generate SKU based on combination
        const existingVariant = localVariants.find(v => 
          Object.entries(v.combination).every(([key, value]) => current[key] === value)
        );

        return [{
          id: existingVariant?.id || Date.now().toString(),
          sku: existingVariant?.sku || generateSKU(current),
          price: existingVariant?.price || basePrice,
          stock: existingVariant?.stock || 0,
          combination: { ...current },
          status: existingVariant?.status || 'active'
        }];
      }

      const variation = localVariations[variationIndex];
      return variation.options.flatMap(option => {
        const newCombination = {
          ...current,
          [variation.name.toLowerCase()]: option
        };
        return generateCombinations(newCombination, variationIndex + 1);
      });
    };

    const newVariants = generateCombinations({}, 0);
    setLocalVariants(newVariants);
    onUpdate(localVariations, newVariants);
  }, [localVariations, basePrice, onUpdate, localVariants, category, baseProduct]);

  // ... Rest of the implementation coming in next update
}
