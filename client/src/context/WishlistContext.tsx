import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import type { ProductListItem, WishlistItem } from '../types/product';

interface WishlistContextType {
  items: WishlistItem[];
  count: number;
  loading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: ProductListItem) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const GUEST_STORAGE_KEY = 'emiflow_guest_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist whenever auth state changes
  const loadWishlist = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        // Authenticated user: fetch from PostgreSQL
        const serverWishlist = await api.getWishlist();
        setItems(serverWishlist);
      } else {
        // Guest user: load from localStorage
        const stored = localStorage.getItem(GUEST_STORAGE_KEY);
        if (stored) {
          try {
            setItems(JSON.parse(stored));
          } catch {
            setItems([]);
          }
        } else {
          setItems([]);
        }
      }
    } catch (err) {
      console.warn('Failed to load wishlist:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  // Check if product is currently in wishlist
  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((item) => item.product.id === productId);
    },
    [items]
  );

  // Toggle wishlist state
  const toggleWishlist = async (product: ProductListItem): Promise<boolean> => {
    const exists = isInWishlist(product.id);

    if (exists) {
      await removeFromWishlist(product.id);
      return false;
    } else {
      const newItem: WishlistItem = {
        wishlistId: `temp_${Date.now()}`,
        addedAt: new Date().toISOString(),
        product,
      };

      if (user) {
        // Optimistic update
        setItems((prev) => [newItem, ...prev]);
        try {
          await api.addToWishlist(product.id);
        } catch (err) {
          console.error('Failed to add to server wishlist:', err);
          // Revert if failed
          setItems((prev) => prev.filter((i) => i.product.id !== product.id));
          throw err;
        }
      } else {
        // Guest storage
        const updated = [newItem, ...items];
        setItems(updated);
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
      }
      return true;
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId: string): Promise<void> => {
    if (user) {
      const previous = [...items];
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      try {
        await api.removeFromWishlist(productId);
      } catch (err) {
        console.error('Failed to remove from server wishlist:', err);
        setItems(previous);
        throw err;
      }
    } else {
      const updated = items.filter((item) => item.product.id !== productId);
      setItems(updated);
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        loading,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        refreshWishlist: loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
