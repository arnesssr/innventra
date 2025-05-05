import React from 'react'
import { useStorefrontProducts } from "../../hooks/useStorefrontProducts"
import { ProductCard } from "./ProductCard"

interface ProductGridProps {
  featured?: boolean;
  categoryId?: string;
}

export function ProductGrid({ featured, categoryId }: ProductGridProps) {
  const { products } = useStorefrontProducts()

  const filteredProducts = products.filter(product => {
    if (categoryId && product.category !== categoryId) return false
    if (featured && !product.featured) return false
    return true
  })

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
        />
      ))}
    </div>
  )
}
