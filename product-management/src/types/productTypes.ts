export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  stock: number;
  description: string;
  status: 'draft' | 'published';
  createdAt?: string; // Make createdAt optional
  [key: string]: any;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  date: string;
  notes: string;
}

export interface CategoryField {
  name: string;
  type: 'text' | 'select' | 'number';
  label: string;
  required: boolean;
  options?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  fields: CategoryField[];
}
