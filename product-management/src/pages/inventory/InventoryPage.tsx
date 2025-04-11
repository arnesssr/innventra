import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { useState } from "react"
import { StockLevels } from "./StockLevels"
import { StockMovements } from "./StockMovements"

export function InventoryPage() {
  const [currentView, setCurrentView] = useState<'levels' | 'movements'>('levels')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
      </div>

      <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as any)}>
        <TabsList>
          <TabsTrigger value="levels">Stock Levels</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        {currentView === 'levels' ? <StockLevels /> : <StockMovements />}
      </div>
    </div>
  )
}
