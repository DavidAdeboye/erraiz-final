"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { findCategoryImage, optimizeImageUrl } from "@/lib/image-service"

interface CategoryCardProps {
  id: string
  slug: string
  name: string
  link: string
  productCount?: number
  isMobile?: boolean
}

export default function EnhancedCategoryCard({ id, slug, name, link, productCount, isMobile = false }: CategoryCardProps) {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadImage = async () => {
      try {
        setIsLoading(true)
        const url = await findCategoryImage(id)

        if (isMounted) {
          setImageUrl(url)
          setIsLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading category image:", error)
          setImageUrl("/placeholder.svg")
          setIsLoading(false)
        }
      }
    }

    loadImage()

    return () => {
      isMounted = false
    }
  }, [id])

  const optimizedImageUrl = optimizeImageUrl(imageUrl, 300, 300)

  return (
    <Link href={link} className="block group">
      <div className="relative rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
          </div>
        )}

        <Image
          src={optimizedImageUrl || "/placeholder.svg?height=300&width=300"}
          alt={name}
          width={300}
          height={300}
          className={`w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />

        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <div>
            <h3 className="text-white font-medium">{name}</h3>
            {productCount !== undefined && <p className="text-white text-sm opacity-80">{productCount} products</p>}
          </div>
        </div>
      </div>
    </Link>
  )
}
