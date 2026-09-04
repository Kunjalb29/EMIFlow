import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/product.routes';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import assistantRoutes from './routes/assistant.routes';
import { notFoundHandler, errorHandler } from './middleware/error.middleware';

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Body and Cookie parsing
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/assistant', assistantRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
