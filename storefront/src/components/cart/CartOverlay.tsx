import { ShoppingBag, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/Sheet"
import { Button } from "../ui/Button"
import { Separator } from "../ui/Separator"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"

export function CartOverlay() {
  const navigate = useNavigate()
  const { items, getTotal } = useCart()
  const total = getTotal()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart items will go here */}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
