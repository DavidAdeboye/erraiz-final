"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { categories, getFeaturedProducts } from "@/lib/data"
import EnhancedProductGrid from "@/components/enhanced-product-grid"
import EnhancedCategoryCard from "@/components/enhanced-category-card"
import EnhancedCategoryBanner from "@/components/enhanced-category-banner"
import { findHeroImages, optimizeImageUrl, preloadProductImages } from "@/lib/image-service"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const productsForYou = featuredProducts.slice(0, 4)
  const plasticProducts = featuredProducts.slice(0, 4)
  const glassProducts = featuredProducts.slice(0, 4)
  const otherProducts = featuredProducts.slice(0, 4)

  const [heroImages, setHeroImages] = useState<string[]>([
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ])
  const [isLoadingHero, setIsLoadingHero] = useState(true)
  const [mobileHeroImage, setMobileHeroImage] = useState("/placeholder.svg")
  const [isLoadingMobileHero, setIsLoadingMobileHero] = useState(true)

  // Preload product images for better user experience
  useEffect(() => {
    preloadProductImages(featuredProducts)
  }, [featuredProducts])

  // Load hero images
  useEffect(() => {
    let isMounted = true

    const loadHeroImages = async () => {
      try {
        setIsLoadingHero(true)
        const images = await findHeroImages("plastic-made-products")

        if (isMounted) {
          setHeroImages(images)
          setMobileHeroImage(images[0])
          setIsLoadingHero(false)
          setIsLoadingMobileHero(false)
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error loading hero images:", error)
          setIsLoadingHero(false)
          setIsLoadingMobileHero(false)
        }
      }
    }

    loadHeroImages()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="mb-6 sm:mb-12">
        {/* Mobile Hero */}
        <div className="sm:hidden relative rounded-lg overflow-hidden">
          {isLoadingMobileHero && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
            </div>
          )}

          <Image
            src={optimizeImageUrl(mobileHeroImage, 600, 300) || "/placeholder.svg?height=300&width=600"}
            alt="Sustainable Products"
            width={600}
            height={300}
            className={`w-full h-40 object-cover transition-opacity duration-300 ${
              isLoadingMobileHero ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoadingMobileHero(false)}
          />

          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
            <h1 className="text-white text-lg font-bold mb-2">Sustainable Products</h1>
            <p className="text-white text-sm mb-3 max-w-md">
              Discover eco-friendly items made from recycled materials.
            </p>
            <Link href="/categories/plastic-made-products" className="btn-primary text-sm inline-block w-max">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden sm:grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Plastic Made Products</h1>
            <p className="text-gray-600 mb-6 max-w-md">
              Discover a range of innovative and sustainable products crafted from recycled plastics.
            </p>
            <Link href="/categories/plastic-made-products" className="btn-primary">
              View Items
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {isLoadingHero ? (
              // Loading skeleton for hero images
              <>
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </>
            ) : (
              // Actual hero images
              <>
                {heroImages.map((image, index) => (
                  <Image
                    key={index}
                    src={optimizeImageUrl(image, 300, 300) || "/placeholder.svg?height=300&width=300"}
                    alt={`Recycled product ${index + 1}`}
                    width={300}
                    height={300}
                    className="rounded-lg object-cover aspect-square"
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-6 sm:mb-12">
        <div className="sm:flex sm:items-center sm:justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-0">Explore these categories</h2>
          <Link href="/categories" className="text-xs sm:text-sm text-green-600 hover:underline flex items-center">
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
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {categories.slice(0, 4).map((category) => (
            <EnhancedCategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              link={`/categories/${category.id}`}
              productCount={category.productCount}
              isMobile={true}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-6 sm:mb-12">
        <EnhancedProductGrid products={productsForYou} title="Products for you" viewAllLink="/products" />
      </section>

      {/* Featured Category Banner - Desktop Only */}
      <div className="hidden sm:block mb-12">
        <EnhancedCategoryBanner
          title="Plastic Made Products"
          description="Discover a range of innovative and sustainable products crafted from recycled plastics."
          categoryId="plastic-made-products"
          link="/categories/plastic-made-products"
        />
      </div>

      {/* Plastic Products Section */}
      <section className="mb-6 sm:mb-12">
        <EnhancedProductGrid
          products={plasticProducts}
          title="Plastic made products"
          viewAllLink="/categories/plastic-made-products"
        />
      </section>

      {/* Promotional Banner - Desktop Only */}
      <section className="hidden sm:block mb-12 bg-gray-100 rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Shoes from Recycled Items</h2>
            <p className="text-gray-600 mb-6">
              Comfortable and stylish shoes made from recycled materials. Better for your feet, better for the planet.
            </p>
            <Link href="/categories/footwear" className="btn-primary inline-block w-max">
              Shop Now
            </Link>
          </div>
          <div className="flex justify-center">
            <Image src="/products/shoes-1.jpg" alt="Recycled shoes" width={400} height={300} className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* Glass Products Section */}
      <section className="mb-6 sm:mb-12">
        <EnhancedProductGrid
          products={glassProducts}
          title="Glass made products"
          viewAllLink="/categories/glass-made-products"
        />
      </section>

      {/* Other Products Section */}
      <section className="mb-6 sm:mb-12">
        <EnhancedProductGrid products={otherProducts} title="Other products" viewAllLink="/categories/others" />
      </section>
    </div>
  )
}
