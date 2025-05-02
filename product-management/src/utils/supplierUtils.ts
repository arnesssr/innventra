import type { Supplier, PurchaseOrder } from "../types/supplierTypes"

export function calculateTotalSpentWithSupplier(purchaseOrders: PurchaseOrder[], supplierId: string): number {
interface OrderItem {
    price: number;
    quantity: number;
}

return purchaseOrders
    .filter((po: PurchaseOrder) => po.supplierId === supplierId)
    .reduce((total: number, po: PurchaseOrder) => 
        total + po.items.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0)
    , 0)
}

export function getSupplierPerformanceMetrics(supplier: Supplier, purchaseOrders: PurchaseOrder[]) {
  const supplierOrders = purchaseOrders.filter(po => po.supplierId === supplier.id)
  
  return {
    totalOrders: supplierOrders.length,
    completedOrders: supplierOrders.filter(po => po.status === 'completed').length,
    totalSpent: calculateTotalSpentWithSupplier(purchaseOrders, supplier.id),
    onTimeDelivery: supplierOrders.filter(po => 
      po.status === 'completed' && 
      new Date(po.completedAt!) <= new Date(po.expectedDeliveryDate!)
    ).length / supplierOrders.length * 100,
    averageDeliveryTime: calculateAverageDeliveryTime(supplierOrders)
  }
}

function calculateAverageDeliveryTime(orders: PurchaseOrder[]): number {
  const completedOrders = orders.filter(o => o.status === 'completed' && o.completedAt)
  if (!completedOrders.length) return 0

  return completedOrders.reduce((sum, order) => {
    const created = new Date(order.createdAt)
    const completed = new Date(order.completedAt!)
    return sum + (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24) // Convert to days
  }, 0) / completedOrders.length
}
