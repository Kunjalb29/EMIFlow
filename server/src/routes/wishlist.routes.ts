import { Router } from 'express';
import wishlistController from '../controllers/wishlist.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All wishlist routes require authentication
router.use(authenticate);

router.get('/', (req, res) => wishlistController.getWishlist(req, res));
router.get('/ids', (req, res) => wishlistController.getWishlistIds(req, res));
router.post('/:productId', (req, res) => wishlistController.addToWishlist(req, res));
router.delete('/:productId', (req, res) => wishlistController.removeFromWishlist(req, res));

export default router;
