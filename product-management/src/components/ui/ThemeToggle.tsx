import { Moon, Sun } from "lucide-react"
import { Button } from "./Button"
import { useTheme } from "../../context/theme-context"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
    
    // Remove current mode
    root.classList.remove('light', 'dark')
    
    // Add new mode
    const newMode = isDark ? 'light' : 'dark'
    root.classList.add(newMode)
    
    // Store the mode preference
    localStorage.setItem('color-mode', newMode)
    
    // If using system theme, update the theme setting
    if (theme === 'system') {
      setTheme(newMode)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
