import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { useState } from 'react'

export const Layout = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      <div className="flex-1">
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export { Sidebar }
