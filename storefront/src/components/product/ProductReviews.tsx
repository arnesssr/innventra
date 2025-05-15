import { Star } from "lucide-react"
import { Button } from "../ui/Button"

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? "fill-orange-500 text-orange-500"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Based on {totalReviews} reviews
            </span>
          </div>
        </div>
        <Button>Write a Review</Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-orange-500 text-orange-500"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{review.author}</span>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
