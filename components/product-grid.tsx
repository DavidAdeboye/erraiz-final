import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { getProductsByCategory } from "@/lib/product"

interface ProductGridProps {
  category: string
  limit?: number
}

export default async function ProductGrid({ category, limit = 8 }: ProductGridProps) {
  // Fetch products from the database
  const products = await getProductsByCategory(category as any, limit)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`border rounded-lg overflow-hidden hover-lift card-hover fade-in-delay-${(index % 3) + 1}`}
          data-testid="product-card"
        >
          <Link href={`/product/${product.slug}`} className="block">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src={product.images[0]?.url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </Link>
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-1">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </div>
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-green-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex justify-between items-center">
              <div className="font-semibold">${product.price.toFixed(2)}</div>
              <div className="text-xs text-gray-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < (product.averageRating || 0) ? "★" : "☆"}</span>
                ))}
              </div>
            </div>
            <button className="mt-2 w-full bg-green-600 text-white text-sm py-1.5 rounded hover:bg-green-700 transition-all transform hover:scale-[1.02] button-hover">
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
