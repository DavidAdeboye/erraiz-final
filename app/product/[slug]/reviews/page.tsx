import Link from "next/link"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"
import CategoryNav from "@/components/category-nav"
import ProductReviewForm from "@/components/product-review-form"
import { getProductBySlug } from "@/lib/product"
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
    title: `Reviews for ${product.name}`,
    description: `Customer reviews and ratings for ${product.name}`,
  }
}

export default async function ProductReviewsPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0] // 5, 4, 3, 2, 1 stars

  if (product.reviews && product.reviews.length > 0) {
    product.reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[5 - review.rating]++
      }
    })
  }

  const totalReviews = product.reviews?.length || 0

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
                  href={`/product/${product.slug}`}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  {product.name}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>Reviews</li>
            </ul>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Customer Reviews for {product.name}</h1>
            <Link href={`/product/${product.slug}`} className="text-green-600 hover:underline transition-colors">
              &larr; Back to product
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Rating Summary</h2>

                <div className="flex items-center gap-2 mb-6">
                  <div className="text-3xl font-bold">{product.averageRating?.toFixed(1) || "0.0"}</div>
                  <div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${index < (product.averageRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on {totalReviews} reviews</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {ratingCounts.map((count, index) => {
                    const stars = 5 - index
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <div className="text-sm font-medium w-8">{stars} star</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-500 w-8">{count}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-4">Write a Review</h3>
                <ProductReviewForm productId={product.id} />
              </div>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>

              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`h-4 w-4 ${index < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <h3 className="font-semibold">{review.title}</h3>
                        </div>
                        <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-medium">{review.userName}</div>
                        {review.isVerifiedPurchase && (
                          <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Verified Purchase
                          </div>
                        )}
                      </div>

                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                          Helpful ({review.helpfulVotes})
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">Report</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-500 mb-4">This product has no reviews yet.</p>
                  <p>Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
