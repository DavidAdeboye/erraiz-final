"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, LogOut, Settings, ShoppingBag, Store, User } from "lucide-react"
import { logout, switchUserRole } from "@/app/actions"
import type { UserRole } from "@/lib/auth"

type UserType = {
  id: string
  name: string
  email: string
  roles: UserRole[]
}

export default function UserMenu({ user, activeRole }: { user: UserType; activeRole: UserRole }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    await logout()
  }

  const handleRoleSwitch = (role: UserRole) => {
    const form = document.createElement("form")
    form.method = "post"
    form.style.display = "none"

    const roleInput = document.createElement("input")
    roleInput.name = "role"
    roleInput.value = role

    form.appendChild(roleInput)
    document.body.appendChild(form)

    const formData = new FormData(form)
    switchUserRole(null, formData)

    document.body.removeChild(form)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 text-sm font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Hi, {user?.name ? user.name.split(" ")[0] : "Guest"}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <div className="mt-1 flex items-center">
                <span className="text-xs text-gray-500 mr-2">Active role:</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                  {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
                </span>
              </div>
            </div>

            {/* Role switcher */}
            {user.roles.length > 1 && (
              <div className="px-4 py-2 border-b">
                <p className="text-xs text-gray-500 mb-2">Switch to:</p>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleSwitch(role)}
                      disabled={role === activeRole}
                      className={`text-xs px-2 py-1 rounded-md ${
                        role === activeRole
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buyer links */}
            {activeRole === "buyer" && (
              <>
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  My Account
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  My Orders
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  My Wishlist
                </Link>
              </>
            )}

            {/* Seller links */}
            {activeRole === "seller" && (
              <>
                <Link
                  href="/seller/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <Store className="h-4 w-4" />
                  Seller Dashboard
                </Link>
                <Link
                  href="/seller/products"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  My Products
                </Link>
                <Link
                  href="/seller/orders"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Orders
                </Link>
              </>
            )}

            {/* Admin links */}
            {activeRole === "admin" && (
              <>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <Store className="h-4 w-4" />
                  Admin Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Manage Users
                </Link>
              </>
            )}

            {/* Common links */}
            <Link
              href="/account/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
