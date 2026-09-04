import { Wallet } from 'lucide-react';
import EmiPlanCard from './EmiPlanCard';
import type { EmiPlan } from '../types/product';

interface EmiPlanSelectorProps {
  plans: EmiPlan[];
  selectedPlanId: string | null;
  onSelect: (plan: EmiPlan) => void;
}

export default function EmiPlanSelector({ plans, selectedPlanId, onSelect }: EmiPlanSelectorProps) {
  if (!plans.length) return null;

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
          <Wallet size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-text-primary">Choose your EMI plan</h2>
          <p className="text-sm text-text-secondary">
            Flexible monthly payments backed by mutual funds
          </p>
        </div>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <EmiPlanCard
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onSelect={() => onSelect(plan)}
            />
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-[11px] text-text-muted leading-relaxed">
        * EMI plans shown are for demonstration purposes only. Actual EMI amounts, interest rates,
        and cashback offers may vary. Subject to approval.
      </p>
    </section>
  );
}
