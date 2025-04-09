export interface Field {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'date';
  required: boolean;
  options?: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  fields: Field[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: SubCategory[];
}

export const DEFAULT_FIELDS: Field[] = [
  { id: 'name', name: 'Product Name', type: 'text', required: true },
  { id: 'price', name: 'Price', type: 'number', required: true },
  { id: 'stock', name: 'Stock', type: 'number', required: true },
  { id: 'description', name: 'Description', type: 'text', required: false }
]
