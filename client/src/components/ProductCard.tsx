import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import StarRating from './StarRating';
import { formatPrice, calcDiscount } from '../utils/format';
import type { ProductListItem } from '../types/product';

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = calcDiscount(product.mrp, product.startingPrice);

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Cashback Badge */}
        {product.cashback > 0 && (
          <div className="absolute top-3 left-3 bg-success text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Tag size={12} />
            {formatPrice(product.cashback)} Cashback
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
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
