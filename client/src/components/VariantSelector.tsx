import type { Variant } from '../types/product';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  onSelect: (variant: Variant) => void;
}

export default function VariantSelector({ variants, selectedVariant, onSelect }: VariantSelectorProps) {
  // Get unique colors and storages
  const colors = [...new Map(variants.map((v) => [v.color, v])).values()];
  const storages = [...new Set(variants.map((v) => v.storage))];

  const handleColorSelect = (color: string) => {
    // Find variant matching selected storage + new color, fallback to first with that color
    const match =
      variants.find((v) => v.color === color && v.storage === selectedVariant.storage) ||
      variants.find((v) => v.color === color);
    if (match) onSelect(match);
  };

  const handleStorageSelect = (storage: string) => {
    // Find variant matching selected color + new storage, fallback to first with that storage
    const match =
      variants.find((v) => v.storage === storage && v.color === selectedVariant.color) ||
      variants.find((v) => v.storage === storage);
    if (match) onSelect(match);
  };

  return (
    <div className="space-y-5">
      {/* Color Selector */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-text-secondary">Color</span>
          <span className="text-sm font-semibold text-text-primary">{selectedVariant.color}</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((v) => {
            const isSelected = v.color === selectedVariant.color;
            return (
              <button
                key={v.color}
                onClick={() => handleColorSelect(v.color)}
                className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary-light shadow-sm'
                    : 'border-border hover:border-primary/40 bg-white hover:bg-gray-50'
                }`}
                aria-label={`Select ${v.color} color`}
                aria-pressed={isSelected}
              >
                <span
                  className="w-5 h-5 rounded-full border border-gray-200 shadow-inner shrink-0"
                  style={{ backgroundColor: v.colorHex }}
                />
                <span
                  className={`text-sm font-medium ${
                    isSelected ? 'text-primary-dark' : 'text-text-primary'
                  }`}
                >
                  {v.color}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Selector */}
      {storages.length > 1 && (
        <div>
          <span className="text-sm font-medium text-text-secondary mb-3 block">Storage</span>
          <div className="flex flex-wrap gap-2.5">
            {storages.map((storage) => {
              const isSelected = storage === selectedVariant.storage;
              const isAvailable = variants.some(
                (v) => v.storage === storage && v.color === selectedVariant.color
              );
              return (
                <button
                  key={storage}
                  onClick={() => handleStorageSelect(storage)}
                  disabled={!isAvailable}
                  className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary-light text-primary-dark shadow-sm'
                      : isAvailable
                      ? 'border-border text-text-primary hover:border-primary/40 bg-white hover:bg-gray-50'
                      : 'border-gray-100 text-text-muted bg-gray-50 cursor-not-allowed opacity-50'
                  }`}
                  aria-label={`Select ${storage} storage`}
                  aria-pressed={isSelected}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
