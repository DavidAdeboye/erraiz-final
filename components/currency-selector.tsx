"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { useCurrency } from "@/context/currency-context"

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

export default function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { currency, setCurrency } = useCurrency()

  const currencies: Currency[] = [
    { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "ng" },
    { code: "USD", name: "US Dollar", symbol: "$", flag: "us" },
    { code: "EUR", name: "Euro", symbol: "€", flag: "eu" },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "gb" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "ca" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "au" },
  ]

  const handleSelect = (currencyCode: string) => {
    const selected = currencies.find((c) => c.code === currencyCode)
    if (selected) {
      setCurrency(selected)
      setIsOpen(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <span className="flex items-center">
          <img src={`/flags/${currency.flag}.svg`} alt={currency.name} className="w-5 h-5 mr-2 rounded-full" />
          <span>{currency.code}</span>
        </span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelect(curr.code)
                }}
              >
                <span className="flex items-center">
                  <img src={`/flags/${curr.flag}.svg`} alt={curr.name} className="w-5 h-5 mr-2 rounded-full" />
                  <span>{curr.name}</span>
                </span>
                {currency.code === curr.code && <Check className="w-4 h-4 text-green-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
