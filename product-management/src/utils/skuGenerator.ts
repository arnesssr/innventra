export const generateSKU = (
  baseProduct: string,
  category: string,
  combination?: Record<string, string>
): string => {
  const prefix = category.substring(0, 3).toUpperCase();
  const productCode = baseProduct.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  
  if (combination) {
    const variantCode = Object.entries(combination)
      .map(([key, value]) => value.substring(0, 2).toUpperCase())
      .join('');
    return `${prefix}-${productCode}-${variantCode}-${timestamp}`;
  }
  
  return `${prefix}-${productCode}-${timestamp}`;
};
