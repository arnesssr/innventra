import React, { useRef, useState } from 'react'
import { useStore } from "../../store/useStore"
import { ProductCard } from "./ProductCard"
import { Button } from "../ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  description: string  // Required by ProductCard
  imageUrls: string[]
  category: string    // Added required field
  originalPrice?: number
  isNew?: boolean
  onAddToWishlist?: () => void
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
      
      {/* Scroll Buttons */}
      {showLeftScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-4 top-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}
      
      {showRightScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Products Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[280px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

