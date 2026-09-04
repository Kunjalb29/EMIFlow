import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { JWT_SECRET } from '../middleware/auth.middleware';
import type { UserResponse, SavedPlanResponse } from '../types/api';

export class AuthService {
  generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  }

  async register(name: string, email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      const error = new Error('An account with this email already exists.');
      (error as any).statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    const token = this.generateToken(user.id);
    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    const normalizedEmail = email.toLowerCase().trim();

    const userWithPassword = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!userWithPassword) {
      const error = new Error('Invalid email or password.');
      (error as any).statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, userWithPassword.passwordHash);
    if (!isMatch) {
      const error = new Error('Invalid email or password.');
      (error as any).statusCode = 401;
      throw error;
    }

    const token = this.generateToken(userWithPassword.id);

    const user: UserResponse = {
      id: userWithPassword.id,
      name: userWithPassword.name,
      email: userWithPassword.email,
      avatarUrl: userWithPassword.avatarUrl,
      createdAt: userWithPassword.createdAt,
    };

    return { user, token };
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(id: string, name: string): Promise<UserResponse> {
    return prisma.user.update({
      where: { id },
      data: { name: name.trim() },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      const error = new Error('User not found.');
      (error as any).statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      const error = new Error('Current password is incorrect.');
      (error as any).statusCode = 400;
      throw error;
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { passwordHash: newHash },
    });
  }

  async getSavedPlans(userId: string): Promise<SavedPlanResponse[]> {
    const plans = await prisma.savedPlan.findMany({
      where: { userId },
      include: {
        product: {
          select: { id: true, name: true, slug: true, brand: true },
        },
        variant: {
          select: { id: true, color: true, storage: true, sellingPrice: true, cashback: true },
        },
        emiPlan: {
          select: { id: true, tenureMonths: true, monthlyAmount: true, interestRate: true, totalAmount: true, cashback: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return plans as unknown as SavedPlanResponse[];
  }

  async savePlan(userId: string, productId: string, variantId: string, emiPlanId: string): Promise<SavedPlanResponse> {
    const plan = await prisma.savedPlan.create({
      data: {
        userId,
        productId,
        variantId,
        emiPlanId,
        status: 'SUBMITTED',
      },
      include: {
        product: {
          select: { id: true, name: true, slug: true, brand: true },
        },
        variant: {
          select: { id: true, color: true, storage: true, sellingPrice: true, cashback: true },
        },
        emiPlan: {
          select: { id: true, tenureMonths: true, monthlyAmount: true, interestRate: true, totalAmount: true, cashback: true },
        },
      },
    });

    return plan as unknown as SavedPlanResponse;
  }
}

export const authService = new AuthService();
