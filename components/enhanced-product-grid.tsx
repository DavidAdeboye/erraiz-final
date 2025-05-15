import EnhancedProductCard from "./enhanced-product-card"
import Link from "next/link"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  title?: string
  viewAllLink?: string
}

export default function EnhancedProductGrid({ products, title, viewAllLink }: ProductGridProps) {
  return (
    <div className="mb-6 sm:mb-12">
      {title && (
        <div className="sm:flex sm:items-center sm:justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-0">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink} className="text-xs sm:text-sm text-green-600 hover:underline flex items-center">
              <span className="sm:hidden">See all</span>
              <span className="hidden sm:inline">See all</span>
              <svg
                className="w-4 h-4 ml-1 hidden sm:inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {products.map((product) => (
          <EnhancedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
