"use client"

import Link from "next/link"
import { useActionState } from "react"
import { register } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RegisterForm() {
  const [state, formAction] = useActionState(register, { error: null })

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded" role="alert">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" type="text" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" required />
      </div>

      <div className="space-y-2">
        <Label>I want to register as:</Label>
        <RadioGroup defaultValue="buyer" name="role" className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="buyer" id="buyer" />
            <Label htmlFor="buyer" className="cursor-pointer">
              Buyer - I want to shop on the platform
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="seller" id="seller" />
            <Label htmlFor="seller" className="cursor-pointer">
              Seller - I want to sell products
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="cursor-pointer">
              Both - I want to buy and sell
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center">
        <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300" />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
          I agree to the{" "}
          <Link href="/terms" className="text-green-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-green-600 hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Create Account
      </Button>
    </form>
  )
}
