Vercel Environment & Auth Checklist

- Required Vercel environment variables (Project → Settings → Environment Variables):
  - DATABASE_URL = <Neon pooled connection string> (must be the pooled host URL)
  - NEXTAUTH_URL = https://your-app.vercel.app (exact Vercel URL)
  - NEXTAUTH_SECRET = <32+ byte secure secret> (generate with `openssl rand -base64 32`)
  - Any custom vars: STAFF_EMAILS, CRM_URL, etc. (match names used by the app)

- NextAuth / OAuth provider dashboard:
  - Add production callback URLs (exact):
    - https://your-app.vercel.app
    - https://your-app.vercel.app/api/auth/callback/*
  - For Credentials provider no external dashboard needed, but `NEXTAUTH_URL` must match.

- Prisma / Neon:
  - Use Neon "Pooled connection" string (pooler host) in `DATABASE_URL` on Vercel.
  - If you manage migrations locally, run:

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

  - Or on CI (recommended): `npx prisma migrate deploy` during deploy.

- Middleware & Edge:
  - Ensure `NEXTAUTH_SECRET` is set in Vercel (Edge needs it for `getToken`).
  - Do not import Node-only modules inside `middleware.ts`.

- Post-deploy verification steps:
  1. Visit https://your-app.vercel.app and sign in.
  2. Open browser devtools → Network tab and verify POST /api/auth/callback/credentials returns 200 and then GET /api/auth/session returns the session JSON.
  3. If login stalls, check Vercel function logs for `/api/auth/[...nextauth]` and ensure env vars are present.

- Troubleshooting tips:
  - If sessions fail after changing `NEXTAUTH_SECRET`, existing sessions will be invalidated — sign out/in again.
  - If DB connection issues occur, confirm Neon project's IP settings and that the pooled URL is used.
  - For middleware problems, check Edge / Vercel function logs and avoid DB-heavy work in middleware.

