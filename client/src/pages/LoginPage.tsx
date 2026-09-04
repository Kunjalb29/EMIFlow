import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine redirect destination after login
  const from = (location.state as any)?.from?.pathname || '/products';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Visual / Branding Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 group mb-8">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center font-black text-sm text-white">
                E
              </div>
              <span className="text-xl font-bold">
                EMI<span className="text-orange-400">Flow</span>
              </span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold mb-4 border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Smart Device Financing
            </span>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
              Access your personalized EMI account.
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track your submitted applications, customize your smartphone plans, and enjoy verified upfront cashback.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-slate-700/60 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant digital credit evaluation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero hidden charges on 0% No-Cost plans</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Up to ₹8,500 instant wallet cashback</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-1">
              Enter your credentials to access your account.
            </p>

            {error && (
              <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs sm:text-sm text-slate-500">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  state={{ from: location.state?.from }}
                  className="font-bold text-orange-600 hover:text-orange-700"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Quick Demo Credentials pill */}
            <div className="mt-6 bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
              <span className="text-[11px] text-slate-500 block font-medium">
                Demo Account: <strong className="text-slate-800">demo@emiflow.com</strong> • Password: <strong className="text-slate-800">Password123!</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setEmail('demo@emiflow.com');
                  setPassword('Password123!');
                }}
                className="mt-1 text-[11px] font-bold text-orange-600 hover:underline"
              >
                Auto-fill credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
