# EMIFlow — Full-Stack Smartphone Financing & E-Commerce Platform

EMIFlow is an end-to-end, production-grade fintech/e-commerce web application where users can explore flagship smartphones, configure variants, compare transparent No-Cost EMI plans, complete paperless financing applications, and interact with a context-aware AI Shopping Assistant.

---

## 🏗️ System Architecture

```
                                    +------------------------------+
                                    |         React 19 SPA         |
                                    |    (Vite + Tailwind v4)      |
                                    +--------------+---------------+
                                                   |
                                            REST API (JSON)
                                                   |
                                    +--------------v---------------+
                                    |       Express 4 Server       |
                                    |       (TypeScript ESM)       |
                                    +-------+--------------+-------+
                                            |              |
                             Prisma ORM Client             Gemini 2.5 Flash SDK
                                            |              |
                               +------------v---+     +----v-------------------+
                               |  PostgreSQL 17 |     | Google Gemini Gen AI   |
                               | (Relational DB)|     | (Catalog Grounded AI)  |
                               +----------------+     +------------------------+
```

---

## 🌟 Key Features

### 1. E-Commerce & Smartphone Catalog
- **Interactive Product Pages**: Live colorway swatches, storage configuration chips, high-resolution galleries with zoom, and hardware specs tables.
- **Dynamic Pricing Engine**: Instant calculation of MRP discounts, selling prices, and net monthly installments.
- **Mutual Fund-Backed EMI Plans**: 3, 6, 12-month 0% No-Cost EMI tiers alongside extended 24-month plans with upfront cashback.
- **Catalog Search & Filtering**: Real-time name search, brand filter pills (Apple, Samsung, OnePlus), and multi-criteria sorting.

### 2. User Authentication & Profile (`/login`, `/signup`, `/profile`)
- **Secure Authentication**: Bcrypt password hashing (salt rounds = 10) and JWT sessions stored in HttpOnly cookies with Bearer token authorization header fallback.
- **Protected Routes**: `/profile` and `/account` route guards redirect unauthenticated users to `/login`, preserving intended navigation targets.
- **Application Preservation**: Unauthenticated users who click *"Proceed with EMI Plan"* are routed to login/register without losing their selected device, variant, or EMI tenure.
- **User Dashboard**: Live tracking of submitted EMI applications with real-time approval status badges, inline name editing, and password updates.

### 3. AI Shopping Assistant ("EMIFlow Assistant")
- **Context-Aware Floating Widget**: Bottom-right floating button opening a 410px desktop drawer or mobile bottom sheet.
- **Database Grounding**: Uses live PostgreSQL product and EMI catalog data—never invents prices or phantom specifications.
- **Gemini API & Fallback Engine**: Integrates `@google/genai` with `GEMINI_API_KEY`, backed by an intelligent deterministic catalog query engine when offline.
- **Structured Action Buttons**: Interactive navigation triggers (e.g., `[ Configure Galaxy S25 Ultra ]`, `[ Open How It Works ]`, `[ View Apple Catalog ]`).

### 4. Informational & Educational Pages
- **How It Works (`/how-it-works`)**: 4-step interactive financing journey, "Why choose EMIFlow" benefit cards, expandable FAQ accordion, and demo disclosures.
- **About Page (`/about`)**: Company story, mission for transparent financing, and architecture specifications.

---

## 🗄️ Database Schema (PostgreSQL + Prisma)

- **`User`**: Account owner records (`id`, `name`, `email`, `passwordHash`, `avatarUrl`, `createdAt`, `updatedAt`).
- **`Product`**: Flagship smartphone specifications, ratings, reviews count, brand, and slug.
- **`Variant`**: Color, hex code, storage capacity, MRP, selling price, cashback, SKU, and stock.
- **`ProductImage`**: Ordered multi-angle product photography.
- **`EmiPlan`**: Tenures (3M, 6M, 12M, 24M, 36M), monthly installments, interest rates, total payable amounts, and processing fees.
- **`SavedPlan`**: User-submitted financing applications linked to `User`, `Product`, `Variant`, and `EmiPlan`.
- **`Review`**: Verified customer testimonials with star ratings.

---

## 🔌 API Endpoints

### Products & Health
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Service health & database connectivity check |
| `GET` | `/api/products` | Retrieve all products with lowest variant prices |
| `GET` | `/api/products/:slug` | Retrieve complete product details, variants, images, and EMI plans |
| `GET` | `/api/products/:slug/variants/:variantId` | Retrieve specific variant data and images |
| `GET` | `/api/products/:slug/reviews` | Retrieve verified customer reviews |

### Authentication & Account
| Method | Route | Description | Protected |
|---|---|---|:---:|
| `POST` | `/api/auth/register` | Create account with name, email, password (min 8 chars) | No |
| `POST` | `/api/auth/login` | Sign in with email and password, issues JWT | No |
| `POST` | `/api/auth/logout` | Clears HttpOnly session cookie | No |
| `GET` | `/api/auth/me` | Fetch currently authenticated user session | Yes |
| `PATCH` | `/api/auth/profile` | Update account display name | Yes |
| `POST` | `/api/auth/change-password` | Validate old password and set new hashed password | Yes |
| `GET` | `/api/auth/saved-plans` | Fetch user's submitted EMI applications | Yes |
| `POST` | `/api/auth/saved-plans` | Submit and record a new EMI financing application | Yes |

### AI Assistant
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/assistant/chat` | Send user message with page context, returns grounded answer & navigation actions |

---

## ⚙️ Environment Variables

Create `.env` in the root directory (refer to `.env.example`):

```ini
# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database (PostgreSQL 17)
DATABASE_URL=postgresql://postgres:admin@localhost:5433/emiflow

# Security & Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Google Gemini API (For AI Assistant)
GEMINI_API_KEY=your_gemini_api_key_here

# Frontend Client (Vite)
VITE_API_URL=http://localhost:3001
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v20+
- PostgreSQL 17 running on port `5433` (or adjust `DATABASE_URL`)

### 1. Database Setup & Seeding
```powershell
cd c:\Projects\EMIFlow\server
npm run db:generate
npx prisma db push --schema ../prisma/schema.prisma
npm run db:seed
```
*Pre-seeded Demo User:*
- **Email**: `demo@emiflow.com`
- **Password**: `Password123!`

### 2. Start Backend Server (Port 3001)
```powershell
cd c:\Projects\EMIFlow\server
npm run dev
```

### 3. Start Frontend Client (Port 5173)
```powershell
cd c:\Projects\EMIFlow\client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Security & Quality Standards

- Passwords hashed using `bcryptjs` with salt rounds = 10.
- JWT stored securely in HttpOnly cookies with Bearer header fallback.
- No plaintext passwords or password hashes exposed in responses.
- Helmet security headers and strict CORS origin validation enabled.
- Centralized Express error handler with safe error masking in production.
- Responsive across mobile (375px), tablet (768px), and desktop (1440px).
