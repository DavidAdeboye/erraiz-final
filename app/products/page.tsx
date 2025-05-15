"use client"

import { useState } from "react"
import ProductGrid from "@/components/product-grid"
import CategoryFilter from "@/components/category-filter"
import { getProductsByCategory, categories } from "@/lib/data"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const products = getProductsByCategory(selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="md:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
