"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { addProductReview } from "@/lib/product"
import { getCurrentUser } from "@/lib/auth"

interface ProductReviewFormProps {
  productId: string
}

export default function ProductReviewForm({ productId }: ProductReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (!title.trim()) {
      setError("Please enter a review title")
      return
    }

    if (!comment.trim()) {
      setError("Please enter a review comment")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const user = await getCurrentUser()

      if (!user) {
        setError("You must be logged in to submit a review")
        setIsSubmitting(false)
        return
      }

      await addProductReview(productId, {
        userId: user.id,
        userName: user.name,
        rating,
        title,
        comment,
        isVerifiedPurchase: false, // In a real app, you would check if the user purchased the product
      })

      setSuccess(true)
      setRating(0)
      setTitle("")
      setComment("")
    } catch (err) {
      setError("Failed to submit review. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
        <p className="font-medium">Thank you for your review!</p>
        <p className="text-sm mt-1">Your review has been submitted successfully.</p>
        <button onClick={() => setSuccess(false)} className="text-sm text-green-700 underline mt-2">
          Write another review
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 ${
                  (hoverRating ? star <= hoverRating : star <= rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-title" className="block text-sm font-medium mb-1">
          Review Title
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
          placeholder="Summarize your experience"
          required
        />
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium mb-1">
          Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
          placeholder="Share your experience with this product"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  )
}
