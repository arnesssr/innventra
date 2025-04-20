import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeBoundary } from '../lib/theme-boundary'

export type Theme = 'system' | 'light' | 'dark' | 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleMode: () => void
}>({
  theme: 'system',
  setTheme: () => null,
  toggleMode: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) return saved as Theme
    if (defaultTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // First remove all theme classes
    root.classList.remove(
      'light', 'dark',
      'theme-red', 'theme-rose', 'theme-orange', 'theme-yellow',
      'theme-violet', 'theme-indigo', 'theme-amber'
    )

    if (theme === 'system') {
      // Handle system theme
      root.classList.add(isDark ? 'dark' : 'light')
    } else if (theme === 'light' || theme === 'dark') {
      // Handle explicit light/dark mode
      root.classList.add(theme)
    } else {
      // Handle custom themes (like theme-red, theme-violet, etc.)
      root.classList.add(theme) // Add the theme class first
      
      // Then handle light/dark mode separately
      const storedMode = localStorage.getItem('color-mode')
      const mode = storedMode || (isDark ? 'dark' : 'light')
      root.classList.add(mode)
      localStorage.setItem('color-mode', mode)
    }
  }, [theme])

  // Handle light/dark mode toggle
  const toggleMode = () => {
    const root = window.document.documentElement
    const isDark = root.classList.contains('dark')
    
    root.classList.remove('light', 'dark')
    const newMode = isDark ? 'light' : 'dark'
    root.classList.add(newMode)
    localStorage.setItem('color-mode', newMode)
  }

  // Add dark mode media query listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system' || theme.startsWith('theme-')) {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    toggleMode // Add this to context
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
