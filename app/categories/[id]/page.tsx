"use client"

import type React from "react"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getProductsByCategory, categories } from "@/lib/data"
import ProductGrid from "@/components/product-grid"
import FilterSidebar from "@/components/filter-sidebar"
import type { Product } from "@/types"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string

  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<any>(null)
  const [sortOrder, setSortOrder] = useState("price-low-to-high")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (categoryId) {
      const categoryProducts = getProductsByCategory(categoryId)
      const categoryInfo = categories.find((c) => c.id === categoryId)

      // Apply sorting
      const sortedProducts = [...categoryProducts].sort((a, b) => {
        if (sortOrder === "price-low-to-high") {
          return a.price - b.price
        } else if (sortOrder === "price-high-to-low") {
          return b.price - a.price
        } else if (sortOrder === "rating-high-to-low") {
          return b.rating - a.rating
        } else {
          return 0
        }
      })

      setProducts(sortedProducts)
      setCategory(categoryInfo)
    }
  }, [categoryId, sortOrder])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value)
  }

  if (!category) {
    return <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      <h1 className="text-lg sm:text-2xl font-bold mb-2">
        {category.name} <span className="text-gray-500 text-sm sm:text-lg">({products.length} items)</span>
      </h1>

      <div className="flex items-center justify-between mb-4">
        <button className="text-sm text-green-600 md:hidden" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide filters" : "Show filters"}
        </button>

        <div className="flex items-center">
          <label htmlFor="sort" className="text-xs sm:text-sm text-gray-600 mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            className="text-xs sm:text-sm border border-gray-300 rounded py-1 px-2"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="price-low-to-high">Price (Low to High)</option>
            <option value="price-high-to-low">Price (High to Low)</option>
            <option value="rating-high-to-low">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 sm:gap-8">
        {(showFilters || window.innerWidth >= 768) && (
          <div className="md:col-span-1">
            <FilterSidebar />
          </div>
        )}

        <div className={`${showFilters ? "" : "col-span-full"} md:col-span-3`}>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 text-center">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">No products found</h2>
              <p className="text-sm text-gray-600">
                We couldn't find any products in this category. Please try another category or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
