import Link from "next/link"
import { Check } from "lucide-react"

export default function OrderConfirmation() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Thank you for order!</h2>
        <p className="text-gray-600 mb-8">
          Your order has been confirmed and will be shipped soon. We'll send you an email with tracking information.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-medium mb-4">Order information</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order number:</span>
              <span className="font-medium">ER-12345678</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Date of order:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-medium mb-4">Delivery information</h3>

          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>

            <div className="flex justify-between pt-4">
              <span className="text-gray-500">Estimated delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} -{" "}
                {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <Link href="/" className="btn-primary">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
