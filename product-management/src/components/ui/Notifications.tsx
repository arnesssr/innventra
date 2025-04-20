import { useState, useEffect } from 'react'

type NotificationType = 'success' | 'error' | 'info'

interface Notification {
  id: string
  message: string
  type: NotificationType
  title?: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const show = (message: string, type: NotificationType = 'info', title?: string) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, message, type, title }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  return { notifications, show }
}

export function Notifications() {
  const { notifications } = useNotifications()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-lg shadow-lg max-w-sm 
            ${notification.type === 'error' ? 'bg-destructive text-destructive-foreground' : 
              notification.type === 'success' ? 'bg-green-600 text-white' : 
              'bg-primary text-primary-foreground'}
          `}
        >
          {notification.title && (
            <div className="font-semibold">{notification.title}</div>
          )}
          <div>{notification.message}</div>
        </div>
      ))}
    </div>
  )
}
