"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"

export default function TestConvexPage() {
  const { user, isSignedIn } = useUser()
  const convexUser = useQuery(api.users.current)
  const createUser = useMutation(api.manualUserSetup.createManualUser)
  const [creating, setCreating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handleCreateUser = async () => {
    if (!user) return
    setCreating(true)
    setResult(null)
    setDebugInfo(null)
    try {
      const res = await createUser({
        externalId: user.id,
        name: user.fullName || user.emailAddresses[0]?.emailAddress || "User",
      })
      setResult(`✅ ${res.message}`)
      setDebugInfo({
        clerkUserId: user.id,
        userName: user.fullName || user.emailAddresses[0]?.emailAddress || "User",
        convexUserId: res.userId,
      })
      // Wait a moment for Convex to sync, then redirect to repositories
      setTimeout(() => {
        window.location.href = "/dashboard/repositories"
      }, 1000)
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
      setDebugInfo({ error: error.toString() })
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="p-8 text-white space-y-4">
      <h1 className="text-2xl font-bold">Convex Integration Test</h1>

      {/* Clerk Status */}
      <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4 space-y-2">
        <h2 className="text-lg font-semibold">Clerk Status</h2>
        <div>
          <strong>Signed In:</strong> {isSignedIn ? "✅ YES" : "❌ NO"}
        </div>
        {user && (
          <>
            <div>
              <strong>Clerk User ID:</strong> {user.id}
            </div>
            <div>
              <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
            </div>
          </>
        )}
      </div>

      {/* Convex Status */}
      <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-4 space-y-2">
        <h2 className="text-lg font-semibold">Convex Status</h2>

        {convexUser === undefined && (
          <div className="text-yellow-300">Loading from Convex...</div>
        )}

        {convexUser === null && (
          <div className="text-red-300">
            ❌ User NOT found in Convex database
            <div className="text-sm mt-2">
              This means the Clerk webhook hasn't synced your user yet.
            </div>
          </div>
        )}

        {convexUser && (
          <div className="text-emerald-300">
            ✅ User found in Convex!
            <div className="text-white mt-2 space-y-1">
              <div><strong>Convex ID:</strong> {convexUser._id}</div>
              <div><strong>Name:</strong> {convexUser.name}</div>
              <div><strong>External ID:</strong> {convexUser.externalId}</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Fix Button */}
      {convexUser === null && user && (
        <div className="rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 p-4 space-y-3">
          <h3 className="font-semibold text-emerald-300">Quick Fix (For Testing):</h3>
          <p className="text-sm">Click the button below to manually create your user in Convex:</p>
          <button
            onClick={handleCreateUser}
            disabled={creating}
            className="rounded-lg bg-white text-black hover:bg-white/90 px-4 py-2 text-sm font-medium transition disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create My User in Convex"}
          </button>
          {result && (
            <div className="text-sm font-medium">{result}</div>
          )}
          {debugInfo && (
            <div className="text-xs bg-black/50 p-3 rounded font-mono">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {/* Long-term Solution */}
      {convexUser === null && (
        <div className="rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20 p-4">
          <h3 className="font-semibold text-amber-300 mb-2">Proper Setup (For Production):</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to Clerk Dashboard: https://dashboard.clerk.com</li>
            <li>Navigate to Webhooks section</li>
            <li>Add endpoint: <code className="bg-black px-2 py-1 rounded">https://industrious-armadillo-619.convex.site/clerk-users-webhook</code></li>
            <li>Subscribe to events: user.created, user.updated, user.deleted</li>
            <li>Save and trigger a test event, or sign out and sign in again</li>
          </ol>
        </div>
      )}
    </div>
  )
}
