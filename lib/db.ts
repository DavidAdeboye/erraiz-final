import { MongoClient, type Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const MONGODB_DB = process.env.MONGODB_DB || "eraiiz_ecommerce"

// Connection cache
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

/**
 * Connects to MongoDB
 * @returns MongoDB client and database
 */
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If we have cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // If no cached connection, create a new one
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  if (!MONGODB_DB) {
    throw new Error("Please define the MONGODB_DB environment variable")
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(MONGODB_DB)

    // Cache the connection
    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error)

    // Fallback to in-memory data if MongoDB connection fails
    console.warn("Using in-memory data as fallback")

    // Return null values to indicate connection failure
    return { client: null as unknown as MongoClient, db: null as unknown as Db }
  }
}

/**
 * Closes MongoDB connection
 */
export async function closeDbConnection(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}
