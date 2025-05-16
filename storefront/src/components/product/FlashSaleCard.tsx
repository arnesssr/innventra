import { useNavigate } from "react-router-dom"

interface FlashSaleCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    imageUrls: string[]
  }
}

export function FlashSaleCard({ product }: FlashSaleCardProps) {
  const navigate = useNavigate()
  
  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-[60px] h-[60px] relative rounded-sm overflow-hidden bg-white"
    >
      <img 
        src={product.imageUrls[0]} 
        alt={product.name}
        className="w-full h-full object-cover"
      />
      {product.originalPrice && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500/90 py-[1px]">
          <span className="text-[8px] text-white font-medium block text-center">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        </div>
      )}
    </div>
  )
}
