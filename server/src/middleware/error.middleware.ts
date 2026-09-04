import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('❌ Server error:', err.message);

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
}
