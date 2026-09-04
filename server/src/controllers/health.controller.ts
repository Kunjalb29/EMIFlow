import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export async function healthCheck(_req: Request, res: Response) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
      },
    });
  } catch {
    res.status(503).json({
      success: false,
      error: 'Service unavailable',
      data: {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
      },
    });
  }
}
