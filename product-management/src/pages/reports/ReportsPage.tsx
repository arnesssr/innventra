import { useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { ErrorBoundary } from "../../components/ErrorBoundary"
import { AuditsPage } from "./AuditsPage"
import { Card } from "../../components/ui/Card"
import { SalesReport } from "../../features/reports/SalesReport"
import { InventoryReport } from "../../features/reports/InventoryReport"
import { SupplierReport } from "../../features/reports/SupplierReport"

export function ReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "reports"
  const reportType = searchParams.get("type") || "sales"

  const renderReportContent = () => {
    switch (reportType) {
      case "sales":
        return <SalesReport />
      case "inventory":
        return <InventoryReport />
      case "suppliers":
        return <SupplierReport />
      default:
        return <SalesReport /> // Default to sales report
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">View reports and audit logs</p>
      </div>

      <Tabs value={currentTab} onValueChange={(value) => setSearchParams({ tab: value })}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <ErrorBoundary>
            <Tabs value={reportType} onValueChange={(value) => setSearchParams({ tab: 'reports', type: value })}>
              <TabsList>
                <TabsTrigger value="sales">Sales Report</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
                <TabsTrigger value="suppliers">Suppliers Report</TabsTrigger>
              </TabsList>
              <div className="mt-4">
                {renderReportContent()}
              </div>
            </Tabs>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="audit">
          <ErrorBoundary>
            <AuditsPage />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  )
}
