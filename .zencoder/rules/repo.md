---
description: Repository Information Overview
alwaysApply: true
---

# DonorConnect Information

## Summary
**DonorConnect** is a modern, full-stack donor management platform built with Next.js 15. It allows organizations to manage donor profiles, track donations, and leverage AI-powered insights for engagement strategies. The system features role-based access control (ADMIN/STAFF) and integrates with PostgreSQL via Prisma ORM and Claude AI for data analysis.

## Structure
- **app/**: Contains the Next.js App Router structure, including API routes (`api/`), authentication pages (`auth/`), and feature-specific pages (`donors/`, `donations/`, `admin/`, `ai-insights/`).
- **components/**: Reusable React components such as modals (`DonorModal`, `TaskModal`) and layout elements.
- **lib/**: Core utility functions and shared logic for Prisma client initialization and NextAuth configuration.
- **prisma/**: Database schema definitions (`schema.prisma`) and seeding scripts (`seed.ts`) for the PostgreSQL database.
- **public/**: Static assets like icons and images used throughout the application.
- **docs/**: Comprehensive documentation covering quick start, deployment, environment setup, and production checklists.

## Language & Runtime
**Language**: TypeScript  
**Version**: Node.js 18+  
**Build System**: Next.js (App Router)  
**Package Manager**: `pnpm` (recommended per README) or `npm` (lockfile present)

## Dependencies
**Main Dependencies**:
- `next`: ^15.5.9 (Framework)
- `react`: 19.2.3 (UI Library)
- `@prisma/client`: ^5.22.0 (ORM)
- `next-auth`: ^4.24.13 (Authentication)
- `openai`: ^4.24.0 (AI integration)
- `bcryptjs`: ^2.4.3 (Password hashing)

**Development Dependencies**:
- `typescript`: ^5
- `prisma`: ^5.22.0
- `tailwindcss`: ^4
- `eslint`: ^9
- `ts-node`: ^10.9.2

## Build & Installation

```bash
# Install dependencies
pnpm install

# Database setup
pnpm run db:push
pnpm prisma db seed

# Build for production
pnpm run build

# Start production server
pnpm start
```

## Main Files & Resources
- **Entry Points**: `middleware.ts` (protected routes), `app/layout.tsx` (root layout).
- **Configuration**: `package.json`, `tsconfig.json`, `vercel.json` (Vercel deployment), `prisma/schema.prisma` (Database schema).
- **Environment**: `.env` (requires `DATABASE_URL`, `NEXTAUTH_SECRET`, `OPENAI_API_KEY`, etc.).

## Testing
The project currently does not have an automated testing framework (e.g., Jest or Vitest). Testing is performed manually using test accounts provided in the documentation.

**Test Credentials**:
- **Admin**: admin@donorconnect.com / admin123
- **Staff**: staff@donorconnect.com / staff123

**Verification Process**:
Manual verification of CRUD operations for donors and donations, authentication flows, and AI insight generation as described in `docs/DEPLOYMENT_CHECKLIST.md`.
