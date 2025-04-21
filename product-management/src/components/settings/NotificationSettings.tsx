import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Switch } from "../ui/Switch"
import { useStore } from "../../store/useStore"

/**
 * NotificationSettings Component
 * Handles user preferences for:
 * - Stock alerts
 * - Low stock notifications
 * - Stock movement alerts
 * - Notification delivery methods
 */
export function NotificationSettings() {
  const preferences = useStore(state => state.notificationPreferences)
  const updatePreferences = useStore(state => state.updateNotificationPreferences)

  const handlePreferenceChange = (key: string, value: boolean) => {
    updatePreferences({ [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Stock Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="font-medium">Low Stock Alerts</label>
                <p className="text-sm text-muted-foreground">
                  Get notified when products reach their set threshold
                </p>
              </div>
              <Switch 
                checked={preferences.lowStock}
                onCheckedChange={(checked) => handlePreferenceChange('lowStock', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="font-medium">Out of Stock Alerts</label>
                <p className="text-sm text-muted-foreground">
                  Get notified when products are completely out of stock
                </p>
              </div>
              <Switch 
                checked={preferences.outOfStock}
                onCheckedChange={(checked) => handlePreferenceChange('outOfStock', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="font-medium">Stock Movement Alerts</label>
                <p className="text-sm text-muted-foreground">
                  Get notified of significant stock changes
                </p>
              </div>
              <Switch 
                checked={preferences.stockMovements}
                onCheckedChange={(checked) => handlePreferenceChange('stockMovements', checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Notification Delivery</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="font-medium">Browser Notifications</label>
                <p className="text-sm text-muted-foreground">
                  Show notifications in browser
                </p>
              </div>
              <Switch 
                checked={preferences.browserNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('browserNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">
                  Send alerts to email
                </p>
              </div>
              <Switch 
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
              />
            </div>
          </div>
        </div>

        <Button>Save Preferences</Button>
      </CardContent>
    </Card>
  )
}
