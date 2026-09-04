import { Router } from 'express';
import {
  getAllProducts,
  getProductBySlug,
  getVariantDetail,
  getEmiPlans,
  getReviews,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);
router.get('/:slug/variants/:variantId', getVariantDetail);
router.get('/:slug/emi-plans', getEmiPlans);
router.get('/:slug/reviews', getReviews);

export default router;
