import { create } from 'zustand'

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'draft' | 'published';
  createdAt: Date;
}

interface ProductStore {
  products: Product[];
  drafts: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  getStats: () => {
    totalProducts: number;
    totalValue: number;
    draftsCount: number;
    publishedCount: number;
  };
}

export const useStore = create<ProductStore>((set, get) => ({
  products: [],
  drafts: [],
  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    set((state) => ({
      products: [...state.products, newProduct],
      drafts: product.status === 'draft' 
        ? [...state.drafts, newProduct]
        : state.drafts
    }))
  },
  getStats: () => {
    const { products, drafts } = get()
    return {
      totalProducts: products.length,
      totalValue: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0),
      draftsCount: drafts.length,
      publishedCount: products.filter(p => p.status === 'published').length
    }
  }
}))
