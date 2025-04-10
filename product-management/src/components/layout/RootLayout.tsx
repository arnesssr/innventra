import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useState } from 'react'

export function RootLayout() {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      <div className="flex-1">
        <Header />
        <main className="container mx-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
