import { connectToDatabase } from "./db"

export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName)
}
