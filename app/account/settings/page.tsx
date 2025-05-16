"use client"

import { useActionState } from "react"
import { updatePassword } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountSettingsPage() {
  const [passwordState, passwordAction] = useActionState(updatePassword, { error: null, success: null })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <p className="text-sm text-gray-500">Update your password</p>
        </div>

        <div className="p-6">
          {passwordState?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
              {passwordState.error}
            </div>
          )}

          {passwordState?.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6" role="alert">
              {passwordState.success}
            </div>
          )}

          <form action={passwordAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" name="currentPassword" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" name="newPassword" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Update Password
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Email Preferences</h2>
          <p className="text-sm text-gray-500">Manage your email notifications</p>
        </div>

        <div className="p-6">
          <form className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Order Updates</h3>
                <p className="text-sm text-gray-500">Receive updates about your orders</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="orderUpdates" className="sr-only" defaultChecked />
                <label
                  htmlFor="orderUpdates"
                  className="block h-6 w-12 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <span
                    className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-0"
                    style={{ transform: "translateX(0)" }}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Promotions</h3>
                <p className="text-sm text-gray-500">Receive promotions and discounts</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="promotions" className="sr-only" defaultChecked />
                <label
                  htmlFor="promotions"
                  className="block h-6 w-12 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <span
                    className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-0"
                    style={{ transform: "translateX(0)" }}
                  ></span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Newsletter</h3>
                <p className="text-sm text-gray-500">Receive our weekly newsletter</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="newsletter" className="sr-only" />
                <label
                  htmlFor="newsletter"
                  className="block h-6 w-12 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <span
                    className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-0"
                    style={{ transform: "translateX(0)" }}
                  ></span>
                </label>
              </div>
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Preferences
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
          <p className="text-sm text-gray-500">Permanent actions for your account</p>
        </div>

        <div className="p-6">
          <Button variant="destructive">Delete Account</Button>
          <p className="text-xs text-gray-500 mt-2">
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </p>
        </div>
      </div>
    </div>
  )
}
