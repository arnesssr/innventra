import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Package, DollarSign, Users, ShoppingCart } from "lucide-react"
import { AnalyticsChart } from "../../components/dashboard/AnalyticsChart"

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

export function DashboardPage() {
  const stats: StatCardProps[] = [
    {
      title: "Total Products",
      value: "2,350",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      trend: "+20.1%"
    },
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      trend: "+15%"
    }
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalyticsChart />
      </div>
    </div>
  )
}
