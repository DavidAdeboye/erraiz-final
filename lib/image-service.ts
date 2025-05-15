import type { Product, Category } from "@/types"

// Sample high-quality product images by category (simulating an image API)
const highQualityImages = {
  furniture: [
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000",
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000",
  ],
  clothing: [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
  ],
  footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000",
  ],
  homeware: [
    "https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?q=80&w=1000",
    "https://images.unsplash.com/photo-1583845112203-29329902332e?q=80&w=1000",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000",
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1000",
  ],
  plastic: [
    "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=1000",
    "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=1000",
    "https://images.unsplash.com/photo-1567225591450-06036b3392a6?q=80&w=1000",
  ],
  glass: [
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000",
    "https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?q=80&w=1000",
    "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=1000",
  ],
  other: [
    "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000",
    "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000",
  ],
}

// Category banner images
const categoryBannerImages = {
  plastic: "https://images.unsplash.com/photo-1567225591450-06036b3392a6?q=80&w=2000",
  glass: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2000",
  furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000",
  footwear: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000",
}

// Hero images for different categories
const heroImages = {
  plastic: [
    "https://images.unsplash.com/photo-1567225591450-06036b3392a6?q=80&w=2000",
    "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=1000",
    "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=1000",
    "https://images.unsplash.com/photo-1567225591450-06036b3392a6?q=80&w=1000",
  ],
  furniture: [
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000",
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000",
  ],
}

// Default fallback images
const fallbackImages = {
  product: "/placeholder.svg",
  category: "/placeholder.svg",
  banner: "/placeholder.svg",
  hero: "/placeholder.svg",
}

// Image cache to avoid redundant fetches
const imageCache = new Map<string, string>()

/**
 * Finds the best matching image for a product based on its description and category
 * This function is exported with both names for backward compatibility
 */
export async function findBestProductImage(product: Product): Promise<string> {
  return findProductImage(product)
}

/**
 * Finds the best matching image for a product based on its description and category
 */
export async function findProductImage(product: Product): Promise<string> {
  // Check cache first
  const cacheKey = `product-${product.id}`
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey) as string
  }

  try {
    // In a real implementation, this would call an external API to search for images
    // based on product name, description, and attributes

    // For this demo, we'll simulate by selecting from our predefined high-quality images
    let categoryKey = product.category?.toLowerCase() || "other"

    // Map to our available categories
    if (categoryKey.includes("plastic")) categoryKey = "plastic"
    else if (categoryKey.includes("glass")) categoryKey = "glass"
    else if (categoryKey.includes("furniture") || categoryKey.includes("chair") || categoryKey.includes("table"))
      categoryKey = "furniture"
    else if (categoryKey.includes("shoe") || categoryKey.includes("footwear")) categoryKey = "footwear"
    else if (categoryKey.includes("cloth") || categoryKey.includes("wear")) categoryKey = "clothing"
    else categoryKey = "other"

    const categoryImages = highQualityImages[categoryKey as keyof typeof highQualityImages] || highQualityImages.other

    if (categoryImages && categoryImages.length > 0) {
      // Use a deterministic selection based on product ID to ensure consistency
      const imageIndex = Math.abs(hashString(product.id)) % categoryImages.length
      const selectedImage = categoryImages[imageIndex]

      // Cache the result
      imageCache.set(cacheKey, selectedImage)
      return selectedImage
    }

    // If no category match, use the product's existing image or fallback
    return product.image || fallbackImages.product
  } catch (error) {
    console.error("Error fetching product image:", error)
    return product.image || fallbackImages.product
  }
}

/**
 * Finds the best matching image for a category
 */
export async function findCategoryImage(category: Category | string): Promise<string> {
  // Check cache first
  const categoryId = typeof category === "string" ? category : category.id
  const cacheKey = `category-${categoryId}`

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey) as string
  }

  try {
    // For this demo, we'll simulate by selecting from our predefined high-quality images
    let categoryKey = typeof category === "string" ? category : category.name.toLowerCase()

    // Map to our available categories
    if (categoryKey.includes("plastic")) categoryKey = "plastic"
    else if (categoryKey.includes("glass")) categoryKey = "glass"
    else if (categoryKey.includes("furniture") || categoryKey.includes("chair") || categoryKey.includes("table"))
      categoryKey = "furniture"
    else if (categoryKey.includes("shoe") || categoryKey.includes("footwear")) categoryKey = "footwear"
    else categoryKey = "other"

    const categoryImages = highQualityImages[categoryKey as keyof typeof highQualityImages] || highQualityImages.other

    if (categoryImages && categoryImages.length > 0) {
      // Use a deterministic selection based on category ID to ensure consistency
      const imageIndex = Math.abs(hashString(categoryId)) % categoryImages.length
      const selectedImage = categoryImages[imageIndex]

      // Cache the result
      imageCache.set(cacheKey, selectedImage)
      return selectedImage
    }

    // If no category match, use fallback
    return fallbackImages.category
  } catch (error) {
    console.error("Error fetching category image:", error)
    return fallbackImages.category
  }
}

/**
 * Finds a banner image for a category
 */
export async function findCategoryBannerImage(categoryId: string): Promise<string> {
  // Check cache first
  const cacheKey = `banner-${categoryId}`

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey) as string
  }

  try {
    // Map to our available categories
    let categoryKey = categoryId.toLowerCase()
    if (categoryKey.includes("plastic")) categoryKey = "plastic"
    else if (categoryKey.includes("glass")) categoryKey = "glass"
    else if (categoryKey.includes("furniture")) categoryKey = "furniture"
    else if (categoryKey.includes("footwear")) categoryKey = "footwear"
    else categoryKey = "other"

    const bannerImage = categoryBannerImages[categoryKey as keyof typeof categoryBannerImages]

    if (bannerImage) {
      // Cache the result
      imageCache.set(cacheKey, bannerImage)
      return bannerImage
    }

    // If no category match, use fallback
    return fallbackImages.banner
  } catch (error) {
    console.error("Error fetching banner image:", error)
    return fallbackImages.banner
  }
}

/**
 * Finds hero images for a category
 */
export async function findHeroImages(categoryId: string): Promise<string[]> {
  try {
    // Map to our available categories
    let categoryKey = categoryId.toLowerCase()
    if (categoryKey.includes("plastic")) categoryKey = "plastic"
    else if (categoryKey.includes("furniture")) categoryKey = "furniture"
    else categoryKey = "plastic" // Default to plastic for demo

    const images = heroImages[categoryKey as keyof typeof heroImages]

    if (images && images.length > 0) {
      return images
    }

    // If no category match, use fallback
    return [fallbackImages.hero, fallbackImages.hero, fallbackImages.hero, fallbackImages.hero]
  } catch (error) {
    console.error("Error fetching hero images:", error)
    return [fallbackImages.hero, fallbackImages.hero, fallbackImages.hero, fallbackImages.hero]
  }
}

/**
 * Optimizes an image URL for the requested size
 */
export function optimizeImageUrl(imageUrl: string, width: number, height: number): string {
  // If it's already a placeholder, return with requested dimensions
  if (!imageUrl || imageUrl.includes("/placeholder.svg")) {
    return `/placeholder.svg?height=${height}&width=${width}`
  }

  // For Unsplash images, we can use their API to request specific dimensions
  if (imageUrl.includes("unsplash.com")) {
    // Parse the URL to extract the base and query parameters
    const [baseUrl, existingParams] = imageUrl.split("?")
    const params = new URLSearchParams(existingParams || "")

    // Set or update width and height parameters
    params.set("w", width.toString())
    params.set("h", height.toString())
    params.set("fit", "crop")
    params.set("auto", "format")

    // Return the optimized URL
    return `${baseUrl}?${params.toString()}`
  }

  // For other image sources, we would implement different optimization strategies
  // For this demo, we'll just return the original URL
  return imageUrl
}

/**
 * Preloads images for a list of products to improve user experience
 */
export function preloadProductImages(products: Product[]): void {
  if (typeof window === "undefined") return // Skip on server-side

  // Only preload a reasonable number of images to avoid overwhelming the browser
  const productsToPreload = products.slice(0, 8)

  productsToPreload.forEach((product) => {
    // Use requestIdleCallback if available, otherwise use setTimeout
    const schedulePreload = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))

    schedulePreload(() => {
      findProductImage(product).then((imageUrl) => {
        const img = new Image()
        img.src = optimizeImageUrl(imageUrl, 300, 300)
      })
    })
  })
}

/**
 * Simple string hash function for deterministic image selection
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}
