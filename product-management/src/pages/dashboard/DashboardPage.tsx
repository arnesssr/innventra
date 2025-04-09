import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Book, DollarSign, ShoppingBag, Archive } from "lucide-react"

export function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "KES 45,231",
      description: "+20.1% from last month",
      icon: <DollarSign className="h-5 w-5 text-muted-foreground/70" />,
    },
    {
      title: "Products",
      value: "2,350",
      description: "120 added this month",
      icon: <ShoppingBag className="h-5 w-5 text-muted-foreground/70" />,
    },
    {
      title: "Drafts",
      value: "12",
      description: "Products pending review",
      icon: <Archive className="h-5 w-5 text-muted-foreground/70" />,
    },
    {
      title: "Categories",
      value: "6",
      description: "Across all sections",
      icon: <Book className="h-5 w-5 text-muted-foreground/70" />,
    },
  ]

  return (
    <div className="space-y-6 p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
