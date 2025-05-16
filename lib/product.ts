import { getCollection } from "./getCollection"
import { v4 as uuidv4 } from "uuid"

export type ProductCategory = "plastic" | "glass" | "paper" | "metal" | "fabric" | "electronics" | "other"

export type ProductStatus = "active" | "draft" | "pending_review" | "rejected" | "out_of_stock"

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

export interface ProductVariant {
  id: string
  name: string
  options: string[]
  price?: number
  stock?: number
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  date: Date
  isVerifiedPurchase: boolean
  helpfulVotes: number
}

export interface Product {
  id: string
  sellerId: string
  name: string
  slug: string
  description: string
  price: number
  salePrice?: number
  currency: string
  stock: number
  category: ProductCategory
  tags: string[]
  images: ProductImage[]
  variants?: ProductVariant[]
  specifications?: Record<string, string>
  status: ProductStatus
  isFeatured: boolean
  isEcoFriendly: boolean
  ecoScore?: number
  reviews?: ProductReview[]
  averageRating?: number
  totalReviews?: number
  createdAt: Date
  updatedAt: Date
}

// Create a new product
export async function createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  const products = await getCollection("products")

  const product: Product = {
    ...productData,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await products.insertOne(product)
  return product
}

// Get product by ID
export async function getProductById(id: string) {
  const products = await getCollection("products")
  return products.findOne({ id })
}

// Get product by slug
export async function getProductBySlug(slug: string) {
  const products = await getCollection("products")
  return products.findOne({ slug })
}

// Get products by category slug
export async function getProductsByCategory(categorySlug: string) {
  const products = await getCollection("products")
  return products.find({
    categorySlug,
    status: "active",
  }).toArray()
}

// Get featured products
export async function getFeaturedProducts(limit = 8) {
  const products = await getCollection("products")

  return products
    .find({
      isFeatured: true,
      status: "active",
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()
}

// Get products by seller
export async function getProductsBySeller(sellerId: string) {
  const products = await getCollection("products")
  return products.find({ sellerId }).toArray()
}

// Update product
export async function updateProduct(id: string, updates: Partial<Product>) {
  const products = await getCollection("products")

  const result = await products.updateOne(
    { id },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
  )

  return result.modifiedCount > 0
}

// Delete product
export async function deleteProduct(id: string) {
  const products = await getCollection("products")
  const result = await products.deleteOne({ id })
  return result.deletedCount > 0
}

// Search products
export async function searchProducts(
  query: string,
  filters?: {
    category?: ProductCategory
    minPrice?: number
    maxPrice?: number
    tags?: string[]
    isEcoFriendly?: boolean
  },
) {
  const products = await getCollection("products")

  const searchQuery: any = {
    status: "active",
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } },
    ],
  }

  if (filters) {
    if (filters.category) {
      searchQuery.category = filters.category
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      searchQuery.price = {}

      if (filters.minPrice !== undefined) {
        searchQuery.price.$gte = filters.minPrice
      }

      if (filters.maxPrice !== undefined) {
        searchQuery.price.$lte = filters.maxPrice
      }
    }

    if (filters.tags && filters.tags.length > 0) {
      searchQuery.tags = { $in: filters.tags }
    }

    if (filters.isEcoFriendly !== undefined) {
      searchQuery.isEcoFriendly = filters.isEcoFriendly
    }
  }

  return products.find(searchQuery).toArray()
}

// Add a review to a product
export async function addProductReview(productId: string, review: Omit<ProductReview, "id" | "date" | "helpfulVotes">) {
  const products = await getCollection("products")

  const newReview: ProductReview = {
    ...review,
    id: uuidv4(),
    date: new Date(),
    helpfulVotes: 0,
  }

  const product = await getProductById(productId)

  if (!product) {
    return null
  }

  const reviews = product.reviews || []
  reviews.push(newReview)

  // Calculate new average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / reviews.length

  await products.updateOne(
    { id: productId },
    {
      $set: {
        reviews,
        averageRating,
        totalReviews: reviews.length,
        updatedAt: new Date(),
      },
    },
  )

  return newReview
}

// Generate a unique slug for a product
export async function generateProductSlug(name: string, sellerId: string) {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const products = await getCollection("products")

  // Check if slug already exists
  const existingProduct = await products.findOne({ slug: baseSlug })

  if (!existingProduct) {
    return baseSlug
  }

  // If slug exists, add a unique identifier
  const uniqueSlug = `${baseSlug}-${sellerId.substring(0, 6)}`

  // Check if the new slug exists
  const existingProductWithUniqueSlug = await products.findOne({ slug: uniqueSlug })

  if (!existingProductWithUniqueSlug) {
    return uniqueSlug
  }

  // If that still exists, add a timestamp
  return `${baseSlug}-${Date.now().toString(36)}`
}

// Get category by slug
export async function getCategoryBySlug(slug: string) {
  const categories = await getCollection("categories")
  return categories.findOne({ slug })
}
