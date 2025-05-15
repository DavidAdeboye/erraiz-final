"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"

export default function PaymentForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    if (name === "cardNumber") {
      // Format card number with spaces
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData((prev) => ({ ...prev, [name]: formatted }))
    } else if (name === "expiryDate") {
      // Format expiry date as MM/YY
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }

      setFormData((prev) => ({ ...prev, [name]: formatted }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process payment
    // Navigate to confirmation page
    router.push("/checkout/confirmation")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Credit card details</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
                className="input-field pl-10"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              required
              className="input-field"
              value={formData.cardName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                maxLength={5}
                required
                className="input-field"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                maxLength={3}
                required
                className="input-field"
                value={formData.cvv}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              name="saveCard"
              className="checkbox-field"
              checked={formData.saveCard}
              onChange={handleChange}
            />
            <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
              Save this card for future purchases
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button type="button" className="btn-outline" onClick={() => router.push("/checkout")}>
          Back to shipping
        </button>

        <button type="submit" className="btn-primary">
          Place order
        </button>
      </div>
    </form>
  )
}
