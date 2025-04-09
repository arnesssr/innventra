import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'

export function Stats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Products"
        value="2,420"
        icon={<Package className="h-6 w-6" />}
        trend="+12.5%"
      />
      <StatCard
        title="Total Sales"
        value="$45,620"
        icon={<DollarSign className="h-6 w-6" />}
        trend="+8.2%"
      />
      <StatCard
        title="Active Orders"
        value="126"
        icon={<ShoppingCart className="h-6 w-6" />}
        trend="+4.1%"
      />
      <StatCard
        title="Total Customers"
        value="1,205"
        icon={<Users className="h-6 w-6" />}
        trend="+15.3%"
      />
    </div>
  )
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-green-500">{trend}</span>
      </div>
    </div>
  )
}
