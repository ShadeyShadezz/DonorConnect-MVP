# DonorConnect - Quick Start Guide

## 📋 Prerequisites
- Node.js 18+ and pnpm
- Neon PostgreSQL account
- OpenAI API key
- GitHub account
- Vercel account

---

## 🚀 Local Development (5 minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Database
```bash
# Apply schema to Neon database
pnpm run db:push

# Seed with sample data
pnpm prisma db seed
```

### 3. Configure Environment
- `.env` is pre-configured with your Neon database
- Update `OPENAI_API_KEY` with your actual key
- Keep `NEXTAUTH_SECRET` and `ADMIN_SECRET_KEY` as-is for local testing

### 4. Run Locally
```bash
pnpm run dev
```
Visit http://localhost:3000

### 5. Test Accounts
- **Admin**: admin@donorconnect.com / admin123
- **Staff**: staff@donorconnect.com / staff123

---

## 🌐 Deploy to Vercel (10 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. "Add New Project"
3. Import your GitHub repository
4. Select **DonorConnect** project
5. Click "Deploy"

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Neon connection string | Same as local or new prod DB |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | **CRITICAL**: Match your domain exactly |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` | Keep secure, 32+ chars |
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` format |
| `ADMIN_SECRET_KEY` | Strong password | For admin account creation |
| `NODE_ENV` | `production` | Required for production builds |

### 4. Redeploy
Click "Redeploy" in Vercel Deployments tab

### 5. Verify Deployment
```bash
# Test login
https://your-domain.vercel.app/auth/login

# Test admin panel (admin account only)
https://your-domain.vercel.app/admin
```

---

## ✅ Post-Deployment Checklist

- [ ] Site loads at Vercel domain
- [ ] Login works
- [ ] Can create donors
- [ ] Can record donations
- [ ] AI insights function (requires OpenAI key)
- [ ] Admin panel is accessible to admin users only
- [ ] Database is persisting data

---

## 🔑 Important Security Notes

⚠️ **Before Production:**
1. Change default admin/staff passwords
2. Set strong `ADMIN_SECRET_KEY`
3. Generate secure `NEXTAUTH_SECRET`
4. Set proper `NEXTAUTH_URL` (must match domain)
5. Restrict OpenAI API key permissions

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Auth fails after deploy | Check `NEXTAUTH_URL` matches your domain exactly |
| Database errors | Verify `DATABASE_URL` is correct, check Neon status |
| AI feature broken | Confirm `OPENAI_API_KEY` is valid and has quota |
| Build fails | Check Vercel logs, ensure all env vars are set |

---

## 📚 Additional Resources

- See `DEPLOYMENT.md` for detailed configuration
- See `.env.example` for all available variables
- Neon docs: https://neon.tech/docs
- Vercel docs: https://vercel.com/docs
- NextAuth docs: https://next-auth.js.org

---

## 🎯 Next Steps

1. **Monitor**: Check Vercel dashboard for performance
2. **Backup**: Enable automatic Neon backups
3. **Scale**: Add CDN/caching as needed
4. **Iterate**: Build features based on user feedback

---

**Questions?** Check the main README.md or DEPLOYMENT.md for more details.
