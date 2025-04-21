export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  paymentTerms?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}
