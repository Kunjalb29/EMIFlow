import { GoogleGenAI } from '@google/genai';
import prisma from '../utils/prisma';
import type { AssistantAction, AssistantChatResponse } from '../types/api';

export class AssistantService {
  private getClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim().length === 0) {
      return null;
    }
    return new GoogleGenAI({ apiKey });
  }

  async processChat(message: string, context?: { currentPath?: string; selectedProduct?: string | null }): Promise<AssistantChatResponse> {
    const query = message.trim().toLowerCase();

    // 1. Fetch live product catalog data from PostgreSQL
    const products = await prisma.product.findMany({
      include: {
        variants: {
          include: {
            emiPlans: {
              orderBy: { tenureMonths: 'asc' },
            },
          },
          orderBy: { sellingPrice: 'asc' },
        },
      },
    });

    // 2. Try Gemini API first if configured
    const ai = this.getClient();
    if (ai) {
      try {
        const catalogContext = products.map((p) => {
          const cheapest = p.variants[0];
          const colors = [...new Set(p.variants.map((v) => v.color))];
          const storages = [...new Set(p.variants.map((v) => v.storage))];
          const plans = p.variants[0]?.emiPlans || [];
          return {
            name: p.name,
            slug: p.slug,
            brand: p.brand,
            startingPrice: cheapest?.sellingPrice,
            mrp: cheapest?.mrp,
            cashback: cheapest?.cashback,
            colors,
            storages,
            sampleEmiPlans: plans.map((plan) => ({
              tenureMonths: plan.tenureMonths,
              monthlyAmount: plan.monthlyAmount,
              interestRate: plan.interestRate,
              isPopular: plan.isPopular,
            })),
          };
        });

        const systemPrompt = `You are EMIFlow Assistant, a helpful shopping, navigation, and financing guide for EMIFlow.
You help users discover products, understand EMI plans, and navigate the application.
ONLY use the following live product catalog from our database:
${JSON.stringify(catalogContext, null, 2)}

Rules:
1. Never invent products, prices, interest rates, or specifications.
2. For financial calculations or advice: state clearly that displayed EMI terms are based on available demo plans.
3. When the user wants to view a product, navigate, or filter, return structured actions.
Available application paths:
- /products
- /products?brand=Apple
- /products?brand=Samsung
- /products?brand=OnePlus
- /product/iphone-17-pro
- /product/samsung-galaxy-s25-ultra
- /product/oneplus-13
- /how-it-works
- /about
- /profile
- /login
- /signup

Respond ONLY with valid JSON in this exact structure:
{
  "message": "Friendly markdown formatted message answering the question.",
  "actions": [
    {
      "type": "navigate",
      "label": "Button Label",
      "path": "/target-path"
    }
  ]
}`;

        const userPrompt = `User current page: ${context?.currentPath || '/'}.
User selected product: ${context?.selectedProduct || 'None'}.
User message: "${message}".

Generate a helpful response and navigation actions:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\n${userPrompt}`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text?.trim();
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed.message && Array.isArray(parsed.actions)) {
            return {
              message: parsed.message,
              actions: parsed.actions,
            };
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to catalog search engine:', err);
      }
    }

    // 3. Fallback Intelligent Database Catalog Engine
    return this.fallbackEngine(query, products, context);
  }

  private fallbackEngine(
    query: string,
    products: any[],
    context?: { currentPath?: string; selectedProduct?: string | null }
  ): AssistantChatResponse {
    const actions: AssistantAction[] = [];

    // How it works
    if (query.includes('how') && (query.includes('work') || query.includes('emi') || query.includes('process'))) {
      return {
        message: 'EMIFlow makes smartphone financing transparent in 4 easy steps:\n\n1. **Choose your device & variant** (color & storage)\n2. **Select your EMI tenure** (3, 6, 12, or extended months)\n3. **Review transparent terms** with upfront cashback\n4. **Proceed securely** with instant paperless verification.\n\nAll plans have zero hidden fees and clear interest breakdowns.',
        actions: [
          { type: 'navigate', label: 'Explore How It Works', path: '/how-it-works' },
          { type: 'navigate', label: 'View Smartphone Catalog', path: '/products' },
        ],
      };
    }

    // About EMIFlow
    if (query.includes('about') || query.includes('who') || query.includes('company') || query.includes('mission')) {
      return {
        message: 'EMIFlow is a modern smartphone financing and e-commerce platform designed to make device purchasing simple, transparent, and budget-friendly. Built with React, TypeScript, Node.js, Express, and PostgreSQL.',
        actions: [
          { type: 'navigate', label: 'Read Our Story', path: '/about' },
        ],
      };
    }

    // Profile or account
    if (query.includes('profile') || query.includes('account') || query.includes('my order') || query.includes('my application')) {
      return {
        message: 'You can manage your profile, view submitted EMI applications, and update your security settings on your Profile page.',
        actions: [
          { type: 'navigate', label: 'Open My Profile', path: '/profile' },
        ],
      };
    }

    // Brand query: Apple / iPhone
    if (query.includes('iphone') || query.includes('apple')) {
      const iphone = products.find((p) => p.brand === 'Apple');
      const startPrice = iphone?.variants[0]?.sellingPrice ? `₹${iphone.variants[0].sellingPrice.toLocaleString('en-IN')}` : '₹1,27,400';
      return {
        message: `We have the flagship **${iphone?.name || 'Apple iPhone 17 Pro'}** in stock! Available in 256 GB and 512 GB configurations with 0% No-Cost EMI options starting at **${startPrice}**.\n\nFeatures include the A19 Pro chip, 48MP Triple Camera, and Titanium enclosure.`,
        actions: [
          { type: 'open_product', label: 'Configure iPhone 17 Pro', path: `/product/${iphone?.slug || 'iphone-17-pro'}` },
          { type: 'filter_products', label: 'View Apple Catalog', path: '/products?brand=Apple' },
        ],
      };
    }

    // Brand query: Samsung / Galaxy
    if (query.includes('samsung') || query.includes('galaxy') || query.includes('s25')) {
      const samsung = products.find((p) => p.brand === 'Samsung');
      const startPrice = samsung?.variants[0]?.sellingPrice ? `₹${samsung.variants[0].sellingPrice.toLocaleString('en-IN')}` : '₹1,24,999';
      return {
        message: `The **${samsung?.name || 'Samsung Galaxy S25 Ultra'}** is available now! Features Snapdragon 8 Elite, 200MP quad camera, integrated S-Pen, and Titanium build. Starting at **${startPrice}** with 0% interest 6-month EMI plans.`,
        actions: [
          { type: 'open_product', label: 'Configure Galaxy S25 Ultra', path: `/product/${samsung?.slug || 'samsung-galaxy-s25-ultra'}` },
          { type: 'filter_products', label: 'View Samsung Devices', path: '/products?brand=Samsung' },
        ],
      };
    }

    // Brand query: OnePlus
    if (query.includes('oneplus') || query.includes('13')) {
      const oneplus = products.find((p) => p.brand === 'OnePlus');
      const startPrice = oneplus?.variants[0]?.sellingPrice ? `₹${oneplus.variants[0].sellingPrice.toLocaleString('en-IN')}` : '₹65,999';
      return {
        message: `The **${oneplus?.name || 'OnePlus 13'}** offers flagship performance with Snapdragon 8 Elite, 6000mAh battery, 100W SUPERVOOC charging, and 50MP Hasselblad optics. Starting at **${startPrice}** with 0% No-Cost EMI!`,
        actions: [
          { type: 'open_product', label: 'Configure OnePlus 13', path: `/product/${oneplus?.slug || 'oneplus-13'}` },
          { type: 'filter_products', label: 'View OnePlus Devices', path: '/products?brand=OnePlus' },
        ],
      };
    }

    // Cheapest / Budget phone
    if (query.includes('cheap') || query.includes('budget') || query.includes('under') || query.includes('lowest') || query.includes('least')) {
      const sorted = [...products].sort((a, b) => (a.variants[0]?.sellingPrice || 0) - (b.variants[0]?.sellingPrice || 0));
      const cheapest = sorted[0];
      const startPrice = cheapest?.variants[0]?.sellingPrice ? `₹${cheapest.variants[0].sellingPrice.toLocaleString('en-IN')}` : '₹65,999';
      return {
        message: `The most affordable flagship in our catalog is the **${cheapest?.name || 'OnePlus 13'}**, starting at **${startPrice}** (₹5,500/mo on 12-month 0% EMI with ₹4,000 instant cashback).`,
        actions: [
          { type: 'open_product', label: `View ${cheapest?.name || 'OnePlus 13'}`, path: `/product/${cheapest?.slug || 'oneplus-13'}` },
          { type: 'navigate', label: 'Browse All Catalog', path: '/products' },
        ],
      };
    }

    // General Catalog or comparison
    if (query.includes('phone') || query.includes('catalog') || query.includes('what') || query.includes('available') || query.includes('list') || query.includes('compare')) {
      const summaryList = products
        .map((p) => `• **${p.name}** (from ₹${p.variants[0]?.sellingPrice.toLocaleString('en-IN')})`)
        .join('\n');
      return {
        message: `We currently offer these premium flagship smartphones with flexible 0% No-Cost EMI financing:\n\n${summaryList}\n\nSelect any model to customize color, storage, and EMI terms!`,
        actions: [
          { type: 'navigate', label: 'Browse All Catalog', path: '/products' },
          { type: 'open_product', label: 'Apple iPhone 17 Pro', path: '/product/iphone-17-pro' },
          { type: 'open_product', label: 'Samsung S25 Ultra', path: '/product/samsung-galaxy-s25-ultra' },
        ],
      };
    }

    // Default friendly response
    return {
      message: "I can help you browse smartphones, compare flexible No-Cost EMI plans, and navigate EMIFlow. What kind of phone or budget are you looking for today?",
      actions: [
        { type: 'navigate', label: 'Browse Catalog', path: '/products' },
        { type: 'navigate', label: 'How It Works', path: '/how-it-works' },
        { type: 'open_product', label: 'iPhone 17 Pro', path: '/product/iphone-17-pro' },
      ],
    };
  }
}

export const assistantService = new AssistantService();
