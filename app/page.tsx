import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, User, ChevronDown, Menu } from "lucide-react"
import CategoryNav from "@/components/category-nav"
import ProductGrid from "@/components/product-grid"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
              <div className="hidden md:flex items-center gap-2">
                <Link href="/account" className="text-sm font-medium">
                  My Account
                </Link>
                <User className="h-5 w-5" />
              </div>
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

      <CategoryNav />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <HeroSection />

          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Categories</h2>
              <Link href="/shop" className="text-sm text-green-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Plastic", "Glass", "Fruits waste", "Palm fonds"].map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                  className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center aspect-square hover:bg-gray-200 transition"
                >
                  <h3 className="font-medium text-center">{category}</h3>
                  <p className="text-xs text-gray-500 mt-1">View products</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Products for you</h2>
              <Link href="/products" className="text-sm text-green-600 hover:underline">
                View all
              </Link>
            </div>
            <ProductGrid category="featured" />
          </section>

          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Plastic based products</h2>
              <Link href="/category/plastic" className="text-sm text-green-600 hover:underline">
                View all
              </Link>
            </div>
            <ProductGrid category="plastic" />
          </section>

          <section className="mt-16 bg-gray-100 rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2">Lorem ipsum dolor sit amet</h2>
                <p className="text-gray-600 mb-6">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition w-fit">
                  Learn More
                </button>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Glass based products</h2>
              <Link href="/category/glass" className="text-sm text-green-600 hover:underline">
                View all
              </Link>
            </div>
            <ProductGrid category="glass" />
          </section>
        </div>
      </main>

      <footer className="bg-gray-100 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-sm text-gray-600">
                We are dedicated to recycling and reusing waste materials to create sustainable products.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Customer Support</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-green-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-green-600">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-600 hover:text-green-600">
                    Shipping Information
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/products" className="text-gray-600 hover:text-green-600">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-green-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-green-600">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-2">Subscribe to get updates on new products and offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border border-gray-300 rounded-l-md text-sm w-full"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-6 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Cireco. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
