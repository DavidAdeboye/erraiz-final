"use client"

import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <span className="text-3xl font-bold">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-600">The page you are looking for doesn't exist or has been moved.</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-[1.02]"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p>
            Looking for something specific? Visit our{" "}
            <Link href="/shop" className="text-green-600 hover:underline">
              shop
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-green-600 hover:underline">
              contact us
            </Link>{" "}
            for help.
          </p>
        </div>
      </div>
    </div>
  )
}
