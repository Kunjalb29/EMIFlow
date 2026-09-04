import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">
                EMI<span className="text-primary">Flow</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Buy the latest smartphones on affordable EMI plans backed by mutual funds.
              Transparent pricing, zero hidden charges.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/products" className="text-sm text-white/50 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <span className="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer">
                  How it Works
                </span>
              </li>
              <li>
                <span className="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer">
                  FAQ
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} EMIFlow. Demo project for educational purposes only.
          </p>
          <p className="text-xs text-white/40">
            Pricing & EMI data shown is for demonstration only.
          </p>
        </div>
      </div>
    </footer>
  );
}
