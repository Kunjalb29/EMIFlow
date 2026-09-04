import type { ProductListItem, ProductDetail, VariantDetail, Review } from '../types/product';
import type { User, SavedPlan, AssistantResponse } from '../types/auth';

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
  getProducts: () => fetchApi<ProductListItem[]>('/api/products'),
  getProduct: (slug: string, variantId?: string) => {
    const query = variantId ? `?variantId=${variantId}` : '';
    return fetchApi<ProductDetail>(`/api/products/${slug}${query}`);
  },
  getVariant: (slug: string, variantId: string) =>
    fetchApi<VariantDetail>(`/api/products/${slug}/variants/${variantId}`),
  getReviews: (slug: string) => fetchApi<Review[]>(`/api/products/${slug}/reviews`),
  healthCheck: () => fetchApi<{ status: string }>('/api/health'),

  // Auth endpoints
  register: (data: { name: string; email: string; password: string }) =>
    fetchApi<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: data,
    }),
  login: (data: { email: string; password: string }) =>
    fetchApi<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: data,
    }),
  logout: () => fetchApi<{ message: string }>('/api/auth/logout', { method: 'POST' }),
  getMe: () => fetchApi<User>('/api/auth/me'),
  updateProfile: (name: string) =>
    fetchApi<User>('/api/auth/profile', {
      method: 'PATCH',
      body: { name },
    }),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    fetchApi<{ message: string }>('/api/auth/change-password', {
      method: 'POST',
      body: data,
    }),
  getSavedPlans: () => fetchApi<SavedPlan[]>('/api/auth/saved-plans'),
  savePlan: (data: { productId: string; variantId: string; emiPlanId: string }) =>
    fetchApi<SavedPlan>('/api/auth/saved-plans', {
      method: 'POST',
      body: data,
    }),

  // AI Assistant endpoint
  chatWithAssistant: (data: { message: string; context?: { currentPath?: string; selectedProduct?: string | null } }) =>
    fetchApi<AssistantResponse>('/api/assistant/chat', {
      method: 'POST',
      body: data,
    }),
};
