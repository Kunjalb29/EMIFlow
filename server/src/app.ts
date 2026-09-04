import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from './routes/product.routes';
import healthRoutes from './routes/health.routes';
import { notFoundHandler, errorHandler } from './middleware/error.middleware';

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET'],
    credentials: true,
  })
);

// Body parsing
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
