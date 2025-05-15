import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"
import { CurrencyProvider } from "@/context/currency-context"
import OnboardingModal from "@/components/onboarding-modal"
import FeatureTour from "@/components/feature-tour"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ERaiiz - Sustainable Products",
  description: "Discover a range of innovative and sustainable products crafted from recycled materials.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white`}>
        <AuthProvider>
          <CartProvider>
            <CurrencyProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <OnboardingModal />
              <FeatureTour />
            </CurrencyProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
