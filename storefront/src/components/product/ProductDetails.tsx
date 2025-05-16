import React, { useState } from "react"
import { useStore } from "../../store/useStore"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { Separator } from "../ui/Separator"
import { Badge } from "../ui/Badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "../../hooks/useCart"
import { Product } from "../../types/product"

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  
  const product = useStore(state => 
    state.products.find(p => p.id === productId)
  )

  const handleAddToCart = () => {
    if (!product) return
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrls[0]
    })
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border">
          <img
            src={product.imageUrls[selectedImage]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Thumbnail Images */}
        {product.imageUrls.length > 1 && (
          <div className="flex gap-4 overflow-auto pb-2">
            {product.imageUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square w-20 overflow-hidden rounded-md border ${
                  selectedImage === idx ? 'border-primary' : 'hover:border-primary/50'
                }`}
              >
                <img
                  src={url}
                  alt={`Product image ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>

        <p className="text-muted-foreground">{product.description}</p>

        <div className="space-y-4">
          <Button 
            className="w-full"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          
          <Button variant="outline" className="w-full">
            <Heart className="mr-2 h-5 w-5" />
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  )
}
