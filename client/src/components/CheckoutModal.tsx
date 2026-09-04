import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { X, Tag, ArrowRight, Shield, Check, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatPrice } from '../utils/format';
import type { Product, Variant, EmiPlan } from '../types/product';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variant: Variant;
  plan: EmiPlan;
}

export default function CheckoutModal({ isOpen, onClose, product, variant, plan }: CheckoutModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isZeroInterest = plan.interestRate === 0;

  const handleSignInRedirect = (path: string) => {
    // Preserve full current URL including variant ID in search params so the exact variant & plan remain selected!
    navigate(path, {
      state: {
        from: {
          pathname: location.pathname,
          search: `?variantId=${variant.id}`,
        },
      },
    });
  };

  const handleSubmitApplication = async () => {
    if (!user) {
      handleSignInRedirect('/login');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await api.savePlan({
        productId: product.id,
        variantId: variant.id,
        emiPlanId: plan.id,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md rounded-t-3xl z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {submitted ? 'Application Confirmed' : 'EMI Financing Summary'}
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-700">
              Step 4 of 4
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Confirmation State */}
        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Application Approved!</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
                Your <strong>{plan.tenureMonths}-month EMI plan</strong> for the <strong>{product.name} ({variant.color}, {variant.storage})</strong> has been saved directly to your account.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-800">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Commitment:</span>
                <span className="font-bold text-orange-600">{formatPrice(plan.monthlyAmount)} / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Payable:</span>
                <span className="font-bold text-slate-800">{formatPrice(plan.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">Approved (Demo Mode)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/profile"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>View in My Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Normal Order Summary Content */
          <div className="p-5 sm:p-6 space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Product Info */}
            <div className="flex items-start gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-slate-200/80 shadow-2xs shrink-0">
                <span className="text-orange-600 font-black text-lg">{product.brand.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">{product.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Color: <strong>{variant.color}</strong> • Storage: <strong>{variant.storage}</strong>
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">SKU: {variant.sku}</p>
              </div>
            </div>

            {/* Selected Plan Details */}
            <div className="bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-50 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-600 stroke-[3]" /> Selected EMI Plan
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-orange-700 border border-orange-200">
                  {plan.tenureMonths} Months
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Monthly Payment</span>
                  <span className="font-black text-slate-900 text-lg">
                    {formatPrice(plan.monthlyAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Annual Interest</span>
                  <span className={`font-bold text-sm ${isZeroInterest ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {isZeroInterest ? '0% No-Cost EMI' : `${plan.interestRate}% p.a.`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Processing Fee</span>
                  <span className="font-semibold text-slate-800">
                    {plan.processingFee === 0 ? '₹0 (Waived)' : formatPrice(plan.processingFee)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Total Net Payout</span>
                  <span className="font-extrabold text-slate-900">
                    {formatPrice(plan.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Cashback Notification */}
            {plan.cashback > 0 && (
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900">
                <Tag size={16} className="text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-800">
                    Instant {formatPrice(plan.cashback)} Cashback
                  </span>
                  <span className="text-emerald-600 block text-[11px]">
                    Credited directly to your EMIFlow wallet on plan activation
                  </span>
                </div>
              </div>
            )}

            {/* Security Guarantee */}
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <Shield size={14} className="text-slate-400 shrink-0" />
              <span>256-bit encrypted paperless verification • No physical paperwork</span>
            </div>

            {/* Conditional Action: Authenticated vs Guest */}
            {user ? (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 group"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit EMI Application</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2.5">
                  Instant decision simulation. No credit score impact.
                </p>
              </div>
            ) : (
              <div className="pt-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-3">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800">
                  <Lock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Sign in to complete your application</span>
                </div>
                <p className="text-xs text-slate-500">
                  Your selected device, configuration, and {plan.tenureMonths}-month EMI plan will be automatically preserved!
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSignInRedirect('/login')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs"
                  >
                    Sign In to Continue
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSignInRedirect('/signup')}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
