import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { ProductDetail, Variant, EmiPlan } from '../types/product';

export function useProduct(slug: string | undefined, initialVariantId?: string) {
  const [data, setData] = useState<ProductDetail | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [variantLoading, setVariantLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const fetchProduct = useCallback(async (vId?: string) => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const detail = await api.getProduct(slug, vId);
      setData(detail);
      setSelectedVariant(detail.selectedVariant);
      // Select popular plan by default, or first plan
      const popular = detail.emiPlans.find((p) => p.isPopular) || detail.emiPlans[0] || null;
      setSelectedPlan(popular);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct(initialVariantId);
  }, [fetchProduct, initialVariantId]);

  const selectVariant = useCallback(async (variant: Variant) => {
    if (!slug || variant.id === selectedVariant?.id) return;
    try {
      setVariantLoading(true);
      setSelectedVariant(variant);
      const variantDetail = await api.getVariant(slug, variant.id);
      setData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          selectedVariant: variantDetail.variant,
          images: variantDetail.images,
          emiPlans: variantDetail.emiPlans,
        };
      });
      // Retain similar tenure or default to popular/first
      setSelectedPlan((prevPlan) => {
        if (!prevPlan) {
          return variantDetail.emiPlans.find((p) => p.isPopular) || variantDetail.emiPlans[0] || null;
        }
        const matchingTenure = variantDetail.emiPlans.find((p) => p.tenureMonths === prevPlan.tenureMonths);
        return matchingTenure || variantDetail.emiPlans.find((p) => p.isPopular) || variantDetail.emiPlans[0] || null;
      });
    } catch (err: unknown) {
      console.error('Failed to switch variant:', err);
    } finally {
      setVariantLoading(false);
    }
  }, [slug, selectedVariant]);

  return {
    product: data?.product ?? null,
    variants: data?.variants ?? [],
    selectedVariant,
    images: data?.images ?? [],
    emiPlans: data?.emiPlans ?? [],
    selectedPlan,
    setSelectedPlan,
    selectVariant,
    loading,
    variantLoading,
    error,
    isCheckoutOpen,
    setIsCheckoutOpen,
    refetch: () => fetchProduct(selectedVariant?.id),
  };
}
