import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { UserNav } from './UserNav'
import { useState } from 'react'

export const Layout = () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="min-h-screen flex">
      <Sidebar 
        expanded={expanded} 
        onToggle={() => setExpanded(prev => !prev)} 
      />
      <div className="flex-1">
        <UserNav />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export { Sidebar, UserNav }
