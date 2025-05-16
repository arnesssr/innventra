import { useState } from "react"

interface Toast {
  id: string
  title?: string
  description: string
  variant?: "default" | "success" | "error"
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = "default", duration = 3000 }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2)
    
    setToasts(prev => [...prev, { id, title, description, variant }])

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, duration)
  }

  return {
    toasts,
    toast,
  }
}
