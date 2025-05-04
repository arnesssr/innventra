import { Card } from "../../../components/ui/Card"
import { Button } from "../../../components/ui/Button"
import { useNavigate } from "react-router-dom"
import { BarChart, LayoutList } from "lucide-react"

export function ReportsDashboard() {
  const navigate = useNavigate()

  const reportTypes = [
    {
      title: "General Reports",
      description: "View inventory, sales, and supplier reports",
      href: "?type=general",
      icon: <LayoutList className="h-6 w-6 text-primary" />
    }
  ]

  return (
    <div className="grid gap-6">
      {reportTypes.map((report) => (
        <Card key={report.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <p className="text-sm text-muted-foreground">{report.description}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate(report.href)}
            >
              View Reports
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
