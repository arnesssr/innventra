export interface Category {
  id: string;
  name: string;
  description: string;
  fields: Field[];
}

export interface Field {
  id?: string;
  name: string;
  type: 'text' | 'number' | 'select';
  required: boolean;
  options?: string[];
}

export const DEFAULT_FIELDS: Field[] = [
  { name: 'Product Name', type: 'text', required: true },
  { name: 'Price', type: 'number', required: true },
  { name: 'Stock', type: 'number', required: true },
  { name: 'Description', type: 'text', required: false }
]
