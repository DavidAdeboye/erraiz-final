import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/plastic-made-products" className="text-sm text-gray-600 hover:text-green-600">
                  Plastic Made Products
                </Link>
              </li>
              <li>
                <Link href="/categories/glass-made-products" className="text-sm text-gray-600 hover:text-green-600">
                  Glass Made Products
                </Link>
              </li>
              <li>
                <Link href="/categories/fruits-waste-products" className="text-sm text-gray-600 hover:text-green-600">
                  Fruits Waste Products
                </Link>
              </li>
              <li>
                <Link href="/categories/others" className="text-sm text-gray-600 hover:text-green-600">
                  Others
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-green-600">
                  About ERaiiz
                </Link>
              </li>
              <li>
                <Link href="/become-supplier" className="text-sm text-gray-600 hover:text-green-600">
                  Become a Supplier
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-gray-600 hover:text-green-600">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-green-600">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-green-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-green-600">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-green-600">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-600 hover:text-green-600">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/newsletter" className="text-sm text-gray-600 hover:text-green-600">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com" className="text-sm text-gray-600 hover:text-green-600">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://facebook.com" className="text-sm text-gray-600 hover:text-green-600">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com" className="text-sm text-gray-600 hover:text-green-600">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} ERaiiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
