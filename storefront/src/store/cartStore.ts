import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

interface CartStore {
  items: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  getTotal: () => number
  applyPromoCode: (code: string) => Promise<boolean>
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      
      return {
        items: [...state.items, { ...product, quantity: 1 }]
      }
    })
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId)
    }))
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    }))
  },

  getTotal: () => {
    const state = get()
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  applyPromoCode: async (code: string) => {
    // Mock promo code validation
    if (code === 'DISCOUNT10') {
      // Apply 10% discount logic here
      return true
    }
    return false
  }
}))
