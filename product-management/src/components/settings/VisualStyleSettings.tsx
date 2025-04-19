import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"
import { Label } from "../ui/Label"
import { useVisualStyle } from '../../context/visual-style-context'
import { useEffect } from 'react'

type VisualStyle = 'flat' | 'neumorphic' | 'glassmorphic'

const visualStyles: Array<{
  name: string;
  value: VisualStyle;
  description: string;
}> = [
  { 
    name: 'Flat (Default)', 
    value: 'flat',
    description: 'Clean and minimal interface with solid colors'
  },
  { 
    name: 'Neumorphic', 
    value: 'neumorphic',
    description: 'Soft, extruded interface with subtle shadows'
  },
  { 
    name: 'Glassmorphic', 
    value: 'glassmorphic',
    description: 'Modern, translucent interface with blur effects'
  }
]

export function VisualStyleSettings() {
  const { style, setStyle } = useVisualStyle()

  const handleStyleChange = (newStyle: VisualStyle) => {
    // First remove all existing styles
    document.documentElement.classList.remove('style-flat', 'style-neumorphic', 'style-glassmorphic')
    
    // Then add the new style
    document.documentElement.classList.add(`style-${newStyle}`)
    
    // Remove any component-specific styles that might have been added
    const components = document.querySelectorAll('.button, .card, .input')
    components.forEach(component => {
      const classes = component.className.split(' ')
      const filteredClasses = classes.filter(cls => 
        !cls.includes('shadow-') && 
        !cls.includes('backdrop-')
      )
      component.className = filteredClasses.join(' ')
    })
    
    setStyle(newStyle)
    localStorage.setItem('ui-visual-style', newStyle)
  }

  // Initialize style on mount
  useEffect(() => {
    const savedStyle = localStorage.getItem('ui-visual-style') as VisualStyle || 'flat'
    handleStyleChange(savedStyle)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual Style</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={style} 
          onValueChange={handleStyleChange}
          className="grid gap-4"
        >
          {visualStyles.map((style) => (
            <div key={style.value} className="relative">
              <RadioGroupItem
                value={style.value}
                id={style.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={style.value}
                className="flex flex-col gap-1 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-semibold">{style.name}</span>
                <span className="text-sm text-muted-foreground">
                  {style.description}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
