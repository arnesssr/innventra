import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { ThemeProvider } from "./context/theme-context"
import { VisualStyleProvider } from './context/visual-style-context'
import { AppRoutes } from "./routes"
import { Toaster } from "./components/ui/Toaster"
import { NotificationProvider } from "./context/notification-context"

export default function App() {
  return (
    <ThemeProvider>
      <VisualStyleProvider>
        <NotificationProvider>
          <AppRoutes />
          <Toaster /> {/* Make sure this is outside of AppRoutes but inside providers */}
        </NotificationProvider>
      </VisualStyleProvider>
    </ThemeProvider>
  )
}