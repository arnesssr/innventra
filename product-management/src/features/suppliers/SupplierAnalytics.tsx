import { Card } from "../../components/ui/Card"
import { useStore } from "../../store/useStore"
import { PackageCheck, Clock, AlertTriangle, BadgeDollarSign } from "lucide-react"
import { cn } from "../../lib/utils"

export function SupplierAnalytics() {
  const suppliers = useStore(state => state.suppliers)
  const inventory = useStore(state => state.inventory)
  const purchaseOrders = useStore(state => state.purchaseOrders)

  const stats = [
    {
      label: "Active Suppliers",
      value: suppliers.filter(s => s.status === 'active').length,
      description: "Currently active suppliers",
      icon: PackageCheck,
      className: "text-green-500"
    },
    {
      label: "Pending Purchase Orders",
      value: purchaseOrders?.filter((po: { status: string }) => po.status === 'pending').length || 0,
      description: "Awaiting fulfillment",
      icon: Clock,
      className: "text-orange-500"
    },
    {
      label: "Out of Stock Items",
      value: Object.values(inventory).filter(item => item.currentStock === 0).length,
      description: "Needs immediate reorder",
      icon: AlertTriangle,
      className: "text-red-500"
    },
    {
      label: "Total Purchase Value",
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(purchaseOrders?.reduce((sum: any, po: { items: any[] }) => 
        sum + po.items.reduce((total, item) => total + (item.price * item.quantity), 0), 0
      ) || 0),
      description: "All time purchase value",
      icon: BadgeDollarSign,
      className: "text-blue-500"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
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
          <p className="mt-2 text-xs text-muted-foreground">{stat.description}</p>
        </Card>
      ))}
    </div>
  )
}