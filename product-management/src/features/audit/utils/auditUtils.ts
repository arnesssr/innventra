import type { AuditEventType, AuditResource, AuditLog, AuditSeverity } from '../types/auditTypes'

export function createAuditEntry(
  userId: string,
  userName: string,
  eventType: AuditEventType,
  resource: AuditResource,
  details: string,
  severity: AuditSeverity,
  metadata?: Record<string, any>
): AuditLog {
  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    eventType,
    resource,
    userId,
    userName,
    details,
    severity,
    metadata
  }
}

export function formatAuditAction(action: AuditEventType): string {
  return action.replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export function getResourceFromEventType(eventType: AuditEventType): AuditResource {
  const [resource] = eventType.split('.')
  return resource as AuditResource
}
