import { Minus, Plus } from "lucide-react"
import { Button } from "../ui/Button"

interface ProductQuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  max?: number
}

export function ProductQuantitySelector({
  quantity,
  onQuantityChange,
  max = Infinity
}: ProductQuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        className="h-8 w-8"
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <span className="w-12 text-center tabular-nums">{quantity}</span>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => quantity < max && onQuantityChange(quantity + 1)}
        disabled={quantity >= max}
        className="h-8 w-8"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
