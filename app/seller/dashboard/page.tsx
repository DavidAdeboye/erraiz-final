import { requireRole } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { BarChart3, Box, DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function SellerDashboardPage() {
  // This will redirect if not authenticated as a seller
  const user = requireRole("seller")

  // Mock data for seller dashboard
  const stats = [
    { title: "Total Sales", value: "$1,245.89", icon: DollarSign, change: "+12.5%" },
    { title: "Orders", value: "25", icon: ShoppingCart, change: "+5.3%" },
    { title: "Products", value: "48", icon: Box, change: "+2.1%" },
    { title: "Customers", value: "152", icon: Users, change: "+8.7%" },
  ]

  const recentOrders = [
    { id: "ORD-12345", customer: "John Doe", date: "May 10, 2025", status: "Delivered", total: "$74.97" },
    { id: "ORD-12344", customer: "Jane Smith", date: "May 9, 2025", status: "Processing", total: "$49.98" },
    { id: "ORD-12343", customer: "Robert Johnson", date: "May 8, 2025", status: "Shipped", total: "$124.50" },
    { id: "ORD-12342", customer: "Emily Davis", date: "May 7, 2025", status: "Pending", total: "$89.99" },
    { id: "ORD-12341", customer: "Michael Brown", date: "May 6, 2025", status: "Delivered", total: "$34.75" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link
            href="/seller/products/new"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add New Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">{stat.change} from last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
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
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t text-center">
              <Link href="/seller/orders" className="text-sm text-green-600 hover:underline">
                View All Orders
              </Link>
            </div>
          </Card>
        </div>

        <div>
          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Sales Overview</h2>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <BarChart3 className="h-16 w-16 text-gray-300" />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Revenue</span>
                  <span className="font-semibold">$4,589.23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Average Order Value</span>
                  <span className="font-semibold">$45.89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Conversion Rate</span>
                  <span className="font-semibold">3.2%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t text-center">
              <Link href="/seller/analytics" className="text-sm text-green-600 hover:underline">
                View Detailed Analytics
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
