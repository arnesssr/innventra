export type StockMovementType = 'in' | 'out' | 'adjustment'

export interface StockMovement {
  id: string
  productId: string
  type: StockMovementType
  quantity: number
  date: string
  notes: string
}

export interface InventoryItem {
  productId: string
  productName: string
  categoryId: string
  currentStock: number
  minimumStock: number
  lastUpdated: string
  movements: StockMovement[]
}
