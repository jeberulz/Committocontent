# Setup Guide

This guide will help you get the application running locally.

## Current Status

✅ **Completed:**
- Dependencies installed (npm install)
- Project structure verified
- Environment file created (.env.local)
- Font loading fixed (removed Google Fonts dependency for offline builds)

⚠️ **Needs Configuration:**
- Clerk API keys (for authentication)
- Convex database setup (for real-time data)
- Clerk Billing configuration (for payments)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Convex Database
```bash
npx convex dev
```
This will:
- Create a new Convex project (if needed)
- Generate `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`
- Add them to your `.env.local` automatically

### 3. Configure Clerk Authentication

1. Create a Clerk account at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Get your API keys from the Clerk dashboard
4. Update `.env.local` with your keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### 4. Set Up Clerk JWT Template

1. In Clerk dashboard, go to JWT Templates
2. Create new template named `convex`
3. Copy the Issuer URL
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://your-issuer-url.clerk.accounts.dev
   ```
5. Also add this to Convex dashboard environment variables

### 5. Configure Webhooks

In Clerk dashboard:
1. Go to Webhooks section
2. Add endpoint: `https://your-convex-url.convex.site/clerk-users-webhook`
3. Enable events: `user.created`, `user.updated`, `user.deleted`, `paymentAttempt.updated`
4. Copy webhook secret
5. Add to Convex dashboard environment variables:
   ```
   CLERK_WEBHOOK_SECRET=whsec_...
   ```

### 6. Run Development Server

```bash
# Terminal 1: Start Convex
npx convex dev

# Terminal 2: Start Next.js
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Recent Changes

### Font Configuration Update
- Removed Google Fonts (Geist, Geist Mono) to allow offline builds
- Using system fonts via Tailwind's `font-sans` utility
- To re-enable Google Fonts when online, restore the original `app/layout.tsx`

## Troubleshooting

### Build Fails with Clerk Error
- This is expected if you haven't configured Clerk keys yet
- Add valid Clerk API keys to `.env.local`
- Ensure keys start with `pk_test_` and `sk_test_`

### Convex Connection Issues
- Run `npx convex dev` in a separate terminal
- Check that environment variables are set correctly
- Verify Convex dashboard shows your deployment

### Webhook Errors
- Ensure webhook secret is set in Convex dashboard (not .env.local)
- Verify webhook URL points to your Convex HTTP endpoint
- Check that all required events are enabled

## Next Steps

1. Configure Clerk Billing in the Clerk dashboard
2. Customize the landing page branding
3. Add your pricing tiers
4. Deploy to Vercel
5. Update production webhook URLs

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Original README](./README.md)
