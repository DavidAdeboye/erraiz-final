"use client"

import { Card } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function OrderAnalytics() {
  // Mock data for order analytics
  const orderTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Orders",
        data: [65, 78, 52, 91, 43, 56, 61, 87, 75, 64, 92, 105],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const orderStatusData = {
    labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Order Status",
        data: [15, 25, 20, 35, 5],
        backgroundColor: [
          "rgba(234, 179, 8, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(234, 179, 8)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(34, 197, 94)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const fulfillmentTimeData = {
    labels: ["<1 day", "1-2 days", "2-3 days", "3-5 days", ">5 days"],
    datasets: [
      {
        label: "Fulfillment Time",
        data: [15, 35, 30, 15, 5],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  }

  const orderValueDistributionData = {
    labels: ["<$25", "$25-$50", "$50-$100", "$100-$200", ">$200"],
    datasets: [
      {
        label: "Order Value Distribution",
        data: [20, 35, 25, 15, 5],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Trend</h3>
        <div className="h-80">
          <LineChart data={orderTrendData} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Order Status</h3>
          <div className="h-80">
            <PieChart data={orderStatusData} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Fulfillment Time</h3>
          <div className="h-80">
            <BarChart data={fulfillmentTimeData} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Value Distribution</h3>
        <div className="h-80">
          <BarChart data={orderValueDistributionData} />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">ORD-12345</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2025</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Delivered
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$74.97</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">ORD-12344</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">May 14, 2025</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Processing
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$49.98</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">ORD-12343</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Robert Johnson</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">May 13, 2025</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    Shipped
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$124.50</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">ORD-12342</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Emily Davis</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">May 12, 2025</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$89.99</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">ORD-12341</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Michael Brown</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">May 11, 2025</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Cancelled
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$34.75</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Average Order Value</h4>
            <div className="text-xl font-semibold">$51.80</div>
            <div className="text-sm text-green-600 mt-1">↑ 4.3% from last month</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Average Fulfillment Time</h4>
            <div className="text-xl font-semibold">1.8 days</div>
            <div className="text-sm text-green-600 mt-1">↓ 0.3 days from last month</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Order Cancellation Rate</h4>
            <div className="text-xl font-semibold">2.5%</div>
            <div className="text-sm text-green-600 mt-1">↓ 0.8% from last month</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
