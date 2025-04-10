import { create } from 'zustand'

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
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (categoryId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  getCategoryName: (id: string) => string;
  getStats: () => {
    totalProducts: number;
    totalValue: number;
    draftsCount: number;
    publishedCount: number;
  };
}

export const useStore = create<Store>((set, get) => ({
  products: [],
  categories: DEFAULT_CATEGORIES,
  
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

  addProduct: (product) => set(state => ({
    products: [...state.products, {
      ...product,
      id: Date.now().toString(),
      categoryName: state.categories.find(c => c.id === product.category)?.name || product.category
    } as Product]
  })),

  getCategoryName: (id: string) => {
    const category = DEFAULT_CATEGORIES.find(c => c.id === id)
    return category ? category.name : 'Product'
  },

  getStats: () => {
    const products = get().products
    return {
      totalProducts: products.length,
      totalValue: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0),
      draftsCount: products.filter(p => p.status === 'draft').length,
      publishedCount: products.filter(p => p.status === 'published').length
    }
  }
}))

export type { Category }
