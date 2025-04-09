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

interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: string[];
}

interface ProductStore {
  products: Product[];
  drafts: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
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
  categories: [
    {
      id: 'bibles',
      name: 'Bibles',
      description: 'Holy Bibles in different versions and formats',
      subcategories: ['Study Bibles', 'Children\'s Bibles', 'Reference Bibles']
    },
  ],
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
  addCategory: (category) => set(state => ({
    categories: [...state.categories, { ...category, id: Date.now().toString() }]
  })),
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
