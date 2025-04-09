export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: SubCategory[];
  defaultFields: Field[];
}

export interface SubCategory {
  id: string;
  name: string;
  fields: Field[];
}

export interface Field {
  name: string;
  type: 'text' | 'number' | 'select';
  required: boolean;
  options?: string[];
}

export const DEFAULT_FIELDS: Field[] = [
  { name: 'name', type: 'text', required: true },
  { name: 'price', type: 'number', required: true },
  { name: 'stock', type: 'number', required: true },
  { name: 'description', type: 'text', required: false }
]
