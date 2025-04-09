import { Sun, Moon, Monitor, Layers } from 'lucide-react'
import { useTheme } from '../../context/theme-context'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: 'light', icon: <Sun size={16} /> },
    { name: 'dark', icon: <Moon size={16} /> },
    { name: 'system', icon: <Monitor size={16} /> },
    { name: 'neumorphic', icon: <Layers size={16} /> }
  ]

  return (
    <div className="flex gap-2">
      {themes.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => setTheme(name as any)}
          className={`rounded-lg p-2 ${
            theme === name ? 'bg-primary text-white' : 'bg-card hover:bg-accent'
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}
