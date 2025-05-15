"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, ShoppingBag, Heart, CreditCard, MapPin, Bell, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function AccountSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    { href: "/account", icon: User, label: "Profile" },
    { href: "/account/orders", icon: ShoppingBag, label: "Orders" },
    { href: "/account/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/account/payment", icon: CreditCard, label: "Payment Methods" },
    { href: "/account/addresses", icon: MapPin, label: "Addresses" },
    { href: "/account/notifications", icon: Bell, label: "Notifications" },
    { href: "/account/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <nav className="flex flex-col">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm ${
                isActive ? "bg-green-50 text-green-600 border-l-2 border-green-600" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          )
        })}

        <button onClick={logout} className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50">
          <LogOut className="h-5 w-5 mr-3" />
          Sign out
        </button>
      </nav>
    </div>
  )
}
