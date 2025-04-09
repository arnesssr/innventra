import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package,
  FileText,
  Settings,
  Menu
} from 'lucide-react'
import { cn } from "../../lib/utils"

interface SidebarProps {
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={22} />, label: 'Dashboard' },
    { path: '/products', icon: <Package size={22} />, label: 'Products' },
    { path: '/drafts', icon: <FileText size={22} />, label: 'Drafts' },
    { path: '/settings', icon: <Settings size={22} />, label: 'Settings' }
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
          {menuItems.map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
              title={!expanded ? label : undefined}
              className={({ isActive }) => cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors min-h-[48px]",
                "hover:bg-accent hover:text-accent-foreground",
                expanded ? "justify-start" : "justify-center",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <div className="flex-shrink-0">
                {icon}
              </div>
              {expanded && <span className="text-base font-medium">{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
