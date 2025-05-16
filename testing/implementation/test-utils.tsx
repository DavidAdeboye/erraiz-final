import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"

// Mock auth provider for testing
const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockUser = {
    id: "user-1",
    name: "Test User",
    email: "test@example.com",
    roles: ["buyer"],
  }

  return (
    <AuthProvider initialUser={mockUser} initialLoading={false}>
      {children}
    </AuthProvider>
  )
}

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    authUser?: any
    initialLoading?: boolean
  },
) => {
  const { authUser, initialLoading, ...renderOptions } = options || {}

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <MockAuthProvider>{children}</MockAuthProvider>
      </ThemeProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything from testing-library
export * from "@testing-library/react"

// Override render method
export { customRender as render }
