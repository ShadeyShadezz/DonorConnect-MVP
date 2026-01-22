# Vercel Deployment Fixes - Navigation and Authentication

## Issues Found
- **Navigation:** Header logo on authenticated pages links to "/", but home page redirects authenticated users to "/dashboard", creating a loop.
- **Authentication:** Login page infinitely loads because manual redirect conflicts with useEffect waiting for session.

## Plan
1. Modify app/page.tsx to not redirect if ?public=1 query param is present.
2. Update header logo links in authenticated pages to "/?public=1".
   - app/dashboard/page.tsx
   - app/donors/page.tsx
   - app/donations/page.tsx
   - app/campaigns/page.tsx
   - app/tasks/page.tsx
   - app/admin/page.tsx
3. In app/auth/login/page.tsx, remove manual router.push after signIn.

## Progress
- [ ] Modify app/page.tsx
- [ ] Update app/dashboard/page.tsx header
- [ ] Update app/donors/page.tsx header
- [ ] Update app/donations/page.tsx header
- [ ] Update app/campaigns/page.tsx header
- [ ] Update app/tasks/page.tsx header
- [ ] Update app/admin/page.tsx header
- [ ] Update app/auth/login/page.tsx
