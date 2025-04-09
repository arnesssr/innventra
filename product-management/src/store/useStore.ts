import { create } from 'zustand'
import { Category } from '../types/category'

const DEFAULT_CATEGORIES: Category[] = [
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

interface Store {
  products: Product[];
  categories: Category[];
  addCategory: (category: Category) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
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
  addCategory: (category: Category) => set(state => ({
    categories: [...state.categories, category]
  })),
  addProduct: (product) => set(state => ({
    products: [...state.products, { ...product, id: Date.now().toString() }]
  })),
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
