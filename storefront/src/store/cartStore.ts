import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

interface CartStore {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  applyPromoCode: (code: string) => Promise<boolean>
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        return {
          items: state.items.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        }
      }
      
      return {
        items: [...state.items, { ...item, quantity: 1 }]
      }
    })
  },
  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }))
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    }))
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    const state = get()
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  applyPromoCode: async (code: string) => {
    // Mock implementation - replace with actual promo code logic
    const isValid = code.length > 0
    if (isValid) {
      // Apply discount logic here
      return true
    }
    return false
  }
}))
