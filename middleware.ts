import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Define protected routes that require authentication
const protectedRoutes = ["/account", "/checkout"]

// Define admin-only routes
const adminRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next()
  }

  // Get the token from the cookie
  const token = request.cookies.get("auth_token")?.value

  // If no token, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // For admin routes, check if user is admin
    if (isAdminRoute && payload.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // Token is invalid, redirect to login
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*"],
}
