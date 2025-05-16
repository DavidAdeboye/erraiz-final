"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  createSession,
  createUser,
  deleteSession,
  getUserByEmail,
  switchRole,
  updateSellerProfile,
  updateUserRoles,
  verifyPassword,
  type UserRole,
} from "@/lib/auth"

// Login action
export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectTo = (formData.get("redirectTo") as string) || "/account"

  // Validate input
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Get user
  const user = await getUserByEmail(email)

  // Check if user exists and password is correct
  if (!user || !(await verifyPassword(password, user.password))) {
    return { error: "Invalid email or password" }
  }

  // Determine active role (default to buyer if available, otherwise first role)
  const activeRole = user.roles.includes("buyer") ? "buyer" : user.roles[0]

  // Create session
  const sessionId = await createSession(user.id, activeRole)

  if (!sessionId) {
    return { error: "Failed to create session" }
  }

  // Set session cookie
  cookies().set({
    name: "sessionId",
    value: sessionId,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  })

  // Store the current path
  cookies().set({
    name: "path",
    value: new URL(redirectTo, "http://localhost").pathname,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  })

  // Redirect to account page
  redirect(redirectTo)
}

// Register action
export async function register(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const role = formData.get("role") as string

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  // Check if user already exists
  if (await getUserByEmail(email)) {
    return { error: "Email already in use" }
  }

  // Determine roles based on selection
  let roles: UserRole[] = ["buyer"]
  if (role === "seller") {
    roles = ["seller"]
  } else if (role === "both") {
    roles = ["buyer", "seller"]
  }

  // Create user
  const user = await createUser(name, email, password, roles)

  if (!user) {
    return { error: "Failed to create user" }
  }

  // Create session with appropriate active role
  const activeRole = roles.includes("buyer") ? "buyer" : roles[0]
  const sessionId = await createSession(user.id, activeRole)

  if (!sessionId) {
    return { error: "Failed to create session" }
  }

  // Set session cookie
  cookies().set({
    name: "sessionId",
    value: sessionId,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  })

  // Redirect to account page or seller onboarding if seller role
  if (roles.includes("seller") && activeRole === "seller") {
    redirect("/seller/onboarding")
  } else {
    redirect("/account")
  }
}

// Logout action
export async function logout() {
  // Delete session
  await deleteSession()

  // Clear session cookie
  cookies().delete("sessionId")
  cookies().delete("path")

  // Redirect to home page
  redirect("/")
}

// Update profile action
export async function updateProfile(prevState: any, formData: FormData) {
  // In a real app, you would update the user's profile in the database
  // For this demo, we'll just return a success message
  return { success: "Profile updated successfully" }
}

// Update password action
export async function updatePassword(prevState: any, formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match" }
  }

  // In a real app, you would verify the current password and update it in the database
  // For this demo, we'll just return a success message
  return { success: "Password updated successfully" }
}

// Switch role action
export async function switchUserRole(prevState: any, formData: FormData) {
  const role = formData.get("role") as UserRole

  if (!role) {
    return { error: "Role is required" }
  }

  const success = await switchRole(role)

  if (!success) {
    return { error: "Failed to switch role" }
  }

  // Redirect based on the new role
  if (role === "seller") {
    redirect("/seller/dashboard")
  } else if (role === "buyer") {
    redirect("/account")
  } else if (role === "admin") {
    redirect("/admin/dashboard")
  }

  return { success: "Role switched successfully" }
}

// Become a seller action
export async function becomeASeller(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string

  if (!userId) {
    return { error: "User ID is required" }
  }

  const success = await updateUserRoles(userId, ["buyer", "seller"])

  if (!success) {
    return { error: "Failed to update user roles" }
  }

  // Switch to seller role
  await switchRole("seller")

  // Redirect to seller onboarding
  redirect("/seller/onboarding")
}

// Complete seller onboarding action
export async function completeSellerOnboarding(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string
  const businessName = formData.get("businessName") as string
  const businessAddress = formData.get("businessAddress") as string
  const businessDescription = formData.get("businessDescription") as string
  const storeSlug = formData.get("storeSlug") as string

  // Validate input
  if (!userId || !businessName || !businessAddress || !storeSlug) {
    return { error: "All required fields must be filled" }
  }

  // Update seller profile
  const success = await updateSellerProfile(userId, {
    businessName,
    businessAddress,
    businessDescription,
    storeSlug,
  })

  if (!success) {
    return { error: "Failed to update seller profile" }
  }

  // Redirect to seller dashboard
  redirect("/seller/dashboard")
}
