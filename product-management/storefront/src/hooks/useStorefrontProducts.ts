export function useStorefrontProducts() {
  const getProducts = () => {
    const products = JSON.parse(localStorage.getItem('storefront_products') || '[]')
    return products.filter((p: any) => p.status === 'active')
  }

  return {
    products: getProducts()
  }
}
