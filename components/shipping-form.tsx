"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ShippingForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    saveInfo: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save shipping info
    localStorage.setItem("shippingInfo", JSON.stringify(formData))
    // Navigate to payment step
    router.push("/checkout/payment")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="input-field"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="input-field"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone number (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="input-field"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Street address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          className="input-field"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
          Apartment, suite, etc. (optional)
        </label>
        <input
          type="text"
          id="apartment"
          name="apartment"
          className="input-field"
          value={formData.apartment}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            className="input-field"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State / Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            required
            className="input-field"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            className="input-field"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          disabled
          className="input-field bg-gray-50"
          value={formData.country}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveInfo"
          name="saveInfo"
          className="checkbox-field"
          checked={formData.saveInfo}
          onChange={handleChange}
        />
        <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
          Save this information for future orders
        </label>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          Continue to payment
        </button>
      </div>
    </form>
  )
}
