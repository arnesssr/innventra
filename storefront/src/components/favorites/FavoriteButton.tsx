import { Heart } from "lucide-react"
import { Button } from "../ui/Button"
import { useStore } from "../../store/useStore"

interface FavoriteButtonProps {
  productId: string
  className?: string
}

export function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const toggleFavorite = useStore(state => state.toggleFavorite)
  const isFavorite = useStore(state => 
    state.products.find(p => p.id === productId)?.isFavorite
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorite(productId)
      }}
    >
      <Heart 
        className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
      />
    </Button>
  )
}
