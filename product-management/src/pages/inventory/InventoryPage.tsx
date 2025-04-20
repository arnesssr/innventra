import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { useState } from "react"
import { StockLevels } from "./StockLevels"
import { StockMovements } from "./StockMovements"
import { 
  ClipboardList, 
  BarChart3, 
  Activity, 
  AlertTriangle,
  PackageCheck
} from "lucide-react"

export function InventoryPage() {
  const [currentView, setCurrentView] = useState<'levels' | 'movements' | 'alerts' | 'analytics'>('levels')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Stock Overview</h1>
      </div>

      <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as any)}>
        <TabsList>
          <TabsTrigger value="levels" className="flex items-center gap-2">
            <PackageCheck className="h-4 w-4" />
            Stock Levels
          </TabsTrigger>
          <TabsTrigger value="movements" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Stock Movements
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        {currentView === 'levels' && <StockLevels />}
        {currentView === 'movements' && <StockMovements />}
        {currentView === 'alerts' && <div>Alerts Component Coming Soon</div>}
        {currentView === 'analytics' && <div>Analytics Component Coming Soon</div>}
      </div>
    </div>
  )
}
