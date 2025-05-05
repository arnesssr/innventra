import { UserButton } from "@clerk/clerk-react"
import { Bell, Search, Store } from "lucide-react"
import { Button } from "../ui/Button"
import { ThemeToggle } from "../ui/ThemeToggle"
import { useStore } from "../../store/useStore"
import { useNavigate } from "react-router-dom"

export function TopBar() {
  const navigate = useNavigate()
  const notifications = useStore(state => state.notifications)
  const unreadCount = notifications?.filter(n => !n.read).length || 0

  const handleStoreClick = () => {
    // Development environment
    window.open('http://localhost:5174', '_blank')
    // For production, would be: window.open('https://store.yourdomain.com', '_blank')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side - Search */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground flex-1 outline-none"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Storefront Link Button */}
          <Button 
            variant="outline"
            onClick={handleStoreClick}
            className="flex items-center gap-2"
          >
            <Store className="h-4 w-4" />
            <span>View Storefront</span>
          </Button>

          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => navigate("/app/messages")}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
                userButtonPopoverCard: "bg-popover border border-border",
                userButtonPopoverFooter: "hidden"
              }
            }}
            afterSignOutUrl="/"
          />
        </div>
      </div>
    </header>
  )
}

// Quick Notifications List Component
function NotificationsList() {
  const notifications = useStore(state => state.notifications)
  const markAsRead = useStore(state => state.markNotificationAsRead)

  if (notifications.length === 0) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        No notifications
      </div>
    )
  }

  function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="divide-y">
      {notifications.map(notification => (
        <button
          key={notification.id}
          className={cn(
            "w-full text-left px-4 py-3 hover:bg-accent",
            !notification.read && "bg-accent/50"
          )}
          onClick={() => markAsRead(notification.id)}
        >
          <p className="text-sm font-medium">
            {notification.type === 'out_of_stock' ? 'Out of Stock' : 'Low Stock'
            }
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {notification.message}
          </p>
        </button>
      ))}
    </div>
  )
}
