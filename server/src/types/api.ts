export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
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

export interface ProductDetail {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string;
    category: string;
    description: string | null;
    rating: number;
    reviewCount: number;
    specs: Record<string, string> | null;
  };
  variants: VariantInfo[];
  selectedVariant: VariantInfo;
  images: ImageInfo[];
  emiPlans: EmiPlanInfo[];
}

export interface VariantInfo {
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

export interface ImageInfo {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

export interface EmiPlanInfo {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  totalAmount: number;
  cashback: number;
  processingFee: number;
  isPopular: boolean;
}

export interface ReviewInfo {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  verifiedBuyer: boolean;
  variantInfo: string | null;
  createdAt: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

export interface SavedPlanResponse {
  id: string;
  status: string;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string;
  };
  variant: {
    id: string;
    color: string;
    storage: string;
    sellingPrice: number;
    cashback: number;
  };
  emiPlan: {
    id: string;
    tenureMonths: number;
    monthlyAmount: number;
    interestRate: number;
    totalAmount: number;
    cashback: number;
  };
}

export interface AssistantAction {
  type: 'navigate' | 'open_product' | 'filter_products' | 'show_emi';
  label: string;
  path: string;
}

export interface AssistantChatRequest {
  message: string;
  context?: {
    currentPath?: string;
    selectedProduct?: string | null;
  };
}

export interface AssistantChatResponse {
  message: string;
  actions: AssistantAction[];
}

