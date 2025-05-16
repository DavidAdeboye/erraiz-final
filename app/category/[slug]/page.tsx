import Image from "next/image"
import Link from "next/link"
import { Filter, Heart } from "lucide-react"
import CategoryNav from "@/components/category-nav"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Convert slug back to display name
  const categoryName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex flex-col min-h-screen">
      <CategoryNav />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">{categoryName} Products</h1>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hidden md:block">
              <div className="sticky top-4">
                <div className="border rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Sub-Categories</h3>
                  <ul className="space-y-2">
                    {["All", "Type A", "Type B", "Type C", "Type D"].map((subcat) => (
                      <li key={subcat}>
                        <Link
                          href={`/category/${params.slug}${subcat === "All" ? "" : "/" + subcat.toLowerCase().replace(" ", "-")}`}
                          className="text-gray-600 hover:text-green-600"
                        >
                          {subcat}
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
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <span className="text-gray-500">Showing 1-12 of 36 products</span>
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
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square relative bg-gray-100">
                      <Image src="/placeholder.svg" alt="Product image" fill className="object-cover" />
                      <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="text-xs text-gray-500 mb-1">Product name</div>
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">
                        {categoryName === "Plastic"
                          ? "Recycled Plastic Container"
                          : categoryName === "Glass"
                            ? "Recycled Glass Vase"
                            : categoryName === "Fruits waste"
                              ? "Organic Compost"
                              : "Eco-friendly Product"}
                      </h3>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
