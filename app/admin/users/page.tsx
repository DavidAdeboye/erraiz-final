import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, UserPlus } from "lucide-react"
import Link from "next/link"

export default function AdminUsersPage() {
  // Mock users data
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: ["buyer"],
      status: "Active",
      joined: "May 10, 2025",
      orders: 12,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: ["buyer", "seller"],
      status: "Active",
      joined: "Apr 15, 2025",
      orders: 8,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      role: ["seller"],
      status: "Active",
      joined: "Mar 22, 2025",
      orders: 0,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      role: ["buyer"],
      status: "Inactive",
      joined: "Feb 8, 2025",
      orders: 3,
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael@example.com",
      role: ["buyer", "seller"],
      status: "Active",
      joined: "Jan 17, 2025",
      orders: 15,
    },
    {
      id: "6",
      name: "Admin User",
      email: "admin@example.com",
      role: ["admin"],
      status: "Active",
      joined: "Jan 1, 2025",
      orders: 0,
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-500">Manage platform users</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link href="/admin/users/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 border rounded-md w-full" />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>All Roles</option>
              <option>Buyer</option>
              <option>Seller</option>
              <option>Admin</option>
            </select>
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">{user.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.role.map((r) => (
                        <span
                          key={r}
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            r === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : r === "seller"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/users/${user.id}`} className="text-green-600 hover:text-green-900 mr-3">
                      View
                    </Link>
                    <Link href={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:text-blue-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 6 of 6 users</div>
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
