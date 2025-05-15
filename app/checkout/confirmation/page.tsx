"use client"

import { useCart } from "@/context/cart-context"
import CheckoutSteps from "@/components/checkout-steps"
import OrderConfirmation from "@/components/order-confirmation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ConfirmationPage() {
  const { cartItems, clearCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    // Clear cart after successful order
    clearCart()
  }, [clearCart])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <CheckoutSteps currentStep={3} />
      <OrderConfirmation />
    </div>
  )
}
