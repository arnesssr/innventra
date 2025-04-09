import { Bell, Search, Sun, Moon, User } from 'lucide-react'
import { useTheme } from '../../context/theme-context'

export function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex w-full max-w-md items-center gap-2">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-transparent outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="relative">
            <Bell size={20} />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs text-white">
              3
            </span>
          </button>
          <button className="flex items-center gap-2">
            <User size={20} />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}
