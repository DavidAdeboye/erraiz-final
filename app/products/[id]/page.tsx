"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star } from "lucide-react"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { findBestProductImage, optimizeImageUrl } from "@/lib/image-service"
import { useCart } from "@/context/cart-context"
import ProductGrid from "@/components/product-grid"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId)

  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const [mainImageUrl, setMainImageUrl] = useState<string>(product?.image || "/placeholder.svg")
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!product) return

    let isMounted = true

    const loadHighQualityImages = async () => {
      try {
        setIsLoading(true)
        // Load main product image
        const bestImage = await findBestProductImage(product)

        // For a real implementation, we would fetch multiple images for the product
        // Here we'll simulate by creating variations based on the main image
        const variations = [
          bestImage,
          product.image || "/placeholder.svg",
          `/placeholder.svg?text=${encodeURIComponent(product.name)}&height=600&width=600`,
          `/placeholder.svg?text=${encodeURIComponent(product.category)}&height=600&width=600`,
        ]

        if (isMounted) {
          setMainImageUrl(bestImage)
          setAdditionalImages(variations)
          setImagesLoaded(new Array(variations.length).fill(false))
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error loading high-quality images:", error)
        if (isMounted) {
          setMainImageUrl(product.image || "/placeholder.svg")
          setAdditionalImages([
            product.image || "/placeholder.svg",
            "/placeholder.svg",
            "/placeholder.svg",
            "/placeholder.svg",
          ])
          setImagesLoaded(new Array(4).fill(true))
          setIsLoading(false)
        }
      }
    }

    loadHighQualityImages()

    return () => {
      isMounted = false
    }
  }, [product])

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  // Optimize the main image for the detail page
  const optimizedMainImage = optimizeImageUrl(additionalImages[selectedImageIndex] || mainImageUrl, 600, 600)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4 aspect-square relative">
            {(!imagesLoaded[selectedImageIndex] || isLoading) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-12 h-12 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <Image
              src={optimizedMainImage || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              width={600}
              height={600}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imagesLoaded[selectedImageIndex] && !isLoading ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => handleImageLoad(selectedImageIndex)}
              onError={() => {
                setAdditionalImages((prev) => {
                  const updated = [...prev]
                  updated[selectedImageIndex] = "/placeholder.svg"
                  return updated
                })
                handleImageLoad(selectedImageIndex)
              }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {additionalImages.map((image, i) => (
              <button
                key={i}
                className={`bg-white rounded-lg overflow-hidden border ${
                  selectedImageIndex === i ? "border-green-600" : "border-gray-200"
                } aspect-square relative`}
                onClick={() => handleThumbnailClick(i)}
              >
                {(!imagesLoaded[i] || isLoading) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <Image
                  src={optimizeImageUrl(image, 150, 150) || "/placeholder.svg?height=150&width=150"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  width={150}
                  height={150}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imagesLoaded[i] && !isLoading ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(i)}
                  onError={() => {
                    setAdditionalImages((prev) => {
                      const updated = [...prev]
                      updated[i] = "/placeholder.svg"
                      return updated
                    })
                    handleImageLoad(i)
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-green-600 fill-green-600" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-500">{product.reviews} reviews</span>
          </div>

          <div className="mb-6">
            <p className="text-3xl font-bold">₦{product.price.toLocaleString()}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {product.attributes?.map((attr, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {attr}
                </span>
              )) || null}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center border border-gray-300 rounded-md w-max">
              <button
                className="px-3 py-1 text-gray-500 hover:text-gray-700"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-1 text-gray-700">{quantity}</span>
              <button className="px-3 py-1 text-gray-500 hover:text-gray-700" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>

          <button className="btn-primary w-full py-3 mb-4" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">Product Details</h2>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Made from recycled materials</li>
                <li>Eco-friendly manufacturing process</li>
                <li>Durable and long-lasting</li>
                <li>Sustainable packaging</li>
                <li>Carbon-neutral shipping</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Specifications</h3>
              <div className="space-y-2">
                <div className="flex border-b border-gray-200 py-2">
                  <span className="w-1/3 text-gray-500">Material</span>
                  <span className="w-2/3">Recycled Plastic</span>
                </div>
                <div className="flex border-b border-gray-200 py-2">
                  <span className="w-1/3 text-gray-500">Weight</span>
                  <span className="w-2/3">0.5 kg</span>
                </div>
                <div className="flex border-b border-gray-200 py-2">
                  <span className="w-1/3 text-gray-500">Dimensions</span>
                  <span className="w-2/3">30 x 20 x 10 cm</span>
                </div>
                <div className="flex border-b border-gray-200 py-2">
                  <span className="w-1/3 text-gray-500">Origin</span>
                  <span className="w-2/3">Made in Nigeria</span>
                </div>
                <div className="flex py-2">
                  <span className="w-1/3 text-gray-500">Certification</span>
                  <span className="w-2/3">Eco-Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  )
}
