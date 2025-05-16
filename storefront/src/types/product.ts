export interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrls: string[]
  category: string
  originalPrice?: number
  isNew?: boolean
  status?: 'draft' | 'published' | 'archived'
}
