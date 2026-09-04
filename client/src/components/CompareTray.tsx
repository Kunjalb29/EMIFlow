import { Link, useLocation } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

export default function CompareTray() {
  const { compareProducts, removeFromCompare, clearCompare } = useCompare();
  const location = useLocation();

  // Hide the tray when the user is already on the /compare page
  if (compareProducts.length === 0 || location.pathname === '/compare') {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl animate-fade-in-up">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-950/60 rounded-2xl p-3 sm:p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Selected phones preview */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
              Compare ({compareProducts.length}/3)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {compareProducts.map((p) => (
              <div
                key={p.id}
                className="relative group flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-xl px-2.5 py-1.5 shrink-0 transition-all hover:border-slate-600"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-7 h-7 object-contain rounded-md"
                />
                <span className="text-xs font-medium text-slate-200 max-w-[90px] sm:max-w-[110px] truncate">
                  {p.name}
                </span>
                <button
                  onClick={() => removeFromCompare(p.id)}
                  title="Remove from comparison"
                  className="text-slate-400 hover:text-red-400 p-0.5 rounded-full hover:bg-red-500/10 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {Array.from({ length: 3 - compareProducts.length }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="hidden sm:flex items-center justify-center w-24 h-10 border border-dashed border-slate-700 rounded-xl text-[11px] text-slate-400"
              >
                + Empty Slot
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 transition-colors font-medium"
          >
            Clear
          </button>

          <Link
            to="/compare"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Compare Now</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
