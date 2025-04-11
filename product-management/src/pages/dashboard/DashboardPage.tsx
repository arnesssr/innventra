import { useStore } from "../../store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { AlertTriangle, Package, TrendingUp, Clock, ArrowUp, ArrowDown, RefreshCw } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts'
import { useState, useMemo } from "react"

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week')
  const inventory = useStore(state => state.inventory)
  const products = useStore(state => state.products)
  const categories = useStore(state => state.categories)

  // Dynamic chart data calculation
  const chartData = useMemo(() => {
    // Category distribution
    const categoryData = categories.map(category => ({
      name: category.name,
      stock: products
        .filter(p => p.category === category.id)
        .reduce((acc, curr) => acc + curr.stock, 0),
      value: products
        .filter(p => p.category === category.id)
        .reduce((acc, curr) => acc + (curr.price * curr.stock), 0)
    }))

    // Stock movements trend
    const movements = Object.values(inventory)
      .flatMap(item => item.movements)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return { categoryData, movements }
  }, [categories, products, inventory])

  // Dynamic color generation
  const getColor = (index: number) => `hsl(${(index * 360) / categories.length}, 70%, 50%)`

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Header with Metrics */}
        <div className="col-span-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              title="Total Products"
              value={products.length}
              icon={<Package className="h-5 w-5" />}
              trend={+15}
            />
            <MetricCard
              title="Inventory Value"
              value={chartData.categoryData.reduce((acc, curr) => acc + curr.value, 0)}
              icon={<TrendingUp className="h-5 w-5" />}
              trend={+10}
            />
            <MetricCard
              title="Low Stock Alert"
              value={Object.values(inventory).filter(item => item.currentStock <= item.minimumStock).length}
              icon={<AlertTriangle className="h-5 w-5" />}
              trend={-5}
            />
            <MetricCard
              title="Recent Activity"
              value={chartData.movements.length}
              icon={<Clock className="h-5 w-5" />}
              trend={+20}
            />
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Stock Distribution</CardTitle>
              <div className="flex gap-2">
                {['day', 'week', 'month'].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(range as any)}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.categoryData}>
                  <defs>
                    {chartData.categoryData.map((_, index) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`gradient-${index}`}
                        x1="0" y1="0" x2="0" y2="1"
                      >
                        <stop offset="0%" stopColor={getColor(index)} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={getColor(index)} stopOpacity={0.3} />
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar
                    dataKey="stock"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                  >
                    {chartData.categoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#gradient-${index})`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Side Charts */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-white h-full">
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData.categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(index)} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-white h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chartData.movements.slice(0, 5).map((movement, index) => (
                  <div key={index} 
                    className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-white/50">
                    <div className="flex items-center gap-2">
                      {getMovementIcon(movement.type)}
                      <span className="font-medium">{movement.quantity} units</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(movement.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Helper component for metric cards
function MetricCard({ title, value, icon, trend }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: number;
}) {
  return (
    <Card className="backdrop-blur-sm bg-white/90 shadow-lg transition-all hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`p-2 rounded-full ${trend > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-sm text-muted-foreground">vs last period</span>
        </div>
      </CardContent>
    </Card>
  )
}
