import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react"
import CategoryNav from "@/components/category-nav"
import ProductReviews from "@/components/product-reviews"
import { getProductBySlug, getProductsByCategory } from "@/lib/product"
import type { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // Fetch product
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: product.name,
    description: product.description.substring(0, 160),
    openGraph: {
      images: product.images.length > 0 ? [product.images[0].url] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Get related products
  const relatedProducts = await getProductsByCategory(product.category, 4)

  // Primary image
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0]

  return (
    <div className="flex flex-col min-h-screen">
      <CategoryNav />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4 text-sm breadcrumbs">
            <ul className="flex items-center gap-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/shop" className="text-gray-500 hover:text-green-600 transition-colors">
                  Shop
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link
                  href={`/category/${product.category}`}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>{product.name}</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              <div className="aspect-square relative border rounded-lg overflow-hidden">
                <Image
                  src={primaryImage?.url || "/placeholder.svg"}
                  alt={primaryImage?.alt || product.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button key={image.id} className="aspect-square relative border rounded-lg overflow-hidden">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt || `${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < (product.averageRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <Link
                    href={`/product/${product.slug}/reviews`}
                    className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {product.averageRating?.toFixed(1) || "0.0"} ({product.totalReviews || 0} reviews)
                  </Link>
                </div>
                <div className="text-2xl font-bold mb-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-red-600">${product.salePrice.toFixed(2)}</span>
                      <span className="text-gray-400 line-through text-lg ml-2">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <>${product.price.toFixed(2)}</>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{product.description}</p>
              </div>

              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4">
                  {product.variants.map((variant) => (
                    <div key={variant.id}>
                      <h3 className="font-semibold mb-2">{variant.name}</h3>
                      <div className="flex gap-2">
                        {variant.options.map((option, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 border rounded-md text-sm ${index === 0 ? "bg-green-600 text-white" : ""}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button className="w-8 h-8 flex items-center justify-center border rounded-l-md transition-colors hover:bg-gray-100">
                    <Minus className="h-4 w-4" />
                  </button>
                  <input type="number" defaultValue="1" className="w-12 h-8 text-center border-t border-b" />
                  <button className="w-8 h-8 flex items-center justify-center border rounded-r-md transition-colors hover:bg-gray-100">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button className="w-12 h-12 flex items-center justify-center border rounded-md transition-colors hover:bg-gray-100">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <Truck className="h-5 w-5" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>SKU:</strong> {product.id.substring(0, 8).toUpperCase()}
                  <br />
                  <strong>Category:</strong>{" "}
                  <Link href={`/category/${product.category}`} className="text-green-600 hover:underline">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Link>
                  <br />
                  <strong>Tags:</strong> {product.tags.join(", ")}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="border-b mb-6">
              <div className="flex">
                <button className="px-6 py-3 font-medium border-b-2 border-green-600 text-green-600">
                  Description
                </button>
                <button className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  Additional Information
                </button>
                <Link
                  href={`/product/${product.slug}/reviews`}
                  className="px-6 py-3 font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Reviews ({product.totalReviews || 0})
                </Link>
              </div>
            </div>

            <div className="prose max-w-none">
              <p>{product.description}</p>

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <>
                  <h3>Specifications:</h3>
                  <ul>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {product.isEcoFriendly && (
                <>
                  <h3>Eco-Friendly Features:</h3>
                  <p>
                    This product is certified eco-friendly with an eco-score of {product.ecoScore || "N/A"}. By choosing
                    our recycled products, you're contributing to a circular economy and helping reduce the demand for
                    new resource production.
                  </p>
                </>
              )}
            </div>
          </div>

          <ProductReviews productId={product.id} reviews={product.reviews || []} />

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Related Products</h2>
              <Link
                href={`/category/${product.category}`}
                className="text-sm text-green-600 hover:underline transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <div key={relatedProduct.id} className="border rounded-lg overflow-hidden group">
                    <Link href={`/product/${relatedProduct.slug}`} className="block">
                      <div className="aspect-square relative bg-gray-100">
                        <Image
                          src={relatedProduct.images[0]?.url || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </Link>
                    <div className="p-3">
                      <div className="text-xs text-gray-500 mb-1">
                        {relatedProduct.category.charAt(0).toUpperCase() + relatedProduct.category.slice(1)}
                      </div>
                      <Link
                        href={`/product/${relatedProduct.slug}`}
                        className="block group-hover:text-green-600 transition-colors"
                      >
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{relatedProduct.name}</h3>
                      </Link>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">${relatedProduct.price.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>{index < (relatedProduct.averageRating || 0) ? "★" : "☆"}</span>
                          ))}
                        </div>
                      </div>
                      <button className="mt-2 w-full bg-green-600 text-white text-sm py-1.5 rounded hover:bg-green-700 transition-all transform hover:scale-[1.02]">
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
