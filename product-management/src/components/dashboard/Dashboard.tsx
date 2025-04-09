import { Stats } from './Stats'
import { RecentProducts } from './RecentProducts'
import { AnalyticsChart } from './AnalyticsChart'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <Stats />
      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsChart />
        <RecentProducts />
      </div>
    </div>
  )
}
