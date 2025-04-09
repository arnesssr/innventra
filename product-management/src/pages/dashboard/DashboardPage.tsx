import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Book, DollarSign, Archive } from "lucide-react"
import { useStore } from "../../store/useStore"

export function DashboardPage() {
  const stats = useStore(state => state.getStats())

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      description: `${stats.publishedCount} published`,
      icon: <Book className="h-5 w-5 text-muted-foreground/70" />,
    },
    {
      title: "Total Value",
      value: `KES ${stats.totalValue.toLocaleString()}`,
      description: "Stock value",
      icon: <DollarSign className="h-5 w-5 text-muted-foreground/70" />,
    },
    {
      title: "Drafts",
      value: stats.draftsCount.toString(),
      description: "Unpublished items",
      icon: <Archive className="h-5 w-5 text-muted-foreground/70" />,
    }
  ]

  return (
    <div className="space-y-6 p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground pt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add more dashboard sections here */}
    </div>
  )
}
