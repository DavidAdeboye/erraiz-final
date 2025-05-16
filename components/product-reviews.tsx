import Link from "next/link"
import { Star, ThumbsUp } from "lucide-react"
import type { ProductReview } from "@/lib/product"

interface ProductReviewsProps {
  productId: string
  reviews: ProductReview[]
}

export default function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  // Show only the first 3 reviews on the product page
  const displayedReviews = reviews.slice(0, 3)
  const hasMoreReviews = reviews.length > 3

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <Link
          href={`/product/${productId}/reviews`}
          className="text-sm text-green-600 hover:underline transition-colors"
        >
          See all reviews
        </Link>
      </div>

      {reviews.length > 0 ? (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${index < averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">{reviews.length} reviews</div>
              </div>
            </div>

            <Link
              href={`/product/${productId}/reviews#write-review`}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all transform hover:scale-[1.02]"
            >
              Write a Review
            </Link>
          </div>

          <div className="space-y-6">
            {displayedReviews.map((review) => (
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
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Verified Purchase</div>
                  )}
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpfulVotes})
                  </button>
                </div>
              </div>
            ))}
          </div>

          {hasMoreReviews && (
            <div className="mt-6 text-center">
              <Link
                href={`/product/${productId}/reviews`}
                className="inline-block px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
              >
                View All {reviews.length} Reviews
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500 mb-4">This product has no reviews yet.</p>
          <Link
            href={`/product/${productId}/reviews#write-review`}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all transform hover:scale-[1.02]"
          >
            Be the first to write a review
          </Link>
        </div>
      )}
    </section>
  )
}
