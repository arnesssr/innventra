import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useState } from 'react'
import { Header } from './Header'

export function RootLayout() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
