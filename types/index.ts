export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string
  category?: string
  rating?: number
  isNew?: boolean
  discount?: number
  features?: string[]
  colors?: string[]
  sizes?: string[]
  attributes: string[]
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  image?: string
  productCount?: number
  description?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  size?: string
  color?: string
}
