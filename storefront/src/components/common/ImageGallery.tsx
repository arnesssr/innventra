import { useState } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "../ui/Button"
import { Dialog, DialogContent } from "../ui/Dialog"

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const next = () => setCurrentIndex((i) => (i + 1) % images.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length)

  return (
    <div className="relative">
      <div className="aspect-square overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="h-full w-full object-cover cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2"
          onClick={prev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => setIsZoomed(true)}
        >
          <Expand className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 ${
              index === currentIndex ? "border-orange-500" : "border-transparent"
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

      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-screen-lg h-[90vh]">
          <div className="relative h-full">
            <img
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
