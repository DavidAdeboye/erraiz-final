import ProductCard from "./product-card"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  title?: string
  viewAllLink?: string
}

export default function ProductGrid({ products, title, viewAllLink }: ProductGridProps) {
  return (
    <div className="mb-12 sm:mb-8">
      {title && (
        <div className="flex items-center justify-between mb-4 sm:mobile-section-header">
          <h2 className="text-lg font-semibold text-gray-900 sm:mobile-section-title">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-sm text-green-600 hover:underline sm:mobile-see-all">
              <span className="sm:hidden">View all</span>
              <span className="hidden sm:inline">See all</span>
            </a>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
