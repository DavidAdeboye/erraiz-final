"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import LanguageSelector from "./language-selector"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { cartItems } = useCart()

  const categories = [
    { name: "Plastic Made Products", href: "/categories/plastic-made-products" },
    { name: "Glass Made Products", href: "/categories/glass-made-products" },
    { name: "Fruits Waste Products", href: "/categories/fruits-waste-products" },
    { name: "Others", href: "/categories/others" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsCategoryDropdownOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Mobile Header */}
        <div className="flex sm:hidden justify-between items-center py-3">
          {/* Mobile Menu Button */}
          <button className="text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="ERaiiz" width={80} height={24} className="h-6 w-auto" />
            </div>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-700"
              onClick={(e) => {
                e.stopPropagation()
                setIsLanguageModalOpen(true)
              }}
            >
              <div className="flex items-center">
                <Image src="/flags/ng.svg" alt="Nigeria" width={20} height={20} className="h-5 w-5 rounded-full" />
              </div>
            </button>

            <Link href="/cart" className="text-gray-700 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for a product name..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-2">
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`block py-2 ${pathname === category.href ? "text-green-600 font-medium" : "text-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  href={isAuthenticated ? "/account" : "/login"}
                  className="flex items-center py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>My account</span>
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden sm:flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="ERaiiz" width={100} height={32} className="h-8 w-auto" />
            </div>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className={`nav-link ${pathname === "/about" ? "active-nav-link" : ""}`}>
              About ERaiiz
            </Link>
            <Link
              href="/become-supplier"
              className={`nav-link ${pathname === "/become-supplier" ? "active-nav-link" : ""}`}
            >
              Become a Supplier
            </Link>
            <Link href="/help" className={`nav-link ${pathname === "/help" ? "active-nav-link" : ""}`}>
              Help
            </Link>
            <Link
              href="/contact-support"
              className={`nav-link ${pathname === "/contact-support" ? "active-nav-link" : ""}`}
            >
              Contact Support
            </Link>
          </nav>

          {/* Right Navigation */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="nav-link relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>

            {isAuthenticated ? (
              <Link href="/account" className="nav-link flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>My account</span>
              </Link>
            ) : (
              <Link href="/login" className="nav-link flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>My account</span>
              </Link>
            )}

            <button
              className="nav-link flex items-center"
              onClick={(e) => {
                e.stopPropagation()
                setIsLanguageModalOpen(true)
              }}
            >
              <div className="flex items-center">
                <Image src="/flags/ng.svg" alt="Nigeria" width={20} height={20} className="h-5 w-5 mr-1 rounded-full" />
                <span className="mr-1">NG</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Category Navigation & Search - Desktop */}
        <div className="hidden sm:flex flex-col md:flex-row justify-between items-center py-3 border-t border-gray-100">
          <div className="flex space-x-8 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`nav-link whitespace-nowrap ${pathname === category.href ? "active-nav-link" : ""}`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
            <form onSubmit={handleSearch} className="relative w-full md:w-64 lg:w-80">
              <input
                type="text"
                placeholder="Search item or product codes..."
                className="input-field pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <button className="ml-4 btn-outline flex items-center">
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Language Selector Modal */}
      {isLanguageModalOpen && <LanguageSelector onClose={() => setIsLanguageModalOpen(false)} />}
    </header>
  )
}
