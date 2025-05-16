import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, ChevronDown, Menu, Heart } from "lucide-react"
import { getCurrentUser, getActiveRole } from "@/lib/auth"
import UserMenu from "./user-menu"
import CurrencySelector from "./currency-selector"

export default function Header() {
  const user = getCurrentUser()
  const activeRole = getActiveRole()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Cireco Logo" width={100} height={40} className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <Link href="/" className="font-medium">
                Home
              </Link>
              <Link href="/shop" className="font-medium">
                Shop
              </Link>
              <Link href="/about" className="font-medium">
                About
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 font-medium">
                  More <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <CurrencySelector />

            {user && activeRole ? (
              <UserMenu user={user} activeRole={activeRole} />
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="text-sm font-medium">
                  Login
                </Link>
                <User className="h-5 w-5" />
              </div>
            )}

            {user && (
              <Link href="/wishlist" className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium">Wishlist</span>
                <Heart className="h-5 w-5" />
              </Link>
            )}

            <div className="hidden md:flex items-center gap-2">
              <Link href="/cart" className="text-sm font-medium">
                Cart
              </Link>
              <ShoppingCart className="h-5 w-5" />
            </div>
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
