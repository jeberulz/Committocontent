import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * GET /api/auth/github/callback
 * Handles GitHub OAuth callback
 */
export async function GET(request: NextRequest) {
  try {
    console.log("=== GitHub OAuth Callback Started ===");
    const { userId } = await auth();
    console.log("Clerk userId:", userId);

    if (!userId) {
      console.log("No userId from Clerk auth()");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=unauthorized`
      );
    }

    // Get code and state from query parameters
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    console.log("OAuth params - code:", code ? "present" : "missing", "state:", state, "error:", error);

    // Handle OAuth errors (user denied access)
    if (error) {
      console.error("GitHub OAuth error:", error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=github_denied`
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=invalid_callback`
      );
    }

    // Verify state matches userId (CSRF protection)
    if (state !== userId) {
      console.error("State mismatch in OAuth callback");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=invalid_state`
      );
    }

    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    if (!tokenResponse.ok) {
      console.error("Failed to exchange code for token");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=token_exchange_failed`
      );
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("GitHub token error:", tokenData.error_description);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=token_error`
      );
    }

    const { access_token, token_type, scope } = tokenData;
    console.log("Got access token, token_type:", token_type, "scope:", scope);

    // Get user document from Convex by Clerk externalId
    console.log("Looking up user by externalId:", userId);
    const userDoc = await convex.query(api.users.getByExternalId, {
      externalId: userId,
    });
    console.log("User doc from Convex:", userDoc ? "found" : "not found");

    if (!userDoc) {
      console.error("User not found in Convex for Clerk ID:", userId);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=user_not_found`
      );
    }

    // Store token in Convex
    console.log("Storing GitHub token for user:", userDoc._id);
    await convex.mutation(api.githubTokens.storePublic, {
      userId: userDoc._id,
      accessToken: access_token,
      tokenType: token_type,
      scope: scope,
    });
    console.log("Token stored successfully!");

    // Redirect to repository selection page
    console.log("Redirecting to repository selection page with success");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/repositories/select?connected=true`
    );
  } catch (error) {
    console.error("Error in GitHub OAuth callback:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?error=callback_failed`
    );
  }
}
