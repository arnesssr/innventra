import { useStore } from '../../../store/useStore'
import { AuditService } from '../services/auditService'
import type { AuditEventType } from '../../../types/auditTypes'

export function useAuditLog() {
  const currentUser = useStore(state => state.currentUser)

  const logAction = async (
    action: AuditEventType,
    details: string,
    metadata?: Record<string, any>
  ) => {
    if (!currentUser) return

    await AuditService.logAction(action, currentUser.id, details, {
      metadata: {
        userName: currentUser.fullName,
        ...metadata
      }
    })
  }

  return {
    logAction,
    events: AuditService.EVENTS
  }
}
