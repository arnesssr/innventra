export type SupplierStatus = 'active' | 'inactive' | 'pending'

export interface Supplier {
  id: string
  name: string
  email: string
  phone?: string
  status: SupplierStatus
  notes?: string
  createdAt: string
  lastOrderAmount?: number
  lastOrderDate?: string
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

export interface PurchaseOrder {
  id: string
  supplierId: string
  orderNumber: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  completedAt?: string
  expectedDeliveryDate?: string
  notes?: string
  total: number
}
