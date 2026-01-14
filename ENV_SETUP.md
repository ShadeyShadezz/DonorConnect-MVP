# Environment Variables Setup Guide

## 🗄️ Neon PostgreSQL

### Get Your Connection String

1. **Create/Access Neon Account**
   - Go to https://console.neon.tech
   - Sign up or log in

2. **Create a New Database**
   - Click "Create a new project"
   - Choose region (us-east-1 recommended)
   - Select "Postgres" as database
   - Click "Create project"

3. **Get Connection String**
   - Project created → Dashboard
   - Find "Connection string" section
   - Select "Pooled connection" (recommended for serverless)
   - Copy the full connection string

4. **Connection String Format**
   ```
   postgresql://username:password@ep-xxx-pooler.xx.aws.neon.tech/database?sslmode=require&channel_binding=require
   ```

5. **Add to Environment**
   ```bash
   # .env (local development)
   DATABASE_URL='postgresql://username:password@...'
   
   # Vercel (production)
   # Add via Vercel Dashboard → Settings → Environment Variables
   ```

**For this project:** Connection string is already configured in `.env`

---

## 🔐 NextAuth Configuration

### NEXTAUTH_URL (Callback URL)

This **must** match your application's domain exactly or authentication will fail.

**Development:**
```bash
NEXTAUTH_URL=http://localhost:3000
```

**Production (Vercel):**
```bash
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
```

⚠️ **Critical**: If deployment URL is `https://donorconnect.vercel.app`, then:
```bash
NEXTAUTH_URL=https://donorconnect.vercel.app
```

Not:
- `https://donorconnect.vercel.app/`  (no trailing slash)
- `https://vercel.app`  (incomplete)
- Any other variation

### NEXTAUTH_SECRET

Secure JWT secret for session encryption.

**Generate a secure secret:**
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Output example:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6=
```

**Add to environment:**
```bash
NEXTAUTH_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6=
```

---

## 🤖 OpenAI / Claude API

### Get API Key

1. **Visit OpenAI Platform**
   - Go to https://platform.openai.com/api-keys
   - Sign in or create account

2. **Create API Key**
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)
   - ⚠️ Save it securely - you won't see it again

3. **Set Usage Limits** (recommended)
   - Go to "Billing" → "Usage limits"
   - Set monthly limit to prevent unexpected charges
   - Set soft limit for alerts

4. **Add to Environment**
   ```bash
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Note:** The code uses Claude via OpenAI's API. Adjust the API call if using OpenAI directly.

### Testing the API Key

```bash
# Test from local machine
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-your-key-here"

# Should return 200 with model list
```

---

## 🔑 Admin Secret Key

Used to create admin accounts during registration.

### Generate Admin Secret

```bash
# Option 1: Random string
openssl rand -base64 24

# Option 2: Custom phrase
echo "MySecureAdminSecret2024!" | base64
```

### Set in Environment

```bash
ADMIN_SECRET_KEY=MySecureAdminSecret2024
```

### Usage

When registering a new account:
1. Go to `/auth/register`
2. Fill in name, email, password
3. Enter the admin secret key if creating an admin
4. Leave blank for staff account

---

## 🌍 Complete Environment Variables

### Local Development (.env)

```bash
# Database
DATABASE_URL='postgresql://user:pass@host/db?sslmode=require'

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# AI Features
OPENAI_API_KEY=sk-proj-your-actual-key

# Security
ADMIN_SECRET_KEY=your-secure-admin-key

# Environment
NODE_ENV=development
```

### Production (Vercel)

Set these in Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL = postgresql://user:pass@host/db?sslmode=require

NEXTAUTH_URL = https://your-vercel-domain.vercel.app

NEXTAUTH_SECRET = generated-secure-secret-key

OPENAI_API_KEY = sk-proj-your-actual-key

ADMIN_SECRET_KEY = your-secure-admin-key

NODE_ENV = production
```

---

## ✅ Verification Steps

### 1. Database Connection
```bash
pnpm run db:push
# Should complete without errors
```

### 2. Seed Database
```bash
pnpm prisma db seed
# Should create users and sample data
```

### 3. Local Development
```bash
pnpm run dev
# Visit http://localhost:3000
# Should see homepage
```

### 4. Authentication
```bash
# Try logging in
URL: http://localhost:3000/auth/login
Email: admin@donorconnect.com
Password: admin123
# Should redirect to /dashboard
```

### 5. AI Features (requires OpenAI key)
1. Log in as admin or staff
2. Go to "AI Insights" from dashboard
3. Select a donor
4. Should generate insights (if API key is valid)

---

## 🚨 Troubleshooting

### "Invalid callback URL" at login
**Problem:** `NEXTAUTH_URL` doesn't match your domain
**Solution:** Update `NEXTAUTH_URL` to match exactly (e.g., `https://myapp.vercel.app`)

### "Database connection refused"
**Problem:** Invalid `DATABASE_URL` or Neon database is offline
**Solution:** 
- Verify connection string in Neon dashboard
- Check Neon project status
- Ensure IP is whitelisted (usually automatic)

### "Invalid API key" for OpenAI
**Problem:** `OPENAI_API_KEY` is wrong or revoked
**Solution:**
- Create new key at https://platform.openai.com/api-keys
- Check key hasn't been revoked
- Verify you have API credits

### "Admin registration not working"
**Problem:** Wrong `ADMIN_SECRET_KEY`
**Solution:** Verify you're entering exact key, case-sensitive

---

## 📝 Environment File Examples

### .env.local (for local testing)
```bash
DATABASE_URL='postgresql://neondb_owner:npg_J2v0WqFHiVps@ep-broad-bar-ah97z3qr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-dev-secret-key-do-not-use-in-production

OPENAI_API_KEY=sk-proj-your-test-key

ADMIN_SECRET_KEY=local-admin-secret

NODE_ENV=development
```

### Production Setup (Vercel)
```
All variables set via Vercel Dashboard
No .env file needed in production
Vercel manages environment isolation
```

---

## 🔒 Security Best Practices

✅ **Do:**
- Use strong, random secrets for `NEXTAUTH_SECRET`
- Keep `ADMIN_SECRET_KEY` confidential
- Use separate API keys for dev and production
- Set usage limits on OpenAI API
- Use connection pooling in production
- Enable SSL/TLS for database

❌ **Don't:**
- Commit `.env` files to GitHub
- Share API keys in messages or commits
- Use simple secrets like "password123"
- Expose `NEXTAUTH_SECRET` in client code
- Use same keys across environments

---

## 🔄 Rotating Keys (Emergency)

If a key is compromised:

1. **API Key:** Create new key, update Vercel env var, redeploy
2. **NEXTAUTH_SECRET:** Generate new secret, update Vercel env var, redeploy (sessions will be invalidated)
3. **Admin Secret:** Change `ADMIN_SECRET_KEY`, no redeploy needed

---

## 📞 Support Resources

- **Neon:** https://neon.tech/docs
- **NextAuth:** https://next-auth.js.org/getting-started/introduction
- **OpenAI:** https://platform.openai.com/docs
- **Vercel:** https://vercel.com/docs/environment-variables

