import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"

export function DraftsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Draft Products</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Unpublished Items</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Draft items list will go here */}
        </CardContent>
      </Card>
    </div>
  )
}
