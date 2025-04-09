import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { Category, SubCategory, DEFAULT_FIELDS } from "./types"
import { SubCategoryForm } from "./SubCategoryForm"

export function CategoryCreate() {
  const [category, setCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
    subcategories: [],
    defaultFields: DEFAULT_FIELDS
  })

  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false)

  const handleSaveSubCategory = (subCategory: Omit<SubCategory, 'id'>) => {
    setCategory(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, { ...subCategory, id: Date.now().toString() }]
    }))
    setShowSubCategoryForm(false)
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label>Category Name</label>
            <Input
              value={category.name}
              onChange={e => setCategory(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter category name"
            />
          </div>

          <div className="space-y-2">
            <label>Description</label>
            <textarea
              className="w-full rounded-md border p-2"
              value={category.description}
              onChange={e => setCategory(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-medium">Subcategories</label>
              <Button onClick={() => setShowSubCategoryForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subcategory
              </Button>
            </div>

            {category.subcategories.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {category.subcategories.map((sub) => (
                  <Card key={sub.id}>
                    <CardHeader>
                      <CardTitle className="text-sm">{sub.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {sub.fields.length} custom fields
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showSubCategoryForm && (
        <SubCategoryForm
          onClose={() => setShowSubCategoryForm(false)}
          onSave={handleSaveSubCategory}
        />
      )}
    </div>
  )
}
