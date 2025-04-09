import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Book, 
  BookOpen, 
  Gift, 
  PenTool, 
  Gamepad,
  Settings,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-card p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold">Christian Bookstore</h2>
      </div>
      
      <nav className="space-y-2">
        <NavLink to="/" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Book size={20} />
              <span>Categories</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="ml-8 mt-2 space-y-2">
              <NavLink to="/categories/books" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                <Book size={16} />
                <span>Books</span>
              </NavLink>
              <NavLink to="/categories/bibles" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                <BookOpen size={16} />
                <span>Bibles</span>
              </NavLink>
              <NavLink to="/categories/gifts" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                <Gift size={16} />
                <span>Gifts & Cards</span>
              </NavLink>
              <NavLink to="/categories/stationery" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                <PenTool size={16} />
                <span>Stationery</span>
              </NavLink>
              <NavLink to="/categories/toys" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                <Gamepad size={16} />
                <span>Toys & Games</span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink to="/settings" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  )
}
