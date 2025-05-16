import type React from "react"
import { getCurrentUser } from "@/lib/auth"
import { AuthProvider } from "@/components/auth-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import "./globals.css"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider initialUser={user}>
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
