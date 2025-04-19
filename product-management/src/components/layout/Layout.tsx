import { Outlet } from "react-router-dom"
import { TopBar } from "./TopBar"
import { Home, Package, Settings, LayoutGrid } from "lucide-react"

const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: Home },
  { label: "Products", icon: Package },
  { label: "Categories", icon: LayoutGrid },
  { label: "Settings", icon: Settings }
]

export function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <TopBar />
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 border-r border-white/10 p-4">
          <div className="flex flex-col gap-2">
            {SIDEBAR_ITEMS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white
                  rounded-lg hover:bg-white/5 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
