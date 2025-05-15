import React from "react"
import { ProductCard } from "./ProductCard"
import { cn } from "../../lib/utils"

// Update Product interface to match what's used throughout the app
interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrls: string[]
  category: string
  originalPrice?: number
  isNew?: boolean
}

interface ProductGridProps {
  products?: Product[]
  columns?: 2 | 3 | 4
  isLoading?: boolean
  latest?: boolean  // Add this prop
  onProductClick?: (id: string) => void | Promise<void>  // Add this prop
}

export function ProductGrid({ 
  products = [], 
  columns = 4, 
  isLoading = false,
  latest = false,  // Add default value
  onProductClick 
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    )
  }

  // If latest is true, only show the most recent products
  const displayProducts = latest ? products.slice(0, 4) : products

  if (!displayProducts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found</p>
      </div>
    )
  }

  return (
    <div className={cn(
      "grid gap-4",
      {
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3': columns === 3,
        'grid-cols-1 sm:grid-cols-2': columns === 2
      }
    )}>
      {displayProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onClick={() => onProductClick?.(product.id)}
        />
      ))}
    </div>
  )
}
