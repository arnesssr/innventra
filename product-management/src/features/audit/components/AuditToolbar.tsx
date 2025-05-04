import { Button } from "../../../components/ui/Button"
import { Calendar } from "../../../components/ui/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/Popover"
import { Download, Calendar as CalendarIcon, Filter } from "lucide-react"
import { useStore } from "../../../store/useStore"
import { format } from "date-fns"

export function AuditToolbar() {
  const { getAuditLogs } = useStore()
  
  const handleExport = async (format: 'csv' | 'json') => {
    const logs = getAuditLogs()
    let data: string

    if (format === 'csv') {
      const headers = ['Timestamp', 'Event Type', 'User', 'Details', 'Severity']
      const rows = logs.map(log => [
        log.timestamp,
        log.eventType,
        log.userName,
        log.details,
        log.severity
      ])
      data = [headers, ...rows].map(row => row.join(',')).join('\n')
    } else {
      data = JSON.stringify(logs, null, 2)
    }

    const blob = new Blob([data], { type: format === 'csv' ? 'text/csv' : 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-logs.${format}`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>

      <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
        <Download className="h-4 w-4 mr-2" />
        Export CSV
      </Button>

      <Button variant="outline" size="sm" onClick={() => handleExport('json')}>
        <Download className="h-4 w-4 mr-2" />
        Export JSON
      </Button>
    </div>
  )
}
