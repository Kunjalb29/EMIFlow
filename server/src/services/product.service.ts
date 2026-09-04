import prisma from '../utils/prisma';
import type { ProductListItem, ProductDetail, VariantInfo, ImageInfo, EmiPlanInfo, ReviewInfo } from '../types/api';

export class ProductService {
  async getAllProducts(): Promise<ProductListItem[]> {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          include: {
            images: {
              orderBy: { sortOrder: 'asc' },
              take: 1,
            },
          },
          orderBy: { sellingPrice: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => {
      const cheapestVariant = product.variants[0];
      const highestMrp = Math.max(...product.variants.map((v) => v.mrp));
      const highestCashback = Math.max(...product.variants.map((v) => v.cashback));
      const colors = [...new Set(product.variants.map((v) => v.color))];
      const firstImage = product.variants.find((v) => v.images.length > 0)?.images[0];

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        category: product.category,
        rating: product.rating,
        reviewCount: product.reviewCount,
        startingPrice: cheapestVariant?.sellingPrice ?? 0,
        mrp: highestMrp,
        cashback: highestCashback,
        image: firstImage?.url ?? '',
        variantCount: product.variants.length,
        colors,
      };
    });
  }

  async getProductBySlug(slug: string, variantId?: string): Promise<ProductDetail | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          include: {
            images: { orderBy: { sortOrder: 'asc' } },
            emiPlans: { orderBy: { tenureMonths: 'asc' } },
          },
          orderBy: [{ isDefault: 'desc' }, { sellingPrice: 'asc' }],
        },
      },
    });

    if (!product) return null;

    const variants: VariantInfo[] = product.variants.map((v) => ({
      id: v.id,
      color: v.color,
      colorHex: v.colorHex,
      storage: v.storage,
      mrp: v.mrp,
      sellingPrice: v.sellingPrice,
      cashback: v.cashback,
      stock: v.stock,
      sku: v.sku,
      isDefault: v.isDefault,
    }));

    // Pick selected variant: by variantId param, by default flag, or first
    let selectedVariantData = variantId
      ? product.variants.find((v) => v.id === variantId)
      : product.variants.find((v) => v.isDefault) ?? product.variants[0];

    if (!selectedVariantData) selectedVariantData = product.variants[0];

    const selectedVariant: VariantInfo = {
      id: selectedVariantData.id,
      color: selectedVariantData.color,
      colorHex: selectedVariantData.colorHex,
      storage: selectedVariantData.storage,
      mrp: selectedVariantData.mrp,
      sellingPrice: selectedVariantData.sellingPrice,
      cashback: selectedVariantData.cashback,
      stock: selectedVariantData.stock,
      sku: selectedVariantData.sku,
      isDefault: selectedVariantData.isDefault,
    };

    const images: ImageInfo[] = selectedVariantData.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      sortOrder: img.sortOrder,
    }));

    const emiPlans: EmiPlanInfo[] = selectedVariantData.emiPlans.map((plan) => ({
      id: plan.id,
      tenureMonths: plan.tenureMonths,
      monthlyAmount: plan.monthlyAmount,
      interestRate: plan.interestRate,
      totalAmount: plan.totalAmount,
      cashback: plan.cashback,
      processingFee: plan.processingFee,
      isPopular: plan.isPopular,
    }));

    return {
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        category: product.category,
        description: product.description,
        rating: product.rating,
        reviewCount: product.reviewCount,
        specs: product.specs as Record<string, string> | null,
      },
      variants,
      selectedVariant,
      images,
      emiPlans,
    };
  }

  async getVariantDetail(slug: string, variantId: string) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return null;

    const variant = await prisma.variant.findFirst({
      where: { id: variantId, productId: product.id },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        emiPlans: { orderBy: { tenureMonths: 'asc' } },
      },
    });

    if (!variant) return null;

    return {
      variant: {
        id: variant.id,
        color: variant.color,
        colorHex: variant.colorHex,
        storage: variant.storage,
        mrp: variant.mrp,
        sellingPrice: variant.sellingPrice,
        cashback: variant.cashback,
        stock: variant.stock,
        sku: variant.sku,
        isDefault: variant.isDefault,
      } as VariantInfo,
      images: variant.images.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        sortOrder: img.sortOrder,
      })) as ImageInfo[],
      emiPlans: variant.emiPlans.map((plan) => ({
        id: plan.id,
        tenureMonths: plan.tenureMonths,
        monthlyAmount: plan.monthlyAmount,
        interestRate: plan.interestRate,
        totalAmount: plan.totalAmount,
        cashback: plan.cashback,
        processingFee: plan.processingFee,
        isPopular: plan.isPopular,
      })) as EmiPlanInfo[],
    };
  }

  async getEmiPlans(slug: string, variantId?: string): Promise<EmiPlanInfo[] | null> {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return null;

    const whereClause: any = {};
    if (variantId) {
      whereClause.id = variantId;
    }
    whereClause.productId = product.id;

    const variants = await prisma.variant.findMany({
      where: whereClause,
      include: {
        emiPlans: { orderBy: { tenureMonths: 'asc' } },
      },
    });

    if (variants.length === 0) return null;

    // Return EMI plans for the first matching variant (or specified variant)
    const targetVariant = variants[0];
    return targetVariant.emiPlans.map((plan) => ({
      id: plan.id,
      tenureMonths: plan.tenureMonths,
      monthlyAmount: plan.monthlyAmount,
      interestRate: plan.interestRate,
      totalAmount: plan.totalAmount,
      cashback: plan.cashback,
      processingFee: plan.processingFee,
      isPopular: plan.isPopular,
    }));
  }

  async getReviews(slug: string): Promise<ReviewInfo[] | null> {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return null;

    const reviews = await prisma.review.findMany({
      where: { productId: product.id },
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((review) => ({
      id: review.id,
      reviewerName: review.reviewerName,
      rating: review.rating,
      comment: review.comment,
      verifiedBuyer: review.verifiedBuyer,
      variantInfo: review.variantInfo,
      createdAt: review.createdAt.toISOString(),
    }));
  }
}

export const productService = new ProductService();
