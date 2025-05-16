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
    <section className="w-screen -ml-[calc(50vw-50%)] relative py-2">
      <div className="w-full bg-gradient-to-r from-orange-500 to-red-500 md:mx-4 md:rounded-xl">
        <div className="container">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-white" fill="white" />
              <span className="text-white text-sm font-medium">Flash Sale</span>
            </div>
            <Timer endTime={endTime} />
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto flex gap-1.5 pb-2 px-2 no-scrollbar"
          >
            {products.slice(0, 20).map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-[60px] md:w-[120px] h-[60px] md:h-[120px]" 
              >
                <FlashSaleCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
