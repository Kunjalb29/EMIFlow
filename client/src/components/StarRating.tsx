import { Star, StarHalf } from 'lucide-react';
import { getStarRating } from '../utils/format';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  const stars = getStarRating(rating);

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {stars.map((type, i) => {
        if (type === 'full')
          return <Star key={i} size={size} className="fill-warning text-warning" />;
        if (type === 'half')
          return <StarHalf key={i} size={size} className="fill-warning text-warning" />;
        return <Star key={i} size={size} className="text-gray-200" />;
      })}
    </div>
  );
}
