import { Card } from "../../components/ui/Card"
import { useStore } from "../../store/useStore"
import { 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Bell 
} from "lucide-react"
import { cn } from "../../lib/utils"

export function MessagesPage() {
  const notifications = useStore(state => state.notifications)
  const markNotificationAsRead = useStore(state => state.markNotificationAsRead)

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups: Record<string, any[]>, notification) => {
    const date = new Date(notification.timestamp).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(notification)
    return groups
  }, {})

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'out_of_stock':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'low_stock':
        return <Info className="h-5 w-5 text-amber-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedNotifications).map(([date, notifications]) => (
          <div key={date} className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">{date}</h2>
            <div className="space-y-2">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={cn(
                    "p-4 cursor-pointer hover:bg-accent/50 transition-colors",
                    !notification.read && "bg-accent/25"
                  )}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    {getNotificationIcon(notification.type)}
                    <div className="space-y-1">
                      <p className="font-medium">
                        {notification.type === 'out_of_stock' 
                          ? `${notification.productName} is out of stock!`
                          : `Low stock alert for ${notification.productName}`
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Current stock: {notification.currentStock} 
                        (Minimum: {notification.threshold})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <Card className="p-8 text-center">
            <div className="mx-auto w-fit rounded-full bg-primary/10 p-4 mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up! Check back later for new notifications.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
