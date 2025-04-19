import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { ThemeProvider } from "./context/theme-context"
import { VisualStyleProvider } from './context/visual-style-context'
import { AppRoutes } from "./routes"
import { Toaster } from "./components/ui/Toaster"

export default function App() {
  return (
    <ThemeProvider>
      <VisualStyleProvider>
        <AppRoutes />
        <Toaster /> {/* Make sure this is outside of AppRoutes but inside providers */}
      </VisualStyleProvider>
    </ThemeProvider>
  )
}