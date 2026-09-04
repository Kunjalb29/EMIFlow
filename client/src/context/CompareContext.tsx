import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ProductListItem } from '../types/product';

interface CompareContextType {
  compareProducts: ProductListItem[];
  count: number;
  addToCompare: (product: ProductListItem) => { success: boolean; message?: string };
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = 'emiflow_compare_items';
const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareProducts, setCompareProducts] = useState<ProductListItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareProducts));
    } catch (e) {
      console.warn('Failed to persist compare items:', e);
    }
  }, [compareProducts]);

  const isInCompare = useCallback(
    (productId: string) => {
      return compareProducts.some((p) => p.id === productId);
    },
    [compareProducts]
  );

  const addToCompare = useCallback(
    (product: ProductListItem): { success: boolean; message?: string } => {
      if (compareProducts.some((p) => p.id === product.id)) {
        return { success: false, message: 'Smartphone is already in comparison list' };
      }
      if (compareProducts.length >= MAX_COMPARE) {
        return {
          success: false,
          message: `You can compare a maximum of ${MAX_COMPARE} smartphones at once`,
        };
      }

      setCompareProducts((prev) => [...prev, product]);
      return { success: true };
    },
    [compareProducts]
  );

  const removeFromCompare = useCallback((productId: string) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareProducts([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        compareProducts,
        count: compareProducts.length,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
