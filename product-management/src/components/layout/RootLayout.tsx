import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useState } from 'react'
import { TopBar } from './TopBar'

export function RootLayout() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
