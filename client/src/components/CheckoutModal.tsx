import { X, Tag, ArrowRight, Shield, Check } from 'lucide-react';
import { formatPrice } from '../utils/format';
import type { Product, Variant, EmiPlan } from '../types/product';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variant: Variant;
  plan: EmiPlan;
}

export default function CheckoutModal({ isOpen, onClose, product, variant, plan }: CheckoutModalProps) {
  if (!isOpen) return null;

  const isZeroInterest = plan.interestRate === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 animate-overlay"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-text-primary">Order Summary</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-surface rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Product Info */}
          <div className="flex items-start gap-4 bg-surface rounded-xl p-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shrink-0">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{product.brand.charAt(0)}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{product.name}</h3>
              <p className="text-sm text-text-secondary mt-0.5">
                {variant.color} · {variant.storage}
              </p>
              <p className="text-xs text-text-muted mt-1">SKU: {variant.sku}</p>
            </div>
          </div>

          {/* Selected Plan */}
          <div className="bg-primary-light/30 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-semibold text-primary-dark">Selected EMI Plan</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-text-muted block text-xs">Monthly EMI</span>
                <span className="font-bold text-text-primary text-lg">
                  {formatPrice(plan.monthlyAmount)}
                </span>
              </div>
              <div>
                <span className="text-text-muted block text-xs">Tenure</span>
                <span className="font-semibold text-text-primary">{plan.tenureMonths} months</span>
              </div>
              <div>
                <span className="text-text-muted block text-xs">Interest</span>
                <span className={`font-semibold ${isZeroInterest ? 'text-success' : 'text-text-primary'}`}>
                  {isZeroInterest ? '0% interest' : `${plan.interestRate}% p.a.`}
                </span>
              </div>
              <div>
                <span className="text-text-muted block text-xs">Total Payable</span>
                <span className="font-semibold text-text-primary">
                  {formatPrice(plan.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Cashback */}
          {plan.cashback > 0 && (
            <div className="flex items-center gap-3 bg-success-light rounded-xl p-3">
              <Tag size={18} className="text-success shrink-0" />
              <div>
                <span className="text-sm font-semibold text-success">
                  +{formatPrice(plan.cashback)} cashback
                </span>
                <span className="text-xs text-text-muted block">
                  Will be credited to your wallet after EMI completion
                </span>
              </div>
            </div>
          )}

          {/* Processing Fee */}
          {plan.processingFee > 0 && (
            <div className="text-xs text-text-muted bg-surface rounded-lg p-3">
              Processing fee: {formatPrice(plan.processingFee)} (one-time, non-refundable)
            </div>
          )}

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-text-muted">
            <Shield size={16} />
            <span className="text-xs">
              Your payment info is encrypted and secured. Demo purposes only.
            </span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-border sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            Continue
            <ArrowRight size={18} />
          </button>
          <p className="text-[10px] text-text-muted text-center mt-3">
            This is a demo checkout. No real payment will be processed.
          </p>
        </div>
      </div>
    </div>
  );
}
