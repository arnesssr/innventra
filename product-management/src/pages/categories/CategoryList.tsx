import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Plus, MoreVertical, Pen, Trash2, Book, BookOpen, Gift, PenTool, Baby } from "lucide-react"
import { useState } from "react"
import { useStore } from "../../store/useStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select"
import { Checkbox } from "../../components/ui/Checkbox"
import { type Category, type CategoryField } from '../../types/productTypes'

// Default fields that every product category will have
const DEFAULT_FIELDS: CategoryField[] = [
  { name: 'name', type: 'text', label: 'Product Name', required: true },
  { name: 'price', type: 'number', label: 'Price (KES)', required: true },
  { name: 'stock', type: 'number', label: 'Stock Quantity', required: true },
  { name: 'description', type: 'text', label: 'Description', required: true }
]

// Icon mappings for different category types
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  books: <Book className="h-5 w-5" />,
  bibles: <BookOpen className="h-5 w-5" />,
  gifts: <Gift className="h-5 w-5" />,
  stationery: <PenTool className="h-5 w-5" />,
  toys: <Baby className="h-5 w-5" />,
}

/**
 * CategoryList Component
 * Displays a grid of product categories with management functionality
 */
export function CategoryList() {
  // Navigation hook for routing
  const navigate = useNavigate()

  // State for managing new category creation
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    description: '',
    fields: [...DEFAULT_FIELDS]
  })
  const [customFields, setCustomFields] = useState<CategoryField[]>([])

  // Store actions and state
  const addCategory = useStore(state => state.addCategory)
  const categories = useStore(state => state.categories)
  const deleteCategory = useStore(state => state.deleteCategory)
  
  // Dialog state management
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  /**
   * Adds a new custom field to the category
   */
  const handleAddCustomField = () => {
    setCustomFields([...customFields, {
      name: '',
      type: 'text',
      label: '',
      required: false,
      options: []
    }])
  }

  /**
   * Updates a custom field's properties
   */
  const handleCustomFieldChange = (index: number, field: Partial<CategoryField>) => {
    const updatedFields = [...customFields]
    updatedFields[index] = { ...updatedFields[index], ...field }
    setCustomFields(updatedFields)
  }

  /**
   * Removes a custom field from the category
   */
  const handleRemoveCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index))
  }

  /**
   * Saves a new category with validation
   */
  const handleSave = () => {
    if (!newCategory.name.trim()) {
      // Add validation - show error if name is empty
      return;
    }

    const categoryData: Category = {
      ...newCategory,
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      fields: [
        ...DEFAULT_FIELDS,
        ...customFields // Add custom fields to category
      ]
    }

    addCategory(categoryData)
    setShowNewCategory(false)
    
    // Reset form
    setNewCategory({
      name: '',
      description: '',
      fields: [...DEFAULT_FIELDS]
    })
    setCustomFields([])
  }

  /**
   * Opens edit dialog for a category
   */
  const handleEdit = (e: React.MouseEvent, category: Category) => {
    e.stopPropagation()
    setSelectedCategory(category)
    setShowEditDialog(true)
  }

  /**
   * Opens delete confirmation dialog for a category
   */
  const handleDelete = (e: React.MouseEvent, category: Category) => {
    e.stopPropagation()
    setSelectedCategory(category)
    setShowDeleteDialog(true)
  }

  /**
   * Confirms and executes category deletion
   */
  const confirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id)
      setShowDeleteDialog(false)
      setSelectedCategory(null)
    }
  }

  /**
   * Handles category update submission
   */
  const handleEditSubmit = (updatedCategory: Omit<Category, 'id'>) => {
    if (selectedCategory) {
      // Update category with new data but keep the same ID
      const categoryData = {
        ...updatedCategory,
        id: selectedCategory.id
      }
      addCategory(categoryData) // This will overwrite the existing category
      setShowEditDialog(false)
      setSelectedCategory(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header with New Category button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => setShowNewCategory(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      {/* Category Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="group relative hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 w-fit">
                    {CATEGORY_ICONS[category.id] || <Book className="h-5 w-5 text-primary" />}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => handleEdit(e, category)}
                  >
                    <Pen className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive"
                    onClick={(e) => handleDelete(e, category)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {category.description}
              </p>
              <Button 
                className="w-full mt-4"
                onClick={() => navigate(`/app/products/new/${category.id}`)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Category Name" 
              value={selectedCategory?.name || ''} 
              onChange={(e) => setSelectedCategory(prev => 
                prev ? { ...prev, name: e.target.value } : null
              )}
            />
            <Input 
              placeholder="Description" 
              value={selectedCategory?.description || ''} 
              onChange={(e) => setSelectedCategory(prev => 
                prev ? { ...prev, description: e.target.value } : null
              )}
            />
            <Button onClick={() => selectedCategory && handleEditSubmit(selectedCategory)}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this category? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="default"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Category Dialog */}
      {showNewCategory && (
        <Dialog open={showNewCategory} onOpenChange={setShowNewCategory}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input 
                placeholder="Category Name" 
                value={newCategory.name} 
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <Input 
                placeholder="Description" 
                value={newCategory.description} 
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Custom Fields</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddCustomField}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Field
                  </Button>
                </div>

                {customFields.map((field, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <label>Field Name</label>
                      <Input
                        value={field.name}
                        onChange={(e) => handleCustomFieldChange(index, { name: e.target.value })}
                        placeholder="e.g. Publisher"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Field Type</label>
                      <Select
                        value={field.type}
                        onValueChange={(value) => handleCustomFieldChange(index, { type: value as 'text' | 'select' | 'number' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label>Display Label</label>
                      <Input
                        value={field.label}
                        onChange={(e) => handleCustomFieldChange(index, { label: e.target.value })}
                        placeholder="e.g. Publisher Name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={(checked) => handleCustomFieldChange(index, { required: !!checked })}
                      />
                      <label>Required field</label>
                    </div>
                    <Button 
                      variant="default"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRemoveCustomField(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
