"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AccountSidebar from "@/components/account/account-sidebar"
import CurrencySelector from "@/components/currency/currency-selector"
import { useCurrency } from "@/context/currency-context"
import { Save } from "lucide-react"

export default function AccountSettingsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { currency } = useCurrency()
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("Settings saved successfully")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  if (isLoading || !isAuthenticated) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <AccountSidebar />
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Preferences</h2>

            {successMessage && <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-md">{successMessage}</div>}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <div className="max-w-xs">
                  <CurrencySelector />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  All prices will be displayed in {currency.name} ({currency.symbol})
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        Email notifications
                      </label>
                      <p className="text-gray-500">Receive emails about your orders, account updates, and promotions</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketing-emails"
                        name="marketing-emails"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketing-emails" className="font-medium text-gray-700">
                        Marketing emails
                      </label>
                      <p className="text-gray-500">Receive emails about new products, sales, and special offers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
