"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"

export default function CategoryNav() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { name: "Plastic", slug: "plastic-made-products" },
    { name: "Glass", slug: "glass-made-products" },
    { name: "Fruits waste", slug: "fruits-waste-products" },
    { name: "Palm fonds", slug: "palm-fonds" },
    { name: "Nylons", slug: "nylons" },
    { name: "Others", slug: "others" }
  ]

  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="whitespace-nowrap px-4 h-full flex items-center text-sm hover:text-green-600 hover:border-b-2 hover:border-green-600 transition-colors"
            >
              {category.name}
            </Link>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search item or product codes..."
                className="pl-9 pr-4 py-1.5 rounded-full border text-sm w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <button className="flex items-center gap-1 px-3 py-1.5 border rounded-full text-sm">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
