import { useCart } from "@/context/cart-context"
import Link from "next/link"

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export default function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { cartItems } = useCart()

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₦{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
        </div>

        <div className="flex justify-between text-base font-medium pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <Link href="/checkout" className="btn-primary w-full block text-center">
          Continue to payment
        </Link>
      )}
    </div>
  )
}
