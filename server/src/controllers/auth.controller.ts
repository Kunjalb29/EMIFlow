import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { COOKIE_NAME, AuthRequest } from '../middleware/auth.middleware';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Full name is required.' });
      return;
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      res.status(400).json({ success: false, error: 'A valid email address is required.' });
      return;
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      res.status(400).json({ success: false, error: 'Password must be at least 8 characters long.' });
      return;
    }

    const { user, token } = await authService.register(name, email, password);

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.status(201).json({
      success: true,
      data: { user, token },
      message: 'Account created successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required.' });
      return;
    }

    const { user, token } = await authService.login(email, password);

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.status(200).json({
      success: true,
      data: { user, token },
      message: 'Signed in successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ success: true, message: 'Signed out successfully.' });
}

export async function getMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Not authenticated.' });
    return;
  }
  res.json({ success: true, data: req.user });
}

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated.' });
      return;
    }

    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Name cannot be empty.' });
      return;
    }

    const updated = await authService.updateProfile(req.user.id, name);
    res.json({ success: true, data: updated, message: 'Profile updated successfully.' });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated.' });
      return;
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, error: 'Current password and new password are required.' });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({ success: false, error: 'New password must be at least 8 characters long.' });
      return;
    }

    await authService.changePassword(req.user.id, currentPassword, newPassword);
    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    next(error);
  }
}

export async function getSavedPlans(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated.' });
      return;
    }

    const plans = await authService.getSavedPlans(req.user.id);
    res.json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
}

export async function savePlan(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated.' });
      return;
    }

    const { productId, variantId, emiPlanId } = req.body;
    if (!productId || !variantId || !emiPlanId) {
      res.status(400).json({ success: false, error: 'Product ID, variant ID, and EMI plan ID are required.' });
      return;
    }

    const plan = await authService.savePlan(req.user.id, productId, variantId, emiPlanId);
    res.status(201).json({ success: true, data: plan, message: 'EMI application submitted successfully.' });
  } catch (error) {
    next(error);
  }
}
