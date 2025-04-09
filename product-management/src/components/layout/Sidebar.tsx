import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, ListOrdered, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-card p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold">Product Management</h2>
      </div>
      <nav className="space-y-2">
        <NavLink to="/" className="flex items-center gap-2 p-2 hover:bg-accent">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/products" className="flex items-center gap-2 p-2 hover:bg-accent">
          <Package size={20} />
          <span>Products</span>
        </NavLink>
        <NavLink to="/categories" className="flex items-center gap-2 p-2 hover:bg-accent">
          <ListOrdered size={20} />
          <span>Categories</span>
        </NavLink>
        <NavLink to="/settings" className="flex items-center gap-2 p-2 hover:bg-accent">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  )
}
