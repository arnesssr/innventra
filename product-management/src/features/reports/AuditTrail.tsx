import { useState, useEffect } from "react"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { Card } from "../../components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { formatDate } from "../../lib/utils/dateUtils"
import { useStore } from "../../store/useStore"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { EVENT_TYPES, type AuditEventType, type AuditSeverity } from "../../types/auditTypes"
import { AuditService } from "../audit/services/auditService"
import React from "react"

interface AuditTrailProps {
  defaultSeverity?: AuditSeverity
  defaultType?: AuditEventType | 'all'
}

interface FilterState {
  eventType: AuditEventType | 'all'
  severity: AuditSeverity | 'all'
  startDate: string
  endDate: string
  user: string
  resourceType: string
}

export function AuditTrail({ defaultSeverity, defaultType }: AuditTrailProps) {
  const [filters, setFilters] = useState<FilterState>({
    eventType: defaultType || 'all',
    severity: defaultSeverity || 'all',
    startDate: '',
    endDate: '',
    user: '',
    resourceType: ''
  })

  const logs = useStore(state => state.getAuditLogs({
    eventType: filters.eventType === 'all' ? undefined : filters.eventType,
    severity: filters.severity === 'all' ? undefined : filters.severity,
    startDate: filters.startDate ? new Date(filters.startDate) : undefined,
    endDate: filters.endDate ? new Date(filters.endDate) : undefined,
    user: filters.user || undefined,
    resourceType: filters.resourceType || undefined
  }))

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = AuditService.subscribeToAuditLogs((newLog) => {
      useStore.getState().addAuditLog(newLog)
    })

    // Load initial logs from localStorage
    const savedLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    useStore.getState().setAuditLogs(savedLogs)

    return () => unsubscribe()
  }, [])

  const getSeverityIcon = (severity: AuditSeverity) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'info': return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  // Create event type options array
  const eventTypeOptions = Object.values(EVENT_TYPES)
    .flatMap(category => Object.values(category)) as AuditEventType[]

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <Select
            value={filters.eventType}
            onValueChange={(value) => {
              setFilters(prev => ({ ...prev, eventType: value as FilterState['eventType'] }))
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {eventTypeOptions.map(type => (
                <SelectItem key={type} value={type}>
                  {formatEventType(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.severity}
            onValueChange={(value: AuditSeverity | 'all') => 
              setFilters(prev => ({ ...prev, severity: value }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-[180px]"
          />
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-[180px]"
          />
          <Input
            type="text"
            value={filters.user}
            onChange={(e) => setFilters(prev => ({ ...prev, user: e.target.value }))}
            placeholder="Filter by user"
            className="w-[180px]"
          />
          <Input
            type="text"
            value={filters.resourceType}
            onChange={(e) => setFilters(prev => ({ ...prev, resourceType: e.target.value }))}
            placeholder="Filter by resource type"
            className="w-[180px]"
          />
        </div>
      </Card>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell sortable>Time</TableCell>
              <TableCell sortable>Event</TableCell>
              <TableCell sortable>User</TableCell>
              <TableCell>Details</TableCell>
              <TableCell sortable>Severity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map(log => (
              <TableRow key={log.id} expandable>
                <TableCell>{formatDate(log.timestamp)}</TableCell>
                <TableCell>{log.eventType}</TableCell>
                <TableCell>{log.userId}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(log.severity)}
                    <span>{log.severity}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Export</Button>
                  <Button variant="outline" size="sm">Mark as Reviewed</Button>
                  <Button variant="outline" size="sm">Add Notes</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function formatEventType(type: AuditEventType): string {
  return type.split('.').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
