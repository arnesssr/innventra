import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Book, 
  BookOpen, 
  Gift, 
  PenTool, 
  Gamepad,
  Settings,
  Menu
} from 'lucide-react'
import { cn } from "../../lib/utils"

interface SidebarProps {
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen border-r bg-background transition-all duration-300 z-50",
      expanded ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <button 
          onClick={() => onToggle(!expanded)}
          className="mb-8 p-2 hover:bg-accent hover:text-accent-foreground rounded-lg w-full flex justify-center"
        >
          <Menu size={20} />
        </button>
        
        <nav className="space-y-2">
          {[
            { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
            { path: '/categories/books', icon: <Book size={20} />, label: 'Books' },
            { path: '/categories/bibles', icon: <BookOpen size={20} />, label: 'Bibles' },
            { path: '/categories/gifts', icon: <Gift size={20} />, label: 'Gifts & Cards' },
            { path: '/categories/stationery', icon: <PenTool size={20} />, label: 'Stationery' },
            { path: '/categories/toys', icon: <Gamepad size={20} />, label: 'Toys & Games' },
            { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
          ].map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => cn(
                "flex items-center gap-2 p-2 rounded-lg transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {icon}
              {expanded && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
