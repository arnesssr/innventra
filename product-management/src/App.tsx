import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/theme-context'
import { AppRoutes } from './routes'
import './styles/themes.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
