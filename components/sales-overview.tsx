"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function SalesOverview() {
  // Mock data for sales overview
  const salesTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2025",
        data: [1200, 1900, 1500, 2200, 2800, 2400, 3100, 3500, 3200, 3800, 4200, 4500],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
      {
        label: "2024",
        data: [800, 1200, 1000, 1500, 2000, 1800, 2500, 2800, 2600, 3000, 3400, 3800],
        borderColor: "rgb(148, 163, 184)",
        backgroundColor: "rgba(148, 163, 184, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const salesByProductCategoryData = {
    labels: ["Plastic", "Glass", "Paper", "Metal", "Bamboo", "Fabric"],
    datasets: [
      {
        label: "Sales by Category",
        data: [4500, 3200, 2800, 2100, 1800, 1200],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
      },
    ],
  }

  const salesByChannelData = {
    labels: ["Direct", "Marketplace", "Social Media", "Referral", "Email", "Other"],
    datasets: [
      {
        label: "Sales by Channel",
        data: [45, 25, 15, 8, 5, 2],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(249, 115, 22)",
          "rgb(168, 85, 247)",
          "rgb(236, 72, 153)",
          "rgb(234, 179, 8)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const salesByTimeData = {
    labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    datasets: [
      {
        label: "Orders",
        data: [5, 3, 2, 12, 20, 25, 18, 10],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <div className="h-80">
            <LineChart data={salesTrendData} />
          </div>
        </Tabs>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Product Category</h3>
          <div className="h-80">
            <BarChart data={salesByProductCategoryData} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Channel</h3>
          <div className="h-80">
            <PieChart data={salesByChannelData} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sales by Time of Day</h3>
        <div className="h-80">
          <BarChart data={salesByTimeData} />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sales Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Top Selling Day</h4>
            <div className="text-xl font-semibold">Friday</div>
            <div className="text-sm text-gray-500 mt-1">32% of weekly sales</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Peak Sales Hour</h4>
            <div className="text-xl font-semibold">3:00 PM - 4:00 PM</div>
            <div className="text-sm text-gray-500 mt-1">15% of daily sales</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Best Performing Month</h4>
            <div className="text-xl font-semibold">December</div>
            <div className="text-sm text-gray-500 mt-1">$4,500 in sales</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
