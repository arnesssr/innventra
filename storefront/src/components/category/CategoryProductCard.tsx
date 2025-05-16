import { Link } from "react-router-dom"
import { Heart, Star } from "lucide-react"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"

interface CategoryProductCardProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    category: string
    rating: number
    reviewCount: number
    // Category-specific fields
    author?: string
    version?: string
    coverType?: string
    giftType?: string
    ageGroup?: string
  }
}

export function CategoryProductCard({ product }: CategoryProductCardProps) {
  return (
    <Card className="group overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-medium truncate">{product.name}</h3>
          
          {/* Category-specific details */}
          {product.author && (
            <p className="text-sm text-muted-foreground">by {product.author}</p>
          )}
          {product.version && (
            <p className="text-sm text-muted-foreground">{product.version}</p>
          )}
          {product.coverType && (
            <p className="text-sm text-muted-foreground">{product.coverType}</p>
          )}
          {product.ageGroup && (
            <p className="text-sm text-muted-foreground">{product.ageGroup}</p>
          )}
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating
                    ? "fill-orange-500 text-orange-500"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          
          <p className="font-bold text-lg text-orange-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </Card>
  )
}
