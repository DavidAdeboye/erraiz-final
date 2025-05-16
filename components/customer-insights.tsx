"use client"

import { Card } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function CustomerInsights() {
  // Mock data for customer insights
  const customerGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "New Customers",
        data: [45, 52, 38, 65, 48, 56, 47, 60, 55, 42, 68, 72],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
      {
        label: "Returning Customers",
        data: [30, 35, 28, 40, 32, 38, 35, 42, 38, 30, 45, 50],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  }

  const customerTypeData = {
    labels: ["New Customers", "Returning Customers"],
    datasets: [
      {
        label: "Customer Type",
        data: [65, 35],
        backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(59, 130, 246, 0.8)"],
        borderColor: ["rgb(34, 197, 94)", "rgb(59, 130, 246)"],
        borderWidth: 1,
      },
    ],
  }

  const customerLocationData = {
    labels: ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Other"],
    datasets: [
      {
        label: "Customers by Location",
        data: [45, 15, 12, 8, 7, 5, 8],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(148, 163, 184, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(249, 115, 22)",
          "rgb(168, 85, 247)",
          "rgb(236, 72, 153)",
          "rgb(234, 179, 8)",
          "rgb(148, 163, 184)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const customerAgeData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    datasets: [
      {
        label: "Customers by Age",
        data: [15, 30, 25, 18, 8, 4],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  }

  const customerLtvData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Average Customer LTV",
        data: [120, 125, 128, 130, 135, 140, 142, 145, 150, 155, 160, 165],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Type</h3>
          <div className="h-64">
            <PieChart data={customerTypeData} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Location</h3>
          <div className="h-64">
            <PieChart data={customerLocationData} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Age Distribution</h3>
          <div className="h-64">
            <BarChart data={customerAgeData} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Growth</h3>
        <div className="h-80">
          <BarChart data={customerGrowthData} />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Lifetime Value</h3>
        <div className="h-80">
          <LineChart data={customerLtvData} />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customers
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Order Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Orders
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lifetime Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">VIP Customers</div>
                  <div className="text-xs text-gray-500">5+ orders</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">48 (12%)</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$85.50</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">7.2</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$615.60</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Regular Customers</div>
                  <div className="text-xs text-gray-500">2-4 orders</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">92 (23%)</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$62.30</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">3.1</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$193.13</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">One-time Customers</div>
                  <div className="text-xs text-gray-500">1 order</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">260 (65%)</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$48.75</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1.0</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$48.75</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Retention Rate</h4>
            <div className="text-xl font-semibold">68%</div>
            <div className="text-sm text-green-600 mt-1">↑ 5% from last month</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Average Customer Lifetime</h4>
            <div className="text-xl font-semibold">8.5 months</div>
            <div className="text-sm text-green-600 mt-1">↑ 0.8 months from last year</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Acquisition Cost</h4>
            <div className="text-xl font-semibold">$12.40</div>
            <div className="text-sm text-red-600 mt-1">↑ $1.20 from last month</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
