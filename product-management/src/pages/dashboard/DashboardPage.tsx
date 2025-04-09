import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { AnalyticsChart } from "../../components/dashboard/AnalyticsChart"
import { ProductForm } from "../../components/products/ProductForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"

interface DashboardStat {
  id: string;
  title: string;
  value: number;
  icon: JSX.Element;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="space-y-6 p-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              <div>Loading stats...</div>
            ) : (
              stats.map((stat) => (
                <Card key={stat.id}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                    <p className={`text-xs ${stat.trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.trend.isPositive ? '+' : '-'}{Math.abs(stat.trend.value)}%
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <AnalyticsChart />
          </div>
        </TabsContent>

        <TabsContent value="add-product">
          <ProductForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
