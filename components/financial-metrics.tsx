"use client"

import { Card } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function FinancialMetrics() {
  // Mock data for financial metrics
  const revenueTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 1500, 2200, 2800, 2400, 3100, 3500, 3200, 3800, 4200, 4500],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const revenueVsCostsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 1500, 2200, 2800, 2400, 3100, 3500, 3200, 3800, 4200, 4500],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
      {
        label: "Costs",
        data: [800, 1100, 900, 1300, 1600, 1400, 1800, 2000, 1900, 2200, 2400, 2600],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
      },
    ],
  }

  const profitMarginData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Profit Margin (%)",
        data: [33.3, 42.1, 40.0, 40.9, 42.9, 41.7, 41.9, 42.9, 40.6, 42.1, 42.9, 42.2],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const expenseBreakdownData = {
    labels: ["Product Costs", "Shipping", "Marketing", "Platform Fees", "Payment Processing", "Other"],
    datasets: [
      {
        label: "Expense Breakdown",
        data: [60, 15, 10, 8, 5, 2],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(148, 163, 184, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(249, 115, 22)",
          "rgb(168, 85, 247)",
          "rgb(236, 72, 153)",
          "rgb(148, 163, 184)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <div className="h-80">
          <LineChart data={revenueTrendData} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue vs. Costs</h3>
          <div className="h-80">
            <BarChart data={revenueVsCostsData} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Profit Margin</h3>
          <div className="h-80">
            <LineChart data={profitMarginData} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
        <div className="h-80">
          <PieChart data={expenseBreakdownData} />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Costs
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Margin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">December</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$4,500.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$2,600.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,900.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">42.2%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">November</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$4,200.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$2,400.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,800.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">42.9%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">October</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$3,800.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$2,200.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,600.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">42.1%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">September</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$3,200.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,900.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,300.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">40.6%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">August</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$3,500.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$2,000.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,500.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">42.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Average Profit Margin</h4>
            <div className="text-xl font-semibold">41.8%</div>
            <div className="text-sm text-green-600 mt-1">↑ 1.2% from last year</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Revenue Growth</h4>
            <div className="text-xl font-semibold">18.4%</div>
            <div className="text-sm text-green-600 mt-1">↑ 3.2% from last year</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Return on Investment</h4>
            <div className="text-xl font-semibold">275%</div>
            <div className="text-sm text-green-600 mt-1">↑ 25% from last year</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
