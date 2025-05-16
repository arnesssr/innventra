import { useStore } from "../../store/useStore"
import { ProductGrid } from "./ProductGrid"

interface RecommendedProductsProps {
  baseProducts?: any[]  // Products to base recommendations on
  limit?: number        // Number of recommendations to show
}

export function RecommendedProducts({ baseProducts, limit = 4 }: RecommendedProductsProps) {
  // Get recommended products based on favorites/viewed items
  const recommendations = useStore(state => 
    state.products
      .filter(p => !baseProducts?.some(bp => bp.id === p.id))  // Exclude base products
      .filter(p => baseProducts?.some(bp => bp.category === p.category))  // Same category
      .slice(0, limit)
  )

  return (
    <ProductGrid 
      products={recommendations}
      columns={4}
    />
  )
}
