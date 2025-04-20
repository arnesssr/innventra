import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import type { VariantCombination } from '../../../types/variationTypes'

interface Props {
  variants: VariantCombination[]
  basePrice: number
  onUpdate: (variants: VariantCombination[]) => void
}

/**
 * VariationPricing Component
 * Handles pricing and stock management for product variants
 */
export function VariationPricing({ variants, basePrice, onUpdate }: Props) {
  const [prices, setPrices] = useState<Record<string, number>>(
    Object.fromEntries(variants.map(v => [v.id, v.price]))
  )

  const [stock, setStock] = useState<Record<string, number>>(
    Object.fromEntries(variants.map(v => [v.id, v.stock]))
  )

  const handlePriceChange = (variantId: string, value: string) => {
    const newPrices = { ...prices, [variantId]: parseFloat(value) || basePrice }
    setPrices(newPrices)
    updateVariants(newPrices, stock)
  }

  const handleStockChange = (variantId: string, value: string) => {
    const newStock = { ...stock, [variantId]: parseInt(value) || 0 }
    setStock(newStock)
    updateVariants(prices, newStock)
  }

  const updateVariants = (newPrices: Record<string, number>, newStock: Record<string, number>) => {
    const updatedVariants = variants.map(variant => ({
      ...variant,
      price: newPrices[variant.id],
      stock: newStock[variant.id]
    }))
    onUpdate(updatedVariants)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant Pricing & Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 font-medium">
            <div>Variant</div>
            <div>SKU</div>
            <div>Price</div>
            <div>Stock</div>
          </div>
          {variants.map((variant) => (
            <div key={variant.id} className="grid grid-cols-4 gap-4 items-center">
              <div>
                {Object.entries(variant.combination)
                  .map(([key, value]) => `${value}`)
                  .join(' / ')}
              </div>
              <div>{variant.sku}</div>
              <Input
                type="number"
                value={prices[variant.id]}
                onChange={(e) => handlePriceChange(variant.id, e.target.value)}
                className="w-24"
              />
              <Input
                type="number"
                value={stock[variant.id]}
                onChange={(e) => handleStockChange(variant.id, e.target.value)}
                className="w-24"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
