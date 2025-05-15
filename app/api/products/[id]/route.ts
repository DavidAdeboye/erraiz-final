import { NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct } from "@/lib/data"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    // Get update data
    const updates = await request.json()

    // Update product
    const updatedProduct = await updateProduct(params.id, updates)

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product: updatedProduct })
  } catch (error) {
    console.error(`Error updating product ${params.id}:`, error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    // Check if user is admin
    if (decoded.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Delete product
    const success = await deleteProduct(params.id)

    if (!success) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting product ${params.id}:`, error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
