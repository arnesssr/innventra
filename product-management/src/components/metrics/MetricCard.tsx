import { Card, CardContent } from "../ui/Card"

interface MetricCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend: number
}

/**
 * MetricCard Component
 * Displays a metric with its trend compared to previous period
 */
export function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  const formatTrend = (value: number) => {
    return `${value > 0 ? '↑' : '↓'} ${Math.abs(value).toFixed(1)}%`
  }

  return (
    <Card className="metric-card">
      <CardContent className="metric-content">
        <div className="metric-header">
          <div className="metric-info">
            <p className="metric-title">{title}</p>
            <p className="metric-value">{value.toLocaleString()}</p>
          </div>
          <div className={`p-2 rounded-full ${trend > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            {icon}
          </div>
        </div>
        <div className="metric-trend">
          <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {formatTrend(trend)}
          </span>
          <span className="text-sm text-muted-foreground">
            vs previous month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
