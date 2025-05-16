import { Card } from "@/components/ui/card"
import { BarChart3, Box, DollarSign, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  // Mock data for admin dashboard
  const stats = [
    { title: "Total Revenue", value: "$24,389.75", icon: DollarSign, change: "+12.5%" },
    { title: "Total Orders", value: "583", icon: ShoppingCart, change: "+5.3%" },
    { title: "Total Products", value: "1,248", icon: Box, change: "+2.1%" },
    { title: "Total Users", value: "3,942", icon: Users, change: "+8.7%" },
  ]

  const recentOrders = [
    { id: "ORD-12345", customer: "John Doe", date: "May 10, 2025", status: "Delivered", total: "$74.97" },
    { id: "ORD-12344", customer: "Jane Smith", date: "May 9, 2025", status: "Processing", total: "$49.98" },
    { id: "ORD-12343", customer: "Robert Johnson", date: "May 8, 2025", status: "Shipped", total: "$124.50" },
    { id: "ORD-12342", customer: "Emily Davis", date: "May 7, 2025", status: "Pending", total: "$89.99" },
    { id: "ORD-12341", customer: "Michael Brown", date: "May 6, 2025", status: "Delivered", total: "$34.75" },
  ]

  const topSellers = [
    { id: "1", name: "Eco Solutions", sales: "$4,289.50", products: 48 },
    { id: "2", name: "Green Living", sales: "$3,752.25", products: 36 },
    { id: "3", name: "Sustainable Home", sales: "$2,984.75", products: 29 },
    { id: "4", name: "Recycled Wonders", sales: "$2,541.00", products: 24 },
    { id: "5", name: "Earth Friendly Goods", sales: "$1,987.50", products: 19 },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to the admin dashboard</p>
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
                        <Link href={`/admin/orders/${order.id}`}>{order.id}</Link>
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
              <Link href="/admin/orders" className="text-sm text-green-600 hover:underline">
                View All Orders
              </Link>
            </div>
          </Card>
        </div>

        <div>
          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Top Sellers</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {topSellers.map((seller) => (
                  <div key={seller.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{seller.name}</p>
                        <p className="text-xs text-gray-500">{seller.products} products</p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{seller.sales}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t text-center">
              <Link href="/admin/sellers" className="text-sm text-green-600 hover:underline">
                View All Sellers
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card className="overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <BarChart3 className="h-16 w-16 text-gray-300" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
