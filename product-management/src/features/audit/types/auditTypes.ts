export type AuditEventType = 
  | 'product.create' 
  | 'product.update'
  | 'product.delete'
  | 'order.create'
  | 'order.update'
  | 'order.status_change'
  | 'inventory.adjust'
  | 'user.login'
  | 'user.logout'
  | 'system.error'
  | 'system.warning'
  | 'system.info'

export type AuditResource = 
  | 'product'
  | 'inventory'
  | 'order'
  | 'user'
  | 'system'

export type AuditSeverity = 'info' | 'warning' | 'critical'

export interface AuditLog {
  id: string
  timestamp: string
  eventType: AuditEventType
  resource: AuditResource  // Add this property
  userId: string
  userName: string
  details: string
  severity: AuditSeverity
  metadata?: Record<string, any>
}
