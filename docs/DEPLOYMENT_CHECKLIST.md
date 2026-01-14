# DonorConnect Deployment Checklist

## ✅ Pre-Deployment Setup

### Local Development
- [ ] Run `pnpm install` successfully
- [ ] Database connection string in `.env` works
- [ ] `pnpm run db:push` completes without errors
- [ ] `pnpm prisma db seed` creates sample data
- [ ] `pnpm run dev` starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can login with admin@donorconnect.com / admin123
- [ ] Can login with staff@donorconnect.com / staff123
- [ ] Dashboard loads after login
- [ ] Can create a new donor
- [ ] Can record a donation
- [ ] Can view AI insights (if OpenAI API key configured)

### Environment Variables
- [ ] `DATABASE_URL` is correct (from Neon)
- [ ] `NEXTAUTH_URL` is set to http://localhost:3000 (local)
- [ ] `NEXTAUTH_SECRET` is set (local secret is fine for dev)
- [ ] `OPENAI_API_KEY` is configured (or placeholder set)
- [ ] `ADMIN_SECRET_KEY` is configured
- [ ] No secrets are exposed in `.gitignore`

### Code Quality
- [ ] Run `pnpm run lint` - no critical errors
- [ ] Run `pnpm run build` locally - builds successfully
- [ ] No TypeScript errors in build output
- [ ] All database migrations are applied

---

## 🚀 Vercel Deployment

### Step 1: GitHub Repository
- [ ] Code is committed to GitHub
- [ ] Repository is public (or you have Vercel access)
- [ ] Main branch is up to date
- [ ] `.env` is in `.gitignore` (no secrets in repo)

### Step 2: Vercel Project
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project created in Vercel
- [ ] Auto-deployment is enabled
- [ ] Build settings auto-detected Next.js

### Step 3: Environment Variables in Vercel
In Vercel Dashboard → Settings → Environment Variables:

- [ ] `DATABASE_URL` set (same as local or production DB)
- [ ] `NEXTAUTH_URL` set to **exact** Vercel domain
  - Example: `https://donorconnect.vercel.app`
  - NOT: `https://vercel.app` or with trailing slash
- [ ] `NEXTAUTH_SECRET` generated and set (use `openssl rand -base64 32`)
- [ ] `OPENAI_API_KEY` set (real API key for production)
- [ ] `ADMIN_SECRET_KEY` set (strong, unique secret)
- [ ] `NODE_ENV` set to `production`

### Step 4: Database Setup
- [ ] Database schema is synced with Vercel deployment
  ```bash
  vercel env pull
  pnpm run db:push
  ```
- [ ] Database is accessible from Vercel region
- [ ] IP whitelist includes Vercel (usually automatic for Neon)

### Step 5: Deployment
- [ ] Click "Deploy" or push code to trigger deployment
- [ ] Build completes successfully (check Vercel logs)
- [ ] No build errors or TypeScript errors
- [ ] Deployment takes 2-5 minutes

---

## ✔️ Post-Deployment Verification

### Access & Functionality
- [ ] Can access `https://your-domain.vercel.app` (homepage loads)
- [ ] Can access login page at `/auth/login`
- [ ] Can login with test credentials
- [ ] Dashboard loads after login
- [ ] Can view donors list at `/donors`
- [ ] Can create new donor at `/donors/new`
- [ ] Can view donations at `/donations`
- [ ] Can record new donation at `/donations/new`

### User Accounts
- [ ] Admin account works: admin@donorconnect.com / admin123
- [ ] Staff account works: staff@donorconnect.com / staff123
- [ ] Admin can access `/admin` panel
- [ ] Staff cannot access `/admin` (shows 403)
- [ ] Can register new account at `/auth/register`
- [ ] New staff account works after registration

### Data Operations
- [ ] Can create donors and save to database
- [ ] Can create donations and save to database
- [ ] Donor details persist after page refresh
- [ ] Donation list shows all recorded donations
- [ ] Donation statistics calculate correctly
- [ ] Can view individual donor and their donations

### AI Features
- [ ] AI Insights page loads at `/ai-insights`
- [ ] Can select a donor in insights
- [ ] Can generate insights (if OpenAI key valid)
- [ ] Donor analysis displays correctly
- [ ] Recommendations appear in response

### Security
- [ ] HTTPS is enforced (all URLs are https://)
- [ ] Cannot access protected routes without login
- [ ] Session persists across page refreshes
- [ ] Logout works and clears session
- [ ] Cannot modify other users' data
- [ ] Admin-only features require admin role

### Performance
- [ ] Pages load in < 3 seconds
- [ ] No console errors in browser DevTools
- [ ] Database queries are performant
- [ ] Images/assets load without errors

---

## 🔍 Integration Testing

### Authentication Flow
- [ ] Register new user → Can login with new account
- [ ] Login → Session persists → Logout → Redirected to login
- [ ] Unauthorized access to `/dashboard` → Redirected to login

### Donor Management
- [ ] Create donor → Appears in donors list
- [ ] View donor → Shows all details and donations
- [ ] Create donation for donor → Appears in donor's history
- [ ] Stats calculate correctly (total, count, average)

### Admin Features
- [ ] Admin can view all users in `/admin`
- [ ] Admin user count is accurate
- [ ] Can create new admin via `/auth/register` with secret
- [ ] Staff users cannot access admin panel

### Data Relationships
- [ ] Donations linked to correct donor
- [ ] Deleting donor cascade-deletes donations
- [ ] Donor stats reflect all donations
- [ ] Donation history matches recorded amounts

---

## 📊 Monitoring & Logging

### Vercel Dashboard
- [ ] Check "Deployments" for successful builds
- [ ] Review "Logs" for any errors or warnings
- [ ] Monitor "Analytics" for performance metrics
- [ ] Check "Environment" variables are correctly set
- [ ] Verify "Domains" configuration

### Error Tracking
- [ ] No 500 errors in Vercel logs
- [ ] No database connection errors
- [ ] No authentication errors in logs
- [ ] API routes responding with correct status codes

### Performance Metrics
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Time to Interactive (TTI) < 3.5s

---

## 🔐 Security Verification

### Secrets & Credentials
- [ ] No hardcoded secrets in code
- [ ] All secrets in `.env` and ignored by git
- [ ] Environment variables not exposed in browser
- [ ] API keys are specific to production (not shared)
- [ ] `NEXTAUTH_SECRET` is unique (not default)

### Access Control
- [ ] Protected routes require authentication
- [ ] Role-based access is enforced
- [ ] Admin routes reject non-admin users
- [ ] API routes validate user permissions

### Data Protection
- [ ] Passwords are hashed (bcryptjs)
- [ ] Passwords never logged or exposed
- [ ] Session tokens are JWT-based
- [ ] HTTPS is enforced (no http)
- [ ] Database uses SSL/TLS connection

---

## 📝 Documentation Verification

- [ ] README.md is comprehensive and up-to-date
- [ ] QUICK_START.md covers basic setup
- [ ] DEPLOYMENT.md covers detailed deployment
- [ ] ENV_SETUP.md explains each environment variable
- [ ] DEPLOYMENT_CHECKLIST.md (this file) is complete
- [ ] All guides link to each other
- [ ] Troubleshooting section covers common issues

---

## 🎯 Final Sign-Off

### Production Readiness
- [ ] All checklist items completed
- [ ] No critical issues remaining
- [ ] Performance is acceptable
- [ ] Security measures are in place
- [ ] Team has access to Vercel and Neon dashboards

### Handoff & Documentation
- [ ] Team member understands deployment process
- [ ] Runbooks created for common tasks
- [ ] Emergency contacts documented
- [ ] Backup and disaster recovery plan exists

### Go-Live Approval
- [ ] Product owner approved for production
- [ ] All stakeholders notified of launch
- [ ] Marketing/communication ready
- [ ] Support team prepared for user inquiries

---

## 📞 Post-Launch Support

### First 24 Hours
- [ ] Monitor error logs closely
- [ ] Check user feedback and reports
- [ ] Verify all features working as expected
- [ ] Monitor performance metrics
- [ ] Be ready for quick hotfixes

### Ongoing Monitoring
- [ ] Daily check of error logs
- [ ] Weekly performance review
- [ ] Monthly security audit
- [ ] Quarterly backup verification

### Maintenance Schedule
- [ ] Dependencies updated monthly
- [ ] Security patches applied immediately
- [ ] Database backups verified weekly
- [ ] Performance optimizations quarterly

---

## ✨ Success Criteria

✅ **Application is live and publicly accessible**
✅ **All core features working in production**
✅ **Users can register and login**
✅ **Data persists and is secure**
✅ **AI insights function correctly**
✅ **Performance is acceptable**
✅ **No critical errors in logs**
✅ **Documentation is complete**

---

## 📚 Quick Reference Links

| Item | URL/Command |
|------|-------------|
| Vercel Dashboard | https://vercel.com/dashboard |
| Neon Console | https://console.neon.tech |
| OpenAI API Keys | https://platform.openai.com/api-keys |
| GitHub Repo | Your repo URL |
| App URL | https://your-domain.vercel.app |
| Admin Panel | https://your-domain.vercel.app/admin |

---

## 📋 Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | ______________ | ________ | ________ |
| QA/Tester | ______________ | ________ | ________ |
| PM/Owner | ______________ | ________ | ________ |

---

**Deployment Date:** ________________  
**Go-Live Approval:** ✅ / ❌  
**Notes:** ________________________________________________________________

