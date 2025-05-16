"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

type Currency = {
  code: string
  name: string
  symbol: string
  rate: number // Exchange rate relative to USD
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 150.23 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.36 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.52 },
]

export default function CurrencySelector() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0])

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency)
    // In a real app, you would dispatch an action to update the global state
    // and potentially store the preference in localStorage or cookies
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-600">
          <Globe className="h-4 w-4" />
          <span>{selectedCurrency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => handleCurrencyChange(currency)}
            className="flex justify-between"
          >
            <span>
              {currency.symbol} {currency.code}
            </span>
            {selectedCurrency.code === currency.code && <span className="text-green-600">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
