import Image from "next/image"
import Link from "next/link"
import { Filter, Heart } from "lucide-react"
import CategoryNav from "@/components/category-nav"

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CategoryNav />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">All Products</h1>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hidden md:block">
              <div className="sticky top-4">
                <div className="border rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <ul className="space-y-2">
                    {["Plastic", "Glass", "Fruits waste", "Palm fonds", "Nylons", "Others"].map((category) => (
                      <li key={category}>
                        <Link
                          href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                          className="text-gray-600 hover:text-green-600"
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="price-1" className="mr-2" />
                      <label htmlFor="price-1" className="text-gray-600">
                        Under $25
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-2" className="mr-2" />
                      <label htmlFor="price-2" className="text-gray-600">
                        $25 - $50
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-3" className="mr-2" />
                      <label htmlFor="price-3" className="text-gray-600">
                        $50 - $100
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-4" className="mr-2" />
                      <label htmlFor="price-4" className="text-gray-600">
                        Over $100
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="in-stock" className="mr-2" />
                      <label htmlFor="in-stock" className="text-gray-600">
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="out-of-stock" className="mr-2" />
                      <label htmlFor="out-of-stock" className="text-gray-600">
                        Out of Stock
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <span className="text-gray-500">Showing 1-16 of 64 products</span>
                </div>
                <div>
                  <select className="border rounded-md px-3 py-1.5 text-sm">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square relative bg-gray-100">
                      <Image src="/placeholder.svg" alt="Product image" fill className="object-cover" />
                      <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="text-xs text-gray-500 mb-1">Product name</div>
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">Recycled Glass Vase</h3>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">$24.99</div>
                        <div className="text-xs text-gray-500">★★★★☆</div>
                      </div>
                      <button className="mt-2 w-full bg-green-600 text-white text-sm py-1.5 rounded hover:bg-green-700 transition">
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center border rounded-md">&lt;</button>
                  <button className="w-8 h-8 flex items-center justify-center border rounded-md bg-green-600 text-white">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center border rounded-md">2</button>
                  <button className="w-8 h-8 flex items-center justify-center border rounded-md">3</button>
                  <button className="w-8 h-8 flex items-center justify-center border rounded-md">&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
