import { Timer } from "../ui/Timer"
import { Zap } from "lucide-react"
import { FlashSaleCard } from "../product/FlashSaleCard"
import { useRef } from "react"

interface FlashSalesProps {
  endTime: Date
  products: any[] // Replace with your product type
}

export function FlashSales({ endTime, products }: FlashSalesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="px-0 py-2">
      <div className="w-full bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-white" fill="white" />
              <span className="text-white text-sm font-medium">Flash Sale</span>
            </div>
            <Timer endTime={endTime} />
          </div>
          
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto flex gap-2 pb-2 px-2 no-scrollbar snap-x snap-mandatory"
            >
              {products.slice(0, 20).map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0 w-[60px] snap-start"
                >
                  <FlashSaleCard product={product} />
                </div>
              ))}
            </div>
            
            {/* Add scroll indicator */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold text-xl animate-pulse">
              &gt;
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
