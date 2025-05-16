import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { CreditCard, PlusCircle } from "lucide-react"

export default function AccountPaymentMethodsPage() {
  // This will redirect to login if not authenticated
  requireAuth()

  // Mock payment methods data
  const paymentMethods = [
    {
      id: "pm-1",
      type: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "Mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2026,
      isDefault: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <p className="text-sm text-gray-500">Manage your payment methods</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>

        {paymentMethods.length > 0 ? (
          <div className="divide-y">
            {paymentMethods.map((method) => (
              <div key={method.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {method.type} •••• {method.last4}
                      {method.isDefault && (
                        <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">Default</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Expires {method.expMonth}/{method.expYear}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-green-600 hover:underline">Edit</button>
                  <button className="text-sm text-red-600 hover:underline">Delete</button>
                  {!method.isDefault && (
                    <button className="text-sm text-blue-600 hover:underline">Set as Default</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">You haven't added any payment methods yet.</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
