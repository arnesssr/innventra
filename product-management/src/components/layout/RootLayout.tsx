import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useState } from 'react'

export function RootLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar expanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />
      <div className={cn(
        "flex-1 transition-all duration-300",
        isSidebarExpanded ? "ml-64" : "ml-16"
      )}>
        <main className="container mx-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
