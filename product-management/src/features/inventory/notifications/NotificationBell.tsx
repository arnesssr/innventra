import { Bell } from "lucide-react"
import { Button } from "../../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useStore } from "../../../store/useStore"

export function NotificationBell() {
  const navigate = useNavigate()
  const unreadCount = useStore(state => 
    state.notifications.filter(n => !n.read).length
  )

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={() => navigate("/app/inventory?tab=alerts")}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Button>
  )
}
