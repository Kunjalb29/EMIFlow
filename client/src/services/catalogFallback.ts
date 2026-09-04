import type { ProductListItem, ProductDetail, VariantDetail, Review, WishlistItem } from '../types/product';
import type { User, SavedPlan, AssistantResponse } from '../types/auth';

// =========================================================================
// EMIFlow — Resilient Demo Catalog Fallback Data
// Provides uninterrupted live demonstration on cloud hosting (Vercel)
// when the local PostgreSQL database server is offline or unreachable.
// =========================================================================

export const FALLBACK_PRODUCTS: ProductListItem[] = [
  {
    id: 'prod_apple_iphone_17_pro',
    name: 'Apple iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.7,
    reviewCount: 128,
    startingPrice: 127400,
    mrp: 134900,
    cashback: 7500,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    variantCount: 3,
    colors: ['Silver', 'Cosmic Orange', 'Deep Blue'],
  },
  {
    id: 'prod_samsung_galaxy_s25_ultra',
    name: 'Samsung Galaxy S25 Ultra',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    rating: 4.5,
    reviewCount: 96,
    startingPrice: 124999,
    mrp: 131999,
    cashback: 7000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
    variantCount: 2,
    colors: ['Titanium Silver', 'Titanium Black'],
  },
  {
    id: 'prod_oneplus_13',
    name: 'OnePlus 13',
    slug: 'oneplus-13',
    brand: 'OnePlus',
    category: 'Smartphones',
    rating: 4.6,
    reviewCount: 74,
    startingPrice: 65999,
    mrp: 69999,
    cashback: 4000,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80',
    variantCount: 2,
    colors: ['Midnight Ocean', 'Arctic Dawn'],
  },
];

const IPHONE_VARIANTS = [
  {
    id: 'var_iph_slv_256',
    color: 'Silver',
    colorHex: '#C0C0C0',
    storage: '256 GB',
    mrp: 134900,
    sellingPrice: 127400,
    cashback: 7500,
    stock: 45,
    sku: 'IPHONE17P-SLV-256',
    isDefault: true,
  },
  {
    id: 'var_iph_org_256',
    color: 'Cosmic Orange',
    colorHex: '#E8732A',
    storage: '256 GB',
    mrp: 134900,
    sellingPrice: 128900,
    cashback: 6000,
    stock: 32,
    sku: 'IPHONE17P-ORG-256',
    isDefault: false,
  },
  {
    id: 'var_iph_blu_512',
    color: 'Deep Blue',
    colorHex: '#1B3A6B',
    storage: '512 GB',
    mrp: 154900,
    sellingPrice: 146400,
    cashback: 8500,
    stock: 18,
    sku: 'IPHONE17P-BLU-512',
    isDefault: false,
  },
];

const SAMSUNG_VARIANTS = [
  {
    id: 'var_sam_slv_256',
    color: 'Titanium Silver',
    colorHex: '#A8A9AD',
    storage: '256 GB',
    mrp: 131999,
    sellingPrice: 124999,
    cashback: 7000,
    stock: 55,
    sku: 'SGS25U-TSV-256',
    isDefault: true,
  },
  {
    id: 'var_sam_blk_512',
    color: 'Titanium Black',
    colorHex: '#2C2C2C',
    storage: '512 GB',
    mrp: 144999,
    sellingPrice: 137999,
    cashback: 7000,
    stock: 28,
    sku: 'SGS25U-TBK-512',
    isDefault: false,
  },
];

const ONEPLUS_VARIANTS = [
  {
    id: 'var_op13_mid_256',
    color: 'Midnight Ocean',
    colorHex: '#1A3555',
    storage: '256 GB',
    mrp: 69999,
    sellingPrice: 65999,
    cashback: 4000,
    stock: 72,
    sku: 'OP13-MO-256',
    isDefault: true,
  },
  {
    id: 'var_op13_arc_512',
    color: 'Arctic Dawn',
    colorHex: '#E8E4DF',
    storage: '512 GB',
    mrp: 79999,
    sellingPrice: 74999,
    cashback: 5000,
    stock: 38,
    sku: 'OP13-AD-512',
    isDefault: false,
  },
];

function generateEmiPlans(sellingPrice: number, cashback: number) {
  return [
    {
      id: `emi_3m_${sellingPrice}`,
      tenureMonths: 3,
      monthlyAmount: Math.round(sellingPrice / 3),
      interestRate: 0,
      totalAmount: sellingPrice,
      cashback,
      processingFee: 0,
      isPopular: false,
    },
    {
      id: `emi_6m_${sellingPrice}`,
      tenureMonths: 6,
      monthlyAmount: Math.round(sellingPrice / 6),
      interestRate: 0,
      totalAmount: sellingPrice,
      cashback,
      processingFee: 0,
      isPopular: true,
    },
    {
      id: `emi_12m_${sellingPrice}`,
      tenureMonths: 12,
      monthlyAmount: Math.round(sellingPrice / 12),
      interestRate: 0,
      totalAmount: sellingPrice,
      cashback,
      processingFee: 0,
      isPopular: false,
    },
    {
      id: `emi_24m_${sellingPrice}`,
      tenureMonths: 24,
      monthlyAmount: Math.round(sellingPrice / 24),
      interestRate: 0,
      totalAmount: sellingPrice,
      cashback,
      processingFee: 0,
      isPopular: false,
    },
    {
      id: `emi_36m_${sellingPrice}`,
      tenureMonths: 36,
      monthlyAmount: Math.round((sellingPrice * 1.15) / 36),
      interestRate: 10.5,
      totalAmount: Math.round(sellingPrice * 1.15),
      cashback,
      processingFee: 499,
      isPopular: false,
    },
  ];
}

const PRODUCT_DETAILS_MAP: Record<string, ProductDetail> = {
  'iphone-17-pro': {
    product: {
      id: 'prod_apple_iphone_17_pro',
      name: 'Apple iPhone 17 Pro',
      slug: 'iphone-17-pro',
      brand: 'Apple',
      category: 'Smartphones',
      description: 'The most advanced iPhone ever. Featuring the A19 Pro chip, a stunning titanium design, and a revolutionary camera system with 48MP Fusion camera. Experience the future of mobile computing with seamless 0% No-Cost EMI.',
      rating: 4.7,
      reviewCount: 128,
      specs: {
        Display: '6.3-inch Super Retina XDR OLED (120Hz ProMotion)',
        Resolution: '2622 × 1206 pixels',
        Processor: 'Apple A19 Pro (3nm)',
        RAM: '8 GB',
        'Rear Camera': '48 MP Fusion + 48 MP Ultra Wide + 48 MP 5x Telephoto',
        'Front Camera': '18 MP TrueDepth Camera',
        Battery: '4685 mAh',
        Charging: '25W MagSafe Wireless + Fast Wired USB-C',
        OS: 'iOS 19',
        Build: 'Grade 5 Titanium frame with Ceramic Shield front',
        'Water Resistance': 'IP68 (6m up to 30 mins)',
      },
    },
    variants: IPHONE_VARIANTS,
    selectedVariant: IPHONE_VARIANTS[0],
    images: [
      { id: 'img_1', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', alt: 'iPhone 17 Pro Front', sortOrder: 1 },
      { id: 'img_2', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80', alt: 'iPhone 17 Pro Back', sortOrder: 2 },
      { id: 'img_3', url: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800&q=80', alt: 'iPhone 17 Pro Titanium', sortOrder: 3 },
      { id: 'img_4', url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80', alt: 'iPhone 17 Pro Optics', sortOrder: 4 },
    ],
    emiPlans: generateEmiPlans(127400, 7500),
  },
  'samsung-galaxy-s25-ultra': {
    product: {
      id: 'prod_samsung_galaxy_s25_ultra',
      name: 'Samsung Galaxy S25 Ultra',
      slug: 'samsung-galaxy-s25-ultra',
      brand: 'Samsung',
      category: 'Smartphones',
      description: 'Unleash the power of Galaxy AI with the Galaxy S25 Ultra. Featuring a stunning 6.9-inch Dynamic AMOLED display, Snapdragon 8 Elite processor, and a 200MP camera system that redefines mobile photography.',
      rating: 4.5,
      reviewCount: 96,
      specs: {
        Display: '6.9-inch Dynamic AMOLED 2X (1-120Hz LTPO)',
        Resolution: '3120 × 1440 pixels',
        Processor: 'Qualcomm Snapdragon 8 Elite',
        RAM: '12 GB LPDDR5X',
        'Rear Camera': '200 MP Main + 50 MP Periscope + 50 MP Ultra Wide + 10 MP Telephoto',
        'Front Camera': '12 MP Dual Pixel AF',
        Battery: '5000 mAh',
        Charging: '45W Fast Wired + 15W Wireless + S-Pen built-in',
        OS: 'Android 15, One UI 7',
        Build: 'Titanium frame with Corning Gorilla Armor',
        'Water Resistance': 'IP68',
      },
    },
    variants: SAMSUNG_VARIANTS,
    selectedVariant: SAMSUNG_VARIANTS[0],
    images: [
      { id: 'img_sam_1', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', alt: 'Galaxy S25 Ultra Front', sortOrder: 1 },
      { id: 'img_sam_2', url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80', alt: 'Galaxy S25 Ultra Back', sortOrder: 2 },
      { id: 'img_sam_3', url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80', alt: 'Galaxy S25 Ultra Titanium', sortOrder: 3 },
    ],
    emiPlans: generateEmiPlans(124999, 7000),
  },
  'oneplus-13': {
    product: {
      id: 'prod_oneplus_13',
      name: 'OnePlus 13',
      slug: 'oneplus-13',
      brand: 'OnePlus',
      category: 'Smartphones',
      description: 'Never Settle with the OnePlus 13. Powered by Snapdragon 8 Elite, featuring a brilliant 2K LTPO AMOLED display, Hasselblad camera system, and blazing-fast 100W SUPERVOOC charging.',
      rating: 4.6,
      reviewCount: 74,
      specs: {
        Display: '6.82-inch 2K LTPO AMOLED (1-120Hz)',
        Resolution: '3168 × 1440 pixels',
        Processor: 'Snapdragon 8 Elite',
        RAM: '12 GB / 16 GB LPDDR5X',
        'Rear Camera': '50 MP Sony LYT-808 + 50 MP Periscope + 50 MP Ultra Wide',
        'Front Camera': '32 MP',
        Battery: '6000 mAh Glacier Battery',
        Charging: '100W SUPERVOOC + 50W AIRVOOC Wireless',
        OS: 'OxygenOS 15 based on Android 15',
        Build: 'Ceramic glass and aerospace aluminum frame',
        'Water Resistance': 'IP69 / IP68',
      },
    },
    variants: ONEPLUS_VARIANTS,
    selectedVariant: ONEPLUS_VARIANTS[0],
    images: [
      { id: 'img_op_1', url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80', alt: 'OnePlus 13 Front', sortOrder: 1 },
      { id: 'img_op_2', url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80', alt: 'OnePlus 13 Back', sortOrder: 2 },
      { id: 'img_op_3', url: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80', alt: 'OnePlus 13 Hasselblad', sortOrder: 3 },
    ],
    emiPlans: generateEmiPlans(65999, 4000),
  },
};

const DEMO_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    reviewerName: 'Aditya Sharma',
    rating: 5,
    comment: 'Instant approval on 0% No-Cost EMI! The device arrived within 24 hours in pristine condition.',
    verifiedBuyer: true,
    variantInfo: '256 GB',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'rev_2',
    reviewerName: 'Sneha Patel',
    rating: 5,
    comment: 'The upfront ₹7,500 cashback was credited instantly. Transparent financing with zero hidden costs.',
    verifiedBuyer: true,
    variantInfo: '512 GB',
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: 'rev_3',
    reviewerName: 'Rohan Mehta',
    rating: 4,
    comment: 'Super easy paperless digital verification. Monthly installments are exactly as shown in the calculator.',
    verifiedBuyer: true,
    variantInfo: '256 GB',
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
];

export const fallbackApi = {
  getProducts(): ProductListItem[] {
    return FALLBACK_PRODUCTS;
  },

  getProduct(slug: string, variantId?: string): ProductDetail {
    const detail = PRODUCT_DETAILS_MAP[slug] || PRODUCT_DETAILS_MAP['iphone-17-pro'];
    if (variantId) {
      const foundVar = detail.variants.find((v) => v.id === variantId);
      if (foundVar) {
        return {
          ...detail,
          selectedVariant: foundVar,
          emiPlans: generateEmiPlans(foundVar.sellingPrice, foundVar.cashback),
        };
      }
    }
    return detail;
  },

  getVariant(slug: string, variantId: string): VariantDetail {
    const detail = this.getProduct(slug, variantId);
    return {
      variant: detail.selectedVariant,
      images: detail.images,
      emiPlans: detail.emiPlans,
    };
  },

  getReviews(_slug: string): Review[] {
    return DEMO_REVIEWS;
  },

  getWishlist(): WishlistItem[] {
    try {
      const stored = localStorage.getItem('emiflow_guest_wishlist') || localStorage.getItem('emiflow_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  getWishlistIds(): string[] {
    return this.getWishlist().map((w) => w.product.id);
  },

  addToWishlist(productId: string): { success: boolean } {
    const list = this.getWishlist();
    if (!list.some((i) => i.product.id === productId)) {
      const prod = FALLBACK_PRODUCTS.find((p) => p.id === productId) || FALLBACK_PRODUCTS[0];
      list.unshift({
        wishlistId: `wish_${Date.now()}`,
        addedAt: new Date().toISOString(),
        product: prod,
      });
      localStorage.setItem('emiflow_guest_wishlist', JSON.stringify(list));
    }
    return { success: true };
  },

  removeFromWishlist(productId: string): { success: boolean } {
    const list = this.getWishlist().filter((i) => i.product.id !== productId);
    localStorage.setItem('emiflow_guest_wishlist', JSON.stringify(list));
    return { success: true };
  },

  getSavedPlans(): SavedPlan[] {
    try {
      const stored = localStorage.getItem('emiflow_saved_plans');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  savePlan(data: { productId: string; variantId: string; emiPlanId: string }): SavedPlan {
    const plans = this.getSavedPlans();
    const product = FALLBACK_PRODUCTS.find((p) => p.id === data.productId) || FALLBACK_PRODUCTS[0];
    const newPlan: SavedPlan = {
      id: `plan_${Date.now()}`,
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
      },
      variant: {
        id: data.variantId,
        color: 'Default',
        storage: '256 GB',
        sellingPrice: product.startingPrice,
        cashback: product.cashback,
      },
      emiPlan: {
        id: data.emiPlanId,
        tenureMonths: 12,
        monthlyAmount: Math.round(product.startingPrice / 12),
        interestRate: 0,
        totalAmount: product.startingPrice,
        cashback: product.cashback,
      },
    };
    plans.unshift(newPlan);
    localStorage.setItem('emiflow_saved_plans', JSON.stringify(plans));
    return newPlan;
  },

  getMe(): User {
    const stored = localStorage.getItem('emiflow_demo_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    const defaultUser: User = {
      id: 'usr_demo_123',
      name: 'Demo Evaluator',
      email: 'demo@emiflow.com',
      avatarUrl: null,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('emiflow_demo_user', JSON.stringify(defaultUser));
    return defaultUser;
  },

  chatWithAssistant(query: string): AssistantResponse {
    const q = query.toLowerCase();

    if (q.includes('compare') || q.includes('versus') || q.includes(' vs ')) {
      return {
        message: 'You can compare all 3 flagship smartphones (iPhone 17 Pro, Galaxy S25 Ultra, OnePlus 13) side-by-side with camera specs, processor benchmarks, and flexible No-Cost EMI plans!',
        actions: [
          { type: 'navigate', label: 'Open Comparison Matrix', path: '/compare' },
          { type: 'navigate', label: 'Explore Smartphones', path: '/products' },
        ],
      };
    }

    if (q.includes('wishlist') || q.includes('saved')) {
      return {
        message: 'You can view, manage, and finance your favorite smartphones anytime in your personal Wishlist.',
        actions: [
          { type: 'navigate', label: 'Open My Wishlist', path: '/wishlist' },
        ],
      };
    }

    if (q.includes('apple') || q.includes('iphone')) {
      return {
        message: 'We offer the **Apple iPhone 17 Pro** starting at ₹1,27,400 with 0% No-Cost EMI starting at ₹11,242/mo and ₹7,500 instant cashback.',
        actions: [
          { type: 'open_product', label: 'Configure iPhone 17 Pro', path: '/product/iphone-17-pro' },
          { type: 'navigate', label: 'Compare Devices', path: '/compare' },
        ],
      };
    }

    if (q.includes('samsung') || q.includes('galaxy') || q.includes('s25')) {
      return {
        message: 'The **Samsung Galaxy S25 Ultra** features Snapdragon 8 Elite, 200MP Quad Optics, and built-in S-Pen. Starting at ₹1,24,999 with 0% interest EMI options.',
        actions: [
          { type: 'open_product', label: 'Configure Galaxy S25 Ultra', path: '/product/samsung-galaxy-s25-ultra' },
        ],
      };
    }

    return {
      message: 'I can help you browse flagship smartphones, calculate No-Cost EMI installments, compare cameras, and select transparent financing plans. What device can I help you configure?',
      actions: [
        { type: 'navigate', label: 'Browse Catalog', path: '/products' },
        { type: 'navigate', label: 'Compare Devices', path: '/compare' },
        { type: 'navigate', label: 'How Financing Works', path: '/how-it-works' },
      ],
    };
  },
};
