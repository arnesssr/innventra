import React, { useState } from "react"
import { HeroSection } from "../../components/layout/HeroSection"
import { CategoryGrid } from "../../components/category/CategoryGrid"
import { ProductGrid } from "../../components/product/ProductGrid"
import { Badge } from "../../components/ui/Badge"
import { CATEGORY_CONFIG } from "../../config/categoryConfig"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../../store/cartStore"
import { ProductCard } from "../../components/product/ProductCard"
import { Card } from "../../components/ui/Card"

// Transform category config into grid format
const categories = Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
  id,
  name: config.title,
  description: config.description,
  imageUrl: `/images/categories/${id}.jpg`,
  productCount: 0,
}))

// Mock featured products with category field
const featuredProducts = [
  {
    id: "bible-1",
    name: "KJV Study Bible",
    price: 49.99,
    description: "King James Version Study Bible with commentary",
    imageUrls: ["https://via.placeholder.com/400?text=KJV+Bible"],
    category: "bibles", // Added required category field
    originalPrice: 59.99,
    isNew: true,
  },
  {
    id: "book-1",
    name: "Daily Devotional Journal",
    price: 19.99,
    description: "365 Days of Prayer and Reflection",
    imageUrls: ["https://via.placeholder.com/400?text=Journal"],
    category: "books", // Added required category field
    originalPrice: 24.99,
    isNew: false,
  },
  // Add more mock products...
]

export function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()
  const { addToCart } = useCartStore()

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <section className="container">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">
              Find what you need in our collections
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.productCount} products
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-1">
              Hand-picked favorites just for you
            </p>
          </div>
          <Badge variant="secondary" className="text-orange-600">
            Featured
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() =>
                addToCart({
                  ...product,
                  quantity: 1,
                  imageUrl: product.imageUrls[0],
                })
              }
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container pb-16">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <p className="text-muted-foreground mt-1">
              Check out our latest additions
            </p>
          </div>
        </div>
        <ProductGrid
          latest={true}
          onProductClick={(id) => navigate(`/product/${id}`)}
        />
      </section>
    </div>
  )
}
