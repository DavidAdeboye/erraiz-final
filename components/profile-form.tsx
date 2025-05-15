"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"

export default function ProfileForm() {
  const { user, updateProfile } = useAuth()

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")

    try {
      await updateProfile(formData)
      setSuccessMessage("Profile updated successfully")
    } catch (error) {
      console.error("Failed to update profile", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">{successMessage}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
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
          className="input-field bg-gray-50"
          value={formData.email}
          disabled
        />
        <p className="text-xs text-gray-500 mt-1">Your email address cannot be changed</p>
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

      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  )
}
