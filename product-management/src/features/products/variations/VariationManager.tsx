import { useState, useEffect } from 'react'
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import { Plus, Trash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select"
import type { Variation, VariantCombination } from '../../../types/variationTypes'
import { generateSKU } from '../../../utils/skuGenerator'

interface Props {
  variations: Variation[]
  variants: VariantCombination[]
  baseProduct: string
  category: string // Add category to props
  basePrice: number
  onUpdate: (variations: Variation[], variants: VariantCombination[]) => void
}

export function VariationManager({ variations, variants, baseProduct, category, basePrice, onUpdate }: Props) {
  const [currentVariations, setCurrentVariations] = useState<Variation[]>(variations)

  const addVariation = () => {
    const newVariation: Variation = {
      id: Date.now().toString(),
      name: '',
      options: []
    }
    setCurrentVariations([...currentVariations, newVariation])
  }

  const generateVariantSKU = (combination: Record<string, string>) => {
    const prefix = category.substring(0, 3).toUpperCase();
    const productCode = baseProduct.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3).toUpperCase();
    const variantCode = Object.values(combination)
      .map(value => value.substring(0, 2).toUpperCase())
      .join('');
    const timestamp = Date.now().toString().slice(-4);
    
    return `${prefix}-${productCode}-${variantCode}-${timestamp}`;
  };

  // When variations change, generate new variants with SKUs
  useEffect(() => {
    if (currentVariations.length === 0) {
      onUpdate([], [])
      return
    }

    // Generate all possible combinations
    const combinations = currentVariations.reduce<Record<string, string>[]>(
      (acc, variation) => {
        if (variation.options.length === 0) return acc
        if (acc.length === 0) {
          return variation.options.map(option => ({
            [variation.name]: option
          }))
        }
        return acc.flatMap(combo =>
          variation.options.map(option => ({
            ...combo,
            [variation.name]: option
          }))
        )
      },
      []
    )

    // Create variants from combinations
    const newVariants = combinations.map(combo => ({
      id: Date.now().toString() + Math.random(),
      sku: generateVariantSKU(combo),
      combination: combo,
      price: basePrice,
      stock: 0,
      status: 'active' as const
    }))

    onUpdate(currentVariations, newVariants)
  }, [currentVariations, basePrice, baseProduct, category])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Product Variations</h3>
          <p className="text-sm text-muted-foreground">
            {variants.length} variant{variants.length !== 1 ? 's' : ''} generated
          </p>
        </div>
        <Button onClick={addVariation} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Variation Type
        </Button>
      </div>

      {/* Variation Types */}
      {currentVariations.map((variation) => (
        <div key={variation.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Input
              value={variation.name}
              onChange={(e) => {
                const updated = currentVariations.map(v =>
                  v.id === variation.id ? { ...v, name: e.target.value } : v
                )
                setCurrentVariations(updated)
                onUpdate(updated, variants)
              }}
              placeholder="Variation name (e.g., Size, Color)"
              className="max-w-xs"
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const updated = currentVariations.filter(v => v.id !== variation.id)
                setCurrentVariations(updated)
                onUpdate(updated, variants)
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {variation.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...variation.options]
                    newOptions[index] = e.target.value
                    const updated = currentVariations.map(v =>
                      v.id === variation.id ? { ...v, options: newOptions } : v
                    )
                    setCurrentVariations(updated)
                    onUpdate(updated, variants)
                  }}
                  placeholder="Option value"
                  className="max-w-xs"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newOptions = variation.options.filter((_, i) => i !== index)
                    const updated = currentVariations.map(v =>
                      v.id === variation.id ? { ...v, options: newOptions } : v
                    )
                    setCurrentVariations(updated)
                    onUpdate(updated, variants)
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newOptions = [...variation.options, '']
                const updated = currentVariations.map(v =>
                  v.id === variation.id ? { ...v, options: newOptions } : v
                )
                setCurrentVariations(updated)
                onUpdate(updated, variants)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        </div>
      ))}

      {/* Variant Combinations */}
      {variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Variant Details ({variants.length})</CardTitle>
            <p className="text-sm text-muted-foreground">
              SKUs are automatically generated based on product name and variations
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 font-medium">
                <div>Variant</div>
                <div>Price</div>
                <div>Stock</div>
              </div>
              {variants.map((variant) => (
                <div key={variant.id} className="grid grid-cols-3 gap-4 items-center">
                  <div>
                    <div>{Object.values(variant.combination).join(' / ')}</div>
                    <div className="text-xs text-muted-foreground">
                      SKU: {variant.sku}
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={variant.price}
                    onChange={(e) => {
                      const newVariants = variants.map(v =>
                        v.id === variant.id ? { ...v, price: parseFloat(e.target.value) || 0 } : v
                      )
                      onUpdate(variations, newVariants)
                    }}
                    min={0}
                    step={0.01}
                  />
                  <Input
                    type="number"
                    value={variant.stock}
                    onChange={(e) => {
                      const newVariants = variants.map(v =>
                        v.id === variant.id ? { ...v, stock: parseInt(e.target.value) || 0 } : v
                      )
                      onUpdate(variations, newVariants)
                    }}
                    min={0}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
