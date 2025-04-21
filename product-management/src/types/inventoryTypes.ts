/**
 * Defines the possible types of stock movements in the inventory system
 * - 'in': Stock additions (purchases, returns)
 * - 'out': Stock removals (sales, damages)
 * - 'adjustment': Manual stock corrections
 */
export type StockMovementType = 'in' | 'out' | 'adjustment';

/**
 * Represents a single stock movement transaction
 */
export interface StockMovement {
  id: string;
  productId: string;
  type: StockMovementType;
  quantity: number;
  date: string;
  notes: string;
  /**
   * Reference number for tracking (e.g., order number, invoice number)
   */
  reference?: string;
}

/**
 * Represents the current inventory state of a product
 */
export interface InventoryItem {
  productId: string;
  productName: string;
  categoryId: string;
  currentStock: number;
  minimumStock: number;
  lastUpdated: string;
  movements: StockMovement[];
  /**
   * Threshold for triggering low stock alerts
   */
  alertThreshold?: number;
  /**
   * Timestamp of the last alert sent
   */
  lastAlertDate?: string;
}

/**
 * Types of inventory alerts
 */
export type AlertType = 'low_stock' | 'out_of_stock' | 'reorder_point';

/**
 * Structure for inventory alerts
 */
export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  type: AlertType;
  threshold: number;
  currentStock: number;
  createdAt: string;
  status: 'active' | 'resolved';
}
