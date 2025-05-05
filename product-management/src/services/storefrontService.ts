interface PublishProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  category: string;
  stock: number;
}

export const storefrontService = {
  async publishProduct(productData: PublishProductData) {
    // For now, we'll use localStorage as a mock database
    const storefrontProducts = JSON.parse(localStorage.getItem('storefront_products') || '[]');
    storefrontProducts.push({
      ...productData,
      publishedAt: new Date().toISOString(),
      status: 'active'
    });
    localStorage.setItem('storefront_products', JSON.stringify(storefrontProducts));
    return true;
  },

  async unpublishProduct(productId: string) {
    const storefrontProducts = JSON.parse(localStorage.getItem('storefront_products') || '[]');
    const filtered = storefrontProducts.filter((p: any) => p.id !== productId);
    localStorage.setItem('storefront_products', JSON.stringify(filtered));
    return true;
  }
};
