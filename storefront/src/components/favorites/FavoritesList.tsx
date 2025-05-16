import { ProductGrid } from "../product/ProductGrid"
import { useNavigate } from "react-router-dom"
import { useStore } from "../../store/useStore"

export function FavoritesList() {
  const navigate = useNavigate()
  const favorites = useStore(state => 
    state.products.filter(p => p.isFavorite)
  )

  return (
    <ProductGrid
      products={favorites}
      onProductClick={(id) => navigate(`/product/${id}`)}
    />
  )
}
