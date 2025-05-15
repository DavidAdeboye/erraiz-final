"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface FilterOption {
  value: string
  label: string
  count: number
}

interface FilterGroupProps {
  title: string
  options: FilterOption[]
  name: string
  selectedValues: string[]
  onChange: (name: string, value: string, checked: boolean) => void
}

function FilterGroup({ title, options, name, selectedValues, onChange }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>

      {isOpen && (
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="checkbox-field mr-2"
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => onChange(name, option.value, e.target.checked)}
                />
                <span className="text-xs sm:text-sm text-gray-700">{option.label}</span>
              </label>
              <span className="text-xs text-gray-500">{option.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface PriceRangeProps {
  min: number
  max: number
  currentMin: number
  currentMax: number
  onChange: (min: number, max: number) => void
}

function PriceRange({ min, max, currentMin, currentMax, onChange }: PriceRangeProps) {
  const [localMin, setLocalMin] = useState(currentMin.toString())
  const [localMax, setLocalMax] = useState(currentMax.toString())

  const handleApply = () => {
    const newMin = Number.parseInt(localMin) || min
    const newMax = Number.parseInt(localMax) || max
    onChange(newMin, newMax)
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640

  return (
    <div className="mb-4 sm:mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Price range</h3>

      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full pl-6 pr-2 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded"
            placeholder={min.toString()}
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm">₦</span>
        </div>
        <span className="text-gray-400 text-xs sm:text-sm">to</span>
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full pl-6 pr-2 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded"
            placeholder={max.toString()}
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm">₦</span>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={currentMin}
        onChange={(e) => {
          const value = Number.parseInt(e.target.value)
          setLocalMin(value.toString())
          onChange(value, currentMax)
        }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />

      <button onClick={handleApply} className="btn-primary w-full mt-3 text-xs sm:text-sm">
        Apply filter
      </button>
    </div>
  )
}

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    material: searchParams.getAll("material") || [],
    type: searchParams.getAll("type") || [],
    color: searchParams.getAll("color") || [],
    minPrice: Number.parseInt(searchParams.get("minPrice") || "0"),
    maxPrice: Number.parseInt(searchParams.get("maxPrice") || "1000000"),
  })

  const materialOptions = [
    { value: "plastic", label: "Plastic", count: 1290 },
    { value: "glass", label: "Glass", count: 1290 },
    { value: "nylon", label: "Nylon", count: 1290 },
    { value: "others", label: "Others", count: 1290 },
  ]

  const typeOptions = [
    { value: "chair", label: "Chair", count: 450 },
    { value: "table", label: "Table", count: 320 },
    { value: "stool", label: "Stool", count: 280 },
    { value: "bench", label: "Bench", count: 210 },
  ]

  const colorOptions = [
    { value: "white", label: "White", count: 620 },
    { value: "black", label: "Black", count: 580 },
    { value: "blue", label: "Blue", count: 340 },
    { value: "green", label: "Green", count: 290 },
  ]

  const handleFilterChange = (name: string, value: string, checked: boolean) => {
    const newFilters = { ...filters }

    if (checked) {
      newFilters[name as keyof typeof filters] = [...(newFilters[name as keyof typeof filters] as string[]), value]
    } else {
      newFilters[name as keyof typeof filters] = (newFilters[name as keyof typeof filters] as string[]).filter(
        (v) => v !== value,
      )
    }

    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const handlePriceChange = (min: number, max: number) => {
    const newFilters = { ...filters, minPrice: min, maxPrice: max }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const applyFilters = (newFilters: typeof filters) => {
    const params = new URLSearchParams(searchParams.toString())

    // Clear existing filter params
    params.delete("material")
    params.delete("type")
    params.delete("color")
    params.delete("minPrice")
    params.delete("maxPrice")

    // Add new filter params
    newFilters.material.forEach((value) => params.append("material", value))
    newFilters.type.forEach((value) => params.append("type", value))
    newFilters.color.forEach((value) => params.append("color", value))

    if (newFilters.minPrice > 0) {
      params.set("minPrice", newFilters.minPrice.toString())
    }

    if (newFilters.maxPrice < 1000000) {
      params.set("maxPrice", newFilters.maxPrice.toString())
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
      <h2 className="text-base sm:text-lg font-semibold mb-4">Filter</h2>

      <PriceRange
        min={0}
        max={1000000}
        currentMin={filters.minPrice}
        currentMax={filters.maxPrice}
        onChange={handlePriceChange}
      />

      <FilterGroup
        title="Material type"
        options={materialOptions}
        name="material"
        selectedValues={filters.material}
        onChange={handleFilterChange}
      />

      <FilterGroup
        title="Product type"
        options={typeOptions}
        name="type"
        selectedValues={filters.type}
        onChange={handleFilterChange}
      />

      <FilterGroup
        title="Color"
        options={colorOptions}
        name="color"
        selectedValues={filters.color}
        onChange={handleFilterChange}
      />
    </div>
  )
}
