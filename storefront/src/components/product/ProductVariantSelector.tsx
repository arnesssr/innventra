import { cn } from "../../lib/utils"

interface Variant {
  type: string
  values: {
    id: string
    name: string
    inStock: boolean
  }[]
}

interface ProductVariantSelectorProps {
  variants: Variant[]
  selectedVariants: Record<string, string>
  onVariantChange: (type: string, valueId: string) => void
}

export function ProductVariantSelector({
  variants,
  selectedVariants,
  onVariantChange,
}: ProductVariantSelectorProps) {
  return (
    <div className="space-y-6">
      {variants.map((variant) => (
        <div key={variant.type} className="space-y-3">
          <label className="text-sm font-medium text-foreground/80">
            {variant.type}
          </label>
          <div className="flex flex-wrap gap-2">
            {variant.values.map((value) => (
              <button
                key={value.id}
                onClick={() => onVariantChange(variant.type, value.id)}
                disabled={!value.inStock}
                className={cn(
                  "h-10 px-4 rounded-lg text-sm font-medium transition-all",
                  "border-2 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                  selectedVariants[variant.type] === value.id
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-border",
                  !value.inStock && "opacity-50 cursor-not-allowed"
                )}
              >
                {value.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
