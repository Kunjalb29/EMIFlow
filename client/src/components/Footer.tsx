import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-xs text-white">
                E
              </div>
              <span className="text-lg font-black tracking-tight">
                EMI<span className="text-orange-400">Flow</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed">
              Flexible smartphone shopping with transparent EMI terms and instant cashback. Empowering informed device financing decisions.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider mb-4 text-slate-300">Explore</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/products" className="hover:text-orange-400 transition-colors">
                  Products Catalog
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-orange-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">
                  About EMIFlow
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider mb-4 text-slate-300">Account</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/login" className="hover:text-orange-400 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-orange-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-orange-400 transition-colors">
                  My Profile & Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Demo Notice */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider mb-4 text-slate-300">Platform Notice</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              EMIFlow is an educational portfolio project. Financial calculations and EMI options are simulated for demonstration.
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-slate-800 text-[10px] text-orange-300 font-mono">
              STATUS: DEMO READY
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EMIFlow. Demo project for portfolio demonstration.</p>
          <div className="flex gap-6">
            <Link to="/how-it-works" className="hover:text-slate-400 transition-colors">
              Financing FAQ
            </Link>
            <Link to="/about" className="hover:text-slate-400 transition-colors">
              Tech Stack
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
