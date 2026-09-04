import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Sparkles, Menu, X, User as UserIcon, LogOut, ChevronDown, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const openAiAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-emiflow-ai'));
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <span className="text-white font-black text-sm tracking-tight">E</span>
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              EMI<span className="text-orange-600">Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/products"
              className={`text-sm font-semibold transition-colors ${
                isActive('/products') ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              Products
            </Link>
            <Link
              to="/how-it-works"
              className={`text-sm font-semibold transition-colors ${
                isActive('/how-it-works') ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors ${
                isActive('/about') ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right Section: AI Assistant, Search & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <Link
              to="/products"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Search catalog"
              title="Search Catalog"
            >
              <Search size={19} />
            </Link>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={openAiAssistant}
              className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Ask AI</span>
            </button>

            {/* Auth State */}
            {user ? (
              <div className="relative ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80"
                  aria-label="User menu"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover border border-orange-500"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                      {initials}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" /> Profile
                      </Link>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Smartphone className="w-4 h-4 text-slate-400" /> My Applications
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={openAiAssistant}
              className="p-2 text-orange-600 bg-orange-50 rounded-lg"
              aria-label="Ask AI"
            >
              <Sparkles size={18} />
            </button>
            <button
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <Link
              to="/products"
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
            >
              Products Catalog
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
            >
              About EMIFlow
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  My Profile & Applications
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 text-center font-bold text-xs hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full py-2.5 rounded-xl bg-orange-500 text-white text-center font-bold text-xs hover:bg-orange-600 shadow-xs"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
