"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { findBestProductImage, optimizeImageUrl } from "@/lib/image-service"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageUrl, setImageUrl] = useState<string>(product.image || "/placeholder.svg")
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  useEffect(() => {
    let isMounted = true

    const loadHighQualityImage = async () => {
      try {
        const bestImage = await findBestProductImage(product)
        if (isMounted) {
          setImageUrl(bestImage)
        }
      } catch (error) {
        console.error("Error loading high-quality image:", error)
        if (isMounted && !product.image) {
          setImageError(true)
        }
      }
    }

    loadHighQualityImage()

    return () => {
      isMounted = false
    }
  }, [product])

  const handleImageError = () => {
    setImageError(true)
    setImageUrl("/placeholder.svg")
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Optimize the image URL for the card size
  const optimizedImageUrl = optimizeImageUrl(imageUrl, 300, 300)

  return (
    <div className="product-card group">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="overflow-hidden bg-gray-100 aspect-square">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <Image
            src={imageError ? "/placeholder.svg" : optimizedImageUrl}
            alt={product.name}
            width={300}
            height={300}
            className={`product-image w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>

        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </Link>

      <div className="p-3">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        </Link>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center space-x-2">
            <span className="product-price">₦{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-original-price">₦{product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button className="btn-primary py-1 px-3 text-xs">Add</button>
        </div>
      </div>
    </div>
  )
}
