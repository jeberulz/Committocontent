"use client"

import { useUser } from "@clerk/nextjs"

export default function TestAuthPage() {
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <div className="p-8 text-white">Loading...</div>
  }

  return (
    <div className="p-8 text-white space-y-4">
      <h1 className="text-2xl font-bold">Authentication Test</h1>

      <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4 space-y-2">
        <div>
          <strong>Is Signed In:</strong> {isSignedIn ? "✅ YES" : "❌ NO"}
        </div>

        {isSignedIn && user && (
          <>
            <div>
              <strong>User ID:</strong> {user.id}
            </div>
            <div>
              <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
            </div>
            <div>
              <strong>Name:</strong> {user.fullName || "Not set"}
            </div>
          </>
        )}

        {!isSignedIn && (
          <div className="text-red-300">
            You are not signed in. The middleware should have redirected you to sign-in page.
          </div>
        )}
      </div>

      <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4">
        <p className="text-sm text-white/60">
          If you see "Is Signed In: NO", your middleware is not working correctly.
          <br />
          If you see "Is Signed In: YES", your authentication is working!
        </p>
      </div>
    </div>
  )
}
