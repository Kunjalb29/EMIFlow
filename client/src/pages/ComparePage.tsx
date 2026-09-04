import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { api } from '../services/api';
import type { ProductListItem, ProductDetail } from '../types/product';

export default function ComparePage() {
  const { compareProducts, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [catalog, setCatalog] = useState<ProductListItem[]>([]);
  const [detailedProducts, setDetailedProducts] = useState<Record<string, ProductDetail>>({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showSelectorModal, setShowSelectorModal] = useState(false);

  // Load catalog for the "Add Phone" slot picker
  useEffect(() => {
    api.getProducts().then(setCatalog).catch(console.error);
  }, []);

  // Fetch full details (for detailed specs and full EMI plans) for all compared phones
  useEffect(() => {
    if (compareProducts.length === 0) return;

    let isMounted = true;
    setLoadingDetails(true);

    Promise.all(
      compareProducts.map(async (p) => {
        if (detailedProducts[p.id]) return detailedProducts[p.id];
        try {
          return await api.getProduct(p.slug);
        } catch {
          return null;
        }
      })
    ).then((results) => {
      if (!isMounted) return;
      const map: Record<string, ProductDetail> = { ...detailedProducts };
      results.forEach((detail) => {
        if (detail) {
          map[detail.product.id] = detail;
        }
      });
      setDetailedProducts(map);
      setLoadingDetails(false);
    });

    return () => {
      isMounted = false;
    };
  }, [compareProducts]);

  // Load default flagship trio if user clicks quick comparison
  const loadFlagshipComparison = () => {
    if (catalog.length > 0) {
      clearCompare();
      catalog.slice(0, 3).forEach((p) => addToCompare(p));
    }
  };

  const emptySlotsCount = Math.max(0, 3 - compareProducts.length);

  // Spec keys to display in matrix
  const specFields = [
    { label: 'Display', key: 'Display' },
    { label: 'Processor', key: 'Processor' },
    { label: 'Rear Camera', key: 'Rear Camera' },
    { label: 'Front Camera', key: 'Front Camera' },
    { label: 'Battery', key: 'Battery' },
    { label: 'Charging', key: 'Charging' },
    { label: 'Operating System', key: 'OS' },
    { label: 'Build Material', key: 'Build' },
    { label: 'Water Resistance', key: 'Water Resistance' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Compare Smartphones
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Side-by-side technical specs, camera optics, and monthly No-Cost EMI plans
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-slate-500 hover:text-red-500 font-medium px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Clear All
              </button>
            )}
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl transition-colors shadow-sm"
            >
              <span>Catalog</span>
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {compareProducts.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm max-w-xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No smartphones selected for comparison
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              Select up to 3 smartphones to evaluate cameras, battery endurance, performance benchmarks, and flexible monthly EMI costs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={loadFlagshipComparison}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Compare Flagship Trio</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        ) : (
          /* Comparison Table / Matrix */
          <div className="overflow-x-auto pb-6">
            <div className="min-w-[760px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Product Header Row */}
              <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="p-5 flex flex-col justify-end">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Specifications & Pricing
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct comparison across flagship parameters
                  </p>
                </div>

                {compareProducts.map((product) => {
                  return (
                    <div key={product.id} className="p-5 flex flex-col items-center text-center relative group">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        title="Remove from comparison"
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="w-28 h-28 bg-white dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center mb-3 shadow-sm border border-slate-100 dark:border-slate-700/60">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                        {product.brand}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{product.rating}</span>
                      </div>

                      <Link
                        to={`/product/${product.slug}`}
                        className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors text-center"
                      >
                        Configure & Buy
                      </Link>
                    </div>
                  );
                })}

                {/* Empty Slots if fewer than 3 */}
                {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                  <div
                    key={`slot-${idx}`}
                    className="p-5 flex flex-col items-center justify-center text-center border-dashed"
                  >
                    <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 mb-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-3">
                      Add Smartphone
                    </p>
                    <button
                      onClick={() => setShowSelectorModal(true)}
                      className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors"
                    >
                      + Choose Device
                    </button>
                  </div>
                ))}
              </div>

              {/* Price & EMI Section */}
              <div className="bg-slate-100/70 dark:bg-slate-800/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                Financing & Pricing Details
              </div>

              <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                  Starting Price
                </div>
                {compareProducts.map((p) => (
                  <div key={p.id} className="p-4 text-center font-bold text-sm text-slate-900 dark:text-white">
                    ₹{p.startingPrice.toLocaleString('en-IN')}
                    <div className="text-[10px] font-normal text-slate-400 line-through">
                      MRP ₹{p.mrp.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
                {Array.from({ length: emptySlotsCount }).map((_, i) => (
                  <div key={i} className="p-4 text-center text-slate-400">—</div>
                ))}
              </div>

              <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                  Instant Cashback
                </div>
                {compareProducts.map((p) => (
                  <div key={p.id} className="p-4 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                    ₹{p.cashback.toLocaleString('en-IN')} instant
                  </div>
                ))}
                {Array.from({ length: emptySlotsCount }).map((_, i) => (
                  <div key={i} className="p-4 text-center text-slate-400">—</div>
                ))}
              </div>

              <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                  6-Month No-Cost EMI
                </div>
                {compareProducts.map((p) => {
                  const sixMonthEmi = Math.round(p.startingPrice / 6);
                  return (
                    <div key={p.id} className="p-4 text-center font-bold text-blue-600 dark:text-blue-400">
                      ₹{sixMonthEmi.toLocaleString('en-IN')}/mo
                      <span className="block text-[10px] text-slate-400 font-normal">0% Interest</span>
                    </div>
                  );
                })}
                {Array.from({ length: emptySlotsCount }).map((_, i) => (
                  <div key={i} className="p-4 text-center text-slate-400">—</div>
                ))}
              </div>

              <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                  12-Month Lowest EMI
                </div>
                {compareProducts.map((p) => {
                  const twelveMonthEmi = Math.round(p.startingPrice / 12);
                  return (
                    <div key={p.id} className="p-4 text-center font-bold text-slate-900 dark:text-white">
                      ₹{twelveMonthEmi.toLocaleString('en-IN')}/mo
                    </div>
                  );
                })}
                {Array.from({ length: emptySlotsCount }).map((_, i) => (
                  <div key={i} className="p-4 text-center text-slate-400">—</div>
                ))}
              </div>

              {/* Technical Specifications Section */}
              <div className="bg-slate-100/70 dark:bg-slate-800/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                Technical Specifications
              </div>

              {specFields.map((spec) => (
                <div
                  key={spec.key}
                  className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 text-xs"
                >
                  <div className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                    {spec.label}
                  </div>
                  {compareProducts.map((p) => {
                    const detail = detailedProducts[p.id];
                    const val = (detail?.product?.specs as any)?.[spec.key] || 'Included in flagship specs';
                    return (
                      <div key={p.id} className="p-4 text-center text-slate-700 dark:text-slate-300">
                        {loadingDetails && !detail ? (
                          <span className="text-slate-400 animate-pulse">Loading...</span>
                        ) : (
                          val
                        )}
                      </div>
                    );
                  })}
                  {Array.from({ length: emptySlotsCount }).map((_, i) => (
                    <div key={i} className="p-4 text-center text-slate-400">—</div>
                  ))}
                </div>
              ))}

              {/* Available Colors */}
              <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="p-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/30">
                  Colors Available
                </div>
                {compareProducts.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-center gap-1.5 flex-wrap">
                    {p.colors.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                ))}
                {Array.from({ length: emptySlotsCount }).map((_, i) => (
                  <div key={i} className="p-4 text-center text-slate-400">—</div>
                ))}
              </div>

              {/* Bottom Action Row */}
              <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800 p-5 bg-slate-50/80 dark:bg-slate-900/80">
                <div className="flex items-center">
                  <span className="text-xs font-semibold text-slate-500">Ready to finance?</span>
                </div>
                {compareProducts.map((p) => (
                  <div key={p.id} className="px-3">
                    <Link
                      to={`/product/${p.slug}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all text-center"
                    >
                      <span>Choose Plan</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
                {Array.from({ length: emptySlotsCount }).map((_, i) => (
                  <div key={i} className="px-3 flex items-center justify-center">
                    <button
                      onClick={() => setShowSelectorModal(true)}
                      className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      + Add Phone
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Pick a smartphone to add to comparison */}
        {showSelectorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Add Smartphone to Comparison
                </h3>
                <button
                  onClick={() => setShowSelectorModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {catalog
                  .filter((p) => !compareProducts.some((cp) => cp.id === p.id))
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        addToCompare(p);
                        setShowSelectorModal(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded-lg bg-slate-50 dark:bg-slate-800 p-1"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                            {p.brand}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {p.name}
                          </h4>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          ₹{p.startingPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                          + Select
                        </span>
                      </div>
                    </div>
                  ))}

                {catalog.filter((p) => !compareProducts.some((cp) => cp.id === p.id)).length === 0 && (
                  <p className="text-center py-6 text-sm text-slate-400">
                    All catalog smartphones are already added!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
