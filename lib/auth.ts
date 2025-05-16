import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getCollection } from "./db"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

// User roles
export type UserRole = "buyer" | "seller" | "admin"

// User type
export type User = {
  id: string
  name: string
  email: string
  password: string // Hashed password
  roles: UserRole[]
  createdAt: Date
  // Seller-specific fields
  businessName?: string
  businessAddress?: string
  businessDescription?: string
  isVerified?: boolean
  storeSlug?: string
}

// Session type
export type Session = {
  id: string
  userId: string
  expires: Date
  activeRole: UserRole
  createdAt: Date
}

// Get user by email
export async function getUserByEmail(email: string) {
  const users = await getCollection("users")
  return users.findOne({ email })
}

// Get user by ID
export async function getUserById(id: string) {
  const users = await getCollection("users")
  return users.findOne({ id })
}

// Create a new user
export async function createUser(name: string, email: string, password: string, roles: UserRole[] = ["buyer"]) {
  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return null
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const user: User = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    roles,
    createdAt: new Date(),
  }

  const users = await getCollection("users")
  await users.insertOne(user)
  return user
}

// Create a session for a user
export async function createSession(userId: string, activeRole: UserRole = "buyer") {
  const user = await getUserById(userId)

  // Verify the user has the requested role
  if (!user || !user.roles.includes(activeRole)) {
    return null
  }

  const sessionId = uuidv4()
  const expires = new Date()
  expires.setDate(expires.getDate() + 7) // 7 days from now

  const session: Session = {
    id: sessionId,
    userId,
    expires,
    activeRole,
    createdAt: new Date(),
  }

  const sessions = await getCollection("sessions")
  await sessions.insertOne(session)

  return sessionId
}

// Get current session
export async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  if (!sessionId) {
    return null
  }

  const sessions = await getCollection("sessions")
  const session = await sessions.findOne({ id: sessionId })

  if (!session) {
    return null
  }

  // Check if session has expired
  if (new Date() > session.expires) {
    await sessions.deleteOne({ id: sessionId })
    return null
  }

  return session
}

// Get current user
export async function getCurrentUser() {
  const session = await getSession()

  if (!session) {
    return null
  }

  return getUserById(session.userId)
}

// Get current active role
export async function getActiveRole(): Promise<UserRole | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  return session.activeRole
}

// Switch active role
export async function switchRole(role: UserRole) {
  const session = await getSession()
  const cookieStore = cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  if (!session || !sessionId) {
    return false
  }

  const user = await getUserById(session.userId)

  if (!user || !user.roles.includes(role)) {
    return false
  }

  const sessions = await getCollection("sessions")
  await sessions.updateOne({ id: sessionId }, { $set: { activeRole: role } })

  return true
}

// Delete session
export async function deleteSession() {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  if (sessionId) {
    const sessions = await getCollection("sessions")
    await sessions.deleteOne({ id: sessionId })
  }
}

// Require authentication
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(
      "/login?redirect=" +
        encodeURIComponent(new URL(cookies().get("path")?.value || "/", "http://localhost").pathname),
    )
  }

  return user
}

// Require specific role
export async function requireRole(role: UserRole) {
  const user = await requireAuth()
  const activeRole = await getActiveRole()

  if (!user.roles.includes(role) || activeRole !== role) {
    redirect("/account")
  }

  return user
}

// Check if user has a specific role
export async function hasRole(role: UserRole) {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  return user.roles.includes(role)
}

// Update user roles
export async function updateUserRoles(userId: string, roles: UserRole[]) {
  const users = await getCollection("users")
  const result = await users.updateOne({ id: userId }, { $set: { roles } })

  return result.modifiedCount > 0
}

// Update seller profile
export async function updateSellerProfile(
  userId: string,
  data: {
    businessName?: string
    businessAddress?: string
    businessDescription?: string
    storeSlug?: string
  },
) {
  const users = await getCollection("users")
  const result = await users.updateOne({ id: userId }, { $set: data })

  return result.modifiedCount > 0
}

// Verify password
export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword)
}
