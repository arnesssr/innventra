import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { SalesReport } from "../../features/reports/SalesReport"
import { InventoryReport } from "../../features/reports/InventoryReport"  // This should now work
import { AuditTrail } from "../../features/reports/AuditTrail"
import { SupplierReport } from "../../features/reports/SupplierReport"
import { Card } from "../../components/ui/Card"

export function ReportsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive business insights and analysis
        </p>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Reports</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <Card className="p-6">
          <TabsContent value="sales" className="mt-0">
            <SalesReport />
          </TabsContent>
          <TabsContent value="inventory" className="mt-0">
            <InventoryReport />
          </TabsContent>
          <TabsContent value="suppliers" className="mt-0">
            <SupplierReport />
          </TabsContent>
          <TabsContent value="audit" className="mt-0">
            <AuditTrail />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
