import { useStore } from "../../store/useStore"
import { Card } from "../../components/ui/Card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export function OrderAnalytics() {
  const orders = useStore(state => state.orders)
  const stats = useStore(state => state.getOrderStats())

  // Calculate daily orders for the last 7 days
  const dailyOrders = [...Array(7)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayOrders = orders.filter(order => 
      order.createdAt.split('T')[0] === dateStr
    )

    return {
      date: dateStr,
      orders: dayOrders.length,
      revenue: dayOrders.reduce((sum, order) => sum + order.total, 0)
    }
  }).reverse()

  // Statistics Cards
  const statCards = [
    { label: "Total Orders", value: stats.totalOrders },
    { 
      label: "Total Revenue", 
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(stats.totalRevenue)
    },
    { label: "Pending Orders", value: stats.pendingOrders },
    { label: "Completed Orders", value: stats.completedOrders }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(stat => (
          <Card key={stat.label} className="p-4">
            <h3 className="text-sm text-muted-foreground">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, "Revenue"]}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Daily Orders</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Bar 
                  dataKey="orders" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
