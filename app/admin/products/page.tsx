import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminProductsPage() {
  // Mock products data
  const products = [
    {
      id: "prod-1",
      name: "Recycled Plastic Container",
      price: 24.99,
      stock: 45,
      category: "Plastic",
      seller: "Eco Solutions",
      status: "Active",
      image: "/placeholder.svg",
    },
    {
      id: "prod-2",
      name: "Glass Vase",
      price: 34.99,
      stock: 12,
      category: "Glass",
      seller: "Green Living",
      status: "Active",
      image: "/placeholder.svg",
    },
    {
      id: "prod-3",
      name: "Recycled Paper Notebook",
      price: 12.99,
      stock: 78,
      category: "Paper",
      seller: "Sustainable Home",
      status: "Active",
      image: "/placeholder.svg",
    },
    {
      id: "prod-4",
      name: "Bamboo Utensil Set",
      price: 24.0,
      stock: 32,
      category: "Bamboo",
      seller: "Eco Solutions",
      status: "Active",
      image: "/placeholder.svg",
    },
    {
      id: "prod-5",
      name: "Eco-friendly Water Bottle",
      price: 19.99,
      stock: 0,
      category: "Metal",
      seller: "Green Living",
      status: "Out of Stock",
      image: "/placeholder.svg",
    },
    {
      id: "prod-6",
      name: "Recycled Fabric Tote Bag",
      price: 15.99,
      stock: 64,
      category: "Fabric",
      seller: "Recycled Wonders",
      status: "Active",
      image: "/placeholder.svg",
    },
    {
      id: "prod-7",
      name: "Compostable Food Containers",
      price: 9.99,
      stock: 120,
      category: "Plastic",
      seller: "Earth Friendly Goods",
      status: "Active",
      image: "/placeholder.svg",
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500">Manage all products on the platform</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link href="/admin/products/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 border rounded-md w-full" />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>All Categories</option>
              <option>Plastic</option>
              <option>Glass</option>
              <option>Paper</option>
              <option>Metal</option>
              <option>Bamboo</option>
              <option>Fabric</option>
            </select>
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>All Sellers</option>
              <option>Eco Solutions</option>
              <option>Green Living</option>
              <option>Sustainable Home</option>
              <option>Recycled Wonders</option>
              <option>Earth Friendly Goods</option>
            </select>
            <select className="px-3 py-2 border rounded-md text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Out of Stock</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.seller}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Out of Stock"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product.id}`} className="text-green-600 hover:text-green-900">
                        View
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 7 of 7 products</div>
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
