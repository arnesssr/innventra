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
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-[100px] bg-white rounded-md overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-square">
        <img 
          src={product.imageUrls[0]} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] px-1">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-1">
        <p className="text-red-500 text-[11px] font-semibold">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
