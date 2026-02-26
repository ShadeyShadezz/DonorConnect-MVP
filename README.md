# 🎁 DonorConnect - Donor Management Platform

A modern, full-stack Next.js 14 web application for managing donors, tracking donations, and leveraging AI to optimize donor engagement strategies.

**Live Demo:** Leads to the wrong vercel deployment that isnt owned by me, apologies.
**Tech Stack:** Next.js 14 • React 19 • TypeScript • Prisma • Neon PostgreSQL • NextAuth.js • Claude AI • Tailwind CSS

---

## ✨ Features

### 👥 **Donor Management**
- Add, view, and manage complete donor information
- Store contact details, addresses, and personalized notes
- View donation history and statistics per donor
- Track donor segments and engagement metrics

### 💰 **Donation Tracking**
- Record donations with amount, type, date, and notes
- Support multiple donation types (Cash, Check, Credit Card, Bank Transfer, Stock)
- Real-time donation statistics (total, count, average)
- Link donations to donors for comprehensive history

### 🤖 **AI-Powered Insights**
- Analyze donor giving patterns with Claude AI
- Get personalized engagement recommendations
- Identify retention opportunities
- Suggest next steps for donor outreach

### 🔐 **Staff Authentication & Authorization**
- Secure staff login with JWT sessions
- Role-based access control (ADMIN, STAFF)
- Admin-only features and dashboards
- Protected API routes and pages

### 📊 **Admin Dashboard**
- View all staff members and their roles
- Manage user accounts
- Monitor system activity
- Create admin accounts with secret key

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm package manager
- Neon PostgreSQL account
- OpenAI API key (for AI features)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Database
```bash
# Push schema to Neon
pnpm run db:push

# Seed with sample data
pnpm prisma db seed
```

### 3. Configure Environment
Update `.env` with your credentials:
- `OPENAI_API_KEY`: Get from https://platform.openai.com/api-keys
- Other variables are pre-configured

### 4. Run Development Server
```bash
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Test Accounts
- **Admin**: admin@donorconnect.com / admin123
- **Staff**: staff@donorconnect.com / staff123

---

## 📚 Documentation

| Guide | Purpose |
|-------|---------|
| [QUICK_START.md](./QUICK_START.md) | 5-10 minute setup and deployment |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Detailed Vercel deployment steps |
| [ENV_SETUP.md](./ENV_SETUP.md) | Environment variables configuration |

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- Next.js 14 App Router
- React 19
- TypeScript
- Tailwind CSS
- NextAuth.js

**Backend:**
- Next.js API Routes
- Prisma ORM
- NextAuth.js (JWT sessions)

**Database:**
- Neon PostgreSQL
- Prisma Client
- Connection pooling

**AI:**
- Claude API (OpenAI)
- Prompt-based analysis

### Project Structure
```
app/
├── api/                    # API routes
│   ├── auth/              # Authentication endpoints
│   ├── donors/            # Donor CRUD operations
│   ├── donations/         # Donation CRUD operations
│   └── ai/                # AI insights endpoint
├── auth/                  # Authentication pages
│   ├── login/
│   └── register/
├── dashboard/             # Main dashboard
├── donors/                # Donor pages
│   ├── page.tsx          # List donors
│   ├── [id]/             # View/edit donor
│   └── new/              # Create donor
├── donations/             # Donation pages
│   ├── page.tsx          # List donations
│   ├── [id]/             # View donation
│   └── new/              # Record donation
├── admin/                 # Admin panel (ADMIN only)
├── ai-insights/          # AI analysis page
└── layout.tsx            # Root layout

lib/
├── prisma.ts             # Database client
├── auth.ts               # Authentication utilities
└── middleware.ts         # Protected routes

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seeding

```

### Database Schema

```prisma
// Users with roles
model User {
  id       String
  email    String (unique)
  password String
  role     ADMIN | STAFF
}

// Donor information
model Donor {
  id          String
  name        String
  email       String?
  phone       String?
  address     String?
  city        String?
  state       String?
  zipCode     String?
  notes       String?
  donations   Donation[]  // Relationship
}

// Donation records
model Donation {
  id        String
  amount    Float
  date      DateTime
  type      String  // Cash, Check, Credit Card, etc.
  notes     String?
  donor     Donor   // Foreign key
  donorId   String
}
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `GET /api/auth/session` - Get current session

### Donors
- `GET /api/donors` - List all donors
- `POST /api/donors` - Create donor
- `GET /api/donors/[id]` - Get donor details
- `PUT /api/donors/[id]` - Update donor
- `DELETE /api/donors/[id]` - Delete donor (admin only)

### Donations
- `GET /api/donations` - List all donations
- `POST /api/donations` - Create donation

### AI Features
- `POST /api/ai/insights` - Generate donor insights

---

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Next.js configuration
4. Click "Deploy"

### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
OPENAI_API_KEY=sk-proj-your-key
ADMIN_SECRET_KEY=your-secure-key
NODE_ENV=production
```

⚠️ **Important**: `NEXTAUTH_URL` must exactly match your Vercel domain

### Step 4: Verify Deployment
```bash
https://your-domain.vercel.app/auth/login
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🔐 Security Features

✅ **Authentication & Authorization**
- JWT-based sessions with NextAuth.js
- Bcrypt password hashing
- Role-based access control (RBAC)
- Protected API routes with middleware

✅ **Database Security**
- SSL/TLS enforced on Neon connection
- Parameterized queries (Prisma)
- Connection pooling
- Environment variables for credentials

✅ **Application Security**
- No secrets in client-side code
- Secure HTTP-only cookies
- CSRF protection via NextAuth
- Input validation on API routes

---

## 🚦 Sample Data

### Test Users
After running `pnpm prisma db seed`:
- **Admin Account**: admin@donorconnect.com / admin123
- **Staff Account**: staff@donorconnect.com / staff123

### Sample Data
- 5 donors with complete profiles
- 10 donations totaling $23,800
- Realistic donation types and dates

Reseed anytime: `pnpm prisma db seed`

---

## 🛠️ Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (hot reload)
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run linting
pnpm run lint

# Database commands
pnpm run db:push      # Push schema to DB
pnpm run db:migrate   # Create migration
pnpm prisma db seed   # Seed with data
pnpm run db:studio    # Open Prisma Studio
```

---

## 📊 Environment Variables

### Required
- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXTAUTH_URL` - Authentication callback URL
- `NEXTAUTH_SECRET` - JWT secret (32+ characters)
- `OPENAI_API_KEY` - Claude/OpenAI API key
- `ADMIN_SECRET_KEY` - Secret for creating admin accounts

### Optional
- `NODE_ENV` - "development" or "production"

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed configuration.

---

## 🐛 Troubleshooting

### Login fails with "Invalid callback URL"
- Ensure `NEXTAUTH_URL` exactly matches your domain
- No trailing slash: `https://example.vercel.app` not `https://example.vercel.app/`

### Database connection errors
- Verify `DATABASE_URL` is correct
- Check Neon database is running
- Ensure network access is enabled

### AI insights not working
- Confirm `OPENAI_API_KEY` is valid
- Check API quota and credits
- Verify network connectivity

### Build fails on deploy
- Check Vercel logs for errors
- Ensure all environment variables are set
- Verify TypeScript compilation locally: `pnpm build`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more troubleshooting.

---

## 📈 Performance

- **Next.js 14**: Optimized for production
- **Vercel**: Edge functions and caching
- **Prisma**: Connection pooling with Neon
- **Database**: Indexed queries for fast responses
- **Frontend**: Code splitting and lazy loading

---

## 🔄 Scaling & Future Enhancements

### Current Capabilities
✅ Multi-user support  
✅ Real-time data updates  
✅ AI-powered insights  
✅ Role-based access  
✅ Mobile responsive  

### Potential Features
📌 Email notifications  
📌 Donation campaigns  
📌 Recurring donations  
📌 Bulk import/export  
📌 Advanced analytics  
📌 Multi-organization support  
📌 Donor segments  
📌 Pledge tracking  
📌 Integration with payment processors  

---

## User Feedback Mapping

Required Mapping Table (MANDATORY)

| Feedback ID | User Feedback | Problem Identified | Decision Made | Change Implemented |
|---|---|---|---|---|
| FB-01 | How do you define a successful giving experience? — "when i recieve a lot of money; I understand the impact of my donation and it is easy to setup the payment process. Functional and easy to use" | Donors need clearer impact feedback and a simpler payment flow | Improve donation flow and surface impact of donations | Added documentation notes to prioritize donation confirmation, impact summary, and a simplified payment UI (implementation planned) |
| FB-02 | What was your first thoughts on the UI / UX design — "it looked clean; Comfortable UI style, simplistic, and spacious" | Maintain simplicity while adding functionality | Preserve minimal, spacious UI and avoid clutter | Emphasized simple layout and concise feature set in docs and design notes |
| FB-03 | What other organizations could use DonorConnect? — "Any non-profit or organization that seeks donors; mines" | Broad target audience; organizations may need migration/onboarding support | Provide migration guides and onboarding resources | Added references to onboarding and migration docs in repository docs folder |
| FB-04 | Closing Thoughts — "I want to know more about the capabilities and all the actions that are possible; curious about migration from other CRMs" | Lack of detailed feature documentation and migration path | Expand docs and feature list; provide migration guidance | Linked QUICK_START and DEPLOYMENT docs and added roadmap references for planned improvements |

Planned New Functions (proposed — will implement after approval)

- `generateImpactSummary(donation)`: produce a human-readable impact summary and receipt for donors.
- `createQuickDonation(payload)`: simplified one-click donation creation flow for faster giving.
- `importFromCRM(source)`: migration/import utility to bring donor data from other CRMs.
- `startPaymentSetupWizard(userId)`: guided flow for staff to configure payment methods.
- `groupMetricsForDashboard(metrics)`: helper to group and format metrics into digestible cards.
- `notifyAdminOnLargeDonation(donation)`: admin alerting for large or notable gifts.

We'll validate these with TypeScript typings, unit tests, and integration tests before implementation.

## 🚢 Orchestration (Docker Compose)

### Architecture
- Two-container setup: one container runs the Next.js app, the other runs the PostgreSQL database (Neon-compatible local image or postgres).
- Communication: the app connects to the database over an internal Docker network (service name as hostname, e.g., db). Use DATABASE_URL with the Docker service hostname so the app and DB communicate over the compose network.

### Quick Start
- Single-command startup:
  - docker compose up --build
- Example (assumes .env is present and docker-compose.yml defines app and db services):
  - docker compose up --build
- Use docker compose down -v to fully remove containers and volumes for a clean reset.

### Stability Features
- Healthchecks: add simple HTTP/SQL healthchecks for the app and db in docker-compose so orchestrator can detect unhealthy services.
- Restart policies: use restart: unless-stopped or restart: on-failure for resilience in local development.
- These features help automatic recovery and make local dev more stable.

### Environment Management
- Secrets: store runtime secrets in a .env file (gitignore .env). Provide .env.example with required variables.
- In Docker Compose, reference environment variables and avoid hardcoding secrets in compose files.
- Ensure NEXTAUTH_SECRET and DATABASE_URL are set before starting.

### Business Value
- Reliability: orchestration enforces restart policies and healthchecks so BrightPath (or similar orgs) see fewer downtime surprises during demos and labs.
- Reproducibility: single-command startup minimizes setup friction for students and teammates, reducing "works on my machine" issues.
- Maintainability: clearly documented env and seed steps let a fresh clone be brought to a known state faster.
---

## 📝 License

This project is provided as-is for educational and commercial use.

---

## 👨‍💻 Support & Resources

- **Documentation**: See QUICK_START.md, DEPLOYMENT.md, ENV_SETUP.md
- **Neon Docs**: https://neon.tech/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **NextAuth Docs**: https://next-auth.js.org

---

## 🎯 Getting Help

1. **Local Issues?** Run `pnpm run dev` and check console errors
2. **Deployment Issues?** Check Vercel logs and environment variables
3. **Database Issues?** Check Neon dashboard status
4. **AI Features?** Verify OpenAI API key and quota

---

**Built with ❤️ for modern donor management**
