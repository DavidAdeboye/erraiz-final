"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AccountSidebar from "@/components/account/account-sidebar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 hidden md:block">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <AccountSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
