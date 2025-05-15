"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { findCategoryBannerImage, optimizeImageUrl } from "@/lib/image-service"

interface CategoryBannerProps {
  title: string
  description: string
  categoryId: string
  link: string
}

export default function EnhancedCategoryBanner({ title, description, categoryId, link }: CategoryBannerProps) {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadImage = async () => {
      try {
        setIsLoading(true)
        const url = await findCategoryBannerImage(categoryId)

        if (isMounted) {
          setImageUrl(url)
          setIsLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading banner image:", error)
          setImageUrl("/placeholder.svg")
          setIsLoading(false)
        }
      }
    }

    loadImage()

    return () => {
      isMounted = false
    }
  }, [categoryId])

  const optimizedImageUrl = optimizeImageUrl(imageUrl, 1200, 400)

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
        </div>
      )}

      <Image
        src={optimizedImageUrl || "/placeholder.svg?height=400&width=1200"}
        alt={title}
        width={1200}
        height={400}
        className={`w-full h-64 object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center p-8">
        <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
        <p className="text-white mb-6 max-w-md">{description}</p>
        <Link href={link} className="btn-primary inline-block w-max">
          Shop Now
        </Link>
      </div>
    </div>
  )
}
