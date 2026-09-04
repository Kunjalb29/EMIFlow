import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { ProductListSkeleton } from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';

export default function HomePage() {
  const { products, loading, error, refetch } = useProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-16 lg:py-24">
        {/* Glow decoration */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                Next-Gen Device Financing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Own the Flagship Today. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
                  Pay via Smart No-Cost EMI.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Experience seamless zero-downpayment financing backed by curated mutual funds and instant cashback. Transparent interest rates, no hidden fees, and lightning-fast approval.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#featured-products"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 group"
                >
                  Explore Phones
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  to="/products"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-all flex items-center justify-center"
                >
                  View All Catalog
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-slate-700/60 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">₹0</div>
                  <div className="text-xs text-slate-400">Processing on 3M</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-xs text-slate-400">Paperless Approval</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">Up to ₹5,000</div>
                  <div className="text-xs text-slate-400">Instant Cashback</div>
                </div>
              </div>
            </div>

            {/* Right Card Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-orange-400 font-semibold">Featured Offer</span>
                    <h3 className="font-bold text-lg">{products[0]?.name || 'Apple iPhone 17 Pro'}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    0% No-Cost
                  </span>
                </div>

                <div className="my-6 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Retail Price</span>
                    <span className="line-through text-slate-400">₹1,34,900</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Special Offer Price</span>
                    <span className="text-lg font-bold text-emerald-400">₹1,28,900</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">EMI Starting at</span>
                    <span className="text-xl font-extrabold text-orange-400">₹10,742/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-300 bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                      <Sparkles className="w-3.5 h-3.5" /> Instant ₹6,000 Cashback
                    </span>
                    <span className="text-slate-400">Credited to wallet</span>
                  </div>
                </div>

                <Link
                  to={products[0]?.slug ? `/product/${products[0].slug}` : '/product/iphone-17-pro'}
                  className="block text-center w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-md"
                >
                  Configure & Apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Top Choices</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                Trending Smartphones on Smart EMI
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Handpicked premium flagships with custom-tailored flexible financing terms.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-bold text-sm"
            >
              Browse all phones <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading && <ProductListSkeleton />}

          {error && (
            <ErrorState
              title="Unable to load catalog"
              message={error}
              onRetry={refetch}
            />
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Simple & Seamless</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              How EMIFlow Works in 3 Steps
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Get approved in under 3 minutes without visiting a bank branch or filling paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Select Device & Storage</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose from premium colors and memory configurations with live stock validation and transparent MRP discounts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Choose Your Tenure</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pick 3, 6, 9, or 12-month tenures. Enjoy No-Cost EMI options with zero processing fee and upfront cashback rewards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Instant Approval & Dispatch</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Complete rapid online verification. Your brand-new device is shipped with insured courier delivery directly to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Comparison / Differentiator */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">The Smarter Way</span>
            <h2 className="text-3xl font-black tracking-tight mt-1">
              Why Choose EMIFlow vs Traditional Credit Cards?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <h4 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2">
                Traditional Credit Card EMI
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span> High 14%–18% annual interest rates
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span> Hidden processing fees (₹199 - ₹499 + 18% GST)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span> Blocks your entire credit limit for months
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span> Foreclosure penalties if paid early
                </li>
              </ul>
            </div>

            {/* EMIFlow */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-orange-950/60 via-slate-800 to-slate-800 border-2 border-orange-500/80 relative shadow-xl shadow-orange-950/50">
              <div className="absolute -top-3 right-6 bg-orange-500 text-white text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full">
                Recommended
              </div>
              <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                EMIFlow Smart Financing
              </h4>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>0% Interest</strong> on popular 3-month & 6-month plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Processing Fee</strong> on promotional devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Up to <strong>₹5,000 instant cashback</strong> credited to account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Backed by trusted AMFI registered mutual fund partners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
