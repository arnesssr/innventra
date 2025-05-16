import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/Button"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg relative">
        <img 
          src={images[activeIndex]} 
          alt="Product" 
          className="h-full w-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 ${
              index === activeIndex ? 'border-orange-500' : 'border-transparent'
            }`}
          >
            <img 
              src={image} 
              alt={`Product thumbnail ${index + 1}`} 
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
