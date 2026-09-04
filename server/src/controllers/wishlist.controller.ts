import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import wishlistService from '../services/wishlist.service';

export class WishlistController {
  async getWishlist(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const items = await wishlistService.getUserWishlist(userId);
      res.json({ success: true, data: items });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Failed to fetch wishlist' });
    }
  }

  async getWishlistIds(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const ids = await wishlistService.getWishlistProductIds(userId);
      res.json({ success: true, data: ids });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message || 'Failed to fetch wishlist IDs' });
    }
  }

  async addToWishlist(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const productId = req.params.productId as string;
      if (!productId) {
        res.status(400).json({ success: false, error: 'Product ID is required' });
        return;
      }
      const item = await wishlistService.addToWishlist(userId, productId);
      res.status(201).json({ success: true, data: item, message: 'Added to wishlist' });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || 'Failed to add to wishlist' });
    }
  }

  async removeFromWishlist(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const productId = req.params.productId as string;
      if (!productId) {
        res.status(400).json({ success: false, error: 'Product ID is required' });
        return;
      }
      await wishlistService.removeFromWishlist(userId, productId);
      res.json({ success: true, message: 'Removed from wishlist' });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || 'Failed to remove from wishlist' });
    }
  }
}

export default new WishlistController();
