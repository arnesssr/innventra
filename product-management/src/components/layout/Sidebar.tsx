import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Book, 
  BookOpen, 
  Gift, 
  PenTool, 
  Gamepad,
  Settings,
  ChevronRight,
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
      "fixed left-0 top-0 h-screen border-r bg-card transition-all duration-300 z-50",
      expanded ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <button 
          onClick={() => onToggle(!expanded)}
          className="mb-8 p-2 hover:bg-accent rounded-lg w-full flex justify-center"
        >
          <Menu size={20} />
        </button>
        
        <nav className="space-y-2">
          <NavLink to="/" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
            <LayoutDashboard size={20} />
            {expanded && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/categories/books" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
            <Book size={20} />
            {expanded && <span>Books</span>}
          </NavLink>

          <NavLink to="/categories/bibles" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
            <BookOpen size={20} />
            {expanded && <span>Bibles</span>}
          </NavLink>

          <NavLink to="/categories/gifts" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
            <Gift size={20} />
            {expanded && <span>Gifts & Cards</span>}
          </NavLink>

          <NavLink to="/categories/stationery" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
            <PenTool size={20} />
            {expanded && <span>Stationery</span>}
          </NavLink>

          <NavLink to="/categories/toys" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
            <Gamepad size={20} />
            {expanded && <span>Toys & Games</span>}
          </NavLink>

          <NavLink to="/settings" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
            <Settings size={20} />
            {expanded && <span>Settings</span>}
          </NavLink>
        </nav>
      </div>
    </aside>
  )
}
