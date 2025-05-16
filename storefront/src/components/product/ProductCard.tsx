import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "../../hooks/useCart"

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  category: string;  // Required field for categorization
  originalPrice?: number;
  isNew?: boolean;
  onAddToWishlist?: () => void;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onClick?: () => void | Promise<void>;  // Make onClick optional
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/product/${product.id}`)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart()
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrls[0]
      })
    }
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-b from-white to-orange-50">
      {/* Discount Tag */}
      {product.originalPrice && (
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded text-xs text-white font-medium">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </div>
      )}
      
      {/* New Tag */}
      {product.isNew && (
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded text-xs text-white font-medium">
          NEW
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        onClick={product.onAddToWishlist}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
      >
        <Heart className="w-4 h-4 text-gray-600" />
      </button>

      <div onClick={handleClick} className="cursor-pointer">
        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.imageUrls[0]} 
            alt={product.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-orange-600">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  )
}
