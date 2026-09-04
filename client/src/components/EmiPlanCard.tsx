import { Check, Award, Tag } from 'lucide-react';
import { formatPrice } from '../utils/format';
import type { EmiPlan } from '../types/product';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export default function EmiPlanCard({ plan, isSelected, onSelect }: EmiPlanCardProps) {
  const isZeroInterest = plan.interestRate === 0;

  return (
    <button
      onClick={onSelect}
      className={`relative w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-250 group ${
        isSelected
          ? 'border-primary bg-primary-light/50 shadow-md ring-1 ring-primary/20'
          : 'border-border bg-white hover:border-primary/30 hover:shadow-sm'
      }`}
      aria-pressed={isSelected}
      aria-label={`${formatPrice(plan.monthlyAmount)} per month for ${plan.tenureMonths} months${
        isZeroInterest ? ' at 0% interest' : ` at ${plan.interestRate}% interest`
      }`}
    >
      {/* Badges row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {plan.isPopular && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wide">
            <Award size={12} />
            Recommended
          </span>
        )}
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
            isZeroInterest
              ? 'text-success bg-success-light'
              : 'text-text-secondary bg-gray-100'
          }`}
        >
          {isZeroInterest ? '0% Interest' : `${plan.interestRate}% Interest`}
        </span>
      </div>

      {/* Amount & Tenure */}
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <span className={`text-xl sm:text-2xl font-bold ${isSelected ? 'text-primary-dark' : 'text-text-primary'}`}>
            {formatPrice(plan.monthlyAmount)}
          </span>
          <span className="text-sm text-text-secondary font-medium">/month</span>
        </div>
        <span className="text-sm font-semibold text-text-secondary bg-gray-100 px-3 py-1 rounded-lg">
          {plan.tenureMonths} months
        </span>
      </div>

      {/* Details row */}
      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs text-text-muted">
          Total: {formatPrice(plan.totalAmount)}
          {plan.processingFee > 0 && ` + ${formatPrice(plan.processingFee)} fee`}
        </span>
        {plan.cashback > 0 && (
          <span className="flex items-center gap-1 text-xs font-semibold text-success">
            <Tag size={12} />
            +{formatPrice(plan.cashback)} cashback
          </span>
        )}
      </div>

      {/* Selected checkmark */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-sm">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}
