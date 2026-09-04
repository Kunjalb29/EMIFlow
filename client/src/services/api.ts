const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);

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

import type { ProductListItem, ProductDetail, VariantDetail, Review } from '../types/product';

export const api = {
  getProducts: () => fetchApi<ProductListItem[]>('/api/products'),
  getProduct: (slug: string, variantId?: string) => {
    const query = variantId ? `?variantId=${variantId}` : '';
    return fetchApi<ProductDetail>(`/api/products/${slug}${query}`);
  },
  getVariant: (slug: string, variantId: string) =>
    fetchApi<VariantDetail>(`/api/products/${slug}/variants/${variantId}`),
  getReviews: (slug: string) => fetchApi<Review[]>(`/api/products/${slug}/reviews`),
  healthCheck: () => fetchApi<{ status: string }>('/api/health'),
};
