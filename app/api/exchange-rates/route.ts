import { NextResponse } from "next/server"
import { getExchangeRates, updateExchangeRates } from "@/lib/data"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get exchange rates
export async function GET() {
  try {
    const rates = await getExchangeRates()
    return NextResponse.json({ rates })
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update exchange rates
export async function PUT(request: Request) {
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

    // Get rates data
    const rates = await request.json()

    // Update rates
    const success = await updateExchangeRates(rates)

    if (!success) {
      return NextResponse.json({ message: "Failed to update exchange rates" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating exchange rates:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
