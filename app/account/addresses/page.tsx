import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function AccountAddressesPage() {
  // This will redirect to login if not authenticated
  requireAuth()

  // Mock addresses data
  const addresses = [
    {
      id: "addr-1",
      name: "Home",
      isDefault: true,
      fullName: "John Doe",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
      phone: "(123) 456-7890",
    },
    {
      id: "addr-2",
      name: "Work",
      isDefault: false,
      fullName: "John Doe",
      address: "456 Market St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94103",
      country: "United States",
      phone: "(123) 456-7890",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Your Addresses</h2>
            <p className="text-sm text-gray-500">Manage your shipping addresses</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>

        {addresses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-4 relative ${address.isDefault ? "border-green-600" : ""}`}
              >
                {address.isDefault && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    Default
                  </div>
                )}
                <div className="font-medium mb-1">{address.name}</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{address.fullName}</p>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                  <p>{address.phone}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="text-sm text-green-600 hover:underline">Edit</button>
                  <button className="text-sm text-red-600 hover:underline">Delete</button>
                  {!address.isDefault && (
                    <button className="text-sm text-blue-600 hover:underline">Set as Default</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">You haven't added any addresses yet.</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
