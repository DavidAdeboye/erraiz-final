import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

export default function AdminCommissionsPage() {
  // Mock commission data
  const commissions = [
    {
      id: "1",
      seller: "Eco Solutions",
      totalSales: "$4,289.50",
      commission: "$428.95",
      rate: "10%",
      status: "Pending",
      lastPayout: "Apr 30, 2025",
    },
    {
      id: "2",
      seller: "Green Living",
      totalSales: "$3,752.25",
      commission: "$450.27",
      rate: "12%",
      status: "Paid",
      lastPayout: "Apr 30, 2025",
    },
    {
      id: "3",
      seller: "Sustainable Home",
      totalSales: "$2,984.75",
      commission: "$298.48",
      rate: "10%",
      status: "Pending",
      lastPayout: "Apr 30, 2025",
    },
    {
      id: "4",
      seller: "Recycled Wonders",
      totalSales: "$2,541.00",
      commission: "$203.28",
      rate: "8%",
      status: "Paid",
      lastPayout: "Apr 30, 2025",
    },
    {
      id: "5",
      seller: "Earth Friendly Goods",
      totalSales: "$1,987.50",
      commission: "$198.75",
      rate: "10%",
      status: "Pending",
      lastPayout: "Apr 30, 2025",
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Commissions</h1>
          <p className="text-gray-500">Manage seller commissions and payouts</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">Process Payouts</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search sellers..." className="pl-10 pr-4 py-2 border rounded-md w-full" />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>Paid</option>
            </select>
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>This month</option>
              <option>Last month</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Payout
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {commissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{commission.seller}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{commission.totalSales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{commission.commission}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{commission.rate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        commission.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {commission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{commission.lastPayout}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/commissions/${commission.id}`}
                      className="text-green-600 hover:text-green-900 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 5 of 5 sellers</div>
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
