"use client"

import { Card } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function MarketingPerformance() {
  // Mock data for marketing performance
  const trafficSourcesData = {
    labels: ["Direct", "Organic Search", "Paid Search", "Social Media", "Referral", "Email", "Other"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [30, 25, 15, 12, 8, 7, 3],
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

  const conversionRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: [2.8, 3.0, 2.7, 3.2, 3.5, 3.3, 3.1, 3.4, 3.2, 3.0, 3.6, 3.8],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const socialMediaPerformanceData = {
    labels: ["Facebook", "Instagram", "Twitter", "Pinterest", "TikTok", "LinkedIn"],
    datasets: [
      {
        label: "Traffic",
        data: [35, 40, 10, 8, 5, 2],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "Conversions",
        data: [25, 30, 5, 10, 3, 1],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  }

  const campaignPerformanceData = {
    labels: ["Summer Sale", "Earth Day", "New Arrivals", "Holiday Special", "Clearance"],
    datasets: [
      {
        label: "Revenue",
        data: [4500, 3200, 2800, 5200, 1800],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
      {
        label: "Cost",
        data: [1200, 800, 600, 1500, 400],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <div className="h-80">
            <PieChart data={trafficSourcesData} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversion Rate</h3>
          <div className="h-80">
            <LineChart data={conversionRateData} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Social Media Performance</h3>
        <div className="h-80">
          <BarChart data={socialMediaPerformanceData} />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
        <div className="h-80">
          <BarChart data={campaignPerformanceData} />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Marketing Channels</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Traffic
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Organic Search</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">3,250</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">3.2%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$3,120.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$0.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">∞</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Paid Search</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1,950</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">4.5%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$4,200.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,200.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">350%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Social Media</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1,560</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">3.8%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$2,850.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$800.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">356%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Email</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">910</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">5.2%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$2,250.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$350.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">643%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Referral</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">1,040</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">4.1%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$1,950.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">$250.00</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">780%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Marketing Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Best Performing Channel</h4>
            <div className="text-xl font-semibold">Email Marketing</div>
            <div className="text-sm text-gray-500 mt-1">5.2% conversion rate</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Best Campaign</h4>
            <div className="text-xl font-semibold">Holiday Special</div>
            <div className="text-sm text-gray-500 mt-1">$5,200 in revenue</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Overall Marketing ROI</h4>
            <div className="text-xl font-semibold">425%</div>
            <div className="text-sm text-green-600 mt-1">↑ 32% from last quarter</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
