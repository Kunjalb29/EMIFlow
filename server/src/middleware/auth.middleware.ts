import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

export const JWT_SECRET = process.env.JWT_SECRET || 'emiflow_jwt_secret_dev_key_2026_secured';
export const COOKIE_NAME = 'emiflow_token';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
}

export function extractToken(req: Request): string | null {
  // Check HttpOnly cookie first
  if (req.cookies && req.cookies[COOKIE_NAME]) {
    return req.cookies[COOKIE_NAME];
  }
  // Check Authorization header (Bearer <token>)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(401).json({ success: false, error: 'Authentication required. Please sign in.' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      res.status(401).json({ success: false, error: 'User account no longer exists.' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid or expired session. Please sign in again.' });
  }
}

export async function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    const token = extractToken(req);
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      });
      if (user) {
        req.user = user;
      }
    }
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
}
