"use client"

import { useActionState } from "react"
import { updateProfile, becomeASeller } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Store } from "lucide-react"

export default function AccountProfilePage() {
  const { user } = useAuth()
  const [state, formAction] = useActionState(updateProfile, { error: null, success: null })
  const [sellerState, sellerFormAction] = useActionState(becomeASeller, { error: null })

  const isSeller = user?.roles?.includes("seller")

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

        {state?.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6" role="alert">
            {state.success}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" defaultValue={user?.name.split(" ")[0]} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" defaultValue={user?.name.split(" ")[1] || ""} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={user?.email} required disabled />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Tell us a bit about yourself"
            ></textarea>
          </div>

          <div className="pt-4">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      {!isSeller && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Store className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Become a Seller</h2>
              <p className="text-gray-600 mb-4">
                Start selling your recycled products on our platform. Reach more customers and grow your business.
              </p>

              {sellerState?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                  {sellerState.error}
                </div>
              )}

              <form action={sellerFormAction}>
                <input type="hidden" name="userId" value={user?.id} />
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Apply to Become a Seller
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
