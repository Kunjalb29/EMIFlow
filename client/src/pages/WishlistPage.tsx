import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useAuth } from '../context/AuthContext';

export default function WishlistPage() {
  const { items, removeFromWishlist, loading } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 dark:bg-red-500/20 text-red-500 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  My Wishlist
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {items.length === 1 ? '1 smartphone saved' : `${items.length} smartphones saved`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <div className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-lg">
                Saved locally. <Link to="/login" className="underline font-semibold">Sign in</Link> to sync across devices.
              </div>
            )}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
            >
              <span>Browse More Phones</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && items.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 animate-pulse"
              >
                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-xl mb-4" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3 mb-2" />
                <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mb-4" />
                <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded w-full" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm max-w-xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-950/40 text-red-400 flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              Explore our collection of flagship smartphones, tap the heart icon on devices you love, and compare flexible 0% No-Cost EMI plans.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Explore Smartphones</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const product = item.product;
              const discount = product.mrp > product.startingPrice
                ? Math.round(((product.mrp - product.startingPrice) / product.mrp) * 100)
                : 0;
              const monthlyEmi = Math.round(product.startingPrice / 12);
              const alreadyInCompare = isInCompare(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Badges and Remove button */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                      {product.brand}
                    </span>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      title="Remove from wishlist"
                      className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-950/40 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>

                  {/* Product Image */}
                  <Link
                    to={`/product/${product.slug}`}
                    className="aspect-[4/3] bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-center overflow-hidden mb-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Title and Rating */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${product.slug}`}
                        className="font-bold text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>

                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{product.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{product.reviewCount} reviews</span>
                      </div>
                    </div>

                    {/* Price and EMI details */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          ₹{product.startingPrice.toLocaleString('en-IN')}
                        </span>
                        {product.mrp > product.startingPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {discount}% off
                          </span>
                        )}
                      </div>

                      {/* EMI badge */}
                      <div className="mt-2 flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/80 rounded-lg px-2.5 py-1.5 border border-slate-200/60 dark:border-slate-700/60">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Starting EMI</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">₹{monthlyEmi.toLocaleString('en-IN')}/mo</span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={() => addToCompare(product)}
                          disabled={alreadyInCompare}
                          className={`flex items-center justify-center gap-1 py-2 px-2 text-xs font-medium rounded-xl border transition-all ${
                            alreadyInCompare
                              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {alreadyInCompare ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Comparing</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                              </svg>
                              <span>Compare</span>
                            </>
                          )}
                        </button>

                        <Link
                          to={`/product/${product.slug}`}
                          className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 transition-all"
                        >
                          <span>View EMI</span>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
