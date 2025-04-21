import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs"
import { useTheme } from "../../context/theme-context"
import { RadioGroup, RadioGroupItem } from "../../components/ui/RadioGroup"
import { Label } from "../../components/ui/Label"
import { VisualStyleSettings } from "../../components/settings/VisualStyleSettings"
import { Switch } from "../../components/ui/Switch"
import { NotificationSettings } from "../../components/settings/NotificationSettings"
import { NotificationCenter } from "../../components/settings/NotificationCenter"

// Import Theme type from context
import { Theme } from '../../context/theme-context'

// Define theme types to match available CSS files
type AvailableTheme = Theme | 'default' | 'theme-red' | 'theme-rose' | 'theme-orange' | 'theme-yellow' | 'theme-violet' | 'theme-indigo' | 'theme-amber'


const themes: Array<{
  name: string;
  value: AvailableTheme;
  primary: string;
  secondary: string;
}> = [
  { name: 'Default', value: 'default', primary: 'hsl(220.9 39.3% 11%)', secondary: 'hsl(220 14.3% 95.9%)' },
  { name: 'Red', value: 'theme-red', primary: 'oklch(0.637 0.237 25.331)', secondary: 'oklch(0.577 0.245 27.325)' },
  { name: 'Rose', value: 'theme-rose', primary: 'hsl(350 89% 60%)', secondary: 'hsl(350 30% 96%)' },
  { name: 'Orange', value: 'theme-orange', primary: 'hsl(24 95% 50%)', secondary: 'hsl(24 30% 96%)' },
  { name: 'Yellow', value: 'theme-yellow', primary: 'hsl(47 95% 50%)', secondary: 'hsl(50 30% 96%)' },
  { name: 'Violet', value: 'theme-violet', primary: 'hsl(270 95% 60%)', secondary: 'hsl(270 30% 96%)' },
  { name: 'Indigo', value: 'theme-indigo', primary: 'hsl(243 75% 59%)', secondary: 'hsl(243 30% 96%)' },
  { name: 'Amber', value: 'theme-amber', primary: 'hsl(38 92% 50%)', secondary: 'hsl(38 30% 96%)' }
]

export function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (newTheme: string) => {
const root = document.documentElement
    
    // First remove all theme classes
    root.classList.remove(
      'light', 'dark',
      'theme-red', 'theme-rose', 'theme-orange', 'theme-yellow',
      'theme-violet', 'theme-indigo', 'theme-amber'
    )

if (newTheme === 'default') {
  // Handle default theme
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  root.classList.add(systemTheme)
  setTheme('system')
} else {
      // Handle custom themes
      const currentMode = localStorage.getItem('color-mode') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      
      root.classList.add(newTheme) // Add theme class first
      root.classList.add(currentMode) // Then add mode class
      setTheme(newTheme as AvailableTheme)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label>Company Name</label>
                <Input defaultValue="My Company" />
              </div>
              <div className="space-y-2">
                <label>Contact Email</label>
                <Input type="email" defaultValue="contact@example.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationCenter />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue={theme}
                onValueChange={handleThemeChange}
                className="grid grid-cols-2 gap-4"
              >
                {themes.map((theme) => (
                  <div key={theme.value} className="relative">
                    <RadioGroupItem
                      value={theme.value}
                      id={theme.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={theme.value}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="font-semibold">{theme.name}</span>
                      <div className="flex gap-2 mt-2">
                        <div 
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div 
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <VisualStyleSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
