import type { StockMovement, InventoryItem } from '../types/inventoryTypes'

export function checkStockLevel(item: InventoryItem) {
  if (item.currentStock === 0) {
    return 'out_of_stock'
  }
  if (item.currentStock <= item.minimumStock) {
    return 'low_stock'
  }
  return null
}

export function shouldNotify(
  currentStock: number, 
  minimumStock: number, 
  lastNotified?: string
) {
  if (!lastNotified) return true
  
  // Don't notify more than once per hour
  const hoursSinceLastNotification = (
    Date.now() - new Date(lastNotified).getTime()
  ) / (1000 * 60 * 60)
  
  return hoursSinceLastNotification >= 1
}

export function generateNotificationMessage(
  type: 'low_stock' | 'out_of_stock',
  productName: string,
  currentStock: number,
  threshold: number
) {
  switch (type) {
    case 'out_of_stock':
      return `${productName} is out of stock!`
    case 'low_stock':
      return `${productName} is running low (${currentStock}/${threshold})`
  }
}
