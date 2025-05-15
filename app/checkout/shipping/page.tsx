"use client"

import { useCart } from "@/context/cart-context"
import CartSummary from "@/components/cart/cart-summary"
import CheckoutSteps from "@/components/checkout-steps"
import ShippingForm from "@/components/shipping-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ShippingPage() {
  const { cartItems } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }
  }, [cartItems, router])

  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <CheckoutSteps currentStep={2} />

      <h1 className="text-2xl font-bold mb-8">Shipping address</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ShippingForm />
        </div>

        <div>
          <CartSummary showCheckoutButton={false} />
        </div>
      </div>
    </div>
  )
}
