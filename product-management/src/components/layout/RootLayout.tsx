import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-16 transition-all duration-300">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
