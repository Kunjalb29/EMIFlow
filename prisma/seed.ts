import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.emiPlan.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log('🧹 Cleaned existing data');

  // ========================================
  // Product 1: Apple iPhone 17 Pro
  // ========================================
  const iphone = await prisma.product.create({
    data: {
      name: 'Apple iPhone 17 Pro',
      slug: 'iphone-17-pro',
      brand: 'Apple',
      category: 'Smartphones',
      description: 'The most advanced iPhone ever. Featuring the A19 Pro chip, a stunning titanium design, and a revolutionary camera system with 48MP Fusion camera. Experience the future of mobile computing.',
      rating: 4.7,
      reviewCount: 128,
      specs: {
        display: '6.3-inch Super Retina XDR OLED',
        resolution: '2622 × 1206 pixels',
        processor: 'A19 Pro chip',
        ram: '8 GB',
        rearCamera: '48 MP + 48 MP + 48 MP',
        frontCamera: '18 MP TrueDepth',
        battery: '4685 mAh',
        os: 'iOS 19',
        connectivity: '5G, Wi-Fi 7, Bluetooth 5.4',
        waterResistance: 'IP68',
        weight: '187 g',
        simType: 'eSIM',
      },
    },
  });

  // iPhone Variant 1: Silver 256GB
  const iphoneSilver256 = await prisma.variant.create({
    data: {
      productId: iphone.id,
      color: 'Silver',
      colorHex: '#C0C0C0',
      storage: '256 GB',
      mrp: 134900,
      sellingPrice: 127400,
      cashback: 7500,
      stock: 45,
      sku: 'IPHONE17P-SLV-256',
      isDefault: true,
    },
  });

  // iPhone Variant 2: Cosmic Orange 256GB
  const iphoneOrange256 = await prisma.variant.create({
    data: {
      productId: iphone.id,
      color: 'Cosmic Orange',
      colorHex: '#E8732A',
      storage: '256 GB',
      mrp: 134900,
      sellingPrice: 128900,
      cashback: 6000,
      stock: 32,
      sku: 'IPHONE17P-ORG-256',
    },
  });

  // iPhone Variant 3: Deep Blue 512GB
  const iphoneBlue512 = await prisma.variant.create({
    data: {
      productId: iphone.id,
      color: 'Deep Blue',
      colorHex: '#1B3A6B',
      storage: '512 GB',
      mrp: 154900,
      sellingPrice: 146400,
      cashback: 8500,
      stock: 18,
      sku: 'IPHONE17P-BLU-512',
    },
  });

  // Images for Silver
  await prisma.productImage.createMany({
    data: [
      { variantId: iphoneSilver256.id, url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', alt: 'iPhone 17 Pro Silver front view', sortOrder: 1 },
      { variantId: iphoneSilver256.id, url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80', alt: 'iPhone 17 Pro Silver back view', sortOrder: 2 },
      { variantId: iphoneSilver256.id, url: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800&q=80', alt: 'iPhone 17 Pro Silver side view', sortOrder: 3 },
      { variantId: iphoneSilver256.id, url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80', alt: 'iPhone 17 Pro Silver camera detail', sortOrder: 4 },
    ],
  });

  // Images for Orange
  await prisma.productImage.createMany({
    data: [
      { variantId: iphoneOrange256.id, url: 'https://images.unsplash.com/photo-1699764803498-20a2c4d32640?w=800&q=80', alt: 'iPhone 17 Pro Cosmic Orange front', sortOrder: 1 },
      { variantId: iphoneOrange256.id, url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80', alt: 'iPhone 17 Pro Cosmic Orange back', sortOrder: 2 },
      { variantId: iphoneOrange256.id, url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80', alt: 'iPhone 17 Pro Cosmic Orange angle', sortOrder: 3 },
    ],
  });

  // Images for Blue
  await prisma.productImage.createMany({
    data: [
      { variantId: iphoneBlue512.id, url: 'https://images.unsplash.com/photo-1632633173522-47456de71b68?w=800&q=80', alt: 'iPhone 17 Pro Deep Blue front', sortOrder: 1 },
      { variantId: iphoneBlue512.id, url: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80', alt: 'iPhone 17 Pro Deep Blue back', sortOrder: 2 },
      { variantId: iphoneBlue512.id, url: 'https://images.unsplash.com/photo-1580910051074-3eb694886f2b?w=800&q=80', alt: 'iPhone 17 Pro Deep Blue side', sortOrder: 3 },
    ],
  });

  // EMI Plans for Silver 256GB
  const silver256Plans = [
    { tenureMonths: 3, monthlyAmount: 44967, interestRate: 0, totalAmount: 134901, cashback: 7500, processingFee: 0, isPopular: false },
    { tenureMonths: 6, monthlyAmount: 22483, interestRate: 0, totalAmount: 134898, cashback: 7500, processingFee: 0, isPopular: false },
    { tenureMonths: 12, monthlyAmount: 11242, interestRate: 0, totalAmount: 134904, cashback: 7500, processingFee: 0, isPopular: true },
    { tenureMonths: 24, monthlyAmount: 5621, interestRate: 0, totalAmount: 134904, cashback: 7500, processingFee: 0, isPopular: false },
    { tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, totalAmount: 154692, cashback: 7500, processingFee: 499, isPopular: false },
    { tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, totalAmount: 162480, cashback: 7500, processingFee: 499, isPopular: false },
    { tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, totalAmount: 170520, cashback: 7500, processingFee: 499, isPopular: false },
  ];

  for (const plan of silver256Plans) {
    await prisma.emiPlan.create({ data: { variantId: iphoneSilver256.id, ...plan } });
  }

  // EMI Plans for Orange 256GB
  const orange256Plans = [
    { tenureMonths: 3, monthlyAmount: 42967, interestRate: 0, totalAmount: 128901, cashback: 6000, processingFee: 0, isPopular: false },
    { tenureMonths: 6, monthlyAmount: 21483, interestRate: 0, totalAmount: 128898, cashback: 6000, processingFee: 0, isPopular: false },
    { tenureMonths: 12, monthlyAmount: 10742, interestRate: 0, totalAmount: 128904, cashback: 6000, processingFee: 0, isPopular: true },
    { tenureMonths: 24, monthlyAmount: 5371, interestRate: 0, totalAmount: 128904, cashback: 6000, processingFee: 0, isPopular: false },
    { tenureMonths: 36, monthlyAmount: 4117, interestRate: 10.5, totalAmount: 148212, cashback: 6000, processingFee: 499, isPopular: false },
    { tenureMonths: 48, monthlyAmount: 3243, interestRate: 10.5, totalAmount: 155664, cashback: 6000, processingFee: 499, isPopular: false },
    { tenureMonths: 60, monthlyAmount: 2722, interestRate: 10.5, totalAmount: 163320, cashback: 6000, processingFee: 499, isPopular: false },
  ];

  for (const plan of orange256Plans) {
    await prisma.emiPlan.create({ data: { variantId: iphoneOrange256.id, ...plan } });
  }

  // EMI Plans for Blue 512GB
  const blue512Plans = [
    { tenureMonths: 3, monthlyAmount: 48800, interestRate: 0, totalAmount: 146400, cashback: 8500, processingFee: 0, isPopular: false },
    { tenureMonths: 6, monthlyAmount: 24400, interestRate: 0, totalAmount: 146400, cashback: 8500, processingFee: 0, isPopular: false },
    { tenureMonths: 12, monthlyAmount: 12200, interestRate: 0, totalAmount: 146400, cashback: 8500, processingFee: 0, isPopular: true },
    { tenureMonths: 24, monthlyAmount: 6100, interestRate: 0, totalAmount: 146400, cashback: 8500, processingFee: 0, isPopular: false },
    { tenureMonths: 36, monthlyAmount: 4672, interestRate: 10.5, totalAmount: 168192, cashback: 8500, processingFee: 499, isPopular: false },
    { tenureMonths: 48, monthlyAmount: 3680, interestRate: 10.5, totalAmount: 176640, cashback: 8500, processingFee: 499, isPopular: false },
    { tenureMonths: 60, monthlyAmount: 3090, interestRate: 10.5, totalAmount: 185400, cashback: 8500, processingFee: 499, isPopular: false },
  ];

  for (const plan of blue512Plans) {
    await prisma.emiPlan.create({ data: { variantId: iphoneBlue512.id, ...plan } });
  }

  console.log('✅ iPhone 17 Pro created with 3 variants');

  // ========================================
  // Product 2: Samsung Galaxy S25 Ultra
  // ========================================
  const samsung = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S25 Ultra',
      slug: 'samsung-galaxy-s25-ultra',
      brand: 'Samsung',
      category: 'Smartphones',
      description: 'Unleash the power of Galaxy AI with the Galaxy S25 Ultra. Featuring a stunning 6.9-inch Dynamic AMOLED display, Snapdragon 8 Elite processor, and a 200MP camera system that redefines mobile photography.',
      rating: 4.5,
      reviewCount: 96,
      specs: {
        display: '6.9-inch Dynamic AMOLED 2X',
        resolution: '3120 × 1440 pixels',
        processor: 'Snapdragon 8 Elite',
        ram: '12 GB',
        rearCamera: '200 MP + 50 MP + 10 MP + 50 MP',
        frontCamera: '12 MP',
        battery: '5000 mAh',
        os: 'Android 15, One UI 7',
        connectivity: '5G, Wi-Fi 7, Bluetooth 5.4',
        waterResistance: 'IP68',
        weight: '218 g',
        simType: 'Nano-SIM + eSIM',
        spen: 'Built-in S Pen',
      },
    },
  });

  // Samsung Variant 1: Titanium Silver 256GB
  const samsungSilver256 = await prisma.variant.create({
    data: {
      productId: samsung.id,
      color: 'Titanium Silver',
      colorHex: '#A8A9AD',
      storage: '256 GB',
      mrp: 131999,
      sellingPrice: 124999,
      cashback: 7000,
      stock: 55,
      sku: 'SGS25U-TSV-256',
      isDefault: true,
    },
  });

  // Samsung Variant 2: Titanium Black 512GB
  const samsungBlack512 = await prisma.variant.create({
    data: {
      productId: samsung.id,
      color: 'Titanium Black',
      colorHex: '#2C2C2C',
      storage: '512 GB',
      mrp: 144999,
      sellingPrice: 137999,
      cashback: 7000,
      stock: 28,
      sku: 'SGS25U-TBK-512',
    },
  });

  // Samsung images
  await prisma.productImage.createMany({
    data: [
      { variantId: samsungSilver256.id, url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', alt: 'Galaxy S25 Ultra Silver front', sortOrder: 1 },
      { variantId: samsungSilver256.id, url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80', alt: 'Galaxy S25 Ultra Silver back', sortOrder: 2 },
      { variantId: samsungSilver256.id, url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80', alt: 'Galaxy S25 Ultra Silver side', sortOrder: 3 },
      { variantId: samsungBlack512.id, url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80', alt: 'Galaxy S25 Ultra Black front', sortOrder: 1 },
      { variantId: samsungBlack512.id, url: 'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=800&q=80', alt: 'Galaxy S25 Ultra Black back', sortOrder: 2 },
      { variantId: samsungBlack512.id, url: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=800&q=80', alt: 'Galaxy S25 Ultra Black angle', sortOrder: 3 },
    ],
  });

  // Samsung EMI Plans - Silver 256GB
  const samsungSilverPlans = [
    { tenureMonths: 3, monthlyAmount: 41667, interestRate: 0, totalAmount: 125001, cashback: 7000, processingFee: 0, isPopular: false },
    { tenureMonths: 6, monthlyAmount: 20833, interestRate: 0, totalAmount: 124998, cashback: 7000, processingFee: 0, isPopular: false },
    { tenureMonths: 12, monthlyAmount: 10417, interestRate: 0, totalAmount: 125004, cashback: 7000, processingFee: 0, isPopular: true },
    { tenureMonths: 24, monthlyAmount: 5208, interestRate: 0, totalAmount: 124992, cashback: 7000, processingFee: 0, isPopular: false },
    { tenureMonths: 36, monthlyAmount: 3992, interestRate: 10.5, totalAmount: 143712, cashback: 7000, processingFee: 499, isPopular: false },
    { tenureMonths: 48, monthlyAmount: 3145, interestRate: 10.5, totalAmount: 150960, cashback: 7000, processingFee: 499, isPopular: false },
  ];

  for (const plan of samsungSilverPlans) {
    await prisma.emiPlan.create({ data: { variantId: samsungSilver256.id, ...plan } });
  }

  // Samsung EMI Plans - Black 512GB
  const samsungBlackPlans = [
    { tenureMonths: 3, monthlyAmount: 46000, interestRate: 0, totalAmount: 138000, cashback: 7000, processingFee: 0, isPopular: false },
    { tenureMonths: 6, monthlyAmount: 23000, interestRate: 0, totalAmount: 138000, cashback: 7000, processingFee: 0, isPopular: false },
    { tenureMonths: 12, monthlyAmount: 11500, interestRate: 0, totalAmount: 138000, cashback: 7000, processingFee: 0, isPopular: true },
    { tenureMonths: 24, monthlyAmount: 5750, interestRate: 0, totalAmount: 138000, cashback: 7000, processingFee: 0, isPopular: false },
    { tenureMonths: 36, monthlyAmount: 4407, interestRate: 10.5, totalAmount: 158652, cashback: 7000, processingFee: 499, isPopular: false },
    { tenureMonths: 48, monthlyAmount: 3472, interestRate: 10.5, totalAmount: 166656, cashback: 7000, processingFee: 499, isPopular: false },
  ];

  for (const plan of samsungBlackPlans) {
    await prisma.emiPlan.create({ data: { variantId: samsungBlack512.id, ...plan } });
  }

  console.log('✅ Samsung Galaxy S25 Ultra created with 2 variants');

  // ========================================
  // Product 3: OnePlus 13
  // ========================================
  const oneplus = await prisma.product.create({
    data: {
      name: 'OnePlus 13',
      slug: 'oneplus-13',
      brand: 'OnePlus',
      category: 'Smartphones',
      description: 'Never Settle with the OnePlus 13. Powered by Snapdragon 8 Elite, featuring a brilliant 2K LTPO AMOLED display, Hasselblad camera system, and blazing-fast 100W SUPERVOOC charging.',
      rating: 4.6,
      reviewCount: 74,
      specs: {
        display: '6.82-inch 2K LTPO AMOLED',
        resolution: '3168 × 1440 pixels',
        processor: 'Snapdragon 8 Elite',
        ram: '12 GB / 16 GB',
        rearCamera: '50 MP + 50 MP + 50 MP (Hasselblad)',
        frontCamera: '32 MP',
        battery: '6000 mAh',
        os: 'Android 15, OxygenOS 15',
        connectivity: '5G, Wi-Fi 7, Bluetooth 5.4',
        waterResistance: 'IP69',
        weight: '213 g',
        simType: 'Dual Nano-SIM',
        charging: '100W SUPERVOOC + 50W wireless',
      },
    },
  });

  // OnePlus Variant 1: Midnight Ocean 256GB
  const oneplusMidnight256 = await prisma.variant.create({
    data: {
      productId: oneplus.id,
      color: 'Midnight Ocean',
      colorHex: '#1A3555',
      storage: '256 GB',
      mrp: 69999,
      sellingPrice: 65999,
      cashback: 4000,
      stock: 72,
      sku: 'OP13-MO-256',
      isDefault: true,
    },
  });

  // OnePlus Variant 2: Arctic Dawn 512GB
  const oneplusArctic512 = await prisma.variant.create({
    data: {
      productId: oneplus.id,
      color: 'Arctic Dawn',
      colorHex: '#E8E4DF',
      storage: '512 GB',
      mrp: 79999,
      sellingPrice: 74999,
      cashback: 5000,
      stock: 38,
      sku: 'OP13-AD-512',
    },
  });

  // OnePlus images
  await prisma.productImage.createMany({
    data: [
      { variantId: oneplusMidnight256.id, url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80', alt: 'OnePlus 13 Midnight Ocean front', sortOrder: 1 },
      { variantId: oneplusMidnight256.id, url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80', alt: 'OnePlus 13 Midnight Ocean back', sortOrder: 2 },
      { variantId: oneplusMidnight256.id, url: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80', alt: 'OnePlus 13 Midnight Ocean angle', sortOrder: 3 },
      { variantId: oneplusArctic512.id, url: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80', alt: 'OnePlus 13 Arctic Dawn front', sortOrder: 1 },
      { variantId: oneplusArctic512.id, url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80', alt: 'OnePlus 13 Arctic Dawn back', sortOrder: 2 },
      { variantId: oneplusArctic512.id, url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80', alt: 'OnePlus 13 Arctic Dawn angle', sortOrder: 3 },
    ],
  });

  // OnePlus EMI Plans - Midnight Ocean 256GB
  const oneplusMidnightPlans = [
    { tenureMonths: 3, monthlyAmount: 22000, interestRate: 0, totalAmount: 66000, cashback: 4000, processingFee: 0, isPopular: false },
    { tenureMonths: 6, monthlyAmount: 11000, interestRate: 0, totalAmount: 66000, cashback: 4000, processingFee: 0, isPopular: true },
    { tenureMonths: 12, monthlyAmount: 5500, interestRate: 0, totalAmount: 66000, cashback: 4000, processingFee: 0, isPopular: false },
    { tenureMonths: 24, monthlyAmount: 2750, interestRate: 0, totalAmount: 66000, cashback: 4000, processingFee: 0, isPopular: false },
    { tenureMonths: 36, monthlyAmount: 2112, interestRate: 10.5, totalAmount: 76032, cashback: 4000, processingFee: 299, isPopular: false },
  ];

  for (const plan of oneplusMidnightPlans) {
    await prisma.emiPlan.create({ data: { variantId: oneplusMidnight256.id, ...plan } });
  }

  // OnePlus EMI Plans - Arctic Dawn 512GB
  const oneplusArcticPlans = [
    { tenureMonths: 3, monthlyAmount: 25000, interestRate: 0, totalAmount: 75000, cashback: 5000, processingFee: 0, isPopular: false },
    { tenureMonths: 6, monthlyAmount: 12500, interestRate: 0, totalAmount: 75000, cashback: 5000, processingFee: 0, isPopular: true },
    { tenureMonths: 12, monthlyAmount: 6250, interestRate: 0, totalAmount: 75000, cashback: 5000, processingFee: 0, isPopular: false },
    { tenureMonths: 24, monthlyAmount: 3125, interestRate: 0, totalAmount: 75000, cashback: 5000, processingFee: 0, isPopular: false },
    { tenureMonths: 36, monthlyAmount: 2397, interestRate: 10.5, totalAmount: 86292, cashback: 5000, processingFee: 299, isPopular: false },
  ];

  for (const plan of oneplusArcticPlans) {
    await prisma.emiPlan.create({ data: { variantId: oneplusArctic512.id, ...plan } });
  }

  console.log('✅ OnePlus 13 created with 2 variants');

  // ========================================
  // Reviews
  // ========================================
  const reviews = [
    // iPhone reviews
    { productId: iphone.id, reviewerName: 'Arjun Mehta', rating: 5, comment: 'Absolutely phenomenal camera system. The Night mode improvements are incredible. The titanium build feels premium and durable. Worth every rupee!', verifiedBuyer: true, variantInfo: 'Silver · 256 GB' },
    { productId: iphone.id, reviewerName: 'Priya Sharma', rating: 4.5, comment: 'The A19 Pro chip makes everything silky smooth. Battery life is noticeably better than my previous iPhone. The EMI option made it very affordable.', verifiedBuyer: true, variantInfo: 'Cosmic Orange · 256 GB' },
    { productId: iphone.id, reviewerName: 'Rahul Verma', rating: 4, comment: 'Great phone overall. Display is stunning. Only minor complaint is the weight, but you get used to it. The 0% EMI was the deciding factor for me.', verifiedBuyer: true, variantInfo: 'Deep Blue · 512 GB' },
    { productId: iphone.id, reviewerName: 'Sneha Patel', rating: 5, comment: 'Best iPhone yet! The Cosmic Orange color is gorgeous. Performance is unmatched, and the camera takes professional-level photos.', verifiedBuyer: true, variantInfo: 'Cosmic Orange · 256 GB' },
    { productId: iphone.id, reviewerName: 'Vikram Desai', rating: 4.5, comment: 'Upgraded from iPhone 15 Pro. The difference is noticeable in every aspect - speed, camera, display. Great value with the cashback offer!', verifiedBuyer: false, variantInfo: 'Silver · 256 GB' },

    // Samsung reviews
    { productId: samsung.id, reviewerName: 'Ananya Krishnan', rating: 5, comment: 'The S Pen integration is fantastic. Galaxy AI features are incredibly useful for productivity. 200MP camera captures insane detail.', verifiedBuyer: true, variantInfo: 'Titanium Silver · 256 GB' },
    { productId: samsung.id, reviewerName: 'Rohan Gupta', rating: 4, comment: 'Massive screen is perfect for content consumption. Battery easily lasts a full day with heavy use. The AI photo editing is mind-blowing.', verifiedBuyer: true, variantInfo: 'Titanium Black · 512 GB' },
    { productId: samsung.id, reviewerName: 'Deepika Nair', rating: 4.5, comment: 'Switched from iPhone and I\'m impressed. The customization options and multitasking capabilities are unmatched. EMI plan was hassle-free.', verifiedBuyer: true, variantInfo: 'Titanium Silver · 256 GB' },
    { productId: samsung.id, reviewerName: 'Karthik Rajan', rating: 5, comment: 'Best Android phone, period. The titanium frame feels incredibly premium. Night photography is exceptional. Highly recommended!', verifiedBuyer: false, variantInfo: 'Titanium Black · 512 GB' },

    // OnePlus reviews
    { productId: oneplus.id, reviewerName: 'Aditya Singh', rating: 5, comment: 'OnePlus has outdone themselves! The 100W charging is a game-changer. Phone goes from 0 to 100 in about 25 minutes. Incredible value for money.', verifiedBuyer: true, variantInfo: 'Midnight Ocean · 256 GB' },
    { productId: oneplus.id, reviewerName: 'Meera Iyer', rating: 4.5, comment: 'The Hasselblad camera is a massive upgrade. Colors are accurate and natural. The 6000mAh battery is amazing - lasts more than a day easily.', verifiedBuyer: true, variantInfo: 'Arctic Dawn · 512 GB' },
    { productId: oneplus.id, reviewerName: 'Saurav Das', rating: 4, comment: 'Great flagship at a competitive price. IP69 rating gives peace of mind. OxygenOS 15 is clean and fast. Would have loved a telephoto lens.', verifiedBuyer: true, variantInfo: 'Midnight Ocean · 256 GB' },
    { productId: oneplus.id, reviewerName: 'Nisha Reddy', rating: 4.5, comment: 'The Arctic Dawn color is unique and beautiful. Performance is top-notch for gaming and multitasking. 0% EMI made this an easy purchase decision.', verifiedBuyer: false, variantInfo: 'Arctic Dawn · 512 GB' },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log('✅ Reviews created');
  console.log('\n🎉 Seed complete! Database is ready.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
