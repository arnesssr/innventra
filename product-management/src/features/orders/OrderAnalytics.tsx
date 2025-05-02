import { useStore } from "../../store/useStore"
import { Card } from "../../components/ui/Card"
import { ShoppingBag, Clock, CheckCircle, DollarSign } from "lucide-react"
import { cn } from "../../lib/utils"

export function OrderAnalytics() {
  const stats = useStore(state => state.getOrderStats())

  const statCards = [
    { 
      label: "Total Orders", 
      value: stats.totalOrders,
      icon: ShoppingBag,
      className: "text-blue-500"
    },
    { 
      label: "Total Revenue", 
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(stats.totalRevenue),
      icon: DollarSign,
      className: "text-green-500"
    },
    { 
      label: "Pending Orders", 
      value: stats.pendingOrders,
      icon: Clock,
      className: "text-orange-500"
    },
    { 
      label: "Completed Orders", 
      value: stats.completedOrders,
      icon: CheckCircle,
      className: "text-emerald-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map(stat => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-background rounded-lg">
              <stat.icon className={cn("w-6 h-6", stat.className)} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
