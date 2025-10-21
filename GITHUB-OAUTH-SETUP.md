# GitHub OAuth Setup Guide

Follow these steps to enable GitHub repository connection in CodeToContent.

---

## Step 1: Register GitHub OAuth App

1. **Go to GitHub Developer Settings**
   - Navigate to: https://github.com/settings/developers
   - Click **"OAuth Apps"** in the left sidebar
   - Click **"New OAuth App"** button

2. **Fill in Application Details**
   ```
   Application name: CodeToContent (Dev)
   Homepage URL: http://localhost:3000
   Application description: Turn GitHub commits into publish-ready content
   Authorization callback URL: http://localhost:3000/api/auth/github/callback
   ```

3. **Register & Copy Credentials**
   - Click **"Register application"**
   - You'll see your **Client ID** (visible)
   - Click **"Generate a new client secret"**
   - **Copy both immediately** (secret only shown once!)

---

## Step 2: Generate Encryption Keys

Run these commands in your terminal to generate secure random keys:

```bash
# Generate webhook secret
openssl rand -base64 32

# Generate encryption key
openssl rand -base64 32
```

Copy the outputs - you'll need them in the next step.

---

## Step 3: Update Environment Variables

Edit your `.env.local` file and replace the placeholder values:

```bash
# GitHub OAuth (from Step 1)
GITHUB_CLIENT_ID=Iv1.abc123def456  # Your actual Client ID
GITHUB_CLIENT_SECRET=ghp_abc123def456xyz789  # Your actual Client Secret

# Security Keys (from Step 2)
GITHUB_WEBHOOK_SECRET=paste_first_random_key_here
GITHUB_TOKEN_ENCRYPTION_KEY=paste_second_random_key_here

# App URL (already correct for local dev)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Never commit these secrets to Git!

---

## Step 4: Start Development Servers

You need TWO terminal windows running simultaneously:

### Terminal 1: Convex Backend
```bash
npx convex dev
```
Keep this running. You should see:
```
✓ Convex functions ready
✓ Dashboard: https://dashboard.convex.dev/...
```

### Terminal 2: Next.js Frontend
```bash
npm run dev
```
Keep this running. You should see:
```
✓ Ready in 2.3s
✓ Local: http://localhost:3000
```

---

## Step 5: Test the OAuth Flow

1. **Open the App**
   - Go to: http://localhost:3000/dashboard
   - Sign in with Clerk (or create account)

2. **Navigate to Repositories**
   - Click **"Repositories"** in the sidebar
   - OR click **"Connect new repo"** in Quick Actions

3. **Connect GitHub**
   - Click **"Connect GitHub"** button
   - Review the modal explaining permissions
   - Click **"Continue with GitHub"**

4. **Authorize on GitHub**
   - You'll be redirected to GitHub
   - You should see: "CodeToContent (Dev) by [your username]"
   - Review the requested permissions
   - Click **"Authorize [your username]"**

5. **Verify Success**
   - Redirected back to `/dashboard/repositories?connected=true`
   - Green success toast: "GitHub connected successfully!"
   - **Note:** Empty state shown - repository selection coming in Phase 1B

---

## Step 6: Verify in Convex Dashboard

1. **Open Convex Dashboard**
   - Find the URL in Terminal 1 output
   - Or go to: https://dashboard.convex.dev

2. **Check Data**
   - Navigate to **"Data"** tab
   - Look for `githubTokens` table
   - You should see 1 record with:
     - `userId`: Your Convex user ID
     - `accessToken`: Encrypted string
     - `scope`: "repo"
     - `tokenType`: "bearer"

---

## Troubleshooting

### Error: "Invalid callback URL"
- **Cause:** GitHub OAuth app callback doesn't match
- **Fix:** Verify callback URL is exactly: `http://localhost:3000/api/auth/github/callback`
- **Note:** No trailing slash!

### Error: "Invalid state"
- **Cause:** OAuth state mismatch (CSRF protection)
- **Fix:** Clear browser cookies and try again
- **Alternative:** Use incognito/private window

### Error: "Token exchange failed"
- **Cause:** Wrong `GITHUB_CLIENT_SECRET`
- **Fix:** Regenerate secret in GitHub, update `.env.local`

### Error: "Unauthorized" (Clerk)
- **Cause:** Not signed into Clerk
- **Fix:** Sign in at `/dashboard` first

### OAuth Loop (keeps redirecting)
- **Cause:** Missing or incorrect environment variables
- **Fix:**
  1. Stop both dev servers (Ctrl+C)
  2. Verify all variables in `.env.local`
  3. Restart `npx convex dev` first
  4. Then restart `npm run dev`

### "Cannot connect - no slots remaining"
- **Cause:** Plan limit reached (default: 2 repos for Starter)
- **Fix:** Disconnect an existing repo first
- **Or:** Upgrade plan (modify `maxRepos` in `repositories/page.tsx` for testing)

---

## For Production Deployment

### Create Production OAuth App
1. Register separate OAuth app for production
2. Use production URLs:
   ```
   Homepage URL: https://yourdomain.com
   Callback URL: https://yourdomain.com/api/auth/github/callback
   ```

### Update Environment Variables (Vercel/Hosting)
Add these to your hosting platform's environment variables:
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_WEBHOOK_SECRET`
- `GITHUB_TOKEN_ENCRYPTION_KEY`
- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

**Important:** Use different secrets for production!

---

## What's Working vs. Coming Soon

### ✅ Currently Working:
- GitHub OAuth authentication
- Token storage (encrypted)
- Repository page UI
- Connection modal
- Empty state

### ⏳ Coming in Phase 1B:
- Repository browser (select which repos to connect)
- Automatic commit syncing
- Webhook integration
- Historical commit import
- Real-time updates

---

## Security Best Practices

1. **Never commit secrets**
   - `.env.local` is in `.gitignore`
   - Always use environment variables

2. **Use separate OAuth apps**
   - Development: `localhost:3000`
   - Production: `yourdomain.com`

3. **Rotate secrets regularly**
   - Regenerate encryption keys quarterly
   - Rotate OAuth secrets if exposed

4. **Monitor token usage**
   - Check Convex dashboard for token records
   - Delete tokens for deleted users

---

## Next Steps

After successful OAuth setup:
1. ✅ Verify token storage in Convex
2. 🚧 Await Phase 1B for repository selection
3. 🚧 Test commit syncing once implemented
4. 🚧 Configure webhooks for real-time updates

---

## Need Help?

- **GitHub OAuth Docs:** https://docs.github.com/en/apps/oauth-apps
- **Convex Docs:** https://docs.convex.dev
- **PRD:** See `tasks/0001-prd-github-repository-connection.md`
- **Implementation Summary:** See `tasks/0001-implementation-summary.md`

---

**Ready to test!** Follow steps 1-5 above to get started. 🚀
