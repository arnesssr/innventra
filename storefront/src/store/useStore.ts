import { create } from 'zustand'
import type { Product as ProductType, Category } from '../types/productTypes'

interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrls: string[]
  category: string
  originalPrice?: number
  isNew?: boolean
  isFavorite?: boolean  // Add this property
}

interface StoreState {
  products: Product[]
  categories: Category[]
  cart: { productId: string; quantity: number }[]
  recentlyViewed: Product[]
  fetchProducts: () => Promise<void>
  toggleFavorite: (productId: string) => void
  addToRecentlyViewed: (product: Product) => void
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  categories: [],
  cart: [],
  recentlyViewed: [],
  fetchProducts: async () => {
    // For now, fetch from localStorage
    const products = JSON.parse(localStorage.getItem('storefront_products') || '[]');
    set({ products });
  },
  toggleFavorite: (productId) => 
    set(state => ({
      products: state.products.map(product =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    })),
  addToRecentlyViewed: (product) => 
    set(state => ({
      recentlyViewed: [
        product,
        ...state.recentlyViewed.filter(p => p.id !== product.id)
      ].slice(0, 8)  // Keep last 8 viewed items
    }))
}))
