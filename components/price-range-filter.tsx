"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface PriceRangeFilterProps {
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export default function PriceRangeFilter({ value, onChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState<string>(value[0].toString())
  const [maxPrice, setMaxPrice] = useState<string>(value[1].toString())
  const [sliderValue, setSliderValue] = useState<number>(value[1])

  // Update the slider and input fields when the value prop changes
  useEffect(() => {
    setMinPrice(value[0].toString())
    setMaxPrice(value[1].toString())
    setSliderValue(value[1])
  }, [value])

  // Handle min price input change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = e.target.value
    setMinPrice(newMinPrice)

    if (newMinPrice === "" || isNaN(Number(newMinPrice))) return

    const min = Number(newMinPrice)
    const max = Number(maxPrice) || value[1]

    if (min <= max) {
      onChange([min, max])
    }
  }

  // Handle max price input change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = e.target.value
    setMaxPrice(newMaxPrice)

    if (newMaxPrice === "" || isNaN(Number(newMaxPrice))) return

    const min = Number(minPrice) || value[0]
    const max = Number(newMaxPrice)

    if (max >= min) {
      onChange([min, max])
      setSliderValue(max)
    }
  }

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value)
    setSliderValue(newMax)
    setMaxPrice(newMax.toString())
    onChange([Number(minPrice) || value[0], newMax])
  }

  return (
    <div>
      <h3 className="text-sm font-medium mb-4">Price range</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Min"
            className="input-field text-sm"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Max"
            className="input-field text-sm"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100000"
        step="1000"
        value={sliderValue}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
      />
    </div>
  )
}
