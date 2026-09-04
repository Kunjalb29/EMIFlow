import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { RecentlyViewedItem } from '../types/product';

const STORAGE_KEY = 'emiflow_recently_viewed';
const MAX_RECENT = 6;

export function recordRecentlyViewed(item: {
  id: string;
  name: string;
  slug: string;
  brand: string;
  startingPrice: number;
  mrp: number;
  image: string;
}) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: RecentlyViewedItem[] = raw ? JSON.parse(raw) : [];

    // Filter out existing occurrence
    list = list.filter((p) => p.id !== item.id);

    // Prepend latest
    list.unshift({
      ...item,
      viewedAt: Date.now(),
    });

    // Limit to MAX_RECENT
    list = list.slice(0, MAX_RECENT);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Failed to record recently viewed:', err);
  }
}

interface RecentlyViewedProps {
  currentProductId?: string;
  title?: string;
}

export default function RecentlyViewed({ currentProductId, title = 'Recently Viewed' }: RecentlyViewedProps) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        let list: RecentlyViewedItem[] = JSON.parse(raw);
        if (currentProductId) {
          list = list.filter((i) => i.id !== currentProductId);
        }
        setItems(list);
      }
    } catch {
      setItems([]);
    }
  }, [currentProductId]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pick up right where you left off
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setItems([]);
          }}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((phone) => {
          const discount = phone.mrp > phone.startingPrice
            ? Math.round(((phone.mrp - phone.startingPrice) / phone.mrp) * 100)
            : 0;

          return (
            <Link
              key={phone.id}
              to={`/product/${phone.slug}`}
              className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Thumbnail */}
              <div className="aspect-square bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-3">
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {phone.brand}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {phone.name}
                  </h4>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      ₹{phone.startingPrice.toLocaleString('en-IN')}
                    </span>
                    {discount > 0 && (
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                        {discount}% off
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    EMI from ₹{Math.round(phone.startingPrice / 12).toLocaleString('en-IN')}/mo
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
