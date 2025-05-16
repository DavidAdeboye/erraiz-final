import type React from "react"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { CreditCard, Home, Package, Settings, User } from "lucide-react"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  // This will redirect to login if not authenticated
  const user = requireAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            <nav className="p-2">
              <Link href="/account" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm">
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
              >
                <Package className="h-4 w-4" />
                Orders
              </Link>
              <Link
                href="/account/addresses"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
              >
                <Home className="h-4 w-4" />
                Addresses
              </Link>
              <Link
                href="/account/payment-methods"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
              >
                <CreditCard className="h-4 w-4" />
                Payment Methods
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>

        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  )
}
