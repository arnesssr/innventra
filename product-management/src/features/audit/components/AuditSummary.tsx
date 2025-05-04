import { Card } from "../../../components/ui/Card"
import { useStore } from "../../../store/useStore"
import { ActivitySquare, AlertTriangle, UserCog, Settings } from "lucide-react"

export function AuditSummary() {
  const logs = useStore(state => state.auditLogs)
  const today = new Date().toDateString()

  const stats = {
    todayEvents: logs.filter(log => 
      new Date(log.timestamp).toDateString() === today
    ).length,
    criticalEvents: logs.filter(log => log.severity === 'critical').length,
    userActions: logs.filter(log => 
      log.eventType.startsWith('user.') || 
      log.eventType.startsWith('product.') || 
      log.eventType.startsWith('order.')
    ).length,
    systemEvents: logs.filter(log => 
      log.eventType.startsWith('system.') || 
      log.eventType.startsWith('inventory.')
    ).length
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Today's Events</p>
            <p className="text-2xl font-bold">{stats.todayEvents}</p>
          </div>
          <ActivitySquare className="h-4 w-4 text-blue-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Critical Events</p>
            <p className="text-2xl font-bold text-red-500">{stats.criticalEvents}</p>
          </div>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">User Actions</p>
            <p className="text-2xl font-bold">{stats.userActions}</p>
          </div>
          <UserCog className="h-4 w-4 text-green-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">System Events</p>
            <p className="text-2xl font-bold">{stats.systemEvents}</p>
          </div>
          <Settings className="h-4 w-4 text-yellow-500" />
        </div>
      </Card>
    </div>
  )
}
