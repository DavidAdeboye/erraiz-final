"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, LineChart } from "@/components/charts"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductPerformance() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for product performance
  const productSalesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Units Sold",
        data: [65, 78, 52, 91, 43, 56, 61, 87, 75, 64, 92, 105],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  }

  const productViewsVsSalesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Product Views",
        data: [1200, 1350, 1100, 1450, 1300, 1200, 1500, 1650, 1550, 1400, 1750, 1900],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        yAxisID: "y",
      },
      {
        label: "Units Sold",
        data: [65, 78, 52, 91, 43, 56, 61, 87, 75, 64, 92, 105],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  }

  // Mock top products data
  const topProducts = [
    {
      id: "prod-1",
      name: "Recycled Plastic Container",
      image: "/placeholder.svg",
      sales: 105,
      revenue: "$2,624.95",
      stock: 45,
      conversion: "8.2%",
    },
    {
      id: "prod-2",
      name: "Glass Vase",
      image: "/placeholder.svg",
      sales: 92,
      revenue: "$3,219.08",
      stock: 12,
      conversion: "7.5%",
    },
    {
      id: "prod-3",
      name: "Recycled Paper Notebook",
      image: "/placeholder.svg",
      sales: 87,
      revenue: "$1,130.13",
      stock: 78,
      conversion: "6.8%",
    },
    {
      id: "prod-4",
      name: "Bamboo Utensil Set",
      image: "/placeholder.svg",
      sales: 78,
      revenue: "$1,872.00",
      stock: 32,
      conversion: "6.2%",
    },
    {
      id: "prod-5",
      name: "Eco-friendly Water Bottle",
      image: "/placeholder.svg",
      sales: 75,
      revenue: "$1,499.25",
      stock: 25,
      conversion: "5.9%",
    },
  ]

  // Mock low stock products
  const lowStockProducts = [
    {
      id: "prod-6",
      name: "Recycled Fabric Tote Bag",
      image: "/placeholder.svg",
      stock: 5,
      reorderPoint: 10,
      status: "Critical",
    },
    {
      id: "prod-7",
      name: "Bamboo Toothbrush",
      image: "/placeholder.svg",
      stock: 8,
      reorderPoint: 15,
      status: "Low",
    },
    {
      id: "prod-2",
      name: "Glass Vase",
      image: "/placeholder.svg",
      stock: 12,
      reorderPoint: 20,
      status: "Low",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Product Sales Over Time</h3>
          <div className="h-80">
            <BarChart data={productSalesData} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Product Views vs. Sales</h3>
          <div className="h-80">
            <LineChart data={productViewsVsSalesData} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-lg font-semibold">Top Performing Products</h3>
          <div className="mt-2 md:mt-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales} units</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.revenue}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock} units</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.conversion}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/seller/products/${product.id}`} className="text-green-600 hover:text-green-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Inventory Alerts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reorder Point
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lowStockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock} units</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.reorderPoint} units</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "Critical"
                          ? "bg-red-100 text-red-800"
                          : product.status === "Low"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Restock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Product Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Best Selling Product</h4>
            <div className="text-xl font-semibold">Recycled Plastic Container</div>
            <div className="text-sm text-gray-500 mt-1">105 units sold this month</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Highest Revenue Product</h4>
            <div className="text-xl font-semibold">Glass Vase</div>
            <div className="text-sm text-gray-500 mt-1">$3,219.08 this month</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Best Conversion Rate</h4>
            <div className="text-xl font-semibold">Recycled Plastic Container</div>
            <div className="text-sm text-gray-500 mt-1">8.2% conversion rate</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
