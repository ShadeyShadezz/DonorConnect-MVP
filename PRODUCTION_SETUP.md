# DonorConnect - Production Setup Guide

Complete step-by-step instructions to deploy DonorConnect to Vercel with proper environment configuration.

---

## 📋 Overview

This guide covers:
1. ✅ Configuring environment variables
2. ✅ Setting up Neon PostgreSQL for production
3. ✅ Configuring OpenAI API
4. ✅ Deploying to Vercel
5. ✅ Verifying production deployment
6. ✅ Post-deployment tasks

**Estimated time:** 30-45 minutes

---

## 🔧 Step 1: Prepare Local Environment

### 1.1 Verify Local Setup Works

```bash
# Install dependencies
pnpm install

# Check database connection
pnpm run db:push

# Seed with sample data
pnpm prisma db seed

# Start development server
pnpm run dev
```

✅ Verify:
- No errors during install
- Database schema applied
- Sample data created
- Server starts at http://localhost:3000
- Can login with admin@donorconnect.com / admin123

### 1.2 Verify Build Process

```bash
# Build for production
pnpm run build

# Start production server locally
pnpm start
```

✅ Verify:
- Build completes without errors
- No TypeScript errors
- App runs with production settings
- Performance is acceptable

---

## 🔐 Step 2: Configure Environment Variables

### 2.1 Generate NEXTAUTH_SECRET

```bash
# Generate a secure 32+ character secret
openssl rand -base64 32
```

**Output example:**
```
j8kL9mN0pQ1rS2tU3vW4xY5zAbCdEfGhIjKlMnOpQrStUvWxYz=
```

**Save this value** - you'll need it for Vercel.

### 2.2 Verify OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create or copy your API key (starts with `sk-proj-`)
3. **Keep it secret** - never share or commit

### 2.3 Set Admin Secret Key

Create a strong secret for admin account creation:

```bash
# Option 1: Generate random
openssl rand -base64 24

# Option 2: Custom
echo "MyDonorConnect2024Admin!" | base64
```

### 2.4 Update .env File Locally

Update `c:\Users\Launchpad11\MVP - DonorConnect\.env`:

```bash
DATABASE_URL='postgresql://neondb_owner:npg_J2v0WqFHiVps@ep-broad-bar-ah97z3qr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-from-step-2.1

OPENAI_API_KEY=sk-proj-your-actual-api-key

ADMIN_SECRET_KEY=your-strong-admin-secret-from-step-2.3

NODE_ENV=development
```

⚠️ **Never commit the `.env` file!** It's already in `.gitignore`

---

## 📦 Step 3: Prepare for Deployment

### 3.1 Commit to Git

```bash
# Check git status
git status

# Add all files (except .env - already ignored)
git add .

# Create meaningful commit message
git commit -m "feat: Complete DonorConnect MVP with production configuration"

# Verify files are ready to push
git log --oneline -5
```

✅ Verify:
- Only application files are staged
- No `.env` file in commit
- Commit message is clear
- Ready to push to GitHub

### 3.2 Push to GitHub

```bash
# Push to main branch
git push origin main

# Verify on GitHub
# Visit https://github.com/your-username/donorconnect
```

✅ Verify:
- Code appears on GitHub
- Latest commit matches your local
- No `.env` file visible
- README.md displays correctly

---

## 🚀 Step 4: Deploy to Vercel

### 4.1 Create Vercel Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Search for `donorconnect` repository
5. Click **"Import"**

### 4.2 Configure Build Settings

Vercel should auto-detect Next.js. Verify:
- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

Click **"Deploy"** (first deploy without env vars is fine, it will fail but that's expected)

### 4.3 Add Environment Variables

1. Wait for initial deployment to fail (expected)
2. Go to **Settings** → **Environment Variables**
3. Add each variable:

**DATABASE_URL**
- Key: `DATABASE_URL`
- Value: `postgresql://neondb_owner:npg_J2v0WqFHiVps@ep-broad-bar-ah97z3qr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- Environment: Production, Preview, Development

**NEXTAUTH_URL**
⚠️ **CRITICAL**: Must match your exact Vercel domain
- Key: `NEXTAUTH_URL`
- Value: `https://your-vercel-app-name.vercel.app`
  - Example: `https://donorconnect.vercel.app`
  - NOT: `https://vercel.app` or with trailing slash
- Environment: Production (only)

**NEXTAUTH_SECRET**
- Key: `NEXTAUTH_SECRET`
- Value: The secret from Step 2.1 (your generated value)
- Environment: Production (only)

**OPENAI_API_KEY**
- Key: `OPENAI_API_KEY`
- Value: `sk-proj-your-actual-key-from-openai`
- Environment: Production (only)

**ADMIN_SECRET_KEY**
- Key: `ADMIN_SECRET_KEY`
- Value: Your strong admin secret from Step 2.3
- Environment: Production (only)

**NODE_ENV**
- Key: `NODE_ENV`
- Value: `production`
- Environment: Production (only)

### 4.4 Redeploy

1. Go to **Deployments** tab
2. Find the failed deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger auto-redeploy

Wait 2-5 minutes for build to complete.

### 4.5 Verify Deployment Success

✅ Check in Vercel:
- Build status shows green checkmark
- "Deployment successful" message
- No errors in logs
- Domain is assigned (e.g., donorconnect.vercel.app)

---

## ✅ Step 5: Verify Production App

### 5.1 Test Homepage

Visit: `https://your-domain.vercel.app`

✅ Verify:
- Homepage loads without errors
- No 404 or error messages
- Navigation links visible
- Login/Register buttons present

### 5.2 Test Authentication

1. Visit `/auth/register`
2. Register new test account:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPassword123
   - Leave admin secret blank
3. Click "Create Account"

✅ Verify:
- Account created successfully
- Message says "Redirecting to login"
- Redirected to login page
- Can login with new credentials

### 5.3 Test Core Features

**Login:**
- Email: admin@donorconnect.com
- Password: admin123

✅ Verify after login:
- Dashboard loads
- Navigation menu appears
- User email shows in header

**Donors:**
- Click "Donors" from dashboard
- Click "Add Donor"
- Create test donor:
  - Name: John Test
  - Email: john@test.com
  - Phone: (555) 123-4567
  - City: TestCity
  - State: TS
- Click "Create Donor"

✅ Verify:
- Donor created successfully
- Redirected to donor details
- Donor appears in donors list

**Donations:**
- Click "Donations" from dashboard
- Click "Record Donation"
- Create test donation:
  - Donor: John Test (select from dropdown)
  - Amount: 500
  - Date: Today
  - Type: Credit Card
- Click "Record Donation"

✅ Verify:
- Donation recorded
- Appears in donations list
- Statistics update correctly

### 5.4 Test Admin Features

Only accessible with admin account:
- **Admin**: admin@donorconnect.com / admin123

✅ Verify:
- Can access `/admin`
- See user management panel
- Can view all registered users
- User count is accurate

### 5.5 Test AI Features (if OpenAI key valid)

1. Login as admin or staff
2. Click "AI Insights" from dashboard
3. Select a donor from dropdown
4. Click "Generate Insights"

✅ Verify:
- AI analysis loads
- Shows donor statistics
- Provides engagement recommendations
- Takes 10-30 seconds to complete

---

## 🔍 Step 6: Production Verification Checklist

### Functional Checklist
- [ ] Homepage loads at root domain
- [ ] Can register new users
- [ ] Can login with credentials
- [ ] Dashboard is accessible after login
- [ ] Can create donors
- [ ] Can create donations
- [ ] Can view donor details
- [ ] Can view donation list
- [ ] Admin panel is accessible (admin only)
- [ ] AI insights work (if API key valid)
- [ ] Logout works and clears session

### Security Checklist
- [ ] All URLs are HTTPS (no HTTP)
- [ ] Protected routes require login
- [ ] Admin routes require admin role
- [ ] Cannot access others' data
- [ ] Passwords are never displayed
- [ ] Session persists across refreshes

### Performance Checklist
- [ ] Pages load in < 3 seconds
- [ ] No console errors in browser
- [ ] Database operations are fast
- [ ] API responses are quick

### Data Persistence
- [ ] Data saved in database
- [ ] Data persists after page refresh
- [ ] Database backups are working

---

## 🔗 Step 7: Custom Domain (Optional)

To use a custom domain instead of vercel.app:

1. Vercel Dashboard → Settings → Domains
2. Click "Add Domain"
3. Enter your custom domain
4. Follow DNS instructions for your registrar
5. Update `NEXTAUTH_URL` in Environment Variables to your custom domain

---

## 📊 Step 8: Monitoring & Maintenance

### Monitor in Vercel Dashboard

**Analytics:**
- Check visitor counts
- Monitor performance metrics
- Review error rates

**Logs:**
- Check for errors
- Monitor API calls
- Review database queries

**Deployments:**
- Monitor build times
- Check for failed deployments
- Review version history

### Monitor Database (Neon)

1. Go to https://console.neon.tech
2. Check project status
3. Monitor query performance
4. Review storage usage
5. Verify backups are running

### Monitor API (OpenAI)

1. Go to https://platform.openai.com/account/billing/overview
2. Check API usage and costs
3. Monitor remaining quota
4. Review API logs

---

## 🆘 Troubleshooting

### "Invalid callback URL" at login
**Problem:** NEXTAUTH_URL doesn't match domain
**Solution:** 
```bash
# Verify exact domain
# Go to Vercel → Settings → Domains
# Copy exact domain (no trailing slash)
# Update NEXTAUTH_URL environment variable
# Redeploy
```

### "Database connection error"
**Problem:** DATABASE_URL incorrect or database offline
**Solution:**
```bash
# 1. Verify connection string in Neon console
# 2. Check Neon project status
# 3. Update DATABASE_URL in Vercel
# 4. Redeploy
```

### "OpenAI API key error"
**Problem:** Invalid, revoked, or expired API key
**Solution:**
```bash
# 1. Generate new API key at https://platform.openai.com/api-keys
# 2. Update OPENAI_API_KEY in Vercel
# 3. Redeploy
# 4. Test AI features again
```

### Build failures
**Problem:** TypeScript errors or dependency issues
**Solution:**
```bash
# 1. Check Vercel build logs
# 2. Fix errors locally: pnpm run build
# 3. Commit and push
# 4. Auto-redeploy
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more troubleshooting.

---

## 📝 Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Test all features work
- [ ] Monitor error logs
- [ ] Verify users can login
- [ ] Check database is persisting data

### Soon (Week 1)
- [ ] Change default admin password
- [ ] Set strong ADMIN_SECRET_KEY
- [ ] Configure email notifications (optional)
- [ ] Set up analytics
- [ ] Create user documentation

### Ongoing (Monthly)
- [ ] Review error logs
- [ ] Monitor performance
- [ ] Update dependencies
- [ ] Backup database
- [ ] Review security logs

---

## 📞 Support Resources

| Resource | Link |
|----------|------|
| Vercel Docs | https://vercel.com/docs |
| Next.js Docs | https://nextjs.org/docs |
| Neon Docs | https://neon.tech/docs |
| NextAuth Docs | https://next-auth.js.org |
| OpenAI API Docs | https://platform.openai.com/docs |
| Prisma Docs | https://www.prisma.io/docs |

---

## ✨ Success!

🎉 **Your DonorConnect application is live in production!**

### What's Deployed
✅ Full-stack Next.js application  
✅ PostgreSQL database with Neon  
✅ User authentication with NextAuth  
✅ Role-based access control  
✅ AI-powered insights with Claude  
✅ Real-time donation tracking  
✅ Admin dashboard  

### What's Next
📌 Invite team members to use the app  
📌 Configure email notifications  
📌 Set up regular backups  
📌 Monitor performance and errors  
📌 Plan feature enhancements  

---

**Deployment Date:** ____________________  
**Deployed By:** ____________________  
**Production URL:** https://____________________

