import { Link } from 'react-router-dom';
import { Search, HelpCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-navy">
              EMI<span className="text-primary">Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/products"
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              Products
            </Link>
            <span className="text-sm font-medium text-text-secondary hover:text-primary transition-colors cursor-pointer">
              How it Works
            </span>
            <span className="text-sm font-medium text-text-secondary hover:text-primary transition-colors cursor-pointer">
              About
            </span>
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/products"
              className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <span className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors cursor-pointer">
              How it Works
            </span>
            <span className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors cursor-pointer">
              About
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
