import { Link } from 'react-router-dom';
import { Tag, Heart } from 'lucide-react';
import StarRating from './StarRating';
import { formatPrice, calcDiscount } from '../utils/format';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import type { ProductListItem } from '../types/product';

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = calcDiscount(product.mrp, product.startingPrice);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col relative"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Cashback Badge */}
        {product.cashback > 0 && (
          <div className="absolute top-3 left-3 bg-success text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 z-10 shadow-sm">
            <Tag size={12} />
            {formatPrice(product.cashback)} Cashback
          </div>
        )}

        {/* Action icons (Wishlist & Compare) on top right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              isFavorited
                ? 'bg-red-500 text-white hover:bg-red-600 scale-105'
                : 'bg-white/90 backdrop-blur-sm text-slate-500 hover:text-red-500 hover:bg-white hover:scale-105'
            }`}
          >
            <Heart
              size={16}
              className={`transition-transform duration-200 ${isFavorited ? 'fill-current' : ''}`}
            />
          </button>

          <button
            type="button"
            onClick={handleCompareClick}
            aria-label={isCompared ? 'Remove from compare' : 'Add to compare'}
            title={isCompared ? 'In compare list (click to remove)' : 'Add to compare'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md text-xs font-semibold ${
              isCompared
                ? 'bg-blue-600 text-white hover:bg-blue-700 scale-105'
                : 'bg-white/90 backdrop-blur-sm text-slate-600 hover:text-blue-600 hover:bg-white hover:scale-105'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute bottom-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand */}
        <span className="text-xs font-medium text-primary uppercase tracking-wide">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="text-base font-semibold text-text-primary mt-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-text-muted">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-text-primary">
            {formatPrice(product.startingPrice)}
          </span>
          {product.startingPrice < product.mrp && (
            <span className="text-xs text-text-muted line-through">
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        {/* Variants info */}
        <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border">
          <div className="flex -space-x-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                title={color}
              />
            ))}
          </div>
          <span className="text-xs text-text-muted">
            {product.variantCount} variant{product.variantCount > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}
