import { NextResponse } from "next/server"
import { getProducts, addProduct } from "@/lib/data"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get all products
export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Add a new product
export async function POST(request: Request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Extract token
    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; user: { role: string } }

    // Check if user is admin or seller
    if (decoded.user.role !== "admin" && decoded.user.role !== "seller") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get product data
    const productData = await request.json()

    // Validate required fields
    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json({ message: "Name, price, and category are required" }, { status: 400 })
    }

    // Add product
    const newProduct = await addProduct(productData)

    return NextResponse.json({ product: newProduct })
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
