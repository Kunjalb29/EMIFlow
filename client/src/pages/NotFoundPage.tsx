import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-7xl font-black text-orange-500 mb-2">404</div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Page Not Found</h1>
      <p className="text-slate-600 max-w-md text-sm mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all shadow-md"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> View Catalog
        </Link>
      </div>
    </div>
  );
}
