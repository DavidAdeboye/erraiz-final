import { requireRole } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"
import Link from "next/link"

export default function SellerOrdersPage() {
  // This will redirect if not authenticated as a seller
  requireRole("seller")

  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      customer: "John Doe",
      date: "May 10, 2025",
      status: "Delivered",
      items: 3,
      total: "$74.97",
    },
    {
      id: "ORD-12344",
      customer: "Jane Smith",
      date: "May 9, 2025",
      status: "Processing",
      items: 2,
      total: "$49.98",
    },
    {
      id: "ORD-12343",
      customer: "Robert Johnson",
      date: "May 8, 2025",
      status: "Shipped",
      items: 5,
      total: "$124.50",
    },
    {
      id: "ORD-12342",
      customer: "Emily Davis",
      date: "May 7, 2025",
      status: "Pending",
      items: 1,
      total: "$89.99",
    },
    {
      id: "ORD-12341",
      customer: "Michael Brown",
      date: "May 6, 2025",
      status: "Delivered",
      items: 2,
      total: "$34.75",
    },
    {
      id: "ORD-12340",
      customer: "Sarah Wilson",
      date: "May 5, 2025",
      status: "Delivered",
      items: 4,
      total: "$67.25",
    },
    {
      id: "ORD-12339",
      customer: "David Taylor",
      date: "May 4, 2025",
      status: "Cancelled",
      items: 1,
      total: "$29.99",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-500">Manage and process customer orders</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID or customer..."
              className="pl-10 pr-4 py-2 border rounded-md w-full"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link href={`/seller/orders/${order.id}`}>{order.id}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/seller/orders/${order.id}`}
                      className="text-green-600 hover:text-green-900 font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 7 of 7 orders</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md text-sm" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border rounded-md text-sm" disabled>
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
