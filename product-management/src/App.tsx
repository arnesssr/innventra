import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { ThemeProvider } from "./context/theme-context"
import { VisualStyleProvider } from './context/visual-style-context'
import { AppRoutes } from "./routes"

export default function App() {
  return (
    <ThemeProvider>
      <VisualStyleProvider>
        <AppRoutes />
      </VisualStyleProvider>
    </ThemeProvider>
  )
}