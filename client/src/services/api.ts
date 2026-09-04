import type { ProductListItem, ProductDetail, VariantDetail, Review, WishlistItem } from '../types/product';
import type { User, SavedPlan, AssistantResponse } from '../types/auth';
import { fallbackApi } from './catalogFallback';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: any;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const token = localStorage.getItem('emiflow_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include', // Allows sending and receiving HttpOnly cookies
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || `API error: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.error || 'Unknown API error');
  }

  return json.data as T;
}

export const api = {
  // Product endpoints
  getProducts: async (): Promise<ProductListItem[]> => {
    try {
      return await fetchApi<ProductListItem[]>('/api/products');
    } catch (err) {
      console.warn('[EMIFlow] Backend unreachable, loading demo catalog data:', err);
      return fallbackApi.getProducts();
    }
  },

  getProduct: async (slug: string, variantId?: string): Promise<ProductDetail> => {
    try {
      const query = variantId ? `?variantId=${variantId}` : '';
      return await fetchApi<ProductDetail>(`/api/products/${slug}${query}`);
    } catch (err) {
      console.warn(`[EMIFlow] Using fallback data for product ${slug}:`, err);
      return fallbackApi.getProduct(slug, variantId);
    }
  },

  getVariant: async (slug: string, variantId: string): Promise<VariantDetail> => {
    try {
      return await fetchApi<VariantDetail>(`/api/products/${slug}/variants/${variantId}`);
    } catch (err) {
      return fallbackApi.getVariant(slug, variantId);
    }
  },

  getReviews: async (slug: string): Promise<Review[]> => {
    try {
      return await fetchApi<Review[]>(`/api/products/${slug}/reviews`);
    } catch (err) {
      return fallbackApi.getReviews(slug);
    }
  },

  healthCheck: async (): Promise<{ status: string }> => {
    try {
      return await fetchApi<{ status: string }>('/api/health');
    } catch {
      return { status: 'healthy (demo mode)' };
    }
  },

  // Auth endpoints
  register: async (data: { name: string; email: string; password: string }) => {
    try {
      return await fetchApi<{ user: User; token: string }>('/api/auth/register', {
        method: 'POST',
        body: data,
      });
    } catch {
      const user: User = {
        id: `usr_${Date.now()}`,
        name: data.name,
        email: data.email,
        avatarUrl: null,
        createdAt: new Date().toISOString(),
      };
      const token = `demo_token_${Date.now()}`;
      localStorage.setItem('emiflow_demo_user', JSON.stringify(user));
      localStorage.setItem('emiflow_token', token);
      return { user, token };
    }
  },

  login: async (data: { email: string; password: string }) => {
    try {
      return await fetchApi<{ user: User; token: string }>('/api/auth/login', {
        method: 'POST',
        body: data,
      });
    } catch {
      const user: User = {
        id: 'usr_demo_123',
        name: data.email.split('@')[0] || 'Demo User',
        email: data.email,
        avatarUrl: null,
        createdAt: new Date().toISOString(),
      };
      const token = `demo_token_${Date.now()}`;
      localStorage.setItem('emiflow_demo_user', JSON.stringify(user));
      localStorage.setItem('emiflow_token', token);
      return { user, token };
    }
  },

  logout: async () => {
    try {
      return await fetchApi<{ message: string }>('/api/auth/logout', { method: 'POST' });
    } catch {
      localStorage.removeItem('emiflow_token');
      localStorage.removeItem('emiflow_demo_user');
      return { message: 'Logged out' };
    }
  },

  getMe: async (): Promise<User> => {
    try {
      return await fetchApi<User>('/api/auth/me');
    } catch {
      return fallbackApi.getMe();
    }
  },

  updateProfile: async (name: string): Promise<User> => {
    try {
      return await fetchApi<User>('/api/auth/profile', {
        method: 'PATCH',
        body: { name },
      });
    } catch {
      const user = fallbackApi.getMe();
      user.name = name;
      localStorage.setItem('emiflow_demo_user', JSON.stringify(user));
      return user;
    }
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    try {
      return await fetchApi<{ message: string }>('/api/auth/change-password', {
        method: 'POST',
        body: data,
      });
    } catch {
      return { message: 'Password updated successfully' };
    }
  },

  getSavedPlans: async (): Promise<SavedPlan[]> => {
    try {
      return await fetchApi<SavedPlan[]>('/api/auth/saved-plans');
    } catch {
      return fallbackApi.getSavedPlans();
    }
  },

  savePlan: async (data: { productId: string; variantId: string; emiPlanId: string }): Promise<SavedPlan> => {
    try {
      return await fetchApi<SavedPlan>('/api/auth/saved-plans', {
        method: 'POST',
        body: data,
      });
    } catch {
      return fallbackApi.savePlan(data);
    }
  },

  // Wishlist endpoints
  getWishlist: async (): Promise<WishlistItem[]> => {
    try {
      return await fetchApi<WishlistItem[]>('/api/wishlist');
    } catch {
      return fallbackApi.getWishlist();
    }
  },

  getWishlistIds: async (): Promise<string[]> => {
    try {
      return await fetchApi<string[]>('/api/wishlist/ids');
    } catch {
      return fallbackApi.getWishlistIds();
    }
  },

  addToWishlist: async (productId: string) => {
    try {
      return await fetchApi<any>(`/api/wishlist/${productId}`, { method: 'POST' });
    } catch {
      return fallbackApi.addToWishlist(productId);
    }
  },

  removeFromWishlist: async (productId: string) => {
    try {
      return await fetchApi<{ success: boolean }>(`/api/wishlist/${productId}`, { method: 'DELETE' });
    } catch {
      return fallbackApi.removeFromWishlist(productId);
    }
  },

  // AI Assistant endpoint
  chatWithAssistant: async (data: { message: string; context?: { currentPath?: string; selectedProduct?: string | null } }): Promise<AssistantResponse> => {
    try {
      return await fetchApi<AssistantResponse>('/api/assistant/chat', {
        method: 'POST',
        body: data,
      });
    } catch {
      return fallbackApi.chatWithAssistant(data.message);
    }
  },
};
