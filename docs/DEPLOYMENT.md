# DonorConnect Deployment Guide

## Environment Variables Configuration

### Local Development (.env)
The `.env` file includes:
- **DATABASE_URL**: Neon PostgreSQL connection string
- **NEXTAUTH_URL**: NextAuth authentication URL (set to your domain in production)
- **NEXTAUTH_SECRET**: JWT secret for session encryption
- **OPENAI_API_KEY**: Claude/OpenAI API key for AI insights
- **ADMIN_SECRET_KEY**: Secret key for creating admin accounts
- **NODE_ENV**: Set to "development" locally

### Production Deployment (Vercel)

#### Required Environment Variables

1. **DATABASE_URL**
   - Your Neon PostgreSQL connection string
   - Keep the same as local or create a production database
   - Format: `postgresql://user:password@host:port/database?sslmode=require`

2. **NEXTAUTH_URL**
   - Set to your Vercel production domain
   - Example: `https://donorconnect.vercel.app`
   - **CRITICAL**: This must match your actual domain or authentication will fail

3. **NEXTAUTH_SECRET**
   - Generate a secure random string using:
     ```bash
     openssl rand -base64 32
     ```
   - Must be at least 32 characters
   - Keep this secret and never expose it

4. **OPENAI_API_KEY**
   - Get from https://platform.openai.com/api-keys
   - Format: `sk-...`
   - Required for AI insights feature

5. **ADMIN_SECRET_KEY**
   - Create a strong secret for admin account creation
   - Used during user registration to designate admins
   - Keep confidential

---

## Deployment Steps to Vercel

### Prerequisites
1. GitHub repository with DonorConnect code
2. Vercel account (free tier available)
3. Neon PostgreSQL database
4. OpenAI API key

### Step 1: Push to GitHub
```bash
cd c:\Users\Launchpad11\MVP\ -\ DonorConnect
git init
git add .
git commit -m "Initial commit: DonorConnect MVP"
git branch -M main
git remote add origin https://github.com/yourusername/donorconnect.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select the `donorconnect` repository
5. Vercel will auto-detect Next.js configuration
6. Click "Deploy"

### Step 3: Configure Environment Variables
After initial deployment (or before):
1. In Vercel dashboard, go to Settings → Environment Variables
2. Add each variable from `.env`:

```
DATABASE_URL = postgresql://neondb_owner:npg_J2v0WqFHiVps@ep-broad-bar-ah97z3qr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

NEXTAUTH_URL = https://your-vercel-domain.vercel.app

NEXTAUTH_SECRET = [generate with openssl rand -base64 32]

OPENAI_API_KEY = sk-your-actual-openai-key

ADMIN_SECRET_KEY = your-secure-admin-secret

NODE_ENV = production
```

### Step 4: Setup Database on Vercel
1. After deployment, database migrations run automatically
2. Seed the database:
   ```bash
   # Run in Vercel CLI or via deployment
   vercel env pull
   pnpm run db:push
   pnpm prisma db seed
   ```

   Or use Vercel Functions to seed:
   - Deploy a function to handle migrations
   - Or manually run seed from local machine with production DB

### Step 5: Redeploy
After adding environment variables:
1. Go to Deployments
2. Click "Redeploy" on the latest build
3. Or push a new commit to trigger automatic redeploy

---

## Verification Checklist

- [ ] Site is accessible at Vercel domain
- [ ] Home page loads without errors
- [ ] Can register a new staff account at `/auth/register`
- [ ] Can login with credentials at `/auth/login`
- [ ] Dashboard loads after login
- [ ] Can create a new donor at `/donors/new`
- [ ] Can record donations at `/donations/new`
- [ ] AI insights feature works (requires OpenAI API key)
- [ ] Admin panel accessible with admin account at `/admin`
- [ ] Database operations are persisting correctly

---

## Production Environment Variables Reference

### Neon PostgreSQL Setup
1. Go to https://console.neon.tech
2. Create a new project or use existing
3. Copy connection string (with SSL enabled)
4. Use in `DATABASE_URL`

### OpenAI API Key Setup
1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Copy and paste into `OPENAI_API_KEY`
4. Note: Uses Claude API (Anthropic) in the code

### NEXTAUTH Configuration
- `NEXTAUTH_URL` must exactly match your Vercel domain
- `NEXTAUTH_SECRET` should be cryptographically secure
- Session strategy: JWT

---

## Troubleshooting

### "Authentication failed" or "Invalid callback URL"
- Check that `NEXTAUTH_URL` matches your actual domain exactly
- Redeploy after fixing environment variable

### "Database connection error"
- Verify `DATABASE_URL` is correct
- Check Neon database is running
- Ensure IP whitelist includes Vercel's IPs (usually allows all)

### "OpenAI API error"
- Verify `OPENAI_API_KEY` is correct
- Check API key hasn't been revoked
- Ensure you have API credits/quota available

### "Build fails on deploy"
- Check logs in Vercel dashboard
- Common issues: missing environment variables, TypeScript errors
- Verify `pnpm install` completes successfully

---

## Local Testing Before Production

```bash
# Install dependencies
pnpm install

# Set up local database
pnpm run db:push

# Seed with sample data
pnpm prisma db seed

# Run development server
pnpm run dev

# Test locally at http://localhost:3000
```

Test accounts (if seeded):
- Admin: `admin@donorconnect.com` / `admin123`
- Staff: `staff@donorconnect.com` / `staff123`

---

## Performance Optimization

- Next.js 14 with App Router is optimized for production
- Vercel provides edge functions for fast response times
- Prisma client is configured for connection pooling with Neon
- Tailwind CSS is minified automatically

---

## Security Considerations

- ✅ Passwords hashed with bcryptjs
- ✅ JWT sessions with NextAuth
- ✅ Environment variables not exposed to client
- ✅ Role-based access control (RBAC)
- ✅ Protected API routes with authentication middleware
- ✅ SSL/TLS enforced on database connection

---

## Support & Monitoring

### Monitor in Vercel
- Analytics dashboard
- Error tracking
- Build logs
- Edge function usage

### Monitor Database
- Neon dashboard for query performance
- Connection pool status
- Storage usage

---

## Next Steps After Deployment

1. **Update Credentials**: Change default admin/staff passwords
2. **Configure OpenAI**: Add budget limits and API key restrictions
3. **Set Up Email Notifications** (optional): Configure email alerts
4. **Enable Analytics**: Set up Google Analytics or Vercel analytics
5. **Backup Strategy**: Set up automated Neon backups
