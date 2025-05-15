"use client"

import { useCart } from "@/context/cart-context"
import CartItem from "@/components/cart/cart-item"
import CartSummary from "@/components/cart/cart-summary"
import CheckoutSteps from "@/components/checkout-steps"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const router = useRouter()

  if (cartItems.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <CheckoutSteps currentStep={1} />

      <h1 className="text-2xl font-bold mb-8">Your order</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="flex justify-between">
            <Link href="/cart" className="btn-outline">
              Return to cart
            </Link>

            <Link href="/checkout/shipping" className="btn-primary">
              Continue to shipping
            </Link>
          </div>
        </div>

        <div>
          <CartSummary showCheckoutButton={false} />
        </div>
      </div>
    </div>
  )
}
