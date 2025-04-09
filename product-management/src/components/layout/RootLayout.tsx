import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
