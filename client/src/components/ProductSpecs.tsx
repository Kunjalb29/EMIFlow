import { titleCase } from '../utils/format';

interface ProductSpecsProps {
  specs: Record<string, string> | null;
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-text-primary mb-6">Product Specifications</h2>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {Object.entries(specs).map(([key, value], index) => (
            <div
              key={key}
              className={`flex items-start gap-4 px-5 py-4 ${
                index % 2 === 0 ? 'bg-white' : 'bg-surface/50'
              } border-b border-border last:border-b-0`}
            >
              <span className="text-sm text-text-secondary font-medium min-w-[120px] shrink-0">
                {titleCase(key.replace(/([A-Z])/g, ' $1').trim())}
              </span>
              <span className="text-sm font-semibold text-text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
