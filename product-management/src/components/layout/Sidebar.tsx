import { NavLink } from "react-router-dom"
import { LayoutDashboard, Store, Boxes, Settings, ChevronRight, BarChart, Truck, ShoppingBag, MessageSquare } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"

interface SidebarProps {
  expanded: boolean
  onToggle: () => void
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  const links = [
    { href: "/app", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/app/products", icon: Store, label: "Products" },
    { href: "/app/inventory", icon: Boxes, label: "Inventory" },
    { href: "/app/suppliers", icon: Truck, label: "Suppliers" },
    { href: "/app/orders", icon: ShoppingBag, label: "Sales Orders" },
    { href: "/app/messages", icon: MessageSquare, label: "Messages" },
    { 
      href: "/app/reports", 
      icon: BarChart, 
      label: "Reports"
    },
    { href: "/app/settings", icon: Settings, label: "Settings" }
  ]

  return (
    <aside className={cn(
      "h-screen sticky top-0 border-r bg-card transition-all duration-300",
      expanded ? "w-64" : "w-[70px]"
    )}>
      <div className="flex h-16 items-center border-b px-4 justify-between">
        {expanded && <span className="font-semibold text-lg">StockBridge</span>}
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            expanded && "rotate-180"
          )} />
        </Button>
      </div>
      <nav className="space-y-2 p-2">
        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
              )
            }
          >
            <link.icon className="h-5 w-5" />
            {expanded && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
