import { useState, useEffect } from 'react';
import { BadgeCheck } from 'lucide-react';
import StarRating from './StarRating';
import { formatDate } from '../utils/format';
import { api } from '../services/api';
import type { Review } from '../types/product';

interface ReviewSectionProps {
  slug: string;
  rating: number;
  reviewCount: number;
}

export default function ReviewSection({ slug, rating, reviewCount }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getReviews(slug)
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [slug]);

  const ratingLabel =
    rating >= 4.5 ? 'Excellent' : rating >= 4 ? 'Very Good' : rating >= 3.5 ? 'Good' : 'Average';

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-text-primary mb-6">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-border p-6 flex flex-col items-center text-center">
          <span className="text-5xl font-bold text-text-primary">{rating}</span>
          <StarRating rating={rating} size={20} />
          <span className="text-sm font-semibold text-text-secondary mt-2">{ratingLabel}</span>
          <span className="text-xs text-text-muted mt-1">{reviewCount} reviews</span>
        </div>

        {/* Review Cards */}
        <div className="lg:col-span-3 space-y-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-5">
                <div className="skeleton h-4 w-32 mb-3" />
                <div className="skeleton h-3 w-full mb-2" />
                <div className="skeleton h-3 w-3/4" />
              </div>
            ))
          ) : reviews.length === 0 ? (
            <p className="text-sm text-text-muted py-8 text-center">No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl border border-border p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-text-primary">
                          {review.reviewerName}
                        </span>
                        {review.verifiedBuyer && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-success">
                            <BadgeCheck size={13} />
                            Verified
                          </span>
                        )}
                      </div>
                      {review.variantInfo && (
                        <span className="text-xs text-text-muted">{review.variantInfo}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-text-muted shrink-0">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                <div className="mt-2 ml-12">
                  <StarRating rating={review.rating} size={14} />
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
