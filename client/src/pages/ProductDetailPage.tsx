import { useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Zap, ArrowRight, Share2 } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';
import ProductGallery from '../components/ProductGallery';
import VariantSelector from '../components/VariantSelector';
import PriceSection from '../components/PriceSection';
import EmiPlanSelector from '../components/EmiPlanSelector';
import ProductSpecs from '../components/ProductSpecs';
import TrustFeatures from '../components/TrustFeatures';
import ReviewSection from '../components/ReviewSection';
import CheckoutModal from '../components/CheckoutModal';
import StarRating from '../components/StarRating';
import Breadcrumbs from '../components/Breadcrumbs';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { formatPrice } from '../utils/format';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const initialVariantId = searchParams.get('variantId') || undefined;

  const {
    product,
    variants,
    selectedVariant,
    images,
    emiPlans,
    selectedPlan,
    setSelectedPlan,
    selectVariant,
    loading,
    variantLoading,
    error,
    isCheckoutOpen,
    setIsCheckoutOpen,
    refetch,
  } = useProduct(slug, initialVariantId);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} on No-Cost EMI | EMIFlow`;
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorState
          title="Product Not Found"
          message={error || "The device you're looking for doesn't exist or is currently unavailable."}
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            ← Back to Smartphones Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Smartphones', href: '/products' },
          { label: product.brand, href: `/products?brand=${product.brand}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6">
        {/* Left Column: Visuals & Trust (5 cols on large screens) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="sticky top-20">
            <ProductGallery
              images={images}
              productName={product.name}
              cashback={selectedVariant.cashback}
            />

            <div className="mt-8">
              <TrustFeatures />
            </div>

            <div className="mt-8 hidden lg:block">
              <ProductSpecs specs={product.specs} />
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Customization & Financing (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                {product.brand}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: product.name, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {product.name}
            </h1>

            {/* Rating badge */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                <span className="text-sm font-black text-emerald-800">{product.rating}</span>
                <StarRating rating={product.rating} size={14} />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                ({product.reviewCount} verified buyer reviews)
              </span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Assured Authentic
              </span>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {product.description}
            </p>
          )}

          {/* Dynamic Price Display */}
          <div className="border-t border-slate-100 pt-5">
            <PriceSection variant={selectedVariant} />
          </div>

          {/* Variant Selector (Colors & Storage) */}
          <div className="border-t border-slate-100 pt-5 relative">
            {variantLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl">
                <div className="text-xs font-semibold text-orange-600 animate-pulse">Updating options...</div>
              </div>
            )}
            <VariantSelector
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={selectVariant}
            />
          </div>

          {/* EMI Financing Plans */}
          <div className="border-t border-slate-100 pt-6">
            <EmiPlanSelector
              plans={emiPlans}
              selectedPlanId={selectedPlan?.id ?? null}
              onSelect={setSelectedPlan}
            />
          </div>

          {/* Selected Plan Callout & CTA Button */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            {selectedPlan && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                        Selected {selectedPlan.tenureMonths}-Month EMI
                      </span>
                      {selectedPlan.interestRate === 0 && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          0% Interest
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        {formatPrice(selectedPlan.monthlyAmount)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ month for {selectedPlan.tenureMonths} mos</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500 block">Total Payout</span>
                    <span className="text-sm font-bold text-slate-800">
                      {formatPrice(selectedPlan.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed with EMI Plan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              Instant digital approval with PAN/Aadhaar • No credit card required
            </p>
          </div>

          {/* Specs on Mobile only */}
          <div className="block lg:hidden mt-8">
            <ProductSpecs specs={product.specs} />
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-16 border-t border-slate-200 pt-12">
        <ReviewSection
          slug={product.slug}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Checkout Drawer / Modal */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={product}
          variant={selectedVariant}
          plan={selectedPlan}
        />
      )}
    </div>
  );
}
