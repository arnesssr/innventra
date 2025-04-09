import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '../../context/theme-context'

export function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </ThemeProvider>
  )
}
