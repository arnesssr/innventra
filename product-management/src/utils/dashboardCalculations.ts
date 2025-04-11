import type { Product, StockMovement } from '../types/productTypes'

export const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return 0
  return Number(((current - previous) / previous * 100).toFixed(1))
}

export const calculateMetrics = (products: Product[], movements: StockMovement[]) => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))

  // Current metrics
  const currentProducts = products.length
  const currentValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0)
  const currentMovements = movements.filter(m => new Date(m.date) >= thirtyDaysAgo).length

  // Previous metrics (basic trend)
  const previousProducts = Math.max(currentProducts - 1, 0)
  const previousValue = Math.max(currentValue - 100, 0)
  const previousMovements = Math.max(currentMovements - 2, 0)

  return {
    products: {
      current: currentProducts,
      trend: calculateTrend(currentProducts, previousProducts)
    },
    value: {
      current: currentValue,
      trend: calculateTrend(currentValue, previousValue)
    },
    activity: {
      current: currentMovements,
      trend: calculateTrend(currentMovements, previousMovements)
    }
  }
}
