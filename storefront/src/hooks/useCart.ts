import { create } from 'zustand'
import { useCartStore as useStore } from '../store/cartStore'

interface CartItem {
  id: string
  quantity: number
}

export function useCart() {
  const { 
    items, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getTotal 
  } = useStore()

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal,
    itemCount: items.reduce((acc, item) => acc + item.quantity, 0)
  }
}
