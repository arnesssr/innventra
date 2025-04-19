import { createContext, useContext, useEffect, useState } from 'react'

type VisualStyle = 'flat' | 'neumorphic' | 'glassmorphic'

interface VisualStyleContextType {
  style: VisualStyle
  setStyle: (style: VisualStyle) => void
  applyStyleToComponent: (component: string) => string
  neumorphicSettings: { size: number; depth: number }
  setNeumorphicSettings: (settings: { size: number; depth: number }) => void
}

const VisualStyleContext = createContext<VisualStyleContextType>({
  style: 'flat',
  setStyle: () => null,
  applyStyleToComponent: () => '',
  neumorphicSettings: { size: 1, depth: 1 },
  setNeumorphicSettings: () => null
})

export function VisualStyleProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState<VisualStyle>(() => {
    const saved = localStorage.getItem('ui-visual-style')
    return (saved as VisualStyle) || 'flat'
  })

  const [neumorphicSettings, setNeumorphicSettings] = useState({
    size: 1,
    depth: 1
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--neuo-size', neumorphicSettings.size.toString())
    root.style.setProperty('--neuo-depth', neumorphicSettings.depth.toString())
  }, [neumorphicSettings])

  useEffect(() => {
    // Remove all style classes first
    document.documentElement.classList.remove('style-flat', 'style-neumorphic', 'style-glassmorphic')
    
    // Add only the current style class
    document.documentElement.classList.add(`style-${style}`)
    
    // Save to localStorage
    localStorage.setItem('ui-visual-style', style)
  }, [style])

  const applyStyleToComponent = (component: string): string => {
    switch (style) {
      case 'neumorphic':
        switch (component) {
          case 'card':
            return 'bg-white/5 shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)] border-none rounded-xl'
          case 'button':
            return 'bg-white/5 shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.1)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),inset_-5px_-5px_10px_rgba(255,255,255,0.1)] transition-shadow border-none rounded-xl'
          case 'input':
            return 'bg-white/5 shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),inset_-5px_-5px_10px_rgba(255,255,255,0.1)] border-none rounded-xl'
          default:
            return ''
        }
      
      case 'glassmorphic':
        switch (component) {
          case 'card':
            return 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg'
          case 'button':
            return 'bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg hover:bg-white/30'
          case 'input':
            return 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl'
          default:
            return ''
        }
      
      default: // flat
        return ''
    }
  }

  return (
    <VisualStyleContext.Provider 
      value={{ 
        style, 
        setStyle, 
        applyStyleToComponent,
        neumorphicSettings,
        setNeumorphicSettings 
      }}
    >
      {children}
    </VisualStyleContext.Provider>
  )
}

export const useVisualStyle = () => {
  const context = useContext(VisualStyleContext)
  if (!context) throw new Error('useVisualStyle must be used within VisualStyleProvider')
  return context
}
