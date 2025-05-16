"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// User type
type User = {
  id: string
  name: string
  email: string
  roles: string[]
  businessName?: string
  businessAddress?: string
  businessDescription?: string
  isVerified?: boolean
  storeSlug?: string
}

// Auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  activeRole: string | null
  setUser: (user: User | null) => void
  setActiveRole: (role: string | null) => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider props
interface AuthProviderProps {
  children: React.ReactNode
  initialUser: User | null
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [activeRole, setActiveRole] = useState<string | null>(initialUser?.roles[0] || null)
  const [isLoading, setIsLoading] = useState(false)

  // Effect to update active role when user changes
  useEffect(() => {
    if (user) {
      setActiveRole(user.roles[0])
    } else {
      setActiveRole(null)
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        activeRole,
        setUser,
        setActiveRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
