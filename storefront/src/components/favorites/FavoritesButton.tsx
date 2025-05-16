import { Heart } from "lucide-react"
import { Button } from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { useStore } from "../../store/useStore"

export function FavoritesButton() {
  const navigate = useNavigate()
  const favoriteCount = useStore(state => 
    state.products.filter(p => p.isFavorite).length
  )

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={() => navigate('/favorites')}
    >
      <Heart className="h-5 w-5" />
      {favoriteCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-medium text-white flex items-center justify-center">
          {favoriteCount}
        </span>
      )}
    </Button>
  )
}
