"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { findProductImage, optimizeImageUrl } from "@/lib/image-service"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export default function EnhancedProductCard({ product }: ProductCardProps) {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg")
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadImage = async () => {
      try {
        setIsLoading(true)
        const url = await findProductImage(product)

        if (isMounted) {
          setImageUrl(url)
          setIsLoading(false)
          setImageError(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading product image:", error)
          setImageUrl("/placeholder.svg")
          setIsLoading(false)
          setImageError(true)
        }
      }
    }

    loadImage()

    return () => {
      isMounted = false
    }
  }, [product])

  const optimizedImageUrl = optimizeImageUrl(imageUrl, 300, 300)

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price)

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(product.originalPrice)
    : null

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
            </div>
          )}

          <Image
            src={optimizedImageUrl || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-300 group-hover:opacity-90 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onError={() => setImageError(true)}
            onLoad={() => setIsLoading(false)}
          />

          {product.isNew && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">New</div>
          )}

          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>

        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-900">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="ml-2 text-xs text-gray-500 line-through">{formattedOriginalPrice}</span>
              )}
            </div>
            <div className="text-xs text-gray-500">{product.rating} ★</div>
          </div>
        </div>
      </Link>

      <button
        className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm transition-colors"
        onClick={(e) => {
          e.preventDefault()
          // Add to cart functionality would go here
          alert(`Added ${product.name} to cart`)
        }}
      >
        Add to cart
      </button>
    </div>
  )
}
