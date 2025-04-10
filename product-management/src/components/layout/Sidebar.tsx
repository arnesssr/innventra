import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package,
  Settings,
  Menu
} from 'lucide-react'
import { cn } from "../../lib/utils"

interface SidebarProps {
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/products", label: "Products", icon: Package },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen overflow-hidden border-r bg-card/50 backdrop-blur-sm transition-all duration-300 z-50 flex flex-col",
      expanded ? "w-64" : "w-16"
    )}>
      <div className="p-4 border-b">
        <button 
          onClick={() => onToggle(!expanded)}
          className="p-3 hover:bg-accent hover:text-accent-foreground rounded-lg w-full flex justify-center"
        >
          <Menu size={22} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              title={!expanded ? link.label : undefined}
              className={({ isActive }) => cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors min-h-[48px]",
                "hover:bg-accent hover:text-accent-foreground",
                expanded ? "justify-start" : "justify-center",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <link.icon className="w-5 h-5" />
              {expanded && <span className="text-base font-medium">{link.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
