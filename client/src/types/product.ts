// ============================================
// EMIFlow — Frontend Type Definitions
// ============================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string | null;
  rating: number;
  reviewCount: number;
  specs: Record<string, string> | null;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  mrp: number;
  cashback: number;
  image: string;
  variantCount: number;
  colors: string[];
}

export interface Variant {
  id: string;
  color: string;
  colorHex: string;
  storage: string;
  mrp: number;
  sellingPrice: number;
  cashback: number;
  stock: number;
  sku: string;
  isDefault: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  totalAmount: number;
  cashback: number;
  processingFee: number;
  isPopular: boolean;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  verifiedBuyer: boolean;
  variantInfo: string | null;
  createdAt: string;
}

export interface ProductDetail {
  product: Product;
  variants: Variant[];
  selectedVariant: Variant;
  images: ProductImage[];
  emiPlans: EmiPlan[];
}

export interface VariantDetail {
  variant: Variant;
  images: ProductImage[];
  emiPlans: EmiPlan[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WishlistItem {
  wishlistId?: string;
  addedAt?: string;
  product: ProductListItem;
}

export interface RecentlyViewedItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  startingPrice: number;
  mrp: number;
  image: string;
  viewedAt: number;
}
