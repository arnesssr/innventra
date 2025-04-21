import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { useState } from "react"
import { StockLevels } from "./StockLevels"
import { StockMovements } from "./StockMovements"
import { 
  Package2,        // Changed from Boxes to Package2
  ArrowUpDown,     
  AlertTriangle,
} from "lucide-react"
import { StockAlerts } from "../../features/inventory/alerts/StockAlerts"

export function InventoryPage() {
  const [currentView, setCurrentView] = useState<'levels' | 'movements' | 'alerts'>('levels')  // Removed analytics

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Stock Overview</h1>
      </div>

      <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as any)}>
        <TabsList>
          <TabsTrigger value="levels" className="flex items-center gap-2">
            <Package2 className="h-4 w-4" />  {/* Changed icon here */}
            Stock Levels
          </TabsTrigger>
          <TabsTrigger value="movements" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Stock Movements
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        {currentView === 'levels' && <StockLevels />}
        {currentView === 'movements' && <StockMovements />}
        {currentView === 'alerts' && <StockAlerts />}
      </div>
    </div>
  )
}
