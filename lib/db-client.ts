import type { Product, Category, User, Order } from "@/types"

// In-memory storage for development/demo purposes
let products: Product[] = []
let categories: Category[] = []
let users: User[] = []
let orders: Order[] = []

// Local storage keys
const STORAGE_KEYS = {
  PRODUCTS: "eraiiz_products",
  CATEGORIES: "eraiiz_categories",
  USERS: "eraiiz_users",
  ORDERS: "eraiiz_orders",
}

/**
 * Initialize the client-side data store
 */
export async function initializeClientDb(): Promise<void> {
  if (typeof window === "undefined") return

  try {
    // Load data from localStorage if available
    const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
    const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS)
    const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS)

    if (storedProducts) products = JSON.parse(storedProducts)
    if (storedCategories) categories = JSON.parse(storedCategories)
    if (storedUsers) users = JSON.parse(storedUsers)
    if (storedOrders) orders = JSON.parse(storedOrders)

    // If no data in localStorage, initialize with default data
    if (products.length === 0) {
      products = getDefaultProducts()
      saveProducts()
    }

    if (categories.length === 0) {
      categories = getDefaultCategories()
      saveCategories()
    }
  } catch (error) {
    console.error("Error initializing client database:", error)
    // Initialize with default data on error
    products = getDefaultProducts()
    categories = getDefaultCategories()
  }
}

/**
 * Save products to localStorage
 */
function saveProducts(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
  } catch (error) {
    console.error("Error saving products to localStorage:", error)
  }
}

/**
 * Save categories to localStorage
 */
function saveCategories(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
  } catch (error) {
    console.error("Error saving categories to localStorage:", error)
  }
}

/**
 * Save users to localStorage
 */
function saveUsers(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  } catch (error) {
    console.error("Error saving users to localStorage:", error)
  }
}

/**
 * Save orders to localStorage
 */
function saveOrders(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders))
  } catch (error) {
    console.error("Error saving orders to localStorage:", error)
  }
}

/**
 * Get all products
 */
export function getProducts(): Product[] {
  return products
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | null {
  return products.find((product) => product.id === id) || null
}

/**
 * Get products by category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId)
}

/**
 * Get all categories
 */
export function getCategories(): Category[] {
  return categories
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): Category | null {
  return categories.find((category) => category.id === id) || null
}

/**
 * Search products (client-safe)
 */
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      (product.attributes && product.attributes.some((attr) => attr.toLowerCase().includes(lowercaseQuery)))
  )
}

/**
 * Get default products
 */
function getDefaultProducts(): Product[] {
  return [
    {
      id: "p1",
      name: "Cushion Stool",
      description: "Comfortable stool made from recycled plastic materials.",
      price: 350000,
      image: "/products/stool-1.jpg",
      category: "furniture",
      rating: 4.2,
      reviews: 8657,
      attributes: ["White", "Chair"],
      inStock: true,
    },
    {
      id: "p2",
      name: "Outdoor Chair",
      description: "Durable outdoor chair made from recycled plastic.",
      price: 350000,
      image: "/products/chair-1.jpg",
      category: "furniture",
      rating: 4.2,
      reviews: 18000,
      attributes: ["White", "Chair"],
      inStock: true,
    },
    {
      id: "p3",
      name: "Stone Side Table",
      description: "Elegant side table made from recycled materials.",
      price: 350000,
      image: "/products/table-1.jpg",
      category: "furniture",
      rating: 4.2,
      reviews: 18000,
      attributes: ["White", "Chair"],
      inStock: true,
    },
    {
      id: "p4",
      name: "Blue Kids Chair",
      description: "Colorful chair for children made from recycled plastic.",
      price: 350000,
      image: "/products/chair-2.jpg",
      category: "furniture",
      rating: 4.2,
      reviews: 18000,
      attributes: ["Blue", "Chair"],
      inStock: true,
    },
    {
      id: "p5",
      name: "Recycled Shorts",
      description: "Comfortable shorts made from recycled plastic bottles.",
      price: 350000,
      image: "/products/shorts-1.jpg",
      category: "clothing",
      rating: 4.2,
      reviews: 18000,
      attributes: ["Black", "Clothing"],
      inStock: true,
    },
    {
      id: "p6",
      name: "Eco-Friendly Sneakers",
      description: "Stylish sneakers made from recycled materials.",
      price: 350000,
      image: "/products/shoes-1.jpg",
      category: "footwear",
      rating: 4.2,
      reviews: 18000,
      attributes: ["White", "Shoes"],
      inStock: true,
    },
    {
      id: "p7",
      name: "Decorative Glass Bowl",
      description: "Beautiful bowl made from recycled glass.",
      price: 350000,
      image: "/products/bowl-1.jpg",
      category: "homeware",
      rating: 4.2,
      reviews: 18000,
      attributes: ["Red", "Glass"],
      inStock: true,
    },
    {
      id: "p8",
      name: "Glass Water Bottle",
      description: "Reusable water bottle made from recycled glass.",
      price: 350000,
      image: "/products/bottle-1.jpg",
      category: "homeware",
      rating: 4.2,
      reviews: 18000,
      attributes: ["Green", "Glass"],
      inStock: true,
    },
  ]
}

/**
 * Get default categories
 */
function getDefaultCategories(): Category[] {
  return [
    {
      id: "plastic-made-products",
      name: "Plastic Made Products",
      description: "Discover a range of innovative and sustainable products crafted from recycled plastics.",
      image: "/categories/plastic-made.jpg",
      productCount: 120,
    },
    {
      id: "glass-made-products",
      name: "Glass Made Products",
      description: "Beautiful and functional items crafted from recycled glass materials.",
      image: "/categories/glass-made.jpg",
      productCount: 85,
    },
    {
      id: "fruits-waste-products",
      name: "Fruits Waste Products",
      description: "Innovative products made from fruit waste and byproducts.",
      image: "/categories/fruit-waste.jpg",
      productCount: 64,
    },
    {
      id: "others",
      name: "Others",
      description: "Explore our other sustainable and eco-friendly product categories.",
      image: "/categories/others.jpg",
      productCount: 93,
    },
  ]
}
