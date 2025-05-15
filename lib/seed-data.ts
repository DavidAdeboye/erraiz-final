import type { Product, Category } from "@/types"
import { connectToDatabase } from "./db"
import bcrypt from "bcryptjs"
import type { User, ExchangeRate } from "@/types"

// Seed products
export const initialSeedProducts: Product[] = [
  {
    id: "p1",
    name: "Recycled Plastic Stool",
    description: "Eco-friendly stool made from 100% recycled plastic materials.",
    price: 15000,
    originalPrice: 18000,
    category: "plastic-made-products",
    image: "/products/stool-1.jpg",
    rating: 4.5,
    reviews: 28,
    attributes: ["Eco-friendly", "Durable", "Lightweight"],
    inStock: true,
  },
  {
    id: "p2",
    name: "Recycled Plastic Chair",
    description: "Comfortable chair crafted from recycled plastic bottles.",
    price: 25000,
    category: "plastic-made-products",
    image: "/products/chair-1.jpg",
    rating: 4.2,
    reviews: 15,
    attributes: ["Eco-friendly", "Comfortable", "Weather-resistant"],
    inStock: true,
  },
  {
    id: "p3",
    name: "Glass Bottle Vase",
    description: "Beautiful vase made from recycled glass bottles.",
    price: 8000,
    originalPrice: 10000,
    category: "glass-made-products",
    image: "/products/bottle-1.jpg",
    rating: 4.8,
    reviews: 32,
    attributes: ["Handcrafted", "Unique", "Eco-friendly"],
    inStock: true,
  },
  {
    id: "p4",
    name: "Recycled Plastic Table",
    description: "Durable table made from recycled plastic materials.",
    price: 35000,
    category: "plastic-made-products",
    image: "/products/table-1.jpg",
    rating: 4.0,
    reviews: 12,
    attributes: ["Eco-friendly", "Durable", "Easy to clean"],
    inStock: true,
  },
  {
    id: "p5",
    name: "Recycled Fabric Shoes",
    description: "Comfortable shoes made from recycled fabric materials.",
    price: 12000,
    originalPrice: 15000,
    category: "footwear",
    image: "/products/shoes-1.jpg",
    rating: 4.3,
    reviews: 45,
    attributes: ["Eco-friendly", "Comfortable", "Stylish"],
    inStock: true,
  },
  {
    id: "p6",
    name: "Recycled Glass Bowl",
    description: "Beautiful bowl crafted from recycled glass.",
    price: 6000,
    category: "glass-made-products",
    image: "/products/bowl-1.jpg",
    rating: 4.6,
    reviews: 19,
    attributes: ["Handcrafted", "Unique", "Eco-friendly"],
    inStock: true,
  },
  {
    id: "p7",
    name: "Recycled Plastic Shorts",
    description: "Comfortable shorts made from recycled plastic bottles.",
    price: 8000,
    category: "clothing",
    image: "/products/shorts-1.jpg",
    rating: 4.1,
    reviews: 23,
    attributes: ["Eco-friendly", "Comfortable", "Quick-dry"],
    inStock: true,
  },
  {
    id: "p8",
    name: "Modern Recycled Chair",
    description: "Modern design chair made from recycled materials.",
    price: 28000,
    originalPrice: 32000,
    category: "plastic-made-products",
    image: "/products/chair-2.jpg",
    rating: 4.7,
    reviews: 36,
    attributes: ["Eco-friendly", "Modern", "Comfortable"],
    inStock: true,
  },
]

// Seed categories
export const initialSeedCategories: Category[] = [
  {
    id: "plastic-made-products",
    name: "Plastic Made Products",
    description: "Products made from recycled plastic materials.",
    image: "/categories/plastic-made.jpg",
    productCount: 4,
  },
  {
    id: "glass-made-products",
    name: "Glass Made Products",
    description: "Products crafted from recycled glass.",
    image: "/categories/glass-made.jpg",
    productCount: 2,
  },
  {
    id: "fruit-waste-products",
    name: "Fruit Waste Products",
    description: "Products made from fruit waste materials.",
    image: "/categories/fruit-waste.jpg",
    productCount: 0,
  },
  {
    id: "others",
    name: "Others",
    description: "Other eco-friendly recycled products.",
    image: "/categories/others.jpg",
    productCount: 2,
  },
]

/**
 * Seeds the database with initial data
 */
export async function seedDatabase(): Promise<void> {
  try {
    const { db } = await connectToDatabase()

    // Check if data already exists
    const productsCount = await db.collection("products").countDocuments()
    const categoriesCount = await db.collection("categories").countDocuments()
    const usersCount = await db.collection("users").countDocuments()

    if (productsCount > 0 && categoriesCount > 0 && usersCount > 0) {
      console.log("Database already seeded")
      return
    }

    console.log("Seeding database...")

    // Seed categories
    if (categoriesCount === 0) {
      await seedCategoriesData(db)
    }

    // Seed products
    if (productsCount === 0) {
      await seedProductsData(db)
    }

    // Seed users
    if (usersCount === 0) {
      await seedUsers(db)
    }

    // Seed exchange rates
    await seedExchangeRates(db)

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

/**
 * Seeds categories
 * @param db MongoDB database
 */
async function seedCategoriesData(db: any): Promise<void> {
  const categories: Category[] = [
    {
      id: "plastic-made-products",
      name: "Plastic Made Products",
      description: "Products made from recycled plastic materials",
      image: "/categories/plastic-made.jpg",
      productCount: 24,
    },
    {
      id: "glass-made-products",
      name: "Glass Made Products",
      description: "Products made from recycled glass materials",
      image: "/categories/glass-made.jpg",
      productCount: 18,
    },
    {
      id: "fruit-waste-products",
      name: "Fruit Waste Products",
      description: "Products made from fruit waste materials",
      image: "/categories/fruit-waste.jpg",
      productCount: 12,
    },
    {
      id: "others",
      name: "Others",
      description: "Other eco-friendly products",
      image: "/categories/others.jpg",
      productCount: 30,
    },
  ]

  await db.collection("categories").insertMany(categories)
  console.log(`Seeded ${categories.length} categories`)
}

/**
 * Seeds products
 * @param db MongoDB database
 */
async function seedProductsData(db: any): Promise<void> {
  const products: Product[] = [
    {
      id: "1",
      name: "Recycled Plastic Chair",
      description: "Comfortable chair made from recycled plastic materials.",
      price: 15000,
      category: "plastic-made-products",
      image: "/products/chair-1.jpg",
      rating: 4.5,
      reviews: 120,
      attributes: ["Eco-friendly", "Durable", "Lightweight"],
    },
    {
      id: "2",
      name: "Recycled Plastic Table",
      description: "Sturdy table made from recycled plastic materials.",
      price: 25000,
      category: "plastic-made-products",
      image: "/products/table-1.jpg",
      rating: 4.3,
      reviews: 85,
      attributes: ["Eco-friendly", "Durable", "Water-resistant"],
    },
    {
      id: "3",
      name: "Recycled Glass Bowl",
      description: "Beautiful bowl made from recycled glass materials.",
      price: 8000,
      category: "glass-made-products",
      image: "/products/bowl-1.jpg",
      rating: 4.7,
      reviews: 65,
      attributes: ["Eco-friendly", "Handcrafted", "Dishwasher-safe"],
    },
    {
      id: "4",
      name: "Recycled Plastic Stool",
      description: "Lightweight stool made from recycled plastic materials.",
      price: 12000,
      category: "plastic-made-products",
      image: "/products/stool-1.jpg",
      rating: 4.2,
      reviews: 42,
      attributes: ["Eco-friendly", "Stackable", "Indoor/Outdoor"],
    },
    {
      id: "5",
      name: "Recycled Plastic Bottle",
      description: "Reusable water bottle made from recycled plastic materials.",
      price: 5000,
      category: "plastic-made-products",
      image: "/products/bottle-1.jpg",
      rating: 4.8,
      reviews: 150,
      attributes: ["Eco-friendly", "BPA-free", "Dishwasher-safe"],
    },
    {
      id: "6",
      name: "Recycled Fabric Shoes",
      description: "Comfortable shoes made from recycled fabric materials.",
      price: 18000,
      category: "others",
      image: "/products/shoes-1.jpg",
      rating: 4.6,
      reviews: 78,
      attributes: ["Eco-friendly", "Comfortable", "Vegan"],
    },
    {
      id: "7",
      name: "Recycled Fabric Shorts",
      description: "Stylish shorts made from recycled fabric materials.",
      price: 9000,
      category: "others",
      image: "/products/shorts-1.jpg",
      rating: 4.4,
      reviews: 56,
      attributes: ["Eco-friendly", "Breathable", "Machine-washable"],
    },
    {
      id: "8",
      name: "Recycled Plastic Chair (Modern)",
      description: "Modern chair design made from recycled plastic materials.",
      price: 17000,
      category: "plastic-made-products",
      image: "/products/chair-2.jpg",
      rating: 4.7,
      reviews: 92,
      attributes: ["Eco-friendly", "Modern design", "Weather-resistant"],
    },
  ]

  await db.collection("products").insertMany(products)
  console.log(`Seeded ${products.length} products`)
}

/**
 * Seeds users
 * @param db MongoDB database
 */
async function seedUsers(db: any): Promise<void> {
  const hashedPassword = await bcrypt.hash("password", 10)

  const users: User[] = [
    {
      id: "1",
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
    },
    {
      id: "2",
      email: "seller@example.com",
      password: hashedPassword,
      name: "Seller User",
      role: "seller",
      createdAt: new Date(),
    },
    {
      id: "3",
      email: "customer@example.com",
      password: hashedPassword,
      name: "Customer User",
      role: "customer",
      createdAt: new Date(),
    },
  ]

  await db.collection("users").insertMany(users)
  console.log(`Seeded ${users.length} users`)
}

/**
 * Seeds exchange rates
 * @param db MongoDB database
 */
async function seedExchangeRates(db: any): Promise<void> {
  const exchangeRates: ExchangeRate[] = [
    { currency: "NGN", rate: 1 },
    { currency: "USD", rate: 0.00067 },
    { currency: "EUR", rate: 0.00062 },
    { currency: "GBP", rate: 0.00053 },
  ]

  // Delete existing rates
  await db.collection("exchange_rates").deleteMany({})

  // Insert new rates
  await db.collection("exchange_rates").insertMany(exchangeRates)
  console.log(`Seeded ${exchangeRates.length} exchange rates`)
}
