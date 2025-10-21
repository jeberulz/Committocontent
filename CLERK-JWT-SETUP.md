# Clerk JWT Template Setup for Convex

## Problem
You're getting this error:
```
Failed to authenticate: "No auth provider found matching the given token.
Check that your JWT's issuer and audience match one of your configured providers"
```

This means Clerk is not issuing JWT tokens in the format Convex expects.

## Solution: Create a Convex JWT Template in Clerk

### Step 1: Access Clerk Dashboard
1. Go to https://dashboard.clerk.com
2. Select your application: **sincere-hagfish-83**

### Step 2: Navigate to JWT Templates
1. In the left sidebar, click **Configure**
2. Click **Sessions**
3. Scroll down to find **"Customize session token"** section
4. Click the **"Edit"** button

### Step 3: Create the Convex Template

**Option A: If Clerk has a "Convex" preset**
1. Look for a button like "New template" or "Add template"
2. Select **"Convex"** from the list of presets
3. The template will be automatically named "convex" with correct settings
4. Click **Save**

**Option B: If you need to create it manually**
1. Click **"New template"** or similar button
2. Set the **Name** to: `convex` (must be lowercase, exactly this)
3. In the **Claims** section, ensure it includes:
   ```json
   {
     "aud": "convex"
   }
   ```
4. The **Issuer** should automatically be: `https://sincere-hagfish-83.clerk.accounts.dev`
5. Click **Save**

### Step 4: Verify the Template
After creating the template, you should see:
- **Template Name**: convex
- **Issuer**: https://sincere-hagfish-83.clerk.accounts.dev
- **Application ID**: convex

### Step 5: Test the Integration
1. **Sign out** of your application completely
2. **Refresh** your browser (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)
3. **Sign back in**
4. Navigate to http://localhost:3000/dashboard/test-convex
5. You should now see:
   - ✅ Clerk Status: Signed In
   - ✅ Convex Status: User found (or able to create user)

### Step 6: Create Your User
If everything works, you'll see the "Create My User in Convex" button. Click it to create your user record.

## Troubleshooting

### If you still get authentication errors:
1. Make sure the template is named exactly **"convex"** (lowercase)
2. Verify the issuer matches your Clerk instance
3. Sign out and sign back in (new JWT needs to be issued)
4. Check browser console for specific error messages

### If you can't find JWT Templates in Clerk:
- The location might be: **Configure → Customization → Session token**
- OR: **Configure → JWT Templates**
- Look for any section about "Session customization" or "JWT"

## What This Does
- Configures Clerk to issue JWT tokens with `aud: "convex"`
- Ensures the issuer matches what Convex expects
- Allows Convex to verify and authenticate your Clerk users

## After This Works
Once authentication is working:
1. Your user will be automatically synced to Convex
2. The repositories page will load without errors
3. You can connect GitHub and start using the app
