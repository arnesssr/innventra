import React from 'react'
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { useNavigate } from 'react-router-dom'
import { useStore } from "../../store/useStore"
import { ProductGrid } from "../../components/product/ProductGrid"
import { RecommendedProducts } from "../../components/product/RecommendedProducts"
import { Container } from "../../components/ui/Container"
import { Separator } from "../../components/ui/Separator"

export function FavoritesPage() {
  const navigate = useNavigate()
  const favorites = useStore(state => 
    state.products.filter(p => p.isFavorite)
  )

  if (favorites.length === 0) {
    return (
      <Container className="py-16">
        <div className="max-w-md mx-auto space-y-6 text-center">
          <div className="w-16 h-16 mx-auto bg-accent/50 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">No favorites yet</h2>
          <p className="text-muted-foreground">
            When you favorite products, they will appear here
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-red-500"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Recommended Products Section */}
        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-semibold text-center">You Might Like</h2>
          <RecommendedProducts />
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Favorites ({favorites.length})</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
      </div>

      <ProductGrid products={favorites} />

      <Separator className="my-8" />

      {/* Similar Products Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Similar Products</h2>
        <RecommendedProducts 
          baseProducts={favorites}
          limit={4}
        />
      </section>

      {/* Recently Viewed Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Recently Viewed</h2>
        <ProductGrid 
          products={useStore(state => state.recentlyViewed)}
          columns={4}
        />
      </section>
    </Container>
  )
}
