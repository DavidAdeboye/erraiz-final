"use client"

import { useActionState } from "react"
import { completeSellerOnboarding } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/auth-provider"
import { Store, Upload } from "lucide-react"

export default function SellerOnboardingPage() {
  const { user } = useAuth()
  const [state, formAction] = useActionState(completeSellerOnboarding, { error: null })

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <Store className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Set Up Your Seller Account</h1>
        <p className="text-gray-600">Complete your seller profile to start listing products and making sales.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        {state?.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="userId" value={user?.id} />

          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input id="businessName" name="businessName" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeSlug">Store URL *</Label>
            <div className="flex items-center">
              <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                cireco.com/store/
              </span>
              <Input
                id="storeSlug"
                name="storeSlug"
                className="rounded-l-none"
                placeholder="your-store-name"
                required
              />
            </div>
            <p className="text-xs text-gray-500">
              This will be your unique store URL. Use only letters, numbers, and hyphens.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address *</Label>
            <Input id="businessAddress" name="businessAddress" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              rows={4}
              placeholder="Tell customers about your business, products, and mission..."
            />
          </div>

          <div className="space-y-2">
            <Label>Store Logo</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop your logo here, or click to browse</p>
              <p className="text-xs text-gray-400">Recommended size: 500x500px, Max: 2MB</p>
              <input type="file" className="hidden" />
              <Button type="button" variant="outline" size="sm" className="mt-4">
                Upload Logo
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Complete Setup & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
