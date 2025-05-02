import type { StockMovement, InventoryItem } from '../types/inventoryTypes'

// Error types
export class NotificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotificationError'
  }
}

// Validation functions
function validateStockLevel(currentStock: number, minimumStock: number) {
  if (currentStock < 0) throw new NotificationError('Stock level cannot be negative')
  if (minimumStock < 0) throw new NotificationError('Minimum stock cannot be negative')
}

export function checkStockLevel(item: InventoryItem) {
  try {
    if (!item) throw new NotificationError('Invalid inventory item')
    validateStockLevel(item.currentStock, item.minimumStock)

    if (item.currentStock === 0) {
      return 'out_of_stock'
    }
    if (item.currentStock <= item.minimumStock) {
      return 'low_stock'
    }
    return null
  } catch (error) {
    console.error('Stock level check failed:', error)
    return null
  }
}

export function shouldNotify(
  currentStock: number,
  minimumStock: number,
  lastNotified?: string
) {
  try {
    validateStockLevel(currentStock, minimumStock)

    if (!lastNotified) return true

    const lastNotifiedDate = new Date(lastNotified)
    if (isNaN(lastNotifiedDate.getTime())) {
      throw new NotificationError('Invalid notification date')
    }

    const hoursSinceLastNotification = (
      Date.now() - lastNotifiedDate.getTime()
    ) / (1000 * 60 * 60)

    // Configurable notification thresholds
    const NOTIFICATION_COOLDOWN = 1 // hours
    const URGENT_THRESHOLD = 0 // Immediate notification for zero stock

    return currentStock === 0 
      ? true // Always notify for out of stock
      : hoursSinceLastNotification >= NOTIFICATION_COOLDOWN
  } catch (error) {
    console.error('Notification check failed:', error)
    return false // Fail safe - don't notify if there's an error
  }
}

export function generateNotificationMessage(
  type: 'low_stock' | 'out_of_stock',
  productName: string,
  currentStock: number,
  threshold: number
) {
  try {
    if (!productName) throw new NotificationError('Product name is required')
    validateStockLevel(currentStock, threshold)

    const messages = {
      out_of_stock: `URGENT: ${productName} is out of stock! Immediate action required.`,
      low_stock: `WARNING: ${productName} stock is low (${currentStock}/${threshold}). Please reorder soon.`
    }

    return messages[type] || 'Stock level notification'
  } catch (error) {
    console.error('Message generation failed:', error)
    return 'Stock notification error occurred'
  }
}

// New utility functions
export function getNotificationPriority(
  type: 'low_stock' | 'out_of_stock',
  currentStock: number,
  minimumStock: number
): 'high' | 'medium' | 'low' {
  try {
    validateStockLevel(currentStock, minimumStock)
    
    if (type === 'out_of_stock') return 'high'
    if (currentStock <= minimumStock * 0.5) return 'medium'
    return 'low'
  } catch (error) {
    console.error('Priority check failed:', error)
    return 'low' // Default to low priority on error
  }
}

export function shouldSendEmailNotification(
  type: 'low_stock' | 'out_of_stock',
  currentStock: number,
  minimumStock: number
): boolean {
  return getNotificationPriority(type, currentStock, minimumStock) === 'high'
}

// Add more notification types
export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error'

export interface SystemNotification {
  id: string
  title: string
  message: string
  type: NotificationSeverity
  timestamp: string
  read: boolean
  actionUrl?: string
}

// Add business notifications
export type NotificationType = 
  | 'low_stock' 
  | 'out_of_stock'
  | 'order_created'
  | 'order_completed'
  | 'supplier_added'
  | 'payment_received'
  | 'error'
  | 'success'
  | 'warning'

export type BusinessEvent = 
  | { type: 'order_created'; orderId: string; total: number }
  | { type: 'stock_alert'; productId: string; stock: number }
  | { type: 'payment_received'; orderId: string; amount: number }
  | { type: 'supplier_added'; supplierId: string }

export function createBusinessNotification(event: BusinessEvent): SystemNotification {
  const id = `${event.type}-${Date.now()}`
  const timestamp = new Date().toISOString()

  switch (event.type) {
    case 'order_created':
      return {
        id,
        title: 'New Order',
        message: `New order #${event.orderId} received for $${event.total}`,
        type: 'info',
        timestamp,
        read: false,
        actionUrl: `/app/orders/${event.orderId}`
      }
    // Add other cases for different business events
    case 'stock_alert':
      return {
        id,
        title: 'Stock Alert',
        message: `Product #${event.productId} has low stock (${event.stock})`,
        type: 'warning',
        timestamp,
        read: false
      }
    case 'payment_received':
      return {
        id,
        title: 'Payment Received',
        message: `Payment of $${event.amount} received for order #${event.orderId}`,
        type: 'success',
        timestamp,
        read: false
      }
    case 'supplier_added':
      return {
        id,
        title: 'Supplier Added',
        message: `New supplier #${event.supplierId} has been added`,
        type: 'info',
        timestamp,
        read: false
      }
    default:
      throw new NotificationError('Unknown business event type')
  }
}

// Add notification display utils
export function getSeverityColor(severity: NotificationSeverity): string {
  switch (severity) {
    case 'error': return 'text-red-500'
    case 'warning': return 'text-yellow-500'
    case 'success': return 'text-green-500'
    default: return 'text-blue-500'
  }
}

// Add business notifications
export function generateBusinessNotification(
  type: NotificationType,
  data: {
    orderNumber?: string
    customerName?: string
    amount?: number
    supplierName?: string
    errorMessage?: string
  }
) {
  switch (type) {
    case 'order_created':
      return `New order #${data.orderNumber} received from ${data.customerName}`
    case 'order_completed':
      return `Order #${data.orderNumber} has been completed`
    case 'payment_received':
      return `Payment of $${data.amount} received for order #${data.orderNumber}`
    case 'supplier_added':
      return `New supplier ${data.supplierName} has been added`
    case 'error':
      return `Error: ${data.errorMessage}`
    default:
      return 'Notification'
  }
}

// Add priority levels for notifications
export function getNotificationUrgency(type: NotificationType): 'high' | 'medium' | 'low' {
  switch (type) {
    case 'out_of_stock':
    case 'error':
      return 'high'
    case 'low_stock':
    case 'order_created':
      return 'medium'
    default:
      return 'low'
  }
}
