"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

interface ExchangeRates {
  [key: string]: number
}

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  exchangeRates: ExchangeRates
  formatPrice: (amount: number) => string
  convertPrice: (amount: number) => number
}

const defaultCurrency: Currency = {
  code: "NGN",
  name: "Nigerian Naira",
  symbol: "₦",
  flag: "ng",
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency)
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    NGN: 1,
    USD: 0.00067,
    EUR: 0.00062,
    GBP: 0.00053,
    CAD: 0.00091,
    AUD: 0.00101,
  })

  useEffect(() => {
    // Load saved currency preference
    const savedCurrency = localStorage.getItem("preferredCurrency")
    if (savedCurrency) {
      try {
        setCurrency(JSON.parse(savedCurrency))
      } catch (error) {
        console.error("Failed to parse saved currency", error)
      }
    }

    // In a real app, we would fetch exchange rates from an API
    // For demo purposes, we're using static rates
    // Example API call:
    // fetch('https://api.exchangerate-api.com/v4/latest/NGN')
    //   .then(response => response.json())
    //   .then(data => {
    //     setExchangeRates(data.rates)
    //   })
    //   .catch(error => console.error('Error fetching exchange rates:', error))
  }, [])

  // Save currency preference when it changes
  useEffect(() => {
    localStorage.setItem("preferredCurrency", JSON.stringify(currency))
  }, [currency])

  // Convert price from base currency (NGN) to selected currency
  const convertPrice = (amount: number): number => {
    if (!amount) return 0

    // NGN is our base currency
    if (currency.code === "NGN") return amount

    const rate = exchangeRates[currency.code] || 1
    return amount * rate
  }

  // Format price with currency symbol and proper formatting
  const formatPrice = (amount: number): string => {
    const convertedAmount = convertPrice(amount)

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedAmount)
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRates,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
