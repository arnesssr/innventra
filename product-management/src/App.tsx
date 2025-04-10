import { AppRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'

function App() {
  console.log('App rendering') // Debug log
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
