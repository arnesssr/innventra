import type { AuditEventType, AuditLog, AuditSeverity } from '../../../types/auditTypes'
import { EVENT_TYPES } from '../../../types/auditTypes'
import { create } from 'zustand'
import { eventBus } from '../../../lib/eventBus'

interface AuditStore {
  logs: AuditLog[]
  addLog: (log: AuditLog) => void
  getLogs: () => AuditLog[]
}

// Create a dedicated audit store
const useAuditStore = create<AuditStore>((set, get) => ({
  logs: [],
  addLog: (log) => set(state => ({ 
    logs: [log, ...state.logs] 
  })),
  getLogs: () => get().logs
}))

export const AUDIT_ACTIONS = {
  PRODUCT: {
    CREATE: 'product.create' as AuditEventType,
    UPDATE: 'product.update' as AuditEventType,
    DELETE: 'product.delete' as AuditEventType,
    ARCHIVE: 'product.archive' as AuditEventType,
  },
  ORDER: {
    CREATE: 'order.create' as AuditEventType,
    UPDATE: 'order.update' as AuditEventType,
    STATUS_CHANGE: 'order.status_change' as AuditEventType,
  },
  INVENTORY: {
    ADJUST: 'inventory.adjust' as AuditEventType,
  },
  USER: {
    LOGIN: 'user.login' as AuditEventType,
    LOGOUT: 'user.logout' as AuditEventType,
  }
} as const

export class AuditService {
  static updateLog(id: string, arg1: { reviewed: boolean; reviewedAt: string; reviewedBy: any; id: string; timestamp: string; eventType: AuditEventType; userId: string; userName: string; details: string; severity: AuditSeverity; metadata?: Record<string, any> }) {
      throw new Error("Method not implemented.")
  }
  static readonly EVENTS = EVENT_TYPES

  static async logAction(
    action: AuditEventType,
    userId: string,
    details: string,
    options: {
      severity?: AuditSeverity
      metadata?: Record<string, any>
      ipAddress?: string
      sessionId?: string
      relatedEvents?: string[]
      changes?: Record<string, any>
    }
  ): Promise<AuditLog> {
    const auditLog: AuditLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      eventType: action,
      userId,
      userName: options.metadata?.userName || 'System',
      details,
      severity: options.severity || 'info',
      metadata: {
        ...options.metadata,
        ipAddress: options.ipAddress,
        sessionId: options.sessionId,
        relatedEvents: options.relatedEvents,
        changes: options.changes
      },
      reviewed: undefined
    }

    // Store in local storage
    const existingLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    localStorage.setItem('auditLogs', JSON.stringify([auditLog, ...existingLogs]))

    // Publish event for real-time updates
    eventBus.publish('auditLog.created', auditLog)

    // Update audit store directly
    useAuditStore.getState().addLog(auditLog)

    return auditLog
  }

  static getAuditLogs(page: number, pageSize: number): AuditLog[] {
    const logs = useAuditStore.getState().getLogs()
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return logs.slice(startIndex, endIndex)
  }

  static subscribeToAuditLogs(callback: (log: AuditLog) => void) {
    return eventBus.subscribe('auditLog.created', callback)
  }

  static exportLogs(format: 'csv' | 'pdf' | 'json'): string {
    const logs = useAuditStore.getState().getLogs()
    switch (format) {
      case 'csv':
        return logs.map(log => Object.values(log).join(',')).join('\n')
      case 'pdf':
        // Placeholder for PDF generation logic
        return 'PDF export is not implemented yet.'
      case 'json':
        return JSON.stringify(logs, null, 2)
      default:
        throw new Error('Unsupported export format')
    }
  }
}
