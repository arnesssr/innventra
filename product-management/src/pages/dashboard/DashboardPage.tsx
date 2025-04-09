import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Book, Bible, Gift, PenTool, Gamepad } from "lucide-react"
import { AnalyticsChart } from "../../components/dashboard/AnalyticsChart"

export function DashboardPage() {
  const stats = [
    {
      title: "Total Books",
      value: "1,245",
      icon: <Book className="h-4 w-4 text-muted-foreground" />,
      trend: "+12%"
    },
    {
      title: "Bible Sales",
      value: "842",
      icon: <Bible className="h-4 w-4 text-muted-foreground" />,
      trend: "+18%"
    },
    {
      title: "Gifts & Cards",
      value: "523",
      icon: <Gift className="h-4 w-4 text-muted-foreground" />,
      trend: "+8%"
    },
    {
      title: "Stationery",
      value: "234",
      icon: <PenTool className="h-4 w-4 text-muted-foreground" />,
      trend: "+5%"
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
