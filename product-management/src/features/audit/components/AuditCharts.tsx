import { Card } from "../../../components/ui/Card"
import { useStore } from "../../../store/useStore"

export function AuditCharts() {
  const logs = useStore(state => state.auditLogs)

  // Empty for now, will be implemented with other visualizations later
  return null
}
