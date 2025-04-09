import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/theme-context'
import { Routes } from './routes'
import './styles/themes.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
