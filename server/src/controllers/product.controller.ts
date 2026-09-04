import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';

export async function getAllProducts(_req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productService.getAllProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}

export async function getProductBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const variantId = typeof req.query.variantId === 'string' ? req.query.variantId : undefined;

    const product = await productService.getProductBySlug(slug, variantId);

    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

export async function getVariantDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const variantId = req.params.variantId as string;

    const result = await productService.getVariantDetail(slug, variantId);

    if (!result) {
      res.status(404).json({ success: false, error: 'Variant not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getEmiPlans(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;
    const variantId = typeof req.query.variantId === 'string' ? req.query.variantId : undefined;

    const plans = await productService.getEmiPlans(slug, variantId);

    if (!plans) {
      res.status(404).json({ success: false, error: 'Product or variant not found' });
      return;
    }

    res.json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
}

export async function getReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = req.params.slug as string;

    const reviews = await productService.getReviews(slug);

    if (!reviews) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
}
