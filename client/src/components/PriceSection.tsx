import { TrendingDown, Tag } from 'lucide-react';
import { formatPrice, calcDiscount } from '../utils/format';
import type { Variant } from '../types/product';

interface PriceSectionProps {
  variant: Variant;
}

export default function PriceSection({ variant }: PriceSectionProps) {
  const discount = calcDiscount(variant.mrp, variant.sellingPrice);
  const savings = variant.mrp - variant.sellingPrice;

  return (
    <div className="space-y-2">
      {/* Selling Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
          {formatPrice(variant.sellingPrice)}
        </span>
        {discount > 0 && (
          <span className="text-sm font-semibold text-success bg-success-light px-2.5 py-1 rounded-lg">
            {discount}% off
          </span>
        )}
      </div>

      {/* MRP */}
      {savings > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-text-muted">
            MRP <span className="line-through">{formatPrice(variant.mrp)}</span>
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-success">
            <TrendingDown size={14} />
            You save {formatPrice(savings)}
          </span>
        </div>
      )}

      {/* Cashback */}
      {variant.cashback > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1.5 bg-success-light text-success px-3 py-1.5 rounded-lg">
            <Tag size={14} />
            <span className="text-sm font-semibold">
              + {formatPrice(variant.cashback)} cashback
            </span>
          </div>
        </div>
      )}

      {/* Stock info */}
      <div className="pt-1">
        {variant.stock > 0 ? (
          <span className={`text-xs font-medium ${variant.stock < 10 ? 'text-warning' : 'text-success'}`}>
            {variant.stock < 10 ? `Only ${variant.stock} left in stock` : 'In stock'}
          </span>
        ) : (
          <span className="text-xs font-medium text-danger">Out of stock</span>
        )}
      </div>
    </div>
  );
}
