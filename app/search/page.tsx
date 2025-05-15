"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { searchProducts } from "@/lib/data"
import ProductGrid from "@/components/products/product-grid"
import FilterSidebar from "@/components/products/filter-sidebar"
import type { Product } from "@/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [sortOrder, setSortOrder] = useState("price-low-to-high")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (query) {
      const results = searchProducts(query)

      // Apply sorting
      const sortedResults = [...results].sort((a, b) => {
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

      setProducts(sortedResults)
    }
  }, [query, sortOrder])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value)
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      <h1 className="text-lg sm:text-2xl font-bold mb-2">
        {products.length} results for "{query}"
      </h1>

      {/* Mobile controls */}
      <div className="flex items-center justify-between mb-4 sm:hidden">
        <button className="text-sm text-green-600" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide filters" : "Show filters"}
        </button>

        <div className="flex items-center">
          <label htmlFor="mobile-sort" className="text-xs text-gray-600 mr-2">
            Sort by:
          </label>
          <select
            id="mobile-sort"
            className="text-xs border border-gray-300 rounded py-1 px-2"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="price-low-to-high">Price (Low to High)</option>
            <option value="price-high-to-low">Price (High to Low)</option>
            <option value="rating-high-to-low">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Desktop controls */}
      <div className="hidden sm:flex justify-end mb-6">
        <div className="flex items-center">
          <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
            Sort by:
          </label>
          <select id="sort" className="input-field" value={sortOrder} onChange={handleSortChange}>
            <option value="price-low-to-high">Price (Low to High)</option>
            <option value="price-high-to-low">Price (High to Low)</option>
            <option value="rating-high-to-low">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 sm:gap-8">
        {/* Mobile filters */}
        {showFilters && (
          <div className="md:hidden">
            <FilterSidebar />
          </div>
        )}

        {/* Desktop filters - always visible */}
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        <div className={`${showFilters ? "mt-4 md:mt-0" : ""} md:col-span-3`}>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 text-center">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">No products found</h2>
              <p className="text-sm text-gray-600">
                We couldn't find any products matching your search. Try using different keywords or browse our
                categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
