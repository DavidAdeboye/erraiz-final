import { NextResponse } from "next/server"
import { getUserById, updateUser } from "@/lib/data"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

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
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    // Get user data
    const user = await getUserById(decoded.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Get update data
    const updates = await request.json()

    // Don't allow updating sensitive fields
    delete updates.password
    delete updates.role
    delete updates.id
    delete updates.email

    // Update user
    const updatedUser = await updateUser(user.id, updates)

    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update profile" }, { status: 500 })
    }

    // Return updated user data
    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      },
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
