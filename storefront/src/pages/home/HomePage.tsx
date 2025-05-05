import React from "react"
import { ProductGrid } from "../../components/product/ProductGrid"
import { HeroSection } from "../../components/layout/HeroSection"
import { Categories } from "../../components/categories/Categories"

export function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <HeroSection />

      {/* Categories */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <Categories />
      </section>

      {/* Featured Products */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ProductGrid featured />
      </section>

      {/* All Products */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <ProductGrid />
      </section>
    </div>
  )
}
