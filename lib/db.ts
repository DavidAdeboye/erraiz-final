import { MongoClient, type Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/recycling-ecommerce"
const MONGODB_DB = process.env.MONGODB_DB || "recycling-ecommerce"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If we have cached values, use them
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Connect to the database
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db(MONGODB_DB)

  // Cache the client and db for reuse
  cachedClient = client
  cachedDb = db

  return { client, db }
}

// Helper function to get a collection
export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName)
}
