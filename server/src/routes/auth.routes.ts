import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  getSavedPlans,
  savePlan,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', authenticate, getMe);
router.get('/profile', authenticate, getMe);
router.patch('/profile', authenticate, updateProfile);
router.post('/change-password', authenticate, changePassword);
router.get('/saved-plans', authenticate, getSavedPlans);
router.post('/saved-plans', authenticate, savePlan);

export default router;
