import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { ProductGallery } from "../../components/product/ProductGallery"
import { ProductQuantitySelector } from "../../components/product/ProductQuantitySelector"
import { ProductReviews } from "../../components/product/ProductReviews"
import { RelatedProducts } from "../../components/product/RelatedProducts"
import { Button } from "../../components/ui/Button"
import { useCartStore } from "../../store/cartStore"
import { useToast } from "../../hooks/useToast"
import { Heart, Share2 } from "lucide-react"

// Mock data - replace with real data later
const MOCK_PRODUCTS = {
  'bible-1': {
    id: 'bible-1',
    name: "KJV Study Bible",
    price: 49.99,
    description: "A beautiful leather-bound King James Version study Bible with comprehensive commentary, maps, and study notes.",
    imageUrls: [
      "https://via.placeholder.com/600?text=Bible+Front",
      "https://via.placeholder.com/600?text=Bible+Back",
      "https://via.placeholder.com/600?text=Bible+Inside"
    ],
    category: "bibles",
    version: "KJV",
    coverType: "Leather",
    reviews: [
      {
        id: "1",
        author: "John D.",
        rating: 5,
        comment: "Excellent quality and beautiful binding.",
        date: "2024-01-15"
      }
    ]
  },
  'book-1': {
    id: 'book-1',
    name: "Daily Devotional Journal",
    price: 19.99,
    description: "365 days of guided devotional readings and journal prompts to deepen your faith journey.",
    imageUrls: [
      "https://via.placeholder.com/600?text=Journal+Cover",
      "https://via.placeholder.com/600?text=Journal+Pages"
    ],
    category: "books",
    author: "Sarah Wilson",
    reviews: [
      {
        id: "1",
        author: "Mary S.",
        rating: 4,
        comment: "Great for daily reflection.",
        date: "2024-01-10"
      }
    ]
  },
  // Add more mock products as needed
}

export function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  
  const product = MOCK_PRODUCTS[id as keyof typeof MOCK_PRODUCTS]

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Continue Shopping
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrls[0]
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  return (
    <div className="container max-w-7xl py-8">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <ProductGallery images={product.imageUrls} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-orange-600 mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <ProductQuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              max={10}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500"
              size="lg"
            >
              Add to Cart
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      <div className="mb-16">
        <ProductReviews
          reviews={product.reviews}
          averageRating={4.5}
          totalReviews={product.reviews.length}
        />
      </div>

      {/* Related Products */}
      <RelatedProducts products={[]} />
    </div>
  )
}
