export const generateSKU = (
  baseProduct: string,
  category: string,
  variant?: Record<string, string>
): string => {
  const prefix = category.substring(0, 3).toUpperCase();
  const productCode = baseProduct.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  
  if (variant) {
    const variantCode = Object.values(variant)
      .map(v => v.substring(0, 3).toUpperCase())
      .join('');
    return `${prefix}-${productCode}-${variantCode}-${timestamp}`;
  }
  
  return `${prefix}-${productCode}-${timestamp}`;
}
