"use client"

import { useActionState } from "react"
import { login } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useActionState(login, { error: null })

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded" role="alert">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input id="password" name="password" type="password" required />
      </div>

      <div className="flex items-center">
        <input id="remember" name="remember" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
          Remember me
        </label>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Sign in
      </Button>
    </form>
  )
}
