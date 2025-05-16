import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Add Content-Security-Policy header in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'",
    )
  }

  // Cache static assets
  const url = request.nextUrl.pathname
  if (
    url.includes("/images/") ||
    url.includes("/fonts/") ||
    url.endsWith(".jpg") ||
    url.endsWith(".png") ||
    url.endsWith(".svg") ||
    url.endsWith(".webp")
  ) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Cache API responses
  if (url.startsWith("/api/")) {
    response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300")
  }

  // Store the current path in a cookie for redirects after login
  const path = request.nextUrl.pathname
  response.cookies.set("path", path, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })

  return response
}

// Only run middleware on specific paths
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
