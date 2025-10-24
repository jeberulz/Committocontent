# GitHub OAuth Setup Guide

## Overview
This application uses GitHub OAuth to connect to users' repositories and fetch commit data. Follow these steps to configure GitHub OAuth for your application.

## Prerequisites
- A GitHub account
- Access to create OAuth Apps on GitHub

## Setup Steps

### 1. Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App" or "Register a new application"
3. Fill in the application details:
   - **Application name**: Your app name (e.g., "Commit2Content")
   - **Homepage URL**: Your app URL (e.g., `http://localhost:3000` for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/github/callback` (for development)
   - **Description**: Optional description of your app

4. Click "Register application"

### 2. Get Your OAuth Credentials

After creating the OAuth app:
1. Copy the **Client ID**
2. Click "Generate a new client secret"
3. Copy the **Client Secret** (save it securely, you won't see it again)

### 3. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here

# App URL (update for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Update for Production

When deploying to production:
1. Update the OAuth App settings on GitHub:
   - Change Homepage URL to your production URL
   - Change Authorization callback URL to `https://yourdomain.com/api/auth/github/callback`
2. Update environment variables in your production environment

## OAuth Flow

The GitHub OAuth flow in this application works as follows:

1. **User Initiates Connection**: User clicks "Connect GitHub" button
2. **OAuth Authorization**: User is redirected to GitHub to authorize the app
3. **Callback Processing**: GitHub redirects back with an authorization code
4. **Token Exchange**: App exchanges the code for an access token
5. **Token Storage**: Access token is securely stored in Convex
6. **Repository Selection**: User is redirected to select repositories to import
7. **Data Import**: Selected repositories and recent commits are imported

## Required GitHub Scopes

The application requests the `repo` scope, which provides:
- Read access to public and private repositories
- Access to commit history
- Access to repository metadata

## Security Notes

- Access tokens are stored in Convex database (encrypted at rest)
- Tokens are never exposed to the client-side
- All GitHub API calls are made server-side
- Users can revoke access at any time from GitHub settings

## Troubleshooting

### "GitHub OAuth not configured" error
- Ensure `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set in `.env.local`
- Restart the development server after adding environment variables

### "Invalid callback" error
- Verify the callback URL matches exactly in both GitHub OAuth App settings and your environment
- Check that `NEXT_PUBLIC_APP_URL` is set correctly

### "User not found" error during callback
- Ensure Clerk webhook is configured and user data is synced to Convex
- Check that the user exists in the Convex `users` table

## Rate Limits

GitHub API has rate limits:
- Authenticated requests: 5,000 per hour
- The app implements batching and delays to respect these limits
- Sync operations are limited to recent commits to minimize API usage