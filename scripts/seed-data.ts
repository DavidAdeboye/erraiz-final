import { connectToDatabase } from "../lib/db"
import { createUser } from "../lib/auth"
import { createProduct, type ProductCategory } from "../lib/models/product"

async function seedDatabase() {
  console.log("Connecting to database...")
  const { db } = await connectToDatabase()

  // Clear existing data
  console.log("Clearing existing data...")
  await db.collection("users").deleteMany({})
  await db.collection("sessions").deleteMany({})
  await db.collection("products").deleteMany({})

  // Create users
  console.log("Creating users...")
  const buyerUser = await createUser("Demo User", "demo@example.com", "password123", ["buyer"])
  const sellerUser = await createUser("Seller Demo", "seller@example.com", "password123", ["buyer", "seller"])
  const adminUser = await createUser("Admin User", "admin@example.com", "password123", ["admin"])

  // Update seller profile
  if (sellerUser) {
    const users = db.collection("users")
    await users.updateOne(
      { id: sellerUser.id },
      {
        $set: {
          businessName: "Eco Solutions",
          businessAddress: "123 Green St, Eco City",
          businessDescription: "We provide sustainable products for everyday use.",
          isVerified: true,
          storeSlug: "eco-solutions",
        },
      },
    )
  }

  // Create products
  console.log("Creating products...")

  const categories: ProductCategory[] = ["plastic", "glass", "paper", "metal", "fabric", "electronics"]

  for (const category of categories) {
    for (let i = 1; i <= 8; i++) {
      const productName = `${category.charAt(0).toUpperCase() + category.slice(1)} Recycled Item ${i}`

      await createProduct({
        sellerId: sellerUser?.id || "unknown",
        name: productName,
        slug: `${category}-recycled-item-${i}`,
        description: `This eco-friendly ${category} product is made from 100% recycled materials. Perfect for sustainable living while helping reduce waste.`,
        price: 19.99 + i * 5,
        currency: "USD",
        stock: 50 + i * 10,
        category,
        tags: ["eco-friendly", "recycled", category, "sustainable"],
        images: [
          {
            id: `img-${category}-${i}-1`,
            url: "/placeholder.svg",
            alt: productName,
            isPrimary: true,
          },
          {
            id: `img-${category}-${i}-2`,
            url: "/placeholder.svg",
            alt: `${productName} - Alternate View`,
            isPrimary: false,
          },
        ],
        variants:
          category === "fabric" || category === "plastic"
            ? [
                {
                  id: `var-${category}-${i}-1`,
                  name: "Color",
                  options: ["Green", "Blue", "Black", "Natural"],
                },
                {
                  id: `var-${category}-${i}-2`,
                  name: "Size",
                  options: ["Small", "Medium", "Large"],
                },
              ]
            : undefined,
        specifications: {
          Material: `Recycled ${category}`,
          Weight: `${(i * 0.2).toFixed(1)} kg`,
          Dimensions: `${10 + i}cm x ${15 + i}cm x ${5 + i}cm`,
          "Country of Origin": "USA",
        },
        status: "active",
        isFeatured: i <= 2,
        isEcoFriendly: true,
        ecoScore: 4 + (i % 2),
        reviews:
          i % 3 === 0
            ? [
                {
                  id: `review-${category}-${i}-1`,
                  userId: buyerUser?.id || "unknown",
                  userName: buyerUser?.name || "Unknown User",
                  rating: 4,
                  title: "Great eco-friendly product",
                  comment:
                    "I love how this product is both functional and environmentally responsible. Would definitely recommend!",
                  date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
                  isVerifiedPurchase: true,
                  helpfulVotes: 5,
                },
                {
                  id: `review-${category}-${i}-2`,
                  userId: "another-user",
                  userName: "Jane Smith",
                  rating: 5,
                  title: "Exceeded expectations",
                  comment:
                    "This product is even better than I expected. The quality is excellent and I feel good about using recycled materials.",
                  date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
                  isVerifiedPurchase: true,
                  helpfulVotes: 2,
                },
              ]
            : undefined,
        averageRating: i % 3 === 0 ? 4.5 : undefined,
        totalReviews: i % 3 === 0 ? 2 : 0,
      })
    }
  }

  console.log("Database seeded successfully!")
}

// Run the seed function
seedDatabase()
  .catch(console.error)
  .finally(() => process.exit())
