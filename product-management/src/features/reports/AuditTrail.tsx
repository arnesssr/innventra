import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { Card } from "../../components/ui/Card"
import { formatDate } from "../../lib/utils/dateUtils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { useState } from "react"

interface AuditEntry {
  id: string
  action: string
  userId: string
  entityType: 'product' | 'order' | 'inventory' | 'supplier'
  entityId: string
  details: string
  timestamp: string
  severity: 'info' | 'warning' | 'critical'
}

export function AuditTrail() {
  const [filter, setFilter] = useState<'all' | AuditEntry['entityType']>('all')
  const auditLogs: AuditEntry[] = [] // Will come from store

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">System Audit Log</h3>
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="product">Products</SelectItem>
            <SelectItem value="order">Orders</SelectItem>
            <SelectItem value="inventory">Inventory</SelectItem>
            <SelectItem value="supplier">Suppliers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs
              .filter(log => filter === 'all' || log.entityType === filter)
              .map(log => (
                <TableRow key={log.id}>
                  <TableCell>{formatDate(log.timestamp)}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.userId}</TableCell>
                  <TableCell>{log.entityType}</TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
