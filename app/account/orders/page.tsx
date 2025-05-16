import Link from "next/link"
import Image from "next/image"
import { requireAuth } from "@/lib/auth"

export default function AccountOrdersPage() {
  // This will redirect to login if not authenticated
  requireAuth()

  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "May 10, 2025",
      status: "Delivered",
      total: 74.97,
      items: [
        {
          id: "product-1",
          name: "Recycled Plastic Container",
          price: 24.99,
          quantity: 2,
          image: "/placeholder.svg",
        },
        {
          id: "product-2",
          name: "Glass Vase",
          price: 24.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "ORD-12344",
      date: "April 28, 2025",
      status: "Processing",
      total: 49.98,
      items: [
        {
          id: "product-3",
          name: "Recycled Paper Notebook",
          price: 12.99,
          quantity: 2,
          image: "/placeholder.svg",
        },
        {
          id: "product-4",
          name: "Bamboo Utensil Set",
          price: 24.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Order History</h2>
          <p className="text-sm text-gray-500">View and track your orders</p>
        </div>

        {orders.length > 0 ? (
          <div className="divide-y">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">
                      Status:{" "}
                      <span
                        className={`${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : order.status === "Processing"
                              ? "text-blue-600"
                              : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm">Total: ${order.total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Link href={`/account/orders/${order.id}`} className="text-sm text-green-600 hover:underline">
                    View Order Details
                  </Link>
                  {order.status === "Delivered" && (
                    <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">Buy Again</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <Link href="/shop" className="text-green-600 hover:underline">
              Start shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
