export type OrderStatus = 
  | 'pending'      // Order placed but not confirmed
  | 'confirmed'    // Order confirmed, payment successful
  | 'processing'   // Order being prepared
  | 'shipped'      // Order in transit
  | 'delivered'    // Order delivered
  | 'cancelled'    // Order cancelled

export interface OrderItem {
  id: string
  productId: string
  name: string
  quantity: number
  price: number
  subtotal: number
}

export interface ShippingDetails {
  address: string
  city: string
  country: string
  postalCode: string
  recipient: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: OrderStatus
  items: OrderItem[]
  shipping: ShippingDetails
  payment: PaymentDetails
  timeline: OrderEvent[]
  total: number
}

export interface OrderEvent {
  status: OrderStatus
  date: string
  description: string
  location?: string
}

export interface PaymentDetails {
  method: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  transactionId?: string
}
