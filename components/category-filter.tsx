"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Category {
  id: string
  name: string
  count: number
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
  onCategoryChange?: (categoryId: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }
    setIsOpen(false)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
        <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <div className={`space-y-2 ${isOpen ? "block" : "hidden md:block"}`}>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between">
            <button
              className={`text-sm ${selectedCategory === category.id ? "font-medium text-green-600" : "text-gray-700 hover:text-green-600"}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
            <span className="text-xs text-gray-500">{category.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
