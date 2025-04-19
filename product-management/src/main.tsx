import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from "@clerk/themes"
import { ThemeProvider } from "./context/theme-context"
import App from './App'
import './styles/globals.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          baseTheme: dark,
          variables: { 
            colorPrimary: '#8a2be2',
            colorBackground: '#0a0e17',
            colorInputBackground: '#232838',
            colorInputText: 'white',
            colorText: 'white',
          }
        }}
      >
        <App />
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>,
)