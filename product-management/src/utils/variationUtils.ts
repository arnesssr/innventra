/**
 * Global utility functions for managing variations
 */
import { Variation, VariantCombination } from '../types/variationTypes';

/**
 * Generates all possible combinations of variation options
 */
export const generateVariantCombinations = (variations: Variation[]): Record<string, string>[] => {
    if (variations.length === 0) return [];

    const combinations: Record<string, string>[] = [{}];
    
    variations.forEach(variation => {
        const newCombos = combinations.flatMap(combo => 
            variation.options.map(option => ({
                ...combo,
                [variation.name.toLowerCase()]: option
            }))
        );
        combinations.length = 0;
        combinations.push(...newCombos);
    });

    return combinations;
};

/**
 * Generates SKU for a variant combination
 */
export const generateVariantSKU = (baseSKU: string, combination: Record<string, string>): string => {
    const variantPart = Object.values(combination)
        .map(value => value.substring(0, 3).toUpperCase())
        .join('-');
    return `${baseSKU}-${variantPart}`;
};

/**
 * Calculates variant price based on base price and modifiers
 */
export const calculateVariantPrice = (basePrice: number, modifier: number | null): number => {
    if (!modifier) return basePrice;
    return basePrice + modifier;
};
