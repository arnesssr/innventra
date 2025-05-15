import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/Button"
import { useState } from "react"
import { useCart } from "../../hooks/useCart"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    imageUrls: string[]
  }
  disabled?: boolean
}

export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrls[0],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
      onClick={handleAddToCart}
      disabled={disabled || loading}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
