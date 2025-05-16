import React from 'react'
import { CartDetails } from '../../components/cart/CartDetails'
import { CartSummary } from '../../components/cart/CartSummary'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { ShoppingBag } from 'lucide-react'
import { PromoCodeInput } from '../../components/cart/PromoCodeInput'

export function CartPage() {
  const navigate = useNavigate()
  const { items, applyPromoCode } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 mx-auto bg-accent/50 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-red-500"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <Button 
          variant="outline"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CartDetails />
          <PromoCodeInput onApply={applyPromoCode} />
        </div>
        <aside>
          <CartSummary />
        </aside>
      </div>
    </div>
  )
}

export default CartPage
