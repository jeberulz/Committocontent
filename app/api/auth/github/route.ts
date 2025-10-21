import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/**
 * GET /api/auth/github
 * Initiates GitHub OAuth flow
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get GitHub OAuth credentials from environment
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/github/callback`;

    if (!clientId) {
      console.error("GITHUB_CLIENT_ID not configured");
      return NextResponse.json(
        { error: "GitHub OAuth not configured" },
        { status: 500 }
      );
    }

    // Build GitHub OAuth authorization URL
    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
    githubAuthUrl.searchParams.set("client_id", clientId);
    githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
    githubAuthUrl.searchParams.set("scope", "repo"); // Read access to public and private repos
    githubAuthUrl.searchParams.set("state", userId); // Pass userId as state for verification

    // Redirect to GitHub authorization page
    return NextResponse.redirect(githubAuthUrl.toString());
  } catch (error) {
    console.error("Error initiating GitHub OAuth:", error);
    return NextResponse.json(
      { error: "Failed to initiate GitHub OAuth" },
      { status: 500 }
    );
  }
}
