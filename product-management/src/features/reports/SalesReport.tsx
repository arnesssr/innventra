import { Card } from "../../components/ui/Card"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"
import { useStore } from "../../store/useStore"
import { formatDate } from "../../lib/utils/dateUtils"
import { BarChart, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"

export function SalesReport() {
  const orders = useStore(state => state.orders)
  const stats = useStore(state => state.getOrderStats())

  // Calculate monthly revenue
  const monthlyRevenue = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'long' })
    acc[month] = (acc[month] || 0) + order.total
    return acc
  }, {} as Record<string, number>)

  // Sort months chronologically
  const sortedMonths = Object.entries(monthlyRevenue).sort((a, b) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    return months.indexOf(a[0]) - months.indexOf(b[0])
  })

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Order Value</p>
              <p className="text-2xl font-bold">
                ${stats.totalOrders ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold">
                {stats.totalOrders 
                  ? `${((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Revenue Overview */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Monthly Revenue</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>% of Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMonths.map(([month, revenue]) => (
              <TableRow key={month}>
                <TableCell>{month}</TableCell>
                <TableCell>${revenue.toFixed(2)}</TableCell>
                <TableCell>
                  {((revenue / stats.totalRevenue) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Recent Orders Table */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Orders</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(0, 5).map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
