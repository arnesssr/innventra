import { create } from 'zustand'
import { StockMovement, InventoryItem } from '../features/inventory/types'

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  description: string;
  images: File[];
  stock: number;
  status: 'draft' | 'published';
  [key: string]: any;
}

const DEFAULT_CATEGORIES: Category[] = [
  { 
    id: 'bibles',
    name: 'Bibles',
    description: 'Holy Bibles in different versions and formats'
  },
  { 
    id: 'books',
    name: 'Books',
    description: 'Various books across genres and topics'
  },
  { 
    id: 'gifts',
    name: 'Gifts & Cards',
    description: 'Gift items and greeting cards for all occasions'
  },
  { 
    id: 'stationery',
    name: 'Stationery',
    description: 'Office and school stationery supplies'
  },
  { 
    id: 'toys',
    name: 'Toys & Games',
    description: 'Fun toys and games for children and adults'
  },
  { 
    id: 'music',
    name: 'Music & Media',
    description: 'Music albums and media content'
  }
]

interface Store {
  products: Product[];
  categories: Category[];
  inventory: Record<string, InventoryItem>;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (categoryId: string) => void;
  addProduct: (product: Product) => void;
  getCategoryName: (id: string) => string;
  getStats: () => {
    totalProducts: number;
    totalValue: number;
    draftsCount: number;
    publishedCount: number;
  };
  addStockMovement: (movement: Omit<StockMovement, 'id'>) => void;
  updateMinimumStock: (productId: string, minimum: number) => void;
}

export const useStore = create<Store>((set, get) => ({
  products: [],
  categories: DEFAULT_CATEGORIES,
  inventory: {},
  
  addCategory: (category) => set(state => ({
    categories: [...state.categories, {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-')
    }]
  })),

  deleteCategory: (categoryId: string) => set(state => {
    const updatedProducts = state.products.map(product => 
      product.category === categoryId 
        ? { ...product, category: 'uncategorized', categoryName: 'Uncategorized' }
        : product
    )

    return {
      categories: state.categories.filter(c => c.id !== categoryId),
      products: updatedProducts
    }
  }),

  addProduct: (product) => set(state => {
    // Create inventory entry when product is added
    const inventory = {
      ...state.inventory,
      [product.id]: {
        productId: product.id,
        productName: product.name,
        categoryId: product.category,
        currentStock: product.stock,
        minimumStock: 5, // Default minimum
        lastUpdated: new Date().toISOString(),
        movements: [{
          id: Date.now().toString(),
          productId: product.id,
          type: 'in',
          quantity: product.stock,
          date: new Date().toISOString(),
          notes: 'Initial stock'
        }]
      }
    }

    return {
      products: [...state.products, product],
      inventory
    }
  }),

  getCategoryName: (categoryId: string) => {
    const category = get().categories.find(c => c.id === categoryId)
    return category ? category.name : categoryId
  },

  getStats: () => {
    const products = get().products
    return {
      totalProducts: products.length,
      totalValue: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0),
      draftsCount: products.filter(p => p.status === 'draft').length,
      publishedCount: products.filter(p => p.status === 'published').length
    }
  },

  addStockMovement: (movement) => set(state => {
    const item = state.inventory[movement.productId]
    if (!item) return state

    const newMovement = {
      ...movement,
      id: Date.now().toString(),
      date: new Date().toISOString()
    }

    const currentStock = item.currentStock + (
      movement.type === 'in' ? movement.quantity :
      movement.type === 'out' ? -movement.quantity :
      movement.quantity
    )

    return {
      inventory: {
        ...state.inventory,
        [movement.productId]: {
          ...item,
          currentStock,
          lastUpdated: new Date().toISOString(),
          movements: [...item.movements, newMovement]
        }
      }
    }
  }),

  updateMinimumStock: (productId, minimum) => set(state => ({
    inventory: {
      ...state.inventory,
      [productId]: {
        ...state.inventory[productId],
        minimumStock: minimum
      }
    }
  }))
}))

export type { Category }
