export type SupplierStatus = 'active' | 'inactive' | 'pending'

export interface Supplier {
  id: string
  name: string
  email: string
  phone?: string
  status: SupplierStatus
  notes?: string
  createdAt: string
  address?: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }
}

export interface SupplierProduct {
  productId: string
  supplierId: string
  unitPrice: number
  minOrderQuantity?: number
  leadTime?: number // in days
}
