import Link from "next/link"

export default function Footer() {
  return (
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
  )
}
