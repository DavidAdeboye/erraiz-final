"use client"

import { useCart } from "@/context/cart-context"
import CartItem from "@/components/cart-item"
import CartSummary from "@/components/cart-summary"
import EmptyCart from "@/components/empty-cart"
import Link from "next/link"

export default function CartPage() {
  const { cartItems } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-6">
            <Link href="/" className="text-green-600 hover:underline flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue shopping
            </Link>
          </div>
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
