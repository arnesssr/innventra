import { createContext, useContext, useEffect, useCallback } from 'react'
import { useStore } from '../store/useStore'

interface NotificationContextType {
  unreadCount: number;
  generateNotifications: () => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const inventory = useStore(state => state.inventory)
  const addNotification = useStore(state => state.addNotification)
  const notifications = useStore(state => state.notifications)

  const generateNotifications = useCallback(() => {
    // Check inventory and generate notifications
    Object.values(inventory).forEach(item => {
      if (item.currentStock <= item.minimumStock) {
        addNotification({
          type: item.currentStock === 0 ? 'out_of_stock' : 'low_stock',
          productId: item.productId,
          productName: item.productName,
          currentStock: item.currentStock,
          threshold: item.minimumStock,
          message: `${item.productName} is ${item.currentStock === 0 ? 'out of' : 'running low on'} stock`
        })
      }
    })
  }, [inventory, addNotification])

  // Check for notifications every minute
  useEffect(() => {
    generateNotifications()
    const interval = setInterval(generateNotifications, 60000)
    return () => clearInterval(interval)
  }, [generateNotifications])

  return (
    <NotificationContext.Provider value={{
      unreadCount: notifications.filter(n => !n.read).length,
      generateNotifications,
      markAsRead: useStore.getState().markNotificationAsRead,
      clearAll: useStore.getState().clearNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}
