import { create } from 'zustand'
import { Category as CategoryType } from '../types/category'

const DEFAULT_CATEGORIES: CategoryType[] = [
  {
    id: 'books',
    name: 'Books',
    description: 'Christian books and literature',
    fields: [
      { id: 'isbn', name: 'ISBN', type: 'text', required: true },
      { id: 'author', name: 'Author', type: 'text', required: true },
      { id: 'genre', name: 'Genre', type: 'select', required: true },
    ]
  },
  {
    id: 'bibles',
    name: 'Bibles',
    description: 'Holy Bibles in different versions and formats',
    fields: [
      { id: 'isbn', name: 'ISBN', type: 'text', required: true },
      { id: 'version', name: 'Version', type: 'select', required: true },
      { id: 'coverType', name: 'Cover Type', type: 'select', required: true },
    ]
  },
  {
    id: 'gifts',
    name: 'Gifts & Cards',
    description: 'Christian gifts and greeting cards',
    fields: [
      { id: 'type', name: 'Gift Type', type: 'select', required: true },
      { id: 'occasion', name: 'Occasion', type: 'select', required: true },
    ]
  },
  {
    id: 'stationery',
    name: 'Stationery',
    description: 'Office and school supplies',
    fields: [
      { id: 'type', name: 'Item Type', type: 'select', required: true },
      { id: 'brand', name: 'Brand', type: 'text', required: false },
    ]
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    description: 'Educational toys and games',
    fields: [
      { id: 'ageGroup', name: 'Age Group', type: 'select', required: true },
      { id: 'brand', name: 'Brand', type: 'text', required: false },
    ]
  }
]

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: File[];
  stock: number;
  status: 'draft' | 'published';
  [key: string]: any;
}

interface Category {
  id: string;
  name: string;
  description: string;
  fields: any[];
}

interface Store {
  products: Product[];
  categories: CategoryType[];
  addCategory: (category: Omit<CategoryType, 'id'>) => void;
  deleteCategory: (categoryId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  getCategoryName: (categoryId: string) => string;
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
    categories: [...state.categories, { ...category, id: Date.now().toString() }]
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
    products: [...state.products, { ...product, id: Date.now().toString() } as Product]
  })),

  getCategoryName: (categoryId: string) => {
    const category = get().categories.find(c => c.id === categoryId)
    return category?.name || categoryId
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
