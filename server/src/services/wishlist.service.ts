import prisma from '../utils/prisma';
import type { ProductListItem } from '../types/api';

export interface WishlistItemResponse {
  wishlistId: string;
  addedAt: string;
  product: ProductListItem;
}

export class WishlistService {
  async getUserWishlist(userId: string): Promise<WishlistItemResponse[]> {
    const records = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: {
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
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return records.map((record) => {
      const { product } = record;
      const cheapestVariant = product.variants[0];
      const highestMrp = Math.max(...product.variants.map((v) => v.mrp), 0);
      const highestCashback = Math.max(...product.variants.map((v) => v.cashback), 0);
      const colors = [...new Set(product.variants.map((v) => v.color))];
      const firstImage = product.variants.find((v) => v.images.length > 0)?.images[0];

      return {
        wishlistId: record.id,
        addedAt: record.createdAt.toISOString(),
        product: {
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
        },
      };
    });
  }

  async getWishlistProductIds(userId: string): Promise<string[]> {
    const items = await prisma.wishlist.findMany({
      where: { userId },
      select: { productId: true },
    });
    return items.map((i) => i.productId);
  }

  async addToWishlist(userId: string, productId: string) {
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const item = await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {},
      create: {
        userId,
        productId,
      },
    });

    return item;
  }

  async removeFromWishlist(userId: string, productId: string) {
    try {
      await prisma.wishlist.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
      return { success: true };
    } catch {
      // Record might not exist, consider it removed
      return { success: true };
    }
  }
}

export default new WishlistService();
