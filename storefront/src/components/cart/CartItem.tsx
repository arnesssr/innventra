import { Minus, Plus, X } from "lucide-react"
import { Button } from "../ui/Button"
import { useCart } from "../../hooks/useCart"

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  maxQuantity?: number
}

export function CartItem({ id, name, price, quantity, imageUrl, maxQuantity = 99 }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex gap-4 py-4">
      <img 
        src={imageUrl} 
        alt={name}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => removeFromCart(id)}
            className="text-muted-foreground hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => quantity > 1 && updateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
            className="h-8 w-8"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => quantity < maxQuantity && updateQuantity(id, quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="h-8 w-8"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
