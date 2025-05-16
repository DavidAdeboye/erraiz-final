import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminCategoriesPage() {
  // Mock categories data
  const categories = [
    {
      id: "cat-1",
      name: "Plastic",
      slug: "plastic",
      description: "Recycled plastic products",
      products: 45,
      subcategories: 4,
      status: "Active",
    },
    {
      id: "cat-2",
      name: "Glass",
      slug: "glass",
      description: "Recycled glass products",
      products: 32,
      subcategories: 3,
      status: "Active",
    },
    {
      id: "cat-3",
      name: "Paper",
      slug: "paper",
      description: "Recycled paper products",
      products: 28,
      subcategories: 5,
      status: "Active",
    },
    {
      id: "cat-4",
      name: "Metal",
      slug: "metal",
      description: "Recycled metal products",
      products: 19,
      subcategories: 3,
      status: "Active",
    },
    {
      id: "cat-5",
      name: "Bamboo",
      slug: "bamboo",
      description: "Sustainable bamboo products",
      products: 24,
      subcategories: 2,
      status: "Active",
    },
    {
      id: "cat-6",
      name: "Fabric",
      slug: "fabric",
      description: "Recycled fabric products",
      products: 15,
      subcategories: 4,
      status: "Active",
    },
    {
      id: "cat-7",
      name: "Compostable",
      slug: "compostable",
      description: "Compostable products",
      products: 12,
      subcategories: 2,
      status: "Inactive",
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-500">Manage product categories</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link href="/admin/category/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Category
            </Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 border rounded-md w-full"
            />
          </div>
          <div className="flex gap-2">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subcategories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">/{category.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.products}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.subcategories}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/category/${category.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 7 of 7 categories</div>
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
